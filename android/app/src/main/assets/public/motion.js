/* NederUrdu motion kit: spring easing, reusable moves, particles and shared-element morphs.
   Built on the Web Animations API so it works offline in the Android WebView without libraries. */
window.NU = window.NU || {};
NU.motion = (() => {
  const reducedQuery = matchMedia("(prefers-reduced-motion: reduce)");
  const supportsLinear = CSS.supports?.("animation-timing-function", "linear(0, 1)");

  // The app's CSS effects profile treats every phone as "lite"; motion instead judges the hardware,
  // so capable phones get full feedback and only constrained devices drop particles and loops.
  const constrainedHardware = (Number(navigator.hardwareConcurrency) > 0 && Number(navigator.hardwareConcurrency) <= 4)
    || (Number(navigator.deviceMemory) > 0 && Number(navigator.deviceMemory) <= 3);

  // "off" honours both reduced-motion controls.
  function level() {
    const root = document.documentElement;
    if (reducedQuery.matches || root.dataset.effects === "reduced" || document.body.classList.contains("od-reduced")) return "off";
    return constrainedHardware || root.dataset.nuMotion === "lite" ? "lite" : "full";
  }

  // Simulates a damped spring and samples it into a CSS linear() easing.
  function spring({ stiffness = 260, damping = 18, mass = 1 } = {}) {
    const dt = 1 / 120, points = [];
    let x = 0, v = 0, t = 0, still = 0;
    while (t < 3 && still < 12) {
      const a = (-stiffness * (x - 1) - damping * v) / mass;
      v += a * dt; x += v * dt; t += dt;
      points.push(x);
      still = Math.abs(x - 1) < 0.002 && Math.abs(v) < 0.02 ? still + 1 : 0;
    }
    const step = Math.max(1, Math.round(points.length / 48));
    const sampled = [0, ...points.filter((_, i) => i % step === 0), 1];
    return {
      easing: supportsLinear ? `linear(${sampled.map(p => +p.toFixed(4)).join(", ")})` : "cubic-bezier(.34,1.56,.64,1)",
      duration: Math.round(t * 1000)
    };
  }

  const springs = {
    snappy: spring({ stiffness: 420, damping: 30 }),
    bouncy: spring({ stiffness: 300, damping: 14 }),
    wobbly: spring({ stiffness: 180, damping: 9 }),
    gentle: spring({ stiffness: 140, damping: 20 })
  };
  const ease = { out: "cubic-bezier(.16,1,.3,1)", inOut: "cubic-bezier(.65,0,.35,1)", in: "cubic-bezier(.5,0,.75,0)" };

  function animate(element, frames, options = {}) {
    if (!element?.animate || level() === "off") return null;
    const { spring: springName, ...rest } = options;
    const timing = springName ? springs[springName] : { easing: ease.out, duration: 450 };
    return element.animate(frames, { ...timing, ...rest });
  }

  const each = (targets) => (typeof targets === "string" ? [...document.querySelectorAll(targets)] : [].concat(targets || [])).filter(Boolean);

  const moves = {
    pop: el => animate(el, [{ transform: "scale(.6)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }], { spring: "bouncy" }),
    press: el => animate(el, [{ transform: "scale(1)" }, { transform: "scale(.94)", offset: .25 }, { transform: "scale(1)" }], { duration: 260, easing: ease.out }),
    bump: el => animate(el, [{ transform: "scale(1)" }, { transform: "scale(1.12)", offset: .3 }, { transform: "scale(1)" }], { spring: "wobbly" }),
    rise: el => animate(el, [{ transform: "translateY(28px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], { spring: "snappy" }),
    drop: el => animate(el, [{ transform: "translateY(-36px) scale(.96)", opacity: 0 }, { transform: "none", opacity: 1 }], { spring: "bouncy" }),
    shake: el => animate(el, [0, -12, 10, -8, 6, -3, 0].map(x => ({ transform: `translateX(${x}px)` })), { duration: 480, easing: "ease-out" }),
    wiggle: el => animate(el, [0, -7, 6, -4, 2, 0].map(r => ({ transform: `rotate(${r}deg)` })), { duration: 600, easing: "ease-in-out" }),
    jelly: el => animate(el, [
      { transform: "scale(1,1)" }, { transform: "scale(1.18,.84)", offset: .3 }, { transform: "scale(.9,1.1)", offset: .5 },
      { transform: "scale(1.05,.96)", offset: .7 }, { transform: "scale(1,1)" }
    ], { duration: 620, easing: "ease-out" }),
    float: el => level() === "full" && animate(el, [{ transform: "translateY(0)" }, { transform: "translateY(-6px)" }, { transform: "translateY(0)" }], { duration: 2600, iterations: Infinity, easing: "ease-in-out" })
  };

  // Plays a named move (or custom keyframes) on several elements with a stagger.
  function stagger(targets, move, { each: gap = 55, max = 12, from = 0 } = {}) {
    return each(targets).slice(0, max).map((el, i) => {
      const animation = typeof move === "string" ? moves[move](el) : animate(el, move, { spring: "snappy" });
      if (animation) animation.currentTime = -(from + i * gap);
      return animation;
    });
  }

  function countUp(element, to, { from = 0, duration = 900, suffix = "" } = {}) {
    if (!element) return;
    if (level() === "off") { element.textContent = `${to}${suffix}`; return; }
    const start = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - start) / duration);
      element.textContent = `${Math.round(from + (to - from) * (1 - (1 - p) ** 4))}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
      else moves.bump(element);
    };
    requestAnimationFrame(tick);
  }

  const palette = ["#ff7a1a", "#ffc23d", "#2b6bff", "#3dc25d", "#ff5ca8", "#8a5cff"];
  let layer = null;
  function particleLayer() {
    if (!layer?.isConnected) {
      layer = document.createElement("div");
      layer.className = "nu-fx-layer";
      layer.setAttribute("aria-hidden", "true");
      document.body.append(layer);
    }
    return layer;
  }

  // Radial burst of confetti, stars or sparks from a point or an element's centre.
  function burst(origin, { count = 18, colors = palette, spread = 120, shapes = ["dot", "bar", "star"], gravity = 60 } = {}) {
    const mode = level();
    if (mode === "off") return;
    const rect = origin?.getBoundingClientRect?.();
    const x = rect ? rect.left + rect.width / 2 : origin?.x ?? innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : origin?.y ?? innerHeight / 2;
    const total = mode === "lite" ? Math.ceil(count / 2) : count;
    const host = particleLayer();
    for (let i = 0; i < total; i++) {
      const piece = document.createElement("i");
      piece.className = `nu-particle nu-particle-${shapes[i % shapes.length]}`;
      piece.style.cssText = `left:${x}px;top:${y}px;--c:${colors[i % colors.length]}`;
      host.append(piece);
      const angle = (i / total) * Math.PI * 2 + Math.random() * .5;
      const distance = spread * (.55 + Math.random() * .6);
      const dx = Math.cos(angle) * distance, dy = Math.sin(angle) * distance;
      const spin = (Math.random() - .5) * 540;
      piece.animate([
        { transform: "translate(-50%,-50%) scale(.2) rotate(0deg)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1) rotate(${spin / 2}deg)`, opacity: 1, offset: .55 },
        { transform: `translate(calc(-50% + ${dx * 1.15}px), calc(-50% + ${dy + gravity}px)) scale(.6) rotate(${spin}deg)`, opacity: 0 }
      ], { duration: 700 + Math.random() * 350, easing: ease.out }).finished.then(() => piece.remove(), () => piece.remove());
    }
  }

  // Full-screen confetti rain for big moments.
  function confetti({ count = 60, colors = palette, duration = 2600 } = {}) {
    const mode = level();
    if (mode === "off") return;
    const host = particleLayer();
    const total = mode === "lite" ? Math.ceil(count / 2) : count;
    for (let i = 0; i < total; i++) {
      const piece = document.createElement("i");
      piece.className = `nu-particle nu-particle-${i % 3 ? "bar" : "dot"}`;
      piece.style.cssText = `left:${Math.random() * 100}vw;top:-20px;--c:${colors[i % colors.length]}`;
      host.append(piece);
      const sway = (Math.random() - .5) * 140;
      piece.animate([
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${sway}px, ${innerHeight + 60}px) rotate(${(Math.random() - .5) * 900}deg)`, opacity: .9 }
      ], { duration: duration * (.6 + Math.random() * .5), delay: Math.random() * 500, easing: "cubic-bezier(.3,.1,.6,1)" })
        .finished.then(() => piece.remove(), () => piece.remove());
    }
  }

  // Shared-element morphs: elements with the same data-morph key glide from their old box to the new one.
  // Small elements glide in place with a transform. Elements marked data-morph-fly (whole scenes, cards)
  // travel as a copy above the page transition, resizing by layout so their contents never stretch.
  let captured = new Map();
  function capture(root = document) {
    captured = new Map();
    root.querySelectorAll("[data-morph]").forEach(el => captured.set(el.dataset.morph, {
      rect: el.getBoundingClientRect(),
      copy: "morphFly" in el.dataset ? el.cloneNode(true) : null,
      radius: getComputedStyle(el).borderRadius
    }));
  }

  function fly(el, { rect: first, copy, radius }, root) {
    const last = el.getBoundingClientRect();
    if (last.bottom < 0 || last.top > innerHeight || first.bottom < 0 || first.top > innerHeight) return;
    copy.removeAttribute("data-morph");
    copy.classList.remove("is-playing");
    copy.classList.add("nu-flyer");
    copy.setAttribute("aria-hidden", "true");
    copy.style.cssText = `position:fixed;margin:0;z-index:66;left:${first.left}px;top:${first.top}px;width:${first.width}px;height:${first.height}px`;
    root.append(copy);
    // The copy shows the settled scene, so the arriving one should not replay its intro.
    el.classList.remove("is-playing");
    el.style.visibility = "hidden";
    root.querySelectorAll(`[data-morph-ghost="${CSS.escape(el.dataset.morph)}"]`).forEach(ghost => { ghost.style.visibility = "hidden"; });
    const landing = getComputedStyle(el).borderRadius;
    const trip = copy.animate([
      { left: `${first.left}px`, top: `${first.top}px`, width: `${first.width}px`, height: `${first.height}px`, borderRadius: radius },
      { left: `${last.left}px`, top: `${last.top}px`, width: `${last.width}px`, height: `${last.height}px`, borderRadius: landing }
    ], { ...springs.snappy, fill: "forwards" });
    const land = () => { el.style.visibility = ""; copy.remove(); };
    trip.finished.then(land, land);
    // Animations pause in a hidden page; never leave the real element invisible.
    setTimeout(land, springs.snappy.duration + 400);
  }

  function morph(root = document) {
    if (level() === "off" || document.hidden) { captured.clear(); return; }
    root.querySelectorAll("[data-morph]").forEach(el => {
      const entry = captured.get(el.dataset.morph);
      if (!entry) return;
      if (entry.copy) { fly(el, entry, root); return; }
      const first = entry.rect;
      const last = el.getBoundingClientRect();
      if (!last.width || !last.height) return;
      const dx = first.left - last.left, dy = first.top - last.top;
      const sx = first.width / last.width, sy = first.height / last.height;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sx - 1) < .01 && Math.abs(sy - 1) < .01) return;
      animate(el, [
        { transformOrigin: "0 0", transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
        { transformOrigin: "0 0", transform: "none" }
      ], { spring: "snappy" });
    });
    captured.clear();
  }

  return { level, spring, springs, ease, animate, stagger, countUp, burst, confetti, capture, morph, ...moves };
})();
