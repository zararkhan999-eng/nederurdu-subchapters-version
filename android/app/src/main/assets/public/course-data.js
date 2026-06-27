const q = (type, label, prompt, options, answer, explain, note = "") => ({
  type,
  label,
  prompt,
  options,
  answer,
  explain,
  note
});

const meaning = (prompt, options, answer, explain, note = "") =>
  q("meaning", "اس Nederlands لفظ یا جملے کا مطلب منتخب کریں", prompt, options, answer, explain, note);

const reverse = (prompt, options, answer, explain, note = "") =>
  q("reverse", "اردو معنی کے لیے صحیح Nederlands منتخب کریں", prompt, options, answer, explain, note);

const build = (prompt, tiles, answer, explain, hint = "Nederlands الفاظ کو صحیح ترتیب میں دبائیں۔ پہلے دیکھیں کام کون کر رہا ہے، پھر کام والا لفظ، پھر باقی جملہ رکھیں۔") => ({
  type: "build",
  label: "Nederlands جملہ صحیح ترتیب میں بنائیں",
  prompt,
  tiles,
  answer,
  explain,
  hint
});

const uitleg = (prompt, points, note = "") => ({
  type: "uitleg",
  label: "پہلے یہ بات سمجھیں",
  prompt,
  points,
  note,
  visual: "grammar",
  answer: "سمجھ گیا",
  explain: "اب اسی بات کی مشق کریں۔"
});

const a0Lessons = [
  {
    id: "a0-letters-1",
    unit: "A0: حروف 1",
    title: "A0 les 1: a, b, c, d, e, f, g",
    description: "اردو سے Nederlands حروف تک: پہلے چند حروف اور آسان مثال والے الفاظ۔",
    xp: 35,
    questions: [
      meaning("a", ["حرف a", "حرف b", "حرف d"], "حرف a", "یہ Nederlands حروف تہجی کا حرف a ہے۔"),
      meaning("b", ["حرف b", "حرف e", "حرف g"], "حرف b", "یہ Nederlands حروف تہجی کا حرف b ہے۔"),
      meaning("appel", ["سیب", "کتاب", "دروازہ"], "سیب", "appel = سیب۔"),
      meaning("boek", ["کتاب", "سیب", "گھر"], "کتاب", "boek = کتاب۔"),
      meaning("deur", ["دروازہ", "قلم", "پانی"], "دروازہ", "deur = دروازہ۔"),
      meaning("fiets", ["سائیکل", "کرسی", "میز"], "سائیکل", "fiets = سائیکل۔"),
      reverse("سیب", ["appel", "boek", "deur"], "appel", "سیب = appel۔"),
      reverse("کتاب", ["boek", "fiets", "goed"], "boek", "کتاب = boek۔")
    ]
  },
  {
    id: "a0-letters-2",
    unit: "A0: حروف 2",
    title: "A0 les 2: h, i, j, k, l, m, n",
    description: "مزید حروف، پھر بہت آسان Nederlands الفاظ۔",
    xp: 35,
    questions: [
      meaning("h", ["حرف h", "حرف k", "حرف n"], "حرف h", "h کو Nederlands میں الگ حرف کی طرح پہچانیں۔"),
      meaning("i", ["حرف i", "حرف j", "حرف m"], "حرف i", "i ایک چھوٹا مگر بہت عام حرف ہے۔"),
      meaning("huis", ["گھر", "آدمی", "نہیں"], "گھر", "huis = گھر۔"),
      meaning("ik", ["میں", "تم", "ہاں"], "میں", "ik = میں۔"),
      meaning("ja", ["ہاں", "نہیں", "گھر"], "ہاں", "ja = ہاں۔"),
      meaning("man", ["آدمی", "عورت", "بچہ"], "آدمی", "man = آدمی۔"),
      reverse("گھر", ["huis", "ja", "kat"], "huis", "گھر = huis۔"),
      reverse("نہیں", ["nee", "ja", "ik"], "nee", "نہیں = nee۔")
    ]
  },
  {
    id: "a0-letters-3",
    unit: "A0: حروف 3",
    title: "A0 les 3: o tot z",
    description: "باقی حروف اور روزمرہ کے بہت آسان الفاظ۔",
    xp: 35,
    questions: [
      meaning("oog", ["آنکھ", "قلم", "بہن"], "آنکھ", "oog = آنکھ۔"),
      meaning("pen", ["قلم", "پانی", "میز"], "قلم", "pen = قلم۔"),
      meaning("stoel", ["کرسی", "دروازہ", "گھر"], "کرسی", "stoel = کرسی۔"),
      meaning("tafel", ["میز", "کتاب", "آدمی"], "میز", "tafel = میز۔"),
      meaning("water", ["پانی", "عورت", "آنکھ"], "پانی", "water = پانی۔"),
      meaning("vrouw", ["عورت", "مرد", "بہن"], "عورت", "vrouw = عورت۔"),
      reverse("بہن", ["zus", "vrouw", "oog"], "zus", "بہن = zus۔"),
      reverse("پانی", ["water", "tafel", "pen"], "water", "پانی = water۔")
    ]
  },
  {
    id: "a0-ik-jij-u",
    unit: "A0: personen 1",
    title: "A0 les 4: ik, jij, u",
    description: "سب سے پہلے: میں، تم، آپ۔",
    xp: 40,
    questions: [
      uitleg("jij اور u کا فرق", [
        "jij کا مطلب تم ہے۔ اسے دوست، گھر والے، یا جان پہچان کے شخص سے کہتے ہیں۔",
        "u کا مطلب آپ ہے۔ اسے بڑے، اجنبی، ڈاکٹر، استاد، یا دفتر میں کہتے ہیں۔",
        "اگر سمجھ نہ آئے کہ کون سا لفظ کہنا ہے تو u کہنا زیادہ محفوظ ہے۔"
      ], "بس معنی یاد رکھیں: jij = تم، u = آپ۔"),
      meaning("ik", ["میں", "تم", "آپ"], "میں", "ik = میں۔"),
      meaning("jij", ["تم", "میں", "آپ"], "تم", "jij = تم۔"),
      meaning("u", ["آپ", "تم", "ہم"], "آپ", "u = آپ۔"),
      reverse("میں", ["ik", "jij", "u"], "ik", "میں = ik۔"),
      reverse("تم", ["jij", "u", "ik"], "jij", "تم = jij۔"),
      reverse("آپ", ["u", "jij", "ik"], "u", "آپ = u۔"),
      meaning("ik, jij, u", ["میں، تم، آپ", "ہاں، نہیں، اچھا", "مرد، عورت، بچہ"], "میں، تم، آپ", "یہ الفاظ بتاتے ہیں کہ بات کس کے بارے میں ہو رہی ہے۔"),
      q("situation", "حال کے لیے صحیح Nederlands لفظ منتخب کریں", "آپ ڈاکٹر سے بات کر رہے ہیں۔", ["u", "jij", "ik"], "u", "ڈاکٹر سے بات کرتے وقت u کہیں۔")
    ]
  },
  {
    id: "a0-ja-nee-goed-niet",
    unit: "A0: reacties",
    title: "A0 les 5: ja, nee, goed, niet",
    description: "ہاں، نہیں، اچھا، نہیں: سب سے چھوٹے جواب۔",
    xp: 40,
    questions: [
      uitleg("nee اور niet کا فرق", [
        "nee اکیلا جواب ہے: nee = نہیں۔",
        "niet جملے کے اندر آتا ہے: niet goed = اچھا نہیں۔",
        "دونوں کا اردو مطلب نہیں ہو سکتا ہے، مگر Nederlands میں ان کی جگہ الگ ہے۔"
      ], "اکیلا جواب ہو تو nee، جملے کے اندر ہو تو niet۔"),
      meaning("ja", ["ہاں", "نہیں", "اچھا"], "ہاں", "ja = ہاں۔"),
      meaning("nee", ["نہیں", "ہاں", "اچھا"], "نہیں", "nee = نہیں۔"),
      meaning("goed", ["اچھا", "نہیں", "میں"], "اچھا", "goed = اچھا۔"),
      meaning("niet", ["نہیں", "ہاں", "اچھا"], "نہیں", "niet جملے کے اندر نہیں کا مطلب دیتا ہے۔"),
      meaning("niet goed", ["اچھا نہیں", "بہت اچھا", "ہاں اچھا"], "اچھا نہیں", "niet + goed = اچھا نہیں۔"),
      reverse("ہاں", ["ja", "nee", "niet"], "ja", "ہاں = ja۔"),
      reverse("نہیں", ["nee", "ja", "goed"], "nee", "نہیں = nee۔"),
      reverse("اچھا نہیں", ["niet goed", "goed niet", "ja goed"], "niet goed", "Nederlands میں niet goed کہتے ہیں۔")
    ]
  },
  {
    id: "a0-people-nouns",
    unit: "A0: naamwoorden 1",
    title: "A0 les 6: man, vrouw, kind",
    description: "لوگوں کے نام: آدمی، عورت، بچہ، لڑکا، لڑکی۔",
    xp: 45,
    questions: [
      meaning("man", ["آدمی", "عورت", "بچہ"], "آدمی", "man = آدمی۔"),
      meaning("vrouw", ["عورت", "آدمی", "لڑکا"], "عورت", "vrouw = عورت۔"),
      meaning("kind", ["بچہ", "آدمی", "لڑکی"], "بچہ", "kind = بچہ۔"),
      meaning("jongen", ["لڑکا", "عورت", "بچہ"], "لڑکا", "jongen = لڑکا۔"),
      meaning("meisje", ["لڑکی", "لڑکا", "آدمی"], "لڑکی", "meisje = لڑکی۔"),
      uitleg("de اور het کیوں آتے ہیں؟", [
        "Nederlands میں اکثر کسی شخص، چیز، یا جگہ کے نام سے پہلے de یا het آتا ہے۔",
        "اردو میں اس کا الگ لفظ نہیں ہوتا، اس لیے معنی میں صرف اصل نام یاد کریں۔",
        "de man کا مطلب آدمی ہے۔ de کو ساتھ یاد رکھیں، مگر اردو جواب صرف آدمی ہوگا۔"
      ], "اب جب de man آئے تو جواب آدمی چنیں۔ de کو Nederlands لفظ کا حصہ سمجھ کر یاد کریں۔"),
      meaning("de man", ["آدمی", "عورت", "گھر"], "آدمی", "de man = آدمی۔ de کو لفظ کے ساتھ یاد رکھیں۔"),
      reverse("عورت", ["vrouw", "man", "kind"], "vrouw", "عورت = vrouw۔"),
      reverse("بچہ", ["kind", "jongen", "meisje"], "kind", "بچہ = kind۔")
    ]
  },
  {
    id: "a0-things-nouns",
    unit: "A0: naamwoorden 2",
    title: "A0 les 7: boek, pen, huis",
    description: "چیزیں: کتاب، قلم، دروازہ، میز، کرسی، گھر۔",
    xp: 45,
    questions: [
      meaning("boek", ["کتاب", "قلم", "گھر"], "کتاب", "boek = کتاب۔"),
      meaning("pen", ["قلم", "کتاب", "دروازہ"], "قلم", "pen = قلم۔"),
      meaning("deur", ["دروازہ", "کرسی", "گھر"], "دروازہ", "deur = دروازہ۔"),
      meaning("tafel", ["میز", "کرسی", "قلم"], "میز", "tafel = میز۔"),
      meaning("stoel", ["کرسی", "میز", "کتاب"], "کرسی", "stoel = کرسی۔"),
      meaning("huis", ["گھر", "دروازہ", "میز"], "گھر", "huis = گھر۔"),
      reverse("میز", ["tafel", "stoel", "deur"], "tafel", "میز = tafel۔"),
      reverse("کرسی", ["stoel", "tafel", "boek"], "stoel", "کرسی = stoel۔")
    ]
  },
  {
    id: "a0-een-de-het",
    unit: "A0: kleine woorden",
    title: "A0 les 8: een, de, het",
    description: "Nederlands میں شخص، چیز، یا جگہ کے نام سے پہلے een، de، یا het آ سکتا ہے۔",
    xp: 45,
    questions: [
      uitleg("een، de، het کا آسان اصول", [
        "een کا مطلب ایک ہوتا ہے: een man = ایک آدمی۔",
        "de اور het کسی شخص، چیز، یا جگہ کے نام کے ساتھ آتے ہیں، مگر اردو میں ان کا الگ ترجمہ نہیں ہوتا۔",
        "ہر لفظ کو de یا het کے ساتھ یاد کریں: de man، het huis، de deur۔",
        "اگر de man لکھا ہو تو اردو جواب صرف آدمی ہوگا۔ اگر het huis لکھا ہو تو جواب گھر ہوگا۔"
      ], "de اور het کا الگ اردو معنی نہ بنائیں؛ اصل چیز کا معنی چنیں۔"),
      meaning("een", ["ایک", "نہیں", "میں"], "ایک", "een = ایک۔"),
      meaning("de man", ["آدمی", "عورت", "گھر"], "آدمی", "de man = آدمی۔"),
      meaning("het boek", ["کتاب", "قلم", "دروازہ"], "کتاب", "het boek = کتاب۔"),
      meaning("een man", ["ایک آدمی", "آدمی", "آدمی نہیں"], "ایک آدمی", "een کسی ایک شخص یا چیز کے لیے آتا ہے۔"),
      meaning("een boek", ["ایک کتاب", "کتاب", "کتاب نہیں"], "ایک کتاب", "een boek = ایک کتاب۔"),
      meaning("het huis", ["گھر", "ایک گھر", "گھر نہیں"], "گھر", "het huis = گھر۔ het کو huis کے ساتھ یاد رکھیں۔"),
      reverse("ایک عورت", ["een vrouw", "de vrouw", "het vrouw"], "een vrouw", "ایک = een۔"),
      reverse("دروازہ", ["de deur", "een deur", "het pen"], "de deur", "deur کے ساتھ de آتا ہے۔")
    ]
  },
  {
    id: "a0-ben-bent-is",
    unit: "A0: werkwoord 1",
    title: "A0 les 9: ben, bent, is",
    description: "پہلا فعل: ہونا۔ ik ben, jij bent, hij is۔",
    xp: 50,
    questions: [
      uitleg("ben، bent، is کا پہلا اصول", [
        "Nederlands میں شخص بدلنے سے فعل بھی بدل سکتا ہے۔",
        "ik کے ساتھ ben آتا ہے: ik ben = میں ہوں۔",
        "jij/u کے ساتھ bent، اور hij/zij کے ساتھ is آتا ہے۔"
      ], "اب ہر جملے میں پہلے شخص دیکھیں، پھر فعل چنیں۔"),
      meaning("ben", ["ہوں", "ہو", "ہے"], "ہوں", "ik کے ساتھ ben آتا ہے۔"),
      meaning("bent", ["ہو / ہیں", "ہوں", "ہے"], "ہو / ہیں", "jij/u کے ساتھ bent آتا ہے۔"),
      meaning("is", ["ہے", "ہوں", "ہو"], "ہے", "hij/zij/het کے ساتھ is آتا ہے۔"),
      meaning("ik ben", ["میں ہوں", "تم ہو", "وہ ہے"], "میں ہوں", "ik + ben۔"),
      meaning("jij bent", ["تم ہو", "میں ہوں", "وہ ہے"], "تم ہو", "jij + bent۔"),
      meaning("u bent", ["آپ ہیں", "تم ہو", "میں ہوں"], "آپ ہیں", "u + bent۔"),
      reverse("میں ہوں", ["ik ben", "jij bent", "hij is"], "ik ben", "میں ہوں = ik ben۔"),
      reverse("وہ ہے", ["hij is", "ik ben", "u bent"], "hij is", "hij is = وہ مرد ہے۔")
    ]
  },
  {
    id: "a0-first-sentences",
    unit: "A0: zin 1",
    title: "A0 les 10: eerste zinnen",
    description: "اب چھوٹے حصے کو ایک جملے میں جوڑتے ہیں۔",
    xp: 55,
    questions: [
      meaning("ik ben een man", ["میں ایک آدمی ہوں", "میں ایک عورت ہوں", "تم ایک آدمی ہو"], "میں ایک آدمی ہوں", "پہلے ik، پھر ben، پھر باقی بات آتی ہے۔"),
      meaning("ik ben een vrouw", ["میں ایک عورت ہوں", "میں ایک آدمی ہوں", "وہ عورت ہے"], "میں ایک عورت ہوں", "ik ben = میں ہوں۔"),
      meaning("jij bent goed", ["تم اچھے ہو", "میں اچھا ہوں", "وہ اچھا ہے"], "تم اچھے ہو", "jij bent = تم ہو۔"),
      meaning("u bent goed", ["آپ اچھے ہیں", "تم اچھے ہو", "میں اچھا ہوں"], "آپ اچھے ہیں", "u کے ساتھ bent آتا ہے۔"),
      meaning("hij is een kind", ["وہ ایک بچہ ہے", "میں بچہ ہوں", "وہ عورت ہے"], "وہ ایک بچہ ہے", "hij is = وہ مرد/لڑکا ہے۔"),
      reverse("میں ایک آدمی ہوں", ["ik ben een man", "jij bent een man", "hij is een man"], "ik ben een man", "میں = ik۔"),
      reverse("آپ اچھے ہیں", ["u bent goed", "jij bent goed", "ik ben goed"], "u bent goed", "آپ = u۔"),
      reverse("وہ ایک بچہ ہے", ["hij is een kind", "ik ben een kind", "jij bent een kind"], "hij is een kind", "وہ مرد/لڑکا = hij۔")
    ]
  },
  {
    id: "a0-hij-zij-wij",
    unit: "A0: personen 2",
    title: "A0 les 11: hij, zij, wij",
    description: "وہ مرد، وہ عورت، ہم۔",
    xp: 45,
    questions: [
      meaning("hij", ["وہ مرد", "وہ عورت", "ہم"], "وہ مرد", "hij = وہ مرد۔"),
      meaning("zij", ["وہ عورت / وہ لوگ", "وہ مرد", "میں"], "وہ عورت / وہ لوگ", "zij = وہ عورت یا وہ لوگ، بات کے حساب سے پتہ چلتا ہے۔"),
      meaning("wij", ["ہم", "تم", "آپ"], "ہم", "wij = ہم۔"),
      meaning("hij is", ["وہ مرد ہے", "میں ہوں", "ہم ہیں"], "وہ مرد ہے", "hij + is۔"),
      meaning("zij is", ["وہ عورت ہے", "وہ مرد ہے", "ہم ہیں"], "وہ عورت ہے", "zij + is۔"),
      meaning("wij zijn", ["ہم ہیں", "تم ہو", "وہ ہے"], "ہم ہیں", "wij کے ساتھ zijn آتا ہے۔"),
      reverse("ہم", ["wij", "zij", "hij"], "wij", "ہم = wij۔"),
      reverse("وہ عورت ہے", ["zij is", "hij is", "wij zijn"], "zij is", "zij is = وہ عورت ہے۔")
    ]
  },
  {
    id: "a0-hebben-1",
    unit: "A0: werkwoord 2",
    title: "A0 les 12: ik heb",
    description: "کسی چیز کے پاس ہونے کی پہلی Nederlands شکل۔",
    xp: 50,
    questions: [
      meaning("heb", ["میرے پاس ہے / پاس ہونا", "ہوں", "جاتا ہوں"], "میرے پاس ہے / پاس ہونا", "ik کے ساتھ heb آتا ہے۔"),
      meaning("hebt", ["تمہارے پاس ہے", "میرے پاس ہے", "اس کے پاس ہے"], "تمہارے پاس ہے", "jij/u کے ساتھ hebt آتا ہے۔"),
      meaning("heeft", ["اس کے پاس ہے", "میرے پاس ہے", "تمہارے پاس ہے"], "اس کے پاس ہے", "hij/zij کے ساتھ heeft۔"),
      meaning("ik heb een boek", ["میرے پاس ایک کتاب ہے", "میں کتاب ہوں", "تمہارے پاس کتاب ہے"], "میرے پاس ایک کتاب ہے", "ik heb = میرے پاس ہے۔"),
      meaning("jij hebt een pen", ["تمہارے پاس ایک قلم ہے", "میرے پاس قلم ہے", "وہ قلم ہے"], "تمہارے پاس ایک قلم ہے", "jij hebt = تمہارے پاس ہے۔"),
      meaning("hij heeft een huis", ["اس کے پاس ایک گھر ہے", "میں گھر ہوں", "تم گھر جاتے ہو"], "اس کے پاس ایک گھر ہے", "hij heeft = اس کے پاس ہے۔"),
      reverse("میرے پاس ایک کتاب ہے", ["ik heb een boek", "jij hebt een boek", "hij heeft een boek"], "ik heb een boek", "میرے پاس = ik heb۔"),
      reverse("اس کے پاس ایک گھر ہے", ["hij heeft een huis", "ik heb een huis", "jij hebt een huis"], "hij heeft een huis", "اس کے پاس = hij heeft۔")
    ]
  },
  {
    id: "a0-geen",
    unit: "A0: geen 1",
    title: "A0 les 13: geen",
    description: "جب چیز نہیں ہے: geen boek, geen pen۔",
    xp: 50,
    questions: [
      uitleg("niet اور geen کا فرق", [
        "niet کسی بات کو نہیں بناتا ہے: niet goed = اچھا نہیں۔",
        "geen کسی شخص یا چیز کے نام سے پہلے آتا ہے: geen boek = کوئی کتاب نہیں۔",
        "اگر کہنا ہو کہ کوئی چیز موجود نہیں تو اکثر geen استعمال ہوگا۔"
      ], "اچھا نہیں کے لیے niet، اور کوئی کتاب نہیں کے لیے geen یاد رکھیں۔"),
      meaning("geen boek", ["کوئی کتاب نہیں", "ایک کتاب", "اچھی کتاب"], "کوئی کتاب نہیں", "geen boek = کوئی کتاب نہیں۔"),
      meaning("ik heb geen boek", ["میرے پاس کتاب نہیں ہے", "میرے پاس کتاب ہے", "میں کتاب نہیں ہوں"], "میرے پاس کتاب نہیں ہے", "کتاب موجود نہ ہو تو geen boek کہتے ہیں۔"),
      meaning("zij heeft geen pen", ["اس کے پاس قلم نہیں ہے", "اس کے پاس قلم ہے", "وہ قلم ہے"], "اس کے پاس قلم نہیں ہے", "zij heeft geen pen۔"),
      meaning("wij hebben geen huis", ["ہمارے پاس گھر نہیں ہے", "ہمارا گھر اچھا ہے", "ہم گھر میں ہیں"], "ہمارے پاس گھر نہیں ہے", "wij hebben = ہمارے پاس ہے۔"),
      meaning("niet goed", ["اچھا نہیں", "کوئی کتاب نہیں", "ایک گھر"], "اچھا نہیں", "niet goed = اچھا نہیں۔"),
      meaning("geen pen", ["کوئی قلم نہیں", "ایک قلم", "اچھا قلم"], "کوئی قلم نہیں", "geen pen = کوئی قلم نہیں۔"),
      reverse("میرے پاس کتاب نہیں ہے", ["ik heb geen boek", "ik ben niet boek", "ik heb niet goed"], "ik heb geen boek", "چیز نہ ہو تو geen۔"),
      reverse("اچھا نہیں", ["niet goed", "geen goed", "nee goed"], "niet goed", "خاصیت کے لیے niet۔")
    ]
  },
  {
    id: "a0-place-1",
    unit: "A0: plaats 1",
    title: "A0 les 14: in, op, onder",
    description: "جگہ والے الفاظ: میں، اوپر، نیچے۔",
    xp: 50,
    questions: [
      meaning("in", ["میں / اندر", "اوپر", "نیچے"], "میں / اندر", "in = اندر/میں۔"),
      meaning("op", ["اوپر", "میں", "نیچے"], "اوپر", "op = اوپر۔"),
      meaning("onder", ["نیچے", "اوپر", "ساتھ"], "نیچے", "onder = نیچے۔"),
      meaning("in huis", ["گھر میں", "گھر کے اوپر", "گھر کے نیچے"], "گھر میں", "in + huis۔"),
      meaning("op tafel", ["میز پر", "میز کے اندر", "میز کے نیچے"], "میز پر", "op + tafel۔"),
      meaning("onder tafel", ["میز کے نیچے", "میز پر", "میز کے پاس"], "میز کے نیچے", "onder + tafel۔"),
      reverse("گھر میں", ["in huis", "op huis", "onder huis"], "in huis", "میں = in۔"),
      reverse("میز پر", ["op tafel", "in tafel", "onder tafel"], "op tafel", "پر = op۔")
    ]
  },
  {
    id: "a0-place-2",
    unit: "A0: plaats 2",
    title: "A0 les 15: naast, voor, achter",
    description: "مزید جگہ والے الفاظ: ساتھ، سامنے، پیچھے۔",
    xp: 50,
    questions: [
      meaning("naast", ["ساتھ / پاس", "سامنے", "پیچھے"], "ساتھ / پاس", "naast = پاس/ساتھ۔"),
      meaning("voor", ["سامنے", "پیچھے", "اندر"], "سامنے", "voor = سامنے۔"),
      meaning("achter", ["پیچھے", "سامنے", "اوپر"], "پیچھے", "achter = پیچھے۔"),
      meaning("bij", ["کے پاس", "نیچے", "ایک"], "کے پاس", "bij = پاس/قریب۔"),
      meaning("naast de tafel", ["میز کے ساتھ", "میز کے نیچے", "میز کے اندر"], "میز کے ساتھ", "naast de tafel۔"),
      meaning("achter het huis", ["گھر کے پیچھے", "گھر کے سامنے", "گھر کے اندر"], "گھر کے پیچھے", "achter het huis۔"),
      reverse("گھر کے سامنے", ["voor het huis", "achter het huis", "in het huis"], "voor het huis", "سامنے = voor۔"),
      reverse("میز کے ساتھ", ["naast de tafel", "onder de tafel", "op de tafel"], "naast de tafel", "ساتھ / پاس = naast۔")
    ]
  },
  {
    id: "a0-gaan-komen",
    unit: "A0: actie 1",
    title: "A0 les 16: gaan en komen",
    description: "حرکت والے فعل: جانا اور آنا۔",
    xp: 50,
    questions: [
      meaning("ga", ["جاتا/جاتی ہوں", "آتا/آتی ہوں", "ہوں"], "جاتا/جاتی ہوں", "ik ga = میں جاتا/جاتی ہوں۔"),
      meaning("gaat", ["جاتا/جاتی ہے", "آتا/آتی ہے", "ہے"], "جاتا/جاتی ہے", "hij/zij gaat۔"),
      meaning("kom", ["آتا/آتی ہوں", "جاتا/جاتی ہوں", "ہوں"], "آتا/آتی ہوں", "ik kom = میں آتا/آتی ہوں۔"),
      meaning("komt", ["آتا/آتی ہے", "جاتا/جاتی ہے", "ہے"], "آتا/آتی ہے", "hij komt = وہ آتا ہے۔"),
      meaning("ik ga", ["میں جاتا/جاتی ہوں", "میں آتا/آتی ہوں", "میں ہوں"], "میں جاتا/جاتی ہوں", "ik + ga۔"),
      meaning("hij komt", ["وہ آتا ہے", "وہ جاتا ہے", "وہ ہے"], "وہ آتا ہے", "hij + komt۔"),
      reverse("میں آتا/آتی ہوں", ["ik kom", "ik ga", "ik ben"], "ik kom", "آنا = komen۔"),
      reverse("وہ جاتا ہے", ["hij gaat", "hij komt", "hij is"], "hij gaat", "جانا = gaan۔")
    ]
  },
  {
    id: "a0-naar-met",
    unit: "A0: kleine woorden 2",
    title: "A0 les 17: naar en met",
    description: "سمت اور ساتھ ہونا: naar, met۔",
    xp: 50,
    questions: [
      meaning("naar", ["کی طرف / کو", "ساتھ", "میں"], "کی طرف / کو", "naar سمت بتاتا ہے۔"),
      meaning("met", ["ساتھ", "کی طرف", "نیچے"], "ساتھ", "met = ساتھ۔"),
      meaning("ik ga naar huis", ["میں گھر جا رہا/رہی ہوں", "میں گھر میں ہوں", "میرے پاس گھر ہے"], "میں گھر جا رہا/رہی ہوں", "naar huis = گھر کی طرف۔"),
      meaning("zij gaat naar school", ["وہ اسکول جا رہی ہے", "وہ اسکول میں ہے", "اس کے پاس اسکول ہے"], "وہ اسکول جا رہی ہے", "gaat naar = جا رہی ہے۔"),
      meaning("ik ben met mijn kind", ["میں اپنے بچے کے ساتھ ہوں", "میں بچہ ہوں", "میرے پاس بچہ نہیں"], "میں اپنے بچے کے ساتھ ہوں", "met = ساتھ۔"),
      meaning("met mijn kind", ["میرے بچے کے ساتھ", "میرے بچے کی طرف", "میرے بچے کے نیچے"], "میرے بچے کے ساتھ", "met = ساتھ۔"),
      reverse("گھر کی طرف", ["naar huis", "met huis", "in huis"], "naar huis", "سمت = naar۔"),
      reverse("ساتھ", ["met", "naar", "onder"], "met", "ساتھ = met۔")
    ]
  },
  {
    id: "a0-possessive",
    unit: "A0: bezit 2",
    title: "A0 les 18: mijn, jouw, zijn, haar",
    description: "میرا، تمہارا، اس کا: ملکیت والے الفاظ۔",
    xp: 50,
    questions: [
      uitleg("mijn، jouw، zijn، haar", [
        "یہ ملکیت والے الفاظ ہیں۔ ان سے بتایا جاتا ہے کہ چیز کس کی ہے۔",
        "mijn = میرا، jouw = تمہارا۔",
        "zijn عام طور پر مرد کے لیے اس کا، haar عورت کے لیے اس کا۔"
      ], "پہلے معنی صاف رکھیں، پھر لفظ کو جملے میں دیکھیں۔"),
      meaning("mijn", ["میرا", "تمہارا", "اس کا"], "میرا", "mijn = میرا۔"),
      meaning("jouw", ["تمہارا", "میرا", "اس کا"], "تمہارا", "jouw = تمہارا۔"),
      meaning("zijn", ["اس مرد کا / اس کا", "میرا", "تمہارا"], "اس مرد کا / اس کا", "zijn = اس مرد کا یا اس کا۔"),
      meaning("haar", ["اس عورت کا / اس کا", "میرا", "ہماری"], "اس عورت کا / اس کا", "haar = اس عورت کا یا اس کا۔"),
      meaning("mijn naam", ["میرا نام", "تمہارا نام", "اس کا نام"], "میرا نام", "mijn naam = میرا نام۔"),
      meaning("zijn boek", ["اس کی کتاب", "میری کتاب", "تمہاری کتاب"], "اس کی کتاب", "zijn boek = اس کی کتاب۔"),
      reverse("میرا گھر", ["mijn huis", "jouw huis", "zijn huis"], "mijn huis", "میرا = mijn۔"),
      reverse("اس کا قلم", ["haar pen", "mijn pen", "jouw pen"], "haar pen", "یہاں haar pen = اس عورت کا قلم۔۔")
    ]
  },
  {
    id: "a0-name-land-city",
    unit: "A0: mezelf",
    title: "A0 les 19: naam, land, woonplaats",
    description: "خود کو بہت آسان Nederlands میں اپنا تعارف کروانا۔",
    xp: 55,
    questions: [
      meaning("naam", ["نام", "ملک", "شہر"], "نام", "naam = نام۔"),
      meaning("land", ["ملک", "نام", "گھر"], "ملک", "land = ملک۔"),
      meaning("stad", ["شہر", "ملک", "فون"], "شہر", "stad = شہر۔"),
      meaning("woon", ["رہتا/رہتی ہوں", "جاتا ہوں", "میرے پاس ہے"], "رہتا/رہتی ہوں", "ik woon = میں رہتا/رہتی ہوں۔"),
      meaning("mijn naam is Ali", ["میرا نام Ali ہے", "میں Ali کے پاس ہوں", "میرا گھر Ali ہے"], "میرا نام Ali ہے", "تعارف جملہ۔"),
      meaning("ik woon in Nederland", ["میں Nederland میں رہتا/رہتی ہوں", "میں Nederland جاتا ہوں", "میرے پاس Nederland ہے"], "میں Nederland میں رہتا/رہتی ہوں", "ik woon in = میں رہتا ہوں۔"),
      meaning("ik kom uit Pakistan", ["میں Pakistan سے آتا/آتی ہوں", "میں Pakistan میں رہتا ہوں", "میرے پاس Pakistan ہے"], "میں Pakistan سے آتا/آتی ہوں", "uit = سے۔"),
      reverse("میرا نام Ali ہے", ["mijn naam is Ali", "ik woon Ali", "ik heb Ali"], "mijn naam is Ali", "نام بتانے کا نمونہ۔")
    ]
  },
  {
    id: "a0-checkpoint",
    unit: "A0: دہرائی",
    title: "A0 les 20: klaar voor A1",
    description: "A0 کی مشق: کیا طالب علم چھوٹے الفاظ اور جملے سمجھتا ہے؟",
    xp: 70,
    questions: [
      meaning("ik ben Ali", ["میں Ali ہوں", "میرے پاس Ali ہے", "میں Ali جاتا ہوں"], "میں Ali ہوں", "ik ben = میں ہوں۔"),
      meaning("ik heb een telefoon", ["میرے پاس ایک فون ہے", "میں فون ہوں", "میں فون جاتا ہوں"], "میرے پاس ایک فون ہے", "ik heb = میرے پاس ہے۔"),
      meaning("ik woon in Nederland", ["میں Nederland میں رہتا/رہتی ہوں", "میں Nederland سے ہوں", "میرے پاس Nederland ہے"], "میں Nederland میں رہتا/رہتی ہوں", "woon in = رہنا۔"),
      meaning("ik ga naar huis", ["میں گھر جا رہا/رہی ہوں", "میں گھر میں ہوں", "میرے پاس گھر ہے"], "میں گھر جا رہا/رہی ہوں", "naar huis = گھر کی طرف۔"),
      meaning("ik begrijp het niet", ["مجھے سمجھ نہیں آیا", "میں اچھا ہوں", "میرے پاس کتاب نہیں"], "مجھے سمجھ نہیں آیا", "یہ بہت ضروری مدد والا جملہ ہے۔"),
      meaning("langzaam alstublieft", ["آہستہ برائے مہربانی", "شکریہ", "میرا نام"], "آہستہ برائے مہربانی", "جب کوئی تیز بولے تو یہ کہیں۔"),
      meaning("kunt u herhalen?", ["کیا آپ دہرا سکتے ہیں؟", "کیا آپ جا سکتے ہیں؟", "کیا آپ کے پاس کتاب ہے؟"], "کیا آپ دہرا سکتے ہیں؟", "herhalen = دہرانا۔"),
      reverse("مجھے سمجھ نہیں آیا", ["ik begrijp het niet", "ik ben goed", "ik heb geen boek"], "ik begrijp het niet", "A0 طالب علم کو یہ جملہ ضرور چاہیے۔")
    ]
  }
];

const a1Lessons = [
  {
    id: "a1-zero-tiny-words",
    unit: "A1 شروع: بالکل بنیاد",
    title: "سبق 1: Ik, jij, ja, nee",
    description: "بالکل شروع سے: میں، تم، ہاں، نہیں، اچھا، نہیں۔",
    xp: 45,
    questions: [
      meaning("ik", ["میں", "تم", "ہاں"], "میں", "ik کا مطلب میں ہے۔"),
      meaning("jij", ["تم", "میں", "آپ"], "تم", "jij = تم۔"),
      meaning("u", ["آپ", "ہم", "وہ"], "آپ", "u = آپ۔"),
      meaning("ja", ["ہاں", "نہیں", "اچھا"], "ہاں", "ja = ہاں۔"),
      meaning("nee", ["نہیں", "ہاں", "میں"], "نہیں", "nee = نہیں۔"),
      meaning("goed", ["اچھا", "نہیں", "تم"], "اچھا", "goed = اچھا۔"),
      meaning("niet", ["نہیں", "ہاں", "اچھا"], "نہیں", "niet جملے کے اندر نہیں کا مطلب دیتا ہے۔"),
      meaning("niet goed", ["اچھا نہیں", "بہت اچھا", "میں اچھا ہوں"], "اچھا نہیں", "niet + goed = اچھا نہیں۔"),
      reverse("میں", ["ik", "jij", "ja"], "ik", "میں = ik۔"),
      reverse("تم", ["jij", "u", "ik"], "jij", "تم = jij۔"),
      reverse("آپ", ["u", "jij", "wij"], "u", "آپ = u۔"),
      reverse("ہاں", ["ja", "nee", "goed"], "ja", "ہاں = ja۔"),
      reverse("نہیں", ["nee", "ja", "niet"], "nee", "نہیں = nee۔"),
      reverse("اچھا نہیں", ["niet goed", "ja goed", "nee goed"], "niet goed", "اچھا نہیں = niet goed۔")
    ]
  },
  {
    id: "a1-zijn-first-sentences",
    unit: "A1: zijn",
    title: "سبق 2: Ik ben, jij bent",
    description: "پہلے چھوٹے جملے: میں ہوں، تم ہو، وہ ہے۔",
    xp: 55,
    questions: [
      meaning("ben", ["ہوں", "ہو", "ہے"], "ہوں", "ik کے ساتھ ben آتا ہے۔"),
      meaning("bent", ["ہو / ہیں", "ہوں", "ہے"], "ہو / ہیں", "jij/u کے ساتھ bent آتا ہے۔"),
      meaning("is", ["ہے", "ہوں", "ہو"], "ہے", "hij/zij/het کے ساتھ is آتا ہے۔"),
      meaning("ik ben", ["میں ہوں", "تم ہو", "وہ ہے"], "میں ہوں", "ik ben = میں ہوں۔"),
      meaning("jij bent", ["تم ہو", "میں ہوں", "وہ ہے"], "تم ہو", "jij bent = تم ہو۔"),
      meaning("u bent", ["آپ ہیں", "تم ہو", "میں ہوں"], "آپ ہیں", "u bent = آپ ہیں۔"),
      meaning("hij is", ["وہ مرد ہے", "وہ عورت ہے", "ہم ہیں"], "وہ مرد ہے", "hij is = وہ ہے۔"),
      meaning("zij is", ["وہ عورت ہے", "وہ مرد ہے", "ہم ہیں"], "وہ عورت ہے", "zij is = وہ عورت ہے۔"),
      meaning("ik ben goed", ["میں اچھا ہوں", "تم اچھے ہو", "وہ اچھا ہے"], "میں اچھا ہوں", "A1 ترتیب: شخص + فعل + باقی حصہ۔"),
      meaning("ik ben niet goed", ["میں اچھا نہیں ہوں", "میں اچھا ہوں", "تم اچھے نہیں ہو"], "میں اچھا نہیں ہوں", "صحیح ترتیب niet goed ہے۔"),
      reverse("میں ہوں", ["ik ben", "jij bent", "hij is"], "ik ben", "میں ہوں = ik ben۔"),
      reverse("آپ ہیں", ["u bent", "jij bent", "ik ben"], "u bent", "آپ ہیں = u bent۔"),
      reverse("وہ عورت ہے", ["zij is", "hij is", "ik ben"], "zij is", "zij is = وہ عورت ہے۔"),
      reverse("میں اچھا نہیں ہوں", ["ik ben niet goed", "ik ben goed", "jij bent niet goed"], "ik ben niet goed", "نفی جملہ ساتھ niet۔")
    ]
  },
  {
    id: "a1-greetings-personal-info",
    unit: "A1: سلام اور پہچان",
    title: "سبق 3: Hallo, mijn naam is...",
    description: "اب سلام، نام، ملک، فون نمبر اور چھوٹا تعارف۔",
    xp: 60,
    questions: [
      meaning("hallo", ["سلام", "شکریہ", "خدا حافظ"], "سلام", "hallo سب سے عام سلام ہے۔"),
      meaning("goedemorgen", ["صبح بخیر", "شام بخیر", "خدا حافظ"], "صبح بخیر", "goedemorgen صبح میں بولا جاتا ہے۔"),
      meaning("tot ziens", ["خدا حافظ", "صبح بخیر", "شکریہ"], "خدا حافظ", "tot ziens = خدا حافظ۔"),
      meaning("dank u wel", ["بہت شکریہ", "براہ کرم", "معاف کیجیے"], "بہت شکریہ", "ادب والا شکریہ = dank u wel۔"),
      meaning("naam", ["نام", "پتہ", "ملک"], "نام", "فارم میں naam بہت ضروری ہے۔"),
      meaning("mijn", ["میرا", "آپ کا", "اس کا"], "میرا", "mijn = میرا۔"),
      meaning("mijn naam", ["میرا نام", "آپ کا نام", "میرا پتہ"], "میرا نام", "mijn + naam = میرا نام۔"),
      meaning("mijn naam is Zarar", ["میرا نام ضرار ہے", "میں ضرار ہوں", "میرا پتہ ضرار ہے"], "میرا نام ضرار ہے", "mijn naam is = میرا نام ہے۔"),
      meaning("adres", ["پتہ", "فون نمبر", "قومیت"], "پتہ", "adres = پتہ۔"),
      meaning("telefoonnummer", ["فون نمبر", "تاریخ پیدائش", "ملک"], "فون نمبر", "telefoonnummer = فون نمبر۔"),
      meaning("land", ["ملک", "نام", "خاندان"], "ملک", "land = ملک۔"),
      reverse("میرا نام علی ہے", ["mijn naam is Ali", "ik woon Ali", "ik heb Ali"], "mijn naam is Ali", "تعارف نمونہ۔"),
      reverse("پتہ", ["adres", "naam", "land"], "adres", "adres = پتہ۔"),
      reverse("فون نمبر", ["telefoonnummer", "adres", "nationaliteit"], "telefoonnummer", "فون نمبر = telefoonnummer۔")
    ]
  },
  {
    id: "a1-people-family-articles",
    unit: "A1: لوگ، خاندان، een",
    title: "سبق 4: Man, vrouw, familie",
    description: "آدمی، عورت، بچہ، خاندان اور een/de/het کی پہلی پہچان۔",
    xp: 65,
    questions: [
      meaning("man", ["آدمی", "عورت", "بچہ"], "آدمی", "man = آدمی۔"),
      meaning("vrouw", ["عورت", "آدمی", "والد"], "عورت", "vrouw = عورت۔"),
      meaning("kind", ["بچہ", "بھائی", "والد"], "بچہ", "kind = بچہ۔"),
      meaning("familie", ["خاندان", "ملک", "پتہ"], "خاندان", "familie = خاندان۔"),
      meaning("vader", ["والد", "والدہ", "بیٹا"], "والد", "vader = والد۔"),
      meaning("moeder", ["والدہ", "والد", "بیٹی"], "والدہ", "moeder = والدہ۔"),
      meaning("broer", ["بھائی", "بہن", "والد"], "بھائی", "broer = بھائی۔"),
      meaning("zus", ["بہن", "بھائی", "والدہ"], "بہن", "zus = بہن۔"),
      uitleg("de/het کو لفظ کے ساتھ یاد کریں", [
        "Nederlands میں آدمی، عورت، بچہ جیسے الفاظ اکیلے کم آتے ہیں۔ اکثر ان کے ساتھ de یا het آتا ہے۔",
        "اردو میں جواب دیتے وقت de/het کا الگ عجیب ترجمہ نہ بنائیں۔ de man = آدمی، de vrouw = عورت، het kind = بچہ۔",
        "واپس Nederlands بناتے وقت صحیح چھوٹا لفظ ساتھ لگائیں: de man، de vrouw، het kind۔"
      ], "یہ اصول صرف پہچان کے لیے ہے۔ معنی ہمیشہ صاف اردو میں رکھیں۔"),
      meaning("een", ["ایک", "ہے", "نہیں"], "ایک", "een Nederlands میں بہت عام چھوٹا لفظ ہے۔"),
      meaning("ik ben een man", ["میں ایک آدمی ہوں", "میں ایک عورت ہوں", "وہ ایک آدمی ہے"], "میں ایک آدمی ہوں", "ik ben + een man۔"),
      meaning("zij is een vrouw", ["وہ ایک عورت ہے", "وہ ایک آدمی ہے", "میں عورت ہوں"], "وہ ایک عورت ہے", "zij is + een vrouw۔"),
      meaning("de man", ["آدمی", "گھر", "بچہ"], "آدمی", "de/het چھوٹے الفاظ کو آہستہ آہستہ پہچانیں۔"),
      meaning("het kind", ["بچہ", "آدمی", "عورت"], "بچہ", "het kind = بچہ۔"),
      reverse("میں ایک عورت ہوں", ["ik ben een vrouw", "zij is een vrouw", "ik heb een vrouw"], "ik ben een vrouw", "شخص + zijn + چھوٹا لفظ + اسم۔")
    ]
  },
  {
    id: "a1-hebben-family",
    unit: "A1: hebben",
    title: "سبق 5: Ik heb familie",
    description: "اب پاس ہونا/hebben: میرے پاس ہے، میرے بچے ہیں، میرے پاس نہیں ہے۔",
    xp: 65,
    questions: [
      meaning("hebben", ["ہونا / رکھنا", "جانا", "سیکھنا"], "ہونا / رکھنا", "hebben = پاس ہونا۔"),
      meaning("ik heb", ["میرے پاس ہے", "میں ہوں", "میں جاتا ہوں"], "میرے پاس ہے", "ik heb = میرے پاس ہے۔"),
      meaning("jij hebt", ["تمہارے پاس ہے", "تم ہو", "تم آتے ہو"], "تمہارے پاس ہے", "jij hebt = تمہارے پاس ہے۔"),
      meaning("hij heeft", ["اس کے پاس ہے", "وہ ہے", "وہ جاتا ہے"], "اس کے پاس ہے", "hij heeft = اس کے پاس ہے۔"),
      meaning("zoon", ["بیٹا", "بیٹی", "بھائی"], "بیٹا", "zoon = بیٹا۔"),
      meaning("dochter", ["بیٹی", "بیٹا", "بہن"], "بیٹی", "dochter = بیٹی۔"),
      meaning("ouders", ["والدین", "بچے", "دوست"], "والدین", "ouders = والدین۔"),
      meaning("kinderen", ["بچے", "والدین", "کتابیں"], "بچے", "kinderen = بچے۔"),
      meaning("ik heb kinderen", ["میرے بچے ہیں", "میں بچہ ہوں", "میرے والدین ہیں"], "میرے بچے ہیں", "ik heb + اسم۔"),
      meaning("ik heb geen kinderen", ["میرے بچے نہیں ہیں", "میرے بچے ہیں", "میں بچہ نہیں ہوں"], "میرے بچے نہیں ہیں", "geen اسم سے پہلے آتا ہے۔"),
      reverse("میرے پاس ایک بھائی ہے", ["ik heb een broer", "ik ben een broer", "hij heeft een broer"], "ik heb een broer", "ik heb = میرے پاس ہے۔"),
      reverse("اس کے بچے ہیں", ["hij heeft kinderen", "ik heb kinderen", "wij zijn kinderen"], "hij heeft kinderen", "hij heeft = اس کے پاس ہے۔"),
      meaning("geen", ["کوئی نہیں", "اچھا", "ابھی"], "کوئی نہیں", "geen اسم کے ساتھ نفی بناتا ہے۔"),
      reverse("میرے پاس کتاب نہیں ہے", ["ik heb geen boek", "ik kom niet boek", "dat is geen boek"], "ik heb geen boek", "geen + اسم۔")
    ]
  },
  {
    id: "a1-present-time",
    unit: "A1: حال کا زمانہ اور وقت",
    title: "سبق 6: Ik werk vandaag",
    description: "فاعل + فعل + باقی حصہ، حال کا زمانہ، آج/کل/ابھی۔",
    xp: 70,
    questions: [
      meaning("werk", ["کام کرتا/کرتی ہوں", "رہتا ہوں", "پیتا ہوں"], "کام کرتا/کرتی ہوں", "ik werk = میں کام کرتا/کرتی ہوں۔"),
      meaning("woon", ["رہتا/رہتی ہوں", "کام کرتا ہوں", "سیکھتا ہوں"], "رہتا/رہتی ہوں", "ik woon = میں رہتا/رہتی ہوں۔"),
      meaning("leer", ["سیکھتا/سیکھتی ہوں", "رہتا ہوں", "آتا ہوں"], "سیکھتا/سیکھتی ہوں", "ik leer = میں سیکھتا/سیکھتی ہوں۔"),
      meaning("drink", ["پیتا/پیتی ہوں", "کھاتا ہوں", "کام کرتا ہوں"], "پیتا/پیتی ہوں", "drink = پینا۔"),
      meaning("vandaag", ["آج", "آنے والا کل", "گزرا ہوا کل"], "آج", "vandaag = آج۔"),
      meaning("morgen", ["آنے والا کل", "آج", "ابھی"], "آنے والا کل", "morgen = آنے والا کل۔"),
      meaning("gisteren", ["گزرا ہوا کل", "آج", "تھوڑی دیر بعد"], "گزرا ہوا کل", "gisteren = گزرا ہوا کل۔"),
      meaning("nu", ["ابھی", "کل", "بعد میں"], "ابھی", "nu = ابھی۔"),
      meaning("ik werk vandaag", ["میں آج کام کرتا/کرتی ہوں", "میں آج رہتا ہوں", "میں آج نہیں آتا"], "میں آج کام کرتا/کرتی ہوں", "A1 ترتیب: فاعل + فعل + باقی حصہ۔"),
      meaning("ik woon in Nederland", ["میں نیدرلینڈ میں رہتا/رہتی ہوں", "میں نیدرلینڈ سیکھتا ہوں", "میں نیدرلینڈ سے آیا ہوں"], "میں نیدرلینڈ میں رہتا/رہتی ہوں", "woon = رہنا۔"),
      meaning("wij leren Nederlands", ["ہم Nederlands سیکھتے ہیں", "ہم Nederlands ہیں", "ہم Nederlands پیتے ہیں"], "ہم Nederlands سیکھتے ہیں", "wij leren Nederlands۔"),
      meaning("ik drink koffie", ["میں کافی پیتا/پیتی ہوں", "مجھے کافی چاہیے", "یہ کافی ہے"], "میں کافی پیتا/پیتی ہوں", "drink + koffie۔"),
      reverse("میں آج کام کرتا/کرتی ہوں", ["ik werk vandaag", "ik woon vandaag", "ik heb vandaag"], "ik werk vandaag", "vandaag آخر میں بھی آ سکتا ہے۔"),
      reverse("ہم Nederlands سیکھتے ہیں", ["wij leren Nederlands", "wij zijn Nederlands", "wij drinken Nederlands"], "wij leren Nederlands", "leren = سیکھنا۔")
    ]
  },
  {
    id: "a1-questions",
    unit: "A1: سوالات",
    title: "سبق 7: Wie, wat, waar?",
    description: "سوال الفاظ اور ہاں/نہیں سوالات، آہستہ آہستہ۔",
    xp: 70,
    questions: [
      uitleg("Nederlands سوال کیسے بنتا ہے؟", [
        "سوال والے لفظ پہلے آتے ہیں: wie، wat، waar۔",
        "پھر فعل آتا ہے: waar woon je؟",
        "ہاں/نہیں سوال میں بھی فعل پہلے آ سکتا ہے: heb je kinderen؟"
      ], "سوال میں لفظوں کی جگہ اردو جیسی نہیں ہوتی، اس لیے ترتیب کو الگ یاد کریں۔"),
      meaning("wie", ["کون", "کیا", "کہاں"], "کون", "wie = کون۔"),
      meaning("wat", ["کیا", "کب", "کیوں"], "کیا", "wat = کیا۔"),
      meaning("waar", ["کہاں", "کون", "کتنا"], "کہاں", "waar = کہاں۔"),
      meaning("wanneer", ["کب", "کیسے", "کہاں"], "کب", "wanneer = کب۔"),
      meaning("hoe", ["کیسے", "کیوں", "کون"], "کیسے", "hoe = کیسے۔"),
      meaning("hoeveel", ["کتنا", "کب", "کون"], "کتنا", "hoeveel = کتنا / کتنے۔"),
      meaning("waarom", ["کیوں", "کہاں", "کیا"], "کیوں", "waarom = کیوں۔"),
      meaning("wie ben jij?", ["تم کون ہو؟", "تم کہاں رہتے ہو؟", "تم کیا چاہتے ہو؟"], "تم کون ہو؟", "wie + ben + jij۔"),
      meaning("waar woon je?", ["تم کہاں رہتے ہو؟", "تم کیا کام کرتے ہو؟", "تم کب آتے ہو؟"], "تم کہاں رہتے ہو؟", "waar woon je A1 بولنے والا سوال ہے۔"),
      meaning("heb je kinderen?", ["کیا تمہارے بچے ہیں؟", "کیا تم بچہ ہو؟", "تم کہاں رہتے ہو؟"], "کیا تمہارے بچے ہیں؟", "ہاں/نہیں سوال میں فعل پہلے آتا ہے۔"),
      reverse("تمہارے بچے ہیں؟", ["heb je kinderen?", "ben je kinderen?", "waar zijn kinderen?"], "heb je kinderen?", "heb je = کیا تمہارے پاس ہے۔"),
      reverse("تم کل آ رہے ہو؟", ["kom je morgen?", "woon je morgen?", "heb je morgen?"], "kom je morgen?", "Kom je morgen? = کیا تم کل آ رہے ہو؟"),
      meaning("ja", ["ہاں", "نہیں", "شاید"], "ہاں", "چھوٹا جواب: ja۔"),
      meaning("nee", ["نہیں", "ہاں", "اچھا"], "نہیں", "چھوٹا جواب: nee۔")
    ]
  },
  {
    id: "a1-house-food-plurals",
    unit: "A1: گھر، کھانا، جمع",
    title: "سبق 8: Huis, brood, boeken",
    description: "روزمرہ الفاظ: گھر، کھانا، de/het/een اور جمع کی شکلیں۔",
    xp: 75,
    questions: [
      meaning("het huis", ["گھر", "دروازہ", "کرسی"], "گھر", "het huis = گھر۔"),
      meaning("kamer", ["کمرہ", "کچن", "باتھ روم"], "کمرہ", "kamer = کمرہ۔"),
      meaning("keuken", ["کچن", "باتھ روم", "کرسی"], "کچن", "keuken = کچن۔"),
      meaning("badkamer", ["باتھ روم", "کچن", "دروازہ"], "باتھ روم", "badkamer = باتھ روم۔"),
      meaning("tafel", ["میز", "فون", "کمرہ"], "میز", "tafel = میز۔"),
      meaning("stoel", ["کرسی", "چابی", "گھر"], "کرسی", "stoel = کرسی۔"),
      meaning("brood", ["روٹی / بریڈ", "پنیر", "گوشت"], "روٹی / بریڈ", "brood = روٹی۔"),
      meaning("kaas", ["پنیر", "پانی", "چاول"], "پنیر", "kaas = پنیر۔"),
      meaning("groente", ["سبزی", "پھل", "گوشت"], "سبزی", "groente = سبزی۔"),
      meaning("fruit", ["پھل", "سبزی", "دودھ"], "پھل", "fruit = پھل۔"),
      meaning("boek", ["کتاب", "بیگ", "میز"], "کتاب", "boek = کتاب۔"),
      meaning("boeken", ["کتابیں", "بیگ", "میزیں"], "کتابیں", "جمع: boek -> boeken۔"),
      meaning("tas", ["بیگ", "کتاب", "دروازہ"], "بیگ", "tas = بیگ۔"),
      meaning("tassen", ["کئی بیگ", "کتابیں", "بچے"], "کئی بیگ", "جمع: tas -> tassen۔"),
      reverse("گھر", ["het huis", "de huis", "een man"], "het huis", "گھر = het huis۔"),
      reverse("کتابیں", ["boeken", "boek", "tassen"], "boeken", "کتابیں = boeken۔")
    ]
  },
  {
    id: "a1-shopping-transport",
    unit: "A1: خریداری اور سفر",
    title: "سبق 9: Hoeveel kost dit?",
    description: "خریداری، قیمتیں، سفر، station، ٹکٹ۔",
    xp: 75,
    questions: [
      meaning("winkel", ["دکان", "اسٹیشن", "ڈاکٹر"], "دکان", "winkel = دکان۔"),
      meaning("supermarkt", ["سپر مارکیٹ", "بس", "فارم"], "سپر مارکیٹ", "supermarkt = سپر مارکیٹ۔"),
      meaning("prijs", ["قیمت", "رسید", "پیسہ"], "قیمت", "prijs = قیمت۔"),
      meaning("kassa", ["ادائیگی کا کاؤنٹر", "بس اسٹاپ", "رسید"], "ادائیگی کا کاؤنٹر", "kassa = ادائیگی کا کاؤنٹر۔"),
      meaning("bon", ["رسید", "قیمت", "نقد"], "رسید", "bon = رسید۔"),
      meaning("pinpas", ["بینک کارڈ", "رسید", "ٹکٹ"], "بینک کارڈ", "pinpas = بینک کارڈ۔"),
      meaning("contant", ["نقد", "مہنگا", "سستا"], "نقد", "contant = نقد۔"),
      meaning("goedkoop", ["سستا", "مہنگا", "نیا"], "سستا", "goedkoop = سستا۔"),
      meaning("duur", ["مہنگا", "سستا", "اچھا"], "مہنگا", "duur = مہنگا۔"),
      meaning("station", ["اسٹیشن", "دکان", "رسید"], "اسٹیشن", "station = اسٹیشن۔"),
      meaning("halte", ["بس/ٹرام اسٹاپ", "دکان", "گھر"], "بس/ٹرام اسٹاپ", "halte = اسٹاپ۔"),
      meaning("kaartje", ["ٹکٹ", "رسید", "کارڈ"], "ٹکٹ", "kaartje = ٹکٹ۔"),
      meaning("hoeveel kost dit?", ["یہ کتنے کا ہے؟", "یہ کہاں ہے؟", "تم کون ہو؟"], "یہ کتنے کا ہے؟", "خریداری سوال۔"),
      meaning("waar is het station?", ["اسٹیشن کہاں ہے؟", "یہ کتنے کا ہے؟", "ٹکٹ کہاں ہے؟"], "اسٹیشن کہاں ہے؟", "سفر سوال۔"),
      reverse("مجھے ٹکٹ چاہیے", ["ik wil een kaartje", "ik heb een bon", "ik ben een kaartje"], "ik wil een kaartje", "kaartje = ٹکٹ۔")
    ]
  },
  {
    id: "a1-health-appointments",
    unit: "A1: صحت اور afspraak",
    title: "سبق 10: Ik heb een afspraak",
    description: "ڈاکٹر، درد، بیماری، ملاقات کا وقت، چھوٹا پیغام۔",
    xp: 80,
    questions: [
      meaning("dokter", ["ڈاکٹر", "دندان ساز", "فارمیسی"], "ڈاکٹر", "dokter = ڈاکٹر۔"),
      meaning("tandarts", ["دندان ساز", "ڈاکٹر", "اسکول"], "دندان ساز", "tandarts = دندان ساز۔"),
      meaning("ziek", ["بیمار", "ٹھیک", "مہنگا"], "بیمار", "ziek = بیمار۔"),
      meaning("pijn", ["درد", "دوا", "وقت"], "درد", "pijn = درد۔"),
      meaning("hoofdpijn", ["سر درد", "پیٹ درد", "دوا"], "سر درد", "hoofdpijn = سر درد۔"),
      meaning("buikpijn", ["پیٹ درد", "سر درد", "دندان ساز"], "پیٹ درد", "buikpijn = پیٹ درد۔"),
      meaning("medicijn", ["دوا", "ڈاکٹر", "رسید"], "دوا", "medicijn = دوا۔"),
      meaning("afspraak", ["ملاقات کا وقت", "درد", "خط"], "ملاقات کا وقت", "afspraak = ملاقات کا وقت۔"),
      meaning("ik ben ziek", ["میں بیمار ہوں", "میں ڈاکٹر ہوں", "میرے پاس دوا ہے"], "میں بیمار ہوں", "صحت والا جملہ۔"),
      meaning("ik heb pijn", ["مجھے درد ہے", "میں درد ہوں", "میرے پاس وقت ہے"], "مجھے درد ہے", "ik heb pijn = مجھے درد ہے۔"),
      meaning("ik heb een afspraak bij de dokter", ["میری ڈاکٹر کے پاس ملاقات کا وقت ہے", "میں ڈاکٹر ہوں", "مجھے ڈاکٹر چاہیے"], "میری ڈاکٹر کے پاس ملاقات کا وقت ہے", "A1 بولنے کی مثال۔"),
      reverse("میں کل نہیں آ سکتا/سکتی", ["ik kan morgen niet komen", "ik ben morgen niet komen", "ik heb morgen geen komen"], "ik kan morgen niet komen", "چھوٹا پیغام۔"),
      reverse("میں بیمار ہوں", ["ik ben ziek", "ik heb ziek", "ik wil ziek"], "ik ben ziek", "zijn فعل۔"),
      reverse("مجھے ملاقات کا وقت چاہیے", ["ik wil een afspraak", "ik heb geen afspraak", "ik ben een afspraak"], "ik wil een afspraak", "wil = چاہیے۔"),
      meaning("beste meneer", ["محترم جناب", "خدا حافظ", "میرا نام"], "محترم جناب", "ادب والے چھوٹے پیغام کا آغاز۔")
    ]
  }
];

const a2Lessons = [
  {
    id: "a2-perfect-tense",
    unit: "A2: verleden tijd",
    title: "A2 les 1: Ik heb gewerkt",
    description: "A2 گرامر: گزرے ہوئے کام کے لیے hebben/zijn + فعل کی تیسری شکل۔",
    xp: 85,
    questions: [
      uitleg("گزرے ہوئے کام کا آسان نقشہ", [
        "A2 میں گزرے ہوئے کام کے لیے اکثر heb/heeft یا ben/zijn آتا ہے۔",
        "آخر میں فعل کی بدلی ہوئی شکل آتی ہے: gewerkt، gegaan، gebeld۔",
        "حرکت والے جملوں میں اکثر ben/zijn آتا ہے: ik ben gegaan۔"
      ], "اس سبق میں پہلے مکمل جملہ پہچانیں، پھر چھوٹے حصے یاد کریں۔"),
      meaning("ik heb gewerkt", ["میں نے کام کیا ہے", "میں کام کرتا ہوں", "میں کام کرنے جا رہا ہوں"], "میں نے کام کیا ہے", "گزرے ہوئے کام کا زمانہ: hebben + فعل کی تیسری شکل۔"),
      meaning("zij heeft gekookt", ["اس نے کھانا پکایا ہے", "وہ کھانا پکاتی ہے", "وہ کھانا پکانے جا رہی ہے"], "اس نے کھانا پکایا ہے", "heeft + gekookt گزرا ہوا کام ہے۔"),
      meaning("wij zijn naar de supermarkt gegaan", ["ہم سپر مارکیٹ گئے ہیں", "ہم سپر مارکیٹ میں ہیں", "ہم سپر مارکیٹ جائیں گے"], "ہم سپر مارکیٹ گئے ہیں", "حرکت والے فعل اکثر zijn لیتے ہیں۔"),
      meaning("hij is thuis gebleven", ["وہ گھر پر رہا ہے", "وہ گھر پر ہے", "وہ گھر جائے گا"], "وہ گھر پر رہا ہے", "blijven کے ساتھ گزرے ہوئے زمانے میں zijn آتا ہے۔"),
      reverse("میں ڈاکٹر کے پاس گیا/گئی ہوں", ["ik ben naar de dokter gegaan", "ik heb naar de dokter gewerkt", "ik ga naar de dokter"], "ik ben naar de dokter gegaan", "حرکت: zijn + gegaan۔"),
      reverse("اس نے کھانا پکایا ہے", ["zij heeft gekookt", "zij is gekookt", "zij gaat koken"], "zij heeft gekookt", "کھانا پکانے کے ساتھ hebben آتا ہے۔"),
      meaning("gewerkt", ["کام کیا", "گیا", "رہا"], "کام کیا", "werken کی تیسری فعل شکل۔"),
      meaning("gegaan", ["گیا", "کام کیا", "رہا"], "گیا", "gaan کی تیسری فعل شکل۔"),
      meaning("gebleven", ["رہا", "پکایا", "کام کیا"], "رہا", "blijven کی تیسری فعل شکل۔"),
      meaning("ik heb gisteren gebeld", ["میں نے کل فون کیا", "میں کل فون کروں گا", "میں فون کر رہا ہوں"], "میں نے کل فون کیا", "gisteren + گزرے ہوئے کام کا زمانہ۔")
    ]
  },
  {
    id: "a2-future-modal-verbs",
    unit: "A2: gaan اور معاون فعل",
    title: "A2 les 2: Ik ga werken",
    description: "آنے والے کام کے لیے gaan، اور کام آنے والے معاون فعل: kunnen، moeten، mogen۔",
    xp: 85,
    questions: [
      meaning("ik ga morgen werken", ["میں کل کام کرنے جا رہا/رہی ہوں", "میں نے کل کام کیا", "میں آج کام کرتا ہوں"], "میں کل کام کرنے جا رہا/رہی ہوں", "آنے والے کام کے لیے gaan۔"),
      meaning("wij gaan Nederlands leren", ["ہم Nederlands سیکھنے جا رہے ہیں", "ہم Nederlands سیکھ چکے ہیں", "ہم Nederlands ہیں"], "ہم Nederlands سیکھنے جا رہے ہیں", "gaan + اصل فعل۔"),
      meaning("ik moet naar de gemeente", ["مجھے gemeente جانا ہے", "میں gemeente گیا ہوں", "میں gemeente ہوں"], "مجھے gemeente جانا ہے", "moeten = ضروری ہونا۔"),
      meaning("kunt u mij helpen?", ["کیا آپ میری مدد کر سکتے ہیں؟", "کیا آپ مجھے جانتے ہیں؟", "کیا آپ ملاقات کا وقت ہیں؟"], "کیا آپ میری مدد کر سکتے ہیں؟", "ادب والا کام آنے والا سوال۔"),
      meaning("mag ik hier parkeren?", ["کیا میں یہاں پارک کر سکتا ہوں؟", "کیا مجھے یہاں کام کرنا ہے؟", "کیا میں یہاں رہتا ہوں؟"], "کیا میں یہاں پارک کر سکتا ہوں؟", "mogen = اجازت ہونا۔"),
      reverse("مجھے ڈاکٹر کو فون کرنا ہے", ["ik moet de dokter bellen", "ik mag de dokter bellen", "ik ben de dokter bellen"], "ik moet de dokter bellen", "moet + اصل فعل۔"),
      reverse("کیا آپ میری مدد کر سکتے ہیں؟", ["kunt u mij helpen?", "moet u mij helpen?", "gaat u mij helpen?"], "kunt u mij helpen?", "kunnen = کر سکنا۔"),
      meaning("kunnen", ["کر سکنا", "ضروری ہونا", "اجازت ہونا"], "کر سکنا", "kunnen = کر سکنا۔"),
      meaning("moeten", ["ضروری ہونا", "کر سکنا", "چاہنا"], "ضروری ہونا", "moeten = ضروری ہونا۔"),
      meaning("mogen", ["اجازت ہونا", "ضروری ہونا", "رہنا"], "اجازت ہونا", "mogen = اجازت ہونا۔")
    ]
  },
  {
    id: "a2-separable-verbs-routine",
    unit: "A2: splitsbare werkwoorden",
    title: "A2 les 3: Ik sta om zeven uur op",
    description: "روزمرہ معمول اور الگ ہونے والے فعل: opstaan، invullen، opbellen۔",
    xp: 85,
    questions: [
      uitleg("الگ ہونے والے فعل", [
        "کچھ Nederlands فعل دو حصوں میں ٹوٹ جاتے ہیں۔",
        "opstaan جملے میں sta ... op بن سکتا ہے۔",
        "invullen جملے میں vul ... in بن سکتا ہے۔"
      ], "دونوں حصوں کو ایک ہی فعل سمجھیں، بس جملے میں جگہ بدل سکتی ہے۔"),
      meaning("ik sta om zeven uur op", ["میں سات بجے اٹھتا/اٹھتی ہوں", "میں سات بجے کام کرتا ہوں", "میں سات بجے فون کرتا ہوں"], "میں سات بجے اٹھتا/اٹھتی ہوں", "opstaan الگ ہوتا ہے: sta ... op۔"),
      meaning("vul het formulier in", ["فارم بھر دیں", "ڈاکٹر کو فون کریں", "گھر صاف کریں"], "فارم بھر دیں", "invullen الگ ہوتا ہے: vul ... in۔"),
      meaning("ik bel de dokter op", ["میں ڈاکٹر کو فون کرتا/کرتی ہوں", "میں ڈاکٹر کے پاس جاتا ہوں", "میں ڈاکٹر سے ملاقات کا وقت رکھتا ہوں"], "میں ڈاکٹر کو فون کرتا/کرتی ہوں", "opbellen الگ ہوتا ہے: bel ... op۔"),
      meaning("wij maken het huis schoon", ["ہم گھر صاف کرتے ہیں", "ہم گھر جاتے ہیں", "ہم گھر کرائے پر لیتے ہیں"], "ہم گھر صاف کرتے ہیں", "schoonmaken الگ ہوتا ہے۔"),
      reverse("میں سات بجے اٹھتا ہوں", ["ik sta om zeven uur op", "ik opsta om zeven uur", "ik bel om zeven uur op"], "ik sta om zeven uur op", "الگ ہونے والا حصہ آخر میں جاتا ہے۔"),
      reverse("فارم بھر دیں", ["vul het formulier in", "bel het formulier op", "maak het formulier schoon"], "vul het formulier in", "invullen = فارم بھرنا۔"),
      meaning("opstaan", ["اٹھنا", "فون کرنا", "صاف کرنا"], "اٹھنا", "opstaan = اٹھنا۔"),
      meaning("invullen", ["بھرنا", "رہنا", "خریدنا"], "بھرنا", "invullen = بھرنا۔"),
      meaning("opbellen", ["فون کرنا", "اٹھنا", "صاف کرنا"], "فون کرنا", "opbellen = فون کرنا۔"),
      meaning("schoonmaken", ["صاف کرنا", "فون کرنا", "رکنا"], "صاف کرنا", "schoonmaken = صاف کرنا۔")
    ]
  },
  {
    id: "a2-word-order-connectors",
    unit: "A2: لفظوں کی ترتیب",
    title: "A2 les 4: Omdat ik ziek ben",
    description: "وقت پہلے آئے تو لفظوں کی ترتیب، اور جوڑنے والے الفاظ: omdat، dat، als۔",
    xp: 90,
    questions: [
      uitleg("لفظوں کی ترتیب بدل سکتی ہے", [
        "اگر وقت پہلے آئے تو فعل دوسرے نمبر پر رہتا ہے: vandaag werk ik۔",
        "omdat کے بعد فعل آخر میں جاتا ہے: omdat ik ziek ben۔",
        "یہ اردو سے مختلف ہے، اس لیے چھوٹے نمونے بار بار دیکھیں۔"
      ], "اس سبق کا مقصد معنی کے ساتھ ترتیب کو بھی پہچاننا ہے۔"),
      meaning("vandaag werk ik niet", ["آج میں کام نہیں کرتا", "میں آج کام کرتا ہوں", "کل میں کام کروں گا"], "آج میں کام نہیں کرتا", "وقت پہلے آئے تو ترتیب بدلتی ہے: vandaag werk ik۔"),
      meaning("ik ga morgen met de bus naar Amsterdam", ["میں کل بس سے Amsterdam جا رہا ہوں", "میں آج bus میں کام کرتا ہوں", "میں Amsterdam سے bus لیتا ہوں"], "میں کل بس سے Amsterdam جا رہا ہوں", "وقت + طریقہ + جگہ۔"),
      meaning("ik kom niet, omdat ik ziek ben", ["میں نہیں آتا کیونکہ میں بیمار ہوں", "میں آتا ہوں کیونکہ میں ٹھیک ہوں", "میں بیمار نہیں ہوں"], "میں نہیں آتا کیونکہ میں بیمار ہوں", "omdat فعل کو آخر میں بھیجتا ہے۔"),
      meaning("ik denk dat hij thuis is", ["میرا خیال ہے وہ گھر پر ہے", "وہ سوچتا ہے میں گھر پر ہوں", "میں گھر جا رہا ہوں"], "میرا خیال ہے وہ گھر پر ہے", "dat والے حصے میں فعل آخر میں آتا ہے۔"),
      meaning("als het regent, blijf ik thuis", ["اگر بارش ہو تو میں گھر رہتا ہوں", "میں بارش میں کام کرتا ہوں", "اگر گھر ہے تو بارش ہے"], "اگر بارش ہو تو میں گھر رہتا ہوں", "als = اگر۔"),
      reverse("کیونکہ میں بیمار ہوں", ["omdat ik ziek ben", "omdat ik ben ziek", "want ik ziek ben"], "omdat ik ziek ben", "omdat کے ساتھ فعل آخر میں آتا ہے۔"),
      reverse("آج میں کام نہیں کرتا", ["vandaag werk ik niet", "vandaag ik werk niet", "ik vandaag niet werk"], "vandaag werk ik niet", "وقت پہلے: فعل دوسرے نمبر پر۔"),
      meaning("omdat", ["کیونکہ", "اگر", "لیکن"], "کیونکہ", "omdat = کیونکہ۔"),
      meaning("dat", ["کہ", "اگر", "اس لیے"], "کہ", "dat = کہ۔"),
      meaning("als", ["اگر", "کیونکہ", "اور"], "اگر", "als = اگر۔")
    ]
  },
  {
    id: "a2-gemeente-official",
    unit: "A2: gemeente",
    title: "A2 les 5: Kunt u mij helpen?",
    description: "سرکاری کام: gemeente، فارم، BSN، پاسپورٹ، کاغذات۔",
    xp: 90,
    questions: [
      uitleg("gemeente والے سرکاری الفاظ", [
        "gemeente وہ جگہ ہے جہاں بہت سے سرکاری کام ہوتے ہیں۔",
        "afspraak = ملاقات کا وقت، formulier = فارم، loket = کاؤنٹر۔",
        "پہلے الفاظ پہچانیں، پھر جملہ بنائیں: ik wil een afspraak maken۔"
      ], "یہ الفاظ زندگی میں بہت کام آئیں گے، اس لیے یہاں زیادہ دہرائی رکھی گئی ہے۔"),
      meaning("gemeente", ["شہری سرکاری دفتر", "ہسپتال", "اسکول"], "شہری سرکاری دفتر", "gemeente شہری سرکاری دفتر ہے۔"),
      meaning("afspraak", ["ملاقات کا وقت", "کاغذ", "دستخط"], "ملاقات کا وقت", "gemeente میں afspraak بنانی پڑ سکتی ہے۔"),
      meaning("formulier", ["فارم", "پاسپورٹ", "کاؤنٹر"], "فارم", "formulier = فارم۔"),
      meaning("paspoort", ["پاسپورٹ", "کاغذ", "BSN"], "پاسپورٹ", "paspoort = پاسپورٹ۔"),
      meaning("BSN", ["شہری شناختی نمبر", "بینک کارڈ", "کرایہ"], "شہری شناختی نمبر", "BSN سرکاری شناختی نمبر ہے۔"),
      meaning("handtekening", ["دستخط", "حرف / خط", "کاؤنٹر"], "دستخط", "handtekening = دستخط۔"),
      meaning("loket", ["کاؤنٹر", "کاغذ", "ملاقات کا وقت"], "کاؤنٹر", "loket = کاؤنٹر۔"),
      meaning("kunt u mij helpen met dit formulier?", ["کیا آپ اس فارم میں میری مدد کر سکتے ہیں؟", "کیا آپ پاسپورٹ دے سکتے ہیں؟", "کیا آپ مجھے کام دے سکتے ہیں؟"], "کیا آپ اس فارم میں میری مدد کر سکتے ہیں؟", "A2 روزمرہ کام کا سوال۔"),
      reverse("مجھے ملاقات کا وقت بنانی ہے", ["ik wil een afspraak maken", "ik heb een formulier maken", "ik ben een afspraak"], "ik wil een afspraak maken", "afspraak maken = ملاقات کا وقت بنانا۔"),
      reverse("کیا آپ میری مدد کر سکتے ہیں؟", ["kunt u mij helpen?", "mag u mij helpen?", "moet ik helpen?"], "kunt u mij helpen?", "ادب والا سوال۔")
    ]
  },
  {
    id: "a2-work-school",
    unit: "A2: werk en school",
    title: "A2 les 6: Werk, school, afspraak",
    description: "کام، اسکول، وقتوں کی فہرست، استاد، کام کا ساتھی، چھوٹے پیغام۔",
    xp: 90,
    questions: [
      meaning("werk", ["کام", "اسکول", "ڈاکٹر"], "کام", "werk = کام۔"),
      meaning("baan", ["نوکری", "سبق", "کرایہ"], "نوکری", "baan = نوکری۔"),
      meaning("collega", ["کام کا ساتھی", "استاد", "بچہ"], "کام کا ساتھی", "collega = کام کا ساتھی۔"),
      meaning("salaris", ["تنخواہ", "معاہدہ", "وقفہ"], "تنخواہ", "salaris = تنخواہ۔"),
      meaning("contract", ["معاہدہ", "رپورٹ", "ملاقات کا وقت"], "معاہدہ", "contract = معاہدہ۔"),
      meaning("rooster", ["کام یا اسکول کے اوقات", "تنخواہ", "سبق"], "کام یا اسکول کے اوقات", "rooster = کام یا اسکول کے اوقات۔"),
      meaning("docent", ["استاد", "طالب علم", "کام کا ساتھی"], "استاد", "docent = استاد۔"),
      meaning("huiswerk", ["گھر کا کام", "ملاقات", "تنخواہ"], "گھر کا کام", "huiswerk = گھر کا کام۔"),
      meaning("mijn zoon kan vandaag niet naar school komen", ["میرا بیٹا آج اسکول نہیں آ سکتا", "میرا بیٹا آج کام کرے گا", "میرا بیٹا استاد ہے"], "میرا بیٹا آج اسکول نہیں آ سکتا", "A2 اسکول کا پیغام۔"),
      reverse("میرے کام کے اوقات بدل گئے ہیں", ["mijn rooster is veranderd", "mijn salaris is ziek", "mijn school is gewerkt"], "mijn rooster is veranderd", "کام یا اسکول کا روزمرہ جملہ۔")
    ]
  },
  {
    id: "a2-health-housing",
    unit: "A2: gezondheid en woning",
    title: "A2 les 7: Mijn verwarming doet het niet",
    description: "huisarts، apotheek، verzekering، reparatie، verwarming، lekkage۔",
    xp: 95,
    questions: [
      meaning("huisarts", ["عام ڈاکٹر", "دندان ساز", "دواخانہ"], "عام ڈاکٹر", "huisarts Nederland میں عام ڈاکٹر ہوتا ہے۔"),
      meaning("apotheek", ["دواخانہ", "ہسپتال", "انشورنس"], "دواخانہ", "apotheek = دواخانہ۔"),
      meaning("verzekering", ["انشورنس", "دوا", "ملاقات کا وقت"], "انشورنس", "verzekering = انشورنس۔"),
      meaning("koorts", ["بخار", "کھانسی", "درد"], "بخار", "koorts = بخار۔"),
      meaning("hoesten", ["کھانسی", "بخار", "مرمت"], "کھانسی", "hoesten = کھانسی۔"),
      meaning("reparatie", ["مرمت", "کرایہ", "ہیٹنگ"], "مرمت", "reparatie = مرمت۔"),
      meaning("verwarming", ["ہیٹنگ", "پانی کا رساؤ", "بجلی"], "ہیٹنگ", "verwarming = ہیٹنگ۔"),
      meaning("lekkage", ["پانی کا رساؤ", "بل", "پڑوسی"], "پانی کا رساؤ", "lekkage = پانی کا رساؤ۔"),
      meaning("mijn verwarming doet het niet", ["میری ہیٹنگ کام نہیں کر رہی", "میری ہیٹنگ نئی ہے", "میرے پاس ہیٹنگ نہیں ہے"], "میری ہیٹنگ کام نہیں کر رہی", "A2 مسئلہ بتانے والا جملہ۔"),
      reverse("کیا آپ کسی کو بھیج سکتے ہیں؟", ["kunt u iemand sturen?", "mag ik iemand sturen?", "moet iemand bellen?"], "kunt u iemand sturen?", "گھر / مرمت کا سوال۔")
    ]
  },
  {
    id: "a2-shopping-services",
    unit: "A2: winkel en service",
    title: "A2 les 8: Ik wil hem ruilen",
    description: "دکان کے کام: klacht، garantie، ruilen، aanbieding۔",
    xp: 90,
    questions: [
      meaning("klacht", ["شکایت", "رعایت", "رسید"], "شکایت", "klacht = شکایت۔"),
      meaning("garantie", ["ضمانت", "سائز", "نقد پیسے"], "ضمانت", "garantie = ضمانت۔"),
      meaning("ruilen", ["بدلنا", "پیسے دینا", "پارک کرنا"], "بدلنا", "ruilen = چیز بدلنا۔"),
      meaning("aanbieding", ["خصوصی رعایت", "شکایت", "سائز"], "خصوصی رعایت", "aanbieding = خصوصی رعایت۔"),
      meaning("maat", ["سائز", "بازار", "رسید"], "سائز", "maat = سائز۔"),
      meaning("ik heb gisteren deze jas gekocht", ["میں نے کل یہ جیکٹ خریدی", "میں آج جیکٹ خریدتا ہوں", "میں جیکٹ واپس کروں گا"], "میں نے کل یہ جیکٹ خریدی", "گزرے ہوئے کام کا زمانہ: gekocht۔"),
      meaning("maar hij is kapot", ["لیکن یہ خراب ہے", "لیکن یہ سستا ہے", "لیکن یہ نیا ہے"], "لیکن یہ خراب ہے", "kapot = خراب۔"),
      meaning("ik wil hem graag ruilen", ["میں اسے بدلنا چاہتا ہوں", "میں اسے خریدنا چاہتا ہوں", "میں اسے پہننا چاہتا ہوں"], "میں اسے بدلنا چاہتا ہوں", "A2 شکایت / درخواست۔"),
      reverse("یہ خراب ہے", ["hij is kapot", "hij is goedkoop", "hij is goed"], "hij is kapot", "kapot = خراب۔"),
      reverse("میں اسے بدلنا چاہتا ہوں", ["ik wil hem ruilen", "ik heb hem gekocht", "ik moet hem betalen"], "ik wil hem ruilen", "ruilen = بدلنا۔")
    ]
  },
  {
    id: "a2-writing-messages",
    unit: "A2: berichten",
    title: "A2 les 9: Korte berichten",
    description: "چھوٹے پیغام، دعوت، شکایت، ادب والا اختتام۔",
    xp: 95,
    questions: [
      meaning("beste dokter", ["محترم ڈاکٹر", "خدا حافظ ڈاکٹر", "میرا ڈاکٹر"], "محترم ڈاکٹر", "رسمی پیغام کا آغاز۔"),
      meaning("met vriendelijke groet", ["احترام کے ساتھ", "فوراً آئیں", "شکریہ نہیں"], "احترام کے ساتھ", "رسمی پیغام کا اختتام۔"),
      meaning("ik wil graag een afspraak maken", ["میں ملاقات کا وقت بنانا چاہتا ہوں", "میں ملاقات کا وقت منسوخ کرنا چاہتا ہوں", "میں ملاقات کا وقت رکھتا ہوں"], "میں ملاقات کا وقت بنانا چاہتا ہوں", "A2 لکھنے / بولنے کا فقرہ۔"),
      meaning("mijn zoon kan vandaag niet komen", ["میرا بیٹا آج نہیں آ سکتا", "میرا بیٹا آج آئے گا", "میرا بیٹا آج کام کرے گا"], "میرا بیٹا آج نہیں آ سکتا", "اسکول کا پیغام۔"),
      meaning("ik geef zaterdag een feest", ["میں ہفتے کو دعوت دے رہا ہوں", "میں ہفتے کو کام کرتا ہوں", "میں ہفتے کو بیمار ہوں"], "میں ہفتے کو دعوت دے رہا ہوں", "دعوت والا فقرہ۔"),
      meaning("kom je ook?", ["کیا تم بھی آؤ گے؟", "تم کہاں ہو؟", "کیا تم بیمار ہو؟"], "کیا تم بھی آؤ گے؟", "دعوت والا سوال۔"),
      reverse("احترام کے ساتھ", ["met vriendelijke groet", "beste meneer", "hoi Ahmed"], "met vriendelijke groet", "رسمی اختتام۔"),
      reverse("میں ملاقات کا وقت بنانا چاہتا ہوں", ["ik wil graag een afspraak maken", "ik heb een afspraak gehad", "ik ben een afspraak"], "ik wil graag een afspraak maken", "graag جملے کو ادب والا بناتا ہے۔"),
      reverse("کیا تم بھی آؤ گے؟", ["kom je ook?", "waar woon je?", "heb je ook?"], "kom je ook?", "دعوت والا سوال۔"),
      meaning("hoi Ahmed", ["سلام Ahmed", "محترم Ahmed", "خدا حافظ Ahmed"], "سلام Ahmed", "بے تکلف پیغام کا آغاز۔")
    ]
  },
  {
    id: "a2-strong-combined",
    unit: "A2: مشترک مشق",
    title: "A2 les 10: Omdat ik pijn had",
    description: "A2 انداز کی صحت والی مضبوط کہانی: گزرا ہوا زمانہ، omdat، dat، اور معاون فعل۔",
    xp: 100,
    questions: [
      meaning("ik ben gisteren naar de huisarts gegaan", ["میں کل ڈاکٹر کے پاس گیا/گئی", "میں کل ڈاکٹر تھا/تھی", "میں کل ڈاکٹر کو فون کروں گا"], "میں کل ڈاکٹر کے پاس گیا/گئی", "گزرے ہوئے کام کا زمانہ: zijn + gegaan۔"),
      meaning("omdat ik pijn had in mijn rug", ["کیونکہ میری کمر میں درد تھا", "کیونکہ میں ڈاکٹر تھا", "کیونکہ میرے پاس وقت ہے"], "کیونکہ میری کمر میں درد تھا", "omdat + فعل آخر میں۔"),
      meaning("de dokter heeft gezegd", ["ڈاکٹر نے کہا ہے", "ڈاکٹر کہے گا", "ڈاکٹر بیمار ہے"], "ڈاکٹر نے کہا ہے", "heeft gezegd = کہا ہے۔"),
      meaning("dat ik rust moet nemen", ["کہ مجھے آرام کرنا چاہیے", "کہ مجھے کام کرنا چاہیے", "کہ مجھے جانا ہے"], "کہ مجھے آرام کرنا چاہیے", "dat والے حصے میں معاون فعل۔"),
      meaning("ik moet volgende week terugkomen", ["مجھے اگلے ہفتے واپس آنا ہے", "میں اگلے ہفتے کام کروں گا", "میں آج واپس آیا"], "مجھے اگلے ہفتے واپس آنا ہے", "moet + اصل فعل۔"),
      meaning("als de pijn niet weg is", ["اگر درد ختم نہیں ہوا", "اگر درد اچھا ہے", "اگر ڈاکٹر نہیں ہے"], "اگر درد ختم نہیں ہوا", "als = اگر۔"),
      reverse("ڈاکٹر نے کہا ہے", ["de dokter heeft gezegd", "de dokter gaat zeggen", "de dokter is gezegd"], "de dokter heeft gezegd", "گزرے ہوئے کام کا زمانہ۔"),
      reverse("مجھے آرام کرنا چاہیے", ["ik moet rust nemen", "ik mag rust nemen", "ik heb rust genomen"], "ik moet rust nemen", "moeten = ضروری / چاہیے۔"),
      reverse("اگر درد ختم نہیں ہوا", ["als de pijn niet weg is", "omdat de pijn weg is", "dat de pijn niet"], "als de pijn niet weg is", "A2 دوسرے جملے کا حصہ۔"),
      meaning("terugkomen", ["واپس آنا", "فون کرنا", "فارم بھرنا"], "واپس آنا", "terugkomen = واپس آنا۔")
    ]
  }
];

a1Lessons.find((lesson) => lesson.id === "a1-zero-tiny-words").questions.push(
  build("اچھا نہیں", ["niet", "goed"], "niet goed", "Nederlands میں niet عام طور پر اس لفظ سے پہلے آتا ہے جسے نہیں کہنا ہو۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-zijn-first-sentences").questions.push(
  build("میں اچھا نہیں ہوں", ["ik", "ben", "niet", "goed"], "ik ben niet goed", "بنیادی ترتیب: ik + ben + niet + goed۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-greetings-personal-info").questions.push(
  build("میرا نام Ali ہے", ["mijn", "naam", "is", "Ali"], "mijn naam is Ali", "نام بتانے کا طے شدہ نمونہ ہے: mijn naam is + naam۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-people-family-articles").questions.push(
  build("یہ ایک بچہ ہے", ["dit", "is", "een", "kind"], "dit is een kind", "چھوٹا جملہ: dit + is + een + اسم۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-hebben-family").questions.push(
  build("میرے پاس ایک بچہ ہے", ["ik", "heb", "een", "kind"], "ik heb een kind", "ملکیت کے لیے: ik heb + چیز/شخص۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-present-time").questions.push(
  build("آج میں کام کرتا/کرتی ہوں", ["vandaag", "werk", "ik"], "vandaag werk ik", "جب وقت لفظ پہلے آئے تو فعل دوسرے نمبر پر آتا ہے: vandaag + werk + ik۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-questions").questions.push(
  build("آپ کہاں رہتے ہیں؟", ["waar", "woont", "u"], "waar woont u", "سوال والا لفظ پہلے، پھر فعل، پھر شخص: waar + woont + u۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-house-food-plurals").questions.push(
  build("کتاب گھر میں ہے", ["het", "boek", "is", "in", "huis"], "het boek is in huis", "چیز پہلے، پھر فعل `is`، پھر جگہ۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-shopping-transport").questions.push(
  build("میں station جا رہا/رہی ہوں", ["ik", "ga", "naar", "het", "station"], "ik ga naar het station", "سمت کے لیے `naar` استعمال ہوتا ہے: ga naar...۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-health-appointments").questions.push(
  build("میں ملاقات کا وقت بنانا چاہتا/چاہتی ہوں", ["ik", "wil", "een", "afspraak", "maken"], "ik wil een afspraak maken", "معاون فعل `wil` کے بعد اصل فعل آخر میں آتا ہے: maken۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-perfect-tense").questions.push(
  build("میں نے کام کیا ہے", ["ik", "heb", "gewerkt"], "ik heb gewerkt", "گزرے ہوئے کام کے زمانے میں اکثر: شخص + heb/heeft + فعل کی تیسری شکل۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-future-modal-verbs").questions.push(
  build("کل میں کام کرنے جا رہا/رہی ہوں", ["morgen", "ga", "ik", "werken"], "morgen ga ik werken", "وقت والا لفظ پہلے آئے تو فعل دوسرے نمبر پر رہتا ہے: morgen + ga + ik۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-separable-verbs-routine").questions.push(
  build("میں صبح اٹھتا/اٹھتی ہوں", ["ik", "sta", "op", "in", "de", "ochtend"], "ik sta op in de ochtend", "الگ ہونے والا فعل `opstaan`: جملے میں `sta ... op` بن سکتا ہے۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-word-order-connectors").questions.push(
  build("میں نہیں آتا/آتی کیونکہ میں بیمار ہوں", ["ik", "kom", "niet", "omdat", "ik", "ziek", "ben"], "ik kom niet omdat ik ziek ben", "`omdat` کے بعد فعل آخر میں جاتا ہے: ik ziek ben۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-gemeente-official").questions.push(
  build("میں gemeente میں ملاقات کا وقت چاہتا/چاہتی ہوں", ["ik", "wil", "een", "afspraak", "bij", "de", "gemeente"], "ik wil een afspraak bij de gemeente", "درخواست والا جملہ: ik wil + چیز + جگہ۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-work-school").questions.push(
  build("میرا بیٹا آج نہیں آ سکتا", ["mijn", "zoon", "kan", "vandaag", "niet", "komen"], "mijn zoon kan vandaag niet komen", "معاون فعل `kan` کے ساتھ اصل فعل `komen` آخر میں آتا ہے۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-health-housing").questions.push(
  build("میری ہیٹنگ کام نہیں کر رہی", ["mijn", "verwarming", "doet", "het", "niet"], "mijn verwarming doet het niet", "مسئلہ بتانے والا فقرہ: doet het niet = کام نہیں کر رہا۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-shopping-services").questions.push(
  build("میں اسے بدلنا چاہتا/چاہتی ہوں", ["ik", "wil", "hem", "ruilen"], "ik wil hem ruilen", "`wil` کے بعد کام والا فعل آتا ہے: ruilen۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-writing-messages").questions.push(
  build("احترام کے ساتھ", ["met", "vriendelijke", "groet"], "met vriendelijke groet", "رسمی پیغام کا اختتام طے شدہ فقرہ ہے۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-strong-combined").questions.push(
  build("مجھے آرام کرنا چاہیے", ["ik", "moet", "rust", "nemen"], "ik moet rust nemen", "`moet` کے بعد کام والا فقرہ آتا ہے: rust nemen۔")
);


const imageChoice = (visual, options, answer, explain) => ({
  type: "image-choice",
  label: "تصویر دیکھ کر صحیح Nederlands لفظ منتخب کریں",
  prompt: "تصویر دیکھیں اور صحیح لفظ چنیں۔",
  visual,
  options,
  answer,
  explain
});

const listenChoice = (speak, options, answer, explain) => ({
  type: "listen-choice",
  label: "آواز سن کر صحیح معنی منتخب کریں",
  prompt: "آواز سنیں، پھر صحیح مطلب چنیں۔",
  speak,
  options,
  answer,
  explain,
  note: "آواز کا بٹن دبائیں۔"
});


const fillGap = (sentence, options, answer, explain) => ({
  type: "fill-gap",
  label: "خالی جگہ کے لیے صحیح لفظ منتخب کریں",
  prompt: sentence,
  options,
  answer,
  explain
});

const situation = (prompt, options, answer, explain) => ({
  type: "situation",
  label: "حال کے لیے صحیح Nederlands جملہ منتخب کریں",
  prompt,
  options,
  answer,
  explain
});

function isUrduText(value) {
  return /[\u0600-\u06ff]/.test(String(value || ""));
}

function isDutchOnlyText(value) {
  const text = String(value || "");
  return /[A-Za-zÀ-ÿ]/.test(text) && !isUrduText(text);
}

function uniq(items) {
  return [...new Set(items.filter(Boolean))];
}

function takeOptions(items, answer, count = 3) {
  const clean = uniq([answer, ...items]).filter(Boolean);
  return clean.slice(0, count);
}

function meaningSources(lesson) {
  return lesson.questions.filter((question) => (
    isDutchOnlyText(question.prompt) && isUrduText(question.answer) && question.options?.length
  ));
}

function reverseSources(lesson) {
  return lesson.questions.filter((question) => (
    isUrduText(question.prompt) && isDutchOnlyText(question.answer) && question.options?.length
  ));
}

function isGeneratedDutchOption(value) {
  if (!isDutchOnlyText(value)) return false;
  return !["the"].includes(String(value).toLowerCase());
}

function allDutchOptions(lesson) {
  return uniq(lesson.questions.flatMap((question) => [
    question.prompt,
    question.answer,
    ...(question.options || []),
    ...(question.tiles || [])
  ]).filter(isGeneratedDutchOption));
}

function allUrduOptions(lesson) {
  return uniq(lesson.questions.flatMap((question) => [
    question.prompt,
    question.answer,
    ...(question.options || [])
  ]).filter(isUrduText));
}

function cleanDutchWord(word) {
  return String(word || "").replace(/^[^A-Za-zÀ-ÿ]+|[^A-Za-zÀ-ÿ]+$/g, "");
}

function missingWordSentence(sentence) {
  const words = String(sentence || "").split(/\s+/).filter(Boolean);
  if (words.length < 2) return null;
  const entries = words.map((word, index) => ({ word, clean: cleanDutchWord(word), index }));
  const entry = [...entries].reverse().find((item) => /[A-Za-zÀ-ÿ]/.test(item.clean) && item.clean.length > 1);
  if (!entry) return null;
  const promptWords = [...words];
  promptWords[entry.index] = "___";
  return {
    prompt: promptWords.join(" "),
    missing: entry.clean
  };
}

function makeImageRevision(lesson, index) {
  const sources = meaningSources(lesson);
  const source = sources[index % sources.length];
  if (!source) return null;
  const options = takeOptions(sources.map((item) => item.prompt), source.prompt);
  if (options.length < 3) return null;
  return imageChoice(source.prompt, options, source.prompt, `${source.prompt} = ${source.answer}۔`);
}

function makeListenRevision(lesson, index) {
  const sources = meaningSources(lesson);
  const source = sources[index % sources.length];
  if (!source) return null;
  const options = takeOptions([...(source.options || []), ...allUrduOptions(lesson)], source.answer);
  if (options.length < 3) return null;
  return listenChoice(source.prompt, options, source.answer, `${source.prompt} = ${source.answer}۔`);
}


function makeFillRevision(lesson, index) {
  const sources = [...reverseSources(lesson), ...meaningSources(lesson)].filter((question) => (
    missingWordSentence(question.answer)?.prompt || missingWordSentence(question.prompt)?.prompt
  ));
  const source = sources[index % sources.length];
  if (!source) return null;
  const sentence = isDutchOnlyText(source.answer) ? source.answer : source.prompt;
  const gap = missingWordSentence(sentence);
  if (!gap) return null;
  const options = takeOptions(allDutchOptions(lesson).flatMap((text) => (
    String(text).split(/\s+/).map(cleanDutchWord).filter((word) => word.length > 1)
  )), gap.missing);
  if (options.length < 3) return null;
  return fillGap(gap.prompt, options, gap.missing, `خالی جگہ میں ${gap.missing} آئے گا۔`);
}

function makeSituationRevision(lesson, index) {
  const sources = reverseSources(lesson);
  const source = sources[index % sources.length];
  if (!source) return null;
  const options = takeOptions([...(source.options || []), ...allDutchOptions(lesson)], source.answer);
  if (options.length < 3) return null;
  return situation(`حال: ${source.prompt}`, options, source.answer, `اس حال میں صحیح جملہ: ${source.answer}۔`);
}

function makeRevisionQuestion(lesson, index) {
  const makers = [makeImageRevision, makeListenRevision, makeFillRevision, makeSituationRevision];
  for (let attempt = 0; attempt < makers.length; attempt += 1) {
    const maker = makers[(index + attempt) % makers.length];
    const question = maker(lesson, index + attempt);
    if (question) return question;
  }
  return null;
}

function addRevisionExpansion(lessons, total) {
  let added = 0;
  let round = 0;
  while (added < total && round < 20) {
    for (const lesson of lessons) {
      if (added >= total) break;
      const question = makeRevisionQuestion(lesson, added + round);
      if (!question) continue;
      lesson.questions.push(question);
      added += 1;
    }
    round += 1;
  }
}

addRevisionExpansion(a0Lessons, 35);
addRevisionExpansion(a1Lessons, 45);
addRevisionExpansion(a2Lessons, 45);

function addBeginnerAuditExpansion() {
  a0Lessons.find((lesson) => lesson.id === "a0-ja-nee-goed-niet").questions.push(
    listenChoice("niet", ["نہیں", "ہاں", "اچھا"], "نہیں", "niet جملے کے اندر نہیں کا مطلب دیتا ہے۔"),
    fillGap("ik ben ___ goed", ["niet", "ja", "een"], "niet", "اچھا نہیں = niet goed۔")
  );

  a0Lessons.find((lesson) => lesson.id === "a0-geen").questions.push(
    meaning("geen pen", ["کوئی قلم نہیں", "اچھا قلم", "ایک قلم"], "کوئی قلم نہیں", "geen + pen = کوئی قلم نہیں۔"),
    meaning("geen huis", ["کوئی گھر نہیں", "گھر میں", "اچھا گھر"], "کوئی گھر نہیں", "geen + huis = کوئی گھر نہیں۔"),
    reverse("کوئی قلم نہیں", ["geen pen", "niet pen", "nee pen"], "geen pen", "اسم کے ساتھ geen آتا ہے۔"),
    reverse("میں اچھا نہیں ہوں", ["ik ben niet goed", "ik ben geen goed", "ik nee goed"], "ik ben niet goed", "اچھا نہیں کے لیے niet۔"),
    fillGap("ik heb ___ boek", ["geen", "niet", "nee"], "geen", "کتاب اسم ہے، اس لیے geen۔"),
  );

  a0Lessons.find((lesson) => lesson.id === "a0-possessive").questions.push(
    meaning("haar boek", ["اس عورت کی کتاب", "میری کتاب", "تمہاری کتاب"], "اس عورت کی کتاب", "haar یہاں اس عورت کی چیز بتاتا ہے۔"),
    meaning("zijn huis", ["اس مرد کا گھر", "میرا گھر", "تمہارا گھر"], "اس مرد کا گھر", "zijn یہاں اس مرد کی چیز بتاتا ہے۔"),
    reverse("تمہارا نام", ["jouw naam", "mijn naam", "haar naam"], "jouw naam", "jouw = تمہارا۔"),
    reverse("اس عورت کا قلم", ["haar pen", "zijn pen", "mijn pen"], "haar pen", "haar = اس عورت کا۔"),
    fillGap("___ naam is Ali", ["mijn", "huis", "niet"], "mijn", "میرا نام = mijn naam۔")
  );

  a1Lessons.find((lesson) => lesson.id === "a1-zijn-first-sentences").questions.push(
    fillGap("ik ___ goed", ["ben", "bent", "is"], "ben", "ik کے ساتھ ben آتا ہے۔"),
    fillGap("jij ___ goed", ["bent", "ben", "is"], "bent", "jij کے ساتھ bent آتا ہے۔"),
    fillGap("zij ___ goed", ["is", "ben", "bent"], "is", "zij کے ساتھ is آتا ہے۔"),
  );

  a1Lessons.find((lesson) => lesson.id === "a1-questions").questions.push(
    fillGap("waar ___ je?", ["woon", "wie", "niet"], "woon", "waar woon je؟ = تم کہاں رہتے ہو؟"),
    fillGap("heb ___ kinderen?", ["je", "ik", "waar"], "je", "heb je...? سوال کی شکل ہے۔"),
    reverse("آپ کا نام کیا ہے؟", ["wat is uw naam?", "waar is uw naam?", "wie woon je?"], "wat is uw naam?", "wat = کیا۔"),
    reverse("آپ کہاں رہتے ہیں؟", ["waar woont u?", "wie woont u?", "wat woont u?"], "waar woont u?", "waar = کہاں۔"),
    situation("حال: کسی سے ادب سے نام پوچھنا ہے۔", ["wat is uw naam?", "ik heb kinderen", "waar is het station?"], "wat is uw naam?", "نام پوچھنے کے لیے: wat is uw naam؟")
  );

  a1Lessons.find((lesson) => lesson.id === "a1-house-food-plurals").questions.push(
    meaning("de tas", ["بیگ", "کتاب", "کمرہ"], "بیگ", "tas = بیگ۔"),
    meaning("de tassen", ["کئی بیگ", "ایک بیگ", "کئی کتابیں"], "کئی بیگ", "tassen جمع ہے۔"),
    fillGap("ik heb twee ___", ["boeken", "boek", "huis"], "boeken", "دو کتابیں = twee boeken۔"),
  );

  a2Lessons.find((lesson) => lesson.id === "a2-perfect-tense").questions.push(
    fillGap("ik heb gisteren ___", ["gewerkt", "werk", "werken"], "gewerkt", "گزرے ہوئے کام میں gewerkt آتا ہے۔"),
    fillGap("ik ben naar huis ___", ["gegaan", "gewerkt", "gaan"], "gegaan", "حرکت والے جملے میں gegaan۔"),
    reverse("میں نے فون کیا ہے", ["ik heb gebeld", "ik ben gebeld", "ik ga bellen"], "ik heb gebeld", "فون کیا ہے = heb gebeld۔"),
    situation("حال: کل ڈاکٹر کو فون کیا تھا۔", ["ik heb gisteren de dokter gebeld", "ik bel morgen de dokter", "ik ben de dokter"], "ik heb gisteren de dokter gebeld", "گزرے ہوئے کام کے لیے heb gebeld۔")
  );

  a2Lessons.find((lesson) => lesson.id === "a2-word-order-connectors").questions.push(
    fillGap("omdat ik ziek ___", ["ben", "is", "ziek"], "ben", "omdat کے بعد فعل آخر میں آتا ہے۔"),
    fillGap("vandaag ___ ik niet", ["werk", "ik", "niet"], "werk", "وقت پہلے ہو تو فعل دوسرے نمبر پر۔"),
    reverse("کیونکہ میرے پاس وقت نہیں ہے", ["omdat ik geen tijd heb", "omdat ik heb geen tijd", "ik omdat geen tijd heb"], "omdat ik geen tijd heb", "omdat کے بعد فعل آخر میں۔"),
    reverse("کل میں gemeente جاؤں گا", ["morgen ga ik naar de gemeente", "morgen ik ga naar de gemeente", "ik morgen ga gemeente"], "morgen ga ik naar de gemeente", "morgen پہلے، پھر ga۔"),
    situation("حال: آپ بتاتے ہیں کہ آپ بیمار ہیں، اس لیے نہیں آتے۔", ["ik kom niet omdat ik ziek ben", "ik kom omdat ik goed ben", "ik ben niet omdat kom"], "ik kom niet omdat ik ziek ben", "صحیح ترتیب: omdat ik ziek ben۔")
  );

  a2Lessons.find((lesson) => lesson.id === "a2-gemeente-official").questions.push(
    meaning("inschrijven", ["رجسٹر کرنا", "دستخط کرنا", "ادا کرنا"], "رجسٹر کرنا", "gemeente میں inschrijven بہت عام کام ہے۔"),
    meaning("uittreksel", ["سرکاری کاغذ", "بینک کارڈ", "دوا"], "سرکاری کاغذ", "uittreksel ایک سرکاری کاغذ ہو سکتا ہے۔"),
    meaning("identiteitsbewijs", ["شناختی کاغذ", "فارم", "رسید"], "شناختی کاغذ", "شناخت دکھانے والا کاغذ۔"),
    reverse("مجھے فارم بھرنا ہے", ["ik moet het formulier invullen", "ik ben het formulier", "ik heb geen invullen"], "ik moet het formulier invullen", "formulier invullen = فارم بھرنا۔"),
    reverse("مجھے رجسٹر کرنا ہے", ["ik moet mij inschrijven", "ik moet betalen", "ik ben ingeschreven"], "ik moet mij inschrijven", "inschrijven = رجسٹر کرنا۔"),
    situation("حال: gemeente میں مدد چاہیے۔", ["kunt u mij helpen?", "ik ben het loket", "waar is mijn kaas?"], "kunt u mij helpen?", "ادب سے مدد مانگنا: kunt u mij helpen؟")
  );

  a2Lessons.find((lesson) => lesson.id === "a2-work-school").questions.push(
    meaning("afmelden", ["نہ آنے کی اطلاع دینا", "تنخواہ لینا", "کام شروع کرنا"], "نہ آنے کی اطلاع دینا", "اسکول یا کام میں afmelden کام آتا ہے۔"),
    reverse("میرا بیٹا بیمار ہے", ["mijn zoon is ziek", "mijn zoon heeft school", "mijn zoon werkt rooster"], "mijn zoon is ziek", "اسکول پیغام کے لیے آسان جملہ۔"),
    reverse("میں آج نہیں آ سکتا", ["ik kan vandaag niet komen", "ik ben vandaag komen", "ik heb vandaag niet"], "ik kan vandaag niet komen", "نہ آ سکنے کے لیے kan niet komen۔"),
    fillGap("mijn rooster is ___", ["veranderd", "ziek", "komen"], "veranderd", "rooster بدل گیا = rooster is veranderd۔"),
    situation("حال: استاد کو بتانا ہے کہ بچہ آج نہیں آ سکتا۔", ["mijn zoon kan vandaag niet komen", "mijn zoon heeft salaris", "ik koop een kaartje"], "mijn zoon kan vandaag niet komen", "یہ اسکول کے لیے صاف پیغام ہے۔")
  );
}

addBeginnerAuditExpansion();

function addBeginnerAuditExpansion2() {
  a0Lessons.find((lesson) => lesson.id === "a0-ik-jij-u").questions.push(
    situation("حال: ڈاکٹر سے بات کرنی ہے۔", ["u", "jij", "ik"], "u", "ڈاکٹر یا دفتر میں u زیادہ محفوظ ہے۔"),
  );

  a0Lessons.find((lesson) => lesson.id === "a0-gaan-komen").questions.push(
    uitleg("gaan اور komen", [
      "gaan کا مطلب جانا ہے۔",
      "komen کا مطلب آنا ہے۔",
      "ik ga = میں جاتا/جاتی ہوں، ik kom = میں آتا/آتی ہوں۔"
    ], "حرکت کی سمت بدلنے سے لفظ بدل جاتا ہے۔"),
    fillGap("ik ___ naar huis", ["ga", "kom", "ben"], "ga", "naar huis کے ساتھ جانا = ga۔"),
    fillGap("hij ___ naar school", ["gaat", "komt", "is"], "gaat", "hij کے ساتھ gaat۔"),
    reverse("میں گھر آتا ہوں", ["ik kom naar huis", "ik ga naar huis", "ik ben huis"], "ik kom naar huis", "آنا = komen۔"),
  );

  a0Lessons.find((lesson) => lesson.id === "a0-naar-met").questions.push(
    uitleg("naar اور met", [
      "naar سمت کے لیے ہے: naar huis = گھر کی طرف۔",
      "met ساتھ کے لیے ہے: met mijn kind = میرے بچے کے ساتھ۔",
      "یہ دونوں چھوٹے لفظ جملے کا مطلب بدل دیتے ہیں۔"
    ], "سمت ہو تو naar، ساتھ ہو تو met۔"),
    fillGap("ik ga ___ huis", ["naar", "met", "in"], "naar", "گھر کی طرف = naar huis۔"),
    fillGap("ik ben ___ mijn kind", ["met", "naar", "op"], "met", "ساتھ = met۔"),
    situation("حال: آپ بچے کے ساتھ ہیں۔", ["ik ben met mijn kind", "ik ga naar mijn kind", "ik heb geen kind"], "ik ben met mijn kind", "ساتھ کے لیے met۔")
  );

  a0Lessons.find((lesson) => lesson.id === "a0-name-land-city").questions.push(
    uitleg("اپنا تعارف", [
      "mijn naam is... سے نام بتایا جاتا ہے۔",
      "ik woon in... سے رہنے کی جگہ بتائی جاتی ہے۔",
      "ik kom uit... سے اصل ملک بتایا جاتا ہے۔"
    ], "یہ تین جملے نئے سیکھنے والے کے لیے سب سے ضروری ہیں۔"),
    fillGap("mijn ___ is Ali", ["naam", "land", "woon"], "naam", "میرا نام = mijn naam۔"),
    fillGap("ik woon ___ Nederland", ["in", "uit", "naar"], "in", "رہنا: woon in۔"),
    reverse("میں پاکستان سے ہوں", ["ik kom uit Pakistan", "ik woon Pakistan", "ik ga Pakistan"], "ik kom uit Pakistan", "اصل ملک کے لیے kom uit۔")
  );

  a0Lessons.find((lesson) => lesson.id === "a0-checkpoint").questions.push(
    uitleg("مدد مانگنے والے جملے", [
      "اگر سمجھ نہ آئے تو ik begrijp het niet کہیں۔",
      "اگر کوئی تیز بولے تو langzaam alstublieft کہیں۔",
      "اگر دوبارہ سننا ہو تو kunt u herhalen? کہیں۔"
    ], "A1 سے پہلے یہ تین جملے بہت ضروری ہیں۔"),
    listenChoice("ik begrijp het niet", ["مجھے سمجھ نہیں آیا", "میں اچھا ہوں", "میرے پاس وقت ہے"], "مجھے سمجھ نہیں آیا", "یہ مدد مانگنے والا جملہ ہے۔"),
    situation("حال: کوئی بہت تیز بول رہا ہے۔", ["langzaam alstublieft", "ik heb een boek", "waar woon je?"], "langzaam alstublieft", "آہستہ بولنے کے لیے یہ کہیں۔"),
    reverse("کیا آپ دہرا سکتے ہیں؟", ["kunt u herhalen?", "kunt u betalen?", "waar woont u?"], "kunt u herhalen?", "دہرانا = herhalen۔")
  );

  a1Lessons.find((lesson) => lesson.id === "a1-zero-tiny-words").questions.push(
    uitleg("A1 شروع کرنے سے پہلے", [
      "ہر Nederlands لفظ کو پہلے آواز اور معنی سے پہچانیں۔",
      "غلطی ہونا مسئلہ نہیں؛ غلط لفظ دوبارہ مشق میں آئے گا۔",
      "شروع میں چھوٹے لفظ: ik، jij، u، ja، nee، niet سب سے ضروری ہیں۔"
    ], "یہ سبق بنیاد مضبوط کرنے کے لیے ہے۔"),
    listenChoice("jij", ["تم", "میں", "آپ"], "تم", "jij = تم۔"),
    listenChoice("u", ["آپ", "ہم", "وہ"], "آپ", "u = آپ۔"),
    fillGap("___ ben goed", ["ik", "jij", "nee"], "ik", "ik ben = میں ہوں۔")
  );

  a1Lessons.find((lesson) => lesson.id === "a1-zijn-first-sentences").questions.push(
    uitleg("zijn فعل بہت عام ہے", [
      "zijn کا مطلب ہونا ہے۔",
      "ik ben، jij bent، hij is، zij is الگ الگ شکلیں ہیں۔",
      "اردو میں فعل کم بدلتا ہے، مگر Nederlands میں شخص کے ساتھ بدلتا ہے۔"
    ], "اس سبق میں شخص اور فعل کو جوڑ کر یاد کریں۔")
  );

  a1Lessons.find((lesson) => lesson.id === "a1-greetings-personal-info").questions.push(
    uitleg("سلام اور معلومات", [
      "hallo عام سلام ہے۔",
      "mijn naam is... سے نام بتایا جاتا ہے۔",
      "adres، telefoonnummer، land فارم میں بار بار آتے ہیں۔"
    ], "یہ الفاظ فارم اور تعارف دونوں میں کام آتے ہیں۔"),
    situation("حال: کسی کو اپنا نام بتانا ہے۔", ["mijn naam is Ali", "waar is Ali?", "ik heb Ali"], "mijn naam is Ali", "نام بتانے کے لیے mijn naam is۔"),
    fillGap("mijn naam ___ Sara", ["is", "ben", "heb"], "is", "نام والے جملے میں is۔")
  );

  a1Lessons.find((lesson) => lesson.id === "a1-hebben-family").questions.push(
    uitleg("hebben کا آسان مطلب", [
      "hebben کا مطلب پاس ہونا یا رکھنا ہے۔",
      "ik heb = میرے پاس ہے۔",
      "hij heeft = اس کے پاس ہے۔"
    ], "خاندان، چیزیں، اور کاغذات کے لیے hebben بہت کام آتا ہے۔"),
    fillGap("ik ___ een broer", ["heb", "ben", "is"], "heb", "میرے پاس = ik heb۔"),
    fillGap("hij ___ kinderen", ["heeft", "heb", "bent"], "heeft", "hij کے ساتھ heeft۔"),
  );

  a1Lessons.find((lesson) => lesson.id === "a1-present-time").questions.push(
    uitleg("آج، کل، ابھی", [
      "vandaag = آج۔",
      "morgen = آنے والا کل۔",
      "gisteren = گزرا ہوا کل۔"
    ], "وقت کا لفظ معنی بھی بدلتا ہے اور کبھی ترتیب بھی بدلتا ہے۔"),
    fillGap("ik werk ___", ["vandaag", "gisteren", "nee"], "vandaag", "آج = vandaag۔"),
    reverse("میں ابھی Nederlands سیکھتا ہوں", ["ik leer nu Nederlands", "ik woon nu Nederlands", "ik drink nu Nederlands"], "ik leer nu Nederlands", "سیکھنا = leren۔")
  );

  a1Lessons.find((lesson) => lesson.id === "a1-house-food-plurals").questions.push(
    uitleg("ایک چیز اور کئی چیزیں", [
      "boek = کتاب، boeken = کتابیں۔",
      "tas = بیگ، tassen = کئی بیگ۔",
      "جمع کی شکل ہمیشہ ایک جیسی نہیں بنتی، اس لیے لفظ کے ساتھ یاد کریں۔"
    ], "پہلے معنی پہچانیں، پھر واحد/جمع دیکھیں۔")
  );

  a1Lessons.find((lesson) => lesson.id === "a1-shopping-transport").questions.push(
    uitleg("دکان اور سفر کے ضروری جملے", [
      "hoeveel kost dit? = یہ کتنے کا ہے؟",
      "waar is het station? = اسٹیشن کہاں ہے؟",
      "ik wil een kaartje = مجھے ٹکٹ چاہیے۔"
    ], "یہ جملے باہر روزمرہ میں فوراً کام آتے ہیں۔"),
    fillGap("hoeveel ___ dit?", ["kost", "woon", "heb"], "kost", "قیمت پوچھنے کے لیے kost۔"),
    situation("حال: ٹکٹ چاہیے۔", ["ik wil een kaartje", "ik heb een bon", "waar woon je?"], "ik wil een kaartje", "ٹکٹ کے لیے kaartje۔")
  );

  a1Lessons.find((lesson) => lesson.id === "a1-health-appointments").questions.push(
    uitleg("صحت کے جملے", [
      "ik ben ziek = میں بیمار ہوں۔",
      "ik heb pijn = مجھے درد ہے۔",
      "ik wil een afspraak = مجھے ملاقات کا وقت چاہیے۔"
    ], "ڈاکٹر کے لیے یہ تین جملے پہلے یاد کریں۔"),
    fillGap("ik heb ___", ["pijn", "ziek", "dokter"], "pijn", "مجھے درد ہے = ik heb pijn۔"),
    situation("حال: ڈاکٹر سے ملاقات کا وقت چاہیے۔", ["ik wil een afspraak", "ik ben een afspraak", "ik heb geen pijn"], "ik wil een afspraak", "ملاقات کا وقت = afspraak۔")
  );

  a2Lessons.find((lesson) => lesson.id === "a2-future-modal-verbs").questions.push(
    uitleg("gaan، kunnen، moeten، mogen", [
      "gaan آنے والے کام کے لیے آتا ہے: ik ga werken۔",
      "kunnen = کر سکنا، moeten = ضروری ہونا، mogen = اجازت ہونا۔",
      "ان کے بعد اصل کام والا فعل اکثر آخر میں آتا ہے۔"
    ], "معنی پہلے سمجھیں، پھر جملے کی ترتیب دیکھیں۔"),
    fillGap("ik ___ morgen werken", ["ga", "heb", "ben"], "ga", "آنے والے کام کے لیے ga۔"),
    fillGap("ik ___ de dokter bellen", ["moet", "ben", "heb"], "moet", "ضروری کام کے لیے moet۔"),
    situation("حال: اجازت پوچھنی ہے۔", ["mag ik hier parkeren?", "moet ik hier parkeren", "ik ga hier ziek"], "mag ik hier parkeren?", "اجازت کے لیے mag ik۔")
  );

  a2Lessons.find((lesson) => lesson.id === "a2-work-school").questions.push(
    uitleg("کام اور اسکول کا پیغام", [
      "اگر بچہ نہیں آ سکتا: mijn zoon kan vandaag niet komen۔",
      "rooster کام یا اسکول کے وقتوں کی فہرست ہے۔",
      "afmelden کا مطلب نہ آنے کی اطلاع دینا ہے۔"
    ], "A2 میں چھوٹے صاف پیغام سب سے اہم ہیں۔")
  );

  a2Lessons.find((lesson) => lesson.id === "a2-health-housing").questions.push(
    uitleg("صحت اور گھر کی خرابی", [
      "huisarts گھر کا ڈاکٹر ہے۔",
      "verwarming ہیٹنگ ہے، lekkage پانی کا رساؤ ہے۔",
      "mijn verwarming doet het niet = میری ہیٹنگ کام نہیں کر رہی۔"
    ], "مسئلہ صاف، چھوٹے جملے میں بتائیں۔"),
    fillGap("mijn verwarming doet het ___", ["niet", "geen", "nee"], "niet", "doet het niet = کام نہیں کر رہی۔"),
    reverse("میرے گھر میں پانی کا رساؤ ہے", ["ik heb lekkage in mijn huis", "ik ben lekkage", "ik ga lekkage"], "ik heb lekkage in mijn huis", "lekkage = پانی کا رساؤ۔"),
    situation("حال: ہیٹنگ خراب ہے۔", ["mijn verwarming doet het niet", "ik heb een afspraak", "waar is de kassa?"], "mijn verwarming doet het niet", "خرابی بتانے والا جملہ۔")
  );

  a2Lessons.find((lesson) => lesson.id === "a2-shopping-services").questions.push(
    uitleg("شکایت اور چیز بدلنا", [
      "klacht = شکایت۔",
      "garantie = گارنٹی۔",
      "ik wil hem ruilen = میں اسے بدلنا چاہتا ہوں۔"
    ], "رسید، گارنٹی، اور مسئلہ ساتھ بتانا مفید ہے۔"),
    fillGap("ik wil hem ___", ["ruilen", "betalen", "parkeren"], "ruilen", "بدلنا = ruilen۔"),
    reverse("میرے پاس رسید ہے", ["ik heb de bon", "ik ben de bon", "ik wil de bon"], "ik heb de bon", "bon = رسید۔"),
    situation("حال: جیکٹ خراب ہے اور بدلنی ہے۔", ["ik wil hem ruilen", "ik wil hem leren", "ik ben kapot"], "ik wil hem ruilen", "بدلنے کے لیے ruilen۔")
  );

  a2Lessons.find((lesson) => lesson.id === "a2-writing-messages").questions.push(
    uitleg("چھوٹا پیغام لکھنا", [
      "رسمی پیغام beste meneer یا beste dokter سے شروع ہو سکتا ہے۔",
      "آخر میں met vriendelijke groet لکھا جا سکتا ہے۔",
      "درمیان میں اصل بات ایک صاف جملے میں لکھیں۔"
    ], "لمبا پیغام ضروری نہیں؛ صاف اور ادب والا پیغام کافی ہے۔"),
    fillGap("met vriendelijke ___", ["groet", "dokter", "afspraak"], "groet", "رسمی اختتام: met vriendelijke groet۔"),
    situation("حال: رسمی پیغام ختم کرنا ہے۔", ["met vriendelijke groet", "hoi Ahmed", "kom je ook?"], "met vriendelijke groet", "رسمی اختتام یہی ہے۔")
  );

  a2Lessons.find((lesson) => lesson.id === "a2-strong-combined").questions.push(
    uitleg("A2 مشترک جملے", [
      "اس سبق میں کئی اصول ایک ساتھ آتے ہیں۔",
      "پہلے معنی پہچانیں، پھر فعل کی جگہ دیکھیں۔",
      "اگر جملہ لمبا لگے تو اسے دو حصوں میں پڑھیں۔"
    ], "یہ آخری مضبوط دہرائی ہے، نئی چیز نہیں۔"),
    fillGap("ik moet rust ___", ["nemen", "komen", "zeggen"], "nemen", "آرام کرنا = rust nemen۔"),
    reverse("کیونکہ مجھے درد تھا", ["omdat ik pijn had", "omdat ik had pijn", "dat ik pijn"], "omdat ik pijn had", "omdat کے بعد فعل آخر میں۔")
  );
}

addBeginnerAuditExpansion2();

function topUpLessonsToTwenty(lessons) {
  for (const lesson of lessons) {
    let guard = 0;
    while (lesson.questions.length < 20 && guard < 80) {
      const question = makeRevisionQuestion(lesson, lesson.questions.length + guard);
      if (question) lesson.questions.push(question);
      guard += 1;
    }
  }
}

topUpLessonsToTwenty(a0Lessons);
topUpLessonsToTwenty(a1Lessons);
topUpLessonsToTwenty(a2Lessons);

const a0Subchapters = [
  {
    id: "a0-letters-sounds",
    title: "حروف اور آوازیں",
    goal: "Nederlands حروف پہچاننا، آواز سننا، اور آسان الفاظ پڑھنا۔",
    practice: "حروف سنیں، پہچانیں، اور مثال والے لفظ سے ملائیں۔",
    lessonIds: ["a0-letters-1", "a0-letters-2", "a0-letters-3"]
  },
  {
    id: "a0-first-words",
    title: "پہلے الفاظ",
    goal: "سب سے بنیادی الفاظ: میں، تم، آپ، ہاں، نہیں، اچھا۔",
    practice: "چھوٹے الفاظ کو بار بار پہچانیں۔",
    lessonIds: ["a0-ik-jij-u", "a0-ja-nee-goed-niet"]
  },
  {
    id: "a0-people-things",
    title: "لوگ اور چیزیں",
    goal: "شخص اور چیز کے naamwoorden سمجھنا۔",
    practice: "man, vrouw, kind, boek, pen, huis جیسے الفاظ جملے میں دیکھیں۔",
    lessonIds: ["a0-people-nouns", "a0-things-nouns"]
  },
  {
    id: "a0-tiny-grammar",
    title: "چھوٹی گرامر",
    goal: "een, de, het اور ben/bent/is کو بہت آہستہ سمجھنا۔",
    practice: "دو یا تین الفاظ ملا کر چھوٹے جملے بنائیں۔",
    lessonIds: ["a0-een-de-het", "a0-ben-bent-is", "a0-first-sentences", "a0-hij-zij-wij"]
  },
  {
    id: "a0-place-movement",
    title: "جگہ اور حرکت",
    goal: "کہاں؟ کہاں جانا؟ in, op, onder, naar, met استعمال کرنا۔",
    practice: "جگہ والے الفاظ اور حرکت والے فعل کو چھوٹے فقروں میں لگائیں۔",
    lessonIds: ["a0-place-1", "a0-place-2", "a0-gaan-komen", "a0-naar-met"]
  },
  {
    id: "a0-my-first-sentences",
    title: "میرے پہلے جملے",
    goal: "اپنے بارے میں سب سے پہلی Nederlands باتیں کہنا۔",
    practice: "ik ben, ik heb, ik woon, ik begrijp het niet جیسے جملے۔",
    lessonIds: ["a0-hebben-1", "a0-geen", "a0-possessive", "a0-name-land-city", "a0-checkpoint"]
  }
];

const a1Subchapters = [
  {
    id: "a1-personal-info",
    title: "میری معلومات",
    goal: "اپنا نام، پتہ، فون نمبر، ملک اور آسان تعارف دینا۔",
    practice: "فارم والے الفاظ اور چھوٹے تعارف والے جملے۔",
    lessonIds: ["a1-zero-tiny-words", "a1-zijn-first-sentences", "a1-greetings-personal-info"]
  },
  {
    id: "a1-family-people",
    title: "خاندان اور لوگ",
    goal: "خاندان، لوگ، اور بنیادی تفصیل کے الفاظ استعمال کرنا۔",
    practice: "dit is mijn..., ik heb..., hij/zij is... جیسے جملے۔",
    lessonIds: ["a1-people-family-articles", "a1-hebben-family"]
  },
  {
    id: "a1-daily-routine",
    title: "روزمرہ معمول",
    goal: "آج، کل، وقت، کام، اسکول اور آسان معمول بتانا۔",
    practice: "فاعل + فعل + باقی حصہ اور وقت والے الفاظ کے ساتھ جملہ بنانا۔",
    lessonIds: ["a1-present-time"]
  },
  {
    id: "a1-questions-help",
    title: "سوال اور مدد",
    goal: "آسان سوالات پوچھنا اور مدد/دہرانا مانگنا۔",
    practice: "waar, wat, wie, hoeveel اور ہاں/نہیں سوالات۔",
    lessonIds: ["a1-questions"]
  },
  {
    id: "a1-home-objects",
    title: "گھر اور چیزیں",
    goal: "گھر، کمرہ، فرنیچر، اور چیز کہاں ہے بتانا۔",
    practice: "het boek is in huis جیسے جگہ جملے۔",
    lessonIds: ["a1-house-food-plurals"]
  },
  {
    id: "a1-food-shopping",
    title: "کھانا اور خریداری",
    goal: "بنیادی کھانا، قیمتیں، خریدنا، اور قیمت پوچھنا۔",
    practice: "ik wil..., hoeveel kost...? جیسے روزمرہ فقرے۔",
    lessonIds: ["a1-shopping-transport"]
  },
  {
    id: "a1-going-out-transport",
    title: "باہر جانا اور سفر",
    goal: "station، bus، trein، ٹکٹ، کہیں جانا۔",
    practice: "ik ga naar het station جیسے حرکت جملے۔",
    lessonIds: ["a1-shopping-transport"]
  },
  {
    id: "a1-body-health",
    title: "جسم اور صحت",
    goal: "جسم/صحت کے الفاظ، درد، بیماری، ڈاکٹر سے ملاقات کا وقت۔",
    practice: "ik ben ziek، ik wil een afspraak maken، mijn hoofd doet pijn۔",
    lessonIds: ["a1-health-appointments"]
  }
];

const a2Subchapters = [
  {
    id: "a2-past-plans",
    title: "گزرا وقت اور منصوبے",
    goal: "کیا ہوا، کیا ہونے والا ہے، اور آسان منصوبہ بندی۔",
    practice: "گزرے ہوئے کام کا زمانہ، gaan سے آنے والا کام، معاون فعل۔",
    lessonIds: ["a2-perfect-tense", "a2-future-modal-verbs"]
  },
  {
    id: "a2-routine-word-order",
    title: "معمول اور لفظوں کی ترتیب",
    goal: "روزمرہ کام، الگ ہونے والے فعل، omdat/als والے جملے۔",
    practice: "opstaan, invullen, omdat, dat, als۔",
    lessonIds: ["a2-separable-verbs-routine", "a2-word-order-connectors"]
  },
  {
    id: "a2-gemeente-forms",
    title: "Gemeente اور فارم",
    goal: "gemeente، BSN، afspraak، formulier، کاغذات سمجھنا۔",
    practice: "معلومات پوچھنا، فارم کی زبان، سرکاری ملاقات کا وقت۔",
    lessonIds: ["a2-gemeente-official"]
  },
  {
    id: "a2-work-school",
    title: "کام اور اسکول",
    goal: "کام/اسکول کے پیغام، غیر حاضری، collega/docent، وقتوں کی فہرست۔",
    practice: "mijn zoon kan vandaag niet komen جیسے پیغام۔",
    lessonIds: ["a2-work-school"]
  },
  {
    id: "a2-health-doctor",
    title: "صحت اور ڈاکٹر",
    goal: "شکایت سمجھانا، ڈاکٹر کا مشورہ سمجھنا۔",
    practice: "ik heb pijn..., de dokter heeft gezegd...۔",
    lessonIds: ["a2-health-housing", "a2-strong-combined"]
  },
  {
    id: "a2-housing-problems",
    title: "گھر کے مسئلے",
    goal: "کرایہ، ہیٹنگ، پانی کا رساؤ، مرمت، مالک مکان کے مسئلے۔",
    practice: "mijn verwarming doet het niet، kunt u iemand sturen؟",
    lessonIds: ["a2-health-housing"]
  },
  {
    id: "a2-shopping-complaints",
    title: "خریداری اور شکایت",
    goal: "ruilen، garantie، kapot، klacht، aanbieding۔",
    practice: "ik wil hem ruilen، hij is kapot۔",
    lessonIds: ["a2-shopping-services"]
  },
  {
    id: "a2-messages-emails",
    title: "چھوٹے پیغام",
    goal: "ادب والے/بے تکلف پیغام، دعوت، شکایت، ادب والا اختتام۔",
    practice: "beste..., met vriendelijke groet, kom je ook؟",
    lessonIds: ["a2-writing-messages"]
  }
];

window.NEDERURDU_CHAPTERS = [
  {
    id: "a0",
    title: "باب A0",
    subtitle: "حروف، الفاظ، چھوٹی گرامر، اور پہلے Nederlands جملے",
    lessons: a0Lessons,
    subchapters: a0Subchapters
  },
  {
    id: "a1",
    title: "باب A1",
    subtitle: "روزمرہ حالات میں آسان بات چیت",
    lessons: a1Lessons,
    subchapters: a1Subchapters
  },
  {
    id: "a2",
    title: "باب A2",
    subtitle: "روزمرہ Nederlands اور inburgering کے عملی حالات",
    lessons: a2Lessons,
    subchapters: a2Subchapters
  }
];

window.NEDERURDU_LESSONS = a0Lessons;
