/* Props for the Pim art kit. Each prop is drawn around (0,0) inside roughly ±48 and takes an options
   object; words place them with K.g(prop, { x, y, s, r }). Same style rules as the kit: flat fills,
   one hard shade, round joins, ink only for small detail. */
(function (root, factory) {
  const kit = typeof module === "object" && module.exports ? require("./kit.js") : root.PimArt;
  const props = factory(kit);
  if (typeof module === "object" && module.exports) module.exports = props;
  else root.PimProps = props;
})(typeof self !== "undefined" ? self : this, (K) => {
  const { C, g, ell, circ, rect, line, box, text, soft, sym, shadeOf, tint, n } = K;
  const path = (d, fill, extra = "") => `<path d="${d}" fill="${fill}"${extra}/>`;
  const sp = (d, fill, w = 4) => soft(d, fill, w);
  const shadedPath = (d, fill, shade, dx = -2.5, dy = 2.5) => `<g transform="translate(${dx} ${dy})">${sp(d, shade)}</g>${sp(d, fill)}`;
  const shine = (x, y, rx = 4, ry = 7, r = -30) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".45" transform="rotate(${r} ${x} ${y})"/>`;
  const lines = (x, y, w, count, gap = 8, c = C.grey, wd = 3) => [...Array(count)].map((_, i) => line(`M${x} ${y + i * gap}h${i === count - 1 ? w * 0.6 : w}`, c, wd)).join("");

  const P = {};

  /* ---------- Food & drink ---------- */
  P.apple = ({ c = C.red } = {}) => shadedPath("M0-22c-8-8-30-6-30 14 0 20 14 34 22 34 4 0 6-2 8-2s4 2 8 2c8 0 22-14 22-34 0-20-22-22-30-14Z", c, shadeOf(c)) +
    line("M0-22q2-10 6-14", C.brownDark, 4) + sp("M4-30q12-12 22-6-8 12-22 6Z", C.leaf, 3) + shine(-16, -6);
  P.bread = () => shadedPath("M-40 8c0-26 18-34 40-34s40 8 40 34c0 8-4 14-12 14h-56c-8 0-12-6-12-14Z", C.wood, C.woodDark) +
    line("M-18-14l-8 14M0-18l-8 16M18-14l-8 14", "#f6cf95", 4) + shine(-24, -6, 3, 6);
  P.cheese = () => shadedPath("M-38 20V-6L28-26 40-6V20Z", C.yellow, C.yellowDark) + path("M-38-6L28-26 40-6Z", "#ffd76e") +
    circ(-18, 6, 5, C.yellowDark) + circ(6, 10, 4, C.yellowDark) + circ(24, 0, 3, C.yellowDark) + circ(-2, -10, 3, "#f1b31f");
  P.rice = () => shadedPath("M-40-4h80c0 26-18 36-40 36S-40 22-40-4Z", "#7fc6ff", "#4ea6e8") +
    path("M-36-4c2-16 16-22 36-22s34 6 36 22Z", "#fff") + [...Array(9)].map((_, i) => ell(-24 + i * 6, -10 + (i % 3) * 3, 2.4, 1.4, "#e8e4da")).join("") + rect(-22, 8, 44, 5, 2.5, "#bfe3ff");
  P.glass = ({ fill = "#7cc8ff", level = 0.6 } = {}) => {
    const top = -30, h = 60, ly = top + h * (1 - level);
    return path(`M-20 ${top}h40l-5 ${h}h-30Z`, "#e9f4ff") + path(`M${-20 + (ly - top) / 12} ${ly}h${40 - (ly - top) / 6}l${-(30 - ly) / 12} ${30 - ly}h-30Z`, fill) + line(`M-12 ${top + 8}v36`, "#fff", 3, ' opacity=".8"');
  };
  P.milk = () => shadedPath("M-20-20L-12-36h24L20-20V36h-40Z", "#fff", C.grey) + path("M-20-20h40V0h-40Z", C.blue) + path("M-12-36h24L20-20h-40Z", "#e8eef8") + circ(0, 18, 7, C.blueSoft) + circ(0, 18, 3, C.blue);
  P.cup = ({ c = "#fff", drink = C.brown, steam = true } = {}) => shadedPath("M-24-14h44v18c0 14-10 22-22 22S-24 18-24 4Z", c, C.grey) +
    line("M20-6c12 0 12 16 0 16", c === "#fff" ? C.grey : shadeOf(c), 6) + ell(-2, -14, 22, 5, drink) + ell(-2, 30, 32, 5, C.greyLight) +
    (steam ? line("M-10-24q-4-6 0-12t0-12M4-24q-4-6 0-12t0-12", C.greyDark, 3, ' opacity=".55"') : "");
  P.teaCup = () => P.cup({ c: C.greenSoft, drink: "#d58a3b" }) + line("M10-14l8-22", C.greyDark, 1.5) + rect(14, -42, 9, 10, 2, C.yellow);
  P.soup = () => shadedPath("M-42-4h84c0 24-18 34-42 34S-42 20-42-4Z", C.red, C.redDark) + ell(0, -4, 42, 8, "#ffb26b") +
    circ(-14, -5, 4, C.green) + circ(8, -3, 3.5, "#ff8a3d") + circ(20, -6, 3, C.green) + line("M-12-18q-4-6 0-12M10-18q-4-6 0-12", C.greyDark, 3, ' opacity=".5"');
  P.meat = () => shadedPath("M-36 0c0-20 18-30 38-28s34 16 30 34-26 24-44 20S-36 16-36 0Z", "#e8606b", "#c24452") +
    path("M-20 2c0-10 10-16 20-14s18 8 16 18-14 12-22 10-14-6-14-14Z", "#f59aa1") + ell(-2, 4, 6, 5, "#fff3e8") + line("M26 14l16 12", "#fff3e8", 8);
  P.fruit = () => g(P.apple(), { x: -18, y: 6, s: 0.6 }) + g(P.banana(), { x: 16, y: 0, s: 0.75 }) + g(P.grapes(), { x: 2, y: 18, s: 0.55 });
  P.banana = () => shadedPath("M-30-10c10 26 44 30 60 8l-6-4c-14 14-38 10-46-10Z", C.yellow, C.yellowDark) + line("M-30-10l-4-6", C.brownDark, 4);
  P.grapes = () => [[0, 0], [-10, -8], [10, -8], [-20, -16], [0, -16], [20, -16], [-10, -24], [10, -24]].map(([x, y]) => circ(x, -y - 10, 9, C.purple) + circ(x - 2, -y - 12, 3, "#b69bff")).join("") + sp("M0-38q8-8 16-4-6 8-16 4Z", C.leaf, 3);
  P.vegetables = () => g(P.carrot(), { x: -16, y: 0, r: -20 }) + g(P.broccoli(), { x: 16, y: 4, s: 0.9 });
  P.carrot = () => shadedPath("M-8-24h16L2 34h-4Z", C.oranje, C.oranjeDark) + line("M-6-10h6M2 2h-6M-4 14h5", C.oranjeDark, 2.4) + sp("M0-24l-8-14M0-24l2-16M0-24l10-12", C.leaf, 4);
  P.broccoli = () => rect(-6, 0, 12, 30, 5, "#8fd99c") + circ(-14, -6, 13, C.greenDark) + circ(12, -6, 13, C.greenDark) + circ(0, -16, 15, C.green) + circ(-12, -8, 11, C.green) + circ(12, -8, 11, C.green);
  P.coffeeBeans = () => [[-10, 0, -30], [10, 4, 20]].map(([x, y, r]) => g(ell(0, 0, 9, 13, C.brownDark) + line("M0-10q-4 10 0 20", C.brown, 2.4), { x, y, r })).join("");
  P.breakfast = () => ell(0, 14, 46, 12, C.greyLight) + ell(0, 10, 42, 10, "#fff") + g(P.egg(), { x: -14, y: 4, s: 0.8 }) + g(P.bread(), { x: 20, y: -2, s: 0.42 }) + g(P.cup({ steam: false }), { x: 38, y: -18, s: 0.5 });
  P.egg = () => ell(0, 0, 20, 14, "#fff") + circ(2, -1, 8, C.yellow);
  P.plate = ({ food = "" } = {}) => ell(0, 4, 46, 12, C.grey) + ell(0, 0, 44, 11, "#fff") + ell(0, 0, 30, 7, C.greyLight) + food;

  /* ---------- Home ---------- */
  P.house = ({ wall = C.brick, roof = C.blue, door = C.yellow } = {}) =>
    shadedPath("M-40-6L0-40 40-6V36h-80Z", wall, shadeOf(wall)) + sp("M-48-4L0-46 48-4", roof, 10) +
    box(-8, 8, 16, 28, 4, door, shadeOf(door), 0) + circ(4, 22, 1.8, C.ink) +
    box(-30, 2, 14, 14, 3, C.sky, C.sky, 0) + box(16, 2, 14, 14, 3, C.sky, C.sky, 0) + line("M-23 2v14M-30 9h14M23 2v14M16 9h14", "#fff", 2) +
    rect(18, -40, 8, 16, 2, shadeOf(wall));
  P.canalHouse = ({ wall = C.brick, w = 40, h = 90, gable = "step", door = C.blue } = {}) => {
    const x = -w / 2, top = -h / 2, gh = w * 0.42, base = h / 2;
    const st = gh / 3;
    const roof = gable === "step"
      ? `M${n(x)} ${n(top)}h${n(w * 0.1)}v${n(-st)}h${n(w * 0.12)}v${n(-st)}h${n(w * 0.12)}v${n(-st)}h${n(w * 0.32)}v${n(st)}h${n(w * 0.12)}v${n(st)}h${n(w * 0.12)}v${n(st)}h${n(w * 0.1)}`
      : gable === "bell"
        ? `M${n(x)} ${n(top)}Q${n(x + w * 0.16)} ${n(top - gh * 0.1)} ${n(x + w * 0.2)} ${n(top - gh * 0.55)}Q${n(x + w * 0.26)} ${n(top - gh)} ${n(0)} ${n(top - gh)}Q${n(-x - w * 0.26)} ${n(top - gh)} ${n(-x - w * 0.2)} ${n(top - gh * 0.55)}Q${n(-x - w * 0.16)} ${n(top - gh * 0.1)} ${n(-x)} ${n(top)}`
        : `M${n(x)} ${n(top)}L0 ${n(top - gh)}L${n(-x)} ${n(top)}`;
    const body = `${roof}V${n(base)}H${n(x)}Z`;
    const ww = w * 0.26, wh = w * 0.34, gap = wh * 0.75;
    const doorH = Math.min(h * 0.22, w * 0.5);
    const rows = Math.max(1, Math.floor((h - doorH - 14) / (wh + gap)));
    let wins = "";
    for (let r = 0; r < rows; r++) {
      const wy = top + 10 + r * (wh + gap);
      for (const wx of [x + w * 0.17, -x - w * 0.17 - ww]) wins += rect(wx, wy, ww, wh, ww * 0.25, "#fff6c9") + rect(wx - 2, wy + wh - 1, ww + 4, 4, 2, "#fff") + line(`M${n(wx + ww / 2)} ${n(wy)}v${n(wh)}`, "#fff", 1.6);
    }
    const attic = gable === "point" ? circ(0, top - gh * 0.38, w * 0.08, "#fff6c9") : rect(-w * 0.09, top - gh * 0.62, w * 0.18, gh * 0.4, w * 0.09, "#fff6c9");
    return shadedPath(body, wall, shadeOf(wall)) + rect(x, top - 2, w, 4, 2, "#ffffff66") + attic + wins +
      `<path d="M${n(-w * 0.14)} ${n(base)}V${n(base - doorH + w * 0.14)}a${n(w * 0.14)} ${n(w * 0.14)} 0 0 1 ${n(w * 0.28)} 0V${n(base)}Z" fill="${door}"/>`;
  };
  P.apartment = () => shadedPath("M-36-44h72v86h-72Z", C.blue, C.blueDark) +
    [0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => rect(-28 + c * 20, -36 + r * 18, 13, 11, 2, (r + c) % 3 ? "#fff6c9" : C.sky)).join("")).join("") + rect(-7, 26, 14, 16, 3, C.yellow);
  P.door = ({ c = C.blue, open = 0, number } = {}) => {
    const frame = shadedPath("M-28-44h56v88h-56Z", C.wood, C.woodDark);
    const leafW = 46 * (1 - open * 0.7);
    return frame + rect(-23, -38, 46, 82, 3, open ? "#ffe9a8" : shadeOf(c)) +
      (open ? path(`M-23-38h${leafW}l-6 4v76l6 4h-${leafW}Z`, c) : rect(-23, -38, 46, 82, 3, c) + rect(-16, -30, 32, 26, 4, shadeOf(c, 0.9)) + rect(-16, 2, 32, 30, 4, shadeOf(c, 0.9))) +
      circ(open ? -23 + leafW - 7 : 13, 6, 3.4, C.yellow) + (number != null ? rect(-10, -48, 20, 12, 4, "#fff") + text(0, -38.6, number, { size: 11 }) : "");
  };
  P.window = ({ open = false } = {}) => shadedPath("M-38-36h76v72h-76Z", "#fff", C.grey) + rect(-32, -30, 64, 60, 3, C.sky) +
    path("M-32 30L8-30h18L-14 30Z", "#e3f3ff") + line("M0-30v60M-32 0h64", "#fff", 5) + rect(-44, 34, 88, 8, 4, C.wood) +
    (open ? path("M32-30l16 8v52l-16 0Z", "#d2ecff") : "");
  P.lamp = ({ on = true } = {}) => (on ? path("M-34 40L-14-8h28L34 40Z", "#fff3b0", ' opacity=".55"') : "") +
    shadedPath("M-18-36h36l10 28h-56Z", C.yellow, C.yellowDark) + rect(-3, -8, 6, 38, 3, C.ink) + box(-18, 30, 36, 8, 4, C.ink, "#000", 2);
  P.bulb = ({ on = true } = {}) => (on ? circ(0, -8, 34, "#fff3b0", ' opacity=".6"') : "") + shadedPath("M-16 10c-10-8-14-16-14-24a30 30 0 0 1 60 0c0 8-4 16-14 24v8h-32Z", on ? C.yellow : C.greyLight, on ? C.yellowDark : C.grey, -2, 2) +
    rect(-15, 18, 30, 6, 3, C.greyDark) + rect(-12, 25, 24, 6, 3, C.greyDark) + rect(-6, 32, 12, 5, 2.5, C.ink) + line("M-6 8v-12l6-6 6 6v12", on ? "#fff" : C.grey, 2.4) + shine(-14, -18, 4, 8);
  P.chair = ({ c = C.wood } = {}) => line("M-20-40v76M18 6v30M-20 36v0M-14 6v30", shadeOf(c), 7) + shadedPath("M-24 0h48v10h-48Z", c, shadeOf(c), -2, 2) + rect(-24, -44, 10, 50, 5, c) + rect(-20, -40, 4, 24, 2, "#fff4", "");
  P.table = ({ c = C.wood } = {}) => line("M-36 4v34M36 4v34", shadeOf(c), 7) + line("M-26 4v28M26 4v28", shadeOf(c, 0.7), 6) + shadedPath("M-46-6h92v10h-92Z", c, shadeOf(c), -2, 3);
  P.bed = () => rect(-48, 0, 96, 22, 6, C.woodDark) + rect(-48, -24, 12, 52, 5, C.wood) + rect(-38, -6, 84, 14, 6, "#fff") + path("M-14-10h60v18h-60Z", C.blue) + rect(-34, -16, 22, 12, 6, C.blueSoft) + line("M-44 22v10M42 22v10", C.woodDark, 6);
  P.sofa = ({ c = C.green } = {}) => box(-46, -20, 92, 30, 12, c, shadeOf(c)) + box(-50, -2, 100, 24, 10, shadeOf(c, 0.9), shadeOf(c, 0.7)) + rect(-54, -10, 14, 34, 7, c) + rect(40, -10, 14, 34, 7, c) + line("M-44 24v8M44 24v8", C.ink, 5);
  P.bath = () => rect(-48, -6, 96, 10, 5, "#fff") + shadedPath("M-44 2h88c0 22-14 30-30 30h-28c-16 0-30-8-30-30Z", "#fff", C.grey) + ell(0, 2, 40, 5, "#9fd6ff") +
    line("M36-6v-30q0-8 8-8", C.greyDark, 5) + circ(-18, -8, 7, "#fff") + circ(-8, -12, 6, "#fff") + circ(-26, -14, 5, "#fff") + line("M-30 32l-4 8M30 32l4 8", C.greyDark, 5);
  P.shower = () => line("M-20 44V-34q0-10 10-10h20", C.greyDark, 5) + path("M2-48h24l6 10H-4Z", C.greyDark) + [...Array(5)].map((_, i) => sym.drop(0 + i * 7, -20 + (i % 2) * 14, 0.7)).join("");
  P.toilet = () => box(-8, -46, 34, 30, 6, "#fff", C.grey) + shadedPath("M-30-16h56c0 18-10 26-22 28v14h-14v-14c-12-2-20-10-20-28Z", "#fff", C.grey) + ell(-2, -16, 28, 6, C.greyLight) + rect(14, -40, 8, 4, 2, C.greyDark);
  P.stove = () => box(-42, -30, 84, 70, 6, "#fff", C.grey) + rect(-42, -30, 84, 16, 6, C.greyLight) + circ(-20, -22, 5, C.greyDark) + circ(0, -22, 5, C.greyDark) + circ(20, -22, 5, C.greyDark) +
    rect(-32, -4, 64, 34, 5, C.ink) + rect(-26, 2, 52, 22, 4, "#3a4766") + line("M-20 0h40", C.greyDark, 3);
  P.pot = ({ steam = true } = {}) => line("M-46-10h12M34-10h12", C.greyDark, 6) + shadedPath("M-36-16h72v30c0 12-8 18-20 18h-32c-12 0-20-6-20-18Z", C.red, C.redDark) + rect(-40, -20, 80, 8, 4, C.redDark) +
    rect(-8, -28, 16, 8, 4, C.ink) + (steam ? line("M-16-36q-5-7 0-14t0-14M2-36q-5-7 0-14t0-14M20-36q-5-7 0-14", C.greyDark, 3, ' opacity=".5"') : "");
  P.pan = () => line("M30 0h30", C.ink, 8) + ell(0, 4, 36, 12, C.ink) + ell(0, 0, 34, 10, "#3a4766") + g(P.egg(), { s: 0.8, y: -2 });
  P.radiator = ({ hot = true } = {}) => [...Array(6)].map((_, i) => rect(-42 + i * 14, -26, 11, 56, 5, i % 2 ? "#f2f4f8" : "#fff")).join("") + rect(-44, 22, 86, 6, 3, C.grey) + line("M-48 0h6M42 0h6", C.greyDark, 5) +
    (hot ? line("M-24-36q-5-6 0-12t0-12M0-36q-5-6 0-12t0-12M24-36q-5-6 0-12t0-12", C.red, 3.4, ' opacity=".8"') : "");
  P.pipeLeak = () => line("M-48-30H10q14 0 14 14v20", C.greyDark, 12) + line("M-48-30H10q14 0 14 14v20", C.grey, 7) + rect(16, 0, 16, 10, 3, C.greyDark) + sym.drop(24, 22, 1) + sym.drop(24, 40, 0.8) + ell(24, 50, 22, 5, "#9fd6ff") + sym.drop(-2, -20, 0.8, "#7cc8ff");
  P.key = ({ c = C.yellow } = {}) => g(circ(-22, 0, 16, c) + circ(-22, 0, 7, "#fff0") + `<circle cx="-22" cy="0" r="6" fill="${C.paper}"/>` + rect(-8, -5, 50, 10, 4, c) + rect(26, 2, 6, 14, 2, c) + rect(36, 2, 6, 10, 2, c) + rect(-30, -10, 4, 6, 2, "#fff8"), { r: 0 });
  P.trash = ({ c = C.green } = {}) => shadedPath("M-28-26h56l-6 66h-44Z", c, shadeOf(c)) + rect(-34, -36, 68, 10, 5, shadeOf(c)) + rect(-10, -42, 20, 8, 4, shadeOf(c)) + line("M-12-14l2 44M0-14v44M12-14l-2 44", shadeOf(c, 0.85), 4) + sp("M14-48l10-10 8 4-8 10Z", C.yellow, 3);
  P.vacuum = () => line("M10-46q-4 30-26 64", C.greyDark, 6) + rect(4, -54, 14, 12, 5, C.ink) + shadedPath("M-44 14h40v22h-40Z", C.purple, C.purpleDark) + circ(-38, 38, 6, C.ink) + circ(-10, 38, 6, C.ink) + shadedPath("M8 4c0-10 10-16 22-16s18 8 18 20v24H8Z", C.purple, C.purpleDark) + circ(28, 10, 7, "#d9ccff") + line("M-4 26H8", C.greyDark, 6);
  P.washer = () => box(-38, -42, 76, 84, 8, "#fff", C.grey) + rect(-38, -42, 76, 16, 8, C.greyLight) + circ(-24, -34, 3, C.green) + rect(4, -37, 24, 6, 3, C.grey) +
    circ(0, 10, 25, C.grey) + circ(0, 10, 20, C.sky) + path("M-20 14q10-8 20 0t20 0v4a20 20 0 0 1-40 0Z", C.blue) + circ(-8, 0, 4, "#fff") + circ(4, -6, 3, "#fff");
  P.clothes = () => g(P.shirt({ c: C.blue }), { x: -14, y: -4, s: 0.8, r: -8 }) + g(P.shirt({ c: C.pink }), { x: 14, y: 6, s: 0.8, r: 8 });
  P.shirt = ({ c = C.blue, label } = {}) => shadedPath("M-14-36l-28 14 8 20 10-4v42h48V-6l10 4 8-20-28-14q-6 8-14 8t-14-8Z", c, shadeOf(c)) + path("M-14-36q14 10 28 0", shadeOf(c, 0.85)) + (label ? text(0, 16, label, { size: 22, fill: "#fff" }) : "");
  P.coat = ({ c = C.green } = {}) => shadedPath("M-16-38l-26 12 4 62h76l4-62-26-12-16 18Z", c, shadeOf(c)) + line("M0-20v56", shadeOf(c, 0.75), 3) + circ(5, -6, 3, C.yellow) + circ(5, 10, 3, C.yellow) + circ(5, 26, 3, C.yellow) + path("M-16-38l16 18-10 10Z", shadeOf(c, 0.85)) + path("M16-38L0-20l10 10Z", shadeOf(c, 0.85));
  P.shoes = () => [[-2, 10, C.blue], [6, -6, C.red]].map(([x, y, c]) => g(shadedPath("M-30 8V-10q0-6 6-6h10q4 10 14 10h10q14 0 18 10v4Z", c, shadeOf(c)) + rect(-32, 6, 68, 8, 4, "#fff") + line("M-14-12l6 4M-8-14l6 4", "#fff", 2.4), { x, y, s: 0.85 })).join("");
  P.umbrella = ({ c = C.red, open = true } = {}) => open
    ? path("M-46 0a46 40 0 0 1 92 0q-8-8-15 0-8-8-16 0-7-8-15 0-8-8-15 0-8-8-15 0-8-8-16 0Z", c) + path("M-15 0q8-8 15 0 7-8 15 0a15 40 0 0 0-30 0Z", shadeOf(c)) + line("M0-40v-6M0 0v38q0 8-8 8t-8-8", C.ink, 4)
    : sp("M0-40L8 18H-8Z", c, 4) + line("M0 18v12q0 8-8 8", C.ink, 4);
  P.bag = ({ c = C.oranje } = {}) => line("M-14-14v-10a14 14 0 0 1 28 0v10", shadeOf(c), 5) + shadedPath("M-30-14h60l4 52h-68Z", c, shadeOf(c)) + rect(-30, -14, 60, 8, 3, shadeOf(c, 0.9));
  P.shoppingBag = () => line("M-14-16v-8a14 14 0 0 1 28 0v8", C.brownDark, 4) + shadedPath("M-30-16h60l4 54h-68Z", C.wood, C.woodDark) + g(P.bread(), { x: -10, y: -22, s: 0.4, r: -60 }) + circ(14, -18, 9, C.red) + sp("M0-20l-4-18h8Z", C.leaf, 3);
  P.backpack = ({ c = C.blue } = {}) => shadedPath("M-28-24q0-16 16-16h24q16 0 16 16v56q0 8-8 8h-40q-8 0-8-8Z", c, shadeOf(c)) + box(-20, 4, 40, 26, 8, shadeOf(c, 0.9), shadeOf(c, 0.7), 0) + line("M-10-40v-6a10 10 0 0 1 20 0v6", shadeOf(c), 5) + rect(-4, 8, 8, 6, 2, C.yellow);
  P.briefcase = ({ c = C.brown } = {}) => line("M-12-22v-8q0-4 4-4h16q4 0 4 4v8", shadeOf(c), 5) + shadedPath("M-40-22h80v52h-80Z", c, shadeOf(c)) + rect(-40, -4, 80, 6, 0, shadeOf(c)) + rect(-6, -8, 12, 12, 3, C.yellow);
  P.plant = () => shadedPath("M-18 10h36l-4 30h-28Z", C.brick, C.brickDark) + sp("M0 10C-4-10-26-14-28-30 -10-30 0-14 0 10Z", C.green, 3) + sp("M0 10C4-14 22-22 26-40 6-36 0-16 0 10Z", C.greenDark, 3) + sp("M0 10C0-14 4-30 0-42-6-30-4-12 0 10Z", C.leaf, 3);
  P.tulip = ({ c = C.red } = {}) => line("M0 40V-6", C.greenDark, 5) + sp("M0 30q-18-6-20-24 14 2 20 24Z", C.green, 3) + sp("M-14-26q0 22 14 22t14-22l-7 6-7-12-7 12Z", c, 4);
  P.tree = ({ c = C.green } = {}) => rect(-6, 0, 12, 40, 5, C.brown) + circ(-14, -12, 22, shadeOf(c)) + circ(12, -10, 22, shadeOf(c)) + circ(0, -26, 26, c) + circ(-16, -10, 16, c) + circ(14, -12, 16, c) + circ(-6, -32, 7, tint(c, 0.4));
  P.calendarPage = ({ day, c = C.red, mark } = {}) => box(-34, -34, 68, 72, 10, "#fff", C.grey) + path("M-34-24q0-10 10-10h48q10 0 10 10v10h-68Z", c) + line("M-18-42v12M18-42v12", C.ink, 5) +
    (day != null ? text(0, 26, day, { size: 34 }) : [...Array(12)].map((_, i) => rect(-26 + (i % 4) * 14, -6 + Math.floor(i / 4) * 13, 10, 9, 2.5, i === mark ? c : C.greyLight)).join(""));
  P.calendarWeek = ({ hi = [], c = C.purple, cross } = {}) => box(-46, -36, 92, 72, 10, "#fff", C.grey) + path("M-46-26q0-10 10-10h72q10 0 10 10v8h-92Z", c) + line("M-28-44v12M28-44v12", C.ink, 5) +
    [...Array(7)].map((_, i) => rect(-40 + i * 12.4, -10, 9.4, 40, 3, hi.includes(i) ? c : C.greyLight)).join("") + (cross != null ? g(line("M-6-6l12 12M6-6l-12 12", C.red, 4), { x: -35.3 + cross * 12.4, y: 10 }) : "");
  P.clock = ({ h = 3, m = 0, c = C.blue, ring = false } = {}) => {
    const ha = ((h % 12) + m / 60) * 30 - 90, ma = m * 6 - 90, rad = Math.PI / 180;
    return (ring ? line("M-28-38l-10 10M28-38l10 10", C.red, 8) + ell(-24, -34, 12, 9, C.red, ' transform="rotate(-40 -24 -34)"') + ell(24, -34, 12, 9, C.red, ' transform="rotate(40 24 -34)"') : "") +
      circ(-3, 3, 40, shadeOf(c)) + circ(0, 0, 40, c) + circ(0, 0, 32, "#fff") +
      [...Array(12)].map((_, i) => circ(Math.cos(i * 30 * rad) * 26, Math.sin(i * 30 * rad) * 26, i % 3 ? 1.6 : 2.8, C.greyDark)).join("") +
      line(`M0 0L${n(Math.cos(ha * rad) * 15)} ${n(Math.sin(ha * rad) * 15)}`, C.ink, 5) + line(`M0 0L${n(Math.cos(ma * rad) * 23)} ${n(Math.sin(ma * rad) * 23)}`, C.ink, 3.4) + circ(0, 0, 4, C.red);
  };
  P.alarm = (o = {}) => P.clock({ ring: true, c: C.red, h: 7, m: 0, ...o }) + line("M-26 36l-6 8M26 36l6 8", C.ink, 5);
  P.hourglass = () => rect(-26, -42, 52, 8, 4, C.wood) + rect(-26, 34, 52, 8, 4, C.wood) + path("M-20-34h40c0 16-14 24-14 34s14 18 14 34h-40c0-16 14-24 14-34s-14-18-14-34Z", "#e3f3ff") + path("M-12-20h24c-4 8-12 12-12 18-0-6-8-10-12-18Z", C.yellow) + path("M-14 32q14-16 28 0Z", C.yellow) + line("M0 0v24", C.yellow, 2);

  /* ---------- Paper, cards, money ---------- */
  P.paper = ({ w = 64, h = 80, lineCount = 5, c = "#fff", head } = {}) => box(-w / 2, -h / 2, w, h, 8, c, C.grey) + (head ? rect(-w / 2, -h / 2, w, 16, 8, head) + rect(-w / 2, -h / 2 + 8, w, 8, 0, head) : "") +
    lines(-w / 2 + 10, -h / 2 + (head ? 26 : 14), w - 20, lineCount, 10);
  P.form = () => box(-32, -40, 64, 82, 8, "#fff", C.grey) + rect(-14, -46, 28, 12, 5, C.greyDark) +
    [0, 1, 2].map((i) => rect(-22, -22 + i * 20, 10, 10, 3, i < 2 ? C.green : C.greyLight) + line(`M-6 ${-17 + i * 20}h26`, C.grey, 3) + (i < 2 ? line(`M-20 ${-17 + i * 20}l3 3 5-6`, "#fff", 2.4) : "")).join("");
  P.contract = () => P.paper({ w: 66, h: 84, lineCount: 4, head: C.blue }) + line("M-20 26q6-10 10 0t10 0 10-4 8 2", C.blueDark, 3) + circ(22, 30, 9, C.red) + sp("M18 36l-4 10 6-3 4 3-2-10", C.red, 2);
  P.signature = () => line("M-40 16q10-30 18-6t10 6 14-18 6 18 22-6 16 0", C.blueDark, 4) + line("M-40 30h80", C.grey, 3);
  P.pen = ({ c = C.blue } = {}) => g(rect(-6, -40, 12, 64, 5, c) + rect(-6, -40, 12, 14, 5, shadeOf(c)) + path("M-6 24h12L0 40Z", C.wood) + path("M-2 34h4L0 40Z", C.ink) + rect(4, -36, 3, 22, 1.5, C.greyDark), { r: 35 });
  P.pencil = () => g(rect(-6, -40, 12, 62, 2, C.yellow) + rect(-6, -46, 12, 8, 3, C.pink) + rect(-6, -40, 12, 4, 0, C.grey) + path("M-6 22h12L0 38Z", C.wood) + path("M-2 32h4L0 38Z", C.ink), { r: 35 });
  P.book = ({ c = C.blue, open = false } = {}) => open
    ? path("M0-24q-20-8-44-4v54q24-4 44 4Z", "#fff") + path("M0-24q20-8 44-4v54q-24-4-44 4Z", "#f4f6fa") + path("M-44 26q24-4 44 4 20-8 44-4v4q-24-4-44 4-20-8-44-4Z", c) + lines(-36, -18, 26, 4, 9) + lines(10, -18, 26, 4, 9)
    : shadedPath("M-30-38h52q8 0 8 8v62q0 8-8 8h-52Z", c, shadeOf(c)) + rect(-30, -38, 10, 78, 4, shadeOf(c, 0.85)) + rect(-12, -24, 30, 14, 3, "#ffffffcc") + path("M8 40v12l6-5 6 5V40Z", C.red);
  P.notebook = () => shadedPath("M-30-40h60v80h-60Z", C.greenSoft, C.green) + [...Array(6)].map((_, i) => circ(-30, -32 + i * 13, 4, C.ink)).join("") + lines(-18, -24, 40, 5, 11, C.green);
  P.envelope = ({ c = "#fff", stamp = true, open = false } = {}) => shadedPath("M-40-26h80v54h-80Z", c, C.grey) + path("M-40-26L0 6 40-26Z", open ? "#fff" : C.greyLight) + line("M-40 28L-8 0M40 28L8 0", C.grey, 2) +
    (stamp ? rect(20, -20, 14, 16, 2, C.red) + circ(27, -12, 3, "#fff") : "");
  P.envelopeLetter = () => path("M-36-46h72v50h-72Z", "#fff") + lines(-26, -36, 52, 3, 9) + g(P.envelope({ open: true, stamp: false }), { y: 18 });
  P.atMail = () => P.envelope({ stamp: false }) + circ(0, 2, 15, C.blue) + text(0, 9.5, "@", { size: 22, fill: "#fff" });
  P.idCard = ({ c = C.blue, photo = true } = {}) => box(-46, -30, 92, 60, 8, "#fff", C.grey) + rect(-46, -30, 92, 14, 8, c) + rect(-46, -22, 92, 6, 0, c) +
    (photo ? rect(-36, -8, 26, 30, 5, C.blueSoft) + circ(-23, 2, 7, "#e8b48a") + path("M-34 22q11-14 22 0Z", c) : "") + lines(-2, -4, 38, 3, 9);
  P.passport = () => box(-30, -42, 60, 84, 8, "#7a1f3d", "#5a142c") + circ(0, -6, 14, "none", ` stroke="${C.yellow}" stroke-width="3"`) + line("M-10-6h20M0-20v28", C.yellow, 2.4) + rect(-16, 22, 32, 4, 2, C.yellow);
  P.badge = ({ c = C.oranje } = {}) => line("M-14-48l14 16 14-16", C.blue, 5) + box(-34, -32, 68, 50, 8, "#fff", C.grey) + rect(-34, -32, 68, 14, 7, c) + rect(-34, -25, 68, 7, 0, c) + rect(-26, -10, 22, 22, 4, C.blueSoft) + circ(-15, -2, 6, "#e8b48a") + lines(2, -6, 26, 3, 8);
  P.card = ({ c = C.blue } = {}) => box(-44, -28, 88, 56, 9, c, shadeOf(c)) + rect(-44, -16, 88, 10, 0, C.ink) + rect(-34, 2, 16, 12, 3, C.yellow) + line("M-34 20h30M8 20h24", "#ffffffaa", 3) + circ(28, 6, 6, C.red) + circ(34, 6, 6, C.yellow, ' opacity=".85"');
  P.cash = () => g(box(-40, -22, 80, 44, 6, C.green, C.greenDark) + circ(0, 0, 12, C.greenSoft) + text(0, 7, "€", { size: 18, fill: C.greenDark }) + rect(-34, -16, 8, 8, 2, C.greenSoft) + rect(26, 8, 8, 8, 2, C.greenSoft), { r: -8 }) +
    g(P.coin(), { x: 30, y: 26, s: 0.7 }) + g(P.coin(), { x: 42, y: 18, s: 0.6 });
  P.coin = () => circ(-2, 2, 16, C.yellowDark) + circ(0, 0, 16, C.yellow) + circ(0, 0, 11, "#ffd56e") + text(0, 6, "€", { size: 15, fill: C.yellowDark });
  P.coins = () => [[-14, 10], [14, 12], [0, -6]].map(([x, y]) => g(P.coin(), { x, y })).join("");
  P.wallet = () => shadedPath("M-40-22h72q8 0 8 8v40q0 8-8 8h-72Z", C.brown, C.brownDark) + rect(14, -6, 30, 20, 6, C.brownDark) + circ(26, 4, 4, C.yellow) + rect(-30, -32, 50, 14, 3, C.green);
  P.receipt = ({ total = true } = {}) => path("M-26-44h52v84l-6.5-6-6.5 6-6.5-6-6.5 6-6.5-6-6.5 6-6.5-6-6.5 6Z", "#fff") + path("M-26-44h52v4h-52Z", C.grey) +
    lines(-18, -32, 36, 4, 9) + (total ? line("M-18 10h36", C.ink, 2) + rect(-18, 16, 36, 10, 3, C.yellowSoft) + line("M-14 21h12M6 21h8", C.ink, 3) : "");
  P.priceTag = ({ c = C.yellow, label = "€" } = {}) => g(shadedPath("M-36-18h50l22 18-22 18h-50Z", c, shadeOf(c)) + circ(-26, 0, 5, "#fff") + text(-2, 8, label, { size: 22, fill: C.ink }), { r: -14 });
  P.saleTag = () => g(shadedPath("M-36-18h50l22 18-22 18h-50Z", C.red, C.redDark) + circ(-26, 0, 5, "#fff") + text(0, 9, "%", { size: 26, fill: "#fff" }), { r: -14 });
  P.till = () => box(-44, -6, 88, 44, 8, C.greyDark, C.ink) + box(-30, -38, 50, 30, 6, C.ink, "#000", 0) + rect(-25, -33, 40, 18, 3, "#9ff0b5") + line("M-20-24h22", C.greenDark, 3) +
    [...Array(6)].map((_, i) => rect(-36 + (i % 3) * 14, 4 + Math.floor(i / 3) * 12, 10, 8, 2, "#fff")).join("") + rect(10, 4, 26, 20, 3, C.grey) + rect(-44, 30, 88, 8, 4, C.ink);
  P.pinTerminal = () => g(box(-26, -40, 52, 82, 10, C.ink, "#000") + rect(-18, -32, 36, 22, 4, "#9ff0b5") + line("M-12-21h24", C.greenDark, 3) +
    [...Array(9)].map((_, i) => rect(-16 + (i % 3) * 12, -2 + Math.floor(i / 3) * 11, 8, 7, 2, i === 8 ? C.green : "#fff")).join(""), { r: 8 });
  P.ticket = ({ c = C.yellow } = {}) => g(shadedPath("M-44-22h88v14a8 8 0 0 0 0 16v14h-88V8a8 8 0 0 0 0-16Z", c, shadeOf(c)) + line("M16-18v36", shadeOf(c), 2, ' stroke-dasharray="4 4"') + lines(-34, -10, 40, 3, 9, shadeOf(c, 0.75)) + path("M24-6l6 4-6 4Z", C.ink) + path("M30-6l6 4-6 4Z", C.ink), { r: -8 });
  P.clipboard = () => P.form();
  P.report = () => P.paper({ w: 64, h: 82, lineCount: 2, head: C.green }) + rect(-20, 8, 10, 22, 2, C.blue) + rect(-6, -2, 10, 32, 2, C.green) + rect(8, 14, 10, 16, 2, C.oranje) + sym.star(24, -24, 0.7);
  P.document = () => P.paper({ w: 62, h: 80, lineCount: 5, head: C.blue }) + path("M14-40h17l-17 17Z", C.greyLight);
  P.prescription = () => P.paper({ w: 62, h: 80, lineCount: 3, head: C.green }) + text(-14, 30, "Rx", { size: 20, fill: C.greenDark }) + sym.drop(18, 22, 0.8, C.red);
  P.label = () => g(box(-38, -24, 76, 48, 8, "#fff", C.grey) + rect(-38, -24, 76, 12, 6, C.oranje) + rect(-38, -18, 76, 6, 0, C.oranje) + lines(-28, -2, 56, 2, 9) +
    [...Array(12)].map((_, i) => rect(-30 + i * 5, 16, i % 3 ? 2 : 3, 6, 0, C.ink)).join(""), { r: -6 });
  P.menu = () => box(-34, -42, 68, 84, 8, C.wood, C.woodDark) + rect(-28, -36, 56, 72, 5, C.paper) + g(P.cup({ steam: false }), { x: 0, y: -18, s: 0.35 }) + lines(-20, 0, 40, 3, 9);
  P.agenda = () => P.calendarWeek({ hi: [1, 3], c: C.blue });
  P.rooster = () => box(-46, -34, 92, 68, 8, "#fff", C.grey) + [...Array(4)].map((_, r) => [...Array(5)].map((_, c) => rect(-40 + c * 17.4, -28 + r * 15, 14, 11, 3, [C.blue, C.green, C.oranje, C.purple, C.greyLight][(r * 2 + c) % 5])).join("")).join("");
  P.bill = () => P.receipt();

  /* ---------- Tech & comms ---------- */
  P.phone = ({ c = C.ink, screen = C.sky, content = "" } = {}) => shadedPath("M-22-42h44q6 0 6 6v76q0 6-6 6h-44q-6 0-6-6v-76q0-6 6-6Z", c, "#000") + rect(-22, -34, 44, 66, 4, screen) + rect(-6, -40, 12, 3, 1.5, "#ffffff55") + circ(0, 38, 3, "#ffffff55") + content;
  P.phoneApps = () => P.phone({ content: [...Array(9)].map((_, i) => rect(-17 + (i % 3) * 13, -28 + Math.floor(i / 3) * 14, 9, 9, 3, [C.red, C.green, C.yellow, C.blue, C.purple, C.oranje, C.pink, C.teal, C.green][i])).join("") });
  P.phoneChat = () => P.phone({ screen: "#fff", content: rect(-18, -28, 26, 10, 5, C.greyLight) + rect(-8, -14, 26, 10, 5, C.green) + rect(-18, 0, 22, 10, 5, C.greyLight) + rect(-4, 14, 22, 10, 5, C.green) });
  P.phoneCall = () => P.phone({ screen: C.green, content: circ(0, -10, 12, "#fff") + circ(0, -12, 5, C.greenDark) + path("M-8-2q8-8 16 0Z", C.greenDark) + circ(-10, 20, 6, C.red) + circ(10, 20, 6, "#fff") });
  P.phoneSignal = ({ bars = 1 } = {}) => P.phone({ screen: "#fff", content: [0, 1, 2, 3].map((i) => rect(-14 + i * 8, 4 - i * 8, 6, 10 + i * 8, 2, i < bars ? C.green : C.greyLight)).join("") });
  P.phoneVoicemail = () => P.phone({ screen: C.blueSoft, content: circ(-9, -6, 7, "none", ` stroke="${C.blue}" stroke-width="4"`) + circ(9, -6, 7, "none", ` stroke="${C.blue}" stroke-width="4"`) + line("M-9 1h18", C.blue, 4) + rect(-14, 12, 28, 5, 2.5, C.blue) });
  P.handset = ({ c = C.green } = {}) => g(sp("M-26-30q-10 10-6 26 8 26 34 38 14 4 24-6l-12-14-10 6q-14-8-20-22l6-10Z", c, 5), { r: 0 });
  P.speechBubble = ({ c = "#fff", inner = "" } = {}) => K.bubble(-38, -30, 76, 50, inner, { fill: c });
  P.laptop = () => box(-40, -34, 80, 52, 6, C.ink, "#000", 0) + rect(-34, -28, 68, 40, 3, C.sky) + path("M-50 18h100l-6 10h-88Z", C.greyDark) + lines(-26, -18, 40, 3, 9, "#fff");
  P.wrench = () => g(rect(-5, -12, 10, 52, 5, C.greyDark) + sp("M-14-26a16 16 0 1 0 28 0l-6 10h-16Z", C.greyDark, 3), { r: -40 });
  P.hammer = () => g(rect(-4, -10, 8, 50, 4, C.wood) + box(-20, -26, 40, 16, 4, C.greyDark, C.ink), { r: 30 });
  P.toolbox = () => line("M-12-20v-8h24v8", C.ink, 5) + box(-40, -20, 80, 46, 6, C.red, C.redDark) + rect(-40, -8, 80, 6, 0, C.redDark) + rect(-6, -10, 12, 10, 3, C.yellow);
  P.spray = () => shadedPath("M-14-14h28v54h-28Z", C.teal, C.tealDark) + path("M-10-30h18l6 10h-24Z", "#fff") + rect(8, -30, 12, 6, 3, "#fff") + circ(28, -32, 3, C.sky) + circ(34, -24, 2.4, C.sky) + circ(32, -38, 2, C.sky) + rect(-8, 0, 16, 18, 3, "#fff8");
  P.broom = () => g(rect(-3, -48, 6, 64, 3, C.wood) + path("M-18 16h36l8 30h-52Z", C.yellow) + line("M-12 22l-4 22M0 22v22M12 22l4 22", C.yellowDark, 2.4), { r: -20 });
  P.bucket = () => line("M-24-14q24-26 48 0", C.greyDark, 4) + shadedPath("M-28-14h56l-6 44h-44Z", C.blue, C.blueDark) + ell(0, -14, 28, 6, "#9fd6ff") + circ(-8, -20, 5, "#fff") + circ(4, -22, 4, "#fff");
  P.thermometer = ({ hot = true } = {}) => g(rect(-7, -42, 14, 70, 7, "#fff") + circ(0, 30, 12, hot ? C.red : C.blue) + rect(-3, hot ? -30 : 6, 6, hot ? 58 : 22, 3, hot ? C.red : C.blue) + line("M8-30h5M8-18h5M8-6h5M8 6h5", C.greyDark, 2), { r: 20 });
  P.pills = () => g(rect(-24, -9, 48, 18, 9, "#fff") + path("M0-9h15a9 9 0 0 1 0 18H0Z", C.red), { x: -10, y: 10, r: -30 }) + circ(18, -10, 11, "#fff") + line("M10-10h16", C.grey, 2) + circ(22, 20, 8, C.yellow);
  P.medicine = () => line("M-12-30h24", C.ink, 0) + rect(-16, -42, 32, 12, 4, "#fff") + shadedPath("M-22-30h44v66h-44Z", C.oranje, C.oranjeDark) + rect(-16, -14, 32, 28, 4, "#fff") + line("M0-8v16M-8 0h16", C.red, 5);
  P.firstAid = () => box(-40, -26, 80, 56, 8, "#fff", C.grey) + line("M-12-34v-6h24v6", C.greyDark, 5) + line("M0-8v24M-12 4h24", C.red, 9);
  P.tooth = ({ mood = "happy" } = {}) => shadedPath("M-28-24c0-16 14-18 28-12 14-6 28-4 28 12 0 16-8 22-10 40-1 10-10 12-12 2l-6-18-6 18c-2 10-11 8-12-2-2-18-10-24-10-40Z", "#fff", C.grey) +
    (mood === "happy" ? circ(-10, -14, 3, C.ink) + circ(10, -14, 3, C.ink) + line("M-8-4q8 7 16 0", C.ink, 2.4) : "") + shine(-16, -24, 3, 6);
  P.toothbrush = () => rect(-6, -10, 12, 56, 6, C.blue) + rect(-8, -40, 16, 32, 5, C.blue) + [...Array(4)].map((_, i) => rect(-10, -38 + i * 7, 8, 5, 2, "#fff")).join("") + rect(-4, 0, 4, 40, 2, "#ffffff55");
  P.stethoscope = () => line("M-16-30v18a16 16 0 0 0 32 0v-18", C.greyDark, 4) + line("M0 4v18q0 14 14 14t14-14v-6", C.greyDark, 4) + circ(28, 12, 8, C.greyDark) + circ(28, 12, 4, C.grey) + circ(-16, -32, 3, C.ink) + circ(16, -32, 3, C.ink);
  P.syringe = () => g(rect(-8, -30, 16, 46, 3, "#e9f4ff") + rect(-8, -8, 16, 24, 0, C.red, ' opacity=".7"') + rect(-14, -34, 28, 6, 3, C.greyDark) + rect(-2, -48, 4, 16, 2, C.greyDark) + line("M0 16v18", C.greyDark, 2), { r: 30 });

  /* ---------- Transport & city ---------- */
  P.bike = ({ c = C.blue } = {}) => {
    const wheel = (x) => circ(x, 14, 20, "none", ` stroke="${C.ink}" stroke-width="6"`) + circ(x, 14, 3, C.ink) + line(`M${x - 14} 14h28M${x} 0v28`, C.grey, 1.4);
    return wheel(-30) + wheel(30) + line("M-30 14L-6 14L14-14H-14L-6 14M14-14L30 14M-14-14l-6-10M14-14l-2-12", c, 6) + line("M-26-26h12M4-28q6-6 14-2", C.ink, 5) + path("M-34-28h18l-2 4h-14Z", C.ink) + line("M-6 14l4 6", C.greyDark, 3);
  };
  P.bus = ({ c = C.yellow } = {}) => shadedPath("M-48-30q0-10 10-10h76q10 0 10 10v52h-96Z", c, shadeOf(c)) + rect(-42, -32, 22, 22, 4, C.sky) + rect(-16, -32, 22, 22, 4, C.sky) + rect(10, -32, 30, 22, 4, C.sky) +
    rect(-48, 4, 96, 6, 0, shadeOf(c)) + circ(-28, 24, 11, C.ink) + circ(-28, 24, 4, C.grey) + circ(28, 24, 11, C.ink) + circ(28, 24, 4, C.grey) + rect(40, 12, 8, 6, 3, "#fff6c9");
  P.train = ({ c = C.yellow } = {}) => shadedPath("M-48-34h70q26 0 26 26v34h-96Z", c, shadeOf(c)) + rect(-42, -26, 18, 18, 4, C.sky) + rect(-18, -26, 18, 18, 4, C.sky) + path("M6-26h16q12 0 16 18h-32Z", C.sky) +
    rect(-48, 4, 96, 8, 0, C.blue) + rect(-48, 26, 96, 6, 0, C.ink) + circ(-30, 30, 7, C.ink) + circ(-10, 30, 7, C.ink) + circ(26, 30, 7, C.ink) + rect(38, 12, 8, 6, 3, "#fff6c9");
  P.car = ({ c = C.red } = {}) => shadedPath("M-48 0q0-10 10-12l12-18q4-6 12-6h26q8 0 12 6l14 18q10 2 10 12v14h-96Z", c, shadeOf(c)) + path("M-20-28h14v16h-24Z", C.sky) + path("M0-28h14l10 16H0Z", C.sky) +
    circ(-26, 14, 11, C.ink) + circ(-26, 14, 4, C.grey) + circ(26, 14, 11, C.ink) + circ(26, 14, 4, C.grey) + rect(40, -4, 8, 6, 3, "#fff6c9");
  P.ambulance = () => shadedPath("M-48-34h62v14h16q10 0 14 14l4 6v28h-96Z", "#fff", C.grey) + rect(-48, 0, 96, 6, 0, C.red) + path("M18-14h14l8 14h-22Z", C.sky) + line("M-26-24v20M-36-14h20", C.red, 7) +
    rect(-18, -44, 18, 10, 4, C.blue) + circ(-26, 28, 11, C.ink) + circ(-26, 28, 4, C.grey) + circ(28, 28, 11, C.ink) + circ(28, 28, 4, C.grey) + line("M4-48l4-6M-9-50v-7M-22-48l-4-6", C.blue, 3);
  P.truck = ({ c = C.oranje } = {}) => shadedPath("M-48-34h56v52h-56Z", "#fff", C.grey) + g(P.box({ s: 0.4 }), { x: -20, y: -8 }) + shadedPath("M10-18h22l14 16v20h-36Z", c, shadeOf(c)) + path("M16-14h14l10 12H16Z", C.sky) + circ(-30, 22, 10, C.ink) + circ(26, 22, 10, C.ink) + circ(-30, 22, 4, C.grey) + circ(26, 22, 4, C.grey);
  P.box = () => shadedPath("M-34-28h68v58h-68Z", C.wood, C.woodDark) + path("M-34-28h68l-8-12h-52Z", "#efc287") + rect(-8, -28, 16, 58, 0, "#f3d29e") + line("M14 10h12M14 18h8", C.woodDark, 3);
  P.parcel = () => P.box() + rect(-24, -10, 18, 12, 2, "#fff") + line("M-20-6h10M-20-2h6", C.grey, 2);
  P.mailbox = () => rect(-4, 0, 8, 46, 3, C.greyDark) + shadedPath("M-34-34h52q16 0 16 16v22h-68Z", C.oranje, C.oranjeDark) + rect(-24, -16, 34, 6, 3, C.ink) + path("M26-30v-14h16v10h-12Z", C.red) + g(P.envelope({ stamp: false }), { x: -6, y: -24, s: 0.36 });
  P.busStop = () => rect(-4, -44, 8, 88, 4, C.greyDark) + box(-24, -50, 48, 34, 8, C.yellow, C.yellowDark) + g(P.bus({ c: C.blue }), { y: -33, s: 0.32 }) + rect(-16, -10, 32, 22, 3, "#fff") + lines(-10, -4, 20, 2, 7);
  P.trafficSign = ({ kind = "stop" } = {}) => rect(-4, -4, 8, 50, 3, C.greyDark) + (kind === "stop"
    ? g(path("M-14-34h28l20 20v28L14 34h-28L-34 14v-28Z", "#fff") + path("M-12-29h24l17 17v24L12 29h-24L-29 12v-24Z", C.red) + rect(-5, -16, 10, 22, 4, "#fff") + circ(0, 14, 5, "#fff"), { y: -18 })
    : kind === "warn" ? g(sp("M0-34L34 26H-34Z", C.red, 8) + sp("M0-20L22 18H-22Z", "#fff", 4) + text(0, 14, "!", { size: 30 }), { y: -18 })
      : kind === "ban" ? sym.ban(0, -18, 1.4)
        : kind === "parking" ? g(box(-26, -26, 52, 52, 8, C.blue, C.blueDark) + text(0, 15, "P", { size: 40, fill: "#fff" }), { y: -20 }) : "");
  P.signpost = ({ dir = "left" } = {}) => rect(-4, -40, 8, 84, 4, C.wood) +
    (dir === "left" ? shadedPath("M-44-36h70v26h-70l-12-13Z", C.green, C.greenDark) + sym.arrow(-12, -23, 0.8, 180, "#fff")
      : dir === "right" ? shadedPath("M-26-36h70l12 13-12 13h-70Z", C.green, C.greenDark) + sym.arrow(12, -23, 0.8, 0, "#fff")
        : shadedPath("M-13-48h26v40h-26Z", C.green, C.greenDark) + sym.arrow(0, -28, 0.7, -90, "#fff"));
  P.trafficLight = ({ on = "red" } = {}) => rect(-4, 20, 8, 28, 3, C.greyDark) + box(-16, -46, 32, 70, 10, C.ink, "#000") + circ(0, -32, 8, on === "red" ? C.red : "#4a2a2a") + circ(0, -11, 8, on === "yellow" ? C.yellow : "#4a442a") + circ(0, 10, 8, on === "green" ? C.green : "#2a4a32");
  P.station = () => shadedPath("M-46-10h92v44h-92Z", C.brick, C.brickDark) + sp("M-50-10L0-34 50-10", C.blue, 8) + circ(0, -12, 9, "#fff") + line("M0-12v-5M0-12h4", C.ink, 2) +
    [-30, -12, 12, 30].map((x) => rect(x - 6, 2, 12, 22, 6, "#fff6c9")).join("") + rect(-50, 32, 100, 6, 3, C.greyDark);
  P.rails = () => path("M-18-44h36L48 44h-96Z", "#d3c6b2") + line("M-12-44L-36 44M12-44L36 44", C.greyDark, 4) + [...Array(6)].map((_, i) => { const y = -40 + i * 16, w = 16 + i * 6; return rect(-w - 4, y, 2 * w + 8, 5, 2, C.brown); }).join("");
  P.road = () => path("M-14-44h28L56 44h-112Z", "#8a93a8") + [...Array(4)].map((_, i) => { const y = -36 + i * 22, w = 1.6 + i * 1.1; return rect(-w, y, 2 * w, 10 + i * 3, w, "#fff"); }).join("");
  P.cityscape = () => g(P.canalHouse({ wall: C.red, w: 34, h: 70, gable: "bell" }), { x: -38, y: 6 }) + g(P.canalHouse({ wall: C.yellow, w: 36, h: 90, gable: "step", door: C.green }), { x: 0, y: -4 }) + g(P.canalHouse({ wall: C.teal, w: 34, h: 76, gable: "point" }), { x: 38, y: 3 });
  P.townHall = () => shadedPath("M-48-14h96v54h-96Z", "#f3e3c4", "#d8c39b") + path("M-54-14L0-40 54-14Z", C.blue) + rect(-12, -64, 24, 32, 4, "#f3e3c4") + path("M-16-64L0-80 16-64Z", C.blue) + circ(0, -50, 7, "#fff") + line("M0-50v-4M0-50h3", C.ink, 1.6) +
    [-36, -20, 20, 36].map((x) => rect(x - 4, -6, 8, 34, 3, "#fff")).join("") + rect(-8, 10, 16, 30, 8, C.brown) + rect(-56, 38, 112, 6, 3, "#d8c39b") + rect(-2, -86, 4, 8, 2, C.ink) + path("M2-86h10l-3 3 3 3H2Z", C.oranje);
  P.hospital = () => shadedPath("M-42-38h84v78h-84Z", "#fff", C.grey) + box(-14, -54, 28, 28, 6, C.red, C.redDark) + line("M0-48v16M-8-40h16", "#fff", 6) +
    [0, 1].map((r) => [-30, -12, 12, 30].map((x) => rect(x - 6, -18 + r * 18, 12, 10, 2, C.sky)).join("")).join("") + rect(-10, 22, 20, 18, 3, C.blue);
  P.pharmacy = () => shadedPath("M-44-24h88v62h-88Z", "#fff", C.grey) + path("M-50-24h100l-8-14h-84Z", C.green) + box(-16, -64, 32, 32, 6, C.green, C.greenDark) + line("M0-58v20M-10-48h20", "#fff", 7) +
    rect(-36, -12, 34, 28, 4, C.sky) + g(P.pills(), { x: -19, y: 2, s: 0.3 }) + rect(8, -12, 26, 50, 4, C.greenDark) + circ(28, 14, 2, C.yellow);
  P.school = () => shadedPath("M-48-10h96v50h-96Z", C.brick, C.brickDark) + path("M-54-10L0-36 54-10Z", C.oranje) + rect(-10, -58, 20, 30, 3, C.brick) + path("M-14-58L0-68 14-58Z", C.oranje) + circ(0, -46, 6, C.yellow) +
    [-36, -20, 20, 36].map((x) => rect(x - 6, 0, 12, 14, 3, C.sky)).join("") + rect(-10, 14, 20, 26, 4, C.blue) + rect(-56, 38, 112, 6, 3, C.greyDark);
  P.shop = ({ awning = C.red } = {}) => shadedPath("M-46-20h92v60h-92Z", "#fff", C.grey) + [...Array(6)].map((_, i) => path(`M${-48 + i * 16} -36h16v16a8 8 0 0 1-16 0Z`, i % 2 ? "#fff" : awning)).join("") +
    rect(-38, -6, 40, 30, 4, C.sky) + g(P.apple(), { x: -26, y: 10, s: 0.3 }) + g(P.bread(), { x: -8, y: 12, s: 0.25 }) + rect(10, -6, 26, 46, 4, C.blue) + rect(-48, -44, 96, 10, 4, shadeOf(awning));
  P.supermarket = () => P.shop({ awning: C.green }) + g(P.cart(), { x: 36, y: 34, s: 0.4 });
  P.cart = ({ full = true } = {}) => (full ? g(P.apple(), { x: -6, y: -22, s: 0.36 }) + g(P.bread(), { x: 14, y: -20, s: 0.32 }) + g(P.milk(), { x: -20, y: -18, s: 0.32 }) : "") +
    line("M-48-36h12l10 44h46l8-34h-62", C.greyDark, 5) + line("M-22-16h56M-18-2h48", C.grey, 3) + circ(-20, 20, 7, C.ink) + circ(18, 20, 7, C.ink);
  P.counter = () => shadedPath("M-50 0h100v40h-100Z", C.wood, C.woodDark) + rect(-54, -6, 108, 10, 4, "#efc287") + rect(-40, -60, 80, 52, 6, "#e3f3ff", ' opacity=".8"') + rect(-12, -16, 24, 10, 3, "#fff") + circ(28, -10, 6, C.yellow) + line("M28-16v-4", C.ink, 2);
  P.library = () => shadedPath("M-48-30h96v70h-96Z", C.wood, C.woodDark) + [0, 1, 2].map((r) => rect(-42, -24 + r * 22, 84, 18, 2, "#f3d29e") + [...Array(9)].map((_, i) => rect(-40 + i * 9, -22 + r * 22 + (i % 3), 7, 16 - (i % 3), 2, [C.red, C.blue, C.green, C.yellow, C.purple, C.oranje][(i + r) % 6])).join("")).join("");
  P.bookshelf = () => P.library();
  P.blackboard = ({ content = "" } = {}) => box(-48, -34, 96, 62, 6, C.wood, C.woodDark) + rect(-42, -28, 84, 50, 4, "#2f6b4f") + content + rect(-30, 26, 24, 4, 2, "#fff");
  P.buurthuis = () => shadedPath("M-48-16h96v56h-96Z", C.yellow, C.yellowDark) + sp("M-54-16L0-44 54-16", C.red, 8) + circ(0, -24, 8, "#fff") + sym.heart(0, -24, 0.42) + rect(-36, -4, 24, 20, 4, C.sky) + rect(12, -4, 24, 20, 4, C.sky) + rect(-10, 10, 20, 30, 10, C.green) + rect(-56, 38, 112, 6, 3, C.greyDark);
  P.pickupPoint = () => shadedPath("M-46-22h92v62h-92Z", "#fff", C.grey) + rect(-46, -34, 92, 14, 5, C.oranje) + g(P.box(), { x: -20, y: 12, s: 0.5 }) + g(P.box(), { x: 14, y: 16, s: 0.4 }) + g(P.box(), { x: -2, y: -4, s: 0.36 });
  P.ticketMachine = () => shadedPath("M-28-46h56v92h-56Z", C.blue, C.blueDark) + rect(-20, -38, 40, 26, 4, "#9ff0b5") + line("M-14-26h24", C.greenDark, 3) + [...Array(6)].map((_, i) => rect(-18 + (i % 3) * 13, -4 + Math.floor(i / 3) * 11, 9, 7, 2, "#fff")).join("") + rect(-12, 24, 24, 5, 2.5, C.ink) + g(P.ticket(), { x: 0, y: 34, s: 0.3 });
  P.playground = () => line("M-40 40l14-60 14 60M24 40V-14", C.red, 6) + line("M-26-20h50", C.red, 6) + line("M10-20v26M24-20v26", C.greyDark, 2) + rect(6, 6, 22, 5, 2, C.yellow) + path("M-30 40l40-30h8L-20 40Z", C.blue);
  P.toys = () => g(box(-16, -16, 32, 32, 5, C.red, C.redDark) + text(0, 9, "A", { size: 22, fill: "#fff" }), { x: -22, y: 10 }) + g(box(-14, -14, 28, 28, 5, C.blue, C.blueDark) + text(0, 8, "B", { size: 20, fill: "#fff" }), { x: 12, y: 14 }) + circ(26, -18, 14, C.yellow) + line("M14-18h24M26-32v28", C.oranje, 3);
  P.flag = ({ c = C.oranje } = {}) => rect(-3, -44, 6, 90, 3, C.greyDark) + sp("M3-42h40l-8 14 8 14H3Z", c, 4);
  P.nlFlag = () => rect(-3, -44, 6, 90, 3, C.greyDark) + rect(3, -42, 46, 12, 0, "#ae1c28") + rect(3, -30, 46, 12, 0, "#fff") + rect(3, -18, 46, 12, 0, "#21468b");
  P.pin = ({ c = C.red } = {}) => shadedPath("M0 40C-6 22-26 8-26-14a26 26 0 0 1 52 0C26 8 6 22 0 40Z", c, shadeOf(c)) + circ(0, -14, 10, "#fff");
  P.map = () => g(path("M-46-30l30-10 32 10 30-10v70l-30 10-32-10-30 10Z", C.greenSoft) + path("M-16-40l32 10v70l-32-10Z", "#c9efd3") + line("M-40 10q20-20 40 0t40-10", C.blue, 4) + line("M-30-20l20 30 30-10", "#fff", 4), { y: 4 }) + g(P.pin(), { x: 14, y: -14, s: 0.42 });
  P.globe = () => circ(-3, 3, 40, C.blueDark) + circ(0, 0, 40, C.blue) + path("M-20-30q14-4 20 6t-6 18 4 16-14 12q-10-12-18-24t14-28Z", C.green) + path("M14-22q16 4 22 20t-10 22q-8-14-14-20t2-22Z", C.green) + shine(-18, -18, 6, 12);
  P.signal = ({ bars = 4 } = {}) => [0, 1, 2, 3].map((i) => rect(-24 + i * 14, 20 - i * 14, 10, 14 + i * 14, 4, i < bars ? C.green : C.greyLight)).join("");

  /* ---------- Nature & weather ---------- */
  P.sun = ({ face = true } = {}) => [...Array(10)].map((_, i) => g(rect(-4, -46, 8, 14, 4, C.yellow), { r: i * 36 })).join("") + circ(0, 0, 28, C.yellowDark) + circ(1.5, -1.5, 27, C.yellow) +
    (face ? circ(-9, -3, 3, C.ink) + circ(9, -3, 3, C.ink) + line("M-8 8q8 7 16 0", C.ink, 2.6) + circ(-16, 6, 4, C.oranje, ' opacity=".5"') + circ(16, 6, 4, C.oranje, ' opacity=".5"') : "");
  P.moon = () => path("M10-34a34 34 0 1 0 22 52A28 28 0 0 1 10-34Z", C.yellow) + sym.star(30, -24, 0.6) + sym.star(36, 10, 0.4);
  P.cloud = ({ c = "#fff" } = {}) => path("M-36 16a14 14 0 0 1 2-28 20 20 0 0 1 38-6 16 16 0 0 1 28 10 13 13 0 0 1 2 24Z", c);
  P.rainCloud = () => g(P.cloud({ c: C.greyDark }), { y: -12 }) + [-24, -6, 12, 28].map((x, i) => sym.drop(x, 22 + (i % 2) * 12, 0.8)).join("");
  P.snow = () => g(P.cloud({ c: C.grey }), { y: -14 }) + [-22, 0, 22, -10, 12].map((x, i) => g(line("M-6 0h12M0-6v12M-4-4l8 8M4-4l-8 8", "#9fd6ff", 2.4), { x, y: 20 + (i > 2 ? 16 : 0) })).join("");
  P.sunrise = () => g(P.sun({ face: false }), { y: 18, s: 0.7 }) + rect(-48, 18, 96, 30, 0, C.green) + path("M-48 18q24-8 48 0t48 0v4h-96Z", C.leaf);
  P.grass = () => path("M-50 10q25-10 50 0t50 0v30h-100Z", C.green) + line("M-36 6l-3-10M-32 6l2-12M20 6l-2-12M24 6l4-10", C.greenDark, 3);
  P.garden = () => P.grass() + g(P.tulip({ c: C.red }), { x: -24, y: -10, s: 0.7 }) + g(P.tulip({ c: C.yellow }), { x: -6, y: -14, s: 0.7 }) + g(P.tulip({ c: C.pink }), { x: 12, y: -10, s: 0.7 }) + g(P.tree(), { x: 34, y: -24, s: 0.6 });
  P.fence = () => [...Array(6)].map((_, i) => path(`M${-44 + i * 16} 30v-40l6-8 6 8v40Z`, "#fff")).join("") + rect(-48, -4, 96, 6, 2, "#e6e9ef") + rect(-48, 14, 96, 6, 2, "#e6e9ef");
  P.puddle = () => ell(0, 0, 44, 10, "#9fd6ff") + ell(-10, -2, 14, 3, "#d2ecff");
  P.snail = () => line("M-40 20h70q10 0 12-10", "#9fdc8a", 12) + circ(-6, -2, 22, C.oranje) + path("M-6-2m-14 0a14 14 0 1 1 28 0a8 8 0 1 1-16 0a3 3 0 1 1 6 0", "none", ` stroke="${C.oranjeDark}" stroke-width="4" stroke-linecap="round"`) +
    line("M36 4l6-18M42 6l10-14", "#9fdc8a", 4) + circ(42, -14, 3.4, C.ink) + circ(52, -8, 3.4, C.ink);
  P.rocket = () => g(shadedPath("M0-44c14 12 18 34 14 58h-28c-4-24 0-46 14-58Z", "#fff", C.grey) + circ(0, -10, 8, C.sky) + path("M-14 2l-12 20h12ZM14 2l12 20h-12Z", C.red) + path("M-8 14h16l-8 22Z", C.oranje), { r: 30 });

  /* ---------- Body ---------- */
  P.eye = () => path("M-46 0q46-44 92 0-46 44-92 0Z", "#fff") + circ(0, 0, 20, C.blue) + circ(0, 0, 10, C.ink) + circ(6, -6, 5, "#fff") + line("M-46 0q46-44 92 0", C.ink, 4) + line("M-30-20l-6-10M-12-26l-2-12M8-27l2-12M28-21l6-10", C.ink, 3.4);
  P.ear = () => shadedPath("M-10-40c22-6 40 8 38 34-2 18-14 20-16 32-2 12-12 16-22 10", "#e8b48a", "#d1966a") + line("M4-24c10 0 14 10 10 20", "#d1966a", 4);
  P.zap = ({ c = C.yellow } = {}) => sp("M4-20L-8 2h10L-4 20 10-4H0Z", c, 3);
  P.heart = ({ c = C.red } = {}) => g(sym.heart(0, 0, 3.2, c));
  P.muscle = () => sp("M-30 20c-6-30 6-46 18-44 6 2 4 12-2 14 0 8 10 12 18 8 18-8 30 0 28 16-2 14-20 18-40 14-10-2-18-4-22-8Z", "#e8b48a", 4) + line("M2 8q8-6 14 0", "#d1966a", 3);

  /* ---------- Misc symbols ---------- */
  P.gift = ({ c = C.purple } = {}) => shadedPath("M-34-10h68v48h-68Z", c, shadeOf(c)) + rect(-38, -22, 76, 14, 4, shadeOf(c, 0.9)) + rect(-6, -22, 12, 60, 0, C.yellow) + sp("M0-22c-6-18-24-18-22-6 2 6 14 6 22 6ZM0-22c6-18 24-18 22-6-2 6-14 6-22 6Z", C.yellow, 3);
  P.balloons = () => line("M-14 10q-6 20 4 40M10 4q4 24 0 46", C.greyDark, 1.6) + ell(-14, -18, 18, 22, C.red) + ell(12, -26, 18, 22, C.blue) + ell(28, 0, 14, 17, C.yellow) + shine(-20, -26, 3, 6) + shine(6, -34, 3, 6);
  P.cake = ({ candles = 3 } = {}) => shadedPath("M-38-4h76v40h-76Z", C.pinkSoft, "#f3b7d2") + path("M-38-4h76v10q-6 8-12 0t-13 0-13 0-13 0-13 0-12 0Z", C.pink) + rect(-44, 34, 88, 6, 3, C.greyLight) +
    [...Array(candles)].map((_, i) => { const x = -((candles - 1) * 12) / 2 + i * 12; return rect(x - 3, -22, 6, 18, 2, [C.blue, C.yellow, C.green, C.purple, C.oranje][i % 5]) + path(`M${x} -34q5 6 0 10-5-4 0-10Z`, C.oranje); }).join("");
  P.trophy = () => path("M-24-36h48v16c0 18-10 28-24 28S-24-2-24-20Z", C.yellow) + line("M-24-28h-10q0 18 14 18M24-28h10q0 18-14 18", C.yellow, 5) + rect(-5, 8, 10, 14, 2, C.yellowDark) + rect(-20, 22, 40, 12, 4, C.brown) + sym.star(0, -16, 0.7, "#fff");
  P.shield = ({ c = C.green, inner } = {}) => shadedPath("M0-44l38 12v18c0 28-16 46-38 58-22-12-38-30-38-58v-18Z", c, shadeOf(c)) + (inner ?? line("M-14 0l10 10 20-22", "#fff", 7));
  P.puzzle = () => shadedPath("M-36-36h24a8 8 0 1 1 16 0h32v24a8 8 0 1 0 0 16v32h-32a8 8 0 1 1-16 0h-24v-32a8 8 0 1 0 0-16Z", C.purple, C.purpleDark);
  P.swapArrows = ({ c = C.blue } = {}) => line("M-30-12h50", c, 8) + path("M16-26l18 14-18 14Z", c) + line("M30 14h-50", C.oranje, 8) + path("M-16 0l-18 14 18 14Z", C.oranje);
  P.loopArrow = ({ c = C.green } = {}) => path("M0-34a34 34 0 1 1-30 18", "none", ` stroke="${c}" stroke-width="9" stroke-linecap="round"`) + path("M-44-26l14 22 18-16Z", c);
  P.backArrow = ({ c = C.blue } = {}) => path("M30 30V0q0-18-18-18h-34", "none", ` stroke="${c}" stroke-width="10" stroke-linecap="round"`) + path("M-18-36l-22 18 22 18Z", c);
  P.playButton = () => circ(-3, 3, 38, C.greenDark) + circ(0, 0, 38, C.green) + sp("M-10-18l26 18-26 18Z", "#fff", 5);
  P.stopHand = () => sp("M-20 30v-46q0-6 6-6t6 6v-14q0-6 6-6t6 6v10q0-6 6-6t6 6v10q0-6 6-6t6 6v34q0 20-22 24h-6q-14 0-22-12l-12-16q-4-6 2-10t10 2Z", "#f6d2b4", 3);
  P.thumbsUp = ({ c = "#f6d2b4" } = {}) => sp("M-26-4h12v40h-12ZM-10-2l14-26q2-10 10-6 6 4 2 16l-2 10h20q8 0 8 8l-6 28q-2 8-10 8h-36Z", c, 4) + rect(-28, -6, 16, 44, 4, C.blue);
  P.lightbulbIdea = () => P.bulb() + line("M-44-30l-10-6M44-30l10-6M-48 0h-12M48 0h12M0-58v-10", C.yellowDark, 4);
  P.palette = () => shadedPath("M0-38c26 0 44 14 44 32 0 10-8 14-16 12-8-2-14 2-12 10 2 10-6 20-18 20-26 0-42-18-42-38s18-36 44-36Z", C.wood, C.woodDark) +
    circ(-22, -12, 7, C.red) + circ(-6, -24, 7, C.yellow) + circ(14, -22, 7, C.green) + circ(28, -8, 6, C.blue) + circ(-24, 10, 7, C.purple) + g(rect(-3, -40, 6, 50, 3, C.wood) + path("M-4 10h8l-4 14Z", C.red), { x: 30, y: 20, r: 30 });
  P.colourDots = () => [C.red, C.oranje, C.yellow, C.green, C.blue, C.purple].map((c, i) => circ(-40 + i * 16, Math.sin(i) * 6, 9, c)).join("");
  P.letterTile = ({ ch = "A", c = C.blue, fg = "#fff", size = 1 } = {}) => box(-34 * size, -34 * size, 68 * size, 68 * size, 14 * size, c, shadeOf(c), 6 * size) + rect(-28 * size, -30 * size, 30 * size, 6 * size, 3, "#ffffff40") + text(0, 18 * size, ch, { size: 52 * size, fill: fg });
  P.numberTile = ({ num = 1, c = C.blue } = {}) => {
    const ch = String(num), fs = [52, 46, 34][Math.min(ch.length, 3) - 1];
    return K.box(-34, -34, 68, 68, 14, c, shadeOf(c), 6) + rect(-28, -30, 30, 6, 3, "#ffffff40") + text(0, fs * 0.36, ch, { size: fs, fill: "#fff" });
  };
  P.dots = ({ count = 3, c = C.oranje, r = 7, cols = 5 } = {}) => [...Array(count)].map((_, i) => circ((i % cols) * 18 - ((Math.min(count, cols) - 1) * 18) / 2, Math.floor(i / cols) * 18, r, c)).join("");
  P.chatBubbles = () => K.bubble(-46, -38, 56, 34, rect(-38, -26, 40, 4, 2, C.grey) + rect(-38, -18, 28, 4, 2, C.grey)) + K.bubble(-6, -2, 54, 34, rect(2, 10, 38, 4, 2, "#fff") + rect(2, 18, 26, 4, 2, "#fff"), { tail: "right", fill: C.green, shade: C.greenDark });
  P.noise = () => g(sp("M-10-16h10l16-14v60l-16-14h-10Z", C.greyDark, 4), { x: -22 }) + sym.waves(10, 0, 1.4, C.red) + g(P.zap(), { x: 40, y: -24, s: 0.8 });
  P.megaphone = () => sp("M-30-10h14l30-20v60l-30-20h-14Z", C.red, 4) + rect(-26, 10, 10, 18, 4, C.redDark) + sym.waves(28, 0, 1.2, C.oranje);
  P.target = () => circ(0, 0, 40, C.red) + circ(0, 0, 30, "#fff") + circ(0, 0, 20, C.red) + circ(0, 0, 10, "#fff") + circ(0, 0, 4, C.red);
  P.qMarks = () => sym.question(-16, 0, 1.2) + sym.question(22, -18, 0.8, C.blue);
  P.speaker = () => sp("M-30-12h14l20-18v60l-20-18h-14Z", C.blue, 4) + sym.waves(12, 0, 1.2, C.blue);
  P.housePrice = () => P.house() + g(P.coin(), { x: 32, y: 28, s: 0.8 });
  P.photoFrame = () => box(-40, -32, 80, 64, 6, C.wood, C.woodDark) + rect(-34, -26, 68, 52, 3, C.sky) + path("M-34 26l22-24 16 16 10-10 20 18Z", C.green) + circ(18, -12, 7, C.yellow);
  P.tv = () => box(-46, -32, 92, 58, 8, C.ink, "#000") + rect(-40, -26, 80, 46, 4, C.sky) + line("M-16 32l-6 10M16 32l6 10", C.ink, 4);
  P.badgeStar = () => circ(0, 0, 30, C.yellow) + sym.star(0, 0, 2, "#fff");

  return P;
});
