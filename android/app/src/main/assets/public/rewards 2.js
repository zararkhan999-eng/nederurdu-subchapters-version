/* Rewards: Dutch passport stamps for finished units, a tulip that grows with the daily streak,
   and the passport page that collects every stamp. */
window.NU = window.NU || {};
NU.rewards = (() => {
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  let uid = 0;

  // A round rubber stamp: perforated rim, the unit's building, and text running around the ring.
  function stamp({ kind = "home", color = "#2b6bff", label = "", code = "", number = "", date = "", earned = true, size = 120 } = {}) {
    const id = `stamp${++uid}`;
    if (!earned) {
      return `<svg class="pl-stamp is-empty" viewBox="0 0 120 120" width="${size}" height="${size}" aria-hidden="true">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#d1d5db" stroke-width="3" stroke-dasharray="6 7"/>
        <text x="60" y="70" text-anchor="middle" font-size="30" font-weight="800" fill="#c3c8d1" font-family="DM Sans, sans-serif">${esc(number)}</text>
      </svg>`;
    }
    const scallops = Array.from({ length: 28 }, (_, i) => {
      const a = (i / 28) * Math.PI * 2;
      return `<circle cx="${(60 + 55 * Math.cos(a)).toFixed(1)}" cy="${(60 + 55 * Math.sin(a)).toFixed(1)}" r="4.2" fill="#fffdf9"/>`;
    }).join("");
    // Latin-only lettering: Urdu cannot follow a curved path reliably, so the unit name stays in the caption.
    return `<svg class="pl-stamp" viewBox="0 0 120 120" width="${size}" height="${size}" role="img" aria-label="${esc(`مہر: ${label}`)}">
      <defs>
        <path id="${id}-top" d="M24 62a36 36 0 0 1 72 0"/>
        <filter id="${id}-ink"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="${uid % 9}"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -.9 1.55"/><feComposite in="SourceGraphic" operator="in"/></filter>
      </defs>
      <g filter="url(#${id}-ink)">
        <circle cx="60" cy="60" r="55" fill="${color}"/>
        ${scallops}
        <circle cx="60" cy="60" r="46" fill="none" stroke="#fff" stroke-width="2.5"/>
        <text font-size="9.5" font-weight="800" fill="#fff" letter-spacing="2.2" text-anchor="middle" font-family="DM Sans, sans-serif"><textPath href="#${id}-top" startOffset="50%">NEDERURDU</textPath></text>
        <circle cx="60" cy="58" r="20" fill="#00000026"/>
        <g transform="translate(60 58) scale(1.75)">${NU.map.signIcon(kind)}</g>
        ${code ? `<text x="60" y="89" text-anchor="middle" font-size="10" font-weight="800" fill="#fff" font-family="DM Sans, sans-serif" letter-spacing=".6">${esc(code)}</text>` : ""}
        ${date ? `<text x="60" y="99.5" text-anchor="middle" font-size="7" font-weight="700" fill="#ffffffd9" font-family="DM Sans, sans-serif">${esc(date)}</text>` : ""}
      </g>
    </svg>`;
  }

  // The tulip grows a stage per streak day: sprout, leaves, bud, bloom, then a whole bunch from a week on.
  function tulipStage(streak) {
    if (streak >= 7) return 4;
    if (streak >= 4) return 3;
    if (streak >= 2) return 2;
    return streak >= 1 ? 1 : 0;
  }
  function tulip(streak, { size = 96 } = {}) {
    const stage = tulipStage(streak);
    // Outer group places the head; the inner group is what animates.
    const head = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="pl-tulip-head"><path d="M-12 0c-2-12 2-18 5-21 2 4 5 5 7 0 2 5 5 4 7 0 3 3 7 9 5 21-4 7-20 7-24 0Z" fill="${c}"/><path d="M-5 -2c0-8 2-12 5-15 3 3 5 7 5 15" fill="#ffffff33"/></g></g>`;
    const stem = (x, top, lean = 0) => `<path class="pl-tulip-stem" d="M${x} 92C${x + lean} 76 ${x - lean} ${top + 20} ${x} ${top}" stroke="#3a9a4a" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    const leaf = (x, flip) => `<path class="pl-tulip-leaf" d="M${x} 90c${flip * 4}-14 ${flip * 16}-20 ${flip * 22}-22-${flip * 2}10-${flip * 8}20-${flip * 22}24Z" fill="#58c26b"/>`;
    const pot = `<path d="M30 88h40l-5 22H35Z" fill="#d9673c"/><rect x="27" y="84" width="46" height="9" rx="3" fill="#e9824f"/>`;
    const parts = [
      `<path d="M50 88c0-6 3-9 6-10" stroke="#3a9a4a" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="50" cy="88" r="3" fill="#8c5a3c"/>`,
      `${stem(50, 66)}${leaf(50, -1)}`,
      `${stem(50, 46)}${leaf(50, -1)}${leaf(50, 1)}<path class="pl-tulip-head" d="M44 46c0-9 3-13 6-15 3 2 6 6 6 15-3 4-9 4-12 0Z" fill="#ff7a1a"/>`,
      `${stem(50, 40)}${leaf(50, -1)}${leaf(50, 1)}${head(50, 40, 1, "#ff4d4d")}`,
      `${stem(36, 50, -4)}${stem(64, 50, 4)}${stem(50, 34)}${leaf(50, -1)}${leaf(50, 1)}${head(36, 50, .8, "#ffc23d")}${head(64, 50, .8, "#ff5ca8")}${head(50, 34, 1, "#ff4d4d")}`
    ][stage];
    return `<svg class="pl-tulip stage-${stage}" viewBox="0 0 100 112" width="${size}" height="${Math.round(size * 1.12)}" aria-hidden="true">${pot}${parts}</svg>`;
  }

  // Stamp lands: drops from above, slams with a thud, and puffs a little ink dust.
  function revealStamp(el) {
    if (!el) return;
    if (NU.motion.level() === "off") { NU.sound.play("stamp"); return; }
    NU.motion.animate(el, [
      { transform: "translateY(-120px) scale(2.2) rotate(-24deg)", opacity: 0 },
      { transform: "translateY(0) scale(.92) rotate(-8deg)", opacity: 1, offset: .55 },
      { transform: "scale(1.04) rotate(-9deg)", offset: .75 },
      { transform: "scale(1) rotate(-8deg)", opacity: 1 }
    ], { duration: 720, easing: "cubic-bezier(.5,0,.75,0)", fill: "both" });
    setTimeout(() => {
      NU.sound.play("stamp");
      NU.haptics.play("success");
      NU.motion.burst(el, { count: 16, spread: 90, colors: ["#d1d5db", "#ffc23d", "#ff7a1a"], shapes: ["dot"], gravity: 20 });
    }, 400);
  }

  // Grows the tulip from the ground up the first time the learner practises today.
  function growTulip(svg) {
    if (!svg || NU.motion.level() === "off") return;
    svg.querySelectorAll(".pl-tulip-stem,.pl-tulip-leaf").forEach((part, i) => NU.motion.animate(part, [
      { transform: "scaleY(0)", transformOrigin: "50% 100%", transformBox: "fill-box" },
      { transform: "scaleY(1)", transformOrigin: "50% 100%", transformBox: "fill-box" }
    ], { duration: 700, delay: 200 + i * 90, easing: "cubic-bezier(.34,1.56,.64,1)", fill: "backwards" }));
    svg.querySelectorAll(".pl-tulip-head").forEach((head, i) => NU.motion.animate(head, [
      { transform: "scale(0)", transformOrigin: "50% 100%", transformBox: "fill-box" },
      { transform: "scale(1)", transformOrigin: "50% 100%", transformBox: "fill-box" }
    ], { duration: 600, delay: 800 + i * 120, easing: "cubic-bezier(.34,1.56,.64,1)", fill: "backwards" }));
  }

  return { stamp, tulip, tulipStage, revealStamp, growTulip };
})();
