/* The Pim art kit: palette, Pim in poses, people, a stage, speech bubbles and small helpers.
   Style rules (see visual-lab.html): flat fills, no outlines; one hard shade per shape (a darker copy
   offset down-left); round joins everywhere; ink (#1f2433) only for faces, symbols and fine detail. */
(function (root, factory) {
  const kit = factory(typeof module === "object" && module.exports ? require("../pim-parts.js") : root.NU.pimParts);
  if (typeof module === "object" && module.exports) module.exports = kit;
  else root.PimArt = kit;
})(typeof self !== "undefined" ? self : this, (parts) => {
  const { P, soft } = parts;

  const C = {
    ...P,
    oranje: "#ff7a1a", oranjeDark: "#d9580a", oranjeSoft: "#ffe8d6",
    blue: "#2b6bff", blueDark: "#1a4ed1", blueSoft: "#dfeaff", sky: "#bfe3ff",
    green: "#3dc25d", greenDark: "#26963f", greenSoft: "#dcf5e2", leaf: "#58c96e",
    red: "#ff4d4d", redDark: "#d63434", redSoft: "#ffe1e1",
    yellow: "#ffc23d", yellowDark: "#e09b00", yellowSoft: "#fff1cc",
    purple: "#8a5cff", purpleDark: "#6a3fe0", purpleSoft: "#ece4ff",
    pink: "#ff5ca8", pinkSoft: "#ffe0ef",
    teal: "#1fb5a8", tealDark: "#138a80",
    brown: "#b9773d", brownDark: "#8f5426", wood: "#e0a45c", woodDark: "#bb7c37",
    grey: "#c9cfdb", greyDark: "#9aa3b5", greyLight: "#eef1f6", paper: "#fffdf8",
    brick: "#e8694f", brickDark: "#c44e36",
    shadow: "#1f243322"
  };

  const SKIN = [
    ["#f6d2b4", "#e5b38e"], ["#e8b48a", "#d1966a"], ["#c98a5c", "#ad6f43"], ["#9c6440", "#7f4c2d"], ["#6e4329", "#56321d"]
  ];
  const HAIR = { black: "#2a2230", brown: "#5b3a24", blond: "#e8b84a", grey: "#b8bcc8", red: "#c8552a" };

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const n = (v) => +(+v).toFixed(1);
  const g = (inner, { x = 0, y = 0, s = 1, r = 0, flip = false, o } = {}) => {
    const t = [];
    if (x || y) t.push(`translate(${n(x)} ${n(y)})`);
    if (r) t.push(`rotate(${n(r)})`);
    if (s !== 1 || flip) t.push(`scale(${flip ? -s : s} ${s})`);
    return `<g${t.length ? ` transform="${t.join(" ")}"` : ""}${o != null ? ` opacity="${o}"` : ""}>${inner}</g>`;
  };
  // A flat shape with its hard shade: the shade copy sits `dx,dy` down-left underneath.
  const shaded = (shape, fill, shade, { dx = -2.5, dy = 2.5 } = {}) =>
    `<g transform="translate(${dx} ${dy})">${shape(shade)}</g>${shape(fill)}`;
  const ell = (cx, cy, rx, ry, fill, extra = "") => `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${fill}"${extra}/>`;
  const circ = (cx, cy, r, fill, extra = "") => `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}"${extra}/>`;
  const rect = (x, y, w, h, rx, fill, extra = "") => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" rx="${n(rx)}" fill="${fill}"${extra}/>`;
  const line = (d, stroke, w = 3, extra = "") => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${extra}/>`;
  const box = (x, y, w, h, rx, fill, shade, d = 4) => rect(x - d * 0.6, y + d, w, h, rx, shade) + rect(x, y, w, h, rx, fill);
  const text = (x, y, str, { size = 28, fill = C.ink, weight = 900, anchor = "middle", family = "latin" } = {}) => {
    const fam = family === "urdu" ? "'Noto Nastaliq Urdu','Noto Naskh Arabic',serif" : "'Nunito','Arial Rounded MT Bold','DM Sans',system-ui,sans-serif";
    return `<text x="${n(x)}" y="${n(y)}" font-family="${fam}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(str)}</text>`;
  };
  const groundShadow = (cx, cy, rx, ry = rx * 0.14) => ell(cx, cy, rx, ry, C.shadow);

  // An arm: a soft curve from shoulder to paw/hand; `bend` pushes the elbow sideways.
  function limb(sx, sy, hx, hy, { color, w = 9, bend = 0, hand, handR = 5.4 }) {
    const mx = (sx + hx) / 2, my = (sy + hy) / 2;
    const len = Math.hypot(hx - sx, hy - sy) || 1;
    const cx = mx + (-(hy - sy) / len) * bend, cy = my + ((hx - sx) / len) * bend;
    return line(`M${n(sx)} ${n(sy)}Q${n(cx)} ${n(cy)} ${n(hx)} ${n(hy)}`, color, w) + (hand ? circ(hx, hy, handR, hand) : "");
  }

  /* ---------------- Pim, standing / sitting / lying ----------------
     Pim space: feet rest on y=124 around x=140, facing right. pim() re-anchors so (x,y) is the feet. */
  const ARMS = {
    rest: { far: [118, 104, 4], near: [161, 104, -4] },
    wave: { far: [118, 104, 4], near: [172, 54, -10] },
    point: { far: [118, 104, 4], near: [182, 78, 6] },
    pointUp: { far: [118, 104, 4], near: [166, 46, -4] },
    cheer: { far: [112, 52, -8], near: [172, 52, 8] },
    hold: { far: [118, 104, 4], near: [164, 92, -8] },
    holdBoth: { far: [134, 96, -6], near: [160, 96, -6] },
    holdUp: { far: [118, 104, 4], near: [170, 62, -10] },
    think: { far: [118, 104, 4], near: [154, 70, -14] },
    phone: { far: [118, 104, 4], near: [166, 48, -12] },
    shrug: { far: [108, 78, 10], near: [176, 78, -10] },
    hips: { far: [122, 102, 14], near: [158, 102, -14] },
    stop: { far: [118, 104, 4], near: [180, 66, 4] },
    cover: { far: [134, 52, -14], near: [158, 52, -14] },
    belly: { far: [134, 100, -6], near: [154, 102, -6] },
    head: { far: [124, 30, -12], near: [158, 26, -12] },
    give: { far: [118, 104, 4], near: [180, 92, 4] },
    hug: { far: [124, 92, 0], near: [168, 94, -14] }
  };

  function pimBody({ pose = "stand", arms = "rest", mood = "idle", hold, holdAt = "near", tail = true, scarf = true, legs = "stand" }) {
    const a = typeof arms === "string" ? ARMS[arms] || ARMS.rest : arms;
    const farArm = limb(126, 82, a.far[0], a.far[1], { color: P.furShade, w: 9.5, bend: a.far[2], hand: P.creamShade });
    const nearArm = limb(154, 82, a.near[0], a.near[1], { color: P.fur, w: 10, bend: a.near[2], hand: P.cream, handR: 5.8 });
    const handPos = holdAt === "far" ? a.far : holdAt === "mid" ? [(a.far[0] + a.near[0]) / 2, (a.far[1] + a.near[1]) / 2] : a.near;
    const held = hold ? g(hold, { x: handPos[0], y: handPos[1] }) : "";
    const tailSvg = tail ? line("M120 112C98 114 90 90 104 76", P.fur, 10) + line("M104 76q-4 5-3.4 10", P.furStripe, 10) : "";
    let legSvg;
    if (legs === "walk") legSvg = limb(134, 112, 124, 124, { color: P.furShade, w: 10, bend: 3 }) + ell(122, 124, 8, 4.4, P.creamShade) + limb(148, 112, 158, 123, { color: P.fur, w: 10, bend: -3 }) + ell(161, 123, 8, 4.4, P.cream);
    else if (legs === "sit") legSvg = ell(130, 118, 12, 8, P.furShade) + ell(156, 120, 12, 7.6, P.fur) + ell(166, 122, 7, 4.2, P.cream) + ell(140, 122, 7, 4.2, P.creamShade);
    else legSvg = ell(130, 118, 7.6, 8, P.furShade) + ell(151, 118, 7.6, 8, P.fur) + ell(128, 122.5, 8.4, 4.4, P.creamShade) + ell(153, 122.5, 8.4, 4.4, P.cream);
    const body = ell(139.4, 97, 22, 25, P.furShade) + ell(141, 95.4, 20.6, 23.6, P.fur) + ell(146, 100, 11, 15, P.cream) +
      line("M128 84q4 3 3 9M124 93q4 2 4 8", P.furStripe, 3);
    const lift = pose === "sit" ? "translate(0 6)" : "";
    return `${tailSvg}${farArm}${legSvg}<g transform="${lift}">${body}</g>${scarf ? parts.scarf({ y: 0 }) : ""}${parts.head({ mood })}${held}${nearArm}`;
  }

  function pim({ x = 120, y = 200, s = 1, flip = false, ...opts } = {}) {
    if (opts.pose === "sleep") return g(pimSleeping(opts), { x, y, s, flip });
    return g(`<g transform="translate(-140 -124)">${pimBody(opts)}</g>`, { x, y, s, flip });
  }

  // Curled up asleep, anchored at the middle of its base.
  function pimSleeping({ zzz = true } = {}) {
    const headSvg = `<g transform="translate(-118 -70) scale(.82) rotate(-8 140 44)">${parts.head({ mood: "sleepy" })}</g>`;
    return line("M-40 -8C-58 -2 -54 14 -30 12", P.fur, 11) +
      ell(-2, -22, 46, 24, P.furShade) + ell(0, -24, 44, 22, P.fur) + line("M-16 -40q3 5 1 10M-4 -43v9M8 -42q-2 5 0 10", P.furStripe, 3.4) +
      ell(-28, -4, 11, 6, P.cream) + headSvg +
      (zzz ? text(52, -60, "z", { size: 18, fill: C.blue }) + text(66, -78, "z", { size: 24, fill: C.blue }) : "");
  }

  /* ---------------- People ----------------
     Feet at (0,0), about 165 tall (kids ~118), chunky like Pim. Arm targets are relative to the feet,
     tuned for adults; kids squash them. Pose names match Pim's. */
  const PARMS = {
    rest: { far: [-27, -50, 4], near: [27, -50, -4] },
    wave: { far: [-27, -50, 4], near: [40, -138, -10] },
    point: { far: [-27, -50, 4], near: [56, -92, 4] },
    pointUp: { far: [-27, -50, 4], near: [30, -150, -4] },
    cheer: { far: [-40, -140, 10], near: [40, -140, -10] },
    hold: { far: [-27, -50, 4], near: [24, -72, -12] },
    holdBoth: { far: [-8, -70, -10], near: [16, -70, -10] },
    holdUp: { far: [-27, -50, 4], near: [36, -122, -10] },
    think: { far: [-27, -50, 4], near: [10, -106, -18] },
    phone: { far: [-27, -50, 4], near: [22, -124, -16] },
    shrug: { far: [-46, -92, 12], near: [46, -92, -12] },
    hips: { far: [-24, -64, 18], near: [24, -64, -18] },
    stop: { far: [-27, -50, 4], near: [54, -106, 4] },
    cover: { far: [-10, -132, -14], near: [14, -132, -14] },
    belly: { far: [-8, -64, -10], near: [10, -62, -10] },
    head: { far: [-16, -150, -14], near: [20, -152, -14] },
    give: { far: [-27, -50, 4], near: [54, -76, 4] },
    hug: { far: [12, -80, -8], near: [36, -78, -16] },
    cross: { far: [14, -80, -8], near: [-14, -80, 8] }
  };

  function personFace({ mood = "idle", skin, hx, hy, r }) {
    const ink = C.ink;
    const ey = hy + r * 0.08, ex = r * 0.36;
    const dot = (x) => ell(x, ey, r * 0.11, r * 0.14, ink) + circ(x + r * 0.04, ey - r * 0.05, r * 0.04, "#fff");
    const arc = (x, up = true) => `M${n(x - r * 0.13)} ${n(ey + (up ? 1 : 0))}q${n(r * 0.13)} ${n(up ? -r * 0.17 : r * 0.13)} ${n(r * 0.26)} 0`;
    let eyes = dot(hx - ex) + dot(hx + ex);
    const my = hy + r * 0.48;
    let mouth = line(`M${n(hx - r * 0.2)} ${n(my)}q${n(r * 0.2)} ${n(r * 0.16)} ${n(r * 0.4)} 0`, ink, 2.4);
    if (mood === "happy") { eyes = line(arc(hx - ex) + arc(hx + ex), ink, 2.6); mouth = `<path d="M${n(hx - r * 0.24)} ${n(my - 2)}q${n(r * 0.24)} ${n(r * 0.36)} ${n(r * 0.48)} 0Z" fill="${P.mouth}" stroke="${P.mouth}" stroke-width="1.6" stroke-linejoin="round"/>`; }
    if (mood === "talk") mouth = ell(hx, my, r * 0.14, r * 0.12, P.mouth);
    if (mood === "sad") { mouth = line(`M${n(hx - r * 0.18)} ${n(my + 2)}q${n(r * 0.18)} ${n(-r * 0.14)} ${n(r * 0.36)} 0`, ink, 2.4); eyes += line(`M${n(hx - ex - r * 0.2)} ${n(ey - r * 0.26)}l${n(r * 0.24)} ${n(-r * 0.08)}M${n(hx + ex + r * 0.2)} ${n(ey - r * 0.26)}l${n(-r * 0.24)} ${n(-r * 0.08)}`, ink, 2); }
    if (mood === "surprised") { mouth = ell(hx, my + 1, r * 0.11, r * 0.15, P.mouth); }
    if (mood === "sleepy" || mood === "sick") { eyes = line(arc(hx - ex, false) + arc(hx + ex, false), ink, 2.4); mouth = mood === "sick" ? line(`M${n(hx - r * 0.2)} ${n(my + 2)}q${n(r * 0.1)}-3 ${n(r * 0.2)} 0q${n(r * 0.1)} 3 ${n(r * 0.2)} 0`, ink, 2.2) : line(`M${n(hx - r * 0.1)} ${n(my)}h${n(r * 0.2)}`, ink, 2.2); }
    if (mood === "angry") { mouth = line(`M${n(hx - r * 0.18)} ${n(my + 2)}q${n(r * 0.18)} ${n(-r * 0.14)} ${n(r * 0.36)} 0`, ink, 2.4); eyes += line(`M${n(hx - ex - r * 0.2)} ${n(ey - r * 0.32)}l${n(r * 0.26)} ${n(r * 0.1)}M${n(hx + ex + r * 0.2)} ${n(ey - r * 0.32)}l${n(-r * 0.26)} ${n(r * 0.1)}`, ink, 2.4); }
    const blushOp = mood === "sick" ? ' opacity=".7"' : ' opacity=".4"';
    const blush = circ(hx - r * 0.6, hy + r * 0.34, r * 0.15, mood === "sick" ? "#9ccf6a" : P.blush, blushOp) + circ(hx + r * 0.6, hy + r * 0.34, r * 0.15, mood === "sick" ? "#9ccf6a" : P.blush, blushOp);
    const nose = line(`M${n(hx + r * 0.04)} ${n(hy + r * 0.16)}q${n(r * 0.1)} ${n(r * 0.12)} ${n(-r * 0.04)} ${n(r * 0.18)}`, skin[1], 2.2);
    return blush + eyes + nose + mouth;
  }

  function hairBack(style, color, hx, hy, r) {
    if (style === "long") return `<path d="M${n(hx - r - 3)} ${n(hy - r * 0.2)}Q${n(hx - r - 6)} ${n(hy + r * 1.6)} ${n(hx - r * 0.6)} ${n(hy + r * 1.8)}H${n(hx + r * 0.6)}Q${n(hx + r + 6)} ${n(hy + r * 1.6)} ${n(hx + r + 3)} ${n(hy - r * 0.2)}Z" fill="${color}"/>`;
    if (style === "bun") return circ(hx - r * 0.15, hy - r * 1.05, r * 0.45, color);
    if (style === "ponytail") return `<path d="M${n(hx - r * 0.8)} ${n(hy - r * 0.5)}Q${n(hx - r * 1.9)} ${n(hy + r * 0.2)} ${n(hx - r * 1.3)} ${n(hy + r * 1.3)}Q${n(hx - r * 1.1)} ${n(hy + r * 0.4)} ${n(hx - r * 0.5)} ${n(hy)}Z" fill="${color}"/>`;
    return "";
  }
  function hairFront(style, color, hx, hy, r) {
    // A cap of hair over the top of the head with a side-swept fringe.
    const top = `<path d="M${n(hx - r - 1)} ${n(hy + r * 0.15)}A${n(r + 1)} ${n(r + 1)} 0 0 1 ${n(hx + r + 1)} ${n(hy + r * 0.05)}Q${n(hx + r * 0.6)} ${n(hy - r * 0.5)} ${n(hx - r * 0.1)} ${n(hy - r * 0.42)}Q${n(hx - r * 0.6)} ${n(hy - r * 0.1)} ${n(hx - r - 1)} ${n(hy + r * 0.15)}Z" fill="${color}"/>`;
    if (style === "bald") return `<path d="M${n(hx - r * 0.98)} ${n(hy + r * 0.1)}q-1 ${n(-r * 0.4)} ${n(r * 0.2)} ${n(-r * 0.6)}M${n(hx + r * 0.98)} ${n(hy + r * 0.1)}q1 ${n(-r * 0.4)} ${n(-r * 0.2)} ${n(-r * 0.6)}" stroke="${color}" stroke-width="${n(r * 0.26)}" stroke-linecap="round" fill="none"/>`;
    if (style === "curly") return [...Array(8)].map((_, i) => { const a = Math.PI * (1.02 + (i / 7) * 0.96); return circ(hx + Math.cos(a) * r * 0.92, hy + Math.sin(a) * r * 0.92, r * 0.34, color); }).join("") + circ(hx, hy - r * 0.62, r * 0.42, color);
    if (style === "spiky") return top + `<path d="M${n(hx - r * 0.8)} ${n(hy - r * 0.6)}l${n(r * 0.1)} ${n(-r * 0.62)} ${n(r * 0.36)} ${n(r * 0.3)} ${n(r * 0.22)} ${n(-r * 0.5)} ${n(r * 0.34)} ${n(r * 0.42)} ${n(r * 0.4)} ${n(-r * 0.34)} ${n(r * 0.06)} ${n(r * 0.7)}Z" fill="${color}"/>`;
    if (style === "long" || style === "ponytail" || style === "bun")
      return `<path d="M${n(hx - r - 1)} ${n(hy + r * 0.3)}A${n(r + 1)} ${n(r + 1)} 0 0 1 ${n(hx + r + 1)} ${n(hy + r * 0.3)}Q${n(hx + r * 0.4)} ${n(hy - r * 0.6)} ${n(hx - r * 0.2)} ${n(hy - r * 0.5)}Q${n(hx - r * 0.7)} ${n(hy - r * 0.2)} ${n(hx - r - 1)} ${n(hy + r * 0.3)}Z" fill="${color}"/>`;
    return top;
  }

  function person({
    x = 120, y = 210, s = 1, flip = false, kid = false, skin = 1, hair = "black", hairStyle = "short", hijab, beard, glasses,
    top = C.blue, bottom = "#3a4766", bottomType = "pants", shoes = "#2a2f45", mood = "idle", arms = "rest",
    hold, holdAt = "near", coat, hat, extra = "", walk = false, sit = false, holdBehind = false
  } = {}) {
    const sk = SKIN[skin] || SKIN[1];
    const r = kid ? 23 : 25.5;
    const hipY = kid ? -30 : -46, shoulderY = kid ? -64 : -98, hy = shoulderY - r - 4;
    const tw = kid ? 16 : 20, legW = kid ? 11 : 13;
    const tShade = shadeOf(top);
    const a = typeof arms === "string" ? PARMS[arms] || PARMS.rest : arms;
    const fit = ([ax, ay, b]) => kid ? [ax * 0.82, shoulderY + (ay + 98) * 0.62, b * 0.8] : [ax, ay, b];
    const af = fit(a.far), an = fit(a.near);
    const hairCol = HAIR[hair] || hair;
    const sleeve = coat || top;
    const shY = shoulderY + 9;
    const farArm = limb(-tw + 4, shY, af[0], af[1], { color: shadeOf(sleeve), w: kid ? 10 : 12, bend: af[2], hand: sk[1], handR: kid ? 5.4 : 6.2 });
    const nearArm = limb(tw - 4, shY, an[0], an[1], { color: sleeve, w: kid ? 10 : 12, bend: an[2], hand: sk[0], handR: kid ? 5.6 : 6.4 });
    const handPos = holdAt === "far" ? af : holdAt === "mid" ? [(af[0] + an[0]) / 2, (af[1] + an[1]) / 2] : an;
    const held = hold ? g(hold, { x: handPos[0], y: handPos[1] }) : "";
    const foot = (fx, col) => ell(fx, -3.5, kid ? 8.5 : 10, kid ? 4.6 : 5.2, col);
    const bShade = shadeOf(bottom);
    let legs;
    if (sit) legs = line(`M-8 ${hipY}H${tw + 14}V-6`, bShade, legW) + line(`M6 ${hipY}H${tw + 24}V-6`, bottom, legW) + foot(tw + 18, shoes) + foot(tw + 28, shoes);
    else if (walk) legs = line(`M-6 ${hipY}L-17 -6`, bShade, legW) + line(`M6 ${hipY}L16 -6`, bottom, legW) + foot(-20, shoes) + foot(20, shoes);
    else legs = line(`M-7 ${hipY}V-6`, bShade, legW) + line(`M7 ${hipY}V-6`, bottom, legW) + foot(-9, shoes) + foot(10, shoes);
    const torsoD = `M${-tw} ${shoulderY + 4}Q${-tw} ${shoulderY - 3} ${-tw + 8} ${shoulderY - 3}H${tw - 8}Q${tw} ${shoulderY - 3} ${tw} ${shoulderY + 4}L${tw + 3} ${hipY + 4}H${-tw - 3}Z`;
    if (bottomType === "skirt" || bottomType === "long") {
      const hem = bottomType === "long" ? -6 : hipY + (kid ? 20 : 30);
      const skirt = `<path d="M${-tw} ${hipY}H${tw}L${tw + 8} ${hem}H${-tw - 8}Z" fill="${bottom}" stroke="${bottom}" stroke-width="5" stroke-linejoin="round"/>`;
      legs = (bottomType === "skirt" ? line(`M-7 ${hipY}V-6`, sk[1], 8) + line(`M7 ${hipY}V-6`, sk[0], 8) : "") + foot(-9, shoes) + foot(10, shoes) + skirt;
    }
    const torso = `<path d="${torsoD}" fill="${tShade}" stroke="${tShade}" stroke-width="6" stroke-linejoin="round" transform="translate(-2.5 2.5)"/><path d="${torsoD}" fill="${top}" stroke="${top}" stroke-width="6" stroke-linejoin="round"/>`;
    const coatD = `M${-tw - 2} ${shoulderY + 3}Q${-tw - 2} ${shoulderY - 4} ${-tw + 7} ${shoulderY - 4}H${tw - 7}Q${tw + 2} ${shoulderY - 4} ${tw + 2} ${shoulderY + 3}L${tw + 6} ${hipY + 18}H${-tw - 6}Z`;
    const coatSvg = coat ? `<path d="${coatD}" fill="${coat}" stroke="${coat}" stroke-width="5" stroke-linejoin="round"/>` +
      `<path d="M-9 ${shoulderY - 4}L0 ${shoulderY + 16}L9 ${shoulderY - 4}Z" fill="${top}"/>` + line(`M0 ${shoulderY + 18}V${hipY + 16}`, shadeOf(coat, 0.85), 2) : "";
    const neck = rect(-6, shoulderY - 10, 12, 12, 5, sk[1]);
    let headSvg = circ(-2, hy + 2, r, sk[1]) + circ(0, hy, r, sk[0]) + ell(r * 0.96, hy + 3, r * 0.17, r * 0.22, sk[1]);
    let faceX = 2, faceY = hy, faceR = r;
    if (hijab) {
      const hs = shadeOf(hijab);
      const hood = (dx, dy, c) => `<path d="M${n(-r - 7 + dx)} ${n(hy + 2 + dy)}A${n(r + 7)} ${n(r + 8)} 0 0 1 ${n(r + 7 + dx)} ${n(hy + 2 + dy)}V${n(hy + r * 0.9 + dy)}Q${n(r + 4 + dx)} ${n(shoulderY + 12 + dy)} ${n(r * 0.6 + dx)} ${n(shoulderY + 14 + dy)}H${n(-r * 0.6 + dx)}Q${n(-r - 4 + dx)} ${n(shoulderY + 12 + dy)} ${n(-r - 7 + dx)} ${n(hy + r * 0.9 + dy)}Z" fill="${c}"/>`;
      headSvg = hood(-2.5, 2.5, hs) + hood(0, 0, hijab) + ell(2, hy + 3, r * 0.76, r * 0.82, sk[0]);
      faceX = 2; faceY = hy + 3; faceR = r * 0.8;
    }
    const face = personFace({ mood, skin: sk, hx: faceX, hy: faceY, r: faceR });
    const beardSvg = beard ? `<path d="M${n(-r * 0.86)} ${n(hy + r * 0.1)}Q${n(-r * 0.7)} ${n(hy + r * 1.22)} ${n(2)} ${n(hy + r * 1.2)}Q${n(r * 0.86)} ${n(hy + r * 1.1)} ${n(r * 0.92)} ${n(hy + r * 0.1)}Q${n(r * 0.7)} ${n(hy + r * 0.5)} ${n(r * 0.36)} ${n(hy + r * 0.5)}Q2 ${n(hy + r * 0.34)} ${n(-r * 0.32)} ${n(hy + r * 0.5)}Q${n(-r * 0.7)} ${n(hy + r * 0.5)} ${n(-r * 0.86)} ${n(hy + r * 0.1)}Z" fill="${HAIR[beard] || hairCol}"/>` : "";
    const glassesSvg = glasses ? `<g fill="none" stroke="${C.ink}" stroke-width="2.2">${circ(2 - r * 0.36, hy + r * 0.08, r * 0.22, "none")}${circ(2 + r * 0.36, hy + r * 0.08, r * 0.22, "none")}<path d="M${n(2 - r * 0.14)} ${n(hy + r * 0.05)}h${n(r * 0.28)}"/></g>` : "";
    const hatSvg = hat === "cap" ? `<path d="M${n(-r - 1)} ${n(hy - 2)}A${n(r + 1)} ${n(r)} 0 0 1 ${n(r + 1)} ${n(hy - 2)}Z" fill="${C.oranje}"/>` + rect(r - 8, hy - 6, 22, 6, 3, C.oranjeDark)
      : hat === "helmet" ? `<path d="M${n(-r - 3)} ${n(hy - 1)}A${n(r + 3)} ${n(r + 2)} 0 0 1 ${n(r + 3)} ${n(hy - 1)}Z" fill="${C.yellow}"/>` + rect(-r - 7, hy - 5, 2 * r + 14, 6, 3, C.yellowDark) + rect(-3, hy - r - 4, 6, r, 3, C.yellowDark)
      : hat === "nurse" ? rect(-r * 0.7, hy - r - 4, r * 1.4, r * 0.55, 4, "#fff") + `<path d="M-3 ${n(hy - r + 1)}h6M0 ${n(hy - r - 2)}v6" stroke="${C.red}" stroke-width="2.6" stroke-linecap="round"/>`
      : "";
    const hairB = hijab ? "" : hairBack(hairStyle, hairCol, 0, hy, r);
    const hairF = hijab ? "" : hat === "cap" || hat === "helmet" ? "" : hairFront(hairStyle, hairCol, 0, hy, r);
    const back = holdBehind ? held : "";
    return g(`${back}${hairB}${farArm}${legs}${torso}${coatSvg}${neck}${headSvg}${hairF}${beardSvg}${face}${glassesSvg}${hatSvg}${extra}${holdBehind ? "" : held}${nearArm}`, { x, y, s, flip });
  }

  const { shadeOf } = parts;
  function tint(hex, k = 0.85) {
    const h = String(hex).replace("#", "");
    const c = [0, 2, 4].map((i) => Math.round(parseInt(h.slice(i, i + 2), 16) + (255 - parseInt(h.slice(i, i + 2), 16)) * k));
    return `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  }

  /* ---------------- Stage, bubbles, signs ---------------- */
  const KIND_TINT = {
    object: C.blue, person: C.yellow, body: C.pink, action: C.green, situation: C.oranje,
    foundation: C.purple, place: C.teal, scene: C.blue
  };
  // The square card every word picture sits on: warm paper, a soft blob in the kind's colour, a floor.
  function stage(kind = "object", { floor = true, sky } = {}) {
    const t = KIND_TINT[kind] || C.blue;
    return rect(0, 0, 240, 240, 0, sky || C.paper) +
      `<path d="M120 26c52 0 92 30 92 84s-38 96-92 96-94-34-94-90 42-90 94-90Z" fill="${tint(t, 0.82)}"/>` +
      circ(42, 52, 5, tint(t, 0.6)) + circ(204, 70, 4, tint(t, 0.6)) + circ(196, 192, 6, tint(t, 0.7)) +
      (floor ? ell(120, 204, 86, 9, C.shadow) : "");
  }
  function card(kind, body, opts = {}) {
    return svg(240, 240, stage(kind, opts) + body, opts.title);
  }
  function svg(w, h, inner, title) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"${title ? ` role="img" aria-label="${esc(title)}"` : ""}>${inner}</svg>`;
  }

  function bubble(x, y, w, h, inner = "", { tail = "left", fill = "#fff", shade = C.grey } = {}) {
    const tx = tail === "left" ? x + 16 : tail === "right" ? x + w - 16 : x + w / 2;
    const tailPath = (dy) => `<path d="M${n(tx - 8)} ${n(y + h - 2 + dy)}l${tail === "right" ? 14 : 2} 14 ${tail === "right" ? 0 : 12}-14Z" fill="${dy ? shade : fill}"/>`;
    return rect(x - 2, y + 3, w, h, Math.min(16, h / 2), shade) + tailPath(3) + rect(x, y, w, h, Math.min(16, h / 2), fill) + tailPath(0) + inner;
  }
  function thought(x, y, w, h, inner = "") {
    return circ(x + 10, y + h + 14, 4, "#fff") + circ(x + 20, y + h + 5, 6, "#fff") + rect(x, y, w, h, h / 2, "#fff") + inner;
  }

  // Small symbols used across words: tick, cross, heart, star, arrows, sparkle, sweat drop, ...
  const sym = {
    check: (x, y, s = 1, c = C.green) => g(circ(0, 0, 16, c) + line("M-7 0l5 5 9-10", "#fff", 4.4), { x, y, s }),
    cross: (x, y, s = 1, c = C.red) => g(circ(0, 0, 16, c) + line("M-6-6l12 12M6-6l-12 12", "#fff", 4.4), { x, y, s }),
    ban: (x, y, s = 1) => g(circ(0, 0, 22, C.red) + circ(0, 0, 16, "#fff") + line("M-11 11L11-11", C.red, 6), { x, y, s }),
    heart: (x, y, s = 1, c = C.red) => g(`<path d="M0 8C-14-2-12-14-5-14c3 0 5 2 5 4 0-2 2-4 5-4 7 0 9 12-5 22Z" fill="${c}"/>`, { x, y, s }),
    star: (x, y, s = 1, c = C.yellow) => g(`<path d="M0-12l3.6 7.4 8.2 1.2-6 5.8 1.4 8.2L0 6.7l-7.2 3.9 1.4-8.2-6-5.8 8.2-1.2Z" fill="${c}" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>`, { x, y, s }),
    sparkle: (x, y, s = 1, c = C.yellow) => g(`<path d="M0-10Q1-1 10 0Q1 1 0 10Q-1 1-10 0Q-1-1 0-10Z" fill="${c}"/>`, { x, y, s }),
    drop: (x, y, s = 1, c = "#7cc8ff") => g(`<path d="M0-9C3-4 6-1 6 3a6 6 0 0 1-12 0c0-4 3-7 6-12Z" fill="${c}"/>`, { x, y, s }),
    arrow: (x, y, s = 1, r = 0, c = C.blue) => g(`<path d="M-16-6h14v-9l17 15-17 15v-9h-14Z" fill="${c}" stroke="${c}" stroke-width="4" stroke-linejoin="round"/>`, { x, y, s, r }),
    question: (x, y, s = 1, c = C.purple) => g(circ(0, 0, 16, c) + text(0, 8, "?", { size: 24, fill: "#fff" }), { x, y, s }),
    exclaim: (x, y, s = 1, c = C.red) => g(circ(0, 0, 16, c) + text(0, 8, "!", { size: 24, fill: "#fff" }), { x, y, s }),
    motion: (x, y, s = 1, c = C.greyDark) => g(line("M0 0h-16M2 10h-22M0 20h-14", c, 3.4), { x, y, s }),
    waves: (x, y, s = 1, c = C.blue) => g(line("M0-10q6 10 0 20M8-16q10 16 0 32", c, 3.6), { x, y, s }),
    music: (x, y, s = 1, c = C.purple) => g(line("M0 0v-18l10-3v16", c, 3) + ell(-3, 1, 4, 3, c) + ell(7, -3, 4, 3, c), { x, y, s })
  };

  return { C, P, SKIN, HAIR, parts, g, shaded, ell, circ, rect, line, box, text, soft, limb, groundShadow, pim, person, shadeOf, tint, stage, card, svg, bubble, thought, sym, esc, n, ARMS, PARMS, KIND_TINT };
});
