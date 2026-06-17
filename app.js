const STORAGE_KEY = "nederurdu-progress-v3";
const chapters = window.NEDERURDU_CHAPTERS || [
  {
    id: "a0",
    title: "Chapter A0",
    subtitle: "حروف، الفاظ، چھوٹی grammar، اور پہلے Dutch جملے",
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
  { letter: "q", speak: "q", sound: "کو", word: "quiz", meaning: "quiz" },
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

const visualLibrary = {
  letters: {
    src: "assets/visuals/letters-first-words.svg",
    alt: "Dutch letters and first vocabulary objects"
  },
  people: {
    src: "assets/visuals/people-family.svg",
    alt: "People and family vocabulary"
  },
  home: {
    src: "assets/visuals/home-place.svg",
    alt: "Home objects and place words"
  },
  transport: {
    src: "assets/visuals/transport-routine.svg",
    alt: "Daily transport and going out"
  },
  health: {
    src: "assets/visuals/body-health.svg",
    alt: "Body parts and health vocabulary"
  },
  services: {
    src: "assets/visuals/daily-services.svg",
    alt: "ملاقات کے وقت، فارم، کام، school، اور خریداری"
  },
  sentence: {
    src: "assets/visuals/sentence-practice.svg",
    alt: "Dutch جملہ بنانے کی مشق"
  }
};

const wordVisualEntries = (window.NEDERURDU_WORD_VISUALS || []).map((entry) => ({
  ...entry,
  normalizedTerms: (entry.terms || [])
    .map((term) => normalizeVisualText(term))
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
})).sort((a, b) => {
  const longestA = a.normalizedTerms[0]?.length || 0;
  const longestB = b.normalizedTerms[0]?.length || 0;
  return longestB - longestA;
});

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
  bsn: "Dutch شہری نمبر",
  cadeau: "تحفہ",
  collega: "کام کا ساتھی",
  contract: "معاہدہ",
  dank: "شکریہ",
  dat: "کہ",
  de: "noun سے پہلے آنے والا لفظ",
  deur: "دروازہ",
  deze: "یہ",
  dit: "یہ",
  dokter: "ڈاکٹر",
  docent: "استاد",
  doet: "کرتا / کرتی ہے",
  een: "ایک / a",
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
  het: "noun سے پہلے آنے والا لفظ / یہ",
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
  weg: "ختم / away",
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

const defaultProgress = {
  completedLessons: [],
  scores: {},
  totalXp: 0,
  practiceDays: [],
  mistakes: [],
  settings: {
    soundEffects: true,
    pronunciation: true
  },
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

function loadProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      ...defaultProgress,
      ...stored,
      settings: {
        ...defaultProgress.settings,
        ...(stored?.settings || {})
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
  return getAllLessons().find((lesson) => lesson.id === id) || getCurrentLessons()[0];
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

function chapterCompletedCount(chapter) {
  return chapter.lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
}

function subchapterLessons(subchapter) {
  return subchapter.lessonIds.map((id) => getLesson(id)).filter(Boolean);
}

function subchapterCompletedCount(subchapter) {
  return subchapterLessons(subchapter).filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
}

function getNextLessonForChapter(chapter = getSelectedChapter()) {
  return chapter.lessons.find((lesson) => !progress.completedLessons.includes(lesson.id)) || chapter.lessons[0];
}

function getLessonIndexInChapter(lessonId, chapter = getSelectedChapter()) {
  return chapter.lessons.findIndex((lesson) => lesson.id === lessonId);
}

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = `
    ${screen === "home" ? renderHome() : ""}
    ${screen === "preview" ? renderLessonPreview() : ""}
    ${screen === "lesson" ? renderLesson() : ""}
    ${screen === "complete" ? renderComplete() : ""}
    ${screen === "letters" ? renderLetters() : ""}
    ${screen === "progress" ? renderProgress() : ""}
    ${screen === "settings" ? renderSettings() : ""}
    ${renderBottomNav()}
  `;
  bindEvents();
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark"><span>NU</span></div>
        <div>
          <p class="brand-title">NederUrdu</p>
          <p class="brand-subtitle">Dutch سیکھیں، Urdu میں</p>
        </div>
      </div>
    </header>
  `;
}

function renderHome() {
  const chapter = getSelectedChapter();
  const lessons = getCurrentLessons();
  const nextLesson = getNextLessonForChapter(chapter);
  const percent = Math.round((completedCount() / lessons.length) * 100);
  const heroVisual = getVisualForLesson(nextLesson);
  activeLessonId = nextLesson.id;

  return `
    ${renderTopbar()}
    <section class="chapter-strip" aria-label="Course chapters">
      ${chapters.map(renderChapterButton).join("")}
    </section>
    <section class="hero-panel">
      ${renderVisual(heroVisual, "hero-visual")}
      <div class="hero-copy">
        <p class="eyeline">${chapter.title} · ${percent}% complete</p>
        <h1>${nextLesson.title}</h1>
        <p class="lead">${nextLesson.description} ہر جواب کے بعد چھوٹی Urdu وضاحت ملے گی۔</p>
      </div>
      <div class="dashboard-progress">
        <div class="progress-track"><div class="progress-fill" style="width: ${percent}%"></div></div>
        <span class="latin">${completedCount()}/${lessons.length}</span>
      </div>
      <div class="summary-grid">
        <div class="summary-item">
          <span class="summary-value">${completedCount()}/${lessons.length}</span>
          <span class="summary-label">سبق مکمل</span>
        </div>
        <div class="summary-item">
          <span class="summary-value">${progress.totalXp}</span>
          <span class="summary-label">پوائنٹس</span>
        </div>
        <div class="summary-item">
          <span class="summary-value">${progress.practiceDays.length}</span>
          <span class="summary-label">Practice دن</span>
        </div>
      </div>
      <button class="primary-button" data-action="preview" data-lesson="${nextLesson.id}">سبق دیکھیں</button>
    </section>
    <section class="quick-actions" aria-label="App actions">
      <button class="quick-action" data-action="letters">
        <span class="quick-icon">Aa</span>
        <strong>Letters</strong>
        <small>alphabet</small>
      </button>
      <button class="quick-action" data-action="settings">
        <span class="quick-icon">Set</span>
        <strong>Settings</strong>
        <small>sound</small>
      </button>
    </section>
    <section class="section">
      <h2>${chapter.title} goals</h2>
      ${renderSubchapters(chapter)}
    </section>
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
    ? `<button class="secondary-button" data-action="preview" data-lesson="${firstUnlockedLesson.id}">Learn more</button>`
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
        <p class="unit-meta">${lesson.questions.length} سوالات · ${lesson.xp} points</p>
      </span>
      <span class="status-dot ${done ? "done" : ""}"></span>
    </button>
  `;
}

function renderLessonPreview() {
  const lesson = getLesson(previewLessonId);
  const chapter = getChapterForLesson(lesson.id);
  const lessonIndex = getLessonIndexInChapter(lesson.id, chapter);
  const done = progress.completedLessons.includes(lesson.id);
  const score = progress.scores[lesson.id] || 0;
  const visual = getVisualForLesson(lesson);
  const sampleWords = lesson.questions
    .filter((question) => isDutchText(question.prompt))
    .slice(0, 5)
    .map((question) => question.prompt);

  return `
    ${renderTopbar()}
    <section class="preview-panel">
      <button class="back-button" data-action="home">واپس</button>
      ${renderVisual(visual, "preview-visual")}
      <div class="preview-hero">
        <span class="unit-number">${done ? "✓" : lessonIndex + 1}</span>
        <p class="eyeline">${chapter.title} · lesson ${lessonIndex + 1}</p>
        <h1>${lesson.title}</h1>
        <p class="lead">${lesson.description}</p>
      </div>
      <div class="summary-grid">
        <div class="summary-item">
          <span class="summary-value">${lesson.questions.length}</span>
          <span class="summary-label">سوالات</span>
        </div>
        <div class="summary-item">
          <span class="summary-value">${lesson.xp}</span>
          <span class="summary-label">points</span>
        </div>
        <div class="summary-item">
          <span class="summary-value">${score}</span>
          <span class="summary-label">best score</span>
        </div>
      </div>
      <div class="preview-words">
        ${sampleWords.length ? sampleWords.map((word) => `<span>${renderTextWithWordHelp(word, `preview-${lesson.id}`)}</span>`).join("") : "<span>Urdu practice</span>"}
      </div>
      <button class="primary-button" data-action="start" data-lesson="${lesson.id}">${done ? "دوبارہ practice کریں" : "سبق شروع کریں"}</button>
    </section>
  `;
}

function renderLesson() {
  const lesson = getLesson(activeLessonId);
  const questions = sessionQuestions.length ? sessionQuestions : lesson.questions;
  const question = questions[activeQuestionIndex];
  const visual = getExerciseVisual(question, lesson);
  const percentage = Math.round((lessonProgressSteps / questions.length) * 100);
  const correctCount = sessionAnswers.filter((answer) => answer.correct).length;
  const wrongCount = sessionAnswers.filter((answer) => !answer.correct).length;
  const canSpeakPrompt = isDutchText(question.prompt);
  const canCheck = canCheckQuestion(question);

  return `
    <section class="lesson-panel">
      <div class="lesson-header">
        <button class="back-button" data-action="home">واپس</button>
        <div class="lesson-header-main">
          <strong>${lesson.unit}</strong>
          <span>${activeQuestionIndex + 1}/${questions.length}</span>
        </div>
      </div>
      <div class="lesson-status">
        <div class="progress-track"><div class="progress-fill" style="width: ${percentage}%"></div></div>
        <div class="lesson-counters latin">
          <span class="counter-good">${correctCount}</span>
          <span class="counter-bad">${wrongCount}</span>
        </div>
      </div>
      ${renderVisual(visual, "lesson-visual exercise-visual")}
      <div class="prompt-card">
        <div class="prompt-label-row">
          <div class="prompt-label">${question.label}</div>
          ${question.type === "build" ? renderHintButton() : ""}
        </div>
        <div class="prompt-row">
          ${canSpeakPrompt ? renderSpeakButton(question.prompt, "prompt") : ""}
          <div class="prompt-main ${question.type === "reverse" || question.type === "build" ? "" : "latin"}">${renderTextWithWordHelp(question.prompt, `prompt-${activeQuestionIndex}`)}</div>
        </div>
        ${question.type === "build" && hintOpen ? renderHintPopover(question) : ""}
        ${question.note ? `<div class="prompt-note">${question.note}</div>` : ""}
      </div>
      ${question.type === "build" ? renderBuildExercise(question) : renderChoices(question)}
      <p class="feedback ${checked ? (selectedAnswer === question.answer ? "good" : "bad") : ""}">
        ${checked ? (selectedAnswer === question.answer ? `درست۔ ${question.explain}` : `یہ جواب درست نہیں۔ صحیح جواب: ${question.answer}۔ ${question.explain}`) : ""}
      </p>
      <button class="primary-button" data-action="${checked ? "next" : "check"}" ${canCheck ? "" : "disabled"}>
        ${checked ? "اگلا سوال" : "جواب چیک کریں"}
      </button>
    </section>
  `;
}

function renderHintButton() {
  return `
    <button class="hint-button ${hintOpen ? "active" : ""}" data-action="hint" title="Hint" aria-label="Hint">؟</button>
  `;
}

function renderHintPopover(question) {
  return `
    <div class="hint-popover">
      ${escapeHtml(question.hint || "Dutch words کو صحیح ترتیب میں tap کریں۔")}
    </div>
  `;
}

function renderChoices(question) {
  return `
    <div class="choices">
      ${question.options.map((option, index) => renderChoice(option, question, index)).join("")}
    </div>
  `;
}

function renderChoice(option, question, index) {
  let state = "";
  if (selectedAnswer === option) state = "selected";
  if (checked && option === question.answer) state = "correct";
  if (checked && selectedAnswer === option && option !== question.answer) state = "wrong";
  const choiceText = isDutchText(option) ? renderTextWithWordHelp(option, `choice-${activeQuestionIndex}-${index}`) : option;

  return `
    <div class="choice-wrap ${isDutchText(option) ? "has-sound" : ""}">
      <button class="choice-button ${state}" data-action="choose" data-answer="${escapeAttr(option)}">
        <span class="choice-text">${choiceText}</span>
        ${checked && selectedAnswer === question.answer && option === question.answer ? renderChoiceConfetti() : ""}
      </button>
      ${isDutchText(option) ? renderSpeakButton(option, "choice") : ""}
    </div>
  `;
}

function renderBuildExercise(question) {
  const selectedIds = new Set(buildAnswerIds);
  const selectedTiles = buildAnswerIds
    .map((id) => question.tiles.find((tile) => tile.id === id))
    .filter(Boolean);
  const remainingTiles = question.tiles.filter((tile) => !selectedIds.has(tile.id));
  const currentAnswer = getBuildAnswerText(question);
  const answerState = checked ? (currentAnswer === question.answer ? "correct" : "wrong") : "";

  return `
    <div class="build-exercise">
      <div class="build-answer ${answerState}">
        ${selectedTiles.length ? selectedTiles.map((tile, index) => `
          <button class="word-tile selected-tile" data-action="build-remove" data-build-index="${index}">
            ${renderTextWithWordHelp(tile.word, `build-answer-${activeQuestionIndex}-${index}`)}
          </button>
        `).join("") : `<span class="build-placeholder">Dutch words یہاں بنائیں</span>`}
        ${checked && currentAnswer === question.answer ? renderChoiceConfetti() : ""}
      </div>
      <div class="build-bank">
        ${remainingTiles.map((tile) => `
          <button class="word-tile" data-action="build-select" data-tile-id="${escapeAttr(tile.id)}">
            ${renderTextWithWordHelp(tile.word, `build-bank-${activeQuestionIndex}-${tile.id}`)}
          </button>
        `).join("")}
      </div>
    </div>
  `;
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
      <img src="${escapeAttr(visual.src)}" alt="${escapeAttr(visual.alt)}" loading="lazy" />
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
  if (question?.type === "build") return visualLibrary.sentence;
  return getVisualForLesson(lesson);
}

function getExerciseVisual(question, lesson) {
  const candidates = [
    question?.prompt,
    question?.answer,
    question?.explain,
    question?.note
  ].filter(Boolean);
  const wordVisual = findWordVisual(candidates.join(" "));
  return wordVisual || getVisualForQuestion(question, lesson);
}

function findWordVisual(value) {
  if (!value || !wordVisualEntries.length) return null;
  const normalized = normalizeVisualText(value);
  if (!normalized) return null;

  for (const entry of wordVisualEntries) {
    if (entry.normalizedTerms.some((term) => visualTermMatches(normalized, term))) {
      return {
        src: entry.src,
        alt: entry.alt
      };
    }
  }

  return null;
}

function visualTermMatches(value, term) {
  if (!term) return false;
  if (term.includes(" ")) return value.includes(term);
  if (term.length <= 1) return value === term;
  return new RegExp(`(^|[^a-z0-9])${escapeRegex(term)}([^a-z0-9]|$)`).test(value);
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
      title="Dutch pronunciation"
      aria-label="Dutch pronunciation"
    >▶</span>
  `;
}

function renderComplete() {
  const result = lessonResult || { correct: 0, total: 1, xp: 0 };
  const percent = Math.round((result.correct / result.total) * 100);
  return `
    ${renderTopbar()}
    <section class="result-panel">
      <div class="celebration-dots" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>
      <h1>سبق مکمل ہو گیا</h1>
      <div class="result-score">${percent}%</div>
      <p class="lead">آپ نے ${result.correct} میں سے ${result.total} جواب درست دیے۔ ${result.xp} points محفوظ ہو گئے۔</p>
      <button class="primary-button" data-action="home">Home پر جائیں</button>
    </section>
  `;
}

function renderLetters() {
  return `
    ${renderTopbar()}
    <section class="letters-panel">
      <div class="letters-heading">
        <button class="circle-action" data-action="home" title="Home">←</button>
        <div>
          <h1>Dutch حروف اور تلفظ</h1>
          <p class="lead">ہر حرف کے ساتھ ایک آسان مثال دی گئی ہے۔ speaker دبانے سے صرف حرف کا Dutch نام سنائی دے گا۔</p>
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
  return `
    <article class="letter-card">
      <div class="letter-dot latin">${item.letter}</div>
      <div class="letter-info">
        <strong>${item.sound}</strong>
        <span>مثال: <b class="latin">${item.word}</b> — ${item.meaning}</span>
      </div>
      ${renderSpeakButton(item.speak, "choice")}
    </article>
  `;
}

function renderProgress() {
  const lessons = getCurrentLessons();
  return `
    ${renderTopbar()}
    <section class="progress-panel">
      <h1>آپ کی Progress</h1>
      <div class="summary-grid">
        <div class="summary-item">
          <span class="summary-value">${completedCount()}</span>
          <span class="summary-label">مکمل lessons</span>
        </div>
        <div class="summary-item">
          <span class="summary-value">${progress.totalXp}</span>
          <span class="summary-label">points</span>
        </div>
        <div class="summary-item">
          <span class="summary-value">${progress.mistakes.length}</span>
          <span class="summary-label">mistakes</span>
        </div>
      </div>
      <div class="unit-list">
        ${lessons.map(renderUnitRow).join("")}
      </div>
      <button class="secondary-button" data-action="reset">Progress reset کریں</button>
    </section>
  `;
}

function renderSettings() {
  return `
    ${renderTopbar()}
    <section class="settings-panel">
      <h1>Settings</h1>
      <p class="lead">یہ settings اسی browser میں محفوظ رہتی ہیں۔ ابھی accounts نہیں ہیں۔</p>
      <div class="settings-list">
        ${renderToggleRow("soundEffects", "Correct/wrong sound effects", "جواب چیک کرتے وقت چھوٹی آوازیں")}
        ${renderToggleRow("pronunciation", "Dutch pronunciation buttons", "speaker buttons اور word pronunciation")}
      </div>
      <button class="secondary-button danger-button" data-action="reset">Progress reset کریں</button>
    </section>
  `;
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
  return `
    <nav class="bottom-nav" aria-label="Main navigation">
      <button class="nav-button ${screen === "home" ? "active" : ""}" data-action="home">Home</button>
      <button class="nav-button ${screen === "letters" ? "active" : ""}" data-action="letters">Letters</button>
      <button class="nav-button ${screen === "settings" ? "active" : ""}" data-action="settings">Settings</button>
    </nav>
  `;
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
      if (action === "home") goHome();
      if (action === "progress") goProgress();
      if (action === "letters") goLetters();
      if (action === "settings") goSettings();
      if (action === "chapter") selectChapter(element.dataset.chapter);
      if (action === "preview") showLessonPreview(element.dataset.lesson);
      if (action === "start") startLesson(element.dataset.lesson);
      if (action === "choose") chooseAnswer(element.dataset.answer);
      if (action === "build-select") selectBuildTile(element.dataset.tileId);
      if (action === "build-remove") removeBuildTile(Number(element.dataset.buildIndex));
      if (action === "hint") toggleHint();
      if (action === "check") checkAnswer();
      if (action === "next") nextQuestion();
      if (action === "reset") resetProgress();
      if (action === "toggle-setting") toggleSetting(element.dataset.setting);
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
}

function goHome() {
  activeWordHelp = null;
  screen = "home";
  render();
}

function goProgress() {
  activeWordHelp = null;
  screen = "progress";
  render();
}

function goLetters() {
  activeWordHelp = null;
  screen = "letters";
  render();
}

function goSettings() {
  activeWordHelp = null;
  screen = "settings";
  render();
}

function showLessonPreview(id) {
  const lesson = getLesson(id);
  const chapter = getChapterForLesson(lesson.id);
  selectedChapterId = chapter.id;
  previewLessonId = lesson.id;
  activeWordHelp = null;
  saveProgress({ ...progress, selectedChapterId: selectedChapterId, lastLessonId: lesson.id });
  screen = "preview";
  render();
}

function selectChapter(id) {
  const chapter = chapters.find((item) => item.id === id);
  if (!chapter) return;
  selectedChapterId = chapter.id;
  const nextLesson = getNextLessonForChapter(chapter);
  activeLessonId = nextLesson.id;
  previewLessonId = nextLesson.id;
  saveProgress({ ...progress, selectedChapterId: selectedChapterId, lastLessonId: activeLessonId });
  screen = "home";
  render();
}

function startLesson(id) {
  const chapter = getChapterForLesson(id);
  selectedChapterId = chapter.id;
  activeLessonId = id;
  activeQuestionIndex = 0;
  selectedAnswer = "";
  checked = false;
  lessonProgressSteps = 0;
  activeWordHelp = null;
  buildAnswerIds = [];
  hintOpen = false;
  sessionAnswers = [];
  sessionQuestions = buildSessionQuestions(getLesson(id));
  saveProgress({ ...progress, selectedChapterId: selectedChapterId, lastLessonId: id });
  screen = "lesson";
  render();
}

function chooseAnswer(answer) {
  if (checked) return;
  activeWordHelp = null;
  hintOpen = false;
  selectedAnswer = answer;
  render();
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

function checkAnswer() {
  const question = getActiveQuestion();
  if (!canCheckQuestion(question)) return;
  activeWordHelp = null;
  hintOpen = false;
  if (question.type === "build") selectedAnswer = getBuildAnswerText(question);
  const correct = selectedAnswer === question.answer;
  lessonProgressSteps = correct
    ? Math.max(lessonProgressSteps, activeQuestionIndex + 1)
    : Math.max(0, lessonProgressSteps - 1);
  sessionAnswers.push({
    prompt: question.prompt,
    answer: question.answer,
    selected: selectedAnswer,
    correct
  });
  playAnswerSound(correct ? "correct" : "wrong");
  checked = true;
  render();
}

function nextQuestion() {
  const lesson = getLesson(activeLessonId);
  const questions = sessionQuestions.length ? sessionQuestions : lesson.questions;
  if (activeQuestionIndex < questions.length - 1) {
    activeQuestionIndex += 1;
    selectedAnswer = "";
    checked = false;
    activeWordHelp = null;
    buildAnswerIds = [];
    hintOpen = false;
    render();
    return;
  }

  completeLesson(lesson);
}

function completeLesson(lesson) {
  const questions = sessionQuestions.length ? sessionQuestions : lesson.questions;
  lessonProgressSteps = questions.length;
  const correct = sessionAnswers.filter((answer) => answer.correct).length;
  const alreadyCompleted = progress.completedLessons.includes(lesson.id);
  const earnedXp = alreadyCompleted ? 0 : lesson.xp;
  const practiceDays = progress.practiceDays.includes(todayKey())
    ? progress.practiceDays
    : [...progress.practiceDays, todayKey()];
  const newMistakes = sessionAnswers
    .filter((answer) => !answer.correct)
    .map((answer) => ({
      lessonId: lesson.id,
      prompt: answer.prompt,
      answer: answer.answer,
      selected: answer.selected,
      date: todayKey()
    }));

  lessonResult = {
    correct,
    total: questions.length,
    xp: earnedXp
  };

  saveProgress({
    ...progress,
    completedLessons: alreadyCompleted ? progress.completedLessons : [...progress.completedLessons, lesson.id],
    scores: {
      ...progress.scores,
      [lesson.id]: Math.max(progress.scores[lesson.id] || 0, correct)
    },
    totalXp: progress.totalXp + earnedXp,
    practiceDays,
    mistakes: [...progress.mistakes, ...newMistakes],
    lastLessonId: lesson.id
  });

  screen = "complete";
  render();
}

function resetProgress() {
  const confirmed = window.confirm("کیا آپ واقعی progress reset کرنا چاہتے ہیں؟");
  if (!confirmed) return;
  saveProgress({ ...defaultProgress });
  activeWordHelp = null;
  buildAnswerIds = [];
  hintOpen = false;
  screen = "home";
  render();
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
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function normalizeWord(value) {
  return value.toLowerCase().replace(/^'+|'+$/g, "");
}

function buildSessionQuestions(lesson) {
  return lesson.questions.map((question) => ({
    ...question,
    options: question.options ? shuffleArray(question.options) : [],
    tiles: question.tiles ? shuffleArray(question.tiles.map((word, index) => ({ id: `${index}-${word}`, word }))) : []
  }));
}

function getActiveQuestion() {
  const lesson = getLesson(activeLessonId);
  const questions = sessionQuestions.length ? sessionQuestions : lesson.questions;
  return questions[activeQuestionIndex];
}

function getBuildAnswerText(question) {
  return buildAnswerIds
    .map((id) => question.tiles.find((tile) => tile.id === id)?.word)
    .filter(Boolean)
    .join(" ");
}

function canCheckQuestion(question) {
  if (checked) return true;
  if (question.type === "build") return buildAnswerIds.length === question.tiles.length;
  return Boolean(selectedAnswer);
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

function speakDutch(text) {
  if (!progress.settings.pronunciation || !("speechSynthesis" in window) || !text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const dutchVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("nl"));
  utterance.lang = "nl-NL";
  utterance.rate = text.length === 1 ? 0.72 : 0.88;
  utterance.pitch = 1;
  if (dutchVoice) utterance.voice = dutchVoice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
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
