/* Wide Pim scenes (960×540) used as lesson topic headers. Each is a little Dutch street moment:
   a sky, a ground line, Pim and the cast doing the topic. */
(function (root, factory) {
  const node = typeof module === "object" && module.exports;
  const api = factory(node ? require("./kit.js") : root.PimArt, node ? require("./props.js") : root.PimProps, node ? require("./cast.js") : root.PimCast);
  if (node) module.exports = api;
  else root.PimScenes = api;
})(typeof self !== "undefined" ? self : this, (K, P, ctx) => {
  const { C, g, rect, circ, ell, line, text, pim, sym, bubble } = K;
  const { who } = ctx;
  const W = 960, H = 540, GROUND = 452;

  function backdrop({ sky = "#cfeaff", ground = C.green, far = true, houses = [] } = {}) {
    const clouds = g(P.cloud(), { x: 170, y: 96, s: 1.3 }) + g(P.cloud(), { x: 760, y: 70, s: 1 }) + g(P.cloud(), { x: 560, y: 130, s: 0.7 });
    const skyline = far ? g([...Array(12)].map((_, i) => rect(i * 84, 300 - (i % 3) * 30 - (i % 2) * 20, 72, 200, 6, "#b9d9f3")).join(""), {}) : "";
    const row = houses.map(([x, wall, gable, w = 120, h = 230]) => g(P.canalHouse({ wall, w, h, gable }), { x, y: GROUND - h / 2 })).join("");
    return rect(0, 0, W, H, 0, sky) + clouds + skyline + row +
      rect(0, GROUND, W, H - GROUND, 0, ground) + rect(0, GROUND, W, 10, 0, K.shadeOf(ground, 0.85));
  }
  const svg = (title, inner) => K.svg(W, H, inner, title);

  const topics = () => ({
    "letters-first-words": svg("Pim learns his first letters", backdrop({ sky: "#efe7ff", ground: "#f3d9b5" }) +
      g(P.blackboard({ content: "" }), { x: 330, y: 230, s: 3.2 }) +
      g(P.letterTile({ ch: "a", c: C.red }), { x: 250, y: 220, s: 0.9 }) + g(P.letterTile({ ch: "b", c: C.blue }), { x: 340, y: 236, s: 0.9 }) + g(P.letterTile({ ch: "c", c: C.green }), { x: 430, y: 220, s: 0.9 }) +
      pim({ x: 640, y: GROUND + 6, s: 2.4, mood: "happy", arms: "point", flip: true }) + g(P.book({ open: true }), { x: 830, y: GROUND - 20, s: 1.2 }) + sym.sparkle(560, 110, 2) + sym.star(880, 120, 1.6)),
    "people-family": svg("Pim meets the family next door", backdrop({ houses: [[110, C.brick, "step"], [250, C.teal, "bell"], [770, C.yellow, "point"], [890, C.red, "step"]] }) +
      who("imran", { x: 380, y: GROUND + 4, s: 1.7, mood: "happy", arms: "hug" }) + who("ayesha", { x: 610, y: GROUND + 4, s: 1.7, mood: "happy", arms: "wave", flip: true }) +
      who("ali", { x: 460, y: GROUND + 6, s: 1.5, mood: "happy", arms: "cheer" }) + who("sara", { x: 530, y: GROUND + 6, s: 1.5, mood: "happy" }) +
      pim({ x: 740, y: GROUND + 8, s: 1.5, mood: "happy", arms: "wave", flip: true }) + sym.heart(495, 110, 2.2)),
    "home-place": svg("Pim at home", rect(0, 0, W, H, 0, "#fff4e6") + rect(0, 0, W, 360, 0, "#dff0ff") + rect(0, 360, W, 180, 0, C.wood) + rect(0, 360, W, 12, 0, C.woodDark) +
      g(P.window(), { x: 220, y: 190, s: 1.9 }) + g(P.sofa(), { x: 470, y: 380, s: 2.2 }) + g(P.lamp(), { x: 760, y: 330, s: 2 }) + g(P.plant(), { x: 110, y: 400, s: 1.5 }) +
      pim({ x: 470, y: 392, s: 1.5, mood: "happy", arms: "wave" }) + g(P.photoFrame(), { x: 700, y: 150, s: 1.2 }) + g(P.key(), { x: 860, y: 470, s: 0.8, r: -20 })),
    "transport-routine": svg("Pim cycles to the station", backdrop({ sky: "#d6eeff", ground: "#8a93a8" }) + rect(0, GROUND + 40, W, 6, 0, "#fff") +
      g(P.station(), { x: 720, y: GROUND - 76, s: 2.6 }) + g(P.busStop(), { x: 470, y: GROUND - 70, s: 1.6 }) + g(P.trafficLight({ on: "green" }), { x: 120, y: GROUND - 80, s: 1.6 }) +
      `<g transform="translate(260 ${GROUND + 12}) scale(1.4) translate(-120 -182)">${K.parts.rider({ mood: "happy" })}</g>` + sym.motion(130, GROUND - 60, 2)),
    "body-health": svg("Pim visits the doctor", backdrop({ sky: "#e6f7f1", ground: "#cdeee0", far: false }) +
      g(P.hospital(), { x: 790, y: GROUND - 112, s: 2.6 }) + who("dokter", { x: 520, y: GROUND + 4, s: 1.7, mood: "happy", arms: "wave", flip: true, extra: g(P.stethoscope(), { y: -78, s: 0.42 }) }) +
      pim({ x: 300, y: GROUND + 6, s: 1.8, mood: "happy", arms: "belly" }) + g(P.firstAid(), { x: 110, y: GROUND - 30, s: 1.1 }) + sym.heart(400, 140, 2)),
    "daily-services": svg("Pim runs errands in town", backdrop({ houses: [[90, C.brick, "step"], [870, C.teal, "bell"]] }) +
      g(P.townHall(), { x: 300, y: GROUND - 110, s: 2.6 }) + g(P.shop(), { x: 640, y: GROUND - 82, s: 2 }) +
      who("femke", { x: 790, y: GROUND + 4, s: 1.4, mood: "happy", arms: "hold", hold: g(P.shoppingBag(), { s: 0.5 }) }) +
      pim({ x: 480, y: GROUND + 6, s: 1.5, mood: "happy", arms: "holdUp", hold: g(P.form(), { s: 0.55 }) })),
    "sentence-practice": svg("Pim puts words in order", backdrop({ sky: "#fff1d6", ground: "#ffe0b8", far: false }) +
      [C.blue, C.green, C.oranje, C.purple].map((c, i) => g(K.box(-62, -32, 124, 64, 18, c, K.shadeOf(c), 8) + rect(-36, -6, 72, 12, 6, "#ffffff99"), { x: 162 + i * 212, y: 200, r: i % 2 ? 3 : -3 })).join("") +
      [0, 1, 2].map((i) => sym.arrow(268 + i * 212, 200, 1.1, 0, C.greyDark)).join("") +
      pim({ x: 480, y: GROUND + 6, s: 1.35, mood: "happy", arms: "cheer" }) + sym.check(800, 340, 2.2) + sym.sparkle(170, 330, 1.6) + sym.star(690, 330, 1.4))
  });

  return { topics, backdrop, W, H, GROUND };
});
