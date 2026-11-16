/* App-wide motion: a living backdrop that drifts, tilts and changes colour with each screen, cards
   that spring in as they scroll into view, a ripple under every tap, hero cards that lean toward the
   finger, and small flourishes when a screen or a lesson question arrives. Everything is built on
   NU.motion, follows its level (full / lite / off) and stays out of the way of reading: inside a
   lesson only short, answer-driven moments play. */
window.NU = window.NU || {};
NU.flow = (() => {
  const level = () => NU.motion.level();
  const auto = Boolean(navigator.webdriver);     // automated runs skip pointer-following effects
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  /* ---- Backdrop ------------------------------------------------------------------------------ */
  const ART = {
    tulip: '<path d="M20 22c-7 0-10-6-9-14 3 2 5 2 6-1 1 2 2 3 3 3s2-1 3-3c1 3 3 3 6 1 1 8-2 14-9 14Z"/><path d="M19 21h2v15h-2z"/><path d="M20 35c-6 0-9-4-9-8 5 0 8 3 9 8Zm0 0c6 0 9-4 9-8-5 0-8 3-9 8Z" opacity=".7"/>',
    cloud: '<path d="M10 29a7 7 0 0 1 1-14 9 9 0 0 1 17-2 8 8 0 0 1 2 16Z"/>',
    mill: '<path d="M15.500 38l3-17h3l3 17Z"/><g class="fl-spin"><path d="M20 20 8 9l4-3ZM20 20 31 8l3 4ZM20 20l12 11-4 3ZM20 20 9 32l-3-4Z"/></g><circle cx="20" cy="20" r="2.400"/>',
    wheel: '<g class="fl-spin" fill="none" stroke="currentColor"><circle cx="20" cy="20" r="15" stroke-width="3.200"/><path d="M20 5v30M5 20h30M9.400 9.400l21.200 21.200M30.600 9.400 9.400 30.600" stroke-width="1.400"/></g><circle cx="20" cy="20" r="3"/>',
    star: '<path d="M20 3l4 13 13 4-13 4-4 13-4-13-13-4 13-4Z"/>'
  };
  // [art, left %, top %, size px, depth, tone, seconds per float]
  const SHAPES = [
    ["cloud", 6, 9, 74, .25, "a", 19], ["cloud", 70, 30, 58, .18, "c", 24], ["mill", 82, 12, 56, .5, "b", 17],
    ["tulip", 10, 44, 40, .8, "b", 13], ["wheel", 88, 56, 46, .65, "a", 21], ["star", 26, 26, 20, 1.1, "c", 11],
    ["tulip", 76, 78, 46, .9, "c", 15], ["star", 60, 8, 16, 1.2, "b", 9], ["cloud", 18, 72, 66, .3, "b", 23],
    ["star", 44, 60, 18, 1, "a", 12], ["wheel", 4, 88, 38, .7, "c", 18], ["star", 92, 38, 14, 1.3, "a", 10]
  ];
  let layer = null, sceneFrame = 0, tilt = { x: 0, y: 0 }, tiltGoal = { x: 0, y: 0 };

  function backdrop() {
    if (layer?.isConnected) return;
    layer = document.createElement("div");
    layer.className = "nu-ambient";
    layer.setAttribute("aria-hidden", "true");
    layer.innerHTML = `<i class="fl-blob fl-blob-1"></i><i class="fl-blob fl-blob-2"></i><i class="fl-blob fl-blob-3"></i>${
      SHAPES.map(([art, x, y, s, d, tone, secs], i) => `<span class="fl-shape fl-tone-${tone}" style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;--d:${d};--t:${secs}s;--i:${i}"><svg viewBox="0 0 40 40" fill="currentColor">${ART[art]}</svg></span>`).join("")}`;
    document.body.prepend(layer);
  }
  // One frame per burst of input: write the scroll position and the eased tilt for CSS to use.
  function drawScene() {
    sceneFrame = 0;
    if (!layer) return;
    tilt.x += (tiltGoal.x - tilt.x) * 0.14;
    tilt.y += (tiltGoal.y - tilt.y) * 0.14;
    layer.style.setProperty("--sy", String(Math.round(scrollY)));
    layer.style.setProperty("--tx", tilt.x.toFixed(3));
    layer.style.setProperty("--ty", tilt.y.toFixed(3));
    if (Math.abs(tiltGoal.x - tilt.x) + Math.abs(tiltGoal.y - tilt.y) > 0.01) queueScene();
  }
  function queueScene() {
    if (!sceneFrame && level() !== "off" && document.body.dataset.screen !== "lesson") sceneFrame = requestAnimationFrame(drawScene);
  }
  addEventListener("scroll", queueScene, { passive: true });
  addEventListener("deviceorientation", (e) => {
    if (level() !== "full" || e.gamma == null) return;
    tiltGoal = { x: clamp(e.gamma / 28, -1, 1), y: clamp((e.beta - 45) / 32, -1, 1) };
    queueScene();
  }, { passive: true });

  /* ---- Cards spring in as they scroll into view --------------------------------------------- */
  const REVEAL = ".review-hub-card,.unit-row,.od-word,.letter-card,.setting-row,.pl-row-link,.pim-corner,.pim-word,.map-banner,.map-node,.map-building-slot,.utility-action,.pronunciation-card,.society-card,.subchapter-card,.review-card,.pl-streak-card,.pl-stamp,.settings-panel > section";
  const seen = new WeakSet();
  let order = 0;
  const watcher = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      // Whatever is already on screen when it is first measured belongs to the screen's own entrance.
      if (!seen.has(el)) {
        seen.add(el);
        if (entry.isIntersecting) { watcher.unobserve(el); return; }
        return;
      }
      if (!entry.isIntersecting) return;
      watcher.unobserve(el);
      if (level() === "off" || document.querySelector(".od-route-snapshot")) return;
      const fromBelow = entry.boundingClientRect.top > innerHeight / 2;
      const side = order++ % 2 ? 1 : -1;
      const small = el.matches(".map-node,.letter-card,.pl-stamp");
      NU.motion.animate(el, small
        ? [{ scale: ".4", rotate: `${side * 14}deg`, opacity: 0 }, { scale: "1", rotate: "0deg", opacity: 1 }]
        : [{ translate: `${side * 16}px ${fromBelow ? 30 : -30}px`, scale: ".93", rotate: `${side * 1.6}deg`, opacity: 0 }, { translate: "0 0", scale: "1", rotate: "0deg", opacity: 1 }],
      { spring: small ? "bouncy" : "snappy" });
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }) : null;
  function watchReveals() {
    if (!watcher) return;
    watcher.disconnect();
    if (level() === "off") return;
    document.querySelectorAll(`#app :is(${REVEAL})`).forEach((el) => watcher.observe(el));
  }

  /* ---- A ripple under every tap --------------------------------------------------------------- */
  const TAPPABLE = "button,a,[data-action],[role=button]";
  const SPARKLY = ".primary-button,.today-action,.map-node-current,.review-hub-card";
  document.addEventListener("pointerdown", (e) => {
    const mode = level();
    if (mode === "off") return;
    const target = e.target.closest?.(TAPPABLE);
    if (!target || target.disabled || target.closest(".guide-tour")) return;
    const ring = document.createElement("i");
    ring.className = "nu-ripple";
    ring.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;color:${getComputedStyle(target).color}`;
    document.body.append(ring);
    const grow = ring.animate([
      { transform: "translate(-50%,-50%) scale(.2)", opacity: .55 },
      { transform: "translate(-50%,-50%) scale(1)", opacity: 0 }
    ], { duration: 520, easing: NU.motion.ease.out });
    grow.finished.then(() => ring.remove(), () => ring.remove());
    setTimeout(() => ring.remove(), 900);
    if (mode === "full" && document.body.dataset.screen !== "lesson" && target.matches(SPARKLY)) {
      NU.motion.burst({ x: e.clientX, y: e.clientY }, { count: 7, spread: 44, gravity: 26, shapes: ["star", "dot"] });
    }
  }, { passive: true });

  /* ---- Hero cards lean toward the pointer ----------------------------------------------------- */
  const TILT = ".pl-hero,.map-hero,.pim-word,.pl-streak-card,.pl-passport-cover,.pim-corner";
  let leaning = null;
  function settle() {
    if (!leaning) return;
    leaning.style.transition = "transform .55s cubic-bezier(.34,1.56,.64,1)";
    leaning.style.transform = "";
    const done = leaning;
    setTimeout(() => { if (done !== leaning) done.style.transition = ""; }, 600);
    leaning = null;
  }
  function lean(e) {
    if (auto || level() !== "full" || (e.pointerType !== "mouse" && !e.buttons && e.type !== "pointerdown")) return;
    const card = e.target.closest?.(TILT);
    if (card !== leaning) settle();
    if (!card || card.closest(".od-route-snapshot")) return;
    leaning = card;
    const r = card.getBoundingClientRect();
    const px = clamp((e.clientX - r.left) / r.width - 0.5, -0.5, 0.5), py = clamp((e.clientY - r.top) / r.height - 0.5, -0.5, 0.5);
    card.style.transition = "transform .14s ease-out";
    card.style.transform = `perspective(760px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) scale(1.012)`;
    // The backdrop leans the same way on desktop, where there is no gyroscope.
    if (e.pointerType === "mouse") { tiltGoal = { x: px * 0.8, y: py * 0.8 }; queueScene(); }
  }
  document.addEventListener("pointerdown", lean, { passive: true });
  document.addEventListener("pointermove", lean, { passive: true });
  ["pointerup", "pointercancel", "pointerleave"].forEach((type) => document.addEventListener(type, settle, { passive: true }));
  addEventListener("scroll", settle, { passive: true, capture: true });

  /* ---- Arriving on a screen ------------------------------------------------------------------- */
  const TAB_COLORS = { home: ["#e8694f", "#ffc23d"], journey: ["#3dc25d", "#b9f0c6"], practice: ["#2b6bff", "#9dbcff"], toolkit: ["#8a5cff", "#d2c2ff"] };
  function entrance(screen) {
    if (level() === "off") return;
    NU.cat.act(document.querySelector("#app .pl-brand-face .nu-cat"), "nod");
    const tab = document.querySelector("#app .nav-button.active");
    if (tab && level() === "full") {
      NU.motion.burst(tab.querySelector(".nav-icon") || tab, { count: 8, spread: 34, gravity: 18, shapes: ["dot", "bar"], colors: TAB_COLORS[tab.dataset.action] || undefined });
    }
    const heroPim = document.querySelector("#app .pl-hero-pim,#app .pl-passport-crest");
    if (heroPim && level() === "full") {
      setTimeout(() => { if (heroPim.isConnected) NU.motion.burst(heroPim, { count: 8, spread: 52, gravity: 12, shapes: ["star"], colors: ["#fff", "#ffe9a8", "#ffc23d"] }); }, 380);
    }
    // The backdrop takes a breath with every change of place.
    layer?.animate?.([{ scale: "1.06" }, { scale: "1" }], { duration: 900, easing: NU.motion.ease.out });
    if (screen === "home" || screen === "journey") queueScene();
  }

  /* ---- Lesson moments: only when a question arrives or the bar moves -------------------------- */
  const ANSWERS = ".choice-button,.word-bank-token,.match-pair-card,.sequence-token";
  let lastQuestion = "", lastShare = null;
  function lessonMoments({ questionKey = "", combo = 0 }) {
    document.body.dataset.heat = String(combo >= 6 ? 2 : combo >= 3 ? 1 : 0);
    const bar = document.querySelector("#app .quiz-progress");
    const share = parseFloat(bar?.firstElementChild?.style.width) || 0;
    if (bar && lastShare !== null && share > lastShare && level() !== "off") bar.classList.add("is-advancing");
    lastShare = bar ? share : null;
    if (questionKey === lastQuestion) return;
    lastQuestion = questionKey;
    if (level() === "off") return;
    [...document.querySelectorAll(`#app :is(${ANSWERS})`)].slice(0, 10).forEach((el, i) => {
      el.animate([{ translate: "0 18px", scale: ".94", opacity: 0 }, { translate: "0 0", scale: "1", opacity: 1 }],
        { ...NU.motion.springs.snappy, delay: 90 + i * 55, fill: "backwards" });
    });
  }

  // Called by the app after every render.
  function afterRender({ screen = "", entered = false, questionKey = "", combo = 0 } = {}) {
    document.documentElement.dataset.nuLive = level();
    backdrop();
    watchReveals();
    if (entered) { order = 0; entrance(screen); }
    if (screen === "lesson") lessonMoments({ questionKey, combo });
    else { lastQuestion = ""; lastShare = null; delete document.body.dataset.heat; }
  }

  document.documentElement.dataset.nuLive = level();
  return { afterRender };
})();
