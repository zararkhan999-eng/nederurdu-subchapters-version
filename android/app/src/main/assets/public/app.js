const STORAGE_KEY = "nederurdu-progress-v3";
const launchScreen = document.querySelector(".launch-screen");

window.setTimeout(() => {
  document.body.classList.remove("launching");
  launchScreen?.remove();
}, 4200);

const chapters = window.NEDERURDU_CHAPTERS || [
  {
    id: "a0",
    title: "باب A0",
    subtitle: "حروف، الفاظ، چھوٹی گرامر، اور پہلے Nederlands جملے",
    lessons: window.NEDERURDU_LESSONS || []
  }
];
const dutchLetters = [
  { letter: "a", speak: "a", sound: "آ", word: "appel", meaning: "سیب" },
  { letter: "b", speak: "b", sound: "بے", word: "boek", meaning: "کتاب" },
  { letter: "c", speak: "c", sound: "سے", word: "cadeau", meaning: "تحفہ" },
  { letter: "d", speak: "d", sound: "دے", word: "deur", meaning: "دروازہ" },
  { letter: "e", speak: "e", sound: "اے", word: "een", meaning: "ایک" },
  { letter: "f", speak: "f", sound: "اِف", word: "fiets", meaning: "سائیکل" },
  { letter: "g", speak: "g", sound: "خے / گلے سے", word: "goed", meaning: "اچھا" },
  { letter: "h", speak: "h", sound: "ہا", word: "huis", meaning: "گھر" },
  { letter: "i", speak: "i", sound: "ای", word: "ik", meaning: "میں" },
  { letter: "j", speak: "j", sound: "یے", word: "ja", meaning: "ہاں" },
  { letter: "k", speak: "k", sound: "کا", word: "kat", meaning: "بلی" },
  { letter: "l", speak: "l", sound: "ایل", word: "lamp", meaning: "بتی" },
  { letter: "m", speak: "m", sound: "ایم", word: "man", meaning: "آدمی" },
  { letter: "n", speak: "n", sound: "این", word: "nee", meaning: "نہیں" },
  { letter: "o", speak: "o", sound: "او", word: "oog", meaning: "آنکھ" },
  { letter: "p", speak: "p", sound: "پے", word: "pen", meaning: "قلم" },
  { letter: "q", speak: "q", sound: "کو", word: "quiz", meaning: "کوئز" },
  { letter: "r", speak: "r", sound: "ایر", word: "rijst", meaning: "چاول" },
  { letter: "s", speak: "s", sound: "ایس", word: "stoel", meaning: "کرسی" },
  { letter: "t", speak: "t", sound: "تے", word: "tafel", meaning: "میز" },
  { letter: "u", speak: "u", sound: "او / اُ", word: "uur", meaning: "گھنٹہ" },
  { letter: "v", speak: "v", sound: "وے", word: "vrouw", meaning: "عورت" },
  { letter: "w", speak: "w", sound: "وے", word: "water", meaning: "پانی" },
  { letter: "x", speak: "x", sound: "اِکس", word: "taxi", meaning: "ٹیکسی" },
  { letter: "y", speak: "y", sound: "خریکسے ای", word: "yoga", meaning: "یوگا" },
  { letter: "z", speak: "z", sound: "زیت", word: "zus", meaning: "بہن" }
];

const beginnerSupport = {
  a: { soundHint: "آ", meaning: "حرف a" },
  b: { soundHint: "بے", meaning: "حرف b" },
  c: { soundHint: "سے", meaning: "حرف c" },
  d: { soundHint: "دے", meaning: "حرف d" },
  e: { soundHint: "اے", meaning: "حرف e" },
  f: { soundHint: "اِف", meaning: "حرف f" },
  g: { soundHint: "خے", meaning: "حرف g" },
  h: { soundHint: "ہا", meaning: "حرف h" },
  i: { soundHint: "ای", meaning: "حرف i" },
  j: { soundHint: "یے", meaning: "حرف j" },
  k: { soundHint: "کا", meaning: "حرف k" },
  l: { soundHint: "ایل", meaning: "حرف l" },
  m: { soundHint: "ایم", meaning: "حرف m" },
  n: { soundHint: "این", meaning: "حرف n" },
  o: { soundHint: "او", meaning: "حرف o" },
  p: { soundHint: "پے", meaning: "حرف p" },
  q: { soundHint: "کو", meaning: "حرف q" },
  r: { soundHint: "ایر", meaning: "حرف r" },
  s: { soundHint: "ایس", meaning: "حرف s" },
  t: { soundHint: "تے", meaning: "حرف t" },
  u: { soundHint: "او", meaning: "حرف u" },
  v: { soundHint: "وے", meaning: "حرف v" },
  w: { soundHint: "وے", meaning: "حرف w" },
  x: { soundHint: "اِکس", meaning: "حرف x" },
  y: { soundHint: "خریکسے ای", meaning: "حرف y" },
  z: { soundHint: "زیت", meaning: "حرف z" },
  appel: { soundHint: "آ پَل", meaning: "سیب" },
  boek: { soundHint: "بوک", meaning: "کتاب" },
  deur: { soundHint: "دُر", meaning: "دروازہ" },
  fiets: { soundHint: "فیتس", meaning: "سائیکل" },
  huis: { soundHint: "ہاؤس", meaning: "گھر" },
  ik: { soundHint: "اِک", meaning: "میں" },
  ja: { soundHint: "یا", meaning: "ہاں" },
  kat: { soundHint: "کات", meaning: "بلی" },
  man: { soundHint: "مان", meaning: "آدمی" },
  nee: { soundHint: "نے", meaning: "نہیں" },
  oog: { soundHint: "اوخ", meaning: "آنکھ" },
  pen: { soundHint: "پین", meaning: "قلم" },
  stoel: { soundHint: "ستول", meaning: "کرسی" },
  tafel: { soundHint: "تافل", meaning: "میز" },
  water: { soundHint: "واٹر", meaning: "پانی" },
  vrouw: { soundHint: "فراؤ", meaning: "عورت" },
  zus: { soundHint: "زُس", meaning: "بہن" }
};

const visualLibrary = {
  letters: {
    src: "assets/visuals/letters-first-words.svg",
    alt: "Nederlands حروف اور پہلے الفاظ"
  },
  people: {
    src: "assets/visuals/people-family.svg",
    alt: "لوگ اور خاندان کے الفاظ"
  },
  home: {
    src: "assets/visuals/home-place.svg",
    alt: "گھر کی چیزیں اور جگہ والے الفاظ"
  },
  transport: {
    src: "assets/visuals/transport-routine.svg",
    alt: "روزمرہ سفر اور باہر جانا"
  },
  health: {
    src: "assets/visuals/body-health.svg",
    alt: "جسم اور صحت کے الفاظ"
  },
  services: {
    src: "assets/visuals/daily-services.svg",
    alt: "ملاقات کے وقت، فارم، کام، اسکول، اور خریداری"
  },
  sentence: {
    src: "assets/visuals/sentence-practice.svg",
    alt: "Nederlands جملہ بنانے کی مشق"
  }
};

const wordVisualEntries = window.NEDERURDU_WORD_VISUALS || [];
const inferWordVisualId = (entry) => entry.id || String(entry.src || "")
  .split("/")
  .pop()
  .replace(/\.[^.]+$/, "");
const wordVisualById = new Map(wordVisualEntries.map((entry) => [inferWordVisualId(entry), entry]));

const wordHelpGlossary = {
  aan: "پر / شروع",
  aanbieden: "پیش کرنا",
  aanbieding: "رعایت / aanbieding",
  afspraak: "ملاقات کا وقت",
  adres: "پتہ",
  apotheek: "دواخانہ",
  appel: "سیب",
  aanvragen: "درخواست دینا",
  als: "اگر",
  alstublieft: "برائے مہربانی",
  achter: "پیچھے",
  badkamer: "غسل خانہ",
  baan: "نوکری",
  bellen: "فون کرنا",
  ben: "ہوں",
  bent: "ہو / ہیں",
  betalen: "پیسے دینا",
  begrijp: "سمجھتا / سمجھتی ہوں",
  boek: "کتاب",
  bsn: "Nederlands شہری نمبر",
  cadeau: "تحفہ",
  collega: "کام کا ساتھی",
  contract: "معاہدہ",
  dank: "شکریہ",
  dat: "کہ",
  de: "اسم سے پہلے آنے والا لفظ",
  deur: "دروازہ",
  deze: "یہ",
  dit: "یہ",
  dokter: "ڈاکٹر",
  docent: "استاد",
  doet: "کرتا / کرتی ہے",
  een: "ایک",
  eten: "کھانا",
  fiets: "سائیکل",
  formulier: "فارم",
  ga: "جاتا / جاتی ہوں",
  gaan: "جانا",
  gegaan: "گیا / گئی",
  gaat: "جاتا / جاتی ہے",
  gemeente: "بلدیہ / gemeente دفتر",
  gisteren: "گزرا ہوا کل",
  goed: "اچھا",
  goedemiddag: "دوپہر کا سلام",
  goedemorgen: "صبح کا سلام",
  goedenavond: "شام کا سلام",
  garantie: "گارنٹی",
  gekocht: "خریدا",
  gehad: "تھا / پاس تھا",
  gewerkt: "کام کیا",
  gekookt: "کھانا پکایا",
  gekomen: "آیا / آئی",
  gebleven: "رہا / رہی",
  gezegd: "کہا",
  graag: "مہربانی سے / خوشی سے",
  groet: "سلام",
  had: "تھا / تھی",
  haar: "اس عورت کا",
  heb: "میرے پاس ہے",
  hebt: "تمہارے پاس ہے",
  hebben: "پاس ہونا / رکھنا",
  heeft: "اس کے پاس ہے",
  helpen: "مدد کرنا",
  herhalen: "دہرانا",
  het: "اسم سے پہلے آنے والا لفظ / یہ",
  hij: "وہ مرد",
  hoi: "سلام",
  huisarts: "گھر کا ڈاکٹر",
  huis: "گھر",
  huiswerk: "گھر کا کام",
  huur: "کرایہ",
  ik: "میں",
  in: "میں",
  inschrijven: "نام لکھوانا",
  is: "ہے",
  ja: "ہاں",
  jij: "تم غیر رسمی",
  jongen: "لڑکا",
  jouw: "تمہارا",
  kan: "کر سکتا / سکتی ہے",
  kapot: "خراب",
  kat: "بلی",
  kind: "بچہ",
  kom: "آتا / آتی ہوں",
  koken: "کھانا پکانا",
  komt: "آتا / آتی ہے",
  kunt: "کر سکتے ہیں",
  lamp: "بتی",
  land: "ملک",
  langzaam: "آہستہ",
  leren: "سیکھنا",
  lekkage: "پانی کا رساؤ",
  maken: "بنانا / کرنا",
  man: "آدمی",
  mag: "اجازت ہے",
  meisje: "لڑکی",
  met: "ساتھ",
  mijn: "میرا",
  morgen: "آنے والا کل / صبح",
  moet: "ضروری ہے",
  moeten: "ضروری ہونا",
  mogen: "اجازت ہونا",
  naar: "کی طرف / کو",
  naam: "نام",
  naast: "ساتھ / برابر میں",
  nee: "نہیں",
  nemen: "لینا",
  niet: "نہیں",
  oog: "آنکھ",
  ochtend: "صبح",
  omdat: "کیونکہ",
  onder: "نیچے",
  op: "پر / اوپر",
  opbellen: "فون کرنا",
  opstaan: "اٹھنا",
  overstappen: "بدلنا / دوسری سواری لینا",
  ov: "عام سفر کی سواری",
  paspoort: "پاسپورٹ",
  pen: "قلم",
  pijn: "درد",
  reparatie: "مرمت",
  rijst: "چاول",
  rust: "آرام",
  ruilen: "بدلنا / واپس کرنا",
  salaris: "تنخواہ",
  schoonmaken: "صفائی کرنا",
  school: "اسکول",
  sollicitatie: "نوکری کی درخواست",
  sta: "اٹھتا / کھڑا ہوتا ہوں",
  stad: "شہر",
  station: "اسٹیشن",
  stoel: "کرسی",
  supermarkt: "سپر مارکیٹ",
  tafel: "میز",
  taxi: "ٹیکسی",
  telefoon: "فون",
  telefoonnummer: "فون نمبر",
  tot: "تک",
  trein: "ٹرین",
  terugkomen: "واپس آنا",
  u: "آپ رسمی",
  uit: "سے / باہر",
  uur: "گھنٹہ / وقت",
  vertraging: "دیر",
  verzekering: "انشورنس",
  verwarming: "ہیٹنگ",
  vandaag: "آج",
  voor: "سامنے / پہلے",
  vriendelijke: "محترمانہ / دوستانہ",
  vrouw: "عورت",
  water: "پانی",
  weg: "ختم / دور",
  wel: "زور دینے والا لفظ",
  werk: "کام",
  werken: "کام کرنا",
  wij: "ہم",
  wil: "چاہتا / چاہتی ہوں",
  willen: "چاہنا",
  woon: "رہتا / رہتی ہوں",
  woont: "رہتے / رہتی ہیں",
  wonen: "رہنا",
  yoga: "yoga",
  ziek: "بیمار",
  ziekenhuis: "ہسپتال",
  zijn: "اس کا / ہونا",
  zij: "وہ عورت / وہ لوگ",
  ziens: "دیکھنا",
  zus: "بہن"
};

const LESSON_QUESTION_LIMIT = 20;
const REVIEW_QUESTION_LIMIT = 20;
const SPEECH_PROFILE_VERSION = 2;

const defaultProgress = {
  completedLessons: [],
  scores: {},
  seenQuestionIds: [],
  missionVariantRuns: {},
  skillAttempts: {},
  totalXp: 0,
  practiceDays: [],
  mistakes: [],
  settings: {
    soundEffects: true,
    pronunciation: true,
    beginnerMode: true,
    largeText: false,
    slowAudio: false,
    extraUrduHelp: true
  },
  speechProfileVersion: SPEECH_PROFILE_VERSION,
  selectedChapterId: "a0",
  lastLessonId: "a0-letters-1"
};

let progress = loadProgress();
let selectedChapterId = progress.selectedChapterId || chapters[0].id;
let screen = "home";
let activeLessonId = progress.lastLessonId || getCurrentLessons()[0].id;
let previewLessonId = activeLessonId;
let activeQuestionIndex = 0;
let selectedAnswer = "";
let checked = false;
let lessonResult = null;
let sessionAnswers = [];
let sessionQuestions = [];
let lessonProgressSteps = 0;
let activeWordHelp = null;
let buildAnswerIds = [];
let hintOpen = false;
let audioContext = null;
let activeReview = null;
let pathCardLessonId = "";
let pathExpanded = false;
let lastRenderedScreen = "";
let audioSkipped = false;
let matchSelection = null;
let matchedPairIds = [];
let matchPairError = "";
let typedAnswer = "";
let typedFallback = false;
let preferredDutchVoice = null;

function loadProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const storedSettings = stored?.settings || {};
    const needsSpeechMigration = stored?.speechProfileVersion !== SPEECH_PROFILE_VERSION;
    return {
      ...defaultProgress,
      ...stored,
      speechProfileVersion: SPEECH_PROFILE_VERSION,
      settings: {
        ...defaultProgress.settings,
        ...storedSettings,
        slowAudio: needsSpeechMigration ? false : Boolean(storedSettings.slowAudio)
      }
    };
  } catch {
    return { ...defaultProgress };
  }
}

function saveProgress(nextProgress = progress) {
  progress = nextProgress;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getLesson(id) {
  return getAllLessons().find((lesson) => lesson.id === id) || getCurrentLessons()[0] || getAllLessons()[0];
}

function getAllLessons() {
  return chapters.flatMap((chapter) => chapter.lessons);
}

function getSelectedChapter() {
  return chapters.find((chapter) => chapter.id === selectedChapterId) || chapters[0];
}

function getCurrentLessons() {
  return getSelectedChapter().lessons;
}

function getChapterForLesson(id) {
  return chapters.find((chapter) => chapter.lessons.some((lesson) => lesson.id === id)) || getSelectedChapter();
}

function isLessonUnlocked(index) {
  return true;
}

function completedCount() {
  return getCurrentLessons().filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
}

function isBeginnerFirstHome() {
  return Boolean(progress.settings.beginnerMode) && !(progress.completedLessons || []).length;
}

function chapterCompletedCount(chapter) {
  return chapter.lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
}

function subchapterLessons(subchapter) {
  return subchapter.lessonIds.map((id) => getLesson(id)).filter(Boolean);
}

function subchapterCompletedCount(subchapter) {
  return subchapterLessons(subchapter).filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
}

function completedLessonsInOrder() {
  return progress.completedLessons.map((id) => getLesson(id)).filter(Boolean);
}

function getNextLessonForChapter(chapter = getSelectedChapter()) {
  return chapter.lessons.find((lesson) => !progress.completedLessons.includes(lesson.id)) || chapter.lessons[0];
}

function getLessonIndexInChapter(lessonId, chapter = getSelectedChapter()) {
  return chapter.lessons.findIndex((lesson) => lesson.id === lessonId);
}

function getReviewConfig(kind) {
  if (kind === "mistakes") {
    const questions = getMistakeReviewQuestions();
    return {
      title: "غلطیوں کی مشق",
      unit: "دہرائی",
      description: "جن سوالات میں پہلے غلطی ہوئی تھی، وہ دوبارہ آئیں گے۔",
      empty: "ابھی غلطی نہیں",
      questions
    };
  }

  if (kind === "old") {
    const questions = getOldLessonReviewQuestions();
    return {
      title: "پرانا سبق",
      unit: "دہرائی",
      description: "پہلے مکمل کیے ہوئے سبق سے چند سوالات دوبارہ کریں۔",
      empty: "پہلے سبق مکمل کریں",
      questions
    };
  }

  const questions = getTodayReviewQuestions();
  return {
    title: "آج کی مشق",
    unit: "دہرائی",
    description: "آج کے لیے چھوٹی سی ملی جلی دہرائی۔",
    empty: "سبق شروع کریں",
    questions
  };
}

function getTodayReviewQuestions() {
  const completed = completedLessonsInOrder();
  const sourceLessons = completed.length
    ? completed.slice(-3).reverse()
    : [getLesson(progress.lastLessonId || getNextLessonForChapter().id)];
  return pickReviewQuestions(sourceLessons);
}

function getOldLessonReviewQuestions() {
  const completed = completedLessonsInOrder();
  const olderLessons = completed.filter((lesson) => lesson.id !== progress.lastLessonId);
  return pickReviewQuestions(olderLessons.length ? olderLessons : completed);
}

function getMistakeReviewQuestions() {
  const seen = new Set();
  const questions = [];
  for (const mistake of [...progress.mistakes].reverse()) {
    const key = mistakeKey(mistake);
    if (seen.has(key)) continue;
    const question = findQuestionForMistake(mistake);
    if (!question) continue;
    seen.add(key);
    questions.push({ ...cloneQuestion(question), mistakeOrigin: { ...mistake } });
    if (questions.length >= REVIEW_QUESTION_LIMIT) break;
  }
  return questions;
}

function pickReviewQuestions(lessons) {
  const questions = lessons.flatMap((lesson) => lesson.questions.filter((question) => !isInfoQuestion(question)).map(cloneQuestion));
  return shuffleArray(questions).slice(0, REVIEW_QUESTION_LIMIT);
}

function cloneQuestion(question) {
  return {
    ...question,
    options: question.options ? [...question.options] : undefined,
    tiles: question.tiles ? [...question.tiles] : undefined
  };
}

function findQuestionForMistake(mistake) {
  const lesson = getLesson(mistake.lessonId);
  if (mistake.skillId) {
    const alternate = getAllLessons()
      .flatMap((item) => item.questions)
      .find((question) => question.skillId === mistake.skillId && question.id !== mistake.questionId && !isInfoQuestion(question));
    if (alternate) return alternate;
  }
  if (mistake.questionId) {
    const exactQuestion = lesson.questions.find((question) => question.id === mistake.questionId);
    if (exactQuestion) return exactQuestion;
  }
  return lesson.questions.find((question) => (
    question.prompt === mistake.prompt && question.answer === mistake.answer
  ));
}

function mistakeKey(item) {
  if (item.questionId) return `${item.lessonId || ""}|${item.questionId}`;
  return `${item.lessonId || ""}|${item.prompt}|${item.answer}`;
}

function getActiveLesson() {
  return activeReview || getLesson(activeLessonId);
}

function render() {
  const app = document.querySelector("#app");
  applyDisplaySettings();
  const screenChanged = screen !== lastRenderedScreen;
  app.classList.toggle("screen-changing", screenChanged);
  try {
    app.innerHTML = `
      ${screen === "home" ? renderHome() : ""}
      ${screen === "preview" ? renderLessonPreview() : ""}
      ${screen === "lesson" ? renderLesson() : ""}
      ${screen === "complete" ? renderComplete() : ""}
      ${screen === "practice" ? renderPracticeScreen() : ""}
      ${screen === "letters" ? renderLetters() : ""}
      ${screen === "settings" ? renderSettings() : ""}
      ${renderBottomNav()}
    `;
  } catch (error) {
    console.error("NederUrdu render failed", error);
    screen = "home";
    activeReview = null;
    app.innerHTML = `
      ${renderTopbar()}
      <section class="state-panel">
        <h1>سبق کھل نہیں سکا</h1>
        <p class="lead">براہ کرم دوبارہ کوشش کریں۔</p>
        <button class="primary-button" data-action="home">گھر جائیں</button>
      </section>
      ${renderBottomNav()}
    `;
  }
  bindEvents();
  lastRenderedScreen = screen;
}

function applyDisplaySettings() {
  document.body.classList.toggle("large-text", Boolean(progress.settings.largeText));
}

function renderTopbar() {
  return renderProgressHeader();
}

function renderIcon(name, className = "") {
  const paths = {
    book: '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H12v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H12v17h4.5A3.5 3.5 0 0 1 20 22V5.5Z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    play: '<path d="m9 6 9 6-9 6V6Z"/>',
    notebook: '<path d="M6 3h12a2 2 0 0 1 2 2v16H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M8 3v18M11 8h6M11 12h6M11 16h4"/>',
    dumbbell: '<path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    speaker: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/>',
    alphabet: '<path d="M4 20 9 4l5 16M6 14h6M15 8h5M17.5 5.5v5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    mistake: '<path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v4M12 17h.01"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m4 17 5-5 4 4 2-2 5 4"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1"/>',
    chevron: '<path d="m7 9 5 5 5-5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    spark: '<path d="m12 3 1.35 4.15L17.5 8.5l-4.15 1.35L12 14l-1.35-4.15L6.5 8.5l4.15-1.35L12 3Z"/><path d="m18 14 .75 2.25L21 17l-2.25.75L18 20l-.75-2.25L15 17l2.25-.75L18 14Z"/>',
    flag: '<path d="M5 21V4M5 5h11l-2 3 2 3H5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/>'
  };
  return `<svg class="ui-icon ${className}" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.book}</svg>`;
}

function renderProgressHeader() {
  const activeDays = progress.practiceDays.length;
  return `
    <header class="progress-header" aria-label="زبان">
      <div class="brand-lockup">
        <img class="header-logo" src="icon.svg" alt="" />
        <span class="brand-lockup-copy">
          <strong class="latin">NederUrdu</strong>
          <small>اردو سے Nederlands تک</small>
        </span>
      </div>
      <div class="header-journey" aria-label="سیکھنے کی زبانیں">
        <span class="journey-language"><b>اردو</b><small>سمجھیں</small></span>
        <span class="journey-line" aria-hidden="true"><i></i></span>
        <span class="journey-language latin"><b>NL</b><small>Nederlands</small></span>
      </div>
      <div class="header-days" title="مشق کے دن">
        ${renderIcon("calendar")}
        <span><strong class="latin">${activeDays}</strong><small>دن</small></span>
      </div>
    </header>
  `;
}

function renderHome() {
  const chapter = getSelectedChapter();
  const nextLesson = getNextLessonForChapter(chapter);
  const completed = chapterCompletedCount(chapter);
  const total = chapter.lessons.length || 1;
  const chapterPercent = Math.round((completed / total) * 100);
  const beginnerFirstHome = isBeginnerFirstHome();
  const dailyVisual = getVisualForLesson(nextLesson);
  activeLessonId = nextLesson.id;

  return `
    <main class="learn-screen ${beginnerFirstHome ? "beginner-home" : ""}">
      ${renderProgressHeader()}
      <aside class="home-rail">
        <section class="today-panel">
          <div class="mission-topline">
            <span class="eyeline">${beginnerFirstHome ? "آپ کا پہلا قدم" : "آج کی سمت"}</span>
            <span class="mission-level latin">${chapter.id.toUpperCase()} · ${String(getLessonIndexInChapter(nextLesson.id, chapter) + 1).padStart(2, "0")}</span>
          </div>
          <div class="today-main">
            <div class="today-copy">
              <h1>${getShortLessonTitle(nextLesson)}</h1>
              <p>${beginnerFirstHome ? "آواز سنیں، لفظ پہچانیں، اور اپنا پہلا Nederlands جملہ بنائیں۔" : nextLesson.description}</p>
              <div class="mission-details">
                <span>${renderIcon("spark")}<b class="latin">20</b> چھوٹے قدم</span>
                <span>${renderIcon("speaker")} آواز کے ساتھ</span>
              </div>
            </div>
            <div class="mission-art" aria-hidden="true">
              ${renderVisual(dailyVisual, "mission-visual")}
              <span class="mission-art-seal">${renderIcon("flag")}</span>
            </div>
          </div>
          <button class="primary-button today-action" data-action="start" data-lesson="${nextLesson.id}">
            <span class="button-icon">${renderIcon("play")}</span>
            <span>${beginnerFirstHome ? "پہلا سبق شروع کریں" : "سبق جاری رکھیں"}</span>
            <span class="button-progress latin">${chapterPercent}%</span>
          </button>
          ${beginnerFirstHome ? "" : `<div class="today-stats">
            <span><strong class="latin">${completed}/${total}</strong><small>مکمل</small></span>
            <span><strong class="latin">${progress.totalXp}</strong><small>پوائنٹس</small></span>
            <span><strong class="latin">${progress.practiceDays.length}</strong><small>مشق کے دن</small></span>
          </div>`}
        </section>
        <div class="rail-note">
          <span>${renderIcon("spark")}</span>
          <p><strong>روز تھوڑا، مگر مسلسل</strong><small>ایک سبق تقریباً پانچ منٹ میں مکمل ہوتا ہے۔</small></p>
        </div>
      </aside>
      <div class="home-world">
        <div class="world-sky" aria-hidden="true">
          <span class="cloud cloud-one"></span>
          <span class="cloud cloud-two"></span>
          <span class="hill hill-one"></span>
          <span class="hill hill-two"></span>
        </div>
        ${renderChapterSwitcher()}
        ${renderUnitCard(chapter, nextLesson)}
        ${renderLessonPath(chapter, nextLesson)}
      </div>
    </main>
  `;
}

function renderChapterSwitcher() {
  return `<div class="chapter-switcher-wrap"><div class="chapter-switcher-label"><span>اپنی سطح</span><small>ایک راستہ منتخب کریں</small></div><div class="chapter-switcher" aria-label="باب منتخب کریں">${chapters.map((chapter) => `
    <button class="chapter-chip ${chapter.id === selectedChapterId ? "active" : ""}" data-action="chapter" data-chapter="${chapter.id}">
      <strong class="latin">${chapter.id.toUpperCase()}</strong>
      <small class="latin">${chapterCompletedCount(chapter)}/${chapter.lessons.length}</small>
    </button>
  `).join("")}</div></div>`;
}

function getSubchapterForLesson(chapter, lessonId) {
  return chapter.subchapters?.find((item) => item.lessonIds.includes(lessonId)) || chapter.subchapters?.[0];
}

function renderUnitCard(chapter, nextLesson) {
  const section = getSubchapterForLesson(chapter, nextLesson.id);
  const completed = chapterCompletedCount(chapter);
  const percent = Math.round((completed / Math.max(1, chapter.lessons.length)) * 100);
  const visual = getVisualForSubchapter(section || { id: chapter.id, title: chapter.title, goal: chapter.subtitle, practice: "" }, nextLesson);
  return `
    <button class="unit-card chapter-${chapter.id}" data-action="preview" data-lesson="${nextLesson.id}">
      <span class="unit-card-visual">${renderVisual(visual, "unit-visual")}</span>
      <span class="unit-card-copy">
        <small><b class="latin">${chapter.id.toUpperCase()}</b>${chapter.title}</small>
        <strong>${section?.title || nextLesson.unit}</strong>
        <span>${section?.goal || nextLesson.description}</span>
        <span class="unit-card-footer"><span class="unit-card-meter" aria-hidden="true"><i style="width:${percent}%"></i></span><b class="latin">${percent}%</b></span>
      </span>
      <span class="unit-card-arrow" aria-hidden="true">${renderIcon("arrow")}</span>
    </button>
  `;
}

function renderLessonPath(chapter, nextLesson) {
  const groups = chapter.subchapters?.length
    ? chapter.subchapters.map((section) => ({ section, lessons: subchapterLessons(section) }))
    : [{ section: { title: chapter.title }, lessons: chapter.lessons }];
  const focusLessonId = pathCardLessonId || nextLesson.id;
  const focusGroupIndex = Math.max(0, groups.findIndex(({ lessons }) => lessons.some((lesson) => lesson.id === focusLessonId)));
  const visibleGroups = pathExpanded
    ? groups.map((group, index) => ({ ...group, index }))
    : groups.map((group, index) => ({ ...group, index })).filter(({ index }) => index < 2 || index === focusGroupIndex);
  const hiddenGroupCount = groups.length - visibleGroups.length;
  const remainingLessons = Math.max(0, chapter.lessons.length - chapterCompletedCount(chapter));
  let pathIndex = 0;
  return `<section class="lesson-path path-stage" aria-label="سبق کا راستہ">
    <div class="path-overview">
      <div><span class="path-kicker">آپ کا نقشہ</span><strong>${remainingLessons ? `${remainingLessons} سبق باقی` : "باب مکمل"}</strong><small>ہر قدم پچھلے سبق کو مضبوط کرتا ہے</small></div>
      <span class="path-overview-mark">${renderIcon(remainingLessons ? "book" : "check")}</span>
    </div>
    ${visibleGroups.map(({ section, lessons, index: sectionIndex }) => `
    <article class="path-section tone-${sectionIndex % 4}">
      ${renderLessonSectionDivider(section.title, sectionIndex, lessons)}
      <div class="path-group">${lessons.map((lesson, groupLessonIndex) => {
      const lessonIndex = chapter.lessons.findIndex((item) => item.id === lesson.id);
      const position = ["left", "center", "right", "center"][pathIndex % 4];
      pathIndex += 1;
      return renderLessonNode(lesson, lessonIndex, position, lesson.id === nextLesson.id, groupLessonIndex + 1);
      }).join("")}</div>
    </article>
    `).join("")}
    ${groups.length > 2 ? `<button class="path-toggle" data-action="toggle-path" aria-expanded="${pathExpanded}">
      <span>${pathExpanded ? "مختصر راستہ دکھائیں" : `پورا راستہ دیکھیں${hiddenGroupCount ? ` · ${hiddenGroupCount} حصے` : ""}`}</span>
      ${renderIcon("chevron")}
    </button>` : ""}
  </section>`;
}

function renderLessonSectionDivider(title, index, lessons) {
  const completed = lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
  const percent = Math.round((completed / Math.max(1, lessons.length)) * 100);
  return `
    <div class="section-divider">
      <span class="section-number latin">${String(index + 1).padStart(2, "0")}</span>
      <span class="section-copy"><small>حصہ ${index + 1}</small><strong>${title}</strong></span>
      <span class="section-status"><b class="latin">${completed}/${lessons.length}</b><span class="section-progress" aria-hidden="true"><i style="width:${percent}%"></i></span></span>
    </div>
  `;
}

function renderLessonNode(lesson, index, position, current, pathRow) {
  const completed = progress.completedLessons.includes(lesson.id);
  const locked = !isLessonUnlocked(index);
  const state = completed ? "completed" : current ? "current" : locked ? "locked" : "available";
  const selected = pathCardLessonId === lesson.id;
  const icon = completed ? "check" : locked ? "lock" : current ? "play" : "book";
  return `
    <div class="path-step ${position} ${selected ? "selected" : ""}" data-path-lesson="${lesson.id}" style="--path-row:${pathRow}">
      <button class="lesson-node ${state}" data-action="preview" data-lesson="${lesson.id}" ${locked ? "disabled" : ""} aria-label="${escapeAttr(lesson.title)}"><span class="lesson-node-index latin">${String(index + 1).padStart(2, "0")}</span><span class="lesson-node-icon">${renderIcon(icon)}</span></button>
      <div class="node-copy"><span>${completed ? "مکمل سبق" : current ? "ابھی سیکھیں" : locked ? "اگلا مرحلہ" : "دستیاب"}</span><strong>${getShortLessonTitle(lesson)}</strong><small>${getLessonRunCount(lesson)} سوال · ${lesson.xp || 0} پوائنٹس</small></div>
      <span class="node-trailing" aria-hidden="true">${locked ? renderIcon("lock") : renderIcon("arrow")}</span>
      ${selected ? renderLessonStartCard(lesson, index) : ""}
    </div>
  `;
}

function getShortLessonTitle(lesson) {
  return lesson.title.replace(/^A\d\s+les\s+\d+:\s*/i, "").replace(/^سبق\s+\d+:\s*/, "").replace(/^A\d\s*/, "").trim();
}

function renderLessonStartCard(lesson, index) {
  const done = progress.completedLessons.includes(lesson.id);
  return `
    <article class="lesson-start-card">
      <span class="lesson-card-pointer" aria-hidden="true"></span>
      <span class="lesson-card-kicker">منتخب سبق · <b class="latin">${String(index + 1).padStart(2, "0")}</b></span>
      <strong>${getShortLessonTitle(lesson)}</strong>
      <small>${getLessonRunCount(lesson)} سوال · آواز اور فوری مدد کے ساتھ</small>
      <button data-action="start" data-lesson="${lesson.id}"><span>${done ? "دوبارہ کریں" : "شروع کریں"}</span>${renderIcon("arrow")}</button>
    </article>
  `;
}

function renderJourneyPath(lessons, nextLesson) {
  const nextLessonIndex = Math.max(0, lessons.findIndex((lesson) => lesson.id === nextLesson.id));
  const startIndex = Math.max(0, nextLessonIndex - 1);
  const visibleLessons = lessons.slice(startIndex, startIndex + 5);
  const nodePositions = [
    { left: 78, top: 18 },
    { left: 42, top: 94 },
    { left: 68, top: 178 },
    { left: 34, top: 270 },
    { left: 56, top: 354 }
  ];

  return `
    <div class="journey-path" aria-label="سبق کا راستہ">
      <svg class="path-road" viewBox="0 0 360 440" preserveAspectRatio="none" aria-hidden="true">
        <path class="path-road-shadow" d="M284 20 C210 58 126 70 118 122 C107 196 282 174 268 248 C252 338 86 274 80 360 C76 415 164 424 236 392" />
        <path class="path-road-base" d="M284 20 C210 58 126 70 118 122 C107 196 282 174 268 248 C252 338 86 274 80 360 C76 415 164 424 236 392" />
        <path class="path-road-center" d="M284 20 C210 58 126 70 118 122 C107 196 282 174 268 248 C252 338 86 274 80 360 C76 415 164 424 236 392" />
      </svg>
      ${visibleLessons.map((lesson, index) => {
        const lessonIndex = startIndex + index;
        const done = progress.completedLessons.includes(lesson.id);
        const current = lesson.id === nextLesson.id;
        const locked = !isLessonUnlocked(lessonIndex);
        const node = nodePositions[index] || nodePositions[nodePositions.length - 1];
        return `
          <button class="path-node ${done ? "done" : ""} ${current ? "current" : ""} ${locked ? "locked" : ""}"
            data-action="preview"
            data-lesson="${lesson.id}"
            style="--node-left: ${node.left}%; --node-top: ${node.top}px">
            <span class="node-core">${done ? "✓" : lessonIndex + 1}</span>
            <span class="node-label">${lesson.unit}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function renderReviewLite() {
  const today = getReviewConfig("today");
  const mistakes = getReviewConfig("mistakes");
  const old = getReviewConfig("old");

  return `
    <section class="review-panel" aria-label="دہرائی">
      <div class="review-heading">
        <h2>آج کی دہرائی</h2>
        <span>${today.questions.length || 0} سوالات</span>
      </div>
      <div class="review-grid">
        ${renderReviewCard("today", today)}
        ${renderReviewCard("mistakes", mistakes)}
        ${renderReviewCard("old", old)}
      </div>
    </section>
  `;
}

function renderReviewCard(kind, config) {
  const disabled = !config.questions.length;
  return `
    <button class="review-card ${disabled ? "disabled" : ""}" data-action="review" data-review-kind="${kind}" ${disabled ? "disabled" : ""}>
      <strong>${config.title}</strong>
      <span>${disabled ? config.empty : `${config.questions.length} سوالات`}</span>
    </button>
  `;
}

function renderChapterButton(chapter) {
  const completed = chapterCompletedCount(chapter);
  const active = chapter.id === selectedChapterId;
  return `
    <button class="chapter-button ${active ? "active" : ""}" data-action="chapter" data-chapter="${chapter.id}">
      <span class="chapter-name">${chapter.title}</span>
      <span class="chapter-subtitle">${chapter.subtitle}</span>
      <span class="chapter-count">${completed}/${chapter.lessons.length}</span>
    </button>
  `;
}

function renderSubchapters(chapter) {
  if (!chapter.subchapters || !chapter.subchapters.length) {
    return `<div class="unit-list">${chapter.lessons.map(renderUnitRow).join("")}</div>`;
  }

  return `
    <div class="subchapter-list">
      ${chapter.subchapters.map((subchapter, index) => renderSubchapterCard(subchapter, index)).join("")}
    </div>
  `;
}

function renderSubchapterCard(subchapter, index) {
  const lessons = subchapterLessons(subchapter);
  const completed = subchapterCompletedCount(subchapter);
  const percent = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;
  const firstUnlockedLesson = lessons.find((lesson) => !progress.completedLessons.includes(lesson.id)) || lessons[0];
  const visual = getVisualForSubchapter(subchapter, firstUnlockedLesson);
  const openButton = firstUnlockedLesson
    ? `<button class="secondary-button" data-action="preview" data-lesson="${firstUnlockedLesson.id}">مزید دیکھیں</button>`
    : "";

  return `
    <article class="subchapter-card">
      ${renderVisual(visual, "subchapter-visual")}
      <div class="subchapter-top">
        <span class="subchapter-number latin">${index + 1}</span>
        <span class="subchapter-meter">
          <span class="progress-track"><span class="progress-fill" style="width: ${percent}%"></span></span>
          <b class="latin">${completed}/${lessons.length}</b>
        </span>
      </div>
      <h3>${subchapter.title}</h3>
      <p>${subchapter.goal}</p>
      <div class="subchapter-practice">${subchapter.practice}</div>
      ${openButton}
      <div class="unit-list compact">
        ${lessons.map((lesson) => {
          const lessonIndex = getCurrentLessons().findIndex((item) => item.id === lesson.id);
          return renderUnitRow(lesson, lessonIndex);
        }).join("")}
      </div>
    </article>
  `;
}

function renderUnitRow(lesson, index) {
  const locked = !isLessonUnlocked(index);
  const done = progress.completedLessons.includes(lesson.id);
  const icon = done ? "✓" : index + 1;
  return `
    <button class="unit-row ${locked ? "locked" : ""}" data-action="preview" data-lesson="${lesson.id}">
      <span class="unit-number">${icon}</span>
      <span>
        <strong class="unit-title">${lesson.unit}</strong>
        <p class="unit-meta">${getLessonRunCount(lesson)} سوالات · ${lesson.xp} پوائنٹس</p>
      </span>
      <span class="status-dot ${done ? "done" : ""}"></span>
    </button>
  `;
}

function renderLessonPreview() {
  return renderHome();
}

function renderLesson() {
  const lesson = getActiveLesson();
  const questions = sessionQuestions.length ? sessionQuestions : lesson.questions;
  const question = questions[activeQuestionIndex];
  if (!lesson || !question) return renderMissingLesson();
  const visual = getExerciseVisual(question, lesson);
  const percentage = Math.round(((activeQuestionIndex + (checked ? 1 : 0)) / questions.length) * 100);
  const infoStep = isInfoQuestion(question);
  const questionTheme = getQuestionTheme(question);

  return `
    <main class="quiz-screen ${questionTheme.className}">
      ${renderQuizTopBar(percentage, activeQuestionIndex + 1, questions.length)}
      <section class="quiz-content">
        <div class="question-meta">
          <span>${lesson.reviewKind ? "دہرائی" : getShortLessonTitle(lesson)}</span>
          <b class="latin">${percentage}%</b>
        </div>
        <div class="question-heading">
          <span class="question-kind-icon" aria-hidden="true">${renderIcon(questionTheme.icon)}</span>
          <h1 class="question-title">${getQuestionTitle(question)}</h1>
        </div>
        ${renderQuestionCard(question, visual)}
      </section>
      ${renderQuizFooter(question, infoStep)}
    </main>
  `;
}

function getQuestionTheme(question) {
  if (question.type === "listen-choice" || question.type === "speak-repeat" || question.mode === "listen-reply") {
    return { className: "question-audio", icon: "speaker" };
  }
  if (["build", "sequence", "fill-gap", "short-input"].includes(question.type)) {
    return { className: "question-build", icon: "notebook" };
  }
  if (question.type === "image-choice") return { className: "question-image", icon: "image" };
  if (question.type === "match-pairs") return { className: "question-match", icon: "link" };
  return { className: "question-choice", icon: "book" };
}

function renderQuizTopBar(percentage, current, total) {
  return `
    <header class="quiz-topbar">
      <button class="quiz-close" data-action="home" aria-label="سبق بند کریں">${renderIcon("close")}</button>
      <div class="quiz-progress" aria-label="${current} از ${total}"><span style="width:${percentage}%"></span></div>
      <span class="quiz-count latin">${current}/${total}</span>
    </header>
  `;
}

function getQuestionTitle(question) {
  if (progress.settings.beginnerMode) {
    if (isInfoQuestion(question)) return "دیکھیں اور سنیں";
    if (question.type === "listen-choice" || question.mode === "listen-reply" || question.mode === "dialogue") return "سنیں";
    if (question.type === "build" || question.type === "sequence" || question.type === "short-input") return "لفظ بنائیں";
    if (question.type === "speak-repeat") return "دہرائیں";
    return "صحیح جواب دبائیں";
  }
  if (isInfoQuestion(question)) return "پہلے یہ سمجھیں";
  if (question.mode === "listen-reply") return "سنیں اور جواب منتخب کریں";
  if (question.mode === "dialogue") return "گفتگو مکمل کریں";
  if (question.mode === "guided-recall") return "صحیح Nederlands منتخب کریں";
  if (question.type === "document-choice") return "معلومات دیکھ کر جواب دیں";
  if (question.type === "sequence") return "صحیح ترتیب بنائیں";
  if (question.type === "short-input") return "چھوٹا جواب لکھیں";
  if (question.type === "speak-repeat") return "سنیں اور دہرائیں";
  if (question.type === "listen-choice") return "آپ نے کیا سنا؟";
  if (question.type === "build") return "جملہ بنائیں";
  if (question.type === "fill-gap") return "خالی جگہ پُر کریں";
  if (question.type === "match-pairs") return "صحیح جوڑے ملائیں";
  if (question.type === "image-choice") return "صحیح لفظ منتخب کریں";
  if (question.type === "situation") return "صحیح جملہ منتخب کریں";
  if (question.type === "reverse") return "صحیح Nederlands منتخب کریں";
  return "صحیح ترجمہ منتخب کریں";
}

function renderQuestionCard(question, visual) {
  if (question.type === "speak-repeat") return renderSpeakRepeatQuestion(question);
  if (isInfoQuestion(question)) {
    return `
      <div class="teaching-card">
        ${renderVisual(visual, "quiz-visual teaching-visual")}
        <h2>${renderTextWithWordHelp(question.prompt, `prompt-${activeQuestionIndex}`)}</h2>
        ${renderPronunciationCards(question.supportWords)}
        ${renderUitlegExercise(question)}
      </div>
    `;
  }
  if (question.type === "listen-choice") return renderListeningQuestion(question);
  if (question.type === "document-choice") return renderDocumentQuestion(question);
  if (question.type === "short-input") return renderShortInputQuestion(question);
  if (question.type === "sequence") return renderSequenceQuestion(question);
  if (question.type === "build") return renderWordBankQuestion(question, visual);
  if (question.type === "match-pairs") return renderMatchPairsQuestion(question);
  return renderMultipleChoiceQuestion(question, visual);
}

function renderDocumentQuestion(question) {
  const document = question.document || {};
  return `
    <div class="document-question">
      <article class="practice-document latin" aria-label="${escapeAttr(document.title || "Nederlands document")}">
        <strong>${escapeHtml(document.title || "")}</strong>
        ${(document.rows || []).map((row) => `<div><span>${escapeHtml(row.label)}</span><b>${escapeHtml(row.value)}</b></div>`).join("")}
      </article>
      <p class="document-prompt">${escapeHtml(question.prompt)}</p>
      ${renderChoices(question)}
    </div>
  `;
}

function renderShortInputQuestion(question) {
  if (typedFallback) return `
    <div class="short-input-question">
      <p>${escapeHtml(question.prompt)}</p>
      ${renderBuildExercise(question)}
    </div>
  `;
  return `
    <div class="short-input-question">
      <p>${escapeHtml(question.prompt)}</p>
      <input class="short-answer-input latin" data-short-answer value="${escapeAttr(typedAnswer)}" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Nederlands جواب" />
      <button class="input-fallback" data-action="input-fallback">الفاظ سے بنائیں</button>
    </div>
  `;
}

function renderSpeakRepeatQuestion(question) {
  const support = renderBeginnerSupport(question.answer, "large");
  return `
    <div class="speak-repeat-question">
      <button class="listening-button" data-action="speak" data-speak="${escapeAttr(question.speak || question.answer)}" aria-label="Nederlands آواز سنیں">${renderIcon("speaker")}</button>
      <strong class="latin">${escapeHtml(question.answer)}</strong>
      ${support}
      ${renderSlowSpeakButton(question.speak || question.answer)}
      <p>${escapeHtml(question.prompt)}</p>
    </div>
  `;
}

function renderSequenceQuestion(question) {
  return `<div class="sequence-question"><p>${escapeHtml(question.prompt)}</p>${renderBuildExercise(question)}</div>`;
}

function renderListeningQuestion(question) {
  const speechText = getQuestionSpeechText(question);
  return `
    <div class="listening-question">
      <button class="listening-button" data-action="speak" data-speak="${escapeAttr(speechText)}" aria-label="Nederlands آواز سنیں">${renderIcon("speaker")}</button>
      ${audioSkipped ? `<p class="audio-fallback latin">${escapeHtml(speechText)}</p>` : ""}
      ${renderChoices(question)}
    </div>
  `;
}

function renderMultipleChoiceQuestion(question, visual) {
  return `
    <div class="multiple-choice-question ${question.type === "image-choice" ? "image-prompt" : ""}">
      <div class="prompt-scene ${visual ? "has-visual" : "no-visual"}">
        ${renderVisual(visual, "quiz-visual")}
        <div class="speech-bubble ${isPromptLatin(question) ? "latin" : ""}">
          ${getQuestionSpeechText(question) ? renderSpeakButton(getQuestionSpeechText(question), "prompt") : ""}
          <span>${renderTextWithWordHelp(question.prompt, `prompt-${activeQuestionIndex}`)}</span>
        </div>
        ${renderBeginnerSupport(question.prompt)}
        ${renderSlowSpeakButton(getQuestionSpeechText(question))}
      </div>
      ${renderChoices(question)}
    </div>
  `;
}

function renderWordBankQuestion(question, visual) {
  return `
    <div class="word-bank-question">
      <div class="prompt-scene compact ${visual ? "has-visual" : "no-visual"}">
        ${renderVisual(visual, "quiz-visual")}
        <div class="speech-bubble">${renderTextWithWordHelp(question.prompt, `prompt-${activeQuestionIndex}`)}</div>
        ${renderBeginnerSupport(question.prompt)}
      </div>
      ${renderBuildExercise(question)}
      ${renderHintButton()}
      ${hintOpen ? renderHintPopover(question) : ""}
    </div>
  `;
}

function getMatchPairs(question) {
  return (question.pairs || []).map((pair, index) => ({
    id: String(pair.id ?? index),
    left: pair.left ?? pair.dutch ?? "",
    right: pair.right ?? pair.urdu ?? ""
  }));
}

function renderMatchPairsQuestion(question) {
  const pairs = getMatchPairs(question);
  return `
    <div class="match-pairs-question ${matchPairError ? "has-error" : ""}">
      <div class="match-column">
        ${pairs.map((pair) => renderMatchPairButton(pair.id, "left", pair.left)).join("")}
      </div>
      <div class="match-column">
        ${pairs.map((pair) => renderMatchPairButton(pair.id, "right", pair.right)).join("")}
      </div>
    </div>
  `;
}

function renderMatchPairButton(id, side, text) {
  const matched = matchedPairIds.includes(id);
  const selected = matchSelection?.id === id && matchSelection?.side === side;
  const wrong = matchPairError === id;
  return `
    <button class="match-pair-card ${matched ? "matched" : ""} ${selected ? "selected" : ""} ${wrong ? "wrong" : ""} ${isDutchText(text) ? "latin" : ""}"
      data-action="match-pair" data-match-id="${escapeAttr(id)}" data-match-side="${side}" ${matched ? "disabled" : ""}>
      ${escapeHtml(text)}
    </button>
  `;
}

function renderQuizFooter(question, infoStep) {
  const correct = checked && isCurrentAnswerCorrect(question);
  if (infoStep) {
    return `<footer class="quiz-action-bar"><button class="quiz-action enabled" data-action="continue-info">${question.type === "speak-repeat" ? "میں نے کہا" : "آگے بڑھیں"}</button></footer>`;
  }
  if (checked) {
    return `
      <footer class="quiz-feedback-panel ${correct ? "correct" : "wrong"}">
        <div class="feedback-copy">
          <span class="feedback-icon">${renderIcon(correct ? "check" : "close")}</span>
          <div><strong>${correct ? "بہت خوب!" : "درست نہیں"}</strong>${correct ? "" : renderFeedbackDetail(question)}</div>
        </div>
        <button class="quiz-action enabled" data-action="next">${correct ? "جاری رکھیں" : "سمجھ گیا"}</button>
      </footer>
    `;
  }
  return `
    <footer class="quiz-action-bar">
      ${question.type === "listen-choice" ? `<button class="cant-listen" data-action="skip-audio">ابھی آواز نہیں سن سکتا</button>` : ""}
      <button class="quiz-action" data-action="check" ${canCheckQuestion(question) ? "" : "disabled"}>جواب چیک کریں</button>
    </footer>
  `;
}

function renderFeedbackDetail(question) {
  const answerSupport = getBeginnerSupport(question.answer);
  const promptSupport = getBeginnerSupport(question.prompt);
  if (answerSupport) return `<small>${escapeHtml(question.answer)} = ${escapeHtml(answerSupport.meaning)}</small>`;
  if (promptSupport) return `<small>${escapeHtml(question.prompt)} کا مطلب ${escapeHtml(promptSupport.meaning)} ہے</small>`;
  if (question.explain) return `<small>${escapeHtml(question.explain)}</small>`;
  return `<small>صحیح جواب: ${escapeHtml(question.answer)}</small>`;
}

function renderMissingLesson() {
  return `
    ${renderTopbar()}
    <section class="state-panel">
      <h1>سبق نہیں ملا</h1>
      <p class="lead">یہ سبق اس وقت دستیاب نہیں ہے۔</p>
      <button class="primary-button" data-action="home">گھر جائیں</button>
    </section>
  `;
}

function renderHintButton() {
  return `
    <button class="hint-button ${hintOpen ? "active" : ""}" data-action="hint" title="مدد" aria-label="مدد">؟</button>
  `;
}

function renderHintPopover(question) {
  return `
    <div class="hint-popover">
      ${escapeHtml(question.hint || "Nederlands الفاظ کو صحیح ترتیب میں دبائیں۔")}
    </div>
  `;
}

function renderUitlegExercise(question) {
  return `
    <div class="uitleg-card">
      ${(question.points || []).map((point) => `<div class="uitleg-point"><span></span>${renderTextWithWordHelp(point, `uitleg-${activeQuestionIndex}`)}</div>`).join("")}
    </div>
  `;
}

function renderPronunciationCards(words = []) {
  const cards = words
    .map((word) => ({ word, support: getBeginnerSupport(word) }))
    .filter((item) => item.support);
  if (!cards.length) return "";
  return `
    <div class="pronunciation-cards">
      ${cards.map(({ word, support }) => `
        <article class="pronunciation-card">
          <button class="pronunciation-play" data-action="speak" data-speak="${escapeAttr(word)}" aria-label="${escapeAttr(word)} سنیں">${renderIcon("speaker")}</button>
          <strong class="latin">${escapeHtml(word)}</strong>
          <span>${escapeHtml(support.soundHint)}</span>
          <small>${escapeHtml(support.meaning)}</small>
          ${renderSlowSpeakButton(word)}
        </article>
      `).join("")}
    </div>
  `;
}

function renderChoices(question) {
  const compact = question.options.length === 4 && question.options.every((option) => String(option).length < 22);
  return `
    <div class="choices ${compact ? "choice-grid" : ""}">
      ${question.options.map((option, index) => renderChoice(option, question, index)).join("")}
    </div>
  `;
}

function renderChoice(option, question, index) {
  let state = "";
  if (selectedAnswer === option) state = "selected";
  if (checked && option === question.answer) state = "correct";
  if (checked && selectedAnswer === option && option !== question.answer) state = "wrong";
  const dutchChoice = isDutchText(option);
  const choiceText = dutchChoice ? renderTextWithWordHelp(option, `choice-${activeQuestionIndex}-${index}`) : option;
  const support = dutchChoice ? renderBeginnerSupport(option, "compact") : "";

  return `
    <div class="choice-wrap ${dutchChoice ? "has-sound" : ""}">
      <button class="choice-button ${state} ${dutchChoice ? "latin" : ""}" data-action="choose" data-answer="${escapeAttr(option)}">
        <span class="choice-key latin">${index + 1}</span>
        <span class="choice-text">${choiceText}${support}</span>
        <span class="choice-state">${state === "correct" ? renderIcon("check") : state === "wrong" ? renderIcon("close") : ""}</span>
        ${checked && selectedAnswer === question.answer && option === question.answer ? renderChoiceConfetti() : ""}
      </button>
      ${dutchChoice && progress.settings.pronunciation ? `<button class="choice-audio" data-action="speak" data-speak="${escapeAttr(option)}" aria-label="Nederlands تلفظ">${renderIcon("speaker")}</button>` : ""}
    </div>
  `;
}

function renderBuildExercise(question) {
  const answerTiles = getAnswerTiles(question);
  const selectedIds = new Set(buildAnswerIds);
  const selectedTiles = buildAnswerIds
    .map((id) => answerTiles.find((tile) => tile.id === id))
    .filter(Boolean);
  const remainingTiles = answerTiles.filter((tile) => !selectedIds.has(tile.id));
  const currentAnswer = getBuildAnswerText(question);
  const answerState = checked ? (currentAnswer === question.answer ? "correct" : "wrong") : "";

  return `
    <div class="build-exercise">
      <div class="build-answer ${answerState}">
        ${selectedTiles.length ? selectedTiles.map((tile, index) => `
          <button class="word-tile selected-tile latin" data-action="build-remove" data-build-index="${index}">
            ${escapeHtml(tile.word)}
          </button>
        `).join("") : `<span class="build-placeholder">Nederlands الفاظ یہاں بنائیں</span>`}
        ${checked && currentAnswer === question.answer ? renderChoiceConfetti() : ""}
      </div>
      <div class="build-bank">
        ${remainingTiles.map((tile) => `
          <button class="word-tile latin" data-action="build-select" data-tile-id="${escapeAttr(tile.id)}">
            ${escapeHtml(tile.word)}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function isCurrentAnswerCorrect(question) {
  if (question.type === "short-input" && !typedFallback) return getAcceptedAnswers(question).includes(normalizeTypedAnswer(selectedAnswer));
  return selectedAnswer === question.answer;
}

function renderChoiceConfetti() {
  return `
    <span class="choice-confetti" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span>
    </span>
  `;
}

function renderVisual(visual, className) {
  if (!visual) return "";
  return `
    <figure class="learning-visual ${className}">
      <img src="${escapeAttr(visual.src)}" alt="${escapeAttr(visual.altUrdu || visual.alt || "")}" loading="lazy" />
    </figure>
  `;
}

function getVisualForSubchapter(subchapter, fallbackLesson) {
  return getVisualByTopic(`${subchapter.id} ${subchapter.title} ${subchapter.goal} ${subchapter.practice}`) || getVisualForLesson(fallbackLesson);
}

function getVisualForLesson(lesson) {
  if (!lesson) return visualLibrary.letters;
  return getVisualByTopic(`${lesson.id} ${lesson.unit} ${lesson.title} ${lesson.description}`) || visualLibrary.sentence;
}

function getVisualForQuestion(question, lesson) {
  if (question?.visualId) return getWordVisualById(question.visualId);
  return null;
}

function getExerciseVisual(question, lesson) {
  return question?.visualId ? getWordVisualById(question.visualId) : getVisualForQuestion(question, lesson);
}

function getWordVisualById(id) {
  return wordVisualById.get(id) || null;
}

function normalizeVisualText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0600-\u06ff]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getVisualByTopic(value) {
  const topic = value.toLowerCase();
  if (topic.includes("letter") || topic.includes("first-words") || topic.includes("alphabet")) return visualLibrary.letters;
  if (topic.includes("people") || topic.includes("family") || topic.includes("persoon") || topic.includes("man") || topic.includes("vrouw")) return visualLibrary.people;
  if (topic.includes("house") || topic.includes("home") || topic.includes("object") || topic.includes("place") || topic.includes("housing")) return visualLibrary.home;
  if (topic.includes("transport") || topic.includes("going") || topic.includes("station") || topic.includes("routine") || topic.includes("movement")) return visualLibrary.transport;
  if (topic.includes("body") || topic.includes("health") || topic.includes("doctor") || topic.includes("huisarts")) return visualLibrary.health;
  if (topic.includes("gemeente") || topic.includes("form") || topic.includes("work") || topic.includes("school") || topic.includes("shopping") || topic.includes("service") || topic.includes("message")) return visualLibrary.services;
  if (topic.includes("sentence") || topic.includes("grammar") || topic.includes("question") || topic.includes("word-order")) return visualLibrary.sentence;
  return null;
}

function renderTextWithWordHelp(text, context) {
  if (!isDutchText(text)) return escapeHtml(text);

  let wordIndex = 0;
  return text.split(/([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]*)/g).map((token) => {
    const meaning = wordHelpGlossary[normalizeWord(token)];
    if (!meaning) return escapeHtml(token);

    const id = `${context}-${wordIndex}-${normalizeWord(token)}`;
    wordIndex += 1;
    const open = activeWordHelp && activeWordHelp.id === id;
    return `
      <span class="word-help-wrap">
        <span
          class="word-help-token"
          role="button"
          tabindex="0"
          data-action="word-help"
          data-help-id="${escapeAttr(id)}"
          data-term="${escapeAttr(token)}"
          data-meaning="${escapeAttr(meaning)}"
        >${escapeHtml(token)}</span>
        ${open ? `<span class="word-help-popover">${escapeHtml(meaning)}</span>` : ""}
      </span>
    `;
  }).join("");
}

function renderSpeakButton(text, variant) {
  if (!progress.settings.pronunciation) return "";
  return `
    <span
      class="speak-button ${variant === "prompt" ? "prompt-speak" : ""}"
      role="button"
      tabindex="0"
      data-action="speak"
      data-speak="${escapeAttr(text)}"
      title="Nederlands تلفظ"
      aria-label="Nederlands تلفظ"
    >${renderIcon("speaker")}</span>
  `;
}

function getBeginnerSupport(text) {
  if (!progress.settings.extraUrduHelp) return null;
  const key = normalizeWord(String(text || "").trim());
  return beginnerSupport[key] || null;
}

function renderBeginnerSupport(text, variant = "") {
  const support = getBeginnerSupport(text);
  if (!support) return "";
  return `
    <div class="beginner-support ${variant}">
      <span class="beginner-sound">${escapeHtml(support.soundHint)}</span>
      <span class="beginner-meaning">${escapeHtml(support.meaning)}</span>
    </div>
  `;
}

function renderSlowSpeakButton(text) {
  if (!progress.settings.pronunciation || !progress.settings.slowAudio || !text || !isDutchText(text)) return "";
  return `<button class="slow-speak-button" data-action="slow-speak" data-speak="${escapeAttr(text)}">آہستہ سنیں</button>`;
}

function renderComplete() {
  const result = lessonResult || { correct: 0, total: 1, xp: 0 };
  const percent = Math.round((result.correct / result.total) * 100);
  const incorrect = Math.max(0, result.total - result.correct);
  const isReview = Boolean(result.reviewKind);
  const summary = percent >= 90
    ? "بہترین! یہ سبق اب مضبوط بنیاد بن گیا ہے۔"
    : percent >= 70
      ? "بہت خوب! تھوڑی دہرائی سے یہ اور پکا ہو جائے گا۔"
      : "اچھا آغاز۔ مشکل الفاظ دہرائی کے لیے محفوظ ہیں۔";
  return `
    <main class="complete-screen">
      <div class="complete-celebration" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
      <div class="complete-ring" style="--score:${percent * 3.6}deg">
        <div class="complete-mark">${renderIcon("check")}</div>
      </div>
      <span class="complete-kicker">${isReview ? "دہرائی محفوظ ہو گئی" : "آج کا قدم مکمل"}</span>
      <h1>${isReview ? "دہرائی مکمل!" : "سبق مکمل!"}</h1>
      <p class="complete-summary">${summary}</p>
      <div class="complete-metrics">
        <span><strong class="latin">${result.correct}/${result.total}</strong><small>درست</small></span>
        <span><strong class="latin">${percent}%</strong><small>کامیابی</small></span>
        <span><strong class="latin">${result.xp || 0}</strong><small>پوائنٹس</small></span>
      </div>
      <div class="complete-meter"><span style="width:${percent}%"></span></div>
      <div class="complete-actions">
        <button class="quiz-action enabled" data-action="home">اسباق پر واپس</button>
        ${incorrect ? `<button class="secondary-button" data-action="practice">دہرائی کھولیں · ${incorrect}</button>` : ""}
      </div>
    </main>
  `;
}

function renderPracticeScreen() {
  const today = getReviewConfig("today");
  const mistakes = getReviewConfig("mistakes");
  const old = getReviewConfig("old");
  return `
    <main class="utility-screen practice-screen review-screen">
      ${renderProgressHeader()}
      <section class="review-hero">
        <div class="utility-heading"><span>${renderIcon("dumbbell")}</span><div><h1>دہرائی</h1><p>آج کی مشق، پرانے سبق، اور مشکل سوالات ایک جگہ</p></div></div>
        <div class="review-total"><strong class="latin">${today.questions.length + mistakes.questions.length + old.questions.length}</strong><span>تیار سوالات</span></div>
      </section>
      <div class="review-hub-grid">
        ${renderReviewHubCard("today", today, "dumbbell")}
        ${renderReviewHubCard("mistakes", mistakes, "mistake")}
        ${renderReviewHubCard("old", old, "book")}
        <button class="review-hub-card accent-blue review-letters" data-action="letters">
          <span class="review-hub-icon">${renderIcon("alphabet")}</span>
          <span class="review-hub-copy"><strong>Nederlands حروف</strong><small>سنیں اور دہرائیں</small></span>
          <b class="review-hub-count latin">26</b>
        </button>
      </div>
    </main>
  `;
}

function renderReviewHubCard(kind, config, icon) {
  const disabled = !config.questions.length;
  return `
    <button class="review-hub-card review-${kind} ${disabled ? "disabled" : ""}" data-action="review" data-review-kind="${kind}" ${disabled ? "disabled" : ""}>
      <span class="review-hub-icon">${renderIcon(icon)}</span>
      <span class="review-hub-copy"><strong>${config.title}</strong><small>${disabled ? config.empty : "مشق تیار ہے"}</small></span>
      <b class="review-hub-count latin">${config.questions.length}</b>
    </button>
  `;
}

function renderLetters() {
  return `
    ${renderTopbar()}
    <section class="letters-panel">
      <div class="letters-heading">
        <button class="circle-action" data-action="home" title="گھر">←</button>
        <div>
          <h1>Nederlands حروف اور تلفظ</h1>
          <p class="lead">ہر حرف کے ساتھ ایک آسان مثال دی گئی ہے۔ آواز کا بٹن دبانے سے صرف حرف کا Nederlands نام سنائی دے گا۔</p>
        </div>
      </div>
      <h2>حروف تہجی</h2>
      <div class="letters-grid">
        ${dutchLetters.map(renderLetterCard).join("")}
      </div>
    </section>
  `;
}

function renderLetterCard(item) {
  const support = getBeginnerSupport(item.word);
  return `
    <article class="letter-card">
      <div class="letter-dot latin">${item.letter}</div>
      <div class="letter-info">
        <strong>${item.sound}</strong>
        <span>مثال: <b class="latin">${item.word}</b> — ${item.meaning}</span>
        ${support && progress.settings.extraUrduHelp ? `<small class="beginner-support-line"><b>${escapeHtml(support.soundHint)}</b><span>${escapeHtml(support.meaning)}</span></small>` : ""}
      </div>
      ${renderSpeakButton(item.speak, "choice")}
    </article>
  `;
}

function renderSettings() {
  return `
    ${renderTopbar()}
    <section class="settings-panel">
      <div class="settings-intro">
        <span>${renderIcon("settings")}</span>
        <div><h1>ترتیبات</h1><p>اپنی رفتار اور مدد کا انداز منتخب کریں</p></div>
      </div>
      <div class="settings-section-heading"><strong>سیکھنے کے راستے</strong><span></span></div>
      <div class="settings-links">
        ${renderSettingsLink("practice", "dumbbell", "دہرائی", "آج، غلطیاں، اور پرانے سبق")}
        ${renderSettingsLink("review", "dumbbell", "آج کی مشق", "ملے جلے 20 سوال", "today")}
        ${renderSettingsLink("review", "book", "پرانا سبق", "مکمل سبق دوبارہ کریں", "old")}
        ${renderSettingsLink("letters", "alphabet", "Nederlands حروف", "حروف سنیں اور دہرائیں")}
      </div>
      <div class="settings-section-heading"><strong>آپ کے لیے آسانی</strong><span></span></div>
      <div class="settings-list">
        ${renderToggleRow("beginnerMode", "شروع سے سیکھنے والا انداز", "نئے طالب علم کے لیے آسان راستہ")}
        ${renderToggleRow("largeText", "بڑا متن", "الفاظ اور بٹن کچھ بڑے دکھائیں")}
        ${renderToggleRow("slowAudio", "آہستہ آواز", "Dutch آواز تھوڑی آہستہ سنائیں")}
        ${renderToggleRow("extraUrduHelp", "زیادہ Urdu مدد", "آواز، معنی، اور چھوٹی مدد زیادہ دکھائیں")}
        ${renderToggleRow("soundEffects", "درست/غلط کی آوازیں", "جواب چیک کرتے وقت چھوٹی آوازیں")}
        ${renderToggleRow("pronunciation", "Nederlands تلفظ کے بٹن", "آواز کے بٹن اور لفظ کا تلفظ")}
      </div>
      <button class="secondary-button danger-button" data-action="reset">${renderIcon("trash")}<span>پیش رفت دوبارہ شروع کریں</span></button>
    </section>
  `;
}

function renderSettingsLink(action, icon, title, subtitle, reviewKind = "") {
  return `<button class="utility-action" data-action="${action}" ${reviewKind ? `data-review-kind="${reviewKind}"` : ""}><span>${renderIcon(icon)}</span><div><strong>${title}</strong><small>${subtitle}</small></div><b>‹</b></button>`;
}

function renderToggleRow(key, title, subtitle) {
  const enabled = progress.settings[key];
  return `
    <button class="setting-row" data-action="toggle-setting" data-setting="${key}" aria-pressed="${enabled}">
      <span>
        <strong>${title}</strong>
        <small>${subtitle}</small>
      </span>
      <span class="toggle ${enabled ? "on" : ""}"><span></span></span>
    </button>
  `;
}

function renderBottomNav() {
  if (["lesson", "complete"].includes(screen)) return "";
  return `
    <nav class="bottom-nav" aria-label="اصل راستے">
      ${renderNavButton("settings", "settings", "ترتیبات", ["settings", "letters"].includes(screen))}
      ${renderNavButton("practice", "dumbbell", "دہرائی", screen === "practice")}
      ${renderNavButton("home", "book", "سبق", screen === "home" || screen === "preview")}
    </nav>
  `;
}

function renderNavButton(action, icon, label, active) {
  return `<button class="nav-button ${active ? "active" : ""}" data-action="${action}"><span class="nav-icon">${renderIcon(icon)}</span><span>${label}</span></button>`;
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", (event) => {
      const action = element.dataset.action;
      if (action === "word-help") {
        event.preventDefault();
        event.stopPropagation();
        toggleWordHelp(element.dataset.helpId, element.dataset.term, element.dataset.meaning);
      }
      if (action === "speak") {
        event.preventDefault();
        event.stopPropagation();
        speakDutch(element.dataset.speak);
      }
      if (action === "slow-speak") {
        event.preventDefault();
        event.stopPropagation();
        speakDutch(element.dataset.speak, true);
      }
      if (action === "home") goHome();
      if (action === "practice") goPractice();
      if (action === "letters") goLetters();
      if (action === "settings") goSettings();
      if (action === "chapter") selectChapter(element.dataset.chapter);
      if (action === "toggle-path") togglePath();
      if (action === "preview") showLessonPreview(element.dataset.lesson);
      if (action === "start") startLesson(element.dataset.lesson);
      if (action === "review") startReview(element.dataset.reviewKind);
      if (action === "choose") chooseAnswer(element.dataset.answer);
      if (action === "build-select") selectBuildTile(element.dataset.tileId);
      if (action === "build-remove") removeBuildTile(Number(element.dataset.buildIndex));
      if (action === "match-pair") selectMatchPair(element.dataset.matchId, element.dataset.matchSide);
      if (action === "hint") toggleHint();
      if (action === "check") checkAnswer();
      if (action === "continue-info") continueInfoStep();
      if (action === "next") nextQuestion();
      if (action === "reset") resetProgress();
      if (action === "toggle-setting") toggleSetting(element.dataset.setting);
      if (action === "skip-audio") skipAudioQuestion();
      if (action === "input-fallback") enableInputFallback();
    });
  });

  document.querySelectorAll('[data-action="speak"]').forEach((element) => {
    element.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      speakDutch(element.dataset.speak);
    });
  });

  document.querySelectorAll('[data-action="word-help"]').forEach((element) => {
    element.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      toggleWordHelp(element.dataset.helpId, element.dataset.term, element.dataset.meaning);
    });
  });

  document.querySelectorAll("[data-short-answer]").forEach((element) => {
    element.addEventListener("input", () => {
      typedAnswer = element.value;
      selectedAnswer = typedAnswer;
      const checkButton = document.querySelector('[data-action="check"]');
      if (checkButton) checkButton.disabled = !typedAnswer.trim();
    });
  });
}

function scrollToTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  requestAnimationFrame(() => window.scrollTo(0, 0));
}

function goHome() {
  activeWordHelp = null;
  activeReview = null;
  pathCardLessonId = "";
  pathExpanded = false;
  screen = "home";
  render();
  scrollToTop();
}

function goPractice() {
  activeWordHelp = null;
  activeReview = null;
  screen = "practice";
  render();
  scrollToTop();
}

function goLetters() {
  activeWordHelp = null;
  activeReview = null;
  screen = "letters";
  render();
  scrollToTop();
}

function goSettings() {
  activeWordHelp = null;
  activeReview = null;
  screen = "settings";
  render();
  scrollToTop();
}

function showLessonPreview(id) {
  const lesson = getLesson(id);
  const chapter = getChapterForLesson(lesson.id);
  selectedChapterId = chapter.id;
  previewLessonId = lesson.id;
  activeWordHelp = null;
  activeReview = null;
  pathCardLessonId = lesson.id;
  saveProgress({ ...progress, selectedChapterId: selectedChapterId, lastLessonId: lesson.id });
  screen = "home";
  render();
  requestAnimationFrame(() => {
    document.querySelector(`[data-path-lesson="${lesson.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function selectChapter(id) {
  const chapter = chapters.find((item) => item.id === id);
  if (!chapter) return;
  selectedChapterId = chapter.id;
  const nextLesson = getNextLessonForChapter(chapter);
  activeLessonId = nextLesson.id;
  previewLessonId = nextLesson.id;
  activeReview = null;
  pathCardLessonId = "";
  pathExpanded = false;
  saveProgress({ ...progress, selectedChapterId: selectedChapterId, lastLessonId: activeLessonId });
  screen = "home";
  render();
  scrollToTop();
}

function togglePath() {
  pathExpanded = !pathExpanded;
  render();
  if (!pathExpanded) {
    document.querySelector(".path-overview")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function startLesson(id) {
  const lesson = getLesson(id);
  if (!lesson || !lesson.questions?.length) {
    screen = "home";
    render();
    return;
  }
  const chapter = getChapterForLesson(lesson.id);
  selectedChapterId = chapter.id;
  activeLessonId = lesson.id;
  activeReview = null;
  activeQuestionIndex = 0;
  selectedAnswer = "";
  checked = false;
  lessonProgressSteps = 0;
  activeWordHelp = null;
  buildAnswerIds = [];
  hintOpen = false;
  audioSkipped = false;
  matchSelection = null;
  matchedPairIds = [];
  matchPairError = "";
  typedAnswer = "";
  typedFallback = false;
  sessionAnswers = [];
  sessionQuestions = buildSessionQuestions(lesson);
  saveProgress({ ...progress, selectedChapterId: selectedChapterId, lastLessonId: lesson.id });
  screen = "lesson";
  render();
  scrollToTop();
}

function startReview(kind) {
  const config = getReviewConfig(kind);
  if (!config.questions.length) return;
  activeReview = {
    id: `review-${kind}`,
    title: config.title,
    unit: config.unit,
    description: config.description,
    questions: config.questions,
    xp: 0,
    reviewKind: kind
  };
  activeLessonId = activeReview.id;
  activeQuestionIndex = 0;
  selectedAnswer = "";
  checked = false;
  lessonProgressSteps = 0;
  activeWordHelp = null;
  buildAnswerIds = [];
  hintOpen = false;
  audioSkipped = false;
  matchSelection = null;
  matchedPairIds = [];
  matchPairError = "";
  typedAnswer = "";
  typedFallback = false;
  sessionAnswers = [];
  sessionQuestions = buildSessionQuestions(activeReview);
  screen = "lesson";
  render();
  scrollToTop();
}

function chooseAnswer(answer) {
  if (checked) return;
  activeWordHelp = null;
  hintOpen = false;
  selectedAnswer = answer;
  updateChoiceSelection();
}

function updateChoiceSelection() {
  const question = getActiveQuestion();
  if (!question || question.type === "build") {
    render();
    return;
  }

  document.querySelectorAll("[data-action='choose']").forEach((button) => {
    const selected = button.dataset.answer === selectedAnswer;
    button.classList.toggle("selected", selected);
  });

  const checkButton = document.querySelector("[data-action='check']");
  if (checkButton) {
    checkButton.disabled = !canCheckQuestion(question);
  }

  document.querySelectorAll(".hint-popover, .word-help-popover").forEach((element) => element.remove());
}

function selectBuildTile(tileId) {
  if (checked || !tileId) return;
  activeWordHelp = null;
  buildAnswerIds = [...buildAnswerIds, tileId];
  selectedAnswer = getBuildAnswerText(getActiveQuestion());
  render();
}

function removeBuildTile(index) {
  if (checked) return;
  activeWordHelp = null;
  buildAnswerIds = buildAnswerIds.filter((_, itemIndex) => itemIndex !== index);
  selectedAnswer = getBuildAnswerText(getActiveQuestion());
  render();
}

function toggleHint() {
  hintOpen = !hintOpen;
  activeWordHelp = null;
  render();
}

function skipAudioQuestion() {
  audioSkipped = true;
  render();
}

function enableInputFallback() {
  if (checked) return;
  typedFallback = true;
  typedAnswer = "";
  selectedAnswer = "";
  buildAnswerIds = [];
  render();
}

function selectMatchPair(id, side) {
  if (checked || !id || !side || matchedPairIds.includes(id)) return;
  matchPairError = "";
  if (!matchSelection || matchSelection.side === side) {
    matchSelection = { id, side };
    render();
    return;
  }
  if (matchSelection.id === id) {
    matchedPairIds = [...matchedPairIds, id];
    matchSelection = null;
    const question = getActiveQuestion();
    if (matchedPairIds.length === getMatchPairs(question).length) selectedAnswer = question.answer;
    render();
    return;
  }
  matchPairError = id;
  matchSelection = null;
  render();
}

function continueInfoStep() {
  lessonProgressSteps = Math.max(lessonProgressSteps, activeQuestionIndex + 1);
  nextQuestion();
}

function checkAnswer() {
  const question = getActiveQuestion();
  if (!canCheckQuestion(question)) return;
  activeWordHelp = null;
  hintOpen = false;
  if (question.type === "build" || question.type === "sequence" || (question.type === "short-input" && typedFallback)) {
    selectedAnswer = getBuildAnswerText(question);
  }
  const correct = question.type === "short-input" && !typedFallback
    ? getAcceptedAnswers(question).includes(normalizeTypedAnswer(selectedAnswer))
    : selectedAnswer === question.answer;
  lessonProgressSteps = correct
    ? Math.max(lessonProgressSteps, activeQuestionIndex + 1)
    : Math.max(0, lessonProgressSteps - 1);
  sessionAnswers.push({
    questionId: question.id,
    prompt: question.prompt,
    answer: question.answer,
    selected: selectedAnswer,
    correct,
    skillId: question.skillId || "",
    mistakeOrigin: question.mistakeOrigin || null
  });
  playAnswerSound(correct ? "correct" : "wrong");
  checked = true;
  render();
}

function nextQuestion() {
  const lesson = getActiveLesson();
  const questions = sessionQuestions.length ? sessionQuestions : lesson.questions;
  if (activeQuestionIndex < questions.length - 1) {
    activeQuestionIndex += 1;
    selectedAnswer = "";
    checked = false;
    activeWordHelp = null;
    buildAnswerIds = [];
    hintOpen = false;
    audioSkipped = false;
    matchSelection = null;
    matchedPairIds = [];
    matchPairError = "";
    typedAnswer = "";
    typedFallback = false;
    render();
    return;
  }

  completeLesson(lesson);
}

function completeLesson(lesson) {
  const questions = sessionQuestions.length ? sessionQuestions : lesson.questions;
  const scoredQuestions = questions.filter((question) => !isInfoQuestion(question));
  lessonProgressSteps = questions.length;
  const correct = sessionAnswers.filter((answer) => answer.correct).length;
  const isReview = Boolean(lesson.reviewKind);
  const alreadyCompleted = progress.completedLessons.includes(lesson.id);
  const earnedXp = isReview || alreadyCompleted ? 0 : lesson.xp;
  const practiceDays = progress.practiceDays.includes(todayKey())
    ? progress.practiceDays
    : [...progress.practiceDays, todayKey()];
  const correctedMistakes = lesson.reviewKind === "mistakes"
    ? new Set(sessionAnswers.filter((answer) => answer.correct).map((answer) => mistakeKey(answer.mistakeOrigin || {
      lessonId: findLessonIdForQuestion(answer.prompt, answer.answer, answer.questionId),
      questionId: answer.questionId,
      skillId: answer.skillId,
      prompt: answer.prompt,
      answer: answer.answer
    })))
    : new Set();
  const newMistakes = sessionAnswers
    .filter((answer) => !answer.correct)
    .map((answer) => ({
      lessonId: isReview ? findLessonIdForQuestion(answer.prompt, answer.answer, answer.questionId) : lesson.id,
      questionId: answer.questionId,
      skillId: answer.skillId,
      prompt: answer.prompt,
      answer: answer.answer,
      selected: answer.selected,
      date: todayKey()
    }));
  const keptMistakes = lesson.reviewKind === "mistakes"
    ? progress.mistakes.filter((mistake) => !correctedMistakes.has(mistakeKey(mistake)))
    : progress.mistakes;

  lessonResult = {
    correct,
    total: scoredQuestions.length,
    xp: earnedXp,
    reviewKind: lesson.reviewKind || ""
  };

  saveProgress({
    ...progress,
    completedLessons: isReview || alreadyCompleted ? progress.completedLessons : [...progress.completedLessons, lesson.id],
    scores: isReview ? progress.scores : {
      ...progress.scores,
      [lesson.id]: Math.max(progress.scores[lesson.id] || 0, correct)
    },
    seenQuestionIds: [...new Set([
      ...(progress.seenQuestionIds || []),
      ...questions.map((question) => question.id).filter(Boolean)
    ])],
    missionVariantRuns: lesson.kind === "mission" && !isReview ? {
      ...(progress.missionVariantRuns || {}),
      [lesson.id]: (progress.missionVariantRuns?.[lesson.id] || 0) + 1
    } : (progress.missionVariantRuns || {}),
    skillAttempts: sessionAnswers.reduce((attempts, answer) => {
      if (!answer.skillId) return attempts;
      const previous = attempts[answer.skillId] || { correct: 0, total: 0 };
      attempts[answer.skillId] = { correct: previous.correct + (answer.correct ? 1 : 0), total: previous.total + 1 };
      return attempts;
    }, { ...(progress.skillAttempts || {}) }),
    totalXp: progress.totalXp + earnedXp,
    practiceDays,
    mistakes: [...keptMistakes, ...newMistakes],
    lastLessonId: isReview ? progress.lastLessonId : lesson.id
  });

  activeReview = null;
  screen = "complete";
  render();
  scrollToTop();
}

function resetProgress() {
  const confirmed = window.confirm("کیا آپ واقعی پیش رفت دوبارہ شروع کرنا چاہتے ہیں؟");
  if (!confirmed) return;
  saveProgress({ ...defaultProgress });
  activeWordHelp = null;
  activeReview = null;
  buildAnswerIds = [];
  hintOpen = false;
  screen = "home";
  render();
  scrollToTop();
}

function toggleSetting(key) {
  if (!(key in progress.settings)) return;
  saveProgress({
    ...progress,
    settings: {
      ...progress.settings,
      [key]: !progress.settings[key]
    }
  });
  render();
}

function toggleWordHelp(id, term, meaning) {
  activeWordHelp = activeWordHelp && activeWordHelp.id === id ? null : { id, term, meaning };
  render();
}

function escapeAttr(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function normalizeWord(value) {
  return String(value ?? "").toLowerCase().replace(/^'+|'+$/g, "");
}

function buildSessionQuestions(lesson) {
  const sourceQuestions = lesson?.reviewKind
    ? lesson.questions
    : lesson?.kind === "mission"
      ? lesson.variants[(progress.missionVariantRuns?.[lesson.id] || 0) % lesson.variants.length].questions
      : sampleLessonQuestions(lesson?.questions || [], lesson?.id || "lesson");
  const lessonIntro = getLessonIntroQuestion(lesson, sourceQuestions);
  const questions = lessonIntro ? [lessonIntro, ...sourceQuestions].slice(0, LESSON_QUESTION_LIMIT) : sourceQuestions;
  return questions.map((question) => ({
    ...question,
    options: question.options ? shuffleArray(question.options) : [],
    tiles: question.tiles ? shuffleArray(question.tiles.map((word, index) => ({ id: `${index}-${word}`, word }))) : [],
    fallbackTiles: question.fallbackTiles ? shuffleArray(question.fallbackTiles.map((word, index) => ({ id: `fallback-${index}-${word}`, word }))) : []
  }));
}

function getLessonIntroQuestion(lesson, sourceQuestions = []) {
  if (!lesson || lesson.reviewKind || lesson.kind === "mission") return null;
  if (sourceQuestions.some(isInfoQuestion)) return null;
  const pairs = getLessonIntroPairs(lesson, sourceQuestions);
  if (pairs.length < 2) return null;
  const supportWordsByLesson = {
    "a0-letters-1": ["a", "b", "appel", "boek"],
    "a0-letters-2": ["h", "i", "huis", "ik", "ja"],
    "a0-letters-3": ["oog", "pen", "stoel", "tafel", "water"]
  };
  const supportWords = supportWordsByLesson[lesson.id] || pairs
    .map((pair) => pair.dutch)
    .filter((word) => /^[a-zà-ÿ]+$/i.test(word))
    .slice(0, 5);
  return {
    id: `${lesson.id}-beginner-intro`,
    type: "uitleg",
    prompt: "پہلے یہ سیکھیں",
    points: [
      "اس سبق میں پہلے یہ Nederlands معنی دیکھیں۔",
      ...pairs.slice(0, 7).map((pair) => `${pair.dutch} = ${pair.urdu}`),
      "پہلے پہچان کی مشق آئے گی، پھر خالی جگہ یا جملہ بنانے والی مشق آئے گی۔"
    ],
    supportWords,
    answer: "سمجھ گیا",
    explain: "اب انہی الفاظ اور جملوں کی مشق کریں۔"
  };
}

function getLessonIntroPairs(lesson, sourceQuestions = []) {
  const pairs = [];
  const seen = new Set();
  const add = (dutch, urdu) => {
    const cleanDutch = String(dutch || "").replace(/\s+/g, " ").trim();
    const cleanUrdu = String(urdu || "").replace(/^یہ بنائیں:\s*/, "").replace(/^حال:\s*/, "").replace(/\s+/g, " ").trim();
    if (!/[A-Za-zÀ-ÿ]/.test(cleanDutch) || /[\u0600-\u06ff]/.test(cleanDutch)) return;
    if (!/[\u0600-\u06ff]/.test(cleanUrdu)) return;
    const key = `${cleanDutch.toLowerCase()}|${cleanUrdu}`;
    if (seen.has(key)) return;
    seen.add(key);
    pairs.push({ dutch: cleanDutch, urdu: cleanUrdu });
  };

  for (const concept of lesson.concepts || []) add(concept.dutch, concept.urdu);
  for (const question of [...(lesson.questions || []), ...sourceQuestions]) {
    if (question.type === "meaning") add(question.prompt, question.answer);
    if (question.type === "reverse") add(question.answer, question.prompt);
    if (question.type === "listen-choice" && question.mode !== "listen-dutch" && /[\u0600-\u06ff]/.test(String(question.answer || ""))) {
      add(question.speak, question.answer);
    }
    if (question.type === "build") add(question.answer, question.prompt);
  }
  return pairs;
}

function sampleLessonQuestions(questions, lessonId) {
  const infoQuestions = questions.filter(isInfoQuestion);
  const usableQuestions = questions.filter((question) => !isInfoQuestion(question));
  if (questions.length <= LESSON_QUESTION_LIMIT) return [...infoQuestions, ...usableQuestions].slice(0, LESSON_QUESTION_LIMIT);
  const explanationCount = Math.min(2, infoQuestions.length);
  const seenIds = new Set(progress.seenQuestionIds || []);
  const lessonSeenCount = usableQuestions.filter((question) => seenIds.has(question.id)).length;
  const seed = hashText(`${lessonId}:${lessonSeenCount}:${progress.scores[lessonId] || 0}`);
  const types = ["meaning", "image-choice", "listen-choice", "document-choice", "reverse", "fill-gap", "situation", "sequence", "build", "short-input"];
  const unseenGroups = new Map(types.map((type, index) => [
    type,
    seededShuffle(usableQuestions.filter((question) => question.type === type && !seenIds.has(question.id)), seed + index)
  ]));
  const seenGroups = new Map(types.map((type, index) => [
    type,
    seededShuffle(usableQuestions.filter((question) => question.type === type && seenIds.has(question.id)), seed + index + 41)
  ]));
  const practice = [];
  const phaseTypes = [
    ["meaning", "image-choice", "listen-choice", "document-choice"],
    ["reverse", "fill-gap"],
    ["situation", "sequence", "build", "short-input"]
  ];
  const practiceLimit = LESSON_QUESTION_LIMIT - explanationCount;
  const phaseTargets = [8, 14, practiceLimit].map((target) => Math.min(target, practiceLimit));
  const takeRound = (groups, phase) => {
    let added = false;
    for (const type of phase) {
      const question = groups.get(type)?.shift();
      if (!question) continue;
      practice.push(question);
      added = true;
      if (practice.length >= LESSON_QUESTION_LIMIT - explanationCount) return added;
    }
    return added;
  };
  for (const [index, phase] of phaseTypes.entries()) {
    const phaseLimit = index === phaseTypes.length - 1
      ? practiceLimit
      : phaseTargets[index];
    while (practice.length < phaseLimit && takeRound(unseenGroups, phase)) {}
  }
  for (const [index, phase] of phaseTypes.entries()) {
    const phaseLimit = index === phaseTypes.length - 1
      ? practiceLimit
      : phaseTargets[index];
    while (practice.length < phaseLimit && takeRound(seenGroups, phase)) {}
  }
  if (practice.length < practiceLimit) {
    const remainingIds = new Set(practice.map((question) => question.id));
    for (const groups of [unseenGroups, seenGroups]) {
      for (const phase of phaseTypes) {
        for (const question of seededShuffle(phase.flatMap((type) => groups.get(type) || []), seed + practice.length + 163)) {
          if (remainingIds.has(question.id)) continue;
          practice.push(question);
          remainingIds.add(question.id);
          if (practice.length >= practiceLimit) break;
        }
        if (practice.length >= practiceLimit) break;
      }
      if (practice.length >= practiceLimit) break;
    }
  }
  return [...infoQuestions.slice(0, explanationCount), ...practice].slice(0, LESSON_QUESTION_LIMIT);
}

function hashText(value) {
  let hash = 2166136261;
  for (const char of String(value)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return hash >>> 0;
}

function seededShuffle(items, seed) {
  const shuffled = [...items];
  let state = seed || 1;
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function getLessonRunCount(lesson) {
  return Math.min(LESSON_QUESTION_LIMIT, lesson.questions.length);
}

function getActiveQuestion() {
  const lesson = getActiveLesson();
  const questions = sessionQuestions.length ? sessionQuestions : lesson.questions;
  return questions[activeQuestionIndex];
}

function findLessonIdForQuestion(prompt, answer, questionId = "") {
  const lesson = getAllLessons().find((item) => item.questions.some((question) => (
    (questionId && question.id === questionId) || (question.prompt === prompt && question.answer === answer)
  )));
  return lesson?.id || activeLessonId;
}

function getBuildAnswerText(question) {
  const tiles = getAnswerTiles(question);
  return buildAnswerIds
    .map((id) => tiles.find((tile) => tile.id === id)?.word)
    .filter(Boolean)
    .join(question.type === "sequence" ? " | " : " ");
}

function isInfoQuestion(question) {
  return question?.type === "uitleg" || question?.type === "speak-repeat";
}

function canCheckQuestion(question) {
  if (isInfoQuestion(question)) return true;
  if (checked) return true;
  if (question.type === "build" || question.type === "sequence") return buildAnswerIds.length === getAnswerTiles(question).length;
  if (question.type === "short-input") return typedFallback ? buildAnswerIds.length === getAnswerTiles(question).length : Boolean(typedAnswer.trim());
  if (question.type === "match-pairs") return getMatchPairs(question).length > 0 && matchedPairIds.length === getMatchPairs(question).length;
  return Boolean(selectedAnswer);
}

function getAnswerTiles(question) {
  return question.type === "short-input" && typedFallback ? (question.fallbackTiles || []) : (question.tiles || []);
}

function normalizeTypedAnswer(value) {
  return String(value || "").toLowerCase().trim().replace(/\s+/g, " ").replace(/[.!?]+$/g, "");
}

function getAcceptedAnswers(question) {
  return [question.answer, ...(question.acceptedAnswers || [])].map(normalizeTypedAnswer);
}

function getQuestionSpeechText(question) {
  if (question.speak) return question.speak;
  if (question.type === "fill-gap" && String(question.prompt || "").includes("___")) {
    return String(question.prompt || "").replace("___", question.answer || "").replace(/\s+/g, " ").trim();
  }
  return isDutchText(question.prompt) ? question.prompt : "";
}

function isPromptLatin(question) {
  return isDutchText(question.prompt);
}

function shuffleArray(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function isDutchText(value) {
  return /[A-Za-zÀ-ÿ]/.test(value) && !/[\u0600-\u06ff]/.test(value);
}

function normalizeDutchSpeechText(value) {
  return String(value || "")
    .replaceAll("___", "")
    .replace(/\s*\|\s*/g, ", ")
    .replace(/\s*[–—]\s*/g, ", ")
    .replace(/\s*&\s*/g, " en ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?])/g, "$1")
    .trim();
}

function scoreDutchVoice(voice) {
  const language = String(voice?.lang || "").toLowerCase().replace("_", "-");
  if (!language.startsWith("nl")) return Number.NEGATIVE_INFINITY;

  const name = String(voice?.name || "").toLowerCase();
  let score = language === "nl-nl" ? 120 : language.startsWith("nl-nl") ? 110 : 80;
  if (voice?.localService) score += 35;
  if (/(natural|neural|enhanced|premium|studio)/.test(name)) score += 50;
  if (/(google|microsoft|siri|xander|claire)/.test(name)) score += 16;
  if (/(compact|espeak)/.test(name)) score -= 30;
  return score;
}

function selectPreferredDutchVoice(voices = []) {
  return [...voices]
    .filter((voice) => Number.isFinite(scoreDutchVoice(voice)))
    .sort((left, right) => scoreDutchVoice(right) - scoreDutchVoice(left)
      || String(left.name || "").localeCompare(String(right.name || "")))[0] || null;
}

function refreshPreferredDutchVoice() {
  if (!("speechSynthesis" in window)) return null;
  preferredDutchVoice = selectPreferredDutchVoice(window.speechSynthesis.getVoices());
  return preferredDutchVoice;
}

function getDutchSpeechRate(text, forceSlow = false) {
  const cleanText = normalizeDutchSpeechText(text);
  const singleLetter = cleanText.length === 1;
  const singleWord = !/\s/.test(cleanText);
  const slow = progress.settings.slowAudio || forceSlow;
  if (slow) return singleLetter ? 0.7 : singleWord ? 0.76 : 0.8;
  return singleLetter ? 0.82 : singleWord ? 0.92 : 0.96;
}

function speakDutch(text, forceSlow = false) {
  if (!progress.settings.pronunciation || !text) return;

  const spokenText = normalizeDutchSpeechText(text);
  if (!spokenText) return;
  const rate = getDutchSpeechRate(spokenText, forceSlow);
  const pitch = 0.98;

  try {
    if (window.NederUrduTts?.speakNatural?.(spokenText, rate, pitch)) return;
    if (window.NederUrduTts?.speak?.(spokenText)) return;
  } catch {
    // Continue with the browser voice when the native bridge is unavailable.
  }

  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(spokenText);
  const dutchVoice = refreshPreferredDutchVoice();
  utterance.lang = "nl-NL";
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = 1;
  if (dutchVoice) utterance.voice = dutchVoice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

if ("speechSynthesis" in window) {
  window.speechSynthesis.addEventListener?.("voiceschanged", refreshPreferredDutchVoice);
  refreshPreferredDutchVoice();
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) audioContext = new AudioContextClass();
  return audioContext;
}

function playTone(context, frequency, startTime, duration, volume, type = "sine") {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.03);
}

function playAnswerSound(kind) {
  if (!progress.settings.soundEffects) return;
  const context = getAudioContext();
  if (!context) return;

  if (context.state === "suspended") {
    context.resume().catch(() => {});
  }

  const now = context.currentTime;
  if (kind === "correct") {
    playTone(context, 660, now, 0.11, 0.13, "triangle");
    playTone(context, 880, now + 0.1, 0.14, 0.12, "triangle");
    return;
  }

  playTone(context, 210, now, 0.16, 0.12, "sine");
  playTone(context, 165, now + 0.12, 0.18, 0.1, "sine");
}

render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
