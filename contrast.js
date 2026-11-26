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
    reason: "وجہ",
    rest: "باقی"
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
          urdu: [["میں", "subj"], ["علی", "rest"], ["ہوں", "verb"]],
          dutch: [["ik", "subj"], ["ben", "verb"], ["Ali", "rest"]],
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
        { nl: "u", ur: "آپ", note: "ڈاکٹر، گیمینٹے، استاد، اجنبی", audio: "u" },
        { nl: "jij", ur: "تم", note: "دوست، بچے، ساتھی", audio: "jij" },
        { nl: "ik", ur: "میں", note: "خود اپنے لیے", audio: "ik" }
      ],
      takeawayUrdu: "جہاں اردو میں “آپ” کہتے ہیں، وہاں u کہیں۔ شک ہو تو u محفوظ ہے۔"
    },
    {
      id: "contrast-hij-zij",
      lessonIds: ["a0-hij-zij-wij"],
      verdict: "different",
      titleUrdu: "اردو کا ایک “وہ”، Nederlands کے دو لفظ",
      introUrdu: "اردو میں “وہ” مرد، عورت اور کئی لوگوں سب کے لیے ہے۔ Nederlands میں ایک مرد کے لیے hij اور ایک عورت کے لیے zij ہے۔ کئی لوگوں کے لیے بھی zij آتا ہے۔",
      pairs: [
        { nl: "hij", ur: "وہ (ایک مرد)", note: "صرف مرد یا لڑکے کے لیے", audio: "hij" },
        { nl: "zij", ur: "وہ (ایک عورت) / وہ لوگ", note: "عورت کے لیے بھی، کئی لوگوں کے لیے بھی؛ جملے سے پتا چلتا ہے کون", audio: "zij" },
        { nl: "wij", ur: "ہم", note: "میں اور کوئی اور", audio: "wij" }
      ],
      takeawayUrdu: "ایک مرد: hij۔ ایک عورت: zij۔ کئی لوگ: وہی zij۔"
    },
    {
      id: "contrast-de-het",
      lessonIds: ["a0-een-de-het"],
      verdict: "different",
      titleUrdu: "اردو میں “the” نہیں ہوتا",
      introUrdu: "اردو میں صرف “آدمی” یا “گھر” کہتے ہیں۔ Nederlands میں اسم کے ساتھ اکثر de یا het لگتا ہے، اور کون سا لگے گا یہ اصول سے کم، یاد سے زیادہ آتا ہے۔",
      pairs: [
        { nl: "de man", ur: "آدمی", note: "de", audio: "de man" },
        { nl: "de deur", ur: "دروازہ", note: "de", audio: "de deur" },
        { nl: "het kind", ur: "بچہ", note: "het", audio: "het kind" },
        { nl: "het huis", ur: "گھر", note: "het", audio: "het huis" }
      ],
      takeawayUrdu: "لفظ کو ہمیشہ de یا het کے ساتھ ایک ٹکڑے کی طرح یاد کریں: “het huis”، صرف “huis” نہیں۔",
      mistake: { wrong: "de huis", right: "het huis" }
    },
    {
      id: "contrast-niet-geen",
      lessonIds: ["a0-geen"],
      verdict: "different",
      titleUrdu: "اردو کا ایک “نہیں”، Nederlands کے دو لفظ",
      introUrdu: "اردو میں ہر جگہ “نہیں” کافی ہے۔ Nederlands میں کسی چیز (اسم) سے پہلے “کوئی ___ نہیں” ہو تو geen آتا ہے۔ باقی جگہ niet آتا ہے، جیسے “ٹھیک نہیں” یا “یہاں نہیں”۔",
      examples: [
        {
          urdu: [["اس کے پاس", "subj"], ["قلم", "obj"], ["نہیں", "neg"], ["ہے", "verb"]],
          dutch: [["zij", "subj"], ["heeft", "verb"], ["geen", "neg"], ["pen", "obj"]],
          audio: "zij heeft geen pen"
        },
        {
          urdu: [["یہ", "subj"], ["ٹھیک", "rest"], ["نہیں", "neg"], ["ہے", "verb"]],
          dutch: [["het", "subj"], ["is", "verb"], ["niet", "neg"], ["goed", "rest"]],
          audio: "het is niet goed"
        }
      ],
      takeawayUrdu: "اسم سے پہلے geen (geen pen)۔ باقی ہر جگہ niet، فعل کے بعد (is niet goed)۔",
      mistake: { wrong: "ik heb niet pen", right: "ik heb geen pen" }
    },
    {
      id: "contrast-word-order",
      lessonIds: ["a0-word-order"],
      verdict: "different",
      titleUrdu: "عام جملے میں فعل دوسرے نمبر پر",
      introUrdu: "اردو میں “یہاں” آگے کریں تو باقی جملہ ویسا ہی رہتا ہے۔ Nederlands کے عام جملے میں جو بھی پہلے آئے، فعل دوسرے نمبر پر رہتا ہے اور ik اس کے بعد چلا جاتا ہے۔",
      examples: [
        {
          urdu: [["میں", "subj"], ["یہاں", "place"], ["کام کرتا/کرتی ہوں", "verb"]],
          dutch: [["ik", "subj"], ["werk", "verb"], ["hier", "place"]],
          audio: "ik werk hier"
        },
        {
          urdu: [["یہاں", "place"], ["میں", "subj"], ["کام کرتا/کرتی ہوں", "verb"]],
          dutch: [["hier", "place"], ["werk", "verb"], ["ik", "subj"]],
          audio: "hier werk ik"
        },
        {
          urdu: [["کیا", "q"], ["تم", "subj"], ["یہاں", "place"], ["کام کرتے/کرتی ہو؟", "verb"]],
          dutch: [["werk", "verb"], ["jij", "subj"], ["hier?", "place"]],
          audio: "werk jij hier?"
        }
      ],
      takeawayUrdu: "عام جملہ: فعل دوسرے نمبر پر۔ سوال: “کیا” جیسا لفظ نہیں لگتا، فعل سب سے آگے آ جاتا ہے۔",
      mistake: { wrong: "hier ik werk", right: "hier werk ik" }
    },
    {
      id: "contrast-future-gaan",
      lessonIds: ["a1-future-gaan"],
      verdict: "same",
      titleUrdu: "اصل کام آخر میں، جیسے اردو",
      introUrdu: "ga عام جملے کی طرح دوسرے نمبر پر رہتا ہے۔ مگر اصل کام والا لفظ (werken) جملے کے آخر میں جاتا ہے، جیسے اردو میں “کام کروں گا” آخر میں آتا ہے۔",
      examples: [
        {
          urdu: [["میں", "subj"], ["کل", "time"], ["کام کروں گا/گی", "verb"]],
          dutch: [["ik", "subj"], ["ga", "verb"], ["morgen", "time"], ["werken", "verb"]],
          audio: "ik ga morgen werken"
        }
      ],
      takeawayUrdu: "ga دوسرے نمبر پر، اصل کام آخر میں۔ صرف آخر والا حصہ اردو جیسا ہے۔",
      mistake: { wrong: "ik ga werken morgen", right: "ik ga morgen werken" }
    },
    {
      id: "contrast-omdat",
      lessonIds: ["a2-reasons-omdat-dat"],
      verdict: "same",
      titleUrdu: "omdat کے بعد فعل آخر میں، جیسے اردو",
      introUrdu: "omdat (کیونکہ) کے بعد Nederlands فعل کو آخر میں بھیج دیتا ہے، یعنی omdat والا حصہ اردو کی ترتیب میں چلتا ہے۔",
      examples: [
        {
          urdu: [["کیونکہ", "reason"], ["میں", "subj"], ["بیمار", "rest"], ["ہوں", "verb"]],
          dutch: [["omdat", "reason"], ["ik", "subj"], ["ziek", "rest"], ["ben", "verb"]],
          audio: "omdat ik ziek ben"
        }
      ],
      takeawayUrdu: "omdat کے بعد اردو والی ترتیب سوچیں: فعل آخر میں۔",
      mistake: { wrong: "omdat ik ben ziek", right: "omdat ik ziek ben" }
    },
    {
      id: "contrast-g-ch",
      lessonIds: ["a0-sounds-consonants"],
      verdict: "same",
      titleUrdu: "g اور ch = خ",
      introUrdu: "انگریزی والا “گ” نہیں! Nederlands کی g اور ch گلے سے نکلنے والی خ جیسی آواز ہیں۔ اردو میں خ موجود ہے، اس لیے یہ آسان ہے۔",
      pairs: [
        { nl: "geel", ur: "خیل", note: "g = خ، “گیل” نہیں", audio: "geel" },
        { nl: "lachen", ur: "لاخَن", note: "ch = خ، “چ” نہیں", audio: "lachen" },
        { nl: "schoen", ur: "سخُون", note: "sch = س + خ، “ش” نہیں", audio: "schoen" }
      ],
      takeawayUrdu: "g اور ch کو خ بولیں۔ صرف جب n اور g ساتھ ہوں (ng) تو آواز الگ ہوتی ہے۔"
    },
    {
      id: "contrast-new-vowels",
      lessonIds: ["a0-sounds-vowels"],
      verdict: "different",
      titleUrdu: "گول ہونٹوں والی آوازیں",
      introUrdu: "ui اور eu کی کوئی پوری اردو آواز نہیں، اور ij اردو کے “اَے” سے صرف قریب ہے۔ اردو حروف راستہ دکھاتے ہیں، باقی کان سے سیکھیں۔",
      pairs: [
        { nl: "muis", ur: "مَؤس", note: "ui: ہونٹ گول اور تنگ؛ کھلا “آؤ” نہیں", audio: "muis" },
        { nl: "neus", ur: "نُوس", note: "eu: “اے” کہیں اور ساتھ ہونٹ گول کریں؛ “او” نہیں", audio: "neus" },
        { nl: "ijs", ur: "اَیس", note: "ij: “اَے” جیسا؛ “ای” یا انگریزی “آئی” نہیں", audio: "ijs" }
      ],
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

  // A speaker plus the Dutch line it plays. With pronunciation off speak()
  // returns nothing, and then the "listen" label is left out too.
  function listen(text, speak) {
    const button = text ? speak(text) : "";
    return button ? `<div class="ct-listen">${button}<span>سنیں</span></div>` : "";
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
            ${chips(ex.urdu, "rtl")}
            ${chips(ex.dutch, "ltr")}
            ${listen(ex.audio, speak)}
          </div>
        `).join("")}
        ${legend(card)}
        ${card.pairs ? `
          <ul class="ct-pairs">
            ${card.pairs.map((pair) => `
              <li><strong class="latin" dir="ltr">${esc(pair.nl)}</strong><span class="ct-eq">=</span><b>${esc(pair.ur)}</b>${pair.audio ? speak(pair.audio) : ""}<small>${NU.contrast.mixed(pair.note)}</small></li>
            `).join("")}
          </ul>
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
