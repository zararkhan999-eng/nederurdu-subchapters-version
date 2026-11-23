/* Urdu ↔ Dutch contrast cards: short side-by-side cards that show where Dutch works
   like Urdu (a friend you can lean on) and where it does not (a trap Urdu speakers
   often fall into). Each card belongs to the lesson that first teaches that point
   and appears once in its Learn phase, after the lesson's own teaching.

   Every Dutch line here is a recorded course text (audio/nl/manifest.js), so the
   speaker button plays the Piper clip rather than the device voice. */
window.NU = window.NU || {};
NU.contrast = (() => {
  // Word roles share one colour on both lines, so the learner can follow a word
  // from its Urdu position to its Dutch one.
  const roles = {
    subj: "کون",
    verb: "فعل",
    place: "کہاں",
    time: "کب",
    obj: "کیا",
    neg: "نفی",
    q: "سوال",
    reason: "وجہ"
  };

  const cards = [
    {
      id: "contrast-verb-second",
      lessonIds: ["a0-ben-bent-is"],
      verdict: "different",
      titleUrdu: "فعل آخر میں نہیں، دوسرے نمبر پر",
      introUrdu: "اردو میں “ہوں، ہے، ہیں” جملے کے آخر میں آتے ہیں۔ Nederlands میں یہ فعل شخص کے فوراً بعد آتا ہے۔",
      examples: [
        {
          urdu: [["میں", "subj"], ["علی", "obj"], ["ہوں", "verb"]],
          dutch: [["ik", "subj"], ["ben", "verb"], ["Ali", "obj"]],
          audio: "ik ben Ali"
        }
      ],
      takeawayUrdu: "پہلے کون، پھر فوراً فعل: ik ben, jij bent, hij is۔",
      mistake: { wrong: "ik Ali ben", right: "ik ben Ali" }
    },
    {
      id: "contrast-polite-u",
      lessonIds: ["a0-ik-jij-u"],
      verdict: "same",
      titleUrdu: "u = آپ، jij = تم",
      introUrdu: "اچھی خبر: Nederlands میں بھی اردو کی طرح عزت والا “آپ” اور دوستانہ “تم” الگ ہیں۔",
      pairs: [
        { nl: "u", ur: "آپ", note: "ڈاکٹر، گیمینٹے، استاد، اجنبی" },
        { nl: "jij", ur: "تم", note: "دوست، بچے، ساتھی" },
        { nl: "ik", ur: "میں", note: "خود اپنے لیے" }
      ],
      takeawayUrdu: "جہاں اردو میں “آپ” کہتے ہیں، وہاں u کہیں۔ شک ہو تو u محفوظ ہے۔"
    },
    {
      id: "contrast-hij-zij",
      lessonIds: ["a0-hij-zij-wij"],
      verdict: "different",
      titleUrdu: "ایک “وہ”، دو Nederlands لفظ",
      introUrdu: "اردو میں “وہ” مرد اور عورت دونوں کے لیے ہے، فرق فعل میں آتا ہے (کرتا / کرتی)۔ Nederlands میں فرق شخص کے لفظ میں ہے، فعل نہیں بدلتا۔",
      pairs: [
        { nl: "hij", ur: "وہ (مرد)", note: "وہ کام کرتا ہے = hij werkt" },
        { nl: "zij", ur: "وہ (عورت)", note: "وہ کام کرتی ہے = zij werkt" },
        { nl: "wij", ur: "ہم", note: "ہم کام کرتے ہیں = wij werken" }
      ],
      audio: "hij werkt",
      takeawayUrdu: "مرد ہو تو hij، عورت ہو تو zij۔ werkt دونوں کے لیے ایک جیسا ہے۔"
    },
    {
      id: "contrast-de-het",
      lessonIds: ["a0-een-de-het"],
      verdict: "different",
      titleUrdu: "اردو میں “the” نہیں ہوتا",
      introUrdu: "اردو میں صرف “آدمی” یا “گھر” کہتے ہیں۔ Nederlands میں اسم کے ساتھ اکثر de یا het لگتا ہے، اور کون سا لگے گا یہ اصول سے کم، یاد سے زیادہ آتا ہے۔",
      pairs: [
        { nl: "de man", ur: "آدمی", note: "de" },
        { nl: "de deur", ur: "دروازہ", note: "de" },
        { nl: "het kind", ur: "بچہ", note: "het" },
        { nl: "het huis", ur: "گھر", note: "het" }
      ],
      takeawayUrdu: "لفظ کو ہمیشہ de یا het کے ساتھ ایک ٹکڑے کی طرح یاد کریں: “het huis”، صرف “huis” نہیں۔",
      mistake: { wrong: "de huis", right: "het huis" }
    },
    {
      id: "contrast-niet-geen",
      lessonIds: ["a0-geen"],
      verdict: "different",
      titleUrdu: "ایک “نہیں”، دو Nederlands لفظ",
      introUrdu: "اردو میں ہر جگہ “نہیں” کافی ہے۔ Nederlands میں چیز (اسم) نہ ہو تو geen، کام (فعل) نہ ہو تو niet۔",
      examples: [
        {
          urdu: [["اس کے پاس", "subj"], ["قلم", "obj"], ["نہیں", "neg"], ["ہے", "verb"]],
          dutch: [["zij", "subj"], ["heeft", "verb"], ["geen", "neg"], ["pen", "obj"]],
          audio: "zij heeft geen pen"
        },
        {
          urdu: [["آج", "time"], ["میں", "subj"], ["کام", "obj"], ["نہیں", "neg"], ["کرتا", "verb"]],
          dutch: [["Vandaag", "time"], ["werk", "verb"], ["ik", "subj"], ["niet.", "neg"]],
          audio: "Vandaag werk ik niet."
        }
      ],
      takeawayUrdu: "“کوئی ___ نہیں” سوچیں تو geen؛ “نہیں کرتا” سوچیں تو niet۔",
      mistake: { wrong: "ik heb niet pen", right: "ik heb geen pen" }
    },
    {
      id: "contrast-word-order",
      lessonIds: ["a0-word-order"],
      verdict: "different",
      titleUrdu: "فعل دوسرے نمبر پر ہی رہتا ہے",
      introUrdu: "اردو میں “یہاں” آگے کریں تو باقی جملہ ویسا ہی رہتا ہے۔ Nederlands میں جو بھی پہلے آئے، فعل دوسرے نمبر پر رہتا ہے اور ik اس کے بعد چلا جاتا ہے۔",
      examples: [
        {
          urdu: [["میں", "subj"], ["یہاں", "place"], ["کام کرتا ہوں", "verb"]],
          dutch: [["ik", "subj"], ["werk", "verb"], ["hier", "place"]],
          audio: "ik werk hier"
        },
        {
          urdu: [["یہاں", "place"], ["میں", "subj"], ["کام کرتا ہوں", "verb"]],
          dutch: [["hier", "place"], ["werk", "verb"], ["ik", "subj"]],
          audio: "hier werk ik"
        },
        {
          urdu: [["کیا", "q"], ["تم", "subj"], ["یہاں", "place"], ["کام کرتے ہو؟", "verb"]],
          dutch: [["werk", "verb"], ["jij", "subj"], ["hier?", "place"]],
          audio: "werk jij hier?"
        }
      ],
      takeawayUrdu: "سوال کے لیے “کیا” جیسا لفظ نہیں لگتا؛ فعل کو سب سے آگے لے آئیں۔",
      mistake: { wrong: "hier ik werk", right: "hier werk ik" }
    },
    {
      id: "contrast-future-gaan",
      lessonIds: ["a1-future-gaan"],
      verdict: "same",
      titleUrdu: "اصل کام آخر میں، بالکل اردو کی طرح",
      introUrdu: "ga کے ساتھ اصل کام والا لفظ (werken) جملے کے آخر میں جاتا ہے، جیسے اردو میں “کروں گا” آخر میں آتا ہے۔",
      examples: [
        {
          urdu: [["میں", "subj"], ["کل", "time"], ["کام کروں گا", "verb"]],
          dutch: [["ik", "subj"], ["ga", "verb"], ["morgen", "time"], ["werken", "verb"]],
          audio: "ik ga morgen werken"
        }
      ],
      takeawayUrdu: "ga دوسرے نمبر پر، اصل کام آخر میں۔ آخر والا حصہ اردو جیسا ہے۔",
      mistake: { wrong: "ik ga werken morgen", right: "ik ga morgen werken" }
    },
    {
      id: "contrast-omdat",
      lessonIds: ["a2-reasons-omdat-dat"],
      verdict: "same",
      titleUrdu: "omdat کے بعد فعل آخر میں، جیسے اردو",
      introUrdu: "omdat (کیونکہ) کے بعد Nederlands فعل کو آخر میں بھیج دیتا ہے، یعنی یہاں جملہ بالکل اردو کی ترتیب میں چلتا ہے۔",
      examples: [
        {
          urdu: [["کیونکہ", "reason"], ["ہیٹنگ", "subj"], ["خراب", "obj"], ["ہے", "verb"]],
          dutch: [["omdat", "reason"], ["de verwarming", "subj"], ["kapot", "obj"], ["is", "verb"]],
          audio: "ik bel omdat de verwarming kapot is"
        }
      ],
      takeawayUrdu: "omdat کے بعد اردو والی ترتیب سوچیں: فعل آخر میں۔",
      mistake: { wrong: "omdat de verwarming is kapot", right: "omdat de verwarming kapot is" }
    },
    {
      id: "contrast-g-ch",
      lessonIds: ["a0-sounds-consonants"],
      verdict: "same",
      titleUrdu: "g اور ch = خ",
      introUrdu: "انگریزی والا “گ” نہیں! Nederlands کی g اور ch گلے سے نکلنے والی خ جیسی آواز ہیں۔ اردو بولنے والوں کے لیے یہ آسان ہے۔",
      pairs: [
        { nl: "goed", ur: "خُوت", note: "g = خ" },
        { nl: "acht", ur: "اَخت", note: "ch = خ" },
        { nl: "water", ur: "وَا تَر", note: "w = ہلکا و، ہونٹ قریب" },
        { nl: "vijf", ur: "فَیف", note: "v = ف اور و کے بیچ" }
      ],
      audio: "goed",
      takeawayUrdu: "g دیکھیں تو خ بولیں۔ اردو کا “و” Nederlands میں w اور v دونوں بنتا ہے، اس لیے ان دونوں کو غور سے سنیں۔"
    },
    {
      id: "contrast-new-vowels",
      lessonIds: ["a0-sounds-vowels"],
      verdict: "different",
      titleUrdu: "تین آوازیں جو اردو میں نہیں",
      introUrdu: "ui، eu، اور ij کی کوئی پوری اردو آواز نہیں۔ اردو حروف صرف قریب لے جاتے ہیں، باقی کان سے سیکھیں۔",
      pairs: [
        { nl: "huis", ur: "ہاؤس جیسا", note: "ui: ہونٹ گول کر کے “اَو”" },
        { nl: "neus", ur: "نُوس جیسا", note: "eu: “اے” کہیں اور ہونٹ گول کریں" },
        { nl: "vijf", ur: "فَیف", note: "ij: “اَے” جیسا، “ای” نہیں" }
      ],
      audio: "huis",
      takeawayUrdu: "ان لفظوں کو آہستہ آواز میں سنیں اور ہونٹوں کی شکل کی نقل کریں۔"
    }
  ];

  const byLesson = new Map(cards.flatMap((card) => card.lessonIds.map((id) => [id, card])));
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function forLesson(lessonId) {
    return byLesson.get(lessonId) || null;
  }

  function makeQuestion(lesson) {
    const card = forLesson(lesson?.id);
    if (!card) return null;
    return {
      id: `${lesson.id}-${card.id}`,
      type: "contrast-teach",
      phase: "learn",
      instructionUrdu: card.verdict === "same" ? "اردو سے مدد: یہ بات ایک جیسی ہے" : "اردو اور Nederlands کا فرق",
      prompt: card.titleUrdu,
      answer: "سمجھ گیا",
      contrast: card
    };
  }

  function chips(line, dir) {
    return `<div class="ct-line" dir="${dir}">${line.map(([text, role]) => (
      `<span class="ct-chip role-${role} ${dir === "ltr" ? "latin" : ""}">${esc(text)}${role === "verb" ? `<i>${roles.verb}</i>` : ""}</span>`
    )).join("")}</div>`;
  }

  function legend(card) {
    const used = [...new Set((card.examples || []).flatMap((ex) => [...ex.urdu, ...ex.dutch].map(([, role]) => role)))];
    if (!used.length) return "";
    return `<div class="ct-legend" aria-hidden="true">${used.map((role) => `<span class="role-${role}">${roles[role] || ""}</span>`).join("")}</div>`;
  }

  // speak(text) renders the app's own speaker button, so audio follows the
  // learner's pronunciation setting and plays the recorded clip.
  function render(card, { speak = () => "" } = {}) {
    const same = card.verdict === "same";
    return `
      <article class="learning-teaching-card contrast-card ${same ? "is-same" : "is-different"}">
        <span class="ct-verdict">${same ? "اردو جیسا ✓" : "اردو سے مختلف"}</span>
        <h2 class="ct-title">${NU.contrast.mixed(card.titleUrdu)}</h2>
        <p class="ct-intro">${NU.contrast.mixed(card.introUrdu)}</p>
        ${(card.examples || []).map((ex) => `
          <div class="ct-example">
            <div class="ct-row"><span class="ct-flag">اردو</span>${chips(ex.urdu, "rtl")}</div>
            <div class="ct-row"><span class="ct-flag latin">NL</span>${chips(ex.dutch, "ltr")}${ex.audio ? speak(ex.audio) : ""}</div>
          </div>
        `).join("")}
        ${legend(card)}
        ${card.pairs ? `
          <ul class="ct-pairs">
            ${card.pairs.map((pair) => `
              <li><strong class="latin" dir="ltr">${esc(pair.nl)}</strong><span class="ct-eq">=</span><b>${esc(pair.ur)}</b><small>${NU.contrast.mixed(pair.note)}</small></li>
            `).join("")}
          </ul>
          ${card.audio ? `<div class="ct-listen">${speak(card.audio)}<span>سنیں: <bdi class="latin" dir="ltr">${esc(card.audio)}</bdi></span></div>` : ""}
        ` : ""}
        ${card.mistake ? `
          <div class="ct-mistake">
            <span class="ct-wrong latin" dir="ltr">✗ ${esc(card.mistake.wrong)}</span>
            <span class="ct-right latin" dir="ltr">✓ ${esc(card.mistake.right)}</span>
          </div>
        ` : ""}
        <p class="ct-takeaway">${NU.contrast.mixed(card.takeawayUrdu)}</p>
      </article>
    `;
  }

  // Overridden by app.js with its escapeMixedText, which keeps quoted Dutch
  // words left-to-right inside Urdu prose.
  let mixed = esc;

  return {
    cards,
    forLesson,
    makeQuestion,
    render,
    get mixed() { return mixed; },
    set mixed(fn) { mixed = fn; }
  };
})();
