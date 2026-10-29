const COLORS = ["#25e5d8", "#ff756d", "#ffc14e", "#927cff", "#56b7ff", "#c9ff57"];
const ROLES = ["Global Strategist", "Cloud Architect", "Market Explorer", "Innovation Lead", "People Champion", "Data Navigator"];
const REGION_COLORS = { HQ: "#25e5d8", EUROPE: "#16a7ff", AMERICAS: "#ff756d", MEA: "#ffc14e", APJ: "#927cff", EVENT: "#ffc14e" };
const REGION_LABELS = { HQ: "HQ", EUROPE: "EUR", AMERICAS: "AMER", MEA: "MEA", APJ: "APJ", EVENT: "EVENT" };

const TILES = [
  { type: "start", name: "Walldorf", country: "HQ · Germany", flag: "🇩🇪", region: "HQ", note: "GLOBAL HQ" },
  { type: "city", name: "Berlin", country: "Germany", flag: "🇩🇪", region: "EUROPE", price: 170, fee: 48, vp: 1 },
  { type: "city", name: "'s-Hertogenbosch", country: "Netherlands", flag: "🇳🇱", region: "EUROPE", price: 180, fee: 52, vp: 1 },
  { type: "event", name: "Europe Exchange", country: "REGION EVENT", flag: "✦", region: "EVENT" },
  { type: "city", name: "Paris", country: "France", flag: "🇫🇷", region: "EUROPE", price: 200, fee: 60, vp: 2 },
  { type: "city", name: "London", country: "United Kingdom", flag: "🇬🇧", region: "EUROPE", price: 210, fee: 64, vp: 2 },
  { type: "city", name: "Zurich", country: "Switzerland", flag: "🇨🇭", region: "EUROPE", price: 220, fee: 68, vp: 2 },
  { type: "city", name: "Newtown Square", country: "Pennsylvania · USA", flag: "🇺🇸", region: "AMERICAS", price: 230, fee: 72, vp: 2 },
  { type: "event", name: "Americas Summit", country: "REGION EVENT", flag: "✦", region: "EVENT" },
  { type: "city", name: "New York", country: "USA", flag: "🇺🇸", region: "AMERICAS", price: 240, fee: 76, vp: 2 },
  { type: "city", name: "Palo Alto", country: "California · USA", flag: "🇺🇸", region: "AMERICAS", price: 280, fee: 92, vp: 3 },
  { type: "city", name: "Monterrey", country: "Mexico", flag: "🇲🇽", region: "AMERICAS", price: 210, fee: 64, vp: 2 },
  { type: "city", name: "São Paulo", country: "Brazil", flag: "🇧🇷", region: "AMERICAS", price: 230, fee: 72, vp: 2 },
  { type: "city", name: "São Leopoldo", country: "Brazil", flag: "🇧🇷", region: "AMERICAS", price: 200, fee: 60, vp: 2 },
  { type: "event", name: "Global Sync", country: "WORLD EVENT", flag: "✦", region: "EVENT" },
  { type: "city", name: "Johannesburg", country: "South Africa", flag: "🇿🇦", region: "MEA", price: 210, fee: 66, vp: 2 },
  { type: "city", name: "Dubai", country: "United Arab Emirates", flag: "🇦🇪", region: "MEA", price: 240, fee: 78, vp: 2 },
  { type: "city", name: "Bengaluru", country: "India", flag: "🇮🇳", region: "APJ", price: 280, fee: 92, vp: 3 },
  { type: "city", name: "Singapore", country: "Singapore", flag: "🇸🇬", region: "APJ", price: 260, fee: 84, vp: 3 },
  { type: "city", name: "Shanghai", country: "China", flag: "🇨🇳", region: "APJ", price: 240, fee: 76, vp: 2 },
  { type: "event", name: "APJ Connect", country: "REGION EVENT", flag: "✦", region: "EVENT" },
  { type: "city", name: "Tokyo", country: "Japan", flag: "🇯🇵", region: "APJ", price: 250, fee: 82, vp: 2 },
  { type: "city", name: "Seoul", country: "South Korea", flag: "🇰🇷", region: "APJ", price: 250, fee: 82, vp: 2 },
  { type: "city", name: "Sydney", country: "Australia", flag: "🇦🇺", region: "APJ", price: 230, fee: 72, vp: 2 }
];

const EVENTS = [
  { icon: "↗", title: "글로벌 고객 데모 성공", body: "서로 다른 지역의 팀이 같은 스토리로 고객을 설득했습니다. 글로벌 협업 보너스를 받습니다.", cash: 140, vp: 1, tone: "#25e5d8" },
  { icon: "◎", title: "Experience Center 초청", body: "혁신 사례를 직접 체험하고 새로운 파트너를 만났습니다. 네트워크 가치가 상승합니다.", cash: 80, vp: 1, tone: "#16a7ff" },
  { icon: "!", title: "시차 계산 실패", body: "글로벌 미팅 시간을 잘못 잡았습니다. 항공권과 일정 변경 비용이 발생합니다.", cash: -100, vp: 0, tone: "#ff756d" },
  { icon: "◇", title: "지역 규정 업데이트", body: "현지 컴플라이언스 검토를 신속하게 완료했습니다. 신뢰도와 기업가치가 상승합니다.", cash: -40, vp: 1, tone: "#927cff" },
  { icon: "✦", title: "SAP Community Meetup", body: "현지 커뮤니티가 당신의 글로벌 확장을 도왔습니다. 운영 예산을 확보합니다.", cash: 120, vp: 0, tone: "#ffc14e" },
  { icon: "⌁", title: "클라우드 리전 점검", body: "서비스 가용성을 위해 긴급 점검을 진행했습니다. 비용은 들었지만 시스템은 안정적입니다.", cash: -80, vp: 0, tone: "#56b7ff" },
  { icon: "★", title: "Best Run Award", body: "지역 간 협업 성과를 인정받았습니다. 기업가치가 크게 상승합니다.", cash: 60, vp: 2, tone: "#c9ff57" },
  { icon: "↺", title: "출장 일정 재조정", body: "예상치 못한 항공편 변경으로 운영 예산이 감소했습니다.", cash: -120, vp: 0, tone: "#ff756d" }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let selectedCount = 2;
let state = null;
let toastTimer = null;
let modalCloseHandler = null;
let soundOn = false;
let audioContext = null;

function tileGrid(index) {
  if (index <= 6) return { row: 7, col: 7 - index };
  if (index <= 12) return { row: 13 - index, col: 1 };
  if (index <= 18) return { row: 1, col: index - 11 };
  return { row: index - 17, col: 7 };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function buildBoard() {
  const board = $("#board");
  TILES.forEach((tile, index) => {
    const pos = tileGrid(index);
    const el = document.createElement("article");
    el.className = `tile ${tile.type === "event" ? "event-tile" : ""} ${tile.type === "start" ? "start-tile" : ""}`;
    el.dataset.index = index;
    el.style.gridRow = pos.row;
    el.style.gridColumn = pos.col;
    el.style.setProperty("--tile-color", REGION_COLORS[tile.region]);
    el.title = tile.type === "city" ? `${tile.name}, ${tile.country} · 허브 설립비 ₡${tile.price}` : tile.name;
    el.innerHTML = `<span class="tile-index">${String(index).padStart(2, "0")} · ${REGION_LABELS[tile.region]}</span><span class="tile-flag">${tile.flag}</span><strong class="tile-name">${tile.name}</strong><span class="tile-meta"><span>${tile.country}</span><b class="tile-price">${tile.price ? `₡${tile.price}` : tile.note || "DRAW"}</b></span><span class="token-stack"></span>`;
    board.appendChild(el);
  });
}

function renderNameFields() {
  const current = $$("#nameFields input").map(input => input.value);
  const root = $("#nameFields");
  root.replaceChildren();
  for (let i = 0; i < selectedCount; i++) {
    const label = document.createElement("label");
    label.className = "name-field";
    label.style.setProperty("--player-color", COLORS[i]);
    label.innerHTML = `<i></i><input maxlength="14" value="${escapeHtml(current[i] || "")}" placeholder="PLAYER ${i + 1}" aria-label="플레이어 ${i + 1} 이름" />`;
    root.appendChild(label);
  }
}

function newGame(names) {
  state = { version: 2, started: true, current: 0, round: 1, turn: 1, phase: "ready", owners: {}, players: names.map((name, index) => ({ id: index, name: name.trim() || `PLAYER ${index + 1}`, color: COLORS[index], cash: 1200, value: 0, position: 0, owned: [], active: true })), log: [] };
  addLog(`${names.length}개 글로벌 팀이 Walldorf에서 출발합니다.`, "#25e5d8");
  saveGame();
  enterGame();
}

function enterGame() {
  $("#setupLayer").classList.remove("is-visible");
  renderTokens();
  renderAll();
  showToast("Global tour ready", `${currentPlayer().name} 팀부터 시작합니다.`, "◎", currentPlayer().color);
}

function currentPlayer() { return state.players[state.current]; }

function setDigits(group, str) {
  const prev = group.textContent.replace(/\s+/g, "");
  const compact = str.replace(/\s+/g, "");
  let same = 0;
  while (same < prev.length && same < compact.length && prev[same] === compact[same]) same++;
  group.classList.remove("is-animating");
  group.replaceChildren();
  const chars = str.split("");
  chars.forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "t-digit";
    span.textContent = ch;
    if (i < same) span.dataset.same = "";
    if (i === chars.length - 2) span.dataset.stagger = "1";
    else if (i === chars.length - 1) span.dataset.stagger = "2";
    group.appendChild(span);
  });
  void group.offsetHeight;
  group.classList.add("is-animating");
}

function renderAll() {
  if (!state) return;
  const player = currentPlayer();
  $(".turn-card").style.setProperty("--player-color", player.color);
  $("#currentAvatar").style.setProperty("--player-color", player.color);
  $("#currentAvatar").textContent = player.name.slice(0, 1).toUpperCase();
  $("#currentName").textContent = player.name;
  $("#currentRole").textContent = ROLES[player.id];
  $("#turnChip").textContent = `TURN ${String(state.turn).padStart(2, "0")}`;
  setDigits($("#currentCash"), `₡ ${player.cash.toLocaleString("ko-KR")}`);
  setDigits($("#currentValue"), `${player.value} VP`);
  setDigits($("#currentGoal"), `${Math.max(0, 15 - player.value)} VP`);
  setDigits($("#currentHubs"), String(player.owned.length));
  setDigits($("#roundNumber"), String(state.round));
  $("#moduleCount").textContent = Object.keys(state.owners).length;
  $("#totalValue").textContent = `${state.players.reduce((sum, item) => sum + item.value, 0)} VP`;
  $("#processStatus").textContent = state.phase === "rolling" ? "MOVING" : state.phase === "done" ? "SYNCED" : "READY";
  $("#systemHealth").textContent = `${Math.max(86, 99 - state.log.filter(item => item.color === "#ff756d").length * 0.7).toFixed(1)}%`;
  $("#turnEyebrow").textContent = state.phase === "done" ? "CITY SYNCED" : "NEXT DESTINATION";
  $("#turnHeadline").textContent = `${player.name}의 글로벌 턴`;
  $("#turnHint").textContent = state.phase === "done" ? "현재 도시 처리가 완료되었습니다. 다음 팀으로 넘겨주세요." : "주사위를 굴려 다음 SAP 오피스로 이동하세요.";
  renderPlayers();
  renderOwnership();
  renderLog();
  updateAction();
  $$(".tile").forEach(tile => tile.classList.toggle("is-current", Number(tile.dataset.index) === player.position));
  $$(".player-token").forEach(token => token.classList.toggle("is-active", Number(token.dataset.player) === player.id));
}

function renderPlayers() {
  const list = $("#playersList");
  list.replaceChildren();
  state.players.forEach(player => {
    const card = document.createElement("div");
    card.className = `player-card ${player.id === state.current ? "is-current" : ""} ${!player.active ? "is-out" : ""}`;
    card.style.setProperty("--player-color", player.color);
    const remainingVp = Math.max(0, 15 - player.value);
    card.setAttribute("aria-label", `${player.name}, 보유 자금 ${player.cash}, 우승까지 ${remainingVp} VP, 보유 도시 ${player.owned.length}개`);
    card.innerHTML = `<span class="mini-avatar">${escapeHtml(player.name.slice(0,1).toUpperCase())}</span><div class="team-card-head"><strong>${escapeHtml(player.name)}</strong>${player.id === state.current ? '<em>NOW</em>' : ''}</div><div class="team-stats"><span class="team-stat cash"><small>보유 자금</small><b>₡${player.cash.toLocaleString("ko-KR")}</b></span><span class="team-stat goal"><small>우승까지</small><b>${remainingVp} VP</b></span><span class="team-stat hubs"><small>도시</small><b>${player.owned.length}</b></span></div>`;
    list.appendChild(card);
  });
  $("#activePlayers").textContent = `${state.players.filter(player => player.active).length} ACTIVE`;
}

function renderOwnership() {
  $$(".tile-owner").forEach(node => node.remove());
  Object.entries(state.owners).forEach(([tileIndex, ownerId]) => {
    const tile = $(`.tile[data-index="${tileIndex}"]`);
    const owner = state.players[ownerId];
    if (!tile || !owner) return;
    const marker = document.createElement("i");
    marker.className = "tile-owner";
    marker.style.setProperty("--owner-color", owner.color);
    marker.title = `${owner.name} 허브`;
    tile.appendChild(marker);
  });
}

function renderTokens() {
  $$(".token-stack").forEach(stack => stack.replaceChildren());
  if (!state) return;
  state.players.forEach(player => {
    const token = document.createElement("span");
    token.id = `token-${player.id}`;
    token.className = "player-token";
    token.dataset.player = player.id;
    token.style.setProperty("--token-color", player.color);
    token.textContent = player.id + 1;
    token.title = player.name;
    $(`.tile[data-index="${player.position}"] .token-stack`).appendChild(token);
  });
}

function renderLog() {
  const root = $("#activityLog");
  root.replaceChildren();
  state.log.slice(0, 7).forEach(item => {
    const li = document.createElement("li");
    li.className = "log-item";
    li.style.setProperty("--log-color", item.color);
    li.innerHTML = `<i class="log-dot"></i><span>${escapeHtml(item.text)}</span><time>${item.time}</time>`;
    root.appendChild(li);
  });
}

function addLog(text, color = "#16a7ff") {
  const time = new Intl.DateTimeFormat("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  state.log.unshift({ text, color, time });
  state.log = state.log.slice(0, 12);
}

function updateAction() {
  const button = $("#actionButton");
  const label = $("#actionText");
  if (!state) { button.disabled = true; label.textContent = "게임 시작하기"; return; }
  if (state.phase === "ready") { button.disabled = false; label.textContent = "주사위 굴리기"; }
  else if (state.phase === "done") { button.disabled = false; label.textContent = "다음 팀으로"; }
  else if (state.phase === "gameover") { button.disabled = true; label.textContent = "게임 종료"; }
  else { button.disabled = true; label.textContent = state.phase === "rolling" ? "글로벌 경로 계산 중…" : "도시 처리 중…"; }
}

async function rollDice() {
  if (!state || state.phase !== "ready") return;
  state.phase = "rolling";
  updateAction();
  $("#processStatus").textContent = "MOVING";
  const result = Math.floor(Math.random() * 6) + 1;
  const die = $("#die");
  die.classList.remove("is-rolling");
  void die.offsetWidth;
  die.classList.add("is-rolling");
  playTone(220, .08);
  await wait(reducedMotion ? 40 : 720);
  die.classList.remove("is-rolling");
  die.style.transform = ({ 1: "rotateX(0deg) rotateY(0deg)", 2: "rotateY(-90deg)", 3: "rotateX(-90deg)", 4: "rotateX(90deg)", 5: "rotateY(90deg)", 6: "rotateY(180deg)" })[result];
  $("#diceLabel").innerHTML = `<span style="color:var(--cyan)">${result}</span>칸 이동합니다<br />글로벌 경로 동기화`;
  addLog(`${currentPlayer().name} 팀이 ${result}을 굴렸습니다.`, currentPlayer().color);
  await movePlayer(result);
  resolveTile();
}

async function movePlayer(steps) {
  const player = currentPlayer();
  for (let i = 0; i < steps; i++) {
    const next = (player.position + 1) % TILES.length;
    if (next === 0) {
      player.cash += 200;
      player.value += 1;
      showToast("Walldorf 리포트", "세계 일주 완료: ₡200와 1 VP를 확보했습니다.", "↻", "#25e5d8");
      playTone(520, .07);
    }
    player.position = next;
    await moveToken(player, next);
    if (i < steps - 1) playTone(300 + i * 22, .035);
  }
  saveGame();
  renderAll();
}

async function moveToken(player, position) {
  const token = $(`#token-${player.id}`);
  const target = $(`.tile[data-index="${position}"] .token-stack`);
  if (!token || !target) return;
  const first = token.getBoundingClientRect();
  target.appendChild(token);
  const last = token.getBoundingClientRect();
  if (reducedMotion) return;
  token.classList.add("is-moving");
  const rootStyle = getComputedStyle(document.documentElement);
  const stepDuration = Number.parseFloat(rootStyle.getPropertyValue("--token-step-duration")) || 520;
  const settleDuration = Number.parseFloat(rootStyle.getPropertyValue("--token-settle-duration")) || 90;
  const travelEase = rootStyle.getPropertyValue("--token-travel-ease").trim() || "cubic-bezier(0.22, 1, 0.36, 1)";
  const dx = first.left - last.left;
  const dy = first.top - last.top;
  const lift = Math.min(14, Math.max(8, Math.hypot(dx, dy) * .13));
  const travel = token.animate([
    { transform: `translate(${dx}px, ${dy}px) scale(.88)`, offset: 0 },
    { transform: `translate(${dx * .48}px, ${dy * .48 - lift}px) scale(1.08)`, offset: .56 },
    { transform: "translate(0, 0) scale(1)", offset: 1 }
  ], { duration: stepDuration, easing: travelEase, fill: "both" });
  await travel.finished;
  travel.cancel();
  await wait(settleDuration);
  token.classList.remove("is-moving");
}

function resolveTile() {
  state.phase = "resolving";
  const player = currentPlayer();
  const tile = TILES[player.position];
  renderAll();
  if (tile.type === "event") return openEvent(tile);
  if (tile.type === "start") {
    player.cash += 100;
    addLog(`${player.name} 팀이 Walldorf HQ 브리핑으로 ₡100을 받았습니다.`, "#25e5d8");
    showToast("Headquarters briefing", "운영 예산 ₡100을 확보했습니다.", "W", "#25e5d8");
    return finishResolution();
  }
  const ownerId = state.owners[player.position];
  if (ownerId === undefined) return offerCity(tile, player.position);
  if (ownerId === player.id) {
    player.cash += 35;
    addLog(`${player.name} 팀이 ${tile.name} 허브 운영으로 ₡35을 확보했습니다.`, player.color);
    showToast(`${tile.name} hub online`, "현지 운영 수익 ₡35을 확보했습니다.", tile.flag, REGION_COLORS[tile.region]);
    return finishResolution();
  }
  const owner = state.players[ownerId];
  const payment = Math.min(player.cash, tile.fee);
  player.cash -= payment;
  owner.cash += payment;
  addLog(`${player.name} → ${owner.name}: ${tile.name} 네트워크 이용료 ₡${payment}`, owner.color);
  showModal({ icon: tile.flag, eyebrow: `${tile.region} NETWORK FEE`, title: `${owner.name}의 ${tile.name} 허브`, body: `이미 구축된 글로벌 허브를 이용했습니다. ${owner.name} 팀에 네트워크 이용료를 지급합니다.`, color: owner.color, stats: [["이용료", `₡ ${payment}`], ["남은 예산", `₡ ${player.cash}`]], actions: [{ label: "확인하고 계속", primary: true, onClick: () => { closeGameModal(); if (player.cash <= 0) eliminatePlayer(player, owner); finishResolution(); } }] });
}

function offerCity(tile, index) {
  const player = currentPlayer();
  const canBuy = player.cash >= tile.price;
  showModal({ icon: tile.flag, eyebrow: `${tile.region} · NEW DESTINATION`, title: `${tile.name}에 허브를 설립할까요?`, body: `${tile.country}의 SAP 거점에 팀 허브를 설립하면 ${tile.vp} VP를 얻고, 다른 팀의 방문마다 ₡${tile.fee}의 네트워크 이용료를 받습니다.`, color: REGION_COLORS[tile.region], stats: [["설립 예산", `₡ ${tile.price}`], ["기업가치", `+${tile.vp} VP`], ["방문 수익", `₡ ${tile.fee}`], ["보유 예산", `₡ ${player.cash}`]], actions: [
    { label: canBuy ? "허브 설립" : "예산 부족", primary: true, disabled: !canBuy, onClick: () => { player.cash -= tile.price; player.value += tile.vp; player.owned.push(index); state.owners[index] = player.id; addLog(`${player.name} 팀이 ${tile.name} 허브를 설립했습니다.`, player.color); closeGameModal(); showToast("New hub established", `${tile.name} · +${tile.vp} VP`, tile.flag, player.color); playTone(620, .1); finishResolution(); } },
    { label: "이번에는 통과", onClick: () => { addLog(`${player.name} 팀이 ${tile.name} 설립을 보류했습니다.`, "#708a9b"); closeGameModal(); finishResolution(); } }
  ] });
}

function openEvent(tile) {
  const player = currentPlayer();
  const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
  const appliedCash = Math.max(-player.cash, event.cash);
  showModal({ icon: event.icon, eyebrow: `${tile.name.toUpperCase()} · EVENT CARD`, title: event.title, body: event.body, color: event.tone, stats: [["운영 예산", `${appliedCash >= 0 ? "+" : "−"}₡ ${Math.abs(appliedCash)}`], ["기업가치", `${event.vp >= 0 ? "+" : ""}${event.vp} VP`]], actions: [{ label: "카드 적용", primary: true, onClick: () => { player.cash += appliedCash; player.value = Math.max(0, player.value + event.vp); addLog(`${player.name}: ${event.title} (${appliedCash >= 0 ? "+" : ""}${appliedCash}, +${event.vp} VP)`, event.tone); closeGameModal(); showToast(event.title, `${appliedCash >= 0 ? "+" : ""}₡${appliedCash} · ${event.vp >= 0 ? "+" : ""}${event.vp} VP`, event.icon, event.tone); if (player.cash <= 0) eliminatePlayer(player); finishResolution(); } }] });
}

function eliminatePlayer(player, creditor = null) {
  player.active = false;
  player.cash = 0;
  player.owned.forEach(tileIndex => { if (creditor) { state.owners[tileIndex] = creditor.id; creditor.owned.push(tileIndex); } else delete state.owners[tileIndex]; });
  player.owned = [];
  addLog(`${player.name} 팀의 글로벌 투어가 종료되었습니다.`, "#ff756d");
}

function finishResolution() {
  const winner = checkWinner();
  if (winner) return showVictory(winner);
  state.phase = "done";
  saveGame();
  renderAll();
}

function checkWinner() {
  const valueWinner = state.players.find(player => player.active && player.value >= 15);
  if (valueWinner) return valueWinner;
  const active = state.players.filter(player => player.active);
  return active.length === 1 ? active[0] : null;
}

function nextTurn() {
  if (!state || state.phase !== "done") return;
  let next = state.current;
  do next = (next + 1) % state.players.length; while (!state.players[next].active);
  if (next <= state.current) state.round++;
  state.current = next;
  state.turn++;
  state.phase = "ready";
  $("#diceLabel").innerHTML = "주사위를 굴려<br />다음 SAP 도시로";
  saveGame();
  renderAll();
  showToast(`${currentPlayer().name} turn`, "글로벌 경로가 준비되었습니다.", "→", currentPlayer().color);
}

function showVictory(winner) {
  state.phase = "gameover";
  saveGame();
  celebrate(winner.color);
  showModal({ icon: "★", eyebrow: "GLOBAL NETWORK COMPLETE", title: `${winner.name} 팀이 세계를 연결했습니다!`, body: `${winner.owned.length}개 도시 허브와 ${winner.value} VP로 SAP CITY RUN의 최종 우승 팀이 되었습니다.`, color: winner.color, stats: [["최종 기업가치", `${winner.value} VP`], ["글로벌 허브", `${winner.owned.length} CITY`], ["남은 예산", `₡ ${winner.cash}`], ["완주 라운드", `${state.round}`]], actions: [{ label: "새 게임 시작", primary: true, onClick: () => { closeGameModal(); localStorage.removeItem("sap-city-run-v2"); location.reload(); } }] });
  renderAll();
}

function showModal({ icon, eyebrow, title, body, color, stats = [], actions = [] }) {
  const layer = $("#modalLayer");
  const modal = $("#gameModal");
  modal.style.setProperty("--modal-color", color || "#25e5d8");
  $("#modalIcon").textContent = icon;
  $("#modalEyebrow").textContent = eyebrow;
  $("#modalTitle").textContent = title;
  $("#modalBody").textContent = body;
  $("#modalStats").innerHTML = stats.map(([label, value]) => `<div class="modal-stat"><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>`).join("");
  const actionsRoot = $("#modalActions");
  actionsRoot.replaceChildren();
  actions.forEach(action => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `modal-action ${action.primary ? "primary" : ""}`;
    button.textContent = action.label;
    button.disabled = Boolean(action.disabled);
    button.addEventListener("click", action.onClick);
    actionsRoot.appendChild(button);
  });
  modalCloseHandler = actions.at(-1)?.onClick || null;
  layer.classList.add("is-open");
  layer.setAttribute("aria-hidden", "false");
  modal.classList.remove("is-closing");
  modal.classList.add("is-open");
  setTimeout(() => $(".modal-action.primary:not(:disabled)", actionsRoot)?.focus(), 80);
}

function closeGameModal() {
  const layer = $("#modalLayer");
  const modal = $("#gameModal");
  const closeMs = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--modal-close-dur")) || 150;
  modal.classList.remove("is-open");
  modal.classList.add("is-closing");
  layer.classList.remove("is-open");
  layer.setAttribute("aria-hidden", "true");
  setTimeout(() => modal.classList.remove("is-closing"), closeMs);
  modalCloseHandler = null;
}

function openRules() {
  const layer = $("#rulesLayer");
  const modal = $(".rules-modal");
  layer.classList.add("is-open");
  layer.setAttribute("aria-hidden", "false");
  modal.classList.remove("is-closing");
  modal.classList.add("is-open");
  setTimeout(() => $("#rulesConfirm").focus(), 80);
}

function closeRules() {
  const layer = $("#rulesLayer");
  const modal = $(".rules-modal");
  const closeMs = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--modal-close-dur")) || 150;
  modal.classList.remove("is-open");
  modal.classList.add("is-closing");
  layer.classList.remove("is-open");
  layer.setAttribute("aria-hidden", "true");
  setTimeout(() => modal.classList.remove("is-closing"), closeMs);
}

function showToast(title, body, icon = "✓", color = "#25e5d8") {
  const toast = $("#toast");
  $("#toastTitle").textContent = title;
  $("#toastBody").textContent = body;
  $("#toastIcon").textContent = icon;
  toast.style.setProperty("--toast-color", color);
  toast.classList.add("is-open");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-open"), 3000);
}

function celebrate(baseColor) {
  const root = $("#confetti");
  const palette = [baseColor, ...COLORS];
  for (let i = 0; i < 72; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--confetti-color", palette[i % palette.length]);
    piece.style.setProperty("--fall-duration", `${2.2 + Math.random() * 2.4}s`);
    piece.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    piece.style.animationDelay = `${Math.random() * .7}s`;
    root.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
}

function saveGame() { if (state) localStorage.setItem("sap-city-run-v2", JSON.stringify(state)); }
function loadSaved() {
  try {
    const parsed = JSON.parse(localStorage.getItem("sap-city-run-v2"));
    if (!parsed?.started || !Array.isArray(parsed.players) || parsed.players.length < 2 || parsed.version !== 2) return null;
    return parsed;
  } catch { return null; }
}

function playTone(frequency, duration) {
  if (!soundOn) return;
  audioContext ||= new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  gain.gain.setValueAtTime(.055, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function bindEvents() {
  $$(".player-count button").forEach(button => button.addEventListener("click", () => {
    selectedCount = Number(button.dataset.count);
    $$(".player-count button").forEach(item => item.classList.toggle("is-selected", item === button));
    renderNameFields();
  }));
  $("#setupForm").addEventListener("submit", event => { event.preventDefault(); newGame($$("#nameFields input").map((input, index) => input.value.trim() || `PLAYER ${index + 1}`)); });
  $("#resumeButton").addEventListener("click", () => { state = loadSaved(); if (state) enterGame(); });
  $("#actionButton").addEventListener("click", () => state?.phase === "ready" ? rollDice() : state?.phase === "done" ? nextTurn() : null);
  $("#modalClose").addEventListener("click", () => modalCloseHandler?.());
  $("#rulesButton").addEventListener("click", openRules);
  $("#rulesClose").addEventListener("click", closeRules);
  $("#rulesConfirm").addEventListener("click", closeRules);
  $("#soundButton").addEventListener("click", () => { soundOn = !soundOn; $("#soundButton").setAttribute("aria-pressed", String(soundOn)); $("#soundButton").setAttribute("aria-label", soundOn ? "효과음 끄기" : "효과음 켜기"); if (soundOn) playTone(480, .08); });
  $("#resetButton").addEventListener("click", () => { if (!state || confirm("현재 게임을 초기화하고 새로 시작할까요?")) { localStorage.removeItem("sap-city-run-v2"); location.reload(); } });
  document.addEventListener("keydown", event => {
    if (event.code === "Space" && state && !$(".modal-layer.is-open") && !$("#setupLayer").classList.contains("is-visible")) { event.preventDefault(); $("#actionButton").click(); }
    if (event.key === "Escape") { if ($("#rulesLayer").classList.contains("is-open")) closeRules(); else if ($("#modalLayer").classList.contains("is-open")) modalCloseHandler?.(); }
  });
}

function init() {
  buildBoard();
  renderNameFields();
  bindEvents();
  $("#resumeButton").hidden = !loadSaved();
}

init();
