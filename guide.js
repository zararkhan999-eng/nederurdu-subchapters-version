/* Pim the guide: a first-run tour with a spotlight, a mood-aware greeting and word of the day on
   Today, and a lesson coach that cheers comebacks, calms wrong streaks and offers a hint when the
   learner hesitates. Lines are always Dutch first with the Urdu meaning. Builds on cat.js and pim.js. */
window.NU = window.NU || {};
NU.guide = (() => {
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const KEY = "nederurdu-guide-v1";
  const today = () => new Date().toISOString().slice(0, 10);
  const daysBetween = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
  const still = () => NU.motion.level() === "off";
  // Remove after an exit animation, or straight away when motion is off.
  const removeAfter = (el, anim, ms = 400) => {
    const done = () => el.remove();
    if (!anim) { done(); return; }
    anim.finished.then(done, done);
    setTimeout(done, ms);
  };

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
  }
  function save(next) {
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode: the guide just forgets */ }
  }
  let store = load();
  // Read the previous visit once per launch, before recording this one.
  const visit = { firstEver: !store.lastSeen, daysAway: store.lastSeen ? daysBetween(store.lastSeen, today()) : 0 };
  store.lastSeen = today();
  save(store);

  let options = { speak: null };
  const configure = (next) => { options = { ...options, ...next }; };

  /* ---- Today: greeting and word of the day ---------------------------------------------- */
  function greeting({ streak = 0, practicedToday = false, completed = 0, time = "morning" } = {}) {
    if (visit.firstEver && !completed) return { nl: "Hoi! Ik ben Pim.", ur: "میں پِم ہوں۔ چلیں، مل کر ڈچ سیکھیں!", mood: "happy" };
    if (visit.daysAway >= 2 && !practicedToday) return { nl: "Welkom terug!", ur: "واپسی مبارک! آپ کی یاد آ رہی تھی۔", mood: "happy" };
    if (practicedToday && streak >= 2) return { nl: `${streak} dagen op rij!`, ur: `لگاتار ${streak} دن — زبردست! ایک اور سبق؟`, mood: "happy" };
    if (practicedToday) return { nl: "Goed bezig!", ur: "آج کی مشق ہو گئی — شاباش! ایک اور سبق؟", mood: "happy" };
    if (streak >= 2) return { nl: "Houd je reeks vast!", ur: `آج ایک سبق کریں تاکہ ${streak} دن کا سلسلہ قائم رہے۔`, mood: "surprised" };
    const byTime = {
      morning: { nl: "Klaar voor vandaag?", ur: "آج کے لیے تیار ہیں؟ صرف چند منٹ کافی ہیں۔" },
      afternoon: { nl: "Even pauze? Even Nederlands!", ur: "چھوٹا سا وقفہ؟ تھوڑی سی ڈچ!" },
      evening: { nl: "Nog één lesje?", ur: "سونے سے پہلے ایک چھوٹا سا سبق؟" },
      night: { nl: "Nog wakker?", ur: "ابھی جاگ رہے ہیں؟ ایک لفظ ہی سہی!" }
    };
    return { ...(byTime[time] || byTime.morning), mood: "idle" };
  }

  // The same word all day; a new one tomorrow. Prefers words the learner has already met. The
  // candidate list grows as words are met, so the day's pick is remembered rather than re-derived;
  // `pool` (all words) lets it be found again after the candidates change.
  function wordOfDay(words, pool = words) {
    const usable = (words || []).filter((w) => w?.dutch && w?.urdu);
    const idOf = (w) => w.id || w.dutch;
    if (store.word?.day === today()) {
      const kept = [...usable, ...(pool || [])].find((w) => w?.dutch && w?.urdu && idOf(w) === store.word.id);
      if (kept) return kept;
    }
    if (!usable.length) return null;
    const seed = [...today()].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 7);
    const word = usable[seed % usable.length];
    store.word = { day: today(), id: idOf(word) };
    save(store);
    return word;
  }

  // Delegated so the Today card needs no wiring in app.js.
  document.addEventListener("click", (e) => {
    const reveal = e.target.closest?.("[data-guide=reveal-word]");
    if (!reveal) return;
    const card = reveal.closest(".pim-word");
    const open = !card.classList.contains("is-revealed");
    card.classList.toggle("is-revealed", open);
    reveal.setAttribute("aria-expanded", String(open));
    NU.sound.play(open ? "pop" : "tap");
    NU.haptics.play("select");
    if (open) {
      NU.motion.pop(card.querySelector(".pim-word-meaning"));
      const face = document.querySelector(".pim-corner .nu-cat");
      NU.cat.mood(face, "happy");
      NU.cat.act(face, "nod");
      setTimeout(() => NU.cat.mood(face, face?.dataset.restMood || "idle"), 1200);
    }
  });

  /* ---- Toasts: Pim pops in at the top with a line ---------------------------------------- */
  function toast(nl, ur, { mood = "happy", hold = 1900 } = {}) {
    document.querySelectorAll(".pl-streak-toast,.guide-toast").forEach((el) => el.remove());
    const el = document.createElement("div");
    el.className = "guide-toast";
    el.setAttribute("role", "status");
    el.innerHTML = `<span class="guide-toast-face" aria-hidden="true">${NU.cat.render({ face: true, size: 40, mood })}</span>
      <span><b class="latin" dir="ltr">${esc(nl)}</b><small>${esc(ur)}</small></span>`;
    document.body.append(el);
    const show = NU.motion.animate(el, [{ transform: "translate(-50%,-120%)" }, { transform: "translate(-50%,0)" }], { spring: "bouncy", fill: "forwards" });
    setTimeout(() => {
      const out = NU.motion.animate(el, [{ transform: "translate(-50%,0)", opacity: 1 }, { transform: "translate(-50%,-120%)", opacity: 0 }], { duration: 320, fill: "forwards" });
      removeAfter(el, out);
    }, show ? hold : hold - 300);
  }

  /* ---- Lesson coach ------------------------------------------------------------------------ */
  const STREAK_MILESTONES = [3, 5, 10, 15, 20];
  const freshLesson = (key = "") => ({ key, answers: 0, wrongRun: 0, lastCorrect: true, halfwayShown: false });
  let lesson = freshLesson();
  // Called whenever a lesson or review (re)starts, so a replay of the same one starts clean.
  function beginLesson(lessonKey = "") { lesson = freshLesson(lessonKey); }
  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  // Returns a special [nl, ur] line for the feedback panel, or null for the usual praise.
  function onAnswer({ correct, combo = 0, lessonKey = "", index = 0, total = 0 }) {
    if (lessonKey !== lesson.key) beginLesson(lessonKey);
    hidePeek();
    const first = lesson.answers === 0;
    const comeback = correct && !lesson.lastCorrect;
    lesson.answers += 1;
    lesson.wrongRun = correct ? 0 : lesson.wrongRun + 1;
    lesson.lastCorrect = correct;

    if (correct && total > 3 && !lesson.halfwayShown && (index + 1) / total >= 0.5 && !STREAK_MILESTONES.includes(combo)) {
      lesson.halfwayShown = true;
      setTimeout(() => toast("Halverwege!", "آدھا سبق مکمل — چلتے رہیں!"), 450);
    }
    if (comeback) return pick([["Zie je wel!", "دیکھا؟ آپ کر سکتے ہیں!"], ["Nu wel!", "اب بالکل ٹھیک!"], ["Goed hersteld!", "خوب سنبھالا!"]]);
    if (correct && first) return ["Daar gaan we!", "شاندار آغاز!"];
    if (!correct && lesson.wrongRun >= 2) return pick([["Rustig aan.", "آرام سے، ایک ایک قدم۔ صحیح جواب غور سے دیکھیں۔"], ["Niet opgeven!", "ہمت نہ ہاریں — ہر غلطی سکھاتی ہے۔"]]);
    return null;
  }

  // Hesitation: when an answerable question sits untouched, Pim peeks in from the side.
  const PEEK_AFTER = 16000;
  let peekTimer = 0, peekKey = "", peekShownFor = "";
  function waitingQuestion() {
    if (document.body.dataset.screen !== "lesson") return null;
    if (document.querySelector(".quiz-feedback-panel,.quiz-action[data-action=continue-info]")) return null;
    const check = document.querySelector(".quiz-action[data-action=check]");
    return check?.disabled ? check : null;
  }
  function afterRender({ questionKey = "" } = {}) {
    if (questionKey !== peekKey || !waitingQuestion()) {
      clearTimeout(peekTimer);
      hidePeek();
      peekKey = questionKey;
      armPeek();
    }
  }
  function armPeek() {
    clearTimeout(peekTimer);
    const key = peekKey;
    if (!waitingQuestion() || peekShownFor === key || navigator.webdriver) return;
    peekTimer = setTimeout(() => { if (waitingQuestion() && peekKey === key) showPeek(key); }, PEEK_AFTER);
  }
  // Tapping or typing is not hesitating: any interaction restarts the countdown.
  const onActivity = () => { if (document.body.dataset.screen === "lesson" && peekKey) armPeek(); };
  ["input", "keydown"].forEach((type) => document.addEventListener(type, onActivity, { capture: true, passive: true }));
  function showPeek(key) {
    if (document.querySelector(".guide-peek:not(.is-leaving)")) return;
    peekShownFor = key;
    const hasHint = Boolean(document.querySelector(".question-help-toggle:not(.active)"));
    const el = document.createElement("div");
    el.className = "guide-peek";
    el.setAttribute("role", "status");
    el.innerHTML = `<span class="guide-peek-face" aria-hidden="true">${NU.cat.render({ face: true, size: 54, mood: "surprised" })}</span>
      <div class="guide-peek-bubble"><b class="latin" dir="ltr">${hasHint ? "Hulp nodig?" : "Neem je tijd."}</b>
        <small>${hasHint ? "مشکل لگ رہا ہے؟ ایک اشارہ دیکھیں۔" : "کوئی جلدی نہیں — آرام سے سوچیں۔"}</small>
        <span class="guide-peek-actions">${hasHint ? '<button type="button" data-peek="hint">اشارہ دیکھیں</button>' : ""}<button type="button" data-peek="close" class="is-quiet">ٹھیک ہے</button></span>
      </div>`;
    el.addEventListener("click", (e) => {
      const what = e.target.closest("[data-peek]")?.dataset.peek;
      if (!what) return;
      hidePeek();
      if (what === "hint") document.querySelector(".question-help-toggle")?.click();
    });
    // Sit just above the lesson footer so its buttons stay reachable.
    const footer = document.querySelector(".quiz-action-bar");
    if (footer) el.style.bottom = `${Math.round(innerHeight - footer.getBoundingClientRect().top + 10)}px`;
    document.body.append(el);
    NU.sound.play("meow");
    NU.motion.animate(el, [{ transform: "translateY(130%)" }, { transform: "translateY(0)" }], { spring: "bouncy", fill: "forwards" });
    const face = el.querySelector(".nu-cat");
    setTimeout(() => NU.cat.mood(face, "happy"), 600);
  }
  // Any tap elsewhere sends Pim away; the peek never blocks an answer.
  document.addEventListener("pointerdown", (e) => {
    if (e.target.closest?.(".guide-peek")) return;
    hidePeek();
    onActivity();
  }, { capture: true, passive: true });
  function hidePeek() {
    document.querySelectorAll(".guide-peek:not(.is-leaving)").forEach((el) => {
      el.classList.add("is-leaving");
      const out = NU.motion.animate(el, [{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(130%)", opacity: 0 }], { duration: 220, fill: "forwards" });
      removeAfter(el, out);
    });
  }

  /* ---- First-run tour ----------------------------------------------------------------------- */
  const STEPS = [
    { nl: "Hoi! Ik ben Pim.", ur: "میں پِم ہوں — آپ کا ڈچ ساتھی۔ آئیے، ایک منٹ میں ایپ کی سیر کریں!", say: "Hoi! Ik ben Pim", big: true },
    { target: ".today-action", nl: "Hier begin je.", ur: "یہاں سے آج کا سبق شروع کریں۔ ہر سبق صرف چند منٹ کا ہے۔", say: "Hier begin je" },
    { target: ".street-cat", nl: "Tik op mij!", ur: "مجھے تھپتھپائیں — ہر بار ایک نیا ڈچ جملہ۔ دبائے رکھیں تو خرخر سنیں!", say: "Tik op mij", pad: 0 },
    { target: ".pim-corner", nl: "Woord van vandaag", ur: "روز ایک نیا لفظ: سنیں، مطلب دیکھیں اور یاد کریں۔", say: "Woord van vandaag" },
    { target: '.bottom-nav [data-action="journey"]', nl: "Je reis", ur: "سفر: نقشے پر سارے سبق اور آپ کی پیش رفت۔", say: "Je reis" },
    { target: '.bottom-nav [data-action="practice"]', nl: "Oefenen", ur: "مشق: غلطیاں دہرائیں اور الفاظ پکے کریں۔", say: "Oefenen" },
    { target: '.bottom-nav [data-action="toolkit"]', nl: "Je hulpje", ur: "مددگار: آپ کے الفاظ، حروف اور گرامر ایک جگہ۔", say: "Je hulpje" },
    { target: '.progress-header [data-action="settings"]', nl: "Instellingen", ur: "ترتیبات: آہستہ آواز، بڑا متن اور کم حرکت — جیسے آپ کو آسان لگے۔", say: "Instellingen" },
    { nl: "Veel succes!", ur: "بہت سی کامیابی! چلیں، پہلا سبق شروع کریں۔", say: "Veel succes", big: true, last: true }
  ];
  let tour = null;

  function shouldTour() {
    return !store.tourDone && !navigator.webdriver && !new URLSearchParams(location.search).has("notour");
  }
  function maybeTour() {
    if (tour || !shouldTour() || document.body.dataset.screen !== "home") return;
    const go = () => setTimeout(() => { if (!tour && document.body.dataset.screen === "home") startTour(); }, 1400);
    if (document.body.classList.contains("launching")) {
      const wait = setInterval(() => { if (!document.body.classList.contains("launching")) { clearInterval(wait); go(); } }, 200);
    } else go();
  }

  function startTour() {
    endTour(false);
    const root = document.createElement("div");
    root.className = "guide-tour";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", "پِم کے ساتھ ایپ کی سیر");
    root.innerHTML = `<div class="guide-spot" aria-hidden="true"></div>
      <div class="guide-card" tabindex="-1">
        <span class="guide-card-pim" aria-hidden="true"></span>
        <div class="guide-card-body" aria-live="polite">
          <button type="button" class="guide-say" data-tour="say" aria-label="Nederlands آواز سنیں"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/></svg></button>
          <b class="latin guide-card-nl" dir="ltr"></b>
          <p class="guide-card-ur"></p>
        </div>
        <div class="guide-card-foot">
          <span class="guide-dots" aria-hidden="true">${STEPS.map(() => "<i></i>").join("")}</span>
          <button type="button" class="guide-skip" data-tour="skip">چھوڑیں</button>
          <button type="button" class="guide-next" data-tour="next">آگے</button>
        </div>
      </div>`;
    // The root lingers for its fade-out after endTour; by then tour is null and these do nothing.
    root.addEventListener("click", (e) => {
      if (tour?.root !== root) return;
      const what = e.target.closest("[data-tour]")?.dataset.tour;
      if (what === "next") step(tour.index + 1);
      else if (what === "skip") endTour(true);
      else if (what === "start") { endTour(true); document.querySelector("#app .today-action")?.click(); }
      else if (what === "say") speakStep();
    });
    root.addEventListener("keydown", (e) => {
      if (tour?.root !== root) return;
      if (e.key === "Escape") endTour(true);
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") step(tour.index + 1);
    });
    document.body.append(root);
    tour = { root, index: -1, onResize: () => place(true) };
    addEventListener("resize", tour.onResize);
    addEventListener("scroll", tour.onResize, { passive: true, capture: true });
    NU.motion.animate(root, [{ opacity: 0 }, { opacity: 1 }], { duration: 260, fill: "forwards" });
    step(0);
  }

  function speakStep() {
    const s = STEPS[tour?.index];
    if (!s?.say) return;
    if (options.speak) options.speak(s.say);
    const svg = tour.root.querySelector(".guide-card-pim .nu-cat");
    if (svg) [...s.say.replace(/[^a-z ]/gi, "")].filter((_, i) => i % 3 === 0).forEach((ch, i) => setTimeout(() => NU.pim?.mouth(svg, ch, { hold: 150 }), i * 170));
  }

  function step(index) {
    if (!tour) return;
    if (index >= STEPS.length) { endTour(true); return; }
    // Skip steps whose target is missing (e.g. the word card when there are no words yet).
    while (STEPS[index]?.target && !document.querySelector(STEPS[index].target)) index += 1;
    tour.index = index;
    const s = STEPS[index];
    const { root } = tour;
    const card = root.querySelector(".guide-card");
    root.classList.toggle("is-big", Boolean(s.big));
    root.querySelector(".guide-card-pim").innerHTML = NU.cat.render(s.big ? { size: 150, mood: "happy" } : { face: true, size: 62, mood: index % 2 ? "happy" : "idle" });
    root.querySelector(".guide-card-nl").textContent = s.nl;
    root.querySelector(".guide-card-ur").textContent = s.ur;
    root.querySelectorAll(".guide-dots i").forEach((dot, i) => dot.classList.toggle("is-on", i <= index));
    const next = root.querySelector(".guide-next");
    next.textContent = s.last ? "سبق شروع کریں" : index === 0 ? "چلیں!" : "آگے";
    next.dataset.tour = s.last ? "start" : "next";
    root.querySelector(".guide-skip").textContent = s.last ? "بعد میں" : "چھوڑیں";
    root.querySelector(".guide-say").hidden = !options.speak;

    const target = s.target && document.querySelector(s.target);
    // Jump (not smooth-scroll) so the spotlight can glide to where the target really is.
    if (target && !target.closest(".bottom-nav,.progress-header")) target.scrollIntoView({ block: "center", behavior: "instant" });
    requestAnimationFrame(() => requestAnimationFrame(() => place(false)));
    NU.sound.play(index === 0 ? "bell" : "pop");
    const pim = root.querySelector(".guide-card-pim .nu-cat");
    if (s.big) NU.cat.act(pim, index === 0 ? "wave" : "hop");
    else NU.cat.act(pim, "nod");
    // Individual translate/scale compose with the CSS transform that centres steps 0 and 8, and no
    // fill means nothing lingers after the entry to override it.
    NU.motion.animate(card, [{ translate: "0 10px", scale: ".96", opacity: 0 }, { translate: "0 0", scale: "1", opacity: 1 }], { spring: "snappy" });
    setTimeout(() => card.querySelector(".guide-next")?.focus({ preventScroll: true }), 60);
  }

  function place(instant) {
    if (!tour) return;
    const s = STEPS[tour.index];
    const { root } = tour;
    const spot = root.querySelector(".guide-spot");
    const card = root.querySelector(".guide-card");
    const target = s?.target && document.querySelector(s.target);
    spot.style.transition = instant || still() ? "none" : "";
    if (!target) {
      spot.classList.add("is-hidden");
      card.style.top = "";
      card.style.bottom = "";
      root.classList.add("is-centered");
      return;
    }
    root.classList.remove("is-centered");
    spot.classList.remove("is-hidden");
    const r = target.getBoundingClientRect();
    const pad = s.pad ?? 8;
    Object.assign(spot.style, { left: `${r.left - pad}px`, top: `${r.top - pad}px`, width: `${r.width + pad * 2}px`, height: `${r.height + pad * 2}px` });
    // The card goes on whichever side of the target has more room.
    const below = innerHeight - r.bottom, above = r.top;
    if (below > above) { card.style.top = `${Math.min(r.bottom + pad + 14, innerHeight - card.offsetHeight - 12)}px`; card.style.bottom = ""; }
    else { card.style.bottom = `${Math.min(innerHeight - r.top + pad + 14, innerHeight - card.offsetHeight - 12)}px`; card.style.top = ""; }
  }

  function endTour(done) {
    if (!tour) return;
    const { root, onResize } = tour;
    tour = null;
    removeEventListener("resize", onResize);
    removeEventListener("scroll", onResize, { capture: true });
    root.inert = true;
    if (done) { store.tourDone = true; save(store); }
    const out = NU.motion.animate(root, [{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "forwards" });
    removeAfter(root, out);
  }

  function reset() {
    endTour(false);
    store = { lastSeen: today() };
    save(store);
  }

  return { configure, greeting, wordOfDay, toast, beginLesson, onAnswer, afterRender, hidePeek, maybeTour, startTour, endTour, reset, visit };
})();
