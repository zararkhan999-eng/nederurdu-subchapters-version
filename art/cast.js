/* The recurring cast and composition helpers that the word pictures share. A family (Ayesha, Imran,
   Sara, Ali) and their Dutch neighbours appear across lessons, so learners meet the same faces. */
(function (root, factory) {
  const node = typeof module === "object" && module.exports;
  const make = factory(node ? require("./kit.js") : root.PimArt, node ? require("./props.js") : root.PimProps);
  if (node) module.exports = make;
  else root.PimCast = make;
})(typeof self !== "undefined" ? self : this, (K, P) => {
  const { C, g } = K;
  const CAST = {
    ayesha: { hijab: C.teal, skin: 2, top: C.purple, bottomType: "long", bottom: "#4a3a6a" },
    imran: { beard: "black", hairStyle: "short", skin: 2, top: C.green, bottom: "#3a4766" },
    sara: { kid: true, hairStyle: "ponytail", skin: 2, top: C.pink, bottomType: "skirt", bottom: C.purple },
    ali: { kid: true, hairStyle: "short", skin: 2, top: C.yellow, bottom: C.blue },
    femke: { hairStyle: "long", hair: "blond", skin: 0, top: C.red, bottom: "#3a4766" },
    jan: { hairStyle: "bald", hair: "grey", glasses: true, skin: 0, top: C.blue, bottom: "#5b4a3a" },
    dokter: { hairStyle: "curly", skin: 3, coat: "#ffffff", top: C.blue, glasses: true },
    docent: { hairStyle: "bun", hair: "brown", skin: 1, top: C.oranje, bottomType: "skirt", bottom: "#3a4766" },
    collega: { hairStyle: "short", skin: 4, top: C.teal },
    bezorger: { hat: "cap", skin: 1, top: C.oranje, bottom: "#3a4766" },
    monteur: { hat: "helmet", skin: 3, top: C.oranje, bottom: C.blueDark },
    baas: { hairStyle: "short", hair: "grey", skin: 1, top: "#3a4766", coat: "#3a4766", bottom: "#2a2f45" },
    bram: { hairStyle: "spiky", hair: "red", skin: 0, top: C.green, bottom: "#3a4766" },
    noor: { hairStyle: "long", hair: "black", skin: 3, top: C.yellow, bottomType: "skirt", bottom: C.teal }
  };

  return function makeCtx() {
    const who = (name, opts = {}) => K.person({ ...CAST[name], ...opts });
    // A prop alone, big and centred on the stage.
    const solo = (prop, { s = 1.55, y = 116, x = 120, r = 0 } = {}) => g(prop, { x, y, s, r });
    // Pim beside a prop; Pim reacts on the left, the prop is the star on the right.
    const pimAnd = (prop, { s = 1.1, ps = 0.95, px = 172, py = 128, mood = "happy", arms = "point", pimX = 74, flip = false } = {}) =>
      K.pim({ x: pimX, y: 204, s: ps, mood, arms }) + g(prop, { x: px, y: py, s, flip });
    const floor = (y = 204) => K.ell(120, y, 86, 9, C.shadow);
    return { K, P, C, CAST, who, solo, pimAnd, floor, g };
  };
});
