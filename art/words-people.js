/* Word pictures: people, the body and health, and everyday situations. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory;
  else (root.PimWordSets = root.PimWordSets || []).push(factory);
})(typeof self !== "undefined" ? self : this, ({ K, P, C, who, solo, g }) => {
  const { pim, sym, line, rect, circ, ell, text, bubble, thought } = K;
  const focus = (x, y, r = 30, c = C.oranje) => circ(x, y, r, "none", ` stroke="${c}" stroke-width="5" stroke-dasharray="2 9" stroke-linecap="round"`);
  const desk = (y = 176) => g(rect(-90, 0, 180, 12, 6, C.wood) + rect(-82, 12, 10, 30, 4, C.woodDark) + rect(72, 12, 10, 30, 4, C.woodDark), { x: 120, y });
  const sickPim = (extra = "", o = {}) => pim({ x: 120, y: 204, s: 1.15, mood: "sad", arms: "rest", ...o }) + extra;
  return {
    /* People */
    man: () => who("imran", { x: 120, y: 208, s: 1.05, mood: "happy", arms: "wave" }),
    vrouw: () => who("femke", { x: 120, y: 208, s: 1.05, mood: "happy", arms: "wave" }),
    kind: () => who("ali", { x: 120, y: 208, s: 1.25, mood: "happy", arms: "cheer" }) + sym.sparkle(186, 72, 1),
    jongen: () => who("imran", { x: 82, y: 208, s: 0.95, arms: "hug", mood: "happy" }) + who("ali", { x: 152, y: 208, s: 1, mood: "happy", arms: "wave" }) + focus(152, 104, 34),
    meisje: () => who("ayesha", { x: 82, y: 208, s: 0.95, arms: "hug", mood: "happy" }) + who("sara", { x: 152, y: 208, s: 1, mood: "happy", arms: "wave" }) + focus(152, 104, 34),
    familie: () => who("imran", { x: 58, y: 208, s: 0.86, mood: "happy", arms: "hug" }) + who("ayesha", { x: 182, y: 208, s: 0.86, mood: "happy", arms: "hug", flip: true }) +
      who("ali", { x: 102, y: 210, s: 0.8, mood: "happy" }) + who("sara", { x: 140, y: 210, s: 0.8, mood: "happy" }) + sym.heart(120, 50, 1.1),
    vader: () => who("imran", { x: 98, y: 208, s: 1, mood: "happy", arms: "hug" }) + who("ali", { x: 160, y: 208, s: 0.86, mood: "happy", flip: true }) + focus(96, 70, 32),
    moeder: () => who("ayesha", { x: 98, y: 208, s: 1, mood: "happy", arms: "hug" }) + who("sara", { x: 160, y: 208, s: 0.86, mood: "happy", flip: true }) + focus(96, 70, 32),
    broer: () => who("ali", { x: 88, y: 208, s: 1.05, mood: "happy", arms: "hug" }) + who("ali", { x: 160, y: 208, s: 0.9, mood: "happy", top: C.green, hairStyle: "curly", flip: true }),
    zus: () => who("sara", { x: 88, y: 208, s: 1.05, mood: "happy", arms: "hug" }) + who("sara", { x: 160, y: 208, s: 0.9, mood: "happy", top: C.teal, hairStyle: "long", flip: true }),
    ouder: () => who("imran", { x: 70, y: 208, s: 0.92, mood: "happy", arms: "hug" }) + who("ayesha", { x: 170, y: 208, s: 0.92, mood: "happy", arms: "hug", flip: true }) + who("sara", { x: 120, y: 210, s: 0.76, mood: "happy", arms: "cheer" }),
    docent: () => g(P.blackboard({ content: line("M-24-6q10-10 20 0t20 0", "#fff", 3) + circ(24, 4, 6, "none", ' stroke="#fff" stroke-width="3"') }), { x: 158, y: 100, s: 0.95 }) + who("docent", { x: 82, y: 208, s: 1, mood: "happy", arms: "point" }),
    collega: () => who("collega", { x: 80, y: 208, s: 0.95, mood: "happy", arms: "give", hold: g(P.document(), { s: 0.3 }) }) + who("imran", { x: 166, y: 208, s: 0.95, mood: "happy", arms: "hold", flip: true, top: "#3a4766" }) + g(P.badge(), { x: 80, y: 130, s: 0.22 }) + g(P.badge(), { x: 166, y: 130, s: 0.22 }),
    buurvrouw: () => g(P.house({ wall: C.teal }), { x: 64, y: 140, s: 0.95 }) + who("femke", { x: 160, y: 208, s: 0.98, mood: "happy", arms: "wave", flip: true }),
    buurman: () => g(P.house({ wall: C.teal }), { x: 64, y: 140, s: 0.95 }) + who("jan", { x: 160, y: 208, s: 0.98, mood: "happy", arms: "wave", flip: true }),
    monteur: () => who("monteur", { x: 104, y: 208, s: 1.02, mood: "happy", arms: "holdUp", hold: g(P.wrench(), { s: 0.55 }) }) + g(P.toolbox(), { x: 176, y: 184, s: 0.6 }),
    baas: () => g(P.briefcase(), { x: 178, y: 186, s: 0.55 }) + who("baas", { x: 112, y: 208, s: 1.05, mood: "idle", arms: "hips" }) + sym.star(176, 64, 0.9),
    leidinggevende: () => who("noor", { x: 92, y: 208, s: 1.0, mood: "happy", arms: "point", hold: "" }) + g(P.rooster(), { x: 178, y: 104, s: 0.6 }) + g(P.badge({ c: C.purple }), { x: 92, y: 128, s: 0.24 }),
    bezorger: () => who("bezorger", { x: 104, y: 208, s: 1.0, mood: "happy", arms: "holdBoth", holdAt: "mid", hold: g(P.parcel(), { s: 0.5 }) }) + g(P.truck(), { x: 188, y: 172, s: 0.5 }),
    dokter: () => who("dokter", { x: 120, y: 208, s: 1.05, mood: "happy", arms: "wave", extra: g(P.stethoscope(), { x: 0, y: -78, s: 0.42 }) }) + g(P.firstAid(), { x: 194, y: 184, s: 0.45 }),

    /* Body and health */
    oog: () => solo(P.eye(), { s: 1.55, y: 120 }),
    hoofd: () => pim({ x: 120, y: 236, s: 1.6, mood: "happy", arms: "head" }) + focus(122, 108, 54),
    buik: () => pim({ x: 120, y: 214, s: 1.4, mood: "happy", arms: "belly" }) + focus(124, 158, 36),
    pijn: () => sickPim(g(P.zap({ c: C.red }), { x: 176, y: 140, s: 1.4 }) + g(P.zap({ c: C.red }), { x: 60, y: 120, s: 1 }), { arms: "belly" }),
    hoofdpijn: () => sickPim(g(P.zap({ c: C.red }), { x: 70, y: 52, s: 1.2 }) + g(P.zap({ c: C.red }), { x: 176, y: 48, s: 1.2 }), { arms: "head" }),
    buikpijn: () => sickPim(g(P.zap({ c: C.red }), { x: 176, y: 148, s: 1.2 }) + g(P.zap({ c: C.red }), { x: 70, y: 150, s: 1 }), { arms: "belly" }),
    hoesten: () => pim({ x: 104, y: 204, s: 1.15, mood: "sad", arms: "cover" }) + g(P.cloud({ c: C.greyLight }), { x: 186, y: 96, s: 0.6 }) + sym.motion(204, 120, 1),
    koorts: () => pim({ x: 104, y: 204, s: 1.15, mood: "sad", arms: "hold", hold: g(P.thermometer(), { s: 0.38 }) }) + sym.drop(84, 70, 0.9) + g(P.thermometer(), { x: 190, y: 104, s: 0.8 }),
    ziek: () => ({ body: g(P.bed(), { x: 120, y: 166, s: 1.5 }) + `<g transform="translate(110 150) rotate(-90) scale(.62) translate(-140 -44)">${K.parts.head({ mood: "sad" })}</g>` + g(P.thermometer(), { x: 186, y: 86, s: 0.6 }) + g(P.pills(), { x: 60, y: 92, s: 0.5 }), sky: "#f2f7ff" }),
    rust: () => g(P.sofa(), { x: 120, y: 160, s: 1.35 }) + pim({ x: 116, y: 158, s: 0.92, pose: "sleep" }),
    slaap: () => ({ body: g(P.moon(), { x: 186, y: 64, s: 0.6 }) + g(P.bed(), { x: 120, y: 166, s: 1.5 }) + pim({ x: 118, y: 156, s: 0.9, pose: "sleep" }), sky: "#e9e7ff" }),
    moe: () => pim({ x: 120, y: 204, s: 1.2, mood: "sleepy", arms: "rest" }) + sym.drop(166, 64, 1) + g(K.text(0, 0, "z", { size: 22, fill: C.blue }), { x: 190, y: 56 }),
    honger: () => pim({ x: 90, y: 204, s: 1.05, mood: "sad", arms: "belly" }) + thought(138, 40, 84, 60, g(P.plate({ food: g(P.bread(), { s: 0.5, y: -6 }) }), { x: 180, y: 74, s: 0.66 })),
    dorst: () => pim({ x: 90, y: 204, s: 1.05, mood: "sad", arms: "think" }) + thought(138, 40, 84, 60, g(P.glass(), { x: 180, y: 70, s: 0.52 })) + sym.drop(56, 80, 1, C.yellow),

    /* Places for help and services */
    huisarts: () => g(P.counter(), { x: 120, y: 166, s: 0.9 }) + who("dokter", { x: 74, y: 208, s: 0.88, mood: "happy", arms: "wave" }) + pim({ x: 176, y: 204, s: 0.8, mood: "idle", arms: "rest", flip: true }) + g(P.firstAid(), { x: 186, y: 66, s: 0.45 }),
    tandarts: () => solo(P.tooth(), { s: 1.4, y: 118 }) + g(P.toothbrush(), { x: 176, y: 168, s: 0.8, r: -30 }) + sym.sparkle(64, 70, 1.1),
    apotheek: () => solo(P.pharmacy(), { s: 1.4, y: 136 }),
    ziekenhuis: () => solo(P.hospital(), { s: 1.4, y: 132 }) + g(P.ambulance(), { x: 186, y: 184, s: 0.5 }),
    ambulance: () => solo(P.ambulance(), { s: 1.5, y: 128 }) + sym.motion(46, 110, 1.2),
    hulp: () => pim({ x: 92, y: 204, s: 1.0, mood: "surprised", arms: "wave" }) + g(P.firstAid(), { x: 176, y: 120, s: 0.9 }) + sym.exclaim(130, 54, 1),
    gemeente: () => solo(P.townHall(), { s: 1.4, y: 140 }),
    loket: () => rect(40, 52, 160, 110, 10, "#e3f3ff") + who("collega", { x: 120, y: 196, s: 0.8, mood: "happy", arms: "wave" }) + g(rect(-60, 0, 120, 44, 6, C.woodDark) + rect(-64, -6, 128, 12, 5, C.wood), { x: 120, y: 166 }) +
      rect(40, 52, 160, 10, 5, C.blue) + circ(186, 92, 14, C.oranje) + text(186, 99, "3", { size: 18, fill: "#fff" }) + pim({ x: 54, y: 214, s: 0.6, mood: "idle", arms: "rest" }),
    verzekering: () => g(P.shield({ c: C.blue, inner: g(P.house({ wall: "#fff", roof: "#fff", door: C.blue }), { s: 0.36, y: 2 }) }), { x: 104, y: 112, s: 1.2 }) + g(P.umbrella({ c: C.green }), { x: 180, y: 158, s: 0.55 }),
    sollicitatie: () => desk(178) + who("baas", { x: 62, y: 208, s: 0.86, mood: "happy", arms: "hold", hold: g(P.document(), { s: 0.26 }) }) + who("noor", { x: 180, y: 208, s: 0.86, mood: "happy", arms: "give", flip: true }) + g(P.briefcase(), { x: 120, y: 166, s: 0.3 }),
    klacht: () => who("imran", { x: 82, y: 208, s: 0.98, mood: "angry", arms: "point" }) + bubble(134, 50, 82, 56, g(P.zap({ c: C.red }), { x: 160, y: 78, s: 0.9 }) + g(P.zap({ c: C.red }), { x: 190, y: 78, s: 0.9 })),
    verwarming: () => solo(P.radiator(), { s: 1.4, y: 140 }) + pim({ x: 196, y: 204, s: 0.5, mood: "happy", arms: "cheer" }),
    lekkage: () => solo(P.pipeLeak(), { s: 1.4, y: 120 }) + pim({ x: 56, y: 204, s: 0.55, mood: "surprised", arms: "cover" }),
    lawaai: () => g(P.noise(), { x: 80, y: 90, s: 1.0 }) + pim({ x: 150, y: 204, s: 1.0, mood: "sad", arms: "head" }),
    regen: () => ({ body: g(P.rainCloud(), { x: 120, y: 80, s: 1.2 }) + g(P.puddle(), { x: 120, y: 200, s: 1.3 }) + g(P.umbrella(), { x: 120, y: 150, s: 0.6 }), sky: "#e6edf7" }),
    koud: () => ({ body: g(P.snow(), { x: 120, y: 66, s: 1 }) + pim({ x: 120, y: 204, s: 1.05, mood: "sad", arms: "hug" }) + sym.motion(70, 150, 0.8, C.blue) + sym.motion(190, 150, 0.8, C.blue), sky: "#e8f4ff" }),
    warm: () => ({ body: g(P.sun(), { x: 186, y: 58, s: 0.75 }) + pim({ x: 110, y: 204, s: 1.1, mood: "happy", arms: "rest" }) + sym.drop(70, 80, 1) + sym.drop(156, 66, 0.8), sky: "#fff1d6" }),
    gevaar: () => g(P.trafficSign({ kind: "warn" }), { x: 120, y: 120, s: 1.4 }),
    gevaarlijk: () => g(P.trafficSign({ kind: "warn" }), { x: 78, y: 110, s: 1.0 }) + pim({ x: 168, y: 204, s: 0.9, mood: "surprised", arms: "stop" }),
    veilig: () => g(P.shield({ c: C.green }), { x: 120, y: 112, s: 1.3 }) + pim({ x: 186, y: 204, s: 0.6, mood: "happy", arms: "cheer" })
  };
});
