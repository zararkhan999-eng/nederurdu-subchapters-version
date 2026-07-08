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
  visualId: visual,
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
  speak: completeGapSentence(sentence, answer),
  options: cleanFillOptions(options, answer),
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

function extractDutchWords(text) {
  return String(text || "").match(/[A-Za-zÀ-ÿ]+/g) || [];
}

function isCleanDutchWord(word) {
  return /^[A-Za-zÀ-ÿ0-9-]+$/.test(String(word || ""));
}

function cleanFillOptions(options, answer) {
  const cleanAnswer = String(answer || "").trim();
  const cleaned = uniq([cleanAnswer, ...(options || [])]
    .map((option) => String(option || "").trim())
    .filter((option) => option && option !== "___" && isCleanDutchWord(option)));
  return cleaned.includes(cleanAnswer) ? cleaned : [cleanAnswer, ...cleaned].filter(isCleanDutchWord);
}

function completeGapSentence(sentence, answer) {
  const prompt = String(sentence || "");
  if (!prompt.includes("___")) return prompt;
  return prompt.replace("___", String(answer || "").trim()).replace(/\s+/g, " ").trim();
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

function simpleFillSentenceForWord(word) {
  const answer = String(word || "").trim().toLowerCase();
  const oneLetter = /^[a-z]$/.test(answer);
  const pronounFrames = {
    ik: "___ ben hier",
    jij: "___ bent hier",
    je: "___ bent hier",
    u: "___ bent hier",
    hij: "___ is hier",
    zij: "___ is hier",
    wij: "___ zijn hier",
    we: "___ zijn hier"
  };
  const verbFrames = {
    ben: "ik ___ hier",
    bent: "jij ___ hier",
    is: "hij ___ hier",
    zijn: "wij ___ hier",
    heb: "ik ___ een boek",
    hebt: "jij ___ een boek",
    heeft: "hij ___ een boek",
    woon: "ik ___ hier",
    woont: "hij ___ hier",
    ga: "ik ___ naar huis",
    gaat: "hij ___ naar huis",
    kom: "ik ___ morgen",
    komt: "hij ___ morgen",
    wil: "ik ___ water",
    moet: "ik ___ bellen",
    kan: "ik ___ komen"
  };
  const prepositionFrames = {
    in: "ik woon ___ Nederland",
    op: "het boek ligt ___ tafel",
    onder: "de tas ligt ___ tafel",
    naast: "ik sta ___ de deur",
    voor: "ik sta ___ het huis",
    achter: "ik sta ___ het huis",
    bij: "ik ben ___ de dokter",
    naar: "ik ga ___ huis",
    met: "ik kom ___ mijn kind",
    om: "ik kom ___ tien uur"
  };
  const shortFrames = {
    ja: "antwoord: ___",
    nee: "antwoord: ___",
    goed: "het gaat ___",
    niet: "ik kom ___",
    geen: "ik heb ___ boek",
    de: "___ man",
    het: "___ boek",
    een: "___ boek",
    mijn: "___ naam is Ali",
    jouw: "___ naam is Sara",
    zijn: "___ boek is hier",
    haar: "___ boek is hier",
    uw: "___ naam graag"
  };
  if (oneLetter) return "letter ___";
  return pronounFrames[answer]
    || verbFrames[answer]
    || prepositionFrames[answer]
    || shortFrames[answer]
    || "dit is ___";
}

function singleWordFillGap(word) {
  const answer = cleanDutchWord(word);
  if (!isCleanDutchWord(answer)) return null;
  return { prompt: simpleFillSentenceForWord(answer), missing: answer };
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

const dailyConcept = (id, dutch, urdu, visualId = "", role = "word") => ({
  id,
  dutch,
  urdu,
  audio: dutch,
  visualId,
  distractorGroup: id.split("-")[0],
  role
});

const dailyFill = ([prompt, options, answer, explain]) => fillGap(prompt, options, answer, explain);
const dailySituation = ([prompt, options, answer, explain, details = {}]) => ({
  ...situation(prompt, options, answer, explain),
  ...details
});
const dailyBuild = ([prompt, tiles, answer, explain]) => build(prompt, tiles, answer, explain);

function dailyOptions(concepts, index, key) {
  const answer = concepts[index % concepts.length][key];
  const alternatives = concepts.map((concept) => concept[key]).filter((value) => value !== answer);
  return [answer, ...rotate(alternatives, index + 1).slice(0, 2)];
}

function makeA0DailyLesson({ id, unit, title, description, explanation, concepts, fills, situations, builds, listenReplies = [] }) {
  const visualConcepts = concepts.filter((concept) => concept.visualId && concept.role !== "phrase");
  const questions = explanation ? [
    uitleg(explanation.title, explanation.points, explanation.note)
  ] : [];

  for (let index = 0; index < 10; index += 1) {
    const concept = concepts[index % concepts.length];
    questions.push(meaning(
      concept.dutch,
      dailyOptions(concepts, index, "urdu"),
      concept.urdu,
      `${concept.dutch} = ${concept.urdu}۔`
    ));
  }

  for (let index = 0; index < 8; index += 1) {
    const concept = concepts[(index + 2) % concepts.length];
    questions.push(reverse(
      concept.urdu,
      dailyOptions(concepts, index + 2, "dutch"),
      concept.dutch,
      `${concept.urdu} = ${concept.dutch}۔`
    ));
  }
  for (let index = 0; index < 10; index += 1) {
    if (!visualConcepts.length) break;
    const concept = visualConcepts[index % visualConcepts.length];
    const options = dailyOptions(visualConcepts, index, "dutch");
    questions.push({
      type: "image-choice",
      label: "تصویر دیکھ کر صحیح Nederlands لفظ منتخب کریں",
      prompt: "تصویر دیکھیں اور صحیح لفظ چنیں۔",
      visualId: concept.visualId,
      options,
      answer: concept.dutch,
      explain: `تصویر میں ${concept.urdu} ہے: ${concept.dutch}۔`
    });
  }
  for (let index = 0; index < 10; index += 1) {
    const concept = concepts[(index + 1) % concepts.length];
    questions.push({
      ...listenChoice(
        concept.audio,
        dailyOptions(concepts, index + 1, "urdu"),
        concept.urdu,
        `${concept.dutch} = ${concept.urdu}۔`
      ),
      conceptId: concept.id
    });
  }

  const listeningIndexes = questions
    .map((question, index) => question.type === "listen-choice" ? index : -1)
    .filter((index) => index >= 0);
  listenReplies.slice(0, listeningIndexes.length).forEach((reply, index) => {
    const [speak, options, answer, explain] = reply;
    questions[listeningIndexes[index]] = {
      ...listenChoice(speak, options, answer, explain),
      prompt: "بات سنیں اور مناسب جواب منتخب کریں۔",
      mode: "listen-reply"
    };
  });

  questions.push(...fills.map(dailyFill));
  questions.push(...situations.map(dailySituation));
  questions.push(...builds.map(dailyBuild));

  return { id, unit, title, description, xp: 0, concepts, questions };
}

const a0DailyLessons = [
  makeA0DailyLesson({
    id: "a0-greetings-courtesy",
    unit: "A0: سلام اور ادب",
    title: "Hallo en dank u",
    description: "سلام، شکریہ، معافی، اور ادب سے بات شروع یا ختم کرنا۔",
    explanation: {
      title: "روزمرہ سلام کے تیار جملے",
      points: [
        "hallo عام سلام ہے، اور goedemorgen صبح کے وقت کہا جاتا ہے۔",
        "dank u wel ادب سے شکریہ، اور alstublieft برائے مہربانی یا لیجیے کے لیے آتا ہے۔",
        "ان فقروں کو ابھی پورا یاد کریں؛ ان کی گرامر بعد میں آئے گی۔"
      ],
      note: "پہلے سنیں، پھر پورا فقرہ ایک ساتھ پہچانیں۔"
    },
    concepts: [
      dailyConcept("greet-hallo", "hallo", "سلام", "greeting"),
      dailyConcept("greet-morning", "goedemorgen", "صبح بخیر", "goedemorgen"),
      dailyConcept("greet-afternoon", "goedemiddag", "دوپہر بخیر", "goedemiddag"),
      dailyConcept("greet-evening", "goedenavond", "شام بخیر", "goedenavond"),
      dailyConcept("greet-day", "dag", "سلام / خدا حافظ", "greeting"),
      dailyConcept("greet-goodbye", "tot ziens", "پھر ملیں گے", "tot-ziens", "phrase"),
      dailyConcept("courtesy-thanks", "dank u wel", "آپ کا شکریہ", "thanks", "phrase"),
      dailyConcept("courtesy-please", "alstublieft", "برائے مہربانی / لیجیے", "alstublieft"),
      dailyConcept("courtesy-sorry", "sorry", "معاف کیجیے", "sorry"),
      dailyConcept("courtesy-gladly", "graag", "خوشی سے / پسند سے", "graag"),
      dailyConcept("greet-how", "hoe gaat het?", "آپ کیسے ہیں؟", "", "phrase"),
      dailyConcept("greet-answer", "goed, dank u", "اچھا ہوں، شکریہ", "", "phrase")
    ],
    fills: [
      ["___, hoe gaat het?", ["hallo", "sorry", "dag"], "hallo", "بات شروع کرنے کے لیے hallo۔"],
      ["goed___", ["morgen", "avond", "dag"], "morgen", "صبح بخیر = goedemorgen۔"],
      ["dank u ___", ["wel", "dag", "graag"], "wel", "شکریہ کا پورا فقرہ dank u wel ہے۔"],
      ["tot ___", ["ziens", "morgen", "graag"], "ziens", "پھر ملیں گے = tot ziens۔"],
      ["___, mag ik iets vragen?", ["sorry", "dag", "goed"], "sorry", "ادب سے توجہ لینے کے لیے sorry۔"],
      ["koffie, ___", ["graag", "ziens", "avond"], "graag", "پسند یا درخواست کے لیے graag۔"],
      ["goed, dank ___", ["u", "ik", "jij"], "u", "ادب والا جواب: goed, dank u۔"],
      ["___ betekent ook: لیجیے", ["alstublieft", "goedemorgen", "sorry"], "alstublieft", "کسی چیز کو دیتے وقت alstublieft کہا جاتا ہے۔"]
    ],
    situations: [
      ["حال: صبح کسی پڑوسی سے ملے۔", ["goedemorgen", "goedenavond", "tot ziens"], "goedemorgen", "صبح سلام کے لیے goedemorgen۔"],
      ["حال: کسی نے آپ کی مدد کی۔", ["dank u wel", "sorry", "dag"], "dank u wel", "مدد کے بعد شکریہ کہیں۔"],
      ["حال: کسی سے ادب سے چیز مانگنی ہے۔", ["alstublieft", "tot ziens", "goedemiddag"], "alstublieft", "ادب والی درخواست میں alstublieft۔"],
      ["حال: غلطی سے کسی سے ٹکرا گئے۔", ["sorry", "graag", "hallo"], "sorry", "معافی کے لیے sorry۔"],
      ["حال: شام کو کسی سے ملے۔", ["goedenavond", "goedemorgen", "dag"], "goedenavond", "شام کے سلام کے لیے goedenavond۔"],
      ["حال: ملاقات ختم ہو رہی ہے۔", ["tot ziens", "hoe gaat het?", "alstublieft"], "tot ziens", "رخصت ہوتے وقت tot ziens۔"],
      ["حال: کوئی پوچھتا ہے hoe gaat het?", ["goed, dank u", "tot ziens", "sorry"], "goed, dank u", "مختصر ادب والا جواب یہی ہے۔"],
      ["حال: آپ کافی لینا چاہتے ہیں۔", ["koffie, graag", "koffie, sorry", "tot koffie"], "koffie, graag", "درخواست میں graag لگائیں۔"],
      ["حال: عام سلام کہنا ہے۔", ["hallo", "dank u wel", "tot ziens"], "hallo", "عام سلام = hallo۔"]
    ],
    builds: [
      ["آپ کا شکریہ", ["dank", "u", "wel"], "dank u wel", "شکریہ کا پورا فقرہ بنائیں۔"],
      ["پھر ملیں گے", ["tot", "ziens"], "tot ziens", "رخصت والا فقرہ۔"],
      ["آپ کیسے ہیں؟", ["hoe", "gaat", "het"], "hoe gaat het", "یہ تیار سوال ایک ساتھ یاد کریں۔"],
      ["اچھا ہوں، شکریہ", ["goed", "dank", "u"], "goed dank u", "مختصر جواب کی ترتیب۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-understanding-help",
    unit: "A0: سمجھ اور مدد",
    title: "Ik begrijp het niet",
    description: "سمجھ نہ آنے، دوبارہ سننے، اور مدد مانگنے کے ضروری جملے۔",
    explanation: {
      title: "گرامر نہیں، پورا مدد والا فقرہ",
      points: [
        "ik begrijp het niet کا مطلب ہے: مجھے سمجھ نہیں آیا۔",
        "kunt u herhalen? سے ادب کے ساتھ دوبارہ کہنے کو کہا جاتا ہے۔",
        "langzamer alstublieft سے آہستہ بولنے کی درخواست کی جاتی ہے۔"
      ],
      note: "مشکل وقت میں پورا فقرہ یاد آنا کافی ہے۔"
    },
    concepts: [
      dailyConcept("help-not-understand", "ik begrijp het niet", "مجھے سمجھ نہیں آیا", "begrijpen", "phrase"),
      dailyConcept("help-repeat", "kunt u herhalen?", "کیا آپ دہرا سکتے ہیں؟", "herhalen", "phrase"),
      dailyConcept("help-slower", "langzamer alstublieft", "آہستہ بولیں، برائے مہربانی", "langzaam", "phrase"),
      dailyConcept("help-again", "nog een keer", "ایک بار پھر", "nog-een-keer", "phrase"),
      dailyConcept("help-me", "kunt u mij helpen?", "کیا آپ میری مدد کر سکتے ہیں؟", "helpen", "phrase"),
      dailyConcept("help-meaning", "wat betekent dit?", "اس کا کیا مطلب ہے؟", "vraag", "phrase"),
      dailyConcept("help-little-dutch", "ik spreek een beetje Nederlands", "میں تھوڑی Nederlands بولتا/بولتی ہوں", "spreken", "phrase"),
      dailyConcept("help-do-not-know", "ik weet het niet", "مجھے معلوم نہیں", "begrijpen", "phrase"),
      dailyConcept("help-listen", "luister alstublieft", "سنیں، برائے مہربانی", "luisteren", "phrase"),
      dailyConcept("help-say-again", "zeg het nog een keer", "اسے ایک بار پھر کہیں", "nog-een-keer", "phrase"),
      dailyConcept("help-understand-me", "begrijpt u mij?", "کیا آپ مجھے سمجھتے ہیں؟", "spreken", "phrase"),
      dailyConcept("help-understood", "ja, ik begrijp het", "ہاں، میں سمجھ گیا/گئی", "begrijpen", "phrase")
    ],
    fills: [
      ["ik begrijp het ___", ["niet", "geen", "nee"], "niet", "سمجھ نہیں آیا = begrijp het niet۔"],
      ["kunt u ___?", ["herhalen", "betalen", "wonen"], "herhalen", "دوبارہ کہنا = herhalen۔"],
      ["___ alstublieft", ["langzamer", "gisteren", "achter"], "langzamer", "آہستہ بولنے کے لیے langzamer۔"],
      ["nog een ___", ["keer", "boek", "huis"], "keer", "ایک بار پھر = nog een keer۔"],
      ["kunt u mij ___?", ["helpen", "slapen", "drinken"], "helpen", "مدد کرنا = helpen۔"],
      ["wat ___ dit?", ["betekent", "woont", "heeft"], "betekent", "معنی پوچھنے کے لیے betekent۔"],
      ["ik spreek een ___ Nederlands", ["beetje", "keer", "nummer"], "beetje", "تھوڑی = een beetje۔"],
      ["ik weet het ___", ["niet", "wel", "graag"], "niet", "مجھے معلوم نہیں = ik weet het niet۔"]
    ],
    situations: [
      ["حال: آپ کو بات سمجھ نہیں آئی۔", ["ik begrijp het niet", "ik woon hier", "dank u wel"], "ik begrijp het niet", "سمجھ نہ آنے کا سیدھا فقرہ۔"],
      ["حال: جملہ دوبارہ سننا ہے۔", ["kunt u herhalen?", "hoe gaat het?", "waar woont u?"], "kunt u herhalen?", "دوبارہ کہنے کے لیے herhalen۔"],
      ["حال: سامنے والا بہت تیز بول رہا ہے۔", ["langzamer alstublieft", "tot ziens", "ik ben goed"], "langzamer alstublieft", "آہستہ بولنے کی درخواست۔"],
      ["حال: کسی کام میں مدد چاہیے۔", ["kunt u mij helpen?", "kunt u betalen?", "ik heb geen hulp"], "kunt u mij helpen?", "ادب سے مدد مانگیں۔"],
      ["حال: ایک لفظ کا مطلب پوچھنا ہے۔", ["wat betekent dit?", "waar is dit?", "wie bent dit?"], "wat betekent dit?", "معنی کے لیے wat betekent dit?۔"],
      ["حال: کہنا ہے کہ آپ تھوڑی Nederlands بولتے ہیں۔", ["ik spreek een beetje Nederlands", "ik begrijp geen Nederlands", "ik ben Nederlands"], "ik spreek een beetje Nederlands", "تھوڑی زبان بولنے کا تیار فقرہ۔"],
      ["حال: جواب معلوم نہیں۔", ["ik weet het niet", "ik heb het niet", "ik ben het niet"], "ik weet het niet", "معلوم نہ ہونے کے لیے weet het niet۔"],
      ["حال: ایک بار پھر سننا ہے۔", ["nog een keer", "tot een keer", "geen keer"], "nog een keer", "ایک بار پھر = nog een keer۔"],
      ["حال: اب بات سمجھ آ گئی۔", ["ja, ik begrijp het", "nee, ik woon hier", "sorry, tot ziens"], "ja, ik begrijp het", "سمجھ آنے کی تصدیق۔"]
    ],
    builds: [
      ["مجھے سمجھ نہیں آیا", ["ik", "begrijp", "het", "niet"], "ik begrijp het niet", "پورا مدد والا فقرہ۔"],
      ["کیا آپ دہرا سکتے ہیں؟", ["kunt", "u", "herhalen"], "kunt u herhalen", "ادب والا سوال۔"],
      ["کیا آپ میری مدد کر سکتے ہیں؟", ["kunt", "u", "mij", "helpen"], "kunt u mij helpen", "مدد مانگنے کا فقرہ۔"],
      ["اس کا کیا مطلب ہے؟", ["wat", "betekent", "dit"], "wat betekent dit", "معنی پوچھنے کی ترتیب۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-dit-dat-questions",
    unit: "A0: اشارہ اور سوال",
    title: "Dit, dat en vragen",
    description: "یہ، وہ، یہاں، وہاں، اور سب سے پہلے سوال والے الفاظ۔",
    explanation: {
      title: "اشارہ اور چھوٹا سوال",
      points: [
        "dit قریب کی چیز کے لیے یہ، اور dat دور کی چیز کے لیے وہ ہے۔",
        "hier کا مطلب یہاں، اور daar کا مطلب وہاں ہے۔",
        "wie، wat، waar، hoe سے شخص، چیز، جگہ، یا طریقہ پوچھا جاتا ہے۔"
      ],
      note: "پہلے سوال والے لفظ کا مطلب پہچانیں۔"
    },
    concepts: [
      dailyConcept("point-this", "dit", "یہ", "dit"),
      dailyConcept("point-that", "dat", "وہ", "dat"),
      dailyConcept("place-here", "hier", "یہاں", "hier"),
      dailyConcept("place-there", "daar", "وہاں", "daar"),
      dailyConcept("question-who", "wie", "کون", "vraag"),
      dailyConcept("question-what", "wat", "کیا", "vraag"),
      dailyConcept("question-where", "waar", "کہاں", "vraag"),
      dailyConcept("question-how", "hoe", "کیسے", "vraag"),
      dailyConcept("question-what-this", "wat is dit?", "یہ کیا ہے؟", "dit", "phrase"),
      dailyConcept("question-toilet", "waar is het toilet?", "ٹوائلٹ کہاں ہے؟", "toilet", "phrase"),
      dailyConcept("point-book", "dit is een boek", "یہ ایک کتاب ہے", "boek", "phrase"),
      dailyConcept("point-house", "dat is mijn huis", "وہ میرا گھر ہے", "huis", "phrase")
    ],
    fills: [
      ["wat is ___?", ["dit", "wie", "hoe"], "dit", "یہ کیا ہے؟ = wat is dit?۔"],
      ["___ is het toilet?", ["waar", "wie", "wat"], "waar", "جگہ پوچھنے کے لیے waar۔"],
      ["___ is dat?", ["wie", "waar", "hoe"], "wie", "شخص پوچھنے کے لیے wie۔"],
      ["___ gaat het?", ["hoe", "wat", "waar"], "hoe", "کیسے = hoe۔"],
      ["dit is ___ boek", ["een", "waar", "daar"], "een", "یہ ایک کتاب ہے۔"],
      ["dat is ___ huis", ["mijn", "dit", "hoe"], "mijn", "وہ میرا گھر ہے۔"],
      ["ik woon ___", ["hier", "wie", "wat"], "hier", "میں یہاں رہتا ہوں = ik woon hier۔"],
      ["het station is ___", ["daar", "dat", "wie"], "daar", "اسٹیشن وہاں ہے = daar۔"]
    ],
    situations: [
      ["حال: قریب کی کتاب کی طرف اشارہ کرنا ہے۔", ["dit is een boek", "dat is mijn huis", "waar is dit?"], "dit is een boek", "قریب کی چیز کے لیے dit۔"],
      ["حال: دور اپنا گھر دکھانا ہے۔", ["dat is mijn huis", "dit is een boek", "ik ben huis"], "dat is mijn huis", "دور کی چیز کے لیے dat۔"],
      ["حال: ٹوائلٹ تلاش کرنا ہے۔", ["waar is het toilet?", "wat is het toilet?", "wie is het toilet?"], "waar is het toilet?", "جگہ پوچھنے کے لیے waar۔"],
      ["حال: کوئی نامعلوم چیز سامنے ہے۔", ["wat is dit?", "wie is dit?", "hoe is daar?"], "wat is dit?", "چیز پوچھنے کے لیے wat۔"],
      ["حال: کسی شخص کے بارے میں پوچھنا ہے۔", ["wie is dat?", "waar is dat?", "wat woont daar?"], "wie is dat?", "شخص کے لیے wie۔"],
      ["حال: کہنا ہے کہ آپ یہاں رہتے ہیں۔", ["ik woon hier", "ik woon wie", "ik ben daar huis"], "ik woon hier", "یہاں = hier۔"],
      ["حال: اسٹیشن دور دکھائی دے رہا ہے۔", ["het station is daar", "het station is wie", "dit station waar"], "het station is daar", "وہاں = daar۔"],
      ["حال: کسی کا حال پوچھنا ہے۔", ["hoe gaat het?", "waar gaat het?", "wat is toilet?"], "hoe gaat het?", "کیسے کے لیے hoe۔"],
      ["حال: جگہ کا سوال ہے۔", ["waar?", "wie?", "hoe?"], "waar?", "کہاں = waar۔"]
    ],
    builds: [
      ["یہ کیا ہے؟", ["wat", "is", "dit"], "wat is dit", "چیز کے سوال کی ترتیب۔"],
      ["ٹوائلٹ کہاں ہے؟", ["waar", "is", "het", "toilet"], "waar is het toilet", "جگہ والا سوال۔"],
      ["یہ ایک کتاب ہے", ["dit", "is", "een", "boek"], "dit is een boek", "قریب کی چیز کے لیے dit۔"],
      ["وہ میرا گھر ہے", ["dat", "is", "mijn", "huis"], "dat is mijn huis", "دور کی چیز کے لیے dat۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-numbers-0-10",
    unit: "A0: اعداد 1",
    title: "Getallen 0–10",
    description: "صفر سے دس تک اعداد سننا، پہچاننا، اور روزمرہ میں استعمال کرنا۔",
    explanation: {
      title: "عدد کو آواز اور شکل سے ملائیں",
      points: [
        "ہر عدد کو پہلے سنیں، پھر اس کی شکل اور Nederlands لفظ پہچانیں۔",
        "nul صفر ہے، een ایک ہے، اور tien دس ہے۔",
        "ابھی ہجے لکھنا ضروری نہیں؛ صحیح عدد پہچاننا ضروری ہے۔"
      ],
      note: "0 سے 10 تک آواز کو بار بار سنیں۔"
    },
    concepts: [
      dailyConcept("number-0", "nul", "صفر", "number-0"),
      dailyConcept("number-1", "een", "ایک", "number-1"),
      dailyConcept("number-2", "twee", "دو", "number-2"),
      dailyConcept("number-3", "drie", "تین", "number-3"),
      dailyConcept("number-4", "vier", "چار", "number-4"),
      dailyConcept("number-5", "vijf", "پانچ", "number-5"),
      dailyConcept("number-6", "zes", "چھ", "number-6"),
      dailyConcept("number-7", "zeven", "سات", "number-7"),
      dailyConcept("number-8", "acht", "آٹھ", "number-8"),
      dailyConcept("number-9", "negen", "نو", "number-9"),
      dailyConcept("number-10", "tien", "دس", "number-10")
    ],
    fills: [
      ["nul, een, ___", ["twee", "vier", "tien"], "twee", "ایک کے بعد twee آتا ہے۔"],
      ["twee, drie, ___", ["vier", "acht", "nul"], "vier", "تین کے بعد vier۔"],
      ["vier, vijf, ___", ["zes", "zeven", "negen"], "zes", "پانچ کے بعد zes۔"],
      ["zes, zeven, ___", ["acht", "tien", "drie"], "acht", "سات کے بعد acht۔"],
      ["acht, negen, ___", ["tien", "een", "zes"], "tien", "نو کے بعد tien۔"],
      ["ik heb ___ boeken", ["twee", "nul", "tien"], "twee", "دو کتابیں = twee boeken۔"],
      ["nummer ___", ["acht", "huis", "waar"], "acht", "عدد آٹھ = acht۔"],
      ["___ kinderen", ["drie", "goed", "hier"], "drie", "تین بچے = drie kinderen۔"]
    ],
    situations: [
      ["حال: عدد 0 کہنا ہے۔", ["nul", "een", "tien"], "nul", "صفر = nul۔"],
      ["حال: دو ٹکٹ چاہیے۔", ["twee kaartjes", "vier kaartjes", "geen kaartje"], "twee kaartjes", "دو = twee۔"],
      ["حال: گھر کا نمبر 5 ہے۔", ["nummer vijf", "nummer vier", "nummer tien"], "nummer vijf", "پانچ = vijf۔"],
      ["حال: تین بچے ہیں۔", ["drie kinderen", "zes kinderen", "een kind"], "drie kinderen", "تین = drie۔"],
      ["حال: سات دن کہنا ہے۔", ["zeven dagen", "acht dagen", "twee dagen"], "zeven dagen", "سات = zeven۔"],
      ["حال: عدد 10 سنائی دیا۔", ["tien", "negen", "zes"], "tien", "دس = tien۔"],
      ["حال: ایک کتاب چاہیے۔", ["een boek", "twee boeken", "nul boeken"], "een boek", "ایک = een۔"],
      ["حال: بس نمبر 8 ہے۔", ["bus acht", "bus zes", "bus drie"], "bus acht", "آٹھ = acht۔"],
      ["حال: چار یورو کہنا ہے۔", ["vier euro", "vijf euro", "negen euro"], "vier euro", "چار = vier۔"]
    ],
    builds: [
      ["دو کتابیں", ["twee", "boeken"], "twee boeken", "عدد پہلے، چیز بعد میں۔"],
      ["تین بچے", ["drie", "kinderen"], "drie kinderen", "تین = drie۔"],
      ["بس نمبر آٹھ", ["bus", "acht"], "bus acht", "بس کے بعد نمبر۔"],
      ["چار یورو", ["vier", "euro"], "vier euro", "قیمت میں عدد پہلے۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-numbers-11-100",
    unit: "A0: اعداد 2",
    title: "Getallen 11–100",
    description: "گیارہ سے بیس تک مکمل مشق، اور تیس سے سو تک دہائیاں پہچاننا۔",
    explanation: {
      title: "بیس تک مکمل، پھر دہائیاں",
      points: [
        "elf سے twintig تک ہر عدد کو الگ آواز سے پہچانیں۔",
        "dertig، veertig، vijftig جیسی دہائیاں قیمت، عمر، اور نمبر میں بہت آتی ہیں۔",
        "اکیس جیسے مشکل عدد بنانا ابھی ضروری نہیں؛ صرف عام دہائیاں پہچانیں۔"
      ],
      note: "آواز سن کر صحیح عدد چننے پر توجہ دیں۔"
    },
    concepts: [
      dailyConcept("number-11", "elf", "گیارہ", "number-11"),
      dailyConcept("number-12", "twaalf", "بارہ", "number-12"),
      dailyConcept("number-13", "dertien", "تیرہ", "number-13"),
      dailyConcept("number-14", "veertien", "چودہ", "number-14"),
      dailyConcept("number-15", "vijftien", "پندرہ", "number-15"),
      dailyConcept("number-16", "zestien", "سولہ", "number-16"),
      dailyConcept("number-17", "zeventien", "سترہ", "number-17"),
      dailyConcept("number-18", "achttien", "اٹھارہ", "number-18"),
      dailyConcept("number-19", "negentien", "انیس", "number-19"),
      dailyConcept("number-20", "twintig", "بیس", "number-20"),
      dailyConcept("number-30", "dertig", "تیس", "number-30"),
      dailyConcept("number-40", "veertig", "چالیس", "number-40"),
      dailyConcept("number-50", "vijftig", "پچاس", "number-50"),
      dailyConcept("number-60", "zestig", "ساٹھ", "number-60"),
      dailyConcept("number-70", "zeventig", "ستر", "number-70"),
      dailyConcept("number-80", "tachtig", "اسی", "number-80"),
      dailyConcept("number-90", "negentig", "نوے", "number-90"),
      dailyConcept("number-100", "honderd", "سو", "number-100")
    ],
    fills: [
      ["elf, twaalf, ___", ["dertien", "twintig", "dertig"], "dertien", "بارہ کے بعد dertien۔"],
      ["dertien, veertien, ___", ["vijftien", "zestien", "twintig"], "vijftien", "چودہ کے بعد vijftien۔"],
      ["zestien, zeventien, ___", ["achttien", "negentien", "dertig"], "achttien", "سترہ کے بعد achttien۔"],
      ["achttien, negentien, ___", ["twintig", "twaalf", "veertig"], "twintig", "انیس کے بعد twintig۔"],
      ["twintig, dertig, ___", ["veertig", "vijftig", "honderd"], "veertig", "تیس کے بعد veertig۔"],
      ["veertig, vijftig, ___", ["zestig", "zeventig", "dertien"], "zestig", "پچاس کے بعد zestig۔"],
      ["tachtig, negentig, ___", ["honderd", "twintig", "elf"], "honderd", "نوے کے بعد honderd۔"],
      ["ik ben ___ jaar", ["dertig", "station", "morgen"], "dertig", "عمر کے ساتھ jaar آتا ہے۔"]
    ],
    situations: [
      ["حال: عمر 18 سال ہے۔", ["ik ben achttien jaar", "ik ben tachtig jaar", "ik heb achttien"], "ik ben achttien jaar", "اٹھارہ = achttien۔"],
      ["حال: قیمت 20 یورو ہے۔", ["twintig euro", "twaalf euro", "dertig euro"], "twintig euro", "بیس = twintig۔"],
      ["حال: گھر کا نمبر 14 ہے۔", ["huisnummer veertien", "huisnummer veertig", "huisnummer vier"], "huisnummer veertien", "چودہ = veertien۔"],
      ["حال: بس نمبر 50 ہے۔", ["bus vijftig", "bus vijftien", "bus zestig"], "bus vijftig", "پچاس = vijftig۔"],
      ["حال: قیمت 90 یورو سنائی دی۔", ["negentig euro", "negentien euro", "zeventig euro"], "negentig euro", "نوے = negentig۔"],
      ["حال: سو کہنا ہے۔", ["honderd", "tachtig", "twintig"], "honderd", "سو = honderd۔"],
      ["حال: عمر 16 سال ہے۔", ["ik ben zestien jaar", "ik ben zestig jaar", "ik heb zestien"], "ik ben zestien jaar", "سولہ = zestien۔"],
      ["حال: نمبر 70 پہچاننا ہے۔", ["zeventig", "zeventien", "zestig"], "zeventig", "ستر = zeventig۔"],
      ["حال: بارہ یورو کہنا ہے۔", ["twaalf euro", "twintig euro", "elf euro"], "twaalf euro", "بارہ = twaalf۔"]
    ],
    builds: [
      ["میں اٹھارہ سال کا/کی ہوں", ["ik", "ben", "achttien", "jaar"], "ik ben achttien jaar", "عمر کا تیار جملہ۔"],
      ["گھر نمبر چودہ", ["huisnummer", "veertien"], "huisnummer veertien", "نمبر کے بعد عدد۔"],
      ["بس نمبر پچاس", ["bus", "vijftig"], "bus vijftig", "بس کے بعد عدد۔"],
      ["بیس یورو", ["twintig", "euro"], "twintig euro", "قیمت کی ترتیب۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-time-days",
    unit: "A0: وقت",
    title: "Tijd en dagen",
    description: "آج، کل، ہفتے کے دن، دن کے حصے، اور پورے گھنٹے۔",
    explanation: {
      title: "وقت کے لفظ پہلے پہچانیں",
      points: [
        "vandaag آج، morgen آنے والا کل، اور gisteren گزرا ہوا کل ہے۔",
        "maandag سے zondag تک ہفتے کے دن ہیں۔",
        "پورا وقت om acht uur جیسے فقرے سے کہا جا سکتا ہے۔"
      ],
      note: "آدھا اور پونے والا وقت A1 میں آئے گا۔"
    },
    concepts: [
      dailyConcept("time-today", "vandaag", "آج", "vandaag"),
      dailyConcept("time-tomorrow", "morgen", "کل / آنے والا دن", "morgen"),
      dailyConcept("time-yesterday", "gisteren", "گزرا ہوا کل", "gisteren"),
      dailyConcept("time-now", "nu", "ابھی", "now"),
      dailyConcept("time-hour", "uur", "گھنٹہ / بجے", "uur"),
      dailyConcept("day-monday", "maandag", "پیر"),
      dailyConcept("day-tuesday", "dinsdag", "منگل"),
      dailyConcept("day-wednesday", "woensdag", "بدھ"),
      dailyConcept("day-thursday", "donderdag", "جمعرات"),
      dailyConcept("day-friday", "vrijdag", "جمعہ"),
      dailyConcept("day-saturday", "zaterdag", "ہفتہ"),
      dailyConcept("day-sunday", "zondag", "اتوار"),
      dailyConcept("time-morning", "ochtend", "صبح", "ochtend"),
      dailyConcept("time-afternoon", "middag", "دوپہر", "middag"),
      dailyConcept("time-evening", "avond", "شام", "avond"),
      dailyConcept("time-night", "nacht", "رات", "nacht"),
      dailyConcept("time-question", "hoe laat is het?", "کتنے بجے ہیں؟", "uur", "phrase"),
      dailyConcept("time-eight", "om acht uur", "آٹھ بجے", "number-8", "phrase")
    ],
    fills: [
      ["ik werk ___", ["vandaag", "waar", "brood"], "vandaag", "آج = vandaag۔"],
      ["ik kom ___", ["morgen", "gisteren", "onder"], "morgen", "آنے والا کل = morgen۔"],
      ["___ was ik thuis", ["gisteren", "morgen", "nu"], "gisteren", "گزرا ہوا کل = gisteren۔"],
      ["hoe laat is ___?", ["het", "dit", "wie"], "het", "وقت کا سوال: hoe laat is het?۔"],
      ["om acht ___", ["uur", "dag", "week"], "uur", "آٹھ بجے = om acht uur۔"],
      ["maandag, dinsdag, ___", ["woensdag", "vrijdag", "zondag"], "woensdag", "منگل کے بعد woensdag۔"],
      ["vrijdag, zaterdag, ___", ["zondag", "maandag", "dinsdag"], "zondag", "ہفتہ کے بعد zondag۔"],
      ["goeden___", ["avond", "week", "uur"], "avond", "شام بخیر = goedenavond۔"]
    ],
    situations: [
      ["حال: آج کام ہے۔", ["ik werk vandaag", "ik werk gisteren", "ik woon morgen"], "ik werk vandaag", "آج = vandaag۔"],
      ["حال: کل آنا ہے۔", ["ik kom morgen", "ik kom gisteren", "ik ben morgen"], "ik kom morgen", "آنے والا کل = morgen۔"],
      ["حال: وقت پوچھنا ہے۔", ["hoe laat is het?", "waar is het?", "wie is laat?"], "hoe laat is het?", "وقت کے لیے hoe laat۔"],
      ["حال: ملاقات آٹھ بجے ہے۔", ["om acht uur", "acht dagen", "uur acht is"], "om acht uur", "پورے وقت کا فقرہ۔"],
      ["حال: آج جمعہ ہے۔", ["vandaag is het vrijdag", "morgen was vrijdag", "vrijdag is waar"], "vandaag is het vrijdag", "آج اور دن کو ملائیں۔"],
      ["حال: صبح کہنا ہے۔", ["ochtend", "avond", "nacht"], "ochtend", "صبح = ochtend۔"],
      ["حال: شام کہنا ہے۔", ["avond", "middag", "ochtend"], "avond", "شام = avond۔"],
      ["حال: ابھی انتظار کرنا ہے۔", ["ik wacht nu", "ik wacht gisteren", "ik ben uur"], "ik wacht nu", "ابھی = nu۔"],
      ["حال: اتوار پہچاننا ہے۔", ["zondag", "zaterdag", "dinsdag"], "zondag", "اتوار = zondag۔"]
    ],
    builds: [
      ["کتنے بجے ہیں؟", ["hoe", "laat", "is", "het"], "hoe laat is het", "وقت پوچھنے کی ترتیب۔"],
      ["میں آج کام کرتا/کرتی ہوں", ["ik", "werk", "vandaag"], "ik werk vandaag", "فاعل، فعل، وقت۔"],
      ["میں کل آتا/آتی ہوں", ["ik", "kom", "morgen"], "ik kom morgen", "کل = morgen۔"],
      ["آٹھ بجے", ["om", "acht", "uur"], "om acht uur", "پورے گھنٹے کا فقرہ۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-daily-actions",
    unit: "A0: روزمرہ کام",
    title: "Dagelijkse acties",
    description: "کام کرنا، کھانا، پینا، سونا، بیٹھنا، کھڑا ہونا، چلنا، اور انتظار کرنا۔",
    explanation: {
      title: "ik کے ساتھ کام والا لفظ",
      points: [
        "ik werk کا مطلب میں کام کرتا/کرتی ہوں۔",
        "ik eet، ik drink، ik slaap روزمرہ کے بہت عام جملے ہیں۔",
        "ان شکلوں کو ابھی ik کے ساتھ تیار فقرے کی طرح یاد کریں۔"
      ],
      note: "فعل کی پوری تبدیلی A1 میں آئے گی۔"
    },
    concepts: [
      dailyConcept("action-work", "werken", "کام کرنا", "werk"),
      dailyConcept("action-eat", "eten", "کھانا", "eten"),
      dailyConcept("action-drink", "drinken", "پینا", "drink"),
      dailyConcept("action-sleep", "slapen", "سونا", "slapen"),
      dailyConcept("action-walk", "lopen", "چلنا", "lopen"),
      dailyConcept("action-sit", "zitten", "بیٹھنا", "zitten"),
      dailyConcept("action-stand", "staan", "کھڑا ہونا", "staan"),
      dailyConcept("action-wait", "wachten", "انتظار کرنا", "wachten"),
      dailyConcept("action-read", "lezen", "پڑھنا", "lezen"),
      dailyConcept("action-write", "schrijven", "لکھنا", "schrijven"),
      dailyConcept("action-work-today", "ik werk vandaag", "میں آج کام کرتا/کرتی ہوں", "werk", "phrase"),
      dailyConcept("action-wait-here", "ik wacht hier", "میں یہاں انتظار کرتا/کرتی ہوں", "wachten", "phrase")
    ],
    fills: [
      ["ik ___ water", ["drink", "eet", "slaap"], "drink", "پانی پینا = drink water۔"],
      ["ik ___ brood", ["eet", "drink", "wacht"], "eet", "روٹی کھانا = eet brood۔"],
      ["ik ___ in de nacht", ["slaap", "werk", "lees"], "slaap", "رات میں سونا = slaap۔"],
      ["ik ___ vandaag", ["werk", "water", "boek"], "werk", "آج کام کرنا = werk vandaag۔"],
      ["ik ___ hier", ["wacht", "drink", "slaap"], "wacht", "یہاں انتظار کرنا۔"],
      ["ik ___ een boek", ["lees", "loop", "sta"], "lees", "کتاب پڑھنا = lees۔"],
      ["ik ___ mijn naam", ["schrijf", "drink", "zit"], "schrijf", "نام لکھنا = schrijf۔"],
      ["ik ___ naar huis", ["loop", "slaap", "eet"], "loop", "گھر کی طرف چلنا = loop۔"]
    ],
    situations: [
      ["حال: پانی پی رہے ہیں۔", ["ik drink water", "ik eet water", "ik slaap water"], "ik drink water", "پینا = drinken۔"],
      ["حال: روٹی کھا رہے ہیں۔", ["ik eet brood", "ik drink brood", "ik lees brood"], "ik eet brood", "کھانا = eten۔"],
      ["حال: رات کو سوتے ہیں۔", ["ik slaap in de nacht", "ik werk de nacht", "ik eet nacht"], "ik slaap in de nacht", "سونا = slapen۔"],
      ["حال: آج کام ہے۔", ["ik werk vandaag", "ik wacht gisteren", "ik ben werk"], "ik werk vandaag", "کام کرنا = werken۔"],
      ["حال: یہاں انتظار کرنا ہے۔", ["ik wacht hier", "ik loop hier weg", "ik drink hier"], "ik wacht hier", "انتظار = wachten۔"],
      ["حال: کتاب پڑھ رہے ہیں۔", ["ik lees een boek", "ik schrijf een boek", "ik drink een boek"], "ik lees een boek", "پڑھنا = lezen۔"],
      ["حال: اپنا نام لکھ رہے ہیں۔", ["ik schrijf mijn naam", "ik lees mijn naam", "ik slaap naam"], "ik schrijf mijn naam", "لکھنا = schrijven۔"],
      ["حال: بیٹھنے کو کہنا ہے۔", ["zitten", "staan", "lopen"], "zitten", "بیٹھنا = zitten۔"],
      ["حال: گھر پیدل جا رہے ہیں۔", ["ik loop naar huis", "ik slaap naar huis", "ik wacht huis"], "ik loop naar huis", "چلنا = lopen۔"]
    ],
    builds: [
      ["میں پانی پیتا/پیتی ہوں", ["ik", "drink", "water"], "ik drink water", "فاعل، فعل، چیز۔"],
      ["میں روٹی کھاتا/کھاتی ہوں", ["ik", "eet", "brood"], "ik eet brood", "کھانے کا جملہ۔"],
      ["میں یہاں انتظار کرتا/کرتی ہوں", ["ik", "wacht", "hier"], "ik wacht hier", "انتظار کا جملہ۔"],
      ["میں آج کام کرتا/کرتی ہوں", ["ik", "werk", "vandaag"], "ik werk vandaag", "وقت آخر میں۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-food-drink",
    unit: "A0: کھانا پینا",
    title: "Eten en drinken",
    description: "عام کھانے پینے کی چیزیں، بھوک پیاس، اور ادب سے مانگنا۔",
    explanation: {
      title: "ik wil graag کے ساتھ مانگیں",
      points: [
        "ik wil graag... کا مطلب ہے: مجھے ... چاہیے۔",
        "water، brood، rijst، melk، koffie، thee روزمرہ کے عام الفاظ ہیں۔",
        "honger بھوک، اور dorst پیاس ہے۔"
      ],
      note: "درخواست میں چیز کے پہلے ik wil graag کہیں۔"
    },
    concepts: [
      dailyConcept("food-water", "water", "پانی", "water"),
      dailyConcept("food-bread", "brood", "روٹی", "brood"),
      dailyConcept("food-rice", "rijst", "چاول", "rijst"),
      dailyConcept("food-milk", "melk", "دودھ", "melk"),
      dailyConcept("food-coffee", "koffie", "کافی", "koffie"),
      dailyConcept("food-tea", "thee", "چائے", "thee"),
      dailyConcept("food-fruit", "fruit", "پھل", "fruit"),
      dailyConcept("food-vegetables", "groente", "سبزیاں", "groente"),
      dailyConcept("food-hunger", "honger", "بھوک", "honger"),
      dailyConcept("food-thirst", "dorst", "پیاس", "dorst"),
      dailyConcept("food-want-water", "ik wil graag water", "مجھے پانی چاہیے", "water", "phrase"),
      dailyConcept("food-want-coffee", "ik wil graag koffie", "مجھے کافی چاہیے", "koffie", "phrase")
    ],
    fills: [
      ["ik wil graag ___", ["water", "waar", "wachten"], "water", "درخواست کے آخر میں چیز آتی ہے۔"],
      ["ik drink ___", ["melk", "brood", "rijst"], "melk", "دودھ پیا جاتا ہے۔"],
      ["ik eet ___", ["brood", "thee", "water"], "brood", "روٹی کھائی جاتی ہے۔"],
      ["koffie, ___", ["graag", "achter", "wie"], "graag", "درخواست میں graag۔"],
      ["ik heb ___", ["honger", "brood", "kassa"], "honger", "مجھے بھوک ہے = ik heb honger۔"],
      ["ik heb ___", ["dorst", "boek", "station"], "dorst", "مجھے پیاس ہے = ik heb dorst۔"],
      ["___ en groente", ["fruit", "bus", "prijs"], "fruit", "پھل اور سبزیاں۔"],
      ["thee met ___", ["melk", "rijst", "deur"], "melk", "دودھ والی چائے۔"]
    ],
    situations: [
      ["حال: پانی مانگنا ہے۔", ["ik wil graag water", "ik ben water", "waar is water huis?"], "ik wil graag water", "ادب والی درخواست۔"],
      ["حال: کافی چاہیے۔", ["ik wil graag koffie", "ik eet koffie", "ik ben koffie"], "ik wil graag koffie", "کافی = koffie۔"],
      ["حال: بھوک لگی ہے۔", ["ik heb honger", "ik heb dorst", "ik ben brood"], "ik heb honger", "بھوک = honger۔"],
      ["حال: پیاس لگی ہے۔", ["ik heb dorst", "ik heb honger", "ik drink brood"], "ik heb dorst", "پیاس = dorst۔"],
      ["حال: چائے مانگنی ہے۔", ["thee, graag", "rijst, graag", "waar thee"], "thee, graag", "چائے = thee۔"],
      ["حال: دودھ پہچاننا ہے۔", ["melk", "water", "koffie"], "melk", "دودھ = melk۔"],
      ["حال: چاول کھانے ہیں۔", ["ik eet rijst", "ik drink rijst", "ik slaap rijst"], "ik eet rijst", "چاول = rijst۔"],
      ["حال: پھل خریدنا ہے۔", ["ik wil fruit", "ik ben fruit", "ik woon fruit"], "ik wil fruit", "پھل = fruit۔"],
      ["حال: روٹی چاہیے۔", ["brood, graag", "water, graag", "tot brood"], "brood, graag", "روٹی = brood۔"]
    ],
    builds: [
      ["مجھے پانی چاہیے", ["ik", "wil", "graag", "water"], "ik wil graag water", "درخواست کا تیار جملہ۔"],
      ["مجھے کافی چاہیے", ["ik", "wil", "graag", "koffie"], "ik wil graag koffie", "چیز آخر میں۔"],
      ["مجھے بھوک ہے", ["ik", "heb", "honger"], "ik heb honger", "بھوک کا جملہ۔"],
      ["مجھے پیاس ہے", ["ik", "heb", "dorst"], "ik heb dorst", "پیاس کا جملہ۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-shopping-payment",
    unit: "A0: خریداری",
    title: "Winkel en betalen",
    description: "قیمت پوچھنا، کیش یا کارڈ سے ادائیگی، رسید، اور سستی یا مہنگی چیز۔",
    explanation: {
      title: "دکان کے تین تیار جملے",
      points: [
        "hoeveel kost dit? سے قیمت پوچھی جاتی ہے۔",
        "ik wil dit سے کہا جاتا ہے: مجھے یہ چاہیے۔",
        "met pin یا contant سے ادائیگی کا طریقہ بتایا جاتا ہے۔"
      ],
      note: "قیمت، چیز، اور ادائیگی کو الگ الگ پہچانیں۔"
    },
    concepts: [
      dailyConcept("shop-store", "winkel", "دکان", "winkel"),
      dailyConcept("shop-supermarket", "supermarkt", "سپر مارکیٹ", "supermarkt"),
      dailyConcept("shop-price", "prijs", "قیمت", "prijs"),
      dailyConcept("shop-register", "kassa", "کیش کاؤنٹر", "kassa"),
      dailyConcept("shop-receipt", "bon", "رسید", "bon"),
      dailyConcept("shop-cash", "contant", "نقد / کیش", "contant"),
      dailyConcept("shop-card", "pinnen", "کارڈ سے ادائیگی کرنا", "pinnen"),
      dailyConcept("shop-pay", "betalen", "ادائیگی کرنا", "betalen"),
      dailyConcept("shop-cheap", "goedkoop", "سستا", "goedkoop"),
      dailyConcept("shop-expensive", "duur", "مہنگا", "duur"),
      dailyConcept("shop-how-much", "hoeveel kost dit?", "یہ کتنے کا ہے؟", "prijs", "phrase"),
      dailyConcept("shop-want-this", "ik wil dit", "مجھے یہ چاہیے", "dit", "phrase")
    ],
    fills: [
      ["hoeveel ___ dit?", ["kost", "woon", "slaap"], "kost", "قیمت پوچھنے کے لیے kost۔"],
      ["ik wil ___", ["dit", "waar", "wie"], "dit", "مجھے یہ چاہیے = ik wil dit۔"],
      ["ik betaal met ___", ["pin", "brood", "station"], "pin", "کارڈ سے = met pin۔"],
      ["ik betaal ___", ["contant", "achter", "morgen"], "contant", "نقد ادائیگی = contant۔"],
      ["waar is de ___?", ["kassa", "dokter", "halte"], "kassa", "دکان میں کاؤنٹر = kassa۔"],
      ["de prijs is ___", ["goedkoop", "water", "links"], "goedkoop", "سستا = goedkoop۔"],
      ["dit is te ___", ["duur", "bon", "hier"], "duur", "بہت مہنگا = te duur۔"],
      ["mag ik de ___?", ["bon", "prijs", "winkel"], "bon", "رسید مانگنے کے لیے bon۔"]
    ],
    situations: [
      ["حال: قیمت پوچھنی ہے۔", ["hoeveel kost dit?", "waar woont dit?", "wie betaalt dit?"], "hoeveel kost dit?", "دکان میں قیمت کا سوال۔"],
      ["حال: سامنے والی چیز چاہیے۔", ["ik wil dit", "ik ben dit", "ik woon dit"], "ik wil dit", "مجھے یہ چاہیے۔"],
      ["حال: کارڈ سے ادائیگی کرنی ہے۔", ["ik betaal met pin", "ik betaal met brood", "ik ben pin"], "ik betaal met pin", "کارڈ = pin۔"],
      ["حال: نقد ادائیگی کرنی ہے۔", ["ik betaal contant", "ik woon contant", "ik drink contant"], "ik betaal contant", "نقد = contant۔"],
      ["حال: رسید چاہیے۔", ["mag ik de bon?", "waar is de bus?", "ik ben bon"], "mag ik de bon?", "رسید = bon۔"],
      ["حال: کیش کاؤنٹر تلاش کرنا ہے۔", ["waar is de kassa?", "hoeveel is de kassa?", "wie woont kassa?"], "waar is de kassa?", "کاؤنٹر = kassa۔"],
      ["حال: چیز سستی ہے۔", ["dit is goedkoop", "dit is duur", "dit is contant"], "dit is goedkoop", "سستا = goedkoop۔"],
      ["حال: چیز بہت مہنگی ہے۔", ["dit is te duur", "dit is goedkoop", "dit is bon"], "dit is te duur", "مہنگا = duur۔"],
      ["حال: سپر مارکیٹ پوچھنی ہے۔", ["waar is de supermarkt?", "wie is de supermarkt?", "ik ben supermarkt"], "waar is de supermarkt?", "جگہ کے لیے waar۔"]
    ],
    builds: [
      ["یہ کتنے کا ہے؟", ["hoeveel", "kost", "dit"], "hoeveel kost dit", "قیمت کا سوال۔"],
      ["مجھے یہ چاہیے", ["ik", "wil", "dit"], "ik wil dit", "درخواست کا جملہ۔"],
      ["میں کارڈ سے ادائیگی کرتا/کرتی ہوں", ["ik", "betaal", "met", "pin"], "ik betaal met pin", "ادائیگی کا طریقہ آخر میں۔"],
      ["رسید مل سکتی ہے؟", ["mag", "ik", "de", "bon"], "mag ik de bon", "رسید مانگنے کا چھوٹا سوال۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-transport-directions",
    unit: "A0: سفر اور راستہ",
    title: "Reizen en richting",
    description: "بس، ٹرین، ٹکٹ، اسٹیشن، سمتیں، ٹوائلٹ، داخلہ، اور خروج۔",
    explanation: {
      title: "جگہ اور سمت کے تیار الفاظ",
      points: [
        "links بائیں، rechts دائیں، اور rechtdoor سیدھا ہے۔",
        "waar is...? کے بعد station، halte، toilet جیسی جگہ لگائیں۔",
        "ik wil een kaartje سے ٹکٹ مانگا جاتا ہے۔"
      ],
      note: "نقشہ یا نشان دیکھ کر سمت پہچانیں۔"
    },
    concepts: [
      dailyConcept("travel-bus", "bus", "بس", "bus"),
      dailyConcept("travel-train", "trein", "ٹرین", "trein"),
      dailyConcept("travel-station", "station", "اسٹیشن", "station"),
      dailyConcept("travel-stop", "halte", "بس اسٹاپ", "halte"),
      dailyConcept("travel-ticket", "kaartje", "ٹکٹ", "kaartje"),
      dailyConcept("direction-left", "links", "بائیں", "links"),
      dailyConcept("direction-right", "rechts", "دائیں", "rechts"),
      dailyConcept("direction-straight", "rechtdoor", "سیدھا", "rechtdoor"),
      dailyConcept("public-toilet", "toilet", "ٹوائلٹ", "toilet"),
      dailyConcept("public-entrance", "ingang", "داخلہ", "ingang"),
      dailyConcept("public-exit", "uitgang", "خروج / باہر جانے کا راستہ", "uitgang"),
      dailyConcept("travel-where-station", "waar is het station?", "اسٹیشن کہاں ہے؟", "station", "phrase"),
      dailyConcept("travel-want-ticket", "ik wil een kaartje", "مجھے ایک ٹکٹ چاہیے", "kaartje", "phrase")
    ],
    fills: [
      ["waar is het ___?", ["station", "brood", "water"], "station", "جگہ کے سوال میں station۔"],
      ["ik wil een ___", ["kaartje", "kassa", "dokter"], "kaartje", "ٹکٹ = kaartje۔"],
      ["ga naar ___", ["links", "melk", "vandaag"], "links", "بائیں = links۔"],
      ["ga naar ___", ["rechts", "brood", "gisteren"], "rechts", "دائیں = rechts۔"],
      ["ga ___", ["rechtdoor", "contant", "ziek"], "rechtdoor", "سیدھا = rechtdoor۔"],
      ["waar is het ___?", ["toilet", "kaartje", "prijs"], "toilet", "ٹوائلٹ کا سوال۔"],
      ["dit is de ___", ["ingang", "uitgang", "halte"], "ingang", "داخلہ = ingang۔"],
      ["dit is de ___ naar buiten", ["uitgang", "ingang", "kassa"], "uitgang", "باہر جانے کا راستہ = uitgang۔"]
    ],
    situations: [
      ["حال: اسٹیشن تلاش کرنا ہے۔", ["waar is het station?", "hoeveel is het station?", "ik ben station"], "waar is het station?", "اسٹیشن کی جگہ پوچھیں۔"],
      ["حال: ایک ٹکٹ چاہیے۔", ["ik wil een kaartje", "ik heb geen bus", "waar woont kaartje?"], "ik wil een kaartje", "ٹکٹ مانگنے کا فقرہ۔"],
      ["حال: بائیں جانا ہے۔", ["links", "rechts", "rechtdoor"], "links", "بائیں = links۔"],
      ["حال: دائیں جانا ہے۔", ["rechts", "links", "achter"], "rechts", "دائیں = rechts۔"],
      ["حال: سیدھا جانا ہے۔", ["rechtdoor", "links", "uitgang"], "rechtdoor", "سیدھا = rechtdoor۔"],
      ["حال: بس اسٹاپ پوچھنا ہے۔", ["waar is de halte?", "waar is de trein?", "ik ben halte"], "waar is de halte?", "بس اسٹاپ = halte۔"],
      ["حال: ٹوائلٹ پوچھنا ہے۔", ["waar is het toilet?", "wie is toilet?", "ik wil station"], "waar is het toilet?", "ٹوائلٹ کی جگہ پوچھیں۔"],
      ["حال: عمارت میں داخل ہونا ہے۔", ["ingang", "uitgang", "kaartje"], "ingang", "داخلہ = ingang۔"],
      ["حال: باہر نکلنا ہے۔", ["uitgang", "ingang", "halte"], "uitgang", "خروج = uitgang۔"]
    ],
    builds: [
      ["اسٹیشن کہاں ہے؟", ["waar", "is", "het", "station"], "waar is het station", "جگہ کا سوال۔"],
      ["مجھے ایک ٹکٹ چاہیے", ["ik", "wil", "een", "kaartje"], "ik wil een kaartje", "ٹکٹ مانگنے کا جملہ۔"],
      ["سیدھا جائیں", ["ga", "rechtdoor"], "ga rechtdoor", "سمت کا چھوٹا فقرہ۔"],
      ["ٹوائلٹ کہاں ہے؟", ["waar", "is", "het", "toilet"], "waar is het toilet", "ضروری جگہ کا سوال۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-health-emergency",
    unit: "A0: صحت اور ہنگامی مدد",
    title: "Gezondheid en nood",
    description: "بیماری، درد، ڈاکٹر، دوا، ایمبولینس، اور فوری مدد مانگنا۔",
    explanation: {
      title: "صحت کے مختصر ضروری جملے",
      points: [
        "ik ben ziek کا مطلب ہے میں بیمار ہوں۔",
        "ik heb pijn کا مطلب ہے مجھے درد ہے۔",
        "help! اور bel 112 فوری ہنگامی حالت کے فقرے ہیں۔"
      ],
      note: "یہ زبان کی مشق ہے؛ حقیقی ہنگامی حالت میں 112 پر رابطہ کریں۔"
    },
    concepts: [
      dailyConcept("health-sick", "ziek", "بیمار", "ziek"),
      dailyConcept("health-pain", "pijn", "درد", "pijn"),
      dailyConcept("health-doctor", "dokter", "ڈاکٹر", "dokter"),
      dailyConcept("health-pharmacy", "apotheek", "فارمیسی", "apotheek"),
      dailyConcept("health-medicine", "medicijn", "دوا", "medicijn"),
      dailyConcept("health-hospital", "ziekenhuis", "ہسپتال", "ziekenhuis"),
      dailyConcept("health-ambulance", "ambulance", "ایمبولینس", "ambulance"),
      dailyConcept("health-headache", "hoofdpijn", "سر درد", "hoofdpijn"),
      dailyConcept("health-stomachache", "buikpijn", "پیٹ درد", "buikpijn"),
      dailyConcept("health-help", "hulp", "مدد", "hulp"),
      dailyConcept("health-call-112", "bel 112", "112 پر فون کریں", "ambulance", "phrase"),
      dailyConcept("health-have-pain", "ik heb pijn", "مجھے درد ہے", "pijn", "phrase"),
      dailyConcept("health-am-sick", "ik ben ziek", "میں بیمار ہوں", "ziek", "phrase")
    ],
    fills: [
      ["ik ben ___", ["ziek", "pijn", "dokter"], "ziek", "میں بیمار ہوں = ik ben ziek۔"],
      ["ik heb ___", ["pijn", "ziek", "apotheek"], "pijn", "مجھے درد ہے = ik heb pijn۔"],
      ["ik heb hoofd___", ["pijn", "ziek", "hulp"], "pijn", "سر درد = hoofdpijn۔"],
      ["waar is de ___?", ["apotheek", "ambulance", "pijn"], "apotheek", "فارمیسی کی جگہ پوچھیں۔"],
      ["ik heb een ___ nodig", ["dokter", "bus", "kassa"], "dokter", "ڈاکٹر چاہیے۔"],
      ["bel ___", ["112", "100", "20"], "112", "ہنگامی نمبر 112۔"],
      ["ik heb een ___ nodig", ["ambulance", "kaartje", "bon"], "ambulance", "ایمبولینس مانگنا۔"],
      ["dit is mijn ___", ["medicijn", "station", "prijs"], "medicijn", "دوا = medicijn۔"]
    ],
    situations: [
      ["حال: کہنا ہے کہ آپ بیمار ہیں۔", ["ik ben ziek", "ik heb ziek", "ik ben dokter"], "ik ben ziek", "بیمار ہونے کا جملہ۔"],
      ["حال: درد ہے۔", ["ik heb pijn", "ik ben pijn", "ik wil prijs"], "ik heb pijn", "درد کے لیے heb pijn۔"],
      ["حال: سر میں درد ہے۔", ["ik heb hoofdpijn", "ik heb buikpijn", "ik ben hoofd"], "ik heb hoofdpijn", "سر درد = hoofdpijn۔"],
      ["حال: پیٹ میں درد ہے۔", ["ik heb buikpijn", "ik heb hoofdpijn", "ik drink pijn"], "ik heb buikpijn", "پیٹ درد = buikpijn۔"],
      ["حال: فارمیسی تلاش کرنا ہے۔", ["waar is de apotheek?", "waar is de halte?", "ik ben apotheek"], "waar is de apotheek?", "فارمیسی = apotheek۔"],
      ["حال: ڈاکٹر چاہیے۔", ["ik heb een dokter nodig", "ik ben een dokter nodig", "ik drink dokter"], "ik heb een dokter nodig", "ضرورت کا تیار فقرہ۔"],
      ["حال: فوری مدد چاہیے۔", ["help!", "tot ziens", "goedemorgen"], "help!", "فوری مدد کے لیے help!۔"],
      ["حال: ایمبولینس چاہیے۔", ["ik heb een ambulance nodig", "ik wil een kaartje", "ik ben ambulance"], "ik heb een ambulance nodig", "ایمبولینس = ambulance۔"],
      ["حال: ہنگامی نمبر پر فون کرنا ہے۔", ["bel 112", "bus 112", "prijs 112"], "bel 112", "ہنگامی نمبر 112۔"]
    ],
    builds: [
      ["میں بیمار ہوں", ["ik", "ben", "ziek"], "ik ben ziek", "صحت کا بنیادی جملہ۔"],
      ["مجھے درد ہے", ["ik", "heb", "pijn"], "ik heb pijn", "درد کا بنیادی جملہ۔"],
      ["فارمیسی کہاں ہے؟", ["waar", "is", "de", "apotheek"], "waar is de apotheek", "جگہ کا سوال۔"],
      ["مجھے ایمبولینس چاہیے", ["ik", "heb", "een", "ambulance", "nodig"], "ik heb een ambulance nodig", "ہنگامی ضرورت کا فقرہ۔"]
    ]
  })
];

const practicalExplanation = (title, points) => ({
  title,
  points,
  note: "یہ جملے روزمرہ میں پورے فقروں کی طرح یاد کریں۔"
});

function makeA1PracticalLesson({ id, unit, title, description, explanation, concepts, listenReplies, situations = [], builds }) {
  const visualConcepts = concepts.filter((concept) => concept.visualId && concept.role !== "phrase");
  const phraseConcepts = concepts.filter((concept) => concept.role === "phrase");
  const questions = [uitleg(explanation.title, explanation.points, explanation.note)];

  for (let index = 0; index < 8; index += 1) {
    const concept = concepts[index % concepts.length];
    questions.push(meaning(concept.dutch, dailyOptions(concepts, index, "urdu"), concept.urdu, `${concept.dutch} = ${concept.urdu}۔`));
  }
  for (let index = 0; index < 6; index += 1) {
    const concept = concepts[(index + 2) % concepts.length];
    questions.push(reverse(concept.urdu, dailyOptions(concepts, index + 2, "dutch"), concept.dutch, `${concept.urdu} = ${concept.dutch}۔`));
  }
  for (let index = 0; index < 8; index += 1) {
    const concept = visualConcepts[index % visualConcepts.length];
    questions.push({
      type: "image-choice",
      label: "تصویر دیکھ کر صحیح Nederlands لفظ منتخب کریں",
      prompt: "تصویر دیکھیں اور صحیح لفظ چنیں۔",
      visualId: concept.visualId,
      options: dailyOptions(visualConcepts, index, "dutch"),
      answer: concept.dutch,
      explain: `تصویر میں ${concept.urdu} ہے: ${concept.dutch}۔`
    });
  }
  for (let index = 0; index < 8; index += 1) {
    const concept = concepts[(index + 1) % concepts.length];
    questions.push({
      ...listenChoice(concept.audio, dailyOptions(concepts, index + 1, "urdu"), concept.urdu, `${concept.dutch} = ${concept.urdu}۔`),
      conceptId: concept.id
    });
  }

  const listeningIndexes = questions.map((question, index) => question.type === "listen-choice" ? index : -1).filter((index) => index >= 0);
  listenReplies.slice(0, listeningIndexes.length).forEach((reply, index) => {
    const [speak, options, answer, explain] = reply;
    questions[listeningIndexes[index]] = {
      ...listenChoice(speak, options, answer, explain),
      prompt: "بات سنیں اور مناسب جواب منتخب کریں۔",
      mode: "listen-reply"
    };
  });

  const fillWords = uniq(phraseConcepts.flatMap((concept) => extractDutchWords(concept.dutch)).filter((word) => word.length > 1));
  for (let index = 0; index < 10; index += 1) {
    const concept = phraseConcepts[index % phraseConcepts.length];
    const gap = missingWordSentence(concept.dutch);
    const options = [gap.missing, ...rotate(fillWords.filter((word) => word !== gap.missing), index + 2).slice(0, 2)];
    questions.push(fillGap(gap.prompt, options, gap.missing, `صحیح مکمل فقرہ: ${concept.dutch}۔`));
  }

  const authoredSituations = situations.length ? situations : phraseConcepts.slice(0, 13).map((concept, index) => [
    concept.context || `حال: ${concept.urdu}`,
    dailyOptions(phraseConcepts, index, "dutch"),
    concept.dutch,
    `اس حال میں کہیں: ${concept.dutch}۔`,
    concept.speak ? { mode: "dialogue", speak: concept.speak } : {}
  ]);
  questions.push(...authoredSituations.map(dailySituation));
  questions.push(...builds.map(dailyBuild));
  return { id, unit, title, description, xp: 0, concepts, questions };
}

const a1Phrase = (id, dutch, urdu, context, speak = "") => ({
  ...dailyConcept(id, dutch, urdu, "", "phrase"),
  context,
  speak
});

function makeA2PracticalLesson({ id, unit, title, description, explanation, concepts, listenReplies, builds }) {
  const visualConcepts = concepts.filter((concept) => concept.visualId && concept.role !== "phrase");
  const phraseConcepts = concepts.filter((concept) => concept.role === "phrase");
  const questions = [uitleg(explanation.title, explanation.points, explanation.note)];

  for (let index = 0; index < 6; index += 1) {
    const concept = concepts[index % concepts.length];
    questions.push(meaning(concept.dutch, dailyOptions(concepts, index, "urdu"), concept.urdu, `${concept.dutch} = ${concept.urdu}۔`));
  }
  for (let index = 0; index < 5; index += 1) {
    const concept = concepts[(index + 1) % concepts.length];
    questions.push(reverse(concept.urdu, dailyOptions(concepts, index + 1, "dutch"), concept.dutch, `${concept.urdu} = ${concept.dutch}۔`));
  }
  for (let index = 0; index < 6; index += 1) {
    const concept = visualConcepts[index % visualConcepts.length];
    questions.push({ type: "image-choice", label: "تصویر دیکھ کر صحیح Nederlands لفظ منتخب کریں", prompt: "تصویر دیکھیں اور صحیح لفظ چنیں۔", visualId: concept.visualId, options: dailyOptions(visualConcepts, index, "dutch"), answer: concept.dutch, explain: `تصویر میں ${concept.urdu} ہے: ${concept.dutch}۔` });
  }
  for (let index = 0; index < 7; index += 1) {
    const concept = concepts[(index + 1) % concepts.length];
    questions.push({ ...listenChoice(concept.audio, dailyOptions(concepts, index + 1, "urdu"), concept.urdu, `${concept.dutch} = ${concept.urdu}۔`), conceptId: concept.id });
  }
  const listeningIndexes = questions.map((question, index) => question.type === "listen-choice" ? index : -1).filter((index) => index >= 0);
  listenReplies.slice(0, listeningIndexes.length).forEach((reply, index) => {
    const [speak, options, answer, explain] = reply;
    questions[listeningIndexes[index]] = { ...listenChoice(speak, options, answer, explain), prompt: "بات سنیں اور مناسب جواب منتخب کریں۔", mode: "listen-reply" };
  });

  const fillWords = uniq(phraseConcepts.flatMap((concept) => extractDutchWords(concept.dutch)).filter((word) => word.length > 1));
  for (let index = 0; index < 12; index += 1) {
    const concept = phraseConcepts[index % phraseConcepts.length];
    const gap = missingWordSentence(concept.dutch);
    questions.push(fillGap(gap.prompt, [gap.missing, ...rotate(fillWords.filter((word) => word !== gap.missing), index + 3).slice(0, 2)], gap.missing, `صحیح مکمل فقرہ: ${concept.dutch}۔`));
  }
  questions.push(...phraseConcepts.slice(0, 15).map((concept, index) => dailySituation([
    concept.context || `حال: ${concept.urdu}`,
    dailyOptions(phraseConcepts, index, "dutch"),
    concept.dutch,
    `اس حال میں کہیں: ${concept.dutch}۔`,
    concept.speak ? { mode: "dialogue", speak: concept.speak } : {}
  ])));
  questions.push(...builds.map(dailyBuild));
  return { id, unit, title, description, xp: 0, concepts, questions };
}

const a2Phrase = (id, dutch, urdu, context, speak = "") => ({ ...a1Phrase(id, dutch, urdu, context, speak) });

a0DailyLessons.push(
  makeA0DailyLesson({
    id: "a0-spelling-personal-details",
    unit: "A0: ذاتی معلومات",
    title: "Naam spellen",
    description: "نام، خاندانی نام، عمر، اور اپنے نام کے حروف صاف بتانا۔",
    explanation: practicalExplanation("اپنی معلومات آہستہ اور صاف بتائیں", [
      "voornaam پہلا نام اور achternaam خاندانی نام ہے۔",
      "hoe spelt u dat? کا مطلب ہے: آپ اس کے حروف کیسے بولتے ہیں؟",
      "نام بتاتے وقت ہر حرف الگ اور آہستہ کہا جا سکتا ہے۔"
    ]),
    concepts: [
      dailyConcept("personal-first-name", "voornaam", "پہلا نام", "naam"),
      dailyConcept("personal-surname", "achternaam", "خاندانی نام", "naam"),
      dailyConcept("personal-name", "mijn naam is", "میرا نام ہے", "naam", "phrase"),
      dailyConcept("personal-spell", "spellen", "حروف الگ الگ بولنا", "schrijven"),
      dailyConcept("personal-letter", "letter", "حرف", "letter-a"),
      dailyConcept("personal-age", "leeftijd", "عمر", "number-20"),
      dailyConcept("personal-old", "ik ben dertig jaar", "میں تیس سال کا / کی ہوں", "number-30", "phrase"),
      dailyConcept("personal-repeat", "kunt u dat herhalen?", "کیا آپ اسے دوبارہ کہہ سکتے ہیں؟", "nog-een-keer", "phrase"),
      dailyConcept("personal-write", "schrijf het op", "اسے لکھ دیں", "schrijven", "phrase"),
      dailyConcept("personal-slow", "langzaam alstublieft", "آہستہ، برائے مہربانی", "langzaam", "phrase"),
      dailyConcept("personal-question", "hoe heet u?", "آپ کا نام کیا ہے؟", "naam", "phrase"),
      dailyConcept("personal-spell-question", "hoe spelt u dat?", "آپ اس کے حروف کیسے بولتے ہیں؟", "letter-h", "phrase")
    ],
    listenReplies: [
      ["hoe heet u?", ["mijn naam is Sara", "ik ben dertig jaar", "ik woon hier"], "mijn naam is Sara", "نام کے سوال کا جواب اپنے نام سے دیں۔"],
      ["hoe oud bent u?", ["ik ben dertig jaar", "mijn naam is Sara", "dank u wel"], "ik ben dertig jaar", "عمر کے سوال کا جواب jaar کے ساتھ دیں۔"],
      ["hoe spelt u dat?", ["S-A-R-A", "dertig jaar", "in Amsterdam"], "S-A-R-A", "حروف الگ الگ بولیں۔"]
    ],
    fills: [
      ["mijn ___ is Sara", ["naam", "jaar", "letter"], "naam", "نام بتانے کے لیے mijn naam is۔"],
      ["mijn ___ is Khan", ["achternaam", "voornaam", "leeftijd"], "achternaam", "خاندانی نام = achternaam۔"],
      ["hoe ___ u?", ["heet", "jaar", "spelt"], "heet", "نام پوچھنے کا سوال۔"],
      ["hoe ___ u dat?", ["spelt", "heet", "woont"], "spelt", "حروف پوچھنے کے لیے spelt۔"],
      ["ik ben dertig ___", ["jaar", "naam", "letter"], "jaar", "عمر کے بعد jaar آتا ہے۔"],
      ["kunt u dat ___?", ["herhalen", "wonen", "betalen"], "herhalen", "دوبارہ کہنے کے لیے herhalen۔"],
      ["schrijf het ___", ["op", "in", "met"], "op", "لکھ دینے کا تیار فقرہ۔"],
      ["___ alstublieft", ["langzaam", "achternaam", "leeftijd"], "langzaam", "آہستہ بولنے کی درخواست۔"]
    ],
    situations: [
      ["حال: کوئی آپ کا نام پوچھتا ہے۔", ["mijn naam is Sara", "ik ben dertig jaar", "ik woon in Utrecht"], "mijn naam is Sara", "اپنا نام بتائیں۔", { mode: "dialogue", speak: "hoe heet u?" }],
      ["حال: خاندانی نام بتانا ہے۔", ["mijn achternaam is Khan", "mijn voornaam is Khan", "ik heb Khan"], "mijn achternaam is Khan", "خاندانی نام کے لیے achternaam۔"],
      ["حال: عمر بتانی ہے۔", ["ik ben dertig jaar", "ik heb dertig naam", "mijn jaar is dertig"], "ik ben dertig jaar", "عمر کا مکمل جملہ۔"],
      ["حال: کسی نام کے حروف پوچھنے ہیں۔", ["hoe spelt u dat?", "hoe oud bent u?", "waar woont u?"], "hoe spelt u dat?", "حروف پوچھنے کا سوال۔"],
      ["حال: بات دوبارہ سننی ہے۔", ["kunt u dat herhalen?", "schrijf het op", "hoe heet u?"], "kunt u dat herhalen?", "دوبارہ کہنے کی درخواست۔"],
      ["حال: معلومات لکھوانی ہیں۔", ["schrijf het op", "zeg het snel", "ik ben een letter"], "schrijf het op", "لکھنے کی درخواست۔"],
      ["حال: دوسرا شخص بہت تیز بول رہا ہے۔", ["langzaam alstublieft", "tot ziens", "ik ben snel"], "langzaam alstublieft", "آہستہ بولنے کو کہیں۔"],
      ["حال: پہلا نام پوچھنا ہے۔", ["wat is uw voornaam?", "wat is uw leeftijd?", "waar is uw naam?"], "wat is uw voornaam?", "پہلا نام = voornaam۔"],
      ["حال: خاندانی نام پوچھنا ہے۔", ["wat is uw achternaam?", "hoe oud bent u?", "wat kost dit?"], "wat is uw achternaam?", "خاندانی نام = achternaam۔"]
    ],
    builds: [
      ["میرا نام Sara ہے", ["mijn", "naam", "is", "Sara"], "mijn naam is Sara", "نام بتانے کا جملہ۔"],
      ["آپ کا نام کیا ہے؟", ["hoe", "heet", "u"], "hoe heet u", "نام پوچھنے کا سوال۔"],
      ["میں تیس سال کا / کی ہوں", ["ik", "ben", "dertig", "jaar"], "ik ben dertig jaar", "عمر بتانے کا جملہ۔"],
      ["کیا آپ اسے دوبارہ کہہ سکتے ہیں؟", ["kunt", "u", "dat", "herhalen"], "kunt u dat herhalen", "دوبارہ سننے کی درخواست۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-address-phone",
    unit: "A0: رابطے کی معلومات",
    title: "Adres en telefoonnummer",
    description: "پتہ، گھر نمبر، پوسٹ کوڈ، فون نمبر، اور ای میل بتانا۔",
    explanation: practicalExplanation("رابطے کی معلومات حصوں میں سنیں", [
      "adres میں سڑک اور گھر نمبر شامل ہوتے ہیں۔",
      "postcode میں عموماً چار عدد اور دو حروف ہوتے ہیں۔",
      "فون نمبر آہستہ، چھوٹے حصوں میں بولنا آسان ہے۔"
    ]),
    concepts: [
      dailyConcept("contact-address", "adres", "پتہ", "adres"),
      dailyConcept("contact-street", "straat", "سڑک", "adres"),
      dailyConcept("contact-house-number", "huisnummer", "گھر نمبر", "huis"),
      dailyConcept("contact-postcode", "postcode", "پوسٹ کوڈ", "adres"),
      dailyConcept("contact-city", "woonplaats", "رہنے کا شہر", "stad"),
      dailyConcept("contact-phone", "telefoonnummer", "فون نمبر", "telefoon"),
      dailyConcept("contact-email", "e-mailadres", "ای میل پتہ", "telefoon"),
      dailyConcept("contact-live", "ik woon op", "میں رہتا / رہتی ہوں", "huis", "phrase"),
      dailyConcept("contact-number-is", "mijn nummer is", "میرا نمبر ہے", "telefoon", "phrase"),
      dailyConcept("contact-ask-address", "wat is uw adres?", "آپ کا پتہ کیا ہے؟", "adres", "phrase"),
      dailyConcept("contact-ask-number", "wat is uw telefoonnummer?", "آپ کا فون نمبر کیا ہے؟", "telefoon", "phrase"),
      dailyConcept("contact-no-email", "ik heb geen e-mail", "میرے پاس ای میل نہیں ہے", "telefoon", "phrase")
    ],
    listenReplies: [
      ["wat is uw adres?", ["ik woon op Marktstraat 12", "mijn nummer is nul zes", "ik ben dertig jaar"], "ik woon op Marktstraat 12", "پتے کے سوال کا جواب سڑک اور نمبر سے دیں۔"],
      ["wat is uw telefoonnummer?", ["mijn nummer is nul zes", "mijn postcode is 1234 AB", "ik woon in Zwolle"], "mijn nummer is nul zes", "فون نمبر کے سوال کا مناسب جواب۔"],
      ["wat is uw postcode?", ["mijn postcode is 1234 AB", "mijn naam is Ali", "ik heb geen e-mail"], "mijn postcode is 1234 AB", "پوسٹ کوڈ صاف بتائیں۔"]
    ],
    fills: [
      ["wat is uw ___?", ["adres", "straat", "huis"], "adres", "پتہ پوچھنے کا سوال۔"],
      ["mijn ___ is 12", ["huisnummer", "postcode", "woonplaats"], "huisnummer", "گھر نمبر = huisnummer۔"],
      ["mijn ___ is 1234 AB", ["postcode", "telefoonnummer", "straat"], "postcode", "پوسٹ کوڈ کا جملہ۔"],
      ["ik woon ___ Marktstraat 12", ["op", "naar", "met"], "op", "پتہ بتاتے وقت op آتا ہے۔"],
      ["mijn ___ is nul zes", ["nummer", "adres", "straat"], "nummer", "فون نمبر بتانے کا فقرہ۔"],
      ["wat is uw telefoon___?", ["nummer", "straat", "plaats"], "nummer", "telefoonnummer ایک لفظ ہے۔"],
      ["ik heb geen ___", ["e-mail", "postcode", "straat"], "e-mail", "ای میل نہ ہونے کا جملہ۔"],
      ["mijn woon___ is Zwolle", ["plaats", "nummer", "straat"], "plaats", "woonplaats = رہنے کا شہر۔"]
    ],
    situations: [
      ["حال: دفتر میں پتہ پوچھا گیا۔", ["ik woon op Marktstraat 12", "ik ga naar Marktstraat", "ik ben een adres"], "ik woon op Marktstraat 12", "مکمل پتہ بتائیں۔", { mode: "dialogue", speak: "wat is uw adres?" }],
      ["حال: گھر نمبر بتانا ہے۔", ["mijn huisnummer is 12", "mijn postcode is 12", "ik heb 12 jaar"], "mijn huisnummer is 12", "گھر نمبر کے لیے huisnummer۔"],
      ["حال: پوسٹ کوڈ پوچھا گیا۔", ["mijn postcode is 1234 AB", "mijn straat is AB", "mijn nummer is Zwolle"], "mijn postcode is 1234 AB", "پوسٹ کوڈ بتائیں۔"],
      ["حال: فون نمبر پوچھنا ہے۔", ["wat is uw telefoonnummer?", "wat is uw huisnummer?", "hoe heet u?"], "wat is uw telefoonnummer?", "فون نمبر کا سوال۔"],
      ["حال: اپنا فون نمبر بتانا ہے۔", ["mijn nummer is nul zes", "ik woon nul zes", "mijn adres is telefoon"], "mijn nummer is nul zes", "نمبر حصوں میں بتائیں۔"],
      ["حال: ای میل نہیں ہے۔", ["ik heb geen e-mail", "ik ben geen adres", "mijn e-mail woont hier"], "ik heb geen e-mail", "نہ ہونے کے لیے geen۔"],
      ["حال: رہنے کا شہر پوچھنا ہے۔", ["wat is uw woonplaats?", "wat is uw straat?", "hoe oud bent u?"], "wat is uw woonplaats?", "woonplaats کا سوال۔"],
      ["حال: سڑک کا نام دوبارہ سننا ہے۔", ["kunt u de straat herhalen?", "waar is de straat?", "ik heb een straat"], "kunt u de straat herhalen?", "دوبارہ سننے کی درخواست۔"],
      ["حال: نمبر لکھوانا ہے۔", ["schrijf het nummer op", "zeg het nummer snel", "ik ben het nummer"], "schrijf het nummer op", "نمبر لکھنے کو کہیں۔"]
    ],
    builds: [
      ["آپ کا پتہ کیا ہے؟", ["wat", "is", "uw", "adres"], "wat is uw adres", "پتہ پوچھنے کا سوال۔"],
      ["میں Marktstraat 12 پر رہتا / رہتی ہوں", ["ik", "woon", "op", "Marktstraat", "12"], "ik woon op Marktstraat 12", "پتہ بتانے کا جملہ۔"],
      ["میرا نمبر صفر چھ ہے", ["mijn", "nummer", "is", "nul", "zes"], "mijn nummer is nul zes", "فون نمبر کا آغاز۔"],
      ["میرے پاس ای میل نہیں ہے", ["ik", "heb", "geen", "e-mail"], "ik heb geen e-mail", "ای میل نہ ہونے کا جملہ۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-date-appointment",
    unit: "A0: تاریخ اور ملاقات",
    title: "Datum en afspraak",
    description: "تاریخ، ملاقات کا وقت، جلدی یا دیر سے پہنچنا، اور وقت بدلنا۔",
    explanation: practicalExplanation("ملاقات میں دن اور وقت دونوں اہم ہیں", [
      "afspraak ملاقات کا طے شدہ وقت ہے۔",
      "op maandag دن کے لیے اور om tien uur گھڑی کے وقت کے لیے آتا ہے۔",
      "te laat کا مطلب دیر سے اور op tijd کا مطلب وقت پر ہے۔"
    ]),
    concepts: [
      dailyConcept("appointment-date", "datum", "تاریخ", "number-12"),
      dailyConcept("appointment", "afspraak", "ملاقات کا وقت", "rooster"),
      dailyConcept("appointment-today", "vandaag", "آج", "ochtend"),
      dailyConcept("appointment-tomorrow", "morgen", "آنے والا کل", "morgen"),
      dailyConcept("appointment-time", "om tien uur", "دس بجے", "number-10", "phrase"),
      dailyConcept("appointment-on-time", "op tijd", "وقت پر", "rooster"),
      dailyConcept("appointment-late", "te laat", "دیر سے", "wachten"),
      dailyConcept("appointment-early", "te vroeg", "بہت جلدی", "ochtend"),
      dailyConcept("appointment-have", "ik heb een afspraak", "میری ملاقات طے ہے", "rooster", "phrase"),
      dailyConcept("appointment-when", "wanneer is de afspraak?", "ملاقات کب ہے؟", "rooster", "phrase"),
      dailyConcept("appointment-change", "ik wil de afspraak veranderen", "میں ملاقات کا وقت بدلنا چاہتا / چاہتی ہوں", "rooster", "phrase"),
      dailyConcept("appointment-late-sentence", "ik ben te laat", "مجھے دیر ہو گئی ہے", "wachten", "phrase")
    ],
    listenReplies: [
      ["wanneer is uw afspraak?", ["morgen om tien uur", "ik woon in Utrecht", "mijn naam is Ali"], "morgen om tien uur", "ملاقات کا دن اور وقت بتائیں۔"],
      ["bent u op tijd?", ["ja, ik ben op tijd", "ik heb een adres", "morgen is maandag"], "ja, ik ben op tijd", "وقت پر ہونے کا جواب۔"],
      ["kunt u vandaag komen?", ["nee, morgen alstublieft", "ik ben een afspraak", "om tien adres"], "nee, morgen alstublieft", "دوسرا دن مانگنے کا آسان جواب۔"]
    ],
    fills: [
      ["ik heb een ___", ["afspraak", "datum", "maandag"], "afspraak", "ملاقات طے ہونے کا جملہ۔"],
      ["___ is de afspraak?", ["wanneer", "waarom", "wie"], "wanneer", "وقت پوچھنے کے لیے wanneer۔"],
      ["morgen ___ tien uur", ["om", "op", "in"], "om", "گھڑی کے وقت سے پہلے om۔"],
      ["___ maandag", ["op", "om", "met"], "op", "دن سے پہلے op۔"],
      ["ik ben te ___", ["laat", "tijd", "datum"], "laat", "دیر سے = te laat۔"],
      ["ik ben op ___", ["tijd", "laat", "vroeg"], "tijd", "وقت پر = op tijd۔"],
      ["wat is de ___?", ["datum", "afspraak", "tijd"], "datum", "تاریخ پوچھنے کا سوال۔"],
      ["ik wil de afspraak ___", ["veranderen", "wonen", "drinken"], "veranderen", "ملاقات بدلنے کا فقرہ۔"]
    ],
    situations: [
      ["حال: استقبالیہ پر بتانا ہے کہ ملاقات طے ہے۔", ["ik heb een afspraak", "ik ben een datum", "ik wil een straat"], "ik heb een afspraak", "ملاقات کا بنیادی جملہ۔"],
      ["حال: ملاقات کب ہے، پوچھنا ہے۔", ["wanneer is de afspraak?", "waar is de afspraak?", "wie is de datum?"], "wanneer is de afspraak?", "وقت کے لیے wanneer۔"],
      ["حال: ملاقات کل دس بجے ہے۔", ["de afspraak is morgen om tien uur", "de afspraak is op tien morgen", "ik heb tien datum"], "de afspraak is morgen om tien uur", "دن اور وقت ایک ساتھ۔"],
      ["حال: دیر ہو گئی ہے۔", ["ik ben te laat", "ik ben op tijd", "ik heb vroeg"], "ik ben te laat", "دیر سے = te laat۔"],
      ["حال: آپ وقت پر ہیں۔", ["ik ben op tijd", "ik ben te laat", "ik ben de tijd"], "ik ben op tijd", "وقت پر = op tijd۔"],
      ["حال: ملاقات بدلنی ہے۔", ["ik wil de afspraak veranderen", "ik wil de datum wonen", "ik ben afspraak"], "ik wil de afspraak veranderen", "وقت بدلنے کی درخواست۔"],
      ["حال: آج نہیں، کل آ سکتے ہیں۔", ["vandaag niet, morgen wel", "morgen niet, straat wel", "ik ben vandaag"], "vandaag niet, morgen wel", "آج نہیں، کل ہاں۔"],
      ["حال: تاریخ پوچھنی ہے۔", ["wat is de datum?", "hoe heet de datum?", "waar woont de tijd?"], "wat is de datum?", "تاریخ کا سوال۔"],
      ["حال: دوسرا شخص پوچھتا ہے ملاقات کب ہے۔", ["maandag om negen uur", "mijn naam is maandag", "ik woon om negen"], "maandag om negen uur", "دن اور وقت کا مختصر جواب۔", { mode: "dialogue", speak: "wanneer is de afspraak?" }]
    ],
    builds: [
      ["میری ملاقات طے ہے", ["ik", "heb", "een", "afspraak"], "ik heb een afspraak", "ملاقات کا جملہ۔"],
      ["ملاقات کب ہے؟", ["wanneer", "is", "de", "afspraak"], "wanneer is de afspraak", "وقت پوچھنے کا سوال۔"],
      ["مجھے دیر ہو گئی ہے", ["ik", "ben", "te", "laat"], "ik ben te laat", "دیر بتانے کا جملہ۔"],
      ["کل دس بجے", ["morgen", "om", "tien", "uur"], "morgen om tien uur", "دن اور وقت۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-home-needs",
    unit: "A0: گھر کی ضرورت",
    title: "Thuis",
    description: "چابی، کمرہ، دروازہ، روشنی، ہیٹنگ، گرم، سرد، اور خرابی بتانا۔",
    explanation: practicalExplanation("گھر کے مسئلے چھوٹے صاف جملوں میں بتائیں", [
      "open اور dicht دروازے یا کھڑکی کی حالت بتاتے ہیں۔",
      "doet het niet کا مطلب ہے: یہ کام نہیں کر رہا۔",
      "ik heb ... nodig سے فوری ضرورت بتائی جا سکتی ہے۔"
    ]),
    concepts: [
      dailyConcept("home-key", "sleutel", "چابی", "deur"),
      dailyConcept("home-room", "kamer", "کمرہ", "kamer"),
      dailyConcept("home-door", "deur", "دروازہ", "deur"),
      dailyConcept("home-light", "licht", "روشنی", "lamp"),
      dailyConcept("home-heating", "verwarming", "ہیٹنگ", "verwarming"),
      dailyConcept("home-open", "open", "کھلا", "deur"),
      dailyConcept("home-closed", "dicht", "بند", "deur"),
      dailyConcept("home-cold", "koud", "سرد", "verwarming"),
      dailyConcept("home-warm", "warm", "گرم", "verwarming"),
      dailyConcept("home-broken", "kapot", "خراب / ٹوٹا ہوا", "kapot"),
      dailyConcept("home-need-key", "ik heb een sleutel nodig", "مجھے چابی چاہیے", "deur", "phrase"),
      dailyConcept("home-heating-broken", "de verwarming doet het niet", "ہیٹنگ کام نہیں کر رہی", "verwarming", "phrase")
    ],
    listenReplies: [
      ["wat is er kapot?", ["de verwarming doet het niet", "ik woon op nummer twaalf", "morgen om tien uur"], "de verwarming doet het niet", "خرابی صاف بتائیں۔"],
      ["heeft u een sleutel?", ["nee, ik heb een sleutel nodig", "ja, ik ben koud", "de deur is een kamer"], "nee, ik heb een sleutel nodig", "چابی نہ ہونے پر ضرورت بتائیں۔"],
      ["is de deur open?", ["nee, de deur is dicht", "de kamer is warm", "ik heb licht"], "nee, de deur is dicht", "open کے مقابل dicht آتا ہے۔"]
    ],
    fills: [
      ["ik heb een ___ nodig", ["sleutel", "kamer", "deur"], "sleutel", "چابی کی ضرورت۔"],
      ["de deur is ___", ["open", "warm", "licht"], "open", "دروازہ کھلا ہے۔"],
      ["doe de deur ___", ["dicht", "koud", "kapot"], "dicht", "دروازہ بند کریں۔"],
      ["het is ___", ["koud", "sleutel", "kamer"], "koud", "سردی بتانے کا جملہ۔"],
      ["de verwarming doet het ___", ["niet", "open", "warm"], "niet", "کام نہ کرنے کا فقرہ۔"],
      ["het licht is ___", ["kapot", "kamer", "dicht"], "kapot", "روشنی خراب ہے۔"],
      ["waar is mijn ___?", ["sleutel", "warm", "open"], "sleutel", "چابی پوچھنا۔"],
      ["mijn ___ is koud", ["kamer", "deur", "sleutel"], "kamer", "کمرہ سرد ہے۔"]
    ],
    situations: [
      ["حال: چابی چاہیے۔", ["ik heb een sleutel nodig", "ik ben een sleutel", "de sleutel is koud"], "ik heb een sleutel nodig", "ضرورت کا واضح جملہ۔"],
      ["حال: ہیٹنگ کام نہیں کر رہی۔", ["de verwarming doet het niet", "de verwarming is een deur", "ik heb warm nodig"], "de verwarming doet het niet", "گھر کا مسئلہ بتائیں۔"],
      ["حال: کمرہ سرد ہے۔", ["de kamer is koud", "de kamer is open", "ik ben een kamer"], "de kamer is koud", "کمرے کی حالت۔"],
      ["حال: دروازہ کھلا ہے۔", ["de deur is open", "de deur is warm", "het licht is deur"], "de deur is open", "کھلا = open۔"],
      ["حال: دروازہ بند کرنے کو کہنا ہے۔", ["doe de deur dicht", "maak de kamer koud", "ik heb deur"], "doe de deur dicht", "دروازہ بند کرنے کا فقرہ۔"],
      ["حال: روشنی خراب ہے۔", ["het licht is kapot", "het licht is koud", "de sleutel is licht"], "het licht is kapot", "خراب = kapot۔"],
      ["حال: چابی نہیں مل رہی۔", ["waar is mijn sleutel?", "waar woont de deur?", "ik ben mijn sleutel"], "waar is mijn sleutel?", "چابی کی جگہ پوچھیں۔"],
      ["حال: مدد مانگنی ہے کیونکہ دروازہ بند ہے۔", ["kunt u helpen? de deur is dicht", "ik woon in de deur", "de kamer is een sleutel"], "kunt u helpen? de deur is dicht", "مسئلہ اور مدد ایک ساتھ۔"],
      ["حال: کوئی پوچھتا ہے کیا مسئلہ ہے۔", ["de verwarming doet het niet", "mijn naam is Ali", "morgen om tien uur"], "de verwarming doet het niet", "گھر کی خرابی کا جواب۔", { mode: "dialogue", speak: "wat is het probleem?" }]
    ],
    builds: [
      ["مجھے چابی چاہیے", ["ik", "heb", "een", "sleutel", "nodig"], "ik heb een sleutel nodig", "ضرورت کا جملہ۔"],
      ["کمرہ سرد ہے", ["de", "kamer", "is", "koud"], "de kamer is koud", "کمرے کی حالت۔"],
      ["دروازہ بند کریں", ["doe", "de", "deur", "dicht"], "doe de deur dicht", "سادہ ہدایت۔"],
      ["ہیٹنگ کام نہیں کر رہی", ["de", "verwarming", "doet", "het", "niet"], "de verwarming doet het niet", "خرابی کا جملہ۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-child-school",
    unit: "A0: بچہ اور اسکول",
    title: "Kind en school",
    description: "بچے، استاد، اسکول، غیر حاضری، لانے اور لینے کے بنیادی جملے۔",
    explanation: practicalExplanation("اسکول کو مختصر واضح پیغام دیں", [
      "mijn kind کا مطلب میرا بچہ ہے۔",
      "ziek اور komt niet سے غیر حاضری کی وجہ صاف بتائی جا سکتی ہے۔",
      "brengen لانا اور ophalen لینے جانا ہے۔"
    ]),
    concepts: [
      dailyConcept("school-child", "kind", "بچہ", "kind"),
      dailyConcept("school", "school", "اسکول", "school"),
      dailyConcept("school-teacher", "docent", "استاد", "docent"),
      dailyConcept("school-class", "klas", "جماعت", "school"),
      dailyConcept("school-bring", "brengen", "لانا / چھوڑنا", "school"),
      dailyConcept("school-pickup", "ophalen", "لینے جانا", "school"),
      dailyConcept("school-absent", "afwezig", "غیر حاضر", "school"),
      dailyConcept("school-sick", "ziek", "بیمار", "ziek"),
      dailyConcept("school-today", "vandaag", "آج", "ochtend"),
      dailyConcept("school-time", "schooltijd", "اسکول کا وقت", "rooster"),
      dailyConcept("school-child-sick", "mijn kind is ziek", "میرا بچہ بیمار ہے", "kind", "phrase"),
      dailyConcept("school-not-coming", "mijn kind komt vandaag niet", "میرا بچہ آج نہیں آئے گا", "school", "phrase")
    ],
    listenReplies: [
      ["waarom komt uw kind niet?", ["mijn kind is ziek", "ik woon op school", "de klas is tien uur"], "mijn kind is ziek", "غیر حاضری کی وجہ بتائیں۔"],
      ["hoe laat haalt u uw kind op?", ["om drie uur", "in klas twee", "mijn naam is Sara"], "om drie uur", "لینے کا وقت بتائیں۔"],
      ["in welke klas zit uw kind?", ["in klas twee", "vandaag niet", "bij de docent"], "in klas twee", "جماعت کا مختصر جواب۔"]
    ],
    fills: [
      ["mijn kind is ___", ["ziek", "school", "klas"], "ziek", "بیماری بتائیں۔"],
      ["mijn kind komt vandaag ___", ["niet", "op", "met"], "niet", "غیر حاضری کا جملہ۔"],
      ["ik breng mijn kind naar ___", ["school", "klas", "docent"], "school", "بچے کو اسکول لانا۔"],
      ["ik haal mijn kind ___", ["op", "in", "naar"], "op", "لینے کے لیے ophalen۔"],
      ["in welke ___?", ["klas", "schooltijd", "kind"], "klas", "جماعت پوچھنا۔"],
      ["de ___ heet mevrouw De Boer", ["docent", "kind", "school"], "docent", "استاد = docent۔"],
      ["mijn kind is vandaag ___", ["afwezig", "ophalen", "brengen"], "afwezig", "غیر حاضر = afwezig۔"],
      ["hoe laat begint de ___?", ["school", "kind", "docent"], "school", "اسکول شروع ہونے کا وقت۔"]
    ],
    situations: [
      ["حال: اسکول کو بتانا ہے بچہ بیمار ہے۔", ["mijn kind is ziek", "mijn kind is docent", "ik ben school"], "mijn kind is ziek", "بیماری کا صاف پیغام۔"],
      ["حال: بچہ آج نہیں آئے گا۔", ["mijn kind komt vandaag niet", "mijn kind woont vandaag", "ik heb geen schooltijd"], "mijn kind komt vandaag niet", "غیر حاضری کا جملہ۔"],
      ["حال: بچے کو اسکول چھوڑنے جا رہے ہیں۔", ["ik breng mijn kind naar school", "ik haal school op", "mijn kind brengt mij"], "ik breng mijn kind naar school", "لانے کے لیے brengen۔"],
      ["حال: بچے کو تین بجے لینا ہے۔", ["ik haal mijn kind om drie uur op", "ik breng drie uur naar kind", "de docent haalt mij"], "ik haal mijn kind om drie uur op", "لینے کے لیے ophalen۔"],
      ["حال: جماعت پوچھنی ہے۔", ["in welke klas zit mijn kind?", "waar woont de docent?", "hoe kost de school?"], "in welke klas zit mijn kind?", "جماعت کا سوال۔"],
      ["حال: استاد سے بات کرنی ہے۔", ["ik wil de docent spreken", "ik ben de docent", "ik haal de klas op"], "ik wil de docent spreken", "استاد سے بات کی درخواست۔"],
      ["حال: اسکول کب شروع ہوتا ہے؟", ["hoe laat begint de school?", "waar is de schooltijd?", "wie begint het kind?"], "hoe laat begint de school?", "شروع ہونے کا وقت پوچھیں۔"],
      ["حال: بچہ غیر حاضر ہے۔", ["mijn kind is afwezig", "mijn kind is ophalen", "de klas is ziek"], "mijn kind is afwezig", "غیر حاضر = afwezig۔"],
      ["حال: اسکول پوچھتا ہے بچہ کیوں نہیں آیا۔", ["mijn kind is ziek", "om drie uur", "in klas twee"], "mijn kind is ziek", "مختصر وجہ بتائیں۔", { mode: "dialogue", speak: "waarom komt uw kind niet?" }]
    ],
    builds: [
      ["میرا بچہ بیمار ہے", ["mijn", "kind", "is", "ziek"], "mijn kind is ziek", "بیماری کا پیغام۔"],
      ["میرا بچہ آج نہیں آئے گا", ["mijn", "kind", "komt", "vandaag", "niet"], "mijn kind komt vandaag niet", "غیر حاضری کا پیغام۔"],
      ["میں اپنے بچے کو اسکول لاتا / لاتی ہوں", ["ik", "breng", "mijn", "kind", "naar", "school"], "ik breng mijn kind naar school", "اسکول لانے کا جملہ۔"],
      ["میں اپنے بچے کو تین بجے لیتا / لیتی ہوں", ["ik", "haal", "mijn", "kind", "om", "drie", "uur", "op"], "ik haal mijn kind om drie uur op", "لینے کا وقت۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-work-basics",
    unit: "A0: کام",
    title: "Werk",
    description: "کام شروع اور ختم کرنا، وقفہ، ساتھی، دیر، اور بیماری کی اطلاع۔",
    explanation: practicalExplanation("کام پر فوری ضروری بات کریں", [
      "beginnen شروع کرنا اور stoppen ختم کرنا ہے۔",
      "pauze کام کے درمیان وقفہ ہے۔",
      "ik kan vandaag niet komen سے آج نہ آنے کی اطلاع دی جا سکتی ہے۔"
    ]),
    concepts: [
      dailyConcept("work", "werk", "کام", "werk"),
      dailyConcept("work-colleague", "collega", "کام کا ساتھی", "collega"),
      dailyConcept("work-manager", "leidinggevende", "کام کا ذمہ دار", "werk"),
      dailyConcept("work-start", "beginnen", "شروع کرنا", "werk"),
      dailyConcept("work-finish", "stoppen", "ختم کرنا", "werk"),
      dailyConcept("work-break", "pauze", "وقفہ", "rooster"),
      dailyConcept("work-late", "te laat", "دیر سے", "wachten"),
      dailyConcept("work-sick", "ziek", "بیمار", "ziek"),
      dailyConcept("work-today", "vandaag", "آج", "ochtend"),
      dailyConcept("work-tomorrow", "morgen", "آنے والا کل", "morgen"),
      dailyConcept("work-cannot-come", "ik kan vandaag niet komen", "میں آج نہیں آ سکتا / سکتی", "werk", "phrase"),
      dailyConcept("work-start-nine", "ik begin om negen uur", "میں نو بجے شروع کرتا / کرتی ہوں", "number-9", "phrase")
    ],
    listenReplies: [
      ["hoe laat begint u?", ["ik begin om negen uur", "ik ben vandaag ziek", "mijn collega heet Ali"], "ik begin om negen uur", "شروع ہونے کا وقت بتائیں۔"],
      ["kunt u vandaag werken?", ["nee, ik ben ziek", "om vijf uur", "mijn werk is hier"], "nee, ik ben ziek", "نہ آ سکنے کی مختصر وجہ۔"],
      ["wanneer is de pauze?", ["om twaalf uur", "morgen werken", "bij mijn collega"], "om twaalf uur", "وقفے کا وقت بتائیں۔"]
    ],
    fills: [
      ["ik ___ om negen uur", ["begin", "stop", "woon"], "begin", "کام شروع ہونے کا وقت۔"],
      ["ik stop om vijf ___", ["uur", "werk", "pauze"], "uur", "ختم ہونے کا وقت۔"],
      ["de ___ is om twaalf uur", ["pauze", "collega", "ziek"], "pauze", "وقفے کا وقت۔"],
      ["ik ben te ___", ["laat", "werk", "morgen"], "laat", "دیر سے = te laat۔"],
      ["ik kan vandaag niet ___", ["komen", "beginnen", "pauze"], "komen", "نہ آنے کا فقرہ۔"],
      ["ik ben vandaag ___", ["ziek", "collega", "werk"], "ziek", "بیماری کی اطلاع۔"],
      ["dit is mijn ___", ["collega", "pauze", "uur"], "collega", "ساتھی کا تعارف۔"],
      ["ik werk ___", ["morgen", "stoppen", "pauze"], "morgen", "کل کام کرنے کا مختصر جملہ۔"]
    ],
    situations: [
      ["حال: کام کب شروع کرتے ہیں، بتانا ہے۔", ["ik begin om negen uur", "ik stop om negen uur", "ik ben negen werk"], "ik begin om negen uur", "شروع ہونے کا وقت۔"],
      ["حال: کام پانچ بجے ختم ہوتا ہے۔", ["ik stop om vijf uur", "ik begin om vijf uur", "ik woon vijf uur"], "ik stop om vijf uur", "ختم ہونے کا وقت۔"],
      ["حال: وقفہ پوچھنا ہے۔", ["wanneer is de pauze?", "waar woont de pauze?", "wie is mijn werk?"], "wanneer is de pauze?", "وقفے کا وقت پوچھیں۔"],
      ["حال: دیر ہو گئی ہے۔", ["ik ben te laat", "ik ben op werk", "ik heb laat"], "ik ben te laat", "دیر کی اطلاع۔"],
      ["حال: آج بیمار ہیں۔", ["ik ben vandaag ziek", "ik ben vandaag collega", "ik heb werk ziek"], "ik ben vandaag ziek", "بیماری کی صاف اطلاع۔"],
      ["حال: آج کام پر نہیں آ سکتے۔", ["ik kan vandaag niet komen", "ik kom vandaag werk", "ik ben niet pauze"], "ik kan vandaag niet komen", "نہ آنے کا جملہ۔"],
      ["حال: اپنے ساتھی کا تعارف کرانا ہے۔", ["dit is mijn collega", "dit is mijn pauze", "ik ben collega morgen"], "dit is mijn collega", "ساتھی = collega۔"],
      ["حال: ذمہ دار سے بات کرنی ہے۔", ["ik wil mijn leidinggevende spreken", "ik ben leidinggevende", "waar is mijn pauze werken"], "ik wil mijn leidinggevende spreken", "ذمہ دار سے بات کی درخواست۔"],
      ["حال: کام سے فون آتا ہے اور پوچھا جاتا ہے آج آ سکتے ہیں؟", ["nee, ik ben ziek", "om negen uur", "dit is mijn collega"], "nee, ik ben ziek", "مختصر واضح جواب۔", { mode: "dialogue", speak: "kunt u vandaag werken?" }]
    ],
    builds: [
      ["میں نو بجے شروع کرتا / کرتی ہوں", ["ik", "begin", "om", "negen", "uur"], "ik begin om negen uur", "کام کا وقت۔"],
      ["مجھے دیر ہو گئی ہے", ["ik", "ben", "te", "laat"], "ik ben te laat", "دیر کی اطلاع۔"],
      ["میں آج بیمار ہوں", ["ik", "ben", "vandaag", "ziek"], "ik ben vandaag ziek", "بیماری کی اطلاع۔"],
      ["میں آج نہیں آ سکتا / سکتی", ["ik", "kan", "vandaag", "niet", "komen"], "ik kan vandaag niet komen", "نہ آنے کا پیغام۔"]
    ]
  }),
  makeA0DailyLesson({
    id: "a0-weather-clothing-safety",
    unit: "A0: موسم اور حفاظت",
    title: "Weer en veiligheid",
    description: "بارش، سردی، ضروری کپڑے، اور عام حفاظتی نشان سمجھنا۔",
    explanation: practicalExplanation("موسم اور نشان فوری فیصلہ کرنے میں مدد دیتے ہیں", [
      "het regent کا مطلب بارش ہو رہی ہے۔",
      "jas اور paraplu موسم کے ضروری الفاظ ہیں۔",
      "verboden، gevaar اور stop حفاظتی نشانوں پر آتے ہیں۔"
    ]),
    concepts: [
      dailyConcept("weather-rain", "regen", "بارش", "water"),
      dailyConcept("weather-raining", "het regent", "بارش ہو رہی ہے", "water", "phrase"),
      dailyConcept("weather-cold", "koud", "سرد", "jas"),
      dailyConcept("weather-warm", "warm", "گرم", "jas"),
      dailyConcept("clothing-coat", "jas", "کوٹ / جیکٹ", "jas"),
      dailyConcept("clothing-umbrella", "paraplu", "چھتری", "water"),
      dailyConcept("safety-stop", "stop", "رکیں", "uitgang"),
      dailyConcept("safety-danger", "gevaar", "خطرہ", "kapot"),
      dailyConcept("safety-forbidden", "verboden", "منع ہے", "ingang"),
      dailyConcept("safety-entrance", "ingang", "داخلہ", "ingang"),
      dailyConcept("safety-exit", "uitgang", "خروج", "uitgang"),
      dailyConcept("weather-need-coat", "ik heb een jas nodig", "مجھے جیکٹ چاہیے", "jas", "phrase")
    ],
    listenReplies: [
      ["regent het?", ["ja, het regent", "de uitgang is daar", "ik ben een jas"], "ja, het regent", "بارش کے سوال کا جواب۔"],
      ["waar is de uitgang?", ["de uitgang is daar", "ik heb een paraplu", "het is warm"], "de uitgang is daar", "خروج کی سمت بتائیں۔"],
      ["mag ik hier naar binnen?", ["nee, het is verboden", "ja, het regent", "ik heb een jas"], "nee, het is verboden", "منع ہونے کا جواب۔"]
    ],
    fills: [
      ["het ___", ["regent", "jas", "gevaar"], "regent", "بارش ہونے کا جملہ۔"],
      ["het is ___", ["koud", "paraplu", "ingang"], "koud", "سردی بتائیں۔"],
      ["ik heb een ___ nodig", ["jas", "regen", "stop"], "jas", "جیکٹ کی ضرورت۔"],
      ["neem een ___ mee", ["paraplu", "uitgang", "gevaar"], "paraplu", "چھتری ساتھ لیں۔"],
      ["dit is de ___", ["ingang", "koud", "regen"], "ingang", "داخلہ پہچانیں۔"],
      ["waar is de ___?", ["uitgang", "jas", "warm"], "uitgang", "خروج پوچھیں۔"],
      ["___!", ["stop", "regen", "jas"], "stop", "رکنے کی ہدایت۔"],
      ["dit is ___", ["verboden", "paraplu", "koud"], "verboden", "منع ہونے کا نشان۔"]
    ],
    situations: [
      ["حال: بارش ہو رہی ہے۔", ["het regent", "het is een jas", "ik ben regen"], "het regent", "موسم کا جملہ۔"],
      ["حال: بہت سردی ہے۔", ["het is koud", "het is verboden", "ik heb uitgang"], "het is koud", "سرد = koud۔"],
      ["حال: جیکٹ چاہیے۔", ["ik heb een jas nodig", "ik ben een jas", "de jas regent"], "ik heb een jas nodig", "ضرورت کا جملہ۔"],
      ["حال: کسی کو چھتری ساتھ لینے کو کہنا ہے۔", ["neem een paraplu mee", "stop de paraplu", "ik woon in regen"], "neem een paraplu mee", "چھتری ساتھ لینے کی ہدایت۔"],
      ["حال: داخلہ پوچھنا ہے۔", ["waar is de ingang?", "waar is het gevaar?", "hoe koud is de jas?"], "waar is de ingang?", "داخلہ = ingang۔"],
      ["حال: خروج پوچھنا ہے۔", ["waar is de uitgang?", "waar is de paraplu?", "wat kost koud?"], "waar is de uitgang?", "خروج = uitgang۔"],
      ["حال: خطرے کا نشان ہے۔", ["gevaar", "warm", "ingang"], "gevaar", "خطرہ = gevaar۔"],
      ["حال: یہاں جانا منع ہے۔", ["verboden", "het regent", "jas nodig"], "verboden", "منع ہے = verboden۔"],
      ["حال: کوئی پوچھتا ہے کیا اندر جا سکتا ہوں؟", ["nee, het is verboden", "ja, het is koud", "de uitgang is warm"], "nee, het is verboden", "حفاظتی نشان کے مطابق جواب۔", { mode: "dialogue", speak: "mag ik hier naar binnen?" }]
    ],
    builds: [
      ["بارش ہو رہی ہے", ["het", "regent"], "het regent", "موسم کا جملہ۔"],
      ["مجھے جیکٹ چاہیے", ["ik", "heb", "een", "jas", "nodig"], "ik heb een jas nodig", "ضرورت کا جملہ۔"],
      ["خروج کہاں ہے؟", ["waar", "is", "de", "uitgang"], "waar is de uitgang", "خروج پوچھنے کا سوال۔"],
      ["نہیں، یہ منع ہے", ["nee", "het", "is", "verboden"], "nee het is verboden", "حفاظتی جواب۔"]
    ]
  })
);

a1Lessons.push(
  makeA1PracticalLesson({
    id: "a1-daily-routine",
    unit: "A1: روزمرہ معمول",
    title: "Mijn dag",
    description: "اٹھنے سے سونے تک اپنا روزمرہ معمول اور وقت بتانا۔",
    explanation: practicalExplanation("اپنے دن کے کام وقت کے ساتھ بتائیں", ["روزمرہ کام کے ساتھ عموماً وقت بتایا جاتا ہے۔", "eerst، daarna، اور dan کاموں کی ترتیب واضح کرتے ہیں۔", "آسان A1 جملے مختصر رکھیں: فاعل، فعل، وقت یا جگہ۔"]),
    concepts: [
      dailyConcept("routine-morning", "ochtend", "صبح", "ochtend"), dailyConcept("routine-evening", "avond", "شام", "avond"),
      dailyConcept("routine-work", "werk", "کام", "werk"), dailyConcept("routine-food", "ontbijt", "ناشتہ", "brood"),
      dailyConcept("routine-sleep", "slapen", "سونا", "slapen"), dailyConcept("routine-bus", "bus", "بس", "bus"),
      dailyConcept("routine-school", "school", "اسکول", "school"), dailyConcept("routine-wait", "wachten", "انتظار کرنا", "wachten"),
      a1Phrase("routine-p1", "ik sta om zeven uur op", "میں سات بجے اٹھتا / اٹھتی ہوں", "حال: صبح اٹھنے کا وقت بتانا ہے۔"),
      a1Phrase("routine-p2", "ik ontbijt om half acht", "میں ساڑھے سات بجے ناشتہ کرتا / کرتی ہوں", "حال: ناشتے کا وقت بتانا ہے۔"),
      a1Phrase("routine-p3", "ik ga met de bus naar werk", "میں بس سے کام پر جاتا / جاتی ہوں", "حال: کام پر جانے کا طریقہ بتانا ہے۔"),
      a1Phrase("routine-p4", "ik begin om negen uur", "میں نو بجے شروع کرتا / کرتی ہوں", "حال: کام شروع ہونے کا وقت بتانا ہے۔"),
      a1Phrase("routine-p5", "ik heb om twaalf uur pauze", "میرا بارہ بجے وقفہ ہے", "حال: وقفے کا وقت بتانا ہے۔"),
      a1Phrase("routine-p6", "ik stop om vijf uur", "میں پانچ بجے کام ختم کرتا / کرتی ہوں", "حال: کام ختم ہونے کا وقت بتانا ہے۔"),
      a1Phrase("routine-p7", "daarna ga ik naar huis", "اس کے بعد میں گھر جاتا / جاتی ہوں", "حال: اگلا کام بتانا ہے۔"),
      a1Phrase("routine-p8", "ik kook in de avond", "میں شام کو کھانا پکاتا / پکاتی ہوں", "حال: شام کا کام بتانا ہے۔"),
      a1Phrase("routine-p9", "ik kijk na het eten televisie", "میں کھانے کے بعد ٹی وی دیکھتا / دیکھتی ہوں", "حال: کھانے کے بعد کا کام بتانا ہے۔"),
      a1Phrase("routine-p10", "ik ga om elf uur slapen", "میں گیارہ بجے سونے جاتا / جاتی ہوں", "حال: سونے کا وقت بتانا ہے۔"),
      a1Phrase("routine-p11", "eerst breng ik mijn kind naar school", "پہلے میں بچے کو اسکول چھوڑتا / چھوڑتی ہوں", "حال: دن کا پہلا کام بتانا ہے۔"),
      a1Phrase("routine-p12", "dan ga ik naar mijn werk", "پھر میں اپنے کام پر جاتا / جاتی ہوں", "حال: ترتیب میں دوسرا کام بتانا ہے۔"),
      a1Phrase("routine-p13", "vandaag werk ik niet", "آج میں کام نہیں کرتا / کرتی", "حال: آج چھٹی ہونے کی بات بتانا ہے۔")
    ],
    listenReplies: [["hoe laat staat u op?", ["om zeven uur", "met de bus", "in de avond"], "om zeven uur", "اٹھنے کا وقت بتائیں۔"], ["hoe gaat u naar werk?", ["met de bus", "om negen uur", "na het eten"], "met de bus", "سفر کا طریقہ بتائیں۔"], ["wat doet u daarna?", ["daarna ga ik naar huis", "ik begin om negen uur", "dit is mijn werk"], "daarna ga ik naar huis", "اگلا کام بتائیں۔"]],
    builds: [["میں سات بجے اٹھتا / اٹھتی ہوں", ["ik", "sta", "om", "zeven", "uur", "op"], "ik sta om zeven uur op", "opstaan جملے میں الگ ہوتا ہے۔"], ["میں بس سے کام پر جاتا / جاتی ہوں", ["ik", "ga", "met", "de", "bus", "naar", "werk"], "ik ga met de bus naar werk", "سفر کا جملہ۔"], ["میرا بارہ بجے وقفہ ہے", ["ik", "heb", "om", "twaalf", "uur", "pauze"], "ik heb om twaalf uur pauze", "وقفے کا وقت۔"], ["پھر میں گھر جاتا / جاتی ہوں", ["daarna", "ga", "ik", "naar", "huis"], "daarna ga ik naar huis", "ترتیب والا جملہ۔"], ["میں شام کو کھانا پکاتا / پکاتی ہوں", ["ik", "kook", "in", "de", "avond"], "ik kook in de avond", "شام کا معمول۔"], ["میں گیارہ بجے سوتا / سوتی ہوں", ["ik", "ga", "om", "elf", "uur", "slapen"], "ik ga om elf uur slapen", "سونے کا وقت۔"]]
  }),
  makeA1PracticalLesson({
    id: "a1-plans-invitations",
    unit: "A1: منصوبہ اور دعوت",
    title: "Afspreken",
    description: "دعوت دینا، وقت طے کرنا، ہاں یا ادب سے انکار کرنا۔",
    explanation: practicalExplanation("چھوٹا منصوبہ مل کر طے کریں", ["wil je...? عام دعوت ہے۔", "ja, graag دعوت قبول کرنے کا آسان جواب ہے۔", "sorry, ik kan niet ادب سے انکار ہے؛ پھر دوسرا دن تجویز کیا جا سکتا ہے۔"]),
    concepts: [
      dailyConcept("plans-calendar", "agenda", "اوقات کی کتاب", "rooster"), dailyConcept("plans-coffee", "koffie", "کافی", "koffie"),
      dailyConcept("plans-party", "feest", "تقریب", "feest"), dailyConcept("plans-today", "vandaag", "آج", "ochtend"),
      dailyConcept("plans-tomorrow", "morgen", "آنے والا کل", "morgen"), dailyConcept("plans-evening", "avond", "شام", "avond"),
      dailyConcept("plans-phone", "telefoon", "فون", "telefoon"), dailyConcept("plans-message", "bericht", "پیغام", "bericht"),
      a1Phrase("plans-p1", "wil je koffie drinken?", "کیا تم کافی پینا چاہتے ہو؟", "حال: دوست کو کافی کی دعوت دینی ہے۔"),
      a1Phrase("plans-p2", "ja graag", "جی ہاں، خوشی سے", "حال: دعوت قبول کرنی ہے۔", "wil je morgen komen?"),
      a1Phrase("plans-p3", "sorry ik kan niet", "معاف کیجیے، میں نہیں آ سکتا / سکتی", "حال: ادب سے دعوت رد کرنی ہے۔", "kun je vanavond komen?"),
      a1Phrase("plans-p4", "heb je morgen tijd?", "کیا تمہارے پاس کل وقت ہے؟", "حال: کل کا وقت پوچھنا ہے۔"),
      a1Phrase("plans-p5", "zullen we om drie uur afspreken?", "کیا ہم تین بجے ملیں؟", "حال: ملنے کا وقت تجویز کرنا ہے۔"),
      a1Phrase("plans-p6", "drie uur is goed", "تین بجے ٹھیک ہے", "حال: تجویز کردہ وقت ماننا ہے۔"),
      a1Phrase("plans-p7", "kan het om vier uur?", "کیا چار بجے ہو سکتا ہے؟", "حال: دوسرا وقت مانگنا ہے۔"),
      a1Phrase("plans-p8", "waar spreken we af?", "ہم کہاں ملیں گے؟", "حال: ملنے کی جگہ پوچھنی ہے۔"),
      a1Phrase("plans-p9", "we spreken af bij het station", "ہم اسٹیشن کے پاس ملیں گے", "حال: ملنے کی جگہ بتانی ہے۔"),
      a1Phrase("plans-p10", "ik bel je vanavond", "میں تمہیں شام کو فون کروں گا / گی", "حال: فون کرنے کا وقت بتانا ہے۔"),
      a1Phrase("plans-p11", "stuur mij een bericht", "مجھے ایک پیغام بھیجیں", "حال: پیغام بھیجنے کو کہنا ہے۔"),
      a1Phrase("plans-p12", "tot morgen", "کل ملیں گے", "حال: کل ملنے پر رخصت ہونا ہے۔"),
      a1Phrase("plans-p13", "de afspraak is veranderd", "ملاقات کا وقت بدل گیا ہے", "حال: منصوبہ بدلنے کی اطلاع دینی ہے۔")
    ],
    listenReplies: [["wil je koffie drinken?", ["ja graag", "om drie uur", "bij het station"], "ja graag", "دعوت قبول کریں۔"], ["heb je morgen tijd?", ["nee sorry ik kan niet", "we spreken bij het station", "stuur een bericht"], "nee sorry ik kan niet", "وقت نہ ہونے کا جواب۔"], ["waar spreken we af?", ["bij het station", "om vier uur", "tot morgen"], "bij het station", "جگہ کا جواب دیں۔"]],
    builds: [["کیا تم کافی پینا چاہتے ہو؟", ["wil", "je", "koffie", "drinken"], "wil je koffie drinken", "دعوت کا سوال۔"], ["معاف کیجیے، میں نہیں آ سکتا / سکتی", ["sorry", "ik", "kan", "niet"], "sorry ik kan niet", "ادب سے انکار۔"], ["کیا ہم تین بجے ملیں؟", ["zullen", "we", "om", "drie", "uur", "afspreken"], "zullen we om drie uur afspreken", "وقت تجویز کریں۔"], ["ہم کہاں ملیں گے؟", ["waar", "spreken", "we", "af"], "waar spreken we af", "جگہ کا سوال۔"], ["میں شام کو فون کروں گا / گی", ["ik", "bel", "je", "vanavond"], "ik bel je vanavond", "فون کا منصوبہ۔"], ["مجھے پیغام بھیجیں", ["stuur", "mij", "een", "bericht"], "stuur mij een bericht", "پیغام کی درخواست۔"]]
  }),
  makeA1PracticalLesson({
    id: "a1-cafe-ordering",
    unit: "A1: کیفے اور کھانا",
    title: "In een café",
    description: "مینو سمجھنا، کھانا پینا منگوانا، اور بل مانگنا۔",
    explanation: practicalExplanation("کیفے میں ادب سے مکمل آرڈر دیں", ["ik wil graag... ادب سے چیز مانگنے کا بنیادی طریقہ ہے۔", "voor mij... سے اپنا آرڈر بتایا جا سکتا ہے۔", "de rekening alstublieft سے بل مانگیں۔"]),
    concepts: [
      dailyConcept("cafe-menu", "menu", "کھانے کی فہرست", "eten"), dailyConcept("cafe-coffee", "koffie", "کافی", "koffie"),
      dailyConcept("cafe-tea", "thee", "چائے", "thee"), dailyConcept("cafe-water", "water", "پانی", "water"),
      dailyConcept("cafe-bread", "brood", "روٹی", "brood"), dailyConcept("cafe-rice", "rijst", "چاول", "rijst"),
      dailyConcept("cafe-food", "eten", "کھانا", "eten"), dailyConcept("cafe-bill", "rekening", "بل", "bon"),
      a1Phrase("cafe-p1", "mag ik de kaart alstublieft?", "کیا مجھے مینو مل سکتا ہے؟", "حال: مینو مانگنا ہے۔"),
      a1Phrase("cafe-p2", "ik wil graag koffie", "مجھے کافی چاہیے", "حال: کافی منگوانی ہے۔"),
      a1Phrase("cafe-p3", "voor mij een thee", "میرے لیے ایک چائے", "حال: اپنا مشروب بتانا ہے۔"),
      a1Phrase("cafe-p4", "zonder suiker alstublieft", "چینی کے بغیر، برائے مہربانی", "حال: چینی کے بغیر مشروب مانگنا ہے۔"),
      a1Phrase("cafe-p5", "heeft u iets zonder vlees?", "کیا آپ کے پاس گوشت کے بغیر کچھ ہے؟", "حال: گوشت کے بغیر کھانا پوچھنا ہے۔"),
      a1Phrase("cafe-p6", "wat wilt u drinken?", "آپ کیا پینا چاہتے ہیں؟", "حال: مشروب پوچھنا ہے۔"),
      a1Phrase("cafe-p7", "ik neem de soep", "میں سوپ لوں گا / گی", "حال: کھانے کا انتخاب بتانا ہے۔"),
      a1Phrase("cafe-p8", "dit is niet mijn bestelling", "یہ میرا آرڈر نہیں ہے", "حال: غلط آرڈر کی اطلاع دینی ہے۔"),
      a1Phrase("cafe-p9", "de rekening alstublieft", "بل، برائے مہربانی", "حال: بل مانگنا ہے۔"),
      a1Phrase("cafe-p10", "kan ik met pin betalen?", "کیا میں کارڈ سے ادائیگی کر سکتا / سکتی ہوں؟", "حال: کارڈ سے ادائیگی پوچھنی ہے۔"),
      a1Phrase("cafe-p11", "het eten is lekker", "کھانا مزیدار ہے", "حال: کھانے کی تعریف کرنی ہے۔"),
      a1Phrase("cafe-p12", "ik heb nog niets gekregen", "مجھے ابھی تک کچھ نہیں ملا", "حال: آرڈر نہ ملنے کی اطلاع دینی ہے۔"),
      a1Phrase("cafe-p13", "dank u wel", "آپ کا شکریہ", "حال: خدمت کے بعد شکریہ کہنا ہے۔")
    ],
    listenReplies: [["wat wilt u drinken?", ["voor mij een thee", "de rekening alstublieft", "het eten is lekker"], "voor mij een thee", "مشروب کا آرڈر دیں۔"], ["wilt u suiker?", ["nee zonder suiker alstublieft", "ik neem de soep", "kan ik pinnen"], "nee zonder suiker alstublieft", "چینی نہ لینے کا جواب۔"], ["was alles goed?", ["ja het eten is lekker", "voor mij water", "dit is de rekening"], "ja het eten is lekker", "کھانے کے بارے میں جواب دیں۔"]],
    builds: [["کیا مجھے مینو مل سکتا ہے؟", ["mag", "ik", "de", "kaart", "alstublieft"], "mag ik de kaart alstublieft", "مینو کی درخواست۔"], ["مجھے کافی چاہیے", ["ik", "wil", "graag", "koffie"], "ik wil graag koffie", "ادب سے آرڈر۔"], ["گوشت کے بغیر", ["zonder", "vlees"], "zonder vlees", "کھانے کی ضرورت۔"], ["یہ میرا آرڈر نہیں ہے", ["dit", "is", "niet", "mijn", "bestelling"], "dit is niet mijn bestelling", "غلط آرڈر بتائیں۔"], ["بل، برائے مہربانی", ["de", "rekening", "alstublieft"], "de rekening alstublieft", "بل مانگیں۔"], ["کیا میں کارڈ سے ادائیگی کر سکتا / سکتی ہوں؟", ["kan", "ik", "met", "pin", "betalen"], "kan ik met pin betalen", "ادائیگی کا سوال۔"]]
  }),
  makeA1PracticalLesson({
    id: "a1-shopping-clothes",
    unit: "A1: کپڑوں کی خریداری",
    title: "Kleding kopen",
    description: "سائز، رنگ، قیمت، پہن کر دیکھنا، اور آسان تبدیلی۔",
    explanation: practicalExplanation("دکان میں چیز کے بارے میں واضح سوال کریں", ["maat سائز اور kleur رنگ ہے۔", "mag ik dit passen? سے پہن کر دیکھنے کی اجازت پوچھیں۔", "te groot اور te klein سے سائز کا مسئلہ بتائیں۔"]),
    concepts: [
      dailyConcept("clothes-coat", "jas", "جیکٹ", "jas"), dailyConcept("clothes-shop", "winkel", "دکان", "winkel"),
      dailyConcept("clothes-size", "maat", "سائز", "maat"), dailyConcept("clothes-price", "prijs", "قیمت", "prijs"),
      dailyConcept("clothes-cheap", "goedkoop", "سستا", "goedkoop"), dailyConcept("clothes-expensive", "duur", "مہنگا", "prijs"),
      dailyConcept("clothes-cashier", "kassa", "رقم لینے کی جگہ", "kassa"), dailyConcept("clothes-receipt", "bon", "رسید", "bon"),
      a1Phrase("clothes-p1", "hoeveel kost deze jas?", "یہ جیکٹ کتنے کی ہے؟", "حال: جیکٹ کی قیمت پوچھنی ہے۔"),
      a1Phrase("clothes-p2", "heeft u maat M?", "کیا آپ کے پاس سائز M ہے؟", "حال: اپنا سائز پوچھنا ہے۔"),
      a1Phrase("clothes-p3", "mag ik dit passen?", "کیا میں اسے پہن کر دیکھ سکتا / سکتی ہوں؟", "حال: کپڑا پہن کر دیکھنا ہے۔"),
      a1Phrase("clothes-p4", "waar is de paskamer?", "کپڑے پہن کر دیکھنے کا کمرہ کہاں ہے؟", "حال: آزمائشی کمرہ پوچھنا ہے۔"),
      a1Phrase("clothes-p5", "deze jas is te groot", "یہ جیکٹ بہت بڑی ہے", "حال: جیکٹ بڑی ہونے کی بات بتانی ہے۔"),
      a1Phrase("clothes-p6", "de schoenen zijn te klein", "جوتے بہت چھوٹے ہیں", "حال: جوتے چھوٹے ہونے کی بات بتانی ہے۔"),
      a1Phrase("clothes-p7", "heeft u een andere kleur?", "کیا آپ کے پاس دوسرا رنگ ہے؟", "حال: دوسرا رنگ پوچھنا ہے۔"),
      a1Phrase("clothes-p8", "ik neem deze", "میں یہ لوں گا / گی", "حال: چیز خریدنے کا فیصلہ بتانا ہے۔"),
      a1Phrase("clothes-p9", "kan ik met pin betalen?", "کیا میں کارڈ سے پیسے دے سکتا / سکتی ہوں؟", "حال: کارڈ سے ادائیگی پوچھنی ہے۔"),
      a1Phrase("clothes-p10", "mag ik de bon?", "کیا مجھے رسید مل سکتی ہے؟", "حال: رسید مانگنی ہے۔"),
      a1Phrase("clothes-p11", "ik wil dit ruilen", "میں اسے بدلنا چاہتا / چاہتی ہوں", "حال: چیز بدلنے کی درخواست کرنی ہے۔"),
      a1Phrase("clothes-p12", "de jas is kapot", "جیکٹ خراب ہے", "حال: خرابی بتانی ہے۔"),
      a1Phrase("clothes-p13", "waar is de kassa?", "رقم دینے کی جگہ کہاں ہے؟", "حال: کاؤنٹر پوچھنا ہے۔")
    ],
    listenReplies: [["welke maat heeft u?", ["maat M", "twintig euro", "de blauwe jas"], "maat M", "سائز بتائیں۔"], ["wilt u deze jas?", ["ja ik neem deze", "waar is de paskamer", "de schoenen zijn klein"], "ja ik neem deze", "خریدنے کا فیصلہ بتائیں۔"], ["wat is het probleem?", ["de jas is te groot", "ik betaal met pin", "de kassa is daar"], "de jas is te groot", "سائز کا مسئلہ بتائیں۔"]],
    builds: [["یہ جیکٹ کتنے کی ہے؟", ["hoeveel", "kost", "deze", "jas"], "hoeveel kost deze jas", "قیمت کا سوال۔"], ["کیا میں اسے پہن کر دیکھ سکتا / سکتی ہوں؟", ["mag", "ik", "dit", "passen"], "mag ik dit passen", "اجازت کا سوال۔"], ["یہ جیکٹ بہت بڑی ہے", ["deze", "jas", "is", "te", "groot"], "deze jas is te groot", "سائز کا مسئلہ۔"], ["کیا آپ کے پاس دوسرا رنگ ہے؟", ["heeft", "u", "een", "andere", "kleur"], "heeft u een andere kleur", "رنگ کا سوال۔"], ["میں یہ لوں گا / گی", ["ik", "neem", "deze"], "ik neem deze", "خریدنے کا فیصلہ۔"], ["میں اسے بدلنا چاہتا / چاہتی ہوں", ["ik", "wil", "dit", "ruilen"], "ik wil dit ruilen", "تبدیلی کی درخواست۔"]]
  }),
  makeA1PracticalLesson({
    id: "a1-public-transport",
    unit: "A1: عوامی سفر",
    title: "Met bus en trein",
    description: "راستہ، پلیٹ فارم، روانگی، تاخیر، اور گاڑی بدلنا۔",
    explanation: practicalExplanation("سفر میں جگہ اور وقت دونوں پوچھیں", ["spoor ٹرین کا پلیٹ فارم اور halte بس کا اسٹاپ ہے۔", "vertrekken روانہ ہونا اور aankomen پہنچنا ہے۔", "overstappen کا مطلب دوسری بس یا ٹرین لینا ہے۔"]),
    concepts: [
      dailyConcept("travel-bus", "bus", "بس", "bus"), dailyConcept("travel-train", "trein", "ٹرین", "trein"),
      dailyConcept("travel-station", "station", "اسٹیشن", "station"), dailyConcept("travel-stop", "halte", "بس اسٹاپ", "halte"),
      dailyConcept("travel-ticket", "kaartje", "ٹکٹ", "kaartje"), dailyConcept("travel-left", "links", "بائیں", "links"),
      dailyConcept("travel-right", "rechts", "دائیں", "rechts"), dailyConcept("travel-straight", "rechtdoor", "سیدھا", "rechtdoor"),
      a1Phrase("travel-p1", "ik wil een kaartje naar Utrecht", "مجھے Utrecht کا ٹکٹ چاہیے", "حال: منزل کا ٹکٹ خریدنا ہے۔"),
      a1Phrase("travel-p2", "hoe laat vertrekt de trein?", "ٹرین کتنے بجے روانہ ہوتی ہے؟", "حال: روانگی کا وقت پوچھنا ہے۔"),
      a1Phrase("travel-p3", "van welk spoor vertrekt de trein?", "ٹرین کس پلیٹ فارم سے جاتی ہے؟", "حال: پلیٹ فارم پوچھنا ہے۔"),
      a1Phrase("travel-p4", "de trein heeft vertraging", "ٹرین دیر سے ہے", "حال: تاخیر کی بات سمجھنی یا بتانی ہے۔"),
      a1Phrase("travel-p5", "waar moet ik overstappen?", "مجھے کہاں گاڑی بدلنی ہے؟", "حال: گاڑی بدلنے کی جگہ پوچھنی ہے۔"),
      a1Phrase("travel-p6", "moet ik hier uitstappen?", "کیا مجھے یہاں اترنا ہے؟", "حال: اترنے کی جگہ پکی کرنی ہے۔"),
      a1Phrase("travel-p7", "de volgende halte is centrum", "اگلا اسٹاپ مرکز ہے", "حال: اگلا اسٹاپ بتانا ہے۔"),
      a1Phrase("travel-p8", "gaat deze bus naar het station?", "کیا یہ بس اسٹیشن جاتی ہے؟", "حال: بس کی منزل پوچھنی ہے۔"),
      a1Phrase("travel-p9", "u moet rechtdoor gaan", "آپ کو سیدھا جانا ہے", "حال: راستہ سیدھا بتانا ہے۔"),
      a1Phrase("travel-p10", "sla links af", "بائیں مڑیں", "حال: بائیں مڑنے کی ہدایت دینی ہے۔"),
      a1Phrase("travel-p11", "het station is aan de rechterkant", "اسٹیشن دائیں طرف ہے", "حال: اسٹیشن کی سمت بتانی ہے۔"),
      a1Phrase("travel-p12", "ik ben mijn kaartje kwijt", "میرا ٹکٹ گم ہو گیا ہے", "حال: ٹکٹ گم ہونے کی اطلاع دینی ہے۔"),
      a1Phrase("travel-p13", "wanneer komt de bus?", "بس کب آئے گی؟", "حال: بس آنے کا وقت پوچھنا ہے۔")
    ],
    listenReplies: [["waar wilt u naartoe?", ["naar Utrecht", "spoor vijf", "om tien uur"], "naar Utrecht", "منزل بتائیں۔"], ["van welk spoor?", ["van spoor vijf", "met de bus", "naar links"], "van spoor vijf", "پلیٹ فارم بتائیں۔"], ["moet ik hier uitstappen?", ["ja bij deze halte", "de trein is laat", "rechtdoor gaan"], "ja bij deze halte", "اترنے کی جگہ پکی کریں۔"]],
    builds: [["مجھے Utrecht کا ٹکٹ چاہیے", ["ik", "wil", "een", "kaartje", "naar", "Utrecht"], "ik wil een kaartje naar Utrecht", "ٹکٹ کی درخواست۔"], ["ٹرین کتنے بجے جاتی ہے؟", ["hoe", "laat", "vertrekt", "de", "trein"], "hoe laat vertrekt de trein", "روانگی کا وقت۔"], ["مجھے کہاں گاڑی بدلنی ہے؟", ["waar", "moet", "ik", "overstappen"], "waar moet ik overstappen", "تبدیلی کا سوال۔"], ["کیا یہ بس اسٹیشن جاتی ہے؟", ["gaat", "deze", "bus", "naar", "het", "station"], "gaat deze bus naar het station", "بس کی منزل۔"], ["سیدھا جائیں", ["ga", "rechtdoor"], "ga rechtdoor", "راستے کی ہدایت۔"], ["میرا ٹکٹ گم ہو گیا ہے", ["ik", "ben", "mijn", "kaartje", "kwijt"], "ik ben mijn kaartje kwijt", "گمشدہ ٹکٹ۔"]]
  }),
  makeA1PracticalLesson({
    id: "a1-home-neighbours",
    unit: "A1: گھر اور پڑوسی",
    title: "Thuis en buren",
    description: "گھر کے کام، شور، پڑوسی، خرابی، اور مرمت کی درخواست۔",
    explanation: practicalExplanation("گھر کا مسئلہ اور مطلوبہ مدد الگ بتائیں", ["buurman اور buurvrouw پڑوسی مرد اور عورت ہیں۔", "last hebben van سے تکلیف یا پریشانی بتائی جاتی ہے۔", "kunt u iemand sturen? سے مرمت کے لیے کسی کو بلانے کی درخواست کریں۔"]),
    concepts: [
      dailyConcept("home-house", "huis", "گھر", "huis"), dailyConcept("home-room", "kamer", "کمرہ", "kamer"),
      dailyConcept("home-door", "deur", "دروازہ", "deur"), dailyConcept("home-heating", "verwarming", "ہیٹنگ", "verwarming"),
      dailyConcept("home-repair", "reparatie", "مرمت", "reparatie"), dailyConcept("home-neighbour", "buurman", "پڑوسی مرد", "man"),
      dailyConcept("home-lamp", "lamp", "بتی", "lamp"), dailyConcept("home-key", "sleutel", "چابی", "deur"),
      a1Phrase("home-p1", "mijn verwarming doet het niet", "میری ہیٹنگ کام نہیں کر رہی", "حال: ہیٹنگ کی خرابی بتانی ہے۔"),
      a1Phrase("home-p2", "de lamp is kapot", "بتی خراب ہے", "حال: بتی کی خرابی بتانی ہے۔"),
      a1Phrase("home-p3", "ik kan de deur niet openen", "میں دروازہ نہیں کھول سکتا / سکتی", "حال: دروازہ نہ کھلنے کی بات بتانی ہے۔"),
      a1Phrase("home-p4", "ik ben mijn sleutel kwijt", "میری چابی گم ہو گئی ہے", "حال: چابی گم ہونے کی اطلاع دینی ہے۔"),
      a1Phrase("home-p5", "kunt u iemand sturen?", "کیا آپ کسی کو بھیج سکتے ہیں؟", "حال: مرمت کے لیے کسی کو بھیجنے کو کہنا ہے۔"),
      a1Phrase("home-p6", "wanneer komt de monteur?", "مرمت کرنے والا کب آئے گا؟", "حال: مرمت کا وقت پوچھنا ہے۔"),
      a1Phrase("home-p7", "ik heb last van lawaai", "مجھے شور سے پریشانی ہے", "حال: شور کی شکایت کرنی ہے۔"),
      a1Phrase("home-p8", "kunt u zachter zijn?", "کیا آپ آواز کم کر سکتے ہیں؟", "حال: پڑوسی کو آواز کم کرنے کو کہنا ہے۔"),
      a1Phrase("home-p9", "sorry voor het lawaai", "شور کے لیے معاف کیجیے", "حال: اپنے شور پر معافی مانگنی ہے۔"),
      a1Phrase("home-p10", "mag ik iets vragen?", "کیا میں کچھ پوچھ سکتا / سکتی ہوں؟", "حال: پڑوسی سے ادب سے بات شروع کرنی ہے۔"),
      a1Phrase("home-p11", "de vuilnis wordt morgen opgehaald", "کچرا کل اٹھایا جائے گا", "حال: کچرا اٹھنے کا دن بتانا ہے۔"),
      a1Phrase("home-p12", "waar moet de vuilnis staan?", "کچرا کہاں رکھنا ہے؟", "حال: کچرے کی جگہ پوچھنی ہے۔"),
      a1Phrase("home-p13", "dank u voor uw hulp", "آپ کی مدد کا شکریہ", "حال: پڑوسی کی مدد پر شکریہ کہنا ہے۔")
    ],
    listenReplies: [["wat is er kapot?", ["de lamp is kapot", "morgen komt de vuilnis", "mijn buurman is thuis"], "de lamp is kapot", "خرابی بتائیں۔"], ["wanneer kan de monteur komen?", ["morgen in de ochtend", "de deur is dicht", "ik heb lawaai"], "morgen in de ochtend", "مرمت کا وقت بتائیں۔"], ["heb ik te veel lawaai gemaakt?", ["ja kunt u zachter zijn", "de lamp is kapot", "waar staat de vuilnis"], "ja kunt u zachter zijn", "شور کے بارے میں ادب سے جواب دیں۔"]],
    builds: [["میری ہیٹنگ کام نہیں کر رہی", ["mijn", "verwarming", "doet", "het", "niet"], "mijn verwarming doet het niet", "خرابی کا جملہ۔"], ["میری چابی گم ہو گئی ہے", ["ik", "ben", "mijn", "sleutel", "kwijt"], "ik ben mijn sleutel kwijt", "گمشدہ چابی۔"], ["کیا آپ کسی کو بھیج سکتے ہیں؟", ["kunt", "u", "iemand", "sturen"], "kunt u iemand sturen", "مرمت کی درخواست۔"], ["مجھے شور سے پریشانی ہے", ["ik", "heb", "last", "van", "lawaai"], "ik heb last van lawaai", "شور کی شکایت۔"], ["کیا آپ آواز کم کر سکتے ہیں؟", ["kunt", "u", "zachter", "zijn"], "kunt u zachter zijn", "پڑوسی سے درخواست۔"], ["آپ کی مدد کا شکریہ", ["dank", "u", "voor", "uw", "hulp"], "dank u voor uw hulp", "شکریہ کا جملہ۔"]]
  }),
  makeA1PracticalLesson({
    id: "a1-health-pharmacy",
    unit: "A1: صحت اور دوا",
    title: "Bij de apotheek",
    description: "علامت، دوا، مقدار، استعمال، اور ڈاکٹر کی ضرورت سمجھنا۔",
    explanation: practicalExplanation("علامت اور مدت واضح بتائیں", ["ik heb... سے درد یا علامت بتائیں۔", "sinds gisteren سے بتائیں کہ مسئلہ کل سے ہے۔", "hoe vaak? دوا کتنی بار لینی ہے، یہ پوچھتا ہے۔"]),
    concepts: [
      dailyConcept("health-pharmacy", "apotheek", "دواخانہ", "apotheek"), dailyConcept("health-medicine", "medicijn", "دوا", "medicijn"),
      dailyConcept("health-doctor", "huisarts", "گھر کا ڈاکٹر", "huisarts"), dailyConcept("health-pain", "pijn", "درد", "pijn"),
      dailyConcept("health-head", "hoofdpijn", "سر درد", "hoofdpijn"), dailyConcept("health-cough", "hoesten", "کھانسی کرنا", "hoesten"),
      dailyConcept("health-sick", "ziek", "بیمار", "ziek"), dailyConcept("health-rest", "rust", "آرام", "rust"),
      a1Phrase("health-p1", "ik heb hoofdpijn", "میرے سر میں درد ہے", "حال: سر درد بتانا ہے۔"),
      a1Phrase("health-p2", "ik moet veel hoesten", "مجھے بہت کھانسی آتی ہے", "حال: کھانسی کی علامت بتانی ہے۔"),
      a1Phrase("health-p3", "ik ben sinds gisteren ziek", "میں کل سے بیمار ہوں", "حال: بیماری کب سے ہے، بتانا ہے۔"),
      a1Phrase("health-p4", "heeft u iets tegen de pijn?", "کیا آپ کے پاس درد کی کوئی دوا ہے؟", "حال: درد کی دوا مانگنی ہے۔"),
      a1Phrase("health-p5", "hoe vaak moet ik dit nemen?", "مجھے یہ کتنی بار لینا ہے؟", "حال: دوا کی تعداد پوچھنی ہے۔"),
      a1Phrase("health-p6", "twee keer per dag", "دن میں دو بار", "حال: دوا کی مقدار سمجھنی ہے۔"),
      a1Phrase("health-p7", "voor of na het eten?", "کھانے سے پہلے یا بعد؟", "حال: دوا کا وقت پوچھنا ہے۔"),
      a1Phrase("health-p8", "u moet naar de huisarts", "آپ کو ڈاکٹر کے پاس جانا چاہیے", "حال: ڈاکٹر کے پاس جانے کا مشورہ سمجھنا ہے۔"),
      a1Phrase("health-p9", "ik heb een afspraak nodig", "مجھے ملاقات کا وقت چاہیے", "حال: ڈاکٹر کا وقت مانگنا ہے۔"),
      a1Phrase("health-p10", "ik kan vandaag niet werken", "میں آج کام نہیں کر سکتا / سکتی", "حال: بیماری کی وجہ سے کام نہ کرنے کی بات بتانی ہے۔"),
      a1Phrase("health-p11", "ik ben allergisch voor penicilline", "مجھے penicilline سے حساسیت ہے", "حال: دوا کی حساسیت بتانی ہے۔"),
      a1Phrase("health-p12", "waar doet het pijn?", "کہاں درد ہے؟", "حال: درد کی جگہ پوچھنی ہے۔"),
      a1Phrase("health-p13", "het gaat al beter", "اب طبیعت بہتر ہے", "حال: بہتری کی اطلاع دینی ہے۔")
    ],
    listenReplies: [["waar doet het pijn?", ["in mijn hoofd", "sinds gisteren", "twee keer per dag"], "in mijn hoofd", "درد کی جگہ بتائیں۔"], ["hoe lang bent u al ziek?", ["sinds gisteren", "na het eten", "bij de apotheek"], "sinds gisteren", "مدت بتائیں۔"], ["hoe vaak moet u dit nemen?", ["twee keer per dag", "ik heb hoofdpijn", "naar de huisarts"], "twee keer per dag", "دوا کی تعداد بتائیں۔"]],
    builds: [["میرے سر میں درد ہے", ["ik", "heb", "hoofdpijn"], "ik heb hoofdpijn", "علامت بتائیں۔"], ["میں کل سے بیمار ہوں", ["ik", "ben", "sinds", "gisteren", "ziek"], "ik ben sinds gisteren ziek", "مدت والا جملہ۔"], ["کیا آپ کے پاس درد کی دوا ہے؟", ["heeft", "u", "iets", "tegen", "de", "pijn"], "heeft u iets tegen de pijn", "دوا کی درخواست۔"], ["مجھے یہ کتنی بار لینا ہے؟", ["hoe", "vaak", "moet", "ik", "dit", "nemen"], "hoe vaak moet ik dit nemen", "دوا کا سوال۔"], ["دن میں دو بار", ["twee", "keer", "per", "dag"], "twee keer per dag", "مقدار۔"], ["مجھے ملاقات کا وقت چاہیے", ["ik", "heb", "een", "afspraak", "nodig"], "ik heb een afspraak nodig", "ڈاکٹر کا وقت۔"]]
  }),
  makeA1PracticalLesson({
    id: "a1-work-school-messages",
    unit: "A1: کام اور اسکول کے پیغام",
    title: "Een kort bericht",
    description: "غیر حاضری، دیر، وقت، ملاقات، اور مختصر فون یا تحریری پیغام۔",
    explanation: practicalExplanation("پیغام میں تین باتیں کافی ہیں", ["پہلے اپنا نام بتائیں۔", "پھر صاف وجہ یا مسئلہ کہیں۔", "آخر میں بتائیں کب آئیں گے یا جواب مانگیں۔"]),
    concepts: [
      dailyConcept("message-work", "werk", "کام", "werk"), dailyConcept("message-school", "school", "اسکول", "school"),
      dailyConcept("message-teacher", "docent", "استاد", "docent"), dailyConcept("message-colleague", "collega", "کام کا ساتھی", "collega"),
      dailyConcept("message-phone", "telefoon", "فون", "telefoon"), dailyConcept("message-text", "bericht", "پیغام", "bericht"),
      dailyConcept("message-sick", "ziek", "بیمار", "ziek"), dailyConcept("message-schedule", "rooster", "اوقات کی فہرست", "rooster"),
      a1Phrase("message-p1", "goedemorgen u spreekt met Ali", "صبح بخیر، Ali بات کر رہا / رہی ہوں", "حال: فون پر اپنا تعارف کرانا ہے۔"),
      a1Phrase("message-p2", "ik kan vandaag niet komen", "میں آج نہیں آ سکتا / سکتی", "حال: آج غیر حاضری بتانی ہے۔"),
      a1Phrase("message-p3", "ik ben ziek", "میں بیمار ہوں", "حال: غیر حاضری کی وجہ بتانی ہے۔"),
      a1Phrase("message-p4", "ik kom morgen weer", "میں کل دوبارہ آؤں گا / گی", "حال: واپسی کا دن بتانا ہے۔"),
      a1Phrase("message-p5", "ik ben tien minuten later", "مجھے دس منٹ دیر ہو گی", "حال: تاخیر کی مقدار بتانی ہے۔"),
      a1Phrase("message-p6", "de bus heeft vertraging", "بس دیر سے ہے", "حال: دیر کی وجہ بتانی ہے۔"),
      a1Phrase("message-p7", "mijn kind komt vandaag niet naar school", "میرا بچہ آج اسکول نہیں آئے گا", "حال: اسکول کو غیر حاضری کا پیغام دینا ہے۔"),
      a1Phrase("message-p8", "mijn kind heeft koorts", "میرے بچے کو بخار ہے", "حال: بچے کی بیماری بتانی ہے۔"),
      a1Phrase("message-p9", "kunt u mij terugbellen?", "کیا آپ مجھے واپس فون کر سکتے ہیں؟", "حال: واپس فون کرنے کی درخواست کرنی ہے۔"),
      a1Phrase("message-p10", "ik stuur een bericht", "میں ایک پیغام بھیجتا / بھیجتی ہوں", "حال: پیغام بھیجنے کی بات بتانی ہے۔"),
      a1Phrase("message-p11", "hoe laat begint de les?", "سبق کتنے بجے شروع ہوتا ہے؟", "حال: سبق کا وقت پوچھنا ہے۔"),
      a1Phrase("message-p12", "mijn rooster is veranderd", "میرے اوقات بدل گئے ہیں", "حال: اوقات بدلنے کی اطلاع دینی ہے۔"),
      a1Phrase("message-p13", "dank u voor uw begrip", "سمجھنے کے لیے آپ کا شکریہ", "حال: پیغام ادب سے ختم کرنا ہے۔")
    ],
    listenReplies: [["waarom kunt u niet komen?", ["ik ben ziek", "ik kom morgen", "mijn rooster is hier"], "ik ben ziek", "وجہ بتائیں۔"], ["wanneer komt u weer?", ["morgen", "tien minuten", "met de bus"], "morgen", "واپسی کا دن بتائیں۔"], ["kan ik u terugbellen?", ["ja graag", "ik ben ziek", "de les begint"], "ja graag", "واپس فون کی درخواست قبول کریں۔"]],
    builds: [["صبح بخیر، Ali بات کر رہا / رہی ہوں", ["goedemorgen", "u", "spreekt", "met", "Ali"], "goedemorgen u spreekt met Ali", "فون کا تعارف۔"], ["میں آج نہیں آ سکتا / سکتی", ["ik", "kan", "vandaag", "niet", "komen"], "ik kan vandaag niet komen", "غیر حاضری۔"], ["مجھے دس منٹ دیر ہو گی", ["ik", "ben", "tien", "minuten", "later"], "ik ben tien minuten later", "تاخیر کا پیغام۔"], ["میرا بچہ آج اسکول نہیں آئے گا", ["mijn", "kind", "komt", "vandaag", "niet", "naar", "school"], "mijn kind komt vandaag niet naar school", "اسکول کا پیغام۔"], ["کیا آپ مجھے واپس فون کر سکتے ہیں؟", ["kunt", "u", "mij", "terugbellen"], "kunt u mij terugbellen", "واپس فون کی درخواست۔"], ["سمجھنے کے لیے شکریہ", ["dank", "u", "voor", "uw", "begrip"], "dank u voor uw begrip", "ادب والا اختتام۔"]]
  })
);

a2Lessons.push(
  makeA2PracticalLesson({
    id: "a2-gemeente-documents", unit: "A2: Gemeente اور کاغذات", title: "Bij de gemeente", description: "ملاقات، دستاویز، درخواست، تبدیلی، اور سرکاری وضاحت سمجھنا۔",
    explanation: practicalExplanation("سرکاری کام میں مقصد اور مطلوبہ کاغذ صاف بتائیں", ["aanvragen درخواست دینا اور wijzigen معلومات بدلنا ہے۔", "اصل کاغذ اور kopie میں فرق سمجھیں۔", "اگر بات واضح نہ ہو تو پوچھیں کہ کون سا کاغذ اور کب چاہیے۔"]),
    concepts: [dailyConcept("gov-office","gemeente","بلدیہ کا دفتر","gemeente"),dailyConcept("gov-form","formulier","فارم","formulier"),dailyConcept("gov-passport","paspoort","پاسپورٹ","paspoort"),dailyConcept("gov-signature","handtekening","دستخط","handtekening"),dailyConcept("gov-number","BSN","شہری نمبر","bsn"),dailyConcept("gov-desk","loket","دفتر کا کاؤنٹر","loket"),
      a2Phrase("gov-p1","ik wil een afspraak maken","میں ملاقات کا وقت طے کرنا چاہتا / چاہتی ہوں","حال: gemeente میں ملاقات لینی ہے۔"),a2Phrase("gov-p2","ik wil mijn adres wijzigen","میں اپنا پتہ بدلنا چاہتا / چاہتی ہوں","حال: نئے پتے کی اطلاع دینی ہے۔"),a2Phrase("gov-p3","welke documenten heb ik nodig?","مجھے کون سے کاغذات چاہیے؟","حال: مطلوبہ کاغذات پوچھنے ہیں۔"),a2Phrase("gov-p4","u moet uw paspoort meenemen","آپ کو پاسپورٹ ساتھ لانا ہے","حال: دفتر کی ہدایت سمجھنی ہے۔"),a2Phrase("gov-p5","is een kopie voldoende?","کیا نقل کافی ہے؟","حال: اصل کے بجائے نقل کے بارے میں پوچھنا ہے۔"),a2Phrase("gov-p6","waar moet ik tekenen?","مجھے کہاں دستخط کرنے ہیں؟","حال: دستخط کی جگہ پوچھنی ہے۔"),a2Phrase("gov-p7","ik begrijp deze vraag niet","مجھے یہ سوال سمجھ نہیں آیا","حال: فارم کا سوال سمجھ نہ آنے کی بات بتانی ہے۔"),a2Phrase("gov-p8","kunt u dit uitleggen?","کیا آپ یہ سمجھا سکتے ہیں؟","حال: وضاحت مانگنی ہے۔"),a2Phrase("gov-p9","het formulier is nog niet compleet","فارم ابھی مکمل نہیں ہے","حال: نامکمل فارم کی اطلاع سمجھنی ہے۔"),a2Phrase("gov-p10","ik heb mijn BSN niet bij me","میرا BSN ابھی میرے پاس نہیں ہے","حال: شہری نمبر ساتھ نہ ہونے کی بات بتانی ہے۔"),a2Phrase("gov-p11","wanneer krijg ik antwoord?","مجھے جواب کب ملے گا؟","حال: فیصلے کا وقت پوچھنا ہے۔"),a2Phrase("gov-p12","u ontvangt een brief binnen twee weken","آپ کو دو ہفتوں کے اندر خط ملے گا","حال: جواب کی مدت سمجھنی ہے۔"),a2Phrase("gov-p13","kan ik de aanvraag online doen?","کیا میں درخواست آن لائن دے سکتا / سکتی ہوں؟","حال: آن لائن درخواست پوچھنی ہے۔"),a2Phrase("gov-p14","mijn gegevens zijn niet correct","میری معلومات درست نہیں ہیں","حال: معلومات میں غلطی بتانی ہے۔"),a2Phrase("gov-p15","ik wil deze fout laten herstellen","میں یہ غلطی درست کروانا چاہتا / چاہتی ہوں","حال: سرکاری غلطی درست کروانی ہے۔")],
    listenReplies: [["waarvoor komt u?",["ik wil mijn adres wijzigen","ik heb twee weken","het loket is dicht"],"ik wil mijn adres wijzigen","اپنے آنے کا مقصد بتائیں۔"],["heeft u uw paspoort bij u?",["ja hier is mijn paspoort","ik wil online aanvragen","de brief komt later"],"ja hier is mijn paspoort","کاغذ پیش کریں۔"],["wanneer krijg ik antwoord?",["binnen twee weken","bij loket drie","met mijn BSN"],"binnen twee weken","مدت کا جواب دیں۔"]],
    builds: [["میں اپنا پتہ بدلنا چاہتا / چاہتی ہوں",["ik","wil","mijn","adres","wijzigen"],"ik wil mijn adres wijzigen","پتے کی تبدیلی۔"],["مجھے کون سے کاغذات چاہیے؟",["welke","documenten","heb","ik","nodig"],"welke documenten heb ik nodig","کاغذات کا سوال۔"],["کیا نقل کافی ہے؟",["is","een","kopie","voldoende"],"is een kopie voldoende","نقل کا سوال۔"],["مجھے کہاں دستخط کرنے ہیں؟",["waar","moet","ik","tekenen"],"waar moet ik tekenen","دستخط کی جگہ۔"],["کیا آپ یہ سمجھا سکتے ہیں؟",["kunt","u","dit","uitleggen"],"kunt u dit uitleggen","وضاحت کی درخواست۔"],["فارم مکمل نہیں ہے",["het","formulier","is","niet","compleet"],"het formulier is niet compleet","فارم کی حالت۔"],["مجھے جواب کب ملے گا؟",["wanneer","krijg","ik","antwoord"],"wanneer krijg ik antwoord","جواب کا وقت۔"],["میری معلومات درست نہیں ہیں",["mijn","gegevens","zijn","niet","correct"],"mijn gegevens zijn niet correct","غلط معلومات۔"]]
  }),
  makeA2PracticalLesson({
    id: "a2-work-conditions", unit: "A2: کام کی شرطیں", title: "Op het werk", description: "معاہدہ، اوقات، تنخواہ، چھٹی، بیماری، اور ذمہ دار سے گفتگو۔",
    explanation: practicalExplanation("کام کا مسئلہ مثال اور وقت کے ساتھ بتائیں", ["contract کام کی شرطیں لکھتا ہے۔", "loonstrook تنخواہ کی تفصیل ہے۔", "ziek melden بیماری کی باقاعدہ اطلاع دینا ہے۔"]),
    concepts: [dailyConcept("job-work","werk","کام","werk"),dailyConcept("job-contract","contract","معاہدہ","contract"),dailyConcept("job-salary","salaris","تنخواہ","salaris"),dailyConcept("job-schedule","rooster","اوقات کی فہرست","rooster"),dailyConcept("job-colleague","collega","کام کا ساتھی","collega"),dailyConcept("job-vacancy","baan","نوکری","baan"),
      a2Phrase("job-p1","mijn rooster is veranderd","میرے کام کے اوقات بدل گئے ہیں","حال: نئے اوقات کے بارے میں بات کرنی ہے۔"),a2Phrase("job-p2","ik kan op dinsdag niet werken","میں منگل کو کام نہیں کر سکتا / سکتی","حال: ایک دن دستیاب نہ ہونے کی بات بتانی ہے۔"),a2Phrase("job-p3","kan ik een vrije dag aanvragen?","کیا میں چھٹی کی درخواست دے سکتا / سکتی ہوں؟","حال: چھٹی مانگنی ہے۔"),a2Phrase("job-p4","ik wil mijn contract bespreken","میں اپنے معاہدے پر بات کرنا چاہتا / چاہتی ہوں","حال: معاہدے کی بات کرنی ہے۔"),a2Phrase("job-p5","hoeveel uur werk ik per week?","میں ہفتے میں کتنے گھنٹے کام کرتا / کرتی ہوں؟","حال: ہفتہ وار گھنٹے پوچھنے ہیں۔"),a2Phrase("job-p6","mijn salaris klopt niet","میری تنخواہ درست نہیں ہے","حال: تنخواہ میں غلطی بتانی ہے۔"),a2Phrase("job-p7","kunt u mijn loonstrook uitleggen?","کیا آپ میری تنخواہ کی پرچی سمجھا سکتے ہیں؟","حال: تنخواہ کی تفصیل سمجھنی ہے۔"),a2Phrase("job-p8","ik moet mij ziek melden","مجھے بیماری کی اطلاع دینی ہے","حال: بیماری کی باقاعدہ اطلاع دینی ہے۔"),a2Phrase("job-p9","ik verwacht morgen weer te werken","امید ہے میں کل دوبارہ کام کروں گا / گی","حال: واپسی کا اندازہ بتانا ہے۔"),a2Phrase("job-p10","wie neemt mijn dienst over?","میری ڈیوٹی کون کرے گا؟","حال: متبادل ساتھی پوچھنا ہے۔"),a2Phrase("job-p11","ik heb hulp nodig bij deze taak","مجھے اس کام میں مدد چاہیے","حال: کام میں مدد مانگنی ہے۔"),a2Phrase("job-p12","kunt u laten zien hoe dit werkt?","کیا آپ دکھا سکتے ہیں یہ کیسے کام کرتا ہے؟","حال: کام سمجھنے کے لیے نمونہ مانگنا ہے۔"),a2Phrase("job-p13","ik ben het niet eens met deze afspraak","میں اس بات سے متفق نہیں ہوں","حال: کام کی شرط پر اختلاف بتانا ہے۔"),a2Phrase("job-p14","kunnen we hierover praten?","کیا ہم اس بارے میں بات کر سکتے ہیں؟","حال: مسئلے پر گفتگو مانگنی ہے۔"),a2Phrase("job-p15","ik stuur de bevestiging per e-mail","میں تصدیق ای میل سے بھیجوں گا / گی","حال: تحریری تصدیق کا وعدہ کرنا ہے۔")],
    listenReplies: [["wat is er mis met uw salaris?",["het bedrag klopt niet","ik werk op dinsdag","mijn collega helpt"],"het bedrag klopt niet","تنخواہ کا مسئلہ بتائیں۔"],["wanneer kunt u weer werken?",["waarschijnlijk morgen","twintig uur per week","met mijn collega"],"waarschijnlijk morgen","واپسی کا اندازہ دیں۔"],["wilt u dit per e-mail bevestigen?",["ja dat doe ik vandaag","nee mijn rooster klopt","ik heb vrije dag"],"ja dat doe ik vandaag","تحریری تصدیق قبول کریں۔"]],
    builds: [["میرے اوقات بدل گئے ہیں",["mijn","rooster","is","veranderd"],"mijn rooster is veranderd","اوقات کی تبدیلی۔"],["میں منگل کو کام نہیں کر سکتا / سکتی",["ik","kan","op","dinsdag","niet","werken"],"ik kan op dinsdag niet werken","دستیابی۔"],["کیا میں چھٹی مانگ سکتا / سکتی ہوں؟",["kan","ik","een","vrije","dag","aanvragen"],"kan ik een vrije dag aanvragen","چھٹی کی درخواست۔"],["میری تنخواہ درست نہیں ہے",["mijn","salaris","klopt","niet"],"mijn salaris klopt niet","تنخواہ کا مسئلہ۔"],["مجھے اس کام میں مدد چاہیے",["ik","heb","hulp","nodig","bij","deze","taak"],"ik heb hulp nodig bij deze taak","مدد کی درخواست۔"],["میری ڈیوٹی کون کرے گا؟",["wie","neemt","mijn","dienst","over"],"wie neemt mijn dienst over","متبادل پوچھیں۔"],["کیا ہم اس پر بات کر سکتے ہیں؟",["kunnen","we","hierover","praten"],"kunnen we hierover praten","گفتگو کی درخواست۔"],["میں ای میل سے تصدیق بھیجوں گا / گی",["ik","stuur","de","bevestiging","per","e-mail"],"ik stuur de bevestiging per e-mail","تحریری تصدیق۔"]]
  }),
  makeA2PracticalLesson({
    id: "a2-parent-school", unit: "A2: والدین اور اسکول", title: "Gesprek op school", description: "استاد سے بچے کی پیش رفت، غیر حاضری، مدد، اور ملاقات پر بات کرنا۔",
    explanation: practicalExplanation("بچے کے بارے میں مشاہدہ اور سوال دونوں دیں", ["rapport پیش رفت کی تحریری رپورٹ ہے۔", "moeite hebben met کسی چیز میں مشکل ہونا ہے۔", "extra hulp اضافی مدد ہے۔"]),
    concepts: [dailyConcept("school-building","school","اسکول","school"),dailyConcept("school-teacher","docent","استاد","docent"),dailyConcept("school-homework","huiswerk","گھر کا کام","huiswerk"),dailyConcept("school-report","rapport","رپورٹ","bericht"),dailyConcept("school-schedule","rooster","اوقات کی فہرست","rooster"),dailyConcept("school-child","kind","بچہ","kind"),
      a2Phrase("school2-p1","ik wil graag met de docent praten","میں استاد سے بات کرنا چاہتا / چاہتی ہوں","حال: استاد سے ملاقات مانگنی ہے۔"),a2Phrase("school2-p2","hoe gaat het met mijn kind in de klas?","میرا بچہ جماعت میں کیسا کر رہا ہے؟","حال: بچے کی پیش رفت پوچھنی ہے۔"),a2Phrase("school2-p3","mijn kind heeft moeite met lezen","میرے بچے کو پڑھنے میں مشکل ہے","حال: پڑھنے کی مشکل بتانی ہے۔"),a2Phrase("school2-p4","kan mijn kind extra hulp krijgen?","کیا میرے بچے کو اضافی مدد مل سکتی ہے؟","حال: اضافی مدد مانگنی ہے۔"),a2Phrase("school2-p5","wat kunnen we thuis oefenen?","ہم گھر پر کیا مشق کر سکتے ہیں؟","حال: گھر کی مشق پوچھنی ہے۔"),a2Phrase("school2-p6","het huiswerk is niet duidelijk","گھر کا کام واضح نہیں ہے","حال: گھر کا کام سمجھ نہ آنے کی بات بتانی ہے۔"),a2Phrase("school2-p7","mijn kind was gisteren afwezig","میرا بچہ کل غیر حاضر تھا","حال: پچھلی غیر حاضری بتانی ہے۔"),a2Phrase("school2-p8","hij had koorts en moest thuisblijven","اسے بخار تھا اور گھر رہنا پڑا","حال: غیر حاضری کی وجہ بتانی ہے۔"),a2Phrase("school2-p9","wanneer is het oudergesprek?","والدین کی ملاقات کب ہے؟","حال: والدین کی ملاقات کا وقت پوچھنا ہے۔"),a2Phrase("school2-p10","ik kan op dat tijdstip niet komen","میں اس وقت نہیں آ سکتا / سکتی","حال: تجویز کردہ وقت پر نہ آ سکنے کی بات بتانی ہے۔"),a2Phrase("school2-p11","is een ander tijdstip mogelijk?","کیا کوئی دوسرا وقت ممکن ہے؟","حال: دوسرا وقت مانگنا ہے۔"),a2Phrase("school2-p12","kunt u het rapport uitleggen?","کیا آپ رپورٹ سمجھا سکتے ہیں؟","حال: رپورٹ کی وضاحت مانگنی ہے۔"),a2Phrase("school2-p13","mijn kind voelt zich niet veilig","میرا بچہ خود کو محفوظ محسوس نہیں کرتا","حال: حفاظت کی تشویش بتانی ہے۔"),a2Phrase("school2-p14","met wie kan ik dit bespreken?","میں اس بارے میں کس سے بات کر سکتا / سکتی ہوں؟","حال: صحیح ذمہ دار پوچھنا ہے۔"),a2Phrase("school2-p15","we maken samen een plan","ہم مل کر منصوبہ بناتے ہیں","حال: مشترک اگلا قدم طے کرنا ہے۔")],
    listenReplies: [["waar heeft uw kind moeite mee?",["met lezen","sinds gisteren","om drie uur"],"met lezen","مشکل کا شعبہ بتائیں۔"],["wat kunnen jullie thuis doen?",["elke dag samen lezen","een ander tijdstip","het rapport meenemen"],"elke dag samen lezen","گھر کی مشق بتائیں۔"],["kunt u dinsdag komen?",["nee is woensdag mogelijk","mijn kind leest thuis","het rapport is duidelijk"],"nee is woensdag mogelijk","دوسرا وقت مانگیں۔"]],
    builds: [["میں استاد سے بات کرنا چاہتا / چاہتی ہوں",["ik","wil","graag","met","de","docent","praten"],"ik wil graag met de docent praten","ملاقات کی درخواست۔"],["میرے بچے کو پڑھنے میں مشکل ہے",["mijn","kind","heeft","moeite","met","lezen"],"mijn kind heeft moeite met lezen","مشکل بتائیں۔"],["کیا اضافی مدد مل سکتی ہے؟",["kan","mijn","kind","extra","hulp","krijgen"],"kan mijn kind extra hulp krijgen","مدد کی درخواست۔"],["ہم گھر پر کیا مشق کریں؟",["wat","kunnen","we","thuis","oefenen"],"wat kunnen we thuis oefenen","گھر کی مشق۔"],["میرا بچہ کل غیر حاضر تھا",["mijn","kind","was","gisteren","afwezig"],"mijn kind was gisteren afwezig","پچھلی غیر حاضری۔"],["کیا دوسرا وقت ممکن ہے؟",["is","een","ander","tijdstip","mogelijk"],"is een ander tijdstip mogelijk","وقت بدلیں۔"],["میرا بچہ محفوظ محسوس نہیں کرتا",["mijn","kind","voelt","zich","niet","veilig"],"mijn kind voelt zich niet veilig","تشویش بتائیں۔"],["ہم مل کر منصوبہ بناتے ہیں",["we","maken","samen","een","plan"],"we maken samen een plan","اگلا قدم۔"]]
  }),
  makeA2PracticalLesson({
    id: "a2-landlord-repairs", unit: "A2: گھر اور مالک مکان", title: "Reparatie melden", description: "رساؤ، ہیٹنگ، پھپھوندی، مرمت، مالک مکان، اور تحریری ثبوت۔",
    explanation: practicalExplanation("گھر کی شکایت میں جگہ، مدت، اور اثر بتائیں", ["lekkage پانی کا رساؤ ہے۔", "schimmel پھپھوندی ہے اور صحت کے لیے مسئلہ ہو سکتی ہے۔", "تحریری پیغام اور تصویر شکایت کا ثبوت بن سکتے ہیں۔"]),
    concepts: [dailyConcept("repair-home","huis","گھر","huis"),dailyConcept("repair-heating","verwarming","ہیٹنگ","verwarming"),dailyConcept("repair-leak","lekkage","پانی کا رساؤ","lekkage"),dailyConcept("repair-work","reparatie","مرمت","reparatie"),dailyConcept("repair-room","kamer","کمرہ","kamer"),dailyConcept("repair-message","bericht","پیغام","bericht"),
      a2Phrase("repair-p1","er is een lekkage in de keuken","باورچی خانے میں پانی رس رہا ہے","حال: رساؤ کی جگہ بتانی ہے۔"),a2Phrase("repair-p2","de verwarming werkt al drie dagen niet","ہیٹنگ تین دن سے کام نہیں کر رہی","حال: خرابی کی مدت بتانی ہے۔"),a2Phrase("repair-p3","er zit schimmel op de muur","دیوار پر پھپھوندی ہے","حال: دیوار کا مسئلہ بتانا ہے۔"),a2Phrase("repair-p4","het probleem wordt steeds erger","مسئلہ مسلسل بڑھ رہا ہے","حال: مسئلہ سنگین ہونے کی بات بتانی ہے۔"),a2Phrase("repair-p5","ik heb dit vorige week gemeld","میں نے پچھلے ہفتے اطلاع دی تھی","حال: پچھلی شکایت یاد دلانی ہے۔"),a2Phrase("repair-p6","wanneer wordt het gerepareerd?","یہ کب مرمت ہو گا؟","حال: مرمت کا وقت پوچھنا ہے۔"),a2Phrase("repair-p7","kunt u vandaag iemand sturen?","کیا آپ آج کسی کو بھیج سکتے ہیں؟","حال: فوری مرمت مانگنی ہے۔"),a2Phrase("repair-p8","ik ben morgen tussen negen en twaalf thuis","میں کل نو سے بارہ بجے گھر پر ہوں","حال: مرمت کے لیے دستیابی بتانی ہے۔"),a2Phrase("repair-p9","de monteur is niet gekomen","مرمت کرنے والا نہیں آیا","حال: نہ آنے کی شکایت کرنی ہے۔"),a2Phrase("repair-p10","ik wil een nieuwe afspraak maken","میں نیا وقت طے کرنا چاہتا / چاہتی ہوں","حال: مرمت کا نیا وقت لینا ہے۔"),a2Phrase("repair-p11","kunt u dit schriftelijk bevestigen?","کیا آپ تحریری تصدیق کر سکتے ہیں؟","حال: تحریری ثبوت مانگنا ہے۔"),a2Phrase("repair-p12","ik stuur foto's van de schade","میں نقصان کی تصاویر بھیجتا / بھیجتی ہوں","حال: ثبوت بھیجنے کی بات بتانی ہے۔"),a2Phrase("repair-p13","door de lekkage kan ik de keuken niet gebruiken","رساؤ کی وجہ سے باورچی خانہ استعمال نہیں ہو سکتا","حال: مسئلے کا اثر بتانا ہے۔"),a2Phrase("repair-p14","wie betaalt de reparatie?","مرمت کے پیسے کون دے گا؟","حال: خرچ کی ذمہ داری پوچھنی ہے۔"),a2Phrase("repair-p15","ik wacht graag op uw reactie","میں آپ کے جواب کا انتظار کروں گا / گی","حال: رسمی شکایت ختم کرنی ہے۔")],
    listenReplies: [["waar is de lekkage?",["in de keuken","al drie dagen","tussen negen en twaalf"],"in de keuken","جگہ بتائیں۔"],["wanneer bent u thuis?",["morgen tussen negen en twaalf","vorige week gemeld","door de lekkage"],"morgen tussen negen en twaalf","دستیابی دیں۔"],["heeft u foto's?",["ja ik stuur ze per e-mail","de monteur komt niet","ik wil reparatie"],"ja ik stuur ze per e-mail","ثبوت بھیجنے کا جواب۔"]],
    builds: [["باورچی خانے میں رساؤ ہے",["er","is","een","lekkage","in","de","keuken"],"er is een lekkage in de keuken","جگہ اور مسئلہ۔"],["ہیٹنگ تین دن سے خراب ہے",["de","verwarming","werkt","al","drie","dagen","niet"],"de verwarming werkt al drie dagen niet","مدت۔"],["مسئلہ بڑھ رہا ہے",["het","probleem","wordt","steeds","erger"],"het probleem wordt steeds erger","سنگینی۔"],["یہ کب مرمت ہو گا؟",["wanneer","wordt","het","gerepareerd"],"wanneer wordt het gerepareerd","مرمت کا وقت۔"],["مرمت کرنے والا نہیں آیا",["de","monteur","is","niet","gekomen"],"de monteur is niet gekomen","شکایت۔"],["کیا آپ تحریری تصدیق کر سکتے ہیں؟",["kunt","u","dit","schriftelijk","bevestigen"],"kunt u dit schriftelijk bevestigen","ثبوت۔"],["میں نقصان کی تصاویر بھیجتا / بھیجتی ہوں",["ik","stuur","foto's","van","de","schade"],"ik stuur foto's van de schade","تصاویر۔"],["مرمت کے پیسے کون دے گا؟",["wie","betaalt","de","reparatie"],"wie betaalt de reparatie","ذمہ داری۔"]]
  }),
  makeA2PracticalLesson({
    id: "a2-doctor-advice", unit: "A2: ڈاکٹر اور مشورہ", title: "Bij de huisarts", description: "علامات، مدت، شدت، ڈاکٹر کی ہدایت، دوا، اور فالو اپ۔",
    explanation: practicalExplanation("علامت کو جگہ، مدت، اور شدت کے ساتھ بیان کریں", ["sinds کب سے، erger بدتر، اور minder کم ہونے کو بتاتے ہیں۔", "ڈاکٹر کی ہدایت میں moet، mag، اور niet mogen اہم ہیں۔", "اگر حالت بہتر نہ ہو تو فالو اپ کا وقت پوچھیں۔"]),
    concepts: [dailyConcept("doctor","huisarts","گھر کا ڈاکٹر","huisarts"),dailyConcept("doctor-pain","pijn","درد","pijn"),dailyConcept("doctor-medicine","medicijn","دوا","medicijn"),dailyConcept("doctor-cough","hoesten","کھانسی","hoesten"),dailyConcept("doctor-head","hoofdpijn","سر درد","hoofdpijn"),dailyConcept("doctor-rest","rust","آرام","rust"),
      a2Phrase("doctor-p1","ik heb sinds drie dagen pijn","مجھے تین دن سے درد ہے","حال: درد کی مدت بتانی ہے۔"),a2Phrase("doctor-p2","de pijn wordt erger als ik loop","چلنے پر درد بڑھ جاتا ہے","حال: درد کب بڑھتا ہے، بتانا ہے۔"),a2Phrase("doctor-p3","ik heb ook koorts en moet hoesten","مجھے بخار بھی ہے اور کھانسی بھی","حال: ایک سے زیادہ علامات بتانی ہیں۔"),a2Phrase("doctor-p4","ik heb dit medicijn al gebruikt","میں یہ دوا پہلے استعمال کر چکا / چکی ہوں","حال: پہلے استعمال کی دوا بتانی ہے۔"),a2Phrase("doctor-p5","het heeft niet geholpen","اس سے فائدہ نہیں ہوا","حال: دوا بے اثر ہونے کی بات بتانی ہے۔"),a2Phrase("doctor-p6","bent u ergens allergisch voor?","کیا آپ کو کسی چیز سے حساسیت ہے؟","حال: حساسیت کا سوال سمجھنا ہے۔"),a2Phrase("doctor-p7","ik ben allergisch voor penicilline","مجھے penicilline سے حساسیت ہے","حال: دوا کی حساسیت بتانی ہے۔"),a2Phrase("doctor-p8","u moet een week rust nemen","آپ کو ایک ہفتہ آرام کرنا چاہیے","حال: ڈاکٹر کی ہدایت سمجھنی ہے۔"),a2Phrase("doctor-p9","u mag voorlopig niet werken","آپ فی الحال کام نہیں کر سکتے","حال: کام سے متعلق طبی ہدایت سمجھنی ہے۔"),a2Phrase("doctor-p10","hoe vaak moet ik dit medicijn nemen?","یہ دوا کتنی بار لینی ہے؟","حال: دوا کی مقدار پوچھنی ہے۔"),a2Phrase("doctor-p11","zijn er bijwerkingen?","کیا اس کے مضر اثرات ہیں؟","حال: دوا کے اثرات پوچھنے ہیں۔"),a2Phrase("doctor-p12","wanneer moet ik terugkomen?","مجھے دوبارہ کب آنا ہے؟","حال: فالو اپ کا وقت پوچھنا ہے۔"),a2Phrase("doctor-p13","bel direct als het erger wordt","اگر حالت بگڑے تو فوراً فون کریں","حال: فوری ہدایت سمجھنی ہے۔"),a2Phrase("doctor-p14","ik heb een verklaring voor mijn werk nodig","مجھے کام کے لیے طبی کاغذ چاہیے","حال: کام کے لیے کاغذ مانگنا ہے۔"),a2Phrase("doctor-p15","kunt u dat in eenvoudige woorden uitleggen?","کیا آپ آسان الفاظ میں سمجھا سکتے ہیں؟","حال: طبی بات آسان کروانی ہے۔")],
    listenReplies: [["hoe lang heeft u al pijn?",["sinds drie dagen","als ik loop","twee keer per dag"],"sinds drie dagen","مدت بتائیں۔"],["heeft het medicijn geholpen?",["nee het heeft niet geholpen","ik ben allergisch","ik moet rusten"],"nee het heeft niet geholpen","اثر بتائیں۔"],["wanneer wordt het erger?",["als ik loop","sinds maandag","na een week"],"als ik loop","حالت بتائیں۔"]],
    builds: [["مجھے تین دن سے درد ہے",["ik","heb","sinds","drie","dagen","pijn"],"ik heb sinds drie dagen pijn","مدت۔"],["چلنے پر درد بڑھتا ہے",["de","pijn","wordt","erger","als","ik","loop"],"de pijn wordt erger als ik loop","شرط۔"],["دوا سے فائدہ نہیں ہوا",["het","medicijn","heeft","niet","geholpen"],"het medicijn heeft niet geholpen","نتیجہ۔"],["مجھے penicilline سے حساسیت ہے",["ik","ben","allergisch","voor","penicilline"],"ik ben allergisch voor penicilline","حساسیت۔"],["مجھے یہ کتنی بار لینی ہے؟",["hoe","vaak","moet","ik","dit","nemen"],"hoe vaak moet ik dit nemen","دوا کی مقدار۔"],["کیا مضر اثرات ہیں؟",["zijn","er","bijwerkingen"],"zijn er bijwerkingen","اثرات۔"],["مجھے دوبارہ کب آنا ہے؟",["wanneer","moet","ik","terugkomen"],"wanneer moet ik terugkomen","فالو اپ۔"],["آسان الفاظ میں سمجھائیں",["kunt","u","dat","in","eenvoudige","woorden","uitleggen"],"kunt u dat in eenvoudige woorden uitleggen","آسان وضاحت۔"]]
  }),
  makeA2PracticalLesson({
    id: "a2-bills-banking", unit: "A2: بل اور بینک", title: "Rekeningen betalen", description: "بل، آخری تاریخ، خودکار ادائیگی، غلط رقم، اور قسط کی درخواست۔",
    explanation: practicalExplanation("رقم، تاریخ، اور حوالہ نمبر احتیاط سے دیکھیں", ["rekening بل یا اکاؤنٹ دونوں ہو سکتا ہے۔", "betaaldatum ادائیگی کی آخری تاریخ ہے۔", "betalingsregeling قسطوں کا انتظام ہے۔"]),
    concepts: [dailyConcept("money-card","pinpas","بینک کارڈ","pinpas"),dailyConcept("money-bill","rekening","بل","bon"),dailyConcept("money-form","formulier","فارم","formulier"),dailyConcept("money-phone","telefoon","فون","telefoon"),dailyConcept("money-letter","brief","خط","bericht"),dailyConcept("money-sign","handtekening","دستخط","handtekening"),
      a2Phrase("money-p1","ik heb deze rekening al betaald","میں یہ بل پہلے ادا کر چکا / چکی ہوں","حال: دوبارہ آئے بل کی بات بتانی ہے۔"),a2Phrase("money-p2","het bedrag klopt niet","رقم درست نہیں ہے","حال: بل کی رقم میں غلطی بتانی ہے۔"),a2Phrase("money-p3","kunt u de rekening controleren?","کیا آپ بل چیک کر سکتے ہیں؟","حال: بل کی جانچ مانگنی ہے۔"),a2Phrase("money-p4","wanneer moet ik betalen?","مجھے کب ادائیگی کرنی ہے؟","حال: آخری تاریخ پوچھنی ہے۔"),a2Phrase("money-p5","de betaaldatum is volgende week","ادائیگی کی تاریخ اگلے ہفتے ہے","حال: آخری تاریخ سمجھنی ہے۔"),a2Phrase("money-p6","ik kan het hele bedrag niet direct betalen","میں پوری رقم فوراً ادا نہیں کر سکتا / سکتی","حال: مالی مشکل بتانی ہے۔"),a2Phrase("money-p7","kan ik in termijnen betalen?","کیا میں قسطوں میں ادا کر سکتا / سکتی ہوں؟","حال: قسط کی درخواست کرنی ہے۔"),a2Phrase("money-p8","ik wil een betalingsregeling aanvragen","میں قسطوں کا انتظام مانگنا چاہتا / چاہتی ہوں","حال: باقاعدہ قسط کی درخواست دینی ہے۔"),a2Phrase("money-p9","de automatische betaling is mislukt","خودکار ادائیگی ناکام ہو گئی","حال: خودکار ادائیگی کا مسئلہ بتانا ہے۔"),a2Phrase("money-p10","mijn pinpas werkt niet","میرا بینک کارڈ کام نہیں کر رہا","حال: کارڈ کا مسئلہ بتانا ہے۔"),a2Phrase("money-p11","ik ben mijn pinpas kwijt","میرا بینک کارڈ گم ہو گیا ہے","حال: کارڈ گم ہونے کی اطلاع دینی ہے۔"),a2Phrase("money-p12","blokkeer mijn pas alstublieft","میرا کارڈ بند کر دیں، برائے مہربانی","حال: گمشدہ کارڈ بند کروانا ہے۔"),a2Phrase("money-p13","wat is het betalingskenmerk?","ادائیگی کا حوالہ نمبر کیا ہے؟","حال: حوالہ نمبر پوچھنا ہے۔"),a2Phrase("money-p14","ik stuur een bewijs van betaling","میں ادائیگی کا ثبوت بھیجتا / بھیجتی ہوں","حال: ادائیگی کا ثبوت بھیجنا ہے۔"),a2Phrase("money-p15","kunt u dit per e-mail bevestigen?","کیا آپ ای میل سے تصدیق کر سکتے ہیں؟","حال: تحریری تصدیق مانگنی ہے۔")],
    listenReplies: [["wat klopt er niet?",["het bedrag is te hoog","ik betaal volgende week","mijn pas is nieuw"],"het bedrag is te hoog","رقم کا مسئلہ بتائیں۔"],["kunt u alles vandaag betalen?",["nee ik wil in termijnen betalen","de rekening is betaald","mijn pas werkt"],"nee ik wil in termijnen betalen","قسط مانگیں۔"],["heeft u een betalingsbewijs?",["ja ik stuur het per e-mail","de datum is volgende week","blokkeer mijn pas"],"ja ik stuur het per e-mail","ثبوت بھیجیں۔"]],
    builds: [["میں یہ بل ادا کر چکا / چکی ہوں",["ik","heb","deze","rekening","al","betaald"],"ik heb deze rekening al betaald","گزری ادائیگی۔"],["رقم درست نہیں ہے",["het","bedrag","klopt","niet"],"het bedrag klopt niet","غلط رقم۔"],["مجھے کب ادائیگی کرنی ہے؟",["wanneer","moet","ik","betalen"],"wanneer moet ik betalen","تاریخ۔"],["کیا میں قسطوں میں ادا کر سکتا / سکتی ہوں؟",["kan","ik","in","termijnen","betalen"],"kan ik in termijnen betalen","قسط۔"],["خودکار ادائیگی ناکام ہوئی",["de","automatische","betaling","is","mislukt"],"de automatische betaling is mislukt","ادائیگی کا مسئلہ۔"],["میرا کارڈ گم ہو گیا ہے",["ik","ben","mijn","pinpas","kwijt"],"ik ben mijn pinpas kwijt","گمشدہ کارڈ۔"],["میرا کارڈ بند کر دیں",["blokkeer","mijn","pas","alstublieft"],"blokkeer mijn pas alstublieft","فوری درخواست۔"],["میں ادائیگی کا ثبوت بھیجوں گا / گی",["ik","stuur","een","bewijs","van","betaling"],"ik stuur een bewijs van betaling","ثبوت۔"]]
  }),
  makeA2PracticalLesson({
    id: "a2-customer-complaints", unit: "A2: گاہک اور شکایت", title: "Klantenservice", description: "غلط یا خراب چیز، ضمانت، واپسی، رقم واپس، اور مسئلے کی پیروی۔",
    explanation: practicalExplanation("شکایت میں خریداری، مسئلہ، اور مطلوبہ حل بتائیں", ["bon اور aankoopdatum خریداری ثابت کرتے ہیں۔", "repareren، ruilen، یا geld terug تین مختلف حل ہیں۔", "شکایت نمبر سنبھال کر رکھیں تاکہ دوبارہ رابطہ ہو سکے۔"]),
    concepts: [dailyConcept("service-shop","winkel","دکان","winkel"),dailyConcept("service-receipt","bon","رسید","bon"),dailyConcept("service-warranty","garantie","ضمانت","garantie"),dailyConcept("service-broken","kapot","خراب","kapot"),dailyConcept("service-complaint","klacht","شکایت","klacht"),dailyConcept("service-repair","reparatie","مرمت","reparatie"),
      a2Phrase("service-p1","ik heb dit vorige week gekocht","میں نے یہ پچھلے ہفتے خریدا تھا","حال: خریداری کی تاریخ بتانی ہے۔"),a2Phrase("service-p2","het product werkt niet goed","چیز صحیح کام نہیں کرتی","حال: خرابی بتانی ہے۔"),a2Phrase("service-p3","hier is de bon","یہ رہی رسید","حال: خریداری کا ثبوت دینا ہے۔"),a2Phrase("service-p4","valt dit onder de garantie?","کیا یہ ضمانت میں آتا ہے؟","حال: ضمانت پوچھنی ہے۔"),a2Phrase("service-p5","ik wil het product laten repareren","میں چیز کی مرمت کروانا چاہتا / چاہتی ہوں","حال: مرمت کا حل مانگنا ہے۔"),a2Phrase("service-p6","ik wil het liever ruilen","میں اسے بدلنا زیادہ پسند کروں گا / گی","حال: تبدیلی مانگنی ہے۔"),a2Phrase("service-p7","kan ik mijn geld terugkrijgen?","کیا مجھے رقم واپس مل سکتی ہے؟","حال: رقم واپس مانگنی ہے۔"),a2Phrase("service-p8","de verkeerde maat is geleverd","غلط سائز پہنچایا گیا ہے","حال: ترسیل کی غلطی بتانی ہے۔"),a2Phrase("service-p9","een onderdeel ontbreekt","ایک حصہ موجود نہیں ہے","حال: چیز کا حصہ غائب ہونے کی بات بتانی ہے۔"),a2Phrase("service-p10","ik heb al twee keer gebeld","میں پہلے ہی دو بار فون کر چکا / چکی ہوں","حال: پچھلی کوششیں یاد دلانی ہیں۔"),a2Phrase("service-p11","wanneer krijg ik een oplossing?","مجھے حل کب ملے گا؟","حال: حل کی مدت پوچھنی ہے۔"),a2Phrase("service-p12","wat is mijn klachtnummer?","میرا شکایت نمبر کیا ہے؟","حال: شکایت نمبر پوچھنا ہے۔"),a2Phrase("service-p13","kunt u mij vandaag terugbellen?","کیا آپ آج مجھے واپس فون کر سکتے ہیں؟","حال: واپسی فون مانگنا ہے۔"),a2Phrase("service-p14","ik ben niet tevreden met deze oplossing","میں اس حل سے مطمئن نہیں ہوں","حال: پیش کردہ حل رد کرنا ہے۔"),a2Phrase("service-p15","ik wil graag met een leidinggevende spreken","میں ذمہ دار شخص سے بات کرنا چاہتا / چاہتی ہوں","حال: معاملہ اوپر لے جانا ہے۔")],
    listenReplies: [["wanneer heeft u dit gekocht?",["vorige week","onder de garantie","twee keer gebeld"],"vorige week","خریداری کا وقت بتائیں۔"],["wat wilt u dat wij doen?",["ik wil het laten repareren","hier is de bon","het onderdeel ontbreekt"],"ik wil het laten repareren","حل بتائیں۔"],["bent u tevreden met deze oplossing?",["nee ik ben niet tevreden","ja dit is mijn bon","ik heb garantie"],"nee ik ben niet tevreden","عدم اطمینان بتائیں۔"]],
    builds: [["میں نے یہ پچھلے ہفتے خریدا",["ik","heb","dit","vorige","week","gekocht"],"ik heb dit vorige week gekocht","خریداری۔"],["چیز صحیح کام نہیں کرتی",["het","product","werkt","niet","goed"],"het product werkt niet goed","خرابی۔"],["کیا یہ ضمانت میں ہے؟",["valt","dit","onder","de","garantie"],"valt dit onder de garantie","ضمانت۔"],["میں اسے بدلنا چاہتا / چاہتی ہوں",["ik","wil","het","liever","ruilen"],"ik wil het liever ruilen","حل۔"],["کیا رقم واپس مل سکتی ہے؟",["kan","ik","mijn","geld","terugkrijgen"],"kan ik mijn geld terugkrijgen","رقم واپسی۔"],["ایک حصہ غائب ہے",["een","onderdeel","ontbreekt"],"een onderdeel ontbreekt","نامکمل چیز۔"],["حل کب ملے گا؟",["wanneer","krijg","ik","een","oplossing"],"wanneer krijg ik een oplossing","مدت۔"],["میں ذمہ دار سے بات کرنا چاہتا / چاہتی ہوں",["ik","wil","graag","met","een","leidinggevende","spreken"],"ik wil graag met een leidinggevende spreken","معاملہ آگے بڑھائیں۔"]]
  }),
  makeA2PracticalLesson({
    id: "a2-formal-digital-messages", unit: "A2: رسمی ڈیجیٹل پیغام", title: "E-mail en berichten", description: "موضوع، آغاز، مسئلہ، درخواست، منسلک کاغذ، جواب، اور رسمی اختتام۔",
    explanation: practicalExplanation("رسمی پیغام مختصر مگر مکمل رکھیں", ["onderwerp میں پیغام کا مقصد لکھیں۔", "پہلے وجہ، پھر ضروری تفصیل، پھر واضح درخواست دیں۔", "bijlage منسلک فائل ہے اور met vriendelijke groet رسمی اختتام ہے۔"]),
    concepts: [dailyConcept("mail-message","bericht","پیغام","bericht"),dailyConcept("mail-form","formulier","فارم","formulier"),dailyConcept("mail-sign","handtekening","دستخط","handtekening"),dailyConcept("mail-phone","telefoon","فون","telefoon"),dailyConcept("mail-schedule","rooster","اوقات","rooster"),dailyConcept("mail-document","paspoort","دستاویز","paspoort"),
      a2Phrase("mail-p1","onderwerp: vraag over mijn afspraak","موضوع: میری ملاقات کے بارے میں سوال","حال: ای میل کا واضح موضوع لکھنا ہے۔"),a2Phrase("mail-p2","geachte meneer of mevrouw","محترم جناب یا محترمہ","حال: نامعلوم شخص کو رسمی آغاز کرنا ہے۔"),a2Phrase("mail-p3","ik schrijf omdat ik een vraag heb","میں لکھ رہا / رہی ہوں کیونکہ میرا ایک سوال ہے","حال: پیغام کی وجہ بتانی ہے۔"),a2Phrase("mail-p4","mijn afspraak staat op 12 mei","میری ملاقات 12 مئی کو ہے","حال: متعلقہ تاریخ دینی ہے۔"),a2Phrase("mail-p5","helaas kan ik op die dag niet komen","بدقسمتی سے میں اس دن نہیں آ سکتا / سکتی","حال: طے شدہ دن پر نہ آ سکنے کی بات بتانی ہے۔"),a2Phrase("mail-p6","ik wil graag een nieuwe datum afspreken","میں نئی تاریخ طے کرنا چاہتا / چاہتی ہوں","حال: نئی تاریخ مانگنی ہے۔"),a2Phrase("mail-p7","kunt u laten weten welke dag mogelijk is?","کیا آپ بتا سکتے ہیں کون سا دن ممکن ہے؟","حال: متبادل دن پوچھنا ہے۔"),a2Phrase("mail-p8","in de bijlage vindt u het formulier","منسلک فائل میں فارم موجود ہے","حال: منسلک فارم کا ذکر کرنا ہے۔"),a2Phrase("mail-p9","ik heb het formulier ingevuld en ondertekend","میں نے فارم بھر کر دستخط کر دیے ہیں","حال: فارم مکمل ہونے کی تصدیق کرنی ہے۔"),a2Phrase("mail-p10","ik heb nog geen antwoord ontvangen","مجھے ابھی تک جواب نہیں ملا","حال: جواب نہ آنے کی یاد دہانی دینی ہے۔"),a2Phrase("mail-p11","kunt u mijn bericht bevestigen?","کیا آپ میرے پیغام کی تصدیق کر سکتے ہیں؟","حال: وصولی کی تصدیق مانگنی ہے۔"),a2Phrase("mail-p12","u kunt mij telefonisch bereiken","آپ مجھ سے فون پر رابطہ کر سکتے ہیں","حال: رابطے کا طریقہ دینا ہے۔"),a2Phrase("mail-p13","alvast bedankt voor uw hulp","آپ کی مدد کا پیشگی شکریہ","حال: درخواست کے بعد شکریہ کہنا ہے۔"),a2Phrase("mail-p14","met vriendelijke groet","احترام کے ساتھ","حال: رسمی پیغام ختم کرنا ہے۔"),a2Phrase("mail-p15","ik stuur een kopie voor mijn administratie","میں اپنے ریکارڈ کے لیے نقل بھیجتا / بھیجتی ہوں","حال: نقل محفوظ رکھنے کی بات بتانی ہے۔")],
    listenReplies: [["waar gaat uw bericht over?",["over mijn afspraak","op 12 mei","in de bijlage"],"over mijn afspraak","پیغام کا موضوع بتائیں۔"],["heeft u het formulier meegestuurd?",["ja het staat in de bijlage","ik wil een nieuwe datum","ik heb nog geen antwoord"],"ja het staat in de bijlage","منسلک فائل کی تصدیق کریں۔"],["hoe kunnen wij u bereiken?",["u kunt mij bellen","met vriendelijke groet","op die dag niet"],"u kunt mij bellen","رابطے کا طریقہ دیں۔"]],
    builds: [["میں لکھ رہا ہوں کیونکہ میرا سوال ہے",["ik","schrijf","omdat","ik","een","vraag","heb"],"ik schrijf omdat ik een vraag heb","وجہ۔"],["میں اس دن نہیں آ سکتا / سکتی",["ik","kan","op","die","dag","niet","komen"],"ik kan op die dag niet komen","عدم دستیابی۔"],["میں نئی تاریخ چاہتا / چاہتی ہوں",["ik","wil","graag","een","nieuwe","datum","afspreken"],"ik wil graag een nieuwe datum afspreken","درخواست۔"],["فارم منسلک فائل میں ہے",["het","formulier","staat","in","de","bijlage"],"het formulier staat in de bijlage","منسلک فائل۔"],["میں نے فارم بھر دیا ہے",["ik","heb","het","formulier","ingevuld"],"ik heb het formulier ingevuld","مکمل کام۔"],["مجھے ابھی جواب نہیں ملا",["ik","heb","nog","geen","antwoord","ontvangen"],"ik heb nog geen antwoord ontvangen","یاد دہانی۔"],["کیا آپ پیغام کی تصدیق کر سکتے ہیں؟",["kunt","u","mijn","bericht","bevestigen"],"kunt u mijn bericht bevestigen","تصدیق۔"],["احترام کے ساتھ",["met","vriendelijke","groet"],"met vriendelijke groet","رسمی اختتام۔"]]
  })
);

const a1ExpansionTopics = [
  {
    id: "a1-details-forms",
    unit: "A1: ذاتی معلومات",
    title: "Gegevens invullen",
    description: "فارم میں نام، پتہ، تاریخ پیدائش، فون نمبر، اور ای میل سمجھنا۔",
    focus: "فارم میں ذاتی معلومات آہستہ اور صحیح جگہ پر بھری جاتی ہیں۔",
    words: [["voornaam","پہلا نام","naam"],["achternaam","خاندانی نام","naam"],["geboortedatum","تاریخ پیدائش","number-12"],["adres","پتہ","adres"],["postcode","پوسٹ کوڈ","adres"],["woonplaats","رہنے کا شہر","stad"],["telefoonnummer","فون نمبر","telefoon"],["e-mailadres","ای میل پتہ","telefoon"]],
    phrases: [["mijn voornaam is Sara","میرا پہلا نام Sara ہے","حال: فارم میں پہلا نام بتانا ہے۔"],["mijn achternaam is Khan","میرا خاندانی نام Khan ہے","حال: خاندانی نام بتانا ہے۔"],["mijn geboortedatum is 12 mei","میری تاریخ پیدائش 12 مئی ہے","حال: تاریخ پیدائش بتانی ہے۔"],["ik woon op Marktstraat 12","میں Marktstraat 12 پر رہتا / رہتی ہوں","حال: پتہ بتانا ہے۔"],["mijn postcode is 1234 AB","میرا پوسٹ کوڈ 1234 AB ہے","حال: پوسٹ کوڈ بتانا ہے۔"],["mijn woonplaats is Utrecht","میرا رہنے کا شہر Utrecht ہے","حال: شہر بتانا ہے۔"],["mijn telefoonnummer is nul zes","میرا فون نمبر صفر چھ سے شروع ہوتا ہے","حال: فون نمبر بتانا ہے۔"],["ik heb geen e-mailadres","میرے پاس ای میل پتہ نہیں ہے","حال: ای میل نہ ہونے کی بات بتانی ہے۔"]]
  },
  {
    id: "a1-phone-calls",
    unit: "A1: فون",
    title: "Bellen",
    description: "فون اٹھانا، واپس فون مانگنا، نمبر دہرانا، اور غلط نمبر بتانا۔",
    focus: "فون پر جملے بہت مختصر رکھیں: نام، وجہ، اور واپس رابطہ۔",
    words: [["telefoon","فون","telefoon"],["nummer","نمبر","telefoon"],["bericht","پیغام","bericht"],["voicemail","وائس میل","telefoon"],["bereik","سگنل","telefoon"],["verkeerd nummer","غلط نمبر","telefoon"],["terugbellen","واپس فون کرنا","telefoon"],["later","بعد میں","morgen"]],
    phrases: [["met Sara","Sara بول رہی ہوں","حال: فون اٹھا کر اپنا نام کہنا ہے۔"],["wie spreekt er?","کون بول رہا ہے؟","حال: فون پر سامنے والے کا نام پوچھنا ہے۔"],["kunt u later terugbellen?","کیا آپ بعد میں واپس فون کر سکتے ہیں؟","حال: ابھی بات ممکن نہیں۔"],["ik bel u vanavond terug","میں آپ کو شام کو واپس فون کروں گا / گی","حال: واپس فون کا وقت بتانا ہے۔"],["u heeft het verkeerde nummer","آپ نے غلط نمبر ملایا ہے","حال: غلط نمبر بتانا ہے۔"],["kunt u het nummer herhalen?","کیا آپ نمبر دہرا سکتے ہیں؟","حال: نمبر دوبارہ سننا ہے۔"],["spreek een bericht in","پیغام بول دیں","حال: وائس میل پر بات ہے۔"],["mijn telefoon heeft geen bereik","میرے فون میں سگنل نہیں ہے","حال: رابطہ مسئلہ بتانا ہے۔"]]
  },
  {
    id: "a1-short-messages",
    unit: "A1: پیغام",
    title: "Korte berichten",
    description: "WhatsApp یا SMS میں مختصر، صاف، ادب والا پیغام لکھنا۔",
    focus: "پیغام میں وجہ، وقت، اور اگلا قدم ایک یا دو جملوں میں دیں۔",
    words: [["bericht","پیغام","bericht"],["app","ایپ","telefoon"],["vandaag","آج","ochtend"],["morgen","کل","morgen"],["laat","دیر","wachten"],["ziek","بیمار","ziek"],["afspraak","ملاقات","rooster"],["antwoord","جواب","bericht"]],
    phrases: [["ik kom vandaag later","میں آج دیر سے آؤں گا / گی","حال: دیر سے آنے کی اطلاع دینی ہے۔"],["ik ben vandaag ziek","میں آج بیمار ہوں","حال: بیماری کا پیغام بھیجنا ہے۔"],["kunt u mij terugbellen?","کیا آپ مجھے واپس فون کر سکتے ہیں؟","حال: واپس رابطہ مانگنا ہے۔"],["ik heb morgen een afspraak","کل میری ملاقات ہے","حال: ملاقات کی اطلاع دینی ہے۔"],["stuur mij alstublieft een bericht","مجھے پیغام بھیج دیں، برائے مہربانی","حال: تحریری جواب مانگنا ہے۔"],["ik heb uw bericht gelezen","میں نے آپ کا پیغام پڑھ لیا ہے","حال: پیغام پڑھنے کی تصدیق کرنی ہے۔"],["sorry voor mijn late antwoord","دیر سے جواب کے لیے معاف کیجیے","حال: دیر سے جواب پر معافی مانگنی ہے۔"],["dank u voor uw bericht","آپ کے پیغام کا شکریہ","حال: پیغام کا شکریہ کہنا ہے۔"]]
  },
  {
    id: "a1-appointments",
    unit: "A1: ملاقات",
    title: "Afspraak maken",
    description: "ملاقات لینا، بدلنا، منسوخ کرنا، اور وقت دوبارہ پوچھنا۔",
    focus: "afspraak کے ساتھ دن اور وقت دونوں صاف بولیں۔",
    words: [["afspraak","ملاقات کا وقت","rooster"],["datum","تاریخ","number-12"],["tijd","وقت","uur"],["maandag","پیر","rooster"],["ochtend","صبح","ochtend"],["middag","دوپہر","middag"],["annuleren","منسوخ کرنا","formulier"],["veranderen","بدلنا","rooster"]],
    phrases: [["ik wil een afspraak maken","میں ملاقات کا وقت لینا چاہتا / چاہتی ہوں","حال: ملاقات لینی ہے۔"],["heeft u vandaag tijd?","کیا آج آپ کے پاس وقت ہے؟","حال: آج کا وقت پوچھنا ہے۔"],["kan het morgen in de ochtend?","کیا کل صبح ہو سکتا ہے؟","حال: کل صبح کا وقت مانگنا ہے۔"],["ik kan maandag niet komen","میں پیر کو نہیں آ سکتا / سکتی","حال: دن پر نہ آ سکنے کی بات بتانی ہے۔"],["ik wil de afspraak veranderen","میں ملاقات کا وقت بدلنا چاہتا / چاہتی ہوں","حال: وقت بدلنا ہے۔"],["ik moet de afspraak annuleren","مجھے ملاقات منسوخ کرنی ہے","حال: ملاقات منسوخ کرنی ہے۔"],["hoe laat is de afspraak?","ملاقات کتنے بجے ہے؟","حال: وقت پوچھنا ہے۔"],["kunt u de afspraak bevestigen?","کیا آپ ملاقات کی تصدیق کر سکتے ہیں؟","حال: تصدیق مانگنی ہے۔"]]
  },
  {
    id: "a1-school-contact",
    unit: "A1: اسکول",
    title: "Schoolcontact",
    description: "استاد، بچے کی غیر حاضری، ہوم ورک، اور بچے کو لینے کا وقت۔",
    focus: "اسکول کے پیغام میں بچے کا نام، وجہ، اور وقت ضروری ہے۔",
    words: [["school","اسکول","school"],["docent","استاد","docent"],["kind","بچہ","kind"],["huiswerk","گھر کا کام","huiswerk"],["rooster","اوقات","rooster"],["ziek","بیمار","ziek"],["brengen","چھوڑنا","school"],["ophalen","لینے آنا","school"]],
    phrases: [["mijn kind is vandaag ziek","میرا بچہ آج بیمار ہے","حال: غیر حاضری بتانی ہے۔"],["ik breng mijn kind om acht uur","میں بچے کو آٹھ بجے چھوڑتا / چھوڑتی ہوں","حال: چھوڑنے کا وقت بتانا ہے۔"],["ik haal mijn kind om drie uur op","میں بچے کو تین بجے لینے آتا / آتی ہوں","حال: لینے کا وقت بتانا ہے۔"],["ik wil de docent spreken","میں استاد سے بات کرنا چاہتا / چاہتی ہوں","حال: استاد سے رابطہ چاہیے۔"],["waar staat het huiswerk?","گھر کا کام کہاں لکھا ہے؟","حال: ہوم ورک پوچھنا ہے۔"],["het rooster staat in de app","اوقات ایپ میں ہیں","حال: اوقات کی جگہ بتانی ہے۔"],["morgen is er geen school","کل اسکول نہیں ہے","حال: اسکول بند ہونے کی بات سمجھنی ہے۔"],["kunt u mij een bericht sturen?","کیا آپ مجھے پیغام بھیج سکتے ہیں؟","حال: اسکول سے پیغام مانگنا ہے۔"]]
  },
  {
    id: "a1-neighbour-talk",
    unit: "A1: پڑوسی",
    title: "Met de buren",
    description: "سلام، شور، مدد، پیکٹ، کچرا، اور عمارت کی آسان بات چیت۔",
    focus: "پڑوسی سے بات کرتے وقت نرم الفاظ اور مختصر درخواست زیادہ بہتر ہیں۔",
    words: [["buurman","پڑوسی مرد","man"],["buurvrouw","پڑوسی عورت","vrouw"],["lawaai","شور","oor"],["pakket","پارسل","bericht"],["vuilnis","کچرا","afval"],["deur","دروازہ","deur"],["sleutel","چابی","sleutel"],["hulp","مدد","helpen"]],
    phrases: [["goedemorgen buurvrouw","صبح بخیر پڑوسن","حال: پڑوسی کو سلام کرنا ہے۔"],["kunt u mij helpen?","کیا آپ میری مدد کر سکتے ہیں؟","حال: مدد مانگنی ہے۔"],["ik heb last van lawaai","مجھے شور سے پریشانی ہے","حال: شور کی بات بتانی ہے۔"],["kunt u zachter zijn?","کیا آپ آواز کم کر سکتے ہیں؟","حال: ادب سے شور کم کروانا ہے۔"],["er ligt een pakket voor u","آپ کے لیے پارسل رکھا ہے","حال: پارسل کی اطلاع دینی ہے۔"],["waar moet het vuilnis staan?","کچرا کہاں رکھنا ہے؟","حال: کچرے کی جگہ پوچھنی ہے۔"],["ik ben mijn sleutel kwijt","میری چابی گم ہو گئی ہے","حال: چابی گم ہے۔"],["dank u voor uw hulp","آپ کی مدد کا شکریہ","حال: مدد کے بعد شکریہ کہنا ہے۔"]]
  },
  {
    id: "a1-home-repairs",
    unit: "A1: گھر",
    title: "Iets is kapot",
    description: "ہیٹنگ، پانی، بتی، دروازہ، اور مرمت کے لیے آسان جملے۔",
    focus: "گھر کی خرابی میں چیز، مسئلہ، اور کب مدد چاہیے یہ بتائیں۔",
    words: [["verwarming","ہیٹنگ","verwarming"],["water","پانی","water"],["lamp","بتی","lamp"],["deur","دروازہ","deur"],["raam","کھڑکی","raam"],["sleutel","چابی","sleutel"],["monteur","مرمت کرنے والا","reparatie"],["kapot","خراب","kapot"]],
    phrases: [["de verwarming doet het niet","ہیٹنگ کام نہیں کر رہی","حال: ہیٹنگ خراب ہے۔"],["er is geen warm water","گرم پانی نہیں ہے","حال: گرم پانی کا مسئلہ ہے۔"],["de lamp is kapot","بتی خراب ہے","حال: بتی خراب ہے۔"],["ik kan de deur niet openen","میں دروازہ نہیں کھول سکتا / سکتی","حال: دروازہ نہیں کھل رہا۔"],["het raam sluit niet goed","کھڑکی صحیح بند نہیں ہوتی","حال: کھڑکی کا مسئلہ ہے۔"],["wanneer komt de monteur?","مرمت کرنے والا کب آئے گا؟","حال: مرمت کا وقت پوچھنا ہے۔"],["kunt u iemand sturen?","کیا آپ کسی کو بھیج سکتے ہیں؟","حال: مدد کے لیے آدمی بھیجنے کو کہنا ہے۔"],["het probleem is opgelost","مسئلہ حل ہو گیا ہے","حال: مسئلہ ختم ہونے کی تصدیق کرنی ہے۔"]]
  },
  {
    id: "a1-shopping-returns",
    unit: "A1: خریداری",
    title: "Ruilen en terugbrengen",
    description: "چیز واپس کرنا، بدلنا، رسید دکھانا، سائز یا خرابی بتانا۔",
    focus: "واپسی میں رسید، مسئلہ، اور مطلوبہ حل صاف بتائیں۔",
    words: [["bon","رسید","bon"],["maat","سائز","maat"],["kleur","رنگ","kleur"],["jas","جیکٹ","jas"],["schoenen","جوتے","schoenen"],["kapot","خراب","kapot"],["ruilen","بدلنا","winkel"],["terugbrengen","واپس لانا","winkel"]],
    phrases: [["ik wil dit terugbrengen","میں یہ واپس کرنا چاہتا / چاہتی ہوں","حال: چیز واپس کرنی ہے۔"],["ik wil dit ruilen","میں یہ بدلنا چاہتا / چاہتی ہوں","حال: چیز بدلنی ہے۔"],["hier is de bon","یہ رہی رسید","حال: رسید دکھانی ہے۔"],["de maat is te klein","سائز بہت چھوٹا ہے","حال: سائز کا مسئلہ بتانا ہے۔"],["heeft u een grotere maat?","کیا آپ کے پاس بڑا سائز ہے؟","حال: بڑا سائز مانگنا ہے۔"],["de kleur is niet goed","رنگ صحیح نہیں ہے","حال: رنگ کا مسئلہ بتانا ہے۔"],["de jas is kapot","جیکٹ خراب ہے","حال: خرابی بتانی ہے۔"],["kan ik mijn geld terugkrijgen?","کیا مجھے پیسے واپس مل سکتے ہیں؟","حال: رقم واپسی پوچھنی ہے۔"]]
  },
  {
    id: "a1-supermarket",
    unit: "A1: سپر مارکیٹ",
    title: "In de supermarkt",
    description: "چیز تلاش کرنا، قیمت، وزن، تھیلا، رسید، اور ادائیگی۔",
    focus: "سپر مارکیٹ میں waar, hoeveel, mag ik سے آسان سوال بنائیں۔",
    words: [["supermarkt","سپر مارکیٹ","supermarkt"],["brood","روٹی","brood"],["melk","دودھ","melk"],["rijst","چاول","rijst"],["groente","سبزی","groente"],["fruit","پھل","fruit"],["tas","بیگ","tas"],["kassa","کاؤنٹر","kassa"]],
    phrases: [["waar ligt de rijst?","چاول کہاں رکھے ہیں؟","حال: چیز تلاش کرنی ہے۔"],["ik zoek melk","میں دودھ تلاش کر رہا / رہی ہوں","حال: چیز پوچھنی ہے۔"],["hoeveel kost dit brood?","یہ روٹی کتنے کی ہے؟","حال: قیمت پوچھنی ہے۔"],["mag ik een tas?","کیا مجھے ایک بیگ مل سکتا ہے؟","حال: تھیلا مانگنا ہے۔"],["ik betaal met pin","میں کارڈ سے ادائیگی کرتا / کرتی ہوں","حال: ادائیگی کا طریقہ بتانا ہے۔"],["mag ik de bon?","کیا مجھے رسید مل سکتی ہے؟","حال: رسید مانگنی ہے۔"],["de kassa is daar","کاؤنٹر وہاں ہے","حال: کاؤنٹر کی جگہ بتانی ہے۔"],["dit is te duur","یہ بہت مہنگا ہے","حال: قیمت زیادہ ہے۔"]]
  },
  {
    id: "a1-cafe-food-needs",
    unit: "A1: کھانا",
    title: "Eten bestellen",
    description: "کھانا منگوانا، بغیر گوشت، الرجی، غلط آرڈر، اور بل۔",
    focus: "کھانے میں ضرورت صاف بتائیں: zonder, met, ik wil graag۔",
    words: [["menu","مینو","eten"],["water","پانی","water"],["koffie","کافی","koffie"],["thee","چائے","thee"],["soep","سوپ","eten"],["vlees","گوشت","eten"],["rekening","بل","bon"],["bestelling","آرڈر","eten"]],
    phrases: [["mag ik het menu?","کیا مجھے مینو مل سکتا ہے؟","حال: مینو مانگنا ہے۔"],["ik wil graag water","مجھے پانی چاہیے","حال: پانی مانگنا ہے۔"],["voor mij een thee","میرے لیے ایک چائے","حال: چائے منگوانی ہے۔"],["zonder vlees alstublieft","گوشت کے بغیر، برائے مہربانی","حال: گوشت کے بغیر کھانا چاہیے۔"],["ik ben allergisch voor noten","مجھے nuts سے الرجی ہے","حال: الرجی بتانی ہے۔"],["dit is niet mijn bestelling","یہ میرا آرڈر نہیں ہے","حال: غلط آرڈر بتانا ہے۔"],["ik heb nog niets gekregen","مجھے ابھی تک کچھ نہیں ملا","حال: آرڈر نہیں آیا۔"],["de rekening alstublieft","بل، برائے مہربانی","حال: بل مانگنا ہے۔"]]
  },
  {
    id: "a1-directions-town",
    unit: "A1: راستہ",
    title: "De weg vragen",
    description: "راستہ پوچھنا، بائیں، دائیں، سیدھا، قریب، دور، اور نقشہ۔",
    focus: "راستہ پوچھنے میں waar is... اور hoe kom ik bij... بہت کام آتے ہیں۔",
    words: [["links","بائیں","links"],["rechts","دائیں","rechts"],["rechtdoor","سیدھا","rechtdoor"],["straat","سڑک","straat"],["plein","چوک","stad"],["kaart","نقشہ","kaart"],["dichtbij","قریب","hier"],["ver weg","دور","daar"]],
    phrases: [["waar is het station?","اسٹیشن کہاں ہے؟","حال: اسٹیشن پوچھنا ہے۔"],["hoe kom ik bij de apotheek?","میں دواخانے تک کیسے جاؤں؟","حال: راستہ پوچھنا ہے۔"],["ga rechtdoor","سیدھا جائیں","حال: سمت بتانی ہے۔"],["sla links af","بائیں مڑیں","حال: بائیں مڑنے کو کہنا ہے۔"],["sla rechts af","دائیں مڑیں","حال: دائیں مڑنے کو کہنا ہے۔"],["het is dichtbij","یہ قریب ہے","حال: جگہ قریب ہے۔"],["het is ver weg","یہ دور ہے","حال: جگہ دور ہے۔"],["kunt u het op de kaart laten zien?","کیا آپ نقشے پر دکھا سکتے ہیں؟","حال: نقشے پر مدد چاہیے۔"]]
  },
  {
    id: "a1-bus-train-extra",
    unit: "A1: سفر",
    title: "Bus en trein",
    description: "ٹکٹ، پلیٹ فارم، اسٹاپ، تاخیر، گاڑی بدلنا، اور منزل۔",
    focus: "سفر میں bestemming, spoor, halte, vertraging بار بار آتے ہیں۔",
    words: [["bus","بس","bus"],["trein","ٹرین","trein"],["station","اسٹیشن","station"],["halte","بس اسٹاپ","halte"],["kaartje","ٹکٹ","kaartje"],["spoor","پلیٹ فارم","station"],["vertraging","تاخیر","wachten"],["bestemming","منزل","kaart"]],
    phrases: [["ik wil een kaartje naar Utrecht","مجھے Utrecht کا ٹکٹ چاہیے","حال: ٹکٹ خریدنا ہے۔"],["gaat deze bus naar het centrum?","کیا یہ بس مرکز جاتی ہے؟","حال: بس کی منزل پوچھنی ہے۔"],["van welk spoor vertrekt de trein?","ٹرین کس پلیٹ فارم سے جاتی ہے؟","حال: پلیٹ فارم پوچھنا ہے۔"],["de trein heeft vertraging","ٹرین دیر سے ہے","حال: تاخیر سمجھنی ہے۔"],["waar moet ik overstappen?","مجھے کہاں گاڑی بدلنی ہے؟","حال: گاڑی بدلنے کی جگہ پوچھنی ہے۔"],["moet ik hier uitstappen?","کیا مجھے یہاں اترنا ہے؟","حال: اترنے کی جگہ پوچھنی ہے۔"],["de volgende halte is centrum","اگلا اسٹاپ مرکز ہے","حال: اگلا اسٹاپ سمجھنا ہے۔"],["ik ben mijn kaartje kwijt","میرا ٹکٹ گم ہو گیا ہے","حال: ٹکٹ گم ہے۔"]]
  },
  {
    id: "a1-weather-clothes",
    unit: "A1: موسم",
    title: "Weer en kleding",
    description: "بارش، سردی، گرمی، جیکٹ، چھتری، اور باہر جانے کی تیاری۔",
    focus: "موسم کے ساتھ kleding اور nodig والے جملے آسانی سے بنتے ہیں۔",
    words: [["regen","بارش","regen"],["zon","دھوپ","zon"],["koud","سرد","koud"],["warm","گرم","warm"],["jas","جیکٹ","jas"],["paraplu","چھتری","paraplu"],["schoenen","جوتے","schoenen"],["buiten","باہر","buiten"]],
    phrases: [["het regent vandaag","آج بارش ہو رہی ہے","حال: موسم بتانا ہے۔"],["het is koud buiten","باہر سردی ہے","حال: باہر سردی ہے۔"],["ik heb een jas nodig","مجھے جیکٹ چاہیے","حال: جیکٹ کی ضرورت ہے۔"],["neem een paraplu mee","چھتری ساتھ لیں","حال: بارش کے لیے نصیحت ہے۔"],["de zon schijnt","دھوپ نکلی ہے","حال: دھوپ ہے۔"],["het is warm vandaag","آج گرمی ہے","حال: موسم گرم ہے۔"],["mijn schoenen zijn nat","میرے جوتے گیلے ہیں","حال: جوتے گیلے ہو گئے۔"],["ik ga niet naar buiten","میں باہر نہیں جا رہا / رہی","حال: باہر نہ جانے کا فیصلہ ہے۔"]]
  },
  {
    id: "a1-pharmacy-medicine",
    unit: "A1: دوا",
    title: "Bij de apotheek",
    description: "نسخہ، دوا، مقدار، دن میں کتنی بار، اور دوا لینے کا طریقہ۔",
    focus: "دوا کے لیے hoeveel, hoe vaak, voor/na het eten سمجھنا ضروری ہے۔",
    words: [["apotheek","دواخانہ","apotheek"],["medicijn","دوا","medicijn"],["recept","نسخہ","formulier"],["tablet","گولی","medicijn"],["pijn","درد","pijn"],["koorts","بخار","ziek"],["water","پانی","water"],["etiket","لیبل","formulier"]],
    phrases: [["ik heb een recept","میرے پاس نسخہ ہے","حال: نسخہ دکھانا ہے۔"],["ik kom mijn medicijn ophalen","میں اپنی دوا لینے آیا / آئی ہوں","حال: دوا لینی ہے۔"],["hoe vaak moet ik dit nemen?","مجھے یہ کتنی بار لینی ہے؟","حال: مقدار پوچھنی ہے۔"],["twee keer per dag","دن میں دو بار","حال: دوا کی مقدار سمجھنی ہے۔"],["voor het eten of na het eten?","کھانے سے پہلے یا بعد؟","حال: دوا کا وقت پوچھنا ہے۔"],["neem dit met water","یہ پانی کے ساتھ لیں","حال: دوا کی ہدایت سمجھنی ہے۔"],["ik heb pijn en koorts","مجھے درد اور بخار ہے","حال: علامات بتانی ہیں۔"],["ik begrijp het etiket niet","مجھے لیبل سمجھ نہیں آیا","حال: دوا کا لیبل سمجھ نہیں آتا۔"]]
  },
  {
    id: "a1-doctor-symptoms",
    unit: "A1: ڈاکٹر",
    title: "Klachten vertellen",
    description: "درد کہاں ہے، کب سے ہے، بخار، کھانسی، اور ملاقات کا وقت۔",
    focus: "ڈاکٹر کے پاس waar, sinds wanneer, ik heb... سے بات شروع کریں۔",
    words: [["huisarts","گھر کا ڈاکٹر","huisarts"],["pijn","درد","pijn"],["hoofd","سر","hoofd"],["buik","پیٹ","buik"],["koorts","بخار","ziek"],["hoesten","کھانسی","hoesten"],["moe","تھکا ہوا","slapen"],["afspraak","ملاقات","rooster"]],
    phrases: [["ik wil een afspraak maken","میں ملاقات کا وقت لینا چاہتا / چاہتی ہوں","حال: ڈاکٹر سے وقت لینا ہے۔"],["ik heb pijn in mijn hoofd","میرے سر میں درد ہے","حال: سر درد بتانا ہے۔"],["ik heb pijn in mijn buik","میرے پیٹ میں درد ہے","حال: پیٹ درد بتانا ہے۔"],["ik heb koorts","مجھے بخار ہے","حال: بخار بتانا ہے۔"],["ik moet veel hoesten","مجھے بہت کھانسی ہے","حال: کھانسی بتانی ہے۔"],["ik ben erg moe","میں بہت تھکا / تھکی ہوں","حال: تھکن بتانی ہے۔"],["sinds gisteren","کل سے","حال: مدت بتانی ہے۔"],["wanneer kan ik komen?","میں کب آ سکتا / سکتی ہوں؟","حال: ملاقات کا وقت پوچھنا ہے۔"]]
  },
  {
    id: "a1-work-schedule",
    unit: "A1: کام",
    title: "Rooster en werk",
    description: "کام کا وقت، وقفہ، تاخیر، بیماری، اور شفٹ کا پیغام۔",
    focus: "کام کے پیغام میں vandaag, morgen, laat, ziek, rooster بہت ضروری ہیں۔",
    words: [["werk","کام","werk"],["rooster","شیڈول","rooster"],["pauze","وقفہ","wachten"],["baas","ذمہ دار","persoon"],["collega","ساتھی","persoon"],["te laat","دیر سے","wachten"],["ziek","بیمار","ziek"],["dienst","شفٹ","rooster"]],
    phrases: [["ik begin om negen uur","میں نو بجے شروع کرتا / کرتی ہوں","حال: کام شروع ہونے کا وقت ہے۔"],["ik heb om twaalf uur pauze","میرا بارہ بجے وقفہ ہے","حال: وقفے کا وقت ہے۔"],["ik kom vandaag later","میں آج دیر سے آؤں گا / گی","حال: دیر سے آنے کا پیغام ہے۔"],["ik ben ziek en kan niet werken","میں بیمار ہوں اور کام نہیں کر سکتا / سکتی","حال: بیماری کی اطلاع ہے۔"],["staat het rooster in de app?","کیا شیڈول ایپ میں ہے؟","حال: شیڈول پوچھنا ہے۔"],["ik werk morgen niet","میں کل کام نہیں کرتا / کرتی","حال: کل کام نہیں ہے۔"],["kan ik met mijn baas spreken?","کیا میں اپنے ذمہ دار سے بات کر سکتا / سکتی ہوں؟","حال: ذمہ دار سے بات چاہیے۔"],["mijn dienst is veranderd","میری شفٹ بدل گئی ہے","حال: شیڈول بدل گیا۔"]]
  },
  {
    id: "a1-money-bank",
    unit: "A1: پیسے",
    title: "Betalen en bank",
    description: "کارڈ، نقد، رسید، رقم، ادائیگی، اور کارڈ نہ چلنا۔",
    focus: "ادائیگی میں pin, contant, bon, bedrag, betalen بار بار آتے ہیں۔",
    words: [["pinpas","بینک کارڈ","pinpas"],["contant","نقد","contant"],["bon","رسید","bon"],["bedrag","رقم","prijs"],["rekening","بل","bon"],["betalen","ادائیگی کرنا","betalen"],["geld","پیسے","prijs"],["automaat","مشین","pinpas"]],
    phrases: [["ik betaal met pin","میں کارڈ سے ادائیگی کرتا / کرتی ہوں","حال: کارڈ سے ادائیگی ہے۔"],["ik betaal contant","میں نقد ادائیگی کرتا / کرتی ہوں","حال: نقد ادائیگی ہے۔"],["mijn pinpas werkt niet","میرا بینک کارڈ کام نہیں کر رہا","حال: کارڈ مسئلہ ہے۔"],["mag ik de bon?","کیا مجھے رسید مل سکتی ہے؟","حال: رسید چاہیے۔"],["het bedrag klopt niet","رقم درست نہیں ہے","حال: رقم میں مسئلہ ہے۔"],["ik heb niet genoeg geld","میرے پاس کافی پیسے نہیں ہیں","حال: پیسے کم ہیں۔"],["waar is de pinautomaat?","کارڈ مشین کہاں ہے؟","حال: مشین پوچھنی ہے۔"],["ik heb de rekening betaald","میں نے بل ادا کر دیا ہے","حال: ادائیگی ہو چکی ہے۔"]]
  },
  {
    id: "a1-post-parcel-extra",
    unit: "A1: ڈاک",
    title: "Post ophalen",
    description: "خط، پارسل، پتہ، وصولی، شناخت، اور ڈلیوری پیغام۔",
    focus: "پارسل لینے میں bericht, identiteitsbewijs, afhaalpunt اہم ہیں۔",
    words: [["post","ڈاک","bericht"],["brief","خط","bericht"],["pakket","پارسل","bericht"],["adres","پتہ","adres"],["afhaalpunt","وصولی کی جگہ","winkel"],["identiteitsbewijs","شناختی کاغذ","paspoort"],["bezorger","ڈلیوری والا","persoon"],["handtekening","دستخط","handtekening"]],
    phrases: [["ik wil mijn pakket ophalen","میں اپنا پارسل لینا چاہتا / چاہتی ہوں","حال: پارسل لینا ہے۔"],["hier is mijn bericht","یہ میرا پیغام ہے","حال: ڈلیوری پیغام دکھانا ہے۔"],["heeft u een identiteitsbewijs?","کیا آپ کے پاس شناختی کاغذ ہے؟","حال: شناخت پوچھی گئی۔"],["hier is mijn identiteitsbewijs","یہ میرا شناختی کاغذ ہے","حال: شناخت دکھانی ہے۔"],["het pakket is nog niet gekomen","پارسل ابھی نہیں آیا","حال: پارسل نہیں پہنچا۔"],["op welk adres is het bezorgd?","یہ کس پتے پر پہنچایا گیا؟","حال: پتہ پوچھنا ہے۔"],["ik moet hier tekenen","مجھے یہاں دستخط کرنے ہیں","حال: دستخط کرنا ہے۔"],["de brief is voor mijn buurman","خط میرے پڑوسی کے لیے ہے","حال: غلط ڈاک آئی ہے۔"]]
  },
  {
    id: "a1-child-care",
    unit: "A1: خاندان",
    title: "Kind en opvang",
    description: "بچہ، وقت، لانا، لے جانا، کھانا، بیماری، اور اجازت۔",
    focus: "بچے کے بارے میں جملے نرم، واضح، اور وقت کے ساتھ ہوتے ہیں۔",
    words: [["kind","بچہ","kind"],["opvang","بچوں کی دیکھ بھال","school"],["ouder","والدین","persoon"],["eten","کھانا","eten"],["drinken","پینا","water"],["slaap","نیند","slapen"],["jas","جیکٹ","jas"],["ziek","بیمار","ziek"]],
    phrases: [["mijn kind komt vandaag niet","میرا بچہ آج نہیں آئے گا","حال: غیر حاضری بتانی ہے۔"],["ik breng mijn kind om acht uur","میں بچے کو آٹھ بجے چھوڑتا / چھوڑتی ہوں","حال: چھوڑنے کا وقت ہے۔"],["ik haal mijn kind om vijf uur op","میں بچے کو پانچ بجے لینے آؤں گا / گی","حال: لینے کا وقت ہے۔"],["mijn kind heeft eten mee","میرے بچے کے پاس کھانا ساتھ ہے","حال: کھانا ساتھ ہے۔"],["mijn kind heeft water nodig","میرے بچے کو پانی چاہیے","حال: بچے کو پانی چاہیے۔"],["mijn kind is moe","میرا بچہ تھکا ہوا ہے","حال: بچے کی حالت بتانی ہے۔"],["zijn jas hangt aan de kapstok","اس کی جیکٹ ہینگر پر ہے","حال: جیکٹ کی جگہ بتانی ہے۔"],["mag mijn kind buiten spelen?","کیا میرا بچہ باہر کھیل سکتا ہے؟","حال: اجازت پوچھنی ہے۔"]]
  },
  {
    id: "a1-house-search-extra",
    unit: "A1: گھر",
    title: "Woning bekijken",
    description: "گھر دیکھنا، کمرے، کرایہ، تاریخ، بچوں کے ساتھ رہنا، اور دلچسپی۔",
    focus: "گھر کے اشتہار میں huur, kamer, beschikbaar, bezichtiging سمجھنا ضروری ہے۔",
    words: [["woning","گھر","huis"],["kamer","کمرہ","kamer"],["huur","کرایہ","prijs"],["keuken","کچن","keuken"],["badkamer","باتھ روم","badkamer"],["tuin","باغ","buiten"],["beschikbaar","دستیاب","rooster"],["bezichtiging","گھر دیکھنے کا وقت","afspraak"]],
    phrases: [["ik zoek een woning","میں گھر تلاش کر رہا / رہی ہوں","حال: گھر تلاش کرنا ہے۔"],["hoeveel is de huur?","کرایہ کتنا ہے؟","حال: کرایہ پوچھنا ہے۔"],["heeft de woning twee kamers?","کیا گھر میں دو کمرے ہیں؟","حال: کمروں کی تعداد پوچھنی ہے۔"],["wanneer is de woning beschikbaar?","گھر کب دستیاب ہے؟","حال: تاریخ پوچھنی ہے۔"],["kan ik de woning bekijken?","کیا میں گھر دیکھ سکتا / سکتی ہوں؟","حال: گھر دیکھنے کا وقت مانگنا ہے۔"],["is er een tuin?","کیا باغ ہے؟","حال: باغ پوچھنا ہے۔"],["mag ik hier met kinderen wonen?","کیا میں یہاں بچوں کے ساتھ رہ سکتا / سکتی ہوں؟","حال: بچوں کے ساتھ رہنے کی اجازت پوچھنی ہے۔"],["ik ben geïnteresseerd","مجھے دلچسپی ہے","حال: دلچسپی بتانی ہے۔"]]
  },
  {
    id: "a1-library-community",
    unit: "A1: محلہ",
    title: "Bibliotheek en buurt",
    description: "لائبریری، کلاس، ممبرشپ، کھلنے کا وقت، اور محلے کی مدد۔",
    focus: "محلے میں leren, lid worden, open, gesloten جیسے لفظ کام آتے ہیں۔",
    words: [["bibliotheek","لائبریری","bibliotheek"],["les","کلاس","school"],["taal","زبان","boek"],["boek","کتاب","boek"],["pas","کارڈ","pinpas"],["open","کھلا","ingang"],["gesloten","بند","uitgang"],["buurthuis","محلے کا مرکز","stad"]],
    phrases: [["waar is de bibliotheek?","لائبریری کہاں ہے؟","حال: لائبریری پوچھنی ہے۔"],["ik wil Nederlands leren","میں Nederlands سیکھنا چاہتا / چاہتی ہوں","حال: زبان سیکھنی ہے۔"],["heeft u taalles?","کیا آپ کے پاس زبان کی کلاس ہے؟","حال: کلاس پوچھنی ہے۔"],["ik wil lid worden","میں ممبر بننا چاہتا / چاہتی ہوں","حال: ممبرشپ چاہیے۔"],["heb ik een pas nodig?","کیا مجھے کارڈ چاہیے؟","حال: کارڈ پوچھنا ہے۔"],["hoe laat is het open?","یہ کتنے بجے کھلتا ہے؟","حال: کھلنے کا وقت پوچھنا ہے۔"],["vandaag is het gesloten","آج یہ بند ہے","حال: بند ہونے کی بات سمجھنی ہے۔"],["kunt u mij inschrijven?","کیا آپ مجھے رجسٹر کر سکتے ہیں؟","حال: رجسٹریشن چاہیے۔"]]
  },
  {
    id: "a1-safety-rules",
    unit: "A1: حفاظت",
    title: "Regels en veiligheid",
    description: "منع، اجازت، انتظار، داخلہ، خروج، خطرہ، اور مدد۔",
    focus: "عوامی جگہ میں mag, moet, verboden, gevaarlijk سمجھنا ضروری ہے۔",
    words: [["verboden","منع","verboden"],["toegestaan","اجازت ہے","goed"],["gevaarlijk","خطرناک","gevaar"],["veilig","محفوظ","veilig"],["ingang","داخلہ","ingang"],["uitgang","خروج","uitgang"],["wachten","انتظار کرنا","wachten"],["helpen","مدد کرنا","helpen"]],
    phrases: [["het is hier verboden","یہاں منع ہے","حال: منع سمجھنا ہے۔"],["mag ik hier wachten?","کیا میں یہاں انتظار کر سکتا / سکتی ہوں؟","حال: اجازت پوچھنی ہے۔"],["u moet hier wachten","آپ کو یہاں انتظار کرنا ہے","حال: ہدایت سمجھنی ہے۔"],["waar is de uitgang?","خروج کہاں ہے؟","حال: باہر کا راستہ پوچھنا ہے۔"],["de ingang is daar","داخلہ وہاں ہے","حال: داخلہ بتانا ہے۔"],["dit is gevaarlijk","یہ خطرناک ہے","حال: خطرہ سمجھنا ہے۔"],["alles is veilig","سب محفوظ ہے","حال: حفاظت کی تصدیق ہے۔"],["ik heb hulp nodig","مجھے مدد چاہیے","حال: مدد چاہیے۔"]]
  },
  {
    id: "a1-calendar-time",
    unit: "A1: وقت",
    title: "Dagen en tijden",
    description: "دن، صبح، دوپہر، شام، آج، کل، وقت پر، اور دیر سے۔",
    focus: "وقت بتانے میں op دن کے ساتھ اور om گھڑی کے وقت کے ساتھ آتا ہے۔",
    words: [["maandag","پیر","rooster"],["vrijdag","جمعہ","rooster"],["weekend","ہفتہ وار چھٹی","rooster"],["ochtend","صبح","ochtend"],["middag","دوپہر","middag"],["avond","شام","avond"],["op tijd","وقت پر","rooster"],["te laat","دیر سے","wachten"]],
    phrases: [["ik kom op maandag","میں پیر کو آتا / آتی ہوں","حال: دن بتانا ہے۔"],["ik werk op vrijdag","میں جمعہ کو کام کرتا / کرتی ہوں","حال: کام کا دن بتانا ہے۔"],["in het weekend ben ik thuis","ہفتہ وار چھٹی میں گھر پر ہوں","حال: ویک اینڈ بتانا ہے۔"],["ik kom in de ochtend","میں صبح آتا / آتی ہوں","حال: صبح کا وقت ہے۔"],["ik heb tijd in de middag","دوپہر میں میرے پاس وقت ہے","حال: دستیاب وقت ہے۔"],["ik bel u in de avond","میں آپ کو شام کو فون کروں گا / گی","حال: فون کا وقت ہے۔"],["ik ben op tijd","میں وقت پر ہوں","حال: وقت پر پہنچے ہیں۔"],["sorry ik ben te laat","معاف کیجیے، میں دیر سے ہوں","حال: دیر ہو گئی ہے۔"]]
  },
  {
    id: "a1-questions-revision",
    unit: "A1: سوال",
    title: "Veel vragen",
    description: "wie, wat, waar, wanneer, hoeveel, waarom, hoe کو روزمرہ میں استعمال کرنا۔",
    focus: "A1 میں سوال کا پہلا لفظ پورے جملے کا راستہ دکھاتا ہے۔",
    words: [["wie","کون","vraag"],["wat","کیا","vraag"],["waar","کہاں","vraag"],["wanneer","کب","rooster"],["hoeveel","کتنا","prijs"],["waarom","کیوں","vraag"],["hoe","کیسے","vraag"],["welke","کون سا","vraag"]],
    phrases: [["wie is dat?","وہ کون ہے؟","حال: شخص پوچھنا ہے۔"],["wat is dit?","یہ کیا ہے؟","حال: چیز پوچھنی ہے۔"],["waar woont u?","آپ کہاں رہتے ہیں؟","حال: رہنے کی جگہ پوچھنی ہے۔"],["wanneer komt u?","آپ کب آئیں گے؟","حال: وقت پوچھنا ہے۔"],["hoeveel kost dit?","یہ کتنے کا ہے؟","حال: قیمت پوچھنی ہے۔"],["waarom komt u niet?","آپ کیوں نہیں آ رہے؟","حال: وجہ پوچھنی ہے۔"],["hoe gaat het?","آپ کیسے ہیں؟","حال: حال پوچھنا ہے۔"],["welke bus moet ik nemen?","مجھے کون سی بس لینی ہے؟","حال: درست بس پوچھنی ہے۔"]]
  },
  {
    id: "a1-polite-chunks",
    unit: "A1: ادب",
    title: "Beleefd spreken",
    description: "براہ مہربانی، شکریہ، معاف کیجیے، کیا آپ کر سکتے ہیں، اور نرم درخواست۔",
    focus: "ادب والے چھوٹے لفظ مشکل حالت کو آسان بنا دیتے ہیں۔",
    words: [["alstublieft","براہ مہربانی","thanks"],["dank u wel","شکریہ","thanks"],["sorry","معاف کیجیے","sorry"],["graag","خوشی سے / چاہیے","goed"],["kunt u","کیا آپ کر سکتے ہیں","helpen"],["mag ik","کیا میں کر سکتا ہوں","vraag"],["geen probleem","کوئی مسئلہ نہیں","goed"],["tot ziens","پھر ملیں گے","totziens"]],
    phrases: [["kunt u mij helpen alstublieft?","کیا آپ میری مدد کر سکتے ہیں، برائے مہربانی؟","حال: ادب سے مدد مانگنی ہے۔"],["mag ik iets vragen?","کیا میں کچھ پوچھ سکتا / سکتی ہوں؟","حال: سوال شروع کرنا ہے۔"],["dank u wel voor uw hulp","آپ کی مدد کا شکریہ","حال: مدد کے بعد شکریہ ہے۔"],["sorry ik begrijp het niet","معاف کیجیے، مجھے سمجھ نہیں آیا","حال: نہ سمجھنے پر ادب ہے۔"],["ja graag","جی ہاں، خوشی سے","حال: پیشکش قبول کرنی ہے۔"],["nee dank u","نہیں، شکریہ","حال: ادب سے انکار ہے۔"],["geen probleem","کوئی مسئلہ نہیں","حال: مسئلہ نہیں کہنا ہے۔"],["tot ziens en fijne dag","پھر ملیں گے، اچھا دن ہو","حال: رخصت ہونا ہے۔"]]
  },
  {
    id: "a1-family-routine-extra",
    unit: "A1: خاندان",
    title: "Familie en dag",
    description: "خاندان کے افراد، عمر، رہنا، کام، اسکول، اور روزمرہ عادت۔",
    focus: "خاندان کے بارے میں ik heb, hij is, zij gaat سے آسان جملے بنتے ہیں۔",
    words: [["moeder","ماں","vrouw"],["vader","باپ","man"],["zoon","بیٹا","kind"],["dochter","بیٹی","kind"],["broer","بھائی","man"],["zus","بہن","vrouw"],["familie","خاندان","familie"],["kinderen","بچے","kind"]],
    phrases: [["ik heb twee kinderen","میرے دو بچے ہیں","حال: بچوں کی تعداد بتانی ہے۔"],["mijn zoon gaat naar school","میرا بیٹا اسکول جاتا ہے","حال: بچے کا اسکول بتانا ہے۔"],["mijn dochter is vijf jaar","میری بیٹی پانچ سال کی ہے","حال: عمر بتانی ہے۔"],["mijn moeder woont dichtbij","میری ماں قریب رہتی ہے","حال: خاندان کی رہائش بتانی ہے۔"],["mijn vader werkt vandaag","میرے والد آج کام کرتے ہیں","حال: خاندان کے کام کی بات ہے۔"],["ik heb een broer en een zus","میرا ایک بھائی اور ایک بہن ہے","حال: بہن بھائی بتانے ہیں۔"],["mijn familie woont in Nederland","میرا خاندان Nederland میں رہتا ہے","حال: خاندان کی جگہ بتانی ہے۔"],["wij eten samen in de avond","ہم شام کو ساتھ کھاتے ہیں","حال: خاندان کا معمول بتانا ہے۔"]]
  },
  {
    id: "a1-cleaning-house",
    unit: "A1: گھر",
    title: "Schoonmaken",
    description: "صفائی، کچرا، کپڑے دھونا، برتن، کمرہ، اور گھر کا کام۔",
    focus: "روزمرہ گھر کے کاموں کے لیے ik moet اور ik ga بہت کام آتے ہیں۔",
    words: [["schoonmaken","صفائی کرنا","huis"],["vuilnis","کچرا","afval"],["was","دھلائی","kleding"],["kleding","کپڑے","jas"],["kamer","کمرہ","kamer"],["keuken","کچن","keuken"],["badkamer","باتھ روم","badkamer"],["stofzuiger","ویکیوم","huis"]],
    phrases: [["ik moet de kamer schoonmaken","مجھے کمرہ صاف کرنا ہے","حال: صفائی کرنی ہے۔"],["waar moet het vuilnis staan?","کچرا کہاں رکھنا ہے؟","حال: کچرے کی جگہ پوچھنی ہے۔"],["ik doe vandaag de was","میں آج کپڑے دھوتا / دھوتی ہوں","حال: کپڑے دھونے ہیں۔"],["de keuken is schoon","کچن صاف ہے","حال: کچن صاف ہے۔"],["de badkamer is vies","باتھ روم گندا ہے","حال: باتھ روم گندا ہے۔"],["ik gebruik de stofzuiger","میں ویکیوم استعمال کرتا / کرتی ہوں","حال: ویکیوم کر رہے ہیں۔"],["mijn kleding is nat","میرے کپڑے گیلے ہیں","حال: کپڑے گیلے ہیں۔"],["ik ben klaar met schoonmaken","میں صفائی سے فارغ ہو گیا / گئی","حال: کام مکمل ہے۔"]]
  },
  {
    id: "a1-daily-review-one",
    unit: "A1: دہرائی",
    title: "Dagelijkse mix 1",
    description: "تعارف، فون، پیغام، ملاقات، اسکول، اور پڑوسی کی مشترک مشق۔",
    focus: "یہ دہرائی نئے لفظ نہیں دیتی؛ روزمرہ جواب جلدی پہچنوانے کے لیے ہے۔",
    words: [["naam","نام","naam"],["telefoon","فون","telefoon"],["bericht","پیغام","bericht"],["afspraak","ملاقات","rooster"],["school","اسکول","school"],["buurvrouw","پڑوسن","vrouw"],["hulp","مدد","helpen"],["tijd","وقت","uur"]],
    phrases: [["mijn naam is Sara","میرا نام Sara ہے","حال: تعارف ہے۔"],["kunt u mij terugbellen?","کیا آپ مجھے واپس فون کر سکتے ہیں؟","حال: فون کا جواب چاہیے۔"],["ik stuur u een bericht","میں آپ کو پیغام بھیجتا / بھیجتی ہوں","حال: پیغام بھیجنا ہے۔"],["ik wil een afspraak maken","میں ملاقات کا وقت لینا چاہتا / چاہتی ہوں","حال: ملاقات لینی ہے۔"],["mijn kind is vandaag ziek","میرا بچہ آج بیمار ہے","حال: اسکول کو اطلاع ہے۔"],["goedemorgen buurvrouw","صبح بخیر پڑوسن","حال: پڑوسی کو سلام ہے۔"],["kunt u mij helpen?","کیا آپ میری مدد کر سکتے ہیں؟","حال: مدد مانگنی ہے۔"],["hoe laat komt u?","آپ کتنے بجے آئیں گے؟","حال: وقت پوچھنا ہے۔"]]
  },
  {
    id: "a1-daily-review-two",
    unit: "A1: دہرائی",
    title: "Dagelijkse mix 2",
    description: "گھر، خریداری، سفر، صحت، کام، اور وقت کی مشترک مشق۔",
    focus: "یہ دہرائی حقیقی دن کے چھوٹے مسائل کو ملاتی ہے۔",
    words: [["verwarming","ہیٹنگ","verwarming"],["bon","رسید","bon"],["kaartje","ٹکٹ","kaartje"],["apotheek","دواخانہ","apotheek"],["werk","کام","werk"],["rooster","شیڈول","rooster"],["pijn","درد","pijn"],["regen","بارش","regen"]],
    phrases: [["de verwarming doet het niet","ہیٹنگ کام نہیں کر رہی","حال: گھر کا مسئلہ ہے۔"],["mag ik de bon?","کیا مجھے رسید مل سکتی ہے؟","حال: رسید چاہیے۔"],["ik wil een kaartje naar Utrecht","مجھے Utrecht کا ٹکٹ چاہیے","حال: سفر ہے۔"],["waar is de apotheek?","دواخانہ کہاں ہے؟","حال: دواخانہ تلاش کرنا ہے۔"],["ik kom vandaag later op werk","میں آج کام پر دیر سے آؤں گا / گی","حال: کام کو اطلاع ہے۔"],["staat het rooster in de app?","کیا شیڈول ایپ میں ہے؟","حال: شیڈول پوچھنا ہے۔"],["ik heb pijn in mijn buik","میرے پیٹ میں درد ہے","حال: صحت کا مسئلہ ہے۔"],["het regent vandaag","آج بارش ہو رہی ہے","حال: موسم ہے۔"]]
  }
];

function makeA1ExpansionLessons(spec) {
  const makeLesson = (variant) => {
    const rotatedWords = rotate(spec.words, variant);
    const rotatedPhrases = rotate(spec.phrases, variant * 3);
    const concepts = [
      ...rotatedWords.map(([dutch, urdu, visualId], index) => dailyConcept(`${spec.id}-w${variant}-${index + 1}`, dutch, urdu, visualId)),
      ...rotatedPhrases.map(([dutch, urdu, context, speak], index) => a1Phrase(`${spec.id}-p${variant}-${index + 1}`, dutch, urdu, context, speak || ""))
    ];
    const phraseConcepts = concepts.filter((concept) => concept.role === "phrase");
    return makeA1PracticalLesson({
      id: variant === 0 ? spec.id : `${spec.id}-review`,
      unit: spec.unit,
      title: variant === 0 ? spec.title : `${spec.title} - Herhaling`,
      description: variant === 0 ? spec.description : `${spec.description} دہرائی اور نئے حالات کے ساتھ۔`,
      explanation: practicalExplanation(variant === 0 ? spec.focus : `${spec.focus} اب اسی چیز کو دوسری ترتیب میں دہرائیں۔`, [
        "پہلے معنی پہچانیں، پھر اسی لفظ کو سن کر جواب دیں۔",
        "روزمرہ جملے پورے فقروں کی طرح یاد کریں۔",
        "دہرائی میں پرانے الفاظ نئے حالات کے ساتھ دوبارہ آئیں گے۔"
      ]),
      concepts,
      listenReplies: phraseConcepts.slice(0, 3).map((concept, index) => [
        index === 0 ? "wat zegt u?" : "wat is een goed antwoord?",
        dailyOptions(phraseConcepts, index, "dutch"),
        concept.dutch,
        `اس حال میں کہیں: ${concept.dutch}۔`
      ]),
      builds: phraseConcepts.slice(0, 6).map((concept) => [
        concept.urdu,
        concept.dutch.split(/\s+/),
        concept.dutch,
        `صحیح ترتیب: ${concept.dutch}۔`
      ])
    });
  };
  return [makeLesson(0), makeLesson(1)];
}

a1Lessons.push(...a1ExpansionTopics.flatMap(makeA1ExpansionLessons));

const a0DailyCheckpointConcepts = [
  dailyConcept("check-greeting", "goedemorgen", "صبح بخیر", "goedemorgen"),
  dailyConcept("check-thanks", "dank u wel", "آپ کا شکریہ", "thanks"),
  dailyConcept("check-help", "kunt u mij helpen?", "کیا آپ میری مدد کر سکتے ہیں؟", "helpen"),
  dailyConcept("check-understand", "ik begrijp het niet", "مجھے سمجھ نہیں آیا", "begrijpen"),
  dailyConcept("check-number", "twintig", "بیس", "number-20"),
  dailyConcept("check-time", "om acht uur", "آٹھ بجے", "number-8"),
  dailyConcept("check-food", "ik wil graag water", "مجھے پانی چاہیے", "water"),
  dailyConcept("check-price", "hoeveel kost dit?", "یہ کتنے کا ہے؟", "prijs"),
  dailyConcept("check-ticket", "ik wil een kaartje", "مجھے ایک ٹکٹ چاہیے", "kaartje"),
  dailyConcept("check-station", "waar is het station?", "اسٹیشن کہاں ہے؟", "station"),
  dailyConcept("check-health", "ik ben ziek", "میں بیمار ہوں", "ziek"),
  dailyConcept("check-pain", "ik heb pijn", "مجھے درد ہے", "pijn")
];

a0DailyLessons.push(makeA0DailyLesson({
  id: "a0-daily-checkpoint",
  unit: "A0: روزمرہ دہرائی",
  title: "Dagelijks Nederlands",
  description: "سلام، مدد، اعداد، وقت، کھانا، خریداری، سفر، اور صحت کی مشترک مشق۔",
  explanation: null,
  concepts: a0DailyCheckpointConcepts,
  fills: [
    ["___, hoe gaat het?", ["hallo", "links", "pijn"], "hallo", "سلام سے بات شروع کریں۔"],
    ["ik begrijp het ___", ["niet", "bon", "bus"], "niet", "سمجھ نہ آنے کا فقرہ۔"],
    ["ik wil graag ___", ["water", "waar", "wie"], "water", "پانی مانگنے کا جملہ۔"],
    ["hoeveel ___ dit?", ["kost", "slaap", "woon"], "kost", "قیمت کا سوال۔"],
    ["waar is het ___?", ["station", "brood", "medicijn"], "station", "اسٹیشن کی جگہ پوچھیں۔"],
    ["ik ben ___", ["ziek", "prijs", "links"], "ziek", "بیماری کا جملہ۔"],
    ["ik heb ___", ["pijn", "kaartje", "kassa"], "pijn", "درد کا جملہ۔"],
    ["om acht ___", ["uur", "dag", "bus"], "uur", "آٹھ بجے۔"]
  ],
  situations: [
    ["حال: صبح سلام کرنا ہے۔", ["goedemorgen", "goedenavond", "tot ziens"], "goedemorgen", "صبح کا سلام۔"],
    ["حال: مدد مانگنی ہے۔", ["kunt u mij helpen?", "hoeveel kost dit?", "ik ben ziek"], "kunt u mij helpen?", "مدد والا تیار فقرہ۔"],
    ["حال: سمجھ نہیں آئی۔", ["ik begrijp het niet", "ik wil een kaartje", "ik heb pijn"], "ik begrijp het niet", "سمجھ نہ آنے کا فقرہ۔"],
    ["حال: قیمت پوچھنی ہے۔", ["hoeveel kost dit?", "waar is het station?", "hoe gaat het?"], "hoeveel kost dit?", "دکان کا سوال۔"],
    ["حال: پانی چاہیے۔", ["ik wil graag water", "ik wil een kaartje", "ik ben water"], "ik wil graag water", "درخواست والا جملہ۔"],
    ["حال: ٹکٹ چاہیے۔", ["ik wil een kaartje", "ik wil graag koffie", "ik heb een bon"], "ik wil een kaartje", "سفر کا فقرہ۔"],
    ["حال: اسٹیشن پوچھنا ہے۔", ["waar is het station?", "waar is de apotheek?", "wat kost dit?"], "waar is het station?", "سفر کی جگہ پوچھیں۔"],
    ["حال: بیمار ہیں۔", ["ik ben ziek", "ik heb een kaartje", "ik werk vandaag"], "ik ben ziek", "صحت کا جملہ۔"],
    ["حال: درد ہے۔", ["ik heb pijn", "ik ben pijn", "ik wil prijs"], "ik heb pijn", "درد کے لیے heb pijn۔"],
    ["حال: کسی نے مدد کی، شکریہ کہنا ہے۔", ["dank u wel", "ik begrijp het niet", "bel 112"], "dank u wel", "شکریہ کا فقرہ۔"]
  ],
  builds: [
    ["کیا آپ میری مدد کر سکتے ہیں؟", ["kunt", "u", "mij", "helpen"], "kunt u mij helpen", "مدد والا سوال۔"],
    ["یہ کتنے کا ہے؟", ["hoeveel", "kost", "dit"], "hoeveel kost dit", "قیمت کا سوال۔"],
    ["مجھے ایک ٹکٹ چاہیے", ["ik", "wil", "een", "kaartje"], "ik wil een kaartje", "سفر کی درخواست۔"],
    ["مجھے درد ہے", ["ik", "heb", "pijn"], "ik heb pijn", "صحت کا جملہ۔"]
  ]
}));

a0Lessons.push(...a0DailyLessons);

const a0LessonOrder = [
  "a0-greetings-courtesy", "a0-ik-jij-u", "a0-ja-nee-goed-niet", "a0-understanding-help",
  "a0-letters-1", "a0-letters-2", "a0-letters-3",
  "a0-numbers-0-10", "a0-numbers-11-100", "a0-time-days", "a0-date-appointment",
  "a0-people-nouns", "a0-things-nouns", "a0-dit-dat-questions", "a0-een-de-het",
  "a0-ben-bent-is", "a0-first-sentences", "a0-hij-zij-wij", "a0-hebben-1",
  "a0-geen", "a0-possessive", "a0-name-land-city", "a0-spelling-personal-details", "a0-address-phone", "a0-checkpoint",
  "a0-place-1", "a0-place-2", "a0-gaan-komen", "a0-naar-met", "a0-home-needs",
  "a0-daily-actions", "a0-food-drink", "a0-shopping-payment", "a0-transport-directions",
  "a0-health-emergency", "a0-child-school", "a0-work-basics", "a0-weather-clothing-safety",
  "a0-daily-checkpoint"
];

const a0OrderIndex = new Map(a0LessonOrder.map((id, index) => [id, index]));
a0Lessons.sort((left, right) => a0OrderIndex.get(left.id) - a0OrderIndex.get(right.id));
for (const lesson of a0Lessons) {
  lesson.title = lesson.title.replace(/^A0 les \d+:\s*/, "");
}

const a1LessonOrder = [
  "a1-zero-tiny-words", "a1-zijn-first-sentences", "a1-greetings-personal-info",
  "a1-people-family-articles", "a1-hebben-family", "a1-present-time", "a1-daily-routine",
  "a1-questions", "a1-plans-invitations", "a1-house-food-plurals", "a1-home-neighbours",
  "a1-cafe-ordering", "a1-shopping-clothes", "a1-shopping-transport", "a1-public-transport",
  "a1-health-appointments", "a1-health-pharmacy", "a1-work-school-messages",
  ...a1ExpansionTopics.flatMap((topic) => [topic.id, `${topic.id}-review`])
];
const a1OrderIndex = new Map(a1LessonOrder.map((id, index) => [id, index]));
a1Lessons.sort((left, right) => a1OrderIndex.get(left.id) - a1OrderIndex.get(right.id));
for (const lesson of a1Lessons) lesson.title = lesson.title.replace(/^سبق \d+:\s*/, "");

const a2LessonOrder = [
  "a2-perfect-tense", "a2-future-modal-verbs", "a2-separable-verbs-routine", "a2-word-order-connectors",
  "a2-gemeente-official", "a2-gemeente-documents", "a2-work-school", "a2-work-conditions", "a2-parent-school",
  "a2-health-housing", "a2-landlord-repairs", "a2-strong-combined", "a2-doctor-advice",
  "a2-shopping-services", "a2-customer-complaints", "a2-bills-banking",
  "a2-writing-messages", "a2-formal-digital-messages"
];
const a2OrderIndex = new Map(a2LessonOrder.map((id, index) => [id, index]));
a2Lessons.sort((left, right) => a2OrderIndex.get(left.id) - a2OrderIndex.get(right.id));
for (const lesson of a2Lessons) lesson.title = lesson.title.replace(/^A2 les \d+:\s*/, "");

const bankBlueprints = {
  a0: { meaning: 10, reverse: 8, "image-choice": 10, "listen-choice": 10, "fill-gap": 8, situation: 8, build: 4 },
  a1: { meaning: 8, reverse: 6, "image-choice": 8, "listen-choice": 8, "fill-gap": 10, situation: 12, build: 6 },
  a2: { meaning: 6, reverse: 5, "image-choice": 6, "listen-choice": 7, "fill-gap": 12, situation: 14, build: 8 }
};

function questionSignature(question) {
  return [
    question.type,
    question.prompt,
    question.answer,
    ...(question.options || []),
    ...(question.tiles || [])
  ].join("|");
}

function lessonConcepts(questions) {
  const concepts = [];
  const seen = new Set();
  const add = (dutch, urdu, visualId = "") => {
    if (!isDutchOnlyText(dutch) || !isUrduText(urdu)) return;
    const key = `${dutch}|${urdu}`;
    const existing = concepts.find((concept) => `${concept.dutch}|${concept.urdu}` === key);
    if (existing) {
      if (!existing.visualId && visualId) existing.visualId = visualId;
      return;
    }
    seen.add(key);
    concepts.push({ dutch: String(dutch), urdu: String(urdu), visualId });
  };
  for (const question of questions) {
    add(question.prompt, question.answer, question.visualId || question.visual || "");
    add(question.answer, question.prompt, question.visualId || question.visual || "");
    if (question.type === "listen-choice") add(question.speak, question.answer);
  }
  return concepts;
}

function rotate(items, offset) {
  if (!items.length) return [];
  const step = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(step), ...items.slice(0, step)];
}

function conceptOptions(concepts, index, key) {
  const concept = concepts[index % concepts.length];
  const values = uniq(concepts.map((item) => item[key]));
  const answer = concept[key];
  const distractors = rotate(values.filter((value) => value !== answer), index + 1).slice(0, 2);
  return { concept, options: [answer, ...distractors] };
}

function fallbackVisualIdForDutch(text) {
  const value = String(text || "").toLowerCase().trim();
  if (!/^[a-zà-ÿ]+(?:\s+[a-zà-ÿ]+)?$/.test(value)) return "";
  const exactVisuals = {
    appel: "appel",
    boek: "boek",
    deur: "deur",
    fiets: "fiets",
    huis: "huis",
    lamp: "lamp",
    kat: "kat",
    oog: "oog",
    pen: "pen",
    rijst: "rijst",
    stoel: "stoel",
    tafel: "tafel",
    water: "water",
    man: "man",
    vrouw: "vrouw",
    kind: "kind",
    jongen: "jongen",
    meisje: "meisje",
    familie: "familie",
    vader: "vader",
    moeder: "moeder",
    broer: "broer",
    zus: "zus",
    telefoon: "telefoon",
    naam: "naam",
    adres: "adres",
    paspoort: "paspoort",
    afspraak: "afspraak",
    dokter: "dokter",
    huisarts: "huisarts",
    tandarts: "tandarts",
    apotheek: "apotheek",
    ziekenhuis: "ziekenhuis",
    medicijn: "medicijn",
    pijn: "pijn",
    hoofdpijn: "hoofdpijn",
    buikpijn: "buikpijn",
    hoesten: "hoesten",
    koorts: "koorts",
    ziek: "ziek",
    badkamer: "badkamer",
    keuken: "keuken",
    kamer: "kamer",
    verwarming: "verwarming",
    lekkage: "lekkage",
    reparatie: "reparatie",
    formulier: "formulier",
    gemeente: "gemeente",
    document: "document",
    contract: "contract",
    baan: "baan",
    werk: "werk",
    school: "school",
    huiswerk: "huiswerk",
    rooster: "rooster",
    supermarkt: "supermarkt",
    winkel: "winkel",
    kassa: "kassa",
    bon: "bon",
    prijs: "prijs",
    pinpas: "pinpas",
    contant: "contant",
    brood: "brood",
    kaas: "kaas",
    fruit: "fruit",
    groente: "groente",
    tas: "tas",
    jas: "jas",
    station: "station",
    halte: "halte",
    bus: "bus",
    trein: "trein",
    kaartje: "kaartje",
    stad: "stad",
    land: "land",
    kopen: "kopen",
    koken: "koken",
    leren: "leren",
    bellen: "bellen",
    helpen: "helpen",
    betalen: "betalen",
    bericht: "bericht",
    uur: "uur",
    vandaag: "vandaag",
    morgen: "morgen",
    gisteren: "gisteren",
    ochtend: "ochtend",
    ja: "ja",
    nee: "nee",
    goed: "goed",
    niet: "niet",
    vraag: "vraag",
    langzaam: "langzaam",
    goedkoop: "goedkoop",
    duur: "duur",
    kapot: "kapot"
  };
  if (exactVisuals[value]) return exactVisuals[value];
  return "";
}

function buildGeneratedQuestion(type, concepts, index) {
  if (!concepts.length) return null;
  const dutchSet = conceptOptions(concepts, index, "dutch");
  const urduSet = conceptOptions(concepts, index, "urdu");
  const concept = concepts[index % concepts.length];

  if (type === "meaning") {
    return meaning(concept.dutch, urduSet.options, concept.urdu, `${concept.dutch} = ${concept.urdu}۔`);
  }
  if (type === "reverse") {
    return reverse(concept.urdu, dutchSet.options, concept.dutch, `${concept.urdu} = ${concept.dutch}۔`);
  }
  if (type === "image-choice") {
    const visualConcepts = concepts
      .map((item) => ({ ...item, visualId: item.visualId || fallbackVisualIdForDutch(item.dutch) }))
      .filter((item) => item.visualId);
    if (!visualConcepts.length) return null;
    const visualSet = conceptOptions(visualConcepts, index, "dutch");
    return {
      type: "image-choice",
      label: "تصویر دیکھ کر صحیح Nederlands لفظ منتخب کریں",
      prompt: "تصویر دیکھیں اور صحیح لفظ چنیں۔",
      visualId: visualSet.concept.visualId,
      options: visualSet.options,
      answer: visualSet.concept.dutch,
      explain: `تصویر میں ${visualSet.concept.urdu} ہے: ${visualSet.concept.dutch}۔`
    };
  }
  if (type === "listen-choice") {
    return listenChoice(concept.dutch, urduSet.options, concept.urdu, `${concept.dutch} = ${concept.urdu}۔`);
  }
  if (type === "fill-gap") {
    const gap = missingWordSentence(concept.dutch);
    if (gap) {
      const words = uniq(concepts.flatMap((item) => extractDutchWords(item.dutch)).filter((word) => isCleanDutchWord(word)));
      const options = [gap.missing, ...rotate(words.filter((word) => word !== gap.missing), index).slice(0, 2)];
      return fillGap(gap.prompt, options, gap.missing, `خالی جگہ میں ${gap.missing} آئے گا۔`);
    }
    const singleWordGap = singleWordFillGap(concept.dutch);
    if (!singleWordGap) return null;
    const words = uniq(concepts.flatMap((item) => extractDutchWords(item.dutch)).filter((word) => isCleanDutchWord(word)));
    const options = [singleWordGap.missing, ...rotate(words.filter((word) => word !== singleWordGap.missing), index).slice(0, 2)];
    return fillGap(singleWordGap.prompt, options, singleWordGap.missing, `خالی جگہ میں ${singleWordGap.missing} آئے گا۔`);
  }
  if (type === "situation") {
    return situation(`حال: آپ کو کہنا ہے: ${concept.urdu}`, dutchSet.options, concept.dutch, `صحیح Nederlands: ${concept.dutch}۔`);
  }
  if (type === "build") {
    const tiles = concept.dutch.split(/\s+/).filter(Boolean);
    return build(`یہ بنائیں: ${concept.urdu}`, tiles, concept.dutch, `صحیح ترتیب: ${concept.dutch}۔`);
  }
  return null;
}

function takeQuestionsForType(seedQuestions, type, target, concepts) {
  const selected = [];
  const signatures = new Set();
  const add = (question) => {
    if (!question || selected.length >= target) return;
    const signature = questionSignature(question);
    if (signatures.has(signature)) return;
    signatures.add(signature);
    selected.push(question);
  };

  seedQuestions.filter((question) => question.type === type).forEach(add);
  let attempt = 0;
  while (selected.length < target && attempt < target * 12) {
    const generated = buildGeneratedQuestion(type, concepts, attempt);
    if (generated) {
      if (signatures.has(questionSignature(generated))) {
        generated.note = `دہرائی ${attempt + 1}`;
        generated.options = rotate(generated.options || [], attempt + 1);
      }
      add(generated);
    }
    attempt += 1;
  }
  return selected;
}

function buildLessonBank(lesson, level) {
  const seedQuestions = lesson.questions.map((question) => ({ ...question }));
  const concepts = lessonConcepts(seedQuestions);
  const explanations = [];
  const explanationSignatures = new Set();
  for (const question of seedQuestions.filter((item) => item.type === "uitleg")) {
    const signature = questionSignature(question);
    if (explanationSignatures.has(signature) || explanations.length >= 2) continue;
    explanationSignatures.add(signature);
    explanations.push(question);
  }

  const blueprint = { ...bankBlueprints[level] };
  blueprint.situation += 2 - explanations.length;
  const bank = [...explanations];
  for (const [type, target] of Object.entries(blueprint)) {
    bank.push(...takeQuestionsForType(seedQuestions, type, target, concepts));
  }
  let fillerAttempt = 0;
  while (bank.length < 60 && fillerAttempt < 180) {
    const fallbackType = fillerAttempt % 3 === 0 ? "situation" : fillerAttempt % 3 === 1 ? "fill-gap" : "listen-choice";
    const filler = buildGeneratedQuestion(fallbackType, concepts, fillerAttempt + bank.length);
    if (filler && !bank.some((question) => questionSignature(question) === questionSignature(filler))) {
      bank.push(filler);
    }
    fillerAttempt += 1;
  }

  lesson.questions = bank.slice(0, 60).map((question, index) => ({
    ...question,
    id: `${lesson.id}-${question.type}-${String(index + 1).padStart(2, "0")}`
  }));
}

a0Lessons.forEach((lesson) => buildLessonBank(lesson, "a0"));
a1Lessons.forEach((lesson) => buildLessonBank(lesson, "a1"));
a2Lessons.forEach((lesson) => buildLessonBank(lesson, "a2"));

for (const lesson of [...a0Lessons, ...a1Lessons, ...a2Lessons]) {
  for (const question of lesson.questions) {
    const genericPrefix = "حال: آپ کو کہنا ہے: ";
    if (!String(question.prompt || "").startsWith(genericPrefix)) continue;
    const intendedMeaning = question.prompt.slice(genericPrefix.length);
    question.prompt = `اس اردو بات کے لیے صحیح Nederlands منتخب کریں: ${intendedMeaning}`;
    question.label = "اردو بات کے لیے صحیح Nederlands منتخب کریں";
    question.mode = "guided-recall";
  }
}

const missionConcept = (id, dutch, urdu, visualId) => ({ id, dutch, urdu, visualId });
const missionPhrase = (dutch, urdu) => ({ dutch, urdu });

function missionOptions(items, index, key) {
  const answer = items[index % items.length][key];
  return [answer, ...rotate(items.map((item) => item[key]).filter((value) => value !== answer), index + 1).slice(0, 2)];
}

function makeMissionLesson(spec) {
  const variants = [0, 1, 2].map((variantIndex) => {
    const offset = variantIndex * 4;
    const questions = [];
    const add = (question, stage) => {
      const index = questions.length + 1;
      questions.push({ ...question, stage, id: `${spec.id}-v${variantIndex + 1}-${question.type}-${String(index).padStart(2, "0")}` });
    };

    add({
      ...uitleg(`${spec.title}: ${spec.variantTitles[variantIndex]}`, spec.briefing, "اب اس کام کو قدم بہ قدم مکمل کریں۔"),
      skillId: `${spec.id}-briefing`
    }, "briefing");

    for (let index = 0; index < 3; index += 1) {
      const phraseIndex = (offset + index) % spec.phrases.length;
      const phrase = spec.phrases[phraseIndex];
      add({
        type: "document-choice",
        label: "دستاویز پڑھ کر صحیح مطلب منتخب کریں",
        prompt: "دستاویز میں لکھی اہم بات کا مطلب کیا ہے؟",
        document: {
          title: spec.documentTitles[index],
          rows: [
            { label: "Datum", value: `${12 + variantIndex} juni` },
            { label: "Informatie", value: phrase.dutch }
          ]
        },
        options: missionOptions(spec.phrases, phraseIndex, "urdu"),
        answer: phrase.urdu,
        explain: `${phrase.dutch} = ${phrase.urdu}۔`,
        skillId: `${spec.id}-phrase-${phraseIndex}`
      }, "document");
    }

    for (let index = 0; index < 3; index += 1) {
      const phraseIndex = index + 3;
      const phrase = spec.phrases[phraseIndex];
      add({
        ...listenChoice(spec.cues[index], missionOptions(spec.phrases, phraseIndex, "dutch"), phrase.dutch, `مناسب جواب: ${phrase.dutch}۔`),
        prompt: "بات سنیں اور مناسب جواب منتخب کریں۔",
        mode: "listen-reply",
        skillId: `${spec.id}-phrase-${phraseIndex}`
      }, "listen-reply");
    }

    for (let index = 0; index < 3; index += 1) {
      const phraseIndex = (offset + index + 6) % spec.phrases.length;
      const phrase = spec.phrases[phraseIndex];
      add({
        ...situation(`حال: ${phrase.urdu}`, missionOptions(spec.phrases, phraseIndex, "dutch"), phrase.dutch, `اس حال میں کہیں: ${phrase.dutch}۔`),
        skillId: `${spec.id}-phrase-${phraseIndex}`
      }, "decision");
    }

    for (let index = 0; index < 2; index += 1) {
      const start = (offset + index * 3) % spec.steps.length;
      const ordered = [0, 1, 2].map((step) => spec.steps[(start + step) % spec.steps.length]);
      add({
        type: "sequence",
        label: "کام کے قدم صحیح ترتیب میں رکھیں",
        prompt: "ان قدموں کو صحیح ترتیب میں رکھیں۔",
        tiles: ordered,
        answer: ordered.join(" | "),
        explain: `صحیح ترتیب: ${ordered.join("، پھر ")}۔`,
        skillId: `${spec.id}-sequence-${index}`
      }, "sequence");
    }

    for (let index = 0; index < 2; index += 1) {
      const phraseIndex = (offset + index + 9) % spec.phrases.length;
      const phrase = spec.phrases[phraseIndex];
      add({ ...build(phrase.urdu, phrase.dutch.split(/\s+/), phrase.dutch, `صحیح جملہ: ${phrase.dutch}۔`), skillId: `${spec.id}-phrase-${phraseIndex}` }, "build");
    }

    for (let index = 0; index < 2; index += 1) {
      if (spec.level === "a0") {
        const conceptIndex = (offset + index) % spec.concepts.length;
        const concept = spec.concepts[conceptIndex];
        add({
          type: "image-choice",
          label: "تصویر دیکھ کر صحیح Nederlands منتخب کریں",
          prompt: "تصویر کے لیے صحیح لفظ منتخب کریں۔",
          visualId: concept.visualId,
          options: missionOptions(spec.concepts, conceptIndex, "dutch"),
          answer: concept.dutch,
          explain: `${concept.dutch} = ${concept.urdu}۔`,
          skillId: `${spec.id}-concept-${concept.id}`
        }, "visual");
      } else {
        const phraseIndex = (offset + index + 1) % spec.phrases.length;
        const phrase = spec.phrases[phraseIndex];
        add({
          type: "short-input",
          label: "مختصر Nederlands جواب لکھیں",
          prompt: phrase.urdu,
          answer: phrase.dutch,
          acceptedAnswers: [phrase.dutch.replace(/[.!?]+$/g, "")],
          fallbackTiles: phrase.dutch.split(/\s+/),
          optional: true,
          explain: `صحیح جواب: ${phrase.dutch}۔`,
          skillId: `${spec.id}-phrase-${phraseIndex}`
        }, "write");
      }
    }

    for (let index = 0; index < 2; index += 1) {
      const phraseIndex = (offset + index + 4) % spec.phrases.length;
      const phrase = spec.phrases[phraseIndex];
      add({
        type: "speak-repeat",
        label: "سنیں اور دہرائیں",
        prompt: "آواز سنیں، جملہ بلند آواز میں دہرائیں، پھر آگے بڑھیں۔",
        speak: phrase.dutch,
        answer: phrase.dutch,
        skillId: `${spec.id}-phrase-${phraseIndex}`
      }, "speak");
    }

    for (let index = 0; index < 2; index += 1) {
      const phraseIndex = (offset + index + 10) % spec.phrases.length;
      const phrase = spec.phrases[phraseIndex];
      add({
        ...situation(`آخری قدم: ${phrase.urdu}`, missionOptions(spec.phrases, phraseIndex, "dutch"), phrase.dutch, `کام مکمل کرنے کے لیے: ${phrase.dutch}۔`),
        skillId: `${spec.id}-phrase-${phraseIndex}`
      }, "outcome");
    }

    return { id: `${spec.id}-variant-${variantIndex + 1}`, title: spec.variantTitles[variantIndex], questions };
  });

  return {
    id: spec.id,
    kind: "mission",
    unit: spec.unit,
    title: spec.title,
    description: spec.description,
    xp: 0,
    variants,
    questions: variants.flatMap((variant) => variant.questions)
  };
}

function insertLessonAfter(lessons, afterId, lesson) {
  const index = lessons.findIndex((item) => item.id === afterId);
  lessons.splice(index < 0 ? lessons.length : index + 1, 0, lesson);
}

const missionSpec = ({ level, id, unit, title, description, concepts, phrases, cues, variants, documents }) => ({
  level, id, unit, title, description,
  concepts: concepts.map((item) => missionConcept(...item)),
  phrases: phrases.map((item) => missionPhrase(...item)),
  cues,
  variantTitles: variants,
  documentTitles: documents,
  briefing: [
    `${title} میں آپ ایک حقیقی روزمرہ کام قدم بہ قدم مکمل کریں گے۔`,
    "پہلے اہم معلومات دیکھیں یا سنیں، پھر مناسب Nederlands جواب منتخب کریں۔",
    "غلطی ہو تو مختصر وضاحت پڑھیں اور اگلے قدم میں وہی بات دوبارہ استعمال کریں۔"
  ],
  steps: phrases.slice(0, 6).map((phrase) => phrase[0])
});

const missionSpecs = [
  missionSpec({
    level: "a0", id: "a0-mission-home-start", unit: "A0: گھر سے نکلنا", title: "Thuis beginnen", description: "صبح تیار ہونا، ناشتہ، کپڑے، چابی، موسم، اور محفوظ طریقے سے گھر سے نکلنا۔",
    concepts: [["lamp","lamp","بتی","lamp"],["coat","jas","جیکٹ","jas"],["bread","brood","روٹی","brood"],["water","water","پانی","water"],["door","deur","دروازہ","deur"],["home","huis","گھر","huis"]],
    phrases: [["ik sta om zeven uur op","میں سات بجے اٹھتا / اٹھتی ہوں"],["ik eet brood en drink water","میں روٹی کھاتا / کھاتی اور پانی پیتا / پیتی ہوں"],["ik doe mijn jas aan","میں جیکٹ پہنتا / پہنتی ہوں"],["waar is mijn sleutel?","میری چابی کہاں ہے؟"],["de sleutel ligt op tafel","چابی میز پر ہے"],["het regent buiten","باہر بارش ہو رہی ہے"],["ik neem een paraplu mee","میں چھتری ساتھ لیتا / لیتی ہوں"],["doe de deur dicht","دروازہ بند کریں"],["het licht is uit","بتی بند ہے"],["ik ben klaar","میں تیار ہوں"],["ik ga nu naar buiten","میں اب باہر جاتا / جاتی ہوں"],["alles is veilig","سب کچھ محفوظ ہے"]],
    cues: ["hoe laat staat u op?","waar is de sleutel?","wat voor weer is het?"], variants: ["صبح کا معمول","بارش والا دن","جلدی گھر سے نکلنا"], documents: ["Weerbericht","Ochtendlijst","Veilig thuis"]
  }),
  missionSpec({
    level: "a0", id: "a0-mission-neighbourhood", unit: "A0: محلے میں", title: "In de buurt", description: "نقشہ دیکھنا، بس اسٹاپ، دکان، دواخانہ، اور راستہ پوچھنا۔",
    concepts: [["bus","bus","بس","bus"],["stop","halte","بس اسٹاپ","halte"],["shop","supermarkt","سپر مارکیٹ","supermarkt"],["pharmacy","apotheek","دواخانہ","apotheek"],["station","station","اسٹیشن","station"],["left","links","بائیں","links"]],
    phrases: [["ik ga naar de supermarkt","میں سپر مارکیٹ جاتا / جاتی ہوں"],["waar is de bushalte?","بس اسٹاپ کہاں ہے؟"],["ga rechtdoor","سیدھا جائیں"],["gaat deze bus naar het station?","کیا یہ بس اسٹیشن جاتی ہے؟"],["ja stap hier in","جی، یہاں سوار ہوں"],["de apotheek is naast de supermarkt","دواخانہ سپر مارکیٹ کے ساتھ ہے"],["sla links af","بائیں مڑیں"],["ik ben de weg kwijt","میں راستہ بھول گیا / گئی ہوں"],["kunt u mij helpen?","کیا آپ میری مدد کر سکتے ہیں؟"],["ik zoek de bibliotheek","میں لائبریری تلاش کر رہا / رہی ہوں"],["dank u wel voor de hulp","مدد کے لیے شکریہ"],["nu weet ik de weg","اب مجھے راستہ معلوم ہے"]],
    cues: ["waar wilt u naartoe?","gaat deze bus naar het station?","waar is de apotheek?"], variants: ["دکان تک جانا","بس سے سفر","لائبریری تلاش کرنا"], documents: ["Buurtkaart","Dienstregeling","Openingstijden"]
  }),
  missionSpec({
    level: "a0", id: "a0-mission-help", unit: "A0: فوری مدد", title: "Hulp nodig", description: "نام، پتہ، فون، 112، پولیس، ڈاکٹر، اور ایمبولینس کی بنیادی بات۔",
    concepts: [["phone","telefoon","فون","telefoon"],["address","adres","پتہ","adres"],["doctor","dokter","ڈاکٹر","dokter"],["ambulance","ambulance","ایمبولینس","ambulance"],["medicine","medicijn","دوا","medicijn"],["pain","pijn","درد","pijn"]],
    phrases: [["ik heb hulp nodig","مجھے مدد چاہیے"],["bel alstublieft 112","براہ مہربانی 112 پر فون کریں"],["mijn naam is Sara","میرا نام Sara ہے"],["wat is uw adres?","آپ کا پتہ کیا ہے؟"],["mijn adres is Marktstraat twaalf","میرا پتہ Marktstraat بارہ ہے"],["wat is er gebeurd?","کیا ہوا ہے؟"],["ik heb veel pijn","مجھے بہت درد ہے"],["er komt een ambulance","ایمبولینس آ رہی ہے"],["blijf hier wachten","یہاں انتظار کریں"],["ik heb een dokter nodig","مجھے ڈاکٹر چاہیے"],["de politie is onderweg","پولیس راستے میں ہے"],["de hulp is gekomen","مدد پہنچ گئی ہے"]],
    cues: ["hoe heet u?","wat is uw adres?","wat is er gebeurd?"], variants: ["طبی مدد","گمشدہ چیز","سڑک پر مدد"], documents: ["Noodkaart","Adresgegevens","Hulpbericht"]
  }),
  missionSpec({
    level: "a1", id: "a1-mission-phone-internet", unit: "A1: فون اور انٹرنیٹ", title: "Telefoon en internet", description: "Wi-Fi، فون کریڈٹ، وائس میل، غلط نمبر، پیغام، اور واپس فون کرنا۔",
    concepts: [["phone","telefoon","فون","telefoon"],["message","bericht","پیغام","bericht"],["wifi","wifi","وائی فائی","telefoon"],["credit","beltegoed","فون کریڈٹ","pinpas"],["password","wachtwoord","پاس ورڈ","formulier"],["call","bellen","فون کرنا","telefoon"]],
    phrases: [["wat is het wifi-wachtwoord?","وائی فائی کا پاس ورڈ کیا ہے؟"],["mijn internet werkt niet","میرا انٹرنیٹ کام نہیں کر رہا"],["ik wil beltegoed kopen","میں فون کریڈٹ خریدنا چاہتا / چاہتی ہوں"],["kan ik u later terugbellen?","کیا میں آپ کو بعد میں واپس فون کر سکتا / سکتی ہوں؟"],["ja belt u vanavond terug","جی، شام کو واپس فون کریں"],["u heeft het verkeerde nummer","آپ نے غلط نمبر ملایا ہے"],["spreek een bericht in na de toon","آواز کے بعد پیغام بولیں"],["ik stuur u een bericht","میں آپ کو پیغام بھیجتا / بھیجتی ہوں"],["heeft u mijn bericht ontvangen?","کیا آپ کو میرا پیغام ملا؟"],["mijn telefoon heeft geen bereik","میرے فون میں سگنل نہیں ہے"],["kunt u het nummer herhalen?","کیا آپ نمبر دوبارہ کہہ سکتے ہیں؟"],["nu werkt de verbinding weer","اب رابطہ دوبارہ کام کر رہا ہے"]],
    cues: ["waarmee kan ik u helpen?","wanneer kunt u terugbellen?","is dit het nummer van Ali?"], variants: ["Wi-Fi کا مسئلہ","فون کریڈٹ","وائس میل اور پیغام"], documents: ["Wifi-kaart","Beltegoedbon","Voicemail"]
  }),
  missionSpec({
    level: "a1", id: "a1-mission-school-day", unit: "A1: اسکول کا دن", title: "Mijn kind naar school", description: "اسکول ٹائم، غیر حاضری، بچے کو چھوڑنا اور لینا، استاد، اور نوٹس۔",
    concepts: [["school","school","اسکول","school"],["teacher","docent","استاد","docent"],["child","kind","بچہ","kind"],["homework","huiswerk","گھر کا کام","huiswerk"],["schedule","rooster","اوقات","rooster"],["message","bericht","پیغام","bericht"]],
    phrases: [["de school begint om half negen","اسکول ساڑھے آٹھ بجے شروع ہوتا ہے"],["mijn kind is vandaag ziek","میرا بچہ آج بیمار ہے"],["ik bel de school","میں اسکول فون کرتا / کرتی ہوں"],["waarom komt uw kind niet?","آپ کا بچہ کیوں نہیں آ رہا؟"],["hij heeft koorts","اسے بخار ہے"],["ik haal mijn kind om drie uur op","میں بچے کو تین بجے لینے آتا / آتی ہوں"],["ik wil de docent spreken","میں استاد سے بات کرنا چاہتا / چاہتی ہوں"],["het huiswerk staat in de app","گھر کا کام ایپ میں ہے"],["morgen is de school gesloten","کل اسکول بند ہے"],["kunt u mij een bericht sturen?","کیا آپ مجھے پیغام بھیج سکتے ہیں؟"],["ik heb het rooster gelezen","میں نے اوقات پڑھ لیے ہیں"],["alles is nu duidelijk","اب سب واضح ہے"]],
    cues: ["hoe laat begint de school?","waarom komt uw kind niet?","hoe laat haalt u uw kind op?"], variants: ["بیماری کی اطلاع","اسکول کا وقت","استاد سے رابطہ"], documents: ["Schoolrooster","Afwezigheidsbericht","Schoolnieuws"]
  }),
  missionSpec({
    level: "a1", id: "a1-mission-post-parcel", unit: "A1: ڈاک اور پارسل", title: "Post en pakket", description: "پتہ، ڈاک ٹکٹ، پارسل بھیجنا، شناخت، ڈلیوری نوٹس، اور گمشدہ پارسل۔",
    concepts: [["parcel","pakket","پارسل","bericht"],["address","adres","پتہ","adres"],["passport","identiteitsbewijs","شناختی کاغذ","paspoort"],["counter","loket","کاؤنٹر","loket"],["receipt","bon","رسید","bon"],["message","bezorgbericht","ڈلیوری پیغام","bericht"]],
    phrases: [["ik wil dit pakket versturen","میں یہ پارسل بھیجنا چاہتا / چاہتی ہوں"],["het adres staat op de doos","پتہ ڈبے پر لکھا ہے"],["hoeveel kost het versturen?","بھیجنے کی قیمت کتنی ہے؟"],["wilt u het pakket volgen?","کیا آپ پارسل ٹریک کرنا چاہتے ہیں؟"],["ja graag met track en trace","جی، ٹریک اینڈ ٹریس کے ساتھ"],["hier is mijn identiteitsbewijs","یہ میرا شناختی کاغذ ہے"],["uw pakket ligt bij het afhaalpunt","آپ کا پارسل وصولی کی جگہ پر ہے"],["ik heb een bezorgbericht gekregen","مجھے ڈلیوری پیغام ملا ہے"],["het pakket is nog niet aangekomen","پارسل ابھی نہیں پہنچا"],["kunt u het nummer controleren?","کیا آپ نمبر چیک کر سکتے ہیں؟"],["bewaar deze bon goed","یہ رسید سنبھال کر رکھیں"],["het pakket is gevonden","پارسل مل گیا ہے"]],
    cues: ["wat wilt u versturen?","wilt u track en trace?","heeft u een identiteitsbewijs?"], variants: ["پارسل بھیجنا","پارسل لینا","گمشدہ پارسل"], documents: ["Adreslabel","Afhaalbericht","Track en trace"]
  }),
  missionSpec({
    level: "a1", id: "a1-mission-house-search", unit: "A1: گھر تلاش کرنا", title: "Een huis zoeken", description: "کرایے کا اشتہار، قیمت، کمرے، گھر دیکھنے کا وقت، سوال، اور دلچسپی۔",
    concepts: [["home","woning","گھر","huis"],["room","kamer","کمرہ","kamer"],["price","huur","کرایہ","prijs"],["viewing","bezichtiging","گھر دیکھنے کا وقت","afspraak"],["heating","verwarming","ہیٹنگ","verwarming"],["form","reactie","جواب / دلچسپی","formulier"]],
    phrases: [["ik zoek een woning met twee kamers","میں دو کمروں والا گھر تلاش کر رہا / رہی ہوں"],["de huur is negenhonderd euro","کرایہ نو سو یورو ہے"],["de woning is vanaf juli beschikbaar","گھر جولائی سے دستیاب ہے"],["wanneer kan ik de woning bekijken?","میں گھر کب دیکھ سکتا / سکتی ہوں؟"],["u kunt zaterdag om tien uur komen","آپ ہفتہ دس بجے آ سکتے ہیں"],["is de verwarming inbegrepen?","کیا ہیٹنگ شامل ہے؟"],["hoe groot is de woonkamer?","بیٹھک کتنی بڑی ہے؟"],["mag ik hier met kinderen wonen?","کیا میں یہاں بچوں کے ساتھ رہ سکتا / سکتی ہوں؟"],["welke documenten heeft u nodig?","آپ کو کون سے کاغذات چاہیے؟"],["ik ben geïnteresseerd in de woning","مجھے اس گھر میں دلچسپی ہے"],["ik stuur vandaag mijn gegevens","میں آج اپنی معلومات بھیجوں گا / گی"],["ik wacht op uw reactie","میں آپ کے جواب کا انتظار کروں گا / گی"]],
    cues: ["wat voor woning zoekt u?","wanneer wilt u komen kijken?","heeft u nog een vraag?"], variants: ["اشتہار پڑھنا","گھر دیکھنا","دلچسپی بھیجنا"], documents: ["Woningadvertentie","Bezichtiging","Reactieformulier"]
  }),
  missionSpec({
    level: "a1", id: "a1-mission-doctor", unit: "A1: ڈاکٹر کے پاس", title: "Naar de huisarts", description: "ملاقات، علامات، ہدایات، دوا، مقدار، اور دوبارہ رابطہ۔",
    concepts: [["doctor","huisarts","گھر کا ڈاکٹر","huisarts"],["pain","pijn","درد","pijn"],["medicine","medicijn","دوا","medicijn"],["pharmacy","apotheek","دواخانہ","apotheek"],["cough","hoesten","کھانسی","hoesten"],["rest","rust","آرام","rust"]],
    phrases: [["ik wil een afspraak maken","میں ملاقات کا وقت لینا چاہتا / چاہتی ہوں"],["ik ben sinds gisteren ziek","میں کل سے بیمار ہوں"],["ik heb pijn in mijn buik","میرے پیٹ میں درد ہے"],["waar doet het pijn?","کہاں درد ہے؟"],["hier in mijn buik","یہاں میرے پیٹ میں"],["u moet veel water drinken","آپ کو بہت پانی پینا چاہیے"],["neem dit medicijn twee keer per dag","یہ دوا دن میں دو بار لیں"],["voor of na het eten?","کھانے سے پہلے یا بعد؟"],["haal het medicijn bij de apotheek","دوا دواخانے سے لیں"],["wanneer moet ik terugkomen?","مجھے دوبارہ کب آنا ہے؟"],["bel als het erger wordt","اگر حالت بگڑے تو فون کریں"],["ik begrijp de instructies","مجھے ہدایات سمجھ آ گئی ہیں"]],
    cues: ["hoe lang bent u al ziek?","waar doet het pijn?","hoe vaak moet u dit nemen?"], variants: ["ملاقات لینا","علامت بتانا","دوا اور فالو اپ"], documents: ["Afspraakkaart","Medicijnetiket","Advies huisarts"]
  }),
  missionSpec({
    level: "a2", id: "a2-mission-social-help", unit: "A2: سماجی مدد", title: "Gemeente en sociale hulp", description: "ملاقات کا خط، کاغذات، مدد کی درخواست، نامکمل معلومات، اور پیروی۔",
    concepts: [["office","gemeente","بلدیہ کا دفتر","gemeente"],["form","formulier","فارم","formulier"],["letter","brief","خط","bericht"],["passport","paspoort","پاسپورٹ","paspoort"],["signature","handtekening","دستخط","handtekening"],["desk","loket","کاؤنٹر","loket"]],
    phrases: [["ik heb een brief van de gemeente ontvangen","مجھے gemeente کا خط ملا ہے"],["ik wil weten welke hulp mogelijk is","میں جاننا چاہتا / چاہتی ہوں کون سی مدد ممکن ہے"],["welke documenten moet ik meenemen?","مجھے کون سے کاغذات ساتھ لانے ہیں؟"],["waarvoor heeft u ondersteuning nodig?","آپ کو کس کام کے لیے مدد چاہیے؟"],["ik heb hulp nodig met mijn administratie","مجھے اپنے کاغذی کام میں مدد چاہیے"],["dit formulier is nog niet compleet","یہ فارم ابھی مکمل نہیں ہے"],["mijn inkomensgegevens ontbreken","میری آمدنی کی معلومات موجود نہیں ہیں"],["kunt u uitleggen wat ik moet invullen?","کیا آپ سمجھا سکتے ہیں مجھے کیا بھرنا ہے؟"],["ik lever de documenten morgen aan","میں کاغذات کل جمع کراؤں گا / گی"],["wanneer hoor ik of de aanvraag is goedgekeurd?","مجھے کب معلوم ہو گا درخواست منظور ہوئی؟"],["u krijgt binnen twee weken bericht","آپ کو دو ہفتوں میں پیغام ملے گا"],["ik wil graag een ontvangstbevestiging","میں وصولی کی تصدیق چاہتا / چاہتی ہوں"]],
    cues: ["welke documenten heeft u bij u?","waarvoor heeft u hulp nodig?","wanneer kunt u de informatie opsturen?"], variants: ["خط سمجھنا","درخواست مکمل کرنا","جواب کی پیروی"], documents: ["Brief gemeente","Aanvraagformulier","Ontvangstbevestiging"]
  }),
  missionSpec({
    level: "a2", id: "a2-mission-job-start", unit: "A2: نوکری", title: "Werk zoeken en beginnen", description: "آسامی، فون، انٹرویو، دستیابی، معاہدہ، پہلا دن، اور حفاظت۔",
    concepts: [["job","baan","نوکری","baan"],["contract","contract","معاہدہ","contract"],["schedule","rooster","اوقات","rooster"],["salary","salaris","تنخواہ","salaris"],["colleague","collega","ساتھی","collega"],["work","werk","کام","werk"]],
    phrases: [["ik reageer op de vacature voor magazijnmedewerker","میں گودام کی آسامی کے لیے درخواست دے رہا / رہی ہوں"],["ik heb twee jaar ervaring","میرے پاس دو سال کا تجربہ ہے"],["ik ben vanaf volgende week beschikbaar","میں اگلے ہفتے سے دستیاب ہوں"],["waarom wilt u hier werken?","آپ یہاں کیوں کام کرنا چاہتے ہیں؟"],["omdat ik graag praktisch werk doe","کیونکہ مجھے عملی کام پسند ہے"],["hoeveel uur kan ik per week werken?","میں ہفتے میں کتنے گھنٹے کام کر سکتا / سکتی ہوں؟"],["lees het contract rustig door","معاہدہ آرام سے پڑھیں"],["mijn eerste werkdag is maandag","میرا پہلا کام کا دن پیر ہے"],["waar kan ik werkkleding krijgen?","مجھے کام کے کپڑے کہاں ملیں گے؟"],["draag altijd veiligheidsschoenen","ہمیشہ حفاظتی جوتے پہنیں"],["bij vragen ga ik naar mijn leidinggevende","سوال پر میں اپنے ذمہ دار کے پاس جاتا / جاتی ہوں"],["ik heb mijn eerste dag goed afgerond","میں نے پہلا دن اچھی طرح مکمل کیا"]],
    cues: ["wanneer kunt u beginnen?","waarom wilt u hier werken?","hoeveel uur bent u beschikbaar?"], variants: ["آسامی پر فون","انٹرویو","پہلا کام کا دن"], documents: ["Vacature","Arbeidscontract","Veiligheidsinstructie"]
  }),
  missionSpec({
    level: "a2", id: "a2-mission-utilities", unit: "A2: گھر کی سہولتیں", title: "Gas, water en internet", description: "میٹر، بل، بندش، کمپنی کو فون، مرمت کا وقت، غلط رقم، اور تصدیق۔",
    concepts: [["meter","meterstand","میٹر کی ریڈنگ","formulier"],["bill","rekening","بل","bon"],["heating","verwarming","ہیٹنگ","verwarming"],["water","water","پانی","water"],["internet","internet","انٹرنیٹ","telefoon"],["repair","monteur","مرمت کرنے والا","reparatie"]],
    phrases: [["ik moet de meterstand doorgeven","مجھے میٹر کی ریڈنگ دینی ہے"],["het bedrag op de rekening klopt niet","بل کی رقم درست نہیں ہے"],["sinds vanochtend hebben we geen warm water","آج صبح سے گرم پانی نہیں ہے"],["wat is uw klantnummer?","آپ کا گاہک نمبر کیا ہے؟"],["mijn klantnummer staat op de rekening","میرا گاہک نمبر بل پر ہے"],["kunt u controleren of er een storing is?","کیا آپ چیک کر سکتے ہیں کوئی بندش ہے؟"],["de monteur komt tussen twaalf en vier","مرمت کرنے والا بارہ سے چار کے درمیان آئے گا"],["ik ben dan thuis","میں اس وقت گھر پر ہوں گا / گی"],["mijn internet valt steeds uit","میرا انٹرنیٹ بار بار بند ہوتا ہے"],["ik wil de rekening laten corrigeren","میں بل درست کروانا چاہتا / چاہتی ہوں"],["stuur de bevestiging per e-mail","تصدیق ای میل سے بھیجیں"],["het probleem is nu opgelost","مسئلہ اب حل ہو گیا ہے"]],
    cues: ["wat is uw klantnummer?","wat is precies het probleem?","wanneer bent u thuis?"], variants: ["میٹر اور بل","پانی یا ہیٹنگ بند","انٹرنیٹ کا مسئلہ"], documents: ["Meterkaart","Energierekening","Monteursafspraak"]
  }),
  missionSpec({
    level: "a2", id: "a2-mission-lost-stolen", unit: "A2: گمشدہ یا چوری", title: "Verloren of gestolen", description: "گمشدہ چیز، کارڈ بند کرنا، پولیس رپورٹ، چیز کی تفصیل، نمبر، اور انشورنس۔",
    concepts: [["card","pinpas","بینک کارڈ","pinpas"],["phone","telefoon","فون","telefoon"],["passport","paspoort","پاسپورٹ","paspoort"],["bag","tas","بیگ","bericht"],["police","politie","پولیس","gemeente"],["insurance","verzekering","انشورنس","verzekering"]],
    phrases: [["ik ben mijn tas verloren","میرا بیگ گم ہو گیا ہے"],["mijn telefoon en pinpas zaten erin","اس میں میرا فون اور کارڈ تھے"],["ik wil mijn pinpas direct blokkeren","میں اپنا کارڈ فوراً بند کرنا چاہتا / چاہتی ہوں"],["waar heeft u de tas voor het laatst gezien?","آپ نے بیگ آخری بار کہاں دیکھا؟"],["in de trein naar Amsterdam","Amsterdam جانے والی ٹرین میں"],["de tas is zwart met een rode band","بیگ کالا ہے اور اس پر سرخ پٹی ہے"],["ik wil aangifte doen bij de politie","میں پولیس رپورٹ درج کروانا چاہتا / چاہتی ہوں"],["wanneer is het gebeurd?","یہ کب ہوا؟"],["gisteren rond zes uur","کل تقریباً چھ بجے"],["dit is uw registratienummer","یہ آپ کا رجسٹریشن نمبر ہے"],["ik stuur het nummer naar de verzekering","میں نمبر انشورنس کو بھیجوں گا / گی"],["bel mij als de tas is gevonden","بیگ ملے تو مجھے فون کریں"]],
    cues: ["wat bent u verloren?","waar heeft u het voor het laatst gezien?","wanneer is het gebeurd?"], variants: ["ٹرین میں بیگ گم","کارڈ اور فون چوری","پولیس اور انشورنس"], documents: ["Melding verloren voorwerp","Aangifte","Verzekeringsbericht"]
  })
];

const missionLessons = missionSpecs.map(makeMissionLesson);
const missionById = new Map(missionLessons.map((lesson) => [lesson.id, lesson]));
const a1Expanded = (...ids) => ids.flatMap((id) => [id, `${id}-review`]);

insertLessonAfter(a0Lessons, "a0-home-needs", missionById.get("a0-mission-home-start"));
insertLessonAfter(a0Lessons, "a0-transport-directions", missionById.get("a0-mission-neighbourhood"));
insertLessonAfter(a0Lessons, "a0-health-emergency", missionById.get("a0-mission-help"));
insertLessonAfter(a1Lessons, "a1-plans-invitations", missionById.get("a1-mission-phone-internet"));
insertLessonAfter(a1Lessons, "a1-work-school-messages", missionById.get("a1-mission-school-day"));
insertLessonAfter(a1Lessons, "a1-public-transport", missionById.get("a1-mission-post-parcel"));
insertLessonAfter(a1Lessons, "a1-home-neighbours", missionById.get("a1-mission-house-search"));
insertLessonAfter(a1Lessons, "a1-health-pharmacy", missionById.get("a1-mission-doctor"));
insertLessonAfter(a2Lessons, "a2-gemeente-documents", missionById.get("a2-mission-social-help"));
insertLessonAfter(a2Lessons, "a2-work-conditions", missionById.get("a2-mission-job-start"));
insertLessonAfter(a2Lessons, "a2-bills-banking", missionById.get("a2-mission-utilities"));
insertLessonAfter(a2Lessons, "a2-formal-digital-messages", missionById.get("a2-mission-lost-stolen"));

const a0Subchapters = [
  {
    id: "a0-start-speaking",
    title: "بات شروع کریں",
    goal: "سلام، ادب، چھوٹے جواب، اور سمجھ نہ آنے پر مدد مانگنا۔",
    practice: "روزمرہ کے تیار فقروں کو سنیں اور صحیح حال میں منتخب کریں۔",
    lessonIds: ["a0-greetings-courtesy", "a0-ik-jij-u", "a0-ja-nee-goed-niet", "a0-understanding-help"]
  },
  {
    id: "a0-letters-sounds",
    title: "حروف اور آوازیں",
    goal: "Nederlands حروف پہچاننا، آواز سننا، اور آسان الفاظ پڑھنا۔",
    practice: "حروف سنیں، پہچانیں، اور مثال والے لفظ سے ملائیں۔",
    lessonIds: ["a0-letters-1", "a0-letters-2", "a0-letters-3"]
  },
  {
    id: "a0-numbers-time",
    title: "اعداد اور وقت",
    goal: "صفر سے سو تک ضروری اعداد، ہفتے کے دن، اور پورا وقت پہچاننا۔",
    practice: "عدد سنیں، قیمت یا نمبر پہچانیں، اور وقت والے چھوٹے جملے بنائیں۔",
    lessonIds: ["a0-numbers-0-10", "a0-numbers-11-100", "a0-time-days", "a0-date-appointment"]
  },
  {
    id: "a0-people-things",
    title: "لوگ، چیزیں، اور سوال",
    goal: "لوگ اور چیزیں پہچاننا، اشارہ کرنا، اور چھوٹا سوال پوچھنا۔",
    practice: "man، boek، dit، dat، wie، wat، waar، hoe جیسے الفاظ استعمال کریں۔",
    lessonIds: ["a0-people-nouns", "a0-things-nouns", "a0-dit-dat-questions", "a0-een-de-het"]
  },
  {
    id: "a0-first-sentences",
    title: "میرے پہلے جملے",
    goal: "اپنے، دوسرے لوگوں، چیزوں، اور رہنے کی جگہ کے بارے میں چھوٹے جملے کہنا۔",
    practice: "ik ben، ik heb، wij zijn، mijn naam is جیسے جملے بنائیں۔",
    lessonIds: ["a0-ben-bent-is", "a0-first-sentences", "a0-hij-zij-wij", "a0-hebben-1", "a0-geen", "a0-possessive", "a0-name-land-city", "a0-spelling-personal-details", "a0-address-phone"]
  },
  {
    id: "a0-foundation-review",
    title: "بنیاد کی دہرائی",
    goal: "اب تک کے حروف، الفاظ، اور پہلے جملوں کی مشترک مشق۔",
    practice: "پرانے A0 مواد کو بدلے بغیر ایک مضبوط بنیاد کی جانچ کریں۔",
    lessonIds: ["a0-checkpoint"]
  },
  {
    id: "a0-place-movement",
    title: "جگہ اور حرکت",
    goal: "کہاں؟ کہاں جانا؟ in, op, onder, naar, met استعمال کرنا۔",
    practice: "جگہ والے الفاظ اور حرکت والے فعل کو چھوٹے فقروں میں لگائیں۔",
    lessonIds: ["a0-place-1", "a0-place-2", "a0-gaan-komen", "a0-naar-met", "a0-home-needs", "a0-mission-home-start"]
  },
  {
    id: "a0-daily-life",
    title: "روزمرہ Nederlands",
    goal: "روزانہ کے کام، کھانا، خریداری، سفر، راستہ، اور صحت کے ضروری جملے۔",
    practice: "حقیقی حالات میں مختصر اور فوراً استعمال ہونے والے فقرے منتخب کریں۔",
    lessonIds: ["a0-daily-actions", "a0-food-drink", "a0-shopping-payment", "a0-transport-directions", "a0-mission-neighbourhood", "a0-health-emergency", "a0-mission-help"]
  },
  {
    id: "a0-school-work-safety",
    title: "اسکول، کام، اور حفاظت",
    goal: "بچے کی غیر حاضری، کام کی اطلاع، موسم، کپڑے، اور عام حفاظتی نشان سمجھنا۔",
    practice: "مختصر فون جواب، وقت کی اطلاع، اور حقیقی نشان یا حالت کے مطابق صحیح جملہ منتخب کریں۔",
    lessonIds: ["a0-child-school", "a0-work-basics", "a0-weather-clothing-safety"]
  },
  {
    id: "a0-daily-review",
    title: "روزمرہ آخری دہرائی",
    goal: "A0 کے نئے روزمرہ حالات کو ایک ساتھ سمجھنا اور جواب دینا۔",
    practice: "سلام سے صحت اور سفر تک مختلف حالات کی مشترک مشق کریں۔",
    lessonIds: ["a0-daily-checkpoint"]
  }
];

const a1Subchapters = [
  {
    id: "a1-personal-info",
    title: "میری معلومات",
    goal: "اپنا نام، پتہ، فون نمبر، ملک اور آسان تعارف دینا۔",
    practice: "فارم والے الفاظ اور چھوٹے تعارف والے جملے۔",
    lessonIds: ["a1-zero-tiny-words", "a1-zijn-first-sentences", "a1-greetings-personal-info", ...a1Expanded("a1-details-forms")]
  },
  {
    id: "a1-family-people",
    title: "خاندان اور لوگ",
    goal: "خاندان، لوگ، اور بنیادی تفصیل کے الفاظ استعمال کرنا۔",
    practice: "dit is mijn..., ik heb..., hij/zij is... جیسے جملے۔",
    lessonIds: ["a1-people-family-articles", "a1-hebben-family", ...a1Expanded("a1-family-routine-extra", "a1-child-care")]
  },
  {
    id: "a1-daily-routine",
    title: "روزمرہ معمول",
    goal: "آج، کل، وقت، کام، اسکول اور آسان معمول بتانا۔",
    practice: "فاعل + فعل + باقی حصہ اور وقت والے الفاظ کے ساتھ جملہ بنانا۔",
    lessonIds: ["a1-present-time", "a1-daily-routine", ...a1Expanded("a1-calendar-time", "a1-weather-clothes", "a1-daily-review-one")]
  },
  {
    id: "a1-questions-help",
    title: "سوال اور مدد",
    goal: "آسان سوالات پوچھنا اور مدد/دہرانا مانگنا۔",
    practice: "waar, wat, wie, hoeveel اور ہاں/نہیں سوالات۔",
    lessonIds: ["a1-questions", "a1-plans-invitations", ...a1Expanded("a1-phone-calls", "a1-short-messages", "a1-appointments", "a1-questions-revision", "a1-polite-chunks"), "a1-mission-phone-internet"]
  },
  {
    id: "a1-home-objects",
    title: "گھر اور چیزیں",
    goal: "گھر، کمرہ، فرنیچر، اور چیز کہاں ہے بتانا۔",
    practice: "het boek is in huis جیسے جگہ جملے۔",
    lessonIds: ["a1-house-food-plurals", "a1-home-neighbours", ...a1Expanded("a1-neighbour-talk", "a1-home-repairs", "a1-cleaning-house", "a1-house-search-extra"), "a1-mission-house-search"]
  },
  {
    id: "a1-food-shopping",
    title: "کھانا اور خریداری",
    goal: "بنیادی کھانا، قیمتیں، خریدنا، اور قیمت پوچھنا۔",
    practice: "ik wil..., hoeveel kost...? جیسے روزمرہ فقرے۔",
    lessonIds: ["a1-cafe-ordering", "a1-shopping-clothes", ...a1Expanded("a1-supermarket", "a1-cafe-food-needs", "a1-shopping-returns", "a1-money-bank")]
  },
  {
    id: "a1-going-out-transport",
    title: "باہر جانا اور سفر",
    goal: "station، bus، trein، ٹکٹ، کہیں جانا۔",
    practice: "ik ga naar het station جیسے حرکت جملے۔",
    lessonIds: ["a1-shopping-transport", "a1-public-transport", ...a1Expanded("a1-directions-town", "a1-bus-train-extra", "a1-post-parcel-extra", "a1-library-community", "a1-safety-rules"), "a1-mission-post-parcel"]
  },
  {
    id: "a1-body-health",
    title: "جسم اور صحت",
    goal: "جسم/صحت کے الفاظ، درد، بیماری، ڈاکٹر سے ملاقات کا وقت۔",
    practice: "ik ben ziek، ik wil een afspraak maken، mijn hoofd doet pijn۔",
    lessonIds: ["a1-health-appointments", "a1-health-pharmacy", ...a1Expanded("a1-pharmacy-medicine", "a1-doctor-symptoms"), "a1-mission-doctor"]
  },
  {
    id: "a1-work-school-messages",
    title: "کام اور اسکول کے پیغام",
    goal: "غیر حاضری، بیماری، تاخیر، اور وقت کے بارے میں مختصر واضح پیغام دینا۔",
    practice: "فون کا تعارف، وجہ، واپسی کا دن، اور واپس فون کرنے کی درخواست۔",
    lessonIds: ["a1-work-school-messages", ...a1Expanded("a1-school-contact", "a1-work-schedule", "a1-daily-review-two"), "a1-mission-school-day"]
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
    lessonIds: ["a2-gemeente-official", "a2-gemeente-documents", "a2-mission-social-help"]
  },
  {
    id: "a2-work-school",
    title: "کام اور اسکول",
    goal: "کام/اسکول کے پیغام، غیر حاضری، collega/docent، وقتوں کی فہرست۔",
    practice: "mijn zoon kan vandaag niet komen جیسے پیغام۔",
    lessonIds: ["a2-work-school", "a2-work-conditions", "a2-mission-job-start", "a2-parent-school"]
  },
  {
    id: "a2-health-doctor",
    title: "صحت اور ڈاکٹر",
    goal: "شکایت سمجھانا، ڈاکٹر کا مشورہ سمجھنا۔",
    practice: "ik heb pijn..., de dokter heeft gezegd...۔",
    lessonIds: ["a2-strong-combined", "a2-doctor-advice"]
  },
  {
    id: "a2-housing-problems",
    title: "گھر کے مسئلے",
    goal: "کرایہ، ہیٹنگ، پانی کا رساؤ، مرمت، مالک مکان کے مسئلے۔",
    practice: "mijn verwarming doet het niet، kunt u iemand sturen؟",
    lessonIds: ["a2-health-housing", "a2-landlord-repairs"]
  },
  {
    id: "a2-shopping-complaints",
    title: "خریداری اور شکایت",
    goal: "ruilen، garantie، kapot، klacht، aanbieding۔",
    practice: "ik wil hem ruilen، hij is kapot۔",
    lessonIds: ["a2-shopping-services", "a2-customer-complaints"]
  },
  {
    id: "a2-bills-banking",
    title: "بل اور بینک",
    goal: "غلط بل، ادائیگی کی تاریخ، قسط، خودکار ادائیگی، اور گمشدہ کارڈ سنبھالنا۔",
    practice: "رقم کی غلطی سمجھانا، قسط مانگنا، اور ادائیگی کا ثبوت دینا۔",
    lessonIds: ["a2-bills-banking", "a2-mission-utilities"]
  },
  {
    id: "a2-messages-emails",
    title: "چھوٹے پیغام",
    goal: "ادب والے/بے تکلف پیغام، دعوت، شکایت، ادب والا اختتام۔",
    practice: "beste..., met vriendelijke groet, kom je ook؟",
    lessonIds: ["a2-writing-messages", "a2-formal-digital-messages", "a2-mission-lost-stolen"]
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
