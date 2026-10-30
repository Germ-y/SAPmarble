const COLORS = ["#25e5d8", "#ff756d", "#ffc14e", "#927cff", "#56b7ff", "#c9ff57"];
const ROLES = ["Global Strategist", "Cloud Architect", "Market Explorer", "Innovation Lead", "People Champion", "Data Navigator"];
const REGION_COLORS = { HQ: "#25e5d8", EUROPE: "#16a7ff", AMERICAS: "#ff756d", MEA: "#ffc14e", APJ: "#927cff", EVENT: "#ffc14e" };
const REGION_LABELS = { HQ: "HQ", EUROPE: "EUR", AMERICAS: "AMER", MEA: "MEA", APJ: "APJ", EVENT: "EVENT" };
const MAX_ROUNDS = 12;
const STARTING_CASH = 2000;
const STORAGE_KEY = "sap-city-run-v3";
const BUILDING_LABELS = ["", "SAP", "SAP Labs", "랜드마크"];
const TOLL_MULTIPLIERS = [0, 1, 3, 7];
const LANDMARK_LEVEL = BUILDING_LABELS.length - 1;
const CONSTRUCTION_TURNS = [0, 1, 2, 3];
const CASH_VALUE_WEIGHT = 0.2;
const LAP_VALUE_MULTIPLIER = 1.1;
const ASSET_VALUE_MULTIPLIERS = [0.8, 1.25, 1.75, 2.5];
const CONSTRUCTION_VALUE_WEIGHT = 0.8;

const TILES = [
  { type: "start", name: "Walldorf", country: "HQ · Germany", flag: "🇩🇪", region: "HQ", note: "GLOBAL HQ" },
  { type: "city", name: "Berlin", country: "Germany", flag: "🇩🇪", region: "EUROPE", group: "EU BLUE", price: 170, fee: 48 },
  { type: "city", name: "'s-Hertogenbosch", country: "Netherlands", flag: "🇳🇱", region: "EUROPE", group: "EU BLUE", price: 180, fee: 52 },
  { type: "event", name: "Europe Exchange", country: "REGION EVENT", flag: "✦", region: "EVENT" },
  { type: "city", name: "Paris", country: "France", flag: "🇫🇷", region: "EUROPE", group: "EU SKY", price: 200, fee: 60 },
  { type: "city", name: "London", country: "United Kingdom", flag: "🇬🇧", region: "EUROPE", group: "EU SKY", price: 210, fee: 64 },
  { type: "city", name: "Zurich", country: "Switzerland", flag: "🇨🇭", region: "EUROPE", group: "EU SKY", price: 220, fee: 68 },
  { type: "city", name: "Newtown Square", country: "Pennsylvania · USA", flag: "🇺🇸", region: "AMERICAS", group: "AM CORAL", price: 230, fee: 72 },
  { type: "island", name: "Cloud Island", country: "ONE TURN BREAK", flag: "☁", region: "EVENT" },
  { type: "city", name: "New York", country: "USA", flag: "🇺🇸", region: "AMERICAS", group: "AM CORAL", price: 240, fee: 76 },
  { type: "city", name: "Palo Alto", country: "California · USA", flag: "🇺🇸", region: "AMERICAS", group: "AM CORAL", price: 280, fee: 92 },
  { type: "city", name: "Monterrey", country: "Mexico", flag: "🇲🇽", region: "AMERICAS", group: "AM ROSE", price: 210, fee: 64 },
  { type: "city", name: "São Paulo", country: "Brazil", flag: "🇧🇷", region: "AMERICAS", group: "AM ROSE", price: 230, fee: 72 },
  { type: "city", name: "São Leopoldo", country: "Brazil", flag: "🇧🇷", region: "AMERICAS", group: "AM ROSE", price: 200, fee: 60 },
  { type: "event", name: "Global Sync", country: "WORLD EVENT", flag: "✦", region: "EVENT" },
  { type: "city", name: "Johannesburg", country: "South Africa", flag: "🇿🇦", region: "MEA", group: "MEA GOLD", price: 210, fee: 66 },
  { type: "city", name: "Dubai", country: "United Arab Emirates", flag: "🇦🇪", region: "MEA", group: "MEA GOLD", price: 240, fee: 78 },
  { type: "city", name: "Bengaluru", country: "India", flag: "🇮🇳", region: "APJ", group: "AP VIOLET", price: 280, fee: 92 },
  { type: "city", name: "Singapore", country: "Singapore", flag: "🇸🇬", region: "APJ", group: "AP VIOLET", price: 260, fee: 84 },
  { type: "city", name: "Shanghai", country: "China", flag: "🇨🇳", region: "APJ", group: "AP VIOLET", price: 240, fee: 76 },
  { type: "event", name: "APJ Connect", country: "REGION EVENT", flag: "✦", region: "EVENT" },
  { type: "city", name: "Tokyo", country: "Japan", flag: "🇯🇵", region: "APJ", group: "AP LAVENDER", price: 250, fee: 82 },
  { type: "city", name: "Seoul", country: "South Korea", flag: "🇰🇷", region: "APJ", group: "AP LAVENDER", price: 250, fee: 82 },
  { type: "city", name: "Sydney", country: "Australia", flag: "🇦🇺", region: "APJ", group: "AP LAVENDER", price: 230, fee: 72 }
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
    el.className = `tile ${tile.type === "event" || tile.type === "island" ? "event-tile" : ""} ${tile.type === "start" ? "start-tile" : ""}`;
    el.dataset.index = index;
    el.style.gridRow = pos.row;
    el.style.gridColumn = pos.col;
    el.style.setProperty("--tile-color", REGION_COLORS[tile.region]);
    el.title = tile.type === "city" ? `${tile.name}, ${tile.country} · 도시 인수 C ${tile.price}` : tile.name;
    const symbol = tile.type === "event" || tile.type === "island"
      ? `<span class="tile-symbol">${escapeHtml(tile.flag)}</span>`
      : tile.type === "start"
        ? `<span class="tile-symbol tile-symbol-hq">HQ</span>`
        : "";
    el.innerHTML = `<span class="tile-index"><b>${String(index).padStart(2, "0")}</b><em>${REGION_LABELS[tile.region]}</em></span><div class="tile-body">${symbol}<strong class="tile-name">${escapeHtml(tile.name)}</strong><span class="tile-country">${escapeHtml(tile.country)}</span></div><b class="tile-price">${tile.price ? `C ${tile.price}` : escapeHtml(tile.note || "DRAW")}</b><span class="token-stack"></span>`;
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
  state = { version: 3, started: true, current: 0, round: 1, turn: 1, phase: "ready", properties: {}, extraRoll: false, players: names.map((name, index) => ({ id: index, name: name.trim() || `PLAYER ${index + 1}`, color: COLORS[index], cash: STARTING_CASH, brandValue: 0, position: 0, owned: [], laps: 0, doubleStreak: 0, skipTurns: 0, active: true })), log: [] };
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

function propertyAt(index) { return state.properties?.[index]; }

function groupTiles(group) {
  return TILES.map((tile, index) => ({ tile, index })).filter(item => item.tile.group === group);
}

function hasMonopoly(ownerId, group) {
  const targets = groupTiles(group);
  return targets.length > 1 && targets.every(item => propertyAt(item.index)?.owner === ownerId);
}

function upgradeCost(tile, nextLevel) {
  return Math.ceil(tile.price * ({ 2: 1.5, 3: 2.5 }[nextLevel] || 0) / 10) * 10;
}

function acquisitionCost(tile, level) {
  let cost = tile.price;
  for (let nextLevel = 2; nextLevel <= level; nextLevel++) cost += upgradeCost(tile, nextLevel);
  return cost;
}

function buildingMarkup(level, className = "building-model", construction = null) {
  const safeLevel = Math.max(1, Math.min(LANDMARK_LEVEL, Number(level) || 1));
  const constructionClass = construction ? " is-under-construction" : "";
  const turns = construction ? `<em class="construction-turns">${construction.turnsRemaining}T</em>` : "";
  return `<i class="${className} building-level-${safeLevel}${constructionClass}" aria-hidden="true"><span class="building-tower tower-a"></span><span class="building-tower tower-b"></span><span class="building-tower tower-c"></span><b>${safeLevel === LANDMARK_LEVEL ? "★" : safeLevel}</b>${turns}</i>`;
}

function propertyValue(index) {
  const property = propertyAt(index);
  if (!property) return 0;
  const level = Math.max(0, Math.min(LANDMARK_LEVEL, property.construction?.targetLevel ?? property.level ?? 0));
  const constructionWeight = property.construction ? CONSTRUCTION_VALUE_WEIGHT : 1;
  return Math.round((property.invested || 0) * ASSET_VALUE_MULTIPLIERS[level] * constructionWeight);
}

function valuationBreakdown(player) {
  const cash = Math.round(Math.max(0, player.cash) * CASH_VALUE_WEIGHT);
  const assets = player.owned.reduce((sum, index) => sum + propertyValue(index), 0);
  const brand = Math.max(0, player.brandValue || 0);
  const lapMultiplier = Math.pow(LAP_VALUE_MULTIPLIER, Math.max(0, player.laps || 0));
  const scaledNonCash = Math.round((assets + brand) * lapMultiplier);
  return { cash, assets, brand, lapMultiplier, total: cash + scaledNonCash };
}

function corporateValue(player) {
  return valuationBreakdown(player).total;
}

function currentToll(index) {
  const tile = TILES[index];
  const property = propertyAt(index);
  if (!property) return 0;
  const monopoly = hasMonopoly(property.owner, tile.group);
  return Math.round(tile.fee * TOLL_MULTIPLIERS[Math.min(property.level, LANDMARK_LEVEL)] * (monopoly ? 2 : 1));
}

function maxBuildLevel(player) { return Math.min(LANDMARK_LEVEL, (player.laps || 0) + 1); }

function constructionDuration(level) { return CONSTRUCTION_TURNS[Math.max(1, Math.min(LANDMARK_LEVEL, level))]; }

function beginConstruction(property, targetLevel) {
  const duration = constructionDuration(targetLevel);
  property.construction = { targetLevel, turnsRemaining: duration, totalTurns: duration };
  return duration;
}

function advanceConstruction(player) {
  const completed = [];
  player.owned.forEach(tileIndex => {
    const property = propertyAt(tileIndex);
    if (!property?.construction) return;
    property.construction.turnsRemaining = Math.max(0, property.construction.turnsRemaining - 1);
    if (property.construction.turnsRemaining > 0) return;
    const level = property.construction.targetLevel;
    property.level = level;
    delete property.construction;
    completed.push({ tileIndex, tile: TILES[tileIndex], level });
    addLog(`${player.name} 팀: ${TILES[tileIndex].name} ${BUILDING_LABELS[level]} 완공`, player.color);
  });
  return completed;
}

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
    span.textContent = ch === " " ? "\u00a0" : ch;
    if (ch === " ") span.dataset.space = "";
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
  $("#currentPosition").textContent = `현재 위치 · ${TILES[player.position].name}`;
  $("#turnChip").textContent = `TURN ${String(state.turn).padStart(2, "0")}`;
  setDigits($("#currentCash"), `C ${player.cash.toLocaleString("ko-KR")}`);
  setDigits($("#currentValue"), `C ${corporateValue(player).toLocaleString("ko-KR")}`);
  const currentValuation = valuationBreakdown(player);
  $("#currentValue").title = `현금 반영 C ${currentValuation.cash.toLocaleString("ko-KR")} + 비현금 자산 ×${currentValuation.lapMultiplier.toFixed(2)}`;
  setDigits($("#currentGoal"), `${Math.max(1, MAX_ROUNDS - state.round + 1)} R`);
  setDigits($("#currentHubs"), String(player.owned.length));
  setDigits($("#roundNumber"), String(state.round));
  $("#moduleCount").textContent = Object.keys(state.properties).length;
  $("#totalValue").textContent = `C ${state.players.filter(item => item.active).reduce((sum, item) => sum + corporateValue(item), 0).toLocaleString("ko-KR")}`;
  $("#processStatus").textContent = state.phase === "rolling" ? "MOVING" : state.phase === "done" ? "SYNCED" : "READY";
  $("#systemHealth").textContent = `${Math.max(86, 99 - state.log.filter(item => item.color === "#ff756d").length * 0.7).toFixed(1)}%`;
  $("#turnEyebrow").textContent = state.phase === "done" ? "CITY SYNCED" : "NEXT DESTINATION";
  $("#turnHeadline").textContent = `${player.name}의 글로벌 턴`;
  $("#turnHint").textContent = state.phase === "done" ? "현재 도시 처리가 완료되었습니다. 다음 팀으로 넘겨주세요." : "주사위를 굴려 다음 SAP 오피스로 이동하세요.";
  renderValueRanking();
  renderPassport();
  renderOwnership();
  renderLog();
  updateAction();
  $$(".tile").forEach(tile => tile.classList.toggle("is-current", Number(tile.dataset.index) === player.position));
  $$(".player-token").forEach(token => {
    const isActive = Number(token.dataset.player) === player.id;
    token.classList.toggle("is-active", isActive);
    token.classList.toggle("is-other", !isActive);
  });
}

function renderValueRanking() {
  const root = $("#valueRanking");
  if (!root) return;
  const ranked = [...state.players].sort((a, b) => {
    if (a.active !== b.active) return a.active ? -1 : 1;
    return corporateValue(b) - corporateValue(a) || b.owned.length - a.owned.length || a.id - b.id;
  });
  root.replaceChildren();
  ranked.forEach((player, index) => {
    const value = valuationBreakdown(player);
    const item = document.createElement("li");
    item.className = `value-rank${player.id === currentPlayer().id ? " is-current" : ""}${player.active ? "" : " is-out"}`;
    item.style.setProperty("--player-color", player.color);
    item.title = `현금 반영 C ${value.cash.toLocaleString("ko-KR")} · 도시/건물 C ${value.assets.toLocaleString("ko-KR")} · 브랜드 C ${value.brand.toLocaleString("ko-KR")} · 완주 배수 ×${value.lapMultiplier.toFixed(2)}`;
    item.innerHTML = `<b>${index + 1}</b><i aria-hidden="true"></i><span><strong>${escapeHtml(player.name)}</strong><small>자산 C ${value.assets.toLocaleString("ko-KR")} · ×${value.lapMultiplier.toFixed(2)}</small></span><em>C ${value.total.toLocaleString("ko-KR")}</em>`;
    root.appendChild(item);
  });
}

function renderPassport() {
  const player = currentPlayer();
  const passport = $("#passportCard");
  const currentCity = TILES[player.position];
  const cityCards = player.owned.length
    ? player.owned.map(tileIndex => {
        const tile = TILES[tileIndex];
        const property = propertyAt(tileIndex);
        const monopoly = hasMonopoly(player.id, tile.group);
        const construction = property?.construction || null;
        const level = construction?.targetLevel || property?.level || 1;
        const status = construction
          ? `${BUILDING_LABELS[level]} 건설 중 · ${construction.turnsRemaining}턴`
          : `${BUILDING_LABELS[level]} · C ${currentToll(tileIndex)}${monopoly ? " ×2" : ""}`;
        return `<span class="passport-city" style="--city-color:${REGION_COLORS[tile.region]}">${buildingMarkup(level, "passport-building", construction)}<b>${escapeHtml(tile.name)}</b><small>${escapeHtml(status)}</small></span>`;
      }).join("")
    : `<div class="passport-empty"><b>첫 도시 인수를 기다리는 중</b><span>빈 도시에 도착해 SAP를 세워 보세요.</span></div>`;
  passport.style.setProperty("--player-color", player.color);
  passport.setAttribute("aria-label", `${player.name}의 개인 현황. 보유 자금 ${player.cash}, 기업가치 ${corporateValue(player)}, 보유 도시 ${player.owned.length}개`);
  passport.innerHTML = `
    <div class="passport-summary">
      <div class="passport-money"><span>사용 가능 자금</span><strong>C ${player.cash.toLocaleString("ko-KR")}</strong></div>
      <div class="passport-progress"><span>기업가치</span><strong>C ${corporateValue(player).toLocaleString("ko-KR")}</strong></div>
      <div class="passport-location"><span>현재 위치</span><strong>${escapeHtml(currentCity.name)}</strong></div>
    </div>
    <div class="passport-assets-head"><span>내가 인수한 SAP 도시</span><b>${player.owned.length} CITIES</b></div>
    <div class="passport-assets">${cityCards}</div>`;
  $("#passportStatus").textContent = player.active ? `현재 팀 · ${player.name}` : "여행 종료";
}

function renderOwnership() {
  $$(".tile-owner, .property-level, .building-model").forEach(node => node.remove());
  $$(".tile").forEach(tile => tile.classList.remove("is-my-hub", "is-rival-hub", "has-building", "construction-site"));
  const activePlayer = currentPlayer();
  Object.entries(state.properties).forEach(([tileIndex, property]) => {
    const tile = $(`.tile[data-index="${tileIndex}"]`);
    const owner = state.players[property.owner];
    if (!tile || !owner) return;
    const isMine = owner.id === activePlayer.id;
    tile.classList.add(isMine ? "is-my-hub" : "is-rival-hub", "has-building");
    tile.style.setProperty("--owner-color", owner.color);
    const marker = document.createElement("i");
    marker.className = "tile-owner";
    marker.style.setProperty("--owner-color", owner.color);
    marker.title = isMine ? `내 도시 · ${tile.querySelector(".tile-name")?.textContent || ""}` : "다른 팀이 운영 중인 도시";
    tile.appendChild(marker);
    const building = document.createElement("span");
    const construction = property.construction || null;
    const level = Math.max(1, Math.min(construction?.targetLevel || property.level, LANDMARK_LEVEL));
    building.className = `building-model building-level-${level}${construction ? " is-under-construction" : ""}`;
    building.setAttribute("role", "img");
    building.setAttribute("aria-label", construction ? `${BUILDING_LABELS[level]} 건설 중, ${construction.turnsRemaining}턴 남음` : `${BUILDING_LABELS[level]} 건물`);
    building.title = construction ? `${BUILDING_LABELS[level]} 건설 중 · ${construction.turnsRemaining}턴 남음` : `${BUILDING_LABELS[level]} · 통행료 C ${currentToll(Number(tileIndex))}`;
    building.innerHTML = `<span class="building-tower tower-a"></span><span class="building-tower tower-b"></span><span class="building-tower tower-c"></span><b>${level === LANDMARK_LEVEL ? "★" : level}</b>${construction ? `<em class="construction-turns">${construction.turnsRemaining}T</em>` : ""}`;
    tile.appendChild(building);
    if (construction) tile.classList.add("construction-site");
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
    token.setAttribute("role", "img");
    token.setAttribute("aria-label", `${player.name} 팀 말`);
    token.innerHTML = `
      <svg viewBox="0 0 32 40" aria-hidden="true" focusable="false">
        <circle class="pawn-part pawn-head" cx="16" cy="8" r="6"></circle>
        <path class="pawn-part pawn-body" d="M12.5 14h7c0 4.3 1.8 8.2 5.2 12H7.3c3.4-3.8 5.2-7.7 5.2-12Z"></path>
        <path class="pawn-part pawn-base" d="M7 25.5h18a5 5 0 0 1 0 10H7a5 5 0 0 1 0-10Z"></path>
      </svg>
      <b class="token-number" aria-hidden="true">${player.id + 1}</b>`;
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
  button.dataset.action = "none";
  if (!state) { button.disabled = true; label.textContent = "게임 시작하기"; return; }
  if (state.phase === "ready") { button.disabled = false; button.dataset.action = "roll"; label.textContent = "주사위 굴리기"; }
  else if (state.phase === "done") { button.disabled = false; button.dataset.action = "next"; label.textContent = "다음 팀 턴 시작"; }
  else if (state.phase === "gameover") { button.disabled = true; label.textContent = "게임 종료"; }
  else { button.disabled = true; label.textContent = state.phase === "rolling" ? "글로벌 경로 계산 중…" : state.phase === "transition" ? "다음 팀 준비 중…" : "도시 처리 중…"; }
}

function handlePrimaryAction(event) {
  event?.preventDefault();
  const button = $("#actionButton");
  if (!state || button.disabled) return;
  if (button.dataset.action === "roll") return rollDice();
  if (button.dataset.action === "next") {
    button.disabled = true;
    nextTurn();
  }
}

async function rollDice() {
  if (!state || state.phase !== "ready") return;
  state.phase = "rolling";
  updateAction();
  $("#processStatus").textContent = "MOVING";
  const first = Math.floor(Math.random() * 6) + 1;
  const second = Math.floor(Math.random() * 6) + 1;
  const result = first + second;
  const dice = [$("#die"), $("#die2")];
  const dieStage = dice[0].closest(".die-stage");
  dice.forEach(die => die.classList.remove("is-rolling"));
  dieStage.classList.remove("is-rolling-stage", "is-landed");
  void dice[0].offsetWidth;
  dice.forEach(die => die.classList.add("is-rolling"));
  dieStage.classList.add("is-rolling-stage");
  playTone(220, .08);
  const rollDuration = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--die-roll-duration")) || 1100;
  await wait(reducedMotion ? 40 : rollDuration);
  dice.forEach(die => die.classList.remove("is-rolling"));
  dieStage.classList.remove("is-rolling-stage");
  const faces = { 1: "rotateX(0deg) rotateY(0deg)", 2: "rotateY(-90deg)", 3: "rotateX(-90deg)", 4: "rotateX(90deg)", 5: "rotateY(90deg)", 6: "rotateY(180deg)" };
  dice[0].style.transform = faces[first];
  dice[1].style.transform = faces[second];
  void dieStage.offsetWidth;
  dieStage.classList.add("is-landed");
  window.setTimeout(() => dieStage.classList.remove("is-landed"), reducedMotion ? 50 : 420);
  const player = currentPlayer();
  const isDouble = first === second;
  player.doubleStreak = isDouble ? (player.doubleStreak || 0) + 1 : 0;
  state.extraRoll = isDouble;
  $("#diceLabel").innerHTML = `<span class="dice-result">${first}+${second}</span><span class="dice-result-copy"> · ${result}칸</span><br />${isDouble ? "DOUBLE! 한 번 더" : "글로벌 경로 동기화"}`;
  addLog(`${player.name} 팀: ${first} + ${second} = ${result}${isDouble ? " · 더블" : ""}`, player.color);
  if (player.doubleStreak >= 3) {
    player.doubleStreak = 0;
    state.extraRoll = false;
    return sendToIsland(player, true);
  }
  await movePlayer(result);
  resolveTile();
}

async function sendToIsland(player, fromTripleDouble = false) {
  state.phase = "resolving";
  state.extraRoll = false;
  player.position = 8;
  player.skipTurns = 1;
  await moveToken(player, 8);
  renderAll();
  addLog(`${player.name} 팀이 Cloud Island로 이동했습니다.`, "#ffc14e");
  showModal({ icon: "☁", eyebrow: fromTripleDouble ? "THREE DOUBLES" : "CLOUD ISLAND", title: "Cloud Island에서 잠시 재정비합니다", body: fromTripleDouble ? "3연속 더블로 Cloud Island에 도착했습니다. 다음 차례 한 번을 쉽니다." : "글로벌 클라우드 점검으로 다음 차례 한 번을 쉽니다.", color: "#ffc14e", stats: [["현재 위치", "Cloud Island"], ["휴식", "1 TURN"]], actions: [{ label: "확인", primary: true, onClick: () => { closeGameModal(); finishResolution(); } }] });
}

async function movePlayer(steps) {
  const player = currentPlayer();
  for (let i = 0; i < steps; i++) {
    const next = (player.position + 1) % TILES.length;
    if (next === 0) {
      player.cash += 200;
      player.laps = (player.laps || 0) + 1;
      showToast("Walldorf 리포트", `세계 일주 완료 · C 200 · ${BUILDING_LABELS[maxBuildLevel(player)]} 건설 해금`, "↻", "#25e5d8");
      playTone(520, .07);
    }
    player.position = next;
    await moveToken(player, next);
    if (i < steps - 1) playTone(300 + i * 22, .035);
  }
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
  if (tile.type === "island") return sendToIsland(player);
  if (tile.type === "start") {
    player.cash += 100;
    addLog(`${player.name} 팀이 Walldorf HQ 브리핑으로 C 100을 받았습니다.`, "#25e5d8");
    showToast("Headquarters briefing", "운영 예산 C 100을 확보했습니다.", "W", "#25e5d8");
    return finishResolution();
  }
  const property = propertyAt(player.position);
  if (!property) return offerCity(tile, player.position);
  if (property.owner === player.id) return offerUpgrade(tile, player.position);
  const owner = state.players[property.owner];
  if (property.construction) {
    const targetLevel = property.construction.targetLevel;
    return showModal({ icon: tile.flag, eyebrow: "CONSTRUCTION SITE", title: `${owner.name}의 ${tile.name}는 공사 중`, body: `${BUILDING_LABELS[targetLevel]} 완공까지 ${property.construction.turnsRemaining}턴 남았습니다. 공사 중에는 통행료와 도시 인수가 일시 중지됩니다.`, color: owner.color, stats: [["건설 목표", BUILDING_LABELS[targetLevel]], ["남은 기간", `${property.construction.turnsRemaining}턴`], ["현재 통행료", "C 0"], ["도시 상태", "인수 보호"]], actions: [{ label: "확인", primary: true, onClick: () => { closeGameModal(); finishResolution(); } }] });
  }
  const toll = currentToll(player.position);
  const payment = Math.min(player.cash, toll);
  player.cash -= payment;
  owner.cash += payment;
  addLog(`${player.name} → ${owner.name}: ${tile.name} 네트워크 이용료 C ${payment}`, owner.color);
  renderAll();
  const monopoly = hasMonopoly(owner.id, tile.group);
  if (player.cash <= 0) {
    return showModal({ icon: "!", eyebrow: "BANKRUPTCY", title: `${tile.name} 통행료로 파산했습니다`, body: `${owner.name} 팀에 보유 현금과 도시 자산이 이전됩니다.`, color: owner.color, stats: [["청구 통행료", `C ${toll}`], ["지급 금액", `C ${payment}`]], actions: [{ label: "자산 정리", primary: true, onClick: () => { closeGameModal(); eliminatePlayer(player, owner); finishResolution(); } }] });
  }
  const takeoverCost = Math.ceil(property.invested * 2 / 10) * 10;
  const canTakeover = property.level < LANDMARK_LEVEL && player.cash >= takeoverCost;
  const actions = [];
  if (property.level < LANDMARK_LEVEL) actions.push({ label: canTakeover ? `C ${takeoverCost}에 인수` : "인수 자금 부족", primary: true, disabled: !canTakeover, onClick: () => takeoverProperty(player, owner, player.position, takeoverCost) });
  actions.push({ label: "통행료만 내기", primary: property.level === LANDMARK_LEVEL, onClick: () => { closeGameModal(); finishResolution(); } });
  showModal({ icon: tile.flag, eyebrow: `${monopoly ? "COLOR MONOPOLY · " : ""}${BUILDING_LABELS[property.level]}`, title: `${owner.name}의 ${tile.name}`, body: `${BUILDING_LABELS[property.level]} 통행료를 지급했습니다.${property.level === LANDMARK_LEVEL ? " 랜드마크는 인수할 수 없습니다." : " 원하면 현재 투자액의 2배로 도시를 인수할 수 있습니다."}`, color: owner.color, stats: [["통행료", `C ${toll}${monopoly ? " × 독점" : ""}`], ["남은 현금", `C ${player.cash}`], ["인수 가격", property.level === LANDMARK_LEVEL ? "보호됨" : `C ${takeoverCost}`]], actions });
}

function offerCity(tile, index) {
  const player = currentPlayer();
  const canBuy = player.cash >= tile.price;
  const unlocked = maxBuildLevel(player);
  let packageLevel = unlocked;
  while (packageLevel > 1 && player.cash < acquisitionCost(tile, packageLevel)) packageLevel--;
  const actions = [];
  if (packageLevel > 1) {
    const packageCost = acquisitionCost(tile, packageLevel);
    actions.push({ label: `${BUILDING_LABELS[packageLevel]} 건설 · C ${packageCost}`, primary: true, onClick: () => buyCityWithBuilding(player, tile, index, packageLevel) });
  }
  actions.push({ label: canBuy ? `SAP 건설 · C ${tile.price}` : "현금 부족", primary: packageLevel === 1, disabled: !canBuy, onClick: () => buyCityWithBuilding(player, tile, index, 1) });
  actions.push({ label: "이번에는 통과", onClick: () => { addLog(`${player.name} 팀이 ${tile.name} 인수를 보류했습니다.`, "#708a9b"); closeGameModal(); finishResolution(); } });
  showModal({ icon: tile.flag, eyebrow: `${tile.group} · NEW CITY`, title: `${tile.name}에 건설할까요?`, body: `${tile.country} SAP 도시를 인수하고 건물을 세웁니다. SAP와 SAP Labs를 모두 건설하면 랜드마크를 완성할 수 있습니다.`, color: REGION_COLORS[tile.region], stats: [["SAP 공사", "1턴"], ["현재 해금", BUILDING_LABELS[unlocked]], ["최대 공사", `${constructionDuration(unlocked)}턴`], ["보유 현금", `C ${player.cash}`]], actions });
}

function buyCityWithBuilding(player, tile, index, level) {
  const cost = acquisitionCost(tile, level);
  if (player.cash < cost || propertyAt(index)) return;
  player.cash -= cost;
  if (!player.owned.includes(index)) player.owned.push(index);
  const property = { owner: player.id, level: 0, invested: cost };
  const duration = beginConstruction(property, level);
  state.properties[index] = property;
  addLog(`${player.name} 팀이 ${tile.name}를 인수하고 ${BUILDING_LABELS[level]} 건설을 시작했습니다. (${duration}턴)`, player.color);
  closeGameModal();
  showToast("Construction started", `${tile.name} · ${BUILDING_LABELS[level]} · ${duration}턴 후 완공`, "▥", player.color);
  playTone(540 + level * 35, .12);
  finishResolution();
}

function offerUpgrade(tile, index) {
  const player = currentPlayer();
  const property = propertyAt(index);
  const unlocked = maxBuildLevel(player);
  if (property.construction) {
    const targetLevel = property.construction.targetLevel;
    showModal({ icon: tile.flag, eyebrow: "CONSTRUCTION IN PROGRESS", title: `${tile.name} ${BUILDING_LABELS[targetLevel]} 공사 중`, body: `완공까지 ${property.construction.turnsRemaining}턴 남았습니다. 완공 후 다음 단계 건설을 시작할 수 있습니다.`, color: player.color, stats: [["건설 목표", BUILDING_LABELS[targetLevel]], ["남은 기간", `${property.construction.turnsRemaining}턴`], ["현재 통행료", "C 0"], ["다음 단계", targetLevel < LANDMARK_LEVEL ? BUILDING_LABELS[targetLevel + 1] : "최종 단계"]], actions: [{ label: "공사 현황 확인", primary: true, onClick: () => { closeGameModal(); finishResolution(); } }] });
    return;
  }
  if (property.level >= LANDMARK_LEVEL) {
    showToast(`${tile.name} 랜드마크`, "SAP와 SAP Labs를 모두 갖춘 최고 단계 도시입니다.", "★", player.color);
    return finishResolution();
  }
  const nextLevel = property.level + 1;
  const cost = upgradeCost(tile, nextLevel);
  const canBuild = nextLevel <= unlocked && player.cash >= cost;
  const duration = constructionDuration(nextLevel);
  showModal({ icon: tile.flag, eyebrow: "CITY DEVELOPMENT", title: `${tile.name}를 ${BUILDING_LABELS[nextLevel]}로 성장시킬까요?`, body: nextLevel > unlocked ? `세계 일주 ${nextLevel - 1}회를 완료하면 ${BUILDING_LABELS[nextLevel]} 건설이 해금됩니다.` : `${BUILDING_LABELS[nextLevel]}는 ${duration}턴 뒤 완공되며, 공사 중에는 통행료와 인수가 중지됩니다.`, color: player.color, stats: [["현재 건물", BUILDING_LABELS[property.level]], ["다음 건물", BUILDING_LABELS[nextLevel]], ["건설 기간", `${duration}턴`], ["건설 비용", `C ${cost}`]], actions: [
    { label: canBuild ? `${BUILDING_LABELS[nextLevel]} 건설` : nextLevel > unlocked ? "아직 잠김" : "현금 부족", primary: true, disabled: !canBuild, onClick: () => { player.cash -= cost; property.invested += cost; beginConstruction(property, nextLevel); addLog(`${player.name} 팀: ${tile.name} ${BUILDING_LABELS[nextLevel]} 건설 시작 (${duration}턴)`, player.color); closeGameModal(); showToast("Construction started", `${tile.name} · ${BUILDING_LABELS[nextLevel]} · ${duration}턴`, "▥", player.color); finishResolution(); } },
    { label: "현재 상태 유지", onClick: () => { closeGameModal(); finishResolution(); } }
  ] });
}

function takeoverProperty(buyer, seller, index, cost) {
  const tile = TILES[index];
  const property = propertyAt(index);
  buyer.cash -= cost;
  seller.cash += cost;
  seller.owned = seller.owned.filter(item => item !== index);
  if (!buyer.owned.includes(index)) buyer.owned.push(index);
  property.owner = buyer.id;
  property.invested = Math.max(property.invested || 0, cost);
  closeGameModal();
  addLog(`${buyer.name} 팀이 ${seller.name}의 ${tile.name}를 C ${cost}에 인수했습니다.`, buyer.color);
  showToast("Takeover complete", `${tile.name}의 새 주인은 ${buyer.name}`, "↔", buyer.color);
  finishResolution();
}

function openEvent(tile) {
  const player = currentPlayer();
  const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
  const appliedCash = Math.max(-player.cash, event.cash);
  const brandGain = (event.vp || 0) * 100;
  showModal({ icon: event.icon, eyebrow: `${tile.name.toUpperCase()} · EVENT CARD`, title: event.title, body: event.body, color: event.tone, stats: [["운영 현금", `${appliedCash >= 0 ? "+" : "−"}C ${Math.abs(appliedCash)}`], ["브랜드 가치", `+C ${brandGain}`]], actions: [{ label: "카드 적용", primary: true, onClick: () => { player.cash += appliedCash; player.brandValue = Math.max(0, (player.brandValue || 0) + brandGain); addLog(`${player.name}: ${event.title} (${appliedCash >= 0 ? "+" : ""}${appliedCash}, 브랜드 +${brandGain})`, event.tone); closeGameModal(); showToast(event.title, `${appliedCash >= 0 ? "+" : ""}C ${Math.abs(appliedCash)} · 브랜드 +C ${brandGain}`, event.icon, event.tone); if (player.cash <= 0) eliminatePlayer(player); finishResolution(); } }] });
}

function eliminatePlayer(player, creditor = null) {
  player.active = false;
  player.cash = 0;
  player.brandValue = 0;
  player.owned.forEach(tileIndex => { if (creditor) { state.properties[tileIndex].owner = creditor.id; if (!creditor.owned.includes(tileIndex)) creditor.owned.push(tileIndex); } else delete state.properties[tileIndex]; });
  player.owned = [];
  addLog(`${player.name} 팀의 글로벌 투어가 종료되었습니다.`, "#ff756d");
}

function finishResolution() {
  const winner = checkWinner();
  if (winner) return showVictory(winner);
  if (state.extraRoll) {
    state.extraRoll = false;
    state.phase = "ready";
    saveGame();
    renderAll();
    $("#diceLabel").innerHTML = "DOUBLE!<br />한 번 더 굴리세요";
    return showToast("Double bonus", `${currentPlayer().name} 팀이 한 번 더 굴립니다.`, "×2", currentPlayer().color);
  }
  state.phase = "done";
  saveGame();
  renderAll();
}

function checkWinner() {
  const active = state.players.filter(player => player.active);
  return active.length === 1 ? active[0] : null;
}

async function nextTurn() {
  if (!state || state.phase !== "done") return;
  const active = state.players.filter(player => player.active);
  if (active.length <= 1) return active[0] ? showVictory(active[0]) : null;
  const skipped = [];
  const completedConstruction = [];
  let cursor = state.current;
  const maxHops = state.players.length * 2;
  for (let hop = 0; hop < maxHops; hop++) {
    let next = -1;
    for (let offset = 1; offset <= state.players.length; offset++) {
      const candidate = (cursor + offset) % state.players.length;
      if (state.players[candidate].active) { next = candidate; break; }
    }
    if (next < 0) return;
    if (next <= cursor) {
      if (state.round >= MAX_ROUNDS) {
        const winner = active.sort((a, b) => corporateValue(b) - corporateValue(a))[0];
        return showVictory(winner, true);
      }
      state.round++;
    }
    state.current = next;
    state.turn++;
    cursor = next;
    const player = currentPlayer();
    completedConstruction.push(...advanceConstruction(player));
    if (player.skipTurns > 0) {
      player.skipTurns--;
      player.doubleStreak = 0;
      skipped.push(player.name);
      addLog(`${player.name} 팀이 Cloud Island에서 이번 차례를 쉽니다.`, "#ffc14e");
      continue;
    }
    state.phase = "transition";
    $("#diceLabel").innerHTML = skipped.length ? `${skipped.join(", ")} 휴식<br />${player.name} 턴` : "주사위를 굴려<br />다음 SAP 도시로";
    saveGame();
    renderAll();
    await showTurnTransition(player, skipped);
    state.phase = "ready";
    saveGame();
    renderAll();
    if (completedConstruction.length) {
      const completedNames = completedConstruction.map(item => `${item.tile.name} ${BUILDING_LABELS[item.level]}`).join(", ");
      showToast("Construction complete", `${completedNames} 완공`, "✓", player.color);
      playTone(760, .12);
    } else {
      showToast(`${player.name} turn`, skipped.length ? `${skipped.join(", ")} 팀의 휴식 턴을 건너뛰었습니다.` : "글로벌 경로가 준비되었습니다.", skipped.length ? "☁" : "→", player.color);
    }
    return;
  }
}

async function showTurnTransition(player, skipped = []) {
  const layer = $("#turnTransition");
  const block = layer.querySelector(".t-stagger");
  const turnCard = $(".turn-card");
  const token = $(`#token-${player.id}`);
  layer.style.setProperty("--turn-color", player.color);
  $("#turnTransitionKicker").textContent = `ROUND ${state.round} · TURN ${String(state.turn).padStart(2, "0")}`;
  $("#turnTransitionAvatar").textContent = player.id + 1;
  $("#turnTransitionName").textContent = player.name;
  $("#turnTransitionRole").textContent = skipped.length ? `${skipped.join(", ")} 휴식 처리 · YOUR TURN` : `${ROLES[player.id]} · READY TO ROLL`;
  layer.classList.remove("is-open", "is-hiding");
  block.classList.remove("is-hiding", "is-shown");
  turnCard.classList.remove("is-turn-entering");
  token?.classList.remove("is-turn-entering");
  void block.offsetHeight;
  layer.setAttribute("aria-hidden", "false");
  layer.classList.add("is-open");
  block.classList.add("is-shown");
  turnCard.classList.add("is-turn-entering");
  token?.classList.add("is-turn-entering");
  playTone(440, .08);
  window.setTimeout(() => playTone(660, .1), reducedMotion ? 40 : 180);
  await wait(reducedMotion ? 320 : 1100);
  block.classList.add("is-hiding");
  block.classList.remove("is-shown");
  layer.classList.add("is-hiding");
  await wait(reducedMotion ? 20 : 200);
  layer.classList.remove("is-open", "is-hiding");
  block.classList.remove("is-hiding");
  turnCard.classList.remove("is-turn-entering");
  token?.classList.remove("is-turn-entering");
  layer.setAttribute("aria-hidden", "true");
}

function showVictory(winner, byRoundLimit = false) {
  state.current = winner.id;
  state.phase = "gameover";
  saveGame();
  celebrate(winner.color);
  showModal({ icon: "★", eyebrow: byRoundLimit ? "12 ROUNDS COMPLETE" : "LAST COMPANY STANDING", title: `${winner.name} 팀이 최고의 기업가치를 만들었습니다!`, body: `${winner.owned.length}개 SAP 도시와 C ${corporateValue(winner).toLocaleString("ko-KR")}의 기업가치로 최종 우승했습니다.`, color: winner.color, stats: [["최종 기업가치", `C ${corporateValue(winner).toLocaleString("ko-KR")}`], ["인수 도시", `${winner.owned.length} CITY`], ["남은 현금", `C ${winner.cash}`], ["완주 라운드", `${state.round}`]], actions: [{ label: "새 게임 시작", primary: true, onClick: () => { closeGameModal(); localStorage.removeItem(STORAGE_KEY); location.reload(); } }] });
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

function saveGame() { if (state) localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function loadSaved() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed?.started || !Array.isArray(parsed.players) || parsed.players.length < 2 || parsed.version !== 3) return null;
    if (parsed.phase === "transition") parsed.phase = "ready";
    if (["rolling", "resolving"].includes(parsed.phase)) {
      parsed.phase = "done";
      parsed.extraRoll = false;
      if (parsed.players[parsed.current]) parsed.players[parsed.current].doubleStreak = 0;
    }
    Object.values(parsed.properties || {}).forEach(property => {
      if (property.construction) {
        property.level = Math.max(0, Math.min(LANDMARK_LEVEL, Number(property.level) || 0));
        property.construction.targetLevel = Math.max(1, Math.min(LANDMARK_LEVEL, Number(property.construction.targetLevel) || 1));
        property.construction.turnsRemaining = Math.max(1, Math.min(constructionDuration(property.construction.targetLevel), Number(property.construction.turnsRemaining) || 1));
        property.construction.totalTurns = constructionDuration(property.construction.targetLevel);
        if (property.construction.targetLevel <= property.level) delete property.construction;
      } else {
        property.level = Math.max(1, Math.min(LANDMARK_LEVEL, property.level || 1));
      }
    });
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
  $("#actionButton").addEventListener("click", handlePrimaryAction);
  $("#modalClose").addEventListener("click", () => modalCloseHandler?.());
  $("#rulesButton").addEventListener("click", openRules);
  $("#rulesClose").addEventListener("click", closeRules);
  $("#rulesConfirm").addEventListener("click", closeRules);
  $("#soundButton").addEventListener("click", () => { soundOn = !soundOn; $("#soundButton").setAttribute("aria-pressed", String(soundOn)); $("#soundButton").setAttribute("aria-label", soundOn ? "효과음 끄기" : "효과음 켜기"); if (soundOn) playTone(480, .08); });
  $("#resetButton").addEventListener("click", () => { if (!state || confirm("현재 게임을 초기화하고 새로 시작할까요?")) { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem("sap-city-run-v2"); location.reload(); } });
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
