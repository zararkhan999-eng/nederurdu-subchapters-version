/* Pim — NederUrdu's guide: a ginger cat on a Dutch omafiets.
   Drawn by pim-parts.js (shared with the static art kit), facing right. Moods swap face parts via
   world.css; actions animate parts with NU.motion. Legs are re-solved hip→pedal every frame. */
window.NU = window.NU || {};
NU.cat = (() => {
  const NAME = "Pim";
  const parts = NU.pimParts;
  const { BIKE, leg, pedal } = parts;
  const C = BIKE.crank;

  // Both markups are the same on every call, so build them once. Face avatars carry only the head
  // (still inside .cat-rig for purring), not the whole bike cropped away by the viewBox.
  const RIDER = parts.rider();
  const FACE = `<g class="cat-rig">${parts.riderHead()}</g>`;

  // `face: true` crops to Pim's head for logos and small avatars.
  function render({ mood = "idle", facing = "right", size = 180, face = false, label = `${NAME}, بلی جو سائیکل چلاتی ہے` } = {}) {
    const F = parts.FACE_BOX;
    const box = face ? `${F.x} ${F.y} ${F.w} ${F.h}` : "0 0 240 190";
    const height = face ? Math.round(size * F.h / F.w) : Math.round(size * 190 / 240);
    const a11y = face ? 'aria-hidden="true"' : `role="img" aria-label="${label}"`;
    return `<svg class="nu-cat ${face ? "nu-cat-face" : ""} cat-mood-${mood} ${facing === "left" ? "cat-facing-left" : ""}" viewBox="${box}" width="${size}" height="${height}" ${a11y} data-crank="${BIKE.crank0}">${face ? FACE : RIDER}</svg>`;
  }

  function setCrank(svg, angle) {
    const near = pedal(angle), far = pedal(angle + Math.PI);
    svg.querySelector(".cat-crank path")?.setAttribute("d", `M${C.x} ${C.y}L${near.x.toFixed(1)} ${near.y.toFixed(1)}M${C.x} ${C.y}L${far.x.toFixed(1)} ${far.y.toFixed(1)}`);
    svg.querySelector(".cat-leg-near")?.setAttribute("d", leg(BIKE.hipNear, near));
    svg.querySelector(".cat-leg-far")?.setAttribute("d", leg(BIKE.hipFar, far));
    const foot = svg.querySelector(".cat-foot-near");
    foot?.setAttribute("cx", near.x.toFixed(1));
    foot?.setAttribute("cy", near.y.toFixed(1));
  }

  // Pedal for `duration` ms covering `distance` px; speed eases out so the bike brakes to a stop.
  function pedalFor(svg, { duration = 1600, distance = 300, easeOut = true } = {}) {
    if (!svg || NU.motion.level() === "off") return Promise.resolve();
    const spokes = [...svg.querySelectorAll(".cat-spokes")];
    const start = performance.now();
    const crank0 = Number(svg.dataset.crank) || 0;
    return new Promise((resolve) => {
      const tick = (now) => {
        if (!svg.isConnected) return resolve();
        const p = Math.min(1, (now - start) / duration);
        const travelled = distance * (easeOut ? 1 - (1 - p) ** 3 : p);
        const wheelTurn = travelled / BIKE.wheelR;
        spokes.forEach((s) => { s.style.transform = `rotate(${wheelTurn}rad)`; });
        const angle = crank0 + wheelTurn * 0.55;
        setCrank(svg, angle);
        svg.dataset.crank = String(angle);
        if (p < 1) requestAnimationFrame(tick); else resolve();
      };
      requestAnimationFrame(tick);
    });
  }

  function mood(svg, name) {
    if (!svg) return;
    svg.classList.forEach((c) => c.startsWith("cat-mood-") && svg.classList.remove(c));
    svg.classList.add(`cat-mood-${name}`);
  }

  const part = (svg, sel) => svg?.querySelector(sel);
  const actions = {
    hop: (svg) => NU.motion.animate(part(svg, ".cat-rig"), [
      { transform: "translateY(0) scale(1,1)" }, { transform: "translateY(4px) scale(1.04,.94)", offset: .15 },
      { transform: "translateY(-22px) scale(.97,1.04)", offset: .45 }, { transform: "translateY(0) scale(1.03,.96)", offset: .8 },
      { transform: "translateY(0) scale(1,1)" }
    ], { duration: 620, easing: "ease-out" }),
    wave: (svg) => NU.motion.animate(part(svg, ".cat-arm"), [
      { transform: "rotate(0)" }, { transform: "rotate(-120deg)", offset: .2 }, { transform: "rotate(-95deg)", offset: .35 },
      { transform: "rotate(-125deg)", offset: .5 }, { transform: "rotate(-95deg)", offset: .65 }, { transform: "rotate(-120deg)", offset: .8 },
      { transform: "rotate(0)" }
    ], { duration: 1400, easing: "ease-in-out" }),
    nod: (svg) => NU.motion.animate(part(svg, ".cat-head"), [
      { transform: "rotate(0)" }, { transform: "rotate(8deg)", offset: .3 }, { transform: "rotate(-3deg)", offset: .65 }, { transform: "rotate(0)" }
    ], { duration: 600, easing: "ease-in-out" }),
    shake: (svg) => NU.motion.animate(part(svg, ".cat-head"), [0, -9, 8, -6, 4, 0].map((r) => ({ transform: `rotate(${r}deg)` })), { duration: 650 }),
    brake: (svg) => NU.motion.animate(part(svg, ".cat-rig"), [
      { transform: "rotate(0)" }, { transform: "rotate(3deg)", offset: .35 }, { transform: "rotate(-1deg)", offset: .7 }, { transform: "rotate(0)" }
    ], { duration: 520, easing: "ease-out" }),
    talk: (svg, ms = 1200) => {
      if (!svg) return;
      mood(svg, "talk");
      clearTimeout(svg._talk);
      svg._talk = setTimeout(() => svg.classList.contains("cat-mood-talk") && mood(svg, "idle"), ms);
    }
  };

  function act(svg, name, ...args) { return actions[name]?.(svg, ...args); }

  // The launch screen is static HTML; give it Pim's face as soon as this script runs.
  const launchMark = document.querySelector(".launch-screen .od-mark");
  if (launchMark) launchMark.outerHTML = `<span class="launch-face">${render({ face: true, size: 112, mood: "happy" })}</span>`;

  return { NAME, render, mood, act, pedalFor, setCrank };
})();
