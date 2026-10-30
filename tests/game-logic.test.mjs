import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const sourceUrl = new URL("../dist/app.js", import.meta.url);
const source = (await readFile(sourceUrl, "utf8")).replace(/\ninit\(\);\s*$/, "\n");

function fakeNode() {
  const node = {
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    style: { setProperty() {} },
    dataset: {},
    textContent: "",
    innerHTML: "",
    disabled: false,
    offsetHeight: 0,
    addEventListener() {},
    appendChild() {},
    closest() { return node; },
    focus() {},
    getBoundingClientRect() { return { left: 0, top: 0 }; },
    querySelector() { return node; },
    querySelectorAll() { return []; },
    removeAttribute() {},
    replaceChildren() {},
    setAttribute() {},
    animate() { return { finished: Promise.resolve(), cancel() {} }; }
  };
  return node;
}

function makeHarness() {
  const storage = new Map();
  const nodes = new Map();
  const nodeFor = selector => {
    if (!nodes.has(selector)) nodes.set(selector, fakeNode());
    return nodes.get(selector);
  };
  const document = {
    createElement: () => fakeNode(),
    documentElement: fakeNode(),
    querySelector: selector => nodeFor(selector),
    querySelectorAll: () => []
  };
  const context = vm.createContext({
    AudioContext: class {},
    clearTimeout,
    confirm: () => true,
    console,
    Date,
    document,
    getComputedStyle: () => ({ getPropertyValue: () => "0" }),
    Intl,
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      removeItem: key => storage.delete(key),
      setItem: (key, value) => storage.set(key, String(value))
    },
    matchMedia: () => ({ matches: true }),
    setTimeout,
    window: { setTimeout }
  });
  vm.runInContext(source, context, { filename: sourceUrl.pathname });
  vm.runInContext(`
    globalThis.__realAddLog = addLog;
    addLog = () => {};
    closeGameModal = () => {};
    enterGame = () => {};
    moveToken = async () => {};
    playTone = () => {};
    renderAll = () => {};
    saveGame = () => {};
    showModal = config => { globalThis.lastModal = config; };
    showToast = () => {};
    showTurnTransition = async () => {};
  `, context);
  return {
    context,
    storage,
    run(expression) { return vm.runInContext(expression, context); },
    snapshot(expression = "state") {
      return JSON.parse(JSON.stringify(vm.runInContext(expression, context)));
    }
  };
}

function players(count = 2) {
  return Array.from({ length: count }, (_, id) => ({
    id,
    name: `TEAM ${id + 1}`,
    color: `#00000${id}`,
    cash: 2000,
    brandValue: 0,
    position: 0,
    owned: [],
    laps: 0,
    doubleStreak: 0,
    skipTurns: 0,
    active: true
  }));
}

function setState(harness, value) {
  harness.context.__testState = value;
  harness.run("state = __testState");
}

test("supports a full six-player game setup", () => {
  const harness = makeHarness();
  harness.run("newGame(['A', 'B', 'C', 'D', 'E', 'F'])");
  const state = harness.snapshot();
  assert.equal(state.players.length, 6);
  assert.equal(new Set(state.players.map(player => player.color)).size, 6);
  assert.equal(state.phase, "ready");
});

test("construction completes after exactly 1, 2, and 3 owner turns", () => {
  const harness = makeHarness();
  const state = { current: 0, players: players(), properties: { 1: { owner: 0, level: 0, invested: 170 } } };
  state.players[0].owned = [1];
  setState(harness, state);

  for (const [targetLevel, duration] of [[1, 1], [2, 2], [3, 3]]) {
    harness.run(`beginConstruction(state.properties[1], ${targetLevel})`);
    for (let turn = 1; turn < duration; turn++) {
      harness.run("advanceConstruction(state.players[0])");
      assert.equal(harness.snapshot("state.properties[1].construction.turnsRemaining"), duration - turn);
    }
    harness.run("advanceConstruction(state.players[0])");
    assert.equal(harness.snapshot("state.properties[1].level"), targetLevel);
    assert.equal(harness.run("Boolean(state.properties[1].construction)"), false);
  }
});

test("construction sites charge no toll and cannot be treated as finished buildings", () => {
  const harness = makeHarness();
  const state = { current: 0, players: players(), properties: { 1: { owner: 1, level: 1, invested: 430, construction: { targetLevel: 2, turnsRemaining: 1, totalTurns: 2 } } } };
  state.players[0].position = 1;
  state.players[1].owned = [1];
  setState(harness, state);

  assert.equal(harness.run("currentToll(1)"), 0);
  harness.run("resolveTile()");
  assert.equal(harness.snapshot("state.players[0].cash"), 2000);
  assert.match(harness.snapshot("lastModal.body"), /통행료와 도시 인수는 없습니다/);
  assert.equal(harness.snapshot("lastModal.actions[0].label"), "통행료 없이 턴 마치기");
});

test("double resolution keeps the same team and enables one bonus roll", () => {
  const harness = makeHarness();
  setState(harness, { current: 0, phase: "resolving", extraRoll: true, players: players(), properties: {} });
  harness.run("finishResolution()");
  const state = harness.snapshot();
  assert.equal(state.current, 0);
  assert.equal(state.phase, "ready");
  assert.equal(state.extraRoll, false);
});

test("Cloud Island cancels doubles and applies exactly one skipped turn", async () => {
  const harness = makeHarness();
  const state = { current: 0, phase: "resolving", extraRoll: true, players: players(), properties: {} };
  state.players[0].doubleStreak = 2;
  setState(harness, state);
  await harness.run("sendToIsland(state.players[0], true)");
  const result = harness.snapshot();
  assert.equal(result.players[0].position, 8);
  assert.equal(result.players[0].skipTurns, 1);
  assert.equal(result.players[0].doubleStreak, 0);
  assert.equal(result.extraRoll, false);
  assert.match(harness.snapshot("lastModal.eyebrow"), /THREE DOUBLES/);
});

test("three consecutive doubles trigger Cloud Island automatically", async () => {
  const harness = makeHarness();
  setState(harness, { current: 0, phase: "ready", extraRoll: false, players: players(), properties: {} });
  harness.run("Math.random = () => 0; movePlayer = async () => {}; resolveTile = () => finishResolution()");
  await harness.run("rollDice()");
  await harness.run("rollDice()");
  await harness.run("rollDice()");
  const result = harness.snapshot();
  assert.equal(result.players[0].position, 8);
  assert.equal(result.players[0].skipTurns, 1);
  assert.equal(result.players[0].doubleStreak, 0);
  assert.equal(result.extraRoll, false);
  assert.match(harness.snapshot("lastModal.eyebrow"), /THREE DOUBLES/);
});

test("next turn skips resting teams, advances their construction, and continues", async () => {
  const harness = makeHarness();
  const state = { current: 0, round: 1, turn: 1, phase: "done", extraRoll: false, players: players(3), properties: { 1: { owner: 1, level: 0, invested: 170, construction: { targetLevel: 1, turnsRemaining: 1, totalTurns: 1 } } } };
  state.players[1].owned = [1];
  state.players[1].skipTurns = 1;
  setState(harness, state);
  await harness.run("nextTurn()");
  const result = harness.snapshot();
  assert.equal(result.current, 2);
  assert.equal(result.players[1].skipTurns, 0);
  assert.equal(result.properties[1].level, 1);
  assert.equal(Boolean(result.properties[1].construction), false);
  assert.equal(result.phase, "ready");
});

test("takeover transfers ownership and money exactly once", () => {
  const harness = makeHarness();
  const state = { current: 1, phase: "resolving", extraRoll: false, players: players(), properties: { 1: { owner: 0, level: 1, invested: 200 } } };
  state.players[0].cash = 500;
  state.players[0].owned = [1];
  state.players[1].cash = 1000;
  setState(harness, state);
  harness.run("finishResolution = () => {}; takeoverProperty(state.players[1], state.players[0], 1, 400)");
  const result = harness.snapshot();
  assert.equal(result.properties[1].owner, 1);
  assert.deepEqual(result.players[0].owned, []);
  assert.deepEqual(result.players[1].owned, [1]);
  assert.equal(result.players[0].cash, 900);
  assert.equal(result.players[1].cash, 600);
});

test("bankruptcy transfers every property to the creditor", () => {
  const harness = makeHarness();
  const state = { current: 0, players: players(), properties: { 1: { owner: 0, level: 1, invested: 170 }, 2: { owner: 0, level: 2, invested: 450 } } };
  state.players[0].owned = [1, 2];
  state.players[1].owned = [];
  setState(harness, state);
  harness.run("eliminatePlayer(state.players[0], state.players[1])");
  const result = harness.snapshot();
  assert.equal(result.players[0].active, false);
  assert.equal(result.players[0].cash, 0);
  assert.deepEqual(result.players[0].owned, []);
  assert.deepEqual(result.players[1].owned, [1, 2]);
  assert.equal(result.properties[1].owner, 1);
  assert.equal(result.properties[2].owner, 1);
});

test("monopoly doubles toll while landmarks remain the highest toll tier", () => {
  const harness = makeHarness();
  const state = { current: 0, players: players(), properties: { 1: { owner: 0, level: 3, invested: 1000 }, 2: { owner: 0, level: 1, invested: 180 } } };
  state.players[0].owned = [1, 2];
  setState(harness, state);
  assert.equal(harness.run("hasMonopoly(0, 'EU BLUE')"), true);
  assert.equal(harness.run("currentToll(1)"), 48 * 7 * 2);
});

test("landmarks never expose a takeover action", () => {
  const harness = makeHarness();
  const state = { current: 1, players: players(), properties: { 1: { owner: 0, level: 3, invested: 1000 } } };
  state.players[0].owned = [1];
  state.players[1].position = 1;
  setState(harness, state);
  harness.run("resolveTile()");
  const actions = harness.snapshot("lastModal.actions.map(action => action.label)");
  assert.deepEqual(actions, ["통행료만 내기"]);
  assert.equal(harness.snapshot("state.properties[1].owner"), 0);
});

test("a loss event cannot make cash negative and eliminates a zero-cash team", () => {
  const harness = makeHarness();
  const state = { current: 0, players: players(), properties: {} };
  state.players[0].cash = 50;
  setState(harness, state);
  harness.run("Math.random = () => 0.3; finishResolution = () => {}; openEvent(TILES[3])");
  assert.match(harness.snapshot("lastModal.title"), /시차 계산 실패/);
  harness.run("lastModal.actions[0].onClick()");
  const result = harness.snapshot();
  assert.equal(result.players[0].cash, 0);
  assert.equal(result.players[0].active, false);
});

test("enterprise value weights cash, assets, brand, laps, and construction", () => {
  const harness = makeHarness();
  const state = { current: 0, players: players(), properties: { 1: { owner: 0, level: 1, invested: 200 }, 2: { owner: 0, level: 1, invested: 400, construction: { targetLevel: 2, turnsRemaining: 1, totalTurns: 2 } } } };
  state.players[0].cash = 1000;
  state.players[0].brandValue = 100;
  state.players[0].laps = 1;
  state.players[0].owned = [1, 2];
  setState(harness, state);
  assert.equal(harness.run("propertyValue(1)"), 250);
  assert.equal(harness.run("propertyValue(2)"), 560);
  assert.deepEqual(harness.snapshot("valuationBreakdown(state.players[0])"), {
    cash: 200,
    assets: 810,
    brand: 100,
    lapMultiplier: 1.1,
    total: 1201
  });
});

test("round 12 wrap selects the active company with the highest value", async () => {
  const harness = makeHarness();
  const state = { current: 1, round: 12, turn: 24, phase: "done", extraRoll: false, players: players(), properties: {} };
  state.players[0].cash = 1000;
  state.players[1].cash = 2000;
  setState(harness, state);
  harness.run("showVictory = (winner, byRoundLimit) => { globalThis.victory = { id: winner.id, byRoundLimit }; }");
  await harness.run("nextTurn()");
  assert.deepEqual(harness.snapshot("victory"), { id: 1, byRoundLimit: true });
});

test("interrupted saves recover to a safe phase and normalize construction", () => {
  const harness = makeHarness();
  const saved = { version: 3, started: true, current: 0, round: 2, turn: 3, phase: "rolling", extraRoll: true, players: players(), properties: { 1: { owner: 0, level: 1, invested: 400, construction: { targetLevel: 99, turnsRemaining: 99 } } }, log: [] };
  saved.players[0].doubleStreak = 2;
  harness.storage.set("sap-city-run-v3", JSON.stringify(saved));
  const recovered = harness.snapshot("loadSaved()");
  assert.equal(recovered.phase, "done");
  assert.equal(recovered.extraRoll, false);
  assert.equal(recovered.players[0].doubleStreak, 0);
  assert.deepEqual(recovered.properties[1].construction, { targetLevel: 3, turnsRemaining: 3, totalTurns: 3 });
});

test("activity history remains bounded under repeated actions", () => {
  const harness = makeHarness();
  setState(harness, { players: players(), properties: {}, log: [] });
  harness.run("addLog = globalThis.__realAddLog");
  for (let index = 0; index < 40; index++) harness.run(`addLog('event ${index}')`);
  const log = harness.snapshot("state.log");
  assert.equal(log.length, 12);
  assert.equal(log[0].text, "event 39");
});
