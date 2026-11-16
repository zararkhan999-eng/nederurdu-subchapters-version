/* Pim on the move: one small Pim who lives above the page instead of inside it. He cycles along the
   bottom bar to whichever tab you open, rides the lesson's progress bar as you answer, pedals while
   you scroll, and changes as you go: a hat for each place, sunglasses and a crown for answer streaks,
   and a new scarf colour as lessons are completed. He never takes a tap away from the page beneath
   him, and steps aside whenever a full-size Pim (the street, the map) is already on screen. */
window.NU = window.NU || {};
NU.buddy = (() => {
  const { BIKE, P, soft } = NU.pimParts;
  const SIZE = { nav: 70, lesson: 52 };
  const GROUND = 182 / 190;                      // where the tyres touch, as a share of the svg's height
  const KEY = "nederurdu-buddy-v1";
  const INTERACTIVE = "button,a,input,textarea,select,label,[data-action],[role=button]";
  const BIG_PIMS = "#app .street,#app .map-pim";      // scenes that already star a full-size Pim
  const still = () => NU.motion.level() === "off";
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  /* ---- Things Pim wears, drawn in his head space (see pim-parts.js) so they follow every nod. ---- */
  const GEAR = {
    band: `<path d="M113 31Q141 17 170 29l1.4 8Q141 25 113.6 39Z" fill="${P.scarf}"/><path d="M113.3 34.6Q141 20.6 170.6 32.6" fill="none" stroke="#fff" stroke-width="2"/>
      ${soft("M113 34l-12-5 2 9Z", P.scarfShade, 3)}`,
    cap: `<path d="M122 17v11q19 8 38 0V17Z" fill="#2a3147"/>${soft("M106 15L141 3L176 15L141 27Z", P.ink, 3)}
      <path d="M141 15L170 17v14" fill="none" stroke="#ffc23d" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="170" cy="33" r="3.4" fill="#ffc23d"/>`,
    helmet: `<path d="M116 27Q118 2 143 2T170 26Z" fill="#e09b00"/><path d="M118 25Q120 4 143 4T168 24Z" fill="#ffc23d"/>
      <path d="M143 4v19" stroke="#e09b00" stroke-width="5" stroke-linecap="round"/>${soft("M112 26h66l-2 4h-62Z", "#e09b00", 3)}`,
    captain: `<path d="M118 24Q118 3 142 3T166 22Z" fill="#1a4ed1"/><path d="M120 22Q121 5 142 5T164 21Z" fill="#2b6bff"/>
      ${soft("M152 22Q170 19 183 28Q166 31 151 27Z", "#1a4ed1", 3)}<circle cx="142" cy="15" r="5.4" fill="#ffc23d"/><path d="M118 22.5q24 5 48-1" fill="none" stroke="#fff" stroke-width="2.6"/>`,
    shades: `<path d="M118 37l6 1M168 36l6-2M141 40l7-1" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>
      <rect x="121" y="34" width="21" height="16" rx="6.5" fill="${P.ink}"/><rect x="147" y="33" width="20" height="16" rx="6.5" fill="${P.ink}"/>
      <path d="M125.5 38.500l5-2M151.5 37.500l5-2" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/>`,
    crown: `${soft("M121 23L116 3L131 14L141-1L151 14L166 3L161 23Z", "#e09b00", 3)}${soft("M123 21L119 6L131 15L141 2L151 15L163 6L159 21Z", "#ffc23d", 2)}
      <circle cx="141" cy="15" r="3.2" fill="#ff4d4d"/><circle cx="128" cy="17" r="2.2" fill="#2b6bff"/><circle cx="154" cy="17" r="2.2" fill="#3dc25d"/>`
  };
  const PLACE_GEAR = { practice: "band", toolkit: "cap", letters: "cap", settings: "helmet", passport: "captain", journey: "captain" };
  // Scarf colours earned by finished lessons: red → green → purple → gold.
  const TIERS = [0, 5, 15, 30];
  const tierOf = (done) => TIERS.reduce((tier, need, i) => (done >= need ? i : tier), 0);

  // What Pim says on arriving somewhere, once per visit to the app. Dutch first, then the Urdu meaning.
  const HELLO = {
    home: ["Ik fiets met je mee!", "چلیں، ساتھ ساتھ!"],
    journey: ["Kijk, onze route!", "دیکھیں، ہمارا راستہ!"],
    practice: ["Tijd om te oefenen!", "مشق کا وقت!"],
    toolkit: ["Alles op één plek.", "سب کچھ ایک ہی جگہ۔"],
    letters: ["A, B, C…", "آئیں، حروف سنیں!"],
    settings: ["Zoals jij het wilt.", "جیسا آپ کو پسند ہو۔"],
    passport: ["Kijk, je stempels!", "دیکھیں، آپ کی مہریں!"]
  };
  const CHAT = [["Miauw!", "میاؤں!"], ["Hoi!", "ہیلو!"], ["Lekker bezig!", "خوب جا رہے ہیں!"], ["Fietsen is leuk!", "سائیکل چلانا مزے کا ہے!"], ["Ga zo door!", "ایسے ہی چلتے رہیں!"], ["Tring tring!", "ٹرن ٹرن!"]];

  let store = {};
  try { store = JSON.parse(localStorage.getItem(KEY)) || {}; } catch { /* private mode: nothing to remember */ }
  const remember = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* ignore */ } };

  let el = null, flip = null, svg = null, gearSlot = null, bubble = null, spokes = [];
  let ctx = { screen: "", entered: false, questionKey: "", combo: 0, completed: 0 };
  let pos = { x: -200, y: 0 }, size = SIZE.nav, shown = false, kind = "", facing = 1;
  let goal = null, plan = 0, rideToken = 0, riding = false, spin = 0, frame = 0;
  let gear = "", pendingLine = null, sayTimer = 0;
  let recheck = 0;
  const greeted = new Set();

  function build() {
    if (el?.isConnected) return;
    el = document.createElement("div");
    el.className = "nu-buddy is-away";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = `<div class="nu-buddy-say" dir="rtl"></div><div class="nu-buddy-flip">${NU.cat.render({ size })}</div>`;
    document.body.append(el);
    flip = el.querySelector(".nu-buddy-flip");
    bubble = el.querySelector(".nu-buddy-say");
    svg = el.querySelector(".nu-cat");
    svg.removeAttribute("role");
    svg.removeAttribute("aria-label");
    spokes = [...svg.querySelectorAll(".cat-spokes")];
    gearSlot = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gearSlot.setAttribute("class", "buddy-gear");
    svg.querySelector(".cat-head").append(gearSlot);
    gear = "";
  }

  const height = () => Math.round(size * 190 / 240);
  function apply() { el.style.transform = `translate3d(${pos.x.toFixed(1)}px,${pos.y.toFixed(1)}px,0)`; }
  function resize(next) {
    if (size === next) return;
    size = next;
    svg.setAttribute("width", size);
    svg.setAttribute("height", height());
  }
  function face(dir) {
    if (dir === facing) return;
    facing = dir;
    flip.style.transform = dir < 0 ? "scaleX(-1)" : "";
  }
  function turnWheels(px) {
    spin += px / (BIKE.wheelR * size / 240);
    spokes.forEach((s) => { s.style.transform = `rotate(${spin.toFixed(3)}rad)`; });
    NU.cat.setCrank(svg, BIKE.crank0 + spin * 0.55);
  }
  // A screen point for one of Pim's own coordinates (for hearts, dust and sparkles).
  function point(x, y) {
    const m = svg.getScreenCTM();
    return m ? new DOMPoint(x, y).matrixTransform(m) : { x: pos.x + size / 2, y: pos.y + height() / 2 };
  }

  /* ---- Where Pim belongs right now ---------------------------------------------------------- */
  const inView = (node) => {
    if (node.closest(".od-route-snapshot")) return false;       // a copy of the page being left
    const r = node.getBoundingClientRect();
    return r.width > 0 && r.bottom > 60 && r.top < innerHeight - 90 && r.right > 0 && r.left < innerWidth;
  };
  function perch() {
    if (document.querySelector(".guide-tour")) return null;
    if (ctx.screen === "lesson") {
      const bar = document.querySelector("#app .quiz-progress");
      if (!bar || document.querySelector("#app .lesson-detail-layer")) return null;
      const r = bar.getBoundingClientRect();
      if (!r.width) return null;
      const fill = bar.firstElementChild;
      const share = clamp((parseFloat(fill?.style.width) || 0) / 100, 0, 1);
      // The fill may grow from either edge depending on the page direction; follow whichever it is.
      const filled = fill?.getBoundingClientRect();
      const fromRight = Boolean(filled) && Math.abs(filled.right - r.right) < 2 && filled.left - r.left > 2;
      const tip = fromRight ? r.right - r.width * share : r.left + r.width * share;
      const half = SIZE.lesson * 0.32;
      return { kind: "lesson", size: SIZE.lesson, cx: clamp(tip, r.left + half, r.right - half), ground: r.bottom + 1 };
    }
    const nav = document.querySelector("#app .bottom-nav");
    if (!nav || [...document.querySelectorAll(BIG_PIMS)].some(inView)) return null;
    const bar = nav.getBoundingClientRect();
    const tab = nav.querySelector(".nav-button.active")?.getBoundingClientRect();
    const cx = tab ? tab.left + tab.width / 2 : bar.left + bar.width * (ctx.screen === "settings" ? 0.88 : 0.5);
    return { kind: "nav", size: SIZE.nav, cx, ground: bar.top + 6 };
  }
  const spot = (p) => ({ x: p.cx - p.size / 2, y: p.ground - Math.round(p.size * 190 / 240) * GROUND });

  /* ---- Riding ------------------------------------------------------------------------------- */
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
  function rideTo(x, y, { duration } = {}) {
    const token = ++rideToken;
    const from = { ...pos }, dx = x - from.x, dy = y - from.y;
    if (Math.abs(dx) > 2) face(dx > 0 ? 1 : -1);
    const ms = duration ?? clamp(Math.abs(dx) * 4.4, 420, 1250);
    const start = performance.now();
    let last = 0;
    riding = true;
    el.classList.add("is-riding");
    return new Promise((resolve) => {
      const tick = (now) => {
        if (token !== rideToken) return resolve(false);
        const p = Math.min(1, (now - start) / ms), e = easeInOut(p);
        pos.x = from.x + dx * e;
        pos.y = from.y + dy * e;
        apply();
        turnWheels(Math.abs(dx) * (e - last));
        last = e;
        if (p < 1) return requestAnimationFrame(tick);
        riding = false;
        el.classList.remove("is-riding");
        resolve(true);
      };
      requestAnimationFrame(tick);
    });
  }
  function dust() {
    const at = point(BIKE.wheels[0].x - 18, 178);
    NU.motion.burst({ x: at.x, y: at.y }, { count: 5, spread: 20, gravity: -8, shapes: ["dot"], colors: ["#e6dccb", "#d9cdb8", "#f2ebdf"] });
  }
  function hide() {
    rideToken += 1;
    riding = false;
    shown = false;
    kind = "";
    el.classList.remove("is-riding", "is-rolling");
    el.classList.add("is-away");
    hush();
  }
  function place(p) {
    resize(p.size);
    kind = p.kind;
    el.dataset.kind = kind;
    pos = spot(p);
    apply();
    shown = true;
    el.classList.remove("is-away");
  }

  // Decide where Pim should be and get him there. Calls with an unchanged destination do nothing,
  // so this is safe to run after every render and on scroll.
  async function update() {
    frame = 0;
    if (!el?.isConnected) build();
    const p = perch();
    dress();
    if (goal && p && goal.kind === p.kind && Math.abs(goal.cx - p.cx) < 1.5 && Math.abs(goal.ground - p.ground) < 1.5) return;
    if (!goal && !p) return;
    goal = p;
    const mine = ++plan;
    const current = () => mine === plan;

    if (still()) {
      if (p) { place(p); face(1); } else hide();
      return;
    }
    if (!p) {
      if (!shown) return;
      // Leave by the nearer edge when a tab screen simply no longer needs him; vanish when the bar itself is gone.
      if (kind !== "nav" || !document.querySelector("#app .bottom-nav")) { hide(); return; }
      const left = pos.x + size / 2 < innerWidth / 2;
      await rideTo(left ? -size - 24 : innerWidth + 24, pos.y, { duration: 520 });
      if (current()) hide();
      return;
    }
    const to = spot(p);
    if (shown && kind === p.kind) {
      if (Math.abs(to.x - pos.x) < 2) { pos = to; apply(); return; }
      if (await rideTo(to.x, to.y) && current()) arrive(p);
      return;
    }
    // A different place (or a first appearance): ride in from the side.
    hide();
    if (p.kind === "lesson" && ctx.entered) await sleep(520);     // let the lesson's door finish opening
    if (!current()) return;
    place(p);
    const fromLeft = p.kind === "lesson" || p.cx < innerWidth * 0.62;
    pos.x = fromLeft ? -p.size - 24 : innerWidth + 24;
    apply();
    if (await rideTo(to.x, to.y, { duration: clamp(Math.abs(to.x - pos.x) * 3.4, 520, 1100) }) && current()) arrive(p);
  }
  function arrive(p) {
    NU.cat.act(svg, "brake");
    dust();
    if (p.kind === "lesson") { face(1); return; }
    // On the bar he turns to look back across the screen.
    setTimeout(() => { if (!riding && shown) face(p.cx > innerWidth * 0.6 ? -1 : 1); }, 380);
    setTimeout(greet, 520);
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }

  /* ---- Changing: hats per place, streak gear, scarf tiers ----------------------------------- */
  function dress() {
    const want = ctx.screen === "lesson" ? (ctx.combo >= 6 ? "crown" : ctx.combo >= 3 ? "shades" : "") : PLACE_GEAR[ctx.screen] || "";
    if (want !== gear) {
      const had = gear;
      gear = want;
      gearSlot.innerHTML = GEAR[want] || "";
      el.dataset.gear = want;
      if (want && shown && !still()) {
        NU.motion.animate(gearSlot, [
          { transform: "translateY(-34px) rotate(-18deg) scale(.5)", opacity: 0 },
          { transform: "none", opacity: 1 }
        ], { spring: "bouncy" });
        const at = point(141, 14);
        NU.motion.burst({ x: at.x, y: at.y }, { count: 7, spread: 34, gravity: 10, shapes: ["star"], colors: ["#ffc23d", "#fff1b8", "#ff7a1a"] });
        if (want === "crown" || (want === "shades" && !had)) NU.cat.act(svg, "hop");
      }
    }
    const tier = tierOf(ctx.completed);
    el.dataset.tier = String(tier);
    if (store.tier == null) { store.tier = tier; remember(); }
    else if (tier > store.tier) {
      store.tier = tier;
      remember();
      pendingLine = ["Een nieuwe sjaal!", "نیا مفلر — آپ کی محنت کا انعام!"];
    } else if (tier < store.tier) { store.tier = tier; remember(); }   // progress was reset
  }

  /* ---- Speech bubble (tab screens only; lessons stay quiet for reading) --------------------- */
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function hush() {
    clearTimeout(sayTimer);
    bubble?.classList.remove("is-on");
  }
  function say([nl, ur], { hold = 2400 } = {}) {
    if (!shown || kind !== "nav" || navigator.webdriver) return;
    bubble.innerHTML = `<b class="latin" dir="ltr">${esc(nl)}</b><small>${esc(ur)}</small>`;
    bubble.classList.add("is-on");
    // Keep the bubble on screen whichever tab Pim is parked over.
    const w = bubble.offsetWidth, centre = pos.x + size / 2;
    const left = clamp(centre - w / 2, 8, innerWidth - w - 8);
    bubble.style.left = `${(left - pos.x).toFixed(1)}px`;
    bubble.style.setProperty("--tail", `${clamp(centre - left, 18, w - 18).toFixed(1)}px`);
    NU.motion.animate(bubble, [{ transform: "translateY(8px) scale(.7)", opacity: 0 }, { transform: "none", opacity: 1 }], { spring: "bouncy" });
    NU.cat.act(svg, "talk", Math.min(hold, 1100));
    clearTimeout(sayTimer);
    sayTimer = setTimeout(hush, hold);
  }
  function greet() {
    if (!shown || kind !== "nav" || riding) return;
    if (pendingLine) {
      const line = pendingLine;
      pendingLine = null;
      NU.cat.mood(svg, "happy");
      NU.cat.act(svg, "hop");
      const at = point(125, 70);
      NU.motion.burst({ x: at.x, y: at.y }, { count: 12, spread: 60, shapes: ["star", "dot"] });
      say(line, { hold: 3200 });
      setTimeout(() => NU.cat.mood(svg, "idle"), 2200);
      return;
    }
    if (greeted.has(ctx.screen) || !HELLO[ctx.screen]) return;
    greeted.add(ctx.screen);
    NU.cat.act(svg, "wave");
    say(HELLO[ctx.screen]);
  }

  /* ---- Lesson: Pim feels every answer -------------------------------------------------------- */
  function react({ correct, combo = 0 } = {}) {
    if (!el) return;
    ctx.combo = combo;
    dress();
    if (!shown || kind !== "lesson") return;
    NU.cat.mood(svg, correct ? "happy" : "sad");
    if (still()) return;
    if (correct) {
      NU.cat.act(svg, "hop");
      const at = point(141, 20);
      NU.motion.burst({ x: at.x, y: at.y }, { count: combo >= 3 ? 10 : 5, spread: 30, gravity: 24, shapes: ["star"], colors: ["#ffc23d", "#3dc25d", "#fff1b8"] });
    } else NU.cat.act(svg, "shake");
  }

  /* ---- Petting: tap Pim wherever he is parked, unless a real control is under the finger ---- */
  let press = null;
  const hit = (e) => shown && e.clientX > pos.x + size * 0.12 && e.clientX < pos.x + size * 0.88 && e.clientY > pos.y && e.clientY < pos.y + height();
  document.addEventListener("pointerdown", (e) => {
    if (!el || !hit(e) || e.target.closest?.(INTERACTIVE)) return;
    clearTimeout(press?.timer);
    press = { x: e.clientX, y: e.clientY, purred: false };
    press.timer = setTimeout(() => { if (press) { press.purred = true; NU.pim.purr(svg); } }, 550);
  }, { passive: true });
  document.addEventListener("pointermove", (e) => {
    if (press && Math.hypot(e.clientX - press.x, e.clientY - press.y) > 12) { clearTimeout(press.timer); press = null; }
  }, { passive: true });
  document.addEventListener("pointerup", () => {
    if (!press) return;
    clearTimeout(press.timer);
    if (!press.purred) {
      NU.pim.pet(svg);
      if (kind === "nav") say(pick(CHAT), { hold: 1700 });
    }
    press = null;
  }, { passive: true });
  document.addEventListener("pointercancel", () => { clearTimeout(press?.timer); press = null; }, { passive: true });

  /* ---- Scrolling: he pedals along with the page, and steps in or out as a big Pim leaves or returns ---- */
  let lastScroll = 0, rollTimer = 0;
  addEventListener("scroll", () => {
    if (!el) return;
    const y = scrollY, delta = y - lastScroll;
    lastScroll = y;
    if (ctx.screen !== "lesson") schedule();
    if (!shown || kind !== "nav" || riding || still() || !delta) return;
    turnWheels(clamp(delta, -60, 60) * 0.55 * facing);
    el.classList.add("is-rolling");
    clearTimeout(rollTimer);
    rollTimer = setTimeout(() => el.classList.remove("is-rolling"), 160);
  }, { passive: true });
  addEventListener("resize", () => { goal = null; schedule(); }, { passive: true });

  /* ---- Idle tricks on the bar (never in a lesson) -------------------------------------------- */
  const tricks = {
    hop: () => NU.cat.act(svg, "hop"),
    wheelie: () => NU.motion.animate(svg.querySelector(".cat-rig"), [
      { transform: "rotate(0)", transformOrigin: "58px 178px" }, { transform: "rotate(-17deg)", transformOrigin: "58px 178px", offset: .3 },
      { transform: "rotate(-14deg)", transformOrigin: "58px 178px", offset: .62 }, { transform: "rotate(2deg)", transformOrigin: "58px 178px", offset: .84 },
      { transform: "rotate(0)", transformOrigin: "58px 178px" }
    ], { duration: 1100, easing: "ease-in-out" }),
    scoot: async () => {
      const home = pos.x, dir = facing, mine = plan;
      if (await rideTo(home + 22 * dir, pos.y, { duration: 460 }) && mine === plan) await rideTo(home, pos.y, { duration: 520 });
      if (mine === plan && shown) face(dir);
    }
  };
  function idle() {
    setTimeout(idle, 9000 + Math.random() * 7000);
    if (!shown || kind !== "nav" || riding || document.hidden || NU.motion.level() !== "full") return;
    if (svg.classList.contains("is-asleep") || bubble.classList.contains("is-on") || document.querySelector(".guide-tour")) return;
    tricks[pick(Object.keys(tricks))]();
  }
  setTimeout(idle, 7000);

  // Called by the app after every render.
  function sync(next = {}) {
    const question = ctx.questionKey;
    ctx = { ...ctx, ...next };
    build();
    if (ctx.screen !== "lesson") ctx.combo = 0;
    // A new question starts with a calm face again.
    if (ctx.screen === "lesson" && ctx.questionKey !== question && shown) NU.cat.mood(svg, "idle");
    if (ctx.entered) { hush(); lastScroll = scrollY; }
    schedule();
    // Scenes move their own Pim into place after rendering; look again once they have settled.
    clearTimeout(recheck);
    recheck = setTimeout(schedule, 1300);
  }

  return { sync, react, say, GEAR, tierOf };
})();
