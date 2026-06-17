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
  q("meaning", "اس Dutch لفظ یا جملے کا مطلب منتخب کریں", prompt, options, answer, explain, note);

const reverse = (prompt, options, answer, explain, note = "") =>
  q("reverse", "Urdu معنی کے لیے صحیح Dutch منتخب کریں", prompt, options, answer, explain, note);

const build = (prompt, tiles, answer, explain, hint = "Dutch words کو صحیح ترتیب میں tap کریں۔ پہلے person/subject، پھر verb، پھر باقی sentence آتا ہے۔") => ({
  type: "build",
  label: "Dutch sentence صحیح ترتیب میں بنائیں",
  prompt,
  tiles,
  answer,
  explain,
  hint
});

const a0Lessons = [
  {
    id: "a0-letters-1",
    unit: "A0: letters 1",
    title: "A0 les 1: a, b, c, d, e, f, g",
    description: "Urdu سے Dutch letters تک: پہلے چند حروف اور آسان example words۔",
    xp: 35,
    questions: [
      meaning("a", ["حرف a", "حرف b", "حرف d"], "حرف a", "یہ Dutch alphabet کا حرف a ہے۔"),
      meaning("b", ["حرف b", "حرف e", "حرف g"], "حرف b", "یہ Dutch alphabet کا حرف b ہے۔"),
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
    unit: "A0: letters 2",
    title: "A0 les 2: h, i, j, k, l, m, n",
    description: "مزید letters، پھر بہت آسان Dutch words۔",
    xp: 35,
    questions: [
      meaning("h", ["حرف h", "حرف k", "حرف n"], "حرف h", "h کو Dutch میں الگ letter کی طرح پہچانیں۔"),
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
    unit: "A0: letters 3",
    title: "A0 les 3: o tot z",
    description: "باقی letters اور روزمرہ کے بہت آسان words۔",
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
      meaning("ik", ["میں", "تم", "آپ"], "میں", "ik = میں۔"),
      meaning("jij", ["تم informal", "میں", "آپ formal"], "تم informal", "jij عام غیر رسمی you ہے۔"),
      meaning("u", ["آپ formal", "تم informal", "ہم"], "آپ formal", "u ادب والا آپ ہے۔"),
      reverse("میں", ["ik", "jij", "u"], "ik", "میں = ik۔"),
      reverse("تم informal", ["jij", "u", "ik"], "jij", "jij informal ہے۔"),
      reverse("آپ formal", ["u", "jij", "ik"], "u", "u formal/polite ہے۔"),
      meaning("ik, jij, u", ["میں، تم، آپ", "ہاں، نہیں، اچھا", "مرد، عورت، بچہ"], "میں، تم، آپ", "یہ تین person words ہیں۔"),
      meaning("u", ["ادب والا آپ", "دوست والا تم", "میں"], "ادب والا آپ", "بڑے/اجنبی سے u بہتر ہے۔")
    ]
  },
  {
    id: "a0-ja-nee-goed-niet",
    unit: "A0: reactions",
    title: "A0 les 5: ja, nee, goed, niet",
    description: "ہاں، نہیں، اچھا، not: سب سے چھوٹے reactions۔",
    xp: 40,
    questions: [
      meaning("ja", ["ہاں", "نہیں", "اچھا"], "ہاں", "ja = ہاں۔"),
      meaning("nee", ["نہیں", "ہاں", "اچھا"], "نہیں", "nee = نہیں۔"),
      meaning("goed", ["اچھا", "نہیں", "میں"], "اچھا", "goed = اچھا۔"),
      meaning("niet", ["نہیں / not", "ہاں", "اچھا"], "نہیں / not", "niet کسی بات کو negative بناتا ہے۔"),
      meaning("niet goed", ["اچھا نہیں", "بہت اچھا", "ہاں اچھا"], "اچھا نہیں", "niet + goed = اچھا نہیں۔"),
      reverse("ہاں", ["ja", "nee", "niet"], "ja", "ہاں = ja۔"),
      reverse("نہیں", ["nee", "ja", "goed"], "nee", "نہیں = nee۔"),
      reverse("اچھا نہیں", ["niet goed", "goed niet", "ja goed"], "niet goed", "Dutch میں niet goed کہتے ہیں۔")
    ]
  },
  {
    id: "a0-people-nouns",
    unit: "A0: naamwoorden 1",
    title: "A0 les 6: man, vrouw, kind",
    description: "person nouns: آدمی، عورت، بچہ، لڑکا، لڑکی۔",
    xp: 45,
    questions: [
      meaning("man", ["آدمی", "عورت", "بچہ"], "آدمی", "man = آدمی۔"),
      meaning("vrouw", ["عورت", "آدمی", "لڑکا"], "عورت", "vrouw = عورت۔"),
      meaning("kind", ["بچہ", "آدمی", "لڑکی"], "بچہ", "kind = بچہ۔"),
      meaning("jongen", ["لڑکا", "عورت", "بچہ"], "لڑکا", "jongen = لڑکا۔"),
      meaning("meisje", ["لڑکی", "لڑکا", "آدمی"], "لڑکی", "meisje = لڑکی۔"),
      meaning("de man", ["the آدمی", "ایک عورت", "the گھر"], "the آدمی", "de/het کو ابھی صرف the سمجھیں۔"),
      reverse("عورت", ["vrouw", "man", "kind"], "vrouw", "عورت = vrouw۔"),
      reverse("بچہ", ["kind", "jongen", "meisje"], "kind", "بچہ = kind۔")
    ]
  },
  {
    id: "a0-things-nouns",
    unit: "A0: naamwoorden 2",
    title: "A0 les 7: boek, pen, huis",
    description: "things: کتاب، قلم، دروازہ، میز، کرسی، گھر۔",
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
    description: "Dutch میں noun سے پہلے چھوٹے words آتے ہیں: een, de, het۔",
    xp: 45,
    questions: [
      meaning("een", ["ایک / a", "the", "نہیں"], "ایک / a", "een = ایک یا a۔"),
      meaning("de", ["the", "ایک", "میں"], "the", "de کو ابھی the سمجھیں۔"),
      meaning("het", ["the", "ایک", "ہاں"], "the", "het بھی the کی طرح ہے۔"),
      meaning("een man", ["ایک آدمی", "the آدمی", "آدمی نہیں"], "ایک آدمی", "een + noun = ایک چیز/person۔"),
      meaning("een boek", ["ایک کتاب", "the کتاب", "کتاب نہیں"], "ایک کتاب", "een boek = ایک کتاب۔"),
      meaning("het huis", ["the گھر", "ایک گھر", "گھر نہیں"], "the گھر", "het huis = the house۔"),
      reverse("ایک عورت", ["een vrouw", "de vrouw", "het vrouw"], "een vrouw", "ایک = een۔"),
      reverse("the دروازہ", ["de deur", "een deur", "het pen"], "de deur", "deur کے ساتھ de آتا ہے۔")
    ]
  },
  {
    id: "a0-ben-bent-is",
    unit: "A0: werkwoord 1",
    title: "A0 les 9: ben, bent, is",
    description: "پہلا verb: ہونا۔ ik ben, jij bent, hij is۔",
    xp: 50,
    questions: [
      meaning("ben", ["ہوں", "ہو", "ہے"], "ہوں", "ik کے ساتھ ben آتا ہے۔"),
      meaning("bent", ["ہو / ہیں", "ہوں", "ہے"], "ہو / ہیں", "jij/u کے ساتھ bent آتا ہے۔"),
      meaning("is", ["ہے", "ہوں", "ہو"], "ہے", "hij/zij/het کے ساتھ is آتا ہے۔"),
      meaning("ik ben", ["میں ہوں", "تم ہو", "وہ ہے"], "میں ہوں", "ik + ben۔"),
      meaning("jij bent", ["تم ہو", "میں ہوں", "وہ ہے"], "تم ہو", "jij + bent۔"),
      meaning("u bent", ["آپ ہیں", "تم informal ہو", "میں ہوں"], "آپ ہیں", "u + bent۔"),
      reverse("میں ہوں", ["ik ben", "jij bent", "hij is"], "ik ben", "میں ہوں = ik ben۔"),
      reverse("وہ ہے", ["hij is", "ik ben", "u bent"], "hij is", "hij is = وہ مرد ہے۔")
    ]
  },
  {
    id: "a0-first-sentences",
    unit: "A0: zin 1",
    title: "A0 les 10: eerste zinnen",
    description: "اب چھوٹے pieces کو ایک sentence میں جوڑتے ہیں۔",
    xp: 55,
    questions: [
      meaning("ik ben een man", ["میں ایک آدمی ہوں", "میں ایک عورت ہوں", "تم ایک آدمی ہو"], "میں ایک آدمی ہوں", "person + verb + noun۔"),
      meaning("ik ben een vrouw", ["میں ایک عورت ہوں", "میں ایک آدمی ہوں", "وہ عورت ہے"], "میں ایک عورت ہوں", "ik ben = میں ہوں۔"),
      meaning("jij bent goed", ["تم اچھے ہو", "میں اچھا ہوں", "وہ اچھا ہے"], "تم اچھے ہو", "jij bent = تم ہو۔"),
      meaning("u bent goed", ["آپ اچھے ہیں", "تم اچھے ہو", "میں اچھا ہوں"], "آپ اچھے ہیں", "u polite ہے۔"),
      meaning("hij is een kind", ["وہ ایک بچہ ہے", "میں بچہ ہوں", "وہ عورت ہے"], "وہ ایک بچہ ہے", "hij is = وہ مرد/لڑکا ہے۔"),
      reverse("میں ایک آدمی ہوں", ["ik ben een man", "jij bent een man", "hij is een man"], "ik ben een man", "میں = ik۔"),
      reverse("آپ اچھے ہیں", ["u bent goed", "jij bent goed", "ik ben goed"], "u bent goed", "آپ formal = u۔"),
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
      meaning("hij", ["وہ مرد", "وہ عورت", "ہم"], "وہ مرد", "hij = he۔"),
      meaning("zij", ["وہ عورت / وہ لوگ", "وہ مرد", "میں"], "وہ عورت / وہ لوگ", "zij = she یا they، context سے پتہ چلتا ہے۔"),
      meaning("wij", ["ہم", "تم", "آپ"], "ہم", "wij = ہم۔"),
      meaning("hij is", ["وہ مرد ہے", "میں ہوں", "ہم ہیں"], "وہ مرد ہے", "hij + is۔"),
      meaning("zij is", ["وہ عورت ہے", "وہ مرد ہے", "ہم ہیں"], "وہ عورت ہے", "zij + is۔"),
      meaning("wij zijn", ["ہم ہیں", "تم ہو", "وہ ہے"], "ہم ہیں", "wij کے ساتھ zijn آتا ہے۔"),
      reverse("ہم", ["wij", "zij", "hij"], "wij", "ہم = wij۔"),
      reverse("وہ عورت ہے", ["zij is", "hij is", "wij zijn"], "zij is", "zij is = she is۔")
    ]
  },
  {
    id: "a0-hebben-1",
    unit: "A0: werkwoord 2",
    title: "A0 les 12: ik heb",
    description: "میرے پاس ہے: bezit کی پہلی Dutch شکل۔",
    xp: 50,
    questions: [
      meaning("heb", ["میرے پاس ہے / have", "ہوں", "جاتا ہوں"], "میرے پاس ہے / have", "ik کے ساتھ heb آتا ہے۔"),
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
    unit: "A0: negative 1",
    title: "A0 les 13: geen",
    description: "جب چیز نہیں ہے: geen boek, geen pen۔",
    xp: 50,
    questions: [
      meaning("geen", ["کوئی نہیں / not any", "اچھا", "ایک"], "کوئی نہیں / not any", "geen noun کے ساتھ آتا ہے۔"),
      meaning("ik heb geen boek", ["میرے پاس کتاب نہیں ہے", "میرے پاس کتاب ہے", "میں کتاب نہیں ہوں"], "میرے پاس کتاب نہیں ہے", "geen + noun۔"),
      meaning("zij heeft geen pen", ["اس کے پاس قلم نہیں ہے", "اس کے پاس قلم ہے", "وہ قلم ہے"], "اس کے پاس قلم نہیں ہے", "zij heeft geen pen۔"),
      meaning("wij hebben geen huis", ["ہمارے پاس گھر نہیں ہے", "ہمارا گھر اچھا ہے", "ہم گھر میں ہیں"], "ہمارے پاس گھر نہیں ہے", "wij hebben = ہمارے پاس ہے۔"),
      meaning("niet goed", ["اچھا نہیں", "کوئی کتاب نہیں", "ایک گھر"], "اچھا نہیں", "niet adjective/verb کے ساتھ آتا ہے۔"),
      meaning("geen boek", ["کوئی کتاب نہیں", "اچھی کتاب نہیں", "the کتاب"], "کوئی کتاب نہیں", "geen noun کے ساتھ۔"),
      reverse("میرے پاس کتاب نہیں ہے", ["ik heb geen boek", "ik ben niet boek", "ik heb niet goed"], "ik heb geen boek", "چیز نہ ہو تو geen۔"),
      reverse("اچھا نہیں", ["niet goed", "geen goed", "nee goed"], "niet goed", "quality کے لیے niet۔")
    ]
  },
  {
    id: "a0-place-1",
    unit: "A0: plaats 1",
    title: "A0 les 14: in, op, onder",
    description: "place words: میں، اوپر، نیچے۔",
    xp: 50,
    questions: [
      meaning("in", ["میں / inside", "اوپر", "نیچے"], "میں / inside", "in = اندر/میں۔"),
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
    description: "مزید place words: ساتھ، سامنے، پیچھے۔",
    xp: 50,
    questions: [
      meaning("naast", ["ساتھ / next to", "سامنے", "پیچھے"], "ساتھ / next to", "naast = پاس/ساتھ۔"),
      meaning("voor", ["سامنے", "پیچھے", "اندر"], "سامنے", "voor = سامنے۔"),
      meaning("achter", ["پیچھے", "سامنے", "اوپر"], "پیچھے", "achter = پیچھے۔"),
      meaning("bij", ["کے پاس", "نیچے", "ایک"], "کے پاس", "bij = پاس/near۔"),
      meaning("naast de tafel", ["میز کے ساتھ", "میز کے نیچے", "میز کے اندر"], "میز کے ساتھ", "naast de tafel۔"),
      meaning("achter het huis", ["گھر کے پیچھے", "گھر کے سامنے", "گھر کے اندر"], "گھر کے پیچھے", "achter het huis۔"),
      reverse("گھر کے سامنے", ["voor het huis", "achter het huis", "in het huis"], "voor het huis", "سامنے = voor۔"),
      reverse("میز کے ساتھ", ["naast de tafel", "onder de tafel", "op de tafel"], "naast de tafel", "ساتھ/next to = naast۔")
    ]
  },
  {
    id: "a0-gaan-komen",
    unit: "A0: actie 1",
    title: "A0 les 16: gaan en komen",
    description: "حرکت والے verbs: جانا اور آنا۔",
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
    description: "direction اور together: naar, met۔",
    xp: 50,
    questions: [
      meaning("naar", ["کی طرف / کو", "ساتھ", "میں"], "کی طرف / کو", "naar direction بتاتا ہے۔"),
      meaning("met", ["ساتھ", "کی طرف", "نیچے"], "ساتھ", "met = with۔"),
      meaning("ik ga naar huis", ["میں گھر جا رہا/رہی ہوں", "میں گھر میں ہوں", "میرے پاس گھر ہے"], "میں گھر جا رہا/رہی ہوں", "naar huis = گھر کی طرف۔"),
      meaning("zij gaat naar school", ["وہ school جا رہی ہے", "وہ school میں ہے", "اس کے پاس school ہے"], "وہ school جا رہی ہے", "gaat naar = جا رہی ہے۔"),
      meaning("ik ben met mijn kind", ["میں اپنے بچے کے ساتھ ہوں", "میں بچہ ہوں", "میرے پاس بچہ نہیں"], "میں اپنے بچے کے ساتھ ہوں", "met = ساتھ۔"),
      meaning("met mijn kind", ["میرے بچے کے ساتھ", "میرے بچے کی طرف", "میرے بچے کے نیچے"], "میرے بچے کے ساتھ", "met = with۔"),
      reverse("گھر کی طرف", ["naar huis", "met huis", "in huis"], "naar huis", "direction = naar۔"),
      reverse("ساتھ", ["met", "naar", "onder"], "met", "with = met۔")
    ]
  },
  {
    id: "a0-possessive",
    unit: "A0: bezit 2",
    title: "A0 les 18: mijn, jouw, zijn, haar",
    description: "میرا، تمہارا، اس کا: possession words۔",
    xp: 50,
    questions: [
      meaning("mijn", ["میرا", "تمہارا", "اس کا"], "میرا", "mijn = میرا۔"),
      meaning("jouw", ["تمہارا", "میرا", "اس کا"], "تمہارا", "jouw = تمہارا۔"),
      meaning("zijn", ["اس کا مرد", "میرا", "تمہارا"], "اس کا مرد", "zijn = his۔"),
      meaning("haar", ["اس کا عورت", "میرا", "ہماری"], "اس کا عورت", "haar = her۔"),
      meaning("mijn naam", ["میرا نام", "تمہارا نام", "اس کا نام"], "میرا نام", "mijn naam = میرا نام۔"),
      meaning("zijn boek", ["اس کی کتاب", "میری کتاب", "تمہاری کتاب"], "اس کی کتاب", "zijn boek = his book۔"),
      reverse("میرا گھر", ["mijn huis", "jouw huis", "zijn huis"], "mijn huis", "میرا = mijn۔"),
      reverse("اس کا قلم", ["haar pen", "mijn pen", "jouw pen"], "haar pen", "یہاں her pen = haar pen۔")
    ]
  },
  {
    id: "a0-name-land-city",
    unit: "A0: mezelf",
    title: "A0 les 19: naam, land, woonplaats",
    description: "خود کو بہت آسان Dutch میں introduce کرنا۔",
    xp: 55,
    questions: [
      meaning("naam", ["نام", "ملک", "شہر"], "نام", "naam = نام۔"),
      meaning("land", ["ملک", "نام", "گھر"], "ملک", "land = ملک۔"),
      meaning("stad", ["شہر", "ملک", "فون"], "شہر", "stad = شہر۔"),
      meaning("woon", ["رہتا/رہتی ہوں", "جاتا ہوں", "میرے پاس ہے"], "رہتا/رہتی ہوں", "ik woon = میں رہتا/رہتی ہوں۔"),
      meaning("mijn naam is Ali", ["میرا نام Ali ہے", "میں Ali کے پاس ہوں", "میرا گھر Ali ہے"], "میرا نام Ali ہے", "introduction sentence۔"),
      meaning("ik woon in Nederland", ["میں Nederland میں رہتا/رہتی ہوں", "میں Nederland جاتا ہوں", "میرے پاس Nederland ہے"], "میں Nederland میں رہتا/رہتی ہوں", "ik woon in = میں رہتا ہوں۔"),
      meaning("ik kom uit Pakistan", ["میں Pakistan سے آتا/آتی ہوں", "میں Pakistan میں رہتا ہوں", "میرے پاس Pakistan ہے"], "میں Pakistan سے آتا/آتی ہوں", "uit = سے۔"),
      reverse("میرا نام Ali ہے", ["mijn naam is Ali", "ik woon Ali", "ik heb Ali"], "mijn naam is Ali", "نام بتانے کا pattern۔")
    ]
  },
  {
    id: "a0-checkpoint",
    unit: "A0: checkpoint",
    title: "A0 les 20: klaar voor A1",
    description: "A0 کا mix: کیا learner چھوٹے words اور zinnen سمجھتا ہے؟",
    xp: 70,
    questions: [
      meaning("ik ben Ali", ["میں Ali ہوں", "میرے پاس Ali ہے", "میں Ali جاتا ہوں"], "میں Ali ہوں", "ik ben = میں ہوں۔"),
      meaning("ik heb een telefoon", ["میرے پاس ایک فون ہے", "میں فون ہوں", "میں فون جاتا ہوں"], "میرے پاس ایک فون ہے", "ik heb = میرے پاس ہے۔"),
      meaning("ik woon in Nederland", ["میں Nederland میں رہتا/رہتی ہوں", "میں Nederland سے ہوں", "میرے پاس Nederland ہے"], "میں Nederland میں رہتا/رہتی ہوں", "woon in = رہنا۔"),
      meaning("ik ga naar huis", ["میں گھر جا رہا/رہی ہوں", "میں گھر میں ہوں", "میرے پاس گھر ہے"], "میں گھر جا رہا/رہی ہوں", "naar huis = گھر کی طرف۔"),
      meaning("ik begrijp het niet", ["مجھے سمجھ نہیں آیا", "میں اچھا ہوں", "میرے پاس کتاب نہیں"], "مجھے سمجھ نہیں آیا", "یہ بہت ضروری help sentence ہے۔"),
      meaning("langzaam alstublieft", ["آہستہ please", "شکریہ", "میرا نام"], "آہستہ please", "جب کوئی تیز بولے تو یہ کہیں۔"),
      meaning("kunt u herhalen?", ["کیا آپ repeat کر سکتے ہیں؟", "کیا آپ جا سکتے ہیں؟", "کیا آپ کے پاس کتاب ہے؟"], "کیا آپ repeat کر سکتے ہیں؟", "herhalen = repeat کرنا۔"),
      reverse("مجھے سمجھ نہیں آیا", ["ik begrijp het niet", "ik ben goed", "ik heb geen boek"], "ik begrijp het niet", "A0 learner کو یہ sentence ضرور چاہیے۔")
    ]
  }
];

const a1Lessons = [
  {
    id: "a1-zero-tiny-words",
    unit: "A1 start: zero basics",
    title: "سبق 1: Ik, jij, ja, nee",
    description: "بالکل شروع سے: میں، تم، ہاں، نہیں، اچھا، not۔",
    xp: 45,
    questions: [
      meaning("ik", ["میں", "تم", "ہاں"], "میں", "ik کا مطلب میں ہے۔"),
      meaning("jij", ["تم / آپ informal", "میں", "نہیں"], "تم / آپ informal", "jij عام informal you ہے۔"),
      meaning("u", ["آپ formal", "ہم", "وہ"], "آپ formal", "u polite/formal you ہے۔"),
      meaning("ja", ["ہاں", "نہیں", "اچھا"], "ہاں", "ja = ہاں۔"),
      meaning("nee", ["نہیں", "ہاں", "میں"], "نہیں", "nee = نہیں۔"),
      meaning("goed", ["اچھا", "نہیں", "تم"], "اچھا", "goed = اچھا۔"),
      meaning("niet", ["نہیں / not", "ہاں", "اچھا"], "نہیں / not", "niet کسی بات کو negative بناتا ہے۔"),
      meaning("niet goed", ["اچھا نہیں", "بہت اچھا", "میں اچھا ہوں"], "اچھا نہیں", "niet + goed = اچھا نہیں۔"),
      reverse("میں", ["ik", "jij", "ja"], "ik", "میں = ik۔"),
      reverse("تم / آپ informal", ["jij", "u", "ik"], "jij", "jij informal you ہے۔"),
      reverse("آپ formal", ["u", "jij", "wij"], "u", "formal/polite you = u۔"),
      reverse("ہاں", ["ja", "nee", "goed"], "ja", "ہاں = ja۔"),
      reverse("نہیں", ["nee", "ja", "niet"], "nee", "نہیں = nee۔"),
      reverse("اچھا نہیں", ["niet goed", "ja goed", "nee goed"], "niet goed", "not good = niet goed۔")
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
      meaning("u bent", ["آپ ہیں", "تم informal ہو", "میں ہوں"], "آپ ہیں", "formal/polite sentence: u bent۔"),
      meaning("hij is", ["وہ مرد ہے", "وہ عورت ہے", "ہم ہیں"], "وہ مرد ہے", "hij is = he is۔"),
      meaning("zij is", ["وہ عورت ہے", "وہ مرد ہے", "ہم ہیں"], "وہ عورت ہے", "zij is = she is۔"),
      meaning("ik ben goed", ["میں اچھا ہوں", "تم اچھے ہو", "وہ اچھا ہے"], "میں اچھا ہوں", "A1 order: person + verb + rest۔"),
      meaning("ik ben niet goed", ["میں اچھا نہیں ہوں", "میں اچھا ہوں", "تم اچھے نہیں ہو"], "میں اچھا نہیں ہوں", "niet good نہیں، niet goed۔"),
      reverse("میں ہوں", ["ik ben", "jij bent", "hij is"], "ik ben", "میں ہوں = ik ben۔"),
      reverse("آپ ہیں", ["u bent", "jij bent", "ik ben"], "u bent", "formal you = u bent۔"),
      reverse("وہ عورت ہے", ["zij is", "hij is", "ik ben"], "zij is", "zij is = وہ عورت ہے۔"),
      reverse("میں اچھا نہیں ہوں", ["ik ben niet goed", "ik ben goed", "jij bent niet goed"], "ik ben niet goed", "negative sentence with niet۔")
    ]
  },
  {
    id: "a1-greetings-personal-info",
    unit: "A1: سلام اور identity",
    title: "سبق 3: Hallo, mijn naam is...",
    description: "اب سلام، نام، ملک، فون نمبر اور short introduction۔",
    xp: 60,
    questions: [
      meaning("hallo", ["سلام", "شکریہ", "خدا حافظ"], "سلام", "hallo سب سے عام greeting ہے۔"),
      meaning("goedemorgen", ["صبح بخیر", "شام بخیر", "خدا حافظ"], "صبح بخیر", "goedemorgen صبح میں بولا جاتا ہے۔"),
      meaning("tot ziens", ["خدا حافظ", "صبح بخیر", "شکریہ"], "خدا حافظ", "tot ziens = خدا حافظ۔"),
      meaning("dank u wel", ["بہت شکریہ", "براہ کرم", "معاف کیجیے"], "بہت شکریہ", "formal شکریہ = dank u wel۔"),
      meaning("naam", ["نام", "پتہ", "ملک"], "نام", "forms میں naam بہت important ہے۔"),
      meaning("mijn", ["میرا", "آپ کا", "اس کا"], "میرا", "mijn = میرا۔"),
      meaning("mijn naam", ["میرا نام", "آپ کا نام", "میرا پتہ"], "میرا نام", "mijn + naam = میرا نام۔"),
      meaning("mijn naam is Zarar", ["میرا نام ضرار ہے", "میں ضرار ہوں", "میرا پتہ ضرار ہے"], "میرا نام ضرار ہے", "mijn naam is = میرا نام ہے۔"),
      meaning("adres", ["پتہ", "فون نمبر", "قومیت"], "پتہ", "adres = پتہ۔"),
      meaning("telefoonnummer", ["فون نمبر", "تاریخ پیدائش", "ملک"], "فون نمبر", "telefoonnummer = phone number۔"),
      meaning("land", ["ملک", "نام", "خاندان"], "ملک", "land = country۔"),
      reverse("میرا نام علی ہے", ["mijn naam is Ali", "ik woon Ali", "ik heb Ali"], "mijn naam is Ali", "introduction pattern۔"),
      reverse("پتہ", ["adres", "naam", "land"], "adres", "address = adres۔"),
      reverse("فون نمبر", ["telefoonnummer", "adres", "nationaliteit"], "telefoonnummer", "phone number = telefoonnummer۔")
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
      meaning("een", ["ایک / a", "ہے", "نہیں"], "ایک / a", "een Dutch میں بہت عام article ہے۔"),
      meaning("ik ben een man", ["میں ایک آدمی ہوں", "میں ایک عورت ہوں", "وہ ایک آدمی ہے"], "میں ایک آدمی ہوں", "ik ben + een man۔"),
      meaning("zij is een vrouw", ["وہ ایک عورت ہے", "وہ ایک آدمی ہے", "میں عورت ہوں"], "وہ ایک عورت ہے", "zij is + een vrouw۔"),
      meaning("de man", ["آدمی", "گھر", "بچہ"], "آدمی", "de/het articles کو آہستہ آہستہ پہچانیں۔"),
      meaning("het kind", ["بچہ", "آدمی", "عورت"], "بچہ", "het kind = بچہ۔"),
      reverse("میں ایک عورت ہوں", ["ik ben een vrouw", "zij is een vrouw", "ik heb een vrouw"], "ik ben een vrouw", "person + zijn + article + noun۔")
    ]
  },
  {
    id: "a1-hebben-family",
    unit: "A1: hebben",
    title: "سبق 5: Ik heb familie",
    description: "اب have/hebben: میرے پاس ہے، میرے بچے ہیں، میرے پاس نہیں ہے۔",
    xp: 65,
    questions: [
      meaning("hebben", ["ہونا / رکھنا", "جانا", "سیکھنا"], "ہونا / رکھنا", "hebben = to have۔"),
      meaning("ik heb", ["میرے پاس ہے", "میں ہوں", "میں جاتا ہوں"], "میرے پاس ہے", "ik heb = I have۔"),
      meaning("jij hebt", ["تمہارے پاس ہے", "تم ہو", "تم آتے ہو"], "تمہارے پاس ہے", "jij hebt = you have۔"),
      meaning("hij heeft", ["اس کے پاس ہے", "وہ ہے", "وہ جاتا ہے"], "اس کے پاس ہے", "hij heeft = he has۔"),
      meaning("zoon", ["بیٹا", "بیٹی", "بھائی"], "بیٹا", "zoon = بیٹا۔"),
      meaning("dochter", ["بیٹی", "بیٹا", "بہن"], "بیٹی", "dochter = بیٹی۔"),
      meaning("ouders", ["والدین", "بچے", "دوست"], "والدین", "ouders = parents۔"),
      meaning("kinderen", ["بچے", "والدین", "کتابیں"], "بچے", "kinderen = children۔"),
      meaning("ik heb kinderen", ["میرے بچے ہیں", "میں بچہ ہوں", "میرے والدین ہیں"], "میرے بچے ہیں", "ik heb + noun۔"),
      meaning("ik heb geen kinderen", ["میرے بچے نہیں ہیں", "میرے بچے ہیں", "میں بچہ نہیں ہوں"], "میرے بچے نہیں ہیں", "geen noun سے پہلے آتا ہے۔"),
      reverse("میرے پاس ایک بھائی ہے", ["ik heb een broer", "ik ben een broer", "hij heeft een broer"], "ik heb een broer", "ik heb = میرے پاس ہے۔"),
      reverse("اس کے بچے ہیں", ["hij heeft kinderen", "ik heb kinderen", "wij zijn kinderen"], "hij heeft kinderen", "hij heeft = اس کے پاس ہے۔"),
      meaning("geen", ["کوئی نہیں / نہیں", "اچھا", "ابھی"], "کوئی نہیں / نہیں", "geen nouns کے ساتھ negative بناتا ہے۔"),
      reverse("میرے پاس کتاب نہیں ہے", ["ik heb geen boek", "ik kom niet boek", "dat is geen boek"], "ik heb geen boek", "geen + noun۔")
    ]
  },
  {
    id: "a1-present-time",
    unit: "A1: present tense اور وقت",
    title: "سبق 6: Ik werk vandaag",
    description: "Subject + verb + rest، present tense، آج/کل/ابھی۔",
    xp: 70,
    questions: [
      meaning("werk", ["کام کرتا/کرتی ہوں", "رہتا ہوں", "پیتا ہوں"], "کام کرتا/کرتی ہوں", "ik werk = میں کام کرتا/کرتی ہوں۔"),
      meaning("woon", ["رہتا/رہتی ہوں", "کام کرتا ہوں", "سیکھتا ہوں"], "رہتا/رہتی ہوں", "ik woon = میں رہتا/رہتی ہوں۔"),
      meaning("leer", ["سیکھتا/سیکھتی ہوں", "رہتا ہوں", "آتا ہوں"], "سیکھتا/سیکھتی ہوں", "ik leer = میں سیکھتا/سیکھتی ہوں۔"),
      meaning("drink", ["پیتا/پیتی ہوں", "کھاتا ہوں", "کام کرتا ہوں"], "پیتا/پیتی ہوں", "drink = پینا۔"),
      meaning("vandaag", ["آج", "آنے والا کل", "گزرا ہوا کل"], "آج", "vandaag = today۔"),
      meaning("morgen", ["آنے والا کل", "آج", "ابھی"], "آنے والا کل", "morgen = tomorrow۔"),
      meaning("gisteren", ["گزرا ہوا کل", "آج", "تھوڑی دیر بعد"], "گزرا ہوا کل", "gisteren = yesterday۔"),
      meaning("nu", ["ابھی", "کل", "بعد میں"], "ابھی", "nu = now۔"),
      meaning("ik werk vandaag", ["میں آج کام کرتا/کرتی ہوں", "میں آج رہتا ہوں", "میں آج نہیں آتا"], "میں آج کام کرتا/کرتی ہوں", "A1 order: subject + verb + rest۔"),
      meaning("ik woon in Nederland", ["میں نیدرلینڈ میں رہتا/رہتی ہوں", "میں نیدرلینڈ سیکھتا ہوں", "میں نیدرلینڈ سے آیا ہوں"], "میں نیدرلینڈ میں رہتا/رہتی ہوں", "woon = رہنا۔"),
      meaning("wij leren Nederlands", ["ہم Dutch سیکھتے ہیں", "ہم Dutch ہیں", "ہم Dutch پیتے ہیں"], "ہم Dutch سیکھتے ہیں", "wij leren Nederlands۔"),
      meaning("ik drink koffie", ["میں کافی پیتا/پیتی ہوں", "مجھے کافی چاہیے", "یہ کافی ہے"], "میں کافی پیتا/پیتی ہوں", "drink + koffie۔"),
      reverse("میں آج کام کرتا/کرتی ہوں", ["ik werk vandaag", "ik woon vandaag", "ik heb vandaag"], "ik werk vandaag", "vandaag آخر میں بھی آ سکتا ہے۔"),
      reverse("ہم Dutch سیکھتے ہیں", ["wij leren Nederlands", "wij zijn Nederlands", "wij drinken Nederlands"], "wij leren Nederlands", "leren = سیکھنا۔")
    ]
  },
  {
    id: "a1-questions",
    unit: "A1: سوالات",
    title: "سبق 7: Wie, wat, waar?",
    description: "Question words اور yes/no questions، آہستہ آہستہ۔",
    xp: 70,
    questions: [
      meaning("wie", ["کون", "کیا", "کہاں"], "کون", "wie = who۔"),
      meaning("wat", ["کیا", "کب", "کیوں"], "کیا", "wat = what۔"),
      meaning("waar", ["کہاں", "کون", "کتنا"], "کہاں", "waar = where۔"),
      meaning("wanneer", ["کب", "کیسے", "کہاں"], "کب", "wanneer = when۔"),
      meaning("hoe", ["کیسے", "کیوں", "کون"], "کیسے", "hoe = how۔"),
      meaning("hoeveel", ["کتنا", "کب", "کون"], "کتنا", "hoeveel = how much/how many۔"),
      meaning("waarom", ["کیوں", "کہاں", "کیا"], "کیوں", "waarom = why۔"),
      meaning("wie ben jij?", ["تم کون ہو؟", "تم کہاں رہتے ہو؟", "تم کیا چاہتے ہو؟"], "تم کون ہو؟", "wie + ben + jij۔"),
      meaning("waar woon je?", ["تم کہاں رہتے ہو؟", "تم کیا کام کرتے ہو؟", "تم کب آتے ہو؟"], "تم کہاں رہتے ہو؟", "waar woon je A1 speaking question ہے۔"),
      meaning("heb je kinderen?", ["کیا تمہارے بچے ہیں؟", "کیا تم بچہ ہو؟", "تم کہاں رہتے ہو؟"], "کیا تمہارے بچے ہیں؟", "yes/no question میں verb پہلے آتا ہے۔"),
      reverse("تمہارے بچے ہیں؟", ["heb je kinderen?", "ben je kinderen?", "waar zijn kinderen?"], "heb je kinderen?", "heb je = do you have۔"),
      reverse("تم کل آ رہے ہو؟", ["kom je morgen?", "woon je morgen?", "heb je morgen?"], "kom je morgen?", "Kom je morgen? = are you coming tomorrow?"),
      meaning("ja", ["ہاں", "نہیں", "شاید"], "ہاں", "short answer: ja۔"),
      meaning("nee", ["نہیں", "ہاں", "اچھا"], "نہیں", "short answer: nee۔")
    ]
  },
  {
    id: "a1-house-food-plurals",
    unit: "A1: گھر، کھانا، plural",
    title: "سبق 8: Huis, brood, boeken",
    description: "Daily words: house, food, de/het/ein اور plural forms۔",
    xp: 75,
    questions: [
      meaning("het huis", ["گھر", "دروازہ", "کرسی"], "گھر", "het huis = house۔"),
      meaning("kamer", ["کمرہ", "کچن", "باتھ روم"], "کمرہ", "kamer = room۔"),
      meaning("keuken", ["کچن", "باتھ روم", "کرسی"], "کچن", "keuken = kitchen۔"),
      meaning("badkamer", ["باتھ روم", "کچن", "دروازہ"], "باتھ روم", "badkamer = bathroom۔"),
      meaning("tafel", ["میز", "فون", "کمرہ"], "میز", "tafel = table۔"),
      meaning("stoel", ["کرسی", "چابی", "گھر"], "کرسی", "stoel = chair۔"),
      meaning("brood", ["روٹی / بریڈ", "پنیر", "گوشت"], "روٹی / بریڈ", "brood = bread۔"),
      meaning("kaas", ["پنیر", "پانی", "چاول"], "پنیر", "kaas = cheese۔"),
      meaning("groente", ["سبزی", "پھل", "گوشت"], "سبزی", "groente = vegetables۔"),
      meaning("fruit", ["پھل", "سبزی", "دودھ"], "پھل", "fruit = fruit۔"),
      meaning("boek", ["کتاب", "بیگ", "میز"], "کتاب", "boek = book۔"),
      meaning("boeken", ["کتابیں", "بیگ", "میزیں"], "کتابیں", "plural: boek -> boeken۔"),
      meaning("tas", ["بیگ", "کتاب", "دروازہ"], "بیگ", "tas = bag۔"),
      meaning("tassen", ["بیگ / bags", "کتابیں", "بچے"], "بیگ / bags", "plural: tas -> tassen۔"),
      reverse("گھر", ["het huis", "de huis", "een man"], "het huis", "house = het huis۔"),
      reverse("کتابیں", ["boeken", "boek", "tassen"], "boeken", "books = boeken۔")
    ]
  },
  {
    id: "a1-shopping-transport",
    unit: "A1: خریداری اور سفر",
    title: "سبق 9: Hoeveel kost dit?",
    description: "Shopping, prices, transport, station, ticket۔",
    xp: 75,
    questions: [
      meaning("winkel", ["دکان", "اسٹیشن", "ڈاکٹر"], "دکان", "winkel = shop۔"),
      meaning("supermarkt", ["سپر مارکیٹ", "بس", "فارم"], "سپر مارکیٹ", "supermarkt = supermarket۔"),
      meaning("prijs", ["قیمت", "رسید", "پیسہ"], "قیمت", "prijs = price۔"),
      meaning("kassa", ["کاؤنٹر / cashier", "بس اسٹاپ", "رسید"], "کاؤنٹر / cashier", "kassa = checkout۔"),
      meaning("bon", ["رسید", "قیمت", "نقد"], "رسید", "bon = receipt۔"),
      meaning("pinpas", ["بینک کارڈ", "رسید", "ٹکٹ"], "بینک کارڈ", "pinpas = debit card۔"),
      meaning("contant", ["نقد", "مہنگا", "سستا"], "نقد", "contant = cash۔"),
      meaning("goedkoop", ["سستا", "مہنگا", "نیا"], "سستا", "goedkoop = cheap۔"),
      meaning("duur", ["مہنگا", "سستا", "اچھا"], "مہنگا", "duur = expensive۔"),
      meaning("station", ["اسٹیشن", "دکان", "رسید"], "اسٹیشن", "station = station۔"),
      meaning("halte", ["بس/ٹرام اسٹاپ", "دکان", "گھر"], "بس/ٹرام اسٹاپ", "halte = stop۔"),
      meaning("kaartje", ["ٹکٹ", "رسید", "کارڈ"], "ٹکٹ", "kaartje = ticket۔"),
      meaning("hoeveel kost dit?", ["یہ کتنے کا ہے؟", "یہ کہاں ہے؟", "تم کون ہو؟"], "یہ کتنے کا ہے؟", "shopping question۔"),
      meaning("waar is het station?", ["اسٹیشن کہاں ہے؟", "یہ کتنے کا ہے؟", "ٹکٹ کہاں ہے؟"], "اسٹیشن کہاں ہے؟", "transport question۔"),
      reverse("مجھے ٹکٹ چاہیے", ["ik wil een kaartje", "ik heb een bon", "ik ben een kaartje"], "ik wil een kaartje", "kaartje = ticket۔")
    ]
  },
  {
    id: "a1-health-appointments",
    unit: "A1: صحت اور afspraak",
    title: "سبق 10: Ik heb een afspraak",
    description: "Doctor, pain, sick, appointment, short message۔",
    xp: 80,
    questions: [
      meaning("dokter", ["ڈاکٹر", "دندان ساز", "فارمیسی"], "ڈاکٹر", "dokter = doctor۔"),
      meaning("tandarts", ["دندان ساز", "ڈاکٹر", "اسکول"], "دندان ساز", "tandarts = dentist۔"),
      meaning("ziek", ["بیمار", "ٹھیک", "مہنگا"], "بیمار", "ziek = sick۔"),
      meaning("pijn", ["درد", "دوا", "وقت"], "درد", "pijn = pain۔"),
      meaning("hoofdpijn", ["سر درد", "پیٹ درد", "دوا"], "سر درد", "hoofdpijn = headache۔"),
      meaning("buikpijn", ["پیٹ درد", "سر درد", "دندان ساز"], "پیٹ درد", "buikpijn = stomach pain۔"),
      meaning("medicijn", ["دوا", "ڈاکٹر", "رسید"], "دوا", "medicijn = medicine۔"),
      meaning("afspraak", ["appointment / ملاقات کا وقت", "درد", "خط"], "appointment / ملاقات کا وقت", "afspraak = appointment۔"),
      meaning("ik ben ziek", ["میں بیمار ہوں", "میں ڈاکٹر ہوں", "میرے پاس دوا ہے"], "میں بیمار ہوں", "health sentence۔"),
      meaning("ik heb pijn", ["مجھے درد ہے", "میں درد ہوں", "میرے پاس وقت ہے"], "مجھے درد ہے", "ik heb pijn = I have pain۔"),
      meaning("ik heb een afspraak bij de dokter", ["میری doctor کے پاس appointment ہے", "میں doctor ہوں", "مجھے doctor چاہیے"], "میری doctor کے پاس appointment ہے", "A1 speaking example۔"),
      reverse("میں کل نہیں آ سکتا/سکتی", ["ik kan morgen niet komen", "ik ben morgen niet komen", "ik heb morgen geen komen"], "ik kan morgen niet komen", "short message۔"),
      reverse("میں بیمار ہوں", ["ik ben ziek", "ik heb ziek", "ik wil ziek"], "ik ben ziek", "zijn verb۔"),
      reverse("مجھے appointment چاہیے", ["ik wil een afspraak", "ik heb geen afspraak", "ik ben een afspraak"], "ik wil een afspraak", "wil = چاہیے۔"),
      meaning("beste meneer", ["محترم جناب", "خدا حافظ", "میرا نام"], "محترم جناب", "formal short message opening۔")
    ]
  }
];

const a2Lessons = [
  {
    id: "a2-perfect-tense",
    unit: "A2: verleden tijd",
    title: "A2 les 1: Ik heb gewerkt",
    description: "A2 grammar: perfect tense with hebben/zijn + past participle.",
    xp: 85,
    questions: [
      meaning("ik heb gewerkt", ["میں نے کام کیا ہے", "میں کام کرتا ہوں", "میں کام کرنے جا رہا ہوں"], "میں نے کام کیا ہے", "Perfect tense: hebben + past participle۔"),
      meaning("zij heeft gekookt", ["اس نے کھانا پکایا ہے", "وہ کھانا پکاتی ہے", "وہ کھانا پکانے جا رہی ہے"], "اس نے کھانا پکایا ہے", "heeft + gekookt past action ہے۔"),
      meaning("wij zijn naar de supermarkt gegaan", ["ہم supermarket گئے ہیں", "ہم supermarket میں ہیں", "ہم supermarket جائیں گے"], "ہم supermarket گئے ہیں", "movement verbs often use zijn۔"),
      meaning("hij is thuis gebleven", ["وہ گھر پر رہا ہے", "وہ گھر پر ہے", "وہ گھر جائے گا"], "وہ گھر پر رہا ہے", "blijven with zijn in perfect tense۔"),
      reverse("میں doctor کے پاس گیا/گئی ہوں", ["ik ben naar de dokter gegaan", "ik heb naar de dokter gewerkt", "ik ga naar de dokter"], "ik ben naar de dokter gegaan", "movement: zijn + gegaan۔"),
      reverse("اس نے کھانا پکایا ہے", ["zij heeft gekookt", "zij is gekookt", "zij gaat koken"], "zij heeft gekookt", "cooking uses hebben۔"),
      meaning("gewerkt", ["کام کیا", "گیا", "رہا"], "کام کیا", "past participle of werken۔"),
      meaning("gegaan", ["گیا", "کام کیا", "رہا"], "گیا", "past participle of gaan۔"),
      meaning("gebleven", ["رہا", "پکایا", "کام کیا"], "رہا", "past participle of blijven۔"),
      meaning("ik heb gisteren gebeld", ["میں نے کل فون کیا", "میں کل فون کروں گا", "میں فون کر رہا ہوں"], "میں نے کل فون کیا", "gisteren + perfect tense۔")
    ]
  },
  {
    id: "a2-future-modal-verbs",
    unit: "A2: gaan اور modal verbs",
    title: "A2 les 2: Ik ga werken",
    description: "Future with gaan and useful modal verbs: kunnen, moeten, mogen.",
    xp: 85,
    questions: [
      meaning("ik ga morgen werken", ["میں کل کام کرنے جا رہا/رہی ہوں", "میں نے کل کام کیا", "میں آج کام کرتا ہوں"], "میں کل کام کرنے جا رہا/رہی ہوں", "Future with gaan۔"),
      meaning("wij gaan Nederlands leren", ["ہم Dutch سیکھنے جا رہے ہیں", "ہم Dutch سیکھ چکے ہیں", "ہم Dutch ہیں"], "ہم Dutch سیکھنے جا رہے ہیں", "gaan + infinitive۔"),
      meaning("ik moet naar de gemeente", ["مجھے gemeente جانا ہے", "میں gemeente گیا ہوں", "میں gemeente ہوں"], "مجھے gemeente جانا ہے", "moeten = must/have to۔"),
      meaning("kunt u mij helpen?", ["کیا آپ میری مدد کر سکتے ہیں؟", "کیا آپ مجھے جانتے ہیں؟", "کیا آپ appointment ہیں؟"], "کیا آپ میری مدد کر سکتے ہیں؟", "formal useful question۔"),
      meaning("mag ik hier parkeren?", ["کیا میں یہاں park کر سکتا ہوں؟", "کیا مجھے یہاں کام کرنا ہے؟", "کیا میں یہاں رہتا ہوں؟"], "کیا میں یہاں park کر سکتا ہوں؟", "mogen = may/allowed۔"),
      reverse("مجھے doctor کو فون کرنا ہے", ["ik moet de dokter bellen", "ik mag de dokter bellen", "ik ben de dokter bellen"], "ik moet de dokter bellen", "moet + infinitive۔"),
      reverse("کیا آپ میری مدد کر سکتے ہیں؟", ["kunt u mij helpen?", "moet u mij helpen?", "gaat u mij helpen?"], "kunt u mij helpen?", "kunnen = can۔"),
      meaning("kunnen", ["کر سکنا", "ضروری ہونا", "اجازت ہونا"], "کر سکنا", "kunnen = can۔"),
      meaning("moeten", ["ضروری ہونا", "کر سکنا", "چاہنا"], "ضروری ہونا", "moeten = must۔"),
      meaning("mogen", ["اجازت ہونا", "ضروری ہونا", "رہنا"], "اجازت ہونا", "mogen = may/allowed۔")
    ]
  },
  {
    id: "a2-separable-verbs-routine",
    unit: "A2: separable verbs",
    title: "A2 les 3: Ik sta om zeven uur op",
    description: "Daily routine and separable verbs: opstaan, invullen, opbellen.",
    xp: 85,
    questions: [
      meaning("ik sta om zeven uur op", ["میں سات بجے اٹھتا/اٹھتی ہوں", "میں سات بجے کام کرتا ہوں", "میں سات بجے فون کرتا ہوں"], "میں سات بجے اٹھتا/اٹھتی ہوں", "opstaan separates: sta ... op۔"),
      meaning("vul het formulier in", ["form بھر دیں", "doctor کو فون کریں", "گھر صاف کریں"], "form بھر دیں", "invullen separates: vul ... in۔"),
      meaning("ik bel de dokter op", ["میں doctor کو فون کرتا/کرتی ہوں", "میں doctor کے پاس جاتا ہوں", "میں doctor سے appointment رکھتا ہوں"], "میں doctor کو فون کرتا/کرتی ہوں", "opbellen separates: bel ... op۔"),
      meaning("wij maken het huis schoon", ["ہم گھر صاف کرتے ہیں", "ہم گھر جاتے ہیں", "ہم گھر کرائے پر لیتے ہیں"], "ہم گھر صاف کرتے ہیں", "schoonmaken separates۔"),
      reverse("میں سات بجے اٹھتا ہوں", ["ik sta om zeven uur op", "ik opsta om zeven uur", "ik bel om zeven uur op"], "ik sta om zeven uur op", "separable part goes to end۔"),
      reverse("form بھر دیں", ["vul het formulier in", "bel het formulier op", "maak het formulier schoon"], "vul het formulier in", "invullen = form بھرنا۔"),
      meaning("opstaan", ["اٹھنا", "فون کرنا", "صاف کرنا"], "اٹھنا", "opstaan = get up۔"),
      meaning("invullen", ["بھرنا", "رہنا", "خریدنا"], "بھرنا", "invullen = fill in۔"),
      meaning("opbellen", ["فون کرنا", "اٹھنا", "صاف کرنا"], "فون کرنا", "opbellen = call۔"),
      meaning("schoonmaken", ["صاف کرنا", "فون کرنا", "رکنا"], "صاف کرنا", "schoonmaken = clean۔")
    ]
  },
  {
    id: "a2-word-order-connectors",
    unit: "A2: word order",
    title: "A2 les 4: Omdat ik ziek ben",
    description: "Time-first order and connectors: omdat, dat, als.",
    xp: 90,
    questions: [
      meaning("vandaag werk ik niet", ["آج میں کام نہیں کرتا", "میں آج کام کرتا ہوں", "کل میں کام کروں گا"], "آج میں کام نہیں کرتا", "Time first changes order: vandaag werk ik۔"),
      meaning("ik ga morgen met de bus naar Amsterdam", ["میں کل بس سے Amsterdam جا رہا ہوں", "میں آج bus میں کام کرتا ہوں", "میں Amsterdam سے bus لیتا ہوں"], "میں کل بس سے Amsterdam جا رہا ہوں", "time + manner + place۔"),
      meaning("ik kom niet, omdat ik ziek ben", ["میں نہیں آتا کیونکہ میں بیمار ہوں", "میں آتا ہوں کیونکہ میں ٹھیک ہوں", "میں بیمار نہیں ہوں"], "میں نہیں آتا کیونکہ میں بیمار ہوں", "omdat sends verb to end۔"),
      meaning("ik denk dat hij thuis is", ["میرا خیال ہے وہ گھر پر ہے", "وہ سوچتا ہے میں گھر پر ہوں", "میں گھر جا رہا ہوں"], "میرا خیال ہے وہ گھر پر ہے", "dat clause: verb at end۔"),
      meaning("als het regent, blijf ik thuis", ["اگر بارش ہو تو میں گھر رہتا ہوں", "میں بارش میں کام کرتا ہوں", "اگر گھر ہے تو بارش ہے"], "اگر بارش ہو تو میں گھر رہتا ہوں", "als = if۔"),
      reverse("کیونکہ میں بیمار ہوں", ["omdat ik ziek ben", "omdat ik ben ziek", "want ik ziek ben"], "omdat ik ziek ben", "with omdat, verb at end۔"),
      reverse("آج میں کام نہیں کرتا", ["vandaag werk ik niet", "vandaag ik werk niet", "ik vandaag niet werk"], "vandaag werk ik niet", "time first: verb second۔"),
      meaning("omdat", ["کیونکہ", "اگر", "لیکن"], "کیونکہ", "omdat = because۔"),
      meaning("dat", ["کہ", "اگر", "اس لیے"], "کہ", "dat = that۔"),
      meaning("als", ["اگر", "کیونکہ", "اور"], "اگر", "als = if۔")
    ]
  },
  {
    id: "a2-gemeente-official",
    unit: "A2: gemeente",
    title: "A2 les 5: Kunt u mij helpen?",
    description: "Official life: gemeente, forms, BSN, passport, documents.",
    xp: 90,
    questions: [
      meaning("gemeente", ["municipality / بلدیہ", "hospital", "school"], "municipality / بلدیہ", "gemeente official life میں important ہے۔"),
      meaning("afspraak", ["appointment", "document", "signature"], "appointment", "gemeente میں afspraak بنانی پڑ سکتی ہے۔"),
      meaning("formulier", ["form", "passport", "counter"], "form", "formulier = form۔"),
      meaning("paspoort", ["passport", "document", "BSN"], "passport", "paspoort = passport۔"),
      meaning("BSN", ["Dutch citizen service number", "bank card", "rent"], "Dutch citizen service number", "BSN official number ہے۔"),
      meaning("handtekening", ["signature", "letter", "counter"], "signature", "handtekening = signature۔"),
      meaning("loket", ["counter/window", "document", "appointment"], "counter/window", "loket = service counter۔"),
      meaning("kunt u mij helpen met dit formulier?", ["کیا آپ اس form میں میری مدد کر سکتے ہیں؟", "کیا آپ passport دے سکتے ہیں؟", "کیا آپ مجھے کام دے سکتے ہیں؟"], "کیا آپ اس form میں میری مدد کر سکتے ہیں؟", "A2 practical question۔"),
      reverse("مجھے appointment بنانی ہے", ["ik wil een afspraak maken", "ik heb een formulier maken", "ik ben een afspraak"], "ik wil een afspraak maken", "afspraak maken = appointment بنانا۔"),
      reverse("کیا آپ میری مدد کر سکتے ہیں؟", ["kunt u mij helpen?", "mag u mij helpen?", "moet ik helpen?"], "kunt u mij helpen?", "formal question۔")
    ]
  },
  {
    id: "a2-work-school",
    unit: "A2: work and school",
    title: "A2 les 6: Werk, school, afspraak",
    description: "Work, school, schedule, teacher, colleague, short messages.",
    xp: 90,
    questions: [
      meaning("werk", ["کام", "school", "doctor"], "کام", "werk = work۔"),
      meaning("baan", ["job", "lesson", "rent"], "job", "baan = job۔"),
      meaning("collega", ["colleague", "teacher", "child"], "colleague", "collega = work colleague۔"),
      meaning("salaris", ["salary", "contract", "pause"], "salary", "salaris = salary۔"),
      meaning("contract", ["contract", "report", "appointment"], "contract", "contract = contract۔"),
      meaning("rooster", ["schedule", "salary", "lesson"], "schedule", "rooster = schedule۔"),
      meaning("docent", ["teacher", "student", "colleague"], "teacher", "docent = teacher۔"),
      meaning("huiswerk", ["homework", "meeting", "salary"], "homework", "huiswerk = homework۔"),
      meaning("mijn zoon kan vandaag niet naar school komen", ["میرا بیٹا آج school نہیں آ سکتا", "میرا بیٹا آج کام کرے گا", "میرا بیٹا teacher ہے"], "میرا بیٹا آج school نہیں آ سکتا", "A2 school message۔"),
      reverse("میرا schedule بدل گیا ہے", ["mijn rooster is veranderd", "mijn salaris is ziek", "mijn school is gewerkt"], "mijn rooster is veranderd", "work/school practical sentence۔")
    ]
  },
  {
    id: "a2-health-housing",
    unit: "A2: health and housing",
    title: "A2 les 7: Mijn verwarming doet het niet",
    description: "Doctor, pharmacy, insurance, repair, heating, leakage.",
    xp: 95,
    questions: [
      meaning("huisarts", ["family doctor / GP", "dentist", "pharmacy"], "family doctor / GP", "huisarts is common in NL۔"),
      meaning("apotheek", ["pharmacy", "hospital", "insurance"], "pharmacy", "apotheek = pharmacy۔"),
      meaning("verzekering", ["insurance", "medicine", "appointment"], "insurance", "verzekering = insurance۔"),
      meaning("koorts", ["fever", "cough", "pain"], "fever", "koorts = fever۔"),
      meaning("hoesten", ["coughing", "fever", "repair"], "coughing", "hoesten = coughing۔"),
      meaning("reparatie", ["repair", "rent", "heating"], "repair", "reparatie = repair۔"),
      meaning("verwarming", ["heating", "leakage", "electricity"], "heating", "verwarming = heating۔"),
      meaning("lekkage", ["leakage", "bill", "neighbor"], "leakage", "lekkage = leakage۔"),
      meaning("mijn verwarming doet het niet", ["میری heating کام نہیں کر رہی", "میری heating نئی ہے", "میرے پاس heating نہیں ہے"], "میری heating کام نہیں کر رہی", "A2 problem explanation۔"),
      reverse("کیا آپ کسی کو بھیج سکتے ہیں؟", ["kunt u iemand sturen?", "mag ik iemand sturen?", "moet iemand bellen?"], "kunt u iemand sturen?", "housing/repair question۔")
    ]
  },
  {
    id: "a2-shopping-services",
    unit: "A2: services",
    title: "A2 les 8: Ik wil hem ruilen",
    description: "Shopping services: klacht, garantie, ruilen, aanbieding.",
    xp: 90,
    questions: [
      meaning("klacht", ["complaint", "discount", "receipt"], "complaint", "klacht = complaint۔"),
      meaning("garantie", ["warranty", "size", "cash"], "warranty", "garantie = warranty۔"),
      meaning("ruilen", ["exchange", "pay", "park"], "exchange", "ruilen = exchange/return۔"),
      meaning("aanbieding", ["offer/discount", "complaint", "size"], "offer/discount", "aanbieding = offer۔"),
      meaning("maat", ["size", "market", "receipt"], "size", "maat = size۔"),
      meaning("ik heb gisteren deze jas gekocht", ["میں نے کل یہ jacket خریدی", "میں آج jacket خریدتا ہوں", "میں jacket واپس کروں گا"], "میں نے کل یہ jacket خریدی", "perfect tense with gekocht۔"),
      meaning("maar hij is kapot", ["لیکن یہ خراب ہے", "لیکن یہ سستا ہے", "لیکن یہ نیا ہے"], "لیکن یہ خراب ہے", "kapot = broken۔"),
      meaning("ik wil hem graag ruilen", ["میں اسے exchange کرنا چاہتا ہوں", "میں اسے خریدنا چاہتا ہوں", "میں اسے پہننا چاہتا ہوں"], "میں اسے exchange کرنا چاہتا ہوں", "A2 complaint/request۔"),
      reverse("یہ خراب ہے", ["hij is kapot", "hij is goedkoop", "hij is goed"], "hij is kapot", "kapot = broken۔"),
      reverse("میں اسے exchange کرنا چاہتا ہوں", ["ik wil hem ruilen", "ik heb hem gekocht", "ik moet hem betalen"], "ik wil hem ruilen", "ruilen = exchange۔")
    ]
  },
  {
    id: "a2-writing-messages",
    unit: "A2: writing",
    title: "A2 les 9: Korte berichten",
    description: "Short emails, invitations, complaints, and polite endings.",
    xp: 95,
    questions: [
      meaning("beste dokter", ["محترم doctor", "خدا حافظ doctor", "میرا doctor"], "محترم doctor", "formal email opening۔"),
      meaning("met vriendelijke groet", ["احترام کے ساتھ", "فوراً آئیں", "شکریہ نہیں"], "احترام کے ساتھ", "formal email ending۔"),
      meaning("ik wil graag een afspraak maken", ["میں appointment بنانا چاہتا ہوں", "میں appointment cancel کرنا چاہتا ہوں", "میں appointment رکھتا ہوں"], "میں appointment بنانا چاہتا ہوں", "A2 writing/speaking phrase۔"),
      meaning("mijn zoon kan vandaag niet komen", ["میرا بیٹا آج نہیں آ سکتا", "میرا بیٹا آج آئے گا", "میرا بیٹا آج کام کرے گا"], "میرا بیٹا آج نہیں آ سکتا", "school message۔"),
      meaning("ik geef zaterdag een feest", ["میں Saturday party دے رہا ہوں", "میں Saturday کام کرتا ہوں", "میں Saturday بیمار ہوں"], "میں Saturday party دے رہا ہوں", "invitation phrase۔"),
      meaning("kom je ook?", ["کیا تم بھی آؤ گے؟", "تم کہاں ہو؟", "کیا تم بیمار ہو؟"], "کیا تم بھی آؤ گے؟", "invitation question۔"),
      reverse("احترام کے ساتھ", ["met vriendelijke groet", "beste meneer", "hoi Ahmed"], "met vriendelijke groet", "formal ending۔"),
      reverse("میں appointment بنانا چاہتا ہوں", ["ik wil graag een afspraak maken", "ik heb een afspraak gehad", "ik ben een afspraak"], "ik wil graag een afspraak maken", "graag makes it polite۔"),
      reverse("کیا تم بھی آؤ گے؟", ["kom je ook?", "waar woon je?", "heb je ook?"], "kom je ook?", "invitation question۔"),
      meaning("hoi Ahmed", ["Hi Ahmed", "محترم Ahmed", "خدا حافظ Ahmed"], "Hi Ahmed", "informal message opening۔")
    ]
  },
  {
    id: "a2-strong-combined",
    unit: "A2: combined practice",
    title: "A2 les 10: Omdat ik pijn had",
    description: "A stronger A2-style health story with past tense, omdat, dat, and modal verbs.",
    xp: 100,
    questions: [
      meaning("ik ben gisteren naar de huisarts gegaan", ["میں کل huisarts کے پاس گیا/گئی", "میں کل huisarts ہوں", "میں کل huisarts کو فون کروں گا"], "میں کل huisarts کے پاس گیا/گئی", "perfect tense with zijn + gegaan۔"),
      meaning("omdat ik pijn had in mijn rug", ["کیونکہ میری کمر میں درد تھا", "کیونکہ میں doctor تھا", "کیونکہ میرے پاس وقت ہے"], "کیونکہ میری کمر میں درد تھا", "omdat + verb at end۔"),
      meaning("de dokter heeft gezegd", ["doctor نے کہا ہے", "doctor کہے گا", "doctor بیمار ہے"], "doctor نے کہا ہے", "heeft gezegd = has said۔"),
      meaning("dat ik rust moet nemen", ["کہ مجھے آرام کرنا چاہیے", "کہ مجھے کام کرنا چاہیے", "کہ مجھے جانا ہے"], "کہ مجھے آرام کرنا چاہیے", "dat clause + modal verb۔"),
      meaning("ik moet volgende week terugkomen", ["مجھے اگلے ہفتے واپس آنا ہے", "میں اگلے ہفتے کام کروں گا", "میں آج واپس آیا"], "مجھے اگلے ہفتے واپس آنا ہے", "moet + infinitive۔"),
      meaning("als de pijn niet weg is", ["اگر درد ختم نہیں ہوا", "اگر درد اچھا ہے", "اگر doctor نہیں ہے"], "اگر درد ختم نہیں ہوا", "als = if۔"),
      reverse("doctor نے کہا ہے", ["de dokter heeft gezegd", "de dokter gaat zeggen", "de dokter is gezegd"], "de dokter heeft gezegd", "perfect tense۔"),
      reverse("مجھے آرام کرنا چاہیے", ["ik moet rust nemen", "ik mag rust nemen", "ik heb rust genomen"], "ik moet rust nemen", "moeten = must/should۔"),
      reverse("اگر درد ختم نہیں ہوا", ["als de pijn niet weg is", "omdat de pijn weg is", "dat de pijn niet"], "als de pijn niet weg is", "A2 subordinate clause۔"),
      meaning("terugkomen", ["واپس آنا", "فون کرنا", "form بھرنا"], "واپس آنا", "terugkomen = come back۔")
    ]
  }
];

a1Lessons.find((lesson) => lesson.id === "a1-zero-tiny-words").questions.push(
  build("اچھا نہیں", ["niet", "goed"], "niet goed", "Dutch میں negative word `niet` عام طور پر اس word سے پہلے آتا ہے جسے negative بنانا ہو۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-zijn-first-sentences").questions.push(
  build("میں اچھا نہیں ہوں", ["ik", "ben", "niet", "goed"], "ik ben niet goed", "basic order: ik + ben + niet + goed۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-greetings-personal-info").questions.push(
  build("میرا نام Ali ہے", ["mijn", "naam", "is", "Ali"], "mijn naam is Ali", "نام بتانے کا fixed pattern ہے: mijn naam is + name۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-people-family-articles").questions.push(
  build("یہ ایک بچہ ہے", ["dit", "is", "een", "kind"], "dit is een kind", "چھوٹا sentence: dit + is + een + noun۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-hebben-family").questions.push(
  build("میرے پاس ایک بچہ ہے", ["ik", "heb", "een", "kind"], "ik heb een kind", "possession کے لیے: ik heb + thing/person۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-present-time").questions.push(
  build("آج میں کام کرتا/کرتی ہوں", ["vandaag", "werk", "ik"], "vandaag werk ik", "جب time word پہلے آئے تو verb دوسرے نمبر پر آتا ہے: vandaag + werk + ik۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-questions").questions.push(
  build("آپ کہاں رہتے ہیں؟", ["waar", "woont", "u"], "waar woont u", "question word پہلے، پھر verb، پھر person: waar + woont + u۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-house-food-plurals").questions.push(
  build("کتاب گھر میں ہے", ["het", "boek", "is", "in", "huis"], "het boek is in huis", "thing پہلے، پھر verb `is`، پھر place۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-shopping-transport").questions.push(
  build("میں station جا رہا/رہی ہوں", ["ik", "ga", "naar", "het", "station"], "ik ga naar het station", "direction کے لیے `naar` استعمال ہوتا ہے: ga naar...۔")
);

a1Lessons.find((lesson) => lesson.id === "a1-health-appointments").questions.push(
  build("میں appointment بنانا چاہتا/چاہتی ہوں", ["ik", "wil", "een", "afspraak", "maken"], "ik wil een afspraak maken", "modal verb `wil` کے بعد اصل verb آخر میں آتا ہے: maken۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-perfect-tense").questions.push(
  build("میں نے کام کیا ہے", ["ik", "heb", "gewerkt"], "ik heb gewerkt", "perfect tense میں vaak: subject + heb/heeft + voltooid deelwoord۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-future-modal-verbs").questions.push(
  build("کل میں کام کرنے جا رہا/رہی ہوں", ["morgen", "ga", "ik", "werken"], "morgen ga ik werken", "time word پہلے آئے تو verb second position میں رہتا ہے: morgen + ga + ik۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-separable-verbs-routine").questions.push(
  build("میں صبح اٹھتا/اٹھتی ہوں", ["ik", "sta", "op", "in", "de", "ochtend"], "ik sta op in de ochtend", "separable verb `opstaan`: sentence میں `sta ... op` بن سکتا ہے۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-word-order-connectors").questions.push(
  build("میں نہیں آتا/آتی کیونکہ میں بیمار ہوں", ["ik", "kom", "niet", "omdat", "ik", "ziek", "ben"], "ik kom niet omdat ik ziek ben", "`omdat` کے بعد verb آخر میں جاتا ہے: ik ziek ben۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-gemeente-official").questions.push(
  build("میں gemeente میں appointment چاہتا/چاہتی ہوں", ["ik", "wil", "een", "afspraak", "bij", "de", "gemeente"], "ik wil een afspraak bij de gemeente", "request sentence: ik wil + thing + place۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-work-school").questions.push(
  build("میرا بیٹا آج نہیں آ سکتا", ["mijn", "zoon", "kan", "vandaag", "niet", "komen"], "mijn zoon kan vandaag niet komen", "modal verb `kan` کے ساتھ main verb `komen` آخر میں آتا ہے۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-health-housing").questions.push(
  build("میری heating کام نہیں کر رہی", ["mijn", "verwarming", "doet", "het", "niet"], "mijn verwarming doet het niet", "problem phrase: doet het niet = کام نہیں کر رہا۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-shopping-services").questions.push(
  build("میں اسے exchange کرنا چاہتا/چاہتی ہوں", ["ik", "wil", "hem", "ruilen"], "ik wil hem ruilen", "`wil` کے بعد action verb آتا ہے: ruilen۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-writing-messages").questions.push(
  build("احترام کے ساتھ", ["met", "vriendelijke", "groet"], "met vriendelijke groet", "formal message کا ending fixed phrase ہے۔")
);

a2Lessons.find((lesson) => lesson.id === "a2-strong-combined").questions.push(
  build("مجھے آرام کرنا چاہیے", ["ik", "moet", "rust", "nemen"], "ik moet rust nemen", "`moet` کے بعد action phrase آتا ہے: rust nemen۔")
);

const a0Subchapters = [
  {
    id: "a0-letters-sounds",
    title: "Letters and Sounds",
    goal: "Dutch letters پہچاننا، آواز سننا، اور آسان words پڑھنا۔",
    practice: "letters سنیں، پہچانیں، اور example word سے match کریں۔",
    lessonIds: ["a0-letters-1", "a0-letters-2", "a0-letters-3"]
  },
  {
    id: "a0-first-words",
    title: "First Words",
    goal: "سب سے بنیادی words: میں، تم، آپ، ہاں، نہیں، اچھا۔",
    practice: "چھوٹے words کو بار بار recognise کریں۔",
    lessonIds: ["a0-ik-jij-u", "a0-ja-nee-goed-niet"]
  },
  {
    id: "a0-people-things",
    title: "People and Things",
    goal: "person اور چیز کے naamwoorden سمجھنا۔",
    practice: "man, vrouw, kind, boek, pen, huis جیسے words sentence میں دیکھیں۔",
    lessonIds: ["a0-people-nouns", "a0-things-nouns"]
  },
  {
    id: "a0-tiny-grammar",
    title: "Tiny Grammar",
    goal: "een, de, het اور ben/bent/is کو بہت آہستہ سمجھنا۔",
    practice: "دو یا تین words ملا کر mini sentences بنائیں۔",
    lessonIds: ["a0-een-de-het", "a0-ben-bent-is", "a0-first-sentences", "a0-hij-zij-wij"]
  },
  {
    id: "a0-place-movement",
    title: "Place and Movement",
    goal: "کہاں؟ کہاں جانا؟ in, op, onder, naar, met استعمال کرنا۔",
    practice: "place words اور movement verbs کو short phrases میں لگائیں۔",
    lessonIds: ["a0-place-1", "a0-place-2", "a0-gaan-komen", "a0-naar-met"]
  },
  {
    id: "a0-my-first-sentences",
    title: "My First Sentences",
    goal: "اپنے بارے میں سب سے پہلی Dutch باتیں کہنا۔",
    practice: "ik ben, ik heb, ik woon, ik begrijp het niet جیسے sentences۔",
    lessonIds: ["a0-hebben-1", "a0-geen", "a0-possessive", "a0-name-land-city", "a0-checkpoint"]
  }
];

const a1Subchapters = [
  {
    id: "a1-personal-info",
    title: "Myself and Personal Info",
    goal: "اپنا نام، address، phone number، country اور simple introduction دینا۔",
    practice: "form words اور short introduction sentences۔",
    lessonIds: ["a1-zero-tiny-words", "a1-zijn-first-sentences", "a1-greetings-personal-info"]
  },
  {
    id: "a1-family-people",
    title: "Family and People",
    goal: "family, people اور basic description کے words استعمال کرنا۔",
    practice: "dit is mijn..., ik heb..., hij/zij is... جیسے sentences۔",
    lessonIds: ["a1-people-family-articles", "a1-hebben-family"]
  },
  {
    id: "a1-daily-routine",
    title: "Daily Routine",
    goal: "آج، کل، وقت، کام، school اور simple routine بتانا۔",
    practice: "subject + verb + rest اور time words کے ساتھ sentence بنانا۔",
    lessonIds: ["a1-present-time"]
  },
  {
    id: "a1-questions-help",
    title: "Questions and Help",
    goal: "simple questions پوچھنا اور help/repetition مانگنا۔",
    practice: "waar, wat, wie, hoeveel اور yes/no questions۔",
    lessonIds: ["a1-questions"]
  },
  {
    id: "a1-home-objects",
    title: "Home and Objects",
    goal: "گھر، room، furniture اور چیز کہاں ہے بتانا۔",
    practice: "het boek is in huis جیسے place sentences۔",
    lessonIds: ["a1-house-food-plurals"]
  },
  {
    id: "a1-food-shopping",
    title: "Food and Shopping",
    goal: "basic food, prices, buying and asking how much۔",
    practice: "ik wil..., hoeveel kost...? جیسے daily phrases۔",
    lessonIds: ["a1-shopping-transport"]
  },
  {
    id: "a1-going-out-transport",
    title: "Going Out and Transport",
    goal: "station, bus, train, ticket, going somewhere۔",
    practice: "ik ga naar het station جیسے movement sentences۔",
    lessonIds: ["a1-shopping-transport"]
  },
  {
    id: "a1-body-health",
    title: "Body and Health",
    goal: "body/health words، pain، sick، doctor appointment۔",
    practice: "ik ben ziek، ik wil een afspraak maken، mijn hoofd doet pijn۔",
    lessonIds: ["a1-health-appointments"]
  }
];

const a2Subchapters = [
  {
    id: "a2-past-plans",
    title: "Past and Plans",
    goal: "کیا ہوا، کیا ہونے والا ہے، and simple planning۔",
    practice: "perfect tense، gaan future، modal verbs۔",
    lessonIds: ["a2-perfect-tense", "a2-future-modal-verbs"]
  },
  {
    id: "a2-routine-word-order",
    title: "Routine and Word Order",
    goal: "daily actions، separable verbs، because/if clauses۔",
    practice: "opstaan, invullen, omdat, dat, als۔",
    lessonIds: ["a2-separable-verbs-routine", "a2-word-order-connectors"]
  },
  {
    id: "a2-gemeente-forms",
    title: "Gemeente and Forms",
    goal: "gemeente, BSN, afspraak, formulier, documents سمجھنا۔",
    practice: "information ask کرنا، form language، official appointment۔",
    lessonIds: ["a2-gemeente-official"]
  },
  {
    id: "a2-work-school",
    title: "Work and School",
    goal: "work/school messages، absence، colleague/docent، schedule۔",
    practice: "mijn zoon kan vandaag niet komen جیسے messages۔",
    lessonIds: ["a2-work-school"]
  },
  {
    id: "a2-health-doctor",
    title: "Health and Doctor",
    goal: "complaint explain کرنا، doctor advice سمجھنا۔",
    practice: "ik heb pijn..., de dokter heeft gezegd...۔",
    lessonIds: ["a2-health-housing", "a2-strong-combined"]
  },
  {
    id: "a2-housing-problems",
    title: "Housing Problems",
    goal: "rent, heating, leakage, repair, landlord problems۔",
    practice: "mijn verwarming doet het niet، kunt u iemand sturen؟",
    lessonIds: ["a2-health-housing"]
  },
  {
    id: "a2-shopping-complaints",
    title: "Shopping and Complaints",
    goal: "ruilen، garantie، kapot، klacht، aanbieding۔",
    practice: "ik wil hem ruilen، hij is kapot۔",
    lessonIds: ["a2-shopping-services"]
  },
  {
    id: "a2-messages-emails",
    title: "Short Messages and Emails",
    goal: "formal/informal messages، invitation، complaint، polite ending۔",
    practice: "beste..., met vriendelijke groet, kom je ook؟",
    lessonIds: ["a2-writing-messages"]
  }
];

window.NEDERURDU_CHAPTERS = [
  {
    id: "a0",
    title: "Chapter A0",
    subtitle: "Letters, words, tiny grammar, and first sentences",
    lessons: a0Lessons,
    subchapters: a0Subchapters
  },
  {
    id: "a1",
    title: "Chapter A1",
    subtitle: "Simple communication in daily situations",
    lessons: a1Lessons,
    subchapters: a1Subchapters
  },
  {
    id: "a2",
    title: "Chapter A2",
    subtitle: "Practical daily Dutch and inburgering situations",
    lessons: a2Lessons,
    subchapters: a2Subchapters
  }
];

window.NEDERURDU_LESSONS = a0Lessons;
