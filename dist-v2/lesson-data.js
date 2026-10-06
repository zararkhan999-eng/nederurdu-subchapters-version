(() => {
  "use strict";

  const lessons = [
    {
      id: "meet-neighbour",
      number: "01",
      title: "Hallo en aangenaam",
      urduTitle: "سلام اور پہلا تعارف",
      canDo: "میں کسی نئے شخص کو سلام کر کے اپنا نام بتا سکتا/سکتی ہوں۔",
      context: "نئے پڑوسی سے پہلی ملاقات",
      minutes: 8,
      status: "current",
      icon: "wave",
      art: "neighbour",
      brief: {
        sceneLabel: "نئے پڑوسی سے پہلی ملاقات",
        speaker: "Samira",
        initial: "S",
        tone: "samira",
        dutch: "Goedemorgen, ik ben Samira. Aangenaam.",
        urdu: "صبح بخیر، میں سمیرا ہوں۔ آپ سے مل کر خوشی ہوئی۔",
        newLanguage: ["goedemorgen", "ik ben…", "aangenaam", "hoe heet u?"]
      },
      scene: {
        eyebrow: "پہلے صرف موقع سمجھیں",
        title: "دروازے پر نئی ملاقات",
        note: "ابھی جواب یاد کرنے کی ضرورت نہیں۔ پہلے آواز، لوگوں، اور موقع کو پہچانیں۔",
        lines: [
          { speaker: "Samira", initial: "S", tone: "samira", dutch: "Goedemorgen, ik ben Samira.", urdu: "صبح بخیر، میں سمیرا ہوں۔" },
          { speaker: "Yusuf", initial: "Y", tone: "yusuf", dutch: "Hallo, ik ben Yusuf. Aangenaam.", urdu: "ہیلو، میں یوسف ہوں۔ آپ سے مل کر خوشی ہوئی۔" }
        ]
      },
      decode: {
        eyebrow: "معنی + آواز + موقع",
        title: "چار پوری باتیں سیکھیں",
        note: "لفظ الگ نہیں: ہر بات اسی صورت میں یاد کریں جس میں وہ واقعی استعمال ہوتی ہے۔",
        items: [
          { form: "goedemorgen", audio: "Goedemorgen.", sound: "خودے مورخن", meaning: "صبح بخیر", use: "صبح کے وقت سلام" },
          { form: "ik ben…", audio: "Ik ben Yusuf.", sound: "اِک بَین", meaning: "میں … ہوں", use: "اپنا نام یا پہچان بتائیں" },
          { form: "aangenaam", audio: "Aangenaam.", sound: "آن خَنام", meaning: "مل کر خوشی ہوئی", use: "پہلی ملاقات کا مہذب جواب" },
          { form: "hoe heet u?", audio: "Hoe heet u?", sound: "ہُو ہَیت اُو", meaning: "آپ کا نام کیا ہے؟", use: "ادب سے نام پوچھیں" }
        ]
      },
      notice: {
        eyebrow: "مثال پہلے، قاعدہ بعد میں",
        title: "اپنا نام جملے میں رکھیں",
        tokens: [
          { text: "Ik", tone: "person" },
          { text: "ben", tone: "verb" },
          { text: "Yusuf", tone: "open" }
        ],
        meanings: ["کون؟", "کیا ہے؟", "نام"],
        ruleDutch: "Ik + ben + naam",
        ruleUrdu: "اپنا تعارف: میں + ہوں + نام",
        contrast: [
          { label: "کہنا", text: "Ik ben Yusuf." },
          { label: "پوچھنا", text: "Hoe heet u?" }
        ],
        cautionTitle: "چھوٹی احتیاط",
        cautionDutch: "Ik ben heet Yusuf",
        cautionUrdu: "نہ کہیں۔ تعارف کے لیے صرف Ik ben Yusuf کافی ہے۔"
      },
      rehearse: {
        eyebrow: "ماڈل سامنے ہے",
        title: "مناسب جواب چنیں",
        speaker: "Samira",
        initial: "S",
        tone: "samira",
        promptDutch: "Goedemorgen, ik ben Samira.",
        promptUrdu: "صبح بخیر، میں سمیرا ہوں۔",
        instruction: "آپ پہلی بار مل رہے ہیں۔ کون سا جواب اس موقع کے لیے درست ہے؟",
        model: "Aangenaam, ik ben …",
        options: ["Aangenaam, ik ben Yusuf.", "Tot ziens, waar is de trein?", "Ik woon een koffie."],
        correct: "Aangenaam, ik ben Yusuf.",
        correctFeedback: "Aangenaam پہلی ملاقات کا مناسب جواب ہے، اور ik ben کے بعد آپ اپنا نام رکھتے ہیں۔",
        wrongFeedback: "یہ جواب پہلی ملاقات سے متعلق نہیں۔ ماڈل دوبارہ دیکھیں: Aangenaam, ik ben …"
      },
      act: {
        eyebrow: "اپنی محفوظ بات بنائیں",
        title: "اب اپنا نام استعمال کریں",
        badge: "لفظ سامنے ہیں",
        visualTone: "saffron",
        preview: "Goedemorgen, ik ben {{name}}.",
        instruction: "صرف نام لکھیں؛ باقی جملہ پہلے سے تیار ہے۔",
        speechHint: "جملہ سنیں، توقف کریں، پھر اپنی آواز میں کہیں۔",
        fields: [
          { key: "name", label: "اپنا نام", placeholder: "Yusuf", autocomplete: "name", maxLength: 32 }
        ]
      },
      check: {
        eyebrow: "نیا مگر متعلقہ موقع",
        title: "انتظار گاہ میں تعارف",
        sign: "Buurtcentrum",
        setting: "نئے لوگوں کی ملاقات · دوپہر",
        speaker: "Omar",
        initial: "O",
        tone: "omar",
        promptDutch: "Goedemiddag, ik ben Omar.",
        promptUrdu: "دوپہر بخیر، میں عمر ہوں۔",
        instruction: "اب صبح نہیں، دوپہر ہے۔ کون سا جواب موقع اور تعارف دونوں کے مطابق ہے؟",
        options: ["Goedemiddag, ik ben Yusuf. Aangenaam.", "Ik ben waar woont u.", "Tot morgen, ik wil een jas."],
        correct: "Goedemiddag, ik ben Yusuf. Aangenaam.",
        correctFeedback: "Goedemiddag دوپہر کے وقت درست سلام ہے۔ ik ben کے ساتھ تعارف اور Aangenaam کے ساتھ پہلی ملاقات مکمل ہوئی۔",
        wrongFeedback: "جواب کے حصے ایک دوسرے سے نہیں ملتے۔ دوپہر کا سلام + ik ben + نام + Aangenaam استعمال کریں۔"
      },
      complete: {
        dutch: "U kunt kennismaken.",
        urdu: "آپ سلام کر کے اپنا نام بتا سکتے ہیں اور پہلی ملاقات میں مناسب جواب دے سکتے ہیں۔",
        proofs: [
          { icon: "speaker", text: "سلام پہچانا" },
          { icon: "dialogue", text: "اپنا تعارف بنایا" },
          { icon: "route", text: "نئے موقع پر استعمال کیا" }
        ],
        nextId: "say-spell-name"
      },
      reviewLinks: ["ask-back", "people-mission", "practice:greetings:1d"]
    },
    {
      id: "say-spell-name",
      number: "02",
      title: "Mijn naam spellen",
      urduTitle: "اپنا نام کہنا اور ہجے کرنا",
      canDo: "میں استقبالیہ پر اپنا نام کہہ اور حرف بہ حرف واضح کر سکتا/سکتی ہوں۔",
      context: "کمیونٹی سینٹر میں نام درج کروانا",
      minutes: 9,
      status: "available",
      icon: "letters",
      art: "reception",
      brief: {
        sceneLabel: "استقبالیہ پر نام درج کروانا",
        speaker: "Medewerker",
        initial: "M",
        tone: "omar",
        dutch: "Hoe heet u? Hoe schrijft u dat?",
        urdu: "آپ کا نام کیا ہے؟ آپ اسے کیسے لکھتے ہیں؟",
        newLanguage: ["mijn naam is…", "hoe schrijft u dat?", "letter voor letter", "dat is…"]
      },
      scene: {
        eyebrow: "نام سنیں، پھر حروف دیکھیں",
        title: "رجسٹریشن ڈیسک پر",
        note: "دوسری بار سوال نام کے مطلب کے بارے میں نہیں؛ نام کے حروف واضح کرنے کے لیے ہے۔",
        lines: [
          { speaker: "Medewerker", initial: "M", tone: "omar", dutch: "Goedemiddag. Hoe heet u?", urdu: "دوپہر بخیر۔ آپ کا نام کیا ہے؟" },
          { speaker: "Zara", initial: "Z", tone: "samira", dutch: "Mijn naam is Zara Khan.", urdu: "میرا نام زارا خان ہے۔" },
          { speaker: "Medewerker", initial: "M", tone: "omar", dutch: "Hoe schrijft u Khan?", urdu: "آپ خان کیسے لکھتے ہیں؟" },
          { speaker: "Zara", initial: "Z", tone: "samira", dutch: "K - H - A - N.", urdu: "کے، ہا، آ، اَین۔" }
        ]
      },
      decode: {
        eyebrow: "پوری بات + Dutch حروف",
        title: "نام پوچھیں اور واضح کریں",
        note: "اپنا اصل نام استعمال کریں۔ حروف کے درمیان مختصر وقفہ رکھیں تاکہ دوسرا شخص لکھ سکے۔",
        items: [
          { form: "mijn naam is…", audio: "Mijn naam is Zara.", sound: "مَین نام اِس", meaning: "میرا نام … ہے", use: "پورا نام بتانے کا واضح طریقہ" },
          { form: "hoe schrijft u dat?", audio: "Hoe schrijft u dat?", sound: "ہُو سخرَیفت اُو دات", meaning: "آپ اسے کیسے لکھتے ہیں؟", use: "حروف یا املا پوچھیں" },
          { form: "letter voor letter", audio: "Letter voor letter.", sound: "لَیتر فور لَیتر", meaning: "حرف بہ حرف", use: "نام آہستہ واضح کریں" },
          { form: "K · H · A · N", audio: "K. H. A. N.", sound: "کا · ہا · آ · اَین", meaning: "KHAN کے Dutch حرف", use: "ہر حرف الگ سنیں اور کہیں" }
        ]
      },
      notice: {
        eyebrow: "دو درست تعارف، ایک نیا کام",
        title: "نام کے لیے mijn naam is",
        tokens: [
          { text: "Mijn naam", tone: "person" },
          { text: "is", tone: "verb" },
          { text: "Zara", tone: "open" }
        ],
        meanings: ["میرا نام", "ہے", "نام"],
        ruleDutch: "Mijn naam + is + naam",
        ruleUrdu: "فارم یا ڈیسک پر پورا نام واضح کرنے کا جملہ",
        contrast: [
          { label: "مختصر تعارف", text: "Ik ben Zara." },
          { label: "نام واضح کرنا", text: "Mijn naam is Zara." }
        ],
        cautionTitle: "آواز کی احتیاط",
        cautionDutch: "Zara Khan",
        cautionUrdu: "کو ایک ہی تیز لفظ نہ بنائیں۔ پہلے پورا نام، پھر ضرورت ہو تو حرف بہ حرف کہیں۔"
      },
      rehearse: {
        eyebrow: "پہلے سنیں، پھر جواب",
        title: "کون سا جواب نام کے حروف دیتا ہے؟",
        speaker: "Medewerker",
        initial: "M",
        tone: "omar",
        promptDutch: "Hoe schrijft u Khan?",
        promptUrdu: "آپ خان کیسے لکھتے ہیں؟",
        instruction: "ملازم کو نام لکھنا ہے۔ کون سا جواب واقعی املا واضح کرتا ہے؟",
        model: "Letter voor letter: K - H - A - N.",
        options: ["K - H - A - N.", "Ik woon in Khan.", "Goedemorgen, negen euro."],
        correct: "K - H - A - N.",
        correctFeedback: "ہر حرف الگ کہنے سے ملازم نام درست لکھ سکتا ہے۔ یہی سوال کا مقصد تھا۔",
        wrongFeedback: "سوال Hoe schrijft u… نام کے حروف مانگ رہا ہے۔ حرف بہ حرف جواب دیں۔"
      },
      act: {
        eyebrow: "اپنا نام، اپنی آواز",
        title: "اپنا نام حرف بہ حرف کہیں",
        badge: "بغیر نمبر",
        visualTone: "blue",
        preview: "Mijn naam is {{name}}. Dat is: {{spelled:name}}.",
        instruction: "اپنا نام لکھیں۔ ہم اسے حروف میں الگ کر دیں گے؛ پھر Dutch حرفوں کے نام سن کر خود کہیں۔",
        speechHint: "پہلے پورا نام، مختصر وقفہ، پھر ہر حرف الگ کہیں۔",
        fields: [
          { key: "name", label: "آپ کا نام", placeholder: "Zara", autocomplete: "name", maxLength: 32 }
        ]
      },
      check: {
        eyebrow: "نیا ڈیسک، وہی مہارت",
        title: "فارمیسی میں خاندانی نام",
        sign: "Apotheek",
        setting: "نسخہ وصول کرنا · نام کی تصدیق",
        speaker: "Assistent",
        initial: "A",
        tone: "omar",
        promptDutch: "Wat is uw achternaam? Hoe schrijft u dat?",
        promptUrdu: "آپ کا خاندانی نام کیا ہے؟ آپ اسے کیسے لکھتے ہیں؟",
        instruction: "کون سا جواب خاندانی نام اور اس کے حروف دونوں واضح کرتا ہے؟",
        options: ["Mijn achternaam is Khan. K - H - A - N.", "Ik kom morgen met de bus.", "Mijn naam woont in Utrecht."],
        correct: "Mijn achternaam is Khan. K - H - A - N.",
        correctFeedback: "پہلے خاندانی نام بتایا، پھر اسی نام کے حروف الگ کیے؛ ڈیسک کا کام مکمل ہو گیا۔",
        wrongFeedback: "ملازم کو خاندانی نام اور اس کا املا چاہیے۔ Mijn achternaam is… کے بعد حروف الگ کہیں۔"
      },
      complete: {
        dutch: "U kunt uw naam spellen.",
        urdu: "آپ اپنا نام واضح بتا اور ضرورت پر حرف بہ حرف کہہ سکتے ہیں۔",
        proofs: [
          { icon: "letters", text: "حروف پہچانے" },
          { icon: "speaker", text: "وقفے کے ساتھ کہا" },
          { icon: "edit", text: "فارم کے موقع پر استعمال کیا" }
        ],
        nextId: "origin-home"
      },
      reviewLinks: ["people-mission", "learning:alphabet", "practice:spelling:2d"]
    },
    {
      id: "origin-home",
      number: "03",
      title: "Waar woont u?",
      urduTitle: "ملک اور رہنے کی جگہ",
      canDo: "میں بتا سکتا/سکتی ہوں کہ کہاں سے ہوں اور اب کہاں رہتا/رہتی ہوں۔",
      context: "محلے کے مرکز میں مختصر گفتگو",
      minutes: 10,
      status: "available",
      icon: "pin",
      art: "community",
      brief: {
        sceneLabel: "محلے کے مرکز میں خوش آمدید",
        speaker: "Medewerker",
        initial: "M",
        tone: "omar",
        dutch: "Waar komt u vandaan? Waar woont u?",
        urdu: "آپ کہاں سے ہیں؟ آپ کہاں رہتے ہیں؟",
        newLanguage: ["waar komt u vandaan?", "ik kom uit…", "waar woont u?", "ik woon in…"]
      },
      scene: {
        eyebrow: "دو جگہیں، دو الگ باتیں",
        title: "ملک اور موجودہ شہر",
        note: "uit اصل ملک یا جگہ کے ساتھ آتا ہے؛ in اس جگہ کے ساتھ جہاں آپ اب رہتے ہیں۔",
        lines: [
          { speaker: "Medewerker", initial: "M", tone: "omar", dutch: "Waar komt u vandaan?", urdu: "آپ کہاں سے ہیں؟" },
          { speaker: "Amina", initial: "A", tone: "samira", dutch: "Ik kom uit Pakistan.", urdu: "میں پاکستان سے ہوں۔" },
          { speaker: "Medewerker", initial: "M", tone: "omar", dutch: "Waar woont u?", urdu: "آپ کہاں رہتے ہیں؟" },
          { speaker: "Amina", initial: "A", tone: "samira", dutch: "Ik woon in Utrecht.", urdu: "میں اُتریخت میں رہتی ہوں۔" }
        ]
      },
      decode: {
        eyebrow: "سوال + مختصر جواب",
        title: "اصل جگہ اور موجودہ گھر",
        note: "ملک اور شہر کے نام نہ ترجمہ کریں۔ Dutch جملے میں نام اپنی اصل شکل میں رکھیں۔",
        items: [
          { form: "waar komt u vandaan?", audio: "Waar komt u vandaan?", sound: "وار کومت اُو فان دان", meaning: "آپ کہاں سے ہیں؟", use: "اصل ملک یا جگہ پوچھیں" },
          { form: "ik kom uit…", audio: "Ik kom uit Pakistan.", sound: "اِک کوم آؤٹ", meaning: "میں … سے ہوں", use: "اصل جگہ بتائیں" },
          { form: "waar woont u?", audio: "Waar woont u?", sound: "وار وونت اُو", meaning: "آپ کہاں رہتے ہیں؟", use: "موجودہ رہنے کی جگہ پوچھیں" },
          { form: "ik woon in…", audio: "Ik woon in Utrecht.", sound: "اِک وون اِن", meaning: "میں … میں رہتا/رہتی ہوں", use: "موجودہ شہر بتائیں" }
        ]
      },
      notice: {
        eyebrow: "معنی بدلنے والا چھوٹا لفظ",
        title: "kom uit اور woon in",
        tokens: [
          { text: "Ik", tone: "person" },
          { text: "kom uit", tone: "verb" },
          { text: "Pakistan", tone: "open" }
        ],
        meanings: ["میں", "سے ہوں", "اصل جگہ"],
        ruleDutch: "Ik kom uit + land · Ik woon in + plaats",
        ruleUrdu: "اصل جگہ کے لیے uit، موجودہ رہائش کے لیے in",
        contrast: [
          { label: "اصل جگہ", text: "Ik kom uit Pakistan." },
          { label: "اب کہاں", text: "Ik woon in Utrecht." }
        ],
        cautionTitle: "چھوٹی احتیاط",
        cautionDutch: "Ik woon uit Pakistan",
        cautionUrdu: "نہ کہیں۔ woon کے ساتھ موجودہ جگہ اور in استعمال کریں۔"
      },
      rehearse: {
        eyebrow: "سوال کا لفظ سنیں",
        title: "جواب کس جگہ کے بارے میں ہے؟",
        speaker: "Medewerker",
        initial: "M",
        tone: "omar",
        promptDutch: "Waar woont u?",
        promptUrdu: "آپ کہاں رہتے ہیں؟",
        instruction: "سوال موجودہ رہنے کی جگہ پوچھ رہا ہے۔ کون سا جواب درست ہے؟",
        model: "Ik woon in …",
        options: ["Ik woon in Utrecht.", "Ik kom uit om negen uur.", "Mijn naam is in Pakistan."],
        correct: "Ik woon in Utrecht.",
        correctFeedback: "woont موجودہ رہائش پوچھتا ہے، اس لیے Ik woon in + شہر مناسب جواب ہے۔",
        wrongFeedback: "سوال میں woont سنیں۔ موجودہ جگہ کے لیے Ik woon in… استعمال کریں۔"
      },
      act: {
        eyebrow: "دو اپنی معلومات جوڑیں",
        title: "ملک اور شہر بتائیں",
        badge: "دو محفوظ جملے",
        visualTone: "mint",
        preview: "Ik kom uit {{country}}. Ik woon in {{place}}.",
        instruction: "پہلے اصل ملک یا جگہ، پھر وہ شہر لکھیں جہاں آپ اب رہتے ہیں۔",
        speechHint: "دونوں جملوں کے درمیان وقفہ کریں؛ uit اور in واضح سنائی دیں۔",
        fields: [
          { key: "country", label: "اصل ملک یا جگہ", placeholder: "Pakistan", autocomplete: "country-name", maxLength: 40 },
          { key: "place", label: "موجودہ شہر", placeholder: "Utrecht", autocomplete: "address-level2", maxLength: 40 }
        ]
      },
      check: {
        eyebrow: "نیا شخص، دو سوال",
        title: "لائبریری کے تعارفی پروگرام میں",
        sign: "Bibliotheek",
        setting: "نئے رہائشیوں کی شام",
        speaker: "Noor",
        initial: "N",
        tone: "samira",
        promptDutch: "Waar komt u vandaan? En waar woont u?",
        promptUrdu: "آپ کہاں سے ہیں؟ اور آپ کہاں رہتے ہیں؟",
        instruction: "کون سا جواب اصل جگہ اور موجودہ شہر دونوں صحیح بتاتا ہے؟",
        options: ["Ik kom uit Pakistan. Ik woon in Delft.", "Ik woon uit Delft. Ik kom in Pakistan.", "Ik ben waar woont u."],
        correct: "Ik kom uit Pakistan. Ik woon in Delft.",
        correctFeedback: "پہلے kom uit کے ساتھ اصل ملک، پھر woon in کے ساتھ موجودہ شہر بتایا گیا۔",
        wrongFeedback: "دونوں جگہوں کو الگ رکھیں: kom uit + اصل جگہ، woon in + موجودہ شہر۔"
      },
      complete: {
        dutch: "U kunt uw land en woonplaats noemen.",
        urdu: "آپ اپنی اصل جگہ اور موجودہ رہنے کا شہر الگ اور واضح بتا سکتے ہیں۔",
        proofs: [
          { icon: "pin", text: "دونوں جگہیں الگ کیں" },
          { icon: "grammar", text: "uit اور in درست رکھے" },
          { icon: "dialogue", text: "دو سوالوں کا جواب دیا" }
        ],
        nextId: "ask-back"
      },
      reviewLinks: ["ask-back", "people-mission", "home:neighbourhood", "practice:places:2d"]
    },
    {
      id: "ask-back",
      number: "04",
      title: "En u?",
      urduTitle: "سامنے والے سے سوال کرنا",
      canDo: "میں تعارف کے دوران ادب سے ایک مناسب سوال واپس پوچھ سکتا/سکتی ہوں۔",
      context: "کافی کے وقفے میں گفتگو جاری رکھنا",
      minutes: 8,
      status: "available",
      icon: "dialogue",
      art: "conversation",
      brief: {
        sceneLabel: "کافی کے وقفے میں نئی جان پہچان",
        speaker: "Fatima",
        initial: "F",
        tone: "samira",
        dutch: "Ik woon in Leiden. En u?",
        urdu: "میں لَیڈن میں رہتی ہوں۔ اور آپ؟",
        newLanguage: ["en u?", "waar woont u?", "waar komt u vandaan?", "hoe heet u?"]
      },
      scene: {
        eyebrow: "جواب کے بعد گفتگو ختم نہیں",
        title: "ایک سوال واپس پوچھیں",
        note: "En u? مختصر اور مہذب ہے۔ واضح نئی معلومات چاہیے تو پورا سوال استعمال کریں۔",
        lines: [
          { speaker: "Fatima", initial: "F", tone: "samira", dutch: "Ik woon in Leiden. En u?", urdu: "میں لَیڈن میں رہتی ہوں۔ اور آپ؟" },
          { speaker: "Yusuf", initial: "Y", tone: "yusuf", dutch: "Ik woon in Den Haag.", urdu: "میں دی ہیگ میں رہتا ہوں۔" },
          { speaker: "Yusuf", initial: "Y", tone: "yusuf", dutch: "Waar komt u vandaan?", urdu: "آپ کہاں سے ہیں؟" },
          { speaker: "Fatima", initial: "F", tone: "samira", dutch: "Ik kom uit Marokko.", urdu: "میں مراکش سے ہوں۔" }
        ]
      },
      decode: {
        eyebrow: "مختصر سوال + پورا سوال",
        title: "گفتگو کو آگے بڑھائیں",
        note: "پہلی ملاقات اور رسمی جگہ پر u محفوظ انتخاب ہے۔ دوستوں میں بعد میں je سیکھیں گے۔",
        items: [
          { form: "en u?", audio: "En u?", sound: "اَین اُو", meaning: "اور آپ؟", use: "وہی سوال ادب سے واپس کریں" },
          { form: "waar woont u?", audio: "Waar woont u?", sound: "وار وونت اُو", meaning: "آپ کہاں رہتے ہیں؟", use: "موجودہ شہر پوچھیں" },
          { form: "waar komt u vandaan?", audio: "Waar komt u vandaan?", sound: "وار کومت اُو فان دان", meaning: "آپ کہاں سے ہیں؟", use: "اصل جگہ پوچھیں" },
          { form: "hoe heet u?", audio: "Hoe heet u?", sound: "ہُو ہَیت اُو", meaning: "آپ کا نام کیا ہے؟", use: "نام پوچھیں" }
        ]
      },
      notice: {
        eyebrow: "سوال میں ترتیب دیکھیں",
        title: "Waar + فعل + u",
        tokens: [
          { text: "Waar", tone: "person" },
          { text: "woont", tone: "verb" },
          { text: "u?", tone: "open" }
        ],
        meanings: ["کہاں", "رہتے ہیں", "آپ"],
        ruleDutch: "Vraagwoord + werkwoord + persoon",
        ruleUrdu: "سوالی لفظ کے بعد فعل، پھر شخص",
        contrast: [
          { label: "جواب", text: "Ik woon in Leiden." },
          { label: "سوال", text: "Waar woont u?" }
        ],
        cautionTitle: "لفظوں کی ترتیب",
        cautionDutch: "Waar u woont?",
        cautionUrdu: "سیدھا سوال نہیں۔ درست سوال میں woont، u سے پہلے آتا ہے۔"
      },
      rehearse: {
        eyebrow: "معلوم بات دوبارہ نہ پوچھیں",
        title: "کون سا سوال گفتگو بڑھاتا ہے؟",
        speaker: "Omar",
        initial: "O",
        tone: "omar",
        promptDutch: "Ik ben Omar. Ik kom uit Syrië.",
        promptUrdu: "میں عمر ہوں۔ میں شام سے ہوں۔",
        instruction: "نام اور ملک معلوم ہیں۔ اب کون سا سوال نئی مفید معلومات مانگتا ہے؟",
        model: "Waar woont u?",
        options: ["Waar woont u?", "Hoe heet u?", "Komt u uit Syrië?"],
        correct: "Waar woont u?",
        correctFeedback: "نام اور ملک پہلے ہی معلوم ہیں؛ رہنے کی جگہ پوچھنے سے گفتگو آگے بڑھتی ہے۔",
        wrongFeedback: "جو بات عمر ابھی بتا چکا ہے وہ دوبارہ نہ پوچھیں۔ نئی معلومات کے لیے Waar woont u? کہیں۔"
      },
      act: {
        eyebrow: "آپ گفتگو سنبھالیں",
        title: "ایک مناسب سوال منتخب کریں",
        badge: "سنیں اور کہیں",
        visualTone: "violet",
        preview: "{{choice}}",
        instruction: "سامنے والے نے اپنا نام بتایا ہے۔ اب ایک سوال چنیں، سنیں، اور خود کہیں۔",
        speechHint: "Waar یا Hoe سے آغاز واضح رکھیں، پھر فعل اور u کہیں۔",
        choices: [
          { value: "Waar woont u?", label: "موجودہ شہر پوچھیں" },
          { value: "Waar komt u vandaan?", label: "اصل جگہ پوچھیں" },
          { value: "En u?", label: "وہی سوال واپس کریں" }
        ]
      },
      check: {
        eyebrow: "جو معلوم نہیں، وہ پوچھیں",
        title: "محلے کی ملاقات میں",
        sign: "Burenavond",
        setting: "نئے پڑوسیوں کی مختصر گفتگو",
        speaker: "Lina",
        initial: "L",
        tone: "samira",
        promptDutch: "Ik ben Lina. Ik woon in Gouda.",
        promptUrdu: "میں لینا ہوں۔ میں گاؤڈا میں رہتی ہوں۔",
        instruction: "نام اور شہر معلوم ہیں۔ کون سا سوال نئی ذاتی معلومات مانگتا ہے؟",
        options: ["Waar komt u vandaan?", "Waar woont u?", "Hoe heet u?"],
        correct: "Waar komt u vandaan?",
        correctFeedback: "لینا نام اور شہر بتا چکی ہے؛ اصل جگہ ابھی معلوم نہیں، اس لیے یہی مناسب نیا سوال ہے۔",
        wrongFeedback: "پہلے سنیں کہ کیا معلوم ہے۔ نام اور شہر دوبارہ پوچھنے کے بجائے اصل جگہ پوچھیں۔"
      },
      complete: {
        dutch: "U kunt een vraag terugstellen.",
        urdu: "آپ معلوم بات کو سمجھے بغیر دہرانے کے بجائے مناسب نیا سوال پوچھ سکتے ہیں۔",
        proofs: [
          { icon: "eye", text: "معلوم بات پہچانی" },
          { icon: "grammar", text: "سوال کی ترتیب رکھی" },
          { icon: "dialogue", text: "گفتگو آگے بڑھائی" }
        ],
        nextId: "people-mission"
      },
      reviewLinks: ["people-mission", "learning:politeness", "practice:questions:3d"]
    },
    {
      id: "people-mission",
      number: "M",
      title: "Kennismaken",
      urduTitle: "کمیونٹی سینٹر میں تعارف",
      canDo: "میں نئی ملاقات میں سلام، نام، ہجے، جگہ، اور ایک مناسب سوال استعمال کر سکتا/سکتی ہوں۔",
      context: "نئے رہائشیوں کی خوش آمدید شام",
      minutes: 12,
      status: "mission",
      icon: "flag",
      art: "mission",
      brief: {
        sceneLabel: "تازہ معلومات کے ساتھ عملی مشن",
        speaker: "Gastheer",
        initial: "G",
        tone: "omar",
        dutch: "Welkom. Vertel iets over uzelf.",
        urdu: "خوش آمدید۔ اپنے بارے میں کچھ بتائیے۔",
        newLanguage: ["goedemiddag", "mijn naam is…", "ik kom uit…", "ik woon in…", "en u?"]
      },
      scene: {
        eyebrow: "یہ نئی تعلیم نہیں، آپ کی تیاری ہے",
        title: "خوش آمدید شام شروع ہوتی ہے",
        note: "مشن میں صرف وہی بنیادی زبان استعمال ہوگی جو پچھلے چار مناظر میں ماڈل، مشق، اور جانچ کے ساتھ آ چکی ہے۔",
        lines: [
          { speaker: "Gastheer", initial: "G", tone: "omar", dutch: "Welkom. Vertel iets over uzelf.", urdu: "خوش آمدید۔ اپنے بارے میں کچھ بتائیے۔" },
          { speaker: "Noor", initial: "N", tone: "samira", dutch: "Goedemiddag. Ik ben Noor.", urdu: "دوپہر بخیر۔ میں نور ہوں۔" },
          { speaker: "Noor", initial: "N", tone: "samira", dutch: "Ik kom uit Turkije en ik woon in Delft.", urdu: "میں ترکی سے ہوں اور ڈیلفٹ میں رہتی ہوں۔" },
          { speaker: "Noor", initial: "N", tone: "samira", dutch: "En u?", urdu: "اور آپ؟" }
        ]
      },
      decode: {
        eyebrow: "پانچ پہلے سے سیکھی ہوئی اینٹیں",
        title: "اپنا مختصر تعارف تیار کریں",
        note: "مشن میں ہر جملہ ضروری نہیں۔ موقع کے مطابق تین یا چار باتیں کافی ہیں؛ سامنے والے کے لیے جگہ چھوڑیں۔",
        items: [
          { form: "goedemiddag", audio: "Goedemiddag.", sound: "خودے مِداخ", meaning: "دوپہر بخیر", use: "شام سے پہلے مہذب سلام" },
          { form: "mijn naam is…", audio: "Mijn naam is Noor.", sound: "مَین نام اِس", meaning: "میرا نام … ہے", use: "نام واضح کریں" },
          { form: "ik kom uit…", audio: "Ik kom uit Turkije.", sound: "اِک کوم آؤٹ", meaning: "میں … سے ہوں", use: "اصل جگہ بتائیں" },
          { form: "ik woon in…", audio: "Ik woon in Delft.", sound: "اِک وون اِن", meaning: "میں … میں رہتا/رہتی ہوں", use: "موجودہ شہر بتائیں" },
          { form: "en u?", audio: "En u?", sound: "اَین اُو", meaning: "اور آپ؟", use: "گفتگو دوسرے شخص کو دیں" }
        ]
      },
      notice: {
        eyebrow: "قاعدہ نہیں، گفتگو کا نقشہ",
        title: "سلام → اپنی بات → سوال",
        tokens: [
          { text: "Goedemiddag", tone: "person" },
          { text: "Ik ben…", tone: "verb" },
          { text: "En u?", tone: "open" }
        ],
        meanings: ["سلام", "مختصر تعارف", "دوسرے کو موقع"],
        ruleDutch: "Groet + informatie + vraag",
        ruleUrdu: "پہلے سلام، پھر دو مفید معلومات، آخر میں مناسب سوال",
        contrast: [
          { label: "بہت کم", text: "Hallo." },
          { label: "مکمل مگر مختصر", text: "Hallo. Ik ben Noor. En u?" }
        ],
        cautionTitle: "گفتگو، تقریر نہیں",
        cautionDutch: "Zes losse zinnen zonder vraag",
        cautionUrdu: "ایک ساتھ بہت سی باتیں نہ کہیں۔ مختصر تعارف کے بعد دوسرے شخص کو جواب کا موقع دیں۔"
      },
      rehearse: {
        eyebrow: "مشن سے پہلے آخری محفوظ کوشش",
        title: "اگلی مناسب بات چنیں",
        speaker: "Noor",
        initial: "N",
        tone: "samira",
        promptDutch: "Hallo, ik ben Noor. Ik woon in Delft.",
        promptUrdu: "ہیلو، میں نور ہوں۔ میں ڈیلفٹ میں رہتی ہوں۔",
        instruction: "آپ پہلی بار مل رہے ہیں۔ کون سا جواب تعارف بھی کرتا ہے اور گفتگو بھی آگے بڑھاتا ہے؟",
        model: "Aangenaam. Ik ben … Waar komt u vandaan?",
        options: ["Aangenaam. Ik ben Yusuf. Waar komt u vandaan?", "De apotheek is om negen uur.", "Ik woon uit een koffie."],
        correct: "Aangenaam. Ik ben Yusuf. Waar komt u vandaan?",
        correctFeedback: "جواب نے ملاقات قبول کی، اپنا نام بتایا، اور ایک نئی مناسب بات پوچھی۔",
        wrongFeedback: "مشن کے مقصد پر واپس آئیں: ملاقات کا جواب + اپنا تعارف + ایک متعلقہ سوال۔"
      },
      act: {
        eyebrow: "آپ کا عملی مشن",
        title: "اپنا تعارف بنائیں اور بولیں",
        badge: "تین اپنی معلومات",
        visualTone: "saffron",
        preview: "Goedemiddag. Mijn naam is {{name}}. Dat is: {{spelled:name}}. Ik kom uit {{country}}. Ik woon in {{place}}. En u?",
        instruction: "اپنا نام، اصل جگہ، اور موجودہ شہر لکھیں۔ پھر پورا تعارف سنیں اور اپنی رفتار میں کہیں۔",
        speechHint: "ہر معلومات کے بعد چھوٹا وقفہ رکھیں۔ آخر میں En u? سے دوسرے شخص کو شامل کریں۔",
        fields: [
          { key: "name", label: "نام", placeholder: "Yusuf", autocomplete: "name", maxLength: 32 },
          { key: "country", label: "اصل ملک یا جگہ", placeholder: "Pakistan", autocomplete: "country-name", maxLength: 40 },
          { key: "place", label: "موجودہ شہر", placeholder: "Rotterdam", autocomplete: "address-level2", maxLength: 40 }
        ]
      },
      check: {
        eyebrow: "نیا موقع، کم مدد",
        title: "بلدیہ کی خوش آمدید میز پر",
        sign: "Welkom in de gemeente",
        setting: "نامی بیج اور مختصر تعارف",
        speaker: "Medewerker",
        initial: "M",
        tone: "omar",
        promptDutch: "Goedemiddag. Hoe heet u en waar woont u?",
        promptUrdu: "دوپہر بخیر۔ آپ کا نام کیا ہے اور آپ کہاں رہتے ہیں؟",
        instruction: "کون سا جواب دونوں سوالوں کا جواب دیتا اور پہلی ملاقات کے مطابق ہے؟",
        options: ["Goedemiddag. Ik ben Yusuf. Ik woon in Rotterdam. Aangenaam.", "Ik kom in waar woont u naam.", "Tot ziens. De jas kost twintig euro."],
        correct: "Goedemiddag. Ik ben Yusuf. Ik woon in Rotterdam. Aangenaam.",
        correctFeedback: "سلام، نام، شہر، اور پہلی ملاقات کا جواب سب ایک واضح مختصر تعارف میں آئے۔",
        wrongFeedback: "سوال کے دو حصے دیکھیں: نام + رہنے کی جگہ۔ دونوں کو سیکھی ہوئی مکمل باتوں میں جواب دیں۔"
      },
      complete: {
        dutch: "U kunt kennismaken in het Nederlands.",
        urdu: "آپ ایک نئی بالغ ملاقات میں سلام، نام، ہجے، جگہ، اور مناسب سوال خود استعمال کر سکتے ہیں۔",
        proofs: [
          { icon: "wave", text: "موقع کے مطابق سلام" },
          { icon: "letters", text: "نام اور حروف واضح" },
          { icon: "pin", text: "اصل اور موجودہ جگہ" },
          { icon: "dialogue", text: "سوال کے ساتھ گفتگو" }
        ],
        nextId: null
      },
      reviewLinks: ["practice:meet-people:1d", "practice:meet-people:4d", "home:neighbour-introduction"]
    }
  ];

  window.NederUrduV2LessonCatalog = Object.freeze(lessons);
})();
