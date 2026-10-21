/* Word pictures: actions, greetings, polite words, place words (in/op/onder…) and time situations.
   Pim acts most of these out, so verbs read as things he does. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory;
  else (root.PimWordSets = root.PimWordSets || []).push(factory);
})(typeof self !== "undefined" ? self : this, ({ K, P, C, who, solo, g }) => {
  const { pim, sym, line, rect, circ, ell, text, bubble, thought } = K;
  const crate = (x, y, s = 1, front = true) => g(K.box(-40, -34, 80, 68, 8, C.wood, C.woodDark) + (front ? line("M-30-20h60M-30 0h60M-30 20h60", C.woodDark, 3, ' opacity=".5"') : ""), { x, y, s });
  const door = (o) => g(P.door({ c: C.green, ...o }), { x: 64, y: 136, s: 1.1 });
  const sun = (x, y, s) => g(P.sun(), { x, y, s });
  const wave = (o = {}) => pim({ x: 150, y: 204, s: 1.05, mood: "happy", arms: "wave", ...o });
  return {
    /* Greetings and polite words */
    greeting: () => wave({ x: 152 }) + who("femke", { x: 64, y: 208, s: 0.86, mood: "happy", arms: "wave" }) + sym.sparkle(110, 70, 1),
    goedemorgen: () => ({ body: g(P.sunrise(), { x: 66, y: 90, s: 0.7 }) + wave({ x: 140 }), sky: "#fff4dc" }),
    goedemiddag: () => ({ body: sun(64, 70, 0.6) + wave({ x: 140 }), sky: "#e6f5ff" }),
    goedenavond: () => ({ body: g(P.moon(), { x: 64, y: 72, s: 0.7 }) + sym.star(198, 50, 0.8, "#fff") + wave({ x: 144 }), sky: "#ffd9b8" }),
    "tot-ziens": () => door({ open: 1 }) + pim({ x: 164, y: 204, s: 1.0, mood: "happy", arms: "wave", legs: "walk" }) + sym.motion(212, 150, 0.9),
    thanks: () => who("femke", { x: 186, y: 208, s: 0.86, mood: "happy", arms: "give", flip: true, hold: g(P.gift(), { s: 0.3 }) }) + pim({ x: 82, y: 204, s: 1.0, mood: "happy", arms: "cheer" }) + sym.heart(130, 60, 1),
    alstublieft: () => pim({ x: 74, y: 204, s: 0.95, mood: "happy", arms: "give", hold: g(P.cup({ steam: false }), { s: 0.35 }) }) + who("jan", { x: 182, y: 208, s: 0.88, mood: "happy", arms: "hold", flip: true }),
    sorry: () => pim({ x: 96, y: 204, s: 1.05, mood: "sad", arms: "belly" }) + g(P.cup({ steam: false }), { x: 176, y: 196, s: 0.5, r: 100 }) + ell(184, 204, 26, 5, "#c48a5a") + sym.drop(150, 78, 0.9),
    graag: () => pim({ x: 92, y: 204, s: 1.05, mood: "happy", arms: "cheer" }) + g(P.cup({ steam: true }), { x: 184, y: 170, s: 0.65 }) + sym.heart(176, 96, 1),
    "geen-probleem": () => pim({ x: 104, y: 204, s: 1.1, mood: "wink", arms: "hold", hold: g(P.thumbsUp(), { s: 0.36, y: -10 }) }) + sym.check(190, 70, 1),
    "mag-ik": () => pim({ x: 92, y: 204, s: 1.05, mood: "idle", arms: "pointUp" }) + bubble(140, 52, 70, 48, sym.question(175, 76, 0.9), { tail: "left" }),
    ja: () => pim({ x: 104, y: 204, s: 1.15, mood: "happy", arms: "think" }) + sym.check(186, 76, 1.5) + line("M150 50q8 8 0 16", C.green, 4),
    nee: () => pim({ x: 104, y: 204, s: 1.15, mood: "sad", arms: "stop" }) + sym.cross(190, 72, 1.5),
    goed: () => pim({ x: 104, y: 204, s: 1.15, mood: "happy", arms: "hold", hold: g(P.thumbsUp(), { s: 0.42, y: -12 }) }) + sym.star(186, 66, 1.1) + sym.sparkle(52, 80, 1),
    niet: () => g(P.apple(), { x: 92, y: 124, s: 1.1 }) + sym.ban(92, 124, 2.2) + pim({ x: 184, y: 204, s: 0.72, mood: "sad", arms: "shrug" }),
    vraag: () => pim({ x: 92, y: 204, s: 1.05, mood: "think", arms: "think" }) + sym.question(176, 80, 1.6) + sym.question(204, 132, 0.8, C.blue),
    begrijpen: () => pim({ x: 104, y: 204, s: 1.1, mood: "happy", arms: "pointUp" }) + g(P.lightbulbIdea(), { x: 182, y: 70, s: 0.62 }),
    "nog-een-keer": () => pim({ x: 92, y: 204, s: 1.0, mood: "idle", arms: "pointUp" }) + g(P.loopArrow(), { x: 176, y: 100, s: 0.85 }),
    herhalen: () => g(P.loopArrow({ c: C.blue }), { x: 120, y: 112, s: 1.15 }) + g(P.speaker(), { x: 120, y: 112, s: 0.45 }) + pim({ x: 196, y: 204, s: 0.5, mood: "happy", arms: "cheer" }),
    spreken: () => pim({ x: 82, y: 204, s: 1.0, mood: "talk", arms: "shrug" }) + bubble(132, 50, 86, 56, line("M146 70h56M146 82h40", C.greyDark, 4)),
    luisteren: () => pim({ x: 92, y: 204, s: 1.1, mood: "idle", arms: "phone" }) + g(P.ear(), { x: 184, y: 100, s: 0.7 }) + sym.music(190, 168, 1.2) + sym.waves(150, 96, 0.9, C.purple),
    spellen: () => pim({ x: 64, y: 204, s: 0.86, mood: "talk", arms: "point" }) + g(P.letterTile({ ch: "A", c: C.red, size: 0.5 }), { x: 130, y: 100 }) + g(P.letterTile({ ch: "B", c: C.blue, size: 0.5 }), { x: 166, y: 120 }) + g(P.letterTile({ ch: "C", c: C.green, size: 0.5 }), { x: 202, y: 100 }),

    /* Everyday verbs */
    "verb-zijn": () => pim({ x: 120, y: 204, s: 1.2, mood: "happy", arms: "hug" }) + sym.sparkle(64, 70, 1.2) + sym.sparkle(184, 64, 0.9, C.pink),
    "verb-hebben": () => pim({ x: 100, y: 204, s: 1.1, mood: "happy", arms: "holdBoth", holdAt: "mid", hold: g(P.gift(), { s: 0.64, y: 4 }) }) + sym.sparkle(186, 70, 1),
    "verb-gaan": () => pim({ x: 92, y: 204, s: 1.05, mood: "happy", arms: "rest", legs: "walk" }) + sym.motion(46, 150, 1) + g(P.signpost({ dir: "right" }), { x: 194, y: 148, s: 0.75 }),
    "verb-komen": () => g(P.house(), { x: 70, y: 134, s: 0.9 }) + pim({ x: 172, y: 204, s: 1.0, mood: "happy", arms: "wave", legs: "walk", flip: true }) + sym.arrow(118, 186, 0.7, 180, C.green),
    "verb-wonen": () => g(P.house({ wall: C.teal }), { x: 120, y: 120, s: 1.35 }) + pim({ x: 120, y: 204, s: 0.62, mood: "happy", arms: "wave" }) + sym.heart(184, 66, 0.9),
    lopen: () => pim({ x: 120, y: 204, s: 1.15, mood: "happy", arms: "rest", legs: "walk" }) + sym.motion(54, 140, 1.2) + ell(96, 206, 6, 3, C.grey),
    zitten: () => g(P.chair(), { x: 120, y: 150, s: 1.3 }) + pim({ x: 116, y: 186, s: 0.95, mood: "happy", arms: "rest", legs: "sit", tail: false }),
    staan: () => pim({ x: 120, y: 204, s: 1.25, mood: "idle", arms: "rest" }) + line("M196 74v126", C.greyDark, 3) + line("M188 74h16M188 200h16", C.greyDark, 3),
    wachten: () => g(rect(-50, 0, 100, 10, 5, C.wood) + rect(-44, 10, 8, 28, 3, C.woodDark) + rect(36, 10, 8, 28, 3, C.woodDark), { x: 104, y: 166 }) + pim({ x: 104, y: 182, s: 0.9, mood: "sleepy", arms: "rest", legs: "sit", tail: false }) + g(P.hourglass(), { x: 192, y: 102, s: 0.6 }),
    slapen: () => ({ body: g(P.bed(), { x: 120, y: 168, s: 1.5 }) + pim({ x: 118, y: 158, s: 0.92, pose: "sleep" }) + g(P.moon(), { x: 192, y: 60, s: 0.5 }), sky: "#e9e7ff" }),
    opstaan: () => g(P.bed(), { x: 120, y: 176, s: 1.3 }) + pim({ x: 100, y: 176, s: 0.8, mood: "happy", arms: "cheer" }) + g(P.alarm(), { x: 192, y: 88, s: 0.5 }) + g(P.sun({ face: false }), { x: 54, y: 58, s: 0.4 }),
    eten: () => g(P.table(), { x: 120, y: 184, s: 1.2 }) + g(P.plate({ food: g(P.rice(), { s: 0.4, y: -10 }) }), { x: 150, y: 168, s: 0.7 }) + pim({ x: 80, y: 196, s: 0.85, mood: "happy", arms: "hold", hold: line("M0 0l14-16", C.greyDark, 3) }),
    drinken: () => pim({ x: 112, y: 204, s: 1.15, mood: "happy", arms: "phone", hold: g(P.glass(), { s: 0.36, r: -30 }) }) + sym.drop(56, 90, 1),
    koken: () => g(P.stove(), { x: 150, y: 170, s: 0.75 }) + g(P.pot(), { x: 150, y: 126, s: 0.6 }) + pim({ x: 76, y: 204, s: 0.95, mood: "happy", arms: "give", hold: line("M0 0l18-18", C.wood, 4) }),
    lezen: () => pim({ x: 116, y: 204, s: 1.15, mood: "happy", arms: "holdBoth", holdAt: "mid", hold: g(P.book({ open: true, c: C.red }), { s: 0.62, y: 4 }) }),
    schrijven: () => g(P.paper({ w: 90, h: 64, lineCount: 3 }), { x: 152, y: 154, r: -6 }) + pim({ x: 82, y: 204, s: 1.0, mood: "think", arms: "give", hold: g(P.pencil(), { s: 0.5 }) }),
    leren: () => g(P.book({ open: true }), { x: 156, y: 166, s: 0.9 }) + pim({ x: 78, y: 204, s: 0.95, mood: "think", arms: "think" }) + g(P.lightbulbIdea(), { x: 156, y: 76, s: 0.55 }),
    bellen: () => pim({ x: 108, y: 204, s: 1.15, mood: "talk", arms: "phone", hold: g(P.phone(), { s: 0.3 }) }) + sym.waves(180, 72, 1.1, C.green),
    terugbellen: () => g(P.phoneCall(), { x: 92, y: 116, s: 1.05 }) + g(P.backArrow({ c: C.green }), { x: 172, y: 100, s: 0.75 }) + pim({ x: 182, y: 204, s: 0.55, mood: "happy", arms: "point", flip: true }),
    helpen: () => who("jan", { x: 166, y: 208, s: 0.9, mood: "happy", arms: "hold", flip: true }) + pim({ x: 80, y: 204, s: 0.95, mood: "happy", arms: "holdBoth", holdAt: "mid", hold: g(P.shoppingBag(), { s: 0.52 }) }) + sym.heart(122, 64, 0.9),
    schoonmaken: () => pim({ x: 92, y: 204, s: 1.05, mood: "happy", arms: "give", hold: g(P.spray(), { s: 0.42 }) }) + g(P.window(), { x: 184, y: 100, s: 0.6 }) + sym.sparkle(184, 60, 1) + sym.sparkle(206, 138, 0.7),
    ruilen: () => g(P.shirt({ c: C.red }), { x: 62, y: 108, s: 0.6 }) + g(P.shirt({ c: C.blue }), { x: 178, y: 108, s: 0.6 }) + g(P.swapArrows(), { x: 120, y: 108, s: 0.7 }) + pim({ x: 120, y: 214, s: 0.62, mood: "happy", arms: "shrug" }),
    veranderen: () => g(P.calendarPage({ day: "3", c: C.grey }), { x: 64, y: 112, s: 0.75 }) + g(P.swapArrows(), { x: 120, y: 112, s: 0.6 }) + g(P.calendarPage({ day: "5", c: C.green }), { x: 178, y: 112, s: 0.75 }) + pim({ x: 120, y: 214, s: 0.55, mood: "think", arms: "think" }),
    annuleren: () => g(P.calendarPage({ mark: 5 }), { x: 112, y: 116, s: 1.3 }) + sym.cross(172, 152, 1.6),
    parkeren: () => g(P.trafficSign({ kind: "parking" }), { x: 64, y: 132, s: 0.95 }) + g(P.car(), { x: 158, y: 170, s: 0.95 }) + line("M100 200h120", "#fff", 4),
    kopen: () => pim({ x: 92, y: 204, s: 1.05, mood: "happy", arms: "holdUp", hold: g(P.shoppingBag(), { s: 0.48 }) }) + g(P.shop(), { x: 186, y: 134, s: 0.6 }),
    betalen: () => g(P.till(), { x: 164, y: 150, s: 0.8 }) + pim({ x: 80, y: 204, s: 0.95, mood: "happy", arms: "give", hold: g(P.cash(), { s: 0.3 }) }),
    pinnen: () => pim({ x: 82, y: 204, s: 1.0, mood: "happy", arms: "give", hold: g(P.card(), { s: 0.3, r: -30 }) }) + g(P.pinTerminal(), { x: 172, y: 126, s: 0.95 }) + sym.waves(140, 106, 0.6, C.green),
    brengen: () => pim({ x: 100, y: 204, s: 1.05, mood: "happy", arms: "holdBoth", holdAt: "mid", legs: "walk", hold: g(P.parcel(), { s: 0.6 }) }) + sym.arrow(196, 140, 0.8, 0, C.green) + sym.motion(48, 140, 1),
    ophalen: () => g(P.pickupPoint(), { x: 168, y: 136, s: 0.8 }) + pim({ x: 72, y: 204, s: 0.95, mood: "happy", arms: "holdBoth", holdAt: "mid", hold: g(P.parcel(), { s: 0.52 }), flip: true }) + sym.arrow(122, 196, 0.6, 180, C.oranje),
    terugbrengen: () => g(P.shop(), { x: 172, y: 130, s: 0.66 }) + pim({ x: 78, y: 204, s: 0.92, mood: "idle", arms: "give", hold: g(P.parcel(), { s: 0.46 }) }) + g(P.backArrow({ c: C.oranje }), { x: 92, y: 66, s: 0.5, flip: true }),
    terugkomen: () => g(P.house(), { x: 160, y: 132, s: 0.95 }) + pim({ x: 64, y: 204, s: 0.86, mood: "happy", arms: "wave", legs: "walk" }) + g(P.backArrow({ c: C.green }), { x: 64, y: 64, s: 0.5, flip: true }),
    beginnen: () => g(P.playButton(), { x: 158, y: 104, s: 1.05 }) + pim({ x: 72, y: 204, s: 0.9, mood: "happy", arms: "cheer" }) + sym.sparkle(206, 160, 0.9),
    stoppen: () => pim({ x: 112, y: 204, s: 1.15, mood: "idle", arms: "stop" }) + g(P.trafficLight({ on: "red" }), { x: 196, y: 112, s: 0.7 }),
    stop: () => g(P.trafficSign({ kind: "stop" }), { x: 120, y: 126, s: 1.5 }),

    /* Place words: where is Pim? */
    in: () => rect(58, 108, 124, 20, 6, C.woodDark) + pim({ x: 120, y: 176, s: 0.9, mood: "happy", arms: "cheer" }) + g(K.box(-62, -34, 124, 78, 8, C.wood, C.woodDark) + line("M-50-14h100M-50 6h100M-50 26h100", C.woodDark, 3, ' opacity=".5"'), { x: 120, y: 152 }),
    op: () => crate(120, 168, 1.2) + pim({ x: 120, y: 128, s: 0.8, mood: "happy", arms: "cheer" }),
    onder: () => g(P.table(), { x: 120, y: 152, s: 1.7 }) + pim({ x: 120, y: 214, s: 0.62, mood: "happy", arms: "wave" }),
    naast: () => crate(84, 168, 1.05) + pim({ x: 172, y: 204, s: 0.9, mood: "happy", arms: "point", flip: true }),
    voor: () => crate(120, 140, 1.4) + pim({ x: 120, y: 214, s: 0.85, mood: "happy", arms: "wave" }),
    achter: () => pim({ x: 152, y: 150, s: 0.86, mood: "wink", arms: "wave" }) + crate(112, 168, 1.35),

    /* Speed, state, time */
    langzaam: () => solo(P.snail(), { s: 1.5, y: 140 }) + pim({ x: 198, y: 214, s: 0.4, mood: "sleepy" }),
    kapot: () => g(P.phone({ screen: "#9aa3b5", content: line("M-14-20l10 14-6 8 12 12-4 14", "#fff", 2.4) }), { x: 92, y: 124, s: 1.2 }) + pim({ x: 182, y: 204, s: 0.72, mood: "sad", arms: "cover" }),
    "past-gegaan": () => g(P.house(), { x: 66, y: 142, s: 0.7 }) + line("M90 190q50-30 110-14", C.greyDark, 4, ' stroke-dasharray="2 10"') + pim({ x: 190, y: 204, s: 0.66, mood: "happy", arms: "wave", legs: "walk" }) + g(P.backArrow({ c: C.purple }), { x: 120, y: 74, s: 0.6 }),
    "ik-heb-gewerkt": () => pim({ x: 92, y: 204, s: 1.0, mood: "sleepy", arms: "holdBoth", holdAt: "mid", hold: g(P.briefcase(), { s: 0.36 }) }) + g(P.clock({ h: 6, m: 0 }), { x: 180, y: 84, s: 0.55 }) + sym.check(206, 124, 0.7),
    ingang: () => door({ open: 1 }) + sym.arrow(146, 150, 1.1, 180, C.green) + pim({ x: 196, y: 204, s: 0.62, mood: "happy", arms: "point", flip: true }),
    uitgang: () => door({ open: 1 }) + sym.arrow(150, 150, 1.1, 0, C.green) + g(rect(-24, -12, 48, 24, 5, C.green) + g(line("M-10 0h14M0-7l7 7-7 7", "#fff", 3.4), { x: 0 }), { x: 64, y: 34 }),
    open: () => g(P.shop(), { x: 120, y: 128, s: 1.25 }) + g(rect(-28, -14, 56, 28, 8, C.green) + line("M-8 0l5 5 10-10", "#fff", 3.4), { x: 120, y: 66 }) + sym.sparkle(52, 70, 1),
    gesloten: () => g(P.shop({ awning: C.grey }), { x: 120, y: 128, s: 1.25 }) + g(rect(-28, -14, 56, 28, 8, C.red) + line("M-9-6l18 12M9-6l-18 12", "#fff", 3.4), { x: 120, y: 66 }) + g(P.moon(), { x: 196, y: 54, s: 0.35 }),
    dicht: () => g(P.door({ c: C.red }), { x: 104, y: 128, s: 1.4 }) + g(rect(-12, -8, 24, 20, 4, C.yellow) + line("M-7-8v-6a7 7 0 0 1 14 0v6", C.yellowDark, 4), { x: 104, y: 134, s: 1.1 }) + pim({ x: 188, y: 204, s: 0.55, mood: "sad", arms: "shrug" }),
    verboden: () => g(P.trafficSign({ kind: "ban" }), { x: 120, y: 132, s: 1.4 }) + g(P.bike(), { x: 120, y: 112, s: 0.42 }),
    toegestaan: () => g(P.bike(), { x: 112, y: 132, s: 1.1 }) + sym.check(178, 78, 1.6),
    "te-laat": () => g(P.clock({ h: 9, m: 20, c: C.red }), { x: 70, y: 84, s: 0.75 }) + pim({ x: 150, y: 204, s: 1.0, mood: "surprised", arms: "cheer", legs: "walk" }) + sym.motion(96, 150, 1) + sym.drop(196, 92, 0.9),
    laat: () => ({ body: g(P.moon(), { x: 66, y: 66, s: 0.6 }) + g(P.clock({ h: 11, m: 0, c: C.purple }), { x: 150, y: 110, s: 1.05 }), sky: "#e9e7ff" }),
    "op-tijd": () => g(P.clock({ h: 9, m: 0, c: C.green }), { x: 96, y: 108, s: 1.05 }) + sym.check(158, 152, 1.3) + pim({ x: 192, y: 204, s: 0.55, mood: "happy", arms: "cheer" }),
    "te-vroeg": () => ({ body: g(P.sunrise(), { x: 64, y: 82, s: 0.5 }) + g(P.clock({ h: 6, m: 0, c: C.yellow }), { x: 156, y: 92, s: 0.75 }) + pim({ x: 120, y: 204, s: 0.86, mood: "sleepy", arms: "rest" }), sky: "#fff4dc" }),
    vertraging: () => g(P.train(), { x: 104, y: 152, s: 0.95 }) + g(P.clock({ h: 10, m: 40, c: C.oranje }), { x: 178, y: 72, s: 0.6 }) + sym.exclaim(196, 132, 0.8),
    pauze: () => g(P.cup(), { x: 160, y: 156, s: 0.8 }) + pim({ x: 82, y: 204, s: 0.95, mood: "happy", arms: "hips" }) + g(rect(-8, -20, 6, 40, 3, C.blue) + rect(4, -20, 6, 40, 3, C.blue), { x: 162, y: 76 }),
    dienst: () => g(P.rooster(), { x: 158, y: 92, s: 0.7 }) + who("collega", { x: 82, y: 208, s: 0.9, mood: "happy", arms: "point", extra: g(P.badge({ c: C.teal }), { y: -78, s: 0.22 }) }) + g(P.clock({ h: 8, m: 0 }), { x: 186, y: 172, s: 0.38 }),
    beschikbaar: () => g(P.calendarWeek({ hi: [2, 4], c: C.green }), { x: 112, y: 112, s: 1.25 }) + sym.check(180, 160, 1.1),
    afwezig: () => g(P.table(), { x: 120, y: 172, s: 1.3 }) + g(P.chair({ c: C.blue }), { x: 72, y: 160, s: 0.9 }) + g(P.book({ c: C.green }), { x: 140, y: 152, s: 0.3 }) + sym.question(170, 80, 1.3),
    schooltijd: () => g(P.school(), { x: 84, y: 136, s: 0.85 }) + g(P.clock({ h: 8, m: 30, c: C.oranje }), { x: 184, y: 92, s: 0.6 }) + who("ali", { x: 180, y: 210, s: 0.62, mood: "happy", arms: "wave", extra: g(P.backpack(), { x: -16, y: -60, s: 0.3 }) }),
    bezichtiging: () => g(P.house({ wall: C.teal }), { x: 82, y: 132, s: 0.95 }) + who("femke", { x: 166, y: 208, s: 0.86, mood: "happy", arms: "give", flip: true, hold: g(P.key(), { s: 0.3 }) }) + pim({ x: 116, y: 204, s: 0.55, mood: "surprised", arms: "rest" }),
    bereik: () => g(P.phoneSignal({ bars: 1 }), { x: 100, y: 120, s: 1.2 }) + sym.exclaim(168, 78, 1) + pim({ x: 190, y: 204, s: 0.55, mood: "sad", arms: "holdUp" }),
    "verkeerd-nummer": () => g(P.phoneCall(), { x: 96, y: 118, s: 1.1 }) + sym.cross(164, 70, 1.2) + pim({ x: 182, y: 204, s: 0.6, mood: "surprised", arms: "shrug" })
  };
});
