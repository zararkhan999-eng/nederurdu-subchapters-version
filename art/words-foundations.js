/* Word pictures: letters, numbers, pronouns, little grammar words, directions, dates and forms.
   Letters and numerals may appear (they are the concept itself); Dutch words never do. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory;
  else (root.PimWordSets = root.PimWordSets || []).push(factory);
})(typeof self !== "undefined" ? self : this, ({ K, P, C, who, solo, g }) => {
  const { pim, sym, line, rect, circ, ell, text, bubble } = K;
  const tileColours = [C.blue, C.green, C.oranje, C.purple, C.red, C.teal];
  const field = (x, y, w, hi = false, inner = "") => rect(x, y, w, 22, 6, hi ? C.yellowSoft : "#fff", hi ? ` stroke="${C.yellow}" stroke-width="3"` : ` stroke="${C.grey}" stroke-width="2"`) + inner;
  // A form card with two labelled fields; `hi` (0 or 1) is the highlighted field.
  const formCard = (hi, inner = ["", ""]) => g(K.box(-70, -54, 140, 108, 10, "#fff", C.grey) + rect(-70, -54, 140, 18, 9, C.blue) + rect(-70, -45, 140, 9, 0, C.blue) +
    rect(-58, -24, 30, 5, 2.5, C.grey) + field(-58, -16, 116, hi === 0, inner[0]) + rect(-58, 14, 30, 5, 2.5, C.grey) + field(-58, 22, 116, hi === 1, inner[1]), { x: 120, y: 112 });
  const scribble = (x, y, w) => line(`M${x} ${y}q${w * 0.1}-8 ${w * 0.2} 0t${w * 0.2} 0 ${w * 0.2} 0 ${w * 0.2} 0`, C.blueDark, 3);
  const numberWords = {};
  const counts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  counts.forEach((num, i) => {
    numberWords[`number-${num}`] = () => {
      const c = tileColours[i % tileColours.length];
      const big = 1.45;
      // Up to 10, dots show how many; beyond that, tens of dots would be noise, so Pim cheers the number.
      const dots = num > 0 && num <= 10 ? g(P.dots({ count: num, c, r: 7, cols: 5 }), { x: 120, y: num > 5 ? 178 : 186 }) : "";
      const zero = num === 0 ? g(ell(0, 0, 26, 7, C.greyLight) + ell(0, -2, 22, 5, "#fff"), { x: 120, y: 186 }) : "";
      const cheer = num > 10 ? pim({ x: 196, y: 210, s: 0.46, mood: "happy", arms: "cheer" }) : "";
      return g(P.numberTile({ num, c }), { x: 120, y: num <= 10 ? 96 : 112, s: num <= 10 ? 1.25 : big }) + dots + zero + cheer;
    };
  });
  const letterWords = {};
  [["a", C.red], ["b", C.blue], ["h", C.green], ["i", C.purple]].forEach(([ch, c]) => {
    letterWords[`letter-${ch}`] = () => g(P.letterTile({ ch, c }), { x: 120, y: 112, s: 1.5 }) + pim({ x: 200, y: 210, s: 0.5, mood: "happy", arms: "point", flip: true });
  });
  const dayWeek = (day, c) => g(P.calendarWeek({ hi: day, c }), { x: 120, y: 116, s: 1.4 });
  return {
    ...numberWords,
    ...letterWords,
    letter: () => g(P.letterTile({ ch: "A", c: C.oranje }), { x: 96, y: 104, s: 1.1, r: -8 }) + g(P.letterTile({ ch: "b", c: C.blue }), { x: 168, y: 140, s: 0.7, r: 10 }) + pim({ x: 64, y: 210, s: 0.5, mood: "happy", arms: "cheer" }),
    nummer: () => g(P.letterTile({ ch: "#", c: C.teal }), { x: 120, y: 110, s: 1.4 }) + text(186, 196, "1 2 3", { size: 18, fill: C.tealDark }),

    /* Pronouns: Pim is "I"; the viewer is "you" */
    "pronoun-ik": () => pim({ x: 120, y: 204, s: 1.25, mood: "happy", arms: "belly" }) + g(sym.arrow(0, 0, 0.9, 90, C.oranje), { x: 120, y: 34 }),
    "pronoun-jij": () => who("bram", { x: 70, y: 208, s: 0.86, mood: "happy", arms: "rest" }) + pim({ x: 164, y: 204, s: 0.95, mood: "happy", arms: "point", flip: true }) + circ(70, 82, 30, "none", ` stroke="${C.oranje}" stroke-width="5" stroke-dasharray="2 9" stroke-linecap="round"`),
    "pronoun-u": () => who("jan", { x: 70, y: 208, s: 0.92, mood: "happy", arms: "rest" }) + pim({ x: 166, y: 204, s: 0.92, mood: "happy", arms: "give", flip: true }) + sym.star(70, 44, 0.8),
    "pronoun-hij-zij": () => who("imran", { x: 70, y: 208, s: 0.84, mood: "happy" }) + who("femke", { x: 170, y: 208, s: 0.84, mood: "happy" }) + pim({ x: 120, y: 214, s: 0.5, mood: "happy", arms: "cheer" }),
    "pronoun-wij": () => who("femke", { x: 58, y: 208, s: 0.8, mood: "happy", arms: "cheer" }) + who("imran", { x: 182, y: 208, s: 0.8, mood: "happy", arms: "cheer" }) + pim({ x: 120, y: 206, s: 0.8, mood: "happy", arms: "cheer" }) + sym.heart(120, 48, 0.8),
    possessive: () => g(P.bike(), { x: 148, y: 158, s: 0.95 }) + pim({ x: 72, y: 204, s: 0.92, mood: "happy", arms: "belly" }) + sym.heart(148, 92, 1),
    "article-een": () => g(P.apple(), { x: 92, y: 126, s: 1.2 }) + g(P.numberTile({ num: 1, c: C.green }), { x: 176, y: 90, s: 0.6 }),
    "article-de-het": () => g(rect(-28, -18, 56, 36, 10, C.purple) + rect(-14, -2, 28, 5, 2.5, "#ffffffaa"), { x: 72, y: 112 }) + sym.arrow(118, 112, 0.6, 0, C.purpleDark) + g(P.house(), { x: 176, y: 112, s: 0.8 }) + pim({ x: 120, y: 214, s: 0.5, mood: "think", arms: "think" }),

    /* Little grammar words */
    "word-naar": () => pim({ x: 62, y: 204, s: 0.8, mood: "happy", legs: "walk" }) + sym.arrow(122, 150, 1, 0, C.green) + g(P.school(), { x: 186, y: 136, s: 0.55 }),
    "word-met": () => pim({ x: 82, y: 204, s: 0.92, mood: "happy", arms: "hug" }) + who("ali", { x: 160, y: 208, s: 0.9, mood: "happy", arms: "hug", flip: true }) + sym.heart(120, 60, 0.9),
    "word-bij": () => g(P.house({ wall: C.teal }), { x: 104, y: 124, s: 1.15 }) + pim({ x: 182, y: 204, s: 0.7, mood: "happy", arms: "point", flip: true }),
    "modal-kunnen": () => pim({ x: 104, y: 204, s: 1.1, mood: "happy", arms: "cheer" }) + g(P.trophy(), { x: 186, y: 96, s: 0.7 }) + sym.sparkle(60, 64, 1),
    "modal-moeten": () => g(P.form(), { x: 152, y: 116, s: 1.0 }) + sym.exclaim(190, 66, 1) + pim({ x: 70, y: 204, s: 0.86, mood: "think", arms: "point" }),
    "modal-mogen": () => g(P.door({ c: C.green, open: 1 }), { x: 90, y: 128, s: 1.1 }) + sym.check(164, 84, 1.3) + pim({ x: 168, y: 204, s: 0.66, mood: "happy", arms: "wave" }),
    "connector-omdat": () => g(P.rainCloud(), { x: 60, y: 100, s: 0.66 }) + sym.arrow(120, 110, 0.8, 0, C.purple) + g(P.umbrella(), { x: 180, y: 108, s: 0.6 }) + pim({ x: 180, y: 214, s: 0.42, mood: "happy" }),
    welke: () => g(P.apple(), { x: 70, y: 112, s: 0.8 }) + g(P.apple({ c: C.green }), { x: 170, y: 112, s: 0.8 }) + pim({ x: 120, y: 210, s: 0.66, mood: "think", arms: "think" }) + sym.question(120, 58, 1),

    /* Near, far, here, there, directions */
    dit: () => pim({ x: 82, y: 204, s: 1.05, mood: "happy", arms: "give", hold: g(P.apple(), { s: 0.4, x: 8, y: -6 }) }) + circ(130, 120, 28, "none", ` stroke="${C.oranje}" stroke-width="5" stroke-dasharray="2 9" stroke-linecap="round"`),
    dat: () => pim({ x: 66, y: 204, s: 0.9, mood: "happy", arms: "point" }) + line("M110 128L190 150", C.greyDark, 3, ' stroke-dasharray="3 9"') + g(P.apple(), { x: 200, y: 166, s: 0.36 }),
    hier: () => g(P.pin({ c: C.oranje }), { x: 120, y: 82, s: 0.8 }) + pim({ x: 120, y: 204, s: 0.9, mood: "happy", arms: "pointUp" }) + ell(120, 206, 46, 10, C.oranje, ' opacity=".35"'),
    daar: () => pim({ x: 62, y: 204, s: 0.86, mood: "happy", arms: "point" }) + g(P.pin({ c: C.oranje }), { x: 186, y: 108, s: 0.6 }) + ell(186, 152, 30, 7, C.oranje, ' opacity=".35"') + line("M106 132L166 112", C.greyDark, 3, ' stroke-dasharray="3 9"'),
    links: () => g(P.signpost({ dir: "left" }), { x: 120, y: 132, s: 1.3 }) + pim({ x: 196, y: 210, s: 0.5, mood: "happy", arms: "rest" }),
    rechts: () => g(P.signpost({ dir: "right" }), { x: 120, y: 132, s: 1.3 }) + pim({ x: 44, y: 210, s: 0.5, mood: "happy", arms: "rest" }),
    rechtdoor: () => g(P.road(), { x: 120, y: 160, s: 1.2 }) + g(P.tree(), { x: 52, y: 150, s: 0.5 }) + g(P.tree(), { x: 190, y: 150, s: 0.5 }) + sym.arrow(120, 82, 1.4, -90, C.green),
    dichtbij: () => g(P.house(), { x: 92, y: 132, s: 1.0 }) + pim({ x: 164, y: 204, s: 0.86, mood: "happy", arms: "point", flip: true }) + line("M124 190h18", C.green, 4),
    "ver-weg": () => pim({ x: 54, y: 204, s: 0.72, mood: "think", arms: "point" }) + line("M90 180Q150 150 186 134", C.greyDark, 3, ' stroke-dasharray="3 10"') + g(P.house(), { x: 196, y: 122, s: 0.34 }) + g(P.tree(), { x: 150, y: 150, s: 0.3 }),

    /* Dates and time */
    datum: () => g(P.calendarPage({ day: "12", c: C.red }), { x: 120, y: 116, s: 1.5 }),
    maandag: () => dayWeek([0], C.blue) + sym.arrow(56, 190, 0.6, -90, C.blue),
    vrijdag: () => dayWeek([4], C.green) + sym.arrow(165, 190, 0.6, -90, C.green),
    weekend: () => dayWeek([5, 6], C.oranje) + pim({ x: 194, y: 216, s: 0.42, mood: "happy", arms: "cheer" }),
    dag: () => ({ body: g(P.sun(), { x: 120, y: 98, s: 1.1 }) + g(P.grass(), { x: 120, y: 196, s: 1.6 }), sky: "#e6f5ff" }),
    tijd: () => solo(P.clock({ h: 2, m: 45 }), { s: 1.4 }) + g(P.hourglass(), { x: 192, y: 172, s: 0.45 }),
    later: () => g(P.clock({ h: 3, m: 0, c: C.purple }), { x: 104, y: 112, s: 1.1 }) + sym.arrow(184, 112, 0.9, 0, C.purple) + line("M104 70a42 42 0 0 1 42 42", C.green, 6),
    "om-acht-uur": () => solo(P.clock({ h: 8, m: 0, c: C.oranje }), { s: 1.5 }),
    leeftijd: () => g(P.cake({ candles: 5 }), { x: 120, y: 140, s: 1.3 }) + g(P.balloons(), { x: 196, y: 84, s: 0.5 }),
    geboortedatum: () => g(P.cake({ candles: 1 }), { x: 84, y: 150, s: 0.95 }) + g(P.calendarPage({ day: "7", c: C.pink }), { x: 168, y: 104, s: 0.85 }),

    /* Forms: name, address */
    voornaam: () => formCard(0, [scribble(-50, -5, 60), ""]) + pim({ x: 196, y: 214, s: 0.46, mood: "happy", arms: "point", flip: true }),
    achternaam: () => formCard(1, ["", scribble(-50, 33, 80)]) + pim({ x: 196, y: 214, s: 0.46, mood: "happy", arms: "point", flip: true }),
    postcode: () => g(P.envelope({ stamp: true }), { x: 120, y: 112, s: 1.5 }) + g(rect(-34, -12, 68, 24, 6, C.yellow) + text(0, 6, "1234", { size: 16 }), { x: 120, y: 138 }),
    huisnummer: () => g(P.door({ c: C.blue, number: "12" }), { x: 120, y: 124, s: 1.4 }),

    /* Lessons and language */
    les: () => g(P.blackboard({ content: g(P.letterTile({ ch: "a", c: C.yellow, size: 0.42 }), { x: -18, y: -4 }) + g(P.letterTile({ ch: "b", c: C.pink, size: 0.42 }), { x: 18, y: -4 }) }), { x: 120, y: 92, s: 1.25 }) + pim({ x: 120, y: 214, s: 0.6, mood: "happy", arms: "pointUp" }),
    taal: () => bubble(30, 46, 92, 60, text(76, 84, "Aa", { size: 26, fill: C.blue })) + bubble(116, 104, 92, 60, text(162, 144, "ا ب", { size: 26, fill: C.green, family: "urdu" }), { tail: "right" }) + pim({ x: 64, y: 214, s: 0.45, mood: "talk" })
  };
});
