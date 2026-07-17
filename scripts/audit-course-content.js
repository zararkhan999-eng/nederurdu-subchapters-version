const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const chapterFilter = process.argv.find((arg) => arg.startsWith("--chapter="))?.split("=")[1] || "";
const jsonMode = process.argv.includes("--json");

function loadCourse() {
  const context = {
    window: {},
    console,
    setTimeout,
    clearTimeout
  };
  context.global = context;
  vm.createContext(context);
  for (const file of ["course-data.js", "word-visual-data.js"]) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }
  return {
    chapters: context.window.NEDERURDU_CHAPTERS || [],
    visuals: context.window.NEDERURDU_WORD_VISUALS || []
  };
}

const hasUrdu = (value) => /[\u0600-\u06ff]/.test(String(value || ""));
const hasLatin = (value) => /[A-Za-zÀ-ÿ]/.test(String(value || ""));
const text = (value) => String(value || "").trim();
const words = (value) => text(value).split(/\s+/).filter(Boolean);
const normalize = (value) => text(value)
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9\u0600-\u06ff]+/g, " ")
  .trim()
  .replace(/\s+/g, " ");

const choiceTypes = new Set([
  "meaning", "reverse", "image-choice", "listen-choice", "situation",
  "document-choice", "fill-gap"
]);
const dutchAnswerTypes = new Set(["reverse", "image-choice", "situation", "build", "sequence", "short-input", "speak-repeat"]);
const urduAnswerTypes = new Set(["meaning", "document-choice"]);
const infoTypes = new Set(["uitleg", "speak-repeat"]);
const knownUiPrompts = new Set([
  "آواز سنیں، پھر صحیح مطلب چنیں۔",
  "تصویر دیکھیں اور صحیح لفظ چنیں۔",
  "تصویر دیکھیں اور صحیح لفظ چنیں۔",
  "تصویر کے لیے صحیح لفظ منتخب کریں۔",
  "بات سنیں اور مناسب جواب منتخب کریں۔",
  "دستاویز میں لکھی اہم بات کا مطلب کیا ہے؟",
  "ان قدموں کو صحیح ترتیب میں رکھیں۔",
  "آواز سنیں، جملہ بلند آواز میں دہرائیں، پھر آگے بڑھیں۔"
]);

function visualId(visual) {
  return visual.id || text(visual.src).split("/").pop().replace(/\.[^.]+$/, "");
}

function addFinding(findings, severity, chapter, lesson, question, rule, message, detail = "") {
  findings.push({
    severity,
    chapterId: chapter.id,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    questionId: question?.id || "",
    type: question?.type || "",
    rule,
    message,
    prompt: question?.prompt || "",
    answer: question?.answer || "",
    detail
  });
}

function auditQuestion(findings, chapter, lesson, question, visualIds) {
  const prompt = text(question.prompt);
  const answer = text(question.answer);

  if (!question.id) addFinding(findings, "error", chapter, lesson, question, "missing-id", "Question has no stable id.");
  if (!question.type) addFinding(findings, "error", chapter, lesson, question, "missing-type", "Question has no type.");
  if (!answer && !infoTypes.has(question.type)) addFinding(findings, "error", chapter, lesson, question, "missing-answer", "Question has no answer.");

  if (choiceTypes.has(question.type)) {
    const options = (question.options || []).map(text).filter(Boolean);
    const optionSet = new Set(options.map(normalize));
    if (!Array.isArray(question.options) || options.length < 3) {
      addFinding(findings, "error", chapter, lesson, question, "choice-count", "Choice question has fewer than three options.");
    }
    if (!options.some((option) => normalize(option) === normalize(answer))) {
      addFinding(findings, "error", chapter, lesson, question, "answer-not-option", "Answer is not present in options.");
    }
    if (optionSet.size !== options.length) {
      addFinding(findings, "error", chapter, lesson, question, "duplicate-options", "Options contain duplicates after normalization.");
    }
    if (options.some((option) => option === "___")) {
      addFinding(findings, "error", chapter, lesson, question, "blank-option", "Options include the raw blank placeholder.");
    }
  }

  const listenReply = question.type === "listen-choice" && question.mode === "listen-reply";
  const listenDutch = question.type === "listen-choice" && question.mode === "listen-dutch";
  const listenMeaning = question.type === "listen-choice" && !listenReply && !listenDutch;

  if ((urduAnswerTypes.has(question.type) || listenMeaning) && !hasUrdu(answer)) {
    addFinding(findings, "error", chapter, lesson, question, "answer-script", "This exercise should answer in Urdu, but answer has no Urdu text.");
  }
  if ((dutchAnswerTypes.has(question.type) || listenReply || listenDutch) && !hasLatin(answer)) {
    addFinding(findings, "error", chapter, lesson, question, "answer-script", "This exercise should answer in Dutch, but answer has no Latin text.");
  }
  if (question.type === "meaning" && !hasLatin(prompt)) {
    addFinding(findings, "error", chapter, lesson, question, "prompt-script", "Meaning prompt should be Dutch/Latin text.");
  }
  if (question.type === "reverse" && !hasUrdu(prompt)) {
    addFinding(findings, "error", chapter, lesson, question, "prompt-script", "Reverse prompt should be Urdu text.");
  }
  if (question.type === "build" && !hasUrdu(prompt)) {
    addFinding(findings, "review", chapter, lesson, question, "build-prompt", "Build prompt has no Urdu context.");
  }

  if (question.type === "fill-gap") {
    const blankCount = (prompt.match(/___/g) || []).length;
    if (blankCount !== 1) addFinding(findings, "error", chapter, lesson, question, "fill-gap-blank", "Fill-gap prompt must contain exactly one blank.");
    if (prompt === "___") addFinding(findings, "error", chapter, lesson, question, "bare-fill-gap", "Fill-gap prompt is only a blank.");
    if (!question.speak || text(question.speak).includes("___")) {
      addFinding(findings, "error", chapter, lesson, question, "fill-gap-speech", "Fill-gap speech must be the completed sentence.");
    }
    if (words(answer).length !== 1) {
      addFinding(findings, "error", chapter, lesson, question, "fill-gap-answer", "Fill-gap answer should be a single clean word.");
    }
    const completed = prompt.replace("___", answer).replace(/\s+/g, " ").trim();
    if (question.speak && normalize(question.speak) !== normalize(completed)) {
      addFinding(findings, "error", chapter, lesson, question, "fill-gap-speech-match", "Fill-gap speech does not match the completed prompt.", question.speak);
    }
    const validPredicateWords = new Set([
      "goed", "koud", "warm", "ziek", "moe", "kapot", "open", "dicht",
      "veilig", "gevaarlijk", "verboden", "toegestaan", "beschikbaar",
      "gesloten", "goedkoop", "duur", "laat"
    ]);
    if (/^dit is ___$/i.test(prompt) && !validPredicateWords.has(answer.toLowerCase()) && lesson.id !== "a0-letters-1") {
      addFinding(findings, "review", chapter, lesson, question, "generic-fill-frame", "Generic 'dit is ___' frame may be too weak for this lesson.");
    }
  }

  if (question.type === "build") {
    const answerWords = words(answer);
    const tileWords = (question.tiles || []).map(text).filter(Boolean);
    if (!answerWords.length || !tileWords.length) {
      addFinding(findings, "error", chapter, lesson, question, "build-tiles", "Build question needs answer words and tiles.");
    } else if (normalize(tileWords.join(" ")) !== normalize(answerWords.join(" "))) {
      addFinding(findings, "error", chapter, lesson, question, "build-tiles", "Build tiles do not reconstruct the answer in order.", tileWords.join(" "));
    }
  }

  if (question.type === "listen-choice") {
    if (!question.speak || !hasLatin(question.speak)) {
      addFinding(findings, "error", chapter, lesson, question, "listen-speech", "Listen-choice needs Dutch speech text.");
    }
    if (question.mode === "listen-reply" && normalize(question.speak) === normalize(answer)) {
      addFinding(findings, "review", chapter, lesson, question, "listen-reply-cue", "Listen-reply cue is identical to the answer, so it may not be a real reply exercise.");
    }
  }

  if (question.type === "image-choice") {
    if (!question.visualId || !visualIds.has(question.visualId)) {
      addFinding(findings, "error", chapter, lesson, question, "image-id", "Image-choice has no valid visual id.");
    }
    if (/[,.?!]/.test(answer) || words(answer).length > 3) {
      addFinding(findings, "error", chapter, lesson, question, "unsafe-image-answer", "Image-choice answer is phrase-like or punctuated.");
    }
  }

  if (question.type === "situation") {
    if (!hasUrdu(prompt) && !knownUiPrompts.has(prompt)) {
      addFinding(findings, "review", chapter, lesson, question, "situation-context", "Situation prompt has no Urdu scenario/context.");
    }
    if ((question.options || []).some((option) => hasUrdu(option))) {
      addFinding(findings, "error", chapter, lesson, question, "situation-options", "Situation options should be Dutch, but at least one option contains Urdu.");
    }
  }

  if (/learner|undefined|null|NaN|\[object Object\]/i.test(JSON.stringify(question))) {
    addFinding(findings, "error", chapter, lesson, question, "raw-artifact", "Question contains raw placeholder/debug text.");
  }
}

function auditConsistency(findings, chapter, lesson) {
  const dutchToUrdu = new Map();
  const urduToDutch = new Map();
  const withoutArticle = (value) => normalize(value).replace(/^(de|het|een|geen)\s+/, "");
  for (const question of lesson.questions || []) {
    if (question.type === "meaning" && hasLatin(question.prompt) && hasUrdu(question.answer)) {
      const key = normalize(question.prompt);
      const value = normalize(question.answer);
      const existing = dutchToUrdu.get(key);
      if (existing && existing.value !== value) {
        addFinding(findings, "review", chapter, lesson, question, "translation-drift", "Same Dutch prompt maps to different Urdu answers.", `${existing.raw} / ${question.answer}`);
      } else {
        dutchToUrdu.set(key, { value, raw: question.answer });
      }
    }
    if (question.type === "reverse" && hasUrdu(question.prompt) && hasLatin(question.answer)) {
      const key = normalize(question.prompt);
      const value = normalize(question.answer);
      const existing = urduToDutch.get(key);
      if (existing && existing.value !== value && withoutArticle(existing.raw) !== withoutArticle(question.answer)) {
        addFinding(findings, "review", chapter, lesson, question, "translation-drift", "Same Urdu prompt maps to different Dutch answers.", `${existing.raw} / ${question.answer}`);
      } else {
        urduToDutch.set(key, { value, raw: question.answer });
      }
    }
  }
}

function auditChapter(chapter, visualIds) {
  const findings = [];
  const lessonIds = new Set();
  for (const lesson of chapter.lessons || []) {
    if (lessonIds.has(lesson.id)) {
      addFinding(findings, "error", chapter, lesson, null, "duplicate-lesson-id", "Chapter contains duplicate lesson id.");
    }
    lessonIds.add(lesson.id);
    if ((lesson.questions || []).length !== 60) {
      addFinding(findings, "error", chapter, lesson, null, "lesson-size", "Lesson does not contain exactly 60 questions.", String((lesson.questions || []).length));
    }
    const questionIds = new Set();
    for (const question of lesson.questions || []) {
      if (questionIds.has(question.id)) {
        addFinding(findings, "error", chapter, lesson, question, "duplicate-question-id", "Lesson contains duplicate question id.");
      }
      questionIds.add(question.id);
      auditQuestion(findings, chapter, lesson, question, visualIds);
    }
    auditConsistency(findings, chapter, lesson);
  }
  return findings;
}

function summarize(chapter, findings) {
  const counts = findings.reduce((acc, finding) => {
    acc[finding.severity] = (acc[finding.severity] || 0) + 1;
    return acc;
  }, {});
  const byRule = findings.reduce((acc, finding) => {
    const key = `${finding.severity}:${finding.rule}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return {
    chapterId: chapter.id,
    title: chapter.title,
    lessonCount: (chapter.lessons || []).length,
    questionCount: (chapter.lessons || []).reduce((sum, lesson) => sum + (lesson.questions || []).length, 0),
    errors: counts.error || 0,
    review: counts.review || 0,
    byRule
  };
}

const { chapters, visuals } = loadCourse();
const visualIds = new Set(visuals.map(visualId));
const selected = chapters.filter((chapter) => !chapterFilter || chapter.id === chapterFilter);
const results = selected.map((chapter) => {
  const findings = auditChapter(chapter, visualIds);
  return { summary: summarize(chapter, findings), findings };
});

if (jsonMode) {
  console.log(JSON.stringify(results, null, 2));
} else {
  for (const { summary, findings } of results) {
    console.log(`${summary.chapterId}: ${summary.lessonCount} lessons, ${summary.questionCount} questions, ${summary.errors} errors, ${summary.review} review flags`);
    for (const [rule, count] of Object.entries(summary.byRule).sort()) {
      console.log(`  ${rule}: ${count}`);
    }
    for (const finding of findings.slice(0, 40)) {
      console.log(`  - [${finding.severity}] ${finding.lessonId} ${finding.questionId} ${finding.rule}: ${finding.message}`);
      if (finding.prompt || finding.answer) console.log(`    ${finding.prompt} => ${finding.answer}`);
      if (finding.detail) console.log(`    ${finding.detail}`);
    }
    if (findings.length > 40) console.log(`  ... ${findings.length - 40} more findings`);
  }
}

process.exit(results.some((result) => result.summary.errors > 0) ? 1 : 0);
