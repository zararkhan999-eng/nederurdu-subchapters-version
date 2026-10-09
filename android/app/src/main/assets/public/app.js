const STORAGE_KEY = "nederurdu-progress-v4";
const LEGACY_STORAGE_KEY = "nederurdu-progress-v3";
const PROGRESS_SCHEMA_VERSION = 4;
const COURSE_SCHEMA_VERSION = Number(window.NEDERURDU_COURSE?.schemaVersion || 0);
const launchScreen = document.querySelector(".launch-screen");
const effectsProfileOverride = ["enhanced", "lite", "reduced"].includes(window.NEDERURDU_EFFECTS_PROFILE)
  ? window.NEDERURDU_EFFECTS_PROFILE
  : "";
const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");

function detectEffectsProfile() {
  if (effectsProfileOverride) return effectsProfileOverride;
  if (reducedMotionQuery?.matches) return "reduced";
  const constrainedViewport = Boolean(
    window.matchMedia?.("(max-width: 820px), (hover: none), (pointer: coarse)").matches
  );
  const constrainedHardware = Boolean(
    (Number(navigator.hardwareConcurrency) > 0 && Number(navigator.hardwareConcurrency) <= 4)
    || (Number(navigator.deviceMemory) > 0 && Number(navigator.deviceMemory) <= 4)
  );
  return constrainedViewport || (constrainedHardware && window.innerWidth <= 1100) ? "lite" : "enhanced";
}

let effectsProfile = detectEffectsProfile();
let performanceLite = effectsProfile !== "enhanced";

function applyEffectsProfile(profile) {
  effectsProfile = profile;
  performanceLite = profile !== "enhanced";
  document.documentElement.dataset.effects = profile;
  document.documentElement.classList.toggle("performance-lite", performanceLite);
  document.documentElement.classList.toggle("effects-enhanced", profile === "enhanced");
  document.documentElement.classList.toggle("effects-lite", profile === "lite");
  document.documentElement.classList.toggle("effects-reduced", profile === "reduced");
}

applyEffectsProfile(effectsProfile);

let launchFinished = false;
const finishLaunch = () => {
  if (launchFinished) return;
  launchFinished = true;
  document.body.classList.remove("launching");
  document.body.classList.add("launch-complete");
  window.setTimeout(() => launchScreen?.remove(), 720);
};

if (effectsProfile === "reduced") {
  finishLaunch();
} else {
  const playLaunch = () => {
    requestAnimationFrame(() => launchScreen?.classList.add("is-playing"));
    {
      launchScreen?.querySelector(".launch-reveal")?.addEventListener("animationend", finishLaunch, { once: true });
      window.setTimeout(finishLaunch, 950);
    }
  };
  if (document.readyState === "complete") playLaunch();
  else window.addEventListener("load", playLaunch, { once: true });
}

function normalizeCourseChapters(course) {
  if (!Array.isArray(course?.chapters) || !course.chapters.length) return null;
  return course.chapters.map((chapter) => {
    const units = Array.isArray(chapter.units) ? chapter.units : [];
    const lessons = Array.isArray(chapter.lessons) && chapter.lessons.length
      ? chapter.lessons
      : units.flatMap((unit) => (unit.lessons || []).map((lesson) => ({
        ...lesson,
        unit: lesson.unit || unit.title || unit.name || chapter.title
      })));
    const subchapters = Array.isArray(chapter.subchapters) && chapter.subchapters.length
      ? chapter.subchapters
      : units.map((unit, index) => ({
        id: unit.id || `${chapter.id}-unit-${index + 1}`,
        title: unit.title || unit.name || `حصہ ${index + 1}`,
        goal: unit.goal || unit.outcomeUrdu || "",
        practice: unit.practice || "",
        lessonIds: (unit.lessons || []).map((lesson) => lesson.id)
      }));
    return { ...chapter, lessons, subchapters };
  });
}

const course = window.NEDERURDU_COURSE || null;
const chapters = normalizeCourseChapters(course) || window.NEDERURDU_CHAPTERS || [
  {
    id: "a0",
    title: "باب A0",
    subtitle: "حروف، الفاظ، چھوٹی گرامر، اور پہلے Nederlands جملے",
    lessons: window.NEDERURDU_LESSONS || []
  }
];
const courseConcepts = new Map(
  (Array.isArray(course?.concepts) ? course.concepts : Object.values(course?.concepts || {}))
    .filter((concept) => concept?.id)
    .map((concept) => [concept.id, concept])
);
const courseSkills = new Map(
  (Array.isArray(course?.skills) ? course.skills : Object.values(course?.skills || {}))
    .filter((skill) => skill?.id)
    .map((skill) => [skill.id, skill])
);
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

const REVIEW_SKILL_SAFETY_CAP = 12;
const SPEECH_PROFILE_VERSION = 2;
const LEARNING_PHASES = [
  { id: "learn", label: "سیکھیں", preview: "نئی بات" },
  { id: "understand", label: "سمجھیں", preview: "پہچان" },
  { id: "guided", label: "مدد سے مشق", preview: "مدد کے ساتھ" },
  { id: "use", label: "استعمال کریں", preview: "حقیقی صورت" },
  { id: "check", label: "خود جانچیں", preview: "بغیر مدد" },
  { id: "correction", label: "درستگی", preview: "غلطی سمجھیں" }
];
const MASTERY_RANK = { new: 0, introduced: 1, practiced: 2, secure: 3 };

const defaultProgress = {
  schemaVersion: PROGRESS_SCHEMA_VERSION,
  completedLessons: [],
  scores: {},
  seenQuestionIds: [],
  missionVariantRuns: {},
  skillAttempts: {},
  skillReviewHistory: {},
  lessonMastery: {},
  skillMastery: {},
  lessonRunProgress: {},
  totalXp: 0,
  practiceDays: [],
  stamps: {},
  mistakes: [],
  settings: {
    soundEffects: true,
    pronunciation: true,
    beginnerMode: true,
    largeText: false,
    slowAudio: true,
    extraUrduHelp: true,
    reduceMotion: false,
    haptics: true
  },
  speechProfileVersion: SPEECH_PROFILE_VERSION,
  selectedChapterId: "a0",
  lastLessonId: "a0-greetings-courtesy"
};

let progress = loadProgress();
NU.sound.configure({ enabled: () => Boolean(progress.settings.soundEffects) });
NU.haptics.configure({ enabled: () => progress.settings.haptics !== false });
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
let activeLearningRun = null;
let pendingCorrectionQuestion = null;
let pendingCorrectionQuestions = [];
let correctedCheckQuestionIds = new Set();
let lessonProgressSteps = 0;
let activeWordHelp = null;
let buildAnswerIds = [];
let hintOpen = false;
let activeReview = null;
let pathCardLessonId = "";
let pathExpanded = false;
let lastRenderedScreen = "";
let lastRenderedQuestionId = "";
let lastLessonProgress = null;
let lastRenderedChapterId = "";
let lastTeachingFace = { id: "", step: 0 };
let audioSkipped = false;
let matchSelection = null;
let matchedPairIds = [];
let matchPairError = "";
let typedAnswer = "";
let typedFallback = false;
let lessonDetailKind = "";
let lessonDetailReturnScrollTop = null;
let coachmarkDismissed = false;
let teachingStep = 0;
let preferredDutchVoice = null;
let answerCombo = 0;
let bestAnswerCombo = 0;
let experienceObserver = null;
let globalMotionBound = false;
let pointerFrame = 0;
let scrollFrame = 0;
let worldTransitionTimer = 0;
let effectsProfileRefreshTimer = 0;
let lastPointerPosition = { x: window.innerWidth / 2, y: window.innerHeight * 0.32 };

const prefersReducedMotion = () => effectsProfile === "reduced" || Boolean(reducedMotionQuery?.matches) || Boolean(progress.settings.reduceMotion);
const enhancedInteractiveEffects = () => (
  effectsProfile === "enhanced"
  && (!navigator.webdriver || effectsProfileOverride === "enhanced")
);

function loadProgress() {
  try {
    const currentRaw = localStorage.getItem(STORAGE_KEY);
    const legacyRaw = currentRaw ? null : localStorage.getItem(LEGACY_STORAGE_KEY);
    const stored = JSON.parse(currentRaw || legacyRaw);
    const migrated = !currentRaw && legacyRaw ? migrateLegacyProgress(stored) : stored;
    const storedSettings = migrated?.settings || {};
    const needsSpeechMigration = migrated?.speechProfileVersion !== SPEECH_PROFILE_VERSION;
    const loaded = {
      ...defaultProgress,
      ...migrated,
      schemaVersion: PROGRESS_SCHEMA_VERSION,
      lessonMastery: { ...defaultProgress.lessonMastery, ...(migrated?.lessonMastery || {}) },
      skillMastery: { ...defaultProgress.skillMastery, ...(migrated?.skillMastery || {}) },
      skillReviewHistory: { ...defaultProgress.skillReviewHistory, ...(migrated?.skillReviewHistory || {}) },
      lessonRunProgress: { ...defaultProgress.lessonRunProgress, ...(migrated?.lessonRunProgress || {}) },
      speechProfileVersion: SPEECH_PROFILE_VERSION,
      settings: {
        ...defaultProgress.settings,
        ...storedSettings,
        slowAudio: needsSpeechMigration ? true : storedSettings.slowAudio !== false
      }
    };
    backfillCompletedMastery(loaded);
    if (!currentRaw && legacyRaw) localStorage.setItem(STORAGE_KEY, JSON.stringify(loaded));
    return loaded;
  } catch {
    return { ...defaultProgress };
  }
}

function backfillCompletedMastery(target) {
  const updatedAt = new Date().toISOString();
  const evidence = getLegacySkillEvidence(target);
  for (const lessonId of target.completedLessons || []) {
    const existingLesson = target.lessonMastery[lessonId];
    if (!statusAtLeast(getMasteryStatus(existingLesson), "practiced")) {
      target.lessonMastery[lessonId] = {
        ...(existingLesson || {}),
        status: "practiced",
        restoredFromCompletion: true,
        updatedAt
      };
    }
    for (const [skillId, details] of evidence.entries()) {
      if (details.lessonId !== lessonId) continue;
      const existingSkill = target.skillMastery[skillId];
      if (statusAtLeast(getMasteryStatus(existingSkill), "practiced")) continue;
      target.skillMastery[skillId] = {
        ...(existingSkill || {}),
        status: "practiced",
        lessonId,
        restoredFromCompletion: true,
        updatedAt
      };
    }
  }
}

function migrateLegacyProgress(stored) {
  if (!stored || typeof stored !== "object") return { ...defaultProgress };
  const migratedAt = new Date().toISOString();
  const lessonMastery = { ...(stored.lessonMastery || {}) };
  const skillMastery = { ...(stored.skillMastery || {}) };
  const evidence = getLegacySkillEvidence(stored);
  const completedLessonIds = new Set(stored.completedLessons || []);
  for (const lessonId of stored.completedLessons || []) {
    lessonMastery[lessonId] = {
      ...(lessonMastery[lessonId] || {}),
      status: "practiced",
      migratedFromCompletion: true,
      updatedAt: lessonMastery[lessonId]?.updatedAt || migratedAt
    };
  }
  for (const [skillId, details] of evidence.entries()) {
    const evidencedStatus = completedLessonIds.has(details.lessonId) ? "practiced" : "introduced";
    skillMastery[skillId] = raiseMastery(skillMastery[skillId], evidencedStatus, {
      lessonId: details.lessonId,
      migratedFromEvidence: true,
      updatedAt: skillMastery[skillId]?.updatedAt || migratedAt
    });
  }
  const migrated = {
    ...stored,
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    migratedFrom: LEGACY_STORAGE_KEY,
    migratedAt,
    legacyRecoveryKey: LEGACY_STORAGE_KEY,
    lessonMastery,
    skillMastery,
    lessonRunProgress: { ...(stored.lessonRunProgress || {}) }
  };
  return migrated;
}

function getLegacySkillEvidence(stored) {
  const seenIds = new Set(stored?.seenQuestionIds || []);
  const legacyMistakes = stored?.mistakes || [];
  for (const mistake of legacyMistakes) {
    if (mistake?.questionId) seenIds.add(mistake.questionId);
  }
  const evidence = new Map();
  if (!seenIds.size && !legacyMistakes.length) return evidence;
  for (const lesson of getAllLessons()) {
    for (const question of getLegacyEvidenceExercises(lesson)) {
      const matchesSavedId = seenIds.has(question.id) || seenIds.has(question.legacyId);
      const matchesLegacyMistake = legacyMistakes.some((mistake) => (
        (!mistake.lessonId || mistake.lessonId === lesson.id)
        && mistake.prompt === question.prompt
        && mistake.answer === question.answer
      ));
      if (!matchesSavedId && !matchesLegacyMistake) continue;
      for (const skillId of getQuestionSkillIds(question)) {
        if (!evidence.has(skillId)) evidence.set(skillId, { lessonId: lesson.id, questionId: question.id });
      }
    }
  }
  return evidence;
}

function saveProgress(nextProgress = progress) {
  progress = { ...nextProgress, schemaVersion: PROGRESS_SCHEMA_VERSION };
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

function normalizeIdList(...values) {
  return [...new Set(values.flatMap((value) => {
    if (Array.isArray(value)) return value.map((item) => (typeof item === "object" ? item?.id : item));
    if (typeof value === "string" && value) return [value];
    if (value && typeof value === "object" && value.id) return [value.id];
    return [];
  }).filter(Boolean))];
}

function getLessonLearning(lesson) {
  return lesson?.learning || {};
}

function getLessonExercises(lesson) {
  return Array.isArray(lesson?.exercises) ? lesson.exercises : (lesson?.questions || []);
}

function getLegacyEvidenceExercises(lesson) {
  const seen = new Set();
  return [...getLessonExercises(lesson), ...(lesson?.legacyQuestions || [])].filter((question) => {
    const key = question?.id || question?.legacyId || `${question?.type}|${question?.prompt}|${question?.answer}`;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getLearningRuns(lesson) {
  const learning = getLessonLearning(lesson);
  const runs = Array.isArray(learning.runs) ? learning.runs : [];
  if (runs.length) return runs.map((run, index) => ({
    ...run,
    id: run.id || `${lesson.id}-run-${index + 1}`
  }));
  return [];
}

function getRunTargetCap(lesson, run) {
  const chapterId = getChapterForLesson(lesson.id)?.id || String(lesson.id || "").slice(0, 2);
  if (chapterId === "a1") return 5;
  if (chapterId === "a2") return 4;
  return run?.patternId || run?.pattern ? 3 : 4;
}

function capLearningRun(lesson, run) {
  if (!run) return null;
  const cap = getRunTargetCap(lesson, run);
  const declaredConceptIds = normalizeIdList(run.conceptIds, run.concepts?.map((item) => item.id || item));
  const declaredNewConceptIds = normalizeIdList(run.newConceptIds);
  const newConceptIds = (declaredNewConceptIds.length ? declaredNewConceptIds : declaredConceptIds).slice(0, cap);
  const reviewConceptIds = normalizeIdList(run.reviewConceptIds);
  const conceptIds = normalizeIdList(newConceptIds, reviewConceptIds);
  const conceptSet = new Set(conceptIds);
  const teachingBlocks = (run.teachingBlocks || run.teaching || run.blocks || []).filter((block) => {
    const conceptId = block?.conceptId || block?.concept?.id;
    return !conceptId || conceptSet.has(conceptId);
  });
  const relatedSkillIds = conceptIds.flatMap((conceptId) => normalizeIdList(courseConcepts.get(conceptId)?.skillIds));
  const skillIds = normalizeIdList(run.skillIds, relatedSkillIds).filter((skillId) => {
    const skill = courseSkills.get(skillId);
    const ownedConceptIds = normalizeIdList(skill?.conceptIds, skill?.conceptId);
    if (ownedConceptIds.length) return ownedConceptIds.some((conceptId) => conceptSet.has(conceptId));
    if (skill?.patternId) return !run.patternId || skill.patternId === run.patternId;
    return true;
  });
  return {
    ...run,
    conceptIds,
    newConceptIds,
    reviewConceptIds,
    skillIds,
    teachingBlocks,
    capApplied: (declaredNewConceptIds.length || declaredConceptIds.length) > newConceptIds.length
  };
}

function selectLearningRun(lesson) {
  const runs = getLearningRuns(lesson);
  if (!runs.length) return null;
  const runState = progress.lessonRunProgress?.[lesson.id] || {};
  const completedRunIds = new Set(runState.completedRunIds || []);
  const secureRunIds = new Set(runState.secureRunIds || []);
  const preferred = runs.find((run) => !completedRunIds.has(run.id))
    || runs.find((run) => !secureRunIds.has(run.id))
    || runs[runs.length - 1];
  return capLearningRun(lesson, preferred);
}

function getLessonConceptIds(lesson, run = null) {
  const learning = getLessonLearning(lesson);
  const runs = run ? [run] : getLearningRuns(lesson);
  return normalizeIdList(
    run ? [] : learning.conceptIds,
    run ? [] : lesson?.conceptIds,
    runs.flatMap((item) => item.conceptIds || [])
  );
}

function getLessonSkillIds(lesson, run = null) {
  const learning = getLessonLearning(lesson);
  const runs = run ? [run] : getLearningRuns(lesson);
  return normalizeIdList(
    run ? [] : learning.skillIds,
    run ? [] : lesson?.skillIds,
    runs.flatMap((item) => item.skillIds || []),
    getLessonConceptIds(lesson, run).flatMap((conceptId) => courseConcepts.get(conceptId)?.skillIds || [])
  );
}

function getQuestionSkillIds(question) {
  const canonicalSkillIds = normalizeIdList(question?.skillIds);
  return canonicalSkillIds.length ? canonicalSkillIds : normalizeIdList(question?.skillId);
}

function getQuestionConceptIds(question) {
  return normalizeIdList(question?.conceptIds, question?.conceptId);
}

function getMasteryStatus(record) {
  return record?.status && MASTERY_RANK[record.status] != null ? record.status : "new";
}

function getSkillStatus(skillId) {
  return getMasteryStatus(progress.skillMastery?.[skillId]);
}

function getLessonStatus(lessonId) {
  return getMasteryStatus(progress.lessonMastery?.[lessonId]);
}

function statusAtLeast(status, minimum) {
  return (MASTERY_RANK[status] || 0) >= (MASTERY_RANK[minimum] || 0);
}

function getPrerequisiteSkillIds(lesson, run = null) {
  const learning = getLessonLearning(lesson);
  return normalizeIdList(
    run?.prerequisiteSkillIds,
    learning.prerequisiteSkillIds,
    learning.prerequisites,
    lesson?.prerequisiteSkillIds,
    lesson?.prerequisites,
    lesson?.mission?.prerequisiteSkillIds
  );
}

function getMissionAssessmentSkillIds(lesson) {
  const learning = getLessonLearning(lesson);
  const declaredSkillIds = normalizeIdList(
    lesson?.assessmentSkillIds,
    lesson?.mission?.assessmentSkillIds,
    learning.assessmentSkillIds
  );
  if (declaredSkillIds.length) return declaredSkillIds;
  return normalizeIdList(
    getLessonSkillIds(lesson),
    getLessonExercises(lesson).flatMap(getQuestionSkillIds)
  );
}

function getMissingPrerequisites(lesson, run = null) {
  const requiredStatus = lesson?.kind === "mission" ? "practiced" : "secure";
  const requiredIds = lesson?.kind === "mission"
    ? normalizeIdList(getPrerequisiteSkillIds(lesson, run), getMissionAssessmentSkillIds(lesson))
    : getPrerequisiteSkillIds(lesson, run);
  return requiredIds.filter((skillId) => !statusAtLeast(getSkillStatus(skillId), requiredStatus));
}

function getMissionPrerequisiteIds(lesson) {
  return lesson?.kind === "mission" ? normalizeIdList(lesson.prerequisiteMissionIds) : [];
}

function getMissingMissionPrerequisites(lesson) {
  return getMissionPrerequisiteIds(lesson).filter((missionId) => (
    !statusAtLeast(getLessonStatus(missionId), "practiced")
  ));
}

function getSkillDisplayName(skillId) {
  const skill = courseSkills.get(skillId);
  const conceptId = skill?.conceptId || normalizeIdList(skill?.conceptIds)[0];
  const concept = conceptId ? courseConcepts.get(conceptId) : null;
  const label = concept?.dutch
    || skill?.titleUrdu
    || skill?.labelUrdu
    || skill?.canDoUrdu
    || skill?.urdu
    || skill?.name
    || skill?.title
    || skillId;
  return String(label).replace(/\s+سمجھنا اور استعمال کرنا$/u, "");
}

function getConceptSkillIds(concept, run) {
  return normalizeIdList(
    concept?.skillIds,
    (run?.skillIds || []).filter((skillId) => {
      const skill = courseSkills.get(skillId);
      return skill?.conceptId === concept?.id || normalizeIdList(skill?.conceptIds).includes(concept?.id);
    })
  );
}

function getPatternSkillIds(pattern, run) {
  return normalizeIdList(
    pattern?.skillIds,
    (run?.skillIds || []).filter((skillId) => {
      const skill = courseSkills.get(skillId);
      return skill?.patternId === pattern?.id
        || skill?.targetId === pattern?.id
        || (skill?.kind === "pattern" && (!pattern?.id || String(skillId).includes(pattern.id)));
    })
  );
}

function getLessonOutcome(lesson) {
  const learning = getLessonLearning(lesson);
  return learning.outcomeUrdu || learning.outcome || lesson?.outcomeUrdu || lesson?.goal || lesson?.description || "اس سبق کی بات سمجھ کر روزمرہ میں استعمال کریں۔";
}

function getLessonMinutes(lesson) {
  const learning = getLessonLearning(lesson);
  const runs = getLearningRuns(lesson);
  if (lesson?.kind !== "mission" && runs.length) {
    return Math.max(1, Math.round(Number(learning.estimatedMinutes || runs.length * 8) / runs.length));
  }
  return Number(learning.estimatedMinutes || lesson?.estimatedMinutes || 6);
}

function raiseMastery(record, nextStatus, details = {}) {
  const currentStatus = getMasteryStatus(record);
  const status = statusAtLeast(currentStatus, nextStatus) ? currentStatus : nextStatus;
  return { ...(record || {}), ...details, status, updatedAt: new Date().toISOString() };
}

function persistSkillMastery(skillIds, status, details = {}) {
  const skillMastery = { ...(progress.skillMastery || {}) };
  for (const skillId of skillIds) {
    skillMastery[skillId] = raiseMastery(skillMastery[skillId], status, details);
  }
  const lesson = getActiveLesson();
  const lessonMastery = { ...(progress.lessonMastery || {}) };
  if (lesson
    && !lesson.reviewKind
    && details.updateLesson !== false
    && (status !== "introduced" || details.phaseComplete)) {
    lessonMastery[lesson.id] = raiseMastery(lessonMastery[lesson.id], status, details);
  }
  saveProgress({ ...progress, skillMastery, lessonMastery });
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

function reviewableLessonsInOrder() {
  return getAllLessons().filter((lesson) => (
    lesson.kind !== "mission"
    && (
      progress.completedLessons.includes(lesson.id)
      || statusAtLeast(getLessonStatus(lesson.id), "introduced")
    )
  ));
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
  const reviewable = reviewableLessonsInOrder();
  const sourceLessons = reviewable.length
    ? reviewable
    : [getLesson(progress.lastLessonId || getNextLessonForChapter().id)];
  return pickReviewQuestions(sourceLessons);
}

function getOldLessonReviewQuestions() {
  const reviewable = reviewableLessonsInOrder();
  const olderLessons = reviewable.filter((lesson) => lesson.id !== progress.lastLessonId);
  return pickReviewQuestions(olderLessons.length ? olderLessons : reviewable);
}

function getMistakeReviewQuestions() {
  const seen = new Set();
  const questions = [];
  for (const mistake of [...progress.mistakes].reverse()) {
    const key = mistakeKey(mistake);
    if (seen.has(key)) continue;
    const question = findQuestionForMistake(mistake);
    if (!question || !isQuestionEligibleForReview(question)) continue;
    seen.add(key);
    questions.push(prepareAdaptiveReviewQuestion(question, { mistakeOrigin: { ...mistake } }));
    if (questions.length >= REVIEW_SKILL_SAFETY_CAP) break;
  }
  return questions;
}

function pickReviewQuestions(lessons) {
  const candidates = shuffleArray(lessons.flatMap((lesson) => getLessonExercises(lesson)
    .filter((question) => !isInfoQuestion(question) && isQuestionEligibleForReview(question))
    .map((question) => prepareAdaptiveReviewQuestion(question))));
  candidates.sort((left, right) => reviewPriority(left) - reviewPriority(right));
  const coveredSkillIds = new Set();
  const selected = [];
  for (const question of candidates) {
    const skillIds = getQuestionSkillIds(question);
    if (skillIds.length && skillIds.every((skillId) => coveredSkillIds.has(skillId))) continue;
    selected.push(question);
    skillIds.forEach((skillId) => coveredSkillIds.add(skillId));
    if (selected.length >= REVIEW_SKILL_SAFETY_CAP) break;
  }
  return selected;
}

function reviewPriority(question) {
  const skillIds = getQuestionSkillIds(question);
  if (!skillIds.length) return 1;
  return Math.min(...skillIds.map((skillId) => {
    const attempts = progress.skillAttempts?.[skillId] || { correct: 0, total: 0 };
    const accuracy = attempts.total ? attempts.correct / attempts.total : 0;
    const status = getSkillStatus(skillId);
    const statusWeight = status === "introduced" ? 0 : status === "practiced" ? 0.15 : 0.3;
    const reviewHistory = progress.skillReviewHistory?.[skillId];
    const nextDueAt = Date.parse(reviewHistory?.nextDueAt || "");
    const dueWeight = !Number.isFinite(nextDueAt) || Date.now() >= nextDueAt ? 0 : 1.5;
    return accuracy + statusWeight + dueWeight;
  }));
}

function isQuestionEligibleForReview(question) {
  if (question.adaptiveReviewEligible === false) return false;
  const skillIds = getQuestionSkillIds(question);
  if (!skillIds.length || !skillIds.every((skillId) => statusAtLeast(getSkillStatus(skillId), "introduced"))) {
    return false;
  }
  const hasIntroducedOnlySkill = skillIds.some((skillId) => getSkillStatus(skillId) === "introduced");
  if (!hasIntroducedOnlySkill) return true;
  return getQuestionPhase(question) === "understand"
    && ["meaning", "listen-choice", "image-choice", "match-pairs", "document-choice"].includes(question.type);
}

function prepareAdaptiveReviewQuestion(question, extra = {}) {
  return {
    ...cloneQuestion(question),
    ...extra,
    phase: "guided",
    supported: true,
    adaptiveReview: true,
    instructionUrdu: question.reviewInstructionUrdu
      || question.instructionUrdu
      || question.instruction
      || "پہلے سیکھی ہوئی بات کو مدد کے ساتھ دوبارہ مضبوط کریں۔",
    hint: question.hint
      || question.hintUrdu
      || "ضرورت ہو تو پہلے سکھایا ہوا معنی، آواز، یا مثال یاد کریں۔"
  };
}

function updateSkillReviewHistory(previousHistory, answers) {
  const history = { ...(previousHistory || {}) };
  const results = new Map();
  for (const answer of answers.filter((item) => item.phase !== "correction")) {
    for (const skillId of normalizeIdList(answer.skillIds, answer.skillId)) {
      const result = results.get(skillId) || { correct: 0, total: 0 };
      result.correct += answer.correct ? 1 : 0;
      result.total += 1;
      results.set(skillId, result);
    }
  }
  const now = new Date();
  const successfulIntervals = [1, 3, 7, 14, 30];
  for (const [skillId, result] of results.entries()) {
    const previous = history[skillId] || {};
    const reviewCount = Number(previous.reviewCount || 0) + 1;
    const successful = result.total > 0 && result.correct / result.total >= 0.8;
    const successfulStreak = successful ? Number(previous.successfulStreak || 0) + 1 : 0;
    const intervalDays = successful
      ? successfulIntervals[Math.min(successfulStreak - 1, successfulIntervals.length - 1)]
      : 1;
    const nextDue = new Date(now);
    nextDue.setDate(nextDue.getDate() + intervalDays);
    history[skillId] = {
      ...previous,
      reviewCount,
      successfulStreak,
      lastReviewedAt: now.toISOString(),
      nextDueAt: nextDue.toISOString(),
      intervalDays,
      lastCorrect: result.correct,
      lastTotal: result.total
    };
  }
  return history;
}

function cloneQuestion(question) {
  return {
    ...question,
    options: question.options ? [...question.options] : undefined,
    tiles: question.tiles ? [...question.tiles] : undefined
  };
}

function findQuestionForMistake(mistake) {
  const allQuestions = getAllLessons().flatMap((item) => getLessonExercises(item));
  const legacyQuestions = getAllLessons().flatMap((item) => item.legacyQuestions || []);
  const lesson = getAllLessons().find((item) => item.id === mistake.lessonId);
  const lessonQuestions = lesson ? getLegacyEvidenceExercises(lesson) : [];
  const sourceQuestion = [...lessonQuestions, ...allQuestions, ...legacyQuestions].find((question) => (
    (mistake.questionId && (question.id === mistake.questionId || question.legacyId === mistake.questionId))
    || (question.prompt === mistake.prompt && question.answer === mistake.answer)
  ));
  if (sourceQuestion
    && allQuestions.includes(sourceQuestion)
    && !isInfoQuestion(sourceQuestion)
    && isQuestionEligibleForReview(sourceQuestion)) {
    return sourceQuestion;
  }
  const skillIds = normalizeIdList(
    mistake.skillIds,
    mistake.skillId,
    sourceQuestion ? getQuestionSkillIds(sourceQuestion) : []
  );
  if (!skillIds.length) return null;
  return allQuestions.find((question) => (
    !isInfoQuestion(question)
    && question.id !== sourceQuestion?.id
    && getQuestionSkillIds(question).some((skillId) => skillIds.includes(skillId))
    && isQuestionEligibleForReview(question)
  )) || null;
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
  const renderedQuestionId = lastRenderedScreen === "lesson" ? lastRenderedQuestionId : "";
  const nextQuestionId = screen === "lesson" ? String(getActiveQuestion()?.id || "") : "";
  const sameQuestionScrollTop = renderedQuestionId && renderedQuestionId === nextQuestionId
    ? getLessonContentScrollTop()
    : null;
  const screenChanged = screen !== lastRenderedScreen;
  const chapterChanged = selectedChapterId !== lastRenderedChapterId;
  lastRenderedChapterId = selectedChapterId;
  if (screenChanged && screen !== "lesson") {
    lessonDetailKind = "";
    lessonDetailReturnScrollTop = null;
    teachingStep = 0;
    coachmarkDismissed = false;
    hintOpen = false;
    lastRenderedQuestionId = "";
  }
  if (screenChanged) OpenDoor.prepareTransition({ screen, previous: lastRenderedScreen, reduced: prefersReducedMotion() });
  app.classList.toggle("screen-changing", screenChanged);
  document.body.dataset.screen = screen;
  const previousScreen = lastRenderedScreen;
  NU.motion.capture(app);
  try {
    app.innerHTML = `
      ${renderExperienceBackdrop()}
      ${screen === "home" ? renderHome() : ""}
      ${screen === "preview" ? renderLessonPreview() : ""}
      ${screen === "lesson" ? renderLesson() : ""}
      ${screen === "complete" ? renderComplete() : ""}
      ${screen === "practice" ? renderPracticeScreen() : ""}
      ${screen === "journey" ? renderJourney() : ""}
      ${screen === "toolkit" ? renderToolkit() : ""}
      ${screen === "letters" ? renderLetters() : ""}
      ${screen === "settings" ? renderSettings() : ""}
      ${screen === "passport" ? renderPassport() : ""}
      ${renderBottomNav()}
    `;
  } catch (error) {
    console.error("NederUrdu render failed", error);
    screen = "home";
    activeReview = null;
    app.innerHTML = `
      ${renderTopbar()}
      <section class="state-panel pl-state">
        <span class="pl-empty-pim" aria-hidden="true">${NU.cat.render({ size: 120, mood: "sad" })}</span>
        <h1>سبق کھل نہیں سکا</h1>
        <p class="lead">براہ کرم دوبارہ کوشش کریں۔</p>
        <button class="primary-button" data-action="home">گھر جائیں</button>
      </section>
      ${renderBottomNav()}
    `;
  }
  bindEvents();
  bindExperienceMotion(screenChanged, previousScreen);
  // Callers scroll to the top after rendering; measure destinations after that but before paint.
  queueMicrotask(() => NU.motion.morph(app));
  if (screen === "home") NU.street.mount(app.querySelector(".street"), { entered: screenChanged });
  flipTeachingCard();
  animatePreviewScene(screenChanged);
  if (screen === "journey") NU.map.mount(app.querySelector(".map"), { entered: screenChanged || chapterChanged, onOpen: showLessonPreview });
  animateLessonProgress();
  lastRenderedScreen = screen;
  if (sameQuestionScrollTop !== null
    && screen === "lesson"
    && String(getActiveQuestion()?.id || "") === nextQuestionId) {
    restoreLessonContentScrollTop(sameQuestionScrollTop);
  }
}

function renderExperienceBackdrop() {
  return navigator.onLine ? "" : `<div class="od-offline pl-offline" role="status"><span aria-hidden="true">${NU.cat.render({ face: true, size: 30 })}</span>آف لائن ہیں — اسباق پھر بھی چلتے ہیں۔</div>`;
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
  return `<header class="progress-header">
    <button class="brand-lockup" data-action="home" aria-label="آج — NederUrdu"><span class="pl-brand-face">${NU.cat.render({ face: true, size: 40 })}</span><span class="brand-lockup-copy"><strong class="latin">NederUrdu</strong><small>اردو سے Nederlands تک</small></span></button>
    <button class="od-level latin" data-action="journey" aria-label="اپنی سطح اور سفر دیکھیں">${escapeHtml(getSelectedChapter().id.toUpperCase())}</button>
    <button class="od-profile" data-action="settings" aria-label="ترتیبات">${renderIcon("settings")}</button>
  </header>`;
}

// Consecutive practice days ending today (or yesterday, so the streak survives until tonight).
function getPracticeStreak() {
  const days = new Set(progress.practiceDays || []);
  const cursor = new Date();
  if (!days.has(cursor.toISOString().slice(0, 10))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  let streak = 0;
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

function renderHome() {
  const chapter = getSelectedChapter();
  const nextLesson = getNextLessonForChapter(chapter);
  activeLessonId = nextLesson.id;
  const completed = chapterCompletedCount(chapter);
  const situation = OpenDoor.situation(nextLesson);
  return `<main class="learn-screen od-today pl-today">
    ${renderProgressHeader()}
    ${NU.street.render({ lesson: { id: nextLesson.id, title: getShortLessonTitle(nextLesson) }, situation: situation[1], streak: getPracticeStreak(), xp: progress.totalXp || 0 })}
    <section class="today-panel">
      <div class="today-kicker"><span class="today-tag latin">${chapter.id.toUpperCase()}</span><span class="today-tag blue">${renderIcon("calendar")}${getLessonMinutes(nextLesson)} منٹ</span><span class="today-tag blue latin">${escapeHtml(situation[1])}</span></div>
      <h2>${getShortLessonTitle(nextLesson)}</h2><p>${escapeHtml(getLessonOutcome(nextLesson) || nextLesson.description)}</p>
      <button class="primary-button today-action" data-action="preview" data-lesson="${escapeAttr(nextLesson.id)}">${renderIcon("play")}<span>${isBeginnerFirstHome() ? "پہلا سبق شروع کریں" : "سبق جاری رکھیں"}</span></button>
    </section>
    <section class="od-progress"><div><strong>آپ کا سفر</strong><small>${completed} / ${chapter.lessons.length} سبق مکمل</small></div><button class="text-button" data-action="journey">سفر دیکھیں ${renderIcon("arrow")}</button><div class="od-progress-track"><span style="width:${Math.round(completed / Math.max(1,chapter.lessons.length)*100)}%"></span></div></section>
    <section class="od-support"><span>${renderIcon("speaker")}</span><p><strong>پہلے سمجھیں، پھر کہیں۔</strong><small>معنی، آواز اور مثال کے بعد اپنی بات کہیں۔</small></p><button class="od-profile" data-action="letters" aria-label="حروف اور آوازیں">${renderIcon("chevron")}</button></section>
  </main>`;
}

function renderJourney() {
  const chapter = getSelectedChapter();
  const next = getNextLessonForChapter(chapter);
  const toStop = (lesson, trophy = false) => ({
    id: lesson.id,
    title: getShortLessonTitle(lesson),
    minutes: getLessonMinutes(lesson),
    done: progress.completedLessons.includes(lesson.id),
    secure: getLessonStatus(lesson.id) === "secure",
    current: lesson.id === next.id,
    mission: lesson.kind === "mission",
    trophy
  });
  const grouped = new Set((chapter.subchapters || []).flatMap((unit) => unit.lessonIds));
  const units = (chapter.subchapters?.length ? chapter.subchapters : [{ id: chapter.id, title: chapter.title, lessonIds: chapter.lessons.map((l) => l.id) }])
    .map((unit) => ({ id: unit.id, title: unit.title, goal: unit.goal, lessons: subchapterLessons(unit).map((lesson) => toStop(lesson)) }));
  // Lessons outside the units (the chapter's final mission) become the trophy stop at the end of the road.
  const finale = chapter.lessons.filter((lesson) => !grouped.has(lesson.id));
  if (chapter.subchapters?.length && finale.length) {
    units.push({ id: `${chapter.id}-finale`, title: `${chapter.id.toUpperCase()} آخری مشن`, goal: "پورے باب کی باتیں ایک مسلسل روزمرہ مشن میں استعمال کریں۔", trophy: true, lessons: finale.map((lesson) => toStop(lesson, true)) });
  }
  return `<main class="utility-screen journey-screen pl-journey">${renderProgressHeader()}${renderChapterSwitcher()}${NU.map.render({ chapter, units, completed: chapterCompletedCount(chapter), total: chapter.lessons.length, nextChapter: chapters[chapters.indexOf(chapter) + 1] || null })}</main>`;
}

function renderToolkit() {
  const learned = [...courseConcepts.values()].filter(concept => {
    const skills = getConceptSkillIds(concept, { skillIds: [...courseSkills.keys()] });
    return skills.length && skills.some(id => statusAtLeast(getSkillStatus(id), "introduced"));
  });
  const allSkills = { skillIds: [...courseSkills.keys()] };
  const patterns = (Array.isArray(course?.patterns) ? course.patterns : Object.values(course?.patterns || {})).filter(pattern => normalizeIdList(getPatternSkillIds(pattern, allSkills), pattern.skillId).some(id => statusAtLeast(getSkillStatus(id), "introduced")));
  return `<main class="utility-screen toolkit-screen pl-utility">${renderProgressHeader()}
    ${renderScreenHero({ tone: "purple", title: "مددگار", subtitle: "سیکھی ہوئی باتیں، معنی اور آواز ایک جگہ۔", stats: [[learned.length, "الفاظ"], [patterns.length, "جملوں کے نمونے"]] })}
    <button class="pl-row-link pl-row-purple" data-action="letters"><span class="pl-row-icon">${renderIcon("alphabet")}</span><span class="pl-row-copy"><strong>Nederlands حروف اور آوازیں</strong><small>حروف سنیں، لفظ کے ساتھ دہرائیں۔</small></span><b aria-hidden="true">‹</b></button>
    <section class="od-tool-section">
      <h2>آپ کے الفاظ <small class="latin">${learned.length}</small></h2>
      ${learned.length ? `
        <label class="pl-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="m16 16 4.5 4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg><input type="search" data-word-filter placeholder="لفظ یا مطلب تلاش کریں" aria-label="الفاظ تلاش کریں" autocomplete="off" /></label>
        <div class="od-word-list">${learned.map(concept => `<article class="od-word" data-search="${escapeAttr(`${concept.dutch || ""} ${concept.urdu || ""}`.toLowerCase())}"><div><strong class="latin">${escapeHtml(concept.dutch || "")}</strong><p>${escapeHtml(concept.urdu || "")}</p>${concept.pronunciationUrdu ? `<small>${escapeHtml(concept.pronunciationUrdu)}</small>` : ""}</div>${renderSpeakButton(concept.audioText || concept.dutch, "toolkit")}</article>`).join("")}</div>
        <p class="pl-search-empty" hidden>اس تلاش سے کوئی لفظ نہیں ملا۔</p>`
      : renderEmptyState("پہلے سبق سے آغاز کریں", "سیکھنے کے بعد آپ کے الفاظ اور ان کی آوازیں یہاں آ جائیں گی۔", "home", "آج کا سبق")}
    </section>
    <section class="od-tool-section">
      <h2>گرامر کی یاد دہانی <small class="latin">${patterns.length}</small></h2>
      ${patterns.length ? patterns.map(pattern => `<article class="od-word od-grammar"><div><h3 class="latin">${escapeHtml(pattern.modelDutch || pattern.modelSentence || pattern.sentence || pattern.title || pattern.dutch || "")}</h3><p>${escapeHtml(pattern.ruleUrdu || pattern.explanationUrdu || pattern.urdu || "")}</p></div>${renderSpeakButton(pattern.audioText || pattern.modelDutch, "toolkit")}</article>`).join("") : `<p class="od-muted">گرامر سیکھنے کے بعد اس کی یاد دہانی یہاں نظر آئے گی۔</p>`}
    </section></main>`;
}

function renderEmptyState(title, text, action, label) {
  return `<div class="od-empty pl-empty"><span class="pl-empty-pim" aria-hidden="true">${NU.cat.render({ size: 120 })}</span><h3>${title}</h3><p>${text}</p><button class="primary-button" data-action="${action}">${label}</button></div>`;
}

// Shared header for the utility screens: a coloured card with Pim, a title and optional stat chips.
function renderScreenHero({ tone, title, subtitle, mood = "idle", stats = [], back = "", className = "" }) {
  return `<section class="pl-hero pl-hero-${tone} ${className}">
    ${back ? `<button class="quiz-close pl-hero-back" data-action="${back}" aria-label="واپس جائیں">${renderIcon("close")}</button>` : ""}
    <span class="pl-hero-pim" aria-hidden="true">${NU.cat.render({ face: true, size: 62, mood })}</span>
    <div class="pl-hero-copy"><h1>${title}</h1><p>${subtitle}</p>${stats.length ? `<div class="pl-hero-stats">${stats.map(([value, label]) => `<span><b class="latin">${value}</b>${label}</span>`).join("")}</div>` : ""}</div>
  </section>`;
}

function goDestination(destination) {
  activeWordHelp = null; lessonDetailKind = ""; teachingStep = 0; coachmarkDismissed = false; activeReview = null;
  screen = destination; render(); scrollToTop();
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
  const owningSection = chapter.subchapters?.find((item) => item.lessonIds.includes(lessonId));
  if (owningSection) return owningSection;
  if (lessonId === chapter.contract?.completionMissionId) {
    return {
      id: `${chapter.id}-chapter-completion`,
      title: `${chapter.id.toUpperCase()} آخری عملی جانچ`,
      goal: "نو حصوں کی پہلے سیکھی ہوئی باتیں ایک مسلسل روزمرہ مشن میں استعمال کریں۔",
      practice: "تمام یونٹ مشن مکمل ہونے کے بعد معنی، سننا، پڑھنا، بولنے کی مدد، اور عملی استعمال جانچیں۔"
    };
  }
  return chapter.subchapters?.[0];
}

function renderUnitCard(chapter, nextLesson) {
  const section = getSubchapterForLesson(chapter, nextLesson.id);
  const completed = chapterCompletedCount(chapter);
  const percent = Math.round((completed / Math.max(1, chapter.lessons.length)) * 100);
  const visual = getVisualForSubchapter(section || { id: chapter.id, title: chapter.title, goal: chapter.subtitle, practice: "" }, nextLesson);
  return `
    <button class="unit-card chapter-${chapter.id}" data-action="preview" data-lesson="${nextLesson.id}">
      <span class="unit-card-aura" aria-hidden="true"></span>
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
  const unitGroups = chapter.subchapters?.length
    ? chapter.subchapters.map((section) => ({ section, lessons: subchapterLessons(section) }))
    : [{ section: { title: chapter.title }, lessons: chapter.lessons }];
  const groupedLessonIds = new Set(unitGroups.flatMap(({ lessons }) => lessons.map((lesson) => lesson.id)));
  const ungroupedLessons = chapter.lessons.filter((lesson) => !groupedLessonIds.has(lesson.id));
  const groups = ungroupedLessons.length
    ? [...unitGroups, {
      section: {
        id: `${chapter.id}-chapter-completion`,
        title: `${chapter.id.toUpperCase()} آخری عملی جانچ`,
        goal: "تمام یونٹ مشن کے بعد باب کی آخری عملی جانچ۔"
      },
      lessons: ungroupedLessons
    }]
    : unitGroups;
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
      <span>${pathExpanded ? "مختصر راستہ دکھائیں" : `پورا راستہ دیکھیں${hiddenGroupCount ? ` · مزید ${hiddenGroupCount} حصے` : ""}`}</span>
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
      <div class="node-copy"><span>${completed ? "مکمل سبق" : current ? "ابھی سیکھیں" : locked ? "اگلا مرحلہ" : "دستیاب"}</span><strong>${getShortLessonTitle(lesson)}</strong><small>تقریباً ${getLessonMinutes(lesson)} منٹ · ${getLessonStatus(lesson.id) === "secure" ? "مہارت پکی" : lesson.kind === "mission" ? "عملی مشن کے 4 مرحلے" : "6 سیکھنے کے مرحلے"}</small></div>
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
      <small>تقریباً ${getLessonMinutes(lesson)} منٹ · پہلے سیکھیں، پھر خود جانچیں</small>
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
        <strong class="unit-title ${isDutchText(getShortLessonTitle(lesson)) ? "latin" : ""}" dir="auto">${getShortLessonTitle(lesson)}</strong>
        <p class="unit-meta">تقریباً ${getLessonMinutes(lesson)} منٹ · ${getLessonStatus(lesson.id) === "secure" ? "مہارت پکی" : lesson.kind === "mission" ? "عملی مشن کے 4 مرحلے" : "سیکھنے کے 6 مرحلے"}</p>
      </span>
      <span class="status-dot ${done ? "done" : ""}"></span>
    </button>
  `;
}

function renderLessonPreview() {
  const lesson = getLesson(previewLessonId);
  if (!lesson) return renderMissingLesson();
  const chapter = getChapterForLesson(lesson.id);
  const run = selectLearningRun(lesson);
  const lessonRuns = getLearningRuns(lesson);
  const runNumber = run ? lessonRuns.findIndex((item) => item.id === run.id) + 1 : 0;
  const conceptIds = getLessonConceptIds(lesson, run);
  const prerequisiteIds = getPrerequisiteSkillIds(lesson, run);
  const missingPrerequisites = getMissingPrerequisites(lesson, run);
  const missingMissionPrerequisites = getMissingMissionPrerequisites(lesson);
  const missionBlocked = lesson.kind === "mission"
    && (missingPrerequisites.length > 0 || missingMissionPrerequisites.length > 0);
  const previewPhases = getLessonDisplayPhases(lesson);
  const masteryStatus = getLessonStatus(lesson.id);
  const completedRunIds = new Set(progress.lessonRunProgress?.[lesson.id]?.completedRunIds || []);
  const hasIncompleteRuns = lessonRuns.some((item) => !completedRunIds.has(item.id));
  const masteryLabels = {
    new: "ابھی شروع نہیں",
    introduced: "تعارف مکمل",
    practiced: "مشق مکمل",
    secure: "مہارت پکی"
  };
  const knownNames = normalizeIdList(
    prerequisiteIds,
    (run?.reviewConceptIds || []).flatMap((conceptId) => courseConcepts.get(conceptId)?.skillIds || [])
  )
    .filter((skillId) => statusAtLeast(getSkillStatus(skillId), "introduced"))
    .map(getSkillDisplayName);
  const prerequisiteSummary = knownNames.length
    ? knownNames.join("، ")
    : prerequisiteIds.length
      ? "اس سبق کی پچھلی ضروری باتیں ابھی مشق کی محتاج ہیں؛ اوپر دی گئی یاد دہانی دیکھیں۔"
      : "اس سبق کے لیے کوئی لازمی پچھلی بات نہیں۔";
  const newNames = (run?.newConceptIds?.length ? run.newConceptIds : conceptIds).map((conceptId) => {
    const concept = courseConcepts.get(conceptId);
    return concept?.dutch || concept?.title || conceptId;
  });
  if (run?.patternId && lesson.pattern) {
    newNames.push(`جملے کا طریقہ: ${lesson.pattern.titleUrdu || lesson.pattern.modelDutch || run.patternId}`);
  }
  const targetCount = conceptIds.length + (run?.patternId ? 1 : 0);
  const startLabel = missionBlocked
    ? "پہلے تیاری مکمل کریں"
    : lesson.kind === "mission"
      ? "مشن شروع کریں"
      : lessonRuns.length > 1 && hasIncompleteRuns && runNumber > 1
        ? "اگلا حصہ سیکھیں"
        : masteryStatus === "new"
          ? "سیکھنا شروع کریں"
          : "سبق دوبارہ کریں";

  const unit = getSubchapterForLesson(chapter, lesson.id);
  return `
    <main class="learning-preview pl-preview chapter-${chapter.id} ${lesson.kind === "mission" ? "mission-preview" : ""}">
      ${renderProgressHeader()}
      ${renderPreviewScene(lesson, chapter, unit)}
      <section class="learning-preview-hero">
        <button class="quiz-close" data-action="home" aria-label="سبق کے نقشے پر واپس جائیں">${renderIcon("close")}</button>
        <div class="pl-preview-tags">
          <span class="eyeline">${lesson.kind === "mission" ? "عملی مشن" : "اگلا سیکھنے کا قدم"}</span>
          <span class="mastery-badge mastery-${masteryStatus}">${masteryLabels[masteryStatus]}</span>
        </div>
        ${unit?.title ? `<span class="pl-preview-unit">${escapeHtml(unit.title)}</span>` : ""}
        <h1>${escapeHtml(getShortLessonTitle(lesson))}</h1>
        <p class="learning-preview-goal"><strong>اس سبق کے بعد آپ:</strong> ${escapeHtml(run?.outcomeUrdu || getLessonOutcome(lesson))}</p>
        <div class="learning-preview-meta">
          <span>${renderIcon("calendar")} تقریباً <b class="latin">${getLessonMinutes(lesson)}</b> منٹ</span>
          <span>${renderIcon("book")} <b class="latin">${targetCount || 1}</b> سیکھنے کے ہدف${lessonRuns.length > 1 ? ` · حصہ <b class="latin">${runNumber}/${lessonRuns.length}</b>` : ""}</span>
          <span>${renderIcon("speaker")} آواز اور آہستہ تلفظ</span>
        </div>
      </section>

      ${renderPrerequisiteGuidance(lesson, prerequisiteIds, missingPrerequisites, missingMissionPrerequisites)}

      <section class="learning-preview-content">
        <div class="learning-preview-column">
          <span class="eyeline">${lesson.kind === "mission" ? "اس مشن میں استعمال ہونے والی سیکھی ہوئی باتیں" : "اس بار کیا نیا ہے؟"}</span>
          <div class="learning-preview-targets">
            ${(newNames.length ? newNames : [lesson.unit]).map((name) => `<span class="learning-target ${isDutchText(name) ? "latin" : ""}">${escapeHtml(name)}</span>`).join("")}
          </div>
        </div>
        <div class="learning-preview-column">
          <span class="eyeline">پہلے سے سیکھی ہوئی یا ضروری باتیں</span>
          <p>${escapeHtml(prerequisiteSummary)}</p>
        </div>
      </section>

      <section class="learning-preview-phases" aria-label="سبق کے مرحلے">
        ${previewPhases.map((phase, index) => `
          <span class="learning-phase-chip phase-${phase.id}">
            <b class="latin">${index + 1}</b>
            <span><strong>${phase.label}</strong><small>${phase.preview}</small></span>
          </span>
        `).join("")}
      </section>

      <div class="learning-preview-action">
        <button class="primary-button" data-action="start" data-lesson="${lesson.id}" ${missionBlocked ? "disabled" : ""}>
          <span class="button-icon">${renderIcon(missionBlocked ? "lock" : "play")}</span>
          <span>${startLabel}</span>
        </button>
        <small>${lesson.kind === "mission" ? "مشن میں صرف پہلے سے مشق کی ہوئی باتیں استعمال ہوں گی؛ جانچ آخر میں ہوگی۔" : "پڑھانے والے حصے پر کوئی نمبر نہیں؛ جانچ آخر میں ہوگی۔"}</small>
      </div>
    </main>
  `;
}

// The lesson's place on the map: its unit building on a little street, with Pim parked outside.
function renderPreviewScene(lesson, chapter, unit) {
  const index = (chapter.subchapters || []).findIndex((item) => item.id === unit?.id);
  const trophy = lesson.id === chapter.contract?.completionMissionId;
  const color = trophy ? "#e09b00" : NU.map.unitColor(index);
  const kind = trophy ? "townhall" : NU.map.kindFor(unit?.id || lesson.id);
  return `<div class="pl-preview-scene" style="--unit:${color}" aria-hidden="true">
    <svg class="pl-preview-clouds" viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice"><g fill="#fff"><ellipse cx="70" cy="40" rx="34" ry="13"/><ellipse cx="88" cy="32" rx="18" ry="14"/><ellipse cx="320" cy="62" rx="28" ry="11"/><ellipse cx="334" cy="55" rx="15" ry="12"/></g></svg>
    <div class="pl-preview-building">${NU.map.building(kind, color, "open")}</div>
    <div class="pl-preview-pim">${NU.cat.render({ size: 132 })}</div>
    <div class="pl-preview-ground"></div>
  </div>`;
}

// Pim rides up to the building and waves when the preview opens.
function animatePreviewScene(entered) {
  const scene = screen === "preview" && entered ? document.querySelector(".pl-preview-scene") : null;
  if (!scene || NU.motion.level() === "off") return;
  const pim = scene.querySelector(".pl-preview-pim");
  const cat = pim?.querySelector(".nu-cat");
  NU.motion.pop(scene.querySelector(".map-building"));
  NU.motion.animate(pim, [{ transform: "translateX(-110vw)" }, { transform: "translateX(0)" }], { duration: 1050, easing: "cubic-bezier(.2,.7,.3,1)" })
    ?.finished.then(() => { NU.cat.act(cat, "brake"); setTimeout(() => NU.cat.act(cat, "wave"), 260); }, () => {});
  NU.cat.pedalFor(cat, { duration: 1050, distance: 320 });
}

function renderPrerequisiteGuidance(lesson, prerequisiteIds, missingIds, missingMissionIds = []) {
  if (!prerequisiteIds.length && !missingIds.length && !missingMissionIds.length) return "";
  const missingNames = missingIds.map(getSkillDisplayName);
  const missingMissionNames = missingMissionIds.map((missionId) => getShortLessonTitle(getLesson(missionId) || { title: missionId }));
  const visibleMissingNames = missingNames.slice(0, 5);
  const remainingMissingCount = Math.max(0, missingNames.length - visibleMissingNames.length);
  const missingSkillTags = visibleMissingNames.map((name) => (
    /[A-Za-zÀ-ÿ]/.test(name)
      ? `<bdi class="prerequisite-skill latin" dir="ltr">${escapeHtml(name)}</bdi>`
      : `<span class="prerequisite-skill">${escapeHtml(name)}</span>`
  )).join("");
  const readyCount = Math.max(0, prerequisiteIds.length - missingIds.length);
  const mission = lesson.kind === "mission";
  const needsPreparation = missingIds.length > 0 || missingMissionIds.length > 0;
  const missingMissionTags = missingMissionNames.map((name) => (
    `<span class="prerequisite-skill">${escapeHtml(name)}</span>`
  )).join("");
  return `
    <aside class="prerequisite-guidance ${needsPreparation ? "needs-preparation" : "ready"}">
      <span>${renderIcon(needsPreparation ? "notebook" : "check")}</span>
      <div>
        <strong>${needsPreparation ? (mission ? "اس مشن سے پہلے تیاری کریں" : "پچھلی بات کی مختصر یاد دہانی") : "آپ اس سبق کے لیے تیار ہیں"}</strong>
        ${missingMissionIds.length ? `<p>پہلے یہ یونٹ مشن مکمل کریں:</p><div class="prerequisite-skill-list">${missingMissionTags}</div>` : ""}
        ${missingIds.length ? `<p>یہ باتیں پہلے مضبوط کرنا بہتر ہے:</p><div class="prerequisite-skill-list">${missingSkillTags}</div>` : ""}
        <p>${needsPreparation
    ? `${remainingMissingCount ? (remainingMissingCount === 1 ? "اس کے علاوہ ایک مزید بات بھی دہرانی ہے۔ " : `اس کے علاوہ ${remainingMissingCount} مزید باتیں بھی دہرانی ہیں۔ `) : ""}${mission ? "یہ مشن صرف مشق کی ہوئی مہارتیں استعمال کرتا ہے۔" : "سبق پھر بھی کھلا ہے؛ ضرورت پر یاد دہانی اسی سبق میں ملے گی۔"}`
    : `${readyCount || prerequisiteIds.length} ضروری مہارتیں پہلے سے سیکھی ہوئی ہیں۔`}</p>
        ${missingIds.length ? `<button class="secondary-button prerequisite-review-button" data-action="practice">ضروری باتیں دہرائیں</button>` : ""}
      </div>
    </aside>
  `;
}

function renderLesson() {
  const lesson = getActiveLesson();
  if (!lesson) return renderMissingLesson();
  const questions = sessionQuestions.length ? sessionQuestions : (lesson.questions || []);
  const question = questions[activeQuestionIndex];
  if (!question) return renderMissingLesson();
  if (question.id !== lastRenderedQuestionId) {
    lessonDetailKind = "";
    lessonDetailReturnScrollTop = null;
    teachingStep = 0;
    coachmarkDismissed = false;
    hintOpen = false;
    lastRenderedQuestionId = question.id;
  }
  const visual = getExerciseVisual(question, lesson);
  const percentage = Math.round(((activeQuestionIndex + (checked ? 1 : 0)) / questions.length) * 100);
  const infoStep = isInfoQuestion(question);
  const questionTheme = getQuestionTheme(question);
  const phase = getQuestionPhase(question);

  return `
    <main class="quiz-screen ${questionTheme.className} learning-phase-${phase} ${lesson.kind === "mission" ? "mission-lesson" : ""}">
      ${renderQuizTopBar(percentage)}
      <section class="quiz-content">
        ${renderLearningPhaseHeader(phase)}
        <div class="question-heading">
          <h1 class="question-title">${escapeHtml(getQuestionTitle(question))}</h1>
        </div>
        ${renderQuestionCoachmark(question)}
        ${question.correctionRetry ? `<aside class="correction-retry-banner"><strong>مدد کے ساتھ دوبارہ کوشش</strong><span>اس بار جواب خود چنیں؛ ضرورت ہو تو مدد کھولیں۔</span></aside>` : ""}
        ${renderQuestionHelp(question, phase)}
        ${renderQuestionCard(question, visual)}
      </section>
      ${renderQuizFooter(question, infoStep)}
    </main>
    ${renderLessonDetailSheet(question)}
  `;
}

function getQuestionPhase(question) {
  const phase = String(question?.phase || "").toLowerCase().replaceAll("-", "");
  if (["preview", "missionpreview"].includes(phase)) return "preview";
  if (["learn", "teaching"].includes(phase)) return "learn";
  if (["understand", "recognition", "model"].includes(phase)) return "understand";
  if (["guided", "guidedpractice", "practice"].includes(phase)) return "guided";
  if (["use", "situation", "application"].includes(phase)) return "use";
  if (["check", "independent", "independentcheck"].includes(phase)) return "check";
  if (["correction", "retry"].includes(phase)) return "correction";
  if (isInfoQuestion(question)) return "learn";
  return "guided";
}

function getLessonDisplayPhases(lesson) {
  if (lesson?.reviewKind) {
    return [
      LEARNING_PHASES.find((phase) => phase.id === "learn"),
      LEARNING_PHASES.find((phase) => phase.id === "guided"),
      LEARNING_PHASES.find((phase) => phase.id === "correction")
    ];
  }
  if (lesson?.kind !== "mission") return LEARNING_PHASES;
  const phaseById = {
    preview: { id: "preview", label: "تیاری", preview: "مشن سمجھیں" },
    use: LEARNING_PHASES.find((phase) => phase.id === "use"),
    check: LEARNING_PHASES.find((phase) => phase.id === "check"),
    correction: LEARNING_PHASES.find((phase) => phase.id === "correction")
  };
  const declared = normalizeIdList(lesson.learning?.phaseOrder)
    .map((phase) => phase === "independent-check" ? "check" : phase);
  const ordered = (declared.length ? declared : ["preview", "use", "check", "correction"])
    .map((phase) => phaseById[phase])
    .filter(Boolean);
  return ordered.length ? ordered : [phaseById.preview, phaseById.use, phaseById.check, phaseById.correction];
}

function renderLearningPhaseHeader(activePhase) {
  const displayPhases = getLessonDisplayPhases(getActiveLesson());
  const activeIndex = displayPhases.findIndex((phase) => phase.id === activePhase);
  const notesButton = getActiveLesson()?.reviewKind ? "" : `
    <button class="lesson-notes-button" data-action="open-lesson-detail" data-detail-kind="notes" aria-label="اس حصے کے نوٹس کھولیں">
      ${renderIcon("notebook")}<span>نوٹس</span>
    </button>
  `;
  return `
    <div class="learning-phase-header">
      <span class="learning-phase-name">${displayPhases.find((phase) => phase.id === activePhase)?.label || "مشق"}</span>
      ${notesButton}
      <div class="learning-phase-track" aria-label="سبق کے مرحلے">
        ${displayPhases.map((phase) => {
    const index = displayPhases.findIndex((item) => item.id === phase.id);
    return `<span class="learning-phase-step phase-${phase.id} ${phase.id === activePhase ? "active" : ""} ${index < activeIndex ? "complete" : ""}" title="${phase.label}"><i></i><b>${phase.label}</b></span>`;
  }).join("")}
      </div>
    </div>
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

function renderQuizTopBar(percentage) {
  return `
    <header class="quiz-topbar">
      <button class="quiz-close" data-action="home" aria-label="سبق بند کریں">${renderIcon("close")}</button>
      <div class="quiz-progress-shell">
        <div class="quiz-progress" aria-label="سبق کی پیش رفت ${percentage} فیصد"><span style="width:${percentage}%"><i></i></span></div>
        <span class="quiz-progress-dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      </div>
      <div class="quiz-status">
        ${answerCombo >= 2 ? `<span class="quiz-combo pl-streak heat-${Math.min(3, Math.floor(answerCombo / 3))} latin" aria-label="لگاتار ${answerCombo} صحیح جواب">${renderFlame()}<b>${answerCombo}</b></span>` : ""}
      </div>
    </header>
  `;
}

function renderFlame() {
  return '<svg class="pl-flame" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9Z" fill="currentColor"/><path d="M12 12c1 2 3 3 3 5a3 3 0 0 1-6 0c0-1 1-2 1-3 1 1 2 0 2-2Z" fill="#ffd56b"/></svg>';
}

function getQuestionTitle(question) {
  if (question.type === "concept-teach") {
    if (question.teachingMode === "refresh") return "مختصر یاد دہانی";
    return teachingStep === 0 ? "معنی اور آواز" : "روزمرہ استعمال";
  }
  if (question.type === "pattern-teach") return teachingStep === 0 ? "جملے کا نمونہ" : "ایک آسان اصول";
  if (question.type === "correction-teach") return "دوبارہ کوشش کی تیاری";
  if (question.instructionUrdu || question.instruction || question.label) return question.instructionUrdu || question.instruction || question.label;
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
  if (question.type === "concept-teach") return renderConceptTeachingQuestion(question, visual);
  if (question.type === "pattern-teach") return renderPatternTeachingQuestion(question);
  if (question.type === "correction-teach") return renderCorrectionTeachingQuestion(question);
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

function getTeachingStepCount(question) {
  if (question?.type === "concept-teach") {
    if (question.teachingMode === "refresh") return 1;
    const teaching = getConceptTeachingContent(question);
    return teaching.conciseUsage || teaching.showExample ? 2 : 1;
  }
  if (question?.type === "pattern-teach") {
    const teaching = getPatternTeachingContent(question);
    return teaching.conciseRule || teaching.highlight ? 2 : 1;
  }
  return 1;
}

function renderConceptTeachingQuestion(question, visual) {
  const teaching = getConceptTeachingContent(question);
  const refresh = question.teachingMode === "refresh";
  const showUsePanel = !refresh && Boolean(teaching.conciseUsage || teaching.showExample);
  const stepCount = showUsePanel ? 2 : 1;
  const activeStep = Math.min(teachingStep, stepCount - 1);
  const stage = activeStep === 0 ? "meet" : "use";
  return `
    <article class="learning-teaching-card concept-teaching-card progressive-teaching-card teaching-stage-${stage} ${refresh ? "refresh-teaching-card" : ""}" data-teaching-step="${activeStep + 1}">
      ${stepCount > 1 ? `<div class="teaching-step-progress" aria-label="وضاحت کا حصہ ${activeStep + 1} از ${stepCount}"><span class="teaching-step-count latin">${activeStep + 1}/${stepCount}</span><span class="teaching-step-name">${activeStep === 0 ? "پہچانیں" : "استعمال کریں"}</span></div>` : ""}
      ${activeStep === 0 ? `
        ${renderVisual(visual, "quiz-visual teaching-visual")}
        <section class="teaching-core" aria-label="لفظ اور مطلب">
          <span class="teaching-eyebrow">${refresh ? "پچھلی بات یاد کریں" : "پہچانیں اور سنیں"}</span>
          <div class="teaching-dutch latin">
            <strong data-karaoke>${NU.lesson.karaokeHTML(teaching.dutch)}</strong>
          </div>
          <div class="teaching-actions">${teaching.audioText ? renderSpeakButton(teaching.audioText, "teaching") : ""}${renderSlowSpeakButton(teaching.audioText, true)}</div>
          <div class="pl-meaning"><span>مطلب</span><p class="teaching-urdu">${escapeHtml(teaching.urdu)}</p></div>
          ${teaching.pronunciation ? `<p class="teaching-pronunciation"><span>اردو میں آواز:</span> ${escapeHtml(teaching.pronunciation)}</p>` : ""}
        </section>
      ` : `
        <section class="teaching-use-panel" aria-label="استعمال کی مثال">
          <span class="teaching-step-label">استعمال کریں</span>
          ${teaching.conciseUsage ? `<p class="teaching-use-copy">${escapeHtml(teaching.conciseUsage)}</p>` : ""}
          ${teaching.showExample ? `<div class="teaching-example"><span>ایک مثال</span><div class="pl-example-line"><strong class="latin" data-karaoke>${NU.lesson.karaokeHTML(teaching.conciseExampleDutch)}</strong>${isDutchText(teaching.conciseExampleDutch) ? renderSpeakButton(teaching.conciseExampleDutch, "teaching") : ""}</div><small>${escapeHtml(teaching.conciseExampleUrdu)}</small></div>` : ""}
        </section>
        <button class="teaching-step-back" data-action="teaching-back">پچھلا حصہ</button>
      `}
      ${teaching.hasOptionalDetail && activeStep === stepCount - 1 ? renderLessonDetailTrigger("concept", refresh ? "مزید یاد دہانی" : "فرق یا مزید وضاحت") : ""}
    </article>
  `;
}

function renderPatternTeachingQuestion(question) {
  const teaching = getPatternTeachingContent(question);
  const hasRuleStep = Boolean(teaching.conciseRule || teaching.highlight);
  const stepCount = hasRuleStep ? 2 : 1;
  const activeStep = Math.min(teachingStep, stepCount - 1);
  const stage = activeStep === 0 ? "model" : "rule";
  return `
    <article class="learning-teaching-card pattern-teaching-card progressive-teaching-card teaching-stage-${stage}" data-teaching-step="${activeStep + 1}">
      ${stepCount > 1 ? `<div class="teaching-step-progress" aria-label="وضاحت کا حصہ ${activeStep + 1} از ${stepCount}"><span class="teaching-step-count latin">${activeStep + 1}/${stepCount}</span><span class="teaching-step-name">${activeStep === 0 ? "نمونہ" : "آسان اصول"}</span></div>` : ""}
      ${activeStep === 0 ? `
        <section class="pattern-model-panel" aria-label="جملہ اور مطلب">
          <span class="teaching-eyebrow">پہلے نمونہ دیکھیں</span>
          <div class="pattern-sentence">
            <strong class="latin" data-karaoke>${OpenDoor.tokens(teaching.sentence)}</strong>
            ${teaching.sentence ? renderSpeakButton(teaching.sentence, "teaching") : ""}
            ${renderSlowSpeakButton(teaching.sentence, true)}
            ${teaching.sentenceUrdu ? `<small>${escapeHtml(teaching.sentenceUrdu)}</small>` : ""}
          </div>
        </section>
      ` : `
        <section class="pattern-rule-panel" aria-label="ایک آسان اصول">
          <span class="teaching-step-label">ایک آسان اصول</span>
          ${teaching.highlight ? `<strong class="pattern-highlight latin">${escapeHtml(teaching.highlight)}</strong>` : ""}
          ${teaching.conciseRule ? `<p class="pattern-explanation">${escapeHtml(teaching.conciseRule)}</p>` : ""}
        </section>
        <button class="teaching-step-back" data-action="teaching-back">پچھلا حصہ</button>
      `}
      ${teaching.hasOptionalDetail && activeStep === stepCount - 1 ? renderLessonDetailTrigger("pattern", "فرق یا عام غلطی دیکھیں") : ""}
    </article>
  `;
}

function renderCorrectionTeachingQuestion(question) {
  const original = question.originalQuestion || {};
  const explanation = question.wrongExplanation || original.wrongExplanation || original.feedback?.wrong || original.explain || `صحیح جواب ${original.answer || ""} ہے۔`;
  return `
    <article class="learning-teaching-card correction-teaching-card progressive-teaching-card">
      ${NU.lesson.tip('<span><b class="latin" dir="ltr">Geen zorgen!</b> غلطی سے ہی سیکھتے ہیں۔ صحیح جواب دیکھیں اور پھر خود آزمائیں۔</span>')}
      <h2>صحیح جواب ایک بار دیکھیں</h2>
      ${original.answer ? `<div class="teaching-example"><span>صحیح جواب</span><strong class="${isDutchText(original.answer) ? "latin" : ""}">${escapeHtml(original.answer)}</strong></div>` : ""}
      <p class="correction-next-step">اگلے قدم میں یہی بات خود دوبارہ آزمائیں۔</p>
      ${explanation ? renderLessonDetailTrigger("correction", "وجہ دوبارہ دیکھیں") : ""}
    </article>
  `;
}

function normalizeTeachingText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[“”"'’`]/g, "")
    .replace(/[۔.!?؟،,:;؛()\[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getConciseTeachingText(value, limit = 130) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  const sentenceEnd = text.search(/[۔.!?؟](?:\s|$)/);
  const firstSentence = sentenceEnd >= 24 ? text.slice(0, sentenceEnd + 1) : text;
  if (firstSentence.length <= limit) return firstSentence;
  const shortened = firstSentence.slice(0, limit + 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > Math.floor(limit * 0.62) ? lastSpace : limit).trim()}…`;
}

function getConceptTeachingContent(question) {
  const concept = question.concept || {};
  const dutch = concept.dutch || question.dutch || question.prompt || "";
  const urdu = concept.urdu || question.urdu || "";
  const pronunciation = concept.pronunciationUrdu || concept.pronunciation || question.pronunciationUrdu || getBeginnerSupport(dutch)?.soundHint || "";
  const audioText = concept.audioText || concept.speak || dutch;
  const example = Array.isArray(concept.examples) ? concept.examples[0] : concept.example;
  const exampleDutch = example?.dutch || concept.exampleDutch || question.exampleDutch || "";
  const exampleUrdu = example?.urdu || concept.exampleUrdu || question.exampleUrdu || "";
  const usage = concept.usageUrdu || concept.usage || question.usageUrdu || "";
  const confusion = concept.commonConfusionUrdu || concept.commonConfusion || question.commonConfusionUrdu || "";
  const duplicateExample = Boolean(
    exampleDutch
    && exampleUrdu
    && normalizeTeachingText(exampleDutch) === normalizeTeachingText(dutch)
    && normalizeTeachingText(exampleUrdu) === normalizeTeachingText(urdu)
  );
  const usefulUsage = normalizeTeachingText(usage) !== normalizeTeachingText(urdu) ? usage : "";
  const conciseUsage = getConciseTeachingText(usefulUsage, 125);
  const conciseExampleDutch = getConciseTeachingText(exampleDutch, 90);
  const conciseExampleUrdu = getConciseTeachingText(exampleUrdu, 100);
  const showExample = Boolean(!duplicateExample && (conciseExampleDutch || conciseExampleUrdu));
  const visibleDetailIsTruncated = conciseUsage !== usefulUsage
    || (showExample && (
      conciseExampleDutch !== String(exampleDutch || "").replace(/\s+/g, " ").trim()
      || conciseExampleUrdu !== String(exampleUrdu || "").replace(/\s+/g, " ").trim()
    ));
  const refresh = question.teachingMode === "refresh";
  return {
    dutch,
    urdu,
    pronunciation,
    audioText,
    usage: usefulUsage,
    conciseUsage,
    confusion,
    exampleDutch,
    exampleUrdu,
    conciseExampleDutch,
    conciseExampleUrdu,
    showExample,
    hasOptionalDetail: Boolean(confusion || visibleDetailIsTruncated || (refresh && (usefulUsage || showExample)))
  };
}

function getPatternTeachingContent(question) {
  const pattern = question.pattern || {};
  const sentence = pattern.modelDutch || pattern.sentence || pattern.exampleDutch || question.prompt || "";
  const sentenceUrdu = pattern.modelUrdu || pattern.sentenceUrdu || pattern.exampleUrdu || "";
  const highlight = pattern.highlight || pattern.pattern || "";
  const explanation = pattern.explanationUrdu || pattern.explanation || question.explain || "";
  const contrast = pattern.contrastUrdu || pattern.contrast || "";
  const mistake = pattern.commonMistakeUrdu || pattern.commonMistake || "";
  const conciseRule = getConciseTeachingText(explanation, 130);
  return {
    sentence,
    sentenceUrdu,
    highlight,
    explanation,
    conciseRule,
    contrast,
    mistake,
    hasOptionalDetail: Boolean(contrast || mistake || conciseRule !== String(explanation || "").replace(/\s+/g, " ").trim())
  };
}

function renderLessonDetailTrigger(kind, label, className = "") {
  return `
    <button class="lesson-detail-trigger ${className}" data-action="open-lesson-detail" data-detail-kind="${escapeAttr(kind)}" aria-haspopup="dialog">
      <span>${escapeHtml(label)}</span><b aria-hidden="true">‹</b>
    </button>
  `;
}

function renderLessonDetailSheet(question) {
  if (!lessonDetailKind) return "";
  const detail = getLessonDetailContent(question, lessonDetailKind);
  if (!detail) return "";
  return `
    <div class="lesson-detail-layer" data-detail-kind="${escapeAttr(lessonDetailKind)}">
      <button class="lesson-detail-backdrop" data-action="close-lesson-detail" aria-label="وضاحت بند کریں"></button>
      <section class="lesson-detail-sheet" role="dialog" aria-modal="true" aria-labelledby="lesson-detail-title" tabindex="-1">
        <span class="lesson-detail-handle" aria-hidden="true"></span>
        <header class="lesson-detail-header">
          <div>
            <span>${escapeHtml(detail.eyebrow)}</span>
            <h2 id="lesson-detail-title">${escapeHtml(detail.title)}</h2>
          </div>
          <button class="lesson-detail-close" data-action="close-lesson-detail" aria-label="وضاحت بند کر کے واپس جائیں">${renderIcon("close")}</button>
        </header>
        <div class="lesson-detail-body" id="lesson-detail-description" role="region" aria-label="تفصیلی وضاحت" tabindex="0">${detail.body}</div>
      </section>
    </div>
  `;
}

function getLessonDetailContent(question, kind) {
  if (kind === "concept") return getConceptLessonDetail(question);
  if (kind === "pattern") return getPatternLessonDetail(question);
  if (kind === "feedback") return getFeedbackLessonDetail(question);
  if (kind === "correction") return getCorrectionLessonDetail(question);
  if (kind === "notes") return getLessonNotesDetail();
  return null;
}

function renderLessonDetailSection(label, content, className = "") {
  if (!content) return "";
  return `<section class="lesson-detail-section ${className}"><strong>${escapeHtml(label)}</strong><p>${escapeHtml(content)}</p></section>`;
}

function getConceptLessonDetail(question) {
  const teaching = getConceptTeachingContent(question);
  const refresh = question.teachingMode === "refresh";
  const exampleWasShortened = teaching.showExample && (
    teaching.conciseExampleDutch !== String(teaching.exampleDutch || "").replace(/\s+/g, " ").trim()
    || teaching.conciseExampleUrdu !== String(teaching.exampleUrdu || "").replace(/\s+/g, " ").trim()
  );
  const example = teaching.showExample && (refresh || exampleWasShortened)
    ? `<section class="lesson-detail-section lesson-detail-example"><strong>مثال</strong><bdi class="latin" dir="ltr">${escapeHtml(teaching.exampleDutch)}</bdi><p>${escapeHtml(teaching.exampleUrdu)}</p></section>`
    : "";
  const body = [
    refresh || teaching.conciseUsage !== teaching.usage
      ? renderLessonDetailSection("کب استعمال کریں؟", teaching.usage)
      : "",
    example,
    renderLessonDetailSection("فرق یاد رکھیں", teaching.confusion)
  ].filter(Boolean).join("");
  if (!body) return null;
  return { eyebrow: "اختیاری وضاحت", title: teaching.dutch || "مزید سمجھیں", body };
}

function getPatternLessonDetail(question) {
  const teaching = getPatternTeachingContent(question);
  const body = [
    teaching.explanation && teaching.explanation !== teaching.conciseRule
      ? renderLessonDetailSection("پورا اصول", teaching.explanation)
      : "",
    renderLessonDetailSection("فرق", teaching.contrast),
    renderLessonDetailSection("عام غلطی", teaching.mistake)
  ].filter(Boolean).join("");
  if (!body) return null;
  return { eyebrow: "اختیاری وضاحت", title: "جملے کا فرق", body };
}

function getFeedbackLessonDetail(question) {
  const correct = checked && isCurrentAnswerCorrect(question);
  const explanation = getFullFeedbackExplanation(question, correct);
  if (!explanation) return null;
  return {
    eyebrow: correct ? "جواب کی وجہ" : "غلطی کی وجہ",
    title: correct ? "یہ جواب کیوں درست ہے؟" : "یہ جواب کیوں مختلف تھا؟",
    body: renderLessonDetailSection("آسان وضاحت", explanation)
  };
}

function getCorrectionLessonDetail(question) {
  const original = question.originalQuestion || {};
  const explanation = question.wrongExplanation || original.wrongExplanation || original.feedback?.wrong || original.explain || "";
  if (!explanation) return null;
  return {
    eyebrow: "غلطی سے سیکھیں",
    title: "وجہ دوبارہ دیکھیں",
    body: renderLessonDetailSection("آسان وضاحت", explanation)
  };
}

function getLessonNotesDetail() {
  const lesson = getActiveLesson();
  if (!lesson) return null;
  const runConcepts = normalizeIdList(activeLearningRun?.conceptIds)
    .map((conceptId) => courseConcepts.get(conceptId))
    .filter(Boolean);
  const lessonConcepts = (lesson.concepts || [])
    .map((concept) => typeof concept === "string" ? courseConcepts.get(concept) : concept)
    .filter(Boolean);
  const fallbackPairs = getLessonIntroPairs(lesson, sessionQuestions)
    .map((pair) => ({ dutch: pair.dutch, urdu: pair.urdu }));
  const seen = new Set();
  const noteConcepts = runConcepts.length ? runConcepts : [...lessonConcepts, ...fallbackPairs];
  const concepts = noteConcepts
    .filter((concept) => {
      const key = `${normalizeTeachingText(concept?.dutch)}|${normalizeTeachingText(concept?.urdu)}`;
      if (!key || key === "|" || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);
  const conceptList = concepts.length ? `
    <section class="lesson-detail-section">
      <strong>اس حصے کی باتیں</strong>
      <ul class="lesson-detail-note-list">
        ${concepts.map((concept) => `<li><bdi class="latin" dir="ltr">${escapeHtml(concept.dutch)}</bdi><span>${escapeHtml(concept.urdu)}</span>${concept.pronunciationUrdu ? `<small>${escapeHtml(concept.pronunciationUrdu)}</small>` : ""}</li>`).join("")}
      </ul>
    </section>
  ` : "";
  const pattern = activeLearningRun && !activeLearningRun.patternId ? {} : (lesson.pattern || {});
  const patternSummary = pattern.modelDutch || pattern.sentence || pattern.exampleDutch
    ? `<section class="lesson-detail-section lesson-detail-example"><strong>جملے کا نمونہ</strong><bdi class="latin" dir="ltr">${escapeHtml(pattern.modelDutch || pattern.sentence || pattern.exampleDutch)}</bdi><p>${escapeHtml(pattern.modelUrdu || pattern.sentenceUrdu || pattern.exampleUrdu || pattern.explanationUrdu || "")}</p></section>`
    : "";
  const body = `${conceptList}${patternSummary}`;
  if (!body) return null;
  return { eyebrow: "دوبارہ دیکھیں", title: "اس حصے کے نوٹس", body };
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
      <button class="listening-button" data-action="speak" data-speak="${escapeAttr(question.speak || question.answer)}" aria-label="Nederlands آواز سنیں">${renderIcon("speaker")}<i aria-hidden="true"></i><i aria-hidden="true"></i></button>
      <strong class="latin" data-karaoke>${NU.lesson.karaokeHTML(question.answer)}</strong>
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
      <div class="pl-listen-stage">
        <button class="listening-button" data-action="speak" data-speak="${escapeAttr(speechText)}" aria-label="Nederlands آواز سنیں">${renderIcon("speaker")}<i aria-hidden="true"></i><i aria-hidden="true"></i></button>
        ${renderSlowSpeakButton(speechText, true)}
      </div>
      ${audioSkipped ? `<p class="audio-fallback latin">${escapeHtml(speechText)}</p>` : ""}
      ${renderChoices(question)}
    </div>
  `;
}

function renderMultipleChoiceQuestion(question, visual) {
  const helpFreeCheck = isHelpFreeCheckQuestion(question);
  const intrinsicListening = question.type === "listen-choice" || question.mode === "listen-reply";
  const speechText = getQuestionSpeechText(question);
  return `
    <div class="multiple-choice-question ${question.type === "image-choice" ? "image-prompt" : ""}">
      <div class="prompt-scene ${visual ? "has-visual" : "no-visual"}">
        ${renderVisual(visual, "quiz-visual")}
        <div class="pl-prompt-row">
          <span class="pl-prompt-pim" aria-hidden="true">${NU.cat.render({ face: true, size: 56 })}</span>
          <div class="speech-bubble ${isPromptLatin(question) ? "latin" : ""}">
            ${speechText && (!helpFreeCheck || intrinsicListening) ? renderSpeakButton(speechText, "prompt") : ""}
            <span>${helpFreeCheck ? escapeHtml(question.prompt) : renderTextWithWordHelp(question.prompt, `prompt-${activeQuestionIndex}`)}</span>
            ${helpFreeCheck ? "" : renderSlowSpeakButton(speechText)}
          </div>
        </div>
        ${helpFreeCheck || !hintOpen ? "" : renderBeginnerSupport(question.prompt)}
      </div>
      ${renderChoices(question)}
    </div>
  `;
}

function renderWordBankQuestion(question, visual) {
  const helpFreeCheck = isHelpFreeCheckQuestion(question);
  return `
    <div class="word-bank-question">
      <div class="prompt-scene compact ${visual ? "has-visual" : "no-visual"}">
        ${renderVisual(visual, "quiz-visual")}
        <div class="pl-prompt-row">
          <span class="pl-prompt-pim" aria-hidden="true">${NU.cat.render({ face: true, size: 56 })}</span>
          <div class="speech-bubble">${helpFreeCheck ? escapeHtml(question.prompt) : renderTextWithWordHelp(question.prompt, `prompt-${activeQuestionIndex}`)}</div>
        </div>
        ${helpFreeCheck || !hintOpen ? "" : renderBeginnerSupport(question.prompt)}
      </div>
      ${renderBuildExercise(question)}
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
    const hasNextTeachingStep = teachingStep < getTeachingStepCount(question) - 1;
    const label = question.type === "speak-repeat"
      ? "میں نے کہا"
      : hasNextTeachingStep && question.type === "concept-teach"
        ? "استعمال دیکھیں"
        : hasNextTeachingStep && question.type === "pattern-teach"
          ? "آسان اصول دیکھیں"
          : "آگے بڑھیں";
    return `<footer class="quiz-action-bar"><button class="quiz-action enabled ${hasNextTeachingStep ? "teaching-step-next" : ""}" data-action="continue-info">${label}</button></footer>`;
  }
  if (checked) {
    return `
      <footer class="quiz-feedback-panel ${correct ? "correct" : "wrong"}">
        <div class="feedback-copy">
          <span class="feedback-icon pl-feedback-face">${NU.cat.render({ face: true, size: 48, mood: correct ? "happy" : "sad" })}</span>
          <div><div class="pl-feedback-title"><strong>${correct ? "درست" : "یہ جواب درست نہیں تھا"}</strong><span class="pl-praise latin" dir="ltr">${NU.lesson.phrase(correct, activeQuestionIndex)[0]}</span></div>${renderFeedbackDetail(question, correct)}</div>
        </div>
        <button class="quiz-action enabled" data-action="next">${getFeedbackNextLabel(question, correct)}</button>
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

function getFeedbackNextLabel(question, correct) {
  if (correct) return "جاری رکھیں";
  if (question.correctionRetry) return "مدد سے دوبارہ درست کریں";
  if (getQuestionPhase(question) !== "check") return "سمجھ گیا";

  const questions = sessionQuestions.length ? sessionQuestions : (getActiveLesson()?.questions || []);
  const hasRemainingIndependentItem = questions
    .slice(activeQuestionIndex + 1)
    .some((item) => getQuestionPhase(item) !== "correction");
  return hasRemainingIndependentItem
    ? "غلطی سمجھ لی، جانچ جاری رکھیں"
    : "درستگی شروع کریں";
}

function renderFeedbackDetail(question, correct = false) {
  const fullExplanation = getFullFeedbackExplanation(question, correct);
  const conciseReason = getConciseTeachingText(fullExplanation, correct ? 105 : 115);
  const hasOptionalDetail = String(fullExplanation || "").replace(/\s+/g, " ").trim() !== conciseReason;
  const answer = String(question.answer || "");
  return `
    <div class="feedback-summary">
      ${answer ? `<p class="feedback-answer"><span>صحیح جواب:</span> <bdi class="${isDutchText(answer) ? "latin" : ""}" dir="auto">${escapeHtml(answer)}</bdi></p>` : ""}
      ${conciseReason ? `<small class="feedback-reason">${escapeHtml(conciseReason)}</small>` : ""}
      ${hasOptionalDetail ? renderLessonDetailTrigger("feedback", correct ? "پوری وجہ" : "کیوں؟", "feedback-detail-trigger") : ""}
    </div>
  `;
}

function getFullFeedbackExplanation(question, correct = false) {
  const selectedOptionExplanation = !correct ? getWrongOptionExplanation(question, selectedAnswer) : "";
  if (selectedOptionExplanation) return selectedOptionExplanation;
  const authored = correct
    ? question.correctExplanation || question.feedback?.correct
    : question.wrongExplanation || question.feedback?.wrong;
  if (authored) return authored;
  if (question.explain) return question.explain;
  const answerSupport = getBeginnerSupport(question.answer);
  const promptSupport = getBeginnerSupport(question.prompt);
  if (answerSupport) return `${question.answer} = ${answerSupport.meaning}`;
  if (promptSupport) return `${question.prompt} کا مطلب ${promptSupport.meaning} ہے`;
  return question.answer ? `صحیح جواب ${question.answer} ہے۔` : "";
}

function getWrongOptionExplanation(question, answer) {
  return question?.optionExplanationsUrdu?.[answer]
    || question?.wrongExplanationsByOption?.[answer]
    || question?.optionExplanations?.[answer]
    || question?.feedbackByOption?.[answer]
    || "";
}

function renderMissingLesson() {
  return `
    ${renderTopbar()}
    <section class="state-panel pl-state">
      <span class="pl-empty-pim" aria-hidden="true">${NU.cat.render({ size: 120, mood: "sad" })}</span>
      <h1>سبق نہیں ملا</h1>
      <p class="lead">یہ سبق اس وقت دستیاب نہیں ہے۔</p>
      <button class="primary-button" data-action="home">گھر جائیں</button>
    </section>
  `;
}

function renderQuestionCoachmark(question) {
  if (!question?.contextCoachmark || coachmarkDismissed) return "";
  return `
    <aside class="question-coachmark" role="note" aria-label="پہلی مشق کا طریقہ">
      ${NU.lesson.tip(`<span class="question-coachmark-copy"><strong>پہلی مشق:</strong> ${escapeHtml(question.contextCoachmark)}</span>
      <button class="question-coachmark-dismiss" data-action="dismiss-coachmark" aria-label="یہ مدد بند کریں">${renderIcon("close")}</button>`)}
    </aside>
  `;
}

function renderQuestionHelp(question, phase) {
  const supportedPhase = ["understand", "guided"].includes(phase) || Boolean(question.correctionRetry);
  if (!supportedPhase || !question.hint || isInfoQuestion(question) || isHelpFreeCheckQuestion(question)) return "";
  return `
    <div class="question-help">
      ${renderHintButton()}
      ${hintOpen ? renderHintPopover(question) : ""}
    </div>
  `;
}

function renderHintButton() {
  return `
    <button class="hint-button question-help-toggle ${hintOpen ? "active" : ""}" data-action="hint" aria-expanded="${hintOpen}" aria-controls="question-help-panel">
      <span aria-hidden="true">؟</span><b>${hintOpen ? "مدد بند کریں" : "مدد چاہیے؟"}</b>
    </button>
  `;
}

function renderHintPopover(question) {
  return `
    <aside class="hint-popover guided-support question-help-panel" id="question-help-panel" role="status">
      ${NU.lesson.tip(escapeHtml(question.hint || "Nederlands الفاظ کو صحیح ترتیب میں دبائیں۔"))}
    </aside>
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
  const helpFreeCheck = isHelpFreeCheckQuestion(question);
  const choiceText = dutchChoice && !helpFreeCheck ? renderTextWithWordHelp(option, `choice-${activeQuestionIndex}-${index}`) : escapeHtml(option);
  const support = dutchChoice && !helpFreeCheck && hintOpen ? renderBeginnerSupport(option, "compact") : "";

  return `
    <div class="choice-wrap ${dutchChoice ? "has-sound" : ""}">
      <button class="choice-button ${state} ${dutchChoice ? "latin" : ""}" data-action="choose" data-answer="${escapeAttr(option)}">
        <span class="choice-key latin">${index + 1}</span>
        <span class="choice-text">${choiceText}${support}</span>
        <span class="choice-state">${state === "correct" ? renderIcon("check") : state === "wrong" ? renderIcon("close") : ""}</span>
        ${checked && selectedAnswer === question.answer && option === question.answer ? renderChoiceConfetti() : ""}
      </button>
      ${dutchChoice && progress.settings.pronunciation && !helpFreeCheck ? `<button class="choice-audio" data-action="speak" data-speak="${escapeAttr(option)}" aria-label="Nederlands تلفظ">${renderIcon("speaker")}</button>` : ""}
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
          <button class="word-tile selected-tile latin" data-action="build-remove" data-build-index="${index}" data-morph="tile-${escapeAttr(tile.id)}">
            ${escapeHtml(tile.word)}
          </button>
        `).join("") : `<span class="build-placeholder">Nederlands الفاظ یہاں بنائیں</span>`}
        ${checked && currentAnswer === question.answer ? renderChoiceConfetti() : ""}
      </div>
      <div class="build-bank">
        ${remainingTiles.map((tile) => `
          <button class="word-tile latin" data-action="build-select" data-tile-id="${escapeAttr(tile.id)}" data-morph="tile-${escapeAttr(tile.id)}">
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

function isHelpFreeCheckQuestion(question) {
  return getQuestionPhase(question) === "check" && !question.correctionRetry;
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
      ${variant === "teaching" ? 'data-regular="true"' : ""}
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

function renderSlowSpeakButton(text, forceVisible = false) {
  if (!progress.settings.pronunciation || (!progress.settings.slowAudio && !forceVisible) || !text || !isDutchText(text)) return "";
  return `<button class="slow-speak-button" data-action="slow-speak" data-speak="${escapeAttr(text)}">آہستہ سنیں</button>`;
}

// Every unit (and each chapter's final mission) earns one passport stamp.
function getChapterStampUnits(chapter) {
  const grouped = new Set((chapter.subchapters || []).flatMap((unit) => unit.lessonIds));
  const finale = chapter.lessons.filter((lesson) => !grouped.has(lesson.id)).map((lesson) => lesson.id);
  const units = (chapter.subchapters || []).map((unit, index) => ({
    id: unit.id,
    title: unit.title,
    lessonIds: unit.lessonIds,
    kind: NU.map.kindFor(unit.id),
    color: NU.map.unitColor(index),
    number: String(index + 1)
  }));
  if (finale.length && units.length) {
    units.push({ id: `${chapter.id}-finale`, title: `${chapter.id.toUpperCase()} آخری مشن`, lessonIds: finale, kind: "townhall", color: "#e09b00", number: "★" });
  }
  return units.map((unit) => ({
    ...unit,
    code: `${chapter.id.toUpperCase()} · ${unit.number}`,
    earned: unit.lessonIds.length > 0 && unit.lessonIds.every((id) => progress.completedLessons.includes(id)),
    date: progress.stamps?.[unit.id] || ""
  }));
}

function getStampUnitForLesson(lesson) {
  const chapter = getChapterForLesson(lesson.id);
  return chapter ? getChapterStampUnits(chapter).find((unit) => unit.lessonIds.includes(lesson.id)) || null : null;
}

function formatStampDate(key) {
  const [year, month, day] = String(key || "").split("-");
  return year && month && day ? `${day}.${month}.${year}` : "";
}

function renderStamp(unit, size = 120) {
  return NU.rewards.stamp({ kind: unit.kind, color: unit.color, label: unit.title, code: unit.code, number: unit.number, date: formatStampDate(unit.date), earned: unit.earned, size });
}

function renderComplete() {
  const result = lessonResult || { correct: 0, total: 1, xp: 0 };
  const percent = Math.round((result.correct / result.total) * 100);
  const incorrect = Math.max(0, result.total - result.correct);
  const isReview = Boolean(result.reviewKind);
  const secure = result.masteryStatus === "secure";
  const hasMoreLearning = !isReview && Number(result.remainingRuns || 0) > 0;
  const streak = getPracticeStreak();
  const stampUnit = result.newStamp ? getStampUnitForLesson(getLesson(result.lessonId) || { id: result.lessonId }) : null;
  const summary = isReview
    ? "آپ نے پہلے سیکھی ہوئی باتیں دوبارہ مضبوط کیں۔"
    : secure
      ? "آپ نے جانچ پوری کی اور ہر غلطی درست کر لی؛ یہ مہارت اب پکی ہے۔"
      : hasMoreLearning
        ? "اس سبق کا یہ حصہ مکمل ہوا؛ اگلا سیکھنے والا حصہ ابھی باقی ہے۔"
        : "سیکھنے اور مشق کا مرحلہ مکمل ہوا؛ آزاد جانچ دوبارہ کر کے مہارت پکی کریں۔";
  const learned = (result.learnedConcepts || []).filter(Boolean);
  return `
    <main class="complete-screen pl-complete ${isReview ? "is-review" : ""}">
      <section class="pl-complete-hero">
        <div class="pl-complete-rays" aria-hidden="true"></div>
        <div class="pl-complete-pim" aria-hidden="true">${NU.cat.render({ size: 176, mood: "happy" })}</div>
        <span class="complete-kicker">${isReview ? "دہرائی محفوظ ہو گئی" : hasMoreLearning ? "سیکھنے کا ایک حصہ مکمل" : "آج کا قدم مکمل"}</span>
        <h1>${isReview ? "دہرائی مکمل!" : hasMoreLearning ? "اگلے حصے کے لیے تیار" : "سبق مکمل!"}</h1>
        <p class="pl-complete-nl latin" dir="ltr">${secure ? "Fantastisch!" : "Goed gedaan!"}</p>
        <p class="complete-summary">${summary}</p>
      </section>

      <div class="pl-stat-row complete-metrics" aria-label="نتیجہ">
        <span class="pl-stat pl-stat-xp"><small>پوائنٹس</small><strong class="latin" data-count-up="${result.xp || 0}" data-count-prefix="+">+${result.xp || 0}</strong><i aria-hidden="true">${renderStatIcon("star")}</i></span>
        <span class="pl-stat pl-stat-score"><small>آزاد جانچ</small><strong class="latin" data-count-up="${percent}" data-count-suffix="%">${percent}%</strong><i aria-hidden="true">${renderStatIcon("target")}</i></span>
        <span class="pl-stat pl-stat-right"><small>درست</small><strong class="latin">${result.correct}/${result.total}</strong><i aria-hidden="true">${renderStatIcon("check")}</i></span>
      </div>

      ${stampUnit ? `
        <section class="pl-stamp-reveal" aria-label="نئی مہر">
          <div class="pl-stamp-page"><div class="pl-stamp-slot">${renderStamp({ ...stampUnit, earned: true, date: todayKey() }, 132)}</div></div>
          <div class="pl-stamp-copy"><span>نئی مہر!</span><strong>${escapeHtml(stampUnit.title)}</strong><p>یہ یونٹ مکمل ہوا۔ مہر آپ کے پاسپورٹ میں لگ گئی۔</p><button class="secondary-button" data-action="passport">پاسپورٹ دیکھیں</button></div>
        </section>` : ""}

      <section class="pl-streak-card ${result.firstPracticeToday ? "is-new" : ""}">
        <div class="pl-streak-tulip">${NU.rewards.tulip(streak, { size: 92 })}</div>
        <div><span>روزانہ کا سلسلہ</span><strong><b class="latin">${streak}</b> ${streak === 1 ? "دن" : "دن مسلسل"}</strong><p>${streak >= 7 ? "پورا گلدستہ! ہر روز تھوڑا سا سیکھنا سب سے مؤثر ہے۔" : "ہر روز مشق کریں اور گل لالہ بڑھتا جائے گا۔"}</p></div>
      </section>

      ${isReview ? "" : `
        <section class="learning-recap">
          <span class="mastery-result mastery-${result.masteryStatus || "practiced"}">${secure ? "مہارت پکی" : "مشق مکمل"}</span>
          <h2>آج آپ نے کیا سیکھا؟</h2>
          ${learned.length ? `<div class="pl-recap-words">${learned.map((word) => `<span class="${isDutchText(word) ? "latin" : ""}" dir="auto">${escapeHtml(word)}</span>`).join("")}</div>` : `<p>اس سبق کی عملی مہارت</p>`}
          <div>
            <span><strong class="latin">${result.correctedCount || 0}</strong><small>غلطیاں درست کیں</small></span>
            <span><strong class="latin">${result.unresolvedCount || 0}</strong><small>دوبارہ دہرائیں</small></span>
            ${result.remainingRuns ? `<span><strong class="latin">${result.remainingRuns}</strong><small>اگلے حصے</small></span>` : ""}
          </div>
          <small>${secure ? "اگلی دہرائی میں یہ مہارت دوبارہ آئے گی۔" : "اگلی تجویز: اسی سبق کی آزاد جانچ دوبارہ کریں۔"}</small>
        </section>
      `}
      <div class="complete-actions">
        ${hasMoreLearning
          ? `<button class="quiz-action enabled" data-action="start" data-lesson="${escapeAttr(result.lessonId)}">اگلا سیکھنے والا حصہ</button>
             <button class="secondary-button" data-action="home">اسباق پر واپس</button>`
          : `<button class="quiz-action enabled" data-action="home">اسباق پر واپس</button>`}
        ${incorrect ? `<button class="secondary-button" data-action="practice">تجویز کردہ دہرائی · ${incorrect}</button>` : ""}
      </div>
    </main>
  `;
}

function renderStatIcon(kind) {
  const icons = {
    star: '<path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.1l1.4-7L2 9.3l7-.8Z" fill="currentColor"/>',
    target: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="12" r="4.5" fill="currentColor"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  return `<svg viewBox="0 0 24 24">${icons[kind]}</svg>`;
}

// The passport collects one stamp per finished unit, chapter by chapter.
function renderPassport() {
  const pages = chapters.map((chapter) => ({ chapter, units: getChapterStampUnits(chapter) }));
  const earned = pages.reduce((sum, page) => sum + page.units.filter((unit) => unit.earned).length, 0);
  const total = pages.reduce((sum, page) => sum + page.units.length, 0);
  return `<main class="utility-screen pl-passport">
    ${renderProgressHeader()}
    <section class="pl-passport-cover">
      <button class="quiz-close" data-action="journey" aria-label="سفر پر واپس جائیں">${renderIcon("close")}</button>
      <span class="pl-passport-crest" aria-hidden="true">${NU.cat.render({ face: true, size: 64, mood: "happy" })}</span>
      <span class="pl-passport-word latin" dir="ltr">PASPOORT</span>
      <h1>میرا ڈچ پاسپورٹ</h1>
      <p>ہر مکمل یونٹ پر ایک مہر</p>
      <span class="pl-passport-count"><b class="latin">${earned}</b> / <b class="latin">${total}</b> مہریں</span>
    </section>
    ${pages.map(({ chapter, units }) => `
      <section class="pl-passport-page" aria-label="${escapeAttr(chapter.title)}">
        <header><strong class="latin">${escapeHtml(chapter.id.toUpperCase())}</strong><span>${escapeHtml(chapter.title)}</span><small class="latin">${units.filter((unit) => unit.earned).length}/${units.length}</small></header>
        <div class="pl-passport-grid">
          ${units.map((unit, index) => `<figure class="pl-passport-stamp ${unit.earned ? "is-earned" : ""}" style="--tilt:${[-8, 6, -3, 9, -6, 4, -10, 7, -2, 5][index % 10]}deg">${renderStamp(unit, 96)}<figcaption>${escapeHtml(unit.title)}</figcaption></figure>`).join("")}
        </div>
      </section>`).join("")}
  </main>`;
}

function renderPracticeScreen() {
  const today = getReviewConfig("today");
  const mistakes = getReviewConfig("mistakes");
  const old = getReviewConfig("old");
  const reviewSkillCount = getReviewSkillCount([...today.questions, ...mistakes.questions, ...old.questions]);
  return `
    <main class="utility-screen practice-screen review-screen pl-utility">
      ${renderProgressHeader()}
      ${renderScreenHero({ tone: "green", title: "دہرائی", subtitle: "آج کی مشق، پرانے سبق اور مشکل سوالات ایک جگہ۔", mood: "happy", stats: [[reviewSkillCount, "دہرائی کی مہارتیں"]], className: "review-hero" })}
      <div class="review-hub-grid">
        ${renderReviewHubCard("today", today, "dumbbell")}
        ${renderReviewHubCard("mistakes", mistakes, "mistake")}
        ${renderReviewHubCard("old", old, "book")}
        <button class="review-hub-card review-letters" data-action="letters">
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
  const skillCount = getReviewSkillCount(config.questions);
  return `
    <button class="review-hub-card review-${kind} ${disabled ? "disabled" : ""}" data-action="review" data-review-kind="${kind}" ${disabled ? "disabled" : ""}>
      <span class="review-hub-icon">${renderIcon(icon)}</span>
      <span class="review-hub-copy"><strong>${config.title}</strong><small>${disabled ? config.empty : "مشق تیار ہے"}</small></span>
      <b class="review-hub-count latin" title="دہرائی کی مہارتیں">${skillCount}</b>
    </button>
  `;
}

function getReviewSkillCount(questions) {
  const skillIds = normalizeIdList((questions || []).flatMap(getQuestionSkillIds));
  return skillIds.length || (questions || []).length;
}

function renderLetters() {
  return `
    ${renderTopbar()}
    <section class="letters-panel pl-utility">
      ${renderScreenHero({ tone: "blue", title: "حروف اور آوازیں", subtitle: "ہر حرف کے ساتھ ایک آسان مثال۔ آواز کا بٹن حرف کا ڈچ نام سناتا ہے۔", stats: [[dutchLetters.length, "حروف"]], back: "toolkit", className: "letters-heading" })}
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
    <article class="letter-card" style="--tone:${["#ff7a1a", "#2b6bff", "#3dc25d", "#8a5cff", "#ff5ca8", "#e09b00"][dutchLetters.indexOf(item) % 6]}">
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
    <section class="settings-panel pl-utility">
      ${renderScreenHero({ tone: "ink", title: "ترتیبات", subtitle: "اپنی رفتار اور مدد کا انداز منتخب کریں۔", className: "settings-intro" })}
      <div class="settings-section-heading"><strong>سیکھنے کے راستے</strong><span></span></div>
      <div class="settings-links">
        ${renderSettingsLink("practice", "dumbbell", "دہرائی", "آج، غلطیاں، اور پرانے سبق")}
        ${renderSettingsLink("review", "dumbbell", "آج کی مشق", "کمزور مہارتوں کے مطابق دہرائی", "today")}
        ${renderSettingsLink("review", "book", "پرانا سبق", "مکمل سبق دوبارہ کریں", "old")}
        ${renderSettingsLink("letters", "alphabet", "Nederlands حروف", "حروف سنیں اور دہرائیں")}
      </div>
      <div class="settings-section-heading"><strong>آپ کے لیے آسانی</strong><span></span></div>
      <div class="settings-list">
        ${renderToggleRow("beginnerMode", "شروع سے سیکھنے والا انداز", "نئے طالب علم کے لیے آسان راستہ")}
        ${renderToggleRow("reduceMotion", "کم حرکت", "مناظر اور تبدیلیاں بغیر حرکت کے دکھائیں")}
        ${renderToggleRow("largeText", "بڑا متن", "الفاظ اور بٹن کچھ بڑے دکھائیں")}
        ${renderToggleRow("slowAudio", "آہستہ آواز", "Dutch آواز تھوڑی آہستہ سنائیں")}
        ${renderToggleRow("extraUrduHelp", "زیادہ Urdu مدد", "آواز، معنی، اور چھوٹی مدد زیادہ دکھائیں")}
        ${renderToggleRow("soundEffects", "ایپ کی آوازیں", "جواب، انعام اور سبق مکمل ہونے کی آوازیں")}
        ${renderToggleRow("haptics", "لرزش", "جواب اور انعام پر فون ہلکا سا لرزے")}
        ${renderToggleRow("pronunciation", "Nederlands تلفظ کے بٹن", "آواز کے بٹن اور لفظ کا تلفظ")}
      </div>
      <div class="settings-section-heading"><strong>پیش رفت</strong><span></span></div>
      <button class="secondary-button danger-button" data-action="reset">${renderIcon("trash")}<span>پیش رفت دوبارہ شروع کریں</span></button>
      <p class="pl-settings-foot"><span aria-hidden="true">${NU.cat.render({ face: true, size: 34 })}</span>NederUrdu · <b class="latin">${NU.cat.NAME}</b> کے ساتھ ڈچ سیکھیں</p>
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
  if (["lesson", "complete", "preview"].includes(screen)) return "";
  return `<nav class="bottom-nav" aria-label="اصل راستے">
    ${renderNavButton("home", "book", "آج", screen === "home")}
    ${renderNavButton("journey", "flag", "سفر", screen === "journey")}
    ${renderNavButton("practice", "dumbbell", "مشق", screen === "practice")}
    ${renderNavButton("toolkit", "notebook", "مددگار", ["toolkit", "letters"].includes(screen))}
  </nav>`;
}

function renderNavButton(action, icon, label, active) {
  const indicator = active ? '<span class="nav-indicator" data-morph="nav-indicator" aria-hidden="true"></span>' : "";
  return `<button class="nav-button ${active ? "active" : ""}" ${active ? 'aria-current="page"' : ""} data-action="${action}">${indicator}<span class="nav-icon">${renderIcon(icon)}</span><span>${label}</span></button>`;
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (document.body.classList.contains("launching")) finishLaunch();
      const action = element.dataset.action;
      triggerPressRipple(element, event);
      if (element.closest(".bottom-nav") && !element.classList.contains("active")) {
        NU.sound.play("tap");
        NU.haptics.play("tap");
      }
      if (action === "word-help") {
        event.preventDefault();
        event.stopPropagation();
        toggleWordHelp(element.dataset.helpId, element.dataset.term, element.dataset.meaning);
      }
      if (action === "speak") {
        event.preventDefault();
        event.stopPropagation();
        animateSpeakingControl(element);
        speakDutch(element.dataset.speak, false, element.dataset.regular === "true");
        NU.lesson.karaoke(getKaraokeTarget(element), { slow: element.dataset.regular !== "true" && progress.settings.slowAudio });
      }
      if (action === "slow-speak") {
        event.preventDefault();
        event.stopPropagation();
        animateSpeakingControl(element);
        speakDutch(element.dataset.speak, true);
        NU.lesson.karaoke(getKaraokeTarget(element), { slow: true });
      }
      if (action === "home") goHome();
      if (action === "journey") goDestination("journey");
      if (action === "toolkit") goDestination("toolkit");
      if (action === "passport") goDestination("passport");
      if (action === "practice") goPractice();
      if (action === "letters") goLetters();
      if (action === "settings") goSettings();
      if (action === "chapter") selectChapter(element.dataset.chapter);
      if (action === "toggle-path") togglePath();
      if (action === "preview") showLessonPreview(element.dataset.lesson);
      if (action === "street-cat") NU.street.poke(element.closest(".street"));
      if (action === "street-door") enterLessonDoor(element);
      if (action === "start") startLesson(element.dataset.lesson);
      if (action === "review") startReview(element.dataset.reviewKind);
      if (action === "choose") chooseAnswer(element.dataset.answer);
      if (action === "build-select") selectBuildTile(element.dataset.tileId);
      if (action === "build-remove") removeBuildTile(Number(element.dataset.buildIndex));
      if (action === "match-pair") selectMatchPair(element.dataset.matchId, element.dataset.matchSide);
      if (action === "hint") toggleHint();
      if (action === "open-lesson-detail") openLessonDetail(element.dataset.detailKind);
      if (action === "close-lesson-detail") closeLessonDetail();
      if (action === "teaching-back") showPreviousTeachingStep();
      if (action === "dismiss-coachmark") dismissQuestionCoachmark();
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
      speakDutch(element.dataset.speak, false, element.dataset.regular === "true");
      NU.lesson.karaoke(getKaraokeTarget(element), { slow: element.dataset.regular !== "true" && progress.settings.slowAudio });
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

  // Toolkit word search filters in place, without re-rendering the list.
  document.querySelectorAll("[data-word-filter]").forEach((input) => {
    input.addEventListener("input", () => {
      const term = input.value.trim().toLowerCase();
      let shown = 0;
      document.querySelectorAll(".od-word-list .od-word").forEach((word) => {
        const match = !term || word.dataset.search.includes(term);
        word.hidden = !match;
        if (match) shown += 1;
      });
      const empty = document.querySelector(".pl-search-empty");
      if (empty) empty.hidden = shown > 0;
    });
  });

  bindLessonDetailAccessibility();
}

// The words that light up when a speak button plays: the nearest example, else the card's main word.
function getKaraokeTarget(button) {
  return button.closest(".teaching-example")?.querySelector("[data-karaoke]")
    || button.closest(".learning-teaching-card,.speak-repeat-question")?.querySelector("[data-karaoke]")
    || null;
}

function bindLessonDetailAccessibility() {
  const dialog = document.querySelector(".lesson-detail-sheet");
  if (!dialog) return;
  document.querySelector(".quiz-screen")?.setAttribute("inert", "");
  const focusable = [...dialog.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")]
    .filter((element) => !element.disabled && element.getAttribute("aria-hidden") !== "true");
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeLessonDetail();
      return;
    }
    if (event.key !== "Tab" || !focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  requestAnimationFrame(() => (focusable[0] || dialog).focus());
}

function bindExperienceMotion(screenChanged = false, previousScreen = "") {
  experienceObserver?.disconnect();
  OpenDoor.choreograph({ screen, question: screen === "lesson" ? getActiveQuestion()?.id : "", step: teachingStep, detail: lessonDetailKind, selected: selectedAnswer, checked, reduced: prefersReducedMotion(), portal: screenChanged && screen === "lesson" && previousScreen !== "lesson" });
}

function updateScrollMotion() {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progressValue = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  const scrollShift = Math.min(72, window.scrollY * 0.035);
  document.body.style.setProperty("--scroll-progress", progressValue.toFixed(4));
  document.body.style.setProperty("--scroll-shift", `${scrollShift.toFixed(1)}px`);
  document.body.style.setProperty("--atmosphere-scroll-back", `${(-scrollShift * 0.14).toFixed(1)}px`);
  document.body.style.setProperty("--atmosphere-scroll-forward", `${(scrollShift * 0.18).toFixed(1)}px`);
  document.body.style.setProperty("--atmosphere-scroll-deep", `${(-scrollShift * 0.2).toFixed(1)}px`);
  document.body.style.setProperty("--atmosphere-scroll-mesh", `${(scrollShift * 0.34).toFixed(1)}px`);
  const meter = document.querySelector(".experience-scroll-meter i");
  if (meter) meter.style.transform = `scaleY(${Math.max(0.035, progressValue)})`;
  scrollFrame = 0;
}

function bindGlobalPointerGlow() {
  if (globalMotionBound || !enhancedInteractiveEffects()) return;
  globalMotionBound = true;
  document.addEventListener("pointermove", (event) => {
    if (!enhancedInteractiveEffects()) return;
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
      updatePointerAtmosphere(event.clientX, event.clientY);
    });
  }, { passive: true });

  document.addEventListener("pointerdown", (event) => {
    if (!enhancedInteractiveEffects()) return;
    updatePointerAtmosphere(event.clientX, event.clientY);
    triggerAmbientPulse(event.clientX, event.clientY, event.pointerType === "touch");
  }, { passive: true });

  window.addEventListener("scroll", () => {
    if (!enhancedInteractiveEffects()) return;
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollMotion);
  }, { passive: true });
  window.addEventListener("resize", () => {
    if (!enhancedInteractiveEffects()) return;
    updateScrollMotion();
    updatePointerAtmosphere(lastPointerPosition.x, lastPointerPosition.y);
  }, { passive: true });
  updatePointerAtmosphere(lastPointerPosition.x, lastPointerPosition.y);
  updateScrollMotion();
}

function updatePointerAtmosphere(clientX, clientY) {
  const x = Math.max(0, Math.min(window.innerWidth, Number(clientX) || 0));
  const y = Math.max(0, Math.min(window.innerHeight, Number(clientY) || 0));
  const normalizedX = ((x / Math.max(1, window.innerWidth)) - 0.5) * 2;
  const normalizedY = ((y / Math.max(1, window.innerHeight)) - 0.5) * 2;
  lastPointerPosition = { x, y };
  document.body.style.setProperty("--pointer-x", `${x.toFixed(1)}px`);
  document.body.style.setProperty("--pointer-y", `${y.toFixed(1)}px`);
  document.body.style.setProperty("--pointer-nx", normalizedX.toFixed(4));
  document.body.style.setProperty("--pointer-ny", normalizedY.toFixed(4));
  document.body.style.setProperty("--ambient-x-primary", `${(-normalizedX * 28).toFixed(1)}px`);
  document.body.style.setProperty("--ambient-y-primary", `${(-normalizedY * 20).toFixed(1)}px`);
  document.body.style.setProperty("--ambient-x-secondary", `${(normalizedX * 34).toFixed(1)}px`);
  document.body.style.setProperty("--ambient-y-secondary", `${(normalizedY * 24).toFixed(1)}px`);
  document.body.style.setProperty("--ambient-x-warm", `${(normalizedX * 18).toFixed(1)}px`);
  document.body.style.setProperty("--ambient-y-warm", `${(-normalizedY * 30).toFixed(1)}px`);
  document.body.style.setProperty("--ambient-x-mesh", `${(-normalizedX * 12).toFixed(1)}px`);
  document.body.style.setProperty("--ambient-beam-rotate", `${(normalizedX * 5).toFixed(2)}deg`);
  document.body.style.setProperty("--ambient-beam-x", `${(normalizedX * 20).toFixed(1)}px`);
  document.body.style.setProperty("--ambient-beam-y", `${(normalizedY * 14).toFixed(1)}px`);
}

function triggerAmbientPulse(clientX, clientY, compact = false) {
  if (!enhancedInteractiveEffects()) return;
  const atmosphere = document.querySelector(".responsive-atmosphere");
  if (!atmosphere) return;
  const pulse = document.createElement("span");
  pulse.className = `atmosphere-pulse ${compact ? "is-compact" : ""}`;
  pulse.style.left = `${clientX}px`;
  pulse.style.top = `${clientY}px`;
  atmosphere.append(pulse);
  window.setTimeout(() => pulse.remove(), 1000);
}

function triggerWorldTransition() {
  if (prefersReducedMotion()) return;
  window.clearTimeout(worldTransitionTimer);
  document.body.classList.remove("world-transition");
  requestAnimationFrame(() => document.body.classList.add("world-transition"));
  worldTransitionTimer = window.setTimeout(() => document.body.classList.remove("world-transition"), 920);
}

function animateCountUpMetrics() {
  document.querySelectorAll("[data-count-up]").forEach((element, index) => {
    window.setTimeout(() => {
      NU.motion.countUp(element, Number(element.dataset.countUp || 0), {
        suffix: element.dataset.countSuffix || "",
        prefix: element.dataset.countPrefix || ""
      });
      NU.sound.play("xp");
    }, 600 + index * 260);
  });
}

function triggerPressRipple(element, event) {
  if (prefersReducedMotion() || !element?.append) return;
  const bounds = element.getBoundingClientRect();
  const size = Math.max(bounds.width, bounds.height) * 1.6;
  const ripple = document.createElement("span");
  ripple.className = "press-ripple";
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - bounds.left - size / 2}px`;
  ripple.style.top = `${event.clientY - bounds.top - size / 2}px`;
  element.append(ripple);
  window.setTimeout(() => ripple.remove(), 650);
}

function animateSpeakingControl(element) {
  if (!element) return;
  element.classList.remove("is-speaking");
  requestAnimationFrame(() => element.classList.add("is-speaking"));
  window.setTimeout(() => element.classList.remove("is-speaking"), 1350);
}

function triggerAnswerMoment(correct, compact = false) {
  if (compact) {
    NU.sound.play("pop");
    NU.haptics.play("select");
    return;
  }
  const panel = document.querySelector(".quiz-feedback-panel");
  const icon = panel?.querySelector(".feedback-icon");
  if (!correct) {
    NU.sound.play("wrong");
    NU.haptics.play("error");
    NU.motion.shake(document.querySelector(".choice-button.wrong") || icon);
    return;
  }
  const streak = answerCombo >= 3 && answerCombo % 3 === 0;
  NU.sound.play("correct", { combo: answerCombo });
  if (streak) window.setTimeout(() => NU.sound.play("streak"), 260);
  NU.haptics.play(streak ? "streak" : "success");
  NU.motion.jelly(icon);
  NU.motion.burst(icon, { count: streak ? 28 : 14, spread: streak ? 150 : 90 });
  NU.motion.bump(document.querySelector(".choice-button.correct"));
  NU.motion.pop(document.querySelector(".quiz-combo"));
  NU.lesson.streakToast(answerCombo);
}

function triggerLessonCelebration() {
  NU.sound.play("complete");
  NU.haptics.play("celebrate");
  if (prefersReducedMotion()) return;
  document.body.classList.remove("celebrating-lesson");
  requestAnimationFrame(() => document.body.classList.add("celebrating-lesson"));
  window.setTimeout(() => document.body.classList.remove("celebrating-lesson"), 2400);
  NU.motion.confetti();
  const pim = document.querySelector(".pl-complete-pim .nu-cat");
  NU.cat.act(pim, "hop");
  window.setTimeout(() => NU.cat.act(pim, "wave"), 650);
  NU.motion.stagger(".pl-stat", "pop", { each: 120, from: 200 });
  animateCountUpMetrics();
  // The stamp lands once the numbers have counted; a first practice of the day grows the tulip.
  const stampSlot = document.querySelector(".pl-stamp-slot");
  if (stampSlot) {
    stampSlot.style.opacity = "0";
    window.setTimeout(() => { stampSlot.style.opacity = ""; NU.rewards.revealStamp(stampSlot); }, 1500);
  }
  if (lessonResult?.firstPracticeToday) NU.rewards.growTulip(document.querySelector(".pl-streak-tulip svg"));
}

// Moving to a teaching card's next step turns the card over like a flashcard.
function flipTeachingCard() {
  const card = screen === "lesson" ? document.querySelector(".progressive-teaching-card[data-teaching-step]") : null;
  const face = card ? { id: String(getActiveQuestion()?.id || ""), step: Number(card.dataset.teachingStep) } : { id: "", step: 0 };
  if (card && face.id === lastTeachingFace.id && face.step !== lastTeachingFace.step) {
    card.getAnimations().forEach((animation) => animation.cancel());
    const forward = face.step > lastTeachingFace.step;
    NU.motion.animate(card, [
      { transform: `perspective(1000px) rotateY(${forward ? -88 : 88}deg)`, opacity: 0.3 },
      { transform: "perspective(1000px) rotateY(0deg)", opacity: 1 }
    ], { spring: "snappy" });
    NU.sound.play("swish");
  }
  lastTeachingFace = face;
}

// The lesson bar is re-rendered on every step, so carry its old width forward and spring to the new one.
function animateLessonProgress() {
  const bar = screen === "lesson" ? document.querySelector(".quiz-progress span") : null;
  if (!bar) {
    lastLessonProgress = null;
    return;
  }
  const next = bar.style.width;
  if (lastLessonProgress !== null && lastLessonProgress !== next) {
    NU.motion.animate(bar, [{ width: lastLessonProgress }, { width: next }], { spring: "bouncy" });
  }
  lastLessonProgress = next;
}

function scrollToTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  requestAnimationFrame(() => window.scrollTo(0, 0));
}

function goHome() {
  activeWordHelp = null;
  lessonDetailKind = "";
  teachingStep = 0;
  coachmarkDismissed = false;
  activeReview = null;
  pathCardLessonId = "";
  pathExpanded = false;
  screen = "home";
  render();
  scrollToTop();
}

function goPractice() {
  activeWordHelp = null;
  lessonDetailKind = "";
  teachingStep = 0;
  coachmarkDismissed = false;
  activeReview = null;
  screen = "practice";
  render();
  scrollToTop();
}

function goLetters() {
  activeWordHelp = null;
  lessonDetailKind = "";
  teachingStep = 0;
  coachmarkDismissed = false;
  activeReview = null;
  screen = "letters";
  render();
  scrollToTop();
}

function goSettings() {
  activeWordHelp = null;
  lessonDetailKind = "";
  teachingStep = 0;
  coachmarkDismissed = false;
  activeReview = null;
  screen = "settings";
  render();
  scrollToTop();
}

// The street door opens, the camera pushes in, and the preview appears out of the light.
function enterLessonDoor(door) {
  const lessonId = door?.dataset.lesson;
  if (!lessonId || door.dataset.entering) return;
  door.dataset.entering = "true";
  NU.street.enterDoor(door).then((fadeLight) => {
    OpenDoor.skipNextTransition();
    showLessonPreview(lessonId);
    fadeLight();
  });
}

function showLessonPreview(id) {
  const lesson = getLesson(id);
  const chapter = getChapterForLesson(lesson.id);
  selectedChapterId = chapter.id;
  previewLessonId = lesson.id;
  activeWordHelp = null;
  lessonDetailKind = "";
  teachingStep = 0;
  coachmarkDismissed = false;
  activeReview = null;
  pathCardLessonId = lesson.id;
  saveProgress({ ...progress, selectedChapterId: selectedChapterId, lastLessonId: lesson.id });
  screen = "preview";
  render();
  scrollToTop();
}

function selectChapter(id) {
  const chapter = chapters.find((item) => item.id === id);
  if (!chapter) return;
  selectedChapterId = chapter.id;
  const nextLesson = getNextLessonForChapter(chapter);
  activeLessonId = nextLesson.id;
  previewLessonId = nextLesson.id;
  activeReview = null;
  lessonDetailKind = "";
  teachingStep = 0;
  coachmarkDismissed = false;
  pathCardLessonId = "";
  pathExpanded = false;
  saveProgress({ ...progress, selectedChapterId: selectedChapterId, lastLessonId: activeLessonId });
  screen = "journey";
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
  if (!lesson || (!getLessonExercises(lesson).length && !getLearningRuns(lesson).length)) {
    screen = "home";
    render();
    return;
  }
  if (lesson.kind === "mission"
    && (getMissingPrerequisites(lesson).length || getMissingMissionPrerequisites(lesson).length)) {
    previewLessonId = lesson.id;
    screen = "preview";
    render();
    scrollToTop();
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
  lessonDetailKind = "";
  coachmarkDismissed = false;
  teachingStep = 0;
  answerCombo = 0;
  bestAnswerCombo = 0;
  sessionAnswers = [];
  activeLearningRun = lesson.kind === "mission" ? null : selectLearningRun(lesson);
  pendingCorrectionQuestion = null;
  pendingCorrectionQuestions = [];
  correctedCheckQuestionIds = new Set();
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
  lessonDetailKind = "";
  coachmarkDismissed = false;
  teachingStep = 0;
  answerCombo = 0;
  bestAnswerCombo = 0;
  sessionAnswers = [];
  activeLearningRun = null;
  pendingCorrectionQuestion = null;
  pendingCorrectionQuestions = [];
  correctedCheckQuestionIds = new Set();
  sessionQuestions = buildSessionQuestions(activeReview);
  screen = "lesson";
  render();
  scrollToTop();
}

function chooseAnswer(answer) {
  if (checked) return;
  activeWordHelp = null;
  const changed = selectedAnswer !== answer;
  selectedAnswer = answer;
  updateChoiceSelection();
  if (!changed) return;
  NU.sound.play("select");
  NU.haptics.play("select");
  NU.motion.pop(document.querySelector(".choice-button.selected .choice-key"));
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

  document.querySelectorAll(".word-help-popover").forEach((element) => element.remove());
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

function openLessonDetail(kind) {
  if (!["concept", "pattern", "feedback", "correction", "notes"].includes(kind)) return;
  if (!lessonDetailKind || lessonDetailReturnScrollTop === null) {
    lessonDetailReturnScrollTop = getLessonContentScrollTop();
  }
  lessonDetailKind = kind;
  activeWordHelp = null;
  render();
  restoreLessonContentScrollTop(lessonDetailReturnScrollTop);
}

function closeLessonDetail() {
  if (!lessonDetailKind) return;
  const closedKind = lessonDetailKind;
  const returnScrollTop = lessonDetailReturnScrollTop ?? getLessonContentScrollTop();
  lessonDetailKind = "";
  render();
  restoreLessonContentScrollTop(returnScrollTop);
  requestAnimationFrame(() => {
    const returnControl = document.querySelector(`[data-action="open-lesson-detail"][data-detail-kind="${closedKind}"]`);
    try {
      returnControl?.focus({ preventScroll: true });
    } catch {
      returnControl?.focus();
    }
    restoreLessonContentScrollTop(returnScrollTop);
    lessonDetailReturnScrollTop = null;
  });
}

function getLessonContentScrollTop() {
  const content = document.querySelector(".quiz-content");
  const internal = content && /auto|scroll/.test(getComputedStyle(content).overflowY) && content.scrollHeight > content.clientHeight;
  return internal ? content.scrollTop : window.scrollY;
}

function restoreLessonContentScrollTop(scrollTop) {
  if (!Number.isFinite(scrollTop)) return;
  const restore = () => {
    const content = document.querySelector(".quiz-content");
    const internal = content && /auto|scroll/.test(getComputedStyle(content).overflowY) && content.scrollHeight > content.clientHeight;
    if (internal) content.scrollTop = scrollTop;
    else window.scrollTo(0, scrollTop);
  };
  restore(); requestAnimationFrame(restore);
}

function showPreviousTeachingStep() {
  if (teachingStep <= 0) return;
  teachingStep -= 1;
  lessonDetailKind = "";
  hintOpen = false;
  render();
  scrollToTop();
}

function dismissQuestionCoachmark() {
  coachmarkDismissed = true;
  render();
}

function handleNederUrduBack() {
  if (lessonDetailKind) {
    closeLessonDetail();
    return true;
  }
  if (screen === "lesson" && teachingStep > 0) {
    showPreviousTeachingStep();
    return true;
  }
  if (screen === "lesson" && hintOpen) {
    hintOpen = false;
    render();
    return true;
  }
  if (screen === "lesson" && getActiveQuestion()?.contextCoachmark && !coachmarkDismissed) {
    dismissQuestionCoachmark();
    return true;
  }
  if (screen === "lesson") {
    goHome();
    return true;
  }
  if (screen === "letters") { goDestination("toolkit"); return true; }
  if (screen === "passport") { goDestination("journey"); return true; }
  if (screen !== "home") { goHome(); return true; }
  return false;
}

window.handleNederUrduBack = handleNederUrduBack;

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
    triggerAnswerMoment(true, true);
    document.querySelectorAll(`.match-pair-card[data-match-id="${CSS.escape(id)}"]`).forEach((card) => NU.motion.jelly(card));
    return;
  }
  matchPairError = id;
  matchSelection = null;
  render();
  NU.sound.play("deselect");
  NU.haptics.play("error");
  document.querySelectorAll(".match-pair-card.wrong").forEach((card) => NU.motion.shake(card));
}

function continueInfoStep() {
  const question = getActiveQuestion();
  if (teachingStep < getTeachingStepCount(question) - 1) {
    teachingStep += 1;
    lessonDetailKind = "";
    hintOpen = false;
    render();
    scrollToTop();
    return;
  }
  if (getQuestionPhase(question) === "learn") {
    const skillIds = getQuestionSkillIds(question);
    const phaseComplete = !sessionQuestions.slice(activeQuestionIndex + 1).some((item) => getQuestionPhase(item) === "learn");
    persistSkillMastery(skillIds, "introduced", {
      lessonId: getActiveLesson()?.id,
      runId: activeLearningRun?.id,
      phaseComplete
    });
  }
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
  answerCombo = correct ? answerCombo + 1 : 0;
  bestAnswerCombo = Math.max(bestAnswerCombo, answerCombo);
  lessonProgressSteps = correct
    ? Math.max(lessonProgressSteps, activeQuestionIndex + 1)
    : Math.max(0, lessonProgressSteps - 1);
  sessionAnswers.push({
    questionId: question.id,
    prompt: question.prompt,
    answer: question.answer,
    selected: selectedAnswer,
    correct,
    phase: getQuestionPhase(question),
    conceptIds: getQuestionConceptIds(question),
    skillIds: getQuestionSkillIds(question),
    skillId: getQuestionSkillIds(question)[0] || question.skillId || "",
    correctionRootId: question.correctionRootId || "",
    correctionOriginPhase: question.correctionOriginPhase
      || (question.originalQuestion ? getQuestionPhase(question.originalQuestion) : ""),
    mistakeOrigin: question.mistakeOrigin || null
  });
  const phase = getQuestionPhase(question);
  if (correct && !getActiveLesson()?.reviewKind && (phase === "guided" || phase === "use")) {
    persistSkillMastery(getQuestionSkillIds(question), "practiced", {
      lessonId: getActiveLesson()?.id,
      runId: activeLearningRun?.id,
      updateLesson: false
    });
  }
  const correctionOriginPhase = question.correctionOriginPhase
    || (question.originalQuestion ? getQuestionPhase(question.originalQuestion) : "");
  if (correct && question.correctionRetry) {
    correctedCheckQuestionIds.add(question.correctionRootId || question.id);
    if (
      !getActiveLesson()?.reviewKind
      && ["guided", "use"].includes(correctionOriginPhase)
    ) {
      persistSkillMastery(getQuestionSkillIds(question), "practiced", {
        lessonId: getActiveLesson()?.id,
        runId: activeLearningRun?.id,
        correctedPractice: true,
        updateLesson: false
      });
    }
  }
  const correctionQuestion = correct ? question : {
    ...question,
    selectedWrongAnswer: selectedAnswer,
    selectedWrongExplanation: getWrongOptionExplanation(question, selectedAnswer)
  };
  if (!correct && question.correctionRetry) {
    pendingCorrectionQuestion = correctionQuestion;
  } else if (!correct) {
    const rootId = question.correctionRootId || question.id;
    if (!pendingCorrectionQuestions.some((item) => (item.correctionRootId || item.id) === rootId)) {
      pendingCorrectionQuestions.push(correctionQuestion);
    }
  }
  checked = true;
  render();
  requestAnimationFrame(() => triggerAnswerMoment(correct));
}

function nextQuestion() {
  const lesson = getActiveLesson();
  const questions = sessionQuestions.length ? sessionQuestions : lesson.questions;
  if (pendingCorrectionQuestion) {
    const correctionPair = buildCorrectionPair(pendingCorrectionQuestion);
    pendingCorrectionQuestion = null;
    sessionQuestions.splice(activeQuestionIndex + 1, 0, ...correctionPair);
  }
  const hasRemainingOriginalQuestion = questions
    .slice(activeQuestionIndex + 1)
    .some((question) => getQuestionPhase(question) !== "correction");
  if (getQuestionPhase(questions[activeQuestionIndex]) !== "correction"
    && !hasRemainingOriginalQuestion
    && pendingCorrectionQuestions.length) {
    const correctionPairs = pendingCorrectionQuestions.flatMap((question) => buildCorrectionPair(question));
    pendingCorrectionQuestions = [];
    sessionQuestions.push(...correctionPairs);
  }
  if (activeQuestionIndex < questions.length - 1) {
    activeQuestionIndex += 1;
    selectedAnswer = "";
    checked = false;
    activeWordHelp = null;
    buildAnswerIds = [];
    hintOpen = false;
    lessonDetailKind = "";
    coachmarkDismissed = false;
    teachingStep = 0;
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

function buildCorrectionPair(question) {
  const rootQuestion = question.originalQuestion || question;
  const rootId = question.correctionRootId || rootQuestion.id;
  const attemptNumber = sessionAnswers.filter((answer) => answer.correctionRootId === rootId || answer.questionId === rootId).length;
  const teaching = {
    id: `${rootId}-correction-${attemptNumber}`,
    type: "correction-teach",
    phase: "correction",
    instructionUrdu: "صحیح جواب دیکھیں، پھر اسی بات کو دوبارہ آزمائیں",
    prompt: "دوبارہ کوشش کی تیاری",
    answer: "سمجھ گیا",
    conceptIds: getQuestionConceptIds(rootQuestion),
    skillIds: getQuestionSkillIds(rootQuestion),
    originalQuestion: rootQuestion,
    wrongExplanation: question.selectedWrongExplanation
      || rootQuestion.wrongExplanation
      || rootQuestion.feedback?.wrong
      || rootQuestion.explain
  };
  const retry = prepareSessionQuestion({
    ...cloneQuestion(rootQuestion),
    id: `${rootId}-supported-retry-${attemptNumber}`,
    phase: "correction",
    instructionUrdu: rootQuestion.retryInstructionUrdu || "مدد دیکھ کر اسی بات کا صحیح جواب دوبارہ دیں",
    hint: rootQuestion.hint || rootQuestion.wrongExplanation || rootQuestion.explain || "صحیح معنی اور مثال کو دیکھ کر جواب چنیں۔",
    correctionRetry: true,
    correctionRootId: rootId,
    correctionOriginPhase: getQuestionPhase(rootQuestion),
    originalQuestion: rootQuestion,
    supported: true
  });
  return [teaching, retry];
}

function completeLesson(lesson) {
  const questions = sessionQuestions.length ? sessionQuestions : lesson.questions;
  const scoredQuestions = questions.filter((question) => !isInfoQuestion(question));
  lessonProgressSteps = questions.length;
  const isReview = Boolean(lesson.reviewKind);
  const independentAnswers = sessionAnswers.filter((answer) => answer.phase === "check" && !answer.correctionRootId);
  const assessmentAnswers = independentAnswers.length
    ? independentAnswers
    : sessionAnswers.filter((answer) => answer.phase !== "correction");
  const correct = assessmentAnswers.filter((answer) => answer.correct).length;
  const total = independentAnswers.length || scoredQuestions.filter((question) => getQuestionPhase(question) !== "correction").length;
  const missedCheckIds = independentAnswers.filter((answer) => !answer.correct).map((answer) => answer.questionId);
  const unresolvedCheckIds = missedCheckIds.filter((questionId) => !correctedCheckQuestionIds.has(questionId));
  const missedRequiredIds = sessionAnswers
    .filter((answer) => !answer.correct && answer.phase !== "correction")
    .map((answer) => answer.questionId);
  const unresolvedRequiredIds = missedRequiredIds.filter((questionId) => !correctedCheckQuestionIds.has(questionId));
  const minimumScore = Number(activeLearningRun?.phases?.independentCheck?.minimumScore || 0.8);
  const independentRate = independentAnswers.length ? correct / independentAnswers.length : 0;
  const requiredRunSkillIds = isReview
    ? []
    : lesson.kind === "mission"
      ? getMissionAssessmentSkillIds(lesson)
      : getLessonSkillIds(lesson, activeLearningRun);
  const independentSkillIds = normalizeIdList(
    independentAnswers.flatMap((answer) => answer.skillIds || answer.skillId || [])
  );
  const independentCheckCoversRequiredSkills = requiredRunSkillIds.length > 0
    && requiredRunSkillIds.every((skillId) => independentSkillIds.includes(skillId));
  const practicedEvidenceSkillIds = normalizeIdList(
    sessionAnswers
      .filter((answer) => (
        answer.correct
        && (
          ["guided", "use"].includes(answer.phase)
          || (
            answer.phase === "correction"
            && answer.correctionRootId
            && ["guided", "use"].includes(answer.correctionOriginPhase)
          )
        )
      ))
      .flatMap((answer) => answer.skillIds || answer.skillId || [])
  );
  const practicedStateSkillIds = requiredRunSkillIds.filter((skillId) => (
    statusAtLeast(getSkillStatus(skillId), "practiced")
    || practicedEvidenceSkillIds.includes(skillId)
  ));
  const requiredPracticeComplete = requiredRunSkillIds.length > 0
    && requiredRunSkillIds.every((skillId) => practicedStateSkillIds.includes(skillId));
  const currentRunSecure = Boolean(independentAnswers.length)
    && independentRate >= minimumScore
    && unresolvedCheckIds.length === 0
    && unresolvedRequiredIds.length === 0
    && requiredPracticeComplete
    && independentCheckCoversRequiredSkills;
  const alreadyCompleted = progress.completedLessons.includes(lesson.id);
  const previousRunState = progress.lessonRunProgress?.[lesson.id] || {};
  const completedRunIds = new Set(previousRunState.completedRunIds || []);
  const practicedRunIds = new Set(previousRunState.practicedRunIds || []);
  const secureRunIds = new Set(previousRunState.secureRunIds || []);
  if (activeLearningRun?.id) completedRunIds.add(activeLearningRun.id);
  if (activeLearningRun?.id && requiredPracticeComplete) practicedRunIds.add(activeLearningRun.id);
  if (activeLearningRun?.id && currentRunSecure) secureRunIds.add(activeLearningRun.id);
  const allRunIds = getLearningRuns(lesson).map((run) => run.id);
  const allRunsCompleted = !allRunIds.length || allRunIds.every((runId) => completedRunIds.has(runId));
  const allRunsPracticed = Boolean(allRunIds.length) && allRunIds.every((runId) => practicedRunIds.has(runId));
  const allRunsSecure = Boolean(allRunIds.length) && allRunIds.every((runId) => secureRunIds.has(runId));
  const completedNow = !isReview && allRunsCompleted;
  const earnedXp = isReview || alreadyCompleted || !completedNow ? 0 : lesson.xp;
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
    .filter((answer) => !answer.correct
      && answer.phase !== "correction"
      && !correctedCheckQuestionIds.has(answer.questionId))
    .map((answer) => ({
      lessonId: isReview ? findLessonIdForQuestion(answer.prompt, answer.answer, answer.questionId) : lesson.id,
      questionId: answer.questionId,
      skillId: answer.skillIds?.[0] || answer.skillId,
      skillIds: answer.skillIds || [],
      conceptIds: answer.conceptIds || [],
      prompt: answer.prompt,
      answer: answer.answer,
      selected: answer.selected,
      date: todayKey()
    }));
  const keptMistakes = lesson.reviewKind === "mistakes"
    ? progress.mistakes.filter((mistake) => !correctedMistakes.has(mistakeKey(mistake)))
    : progress.mistakes;

  const currentLessonMasteryStatus = lesson.kind === "mission"
    ? requiredPracticeComplete
      ? "practiced"
      : "introduced"
    : allRunsSecure
      ? "secure"
      : allRunsPracticed
        ? "practiced"
        : "introduced";
  const nextCompletedLessons = isReview || alreadyCompleted || !completedNow
    ? progress.completedLessons
    : [...progress.completedLessons, lesson.id];
  const stampUnit = isReview ? null : getStampUnitForLesson(lesson);
  const newStamp = stampUnit
    && !progress.stamps?.[stampUnit.id]
    && stampUnit.lessonIds.every((id) => nextCompletedLessons.includes(id))
    ? stampUnit.id
    : "";
  lessonResult = {
    lessonId: lesson.id,
    newStamp,
    firstPracticeToday: !progress.practiceDays.includes(todayKey()),
    correct,
    total: Math.max(1, total),
    xp: earnedXp,
    reviewKind: lesson.reviewKind || "",
    masteryStatus: isReview ? "" : currentLessonMasteryStatus,
    independentRate,
    correctedCount: missedRequiredIds.length - unresolvedRequiredIds.length,
    unresolvedCount: unresolvedRequiredIds.length,
    learnedConcepts: [
      ...getLessonConceptIds(lesson, activeLearningRun).map((conceptId) => courseConcepts.get(conceptId)?.dutch || conceptId),
      ...(activeLearningRun?.patternId && lesson.pattern
        ? [lesson.pattern.modelDutch || lesson.pattern.titleUrdu || activeLearningRun.patternId]
        : [])
    ],
    remainingRuns: Math.max(0, allRunIds.length - completedRunIds.size)
  };

  const lessonMastery = { ...(progress.lessonMastery || {}) };
  const skillMastery = { ...(progress.skillMastery || {}) };
  if (!isReview) {
    const lessonEvidence = {
      runId: activeLearningRun?.id || "",
      independentCorrect: correct,
      independentTotal: independentAnswers.length,
      correctedMisses: missedCheckIds.length - unresolvedCheckIds.length,
      unresolvedMisses: unresolvedCheckIds.length
    };
    lessonMastery[lesson.id] = lesson.kind === "mission"
      ? raiseMastery(lessonMastery[lesson.id], currentLessonMasteryStatus, lessonEvidence)
      : {
        ...(lessonMastery[lesson.id] || {}),
        ...lessonEvidence,
        status: currentLessonMasteryStatus,
        updatedAt: new Date().toISOString()
      };
    const introducedSkillIds = requiredRunSkillIds;
    const practicedSkillIds = practicedEvidenceSkillIds;
    const secureSkillIds = currentRunSecure
      ? requiredRunSkillIds
      : [];
    for (const skillId of introducedSkillIds) skillMastery[skillId] = raiseMastery(skillMastery[skillId], "introduced", { lessonId: lesson.id });
    for (const skillId of practicedSkillIds) skillMastery[skillId] = raiseMastery(skillMastery[skillId], "practiced", { lessonId: lesson.id });
    for (const skillId of secureSkillIds) skillMastery[skillId] = raiseMastery(skillMastery[skillId], "secure", { lessonId: lesson.id });
  }

  saveProgress({
    ...progress,
    completedLessons: nextCompletedLessons,
    stamps: newStamp ? { ...(progress.stamps || {}), [newStamp]: todayKey() } : (progress.stamps || {}),
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
    skillAttempts: sessionAnswers
      .filter((answer) => answer.phase !== "correction")
      .reduce((attempts, answer) => {
      const skillIds = normalizeIdList(answer.skillIds, answer.skillId);
      for (const skillId of skillIds) {
        const previous = attempts[skillId] || { correct: 0, total: 0 };
        attempts[skillId] = { correct: previous.correct + (answer.correct ? 1 : 0), total: previous.total + 1 };
      }
      return attempts;
    }, { ...(progress.skillAttempts || {}) }),
    skillReviewHistory: isReview
      ? updateSkillReviewHistory(progress.skillReviewHistory, sessionAnswers)
      : (progress.skillReviewHistory || {}),
    lessonMastery,
    skillMastery,
    lessonRunProgress: isReview || !activeLearningRun?.id ? (progress.lessonRunProgress || {}) : {
      ...(progress.lessonRunProgress || {}),
      [lesson.id]: {
        ...previousRunState,
        completedRunIds: [...completedRunIds],
        practicedRunIds: [...practicedRunIds],
        secureRunIds: [...secureRunIds],
        lastRunId: activeLearningRun.id,
        updatedAt: new Date().toISOString()
      }
    },
    totalXp: progress.totalXp + earnedXp,
    practiceDays,
    mistakes: [...keptMistakes, ...newMistakes],
    lastLessonId: isReview ? progress.lastLessonId : lesson.id
  });

  activeReview = null;
  screen = "complete";
  render();
  requestAnimationFrame(triggerLessonCelebration);
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
  answerCombo = 0;
  bestAnswerCombo = 0;
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
  if (!lesson?.reviewKind && lesson?.kind !== "mission" && getLearningRuns(lesson).length) {
    const activeRunBelongsToLesson = activeLearningRun
      && getLearningRuns(lesson).some((run) => run.id === activeLearningRun.id);
    activeLearningRun = activeRunBelongsToLesson ? activeLearningRun : selectLearningRun(lesson);
    return buildLearningFirstSession(lesson, activeLearningRun);
  }
  const sourceQuestions = lesson?.reviewKind
    ? lesson.questions
    : lesson?.kind === "mission"
      ? lesson.variants[(progress.missionVariantRuns?.[lesson.id] || 0) % lesson.variants.length].questions
      : (lesson?.questions || []);
  const lessonIntro = lesson?.kind === "mission" ? null : getLessonIntroQuestion(lesson, sourceQuestions);
  const questions = lessonIntro ? [lessonIntro, ...sourceQuestions] : sourceQuestions;
  return questions.map((question) => prepareSessionQuestion(question));
}

function buildLearningFirstSession(lesson, run) {
  if (!run) return [];
  const exerciseById = new Map(getLessonExercises(lesson).flatMap((question) => [
    [question.id, question],
    ...(question.legacyId ? [[question.legacyId, question]] : [])
  ]));
  const runConcepts = run.conceptIds.map((conceptId) => courseConcepts.get(conceptId)).filter(Boolean);
  const newConceptIds = run.newConceptIds?.length ? run.newConceptIds : run.conceptIds;
  const newConcepts = newConceptIds.map((conceptId) => courseConcepts.get(conceptId)).filter(Boolean);
  const practiceConcepts = newConcepts.length ? newConcepts : runConcepts;
  const phaseConfig = run.phases || {};
  const questions = [];

  const teachingBlockById = new Map(
    [...(lesson.teachingBlocks || []), ...(run.teachingBlocks || [])]
      .filter(Boolean)
      .map((block) => [block.id || `${block.type}-${block.conceptId || block.patternId}`, block])
  );
  const requestedTeachingIds = normalizeIdList(phaseConfig.learn?.teachingBlockIds, run.teachingBlockIds);
  const requestedBlocks = requestedTeachingIds.map((id) => teachingBlockById.get(id)).filter(Boolean);
  const teachingBlocks = requestedBlocks.length ? requestedBlocks : [...teachingBlockById.values()];
  const taughtConceptIds = new Set();
  let patternAdded = false;

  for (const block of teachingBlocks) {
    if (block.type === "concept" || block.conceptId) {
      const concept = courseConcepts.get(block.conceptId);
      const refreshNeeded = block.mode === "refresh"
        && (!getConceptSkillIds(concept, run).length
          || getConceptSkillIds(concept, run).some((skillId) => !statusAtLeast(getSkillStatus(skillId), "secure")));
      if (!newConceptIds.includes(block.conceptId) && !refreshNeeded) continue;
      if (!concept || taughtConceptIds.has(concept.id)) continue;
      questions.push(makeConceptTeachingQuestion(lesson, run, concept, block));
      taughtConceptIds.add(concept.id);
    }
    if (block.type === "pattern" || block.patternId) {
      const pattern = lesson.pattern || block.pattern;
      if (!pattern || (run.patternId && pattern.id && pattern.id !== run.patternId)) continue;
      questions.push(makePatternTeachingQuestion(lesson, run, pattern, block));
      patternAdded = true;
    }
  }
  for (const concept of newConcepts) {
    if (!taughtConceptIds.has(concept.id)) questions.push(makeConceptTeachingQuestion(lesson, run, concept));
  }
  if (run.patternId && lesson.pattern && !patternAdded) {
    questions.push(makePatternTeachingQuestion(lesson, run, lesson.pattern));
  }

  const understand = getRunPhaseExercises(phaseConfig.understand, exerciseById, run, "understand")
    .filter((question) => !(question.type === "uitleg" && question.taskDemonstration));
  const conceptsWithRecognition = new Set(understand.flatMap(getQuestionConceptIds));
  const skillsWithRecognition = new Set(understand.flatMap(getQuestionSkillIds));
  const taughtConcepts = [...taughtConceptIds].map((conceptId) => courseConcepts.get(conceptId)).filter(Boolean);
  for (const concept of taughtConcepts) {
    if (!conceptsWithRecognition.has(concept.id)) understand.push(makeRecognitionQuestion(run, concept, runConcepts));
  }
  if (run.patternId && lesson.pattern) {
    const patternSkillIds = getPatternSkillIds(lesson.pattern, run);
    if (patternSkillIds.some((skillId) => !skillsWithRecognition.has(skillId))) {
      understand.push(makePatternRecognitionQuestion(run, lesson.pattern, runConcepts));
    }
  }
  const firstSupportedExerciseIndex = understand.findIndex((question) => !isInfoQuestion(question));
  if (firstSupportedExerciseIndex >= 0) {
    const firstSupportedExercise = understand[firstSupportedExerciseIndex];
    understand[firstSupportedExerciseIndex] = {
      ...firstSupportedExercise,
      contextCoachmark: firstSupportedExercise.type === "listen-choice"
        ? "آواز سنیں، پھر وہی مطلب منتخب کریں جو ابھی سیکھا ہے۔ یہاں نمبر نہیں کٹیں گے۔"
        : "ابھی سیکھا ہوا مطلب پہچانیں اور جواب منتخب کریں۔ یہاں نمبر نہیں کٹیں گے۔"
    };
  }
  questions.push(...understand);

  const guidedConfig = phaseConfig.guidedPractice || phaseConfig.guided;
  const guided = getRunPhaseExercises(guidedConfig, exerciseById, run, "guided");
  if (!guided.length) {
    guided.push(...practiceConcepts.map((concept) => makeGuidedQuestion(run, concept, runConcepts)));
  }
  questions.push(...guided);

  const use = getRunPhaseExercises(phaseConfig.use, exerciseById, run, "use");
  if (!use.length && practiceConcepts.length) {
    use.push(...practiceConcepts.slice(0, Math.min(2, practiceConcepts.length)).map((concept) => makeUseQuestion(run, concept, runConcepts)));
  }
  questions.push(...use);

  const authoredCheck = getRunPhaseExercises(
    phaseConfig.independentCheck || phaseConfig.check,
    exerciseById,
    run,
    "check"
  );
  const check = [...authoredCheck];
  let generatedIndex = 0;
  while (check.length < 4 && practiceConcepts.length) {
    const concept = practiceConcepts[generatedIndex % practiceConcepts.length];
    const generated = generatedIndex % 2 === 0
      ? makeRecognitionQuestion(run, concept, runConcepts, "check", generatedIndex)
      : makeGuidedQuestion(run, concept, runConcepts, "check", generatedIndex);
    if (!check.some((question) => question.id === generated.id)) check.push(generated);
    generatedIndex += 1;
    if (generatedIndex > 20) break;
  }
  while (check.length < 4 && run.patternId && lesson.pattern) {
    check.push(makePatternCheckQuestion(run, lesson.pattern, runConcepts, check.length));
  }
  while (check.length < 4 && authoredCheck.length) {
    const source = authoredCheck[check.length % authoredCheck.length];
    check.push({
      ...cloneQuestion(source),
      id: `${source.id}-coverage-${check.length + 1}`,
      phase: "check",
      instructionUrdu: source.instructionUrdu || source.instruction || source.label || "اسی مہارت کو ایک نئی بار بغیر مدد کے جانچیں"
    });
  }
  questions.push(...check.slice(0, 6));

  return questions.map(prepareSessionQuestion);
}

function getRunPhaseExercises(config, exerciseById, run, phase) {
  const ids = normalizeIdList(config?.exerciseIds);
  const exercises = ids.map((id) => exerciseById.get(id)).filter(Boolean);
  return exercises
    .filter((question) => isExerciseInLearningRun(question, run))
    .map((question) => normalizeLearningExercise(question, phase));
}

function isExerciseInLearningRun(question, run) {
  if (question?.runId && question.runId !== run.id) return false;
  const conceptIds = getQuestionConceptIds(question);
  const skillIds = getQuestionSkillIds(question);
  const allowedConceptIds = new Set(run.conceptIds || []);
  const allowedSkillIds = new Set(run.skillIds || []);
  const conceptsAllowed = !conceptIds.length || conceptIds.every((id) => allowedConceptIds.has(id));
  const skillsAllowed = !skillIds.length || skillIds.every((id) => allowedSkillIds.has(id));
  return conceptsAllowed && skillsAllowed;
}

function normalizeLearningExercise(question, phase) {
  const instructionUrdu = question.instructionUrdu || question.instruction || question.label || getGeneratedInstruction(question.type, phase);
  return {
    ...cloneQuestion(question),
    phase,
    instructionUrdu,
    supported: ["understand", "guided"].includes(phase),
    hint: question.hint || (phase === "understand"
      ? "ابھی سکھایا ہوا معنی، آواز، اور مثال دیکھ کر جواب دیں۔"
      : phase === "guided" ? "سکھائے ہوئے الفاظ اور جملے کے نمونے کی مدد لیں۔" : ""),
    correctExplanation: question.correctExplanation || question.explanationCorrectUrdu || question.correctExplanationUrdu || question.explain,
    wrongExplanation: question.wrongExplanation || question.explanationWrongUrdu || question.wrongExplanationUrdu || question.explain
  };
}

function makeConceptTeachingQuestion(lesson, run, concept, block = {}) {
  return {
    id: block.id || `${lesson.id}-${run.id}-learn-${concept.id}`,
    type: "concept-teach",
    phase: "learn",
    instructionUrdu: block.instructionUrdu || "لفظ کو دیکھیں، سنیں، اور مثال کے ساتھ سمجھیں",
    prompt: concept.dutch,
    answer: "سمجھ گیا",
    teachingMode: block.mode === "refresh" ? "refresh" : "teach",
    concept,
    conceptIds: [concept.id],
    skillIds: getConceptSkillIds(concept, run),
    visualId: concept.visualId || block.visualId || ""
  };
}

function makePatternTeachingQuestion(lesson, run, pattern, block = {}) {
  return {
    id: block.id || `${lesson.id}-${run.id}-learn-${pattern.id || "pattern"}`,
    type: "pattern-teach",
    phase: "learn",
    instructionUrdu: block.instructionUrdu || "مثال دیکھ کر جملے کا طریقہ سمجھیں",
    prompt: pattern.modelDutch || pattern.sentence || pattern.titleUrdu,
    answer: "سمجھ گیا",
    pattern,
    conceptIds: normalizeIdList(run.conceptIds),
    skillIds: getPatternSkillIds(pattern, run)
  };
}

function getConceptOptions(concepts, field, answer) {
  const options = [...new Set(concepts.map((concept) => concept?.[field]).filter(Boolean))];
  if (!options.includes(answer)) options.unshift(answer);
  return options;
}

function semanticVariantName(variant) {
  if (typeof variant === "string" && variant) return variant;
  return ["primary", "reinforcement", "retention", "transfer"][Number(variant) || 0]
    || `reinforcement-${Number(variant) + 1}`;
}

function getGeneratedOptionExplanations(concepts, targetConcept, options, answerField) {
  const answer = targetConcept?.[answerField] || "";
  const answerIsDutch = answerField === "dutch";
  return Object.fromEntries((options || [])
    .filter((option) => option !== answer)
    .map((option) => {
      const distractor = (concepts || []).find((concept) => concept?.[answerField] === option);
      const explanation = answerIsDutch
        ? distractor
          ? `“${option}” کا مطلب “${distractor.urdu}” ہے، لیکن یہاں “${targetConcept.urdu}” کہنا ہے؛ اس لیے “${targetConcept.dutch}” درست ہے۔`
          : `“${option}” اس معنی “${targetConcept.urdu}” کے لیے درست نہیں؛ سیکھی ہوئی بات “${targetConcept.dutch}” ہے۔`
        : distractor
          ? `“${option}” تو “${distractor.dutch}” کا مطلب ہے۔ یہاں “${targetConcept.dutch}” دیا گیا ہے، اس لیے “${targetConcept.urdu}” درست ہے۔`
          : `“${option}” کا مطلب اس ہدف سے مختلف ہے؛ “${targetConcept.dutch}” کا درست مطلب “${targetConcept.urdu}” ہے۔`;
      return [String(option), explanation];
    }));
}

function makeRecognitionQuestion(run, concept, concepts, phase = "understand", variant = "primary") {
  const semanticVariant = semanticVariantName(variant);
  const options = getConceptOptions(concepts, "urdu", concept.urdu);
  const optionExplanationsUrdu = getGeneratedOptionExplanations(concepts, concept, options, "urdu");
  return {
    id: `${run.id}-${phase}-${concept.id}-meaning-${semanticVariant}`,
    semanticKey: `${phase}:meaning:${concept.id}:${semanticVariant}`,
    type: "meaning",
    phase,
    instructionUrdu: phase === "check"
      ? `بغیر مدد بتائیں: “${concept.dutch}” کا صحیح اردو مطلب کون سا ہے؟`
      : `مثال دیکھنے کے بعد بتائیں: “${concept.dutch}” کا اردو مطلب کون سا ہے؟`,
    prompt: concept.dutch,
    options,
    answer: concept.urdu,
    conceptIds: [concept.id],
    skillIds: getConceptSkillIds(concept, run),
    hint: `${concept.dutch} کی مثال اور تلفظ یاد کریں۔`,
    correctExplanation: `درست۔ “${concept.dutch}” کا مطلب “${concept.urdu}” ہے۔`,
    wrongExplanation: `آپ نے “${concept.dutch}” دیکھا یا سنا؛ اس کا درست مطلب “${concept.urdu}” ہے۔`,
    optionExplanationsUrdu,
    wrongExplanationsByOption: { ...optionExplanationsUrdu },
    visualId: concept.visualId || ""
  };
}

function makeGuidedQuestion(run, concept, concepts, phase = "guided", variant = "primary") {
  const semanticVariant = semanticVariantName(variant);
  const options = getConceptOptions(concepts, "dutch", concept.dutch);
  const optionExplanationsUrdu = getGeneratedOptionExplanations(concepts, concept, options, "dutch");
  return {
    id: `${run.id}-${phase}-${concept.id}-recall-${semanticVariant}`,
    semanticKey: `${phase}:recall:${concept.id}:${semanticVariant}`,
    type: "reverse",
    phase,
    instructionUrdu: phase === "check"
      ? `بغیر اشارے کے “${concept.urdu}” کے لیے صحیح Nederlands منتخب کریں`
      : `مدد کے ساتھ “${concept.urdu}” کے لیے صحیح Nederlands منتخب کریں`,
    prompt: concept.urdu,
    options,
    answer: concept.dutch,
    conceptIds: [concept.id],
    skillIds: getConceptSkillIds(concept, run),
    hint: concept.pronunciationUrdu ? `آواز کا اشارہ: ${concept.pronunciationUrdu}` : `${concept.urdu} والا سکھایا ہوا لفظ یاد کریں۔`,
    correctExplanation: `درست۔ “${concept.urdu}” کے لیے “${concept.dutch}” کہتے ہیں۔`,
    wrongExplanation: `یہاں “${concept.urdu}” کہنا ہے؛ اس کے لیے درست Nederlands “${concept.dutch}” ہے۔`,
    optionExplanationsUrdu,
    wrongExplanationsByOption: { ...optionExplanationsUrdu },
    visualId: concept.visualId || ""
  };
}

function makeUseQuestion(run, concept, concepts) {
  const prompt = concept.usageUrdu || concept.exampleUrdu || `اس صورت میں “${concept.urdu}” کہنا ہے۔`;
  return {
    ...makeGuidedQuestion(run, concept, concepts, "use"),
    id: `${run.id}-use-${concept.id}`,
    semanticKey: `use:situation:${concept.id}`,
    type: "situation",
    instructionUrdu: "روزمرہ صورت پڑھیں اور وہی سکھایا ہوا Nederlands جملہ منتخب کریں جو یہاں کام آئے",
    prompt,
    correctExplanation: `${concept.dutch} یہاں مناسب ہے: ${concept.usageUrdu || concept.exampleUrdu || concept.urdu}`,
    wrongExplanation: `اس صورت میں ${concept.dutch} کہیں۔ یہ اسی سبق میں مثال کے ساتھ سکھایا گیا تھا۔`
  };
}

function makePatternCheckQuestion(run, pattern, concepts, variant) {
  const reverse = variant % 2 === 1;
  const semanticVariant = semanticVariantName(variant);
  const dutch = pattern.modelDutch || pattern.exampleDutch || "";
  const urdu = pattern.modelUrdu || pattern.exampleUrdu || pattern.explanationUrdu || "";
  const targetConcept = concepts.find((concept) => concept?.id === pattern.modelConceptId)
    || { dutch, urdu };
  const answerField = reverse ? "dutch" : "urdu";
  const options = getConceptOptions(concepts, answerField, reverse ? dutch : urdu);
  const optionExplanationsUrdu = getGeneratedOptionExplanations(concepts, targetConcept, options, answerField);
  return {
    id: `${run.id}-check-${pattern.id || "pattern"}-${semanticVariant}`,
    semanticKey: `check:pattern:${pattern.id || "pattern"}:${semanticVariant}`,
    type: reverse ? "reverse" : "meaning",
    phase: "check",
    instructionUrdu: reverse
      ? "سکھائے ہوئے جملے کا صحیح Nederlands نمونہ منتخب کریں"
      : "سکھائے ہوئے Nederlands نمونے کا صحیح اردو مطلب منتخب کریں",
    prompt: reverse ? urdu : dutch,
    options,
    answer: reverse ? dutch : urdu,
    conceptIds: normalizeIdList(run.conceptIds),
    skillIds: getPatternSkillIds(pattern, run),
    correctExplanation: `${dutch} کا مطلب ${urdu} ہے۔`,
    wrongExplanation: `یہ اسی سبق کا جملہ ہے: ${dutch} = ${urdu}۔`,
    optionExplanationsUrdu,
    wrongExplanationsByOption: { ...optionExplanationsUrdu }
  };
}

function makePatternRecognitionQuestion(run, pattern, concepts) {
  const dutch = pattern.modelDutch || pattern.exampleDutch || "";
  const urdu = pattern.modelUrdu || pattern.exampleUrdu || pattern.explanationUrdu || "";
  const targetConcept = concepts.find((concept) => concept?.id === pattern.modelConceptId)
    || { dutch, urdu };
  const options = getConceptOptions(concepts, "urdu", urdu);
  const optionExplanationsUrdu = getGeneratedOptionExplanations(concepts, targetConcept, options, "urdu");
  return {
    id: `${run.id}-understand-${pattern.id || "pattern"}`,
    semanticKey: `understand:pattern:${pattern.id || "pattern"}`,
    type: "meaning",
    phase: "understand",
    instructionUrdu: "اب مثال دیکھ کر سکھائے ہوئے جملے کے طریقے کو پہچانیں",
    prompt: dutch,
    options,
    answer: urdu,
    conceptIds: normalizeIdList(run.conceptIds),
    skillIds: getPatternSkillIds(pattern, run),
    hint: pattern.explanationUrdu || "اوپر والی مثال اور نمایاں طریقہ دوبارہ دیکھیں۔",
    supported: true,
    correctExplanation: `${dutch} میں یہی سکھایا ہوا جملے کا طریقہ استعمال ہوا ہے۔`,
    wrongExplanation: `سکھائی ہوئی مثال ${dutch} ہے، اور یہاں اس کا مطلب ${urdu} ہے۔`,
    optionExplanationsUrdu,
    wrongExplanationsByOption: { ...optionExplanationsUrdu }
  };
}

function getGeneratedInstruction(type, phase) {
  if (phase === "understand") return "سکھائی ہوئی بات پہچان کر صحیح جواب منتخب کریں";
  if (phase === "guided") return "اشارے اور معنی کی مدد سے صحیح جواب دیں";
  if (phase === "use") return "روزمرہ صورت میں مناسب جواب منتخب کریں";
  if (phase === "check") return "بغیر خودکار مدد کے اپنی سمجھ جانچیں";
  if (type === "speak-repeat") return "آواز سنیں اور آرام سے دہرائیں";
  return "دی گئی بات کو غور سے دیکھیں";
}

function prepareSessionQuestion(question) {
  const prepareTiles = (tiles, prefix) => shuffleArray((tiles || []).map((tile, index) => (
    typeof tile === "object" && tile?.word
      ? { ...tile, id: tile.id || `${prefix}-${index}-${tile.word}` }
      : { id: `${prefix}-${index}-${tile}`, word: tile }
  )));
  return {
    ...question,
    options: question.options ? shuffleArray([...question.options]) : [],
    tiles: prepareTiles(question.tiles, "tile"),
    fallbackTiles: prepareTiles(question.fallbackTiles, "fallback")
  };
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
  for (const question of [...getLessonExercises(lesson), ...sourceQuestions]) {
    if (question.type === "meaning") add(question.prompt, question.answer);
    if (question.type === "reverse") add(question.answer, question.prompt);
    if (question.type === "listen-choice" && question.mode !== "listen-dutch" && /[\u0600-\u06ff]/.test(String(question.answer || ""))) {
      add(question.speak, question.answer);
    }
    if (question.type === "build") add(question.answer, question.prompt);
  }
  return pairs;
}

function getActiveQuestion() {
  const lesson = getActiveLesson();
  const questions = sessionQuestions.length ? sessionQuestions : lesson.questions;
  return questions[activeQuestionIndex];
}

function findLessonIdForQuestion(prompt, answer, questionId = "") {
  const lesson = getAllLessons().find((item) => getLessonExercises(item).some((question) => (
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
  return ["uitleg", "speak-repeat", "concept-teach", "pattern-teach", "correction-teach"].includes(question?.type);
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

function getDutchSpeechRate(text, forceSlow = false, forceRegular = false) {
  const cleanText = normalizeDutchSpeechText(text);
  const singleLetter = cleanText.length === 1;
  const singleWord = !/\s/.test(cleanText);
  const slow = forceRegular ? false : progress.settings.slowAudio || forceSlow;
  if (slow) return singleLetter ? 0.7 : singleWord ? 0.76 : 0.8;
  return singleLetter ? 0.82 : singleWord ? 0.92 : 0.96;
}

function speakDutch(text, forceSlow = false, forceRegular = false) {
  if (!progress.settings.pronunciation || !text) return;

  const spokenText = normalizeDutchSpeechText(text);
  if (!spokenText) return;
  const rate = getDutchSpeechRate(spokenText, forceSlow, forceRegular);
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

function refreshEffectsProfile() {
  const nextProfile = detectEffectsProfile();
  if (nextProfile === effectsProfile) return;
  applyEffectsProfile(nextProfile);
  experienceObserver?.disconnect();
  if (nextProfile === "reduced") finishLaunch();
  if (document.querySelector("#app")?.childElementCount) bindExperienceMotion(false);
}

function scheduleEffectsProfileRefresh() {
  window.clearTimeout(effectsProfileRefreshTimer);
  effectsProfileRefreshTimer = window.setTimeout(refreshEffectsProfile, 120);
}

window.addEventListener("resize", scheduleEffectsProfileRefresh, { passive: true });
reducedMotionQuery?.addEventListener?.("change", refreshEffectsProfile);
document.addEventListener("visibilitychange", () => {
  document.documentElement.classList.toggle("effects-paused", document.hidden);
});
document.documentElement.classList.toggle("effects-paused", document.hidden);

render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

window.addEventListener("online", render);
window.addEventListener("offline", render);
