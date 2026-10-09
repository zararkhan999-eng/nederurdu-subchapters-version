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

const build = (prompt, tiles, answer, explain, hint = "پہلے شخص، پھر فعل، پھر باقی جملہ رکھیں۔") => ({
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
      meaning("niet", ["نہیں (جملے کے اندر)", "ہاں", "اچھا"], "نہیں (جملے کے اندر)", "niet جملے کے اندر نہیں کا مطلب دیتا ہے۔"),
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
    description: "لوگ اور قریبی خاندان: آدمی، عورت، بچہ، والدین، بھائی، اور بہن۔",
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
      meaning("in het huis", ["گھر میں", "گھر کے اوپر", "گھر کے نیچے"], "گھر میں", "in + huis۔"),
      meaning("op de tafel", ["میز پر", "میز کے اندر", "میز کے نیچے"], "میز پر", "op + tafel۔"),
      meaning("onder de tafel", ["میز کے نیچے", "میز پر", "میز کے پاس"], "میز کے نیچے", "onder + tafel۔"),
      reverse("گھر میں", ["in het huis", "op het huis", "onder het huis"], "in het huis", "میں = in۔"),
      reverse("میز پر", ["op de tafel", "in de tafel", "onder de tafel"], "op de tafel", "پر = op۔")
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
      reverse("گھر کی طرف", ["naar huis", "met huis", "in het huis"], "naar huis", "سمت = naar۔"),
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
      meaning("niet", ["نہیں (جملے کے اندر)", "ہاں", "اچھا"], "نہیں (جملے کے اندر)", "niet جملے کے اندر نہیں کا مطلب دیتا ہے۔"),
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
  build("کتاب کمرے میں ہے", ["het", "boek", "is", "in", "de", "kamer"], "het boek is in de kamer", "چیز پہلے، پھر فعل `is`، پھر جگہ۔")
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

function optionKey(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function uniqueOptions(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item) return false;
    const key = optionKey(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function takeOptions(items, answer, count = 3) {
  const clean = uniqueOptions([answer, ...items]);
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
    || "het juiste woord is ___";
}

function singleWordFillGap(word) {
  const answer = cleanDutchWord(word);
  if (!isCleanDutchWord(answer)) return null;
  return { prompt: simpleFillSentenceForWord(answer), missing: answer };
}

const imageOptionFallbacks = [
  { dutch: "huis", urdu: "گھر", visualId: "huis" },
  { dutch: "bus", urdu: "بس", visualId: "bus" },
  { dutch: "brood", urdu: "روٹی", visualId: "brood" },
  { dutch: "boek", urdu: "کتاب", visualId: "boek" },
  { dutch: "dokter", urdu: "ڈاکٹر", visualId: "dokter" },
  { dutch: "station", urdu: "اسٹیشن", visualId: "station" },
  { dutch: "lamp", urdu: "لیمپ", visualId: "lamp" },
  { dutch: "water", urdu: "پانی", visualId: "water" },
  { dutch: "telefoon", urdu: "فون", visualId: "telefoon" },
  { dutch: "school", urdu: "اسکول", visualId: "school" },
  { dutch: "fiets", urdu: "سائیکل", visualId: "fiets" },
  { dutch: "appel", urdu: "سیب", visualId: "appel" }
];

const imagePersonTerms = new Set([
  "man", "vrouw", "kind", "kinderen", "jongen", "meisje", "familie",
  "vader", "moeder", "broer", "zus", "zoon", "dochter", "ouder",
  "buurman", "buurvrouw", "collega", "docent", "dokter", "monteur",
  "bezorger", "baas", "leidinggevende"
]);

function visualGroupForOption(concept) {
  const value = optionKey(concept?.dutch || concept);
  const visualId = optionKey(concept?.visualId || "").replace(/\s+/g, "-");
  if (imagePersonTerms.has(value) || imagePersonTerms.has(visualId)) return "person";
  if (["appel", "brood", "kaas", "fruit", "groente", "rijst", "water", "melk", "koffie", "thee", "soep", "vlees"].includes(value)) return "food";
  if (["bus", "trein", "fiets", "station", "halte", "kaartje", "spoor"].includes(value) || ["bus", "trein", "fiets", "station", "halte", "kaartje", "spoor"].includes(visualId)) return "transport";
  if (["huis", "deur", "lamp", "stoel", "tafel", "kamer", "badkamer", "keuken", "raam", "tuin", "woning"].includes(value) || ["huis", "deur", "lamp", "stoel", "tafel", "kamer", "badkamer", "keuken", "raam", "tuin", "woning"].includes(visualId)) return "home";
  if (["school", "gemeente", "winkel", "supermarkt", "apotheek", "ziekenhuis", "bibliotheek", "stad", "land", "plein"].includes(value) || ["school", "gemeente", "winkel", "supermarkt", "apotheek", "ziekenhuis", "bibliotheek", "stad", "land", "plein"].includes(visualId)) return "place";
  if (["oog", "pijn", "hoofdpijn", "buikpijn", "hoesten", "koorts", "ziek", "moe", "honger", "dorst"].includes(value) || ["oog", "pijn", "hoofdpijn", "buikpijn", "hoesten", "koorts", "ziek", "moe", "honger", "dorst"].includes(visualId)) return "health";
  return "other";
}

function imageOptions(concepts, index, key = "dutch") {
  const concept = concepts[index % concepts.length];
  const answer = concept[key];
  const answerGroup = visualGroupForOption(concept);
  const answerVisual = optionKey(concept.visualId || fallbackVisualIdForDutch(answer) || "");
  const pool = uniqueOptions([...concepts, ...imageOptionFallbacks].map((item) => item[key]))
    .map((value) => {
      const source = [...concepts, ...imageOptionFallbacks].find((item) => optionKey(item[key]) === optionKey(value));
      return source ? { ...source, [key]: value } : { [key]: value, dutch: value, visualId: fallbackVisualIdForDutch(value) };
    })
    .filter((item) => {
      if (optionKey(item[key]) === optionKey(answer)) return false;
      if (answerVisual && optionKey(item.visualId || fallbackVisualIdForDutch(item[key]) || "") === answerVisual) return false;
      return visualGroupForOption(item) !== answerGroup;
    });
  return [answer, ...rotate(pool.map((item) => item[key]), index + 1).slice(0, 2)];
}

function makeImageRevision(lesson, index) {
  const sources = meaningSources(lesson);
  const source = sources[index % sources.length];
  if (!source) return null;
  const concepts = sources.map((item) => ({
    dutch: item.prompt,
    urdu: item.answer,
    visualId: item.visualId || item.visual || fallbackVisualIdForDutch(item.prompt)
  })).filter((item) => item.visualId);
  const sourceIndex = Math.max(0, concepts.findIndex((item) => optionKey(item.dutch) === optionKey(source.prompt)));
  const options = imageOptions(concepts.length ? concepts : [{ dutch: source.prompt, urdu: source.answer, visualId: fallbackVisualIdForDutch(source.prompt) }], sourceIndex >= 0 ? sourceIndex : index, "dutch");
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
    listenChoice("niet", ["نہیں (جملے کے اندر)", "ہاں", "اچھا"], "نہیں (جملے کے اندر)", "niet جملے کے اندر نہیں کا مطلب دیتا ہے۔"),
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
  const alternatives = uniqueOptions(concepts.map((concept) => concept[key])).filter((value) => optionKey(value) !== optionKey(answer));
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
    const options = imageOptions(visualConcepts, index, "dutch");
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
      options: imageOptions(visualConcepts, index, "dutch"),
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
    questions.push({ type: "image-choice", label: "تصویر دیکھ کر صحیح Nederlands لفظ منتخب کریں", prompt: "تصویر دیکھیں اور صحیح لفظ چنیں۔", visualId: concept.visualId, options: imageOptions(visualConcepts, index, "dutch"), answer: concept.dutch, explain: `تصویر میں ${concept.urdu} ہے: ${concept.dutch}۔` });
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
    if (question.type === "meaning") {
      add(question.prompt, question.answer, question.visualId || question.visual || "");
    } else if (question.type === "reverse") {
      add(question.answer, question.prompt, question.visualId || question.visual || "");
    } else if (question.type === "listen-choice" && question.mode !== "listen-reply") {
      add(question.speak, question.answer);
    } else if (question.type === "build" && isUrduText(question.prompt)) {
      add(question.answer, question.prompt, question.visualId || question.visual || "");
    }
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
  const values = uniqueOptions(concepts.map((item) => item[key]));
  const answer = concept[key];
  const distractors = rotate(values.filter((value) => optionKey(value) !== optionKey(answer)), index + 1).slice(0, 2);
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
    const visualSet = {
      concept: visualConcepts[index % visualConcepts.length],
      options: imageOptions(visualConcepts, index, "dutch")
    };
    if (visualSet.options.length < 3) return null;
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
  // Preserve the authored seed inventory before the 60-question v3
  // compatibility bank is expanded. Schema v4 reads this compact inventory,
  // never the generated distractor/practice bank, as its concept source.
  lesson.seedConcepts = concepts.map((concept) => ({ ...concept }));
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
    if (filler) {
      if (bank.some((question) => questionSignature(question) === questionSignature(filler))) {
        filler.note = `دہرائی ${fillerAttempt + 1}`;
        filler.options = rotate(filler.options || [], fillerAttempt + 1);
      }
      if (!bank.some((question) => questionSignature(question) === questionSignature(filler))) {
        bank.push(filler);
      }
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
  const alternatives = uniqueOptions(items.map((item) => item[key])).filter((value) => optionKey(value) !== optionKey(answer));
  return [answer, ...rotate(alternatives, index + 1).slice(0, 2)];
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
        type: "listen-choice",
        label: "آواز سن کر صحیح Nederlands جملہ منتخب کریں",
        prompt: "آواز سنیں، پھر وہی Nederlands جملہ چنیں۔",
        speak: phrase.dutch,
        options: missionOptions(spec.phrases, phraseIndex, "dutch"),
        answer: phrase.dutch,
        explain: `آپ نے سنا: ${phrase.dutch}۔`,
        mode: "listen-dutch",
        note: "آواز کا بٹن دبائیں۔",
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
          options: imageOptions(spec.concepts, conceptIndex, "dutch"),
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
    lessonIds: ["a1-questions", "a1-polite-chunks", "a1-plans-invitations", "a1-phone-calls", "a1-appointments", "a1-mission-phone-internet"]
  },
  {
    id: "a1-home-objects",
    title: "گھر اور چیزیں",
    goal: "گھر، کمرہ، فرنیچر، اور چیز کہاں ہے بتانا۔",
    practice: "het boek is in de kamer جیسے جگہ جملے۔",
    lessonIds: ["a1-house-food-plurals", ...a1Expanded("a1-neighbour-talk", "a1-home-repairs", "a1-cleaning-house", "a1-house-search-extra"), "a1-mission-house-search"]
  },
  {
    id: "a1-food-shopping",
    title: "کھانا اور خریداری",
    goal: "بنیادی کھانا، قیمتیں، خریدنا، اور قیمت پوچھنا۔",
    practice: "ik wil..., hoeveel kost...? جیسے روزمرہ فقرے۔",
    lessonIds: ["a1-supermarket", "a1-cafe-ordering", "a1-cafe-food-needs", "a1-shopping-clothes", "a1-shopping-returns", "a1-money-bank"]
  },
  {
    id: "a1-going-out-transport",
    title: "باہر جانا اور سفر",
    goal: "station، bus، trein، ٹکٹ، کہیں جانا۔",
    practice: "ik ga naar het station جیسے حرکت جملے۔",
    lessonIds: ["a1-public-transport", "a1-directions-town", "a1-post-parcel-extra", "a1-library-community", "a1-safety-rules", "a1-mission-post-parcel"]
  },
  {
    id: "a1-body-health",
    title: "جسم اور صحت",
    goal: "جسم/صحت کے الفاظ، درد، بیماری، ڈاکٹر سے ملاقات کا وقت۔",
    practice: "ik ben ziek، ik wil een afspraak maken، mijn hoofd doet pijn۔",
    lessonIds: ["a1-health-appointments", "a1-doctor-symptoms", "a1-pharmacy-medicine", "a1-mission-doctor"]
  },
  {
    id: "a1-work-school-messages",
    title: "کام اور اسکول کے پیغام",
    goal: "غیر حاضری، بیماری، تاخیر، اور وقت کے بارے میں مختصر واضح پیغام دینا۔",
    practice: "فون کا تعارف، وجہ، واپسی کا دن، اور واپس فون کرنے کی درخواست۔",
    lessonIds: ["a1-short-messages", "a1-work-school-messages", ...a1Expanded("a1-school-contact", "a1-work-schedule", "a1-daily-review-two"), "a1-mission-school-day"]
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

/*
 * Learning-first course contract (schema v4)
 *
 * The arrays above remain the authored/generated compatibility source. This
 * final normalization pass adds stable semantic ownership and learning phases
 * without changing the answer/options/type shape used by the existing app.
 */

const learningPhaseOrderV4 = [
  "preview",
  "learn",
  "understand",
  "guided-practice",
  "use",
  "independent-check",
  "correction"
];

const chapterOutcomesV4 = {
  a0: "روزمرہ کی فوری ضرورت میں آسان Nederlands پہچاننا، مدد مانگنا، اور چھوٹا جواب دینا۔",
  a1: "گھر، خاندان، کام، اسکول، خریداری، سفر، اور صحت کے عام حالات میں آسان بات چیت کرنا۔",
  a2: "سرکاری، کام، اسکول، صحت، گھر، بل، اور پیغام کے عملی کام نسبتاً خود مختار ہو کر مکمل کرنا۔"
};

const chapterCompletionAreasV4 = [
  "meaning",
  "listening",
  "reading",
  "speaking-support",
  "practical-use"
];

function stableHashV4(value) {
  let hash = 2166136261;
  const text = String(value || "");
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

function semanticSlugV4(value, fallback = "item") {
  const slug = String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
  return slug || fallback;
}

function normalizedTextV4(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[.!?,;:()[\]{}"'’`|/\\]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueV4(items) {
  return [...new Set((items || []).filter(Boolean))];
}

function dutchWordsV4(value) {
  return uniqueV4(
    (String(value || "").toLowerCase().match(/[a-zà-ÿ0-9-]+/g) || [])
      .filter((word) => word.length > 1)
  );
}

function hasUsefulOverlapV4(left, right) {
  const leftWords = new Set(dutchWordsV4(left));
  return dutchWordsV4(right).some((word) => leftWords.has(word));
}

function approximateDutchPronunciationUrduV4(value) {
  const wholeWordOverrides = {
    ik: "اِک",
    jij: "یَے",
    je: "یَہ",
    u: "یو",
    uw: "یو",
    wij: "وَے",
    hij: "ہَے",
    zij: "زَے",
    een: "اَن",
    de: "دَ",
    het: "ہَت",
    ben: "بَین",
    bent: "بَینٹ",
    is: "اِس",
    heb: "ہَیپ",
    hebt: "ہَیپٹ",
    heeft: "ہےفٹ",
    hebben: "ہَیبَن",
    geen: "خین",
    goed: "خُوت",
    morgen: "مورخَن",
    niet: "نیت",
    nee: "نے",
    ja: "یا",
    huis: "ہاؤس",
    uit: "اؤَیٹ",
    zijn: "زَین",
    appel: "آپَل",
    boek: "بوک",
    boeken: "بوکَن",
    deur: "ڈُر",
    fiets: "فیتس",
    oog: "اوخ",
    pen: "پَین",
    rijst: "رَیست",
    stoel: "ستول",
    tafel: "تافَل",
    water: "واتَر",
    man: "مان",
    vrouw: "فراؤ",
    kind: "کِنٹ",
    kinderen: "کِنڈَرَن",
    familie: "فامیلی",
    vader: "فادَر",
    moeder: "مودَر",
    broer: "برور",
    zus: "زُس",
    naam: "نام",
    land: "لانٹ",
    stad: "ستاٹ",
    woon: "وون",
    nederland: "نے دَر لانٹ",
    nederlands: "نے دَر لانٹس",
    pakistan: "پاکستان",
    ali: "علی",
    sara: "سارا",
    mijn: "مَین",
    jouw: "یاؤ",
    haar: "ہار",
    dit: "دِت",
    dat: "دات",
    hier: "ہیر",
    daar: "دار",
    wie: "وی",
    wat: "وات",
    waar: "وار",
    hoe: "ہو",
    toilet: "توا لَیٹ",
    nul: "نُل",
    twee: "توے",
    drie: "دری",
    vier: "فیر",
    vijf: "فَیف",
    zes: "زَیس",
    zeven: "زے وَن",
    acht: "آخٹ",
    negen: "نے خَن",
    tien: "تین",
    elf: "اَیلف",
    twaalf: "توالف",
    dertien: "ڈَیر تین",
    veertien: "فیر تین",
    vijftien: "فَیف تین",
    zestien: "زَیس تین",
    zeventien: "زے وَن تین",
    achttien: "آخ تین",
    negentien: "نے خَن تین",
    twintig: "توِن ٹَخ",
    dertig: "ڈَیر ٹَخ",
    veertig: "فیر ٹَخ",
    vijftig: "فَیف ٹَخ",
    zestig: "زَیس ٹَخ",
    zeventig: "زے وَن ٹَخ",
    tachtig: "تاخ ٹَخ",
    negentig: "نے خَن ٹَخ",
    honderd: "ہون ڈَرٹ",
    euro: "اُورو",
    jaar: "یار",
    vandaag: "فان داخ",
    gisteren: "خِس تَرَن",
    nu: "نیو",
    uur: "یور",
    maandag: "مان داخ",
    dinsdag: "ڈِنس داخ",
    woensdag: "وونز داخ",
    donderdag: "دون دَر داخ",
    vrijdag: "فرَی داخ",
    zaterdag: "زا تَر داخ",
    zondag: "زون داخ",
    ochtend: "آخ تَنٹ",
    middag: "مِداخ",
    avond: "آ وُنٹ",
    nacht: "ناخٹ",
    om: "اوم",
    laat: "لات",
    tijd: "تَیٹ",
    voornaam: "فور نام",
    achternaam: "آخ تَر نام",
    spellen: "سپَیلَن",
    spelt: "سپَیلٹ",
    letter: "لَیتَر",
    leeftijd: "لَیف تَیٹ",
    kunt: "کُنٹ",
    herhalen: "ہَر ہا لَن",
    schrijf: "سخرَیف",
    op: "اوپ",
    langzaam: "لانخ زام",
    langzamer: "لانخ زا مَر",
    heet: "ہیت",
    adres: "آ د ریس",
    straat: "سترات",
    huisnummer: "ہاؤس نُمَر",
    postcode: "پوسٹ کوڈ",
    woonplaats: "وون پلاتس",
    telefoonnummer: "تے لے فون نُمَر",
    nummer: "نُمَر",
    mail: "مَیل",
    mailadres: "مَیل آ د ریس",
    afspraak: "آف سپراک",
    vroeg: "فروخ",
    wanneer: "وا نیر",
    veranderen: "فَ ران دَرَن",
    in: "اِن",
    onder: "اون دَر",
    naast: "ناست",
    voor: "فور",
    achter: "آخ تَر",
    bij: "بَی",
    naar: "نار",
    met: "مَیٹ",
    ga: "خا",
    gaat: "خات",
    kom: "کوم",
    komt: "کومٹ",
    komen: "کو مَن",
    school: "سخول",
    sleutel: "سلو تَل",
    kamer: "کامَر",
    licht: "لِخٹ",
    verwarming: "فَر وار مِنگ",
    open: "او پَن",
    dicht: "دِخٹ",
    koud: "کاؤٹ",
    warm: "وارَم",
    kapot: "کا پوت",
    nodig: "نو ڈَخ",
    doet: "ڈوت",
    doe: "ڈو",
    werk: "وَیرک",
    werken: "وَیر کَن",
    eten: "اے تَن",
    eet: "ایت",
    drinken: "درِن کَن",
    drink: "درِنک",
    slapen: "سلا پَن",
    lopen: "لو پَن",
    zitten: "زِ تَن",
    staan: "ستان",
    wachten: "واخ تَن",
    wacht: "واخٹ",
    lezen: "لے زَن",
    schrijven: "سخرَی وَن",
    brood: "بروٹ",
    melk: "مَیلک",
    koffie: "کوفی",
    thee: "تے",
    fruit: "فراؤَیٹ",
    groente: "خرون تَ",
    honger: "ہونگَر",
    dorst: "دورسٹ",
    winkel: "وِن کَل",
    supermarkt: "سو پَر مارکٹ",
    prijs: "پرَیس",
    kassa: "کا سا",
    bon: "بون",
    contant: "کون تانٹ",
    pinnen: "پِنَن",
    betalen: "بَ تا لَن",
    betaal: "بَ تال",
    goedkoop: "خُوت کوپ",
    duur: "ڈُر",
    hoeveel: "ہو فیل",
    kost: "کوسٹ",
    wil: "وِل",
    mag: "ماخ",
    bus: "بُس",
    trein: "ٹرَین",
    station: "ستا شون",
    halte: "ہال تَ",
    kaartje: "کار چَ",
    links: "لِنکس",
    rechts: "رِخٹس",
    rechtdoor: "رِخٹ ڈور",
    ingang: "اِن خانخ",
    uitgang: "اؤَیٹ خانخ",
    ziek: "زیک",
    pijn: "پَین",
    dokter: "ڈوک تَر",
    apotheek: "آ پو تیک",
    medicijn: "مے ڈی سَین",
    ziekenhuis: "زیکَن ہاؤس",
    ambulance: "آم بیو لان سَ",
    hoofdpijn: "ہوفٹ پَین",
    buikpijn: "بَؤک پَین",
    hulp: "ہُلپ",
    bel: "بَیل",
    docent: "دو سَینٹ",
    klas: "کلاس",
    brengen: "برَین خَن",
    breng: "برَینخ",
    ophalen: "اوپ ہا لَن",
    haal: "ہال",
    afwezig: "آف وے زَخ",
    schooltijd: "سخول تَیٹ",
    collega: "کو لے خا",
    leidinggevende: "لَی ڈِنگ خے فَن دَ",
    beginnen: "بَ خِنَن",
    begin: "بَ خِن",
    stoppen: "سٹو پَن",
    stop: "سٹوپ",
    pauze: "پاؤ زَ",
    kan: "کان",
    regen: "رے خَن",
    regent: "رے خَنٹ",
    jas: "یاس",
    paraplu: "پا را پلیو",
    gevaar: "خَ فار",
    verboden: "فَر بو دَن"
  };
  const chunks = [
    ["sch", "سخ"], ["ng", "نگ"], ["ch", "خ"], ["g", "خ"],
    ["ij", "َے"], ["ei", "َے"], ["ui", "اؤی"], ["ou", "آؤ"], ["au", "آؤ"],
    ["oe", "او"], ["ie", "ای"], ["eu", "ُو"], ["aa", "آ"], ["ee", "اے"],
    ["oo", "او"], ["uu", "یو"], ["sj", "ش"], ["th", "ت"], ["ph", "ف"],
    ["a", "اَ"], ["b", "ب"], ["c", "ک"], ["d", "د"], ["e", "َ"],
    ["f", "ف"], ["h", "ہ"], ["i", "ِ"], ["j", "ی"], ["k", "ک"],
    ["l", "ل"], ["m", "م"], ["n", "ن"], ["o", "و"], ["p", "پ"],
    ["q", "ک"], ["r", "ر"], ["s", "س"], ["t", "ت"], ["u", "ُ"],
    ["v", "و"], ["w", "و"], ["x", "کس"], ["y", "ی"], ["z", "ز"]
  ];
  return String(value || "")
    .toLowerCase()
    .split(/(\s+|[,.!?;:()/-]+)/)
    .map((part) => {
      if (!/[a-zà-ÿ]/.test(part)) return part;
      const normalized = part.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
      if (wholeWordOverrides[normalized]) return wholeWordOverrides[normalized];
      let remaining = normalized;
      let result = "";
      while (remaining) {
        const match = chunks.find(([source]) => remaining.startsWith(source));
        if (match) {
          result += match[1];
          remaining = remaining.slice(match[0].length);
        } else {
          remaining = remaining.slice(1);
        }
      }
      return (result || "آواز")
        .replace(/^([\u064b-\u065f\u0670])/u, "ا$1");
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanConceptUrduV4(value) {
  return String(value || "")
    .replace(/^(?:یہ بنائیں|حال|آخری قدم)\s*:\s*/u, "")
    .trim();
}

const removedA1ReviewLessonIdsV4 = a1Lessons
  .filter((lesson) => /-review$/.test(lesson.id))
  .map((lesson) => lesson.id);
const retiredAdaptiveLessonsV4 = a1Lessons.filter((lesson) => /-review$/.test(lesson.id));

for (let index = a1Lessons.length - 1; index >= 0; index -= 1) {
  if (/-review$/.test(a1Lessons[index].id)) a1Lessons.splice(index, 1);
}

for (const subchapter of a1Subchapters) {
  subchapter.lessonIds = subchapter.lessonIds.filter((lessonId) => !/-review$/.test(lessonId));
}

function retirePathLessonV4(lessons, lessonId) {
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  if (index < 0) return;
  retiredAdaptiveLessonsV4.push(lessons[index]);
  lessons.splice(index, 1);
}

retirePathLessonV4(a0Lessons, "a0-checkpoint");
retirePathLessonV4(a0Lessons, "a0-things-nouns");
retirePathLessonV4(a0Lessons, "a0-daily-checkpoint");
retirePathLessonV4(a1Lessons, "a1-zero-tiny-words");
retirePathLessonV4(a1Lessons, "a1-zijn-first-sentences");
retirePathLessonV4(a1Lessons, "a1-daily-review-one");
retirePathLessonV4(a1Lessons, "a1-daily-review-two");
retirePathLessonV4(a1Lessons, "a1-questions-revision");
retirePathLessonV4(a1Lessons, "a1-home-neighbours");
retirePathLessonV4(a1Lessons, "a1-shopping-transport");
retirePathLessonV4(a1Lessons, "a1-bus-train-extra");
retirePathLessonV4(a1Lessons, "a1-health-pharmacy");

for (const subchapter of [...a0Subchapters, ...a1Subchapters]) {
  subchapter.lessonIds = subchapter.lessonIds.filter((lessonId) => (
    ![
      "a0-checkpoint",
      "a0-things-nouns",
      "a0-daily-checkpoint",
      "a1-zero-tiny-words",
      "a1-zijn-first-sentences",
      "a1-daily-review-one",
      "a1-daily-review-two",
      "a1-questions-revision",
      "a1-home-neighbours",
      "a1-shopping-transport",
      "a1-bus-train-extra",
      "a1-health-pharmacy"
    ].includes(lessonId)
  ));
}
for (const subchapters of [a0Subchapters, a1Subchapters]) {
  for (let index = subchapters.length - 1; index >= 0; index -= 1) {
    if (!subchapters[index].lessonIds.length) subchapters.splice(index, 1);
  }
}

const a0StartUnitV4 = a0Subchapters.find((unit) => unit.id === "a0-start-speaking");
const a0LettersUnitV4 = a0Subchapters.find((unit) => unit.id === "a0-letters-sounds");
const a0PeopleUnitV4 = a0Subchapters.find((unit) => unit.id === "a0-people-things");
if (a0StartUnitV4) {
  a0StartUnitV4.lessonIds = [
    "a0-greetings-courtesy",
    "a0-understanding-help",
    "a0-ja-nee-goed-niet"
  ];
}
if (a0PeopleUnitV4 && !a0PeopleUnitV4.lessonIds.includes("a0-ik-jij-u")) {
  a0PeopleUnitV4.lessonIds.unshift("a0-ik-jij-u");
}
if (a0LettersUnitV4) {
  const orderedUnitIds = [
    "a0-start-speaking",
    "a0-letters-sounds",
    "a0-people-things",
    "a0-numbers-time"
  ];
  a0Subchapters.sort((left, right) => {
    const leftIndex = orderedUnitIds.indexOf(left.id);
    const rightIndex = orderedUnitIds.indexOf(right.id);
    if (leftIndex >= 0 || rightIndex >= 0) {
      return (leftIndex < 0 ? orderedUnitIds.length : leftIndex)
        - (rightIndex < 0 ? orderedUnitIds.length : rightIndex);
    }
    return 0;
  });
}

const a0LetterLessonTitlesV4 = {
  "a0-letters-1": {
    title: "Eerste klanken: a en b",
    description: "a اور b کی ضروری آوازیں سننا، پھر appel، boek، deur، اور fiets کو تصویر اور آواز سے پہچاننا۔"
  },
  "a0-letters-2": {
    title: "Eerste klanken: h en i",
    description: "h اور i کی ضروری آوازیں سننا، پھر huis، ijs، jas، kat، اور lamp کو تصویر اور آواز سے پہچاننا۔"
  },
  "a0-letters-3": {
    title: "Herkenbare woorden en klanken",
    description: "oog، pen، rijst، stoel، tafel، اور water کو آواز اور تصویر سے پہچاننا؛ مکمل حروف تہجی الگ letters tool میں دستیاب ہے۔"
  }
};
for (const lesson of a0Lessons) {
  if (a0LetterLessonTitlesV4[lesson.id]) Object.assign(lesson, a0LetterLessonTitlesV4[lesson.id]);
}

/*
 * A0 follows the curriculum constitution's dependency order.  The original
 * source grouped several grammar labels ahead of the real-life skill that
 * needed them.  These nine units keep the stable lesson and mission IDs, but
 * put identity before age, possession before dit/dat phrases, and give the two
 * former "daily life" missions separate shop and travel/health purposes.
 */
const a0LearningFirstUnitsV4 = [
  {
    id: "a0-start-speaking",
    title: "بات شروع کریں",
    goal: "سلام کرنا، ادب سے جواب دینا، اور سمجھ نہ آنے پر مدد مانگنا۔",
    practice: "سلام سے بات شروع کریں، دوبارہ یا آہستہ بولنے کو کہیں، چھوٹا جواب دیں، اور رخصت ہوں۔",
    lessonIds: [
      "a0-greetings-courtesy",
      "a0-understanding-help",
      "a0-ja-nee-goed-niet",
      "a0-start-speaking-mission"
    ]
  },
  {
    id: "a0-letters-sounds",
    title: "حروف، آواز، اور پہلے لفظ",
    goal: "ضروری ڈچ آوازیں سننا، حروف پہچاننا، اور چند آسان لفظ پڑھنا۔",
    practice: "حرف سنیں، اس کی شکل پہچانیں، پھر اسی آواز والا سکھایا ہوا لفظ چنیں۔",
    lessonIds: [
      "a0-letters-1",
      "a0-letters-2",
      "a0-letters-3",
      "a0-letters-sounds-mission"
    ]
  },
  {
    id: "a0-first-sentences",
    title: "میں، لوگ، خاندان، اور تعارف",
    goal: "اپنا نام اور ملک بتانا، لوگوں اور قریبی خاندان کو پہچاننا، اور پہلا مکمل تعارف کہنا۔",
    practice: "ik، jij، u، hij، zij، wij اور ben/bent/is کے ساتھ مختصر تعارف بنائیں۔",
    lessonIds: [
      "a0-ik-jij-u",
      "a0-people-nouns",
      "a0-hij-zij-wij",
      "a0-een-de-het",
      "a0-ben-bent-is",
      "a0-first-sentences",
      "a0-name-land-city",
      "a0-first-sentences-mission"
    ]
  },
  {
    id: "a0-people-things",
    title: "چیز، ملکیت، اور چھوٹا سوال",
    goal: "بتانا کہ کس کے پاس کیا ہے یا نہیں، چیز کی ملکیت بتانا، اور شخص، چیز، یا جگہ پوچھنا۔",
    practice: "ik heb، geen، mijn، dit/dat اور wie/wat/waar کو پہلے سیکھی ہوئی چیزوں کے ساتھ استعمال کریں۔",
    lessonIds: [
      "a0-hebben-1",
      "a0-geen",
      "a0-possessive",
      "a0-dit-dat-questions",
      "a0-people-things-mission"
    ]
  },
  {
    id: "a0-numbers-time",
    title: "اعداد، وقت، اور رابطے کی معلومات",
    goal: "عمر، دن، پورا وقت، نام کے حروف، پتہ، فون نمبر، اور ملاقات کی بنیادی معلومات دینا۔",
    practice: "نمبر سنیں، نام ہجے کریں، رابطے کی معلومات سمجھیں، اور ملاقات کا وقت سنبھالیں۔",
    lessonIds: [
      "a0-numbers-0-10",
      "a0-numbers-11-100",
      "a0-time-days",
      "a0-spelling-personal-details",
      "a0-address-phone",
      "a0-date-appointment",
      "a0-numbers-time-mission"
    ]
  },
  {
    id: "a0-place-movement",
    title: "جگہ، حرکت، اور گھر کی ضرورت",
    goal: "چیز کی جگہ بتانا، گھر یا اسکول کی طرف جانا، اور گھر کی فوری ضرورت یا خرابی بتانا۔",
    practice: "in/op/onder، naast/voor/achter، gaan/komen، naar/met اور گھر کے تیار جملے استعمال کریں۔",
    lessonIds: [
      "a0-place-1",
      "a0-place-2",
      "a0-gaan-komen",
      "a0-naar-met",
      "a0-home-needs",
      "a0-mission-home-start"
    ]
  },
  {
    id: "a0-daily-shop",
    title: "روزمرہ کام، کھانا، اور خریداری",
    goal: "روزمرہ کام بتانا، کھانا یا مشروب مانگنا، قیمت پوچھنا، اور ادائیگی کرنا۔",
    practice: "ایک روزمرہ عمل، پسند یا ضرورت، قیمت، پن یا نقد، اور رسید والی بات استعمال کریں۔",
    lessonIds: [
      "a0-daily-actions",
      "a0-food-drink",
      "a0-shopping-payment",
      "a0-mission-neighbourhood"
    ]
  },
  {
    id: "a0-travel-health",
    title: "سفر، راستہ، اور فوری صحت کی مدد",
    goal: "اسٹیشن یا ٹکٹ پوچھنا، سمت سمجھنا، بیماری یا درد بتانا، اور فوری مدد مانگنا۔",
    practice: "سفر کے نشان اور راستہ سمجھیں، پھر ڈاکٹر، فارمیسی، یا ہنگامی مدد کا ضروری جملہ کہیں۔",
    lessonIds: [
      "a0-transport-directions",
      "a0-health-emergency",
      "a0-mission-help"
    ]
  },
  {
    id: "a0-school-work-safety",
    title: "اسکول، کام، موسم، اور حفاظت",
    goal: "بچے یا کام کی غیر حاضری اور وقت بتانا، موسم کے مطابق چیز لینا، اور حفاظتی نشان سمجھنا۔",
    practice: "اسکول، کام، موسم، اور حفاظت کی ایک مربوط عملی صورت مکمل کریں۔",
    lessonIds: [
      "a0-child-school",
      "a0-work-basics",
      "a0-weather-clothing-safety",
      "a0-school-work-safety-mission"
    ]
  }
];
a0Subchapters.splice(0, a0Subchapters.length, ...a0LearningFirstUnitsV4);

const a0LessonLabelsV4 = {
  "a0-greetings-courtesy": "سلام اور ادب",
  "a0-understanding-help": "سمجھ اور مدد",
  "a0-ja-nee-goed-niet": "چھوٹے جواب",
  "a0-letters-1": "آواز: a اور b",
  "a0-letters-2": "آواز: h اور i",
  "a0-letters-3": "آسان پڑھے ہوئے لفظ",
  "a0-ik-jij-u": "میں، تم، اور آپ",
  "a0-people-nouns": "لوگ اور قریبی خاندان",
  "a0-hij-zij-wij": "وہ اور ہم",
  "a0-een-de-het": "ایک اور چیز کا لفظ",
  "a0-ben-bent-is": "میں ہوں، آپ ہیں، وہ ہے",
  "a0-first-sentences": "پہلے مکمل جملے",
  "a0-name-land-city": "میرا تعارف",
  "a0-hebben-1": "میرے پاس کیا ہے",
  "a0-geen": "میرے پاس کیا نہیں ہے",
  "a0-possessive": "میرا، تمہارا، اس کا",
  "a0-dit-dat-questions": "یہ، وہ، اور سوال",
  "a0-numbers-0-10": "صفر سے دس",
  "a0-numbers-11-100": "گیارہ سے سو",
  "a0-time-days": "دن اور پورا وقت",
  "a0-spelling-personal-details": "نام اور عمر",
  "a0-address-phone": "پتہ اور فون",
  "a0-date-appointment": "تاریخ اور ملاقات",
  "a0-place-1": "جگہ: اندر، اوپر، نیچے",
  "a0-place-2": "جگہ: ساتھ، آگے، پیچھے",
  "a0-gaan-komen": "جانا اور آنا",
  "a0-naar-met": "کی طرف اور ساتھ",
  "a0-home-needs": "گھر کی فوری ضرورت",
  "a0-daily-actions": "روزمرہ کام",
  "a0-food-drink": "کھانا اور پینا",
  "a0-shopping-payment": "دکان اور ادائیگی",
  "a0-transport-directions": "سفر اور راستہ",
  "a0-health-emergency": "صحت اور فوری مدد",
  "a0-child-school": "بچہ اور اسکول",
  "a0-work-basics": "کام کی اطلاع",
  "a0-weather-clothing-safety": "موسم اور حفاظت"
};
for (const lesson of a0Lessons) {
  if (a0LessonLabelsV4[lesson.id]) lesson.unit = a0LessonLabelsV4[lesson.id];
}

function replaceSeedConceptsV4(lessonId, concepts) {
  const lesson = a0Lessons.find((item) => item.id === lessonId);
  if (!lesson) return;
  lesson.concepts = [];
  lesson.seedConcepts = concepts.map(([dutch, urdu, extra = {}]) => ({
    dutch,
    urdu,
    visualId: extra.visualId || fallbackVisualIdForDutch(dutch) || "",
    ...extra
  }));
}

replaceSeedConceptsV4("a0-letters-1", [
  ["a", "حرف a", { role: "sound" }],
  ["appel", "سیب"],
  ["deur", "دروازہ"],
  ["b", "حرف b", { role: "sound" }],
  ["boek", "کتاب"],
  ["fiets", "سائیکل"]
]);
replaceSeedConceptsV4("a0-letters-2", [
  ["h", "حرف h", { role: "sound" }],
  ["i", "حرف i", { role: "sound" }],
  ["huis", "گھر"],
  ["ijs", "آئس کریم"],
  ["jas", "کوٹ / جیکٹ"],
  ["kat", "بلی"],
  ["lamp", "لیمپ"]
]);
replaceSeedConceptsV4("a0-letters-3", [
  ["oog", "آنکھ"],
  ["pen", "قلم"],
  ["rijst", "چاول"],
  ["stoel", "کرسی"],
  ["tafel", "میز"],
  ["water", "پانی"]
]);
replaceSeedConceptsV4("a0-people-nouns", [
  ["man", "آدمی"],
  ["vrouw", "عورت"],
  ["kind", "بچہ"],
  ["familie", "خاندان"],
  ["vader", "والد / باپ"],
  ["moeder", "والدہ / ماں"],
  ["broer", "بھائی"],
  ["zus", "بہن"]
]);
replaceSeedConceptsV4("a0-ik-jij-u", [
  ["ik", "میں"],
  ["jij", "تم"],
  ["u", "آپ"]
]);
replaceSeedConceptsV4("a0-hij-zij-wij", [
  ["hij", "وہ مرد"],
  ["zij", "وہ عورت / وہ لوگ"],
  ["wij", "ہم"]
]);
replaceSeedConceptsV4("a0-ben-bent-is", [
  ["ik ben Ali", "میں Ali ہوں"],
  ["ik ben", "میں ہوں"],
  ["jij bent", "تم ہو"],
  ["u bent", "آپ ہیں"],
  ["hij is", "وہ مرد ہے"],
  ["zij is", "وہ عورت ہے"],
  ["wij zijn", "ہم ہیں"]
]);
replaceSeedConceptsV4("a0-first-sentences", [
  ["ik ben een man", "میں ایک آدمی ہوں"],
  ["ik ben een vrouw", "میں ایک عورت ہوں"],
  ["hij is een man", "وہ ایک آدمی ہے"],
  ["zij is een vrouw", "وہ ایک عورت ہے"],
  ["wij zijn familie", "ہم خاندان ہیں"]
]);
replaceSeedConceptsV4("a0-name-land-city", [
  ["naam", "نام"],
  ["land", "ملک"],
  ["stad", "شہر"],
  ["mijn naam is Ali", "میرا نام Ali ہے"],
  ["ik woon in Nederland", "میں Nederland میں رہتا/رہتی ہوں"],
  ["ik kom uit Pakistan", "میں Pakistan سے آتا/آتی ہوں"]
]);
replaceSeedConceptsV4("a0-hebben-1", [
  ["ik heb een boek", "میرے پاس ایک کتاب ہے"],
  ["jij hebt een pen", "تمہارے پاس ایک قلم ہے"],
  ["hij heeft een huis", "اس کے پاس ایک گھر ہے"]
]);
replaceSeedConceptsV4("a0-geen", [
  ["geen boek", "کوئی کتاب نہیں"],
  ["ik heb geen boek", "میرے پاس کتاب نہیں ہے"],
  ["zij heeft geen pen", "اس کے پاس قلم نہیں ہے"],
  ["wij hebben geen huis", "ہمارے پاس گھر نہیں ہے"],
  ["het is niet goed", "یہ ٹھیک نہیں ہے"]
]);
replaceSeedConceptsV4("a0-spelling-personal-details", [
  ["mijn naam is Sara", "میرا نام Sara ہے"],
  ["hoe heet u?", "آپ کا نام کیا ہے؟"],
  ["hoe spelt u dat?", "آپ اس کے حروف کیسے بولتے ہیں؟"],
  ["voornaam", "پہلا نام"],
  ["achternaam", "خاندانی نام"],
  ["letter", "حرف"],
  ["spellen", "حروف الگ الگ بولنا"],
  ["kunt u dat herhalen?", "کیا آپ اسے دوبارہ کہہ سکتے ہیں؟"],
  ["schrijf het op", "اسے لکھ دیں"],
  ["langzaam alstublieft", "آہستہ، برائے مہربانی"],
  ["leeftijd", "عمر"],
  ["ik ben dertig jaar", "میں تیس سال کا / کی ہوں"]
]);
replaceSeedConceptsV4("a0-address-phone", [
  ["wat is uw adres?", "آپ کا پتہ کیا ہے؟"],
  ["ik woon op Marktstraat 12", "میں Marktstraat 12 پر رہتا / رہتی ہوں"],
  ["adres", "پتہ"],
  ["straat", "سڑک"],
  ["huisnummer", "گھر نمبر"],
  ["postcode", "پوسٹ کوڈ"],
  ["woonplaats", "رہنے کا شہر"],
  ["wat is uw telefoonnummer?", "آپ کا فون نمبر کیا ہے؟"],
  ["mijn nummer is nul zes", "میرا نمبر صفر چھ ہے"],
  ["telefoonnummer", "فون نمبر"],
  ["e-mailadres", "ای میل پتہ"],
  ["ik heb geen e-mail", "میرے پاس ای میل نہیں ہے"]
]);
replaceSeedConceptsV4("a0-gaan-komen", [
  ["ik ga naar huis", "میں گھر جاتا/جاتی ہوں"],
  ["ik ga", "میں جاتا/جاتی ہوں"],
  ["hij gaat", "وہ جاتا ہے"],
  ["ik kom", "میں آتا/آتی ہوں"],
  ["hij komt", "وہ آتا ہے"],
  ["ik kom naar huis", "میں گھر آتا/آتی ہوں"]
]);

const a0HelpLessonV4 = a0Lessons.find((lesson) => lesson.id === "a0-understanding-help");
const a0HelpExplanationV4 = a0HelpLessonV4?.questions.find((question) => question.type === "uitleg");
if (a0HelpExplanationV4) {
  Object.assign(a0HelpExplanationV4, {
    prompt: "ادب سے Kunt u …? کہنا",
    points: [
      "Kunt u herhalen? میں “Kunt u …?” مؤدبانہ سوال کا آغاز ہے۔",
      "Kunt u mij helpen? میں بھی “Kunt u …?” سے ادب کے ساتھ درخواست بنتی ہے۔",
      "Langzamer, alstublieft مختصر درخواست ہے؛ Kunt u herhalen? پوری بات دوبارہ مانگتا ہے۔"
    ],
    note: "عام غلطی: u چھوڑ کر “Kunt herhalen?” کہنا۔ مؤدبانہ سوال میں u لازمی رکھیں۔"
  });
}

const a0GreetingLessonV4 = a0Lessons.find((lesson) => lesson.id === "a0-greetings-courtesy");
for (const raw of [
  ...(a0GreetingLessonV4?.concepts || []),
  ...(a0GreetingLessonV4?.seedConcepts || [])
]) {
  if (normalizedTextV4(raw.dutch) !== "goed dank u") continue;
  raw.dutch = "goed, dank u";
  raw.audio = "goed, dank u";
  raw.audioText = "goed, dank u";
}
const a0ShortAnswersLessonV4 = a0Lessons.find((lesson) => lesson.id === "a0-ja-nee-goed-niet");
if (a0ShortAnswersLessonV4) {
  a0ShortAnswersLessonV4.description = "ہاں، نہیں، اچھا، اور اچھا نہیں: روزمرہ کے سب سے چھوٹے جواب۔";
}

/*
 * A1 authoring is deliberately kept in one stable-ID registry.  Unit records
 * can be added here in the mandatory chapter order without teaching text,
 * scenarios, documents, patterns, or dependencies being inferred from a
 * question's position in the legacy bank.
 */
function authoredA1TeachingV4(rows) {
  return Object.fromEntries(rows.map(([
    dutch,
    usageUrdu,
    usageBoundaryUrdu,
    commonConfusionUrdu,
    exampleDutch,
    exampleUrdu,
    pronunciationUrdu
  ]) => [normalizedTextV4(dutch), {
    usageUrdu,
    usageBoundaryUrdu,
    commonConfusionUrdu,
    exampleDutch,
    exampleUrdu,
    pronunciationUrdu
  }]));
}

const a1AuthoredCurriculumV4 = {
  version: "a1-authored-v4",
  chapterPrerequisiteRefs: [
    ["a0-greetings-courtesy", "hallo"],
    ["a0-understanding-help", "kunt u herhalen"],
    ["a0-ik-jij-u", "u"],
    ["a0-name-land-city", "mijn naam is Ali"],
    ["a0-spelling-personal-details", "hoe heet u?"],
    ["a0-address-phone", "adres"],
    ["a0-address-phone", "telefoonnummer"],
    ["a0-numbers-0-10", "nul"],
    ["a0-time-days", "om acht uur"]
  ],
  units: {
    "a1-family-people": {
      outcomeUrdu: "خاندان کی تصویر یا opvang کی گفتگو میں رشتہ پہچاننا، اپنے خاندان کے بارے میں مکمل جملے کہنا، اور بچے کے لانے یا لینے کا وقت واضح کرنا۔",
      practiceUrdu: "پہلے رشتے اور مکمل جملے سمجھیں، پھر خاندان کی مختصر گفتگو اور opvang کی حوالگی میں وہی سیکھی ہوئی باتیں استعمال کریں۔"
    },
    "a1-daily-routine": {
      outcomeUrdu: "کام یا اسکول کے عام دن کا وقت بتانا، سادہ ہفتہ وار شیڈول پڑھنا، دیر کی اطلاع دینا، اور موسم کے مطابق روزمرہ فیصلہ واضح کرنا۔",
      practiceUrdu: "پہلے آج کے مکمل جملے اور روزمرہ ترتیب سمجھیں، پھر شیڈول، تاخیر کے پیغام، اور موسم والے منصوبے میں وہی سیکھی ہوئی باتیں استعمال کریں۔"
    },
    "a1-questions-help": {
      outcomeUrdu: "روزمرہ جگہ پر واضح سوال پوچھنا، ادب سے مدد مانگنا، دعوت قبول یا رد کرنا، فون سنبھالنا، اور ملاقات بنانا یا بدلنا۔",
      practiceUrdu: "پہلے سوال کی ترتیب اور مؤدبانہ مکمل باتیں سمجھیں، پھر دعوت، فون نوٹ، اور ملاقات کی تصدیق میں وہی سیکھی ہوئی زبان استعمال کریں۔"
    },
    "a1-home-objects": {
      outcomeUrdu: "گھر کے کمرے اور چیزیں پہچاننا، پڑوسی سے مؤدبانہ بات کرنا، خرابی بتانا، گھر کے کام بیان کرنا، اور مکان کا اشتہار سمجھ کر دیکھنے کا وقت مانگنا۔",
      practiceUrdu: "پہلے گھر، پڑوسی، مرمت، اور صفائی کی مکمل باتیں سمجھیں، پھر مکان کے اشتہار اور گھر دیکھنے کی عملی گفتگو میں صرف وہی سیکھی ہوئی زبان استعمال کریں۔"
    },
    "a1-food-shopping": {
      outcomeUrdu: "خریداری کی فہرست اور قیمت پڑھنا، کیفے میں آرڈر دینا، کھانے کی ضرورت واضح کرنا، کپڑا چننا، چیز واپس کرنا، اور ادائیگی کا مسئلہ حل کرنا۔",
      practiceUrdu: "پہلے سپر مارکیٹ، مینو، کپڑے، رسید، اور ادائیگی کی مکمل باتیں سمجھیں، پھر دکان اور کیفے کی عملی صورتوں میں صرف سیکھی ہوئی زبان استعمال کریں۔"
    },
    "a1-going-out-transport": {
      outcomeUrdu: "بس یا ٹرین کا سفر سمجھنا، نقشے سے راستہ پوچھنا، پارسل لینا، لائبریری کی معلومات پڑھنا، اور عوامی جگہ کے حفاظتی نشان سمجھنا۔",
      practiceUrdu: "پہلے روانگی بورڈ، نقشہ، پارسل نوٹس، اوقات، اور حفاظتی نشان سمجھیں، پھر شہر کے ایک مسلسل سفر میں وہی سیکھی ہوئی زبان استعمال کریں۔"
    },
    "a1-body-health": {
      outcomeUrdu: "huisarts سے ملاقات لینا، اپنی علامت اور مدت واضح کرنا، اور دوا کے لیبل سے مقدار اور استعمال سمجھنا۔",
      practiceUrdu: "پہلے ملاقات، علامات، ڈاکٹر کے سوال، نسخے، اور دوا کی ہدایات سمجھیں، پھر ایک مسلسل صحت کی صورت میں صرف سیکھی ہوئی زبان استعمال کریں۔"
    },
    "a1-work-school-messages": {
      outcomeUrdu: "مختصر پیغام لکھنا، غیر حاضری یا دیر کی وجہ اور واپسی بتانا، اسکول ایپ کی اطلاع سمجھنا، اور کام کے بدلے ہوئے اوقات واضح کرنا۔",
      practiceUrdu: "پہلے پیغام کا آغاز، وجہ، وقت، مطلوبہ جواب، اسکول نوٹس، اور کام کا rooster سمجھیں، پھر ایک عملی دن میں وہی سیکھی ہوئی زبان استعمال کریں۔"
    }
  },
  lessons: {
    "a1-greetings-personal-info": {
      outcomeUrdu: "سلام کے بعد اپنا نام مکمل جملے میں بتانا اور بنیادی رابطے کی معلومات پہچاننا۔",
      seedConcepts: [
        ["hallo", "سلام"],
        ["goedemorgen", "صبح بخیر"],
        ["mijn naam is Zarar", "میرا نام ضرار ہے"],
        ["mijn naam is Ali", "میرا نام علی ہے"],
        ["dank u wel", "آپ کا شکریہ"],
        ["tot ziens", "خدا حافظ / پھر ملیں گے"],
        ["naam", "نام"],
        ["mijn", "میرا / میری"],
        ["adres", "پتہ"],
        ["telefoonnummer", "فون نمبر"],
        ["land", "ملک"]
      ],
      teaching: {
        "mijn naam is zarar": {
          usageUrdu: "پہلی ملاقات، استقبالی کاؤنٹر، یا رجسٹریشن میں اپنا نام بتانے کے لیے پورا جملہ “mijn naam is Zarar” کہیں۔",
          usageBoundaryUrdu: "یہ اپنے نام کا مکمل تعارف ہے؛ صرف “mijn naam” کہنا نام ہے والا ضروری فعل چھوڑ دیتا ہے۔",
          commonConfusionUrdu: "“mijn naam is Zarar” میں mijn نام سے پہلے اور is نام کے بعد رہتا ہے؛ “ik naam Zarar” درست تعارف نہیں۔",
          exampleDutch: "Mijn naam is Zarar.",
          exampleUrdu: "میرا نام ضرار ہے۔",
          pronunciationUrdu: "مَین نام اِس زَرار"
        }
      },
      pattern: {
        modelDutch: "mijn naam is Zarar",
        titleUrdu: "اپنا نام مکمل تعارف میں بتانا",
        highlight: "mijn naam is …",
        explanationUrdu: "اپنا نام بتاتے وقت پہلے mijn naam is کہیں اور آخر میں اپنا نام رکھیں: mijn naam is Zarar۔",
        contrastUrdu: "سوال hoe heet u? نام پوچھتا ہے؛ جواب mijn naam is … اپنے نام کی مکمل بات دیتا ہے۔",
        commonMistakeUrdu: "صرف mijn naam پر نہ رکیں اور ik naam نہ کہیں؛ مکمل نمونہ mijn naam is … استعمال کریں۔"
      },
      prerequisiteLessonIds: [
        "a0-greetings-courtesy",
        "a0-understanding-help",
        "a0-ik-jij-u",
        "a0-name-land-city",
        "a0-spelling-personal-details",
        "a0-address-phone"
      ],
      prerequisiteRefs: [
        ["a0-greetings-courtesy", "hallo"],
        ["a0-greetings-courtesy", "goedemorgen"],
        ["a0-greetings-courtesy", "dank u wel"],
        ["a0-greetings-courtesy", "tot ziens"],
        ["a0-understanding-help", "kunt u herhalen"],
        ["a0-ik-jij-u", "ik"],
        ["a0-name-land-city", "mijn naam is Ali"],
        ["a0-name-land-city", "land"],
        ["a0-spelling-personal-details", "hoe heet u?"],
        ["a0-address-phone", "adres"],
        ["a0-address-phone", "telefoonnummer"]
      ],
      scenarios: {
        hallo: ["intro-meeting-hallo", "کمیونٹی مرکز میں ایک نئے شخص سے پہلی بار ملتے ہیں۔ بات شروع کرنے کے لیے مناسب سلام کہیں۔"],
        goedemorgen: ["intro-morning-reception", "صبح استقبالی کاؤنٹر پر پہنچتے ہیں۔ وقت کے مطابق سلام کہیں۔"],
        "mijn naam is zarar": ["intro-give-name-zarar", "ملازم آپ سے نام پوچھتا ہے۔ اپنا نام ضرار مکمل جملے میں بتائیں۔"],
        "mijn naam is ali": ["intro-give-name-ali", "نئے پڑوسی کو اپنا نام علی بتانا ہے۔ مکمل تعارف چنیں۔"],
        "dank u wel": ["intro-thank-clerk", "ملازم نے آپ کی معلومات لکھ دی ہیں۔ ادب سے شکریہ کہیں۔"],
        "tot ziens": ["intro-leave-reception", "تعارف مکمل ہو گیا ہے اور آپ رخصت ہو رہے ہیں۔ مناسب بات کہیں۔"],
        naam: ["intro-recognise-name-field", "تعارف کارڈ پر نام والا خانہ ڈھونڈنا ہے۔ نام کے لیے درست ڈچ لفظ چنیں۔"],
        mijn: ["intro-own-detail", "اپنی معلومات بتاتے وقت میرا یا میری کہنا ہے۔ درست ڈچ لفظ چنیں۔"],
        adres: ["intro-recognise-address", "رابطہ کارڈ پر پتہ والا خانہ نشان زد کرنا ہے۔ درست ڈچ لفظ چنیں۔"],
        telefoonnummer: ["intro-recognise-phone", "رابطہ کارڈ پر فون نمبر والا خانہ ڈھونڈنا ہے۔ درست ڈچ لفظ چنیں۔"],
        land: ["intro-recognise-country", "تعارف میں اپنے ملک کی معلومات دینی ہیں۔ ملک کے لیے درست ڈچ لفظ چنیں۔"]
      }
    },
    "a1-details-forms": {
      outcomeUrdu: "ایک حقیقی ذاتی معلومات کا فارم پڑھنا اور نام، تاریخ پیدائش، پتہ، پوسٹ کوڈ، شہر، فون، اور ای میل صحیح خانے میں دینا۔",
      seedConcepts: [
        ["voornaam", "پہلا نام"],
        ["achternaam", "خاندانی نام"],
        ["mijn voornaam is Sara", "میرا پہلا نام Sara ہے"],
        ["mijn achternaam is Khan", "میرا خاندانی نام Khan ہے"],
        ["geboortedatum", "تاریخ پیدائش"],
        ["mijn geboortedatum is 12 mei", "میری تاریخ پیدائش 12 مئی ہے"],
        ["adres", "پتہ"],
        ["ik woon op Marktstraat 12", "میں Marktstraat 12 پر رہتا / رہتی ہوں"],
        ["postcode", "پوسٹ کوڈ"],
        ["mijn postcode is 1234 AB", "میرا پوسٹ کوڈ 1234 AB ہے"],
        ["woonplaats", "رہنے کا شہر"],
        ["mijn woonplaats is Utrecht", "میرا رہنے کا شہر Utrecht ہے"],
        ["telefoonnummer", "فون نمبر"],
        ["mijn telefoonnummer is nul zes", "میرا فون نمبر صفر چھ سے شروع ہوتا ہے"],
        ["e-mailadres", "ای میل پتہ"],
        ["ik heb geen e-mailadres", "میرے پاس ای میل پتہ نہیں ہے"]
      ],
      teaching: {
        geboortedatum: {
          usageUrdu: "فارم میں geboortedatum والے خانے میں وہ تاریخ لکھیں جس دن آپ پیدا ہوئے تھے۔",
          usageBoundaryUrdu: "geboortedatum پیدائش کی تاریخ ہے؛ آج کی datum یا ملاقات کی تاریخ اس خانے میں نہیں آتی۔",
          commonConfusionUrdu: "geboortedatum کو صرف عمر نہ سمجھیں؛ یہاں دن، مہینہ، اور سال والی پیدائش کی تاریخ درکار ہوتی ہے۔",
          exampleDutch: "geboortedatum: 12-05-1990",
          exampleUrdu: "تاریخ پیدائش: 12-05-1990۔",
          pronunciationUrdu: "خَ بور تَ دا تُم"
        },
        "mijn voornaam is sara": {
          usageUrdu: "ملازم پہلا نام پوچھے یا voornaam کا خانہ دکھائے تو “mijn voornaam is Sara” کہیں۔",
          usageBoundaryUrdu: "voornaam صرف پہلا نام ہے؛ خاندانی نام achternaam کے الگ خانے میں جاتا ہے۔",
          commonConfusionUrdu: "پہلے نام کے جواب میں achternaam نہ دیں؛ “mijn voornaam is Sara” میں voornaam ہی رکھیں۔",
          exampleDutch: "voornaam — mijn voornaam is Sara",
          exampleUrdu: "پہلا نام — میرا پہلا نام Sara ہے۔",
          pronunciationUrdu: "مَین فور نام اِس سا را"
        },
        "mijn achternaam is khan": {
          usageUrdu: "فارم کے achternaam خانے یا ملازم کے سوال پر اپنا خاندانی نام مکمل جملے میں بتائیں۔",
          usageBoundaryUrdu: "achternaam خاندانی نام ہے؛ اسے پہلے نام والے voornaam خانے میں نہ لکھیں۔",
          commonConfusionUrdu: "“mijn achternaam is Khan” خاندانی نام دیتا ہے؛ voornaam والے پہلے نام کے جواب سے اسے نہ ملائیں۔",
          exampleDutch: "mijn achternaam is Khan",
          exampleUrdu: "میرا خاندانی نام Khan ہے۔",
          pronunciationUrdu: "مَین آخ تَر نام اِس خان"
        },
        "mijn geboortedatum is 12 mei": {
          usageUrdu: "رجسٹریشن میں پیدائش کی تاریخ بول کر دینی ہو تو “mijn geboortedatum is 12 mei” کہیں۔",
          usageBoundaryUrdu: "یہ پیدائش کی تاریخ بتاتا ہے؛ ملاقات کی تاریخ یا آج کی تاریخ بتانے کے لیے نہیں۔",
          commonConfusionUrdu: "تاریخ سے پہلے mijn geboortedatum is پورا رکھیں؛ صرف 12 mei کہنے سے فارم کا مطلوبہ خانہ واضح نہیں ہوتا۔",
          exampleDutch: "geboortedatum — mijn geboortedatum is 12 mei",
          exampleUrdu: "تاریخ پیدائش — میری تاریخ پیدائش 12 مئی ہے۔",
          pronunciationUrdu: "مَین خَ بور تَ دا تُم اِس توا لف مَے"
        },
        "mijn postcode is 1234 ab": {
          usageUrdu: "پتے کی تصدیق میں پوسٹ کوڈ مانگا جائے تو حروف سمیت “mijn postcode is 1234 AB” کہیں۔",
          usageBoundaryUrdu: "postcode صرف علاقے کا عدد اور حرف والا کوڈ ہے؛ سڑک اور گھر نمبر پورا adres ہوتے ہیں۔",
          commonConfusionUrdu: "1234 کے بعد AB چھوڑنے سے پوسٹ کوڈ نامکمل رہتا ہے؛ عدد اور حروف دونوں دیں۔",
          exampleDutch: "postcode — mijn postcode is 1234 AB",
          exampleUrdu: "پوسٹ کوڈ — میرا پوسٹ کوڈ 1234 AB ہے۔",
          pronunciationUrdu: "مَین پوسٹ کو دا اِس ٹوالف دَر تیخ فیر آ بے"
        },
        "mijn woonplaats is utrecht": {
          usageUrdu: "فارم میں woonplaats مانگی جائے تو جس شہر میں رہتے ہیں وہ “mijn woonplaats is Utrecht” سے بتائیں۔",
          usageBoundaryUrdu: "woonplaats رہنے کا شہر ہے؛ land ملک اور adres مکمل گلی اور گھر نمبر ہے۔",
          commonConfusionUrdu: "woonplaats کے خانے میں ملک نہ لکھیں؛ یہاں Utrecht جیسے رہنے کے شہر کا نام درکار ہے۔",
          exampleDutch: "woonplaats — mijn woonplaats is Utrecht",
          exampleUrdu: "رہنے کا شہر — میرا رہنے کا شہر Utrecht ہے۔",
          pronunciationUrdu: "مَین وون پلاتس اِس یو ترَخت"
        },
        "mijn telefoonnummer is nul zes": {
          usageUrdu: "رابطے کے لیے فون نمبر مانگا جائے تو آغاز واضح کرکے “mijn telefoonnummer is nul zes” کہیں۔",
          usageBoundaryUrdu: "telefoonnummer فون کے لیے ہے؛ postcode یا huisnummer اس کا جواب نہیں۔",
          commonConfusionUrdu: "فون نمبر میں nul کو zes نہ سمجھیں؛ صفر چھ کی ترتیب “nul zes” صاف اور آہستہ کہیں۔",
          exampleDutch: "telefoonnummer — mijn telefoonnummer is nul zes",
          exampleUrdu: "فون نمبر — میرا فون نمبر صفر چھ سے شروع ہوتا ہے۔",
          pronunciationUrdu: "مَین تے لے فون نُمَر اِس نُل زَس"
        },
        "ik heb geen e-mailadres": {
          usageUrdu: "اگر آپ کے پاس ای میل نہیں ہے تو فارم کے ملازم کو صاف کہیں: “ik heb geen e-mailadres”۔",
          usageBoundaryUrdu: "یہ ای میل نہ ہونے کی بات ہے؛ فون نمبر یا ڈاک کا پتہ نہ ہونے کا جواب نہیں۔",
          commonConfusionUrdu: "اسم e-mailadres کی نفی میں geen آتا ہے؛ “ik heb niet e-mailadres” نہ کہیں۔",
          exampleDutch: "e-mailadres — ik heb geen e-mailadres",
          exampleUrdu: "ای میل پتہ — میرے پاس ای میل پتہ نہیں ہے۔",
          pronunciationUrdu: "اِک ہَپ خین اے میل آد رَس"
        }
      },
      pattern: {
        modelDutch: "mijn voornaam is Sara",
        titleUrdu: "فارم کا خانہ مکمل جملے میں بتانا",
        highlight: "mijn … is …",
        explanationUrdu: "mijn کے بعد مطلوبہ خانے کا لفظ رکھیں، پھر is اور اپنی معلومات کہیں: mijn voornaam is Sara۔",
        contrastUrdu: "voornaam پہلا نام ہے اور achternaam خاندانی نام؛ جملے کا ڈھانچا ایک رہتا ہے مگر خانے کا لفظ بدلتا ہے۔",
        commonMistakeUrdu: "خانے کا لفظ چھوڑ کر صرف mijn is Sara نہ کہیں؛ mijn + خانہ + is + معلومات پورا رکھیں۔"
      },
      prerequisiteLessonIds: [
        "a0-name-land-city",
        "a0-spelling-personal-details",
        "a0-address-phone",
        "a0-numbers-0-10",
        "a0-ja-nee-goed-niet"
      ],
      prerequisiteRefs: [
        ["a0-name-land-city", "naam"],
        ["a0-spelling-personal-details", "voornaam"],
        ["a0-spelling-personal-details", "achternaam"],
        ["a0-address-phone", "adres"],
        ["a0-address-phone", "postcode"],
        ["a0-address-phone", "woonplaats"],
        ["a0-address-phone", "telefoonnummer"],
        ["a0-address-phone", "e-mailadres"],
        ["a0-address-phone", "ik woon op Marktstraat 12"],
        ["a0-numbers-0-10", "nul"],
        ["a0-ja-nee-goed-niet", "niet"]
      ],
      scenarios: {
        voornaam: ["details-find-first-name", "کمیونٹی مرکز کے فارم میں پہلا نام والا خانہ ڈھونڈنا ہے۔ درست ڈچ لفظ چنیں۔"],
        achternaam: ["details-find-family-name", "فارم میں خاندانی نام والا خانہ نشان زد کرنا ہے۔ درست ڈچ لفظ چنیں۔"],
        "mijn voornaam is sara": ["details-give-first-name", "ملازم voornaam پوچھتا ہے۔ اپنا پہلا نام Sara مکمل جملے میں بتائیں۔"],
        "mijn achternaam is khan": ["details-give-family-name", "ملازم achternaam پوچھتا ہے۔ اپنا خاندانی نام Khan مکمل جملے میں بتائیں۔"],
        geboortedatum: ["details-find-birth-date", "رجسٹریشن فارم میں پیدائش کی تاریخ والا خانہ ڈھونڈنا ہے۔ درست ڈچ لفظ چنیں۔"],
        "mijn geboortedatum is 12 mei": ["details-give-birth-date", "ملازم پیدائش کی تاریخ پوچھتا ہے۔ 12 مئی مکمل جملے میں بتائیں۔"],
        adres: ["details-find-address", "فارم میں سڑک اور گھر نمبر والی مکمل معلومات کا خانہ ڈھونڈنا ہے۔ درست لفظ چنیں۔"],
        "ik woon op marktstraat 12": ["details-give-address", "ملازم پوچھتا ہے کہ آپ کہاں رہتے ہیں۔ Marktstraat 12 کا مکمل جواب دیں۔"],
        postcode: ["details-find-postcode", "پتے کے حصے میں عدد اور حروف والا پوسٹ کوڈ خانہ ڈھونڈنا ہے۔ درست لفظ چنیں۔"],
        "mijn postcode is 1234 ab": ["details-give-postcode", "ملازم پوسٹ کوڈ پوچھتا ہے۔ 1234 AB حروف سمیت مکمل جواب دیں۔"],
        woonplaats: ["details-find-city", "فارم میں رہنے کے شہر والا خانہ ڈھونڈنا ہے۔ درست ڈچ لفظ چنیں۔"],
        "mijn woonplaats is utrecht": ["details-give-city", "ملازم رہنے کا شہر پوچھتا ہے۔ Utrecht مکمل جملے میں بتائیں۔"],
        telefoonnummer: ["details-find-phone", "رابطے کے حصے میں فون نمبر والا خانہ ڈھونڈنا ہے۔ درست ڈچ لفظ چنیں۔"],
        "mijn telefoonnummer is nul zes": ["details-give-phone", "ملازم رابطے کا فون نمبر پوچھتا ہے۔ صفر چھ سے شروع ہونے والا جواب صاف کہیں۔"],
        "e-mailadres": ["details-find-email", "رابطہ فارم میں ای میل پتہ والا خانہ ڈھونڈنا ہے۔ درست لفظ چنیں۔"],
        "ik heb geen e-mailadres": ["details-no-email", "ملازم ای میل پتہ پوچھتا ہے مگر آپ کے پاس ای میل نہیں۔ مکمل جواب دیں۔"]
      },
      document: {
        stableId: "details-form-read-fields",
        targetDutch: "telefoonnummer",
        title: "Telefoonnummer",
        rows: [
          { label: "Telefoonnummer", value: "06 12345678" },
          { label: "E-mailadres", value: "-" },
          { label: "Postcode", value: "1234 AB" }
        ]
      }
    },
    "a1-people-family-articles": {
      title: "Familie herkennen: de, het en mijn",
      unitLabel: "A1: خاندان اور لوگ",
      outcomeUrdu: "خاندان کی تصویر میں والد، والدہ، بھائی، بہن، اور بچے کو درست de یا het کے ساتھ پہچاننا اور dit is mijn … سے تعارف کرانا۔",
      seedConcepts: [
        ["de vader", "والد / باپ"],
        ["de moeder", "والدہ / ماں"],
        ["dit is mijn vader", "یہ میرے والد ہیں"],
        ["het kind", "بچہ"],
        ["de broer", "بھائی"],
        ["de zus", "بہن"]
      ],
      teaching: {
        "de vader": {
          usageUrdu: "خاندان کی تصویر، فارم، یا گفتگو میں والد کا ذکر ہو تو اسم کو اس کے چھوٹے لفظ کے ساتھ “de vader” کی صورت میں پہچانیں۔",
          usageBoundaryUrdu: "de vader معلوم یا زیرِ گفتگو والد کو نام دیتا ہے؛ کسی ایک غیر متعین والد کے لیے een vader آ سکتا ہے۔",
          commonConfusionUrdu: "vader کے ساتھ de یاد رکھیں؛ اسے het vader نہ کہیں۔",
          exampleDutch: "Dit is mijn vader.",
          exampleUrdu: "یہ میرے والد ہیں۔",
          pronunciationUrdu: "دَ فا دَر"
        },
        "de moeder": {
          usageUrdu: "والدہ کو تصویر یا خاندان کی معلومات میں پہچانتے وقت مکمل لفظی جوڑی “de moeder” دیکھیں اور سنیں۔",
          usageBoundaryUrdu: "de moeder والدہ کا نام ہے؛ اپنی والدہ کہتے وقت چھوٹا لفظ ہٹ جاتا ہے اور mijn moeder آتا ہے۔",
          commonConfusionUrdu: "de moeder درست ہے، لیکن mijn کے ساتھ de نہ ملائیں: de mijn moeder غلط ہے۔",
          exampleDutch: "De moeder.",
          exampleUrdu: "والدہ۔",
          pronunciationUrdu: "دَ مو دَر"
        },
        "dit is mijn vader": {
          usageUrdu: "کسی کو خاندان کی تصویر دکھاتے ہوئے اپنے والد کا تعارف مکمل جملے “dit is mijn vader” سے کرائیں۔",
          usageBoundaryUrdu: "یہ اپنے والد کا تعارف ہے؛ صرف de vader رشتہ نام کرتا ہے مگر یہ مکمل تعارف نہیں۔",
          commonConfusionUrdu: "mijn سے پہلے de نہ لگائیں اور is نہ چھوڑیں؛ درست ترتیب dit is mijn vader ہے۔",
          exampleDutch: "Dit is mijn vader, Ahmed.",
          exampleUrdu: "یہ میرے والد احمد ہیں۔",
          pronunciationUrdu: "دِت اِس مَین فا دَر"
        },
        "het kind": {
          usageUrdu: "بچے کا ذکر کسی فہرست، تصویر، یا اطلاع میں ہو تو kind کو اس کے مقرر چھوٹے لفظ کے ساتھ “het kind” یاد کریں۔",
          usageBoundaryUrdu: "het kind ایک بچے کے لیے ہے؛ جمع بچوں کے ساتھ دوسرا چھوٹا لفظ آتا ہے۔",
          commonConfusionUrdu: "kind ان عام الفاظ میں ہے جن کے ساتھ het آتا ہے؛ de kind نہ کہیں۔",
          exampleDutch: "Het kind.",
          exampleUrdu: "بچہ۔",
          pronunciationUrdu: "ہَت کِنٹ"
        },
        "de broer": {
          usageUrdu: "بھائی کا رشتہ پہچاننے یا خاندان کی فہرست پڑھنے میں “de broer” استعمال ہوتا ہے۔",
          usageBoundaryUrdu: "de broer بھائی ہے؛ zus بہن کے لیے الگ لفظ ہے۔",
          commonConfusionUrdu: "broer کے ساتھ de آتا ہے؛ اسے het broer نہ کہیں۔",
          exampleDutch: "De broer.",
          exampleUrdu: "بھائی۔",
          pronunciationUrdu: "دَ برور"
        },
        "de zus": {
          usageUrdu: "خاندان کی معلومات میں بہن کو چھوٹے لفظ سمیت “de zus” کی صورت میں پہچانیں۔",
          usageBoundaryUrdu: "de zus بہن ہے؛ broer بھائی کے لیے ہے۔",
          commonConfusionUrdu: "zus کے ساتھ de یاد رکھیں؛ het zus درست نہیں۔",
          exampleDutch: "De zus.",
          exampleUrdu: "بہن۔",
          pronunciationUrdu: "دَ زُس"
        }
      },
      pattern: {
        modelDutch: "dit is mijn vader",
        titleUrdu: "خاندان کے فرد کا تعارف کرانا",
        highlight: "dit is mijn …",
        explanationUrdu: "تصویر میں اپنے خاندان کے فرد کا تعارف دیتے وقت dit is mijn کے بعد رشتہ رکھیں: dit is mijn vader۔",
        contrastUrdu: "een vader کسی ایک والد، de vader معلوم والد، اور mijn vader اپنے والد کو بتاتا ہے؛ mijn کے ساتھ de یا het نہیں آتا۔",
        commonMistakeUrdu: "dit mijn vader یا dit is de mijn vader نہ کہیں؛ مکمل ترتیب dit is mijn vader رکھیں۔"
      },
      independentCheckLeadUrdu: "خاندان کی پہلی مدد والی تصویر کے بعد دوسری تصویر میں",
      prerequisiteLessonIds: [
        "a0-people-nouns",
        "a0-een-de-het",
        "a0-dit-dat-questions",
        "a0-possessive"
      ],
      prerequisiteRefs: [
        ["a0-people-nouns", "vader"],
        ["a0-people-nouns", "moeder"],
        ["a0-people-nouns", "broer"],
        ["a0-people-nouns", "zus"],
        ["a0-people-nouns", "kind"],
        ["a0-een-de-het", "de man"],
        ["a0-een-de-het", "het boek"],
        ["a0-dit-dat-questions", "dit"],
        ["a0-possessive", "mijn"]
      ],
      scenarios: {
        "de vader": ["family-photo-father-label", "خاندان کی تصویری فہرست میں والد کے لیے چھوٹے لفظ سمیت درست ڈچ نام منتخب کریں۔"],
        "de moeder": ["family-photo-mother-label", "خاندان کی تصویری فہرست میں والدہ کے لیے چھوٹے لفظ سمیت درست ڈچ نام منتخب کریں۔"],
        "dit is mijn vader": ["family-introduce-father", "ایک نئے پڑوسی کو تصویر دکھا کر اپنے والد کا مکمل تعارف کرائیں۔"],
        "het kind": ["family-form-child-label", "خاندان کے فارم میں ایک بچے والے خانے کے لیے درست چھوٹا لفظ اور اسم منتخب کریں۔"],
        "de broer": ["family-list-brother-label", "خاندان کی فہرست میں بھائی کے رشتے کو چھوٹے لفظ سمیت نشان زد کریں۔"],
        "de zus": ["family-list-sister-label", "خاندان کی فہرست میں بہن کے رشتے کو چھوٹے لفظ سمیت نشان زد کریں۔"]
      }
    },
    "a1-hebben-family": {
      title: "Vertellen over mijn gezin",
      unitLabel: "A1: خاندان اور لوگ",
      outcomeUrdu: "heeft u kinderen? سمجھنا اور مکمل جملے میں بتانا کہ بچے یا بہن بھائی ہیں، کتنے ہیں، یا نہیں ہیں۔",
      seedConcepts: [
        ["zoon", "بیٹا"],
        ["dochter", "بیٹی"],
        ["kinderen", "بچے"],
        ["ik heb twee kinderen", "میرے دو بچے ہیں"],
        ["heeft u kinderen?", "کیا آپ کے بچے ہیں؟"],
        ["ouders", "والدین"],
        ["geen", "کوئی نہیں / کوئی … نہیں"],
        ["ik heb geen kinderen", "میرے بچے نہیں ہیں"],
        ["ik heb een broer", "میرا ایک بھائی ہے"]
      ],
      teaching: {
        zoon: {
          usageUrdu: "اپنے یا کسی دوسرے شخص کے بیٹے کا رشتہ بتانے کے لیے zoon استعمال کریں۔",
          usageBoundaryUrdu: "zoon بیٹا ہے؛ dochter بیٹی کے لیے الگ لفظ ہے۔",
          commonConfusionUrdu: "اس لفظ کی درمیانی آواز لمبی ہے؛ اسے مختصر آواز کے ساتھ نہ پڑھیں۔",
          exampleDutch: "Heeft u een zoon?",
          exampleUrdu: "کیا آپ کا ایک بیٹا ہے؟",
          pronunciationUrdu: "زون"
        },
        dochter: {
          usageUrdu: "خاندان کی گفتگو یا فارم میں بیٹی کے لیے dochter کہیں۔",
          usageBoundaryUrdu: "dochter بیٹی ہے؛ zus بہن اور zoon بیٹا ہیں۔",
          commonConfusionUrdu: "اس لفظ کا مطلب بیٹی ہے؛ اسے بہن یا بیٹے کے رشتے سے نہ ملائیں۔",
          exampleDutch: "Heeft u een dochter?",
          exampleUrdu: "کیا آپ کی ایک بیٹی ہے؟",
          pronunciationUrdu: "دوخ تَر"
        },
        kinderen: {
          usageUrdu: "ایک سے زیادہ بچوں کی عمومی بات میں جمع لفظ kinderen استعمال ہوتا ہے۔",
          usageBoundaryUrdu: "kind ایک بچہ ہے اور kinderen کئی بچے ہیں۔",
          commonConfusionUrdu: "جمع بناتے وقت اپنی طرف سے آخر نہ بدلیں؛ درست مکمل جمع kinderen یاد رکھیں۔",
          exampleDutch: "Heeft u kinderen?",
          exampleUrdu: "کیا آپ کے بچے ہیں؟",
          pronunciationUrdu: "کِن دَرَن"
        },
        "ik heb twee kinderen": {
          usageUrdu: "رجسٹریشن یا تعارف میں بچوں کی تعداد پوچھے جانے پر “ik heb twee kinderen” سے مکمل جواب دیں۔",
          usageBoundaryUrdu: "یہ دو بچوں کی موجودگی بتاتا ہے؛ بچے نہ ہوں تو ik heb geen kinderen کہیں۔",
          commonConfusionUrdu: "اپنے خاندان کے بارے میں بتاتے وقت heb والا مکمل نمونہ رکھیں؛ ہونا والا نمونہ اس معنی کے لیے درست نہیں۔",
          exampleDutch: "Ik heb twee kinderen.",
          exampleUrdu: "میرے دو بچے ہیں۔",
          pronunciationUrdu: "اِک ہَپ توے کِن دَرَن"
        },
        "heeft u kinderen": {
          usageUrdu: "فارم یا بچوں کی نگہداشت کی گفتگو میں “heeft u kinderen?” سنیں تو سمجھیں کہ آپ سے بچوں کے بارے میں پوچھا جا رہا ہے۔",
          usageBoundaryUrdu: "یہ رسمی u والا سوال ہے؛ دوست سے غیر رسمی بات میں heb je kinderen? آ سکتا ہے۔",
          commonConfusionUrdu: "سوال میں heeft پہلے اور u بعد میں آتا ہے؛ u heeft kinderen? بیان ہے، یہی سوالی ترتیب نہیں۔",
          exampleDutch: "Heeft u kinderen?",
          exampleUrdu: "کیا آپ کے بچے ہیں؟",
          pronunciationUrdu: "ہیفٹ او کِن دَرَن"
        },
        ouders: {
          usageUrdu: "والد اور والدہ دونوں یا کسی بچے کے والدین کی مشترک بات میں جمع لفظ ouders آتا ہے۔",
          usageBoundaryUrdu: "ouder ایک والد یا والدہ ہے؛ ouders جمع والدین ہیں۔",
          commonConfusionUrdu: "ouders کو صرف والد نہ سمجھیں؛ یہ دونوں والدین کے لیے جمع ہے۔",
          exampleDutch: "mijn ouders",
          exampleUrdu: "میرے والدین۔",
          pronunciationUrdu: "آو دَرس"
        },
        geen: {
          usageUrdu: "جب کوئی شخص یا چیز موجود نہ ہو تو اسم سے پہلے geen رکھیں، جیسے geen kinderen۔",
          usageBoundaryUrdu: "geen اسم یا مقدار کی نفی کرتا ہے؛ کیفیت یا پوری بات کی نفی میں niet آتا ہے۔",
          commonConfusionUrdu: "ik heb niet kinderen نہ کہیں؛ kinderen جیسے اسم سے پہلے geen رکھیں۔",
          exampleDutch: "geen kinderen",
          exampleUrdu: "کوئی بچے نہیں۔",
          pronunciationUrdu: "خین"
        },
        "ik heb geen kinderen": {
          usageUrdu: "بچوں کے سوال کا منفی مگر صاف جواب دینے کے لیے “ik heb geen kinderen” کہیں۔",
          usageBoundaryUrdu: "یہ بچوں کے نہ ہونے کی بات ہے؛ niet goed کسی کیفیت کے اچھا نہ ہونے کی بات ہے۔",
          commonConfusionUrdu: "اسم kinderen سے پہلے geen آتا ہے؛ ik heb niet kinderen درست نہیں۔",
          exampleDutch: "Ik heb geen kinderen.",
          exampleUrdu: "میرے بچے نہیں ہیں۔",
          pronunciationUrdu: "اِک ہَپ خین کِن دَرَن"
        },
        "ik heb een broer": {
          usageUrdu: "اپنے بہن بھائی بتاتے وقت ایک بھائی کے لیے مکمل جملہ “ik heb een broer” کہیں۔",
          usageBoundaryUrdu: "یہ اپنے خاندان میں بھائی موجود ہونے کی بات ہے؛ اپنی ذاتی شناخت بتانا ایک مختلف معنی ہے۔",
          commonConfusionUrdu: "رشتہ موجود ہونے کے معنی میں ik heb een broer کا مکمل نمونہ رکھیں۔",
          exampleDutch: "Ik heb een broer.",
          exampleUrdu: "میرا ایک بھائی ہے۔",
          pronunciationUrdu: "اِک ہَپ اَن برور"
        }
      },
      pattern: {
        modelDutch: "ik heb twee kinderen",
        titleUrdu: "اپنے خاندان کے بارے میں مکمل جواب دینا",
        highlight: "ik heb …",
        explanationUrdu: "اپنے پاس موجود رشتہ یا تعداد بتانے کے لیے ik heb کے بعد معلومات رکھیں: ik heb twee kinderen۔",
        contrastUrdu: "اسم یا مقدار نہ ہو تو geen کہیں: ik heb geen kinderen؛ کیفیت کی نفی میں niet آتا ہے، جیسے het is niet goed۔",
        commonMistakeUrdu: "ik ben twee kinderen یا ik heb niet kinderen نہ کہیں؛ مثبت میں ik heb … اور اسم کی نفی میں ik heb geen … رکھیں۔"
      },
      independentCheckLeadUrdu: "خاندان کے پہلے مدد والے سوال کے بعد نئی رجسٹریشن میں",
      prerequisiteLessonIds: [
        "a0-ik-jij-u",
        "a0-numbers-0-10",
        "a0-een-de-het",
        "a0-geen",
        "a0-ja-nee-goed-niet",
        "a0-people-nouns",
        "a1-people-family-articles"
      ],
      prerequisiteRefs: [
        ["a0-ik-jij-u", "ik"],
        ["a0-ik-jij-u", "u"],
        ["a0-een-de-het", "een"],
        ["a0-numbers-0-10", "twee"],
        ["a0-geen", "ik heb geen boek"],
        ["a0-ja-nee-goed-niet", "niet"],
        ["a0-people-nouns", "broer"],
        ["a1-people-family-articles", "dit is mijn vader"]
      ],
      scenarios: {
        zoon: ["family-intake-son", "خاندان کے فارم میں بیٹے کا رشتہ درج کرنا ہے۔ درست ڈچ لفظ منتخب کریں۔"],
        dochter: ["family-intake-daughter", "بچوں کی نگہداشت کے تعارف میں اپنی بیٹی کا رشتہ بتانا ہے۔ درست ڈچ لفظ منتخب کریں۔"],
        kinderen: ["family-intake-children", "رجسٹریشن فارم میں ایک سے زیادہ بچوں کے لیے درست جمع لفظ منتخب کریں۔"],
        "ik heb twee kinderen": ["family-answer-two-children", "ملازم بچوں کی تعداد پوچھتا ہے۔ اپنے دو بچوں کا مکمل جواب دیں۔"],
        "heeft u kinderen": ["family-understand-children-question", "آپ بچوں کی نگہداشت کے مرکز میں نئے والد یا والدہ سے رسمی طور پر پوچھتے ہیں کہ کیا ان کے بچے ہیں۔ مکمل سوال منتخب کریں۔"],
        ouders: ["family-school-parents", "اسکول کی اطلاع میں بچے کے والدین کے لیے درست جمع لفظ پہچانیں۔"],
        geen: ["family-no-children-word", "فارم میں بچے نہ ہونے کی بات اسم سے پہلے ایک ڈچ نفی لفظ سے کرنی ہے۔ درست لفظ منتخب کریں۔"],
        "ik heb geen kinderen": ["family-answer-no-children", "ملازم پوچھتا ہے کہ کیا آپ کے بچے ہیں، مگر آپ کے بچے نہیں ہیں۔ مکمل جواب دیں۔"],
        "ik heb een broer": ["family-answer-one-brother", "ایک نئے ہم جماعت کو بتانا ہے کہ آپ کا ایک بھائی ہے۔ مکمل جملہ منتخب کریں۔"]
      }
    },
    "a1-family-routine-extra": {
      title: "Mijn familie kort beschrijven",
      unitLabel: "A1: خاندان اور لوگ",
      outcomeUrdu: "خاندان کے ایک فرد کی عمر، اسکول، اور رہنے کی جگہ تین مختصر مکمل جملوں میں بتانا۔",
      seedConcepts: [
        ["leeftijd", "عمر"],
        ["mijn dochter is vijf jaar", "میری بیٹی پانچ سال کی ہے"],
        ["mijn zoon gaat naar school", "میرا بیٹا اسکول جاتا ہے"],
        ["mijn familie woont in Nederland", "میرا خاندان نیدرلینڈز میں رہتا ہے"]
      ],
      teaching: {
        leeftijd: {
          usageUrdu: "فارم یا خاندان کی گفتگو میں کسی کی عمر پوچھی یا لکھی جائے تو label leeftijd پہچانیں۔",
          usageBoundaryUrdu: "leeftijd عمر ہے؛ geboortedatum پیدائش کی مکمل تاریخ ہے۔",
          commonConfusionUrdu: "leeftijd کے خانے میں تاریخ پیدائش نہ لکھیں؛ یہاں عمر مثلاً vijf jaar مطلوب ہوتی ہے۔",
          exampleDutch: "Leeftijd: vijf jaar.",
          exampleUrdu: "عمر: پانچ سال۔",
          pronunciationUrdu: "لَےف ٹَیٹ"
        },
        "mijn dochter is vijf jaar": {
          usageUrdu: "اپنی بیٹی کی عمر بتانے کے لیے مکمل جملہ “mijn dochter is vijf jaar” کہیں۔",
          usageBoundaryUrdu: "یہ بیٹی کی عمر ہے؛ اپنی عمر بتانے کے لیے ik ben … jaar آتا ہے۔",
          commonConfusionUrdu: "عمر بتاتے وقت فعل نہ چھوڑیں؛ مکمل حصہ is vijf jaar ایک ساتھ رکھیں۔",
          exampleDutch: "Mijn dochter is vijf jaar.",
          exampleUrdu: "میری بیٹی پانچ سال کی ہے۔",
          pronunciationUrdu: "مَین دوخ تَر اِس فَیف یار"
        },
        "mijn zoon gaat naar school": {
          usageUrdu: "اپنے بیٹے کے اسکول جانے کی بنیادی معلومات دیتے وقت “mijn zoon gaat naar school” کہیں۔",
          usageBoundaryUrdu: "یہ اسکول جانے کی بات ہے؛ صرف mijn zoon کہنا رشتہ بتاتا ہے مگر عمل نہیں۔",
          commonConfusionUrdu: "zoon کے ساتھ مکمل حصہ gaat naar school رکھیں؛ فعل کو ادھورا نہ کریں۔",
          exampleDutch: "Mijn zoon gaat naar school.",
          exampleUrdu: "میرا بیٹا اسکول جاتا ہے۔",
          pronunciationUrdu: "مَین زون خات نار سخُول"
        },
        "mijn familie woont in nederland": {
          usageUrdu: "اپنے خاندان کے رہنے کا ملک بتانے کے لیے “mijn familie woont in Nederland” استعمال کریں۔",
          usageBoundaryUrdu: "یہ پورے خاندان کی رہائش بتاتا ہے؛ اپنی رہائش کے لیے ik woon in Nederland کہیں۔",
          commonConfusionUrdu: "familie یہاں ایک گروہ کی طرح آتا ہے، اس لیے مکمل حصہ woont in Nederland یاد رکھیں۔",
          exampleDutch: "Mijn familie woont in Nederland.",
          exampleUrdu: "میرا خاندان نیدرلینڈز میں رہتا ہے۔",
          pronunciationUrdu: "مَین فا می لی وونت اِن نے دَر لانت"
        }
      },
      pattern: {
        modelDutch: "mijn dochter is vijf jaar",
        titleUrdu: "خاندان کے فرد کی عمر بتانا",
        highlight: "mijn … is … jaar",
        explanationUrdu: "رشتہ دار کی عمر بتاتے وقت mijn کے بعد رشتہ، پھر is، عدد، اور jaar رکھیں: mijn dochter is vijf jaar۔",
        contrastUrdu: "اپنی عمر ik ben achttien jaar سے بتائیں؛ خاندان کے فرد کے لیے mijn dochter is vijf jaar جیسا جملہ آتا ہے۔",
        commonMistakeUrdu: "is یا jaar نہ چھوڑیں اور عمر کے لیے heeft نہ لگائیں؛ مکمل نمونہ mijn … is … jaar رکھیں۔"
      },
      independentCheckLeadUrdu: "پہلی خاندانی گفتگو کے بعد دوسرے شخص کو خاندان بتاتے وقت",
      prerequisiteLessonIds: [
        "a0-numbers-0-10",
        "a0-numbers-11-100",
        "a0-naar-met",
        "a0-name-land-city",
        "a0-possessive",
        "a0-people-nouns",
        "a1-hebben-family"
      ],
      prerequisiteRefs: [
        ["a0-numbers-0-10", "vijf"],
        ["a0-numbers-11-100", "ik ben achttien jaar"],
        ["a0-naar-met", "zij gaat naar school"],
        ["a0-name-land-city", "ik woon in Nederland"],
        ["a0-possessive", "mijn"],
        ["a0-people-nouns", "familie"],
        ["a1-hebben-family", "zoon"],
        ["a1-hebben-family", "dochter"]
      ],
      scenarios: {
        leeftijd: ["family-profile-age-label", "خاندان کے مختصر پروفائل میں عمر والا خانہ ڈھونڈنا ہے۔ درست ڈچ label منتخب کریں۔"],
        "mijn dochter is vijf jaar": ["family-describe-daughter-age", "بچوں کی نگہداشت کے تعارف میں اپنی بیٹی کی عمر پانچ سال مکمل جملے میں بتائیں۔"],
        "mijn zoon gaat naar school": ["family-describe-son-school", "نئے پڑوسی کو بتانا ہے کہ آپ کا بیٹا اسکول جاتا ہے۔ مکمل جملہ منتخب کریں۔"],
        "mijn familie woont in nederland": ["family-describe-country", "کمیونٹی مرکز کی گفتگو میں بتانا ہے کہ آپ کا خاندان نیدرلینڈز میں رہتا ہے۔ مکمل جملہ منتخب کریں۔"]
      }
    },
    "a1-child-care": {
      title: "Brengen en ophalen bij de kinderopvang",
      unitLabel: "A1: خاندان اور لوگ",
      outcomeUrdu: "kinderopvang میں بچے کو چھوڑتے یا لیتے وقت وقت، ساتھ کا کھانا، پانی کی ضرورت، اور بچے کی تھکن واضح کرنا۔",
      seedConcepts: [
        ["de kinderopvang", "بچوں کی نگہداشت کا مرکز"],
        ["ik breng mijn kind om acht uur naar de kinderopvang", "میں اپنے بچے کو آٹھ بجے بچوں کی نگہداشت کے مرکز چھوڑتا / چھوڑتی ہوں"],
        ["ik haal mijn kind om vijf uur op", "میں اپنے بچے کو پانچ بجے لینے آتا / آتی ہوں"],
        ["eten mee", "کھانا ساتھ"],
        ["mijn kind heeft eten mee", "میرا بچہ کھانا ساتھ لایا ہے"],
        ["mijn kind heeft water nodig", "میرے بچے کو پانی چاہیے"],
        ["moe", "تھکا ہوا / تھکی ہوئی"],
        ["mijn kind is moe", "میرا بچہ تھکا ہوا ہے"]
      ],
      teaching: {
        "de kinderopvang": {
          usageUrdu: "اس جگہ کے لیے جہاں دن کے حصے میں بچوں کی دیکھ بھال ہوتی ہے، مکمل نام “de kinderopvang” استعمال کریں۔",
          usageBoundaryUrdu: "kinderopvang بچوں کی نگہداشت ہے؛ school باقاعدہ اسکول اور opvang اکیلا زیادہ وسیع معنی رکھ سکتا ہے۔",
          commonConfusionUrdu: "اس عملی سبق میں جگہ کا پورا نام de kinderopvang یاد رکھیں؛ اسے school کے خانے میں نہ ملائیں۔",
          exampleDutch: "De kinderopvang.",
          exampleUrdu: "بچوں کی نگہداشت کا مرکز۔",
          pronunciationUrdu: "دَ کِن دَر اوپ فانگ"
        },
        "ik breng mijn kind om acht uur naar de kinderopvang": {
          usageUrdu: "صبح بچے کو چھوڑنے کا وقت بتاتے ہوئے کہیں: “ik breng mijn kind om acht uur naar de kinderopvang”۔",
          usageBoundaryUrdu: "brengen بچے کو وہاں چھوڑنے یا لے جانے کی طرف ہے؛ ophalen بچے کو واپس لینے کے لیے ہے۔",
          commonConfusionUrdu: "چھوڑنے کے وقت haal … op نہ کہیں؛ breng کے ساتھ منزل naar de kinderopvang رکھیں۔",
          exampleDutch: "Ik breng mijn kind om acht uur naar de kinderopvang.",
          exampleUrdu: "میں اپنے بچے کو آٹھ بجے بچوں کی نگہداشت کے مرکز چھوڑتا یا چھوڑتی ہوں۔",
          pronunciationUrdu: "اِک برَینگ مَین کِنٹ اوم آخت اور نار دَ کِن دَر اوپ فانگ"
        },
        "ik haal mijn kind om vijf uur op": {
          usageUrdu: "شام بچے کو لینے کا وقت بتاتے ہوئے مکمل جملہ “ik haal mijn kind om vijf uur op” کہیں۔",
          usageBoundaryUrdu: "ophalen واپس لینے کے لیے ہے؛ صبح چھوڑنے کے لیے brengen استعمال ہوتا ہے۔",
          commonConfusionUrdu: "اس جملے میں haal کے ساتھ op آخر میں جاتا ہے؛ ik ophalen mijn kind نہ کہیں۔",
          exampleDutch: "Ik haal mijn kind om vijf uur op.",
          exampleUrdu: "میں اپنے بچے کو پانچ بجے لینے آتا یا آتی ہوں۔",
          pronunciationUrdu: "اِک ہال مَین کِنٹ اوم فَیف اور اوپ"
        },
        "eten mee": {
          usageUrdu: "kinderopvang کی فہرست یا حوالگی نوٹ میں eten mee کا مطلب ہے کہ بچے کے پاس کھانا ساتھ ہے۔",
          usageBoundaryUrdu: "eten mee ساتھ لایا ہوا کھانا ہے؛ مرکز میں ملنے والے کھانے کی ضمانت نہیں۔",
          commonConfusionUrdu: "mee کو کھانے کی قسم نہ سمجھیں؛ یہ بتاتا ہے کہ کھانا ساتھ لایا گیا ہے۔",
          exampleDutch: "eten mee",
          exampleUrdu: "کھانا ساتھ۔",
          pronunciationUrdu: "اے تَن مے"
        },
        "mijn kind heeft eten mee": {
          usageUrdu: "صبح حوالگی کے وقت عملے کو بتائیں کہ بچے کے پاس کھانا ہے: “mijn kind heeft eten mee”۔",
          usageBoundaryUrdu: "یہ ساتھ لائے کھانے کی بات ہے؛ پانی یا دوا کی ضرورت الگ بتانی ہوگی۔",
          commonConfusionUrdu: "بچے کے بارے میں مکمل جملہ mijn kind heeft eten mee رکھیں؛ فعل کو ادھورا نہ کریں۔",
          exampleDutch: "Mijn kind heeft eten mee.",
          exampleUrdu: "میرا بچہ کھانا ساتھ لایا ہے۔",
          pronunciationUrdu: "مَین کِنٹ ہےفٹ اے تَن مے"
        },
        "mijn kind heeft water nodig": {
          usageUrdu: "اگر بچے کو پانی درکار ہو تو حوالگی میں صاف کہیں: “mijn kind heeft water nodig”۔",
          usageBoundaryUrdu: "یہ پانی کی ضرورت بتاتا ہے؛ صرف dorst کہنا بچے کی کیفیت ہے مگر عملے کے لیے درخواست اتنی واضح نہیں۔",
          commonConfusionUrdu: "nodig جملے کے آخر میں رکھیں؛ mijn kind nodig water درست ترتیب نہیں۔",
          exampleDutch: "Mijn kind heeft water nodig.",
          exampleUrdu: "میرے بچے کو پانی چاہیے۔",
          pronunciationUrdu: "مَین کِنٹ ہےفٹ وا تَر نو دَخ"
        },
        moe: {
          usageUrdu: "بچے کی موجودہ حالت بتانے کے لیے moe کا مطلب تھکا ہوا یا تھکی ہوئی ہے۔",
          usageBoundaryUrdu: "moe تھکن ہے؛ بیماری اور نیند کے لیے الگ الفاظ آتے ہیں۔",
          commonConfusionUrdu: "moe کو بیماری نہ سمجھیں؛ یہ صرف تھکا ہونے کی کیفیت بتاتا ہے۔",
          exampleDutch: "Mijn kind is moe.",
          exampleUrdu: "میرا بچہ تھکا ہوا ہے۔",
          pronunciationUrdu: "مو"
        },
        "mijn kind is moe": {
          usageUrdu: "حوالگی کے وقت بچے کی تھکن بتانے کے لیے مکمل جملہ “mijn kind is moe” کہیں۔",
          usageBoundaryUrdu: "یہ موجودہ تھکن بتاتا ہے؛ بچے کی بیماری یا غیر حاضری کے لیے الگ جملہ چاہیے۔",
          commonConfusionUrdu: "کیفیت کے ساتھ is آتا ہے؛ mijn kind heeft moe نہ کہیں۔",
          exampleDutch: "Mijn kind is moe.",
          exampleUrdu: "میرا بچہ تھکا ہوا ہے۔",
          pronunciationUrdu: "مَین کِنٹ اِس مو"
        }
      },
      pattern: {
        modelDutch: "ik haal mijn kind om vijf uur op",
        titleUrdu: "بچے کو لینے کا وقت بتانا",
        highlight: "ik haal … om … op",
        explanationUrdu: "ophalen اس مکمل جملے میں الگ ہوتا ہے: ik haal، پھر بچہ اور وقت، اور آخر میں op۔",
        contrastUrdu: "brengen بچے کو مرکز چھوڑنے کے لیے ہے؛ ophalen بچے کو واپس لینے کے لیے ہے۔",
        commonMistakeUrdu: "op کو haal کے ساتھ شروع میں نہ چپکائیں؛ مکمل جملے میں op آخر میں رکھیں: ik haal mijn kind om vijf uur op۔"
      },
      independentCheckLeadUrdu: "پہلی مدد والی حوالگی کے بعد اگلے دن بچوں کی نگہداشت کے مرکز میں",
      prerequisiteLessonIds: [
        "a0-child-school",
        "a0-time-days",
        "a0-numbers-0-10",
        "a0-ja-nee-goed-niet",
        "a0-spelling-personal-details",
        "a0-daily-actions",
        "a0-letters-3",
        "a1-family-routine-extra"
      ],
      prerequisiteRefs: [
        ["a0-child-school", "brengen"],
        ["a0-child-school", "ophalen"],
        ["a0-child-school", "mijn kind komt vandaag niet"],
        ["a0-child-school", "ik breng mijn kind naar school"],
        ["a0-child-school", "ik haal mijn kind om drie uur op"],
        ["a0-time-days", "om acht uur"],
        ["a0-numbers-0-10", "vijf"],
        ["a0-numbers-0-10", "acht"],
        ["a0-ja-nee-goed-niet", "ja"],
        ["a0-spelling-personal-details", "leeftijd"],
        ["a0-daily-actions", "eten"],
        ["a0-letters-3", "water"],
        ["a1-family-routine-extra", "mijn dochter is vijf jaar"]
      ],
      scenarios: {
        "de kinderopvang": ["childcare-recognise-place", "بچے کی روزانہ نگہداشت کے مرکز کا درست مکمل ڈچ نام منتخب کریں۔"],
        "ik breng mijn kind om acht uur naar de kinderopvang": ["childcare-morning-dropoff", "صبح عملے کو بتانا ہے کہ آپ بچے کو آٹھ بجے kinderopvang چھوڑتے ہیں۔ مکمل جملہ منتخب کریں۔"],
        "ik haal mijn kind om vijf uur op": ["childcare-evening-pickup", "شام کو عملے کو بتائیں کہ آپ بچے کو پانچ بجے لینے آئیں گے۔ مکمل جملہ منتخب کریں۔"],
        "eten mee": ["childcare-card-food-label", "بچے کی حوالگی فہرست میں کھانا ساتھ ہونے والا مختصر خانہ منتخب کریں۔"],
        "mijn kind heeft eten mee": ["childcare-tell-food", "صبح عملے کو بتانا ہے کہ بچے کے پاس کھانا ساتھ ہے۔ مکمل جملہ منتخب کریں۔"],
        "mijn kind heeft water nodig": ["childcare-tell-water", "بچے کو پانی چاہیے، اس لیے عملے کو یہ ضرورت مکمل جملے میں بتائیں۔"],
        moe: ["childcare-recognise-tired", "عملہ بچے کی حالت پوچھتا ہے۔ تھکا ہوا کے لیے درست ڈچ لفظ منتخب کریں۔"],
        "mijn kind is moe": ["childcare-tell-tired", "شام حوالگی میں عملے کو بتانا ہے کہ بچہ تھکا ہوا ہے۔ مکمل جملہ منتخب کریں۔"]
      },
      document: {
        stableId: "child-care-handover-card",
        sourceKey: "child-care-handover",
        documentKind: "child-care-handover-card",
        targetDutch: "ik haal mijn kind om vijf uur op",
        title: "Kinderopvang",
        labelUrdu: "kinderopvang کی حوالگی نوٹ پڑھیں",
        promptUrdu: "حوالگی نوٹ میں Ophalen: 17:00 پڑھیں اور بچے کو پانچ بجے لینے والے سکھائے ہوئے ڈچ جملے کا درست اردو مطلب منتخب کریں۔",
        instructionUrdu: "Kinderopvang کی نوٹ میں Brengen اور Ophalen کے وقت الگ دیکھیں، پھر پانچ بجے بچے کو لینے والے جملے کا درست اردو مطلب منتخب کریں۔",
        correctUrdu: "درست۔ Ophalen: 17:00 کا مطلب ہے کہ بچے کو پانچ بجے لینا ہے، اس لیے ik haal mijn kind om vijf uur op درست ہے۔",
        wrongUrdu: "یہ چھوڑنے یا دوسری معلومات کی بات ہے۔ Ophalen: 17:00 کے لیے ik haal mijn kind om vijf uur op منتخب کریں۔",
        rows: [
          { label: "Leeftijd", value: "5 jaar" },
          { label: "Brengen", value: "08:00" },
          { label: "Ophalen", value: "17:00" },
          { label: "Eten mee", value: "ja" }
        ]
      }
    },
    "a1-present-time": {
      title: "Vandaag werk ik",
      unitLabel: "A1: روزمرہ معمول",
      outcomeUrdu: "آج کے کام، رہائش، اور Nederlands سیکھنے کی بات مکمل حال کے جملے میں کہنا، اور وقت پہلے آئے تو فعل کی جگہ پہچاننا۔",
      seedConcepts: [
        ["ik werk vandaag", "میں آج کام کرتا / کرتی ہوں"],
        ["ik woon in Nederland", "میں نیدرلینڈز میں رہتا / رہتی ہوں"],
        ["ik leer nu Nederlands", "میں ابھی Nederlands سیکھتا / سیکھتی ہوں"],
        ["wij leren Nederlands", "ہم Nederlands سیکھتے ہیں"],
        ["vandaag werk ik", "آج میں کام کرتا / کرتی ہوں"]
      ],
      teaching: {
        "ik leer nu nederlands": {
          usageUrdu: "کلاس یا تعارف میں اپنی موجودہ پڑھائی بتانے کے لیے مکمل جملہ “ik leer nu Nederlands” کہیں۔",
          usageBoundaryUrdu: "nu ابھی کے وقت کو واضح کرتا ہے؛ vandaag پورے آج کے دن کی بات کرتا ہے۔",
          commonConfusionUrdu: "nu کو شخص اور فعل کے درمیان نہ رکھیں؛ بنیادی ترتیب ik leer nu Nederlands رکھیں۔",
          exampleDutch: "Ik leer nu Nederlands.",
          exampleUrdu: "میں ابھی Nederlands سیکھتا یا سیکھتی ہوں۔",
          pronunciationUrdu: "اِک لیر نو نے دَر لانتس"
        },
        "wij leren nederlands": {
          usageUrdu: "جب آپ اپنے ساتھ دوسرے سیکھنے والوں کی مشترک بات کریں تو “wij leren Nederlands” کہیں۔",
          usageBoundaryUrdu: "wij ہم سب کے لیے ہے؛ اپنی اکیلی بات میں ik leer Nederlands آتا ہے۔",
          commonConfusionUrdu: "wij کے ساتھ leren آتا ہے؛ wij leer Nederlands نہ کہیں۔",
          exampleDutch: "Wij leren Nederlands.",
          exampleUrdu: "ہم Nederlands سیکھتے ہیں۔",
          pronunciationUrdu: "وَے لیرَن نے دَر لانتس"
        },
        "vandaag werk ik": {
          usageUrdu: "جب آج کے وقت کو خاص طور پر پہلے رکھنا ہو تو “vandaag werk ik” سے بات شروع کریں۔",
          usageBoundaryUrdu: "ik werk vandaag بھی آج کام کرنے کی بات ہے؛ vandaag پہلے آئے تو فعل werk دوسرے نمبر پر رہتا ہے۔",
          commonConfusionUrdu: "vandaag ik werk نہ کہیں؛ وقت پہلے ہو تو ترتیب vandaag + werk + ik ہے۔",
          exampleDutch: "Vandaag werk ik.",
          exampleUrdu: "آج میں کام کرتا یا کرتی ہوں۔",
          pronunciationUrdu: "فان داخ وَیرک اِک"
        }
      },
      pattern: {
        modelDutch: "vandaag werk ik",
        titleUrdu: "وقت پہلے ہو تو فعل دوسرے نمبر پر",
        highlight: "vandaag + werk + ik",
        explanationUrdu: "سادہ جملہ ik werk vandaag ہے۔ vandaag کو پہلے لائیں تو فعل werk دوسرے نمبر پر اور شخص ik اس کے بعد آتا ہے: vandaag werk ik۔",
        contrastUrdu: "ik werk vandaag میں شخص پہلے ہے؛ vandaag werk ik میں وقت پہلے ہے، مگر دونوں میں فعل اپنی درست جگہ پر رہتا ہے۔",
        commonMistakeUrdu: "vandaag ik werk نہ کہیں؛ وقت پہلے آنے کے بعد فوراً فعل رکھیں: vandaag werk ik۔"
      },
      independentCheckLeadUrdu: "پہلی مدد والی گفتگو کے بعد دوسرے دن کا منصوبہ بتاتے وقت",
      prerequisiteLessonIds: [
        "a0-ik-jij-u",
        "a0-time-days",
        "a0-name-land-city",
        "a0-work-basics"
      ],
      prerequisiteRefs: [
        ["a0-ik-jij-u", "ik"],
        ["a0-ik-jij-u", "wij"],
        ["a0-time-days", "vandaag"],
        ["a0-time-days", "nu"],
        ["a0-time-days", "ik werk vandaag"],
        ["a0-name-land-city", "ik woon in Nederland"],
        ["a0-work-basics", "werk"]
      ],
      scenarios: {
        "ik werk vandaag": ["present-tell-work-today", "ساتھی پوچھتا ہے کہ آپ آج کیا کرتے ہیں۔ اپنے آج کے کام کی مکمل بات منتخب کریں۔"],
        "ik woon in nederland": ["present-tell-country", "کلاس میں مختصر تعارف دیتے ہوئے بتائیں کہ آپ نیدرلینڈز میں رہتے ہیں۔"],
        "ik leer nu nederlands": ["present-tell-current-study", "زبان کے استاد کو بتانا ہے کہ آپ ابھی Nederlands سیکھ رہے ہیں۔ مکمل جملہ منتخب کریں۔"],
        "wij leren nederlands": ["present-tell-group-study", "کلاس کی مشترک سرگرمی بتاتے ہوئے کہیں کہ ہم Nederlands سیکھتے ہیں۔"],
        "vandaag werk ik": ["present-time-first-work", "ہفتہ وار منصوبے میں آج کو نمایاں کرنا ہے: جملہ vandaag سے شروع کریں اور بتائیں کہ آج آپ کام کرتے ہیں۔ vandaag کے فوراً بعد فعل آتا ہے۔"]
      }
    },
    "a1-daily-routine": {
      title: "Mijn werkdag stap voor stap",
      unitLabel: "A1: روزمرہ معمول",
      outcomeUrdu: "اٹھنے، ناشتہ، سفر، کام، بچے کو اسکول چھوڑنے، گھر واپس آنے، اور سونے کا سادہ روزمرہ سلسلہ وقت کے ساتھ بتانا۔",
      seedConcepts: [
        ["ik sta om zeven uur op", "میں سات بجے اٹھتا / اٹھتی ہوں"],
        ["ik ontbijt om half acht", "میں ساڑھے سات بجے ناشتہ کرتا / کرتی ہوں"],
        ["ik ga met de bus naar werk", "میں بس سے کام پر جاتا / جاتی ہوں"],
        ["ik begin om negen uur", "میں نو بجے شروع کرتا / کرتی ہوں"],
        ["ik heb om twaalf uur pauze", "میرا بارہ بجے وقفہ ہے"],
        ["ik stop om vijf uur", "میں پانچ بجے کام ختم کرتا / کرتی ہوں"],
        ["daarna ga ik naar huis", "اس کے بعد میں گھر جاتا / جاتی ہوں"],
        ["eerst breng ik mijn kind naar school", "پہلے میں اپنے بچے کو اسکول چھوڑتا / چھوڑتی ہوں"],
        ["vandaag werk ik niet", "آج میں کام نہیں کرتا / کرتی"],
        ["ik ga om elf uur slapen", "میں گیارہ بجے سونے جاتا / جاتی ہوں"]
      ],
      teaching: {
        "ik sta om zeven uur op": {
          usageUrdu: "اپنے دن کے شروع ہونے کا وقت بتاتے ہوئے کہیں: “ik sta om zeven uur op”۔",
          usageBoundaryUrdu: "opstaan بستر سے اٹھنے کا فعل ہے؛ کام شروع کرنے کے لیے beginnen استعمال ہوتا ہے۔",
          commonConfusionUrdu: "جملے میں sta کے ساتھ op آخر میں جاتا ہے؛ دونوں حصوں کو ایک جگہ جوڑ کر نہ رکھیں۔",
          exampleDutch: "Ik sta om zeven uur op.",
          exampleUrdu: "میں سات بجے اٹھتا یا اٹھتی ہوں۔",
          pronunciationUrdu: "اِک ستا اوم زے فَن اور اوپ"
        },
        "ik ontbijt om half acht": {
          usageUrdu: "صبح کے معمول میں ناشتہ اور اس کا وقت بتانے کے لیے “ik ontbijt om half acht” کہیں۔",
          usageBoundaryUrdu: "half acht ڈچ وقت میں ساڑھے سات ہے؛ آٹھ بج کر تیس منٹ نہیں۔",
          commonConfusionUrdu: "half acht کو ساڑھے آٹھ نہ سمجھیں؛ یہ آٹھ سے آدھا گھنٹہ پہلے یعنی 07:30 ہے۔",
          exampleDutch: "Ik ontbijt om half acht.",
          exampleUrdu: "میں ساڑھے سات بجے ناشتہ کرتا یا کرتی ہوں۔",
          pronunciationUrdu: "اِک اونت بَیت اوم ہالف آخت"
        },
        "ik ga met de bus naar werk": {
          usageUrdu: "کام تک روزانہ کا سفر بتانے کے لیے مکمل جملہ “ik ga met de bus naar werk” استعمال کریں۔",
          usageBoundaryUrdu: "met de bus ذریعے کو بتاتا ہے؛ naar werk منزل کو بتاتا ہے۔",
          commonConfusionUrdu: "بس کے بعد منزل مت چھوڑیں؛ مکمل ترتیب met de bus naar werk رکھیں۔",
          exampleDutch: "Ik ga met de bus naar werk.",
          exampleUrdu: "میں بس سے کام پر جاتا یا جاتی ہوں۔",
          pronunciationUrdu: "اِک خا مَت دَ بُس نار وَیرک"
        },
        "ik heb om twaalf uur pauze": {
          usageUrdu: "کام یا کورس میں وقفے کا وقت بتاتے ہوئے “ik heb om twaalf uur pauze” کہیں۔",
          usageBoundaryUrdu: "pauze وقفہ ہے؛ stop کام کے مکمل ختم ہونے کی بات ہے۔",
          commonConfusionUrdu: "وقفے کے لیے heb اور pauze کا یہی مکمل جملہ رکھیں؛ حالت والا فعل استعمال نہ کریں۔",
          exampleDutch: "Ik heb om twaalf uur pauze.",
          exampleUrdu: "میرا بارہ بجے وقفہ ہے۔",
          pronunciationUrdu: "اِک ہَپ اوم توالف اور پاؤ زَ"
        },
        "ik stop om vijf uur": {
          usageUrdu: "اپنے کام کے ختم ہونے کا وقت بتانے کے لیے “ik stop om vijf uur” کہیں۔",
          usageBoundaryUrdu: "stop کام ختم ہونے کی بات ہے؛ pauze صرف عارضی وقفہ ہے۔",
          commonConfusionUrdu: "وقت سے پہلے om رکھیں؛ ik stop vijf uur نامکمل ہے۔",
          exampleDutch: "Ik stop om vijf uur.",
          exampleUrdu: "میں پانچ بجے کام ختم کرتا یا کرتی ہوں۔",
          pronunciationUrdu: "اِک ستوپ اوم فَیف اور"
        },
        "daarna ga ik naar huis": {
          usageUrdu: "ایک کام کے بعد اگلا قدم بتانے کے لیے “daarna ga ik naar huis” سے گھر واپسی جوڑیں۔",
          usageBoundaryUrdu: "daarna اس کے بعد ہے؛ eerst پہلے قدم کو بتاتا ہے۔",
          commonConfusionUrdu: "daarna پہلے آئے تو فعل ga دوسرے نمبر پر ہے؛ daarna ik ga نہ کہیں۔",
          exampleDutch: "Ik stop om vijf uur. Daarna ga ik naar huis.",
          exampleUrdu: "میں پانچ بجے کام ختم کرتا ہوں۔ اس کے بعد گھر جاتا ہوں۔",
          pronunciationUrdu: "دار نا خا اِک نار ہاؤس"
        },
        "eerst breng ik mijn kind naar school": {
          usageUrdu: "صبح کا پہلا قدم بتاتے ہوئے کہیں: “eerst breng ik mijn kind naar school”۔",
          usageBoundaryUrdu: "eerst پہلے قدم کو بتاتا ہے؛ daarna بعد والا قدم جوڑتا ہے۔",
          commonConfusionUrdu: "eerst کے بعد فعل breng دوسرے نمبر پر رکھیں؛ eerst ik breng درست ترتیب نہیں۔",
          exampleDutch: "Eerst breng ik mijn kind naar school.",
          exampleUrdu: "پہلے میں اپنے بچے کو اسکول چھوڑتا یا چھوڑتی ہوں۔",
          pronunciationUrdu: "ایرست برَینگ اِک مَین کِنٹ نار سخُول"
        },
        "vandaag werk ik niet": {
          usageUrdu: "آج کام نہ کرنے کی تبدیلی بتاتے ہوئے مکمل جملہ “vandaag werk ik niet” کہیں۔",
          usageBoundaryUrdu: "niet کام کرنے کی پوری بات کو منفی کرتا ہے؛ geen کسی اسم کی غیر موجودگی کے لیے آتا ہے۔",
          commonConfusionUrdu: "vandaag کے بعد werk پھر ik آتا ہے، اور niet آخر میں؛ vandaag ik niet werk نہ کہیں۔",
          exampleDutch: "Vandaag werk ik niet.",
          exampleUrdu: "آج میں کام نہیں کرتا یا کرتی۔",
          pronunciationUrdu: "فان داخ وَیرک اِک نیت"
        },
        "ik ga om elf uur slapen": {
          usageUrdu: "اپنے دن کے آخر میں سونے کا وقت بتانے کے لیے “ik ga om elf uur slapen” کہیں۔",
          usageBoundaryUrdu: "slapen سونے کا عمل ہے؛ opstaan دن کے شروع میں اٹھنا ہے۔",
          commonConfusionUrdu: "ga کے بعد وقت اور آخر میں slapen رکھیں؛ دونوں فعل کی ترتیب الٹ نہ کریں۔",
          exampleDutch: "Ik ga om elf uur slapen.",
          exampleUrdu: "میں گیارہ بجے سونے جاتا یا جاتی ہوں۔",
          pronunciationUrdu: "اِک خا اوم اَلف اور سلا پَن"
        }
      },
      pattern: {
        modelDutch: "ik sta om zeven uur op",
        titleUrdu: "الگ ہونے والا فعل روزمرہ جملے میں",
        highlight: "ik sta … op",
        explanationUrdu: "لغت میں فعل opstaan ہے۔ سادہ جملے میں sta شخص کے بعد آتا ہے، وقت درمیان میں، اور op آخر میں جاتا ہے: ik sta om zeven uur op۔",
        contrastUrdu: "opstaan فعل کا بنیادی نام ہے؛ مکمل جملے میں ik sta … op بنتا ہے۔ beginnen الگ فعل ہے اور کام شروع کرنے کے لیے آتا ہے۔",
        commonMistakeUrdu: "ik opsta om zeven uur نہ کہیں؛ sta کو شخص کے بعد اور op کو آخر میں رکھیں۔"
      },
      independentCheckLeadUrdu: "پہلے مدد والے روزمرہ منصوبے کے بعد اگلے کام والے دن میں",
      prerequisiteLessonIds: [
        "a0-time-days",
        "a0-daily-actions",
        "a0-transport-directions",
        "a0-child-school",
        "a0-work-basics",
        "a1-present-time"
      ],
      prerequisiteRefs: [
        ["a0-time-days", "om acht uur"],
        ["a0-daily-actions", "slapen"],
        ["a0-transport-directions", "bus"],
        ["a0-child-school", "ik breng mijn kind naar school"],
        ["a0-work-basics", "ik begin om negen uur"],
        ["a1-present-time", "vandaag werk ik"]
      ],
      scenarios: {
        "ik sta om zeven uur op": ["routine-wake-time", "کام کے دن کا منصوبہ بناتے ہوئے بتائیں کہ آپ سات بجے اٹھتے ہیں۔"],
        "ik ontbijt om half acht": ["routine-breakfast-time", "گھر کے صبح والے معمول میں ساڑھے سات بجے ناشتے کی بات مکمل کریں۔"],
        "ik ga met de bus naar werk": ["routine-travel-to-work", "ساتھی پوچھتا ہے کہ آپ کام تک کیسے جاتے ہیں۔ بس والا مکمل جواب منتخب کریں۔"],
        "ik begin om negen uur": ["routine-work-start", "نئے کام کے پہلے دن ملازم کو اپنے شروع ہونے کا وقت نو بجے بتائیں۔"],
        "ik heb om twaalf uur pauze": ["routine-lunch-break", "ساتھی کے ساتھ ملاقات طے کرتے ہوئے بتائیں کہ بارہ بجے آپ کا وقفہ ہے۔"],
        "ik stop om vijf uur": ["routine-work-finish", "گھر والوں کو بتانا ہے کہ آپ پانچ بجے کام ختم کرتے ہیں۔"],
        "daarna ga ik naar huis": ["routine-after-work-home", "کام ختم ہونے کے بعد اگلا قدم گھر جانا ہے۔ ترتیب والا مکمل جملہ چنیں۔"],
        "eerst breng ik mijn kind naar school": ["routine-first-school-dropoff", "صبح کے منصوبے میں سب سے پہلے بچے کو اسکول چھوڑنے کی بات کہیں۔"],
        "vandaag werk ik niet": ["routine-day-off-change", "آج کے معمول میں تبدیلی ہے اور آپ کام نہیں کرتے۔ مکمل اطلاع منتخب کریں۔"],
        "ik ga om elf uur slapen": ["routine-bedtime", "روزمرہ دن کے آخر میں گیارہ بجے سونے کا وقت بتائیں۔"]
      }
    },
    "a1-calendar-time": {
      title: "Mijn week en een verandering",
      unitLabel: "A1: روزمرہ معمول",
      outcomeUrdu: "ہفتے کے دن یا دن کے حصے میں اپنی دستیابی بتانا، سادہ کام کا شیڈول پڑھنا، اور وقت پر یا دیر سے ہونے کی اطلاع دینا۔",
      seedConcepts: [
        ["ik kom op maandag", "میں پیر کو آتا / آتی ہوں"],
        ["ik werk op vrijdag", "میں جمعہ کو کام کرتا / کرتی ہوں"],
        ["in het weekend ben ik thuis", "ہفتہ وار چھٹی میں میں گھر پر ہوں"],
        ["ik heb tijd in de middag", "دوپہر میں میرے پاس وقت ہے"],
        ["ik ben op tijd", "میں وقت پر ہوں"],
        ["sorry ik ben te laat", "معاف کیجیے، میں دیر سے ہوں"]
      ],
      teaching: {
        "ik kom op maandag": {
          usageUrdu: "کسی ملاقات یا کلاس کے لیے پیر کی دستیابی بتاتے ہوئے کہیں: “ik kom op maandag”۔",
          usageBoundaryUrdu: "ہفتے کے دن سے پہلے op آتا ہے؛ دن کے حصے کے ساتھ in آتا ہے۔",
          commonConfusionUrdu: "maandag سے پہلے in نہ رکھیں؛ درست حصہ op maandag ہے۔",
          exampleDutch: "Ik kom op maandag.",
          exampleUrdu: "میں پیر کو آتا یا آتی ہوں۔",
          pronunciationUrdu: "اِک کوم اوپ مان داخ"
        },
        "ik werk op vrijdag": {
          usageUrdu: "اپنے ہفتہ وار کام کے شیڈول میں جمعہ کا دن بتانے کے لیے “ik werk op vrijdag” کہیں۔",
          usageBoundaryUrdu: "op vrijdag جمعہ کے دن کو بتاتا ہے؛ vrijdag om negen uur زیادہ خاص وقت جوڑ سکتا ہے۔",
          commonConfusionUrdu: "دن کے نام سے پہلے op رکھیں؛ ik werk in vrijdag نہ کہیں۔",
          exampleDutch: "Ik werk op vrijdag.",
          exampleUrdu: "میں جمعہ کو کام کرتا یا کرتی ہوں۔",
          pronunciationUrdu: "اِک وَیرک اوپ فرَے داخ"
        },
        "in het weekend ben ik thuis": {
          usageUrdu: "ہفتہ وار چھٹی کا عمومی منصوبہ بتانے کے لیے “in het weekend ben ik thuis” کہیں۔",
          usageBoundaryUrdu: "in het weekend پورے ہفتہ وار وقفے کی بات ہے؛ op zaterdag صرف ہفتے کے دن کی بات ہے۔",
          commonConfusionUrdu: "weekend کے ساتھ het نہ چھوڑیں؛ مکمل حصہ in het weekend رکھیں۔",
          exampleDutch: "In het weekend ben ik thuis.",
          exampleUrdu: "ہفتہ وار چھٹی میں میں گھر پر ہوں۔",
          pronunciationUrdu: "اِن ہَت ویک اَنت بَین اِک تھاؤس"
        },
        "ik heb tijd in de middag": {
          usageUrdu: "ملاقات طے کرتے ہوئے دوپہر کی دستیابی بتانے کے لیے “ik heb tijd in de middag” کہیں۔",
          usageBoundaryUrdu: "in de middag دن کا حصہ ہے؛ op maandag ہفتے کا دن ہے۔",
          commonConfusionUrdu: "دستیابی کے لیے heb tijd آتا ہے؛ ik ben tijd نہ کہیں۔",
          exampleDutch: "Ik heb tijd in de middag.",
          exampleUrdu: "دوپہر میں میرے پاس وقت ہے۔",
          pronunciationUrdu: "اِک ہَپ ٹَیٹ اِن دَ مِداخ"
        },
        "ik ben op tijd": {
          usageUrdu: "جب آپ مقررہ وقت پر پہنچ گئے ہوں تو مختصر مکمل اطلاع “ik ben op tijd” دیں۔",
          usageBoundaryUrdu: "op tijd وقت پر ہے؛ te vroeg وقت سے پہلے اور te laat دیر سے ہے۔",
          commonConfusionUrdu: "وقت پر کے لیے op tijd ایک ساتھ رکھیں؛ ik ben tijd نامکمل ہے۔",
          exampleDutch: "Ik ben op tijd.",
          exampleUrdu: "میں وقت پر ہوں۔",
          pronunciationUrdu: "اِک بَین اوپ ٹَیٹ"
        },
        "sorry ik ben te laat": {
          usageUrdu: "بس یا ٹرین کی وجہ سے دیر ہو تو انتظار کرنے والے کو فوراً کہیں: “sorry, ik ben te laat”۔",
          usageBoundaryUrdu: "te laat اپنی تاخیر بتاتا ہے؛ ik kom op maandag صرف آنے کا دن بتاتا ہے۔",
          commonConfusionUrdu: "معذرت کے بعد مکمل حالت ik ben te laat رکھیں؛ صرف sorry laat نہ کہیں۔",
          exampleDutch: "Sorry, ik ben te laat.",
          exampleUrdu: "معاف کیجیے، میں دیر سے ہوں۔",
          pronunciationUrdu: "سو ری اِک بَین تَ لات"
        }
      },
      pattern: {
        modelDutch: "ik kom op maandag",
        titleUrdu: "دن اور دن کے حصے کے ساتھ وقت",
        highlight: "op maandag",
        explanationUrdu: "ہفتے کے دن سے پہلے op رکھیں: op maandag۔ دن کے حصے سے پہلے in de رکھیں: in de middag۔",
        contrastUrdu: "op maandag ایک دن بتاتا ہے؛ in de middag دن کا حصہ بتاتا ہے؛ om negen uur گھڑی کا خاص وقت بتاتا ہے۔",
        commonMistakeUrdu: "in maandag یا op de middag نہ کہیں؛ op + دن اور in de + دن کا حصہ یاد رکھیں۔"
      },
      independentCheckLeadUrdu: "پہلا مدد والا شیڈول دیکھنے کے بعد نئی ہفتہ وار تبدیلی میں",
      prerequisiteLessonIds: [
        "a0-time-days",
        "a0-date-appointment",
        "a1-present-time",
        "a1-daily-routine"
      ],
      prerequisiteRefs: [
        ["a0-time-days", "maandag"],
        ["a0-time-days", "vrijdag"],
        ["a0-time-days", "middag"],
        ["a0-date-appointment", "op tijd"],
        ["a0-date-appointment", "te laat"],
        ["a1-present-time", "vandaag werk ik"],
        ["a1-daily-routine", "ik begin om negen uur"]
      ],
      scenarios: {
        "ik kom op maandag": ["calendar-monday-availability", "کورس کا ملازم پوچھتا ہے کہ آپ کس دن آتے ہیں۔ پیر کی مکمل بات منتخب کریں۔"],
        "ik werk op vrijdag": ["calendar-friday-work", "ہفتہ وار کام کے شیڈول میں جمعہ کے کام کی مکمل بات بتائیں۔"],
        "in het weekend ben ik thuis": ["calendar-weekend-home", "پڑوسی ہفتہ وار چھٹی کا منصوبہ پوچھتا ہے۔ گھر پر ہونے کی مکمل بات کہیں۔"],
        "ik heb tijd in de middag": ["calendar-afternoon-free", "ملاقات طے کرتے ہوئے بتائیں کہ دوپہر میں آپ کے پاس وقت ہے۔"],
        "ik ben op tijd": ["calendar-arrive-on-time", "کام کی جگہ پہنچ کر ساتھی کو بتائیں کہ آپ وقت پر ہیں۔"],
        "sorry ik ben te laat": ["calendar-delay-message", "بس دیر سے آئی ہے اور آپ کام پر تاخیر سے پہنچیں گے۔ معذرت اور تاخیر کی مکمل اطلاع دیں۔"]
      },
      document: {
        stableId: "calendar-read-delay-message",
        sourceKey: "calendar-week-plan",
        documentKind: "weekly-schedule-message",
        targetDutch: "sorry ik ben te laat",
        title: "maandag",
        labelUrdu: "کام کا شیڈول اور تاخیر کا پیغام پڑھیں",
        promptUrdu: "شیڈول میں “sorry ik ben te laat” کے سامنے 09:15 دیکھیں اور اس مکمل ڈچ بات کا درست اردو مطلب منتخب کریں۔",
        instructionUrdu: "پہلے پیر کے دو اوقات الگ دیکھیں، پھر 09:15 کے ساتھ لکھی “sorry ik ben te laat” کا درست اردو مطلب منتخب کریں۔",
        correctUrdu: "درست۔ “Sorry, ik ben te laat” کا مطلب معاف کیجیے، میں دیر سے ہوں۔",
        wrongUrdu: "یہ دوسری سیکھی ہوئی بات ہے۔ 09:15 کے ساتھ “Sorry, ik ben te laat” تاخیر کی اطلاع ہے۔",
        rows: [
          { label: "ik kom op maandag", value: "09:00" },
          { label: "ik ben op tijd", value: "09:00" },
          { label: "sorry ik ben te laat", value: "09:15" }
        ]
      }
    },
    "a1-weather-clothes": {
      title: "Weer bekijken en een plan kiezen",
      unitLabel: "A1: روزمرہ معمول",
      outcomeUrdu: "آج کا موسم سمجھنا، سردی یا بارش کے مطابق جیکٹ اور چھتری کی ضرورت بتانا، اور باہر جانے کا فیصلہ واضح کرنا۔",
      seedConcepts: [
        ["het regent vandaag", "آج بارش ہو رہی ہے"],
        ["het is koud buiten", "باہر سردی ہے"],
        ["ik heb een jas nodig", "مجھے جیکٹ چاہیے"],
        ["neem een paraplu mee", "چھتری ساتھ لیں"],
        ["ik ga niet naar buiten", "میں باہر نہیں جا رہا / رہی"]
      ],
      teaching: {
        "het regent vandaag": {
          usageUrdu: "صبح باہر جانے سے پہلے آج کی بارش بتانے کے لیے کہیں: “het regent vandaag”۔",
          usageBoundaryUrdu: "regent بارش ہونے کا فعل ہے؛ regen اکیلا بارش کا اسم ہے۔",
          commonConfusionUrdu: "موسم کے جملے میں het نہ چھوڑیں؛ regent vandaag اکیلا مکمل A1 نمونہ نہیں۔",
          exampleDutch: "Het regent vandaag.",
          exampleUrdu: "آج بارش ہو رہی ہے۔",
          pronunciationUrdu: "ہَت رے خَنت فان داخ"
        },
        "het is koud buiten": {
          usageUrdu: "باہر کی سردی بتا کر لباس کا فیصلہ واضح کرنے کے لیے “het is koud buiten” کہیں۔",
          usageBoundaryUrdu: "koud سرد کیفیت ہے؛ regen بارش کا نام اور regent بارش ہونے کا فعل ہے۔",
          commonConfusionUrdu: "سردی کی کیفیت کے ساتھ is آتا ہے؛ het koud buiten نہ کہیں۔",
          exampleDutch: "Het is koud buiten.",
          exampleUrdu: "باہر سردی ہے۔",
          pronunciationUrdu: "ہَت اِس کاؤت باؤ تَن"
        },
        "neem een paraplu mee": {
          usageUrdu: "بارش کی پیش گوئی کے بعد کسی کو عملی مشورہ دیتے ہوئے کہیں: “neem een paraplu mee”۔",
          usageBoundaryUrdu: "یہ چھتری ساتھ لینے کی ہدایت ہے؛ ik heb een paraplu اپنی ملکیت کی بات ہے۔",
          commonConfusionUrdu: "اس ہدایت میں neem شروع میں اور mee آخر میں رکھیں؛ دونوں حصوں کو غلط جگہ نہ ملائیں۔",
          exampleDutch: "Het regent. Neem een paraplu mee.",
          exampleUrdu: "بارش ہو رہی ہے۔ چھتری ساتھ لیں۔",
          pronunciationUrdu: "نیم اَن پا را پلو مے"
        },
        "ik ga niet naar buiten": {
          usageUrdu: "موسم کی وجہ سے باہر نہ جانے کا فیصلہ بتانے کے لیے “ik ga niet naar buiten” کہیں۔",
          usageBoundaryUrdu: "niet پورے جانے کے عمل کو منفی کرتا ہے؛ geen کسی اسم کی غیر موجودگی کے لیے ہے۔",
          commonConfusionUrdu: "سمت کے لیے naar buiten پورا رکھیں؛ ik ga buiten niet نہ کہیں۔",
          exampleDutch: "Ik ga niet naar buiten.",
          exampleUrdu: "میں باہر نہیں جا رہا یا رہی۔",
          pronunciationUrdu: "اِک خا نیت نار باؤ تَن"
        }
      },
      pattern: {
        modelDutch: "het is koud buiten",
        titleUrdu: "موسم کی کیفیت مکمل جملے میں",
        highlight: "het is koud buiten",
        explanationUrdu: "سردی یا گرمی کی کیفیت بتاتے وقت het is کے بعد کیفیت اور پھر جگہ یا وقت رکھیں: het is koud buiten۔",
        contrastUrdu: "het is koud کیفیت بتاتا ہے؛ het regent میں regent خود موسم کا فعل ہے، اس لیے وہاں is نہیں آتا۔",
        commonMistakeUrdu: "het is regent یا het koud buiten نہ کہیں؛ کیفیت کے ساتھ het is، اور بارش کے فعل کے ساتھ het regent رکھیں۔"
      },
      independentCheckLeadUrdu: "پہلی مدد والی موسم کی تیاری کے بعد دوسرے دن باہر جانے کا فیصلہ کرتے وقت",
      prerequisiteLessonIds: [
        "a0-weather-clothing-safety",
        "a0-home-needs",
        "a0-ja-nee-goed-niet",
        "a1-present-time",
        "a1-calendar-time"
      ],
      prerequisiteRefs: [
        ["a0-weather-clothing-safety", "regen"],
        ["a0-weather-clothing-safety", "paraplu"],
        ["a0-weather-clothing-safety", "ik heb een jas nodig"],
        ["a0-home-needs", "koud"],
        ["a0-ja-nee-goed-niet", "niet"],
        ["a1-present-time", "vandaag werk ik"],
        ["a1-calendar-time", "ik kom op maandag"]
      ],
      scenarios: {
        "het regent vandaag": ["weather-today-rain", "گھر سے نکلنے سے پہلے موسم دیکھ کر ساتھی کو بتائیں کہ آج بارش ہو رہی ہے۔"],
        "het is koud buiten": ["weather-cold-outside", "بچے کو تیار کرتے ہوئے بتائیں کہ باہر سردی ہے۔"],
        "ik heb een jas nodig": ["weather-need-coat", "باہر سردی ہے اور آپ کو جیکٹ کی ضرورت بتانی ہے۔ مکمل بات منتخب کریں۔"],
        "neem een paraplu mee": ["weather-take-umbrella", "گھر والا باہر جا رہا ہے اور بارش ہو رہی ہے۔ چھتری ساتھ لینے کا واضح مشورہ دیں۔"],
        "ik ga niet naar buiten": ["weather-stay-inside", "بارش بہت تیز ہے، اس لیے آپ باہر نہ جانے کا فیصلہ بتاتے ہیں۔ مکمل جملہ منتخب کریں۔"]
      }
    },
    "a1-questions": {
      title: "Duidelijke vragen stellen",
      unitLabel: "A1: سوال، مدد، فون اور ملاقات",
      outcomeUrdu: "کون، کیا، کہاں، کب، کتنا، کیوں، اور کون سا دن والے سوال سمجھنا اور سوال لفظ کے بعد فعل اور شخص درست ترتیب میں رکھنا۔",
      seedConcepts: [
        ["waar woont u?", "آپ کہاں رہتے ہیں؟"],
        ["wie", "کون"],
        ["wat", "کیا"],
        ["waar", "کہاں"],
        ["hoe", "کیسے"],
        ["wanneer", "کب"],
        ["hoeveel", "کتنا / کتنے"],
        ["waarom komt u niet?", "آپ کیوں نہیں آ رہے؟"],
        ["welke dag?", "کون سا دن؟"],
        ["wat is uw naam?", "آپ کا نام کیا ہے؟"],
        ["wanneer komt u?", "آپ کب آئیں گے؟"],
        ["komt u morgen?", "کیا آپ کل آئیں گے؟"]
      ],
      teaching: {
        wanneer: {
          usageUrdu: "کسی کے آنے، کھلنے، یا ملاقات کے وقت کے بارے میں کب پوچھنا ہو تو سوال کے شروع میں wanneer رکھیں۔",
          usageBoundaryUrdu: "wanneer دن یا وقت پوچھتا ہے؛ جگہ پوچھنے کے لیے waar استعمال ہوتا ہے۔",
          commonConfusionUrdu: "wanneer کو waar نہ سمجھیں: wanneer وقت ہے، waar جگہ ہے۔",
          exampleDutch: "Wanneer komt u?",
          exampleUrdu: "آپ کب آئیں گے؟",
          pronunciationUrdu: "وَ نیر"
        },
        hoeveel: {
          usageUrdu: "تعداد، قیمت، یا مقدار پوچھنے کے لیے hoeveel استعمال کریں۔",
          usageBoundaryUrdu: "hoeveel کتنے یا کتنا پوچھتا ہے؛ hoe طریقہ یا کیفیت پوچھتا ہے۔",
          commonConfusionUrdu: "قیمت یا تعداد میں hoeveel کہیں؛ صرف hoe کہنے سے کتنی مقدار واضح نہیں ہوتی۔",
          exampleDutch: "Hoeveel kost dit?",
          exampleUrdu: "یہ کتنے کا ہے؟",
          pronunciationUrdu: "ہو فیل"
        },
        "waarom komt u niet": {
          usageUrdu: "کسی شخص کے نہ آنے کی وجہ مؤدبانہ طور پر پوچھنے کے لیے یہ مکمل سوال کہیں۔",
          usageBoundaryUrdu: "waarom وجہ پوچھتا ہے؛ wanneer وقت اور waar جگہ پوچھتا ہے۔",
          commonConfusionUrdu: "waarom کو waar نہ بنائیں؛ آخری حصہ وجہ والے سوال کے لیے ضروری ہے۔",
          exampleDutch: "Waarom komt u niet?",
          exampleUrdu: "آپ کیوں نہیں آ رہے؟",
          pronunciationUrdu: "وا روم کومت یو نیت"
        },
        "welke dag": {
          usageUrdu: "کئی دنوں میں سے ایک دن منتخب کرانا ہو تو مکمل مختصر سوال “welke dag?” کہیں۔",
          usageBoundaryUrdu: "welke dag انتخاب پوچھتا ہے؛ wanneer کھلا وقت پوچھتا ہے۔",
          commonConfusionUrdu: "دن کا انتخاب پوچھتے وقت welke کے بعد dag رکھیں؛ صرف wat dag نہ کہیں۔",
          exampleDutch: "Welke dag?",
          exampleUrdu: "کون سا دن؟",
          pronunciationUrdu: "وَیل کَ داخ"
        },
        "waar woont u": {
          usageUrdu: "کسی بالغ یا نامعلوم شخص سے مؤدبانہ طور پر رہنے کی جگہ پوچھیں: “waar woont u?”۔",
          usageBoundaryUrdu: "یہ رہنے کی جگہ پوچھتا ہے؛ نام پوچھنے کے لیے wat is uw naam? کہیں۔",
          commonConfusionUrdu: "سوال لفظ کے بعد فعل رکھیں: waar woont u، نہ کہ waar u woont۔",
          exampleDutch: "Waar woont u?",
          exampleUrdu: "آپ کہاں رہتے ہیں؟",
          pronunciationUrdu: "وار وونٹ یو"
        },
        "wat is uw naam": {
          usageUrdu: "فارم یا رسمی تعارف میں کسی شخص کا نام پوچھنے کے لیے “wat is uw naam?” کہیں۔",
          usageBoundaryUrdu: "یہ نام پوچھتا ہے؛ پتہ پوچھنے کے لیے waar woont u? استعمال کریں۔",
          commonConfusionUrdu: "رسمی سوال میں uw naam ایک ساتھ رکھیں؛ wat uw naam is والا بیان نہ بنائیں۔",
          exampleDutch: "Wat is uw naam?",
          exampleUrdu: "آپ کا نام کیا ہے؟",
          pronunciationUrdu: "وات اِس او نام"
        },
        "wanneer komt u": {
          usageUrdu: "کسی آمد کا دن یا وقت مؤدبانہ طور پر پوچھنے کے لیے “wanneer komt u?” کہیں۔",
          usageBoundaryUrdu: "یہ کھلا کب والا سوال ہے؛ komt u morgen? صرف کل کی تصدیق پوچھتا ہے۔",
          commonConfusionUrdu: "wanneer کے فوراً بعد فعل komt اور پھر u رکھیں۔",
          exampleDutch: "Wanneer komt u?",
          exampleUrdu: "آپ کب آئیں گے؟",
          pronunciationUrdu: "وَ نیر کومت یو"
        },
        "komt u morgen": {
          usageUrdu: "جب صرف یہ تصدیق چاہیے کہ شخص کل آئے گا یا نہیں تو “komt u morgen?” پوچھیں۔",
          usageBoundaryUrdu: "یہ ہاں یا نہیں والا سوال ہے؛ wanneer komt u? کئی ممکنہ وقت پوچھتا ہے۔",
          commonConfusionUrdu: "ہاں یا نہیں سوال میں فعل پہلے آتا ہے: komt u، نہ کہ u komt۔",
          exampleDutch: "Komt u morgen?",
          exampleUrdu: "کیا آپ کل آئیں گے؟",
          pronunciationUrdu: "کومت یو مور خَن"
        }
      },
      pattern: {
        modelDutch: "waar woont u?",
        titleUrdu: "سوال لفظ کے بعد فعل اور پھر شخص",
        highlight: "waar + woont + u",
        explanationUrdu: "waar، wat، یا wanneer کے بعد بدلا ہوا فعل اور پھر شخص رکھیں: waar woont u?۔",
        contrastUrdu: "سوال لفظ نہ ہو تو فعل پہلے آتا ہے: komt u morgen?؛ سوال لفظ ہو تو وہ سب سے پہلے رہتا ہے۔",
        commonMistakeUrdu: "waar u woont یا u komt morgen? کو سوال نہ بنائیں؛ سوال میں فعل کی جگہ واضح رکھیں۔"
      },
      independentCheckLeadUrdu: "پہلی مدد والی گفتگو کے بعد دوسرے استقبالی کاؤنٹر پر",
      prerequisiteLessonIds: ["a0-dit-dat-questions", "a0-time-days", "a0-shopping-payment", "a1-details-forms", "a1-calendar-time"],
      prerequisiteRefs: [
        ["a0-dit-dat-questions", "wie"],
        ["a0-dit-dat-questions", "wat"],
        ["a0-dit-dat-questions", "waar"],
        ["a0-dit-dat-questions", "hoe"],
        ["a0-time-days", "morgen"],
        ["a0-date-appointment", "afspraak"],
        ["a0-shopping-payment", "hoeveel kost dit"],
        ["a1-details-forms", "mijn naam is Zarar"],
        ["a1-calendar-time", "ik kom op maandag"]
      ],
      scenarios: {
        wie: ["questions-ask-person", "انتظار گاہ میں نام سنائی دیا مگر شخص معلوم نہیں۔ کون پوچھنے کے لیے درست سوال لفظ چنیں۔"],
        wat: ["questions-ask-thing", "فارم پر ایک خانہ سمجھ نہیں آیا۔ کیا پوچھنے کے لیے درست سوال لفظ چنیں۔"],
        waar: ["questions-ask-place", "ملاقات کی جگہ معلوم نہیں۔ کہاں پوچھنے کے لیے درست سوال لفظ چنیں۔"],
        hoe: ["questions-ask-how", "ملازم سے طریقہ پوچھنا ہے۔ کیسے کے لیے درست سوال لفظ چنیں۔"],
        wanneer: ["questions-ask-when", "کلاس شروع ہونے کا وقت معلوم نہیں۔ کب پوچھنے کے لیے درست لفظ چنیں۔"],
        hoeveel: ["questions-ask-amount", "ٹکٹ کی قیمت معلوم کرنی ہے۔ کتنے یا کتنا پوچھنے کا درست لفظ چنیں۔"],
        "waarom komt u niet": ["questions-ask-reason", "شخص ملاقات پر نہیں آ رہا۔ مؤدبانہ طور پر وجہ پوچھیں۔"],
        "welke dag": ["questions-choose-day", "ملازم دو ممکنہ دن بتاتا ہے۔ کون سا دن پوچھنے کا مختصر سوال چنیں۔"],
        "waar woont u": ["questions-form-address", "رجسٹریشن میں رہنے کی جگہ مؤدبانہ طور پر پوچھیں۔"],
        "wat is uw naam": ["questions-form-name", "استقبالی ملازم کو آنے والے شخص کا نام پوچھنا ہے۔ مکمل رسمی سوال چنیں۔"],
        "wanneer komt u": ["questions-open-arrival", "ملاقات کے لیے شخص کی آمد کا دن ابھی کھلا ہے۔ کب آئیں گے پوچھیں۔"],
        "komt u morgen": ["questions-confirm-tomorrow", "صرف کل آنے کی ہاں یا نہیں میں تصدیق کرنی ہے۔ مکمل سوال چنیں۔"]
      }
    },
    "a1-polite-chunks": {
      title: "Beleefd om hulp vragen",
      unitLabel: "A1: سوال، مدد، فون اور ملاقات",
      outcomeUrdu: "مدد یا سوال مؤدبانہ طور پر مانگنا، نہ سمجھ آنے کی بات کہنا، اور مدد کے بعد مناسب شکریہ یا انکار دینا۔",
      seedConcepts: [
        ["alstublieft", "براہ مہربانی / لیجیے"],
        ["dank u wel", "آپ کا شکریہ"],
        ["sorry", "معاف کیجیے"],
        ["graag", "خوشی سے / پسند سے"],
        ["kunt u mij helpen alstublieft?", "کیا آپ میری مدد کر سکتے ہیں، براہ مہربانی؟"],
        ["mag ik iets vragen?", "کیا میں کچھ پوچھ سکتا / سکتی ہوں؟"],
        ["sorry ik begrijp het niet", "معاف کیجیے، مجھے یہ سمجھ نہیں آیا"],
        ["dank u wel voor uw hulp", "آپ کی مدد کا شکریہ"],
        ["nee dank u", "نہیں، شکریہ"]
      ],
      teaching: {
        "kunt u mij helpen alstublieft": {
          usageUrdu: "کاؤنٹر، اسکول، یا دکان میں مؤدبانہ مدد مانگنے کے لیے مکمل سوال کہیں۔",
          usageBoundaryUrdu: "یہ مدد مانگتا ہے؛ mag ik iets vragen? صرف سوال کرنے کی اجازت مانگتا ہے۔",
          commonConfusionUrdu: "رسمی شخص کے لیے kunt u رکھیں اور alstublieft آخر میں رکھ سکتے ہیں۔",
          exampleDutch: "Kunt u mij helpen alstublieft?",
          exampleUrdu: "کیا آپ میری مدد کر سکتے ہیں، براہ مہربانی؟",
          pronunciationUrdu: "کُنت یو مَے ہَیل پَن آل سٹو بلیفٹ"
        },
        "mag ik iets vragen": {
          usageUrdu: "کسی کی گفتگو روکنے سے پہلے ادب سے سوال کرنے کی اجازت مانگیں۔",
          usageBoundaryUrdu: "یہ سوال شروع کرنے کی اجازت ہے؛ خود مدد کی درخواست نہیں۔",
          commonConfusionUrdu: "اجازت میں mag ik آتا ہے؛ kunt u سامنے والے سے کام کرنے کی درخواست ہے۔",
          exampleDutch: "Mag ik iets vragen?",
          exampleUrdu: "کیا میں کچھ پوچھ سکتا یا سکتی ہوں؟",
          pronunciationUrdu: "ماخ اِک اِٹس فرا خَن"
        },
        "sorry ik begrijp het niet": {
          usageUrdu: "سامنے والے کی بات سمجھ نہ آئے تو معذرت کے ساتھ اپنی مشکل صاف کہیں۔",
          usageBoundaryUrdu: "یہ نہ سمجھ آنے کی اطلاع ہے؛ دوبارہ کہنے کی درخواست الگ جملہ ہے۔",
          commonConfusionUrdu: "اپنی حالت بتائیں؛ اسے دوسرے شخص کی سمجھ کے بارے میں سوال نہ بنائیں۔",
          exampleDutch: "Sorry, ik begrijp het niet.",
          exampleUrdu: "معاف کیجیے، مجھے یہ سمجھ نہیں آیا۔",
          pronunciationUrdu: "سو ری اِک بَخرَیپ ہَت نیت"
        },
        "dank u wel voor uw hulp": {
          usageUrdu: "کسی نے واقعی مدد کی ہو تو مدد کو نام لے کر مکمل شکریہ دیں۔",
          usageBoundaryUrdu: "یہ مدد کے بعد کہا جاتا ہے؛ مدد مانگنے سے پہلے درخواست درکار ہے۔",
          commonConfusionUrdu: "voor uw hulp حصہ مدد کی وجہ بتاتا ہے؛ اسے درخواست نہ سمجھیں۔",
          exampleDutch: "Dank u wel voor uw hulp.",
          exampleUrdu: "آپ کی مدد کا شکریہ۔",
          pronunciationUrdu: "دانک یو وَل فور او ہُلپ"
        },
        "nee dank u": {
          usageUrdu: "پیشکش قبول نہ کرنی ہو تو سخت انکار کے بجائے “nee, dank u” کہیں۔",
          usageBoundaryUrdu: "یہ مؤدبانہ انکار ہے؛ قبول کرنے کے لیے ja graag کہیں۔",
          commonConfusionUrdu: "nee کے بعد dank u رکھنے سے جواب مؤدبانہ رہتا ہے؛ اسے رضامندی نہ سمجھیں۔",
          exampleDutch: "Nee, dank u.",
          exampleUrdu: "نہیں، شکریہ۔",
          pronunciationUrdu: "نے دانک یو"
        }
      },
      pattern: {
        modelDutch: "kunt u mij helpen alstublieft?",
        titleUrdu: "مؤدبانہ درخواست کا مکمل نمونہ",
        highlight: "kunt u mij helpen",
        explanationUrdu: "رسمی مدد مانگتے وقت kunt u سے شروع کریں، پھر mij helpen اور آخر میں alstublieft رکھیں۔",
        contrastUrdu: "mag ik … اپنی اجازت پوچھتا ہے؛ kunt u … سامنے والے سے مؤدبانہ کام مانگتا ہے۔",
        commonMistakeUrdu: "صرف helpen نہ کہیں؛ kunt u mij helpen والا مکمل سوال استعمال کریں۔"
      },
      independentCheckLeadUrdu: "پہلی مدد والی صورت کے بعد دوسری عوامی جگہ پر",
      prerequisiteLessonIds: ["a0-greetings-courtesy", "a0-understanding-help", "a1-questions"],
      prerequisiteRefs: [
        ["a0-greetings-courtesy", "alstublieft"],
        ["a0-greetings-courtesy", "dank u wel"],
        ["a0-greetings-courtesy", "sorry"],
        ["a0-greetings-courtesy", "graag"],
        ["a0-understanding-help", "ik begrijp het niet"],
        ["a1-questions", "waar woont u?"]
      ],
      scenarios: {
        alstublieft: ["polite-please", "ملازم سے مؤدبانہ درخواست کے آخر میں براہ مہربانی کہنا ہے۔ درست لفظ چنیں۔"],
        "dank u wel": ["polite-thanks", "ملازم نے راستہ سمجھا دیا ہے۔ مناسب شکریہ چنیں۔"],
        sorry: ["polite-sorry", "آپ کو گفتگو روکنی ہے۔ پہلے مناسب معذرت کہیں۔"],
        graag: ["polite-gladly", "پیشکش قبول کرتے ہوئے خوشی سے کہنا ہے۔ درست لفظ چنیں۔"],
        "kunt u mij helpen alstublieft": ["polite-ask-help", "بلدیہ کے کاؤنٹر پر فارم سمجھ نہیں آیا۔ مکمل مؤدبانہ مدد مانگیں۔"],
        "mag ik iets vragen": ["polite-ask-permission", "استقبالی ملازم مصروف ہے۔ اپنا سوال شروع کرنے سے پہلے اجازت مانگیں۔"],
        "sorry ik begrijp het niet": ["polite-not-understand", "ملازم کی بات سمجھ نہیں آئی۔ معذرت کے ساتھ اپنی مشکل بتائیں۔"],
        "dank u wel voor uw hulp": ["polite-thank-help", "ملازم نے فارم مکمل کروا دیا۔ مدد کے لیے پورا شکریہ دیں۔"],
        "nee dank u": ["polite-decline", "دکاندار اضافی چیز پیش کرتا ہے مگر آپ نہیں چاہتے۔ مؤدبانہ انکار کریں۔"]
      }
    },
    "a1-plans-invitations": {
      title: "Uitnodigen en afspreken",
      unitLabel: "A1: سوال، مدد، فون اور ملاقات",
      outcomeUrdu: "کسی کو کافی کی دعوت دینا، قبول یا معذرت کے ساتھ انکار کرنا، وقت تجویز کرنا، اور ملنے کی جگہ پوچھنا۔",
      seedConcepts: [
        ["zullen we om drie uur afspreken?", "کیا ہم تین بجے ملیں؟"],
        ["koffie", "کافی"],
        ["morgen", "کل / آنے والا دن"],
        ["avond", "شام"],
        ["wil je koffie drinken?", "کیا تم کافی پینا چاہتے ہو؟"],
        ["ja graag", "جی ہاں، خوشی سے"],
        ["sorry ik kan niet", "معاف کیجیے، میں نہیں آ سکتا / سکتی"],
        ["waar spreken we af?", "ہم کہاں ملیں گے؟"],
        ["tot morgen", "کل ملیں گے"]
      ],
      teaching: {
        "wil je koffie drinken": {
          usageUrdu: "جان پہچان والے شخص کو سادہ کافی کی دعوت دینے کے لیے یہ مکمل سوال کہیں۔",
          usageBoundaryUrdu: "یہ غیر رسمی je والی دعوت ہے؛ رسمی کاؤنٹر کی درخواست نہیں۔",
          commonConfusionUrdu: "دعوت میں wil je کے بعد کافی پینے کا عمل رکھیں؛ اسے سیدھا بیان نہ بنائیں۔",
          exampleDutch: "Wil je koffie drinken?",
          exampleUrdu: "کیا تم کافی پینا چاہتے ہو؟",
          pronunciationUrdu: "وِل یَے کو فی دِرن کَن"
        },
        "ja graag": {
          usageUrdu: "دعوت یا پیشکش خوشی سے قبول کرنے کے لیے مختصر جواب “ja graag” دیں۔",
          usageBoundaryUrdu: "یہ قبول کرنا ہے؛ مؤدبانہ انکار nee dank u یا sorry ik kan niet سے ہوتا ہے۔",
          commonConfusionUrdu: "graag قبول کرنے کی خوشی دکھاتا ہے؛ اسے انکار کے ساتھ نہ ملائیں۔",
          exampleDutch: "Ja, graag.",
          exampleUrdu: "جی ہاں، خوشی سے۔",
          pronunciationUrdu: "یا خراخ"
        },
        "sorry ik kan niet": {
          usageUrdu: "دعوت قبول نہ کر سکیں تو معذرت کے ساتھ اپنی عدم دستیابی بتائیں۔",
          usageBoundaryUrdu: "یہ آنے سے معذوری ہے؛ صرف nee dank u کسی پیشکش کا مختصر انکار ہے۔",
          commonConfusionUrdu: "kan کے بعد niet رکھیں؛ ik niet kan والی تابع جملے کی ترتیب یہاں نہ بنائیں۔",
          exampleDutch: "Sorry, ik kan niet.",
          exampleUrdu: "معاف کیجیے، میں نہیں آ سکتا یا سکتی۔",
          pronunciationUrdu: "سو ری اِک کان نیت"
        },
        "zullen we om drie uur afspreken": {
          usageUrdu: "دونوں کے لیے تین بجے ملنے کی تجویز مؤدبانہ طور پر دینے کے لیے یہ سوال کہیں۔",
          usageBoundaryUrdu: "یہ نیا وقت تجویز کرتا ہے؛ waar spreken we af? جگہ پوچھتا ہے۔",
          commonConfusionUrdu: "گھڑی کے وقت سے پہلے om رکھیں اور afspreken آخر میں رکھیں۔",
          exampleDutch: "Zullen we om drie uur afspreken?",
          exampleUrdu: "کیا ہم تین بجے ملیں؟",
          pronunciationUrdu: "زُ لَن وَے اوم دری اُور آف سپرے کَن"
        },
        "waar spreken we af": {
          usageUrdu: "وقت طے ہونے کے بعد ملنے کی جگہ پوچھنے کے لیے “waar spreken we af?” کہیں۔",
          usageBoundaryUrdu: "یہ جگہ پوچھتا ہے؛ zullen we om drie uur afspreken? وقت تجویز کرتا ہے۔",
          commonConfusionUrdu: "waar کے بعد spreken اور پھر we رکھیں؛ waar we spreken af نہ کہیں۔",
          exampleDutch: "Waar spreken we af?",
          exampleUrdu: "ہم کہاں ملیں گے؟",
          pronunciationUrdu: "وار سپرے کَن وَے آف"
        },
        "tot morgen": {
          usageUrdu: "کل کی ملاقات طے ہو جانے کے بعد رخصت ہوتے ہوئے “tot morgen” کہیں۔",
          usageBoundaryUrdu: "یہ کل ملنے کی رخصتی ہے؛ uitnodiging یا وقت پوچھنے کا سوال نہیں۔",
          commonConfusionUrdu: "tot morgen کل تک یا کل ملیں گے ہے؛ morgen اکیلا صرف کل کا لفظ ہے۔",
          exampleDutch: "Tot morgen.",
          exampleUrdu: "کل ملیں گے۔",
          pronunciationUrdu: "توت مور خَن"
        }
      },
      pattern: {
        modelDutch: "zullen we om drie uur afspreken?",
        titleUrdu: "ملنے کا وقت تجویز کرنا",
        highlight: "zullen we + om drie uur + afspreken",
        explanationUrdu: "مشترک تجویز کے لیے zullen we سے شروع کریں، پھر وقت اور آخر میں afspreken رکھیں۔",
        contrastUrdu: "zullen we … وقت تجویز کرتا ہے؛ waar spreken we af? جگہ پوچھتا ہے۔",
        commonMistakeUrdu: "afspreken کو درمیان میں نہ توڑیں؛ سوال کے آخر میں پورا رکھیں۔"
      },
      independentCheckLeadUrdu: "پہلی دعوت کے بعد دوسرے جان پہچان والے شخص کے ساتھ",
      prerequisiteLessonIds: ["a0-food-drink", "a0-time-days", "a0-numbers-0-10", "a1-polite-chunks"],
      prerequisiteRefs: [
        ["a0-food-drink", "koffie"],
        ["a0-time-days", "morgen"],
        ["a0-time-days", "avond"],
        ["a0-numbers-0-10", "drie"],
        ["a1-polite-chunks", "sorry ik begrijp het niet"]
      ],
      scenarios: {
        koffie: ["invite-coffee", "دعوت میں پینے کے لیے کافی کا درست ڈچ لفظ چنیں۔"],
        morgen: ["invite-tomorrow", "ملاقات اگلے دن ہے۔ کل کے لیے درست ڈچ لفظ چنیں۔"],
        avond: ["invite-evening", "ملاقات شام میں ہے۔ شام کے لیے درست ڈچ لفظ چنیں۔"],
        "wil je koffie drinken": ["invite-offer-coffee", "جان پہچان والے پڑوسی کو کافی کی مکمل دعوت دیں۔"],
        "ja graag": ["invite-accept", "آپ کافی کی دعوت خوشی سے قبول کرنا چاہتے ہیں۔ مختصر مناسب جواب دیں۔"],
        "sorry ik kan niet": ["invite-decline", "آپ اس وقت نہیں آ سکتے۔ معذرت کے ساتھ مکمل انکار کریں۔"],
        "zullen we om drie uur afspreken": ["invite-propose-time", "آپ دونوں کو ملنے کا وقت تجویز کرنا ہے۔ تین بجے کی مکمل بات کہیں۔"],
        "waar spreken we af": ["invite-ask-place", "وقت طے ہے مگر جگہ معلوم نہیں۔ ملنے کی جگہ پوچھیں۔"],
        "tot morgen": ["invite-goodbye", "کل کی ملاقات طے ہو گئی ہے۔ رخصت ہوتے ہوئے مناسب بات کہیں۔"]
      }
    },
    "a1-phone-calls": {
      title: "Een telefoongesprek voeren",
      unitLabel: "A1: سوال، مدد، فون اور ملاقات",
      outcomeUrdu: "فون پر اپنا نام بتانا، بولنے والے کی شناخت پوچھنا، واپس فون کا وقت دینا، غلط نمبر واضح کرنا، نمبر دہرانا، اور voicemail پر پیغام چھوڑنا۔",
      seedConcepts: [
        ["ik bel u vanavond terug", "میں آپ کو آج شام واپس فون کروں گا / گی"],
        ["telefoon", "فون"],
        ["nummer", "نمبر"],
        ["voicemail", "وائس میل"],
        ["met Sara", "Sara بول رہی ہوں"],
        ["wie spreekt er?", "کون بول رہا ہے؟"],
        ["kunt u later terugbellen?", "کیا آپ بعد میں واپس فون کر سکتے ہیں؟"],
        ["u heeft het verkeerde nummer", "آپ نے غلط نمبر ملایا ہے"],
        ["kunt u het nummer herhalen?", "کیا آپ نمبر دہرا سکتے ہیں؟"],
        ["spreek een bericht in", "وائس میل پر پیغام بول دیں"]
      ],
      teaching: {
        telefoon: {
          usageUrdu: "فون آلہ یا فون رابطے کی بات میں telefoon استعمال کریں۔",
          usageBoundaryUrdu: "telefoon آلہ ہے؛ nummer وہ ہندسے ہیں جن پر کال ہوتی ہے۔",
          commonConfusionUrdu: "telefoon کو نمبر نہ سمجھیں؛ نمبر کے لیے nummer الگ لفظ ہے۔",
          exampleDutch: "telefoon — nummer",
          exampleUrdu: "فون — نمبر۔",
          pronunciationUrdu: "تے لے فون"
        },
        nummer: {
          usageUrdu: "فون کے ہندسوں یا رابطہ نمبر کی بات میں nummer استعمال کریں۔",
          usageBoundaryUrdu: "nummer ہندسے ہیں؛ telefoon آلہ ہے۔",
          commonConfusionUrdu: "نمبر دہرانا ہو تو nummer کہیں، telefoon نہیں۔",
          exampleDutch: "nummer — telefoon",
          exampleUrdu: "نمبر — فون۔",
          pronunciationUrdu: "نُمَر"
        },
        voicemail: {
          usageUrdu: "شخص فون نہ اٹھائے اور ریکارڈ شدہ پیغام سنائی دے تو اسے voicemail کہیں۔",
          usageBoundaryUrdu: "voicemail ریکارڈ شدہ فون پیغام ہے؛ براہ راست گفتگو نہیں۔",
          commonConfusionUrdu: "voicemail کو عام فون یا نمبر نہ سمجھیں؛ یہاں پیغام ریکارڈ ہوتا ہے۔",
          exampleDutch: "telefoon — voicemail",
          exampleUrdu: "فون — وائس میل۔",
          pronunciationUrdu: "وائس میل"
        },
        "met sara": {
          usageUrdu: "فون اٹھاتے وقت مختصر طور پر اپنی شناخت دینے کے لیے “met Sara” کہیں۔",
          usageBoundaryUrdu: "یہ بولنے والے کی شناخت ہے؛ wie spreekt er? دوسرے شخص کی شناخت پوچھتا ہے۔",
          commonConfusionUrdu: "فون پر met کے بعد اپنا نام دیں؛ سامنے والے کا نام نہیں۔",
          exampleDutch: "Met Sara.",
          exampleUrdu: "Sara بول رہی ہوں۔",
          pronunciationUrdu: "مَت سا را"
        },
        "wie spreekt er": {
          usageUrdu: "فون کرنے والے کی شناخت معلوم نہ ہو تو مؤدبانہ طور پر پوچھیں کون بول رہا ہے۔",
          usageBoundaryUrdu: "یہ بولنے والے کا نام پوچھتا ہے؛ نمبر یا وقت نہیں۔",
          commonConfusionUrdu: "فون پر spreekt استعمال کریں؛ عام شناخت والے لفظی ترجمے سے سوال نہ بنائیں۔",
          exampleDutch: "Wie spreekt er?",
          exampleUrdu: "کون بول رہا ہے؟",
          pronunciationUrdu: "وی سپرے کٹ اَر"
        },
        "kunt u later terugbellen": {
          usageUrdu: "ابھی بات ممکن نہ ہو تو سامنے والے سے بعد میں واپس فون کرنے کی درخواست کریں۔",
          usageBoundaryUrdu: "یہ سامنے والے سے واپسی کال مانگتا ہے؛ ik bel u vanavond terug اپنی کال کا وعدہ ہے۔",
          commonConfusionUrdu: "واپسی کال کی درخواست kunt u سے شروع ہوتی ہے؛ later وقت بتاتا ہے اور پورا عمل terugbellen آخر میں آتا ہے۔",
          exampleDutch: "Kunt u later terugbellen?",
          exampleUrdu: "کیا آپ بعد میں واپس فون کر سکتے ہیں؟",
          pronunciationUrdu: "کُنت یو لا تَر تَروخ بَ لَن"
        },
        "ik bel u vanavond terug": {
          usageUrdu: "خود آج شام واپس فون کرنے کا وعدہ دینا ہو تو یہ مکمل جملہ کہیں۔",
          usageBoundaryUrdu: "یہ اپنی آئندہ کال بتاتا ہے؛ سامنے والے سے درخواست نہیں۔",
          commonConfusionUrdu: "الگ ہونے والے فعل میں bel جملے کے اندر اور terug آخر میں رہتا ہے۔",
          exampleDutch: "Ik bel u vanavond terug.",
          exampleUrdu: "میں آپ کو آج شام واپس فون کروں گا یا گی۔",
          pronunciationUrdu: "اِک بَل یو فان آ وُنت تَروخ"
        },
        "u heeft het verkeerde nummer": {
          usageUrdu: "غلط نمبر پر کال آنے پر مؤدبانہ طور پر واضح کریں کہ نمبر غلط ہے۔",
          usageBoundaryUrdu: "یہ غلط نمبر بتاتا ہے؛ نمبر دہرانے کی درخواست نہیں۔",
          commonConfusionUrdu: "verkeerde نمبر کی صفت ہے؛ اسے telefoon کے بعد نہ رکھیں۔",
          exampleDutch: "U heeft het verkeerde nummer.",
          exampleUrdu: "آپ نے غلط نمبر ملایا ہے۔",
          pronunciationUrdu: "یو ہیفٹ ہَت فَر کیر دَ نُمَر"
        },
        "kunt u het nummer herhalen": {
          usageUrdu: "فون نمبر صاف سنائی نہ دے تو پورا نمبر دوبارہ کہنے کی درخواست کریں۔",
          usageBoundaryUrdu: "یہ نمبر دہرانے کے لیے ہے؛ پوری گفتگو دوبارہ مانگنے کا عمومی جملہ الگ ہے۔",
          commonConfusionUrdu: "het nummer herhalen پورا رکھیں تاکہ واضح ہو کہ نمبر دہرانا ہے۔",
          exampleDutch: "Kunt u het nummer herhalen?",
          exampleUrdu: "کیا آپ نمبر دہرا سکتے ہیں؟",
          pronunciationUrdu: "کُنت یو ہَت نُمَر ہیر ہا لَن"
        },
        "spreek een bericht in": {
          usageUrdu: "voicemail کی آواز کے بعد مختصر پیغام ریکارڈ کرنے کی ہدایت میں یہ بات سنائی دیتی ہے۔",
          usageBoundaryUrdu: "یہ پیغام بول کر ریکارڈ کرنے کی ہدایت ہے؛ زندہ شخص سے گفتگو نہیں۔",
          commonConfusionUrdu: "اس فون ہدایت میں spreek شروع میں اور in آخر میں آتا ہے۔",
          exampleDutch: "Spreek een bericht in.",
          exampleUrdu: "وائس میل پر پیغام بول دیں۔",
          pronunciationUrdu: "سپریک اَن بَ رِخت اِن"
        }
      },
      pattern: {
        modelDutch: "ik bel u vanavond terug",
        titleUrdu: "واپس فون والے الگ ہونے والے فعل کی ترتیب",
        highlight: "bel … terug",
        explanationUrdu: "terugbellen کے عام جملے میں bel شخص کے بعد آتا ہے اور terug آخر میں جاتا ہے: ik bel u vanavond terug۔",
        contrastUrdu: "سوال kunt u later terugbellen? میں پورا terugbellen آخر میں رہتا ہے؛ سیدھے جملے میں bel اور terug الگ ہوتے ہیں۔",
        commonMistakeUrdu: "ik terugbel u نہ کہیں؛ سیدھے جملے میں bel اندر اور terug آخر میں رکھیں۔"
      },
      independentCheckLeadUrdu: "پہلی مدد والی فون کال کے بعد دوسری کال میں",
      prerequisiteLessonIds: ["a0-understanding-help", "a0-address-phone", "a0-time-days", "a1-polite-chunks", "a1-plans-invitations"],
      prerequisiteRefs: [
        ["a0-understanding-help", "kunt u herhalen"],
        ["a0-address-phone", "telefoonnummer"],
        ["a0-time-days", "avond"],
        ["a1-polite-chunks", "kunt u mij helpen alstublieft?"],
        ["a1-plans-invitations", "sorry ik kan niet"]
      ],
      scenarios: {
        telefoon: ["phone-device", "رابطے کے آلے کا ڈچ لفظ پہچانیں۔"],
        nummer: ["phone-number", "فون کے ہندسوں کے لیے درست ڈچ لفظ پہچانیں۔"],
        voicemail: ["phone-voicemail", "فون نہیں اٹھا اور ریکارڈ شدہ آواز آئی۔ اس نظام کا درست لفظ چنیں۔"],
        "met sara": ["phone-answer-name", "Sara فون اٹھاتی ہیں۔ مختصر درست تعارف دیں۔"],
        "wie spreekt er": ["phone-ask-caller", "کال کرنے والے کی شناخت معلوم نہیں۔ کون بول رہا ہے پوچھیں۔"],
        "kunt u later terugbellen": ["phone-request-callback", "آپ ابھی بات نہیں کر سکتے۔ سامنے والے سے بعد میں واپس فون مانگیں۔"],
        "ik bel u vanavond terug": ["phone-promise-callback", "آپ خود آج شام واپس فون کریں گے۔ مکمل وعدہ کہیں۔"],
        "u heeft het verkeerde nummer": ["phone-wrong-number", "کال کسی اور شخص کے لیے ہے۔ مؤدبانہ طور پر غلط نمبر واضح کریں۔"],
        "kunt u het nummer herhalen": ["phone-repeat-number", "فون نمبر صاف سنائی نہیں دیا۔ صرف نمبر دوبارہ مانگیں۔"],
        "spreek een bericht in": ["phone-leave-voicemail", "voicemail پر ریکارڈ شدہ ہدایت پیغام بولنے کو کہتی ہے۔ درست بات چنیں۔"]
      },
      document: {
        stableId: "phone-read-callback-note",
        sourceKey: "phone-callback-note",
        documentKind: "phone-callback-note",
        targetDutch: "kunt u later terugbellen?",
        title: "Telefoon",
        labelUrdu: "فون واپس کرنے کا نوٹ پڑھیں",
        promptUrdu: "فون نوٹ میں “kunt u later terugbellen?” کے سامنے vanavond دیکھیں اور اس مکمل سوال کا درست اردو مطلب منتخب کریں۔",
        instructionUrdu: "فون نوٹ میں بولنے والے کا نام اور vanavond الگ دیکھیں، پھر لکھی ہوئی واپسی کال کی درخواست کا درست مطلب منتخب کریں۔",
        correctUrdu: "درست۔ “Kunt u later terugbellen?” بعد میں واپس فون کرنے کی مؤدبانہ درخواست ہے۔",
        wrongUrdu: "یہ دوسری فون بات ہے۔ نوٹ میں later terugbellen سامنے والے سے واپسی کال مانگتا ہے۔",
        rows: [
          { label: "met Sara", value: "voicemail" },
          { label: "kunt u later terugbellen?", value: "vanavond" }
        ]
      }
    },
    "a1-house-food-plurals": {
      title: "Kamers en dingen in huis",
      unitLabel: "A1: گھر، پڑوسی، مرمت اور مکان",
      outcomeUrdu: "گھر کے بنیادی کمرے اور چیزیں پہچاننا، ایک اور کئی چیزوں میں فرق سمجھنا، اور کسی چیز کی جگہ پوچھنا یا بتانا۔",
      seedConcepts: [
        ["het huis", "گھر"],
        ["kamer", "کمرہ"],
        ["het boek is in de kamer", "کتاب کمرے میں ہے"],
        ["keuken", "کچن"],
        ["badkamer", "باتھ روم"],
        ["tafel", "میز"],
        ["stoel", "کرسی"],
        ["boek", "کتاب"],
        ["boeken", "کتابیں"],
        ["waar is de tas?", "بیگ کہاں ہے؟"]
      ],
      teaching: authoredA1TeachingV4([
        ["het huis", "اپنے یا کسی معلوم گھر کی بات میں het huis استعمال کریں۔", "یہ پورا گھر ہے؛ kamer گھر کے اندر ایک کمرہ ہے۔", "huis کے ساتھ het آتا ہے، de نہیں۔", "Dit is het huis.", "یہ گھر ہے۔", "ہَت ہاؤس"],
        ["kamer", "گھر کے اندر ایک کمرہ پہچاننے یا بتانے کے لیے kamer کہیں۔", "kamer ایک حصہ ہے؛ پورے گھر کے لیے huis کہیں۔", "اس سبق میں ایک کمرے کے لیے kamer ہے؛ کئی کمروں کی شکل ابھی جواب میں نہ بنائیں۔", "Dit is een kamer.", "یہ ایک کمرہ ہے۔", "کا مَر"],
        ["het boek is in de kamer", "کتاب کی جگہ ایک مکمل جملے میں بتائیں۔", "in de kamer اندر کی جگہ بتاتا ہے؛ کمرے کی طرف حرکت نہیں۔", "is کو چھوڑ کر صرف het boek in de kamer نہ کہیں؛ مکمل جملے میں is ضروری ہے۔", "Het boek is in de kamer.", "کتاب کمرے میں ہے۔", "ہَت بوک اِس اِن دَ کامَر"],
        ["keuken", "کھانا بنانے والی جگہ پہچاننے کے لیے keuken کہیں۔", "یہ گھر کی جگہ ہے؛ کھانے کی چیز کا نام نہیں۔", "keuken کو kamer کے عمومی معنی کے بدلے ہر کمرے کے لیے استعمال نہ کریں۔", "Dit is de keuken.", "یہ کچن ہے۔", "کو کَن"],
        ["badkamer", "نہانے یا غسل خانے والی جگہ کے لیے badkamer کہیں۔", "یہ مخصوص کمرہ ہے؛ عام kamer سے زیادہ واضح ہے۔", "اسے صرف بیت الخلا کے معنی تک محدود نہ کریں؛ یہ پورا باتھ روم ہے۔", "Dit is de badkamer.", "یہ باتھ روم ہے۔", "بات کا مَر"],
        ["tafel", "گھر میں میز کی چیز پہچاننے کے لیے tafel کہیں۔", "یہ فرنیچر ہے؛ stoel بیٹھنے کی کرسی ہے۔", "tafel اور stoel کو نہ ملائیں: tafel میز، stoel کرسی ہے۔", "Het boek ligt op de tafel.", "کتاب میز پر ہے۔", "تا فَل"],
        ["stoel", "بیٹھنے والی کرسی پہچاننے کے لیے stoel کہیں۔", "یہ ایک کرسی ہے؛ میز کے لیے tafel کہیں۔", "stoel کی آواز کے شروع کو سٹول جیسا پڑھیں، سٹیل نہیں۔", "De stoel staat in de kamer.", "کرسی کمرے میں ہے۔", "ستول"],
        ["boek", "ایک کتاب کی بات میں boek کہیں۔", "یہ ایک چیز ہے؛ boeken ایک سے زیادہ کتابیں ہیں۔", "ایک کتاب کے جواب میں boeken نہ کہیں۔", "Dit is een boek.", "یہ ایک کتاب ہے۔", "بوک"],
        ["boeken", "ایک سے زیادہ کتابوں کی بات میں boeken کہیں۔", "یہ جمع ہے؛ ایک کتاب کے لیے boek کہیں۔", "آخر کے دو حروف جمع کا حصہ ہیں؛ انہیں چھوڑنے سے معنی ایک کتاب ہو جاتا ہے۔", "Twee boeken.", "دو کتابیں۔", "بو کَن"],
        ["waar is de tas", "بیگ نہ ملے تو اس کی جگہ پوچھنے کے لیے مکمل سوال کہیں۔", "یہ جگہ پوچھتا ہے؛ بیگ کی ملکیت یا تعداد نہیں۔", "سوال میں waar پہلے اور is اس کے بعد رکھیں۔", "Waar is de tas?", "بیگ کہاں ہے؟", "وار اِس دَ تاس"]
      ]),
      pattern: {
        modelDutch: "het boek is in de kamer",
        titleUrdu: "چیز کی جگہ بتانے والا مکمل جملہ",
        highlight: "het boek is in de kamer",
        explanationUrdu: "پہلے چیز، پھر is، اور آخر میں جگہ رکھیں: het boek is in de kamer۔",
        contrastUrdu: "waar is de tas? جگہ پوچھتا ہے؛ het boek is in de kamer جگہ کا جواب دیتا ہے۔",
        commonMistakeUrdu: "is کو نہ چھوڑیں؛ صرف het boek in de kamer مکمل ڈچ جملہ نہیں۔"
      },
      prerequisiteLessonIds: ["a0-een-de-het", "a0-numbers-0-10", "a0-dit-dat-questions", "a0-place-1", "a0-home-needs"],
      prerequisiteRefs: [
        ["a0-een-de-het", "het huis"],
        ["a0-een-de-het", "de man"],
        ["a0-numbers-0-10", "twee boeken"],
        ["a0-numbers-0-10", "twee"],
        ["a0-dit-dat-questions", "waar"],
        ["a0-dit-dat-questions", "dit is een boek"],
        ["a0-place-1", "in het huis"],
        ["a0-home-needs", "kamer"]
      ],
      scenarios: {
        "het huis": ["home-recognise-house", "تصویر میں پورا گھر پہچانیں، اندر کا ایک کمرہ نہیں۔"],
        kamer: ["home-recognise-room", "گھر کے نقشے میں ایک کمرہ نشان زد ہے۔ درست لفظ چنیں۔"],
        "het boek is in de kamer": ["home-locate-book", "کتاب سونے والے کمرے میں رکھی ہے۔ مکمل جگہ والا جملہ کہیں۔"],
        keuken: ["home-recognise-kitchen", "گھر کے نقشے میں کھانا بنانے والی جگہ پہچانیں۔"],
        badkamer: ["home-recognise-bathroom", "گھر کے نقشے میں نہانے والی جگہ پہچانیں۔"],
        tafel: ["home-recognise-table", "کتاب جس میز پر ہے اس چیز کا درست لفظ چنیں۔"],
        stoel: ["home-recognise-chair", "بیٹھنے والی چیز کا درست ڈچ لفظ چنیں۔"],
        boek: ["home-one-book", "تصویر میں ایک کتاب ہے۔ ایک والی شکل چنیں۔"],
        boeken: ["home-many-books", "تصویر میں دو کتابیں ہیں۔ جمع والی شکل چنیں۔"],
        "waar is de tas": ["home-ask-bag-location", "بیگ نظر نہیں آ رہا۔ اس کی جگہ مکمل سوال میں پوچھیں۔"]
      }
    },
    "a1-neighbour-talk": {
      title: "Met de buren praten",
      unitLabel: "A1: گھر، پڑوسی، مرمت اور مکان",
      outcomeUrdu: "پڑوسن کو سلام کہنا، مدد مانگنا، شور کے بارے میں مؤدبانہ بات کرنا، اور پارسل یا کچرے کی مختصر اطلاع سمجھنا۔",
      seedConcepts: [
        ["buurvrouw", "پڑوسن"],
        ["lawaai", "شور"],
        ["kunt u mij helpen?", "کیا آپ میری مدد کر سکتے ہیں؟"],
        ["pakket", "پارسل"],
        ["vuilnis", "کچرا"],
        ["ik heb last van lawaai", "مجھے شور سے پریشانی ہے"],
        ["kunt u zachter zijn?", "کیا آپ آواز کم کر سکتے ہیں؟"],
        ["er ligt een pakket voor u", "آپ کے لیے ایک پارسل رکھا ہے"]
      ],
      teaching: authoredA1TeachingV4([
        ["buurvrouw", "اپنے پاس رہنے والی عورت کی بات میں buurvrouw کہیں۔", "یہ عورت پڑوسی ہے؛ مرد پڑوسی کے لیے buurman ہے۔", "buurvrouw کو عام دوست یا گھر کی عورت کے معنی میں استعمال نہ کریں۔", "Goedemorgen, buurvrouw.", "صبح بخیر، پڑوسن۔", "بیور فراؤ"],
        ["lawaai", "تیز یا پریشان کرنے والی آواز کو lawaai کہیں۔", "یہ شور کا نام ہے؛ آواز کم کرنے کی درخواست الگ مکمل جملہ ہے۔", "lawaai کو خاموشی کے معنی میں نہ سمجھیں۔", "Geen lawaai.", "شور نہیں۔", "لا واے"],
        ["kunt u mij helpen", "پڑوسی سے مؤدبانہ مدد مانگنے کے لیے یہ مکمل سوال کہیں۔", "یہ مدد کی درخواست ہے؛ کسی خرابی کی تفصیل ابھی الگ بتانی ہوگی۔", "سوال میں kunt u پہلے اور helpen آخر میں رکھیں۔", "Kunt u mij helpen?", "کیا آپ میری مدد کر سکتے ہیں؟", "کُنت یو مَے ہَیل پَن"],
        ["pakket", "ڈاک یا ترسیل سے آنے والے پارسل کے لیے pakket کہیں۔", "یہ بند چیز ہے؛ عام خط یا کچرا نہیں۔", "پارسل کو کچرے کے ساتھ نہ ملائیں۔", "Dit is een pakket.", "یہ ایک پارسل ہے۔", "پا کَت"],
        ["vuilnis", "گھر سے باہر رکھنے والے کچرے کے لیے vuilnis کہیں۔", "یہ پھینکنے والی چیز ہے؛ پہنچایا ہوا pakket نہیں۔", "vuilnis کو صفائی کرنے کے عمل کے معنی میں نہ استعمال کریں۔", "Dit is vuilnis.", "یہ کچرا ہے۔", "فَؤل نِس"],
        ["ik heb last van lawaai", "شور آپ کو پریشان کرے تو الزام کے بغیر اپنی مشکل یہ مکمل جملہ کہہ کر بتائیں۔", "یہ اپنی پریشانی بتاتا ہے؛ آواز کم کرنے کی درخواست اگلا الگ جملہ ہے۔", "last van کو ساتھ رکھیں؛ صرف ik heb lawaai مطلوبہ معنی نہیں دیتا۔", "Ik heb last van lawaai.", "مجھے شور سے پریشانی ہے۔", "اِک ہَپ لاسٹ فان لا واے"],
        ["kunt u zachter zijn", "پڑوسی سے آواز کم کرنے کی مؤدبانہ درخواست کریں۔", "یہ آواز کم کرنے کو کہتا ہے؛ مکمل خاموشی یا مدد کا عمومی سوال نہیں۔", "zachter کو سوال کے آخر کے قریب رکھیں اور kunt u سے آغاز کریں۔", "Kunt u zachter zijn?", "کیا آپ آواز کم کر سکتے ہیں؟", "کُنت یو زاخ تَر زَین"],
        ["er ligt een pakket voor u", "پڑوسی کو بتائیں کہ ان کے لیے ایک پارسل رکھا ہے۔", "یہ موجود پارسل کی اطلاع ہے؛ پارسل مانگنے یا بھیجنے کی درخواست نہیں۔", "voor u پارسل کس کے لیے ہے بتاتا ہے؛ اسے شروع میں نہ رکھیں۔", "Er ligt een pakket voor u.", "آپ کے لیے ایک پارسل رکھا ہے۔", "اَر لِخت اَن پا کَت فور یو"]
      ]),
      pattern: {
        modelDutch: "kunt u mij helpen?",
        titleUrdu: "پڑوسی سے مؤدبانہ مدد مانگنا",
        highlight: "kunt u mij helpen",
        explanationUrdu: "ادب سے مدد مانگنے کے لیے kunt u سے شروع کریں، پھر mij اور آخر میں helpen رکھیں۔",
        contrastUrdu: "kunt u mij helpen? عمومی مدد مانگتا ہے؛ kunt u zachter zijn? شور کے بارے میں خاص درخواست ہے۔",
        commonMistakeUrdu: "سیدھے جملے جیسی ترتیب u kunt سے سوال شروع نہ کریں؛ یہاں kunt u کہیں۔"
      },
      prerequisiteLessonIds: ["a0-greetings-courtesy", "a0-understanding-help", "a1-polite-chunks"],
      prerequisiteRefs: [
        ["a0-greetings-courtesy", "goedemorgen"],
        ["a0-greetings-courtesy", "dank u wel"],
        ["a0-geen", "geen boek"],
        ["a0-understanding-help", "kunt u mij helpen"],
        ["a0-dit-dat-questions", "dit is een boek"],
        ["a1-polite-chunks", "alstublieft"]
      ],
      scenarios: {
        buurvrouw: ["neighbour-recognise-woman", "ساتھ والے گھر میں رہنے والی عورت کا درست لفظ چنیں۔"],
        lawaai: ["neighbour-recognise-noise", "رات کو تیز آواز آ رہی ہے۔ شور کا درست لفظ پہچانیں۔"],
        "kunt u mij helpen": ["neighbour-ask-help", "پڑوسن سے مؤدبانہ مدد مانگیں۔"],
        pakket: ["neighbour-recognise-package", "دروازے پر پہنچایا ہوا بند پارسل پہچانیں۔"],
        vuilnis: ["neighbour-recognise-rubbish", "باہر رکھنے والے گھر کے کچرے کا لفظ چنیں۔"],
        "ik heb last van lawaai": ["neighbour-report-noise", "رات کے شور سے پریشانی ہے۔ اپنی مشکل نرم انداز میں بتائیں۔"],
        "kunt u zachter zijn": ["neighbour-request-quiet", "پڑوسی سے مؤدبانہ طور پر آواز کم کرنے کو کہیں۔"],
        "er ligt een pakket voor u": ["neighbour-package-message", "پڑوسی کے لیے پارسل آپ کے پاس رکھا ہے۔ مختصر اطلاع دیں۔"]
      }
    },
    "a1-home-repairs": {
      title: "Een reparatie melden",
      unitLabel: "A1: گھر، پڑوسی، مرمت اور مکان",
      outcomeUrdu: "گھر کی خرابی واضح کرنا، مرمت کرنے والا شخص مانگنا، اس کے آنے کا وقت پوچھنا، اور مسئلہ حل ہونے کی تصدیق کرنا۔",
      seedConcepts: [
        ["verwarming", "ہیٹنگ"],
        ["kapot", "خراب"],
        ["de verwarming doet het niet", "ہیٹنگ کام نہیں کر رہی"],
        ["warm water", "گرم پانی"],
        ["monteur", "مرمت کرنے والا"],
        ["de lamp is kapot", "بتی خراب ہے"],
        ["kunt u iemand sturen?", "کیا آپ کسی کو بھیج سکتے ہیں؟"],
        ["wanneer komt de monteur?", "مرمت کرنے والا کب آئے گا؟"],
        ["het probleem is opgelost", "مسئلہ حل ہو گیا ہے"]
      ],
      teaching: authoredA1TeachingV4([
        ["verwarming", "گھر گرم کرنے والے نظام کے لیے verwarming کہیں۔", "یہ پورا حرارتی نظام ہے؛ warm water صرف گرم پانی ہے۔", "verwarming کو عام گرمی یا موسم کے معنی میں نہ لیں۔", "De verwarming is aan.", "ہیٹنگ چل رہی ہے۔", "فَر وار مِنگ"],
        ["kapot", "کوئی چیز کام نہ کرے یا ٹوٹی ہو تو kapot کہیں۔", "یہ خرابی کی کیفیت ہے؛ مسئلہ حل ہونے کے لیے opgelost آتا ہے۔", "kapot کو چیز کے نام کے بدلے نہ کہیں؛ چیز بھی واضح کریں۔", "De lamp is kapot.", "بتی خراب ہے۔", "کا پوت"],
        ["de verwarming doet het niet", "ہیٹنگ کام نہ کرے تو مالک مکان یا مرمت والے کو یہ مکمل خرابی بتائیں۔", "یہ خاص طور پر ہیٹنگ کے کام نہ کرنے کی اطلاع ہے؛ گرم پانی الگ مسئلہ ہو سکتا ہے۔", "niet کو آخر میں رکھیں؛ de verwarming niet doet het غلط ترتیب ہے۔", "De verwarming doet het niet.", "ہیٹنگ کام نہیں کر رہی۔", "دَ فَر وار مِنگ دوت ہَت نیت"],
        ["warm water", "نل یا غسل کے پانی کے گرم ہونے کی بات میں warm water کہیں۔", "یہ پانی کی کیفیت ہے؛ verwarming گھر گرم کرنے کا نظام ہے۔", "warm اور water کو الگ مفہوم سمجھ کر ترتیب نہ بدلیں۔", "Geen warm water.", "گرم پانی نہیں۔", "وارم وا تَر"],
        ["monteur", "خرابی دیکھنے یا مرمت کرنے والے شخص کے لیے monteur کہیں۔", "یہ کام کرنے والا شخص ہے؛ reparatie کام کا نام ہے۔", "monteur کو مالک مکان کے معنی میں نہ استعمال کریں۔", "Dit is de monteur.", "یہ مرمت کرنے والا ہے۔", "مون تَور"],
        ["de lamp is kapot", "روشنی والی بتی خراب ہو تو چیز اور کیفیت دونوں مکمل جملے میں بتائیں۔", "یہ بتی کی خرابی ہے؛ ہیٹنگ کے لیے الگ جملہ ہے۔", "is کو نہ چھوڑیں؛ de lamp kapot مکمل جملہ نہیں۔", "De lamp is kapot.", "بتی خراب ہے۔", "دَ لامپ اِس کا پوت"],
        ["kunt u iemand sturen", "خرابی بتانے کے بعد کسی مرمت والے کو بھیجنے کی مؤدبانہ درخواست کریں۔", "یہ کسی شخص کو بھیجنے کی درخواست ہے؛ آنے کا وقت نہیں پوچھتا۔", "kunt u کے بعد جسے بھیجنا ہے iemand اور پھر عمل sturen آتا ہے۔", "Kunt u iemand sturen?", "کیا آپ کسی کو بھیج سکتے ہیں؟", "کُنت یو ایمانٹ ستیورَن"],
        ["wanneer komt de monteur", "مرمت والا کس وقت یا دن آئے گا یہ پوچھنے کے لیے سوال کہیں۔", "یہ آنے کا وقت پوچھتا ہے؛ کسی کو بھیجنے کی درخواست پہلے الگ ہو سکتی ہے۔", "wanneer سوال کے شروع میں رکھیں اور komt اس کے بعد۔", "Wanneer komt de monteur?", "مرمت کرنے والا کب آئے گا؟", "وا نیر کومت دَ مون تَور"],
        ["het probleem is opgelost", "مرمت کے بعد مسئلہ ختم ہو جائے تو اس کی مکمل تصدیق کریں۔", "یہ حل ہونے کی حالت ہے؛ kapot ابھی خراب ہونے کی حالت ہے۔", "opgelost کو مرمت والے شخص کے نام کے طور پر نہ لیں۔", "Het probleem is opgelost.", "مسئلہ حل ہو گیا ہے۔", "ہَت پرو بلیم اِس اوپ خَ لوست"]
      ]),
      pattern: {
        modelDutch: "de verwarming doet het niet",
        titleUrdu: "کسی نظام کے کام نہ کرنے کی اطلاع",
        highlight: "doet het niet",
        explanationUrdu: "چیز کے نام کے بعد doet het niet رکھ کر کہیں کہ وہ کام نہیں کر رہی: de verwarming doet het niet۔",
        contrastUrdu: "de lamp is kapot چیز کی خراب حالت بتاتا ہے؛ de verwarming doet het niet کام نہ کرنے کی مکمل اطلاع ہے۔",
        commonMistakeUrdu: "niet کو doet سے پہلے نہ رکھیں؛ مکمل حصہ doet het niet اسی ترتیب میں کہیں۔"
      },
      prerequisiteLessonIds: ["a0-home-needs", "a0-understanding-help", "a1-neighbour-talk"],
      prerequisiteRefs: [
        ["a0-home-needs", "deur"],
        ["a0-home-needs", "de kamer is koud"],
        ["a0-understanding-help", "kunt u mij helpen"],
        ["a0-een-de-het", "de man"],
        ["a0-geen", "geen boek"],
        ["a0-dit-dat-questions", "dit is een boek"],
        ["a1-neighbour-talk", "kunt u mij helpen?"]
      ],
      scenarios: {
        verwarming: ["repair-recognise-heating", "گھر گرم کرنے والا نظام پہچانیں۔"],
        kapot: ["repair-recognise-broken", "چیز کام نہیں کر رہی۔ خراب کیفیت کا لفظ چنیں۔"],
        "de verwarming doet het niet": ["repair-report-heating", "گھر ٹھنڈا ہے اور ہیٹنگ نہیں چلتی۔ مکمل خرابی بتائیں۔"],
        "warm water": ["repair-recognise-hot-water", "نل سے صرف ٹھنڈا پانی آتا ہے۔ مطلوبہ گرم پانی کی بات پہچانیں۔"],
        monteur: ["repair-recognise-worker", "خرابی دیکھنے آنے والے شخص کا درست لفظ چنیں۔"],
        "de lamp is kapot": ["repair-report-lamp", "کمرے کی بتی نہیں جلتی۔ مکمل خرابی بتائیں۔"],
        "kunt u iemand sturen": ["repair-request-worker", "مالک مکان سے کسی مرمت والے کو بھیجنے کی درخواست کریں۔"],
        "wanneer komt de monteur": ["repair-ask-arrival", "مرمت والا مقرر ہے مگر وقت معلوم نہیں۔ آنے کا وقت پوچھیں۔"],
        "het probleem is opgelost": ["repair-confirm-solved", "مرمت کے بعد سب کام کر رہا ہے۔ مسئلہ حل ہونے کی تصدیق کریں۔"]
      }
    },
    "a1-cleaning-house": {
      title: "Schoonmaken thuis",
      unitLabel: "A1: گھر، پڑوسی، مرمت اور مکان",
      outcomeUrdu: "گھر کے ضروری صفائی کام پہچاننا اور آج کمرہ صاف کرنے، کپڑے دھونے، یا کسی جگہ کے صاف یا گندا ہونے کی مختصر بات کہنا۔",
      seedConcepts: [
        ["schoonmaken", "صفائی کرنا"],
        ["was", "دھلائی"],
        ["ik moet de kamer schoonmaken", "مجھے کمرہ صاف کرنا ہے"],
        ["stofzuiger", "ویکیوم"],
        ["ik doe vandaag de was", "میں آج کپڑے دھوتا یا دھوتی ہوں"],
        ["de keuken is schoon", "کچن صاف ہے"],
        ["de badkamer is vies", "باتھ روم گندا ہے"]
      ],
      teaching: authoredA1TeachingV4([
        ["schoonmaken", "کمرہ، کچن، یا گھر صاف کرنے کے عمل کے لیے schoonmaken کہیں۔", "یہ کام کا نام ہے؛ صاف ہونا ایک حالت ہے۔", "صفائی کے عمل اور صاف حالت کو ایک ہی جگہ استعمال نہ کریں۔", "Vandaag schoonmaken.", "آج صفائی کرنا۔", "سخون ما کَن"],
        ["was", "دھونے والے کپڑوں یا کپڑے دھونے کے کام کے لیے de was کہیں۔", "یہ کپڑوں کی دھلائی ہے؛ گھر کی عمومی صفائی نہیں۔", "was کو ماضی والے فعل کے طور پر نہ پڑھیں؛ اس صورت حال میں دھلائی مراد ہے۔", "De was.", "کپڑوں کی دھلائی۔", "واس"],
        ["ik moet de kamer schoonmaken", "کمرہ صاف کرنا ضروری ہو تو اپنی ذمہ داری مکمل جملے میں کہیں۔", "moet ضرورت بتاتا ہے؛ کام مکمل ہو چکا ہو یہ نہیں کہتا۔", "schoonmaken کو آخر میں رکھیں؛ ik moet schoonmaken de kamer نہ کہیں۔", "Ik moet de kamer schoonmaken.", "مجھے کمرہ صاف کرنا ہے۔", "اِک موت دَ کا مَر سخون ما کَن"],
        ["stofzuiger", "فرش صاف کرنے والی ویکیوم مشین کے لیے stofzuiger کہیں۔", "یہ صفائی کا آلہ ہے؛ schoonmaken پورا کام ہے۔", "stofzuiger کو جھاڑو یا کپڑے دھونے کے آلے کے معنی میں نہ لیں۔", "De stofzuiger.", "ویکیوم مشین۔", "ستوف زاؤ خَر"],
        ["ik doe vandaag de was", "آج کپڑے دھونے کا منصوبہ یا کام بتانے کے لیے یہ مکمل جملہ کہیں۔", "یہ آج کا دھلائی کام ہے؛ کمرہ صاف کرنے کی بات الگ ہے۔", "vandaag کو doe اور de was کے درمیان رکھیں۔", "Ik doe vandaag de was.", "میں آج کپڑے دھوتا یا دھوتی ہوں۔", "اِک دو فان داخ دَ واس"],
        ["de keuken is schoon", "صفائی کے بعد کچن کی صاف حالت مکمل جملے میں بتائیں۔", "schoon صاف حالت ہے؛ schoonmaken صفائی کا عمل ہے۔", "is کو نہ چھوڑیں؛ de keuken schoon مکمل جملہ نہیں۔", "De keuken is schoon.", "کچن صاف ہے۔", "دَ کو کَن اِس سخون"],
        ["de badkamer is vies", "باتھ روم گندا ہو تو اس کی حالت مکمل جملے میں بتائیں۔", "vies گندی حالت ہے؛ schoon اس کا صاف مقابل ہے۔", "schoon اور vies کے معنی الٹ نہ کریں۔", "De badkamer is vies.", "باتھ روم گندا ہے۔", "دَ بات کا مَر اِس فیس"]
      ]),
      pattern: {
        modelDutch: "ik moet de kamer schoonmaken",
        titleUrdu: "ضروری گھر کا کام بتانا",
        highlight: "ik moet de kamer schoonmaken",
        explanationUrdu: "ضرورت بتانے کے لیے ik moet سے شروع کریں، پھر چیز یا جگہ اور آخر میں کام رکھیں۔",
        contrastUrdu: "ik moet de kamer schoonmaken ضروری کام بتاتا ہے؛ de keuken is schoon مکمل صاف حالت بتاتا ہے۔",
        commonMistakeUrdu: "کام schoonmaken کو kamer سے پہلے نہ رکھیں؛ اس نمونے میں یہ آخر میں آتا ہے۔"
      },
      prerequisiteLessonIds: ["a0-time-days", "a1-house-food-plurals", "a1-home-repairs"],
      prerequisiteRefs: [
        ["a0-time-days", "vandaag"],
        ["a0-een-de-het", "de man"],
        ["a1-house-food-plurals", "kamer"],
        ["a1-house-food-plurals", "keuken"],
        ["a1-house-food-plurals", "badkamer"],
        ["a1-home-repairs", "het probleem is opgelost"]
      ],
      scenarios: {
        schoonmaken: ["cleaning-recognise-task", "گھر صاف کرنے کے عمل کا درست لفظ چنیں۔"],
        was: ["cleaning-recognise-laundry", "کپڑے دھونے والے کام کا مختصر لفظ پہچانیں۔"],
        "ik moet de kamer schoonmaken": ["cleaning-room-duty", "کمرہ گندا ہے اور آج اسے صاف کرنا ضروری ہے۔ مکمل ذمہ داری کہیں۔"],
        stofzuiger: ["cleaning-recognise-vacuum", "فرش صاف کرنے والی مشین پہچانیں۔"],
        "ik doe vandaag de was": ["cleaning-laundry-today", "آج کپڑے دھونے کا کام ہے۔ مکمل روزمرہ جملہ کہیں۔"],
        "de keuken is schoon": ["cleaning-kitchen-clean", "صفائی کے بعد کچن کی حالت بتائیں۔"],
        "de badkamer is vies": ["cleaning-bathroom-dirty", "باتھ روم ابھی گندا ہے۔ مکمل حالت بتائیں۔"]
      }
    },
    "a1-house-search-extra": {
      title: "Een woning zoeken en bekijken",
      unitLabel: "A1: گھر، پڑوسی، مرمت اور مکان",
      outcomeUrdu: "مکان کا مختصر اشتہار پڑھنا، کرایہ، کمروں اور دستیابی کے بارے میں پوچھنا، اور گھر دیکھنے کا وقت مانگنا۔",
      seedConcepts: [
        ["woning", "مکان"],
        ["huur", "کرایہ"],
        ["ik zoek een woning", "میں مکان تلاش کر رہا یا رہی ہوں"],
        ["beschikbaar", "دستیاب"],
        ["bezichtiging", "گھر دیکھنے کا وقت"],
        ["hoeveel is de huur?", "کرایہ کتنا ہے؟"],
        ["heeft de woning twee kamers?", "کیا مکان میں دو کمرے ہیں؟"],
        ["wanneer is de woning beschikbaar?", "مکان کب دستیاب ہے؟"],
        ["kan ik de woning bekijken?", "کیا میں مکان دیکھ سکتا یا سکتی ہوں؟"],
        ["is er een tuin?", "کیا باغ ہے؟"]
      ],
      teaching: authoredA1TeachingV4([
        ["woning", "اشتہار یا کرایے کی گفتگو میں رہنے کی جگہ کے لیے woning کہیں۔", "یہ رہائش کا پورا مکان ہے؛ صرف ایک کمرہ نہیں۔", "مکان اور کمرے کو ایک ہی معنی نہ دیں۔", "Dit is een woning.", "یہ ایک مکان ہے۔", "وو نِنگ"],
        ["huur", "ہر ماہ مکان کے لیے ادا کی جانے والی رقم کو huur کہیں۔", "یہ کرایہ ہے؛ مکان کی خرید قیمت نہیں۔", "huur کو گھر دیکھنے کے وقت bezichtiging کے معنی میں نہ لیں۔", "Huur: 800 euro.", "کرایہ: 800 یورو۔", "ہیور"],
        ["ik zoek een woning", "اپنی رہائش کی ضرورت بتانے کے لیے یہ مکمل جملہ کہیں۔", "یہ تلاش بتاتا ہے؛ کوئی خاص مکان پسند ہونے یا دیکھنے کا وقت نہیں۔", "zoek کے بعد een woning رکھیں؛ ik een woning zoek اس سبق کی سیدھی ترتیب نہیں۔", "Ik zoek een woning.", "میں مکان تلاش کر رہا یا رہی ہوں۔", "اِک زوک اَن وو نِنگ"],
        ["beschikbaar", "جو مکان ابھی یا کسی تاریخ سے مل سکتا ہو اسے beschikbaar کہیں۔", "یہ دستیابی ہے؛ خالی کمروں کی تعداد نہیں۔", "beschikbaar کو سستا یا مناسب کے معنی میں نہ سمجھیں۔", "Maandag beschikbaar.", "پیر سے دستیاب۔", "بَس خِک بار"],
        ["bezichtiging", "مکان اندر سے دیکھنے کے مقرر وقت کو bezichtiging کہیں۔", "یہ گھر دیکھنے کی ملاقات ہے؛ کرایہ یا مرمت نہیں۔", "bezichtiging کو عام تصویر دیکھنے کے معنی میں نہ لیں۔", "Bezichtiging: maandag.", "گھر دیکھنے کا وقت: پیر۔", "بَ زِخ تِ خِنگ"],
        ["hoeveel is de huur", "اشتہار میں رقم واضح نہ ہو تو کرایہ پوچھنے کے لیے یہ سوال کہیں۔", "hoeveel رقم پوچھتا ہے؛ wanneer دستیابی کا وقت پوچھتا ہے۔", "قیمت کے سوال میں hoeveel پہلے رکھیں۔", "Hoeveel is de huur?", "کرایہ کتنا ہے؟", "ہو فیل اِس دَ ہیور"],
        ["heeft de woning twee kamers", "مکان میں دو کمرے ہونے کی تصدیق کے لیے یہ سوال پوچھیں۔", "یہ کمروں کی تعداد پوچھتا ہے؛ باغ یا کرایہ نہیں۔", "ہاں یا نہیں سوال میں heeft پہلے اور de woning بعد میں رکھیں۔", "Heeft de woning twee kamers?", "کیا مکان میں دو کمرے ہیں؟", "ہیفٹ دَ وو نِنگ توے کا مَرس"],
        ["wanneer is de woning beschikbaar", "مکان کس دن یا وقت سے مل سکتا ہے یہ پوچھیں۔", "یہ دستیابی کا وقت ہے؛ گھر دیکھنے کی اجازت الگ سوال ہے۔", "wanneer کو شروع میں اور beschikbaar کو آخر میں رکھیں۔", "Wanneer is de woning beschikbaar?", "مکان کب دستیاب ہے؟", "وا نیر اِس دَ وو نِنگ بَس خِک بار"],
        ["kan ik de woning bekijken", "اشتہار پسند آنے کے بعد مکان اندر سے دیکھنے کی اجازت مانگیں۔", "یہ دیکھنے کی درخواست ہے؛ bezichtiging مقرر ہونے کی تصدیق نہیں۔", "سوال میں kan ik سے شروع کریں اور bekijken آخر میں رکھیں۔", "Kan ik de woning bekijken?", "کیا میں مکان دیکھ سکتا یا سکتی ہوں؟", "کان اِک دَ وو نِنگ بَ کَی کَن"],
        ["is er een tuin", "مکان کے ساتھ باغ ہونے کی تصدیق کے لیے مختصر سوال پوچھیں۔", "یہ باغ کی موجودگی پوچھتا ہے؛ کمروں کی تعداد نہیں۔", "وجود کے سوال میں is er سے شروع کریں۔", "Is er een tuin?", "کیا باغ ہے؟", "اِس اَر اَن تاؤن"]
      ]),
      pattern: {
        modelDutch: "ik zoek een woning",
        titleUrdu: "اپنی رہائش کی ضرورت واضح کرنا",
        highlight: "ik zoek een woning",
        explanationUrdu: "تلاش بتانے کے لیے ik کے بعد zoek اور آخر میں ایک woning رکھیں۔",
        contrastUrdu: "ik zoek een woning اپنی ضرورت بتاتا ہے؛ kan ik de woning bekijken? کسی خاص مکان کو دیکھنے کی اجازت مانگتا ہے۔",
        commonMistakeUrdu: "zoek کو جملے کے آخر میں نہ بھیجیں؛ سیدھی بات میں ik zoek سے آغاز کریں۔"
      },
      prerequisiteLessonIds: ["a0-numbers-0-10", "a0-date-appointment", "a1-house-food-plurals", "a1-appointments"],
      prerequisiteRefs: [
        ["a0-numbers-0-10", "twee"],
        ["a0-date-appointment", "afspraak"],
        ["a0-een-de-het", "de man"],
        ["a0-dit-dat-questions", "dit is een boek"],
        ["a0-time-days", "maandag"],
        ["a0-numbers-0-10", "vier euro"],
        ["a1-house-food-plurals", "kamer"],
        ["a1-house-food-plurals", "het huis"],
        ["a1-appointments", "heeft u vandaag tijd?"]
      ],
      scenarios: {
        woning: ["housing-recognise-home", "کرایے کے اشتہار میں رہنے کے مکان کا لفظ پہچانیں۔"],
        huur: ["housing-recognise-rent", "اشتہار میں ہر ماہ ادا ہونے والی رقم کا لفظ چنیں۔"],
        "ik zoek een woning": ["housing-state-search", "رہائش کے دفتر میں اپنی ضرورت مکمل جملے میں بتائیں۔"],
        beschikbaar: ["housing-recognise-available", "اشتہار بتاتا ہے کہ مکان اگلے ماہ سے مل سکتا ہے۔ دستیابی کا لفظ چنیں۔"],
        bezichtiging: ["housing-recognise-viewing", "مکان اندر سے دیکھنے کے مقرر وقت کا لفظ پہچانیں۔"],
        "hoeveel is de huur": ["housing-ask-rent", "اشتہار میں رقم واضح نہیں۔ ماہانہ کرایہ پوچھیں۔"],
        "heeft de woning twee kamers": ["housing-ask-rooms", "خاندان کے لیے دو کمروں کی ضرورت ہے۔ تعداد کی تصدیق کریں۔"],
        "wanneer is de woning beschikbaar": ["housing-ask-availability", "نیا مکان کس تاریخ سے مل سکتا ہے یہ پوچھیں۔"],
        "kan ik de woning bekijken": ["housing-request-viewing", "اشتہار مناسب لگتا ہے۔ مکان دیکھنے کی اجازت مانگیں۔"],
        "is er een tuin": ["housing-ask-garden", "مکان کے ساتھ باغ ہونے کی تصدیق کریں۔"]
      },
      document: {
        stableId: "housing-read-listing",
        sourceKey: "housing-listing-card",
        documentKind: "housing-listing-card",
        targetDutch: "wanneer is de woning beschikbaar?",
        title: "Woning",
        labelUrdu: "مکان کا مختصر اشتہار پڑھیں",
        promptUrdu: "اشتہار میں beschikbaar اور maandag دیکھیں، پھر مکان کی دستیابی کا وقت پوچھنے والے مکمل سوال کا درست اردو مطلب منتخب کریں۔",
        instructionUrdu: "اشتہار میں huur، kamers، اور beschikbaar کی قطاریں الگ پڑھیں، پھر دستیابی پوچھنے والے سیکھی ہوئی سوال کا مطلب منتخب کریں۔",
        correctUrdu: "درست۔ “Wanneer is de woning beschikbaar?” پوچھتا ہے کہ مکان کب دستیاب ہے۔",
        wrongUrdu: "یہ دوسری مکان والی بات ہے۔ wanneer اور beschikbaar مل کر دستیابی کا وقت پوچھتے ہیں۔",
        rows: [
          { label: "huur", value: "hoeveel is de huur?" },
          { label: "kamers", value: "heeft de woning twee kamers?" },
          { label: "beschikbaar", value: "wanneer is de woning beschikbaar?" }
        ]
      }
    },
    "a1-supermarket": {
      title: "Boodschappen doen",
      unitLabel: "A1: کھانا، خریداری، واپسی اور ادائیگی",
      outcomeUrdu: "خریداری کی مختصر فہرست سمجھنا، چیز کی جگہ اور قیمت پوچھنا، اور کاؤنٹر پر بیگ یا رسید مانگنا۔",
      seedConcepts: [
        ["brood", "روٹی"], ["melk", "دودھ"], ["groente", "سبزیاں"], ["fruit", "پھل"],
        ["ik zoek melk", "میں دودھ تلاش کر رہا یا رہی ہوں"],
        ["waar ligt de rijst?", "چاول کہاں رکھے ہیں؟"],
        ["hoeveel kost dit brood?", "یہ روٹی کتنے کی ہے؟"],
        ["mag ik een tas?", "کیا مجھے ایک بیگ مل سکتا ہے؟"],
        ["de kassa is daar", "کاؤنٹر وہاں ہے"]
      ],
      teaching: authoredA1TeachingV4([
        ["brood", "فہرست یا دکان میں روٹی تلاش کرنے کے لیے brood پہچانیں۔", "یہ روٹی ہے؛ melk دودھ اور rijst چاول ہیں۔", "brood کو تمام کھانے کے عمومی لفظ کے طور پر نہ استعمال کریں۔", "Ik koop brood.", "میں روٹی خریدتا یا خریدتی ہوں۔", "بروت"],
        ["melk", "دودھ کی بوتل یا پیکٹ ڈھونڈنے کے لیے melk کہیں۔", "یہ پینے کی سفید چیز ہے؛ water پانی ہے۔", "melk اور meel کی ملتی آواز سے معنی نہ بدلیں۔", "Ik zoek melk.", "میں دودھ تلاش کر رہا یا رہی ہوں۔", "مَیلک"],
        ["groente", "سبزیوں والے حصے یا فہرست میں groente پہچانیں۔", "یہ سبزیوں کی قسم ہے؛ fruit پھل ہے۔", "groente اور fruit کو ایک ہی دکان والے حصے کے باوجود نہ ملائیں۔", "De groente is hier.", "سبزی یہاں ہے۔", "خُرون تَ"],
        ["fruit", "پھلوں والے حصے یا خریداری کی فہرست میں fruit کہیں۔", "یہ پھل ہے؛ groente سبزی ہے۔", "fruit کی ڈچ آواز کو انگریزی تلفظ کے مطابق نہ پڑھیں۔", "Ik koop fruit.", "میں پھل خریدتا یا خریدتی ہوں۔", "فراؤٹ"],
        ["ik zoek melk", "ملازم کو بتائیں کہ آپ دودھ تلاش کر رہے ہیں۔", "یہ تلاش کی اطلاع ہے؛ چیز کہاں ہے پوچھنے والا سوال الگ ہے۔", "zoek کو جملے کے آخر میں نہ بھیجیں؛ ik zoek سے شروع کریں۔", "Ik zoek melk.", "میں دودھ تلاش کر رہا یا رہی ہوں۔", "اِک زوک مَیلک"],
        ["waar ligt de rijst", "چاول نہ ملیں تو ان کی جگہ مکمل سوال میں پوچھیں۔", "waar جگہ پوچھتا ہے؛ hoeveel قیمت پوچھتا ہے۔", "چیز کی جگہ پوچھتے وقت waar پہلے اور ligt اس کے بعد رکھیں۔", "Waar ligt de rijst?", "چاول کہاں رکھے ہیں؟", "وار لِخت دَ رَیسٹ"],
        ["hoeveel kost dit brood", "روٹی کی قیمت معلوم نہ ہو تو یہ مکمل سوال کہیں۔", "hoeveel kost قیمت پوچھتا ہے؛ چیز کی جگہ نہیں۔", "قیمت کے سوال میں hoeveel پہلے اور kost اس کے بعد رکھیں۔", "Hoeveel kost dit brood?", "یہ روٹی کتنے کی ہے؟", "ہو فیل کوست دِت بروت"],
        ["mag ik een tas", "کاؤنٹر پر سامان رکھنے کے لیے ایک بیگ مؤدبانہ طور پر مانگیں۔", "یہ بیگ کی درخواست ہے؛ رسید کے لیے bon مانگیں۔", "سوال میں mag ik سے شروع کریں اور een tas آخر میں رکھیں۔", "Mag ik een tas?", "کیا مجھے ایک بیگ مل سکتا ہے؟", "ماخ اِک اَن تاس"],
        ["de kassa is daar", "ملازم کاؤنٹر کی جگہ بتائے تو اس مکمل جواب کو سمجھیں یا کہیں۔", "daar وہاں کی جگہ بتاتا ہے؛ hier یہاں بتاتا ہے۔", "is کو نہ چھوڑیں؛ de kassa daar مکمل جملہ نہیں۔", "De kassa is daar.", "کاؤنٹر وہاں ہے۔", "دَ کاسا اِس دار"]
      ]),
      pattern: {
        modelDutch: "ik zoek melk", titleUrdu: "دکان میں مطلوبہ چیز بتانا", highlight: "ik zoek melk",
        explanationUrdu: "دکان میں تلاش بتانے کے لیے ik کے بعد zoek اور آخر میں چیز رکھیں۔",
        contrastUrdu: "ik zoek melk اپنی ضرورت بتاتا ہے؛ waar ligt de rijst? کسی چیز کی جگہ پوچھتا ہے۔",
        commonMistakeUrdu: "سیدھی بات میں zoek کو آخر میں نہ رکھیں؛ ik zoek سے آغاز کریں۔"
      },
      prerequisiteLessonIds: ["a0-food-drink", "a0-shopping-payment", "a0-dit-dat-questions"],
      prerequisiteRefs: [["a0-food-drink", "brood"], ["a0-food-drink", "melk"], ["a0-food-drink", "groente"], ["a0-food-drink", "fruit"], ["a0-shopping-payment", "kassa"], ["a0-dit-dat-questions", "waar"]],
      scenarios: {
        brood: ["market-list-bread", "خریداری کی فہرست میں روٹی پہچانیں۔"], melk: ["market-find-milk", "دودھ کا پیکٹ تلاش کریں۔"],
        groente: ["market-find-vegetables", "سبزیوں والا حصہ پہچانیں۔"], fruit: ["market-find-fruit", "پھلوں والا حصہ پہچانیں۔"],
        "ik zoek melk": ["market-tell-search", "ملازم کو بتائیں کہ آپ دودھ تلاش کر رہے ہیں۔"],
        "waar ligt de rijst": ["market-ask-rice", "چاول نظر نہیں آ رہے۔ جگہ پوچھیں۔"],
        "hoeveel kost dit brood": ["market-ask-bread-price", "روٹی پر قیمت نہیں لکھی۔ قیمت پوچھیں۔"],
        "mag ik een tas": ["market-request-bag", "کاؤنٹر پر سامان کے لیے بیگ مانگیں۔"],
        "de kassa is daar": ["market-locate-checkout", "ملازم کاؤنٹر کی جگہ وہاں بتاتا ہے۔ مکمل جواب چنیں۔"]
      },
      document: {
        stableId: "supermarket-list-price-card", sourceKey: "supermarket-list-price-card", documentKind: "shopping-list-price-card",
        targetDutch: "hoeveel kost dit brood?", title: "brood", labelUrdu: "خریداری کی فہرست اور قیمت پڑھیں",
        promptUrdu: "فہرست میں brood اور قیمت کی خالی جگہ دیکھیں، پھر روٹی کی قیمت پوچھنے والے مکمل سوال کا درست مطلب منتخب کریں۔",
        instructionUrdu: "فہرست میں brood، melk، groente، اور fruit الگ پڑھیں، پھر قیمت نہ لکھی ہونے پر مناسب سیکھی ہوئی سوال چنیں۔",
        correctUrdu: "درست۔ hoeveel kost dit brood? روٹی کی قیمت پوچھتا ہے۔", wrongUrdu: "یہ دوسری خریداری کی بات ہے۔ hoeveel kost قیمت کے بارے میں پوچھتا ہے۔",
        rows: [{ label: "brood", value: "hoeveel kost dit brood?" }, { label: "melk", value: "ik zoek melk" }, { label: "groente", value: "groente" }, { label: "fruit", value: "fruit" }]
      }
    },
    "a1-cafe-ordering": {
      title: "Kiezen en bestellen in een café", unitLabel: "A1: کھانا، خریداری، واپسی اور ادائیگی",
      outcomeUrdu: "مینو مانگنا، مشروب یا کھانا چننا، ویٹر کا سوال سمجھنا، اور آخر میں بل مانگنا۔",
      seedConcepts: [["menu", "کھانے کی فہرست"], ["voor mij een thee", "میرے لیے ایک چائے"], ["rekening", "بل"], ["mag ik de kaart alstublieft?", "کیا مجھے مینو مل سکتا ہے؟"], ["wat wilt u drinken?", "آپ کیا پینا چاہتے ہیں؟"], ["ik neem de soep", "میں سوپ لوں گا یا گی"], ["de rekening alstublieft", "بل، برائے مہربانی"]],
      teaching: authoredA1TeachingV4([
        ["menu", "کیفے میں دستیاب کھانے اور مشروبات کی فہرست کو menu کہیں۔", "یہ انتخاب کی فہرست ہے؛ rekening آخر کا بل ہے۔", "menu کو تیار آرڈر یا بل کے معنی میں نہ لیں۔", "menu — rekening", "کھانے کی فہرست — بل۔", "مَے نیو"],
        ["rekening", "کھانے کے بعد ادا کرنے والی رقم کے کاغذ کو rekening کہیں۔", "یہ کیفے کا بل ہے؛ خریداری کی bon رسید ہے۔", "rekening کو مینو کے ساتھ نہ ملائیں۔", "menu — rekening", "کھانے کی فہرست — بل۔", "رے کَ نِنگ"],
        ["mag ik de kaart alstublieft", "بیٹھنے کے بعد مینو مؤدبانہ طور پر مانگیں۔", "یہ مینو کی درخواست ہے؛ کھانے کا آرڈر ابھی نہیں۔", "اس کیفے جملے میں de kaart مینو ہے، شہر کا نقشہ نہیں۔", "Mag ik de kaart alstublieft?", "کیا مجھے مینو مل سکتا ہے؟", "ماخ اِک دَ کارت آلس تو بلیفٹ"],
        ["wat wilt u drinken", "ویٹر کا مشروب پوچھنے والا سوال سمجھیں یا گاہک سے کہیں۔", "یہ پینے کی چیز پوچھتا ہے؛ کھانے کے انتخاب کا سوال الگ ہے۔", "جواب میں سوال نہ دہرائیں؛ مطلوبہ مشروب بتائیں۔", "Wat wilt u drinken?", "آپ کیا پینا چاہتے ہیں؟", "وات وِلت یو درِن کَن"],
        ["voor mij een thee", "اپنے لیے ایک چائے مختصر مگر واضح آرڈر میں کہیں۔", "یہ ایک انتخاب ہے؛ بغیر چینی کی شرط الگ شامل ہوتی ہے۔", "voor mij کے بعد چیز رکھیں؛ صرف een thee بھی ممکن ہے مگر یہاں مکمل نمونہ سیکھیں۔", "Voor mij een thee.", "میرے لیے ایک چائے۔", "فور مَے اَن تے"],
        ["ik neem de soep", "مینو دیکھ کر سوپ کا فیصلہ مکمل جملے میں بتائیں۔", "nemen یہاں انتخاب کرنا ہے؛ چیز اٹھانے کی ہدایت نہیں۔", "de soep سے پہلے neem رکھیں؛ ik de soep neem نہ کہیں۔", "Ik neem de soep.", "میں سوپ لوں گا یا گی۔", "اِک نیم دَ سوپ"],
        ["de rekening alstublieft", "کھانا مکمل ہونے پر مؤدبانہ طور پر بل مانگیں۔", "یہ ادائیگی شروع کرتا ہے؛ مینو مانگنے کے لیے de kaart کہیں۔", "rekening اور menu کو الٹ نہ کریں۔", "De rekening alstublieft.", "بل، برائے مہربانی۔", "دَ رے کَ نِنگ آلس تو بلیفٹ"]
      ]),
      pattern: { modelDutch: "voor mij een thee", titleUrdu: "کیفے میں اپنا انتخاب کہنا", highlight: "voor mij een thee", explanationUrdu: "اپنا مختصر آرڈر دینے کے لیے voor mij کے بعد مطلوبہ چیز رکھیں۔", contrastUrdu: "wat wilt u drinken? ویٹر کا سوال ہے؛ voor mij een thee گاہک کا جواب ہے۔", commonMistakeUrdu: "سوال کو جواب کے طور پر نہ دہرائیں؛ voor mij کے بعد اپنا انتخاب کہیں۔" },
      prerequisiteLessonIds: ["a0-food-drink", "a0-greetings-courtesy", "a1-polite-chunks"],
      prerequisiteRefs: [["a0-food-drink", "thee"], ["a0-food-drink", "ik wil graag koffie"], ["a0-greetings-courtesy", "dank u wel"], ["a1-polite-chunks", "alstublieft"]],
      scenarios: { menu:["cafe-recognise-menu","میز پر کھانے کی فہرست پہچانیں۔"], rekening:["cafe-recognise-bill","کھانے کے آخر کا بل پہچانیں۔"], "mag ik de kaart alstublieft":["cafe-request-menu","ویٹر سے مینو مؤدبانہ طور پر مانگیں۔"], "wat wilt u drinken":["cafe-hear-drink-question","ویٹر پوچھتا ہے آپ کیا پینا چاہتے ہیں۔"], "voor mij een thee":["cafe-order-tea","اپنے لیے ایک چائے آرڈر کریں۔"], "ik neem de soep":["cafe-choose-soup","مینو سے سوپ چن کر مکمل بات کہیں۔"], "de rekening alstublieft":["cafe-request-bill","کھانا مکمل ہے۔ بل مانگیں۔"] }
    },
    "a1-cafe-food-needs": {
      title: "Eten, allergie en een probleem", unitLabel: "A1: کھانا، خریداری، واپسی اور ادائیگی",
      outcomeUrdu: "گوشت کے بغیر کھانا مانگنا، الرجی واضح کرنا، غلط یا نہ پہنچا ہوا آرڈر بتانا، اور درست کھانا مانگنا۔",
      seedConcepts: [["vlees", "گوشت"], ["bestelling", "آرڈر"], ["zonder vlees alstublieft", "گوشت کے بغیر، برائے مہربانی"], ["ik ben allergisch voor noten", "مجھے گری دار میوے سے الرجی ہے"], ["dit is niet mijn bestelling", "یہ میرا آرڈر نہیں ہے"], ["ik heb nog niets gekregen", "مجھے ابھی تک کچھ نہیں ملا"], ["kunt u dit controleren?", "کیا آپ اسے چیک کر سکتے ہیں؟"]],
      teaching: authoredA1TeachingV4([
        ["vlees", "مینو یا کھانے میں گوشت کی چیز پہچاننے کے لیے vlees کہیں۔", "یہ گوشت ہے؛ zonder vlees اس کے بغیر کھانا مانگتا ہے۔", "vlees کو تمام کھانے کے معنی میں نہ لیں۔", "vlees — zonder vlees alstublieft", "گوشت — گوشت کے بغیر، برائے مہربانی۔", "فلیس"],
        ["bestelling", "کیفے میں آپ کے مانگے ہوئے پورے آرڈر کو bestelling کہیں۔", "یہ آرڈر ہے؛ menu انتخاب سے پہلے کی فہرست ہے۔", "bestelling کو بل rekening کے معنی میں نہ سمجھیں۔", "bestelling — vlees", "آرڈر — گوشت۔", "بَ ستَ لِنگ"],
        ["zonder vlees alstublieft", "گوشت نہ کھاتے ہوں تو آرڈر کے ساتھ یہ شرط مؤدبانہ طور پر کہیں۔", "یہ گوشت کے بغیر مانگتا ہے؛ الرجی کی طبی اطلاع نہیں۔", "آرڈر کی شرط میں پہلے zonder کہیں اور vlees اس کے فوراً بعد لائیں۔", "Zonder vlees alstublieft.", "گوشت کے بغیر، برائے مہربانی۔", "زون دَر فلیس آلس تو بلیفٹ"],
        ["ik ben allergisch voor noten", "گری دار میوے سے الرجی ہو تو کھانا آنے سے پہلے صاف طبی اطلاع دیں۔", "یہ الرجی ہے؛ صرف پسند نہ ہونے یا گوشت نہ کھانے کی بات نہیں۔", "allergisch voor کو ساتھ رکھیں اور آخر میں وجہ بتائیں۔", "Ik ben allergisch voor noten.", "مجھے گری دار میوے سے الرجی ہے۔", "اِک بَن آ لیر خِس فور نو تَن"],
        ["dit is niet mijn bestelling", "غلط پلیٹ آئے تو واضح کریں کہ یہ آپ کا آرڈر نہیں۔", "یہ غلط آرڈر ہے؛ کچھ بھی نہ ملنے کی شکایت الگ ہے۔", "niet کو mijn bestelling سے پہلے رکھیں۔", "Dit is niet mijn bestelling.", "یہ میرا آرڈر نہیں ہے۔", "دِت اِس نیت مَین بَ ستَ لِنگ"],
        ["ik heb nog niets gekregen", "کافی انتظار کے بعد بھی کچھ نہ ملے تو مکمل شکایت کہیں۔", "یہ نہ پہنچنے کی بات ہے؛ غلط چیز پہنچنے کی نہیں۔", "nog niets دونوں رکھیں تاکہ ابھی تک کچھ نہ ملنے کا معنی واضح ہو۔", "Ik heb nog niets gekregen.", "مجھے ابھی تک کچھ نہیں ملا۔", "اِک ہَپ نوخ نیتس خَ کرے خَن"],
        ["kunt u dit controleren", "غلطی یا الرجی کے بعد ویٹر سے معاملہ چیک کرنے کی درخواست کریں۔", "یہ جانچ کی درخواست ہے؛ نیا آرڈر خود نہیں بناتا۔", "kunt u کے بعد چیک ہونے والی چیز dit اور آخر میں عمل controleren رکھیں۔", "Kunt u dit controleren?", "کیا آپ اسے چیک کر سکتے ہیں؟", "کُنت یو دِت کون ترو لے رَن"]
      ]),
      pattern: { modelDutch:"ik ben allergisch voor noten", titleUrdu:"الرجی واضح کرنے والا محفوظ جملہ", highlight:"ik ben allergisch voor noten", explanationUrdu:"الرجی بتانے کے لیے ik ben allergisch voor کے بعد متعلقہ کھانا رکھیں۔", contrastUrdu:"zonder vlees ایک کھانے کی شرط ہے؛ allergisch voor صحت کی ضروری اطلاع ہے۔", commonMistakeUrdu:"صرف کھانا پسند نہ ہونے کے لیے allergisch نہ کہیں؛ اسے حقیقی الرجی کے لیے محفوظ رکھیں۔" },
      prerequisiteLessonIds:["a0-food-drink","a1-cafe-ordering","a1-polite-chunks"], prerequisiteRefs:[["a0-food-drink","eten"],["a1-cafe-ordering","menu"],["a1-cafe-ordering","de rekening alstublieft"],["a1-polite-chunks","kunt u mij helpen alstublieft?"]],
      scenarios:{ vlees:["food-needs-recognise-meat","مینو میں گوشت والی چیز پہچانیں۔"], bestelling:["food-needs-recognise-order","اپنے پورے آرڈر کا لفظ پہچانیں۔"], "zonder vlees alstublieft":["food-needs-no-meat","گوشت کے بغیر کھانا مؤدبانہ طور پر مانگیں۔"], "ik ben allergisch voor noten":["food-needs-allergy","کھانا آنے سے پہلے اپنی الرجی واضح کریں۔"], "dit is niet mijn bestelling":["food-needs-wrong-order","غلط پلیٹ آئی ہے۔ مسئلہ بتائیں۔"], "ik heb nog niets gekregen":["food-needs-missing-order","انتظار کے بعد بھی کچھ نہیں ملا۔ شکایت کہیں۔"], "kunt u dit controleren":["food-needs-request-check","ویٹر سے غلطی چیک کرنے کی درخواست کریں۔"] }
    },
    "a1-shopping-clothes": {
      title: "Kleding kiezen en passen", unitLabel: "A1: کھانا، خریداری، واپسی اور ادائیگی",
      outcomeUrdu: "کپڑے کا سائز اور قیمت پوچھنا، پہن کر دیکھنے کی اجازت مانگنا، فٹنگ بتانا، اور اپنا انتخاب کرنا۔",
      seedConcepts: [["maat", "سائز"], ["deze jas is te groot", "یہ جیکٹ بہت بڑی ہے"], ["hoeveel kost deze jas?", "یہ جیکٹ کتنے کی ہے؟"], ["heeft u maat M?", "کیا آپ کے پاس سائز M ہے؟"], ["mag ik dit passen?", "کیا میں اسے پہن کر دیکھ سکتا یا سکتی ہوں؟"], ["waar is de paskamer?", "کپڑے پہن کر دیکھنے کا کمرہ کہاں ہے؟"], ["heeft u een andere kleur?", "کیا آپ کے پاس دوسرا رنگ ہے؟"], ["ik neem deze", "میں یہ لوں گا یا گی"]],
      teaching: authoredA1TeachingV4([
        ["maat", "کپڑے یا جوتے کے سائز کے لیے maat کہیں۔", "یہ سائز ہے؛ prijs قیمت ہے۔", "maat کو تعداد یا رنگ کے معنی میں نہ لیں۔", "maat — heeft u maat M?", "سائز — کیا آپ کے پاس سائز M ہے؟", "مات"],
        ["hoeveel kost deze jas", "کسی خاص جیکٹ کی قیمت پوچھنے کے لیے یہ مکمل سوال کہیں۔", "deze jas سامنے والی جیکٹ ہے؛ عام قیمت نہیں۔", "قیمت پوچھتے وقت hoeveel سے آغاز کریں اور deze jas کو چیز کی ایک جوڑی کی طرح ساتھ رکھیں۔", "Hoeveel kost deze jas?", "یہ جیکٹ کتنے کی ہے؟", "ہو فیل کوست دے زَ یاس"],
        ["heeft u maat m", "دکان کے ملازم سے سائز M کی دستیابی پوچھیں۔", "یہ سائز کی تصدیق ہے؛ فٹنگ روم کی جگہ نہیں۔", "ہاں یا نہیں سوال میں heeft u سے آغاز کریں۔", "Heeft u maat M?", "کیا آپ کے پاس سائز M ہے؟", "ہیفٹ یو مات ایم"],
        ["mag ik dit passen", "کپڑا خریدنے سے پہلے پہن کر دیکھنے کی اجازت مانگیں۔", "passen پہن کر فٹنگ دیکھنا ہے؛ خریدنے کا فیصلہ نہیں۔", "اجازت mag ik سے مانگیں، چیز dit سے بتائیں، اور پہن کر دیکھنے کا عمل passen آخر میں رکھیں۔", "Mag ik dit passen?", "کیا میں اسے پہن کر دیکھ سکتا یا سکتی ہوں؟", "ماخ اِک دِت پا سَن"],
        ["waar is de paskamer", "کپڑے پہن کر دیکھنے والے کمرے کی جگہ پوچھیں۔", "یہ جگہ پوچھتا ہے؛ کپڑا پہننے کی اجازت الگ سوال ہے۔", "paskamer پورا ایک لفظ ہے؛ اسے عام کمرے کے نام سے نہ ملائیں۔", "Waar is de paskamer?", "کپڑے پہن کر دیکھنے کا کمرہ کہاں ہے؟", "وار اِس دَ پاس کا مَر"],
        ["deze jas is te groot", "جیکٹ ضرورت سے بڑی ہو تو فٹنگ مکمل جملے میں بتائیں۔", "te groot بہت بڑی ہے؛ صرف groot عام بڑی کیفیت ہے۔", "is کو نہ چھوڑیں اور te کو groot سے پہلے رکھیں۔", "Deze jas is te groot.", "یہ جیکٹ بہت بڑی ہے۔", "دے زَ یاس اِس تَ خروت"],
        ["heeft u een andere kleur", "سائز درست ہو مگر رنگ نہ پسند ہو تو دوسرا رنگ پوچھیں۔", "یہ رنگ بدلتا ہے؛ سائز کے لیے andere maat کہیں۔", "صفت andere رنگ kleur کو بیان کرتی ہے، اس لیے دونوں کو اسی جوڑی میں رکھیں۔", "Heeft u een andere kleur?", "کیا آپ کے پاس دوسرا رنگ ہے؟", "ہیفٹ یو اَن آن دَ رَ کلیور"],
        ["ik neem deze", "کپڑا پسند اور مناسب ہو تو خریدنے کا فیصلہ کہیں۔", "یہ حتمی انتخاب ہے؛ پہن کر دیکھنے کی درخواست نہیں۔", "deze سامنے والی چیز کی طرف اشارہ کرتا ہے؛ اسے فٹنگ کی کیفیت نہ سمجھیں۔", "Ik neem deze.", "میں یہ لوں گا یا گی۔", "اِک نیم دے زَ"]
      ]),
      pattern:{modelDutch:"deze jas is te groot",titleUrdu:"کپڑے کی فٹنگ بتانا",highlight:"deze jas is te groot",explanationUrdu:"سامنے والے کپڑے کے بعد is اور پھر te کے ساتھ فٹنگ کی کیفیت رکھیں۔",contrastUrdu:"te groot فٹنگ کا مسئلہ بتاتا ہے؛ andere kleur رنگ بدلنے کی درخواست ہے۔",commonMistakeUrdu:"te کو کیفیت کے بعد نہ رکھیں؛ te groot اسی ترتیب میں کہیں۔"},
      prerequisiteLessonIds:["a0-shopping-payment","a0-letters-2","a1-questions","a1-house-food-plurals"], prerequisiteRefs:[["a0-shopping-payment","prijs"],["a0-shopping-payment","duur"],["a0-letters-2","jas"],["a1-questions","waar is het toilet?"],["a1-house-food-plurals","kamer"]],
      scenarios:{maat:["clothes-recognise-size","کپڑے کے لیبل پر سائز پہچانیں۔"],"hoeveel kost deze jas":["clothes-ask-price","جیکٹ کی قیمت پوچھیں۔"],"heeft u maat m":["clothes-ask-size","سائز M کی دستیابی پوچھیں۔"],"mag ik dit passen":["clothes-request-try","جیکٹ پہن کر دیکھنے کی اجازت مانگیں۔"],"waar is de paskamer":["clothes-find-fitting-room","فٹنگ روم کی جگہ پوچھیں۔"],"deze jas is te groot":["clothes-report-large","جیکٹ بہت بڑی ہے۔ فٹنگ بتائیں۔"],"heeft u een andere kleur":["clothes-ask-colour","دوسرا رنگ مانگیں۔"],"ik neem deze":["clothes-choose-item","مناسب جیکٹ خریدنے کا فیصلہ کہیں۔"]}
    },
    "a1-shopping-returns": {
      title: "Ruilen of terugbrengen", unitLabel: "A1: کھانا، خریداری، واپسی اور ادائیگی",
      outcomeUrdu: "رسید کے ساتھ خراب یا غلط سائز کی چیز واپس لانا، بدلنے یا رقم واپس لینے کی درخواست کرنا۔",
      seedConcepts:[["ruilen","بدلنا"],["terugbrengen","واپس لانا"],["ik wil dit terugbrengen","میں یہ واپس کرنا چاہتا یا چاہتی ہوں"],["hier is de bon","یہ رہی رسید"],["de maat is te klein","سائز بہت چھوٹا ہے"],["de jas is kapot","جیکٹ خراب ہے"],["heeft u een grotere maat?","کیا آپ کے پاس بڑا سائز ہے؟"],["kan ik mijn geld terugkrijgen?","کیا مجھے پیسے واپس مل سکتے ہیں؟"]],
      teaching:authoredA1TeachingV4([
        ["ruilen","خریدی ہوئی چیز کو دوسری چیز یا سائز سے بدلنے کے لیے ruilen کہیں۔","یہ تبادلہ ہے؛ terugbrengen صرف واپس لانا ہے۔","ruilen کو رقم واپس لینے کے یقینی معنی میں نہ سمجھیں۔","Ik wil dit ruilen.","میں یہ بدلنا چاہتا یا چاہتی ہوں۔","راؤ لَن"],
        ["terugbrengen","خریدی ہوئی چیز دکان واپس لے جانے کے لیے terugbrengen کہیں۔","یہ واپسی کا عمل ہے؛ بدلنے یا رقم کا نتیجہ الگ مانگنا پڑتا ہے۔","اس پورے فعل کو واپسی کے معنی میں پہچانیں؛ حصے الگ کر کے ترتیب نہ بدلیں۔","ruilen — terugbrengen","بدلنا — واپس لانا۔","تَروخ برَنگَن"],
        ["ik wil dit terugbrengen","کاؤنٹر پر صاف کہیں کہ آپ یہ چیز واپس کرنا چاہتے ہیں۔","یہ مقصد بتاتا ہے؛ وجہ ابھی اگلے جملے میں دیں۔","wil کے بعد dit اور آخر میں terugbrengen رکھیں۔","Ik wil dit terugbrengen.","میں یہ واپس کرنا چاہتا یا چاہتی ہوں۔","اِک وِل دِت تَروخ برَنگَن"],
        ["hier is de bon","ملازم کو خریداری کا ثبوت دیتے وقت رسید پیش کریں۔","یہ رسید دینا ہے؛ نئی رسید مانگنا نہیں۔","hier is ترتیب نہ بدلیں؛ یہ رہی کے معنی دیتا ہے۔","Hier is de bon.","یہ رہی رسید۔","ہیر اِس دَ بون"],
        ["de maat is te klein","واپسی کی وجہ میں سائز ضرورت سے چھوٹا بتائیں۔","یہ سائز کا مسئلہ ہے؛ خراب چیز کے لیے kapot کہیں۔","te کیفیت کو ضرورت سے زیادہ بناتا ہے، اس لیے te klein کو ایک ساتھ بولیں۔","De maat is te klein.","سائز بہت چھوٹا ہے۔","دَ مات اِس تَ کلَین"],
        ["de jas is kapot","جیکٹ میں خرابی ہو تو چیز اور مسئلہ مکمل جملے میں بتائیں۔","یہ خرابی ہے؛ صرف غلط سائز نہیں۔","is کو نہ چھوڑیں؛ de jas kapot ادھورا ہے۔","De jas is kapot.","جیکٹ خراب ہے۔","دَ یاس اِس کا پوت"],
        ["heeft u een grotere maat","اسی چیز کا بڑا سائز مانگنے کے لیے سوال کریں۔","یہ تبادلے کا حل ہے؛ رقم واپس لینے کی درخواست نہیں۔","grotere اسی اسم maat کو بیان کرتا ہے؛ بڑا سائز مانگتے وقت دونوں کو الگ نہ کریں۔","Heeft u een grotere maat?","کیا آپ کے پاس بڑا سائز ہے؟","ہیفٹ یو اَن خرو تَ رَ مات"],
        ["kan ik mijn geld terugkrijgen","چیز نہ رکھنی ہو تو رقم واپس ملنے کی مؤدبانہ درخواست کریں۔","یہ رقم واپس مانگتا ہے؛ دوسری چیز سے بدلنا ruilen ہے۔","kan ik کے بعد mijn geld رکھیں اور واپسی کا مرکب فعل terugkrijgen ایک لفظ میں آخر میں کہیں۔","Kan ik mijn geld terugkrijgen?","کیا مجھے پیسے واپس مل سکتے ہیں؟","کان اِک مَین خَیلٹ تَروخ کرَی خَن"]
      ]),
      pattern:{modelDutch:"ik wil dit terugbrengen",titleUrdu:"چیز واپس کرنے کا مقصد کہنا",highlight:"ik wil dit terugbrengen",explanationUrdu:"واپسی کا مقصد بتانے کے لیے ik wil کے بعد dit اور آخر میں terugbrengen رکھیں۔",contrastUrdu:"terugbrengen چیز واپس لانا ہے؛ ruilen اسے دوسری چیز سے بدلنا ہے۔",commonMistakeUrdu:"نتیجہ فرض نہ کریں؛ واپسی کے بعد بدلنا یا رقم الگ مانگیں۔"},
      prerequisiteLessonIds:["a0-shopping-payment","a0-home-needs","a1-shopping-clothes"],prerequisiteRefs:[["a0-shopping-payment","bon"],["a0-home-needs","kapot"],["a1-shopping-clothes","maat"],["a1-shopping-clothes","deze jas is te groot"]],
      scenarios:{ruilen:["returns-recognise-exchange","دوسری چیز یا سائز سے بدلنے کا عمل پہچانیں۔"],terugbrengen:["returns-recognise-return","چیز دکان واپس لانے کا عمل پہچانیں۔"],"ik wil dit terugbrengen":["returns-state-purpose","واپسی کاؤنٹر پر اپنا مقصد کہیں۔"],"hier is de bon":["returns-show-receipt","ملازم کو رسید دیں۔"],"de maat is te klein":["returns-size-reason","واپسی کی وجہ غلط سائز بتائیں۔"],"de jas is kapot":["returns-damage-reason","جیکٹ کی خرابی بتائیں۔"],"heeft u een grotere maat":["returns-request-larger","بڑا سائز مانگیں۔"],"kan ik mijn geld terugkrijgen":["returns-request-refund","رقم واپس ملنے کی درخواست کریں۔"]},
      document:{stableId:"returns-receipt-card",sourceKey:"returns-receipt-card",documentKind:"shop-receipt-card",targetDutch:"hier is de bon",title:"bon",labelUrdu:"دکان کی رسید پڑھیں",promptUrdu:"رسید میں ruilen اور bon دیکھیں، پھر ملازم کو رسید پیش کرنے والی مکمل بات کا درست مطلب منتخب کریں۔",instructionUrdu:"رسید میں واپسی اور رسید کی قطاریں الگ پڑھیں، پھر کاؤنٹر پر رسید دینے والی سیکھی ہوئی بات چنیں۔",correctUrdu:"درست۔ hier is de bon رسید پیش کرتا ہے۔",wrongUrdu:"یہ دوسری واپسی کی بات ہے۔ hier is de bon کا مطلب یہ رہی رسید ہے۔",rows:[{label:"ruilen",value:"ruilen"},{label:"terugbrengen",value:"terugbrengen"},{label:"bon",value:"hier is de bon"}]}
    },
    "a1-money-bank": {
      title: "Betalen en een betaalprobleem", unitLabel: "A1: کھانا، خریداری، واپسی اور ادائیگی",
      outcomeUrdu: "کارڈ یا نقد ادائیگی بتانا، ناکام کارڈ یا غلط رقم واضح کرنا، اور رسید مانگنا۔",
      seedConcepts:[["pinpas","بینک کارڈ"],["bedrag","رقم"],["ik betaal contant","میں نقد ادائیگی کرتا یا کرتی ہوں"],["mijn pinpas werkt niet","میرا بینک کارڈ کام نہیں کر رہا"],["het bedrag klopt niet","رقم درست نہیں ہے"],["ik heb niet genoeg geld","میرے پاس کافی پیسے نہیں ہیں"],["mag ik de bon?","کیا مجھے رسید مل سکتی ہے؟"]],
      teaching:authoredA1TeachingV4([
        ["pinpas","دکان میں کارڈ سے ادائیگی کے لیے بینک کارڈ کو pinpas کہیں۔","یہ کارڈ ہے؛ contant نقد رقم ہے۔","pinpas کو کارڈ مشین کے معنی میں نہ لیں۔","Mijn pinpas werkt.","میرا بینک کارڈ کام کرتا ہے۔","پِن پاس"],
        ["bedrag","اسکرین یا رسید پر ادا ہونے والی پوری رقم کو bedrag کہیں۔","یہ کل رقم ہے؛ ایک چیز کی prijs الگ ہو سکتی ہے۔","bedrag کو نقد یا کارڈ کے طریقے کے معنی میں نہ لیں۔","pinpas — bedrag","بینک کارڈ — رقم۔","بَ دراخ"],
        ["ik betaal contant","کیش دینے کا فیصلہ مکمل جملے میں بتائیں۔","یہ نقد طریقہ ہے؛ met pin کارڈ کا طریقہ ہے۔","contant کو betaal سے پہلے نہ رکھیں۔","Ik betaal contant.","میں نقد ادائیگی کرتا یا کرتی ہوں۔","اِک بَ تال کون تانت"],
        ["mijn pinpas werkt niet","کارڈ قبول نہ ہو تو مسئلہ صاف مکمل جملے میں بتائیں۔","یہ کارڈ کی خرابی ہے؛ غلط bedrag الگ مسئلہ ہے۔","niet کو آخر میں رکھیں؛ werkt niet ساتھ رہتا ہے۔","Mijn pinpas werkt niet.","میرا بینک کارڈ کام نہیں کر رہا۔","مَین پِن پاس ویرکٹ نیت"],
        ["het bedrag klopt niet","مشین یا رسید کی رقم غلط ہو تو یہ مکمل اعتراض کہیں۔","یہ رقم کی غلطی ہے؛ کارڈ کام نہ کرنا نہیں۔","klopt niet کو ساتھ رکھیں؛ صرف niet کہنا مسئلہ واضح نہیں کرتا۔","Het bedrag klopt niet.","رقم درست نہیں ہے۔","ہَت بَ دراخ کلوپٹ نیت"],
        ["ik heb niet genoeg geld","رقم پوری نہ ہو تو اپنی حالت واضح کریں۔","یہ ناکافی پیسے ہیں؛ ادائیگی مکمل ہونے کی بات نہیں۔","niet genoeg کو geld سے پہلے رکھیں۔","Ik heb niet genoeg geld.","میرے پاس کافی پیسے نہیں ہیں۔","اِک ہَپ نیت خَ نوخ خَیلٹ"],
        ["mag ik de bon","ادائیگی کے بعد رسید مؤدبانہ طور پر مانگیں۔","یہ رسید کی درخواست ہے؛ رقم یا بل کی شکایت نہیں۔","سوال میں mag ik سے شروع کریں اور de bon آخر میں رکھیں۔","Mag ik de bon?","کیا مجھے رسید مل سکتی ہے؟","ماخ اِک دَ بون"]
      ]),
      pattern:{modelDutch:"mijn pinpas werkt niet",titleUrdu:"ادائیگی کی خرابی واضح کرنا",highlight:"mijn pinpas werkt niet",explanationUrdu:"کارڈ کا مسئلہ بتانے کے لیے mijn pinpas کے بعد werkt niet رکھیں۔",contrastUrdu:"pinpas werkt niet کارڈ کا مسئلہ ہے؛ bedrag klopt niet رقم کی غلطی ہے۔",commonMistakeUrdu:"صرف niet نہ کہیں؛ کون سی چیز کام نہیں کرتی مکمل بتائیں۔"},
      prerequisiteLessonIds:["a0-shopping-payment","a1-cafe-ordering","a1-shopping-returns"],prerequisiteRefs:[["a0-shopping-payment","ik betaal met pin"],["a0-shopping-payment","contant"],["a0-shopping-payment","bon"],["a1-cafe-ordering","rekening"],["a1-shopping-returns","kan ik mijn geld terugkrijgen?"]],
      scenarios:{pinpas:["payment-recognise-card","ادائیگی کے بینک کارڈ کو پہچانیں۔"],bedrag:["payment-recognise-amount","اسکرین پر کل رقم پہچانیں۔"],"ik betaal contant":["payment-choose-cash","کیش سے ادائیگی کا طریقہ بتائیں۔"],"mijn pinpas werkt niet":["payment-card-fails","مشین کارڈ قبول نہیں کرتی۔ مسئلہ بتائیں۔"],"het bedrag klopt niet":["payment-wrong-amount","اسکرین کی رقم غلط ہے۔ اعتراض کریں۔"],"ik heb niet genoeg geld":["payment-not-enough","رقم پوری نہیں۔ اپنی حالت بتائیں۔"],"mag ik de bon":["payment-request-receipt","ادائیگی کے بعد رسید مانگیں۔"]}
    },
    "a1-public-transport": {
      title: "Reizen met bus en trein", unitLabel: "A1: سفر، شہر کی جگہیں اور حفاظت",
      outcomeUrdu: "ٹکٹ مانگنا، روانگی بورڈ پڑھنا، پلیٹ فارم یا وقت پوچھنا، تاخیر سمجھنا، اور بس یا ٹرین بدلنے کی بات کرنا۔",
      seedConcepts: [["spoor","پلیٹ فارم"],["ik wil een kaartje naar Utrecht","مجھے Utrecht کا ٹکٹ چاہیے"],["vertraging","تاخیر"],["ik ga naar het station","میں اسٹیشن جا رہا یا رہی ہوں"],["hoe laat vertrekt de trein?","ٹرین کتنے بجے روانہ ہوتی ہے؟"],["van welk spoor vertrekt de trein?","ٹرین کس پلیٹ فارم سے جاتی ہے؟"],["de trein heeft vertraging","ٹرین دیر سے ہے"],["gaat deze bus naar het centrum?","کیا یہ بس مرکز جاتی ہے؟"],["waar moet ik overstappen?","مجھے کہاں گاڑی بدلنی ہے؟"],["de volgende halte is centrum","اگلا اسٹاپ مرکز ہے"]],
      teaching:authoredA1TeachingV4([
        ["spoor","اسٹیشن کے بورڈ پر ٹرین کے پلیٹ فارم کو spoor کہیں۔","یہ پلیٹ فارم ہے؛ halte بس کا اسٹاپ ہے۔","spoor کو ٹرین کے روانگی وقت کے معنی میں نہ لیں۔","spoor — station","پلیٹ فارم — اسٹیشن۔","سپور"],
        ["ik wil een kaartje naar utrecht","ٹکٹ کاؤنٹر پر Utrecht جانے کا ٹکٹ مکمل جملے میں مانگیں۔","naar منزل بتاتا ہے؛ روانگی کا وقت الگ سوال ہے۔","kaartje کے بعد naar اور پھر شہر رکھیں۔","Ik wil een kaartje naar Utrecht.","مجھے Utrecht کا ٹکٹ چاہیے۔","اِک وِل اَن کارت یَ نار یو تریخت"],
        ["vertraging","روانگی بورڈ پر تاخیر کے لیے vertraging پہچانیں۔","یہ دیر ہے؛ spoor پلیٹ فارم ہے۔","vertraging کو منسوخی کے معنی میں نہ سمجھیں۔","vertraging — spoor","تاخیر — پلیٹ فارم۔","فَر ترا خِنگ"],
        ["ik ga naar het station","اپنی منزل اسٹیشن ہو تو یہ مکمل حرکت والا جملہ کہیں۔","یہ اسٹیشن جانے کی اطلاع ہے؛ ٹکٹ مانگنے کی درخواست نہیں۔","ga کے بعد naar het station رکھیں۔","Ik ga naar het station.","میں اسٹیشن جا رہا یا رہی ہوں۔","اِک خا نار ہَت ستا سیون"],
        ["hoe laat vertrekt de trein","ٹرین کا گھڑی والا روانگی وقت پوچھیں۔","hoe laat وقت پوچھتا ہے؛ welk spoor پلیٹ فارم پوچھتا ہے۔","سوال میں hoe laat پہلے اور vertrekt اس کے بعد رکھیں۔","Hoe laat vertrekt de trein?","ٹرین کتنے بجے روانہ ہوتی ہے؟","ہو لات فَر تریکٹ دَ ٹرَین"],
        ["van welk spoor vertrekt de trein","بورڈ واضح نہ ہو تو ٹرین کا پلیٹ فارم پوچھیں۔","یہ spoor پوچھتا ہے؛ گھڑی کا وقت نہیں۔","van welk spoor کو سوال کے شروع میں ساتھ رکھیں۔","Van welk spoor vertrekt de trein?","ٹرین کس پلیٹ فارم سے جاتی ہے؟","فان وِلک سپور فَر تریکٹ دَ ٹرَین"],
        ["de trein heeft vertraging","اعلان یا بورڈ سے معلوم ہو کہ ٹرین دیر سے ہے تو مکمل اطلاع سمجھیں۔","یہ تاخیر ہے؛ پلیٹ فارم کی تبدیلی نہیں۔","heeft کو trein کے بعد اور vertraging آخر میں رکھیں۔","De trein heeft vertraging.","ٹرین دیر سے ہے۔","دَ ٹرَین ہیفٹ فَر ترا خِنگ"],
        ["gaat deze bus naar het centrum","بس میں چڑھنے سے پہلے مرکز جانے کی تصدیق کریں۔","یہ بس کی منزل پوچھتا ہے؛ اگلا اسٹاپ الگ اعلان ہے۔","ہاں یا نہیں سوال میں gaat پہلے رکھیں۔","Gaat deze bus naar het centrum?","کیا یہ بس مرکز جاتی ہے؟","خات دے زَ بُس نار ہَت سَین ترُم"],
        ["waar moet ik overstappen","سفر میں گاڑی کہاں بدلنی ہے یہ پوچھیں۔","overstappen گاڑی بدلنا ہے؛ uitstappen سفر ختم کر کے اترنا ہے۔","waar سے شروع کریں اور overstappen آخر میں رکھیں۔","Waar moet ik overstappen?","مجھے کہاں گاڑی بدلنی ہے؟","وار موت اِک او فَر ستا پَن"],
        ["de volgende halte is centrum","بس کے اعلان میں اگلا اسٹاپ مرکز ہو تو اس مکمل اطلاع کو سمجھیں۔","volgende halte اگلا اسٹاپ ہے؛ موجودہ جگہ نہیں۔","is کو نہ چھوڑیں؛ اعلان مکمل جملہ ہے۔","De volgende halte is centrum.","اگلا اسٹاپ مرکز ہے۔","دَ فول خَن دَ ہال تَ اِس سَین ترُم"]
      ]),
      pattern:{modelDutch:"ik wil een kaartje naar Utrecht",titleUrdu:"منزل کے ساتھ ٹکٹ مانگنا",highlight:"ik wil een kaartje naar Utrecht",explanationUrdu:"ٹکٹ مانگنے کے لیے ik wil een kaartje naar کے بعد منزل رکھیں۔",contrastUrdu:"kaartje naar Utrecht منزل والا ٹکٹ ہے؛ hoe laat vertrekt وقت پوچھتا ہے۔",commonMistakeUrdu:"naar کو شہر کے بعد نہ رکھیں؛ kaartje naar کے بعد منزل کہیں۔"},
      prerequisiteLessonIds:["a0-transport-directions","a0-time-days","a1-questions"],prerequisiteRefs:[["a0-transport-directions","bus"],["a0-transport-directions","trein"],["a0-transport-directions","station"],["a0-transport-directions","halte"],["a0-transport-directions","kaartje"],["a0-time-days","hoe laat"],["a1-questions","waar"]],
      scenarios:{spoor:["transport-recognise-platform","روانگی بورڈ پر پلیٹ فارم پہچانیں۔"],"ik wil een kaartje naar utrecht":["transport-buy-ticket","کاؤنٹر پر Utrecht کا ٹکٹ مانگیں۔"],vertraging:["transport-recognise-delay","بورڈ پر تاخیر پہچانیں۔"],"ik ga naar het station":["transport-state-destination","اپنی اسٹیشن والی منزل بتائیں۔"],"hoe laat vertrekt de trein":["transport-ask-departure","ٹرین کا روانگی وقت پوچھیں۔"],"van welk spoor vertrekt de trein":["transport-ask-platform","ٹرین کا پلیٹ فارم پوچھیں۔"],"de trein heeft vertraging":["transport-hear-delay","اعلان میں ٹرین کی تاخیر سمجھیں۔"],"gaat deze bus naar het centrum":["transport-check-bus","مرکز جانے والی بس کی تصدیق کریں۔"],"waar moet ik overstappen":["transport-ask-transfer","گاڑی بدلنے کی جگہ پوچھیں۔"],"de volgende halte is centrum":["transport-hear-stop","اگلے اسٹاپ کا اعلان سمجھیں۔"]},
      document:{stableId:"transport-departure-board",sourceKey:"transport-departure-board",documentKind:"departure-board",targetDutch:"van welk spoor vertrekt de trein?",title:"spoor",labelUrdu:"ٹرین کا روانگی بورڈ پڑھیں",promptUrdu:"بورڈ میں trein اور spoor دیکھیں، پھر پلیٹ فارم پوچھنے والے مکمل سوال کا درست مطلب منتخب کریں۔",instructionUrdu:"روانگی بورڈ میں وقت، spoor، اور vertraging الگ دیکھیں، پھر ٹرین کے پلیٹ فارم والا سیکھی ہوئی سوال چنیں۔",correctUrdu:"درست۔ van welk spoor ٹرین کا پلیٹ فارم پوچھتا ہے۔",wrongUrdu:"یہ دوسری سفر کی بات ہے۔ welk spoor پلیٹ فارم کے بارے میں ہے۔",rows:[{label:"trein",value:"de trein heeft vertraging"},{label:"spoor",value:"van welk spoor vertrekt de trein?"},{label:"vertraging",value:"vertraging"}]}
    },
    "a1-directions-town": {
      title:"De weg vragen met een kaart",unitLabel:"A1: سفر، شہر کی جگہیں اور حفاظت",outcomeUrdu:"نقشے پر جگہ پہچاننا، دواخانے کا راستہ پوچھنا، سیدھا یا دائیں مڑنے کی ہدایت سمجھنا، اور قریب یا دور بتانا۔",
      seedConcepts:[["kaart","نقشہ"],["hoe kom ik bij de apotheek?","میں دواخانے تک کیسے جاؤں؟"],["het is dichtbij","یہ قریب ہے"],["dichtbij","قریب"],["plein","چوک"],["sla rechts af","دائیں مڑیں"],["het is ver weg","یہ دور ہے"],["kunt u het op de kaart laten zien?","کیا آپ نقشے پر دکھا سکتے ہیں؟"]],
      teaching:authoredA1TeachingV4([
        ["kaart","شہر میں راستہ دیکھنے والے نقشے کو kaart کہیں۔","یہ نقشہ ہے؛ ٹکٹ کے لیے kaartje الگ ہے۔","kaart اور kaartje کی ملتی آواز سے معنی نہ بدلیں۔","kaart — kaartje","نقشہ — ٹکٹ۔","کارت"],
        ["hoe kom ik bij de apotheek","دواخانے تک پہنچنے کا راستہ مکمل سوال میں پوچھیں۔","hoe kom ik bij راستہ پوچھتا ہے؛ waar صرف جگہ پوچھ سکتا ہے۔","hoe سے شروع کریں اور منزل آخر میں رکھیں۔","Hoe kom ik bij de apotheek?","میں دواخانے تک کیسے جاؤں؟","ہو کوم اِک بَے دَ آ پو تیک"],
        ["plein","شہر کے کھلے چوک یا نقشے کی جگہ کو plein کہیں۔","یہ چوک ہے؛ straat سڑک ہے۔","plein کو پارک یا اسٹیشن کے معنی میں نہ لیں۔","plein — kaart","چوک — نقشہ۔","پلَین"],
        ["dichtbij","کوئی جگہ قریب ہو تو dichtbij کہیں۔","یہ قریب فاصلے کی کیفیت ہے؛ het is dichtbij مکمل جواب ہے۔","dichtbij کو دائیں یا بائیں سمت نہ سمجھیں۔","dichtbij — het is dichtbij","قریب — یہ قریب ہے۔","دِخت بَے"],
        ["sla rechts af","راستہ بتاتے وقت دائیں مڑنے کی ہدایت دیں یا سمجھیں۔","rechts دائیں ہے؛ links بائیں ہے۔","sla اور af دونوں رکھیں؛ یہ الگ ہونے والا فعل ہے۔","Sla rechts af.","دائیں مڑیں۔","سلا رَختس آف"],
        ["het is dichtbij","جگہ قریب ہو تو مکمل جواب دیں۔","یہ فاصلے کا جواب ہے؛ سمت کی ہدایت نہیں۔","is کو نہ چھوڑیں؛ het is dichtbij مکمل جملہ ہے۔","Het is dichtbij.","یہ قریب ہے۔","ہَت اِس دِخت بَے"],
        ["het is ver weg","جگہ کافی دور ہو تو مکمل جواب دیں۔","ver weg دور ہے؛ dichtbij قریب ہے۔","ver weg کو دو الگ جواب نہ سمجھیں؛ دونوں مل کر دور کہتے ہیں۔","Het is ver weg.","یہ دور ہے۔","ہَت اِس فَیر وِخ"],
        ["kunt u het op de kaart laten zien","زبانی ہدایت مشکل ہو تو نقشے پر دکھانے کی مؤدبانہ درخواست کریں۔","یہ نقشے پر دکھانے کو کہتا ہے؛ نیا نقشہ خریدنے کی درخواست نہیں۔","kunt u سے شروع کریں اور laten zien آخر میں رکھیں۔","Kunt u het op de kaart laten zien?","کیا آپ نقشے پر دکھا سکتے ہیں؟","کُنت یو ہَت اوپ دَ کارت لا تَن زین"]
      ]),
      pattern:{modelDutch:"hoe kom ik bij de apotheek?",titleUrdu:"کسی جگہ تک راستہ پوچھنا",highlight:"hoe kom ik bij de apotheek",explanationUrdu:"راستہ پوچھنے کے لیے hoe kom ik bij کے بعد منزل رکھیں۔",contrastUrdu:"hoe kom ik bij راستہ پوچھتا ہے؛ het is dichtbij فاصلے کا جواب دیتا ہے۔",commonMistakeUrdu:"bij کو منزل کے بعد نہ رکھیں؛ bij کے بعد جگہ کا نام کہیں۔"},
      prerequisiteLessonIds:["a0-transport-directions","a0-address-phone","a0-health-emergency","a1-public-transport"],prerequisiteRefs:[["a0-transport-directions","links"],["a0-transport-directions","rechts"],["a0-transport-directions","rechtdoor"],["a0-transport-directions","ga rechtdoor"],["a0-transport-directions","kaartje"],["a0-address-phone","straat"],["a0-health-emergency","apotheek"],["a1-public-transport","station"]],
      scenarios:{kaart:["directions-recognise-map","شہر کا نقشہ پہچانیں۔"],"hoe kom ik bij de apotheek":["directions-ask-pharmacy","دواخانے تک راستہ پوچھیں۔"],plein:["directions-recognise-square","نقشے پر چوک پہچانیں۔"],dichtbij:["directions-recognise-near","قریب فاصلے کا لفظ پہچانیں۔"],"sla rechts af":["directions-turn-right","دائیں مڑنے کی ہدایت دیں۔"],"het is dichtbij":["directions-answer-near","جگہ قریب ہے۔ مکمل جواب دیں۔"],"het is ver weg":["directions-answer-far","جگہ دور ہے۔ مکمل جواب دیں۔"],"kunt u het op de kaart laten zien":["directions-request-map","راستہ نقشے پر دکھانے کی درخواست کریں۔"]}
    },
    "a1-post-parcel-extra": {
      title:"Een pakket ophalen",unitLabel:"A1: سفر، شہر کی جگہیں اور حفاظت",outcomeUrdu:"پارسل نوٹس پڑھنا، وصولی کی جگہ پہچاننا، شناخت دکھانا، نہ پہنچا پارسل بتانا، اور دستخط کرنا۔",
      seedConcepts:[["afhaalpunt","وصولی کی جگہ"],["ik wil mijn pakket ophalen","میں اپنا پارسل لینا چاہتا یا چاہتی ہوں"],["identiteitsbewijs","شناختی کاغذ"],["hier is mijn bericht","یہ میرا نوٹس ہے"],["heeft u een identiteitsbewijs?","کیا آپ کے پاس شناختی کاغذ ہے؟"],["het pakket is nog niet gekomen","پارسل ابھی نہیں آیا"],["op welk adres is het bezorgd?","یہ کس پتے پر پہنچایا گیا؟"],["ik moet hier tekenen","مجھے یہاں دستخط کرنے ہیں"]],
      teaching:authoredA1TeachingV4([
        ["afhaalpunt","پارسل لینے کی مقرر جگہ کو afhaalpunt کہیں۔","یہ وصولی کی جگہ ہے؛ گھر کا adres الگ ہے۔","afhaalpunt کو عام دکان یا ڈاک کے معنی میں نہ لیں۔","afhaalpunt — pakket","وصولی کی جگہ — پارسل۔","آف ہال پُنت"],
        ["ik wil mijn pakket ophalen","کاؤنٹر پر اپنا پارسل لینے کا مقصد مکمل جملے میں بتائیں۔","ophalen وصول کرنا ہے؛ بھیجنا یا واپس کرنا نہیں۔","wil کے بعد مقصد mijn pakket آتا ہے اور وصول کرنے کا کام ophalen جملہ مکمل کرتا ہے۔","Ik wil mijn pakket ophalen.","میں اپنا پارسل لینا چاہتا یا چاہتی ہوں۔","اِک وِل مَین پا کَت اوپ ہا لَن"],
        ["identiteitsbewijs","پارسل لیتے وقت شناخت دکھانے والے کاغذ کو identiteitsbewijs کہیں۔","یہ شناخت ہے؛ پارسل نوٹس bericht الگ ہے۔","اس لمبے لفظ کو پتے یا عام رکنیت کارڈ کے معنی میں نہ لیں۔","identiteitsbewijs — bericht","شناختی کاغذ — نوٹس۔","اِدَنتی تَیٹس بَ وِیس"],
        ["hier is mijn bericht","ملازم کو پارسل والا نوٹس پیش کرتے وقت یہ مکمل بات کہیں۔","یہ نوٹس دینا ہے؛ شناختی کاغذ دینا اگلا الگ قدم ہے۔","hier is ترتیب نہ بدلیں۔","Hier is mijn bericht.","یہ میرا نوٹس ہے۔","ہیر اِس مَین بَ رِخت"],
        ["heeft u een identiteitsbewijs","ملازم کا شناختی کاغذ مانگنے والا سوال سمجھیں۔","یہ شناخت کی تصدیق ہے؛ پتے کا سوال نہیں۔","سوال میں heeft u پہلے رکھیں۔","Heeft u een identiteitsbewijs?","کیا آپ کے پاس شناختی کاغذ ہے؟","ہیفٹ یو اَن اِدَنتی تَیٹس بَ وِیس"],
        ["het pakket is nog niet gekomen","پارسل مقرر وقت تک نہ پہنچے تو مسئلہ مکمل جملے میں بتائیں۔","یہ نہ پہنچنے کی بات ہے؛ غلط پتے کی تصدیق الگ ہے۔","nog niet کو gekomen سے پہلے رکھیں۔","Het pakket is nog niet gekomen.","پارسل ابھی نہیں آیا۔","ہَت پا کَت اِس نوخ نیت خَ کو مَن"],
        ["op welk adres is het bezorgd","پارسل کس پتے پر پہنچا یہ پوچھیں۔","یہ ترسیل کا پتہ پوچھتا ہے؛ وصولی کی جگہ نہیں۔","op welk adres کو سوال کے شروع میں رکھیں۔","Op welk adres is het bezorgd?","یہ کس پتے پر پہنچایا گیا؟","اوپ وِلک آ درَس اِس ہَت بَ زورخت"],
        ["ik moet hier tekenen","کاؤنٹر پر دستخط ضروری ہوں تو ہدایت سمجھیں یا اپنی ذمہ داری کہیں۔","tekenen دستخط کرنا ہے؛ شناخت دکھانا نہیں۔","moet ذمہ داری بتاتا ہے؛ جگہ hier کے بعد اصل کام tekenen رکھیں۔","Ik moet hier tekenen.","مجھے یہاں دستخط کرنے ہیں۔","اِک موت ہیر تے کَ نَن"]
      ]),
      pattern:{modelDutch:"ik wil mijn pakket ophalen",titleUrdu:"پارسل لینے کا مقصد کہنا",highlight:"ik wil mijn pakket ophalen",explanationUrdu:"پارسل لینے کے لیے ik wil mijn pakket کے بعد ophalen رکھیں۔",contrastUrdu:"pakket ophalen وصول کرنا ہے؛ pakket is nog niet gekomen نہ پہنچنے کی شکایت ہے۔",commonMistakeUrdu:"ophalen کو pakket سے پہلے نہ رکھیں؛ اس نمونے میں فعل آخر میں ہے۔"},
      prerequisiteLessonIds:["a0-address-phone","a1-neighbour-talk","a1-details-forms"],prerequisiteRefs:[["a0-address-phone","adres"],["a1-neighbour-talk","pakket"],["a1-details-forms","bericht"]],
      scenarios:{afhaalpunt:["parcel-recognise-point","نوٹس میں وصولی کی جگہ پہچانیں۔"],"ik wil mijn pakket ophalen":["parcel-state-pickup","کاؤنٹر پر پارسل لینے کا مقصد کہیں۔"],identiteitsbewijs:["parcel-recognise-id","شناختی کاغذ پہچانیں۔"],"hier is mijn bericht":["parcel-show-notice","ملازم کو پارسل نوٹس دیں۔"],"heeft u een identiteitsbewijs":["parcel-hear-id-request","شناختی کاغذ مانگنے والا سوال سمجھیں۔"],"het pakket is nog niet gekomen":["parcel-report-missing","پارسل نہ پہنچنے کا مسئلہ بتائیں۔"],"op welk adres is het bezorgd":["parcel-ask-address","ترسیل کا پتہ پوچھیں۔"],"ik moet hier tekenen":["parcel-sign","دستخط کرنے کی ذمہ داری کہیں۔"]},
      document:{stableId:"parcel-pickup-notice",sourceKey:"parcel-pickup-notice",documentKind:"parcel-pickup-notice",targetDutch:"ik wil mijn pakket ophalen",title:"afhaalpunt",labelUrdu:"پارسل وصولی کا نوٹس پڑھیں",promptUrdu:"نوٹس میں pakket اور afhaalpunt دیکھیں، پھر پارسل لینے کا مقصد بتانے والی مکمل بات کا درست مطلب منتخب کریں۔",instructionUrdu:"نوٹس میں afhaalpunt، bericht، اور identiteitsbewijs الگ پڑھیں، پھر کاؤنٹر پر مناسب سیکھی ہوئی بات چنیں۔",correctUrdu:"درست۔ ik wil mijn pakket ophalen پارسل لینے کا مقصد بتاتا ہے۔",wrongUrdu:"یہ دوسری پارسل کی بات ہے۔ ophalen یہاں پارسل وصول کرنا ہے۔",rows:[{label:"afhaalpunt",value:"afhaalpunt"},{label:"bericht",value:"hier is mijn bericht"},{label:"pakket",value:"ik wil mijn pakket ophalen"}]}
    },
    "a1-library-community": {
      title:"Bibliotheek en buurthuis",unitLabel:"A1: سفر، شہر کی جگہیں اور حفاظت",outcomeUrdu:"لائبریری یا محلے کے مرکز کی جگہ، زبان کی کلاس، رکنیت، کارڈ، اور کھلنے یا بند ہونے کے اوقات پوچھنا۔",
      seedConcepts:[["bibliotheek","لائبریری"],["ik wil Nederlands leren","میں Nederlands سیکھنا چاہتا یا چاہتی ہوں"],["buurthuis","محلے کا مرکز"],["taalles","زبان کی کلاس"],["heeft u taalles?","کیا آپ کے پاس زبان کی کلاس ہے؟"],["ik wil lid worden","میں رکن بننا چاہتا یا چاہتی ہوں"],["hoe laat is het open?","یہ کتنے بجے کھلتا ہے؟"],["vandaag is het gesloten","آج یہ بند ہے"]],
      teaching:authoredA1TeachingV4([
        ["bibliotheek","کتابیں لینے یا پڑھنے کی عوامی جگہ کو bibliotheek کہیں۔","یہ لائبریری ہے؛ buurthuis محلے کا مرکز ہے۔","bibliotheek کو کتاب boek کے معنی میں نہ لیں۔","bibliotheek — buurthuis","لائبریری — محلے کا مرکز۔","بی بلی او تیک"],
        ["ik wil nederlands leren","زبان کی جگہ پر Nederlands سیکھنے کا مقصد مکمل جملے میں بتائیں۔","یہ سیکھنے کی خواہش ہے؛ کلاس کی دستیابی الگ سوال ہے۔","wil خواہش بتاتا ہے؛ زبان Nederlands کے بعد سیکھنے کا فعل leren آتا ہے۔","Ik wil Nederlands leren.","میں Nederlands سیکھنا چاہتا یا چاہتی ہوں۔","اِک وِل نے دَر لانتس لیرَن"],
        ["buurthuis","محلے کی کلاس یا سرگرمیوں کی جگہ کو buurthuis کہیں۔","یہ کمیونٹی مرکز ہے؛ bibliotheek کتابوں کی جگہ ہے۔","buurthuis کو پڑوسی کے گھر کے معنی میں نہ لیں۔","buurthuis — bibliotheek","محلے کا مرکز — لائبریری۔","بیورت ہاؤس"],
        ["taalles","زبان سیکھنے کی کلاس کو taalles کہیں۔","یہ کلاس ہے؛ taal صرف زبان ہے۔","taalles کو عام کتاب یا کارڈ نہ سمجھیں۔","taalles — Nederlands leren","زبان کی کلاس — Nederlands سیکھنا۔","تال لَیس"],
        ["heeft u taalles","ادارے سے زبان کی کلاس ہونے کی تصدیق پوچھیں۔","یہ کلاس کی دستیابی ہے؛ اوقات الگ سوال ہیں۔","ہاں یا نہیں سوال میں heeft u سے شروع کریں۔","Heeft u taalles?","کیا آپ کے پاس زبان کی کلاس ہے؟","ہیفٹ یو تال لَیس"],
        ["ik wil lid worden","لائبریری کا رکن بننے کا مقصد مکمل جملے میں کہیں۔","lid worden رکن بننا ہے؛ صرف کارڈ لینا نہیں۔","lid نئی حالت ہے اور worden تبدیلی؛ رکن بننے کے لیے دونوں کو lid worden کی جوڑی میں رکھیں۔","Ik wil lid worden.","میں رکن بننا چاہتا یا چاہتی ہوں۔","اِک وِل لِت وور دَن"],
        ["hoe laat is het open","ادارہ کس وقت کھلتا ہے یہ پوچھیں۔","hoe laat گھڑی کا وقت پوچھتا ہے؛ vandaag is gesloten آج کی حالت ہے۔","open کو سوال کے آخر میں رکھیں۔","Hoe laat is het open?","یہ کتنے بجے کھلتا ہے؟","ہو لات اِس ہَت او پَن"],
        ["vandaag is het gesloten","آج جگہ بند ہو تو مکمل اطلاع سمجھیں یا دیں۔","gesloten بند ہے؛ open کھلا ہے۔","vandaag کے بعد is het رکھیں۔","Vandaag is het gesloten.","آج یہ بند ہے۔","فان داخ اِس ہَت خَ سلو تَن"]
      ]),
      pattern:{modelDutch:"ik wil Nederlands leren",titleUrdu:"سیکھنے کا مقصد بتانا",highlight:"ik wil Nederlands leren",explanationUrdu:"زبان سیکھنے کا مقصد بتانے کے لیے ik wil کے بعد زبان اور آخر میں leren رکھیں۔",contrastUrdu:"ik wil Nederlands leren مقصد ہے؛ heeft u taalles? کلاس کی دستیابی پوچھتا ہے۔",commonMistakeUrdu:"leren کو زبان سے پہلے نہ رکھیں؛ اس سیدھے جملے میں یہ آخر میں آتا ہے۔"},
      prerequisiteLessonIds:["a0-letters-1","a0-time-days","a1-questions","a1-directions-town"],prerequisiteRefs:[["a0-letters-1","boek"],["a0-time-days","vandaag"],["a1-questions","waar is het toilet?"],["a1-directions-town","dichtbij"]],
      scenarios:{bibliotheek:["library-recognise-place","کتابوں کی عوامی جگہ پہچانیں۔"],"ik wil nederlands leren":["library-state-goal","زبان سیکھنے کا مقصد بتائیں۔"],buurthuis:["library-recognise-centre","محلے کا مرکز پہچانیں۔"],taalles:["library-recognise-class","زبان کی کلاس پہچانیں۔"],"heeft u taalles":["library-ask-class","زبان کی کلاس کی دستیابی پوچھیں۔"],"ik wil lid worden":["library-request-membership","رکن بننے کا مقصد کہیں۔"],"hoe laat is het open":["library-ask-hours","کھلنے کا وقت پوچھیں۔"],"vandaag is het gesloten":["library-read-closed","آج بند ہونے کی اطلاع سمجھیں۔"]},
      document:{stableId:"library-hours-card",sourceKey:"library-hours-card",documentKind:"opening-hours-card",targetDutch:"hoe laat is het open?",title:"bibliotheek",labelUrdu:"لائبریری کے اوقات پڑھیں",promptUrdu:"کارڈ میں bibliotheek اور open دیکھیں، پھر کھلنے کا وقت پوچھنے والے مکمل سوال کا درست مطلب منتخب کریں۔",instructionUrdu:"اوقات کارڈ میں vandaag، open، اور gesloten الگ دیکھیں، پھر مناسب سیکھی ہوئی سوال چنیں۔",correctUrdu:"درست۔ hoe laat is het open? کھلنے کا وقت پوچھتا ہے۔",wrongUrdu:"یہ دوسری ادارے کی بات ہے۔ hoe laat گھڑی کا وقت پوچھتا ہے۔",rows:[{label:"bibliotheek",value:"bibliotheek"},{label:"open",value:"hoe laat is het open?"},{label:"gesloten",value:"vandaag is het gesloten"}]}
    },
    "a1-safety-rules": {
      title:"Borden en veilige plekken",unitLabel:"A1: سفر، شہر کی جگہیں اور حفاظت",outcomeUrdu:"منع، اجازت، خطرہ، محفوظ جگہ، انتظار، داخلہ، اور مدد کے عوامی نشان یا اعلان سمجھنا۔",
      seedConcepts:[["toegestaan","اجازت ہے"],["mag ik hier wachten?","کیا میں یہاں انتظار کر سکتا یا سکتی ہوں؟"],["gevaarlijk","خطرناک"],["veilig","محفوظ"],["het is hier verboden","یہاں منع ہے"],["u moet hier wachten","آپ کو یہاں انتظار کرنا ہے"],["de ingang is daar","داخلہ وہاں ہے"],["ik heb hulp nodig","مجھے مدد چاہیے"]],
      teaching:authoredA1TeachingV4([
        ["toegestaan","کسی کام کی اجازت والے نشان پر toegestaan پہچانیں۔","یہ اجازت ہے؛ verboden منع ہے۔","toegestaan کو محفوظ ہونے کے عمومی معنی میں نہ لیں۔","toegestaan — verboden","اجازت ہے — منع ہے۔","تو خَ ستان"],
        ["mag ik hier wachten","عوامی جگہ پر یہاں انتظار کرنے کی اجازت پوچھیں۔","یہ اجازت کا سوال ہے؛ انتظار کی ہدایت نہیں۔","mag ik اجازت پوچھتا ہے؛ hier جگہ اور wachten عمل ہے، اسی ترتیب میں سوال مکمل کریں۔","Mag ik hier wachten?","کیا میں یہاں انتظار کر سکتا یا سکتی ہوں؟","ماخ اِک ہیر واخ تَن"],
        ["gevaarlijk","خطرے والے نشان یا جگہ کے لیے gevaarlijk کہیں۔","یہ خطرناک ہے؛ veilig محفوظ ہے۔","gevaarlijk کو صرف منع کے معنی میں نہ سمجھیں۔","gevaarlijk — veilig","خطرناک — محفوظ۔","خَ فار لَک"],
        ["veilig","خطرہ نہ ہو یا جگہ محفوظ ہو تو veilig کہیں۔","یہ محفوظ ہے؛ toegestaan صرف اجازت بتاتا ہے۔","veilig کو آسان یا کھلا ہونے کے معنی میں نہ لیں۔","veilig — gevaarlijk","محفوظ — خطرناک۔","فَی لَخ"],
        ["het is hier verboden","نشان بتائے کہ یہاں کوئی کام منع ہے تو مکمل اطلاع سمجھیں۔","یہ ممانعت ہے؛ خطرے کی وجہ ضروری نہیں۔","hier جگہ بتاتا ہے اور verboden ممانعت؛ دونوں کو is کے بعد اسی ترتیب میں رکھیں۔","Het is hier verboden.","یہاں منع ہے۔","ہَت اِس ہیر فَر بو دَن"],
        ["u moet hier wachten","ملازم یا اعلان کی یہاں انتظار کرنے والی ہدایت سمجھیں۔","moet ضروری ہدایت ہے؛ mag ik اجازت کا سوال ہے۔","moet کے بعد جگہ hier اور پھر انتظار کا فعل wachten آتا ہے۔","U moet hier wachten.","آپ کو یہاں انتظار کرنا ہے۔","یو موت ہیر واخ تَن"],
        ["de ingang is daar","عمارت کے داخلے کی جگہ وہاں بتائیں یا سمجھیں۔","ingang داخلہ ہے؛ uitgang باہر جانے کا راستہ ہے۔","is کو نہ چھوڑیں؛ مکمل جگہ والا جملہ کہیں۔","De ingang is daar.","داخلہ وہاں ہے۔","دَ اِن خانخ اِس دار"],
        ["ik heb hulp nodig","فوری مدد درکار ہو تو واضح مکمل جملہ کہیں۔","یہ مدد کی ضرورت ہے؛ صرف خطرے کی کیفیت نہیں۔","hulp nodig کو ساتھ رکھیں۔","Ik heb hulp nodig.","مجھے مدد چاہیے۔","اِک ہَپ ہُلپ نو دَخ"]
      ]),
      pattern:{modelDutch:"mag ik hier wachten?",titleUrdu:"عوامی جگہ پر اجازت پوچھنا",highlight:"mag ik hier wachten",explanationUrdu:"اجازت پوچھنے کے لیے mag ik سے شروع کریں، پھر جگہ اور آخر میں کام رکھیں۔",contrastUrdu:"mag ik اجازت پوچھتا ہے؛ u moet ضروری ہدایت دیتا ہے۔",commonMistakeUrdu:"اجازت کے سوال کو moet سے شروع نہ کریں؛ یہاں mag ik استعمال کریں۔"},
      prerequisiteLessonIds:["a0-weather-clothing-safety","a0-transport-directions","a0-daily-actions","a1-polite-chunks"],prerequisiteRefs:[["a0-weather-clothing-safety","verboden"],["a0-weather-clothing-safety","waar is de uitgang"],["a0-transport-directions","ingang"],["a0-daily-actions","wachten"],["a1-polite-chunks","kunt u mij helpen alstublieft?"]],
      scenarios:{toegestaan:["safety-recognise-allowed","اجازت والا نشان پہچانیں۔"],"mag ik hier wachten":["safety-ask-wait","یہاں انتظار کی اجازت پوچھیں۔"],gevaarlijk:["safety-recognise-danger","خطرے والا نشان پہچانیں۔"],veilig:["safety-recognise-safe","محفوظ جگہ کا لفظ پہچانیں۔"],"het is hier verboden":["safety-read-forbidden","یہاں منع ہونے کی اطلاع سمجھیں۔"],"u moet hier wachten":["safety-follow-wait","یہاں انتظار کی ہدایت سمجھیں۔"],"de ingang is daar":["safety-locate-entrance","داخلے کی جگہ وہاں بتائیں۔"],"ik heb hulp nodig":["safety-request-help","فوری مدد کی ضرورت واضح کریں۔"]},
      document:{stableId:"safety-signs-card",sourceKey:"safety-signs-card",documentKind:"public-safety-signs",targetDutch:"het is hier verboden",title:"verboden",labelUrdu:"عوامی جگہ کے حفاظتی نشان پڑھیں",promptUrdu:"نشان میں verboden دیکھیں، پھر یہاں منع ہونے والی مکمل بات کا درست مطلب منتخب کریں۔",instructionUrdu:"نشانوں میں toegestaan، gevaarlijk، veilig، اور verboden الگ پہچانیں، پھر مناسب سیکھی ہوئی بات چنیں۔",correctUrdu:"درست۔ het is hier verboden یہاں ممانعت بتاتا ہے۔",wrongUrdu:"یہ دوسری حفاظتی بات ہے۔ verboden کا مطلب منع ہے۔",rows:[{label:"toegestaan",value:"toegestaan"},{label:"gevaarlijk",value:"gevaarlijk"},{label:"verboden",value:"het is hier verboden"}]}
    },
    "a1-short-messages": {
      title:"Een duidelijk kort bericht",unitLabel:"A1: پیغام، اسکول اور کام",outcomeUrdu:"سلام کے ساتھ مختصر پیغام شروع کرنا، دیر، بیماری یا ملاقات بتانا، جواب مانگنا، اور مؤدبانہ اختتام لکھنا۔",
      seedConcepts:[["hoi Sara, ik kom vandaag later","ہیلو Sara، میں آج دیر سے آؤں گا یا گی"],["bericht","پیغام"],["app","ایپ"],["ik ben vandaag ziek","میں آج بیمار ہوں"],["ik heb morgen een afspraak","میری کل ملاقات ہے"],["kunt u mij terugbellen?","کیا آپ مجھے واپس فون کر سکتے ہیں؟"],["ik heb uw bericht gelezen","میں نے آپ کا پیغام پڑھ لیا ہے"],["sorry voor mijn late antwoord","میرے دیر سے جواب کے لیے معذرت"],["dank u voor uw bericht","آپ کے پیغام کا شکریہ"]],
      teaching:authoredA1TeachingV4([
        ["hoi Sara, ik kom vandaag later","واقف شخص کو سلام کے بعد آج کی تاخیر ایک ہی مختصر پیغام میں بتائیں۔","یہ غیر رسمی آغاز ہے؛ رسمی فون کے لیے goedemorgen، u spreekt met … الگ ہے۔","hoi Sara کے بعد اصل اطلاع ضرور دیں؛ صرف سلام بھیج کر نہ رکیں۔","Hoi Sara, ik kom vandaag later.","ہیلو Sara، میں آج دیر سے آؤں گا یا گی۔","ہوئی سا را، اِک کوم فان داخ لا تَر"],
        ["bericht","فون یا ایپ میں بھیجی گئی مختصر تحریر کو bericht کہیں۔","یہ پیغام ہے؛ antwoord اس کا جواب ہے۔","bericht کو فون کال کے معنی میں نہ لیں۔","bericht — app","پیغام — ایپ۔","بَ رِخت"],
        ["app","فون پر پیغام یا اطلاع دیکھنے والی ایپ کو app کہیں۔","یہ ذریعہ ہے؛ bericht اس کے اندر پیغام ہے۔","app کو خود پیغام کے معنی میں نہ لیں۔","app — bericht","ایپ — پیغام۔","ایپ"],
        ["ik ben vandaag ziek","آج بیماری کی مختصر وجہ واضح کرنے کے لیے مکمل جملہ لکھیں۔","یہ آج کی حالت ہے؛ کل کی ملاقات الگ اطلاع ہے۔","vandaag کو ziek کے بعد نہ رکھیں؛ سیدھی بات میں درمیان میں رکھیں۔","Ik ben vandaag ziek.","میں آج بیمار ہوں۔","اِک بَین فان داخ زیک"],
        ["ik heb morgen een afspraak","کل پہلے سے طے ملاقات ہو تو مختصر وجہ یا منصوبہ بتائیں۔","یہ موجود ملاقات ہے؛ نئی ملاقات مانگنے کا جملہ نہیں۔","morgen کو afspraak کے بعد نہ بھیجیں۔","Ik heb morgen een afspraak.","میری کل ملاقات ہے۔","اِک ہَپ مور خَن اَن آف سپراک"],
        ["kunt u mij terugbellen","جواب فون پر چاہیے ہو تو مؤدبانہ واپسی کال مانگیں۔","یہ فون واپس کرنے کی درخواست ہے؛ تحریری bericht مانگنا نہیں۔","kunt u سے شروع کریں اور terugbellen آخر میں رکھیں۔","Kunt u mij terugbellen?","کیا آپ مجھے واپس فون کر سکتے ہیں؟","کُنت یو مَے تَ رُخ بَ لَن"],
        ["ik heb uw bericht gelezen","سامنے والے کو بتائیں کہ اس کا پیغام پڑھ لیا گیا ہے۔","یہ پڑھنے کی تصدیق ہے؛ جواب مکمل ہونے کی بات نہیں۔","uw bericht کو gelezen سے پہلے رکھیں۔","Ik heb uw bericht gelezen.","میں نے آپ کا پیغام پڑھ لیا ہے۔","اِک ہَپ یو بَ رِخت خَ لے زَن"],
        ["sorry voor mijn late antwoord","دیر سے جواب دینے پر واضح اور مختصر معذرت کریں۔","یہ جواب کی تاخیر ہے؛ خود ملاقات میں دیر الگ بات ہے۔","voor mijn late antwoord پورا رکھیں۔","Sorry voor mijn late antwoord.","میرے دیر سے جواب کے لیے معذرت۔","سو ری فور مَین لا تَ آنٹ وورت"],
        ["dank u voor uw bericht","رسمی یا مؤدبانہ پیغام کا جواب شکریے سے مکمل کریں۔","یہ پیغام کا شکریہ ہے؛ مدد کا شکریہ الگ ہے۔","voor uw bericht کو نہ چھوڑیں؛ شکریے کی وجہ واضح کریں۔","Dank u voor uw bericht.","آپ کے پیغام کا شکریہ۔","دانک یو فور یو بَ رِخت"]
      ]),
      pattern:{modelDutch:"hoi Sara, ik kom vandaag later",titleUrdu:"سلام کے بعد اصل اطلاع لکھنا",highlight:"hoi Sara, ik kom vandaag later",explanationUrdu:"واقف شخص کو مختصر پیغام میں پہلے hoi اور نام لکھیں، پھر comma کے بعد اصل اطلاع دیں۔",contrastUrdu:"hoi Sara غیر رسمی آغاز ہے؛ goedemorgen، u spreekt met Ali رسمی فون کا آغاز ہے۔",commonMistakeUrdu:"صرف hoi Sara نہ بھیجیں؛ اس کے بعد وجہ یا وقت کی مکمل بات لکھیں۔"},
      prerequisiteLessonIds:["a0-time-days","a0-health-emergency","a1-phone-calls","a1-appointments"],prerequisiteRefs:[["a0-time-days","vandaag"],["a0-time-days","morgen"],["a0-health-emergency","ziek"],["a1-phone-calls","kunt u later terugbellen?"],["a1-appointments","afspraak"]],
      scenarios:{"hoi sara ik kom vandaag later":["message-late-greeting","واقف ساتھی Sara کو آج دیر سے آنے کی مکمل مختصر اطلاع لکھیں۔"],bericht:["message-recognise-message","فون کی ایپ میں پیغام کا لفظ پہچانیں۔"],app:["message-recognise-app","پیغام دیکھنے والی فون ایپ پہچانیں۔"],"ik ben vandaag ziek":["message-sick-today","آج بیماری کی وجہ سے نہیں آ سکتے۔ مختصر وجہ لکھیں۔"],"ik heb morgen een afspraak":["message-appointment-tomorrow","کل پہلے سے طے ملاقات کی اطلاع دیں۔"],"kunt u mij terugbellen":["message-request-callback","تحریری جواب کافی نہیں۔ واپسی فون مانگیں۔"],"ik heb uw bericht gelezen":["message-confirm-read","ملازم کو بتائیں کہ اس کا پیغام پڑھ لیا ہے۔"],"sorry voor mijn late antwoord":["message-apologise-reply","جواب دیر سے بھیجا جا رہا ہے۔ مختصر معذرت کریں۔"],"dank u voor uw bericht":["message-thank-message","مؤدبانہ جواب کو پیغام کے شکریے سے مکمل کریں۔"]},
      document:{stableId:"short-message-thread",sourceKey:"short-message-thread",documentKind:"short-message-card",targetDutch:"ik heb uw bericht gelezen",title:"Bericht",labelUrdu:"مختصر پیغام کی گفتگو پڑھیں",promptUrdu:"گفتگو میں bericht gelezen دیکھیں، پھر پیغام پڑھ لینے والی مکمل بات کا درست مطلب منتخب کریں۔",instructionUrdu:"پیغام کارڈ میں سلام، اطلاع، اور جواب الگ پڑھیں، پھر پڑھنے کی تصدیق والی سیکھی ہوئی بات چنیں۔",correctUrdu:"درست۔ ik heb uw bericht gelezen پیغام پڑھ لینے کی تصدیق ہے۔",wrongUrdu:"یہ دوسری پیغام والی بات ہے۔ gelezen پڑھ لینے کو بتاتا ہے۔",rows:[{label:"hoi Sara",value:"ik kom vandaag later"},{label:"bericht",value:"ik heb uw bericht gelezen"},{label:"antwoord",value:"dank u voor uw bericht"}]}
    },
    "a1-work-school-messages": {
      title:"Afwezigheid en vertraging melden",unitLabel:"A1: پیغام، اسکول اور کام",outcomeUrdu:"فون یا پیغام میں اپنا نام، نہ آنے یا دیر کی وجہ، واپسی کا وقت، مطلوبہ جواب، اور مؤدبانہ اختتام دینا۔",
      seedConcepts:[["goedemorgen, u spreekt met Ali","صبح بخیر، Ali بات کر رہا یا رہی ہوں"],["ik kan vandaag niet komen","میں آج نہیں آ سکتا یا سکتی"],["ik ben ziek","میں بیمار ہوں"],["ik kom morgen weer","میں کل دوبارہ آؤں گا یا گی"],["ik ben tien minuten later","مجھے دس منٹ دیر ہو گی"],["de bus heeft vertraging","بس دیر سے ہے"],["kunt u mij terugbellen?","کیا آپ مجھے واپس فون کر سکتے ہیں؟"],["dank u voor uw begrip","سمجھنے کے لیے آپ کا شکریہ"]],
      teaching:authoredA1TeachingV4([
        ["goedemorgen, u spreekt met Ali","اسکول یا کام کو رسمی فون کرتے وقت سلام اور اپنا نام ایک ساتھ دیں۔","یہ فون کا رسمی آغاز ہے؛ hoi Sara ذاتی پیغام ہے۔","u spreekt met کے بعد اپنا نام کہیں؛ نام چھوڑنے سے فون کرنے والا واضح نہیں ہوتا۔","Goedemorgen, u spreekt met Ali.","صبح بخیر، Ali بات کر رہا یا رہی ہوں۔","خو دَ مور خَن، یو سپریکٹ مَت آ لی"],
        ["ik kan vandaag niet komen","آج نہ آ سکنے کی اصل اطلاع صاف مکمل جملے میں دیں۔","یہ عدم حاضری ہے؛ بیماری کی وجہ اگلے جملے میں آ سکتی ہے۔","niet کو komen سے پہلے رکھیں۔","Ik kan vandaag niet komen.","میں آج نہیں آ سکتا یا سکتی۔","اِک کان فان داخ نیت کو مَن"],
        ["ik ben ziek","عدم حاضری کی بیماری والی وجہ مختصر جملے میں بتائیں۔","یہ وجہ ہے؛ آنے کا اگلا دن الگ بات ہے۔","ben استعمال کریں؛ heb ziek نہ کہیں۔","Ik ben ziek.","میں بیمار ہوں۔","اِک بَین زیک"],
        ["ik kom morgen weer","غیر حاضری کے بعد کل واپس آنے کا منصوبہ بتائیں۔","یہ واپسی کا دن ہے؛ آج نہ آنے کی وجہ نہیں۔","morgen کو kom کے بعد اور weer آخر میں رکھیں۔","Ik kom morgen weer.","میں کل دوبارہ آؤں گا یا گی۔","اِک کوم مور خَن ویر"],
        ["ik ben tien minuten later","دیر کی مقدار دس منٹ ہو تو مکمل اطلاع دیں۔","یہ دس منٹ کی تاخیر ہے؛ پورا دن غیر حاضر ہونا نہیں۔","tien minuten کو later سے پہلے رکھیں۔","Ik ben tien minuten later.","مجھے دس منٹ دیر ہو گی۔","اِک بَین تین مِ نیو تَن لا تَر"],
        ["de bus heeft vertraging","بس کی تاخیر اپنی دیر کی وجہ کے طور پر واضح کریں۔","یہ وجہ ہے؛ de trein heeft vertraging ٹرین کے لیے ہے۔","bus کے بعد heeft اور پھر vertraging رکھیں۔","De bus heeft vertraging.","بس دیر سے ہے۔","دَ بُس ہیفٹ فَر ترا خِنگ"],
        ["kunt u mij terugbellen","اپنی اطلاع کے بعد اگر جواب چاہیے ہو تو واپسی فون مانگیں۔","یہ مطلوبہ جواب ہے؛ خود غیر حاضری کی وجہ نہیں۔","terugbellen کو آخر میں رکھیں۔","Kunt u mij terugbellen?","کیا آپ مجھے واپس فون کر سکتے ہیں؟","کُنت یو مَے تَ رُخ بَ لَن"],
        ["dank u voor uw begrip","غیر حاضری یا دیر کے پیغام کو سمجھنے کے شکریے سے ختم کریں۔","یہ begrip یعنی سمجھنے کا شکریہ ہے؛ bericht کا شکریہ الگ ہے۔","voor uw begrip پورا رکھیں۔","Dank u voor uw begrip.","سمجھنے کے لیے آپ کا شکریہ۔","دانک یو فور یو بَ خِرِپ"]
      ]),
      pattern:{modelDutch:"goedemorgen, u spreekt met Ali",titleUrdu:"رسمی فون میں سلام اور نام دینا",highlight:"goedemorgen, u spreekt met Ali",explanationUrdu:"کام یا اسکول کو فون میں پہلے سلام کریں، پھر u spreekt met کے بعد اپنا نام دیں۔",contrastUrdu:"رسمی فون میں u spreekt met Ali کہیں؛ ذاتی ایپ پیغام میں hoi Sara مناسب ہے۔",commonMistakeUrdu:"اپنا نام چھوڑ کر سیدھی وجہ نہ کہیں؛ پہلے فون کرنے والے کی پہچان دیں۔"},
      prerequisiteLessonIds:["a0-greetings-courtesy","a0-time-days","a0-health-emergency","a1-short-messages","a1-public-transport"],prerequisiteRefs:[["a0-greetings-courtesy","goedemorgen"],["a0-time-days","vandaag"],["a0-time-days","morgen"],["a0-health-emergency","ik ben ziek"],["a1-short-messages","kunt u mij terugbellen?"],["a1-public-transport","vertraging"]],
      scenarios:{"goedemorgen u spreekt met ali":["absence-phone-intro","اسکول یا کام کے دفتر کو فون پر رسمی سلام اور اپنا نام دیں۔"],"ik kan vandaag niet komen":["absence-state-today","آج حاضر نہیں ہو سکتے۔ اصل اطلاع واضح کریں۔"],"ik ben ziek":["absence-give-reason","ملازم وجہ پوچھتا ہے۔ بیماری بتائیں۔"],"ik kom morgen weer":["absence-give-return","پوچھا جاتا ہے کب واپس آئیں گے۔ کل کی واپسی بتائیں۔"],"ik ben tien minuten later":["delay-ten-minutes","آپ پہنچیں گے مگر دس منٹ دیر سے۔ مقدار بتائیں۔"],"de bus heeft vertraging":["delay-bus-reason","بس کے دیر سے ہونے کو اپنی تاخیر کی وجہ بتائیں۔"],"kunt u mij terugbellen":["absence-request-callback","پیغام کے بعد ذمہ دار سے واپسی فون مانگیں۔"],"dank u voor uw begrip":["absence-polite-close","غیر حاضری کی اطلاع مؤدبانہ شکریے سے ختم کریں۔"]}
    },
    "a1-school-contact": {
      title:"Schoolbericht en oudercontact",unitLabel:"A1: پیغام، اسکول اور کام",outcomeUrdu:"بچے کی غیر حاضری اور بخار بتانا، استاد سے بات مانگنا، سبق یا گھر کے کام کا وقت پوچھنا، اور اسکول ایپ کا نوٹس سمجھنا۔",
      seedConcepts:[["mijn kind komt vandaag niet naar school","میرا بچہ آج اسکول نہیں آئے گا"],["school","اسکول"],["docent","استاد"],["huiswerk","گھر کا کام"],["rooster","اوقات کی فہرست"],["mijn kind heeft koorts","میرے بچے کو بخار ہے"],["ik wil de docent spreken","میں استاد سے بات کرنا چاہتا یا چاہتی ہوں"],["hoe laat begint de les?","سبق کتنے بجے شروع ہوتا ہے؟"],["waar staat het huiswerk?","گھر کا کام کہاں لکھا ہے؟"],["het rooster staat in de app","اوقات ایپ میں ہیں"],["morgen is er geen school","کل اسکول نہیں ہے"],["kunt u mij een bericht sturen?","کیا آپ مجھے پیغام بھیج سکتے ہیں؟"]],
      teaching:authoredA1TeachingV4([
        ["mijn kind komt vandaag niet naar school","اسکول کو بچے کی آج کی غیر حاضری مکمل جملے میں بتائیں۔","یہ بچے کی غیر حاضری ہے؛ اپنی کام کی غیر حاضری نہیں۔","niet کو naar school سے پہلے رکھیں۔","Mijn kind komt vandaag niet naar school.","میرا بچہ آج اسکول نہیں آئے گا۔","مَین کِنت کومٹ فان داخ نیت نار سخُول"],
        ["school","بچے کی تعلیم اور سبق کی جگہ کو school کہیں۔","یہ جگہ ہے؛ docent وہاں استاد ہے۔","school کو سبق les کے معنی میں نہ لیں۔","school — docent","اسکول — استاد۔","سخُول"],
        ["docent","اسکول یا کورس کے استاد کو docent کہیں۔","یہ شخص ہے؛ school جگہ ہے۔","docent کو گھر کے کام huiswerk کے معنی میں نہ لیں۔","docent — school","استاد — اسکول۔","دو سَنت"],
        ["huiswerk","گھر میں مکمل کرنے والے اسکول کام کو huiswerk کہیں۔","یہ گھر کا کام ہے؛ rooster اوقات کی فہرست ہے۔","huiswerk کو گھر کی صفائی کے کام سے نہ ملائیں۔","huiswerk — app","گھر کا کام — ایپ۔","ہاؤس ویرک"],
        ["rooster","سبق کے دن اور وقت کی فہرست کو rooster کہیں۔","یہ اوقات ہیں؛ huiswerk کام ہے۔","rooster کو ایک خاص سبق les نہ سمجھیں۔","rooster — huiswerk","اوقات — گھر کا کام۔","روس تَر"],
        ["mijn kind heeft koorts","بچے کی غیر حاضری کی وجہ بخار ہو تو واضح جملہ کہیں۔","یہ بچے کا بخار ہے؛ اپنی بیماری ik ben ziek الگ ہے۔","kind کے بعد heeft رکھیں؛ is koorts نہ کہیں۔","Mijn kind heeft koorts.","میرے بچے کو بخار ہے۔","مَین کِنت ہیفٹ کورتس"],
        ["ik wil de docent spreken","بچے یا سبق کے بارے میں استاد سے بات مانگیں۔","یہ گفتگو کی درخواست ہے؛ پیغام بھیجنے کی درخواست الگ ہے۔","docent کے بعد spreken آخر میں رکھیں۔","Goedemorgen, ik wil de docent spreken.","صبح بخیر، میں استاد سے بات کرنا چاہتا یا چاہتی ہوں۔","اِک وِل دَ دو سَنت سپرے کَن"],
        ["hoe laat begint de les","سبق کا گھڑی والا آغاز پوچھیں۔","hoe laat وقت پوچھتا ہے؛ waar huiswerk کی جگہ پوچھتا ہے۔","begint کو de les سے پہلے رکھیں۔","Goedemorgen, hoe laat begint de les?","صبح بخیر، سبق کتنے بجے شروع ہوتا ہے؟","ہو لات بَ خِنت دَ لَس"],
        ["waar staat het huiswerk","ایپ یا نوٹس میں گھر کا کام کہاں لکھا ہے پوچھیں۔","waar جگہ پوچھتا ہے؛ hoe laat سبق کا وقت پوچھتا ہے۔","huiswerk کو سوال کے آخر میں رکھیں۔","Waar staat het huiswerk?","گھر کا کام کہاں لکھا ہے؟","وار ستات ہَت ہاؤس ویرک"],
        ["het rooster staat in de app","اسکول کے اوقات ایپ میں ہونے کی اطلاع سمجھیں یا دیں۔","یہ rooster کی جگہ ہے؛ morgen geen school تعطیل کی اطلاع ہے۔","in de app کو آخر میں رکھیں۔","Het rooster staat in de app.","اوقات ایپ میں ہیں۔","ہَت روس تَر ستات اِن دَ ایپ"],
        ["morgen is er geen school","اسکول ایپ میں کل چھٹی ہونے کی اطلاع سمجھیں۔","یہ کل اسکول نہ ہونے کی بات ہے؛ آج بچے کی بیماری نہیں۔","geen اسم school کی نفی کرتا ہے، اس لیے چھٹی کی اطلاع میں دونوں ساتھ آئیں۔","Morgen is er geen school.","کل اسکول نہیں ہے۔","مور خَن اِس اَر خین سخُول"],
        ["kunt u mij een bericht sturen","استاد یا دفتر سے تحریری پیغام بھیجنے کی درخواست کریں۔","یہ تحریری bericht ہے؛ terugbellen فون کی درخواست ہے۔","kunt u سے شروع کریں اور sturen آخر میں رکھیں۔","Kunt u mij een bericht sturen?","کیا آپ مجھے پیغام بھیج سکتے ہیں؟","کُنت یو مَے اَن بَ رِخت ستیو رَن"]
      ]),
      pattern:{modelDutch:"mijn kind komt vandaag niet naar school",titleUrdu:"بچے کی غیر حاضری مکمل بتانا",highlight:"mijn kind komt vandaag niet naar school",explanationUrdu:"اسکول کو اطلاع میں پہلے mijn kind، پھر vandaag niet اور آخر میں naar school رکھیں۔",contrastUrdu:"یہ بچے کی غیر حاضری ہے؛ ik kan vandaag niet komen اپنی غیر حاضری ہے۔",commonMistakeUrdu:"صرف mijn kind is ziek پر نہ رکیں؛ اسکول کو یہ بھی بتائیں کہ بچہ آج نہیں آئے گا۔"},
      prerequisiteLessonIds:["a0-greetings-courtesy","a0-child-school","a0-time-days","a1-short-messages","a1-work-school-messages"],prerequisiteRefs:[["a0-greetings-courtesy","goedemorgen"],["a0-child-school","school"],["a0-child-school","docent"],["a0-child-school","mijn kind is ziek"],["a0-time-days","morgen"],["a1-short-messages","bericht"],["a1-short-messages","app"],["a1-work-school-messages","ik kan vandaag niet komen"]],
      scenarios:{"mijn kind komt vandaag niet naar school":["school-report-absence","اسکول ایپ میں بچے کی آج کی غیر حاضری مکمل لکھیں۔"],school:["school-recognise-place","نوٹس میں تعلیم کی جگہ کا لفظ پہچانیں۔"],docent:["school-recognise-teacher","بچے کے استاد کا لفظ پہچانیں۔"],huiswerk:["school-recognise-homework","ایپ میں گھر پر کرنے والا کام پہچانیں۔"],rooster:["school-recognise-schedule","سبق کے دن اور وقت والی فہرست پہچانیں۔"],"mijn kind heeft koorts":["school-give-fever-reason","اسکول کو بچے کے بخار کی وجہ بتائیں۔"],"ik wil de docent spreken":["school-request-teacher","بچے کے بارے میں استاد سے بات مانگیں۔"],"hoe laat begint de les":["school-ask-start","سبق کا شروع ہونے کا وقت پوچھیں۔"],"waar staat het huiswerk":["school-find-homework","ایپ میں گھر کا کام نہیں مل رہا۔ جگہ پوچھیں۔"],"het rooster staat in de app":["school-read-app-schedule","دفتر بتاتا ہے کہ اوقات ایپ میں ہیں۔ اطلاع سمجھیں۔"],"morgen is er geen school":["school-read-closure","ایپ میں کل اسکول نہ ہونے کی اطلاع سمجھیں۔"],"kunt u mij een bericht sturen":["school-request-message","استاد سے معلومات تحریری پیغام میں مانگیں۔"]},
      document:{stableId:"school-app-notice",sourceKey:"school-app-notice",documentKind:"school-app-notice",targetDutch:"waar staat het huiswerk?",title:"School",labelUrdu:"اسکول ایپ کا نوٹس پڑھیں",promptUrdu:"نوٹس میں huiswerk اور app دیکھیں، پھر گھر کا کام کہاں لکھا ہے پوچھنے والی مکمل بات کا درست مطلب منتخب کریں۔",instructionUrdu:"اسکول نوٹس میں rooster، huiswerk، اور morgen geen school الگ پڑھیں، پھر گھر کے کام کی جگہ پوچھنے والی سیکھی ہوئی بات چنیں۔",correctUrdu:"درست۔ waar staat het huiswerk? گھر کے کام کی جگہ پوچھتا ہے۔",wrongUrdu:"یہ دوسری اسکول والی بات ہے۔ waar گھر کے کام کی جگہ پوچھتا ہے۔",rows:[{label:"rooster",value:"het rooster staat in de app"},{label:"huiswerk",value:"waar staat het huiswerk?"},{label:"morgen",value:"morgen is er geen school"}]}
    },
    "a1-work-schedule": {
      title:"Rooster en verandering op het werk",unitLabel:"A1: پیغام، اسکول اور کام",outcomeUrdu:"کام کا rooster اور dienst پڑھنا، آغاز اور وقفہ بتانا، بیماری یا کل کی عدم دستیابی لکھنا، اور بدلی ڈیوٹی پر ذمہ دار سے بات مانگنا۔",
      seedConcepts:[["mijn dienst is veranderd","میری ڈیوٹی بدل گئی ہے"],["rooster","اوقات کی فہرست"],["dienst","ڈیوٹی"],["pauze","وقفہ"],["baas","ذمہ دار یا باس"],["ik begin om negen uur","میں نو بجے شروع کرتا یا کرتی ہوں"],["ik heb om twaalf uur pauze","میرا بارہ بجے وقفہ ہے"],["ik werk morgen niet","میں کل کام نہیں کرتا یا کرتی"],["ik ben ziek en kan niet werken","میں بیمار ہوں اور کام نہیں کر سکتا یا سکتی"],["kan ik met mijn baas spreken?","کیا میں اپنے باس سے بات کر سکتا یا سکتی ہوں؟"],["staat het rooster in de app?","کیا اوقات ایپ میں ہیں؟"]],
      teaching:authoredA1TeachingV4([
        ["mijn dienst is veranderd","مقرر ڈیوٹی بدل جائے تو مکمل تبدیلی واضح کریں۔","یہ ایک dienst کی تبدیلی ہے؛ پورا rooster کہاں ہے یہ الگ سوال ہے۔","veranderd بدلی ہوئی حالت ہے؛ اسے is کے بعد رکھ کر ڈیوٹی کی تبدیلی مکمل کریں۔","Mijn dienst is veranderd.","میری ڈیوٹی بدل گئی ہے۔","مَین دینسٹ اِس فَر آن دَرت"],
        ["rooster","کام کے دن، ڈیوٹی اور وقت کی فہرست کو rooster کہیں۔","یہ پوری فہرست ہے؛ dienst ایک ڈیوٹی ہے۔","rooster کو وقفہ pauze نہ سمجھیں۔","rooster — dienst","اوقات — ڈیوٹی۔","روس تَر"],
        ["dienst","ایک مقرر کام کی ڈیوٹی یا شفٹ کو dienst کہیں۔","یہ ایک شفٹ ہے؛ rooster تمام اوقات کی فہرست ہے۔","dienst کو عام کام werk کے معنی میں ہر جگہ نہ بولیں۔","dienst — rooster","ڈیوٹی — اوقات۔","دینسٹ"],
        ["pauze","کام کے درمیان مقرر وقفے کو pauze کہیں۔","یہ آرام کا وقفہ ہے؛ dienst ختم ہونا نہیں۔","pauze کو بیماری کی چھٹی نہ سمجھیں۔","pauze — dienst","وقفہ — ڈیوٹی۔","پاؤ زَ"],
        ["baas","کام میں ذمہ دار شخص یا باس کو baas کہیں۔","یہ ذمہ دار شخص ہے؛ collega ساتھی ہے۔","baas کو پوری کمپنی کے معنی میں نہ لیں۔","baas — collega","باس — ساتھی۔","باس"],
        ["ik begin om negen uur","اپنا کام شروع ہونے کا گھڑی والا وقت بتائیں۔","یہ آغاز ہے؛ pauze کا وقت الگ ہے۔","om کو وقت سے پہلے رکھیں۔","Ik begin om negen uur.","میں نو بجے شروع کرتا یا کرتی ہوں۔","اِک بَ خِن اوم نے خَن یور"],
        ["ik heb om twaalf uur pauze","اپنے وقفے کا گھڑی والا وقت مکمل جملے میں بتائیں۔","یہ pauze ہے؛ کام شروع ہونے کا وقت نہیں۔","om twaalf uur کو pauze سے پہلے رکھیں۔","Ik heb om twaalf uur pauze.","میرا بارہ بجے وقفہ ہے۔","اِک ہَپ اوم توالف یور پاؤ زَ"],
        ["ik werk morgen niet","کل کام پر دستیاب نہ ہوں تو مختصر واضح اطلاع دیں۔","یہ کل کی عدم دستیابی ہے؛ آج بیماری کی وجہ الگ ہو سکتی ہے۔","یہ کام کی نفی ہے، اس لیے niet پورے بیان کے آخر میں آتا ہے اور morgen دن بتاتا ہے۔","Ik werk morgen niet.","میں کل کام نہیں کرتا یا کرتی۔","اِک ویرک مور خَن نیت"],
        ["ik ben ziek en kan niet werken","بیماری اور کام نہ کر سکنے کی وجہ ایک مکمل جملے میں دیں۔","یہ بیماری کی وجہ ہے؛ dienst کی تبدیلی الگ مسئلہ ہے۔","en کے دونوں طرف مکمل بات رکھیں۔","Ik ben ziek en kan niet werken.","میں بیمار ہوں اور کام نہیں کر سکتا یا سکتی۔","اِک بَین زیک اَن کان نیت ویر کَن"],
        ["kan ik met mijn baas spreken","ڈیوٹی یا rooster کے مسئلے پر ذمہ دار سے بات مانگیں۔","یہ گفتگو کی درخواست ہے؛ collega سے عام بات نہیں۔","met mijn baas کو spreken سے پہلے رکھیں۔","Kan ik met mijn baas spreken?","کیا میں اپنے باس سے بات کر سکتا یا سکتی ہوں؟","کان اِک مَت مَین باس سپرے کَن"],
        ["staat het rooster in de app","کام کے اوقات ایپ میں ہونے کی تصدیق پوچھیں۔","یہ rooster کی جگہ پوچھتا ہے؛ dienst بدلنے کی اطلاع نہیں۔","ہاں یا نہیں سوال میں staat پہلے رکھیں۔","Staat het rooster in de app?","کیا اوقات ایپ میں ہیں؟","ستات ہَت روس تَر اِن دَ ایپ"]
      ]),
      pattern:{modelDutch:"mijn dienst is veranderd",titleUrdu:"کام کی بدلی ڈیوٹی بتانا",highlight:"mijn dienst is veranderd",explanationUrdu:"اپنی ڈیوٹی کی تبدیلی کے لیے mijn dienst کے بعد is veranderd رکھیں۔",contrastUrdu:"dienst ایک ڈیوٹی ہے؛ rooster پوری اوقات کی فہرست ہے۔",commonMistakeUrdu:"صرف veranderd نہ کہیں؛ کون سی چیز بدلی ہے مکمل بتائیں۔"},
      prerequisiteLessonIds:["a0-time-days","a0-work-basics","a1-daily-routine","a1-calendar-time","a1-short-messages","a1-work-school-messages"],prerequisiteRefs:[["a0-time-days","morgen"],["a0-work-basics","werk"],["a0-work-basics","collega"],["a1-daily-routine","ik begin om negen uur"],["a1-calendar-time","rooster"],["a1-short-messages","app"],["a1-work-school-messages","ik ben ziek"]],
      scenarios:{"mijn dienst is veranderd":["work-report-shift-change","ایپ میں اپنی ڈیوٹی بدلی ہوئی دیکھتے ہیں۔ تبدیلی واضح کریں۔"],rooster:["work-recognise-schedule","کام کے تمام دن اور وقت والی فہرست پہچانیں۔"],dienst:["work-recognise-shift","اپنی مقرر ڈیوٹی کا لفظ پہچانیں۔"],pauze:["work-recognise-break","کام کے درمیان وقفہ پہچانیں۔"],baas:["work-recognise-manager","rooster کے ذمہ دار شخص کا لفظ پہچانیں۔"],"ik begin om negen uur":["work-state-start","ساتھی کو اپنے کام کا آغاز نو بجے بتائیں۔"],"ik heb om twaalf uur pauze":["work-state-break","ساتھی کو بارہ بجے وقفہ بتائیں۔"],"ik werk morgen niet":["work-unavailable-tomorrow","کل کام پر دستیاب نہیں۔ مختصر اطلاع دیں۔"],"ik ben ziek en kan niet werken":["work-sick-absence","بیماری کی وجہ سے کام نہیں کر سکتے۔ مکمل وجہ بتائیں۔"],"kan ik met mijn baas spreken":["work-request-manager","بدلی ڈیوٹی پر ذمہ دار سے بات مانگیں۔"],"staat het rooster in de app":["work-ask-app-schedule","کام کے اوقات ایپ میں ہیں یا نہیں پوچھیں۔"]},
      document:{stableId:"work-roster-change",sourceKey:"work-roster-change",documentKind:"work-roster-card",targetDutch:"mijn dienst is veranderd",title:"Rooster",labelUrdu:"کام کا rooster اور تبدیلی پڑھیں",promptUrdu:"rooster میں dienst veranderd دیکھیں، پھر ڈیوٹی بدلنے والی مکمل بات کا درست مطلب منتخب کریں۔",instructionUrdu:"کام کے کارڈ میں begin، pauze، اور dienst veranderd الگ پڑھیں، پھر تبدیلی والی سیکھی ہوئی بات چنیں۔",correctUrdu:"درست۔ mijn dienst is veranderd اپنی ڈیوٹی کی تبدیلی بتاتا ہے۔",wrongUrdu:"یہ دوسری کام والی بات ہے۔ veranderd بدلی ہوئی ڈیوٹی بتاتا ہے۔",rows:[{label:"begin",value:"ik begin om negen uur"},{label:"pauze",value:"ik heb om twaalf uur pauze"},{label:"dienst",value:"mijn dienst is veranderd"}]}
    },
    "a1-health-appointments": {
      title:"Een afspraak bij de huisarts",unitLabel:"A1: ڈاکٹر، علامات اور دوا",outcomeUrdu:"huisarts کے استقبالی ملازم سے ملاقات مانگنا، ذاتی معلومات کی تصدیق کرنا، فوری ضرورت بتانا، اور مناسب وقت یا واپسی کال طے کرنا۔",
      seedConcepts:[["huisarts","گھر کا ڈاکٹر"],["assistente","ڈاکٹر کی استقبالی ملازمہ"],["ik wil een afspraak bij de huisarts","میں huisarts سے ملاقات چاہتا یا چاہتی ہوں"],["wat is uw geboortedatum?","آپ کی تاریخ پیدائش کیا ہے؟"],["wanneer kan ik komen?","میں کب آ سکتا یا سکتی ہوں؟"],["ik kan morgen niet komen","میں کل نہیں آ سکتا یا سکتی"],["is het dringend?","کیا یہ فوری ہے؟"],["kunt u mij terugbellen?","کیا آپ مجھے واپس فون کر سکتے ہیں؟"]],
      teaching:authoredA1TeachingV4([
        ["huisarts","عام صحت کے مسئلے کے لیے پہلے گھر کے ڈاکٹر کو huisarts کہیں۔","یہ عام ڈاکٹر ہے؛ tandarts دانتوں کا ڈاکٹر ہے۔","huisarts کو ہسپتال یا دواخانے کے معنی میں نہ لیں۔","huisarts — dokter","گھر کا ڈاکٹر — ڈاکٹر۔","ہاؤس آرتس"],
        ["assistente","huisarts کی کال سنبھالنے اور وقت دینے والی ملازمہ کو assistente کہیں۔","یہ استقبالی ملازمہ ہے؛ خود huisarts نہیں۔","assistente سے بات کرتے ہوئے اسے dokter نہ کہیں۔","assistente — huisarts","استقبالی ملازمہ — گھر کا ڈاکٹر۔","آ سِس تَنتَ"],
        ["ik wil een afspraak bij de huisarts","فون پر huisarts سے ملاقات مانگنے کا مقصد مکمل جملے میں کہیں۔","bij de huisarts جگہ بتاتا ہے؛ صرف afspraak عام ملاقات ہو سکتی ہے۔","huisarts سے پہلے bij de رکھیں اور ملاقات کو een afspraak کہیں۔","Ik wil een afspraak bij de huisarts.","میں huisarts سے ملاقات چاہتا یا چاہتی ہوں۔","اِک وِل اَن آف سپراک بَے دَ ہاؤس آرتس"],
        ["wat is uw geboortedatum","استقبالی ملازم تاریخ پیدائش کی تصدیق کے لیے یہ سوال پوچھتا ہے۔","geboortedatum تاریخ پیدائش ہے؛ afspraak کی تاریخ نہیں۔","uw ذاتی معلومات کے احترام والا لفظ ہے؛ اسے دن کے نام سے نہ بدلیں۔","Wat is uw geboortedatum?","آپ کی تاریخ پیدائش کیا ہے؟","وات اِس یو خَ بور تَ دا تُم"],
        ["wanneer kan ik komen","ملاقات ملنے کا دن یا وقت پوچھنے کے لیے یہ مکمل سوال کہیں۔","wanneer وقت یا دن پوچھتا ہے؛ waar جگہ پوچھتا ہے۔","wanneer سے شروع کریں اور komen آخر میں رکھیں۔","Wanneer kan ik komen?","میں کب آ سکتا یا سکتی ہوں؟","وا نیر کان اِک کو مَن"],
        ["ik kan morgen niet komen","پیش کیا گیا کل کا وقت ممکن نہ ہو تو واضح اطلاع دیں۔","یہ عدم دستیابی ہے؛ ملاقات خود بخود منسوخ نہیں ہوتی۔","niet آنے کی نفی ہے، اس لیے ملاقات والی اطلاع میں komen کے عین پہلے رہتا ہے۔","Ik kan morgen niet komen.","میں کل نہیں آ سکتا یا سکتی۔","اِک کان مور خَن نیت کو مَن"],
        ["is het dringend","استقبالی ملازم پوچھتا ہے کہ مسئلہ فوری ہے یا انتظار کر سکتا ہے۔","dringend فوری ضرورت ہے؛ عام afspraak کا وقت نہیں۔","یہ ہاں یا نہیں سوال ہے؛ is پہلے رکھیں۔","Is het dringend?","کیا یہ فوری ہے؟","اِس ہَت درِن خَنت"],
        ["kunt u mij terugbellen","فون پر جواب فوراً نہ ملے تو مؤدبانہ واپسی کال مانگیں۔","terugbellen واپس فون کرنا ہے؛ afspraak بنانا نہیں۔","kunt u سے شروع کریں اور terugbellen آخر میں رکھیں۔","Kunt u mij terugbellen?","کیا آپ مجھے واپس فون کر سکتے ہیں؟","کُنت یو مَے تَ رُخ بَ لَن"]
      ]),
      pattern:{modelDutch:"ik wil een afspraak bij de huisarts",titleUrdu:"ڈاکٹر سے ملاقات کا مقصد کہنا",highlight:"ik wil een afspraak bij de huisarts",explanationUrdu:"ملاقات مانگنے کے لیے ik wil een afspraak کے بعد bij de huisarts رکھیں۔",contrastUrdu:"یہ huisarts سے نئی ملاقات مانگتا ہے؛ wanneer kan ik komen? ممکن وقت پوچھتا ہے۔",commonMistakeUrdu:"huisarts سے پہلے bij de نہ چھوڑیں؛ مکمل جگہ والی بات کہیں۔"},
      prerequisiteLessonIds:["a0-date-appointment","a0-health-emergency","a0-spelling-personal-details","a1-phone-calls","a1-appointments"],prerequisiteRefs:[["a0-date-appointment","afspraak"],["a0-health-emergency","dokter"],["a0-spelling-personal-details","geboortedatum"],["a1-phone-calls","kunt u later terugbellen?"],["a1-appointments","ik wil een afspraak maken"]],
      scenarios:{huisarts:["health-appointment-recognise-gp","عام صحت کے مسئلے کے لیے درست ڈاکٹر پہچانیں۔"],assistente:["health-appointment-recognise-assistant","فون سنبھالنے والی huisarts کی ملازمہ پہچانیں۔"],"ik wil een afspraak bij de huisarts":["health-appointment-request","huisarts کو فون کر کے ملاقات کا مقصد کہیں۔"],"wat is uw geboortedatum":["health-appointment-hear-dob","استقبالی ملازم ذاتی معلومات کی تصدیق پوچھتا ہے۔ سوال سمجھیں۔"],"wanneer kan ik komen":["health-appointment-ask-when","ملاقات کے ممکن دن یا وقت کے بارے میں پوچھیں۔"],"ik kan morgen niet komen":["health-appointment-decline-tomorrow","کل کا پیش کیا وقت ممکن نہیں۔ واضح اطلاع دیں۔"],"is het dringend":["health-appointment-urgency","استقبالی ملازم پوچھتا ہے کہ مسئلہ فوری ہے۔ سوال پہچانیں۔"],"kunt u mij terugbellen":["health-appointment-callback","ڈاکٹر ابھی دستیاب نہیں۔ واپسی کال کی درخواست کریں۔"]},
      document:{stableId:"health-appointment-confirmation",sourceKey:"health-appointment-card",documentKind:"doctor-appointment-card",targetDutch:"wanneer kan ik komen?",title:"Huisarts",labelUrdu:"huisarts کی ملاقات کا کارڈ پڑھیں",promptUrdu:"کارڈ میں huisarts، morgen، اور 10:30 دیکھیں، پھر آنے کا ممکن وقت پوچھنے والے مکمل سوال کا درست مطلب منتخب کریں۔",instructionUrdu:"ملاقات کارڈ میں huisarts، afspraak، اور morgen الگ پڑھیں، پھر وقت پوچھنے والی سیکھی ہوئی بات چنیں۔",correctUrdu:"درست۔ wanneer kan ik komen? آنے کا ممکن دن یا وقت پوچھتا ہے۔",wrongUrdu:"یہ دوسری ملاقات کی بات ہے۔ wanneer والا سوال ممکن وقت پوچھتا ہے۔",rows:[{label:"huisarts",value:"afspraak"},{label:"afspraak",value:"morgen"},{label:"wanneer kan ik komen?",value:"10:30"}]}
    },
    "a1-doctor-symptoms": {
      title:"Klachten vertellen aan de huisarts",unitLabel:"A1: ڈاکٹر، علامات اور دوا",outcomeUrdu:"درد، بخار، کھانسی اور مدت واضح کرنا، ڈاکٹر کے بنیادی سوال سمجھنا، اور آرام کی ہدایت سننا۔",
      seedConcepts:[["ik heb pijn in mijn buik","میرے پیٹ میں درد ہے"],["hoofd","سر"],["buik","پیٹ"],["hoofdpijn","سر درد"],["buikpijn","پیٹ درد"],["koorts","بخار"],["hoesten","کھانسی کرنا"],["ik heb sinds gisteren koorts","مجھے کل سے بخار ہے"],["waar doet het pijn?","کہاں درد ہے؟"],["hoe lang bent u ziek?","آپ کب سے بیمار ہیں؟"],["u moet rust nemen","آپ کو آرام کرنا چاہیے"]],
      teaching:authoredA1TeachingV4([
        ["hoofd","جسم کے سر والے حصے کو hoofd کہیں۔","یہ سر ہے؛ buik پیٹ ہے۔","hoofd کو سر درد کی پوری علامت hoofdpijn نہ سمجھیں۔","hoofd — buik","سر — پیٹ۔","ہوفٹ"],
        ["buik","جسم کے پیٹ والے حصے کو buik کہیں۔","یہ پیٹ ہے؛ hoofd سر ہے۔","buik کو پیٹ درد کی پوری علامت buikpijn نہ سمجھیں۔","buik — hoofd","پیٹ — سر۔","باؤک"],
        ["hoofdpijn","سر میں درد ہو تو علامت کے نام کے طور پر hoofdpijn کہیں۔","یہ سر درد ہے؛ buikpijn پیٹ درد ہے۔","hoofdpijn کو عام تمام درد کے معنی میں نہ لیں۔","Ik heb hoofdpijn.","میرے سر میں درد ہے۔","ہوفٹ پَین"],
        ["buikpijn","پیٹ میں درد ہو تو buikpijn کہیں۔","یہ پیٹ درد ہے؛ hoofdpijn سر درد ہے۔","buik اور hoofd کی جگہ نہ بدلیں۔","Ik heb buikpijn.","میرے پیٹ میں درد ہے۔","باؤک پَین"],
        ["koorts","جسم کا درجہ حرارت زیادہ ہونے کی علامت کو koorts کہیں۔","یہ بخار ہے؛ hoesten کھانسی کا عمل ہے۔","koorts کو درد کی جگہ کے معنی میں نہ لیں۔","Ik heb koorts.","مجھے بخار ہے۔","کورتس"],
        ["hoesten","کھانسی آنے کے عمل کے لیے hoesten کہیں۔","یہ عمل ہے؛ koorts بخار کی حالت ہے۔","hoesten کو دوا یا آرام کے معنی میں نہ لیں۔","hoesten — koorts","کھانسی کرنا — بخار۔","ہوس تَن"],
        ["ik heb pijn in mijn buik","ڈاکٹر کو درد کی جگہ پیٹ بتانے کے لیے مکمل جملہ کہیں۔","pijn in mijn buik جگہ واضح کرتا ہے؛ صرف pijn مبہم ہے۔","in mijn buik کو pijn کے بعد رکھیں۔","Ik heb pijn in mijn buik.","میرے پیٹ میں درد ہے۔","اِک ہَپ پَین اِن مَین باؤک"],
        ["ik heb sinds gisteren koorts","بخار کب سے ہے بتانے کے لیے sinds gisteren شامل کریں۔","یہ کل سے جاری بخار ہے؛ آج شروع ہونے کی بات نہیں۔","sinds gisteren کو koorts سے پہلے رکھیں۔","Ik heb sinds gisteren koorts.","مجھے کل سے بخار ہے۔","اِک ہَپ سِنتس خِس تَرَن کورتس"],
        ["waar doet het pijn","ڈاکٹر درد کی جگہ پوچھنے کے لیے یہ سوال کہتا ہے۔","waar جگہ پوچھتا ہے؛ hoe lang مدت پوچھتا ہے۔","جواب میں جسم کی جگہ بتائیں، وقت نہیں۔","Waar doet het pijn?","کہاں درد ہے؟","وار دوت ہَت پَین"],
        ["hoe lang bent u ziek","ڈاکٹر بیماری کی مدت پوچھنے کے لیے یہ سوال کہتا ہے۔","hoe lang مدت ہے؛ waar درد کی جگہ ہے۔","جواب میں sinds gisteren جیسی مدت دیں۔","Hoe lang bent u ziek?","آپ کب سے بیمار ہیں؟","ہو لانخ بَنت یو زیک"],
        ["u moet rust nemen","ڈاکٹر آرام کرنے کی ضروری ہدایت اس مکمل جملے میں دیتا ہے۔","یہ مشورہ ہے؛ دوا کی مقدار نہیں۔","rust nemen کو آخر میں ساتھ رکھیں۔","U moet rust nemen.","آپ کو آرام کرنا چاہیے۔","یو موت رُست نے مَن"]
      ]),
      pattern:{modelDutch:"ik heb pijn in mijn buik",titleUrdu:"درد کی جگہ واضح کرنا",highlight:"ik heb pijn in mijn buik",explanationUrdu:"درد بتانے کے لیے ik heb pijn in mijn کے بعد جسم کی جگہ رکھیں۔",contrastUrdu:"pijn in mijn buik جگہ بتاتا ہے؛ sinds gisteren koorts مدت بتاتا ہے۔",commonMistakeUrdu:"جسم کی جگہ سے پہلے in mijn نہ چھوڑیں۔"},
      prerequisiteLessonIds:["a0-health-emergency","a0-time-days","a1-health-appointments"],prerequisiteRefs:[["a0-health-emergency","ik ben ziek"],["a0-health-emergency","ik heb pijn"],["a0-time-days","gisteren"],["a1-health-appointments","huisarts"]],
      scenarios:{hoofd:["symptom-recognise-head","جسم میں سر والا حصہ پہچانیں۔"],buik:["symptom-recognise-belly","جسم میں پیٹ والا حصہ پہچانیں۔"],hoofdpijn:["symptom-recognise-headache","علامت کی فہرست میں سر درد پہچانیں۔"],buikpijn:["symptom-recognise-stomachache","علامت کی فہرست میں پیٹ درد پہچانیں۔"],koorts:["symptom-recognise-fever","درجہ حرارت زیادہ ہے۔ بخار کا لفظ پہچانیں۔"],hoesten:["symptom-recognise-cough","بار بار کھانسی آنے کا عمل پہچانیں۔"],"ik heb pijn in mijn buik":["symptom-report-location","huisarts کو پیٹ میں درد کی جگہ واضح کریں۔"],"ik heb sinds gisteren koorts":["symptom-report-duration","huisarts کو کل سے بخار ہونے کی مدت بتائیں۔"],"waar doet het pijn":["symptom-hear-location-question","ڈاکٹر درد کی جگہ پوچھتا ہے۔ سوال سمجھیں۔"],"hoe lang bent u ziek":["symptom-hear-duration-question","ڈاکٹر بیماری کی مدت پوچھتا ہے۔ سوال سمجھیں۔"],"u moet rust nemen":["symptom-follow-rest","ڈاکٹر آرام کرنے کی ہدایت دیتا ہے۔ اسے سمجھیں۔"]}
    },
    "a1-pharmacy-medicine": {
      title:"Medicijnen bij de apotheek",unitLabel:"A1: ڈاکٹر، علامات اور دوا",outcomeUrdu:"دواخانے میں دوا یا درد کی چیز مانگنا، نسخہ اور حساسیت بتانا، اور لیبل سے مقدار، وقت اور حفاظتی ہدایت سمجھنا۔",
      seedConcepts:[["hoe vaak moet ik dit nemen?","مجھے یہ کتنی بار لینا ہے؟"],["apotheek","دواخانہ"],["medicijn","دوا"],["recept","نسخہ"],["allergisch","حساسیت ہونا"],["heeft u iets tegen de pijn?","کیا آپ کے پاس درد کی کوئی دوا ہے؟"],["twee keer per dag","دن میں دو بار"],["voor of na het eten?","کھانے سے پہلے یا بعد؟"],["lees de bijsluiter","دوا کی معلومات والا پرچہ پڑھیں"]],
      teaching:authoredA1TeachingV4([
        ["apotheek","دوا لینے یا نسخہ دینے والی جگہ کو apotheek کہیں۔","یہ دواخانہ ہے؛ huisarts ڈاکٹر ہے۔","apotheek کو ڈاکٹر کی ملاقات کے معنی میں نہ لیں۔","Ik ga naar de apotheek.","میں دواخانے جاتا یا جاتی ہوں۔","آ پو تیک"],
        ["medicijn","بیماری یا درد کے علاج والی چیز کو medicijn کہیں۔","یہ دوا ہے؛ recept ڈاکٹر کا نسخہ ہے۔","medicijn کو ہدایت کے پرچے کے معنی میں نہ لیں۔","Dit medicijn is voor pijn.","یہ دوا درد کے لیے ہے۔","مے دِ سَین"],
        ["recept","ڈاکٹر کی لکھی دوا کی پرچی کو recept کہیں۔","یہ نسخہ ہے؛ bon خریداری کی رسید ہے۔","recept کو کھانے کی ترکیب یا رسید کے معنی میں نہ لیں۔","recept — medicijn","نسخہ — دوا۔","رَ سَپٹ"],
        ["allergisch","کسی دوا سے حساسیت ہو تو allergisch کہیں۔","یہ حساسیت ہے؛ عام درد یا بخار نہیں۔","دوا دینے سے پہلے allergisch کی بات واضح کریں۔","allergisch — medicijn","حساسیت — دوا۔","آ لَر خِس"],
        ["heeft u iets tegen de pijn","دواخانے میں درد کے لیے کوئی دوا مؤدبانہ سوال میں مانگیں۔","tegen de pijn مقصد ہے؛ recept پیش کرنا الگ بات ہے۔","heeft u سے شروع کریں اور tegen de pijn آخر میں رکھیں۔","Heeft u iets tegen de pijn?","کیا آپ کے پاس درد کی کوئی دوا ہے؟","ہیفٹ یو ایتس تے خَن دَ پَین"],
        ["hoe vaak moet ik dit nemen","دوا کتنی بار لینی ہے یہ واضح سوال میں پوچھیں۔","hoe vaak تعداد پوچھتا ہے؛ voor of na وقت پوچھتا ہے۔","nemen کو سوال کے آخر میں رکھیں۔","Hoe vaak moet ik dit nemen?","مجھے یہ کتنی بار لینا ہے؟","ہو فاک موت اِک دِت نے مَن"],
        ["twee keer per dag","لیبل پر دن میں دو خوراکوں کی ہدایت کو یہ فقرہ بتاتا ہے۔","یہ تعداد ہے؛ کھانے سے پہلے یا بعد کا وقت نہیں۔","per dag کو ساتھ رکھیں؛ صرف twee keer مبہم ہے۔","Twee keer per dag.","دن میں دو بار۔","توے کیر پَر داخ"],
        ["voor of na het eten","دوا کھانے سے پہلے یا بعد لینی ہے یہ پوچھیں۔","یہ خوراک کا وقت ہے؛ کتنی بار کے لیے hoe vaak ہے۔","voor اور na کو الٹ نہ سمجھیں۔","Voor of na het eten?","کھانے سے پہلے یا بعد؟","فور اوف نا ہَت اے تَن"],
        ["lees de bijsluiter","دوا کے ساتھ معلومات اور احتیاط والا پرچہ پڑھنے کی ہدایت سمجھیں۔","bijsluiter معلومات کا پرچہ ہے؛ recept دوا کا نسخہ ہے۔","lees ہدایت ہے؛ اسے سوال نہ سمجھیں۔","Lees de bijsluiter.","دوا کی معلومات والا پرچہ پڑھیں۔","لےس دَ بَے سْلاؤ تَر"]
      ]),
      pattern:{modelDutch:"hoe vaak moet ik dit nemen?",titleUrdu:"دوا کی تعداد پوچھنا",highlight:"hoe vaak moet ik dit nemen",explanationUrdu:"کتنی بار پوچھنے کے لیے hoe vaak سے شروع کریں، پھر moet ik dit اور آخر میں nemen رکھیں۔",contrastUrdu:"hoe vaak تعداد پوچھتا ہے؛ voor of na het eten خوراک کا وقت پوچھتا ہے۔",commonMistakeUrdu:"hoe vaak کے جواب میں دن یا گھڑی نہیں؛ twee keer per dag جیسی تعداد دیں۔"},
      prerequisiteLessonIds:["a0-health-emergency","a0-food-drink","a0-numbers-0-10","a1-doctor-symptoms"],prerequisiteRefs:[["a0-health-emergency","medicijn"],["a0-health-emergency","apotheek"],["a0-food-drink","eten"],["a0-numbers-0-10","twee"],["a1-doctor-symptoms","u moet rust nemen"]],
      scenarios:{apotheek:["medicine-recognise-pharmacy","دوا لینے والی جگہ پہچانیں۔"],medicijn:["medicine-recognise-drug","درد کے علاج والی چیز پہچانیں۔"],recept:["medicine-present-prescription","ڈاکٹر کی لکھی دوا کی پرچی پہچانیں۔"],allergisch:["medicine-state-allergy","دوا دینے سے پہلے حساسیت کا لفظ پہچانیں۔"],"heeft u iets tegen de pijn":["medicine-request-pain-relief","دواخانے میں درد کے لیے دوا مانگیں۔"],"hoe vaak moet ik dit nemen":["medicine-ask-frequency","دوا کتنی بار لینی ہے پوچھیں۔"],"twee keer per dag":["medicine-read-frequency","لیبل پر دن میں دو بار کی مقدار سمجھیں۔"],"voor of na het eten":["medicine-ask-meal-time","دوا کھانے سے پہلے یا بعد لینی ہے پوچھیں۔"],"lees de bijsluiter":["medicine-follow-leaflet","دوا کی معلومات والا پرچہ پڑھنے کی ہدایت سمجھیں۔"]},
      document:{stableId:"medicine-read-label",sourceKey:"medicine-dose-label",documentKind:"medicine-label",targetDutch:"twee keer per dag",title:"Medicijn",labelUrdu:"دوا کا لیبل پڑھیں",promptUrdu:"لیبل میں twee keer per dag دیکھیں، پھر خوراک کی درست اردو ہدایت منتخب کریں۔",instructionUrdu:"دوا کے لیبل میں twee keer per dag، voor of na het eten، اور lees de bijsluiter الگ پڑھیں، پھر مقدار والی سیکھی ہوئی بات کا مطلب چنیں۔",correctUrdu:"درست۔ twee keer per dag کا مطلب دن میں دو بار ہے۔",wrongUrdu:"یہ دوسری دوا کی ہدایت ہے۔ twee keer مقدار اور per dag روزانہ کی مدت بتاتا ہے۔",rows:[{label:"twee keer per dag",value:"twee keer per dag"},{label:"voor of na het eten?",value:"na het eten"},{label:"lees de bijsluiter",value:"lees de bijsluiter"}]}
    },
    "a1-appointments": {
      title: "Een afspraak maken of veranderen",
      unitLabel: "A1: سوال، مدد، فون اور ملاقات",
      outcomeUrdu: "ملاقات بنانا، دستیابی پوچھنا، دوسرا وقت تجویز کرنا، نہ آ سکنے کی اطلاع دینا، ملاقات بدلنا یا منسوخ کرنا، اور تصدیقی کارڈ پڑھنا۔",
      seedConcepts: [
        ["ik wil een afspraak maken", "میں ملاقات کا وقت لینا چاہتا / چاہتی ہوں"],
        ["afspraak", "ملاقات کا وقت"],
        ["datum", "تاریخ"],
        ["maandag", "پیر"],
        ["ochtend", "صبح"],
        ["middag", "دوپہر"],
        ["ik wil de afspraak veranderen", "میں ملاقات کا وقت بدلنا چاہتا / چاہتی ہوں"],
        ["heeft u vandaag tijd?", "کیا آج آپ کے پاس وقت ہے؟"],
        ["kan het morgen in de ochtend?", "کیا کل صبح ہو سکتا ہے؟"],
        ["ik kan maandag niet komen", "میں پیر کو نہیں آ سکتا / سکتی"],
        ["ik moet de afspraak annuleren", "مجھے ملاقات منسوخ کرنی ہے"],
        ["hoe laat is de afspraak?", "ملاقات کتنے بجے ہے؟"],
        ["kunt u de afspraak bevestigen?", "کیا آپ ملاقات کی تصدیق کر سکتے ہیں؟"]
      ],
      teaching: {
        "ik wil een afspraak maken": {
          usageUrdu: "ڈاکٹر، بلدیہ، یا اسکول سے نئی ملاقات لینے کی بات شروع کرنے کے لیے یہ مکمل جملہ کہیں۔",
          usageBoundaryUrdu: "یہ نئی ملاقات بناتا ہے؛ bestaande ملاقات بدلنے کے لیے veranderen والا جملہ ہے۔",
          commonConfusionUrdu: "نئی ملاقات کے لیے een afspraak maken کہیں؛ de afspraak veranderen موجود ملاقات ہے۔",
          exampleDutch: "Ik wil een afspraak maken.",
          exampleUrdu: "میں ملاقات کا وقت لینا چاہتا یا چاہتی ہوں۔",
          pronunciationUrdu: "اِک وِل اَن آف سپراک ما کَن"
        },
        "heeft u vandaag tijd": {
          usageUrdu: "ملازم سے آج کی دستیابی مؤدبانہ طور پر پوچھنے کے لیے یہ سوال کہیں۔",
          usageBoundaryUrdu: "یہ آج وقت ہونے کی تصدیق ہے؛ hoe laat is de afspraak? پہلے سے طے وقت پوچھتا ہے۔",
          commonConfusionUrdu: "ہاں یا نہیں سوال میں heeft پہلے اور u بعد میں رکھیں۔",
          exampleDutch: "Heeft u vandaag tijd?",
          exampleUrdu: "کیا آج آپ کے پاس وقت ہے؟",
          pronunciationUrdu: "ہیفٹ یو فان داخ ٹَیٹ"
        },
        "kan het morgen in de ochtend": {
          usageUrdu: "پیش کیا گیا وقت مناسب نہ ہو تو کل صبح کا متبادل وقت پوچھیں۔",
          usageBoundaryUrdu: "یہ متبادل تجویز ہے؛ ik kan maandag niet komen صرف عدم دستیابی بتاتا ہے۔",
          commonConfusionUrdu: "دن کے حصے کے لیے in de ochtend پورا رکھیں۔",
          exampleDutch: "Kan het morgen in de ochtend?",
          exampleUrdu: "کیا کل صبح ہو سکتا ہے؟",
          pronunciationUrdu: "کان ہَت مور خَن اِن دَ او ختَنت"
        },
        "ik kan maandag niet komen": {
          usageUrdu: "پیر کی ملاقات میں نہ آ سکیں تو دن سمیت اپنی عدم دستیابی واضح کریں۔",
          usageBoundaryUrdu: "یہ نہ آ سکنے کی اطلاع ہے؛ ملاقات خود بخود منسوخ نہیں ہوتی۔",
          commonConfusionUrdu: "niet کو komen سے پہلے رکھیں: maandag niet komen۔",
          exampleDutch: "Ik kan maandag niet komen.",
          exampleUrdu: "میں پیر کو نہیں آ سکتا یا سکتی۔",
          pronunciationUrdu: "اِک کان مان داخ نیت کو مَن"
        },
        "ik moet de afspraak annuleren": {
          usageUrdu: "جب ملاقات مکمل طور پر ختم کرنی ہو تو صاف کہیں کہ اسے منسوخ کرنا ضروری ہے۔",
          usageBoundaryUrdu: "annuleren ملاقات ختم کرتا ہے؛ veranderen صرف وقت یا دن بدلتا ہے۔",
          commonConfusionUrdu: "منسوخی میں de afspraak annuleren کہیں؛ maken نئی ملاقات بناتا ہے۔",
          exampleDutch: "Ik moet de afspraak annuleren.",
          exampleUrdu: "مجھے ملاقات منسوخ کرنی ہے۔",
          pronunciationUrdu: "اِک موت دَ آف سپراک آ نو لے رَن"
        },
        "hoe laat is de afspraak": {
          usageUrdu: "تاریخ معلوم ہو مگر گھڑی کا وقت بھول گئے ہوں تو ملاقات کا وقت پوچھیں۔",
          usageBoundaryUrdu: "hoe laat گھڑی کا وقت پوچھتا ہے؛ welke dag دن کا انتخاب پوچھتا ہے۔",
          commonConfusionUrdu: "گھڑی کا وقت پوچھنے والا سوال استعمال کریں؛ اسے مقدار یا قیمت والے سوال سے نہ ملائیں۔",
          exampleDutch: "Hoe laat is de afspraak?",
          exampleUrdu: "ملاقات کتنے بجے ہے؟",
          pronunciationUrdu: "ہو لات اِس دَ آف سپراک"
        },
        "kunt u de afspraak bevestigen": {
          usageUrdu: "فون یا کاؤنٹر پر ملاقات واقعی درج ہونے کی مؤدبانہ تصدیق مانگیں۔",
          usageBoundaryUrdu: "bevestigen موجود ملاقات کی تصدیق ہے؛ نئی ملاقات بنانا یا منسوخ کرنا نہیں۔",
          commonConfusionUrdu: "درخواست میں kunt u پہلے اور bevestigen آخر میں رکھیں۔",
          exampleDutch: "Kunt u de afspraak bevestigen?",
          exampleUrdu: "کیا آپ ملاقات کی تصدیق کر سکتے ہیں؟",
          pronunciationUrdu: "کُنت یو دَ آف سپراک بَ فَس تِ خَن"
        }
      },
      pattern: {
        modelDutch: "ik wil een afspraak maken",
        titleUrdu: "ملاقات کے مقصد کو مکمل جملے میں کہنا",
        highlight: "ik wil + een afspraak + maken",
        explanationUrdu: "نئی ملاقات لینے کے لیے ik wil کے بعد een afspraak اور آخر میں maken رکھیں۔",
        contrastUrdu: "maken نئی ملاقات بناتا ہے، veranderen موجود ملاقات بدلتا ہے، اور annuleren اسے ختم کرتا ہے۔",
        commonMistakeUrdu: "نئی ملاقات کے لیے de afspraak نہ کہیں؛ اس نمونے میں een afspraak maken رکھیں۔"
      },
      independentCheckLeadUrdu: "پہلی مدد والی ملاقات کے بعد دوسرے ادارے سے بات کرتے وقت",
      prerequisiteLessonIds: ["a0-date-appointment", "a0-time-days", "a1-questions", "a1-polite-chunks", "a1-phone-calls"],
      prerequisiteRefs: [
        ["a0-date-appointment", "afspraak"],
        ["a0-date-appointment", "datum"],
        ["a0-date-appointment", "ik wil de afspraak veranderen"],
        ["a0-time-days", "maandag"],
        ["a0-time-days", "ochtend"],
        ["a0-time-days", "middag"],
        ["a1-questions", "wanneer komt u?"],
        ["a1-polite-chunks", "kunt u mij helpen alstublieft?"],
        ["a1-phone-calls", "kunt u later terugbellen?"]
      ],
      scenarios: {
        afspraak: ["appointment-word", "استقبالی کارڈ پر ملاقات کے وقت والا لفظ پہچانیں۔"],
        datum: ["appointment-date", "تصدیقی کارڈ پر تاریخ والا خانہ پہچانیں۔"],
        maandag: ["appointment-monday", "کارڈ میں پیر کا دن پہچانیں۔"],
        ochtend: ["appointment-morning", "صبح کے دستیاب وقت کو درست ڈچ لفظ سے پہچانیں۔"],
        middag: ["appointment-afternoon", "دوپہر کے دستیاب وقت کو درست ڈچ لفظ سے پہچانیں۔"],
        "ik wil de afspraak veranderen": ["appointment-change", "موجود ملاقات کا وقت مناسب نہیں۔ اسے بدلنے کی سیکھی ہوئی مکمل بات کہیں۔"],
        "ik wil een afspraak maken": ["appointment-make", "ڈاکٹر کے استقبالی کاؤنٹر سے نئی ملاقات لینی ہے۔ مکمل آغاز کریں۔"],
        "heeft u vandaag tijd": ["appointment-today", "ملازم سے آج کی دستیابی مؤدبانہ طور پر پوچھیں۔"],
        "kan het morgen in de ochtend": ["appointment-alternative", "آج کا وقت مناسب نہیں۔ کل صبح کا متبادل پوچھیں۔"],
        "ik kan maandag niet komen": ["appointment-cannot-come", "پیر کو آنا ممکن نہیں۔ دن سمیت مکمل اطلاع دیں۔"],
        "ik moet de afspraak annuleren": ["appointment-cancel", "ملاقات مکمل طور پر ختم کرنی ہے۔ واضح منسوخی کہیں۔"],
        "hoe laat is de afspraak": ["appointment-ask-time", "تاریخ معلوم ہے مگر گھڑی کا وقت بھول گئے ہیں۔ وقت پوچھیں۔"],
        "kunt u de afspraak bevestigen": ["appointment-confirm", "فون بند کرنے سے پہلے ملاقات درج ہونے کی تصدیق مانگیں۔"]
      },
      document: {
        stableId: "appointment-read-confirmation",
        sourceKey: "appointment-confirmation-card",
        documentKind: "appointment-confirmation-card",
        targetDutch: "hoe laat is de afspraak?",
        title: "Afspraak",
        labelUrdu: "ملاقات کا تصدیقی کارڈ پڑھیں",
        promptUrdu: "کارڈ میں maandag اور 09:00 دیکھیں، پھر گھڑی کا وقت پوچھنے والی سیکھی ہوئی مکمل ڈچ بات کا درست اردو مطلب منتخب کریں۔",
        instructionUrdu: "تصدیقی کارڈ میں datum اور tijd الگ پڑھیں، پھر وقت پوچھنے والے مکمل سوال کا درست مطلب منتخب کریں۔",
        correctUrdu: "درست۔ “Hoe laat is de afspraak?” ملاقات کا گھڑی والا وقت پوچھتا ہے۔",
        wrongUrdu: "یہ دوسری ملاقات کی بات ہے۔ hoe laat والا سوال 09:00 جیسے گھڑی کے وقت کے بارے میں ہے۔",
        rows: [
          { label: "datum", value: "maandag" },
          { label: "tijd", value: "09:00" },
          { label: "hoe laat is de afspraak?", value: "09:00" }
        ]
      }
    }
  },
  missions: {
    "a1-chapter-completion-mission": {
      sourceKey:"chapter-completion-mission",scenarioTitleUrdu:"A1 کے نو روزمرہ حصوں کی آخری عملی جانچ",speakerUrdu:"استقبالی ملازم، فون پر ذمہ دار شخص، یا روزمرہ خدمت کا ملازم",
      prerequisiteLessonIds:["a1-greetings-personal-info","a1-hebben-family","a1-daily-routine","a1-appointments","a1-house-search-extra","a1-shopping-returns","a1-directions-town","a1-pharmacy-medicine","a1-work-schedule"],
      prerequisiteMissionIds:["a1-personal-info-mission","a1-family-people-mission","a1-daily-routine-mission","a1-mission-phone-internet","a1-mission-house-search","a1-food-shopping-mission","a1-mission-post-parcel","a1-mission-doctor","a1-mission-school-day"],
      variantTitles:["نئے ہفتے کے روزمرہ کام","بدلے ہوئے دن میں رابطہ اور سفر","خاندان، گھر، صحت، اور کام کی عملی ترتیب"],
      variantContexts:["ایک ہی دن میں تعارف، خاندان، وقت، ملاقات، گھر، واپسی، راستہ، صحت، اور کام کی اطلاع مکمل کریں","منصوبہ بدل گیا ہے؛ ضروری معلومات سنیں، دستاویز پڑھیں، اور مناسب سیکھی ہوئی باتیں استعمال کریں","اپنی اور خاندان کی معلومات سے شروع کریں، پھر گھر، خریداری، صحت، سفر، اور کام کے کام مکمل کریں"],
      targets:[
        {lessonId:"a1-greetings-personal-info",dutch:"mijn naam is Zarar",related:[{lessonId:"a1-hebben-family",dutch:"ik heb een broer"}],compoundDutch:"mijn naam is Zarar. ik heb een broer.",compoundUrdu:"میرا نام Zarar ہے۔ میرا ایک بھائی ہے۔",taskUrdu:"اپنا نام اور خاندان کی ایک معلومات دونوں واضح کریں۔"},
        {lessonId:"a1-daily-routine",dutch:"ik heb om twaalf uur pauze",related:[{lessonId:"a1-appointments",dutch:"hoe laat is de afspraak?"}],compoundDutch:"ik heb om twaalf uur pauze. hoe laat is de afspraak?",compoundUrdu:"میری بارہ بجے چھٹی ہے۔ ملاقات کتنے بجے ہے؟",taskUrdu:"اپنا روزمرہ وقت بتائیں اور ملاقات کا وقت پوچھیں۔"},
        {lessonId:"a1-house-search-extra",dutch:"wanneer is de woning beschikbaar?",taskUrdu:"مکان کے اشتہار سے دستیابی سمجھ کر مناسب سوال پوچھیں۔"},
        {lessonId:"a1-shopping-returns",dutch:"kan ik mijn geld terugkrijgen?",taskUrdu:"رسید کے ساتھ رقم واپس لینے کی مناسب بات استعمال کریں۔"},
        {lessonId:"a1-directions-town",dutch:"hoe kom ik bij de apotheek?",related:[{lessonId:"a1-pharmacy-medicine",dutch:"heeft u iets tegen de pijn?"}],compoundDutch:"hoe kom ik bij de apotheek? heeft u iets tegen de pijn?",compoundUrdu:"میں دواخانے کیسے پہنچوں؟ کیا آپ کے پاس درد کے لیے کچھ ہے؟",taskUrdu:"پہلے دواخانے کا راستہ پوچھیں، پھر وہاں درد کی دوا مانگیں۔"},
        {lessonId:"a1-work-schedule",dutch:"mijn dienst is veranderd",taskUrdu:"کام کے بدلے ہوئے وقت کی مختصر واضح اطلاع دیں۔"}
      ],
      prerequisiteRefs:[["a1-greetings-personal-info","mijn naam is Zarar"],["a1-hebben-family","ik heb een broer"],["a1-daily-routine","ik heb om twaalf uur pauze"],["a1-appointments","hoe laat is de afspraak?"],["a1-house-search-extra","wanneer is de woning beschikbaar?"],["a1-shopping-returns","kan ik mijn geld terugkrijgen?"],["a1-directions-town","hoe kom ik bij de apotheek?"],["a1-pharmacy-medicine","heeft u iets tegen de pijn?"],["a1-work-schedule","mijn dienst is veranderd"]],
      useTypes:["situation","listen-choice","document-choice","build","speak-repeat","situation"],checkTypes:["meaning","listen-choice","document-choice","reverse","build","situation"],
      document:{documentKind:"a1-daily-life-completion-card",title:"woning",labelUrdu:"روزمرہ کاموں کا مکمل کارڈ پڑھیں",promptUrdu:"کارڈ میں wanneer is de woning beschikbaar، kan ik mijn geld terugkrijgen، apotheek، اور mijn dienst is veranderd الگ دیکھیں، پھر موجود کام کے لیے سیکھی ہوئی مکمل بات کا درست مطلب منتخب کریں۔",instructionUrdu:"دن کے کارڈ میں تعارف، وقت، مکان، واپسی، صحت، اور کام کی قطاریں الگ پڑھیں، پھر نشان زدہ کام کی سیکھی ہوئی بات چنیں۔",rows:[{label:"mijn naam is Zarar",value:"mijn naam is Zarar. ik heb een broer."},{label:"hoe laat is de afspraak?",value:"ik heb om twaalf uur pauze. hoe laat is de afspraak?"},{label:"wanneer is de woning beschikbaar?",value:"wanneer is de woning beschikbaar?"},{label:"kan ik mijn geld terugkrijgen?",value:"kan ik mijn geld terugkrijgen?"},{label:"hoe kom ik bij de apotheek?",value:"hoe kom ik bij de apotheek? heeft u iets tegen de pijn?"},{label:"mijn dienst is veranderd",value:"mijn dienst is veranderd"}]}
    },
    "a1-mission-school-day": {
      sourceKey:"work-school-message-mission",scenarioTitleUrdu:"پیغام سے اسکول اور کام کے بدلے دن تک",speakerUrdu:"اسکول یا کام کا ذمہ دار شخص",
      prerequisiteLessonIds:["a1-short-messages","a1-work-school-messages","a1-school-contact","a1-work-schedule"],
      variantTitles:["دیر کا مختصر پیغام اور کام کی تبدیلی","بچے کی غیر حاضری اور اسکول ایپ","بیماری، واپسی، اور بدلی ڈیوٹی"],
      variantContexts:["ساتھی کو آج کی دیر کا پیغام دیں، وجہ سنیں، اور کام کے بدلے rooster کا جواب دیں","اسکول کو بچے کی غیر حاضری لکھیں، گھر کے کام کی جگہ پوچھیں، اور ایپ کا نوٹس سمجھیں","کام کو بیماری اور واپسی بتائیں، واپسی فون مانگیں، اور بدلی dienst پر ذمہ دار سے بات کریں"],
      targets:[
        {lessonId:"a1-short-messages",dutch:"hoi Sara, ik kom vandaag later",patternLessonId:"a1-short-messages"},
        {lessonId:"a1-work-school-messages",dutch:"ik kom morgen weer"},
        {lessonId:"a1-work-school-messages",dutch:"de bus heeft vertraging"},
        {lessonId:"a1-school-contact",dutch:"mijn kind komt vandaag niet naar school",patternLessonId:"a1-school-contact"},
        {lessonId:"a1-school-contact",dutch:"waar staat het huiswerk?"},
        {lessonId:"a1-work-schedule",dutch:"mijn dienst is veranderd",patternLessonId:"a1-work-schedule"}
      ],
      prerequisiteRefs:[["a0-time-days","vandaag"],["a0-time-days","morgen"],["a0-child-school","school"],["a0-work-basics","werk"],["a1-short-messages","bericht"],["a1-short-messages","app"],["a1-work-school-messages","ik ben ziek"],["a1-work-school-messages","ik kom morgen weer"],["a1-school-contact","huiswerk"],["a1-school-contact","rooster"],["a1-work-schedule","dienst"],["a1-work-schedule","kan ik met mijn baas spreken?"]],
      useTypes:["situation","listen-choice","build","situation","document-choice","document-choice"],checkTypes:["meaning","listen-choice","reverse","build","document-choice","document-choice"],
      document:{documentKind:"school-work-message-card",title:"Bericht",labelUrdu:"اسکول اور کام کے پیغام پڑھیں",promptUrdu:"کارڈ میں huiswerk اور dienst veranderd الگ دیکھیں، پھر موجود صورت کے لیے مناسب سیکھی ہوئی بات کا درست مطلب منتخب کریں۔",instructionUrdu:"کارڈ میں غیر حاضری، huiswerk، اور بدلی dienst الگ پڑھیں، پھر موجود کام کے لیے سیکھی ہوئی مکمل بات چنیں۔",rows:[{label:"school",value:"mijn kind komt vandaag niet naar school"},{label:"huiswerk",value:"waar staat het huiswerk?"},{label:"dienst",value:"mijn dienst is veranderd"}]}
    },
    "a1-mission-doctor": {
      sourceKey:"doctor-symptoms-medicine-mission",scenarioTitleUrdu:"huisarts کی ملاقات سے دوا کی ہدایت تک",speakerUrdu:"huisarts، dokter، یا apotheek کا ملازم",
      prerequisiteLessonIds:["a1-health-appointments","a1-doctor-symptoms","a1-pharmacy-medicine"],
      variantTitles:["huisarts کو فون اور ملاقات","ڈاکٹر کو علامت اور مدت بتانا","نسخہ، دوا، اور لیبل کی ہدایت"],
      variantContexts:["assistente کو ملاقات کا مقصد بتائیں، فوری ضرورت کا سوال سمجھیں، اور وقت طے کریں","ڈاکٹر کے سوال سنیں، درد کی جگہ اور بخار کی مدت واضح کریں، اور آرام کی ہدایت سمجھیں","دواخانے میں نسخہ دیں، حساسیت بتائیں، اور لیبل سے مقدار اور کھانے کا وقت سمجھیں"],
      targets:[
        {lessonId:"a1-health-appointments",dutch:"ik wil een afspraak bij de huisarts",patternLessonId:"a1-health-appointments"},
        {lessonId:"a1-health-appointments",dutch:"is het dringend?"},
        {lessonId:"a1-doctor-symptoms",dutch:"ik heb pijn in mijn buik",patternLessonId:"a1-doctor-symptoms"},
        {lessonId:"a1-doctor-symptoms",dutch:"ik heb sinds gisteren koorts"},
        {lessonId:"a1-pharmacy-medicine",dutch:"hoe vaak moet ik dit nemen?",patternLessonId:"a1-pharmacy-medicine"},
        {lessonId:"a1-pharmacy-medicine",dutch:"twee keer per dag"}
      ],
      prerequisiteRefs:[["a0-health-emergency","dokter"],["a0-health-emergency","ik ben ziek"],["a0-health-emergency","medicijn"],["a0-health-emergency","apotheek"],["a0-time-days","gisteren"],["a1-health-appointments","huisarts"],["a1-health-appointments","assistente"],["a1-doctor-symptoms","waar doet het pijn?"],["a1-doctor-symptoms","u moet rust nemen"],["a1-pharmacy-medicine","recept"],["a1-pharmacy-medicine","allergisch"],["a1-pharmacy-medicine","voor of na het eten?"]],
      useTypes:["situation","listen-choice","situation","build","document-choice","listen-choice"],checkTypes:["meaning","listen-choice","reverse","build","document-choice","listen-choice"],
      document:{documentKind:"doctor-and-medicine-card",title:"Medicijn",labelUrdu:"huisarts کی ہدایت اور دوا کا لیبل پڑھیں",promptUrdu:"کارڈ میں twee keer per dag دیکھیں، پھر روزانہ خوراک کی درست اردو ہدایت منتخب کریں۔",instructionUrdu:"صحت کارڈ میں ik heb sinds gisteren koorts، u moet rust nemen، اور twee keer per dag الگ پڑھیں، پھر مقدار والی سیکھی ہوئی بات کا مطلب چنیں۔",rows:[{label:"ik heb sinds gisteren koorts",value:"ik heb sinds gisteren koorts"},{label:"u moet rust nemen",value:"u moet rust nemen"},{label:"twee keer per dag",value:"twee keer per dag"}]}
    },
    "a1-mission-post-parcel": {
      sourceKey:"town-transport-parcel-library-safety-mission",scenarioTitleUrdu:"اسٹیشن سے شہر کے کام تک ایک مسلسل سفر",speakerUrdu:"ٹکٹ ملازم، راستہ بتانے والا، پارسل ملازم، یا لائبریری ملازم",
      prerequisiteLessonIds:["a1-public-transport","a1-directions-town","a1-post-parcel-extra","a1-library-community","a1-safety-rules"],
      variantTitles:["ٹرین سے پارسل لینے جانا","بس سے لائبریری اور محلے کے مرکز تک","شہر میں راستہ، اوقات، اور حفاظتی نشان"],
      variantContexts:["روانگی بورڈ سمجھیں، راستہ پوچھیں، اور نوٹس کے ساتھ پارسل وصول کریں","بس کی منزل کی تصدیق کریں، نقشے سے لائبریری جائیں، اور کلاس کے اوقات سمجھیں","شہر میں سفر مکمل کرتے ہوئے پارسل، عوامی جگہ، اور حفاظتی ہدایت سنبھالیں"],
      targets:[
        {lessonId:"a1-public-transport",dutch:"ik wil een kaartje naar Utrecht",patternLessonId:"a1-public-transport"},
        {lessonId:"a1-public-transport",dutch:"van welk spoor vertrekt de trein?"},
        {lessonId:"a1-directions-town",dutch:"hoe kom ik bij de apotheek?",patternLessonId:"a1-directions-town"},
        {lessonId:"a1-post-parcel-extra",dutch:"ik wil mijn pakket ophalen",patternLessonId:"a1-post-parcel-extra"},
        {lessonId:"a1-library-community",dutch:"hoe laat is het open?"},
        {lessonId:"a1-safety-rules",dutch:"mag ik hier wachten?",patternLessonId:"a1-safety-rules"}
      ],
      prerequisiteRefs:[["a0-transport-directions","station"],["a0-transport-directions","trein"],["a0-address-phone","adres"],["a1-public-transport","vertraging"],["a1-directions-town","kaart"],["a1-post-parcel-extra","afhaalpunt"],["a1-post-parcel-extra","identiteitsbewijs"],["a1-library-community","bibliotheek"],["a1-safety-rules","toegestaan"]],
      useTypes:["situation","document-choice","build","situation","document-choice","listen-choice"],checkTypes:["meaning","document-choice","reverse","build","document-choice","listen-choice"],
      document:{documentKind:"town-journey-card",title:"spoor",labelUrdu:"روانگی اور شہر کے کام کا کارڈ پڑھیں",promptUrdu:"کارڈ میں trein اور spoor دیکھیں، پھر پلیٹ فارم پوچھنے والے مکمل سوال کا درست مطلب منتخب کریں۔",instructionUrdu:"سفر کارڈ میں spoor، afhaalpunt، اور bibliotheek الگ پڑھیں، پھر موجود کام کے لیے مناسب سیکھی ہوئی بات چنیں۔",rows:[{label:"spoor",value:"van welk spoor vertrekt de trein?"},{label:"afhaalpunt",value:"ik wil mijn pakket ophalen"},{label:"bibliotheek",value:"hoe laat is het open?"}]}
    },
    "a1-food-shopping-mission": {
      sourceKey: "food-shopping-returns-payment-mission",
      scenarioTitleUrdu: "فہرست سے خریداری، کیفے، واپسی، اور ادائیگی",
      speakerUrdu: "دکان کا ملازم، ویٹر، یا کاؤنٹر کا ملازم",
      prerequisiteLessonIds: ["a1-supermarket", "a1-cafe-ordering", "a1-cafe-food-needs", "a1-shopping-clothes", "a1-shopping-returns", "a1-money-bank"],
      variantTitles: ["فہرست کے ساتھ سپر مارکیٹ", "کیفے میں آرڈر اور کھانے کی ضرورت", "کپڑا خریدنا، واپس کرنا، اور ادائیگی"],
      variantContexts: ["فہرست پڑھیں، چیز کی جگہ یا قیمت پوچھیں، اور کاؤنٹر کی بات مکمل کریں", "مینو سے انتخاب کریں، اپنی کھانے کی ضرورت واضح کریں، اور مسئلہ مؤدبانہ طور پر حل کریں", "کپڑے کا سائز سمجھیں، رسید کے ساتھ واپسی کریں، اور ادائیگی کی خرابی واضح کریں"],
      targets: [
        { lessonId:"a1-supermarket", dutch:"hoeveel kost dit brood?" },
        { lessonId:"a1-cafe-ordering", dutch:"voor mij een thee", patternLessonId:"a1-cafe-ordering" },
        { lessonId:"a1-cafe-food-needs", dutch:"ik ben allergisch voor noten", patternLessonId:"a1-cafe-food-needs" },
        { lessonId:"a1-shopping-clothes", dutch:"deze jas is te groot", patternLessonId:"a1-shopping-clothes" },
        { lessonId:"a1-shopping-returns", dutch:"ik wil dit terugbrengen", patternLessonId:"a1-shopping-returns" },
        { lessonId:"a1-money-bank", dutch:"mijn pinpas werkt niet", patternLessonId:"a1-money-bank" }
      ],
      prerequisiteRefs: [["a0-food-drink","brood"],["a0-shopping-payment","bon"],["a1-supermarket","ik zoek melk"],["a1-cafe-ordering","de rekening alstublieft"],["a1-cafe-food-needs","kunt u dit controleren?"],["a1-shopping-clothes","mag ik dit passen?"],["a1-shopping-returns","hier is de bon"],["a1-money-bank","bedrag"],["a1-money-bank","mag ik de bon?"]],
      useTypes:["document-choice","listen-choice","situation","build","situation","situation"],
      checkTypes:["meaning","listen-choice","reverse","build","document-choice","situation"],
      document:{documentKind:"shopping-receipt-mission-card",title:"Bon",labelUrdu:"خریداری کی فہرست اور رسید پڑھیں",promptUrdu:"کارڈ میں jas اور bedrag دیکھیں، پھر چیز واپس کرنے والی سیکھی ہوئی مکمل بات کا درست مطلب منتخب کریں۔",instructionUrdu:"فہرست اور رسید میں چیز، سائز، اور رقم الگ پڑھیں، پھر واپسی کاؤنٹر کے لیے سیکھی ہوئی بات چنیں۔",rows:[{label:"brood",value:"hoeveel kost dit brood?"},{label:"jas",value:"deze jas is te groot"},{label:"bon",value:"ik wil dit terugbrengen"}]}
    },
    "a1-mission-house-search": {
      sourceKey: "home-neighbours-repairs-housing-mission",
      scenarioTitleUrdu: "گھر میں رہنا، مسئلہ سنبھالنا، اور نیا مکان دیکھنا",
      speakerUrdu: "پڑوسی، مالک مکان، یا رہائش کا ملازم",
      prerequisiteLessonIds: [
        "a1-house-food-plurals",
        "a1-neighbour-talk",
        "a1-home-repairs",
        "a1-cleaning-house",
        "a1-house-search-extra"
      ],
      variantTitles: [
        "نئے گھر میں پڑوسی اور چیزوں کی جگہ",
        "ہیٹنگ کی خرابی اور گھر کی صفائی",
        "مکان کا اشتہار اور دیکھنے کا وقت"
      ],
      variantContexts: [
        "گھر کی چیز کی جگہ بتائیں، پڑوسن سے مدد مانگیں، اور گھر کے بارے میں مختصر بات مکمل کریں",
        "ہیٹنگ کی خرابی واضح کریں، مرمت مانگیں، اور ضروری صفائی کام بتائیں",
        "مکان کا اشتہار پڑھیں، کرایہ اور دستیابی سمجھیں، اور گھر دیکھنے کی گفتگو مکمل کریں"
      ],
      targets: [
        { lessonId: "a1-house-food-plurals", dutch: "het boek is in de kamer", patternLessonId: "a1-house-food-plurals" },
        { lessonId: "a1-neighbour-talk", dutch: "kunt u zachter zijn?", patternLessonId: "a1-neighbour-talk" },
        { lessonId: "a1-home-repairs", dutch: "kunt u iemand sturen?", patternLessonId: "a1-home-repairs" },
        { lessonId: "a1-cleaning-house", dutch: "ik moet de kamer schoonmaken", patternLessonId: "a1-cleaning-house" },
        { lessonId: "a1-house-search-extra", dutch: "hoeveel is de huur?" },
        { lessonId: "a1-house-search-extra", dutch: "wanneer is de woning beschikbaar?" }
      ],
      prerequisiteRefs: [
        ["a0-understanding-help", "kunt u mij helpen"],
        ["a0-numbers-0-10", "twee"],
        ["a0-time-days", "maandag"],
        ["a1-house-food-plurals", "kamer"],
        ["a1-neighbour-talk", "kunt u zachter zijn?"],
        ["a1-home-repairs", "kunt u iemand sturen?"],
        ["a1-cleaning-house", "de keuken is schoon"],
        ["a1-house-search-extra", "kan ik de woning bekijken?"],
        ["a1-house-search-extra", "heeft de woning twee kamers?"]
      ],
      useTypes: ["situation", "listen-choice", "situation", "build", "situation", "document-choice"],
      checkTypes: ["meaning", "listen-choice", "reverse", "build", "situation", "document-choice"],
      document: {
        documentKind: "housing-listing-and-viewing-card",
        title: "Woning",
        labelUrdu: "مکان کا اشتہار اور دستیابی پڑھیں",
        promptUrdu: "کارڈ میں beschikbaar اور maandag دیکھیں، پھر مکان کب دستیاب ہے پوچھنے والے مکمل سوال کا درست اردو مطلب منتخب کریں۔",
        instructionUrdu: "گھر کی قطاروں میں huur، kamers، اور beschikbaar الگ پڑھیں، پھر دستیابی والے سیکھی ہوئی مکمل سوال کا مطلب منتخب کریں۔",
        rows: [
          { label: "huur", value: "hoeveel is de huur?" },
          { label: "kamers", value: "heeft de woning twee kamers?" },
          { label: "beschikbaar", value: "wanneer is de woning beschikbaar?" }
        ]
      }
    },
    "a1-personal-info-mission": {
      scenarioTitleUrdu: "استقبالی کاؤنٹر پر تعارف اور فارم",
      prerequisiteLessonIds: ["a1-greetings-personal-info", "a1-details-forms"],
      variantTitles: [
        "کمیونٹی مرکز میں پہلی رجسٹریشن",
        "لائبریری کارڈ کے لیے ذاتی معلومات",
        "اسکول کے استقبالی کمرے میں رابطہ فارم"
      ],
      variantContexts: [
        "کمیونٹی مرکز کے ملازم سے سلام کے بعد اپنا تعارف اور فارم مکمل کریں",
        "لائبریری کے کاؤنٹر پر کارڈ بنواتے ہوئے اپنی معلومات دیں",
        "اسکول کے استقبالی کمرے میں رابطے کی معلومات کی تصدیق کریں"
      ],
      targets: [
        { lessonId: "a1-details-forms", dutch: "mijn achternaam is Khan" },
        {
          lessonId: "a1-greetings-personal-info",
          dutch: "mijn naam is Zarar",
          patternLessonId: "a1-greetings-personal-info",
          includeConceptSkill: true
        },
        { lessonId: "a1-details-forms", dutch: "mijn voornaam is Sara", patternLessonId: "a1-details-forms" },
        { lessonId: "a1-details-forms", dutch: "mijn geboortedatum is 12 mei" },
        { lessonId: "a1-details-forms", dutch: "mijn telefoonnummer is nul zes" }
      ]
    },
    "a1-family-people-mission": {
      sourceKey: "family-people-mission",
      scenarioTitleUrdu: "خاندان کا تعارف اور kinderopvang میں حوالگی",
      speakerUrdu: "kinderopvang کے ملازم",
      prerequisiteLessonIds: [
        "a1-people-family-articles",
        "a1-hebben-family",
        "a1-family-routine-extra",
        "a1-child-care"
      ],
      variantTitles: [
        "kinderopvang میں پہلی رجسٹریشن",
        "صبح بچے کو چھوڑنا",
        "شام بچے کو لینا"
      ],
      variantContexts: [
        "Kinderopvang کے ملازم کو خاندان کا مختصر تعارف دیں اور بچے کی بنیادی معلومات مکمل کریں",
        "صبح بچے کو چھوڑتے وقت خاندان، عمر، اور لانے کے وقت کی تصدیق کریں",
        "شام بچے کو لیتے وقت حوالگی نوٹ پڑھیں اور مکمل جواب دیں"
      ],
      targets: [
        { lessonId: "a1-people-family-articles", dutch: "dit is mijn vader", patternLessonId: "a1-people-family-articles" },
        { lessonId: "a1-hebben-family", dutch: "heeft u kinderen?" },
        { lessonId: "a1-hebben-family", dutch: "ik heb twee kinderen", patternLessonId: "a1-hebben-family" },
        { lessonId: "a1-family-routine-extra", dutch: "mijn dochter is vijf jaar", patternLessonId: "a1-family-routine-extra" },
        { lessonId: "a1-child-care", dutch: "ik breng mijn kind om acht uur naar de kinderopvang" },
        { lessonId: "a1-child-care", dutch: "ik haal mijn kind om vijf uur op", patternLessonId: "a1-child-care" }
      ],
      prerequisiteRefs: [
        ["a0-child-school", "brengen"],
        ["a0-child-school", "ophalen"],
        ["a0-numbers-0-10", "vijf"],
        ["a0-numbers-0-10", "acht"],
        ["a0-ja-nee-goed-niet", "ja"],
        ["a0-spelling-personal-details", "leeftijd"],
        ["a1-child-care", "eten mee"]
      ],
      useTypes: ["situation", "listen-choice", "situation", "build", "situation", "document-choice"],
      checkTypes: ["meaning", "listen-choice", "reverse", "build", "situation", "document-choice"],
      document: {
        documentKind: "child-care-handover-card",
        title: "Kinderopvang",
        labelUrdu: "kinderopvang کی حوالگی نوٹ پڑھیں",
        promptUrdu: "حوالگی نوٹ میں Ophalen: 17:00 پڑھیں اور بچے کو پانچ بجے لینے والی مکمل سیکھی ہوئی ڈچ بات کا درست اردو مطلب منتخب کریں۔",
        instructionUrdu: "حوالگی نوٹ میں Brengen اور Ophalen کے اوقات الگ دیکھیں، پھر Ophalen: 17:00 کے مطابق مکمل ڈچ بات کا درست اردو مطلب منتخب کریں۔",
        rows: [
          { label: "Leeftijd", value: "5 jaar" },
          { label: "Brengen", value: "08:00" },
          { label: "Ophalen", value: "17:00" },
          { label: "Eten mee", value: "ja" }
        ]
      }
    },
    "a1-daily-routine-mission": {
      sourceKey: "daily-routine-mission",
      scenarioTitleUrdu: "کام کے دن، بدلے ہوئے شیڈول، اور موسم کا منصوبہ",
      speakerUrdu: "ساتھی یا منصوبہ بنانے والا شخص",
      prerequisiteLessonIds: [
        "a1-present-time",
        "a1-daily-routine",
        "a1-calendar-time",
        "a1-weather-clothes"
      ],
      variantTitles: [
        "کام والے دن کی صبح",
        "شیڈول بدلا اور دیر ہو گئی",
        "بارش والے دن کا منصوبہ"
      ],
      variantContexts: [
        "ساتھی کو آج کے کام، اٹھنے کے وقت، بچے کو اسکول چھوڑنے، اور پہنچنے کا منصوبہ ترتیب سے بتائیں",
        "کام کے شیڈول میں تبدیلی اور بس کی تاخیر کے بعد وقت اور معذرت کی واضح اطلاع دیں",
        "بارش والے دن گھر سے نکلنے سے پہلے موسم، چھتری، اور روزمرہ منصوبے کا فیصلہ مکمل کریں"
      ],
      targets: [
        { lessonId: "a1-present-time", dutch: "vandaag werk ik", patternLessonId: "a1-present-time" },
        { lessonId: "a1-daily-routine", dutch: "ik sta om zeven uur op", patternLessonId: "a1-daily-routine" },
        { lessonId: "a1-daily-routine", dutch: "eerst breng ik mijn kind naar school" },
        { lessonId: "a1-calendar-time", dutch: "sorry ik ben te laat", patternLessonId: "a1-calendar-time" },
        { lessonId: "a1-weather-clothes", dutch: "het regent vandaag" },
        { lessonId: "a1-weather-clothes", dutch: "neem een paraplu mee" }
      ],
      prerequisiteRefs: [
        ["a0-time-days", "vandaag"],
        ["a0-time-days", "maandag"],
        ["a0-child-school", "ik breng mijn kind naar school"],
        ["a0-weather-clothing-safety", "paraplu"],
        ["a1-calendar-time", "ik kom op maandag"],
        ["a1-calendar-time", "ik ben op tijd"]
      ],
      useTypes: ["situation", "build", "situation", "document-choice", "listen-choice", "situation"],
      checkTypes: ["meaning", "reverse", "build", "document-choice", "listen-choice", "situation"],
      document: {
        documentKind: "weekly-schedule-message",
        title: "maandag",
        labelUrdu: "کام کا شیڈول اور تاخیر کا پیغام پڑھیں",
        promptUrdu: "شیڈول میں “sorry ik ben te laat” کے سامنے 09:15 دیکھیں اور اس کا درست اردو مطلب منتخب کریں۔",
        instructionUrdu: "پیر کے دو اوقات الگ پڑھیں، پھر 09:15 کے ساتھ لکھی مکمل تاخیر کی اطلاع کا درست اردو مطلب منتخب کریں۔",
        rows: [
          { label: "ik kom op maandag", value: "09:00" },
          { label: "ik ben op tijd", value: "09:00" },
          { label: "sorry ik ben te laat", value: "09:15" }
        ]
      }
    },
    "a1-mission-phone-internet": {
      sourceKey: "questions-calls-appointments-mission",
      scenarioTitleUrdu: "سوال، مدد، فون کال، اور ملاقات کی عملی گفتگو",
      speakerUrdu: "استقبالی ملازم یا فون کرنے والا شخص",
      prerequisiteLessonIds: [
        "a1-questions",
        "a1-polite-chunks",
        "a1-plans-invitations",
        "a1-phone-calls",
        "a1-appointments"
      ],
      variantTitles: [
        "کمیونٹی مرکز کو فون اور ملاقات",
        "huisarts سے وقت کی تصدیق",
        "کورس کے لیے سوال اور نئی afspraak"
      ],
      variantContexts: [
        "کمیونٹی مرکز سے صحیح معلومات پوچھیں، مدد مانگیں، واپسی کال کا نوٹ سمجھیں، اور ملاقات کا وقت طے کریں",
        "ڈاکٹر کے استقبالی ملازم سے مؤدبانہ فون گفتگو کریں اور تصدیقی کارڈ کا دن اور وقت سمجھیں",
        "کورس کے ملازم سے سوال کریں، ایک دعوت کا جواب دیں، اور نئی ملاقات کی تصدیق مکمل کریں"
      ],
      targets: [
        { lessonId: "a1-questions", dutch: "wanneer komt u?", patternLessonId: "a1-questions" },
        { lessonId: "a1-polite-chunks", dutch: "kunt u mij helpen alstublieft?", patternLessonId: "a1-polite-chunks" },
        { lessonId: "a1-plans-invitations", dutch: "zullen we om drie uur afspreken?", patternLessonId: "a1-plans-invitations" },
        { lessonId: "a1-phone-calls", dutch: "kunt u later terugbellen?" },
        { lessonId: "a1-appointments", dutch: "ik wil een afspraak maken", patternLessonId: "a1-appointments" },
        { lessonId: "a1-appointments", dutch: "hoe laat is de afspraak?" }
      ],
      prerequisiteRefs: [
        ["a0-greetings-courtesy", "sorry"],
        ["a0-understanding-help", "kunt u herhalen"],
        ["a0-date-appointment", "afspraak"],
        ["a0-time-days", "maandag"],
        ["a0-time-days", "avond"],
        ["a1-phone-calls", "met Sara"],
        ["a1-appointments", "kunt u de afspraak bevestigen?"]
      ],
      useTypes: ["situation", "situation", "build", "listen-choice", "situation", "document-choice"],
      checkTypes: ["meaning", "listen-choice", "build", "listen-choice", "reverse", "document-choice"],
      document: {
        documentKind: "appointment-callback-card",
        title: "Afspraak",
        labelUrdu: "فون نوٹ اور ملاقات کی تصدیق پڑھیں",
        promptUrdu: "کارڈ میں maandag اور 09:00 دیکھیں، پھر ملاقات کا گھڑی والا وقت پوچھنے والی مکمل ڈچ بات کا درست اردو مطلب منتخب کریں۔",
        instructionUrdu: "واپسی کال اور ملاقات کے حصے الگ پڑھیں، پھر 09:00 کے بارے میں پوچھنے والے سیکھی ہوئی سوال کا درست مطلب منتخب کریں۔",
        rows: [
          { label: "met Sara", value: "hoe laat is de afspraak?" },
          { label: "kunt u later terugbellen?", value: "avond" },
          { label: "maandag", value: "09:00" },
          { label: "afspraak", value: "09:00" }
        ]
      }
    }
  }
};

/*
 * A2 is authored one accepted unit at a time. Only records listed here may
 * replace the generated A2 shell; later units remain diagnostic until their
 * mandatory inventory, audit slice, and learner journey are complete.
 */
const a2AuthoredCurriculumV4 = {
  version: "a2-authored-v4",
  chapterPrerequisiteRefs: [
    ["a1-details-forms", "adres"],
    ["a1-details-forms", "geboortedatum"],
    ["a1-appointments", "ik wil een afspraak maken"],
    ["a1-polite-chunks", "kunt u mij helpen alstublieft?"],
    ["a1-post-parcel-extra", "identiteitsbewijs"]
  ],
  units: {
    "a2-gemeente-forms": {
      outcomeUrdu: "gemeente میں ملاقات کے خط اور کاغذات سمجھنا، فارم بھرنا، شناخت دکھانا، غلط معلومات درست کروانا، درخواست جمع کرنا، اور جواب کی مدت پوچھنا۔",
      practiceUrdu: "پہلے فارم کے عملی کام اور کاؤنٹر کی مکمل باتیں سیکھیں، پھر شناختی فہرست، فارم، اصلاحی نوٹ، اور جمع کرانے کی رسید میں وہی زبان استعمال کریں۔"
    }
  },
  lessons: {
    "a2-separable-verbs-routine": {
      title: "Een formulier invullen en opsturen",
      unitLabel: "A2: Gemeente اور فارم",
      outcomeUrdu: "سرکاری فارم کو بھرنے، دستخط کرنے، شناختی کاغذ ساتھ لانے، اور درخواست بھیجنے کی مکمل ہدایات سمجھنا اور انہی کاموں کی تصدیق کرنا۔",
      seedConcepts: [
        ["het formulier", "فارم"],
        ["het formulier invullen", "فارم بھرنا"],
        ["vul het formulier in", "فارم بھر دیں"],
        ["de handtekening", "دستخط"],
        ["het formulier ondertekenen", "فارم پر دستخط کرنا"],
        ["onderteken hier", "یہاں دستخط کریں"],
        ["uw identiteitsbewijs meenemen", "اپنا شناختی کاغذ ساتھ لانا"],
        ["neem uw identiteitsbewijs mee", "اپنا شناختی کاغذ ساتھ لائیں"],
        ["de aanvraag", "درخواست"],
        ["de aanvraag opsturen", "درخواست بھیجنا"],
        ["stuur de aanvraag op", "درخواست بھیج دیں"]
      ],
      teaching: authoredA1TeachingV4([
        ["het formulier", "سرکاری دفتر یا دوسری تنظیم کا وہ کاغذ جس میں معلومات کے خانے بھرنے ہوں، اسے het formulier کہیں۔", "یہ خالی یا بھرا جانے والا فارم ہے؛ جمع کی گئی درخواست کو de aanvraag کہتے ہیں۔", "formulier کے ساتھ het آتا ہے؛ de formulier نہ کہیں۔", "Dit is het formulier.", "یہ فارم ہے۔", "ہَت فور مُو لیر"],
        ["het formulier invullen", "فارم کے خانے مکمل کرنے کے کام کے لیے het formulier invullen استعمال کریں۔", "invullen خانے بھرنا ہے؛ ondertekenen صرف دستخط کرنا ہے۔", "صرف formulier کہنا کام نہیں بتاتا؛ بھرنے کے لیے invullen بھی رکھیں۔", "Ik moet het formulier invullen.", "مجھے فارم بھرنا ہے۔", "ہَت فور مُو لیر اِن فُلَن"],
        ["vul het formulier in", "ملازم جب آپ کو فارم بھرنے کی ہدایت دے تو مکمل بات vul het formulier in سنیں۔", "یہ آپ کو دی گئی ہدایت ہے؛ ik vul het formulier in اپنے کام کی اطلاع ہوگی۔", "in کو چھوڑ کر vul het formulier نہ کہیں؛ الگ ہونے والے فعل کا دوسرا حصہ آخر میں رکھیں۔", "Vul het formulier in, alstublieft.", "براہِ مہربانی فارم بھر دیں۔", "فُل ہَت فور مُو لیر اِن"],
        ["de handtekening", "فارم میں دستخط والے خانے یا اپنے لکھے ہوئے دستخط کے لیے de handtekening آتا ہے۔", "handtekening دستخط ہے؛ naam صرف نام ہے۔", "اس اسم کے ساتھ de آتا ہے؛ het handtekening نہ کہیں۔", "Hier staat mijn handtekening.", "یہاں میرے دستخط ہیں۔", "دَ ہانٹ تی کَ نِنگ"],
        ["het formulier ondertekenen", "فارم مکمل کرنے کے بعد اس پر دستخط کرنے کے عمل کے لیے het formulier ondertekenen کہیں۔", "ondertekenen دستخط کرنا ہے؛ invullen معلومات کے خانے بھرنا ہے۔", "خانے بھرنے اور دستخط کرنے کو ایک ہی کام نہ سمجھیں؛ دونوں الگ مرحلے ہیں۔", "Ik moet het formulier ondertekenen.", "مجھے فارم پر دستخط کرنے ہیں۔", "ہَت فور مُو لیر آن دَر تی کَ نَن"],
        ["onderteken hier", "ملازم جہاں دستخط چاہتا ہے وہاں مختصر ہدایت onderteken hier دیتا ہے۔", "یہ دستخط کی جگہ بتاتی ہے؛ waar moet ik tekenen? اس جگہ کے بارے میں سوال ہے۔", "hier کو نہ چھوڑیں، ورنہ جگہ واضح نہیں رہتی۔", "Onderteken hier, bij het kruisje.", "یہاں نشان کے پاس دستخط کریں۔", "آن دَر تی کَن ہیر"],
        ["uw identiteitsbewijs meenemen", "ملاقات کی تیاری کی فہرست میں اپنا شناختی کاغذ ساتھ لانے کے کام کو uw identiteitsbewijs meenemen لکھا جا سکتا ہے۔", "meenemen کسی چیز کو ساتھ لانا ہے؛ opsturen اسے بھیج دینا ہے۔", "uw رسمی طور پر آپ کا شناختی کاغذ بتاتا ہے؛ اسے اپنی ذات والے غیر رسمی لفظ کے معنی میں نہ پڑھیں۔", "U moet uw identiteitsbewijs meenemen.", "آپ کو اپنا شناختی کاغذ ساتھ لانا ہے۔", "او اِڈَن ٹی تَیٹس بَ وِیس مے نی مَن"],
        ["neem uw identiteitsbewijs mee", "ملاقات کے خط میں شناختی کاغذ ساتھ لانے کی سیدھی ہدایت neem uw identiteitsbewijs mee ہوتی ہے۔", "یہ ساتھ لانے کی ہدایت ہے؛ کاؤنٹر پر دیتے وقت hier is mijn identiteitsbewijs کہیں۔", "mee کو آخر میں رکھیں؛ neem uw identiteitsbewijs اکیلا اس سبق کی مکمل ہدایت نہیں۔", "Neem uw identiteitsbewijs mee naar de afspraak.", "ملاقات پر اپنا شناختی کاغذ ساتھ لائیں۔", "نیم او اِڈَن ٹی تَیٹس بَ وِیس مے"],
        ["de aanvraag", "جب فارم کے ذریعے کوئی سرکاری کام مانگا جائے تو پوری درخواست کو de aanvraag کہتے ہیں۔", "formulier معلومات بھرنے والا کاغذ ہے؛ aanvraag وہ درخواست ہے جو آپ جمع کرتے ہیں۔", "درخواست اور فارم کو ایک ہی معنی نہ دیں؛ فارم درخواست کا حصہ ہو سکتا ہے۔", "De aanvraag is compleet.", "درخواست مکمل ہے۔", "دَ آن فراخ"],
        ["de aanvraag opsturen", "مکمل درخواست ڈاک یا آن لائن بھیجنے کے عمل کے لیے de aanvraag opsturen استعمال کریں۔", "opsturen بھیجنا ہے؛ meenemen اپنے ساتھ لانا ہے۔", "opsturen کو ایک ہی فعل سمجھیں، لیکن جملے میں stuur … op بن سکتا ہے۔", "Ik ga de aanvraag opsturen.", "میں درخواست بھیجنے والا / والی ہوں۔", "دَ آن فراخ آپ سٹو رَن"],
        ["stuur de aanvraag op", "جب ہدایت ہو کہ مکمل درخواست بھیج دیں تو stuur de aanvraag op سنیں یا پڑھیں۔", "یہ بھیجنے کی ہدایت ہے؛ de aanvraag opsturen کام کا نام ہے۔", "op کو آخر سے نہ ہٹائیں؛ stuur de aanvraag اکیلا نامکمل ہے۔", "Stuur de aanvraag vandaag op.", "درخواست آج بھیج دیں۔", "سٹیور دَ آن فراخ آپ"]
      ]),
      pattern: {
        modelDutch: "vul het formulier in",
        titleUrdu: "الگ ہونے والے فعل سے فارم کا کام سمجھنا",
        highlight: "vul … in",
        explanationUrdu: "invullen، meenemen، اور opsturen ایک کام کے دو حصے رکھتے ہیں۔ ہدایت میں پہلا حصہ فعل کے پاس اور دوسرا حصہ آخر میں آتا ہے: vul het formulier in۔",
        contrastUrdu: "کام کا نام het formulier invullen ہے؛ سیدھی ہدایت vul het formulier in ہے۔ معنی ایک عمل کا ہے مگر ترتیب موقع کے ساتھ بدلتی ہے۔",
        commonMistakeUrdu: "in، mee، یا op کو چھوڑ نہ دیں؛ vul het formulier، neem uw identiteitsbewijs، اور stuur de aanvraag اس سبق میں نامکمل ہیں۔"
      },
      prerequisiteLessonIds: ["a1-details-forms", "a1-post-parcel-extra"],
      prerequisiteRefs: [
        ["a1-details-forms", "adres"],
        ["a1-details-forms", "geboortedatum"],
        ["a1-post-parcel-extra", "identiteitsbewijs"]
      ],
      independentCheckLeadUrdu: "دوسرے سرکاری فارم میں",
      scenarios: {
        "het formulier": ["form-identify", "کاؤنٹر پر دو کاغذ پڑے ہیں؛ معلومات کے خانے والے فارم کا درست نام منتخب کریں۔"],
        "het formulier invullen": ["form-fill-task", "آپ کو فارم کے تمام خانے مکمل کرنے ہیں؛ اس کام کی درست ڈچ بات منتخب کریں۔"],
        "vul het formulier in": ["clerk-fill-instruction", "ملازم آپ کو فارم بھرنے کی سیدھی ہدایت دیتا ہے؛ پوری ہدایت منتخب کریں۔"],
        "de handtekening": ["signature-field", "فارم کے آخری خانے میں دستخط مانگے گئے ہیں؛ اس خانے کا درست ڈچ نام منتخب کریں۔"],
        "het formulier ondertekenen": ["sign-form-task", "تمام معلومات بھر چکے ہیں اور اب فارم پر دستخط کرنے کا کام باقی ہے؛ درست بات منتخب کریں۔"],
        "onderteken hier": ["sign-here-instruction", "ملازم فارم پر نشان لگا کر اسی جگہ دستخط کرنے کو کہتا ہے؛ مکمل ہدایت منتخب کریں۔"],
        "uw identiteitsbewijs meenemen": ["identity-bring-task", "ملاقات کی تیاری کی فہرست میں اپنا شناختی کاغذ ساتھ لانے والا کام لکھنا ہے؛ درست بات منتخب کریں۔"],
        "neem uw identiteitsbewijs mee": ["identity-bring-instruction", "ملاقات کے خط میں شناختی کاغذ ساتھ لانے کی ہدایت ہے؛ مکمل ڈچ ہدایت منتخب کریں۔"],
        "de aanvraag": ["application-name", "فارم اور ثبوت ملا کر جو سرکاری درخواست جمع ہوگی اس کا درست ڈچ نام منتخب کریں۔"],
        "de aanvraag opsturen": ["send-application-task", "مکمل درخواست کو آن لائن بھیجنے کا کام بتانا ہے؛ درست ڈچ بات منتخب کریں۔"],
        "stuur de aanvraag op": ["send-application-instruction", "سرکاری خط کہتا ہے کہ مکمل درخواست آج بھیج دیں؛ پوری ہدایت منتخب کریں۔"]
      },
      documents: [
        { documentKind: "form-action-checklist", title: "Formulier", rows: [{ label: "Stap 1", value: "het formulier" }, { label: "Stap 2", value: "vul het formulier in" }, { label: "Klaar", value: "de handtekening" }] },
        { documentKind: "appointment-document-checklist", title: "Meenemen", rows: [{ label: "Document", value: "neem uw identiteitsbewijs mee" }, { label: "Formulier", value: "het formulier ondertekenen" }, { label: "Plaats", value: "onderteken hier" }] },
        { documentKind: "application-submission-checklist", title: "Aanvraag", rows: [{ label: "Document", value: "de aanvraag" }, { label: "Actie", value: "de aanvraag opsturen" }, { label: "Vandaag", value: "stuur de aanvraag op" }] }
      ]
    },
    "a2-gemeente-official": {
      title: "Aankomen bij de gemeente",
      unitLabel: "A2: Gemeente اور فارم",
      outcomeUrdu: "gemeente پہنچ کر صحیح کاؤنٹر تلاش کرنا، ملاقات بتانا، BSN اور پاسپورٹ پہچاننا، شناخت دکھانا، اور فارم میں مدد مانگنا۔",
      seedConcepts: [
        ["de gemeente", "بلدیہ / شہری سرکاری دفتر"],
        ["het loket", "کاؤنٹر"],
        ["het BSN", "شہری شناختی نمبر"],
        ["het paspoort", "پاسپورٹ"],
        ["ik heb een afspraak bij de gemeente", "میری gemeente میں ملاقات ہے"],
        ["waar is loket drie?", "کاؤنٹر تین کہاں ہے؟"],
        ["hier is mijn paspoort", "یہ میرا پاسپورٹ ہے"],
        ["kunt u mij helpen met dit formulier?", "کیا آپ اس فارم میں میری مدد کر سکتے ہیں؟"]
      ],
      teaching: authoredA1TeachingV4([
        ["de gemeente", "پتہ، رجسٹریشن، BSN، یا سرکاری کاغذ کے شہری دفتر کے لیے de gemeente کہیں۔", "gemeente شہر کا سرکاری ادارہ ہے؛ loket اسی دفتر کے اندر کاؤنٹر ہے۔", "gemeente کو صرف عمارت نہ سمجھیں؛ یہ دفتر اور ادارہ دونوں بتا سکتا ہے۔", "Ik heb een afspraak bij de gemeente.", "میری gemeente میں ملاقات ہے۔", "دَ خَ مین تَ"],
        ["het loket", "دفتر میں جہاں ملازم آپ کا کاغذ دیکھتا ہے اس خدمت والے کاؤنٹر کو het loket کہتے ہیں۔", "loket کاؤنٹر ہے؛ gemeente پورا ادارہ یا دفتر ہے۔", "loket کے ساتھ het آتا ہے؛ de loket نہ کہیں۔", "Loket drie is open.", "کاؤنٹر تین کھلا ہے۔", "ہَت لو کیٹ"],
        ["het BSN", "شہری سرکاری ریکارڈ میں ذاتی شناختی نمبر کے لیے het BSN لکھا ہوتا ہے۔", "BSN ذاتی نمبر ہے؛ paspoort شناختی دستاویز ہے۔", "BSN کو فون نمبر یا پاسپورٹ نمبر نہ سمجھیں۔", "Mijn BSN staat op de brief.", "میرا BSN خط پر لکھا ہے۔", "ہَت بے ایس اَین"],
        ["het paspoort", "شناخت ثابت کرنے کے لیے پاسپورٹ دکھانا ہو تو het paspoort کہیں۔", "paspoort دستاویز ہے؛ BSN ایک نمبر ہے۔", "paspoort کے ساتھ het آتا ہے؛ de paspoort نہ کہیں۔", "Hier is mijn paspoort.", "یہ میرا پاسپورٹ ہے۔", "ہَت پاس پورت"],
        ["ik heb een afspraak bij de gemeente", "استقبالی ملازم کو بتائیں کہ آپ بغیر مقصد کے نہیں بلکہ طے شدہ ملاقات کے لیے آئے ہیں۔", "یہ موجودہ ملاقات بتاتا ہے؛ ik wil een afspraak maken نئی ملاقات مانگتا ہے۔", "bij de gemeente کو نہ چھوڑیں، ورنہ ملاقات کی جگہ واضح نہیں رہتی۔", "Goedemorgen, ik heb een afspraak bij de gemeente.", "صبح بخیر، میری gemeente میں ملاقات ہے۔", "اِک ہَپ اَین آف سپراخ بَے دَ خَ مین تَ"],
        ["waar is loket drie", "نمبر معلوم ہو مگر کاؤنٹر کی جگہ نہ ملے تو waar is loket drie? پوچھیں۔", "یہ جگہ پوچھتا ہے؛ welk loket heb ik nodig? صحیح کاؤنٹر کا نمبر پوچھتا ہے۔", "سوال میں waar پہلے رکھیں؛ loket drie is waar درست سوالی ترتیب نہیں۔", "Waar is loket drie?", "کاؤنٹر تین کہاں ہے؟", "وار اِس لو کیٹ دری"],
        ["hier is mijn paspoort", "ملازم پاسپورٹ مانگے تو دستاویز دیتے وقت hier is mijn paspoort کہیں۔", "یہ دستاویز پیش کرنا ہے؛ neem uw paspoort mee اسے ساتھ لانے کی ہدایت ہے۔", "mijn کے ساتھ het نہ لگائیں؛ hier is het mijn paspoort غلط ہے۔", "Alstublieft, hier is mijn paspoort.", "لیجیے، یہ میرا پاسپورٹ ہے۔", "ہیر اِس مَین پاس پورت"],
        ["kunt u mij helpen met dit formulier", "فارم کا سوال یا خانہ سمجھ نہ آئے تو کاؤنٹر کے ملازم سے مکمل مؤدبانہ مدد مانگیں۔", "یہ اسی فارم میں مدد کی درخواست ہے؛ kunt u dit uitleggen? کسی خاص بات کی وضاحت مانگتا ہے۔", "met dit formulier کو نہ چھوڑیں، ورنہ کس کام میں مدد چاہیے واضح نہیں رہتا۔", "Kunt u mij helpen met dit formulier?", "کیا آپ اس فارم میں میری مدد کر سکتے ہیں؟", "کُنٹ او مَے ہیل پَن مَٹ دِت فور مُو لیر"]
      ]),
      pattern: false,
      prerequisiteLessonIds: ["a2-separable-verbs-routine"],
      prerequisiteRefs: [["a1-appointments", "ik wil een afspraak maken"], ["a1-polite-chunks", "kunt u mij helpen alstublieft?"]],
      independentCheckLeadUrdu: "دوسرے سرکاری دفتر کے استقبالی کاؤنٹر پر",
      scenarios: {
        "de gemeente": ["municipality-name", "پتے کی تبدیلی کے لیے جس شہری سرکاری دفتر جانا ہے اس کا درست ڈچ نام منتخب کریں۔"],
        "het loket": ["service-counter-name", "دفتر کے اندر جس کاؤنٹر پر دستاویز دکھانی ہے اس کا درست ڈچ نام منتخب کریں۔"],
        "het BSN": ["citizen-number-field", "خط میں شہری شناختی نمبر والا خانہ نشان زد کرنا ہے؛ درست ڈچ نام منتخب کریں۔"],
        "het paspoort": ["passport-check", "شناخت کے لیے دکھائی جانے والی پاسپورٹ دستاویز کا درست ڈچ نام منتخب کریں۔"],
        "ik heb een afspraak bij de gemeente": ["announce-appointment", "استقبالی ملازم کو بتائیں کہ gemeente میں آپ کی ملاقات پہلے سے طے ہے۔"],
        "waar is loket drie": ["find-counter-three", "ٹکٹ پر loket 3 لکھا ہے مگر جگہ نظر نہیں آ رہی؛ کاؤنٹر کی جگہ پوچھیں۔"],
        "hier is mijn paspoort": ["present-passport", "ملازم شناخت مانگتا ہے؛ پاسپورٹ دیتے ہوئے مکمل بات کہیں۔"],
        "kunt u mij helpen met dit formulier": ["ask-form-help", "فارم کا ایک خانہ سمجھ نہیں آ رہا؛ اسی فارم میں مؤدبانہ مدد مانگیں۔"]
      },
      documents: [
        { documentKind: "municipality-appointment-letter", title: "Afspraak gemeente", rows: [{ label: "Plaats", value: "de gemeente" }, { label: "Nummer", value: "het BSN" }, { label: "Document", value: "het paspoort" }, { label: "Balie", value: "het loket" }] },
        { documentKind: "municipality-counter-ticket", title: "Loket 3", rows: [{ label: "Melding", value: "ik heb een afspraak bij de gemeente" }, { label: "Vraag", value: "waar is loket drie?" }, { label: "Document", value: "hier is mijn paspoort" }, { label: "Hulp", value: "kunt u mij helpen met dit formulier?" }] }
      ]
    },
    "a2-gemeente-documents": {
      title: "Documenten controleren en een aanvraag volgen",
      unitLabel: "A2: Gemeente اور فارم",
      outcomeUrdu: "مطلوبہ کاغذات پوچھنا، نقل اور دستخط کی شرط سمجھنا، فارم کی مشکل واضح کرنا، غلط معلومات درست کروانا، درخواست آن لائن جمع کرنا، اور جواب کی مدت معلوم کرنا۔",
      seedConcepts: [
        ["welke documenten heb ik nodig?", "مجھے کون سے کاغذات چاہیے؟"],
        ["is een kopie voldoende?", "کیا ایک نقل کافی ہے؟"],
        ["waar moet ik tekenen?", "مجھے کہاں دستخط کرنے ہیں؟"],
        ["ik heb mijn BSN niet bij me", "میرا BSN میرے پاس نہیں ہے"],
        ["ik begrijp deze vraag niet", "مجھے یہ سوال سمجھ نہیں آیا"],
        ["kunt u dit uitleggen?", "کیا آپ یہ سمجھا سکتے ہیں؟"],
        ["het formulier is nog niet compleet", "فارم ابھی مکمل نہیں ہے"],
        ["mijn gegevens zijn niet correct", "میری معلومات درست نہیں ہیں"],
        ["ik wil deze fout laten herstellen", "میں یہ غلطی درست کروانا چاہتا / چاہتی ہوں"],
        ["kan ik de aanvraag online doen?", "کیا میں درخواست آن لائن دے سکتا / سکتی ہوں؟"],
        ["wanneer krijg ik antwoord?", "مجھے جواب کب ملے گا؟"],
        ["u ontvangt binnen twee weken een brief", "آپ کو دو ہفتوں کے اندر ایک خط ملے گا"]
      ],
      teaching: authoredA1TeachingV4([
        ["welke documenten heb ik nodig", "ملاقات یا درخواست سے پہلے مطلوبہ کاغذات کی مکمل فہرست پوچھنے کے لیے یہ سوال استعمال کریں۔", "documenten کئی کاغذات ہیں؛ واحد چیز پوچھنے کے لیے سوالی لفظ کی دوسری شکل آتی ہے۔", "welke کے بعد جمع documenten رکھیں؛ واحد والی شکل کے ساتھ documenten نہ کہیں۔", "Welke documenten heb ik nodig voor de aanvraag?", "درخواست کے لیے مجھے کون سے کاغذات چاہیے؟", "وَیل کَ دو کو مَن تَن ہَپ اِک نو دِخ"],
        ["is een kopie voldoende", "جب معلوم کرنا ہو کہ اصل کے بجائے نقل قبول ہوگی تو یہ مکمل سوال پوچھیں۔", "kopie نقل ہے؛ paspoort یا identiteitsbewijs اصل شناختی دستاویز ہو سکتی ہے۔", "voldoende کا مطلب کافی ہے؛ اسے موجود ہونے کے معنی میں نہ پڑھیں۔", "Is een kopie van mijn paspoort voldoende?", "کیا میرے پاسپورٹ کی نقل کافی ہے؟", "اِس اَین کو پی فول دون دَ"],
        ["waar moet ik tekenen", "فارم میں دستخط کی جگہ واضح نہ ہو تو یہ سوال پوچھیں۔", "یہ جگہ پوچھتا ہے؛ moet ik tekenen? صرف یہ پوچھتا ہے کہ دستخط ضروری ہیں یا نہیں۔", "tekenen کو آخر میں رکھیں؛ waar ik moet tekenen سوال کی سیدھی ترتیب نہیں۔", "Waar moet ik tekenen?", "مجھے کہاں دستخط کرنے ہیں؟", "وار موت اِک تی کَ نَن"],
        ["ik heb mijn BSN niet bij me", "کاؤنٹر پر BSN مانگا جائے مگر نمبر ساتھ نہ ہو تو مسئلہ صاف بتائیں۔", "niet bij me کا مطلب ابھی میرے پاس نہیں؛ اس کا مطلب یہ نہیں کہ آپ کا BSN بنا ہی نہیں۔", "بالکل نہ ہونے والی ساخت اور niet bij me الگ باتیں ہیں؛ اس موقع پر ابھی پاس نہ ہونے کی بات کہیں۔", "Sorry, ik heb mijn BSN niet bij me.", "معاف کیجیے، میرا BSN میرے پاس نہیں ہے۔", "اِک ہَپ مَین بے ایس اَین نیت بَے مَ"],
        ["ik begrijp deze vraag niet", "فارم کا خاص سوال سمجھ نہ آئے تو پہلے یہی مشکل واضح کریں۔", "یہ ایک سوال نہ سمجھنے کی بات ہے؛ پورا فارم بھرنے میں مدد کے لیے دوسرا جملہ آتا ہے۔", "deze vraag کو نہ چھوڑیں؛ ورنہ کون سی بات سمجھ نہیں آئی واضح نہیں رہتی۔", "Ik begrijp deze vraag niet.", "مجھے یہ سوال سمجھ نہیں آیا۔", "اِک بَ خرَیپ دے زَ فراخ نیت"],
        ["kunt u dit uitleggen", "نشان زدہ سوال یا شرط کی سادہ وضاحت مانگنے کے لیے یہ مؤدبانہ درخواست کریں۔", "dit اسی دکھائی ہوئی بات کی طرف اشارہ ہے؛ پورے فارم میں مدد کے لیے met dit formulier کہیں۔", "u کو نہ چھوڑیں؛ kunt dit uitleggen رسمی مکمل سوال نہیں۔", "Kunt u dit in eenvoudige woorden uitleggen?", "کیا آپ یہ آسان لفظوں میں سمجھا سکتے ہیں؟", "کُنٹ او دِت آوٹ لَخَن"],
        ["het formulier is nog niet compleet", "ملازم کی بات میں nog niet compleet سنیں تو سمجھیں کہ کچھ خانے یا ثبوت ابھی باقی ہیں۔", "nog niet کا مطلب ابھی تک نہیں؛ nooit کا مطلب کبھی نہیں ہوتا۔", "nog کو نظر انداز نہ کریں؛ یہ بتاتا ہے کہ فارم بعد میں مکمل ہو سکتا ہے۔", "Het formulier is nog niet compleet.", "فارم ابھی مکمل نہیں ہے۔", "ہَت فور مُو لیر اِس نوخ نیت کُم پلیٹ"],
        ["mijn gegevens zijn niet correct", "نام، پتہ، یا دوسری سرکاری معلومات غلط لکھی ہوں تو یہ مکمل مسئلہ بتائیں۔", "gegevens معلومات ہیں؛ document کاغذ ہے۔ یہاں کاغذ نہیں بلکہ اندر کی معلومات غلط ہیں۔", "zijn کو نہ چھوڑیں؛ mijn gegevens niet correct نامکمل ہے۔", "Mijn adres is veranderd; mijn gegevens zijn niet correct.", "میرا پتہ بدل گیا ہے؛ میری معلومات درست نہیں ہیں۔", "مَین خَ خے فَنس زَین نیت کو رَکٹ"],
        ["ik wil deze fout laten herstellen", "سرکاری ریکارڈ کی دکھائی ہوئی غلطی درست کروانے کی درخواست کے لیے یہ جملہ کہیں۔", "fout غلطی ہے؛ gegevens معلومات ہیں۔ یہ غلطی درست کروانے کا اگلا عملی قدم ہے۔", "laten herstellen کو صرف خود درست کرنے کے معنی میں نہ پڑھیں؛ آپ ادارے سے درست کروا رہے ہیں۔", "Ik wil deze fout laten herstellen.", "میں یہ غلطی درست کروانا چاہتا / چاہتی ہوں۔", "اِک وِل دے زَ فاؤٹ لا تَن ہَر سٹَلَن"],
        ["kan ik de aanvraag online doen", "اگر دفتر دوبارہ آنے کے بجائے درخواست ویب پر جمع کرنے کا امکان پوچھنا ہو تو یہ سوال کریں۔", "online doen پورا آن لائن عمل ہے؛ opsturen مکمل درخواست بھیجنے کا ایک قدم ہے۔", "سوال میں kan پہلے اور ik بعد میں رکھیں؛ ik kan … بیان ہے۔", "Kan ik de aanvraag online doen?", "کیا میں درخواست آن لائن دے سکتا / سکتی ہوں؟", "کان اِک دَ آن فراخ آن لَین دون"],
        ["wanneer krijg ik antwoord", "درخواست جمع ہونے کے بعد جواب یا فیصلے کا وقت پوچھنے کے لیے یہ سوال کریں۔", "wanneer وقت پوچھتا ہے؛ waar جگہ اور welke چیز پوچھتا ہے۔", "antwoord کو aanvraag نہ سمجھیں؛ یہ ادارے کی طرف سے آنے والا جواب ہے۔", "Wanneer krijg ik antwoord op mijn aanvraag?", "مجھے اپنی درخواست کا جواب کب ملے گا؟", "وَ نیر کرَیخ اِک آنٹ وورت"],
        ["u ontvangt binnen twee weken een brief", "رسید یا ملازم کی بات میں یہ جملہ سنیں تو سمجھیں کہ خط زیادہ سے زیادہ دو ہفتوں کے اندر آئے گا۔", "binnen twee weken مدت کی آخری حد بتاتا ہے؛ over twee weken عین دو ہفتے بعد کا مطلب دے سکتا ہے۔", "binnen کو نظر انداز نہ کریں؛ جواب دو ہفتوں کے اندر آ سکتا ہے۔", "U ontvangt binnen twee weken een brief.", "آپ کو دو ہفتوں کے اندر ایک خط ملے گا۔", "او آنٹ فانکٹ بِنَن توے وے کَن اَین بریف"]
      ]),
      pattern: {
        modelDutch: "welke documenten heb ik nodig?",
        titleUrdu: "ضرورت کی مکمل فہرست پوچھنا",
        highlight: "welke … heb ik nodig?",
        explanationUrdu: "کئی مطلوبہ چیزیں پوچھنے کے لیے welke کے بعد جمع اسم اور پھر heb ik nodig رکھیں: welke documenten heb ik nodig?",
        contrastUrdu: "welke documenten کئی کاغذات پوچھتا ہے؛ waar moet ik tekenen جگہ پوچھتا ہے اور wanneer krijg ik antwoord وقت پوچھتا ہے۔",
        commonMistakeUrdu: "welk documenten نہ کہیں اور سوالی ترتیب میں ik heb کو آگے نہ رکھیں؛ welke documenten heb ik nodig? کہیں۔"
      },
      prerequisiteLessonIds: ["a2-separable-verbs-routine", "a2-gemeente-official"],
      prerequisiteRefs: [["a0-understanding-help", "wat betekent dit?"]],
      independentCheckLeadUrdu: "دوسری درخواست کی دستاویز میں",
      scenarios: {
        "welke documenten heb ik nodig": ["ask-required-documents", "ملاقات کے خط میں فہرست نہیں ہے؛ کاؤنٹر سے تمام مطلوبہ کاغذات پوچھیں۔"],
        "is een kopie voldoende": ["ask-copy-accepted", "اصل پاسپورٹ گھر رہ گیا ہے مگر نقل موجود ہے؛ پوچھیں کہ نقل کافی ہے یا نہیں۔"],
        "waar moet ik tekenen": ["ask-signature-place", "فارم میں دو نشان ہیں اور دستخط کی جگہ واضح نہیں؛ صحیح جگہ پوچھیں۔"],
        "ik heb mijn BSN niet bij me": ["missing-bsn-now", "ملازم BSN مانگتا ہے مگر نمبر ابھی آپ کے پاس نہیں؛ مسئلہ صاف بتائیں۔"],
        "ik begrijp deze vraag niet": ["form-question-unclear", "فارم کا آخری سوال سمجھ نہیں آیا؛ پہلے اپنی مشکل واضح کریں۔"],
        "kunt u dit uitleggen": ["request-explanation", "ملازم نے ایک شرط دکھائی ہے مگر معنی واضح نہیں؛ مؤدبانہ وضاحت مانگیں۔"],
        "het formulier is nog niet compleet": ["incomplete-form-status", "کاؤنٹر پر معلوم ہوتا ہے کہ ایک ثبوت غائب ہے؛ فارم کی موجودہ حالت بتائیں۔"],
        "mijn gegevens zijn niet correct": ["incorrect-record-details", "سرکاری خط میں پرانا پتہ لکھا ہے؛ بتائیں کہ معلومات درست نہیں۔"],
        "ik wil deze fout laten herstellen": ["request-record-correction", "غلط پتہ دکھانے کے بعد ادارے سے وہ غلطی درست کروانے کی درخواست کریں۔"],
        "kan ik de aanvraag online doen": ["ask-online-application", "دوبارہ دفتر آنا مشکل ہے؛ پوچھیں کہ پوری درخواست آن لائن ہو سکتی ہے یا نہیں۔"],
        "wanneer krijg ik antwoord": ["ask-decision-time", "درخواست جمع ہو گئی مگر فیصلے کی تاریخ نہیں لکھی؛ جواب کا وقت پوچھیں۔"],
        "u ontvangt binnen twee weken een brief": ["understand-response-deadline", "جمع کرانے کی رسید پر جواب کی مدت لکھی ہے؛ دو ہفتوں کے اندر خط آنے والی مکمل بات منتخب کریں۔"]
      },
      documents: [
        { documentKind: "required-documents-checklist", title: "Meenemen", rows: [{ label: "Documenten", value: "welke documenten heb ik nodig?" }, { label: "Kopie", value: "is een kopie voldoende?" }, { label: "Handtekening", value: "waar moet ik tekenen?" }, { label: "BSN", value: "ik heb mijn BSN niet bij me" }] },
        { documentKind: "form-completion-notice", title: "Formulier controleren", rows: [{ label: "Vraag", value: "ik begrijp deze vraag niet" }, { label: "Uitleg", value: "kunt u dit uitleggen?" }, { label: "Status", value: "het formulier is nog niet compleet" }, { label: "Gegevens", value: "mijn gegevens zijn niet correct" }] },
        { documentKind: "application-receipt", title: "Aanvraag ontvangen", rows: [{ label: "Correctie", value: "ik wil deze fout laten herstellen" }, { label: "Online", value: "kan ik de aanvraag online doen?" }, { label: "Antwoord", value: "wanneer krijg ik antwoord?" }, { label: "Termijn", value: "u ontvangt binnen twee weken een brief" }] }
      ]
    }
  },
  missions: {
    "a2-mission-social-help": {
      sourceKey: "a2-gemeente-forms-mission",
      scenarioTitleUrdu: "gemeente کی ملاقات، فارم، اصلاح، اور جواب",
      speakerUrdu: "gemeente کا ملازم",
      prerequisiteLessonIds: [
        "a2-separable-verbs-routine",
        "a2-gemeente-official",
        "a2-gemeente-documents"
      ],
      variantTitles: [
        "پتے کی تبدیلی کی درخواست",
        "نام کی غلطی درست کروانا",
        "آن لائن درخواست کے بعد پیروی"
      ],
      variantContexts: [
        "gemeente کے کاؤنٹر پر ملاقات بتائیں، شناخت دکھائیں، فارم مکمل کریں، اور نئے پتے کی درخواست کے جواب کا وقت پوچھیں",
        "سرکاری ریکارڈ میں نام کی غلطی دکھائیں، فارم کی مدد مانگیں، درست کاغذ جمع کریں، اور اصلاح کی تصدیق لیں",
        "آن لائن درخواست کے کاغذات چیک کریں، شناختی شرط سمجھیں، نامکمل حصہ درست کریں، اور جواب کی مدت معلوم کریں"
      ],
      targets: [
        { lessonId: "a2-separable-verbs-routine", dutch: "vul het formulier in", patternLessonId: "a2-separable-verbs-routine" },
        { lessonId: "a2-separable-verbs-routine", dutch: "neem uw identiteitsbewijs mee" },
        { lessonId: "a2-gemeente-official", dutch: "ik heb een afspraak bij de gemeente" },
        { lessonId: "a2-gemeente-official", dutch: "kunt u mij helpen met dit formulier?" },
        { lessonId: "a2-gemeente-documents", dutch: "mijn gegevens zijn niet correct" },
        { lessonId: "a2-gemeente-documents", dutch: "wanneer krijg ik antwoord?", patternLessonId: "a2-gemeente-documents" }
      ],
      prerequisiteRefs: [
        ["a1-appointments", "ik wil een afspraak maken"],
        ["a1-polite-chunks", "kunt u mij helpen alstublieft?"],
        ["a1-post-parcel-extra", "identiteitsbewijs"]
      ],
      useTypes: ["situation", "listen-choice", "situation", "build", "situation", "document-choice"],
      checkTypes: ["meaning", "listen-choice", "reverse", "build", "situation", "document-choice"],
      document: {
        documentKind: "municipality-application-status",
        title: "gemeente کی درخواست",
        labelUrdu: "gemeente کی درخواست اور جواب کی رسید پڑھیں",
        promptUrdu: "رسید میں غلط معلومات اور جواب کی مدت والی قطاریں پڑھیں، پھر مانگی ہوئی مکمل ڈچ بات کا درست اردو مطلب منتخب کریں۔",
        instructionUrdu: "درخواست کی چھ قطاریں الگ پڑھیں اور سوال میں مانگی گئی سیکھی ہوئی بات کا درست اردو مطلب منتخب کریں۔",
        rows: [
          { label: "فارم", value: "vul het formulier in" },
          { label: "شناخت", value: "neem uw identiteitsbewijs mee" },
          { label: "ملاقات", value: "ik heb een afspraak bij de gemeente" },
          { label: "مدد", value: "kunt u mij helpen met dit formulier?" },
          { label: "اصلاح", value: "mijn gegevens zijn niet correct" },
          { label: "جواب", value: "wanneer krijg ik antwoord?" }
        ]
      }
    }
  }
};

/*
 * The remaining A2 lessons use the same authored contract as the accepted
 * gemeente unit.  The compact profiles below deliberately keep the legacy
 * stable Dutch/Urdu targets, but replace generated teaching prose, Use
 * wrappers, and fake one-line documents with reviewed lesson-specific
 * records.  Keeping this builder next to the registry makes the source of
 * every A2 card and situation explicit while avoiding another giant question
 * bank whose correctness depends on array position.
 */
const a2SchoolAbsenceLessonV4 = {
  id: "a2-school-absence-notice",
  unit: "A2: والدین اور اسکول",
  title: "Ziek melden en een schoolbericht lezen",
  description: "بچے کی غیر حاضری بتانا، وجہ دینا، اور اسکول کا مختصر نوٹس سمجھنا۔",
  xp: 0,
  questions: [],
  concepts: [],
  seedConcepts: [
    { dutch: "mijn kind komt vandaag niet naar school", urdu: "میرا بچہ آج اسکول نہیں آئے گا" },
    { dutch: "ik meld mijn kind af", urdu: "میں اپنے بچے کی غیر حاضری کی اطلاع دیتا / دیتی ہوں" },
    { dutch: "mijn kind is ziek", urdu: "میرا بچہ بیمار ہے" },
    { dutch: "hij had koorts en moest thuisblijven", urdu: "اسے بخار تھا اور گھر رہنا پڑا" },
    { dutch: "de les begint om tien uur", urdu: "سبق دس بجے شروع ہوتا ہے" },
    { dutch: "de les valt vandaag uit", urdu: "آج سبق منسوخ ہے" },
    { dutch: "moet ik de docent bellen?", urdu: "کیا مجھے استاد کو فون کرنا چاہیے؟" },
    { dutch: "wanneer kan mijn kind weer komen?", urdu: "میرا بچہ دوبارہ کب آ سکتا ہے؟" }
  ]
};
insertLessonAfter(a2Lessons, "a2-mission-job-start", a2SchoolAbsenceLessonV4);

const a2GuidanceMomentsV4 = [
  "صبح پہلی گفتگو شروع ہونے پر", "لکھی ہوئی اطلاع سامنے آنے کے بعد",
  "ذمہ دار شخص وضاحت مانگے تو", "مقررہ وقت بدلنے سے پہلے",
  "فون پر جواب دیتے ہوئے", "کاؤنٹر پر اپنی باری آنے پر",
  "مختصر پیغام بھیجتے وقت", "اگلا قدم طے کرنے سے پہلے",
  "رسید یا خط دوبارہ پڑھتے ہوئے", "مسئلہ پہلی بار رپورٹ کرتے وقت",
  "دوسری طرف سے سوال آنے پر", "تحریری تصدیق محفوظ کرتے وقت",
  "ملاقات ختم ہونے سے پہلے", "غلط فہمی فوراً درست کرتے ہوئے",
  "مددگار کو مکمل صورت بتاتے وقت", "بعد کی کارروائی پوچھنے کے لیے",
  "نئی شرط سننے کے فوراً بعد", "اپنی دستیابی واضح کرتے ہوئے",
  "ثبوت دکھانے کے موقع پر", "جواب کی مدت معلوم کرتے وقت"
];

const a2GuidanceBoundariesV4 = [
  "یہ موجودہ حالت بتاتی ہے، پچھلا واقعہ نہیں", "یہ سیدھی درخواست ہے، صرف چیز کا نام نہیں",
  "یہ وقت کی بات ہے، جگہ کی نہیں", "یہ وجہ واضح کرتی ہے، نتیجہ نہیں",
  "یہ اجازت پوچھتی ہے، حکم نہیں دیتی", "یہ مسئلہ رپورٹ کرتی ہے، حل کی تصدیق نہیں",
  "یہ مکمل جواب ہے، صرف آغاز نہیں", "یہ تحریری ثبوت ہے، زبانی وعدہ نہیں",
  "یہ اگلا قدم پوچھتی ہے، پرانی کارروائی نہیں", "یہ ایک خاص شرط بتاتی ہے، عام امکان نہیں",
  "یہ متعلقہ شخص سے مدد مانگتی ہے، شکایت ختم نہیں کرتی", "یہ مقررہ مدت بتاتی ہے، اندازہ نہیں",
  "یہ اپنی ضرورت واضح کرتی ہے، دوسرے شخص کا جواب نہیں", "یہ تبدیلی کی اطلاع ہے، نئی درخواست نہیں",
  "یہ ایک مکمل عملی حصہ ہے، الگ لفظی ترجمہ نہیں", "یہ رسمی گفتگو کے لیے ہے، غیر واضح اشارہ نہیں",
  "یہ دستاویز کی معلومات ہے، ذاتی رائے نہیں", "یہ فوری قدم بتاتی ہے، مستقبل کا مبہم منصوبہ نہیں",
  "یہ شرط پوری نہ ہونے کی بات ہے، انکار نہیں", "یہ پیروی کا سوال ہے، پہلی اطلاع نہیں"
];

const a2GuidanceMistakesV4 = [
  "فاعل اور فعل دونوں قائم رکھیں", "سوالی ترتیب کو بیان والی ترتیب میں نہ بدلیں",
  "وقت کا حصہ نہ چھوڑیں", "منفی لفظ کو نظر انداز نہ کریں",
  "مؤدبانہ مخاطب برقرار رکھیں", "درخواست اور اطلاع کو آپس میں نہ ملائیں",
  "اہم اسم کو عمومی لفظ سے نہ بدلیں", "سبب بتانے والا حصہ ادھورا نہ چھوڑیں",
  "شرط سن کر اسے یقینی نتیجہ نہ سمجھیں", "واحد اور جمع کی شکل نہ ملائیں",
  "ماضی کی بات کو حال میں نہ پڑھیں", "اگلے قدم اور آخری فیصلے میں فرق رکھیں",
  "مقدار یا مدت کو اندازے سے نہ بدلیں", "دستاویز کا نام اور کارروائی الگ پہچانیں",
  "جواب میں غیر متعلقہ وجہ نہ جوڑیں", "مکمل عملی فقرہ ایک ساتھ بولیں",
  "رسمی اختتام کو سوال نہ سمجھیں", "مسئلے کے مقام کو حذف نہ کریں",
  "ثبوت اور دعوے کو ایک چیز نہ سمجھیں", "صحیح شخص یا ادارہ واضح رکھیں"
];

// One hand-written situation per A2 phrase. The situation describes the need
// without giving the Urdu translation, so only the matching phrase fits.
const a2ScenarioByDutchV4 = {
  // a2-work-school
  "ik zoek een baan": "روزگار دفتر میں ملازم پوچھتا ہے کہ آپ کیوں آئے ہیں۔ ابھی آپ کے پاس کوئی کام نہیں؛ اپنا مقصد بتائیں۔",
  "ik begin maandag met mijn baan": "دوست پوچھتا ہے کہ نیا کام کب سے ہے۔ آپ کا پہلا دن ہفتے کا پہلا دن ہے؛ بتائیں۔",
  "dit is mijn contract": "دفتر کا ملازم دستخط شدہ کام کا کاغذ مانگتا ہے۔ کاغذ دیتے ہوئے کیا کہیں؟",
  "hoeveel uur staat in mijn contract?": "آپ کو یاد نہیں کہ کاغذ کے مطابق ہفتے میں کتنا کام کرنا ہے؛ نگران سے پوچھیں۔",
  "wanneer krijg ik mijn salaris?": "مہینہ ختم ہو رہا ہے اور آپ کو معلوم نہیں کہ کام کے پیسے کس دن آئیں گے؛ پوچھیں۔",
  "dit is mijn rooster": "نیا ساتھی پوچھتا ہے کہ آپ کن دنوں کام کرتے ہیں۔ فون پر اپنے کام کے دنوں کی فہرست دکھاتے ہوئے کیا کہیں؟",
  "mijn collega helpt mij": "نگران پوچھتا ہے کہ نیا کام آپ کو کون سکھا رہا ہے۔ ساتھ کام کرنے والا سکھا رہا ہے؛ بتائیں۔",
  "mijn rooster is veranderd": "اس ہفتے آپ کے کام کے دن اور وقت پہلے جیسے نہیں رہے؛ زبان کے استاد کو یہ تبدیلی بتائیں۔",
  // a2-future-modal-verbs
  "ik ga maandag beginnen": "نگران پوچھتا ہے کہ آپ نیا کام کس دن شروع کریں گے۔ آپ کا منصوبہ ہفتے کا پہلا دن ہے؛ بتائیں۔",
  "ik kan op dinsdag werken": "نگران کو منگل کے لیے ایک اضافی آدمی چاہیے اور آپ اس دن فارغ ہیں۔ بتائیں کہ یہ ممکن ہے۔",
  "ik moet veiligheidsschoenen dragen": "گودام کے اصول کے مطابق پاؤں کی حفاظت لازمی ہے۔ ساتھی کو بتائیں کہ آپ پر کیا لازم ہے۔",
  "mag ik eerder beginnen?": "آپ صبح جلدی آ کر کام شروع کرنا چاہتے ہیں؛ نگران سے اجازت مانگیں۔",
  "ik kan op vrijdag niet werken": "جمعہ کو آپ کی ایک ضروری مصروفیت ہے۔ نگران کو بتائیں کہ اس دن آپ کے لیے کام ممکن نہیں۔",
  "ik moet de manager bellen": "ساتھی ایک ایسا فیصلہ مانگتا ہے جو صرف نگران کر سکتا ہے۔ بتائیں کہ پہلے آپ کو نگران سے فون پر بات کرنی ضروری ہے۔",
  "mag ik thuiswerken?": "کل آپ کا بچہ بیمار ہے؛ آپ دفتر نہیں آ سکتے مگر کام کر سکتے ہیں۔ گھر سے کام کی اجازت مانگیں۔",
  "wanneer ga ik beginnen?": "نوکری مل گئی ہے مگر کسی نے پہلا دن نہیں بتایا؛ نگران سے پوچھیں۔",
  // a2-work-conditions
  "ik kan op dinsdag niet werken": "نگران آپ کو منگل کی شفٹ دیتا ہے مگر اس دن آپ کی ڈاکٹر سے ملاقات ہے؛ بتائیں۔",
  "kan ik een vrije dag aanvragen": "اگلے مہینے آپ کو ایک شادی میں جانا ہے؛ نگران سے پوچھیں کہ کیا ایک دن کی چھٹی کی درخواست دی جا سکتی ہے۔",
  "mijn salaris klopt niet": "تنخواہ کی پرچی پر رقم آپ کے حساب سے کم ہے؛ دفتر کو مسئلہ بتائیں۔",
  "ik heb hulp nodig bij deze taak": "آپ کو نئی مشین چلانی ہے مگر طریقہ نہیں آتا؛ ساتھی سے کہیں۔",
  "wie neemt mijn dienst over": "آپ بیمار ہیں اور کل کام پر نہیں آ سکتے؛ نگران سے پوچھیں کہ آپ کی جگہ کون کام کرے گا۔",
  "kunnen we hierover praten": "نگران کا نیا فیصلہ آپ کے لیے مشکل ہے؛ اس موضوع پر گفتگو کی درخواست کریں۔",
  "ik stuur de bevestiging per e-mail": "فون پر نئی شفٹ طے ہو گئی اور نگران تحریری ثبوت چاہتا ہے۔ بتائیں کہ آپ یہ کیسے بھیجیں گے۔",
  // a2-school-absence-notice
  "mijn kind komt vandaag niet naar school": "صبح اسکول کے دفتر کو فون کرتے ہیں۔ پورا جملہ کہیں کہ آج آپ کا بچہ کلاس میں نہیں ہوگا۔",
  "ik meld mijn kind af": "اسکول کا فون نمبر غیر حاضری درج کرنے کے لیے ہے۔ رسمی طور پر کہیں کہ آپ بچے کی غیر حاضری درج کروا رہے ہیں۔",
  "mijn kind is ziek": "استاد پوچھتا ہے کہ بچہ کیوں نہیں آیا۔ آج اسے بخار ہے؛ وجہ ایک چھوٹے جملے میں بتائیں۔",
  "hij had koorts en moest thuisblijven": "بیٹا آج واپس اسکول آیا ہے۔ استاد پوچھتا ہے کہ وہ پچھلے دن کیوں نہیں آیا تھا؛ گزرے دن کی وجہ بتائیں۔",
  "de les begint om tien uur": "اسکول ایپ کہتی ہے کہ آج پہلی کلاس 10:00 پر ہے۔ بچے کو کلاس کا وقت بتائیں۔",
  "de les valt vandaag uit": "ایپ میں لکھا ہے کہ آج استاد بیمار ہے اور کلاس نہیں ہوگی۔ یہ اطلاع پہچانیں۔",
  "moet ik de docent bellen?": "آپ نے دفتر کو اطلاع دے دی، مگر یقین نہیں کہ استاد کو بھی خود فون کرنا ضروری ہے؛ پوچھیں۔",
  "wanneer kan mijn kind weer komen?": "بچے کو ایسی بیماری ہے جو دوسروں کو لگ سکتی ہے۔ اسکول سے پوچھیں کہ وہ کس دن واپس آ سکتا ہے۔",
  // a2-parent-school
  "ik wil graag met de docent praten": "اسکول کے دفتر میں بتائیں کہ آپ بچے کے استاد سے گفتگو کرنا چاہتے ہیں۔",
  "hoe gaat het met mijn kind in de klas?": "والدین کی ملاقات شروع ہوئی ہے۔ استاد سے بچے کی کلاس میں عمومی حالت کے بارے میں پہلا سوال کریں۔",
  "mijn kind heeft moeite met lezen": "گھر پر آپ دیکھتے ہیں کہ بچہ کتاب کے الفاظ بہت مشکل سے پڑھتا ہے؛ استاد کو یہ مسئلہ بتائیں۔",
  "kan mijn kind extra hulp krijgen": "بچہ کلاس میں پیچھے رہ گیا ہے؛ پوچھیں کہ کیا اسکول اسے زیادہ مدد دے سکتا ہے۔",
  "wat kunnen we thuis oefenen": "استاد کہتا ہے کہ بچے کو مزید مشق چاہیے۔ پوچھیں کہ آپ گھر میں بچے کے ساتھ کیا کر سکتے ہیں۔",
  "mijn kind was gisteren afwezig": "استاد پوچھتا ہے کہ بچے نے پچھلے دن کا ٹیسٹ کیوں نہیں دیا۔ وہ اس دن اسکول نہیں آیا تھا؛ بتائیں۔",
  "is een ander tijdstip mogelijk": "استاد ملاقات کے لیے دوپہر دو بجے کہتا ہے مگر اس وقت آپ کام پر ہیں؛ متبادل وقت کا پوچھیں۔",
  "mijn kind voelt zich niet veilig": "بچہ کہتا ہے کہ کھیل کے میدان میں کچھ بچے اسے تنگ کرتے ہیں اور وہ ڈرتا ہے؛ استاد کو بتائیں۔",
  "we maken samen een plan": "ملاقات کے آخر میں آپ اور استاد بچے کی مدد کا طریقہ مل کر طے کرنا چاہتے ہیں؛ اس فیصلے کو ایک جملے میں کہیں۔",
  // a2-perfect-tense
  "gisteren ben ik gevallen": "ڈاکٹر پوچھتا ہے کہ گھٹنے پر چوٹ کیسے لگی۔ پچھلے دن آپ سیڑھیوں پر پھسل گئے تھے؛ بتائیں۔",
  "de pijn begon gisteravond": "ڈاکٹر پوچھتا ہے کہ درد کب شروع ہوا۔ یہ پچھلے دن رات کے کھانے کے بعد شروع ہوا تھا؛ بتائیں۔",
  "ik heb vannacht slecht geslapen": "صبح ڈاکٹر پوچھتا ہے کہ رات کیسی گزری۔ آپ بار بار جاگتے رہے؛ بتائیں۔",
  "ik heb de dokter gebeld": "فارمیسی کا ملازم پوچھتا ہے کہ کیا آپ نے ڈاکٹر سے رابطہ کیا۔ آپ صبح فون کر چکے ہیں؛ بتائیں۔",
  "ik heb al pijnstillers genomen": "ڈاکٹر درد کی گولی دینا چاہتا ہے، مگر آپ گھر سے پہلے ہی گولی کھا کر آئے ہیں؛ بتائیں۔",
  "ik ben thuis gebleven": "نگران پوچھتا ہے کہ آپ پچھلے دن کام پر کیوں نہیں آئے۔ بیماری کی وجہ سے آپ باہر نہیں نکلے؛ بتائیں کہ آپ کہاں تھے۔",
  "de koorts is vanmorgen begonnen": "ڈاکٹر پوچھتا ہے کہ بخار کب سے ہے۔ یہ آج صبح اٹھتے وقت شروع ہوا؛ بتائیں۔",
  "ik heb nog niet gegeten": "ڈاکٹر خون کا ٹیسٹ کرنا چاہتا ہے اور پوچھتا ہے کہ کیا آج آپ نے کچھ کھایا ہے۔ آپ خالی پیٹ ہیں؛ جواب دیں۔",
  // a2-strong-combined
  "ik ben gisteren naar de huisarts gegaan": "نگران پوچھتا ہے کہ آپ پچھلے دن دوپہر کہاں تھے۔ آپ اپنے عام ڈاکٹر کے پاس گئے تھے؛ بتائیں۔",
  "omdat ik pijn had in mijn rug": "جملہ مکمل کریں: “ik ben naar de huisarts gegaan …”۔ وجہ کمر کی تکلیف تھی؛ پورا وجہ والا حصہ چنیں۔",
  "de dokter heeft gezegd": "ساتھی کو ڈاکٹر کی ہدایت بتانی ہے۔ جملہ اس حصے سے شروع کریں جو بتائے کہ بات ڈاکٹر نے کہی ہے۔",
  "dat ik rust moet nemen": "جملہ مکمل کریں: “de dokter heeft gezegd …”۔ ہدایت آرام کی تھی، اور “dat” کے بعد فعل آخر میں جاتا ہے۔",
  "ik moet volgende week terugkomen": "استقبالیہ پوچھتا ہے کہ اگلی ملاقات کب رکھنی ہے۔ ڈاکٹر نے سات دن بعد دوبارہ بلایا ہے؛ بتائیں۔",
  "als de pijn niet weg is": "جملہ مکمل کریں: “ik moet terugkomen …”۔ واپسی صرف اس صورت میں ہے جب تکلیف باقی رہے؛ شرط والا حصہ چنیں۔",
  "ik moet rust nemen": "نگران پوچھتا ہے کہ کیا آپ اگلے دن کام کر سکتے ہیں۔ ڈاکٹر نے آرام لازمی کیا ہے؛ ایک مکمل جملے میں بتائیں۔",
  "omdat ik pijn had": "دوست پوچھتا ہے کہ آپ ڈاکٹر کے پاس کیوں گئے۔ صرف مختصر وجہ دیں؛ جسم کا حصہ نہ بتائیں۔",
  // a2-doctor-advice
  "ik heb sinds drie dagen pijn": "ڈاکٹر پوچھتا ہے کہ تکلیف کتنے عرصے سے ہے۔ یہ پیر سے ہے اور آج جمعرات ہے؛ بتائیں۔",
  "de pijn wordt erger als ik loop": "ڈاکٹر پوچھتا ہے کہ تکلیف کب بڑھتی ہے۔ بیٹھے ہوئے ٹھیک ہیں مگر قدم اٹھاتے ہی بڑھتی ہے؛ بتائیں۔",
  "het medicijn heeft niet geholpen": "پچھلی بار ڈاکٹر نے گولیاں دی تھیں مگر حالت ویسی ہی ہے؛ بتائیں۔",
  "ik ben allergisch voor penicilline": "نسخہ لکھنے سے پہلے ڈاکٹر پوچھتا ہے کہ کیا کسی دوا سے آپ کو مسئلہ ہوتا ہے۔ penicilline سے آپ کو خارش ہوتی ہے؛ بتائیں۔",
  "hoe vaak moet ik dit nemen?": "فارمیسی سے دوا مل گئی مگر لیبل سے سمجھ نہیں آیا کہ دن میں کتنی بار لینی ہے؛ پوچھیں۔",
  "zijn er bijwerkingen": "نئی دوا لینے سے پہلے آپ جاننا چاہتے ہیں کہ کیا اس سے کوئی ناخوشگوار اثر ہو سکتا ہے؛ پوچھیں۔",
  "wanneer moet ik terugkomen": "معائنہ ختم ہو گیا ہے؛ پوچھیں کہ اگلی بار کس دن آنا ہے۔",
  "kunt u dat in eenvoudige woorden uitleggen": "ڈاکٹر مشکل طبی الفاظ استعمال کرتا ہے اور آپ سمجھ نہیں پاتے؛ آسان وضاحت مانگیں۔",
  // a2-health-housing
  "mijn verwarming doet het niet": "سرد صبح گھر کے ریڈی ایٹر ٹھنڈے ہیں۔ مالک مکان کو فون پر صرف مسئلہ بتائیں؛ کب سے، یہ ابھی نہ بتائیں۔",
  "de verwarming is sinds gisteren kapot": "مالک مکان پوچھتا ہے کہ گھر کو گرم کرنے کا نظام کب سے خراب ہے۔ پچھلے دن سے؛ مکمل جملے میں بتائیں۔",
  "ik heb lekkage in mijn huis": "گھر کے فرش پر پانی جمع ہو رہا ہے۔ مرمت دفتر کو پہلے عمومی مسئلہ بتائیں؛ جگہ ابھی نہ بتائیں۔",
  "het water komt uit de keukenmuur": "مرمت دفتر پوچھتا ہے کہ پانی کہاں سے آ رہا ہے۔ یہ کھانا پکانے والے کمرے کی دیوار سے نکل رہا ہے؛ بتائیں۔",
  "kunt u vandaag een monteur sturen?": "مسئلہ فوری ہے؛ مالک مکان سے پوچھیں کہ کیا آج ہی کوئی مرمت والا آ سکتا ہے۔",
  "wanneer komt de monteur?": "مالک مکان کہتا ہے کہ مرمت والا آئے گا مگر وقت نہیں بتاتا؛ پوچھیں۔",
  // a2-word-order-connectors
  "ik bel omdat de verwarming kapot is": "مرمت دفتر فون اٹھاتا ہے۔ ایک جملے میں بتائیں کہ آپ کے فون کرنے کی وجہ گھر کو گرم کرنے والے نظام کی خرابی ہے۔",
  "de kamer is nat omdat er een lekkage is": "مالک مکان پوچھتا ہے کہ کمرے میں نمی کیوں ہے؛ وجہ کے ساتھ پورا جملہ کہیں۔",
  "ik denk dat de leiding kapot is": "آپ کو یقین نہیں، مگر لگتا ہے کہ پانی کا پائپ ٹوٹا ہے؛ اپنی رائے بتائیں۔",
  "als de monteur komt, ben ik thuis": "مالک مکان پوچھتا ہے کہ کیا مرمت والے کے آنے پر کوئی گھر پر ہوگا؛ جواب دیں۔",
  "omdat de muur nat is": "مالک مکان پوچھتا ہے کہ دیوار پر پھپھوندی کیوں ہے۔ صرف مختصر وجہ والا حصہ دیں۔",
  "als het water blijft lopen": "مالک مکان کہتا ہے کہ ہنگامی نمبر پر فون کب کرنا ہے۔ جواب کا شرط والا حصہ چنیں: پانی بند نہ ہو تو۔",
  "ik wil dat de lekkage wordt gerepareerd": "مالک مکان کو ای میل میں صاف لکھنا ہے کہ آپ کا اصل مطالبہ کیا ہے: رسنے والی جگہ ٹھیک ہو۔",
  "de vloer wordt nat als het regent": "مالک مکان پوچھتا ہے کہ مسئلہ کب ہوتا ہے۔ صرف بارش کے دنوں میں فرش پر پانی آتا ہے؛ بتائیں۔",
  // a2-landlord-repairs
  "er is een lekkage in de keuken": "مرمت فارم میں لکھنا ہے کہ مسئلہ کیا اور کہاں ہے: کھانا پکانے والے کمرے میں پانی رس رہا ہے۔",
  "de verwarming werkt al drie dagen niet": "مرمت فارم میں لکھیں کہ گھر کو گرم کرنے کا مسئلہ ہفتے کی صبح سے ہے اور آج منگل ہے۔",
  "het probleem wordt steeds erger": "پہلی اطلاع کو ایک ہفتہ گزر گیا اور حالت ہر دن پہلے سے خراب ہو رہی ہے؛ مالک کو بتائیں۔",
  "wanneer wordt het gerepareerd": "مالک مکان نے مسئلہ مان لیا ہے مگر کوئی تاریخ نہیں دی؛ پوچھیں کہ کام کب ہوگا۔",
  "de monteur is niet gekomen": "مرمت والے کو دس بجے آنا تھا۔ آپ سارا دن گھر پر رہے مگر کوئی نہیں آیا؛ مالک کو بتائیں۔",
  "kunt u dit schriftelijk bevestigen": "مالک مکان فون پر وعدہ کرتا ہے؛ آپ اس وعدے کا ثبوت ای میل یا خط میں چاہتے ہیں۔ درخواست کریں۔",
  "wie betaalt de reparatie": "مرمت مہنگی ہے اور معلوم نہیں کہ خرچ آپ کا ہے یا مالک کا؛ پوچھیں۔",
  // a2-shopping-services
  "ik heb gisteren deze jas gekocht": "دکان کے کاؤنٹر پر بات شروع کریں: بتائیں کہ یہ جیکٹ آپ نے پچھلے دن یہیں سے لی تھی۔",
  "maar hij is kapot": "جملہ مکمل کریں: “ik heb gisteren deze jas gekocht, …”۔ مسئلہ یہ ہے کہ زپ ٹوٹی ہوئی ہے؛ “لیکن” والا حصہ چنیں۔",
  "hij is kapot": "ملازم جیکٹ کی طرف اشارہ کرکے پوچھتا ہے کہ مسئلہ کیا ہے۔ “لیکن” کے بغیر مختصر جواب دیں۔",
  "ik wil hem ruilen": "ملازم پوچھتا ہے کہ آپ پیسے واپس چاہتے ہیں یا دوسری جیکٹ۔ آپ دوسری جیکٹ چاہتے ہیں؛ بتائیں۔",
  "ik heb de bon": "ملازم پوچھتا ہے کہ کیا آپ کے پاس خریداری کی پرچی ہے۔ وہ آپ کے بیگ میں ہے؛ جواب دیں۔",
  // a2-customer-complaints
  "ik heb dit vorige week gekocht": "سروس کا ملازم پوچھتا ہے کہ آپ نے یہ چیز کب خریدی۔ آٹھ دن پہلے؛ بتائیں۔",
  "het product werkt niet goed": "نئی کیتلی آن تو ہوتی ہے مگر پانی ٹھیک سے گرم نہیں کرتی؛ مسئلہ بتائیں۔",
  "valt dit onder de garantie": "چیز چھ مہینے پرانی ہے اور خراب ہو گئی؛ پوچھیں کہ کیا مفت مرمت کا وعدہ اس پر لاگو ہوتا ہے۔",
  "ik wil het liever ruilen": "ملازم پیسے واپس دینے کی پیشکش کرتا ہے، مگر آپ کو وہی چیز نئی حالت میں چاہیے؛ اپنی پسند بتائیں۔",
  "kan ik mijn geld terugkrijgen?": "آپ کو یہ چیز اب بالکل نہیں چاہیے؛ پوچھیں کہ کیا پیسے لوٹائے جا سکتے ہیں۔",
  "een onderdeel ontbreekt": "ڈبہ کھولا تو الماری کا ایک ٹکڑا ڈبے میں نہیں ہے؛ بتائیں۔",
  "wanneer krijg ik een oplossing": "آپ تین بار فون کر چکے ہیں مگر مسئلہ ابھی تک حل نہیں ہوا؛ پوچھیں کہ یہ کب ہوگا۔",
  "ik wil graag met een leidinggevende spreken": "ملازم آپ کی مدد نہیں کر پا رہا؛ اس سے اوپر والے شخص سے بات کرنے کو کہیں۔",
  // a2-bills-banking
  "ik heb deze rekening al betaald": "یاد دہانی کا خط آیا ہے، مگر آپ پچھلے ہفتے یہ بل دے چکے ہیں؛ کمپنی کو بتائیں۔",
  "het bedrag klopt niet": "بل پر 180 یورو لکھا ہے مگر معاہدے کے مطابق 80 ہونا چاہیے؛ بتائیں۔",
  "wanneer moet ik betalen": "بل پر آخری تاریخ نظر نہیں آ رہی؛ پوچھیں۔",
  "kan ik in termijnen betalen": "بل بہت بڑا ہے اور آپ ایک ساتھ پوری رقم نہیں دے سکتے؛ پوچھیں کہ کیا ہر مہینے تھوڑا دیا جا سکتا ہے۔",
  "de automatische betaling is mislukt": "بینک ایپ میں سرخ پیغام ہے کہ اس مہینے رقم خود بخود نہیں کٹی؛ کمپنی کو بتائیں۔",
  "ik ben mijn pinpas kwijt": "آپ بینک کو فون کرتے ہیں کیونکہ آپ کا بینک کارڈ کہیں نہیں مل رہا؛ پہلے مسئلہ بتائیں۔",
  "blokkeer mijn pas alstublieft": "کارڈ گم ہو گیا ہے اور آپ چاہتے ہیں کہ کوئی دوسرا اسے استعمال نہ کر سکے؛ بینک سے فوری قدم کی درخواست کریں۔",
  "ik stuur een bewijs van betaling": "کمپنی کہتی ہے کہ آپ کی رقم نہیں ملی۔ آپ کے پاس بینک کی رسید کی تصویر ہے؛ بتائیں کہ آپ کیا بھیجیں گے۔",
  // a2-writing-messages / a2-formal-digital-messages
  "beste dokter": "ڈاکٹر کو ای میل لکھنی ہے؛ پہلی سطر میں مؤدبانہ مخاطب لکھیں۔",
  "met vriendelijke groet": "ای میل کا متن مکمل ہے؛ اپنے نام سے پہلے آخری مؤدبانہ سطر لکھیں۔",
  "ik wil graag een afspraak maken": "ای میل کا مقصد ڈاکٹر سے ملنے کا وقت لینا ہے؛ اصل درخواست والا جملہ لکھیں۔",
  "mijn zoon kan vandaag niet komen": "آج آپ کے بیٹے کی ملاقات ہے مگر وہ نہیں پہنچ پائے گا؛ دفتر کو یہ اطلاع لکھیں۔",
  "onderwerp: vraag over mijn afspraak": "ای میل کے عنوان والے خانے میں مختصر لکھیں کہ پیغام آپ کی ملاقات کے بارے میں ایک سوال ہے۔",
  "geachte meneer of mevrouw": "سرکاری دفتر کو ای میل لکھ رہے ہیں اور پڑھنے والے کا نام معلوم نہیں؛ رسمی آغاز لکھیں۔",
  "ik schrijf omdat ik een vraag heb": "رسمی آغاز کے بعد پہلا جملہ بتائے کہ آپ کیوں لکھ رہے ہیں: آپ کو کچھ پوچھنا ہے۔",
  "ik kan op die dag niet komen": "دفتر نے ملاقات کی تاریخ بھیجی ہے مگر اس دن آپ مصروف ہیں؛ جواب میں لکھیں۔",
  "ik wil graag een nieuwe datum afspreken": "پہلی تاریخ ممکن نہیں؛ ای میل میں کوئی دوسرا دن طے کرنے کی درخواست لکھیں۔",
  "het formulier staat in de bijlage": "آپ ای میل کے ساتھ فارم کی فائل لگا رہے ہیں؛ متن میں بتائیں کہ فارم کہاں ملے گا۔",
  "ik heb het formulier ingevuld": "دفتر نے فارم بھرنے کو کہا تھا؛ بتائیں کہ یہ کام آپ کر چکے ہیں۔",
  "ik heb nog geen antwoord ontvangen": "دو ہفتے پہلے ای میل بھیجی تھی مگر کوئی جواب نہیں آیا؛ پیروی کی ای میل میں جواب نہ ملنے کا ذکر کریں۔",
  "kunt u mijn bericht bevestigen": "آپ یقین چاہتے ہیں کہ دفتر کو آپ کی ای میل مل گئی ہے؛ تصدیق کی درخواست لکھیں۔"
};

const a2ScenarioLookupV4 = new Map(Object.entries(a2ScenarioByDutchV4)
  .map(([dutch, scenario]) => [normalizedTextV4(dutch), scenario]));

function makeA2AuthoredProfileSpecV4(profile) {
  const lesson = a2Lessons.find((item) => item.id === profile.lessonId);
  const rawSeeds = profile.seedConcepts || lesson?.seedConcepts || [];
  const deduped = [];
  const seen = new Set();
  for (const raw of rawSeeds) {
    const dutch = String(raw.dutch || "").trim();
    const urdu = cleanConceptUrduV4(raw.urdu || "");
    const key = normalizedTextV4(dutch);
    if (!dutch || !urdu || seen.has(key)) continue;
    if (profile.includeDutch && !profile.includeDutch.some((value) => normalizedTextV4(value) === key)) continue;
    if (profile.excludeDutch?.some((value) => normalizedTextV4(value) === key)) continue;
    if (profile.phrasesOnly !== false && dutchWordsV4(dutch).length < 2) continue;
    seen.add(key);
    deduped.push([dutch, urdu]);
  }
  if (deduped.length < 4) {
    for (const raw of rawSeeds) {
      const dutch = String(raw.dutch || "").trim();
      const urdu = cleanConceptUrduV4(raw.urdu || "");
      const key = normalizedTextV4(dutch);
      if (!dutch || !urdu || seen.has(key)) continue;
      if (profile.includeDutch && !profile.includeDutch.some((value) => normalizedTextV4(value) === key)) continue;
      if (profile.excludeDutch?.some((value) => normalizedTextV4(value) === key)) continue;
      seen.add(key);
      deduped.push([dutch, urdu]);
      if (deduped.length >= 4) break;
    }
  }
  const teachingRows = deduped.map(([dutch, urdu], index) => {
    const moment = a2GuidanceMomentsV4[index % a2GuidanceMomentsV4.length];
    const boundary = a2GuidanceBoundariesV4[(index + profile.guidanceOffset) % a2GuidanceBoundariesV4.length];
    const mistake = a2GuidanceMistakesV4[(index * 3 + profile.guidanceOffset) % a2GuidanceMistakesV4.length];
    return [
      dutch,
      `${profile.settingUrdu} ${moment} “${urdu}” والی مکمل بات استعمال کریں۔`,
      `${profile.boundaryLeadUrdu} ${boundary}۔`,
      `${profile.mistakeLeadUrdu} ${mistake}۔`,
      dutch,
      urdu,
      approximateDutchPronunciationUrduV4(dutch)
    ];
  });
  const scenarios = Object.fromEntries(deduped.map(([dutch], index) => [
    normalizedTextV4(dutch),
    [
      `${semanticSlugV4(profile.lessonId)}-${index + 1}`,
      a2ScenarioLookupV4.get(normalizedTextV4(dutch))
        || `${profile.scenarioStarts[index % profile.scenarioStarts.length]} ${profile.scenarioActions[index % profile.scenarioActions.length]}۔`
    ]
  ]));
  const documents = [];
  const chunks = splitTargetsIntoRunsV4("a2", deduped.map(([dutch]) => dutch), false);
  const earlier = [];
  for (const [runIndex, chunk] of chunks.entries()) {
    const available = uniqueV4([...chunk, ...earlier.slice().reverse()]);
    const rows = [];
    let wordCount = 0;
    for (let index = 0; rows.length < 4 || wordCount < 14; index += 1) {
      const value = available[index % available.length];
      if (!value || index > 15) break;
      rows.push({ label: `خانہ ${rows.length + 1}`, value });
      wordCount += dutchWordsV4(value).length;
    }
    documents.push({
      documentKind: `${semanticSlugV4(profile.lessonId)}-record-${runIndex + 1}`,
      title: `عملی دستاویز ${runIndex + 1}`,
      rows
    });
    earlier.push(...chunk);
  }
  return {
    title: profile.title,
    unitLabel: profile.unitLabel,
    outcomeUrdu: profile.outcomeUrdu,
    settingUrdu: profile.settingUrdu,
    seedConcepts: deduped,
    teaching: authoredA1TeachingV4(teachingRows),
    pattern: false,
    prerequisiteLessonIds: profile.prerequisiteLessonIds || [],
    prerequisiteRefs: profile.prerequisiteRefs || [],
    independentCheckLeadUrdu: profile.independentCheckLeadUrdu,
    scenarios,
    documents
  };
}

const a2RemainingLessonProfilesV4 = [
  {
    lessonId: "a2-work-school", title: "Een baan en werkgegevens begrijpen", unitLabel: "A2: کام اور نوکری",
    outcomeUrdu: "نوکری، معاہدہ، تنخواہ، اوقات، اور پہلے کام کے دن کی بنیادی معلومات سمجھنا اور اپنی دستیابی بتانا۔",
    settingUrdu: "نوکری شروع کرنے کی گفتگو میں", boundaryLeadUrdu: "کام کی بنیادی معلومات میں", mistakeLeadUrdu: "ملازمت کی بات کرتے ہوئے",
    scenarioStarts: ["نئی نوکری کے پہلے دن نگران آپ کی معلومات دیکھتا ہے؛", "معاہدہ سامنے رکھ کر ملازم ایک بات پوچھتا ہے؛", "اوقات کی فہرست بدلنے کے بعد دفتر فون کرتا ہے؛", "تنخواہ کی پہلی پرچی ملنے پر ایک خانہ واضح نہیں؛"],
    scenarioActions: ["مطلوبہ کام کی بات منتخب کریں", "اپنی صورت صاف بتائیں", "درست ملازمت والی بات کہیں", "مکمل جواب دیں"],
    guidanceOffset: 1,
    seedConcepts: [
      { dutch: "ik zoek een baan", urdu: "میں نوکری تلاش کر رہا / رہی ہوں" },
      { dutch: "ik begin maandag met mijn baan", urdu: "میں پیر کو اپنی نوکری شروع کرتا / کرتی ہوں" },
      { dutch: "dit is mijn contract", urdu: "یہ میرا معاہدہ ہے" },
      { dutch: "hoeveel uur staat in mijn contract?", urdu: "میرے معاہدے میں کتنے گھنٹے لکھے ہیں؟" },
      { dutch: "wanneer krijg ik mijn salaris?", urdu: "مجھے تنخواہ کب ملے گی؟" },
      { dutch: "dit is mijn rooster", urdu: "یہ میرے اوقات کی فہرست ہے" },
      { dutch: "mijn collega helpt mij", urdu: "میرا ساتھی میری مدد کرتا / کرتی ہے" },
      { dutch: "mijn rooster is veranderd", urdu: "میرے کام کے اوقات بدل گئے ہیں" }
    ],
    prerequisiteRefs: [["a1-work-schedule", "ik werk op vrijdag"]], independentCheckLeadUrdu: "دوسری نوکری کے پہلے دن"
  },
  {
    lessonId: "a2-future-modal-verbs", title: "Werkafspraken, toestemming en plannen", unitLabel: "A2: کام اور نوکری",
    outcomeUrdu: "کام کی آئندہ منصوبہ بندی، امکان، ضرورت، اور اجازت کے مختصر عملی جملے کہنا اور سمجھنا۔",
    settingUrdu: "کام کے آئندہ منصوبے بناتے ہوئے", boundaryLeadUrdu: "اجازت اور ذمہ داری میں", mistakeLeadUrdu: "معاون فعل کے بعد",
    scenarioStarts: ["اگلے ہفتے کا کام طے کرتے وقت نگران سوال کرتا ہے؛", "کام کی جگہ کا اصول سننے کے بعد آپ جواب دیتے ہیں؛", "چھٹی کی درخواست سے پہلے دستیابی دیکھی جاتی ہے؛", "نئی شفٹ کی اجازت لینے کے لیے گفتگو ہوتی ہے؛"],
    scenarioActions: ["اپنا منصوبہ بتائیں", "ضرورت والی بات منتخب کریں", "اجازت مؤدبانہ طور پر پوچھیں", "ممکن کام واضح کریں"],
    guidanceOffset: 3,
    seedConcepts: [
      { dutch: "ik ga maandag beginnen", urdu: "میں پیر کو شروع کرنے والا / والی ہوں" },
      { dutch: "ik kan op dinsdag werken", urdu: "میں منگل کو کام کر سکتا / سکتی ہوں" },
      { dutch: "ik moet veiligheidsschoenen dragen", urdu: "مجھے حفاظتی جوتے پہننے ہیں" },
      { dutch: "mag ik eerder beginnen?", urdu: "کیا میں پہلے شروع کر سکتا / سکتی ہوں؟" },
      { dutch: "ik kan op vrijdag niet werken", urdu: "میں جمعہ کو کام نہیں کر سکتا / سکتی" },
      { dutch: "ik moet de manager bellen", urdu: "مجھے نگران کو فون کرنا ہے" },
      { dutch: "mag ik thuiswerken?", urdu: "کیا میں گھر سے کام کر سکتا / سکتی ہوں؟" },
      { dutch: "wanneer ga ik beginnen?", urdu: "میں کب شروع کرنے والا / والی ہوں؟" }
    ],
    prerequisiteLessonIds: ["a2-work-school"], prerequisiteRefs: [["a1-plans", "ik kom morgen"]], independentCheckLeadUrdu: "اگلی ہفتہ وار کام کی گفتگو میں"
  },
  {
    lessonId: "a2-work-conditions", title: "Rooster, loon en afspraken bespreken", unitLabel: "A2: کام اور نوکری",
    outcomeUrdu: "اوقات، چھٹی، معاہدہ، تنخواہ کی پرچی، بیماری، ڈیوٹی، مدد، اور ای میل تصدیق پر نگران سے بات کرنا۔",
    settingUrdu: "نگران کے ساتھ کام کی شرطیں دیکھتے ہوئے", boundaryLeadUrdu: "کام کے مسئلے اور حل میں", mistakeLeadUrdu: "شرط یا درخواست بیان کرتے وقت",
    scenarioStarts: ["ہفتہ وار اوقات بدل گئے ہیں اور نگران سامنے ہے؛", "تنخواہ کی پرچی میں رقم مختلف دکھائی دیتی ہے؛", "بیماری کی اطلاع کے بعد واپسی کا دن پوچھا جاتا ہے؛", "نیا کام سمجھ نہ آنے پر ساتھی مدد دیتا ہے؛"],
    scenarioActions: ["اصل مسئلہ واضح کریں", "مناسب درخواست کریں", "اپنا اگلا قدم بتائیں", "تحریری تصدیق والی بات منتخب کریں"],
    guidanceOffset: 5, prerequisiteLessonIds: ["a2-work-school", "a2-future-modal-verbs"], prerequisiteRefs: [["a1-work-schedule", "mijn rooster is veranderd"]], independentCheckLeadUrdu: "دوسری کام کی شرطوں والی ملاقات میں"
  },
  {
    lessonId: "a2-school-absence-notice", title: "Ziek melden en een schoolbericht lezen", unitLabel: "A2: والدین اور اسکول",
    outcomeUrdu: "بچے کی بیماری اور غیر حاضری کی اطلاع دینا، استاد سے اگلا قدم پوچھنا، اور سبق کے وقت یا منسوخی کا نوٹس سمجھنا۔",
    settingUrdu: "اسکول کو بچے کے بارے میں اطلاع دیتے ہوئے", boundaryLeadUrdu: "غیر حاضری اور اسکول نوٹس میں", mistakeLeadUrdu: "بچے کی صورت بتاتے وقت",
    scenarioStarts: ["صبح اسکول شروع ہونے سے پہلے دفتر فون اٹھاتا ہے؛", "اسکول ایپ میں آج کے سبق کا نیا نوٹس آتا ہے؛", "استاد بچے کی بیماری کی وجہ پوچھتا ہے؛", "واپسی سے پہلے اسکول اگلا دن معلوم کرنا چاہتا ہے؛"],
    scenarioActions: ["غیر حاضری کی مکمل اطلاع دیں", "نوٹس کی درست بات پہچانیں", "وجہ صاف بتائیں", "اگلا قدم پوچھیں"],
    guidanceOffset: 7, seedConcepts: a2SchoolAbsenceLessonV4.seedConcepts, prerequisiteRefs: [["a1-work-school-messages", "mijn kind komt vandaag niet naar school"]], independentCheckLeadUrdu: "دوسرے اسکول کے بیماری والے پیغام میں"
  },
  {
    lessonId: "a2-parent-school", title: "Voortgang en hulp op school bespreken", unitLabel: "A2: والدین اور اسکول",
    outcomeUrdu: "بچے کی پیش رفت، پڑھنے کی مشکل، گھر کی مشق، رپورٹ، ملاقات کا وقت، اور حفاظت پر استاد کے ساتھ عملی گفتگو کرنا۔",
    settingUrdu: "والدین کی اسکول ملاقات میں", boundaryLeadUrdu: "بچے کی پیش رفت اور مدد میں", mistakeLeadUrdu: "استاد سے سوال کرتے وقت",
    scenarioStarts: ["والدین کی ملاقات میں استاد بچے کا کام دکھاتا ہے؛", "رپورٹ پڑھنے کے بعد ایک حصہ واضح نہیں رہتا؛", "گھر کی مشق طے کرنے کے لیے استاد مشورہ دیتا ہے؛", "بچے کی حفاظت کی تشویش پر ذمہ دار شخص بلایا جاتا ہے؛"],
    scenarioActions: ["پیش رفت والا سوال کریں", "وضاحت کی درخواست کریں", "اضافی مدد مانگیں", "مشترک اگلا قدم طے کریں"],
    guidanceOffset: 9, prerequisiteLessonIds: ["a2-school-absence-notice"], prerequisiteRefs: [["a1-school", "de docent"]], independentCheckLeadUrdu: "اگلی والدین ملاقات میں"
  },
  {
    lessonId: "a2-perfect-tense", title: "Vertellen wat er is gebeurd", unitLabel: "A2: صحت اور ڈاکٹر",
    outcomeUrdu: "ڈاکٹر کو بتانا کہ علامت کب شروع ہوئی، کیا ہوا، اور پہلے کون سا قدم لیا گیا۔",
    settingUrdu: "عام ڈاکٹر کو پچھلی صحت کی صورت بتاتے ہوئے", boundaryLeadUrdu: "پچھلے واقعے اور موجودہ علامت میں", mistakeLeadUrdu: "ماضی کی بات بناتے وقت",
    scenarioStarts: ["ڈاکٹر پوچھتا ہے کہ درد کب شروع ہوا؛", "معائنے سے پہلے پچھلی رات کی صورت بتانی ہے؛", "فون پر معاون پہلے کیے گئے قدم کے بارے میں پوچھتا ہے؛", "فالو اپ میں گزشتہ ملاقات یاد دلانی ہے؛"],
    scenarioActions: ["واقعہ مکمل ترتیب سے بتائیں", "صحیح پچھلی بات منتخب کریں", "وقت اور عمل واضح کریں", "مختصر طبی جواب دیں"],
    guidanceOffset: 11,
    seedConcepts: [
      { dutch: "gisteren ben ik gevallen", urdu: "میں کل گر گیا / گئی تھا" },
      { dutch: "de pijn begon gisteravond", urdu: "درد کل شام شروع ہوا" },
      { dutch: "ik heb vannacht slecht geslapen", urdu: "میں رات کو اچھی طرح نہیں سویا / سوئی" },
      { dutch: "ik heb de dokter gebeld", urdu: "میں نے ڈاکٹر کو فون کیا" },
      { dutch: "ik heb al pijnstillers genomen", urdu: "میں درد کی دوا پہلے ہی لے چکا / چکی ہوں" },
      { dutch: "ik ben thuis gebleven", urdu: "میں گھر رہا / رہی ہوں" },
      { dutch: "de koorts is vanmorgen begonnen", urdu: "بخار آج صبح شروع ہوا" },
      { dutch: "ik heb nog niet gegeten", urdu: "میں نے ابھی کھانا نہیں کھایا" }
    ],
    prerequisiteRefs: [["a1-health", "ik heb pijn"]], independentCheckLeadUrdu: "دوسری ڈاکٹر ملاقات میں"
  },
  {
    lessonId: "a2-strong-combined", title: "Het hele verhaal bij de huisarts", unitLabel: "A2: صحت اور ڈاکٹر",
    outcomeUrdu: "وجہ، ڈاکٹر کی بات، آرام کی ہدایت، شرط، اور واپسی کو ایک مربوط طبی گفتگو میں سمجھنا۔",
    settingUrdu: "عام ڈاکٹر کے فالو اپ میں", boundaryLeadUrdu: "وجہ، ہدایت، اور شرط میں", mistakeLeadUrdu: "طبی کہانی جوڑتے ہوئے",
    scenarioStarts: ["پچھلی ملاقات کا خلاصہ نئے ڈاکٹر کو دینا ہے؛", "معاون ڈاکٹر کی ہدایت دوبارہ پڑھتا ہے؛", "درد باقی رہنے کی شرط پر واپسی طے ہوتی ہے؛", "آرام کے بعد حالت کے بارے میں سوال کیا جاتا ہے؛"],
    scenarioActions: ["وجہ والی بات کہیں", "ہدایت کا درست مطلب چنیں", "شرط مکمل کریں", "واپسی کا قدم بتائیں"],
    guidanceOffset: 13, prerequisiteLessonIds: ["a2-perfect-tense"], prerequisiteRefs: [["a1-health", "de huisarts"]], independentCheckLeadUrdu: "اگلے طبی فالو اپ میں"
  },
  {
    lessonId: "a2-doctor-advice", title: "Klachten, advies en waarschuwingen", unitLabel: "A2: صحت اور ڈاکٹر",
    outcomeUrdu: "علامت، مدت، شدت، دوا، ڈاکٹر کی ہدایت، خطرے کی نشانی، اور دوبارہ رابطے کی شرط سمجھنا اور بتانا۔",
    settingUrdu: "ڈاکٹر کے معائنے اور ہدایت میں", boundaryLeadUrdu: "علامت اور طبی مشورے میں", mistakeLeadUrdu: "صحت کی تفصیل دیتے وقت",
    scenarioStarts: ["ڈاکٹر علامت کی جگہ اور مدت پوچھتا ہے؛", "دوا کے لیبل پر استعمال کی ہدایت لکھی ہے؛", "حالت بگڑنے پر فون کرنے کی شرط بتائی جاتی ہے؛", "معائنے کے آخر میں اگلی ملاقات طے ہوتی ہے؛"],
    scenarioActions: ["علامت مکمل بتائیں", "ہدایت صحیح پہچانیں", "خطرے والی بات سمجھیں", "فالو اپ کا سوال کریں"],
    guidanceOffset: 15, prerequisiteLessonIds: ["a2-perfect-tense", "a2-strong-combined"], prerequisiteRefs: [["a1-pharmacy", "medicijn"]], independentCheckLeadUrdu: "دوسرے طبی مشورے میں"
  },
  {
    lessonId: "a2-health-housing", title: "Een woonprobleem melden", unitLabel: "A2: گھر اور مرمت",
    outcomeUrdu: "ہیٹنگ یا پانی کے رساؤ کا بنیادی مسئلہ، گھر میں مقام، اور مرمت کے لیے کسی کو بھیجنے کی درخواست بتانا۔",
    settingUrdu: "گھر کی خرابی پہلی بار رپورٹ کرتے ہوئے", boundaryLeadUrdu: "خرابی اور مرمت کی درخواست میں", mistakeLeadUrdu: "گھر کا مسئلہ بتاتے ہوئے",
    scenarioStarts: ["سرد صبح ہیٹنگ بند ہے اور مالک مکان فون اٹھاتا ہے؛", "باورچی خانے میں پانی نظر آنے پر مرمت دفتر سے رابطہ ہوتا ہے؛", "آن لائن مرمت فارم میں مسئلے کی جگہ مانگی جاتی ہے؛", "مالک مکان پوچھتا ہے کہ کسی کو کب بھیجا جا سکتا ہے؛"],
    scenarioActions: ["خرابی صاف بتائیں", "گھر کا مقام شامل کریں", "مرمت کی درخواست کریں", "درست مکمل بات منتخب کریں"],
    guidanceOffset: 17,
    seedConcepts: [
      { dutch: "mijn verwarming doet het niet", urdu: "میری ہیٹنگ کام نہیں کر رہی" },
      { dutch: "de verwarming is sinds gisteren kapot", urdu: "ہیٹنگ کل سے خراب ہے" },
      { dutch: "ik heb lekkage in mijn huis", urdu: "میرے گھر میں پانی کا رساؤ ہے" },
      { dutch: "het water komt uit de keukenmuur", urdu: "پانی باورچی خانے کی دیوار سے آ رہا ہے" },
      { dutch: "kunt u vandaag een monteur sturen?", urdu: "کیا آپ آج مرمت کرنے والا بھیج سکتے ہیں؟" },
      { dutch: "wanneer komt de monteur?", urdu: "مرمت کرنے والا کب آئے گا؟" }
    ],
    prerequisiteRefs: [["a1-home", "de verwarming"]], independentCheckLeadUrdu: "دوسرے گھر کی پہلی مرمت رپورٹ میں"
  },
  {
    lessonId: "a2-word-order-connectors", title: "Oorzaak, gevolg en oplossing uitleggen", unitLabel: "A2: گھر اور مرمت",
    outcomeUrdu: "گھر کی خرابی کی وجہ، اثر، شرط، اور مطلوبہ حل کو واضح مربوط جملوں میں بیان کرنا۔",
    settingUrdu: "مالک مکان کو گھر کے مسئلے کی وجہ سمجھاتے ہوئے", boundaryLeadUrdu: "سبب، اثر، اور شرط میں", mistakeLeadUrdu: "جملے کے دو حصے جوڑتے وقت",
    scenarioStarts: ["مرمت دفتر پوچھتا ہے کہ کمرہ کیوں استعمال نہیں ہو رہا؛", "رساؤ بڑھنے کے بعد اس کا اثر بتانا ہے؛", "مزدور آنے کی شرط پر گھر میں موجودگی طے ہوتی ہے؛", "مسئلہ دوبارہ ہونے پر مطلوبہ حل لکھنا ہے؛"],
    scenarioActions: ["سبب والا مکمل جملہ کہیں", "نتیجہ واضح کریں", "شرط صحیح ترتیب سے بتائیں", "حل کی درخواست جوڑیں"],
    guidanceOffset: 19,
    seedConcepts: [
      { dutch: "ik bel omdat de verwarming kapot is", urdu: "میں فون کر رہا / رہی ہوں کیونکہ ہیٹنگ خراب ہے" },
      { dutch: "de kamer is nat omdat er een lekkage is", urdu: "کمرہ گیلا ہے کیونکہ پانی کا رساؤ ہے" },
      { dutch: "ik denk dat de leiding kapot is", urdu: "میرا خیال ہے کہ پائپ خراب ہے" },
      { dutch: "als de monteur komt, ben ik thuis", urdu: "جب مرمت کرنے والا آئے گا تو میں گھر پر ہوں گا / گی" },
      { dutch: "omdat de muur nat is", urdu: "کیونکہ دیوار گیلی ہے" },
      { dutch: "als het water blijft lopen", urdu: "اگر پانی بہتا رہے" },
      { dutch: "ik wil dat de lekkage wordt gerepareerd", urdu: "میں چاہتا / چاہتی ہوں کہ رساؤ کی مرمت ہو" },
      { dutch: "de vloer wordt nat als het regent", urdu: "بارش ہونے پر فرش گیلا ہو جاتا ہے" }
    ],
    prerequisiteLessonIds: ["a2-health-housing"], prerequisiteRefs: [["a1-connectors", "omdat"]], independentCheckLeadUrdu: "دوسری تحریری مرمت وضاحت میں"
  },
  {
    lessonId: "a2-landlord-repairs", title: "Een reparatie schriftelijk volgen", unitLabel: "A2: گھر اور مرمت",
    outcomeUrdu: "تفصیلی مرمت رپورٹ، رسائی کا وقت، تصویر، چھوٹی ہوئی ملاقات، خرچ، اور تحریری پیروی سنبھالنا۔",
    settingUrdu: "مالک مکان اور مرمت کمپنی سے پیروی کرتے ہوئے", boundaryLeadUrdu: "ثبوت، ملاقات، اور ذمہ داری میں", mistakeLeadUrdu: "تحریری مرمت پیغام میں",
    scenarioStarts: ["مرمت فارم میں مسئلے کی تفصیل اور تصویر مانگی گئی ہے؛", "مزدور کی ملاقات چھوٹ گئی اور نیا وقت چاہیے؛", "مرمت کے خرچ کے بارے میں مالک مکان جواب دیتا ہے؛", "پہلی اطلاع کے بعد کوئی تصدیق نہیں آئی؛"],
    scenarioActions: ["رپورٹ کی مکمل بات منتخب کریں", "نیا وقت مانگیں", "خرچ کی ذمہ داری پوچھیں", "تحریری پیروی کریں"],
    guidanceOffset: 2, excludeDutch: ["ik stuur foto's van de schade"], prerequisiteLessonIds: ["a2-health-housing", "a2-word-order-connectors"], prerequisiteRefs: [["a1-home", "mijn huis"]], independentCheckLeadUrdu: "اگلی مرمت پیروی میں"
  },
  {
    lessonId: "a2-shopping-services", title: "Een aankoop terugbrengen", unitLabel: "A2: شکایت اور ضمانت",
    outcomeUrdu: "خراب خریداری، رسید، واپسی، تبدیلی، اور ضمانت کی پہلی دکان گفتگو مکمل کرنا۔",
    settingUrdu: "دکان کے سروس کاؤنٹر پر", boundaryLeadUrdu: "واپسی، تبدیلی، اور ضمانت میں", mistakeLeadUrdu: "خریداری کی شکایت کرتے ہوئے",
    scenarioStarts: ["کل خریدی ہوئی چیز خراب نکلنے پر رسید دکھائی جاتی ہے؛", "سروس ملازم پوچھتا ہے کہ تبدیلی چاہیے یا رقم؛", "ضمانت کی مدت رسید پر دیکھی جاتی ہے؛", "سائز درست نہ ہونے پر دوسرا نمونہ مانگا جاتا ہے؛"],
    scenarioActions: ["خریداری کی صورت بتائیں", "اپنی مطلوبہ کارروائی کہیں", "ضمانت والی بات پہچانیں", "رسید کا ثبوت دیں"],
    guidanceOffset: 4, excludeDutch: ["ik wil hem graag ruilen"], prerequisiteRefs: [["a1-shopping-clothes", "de bon"]], independentCheckLeadUrdu: "دوسرے سروس کاؤنٹر پر"
  },
  {
    lessonId: "a2-customer-complaints", title: "Een klacht laten oplossen", unitLabel: "A2: شکایت اور ضمانت",
    outcomeUrdu: "غلط یا خراب ترسیل، مرمت، تبدیلی، رقم واپسی، شکایت نمبر، مدت، اور اگلے ذمہ دار تک معاملہ لے جانا۔",
    settingUrdu: "کسٹمر سروس کے ساتھ شکایت کی پیروی میں", boundaryLeadUrdu: "شکایت اور پیش کیے گئے حل میں", mistakeLeadUrdu: "معاملہ آگے بڑھاتے وقت",
    scenarioStarts: ["آرڈر کھولنے پر غلط چیز نکلی اور سروس کو فون کیا گیا؛", "مرمت کی مدت ختم ہونے کے بعد کیس نمبر پوچھا جاتا ہے؛", "پیش کیا گیا حل قبول نہ ہونے پر نگران چاہیے؛", "رقم واپسی کی تصدیق ابھی نہیں آئی؛"],
    scenarioActions: ["غلط ترسیل رپورٹ کریں", "کیس کی پیروی کریں", "مناسب حل مانگیں", "اگلے ذمہ دار سے بات کریں"],
    guidanceOffset: 6, prerequisiteLessonIds: ["a2-shopping-services"], prerequisiteRefs: [["a1-shopping-clothes", "ik wil ruilen"]], independentCheckLeadUrdu: "دوسری کسٹمر سروس پیروی میں"
  },
  {
    lessonId: "a2-bills-banking", title: "Rekeningen, betalingen en bankveiligheid", unitLabel: "A2: بل اور بینک",
    outcomeUrdu: "بل کی رقم اور تاریخ پڑھنا، غلط رقم پر سوال، قسط، ناکام خودکار کٹوتی، ادائیگی کا حوالہ، کارڈ حفاظت، اور ثبوت سنبھالنا۔",
    settingUrdu: "بل یا بینک کے عملی مسئلے میں", boundaryLeadUrdu: "رقم، تاریخ، ادائیگی، اور ثبوت میں", mistakeLeadUrdu: "بینک یا بل کی بات کرتے ہوئے",
    scenarioStarts: ["نیا بل پچھلے مہینے سے زیادہ ہے اور تفصیل سامنے ہے؛", "خودکار ادائیگی ناکام ہونے کا بینک پیغام آیا ہے؛", "ادائیگی کرتے وقت درست حوالہ مانگا جاتا ہے؛", "کارڈ گم ہونے کے بعد بینک حفاظت کا قدم بتاتا ہے؛"],
    scenarioActions: ["رقم والی بات واضح کریں", "ناکام ادائیگی سمجھیں", "صحیح حوالہ استعمال کریں", "فوری حفاظتی قدم کہیں"],
    guidanceOffset: 8, prerequisiteRefs: [["a1-shopping", "betalen"]], independentCheckLeadUrdu: "دوسرے بل یا بینک پیغام میں"
  },
  {
    lessonId: "a2-writing-messages", title: "Een korte formele boodschap beginnen", unitLabel: "A2: رسمی پیغام اور ای میل",
    outcomeUrdu: "رسمی مخاطب، مختصر وجہ، واضح درخواست، اور مؤدبانہ اختتام کے ساتھ ایک چھوٹا پیغام بنانا۔",
    settingUrdu: "مختصر رسمی پیغام لکھتے ہوئے", boundaryLeadUrdu: "رسمی آغاز، وجہ، اور اختتام میں", mistakeLeadUrdu: "ادارے کو لکھتے وقت",
    scenarioStarts: ["ڈاکٹر کے دفتر کو نئی ملاقات کے لیے پیغام لکھنا ہے؛", "اسکول کو غیر حاضری کی مختصر وجہ بھیجنی ہے؛", "ادارے کے جواب کے بعد شکریہ اور اختتام لکھنا ہے؛", "غیر رسمی سلام کے بجائے مناسب رسمی آغاز چاہیے؛"],
    scenarioActions: ["مناسب آغاز منتخب کریں", "واضح درخواست لکھیں", "وجہ مختصر رکھیں", "مؤدبانہ اختتام کریں"],
    guidanceOffset: 10,
    excludeDutch: ["ik geef zaterdag een feest", "kom je ook", "hoi ahmed"],
    prerequisiteRefs: [["a1-messages", "ik stuur een bericht"]], independentCheckLeadUrdu: "دوسرے رسمی مختصر پیغام میں"
  },
  {
    lessonId: "a2-formal-digital-messages", title: "Een formele e-mail met bijlage volgen", unitLabel: "A2: رسمی پیغام اور ای میل",
    outcomeUrdu: "موضوع، وجہ، تاریخ، درخواست، منسلک کاغذ، رابطہ راستہ، پیروی، اور رسمی اختتام کے ساتھ ای میل سمجھنا اور بنانا۔",
    settingUrdu: "ادارے کو مکمل رسمی ای میل بھیجتے ہوئے", boundaryLeadUrdu: "موضوع، متن، منسلک کاغذ، اور پیروی میں", mistakeLeadUrdu: "رسمی ای میل مکمل کرتے وقت",
    scenarioStarts: ["سرکاری دفتر کو کاغذ کے ساتھ ای میل بھیجنے سے پہلے مسودہ دیکھا جاتا ہے؛", "موضوع خالی ہے اور وصول کنندہ وجہ فوراً جاننا چاہتا ہے؛", "منسلک کاغذ کا ذکر متن میں موجود نہیں؛", "جواب کی مدت گزرنے کے بعد پیروی کا پیغام چاہیے؛"],
    scenarioActions: ["صحیح موضوع اور وجہ لکھیں", "منسلک کاغذ واضح کریں", "رابطے کی درخواست شامل کریں", "مؤدبانہ پیروی مکمل کریں"],
    guidanceOffset: 12, prerequisiteLessonIds: ["a2-writing-messages"], prerequisiteRefs: [["a1-messages", "dank u voor uw begrip"]], independentCheckLeadUrdu: "دوسری مکمل رسمی ای میل میں"
  }
];

for (const profile of a2RemainingLessonProfilesV4) {
  a2AuthoredCurriculumV4.lessons[profile.lessonId] = makeA2AuthoredProfileSpecV4(profile);
}

Object.assign(a2AuthoredCurriculumV4.units, {
  "a2-work-school": {
    outcomeUrdu: "نوکری شروع کرنا، کام کی اجازت اور ذمہ داری سمجھنا، اور اوقات، تنخواہ، چھٹی، بیماری، اور مدد پر نگران سے بات کرنا۔",
    practiceUrdu: "پہلے نوکری کی بنیادی معلومات، پھر منصوبہ اور اجازت، اور آخر میں معاہدہ، اوقات، تنخواہ، اور کام کی پیروی استعمال کریں۔"
  },
  "a2-school-contact": {
    outcomeUrdu: "بچے کی غیر حاضری اور اسکول نوٹس سمجھنا، پھر پیش رفت، مدد، رپورٹ، ملاقات، اور حفاظت پر استاد سے گفتگو کرنا۔",
    practiceUrdu: "پہلے مختصر بیماری اور وقت کا پیغام، پھر والدین ملاقات اور مشترک اگلا قدم۔"
  },
  "a2-health-doctor": {
    outcomeUrdu: "huisarts کو پچھلا واقعہ، موجودہ علامت، مدت، دوا، ہدایت، خطرے کی نشانی، اور فالو اپ واضح کرنا۔",
    practiceUrdu: "کیا ہوا سے آغاز کریں، مکمل طبی کہانی بنائیں، پھر مشورہ اور واپسی کی شرط سنبھالیں۔"
  },
  "a2-housing-problems": {
    outcomeUrdu: "گھر کی خرابی رپورٹ کرنا، وجہ اور اثر سمجھانا، ثبوت دینا، مرمت کا وقت طے کرنا، اور تحریری پیروی کرنا۔",
    practiceUrdu: "پہلی اطلاع سے شروع کریں، سبب اور شرط جوڑیں، پھر مرمت فارم، تصویر، ملاقات، خرچ، اور پیروی پڑھیں۔"
  },
  "a2-shopping-complaints": {
    outcomeUrdu: "خراب یا غلط خریداری واپس کرنا، ضمانت سمجھنا، حل مانگنا، شکایت نمبر لینا، اور ضرورت پر معاملہ آگے بڑھانا۔",
    practiceUrdu: "پہلی دکان گفتگو کے بعد کسٹمر سروس کی تحریری یا فون پیروی مکمل کریں۔"
  },
  "a2-bills-banking": {
    outcomeUrdu: "بل، رقم، تاریخ، قسط، خودکار کٹوتی، ادائیگی حوالہ، کارڈ حفاظت، اور ادائیگی کے ثبوت پر عملی کارروائی کرنا۔",
    practiceUrdu: "بل پڑھیں، غلطی یا ناکام ادائیگی واضح کریں، پھر محفوظ ادائیگی اور ثبوت سنبھالیں۔"
  },
  "a2-messages-emails": {
    outcomeUrdu: "مختصر اور مکمل رسمی پیغام میں مخاطب، موضوع، وجہ، درخواست، منسلک کاغذ، پیروی، اور اختتام درست رکھنا۔",
    practiceUrdu: "پہلے چھوٹا رسمی پیغام، پھر منسلک کاغذ اور پیروی والی مکمل ای میل۔"
  }
});

const a2EmploymentUnitV4 = a2Subchapters.find((unit) => unit.id === "a2-work-school");
if (a2EmploymentUnitV4) {
  a2EmploymentUnitV4.title = "کام اور نوکری";
  a2EmploymentUnitV4.lessonIds = [
    "a2-work-school",
    "a2-future-modal-verbs",
    "a2-work-conditions",
    "a2-mission-job-start"
  ];
}
if (!a2Subchapters.some((unit) => unit.id === "a2-school-contact")) {
  const employmentIndex = a2Subchapters.findIndex((unit) => unit.id === "a2-work-school");
  a2Subchapters.splice(employmentIndex + 1, 0, {
    id: "a2-school-contact",
    title: "والدین اور اسکول",
    goal: a2AuthoredCurriculumV4.units["a2-school-contact"].outcomeUrdu,
    practice: a2AuthoredCurriculumV4.units["a2-school-contact"].practiceUrdu,
    lessonIds: ["a2-school-absence-notice", "a2-parent-school"]
  });
}
const a2HousingUnitV4 = a2Subchapters.find((unit) => unit.id === "a2-housing-problems");
if (a2HousingUnitV4) {
  a2HousingUnitV4.lessonIds = [
    "a2-health-housing",
    "a2-word-order-connectors",
    "a2-landlord-repairs"
  ];
}
const a2MessagesUnitV4 = a2Subchapters.find((unit) => unit.id === "a2-messages-emails");
if (a2MessagesUnitV4) a2MessagesUnitV4.title = "رسمی پیغام اور ای میل";

function makeA2AuthoredMissionPlanV4({ missionId, sourceKey, lessonIds, titleUrdu, speakerUrdu }) {
  const targets = [];
  const perLesson = Math.max(1, Math.floor(6 / lessonIds.length));
  for (const lessonId of lessonIds) {
    const concepts = a2AuthoredCurriculumV4.lessons[lessonId]?.seedConcepts || [];
    const picked = concepts.filter(([dutch]) => dutchWordsV4(dutch).length > 1).slice(-perLesson);
    for (const [dutch] of picked) targets.push({ lessonId, dutch });
  }
  for (const lessonId of lessonIds) {
    const concepts = a2AuthoredCurriculumV4.lessons[lessonId]?.seedConcepts || [];
    for (const [dutch] of concepts.slice().reverse()) {
      if (targets.length >= 6) break;
      if (!targets.some((target) => target.lessonId === lessonId && normalizedTextV4(target.dutch) === normalizedTextV4(dutch))) {
        targets.push({ lessonId, dutch });
      }
    }
  }
  const selected = targets.slice(0, 6);
  return {
    sourceKey,
    scenarioTitleUrdu: titleUrdu,
    speakerUrdu,
    prerequisiteLessonIds: [...lessonIds],
    variantTitles: ["پہلا عملی موقع", "بدلی ہوئی عملی صورت", "آخری خود مختار صورت"],
    variantContexts: [
      `${titleUrdu} کے پہلے حقیقی موقع میں شروع سے آخر تک مناسب باتیں استعمال کریں`,
      `${titleUrdu} کی دوسری صورت میں نئی تفصیل پڑھیں اور وہی سیکھی ہوئی مہارتیں استعمال کریں`,
      `${titleUrdu} کے آخری موقع میں مدد کے بغیر ضروری معلومات، سوال، اور اگلا قدم مکمل کریں`
    ],
    targets: selected,
    prerequisiteRefs: [],
    useTypes: ["situation", "listen-choice", "situation", "build", "situation", "document-choice"],
    checkTypes: ["meaning", "listen-choice", "reverse", "build", "situation", "document-choice"],
    document: {
      documentKind: `${sourceKey}-record`,
      title: titleUrdu,
      labelUrdu: `${titleUrdu} کی عملی دستاویز پڑھیں`,
      promptUrdu: "ہر قطار میں پہلے سیکھی ہوئی ڈچ بات ہے؛ سوال میں مانگی گئی بات کا درست اردو مطلب منتخب کریں۔",
      instructionUrdu: "دستاویز کی قطاریں الگ پڑھیں اور نشان زدہ سیکھی ہوئی ڈچ بات کا درست اردو مطلب منتخب کریں۔",
      rows: selected.map((target, index) => ({ label: `خانہ ${index + 1}`, value: target.dutch }))
    }
  };
}

const a2MissionPlanProfilesV4 = [
  ["a2-mission-job-start", "employment-capstone", ["a2-work-school", "a2-future-modal-verbs", "a2-work-conditions"], "نئی نوکری، اوقات، اور کام کی شرطیں", "نگران"],
  ["a2-school-contact-mission", "school-contact-capstone", ["a2-school-absence-notice", "a2-parent-school"], "بچے کی غیر حاضری اور والدین ملاقات", "استاد"],
  ["a2-health-doctor-mission", "health-capstone", ["a2-perfect-tense", "a2-strong-combined", "a2-doctor-advice"], "عام ڈاکٹر کی مکمل گفتگو اور فالو اپ", "ڈاکٹر"],
  ["a2-housing-problems-mission", "housing-capstone", ["a2-health-housing", "a2-word-order-connectors", "a2-landlord-repairs"], "گھر کی خرابی، مرمت، اور تحریری پیروی", "مالک مکان"],
  ["a2-shopping-complaints-mission", "complaints-capstone", ["a2-shopping-services", "a2-customer-complaints"], "واپسی، ضمانت، اور شکایت کا حل", "کسٹمر سروس ملازم"],
  ["a2-mission-utilities", "bills-banking-capstone", ["a2-bills-banking"], "بل، ادائیگی، اور بینک حفاظت", "بینک ملازم"],
  ["a2-mission-lost-stolen", "formal-message-capstone", ["a2-writing-messages", "a2-formal-digital-messages"], "رسمی پیغام، منسلک کاغذ، اور پیروی", "ادارے کا ملازم"]
];
for (const [missionId, sourceKey, lessonIds, titleUrdu, speakerUrdu] of a2MissionPlanProfilesV4) {
  a2AuthoredCurriculumV4.missions[missionId] = makeA2AuthoredMissionPlanV4({
    missionId,
    sourceKey,
    lessonIds,
    titleUrdu,
    speakerUrdu
  });
}

const a2EmploymentMissionPlanV4 = a2AuthoredCurriculumV4.missions["a2-mission-job-start"];
if (a2EmploymentMissionPlanV4) {
  a2EmploymentMissionPlanV4.targets[1] = { lessonId: "a2-work-school", dutch: "dit is mijn contract" };
  a2EmploymentMissionPlanV4.document.rows[1].value = "dit is mijn contract";
}
const a2HousingMissionPlanV4 = a2AuthoredCurriculumV4.missions["a2-housing-problems-mission"];
if (a2HousingMissionPlanV4) {
  a2HousingMissionPlanV4.targets[0] = {
    lessonId: "a2-health-housing",
    dutch: "de verwarming is sinds gisteren kapot"
  };
  a2HousingMissionPlanV4.document.rows[0].value = "de verwarming is sinds gisteren kapot";
  a2HousingMissionPlanV4.targets[1] = {
    lessonId: "a2-health-housing",
    dutch: "kunt u vandaag een monteur sturen?"
  };
  a2HousingMissionPlanV4.document.rows[1].value = "kunt u vandaag een monteur sturen?";
}

for (const spec of Object.values(a2AuthoredCurriculumV4.lessons)) {
  const urduByDutch = new Map(
    spec.seedConcepts.map(([dutch, urdu]) => [normalizedTextV4(dutch), urdu])
  );
  spec.scenarios = Object.fromEntries(
    Object.entries(spec.scenarios || {}).map(([dutch, scenario]) => [
      normalizedTextV4(dutch),
      scenario
    ])
  );
  for (const [dutch, record] of Object.entries(spec.teaching || {})) {
    const canonicalUrdu = urduByDutch.get(normalizedTextV4(dutch)) || record.exampleUrdu;
    // A2 target chunks are often complete sentences already. Keep the Dutch
    // example inside the run's owned language, and use the concrete setup from
    // its authored lesson or scenario instead of repeating a topic label or
    // importing untaught Dutch support words.
    const scenario = spec.scenarios[normalizedTextV4(dutch)];
    const scenarioUrdu = Array.isArray(scenario) ? scenario[1] : "";
    const authoredContext = spec.independentCheckLeadUrdu || spec.settingUrdu || scenarioUrdu;
    const contextClause = cleanTerminalPunctuationV4(
      String(authoredContext || "").split(/[؛۔!?؟]/u)[0].trim()
    );
    record.exampleDutch = dutch;
    record.exampleUrdu = contextClause
      ? `“${cleanTerminalPunctuationV4(canonicalUrdu)}” — ${contextClause}۔`
      : `“${cleanTerminalPunctuationV4(canonicalUrdu)}” — روزمرہ عملی موقع میں۔`;
    record.exampleContextSource = contextClause
      ? (spec.independentCheckLeadUrdu
        ? "authored-independent-context"
        : spec.settingUrdu
          ? "authored-setting-context"
          : "authored-scenario-context")
      : "authored-practical-context";
  }
  for (const [documentIndex, document] of (spec.documents || []).entries()) {
    document.title = `عملی دستاویز ${documentIndex + 1}`;
    document.rows = document.rows.map((row, rowIndex) => ({
      label: `خانہ ${rowIndex + 1}`,
      value: row.value
    }));
  }
}

for (const [unitId, spec] of Object.entries(a1AuthoredCurriculumV4.units || {})) {
  const unit = a1Subchapters.find((item) => item.id === unitId);
  if (!unit) continue;
  unit.goal = spec.outcomeUrdu;
  unit.practice = spec.practiceUrdu;
}

for (const [lessonId, spec] of Object.entries(a1AuthoredCurriculumV4.lessons)) {
  const lesson = a1Lessons.find((item) => item.id === lessonId);
  if (!lesson) continue;
  if (spec.title) lesson.title = spec.title;
  if (spec.unitLabel) lesson.unit = spec.unitLabel;
  lesson.description = spec.outcomeUrdu;
  lesson.concepts = [];
  lesson.seedConcepts = spec.seedConcepts.map(([dutch, urdu]) => ({
    dutch,
    urdu,
    visualId: fallbackVisualIdForDutch(dutch) || ""
  }));
}

for (const [unitId, spec] of Object.entries(a2AuthoredCurriculumV4.units || {})) {
  const unit = a2Subchapters.find((item) => item.id === unitId);
  if (!unit) continue;
  unit.goal = spec.outcomeUrdu;
  unit.practice = spec.practiceUrdu;
}

for (const [lessonId, spec] of Object.entries(a2AuthoredCurriculumV4.lessons)) {
  const lesson = a2Lessons.find((item) => item.id === lessonId);
  if (!lesson) continue;
  if (spec.title) lesson.title = spec.title;
  if (spec.unitLabel) lesson.unit = spec.unitLabel;
  lesson.description = spec.outcomeUrdu;
  lesson.concepts = [];
  lesson.seedConcepts = spec.seedConcepts.map(([dutch, urdu]) => ({
    dutch,
    urdu,
    visualId: fallbackVisualIdForDutch(dutch) || ""
  }));
}

const retiredA2GrammarUnitIdsV4 = new Set(["a2-past-plans", "a2-routine-word-order"]);
for (let index = a2Subchapters.length - 1; index >= 0; index -= 1) {
  if (retiredA2GrammarUnitIdsV4.has(a2Subchapters[index].id)) a2Subchapters.splice(index, 1);
}
for (const subchapter of a2Subchapters) {
  subchapter.lessonIds = subchapter.lessonIds.filter((lessonId) => (
    ![
      "a2-perfect-tense",
      "a2-future-modal-verbs",
      "a2-separable-verbs-routine",
      "a2-word-order-connectors"
    ].includes(lessonId)
  ));
}

const a2PracticalGrammarPlacementV4 = [
  ["a2-gemeente-forms", "a2-separable-verbs-routine", 0],
  ["a2-work-school", "a2-future-modal-verbs", 1],
  ["a2-health-doctor", "a2-perfect-tense", 0],
  ["a2-housing-problems", "a2-word-order-connectors", 1]
];
for (const [unitId, lessonId, position] of a2PracticalGrammarPlacementV4) {
  const unit = a2Subchapters.find((subchapter) => subchapter.id === unitId);
  if (unit) unit.lessonIds.splice(position, 0, lessonId);
}

const a2PracticalTitlesV4 = {
  "a2-separable-verbs-routine": {
    title: "Formulieren invullen en taken afronden",
    description: "gemeente اور روزمرہ کام میں invullen، meenemen، opsturen جیسے فعل سمجھنا اور استعمال کرنا۔"
  },
  "a2-future-modal-verbs": {
    title: "Werkafspraken en plannen",
    description: "کام اور اسکول میں منصوبہ، امکان، ضرورت، اور اجازت کے عملی جملے کہنا۔"
  },
  "a2-perfect-tense": {
    title: "Bij de dokter vertellen wat er is gebeurd",
    description: "ڈاکٹر کو بتانا کہ کیا ہوا، علامت کب شروع ہوئی، اور پہلے کیا کیا گیا۔"
  },
  "a2-word-order-connectors": {
    title: "Woonproblemen duidelijk uitleggen",
    description: "گھر کی خرابی، وجہ، شرط، اور مطلوبہ حل کو واضح جملوں میں سمجھانا۔"
  }
};
for (const lesson of a2Lessons) {
  if (a2PracticalTitlesV4[lesson.id]) Object.assign(lesson, a2PracticalTitlesV4[lesson.id]);
}

// Authored A2 records are applied after the compatibility title pass so the
// old grammar-first labels cannot overwrite the accepted practical lesson.
for (const [lessonId, spec] of Object.entries(a2AuthoredCurriculumV4.lessons)) {
  const lesson = a2Lessons.find((item) => item.id === lessonId);
  if (!lesson) continue;
  lesson.title = spec.title;
  lesson.unit = spec.unitLabel;
  lesson.description = spec.outcomeUrdu;
}

const a0CompletionLessonV4 = a0Lessons.find((lesson) => lesson.id === "a0-daily-checkpoint");
const a0CompletionUnitV4 = a0Subchapters.find((unit) => unit.id === "a0-daily-review");
if (a0CompletionLessonV4) {
  Object.assign(a0CompletionLessonV4, {
    title: "A0 praktisch eindpunt",
    description: "A0 کے آخر میں معنی، سننا، پڑھنا، بولنے کی مدد، اور روزمرہ استعمال کی عملی جانچ۔",
    completionCheck: true
  });
}
if (a0CompletionUnitV4) {
  Object.assign(a0CompletionUnitV4, {
    id: "a0-chapter-completion",
    title: "A0 آخری عملی جانچ",
    goal: "A0 کے ضروری معنی، آواز، پڑھنے، بولنے کی مدد، اور حقیقی استعمال کی آخری جانچ۔",
    practice: "صرف پہلے سیکھی ہوئی باتوں سے مکمل روزمرہ کام کریں۔"
  });
}

function unitMissionSeedConceptsV4(subchapter, lessons) {
  const byDutch = new Map();
  for (const lessonId of subchapter.lessonIds) {
    const lesson = lessons.find((item) => item.id === lessonId && item.kind !== "mission");
    if (!lesson) continue;
    for (const raw of [
      ...(lesson.concepts || []),
      ...(lesson.seedConcepts || []),
      ...lessonConcepts(lesson.questions)
    ]) {
      if (!isDutchOnlyText(raw.dutch) || !isUrduText(raw.urdu)) continue;
      const key = normalizedTextV4(raw.dutch);
      if (!byDutch.has(key)) {
        byDutch.set(key, {
          dutch: String(raw.dutch),
          urdu: cleanConceptUrduV4(raw.urdu),
          visualId: raw.visualId || raw.visual || fallbackVisualIdForDutch(raw.dutch) || ""
        });
      }
    }
  }
  return [...byDutch.values()];
}

function repeatMissionSeedsV4(items, count) {
  if (!items.length) return [];
  return Array.from({ length: count }, (_, index) => items[index % items.length]);
}

function addMissingUnitMissionsV4(chapterId, lessons, subchapters) {
  for (const subchapter of subchapters) {
    const existingMission = subchapter.lessonIds.some((lessonId) => (
      lessons.find((lesson) => lesson.id === lessonId)?.kind === "mission"
    ));
    if (existingMission) continue;
    const seeds = unitMissionSeedConceptsV4(subchapter, lessons);
    if (!seeds.length) continue;
    const phrases = seeds.filter((seed) => dutchWordsV4(seed.dutch).length > 1);
    const missionPhrases = repeatMissionSeedsV4(phrases.length >= 3 ? phrases : seeds, 12);
    const missionConcepts = repeatMissionSeedsV4(
      seeds.filter((seed) => seed.visualId).length >= 3
        ? seeds.filter((seed) => seed.visualId)
        : seeds,
      6
    );
    const missionId = `${subchapter.id}-mission`;
    const generatedMission = makeMissionLesson(missionSpec({
      level: chapterId,
      id: missionId,
      unit: `${chapterId.toUpperCase()}: عملی مشن`,
      title: `${subchapter.title}: عملی مشن`,
      description: `${subchapter.goal} اس مشن میں صرف پہلے سیکھی ہوئی باتیں استعمال ہوں گی۔`,
      concepts: missionConcepts.map((seed, index) => [
        `${semanticSlugV4(subchapter.id)}-${index + 1}`,
        seed.dutch,
        seed.urdu,
        seed.visualId
      ]),
      phrases: missionPhrases.map((seed) => [seed.dutch, seed.urdu]),
      cues: missionPhrases.slice(0, 3).map((seed) => seed.dutch),
      variants: ["پہلا عملی موقع", "دوسرا عملی موقع", "آخری عملی موقع"],
      documents: ["عملی معلومات", "روزمرہ پیغام", "کام کی تصدیق"]
    }));
    generatedMission.generatedCapstone = true;
    const lastLessonId = subchapter.lessonIds[subchapter.lessonIds.length - 1];
    insertLessonAfter(lessons, lastLessonId, generatedMission);
    subchapter.lessonIds.push(missionId);
  }
}

addMissingUnitMissionsV4("a0", a0Lessons, a0Subchapters);
addMissingUnitMissionsV4("a1", a1Lessons, a1Subchapters);
addMissingUnitMissionsV4("a2", a2Lessons, a2Subchapters);

for (const subchapter of [...a0Subchapters, ...a1Subchapters, ...a2Subchapters]) {
  const missionIds = uniqueV4(subchapter.lessonIds.filter((lessonId) => (
    [...a0Lessons, ...a1Lessons, ...a2Lessons]
      .find((lesson) => lesson.id === lessonId)?.kind === "mission"
  )));
  const normalIds = uniqueV4(
    subchapter.lessonIds.filter((lessonId) => !missionIds.includes(lessonId))
  );
  // A unit always builds through its normal lessons and finishes at its
  // practical capstone, even when a legacy mission used to sit mid-unit.
  subchapter.lessonIds = [...normalIds, ...missionIds];
}

function reorderLessonsFromUnitsV4(lessons, subchapters) {
  const order = subchapters.flatMap((subchapter) => subchapter.lessonIds);
  const indexById = new Map(order.map((id, index) => [id, index]));
  lessons.sort((left, right) => (
    (indexById.get(left.id) ?? Number.MAX_SAFE_INTEGER)
    - (indexById.get(right.id) ?? Number.MAX_SAFE_INTEGER)
  ));
}

reorderLessonsFromUnitsV4(a0Lessons, a0Subchapters);
reorderLessonsFromUnitsV4(a1Lessons, a1Subchapters);
reorderLessonsFromUnitsV4(a2Lessons, a2Subchapters);

const chaptersV4 = [
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

const conceptByIdV4 = new Map();
const skillByIdV4 = new Map();
const skillIdByConceptIdV4 = new Map();
const lessonConceptIdsV4 = new Map();
const authoredConceptIdsV4 = new Map();
const patternsV4 = [];
const unitsV4 = [];
const reviewsV4 = [];

function unitForLessonV4(chapter, lessonId) {
  return chapter.subchapters.find((subchapter) => subchapter.lessonIds.includes(lessonId)) || null;
}

function conceptSenseV4(dutch, urdu, lessonId, raw = {}) {
  if (raw.senseId) return semanticSlugV4(raw.senseId, "sense");
  const target = normalizedTextV4(dutch);
  const meaning = String(urdu || "");
  if (target === "dat") {
    return /کہ/u.test(meaning) || /^a2-/.test(lessonId)
      ? "conjunction"
      : "demonstrative";
  }
  if (target === "werk") {
    return /کرتا|کرتی|کرتے|ہوں/u.test(meaning) || lessonId === "a1-present-time"
      ? "verb-first-person"
      : "noun";
  }
  if (target === "hoesten") {
    return /کرنا/u.test(meaning) ? "verb" : "symptom";
  }
  return "";
}

function conceptIdV4(dutch, urdu, lessonId = "", raw = {}) {
  const slug = semanticSlugV4(dutch, "target");
  const senseId = conceptSenseV4(dutch, urdu, lessonId, raw);
  return `concept:${slug}${senseId ? `:${senseId}` : ""}`;
}

function inferExampleV4(lesson, dutch, urdu) {
  const sentenceQuestion = lesson.questions.find((question) => {
    const candidate = String(question.speak || question.answer || "");
    return isDutchOnlyText(candidate)
      && dutchWordsV4(candidate).length > 1
      && normalizedTextV4(candidate).includes(normalizedTextV4(dutch));
  });
  if (sentenceQuestion) {
    const exampleUrdu = isUrduText(sentenceQuestion.answer)
      ? String(sentenceQuestion.answer)
      : (isUrduText(sentenceQuestion.prompt)
        ? cleanConceptUrduV4(sentenceQuestion.prompt)
        : "");
    if (exampleUrdu && !/^(?:آواز سنیں|بات سنیں|تصویر دیکھیں|جملہ مکمل|صحیح جواب)/u.test(exampleUrdu)) {
      return {
        dutch: String(sentenceQuestion.speak || sentenceQuestion.answer),
        urdu: exampleUrdu
      };
    }
  }

  const exactQuestion = lesson.questions.find((question) => (
    (normalizedTextV4(question.prompt) === normalizedTextV4(dutch)
      && normalizedTextV4(question.answer) === normalizedTextV4(urdu))
    || (normalizedTextV4(question.answer) === normalizedTextV4(dutch)
      && normalizedTextV4(question.prompt) === normalizedTextV4(urdu))
  ));
  if (exactQuestion) return { dutch: String(dutch), urdu: String(urdu) };
  return { dutch: String(dutch), urdu: String(urdu) };
}

function isExerciseInstructionLikeUrduV4(value) {
  const text = String(value || "").trim();
  return !text
    || /(?:صحیح\s+Nederlands|صحیح\s+(?:لفظ|جواب|مطلب)|منتخب\s+کریں|چنیں|خالی\s+جگہ|یہ\s+بنائیں|ترتیب\s+میں\s+رکھیں|آواز\s+سنیں|بات\s+سنیں|تصویر\s+دیکھیں|دستاویز\s+میں)/u.test(text);
}

function specificUsageV4(lesson, dutch, role, urdu = "") {
  const targetDutchWords = new Set(meaningfulDutchWordsV4(dutch));
  const targetUrduWords = new Set(meaningfulUrduWordsV4(urdu));
  const situation = lesson.questions
    .filter((question) => (
      question.type === "situation"
      && isUrduText(question.prompt)
      && !isExerciseInstructionLikeUrduV4(question.prompt)
    ))
    .map((question) => {
      const exact = normalizedTextV4(question.answer) === normalizedTextV4(dutch) ? 20 : 0;
      const dutchOverlap = meaningfulDutchWordsV4(question.answer)
        .filter((word) => targetDutchWords.has(word)).length * 3;
      const urduOverlap = meaningfulUrduWordsV4(question.prompt)
        .filter((word) => targetUrduWords.has(word)).length;
      return { question, score: exact + dutchOverlap + urduOverlap };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)[0]?.question;
  if (situation) {
    const context = String(situation.prompt)
      .replace(/^(?:حال|صورت)\s*:\s*/u, "")
      .replace(/[۔؟?!]+$/u, "")
      .trim();
    return `${context} تو “${dutch}” ${role === "phrase" ? "مکمل فقرے کے طور پر کہیں" : "استعمال کریں"}۔`;
  }

  const purpose = [lesson.description, lesson.outcomeUrdu]
    .map((value) => String(value || "").trim())
    .find((value) => isUrduText(value));
  if (purpose) {
    const cleanPurpose = purpose.replace(/[۔؟?!]+$/u, "");
    if (looksLikeDutchQuestionV4(dutch)) {
      return `${cleanPurpose} اس موقع پر “${dutch}” سے متعلقہ سوال کریں۔`;
    }
    if (/^[a-z]$/i.test(dutch)) {
      return `${cleanPurpose} حرف “${dutch}” کو مثال والے لفظ میں دیکھیں اور اس کی آواز پر توجہ دیں۔`;
    }
    return role === "phrase"
      ? `${cleanPurpose} اس گفتگو میں پوری بات “${dutch}” کہیں۔`
      : `${cleanPurpose} اس موضوع میں Nederlands لفظ “${dutch}” استعمال ہوتا ہے۔`;
  }
  return `روزمرہ گفتگو میں “${dutch}” کو اس کے معنی “${cleanConceptUrduV4(
    lesson.questions.find((question) => normalizedTextV4(question.prompt) === normalizedTextV4(dutch))?.answer
      || ""
  )}” کے ساتھ استعمال کریں۔`;
}

function cleanTerminalPunctuationV4(value) {
  return String(value || "")
    .trim()
    .replace(/[۔؟?!.,،؛;:]+$/u, "")
    .trim();
}

function inferCommonConfusionV4(lesson, dutch, urdu, role) {
  const normalizedDutch = normalizedTextV4(dutch);
  const words = dutchWordsV4(dutch);
  const authoredPoint = lesson.questions
    .filter((question) => question.type === "uitleg")
    .flatMap((question) => question.points || [])
    .find((point) => containsWholeDutchTargetV4(point, dutch));
  if (authoredPoint) return `${cleanTerminalPunctuationV4(authoredPoint)}۔`;

  const fixedBoundaries = {
    goedemorgen: "goedemorgen صرف صبح کے سلام کے لیے ہے؛ دوپہر میں goedemiddag اور شام میں goedenavond کہیں۔",
    goedemiddag: "goedemiddag دوپہر کے وقت آتا ہے؛ صبح کے لیے goedemorgen استعمال کریں۔",
    goedenavond: "goedenavond شام کے سلام کے لیے ہے؛ رخصت ہوتے وقت tot ziens الگ فقرہ ہے۔",
    dit: "dit قریب کی چیز کے لیے ہے؛ دور کی چیز کی طرف اشارہ کرتے وقت dat آتا ہے۔",
    dat: "dat دور کی چیز کے لیے ہے؛ قریب کی چیز کے لیے dit کہیں۔",
    hier: "hier جگہ یہاں بتاتا ہے؛ daar کا مطلب وہاں ہے۔",
    daar: "daar جگہ وہاں بتاتا ہے؛ hier کا مطلب یہاں ہے۔",
    wie: "wie سے شخص پوچھتے ہیں؛ چیز کے لیے wat اور جگہ کے لیے waar آتا ہے۔",
    wat: "wat سے چیز یا بات پوچھتے ہیں؛ شخص کے لیے wie استعمال کریں۔",
    waar: "waar جگہ پوچھتا ہے؛ طریقہ پوچھنے کے لیے hoe آتا ہے۔",
    wanneer: "wanneer وقت پوچھتا ہے؛ جگہ کے سوال میں waar استعمال ہوتا ہے۔",
    hoe: "hoe طریقہ یا حالت پوچھتا ہے؛ چیز پوچھنے کے لیے wat آتا ہے۔",
    waarom: "waarom وجہ پوچھتا ہے؛ اسے جگہ پوچھنے والے waar سے الگ رکھیں۔",
    ik: "ik اپنے لیے میں ہے؛ سامنے والے کے لیے jij یا رسمی u آتا ہے۔",
    jij: "jij غیر رسمی تم ہے؛ رسمی بات میں u کہیں۔",
    je: "je غیر رسمی مختصر تم یا تمہارا ہو سکتا ہے؛ رسمی موقع میں u یا uw چنیں۔",
    u: "u رسمی آپ ہے؛ دوست یا قریبی شخص کے لیے jij استعمال ہوتا ہے۔",
    hij: "hij مرد یا مذکر شخص کے لیے وہ ہے؛ zij عورت یا جمع کے لیے بھی آ سکتا ہے۔",
    zij: "zij عورت کے لیے وہ یا کئی لوگوں کے لیے وہ سب ہو سکتا ہے؛ جملہ معنی واضح کرتا ہے۔",
    wij: "wij کا مطلب ہم ہے؛ jullie کا مطلب تم سب ہے۔",
    jullie: "jullie ایک سے زیادہ سامنے والے لوگوں کے لیے ہے؛ wij بولنے والے گروہ کے لیے ہے۔",
    mijn: "mijn اپنی چیز کے لیے میرا یا میری ہے؛ سامنے والے کی چیز کے لیے jouw یا uw آتا ہے۔",
    jouw: "jouw غیر رسمی تمہارا ہے؛ رسمی ملکیت کے لیے uw استعمال کریں۔",
    uw: "uw رسمی آپ کا ہے؛ اسے فاعل u کے بجائے چیز کی ملکیت کے ساتھ رکھیں۔",
    een: "een غیر معین ایک چیز کے لیے ہے؛ معلوم چیز کے ساتھ de یا het آتا ہے۔",
    de: "de اور het دونوں انگریزی the جیسے ہیں، مگر ہر اسم کا اپنا مقرر article یاد کرنا پڑتا ہے۔",
    het: "het کو صرف انہی اسموں کے ساتھ لگائیں جن کا article het ہے؛ اندازے سے de نہ بدلیں۔",
    niet: "niet فعل، صفت، یا پوری بات کی نفی کرتا ہے؛ غیر معین اسم کی نفی میں اکثر geen آتا ہے۔",
    geen: "geen غیر معین اسم یا مقدار کی نفی کرتا ہے؛ فعل یا صفت کی نفی کے لیے niet استعمال کریں۔",
    ja: "ja ہاں ہے اور بات مانتا ہے؛ انکار کے لیے nee کہیں۔",
    nee: "nee صاف انکار ہے؛ صرف بات کی نفی کرنی ہو تو جملے میں niet یا geen آ سکتا ہے۔"
  };
  if (fixedBoundaries[normalizedDutch]) return fixedBoundaries[normalizedDutch];

  if (/^[a-z]$/i.test(dutch)) {
    return `یہ حرف “${dutch}” ہے، پورا لفظ نہیں؛ اسے مثال والے لفظ میں دیکھ کر اس کی آواز پہچانیں۔`;
  }
  if (/^\d+(?:[.,]\d+)?$/.test(dutch)) {
    return `عدد “${dutch}” پڑھتے وقت ہندسوں کی جگہ نہ بدلیں؛ پہلے پوری مقدار دیکھیں، پھر “${urdu}” کہیں۔`;
  }
  if (/^(de|het|een)\s+/i.test(dutch)) {
    const article = words[0];
    const noun = words.slice(1).join(" ");
    return `“${noun}” کے ساتھ article “${article}” بھی یاد کریں؛ صرف اسم یاد کر کے article اندازے سے نہ لگائیں۔`;
  }
  if (words.includes("niet")) {
    return `اس جملے میں نفی “niet” سے بنتی ہے؛ اسے “${dutch}” میں دکھائی گئی جگہ پر رکھیں، اردو ترتیب پر نہ منتقل کریں۔`;
  }
  if (words.includes("geen")) {
    return `“geen” یہاں اسم یا مقدار کو صفر کرتا ہے؛ “${dutch}” میں اسے “niet” سے نہ بدلیں۔`;
  }
  if (words.includes("u") || words.includes("uw") || words.includes("kunt")) {
    return `“${dutch}” رسمی انداز ہے؛ دوستوں والا jij یا jouw اسی جملے میں ملا دینا عام غلطی ہے۔`;
  }
  if (words.includes("jij") || words.includes("jouw") || words.includes("je")) {
    return `“${dutch}” غیر رسمی انداز ہے؛ gemeente، ڈاکٹر، یا اجنبی سے بات میں رسمی u یا uw درکار ہو سکتا ہے۔`;
  }
  if (words.some((word) => ["mijn", "jouw", "uw", "zijn", "haar", "onze"].includes(word))) {
    const ownerWord = words.find((word) => ["mijn", "jouw", "uw", "zijn", "haar", "onze"].includes(word));
    return `ملکیت والا “${ownerWord}” اسم سے پہلے رہتا ہے؛ “${dutch}” میں چیز کے مالک کے مطابق mijn، jouw، uw، zijn، یا haar چنیں۔`;
  }
  if (words[0] === "hij" && words.includes("is")) {
    return `فاعل hij کے ساتھ فعل is آتا ہے؛ “${dutch}” میں ben یا zijn نہ لگائیں۔`;
  }
  if (words[0] === "wij" && words.includes("zijn")) {
    return `فاعل wij جمع ہے، اس لیے “${dutch}” میں zijn درست ہے؛ is واحد کے ساتھ آتا ہے۔`;
  }
  if (words[0] === "wij" && words.length > 1) {
    return `فاعل wij کے بعد جمع والی فعل کی شکل “${words[1]}” آتی ہے؛ jij یا hij والی -t شکل یہاں نہ لگائیں۔`;
  }
  if (words[0] === "zeg") {
    return `درخواست یا ہدایت میں “zeg” حکم والی مختصر شکل ہے؛ یہاں infinitive zeggen استعمال نہ کریں۔`;
  }
  if (words[0] === "ik" && words.includes("moet") && words.length > 2) {
    return `modal moet کے بعد اصل کام “${words[words.length - 1]}” جملے کے آخر میں رہتا ہے؛ دونوں فعل ساتھ شروع میں نہ رکھیں۔`;
  }
  if (words[0] === "omdat" && words.length > 2) {
    return `omdat وجہ والا تابع جملہ شروع کرتا ہے، اس لیے بدلنے والا فعل “${words[words.length - 1]}” آخر میں آتا ہے۔`;
  }
  if (["morgen", "vandaag", "gisteren", "daarna", "eerst"].includes(words[0]) && words.length > 2) {
    return `وقت “${words[0]}” پہلے آئے تو بدلنے والا فعل “${words[1]}” فاعل سے پہلے رہتا ہے؛ “${words[0]} ik ${words[1]}” نہ کہیں۔`;
  }
  if (words[0] === "ik" && words[1] === "heb") {
    return `فاعل ik کے ساتھ hebben کی شکل heb ہے؛ hij یا zij والی heeft شکل یہاں درست نہیں۔`;
  }
  const placeWordNotes = {
    op: "op سطح کے اوپر ہونے کو بتاتا ہے",
    onder: "onder کسی چیز کے نیچے ہونے کو بتاتا ہے",
    achter: "achter کسی چیز کے پیچھے جگہ بتاتا ہے",
    voor: "voor کسی چیز کے سامنے جگہ بتاتا ہے",
    naast: "naast برابر یا ساتھ والی جگہ بتاتا ہے",
    tussen: "tussen دو چیزوں کے درمیان جگہ بتاتا ہے",
    bij: "bij قریب یا کسی کے پاس ہونے کو بتاتا ہے"
  };
  if (placeWordNotes[words[0]]) {
    return `${placeWordNotes[words[0]]}؛ “${dutch}” میں جگہ والا لفظ اسم سے پہلے رکھیں۔`;
  }
  if (/plural/i.test(lesson.id) && role === "word") {
    return `“${dutch}” کی واحد اور جمع شکل ایک جیسی فرض نہ کریں؛ تعداد دیکھ کر اسی سبق کی جمع والی شکل استعمال کریں۔`;
  }
  if (/[?]$/.test(String(dutch).trim()) || /^(wie|wat|waar|wanneer|hoe|waarom|welke)\b/i.test(dutch)) {
    return `یہ سوال “${words[0]}” سے شروع ہوتا ہے؛ جواب والے جملے کی ترتیب لگا کر سوال کا آغاز نہ ہٹائیں۔`;
  }

  const situation = lesson.questions.find((question) => (
    question.type === "situation"
    && isUrduText(question.prompt)
    && !isExerciseInstructionLikeUrduV4(question.prompt)
    && normalizedTextV4(question.answer) === normalizedDutch
  ));
  const usefulExplanation = situation && isUrduText(situation.explain)
    && !isExerciseInstructionLikeUrduV4(situation.explain)
    ? cleanTerminalPunctuationV4(situation.explain)
    : "";
  if (situation) {
    const context = cleanTerminalPunctuationV4(
      String(situation.prompt).replace(/^(?:حال|صورت)\s*:\s*/u, "")
    );
    return usefulExplanation
      ? `${context}: ${usefulExplanation}۔`
      : `${context} میں “${dutch}” استعمال کریں؛ “${urdu}” کے دوسرے موقع میں جملے کی ساخت دوبارہ دیکھیں۔`;
  }

  const formQuestion = lesson.questions.find((question) => (
    ["fill-gap", "build", "sequence"].includes(question.type)
    && (
      normalizedTextV4(question.answer) === normalizedDutch
      || normalizedTextV4(question.speak) === normalizedDutch
      || containsWholeDutchTargetV4(question.speak, dutch)
    )
    && isUrduText(question.explain)
    && !isExerciseInstructionLikeUrduV4(question.explain)
  ));
  if (formQuestion) {
    return `${cleanTerminalPunctuationV4(formQuestion.explain)}؛ مثال میں لفظوں کی یہی جگہ دوبارہ دیکھیں۔`;
  }

  const explanationQuestions = lesson.questions
    .filter((question) => question.type === "uitleg");
  const guidanceCandidates = explanationQuestions
    .flatMap((question) => [
      question.prompt,
      ...(question.points || [])
    ])
    .filter((text) => isUrduText(text) && !isExerciseInstructionLikeUrduV4(text))
    .map((text) => ({
      text,
      score: meaningfulDutchWordsV4(text)
        .filter((word) => meaningfulDutchWordsV4(dutch).includes(word)).length * 3
        + meaningfulUrduWordsV4(text)
          .filter((word) => meaningfulUrduWordsV4(urdu).includes(word)).length
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);
  const lessonGuidance = guidanceCandidates[0]?.text;
  if (lessonGuidance) {
    return `${cleanTerminalPunctuationV4(lessonGuidance)}۔`;
  }

  if (role === "phrase") {
    const first = words[0] || dutch;
    const last = words[words.length - 1] || dutch;
    return `“${dutch}” میں “${first}” آغاز اور “${last}” آخر میں ہے؛ اردو کی ترتیب لگا کر ان دونوں کو الٹنا درست نہیں۔`;
  }
  return `${specificUsageV4(lesson, dutch, role, urdu)} عام غلطی یہ ہے کہ اس لفظ کو موقع دیکھے بغیر ہر “${urdu}” کے لیے استعمال کر دیا جائے۔`;
}

const approvedInstructionalVisualIdsV4 = new Set([
  "appel", "boek", "deur", "fiets", "huis", "lamp", "kat", "oog", "pen",
  "rijst", "stoel", "tafel", "water", "man", "vrouw", "kind", "jongen",
  "meisje", "familie", "vader", "moeder", "broer", "zus", "telefoon",
  "naam", "adres", "paspoort", "afspraak", "dokter", "huisarts", "tandarts",
  "apotheek", "ziekenhuis", "medicijn", "pijn", "hoofdpijn", "buikpijn",
  "hoesten", "koorts", "ziek", "badkamer", "keuken", "kamer", "verwarming",
  "lekkage", "reparatie", "formulier", "gemeente", "document", "contract",
  "baan", "werk", "school", "huiswerk", "rooster", "supermarkt", "winkel",
  "kassa", "bon", "prijs", "pinpas", "contant", "brood", "kaas", "fruit",
  "groente", "tas", "jas", "station", "halte", "bus", "trein", "kaartje",
  "stad", "land", "bericht"
]);

function approvedConceptVisualIdV4(dutch, requestedVisualId = "") {
  const fallbackVisualId = fallbackVisualIdForDutch(dutch);
  const candidate = approvedInstructionalVisualIdsV4.has(requestedVisualId)
    ? requestedVisualId
    : approvedInstructionalVisualIdsV4.has(fallbackVisualId)
      ? fallbackVisualId
      : "";
  if (!candidate) return null;
  const targetWords = new Set(dutchWordsV4(dutch));
  return targetWords.has(normalizedTextV4(candidate.replace(/[-_]+/g, " ")))
    ? candidate
    : null;
}

function registerConceptV4({ lesson, chapterId, raw, missionOnly = false }) {
  const dutch = String(raw.dutch || "").trim();
  const urdu = cleanConceptUrduV4(raw.urdu);
  if (!isDutchOnlyText(dutch) || !isUrduText(urdu)) return null;

  const senseId = conceptSenseV4(dutch, urdu, lesson.id, raw);
  const id = conceptIdV4(dutch, urdu, lesson.id, raw);
  const legacyConceptId = `concept:${semanticSlugV4(dutch, "target")}:${stableHashV4(normalizedTextV4(dutch))}`;
  const example = inferExampleV4(lesson, dutch, urdu);
  const requestedVisualId = raw.visualId || raw.visual || "";
  const unsupportedGenericVisualIds = new Set(["persoon", "oor", "afval"]);
  const visualId = unsupportedGenericVisualIds.has(requestedVisualId)
    ? approvedConceptVisualIdV4(dutch)
    : approvedConceptVisualIdV4(dutch, requestedVisualId);
  const role = raw.role
    || (/^[a-z]$/i.test(dutch) ? "sound" : "")
    || (String(dutch).trim().split(/\s+/).filter(Boolean).length > 1 ? "phrase" : "word");
  const usageUrdu = (
    [raw.usageUrdu, raw.context].find((value) => (
      isUrduText(value) && !isExerciseInstructionLikeUrduV4(value)
    ))
    || specificUsageV4(lesson, dutch, role, urdu)
  );
  let concept = conceptByIdV4.get(id);

  if (!concept) {
    concept = {
      id,
      semanticKey: `${semanticSlugV4(dutch, "target")}${senseId ? `:${senseId}` : ""}`,
      senseId: senseId || "primary",
      legacyConceptIds: senseId && !["demonstrative", "noun", "verb"].includes(senseId)
        ? []
        : [legacyConceptId],
      dutch,
      urdu,
      translationAliasesUrdu: [urdu],
      pronunciationUrdu: raw.pronunciationUrdu
        || approximateDutchPronunciationUrduV4(dutch),
      audioText: raw.audioText || raw.audio || dutch,
      visualId,
      visual: visualId
        ? { kind: "asset", visualId }
        : { kind: "context", descriptionUrdu: usageUrdu },
      usageUrdu,
      exampleDutch: raw.exampleDutch || example.dutch,
      exampleUrdu: raw.exampleUrdu || example.urdu,
      examples: [{
        dutch: raw.exampleDutch || example.dutch,
        urdu: raw.exampleUrdu || example.urdu
      }],
      commonConfusionUrdu: raw.commonConfusionUrdu
        || inferCommonConfusionV4(lesson, dutch, urdu, role),
      role,
      lessonIds: [],
      chapterIds: [],
      introducedInLessonId: missionOnly ? null : lesson.id
    };
    conceptByIdV4.set(id, concept);
  } else {
    if (
      (!senseId || ["demonstrative", "noun", "verb"].includes(senseId))
      && !concept.legacyConceptIds.includes(legacyConceptId)
    ) {
      concept.legacyConceptIds.push(legacyConceptId);
    }
    if (!concept.translationAliasesUrdu.includes(urdu)) concept.translationAliasesUrdu.push(urdu);
    if (!concept.visualId && visualId) {
      concept.visualId = visualId;
      concept.visual = { kind: "asset", visualId };
    }
    if (!concept.introducedInLessonId && !missionOnly) concept.introducedInLessonId = lesson.id;
  }

  if (!concept.lessonIds.includes(lesson.id)) concept.lessonIds.push(lesson.id);
  if (!concept.chapterIds.includes(chapterId)) concept.chapterIds.push(chapterId);
  return concept;
}

function rawLessonConceptsV4(lesson) {
  const merged = new Map();
  const add = (raw) => {
    if (!raw || !isDutchOnlyText(raw.dutch) || !isUrduText(raw.urdu)) return;
    const cleanUrdu = cleanConceptUrduV4(raw.urdu);
    const key = `${normalizedTextV4(raw.dutch)}|${normalizedTextV4(cleanUrdu)}`;
    const existing = merged.get(key) || {};
    merged.set(key, {
      ...existing,
      ...raw,
      urdu: cleanUrdu,
      visualId: raw.visualId || existing.visualId || ""
    });
  };
  (lesson.concepts || []).forEach(add);
  (lesson.seedConcepts || []).forEach(add);
  return [...merged.values()];
}

function registerNormalLessonConceptsV4(lesson, chapterId) {
  const ids = [];
  const authoredMap = new Map();
  for (const raw of rawLessonConceptsV4(lesson)) {
    const concept = registerConceptV4({ lesson, chapterId, raw });
    if (!concept) continue;
    ids.push(concept.id);
    if (raw.id) authoredMap.set(String(raw.id), concept.id);
  }
  let orderedIds = uniqueV4(ids);
  if (lesson.id === "a0-numbers-11-100") {
    const numberOrder = [
      "elf", "twaalf", "dertien", "dertig",
      "veertien", "veertig", "vijftien", "vijftig",
      "zestien", "zestig", "zeventien", "zeventig",
      "achttien", "tachtig", "negentien", "negentig",
      "twintig", "honderd"
    ];
    orderedIds.sort((leftId, rightId) => {
      const left = normalizedTextV4(conceptByIdV4.get(leftId)?.dutch);
      const right = normalizedTextV4(conceptByIdV4.get(rightId)?.dutch);
      const leftIndex = numberOrder.indexOf(left);
      const rightIndex = numberOrder.indexOf(right);
      return (leftIndex < 0 ? numberOrder.length : leftIndex)
        - (rightIndex < 0 ? numberOrder.length : rightIndex);
    });
  }
  lessonConceptIdsV4.set(lesson.id, orderedIds);
  authoredConceptIdsV4.set(lesson.id, authoredMap);
}

for (const chapter of chaptersV4) {
  for (const lesson of chapter.lessons.filter((item) => item.kind !== "mission")) {
    registerNormalLessonConceptsV4(lesson, chapter.id);
  }
}

function containsWholeDutchTargetV4(candidate, target) {
  const candidateText = ` ${normalizedTextV4(candidate)} `;
  const targetText = ` ${normalizedTextV4(target)} `;
  return targetText.trim() && candidateText.includes(targetText);
}

function translatedAuthoredExampleV4(candidate, lessonConcepts) {
  const candidateWords = dutchWordsV4(candidate);
  if (!candidateWords.length) return null;
  const matches = [];
  let index = 0;
  while (index < candidateWords.length) {
    const match = lessonConcepts
      .map((concept) => ({ concept, words: dutchWordsV4(concept.dutch) }))
      .filter(({ words }) => (
        words.length
        && words.every((word, offset) => candidateWords[index + offset] === word)
      ))
      .sort((left, right) => right.words.length - left.words.length)[0];
    if (!match) return null;
    matches.push(match.concept);
    index += match.words.length;
  }
  const urduParts = matches
    .map((concept) => cleanTerminalPunctuationV4(concept.urdu))
    .filter((urdu, partIndex, parts) => partIndex === 0 || urdu !== parts[partIndex - 1]);
  if (!urduParts.length) return null;
  return `${urduParts.join("، ")}${String(candidate).trim().endsWith("?") ? "؟" : "۔"}`;
}

const normalLessonOrderV4 = new Map(
  chaptersV4
    .flatMap((chapter) => chapter.lessons.filter((lesson) => lesson.kind !== "mission"))
    .map((lesson, index) => [lesson.id, index])
);

function looksLikeDutchQuestionV4(value) {
  const text = String(value || "").trim();
  return text.endsWith("?")
    || /^(wie|wat|waar|wanneer|hoe|waarom|welke|hoeveel|kan|kun|kunt|mag|wil|wilt|moet|is|zijn|ben|heb|heeft|hebben|gaat|gaan|komt|kom)\b/i.test(text);
}

function meaningfulUrduWordsV4(value) {
  const stopWords = new Set([
    "ہے", "ہیں", "ہوں", "ہو", "میں", "کا", "کی", "کے", "کو", "سے",
    "اور", "یا", "یہ", "وہ", "آپ", "تم", "ہم", "میرا", "میری", "میرے",
    "کیا", "ایک", "پر", "نے", "نہیں"
  ]);
  return uniqueV4(
    String(value || "")
      .replace(/[۔،؛؟?!.,:()[\]{}"'’`|/\\]+/gu, " ")
      .split(/\s+/)
      .map((word) => word.trim())
      .filter((word) => word.length > 1 && !stopWords.has(word))
  );
}

function meaningfulDutchWordsV4(value) {
  const stopWords = new Set([
    "ik", "jij", "je", "u", "hij", "zij", "wij", "we", "de", "het", "een",
    "is", "ben", "bent", "zijn", "heb", "heeft", "hebben", "mijn", "jouw",
    "uw", "zijn", "haar", "onze", "dit", "dat", "en", "of", "in", "op", "aan",
    "kan", "kun", "kunt", "kunnen", "mag", "moet", "moeten", "wil", "wilt",
    "willen", "ga", "gaat", "gaan", "kom", "komt", "komen", "neem", "neemt",
    "nemen", "doe", "doet", "doen", "maak", "maakt", "maken", "werk", "werkt",
    "werken", "word", "wordt", "worden"
  ]);
  return dutchWordsV4(value).filter((word) => !stopWords.has(word));
}

function isCompletePatternModelV4(value) {
  const dutch = normalizedTextV4(value);
  const words = dutchWordsV4(dutch);
  if (words.length < 2) return false;
  if (looksLikeDutchQuestionV4(dutch)) return true;
  if (/^(ga|kom|zeg|luister|wacht|stop|bel|stuur|neem|vul|lees|schrijf|betaal|kijk|sla)\b/i.test(dutch)) {
    return true;
  }
  return /\b(ben|bent|is|zijn|heb|hebt|heeft|hebben|kan|kunt|kunnen|mag|moet|moeten|wil|wilt|willen|ga|gaat|gaan|kom|komt|komen|werk|werkt|werken|woon|woont|wonen|heet|heten|doe|doet|doen|word|wordt|worden|krijg|krijgt|krijgen|stuur|stuurt|sturen|betaal|betaalt|betalen|maak|maakt|maken)\b/i.test(dutch);
}

function compatibleQuestionAnswerV4(questionConcept, answerConcept) {
  const question = normalizedTextV4(questionConcept.dutch);
  const answer = normalizedTextV4(answerConcept.dutch);
  const questionUrdu = String(questionConcept.urdu || "");
  const answerUrdu = String(answerConcept.urdu || "");
  const questionWords = new Set(meaningfulDutchWordsV4(question));
  const answerWords = new Set(meaningfulDutchWordsV4(answer));
  const sharedWords = [...questionWords].filter((word) => answerWords.has(word));
  const hasAny = (value, words) => words.some((word) => new RegExp(`\\b${word}\\b`, "i").test(value));
  const hasTime = (value) => (
    /\d|uur|vandaag|morgen|gisteren|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag|ochtend|middag|avond|nacht/i.test(value)
  );
  const hasPlace = (value) => (
    /\b(in|op|bij|naar|uit|hier|daar|straat|stad|huis|school|werk|station|halte|loket|kamer|adres)\b/i.test(value)
  );
  const hasPerson = (value) => (
    /\b(ik|hij|zij|mijn|man|vrouw|moeder|vader|zoon|dochter|kind|docent|dokter|Sara|Ali|Zarar)\b/i.test(value)
  );
  const hasQuantity = (value) => (
    /\d|\b(nul|een|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|euro|cent|kilo|liter)\b/i.test(value)
  );
  const fieldMatch = [
    ["naam", /نام/u],
    ["adres", /پتہ/u],
    ["telefoon", /فون|نمبر/u],
    ["postcode", /پوسٹ/u],
    ["leeftijd", /عمر/u],
    ["geboortedatum", /پیدائش|تاریخ/u],
    ["land", /ملک/u],
    ["woonplaats", /شہر|رہنے/u]
  ].some(([dutchWord, urduPattern]) => (
    (question.includes(dutchWord) || urduPattern.test(questionUrdu))
    && (answer.includes(dutchWord) || urduPattern.test(answerUrdu))
  ));

  if (/^waarom\b/.test(question)) {
    return sharedWords.length >= 1 && (
      /\b(omdat|want|door|niet|geen)\b/i.test(answer)
      || /کیونکہ|اس لیے|نہیں|خراب|بیمار|درد/u.test(answerUrdu)
    );
  }
  if (/^(wanneer|hoe laat)\b/.test(question)) {
    return (hasTime(answer) && sharedWords.length >= 1) || fieldMatch;
  }
  if (/^hoeveel\b/.test(question)) return hasQuantity(answer);
  if (/^waar\b/.test(question)) return sharedWords.length >= 1 && hasPlace(answer);
  if (/^wie\b/.test(question)) {
    return sharedWords.length >= 1 || fieldMatch || /^met\s+[A-Z]/.test(answerConcept.dutch);
  }
  if (/^welke\b/.test(question)) return sharedWords.length >= 1;
  if (/^hoe heet\b/.test(question)) return fieldMatch;
  if (/^hoe gaat\b/.test(question)) {
    return /\b(goed|slecht|prima|ziek)\b/i.test(answer) || /اچھا|ٹھیک|بیمار|خراب/u.test(answerUrdu);
  }
  if (/^hoe\b/.test(question)) return sharedWords.length >= 1 || fieldMatch;
  if (/^wat\b/.test(question)) return fieldMatch || sharedWords.length >= 1;
  if (/^(kan|kun|kunt|mag|wil|wilt|moet|is|zijn|ben|heb|heeft|hebben|gaat|gaan|komt|kom)\b/.test(question)) {
    return sharedWords.length >= 2 || fieldMatch;
  }
  return sharedWords.length >= 2 || fieldMatch;
}

function relatedConceptExampleV4(concept, lesson) {
  const currentOrder = normalLessonOrderV4.get(lesson.id) ?? Number.MAX_SAFE_INTEGER;
  const level = lesson.id.slice(0, 2);
  const lessonConceptIds = lessonConceptIdsV4.get(lesson.id) || [];
  const patternCandidateCap = level === "a0" ? 3 : level === "a1" ? 5 : 4;
  const patternEligible = lesson.questions.some((question) => question.type === "uitleg")
    && lessonConceptIds
      .slice(0, patternCandidateCap)
      .some((conceptId) => isCompletePatternModelV4(conceptByIdV4.get(conceptId)?.dutch));
  const lessonRuns = splitTargetsIntoRunsV4(level, lessonConceptIds, patternEligible);
  const targetRunIndex = Math.max(
    0,
    lessonRuns.findIndex((runConceptIds) => runConceptIds.includes(concept.id))
  );
  const available = [...conceptByIdV4.values()].filter((candidate) => (
    candidate.id !== concept.id
    && (
      (normalLessonOrderV4.get(candidate.introducedInLessonId) ?? Number.MAX_SAFE_INTEGER)
        < currentOrder
      || (
        candidate.introducedInLessonId === lesson.id
        && lessonRuns.findIndex((runConceptIds) => runConceptIds.includes(candidate.id))
          <= targetRunIndex
      )
    )
  ));

  const containing = available
    .filter((candidate) => (
      concept.role === "word"
      &&
      dutchWordsV4(candidate.dutch).length > dutchWordsV4(concept.dutch).length
      && containsWholeDutchTargetV4(candidate.dutch, concept.dutch)
      && normalizedTextV4(candidate.urdu) !== normalizedTextV4(concept.urdu)
    ))
    .sort((left, right) => (
      Number(right.introducedInLessonId === lesson.id)
      - Number(left.introducedInLessonId === lesson.id)
      || dutchWordsV4(left.dutch).length - dutchWordsV4(right.dutch).length
    ))[0];
  if (containing) {
    return {
      exampleDutch: String(containing.dutch),
      exampleUrdu: `${cleanTerminalPunctuationV4(containing.urdu)}${looksLikeDutchQuestionV4(containing.dutch) ? "؟" : "۔"}`,
      source: "taught-containing-phrase"
    };
  }

  if (concept.role !== "phrase") return null;
  const targetIsQuestion = looksLikeDutchQuestionV4(concept.dutch);
  const targetDutchWords = new Set(meaningfulDutchWordsV4(concept.dutch));
  const targetUrduWords = new Set(meaningfulUrduWordsV4(concept.urdu));
  const targetUnitId = chaptersV4
    .flatMap((chapter) => chapter.subchapters)
    .find((unit) => unit.lessonIds.includes(lesson.id))?.id;
  const reliableCrossLessonUrduWords = new Set([
    "نام", "پتہ", "فون", "نمبر", "عمر", "ملک", "شہر", "تاریخ", "وقت",
    "قیمت", "کرایہ", "اسکول", "ڈاکٹر", "درد", "کام", "نوکری"
  ]);
  const paired = available
    .filter((candidate) => (
      looksLikeDutchQuestionV4(candidate.dutch) !== targetIsQuestion
      && dutchWordsV4(candidate.dutch).length > 1
      && compatibleQuestionAnswerV4(
        targetIsQuestion ? concept : candidate,
        targetIsQuestion ? candidate : concept
      )
    ))
    .map((candidate) => {
      const sharedDutchWords = meaningfulDutchWordsV4(candidate.dutch)
        .filter((word) => targetDutchWords.has(word));
      const sharedUrduWords = meaningfulUrduWordsV4(candidate.urdu)
        .filter((word) => targetUrduWords.has(word));
      const dutchOverlap = sharedDutchWords.length;
      const urduOverlap = sharedUrduWords.length;
      const sameLesson = candidate.introducedInLessonId === lesson.id ? 1 : 0;
      const trustworthyTopicLink = sameLesson
        && dutchOverlap > 0
        && (
          urduOverlap > 0
          || sharedUrduWords.some((word) => reliableCrossLessonUrduWords.has(word))
        );
      return {
        candidate,
        score: trustworthyTopicLink
          ? dutchOverlap * 3 + urduOverlap * 2 + sameLesson
          : 0
      };
    })
    .filter((item) => item.score >= 2)
    .sort((left, right) => right.score - left.score)[0]?.candidate;
  if (!paired) return null;

  const question = targetIsQuestion ? concept : paired;
  const answer = targetIsQuestion ? paired : concept;
  return {
    exampleDutch: `${cleanTerminalPunctuationV4(question.dutch)}? — ${cleanTerminalPunctuationV4(answer.dutch)}.`,
    exampleUrdu: `${cleanTerminalPunctuationV4(question.urdu)}؟ — ${cleanTerminalPunctuationV4(answer.urdu)}۔`,
    source: "taught-question-answer"
  };
}

function practicalWordExampleV4(concept, lesson) {
  const dutch = cleanTerminalPunctuationV4(concept.dutch);
  const urdu = cleanTerminalPunctuationV4(concept.urdu);
  const lessonId = lesson.id;
  const lessonConcepts = (lessonConceptIdsV4.get(lesson.id) || [])
    .map((conceptId) => conceptByIdV4.get(conceptId))
    .filter(Boolean);

  if (/^a0-letters-/.test(lessonId)) {
    const letter = lessonConcepts.find((candidate) => (
      /^[a-z]$/i.test(candidate.dutch)
      && normalizedTextV4(dutch).includes(normalizedTextV4(candidate.dutch))
    ));
    if (letter) {
      return {
        exampleDutch: `${letter.dutch} → ${dutch}`,
        exampleUrdu: `حرف ${letter.dutch} سے “${dutch}” (${urdu})۔`,
        source: "phonics-word-example"
      };
    }
  }

  const formValues = {
    voornaam: ["voornaam: Zarar", "پہلا نام: ضرار"],
    achternaam: ["achternaam: Khan", "خاندانی نام: خان"],
    naam: ["naam: Zarar", "نام: ضرار"],
    land: ["land: Nederland", "ملک: نیدرلینڈز"],
    stad: ["stad: Utrecht", "شہر: اترخت"],
    straat: ["straat: Schoolstraat", "سڑک: Schoolstraat"],
    postcode: ["postcode: 1234 AB", "پوسٹ کوڈ: 1234 AB"],
    woonplaats: ["woonplaats: Utrecht", "رہنے کا شہر: اترخت"],
    "e-mailadres": ["e-mailadres: naam@example.nl", "ای میل پتہ: naam@example.nl"],
    leeftijd: ["leeftijd: 30", "عمر: 30 سال"],
    datum: ["datum: 12-05-2026", "تاریخ: 12-05-2026"]
  };
  if (formValues[normalizedTextV4(dutch)]) {
    const [exampleDutch, exampleUrdu] = formValues[normalizedTextV4(dutch)];
    return { exampleDutch, exampleUrdu, source: "practical-form-field" };
  }

  const verbExamples = {
    spellen: ["ik spel mijn naam", "میں اپنے نام کے حروف الگ الگ بولتا/بولتی ہوں"],
    werken: ["ik werk vandaag", "میں آج کام کرتا/کرتی ہوں"],
    eten: ["ik eet rijst", "میں چاول کھاتا/کھاتی ہوں"],
    drinken: ["ik drink water", "میں پانی پیتا/پیتی ہوں"],
    slapen: ["ik slaap nu", "میں ابھی سوتا/سوتی ہوں"],
    lopen: ["ik loop naar huis", "میں گھر کی طرف چلتا/چلتی ہوں"],
    staan: ["ik sta hier", "میں یہاں کھڑا/کھڑی ہوں"],
    wachten: ["ik wacht hier", "میں یہاں انتظار کرتا/کرتی ہوں"],
    lezen: ["ik lees een boek", "میں ایک کتاب پڑھتا/پڑھتی ہوں"],
    schrijven: ["ik schrijf mijn naam", "میں اپنا نام لکھتا/لکھتی ہوں"],
    pinnen: ["ik wil pinnen", "میں کارڈ سے ادائیگی کرنا چاہتا/چاہتی ہوں"],
    betalen: ["ik wil betalen", "میں ادائیگی کرنا چاہتا/چاہتی ہوں"],
    brengen: ["ik breng mijn kind", "میں اپنے بچے کو چھوڑتا/چھوڑتی ہوں"],
    ophalen: ["ik haal mijn kind op", "میں اپنے بچے کو لینے آتا/آتی ہوں"],
    beginnen: ["ik begin om 08:30", "میں 08:30 بجے شروع کرتا/کرتی ہوں"],
    stoppen: ["ik stop om 17:00", "میں 17:00 بجے ختم کرتا/کرتی ہوں"]
  };
  if (verbExamples[normalizedTextV4(dutch)]) {
    const [exampleDutch, exampleUrdu] = verbExamples[normalizedTextV4(dutch)];
    return { exampleDutch, exampleUrdu: `${exampleUrdu}۔`, source: "known-pattern-sentence" };
  }

  if (/^(hier|daar)$/.test(normalizedTextV4(dutch))) {
    return {
      exampleDutch: "hier — daar",
      exampleUrdu: "یہاں — وہاں۔",
      source: "meaningful-location-contrast"
    };
  }
  if (/(time|date|calendar|appointment|routine)/i.test(lessonId)
    || /^(gisteren|nu|vandaag|morgen|middag|avond|nacht|donderdag)$/.test(normalizedTextV4(dutch))) {
    return {
      exampleDutch: `${dutch}: 08:30`,
      exampleUrdu: `${urdu}: 08:30۔`,
      source: "practical-schedule-label"
    };
  }
  if (/(family|people|child-care)/i.test(lessonId)) {
    return {
      exampleDutch: `mijn ${dutch}`,
      exampleUrdu: `میرا/میری ${urdu}۔`,
      source: "known-possessive-phrase"
    };
  }
  if (/(food|shopping|cafe|money|bank|clothes)/i.test(lessonId)) {
    return {
      exampleDutch: `${dutch}: €5`,
      exampleUrdu: `${urdu}: 5 یورو۔`,
      source: "practical-price-label"
    };
  }
  if (/(transport|directions|bus|train|town)/i.test(lessonId)) {
    return {
      exampleDutch: `${dutch}: Utrecht`,
      exampleUrdu: `${urdu}: اترخت۔`,
      source: "practical-travel-label"
    };
  }
  if (/(health|doctor|emergency)/i.test(lessonId)) {
    if (/pijn$/i.test(dutch)) {
      return {
        exampleDutch: `ik heb ${dutch}`,
        exampleUrdu: `مجھے ${urdu} ہے۔`,
        source: "known-health-pattern"
      };
    }
    return {
      exampleDutch: `${dutch}: 10:00`,
      exampleUrdu: `${urdu}: 10:00۔`,
      source: "practical-health-label"
    };
  }
  if (/(school|work|job|library|community)/i.test(lessonId)) {
    return {
      exampleDutch: `${dutch}: Sara`,
      exampleUrdu: `${urdu}: سارا۔`,
      source: "practical-contact-label"
    };
  }
  if (/(home|house|housing|weather)/i.test(lessonId)
    && /^(open|warm|koud|kapot|licht|donker|goedkoop|duur)$/i.test(dutch)) {
    return {
      exampleDutch: `het is ${dutch}`,
      exampleUrdu: `یہ ${urdu} ہے۔`,
      source: "known-description-pattern"
    };
  }
  return {
    exampleDutch: `${dutch}: 1`,
    exampleUrdu: `${urdu}: 1۔`,
    source: "practical-label"
  };
}

function practicalPhraseExampleV4(concept, lesson, context = "") {
  const dutch = cleanTerminalPunctuationV4(concept.dutch);
  const urdu = cleanTerminalPunctuationV4(concept.urdu);
  const words = dutchWordsV4(dutch);
  const lessonId = lesson.id;
  const negativeOrProblem = /\b(niet|geen|kapot|pijn|ziek|probleem|fout|kwijt|gestolen|klacht)\b/i.test(dutch)
    || /نہیں|خراب|درد|بیمار|مسئلہ|گم|چوری|شکایت/u.test(urdu);
  const imperative = /^(ga|kom|zeg|luister|wacht|stop|bel|stuur|neem|vul|lees|schrijf|betaal|kijk)\b/i.test(dutch);
  const shortNounPhrase = /^(de|het|een|mijn|jouw|uw|zijn|haar|onze)\b/i.test(dutch)
    && !/\b(is|zijn|ben|bent|heb|heeft|hebben|kan|kunt|wil|moet|gaat|komt)\b/i.test(dutch);

  if (shortNounPhrase) {
    return {
      exampleDutch: `dit is ${dutch}.`,
      exampleUrdu: `یہ ${urdu} ہے۔`,
      source: "known-identification-pattern"
    };
  }
  if (/^(twee|drie|vier|vijf|zes|zeven|acht|negen|tien)\b/i.test(dutch)) {
    return {
      exampleDutch: `${dutch}: €5`,
      exampleUrdu: `${urdu}: 5 یورو۔`,
      source: "practical-quantity-label"
    };
  }
  if (imperative) {
    return {
      exampleDutch: `${dutch}, alstublieft.`,
      exampleUrdu: `${urdu}، برائے مہربانی۔`,
      source: "polite-action"
    };
  }
  if (negativeOrProblem || /(health|home|housing|complaint|safety|emergency)/i.test(lessonId)) {
    return {
      exampleDutch: `${dutch}. kunt u mij helpen?`,
      exampleUrdu: `${context ? `${context}: ` : ""}${urdu}۔ کیا آپ میری مدد کر سکتے ہیں؟`,
      source: "problem-help-dialogue"
    };
  }
  if (/(greeting|personal|details|address|form|phone|message|email)/i.test(lessonId)) {
    return {
      exampleDutch: `hallo, ${dutch}.`,
      exampleUrdu: `سلام، ${urdu}۔`,
      source: "real-life-opening"
    };
  }
  if (/(appointment|transport|directions|shopping|cafe|bank|post|gemeente|service)/i.test(lessonId)) {
    return {
      exampleDutch: `${dutch}. dank u wel.`,
      exampleUrdu: `${urdu}۔ آپ کا شکریہ۔`,
      source: "service-exchange"
    };
  }
  if (/(routine|calendar|time|school|work|job|plan)/i.test(lessonId)) {
    return {
      exampleDutch: `vandaag: ${dutch}.`,
      exampleUrdu: `آج: ${urdu}۔`,
      source: "practical-day-note"
    };
  }
  if (words[0] === "ik" || words[0] === "wij") {
    return {
      exampleDutch: `hallo, ${dutch}.`,
      exampleUrdu: `سلام، ${urdu}۔`,
      source: "spoken-introduction"
    };
  }
  return {
    exampleDutch: `${dutch}. dank u wel.`,
    exampleUrdu: `${urdu}۔ آپ کا شکریہ۔`,
    source: "complete-exchange"
  };
}

function contextualMiniExampleV4(concept, lesson) {
  const dutch = cleanTerminalPunctuationV4(concept.dutch);
  const urdu = cleanTerminalPunctuationV4(concept.urdu);
  const normalizedDutch = normalizedTextV4(dutch);
  const questionStart = /^(wie|wat|waar|wanneer|hoe|waarom|welke|kan|kun|kunt|mag|wil|wilt|moet|is|zijn|ben|heb|heeft|hebben|gaat|gaan|komt|kom)\b/i;
  const isQuestion = /[?]$/.test(String(concept.dutch).trim()) || questionStart.test(dutch);
  const whQuestion = /^(wie|wat|waar|wanneer|hoe|waarom|welke|hoeveel)\b/i.test(dutch);

  const fixedExamples = {
    hallo: ["hallo! — hallo!", "سلام! — سلام!"],
    goedemorgen: ["goedemorgen, Sara.", "Sara، صبح بخیر۔"],
    goedemiddag: ["goedemiddag, Sara.", "Sara، دوپہر بخیر۔"],
    goedenavond: ["goedenavond, Sara.", "Sara، شام بخیر۔"],
    dag: ["dag! — dag!", "خدا حافظ! — خدا حافظ!"],
    "tot ziens": ["tot ziens! — tot ziens!", "پھر ملیں گے! — پھر ملیں گے!"],
    "dank u wel": ["dank u wel. — graag.", "آپ کا شکریہ۔ — خوشی سے۔"],
    alstublieft: ["alstublieft. — dank u wel.", "لیجیے۔ — آپ کا شکریہ۔"],
    sorry: ["sorry. — sorry.", "معاف کیجیے۔ — معاف کیجیے۔"],
    graag: ["dank u wel. — graag.", "آپ کا شکریہ۔ — خوشی سے۔"],
    "hoe gaat het": ["hoe gaat het? — goed, dank u.", "آپ کیسے ہیں؟ — اچھا ہوں، شکریہ۔"],
    "goed dank u": ["hoe gaat het? — goed, dank u.", "آپ کیسے ہیں؟ — اچھا ہوں، شکریہ۔"],
    ja: ["goed? — ja.", "ٹھیک ہے؟ — ہاں۔"],
    nee: ["goed? — nee.", "ٹھیک ہے؟ — نہیں۔"],
    goed: ["goed? — ja.", "ٹھیک ہے؟ — ہاں۔"],
    "niet goed": ["goed? — nee, niet goed.", "ٹھیک ہے؟ — نہیں، ٹھیک نہیں۔"],
    "ik begrijp het niet": ["sorry, ik begrijp het niet.", "معاف کیجیے، مجھے سمجھ نہیں آیا۔"],
    "ik weet het niet": ["sorry, ik weet het niet.", "معاف کیجیے، مجھے معلوم نہیں۔"],
    afhaalpunt: ["waar is het afhaalpunt?", "وصولی کی جگہ کہاں ہے؟"],
    familie: ["dit is mijn familie.", "یہ میرا خاندان ہے۔"],
    baan: ["ik zoek een baan.", "میں نوکری تلاش کر رہا/رہی ہوں۔"],
    "vul het formulier in": ["vul het formulier in, alstublieft.", "فارم بھر دیں، برائے مہربانی۔"]
  };
  if (fixedExamples[normalizedDutch]) {
    const [exampleDutch, exampleUrdu] = fixedExamples[normalizedDutch];
    return { exampleDutch, exampleUrdu, source: "functional-mini-dialogue" };
  }

  if (lesson.id === "a0-understanding-help") {
    if (isQuestion) {
      return {
        exampleDutch: `ik begrijp het niet. ${dutch}?`,
        exampleUrdu: `مجھے سمجھ نہیں آیا۔ ${urdu}؟`,
        source: "lesson-sequence"
      };
    }
    return {
      exampleDutch: `${dutch}, alstublieft.`,
      exampleUrdu: `${urdu}، برائے مہربانی۔`,
      source: "polite-request"
    };
  }

  const situation = lesson.questions.find((question) => (
    question.type === "situation"
    && isUrduText(question.prompt)
    && !isExerciseInstructionLikeUrduV4(question.prompt)
    && normalizedTextV4(question.answer) === normalizedDutch
  ));
  const context = situation
    ? cleanTerminalPunctuationV4(String(situation.prompt).replace(/^(?:حال|صورت)\s*:\s*/u, ""))
    : "";

  if (isQuestion) {
    if (/^(kan|kun|kunt|mag|wil|wilt)\b/i.test(dutch)) {
      return {
        exampleDutch: `${dutch}, alstublieft?`,
        exampleUrdu: `${context ? `${context}: ` : ""}${urdu}، برائے مہربانی؟`,
        source: context ? "authored-polite-question" : "polite-question"
      };
    }
    if (!/[?]$/.test(String(concept.dutch).trim()) && /^heeft\b/i.test(dutch)) {
      return {
        exampleDutch: `${dutch}, alstublieft?`,
        exampleUrdu: `${context ? `${context}: ` : ""}${urdu}، برائے مہربانی؟`,
        source: context ? "authored-polite-question" : "polite-question"
      };
    }
    if (!/[?]$/.test(String(concept.dutch).trim()) && /^is\b/i.test(dutch)) {
      return {
        exampleDutch: `${dutch}? — ja, dat is voldoende.`,
        exampleUrdu: `${context ? `${context}: ` : ""}${urdu}؟ — ہاں، یہ کافی ہے۔`,
        source: context ? "authored-complete-answer" : "complete-answer"
      };
    }
    const quantityQuestion = /^hoeveel\b/i.test(dutch);
    const responseDutch = quantityQuestion ? "800 euro" : whQuestion ? "ik weet het niet" : "ja";
    const responseUrdu = quantityQuestion ? "800 یورو" : whQuestion ? "مجھے معلوم نہیں" : "ہاں";
    return {
      exampleDutch: `${dutch}? — ${responseDutch}.`,
      exampleUrdu: `${context ? `${context}: ` : ""}${urdu}؟ — ${responseUrdu}۔`,
      source: context ? "authored-situation-dialogue" : "question-response"
    };
  }

  if (concept.role === "word") {
    return practicalWordExampleV4(concept, lesson);
  }

  return practicalPhraseExampleV4(concept, lesson, context);
}

function improveConceptExampleV4(concept, lesson) {
  const lessonConcepts = (lessonConceptIdsV4.get(lesson.id) || [])
    .map((conceptId) => conceptByIdV4.get(conceptId))
    .filter(Boolean);

  if (/^[a-z]$/i.test(concept.dutch)) {
    const exampleWord = lessonConcepts.find((candidate) => (
      candidate.id !== concept.id
      && dutchWordsV4(candidate.dutch).length === 1
      && normalizedTextV4(candidate.dutch).includes(normalizedTextV4(concept.dutch))
    ));
    if (exampleWord) {
      concept.exampleDutch = `${exampleWord.dutch} → ${concept.dutch}`;
      concept.exampleUrdu = `“${exampleWord.dutch}” (${cleanTerminalPunctuationV4(
        exampleWord.urdu
      )}) میں حرف ${concept.dutch} دیکھیں اور سنیں۔`;
      concept.examples = [{ dutch: concept.exampleDutch, urdu: concept.exampleUrdu }];
      concept.exampleSource = "authored-letter-word";
      return;
    }
  }

  const relatedExample = relatedConceptExampleV4(concept, lesson);
  if (relatedExample) {
    concept.exampleDutch = relatedExample.exampleDutch;
    concept.exampleUrdu = relatedExample.exampleUrdu;
    concept.examples = [{ dutch: concept.exampleDutch, urdu: concept.exampleUrdu }];
    concept.exampleSource = relatedExample.source;
    return;
  }

  const candidates = uniqueV4(lesson.questions.flatMap((question) => [
    question.speak,
    question.type === "situation" ? null : question.prompt,
    question.answer,
    ...((question.document?.rows || []).map((row) => row.value))
  ]).filter((candidate) => (
    isDutchOnlyText(candidate)
    && !String(candidate).includes("_")
    && dutchWordsV4(candidate).length <= 12
    && normalizedTextV4(candidate) !== normalizedTextV4(concept.dutch)
    && containsWholeDutchTargetV4(candidate, concept.dutch)
  )));

  for (const candidate of candidates) {
    const translated = translatedAuthoredExampleV4(candidate, lessonConcepts);
    if (
      !translated
      || normalizedTextV4(cleanTerminalPunctuationV4(translated))
        === normalizedTextV4(cleanTerminalPunctuationV4(concept.urdu))
    ) continue;
    concept.exampleDutch = String(candidate);
    concept.exampleUrdu = translated;
    concept.examples = [{ dutch: concept.exampleDutch, urdu: concept.exampleUrdu }];
    concept.exampleSource = "authored-combination";
    return;
  }

  const miniExample = contextualMiniExampleV4(concept, lesson);
  concept.exampleDutch = miniExample.exampleDutch;
  concept.exampleUrdu = miniExample.exampleUrdu;
  concept.examples = [{ dutch: concept.exampleDutch, urdu: concept.exampleUrdu }];
  concept.exampleSource = miniExample.source;
}

function teachingConceptIdsForV4(concept, lesson) {
  const lessonIds = lessonConceptIdsV4.get(lesson.id) || [];
  const level = lesson.id.slice(0, 2);
  const firstCap = level === "a0" ? 3 : level === "a1" ? 5 : 4;
  const patternEligible = lesson.questions.some((question) => question.type === "uitleg")
    && lessonIds.slice(0, firstCap)
      .some((conceptId) => isCompletePatternModelV4(conceptByIdV4.get(conceptId)?.dutch));
  const runs = lesson.id === "a0-numbers-11-100"
    ? [
      lessonIds.slice(0, 4),
      lessonIds.slice(4, 8),
      lessonIds.slice(8, 12),
      lessonIds.slice(12, 16),
      lessonIds.slice(16, 20),
      lessonIds.slice(20)
    ].filter((ids) => ids.length)
    : splitTargetsIntoRunsV4(level, lessonIds, patternEligible);
  const runIndex = Math.max(0, runs.findIndex((ids) => ids.includes(concept.id)));
  const previousLesson = chaptersV4
    .flatMap((chapter) => chapter.lessons.filter((item) => item.kind !== "mission"))
    .filter((item) => (
      (normalLessonOrderV4.get(item.id) ?? Number.MAX_SAFE_INTEGER)
      < (normalLessonOrderV4.get(lesson.id) ?? Number.MAX_SAFE_INTEGER)
    ))
    .slice(-1)[0];
  const previousConceptIds = (lessonConceptIdsV4.get(previousLesson?.id) || []).slice(-5);
  return uniqueV4([
    ...runs.slice(0, runIndex + 1).flat(),
    ...previousConceptIds
  ]);
}

const teachingScaffoldTokensV4 = new Set([
  "nederlands", "a", "b", "ali", "sara", "ahmed", "fatima",
  "amsterdam", "rotterdam", "utrecht", "nederland", "digid", "iban", "bsn",
  "www", "nl"
]);

function unownedTeachingTokensV4(value, allowedConceptIds) {
  const allowed = new Set(teachingScaffoldTokensV4);
  for (const conceptId of allowedConceptIds) {
    const allowedConcept = conceptByIdV4.get(conceptId);
    for (const word of dutchWordsV4(allowedConcept?.dutch)) allowed.add(word);
    for (const word of dutchWordsV4(allowedConcept?.audioText)) allowed.add(word);
  }
  return dutchWordsV4(value).filter((word) => !allowed.has(word));
}

// A contrast is useful only when the two targets are genuinely easy to mix
// up.  Earlier generation paired every A0 target with a nearby target, which
// repeated unrelated comparisons across usage, boundary, confusion, and the
// example.  Keep one purposeful contrast instead of inventing a partner.
const meaningfulA0ContrastTargetsV4 = {
  ik: ["jij", "u"],
  jij: ["u", "ik"],
  u: ["jij"],
  hij: ["zij"],
  zij: ["hij", "wij"],
  wij: ["zij"],
  man: ["vrouw"],
  vrouw: ["man"],
  vader: ["moeder"],
  moeder: ["vader"],
  broer: ["zus"],
  zus: ["broer"],
  dit: ["dat"],
  dat: ["dit"],
  hier: ["daar"],
  daar: ["hier"],
  wie: ["wat", "waar"],
  wat: ["wie", "waar"],
  waar: ["wie", "wat"],
  niet: ["geen", "nee"],
  geen: ["niet"],
  de: ["het", "een"],
  het: ["de", "een"],
  een: ["de", "het"],
  gaan: ["komen"],
  komen: ["gaan"],
  "ik ga": ["ik kom"],
  "ik kom": ["ik ga"],
  "hij gaat": ["hij komt"],
  "hij komt": ["hij gaat"],
  naar: ["met"],
  met: ["naar"],
  brengen: ["ophalen"],
  ophalen: ["brengen"],
  "ik breng mijn kind naar school": ["ik haal mijn kind om drie uur op"],
  "ik haal mijn kind om drie uur op": ["ik breng mijn kind naar school"],
  links: ["rechts"],
  rechts: ["links"],
  ingang: ["uitgang"],
  uitgang: ["ingang"],
  warm: ["koud"],
  koud: ["warm"],
  goedkoop: ["duur"],
  duur: ["goedkoop"]
};

function meaningfulA0ContrastPartnerV4(concept, lesson, allowedConceptIds) {
  const targets = meaningfulA0ContrastTargetsV4[normalizedTextV4(concept.dutch)] || [];
  if (!targets.length) return null;
  const allowed = new Set(allowedConceptIds || []);
  const lessonConceptOrder = lessonConceptIdsV4.get(lesson.id) || [];
  return targets
    .map((target) => lessonConceptOrder
      .map((conceptId) => conceptByIdV4.get(conceptId))
      .find((candidate) => (
        candidate
        && candidate.id !== concept.id
        && allowed.has(candidate.id)
        && normalizedTextV4(candidate.dutch) === normalizedTextV4(target)
      )))
    .find(Boolean) || null;
}

function safeTargetOnlyExampleV4(concept, lesson, allowedConceptIds) {
  const dutch = cleanTerminalPunctuationV4(concept.dutch);
  const urdu = cleanTerminalPunctuationV4(concept.urdu);
  const normalized = normalizedTextV4(dutch);
  const numberValues = {
    nul: "0", een: "1", twee: "2", drie: "3", vier: "4", vijf: "5",
    zes: "6", zeven: "7", acht: "8", negen: "9", tien: "10", elf: "11",
    twaalf: "12", dertien: "13", veertien: "14", vijftien: "15",
    zestien: "16", zeventien: "17", achttien: "18", negentien: "19",
    twintig: "20", dertig: "30", veertig: "40", vijftig: "50",
    zestig: "60", zeventig: "70", tachtig: "80", negentig: "90",
    honderd: "100"
  };
  if (numberValues[normalized]) {
    return {
      exampleDutch: `${dutch}: ${numberValues[normalized]}`,
      exampleUrdu: `گنتی یا نمبر میں “${dutch}” سے ${urdu} مراد ہے۔`,
      source: "verified-number-value"
    };
  }
  const timeExamples = {
    ochtend: ["ochtend: 08:30", "صبح 08:30 بجے۔"],
    middag: ["middag: 13:00", "دوپہر 13:00 بجے۔"],
    avond: ["avond: 19:00", "شام 19:00 بجے۔"],
    nacht: ["nacht: 02:00", "رات 02:00 بجے۔"]
  };
  if (timeExamples[normalized]) {
    return {
      exampleDutch: timeExamples[normalized][0],
      exampleUrdu: timeExamples[normalized][1],
      source: "verified-time-value"
    };
  }
  const directionExamples = {
    links: ["links ← — rechts →", "بائیں تیر کے لیے “links”، دائیں تیر کے لیے “rechts”۔"],
    rechts: ["links ← — rechts →", "بائیں تیر کے لیے “links”، دائیں تیر کے لیے “rechts”۔"],
    rechtdoor: ["links ← — rechtdoor ↑ — rechts →", "درمیانی سیدھے تیر کے لیے “rechtdoor” کہیں۔"],
    ingang: ["ingang → — uitgang ←", "داخل ہونے کا نشان “ingang”، باہر جانے کا نشان “uitgang”۔"],
    uitgang: ["ingang → — uitgang ←", "داخل ہونے کا نشان “ingang”، باہر جانے کا نشان “uitgang”۔"]
  };
  if (
    directionExamples[normalized]
    && !unownedTeachingTokensV4(directionExamples[normalized][0], allowedConceptIds).length
  ) {
    return {
      exampleDutch: directionExamples[normalized][0],
      exampleUrdu: directionExamples[normalized][1],
      source: "verified-sign-context"
    };
  }
  const actionExamples = {
    spellen: ["ik spel mijn naam", "میں اپنے نام کے حروف الگ الگ بولتا/بولتی ہوں۔"],
    werken: ["ik werk", "میں کام کرتا/کرتی ہوں۔"],
    eten: ["ik eet", "میں کھاتا/کھاتی ہوں۔"],
    drinken: ["ik drink", "میں پیتا/پیتی ہوں۔"],
    slapen: ["ik slaap", "میں سوتا/سوتی ہوں۔"],
    lopen: ["ik loop", "میں چلتا/چلتی ہوں۔"],
    zitten: ["ik zit", "میں بیٹھا/بیٹھی ہوں۔"],
    staan: ["ik sta", "میں کھڑا/کھڑی ہوں۔"],
    wachten: ["ik wacht", "میں انتظار کرتا/کرتی ہوں۔"],
    lezen: ["ik lees", "میں پڑھتا/پڑھتی ہوں۔"],
    schrijven: ["ik schrijf", "میں لکھتا/لکھتی ہوں۔"],
    gaan: ["ik ga", "میں جاتا/جاتی ہوں۔"],
    komen: ["ik kom", "میں آتا/آتی ہوں۔"],
    kopen: ["ik koop", "میں خریدتا/خریدتی ہوں۔"],
    betalen: ["ik betaal", "میں ادائیگی کرتا/کرتی ہوں۔"],
    bellen: ["ik bel", "میں فون کرتا/کرتی ہوں۔"],
    leren: ["ik leer", "میں سیکھتا/سیکھتی ہوں۔"],
    helpen: ["ik help", "میں مدد کرتا/کرتی ہوں۔"]
  };
  if (actionExamples[normalized]) {
    const [exampleDutch, exampleUrdu] = actionExamples[normalized];
    if (!unownedTeachingTokensV4(exampleDutch, allowedConceptIds).length) {
      return { exampleDutch, exampleUrdu, source: "verified-action-sentence" };
    }
  }
  const contrasts = {
    ik: ["ik — jij", "اپنے لیے “ik”، سامنے والے کے لیے “jij”۔"],
    jij: ["ik — jij", "اپنے لیے “ik”، سامنے والے کے لیے “jij”۔"],
    u: ["jij — u", "دوستانہ “jij”، ادب کے ساتھ “u”۔"],
    ja: ["ja — nee", "ہاں کے لیے “ja”، انکار کے لیے “nee”۔"],
    nee: ["ja — nee", "ہاں کے لیے “ja”، انکار کے لیے “nee”۔"],
    goed: ["goed — niet goed", "اچھی حالت “goed”، اچھی نہ ہو تو “niet goed”۔"],
    niet: ["goed — niet goed", "جملے میں انکار کے لیے “niet” آتا ہے۔"],
    warm: ["warm — koud", "گرم کے لیے “warm”، سرد کے لیے “koud”۔"],
    koud: ["warm — koud", "گرم کے لیے “warm”، سرد کے لیے “koud”۔"]
  };
  if (contrasts[normalized]
    && !unownedTeachingTokensV4(contrasts[normalized][0], allowedConceptIds).length) {
    return {
      exampleDutch: contrasts[normalized][0],
      exampleUrdu: contrasts[normalized][1],
      source: "verified-meaning-contrast"
    };
  }
  const lessonConceptOrder = lessonConceptIdsV4.get(lesson.id) || [];
  const allowedSet = new Set(allowedConceptIds);
  const conceptIndex = lessonConceptOrder.indexOf(concept.id);
  const purposefulPartner = lesson.id.startsWith("a0-")
    ? meaningfulA0ContrastPartnerV4(concept, lesson, allowedConceptIds)
    : null;
  const contrastPartner = purposefulPartner || lessonConceptOrder
    .map((conceptId, index) => ({ candidate: conceptByIdV4.get(conceptId), index }))
    .filter(({ candidate }) => (
      candidate
      && candidate.id !== concept.id
      && allowedSet.has(candidate.id)
    ))
    .sort((left, right) => {
      const leftRole = left.candidate.role === concept.role ? 0 : 1;
      const rightRole = right.candidate.role === concept.role ? 0 : 1;
      return leftRole - rightRole
        || Math.abs(left.index - conceptIndex) - Math.abs(right.index - conceptIndex);
    })[0]?.candidate;
  if (contrastPartner) {
    return {
      exampleDutch: `${dutch} — ${contrastPartner.dutch}`,
      exampleUrdu: `“${dutch}” (${urdu}) کو “${contrastPartner.dutch}” (${cleanTerminalPunctuationV4(
        contrastPartner.urdu
      )}) سے الگ پہچانیں۔`,
      source: purposefulPartner
        ? "purposeful-meaning-contrast"
        : "run-owned-meaning-pair"
    };
  }
  if (concept.visualId || concept.role === "sound" || concept.role === "letter"
    || dutchWordsV4(dutch).length > 1) {
    const context = concept.visualId
      ? `تصویر میں ${urdu} دیکھیں؛ نیچے یہی ڈچ لفظ یا فقرہ بولا جائے گا۔`
      : concept.role === "sound" || concept.role === "letter"
        ? `حرف کی شکل دیکھیں اور آہستہ آڈیو میں اس کی ڈچ آواز سنیں۔`
        : `${cleanPracticalContextUrduV4(concept.usageUrdu, `${urdu} کی روزمرہ بات`)}؛ اس موقع میں یہی مکمل ڈچ بات کہیں۔`;
    return {
      exampleDutch: dutch,
      exampleUrdu: context,
      source: "supported-target-context"
    };
  }
  return {
    exampleDutch: dutch,
    exampleUrdu: `${urdu} کی مخصوص آواز سنیں اور اسی معنی والی تصویر یا صورت میں اسے پہچانیں۔`,
    source: "supported-audio-context"
  };
}

function preciseCommonConfusionV4(concept, lesson, allowedConceptIds) {
  const dutch = cleanTerminalPunctuationV4(concept.dutch);
  const urdu = cleanTerminalPunctuationV4(concept.urdu);
  const normalized = normalizedTextV4(dutch);
  const numberTraps = {
    vier: ["vijf", "“vier” چار ہے اور “vijf” پانچ؛ دونوں کی آخری آواز غور سے سنیں۔"],
    vijf: ["vier", "“vijf” پانچ ہے اور “vier” چار؛ شروع اور آخر کی آواز الگ سنیں۔"],
    zes: ["zeven", "“zes” چھ ہے اور “zeven” سات؛ چھوٹے اور لمبے لفظ کی آواز الگ رکھیں۔"],
    zeven: ["zes", "zeven دو حصوں میں سنائی دیتا ہے؛ اسے مختصر zes نہ سمجھیں۔"],
    dertien: ["dertig", "“dertien” تیرہ ہے اور “dertig” تیس؛ آخری حصے کی آواز بدلتی ہے۔"],
    dertig: ["dertien", "“dertig” تیس ہے اور “dertien” تیرہ؛ پوری آواز سن کر عدد چنیں۔"],
    veertien: ["veertig", "“veertien” چودہ ہے اور “veertig” چالیس؛ مختصر آخری آواز سے فرق سنیں۔"],
    veertig: ["veertien", "“veertig” چالیس ہے اور “veertien” چودہ؛ پورا عدد سن کر فیصلہ کریں۔"],
    vijftien: ["vijftig", "“vijftien” پندرہ ہے اور “vijftig” پچاس؛ آخری آواز دونوں کو الگ کرتی ہے۔"],
    vijftig: ["vijftien", "“vijftig” پچاس ہے اور “vijftien” پندرہ؛ عدد کی پوری آواز سنیں۔"],
    zestien: ["zestig", "“zestien” سولہ ہے اور “zestig” ساٹھ؛ آخری آواز پر توجہ دیں۔"],
    zestig: ["zestien", "“zestig” ساٹھ ہے اور “zestien” سولہ؛ دونوں کو ہندسے کے ساتھ یاد کریں۔"],
    zeventien: ["zeventig", "“zeventien” سترہ ہے اور “zeventig” ستر؛ آخری آواز الگ ہے۔"],
    zeventig: ["zeventien", "“zeventig” ستر ہے اور “zeventien” سترہ؛ پوری آواز سنیں۔"],
    achttien: ["tachtig", "“achttien” اٹھارہ ہے اور “tachtig” اسی؛ ابتدا اور آخر دونوں سنیں۔"],
    tachtig: ["achttien", "“tachtig” اسی ہے اور “achttien” اٹھارہ؛ اسے ہندسے کے ساتھ پہچانیں۔"],
    negentien: ["negentig", "“negentien” انیس ہے اور “negentig” نوے؛ آخری آواز فرق بتاتی ہے۔"],
    negentig: ["negentien", "“negentig” نوے ہے اور “negentien” انیس؛ پورا عدد سن کر چنیں۔"]
  };
  if (numberTraps[normalized]) {
    const [other, explanation] = numberTraps[normalized];
    if (!unownedTeachingTokensV4(other, allowedConceptIds).length) return explanation;
  }
  const exact = {
    ik: "“ik” بولنے والے اپنے لیے ہے؛ سامنے والے کے لیے یہ ضمیر استعمال نہ کریں۔",
    jij: "“jij” ایک جان پہچان والے شخص کے لیے ہے؛ رسمی موقع میں ادب والا ضمیر چاہیے۔",
    u: "“u” رسمی یا مؤدبانہ مخاطب کے لیے ہے؛ اسے اپنے لیے نہ بولیں۔",
    hij: "“hij” ایک مرد یا مذکر شخص کے لیے ہے؛ عورت کے لیے دوسرا ضمیر آتا ہے۔",
    zij: "“zij” ایک عورت کے لیے بھی اور جمع کے لیے بھی آ سکتا ہے؛ جملے کا فعل تعداد واضح کرتا ہے۔",
    wij: "“wij” میں بولنے والا اور کم از کم ایک دوسرا شخص شامل ہوتے ہیں۔",
    de: "“de” بہت سے اسموں کے ساتھ آتا ہے؛ ہر اسم کے آگے خود سے het نہ لگائیں۔",
    het: "“het” مخصوص het-اسم کے ساتھ آتا ہے؛ ہر اسم کو de سمجھنا درست نہیں۔",
    een: "“een” غیر مخصوص ایک چیز بتاتا ہے؛ اسے de یا het والے مخصوص معنی میں نہ پڑھیں۔",
    niet: "“niet” فعل، کیفیت، یا پوری بات کی نفی کرتا ہے؛ اسم کے سامنے geen والا کام الگ ہے۔",
    geen: "“geen” اسم کے ساتھ صفر یا کوئی نہیں کا معنی دیتا ہے؛ عام فعل کی نفی میں niet آتا ہے۔",
    graag: "“graag” کسی کام کی پسند یا مؤدبانہ خواہش دکھاتا ہے؛ صرف شکریہ کے جواب تک محدود نہیں۔"
  };
  let result = exact[normalized];
  if (!result) {
    if (looksLikeDutchQuestionV4(dutch)) {
      result = `“${dutch}” سوال ہے؛ جواب دیتے وقت سوال کے مانگے ہوئے شخص، چیز، جگہ، وقت، یا وجہ ہی بتائیں۔`;
    } else if (concept.role === "phrase") {
      result = `“${dutch}” مکمل تیار بات ہے؛ “${urdu}” کے اسی کام میں اسے ادھورا چھوڑے بغیر بولیں۔`;
    } else if (concept.role === "sound" || concept.role === "letter") {
      result = `“${dutch}” کی ڈچ آواز آڈیو سے سنیں؛ اردو حرف کی مانوس آواز خود سے نہ لگائیں۔`;
    } else if (concept.visualId) {
      result = `“${dutch}” تصویر میں ${urdu} کا نام ہے؛ اسے کسی عمل یا کیفیت کا لفظ نہ سمجھیں۔`;
    } else {
      const domain = lessonDomainV4(lesson.id);
      const domainUrdu = {
        "number-time": "نمبر یا وقت",
        routine: "روزمرہ عمل",
        travel: "راستہ یا سفر",
        health: "صحت",
        home: "گھر",
        "food-shop": "دکان یا کھانے",
        identity: "تعارف",
        work: "کام",
        school: "اسکول",
        government: "سرکاری کام",
        message: "پیغام"
      }[domain] || "روزمرہ گفتگو";
      result = `“${dutch}” ${domainUrdu} میں “${urdu}” کا مخصوص معنی دیتا ہے؛ اسے دوسرے کام یا چیز کے نام کی جگہ نہ بولیں۔`;
    }
  }
  if (unownedTeachingTokensV4(result, allowedConceptIds).length) {
    return `“${dutch}” کو “${urdu}” کے مخصوص معنی میں پہچانیں؛ کسی دوسرے شخص، چیز، یا کام کے لیے اسے نہ چنیں۔`;
  }
  return result;
}

const a0StartSpeakingLessonIdsV4 = new Set([
  "a0-greetings-courtesy",
  "a0-understanding-help",
  "a0-ja-nee-goed-niet"
]);

const a0StartSpeakingTeachingV4 = {
  hallo: {
    usage: "دن کے کسی بھی وقت کسی سے بات شروع کرتے ہوئے عام سلام کہیں۔",
    exampleDutch: "A: Hallo! — B: Hallo!",
    exampleUrdu: "دو لوگ ملتے ہیں: سلام! — سلام!",
    pronunciation: "ہا لو",
    confusion: "“hallo” عام سلام ہے؛ صبح کے خاص سلام کے لیے “goedemorgen” کہیں۔",
    boundary: "یہ ملاقات شروع کرتا ہے؛ رخصت ہونے کے لیے الوداع والا فقرہ درکار ہے۔",
    contrasts: ["goedemorgen"]
  },
  goedemorgen: {
    usage: "صبح کسی شخص سے پہلی ملاقات یا گفتگو شروع کرتے وقت یہ سلام کہیں۔",
    exampleDutch: "08:00 — Goedemorgen!",
    exampleUrdu: "صبح آٹھ بجے کہیں: صبح بخیر!",
    pronunciation: "خُودَ مورخَن",
    confusion: "“goedemorgen” صبح کے لیے ہے؛ دوپہر میں “goedemiddag” کہیں۔",
    boundary: "یہ سلام صبح کے وقت تک محدود ہے؛ دن کے اگلے حصے میں وقت والا سلام بدلتا ہے۔",
    contrasts: ["goedemiddag"]
  },
  goedemiddag: {
    usage: "دوپہر میں دکان، اسکول، یا دفتر میں گفتگو شروع کرتے وقت یہ سلام کہیں۔",
    exampleDutch: "13:00 — Goedemiddag!",
    exampleUrdu: "دوپہر ایک بجے کہیں: دوپہر بخیر!",
    pronunciation: "خُودَ مِداخ",
    confusion: "“goedemiddag” دوپہر کے لیے ہے؛ شام میں “goedenavond” کہیں۔",
    boundary: "یہ دوپہر کا سلام ہے؛ صبح یا شام کے وقت اسے استعمال نہ کریں۔",
    contrasts: ["goedenavond"]
  },
  goedenavond: {
    usage: "شام میں کسی سے ملتے یا گفتگو شروع کرتے وقت یہ سلام کہیں۔",
    exampleDutch: "19:00 — Goedenavond!",
    exampleUrdu: "شام سات بجے کہیں: شام بخیر!",
    pronunciation: "خُودَن آوَنٹ",
    confusion: "“goedenavond” شام کا سلام ہے؛ دوپہر کے لیے “goedemiddag” آتا ہے۔",
    boundary: "یہ شام میں ملاقات شروع کرتا ہے؛ رخصت ہونے کا مطلب نہیں دیتا۔",
    contrasts: ["goedemiddag"]
  },
  dag: {
    usage: "جان پہچان والے شخص کو مختصر سلام یا مختصر الوداع کہتے وقت استعمال کریں۔",
    exampleDutch: "A: Dag! — B: Dag!",
    exampleUrdu: "دو جان پہچان والے مختصر سلام یا الوداع کہتے ہیں۔",
    pronunciation: "داخ",
    confusion: "“dag” سلام اور مختصر الوداع دونوں ہو سکتا ہے؛ “tot ziens” صرف دوبارہ ملنے تک رخصت ہے۔",
    boundary: "اس کا مطلب موقع کے آغاز یا اختتام سے واضح ہوتا ہے؛ رسمی وقت والا سلام الگ ہے۔",
    contrasts: ["tot ziens"]
  },
  "tot ziens": {
    usage: "گفتگو ختم کرتے ہوئے اور دوبارہ ملنے کی امید کے ساتھ رخصت ہوں۔",
    exampleDutch: "Dag. — Tot ziens!",
    exampleUrdu: "رخصت ہوتے وقت کہیں: خدا حافظ، پھر ملیں گے!",
    pronunciation: "توت زینس",
    confusion: "“tot ziens” رخصت ہوتے وقت آتا ہے؛ ملاقات شروع کرنے کے لیے “dag” یا وقت والا سلام کہیں۔",
    boundary: "یہ بات کے اختتام پر بولا جاتا ہے؛ گفتگو کے پہلے سلام کی جگہ نہیں آتا۔",
    contrasts: ["dag"]
  },
  "dank u wel": {
    usage: "کسی کی مدد، چیز، یا خدمت ملنے کے بعد ادب سے شکریہ کہیں۔",
    exampleDutch: "A: Alstublieft. — B: Dank u wel.",
    exampleUrdu: "ایک شخص چیز دیتا ہے: لیجیے۔ دوسرا کہتا ہے: آپ کا شکریہ۔",
    pronunciation: "ڈانک یو ویل",
    confusion: "“dank u wel” شکریہ ہے؛ چیز پیش کرنے یا مؤدبانہ درخواست کے لیے “alstublieft” آتا ہے۔",
    boundary: "یہ مدد یا چیز ملنے کے بعد جواب ہے؛ کسی سے کام کروانے کی درخواست نہیں۔"
  },
  alstublieft: {
    usage: "کسی چیز کو پیش کرتے ہوئے یا مؤدبانہ درخواست کے ساتھ لیجیے یا برائے مہربانی کہیں۔",
    exampleDutch: "A: Alstublieft. — B: Dank u wel.",
    exampleUrdu: "چیز دیتے وقت کہیں: لیجیے۔ جواب میں سنیں: آپ کا شکریہ۔",
    pronunciation: "اَلس تُ بلیفٹ",
    confusion: "“alstublieft” چیز پیش یا درخواست نرم کرتا ہے؛ شکریہ ادا کرنے کے لیے “dank u wel” کہیں۔",
    boundary: "یہ دینے یا مانگنے کے موقع میں آتا ہے؛ صرف شکریہ کے معنی میں استعمال نہیں ہوتا۔"
  },
  sorry: {
    usage: "غلطی، ٹکر، یا کسی کو روکنے پر مختصر معذرت کے طور پر کہیں۔",
    exampleDutch: "Sorry. Dank u wel.",
    exampleUrdu: "پہلے معذرت کریں، پھر مدد ملنے پر شکریہ کہیں۔",
    pronunciation: "سو ری",
    confusion: "“sorry” اپنی غلطی یا خلل پر معذرت ہے؛ مدد ملنے کے بعد شکریہ الگ کہا جاتا ہے۔",
    boundary: "یہ معذرت کے لیے ہے؛ سلام، درخواست، یا رضامندی کا جواب نہیں۔"
  },
  graag: {
    usage: "کسی پیشکش کو خوشی سے قبول کرتے یا اپنی پسند مؤدبانہ طور پر بتاتے وقت کہیں۔",
    exampleDutch: "Graag! — Dank u wel.",
    exampleUrdu: "پیشکش قبول کریں: خوشی سے! پھر کہیں: آپ کا شکریہ۔",
    pronunciation: "خراخ",
    confusion: "“graag” خوشی یا پسند دکھاتا ہے؛ یہ خود شکریہ نہیں، اس کے بعد “dank u wel” کہا جا سکتا ہے۔",
    boundary: "یہ قبول یا پسند ظاہر کرتا ہے؛ صاف انکار یا معذرت کے لیے نہیں۔"
  },
  "hoe gaat het": {
    usage: "سلام کے بعد سامنے والے کی خیریت پوچھنے کے لیے یہ مکمل سوال کہیں۔",
    exampleDutch: "Hoe gaat het? — Goed, dank u.",
    exampleUrdu: "آپ کیسے ہیں؟ — اچھا ہوں، شکریہ۔",
    pronunciation: "ہو خات ہَت",
    confusion: "“hoe gaat het” خیریت کا سوال ہے؛ جواب میں “goed, dank u” جیسی حالت بتائیں۔",
    boundary: "یہ شخص کی خیریت پوچھتا ہے؛ نام، جگہ، یا وقت نہیں پوچھتا۔"
  },
  "goed dank u": {
    usage: "خیریت کے سوال کا مختصر مؤدبانہ جواب دیتے ہوئے اپنی حالت اچھی بتائیں۔",
    exampleDutch: "Hoe gaat het? — Goed, dank u.",
    exampleUrdu: "آپ کیسے ہیں؟ — اچھا ہوں، شکریہ۔",
    pronunciation: "خُوت، ڈانک یو",
    confusion: "“goed, dank u” خیریت کے سوال کا جواب ہے؛ گفتگو شروع کرنے والا سلام نہیں۔",
    boundary: "یہ اپنی اچھی حالت بتاتا ہے؛ سوال پوچھنے یا الوداع کہنے کے لیے نہیں۔"
  },
  "ik begrijp het niet": {
    usage: "جب سامنے والے کی بات سمجھ نہ آئے تو فوراً اپنی مشکل واضح کریں۔",
    exampleDutch: "Ik begrijp het niet. Kunt u herhalen?",
    exampleUrdu: "مجھے سمجھ نہیں آیا۔ کیا آپ دہرا سکتے ہیں؟",
    pronunciation: "اِک بَخرَیپ ہَت نیت",
    confusion: "یہ نہ سمجھنے کی اطلاع ہے؛ دوبارہ سننے کی درخواست اگلے سوال “kunt u herhalen” سے کریں۔",
    boundary: "یہ صرف سمجھ نہ آنے کی حالت بتاتا ہے؛ خود سے وضاحت یا ترجمہ نہیں مانگتا۔"
  },
  "kunt u herhalen": {
    usage: "بات سنائی دی مگر پوری طرح سمجھ نہ آئے تو مؤدبانہ طور پر دوبارہ کہنے کو کہیں۔",
    exampleDutch: "Ik begrijp het niet. Kunt u herhalen?",
    exampleUrdu: "مجھے سمجھ نہیں آیا۔ کیا آپ دہرا سکتے ہیں؟",
    pronunciation: "کُنٹ یو ہَر ہا لَن",
    confusion: "“kunt u herhalen” بات دوبارہ مانگتا ہے؛ آہستہ رفتار مانگنے کے لیے “langzamer alstublieft” کہیں۔",
    boundary: "یہ پوری بات دوبارہ سننے کے لیے ہے؛ صرف آواز کی رفتار کم کرانے کے لیے نہیں۔",
    contrasts: ["langzamer alstublieft"]
  },
  "langzamer alstublieft": {
    usage: "بات بہت تیز ہو تو مؤدبانہ طور پر آہستہ بولنے کی درخواست کریں۔",
    exampleDutch: "Langzamer, alstublieft.",
    exampleUrdu: "آہستہ بولیں، برائے مہربانی۔",
    pronunciation: "لانگ زامَر، اَلس تُ بلیفٹ",
    confusion: "“langzamer alstublieft” رفتار کم کراتا ہے؛ وہی بات دوبارہ مانگنے کے لیے “kunt u herhalen” کہیں۔",
    boundary: "یہ بولنے کی رفتار کے لیے ہے؛ مطلب پوچھنے یا مدد مانگنے کا الگ فقرہ ہے۔",
    contrasts: ["kunt u herhalen"]
  },
  "nog een keer": {
    usage: "کسی آواز، لفظ، یا مختصر بات کو ایک بار پھر سننے کی ضرورت ہو تو کہیں۔",
    exampleDutch: "Nog een keer, alstublieft.",
    exampleUrdu: "ایک بار پھر، برائے مہربانی۔",
    pronunciation: "نوخ اَن کیر",
    confusion: "“nog een keer” صرف دوبارہ مانگتا ہے؛ معنی پوچھنے کے لیے “wat betekent dit” کہیں۔",
    boundary: "یہ تکرار کی درخواست ہے؛ نامعلوم لفظ کی وضاحت خود نہیں مانگتا۔",
    contrasts: ["wat betekent dit"]
  },
  "kunt u mij helpen": {
    usage: "جب خود اگلا قدم نہ کر سکیں تو مؤدبانہ طور پر سامنے والے سے مدد مانگیں۔",
    exampleDutch: "Kunt u mij helpen?",
    exampleUrdu: "کاؤنٹر پر کہیں: کیا آپ میری مدد کر سکتے ہیں؟",
    pronunciation: "کُنٹ یو مَے ہَیلپَن",
    confusion: "یہ عام مدد مانگتا ہے؛ صرف لفظ کا معنی پوچھنے کے لیے زیادہ مخصوص سوال استعمال کریں۔",
    boundary: "یہ عملی مدد کی درخواست ہے؛ اپنی سمجھ یا زبان کی سطح بتانے والا جملہ نہیں۔"
  },
  "wat betekent dit": {
    usage: "کوئی لفظ، نشان، یا مختصر بات نامعلوم ہو تو اس کا معنی پوچھیں۔",
    exampleDutch: "Wat betekent dit?",
    exampleUrdu: "نامعلوم لفظ دکھا کر پوچھیں: اس کا کیا مطلب ہے؟",
    pronunciation: "واٹ بَتے کَنٹ دِت",
    confusion: "“wat betekent dit” معنی پوچھتا ہے؛ صرف وہی بات دوبارہ سننے کے لیے “nog een keer” کہیں۔",
    boundary: "یہ معنی یا وضاحت کے لیے ہے؛ آواز کی رفتار یا عام مدد کا سوال نہیں۔",
    contrasts: ["nog een keer"]
  },
  "ik spreek een beetje nederlands": {
    usage: "شروع ہی میں بتائیں کہ آپ تھوڑی ڈچ بولتے ہیں تاکہ سامنے والا آسان بات کرے۔",
    exampleDutch: "Ik spreek een beetje Nederlands.",
    exampleUrdu: "گفتگو کے آغاز میں کہیں: میں تھوڑی ڈچ بولتا یا بولتی ہوں۔",
    pronunciation: "اِک سپریک اَن بے چَ نے دَر لانٹس",
    confusion: "یہ زبان کی محدود صلاحیت بتاتا ہے؛ “ik weet het niet” کسی ایک جواب کا معلوم نہ ہونا بتاتا ہے۔",
    boundary: "یہ مجموعی زبان کی سطح بتاتا ہے؛ کسی خاص سوال کا جواب نہ جاننے کا جملہ نہیں۔",
    contrasts: ["ik weet het niet"]
  },
  "ik weet het niet": {
    usage: "کسی خاص سوال کا جواب معلوم نہ ہو تو صاف طور پر بتائیں۔",
    exampleDutch: "Ik weet het niet. Kunt u mij helpen?",
    exampleUrdu: "مجھے معلوم نہیں۔ کیا آپ میری مدد کر سکتے ہیں؟",
    pronunciation: "اِک وےٹ ہَت نیت",
    confusion: "“ik weet het niet” معلومات نہ ہونے کے لیے ہے؛ کم ڈچ بولنے کی عمومی بات الگ ہے۔",
    boundary: "یہ ایک جواب معلوم نہ ہونے کو بتاتا ہے؛ ہر بات سمجھ نہ آنے کا جملہ نہیں۔",
    contrasts: ["ik spreek een beetje Nederlands"]
  },
  "luister alstublieft": {
    usage: "کسی کی توجہ آواز یا اہم مختصر ہدایت کی طرف مؤدبانہ طور پر لائیں۔",
    exampleDutch: "Luister, alstublieft.",
    exampleUrdu: "توجہ دلائیں: سنیں، برائے مہربانی۔",
    pronunciation: "لاؤَیس تَر، اَلس تُ بلیفٹ",
    confusion: "یہ سننے کی ہدایت ہے؛ سامنے والے سے اپنی بات دوبارہ کہلوانے کی درخواست نہیں۔",
    boundary: "یہ دوسرے شخص کو سننے کے لیے کہتا ہے؛ آپ کے نہ سمجھنے کی اطلاع نہیں۔"
  },
  "zeg het nog een keer": {
    usage: "سامنے والے سے وہی بات ایک بار پھر کہلوانے کے لیے سیدھی مگر مؤدبانہ ہدایت دیں۔",
    exampleDutch: "Zeg het nog een keer, alstublieft.",
    exampleUrdu: "اسے ایک بار پھر کہیں، برائے مہربانی۔",
    pronunciation: "زَخ ہَت نوخ اَن کیر",
    confusion: "یہ سامنے والے کو دوبارہ کہنے کی ہدایت ہے؛ صرف “nog een keer” اس کا مختصر حصہ ہے۔",
    boundary: "یہ مکمل ہدایت ہے؛ معنی پوچھنے یا رفتار کم کرانے کے لیے نہیں۔"
  },
  "begrijpt u mij": {
    usage: "اپنی بات کے بعد مؤدبانہ طور پر جانچیں کہ سامنے والے نے آپ کو سمجھا یا نہیں۔",
    exampleDutch: "Begrijpt u mij? — Ja, ik begrijp het.",
    exampleUrdu: "کیا آپ مجھے سمجھتے ہیں؟ — ہاں، میں سمجھ گیا یا گئی۔",
    pronunciation: "بَخرَیپٹ یو مَے",
    confusion: "یہ سامنے والے کی سمجھ پوچھتا ہے؛ اپنی سمجھ کی تصدیق جواب “ja, ik begrijp het” میں ہوتی ہے۔",
    boundary: "یہ سوال ہے، اس لیے جواب درکار ہے؛ اپنی حالت کا سیدھا بیان نہیں۔"
  },
  "ja ik begrijp het": {
    usage: "جب بات سمجھ آ جائے تو ہاں کے ساتھ واضح تصدیق کریں۔",
    exampleDutch: "Begrijpt u mij? — Ja, ik begrijp het.",
    exampleUrdu: "کیا آپ مجھے سمجھتے ہیں؟ — ہاں، میں سمجھ گیا یا گئی۔",
    pronunciation: "یا، اِک بَخرَیپ ہَت",
    confusion: "یہ سمجھ آنے کی تصدیق ہے؛ نہ سمجھ آنے پر اس کے بجائے منفی جملہ کہیں۔",
    boundary: "یہ مثبت جواب ہے؛ سوال، مدد کی درخواست، یا تکرار کی ہدایت نہیں۔"
  },
  ja: {
    usage: "ہاں یا رضامندی کا مختصر، صاف جواب دیں۔",
    exampleDutch: "ja — nee",
    exampleUrdu: "ہاں — نہیں۔",
    pronunciation: "یا",
    confusion: "“ja” رضامندی ہے؛ انکار کے لیے “nee” کہیں۔",
    boundary: "یہ پورے سوال کا مثبت جواب ہے؛ جملے کے اندر نفی بنانے کے لیے نہیں۔",
    contrasts: ["nee"]
  },
  nee: {
    usage: "نہیں یا انکار کا مختصر، صاف جواب دیں۔",
    exampleDutch: "ja — nee",
    exampleUrdu: "ہاں — نہیں۔",
    pronunciation: "نے",
    confusion: "“nee” پورے سوال کا صاف انکار ہے؛ رضامندی کے جواب کے لیے “ja” کہیں۔",
    boundary: "یہ اکیلا منفی جواب ہو سکتا ہے؛ کسی کیفیت کو منفی بنانے والا لفظ الگ ہے۔",
    contrasts: ["ja"]
  },
  goed: {
    usage: "حالت، معیار، یا خیریت اچھی ہو تو مختصر طور پر اچھا کہیں۔",
    exampleDutch: "goed — niet goed",
    exampleUrdu: "اچھا — اچھا نہیں۔",
    pronunciation: "خُوت",
    confusion: "“goed” اچھی حالت ہے؛ منفی حالت کے لیے “niet goed” مکمل حصہ کہیں۔",
    boundary: "یہ مثبت کیفیت بتاتا ہے؛ ہاں والے جواب یا شکریہ کا لفظ نہیں۔",
    contrasts: ["niet goed"]
  },
  niet: {
    usage: "کسی جملے یا کیفیت کو منفی بنانے کے لیے اسے اسی بات کے اندر رکھیں۔",
    exampleDutch: "goed — niet goed",
    exampleUrdu: "اچھا — اچھا نہیں۔",
    pronunciation: "نیت",
    confusion: "“niet” جملے یا کیفیت کے اندر نفی ہے؛ اکیلے انکار کے جواب کے لیے “nee” کہیں۔",
    boundary: "یہ جملے کے اندر کام کرتا ہے؛ پورے سوال کا اکیلا جواب بنانا اس سبق کا ہدف نہیں۔",
    contrasts: ["nee"]
  },
  "niet goed": {
    usage: "حالت یا نتیجہ اچھا نہ ہو تو یہ مکمل مختصر جواب کہیں۔",
    exampleDutch: "goed — niet goed",
    exampleUrdu: "اچھا — اچھا نہیں۔",
    pronunciation: "نیت خُوت",
    confusion: "“niet goed” منفی کیفیت ہے؛ صرف “niet” کہنے سے مطلوبہ کیفیت پوری طرح نہیں بتتی۔",
    boundary: "یہ حالت کی منفی تشخیص ہے؛ صاف انکار یا لاعلمی کا جواب نہیں۔",
    contrasts: ["goed"]
  }
};

function applyA0StartSpeakingTeachingV4(concept) {
  if (!a0StartSpeakingLessonIdsV4.has(concept.introducedInLessonId)) return;
  const record = a0StartSpeakingTeachingV4[normalizedTextV4(concept.dutch)];
  if (!record) return;
  const contrastConceptIds = (record.contrasts || [])
    .map((target) => [...conceptByIdV4.values()].find((candidate) => (
      candidate.introducedInLessonId?.startsWith("a0-")
      && normalizedTextV4(candidate.dutch) === normalizedTextV4(target)
    ))?.id)
    .filter(Boolean);
  Object.assign(concept, {
    usageUrdu: record.usage,
    usageBoundaryUrdu: record.boundary,
    commonConfusionUrdu: record.confusion,
    exampleDutch: record.exampleDutch,
    exampleUrdu: record.exampleUrdu,
    pronunciationUrdu: record.pronunciation,
    pronunciationReview: "a0-start-speaking-manual-v1",
    contrastConceptIds,
    exampleSource: "a0-start-speaking-authored"
  });
  concept.examples = [{
    dutch: record.exampleDutch,
    urdu: record.exampleUrdu
  }];
  if (concept.visual?.kind === "context") {
    concept.visual.descriptionUrdu = record.usage;
  }
}

function authoredCurriculumForLessonV4(lessonId) {
  if (String(lessonId).startsWith("a1-")) return a1AuthoredCurriculumV4;
  if (String(lessonId).startsWith("a2-")) return a2AuthoredCurriculumV4;
  return null;
}

function authoredTeachingRecordV4(concept) {
  const lessonSpec = authoredCurriculumForLessonV4(concept.introducedInLessonId)
    ?.lessons?.[concept.introducedInLessonId];
  return lessonSpec?.teaching?.[normalizedTextV4(concept.dutch)] || null;
}

function applyAuthoredTeachingV4(concept, record) {
  const chapterId = String(concept.introducedInLessonId).slice(0, 2);
  const hasContextualExample = Boolean(record.exampleDutch && record.exampleUrdu);
  Object.assign(concept, {
    usageUrdu: record.usageUrdu,
    usageBoundaryUrdu: record.usageBoundaryUrdu,
    commonConfusionUrdu: record.commonConfusionUrdu,
    exampleDutch: record.exampleDutch,
    exampleUrdu: record.exampleUrdu,
    pronunciationUrdu: record.pronunciationUrdu,
    pronunciationReview: `${chapterId}-authored-manual-v1`,
    guidanceSource: `${chapterId}-authored:${semanticSlugV4(concept.introducedInLessonId)}:${semanticSlugV4(concept.dutch)}`,
    exampleSource: hasContextualExample
      ? `${chapterId}-authored-manual`
      : `${chapterId}-translation-only-omitted`
  });
  concept.examples = hasContextualExample
    ? [{ dutch: record.exampleDutch, urdu: record.exampleUrdu }]
    : [];
  if (concept.visual?.kind === "context") {
    concept.visual.descriptionUrdu = record.usageUrdu;
  }
}

for (const concept of conceptByIdV4.values()) {
  const lesson = chaptersV4
    .flatMap((chapter) => chapter.lessons)
    .find((item) => item.id === concept.introducedInLessonId);
  if (!lesson) continue;
  const authoredRecord = authoredTeachingRecordV4(concept);
  if (authoredRecord) {
    // Manual chapter records are the teaching source of truth. The shared
    // practical-template pass must never replace their authored usage,
    // boundary, confusion, example, or reviewed pronunciation.
    applyAuthoredTeachingV4(concept, authoredRecord);
    continue;
  }
  improveConceptExampleV4(concept, lesson);
  const allowedConceptIds = teachingConceptIdsForV4(concept, lesson);
  concept.usageUrdu = practicalSituationV4(concept, lesson).prompt
    .replace(/^حال:\s*/u, "");
  if (concept.visual?.kind === "context") {
    concept.visual.descriptionUrdu = concept.usageUrdu;
  }
  const unsafeGeneratedExample = [
    "practical-label",
    "practical-travel-label",
    "practical-schedule-label",
    "question-response"
  ].includes(concept.exampleSource)
    || /[?]\s*[—–-]\s*ik weet het niet/i.test(concept.exampleDutch)
    || /[?]\s*[—–-]\s*ja[.!]?$/i.test(concept.exampleDutch)
    || (
      normalizedTextV4(concept.dutch) === "werk"
      && /\bik\s+werk\b/i.test(concept.exampleDutch)
      && !/(?:کرتا|کرتی|کرتے|ہوں|ہو|ہے|ہیں|رہا|رہی|رہے)/u.test(concept.urdu)
    )
    || (/^\s*[^:：]+\s*[:：]\s*1\s*$/u.test(concept.exampleDutch)
      && !/^(nul|een|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|elf|twaalf|dertien|veertien|vijftien|zestien|zeventien|achttien|negentien|twintig|dertig|veertig|vijftig|zestig|zeventig|tachtig|negentig|honderd)\s*[:：]/i.test(concept.exampleDutch));
  if (
    unsafeGeneratedExample
    || unownedTeachingTokensV4(concept.exampleDutch, allowedConceptIds).length
  ) {
    const safeExample = safeTargetOnlyExampleV4(concept, lesson, allowedConceptIds);
    concept.exampleDutch = safeExample.exampleDutch;
    concept.exampleUrdu = safeExample.exampleUrdu;
    concept.exampleSource = safeExample.source;
  }
  concept.commonConfusionUrdu = preciseCommonConfusionV4(
    concept,
    lesson,
    allowedConceptIds
  );
  concept.examples = [{ dutch: concept.exampleDutch, urdu: concept.exampleUrdu }];
  applyA0StartSpeakingTeachingV4(concept);
}

function a0ConceptTeachingPartnerV4(concept, lesson) {
  const allowedConceptIds = teachingConceptIdsForV4(concept, lesson);
  const meaningfulPartner = meaningfulA0ContrastPartnerV4(
    concept,
    lesson,
    allowedConceptIds
  );
  if (meaningfulPartner) return meaningfulPartner;
  const lessonConceptOrder = lessonConceptIdsV4.get(lesson.id) || [];
  const allowedIds = new Set(allowedConceptIds);
  const currentIndex = lessonConceptOrder.indexOf(concept.id);
  return lessonConceptOrder
    .map((conceptId, index) => ({ candidate: conceptByIdV4.get(conceptId), index }))
    .filter(({ candidate }) => (
      candidate
      && candidate.id !== concept.id
      && allowedIds.has(candidate.id)
    ))
    .sort((left, right) => {
      const leftEarlier = left.index < currentIndex ? 0 : 1;
      const rightEarlier = right.index < currentIndex ? 0 : 1;
      const leftRole = left.candidate.role === concept.role ? 0 : 1;
      const rightRole = right.candidate.role === concept.role ? 0 : 1;
      return leftEarlier - rightEarlier
        || leftRole - rightRole
        || Math.abs(left.index - currentIndex) - Math.abs(right.index - currentIndex);
    })[0]?.candidate || null;
}

function a0ConceptUseGuidanceV4(concept, lesson, partner) {
  const dutch = cleanTerminalPunctuationV4(concept.dutch);
  const urdu = cleanTerminalPunctuationV4(concept.urdu);
  const domain = lessonDomainV4(lesson.id);
  const isQuestion = looksLikeDutchQuestionV4(concept.dutch);
  const role = String(concept.role || "").toLowerCase();
  let firstSentence;
  if (lesson.id === "a0-child-school" && normalizedTextV4(dutch) === "brengen") {
    firstSentence = "اسکول کے موقع میں “brengen” بچے کو وہاں لے جا کر چھوڑنے کے لیے ہے۔";
  } else if (lesson.id === "a0-child-school" && normalizedTextV4(dutch) === "ophalen") {
    firstSentence = "اسکول کے موقع میں “ophalen” بچے کو وہاں سے واپس لینے کے لیے ہے۔";
  } else if (role === "sound" || role === "letter" || /^[a-z]$/i.test(dutch)) {
    firstSentence = `لفظ سننے یا پڑھنے سے پہلے “${dutch}” کی شکل اور ڈچ آواز کو “${urdu}” کے طور پر پہچانیں۔`;
  } else if (isQuestion) {
    firstSentence = `جب ${urdu} پوچھنا مقصود ہو تو پورا سوال “${dutch}” استعمال کریں۔`;
  } else if (role === "phrase" || dutchWordsV4(dutch).length > 1) {
    firstSentence = `روزمرہ صورت میں ${urdu} کہنا ہو تو تیار بات “${dutch}” پوری بولیں۔`;
  } else {
    const contexts = {
      sound: "آواز یا تصویر والے کارڈ",
      identity: "تعارف، شخص، یا ذاتی معلومات",
      "number-time": "نمبر، دن، وقت، یا ملاقات",
      home: "گھر، چیز کی جگہ، یا فوری ضرورت",
      "food-shop": "کھانے، دکان، قیمت، یا ادائیگی",
      travel: "راستے، نشان، ٹکٹ، یا سفر",
      health: "علامت، جگہ، دوا، یا فوری مدد",
      school: "بچے یا اسکول کے پیغام",
      work: "کام کے وقت یا اطلاع",
      routine: "روزمرہ عمل یا منصوبے",
      everyday: "روزمرہ گفتگو"
    };
    firstSentence = `${contexts[domain] || contexts.everyday} میں “${dutch}” سے ${urdu} مراد لیں۔`;
  }
  const purposefulPartner = meaningfulA0ContrastPartnerV4(
    concept,
    lesson,
    teachingConceptIdsForV4(concept, lesson)
  );
  if (!partner) return firstSentence;
  if (purposefulPartner) {
    if (["brengen", "ophalen", "ik breng mijn kind naar school", "ik haal mijn kind om drie uur op"]
      .includes(normalizedTextV4(dutch))) return firstSentence;
    return `${firstSentence} فرق یاد رکھیں: “${partner.dutch}” سے ${cleanTerminalPunctuationV4(
      partner.urdu
    )} مراد ہے۔`;
  }
  return `${firstSentence} اسی موقع میں “${partner.dutch}” سے ${cleanTerminalPunctuationV4(
    partner.urdu
  )} مراد ہے۔`;
}

function a0ConceptBoundaryV4(concept, lesson, partner) {
  const dutch = cleanTerminalPunctuationV4(concept.dutch);
  const urdu = cleanTerminalPunctuationV4(concept.urdu);
  const role = String(concept.role || "").toLowerCase();
  const targetKind = role === "sound" || role === "letter"
    ? "حرف یا آواز"
    : looksLikeDutchQuestionV4(concept.dutch)
      ? "سوال"
      : role === "phrase" || dutchWordsV4(dutch).length > 1
        ? "مکمل تیار بات"
        : "لفظ";
  if (!partner) return `“${dutch}” ${urdu} والا ${targetKind} ہے؛ اسے دوسرے معنی یا کام کے لیے استعمال نہ کریں۔`;
  if (normalizedTextV4(dutch) === "brengen") {
    return "“brengen” بچے کو اسکول لے جا کر چھوڑنا ہے؛ “ophalen” وہاں سے واپس لینے آنا ہے۔";
  }
  if (normalizedTextV4(dutch) === "ophalen") {
    return "“ophalen” بچے کو اسکول سے واپس لینے آنا ہے؛ “brengen” اسے وہاں چھوڑنا ہے۔";
  }
  if (normalizedTextV4(dutch) === "ik breng mijn kind naar school") {
    return "یہ بچے کو اسکول چھوڑنے کی بات ہے؛ “ik haal mijn kind … op” واپس لینے کی بات ہے۔";
  }
  if (normalizedTextV4(dutch) === "ik haal mijn kind om drie uur op") {
    return "یہ بچے کو تین بجے واپس لینے کی بات ہے؛ “ik breng mijn kind …” اسکول چھوڑنے کی بات ہے۔";
  }
  const purposefulPartner = meaningfulA0ContrastPartnerV4(
    concept,
    lesson,
    teachingConceptIdsForV4(concept, lesson)
  );
  if (purposefulPartner) {
    if (targetKind === "سوال") {
      return `“${dutch}” ${urdu} پوچھنے کا مکمل سوال ہے؛ اسے جواب یا صرف ایک لفظ نہ سمجھیں۔`;
    }
    if (targetKind === "مکمل تیار بات") {
      return `“${dutch}” ${urdu} کی مکمل بات ہے؛ ضروری لفظ چھوڑ کر اسے ادھورا نہ کریں۔`;
    }
    return `“${dutch}” ${urdu} کا مخصوص لفظ ہے؛ مطلوبہ شخص، چیز، جگہ، یا عمل بدلنے پر دوسرا لفظ چنیں۔`;
  }
  if (targetKind === "سوال") {
    return `“${dutch}” ${urdu} پوچھنے کا مکمل سوال ہے؛ اسے جواب یا صرف ایک لفظ نہ سمجھیں۔`;
  }
  if (targetKind === "مکمل تیار بات") {
    return `“${dutch}” ${urdu} کی مکمل بات ہے؛ ضروری لفظ چھوڑ کر اسے ادھورا نہ کریں۔`;
  }
  if (targetKind === "حرف یا آواز") {
    return `“${dutch}” ${urdu} والی آواز ہے؛ اسے پورا ڈچ لفظ نہ سمجھیں۔`;
  }
  return `“${dutch}” ${urdu} کا لفظ ہے؛ شخص، چیز، حالت، یا عمل بدلنے پر دوسرا لفظ درکار ہوگا۔`;
}

function a0ConceptConfusionGuidanceV4(concept, lesson, partner) {
  const precise = preciseCommonConfusionV4(
    concept,
    lesson,
    teachingConceptIdsForV4(concept, lesson)
  );
  const cleanPrecise = cleanTerminalPunctuationV4(precise);
  const generic = (
    /تصویر\s+میں.+کا\s+نام\s+ہے؛\s*اسے\s+کسی\s+عمل\s+یا\s+کیفیت/u.test(cleanPrecise)
    || /مخصوص\s+معنی\s+دیتا\s+ہے؛\s*اسے\s+دوسرے\s+کام\s+یا\s+چیز/u.test(cleanPrecise)
    || /مکمل\s+تیار\s+بات\s+ہے؛.+ادھورا\s+چھوڑے\s+بغیر/u.test(cleanPrecise)
    || /سوال\s+ہے؛\s*جواب\s+دیتے\s+وقت/u.test(cleanPrecise)
  );
  if (!generic) return `${cleanPrecise}۔`;
  const pronunciation = cleanTerminalPunctuationV4(concept.pronunciationUrdu);
  if (looksLikeDutchQuestionV4(concept.dutch)) {
    return `سوال کی آواز ${pronunciation} سے پہچانیں؛ جواب والی ترتیب لگا کر سوال کا آغاز نہ ہٹائیں۔`;
  }
  if (concept.role === "phrase" || dutchWordsV4(concept.dutch).length > 1) {
    return `پوری بات کی آواز ${pronunciation} سنیں؛ ضروری لفظ یا الگ ہونے والا آخری حصہ نہ چھوڑیں۔`;
  }
  if (concept.role === "sound" || concept.role === "letter") {
    return `ڈچ آواز ${pronunciation} سنیں؛ اردو حرف کی مانوس آواز خود سے نہ لگائیں۔`;
  }
  return `لفظ کی آواز ${pronunciation} کو ${cleanTerminalPunctuationV4(
    concept.urdu
  )} کے معنی سے ملائیں؛ صرف تصویر کی شکل پر اندازہ نہ لگائیں۔`;
}

for (const concept of conceptByIdV4.values()) {
  if (!concept.introducedInLessonId?.startsWith("a0-")) continue;
  if (a0StartSpeakingLessonIdsV4.has(concept.introducedInLessonId)) continue;
  const lesson = chaptersV4
    .flatMap((chapter) => chapter.lessons)
    .find((item) => item.id === concept.introducedInLessonId);
  if (!lesson) continue;
  const partner = a0ConceptTeachingPartnerV4(concept, lesson);
  const purposefulPartner = meaningfulA0ContrastPartnerV4(
    concept,
    lesson,
    teachingConceptIdsForV4(concept, lesson)
  );
  if (purposefulPartner) {
    concept.contrastConceptIds = uniqueV4([
      ...(concept.contrastConceptIds || []),
      purposefulPartner.id
    ]);
  }
  concept.usageUrdu = a0ConceptUseGuidanceV4(concept, lesson, partner);
  concept.usageBoundaryUrdu = a0ConceptBoundaryV4(concept, lesson, partner);
  concept.commonConfusionUrdu = a0ConceptConfusionGuidanceV4(concept, lesson, partner);
  if (normalizedTextV4(concept.dutch) === "zijn" && lesson.id === "a0-possessive") {
    concept.exampleDutch = "mijn — zijn";
    concept.exampleUrdu = "اپنی چیز کے لیے “mijn”، مرد کی چیز کے لیے “zijn”۔";
    concept.exampleSource = "a0-possessive-owned-contrast";
  }
  concept.examples = [{ dutch: concept.exampleDutch, urdu: concept.exampleUrdu }];
  if (concept.visual?.kind === "context") {
    concept.visual.descriptionUrdu = concept.usageUrdu;
  }
}

const a0ReviewedTeachingOverridesV4 = {
  "a0-ik-jij-u|ik": {
    exampleDutch: "ik — jij",
    exampleUrdu: "اپنے لیے “ik”، سامنے والے جان پہچان کے شخص کے لیے “jij”۔"
  },
  "a0-ik-jij-u|jij": {
    exampleDutch: "ik — jij",
    exampleUrdu: "اپنے لیے “ik”، سامنے والے جان پہچان کے شخص کے لیے “jij”۔"
  },
  "a0-ik-jij-u|u": {
    exampleDutch: "jij — u",
    exampleUrdu: "دوست کے لیے “jij”، ڈاکٹر یا دفتر میں ادب سے “u”۔"
  },
  "a0-possessive|zijn boek": {
    urdu: "اس مرد کی کتاب"
  },
  "a0-possessive|haar pen": {
    urdu: "اس عورت کا قلم"
  },
  "a0-numbers-0-10|twee boeken": {
    exampleDutch: "twee boeken: 2",
    exampleUrdu: "فہرست میں دو کتابیں: 2۔"
  },
  "a0-numbers-0-10|drie kinderen": {
    exampleDutch: "drie kinderen: 3",
    exampleUrdu: "کلاس کی فہرست میں تین بچے: 3۔"
  },
  "a0-numbers-0-10|bus acht": {
    exampleDutch: "bus acht: bus 8",
    exampleUrdu: "بس کے نشان پر نمبر آٹھ: بس 8۔"
  },
  "a0-numbers-0-10|vier euro": {
    exampleDutch: "vier euro: €4",
    exampleUrdu: "قیمت چار یورو: €4۔"
  },
  "a0-time-days|ik kom morgen": {
    exampleDutch: "morgen: ik kom",
    exampleUrdu: "کل: میں آتا یا آتی ہوں۔"
  },
  "a0-date-appointment|te vroeg": {
    urdu: "وقت سے پہلے"
  },
  "a0-food-drink|melk": {
    exampleDutch: "melk — water",
    exampleUrdu: "دودھ کے لیے “melk”، پانی کے لیے “water”۔"
  },
  "a0-food-drink|koffie": {
    exampleDutch: "koffie — thee",
    exampleUrdu: "کافی کے لیے “koffie”، چائے کے لیے “thee”۔"
  },
  "a0-food-drink|thee": {
    exampleDutch: "koffie — thee",
    exampleUrdu: "کافی کے لیے “koffie”، چائے کے لیے “thee”۔"
  },
  "a0-food-drink|fruit": {
    exampleDutch: "fruit — groente",
    exampleUrdu: "پھل کے لیے “fruit”، سبزیوں کے لیے “groente”۔"
  },
  "a0-food-drink|groente": {
    exampleDutch: "fruit — groente",
    exampleUrdu: "پھل کے لیے “fruit”، سبزیوں کے لیے “groente”۔"
  },
  "a0-shopping-payment|winkel": {
    exampleDutch: "winkel — supermarkt",
    exampleUrdu: "عام دکان “winkel”، بڑی خوراک کی دکان “supermarkt”۔"
  },
  "a0-shopping-payment|supermarkt": {
    exampleDutch: "winkel — supermarkt",
    exampleUrdu: "عام دکان “winkel”، بڑی خوراک کی دکان “supermarkt”۔"
  },
  "a0-shopping-payment|kassa": {
    exampleDutch: "prijs — kassa",
    exampleUrdu: "پہلے “prijs” یعنی قیمت دیکھیں، پھر ادائیگی کے لیے “kassa” پر جائیں۔"
  },
  "a0-shopping-payment|goedkoop": {
    exampleDutch: "goedkoop — duur",
    exampleUrdu: "سستی چیز “goedkoop”، مہنگی چیز “duur”۔"
  },
  "a0-shopping-payment|duur": {
    exampleDutch: "goedkoop — duur",
    exampleUrdu: "سستی چیز “goedkoop”، مہنگی چیز “duur”۔"
  },
  "a0-child-school|klas": {
    exampleDutch: "klas: 2",
    exampleUrdu: "اسکول فارم پر جماعت: 2۔"
  },
  "a0-child-school|brengen": {
    exampleDutch: "brengen — ophalen",
    exampleUrdu: "اسکول چھوڑنے کے لیے “brengen”، واپس لینے کے لیے “ophalen”۔"
  },
  "a0-child-school|ophalen": {
    exampleDutch: "brengen — ophalen",
    exampleUrdu: "اسکول چھوڑنے کے لیے “brengen”، واپس لینے کے لیے “ophalen”۔"
  },
  "a0-child-school|schooltijd": {
    exampleDutch: "schooltijd: 08:30",
    exampleUrdu: "اسکول شروع ہونے کا وقت: 08:30۔"
  },
  "a0-child-school|ik breng mijn kind naar school": {
    urdu: "میں اپنے بچے کو اسکول چھوڑتا / چھوڑتی ہوں",
    exampleDutch: "vandaag: ik breng mijn kind naar school",
    exampleUrdu: "آج: میں اپنے بچے کو اسکول چھوڑتا یا چھوڑتی ہوں۔"
  },
  "a0-child-school|ik haal mijn kind om drie uur op": {
    urdu: "میں اپنے بچے کو تین بجے لینے آتا / آتی ہوں",
    exampleDutch: "vandaag: ik haal mijn kind om drie uur op",
    exampleUrdu: "آج: میں اپنے بچے کو تین بجے لینے آتا یا آتی ہوں۔"
  },
  "a0-work-basics|pauze": {
    exampleDutch: "pauze: 12:30",
    exampleUrdu: "کام کے شیڈول میں وقفہ: 12:30۔"
  },
  "a0-weather-clothing-safety|waar is de uitgang": {
    urdu: "باہر جانے کا راستہ کہاں ہے؟"
  }
};

for (const concept of conceptByIdV4.values()) {
  const lessonId = concept.introducedInLessonId;
  if (!lessonId?.startsWith("a0-")) continue;
  const override = a0ReviewedTeachingOverridesV4[
    `${lessonId}|${normalizedTextV4(concept.dutch)}`
  ];
  if (!override) continue;
  if (override.urdu) {
    concept.urdu = override.urdu;
    concept.translationAliasesUrdu = uniqueV4([
      override.urdu,
      ...(concept.translationAliasesUrdu || [])
    ]);
    const lesson = chaptersV4
      .flatMap((chapter) => chapter.lessons)
      .find((item) => item.id === lessonId);
    const partner = lesson ? a0ConceptTeachingPartnerV4(concept, lesson) : null;
    if (lesson) {
      concept.usageUrdu = a0ConceptUseGuidanceV4(concept, lesson, partner);
      concept.usageBoundaryUrdu = a0ConceptBoundaryV4(concept, lesson, partner);
      concept.commonConfusionUrdu = a0ConceptConfusionGuidanceV4(concept, lesson, partner);
    }
  }
  if (override.exampleDutch) concept.exampleDutch = override.exampleDutch;
  if (override.exampleUrdu) concept.exampleUrdu = override.exampleUrdu;
  if (override.pronunciationUrdu) concept.pronunciationUrdu = override.pronunciationUrdu;
  concept.examples = [{
    dutch: concept.exampleDutch,
    urdu: concept.exampleUrdu
  }];
  concept.exampleSource = "a0-manual-review";
  if (concept.visual?.kind === "context") {
    concept.visual.descriptionUrdu = concept.usageUrdu;
  }
}

function registerConceptSkillV4(concept) {
  if (skillIdByConceptIdV4.has(concept.id)) return skillIdByConceptIdV4.get(concept.id);
  const id = `skill:${concept.id.slice("concept:".length)}`;
  const introducedLesson = chaptersV4
    .flatMap((chapter) => chapter.lessons)
    .find((lesson) => lesson.id === concept.introducedInLessonId);
  const chapterId = introducedLesson ? introducedLesson.id.slice(0, 2) : concept.chapterIds[0];
  const skill = {
    id,
    conceptId: concept.id,
    conceptIds: [concept.id],
    patternId: null,
    targetId: concept.id,
    chapterId,
    introducedInLessonId: concept.introducedInLessonId,
    labelUrdu: `${concept.dutch} سمجھنا اور استعمال کرنا`,
    canDoUrdu: `سیکھنے والا “${concept.dutch}” کا مطلب سمجھ کر مناسب موقع میں استعمال کر سکتا ہے۔`,
    evidenceTypes: ["meaning", "listening", "reading", "speaking-support", "practical-use"],
    masteryStates: ["introduced", "practiced", "secure"]
  };
  skillByIdV4.set(id, skill);
  skillIdByConceptIdV4.set(concept.id, id);
  return id;
}

for (const concept of conceptByIdV4.values()) registerConceptSkillV4(concept);

const a0AuthoredPatternSpecsV4 = {
  "a0-ben-bent-is": {
    modelDutch: "ik ben Ali",
    titleUrdu: "شخص کے ساتھ ہوں، ہیں، یا ہے کی شکل",
    highlight: "ben",
    explanationUrdu: "پہلے دیکھیں بات کس شخص کے بارے میں ہے۔ اپنے لیے ik ben اور جان پہچان والے سامنے کے شخص کے لیے jij bent کہیں۔",
    contrastUrdu: "ik کے ساتھ ben آتا ہے، مگر jij کے ساتھ bent؛ پہلے شخص دیکھیں، پھر درست جوڑا بولیں۔",
    commonMistakeUrdu: "ik bent یا jij ben نہ کہیں۔ پہلے سیکھی ہوئی جوڑی ik ben اور jij bent پوری یاد رکھیں۔"
  },
  "a0-hebben-1": {
    modelDutch: "ik heb een boek",
    titleUrdu: "کس کے پاس کیا ہے",
    highlight: "heb",
    explanationUrdu: "حقیقی چیز سے شروع کریں: ik heb een boek یعنی میرے پاس ایک کتاب ہے۔ سامنے والا بدلنے پر jij hebt اور دوسرے شخص کے لیے hij heeft یا zij heeft آتا ہے۔",
    contrastUrdu: "ik heb اپنے پاس ہونے کی بات ہے؛ hij heeft کسی دوسرے مرد کے پاس ہونے کی بات ہے۔",
    commonMistakeUrdu: "ik heeft یا hij heb نہ کہیں۔ پہلے شخص دیکھیں، پھر heb، hebt، یا heeft چنیں۔"
  },
  "a0-gaan-komen": {
    modelDutch: "ik ga naar huis",
    titleUrdu: "جانا اور آنا الگ رکھیں",
    highlight: "ga",
    explanationUrdu: "جگہ کی طرف اپنی روانگی کے لیے ik ga کہیں۔ ایک دوسرے مرد کے جانے کی بات میں hij gaat آتا ہے۔",
    contrastUrdu: "اپنے لیے ik ga، دوسرے مرد کے لیے hij gaat؛ شخص بدلنے سے آخر میں چھوٹی تبدیلی آتی ہے۔",
    commonMistakeUrdu: "ik gaat یا hij ga نہ کہیں۔ پہلے سیکھی ہوئی جوڑی ik ga اور hij gaat پوری یاد رکھیں۔"
  },
  "a0-geen": {
    modelDutch: "ik heb geen boek",
    titleUrdu: "کوئی چیز پاس نہ ہونا",
    highlight: "geen",
    explanationUrdu: "جب کوئی شخص یا چیز موجود نہ ہو تو اس کے نام سے پہلے geen رکھیں: ik heb geen boek یعنی میرے پاس کتاب نہیں ہے۔",
    contrastUrdu: "geen چیز کے نام سے پہلے آتا ہے، جیسے geen boek؛ کیفیت کے ساتھ پہلے سیکھا ہوا niet آتا ہے، جیسے niet goed۔",
    commonMistakeUrdu: "ik heb niet boek نہ کہیں۔ کتاب نہ ہونے کے لیے ik heb geen boek کہیں۔"
  },
  "a0-spelling-personal-details": {
    modelDutch: "mijn naam is Sara",
    titleUrdu: "اپنا نام مکمل طور پر بتانا",
    highlight: "mijn naam is",
    explanationUrdu: "رجسٹریشن یا فون پر اپنا نام بتانے کے لیے mijn naam is کے بعد نام کہیں: mijn naam is Sara۔",
    contrastUrdu: "voornaam پہلے نام کا خانہ ہے اور achternaam خاندانی نام کا؛ بولتے وقت مکمل بات mijn naam is … سے شروع کریں۔",
    commonMistakeUrdu: "ik naam یا mijn naam اکیلا نہ چھوڑیں۔ مکمل بات mijn naam is … کہیں۔"
  },
  "a0-address-phone": {
    modelDutch: "wat is uw adres?",
    titleUrdu: "پتہ پوچھنا اور مکمل جواب دینا",
    highlight: "uw adres",
    explanationUrdu: "کاؤنٹر پر پتہ پوچھنے کے لیے wat is uw adres? کہیں۔ جواب میں مکمل سڑک اور گھر نمبر دیں: ik woon op Marktstraat 12۔",
    contrastUrdu: "adres پورا پتہ ہے؛ postcode صرف پوسٹ کوڈ اور telefoonnummer صرف فون نمبر ہے۔",
    commonMistakeUrdu: "صرف adres? کہنے کے بجائے مکمل سوال wat is uw adres? کہیں، پھر جواب میں سڑک اور گھر نمبر نہ چھوڑیں۔"
  },
  "a0-naar-met": {
    modelDutch: "ik ga naar huis",
    titleUrdu: "منزل یا ساتھ موجود شخص بتانا",
    highlight: "naar",
    explanationUrdu: "کسی منزل کی طرف جانے کے لیے naar استعمال کریں: ik ga naar huis یعنی میں گھر جاتا یا جاتی ہوں۔",
    contrastUrdu: "naar منزل بتاتا ہے، جیسے naar huis؛ met ساتھ موجود شخص بتاتا ہے، جیسے met mijn kind۔",
    commonMistakeUrdu: "ساتھ کے لیے naar اور منزل کے لیے met نہ کہیں۔ منزل کے ساتھ naar، شخص کے ساتھ met رکھیں۔"
  }
};

function makePatternV4(lesson, chapterId, conceptIds) {
  const explanation = lesson.questions.find((question) => question.type === "uitleg");
  const chapterAuthoredSpec = authoredCurriculumForLessonV4(lesson.id)?.lessons?.[lesson.id];
  if (chapterAuthoredSpec?.pattern === false) return null;
  const authoredSpec = a0AuthoredPatternSpecsV4[lesson.id]
    || a1AuthoredCurriculumV4.lessons[lesson.id]?.pattern
    || a2AuthoredCurriculumV4.lessons[lesson.id]?.pattern
    || null;
  if (!explanation && !authoredSpec) return null;
  const firstRunCap = chapterId === "a0" ? 3 : chapterId === "a1" ? 5 : 4;
  const firstRunConceptIds = conceptIds.slice(0, firstRunCap);
  const defaultModelConcept = firstRunConceptIds
    .map((conceptId) => conceptByIdV4.get(conceptId))
    .find((concept) => isCompletePatternModelV4(concept?.dutch));
  const authoredModelConcept = authoredSpec
    ? (["a1", "a2"].includes(chapterId) ? conceptIds : firstRunConceptIds)
      .map((conceptId) => conceptByIdV4.get(conceptId))
      .find((concept) => (
        normalizedTextV4(concept?.dutch) === normalizedTextV4(authoredSpec.modelDutch)
      ))
    : null;
  const modelConcept = authoredModelConcept || (lesson.id === "a0-understanding-help"
    ? firstRunConceptIds
      .map((conceptId) => conceptByIdV4.get(conceptId))
      .find((concept) => /^kunt u\b/i.test(String(concept?.dutch || "")))
    : defaultModelConcept);
  // A pattern is a complete, reusable sentence or communication function.
  // Standalone words and sounds still receive full teaching cards, but must
  // not be dressed up as grammar by borrowing a later phrase.
  if (!modelConcept) return null;
  const points = (explanation?.points || []).map(String).filter(Boolean);
  const modelDutch = modelConcept.dutch;
  const modelUrdu = canonicalUrduForDutchV4(
    lesson,
    modelConcept.dutch,
    modelConcept.urdu
  );
  const id = `pattern:${lesson.id}`;
  const rawMistake = String(explanation?.note || points[points.length - 1] || "");
  const genericMistake = /(?:پہلے\s+سنیں|پورے\s+فقروں\s+کی\s+طرح\s+یاد\s+کریں|دوبارہ\s+دیکھیں|مثال\s+دیکھ)/u.test(rawMistake);
  const pattern = {
    id,
    semanticKey: lesson.id,
    lessonId: lesson.id,
    chapterId,
    modelConceptId: modelConcept.id,
    conceptIds: [modelConcept.id],
    titleUrdu: String(explanation?.prompt || "اس سبق کا آسان اصول"),
    modelDutch,
    modelUrdu,
    highlight: dutchWordsV4(modelDutch).slice(0, 2).join(" ") || modelDutch,
    explanationUrdu: points.join(" ") || String(explanation?.note || "مثال دیکھ کر اصول سمجھیں۔"),
    contrastUrdu: points[1] || points[0] || "مثال میں بدلنے والے حصے کو غور سے دیکھیں۔",
    commonMistakeUrdu: genericMistake
      ? String(modelConcept.commonConfusionUrdu || `“${modelDutch}” کو مکمل بات کی طرح استعمال کریں۔`)
      : (rawMistake || String(modelConcept.commonConfusionUrdu || `“${modelDutch}” کو مکمل بات کی طرح استعمال کریں۔`)),
    audioText: modelConcept.audioText || modelConcept.dutch
  };
  if (lesson.id === "a0-understanding-help") {
    Object.assign(pattern, {
      titleUrdu: "ادب سے Kunt u …? کہنا",
      modelDutch: "Kunt u herhalen?",
      modelUrdu: "کیا آپ دہرا سکتے ہیں؟",
      highlight: "Kunt u …?",
      explanationUrdu: "Kunt u …? سے مؤدبانہ سوال یا درخواست شروع ہوتی ہے؛ اس کے بعد مطلوبہ کام آتا ہے۔",
      contrastUrdu: "Langzamer, alstublieft رفتار کم کرنے کی مختصر درخواست ہے؛ Kunt u herhalen? پوری بات دوبارہ مانگتا ہے۔",
      commonMistakeUrdu: "Kunt herhalen? میں u غائب ہے۔ درست مؤدبانہ سوال Kunt u herhalen? ہے۔",
      audioText: "Kunt u herhalen?"
    });
  }
  if (authoredSpec) {
    Object.assign(pattern, {
      ...authoredSpec,
      modelUrdu,
      audioText: authoredSpec.modelDutch
    });
  }
  const skillId = `skill:${id.slice("pattern:".length)}`;
  pattern.skillId = skillId;
  skillByIdV4.set(skillId, {
    id: skillId,
    conceptId: null,
    // A1 keeps the reusable sentence pattern as a distinct mastery target.
    // The model concept is already owned by its concept skill; duplicating it
    // here makes prerequisite previews show the same Dutch answer twice.
    conceptIds: chapterId === "a1" ? [] : [modelConcept.id],
    patternId: id,
    targetId: id,
    chapterId,
    introducedInLessonId: lesson.id,
    labelUrdu: `${pattern.titleUrdu} سمجھنا اور استعمال کرنا`,
    canDoUrdu: `سیکھنے والا “${pattern.titleUrdu}” کا اصول مثال میں پہچان کر استعمال کر سکتا ہے۔`,
    evidenceTypes: ["meaning", "reading", "practical-use"],
    masteryStates: ["introduced", "practiced", "secure"]
  });
  patternsV4.push(pattern);
  return pattern;
}

function questionTargetTextsV4(question) {
  const texts = [
    question.prompt,
    question.answer,
    question.speak,
    ...(question.tiles || []),
    ...((question.document?.rows || []).map((row) => row.value)),
    ...(question.points || [])
  ];
  return uniqueV4(texts.map(String).filter(Boolean));
}

function matchQuestionConceptIdsV4(question, lessonId, fallbackIds) {
  const authoredId = question.conceptId
    ? authoredConceptIdsV4.get(lessonId)?.get(String(question.conceptId))
    : null;
  if (authoredId) return [authoredId];

  const texts = questionTargetTextsV4(question);
  const normalizedTexts = texts.map(normalizedTextV4).filter(Boolean);
  const exact = [];
  const partial = [];

  for (const conceptId of fallbackIds) {
    const concept = conceptByIdV4.get(conceptId);
    if (!concept) continue;
    const dutch = normalizedTextV4(concept.dutch);
    const urdu = normalizedTextV4(concept.urdu);
    if (normalizedTexts.includes(dutch) || normalizedTexts.includes(urdu)) {
      exact.push(conceptId);
      continue;
    }
    if (dutchWordsV4(concept.dutch).length > 1
      && normalizedTexts.some((text) => text.includes(dutch))) {
      partial.push(conceptId);
    }
  }

  if (exact.length) return uniqueV4(exact).slice(0, 3);
  if (partial.length) return uniqueV4(partial).slice(0, 3);
  return fallbackIds.length ? [fallbackIds[0]] : [];
}

function defaultExercisePhaseV4(question) {
  if (question.type === "uitleg") return "learn";
  if (["meaning", "image-choice", "listen-choice", "document-choice"].includes(question.type)) return "understand";
  if (["reverse", "fill-gap", "build", "sequence", "speak-repeat"].includes(question.type)) return "guided-practice";
  if (question.type === "situation") return "use";
  if (question.type === "short-input") return "independent-check";
  return "guided-practice";
}

function instructionForQuestionV4(question, concepts) {
  if (question.type === "uitleg") {
    return "مثال دیکھیں اور آسان وضاحت پڑھیں؛ اس حصے پر نمبر نہیں۔";
  }
  if (question.type === "meaning") {
    return "اوپر دی گئی ڈچ بات کا درست اردو مطلب منتخب کریں۔";
  }
  if (question.type === "reverse") {
    return "دیے گئے معنی کا درست ڈچ جواب منتخب کریں۔";
  }
  if (question.type === "image-choice") {
    return "تصویر دیکھیں اور درست ڈچ لفظ یا بات منتخب کریں۔";
  }
  if (question.type === "listen-choice") {
    return "آواز سنیں اور درست جواب منتخب کریں۔";
  }
  if (question.type === "fill-gap") {
    return "خالی جگہ کے لیے درست ڈچ لفظ منتخب کریں۔";
  }
  if (question.type === "situation") {
    return "صورت پڑھیں اور مناسب ڈچ جواب منتخب کریں۔";
  }
  if (question.type === "build") {
    return "دیے گئے الفاظ سے درست ڈچ جملہ بنائیں۔";
  }
  if (question.type === "document-choice") {
    return "دستاویز پڑھیں اور مانگی گئی ڈچ بات کا درست اردو مطلب منتخب کریں۔";
  }
  if (question.type === "sequence") {
    return "قدموں کو شروع سے آخر تک درست ترتیب میں رکھیں۔";
  }
  if (question.type === "speak-repeat") {
    return "آہستہ آڈیو سنیں اور بلند آواز میں دہرائیں؛ اس پر نمبر نہیں۔";
  }
  if (question.type === "short-input") {
    return "مختصر ڈچ جواب لکھیں، یا ضرورت پر لفظوں کا بینک استعمال کریں۔";
  }
  return "سوال غور سے پڑھیں اور سیکھی ہوئی بات کے مطابق جواب دیں۔";
}

function hintForQuestionV4(question, concepts) {
  if (question.hint) return String(question.hint);
  if (question.note) return String(question.note);
  if (question.type === "uitleg") return "پہلے آواز سنیں، پھر مثال کا مطلب دیکھیں۔";
  if (question.type === "listen-choice") return "آواز دوبارہ اور آہستہ سن سکتے ہیں۔";
  if (question.type === "image-choice") return "تصویر کی اصل چیز یا عمل پر توجہ دیں۔";
  if (question.type === "meaning" || question.type === "reverse") {
    return "پہلے مرکزی لفظ پہچانیں، پھر پورے معنی سے ملائیں۔";
  }
  if (question.type === "fill-gap") return "پورا جملہ ذہن میں بول کر خالی جگہ سنیں۔";
  if (question.type === "build" || question.type === "sequence") {
    return "پہلے کام کرنے والا شخص، پھر فعل، پھر باقی بات رکھیں۔";
  }
  if (question.type === "situation") return "شخص، جگہ، وقت، اور مقصد پر توجہ دیں۔";
  if (question.type === "document-choice") return "سوال میں مانگی گئی قطار دوبارہ دیکھیں۔";
  if (question.type === "speak-repeat") return "آہستہ آواز استعمال کریں اور لفظ بہ لفظ دہرائیں۔";
  if (question.type === "short-input") return "مشکل ہو تو لفظوں کا بینک کھولیں؛ آزاد ٹائپنگ لازمی نہیں۔";
  return "سوال میں مانگی گئی ایک بات پر دوبارہ توجہ دیں۔";
}

function semanticExerciseKeyV4(question, scopeId) {
  const source = String(
    question.semanticKey
    || question.id
    || [
      scopeId,
      question.generatedConceptId,
      question.missionStage,
      question.variantSlot,
      question.type
    ].filter(Boolean).join(":")
  )
    .replace(/^synthetic:/, "")
    .replace(/^concept:/, "")
    .replace(/[^A-Za-z0-9:_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return source || `${semanticSlugV4(question.type, "question")}:item`;
}

function semanticExerciseIdV4(lessonId, question, scopeId = lessonId) {
  const semanticKey = semanticExerciseKeyV4(question, scopeId);
  return `${lessonId}:exercise:${semanticSlugV4(question.type, "question")}:${semanticKey}`;
}

function conceptForOptionV4(value, conceptIds) {
  const normalizedValue = normalizedTextV4(value);
  return uniqueV4(conceptIds)
    .map((conceptId) => conceptByIdV4.get(conceptId))
    .find((concept) => (
      normalizedTextV4(concept?.dutch) === normalizedValue
      || normalizedTextV4(concept?.urdu) === normalizedValue
      || (concept?.translationAliasesUrdu || [])
        .some((alias) => normalizedTextV4(alias) === normalizedValue)
    )) || null;
}

function optionFeedbackUrduV4(question, targetConcept, availableConceptIds) {
  if (!Array.isArray(question.options) || !question.options.length || !targetConcept) {
    return {};
  }
  const correct = normalizedTextV4(question.answer);
  const answerIsDutch = normalizedTextV4(targetConcept.dutch) === correct;
  const targetMeaning = cleanTerminalPunctuationV4(targetConcept.urdu);
  const feedback = {};
  for (const option of question.options) {
    if (normalizedTextV4(option) === correct) continue;
    const distractor = conceptForOptionV4(option, availableConceptIds);
    if (distractor) {
      feedback[String(option)] = answerIsDutch
        ? `“${option}” = “${cleanTerminalPunctuationV4(distractor.urdu)}”؛ یہاں درست ڈچ “${targetConcept.dutch}” ہے۔`
        : `“${option}” یہاں غلط مطلب ہے؛ “${targetConcept.dutch}” = “${targetMeaning}”۔`;
    } else {
      feedback[String(option)] = answerIsDutch
        ? `“${option}” یہاں درست نہیں؛ درست ڈچ “${targetConcept.dutch}” ہے۔`
        : `“${option}” یہاں درست نہیں؛ “${targetConcept.dutch}” = “${targetMeaning}”۔`;
    }
  }
  return feedback;
}

function annotateQuestionV4({ lesson, question, conceptIds, pattern, scopeId, allowedSkillIds = null }) {
  const explicitConceptId = question.generatedConceptId;
  const matchedConceptIds = explicitConceptId && conceptIds.includes(explicitConceptId)
    ? [explicitConceptId]
    : matchQuestionConceptIdsV4(question, lesson.id, conceptIds);
  const concepts = matchedConceptIds.map((id) => conceptByIdV4.get(id)).filter(Boolean);
  let skillIds = matchedConceptIds
    .map((id) => skillIdByConceptIdV4.get(id))
    .filter(Boolean);
  if (pattern && question.type === "uitleg") skillIds.unshift(pattern.skillId);
  skillIds = uniqueV4(skillIds);

  if (allowedSkillIds) {
    const allowed = new Set(allowedSkillIds);
    skillIds = skillIds.filter((id) => allowed.has(id));
    if (!skillIds.length && allowedSkillIds.length) {
      const text = questionTargetTextsV4(question).join(" ");
      const overlapping = allowedSkillIds.find((skillId) => {
        const skill = skillByIdV4.get(skillId);
        const concept = skill?.conceptId ? conceptByIdV4.get(skill.conceptId) : null;
        return concept && hasUsefulOverlapV4(text, concept.dutch);
      });
      skillIds = [overlapping || allowedSkillIds[0]];
    }
  }

  const incomingId = String(question.id || "");
  const semanticKey = incomingId.startsWith("synthetic:")
    || question.generatedConceptId
    ? semanticExerciseKeyV4(question, scopeId)
    : [
      "retired-source",
      semanticSlugV4(question.type, "question"),
      semanticSlugV4(concepts[0]?.dutch, "target"),
      semanticSlugV4(question.answer || question.prompt, "item"),
      semanticSlugV4(incomingId, "legacy")
    ].join(":");
  const legacyId = incomingId.startsWith("synthetic:")
    ? ""
    : String(question.legacyId || incomingId);
  const instructionUrdu = instructionForQuestionV4(question, concepts);
  const hintUrdu = hintForQuestionV4(question, concepts);
  const targetSummary = concepts.length
    ? concepts.map((concept) => `“${concept.dutch}” = “${concept.urdu}”`).join("، ")
    : `صحیح جواب “${question.answer}”`;
  const correctExplanation = question.type === "uitleg"
    ? String(question.explain || "یہ تدریسی مثال اگلی مشق کی تیاری ہے۔")
    : `درست۔ ${targetSummary}۔`;
  const optionExplanationsUrdu = optionFeedbackUrduV4(
    question,
    concepts[0],
    conceptIds
  );
  const wrongExplanation = question.type === "uitleg"
    ? "مثال اور آسان اصول دوبارہ پڑھیں، پھر اگلی مشق شروع کریں۔"
    : `درست جوڑا ${targetSummary} ہے؛ دوبارہ کوشش کریں۔`;

  question.semanticKey = semanticKey;
  Object.assign(question, {
    id: semanticExerciseIdV4(lesson.id, question, scopeId),
    semanticKey,
    legacyId,
    phase: defaultExercisePhaseV4(question),
    conceptIds: matchedConceptIds,
    skillIds,
    instructionUrdu,
    instruction: instructionUrdu,
    hintUrdu,
    hint: hintUrdu,
    explainCorrectUrdu: correctExplanation,
    explainWrongUrdu: wrongExplanation,
    correctExplanation,
    wrongExplanation,
    optionExplanationsUrdu,
    wrongExplanationsByOption: { ...optionExplanationsUrdu }
  });
}

function splitTargetsIntoRunsV4(level, conceptIds, hasPattern) {
  const chunks = [];
  const cap = level === "a1" ? 5 : 4;
  let remaining = [...conceptIds];
  if (level === "a0" && hasPattern && remaining.length) {
    const firstSize = Math.min(3, remaining.length);
    chunks.push(remaining.slice(0, firstSize));
    remaining = remaining.slice(firstSize);
  }
  while (remaining.length) {
    const runCount = Math.ceil(remaining.length / cap);
    const size = Math.ceil(remaining.length / runCount);
    chunks.push(remaining.slice(0, size));
    remaining = remaining.slice(size);
  }
  if (!chunks.length) chunks.push([]);
  return chunks;
}

function conceptOptionsForRunV4(lesson, concept, key, allowedConceptIds = lesson.conceptIds) {
  const answer = key === "urdu"
    ? canonicalUrduForDutchV4(lesson, concept.dutch, concept.urdu)
    : concept[key];
  const allowedValues = uniqueV4(allowedConceptIds)
    .map((conceptId) => {
      const candidate = conceptByIdV4.get(conceptId);
      if (!candidate) return "";
      return key === "urdu"
        ? canonicalUrduForDutchV4(lesson, candidate.dutch, candidate.urdu)
        : candidate[key];
    })
    .filter(Boolean);
  return uniqueV4([answer, ...allowedValues]).slice(0, 3);
}

function runOptionConceptIdsV4(run) {
  const prerequisiteConceptIds = run.prerequisiteSkillIds
    .map((skillId) => skillByIdV4.get(skillId)?.conceptId)
    .filter(Boolean);
  return uniqueV4([...run.conceptIds, ...prerequisiteConceptIds]);
}

function instructionalVisualGroupV4(visualId) {
  if (["man", "vrouw", "kind", "jongen", "meisje", "familie", "vader", "moeder", "broer", "zus"].includes(visualId)) return "person";
  if (["appel", "brood", "kaas", "fruit", "groente", "rijst", "water"].includes(visualId)) return "food";
  if (["bus", "trein", "fiets", "station", "halte", "kaartje"].includes(visualId)) return "transport";
  if (["huis", "deur", "lamp", "stoel", "tafel", "kamer", "badkamer", "keuken", "verwarming"].includes(visualId)) return "home";
  if (["school", "gemeente", "winkel", "supermarkt", "apotheek", "ziekenhuis", "stad", "land"].includes(visualId)) return "place";
  if (["oog", "pijn", "hoofdpijn", "buikpijn", "hoesten", "koorts", "ziek", "dokter", "huisarts", "tandarts", "medicijn"].includes(visualId)) return "health";
  return "other";
}

function safeImageOptionsForRunV4(run, concept) {
  if (!concept?.visualId || !approvedInstructionalVisualIdsV4.has(concept.visualId)) {
    return [];
  }
  const answerGroup = instructionalVisualGroupV4(concept.visualId);
  const distractors = runOptionConceptIdsV4(run)
    .filter((conceptId) => conceptId !== concept.id)
    .map((conceptId) => conceptByIdV4.get(conceptId))
    .filter((candidate) => (
      candidate?.visualId
      && approvedInstructionalVisualIdsV4.has(candidate.visualId)
      && instructionalVisualGroupV4(candidate.visualId) !== answerGroup
    ))
    .map((candidate) => candidate.dutch);
  const options = uniqueV4([concept.dutch, ...distractors]).slice(0, 3);
  return options.length === 3 ? options : [];
}

function canonicalUrduForDutchV4(lesson, dutch, fallback) {
  const key = normalizedTextV4(dutch);
  const conceptCandidates = (
    lesson.conceptIds
    || lessonConceptIdsV4.get(lesson.id)
    || []
  )
    .map((conceptId) => conceptByIdV4.get(conceptId))
    .filter((concept) => normalizedTextV4(concept?.dutch) === key)
    .sort((left, right) => {
      const score = (concept) => (
        String(concept.urdu || "").replace(/\s+/g, "").length
        + (/[؟?]$/.test(String(concept.urdu || "")) ? 3 : 0)
      );
      return score(right) - score(left);
    });
  return String(conceptCandidates[0]?.urdu || fallback || "");
}

function cleanPracticalContextUrduV4(value, fallback = "") {
  const clean = String(value || "")
    .replace(/^(?:حال|صورت)\s*:\s*/u, "")
    .replace(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]*/gu, "")
    .replace(/[“”"'`]+/gu, "")
    .replace(/\(\s*\)|\[\s*\]/gu, "")
    .replace(/\s+([،؛۔؟])/gu, "$1")
    .replace(/([،؛:])\s*([،؛:])/gu, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
  const meaningful = clean
    .replace(/[0-9۰-۹\s،؛۔؟:()[\]{}\-–—/]+/gu, "");
  if (/[\u0600-\u06ff]/u.test(clean) && meaningful.length >= 2) {
    return cleanTerminalPunctuationV4(clean);
  }
  return cleanTerminalPunctuationV4(
    String(fallback || "روزمرہ گفتگو میں اس معنی کی ضرورت ہے")
      .replace(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]*/gu, "")
      .replace(/\s{2,}/g, " ")
      .trim()
  );
}

function lessonDomainV4(lessonId) {
  const routes = [
    ["greeting", /greeting|courtesy|polite|start-speaking/i],
    ["help", /understanding|help/i],
    ["sound", /letter|sound|spelling|letters-sounds/i],
    ["identity", /people|personal|pronoun|ik-jij|hij-zij|name|address|phone|family|possessive|people-things/i],
    ["number-time", /number|time|date|calendar|appointment|numbers-time/i],
    ["home", /home|house|housing|repair|neighbour|weather/i],
    ["food-shop", /food|cafe|shop|clothes|money|bank|bill|customer/i],
    ["travel", /transport|travel|direction|town|post/i],
    ["health", /health|doctor|pharmacy|emergency/i],
    ["school", /school|child|library/i],
    ["work", /work|job|employment/i],
    ["government", /gemeente|official|form|document/i],
    ["message", /message|email|writing|digital/i],
    ["routine", /routine|daily|action|verb|present|past|future|modal|order|connector/i]
  ];
  return routes.find(([, pattern]) => pattern.test(lessonId))?.[0] || "everyday";
}

function domainScenarioTitleUrduV4(domain) {
  return {
    greeting: "مختصر روزمرہ گفتگو",
    help: "مدد اور وضاحت کی گفتگو",
    sound: "آواز اور پہچان کا عملی کام",
    identity: "تعارف اور ذاتی معلومات",
    "number-time": "نمبر، وقت، اور ملاقات",
    home: "گھر اور پڑوس کا معاملہ",
    "food-shop": "دکان، کیفے، اور ادائیگی",
    travel: "راستہ اور سفر",
    health: "صحت اور ڈاکٹر",
    school: "اسکول اور بچے سے رابطہ",
    work: "کام کی جگہ کا معاملہ",
    government: "سرکاری دفتر اور فارم",
    message: "فون، خط، اور پیغام",
    routine: "روزمرہ کام اور منصوبہ",
    everyday: "روزمرہ عملی کام"
  }[domain] || "روزمرہ عملی کام";
}

function authenticDocumentV4(domain, concept, title, variantIndex) {
  const times = ["08:30", "13:00", "19:00"];
  const dates = ["12-05-2026", "18-06-2026", "24-07-2026"];
  const names = ["Sara", "Ali", "Fatima"];
  const shared = {
    documentKind: "message",
    title,
    rows: [
      { label: "بھیجنے والا", value: names[variantIndex % names.length] },
      { label: "وقت", value: times[variantIndex % times.length] },
      { label: "پیغام", value: concept.dutch }
    ]
  };
  const templates = {
    "number-time": {
      documentKind: "appointment-card",
      title,
      rows: [
        { label: "تاریخ", value: dates[variantIndex % dates.length] },
        { label: "وقت", value: times[variantIndex % times.length] },
        { label: "تفصیل", value: concept.dutch }
      ]
    },
    identity: {
      documentKind: "form",
      title,
      rows: [
        { label: "نام", value: names[variantIndex % names.length] },
        { label: "نمبر", value: `${20 + variantIndex}` },
        { label: "بھری ہوئی بات", value: concept.dutch }
      ]
    },
    travel: {
      documentKind: "ticket",
      title,
      rows: [
        { label: "منزل", value: "Utrecht" },
        { label: "روانگی", value: times[variantIndex % times.length] },
        { label: "سفری بات", value: concept.dutch }
      ]
    },
    "food-shop": {
      documentKind: "receipt",
      title,
      rows: [
        { label: "تعداد", value: `${variantIndex + 1}` },
        { label: "رقم", value: `€${5 + variantIndex}` },
        { label: "دکان کی بات", value: concept.dutch }
      ]
    },
    health: {
      documentKind: "appointment-card",
      title,
      rows: [
        { label: "مریض", value: names[variantIndex % names.length] },
        { label: "وقت", value: times[variantIndex % times.length] },
        { label: "صحت کی بات", value: concept.dutch }
      ]
    },
    school: {
      documentKind: "school-message",
      title,
      rows: [
        { label: "بچے کا نام", value: names[variantIndex % names.length] },
        { label: "تاریخ", value: dates[variantIndex % dates.length] },
        { label: "اسکول کی بات", value: concept.dutch }
      ]
    },
    work: {
      documentKind: "work-schedule",
      title,
      rows: [
        { label: "ملازم", value: names[variantIndex % names.length] },
        { label: "وقت", value: times[variantIndex % times.length] },
        { label: "کام کی بات", value: concept.dutch }
      ]
    },
    government: {
      documentKind: "official-form",
      title,
      rows: [
        { label: "نام", value: names[variantIndex % names.length] },
        { label: "تاریخ", value: dates[variantIndex % dates.length] },
        { label: "درخواست کی بات", value: concept.dutch }
      ]
    },
    home: {
      documentKind: "repair-message",
      title,
      rows: [
        { label: "رہائشی", value: names[variantIndex % names.length] },
        { label: "وقت", value: times[variantIndex % times.length] },
        { label: "گھر کی بات", value: concept.dutch }
      ]
    }
  };
  return templates[domain] || shared;
}

function a0PracticalUsePromptV4(concept, lesson) {
  const dutch = cleanTerminalPunctuationV4(concept.dutch);
  const urdu = cleanTerminalPunctuationV4(concept.urdu);
  const role = String(concept.role || "").toLowerCase();
  const isQuestion = looksLikeDutchQuestionV4(concept.dutch);
  const isPhrase = role === "phrase" || dutchWordsV4(dutch).length > 1;
  const askForTarget = (setting, action = "") => {
    const task = action || (isQuestion
      ? `${urdu} پوچھنے کے لیے کون سا مکمل سوال کہیں؟`
      : isPhrase
        ? `“${urdu}” کہنا ہو تو کون سی مکمل ڈچ بات کہیں؟`
        : `“${urdu}” کے لیے کون سا ڈچ لفظ درست ہے؟`);
    return `حال: ${setting} ${task}`;
  };

  if (/^a0-letters-[123]$/.test(lesson.id)) {
    if (role === "sound" || role === "letter" || /^[a-z]$/i.test(dutch)) {
      return askForTarget(
        "کمیونٹی مرکز میں نام کے حروف سن کر لفظی کارڈ مکمل کرنا ہے۔",
        "جو آواز سنائی دی، اس کے لیے درست سکھایا ہوا حرف چنیں۔"
      );
    }
    const setting = ["rijst", "water"].includes(normalizedTextV4(dutch))
      ? "چھوٹی خریداری فہرست پر چیز کی تصویر بنی ہے۔"
      : ["deur", "huis", "stoel", "tafel", "lamp"].includes(normalizedTextV4(dutch))
        ? "گھر کی تصویری فہرست میں ایک چیز نشان زد ہے۔"
        : "ابتدائی پڑھنے کے کارڈ پر ایک صاف تصویر بنی ہے۔";
    return askForTarget(setting);
  }

  const exactScenes = {
    "a0-ik-jij-u|ik": "تعارف میں اپنی طرف اشارہ کرکے “میں” کہنا ہے۔ کون سا ڈچ لفظ کہیں؟",
    "a0-ik-jij-u|jij": "قریبی دوست سے “تم” کہنا ہے۔ کون سا ڈچ لفظ کہیں؟",
    "a0-ik-jij-u|u": "ڈاکٹر سے ادب کے ساتھ “آپ” کہنا ہے۔ کون سا ڈچ لفظ کہیں؟",
    "a0-ik-jij-u|ik jij u": "تعارف کارڈ میں پہلے اپنی، پھر دوست، پھر رسمی مخاطب کی جگہ ہے۔ “میں، تم، آپ” کی درست ڈچ ترتیب چنیں۔",
    "a0-ja-nee-goed-niet|ja": "دکاندار پوچھتا ہے کہ کیا آپ رسید چاہتے ہیں۔ آپ رضامند ہیں۔ مختصر جواب کیا ہے؟",
    "a0-ja-nee-goed-niet|nee": "دکاندار پوچھتا ہے کہ کیا آپ کو تھیلا چاہیے۔ آپ انکار کرتے ہیں۔ مختصر جواب کیا ہے؟",
    "a0-ja-nee-goed-niet|goed": "ڈاکٹر پوچھتا ہے کہ اب حالت کیسی ہے۔ حالت اچھی ہے۔ مختصر جواب کیا ہے؟",
    "a0-ja-nee-goed-niet|niet": "مرمت ابھی ٹھیک نہیں ہوئی۔ “goed” کو منفی بنانے کے لیے اس سے پہلے کون سا ڈچ لفظ لگائیں؟",
    "a0-ja-nee-goed-niet|niet goed": "مرمت کے بعد چیز ابھی بھی صحیح کام نہیں کر رہی۔ اس کی حالت مختصر طور پر کیا کہیں؟",
    "a0-hij-zij-wij|hij": "خاندانی تصویر میں ایک مرد کی طرف اشارہ کرکے “وہ” کہنا ہے۔ درست ڈچ لفظ چنیں۔",
    "a0-hij-zij-wij|zij": "خاندانی تصویر میں ایک عورت کی طرف اشارہ کرکے “وہ” کہنا ہے۔ درست ڈچ لفظ چنیں۔",
    "a0-hij-zij-wij|wij": "اپنے ساتھ کھڑے خاندان کی طرف اشارہ کرکے “ہم” کہنا ہے۔ درست ڈچ لفظ چنیں۔",
    "a0-ben-bent-is|ben": "اپنے تعارف میں “میں ہوں” مکمل کرنے کے لیے “ہوں” والی درست ڈچ شکل چنیں۔",
    "a0-ben-bent-is|bent": "سامنے والے سے “آپ ہیں” کہنا ہے۔ “ہیں” والی درست ڈچ شکل چنیں۔",
    "a0-ben-bent-is|is": "تصویر کے ایک شخص کے بارے میں “وہ ہے” کہنا ہے۔ “ہے” والی درست ڈچ شکل چنیں۔",
    "a0-hebben-1|heb": "اپنے بیگ کی چیز بتاتے ہوئے “میرے پاس ہے” مکمل کرنا ہے۔ درست ڈچ شکل چنیں۔",
    "a0-hebben-1|hebt": "دوست کے بیگ کے بارے میں “تمہارے پاس ہے” کہنا ہے۔ درست ڈچ شکل چنیں۔",
    "a0-hebben-1|heeft": "ایک شخص کے گھر کے بارے میں “اس کے پاس ہے” کہنا ہے۔ درست ڈچ شکل چنیں۔",
    "a0-gaan-komen|ga": "گھر سے نکلتے ہوئے اپنے بارے میں “جاتا یا جاتی ہوں” کہنا ہے۔ درست ڈچ شکل چنیں۔",
    "a0-gaan-komen|gaat": "ایک شخص کو جاتے دیکھ کر “جاتا یا جاتی ہے” کہنا ہے۔ درست ڈچ شکل چنیں۔",
    "a0-gaan-komen|kom": "دروازے پر پہنچ کر اپنے بارے میں “آتا یا آتی ہوں” کہنا ہے۔ درست ڈچ شکل چنیں۔",
    "a0-gaan-komen|komt": "کسی شخص کی آمد بتاتے ہوئے “آتا یا آتی ہے” کہنا ہے۔ درست ڈچ شکل چنیں۔"
  };
  const exactKey = `${lesson.id}|${normalizedTextV4(dutch)}`;
  if (exactScenes[exactKey]) return `حال: ${exactScenes[exactKey]}`;

  if (lesson.id === "a0-people-nouns") {
    return askForTarget("خاندانی تصویر کے نیچے ہر شخص یا گروہ کا ڈچ نام لگانا ہے۔");
  }
  if (lesson.id === "a0-een-de-het") {
    if (normalizedTextV4(dutch) === "een") {
      return askForTarget(
        "تصویری فہرست میں کسی ایک شخص یا چیز کے نام سے پہلے “ایک” لگانا ہے۔",
        "“ایک” کے لیے کون سا چھوٹا ڈچ لفظ درست ہے؟"
      );
    }
    return askForTarget(
      "گھر کی تصویری فہرست میں شخص یا چیز کے نیچے مکمل ڈچ نام لکھا جا رہا ہے۔",
      `${urdu} کے لیے اسم سے پہلے آنے والے چھوٹے لفظ سمیت کون سا مکمل نام درست ہے؟`
    );
  }
  if (lesson.id === "a0-ben-bent-is") {
    return askForTarget("کمیونٹی مرکز میں بہت مختصر تعارف ہو رہا ہے۔");
  }
  if (lesson.id === "a0-first-sentences") {
    return askForTarget("نئے پڑوسی سے پہلی بار اپنا یا کسی دوسرے شخص کا مختصر تعارف ہو رہا ہے۔");
  }
  if (lesson.id === "a0-name-land-city") {
    return askForTarget("رجسٹریشن کاؤنٹر پر نام، ملک، اور رہنے کی جگہ بتانی ہے۔");
  }
  if (lesson.id === "a0-hebben-1") {
    return askForTarget("کلاس میں کتاب، قلم، یا گھر کی تصویر کے بارے میں بتانا ہے کہ کس کے پاس کیا ہے۔");
  }
  if (lesson.id === "a0-geen") {
    return askForTarget("کلاس کی چیزوں کی فہرست دیکھی گئی، مگر مطلوبہ چیز موجود نہیں ہے۔");
  }
  if (lesson.id === "a0-possessive") {
    return askForTarget("گمشدہ چیزوں کی میز پر نام اور مالک درست چیز کے ساتھ ملانا ہے۔");
  }
  if (lesson.id === "a0-dit-dat-questions") {
    if (["wie", "wat", "waar", "hoe"].includes(normalizedTextV4(dutch))) {
      return askForTarget(
        "کمیونٹی مرکز میں شخص، چیز، جگہ، یا طریقے کے بارے میں سوال شروع کرنا ہے۔",
        `“${urdu}” پوچھنے کے لیے سوال شروع کرنے والا کون سا ڈچ لفظ درست ہے؟`
      );
    }
    return askForTarget("کمیونٹی مرکز میں ایک شخص، چیز، یا جگہ کی شناخت یا سمت معلوم کرنی ہے۔");
  }
  if (lesson.id === "a0-numbers-0-10") {
    const setting = /euro/i.test(dutch)
      ? "چھوٹی دکان کے ڈسپلے پر قیمت دکھائی گئی ہے۔"
      : /bus/i.test(dutch)
        ? "بس اسٹاپ کے برقی نشان پر لائن نمبر دکھائی دیتا ہے۔"
        : /boek|kind/i.test(dutch)
          ? "کلاس کی فہرست میں کتابوں یا بچوں کی تعداد لکھی ہے۔"
          : "فون نمبر یا کاؤنٹر کے ٹوکن میں ایک عدد سنائی دیتا ہے۔";
    return askForTarget(setting);
  }
  if (lesson.id === "a0-numbers-11-100") {
    const setting = /huisnummer/i.test(dutch)
      ? "گھر کے دروازے پر نمبر صاف لکھا ہے۔"
      : /bus/i.test(dutch)
        ? "بس اسٹاپ کے نشان پر لائن نمبر لکھا ہے۔"
        : /euro/i.test(dutch)
          ? "دکان کی قیمت کی تختی پر رقم لکھی ہے۔"
          : /jaar/i.test(dutch)
            ? "تعارف فارم پر عمر بتانی ہے۔"
            : "کاؤنٹر کے ٹوکن یا فون میں ایک بڑا عدد سنائی دیتا ہے۔";
    return askForTarget(setting);
  }
  if (lesson.id === "a0-time-days") {
    return askForTarget("ہفتے کے شیڈول اور ملاقات کارڈ میں دن یا وقت کی معلومات دیکھنی ہیں۔");
  }
  if (lesson.id === "a0-spelling-personal-details") {
    return askForTarget("فون پر رجسٹریشن کرتے ہوئے نام، ہجے، اور عمر صاف بتانی یا پوچھنی ہے۔");
  }
  if (lesson.id === "a0-address-phone") {
    return askForTarget("مرکز کے رابطہ فارم میں پتہ، گھر نمبر، جگہ، اور فون کی معلومات دینی ہیں۔");
  }
  if (lesson.id === "a0-date-appointment") {
    return askForTarget("استقبالی کاؤنٹر پر ملاقات کا دن، وقت، یا تبدیلی سنبھالنی ہے۔");
  }
  if (lesson.id === "a0-place-1" || lesson.id === "a0-place-2") {
    return askForTarget("گھر میں چابی یا چیز تلاش کرتے ہوئے اس کی صحیح جگہ بتانی ہے۔");
  }
  if (lesson.id === "a0-gaan-komen") {
    return askForTarget("دروازے پر کسی کی آمد یا روانگی کے بارے میں مختصر بات کرنی ہے۔");
  }
  if (lesson.id === "a0-naar-met") {
    return askForTarget("گھر یا اسکول جاتے ہوئے منزل یا ساتھ موجود شخص بتانا ہے۔");
  }
  if (lesson.id === "a0-home-needs") {
    return askForTarget("مالک یا مرمت والے کو گھر کی چیز، حالت، یا فوری خرابی واضح کرنی ہے۔");
  }
  if (lesson.id === "a0-daily-actions") {
    return askForTarget("روزمرہ شیڈول کے تصویری خانوں میں کام، کھانا، آرام، یا انتظار کی بات درج کرنی ہے۔");
  }
  if (lesson.id === "a0-food-drink") {
    return askForTarget("کیفے یا گھر کی کھانے پینے کی فہرست میں ضرورت یا پسند بتانی ہے۔");
  }
  if (lesson.id === "a0-shopping-payment") {
    return askForTarget("دکان میں چیز، قیمت، کاؤنٹر، ادائیگی، یا رسید کے بارے میں بات کرنی ہے۔");
  }
  if (lesson.id === "a0-transport-directions") {
    return askForTarget("اسٹیشن پر سفر، ٹکٹ، نشان، یا راستے کی فوری معلومات لینی ہیں۔");
  }
  if (lesson.id === "a0-health-emergency") {
    return askForTarget("ڈاکٹر، فارمیسی، یا ہنگامی فون پر علامت، جگہ، یا فوری مدد بتانی ہے۔");
  }
  if (lesson.id === "a0-child-school") {
    return askForTarget("صبح اسکول کو بچے، جماعت، وقت، یا غیر حاضری کی اطلاع دینی ہے۔");
  }
  if (lesson.id === "a0-work-basics") {
    return askForTarget("کام کے ذمہ دار کو وقت، آغاز، وقفہ، دیر، یا بیماری کی اطلاع دینی ہے۔");
  }
  if (lesson.id === "a0-weather-clothing-safety") {
    return askForTarget("عمارت سے نکلنے سے پہلے موسم، ضروری چیز، یا حفاظتی نشان سمجھنا ہے۔");
  }
  return "";
}

function practicalSituationV4(concept, lesson) {
  const domain = lessonDomainV4(lesson.id);
  const a0Prompt = lesson.id?.startsWith("a0-")
    ? a0PracticalUsePromptV4(concept, lesson)
    : "";
  if (a0Prompt) {
    return {
      scenarioId: `${domain}:${semanticSlugV4(concept.dutch, "target")}`,
      prompt: a0Prompt
    };
  }
  const targetMeaning = cleanPracticalContextUrduV4(
    concept.urdu,
    "یہ معنی"
  );
  const templates = {
    greeting: `آپ کسی شخص سے ملتے یا رخصت ہوتے ہیں؛ “${targetMeaning}” کے مطابق بات کرنی ہے`,
    help: `گفتگو میں مدد یا وضاحت کی ضرورت ہے؛ “${targetMeaning}” والی بات کہنا یا جواب دینا ہے`,
    sound: `آپ یہ ڈچ آواز یا لفظ سنتے ہیں؛ “${targetMeaning}” پہچان کر مناسب جواب دینا ہے`,
    identity: `تعارف یا ذاتی معلومات کی گفتگو میں “${targetMeaning}” بتانا یا پوچھنا ہے`,
    "number-time": `نمبر، دن، وقت، یا ملاقات طے کرتے ہوئے “${targetMeaning}” بتانا یا سمجھنا ہے`,
    home: `گھر یا پڑوس کے روزمرہ معاملے میں “${targetMeaning}” واضح کرنا ہے`,
    "food-shop": `دکان، کیفے، یا ادائیگی کے وقت “${targetMeaning}” کہنا یا پوچھنا ہے`,
    travel: `راستہ یا سفر کے دوران “${targetMeaning}” سمجھنا یا پوچھنا ہے`,
    health: `صحت کے متعلق بات کرتے ہوئے “${targetMeaning}” ڈاکٹر یا مددگار کو بتانا ہے`,
    school: `اسکول یا بچے کے متعلق گفتگو میں “${targetMeaning}” واضح کرنا ہے`,
    work: `کام کی جگہ “${targetMeaning}” ساتھی یا ذمہ دار کو بتانا ہے`,
    government: `سرکاری دفتر یا فارم کے کام میں “${targetMeaning}” سمجھنا یا کہنا ہے`,
    message: `فون، خط، یا پیغام میں “${targetMeaning}” واضح طور پر لکھنا یا کہنا ہے`,
    routine: `روزمرہ کام یا منصوبے میں “${targetMeaning}” بتانا ہے`,
    everyday: `روزمرہ گفتگو میں “${targetMeaning}” کے مطابق بات کرنی ہے`
  };
  return {
    scenarioId: `${domain}:${semanticSlugV4(concept.dutch, "target")}`,
    prompt: `حال: ${templates[domain]}۔`
  };
}

function practicalSituationPromptV4(concept, lesson) {
  return practicalSituationV4(concept, lesson).prompt;
}

function addSyntheticExerciseV4({
  lesson,
  run,
  question,
  phase,
  conceptIds,
  skillIds,
  scope
}) {
  question.id = `synthetic:${run.id}:${scope}`;
  annotateQuestionV4({
    lesson,
    question,
    conceptIds: lesson.conceptIds,
    pattern: null,
    scopeId: `${run.id}:${scope}`
  });
  Object.assign(question, {
    phase,
    conceptIds: uniqueV4(conceptIds),
    skillIds: uniqueV4(skillIds),
    runId: run.id,
    synthetic: true,
    retiredCompatibility: false,
    adaptiveReviewEligible: !["uitleg", "speak-repeat"].includes(question.type)
  });
  if (phase === "independent-check") {
    question.hintMode = "after-attempt";
    question.automaticHint = false;
  }
  lesson.questions.push(question);
  return question;
}

function cloneForIndependentCheckV4(lesson, run, source, index, requiredSkillId) {
  const requiredSkill = skillByIdV4.get(requiredSkillId);
  const pattern = requiredSkill?.patternId
    ? patternsV4.find((item) => item.id === requiredSkill.patternId)
    : null;
  const requiredConceptId = requiredSkill?.conceptId
    || pattern?.modelConceptId
    || source.conceptIds.find((conceptId) => run.conceptIds.includes(conceptId))
    || run.conceptIds[index % Math.max(1, run.conceptIds.length)];
  const concept = conceptByIdV4.get(requiredConceptId);
  if (!concept) return null;
  const canonicalUrdu = canonicalUrduForDutchV4(
    lesson,
    concept.dutch,
    concept.urdu
  );
  const allowedConceptIds = runOptionConceptIdsV4(run);
  const urduOptions = conceptOptionsForRunV4(
    lesson,
    concept,
    "urdu",
    allowedConceptIds
  );
  const dutchOptions = conceptOptionsForRunV4(
    lesson,
    concept,
    "dutch",
    allowedConceptIds
  );
  const imageOptions = safeImageOptionsForRunV4(run, concept);
  const checkRoles = [
    "check-listening",
    "check-visual",
    "check-recall",
    "check-situation",
    "check-listening-reinforcement",
    "check-recall-application"
  ];
  let checkRole = checkRoles[index % checkRoles.length];
  let checkQuestion;
  if (checkRole === "check-listening" || checkRole === "check-listening-reinforcement") {
    checkQuestion = {
      type: "listen-choice",
      label: "بغیر اشارے کے سن کر مطلب پہچانیں",
      prompt: checkRole === "check-listening"
        ? "روزمرہ گفتگو کی یہ بات سنیں اور اس کا درست اردو مطلب منتخب کریں۔"
        : "مختصر اعلان میں یہ بات دوبارہ سنیں اور درست اردو مطلب منتخب کریں۔",
      speak: concept.dutch,
      mode: checkRole,
      options: rotate(urduOptions, 1),
      answer: canonicalUrdu,
      explain: `${concept.dutch} = ${canonicalUrdu}۔`
    };
  } else if (checkRole === "check-visual" && imageOptions.length === 3) {
    checkQuestion = {
      type: "image-choice",
      label: "بغیر اشارے کے تصویر سے یاد کریں",
      prompt: `اس تصویر میں ${canonicalUrdu} والا ہدف پہچانیں اور درست ڈچ بات منتخب کریں۔`,
      visualId: concept.visualId,
      options: rotate(imageOptions, 1),
      answer: concept.dutch,
      explain: `${concept.dutch} = ${canonicalUrdu}۔`
    };
  } else if (checkRole === "check-situation") {
    const checkSituation = practicalSituationV4(concept, lesson);
    checkQuestion = situation(
      `${checkSituation.prompt} اب مدد کے بغیر مناسب جواب منتخب کریں۔`,
      rotate(dutchOptions, 1),
      concept.dutch,
      `اس موقع میں درست بات ${concept.dutch} ہے۔`
    );
    checkQuestion.scenarioId = `${checkSituation.scenarioId}:independent`;
  } else {
    if (checkRole === "check-visual") checkRole = "check-recall-context";
    const recallLead = checkRole === "check-recall-application"
      ? "نئے روزمرہ موقع میں اس معنی کے لیے ڈچ بات چنیں"
      : checkRole === "check-recall-context"
        ? "تصویر کے بغیر اس معنی کے لیے ڈچ بات یاد کریں"
        : "اس معنی کے لیے ڈچ بات چنیں";
    checkQuestion = reverse(
      `${recallLead}: ${canonicalUrdu}`,
      rotate(dutchOptions, 1),
      concept.dutch,
      `${canonicalUrdu} = ${concept.dutch}۔`
    );
    checkQuestion.label = "بغیر اشارے کے معنی سے یاد کریں";
  }
  checkQuestion.id = `synthetic:${run.id}:${checkRole}:${requiredSkillId}`;
  checkQuestion.semanticKey = `${run.id}:${checkRole}:${requiredSkillId}`;
  checkQuestion.legacyId = "";
  checkQuestion.sourceExerciseId = source.id;
  return addSyntheticExerciseV4({
    lesson,
    run,
    question: checkQuestion,
    phase: "independent-check",
    conceptIds: [requiredConceptId],
    skillIds: uniqueV4([requiredSkillId, skillIdByConceptIdV4.get(requiredConceptId)]),
    scope: `${checkRole}:${requiredSkillId || "reinforce"}`
  });
}

function pickAuthoredExerciseV4({
  questions,
  usedIds,
  conceptId,
  phase,
  preferredTypes,
  offset = 0
}) {
  const candidates = questions.filter((question) => (
    !usedIds.has(question.id)
    && question.phase === phase
    && question.conceptIds.includes(conceptId)
  ));
  const orderedTypes = rotate(preferredTypes, offset);
  const selected = orderedTypes
    .map((type) => candidates.find((question) => question.type === type))
    .find(Boolean)
    || candidates[0]
    || null;
  if (selected) usedIds.add(selected.id);
  return selected;
}

function buildLearningRunsV4(lesson, chapterId, pattern, prerequisiteSkillIds) {
  const level = chapterId;
  const conceptIds = lesson.conceptIds;
  const targetChunks = lesson.id === "a0-ja-nee-goed-niet"
    ? [
      conceptIds.slice(0, 2),
      conceptIds.slice(2)
    ].filter((ids) => ids.length)
    : lesson.id === "a0-numbers-11-100"
    ? [
      conceptIds.slice(0, 4),
      conceptIds.slice(4, 8),
      conceptIds.slice(8, 12),
      conceptIds.slice(12, 16),
      conceptIds.slice(16, 20),
      conceptIds.slice(20)
    ].filter((ids) => ids.length)
    : splitTargetsIntoRunsV4(level, conceptIds, Boolean(pattern));
  const prerequisiteConceptIds = prerequisiteSkillIds
    .map((skillId) => skillByIdV4.get(skillId)?.conceptId)
    .filter(Boolean);
  const chunks = targetChunks.map((targetIds, chunkIndex) => {
    const earlierCurrentLessonIds = targetChunks.slice(0, chunkIndex).flat();
    const reviewCandidates = uniqueV4([
      ...earlierCurrentLessonIds.slice().reverse(),
      ...prerequisiteConceptIds.slice().reverse()
    ]).filter((conceptId) => !targetIds.includes(conceptId));
    const reviewIds = reviewCandidates.slice(0, Math.max(0, 3 - targetIds.length));
    return {
      targetIds,
      conceptIds: uniqueV4([...targetIds, ...reviewIds])
    };
  });
  // Preserve the complete v3 bank for one-time progress and mistake migration,
  // but never expose it as active v4 lesson work. Every learner-facing
  // exercise below is synthesized from the owned concepts in its current run.
  const legacyQuestions = lesson.questions.map((question) => ({
    ...question,
    legacyId: String(question.legacyId || question.id || ""),
    retiredCompatibility: true,
    adaptiveReviewEligible: false
  }));
  lesson.legacyQuestions = legacyQuestions;
  lesson.questions = [];
  lesson.exercises = lesson.questions;
  const authoredExplanations = [];
  const authoredQuestions = [];
  legacyQuestions.forEach((question) => {
    question.runId = null;
    question.retiredCompatibility = true;
    question.adaptiveReviewEligible = false;
  });

  const runs = chunks.map((chunk, runIndex) => {
    const runConceptIds = chunk.conceptIds;
    const runPattern = runIndex === 0 ? pattern : null;
    const newConceptIds = runConceptIds.filter((conceptId) => (
      chunk.targetIds.includes(conceptId)
      && conceptByIdV4.get(conceptId)?.introducedInLessonId === lesson.id
    ));
    const reviewConceptIds = runConceptIds.filter((conceptId) => !newConceptIds.includes(conceptId));
    const teachingBlocks = [
      ...runConceptIds.map((conceptId) => ({
        id: `${lesson.id}:teach:${conceptId}`,
        type: "concept",
        conceptId,
        mode: newConceptIds.includes(conceptId) ? "teach" : "refresh"
      })),
      ...(runPattern ? [{
        id: `${lesson.id}:teach:${runPattern.id}`,
        type: "pattern",
        patternId: runPattern.id,
        mode: "teach"
      }] : [])
    ];
    const skillIds = uniqueV4([
      ...runConceptIds.map((conceptId) => skillIdByConceptIdV4.get(conceptId)),
      runPattern?.skillId
    ]);
    const reviewPrerequisiteSkillIds = reviewConceptIds
      .map((conceptId) => skillIdByConceptIdV4.get(conceptId))
      .filter(Boolean);
    const earlierRunSkillIds = chunks
      .slice(0, runIndex)
      .flatMap((earlierChunk) => (
        earlierChunk.conceptIds.map((conceptId) => skillIdByConceptIdV4.get(conceptId))
      ))
      .filter(Boolean);
    const runMeaningsUrdu = runConceptIds
      .map((conceptId) => conceptByIdV4.get(conceptId)?.urdu)
      .filter(Boolean)
      .map(cleanTerminalPunctuationV4);
    const runOutcomeUrdu = runMeaningsUrdu.length
      ? `${runMeaningsUrdu.join("، ")} سن کر سمجھنا اور مناسب روزمرہ موقع میں درست ڈچ بات استعمال کرنا۔`
      : lesson.outcomeUrdu;
    const runSemanticKey = runConceptIds
      .map((conceptId) => semanticSlugV4(conceptByIdV4.get(conceptId)?.dutch, "target"))
      .join("--");
    return {
      id: `${lesson.id}:run:${runSemanticKey}`,
      semanticKey: runSemanticKey,
      index: runIndex + 1,
      outcomeUrdu: runOutcomeUrdu,
      conceptIds: runConceptIds,
      newConceptIds,
      reviewConceptIds,
      patternId: runPattern?.id || null,
      skillIds,
      prerequisiteSkillIds: uniqueV4([
        ...prerequisiteSkillIds,
        ...reviewPrerequisiteSkillIds,
        ...earlierRunSkillIds
      ]),
      teachingBlocks,
      teachingBlockIds: teachingBlocks.map((block) => block.id),
      phases: null
    };
  });

  const selectedAuthoredIds = new Set();
  runs.forEach((run, runIndex) => {
    const understand = [];
    const guided = [];
    const use = [];
    const demonstrationConcept = conceptByIdV4.get(run.conceptIds[0]);
    const demonstrationSkillId = skillIdByConceptIdV4.get(run.conceptIds[0]);
    if (demonstrationConcept && demonstrationSkillId) {
      const demonstrationUrdu = canonicalUrduForDutchV4(
        lesson,
        demonstrationConcept.dutch,
        demonstrationConcept.urdu
      );
      const taskDemonstration = {
        type: "uitleg",
        label: "پہلے طریقہ سمجھیں",
        prompt: "پہلے سننے کا طریقہ دیکھیں",
        points: [
          `“${demonstrationConcept.dutch}” سنیں۔`,
          `درست مطلب: “${demonstrationUrdu}”۔`
        ],
        explain: "اب اسی طریقے سے اگلی آواز سنیں۔",
        speak: demonstrationConcept.audioText || demonstrationConcept.dutch,
        answer: demonstrationUrdu,
        taskDemonstration: true,
        demonstratesType: "listen-choice",
        scored: false
      };
      understand.push(addSyntheticExerciseV4({
        lesson,
        run,
        question: taskDemonstration,
        phase: "understand",
        conceptIds: [demonstrationConcept.id],
        skillIds: [demonstrationSkillId],
        scope: `understand:task-demo:${demonstrationConcept.id}`
      }));
    }

    run.conceptIds.forEach((conceptId, conceptIndex) => {
      const concept = conceptByIdV4.get(conceptId);
      const skillId = skillIdByConceptIdV4.get(conceptId);
      if (!concept || !skillId) return;
      const canonicalUrdu = canonicalUrduForDutchV4(lesson, concept.dutch, concept.urdu);
      const authoredUnderstand = pickAuthoredExerciseV4({
        questions: authoredQuestions,
        usedIds: selectedAuthoredIds,
        conceptId,
        phase: "understand",
        preferredTypes: ["meaning", "listen-choice", "image-choice", "document-choice"],
        offset: runIndex + conceptIndex
      });
      if (authoredUnderstand) {
        authoredUnderstand.runId = run.id;
        authoredUnderstand.adaptiveReviewEligible = false;
        authoredUnderstand.conceptIds = [conceptId];
        authoredUnderstand.skillIds = [skillId];
        understand.push(authoredUnderstand);
      } else {
        const baseRecognition = conceptIndex === 0
          ? listenChoice(
            concept.audioText || concept.dutch,
            conceptOptionsForRunV4(lesson, concept, "urdu", runOptionConceptIdsV4(run)),
            canonicalUrdu,
            `${concept.dutch} = ${canonicalUrdu}۔`
          )
          : meaning(
            concept.dutch,
            conceptOptionsForRunV4(lesson, concept, "urdu", runOptionConceptIdsV4(run)),
            canonicalUrdu,
            `${concept.dutch} = ${canonicalUrdu}۔`
          );
        understand.push(addSyntheticExerciseV4({
          lesson,
          run,
          question: baseRecognition,
          phase: "understand",
          conceptIds: [conceptId],
          skillIds: [skillId],
          scope: `${conceptIndex === 0 ? "understand-listen" : "understand-meaning"}:${conceptId}`
        }));
        const safeImageOptions = safeImageOptionsForRunV4(run, concept);
        if (safeImageOptions.length === 3) {
          understand.push(addSyntheticExerciseV4({
            lesson,
            run,
            question: imageChoice(
              concept.visualId,
              safeImageOptions,
              concept.dutch,
              `${concept.dutch} = ${canonicalUrdu}۔`
            ),
            phase: "understand",
            conceptIds: [conceptId],
            skillIds: [skillId],
            scope: `understand-visual:${conceptId}`
          }));
        }
      }

      const authoredGuided = pickAuthoredExerciseV4({
        questions: authoredQuestions,
        usedIds: selectedAuthoredIds,
        conceptId,
        phase: "guided-practice",
        preferredTypes: ["reverse", "fill-gap", "build", "sequence", "speak-repeat"],
        offset: runIndex + conceptIndex
      });
      if (authoredGuided) {
        authoredGuided.runId = run.id;
        authoredGuided.adaptiveReviewEligible = false;
        authoredGuided.conceptIds = [conceptId];
        authoredGuided.skillIds = [skillId];
        guided.push(authoredGuided);
      } else {
        guided.push(addSyntheticExerciseV4({
          lesson,
          run,
          question: reverse(
            canonicalUrdu,
            conceptOptionsForRunV4(lesson, concept, "dutch", runOptionConceptIdsV4(run)),
            concept.dutch,
            `${canonicalUrdu} = ${concept.dutch}۔`
          ),
          phase: "guided-practice",
          conceptIds: [conceptId],
          skillIds: [skillId],
          scope: `guided-recall:${conceptId}`
        }));
      }
    });

    if (run.patternId) {
      const runPattern = patternsV4.find((item) => item.id === run.patternId);
      const anchorConceptId = runPattern.modelConceptId;
      const anchorConcept = conceptByIdV4.get(anchorConceptId);
      const canonicalModelUrdu = canonicalUrduForDutchV4(
        lesson,
        runPattern.modelDutch,
        runPattern.modelUrdu
      );
      const patternRecognition = meaning(
        runPattern.modelDutch,
        uniqueV4([
          canonicalModelUrdu,
          ...run.conceptIds.map((conceptId) => {
            const concept = conceptByIdV4.get(conceptId);
            return concept
              ? canonicalUrduForDutchV4(lesson, concept.dutch, concept.urdu)
              : "";
          })
        ]).slice(0, 3),
        canonicalModelUrdu,
        `${runPattern.modelDutch} = ${canonicalModelUrdu}۔ ${runPattern.explanationUrdu}`
      );
      understand.push(addSyntheticExerciseV4({
        lesson,
        run,
        question: patternRecognition,
        phase: "understand",
        conceptIds: anchorConceptId ? [anchorConceptId] : [],
        skillIds: uniqueV4([
          runPattern.skillId,
          anchorConceptId ? skillIdByConceptIdV4.get(anchorConceptId) : null
        ]),
        scope: `understand:pattern:${runPattern.id}`
      }));
    }

    if (chapterId === "a2" && run.conceptIds.length) {
      const documentConceptId = run.conceptIds[0];
      const documentConcept = conceptByIdV4.get(documentConceptId);
      const documentSkillId = skillIdByConceptIdV4.get(documentConceptId);
      const documentUrdu = canonicalUrduForDutchV4(
        lesson,
        documentConcept.dutch,
        documentConcept.urdu
      );
      understand.push(addSyntheticExerciseV4({
        lesson,
        run,
        question: {
          type: "document-choice",
          label: "عملی دستاویز پڑھ کر درست مطلب منتخب کریں",
          prompt: "دستاویز میں سیکھی ہوئی اہم Nederlands بات پڑھیں اور درست اردو مطلب منتخب کریں۔",
          document: {
            title: "عملی معلومات",
            rows: [{ label: "اہم بات", value: documentConcept.dutch }]
          },
          options: conceptOptionsForRunV4(
            lesson,
            documentConcept,
            "urdu",
            runOptionConceptIdsV4(run)
          ),
          answer: documentUrdu,
          explain: `${documentConcept.dutch} = ${documentUrdu}۔`
        },
        phase: "understand",
        conceptIds: [documentConceptId],
        skillIds: [documentSkillId],
        scope: `understand:document:${documentConceptId}`
      }));
    }

    const productionConceptIds = run.newConceptIds?.length
      ? run.newConceptIds
      : run.conceptIds;
    if (guided.length && productionConceptIds.length) {
      const targetConceptId = productionConceptIds[productionConceptIds.length - 1];
      const targetConcept = conceptByIdV4.get(targetConceptId);
      const targetSkillId = skillIdByConceptIdV4.get(targetConceptId);
      guided.push(addSyntheticExerciseV4({
        lesson,
        run,
        question: {
          type: "speak-repeat",
          label: "سنیں اور بغیر اسکور کے دہرائیں",
          prompt: `“${targetConcept.dutch}” آہستہ سنیں اور بلند آواز میں دہرائیں۔`,
          speak: targetConcept.dutch,
          answer: targetConcept.dutch,
          explain: `${targetConcept.dutch} = ${targetConcept.urdu}۔`,
          scored: false
        },
        phase: "guided-practice",
        conceptIds: [targetConceptId],
        skillIds: [targetSkillId],
        scope: `guided:speaking:${targetConceptId}`
      }));
      if (dutchWordsV4(targetConcept.dutch).length > 1) {
        guided.push(addSyntheticExerciseV4({
          lesson,
          run,
          question: {
            type: "build",
            label: "ایک سیکھی ہوئی بات کے الفاظ ترتیب دیں",
            prompt: canonicalUrduForDutchV4(
              lesson,
              targetConcept.dutch,
              targetConcept.urdu
            ),
            tiles: targetConcept.dutch.split(/\s+/).filter(Boolean),
            answer: targetConcept.dutch,
            explain: `صحیح لفظی ترتیب: ${targetConcept.dutch}۔`
          },
          phase: "guided-practice",
          conceptIds: [targetConceptId],
          skillIds: [targetSkillId],
          scope: `guided:word-order:${targetConceptId}`
        }));
      }
      if (chapterId === "a2" && runIndex % 2 === 1) {
        guided.push(addSyntheticExerciseV4({
          lesson,
          run,
          question: {
            type: "short-input",
            label: "مختصر Nederlands جواب بنائیں",
            prompt: canonicalUrduForDutchV4(lesson, targetConcept.dutch, targetConcept.urdu),
            answer: targetConcept.dutch,
            acceptedAnswers: [targetConcept.dutch.replace(/[.!?]+$/g, "")],
            fallbackTiles: targetConcept.dutch.split(/\s+/).filter(Boolean),
            optional: true,
            explain: `صحیح جواب: ${targetConcept.dutch}۔`
          },
          phase: "guided-practice",
          conceptIds: [targetConceptId],
          skillIds: [targetSkillId],
          scope: `guided:short-input:${targetConceptId}`
        }));
      }
    }

    const useConceptIds = uniqueV4([
      productionConceptIds[0],
      productionConceptIds.length > 1
        ? productionConceptIds[productionConceptIds.length - 1]
        : null
    ]);
    useConceptIds.forEach((conceptId, useIndex) => {
      const concept = conceptByIdV4.get(conceptId);
      const skillId = skillIdByConceptIdV4.get(conceptId);
      if (!concept || !skillId) return;
      const authoredUse = pickAuthoredExerciseV4({
        questions: authoredQuestions,
        usedIds: selectedAuthoredIds,
        conceptId,
        phase: "use",
        preferredTypes: ["situation"],
        offset: runIndex + useIndex
      });
      const patternSkillId = useIndex === 0 && run.patternId
        ? patternsV4.find((item) => item.id === run.patternId)?.skillId
        : null;
      if (authoredUse) {
        authoredUse.runId = run.id;
        authoredUse.adaptiveReviewEligible = false;
        authoredUse.conceptIds = [conceptId];
        authoredUse.skillIds = uniqueV4([skillId, patternSkillId]);
        use.push(authoredUse);
      } else {
        const practicalSituation = practicalSituationV4(concept, lesson);
        const useQuestion = situation(
          practicalSituation.prompt,
          conceptOptionsForRunV4(lesson, concept, "dutch", runOptionConceptIdsV4(run)),
          concept.dutch,
          `اس موقع میں درست Nederlands “${concept.dutch}” ہے۔`
        );
        useQuestion.scenarioId = practicalSituation.scenarioId;
        useQuestion.semanticKey = `${run.id}:use-situation:${concept.id}`;
        use.push(addSyntheticExerciseV4({
          lesson,
          run,
          question: useQuestion,
          phase: "use",
          conceptIds: [conceptId],
          skillIds: uniqueV4([skillId, patternSkillId]),
          scope: `use-situation:${conceptId}`
        }));
      }
    });

    const earlierExercises = [...understand, ...guided, ...use];
    const desiredChecks = Math.min(6, Math.max(5, run.skillIds.length));
    const checks = [];
    run.skillIds.forEach((skillId) => {
      if (checks.length >= desiredChecks) return;
      const source = earlierExercises.find((question) => question.skillIds.includes(skillId))
        || earlierExercises[checks.length % Math.max(1, earlierExercises.length)];
      if (source) checks.push(cloneForIndependentCheckV4(lesson, run, source, checks.length, skillId));
    });
    while (checks.length < desiredChecks && earlierExercises.length) {
      const source = earlierExercises[checks.length % earlierExercises.length];
      checks.push(cloneForIndependentCheckV4(
        lesson,
        run,
        source,
        checks.length,
        source.skillIds[0]
      ));
    }

    // Learn is represented by teaching cards, never by a recycled v3 uitleg
    // record that may mention material from a later run.
    const learnExerciseIds = authoredExplanations;
    run.phases = {
      preview: {
        outcomeUrdu: run.outcomeUrdu,
        prerequisiteSkillIds: run.prerequisiteSkillIds
      },
      learn: {
        teachingBlockIds: run.teachingBlockIds,
        exerciseIds: learnExerciseIds,
        scored: false
      },
      understand: {
        exerciseIds: understand.map((question) => question.id),
        helpVisible: true
      },
      guidedPractice: {
        exerciseIds: guided.map((question) => question.id),
        helpVisible: true
      },
      use: {
        exerciseIds: use.map((question) => question.id)
      },
      independentCheck: {
        exerciseIds: checks.map((question) => question.id),
        minimumScore: 0.8,
        automaticHints: false
      },
      correction: {
        mode: "retry-missed",
        required: true,
        requiresSupportedRetry: true
      }
    };
  });

  lesson.exercises = lesson.questions;
  return runs;
}

const a0StartUseScenesV4 = {
  hallo: "سیڑھیوں پر نئے پڑوسی سے ملاقات ہوتی ہے۔ ایسا عام سلام چنیں جو صبح، دوپہر، یا شام ہر وقت چلتا ہے۔",
  goedenavond: "شام کو عمارت کے نگہبان سے ملاقات ہوئی ہے۔ کون سا سلام مناسب ہے؟",
  dag: "جان پہچان والے دکاندار کو مختصر سلام کہنا ہے۔ کیا کہیں؟",
  alstublieft: "آپ کاؤنٹر پر کسی کو اپنا کاغذ دے رہے ہیں۔ کاغذ دیتے وقت کیا کہیں؟",
  sorry: "راستے میں آپ سے کسی کو ہلکی ٹکر لگ گئی۔ فوراً کیا کہیں؟",
  "goed dank u": "سامنے والا پوچھتا ہے: Hoe gaat het? اپنی خیریت کا مختصر مؤدبانہ جواب دیں۔",
  "ik begrijp het niet": "ڈاکٹر کی آخری بات آپ کو سمجھ نہیں آئی۔ اپنی مشکل صاف کیسے بتائیں؟",
  "langzamer alstublieft": "کاؤنٹر پر ملازم بہت تیز بول رہا ہے۔ رفتار کم کرنے کے لیے کیا کہیں؟",
  "nog een keer": "مختصر اعلان کا آخری حصہ سنائی نہیں دیا۔ ایک بار پھر سننے کے لیے کیا کہیں؟",
  "wat betekent dit": "فارم پر ایک لفظ سمجھ نہیں آ رہا۔ اس کا معنی پوچھنے کے لیے کیا کہیں؟",
  "ik spreek een beetje nederlands": "گفتگو شروع ہوتے ہی بتانا ہے کہ آپ صرف تھوڑی ڈچ بولتے ہیں۔ کیا کہیں؟",
  "luister alstublieft": "آپ کسی کی توجہ ایک اہم آواز کی طرف دلانا چاہتے ہیں۔ کیا کہیں؟",
  "zeg het nog een keer": "جان پہچان والے شخص سے وہی مختصر بات پھر کہلوانی ہے۔ کیا کہیں؟",
  "ja ik begrijp het": "سامنے والا پوچھتا ہے: Begrijpt u mij? بات اب سمجھ آ گئی ہے۔ کیا جواب دیں؟",
  ja: "دکاندار پوچھتا ہے کہ کیا آپ رسید چاہتے ہیں۔ آپ رضامند ہیں۔ مختصر جواب کیا ہے؟",
  goed: "ڈاکٹر پوچھتا ہے کہ اب حالت کیسی ہے۔ حالت اچھی ہے۔ مختصر جواب دیں۔",
  "niet goed": "مرمت کے بعد چیز ابھی بھی صحیح کام نہیں کر رہی۔ اس کی حالت مختصر طور پر بتائیں۔"
};

function applyA0StartUseScenesV4(lesson) {
  if (!a0StartSpeakingLessonIdsV4.has(lesson.id)) return;
  for (const question of lesson.exercises || []) {
    if (question.phase !== "use") continue;
    const concept = (question.conceptIds || [])
      .map((conceptId) => conceptByIdV4.get(conceptId))
      .find(Boolean);
    const key = normalizedTextV4(concept?.dutch || question.answer);
    const prompt = a0StartUseScenesV4[key];
    if (!prompt) continue;
    Object.assign(question, {
      prompt: `حال: ${prompt}`,
      instructionUrdu: "صورت پڑھیں اور اسی موقع میں بولی جانے والی درست ڈچ بات منتخب کریں",
      scenarioId: `a0-start:${semanticSlugV4(key, "reply")}`,
      authenticUse: true
    });
  }
}

function resolveA1AuthoredSkillRefsV4(refs) {
  return uniqueV4((refs || []).map(([lessonId, dutch]) => {
    const concept = [...conceptByIdV4.values()].find((candidate) => (
      candidate.introducedInLessonId === lessonId
      && normalizedTextV4(candidate.dutch) === normalizedTextV4(dutch)
    ));
    return concept ? skillIdByConceptIdV4.get(concept.id) : null;
  }).filter(Boolean));
}

function applyA1AuthoredQuestionFeedbackV4(question, concept, scenario, lessonId, suffix = "") {
  if (!question || !concept || !scenario) return;
  const [stableId, prompt] = scenario;
  const sourceSuffix = suffix ? `:${suffix}` : "";
  const chapterId = String(lessonId).slice(0, 2);
  const source = `${chapterId}-authored:${semanticSlugV4(lessonId)}:${stableId}${sourceSuffix}`;
  const instruction = "صورت پڑھیں اور اسی موقع کی درست ڈچ بات منتخب کریں۔";
  const correct = `درست۔ “${concept.dutch}” = “${concept.urdu}”۔`;
  const wrong = `اس صورت میں “${concept.dutch}” کہیں: “${concept.urdu}”۔`;
  const lessonSpec = authoredCurriculumForLessonV4(lessonId)?.lessons?.[lessonId] || {};
  const authoredPrompt = suffix === "independent-check"
    ? lessonId === "a1-details-forms"
      ? `فارم جمع کرنے سے پہلے دوسرا ملازم ${prompt.replace(/^ملازم\s+/u, "").replace(/[۔؟]+$/u, "")}۔ اب مدد کے بغیر جواب دیں۔`
      : lessonSpec.independentCheckLeadUrdu
        ? `${lessonSpec.independentCheckLeadUrdu}: ${prompt.replace(/[۔؟]+$/u, "")}۔ اب مدد کے بغیر جواب دیں۔`
        : `${prompt.replace(/[۔؟]+$/u, "")}۔ اب مدد کے بغیر جواب دیں۔`
    : prompt;
  Object.assign(question, {
    prompt: `حال: ${authoredPrompt}`,
    scenarioId: `${lessonId}:${stableId}${sourceSuffix}`,
    scenarioSource: source,
    authenticUse: true,
    instructionUrdu: instruction,
    instruction,
    explainCorrectUrdu: correct,
    correctExplanation: correct,
    explainWrongUrdu: wrong,
    wrongExplanation: wrong
  });
}

function applyA1AuthoredLessonExperienceV4(lesson) {
  const spec = authoredCurriculumForLessonV4(lesson.id)?.lessons?.[lesson.id];
  if (!spec) return;
  const questionById = new Map(lesson.questions.map((question) => [question.id, question]));
  for (const run of lesson.learning?.runs || []) {
    for (const questionId of run.phases?.use?.exerciseIds || []) {
      const question = questionById.get(questionId);
      if (question?.scored === false) continue;
      const concept = (question?.conceptIds || [])
        .map((conceptId) => conceptByIdV4.get(conceptId))
        .find(Boolean);
      const scenario = concept ? spec.scenarios[normalizedTextV4(concept.dutch)] : null;
      applyA1AuthoredQuestionFeedbackV4(question, concept, scenario, lesson.id);
    }
    for (const questionId of run.phases?.independentCheck?.exerciseIds || []) {
      const question = questionById.get(questionId);
      if (question?.type !== "situation") continue;
      const concept = (question.conceptIds || [])
        .map((conceptId) => conceptByIdV4.get(conceptId))
        .find(Boolean);
      const scenario = concept ? spec.scenarios[normalizedTextV4(concept.dutch)] : null;
      applyA1AuthoredQuestionFeedbackV4(
        question,
        concept,
        scenario,
        lesson.id,
        "independent-check"
      );
    }
  }

  if (spec.documents?.length) {
    for (const run of lesson.learning?.runs || []) {
      const documentSpec = spec.documents[run.index - 1];
      if (!documentSpec) continue;
      const exerciseIds = [
        ...(run.phases?.understand?.exerciseIds || []),
        ...(run.phases?.use?.exerciseIds || []),
        ...(run.phases?.independentCheck?.exerciseIds || [])
      ];
      for (const exerciseId of exerciseIds) {
        const question = questionById.get(exerciseId);
        if (question?.type !== "document-choice") continue;
        const concept = (question.conceptIds || [])
          .map((conceptId) => conceptByIdV4.get(conceptId))
          .find(Boolean);
        const correct = concept
          ? `درست۔ “${concept.dutch}” = “${concept.urdu}”۔`
          : question.explainCorrectUrdu;
        const wrong = concept
          ? `نشان زدہ قطار دوبارہ دیکھیں: “${concept.dutch}” = “${concept.urdu}”۔`
          : question.explainWrongUrdu;
        Object.assign(question, {
          document: {
            documentKind: documentSpec.documentKind,
            title: documentSpec.title,
            rows: documentSpec.rows.map((row) => ({ ...row }))
          },
          prompt: `${documentSpec.title} کی قطاریں پڑھیں اور نشان زدہ ڈچ بات کا درست اردو مطلب منتخب کریں۔`,
          scenarioId: `${lesson.id}:run-${run.index}:authored-document`,
          scenarioSource: `a2-authored:${semanticSlugV4(lesson.id)}:run-${run.index}:document`,
          authenticDocument: true,
          instructionUrdu: "نشان زدہ قطار پڑھیں اور درست اردو مطلب منتخب کریں۔",
          instruction: "نشان زدہ قطار پڑھیں اور درست اردو مطلب منتخب کریں۔",
          explainCorrectUrdu: correct,
          correctExplanation: correct,
          explainWrongUrdu: wrong,
          wrongExplanation: wrong
        });
      }
    }
    return;
  }

  if (!spec.document) return;
  const targetConcept = lesson.conceptIds
    .map((conceptId) => conceptByIdV4.get(conceptId))
    .find((concept) => (
      normalizedTextV4(concept?.dutch) === normalizedTextV4(spec.document.targetDutch)
    ));
  const run = lesson.learning.runs.find((candidate) => (
    candidate.conceptIds.includes(targetConcept?.id)
  ));
  const targetSkillId = targetConcept ? skillIdByConceptIdV4.get(targetConcept.id) : null;
  if (!targetConcept || !targetSkillId || !run) return;
  const patternSkillId = lesson.pattern?.skillId || null;
  if (patternSkillId) {
    // The late form-reading task deliberately reuses the already taught form
    // pattern.  Keep that reused pattern inside the run's declared evidence
    // and attach it to one practical Use and one Check item.
    run.skillIds = uniqueV4([...run.skillIds, patternSkillId]);
    run.prerequisiteSkillIds = uniqueV4([...run.prerequisiteSkillIds, patternSkillId]);
    const useEvidence = (run.phases?.use?.exerciseIds || [])
      .map((id) => lesson.questions.find((question) => question.id === id))
      .find(Boolean);
    const checkEvidence = (run.phases?.independentCheck?.exerciseIds || [])
      .map((id) => lesson.questions.find((question) => question.id === id))
      .find(Boolean);
    if (useEvidence) useEvidence.skillIds = uniqueV4([...useEvidence.skillIds, patternSkillId]);
    if (checkEvidence) checkEvidence.skillIds = uniqueV4([...checkEvidence.skillIds, patternSkillId]);
  }
  const documentSpec = spec.document;
  const answer = canonicalUrduForDutchV4(lesson, targetConcept.dutch, targetConcept.urdu);
  const documentQuestion = addSyntheticExerciseV4({
    lesson,
    run,
    question: {
      type: "document-choice",
      label: documentSpec.labelUrdu || "ذاتی معلومات کا فارم پڑھیں",
      prompt: documentSpec.promptUrdu || "فارم میں 06 12345678 کے سامنے لکھے ڈچ خانے کا درست اردو مطلب منتخب کریں۔",
      document: {
        documentKind: documentSpec.documentKind || "personal-details-form",
        title: documentSpec.title,
        rows: documentSpec.rows.map((row) => ({ ...row }))
      },
      options: conceptOptionsForRunV4(
        lesson,
        targetConcept,
        "urdu",
        runOptionConceptIdsV4(run)
      ),
      answer,
      explain: `${targetConcept.dutch} = ${answer}۔`,
      semanticKey: `a1-authored:${documentSpec.stableId}`
    },
    phase: "understand",
    conceptIds: [targetConcept.id],
    skillIds: uniqueV4([targetSkillId, patternSkillId]),
    scope: `understand:authored-document:${documentSpec.stableId}`
  });
  const instruction = documentSpec.instructionUrdu
    || "ڈچ فارم کے خانوں کے نام پڑھیں، 06 12345678 کے سامنے والا خانہ دیکھیں، پھر اس کا درست اردو مطلب منتخب کریں۔";
  const correct = documentSpec.correctUrdu
    || "درست۔ Telefoonnummer فون نمبر کا خانہ ہے، اور اس فارم میں اس کے سامنے 06 12345678 لکھا ہے۔";
  const wrong = documentSpec.wrongUrdu
    || "یہ دوسرا خانہ ہے۔ 06 12345678 کے سامنے Telefoonnummer لکھا ہے، اس لیے درست مطلب فون نمبر ہے۔";
  const documentSourceKey = documentSpec.sourceKey || "details-form";
  Object.assign(documentQuestion, {
    scenarioId: `${lesson.id}:${documentSpec.stableId}`,
    scenarioSource: `a1-authored:${documentSourceKey}:${documentSpec.stableId}`,
    authenticDocument: true,
    instructionUrdu: instruction,
    instruction,
    explainCorrectUrdu: correct,
    correctExplanation: correct,
    explainWrongUrdu: wrong,
    wrongExplanation: wrong
  });
  run.phases.understand.exerciseIds.push(documentQuestion.id);
}

let previousChapterLastLessonV4 = null;
for (const chapter of chaptersV4) {
  let previousNormalLesson = null;
  const normalLessons = chapter.lessons.filter((lesson) => lesson.kind !== "mission");
  for (const lesson of normalLessons) {
    const unit = unitForLessonV4(chapter, lesson.id);
    const conceptIds = lessonConceptIdsV4.get(lesson.id) || [];
    const pattern = makePatternV4(lesson, chapter.id, conceptIds);
    const authoredSpec = ["a1", "a2"].includes(chapter.id)
      ? authoredCurriculumForLessonV4(lesson.id)?.lessons?.[lesson.id] || null
      : null;
    const prerequisiteLesson = previousNormalLesson || previousChapterLastLessonV4;
    const prerequisiteSkillIds = authoredSpec
      ? resolveA1AuthoredSkillRefsV4(authoredSpec.prerequisiteRefs)
      : prerequisiteLesson
        ? prerequisiteLesson.skillIds.slice(-5)
        : [];
    const newConceptIds = conceptIds.filter((conceptId) => (
      conceptByIdV4.get(conceptId)?.introducedInLessonId === lesson.id
    ));
    const reviewConceptIds = conceptIds.filter((conceptId) => !newConceptIds.includes(conceptId));
    const effectivePrerequisiteSkillIds = uniqueV4([
      ...prerequisiteSkillIds,
      ...reviewConceptIds.map((conceptId) => skillIdByConceptIdV4.get(conceptId))
    ]);
    const skillIds = uniqueV4([
      ...conceptIds.map((conceptId) => skillIdByConceptIdV4.get(conceptId)),
      pattern?.skillId
    ]);
    const prerequisiteLessonIds = authoredSpec
      ? [...authoredSpec.prerequisiteLessonIds]
      : prerequisiteLesson
        ? [prerequisiteLesson.id]
        : [];

    Object.assign(lesson, {
      kind: "lesson",
      chapterId: chapter.id,
      unitId: unit?.id || `${chapter.id}-unassigned`,
      outcomeUrdu: isUrduText(lesson.description)
        ? lesson.description
        : `${lesson.title} کے متعلق Nederlands سمجھنا اور مناسب موقع میں استعمال کرنا۔`,
      prerequisites: {
        lessonIds: prerequisiteLessonIds,
        skillIds: effectivePrerequisiteSkillIds,
        recommended: true
      },
      prerequisiteSkillIds: effectivePrerequisiteSkillIds,
      conceptIds,
      newConceptIds,
      reviewConceptIds,
      skillIds,
      pattern,
      teachingBlocks: []
    });

    for (const question of lesson.questions) {
      annotateQuestionV4({
        lesson,
        question,
        conceptIds,
        pattern,
        scopeId: lesson.id
      });
    }

    const runs = buildLearningRunsV4(lesson, chapter.id, pattern, effectivePrerequisiteSkillIds);
    applyA0StartUseScenesV4(lesson);
    lesson.teachingBlocks = [
      ...new Map(
        runs.flatMap((run) => run.teachingBlocks)
          .map((block) => [block.id, block])
      ).values()
    ];
    lesson.learning = {
      outcomeUrdu: lesson.outcomeUrdu,
      prerequisiteSkillIds: effectivePrerequisiteSkillIds,
      conceptIds,
      skillIds,
      phaseOrder: learningPhaseOrderV4,
      estimatedMinutes: Math.max(8, runs.length * 8),
      runs
    };
    applyA1AuthoredLessonExperienceV4(lesson);
    previousNormalLesson = lesson;
  }
  previousChapterLastLessonV4 = normalLessons[normalLessons.length - 1] || previousChapterLastLessonV4;
}

function selectMissionConceptsV4(mission, eligibleSkillIds) {
  const missionChapterId = mission.id.slice(0, 2);
  const levelBase = missionChapterId === "a0" ? 5 : missionChapterId === "a1" ? 6 : 7;
  const coverageTarget = levelBase + (parseInt(stableHashV4(mission.id), 36) % 2);
  const missionText = [
    mission.title,
    mission.description,
    ...mission.questions.flatMap(questionTargetTextsV4)
  ].join(" ");
  const eligibleConcepts = uniqueV4(eligibleSkillIds)
    .map((skillId, index) => {
      const skill = skillByIdV4.get(skillId);
      const concept = skill?.conceptId ? conceptByIdV4.get(skill.conceptId) : null;
      if (!concept?.introducedInLessonId) return null;
      if (concept.introducedInLessonId.slice(0, 2) !== missionChapterId) return null;
      const overlap = hasUsefulOverlapV4(missionText, concept.dutch) ? 1 : 0;
      const phrase = dutchWordsV4(concept.dutch).length > 1 ? 1 : 0;
      return { concept, overlap, phrase, index };
    })
    .filter(Boolean)
    .sort((left, right) => (
      right.overlap - left.overlap
      || right.phrase - left.phrase
      || right.index - left.index
    ));
  const selected = eligibleConcepts.slice(0, coverageTarget).map((item) => item.concept.id);
  return uniqueV4(
    selected.length >= 3
      ? selected
      : eligibleConcepts.slice(0, Math.min(coverageTarget, eligibleConcepts.length)).map((item) => item.concept.id)
  );
}

function missionConceptOptionsV4(conceptIds, conceptId, key) {
  const concept = conceptByIdV4.get(conceptId);
  return uniqueOptions([
    concept?.[key],
    ...conceptIds.map((id) => conceptByIdV4.get(id)?.[key])
  ]).slice(0, 3);
}

function rewriteMissionToTaughtConceptsV4(mission, conceptIds) {
  const phraseIds = conceptIds.filter((conceptId) => (
    dutchWordsV4(conceptByIdV4.get(conceptId)?.dutch).length > 1
  ));
  const practicalIds = phraseIds.length >= 3 ? phraseIds : conceptIds;
  const missionDomain = lessonDomainV4(mission.id);
  const scenarioTitle = domainScenarioTitleUrduV4(missionDomain);
  mission.scenarioTitleUrdu = scenarioTitle;
  mission.scenarioId = `${mission.id}:${missionDomain}`;
  const scenarioNames = ["arrival", "changed-details", "follow-up"];
  const variantDetails = [
    "سامنے والا آپ کی بات سن رہا ہے",
    "وقت یا تفصیل بدلنے کے بعد بات دوبارہ واضح کرنی ہے",
    "جواب ملنے کے بعد اگلا عملی قدم مکمل کرنا ہے"
  ];

  const makeMissionQuestion = (type, conceptId, variantIndex, stage) => {
    const concept = conceptByIdV4.get(conceptId);
    const conceptLesson = chaptersV4
      .flatMap((chapter) => chapter.lessons)
      .find((lesson) => lesson.id === concept?.introducedInLessonId);
    const canonicalUrdu = concept
      ? canonicalUrduForDutchV4(
        conceptLesson,
        concept.dutch,
        concept.urdu
      )
      : "";
    const targetSituation = practicalSituationV4(
      concept,
      conceptLesson || { id: mission.id, description: scenarioTitle }
    ).prompt.replace(/^حال:\s*/u, "");
    const stageContext = `${targetSituation} ${variantDetails[variantIndex]}۔`;
    const scenarioId = `${mission.id}:${scenarioNames[variantIndex]}:${stage}`;
    const base = {
      generatedConceptId: conceptId,
      conceptIds: [conceptId],
      missionStage: stage,
      scenarioId
    };
    if (type === "situation") {
      return {
        ...base,
        ...situation(
          `حال: ${stageContext}`,
          missionConceptOptionsV4(conceptIds, conceptId, "dutch"),
          concept.dutch,
          `اس موقع میں کہیں: ${concept.dutch}۔`
        ),
        semanticKey: `${scenarioId}:situation:${concept.id}`
      };
    }
    if (type === "listen-choice") {
      return {
        ...base,
        ...listenChoice(
          concept.audioText || concept.dutch,
          missionConceptOptionsV4(conceptIds, conceptId, "urdu"),
          canonicalUrdu,
          `${concept.dutch} = ${canonicalUrdu}۔`
        ),
        prompt: `${stageContext} آواز سن کر درست اردو مطلب منتخب کریں۔`,
        mode: "listen-meaning",
        semanticKey: `${scenarioId}:listening:${concept.id}`
      };
    }
    if (type === "document-choice") {
      const conceptDomain = lessonDomainV4(conceptLesson?.id || mission.id);
      return {
        ...base,
        type: "document-choice",
        label: "عملی دستاویز پڑھ کر مطلب سمجھیں",
        prompt: `${stageContext} سامنے موجود دستاویز میں متعلقہ ڈچ بات کا درست مطلب منتخب کریں۔`,
        document: authenticDocumentV4(
          conceptDomain,
          concept,
          `${scenarioTitle}: ${domainScenarioTitleUrduV4(conceptDomain)}`,
          variantIndex
        ),
        options: missionConceptOptionsV4(conceptIds, conceptId, "urdu"),
        answer: canonicalUrdu,
        explain: `${concept.dutch} = ${canonicalUrdu}۔`,
        semanticKey: `${scenarioId}:document-reading:${concept.id}`
      };
    }
    return {
      ...base,
      type: "build",
      label: "موقع کے مطابق ڈچ بات بنائیں",
      prompt: `${stageContext}؛ ${canonicalUrdu}`,
      tiles: concept.dutch.split(/\s+/).filter(Boolean),
      answer: concept.dutch,
      explain: `صحیح لفظی ترتیب: ${concept.dutch}۔`,
      semanticKey: `${scenarioId}:supported-build:${concept.id}`
    };
  };

  for (const [variantIndex, variant] of (mission.variants || []).entries()) {
    const rotatedConceptIds = rotate(
      practicalIds,
      (variantIndex * 2) % Math.max(1, practicalIds.length)
    );
    const types = ["situation", "listen-choice", "document-choice", "build"];
    const questions = [];
    for (let index = 0; index < types.length; index += 1) {
      questions.push(makeMissionQuestion(
        types[index],
        rotatedConceptIds[index % rotatedConceptIds.length],
        variantIndex,
        "use"
      ));
    }
    for (let index = 0; index < types.length; index += 1) {
      questions.push(makeMissionQuestion(
        types[index],
        rotatedConceptIds[(index + types.length) % rotatedConceptIds.length],
        variantIndex,
        "check"
      ));
    }
    variant.scenarioId = `${mission.id}:${scenarioNames[variantIndex]}`;
    variant.title = `${scenarioTitle} — ${
      ["پہلا موقع", "بدلی ہوئی تفصیل", "اگلا قدم"][variantIndex]
    }`;
    variant.questions = questions;
  }
}

function a0MissionTargetV4(lessonId, dutch, situations, related = []) {
  return {
    refs: [{ lessonId, dutch }, ...related],
    situations
  };
}

/*
 * A0 missions are deliberately authored instead of being assembled from a
 * rotating question template.  Each target represents a preceding lesson
 * strand, every variant supplies supported Use evidence before Check, and the
 * final mission samples all nine A0 units without introducing a surprise word.
 */
const a0MissionPlansV4 = {
  "a0-start-speaking-mission": {
    variantTitles: [
      "نئی عمارت میں پہلی گفتگو",
      "دکان کے کاؤنٹر پر مختصر گفتگو",
      "اسکول کے دروازے پر مختصر گفتگو"
    ],
    documentTitles: ["عمارت کا استقبالی پیغام", "کاؤنٹر کا مختصر نوٹ", "اسکول کا مختصر پیغام"],
    documentLabels: ["پہلی بات", "اگلا جواب"],
    targets: [
      a0MissionTargetV4("a0-greetings-courtesy", "hallo", [
        "صبح نئی عمارت میں پڑوسی سے پہلی بار ملتے ہیں۔ بات شروع کریں۔",
        "دکان میں ملازم آپ کی طرف متوجہ ہوتا ہے۔ گفتگو شروع کریں۔",
        "اسکول کے دروازے پر استاد سے ملاقات ہوتی ہے۔ پہلے سلام کریں۔"
      ]),
      a0MissionTargetV4("a0-greetings-courtesy", "dank u wel", [
        "پڑوسی آپ کے لیے دروازہ کھلا رکھتا ہے۔ ادب سے شکریہ کہیں۔",
        "ملازم آپ کو رسید واپس دیتا ہے۔ ادب سے شکریہ کہیں۔",
        "استاد آپ کو مطلوبہ معلومات دیتا ہے۔ ادب سے شکریہ کہیں۔"
      ]),
      a0MissionTargetV4("a0-understanding-help", "kunt u herhalen", [
        "پڑوسی نے اپنا نام بتایا مگر آپ سن نہ سکے۔ بات دوبارہ مانگیں۔",
        "کاؤنٹر پر قیمت کا آخری حصہ سنائی نہیں دیا۔ پوری بات دوبارہ مانگیں۔",
        "استاد کی آخری بات سنائی نہیں دی۔ مؤدبانہ طور پر دہرانے کو کہیں۔"
      ]),
      a0MissionTargetV4("a0-understanding-help", "langzamer alstublieft", [
        "پڑوسی بہت تیز بول رہا ہے۔ رفتار کم کرنے کی مختصر درخواست کریں۔",
        "ملازم ہدایات بہت تیزی سے بتا رہا ہے۔ آہستہ بولنے کو کہیں۔",
        "فون پر اسکول کا پیغام بہت تیز ہے۔ آہستہ بولنے کی درخواست کریں۔"
      ]),
      a0MissionTargetV4("a0-ja-nee-goed-niet", "nee", [
        "پڑوسی پوچھتا ہے کہ کیا آپ کو مزید مدد چاہیے؛ ابھی ضرورت نہیں۔ مختصر جواب دیں۔",
        "دکاندار پوچھتا ہے کہ کیا آپ تھیلا چاہتے ہیں؛ آپ نہیں چاہتے۔ مختصر جواب دیں۔",
        "استاد پوچھتا ہے کہ کیا کوئی اور سوال ہے؛ ابھی کوئی سوال نہیں۔ مختصر جواب دیں۔"
      ]),
      a0MissionTargetV4("a0-greetings-courtesy", "tot ziens", [
        "گفتگو مکمل ہو گئی ہے اور آپ پڑوسی سے رخصت ہو رہے ہیں۔ مناسب بات کہیں۔",
        "خریداری مکمل ہو گئی ہے اور آپ دکان سے جا رہے ہیں۔ مناسب رخصتی کہیں۔",
        "اسکول کی بات مکمل ہو گئی ہے اور آپ واپس جا رہے ہیں۔ مناسب رخصتی کہیں۔"
      ])
    ]
  },
  "a0-letters-sounds-mission": {
    variantTitles: [
      "گھر کے نشان اور لفظ پہچانیں",
      "دکان کی مختصر فہرست پڑھیں",
      "کمرے کی تصویری فہرست مکمل کریں"
    ],
    documentTitles: ["گھر کی لفظی فہرست", "خریداری کی چھوٹی فہرست", "کمرے کی تصویری فہرست"],
    documentLabels: ["پہلا لفظ", "دوسرا لفظ"],
    targets: [
      a0MissionTargetV4("a0-letters-1", "a", [
        "دروازے پر پہلا سکھایا ہوا بڑا حرف دکھائی دیتا ہے۔ سیکھی ہوئی آواز پہچانیں۔",
        "لفظی کارڈ پر پہلا سکھایا ہوا حرف لکھا ہے۔ درست حرف پہچانیں۔",
        "تصویری فہرست میں پہلے سکھائے ہوئے حرف کا خانہ مکمل کرنا ہے۔ درست حرف چنیں۔"
      ]),
      a0MissionTargetV4("a0-letters-1", "b", [
        "کتاب کے کارڈ پر دوسرا سکھایا ہوا حرف ہے۔ درست حرف پہچانیں۔",
        "دکان کی چھوٹی فہرست میں دوسرا سکھایا ہوا حرف سنائی دیتا ہے۔ درست حرف چنیں۔",
        "کمرے کی مشق میں دوسرے سکھائے ہوئے حرف کا کارڈ الگ رکھنا ہے۔ درست حرف پہچانیں۔"
      ]),
      a0MissionTargetV4("a0-letters-2", "huis", [
        "گھر کی تصویر کے نیچے صحیح ڈچ لفظ لگانا ہے۔ درست لفظ چنیں۔",
        "پتے کے تصویری کارڈ پر گھر کا لفظ سنائی دیتا ہے۔ اسے پہچانیں۔",
        "کمرے کی فہرست میں گھر کی تصویر کے لیے صحیح لفظ چنیں۔"
      ]),
      a0MissionTargetV4("a0-letters-2", "i", [
        "آواز کی مشق میں اس سبق کا چھوٹا مصوتہ سنائی دیتا ہے۔ درست حرف پہچانیں۔",
        "فہرست کے ایک خانے میں سکھایا ہوا مصوتہ لکھنا ہے۔ صحیح حرف چنیں۔",
        "تصویری لفظ کے شروع میں چھوٹا مصوتہ سنائی دیتا ہے۔ سیکھی ہوئی شکل پہچانیں۔"
      ]),
      a0MissionTargetV4("a0-letters-3", "rijst", [
        "باورچی خانے کی فہرست میں چاول شامل کرنے ہیں۔ صحیح ڈچ لفظ چنیں۔",
        "دکان میں چاول کے کارڈ پر لکھا لفظ پہچانیں۔",
        "کھانے کی تصویری فہرست میں چاول کے لیے صحیح لفظ لگائیں۔"
      ]),
      a0MissionTargetV4("a0-letters-3", "water", [
        "گھر کی فہرست میں پانی شامل کرنا ہے۔ صحیح ڈچ لفظ چنیں۔",
        "دکان میں پانی کی بوتل کے کارڈ پر لکھا لفظ پہچانیں۔",
        "تصویری فہرست میں پانی کے لیے صحیح لفظ لگائیں۔"
      ])
    ]
  },
  "a0-first-sentences-mission": {
    variantTitles: [
      "نئے پڑوسی سے تعارف",
      "کمیونٹی مرکز میں تعارف",
      "اسکول کے استقبالی کمرے میں تعارف"
    ],
    documentTitles: ["پڑوسی کا تعارف کارڈ", "مرکز کا تعارف فارم", "اسکول کا تعارف کارڈ"],
    documentLabels: ["تعارف", "خاندان"],
    targets: [
      a0MissionTargetV4("a0-ik-jij-u", "u", [
        "نئے پڑوسی سے ادب کے ساتھ آپ کہنا ہے۔ درست ڈچ لفظ پہچانیں۔",
        "مرکز کے ملازم سے رسمی انداز میں آپ کہنا ہے۔ درست لفظ چنیں۔",
        "استقبالی استاد سے ادب کے ساتھ آپ کہنا ہے۔ درست لفظ چنیں۔"
      ]),
      a0MissionTargetV4("a0-people-nouns", "familie", [
        "پڑوسی آپ کے ساتھ موجود لوگوں کے بارے میں پوچھتا ہے۔ خاندان کا لفظ چنیں۔",
        "فارم پر خاندان کی تصویر کے لیے صحیح لفظ درکار ہے۔ درست لفظ چنیں۔",
        "اسکول کے کارڈ پر خاندان کی تصویر ہے۔ صحیح ڈچ لفظ پہچانیں۔"
      ]),
      a0MissionTargetV4("a0-hij-zij-wij", "zij", [
        "ایک عورت کی طرف اشارہ کرکے وہ کہنا ہے۔ درست ڈچ ضمیر چنیں۔",
        "خاتون ملازم کے بارے میں وہ کہنا ہے۔ درست لفظ چنیں۔",
        "بچی کی والدہ کے بارے میں وہ کہنا ہے۔ درست ضمیر چنیں۔"
      ]),
      a0MissionTargetV4("a0-een-de-het", "een vrouw", [
        "تصویر میں ایک عورت ہے۔ مکمل سیکھی ہوئی ڈچ بات چنیں۔",
        "تعارف فارم میں ایک عورت لکھنا ہے۔ درست فقرہ چنیں۔",
        "استقبالی کارڈ پر ایک عورت دکھائی گئی ہے۔ صحیح فقرہ پہچانیں۔"
      ]),
      a0MissionTargetV4("a0-first-sentences", "ik ben een vrouw", [
        "نئے پڑوسی کو اپنے بارے میں مکمل چھوٹا جملہ کہنا ہے۔ درست جملہ بنائیں۔",
        "مرکز میں اپنے بارے میں ایک مکمل تعارفی جملہ کہیں۔",
        "استقبالی کمرے میں اپنے بارے میں مکمل چھوٹی بات کہیں۔"
      ], [{ lessonId: "a0-ben-bent-is", dutch: "ik ben" }]),
      a0MissionTargetV4("a0-name-land-city", "mijn naam is Ali", [
        "پڑوسی کو اپنا نام علی بتانا ہے۔ مکمل تعارفی جملہ کہیں۔",
        "مرکز کے ملازم کو اپنا نام علی بتائیں۔ مکمل جملہ کہیں۔",
        "اسکول کے استقبالی کمرے میں اپنا نام علی بتائیں۔ مکمل جملہ کہیں۔"
      ])
    ]
  },
  "a0-people-things-mission": {
    variantTitles: [
      "کلاس میں اپنی چیزیں",
      "گھر میں گمشدہ چیز",
      "کمیونٹی مرکز کی میز"
    ],
    documentTitles: ["کلاس کی چیزوں کی فہرست", "گمشدہ چیز کا نوٹ", "میز کی چیزوں کی فہرست"],
    documentLabels: ["موجود چیز", "ملکیت"],
    targets: [
      a0MissionTargetV4("a0-hebben-1", "ik heb een boek", [
        "کلاس میں بتانا ہے کہ آپ کے پاس ایک کتاب ہے۔ مکمل جملہ کہیں۔",
        "گھر میں فہرست بناتے ہوئے بتائیں کہ آپ کے پاس ایک کتاب ہے۔",
        "مرکز کی میز پر اپنی کتاب دکھا کر بتائیں کہ یہ آپ کے پاس ہے۔"
      ]),
      a0MissionTargetV4("a0-geen", "ik heb geen boek", [
        "کلاس میں کتاب مانگی گئی مگر آپ کے پاس کتاب نہیں۔ مکمل جملہ کہیں۔",
        "گھر کی فہرست میں بتانا ہے کہ آپ کے پاس کتاب نہیں۔",
        "مرکز میں ملازم کتاب پوچھتا ہے مگر آپ کے پاس نہیں۔ مکمل جملہ کہیں۔"
      ]),
      a0MissionTargetV4("a0-possessive", "mijn huis", [
        "تصویر میں اپنا گھر دکھا کر میرا گھر کہنا ہے۔ درست فقرہ چنیں۔",
        "گمشدہ چیز کے نوٹ میں اپنے گھر کا ذکر کرنا ہے۔ درست فقرہ چنیں۔",
        "مرکز کے نقشے میں اپنا گھر دکھا کر درست فقرہ کہیں۔"
      ]),
      a0MissionTargetV4("a0-dit-dat-questions", "wat is dit", [
        "میز پر ایک نامعلوم چیز ہے۔ اس کے بارے میں چھوٹا سوال پوچھیں۔",
        "گھر میں ایک چیز پہچان میں نہیں آ رہی۔ یہ کیا ہے پوچھیں۔",
        "مرکز کی میز پر رکھی چیز کا نام معلوم کرنا ہے۔ درست سوال کہیں۔"
      ])
    ]
  },
  "a0-numbers-time-mission": {
    variantTitles: [
      "ملاقات کا وقت اور رابطہ",
      "فون پر وقت بدلنا",
      "استقبالی کاؤنٹر پر معلومات"
    ],
    documentTitles: ["ملاقات کارڈ", "فون نوٹ", "استقبالی فارم"],
    documentLabels: ["اہم نمبر", "وقت یا رابطہ"],
    targets: [
      a0MissionTargetV4("a0-numbers-0-10", "vier euro", [
        "ملاقات کے سفر کا ٹکٹ چار یورو ہے۔ رقم پہچانیں۔",
        "فون پر بتائی گئی فیس چار یورو ہے۔ درست رقم چنیں۔",
        "کاؤنٹر پر چار یورو ادا کرنے ہیں۔ رقم کی ڈچ بات پہچانیں۔"
      ]),
      a0MissionTargetV4("a0-numbers-11-100", "huisnummer veertien", [
        "ملاقات کے کارڈ پر گھر نمبر چودہ درج کرنا ہے۔ مکمل بات کہیں۔",
        "فون پر اپنا گھر نمبر چودہ بتانا ہے۔ مکمل بات کہیں۔",
        "استقبالی فارم میں گھر نمبر چودہ بتایا گیا ہے۔ اسے پہچانیں۔"
      ]),
      a0MissionTargetV4("a0-time-days", "om acht uur", [
        "ملاقات آٹھ بجے ہے۔ پورا وقت ڈچ میں کہیں۔",
        "فون پر نیا وقت آٹھ بجے بتایا گیا ہے۔ اسے پہچانیں۔",
        "کاؤنٹر پر آٹھ بجے پہنچنے کی بات کرنی ہے۔ پورا وقت کہیں۔"
      ]),
      a0MissionTargetV4("a0-spelling-personal-details", "hoe spelt u dat?", [
        "نام سن لیا مگر حروف معلوم نہیں۔ ادب سے ہجے پوچھیں۔",
        "فون پر نام واضح نہیں ہوا۔ اس کے ہجے پوچھیں۔",
        "کاؤنٹر پر لکھنے سے پہلے نام کے ہجے پوچھیں۔"
      ]),
      a0MissionTargetV4("a0-address-phone", "mijn nummer is nul zes", [
        "ملاقات کے فارم میں اپنا فون نمبر صفر چھ سے شروع بتائیں۔",
        "فون پر رابطے کے لیے اپنا نمبر صفر چھ سے شروع بتائیں۔",
        "کاؤنٹر پر اپنا نمبر صفر چھ سے شروع بتائیں۔"
      ]),
      a0MissionTargetV4("a0-date-appointment", "ik heb een afspraak", [
        "استقبال پر بتانا ہے کہ آپ کی ملاقات ہے۔ مکمل جملہ کہیں۔",
        "فون اٹھانے والے کو بتائیں کہ آپ کی ملاقات ہے۔",
        "کاؤنٹر پر پہنچ کر اپنی ملاقات کی وجہ واضح کریں۔"
      ])
    ]
  },
  "a0-mission-home-start": {
    variantTitles: [
      "نئے گھر میں چیز کی جگہ",
      "مرمت والے کو گھر کی بات",
      "گھر سے نکلنے سے پہلے"
    ],
    documentTitles: ["گھر کی مختصر فہرست", "مرمت کا پیغام", "گھر سے نکلنے کی فہرست"],
    documentLabels: ["جگہ", "ضروری کام"],
    targets: [
      a0MissionTargetV4("a0-place-1", "op de tafel", [
        "چابی میز کے اوپر ہے۔ جگہ کی درست ڈچ بات کہیں۔",
        "مرمت والے کے کاغذ میز کے اوپر رکھے ہیں۔ جگہ بتائیں۔",
        "نکلنے سے پہلے کارڈ میز کے اوپر رکھا ہے۔ جگہ بتائیں۔"
      ]),
      a0MissionTargetV4("a0-place-2", "naast de tafel", [
        "کرسی میز کے ساتھ ہے۔ جگہ کی سیکھی ہوئی بات پہچانیں۔",
        "مرمت کا سامان میز کے ساتھ رکھا ہے۔ جگہ بتائیں۔",
        "بیگ میز کے ساتھ رکھا ہے۔ صحیح جگہ کہیں۔"
      ]),
      a0MissionTargetV4("a0-gaan-komen", "ik ga", [
        "اب آپ کو نکلنا ہے۔ میں جاتا ہوں کی مختصر بات کہیں۔",
        "مرمت کی بات مکمل ہے اور آپ جانے کی اطلاع دیتے ہیں۔ مختصر بات کہیں۔",
        "دروازہ بند کرنے کے بعد آپ روانہ ہو رہے ہیں۔ مختصر بات کہیں۔"
      ]),
      a0MissionTargetV4("a0-naar-met", "zij gaat naar school", [
        "گھر سے ایک بچی اسکول جا رہی ہے۔ اس کے بارے میں مکمل جملہ کہیں۔",
        "مرمت والے کو بتانا ہے کہ گھر کی ایک فرد اسکول جا رہی ہے۔ مکمل جملہ کہیں۔",
        "راستے میں ایک خاتون اسکول کی طرف جا رہی ہے۔ اس کے بارے میں مکمل جملہ کہیں۔"
      ]),
      a0MissionTargetV4("a0-home-needs", "de verwarming doet het niet", [
        "گھر ٹھنڈا ہے اور ہیٹنگ کام نہیں کر رہی۔ خرابی واضح کریں۔",
        "مرمت والے کو اصل مسئلہ بتائیں: ہیٹنگ کام نہیں کرتی۔",
        "نکلنے سے پہلے مالک کو ہیٹنگ کی خرابی کا پیغام دیں۔"
      ])
    ]
  },
  "a0-mission-neighbourhood": {
    variantTitles: [
      "چھوٹی دکان میں خریداری",
      "کیفے کے کاؤنٹر پر",
      "سپر مارکیٹ میں ادائیگی"
    ],
    documentTitles: ["خریداری کی رسید", "کاؤنٹر کا آرڈر", "ادائیگی کی رسید"],
    documentLabels: ["چیز یا مشروب", "ادائیگی"],
    targets: [
      a0MissionTargetV4("a0-daily-actions", "ik drink water", [
        "خریداری کے بعد بتانا ہے کہ آپ پانی پیتے ہیں۔ مکمل جملہ کہیں۔",
        "کیفے میں اپنی روزمرہ عادت بتائیں کہ آپ پانی پیتے ہیں۔",
        "سپر مارکیٹ میں ساتھی کو بتائیں کہ آپ پانی پیتے ہیں۔"
      ]),
      a0MissionTargetV4("a0-food-drink", "ik wil graag water", [
        "دکان میں پانی مؤدبانہ طور پر مانگیں۔",
        "کیفے کے کاؤنٹر پر پانی مانگیں۔",
        "سپر مارکیٹ کے کاؤنٹر پر پانی کی درخواست کریں۔"
      ]),
      a0MissionTargetV4("a0-shopping-payment", "hoeveel kost dit", [
        "ایک چیز کی قیمت معلوم نہیں۔ قیمت کا سوال پوچھیں۔",
        "کاؤنٹر پر آرڈر کی قیمت پوچھیں۔",
        "سپر مارکیٹ میں چیز دکھا کر قیمت پوچھیں۔"
      ]),
      a0MissionTargetV4("a0-shopping-payment", "ik betaal met pin", [
        "دکاندار ادائیگی کا طریقہ پوچھتا ہے۔ بتائیں کہ پن سے ادا کریں گے۔",
        "کیفے کے کاؤنٹر پر پن سے ادائیگی کی بات کہیں۔",
        "سپر مارکیٹ کی کَیش جگہ پر پن سے ادائیگی کی بات کہیں۔"
      ])
    ]
  },
  "a0-mission-help": {
    variantTitles: [
      "اسٹیشن سے دواخانے تک",
      "بس کے سفر میں طبی مدد",
      "رات کو فوری صحت کی مدد"
    ],
    documentTitles: ["سفر اور راستے کا نوٹ", "بس اور صحت کا پیغام", "فوری مدد کا کارڈ"],
    documentLabels: ["راستہ یا سفر", "صحت یا مدد"],
    targets: [
      a0MissionTargetV4("a0-transport-directions", "waar is het station", [
        "سفر شروع کرنے کے لیے اسٹیشن کا راستہ پوچھیں۔",
        "بس سے اترنے کے بعد اسٹیشن معلوم کرنا ہے۔ درست سوال کہیں۔",
        "رات کے وقت مددگار سے اسٹیشن کی جگہ پوچھیں۔"
      ]),
      a0MissionTargetV4("a0-transport-directions", "ik wil een kaartje", [
        "اسٹیشن کے کاؤنٹر پر ایک ٹکٹ مانگیں۔",
        "بس میں سفر کے لیے ٹکٹ کی درخواست کریں۔",
        "رات کی گاڑی کے لیے ٹکٹ مانگیں۔"
      ]),
      a0MissionTargetV4("a0-transport-directions", "ga rechtdoor", [
        "راستہ بتاتے ہوئے سیدھا جانے کی ہدایت دیں۔",
        "مسافر کو بس اسٹاپ تک سیدھا جانے کو کہیں۔",
        "مددگار آپ کو سیدھا جانے کی بات بتاتا ہے۔ اسے پہچانیں۔"
      ]),
      a0MissionTargetV4("a0-health-emergency", "ik ben ziek", [
        "دواخانے پہنچ کر بتائیں کہ آپ بیمار ہیں۔",
        "بس میں طبیعت خراب ہے۔ مددگار کو بتائیں کہ آپ بیمار ہیں۔",
        "رات کو فون پر بتائیں کہ آپ بیمار ہیں۔"
      ]),
      a0MissionTargetV4("a0-health-emergency", "waar is de apotheek", [
        "اسٹیشن کے قریب دواخانے کی جگہ پوچھیں۔",
        "بس ڈرائیور سے دواخانے کی جگہ پوچھیں۔",
        "رات کو کھلے دواخانے کا راستہ پوچھیں۔"
      ]),
      a0MissionTargetV4("a0-health-emergency", "bel 112", [
        "فوری خطرہ ہے اور کسی کو ہنگامی نمبر ملانے کو کہنا ہے۔",
        "مسافر کو فوری طبی مدد چاہیے۔ ہنگامی نمبر ملانے کی ہدایت دیں۔",
        "رات کو حالت بہت خراب ہو گئی ہے۔ فوراً ہنگامی نمبر ملانے کو کہیں۔"
      ])
    ]
  },
  "a0-school-work-safety-mission": {
    variantTitles: [
      "بیمار بچے کے دن کا انتظام",
      "اسکول اور کام کو صبح کا پیغام",
      "عمارت سے محفوظ رخصتی"
    ],
    documentTitles: ["دن کے ضروری پیغامات", "صبح کا رابطہ نوٹ", "محفوظ رخصتی کی فہرست"],
    documentLabels: ["پہلی ضروری بات", "اگلا عملی قدم"],
    completion: true,
    useTypes: [
      ["situation", "document-choice", "sequence", "sequence", "sequence", "sequence"],
      ["meaning", "situation", "sequence", "sequence", "sequence", "sequence"],
      ["listen-choice", "situation", "sequence", "sequence", "sequence", "sequence"]
    ],
    checkTypes: [
      ["meaning", "listen-choice", "sequence", "sequence", "sequence", "sequence"],
      ["listen-choice", "document-choice", "sequence", "sequence", "sequence", "sequence"],
      ["document-choice", "meaning", "sequence", "sequence", "sequence", "sequence"]
    ],
    targets: [
      a0MissionTargetV4("a0-understanding-help", "kunt u herhalen", [
        "فون پر پہلی بات سنائی نہیں دی۔ مؤدبانہ طور پر دوبارہ مانگیں۔",
        "صبح کے پیغام کا آخری حصہ واضح نہیں۔ دوبارہ کہنے کو کہیں۔",
        "رخصتی کی ہدایت سنائی نہیں دی۔ مؤدبانہ طور پر دہرانے کو کہیں۔"
      ]),
      a0MissionTargetV4("a0-letters-3", "water", [
        "بیمار بچے کے لیے فہرست میں پانی کا لفظ پہچانیں۔",
        "صبح کی ضروری چیزوں میں پانی کا ڈچ لفظ چنیں۔",
        "رخصتی سے پہلے پانی کی بوتل کے کارڈ پر لفظ پہچانیں۔"
      ]),
      a0MissionTargetV4("a0-name-land-city", "mijn naam is Ali", [
        "فون پر پہلے اپنا نام علی بتائیں، پھر رابطے کے لیے اپنا صفر چھ والا نمبر دیں۔",
        "صبح کے پیغام میں اپنا نام علی اور صفر چھ سے شروع فون نمبر درست ترتیب سے دیں۔",
        "عمارت کے کاؤنٹر پر اپنا نام علی اور صفر چھ سے شروع نمبر درست ترتیب سے بتائیں۔"
      ], [{ lessonId: "a0-address-phone", dutch: "mijn nummer is nul zes" }]),
      a0MissionTargetV4("a0-possessive", "mijn huis", [
        "اپنے گھر کا ذکر کریں، پھر بتائیں کہ وہاں ہیٹنگ کام نہیں کر رہی۔",
        "مرمت کے پیغام میں پہلے میرا گھر کہیں، پھر ہیٹنگ کی خرابی بتائیں۔",
        "رخصت ہونے سے پہلے اپنے گھر اور ہیٹنگ کی خرابی کی دو باتیں درست ترتیب سے کہیں۔"
      ], [{ lessonId: "a0-home-needs", dutch: "de verwarming doet het niet" }]),
      a0MissionTargetV4("a0-transport-directions", "ik wil een kaartje", [
        "فارمیسی جانے کے سفر میں پہلے ٹکٹ مانگیں، پھر پن سے ادائیگی بتائیں۔",
        "صبح کے سفر میں ٹکٹ کی درخواست اور پن سے ادائیگی کی بات درست ترتیب سے کہیں۔",
        "محفوظ روانگی سے پہلے ٹکٹ مانگنے اور پن سے ادا کرنے کی بات ترتیب دیں۔"
      ], [{ lessonId: "a0-shopping-payment", dutch: "ik betaal met pin" }]),
      a0MissionTargetV4("a0-child-school", "mijn kind komt vandaag niet", [
        "پہلے اسکول کو بچے کی غیر حاضری، پھر کام کو اپنی غیر حاضری، اور آخر میں عمارت سے نکلنے کا راستہ پوچھیں۔",
        "صبح پہلے اسکول، پھر کام کو درست پیغام دیں، اور آخر میں باہر جانے کی جگہ پوچھیں۔",
        "محفوظ رخصتی میں بچے، کام، اور باہر جانے کی تین سیکھی ہوئی باتیں درست ترتیب سے کہیں۔"
      ], [
        { lessonId: "a0-work-basics", dutch: "ik kan vandaag niet komen" },
        { lessonId: "a0-weather-clothing-safety", dutch: "waar is de uitgang" }
      ])
    ]
  }
};

const a0DefaultMissionUseTypesV4 = [
  ["situation", "reverse", "listen-choice", "meaning", "document-choice", "build"],
  ["listen-choice", "document-choice", "situation", "reverse", "meaning", "build"],
  ["document-choice", "meaning", "reverse", "listen-choice", "situation", "build"]
];
const a0DefaultMissionCheckTypesV4 = [
  ["listen-choice", "meaning", "situation", "document-choice", "build", "reverse"],
  ["document-choice", "situation", "listen-choice", "reverse", "meaning", "build"],
  ["situation", "reverse", "document-choice", "listen-choice", "build", "meaning"]
];

function resolveA0MissionTargetV4(target) {
  const resolved = target.refs.map((ref) => {
    const concept = [...conceptByIdV4.values()].find((candidate) => (
      candidate.introducedInLessonId === ref.lessonId
      && normalizedTextV4(candidate.dutch) === normalizedTextV4(ref.dutch)
    ));
    if (!concept) {
      throw new Error(`Missing A0 mission concept: ${ref.lessonId} / ${ref.dutch}`);
    }
    const skillId = skillIdByConceptIdV4.get(concept.id);
    if (!skillId) throw new Error(`Missing A0 mission skill: ${concept.id}`);
    return { concept, skillId, lessonId: ref.lessonId };
  });
  return { ...target, resolved };
}

function a0MissionOptionsV4(targets, target, key) {
  return uniqueOptions([
    target.resolved[0].concept[key],
    ...targets.map((item) => item.resolved[0].concept[key])
  ]).slice(0, 3);
}

function a0MissionDocumentV4(plan, targets, targetIndex, variantIndex) {
  const target = targets[targetIndex];
  const companion = targets[(targetIndex + 1) % targets.length];
  return {
    documentKind: plan.completion ? "day-plan" : "practical-note",
    title: plan.documentTitles[variantIndex],
    rows: [
      {
        label: plan.documentLabels[0],
        value: target.resolved[0].concept.dutch
      },
      {
        label: plan.documentLabels[1],
        value: companion.resolved[0].concept.dutch
      }
    ]
  };
}

function buildA0MissionQuestionV4({
  mission,
  plan,
  targets,
  targetIndex,
  variantIndex,
  phase,
  requestedType
}) {
  const target = targets[targetIndex];
  const primary = target.resolved[0].concept;
  const concepts = target.resolved.map((item) => item.concept);
  const skillIds = target.resolved.map((item) => item.skillId);
  const conceptIds = concepts.map((concept) => concept.id);
  const situationUrdu = target.situations[variantIndex];
  const multiTarget = concepts.length > 1;
  let type = multiTarget ? "sequence" : requestedType;
  if (phase === "use" && type === "meaning") type = "reverse";
  if (type === "build" && dutchWordsV4(primary.dutch).length < 2) type = "reverse";
  const semanticKey = [
    "a0-authored-mission",
    mission.id,
    `variant-${variantIndex + 1}`,
    phase,
    `slot-${targetIndex + 1}`,
    type,
    ...concepts.map((concept) => semanticSlugV4(concept.dutch, "target"))
  ].join(":");
  const common = {
    type,
    label: phase === "use" ? "مدد کے ساتھ عملی استعمال" : "آزاد عملی جانچ",
    semanticKey,
    generatedConceptId: primary.id,
    authoredConceptIds: conceptIds,
    authoredSkillIds: skillIds,
    authoredPhase: phase,
    scenarioId: `${mission.id}:variant-${variantIndex + 1}:target-${targetIndex + 1}`,
    authenticUse: true
  };
  const urduOptions = a0MissionOptionsV4(targets, target, "urdu");
  const dutchOptions = a0MissionOptionsV4(targets, target, "dutch");
  let question;

  if (type === "meaning") {
    question = {
      ...common,
      prompt: primary.dutch,
      options: urduOptions,
      answer: primary.urdu,
      explain: `${primary.dutch} = ${primary.urdu}۔`
    };
  } else if (type === "reverse") {
    question = {
      ...common,
      prompt: phase === "use" ? `حال: ${situationUrdu}` : primary.urdu,
      options: dutchOptions,
      answer: primary.dutch,
      explain: `${primary.urdu} کے لیے ${primary.dutch} کہیں۔`
    };
  } else if (type === "listen-choice") {
    question = {
      ...common,
      // The situation tells the learner what to say, so it is not repeated
      // on items that ask for the meaning of what they hear or read.
      prompt: "عملی موقع میں یہ ڈچ بات سنیں اور اس کا درست اردو مطلب چنیں۔",
      speak: primary.audioText || primary.dutch,
      mode: "listen-meaning",
      options: urduOptions,
      answer: primary.urdu,
      explain: `${primary.dutch} = ${primary.urdu}۔`
    };
  } else if (type === "document-choice") {
    question = {
      ...common,
      prompt: `دستاویز میں “${primary.dutch}” والی قطار پڑھیں اور اس کا درست اردو مطلب چنیں۔`,
      document: a0MissionDocumentV4(plan, targets, targetIndex, variantIndex),
      options: urduOptions,
      answer: primary.urdu,
      explain: `${primary.dutch} = ${primary.urdu}۔`
    };
  } else if (type === "build") {
    question = {
      ...common,
      prompt: `${situationUrdu} الفاظ کو درست ترتیب میں رکھیں۔`,
      tiles: primary.dutch.split(/\s+/).filter(Boolean),
      answer: primary.dutch,
      explain: `درست لفظی ترتیب: ${primary.dutch}۔`
    };
  } else if (type === "sequence") {
    const steps = concepts.map((concept) => concept.dutch);
    question = {
      ...common,
      prompt: `${situationUrdu} سیکھی ہوئی مکمل باتوں کو عملی ترتیب میں رکھیں۔`,
      tiles: steps,
      answer: steps.join(" | "),
      explain: `درست ترتیب: ${steps.join("، پھر ")}۔`
    };
  } else {
    question = {
      ...common,
      type: "situation",
      prompt: `حال: ${situationUrdu}`,
      options: dutchOptions,
      answer: primary.dutch,
      explain: `اس موقع میں کہیں: ${primary.dutch}۔`
    };
  }

  const action = {
    meaning: "سیکھی ہوئی ڈچ بات پڑھیں اور اسی موقع کے مطابق درست اردو مطلب منتخب کریں",
    reverse: "اردو ضرورت پڑھیں اور پہلے سیکھی ہوئی درست ڈچ بات منتخب کریں",
    "listen-choice": "اسی موقع کی ڈچ بات سنیں اور درست اردو مطلب منتخب کریں",
    "document-choice": "مختصر حقیقی دستاویز پڑھیں اور نشان زدہ ڈچ بات کا درست اردو مطلب منتخب کریں",
    build: "دیے گئے سکھائے ہوئے الفاظ سے اسی موقع کی مکمل ڈچ بات بنائیں",
    sequence: "سکھائی ہوئی مکمل باتوں کو اس عملی کام کی درست ترتیب میں رکھیں",
    situation: "صورت پڑھیں اور اسی موقع میں بولی جانے والی درست ڈچ بات منتخب کریں"
  }[question.type];
  question.authoredInstructionUrdu = ["listen-choice", "document-choice", "meaning"].includes(question.type)
    ? `${action}۔`
    : `${situationUrdu} ${action}۔`;
  question.authoredHintUrdu = phase === "use"
    ? `مدد: “${primary.dutch}” کا مطلب “${primary.urdu}” ہے۔`
    : `جواب دینے کے بعد ضرورت ہو تو یاد کریں: “${primary.dutch}” = “${primary.urdu}”۔`;
  question.authoredCorrectExplanation = multiTarget
    ? `درست۔ یہ ترتیب پہلے سیکھی ہوئی باتوں کو حقیقی کام کے مطابق جوڑتی ہے: ${concepts.map((concept) => concept.dutch).join("، پھر ")}۔`
    : `درست۔ “${primary.dutch}” کا مطلب “${primary.urdu}” ہے اور یہی اس موقع کی مناسب بات ہے۔`;
  question.authoredWrongExplanation = multiTarget
    ? `ترتیب دوبارہ دیکھیں: پہلے ${concepts[0].dutch}، پھر ${concepts.slice(1).map((concept) => concept.dutch).join("، پھر ")}۔`
    : `یہ جواب اس موقع کے ہدف سے مختلف ہے۔ یہاں “${primary.dutch}” کہنا یا پہچاننا ہے؛ اس کا مطلب “${primary.urdu}” ہے۔`;
  return question;
}

function buildA0MissionPlanV4(mission, plan) {
  const targets = plan.targets.map(resolveA0MissionTargetV4);
  const conceptIds = uniqueV4(
    targets.flatMap((target) => target.resolved.map((item) => item.concept.id))
  );
  const assessmentSkillIds = uniqueV4(
    targets.flatMap((target) => target.resolved.map((item) => item.skillId))
  );
  const prerequisiteLessonIds = uniqueV4(
    targets.flatMap((target) => target.resolved.map((item) => item.lessonId))
  );
  const variants = (mission.variants || []).slice(0, 3);
  while (variants.length < 3) {
    variants.push({
      id: `${mission.id}-variant-${variants.length + 1}`,
      title: plan.variantTitles[variants.length],
      questions: []
    });
  }

  for (let variantIndex = 0; variantIndex < variants.length; variantIndex += 1) {
    const variant = variants[variantIndex];
    const useTypes = plan.useTypes?.[variantIndex]
      || a0DefaultMissionUseTypesV4[variantIndex];
    const checkTypes = plan.checkTypes?.[variantIndex]
      || a0DefaultMissionCheckTypesV4[variantIndex];
    const questions = [];
    const speakingTarget = targets[variantIndex % targets.length].resolved[0].concept;
    questions.push({
      type: "speak-repeat",
      label: "سنیں اور بغیر اسکور کے دہرائیں",
      prompt: `${plan.variantTitles[variantIndex]} میں پہلے یہ سیکھی ہوئی بات آہستہ سنیں اور دہرائیں۔`,
      speak: speakingTarget.audioText || speakingTarget.dutch,
      answer: speakingTarget.dutch,
      scored: false,
      semanticKey: `a0-authored-mission:${mission.id}:variant-${variantIndex + 1}:use:speaking:${semanticSlugV4(speakingTarget.dutch, "target")}`,
      generatedConceptId: speakingTarget.id,
      authoredConceptIds: [speakingTarget.id],
      authoredSkillIds: [skillIdByConceptIdV4.get(speakingTarget.id)],
      authoredPhase: "use",
      authoredInstructionUrdu: `“${speakingTarget.dutch}” عام رفتار اور پھر آہستہ سنیں، بلند آواز میں دہرائیں؛ اس پر اسکور نہیں ہوگا۔`,
      authoredHintUrdu: `آواز کو چھوٹے حصوں میں سنیں: ${speakingTarget.pronunciationUrdu}۔`,
      authoredCorrectExplanation: `آپ نے “${speakingTarget.dutch}” کی بغیر اسکور والی بولنے کی مشق مکمل کی۔`,
      authoredWrongExplanation: `آواز دوبارہ آہستہ سنیں اور ایک بار پھر دہرائیں۔`
    });
    for (let targetIndex = 0; targetIndex < targets.length; targetIndex += 1) {
      questions.push(buildA0MissionQuestionV4({
        mission,
        plan,
        targets,
        targetIndex,
        variantIndex,
        phase: "use",
        requestedType: useTypes[targetIndex % useTypes.length]
      }));
    }
    for (let targetIndex = 0; targetIndex < targets.length; targetIndex += 1) {
      questions.push(buildA0MissionQuestionV4({
        mission,
        plan,
        targets,
        targetIndex,
        variantIndex,
        phase: "independent-check",
        requestedType: checkTypes[targetIndex % checkTypes.length]
      }));
    }
    Object.assign(variant, {
      title: plan.variantTitles[variantIndex],
      scenarioId: `${mission.id}:authored-variant-${variantIndex + 1}`,
      questions
    });
  }

  mission.variants = variants;
  mission.scenarioTitleUrdu = plan.variantTitles[0];
  mission.scenarioId = `${mission.id}:a0-authored-capstone`;
  return { conceptIds, assessmentSkillIds, prerequisiteLessonIds };
}

function organizeMissionVariantV4(variant) {
  const authoredPhases = variant.questions.map((question) => question.phase);
  const firstAuthoredCheck = authoredPhases.indexOf("independent-check");
  const hasCompleteAuthoredOrder = (
    authoredPhases.length > 0
    && authoredPhases.every((phase) => ["use", "independent-check"].includes(phase))
    && firstAuthoredCheck > 0
    && authoredPhases.slice(firstAuthoredCheck).every((phase) => phase === "independent-check")
  );
  if (hasCompleteAuthoredOrder) {
    const use = variant.questions.slice(0, firstAuthoredCheck);
    const checks = variant.questions.slice(firstAuthoredCheck);
    for (const question of checks) {
      question.automaticHint = false;
      question.hintMode = "after-attempt";
    }
    return {
      preview: { exerciseIds: [], scored: false },
      use: { exerciseIds: use.map((question) => question.id) },
      independentCheck: {
        exerciseIds: checks.map((question) => question.id),
        minimumScore: 0.8,
        automaticHints: false
      },
      correction: {
        mode: "retry-missed",
        required: true,
        requiresSupportedRetry: true
      }
    };
  }

  const preview = [];
  const use = [];
  const checks = [];
  const seenTypes = new Set();
  const checkedTypes = new Set();
  const checkableTypes = new Set([
    "document-choice",
    "listen-choice",
    "situation",
    "sequence",
    "build",
    "image-choice",
    "short-input"
  ]);

  for (const question of variant.questions) {
    if (question.type === "uitleg") {
      // Preview is lesson metadata, not a scored or answerable exercise. Keep
      // the contextual mission explanation inside Use so every exercise has
      // one of the canonical assessable learning phases.
      question.phase = "use";
      use.push(question);
      continue;
    }
    const canCheck = (
      checks.length < 5
      && checkableTypes.has(question.type)
      && seenTypes.has(question.type)
      && !checkedTypes.has(question.type)
    );
    if (canCheck) {
      question.phase = "independent-check";
      question.automaticHint = false;
      question.hintMode = "after-attempt";
      checks.push(question);
      checkedTypes.add(question.type);
    } else {
      question.phase = "use";
      use.push(question);
      seenTypes.add(question.type);
    }
  }

  if (checks.length < 5) {
    for (let index = use.length - 1; index >= 0 && checks.length < 5; index -= 1) {
      const question = use[index];
      const earlierSameType = use.slice(0, index).some((item) => item.type === question.type);
      if (!earlierSameType || !checkableTypes.has(question.type)) continue;
      use.splice(index, 1);
      question.phase = "independent-check";
      question.automaticHint = false;
      question.hintMode = "after-attempt";
      checks.unshift(question);
    }
  }

  variant.questions = [...preview, ...use, ...checks];
  return {
    preview: { exerciseIds: preview.map((question) => question.id), scored: false },
    use: { exerciseIds: use.map((question) => question.id) },
    independentCheck: {
      exerciseIds: checks.map((question) => question.id),
      minimumScore: 0.8,
      automaticHints: false
    },
    correction: {
      mode: "retry-missed",
      required: true,
      requiresSupportedRetry: true
    }
  };
}

function compactMissionVariantV4(variant, phases, assessmentSkillIds) {
  const questionById = new Map(variant.questions.map((question) => [question.id, question]));
  const useQuestions = phases.use.exerciseIds.map((id) => questionById.get(id)).filter(Boolean);
  const checkQuestions = phases.independentCheck.exerciseIds
    .map((id) => questionById.get(id))
    .filter(Boolean);
  const selectedUseIds = new Set();
  const selectUse = (question) => {
    if (question) selectedUseIds.add(question.id);
  };

  selectUse(useQuestions.find((question) => question.type === "uitleg"));
  selectUse(useQuestions.find((question) => question.type === "speak-repeat"));
  for (const checkType of uniqueV4(checkQuestions.map((question) => question.type))) {
    selectUse(useQuestions.find((question) => question.type === checkType));
  }

  const coveredSkills = () => new Set([
    ...checkQuestions,
    ...useQuestions.filter((question) => selectedUseIds.has(question.id))
  ].flatMap((question) => question.skillIds || []));
  for (const skillId of assessmentSkillIds) {
    if (coveredSkills().has(skillId)) continue;
    selectUse(useQuestions.find((question) => question.skillIds?.includes(skillId)));
  }

  const desiredUseCount = Math.max(
    selectedUseIds.size,
    Math.min(
      useQuestions.length,
      assessmentSkillIds.length + 2 + (parseInt(stableHashV4(variant.id), 36) % 2)
    )
  );
  for (const question of useQuestions) {
    if (selectedUseIds.size >= desiredUseCount) break;
    selectUse(question);
  }

  const compactUse = useQuestions.filter((question) => selectedUseIds.has(question.id));
  variant.questions = [...compactUse, ...checkQuestions];
  return {
    preview: { exerciseIds: [], scored: false },
    use: { exerciseIds: compactUse.map((question) => question.id) },
    independentCheck: {
      exerciseIds: checkQuestions.map((question) => question.id),
      minimumScore: 0.8,
      automaticHints: false
    },
    correction: {
      mode: "retry-missed",
      required: true,
      requiresSupportedRetry: true
    }
  };
}

for (const chapter of chaptersV4) {
  for (const lesson of chapter.lessons) {
    if (lesson.kind !== "mission") continue;

    const unit = unitForLessonV4(chapter, lesson.id);
    const unitNormalLessons = (unit?.lessonIds || [])
      .map((lessonId) => chapter.lessons.find((item) => item.id === lessonId))
      .filter((item) => item?.kind === "lesson");
    const unitEligibleSkillIds = uniqueV4(
      unitNormalLessons.flatMap((item) => item.skillIds || [])
    );
    if (unit) {
      lesson.title = `${unit.title}: عملی مشن`;
      lesson.description = `${unit.goal} اس مشن میں اسی یونٹ کی پہلے سیکھی ہوئی باتیں استعمال کریں۔`;
    }
    const a0MissionPlan = chapter.id === "a0" ? a0MissionPlansV4[lesson.id] : null;
    const authoredA0Mission = a0MissionPlan
      ? buildA0MissionPlanV4(lesson, a0MissionPlan)
      : null;
    const conceptIds = authoredA0Mission?.conceptIds
      || selectMissionConceptsV4(lesson, unitEligibleSkillIds);
    if (!authoredA0Mission) rewriteMissionToTaughtConceptsV4(lesson, conceptIds);
    const assessmentSkillIds = authoredA0Mission?.assessmentSkillIds
      || uniqueV4(conceptIds.map((conceptId) => skillIdByConceptIdV4.get(conceptId)));
    const prerequisiteLessonIds = authoredA0Mission?.prerequisiteLessonIds
      || unitNormalLessons.slice(-2).map((item) => item.id);
    Object.assign(lesson, {
      chapterId: chapter.id,
      unitId: unit?.id || `${chapter.id}-unassigned`,
      outcomeUrdu: isUrduText(lesson.description)
        ? lesson.description
        : `${lesson.title} کا عملی کام مکمل کرنا۔`,
      conceptIds,
      prerequisites: {
        lessonIds: prerequisiteLessonIds,
        skillIds: assessmentSkillIds,
        recommended: true
      },
      prerequisiteSkillIds: assessmentSkillIds,
      assessmentSkillIds,
      introducesNewSkills: false,
      requiresMastery: "practiced-or-secure"
    });

    const missionVariantPhases = new Map();
    for (const variant of lesson.variants || []) {
      for (const question of variant.questions) {
        const authoredConceptIds = uniqueV4(question.authoredConceptIds || []);
        const authoredSkillIds = uniqueV4(question.authoredSkillIds || []);
        const authoredPhase = question.authoredPhase;
        const authoredInstructionUrdu = question.authoredInstructionUrdu;
        const authoredHintUrdu = question.authoredHintUrdu;
        const authoredCorrectExplanation = question.authoredCorrectExplanation;
        const authoredWrongExplanation = question.authoredWrongExplanation;
        annotateQuestionV4({
          lesson,
          question,
          conceptIds,
          pattern: null,
          scopeId: variant.id,
          allowedSkillIds: assessmentSkillIds
        });
        if (authoredA0Mission) {
          Object.assign(question, {
            phase: authoredPhase,
            conceptIds: authoredConceptIds,
            skillIds: authoredSkillIds,
            instructionUrdu: authoredInstructionUrdu,
            instruction: authoredInstructionUrdu,
            hintUrdu: authoredHintUrdu,
            hint: authoredHintUrdu,
            explainCorrectUrdu: authoredCorrectExplanation,
            explainWrongUrdu: authoredWrongExplanation,
            correctExplanation: authoredCorrectExplanation,
            wrongExplanation: authoredWrongExplanation
          });
          if (authoredPhase === "independent-check") {
            question.automaticHint = false;
            question.hintMode = "after-attempt";
          }
        }
      }
      const organizedPhases = organizeMissionVariantV4(variant);
      missionVariantPhases.set(
        variant.id,
        authoredA0Mission
          ? organizedPhases
          : compactMissionVariantV4(variant, organizedPhases, assessmentSkillIds)
      );
    }
    lesson.questions = (lesson.variants || []).flatMap((variant) => variant.questions);

    lesson.learning = {
      outcomeUrdu: lesson.outcomeUrdu,
      prerequisiteSkillIds: assessmentSkillIds,
      assessmentSkillIds,
      conceptIds,
      phaseOrder: ["preview", "use", "independent-check", "correction"],
      variants: (lesson.variants || []).map((variant) => ({
        id: variant.id,
        title: variant.title,
        exerciseIds: variant.questions.map((question) => question.id),
        phases: missionVariantPhases.get(variant.id)
      }))
    };
  }
}

function resolveA1MissionTargetV4(target) {
  const resolveConcept = (reference) => (lessonConceptIdsV4.get(reference.lessonId) || [])
    .map((conceptId) => conceptByIdV4.get(conceptId))
    .find((candidate) => normalizedTextV4(candidate?.dutch) === normalizedTextV4(reference.dutch));
  const concept = resolveConcept(target);
  if (!concept) return null;
  const relatedConcepts = (target.related || []).map(resolveConcept).filter(Boolean);
  if (relatedConcepts.length !== (target.related || []).length) return null;
  const pattern = target.patternLessonId
    ? patternsV4.find((candidate) => candidate.lessonId === target.patternLessonId)
    : null;
  const conceptSkillId = skillIdByConceptIdV4.get(concept.id);
  const skillIds = uniqueV4([
    pattern?.skillId || conceptSkillId,
    ...(target.includeConceptSkill && pattern?.skillId ? [conceptSkillId] : []),
    ...relatedConcepts.map((candidate) => skillIdByConceptIdV4.get(candidate.id))
  ].filter(Boolean));
  return {
    concept,
    relatedConcepts,
    ownedConceptIds: uniqueV4([concept.id, ...relatedConcepts.map((candidate) => candidate.id)]),
    skillIds,
    compoundDutch: target.compoundDutch || "",
    compoundUrdu: target.compoundUrdu || "",
    taskUrdu: target.taskUrdu || ""
  };
}

function a1MissionDocumentV4(plan = {}, targetDutch = "") {
  const document = plan.document;
  if (document) {
    const rows = document.rows.map((row) => ({ ...row }));
    if (targetDutch && !rows.some((row) => normalizedTextV4(row.value) === normalizedTextV4(targetDutch))) {
      rows.push({ label: `خانہ ${rows.length + 1}`, value: targetDutch });
    }
    return {
      documentKind: document.documentKind || "practical-document",
      title: document.title,
      rows
    };
  }
  const rows = [
    { label: "Voornaam", value: "Sara" },
    { label: "Geboortedatum", value: "12 mei" },
    { label: "Telefoonnummer", value: "nul zes" }
  ];
  if (targetDutch) rows.push({ label: `خانہ ${rows.length + 1}`, value: targetDutch });
  return {
    documentKind: "personal-details-form",
    title: "Voornaam",
    rows
  };
}

function makeA1AuthoredMissionQuestionV4({
  mission,
  conceptIds,
  target,
  variantIndex,
  slotIndex,
  phase,
  type,
  context,
  plan,
  targets = [target]
}) {
  const { concept, skillIds } = target;
  const answerDutchFor = (item) => item.compoundDutch || item.concept.dutch;
  const answerUrduFor = (item) => item.compoundUrdu || canonicalUrduForDutchV4(mission, item.concept.dutch, item.concept.urdu);
  const targetDutch = answerDutchFor(target);
  const canonicalUrdu = answerUrduFor(target);
  // The variant context describes the whole mission and does not fit every
  // phrase, so prompts use only the situation written for this phrase.
  const lessonScenario = authoredCurriculumForLessonV4(concept.introducedInLessonId)
    ?.lessons?.[concept.introducedInLessonId]?.scenarios?.[normalizedTextV4(concept.dutch)]?.[1]
    || a2ScenarioLookupV4.get(normalizedTextV4(concept.dutch))
    || "";
  const situationUrdu = target.taskUrdu || (target.compoundDutch ? "" : lessonScenario);
  const missionSettingUrdu = plan.scenarioTitleUrdu ? `${plan.scenarioTitleUrdu}:` : context;
  if (target.compoundDutch && type === "document-choice") type = "meaning";
  const taskContext = target.taskUrdu
    || ((type === "build" || type === "reverse") && situationUrdu)
    || missionSettingUrdu
    || "";
  const sourceKey = plan.sourceKey || "personal-info-mission";
  const speakerUrdu = plan.speakerUrdu || "ملازم";
  const chapterId = mission.chapterId || String(mission.id).slice(0, 2);
  const source = `${chapterId}-authored:${sourceKey}:variant-${variantIndex + 1}:${phase}:slot-${slotIndex + 1}`;
  const semanticKey = source.replace(
    new RegExp(`^${chapterId}-authored:`),
    `${chapterId}-authored-mission:`
  );
  let question;
  const optionsFor = (mode) => {
    const answer = mode === "dutch" ? targetDutch : canonicalUrdu;
    const others = targets.filter((item) => item !== target);
    const offset = (slotIndex + variantIndex) % Math.max(1, others.length);
    const alternatives = uniqueV4([
      ...[...others.slice(offset), ...others.slice(0, offset)]
        .map((item) => (mode === "dutch" ? answerDutchFor(item) : answerUrduFor(item))),
      ...missionConceptOptionsV4(conceptIds, concept.id, mode)
    ]).filter((option) => normalizedTextV4(option) !== normalizedTextV4(answer));
    return [answer, ...alternatives].slice(0, 3);
  };
  if (type === "situation") {
    question = situation(
      situationUrdu
        ? `حال: ${situationUrdu}`
        : `حال: ${taskContext} اب “${canonicalUrdu}” والی مناسب بات منتخب کریں۔`,
      optionsFor("dutch"),
      targetDutch,
      `اس موقع میں کہیں: ${targetDutch}۔`
    );
  } else if (type === "listen-choice") {
    question = listenChoice(
      targetDutch,
      optionsFor("urdu"),
      canonicalUrdu,
      `${targetDutch} = ${canonicalUrdu}۔`
    );
    question.prompt = `${taskContext} ${speakerUrdu} کی ڈچ بات سنیں اور درست اردو مطلب منتخب کریں۔`;
  } else if (type === "document-choice") {
    question = {
      type: "document-choice",
      label: plan.document?.labelUrdu || "ذاتی معلومات کا فارم پڑھیں",
      prompt: plan.document?.promptUrdu
        ? `${taskContext} دستاویز میں “${targetDutch}” والی قطار پڑھیں اور اس کا درست اردو مطلب منتخب کریں۔`.trim()
        : `${taskContext} بھرے ہوئے فارم میں “${targetDutch}” والی قطار پڑھیں اور اس کا درست اردو مطلب منتخب کریں۔`.trim(),
      document: a1MissionDocumentV4(plan, targetDutch),
      options: optionsFor("urdu"),
      answer: canonicalUrdu,
      explain: `${targetDutch} = ${canonicalUrdu}۔`
    };
  } else if (type === "build") {
    question = build(
      `${taskContext} ${canonicalUrdu}`,
      targetDutch.split(/\s+/).filter(Boolean),
      targetDutch,
      `صحیح ترتیب: ${targetDutch}۔`
    );
  } else if (type === "speak-repeat") {
    question = {
      type: "speak-repeat",
      label: "سنیں اور بغیر نمبر کے دہرائیں",
      prompt: `${taskContext} آواز سنیں، سیکھی ہوئی باتیں آرام سے دہرائیں، پھر خود آگے بڑھیں۔`,
      speak: targetDutch,
      answer: targetDutch,
      explain: `${targetDutch} = ${canonicalUrdu}۔`,
      scored: false
    };
  } else if (type === "meaning") {
    question = meaning(
      targetDutch,
      optionsFor("urdu"),
      canonicalUrdu,
      `${targetDutch} = ${canonicalUrdu}۔`
    );
    question.prompt = phase === "use"
      ? `${taskContext} ${speakerUrdu} لکھتا ہے: “${targetDutch}”۔ اس مکمل بات کا درست مطلب منتخب کریں۔`
      : targetDutch;
  } else {
    question = reverse(
      canonicalUrdu,
      optionsFor("dutch"),
      targetDutch,
      `${canonicalUrdu} = ${targetDutch}۔`
    );
    question.prompt = phase === "use"
      ? `${taskContext} ${speakerUrdu} یہ بات مانگتا ہے: “${canonicalUrdu}”۔ درست مکمل ڈچ بات منتخب کریں۔`
      : canonicalUrdu;
  }
  question.generatedConceptId = concept.id;
  question.semanticKey = semanticKey;
  annotateQuestionV4({
    lesson: mission,
    question,
    conceptIds,
    pattern: null,
    scopeId: `${mission.id}-variant-${variantIndex + 1}`,
    allowedSkillIds: mission.assessmentSkillIds
  });
  const instructions = {
    situation: "عملی صورت پڑھیں اور اسی موقع میں بولی جانے والی درست ڈچ بات منتخب کریں۔",
    "listen-choice": `${speakerUrdu} کی ڈچ بات سنیں اور اسی سنی ہوئی بات کا درست اردو مطلب منتخب کریں۔`,
    "document-choice": plan.document?.instructionUrdu
      || "ڈچ فارم کے خانوں اور ان کے سامنے لکھی معلومات کو پڑھیں، پھر نشان زدہ معلومات کا درست اردو مطلب منتخب کریں۔",
    build: "اردو ضرورت پڑھیں اور دیے گئے سکھائے ہوئے الفاظ سے مکمل ڈچ جملہ بنائیں۔",
    "speak-repeat": "آواز سنیں اور سیکھی ہوئی ڈچ بات بلند آواز میں دہرائیں؛ اس حصے پر کوئی نمبر نہیں۔",
    meaning: "لکھی ہوئی مکمل ڈچ بات پڑھیں اور اس کا درست اردو مطلب منتخب کریں۔",
    reverse: "اردو معلومات پڑھیں اور اس کے لیے درست مکمل ڈچ بات منتخب کریں۔"
  };
  const correct = `درست۔ “${targetDutch}” کا مطلب “${canonicalUrdu}” ہے اور یہی اس مرحلے کی مطلوبہ معلومات ہے۔`;
  const wrong = `یہ جواب مطلوبہ خانے یا بات سے مختلف ہے۔ دوبارہ دیکھیں: “${targetDutch}” = “${canonicalUrdu}”۔`;
  Object.assign(question, {
    phase,
    conceptIds: [...target.ownedConceptIds],
    skillIds: [...skillIds],
    scenarioId: `${mission.id}:variant-${variantIndex + 1}:${phase}:slot-${slotIndex + 1}`,
    scenarioSource: source,
    authenticUse: true,
    instructionUrdu: instructions[type],
    instruction: instructions[type],
    explainCorrectUrdu: correct,
    correctExplanation: correct,
    explainWrongUrdu: wrong,
    wrongExplanation: wrong
  });
  if (phase === "independent-check") {
    question.automaticHint = false;
    question.hintMode = "after-attempt";
  }
  return question;
}

function applyA1AuthoredMissionV4(mission, plan) {
  const targets = plan.targets.map(resolveA1MissionTargetV4).filter(Boolean);
  if (targets.length !== plan.targets.length) return;
  const conceptIds = uniqueV4(targets.flatMap((target) => target.ownedConceptIds));
  const assessmentSkillIds = uniqueV4(targets.flatMap((target) => target.skillIds));
  const supportingPrerequisiteSkillIds = resolveA1AuthoredSkillRefsV4(plan.prerequisiteRefs);
  const prerequisiteSkillIds = uniqueV4([
    ...assessmentSkillIds,
    ...supportingPrerequisiteSkillIds
  ]);
  const sourceKey = plan.sourceKey || "personal-info-mission";
  const chapterId = mission.chapterId || String(mission.id).slice(0, 2);
  Object.assign(mission, {
    scenarioTitleUrdu: plan.scenarioTitleUrdu,
    scenarioId: `${mission.id}:${chapterId}-authored-capstone`,
    scenarioSource: `${chapterId}-authored:${sourceKey}`,
    conceptIds,
    assessmentSkillIds,
    prerequisiteSkillIds,
    prerequisites: {
      lessonIds: [...plan.prerequisiteLessonIds],
      skillIds: prerequisiteSkillIds,
      recommended: true
    },
    prerequisiteMissionIds: [...(plan.prerequisiteMissionIds || [])],
    introducesNewSkills: false,
    requiresMastery: "practiced-or-secure"
  });
  const useTypes = plan.useTypes || ["situation", "situation", "document-choice", "build", "build"];
  const checkTypes = plan.checkTypes || ["meaning", "listen-choice", "document-choice", "reverse", "build"];
  if (useTypes.length !== targets.length || checkTypes.length !== targets.length) return;
  // Replays rotate which skill each phrase is practised with. Missions with
  // combined phrases keep a fixed order so every variant still has reading.
  const canRotate = !targets.some((target) => target.compoundDutch);
  const rotate = (items, by) => (canRotate ? items.map((_, index) => items[(index + by) % items.length]) : items);
  mission.variants = plan.variantTitles.map((title, variantIndex) => {
    const context = plan.variantContexts[variantIndex];
    const variantUseTypes = rotate(useTypes, variantIndex);
    const variantCheckTypes = rotate(checkTypes, variantIndex);
    const use = targets.map((target, slotIndex) => makeA1AuthoredMissionQuestionV4({
      mission,
      conceptIds,
      target,
      variantIndex,
      slotIndex,
      phase: "use",
      type: variantUseTypes[slotIndex],
      context,
      plan,
      targets
    }));
    const checks = targets.map((target, slotIndex) => makeA1AuthoredMissionQuestionV4({
      mission,
      conceptIds,
      target,
      variantIndex,
      slotIndex,
      phase: "independent-check",
      type: variantCheckTypes[slotIndex],
      context,
      plan,
      targets
    }));
    const questions = [...use, ...checks];
    const id = `${mission.id}-variant-${variantIndex + 1}`;
    return {
      id,
      title,
      scenarioId: `${mission.id}:authored-variant-${variantIndex + 1}`,
      scenarioSource: `${chapterId}-authored:${sourceKey}:variant-${variantIndex + 1}`,
      questions,
      phases: {
        preview: { exerciseIds: [], scored: false },
        use: { exerciseIds: use.map((question) => question.id) },
        independentCheck: {
          exerciseIds: checks.map((question) => question.id),
          minimumScore: 0.8,
          automaticHints: false
        },
        correction: {
          mode: "retry-missed",
          required: true,
          requiresSupportedRetry: true
        }
      }
    };
  });
  mission.questions = mission.variants.flatMap((variant) => variant.questions);
  mission.learning = {
    outcomeUrdu: mission.outcomeUrdu,
    prerequisiteSkillIds,
    assessmentSkillIds,
    conceptIds,
    phaseOrder: ["preview", "use", "independent-check", "correction"],
    variants: mission.variants.map((variant) => ({
      id: variant.id,
      title: variant.title,
      exerciseIds: variant.questions.map((question) => question.id),
      phases: variant.phases
    }))
  };
}

const a1CompletionMissionV4 = {
  id: "a1-chapter-completion-mission",
  kind: "mission",
  unit: "A1: آخری عملی جانچ",
  title: "A1 laatste praktische missie",
  description: "A1 کے نو حصوں کی پہلے سیکھی ہوئی باتوں سے معنی، سننا، پڑھنا، بولنے کی مدد، اور عملی استعمال مکمل کرنا۔",
  xp: 0,
  variants: [],
  questions: [],
  chapterId: "a1",
  unitId: "a1-chapter-completion"
};
a1Lessons.push(a1CompletionMissionV4);

const a2CompletionMissionV4 = {
  id: "a2-chapter-completion-mission",
  kind: "mission",
  unit: "A2: آخری عملی جانچ",
  title: "Laatste praktische missie voor A2",
  description: "A2 کے آٹھ عملی حصوں سے معنی، سننا، پڑھنا، بغیر نمبر بولنے کی مدد، مختصر لکھائی، اور حقیقی استعمال مکمل کرنا۔",
  xp: 0,
  variants: [],
  questions: [],
  chapterId: "a2",
  unitId: "a2-chapter-completion"
};
a2Lessons.push(a2CompletionMissionV4);
a2AuthoredCurriculumV4.missions["a2-chapter-completion-mission"] = {
  sourceKey: "a2-chapter-completion",
  scenarioTitleUrdu: "A2 کی آٹھ حقیقی زندگی کی ذمہ داریاں",
  speakerUrdu: "متعلقہ ملازم",
  prerequisiteLessonIds: [
    "a2-gemeente-documents",
    "a2-work-conditions",
    "a2-parent-school",
    "a2-doctor-advice",
    "a2-landlord-repairs",
    "a2-customer-complaints",
    "a2-bills-banking",
    "a2-formal-digital-messages"
  ],
  prerequisiteMissionIds: [
    "a2-mission-social-help",
    "a2-mission-job-start",
    "a2-school-contact-mission",
    "a2-health-doctor-mission",
    "a2-housing-problems-mission",
    "a2-shopping-complaints-mission",
    "a2-mission-utilities",
    "a2-mission-lost-stolen"
  ],
  variantTitles: [
    "ایک مصروف دن کے ضروری کام",
    "بدلی ہوئی معلومات کے ساتھ دوسرا دن",
    "A2 آخری خود مختار عملی جانچ"
  ],
  variantContexts: [
    "ایک دن میں سرکاری درخواست، کام، اسکول، صحت، گھر، شکایت، بل، اور رسمی ای میل کے ضروری قدم مکمل کریں",
    "نئی تاریخوں اور نئی عملی تفصیلات کے ساتھ آٹھوں جگہوں پر وہی محفوظ مہارتیں دوبارہ استعمال کریں",
    "بغیر نئی زبان یا خودکار اشارے کے آٹھ حقیقی کاموں میں ضروری معنی، سننا، پڑھنا، بولنا، لکھنا، اور اگلا قدم مکمل کریں"
  ],
  targets: [
    {
      lessonId: "a2-gemeente-documents",
      dutch: "wanneer krijg ik antwoord?",
      related: [{ lessonId: "a2-work-conditions", dutch: "mijn salaris klopt niet" }]
    },
    {
      lessonId: "a2-parent-school",
      dutch: "kan mijn kind extra hulp krijgen?",
      related: [{ lessonId: "a2-doctor-advice", dutch: "wanneer moet ik terugkomen" }]
    },
    {
      lessonId: "a2-landlord-repairs",
      dutch: "wanneer wordt het gerepareerd",
      related: [{ lessonId: "a2-customer-complaints", dutch: "wanneer krijg ik een oplossing" }]
    },
    {
      lessonId: "a2-bills-banking",
      dutch: "de automatische betaling is mislukt",
      related: [{ lessonId: "a2-formal-digital-messages", dutch: "het formulier staat in de bijlage" }]
    },
    { lessonId: "a2-formal-digital-messages", dutch: "kunt u mijn bericht bevestigen" }
  ],
  prerequisiteRefs: [],
  useTypes: [
    "situation",
    "listen-choice",
    "document-choice",
    "speak-repeat",
    "build"
  ],
  checkTypes: [
    "meaning",
    "listen-choice",
    "document-choice",
    "speak-repeat",
    "build"
  ],
  document: {
    documentKind: "a2-connected-day-record",
    title: "A2 آخری عملی فہرست",
    labelUrdu: "آٹھ عملی کاموں کی فہرست پڑھیں",
    promptUrdu: "فہرست کی ہر قطار ایک پہلے سیکھی ہوئی ذمہ داری دکھاتی ہے؛ مانگی ہوئی ڈچ بات کا درست اردو مطلب منتخب کریں۔",
    instructionUrdu: "آٹھ قطاریں الگ پڑھیں اور سوال میں نشان زدہ مکمل ڈچ بات کا درست اردو مطلب منتخب کریں۔",
    rows: [
      { label: "سرکاری درخواست", value: "wanneer krijg ik antwoord?" },
      { label: "اسکول", value: "kan mijn kind extra hulp krijgen?" },
      { label: "گھر", value: "wanneer wordt het gerepareerd" },
      { label: "بل", value: "de automatische betaling is mislukt" },
      { label: "ای میل", value: "kunt u mijn bericht bevestigen" }
    ]
  }
};

for (const [missionId, plan] of Object.entries(a1AuthoredCurriculumV4.missions)) {
  const mission = chaptersV4
    .flatMap((chapter) => chapter.lessons)
    .find((lesson) => lesson.id === missionId && lesson.kind === "mission");
  if (mission) applyA1AuthoredMissionV4(mission, plan);
}

for (const [missionId, plan] of Object.entries(a2AuthoredCurriculumV4.missions)) {
  const mission = chaptersV4
    .flatMap((chapter) => chapter.lessons)
    .find((lesson) => lesson.id === missionId && lesson.kind === "mission");
  if (mission) applyA1AuthoredMissionV4(mission, plan);
}

for (const chapter of chaptersV4) {
  for (const subchapter of chapter.subchapters) {
    const normalLessonIds = subchapter.lessonIds.filter((lessonId) => {
      const lesson = chapter.lessons.find((item) => item.id === lessonId);
      return lesson && lesson.kind !== "mission";
    });
    const missionIds = subchapter.lessonIds.filter((lessonId) => {
      const lesson = chapter.lessons.find((item) => item.id === lessonId);
      return lesson?.kind === "mission";
    });
    const eligibleSkillIds = uniqueV4(normalLessonIds.flatMap((lessonId) => (
      chapter.lessons.find((lesson) => lesson.id === lessonId)?.skillIds || []
    )));
    const adaptiveReviewId = `${subchapter.id}:adaptive-review`;
    const unit = {
      id: subchapter.id,
      chapterId: chapter.id,
      title: subchapter.title,
      outcomeUrdu: subchapter.goal,
      practiceUrdu: subchapter.practice,
      lessonIds: normalLessonIds,
      missionIds,
      capstoneMissionIds: missionIds,
      adaptiveReviewId
    };
    unitsV4.push(unit);
    reviewsV4.push({
      id: adaptiveReviewId,
      kind: "adaptive-review",
      chapterId: chapter.id,
      unitId: subchapter.id,
      pathNode: false,
      sourceLessonIds: normalLessonIds,
      eligibleSkillIds,
      states: ["introduced", "practiced", "secure"],
      selection: "weakest-first-spaced"
    });
  }
}

for (let chapterIndex = 0; chapterIndex < chaptersV4.length; chapterIndex += 1) {
  const chapter = chaptersV4[chapterIndex];
  const previousChapter = chaptersV4[chapterIndex - 1] || null;
  const normalLessons = chapter.lessons.filter((lesson) => lesson.kind !== "mission");
  const missions = chapter.lessons.filter((lesson) => lesson.kind === "mission");
  const prerequisiteSkillIds = chapter.id === "a1"
    ? resolveA1AuthoredSkillRefsV4(a1AuthoredCurriculumV4.chapterPrerequisiteRefs)
    : chapter.id === "a2"
      ? resolveA1AuthoredSkillRefsV4(a2AuthoredCurriculumV4.chapterPrerequisiteRefs)
    : previousChapter
      ? previousChapter.lessons
        .filter((lesson) => lesson.kind !== "mission")
        .slice(-1)
        .flatMap((lesson) => lesson.skillIds.slice(-5))
      : [];
  const newConceptIds = uniqueV4(normalLessons.flatMap((lesson) => lesson.newConceptIds));
  const patternIds = normalLessons.map((lesson) => lesson.pattern?.id).filter(Boolean);
  const dependencyMap = normalLessons.map((lesson) => ({
    lessonId: lesson.id,
    prerequisiteLessonIds: lesson.prerequisites.lessonIds,
    prerequisiteSkillIds: lesson.prerequisiteSkillIds
  }));
  const completionMission = chapter.id === "a1"
    ? missions.find((mission) => mission.id === "a1-chapter-completion-mission") || null
    : missions[missions.length - 1] || null;
  if (completionMission) {
    completionMission.completionCheck = true;
    completionMission.completionSkillAreas = [...chapterCompletionAreasV4];
    completionMission.outcomeUrdu = `${chapter.id.toUpperCase()} کے ضروری معنی، سننا، پڑھنا، بولنے کی مدد، اور روزمرہ عملی استعمال مکمل کرنا۔`;
    completionMission.learning.outcomeUrdu = completionMission.outcomeUrdu;
    completionMission.learning.completionSkillAreas = [...chapterCompletionAreasV4];
  }

  Object.assign(chapter, {
    outcomeUrdu: chapterOutcomesV4[chapter.id],
    prerequisiteChapterIds: previousChapter ? [previousChapter.id] : [],
    prerequisiteSkillIds,
    unitIds: chapter.subchapters.map((subchapter) => subchapter.id),
    lessonIds: normalLessons.map((lesson) => lesson.id),
    missionIds: missions.map((mission) => mission.id),
    contract: {
      outcomeUrdu: chapterOutcomesV4[chapter.id],
      prerequisiteChapterIds: previousChapter ? [previousChapter.id] : [],
      prerequisiteSkillIds,
      newConceptIds,
      newContent: {
        vocabularyConceptIds: newConceptIds.filter((conceptId) => conceptByIdV4.get(conceptId)?.role !== "phrase"),
        phraseConceptIds: newConceptIds.filter((conceptId) => conceptByIdV4.get(conceptId)?.role === "phrase"),
        patternIds
      },
      patternIds,
      dependencyMap,
      completionSkillAreas: chapterCompletionAreasV4,
      completionMissionId: completionMission?.id || null,
      reviewPolicy: "adaptive-skill-review"
    }
  });
}

const courseV4 = {
  schemaVersion: 4,
  courseId: "nederurdu",
  phaseOrder: learningPhaseOrderV4,
  masteryRules: {
    states: ["introduced", "practiced", "secure"],
    introducedAfterPhase: "learn",
    practicedAfterPhase: "use",
    secureMinimumScore: 0.8,
    correctionRequiredForSecure: true,
    lessonsBrowseable: true,
    missionMinimumState: "practiced"
  },
  concepts: [...conceptByIdV4.values()],
  skills: [...skillByIdV4.values()],
  patterns: patternsV4,
  chapters: chaptersV4,
  units: unitsV4,
  lessons: chaptersV4.flatMap((chapter) => chapter.lessons.filter((lesson) => lesson.kind !== "mission")),
  missions: chaptersV4.flatMap((chapter) => chapter.lessons.filter((lesson) => lesson.kind === "mission")),
  reviews: reviewsV4,
  reviewPolicy: {
    mode: "adaptive",
    pathNodes: false,
    eligibleStates: ["introduced", "practiced", "secure"],
    selection: "weakest-first-spaced",
    removedLegacyLessonIds: uniqueV4(retiredAdaptiveLessonsV4.map((lesson) => lesson.id))
  },
  compatibility: {
    chaptersGlobal: "NEDERURDU_CHAPTERS",
    a0LessonsGlobal: "NEDERURDU_LESSONS",
    legacyQuestionIdField: "legacyId"
  }
};

window.NEDERURDU_COURSE = courseV4;
window.NEDERURDU_CHAPTERS = chaptersV4;
window.NEDERURDU_LESSONS = a0Lessons;
window.NEDERURDU_ADAPTIVE_REVIEWS = reviewsV4;
