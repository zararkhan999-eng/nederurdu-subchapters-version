/* Pim's brain: input-driven behaviour layered on cat.js, the way Rive state machines drive Duolingo's
   characters. Pim watches your finger, lip-syncs Dutch syllables, enjoys being petted, and fidgets or
   dozes off when left alone (never during a lesson, where the screen stays still for reading). */
window.NU = window.NU || {};
NU.pim = (() => {
  const EYES = { x: 144, y: 41 }, HEAD = { x: 139, y: 30 };
  const active = () => NU.motion.level() !== "off";
  const isFace = (svg) => svg.classList.contains("nu-cat-face");
  const onScreen = (svg) => {
    const r = svg.getBoundingClientRect();
    return r.width > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
  };
  const visibleCats = () => [...document.querySelectorAll(".nu-cat")].filter(onScreen);
  const toLocal = (svg, x, y) => {
    const m = svg.getScreenCTM();
    return m ? new DOMPoint(x, y).matrixTransform(m.inverse()) : null;
  };
  const toScreen = (svg, x, y) => {
    const m = svg.getScreenCTM();
    return m ? new DOMPoint(x, y).matrixTransform(m) : null;
  };

  /* ---- Gaze: eyes (and a full-body Pim's head) follow the finger, then drift back to centre. ---- */
  let target = null, frame = 0, rest = 0;
  function aim(svg, point) {
    const gaze = svg.querySelector(".cat-gaze");
    if (!gaze) return;
    let dx = 0, dy = 0, tilt = 0;
    const local = point && active() && !svg.classList.contains("is-asleep") ? toLocal(svg, point.x, point.y) : null;
    if (local) {
      const vx = local.x - EYES.x, vy = local.y - EYES.y, len = Math.hypot(vx, vy) || 1;
      const reach = Math.min(1, len / 40);
      dx = (vx / len) * 2.8 * reach;
      dy = (vy / len) * 2.2 * reach;
      tilt = (vy / len) * 7 * reach;
    }
    gaze.style.transform = `translate(${dx.toFixed(2)}px,${dy.toFixed(2)}px)`;
    const head = isFace(svg) ? null : svg.querySelector(".cat-head");
    if (head && svg.classList.contains("is-asleep")) head.style.removeProperty("rotate");
    else head?.style.setProperty("rotate", `${tilt.toFixed(1)}deg`);
  }
  function look(x, y, { hold = 2600 } = {}) {
    target = x == null ? null : { x, y };
    if (!frame) frame = requestAnimationFrame(() => { frame = 0; visibleCats().forEach((svg) => aim(svg, target)); });
    clearTimeout(rest);
    if (target) rest = setTimeout(() => look(null), hold);
  }

  /* ---- Lip-sync: one mouth shape per syllable, picked from its vowel (a viseme-lite). ---- */
  const VOWEL = /(aai|ooi|oei|eeu|ieu|aa|ee|oo|uu|ie|oe|eu|ui|ou|au|ei|ij|[aeiouyàáèéëïóöü])/i;
  const SHAPES = {
    wide: "scale(1.2,1.3)",
    round: "scale(.7,1.15)",
    narrow: "scale(1.25,.55)"
  };
  function shapeOf(syllable) {
    const v = (String(syllable).match(VOWEL)?.[0] || "a").toLowerCase();
    if (/^(ee|ie|ij|ei|eeu|ieu|[ieyéèëï])$/.test(v)) return "narrow";
    if (/^(oo|oe|oei|ooi|uu|ou|au|ui|eu|[ouóöü])$/.test(v)) return "round";
    return "wide";
  }
  // The Pim nearest to the text that is being read aloud.
  function speakerFor(el) {
    for (let node = el?.parentElement; node && node.id !== "app" && node !== document.body; node = node.parentElement) {
      const cat = [...node.querySelectorAll(".nu-cat")].find((svg) => onScreen(svg) && !svg.closest(".pl-brand-face,.pl-offline"));
      if (cat) return cat;
    }
    return null;
  }
  function mouth(svg, syllable, { hold = 170 } = {}) {
    const open = svg?.querySelector(".cat-mouth-open");
    if (!open || !active()) return;
    svg.classList.add("is-mouthing");
    open.style.transform = SHAPES[shapeOf(syllable)];
    clearTimeout(svg._mouth);
    svg._mouth = setTimeout(() => { svg.classList.remove("is-mouthing"); open.style.transform = ""; }, hold);
  }

  /* ---- Petting: tap for hearts, a third tap rings the bell, five quick taps make Pim dizzy;
          press and hold for a purr. ---- */
  const restMood = (svg) => {
    if (!svg.dataset.restMood) svg.dataset.restMood = [...svg.classList].find((c) => c.startsWith("cat-mood-"))?.slice(9) || "idle";
    return svg.dataset.restMood;
  };
  function settle(svg, ms) {
    clearTimeout(svg._settle);
    svg._settle = setTimeout(() => NU.cat.mood(svg, restMood(svg)), ms);
  }
  function hearts(svg, count = 4) {
    const at = toScreen(svg, HEAD.x, HEAD.y - 6);
    if (at) NU.motion.burst({ x: at.x, y: at.y }, { count, spread: 46, gravity: -70, shapes: ["heart"], colors: ["#ff5c8a", "#ff7a9c", "#ff4d4d"] });
  }
  function dizzy(svg) {
    restMood(svg);
    NU.cat.mood(svg, "surprised");
    NU.sound.play("whoosh");
    NU.haptics.play("error");
    NU.motion.animate(svg.querySelector(".cat-head"), [0, -16, 14, -12, 9, -5, 0].map((r) => ({ transform: `rotate(${r}deg)` })), { duration: 900, easing: "ease-in-out" });
    const at = toScreen(svg, HEAD.x, HEAD.y - 14);
    if (at) NU.motion.burst({ x: at.x, y: at.y }, { count: 6, spread: 34, gravity: 0, shapes: ["star"], colors: ["#ffc23d"] });
    settle(svg, 1300);
  }
  function pet(svg) {
    if (!svg) return;
    wake(svg);
    restMood(svg);
    const now = performance.now();
    svg._taps = (svg._taps || []).filter((t) => now - t < 1600).concat(now);
    const n = svg._taps.length;
    if (n >= 5) { svg._taps = []; dizzy(svg); return; }
    NU.sound.play(n === 3 ? "bell" : "meow");
    NU.haptics.play("select");
    NU.cat.mood(svg, "happy");
    NU.cat.act(svg, n % 2 ? "hop" : "nod");
    hearts(svg, 3 + n);
    settle(svg, 1400);
  }
  function purr(svg) {
    wake(svg);
    restMood(svg);
    NU.cat.mood(svg, "happy");
    svg.classList.add("is-purring");
    NU.sound.play("purr", { seconds: 1.4 });
    NU.haptics.play("purr");
    hearts(svg, 8);
    setTimeout(() => svg.classList.remove("is-purring"), 1400);
    settle(svg, 1600);
  }

  // Pims inside buttons or links (and the Today street cat) already have their own tap action.
  const pettable = (el) => {
    const svg = el?.closest?.(".nu-cat");
    return svg && !svg.closest("button,a,[data-action],.street-cat,.map-pim") ? svg : null;
  };
  let press = null;
  document.addEventListener("pointerdown", (e) => {
    noteInput();
    look(e.clientX, e.clientY);
    const svg = pettable(e.target);
    if (!svg) return;
    clearTimeout(press?.timer);
    press = { svg, x: e.clientX, y: e.clientY, purred: false };
    press.timer = setTimeout(() => { press.purred = true; purr(svg); }, 550);
  }, { passive: true });
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse" || e.buttons) look(e.clientX, e.clientY);
    if (press && Math.hypot(e.clientX - press.x, e.clientY - press.y) > 12) { clearTimeout(press.timer); press = null; }
  }, { passive: true });
  document.addEventListener("pointerup", () => {
    if (!press) return;
    clearTimeout(press.timer);
    if (!press.purred) pet(press.svg);
    press = null;
  }, { passive: true });
  document.addEventListener("pointercancel", () => { clearTimeout(press?.timer); press = null; }, { passive: true });
  document.addEventListener("focusin", (e) => {
    const r = e.target?.getBoundingClientRect?.();
    if (r?.width && e.target !== document.body) look(r.left + r.width / 2, r.top + r.height / 2, { hold: 1800 });
  });

  /* ---- Idle life: small fidgets every few seconds; after a long pause Pim dozes off. ---- */
  const NAP_AFTER = 28000;
  let lastInput = performance.now();
  function noteInput() {
    lastInput = performance.now();
    document.querySelectorAll(".nu-cat.is-asleep").forEach((svg) => wake(svg, true));
  }
  function wake(svg, startled = false) {
    if (!svg?.classList.contains("is-asleep")) return;
    svg.classList.remove("is-asleep");
    if (!startled) return;
    restMood(svg);
    NU.cat.mood(svg, "surprised");
    NU.cat.act(svg, "hop");
    settle(svg, 700);
  }
  const fidgets = {
    ear: (svg) => NU.motion.animate(svg.querySelector(".cat-ear-right"), [0, -22, 8, -10, 0].map((r) => ({ transform: `rotate(${r}deg)` })), { duration: 420, easing: "ease-out" }),
    tail: (svg) => NU.motion.animate(svg.querySelector(".cat-tail"), [0, -26, 6, -20, 0].map((r) => ({ transform: `rotate(${r}deg)` })), { duration: 700, easing: "ease-in-out" }),
    glance: (svg) => {
      const r = svg.getBoundingClientRect(), side = Math.random() < 0.5 ? -1 : 1;
      aim(svg, { x: r.left + r.width / 2 + side * 400, y: r.top + r.height * (Math.random() * 0.8) });
      setTimeout(() => aim(svg, { x: r.left + r.width / 2 - side * 400, y: r.top }), 700);
      setTimeout(() => aim(svg, target), 1500);
    },
    yawn: (svg) => {
      svg.classList.add("is-yawning");
      setTimeout(() => svg.classList.remove("is-yawning"), 1100);
    }
  };
  function idleTick() {
    setTimeout(idleTick, 6000 + Math.random() * 6000);
    if (document.hidden || NU.motion.level() !== "full" || document.body.dataset.screen === "lesson") return;
    const cats = visibleCats().filter((svg) => !isFace(svg) && !svg.closest(".street.is-arriving") && !svg.classList.contains("is-purring"));
    if (!cats.length) return;
    if (performance.now() - lastInput > NAP_AFTER) {
      cats.forEach((svg) => { NU.cat.mood(svg, "idle"); svg.classList.add("is-asleep"); aim(svg, null); });
      return;
    }
    const svg = cats[Math.floor(Math.random() * cats.length)];
    if (svg.classList.contains("is-asleep")) return;
    const names = Object.keys(fidgets);
    fidgets[names[Math.floor(Math.random() * names.length)]](svg);
  }
  setTimeout(idleTick, 8000);
  addEventListener("scroll", noteInput, { passive: true, capture: true });
  addEventListener("keydown", noteInput, { passive: true });

  return { look, mouth, speakerFor, shapeOf, pet, purr, hearts, wake };
})();
