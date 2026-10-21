/* Pim's model sheet in code: palette and head, shared by the live Pim (cat.js) and the static art kit
   (art/kit.js) so he looks the same everywhere. Head coordinates live in "Pim space": the head is
   centred near (141, 44) and faces right. With `mood` set, only that face is drawn (static art);
   without it, every face is drawn and world.css shows the one matching the svg's cat-mood-* class. */
(function (root, factory) {
  const parts = factory();
  if (typeof module === "object" && module.exports) module.exports = parts;
  else { root.NU = root.NU || {}; root.NU.pimParts = parts; }
})(typeof self !== "undefined" ? self : this, () => {
  const P = {
    fur: "#ff9a3d", furShade: "#e5731c", furStripe: "#d9661a",
    cream: "#fff1dc", creamShade: "#f3d6ae",
    ink: "#1f2433", white: "#fff",
    earPink: "#ffa3b8", nose: "#ff6b8b", mouth: "#b8324d", tongue: "#ff8aa3", blush: "#ff7a9a",
    scarf: "#ff4d4d", scarfShade: "#d63434",
    bike: "#2b6bff", bikeShade: "#1a4ed1"
  };
  const HEAD = { x: 141, y: 44 };      // head centre
  const HEAD_TOP = { x: 141, y: 30 };  // brow, where hearts and stars burst from
  const EYES = { x: 145, y: 42 };
  // A darker tone of a #rrggbb colour, for hard shades (other values pass through unchanged).
  function shadeOf(hex, k = 0.8) {
    const h = String(hex).replace("#", "");
    if (!/^[0-9a-f]{6}$/i.test(h)) return hex;
    return `#${[0, 2, 4].map((i) => Math.round(parseInt(h.slice(i, i + 2), 16) * k).toString(16).padStart(2, "0")).join("")}`;
  }

  // Rounded flat shapes: the same colour as fill and a round-joined stroke softens every corner.
  const soft = (d, fill, w = 5) => `<path d="${d}" fill="${fill}" stroke="${fill}" stroke-width="${w}" stroke-linejoin="round"/>`;

  const faces = {
    eyes: {
      open: `<g class="cat-blink" style="transform-origin:${EYES.x}px ${EYES.y}px">
          <ellipse cx="131" cy="42" rx="7.4" ry="8.6" fill="${P.white}"/><ellipse cx="157" cy="41" rx="6.6" ry="8" fill="${P.white}"/>
          <g class="cat-gaze">
            <ellipse cx="132.2" cy="43" rx="4.4" ry="5.4" fill="${P.ink}"/><ellipse cx="158" cy="42" rx="4" ry="5" fill="${P.ink}"/>
            <circle class="cat-pupil-shine" cx="134" cy="40.6" r="1.7" fill="${P.white}"/><circle class="cat-pupil-shine" cx="159.6" cy="39.7" r="1.5" fill="${P.white}"/>
          </g>
        </g>`,
      happy: `<path d="M124 45q7-9 14 0M150 44q6.5-8.5 13 0" fill="none" stroke="${P.ink}" stroke-width="3.2" stroke-linecap="round"/>`,
      sad: `<ellipse cx="131" cy="44" rx="6.6" ry="7" fill="${P.white}"/><ellipse cx="157" cy="43" rx="6" ry="6.6" fill="${P.white}"/>
          <ellipse cx="132" cy="46" rx="3.8" ry="4.2" fill="${P.ink}"/><ellipse cx="158" cy="45" rx="3.5" ry="4" fill="${P.ink}"/>
          <path d="M123 35l11-4M165 34l-10-4" stroke="${P.ink}" stroke-width="2.8" stroke-linecap="round"/>`,
      surprised: `<ellipse cx="131" cy="41" rx="8.2" ry="9.6" fill="${P.white}"/><ellipse cx="157" cy="40" rx="7.4" ry="9" fill="${P.white}"/>
          <circle cx="132" cy="41" r="3.6" fill="${P.ink}"/><circle cx="158" cy="40" r="3.3" fill="${P.ink}"/>`,
      closed: `<path d="M124 43q7 5 14 0M150 42q6.5 5 13 0" fill="none" stroke="${P.ink}" stroke-width="3" stroke-linecap="round"/>`,
      wink: `<path d="M124 45q7-9 14 0" fill="none" stroke="${P.ink}" stroke-width="3.2" stroke-linecap="round"/>
          <ellipse cx="157" cy="41" rx="6.6" ry="8" fill="${P.white}"/><ellipse cx="158" cy="42" rx="4" ry="5" fill="${P.ink}"/><circle cx="159.6" cy="39.7" r="1.5" fill="${P.white}"/>`
    },
    mouth: {
      closed: `<path d="M140 57q3.2 3.4 6.4 0q3.2 3.4 6.4 0" fill="none" stroke="${P.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
      open: `<g><path d="M140 56.5q6.4 12 12.8 0Z" fill="${P.mouth}" stroke="${P.mouth}" stroke-width="2" stroke-linejoin="round"/><path d="M142.6 62q3.8-3 7.6 0q-3.8 3.2-7.6 0Z" fill="${P.tongue}"/></g>`,
      sad: `<path d="M140 61q6.4-5 12.8 0" fill="none" stroke="${P.ink}" stroke-width="2.2" stroke-linecap="round"/>`,
      o: `<ellipse cx="146.4" cy="60" rx="3.4" ry="4.2" fill="${P.mouth}"/>`,
      flat: `<path d="M141 58.5h11" stroke="${P.ink}" stroke-width="2.2" stroke-linecap="round"/>`
    }
  };
  // Which eyes and mouth each mood uses when drawn statically.
  const MOODS = {
    idle: ["open", "closed"], happy: ["happy", "open"], talk: ["open", "open"], sad: ["sad", "sad"],
    surprised: ["surprised", "o"], sleepy: ["closed", "flat"], wink: ["wink", "closed"], think: ["open", "flat"]
  };

  function ears() {
    return `${soft("M116 32L113 9L134 23Z", P.fur, 7)}${soft("M119 27L118 15L129 22Z", P.earPink, 3)}
      <g class="cat-ear-right" style="transform-origin:156px 26px">${soft("M150 22L170 8L168 33Z", P.fur, 7)}${soft("M155 22L166 14L165 27Z", P.earPink, 3)}</g>`;
  }

  function head({ mood } = {}) {
    let eyes, mouth;
    if (mood) {
      const [e, m] = MOODS[mood] || MOODS.idle;
      eyes = faces.eyes[e];
      mouth = faces.mouth[m];
    } else {
      eyes = `<g class="cat-eyes cat-eyes-open">${faces.eyes.open}</g>
        <g class="cat-eyes cat-eyes-happy">${faces.eyes.happy}</g>
        <g class="cat-eyes cat-eyes-sad">${faces.eyes.sad}</g>`;
      mouth = ["closed", "open", "sad"].map((m) => `<g class="cat-mouth cat-mouth-${m}">${faces.mouth[m]}</g>`).join("");
    }
    return `${ears()}
      ${soft("M113 50L102 55L113 58L105 64L118 62Z", P.furShade, 3)}
      <ellipse cx="140" cy="45.5" rx="30" ry="26" fill="${P.furShade}"/>
      <ellipse cx="141.6" cy="43.6" rx="28.6" ry="24.6" fill="${P.fur}"/>
      <path d="M132 21q1.4 6-1 11M141 19.5v10M150 21q-1.4 6 1 11" stroke="${P.furStripe}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
      <ellipse cx="146" cy="57" rx="14" ry="9.6" fill="${P.creamShade}"/>
      <ellipse cx="146.6" cy="56" rx="13.2" ry="8.8" fill="${P.cream}"/>
      <circle cx="122" cy="55" r="4.6" fill="${P.blush}" opacity=".45"/><circle cx="167" cy="53" r="4" fill="${P.blush}" opacity=".45"/>
      ${eyes}
      ${soft("M142.6 51h7.6l-3.8 3.6Z", P.nose, 2.4)}
      ${mouth}
      <path d="M161 55l13-3M161 58.5l13 1.2M128 58l-12-.6" stroke="${P.furStripe}" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>`;
  }

  // The red scarf, wrapped at the neck; `tail` flutters behind (class hooks for world.css animation).
  function scarf({ x = 0, y = 0 } = {}) {
    return `<g class="cat-scarf" transform="translate(${x} ${y})">
      <path class="cat-scarf-tail" d="M121 70C108 66 99 72 88 66l1.4 10c9.6 5 19-1 30.6 2Z" fill="${P.scarfShade}" style="transform-origin:121px 72px"/>
      ${soft("M118 64q15 8 30 1l1.4 8q-16 8-31.4-1Z", P.scarf, 4)}
      <path d="M93 68l-1 8M99.5 69.4l-1 8" stroke="${P.white}" stroke-width="2.2" stroke-linecap="round"/>
    </g>`;
  }

  /* ---- Pim on his omafiets (facing right, 240×190 box). Legs are solved hip→pedal with two-bone IK. ---- */
  const BIKE = { crank0: Math.PI * 0.3, wheelR: 30, crank: { x: 114, y: 148 }, wheels: [{ x: 58, y: 148 }, { x: 184, y: 148 }], crankR: 15, hipNear: { x: 110, y: 104 }, hipFar: { x: 104, y: 102 }, bone: 27 };
  function leg(hip, foot) {
    const T = BIKE.bone, dx = foot.x - hip.x, dy = foot.y - hip.y;
    const d = Math.min(Math.hypot(dx, dy), T * 2 - 0.5);
    const a = Math.atan2(dy, dx);
    const bend = Math.acos(Math.max(-1, Math.min(1, d / (2 * T))));
    const kx = hip.x + T * Math.cos(a - bend), ky = hip.y + T * Math.sin(a - bend);
    return `M${hip.x} ${hip.y}L${kx.toFixed(1)} ${ky.toFixed(1)}L${foot.x.toFixed(1)} ${foot.y.toFixed(1)}`;
  }
  const pedal = (angle) => ({ x: BIKE.crank.x + BIKE.crankR * Math.cos(angle), y: BIKE.crank.y + BIKE.crankR * Math.sin(angle) });
  function wheel(w, i) {
    const spokes = Array.from({ length: 8 }, (_, k) => {
      const a = (k / 8) * Math.PI, c = Math.cos(a) * 26, s = Math.sin(a) * 26;
      return `<path d="M${(w.x - c).toFixed(1)} ${(w.y - s).toFixed(1)}L${(w.x + c).toFixed(1)} ${(w.y + s).toFixed(1)}"/>`;
    }).join("");
    return `<g class="cat-wheel" data-wheel="${i}">
      <circle cx="${w.x}" cy="${w.y}" r="${BIKE.wheelR}" fill="none" stroke="${P.ink}" stroke-width="8"/>
      <circle cx="${w.x}" cy="${w.y}" r="25.5" fill="none" stroke="#c9d3e6" stroke-width="2.4"/>
      <g class="cat-spokes" stroke="#aab6cc" stroke-width="1.5" style="transform-origin:${w.x}px ${w.y}px">${spokes}</g>
      <circle cx="${w.x}" cy="${w.y}" r="5" fill="${P.ink}"/>
    </g>`;
  }
  // The head as the live rig animates it (cat-head pivots at the neck).
  const riderHead = ({ mood } = {}) => `<g class="cat-head" style="transform-origin:${HEAD.x}px 64px">${head({ mood })}</g>`;
  // `mood` set → a static drawing with one face; unset → all faces for the live, CSS-driven Pim.
  function rider({ mood, crank = BIKE.crank0 } = {}) {
    const C0 = BIKE.crank, near = pedal(crank), far = pedal(crank + Math.PI);
    return `<ellipse class="cat-shadow" cx="121" cy="182" rx="94" ry="6.5" fill="#1f243324"/>
      <g class="cat-rig">
        ${wheel(BIKE.wheels[0], 0)}${wheel(BIKE.wheels[1], 1)}
        <g class="cat-tail" style="transform-origin:92px 106px">
          <path d="M92 106C64 108 52 82 64 62" fill="none" stroke="${P.fur}" stroke-width="10" stroke-linecap="round"/>
          <path d="M64 62c-3 5-4 11-2 16" fill="none" stroke="${P.furStripe}" stroke-width="10" stroke-linecap="round"/>
        </g>
        <path class="cat-leg-far" d="${leg(BIKE.hipFar, far)}" fill="none" stroke="${P.furShade}" stroke-width="10.5" stroke-linecap="round" stroke-linejoin="round"/>
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 140A36 36 0 0 1 86 122" stroke="${P.bikeShade}" stroke-width="5"/>
          <path d="M154 124A36 36 0 0 1 216 138" stroke="${P.bikeShade}" stroke-width="5"/>
          <g stroke="${P.bikeShade}" stroke-width="8" transform="translate(-1.5 1.5)"><path d="M58 148L114 148M58 148L100 102M114 148L99 94M114 148Q152 138 168 104M168 104L184 148"/></g>
          <g stroke="${P.bike}" stroke-width="7.5">
            <path d="M58 148L114 148M58 148L100 102M114 148L99 94M114 148Q152 138 168 104M168 104L162 84"/>
            <path d="M168 104L184 148" stroke-width="6.5"/>
            <path d="M162 84L157 70" stroke-width="5.5"/>
          </g>
          <path d="M157 70Q150 64 140 69" stroke="${P.ink}" stroke-width="5.5"/>
          <circle cx="${C0.x}" cy="${C0.y}" r="9" stroke="${P.ink}" stroke-width="3.4"/>
        </g>
        <g class="cat-basket">
          <path d="M184 56c-2-12 2-22 6-28M196 56c0-10 4-18 10-24" stroke="#3dc25d" stroke-width="3" fill="none" stroke-linecap="round"/>
          ${soft("M184 30c-6-2-7-10-3-14 2 3 4 2 4 0 2 2 4 3 5 0 3 5 1 12-6 14Z", P.scarf, 2)}
          ${soft("M207 30c-6 0-9-7-6-12 2 2 4 2 4-1 3 2 5 2 6-1 2 6-1 13-4 14Z", "#ffc23d", 2)}
          ${soft("M166 58h48l-6 28h-36Z", "#bb7c37", 4).replace("<path", '<path transform="translate(-2 2)"')}
          ${soft("M168 58h46l-6 28h-34Z", "#e0a45c", 4)}
          <path d="M172 67h39M174 76h35M184 58l1 28M197 58l-1 28" stroke="#bb7c37" stroke-width="1.8"/>
        </g>
        ${soft("M84 90q13-6 26 0l-3 5H87Z", P.ink, 3)}
        <g class="cat-crank" style="transform-origin:${C0.x}px ${C0.y}px">
          <path d="M${C0.x} ${C0.y}L${near.x.toFixed(1)} ${near.y.toFixed(1)}M${C0.x} ${C0.y}L${far.x.toFixed(1)} ${far.y.toFixed(1)}" stroke="#56607a" stroke-width="4.5" stroke-linecap="round"/>
        </g>
        <g class="cat-body">
          <ellipse cx="112.5" cy="86" rx="23" ry="27" transform="rotate(-22 112.5 86)" fill="${P.furShade}"/>
          <ellipse cx="114.2" cy="84.4" rx="21.4" ry="25.4" transform="rotate(-22 114.2 84.4)" fill="${P.fur}"/>
          <ellipse cx="122" cy="90" rx="11" ry="16" transform="rotate(-22 122 90)" fill="${P.cream}"/>
          <path d="M99 72q5 3 4 9M94 82q5 2 5 8" stroke="${P.furStripe}" stroke-width="3.2" stroke-linecap="round" fill="none"/>
          ${scarf()}
        </g>
        <g class="cat-arm" style="transform-origin:128px 74px">
          <path d="M128 74Q137 78 141 70" fill="none" stroke="${P.fur}" stroke-width="10" stroke-linecap="round"/>
          <circle cx="142" cy="69.5" r="6" fill="${P.cream}"/>
        </g>
        ${riderHead({ mood })}
        ${mood ? "" : `<g class="cat-zzz" fill="#2b6bff" font-weight="900" font-family="system-ui,sans-serif"><text x="172" y="22" font-size="13">z</text><text x="184" y="8" font-size="18">z</text></g>`}
        <path class="cat-leg-near" d="${leg(BIKE.hipNear, near)}" fill="none" stroke="${P.fur}" stroke-width="10.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle class="cat-foot-near" cx="${near.x.toFixed(1)}" cy="${near.y.toFixed(1)}" r="6" fill="${P.cream}"/>
      </g>`;
  }
  // The head-only crop used for avatars, the logo and the launch screen.
  const FACE_BOX = { x: 100, y: 2, w: 78, h: 72 };

  return { P, HEAD, HEAD_TOP, EYES, MOODS, soft, shadeOf, head, scarf, BIKE, leg, pedal, rider, riderHead, FACE_BOX };
});
