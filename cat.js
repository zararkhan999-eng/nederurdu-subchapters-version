/* Pim — NederUrdu's guide: a ginger cat on a Dutch omafiets.
   Pure SVG, drawn facing right. Moods swap face parts; actions animate parts with NU.motion.
   Legs are solved from hip to pedal every frame, so pedalling looks real. */
window.NU = window.NU || {};
NU.cat = (() => {
  const NAME = "Pim";
  const C = { x: 114, y: 148 };            // crank centre
  const WHEELS = [{ x: 58, y: 148 }, { x: 184, y: 148 }];
  const CRANK = 15;
  const HIP_NEAR = { x: 110, y: 100 };
  const HIP_FAR = { x: 104, y: 98 };
  const THIGH = 27, SHIN = 27;
  const fur = "#f4a24c", furDark = "#d97a26", cream = "#fff4e3", ink = "#2a2f45", bikeBlue = "#2b6bff";
  let uid = 0;

  // Two-bone IK: the knee bends forward (towards the handlebars).
  function leg(hip, foot) {
    const dx = foot.x - hip.x, dy = foot.y - hip.y;
    const d = Math.min(Math.hypot(dx, dy), THIGH + SHIN - 0.5);
    const a = Math.atan2(dy, dx);
    const bend = Math.acos(Math.max(-1, Math.min(1, (THIGH * THIGH + d * d - SHIN * SHIN) / (2 * THIGH * d))));
    const kx = hip.x + THIGH * Math.cos(a - bend), ky = hip.y + THIGH * Math.sin(a - bend);
    return `M${hip.x} ${hip.y}L${kx.toFixed(1)} ${ky.toFixed(1)}L${foot.x.toFixed(1)} ${foot.y.toFixed(1)}`;
  }
  const pedal = (angle) => ({ x: C.x + CRANK * Math.cos(angle), y: C.y + CRANK * Math.sin(angle) });

  function wheel(w, i) {
    const spokes = Array.from({ length: 8 }, (_, k) => {
      const a = (k / 8) * Math.PI;
      return `<path d="M${(w.x - 27 * Math.cos(a)).toFixed(1)} ${(w.y - 27 * Math.sin(a)).toFixed(1)}L${(w.x + 27 * Math.cos(a)).toFixed(1)} ${(w.y + 27 * Math.sin(a)).toFixed(1)}"/>`;
    }).join("");
    return `<g class="cat-wheel" data-wheel="${i}">
      <circle cx="${w.x}" cy="${w.y}" r="31" fill="none" stroke="${ink}" stroke-width="7"/>
      <circle cx="${w.x}" cy="${w.y}" r="27" fill="none" stroke="#c9d3e6" stroke-width="2"/>
      <g class="cat-spokes" stroke="#aab6cc" stroke-width="1.4" style="transform-origin:${w.x}px ${w.y}px">${spokes}</g>
      <circle cx="${w.x}" cy="${w.y}" r="4.5" fill="${ink}"/>
    </g>`;
  }

  function render({ mood = "idle", facing = "right", size = 180, label = `${NAME}, بلی جو سائیکل چلاتی ہے` } = {}) {
    const id = `cat${++uid}`;
    const near = pedal(Math.PI * 0.3), far = pedal(Math.PI * 1.3);
    return `<svg class="nu-cat cat-mood-${mood} ${facing === "left" ? "cat-facing-left" : ""}" viewBox="0 0 240 190" width="${size}" height="${Math.round(size * 190 / 240)}" role="img" aria-label="${label}" data-crank="${Math.PI * 0.3}">
      <defs>
        <radialGradient id="${id}-fur" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ffbd6e"/><stop offset="1" stop-color="${fur}"/></radialGradient>
      </defs>
      <ellipse class="cat-shadow" cx="121" cy="182" rx="92" ry="6" fill="#1f243326"/>
      <g class="cat-rig">
        ${wheel(WHEELS[0], 0)}${wheel(WHEELS[1], 1)}
        <g class="cat-tail" style="transform-origin:88px 104px">
          <path d="M88 104C62 104 50 78 62 60" fill="none" stroke="${fur}" stroke-width="9" stroke-linecap="round"/>
          <path d="M62 60c-3 5-4 10-2 15" fill="none" stroke="${furDark}" stroke-width="9" stroke-linecap="round"/>
        </g>
        <path class="cat-leg-far" d="${leg(HIP_FAR, far)}" fill="none" stroke="${furDark}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M24 140A34 34 0 0 1 84 124" stroke="#1a4ed1" stroke-width="4"/>
          <path d="M156 126A34 34 0 0 1 214 138" stroke="#1a4ed1" stroke-width="4"/>
          <g stroke="${bikeBlue}" stroke-width="7">
            <path d="M58 148L114 148M58 148L100 102M114 148L99 94M114 148Q152 138 168 104M168 104L162 84"/>
            <path d="M168 104L184 148" stroke-width="6"/>
            <path d="M162 84L157 70" stroke-width="5"/>
          </g>
          <path d="M157 70Q150 64 140 69" stroke="${ink}" stroke-width="5"/>
          <circle cx="${C.x}" cy="${C.y}" r="9" stroke="${ink}" stroke-width="3"/>
        </g>
        <g class="cat-basket">
          <path d="M184 56c-2-12 2-22 6-28" stroke="#3a9a4a" stroke-width="2.5" fill="none"/>
          <path d="M196 56c0-10 4-18 10-24" stroke="#3a9a4a" stroke-width="2.5" fill="none"/>
          <path d="M184 30c-6-2-7-10-3-14 2 3 4 2 4 0 2 2 4 3 5 0 3 5 1 12-6 14Z" fill="#ff4d4d"/>
          <path d="M207 30c-6 0-9-7-6-12 2 2 4 2 4-1 3 2 5 2 6-1 2 6-1 13-4 14Z" fill="#ffc23d"/>
          <path d="M168 58h46l-6 28h-34Z" fill="#e0a458" stroke="#b57a35" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M172 67h39M174 76h35M184 58l1 28M197 58l-1 28" stroke="#b57a35" stroke-width="1.5"/>
        </g>
        <path d="M84 90q13-6 26 0l-3 5H87Z" fill="${ink}"/>
        <g class="cat-crank" style="transform-origin:${C.x}px ${C.y}px">
          <path d="M${C.x} ${C.y}L${near.x.toFixed(1)} ${near.y.toFixed(1)}M${C.x} ${C.y}L${far.x.toFixed(1)} ${far.y.toFixed(1)}" stroke="#56607a" stroke-width="4" stroke-linecap="round"/>
        </g>
        <g class="cat-body">
          <ellipse cx="114" cy="80" rx="22" ry="27" transform="rotate(-24 114 80)" fill="url(#${id}-fur)"/>
          <ellipse cx="121" cy="86" rx="11" ry="16" transform="rotate(-24 121 86)" fill="${cream}"/>
          <path d="M100 66q5 3 4 9M95 76q5 2 5 8" stroke="${furDark}" stroke-width="3" stroke-linecap="round" fill="none"/>
          <g class="cat-scarf">
            <path d="M118 60q14 8 26 2l1 8q-14 7-28-1Z" fill="#ff4d4d"/>
            <path class="cat-scarf-tail" d="M120 64C106 60 98 66 88 60l1 9c9 5 18-1 30 2Z" fill="#ff4d4d" style="transform-origin:120px 66px"/>
            <path d="M92 62l-1 7M98 63l-1 7" stroke="#fff" stroke-width="2"/>
          </g>
        </g>
        <g class="cat-arm" style="transform-origin:128px 72px">
          <path d="M128 72Q136 76 141 70" fill="none" stroke="${fur}" stroke-width="9" stroke-linecap="round"/>
          <circle cx="142" cy="69.5" r="5.5" fill="${cream}"/>
        </g>
        <g class="cat-head" style="transform-origin:134px 60px">
          <path d="M119 31l1-21 15 13Z" fill="${fur}"/><path d="M122 27l1-11 8 8Z" fill="#ffb3c1"/>
          <g class="cat-ear-right" style="transform-origin:150px 26px"><path d="M143 23l14-14 2 22Z" fill="${fur}"/><path d="M147 23l8-8 1 12Z" fill="#ffb3c1"/></g>
          <circle cx="139" cy="43" r="23" fill="url(#${id}-fur)"/>
          <path d="M131 22q2 5 0 9M139 21v8M147 22q-2 5 0 9" stroke="${furDark}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
          <ellipse cx="148" cy="52" rx="11" ry="7.5" fill="${cream}"/>
          <circle cx="129" cy="51" r="4" fill="#ff8fa3" opacity=".45"/><circle cx="159" cy="49" r="3.5" fill="#ff8fa3" opacity=".45"/>
          <g class="cat-eyes cat-eyes-open">
            <g class="cat-blink" style="transform-origin:144px 41px">
              <ellipse cx="136" cy="41" rx="3.8" ry="5" fill="${ink}"/><ellipse cx="152" cy="40" rx="3.6" ry="4.8" fill="${ink}"/>
              <circle class="cat-pupil-shine" cx="137.4" cy="39" r="1.4" fill="#fff"/><circle class="cat-pupil-shine" cx="153.3" cy="38" r="1.3" fill="#fff"/>
            </g>
          </g>
          <g class="cat-eyes cat-eyes-happy" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round">
            <path d="M132 42q4-5 8 0M148 41q4-5 8 0"/>
          </g>
          <g class="cat-eyes cat-eyes-sad">
            <ellipse cx="136" cy="43" rx="3.4" ry="4" fill="${ink}"/><ellipse cx="152" cy="42" rx="3.2" ry="3.8" fill="${ink}"/>
            <path d="M131 36l8 2M157 35l-8 2" stroke="${ink}" stroke-width="2" stroke-linecap="round"/>
          </g>
          <path d="M145.5 48.5h5l-2.5 3Z" fill="#e0567a"/>
          <path class="cat-mouth cat-mouth-closed" d="M143 53q2.5 3 5 0q2.5 3 5 0" fill="none" stroke="${ink}" stroke-width="1.8" stroke-linecap="round"/>
          <path class="cat-mouth cat-mouth-open" d="M143 53.5q5 9 10 0Z" fill="#c9455a" stroke="${ink}" stroke-width="1.6" stroke-linejoin="round"/>
          <path class="cat-mouth cat-mouth-sad" d="M143 57q5-4 10 0" fill="none" stroke="${ink}" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M157 51l12-3M157 54l12 1M129 53l-11-1" stroke="#7a5a3a" stroke-width="1" stroke-linecap="round" opacity=".6"/>
        </g>
        <path class="cat-leg-near" d="${leg(HIP_NEAR, near)}" fill="none" stroke="${fur}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <circle class="cat-foot-near" cx="${near.x.toFixed(1)}" cy="${near.y.toFixed(1)}" r="5.5" fill="${cream}"/>
      </g>
    </svg>`;
  }

  function setCrank(svg, angle) {
    const near = pedal(angle), far = pedal(angle + Math.PI);
    svg.querySelector(".cat-crank path")?.setAttribute("d", `M${C.x} ${C.y}L${near.x.toFixed(1)} ${near.y.toFixed(1)}M${C.x} ${C.y}L${far.x.toFixed(1)} ${far.y.toFixed(1)}`);
    svg.querySelector(".cat-leg-near")?.setAttribute("d", leg(HIP_NEAR, near));
    svg.querySelector(".cat-leg-far")?.setAttribute("d", leg(HIP_FAR, far));
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
        const wheelTurn = travelled / 31;
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

  return { NAME, render, mood, act, pedalFor, setCrank };
})();
