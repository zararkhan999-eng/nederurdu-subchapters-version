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
  const course = context.window.NEDERURDU_COURSE || null;
  return {
    course,
    chapters: course?.chapters || context.window.NEDERURDU_CHAPTERS || [],
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
const normalizeSemantic = (value) => normalize(value)
  .replace(/[\u060c\u061b\u061f\u06d4]/g, " ")
  .trim()
  .replace(/\s+/g, " ");
const normalizeDutchExample = (value) => normalizeSemantic(
  text(value).replace(/^\s*(?:(?:persoon|spreker)\s+)?[a-z]\s*[:：-]\s*/i, "")
);
const normalizeUrduExample = (value) => normalizeSemantic(
  text(value).replace(/^\s*(?:شخص|بولنے\s+والا)\s*[A-Za-zا-ی]?\s*[:：-]\s*/u, "")
);
const hasMalformedPunctuation = (value) => /[؟?]{2,}|[۔.]{3,}|[،,]{2,}/u.test(text(value));
const isDutchYesNoQuestion = (value) => {
  const candidate = text(value);
  return /[?]$/.test(candidate)
    && /^(?:ben|bent|is|zijn|heb|hebt|heeft|hebben|kan|kun|kunt|mag|wil|wilt|moet|zal|zullen|ga|gaat|gaan|kom|komt|komen|doe|doet|spreek|spreekt|begrijp|begrijpt)\b/i.test(candidate);
};
const values = (collection) => Array.isArray(collection)
  ? collection
  : Object.values(collection || {});
const ids = (collection) => values(collection).map((item) => typeof item === "string" ? item : item?.id).filter(Boolean);
const idSet = (collection) => new Set(ids(collection));
const list = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
const getActiveLessonExercises = (lesson) => (
  Array.isArray(lesson?.exercises) ? list(lesson.exercises) : list(lesson?.questions)
);
const getLegacyLessonQuestions = (lesson) => list(lesson?.legacyQuestions);
const containsRawArtifact = (value) => {
  if (typeof value === "string") return /\b(?:learner|undefined|null|NaN)\b|\[object Object\]/i.test(value);
  if (Array.isArray(value)) return value.some(containsRawArtifact);
  if (value && typeof value === "object") return Object.values(value).some(containsRawArtifact);
  return false;
};

const choiceTypes = new Set([
  "meaning", "reverse", "image-choice", "listen-choice", "situation",
  "document-choice", "fill-gap"
]);
const dutchAnswerTypes = new Set(["reverse", "image-choice", "situation", "build", "sequence", "short-input", "speak-repeat"]);
const urduAnswerTypes = new Set(["meaning", "document-choice"]);
const infoTypes = new Set(["uitleg", "speak-repeat"]);
const strictVisualTypes = new Set([
  "meaning", "reverse", "image-choice", "fill-gap", "situation", "build", "sequence", "short-input"
]);
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

function buildVisualLookup(visuals) {
  const terms = new Map();
  const byId = new Map();
  for (const visual of visuals) {
    const id = visualId(visual);
    byId.set(id, visual);
    for (const term of [id.replaceAll("-", " "), visual.canonicalTerm, ...(visual.dutchTerms || [])]) {
      const key = normalize(term);
      if (key) terms.set(key, id);
    }
  }
  return { terms, byId };
}

function resolveVisualTerm(value, lookup) {
  const normalized = normalize(value);
  const withoutArticle = normalized.replace(/^(de|het|een|geen)\s+/, "");
  return lookup.terms.get(normalized) || lookup.terms.get(withoutArticle) || "";
}

function visualMatchesTerm(visualIdValue, value, lookup) {
  const visual = lookup.byId.get(visualIdValue);
  if (!visual) return false;
  const normalized = normalize(value);
  const withoutArticle = normalized.replace(/^(de|het|een|geen)\s+/, "");
  return [visualIdValue.replaceAll("-", " "), visual.canonicalTerm, ...(visual.dutchTerms || [])]
    .map(normalize)
    .some((term) => term === normalized || term === withoutArticle || term === `getal ${normalized}`);
}

const imagePersonTerms = new Set([
  "man", "vrouw", "kind", "kinderen", "jongen", "meisje", "familie",
  "vader", "moeder", "broer", "zus", "zoon", "dochter", "ouder",
  "buurman", "buurvrouw", "collega", "docent", "dokter", "monteur",
  "bezorger", "baas", "leidinggevende"
]);

function imageOptionGroup(visualIdValue, term, lookup) {
  const normalizedTerm = normalize(term);
  const normalizedVisualId = normalize(visualIdValue).replace(/\s+/g, "-");
  if (imagePersonTerms.has(normalizedTerm) || imagePersonTerms.has(normalizedVisualId)) return "person";
  if (["appel", "brood", "kaas", "fruit", "groente", "rijst", "water", "melk", "koffie", "thee", "soep", "vlees"].includes(normalizedTerm)) return "food";
  if (["bus", "trein", "fiets", "station", "halte", "kaartje", "spoor"].includes(normalizedTerm) || ["bus", "trein", "fiets", "station", "halte", "kaartje", "spoor"].includes(normalizedVisualId)) return "transport";
  if (["huis", "deur", "lamp", "stoel", "tafel", "kamer", "badkamer", "keuken", "raam", "tuin", "woning"].includes(normalizedTerm) || ["huis", "deur", "lamp", "stoel", "tafel", "kamer", "badkamer", "keuken", "raam", "tuin", "woning"].includes(normalizedVisualId)) return "home";
  if (["school", "gemeente", "winkel", "supermarkt", "apotheek", "ziekenhuis", "bibliotheek", "stad", "land", "plein"].includes(normalizedTerm) || ["school", "gemeente", "winkel", "supermarkt", "apotheek", "ziekenhuis", "bibliotheek", "stad", "land", "plein"].includes(normalizedVisualId)) return "place";
  if (["oog", "pijn", "hoofdpijn", "buikpijn", "hoesten", "koorts", "ziek", "moe", "honger", "dorst"].includes(normalizedTerm) || ["oog", "pijn", "hoofdpijn", "buikpijn", "hoesten", "koorts", "ziek", "moe", "honger", "dorst"].includes(normalizedVisualId)) return "health";
  return lookup.byId.get(visualIdValue)?.kind || "other";
}

function addFinding(findings, severity, chapter, lesson, question, rule, message, detail = "") {
  findings.push({
    severity,
    chapterId: chapter?.id || "course",
    lessonId: lesson?.id || "",
    lessonTitle: lesson?.title || "",
    questionId: question?.id || "",
    type: question?.type || "",
    rule,
    message,
    prompt: question?.prompt || "",
    answer: question?.answer || "",
    detail
  });
}

function auditQuestion(findings, chapter, lesson, question, visualIds, visualLookup) {
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
    const answerVisual = question.visualId || resolveVisualTerm(answer, visualLookup);
    const answerGroup = imageOptionGroup(answerVisual, answer, visualLookup);
    for (const option of question.options || []) {
      if (normalize(option) === normalize(answer)) continue;
      const optionVisual = resolveVisualTerm(option, visualLookup);
      if (answerVisual && optionVisual && answerVisual === optionVisual) {
        addFinding(findings, "error", chapter, lesson, question, "image-option-overlap", "Image-choice has two options that resolve to the same picture.", `${answer} / ${option}`);
      } else if (imageOptionGroup(optionVisual, option, visualLookup) === answerGroup) {
        addFinding(findings, "error", chapter, lesson, question, "image-option-overlap", "Image-choice options are too visually similar.", `${answer} / ${option}`);
      }
    }
  }

  if (question.visualId && strictVisualTypes.has(question.type)) {
    const expectedVisualTerm = question.type === "meaning" ? prompt : answer;
    if (!visualMatchesTerm(question.visualId, expectedVisualTerm, visualLookup)) {
      addFinding(
        findings,
        "error",
        chapter,
        lesson,
        question,
        "visual-context-mismatch",
        "Visual does not exactly represent the word or phrase being tested.",
        `${question.visualId} != ${expectedVisualTerm}`
      );
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

  if (containsRawArtifact(question)) {
    addFinding(findings, "error", chapter, lesson, question, "raw-artifact", "Question contains raw placeholder/debug text.");
  }
}

function auditConsistency(findings, chapter, lesson) {
  const dutchToUrdu = new Map();
  const urduToDutch = new Map();
  const withoutArticle = (value) => normalize(value).replace(/^(de|het|een|geen)\s+/, "");
  for (const question of getActiveLessonExercises(lesson)) {
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

const coursePhaseOrder = [
  "preview", "learn", "understand", "guided-practice", "use", "independent-check", "correction"
];
const missionPhaseOrder = ["preview", "use", "independent-check", "correction"];
const completionSkillAreas = [
  "meaning", "listening", "reading", "speaking-support", "practical-use"
];
const masteryStates = ["introduced", "practiced", "secure"];
const annotatedExercisePhases = new Set([
  "learn", "understand", "guided-practice", "use", "independent-check"
]);
const productionTypes = new Set(["reverse", "fill-gap", "build", "sequence", "situation", "short-input"]);
const unscoredTypes = new Set(["uitleg", "speak-repeat", "correction-teach"]);
const lexicalScaffoldTokens = new Set([
  "nederlands", "a", "b", "ali", "sara", "ahmed", "fatima",
  "amsterdam", "rotterdam", "utrecht", "nederland", "digid", "iban", "bsn",
  "www", "nl"
]);
const outcomeScaffoldTokens = new Set([
  ...lexicalScaffoldTokens,
  "a0", "a1", "a2", "letters", "tool", "whatsapp", "sms", "wifi", "wi-fi"
]);
const grammarFirstLabelPattern = /(?:\bgrammar\b|\bgrammatica\b|\bwerkwoorden?\b|\bnaamwoorden?\b|\bvoornaamwoorden?\b|\blidwoorden?\b|\bwoordvolgorde\b|\bzinsvolgorde\b|\bverleden\s+tijd\b|\bvoltooid(?:e)?\s+tijd\b|\btegenwoordige\s+tijd\b|\bperfectum\b|\b(?:scheidbare|splitsbare)\s+werkwoorden?\b|\bmodale?\s+hulpwerkwoorden?\b|\bpronouns?\b|\barticles?\b|\bverbs?\b|\bnouns?\b|\btenses?\b|قواعد|گرامر|لفظوں\s+کی\s+ترتیب|جملے\s+کی\s+ترتیب|حال\s+کا\s+زمانہ|ماضی\s+کا\s+زمانہ|مستقبل\s+کا\s+زمانہ)/iu;
const urduFeedbackStopwords = new Set([
  "ہے", "ہیں", "کا", "کی", "کے", "کو", "میں", "سے", "اور", "یہ", "وہ",
  "اس", "ایک", "پر", "کر", "کریں", "دوبارہ", "دیکھیں", "صحیح", "جواب"
]);

function sameIds(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function addCourseFinding(
  findings,
  severity,
  rule,
  message,
  detail = "",
  chapter = null,
  lesson = null,
  question = null,
  relatedConceptIds = []
) {
  addFinding(findings, severity, chapter || { id: "course" }, lesson || {}, question, rule, message, detail);
  if (relatedConceptIds.length) {
    findings[findings.length - 1].relatedConceptIds = [...new Set(relatedConceptIds)];
  }
}

function findDuplicates(items) {
  return items.filter((item, index) => items.indexOf(item) !== index);
}

function dedupeFindings(findings) {
  const seen = new Set();
  return findings.filter((finding) => {
    const key = [
      finding.severity,
      finding.chapterId,
      finding.lessonId,
      finding.questionId,
      finding.rule,
      finding.detail
    ].join("\u0000");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isEarlierLesson(prerequisiteId, targetId, lessonPositionMap) {
  const prerequisitePosition = lessonPositionMap.get(prerequisiteId);
  const targetPosition = lessonPositionMap.get(targetId);
  return Number.isFinite(prerequisitePosition)
    && Number.isFinite(targetPosition)
    && prerequisitePosition < targetPosition;
}

function latinTokens(value) {
  return text(value)
    .replace(/\bhttps?:\/\/\S+|\bwww\.\S+|\b\S+@\S+\b/gi, " ")
    .match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]*/g)?.map((token) => token.toLowerCase()) || [];
}

function urduMeaningTokens(value) {
  return (text(value).match(/[\u0600-\u06ff]+/gu) || [])
    .filter((token) => token.length > 1 && !urduFeedbackStopwords.has(token));
}

function escapeRegExp(value) {
  return text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function conceptTemplateFingerprint(concept, value) {
  let candidate = text(value).replace(
    /[“”"'‘’][^“”"'‘’]+[“”"'‘’]/gu,
    " <target> "
  );
  const targets = [
    concept.dutch,
    concept.urdu,
    ...list(concept.translationAliasesUrdu)
  ].map(text).filter(Boolean).sort((left, right) => right.length - left.length);
  for (const target of targets) {
    candidate = candidate.replace(new RegExp(escapeRegExp(target), "giu"), " <target> ");
  }
  return normalizeSemantic(candidate
    .replace(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]*/g, " <latin> ")
    .replace(/\d+/g, " <number> "));
}

function hasSimpleUrduFirstLabel(value) {
  return hasUrdu(value) && !grammarFirstLabelPattern.test(text(value));
}

function conceptIsExplicitAtomicChunk(concept, lesson) {
  const mode = normalizeSemantic(
    concept?.learningMode
    || concept?.teachingMode
    || concept?.conceptType
    || concept?.kind
  );
  const block = list(lesson?.teachingBlocks).find((item) => item.conceptId === concept?.id);
  const blockMode = normalizeSemantic(block?.mode || block?.teachingMode || block?.kind);
  return concept?.atomicChunk === true
    || concept?.teachAsChunk === true
    || ["atomic chunk", "whole phrase", "practical chunk"].includes(mode)
    || ["atomic chunk", "whole phrase", "practical chunk"].includes(blockMode);
}

function auditOutcomeTargetConsistency(findings, chapter, lesson, conceptMap, skillMap) {
  const allowedConceptIds = new Set([
    ...list(lesson.conceptIds),
    ...list(lesson.prerequisites?.skillIds)
      .map((skillId) => skillMap.get(skillId)?.conceptId)
      .filter(Boolean)
  ]);
  const allowedTokens = new Set(outcomeScaffoldTokens);
  for (const conceptId of allowedConceptIds) {
    const concept = conceptMap.get(conceptId);
    for (const token of latinTokens(concept?.dutch)) allowedTokens.add(token);
    for (const token of latinTokens(concept?.audioText)) allowedTokens.add(token);
  }
  for (const token of list(lesson.outcomeContextTerms).flatMap(latinTokens)) {
    allowedTokens.add(token);
  }
  const promisedValues = [
    ["description", lesson.description],
    ["outcomeUrdu", lesson.outcomeUrdu]
  ];
  const mismatches = [];
  for (const [field, value] of promisedValues) {
    const unownedTokens = [...new Set(
      latinTokens(value).filter((token) => !allowedTokens.has(token))
    )];
    if (unownedTokens.length) {
      mismatches.push(`${field}: ${unownedTokens.join(", ")}`);
    }
  }
  if (mismatches.length) {
    addCourseFinding(
      findings,
      "error",
      "lesson-outcome-target-consistency",
      "A lesson promise names Dutch material that the lesson neither owns nor declares as a known prerequisite.",
      mismatches.join("; "),
      chapter,
      lesson
    );
  }
}

function auditRequiredChapterTopics(
  findings,
  chapter,
  lessonMap,
  conceptMap,
  patternMap,
  lessonPositionMap
) {
  const chapterLessons = list(chapter.lessonIds).map((id) => lessonMap.get(id)).filter(Boolean);
  const chapterLessonIds = new Set(chapterLessons.map((lesson) => lesson.id));
  const chapterConcepts = [...conceptMap.values()].filter((concept) => (
    chapterLessonIds.has(concept.introducedInLessonId)
  ));
  const chapterPatterns = [...patternMap.values()].filter((pattern) => (
    pattern.chapterId === chapter.id && chapterLessonIds.has(pattern.lessonId)
  ));
  const targetCorpus = [
    ...chapterConcepts.flatMap((concept) => [concept.dutch, concept.audioText]),
    ...chapterPatterns.flatMap((pattern) => [pattern.modelDutch, pattern.highlight])
  ].map(normalizeSemantic).filter(Boolean);
  const covers = (pattern) => targetCorpus.some((value) => pattern.test(value));
  const requiredTopics = {
    a0: [
      ["greetings", /^(?:hallo|goedemorgen|goedemiddag|goedenavond|dag|tot ziens)$/i],
      ["help phrases", /(?:begrijp|herhalen|langzamer|helpen|betekent)/i],
      ["yes and no", /^(?:ja|nee)$/i],
      ["essential sounds", /^[a-z]$/i],
      ["identity", /^(?:ik heet|hoe heet u|mijn naam is(?:\s+.+)?)$/i],
      ["pronouns", /^(?:ik|jij|u|hij|zij|wij)$/i],
      ["being and having", /^(?:ben|bent|is|heb|hebt|heeft|hebben)$/i],
      ["numbers", /^(?:nul|een|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|elf|twaalf|dertien|veertien|vijftien|zestien|zeventien|achttien|negentien|twintig|dertig|veertig|vijftig|zestig|zeventig|tachtig|negentig|honderd)$/i],
      ["time", /^(?:uur|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag|ochtend|middag|avond|nacht|hoe laat is het|om \w+ uur)$/i],
      ["address and contact", /^(?:adres|straat|huisnummer|postcode|woonplaats|telefoonnummer|e-mailadres)$/i],
      ["family", /^(?:familie|gezin)$/i],
      ["home", /^(?:huis|het huis|kamer|keuken|badkamer|sleutel|verwarming|licht)$/i],
      ["food and drink", /^(?:brood|rijst|melk|koffie|thee|fruit|groente|water)$/i],
      ["shopping", /^(?:winkel|supermarkt|prijs|kassa|bon|contant|pinnen|betalen)$/i],
      ["transport", /^(?:bus|trein|station|halte|kaartje|links|rechts|rechtdoor)$/i],
      ["health", /^(?:ziek|pijn|dokter|apotheek|medicijn|ziekenhuis|ambulance|hoofdpijn|buikpijn)$/i],
      ["school", /^(?:school|docent|klas|schooltijd|afwezig)$/i],
      ["work", /^(?:werk|werken|collega|leidinggevende|pauze|beginnen|stoppen)$/i],
      ["safety", /^(?:gevaar|verboden|stop|bel 112|ingang|uitgang)$/i]
    ],
    a1: [
      ["personal information", /(?:naam|adres|telefoonnummer|woonplaats|geboorte)/i],
      ["family", /^(?:familie|gezin|moeder|vader|ouders?|broer|zus|zoon|dochter|partner)$/i],
      ["routines", /(?:opstaan|werken|slapen|ontbijt|dagelijks|elke dag)/i],
      ["questions", /^(?:wie|wat|waar|wanneer|waarom|hoe|welk|welke)$/i],
      ["appointments", /(?:afspraak|agenda|op tijd|te laat)/i],
      ["home", /(?:huis|woning|kamer|keuken|badkamer|huur)/i],
      ["food", /(?:brood|kaas|groente|fruit|eten|drinken|menu)/i],
      ["transport", /(?:bus|trein|station|halte|kaartje|reizen)/i],
      ["health", /(?:ziek|pijn|dokter|huisarts|apotheek|medicijn)/i],
      ["school", /(?:school|docent|klas|leraar|ouderavond)/i],
      ["work", /(?:werk|werken|collega|rooster|baas|dienst)/i]
    ],
    a2: [
      ["municipality and forms", /(?:gemeente|formulier|aanvraag|digid|bsn|inschrijven)/i],
      ["employment", /(?:werk|baan|vacature|sollicit|contract|salaris|rooster)/i],
      ["school contact", /(?:school|docent|leraar|ouderavond|rapport|voortgang)/i],
      ["health", /(?:huisarts|dokter|klacht|symptoom|medicijn|recept)/i],
      ["housing", /(?:woning|huur|verhuurder|lekkage|verwarming|reparatie)/i],
      ["complaints", /(?:klacht|klantenservice|retour|garantie|terugbetaling)/i],
      ["bills", /(?:rekening|factuur|bedrag|betaaldatum|betaling)/i],
      ["banking", /(?:bank|iban|incasso|rekeningnummer|termijn)/i],
      ["formal messages", /(?:geachte|met vriendelijke groet|e-mail|bijlage|onderwerp)/i],
      ["past events", /(?:gisteren|vorige|geweest|gedaan|gewerkt|gehad|was|waren)/i],
      ["future plans", /(?:morgen|volgende|gaan|zal|zullen|plan)/i]
    ]
  };
  for (const [topic, pattern] of requiredTopics[chapter.id] || []) {
    if (!covers(pattern)) {
      addCourseFinding(
        findings,
        "error",
        "required-chapter-topic",
        "The chapter is missing a required practical curriculum strand.",
        topic,
        chapter
      );
    }
  }

  if (chapter.id !== "a0") return;
  const familyRoles = {
    collective: /^(?:familie|gezin)$/i,
    parent: /^(?:moeder|vader|ouder|ouders)$/i,
    closeRelation: /^(?:broer|zus|zoon|dochter|kind|kinderen|partner)$/i
  };
  const missingFamilyRoles = Object.entries(familyRoles)
    .filter(([, pattern]) => !covers(pattern))
    .map(([role]) => role);
  if (missingFamilyRoles.length) {
    addCourseFinding(
      findings,
      "error",
      "a0-family-strand",
      "A0 family coverage needs a collective family word, a parent word, and a close-relation word; one isolated sound example is not a family lesson.",
      missingFamilyRoles.join(", "),
      chapter
    );
  }

  const identityConcept = chapterConcepts.find((concept) => (
    /^(?:ik heet|hoe heet u|mijn naam is(?:\s+.+)?)$/i.test(normalizeSemantic(concept.dutch))
  ));
  const firstNumberConcept = chapterConcepts.find((concept) => (
    /^(?:nul|een|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|elf)$/i.test(normalizeSemantic(concept.dutch))
    && /(?:number|time|date|appointment)/i.test(concept.introducedInLessonId || "")
  ));
  if (
    identityConcept
    && firstNumberConcept
    && !isEarlierLesson(
      identityConcept.introducedInLessonId,
      firstNumberConcept.introducedInLessonId,
      lessonPositionMap
    )
  ) {
    addCourseFinding(
      findings,
      "error",
      "a0-identity-order",
      "A0 must establish a basic name/identity exchange after greetings and sounds, before the numbers-and-time strand.",
      `${identityConcept.id} after ${firstNumberConcept.id}`,
      chapter,
      lessonMap.get(identityConcept.introducedInLessonId)
    );
  }

  const baseIkBen = chapterConcepts.find((concept) => (
    normalizeSemantic(concept.dutch) === "ik ben"
  ));
  if (baseIkBen) {
    const earlyCompositeChunks = chapterConcepts.filter((concept) => (
      /^ik ben\s+.+/i.test(normalizeSemantic(concept.dutch))
      && isEarlierLesson(
        concept.introducedInLessonId,
        baseIkBen.introducedInLessonId,
        lessonPositionMap
      )
      && !conceptIsExplicitAtomicChunk(concept, lessonMap.get(concept.introducedInLessonId))
    ));
    for (const concept of earlyCompositeChunks) {
      addCourseFinding(
        findings,
        "error",
        "a0-unmarked-early-chunk",
        "A phrase using “ik ben” before the reusable “ik ben” pattern must be explicitly authored as a whole practical chunk.",
        concept.id,
        chapter,
        lessonMap.get(concept.introducedInLessonId)
      );
    }
  }
}

function explanationCore(value) {
  return normalizeSemantic(text(value).replace(
    /^(?:دوبارہ\s+دیکھیں|غلط\s+جواب[؛:،,]?\s*|صحیح\s+جواب[؛:،,]?\s*)+/u,
    ""
  ));
}

function optionValue(option) {
  if (typeof option === "string" || typeof option === "number") return text(option);
  return text(option?.value || option?.text || option?.label || option?.word || option?.answer);
}

function getOptionExplanations(question) {
  const explanations = question.optionExplanationsUrdu
    || question.wrongExplanationsByOption
    || question.optionExplanations
    || question.feedbackByOption;
  return explanations && typeof explanations === "object" && !Array.isArray(explanations)
    ? explanations
    : null;
}

function getOptionExplanation(explanations, option) {
  if (!explanations) return "";
  const rawOption = optionValue(option);
  if (text(explanations[rawOption])) return text(explanations[rawOption]);
  const normalizedOption = normalizeSemantic(rawOption);
  const matchingKey = Object.keys(explanations).find((key) => (
    normalizeSemantic(key) === normalizedOption
  ));
  return matchingKey ? text(explanations[matchingKey]) : "";
}

function isGenericWrongExplanation(value) {
  const candidate = normalizeSemantic(value);
  return /اشارہ\s+دیکھیں\s+اور\s+اسی\s+ہدف\s+کو\s+ایک\s+بار\s+پھر\s+درست\s+کریں/u.test(candidate)
    || /مثال\s+دوبارہ\s+(?:ذہن\s+میں\s+لائیں|دیکھیں)/u.test(candidate)
    || /یہ\s+اسی\s+سبق\s+میں\s+مثال\s+کے\s+ساتھ\s+سکھایا\s+گیا\s+تھا/u.test(candidate)
    || /صحیح\s+nederlands\s+.+\s+ہے\s+اس\s+کی\s+آواز/u.test(candidate)
    || /نمونہ\s+دوبارہ\s+دیکھیں/u.test(candidate);
}

function questionLexicalValues(question) {
  const tileText = (tiles) => list(tiles).map((tile) => (
    typeof tile === "string" ? tile : tile?.word
  ));
  return [
    question.prompt,
    question.answer,
    question.speak,
    question.instructionUrdu,
    question.instruction,
    ...list(question.options),
    ...list(question.acceptedAnswers),
    ...tileText(question.tiles),
    ...tileText(question.fallbackTiles),
    question.document?.title,
    ...list(question.document?.rows).flatMap((row) => [row?.label, row?.value])
  ].filter(Boolean);
}

function exerciseContentSignature(question) {
  const normalizedTiles = (tiles) => list(tiles).map((tile) => normalizeSemantic(
    typeof tile === "string" ? tile : tile?.word
  ));
  return JSON.stringify({
    type: question.type,
    prompt: normalizeSemantic(question.prompt),
    answer: normalizeSemantic(question.answer),
    speak: normalizeSemantic(question.speak),
    options: list(question.options).map(normalizeSemantic).sort(),
    tiles: normalizedTiles(question.tiles),
    fallbackTiles: normalizedTiles(question.fallbackTiles),
    document: question.document || null
  });
}

function exerciseTargetIsOwned(question, conceptMap, skillMap) {
  if (unscoredTypes.has(question.type)) return true;
  if (list(question.skillIds).some((id) => skillMap.get(id)?.patternId)) return true;
  const concepts = list(question.conceptIds).map((id) => conceptMap.get(id)).filter(Boolean);
  if (!concepts.length) return false;
  const sameSurface = (left, right) => {
    const normalizedLeft = normalizeSemantic(left);
    const normalizedRight = normalizeSemantic(right);
    return Boolean(normalizedLeft && normalizedRight) && normalizedLeft === normalizedRight;
  };
  const sameMeaning = (left, right) => {
    if (sameSurface(left, right)) return true;
    const alternatives = text(right).split(/[\/|]/).map(normalizeSemantic).filter(Boolean);
    return alternatives.includes(normalizeSemantic(left));
  };
  const answer = question.answer;
  const prompt = question.prompt;
  const ownsCompositeDutch = (value) => concepts.length > 1 && concepts.every((concept) => (
    normalizeSemantic(value).includes(normalizeSemantic(concept.dutch))
  ));
  if (["reverse", "situation", "image-choice", "build", "short-input"].includes(question.type)) {
    return ownsCompositeDutch(answer) || concepts.some((concept) => sameSurface(answer, concept.dutch));
  }
  if (question.type === "meaning") {
    return (ownsCompositeDutch(prompt) && hasUrdu(answer)) || concepts.some((concept) => (
      sameSurface(prompt, concept.dutch) && sameMeaning(answer, concept.urdu)
    ));
  }
  if (question.type === "listen-choice") {
    return (ownsCompositeDutch(question.speak || answer) && hasUrdu(answer)) || concepts.some((concept) => (
      sameSurface(question.speak || answer, concept.dutch)
      && (sameSurface(answer, concept.dutch) || sameMeaning(answer, concept.urdu))
    ));
  }
  if (question.type === "document-choice") {
    const documentValues = list(question.document?.rows).map((row) => row?.value);
    return concepts.some((concept) => (
      documentValues.some((value) => sameSurface(value, concept.dutch))
      && (sameSurface(answer, concept.dutch) || sameMeaning(answer, concept.urdu))
    ));
  }
  if (question.type === "fill-gap") {
    const completed = text(prompt).replace(/_{2,}|…+/u, text(answer));
    return concepts.some((concept) => (
      sameSurface(answer, concept.dutch) || sameSurface(completed, concept.dutch)
    ));
  }
  if (question.type === "sequence") {
    const sequenceText = [
      answer,
      ...list(question.tiles).map((tile) => typeof tile === "string" ? tile : tile?.word)
    ].join(" ");
    return concepts.every((concept) => normalizeSemantic(sequenceText).includes(normalizeSemantic(concept.dutch)));
  }
  return true;
}

function auditLexicalOwnership(findings, chapter, lesson, question, allowedConceptIds, conceptMap) {
  const allowedTokens = new Set(lexicalScaffoldTokens);
  for (const conceptId of allowedConceptIds) {
    const concept = conceptMap.get(conceptId);
    for (const token of latinTokens(concept?.dutch)) allowedTokens.add(token);
    for (const token of latinTokens(concept?.audioText)) allowedTokens.add(token);
  }
  const unownedTokens = [...new Set(
    questionLexicalValues(question)
      .flatMap(latinTokens)
      .filter((token) => !allowedTokens.has(token))
  )];
  if (unownedTokens.length) {
    addCourseFinding(
      findings,
      "error",
      "hidden-lexical-material",
      "Exercise contains Dutch material that is not owned by this run/mission or an explicit prerequisite.",
      unownedTokens.join(", "),
      chapter,
      lesson,
      question
    );
  }
}

function resolveCourseRecords(records, recordMap) {
  return values(records).map((record) => (
    typeof record === "string" ? recordMap.get(record) : record
  )).filter(Boolean);
}

function getMissionQuestions(mission) {
  const all = [
    ...(mission.questions || []),
    ...(mission.variants || []).flatMap((variant) => variant.questions || [])
  ];
  const seen = new Set();
  return all.filter((question) => {
    if (!question?.id || seen.has(question.id)) return false;
    seen.add(question.id);
    return true;
  });
}

function getSelectedLessonQuestions(lesson) {
  const questionMap = new Map();
  for (const question of getActiveLessonExercises(lesson)) {
    if (question?.id) questionMap.set(question.id, question);
    if (question?.legacyId) questionMap.set(question.legacyId, question);
  }
  const selectedIds = list(lesson.learning?.runs).flatMap((run) => {
    const phases = run.phases || {};
    return [
      ...list(phases.understand?.exerciseIds),
      ...list((phases.guidedPractice || phases.guided)?.exerciseIds),
      ...list(phases.use?.exerciseIds),
      ...list((phases.independentCheck || phases.check)?.exerciseIds)
    ];
  });
  const seen = new Set();
  return selectedIds.map((id) => questionMap.get(id)).filter((question) => {
    if (!question?.id || seen.has(question.id)) return false;
    seen.add(question.id);
    return true;
  });
}

function getDocumentFacts(question) {
  const document = question.document || {};
  const rows = list(document.rows);
  const lines = [
    ...list(document.lines),
    ...list(document.paragraphs),
    document.body,
    document.text
  ].map(text).filter(Boolean);
  const allText = [
    document.title,
    ...rows.flatMap((row) => [row?.label, row?.value]),
    ...lines
  ].filter(Boolean).join(" ");
  return {
    kind: text(document.documentKind || document.kind || question.documentKind),
    rows,
    lines,
    informationUnits: rows.length + lines.length,
    dutchWordCount: latinTokens(allText).length
  };
}

function auditV4ExerciseReferences(findings, chapter, lesson, question, conceptMap, skillMap) {
  const conceptIds = list(question.conceptIds);
  const skillIds = list(question.skillIds);
  if (!text(question.id)) {
    addCourseFinding(findings, "error", "semantic-exercise-id", "Exercise needs a stable semantic id.", "", chapter, lesson, question);
  }
  if (
    !text(question.semanticKey || question.stableSemanticKey)
    && /(?:^|[-:])\d+$/.test(text(question.id))
  ) {
    addCourseFinding(findings, "error", "semantic-exercise-key", "A position-like exercise id needs an explicit stable semantic key.", question.id || "", chapter, lesson, question);
  }
  if (question.legacyId && question.legacyId === question.id) {
    addCourseFinding(findings, "error", "semantic-exercise-id", "When present, legacyId must differ from the semantic stable id.", question.legacyId, chapter, lesson, question);
  }
  if (!annotatedExercisePhases.has(question.phase)) {
    addCourseFinding(findings, "error", "exercise-phase", "Exercise has no canonical learning phase.", question.phase || "", chapter, lesson, question);
  }
  if (!conceptIds.length || conceptIds.some((id) => !conceptMap.has(id))) {
    addCourseFinding(findings, "error", "exercise-concept-ownership", "Exercise must reference known conceptIds.", conceptIds.join(", "), chapter, lesson, question);
  }
  if (!skillIds.length || skillIds.some((id) => !skillMap.has(id))) {
    addCourseFinding(findings, "error", "exercise-skill-ownership", "Exercise must reference known skillIds.", skillIds.join(", "), chapter, lesson, question);
  }
}

function auditV4Exercise(findings, chapter, lesson, question, conceptMap, skillMap) {
  const conceptIds = list(question.conceptIds);
  const instruction = text(question.instructionUrdu || question.instruction);
  const correctExplanation = text(question.explainCorrectUrdu || question.correctExplanation);
  const wrongExplanation = text(question.explainWrongUrdu || question.wrongExplanation);
  const hint = text(question.hintUrdu || question.hint || question.note);

  auditV4ExerciseReferences(findings, chapter, lesson, question, conceptMap, skillMap);
  if (!exerciseTargetIsOwned(question, conceptMap, skillMap)) {
    addCourseFinding(
      findings,
      "error",
      "exercise-target-ownership",
      "Exercise prompt and answer do not match the conceptIds that claim semantic ownership.",
      `${question.prompt || ""} => ${question.answer || ""}`,
      chapter,
      lesson,
      question
    );
  }
  if (!hasUrdu(instruction)) {
    addCourseFinding(findings, "error", "exercise-instruction", "Exercise needs a specific Urdu instruction.", instruction, chapter, lesson, question);
  } else if (
    normalize(instruction) === normalize(question.label)
    || knownUiPrompts.has(instruction)
  ) {
    addCourseFinding(findings, "review", "generic-exercise-instruction", "Exercise instruction repeats a generic UI heading instead of naming the task.", instruction, chapter, lesson, question);
  }
  if (
    !unscoredTypes.has(question.type)
    && (!hasUrdu(correctExplanation) || !hasUrdu(wrongExplanation))
  ) {
    addCourseFinding(findings, "error", "exercise-explanations", "Exercise needs separate Urdu correct and wrong explanations.", `${correctExplanation} / ${wrongExplanation}`, chapter, lesson, question);
  } else if (!unscoredTypes.has(question.type)) {
    const normalizedCorrect = normalizeSemantic(correctExplanation);
    const normalizedWrong = normalizeSemantic(wrongExplanation);
    if (
      normalizedCorrect === normalizedWrong
      || explanationCore(correctExplanation) === explanationCore(wrongExplanation)
    ) {
      addCourseFinding(findings, "error", "indistinguishable-explanations", "Correct and wrong explanations must be meaningfully different.", normalizedCorrect, chapter, lesson, question);
    }
    const ownedRecords = conceptIds.map((id) => conceptMap.get(id)).filter(Boolean);
    const ownedTargets = ownedRecords.flatMap((concept) => {
      return [concept?.dutch, concept?.urdu].map(normalizeSemantic).filter(Boolean);
    });
    const questionTargets = [question.answer, question.prompt].map(normalizeSemantic).filter(Boolean);
    const targetCandidates = [...new Set([...ownedTargets, ...questionTargets])]
      .filter((candidate) => candidate.length > 1);
    const significantUrduTargets = new Set(ownedRecords.flatMap((concept) => (
      [
        concept.urdu,
        concept.usageUrdu,
        concept.exampleUrdu,
        concept.commonConfusionUrdu
      ].flatMap(urduMeaningTokens)
    )));
    const mentionsTarget = (explanation) => {
      const normalizedExplanation = normalizeSemantic(explanation);
      return targetCandidates.some((candidate) => (
        normalizedExplanation.includes(candidate)
        || candidate.includes(normalizedExplanation)
      )) || urduMeaningTokens(explanation).some((token) => significantUrduTargets.has(token));
    };
    const genericCorrect = /^(?:اب\s+اسی\s+بات\s+کی\s+مشق\s+کریں|درست|صحیح)$/u.test(normalizedCorrect);
    const genericWrong = /^(?:دوبارہ\s+دیکھیں\s+)?(?:اب\s+اسی\s+بات\s+کی\s+مشق\s+کریں|غلط)$/u.test(normalizedWrong);
    if (
      !mentionsTarget(correctExplanation) || !mentionsTarget(wrongExplanation)
    ) {
      addCourseFinding(findings, "error", "untargeted-explanations", "Correct and wrong feedback must explain this exercise's owned meaning or rule.", `${correctExplanation} / ${wrongExplanation}`, chapter, lesson, question);
    } else if (genericCorrect || genericWrong || isGenericWrongExplanation(wrongExplanation)) {
      addCourseFinding(findings, "error", "generic-explanations", "Feedback cannot be a generic continue/retry message.", `${correctExplanation} / ${wrongExplanation}`, chapter, lesson, question);
    }
  }
  if (!unscoredTypes.has(question.type) && choiceTypes.has(question.type)) {
    const explanations = getOptionExplanations(question);
    const answer = normalizeSemantic(question.answer);
    const wrongOptions = list(question.options).filter((option) => (
      normalizeSemantic(optionValue(option)) !== answer
    ));
    const missing = [];
    const invalid = [];
    const explanationValues = [];
    for (const option of wrongOptions) {
      const optionText = optionValue(option);
      const explanation = getOptionExplanation(explanations, option);
      if (!hasUrdu(explanation)) {
        missing.push(optionText);
        continue;
      }
      explanationValues.push(normalizeSemantic(explanation));
      if (
        isGenericWrongExplanation(explanation)
        || !normalizeSemantic(explanation).includes(normalizeSemantic(optionText))
      ) {
        invalid.push(optionText);
      }
    }
    if (missing.length) {
      addCourseFinding(
        findings,
        "error",
        "missing-option-explanation",
        "Every wrong choice needs its own Urdu explanation so feedback can address the learner's selected distractor.",
        missing.join(", "),
        chapter,
        lesson,
        question
      );
    }
    if (invalid.length || new Set(explanationValues).size !== explanationValues.length) {
      addCourseFinding(
        findings,
        "error",
        "weak-option-explanation",
        "Wrong-choice feedback must name and explain that specific distractor; one shared retry template is not enough.",
        invalid.length ? invalid.join(", ") : "duplicate explanations",
        chapter,
        lesson,
        question
      );
    }
  }
  if (question.phase === "use" && !unscoredTypes.has(question.type)) {
    const prompt = text(question.prompt);
    const malformedOrMeta = /(?:اس\s+موضوع\s+میں|ضروری\s+آوازیں|اس\s+گفتگو\s+میں\s+پوری\s+بات\s+کہیں|تصویر\s+دیکھیں\s+اور\s+صحیح\s+لفظ\s+چنیں|اس\s+اردو\s+بات\s+کے\s+لیے\s+صحیح\s+Nederlands|روزمرہ\s+گفتگو\s+میں.+کے\s+مطابق\s+بات\s+کرنی\s+ہے|(?:بتانا\s+یا\s+پوچھنا|کہنا\s+یا\s+پوچھنا|سمجھنا\s+یا\s+پوچھنا|واضح\s+کرنا)\s+ہے|یہ\s+(?:معنی|بات)|حال\s*:\s*حال\s*:|\/\/|[،,]{2,})/iu.test(prompt);
    const ownedUrduTargets = conceptIds
      .map((id) => normalizeSemantic(conceptMap.get(id)?.urdu))
      .filter(Boolean);
    const barePrompt = normalizeSemantic(prompt).replace(/^حال\s+/, "");
    const repeatsOnlyTarget = ownedUrduTargets.some((target) => (
      barePrompt === target || barePrompt === `حال ${target}`
    ));
    const concreteUrduWords = urduMeaningTokens(
      prompt
        .replace(/^\s*حال\s*[:：]\s*/u, "")
        .replace(/اس\s+صورت\s+میں|صحیح\s+جواب|منتخب\s+کریں/gu, " ")
    );
    if (
      malformedOrMeta
      || repeatsOnlyTarget
      || concreteUrduWords.length < 3
    ) {
      addCourseFinding(
        findings,
        "error",
        "generic-or-mangled-use-context",
        "Use needs a concrete Urdu setting or action separate from the answer; generated topic prose, instructions, and mangled punctuation are not situations.",
        prompt,
        chapter,
        lesson,
        question
      );
    }
  }
  if (!unscoredTypes.has(question.type) && !hasUrdu(hint)) {
    addCourseFinding(findings, "error", "exercise-hint", "Assessed exercise needs an Urdu hint.", hint, chapter, lesson, question);
  }
  if (question.type === "short-input" && (!question.optional || !(question.fallbackTiles || []).length)) {
    addCourseFinding(findings, "error", "typed-fallback", "Typed exercise must remain optional and provide a word-bank fallback.", "", chapter, lesson, question);
  }
}

function auditA1UseScenarioProvenance(findings, chapter, lesson, question) {
  if (
    chapter.id !== "a1"
    || !question
    || question.phase !== "use"
    || question.scored === false
    || unscoredTypes.has(question.type)
  ) return;

  const scenarioSource = text(question.scenarioSource);
  if (
    scenarioSource.startsWith("a1-authored:")
    && scenarioSource.length > "a1-authored:".length
  ) return;

  addCourseFinding(
    findings,
    "error",
    "a1-use-scenario-provenance",
    "Every selected scored A1 Use exercise needs a stable authored scenarioSource beginning with a1-authored:.",
    scenarioSource || "missing scenarioSource",
    chapter,
    lesson,
    question
  );
}

function auditV4Concept(findings, concept, conceptMap, lessonMap, chapterMap, visualIds) {
  const fakeChapter = { id: list(concept.chapterIds)[0] || "course" };
  const fakeLesson = { id: list(concept.lessonIds)[0] || "", title: concept.dutch || concept.id };
  const required = [
    ["semanticKey", Boolean(text(concept.semanticKey || concept.senseId))],
    ["dutch", hasLatin(concept.dutch)],
    ["urdu", hasUrdu(concept.urdu)],
    ["pronunciationUrdu", hasUrdu(concept.pronunciationUrdu)],
    ["audioText", hasLatin(concept.audioText)],
    ["usageUrdu", hasUrdu(concept.usageUrdu)],
    ["exampleDutch", hasLatin(concept.exampleDutch)],
    ["exampleUrdu", hasUrdu(concept.exampleUrdu)],
    ["commonConfusionUrdu", hasUrdu(concept.commonConfusionUrdu)],
    ["role", Boolean(text(concept.role))]
  ];
  for (const [field, valid] of required) {
    if (!valid) addCourseFinding(findings, "error", "incomplete-concept", `Concept ${concept.id || "(missing id)"} is missing ${field}.`, "", fakeChapter, fakeLesson);
  }
  if (
    /(?:^|\s)[\u064b-\u065f\u0670]/u.test(text(concept.pronunciationUrdu))
    || !/[\u0621-\u063a\u0641-\u064a\u066e-\u06d3]/u.test(
      text(concept.pronunciationUrdu).replace(/[\u064b-\u065f\u0670]/gu, "")
    )
  ) {
    addCourseFinding(
      findings,
      "error",
      "malformed-pronunciation",
      "Urdu pronunciation help cannot begin a spoken token with a bare diacritic or contain no pronounceable Urdu letters.",
      concept.pronunciationUrdu || "",
      fakeChapter,
      fakeLesson
    );
  }
  const translationAliases = list(concept.translationAliasesUrdu).map(text).filter(Boolean);
  const overbroadAliases = translationAliases.filter((alias) => (
    normalizeSemantic(alias) === normalizeSemantic("دستاویز")
    && normalizeSemantic(concept.urdu) !== normalizeSemantic(alias)
    && !/^(?:document|documenten|papier|papieren)$/i.test(text(concept.dutch))
  ));
  if (overbroadAliases.length) {
    addCourseFinding(
      findings,
      "error",
      "overbroad-translation-alias",
      "A specific target cannot accept a broad category such as “document” as the same meaning.",
      overbroadAliases.join(", "),
      fakeChapter,
      fakeLesson
    );
  }
  const contrastConceptIds = [
    ...list(concept.contrastConceptIds),
    ...(concept.contrastConceptId ? [concept.contrastConceptId] : [])
  ];
  const validContrastIds = contrastConceptIds.filter((id) => (
    id !== concept.id && conceptMap.has(id)
  ));
  const usageBoundary = text(concept.usageBoundaryUrdu || concept.confusionBoundaryUrdu);
  const hasSpecificUsageBoundary = hasUrdu(usageBoundary)
    && normalizeSemantic(usageBoundary) !== normalizeSemantic(concept.usageUrdu)
    && normalizeSemantic(usageBoundary) !== normalizeSemantic(concept.commonConfusionUrdu)
    && urduMeaningTokens(usageBoundary).length >= 3;
  if (!validContrastIds.length && !hasSpecificUsageBoundary) {
    addCourseFinding(
      findings,
      "error",
      "concept-confusion-evidence",
      "A concept needs a concrete contrastConceptId or a concept-specific Urdu usage boundary; high-volume study templates are not common-confusion teaching.",
      `${contrastConceptIds.join(", ")} / ${usageBoundary}`,
      fakeChapter,
      fakeLesson
    );
  }
  if (contrastConceptIds.some((id) => id === concept.id || !conceptMap.has(id))) {
    addCourseFinding(
      findings,
      "error",
      "invalid-concept-contrast",
      "Concept contrast references must identify a different known semantic concept.",
      contrastConceptIds.join(", "),
      fakeChapter,
      fakeLesson
    );
  }
  const escapedDutch = escapeRegExp(concept.dutch);
  const exampleUsesFiniteHomograph = escapedDutch
    && new RegExp(`\\b(?:ik|jij|u|hij|zij|wij)\\s+${escapedDutch}\\b`, "i").test(text(concept.exampleDutch));
  const aliasAddsFiniteUrduSense = translationAliases.some((alias) => (
    /(?:کرتا|کرتی|کرتے|ہوں|ہو|ہے|ہیں|رہا|رہی|رہے)/u.test(alias)
  ));
  if (
    exampleUsesFiniteHomograph
    && aliasAddsFiniteUrduSense
    && !/(?:کرتا|کرتی|کرتے|ہوں|ہو|ہے|ہیں|رہا|رہی|رہے)/u.test(text(concept.urdu))
  ) {
    addCourseFinding(
      findings,
      "error",
      "conflated-concept-sense",
      "One concept record mixes a noun/basic meaning with a finite-verb sense; create separate stable semantic records.",
      `${concept.dutch}: ${concept.urdu} / ${translationAliases.join(", ")}`,
      fakeChapter,
      fakeLesson
    );
  }
  const dutchTarget = normalizeSemantic(concept.dutch);
  const urduTarget = normalizeSemantic(concept.urdu);
  const dutchExampleIsBare = normalizeDutchExample(concept.exampleDutch) === dutchTarget;
  const urduExampleIsBare = normalizeUrduExample(concept.exampleUrdu) === urduTarget;
  const genericUrduContext = (value) => (
    /اس\s+موضوع\s+میں\s+Nederlands\s+لفظ/u.test(text(value))
    || /اس\s+مقصد\s+کے\s+لیے/u.test(text(value))
    || /مثال\s+میں\s+لفظوں\s+کی\s+یہی\s+جگہ/u.test(text(value))
  );
  const specificUrduContext = [concept.exampleUrdu, concept.usageUrdu].some((value) => {
    const normalizedValue = normalizeUrduExample(value);
    return hasUrdu(value)
      && normalizedValue !== urduTarget
      && normalizedValue.length >= Math.max(10, urduTarget.length + 5)
      && !genericUrduContext(value);
  });
  const targetOnlySupport = Boolean(concept.visualId)
    || ["sound", "letter"].includes(text(concept.role).toLowerCase())
    || latinTokens(concept.dutch).length > 1;
  const bareWordExample = text(concept.role).toLowerCase() === "word" && dutchExampleIsBare;
  if (
    bareWordExample
    || (dutchExampleIsBare && (!specificUrduContext || !targetOnlySupport))
    || (urduExampleIsBare && !dutchExampleIsBare)
  ) {
    addCourseFinding(
      findings,
      "error",
      "trivial-concept-example",
      "A normal word needs a natural owned phrase, sentence, contrast, or authentic micro-utterance; a target-only label and visual/meta Urdu are not the required useful example.",
      `${concept.exampleDutch} / ${concept.exampleUrdu}`,
      fakeChapter,
      fakeLesson
    );
  }
  if (hasMalformedPunctuation(concept.exampleDutch) || hasMalformedPunctuation(concept.exampleUrdu)) {
    addCourseFinding(
      findings,
      "error",
      "malformed-concept-example",
      "Concept example contains repeated or malformed punctuation.",
      `${concept.exampleDutch} / ${concept.exampleUrdu}`,
      fakeChapter,
      fakeLesson
    );
  }
  if (
    /[—–-]\s*(?:goed|ja)\s*[.!?]*$/i.test(text(concept.exampleDutch))
    && !isDutchYesNoQuestion(concept.dutch)
  ) {
    addCourseFinding(
      findings,
      "error",
      "invalid-pseudo-dialogue",
      "A statement or word cannot become a useful example merely by adding a generic goed/ja response.",
      `${concept.dutch} => ${concept.exampleDutch}`,
      fakeChapter,
      fakeLesson
    );
  }
  const confusion = text(concept.commonConfusionUrdu);
  if (
    /معنی\s+اور\s+آواز\s+ساتھ\s+یاد\s+رکھیں/u.test(confusion)
    || /کا\s+مطلب\s+.+ہے[؛;]\s*اسے\s+.+نہ\s+سمجھیں/u.test(confusion)
    || /کو\s+پورا\s+فقرہ\s+سمجھ\s+کر.+الفاظ\s+کی\s+ترتیب\s+نہ\s+بدلیں/u.test(confusion)
    || /پہلے\s+معنی\s+پہچانیں[،,]?\s*پھر/u.test(confusion)
    || /سبق\s+کا\s+اہم\s+فرق/u.test(confusion)
    || /میں\s+.+آغاز\s+اور\s+.+آخر\s+میں\s+ہے[؛;].+اردو\s+کی\s+ترتیب/u.test(confusion)
    || /مثال\s+میں\s+لفظوں\s+کی\s+یہی\s+جگہ/u.test(confusion)
    || /عام\s+غلطی\s+یہ\s+ہے\s+کہ.+موقع\s+دیکھے\s+بغیر\s+ہر/u.test(confusion)
  ) {
    addCourseFinding(
      findings,
      "error",
      "boilerplate-concept-confusion",
      "Concept common confusion is a generic template rather than a genuine learner contrast or mistake.",
      confusion,
      fakeChapter,
      fakeLesson
    );
  }
  const labelValueMatch = text(concept.exampleDutch).match(/^\s*([^:：]+)\s*[:：]\s*(.+)\s*$/u);
  if (labelValueMatch) {
    const label = normalizeSemantic(labelValueMatch[1]);
    const value = normalizeSemantic(labelValueMatch[2]);
    const numberTargets = new Set([
      "nul", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht",
      "negen", "tien", "elf", "twaalf", "dertien", "veertien", "vijftien",
      "zestien", "zeventien", "achttien", "negentien", "twintig"
    ]);
    const arbitraryCounter = value === "1" && !numberTargets.has(dutchTarget);
    const arbitraryLocation = new Set([
      "ingang", "uitgang", "links", "rechts", "rechtdoor", "halte", "station"
    ]).has(dutchTarget) && /^(?:amsterdam|rotterdam|utrecht|nederland)$/i.test(value);
    const timeMatch = text(labelValueMatch[2]).match(/^(\d{1,2})[.:\s](\d{2})$/);
    const timeOfDayMismatch = timeMatch && (
      (dutchTarget === "middag" && Number(timeMatch[1]) < 12)
      || (dutchTarget === "avond" && Number(timeMatch[1]) < 18)
      || (dutchTarget === "nacht" && Number(timeMatch[1]) >= 6)
    );
    if (label === dutchTarget && (arbitraryCounter || arbitraryLocation || timeOfDayMismatch)) {
      addCourseFinding(
        findings,
        "error",
        "arbitrary-label-example",
        "Concept example pairs a fixed label with an arbitrary or contradictory value instead of showing real usage.",
        concept.exampleDutch,
        fakeChapter,
        fakeLesson
      );
    }
  }
  const whDialogue = text(concept.exampleDutch).match(
    /^\s*((?:wat|waar|wie|wanneer|waarom|hoe|welk(?:e)?|op\s+welk(?:e)?)\b[^—–-]*[?])\s*[—–-]\s*(.+)\s*$/i
  );
  if (whDialogue) {
    const questionText = normalizeSemantic(whDialogue[1]);
    const responseText = normalizeSemantic(whDialogue[2]);
    const genericNonAnswer = /^(?:ja|nee|ik weet het niet|mijn naam is|mijn naam|mijn nummer is)$/i.test(responseText);
    const domainMismatch = (
      (questionText.includes("betalingskenmerk") && !/\d|kenmerk|referentie/i.test(responseText))
      || (/\bwelke bus\b/i.test(questionText) && !/\bbus\b|\blijn\b|\d/i.test(responseText))
      || (questionText.includes("adres") && !/\d|straat|laan|weg|plein|adres/i.test(responseText))
      || (/\bhoe laat\b|\bwanneer\b/i.test(questionText) && !/\d|uur|vandaag|morgen|gisteren|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag/i.test(responseText))
      || (/\bhoeveel\b/i.test(questionText) && !/\d|euro|uur|keer/i.test(responseText))
    );
    if (genericNonAnswer || domainMismatch) {
      addCourseFinding(
        findings,
        "error",
        "non-answer-concept-example",
        "A wh-question example needs a plausible answer of the requested kind.",
        concept.exampleDutch,
        fakeChapter,
        fakeLesson
      );
    }
  }
  const greetingIsTopical = /greet|courtesy|personal|introduc|ik-jij-u/i.test(fakeLesson.id);
  const greetingIsSuspicious = /health|doctor|housing|complaint|bill|bank|work|school|past|perfect|future|transport|shopping|form|gemeente/i.test(fakeLesson.id);
  if (
    /^\s*hallo\s*[,،]/i.test(text(concept.exampleDutch))
    && dutchTarget !== "hallo"
    && !greetingIsTopical
    && greetingIsSuspicious
  ) {
    addCourseFinding(
      findings,
      "error",
      "topical-drift-example",
      "Adding a generic greeting does not create a relevant example for this target.",
      concept.exampleDutch,
      fakeChapter,
      fakeLesson
    );
  }
  if (!list(concept.lessonIds).length || list(concept.lessonIds).some((id) => !lessonMap.has(id))) {
    addCourseFinding(findings, "error", "concept-lesson-reference", "Concept must reference known lessonIds.", list(concept.lessonIds).join(", "), fakeChapter, fakeLesson);
  }
  if (!list(concept.chapterIds).length || list(concept.chapterIds).some((id) => !chapterMap.has(id))) {
    addCourseFinding(findings, "error", "concept-chapter-reference", "Concept must reference known chapterIds.", list(concept.chapterIds).join(", "), fakeChapter, fakeLesson);
  }
  if (concept.visualId && !visualIds.has(concept.visualId)) {
    addCourseFinding(findings, "error", "concept-visual-reference", "Concept visualId is not present in the approved visual library.", concept.visualId, fakeChapter, fakeLesson);
  }
}

function auditV4Pattern(findings, pattern, lessonMap, chapterMap, skillMap) {
  const chapter = chapterMap.get(pattern.chapterId) || { id: pattern.chapterId || "course" };
  const lesson = lessonMap.get(pattern.lessonId) || {
    id: pattern.lessonId || "",
    title: pattern.titleUrdu || pattern.id
  };
  const required = [
    ["titleUrdu", hasUrdu(pattern.titleUrdu)],
    ["modelDutch", hasLatin(pattern.modelDutch)],
    ["modelUrdu", hasUrdu(pattern.modelUrdu)],
    ["highlight", hasLatin(pattern.highlight)],
    ["explanationUrdu", hasUrdu(pattern.explanationUrdu)],
    ["contrastUrdu", hasUrdu(pattern.contrastUrdu)],
    ["commonMistakeUrdu", hasUrdu(pattern.commonMistakeUrdu)],
    ["audioText", hasLatin(pattern.audioText)]
  ];
  for (const [field, valid] of required) {
    if (!valid) {
      addCourseFinding(
        findings,
        "error",
        "incomplete-pattern",
        `Pattern ${pattern.id || "(missing id)"} is missing ${field}.`,
        "",
        chapter,
        lesson
      );
    }
  }
  if (!chapterMap.has(pattern.chapterId) || !lessonMap.has(pattern.lessonId)) {
    addCourseFinding(findings, "error", "pattern-owner", "Pattern must identify a known chapter and normal lesson.", `${pattern.chapterId} / ${pattern.lessonId}`, chapter, lesson);
  }
  if (!pattern.skillId || !skillMap.has(pattern.skillId)) {
    addCourseFinding(findings, "error", "pattern-skill-reference", "Pattern must reference its registered skill.", pattern.skillId || "", chapter, lesson);
  }
  const model = normalizeSemantic(pattern.modelDutch);
  const modelTokens = latinTokens(pattern.modelDutch);
  const completeTwoWordPredicate = modelTokens.length === 2
    && /^(?:regent|sneeuwt|waait|werkt|slaapt|komt|gaat|woont|begint|stopt)$/i.test(modelTokens[1]);
  if (modelTokens.length < 3 && !completeTwoWordPredicate) {
    addCourseFinding(findings, "error", "pattern-model-sentence", "Grammar/pattern teaching needs a complete useful real-life model sentence, not a bare label or fragment.", pattern.modelDutch, chapter, lesson);
  }
  const highlightedTokens = latinTokens(pattern.highlight);
  if (highlightedTokens.length && highlightedTokens.some((token) => !latinTokens(model).includes(token))) {
    addCourseFinding(findings, "error", "pattern-highlight", "Pattern highlight must identify words visible in the model sentence.", pattern.highlight, chapter, lesson);
  }
  const explanation = normalizeSemantic(pattern.explanationUrdu);
  const contrast = normalizeSemantic(pattern.contrastUrdu);
  const mistake = normalizeSemantic(pattern.commonMistakeUrdu);
  if (explanation && (explanation === contrast || explanation === mistake || contrast === mistake)) {
    addCourseFinding(findings, "error", "pattern-teaching-distinction", "Pattern explanation, contrast, and common mistake must teach three distinct ideas.", "", chapter, lesson);
  }
  if (
    /یہ\s+جملے\s+روزمرہ\s+میں\s+پورے\s+فقروں\s+کی\s+طرح\s+یاد\s+کریں/u.test(text(pattern.commonMistakeUrdu))
    || /پہلے\s+سنیں[،,]?\s*پھر\s+پورا\s+فقرہ\s+ایک\s+ساتھ\s+پہچانیں/u.test(text(pattern.commonMistakeUrdu))
  ) {
    addCourseFinding(findings, "error", "generic-pattern-mistake", "Pattern common mistake must name a real contrast or likely error, not give generic study advice.", pattern.commonMistakeUrdu, chapter, lesson);
  }
}

function auditV4Skill(findings, skill, conceptMap, patternMap, lessonMap, chapterMap) {
  const chapter = chapterMap.get(skill.chapterId) || { id: skill.chapterId || "course" };
  const lesson = lessonMap.get(skill.introducedInLessonId) || { id: skill.introducedInLessonId || "", title: skill.labelUrdu || skill.id };
  if (!hasUrdu(skill.labelUrdu) || !hasUrdu(skill.canDoUrdu)) {
    addCourseFinding(findings, "error", "incomplete-skill", "Skill needs an Urdu label and can-do outcome.", "", chapter, lesson);
  }
  if (skill.conceptId && !conceptMap.has(skill.conceptId)) {
    addCourseFinding(findings, "error", "skill-concept-reference", "Skill references an unknown concept.", skill.conceptId, chapter, lesson);
  }
  if (skill.patternId && !patternMap.has(skill.patternId)) {
    addCourseFinding(findings, "error", "skill-pattern-reference", "Skill references an unknown pattern.", skill.patternId, chapter, lesson);
  }
  if (!skill.conceptId && !skill.patternId) {
    addCourseFinding(findings, "error", "skill-owner", "Skill must belong to a concept or pattern.", "", chapter, lesson);
  }
  if (!chapterMap.has(skill.chapterId) || !lessonMap.has(skill.introducedInLessonId)) {
    addCourseFinding(findings, "error", "skill-introduction-reference", "Skill must identify its chapter and introduction lesson.", `${skill.chapterId} / ${skill.introducedInLessonId}`, chapter, lesson);
  }
  if (
    !list(skill.evidenceTypes).length
    || list(skill.evidenceTypes).some((type) => !completionSkillAreas.includes(type))
  ) {
    addCourseFinding(findings, "error", "skill-evidence", "Skill evidenceTypes must use the chapter completion skill areas.", list(skill.evidenceTypes).join(", "), chapter, lesson);
  }
  if (!sameIds(list(skill.masteryStates), masteryStates)) {
    addCourseFinding(findings, "error", "skill-mastery-states", "Skill masteryStates must be introduced, practiced, secure in order.", list(skill.masteryStates).join(", "), chapter, lesson);
  }
}

function auditV4Chapter(
  findings,
  chapter,
  unitMap,
  lessonMap,
  missionMap,
  conceptMap,
  skillMap,
  patternMap,
  chapterPositionMap,
  lessonPositionMap
) {
  const contract = chapter.contract || {};
  const outcome = text(contract.outcomeUrdu || chapter.outcomeUrdu);
  auditRequiredChapterTopics(
    findings,
    chapter,
    lessonMap,
    conceptMap,
    patternMap,
    lessonPositionMap
  );
  if (!hasUrdu(outcome)) {
    addCourseFinding(findings, "error", "chapter-outcome", "Chapter contract needs a practical Urdu outcome.", "", chapter);
  }
  if (!Array.isArray(contract.prerequisiteChapterIds) || !Array.isArray(contract.prerequisiteSkillIds)) {
    addCourseFinding(findings, "error", "chapter-prerequisites", "Chapter contract must explicitly declare chapter and skill prerequisites.", "", chapter);
  }
  const invalidPrerequisiteChapters = list(contract.prerequisiteChapterIds).filter((id) => (
    !chapterPositionMap.has(id)
    || id === chapter.id
    || chapterPositionMap.get(id) >= chapterPositionMap.get(chapter.id)
  ));
  if (invalidPrerequisiteChapters.length) {
    addCourseFinding(findings, "error", "chapter-prerequisite-order", "Chapter prerequisites must name known earlier chapters only.", invalidPrerequisiteChapters.join(", "), chapter);
  }
  const invalidPrerequisiteSkills = list(contract.prerequisiteSkillIds).filter((id) => {
    const skill = skillMap.get(id);
    return !skill
      || !lessonPositionMap.has(skill.introducedInLessonId)
      || !chapterPositionMap.has(skill.chapterId)
      || chapterPositionMap.get(skill.chapterId) >= chapterPositionMap.get(chapter.id);
  });
  if (invalidPrerequisiteSkills.length) {
    addCourseFinding(findings, "error", "chapter-prerequisite-skills", "Chapter prerequisite skills must be known and introduced in an earlier chapter.", invalidPrerequisiteSkills.join(", "), chapter);
  }
  if (!list(contract.newConceptIds).length || list(contract.newConceptIds).some((id) => !conceptMap.has(id))) {
    addCourseFinding(findings, "error", "chapter-new-concepts", "Chapter contract must list its known new concepts.", list(contract.newConceptIds).join(", "), chapter);
  }
  if (!Array.isArray(contract.patternIds) || list(contract.patternIds).some((id) => !patternMap.has(id))) {
    addCourseFinding(findings, "error", "chapter-patterns", "Chapter contract must explicitly list its patterns.", list(contract.patternIds).join(", "), chapter);
  }
  if (!list(contract.dependencyMap).length) {
    addCourseFinding(findings, "error", "chapter-dependency-map", "Chapter contract needs a lesson dependency map.", "", chapter);
  } else {
    const dependencies = new Map(list(contract.dependencyMap).map((entry) => [entry.lessonId, entry]));
    for (const lessonId of list(chapter.lessonIds)) {
      const entry = dependencies.get(lessonId);
      if (!entry || !Array.isArray(entry.prerequisiteLessonIds) || !Array.isArray(entry.prerequisiteSkillIds)) {
        addCourseFinding(findings, "error", "chapter-dependency-entry", "Every normal lesson needs an explicit dependency entry.", lessonId, chapter, lessonMap.get(lessonId));
        continue;
      }
      const invalidLessonDependencies = list(entry.prerequisiteLessonIds).filter((id) => (
        !lessonMap.has(id)
        || id === lessonId
        || !isEarlierLesson(id, lessonId, lessonPositionMap)
      ));
      const invalidSkillDependencies = list(entry.prerequisiteSkillIds).filter((id) => {
        const skill = skillMap.get(id);
        return !skill
          || skill.introducedInLessonId === lessonId
          || !isEarlierLesson(skill.introducedInLessonId, lessonId, lessonPositionMap);
      });
      if (entry.lessonId !== lessonId || invalidLessonDependencies.length || invalidSkillDependencies.length) {
        addCourseFinding(
          findings,
          "error",
          "chapter-dependency-order",
          "Dependency entries may reference known earlier lessons and skills only.",
          `${invalidLessonDependencies.join(", ")} / ${invalidSkillDependencies.join(", ")}`,
          chapter,
          lessonMap.get(lessonId)
        );
      }
    }
  }
  if (!sameIds(list(contract.completionSkillAreas), completionSkillAreas)) {
    addCourseFinding(findings, "error", "chapter-completion-areas", "Chapter completion must cover meaning, listening, reading, speaking support, and practical use.", list(contract.completionSkillAreas).join(", "), chapter);
  }
  const completionMission = missionMap.get(contract.completionMissionId);
  if (!completionMission || completionMission.completionCheck !== true) {
    addCourseFinding(
      findings,
      "error",
      "chapter-completion-mission",
      "Chapter contract must identify one real completion-check mission.",
      contract.completionMissionId || "",
      chapter,
      completionMission
    );
  } else {
    if (!sameIds(list(completionMission.completionSkillAreas), completionSkillAreas)) {
      addCourseFinding(
        findings,
        "error",
        "completion-mission-areas",
        "Completion mission must declare the same five skill areas as the chapter contract.",
        list(completionMission.completionSkillAreas).join(", "),
        chapter,
        completionMission
      );
    }
    const requiredUnitMissionIds = list(chapter.unitIds).flatMap((unitId) => (
      list(unitMap.get(unitId)?.capstoneMissionIds)
    ));
    const separateChapterCompletion = !requiredUnitMissionIds.includes(completionMission.id);
    if (
      separateChapterCompletion
      && !sameIds(list(completionMission.prerequisiteMissionIds), requiredUnitMissionIds)
    ) {
      addCourseFinding(
        findings,
        "error",
        "completion-mission-prerequisites",
        "Chapter completion must require every unit capstone mission in chapter order.",
        list(completionMission.prerequisiteMissionIds).join(", "),
        chapter,
        completionMission
      );
    }
    const evidenceByArea = {
      meaning: (question) => ["meaning", "reverse", "image-choice"].includes(question.type),
      listening: (question) => question.type === "listen-choice",
      reading: (question) => question.type === "document-choice",
      "speaking-support": (question) => question.type === "speak-repeat" && question.scored === false,
      "practical-use": (question) => (
        question.phase === "use"
        && ["situation", "build", "sequence", "short-input", "fill-gap"].includes(question.type)
      )
    };
    for (const variant of list(completionMission.variants)) {
      const questions = list(variant.questions);
      const missingAreas = completionSkillAreas.filter((area) => (
        !questions.some((question) => evidenceByArea[area]?.(question))
      ));
      if (missingAreas.length) {
        addCourseFinding(
          findings,
          "error",
          "completion-mission-evidence",
          "Every completion variant must materialize meaning, listening, reading, unscored speaking support, and practical-use evidence.",
          `${variant.id}: ${missingAreas.join(", ")}`,
          chapter,
          completionMission
        );
      }
    }
    const representedUnitIds = new Set(
      list(completionMission.assessmentSkillIds)
        .map((skillId) => skillMap.get(skillId))
        .map((skill) => lessonMap.get(skill?.introducedInLessonId)?.unitId)
        .filter(Boolean)
    );
    const missingUnitIds = list(chapter.unitIds).filter((unitId) => !representedUnitIds.has(unitId));
    if (missingUnitIds.length) {
      addCourseFinding(
        findings,
        "error",
        "completion-unit-coverage",
        "Chapter completion must sample at least one representative assessed skill from every chapter unit.",
        missingUnitIds.join(", "),
        chapter,
        completionMission
      );
    }
  }
  if (contract.reviewPolicy !== "adaptive-skill-review") {
    addCourseFinding(findings, "error", "chapter-review-policy", "Chapter review policy must be adaptive-skill-review.", contract.reviewPolicy || "", chapter);
  }
  for (const [field, map] of [["unitIds", unitMap], ["lessonIds", lessonMap], ["missionIds", missionMap]]) {
    if (!Array.isArray(chapter[field]) || list(chapter[field]).some((id) => !map.has(id))) {
      addCourseFinding(findings, "error", "chapter-reference", `Chapter ${field} must contain known ids.`, list(chapter[field]).join(", "), chapter);
    }
  }
  if (chapter.id === "a1" || chapter.id === "a2") {
    for (const unitId of list(chapter.unitIds)) {
      const unit = unitMap.get(unitId);
      const unitDocuments = list(unit?.lessonIds)
        .map((lessonId) => lessonMap.get(lessonId))
        .filter(Boolean)
        .flatMap(getSelectedLessonQuestions)
        .filter((question) => question.type === "document-choice");
      if (!unitDocuments.length) {
        addCourseFinding(
          findings,
          "error",
          "unit-document-reading",
          `${chapter.id.toUpperCase()} units must include an actual selected form, notice, message, or other practical reading task.`,
          unitId,
          chapter
        );
      }
    }
  }
}

function auditV4Run(
  findings,
  chapter,
  lesson,
  run,
  questionMap,
  teachingBlockMap,
  conceptMap,
  skillMap,
  earlierRunConceptIds = []
) {
  const level = chapter.id;
  const newConceptIds = list(run.newConceptIds);
  const conceptCap = level === "a1" ? 5 : level === "a2" ? 4 : run.patternId ? 3 : 4;
  if (!text(run.outcomeUrdu) || !hasUrdu(run.outcomeUrdu)) {
    addCourseFinding(findings, "error", "run-outcome", "Learning run needs one practical Urdu outcome.", "", chapter, lesson);
  }
  if (newConceptIds.length > conceptCap) {
    addCourseFinding(findings, "error", "new-material-cap", `Run exceeds the ${level.toUpperCase()} new-material cap of ${conceptCap}.`, `${run.id}: ${newConceptIds.join(", ")}`, chapter, lesson);
  }
  if (list(run.conceptIds).some((id) => !conceptMap.has(id)) || list(run.skillIds).some((id) => !skillMap.has(id))) {
    addCourseFinding(findings, "error", "run-ownership", "Run references unknown concepts or skills.", run.id, chapter, lesson);
  }
  if (run.patternId && lesson.pattern?.id !== run.patternId) {
    addCourseFinding(findings, "error", "run-pattern", "Run patternId must match the lesson pattern.", run.patternId, chapter, lesson);
  }
  if (list(run.teachingBlockIds).some((id) => !teachingBlockMap.has(id))) {
    addCourseFinding(findings, "error", "run-teaching-reference", "Run references an unknown teaching block.", list(run.teachingBlockIds).join(", "), chapter, lesson);
  }

  const phases = run.phases || {};
  const phaseSpecs = [
    ["understand", "understand"],
    ["guidedPractice", "guided-practice"],
    ["use", "use"],
    ["independentCheck", "independent-check"]
  ];
  const learnBlockIds = list(phases.learn?.teachingBlockIds);
  if (!learnBlockIds.length || list(run.teachingBlockIds).some((id) => !learnBlockIds.includes(id))) {
    addCourseFinding(findings, "error", "run-learn-phase", "Learn phase must include every run teaching block.", run.id, chapter, lesson);
  }
  if (phases.correction?.mode !== "retry-missed" || phases.correction?.required !== true) {
    addCourseFinding(findings, "error", "run-correction", "Correction phase must require retry-missed.", run.id, chapter, lesson);
  }

  const exerciseIdsByPhase = new Map();
  const declaredQuestionsByPhase = new Map();
  const allExerciseIds = [];
  for (const [phaseKey, canonicalPhase] of phaseSpecs) {
    const exerciseIds = list(phases[phaseKey]?.exerciseIds);
    exerciseIdsByPhase.set(canonicalPhase, exerciseIds);
    allExerciseIds.push(...exerciseIds);
    const declaredQuestions = [];
    for (const exerciseId of exerciseIds) {
      const question = questionMap.get(exerciseId);
      if (!question) {
        addCourseFinding(findings, "error", "run-exercise-reference", "Run references an unknown exercise.", exerciseId, chapter, lesson);
      } else if (question.phase !== canonicalPhase) {
        addCourseFinding(findings, "error", "run-exercise-phase", "Exercise phase does not match its run phase.", `${exerciseId}: ${question.phase} != ${canonicalPhase}`, chapter, lesson, question);
      } else {
        const conceptsAllowed = list(question.conceptIds).every((id) => list(run.conceptIds).includes(id));
        const skillsAllowed = list(question.skillIds).every((id) => list(run.skillIds).includes(id));
        if (!conceptsAllowed || !skillsAllowed) {
          addCourseFinding(
            findings,
            "error",
            "run-exercise-ownership",
            "Configured exercise conceptIds and skillIds must stay inside the learning run.",
            exerciseId,
            chapter,
            lesson,
            question
          );
        } else {
          declaredQuestions.push(question);
        }
      }
    }
    declaredQuestionsByPhase.set(canonicalPhase, declaredQuestions);
  }
  const duplicateExerciseIds = findDuplicates(allExerciseIds);
  if (duplicateExerciseIds.length) {
    addCourseFinding(findings, "error", "duplicate-run-exercise", "An exercise is assigned to more than one run phase.", [...new Set(duplicateExerciseIds)].join(", "), chapter, lesson);
  }

  const skillIdsForConcept = (conceptId) => [...skillMap.values()]
    .filter((skill) => skill.conceptId === conceptId && list(run.skillIds).includes(skill.id))
    .map((skill) => skill.id);
  const syntheticQuestion = (phase, type, conceptId = "", skillIds = []) => {
    const concept = conceptMap.get(conceptId);
    const dutch = concept?.dutch || lesson.pattern?.modelDutch || "";
    const urdu = concept?.urdu || lesson.pattern?.modelUrdu || "";
    const reverse = type === "reverse" || type === "situation";
    const runConcepts = list(run.conceptIds).map((id) => conceptMap.get(id)).filter(Boolean);
    return {
      id: `${run.id}:generated:${phase}:${conceptId || type}`,
      type,
      phase,
      generatedByLearningContract: true,
      conceptIds: conceptId ? [conceptId] : list(run.conceptIds),
      skillIds,
      instructionUrdu: phase === "understand"
        ? `مثال دیکھنے کے بعد “${dutch}” کا درست مطلب منتخب کریں۔`
        : phase === "independent-check"
          ? `بغیر خودکار مدد کے “${reverse ? urdu : dutch}” کا درست جواب منتخب کریں۔`
          : `مدد کے ساتھ “${urdu}” کے لیے درست Nederlands منتخب کریں۔`,
      prompt: reverse ? urdu : dutch,
      options: [...new Set(runConcepts.map((record) => reverse ? record.dutch : record.urdu).filter(Boolean))],
      answer: reverse ? dutch : urdu,
      hintUrdu: `${dutch} = ${urdu}۔`,
      explainCorrectUrdu: `${dutch} کا مطلب ${urdu} ہے۔`,
      explainWrongUrdu: type === "meaning"
        ? `${dutch} = ${urdu}۔ مثال دوبارہ ذہن میں لائیں۔`
        : `صحیح Nederlands ${dutch} ہے؛ اس کی آواز دوبارہ سنیں۔`
    };
  };
  const newIds = newConceptIds.length ? newConceptIds : list(run.conceptIds);
  const practiceIds = newIds.length ? newIds : list(run.conceptIds);
  const materialized = new Map(
    [...declaredQuestionsByPhase].map(([phase, questions]) => [phase, [...questions]])
  );

  const understand = materialized.get("understand") || [];
  const taskDemonstration = understand[0];
  if (
    !taskDemonstration
    || taskDemonstration.taskDemonstration !== true
    || taskDemonstration.scored !== false
    || !text(taskDemonstration.demonstratesType)
    || !hasUrdu(taskDemonstration.instructionUrdu || taskDemonstration.instruction)
  ) {
    addCourseFinding(
      findings,
      "error",
      "understand-task-demonstration",
      "Understand must begin with an unscored Urdu task demonstration before the learner answers that format.",
      run.id,
      chapter,
      lesson,
      taskDemonstration
    );
  }
  const understoodConceptsBeforeFallback = new Set(understand.flatMap((question) => list(question.conceptIds)));
  for (const conceptId of newIds) {
    if (!understoodConceptsBeforeFallback.has(conceptId)) {
      understand.push(syntheticQuestion("understand", "meaning", conceptId, skillIdsForConcept(conceptId)));
    }
  }
  materialized.set("understand", understand);

  const guided = materialized.get("guided-practice") || [];
  if (!guided.length) {
    for (const conceptId of practiceIds) {
      guided.push(syntheticQuestion("guided-practice", "reverse", conceptId, skillIdsForConcept(conceptId)));
    }
  }
  materialized.set("guided-practice", guided);

  const use = materialized.get("use") || [];
  if (!use.length) {
    for (const conceptId of practiceIds.slice(0, Math.min(2, practiceIds.length))) {
      use.push(syntheticQuestion("use", "situation", conceptId, skillIdsForConcept(conceptId)));
    }
  }
  materialized.set("use", use);

  const check = materialized.get("independent-check") || [];
  let generatedIndex = 0;
  while (check.length < 4 && practiceIds.length && generatedIndex <= 20) {
    const conceptId = practiceIds[generatedIndex % practiceIds.length];
    check.push(syntheticQuestion(
      "independent-check",
      generatedIndex % 2 === 0 ? "meaning" : "reverse",
      conceptId,
      skillIdsForConcept(conceptId)
    ));
    generatedIndex += 1;
  }
  while (check.length < 4 && run.patternId) {
    const patternSkillIds = [...skillMap.values()]
      .filter((skill) => skill.patternId === run.patternId && list(run.skillIds).includes(skill.id))
      .map((skill) => skill.id);
    check.push(syntheticQuestion("independent-check", "meaning", "", patternSkillIds));
  }
  materialized.set("independent-check", check);

  const materializedCheck = materialized.get("independent-check");
  if (materializedCheck.length < 4 || materializedCheck.length > 6) {
    addCourseFinding(findings, "error", "independent-check-size", "Generated Independent Check must contain four to six exercises.", `${run.id}: ${materializedCheck.length}`, chapter, lesson);
  }
  if (
    Number(phases.independentCheck?.minimumScore) !== 0.8
    || phases.independentCheck?.automaticHints !== false
  ) {
    addCourseFinding(findings, "error", "independent-check-contract", "Independent Check must use 80 percent and disable automatic hints.", `${phases.independentCheck?.minimumScore} / ${phases.independentCheck?.automaticHints}`, chapter, lesson);
  }
  const checkSkills = new Set(materializedCheck.flatMap((question) => list(question.skillIds)));
  const missingCheckSkills = list(run.skillIds).filter((id) => !checkSkills.has(id));
  if (missingCheckSkills.length) {
    addCourseFinding(findings, "error", "independent-check-coverage", "Independent Check does not cover every run skill.", missingCheckSkills.join(", "), chapter, lesson);
  }

  const practicedSkills = new Set(
    ["guided-practice", "use"]
      .flatMap((phase) => materialized.get(phase) || [])
      .filter((question) => question && question.scored !== false && !unscoredTypes.has(question.type))
      .flatMap((question) => list(question.skillIds))
  );
  const missingPracticeSkills = list(run.skillIds).filter((id) => !practicedSkills.has(id));
  if (missingPracticeSkills.length) {
    addCourseFinding(
      findings,
      "error",
      "guided-use-skill-coverage",
      "Every run skill needs correctable Guided Practice or Use evidence before it can become practiced.",
      missingPracticeSkills.join(", "),
      chapter,
      lesson
    );
  }

  const recognisedSkills = new Set(understand.flatMap((question) => list(question.skillIds)));
  const understoodConcepts = new Set(understand.flatMap((question) => list(question.conceptIds)));
  const missingRecognition = newConceptIds.filter((id) => !understoodConcepts.has(id));
  if (missingRecognition.length) {
    addCourseFinding(findings, "error", "concept-recognition", "Every new concept needs supported recognition before production.", missingRecognition.join(", "), chapter, lesson);
  }

  const teachingConcepts = new Set(learnBlockIds.map((id) => teachingBlockMap.get(id)?.conceptId).filter(Boolean));
  const missingTeaching = newConceptIds.filter((id) => !teachingConcepts.has(id));
  if (missingTeaching.length) {
    addCourseFinding(findings, "error", "concept-teaching", "Every new concept needs its own Learn teaching block.", missingTeaching.join(", "), chapter, lesson);
  }

  for (const phase of ["guided-practice", "use", "independent-check"]) {
    for (const question of materialized.get(phase) || []) {
      if (!question || !productionTypes.has(question.type)) continue;
      const prerequisiteSkills = list(lesson.prerequisites?.skillIds);
      const unrecognised = list(question.skillIds).filter((id) => (
        !recognisedSkills.has(id) && !prerequisiteSkills.includes(id)
      ));
      if (unrecognised.length) {
        addCourseFinding(findings, "error", "production-before-recognition", "Production exercise uses a skill that was not recognised in Understand.", unrecognised.join(", "), chapter, lesson, question);
      }
    }
  }

  const earlierTypes = new Set(
    ["understand", "guided-practice", "use"]
      .flatMap((phase) => materialized.get(phase) || [])
      .map((question) => question?.type)
      .filter(Boolean)
  );
  const surpriseCheckTypes = materializedCheck
    .filter((question) => question && !earlierTypes.has(question.type))
    .map((question) => question.type);
  if (surpriseCheckTypes.length) {
    addCourseFinding(findings, "error", "new-check-format", "Independent Check introduces an exercise format not practised earlier.", [...new Set(surpriseCheckTypes)].join(", "), chapter, lesson);
  }
  const supportedSignatures = new Set(
    ["understand", "guided-practice", "use"]
      .flatMap((phase) => materialized.get(phase) || [])
      .map(exerciseContentSignature)
  );
  const clonedChecks = materializedCheck.filter((question) => (
    question && supportedSignatures.has(exerciseContentSignature(question))
  ));
  if (clonedChecks.length) {
    addCourseFinding(
      findings,
      "error",
      "independent-check-clone",
      "Independent Check must test the same skill in a fresh item, not copy a supported exercise verbatim.",
      clonedChecks.map((question) => question.id).join(", "),
      chapter,
      lesson
    );
  }
  for (const question of materialized.get("use") || []) {
    auditA1UseScenarioProvenance(findings, chapter, lesson, question);
    const prompt = text(question?.prompt);
    const normalizedAnswer = normalizeSemantic(question?.answer);
    if (
      /اس\s+اردو\s+بات\s+کے\s+لیے\s+صحیح\s+Nederlands\s+منتخب\s+کریں/iu.test(prompt)
      || /(?:پہلے|اسی)\s+سیکھی\s+ہوئی\s+بات/u.test(prompt)
      || /اس\s+مقصد\s+کے\s+لیے/u.test(prompt)
      || /روزمرہ\s+گفتگو\s+میں.+کے\s+مطابق\s+بات\s+کرنی\s+ہے/u.test(prompt)
      || /(?:بتانا\s+یا\s+پوچھنا|کہنا\s+یا\s+پوچھنا|سمجھنا\s+یا\s+پوچھنا|واضح\s+کرنا)\s+ہے/u.test(prompt)
    ) {
      addCourseFinding(findings, "error", "non-situational-use-prompt", "Use needs a believable situation, not a translation or curriculum-meta wrapper.", prompt, chapter, lesson, question);
    }
    if (
      normalizedAnswer
      && hasLatin(question?.answer)
      && normalizeSemantic(prompt).includes(normalizedAnswer)
    ) {
      addCourseFinding(findings, "error", "use-answer-leak", "Use prompt reveals its own Dutch answer.", prompt, chapter, lesson, question);
    }
  }

  const prerequisiteConceptIds = list(lesson.prerequisites?.skillIds)
    .map((id) => skillMap.get(id)?.conceptId)
    .filter(Boolean);
  const allowedConceptIds = new Set([
    ...list(run.conceptIds),
    ...list(earlierRunConceptIds),
    ...prerequisiteConceptIds
  ]);
  for (const conceptId of newConceptIds) {
    const concept = conceptMap.get(conceptId);
    if (!concept) continue;
    auditLexicalOwnership(
      findings,
      chapter,
      lesson,
      {
        id: `${concept.id}:teaching-card`,
        type: "concept-teach",
        prompt: concept.exampleDutch,
        answer: concept.dutch,
        speak: concept.audioText,
        instructionUrdu: `${concept.usageUrdu || ""} ${concept.commonConfusionUrdu || ""}`,
        options: []
      },
      allowedConceptIds,
      conceptMap
    );
  }
  for (const questions of materialized.values()) {
    for (const question of questions) {
      if (question.generatedByLearningContract) {
        auditV4Exercise(findings, chapter, lesson, question, conceptMap, skillMap);
      }
      auditLexicalOwnership(findings, chapter, lesson, question, allowedConceptIds, conceptMap);
    }
  }
}

function auditV4Lesson(findings, chapter, lesson, conceptMap, skillMap, patternMap, lessonMap, lessonPositionMap) {
  if (lesson.reviewKind || lesson.kind === "review" || /-review$/i.test(lesson.id)) {
    addCourseFinding(findings, "error", "review-path-node", "Review lessons must be replaced by adaptive review descriptors.", lesson.id, chapter, lesson);
  }
  if (lesson.kind !== "lesson") {
    addCourseFinding(findings, "error", "normal-lesson-kind", "Normal course lesson must use kind: lesson.", lesson.kind || "", chapter, lesson);
  }
  if (!hasSimpleUrduFirstLabel(lesson.unit)) {
    addCourseFinding(
      findings,
      "error",
      "urdu-first-visible-label",
      "The learner-facing unit label must be simple Urdu about practical use, not a grammar-first or untranslated taxonomy label.",
      lesson.unit || "",
      chapter,
      lesson
    );
  }
  if (!Array.isArray(lesson.exercises)) {
    addCourseFinding(findings, "error", "active-exercise-collection", "A v4 normal lesson must expose its active learner-facing records in exercises.", "", chapter, lesson);
  }
  if (Array.isArray(lesson.questions) && lesson.questions !== lesson.exercises) {
    addCourseFinding(findings, "error", "active-exercise-alias", "During compatibility, lesson.questions may only be the exact alias of lesson.exercises.", "", chapter, lesson);
  }
  const legacyQuestions = getLegacyLessonQuestions(lesson);
  const activeExerciseIds = new Set(getActiveLessonExercises(lesson).map((question) => question.id));
  const leakedLegacyQuestions = legacyQuestions.filter((question) => (
    question.retiredCompatibility !== true
    || question.adaptiveReviewEligible !== false
    || question.runId
    || activeExerciseIds.has(question.id)
  ));
  if (leakedLegacyQuestions.length) {
    addCourseFinding(
      findings,
      "error",
      "retired-exercise-isolation",
      "Retired compatibility exercises must be marked retired, excluded from adaptive review and runs, and absent from the active collection.",
      leakedLegacyQuestions.slice(0, 12).map((question) => question.legacyId || question.id).join(", "),
      chapter,
      lesson
    );
  }
  if (lesson.chapterId !== chapter.id || !lesson.unitId || !hasUrdu(lesson.outcomeUrdu)) {
    addCourseFinding(findings, "error", "lesson-contract", "Lesson needs chapterId, unitId, and a practical Urdu outcome.", `${lesson.chapterId} / ${lesson.unitId}`, chapter, lesson);
  }
  auditOutcomeTargetConsistency(findings, chapter, lesson, conceptMap, skillMap);
  if (
    !lesson.prerequisites
    || !Array.isArray(lesson.prerequisites.lessonIds)
    || !Array.isArray(lesson.prerequisites.skillIds)
    || lesson.prerequisites.recommended !== true
  ) {
    addCourseFinding(findings, "error", "lesson-prerequisites", "Lesson prerequisites must explicitly list lessons and skills and remain recommended.", "", chapter, lesson);
  } else {
    const invalidLessonPrerequisites = list(lesson.prerequisites.lessonIds).filter((id) => (
      !lessonMap.has(id)
      || id === lesson.id
      || !isEarlierLesson(id, lesson.id, lessonPositionMap)
    ));
    const invalidSkillPrerequisites = list(lesson.prerequisites.skillIds).filter((id) => {
      const skill = skillMap.get(id);
      return !skill
        || skill.introducedInLessonId === lesson.id
        || !isEarlierLesson(skill.introducedInLessonId, lesson.id, lessonPositionMap);
    });
    if (invalidLessonPrerequisites.length || invalidSkillPrerequisites.length) {
      addCourseFinding(
        findings,
        "error",
        "lesson-prerequisite-order",
        "Lesson prerequisites may reference known earlier lessons and skills only.",
        `${invalidLessonPrerequisites.join(", ")} / ${invalidSkillPrerequisites.join(", ")}`,
        chapter,
        lesson
      );
    }
  }
  for (const field of ["conceptIds", "newConceptIds", "reviewConceptIds"]) {
    if (!Array.isArray(lesson[field]) || list(lesson[field]).some((id) => !conceptMap.has(id))) {
      addCourseFinding(findings, "error", "lesson-concept-reference", `Lesson ${field} must contain known concept ids.`, list(lesson[field]).join(", "), chapter, lesson);
    }
  }
  if (
    !list(lesson.newConceptIds).length
    && !lesson.pattern
    && list(lesson.reviewConceptIds).length
  ) {
    addCourseFinding(findings, "error", "review-only-path-node", "A normal path lesson cannot contain only previously introduced material; route it to adaptive review or a prerequisite refresher.", lesson.id, chapter, lesson);
  }
  if (/checkpoint/i.test(lesson.id)) {
    addCourseFinding(findings, "error", "checkpoint-path-node", "A fixed checkpoint cannot remain as a second completion node beside adaptive review and capstone missions.", lesson.id, chapter, lesson);
  }
  if (
    list(lesson.newConceptIds).length
    && /(?:نئی\s+چیز\s+نہیں|کوئی\s+نئی\s+چیز\s+نہیں)/u.test(JSON.stringify({
      description: lesson.description,
      outcomeUrdu: lesson.outcomeUrdu,
      pattern: lesson.pattern,
      teachingBlocks: lesson.teachingBlocks
    }))
  ) {
    addCourseFinding(findings, "error", "contradictory-new-material-copy", "Lesson copy says there is no new material while the contract introduces new concepts.", list(lesson.newConceptIds).join(", "), chapter, lesson);
  }
  const topicDriftTargets = {
    "a2-separable-verbs-routine": /(?:ik sta om zeven uur op|ik bel de dokter op|wij maken het huis schoon|opstaan|ik sta op in de ochtend)/i,
    "a2-perfect-tense": /(?:ik heb gewerkt|zij heeft gekookt|wij zijn naar de supermarkt gegaan|gewerkt)/i
  };
  const topicDriftPattern = topicDriftTargets[lesson.id];
  const offTopicConcepts = topicDriftPattern
    ? list(lesson.conceptIds).map((id) => conceptMap.get(id)).filter((concept) => topicDriftPattern.test(text(concept?.dutch)))
    : [];
  if (offTopicConcepts.length) {
    addCourseFinding(
      findings,
      "error",
      "practical-topic-drift",
      "Relocated A2 grammar must use examples from the practical unit that owns the lesson.",
      offTopicConcepts.map((concept) => concept.dutch).join(", "),
      chapter,
      lesson
    );
  }
  if (!list(lesson.skillIds).length || list(lesson.skillIds).some((id) => !skillMap.has(id))) {
    addCourseFinding(findings, "error", "lesson-skill-reference", "Lesson must own known skillIds.", list(lesson.skillIds).join(", "), chapter, lesson);
  }
  if (lesson.pattern && !patternMap.has(lesson.pattern.id)) {
    addCourseFinding(findings, "error", "lesson-pattern-reference", "Lesson pattern is missing from the course pattern registry.", lesson.pattern.id, chapter, lesson);
  }

  const teachingBlocks = list(lesson.teachingBlocks);
  const teachingBlockMap = new Map(teachingBlocks.map((block) => [block.id, block]));
  if (!teachingBlocks.length || teachingBlockMap.size !== teachingBlocks.length) {
    addCourseFinding(findings, "error", "lesson-teaching-blocks", "Lesson needs unique teaching blocks.", "", chapter, lesson);
  }
  for (const block of teachingBlocks) {
    const validConcept = block.type === "concept" && conceptMap.has(block.conceptId);
    const validPattern = block.type === "pattern" && patternMap.has(block.patternId);
    if (!block.id || (!validConcept && !validPattern)) {
      addCourseFinding(findings, "error", "teaching-block-owner", "Teaching block must own one known concept or pattern.", block.id || "", chapter, lesson);
    }
  }

  if (!sameIds(list(lesson.learning?.phaseOrder), coursePhaseOrder)) {
    addCourseFinding(findings, "error", "lesson-phase-order", "Lesson learning phaseOrder is not the required curriculum order.", list(lesson.learning?.phaseOrder).join(", "), chapter, lesson);
  }
  if (!Number.isFinite(Number(lesson.learning?.estimatedMinutes)) || Number(lesson.learning?.estimatedMinutes) <= 0) {
    addCourseFinding(findings, "error", "lesson-estimated-time", "Lesson preview needs a positive estimatedMinutes value.", String(lesson.learning?.estimatedMinutes), chapter, lesson);
  }
  const runs = list(lesson.learning?.runs);
  if (!runs.length) {
    addCourseFinding(findings, "error", "lesson-runs", "Normal lesson needs at least one learning run.", "", chapter, lesson);
  }
  if (runs.length > 1) {
    const lessonOutcome = normalizeSemantic(lesson.outcomeUrdu);
    const fullLessonConcepts = new Set(list(lesson.conceptIds));
    const repeatedLessonOutcomeRuns = runs.filter((run) => (
      normalizeSemantic(run.outcomeUrdu) === lessonOutcome
      && list(run.conceptIds).some((id) => !fullLessonConcepts.has(id) || list(run.conceptIds).length < fullLessonConcepts.size)
    ));
    if (repeatedLessonOutcomeRuns.length) {
      addCourseFinding(
        findings,
        "error",
        "run-specific-outcome",
        "A multi-run lesson cannot copy its lesson-wide outcome into a smaller run; preview only what that run teaches.",
        repeatedLessonOutcomeRuns.map((run) => run.id).join(", "),
        chapter,
        lesson
      );
    }
    const outcomes = new Map();
    for (const run of runs) {
      const key = normalizeSemantic(run.outcomeUrdu);
      const prior = outcomes.get(key);
      if (key && prior && !sameIds(list(prior.conceptIds), list(run.conceptIds))) {
        addCourseFinding(
          findings,
          "error",
          "duplicate-run-outcome",
          "Runs with different concepts need different practical preview outcomes.",
          `${prior.id}, ${run.id}`,
          chapter,
          lesson
        );
      } else if (key) {
        outcomes.set(key, run);
      }
    }
  }

  const questionMap = new Map(getActiveLessonExercises(lesson).map((question) => [question.id, question]));
  const prerequisiteConceptIds = list(lesson.prerequisites?.skillIds)
    .map((id) => skillMap.get(id)?.conceptId)
    .filter(Boolean);
  const selectedExerciseIds = new Set(runs.flatMap((run) => {
    const phases = run.phases || {};
    return [
      ...list(phases.understand?.exerciseIds),
      ...list((phases.guidedPractice || phases.guided)?.exerciseIds),
      ...list(phases.use?.exerciseIds),
      ...list((phases.independentCheck || phases.check)?.exerciseIds)
    ];
  }));
  if (chapter.id === "a1" || chapter.id === "a2") {
    const unitPosition = Math.max(0, list(chapter.unitIds).indexOf(lesson.unitId));
    const unitProgress = list(chapter.unitIds).length > 1
      ? unitPosition / (list(chapter.unitIds).length - 1)
      : 0;
    const a2MinimumUnits = unitProgress < 0.34 ? 2 : unitProgress < 0.67 ? 3 : 4;
    const a2MinimumDutchWords = unitProgress < 0.34 ? 6 : unitProgress < 0.67 ? 10 : 14;
    const selectedDocuments = getActiveLessonExercises(lesson).filter((question) => (
      question.type === "document-choice"
      && (selectedExerciseIds.has(question.id) || (question.legacyId && selectedExerciseIds.has(question.legacyId)))
    ));
    for (const question of selectedDocuments) {
      const facts = getDocumentFacts(question);
      const genericKind = !facts.kind || /^(?:document|informatie|info|kaart|card)$/i.test(facts.kind);
      const genericShell = facts.rows.length === 1
        && normalizeSemantic(question.document?.title) === normalizeSemantic("عملی معلومات")
        && normalizeSemantic(facts.rows[0]?.label) === normalizeSemantic("اہم بات");
      const minimumUnits = chapter.id === "a2" ? a2MinimumUnits : 2;
      const minimumDutchWords = chapter.id === "a2" ? a2MinimumDutchWords : 4;
      if (
        genericKind
        || genericShell
        || facts.informationUnits < minimumUnits
        || facts.dutchWordCount < minimumDutchWords
      ) {
        addCourseFinding(
          findings,
          "error",
          "inauthentic-lesson-document",
          chapter.id === "a2"
            ? "A2 reading must use a typed practical document whose fields and Dutch length increase across the chapter."
            : "A1 reading must use a short authentic form, notice, schedule, or message with more than a target-only translation card.",
          `${question.document?.title || ""}; kind=${facts.kind || "missing"}; units=${facts.informationUnits}; Dutch words=${facts.dutchWordCount}; minimum=${minimumUnits}/${minimumDutchWords}`,
          chapter,
          lesson,
          question
        );
      }
    }
  }
  const exerciseAllowedConceptIds = new Map();
  const earlierRunConceptIdsForReview = new Set(prerequisiteConceptIds);
  for (const run of runs) {
    for (const conceptId of list(run.conceptIds)) earlierRunConceptIdsForReview.add(conceptId);
    const phases = run.phases || {};
    const runExerciseIds = [
      ...list(phases.understand?.exerciseIds),
      ...list((phases.guidedPractice || phases.guided)?.exerciseIds),
      ...list(phases.use?.exerciseIds),
      ...list((phases.independentCheck || phases.check)?.exerciseIds)
    ];
    for (const exerciseId of runExerciseIds) {
      const allowed = exerciseAllowedConceptIds.get(exerciseId)
        || new Set(earlierRunConceptIdsForReview);
      exerciseAllowedConceptIds.set(exerciseId, allowed);
    }
  }
  for (const question of getActiveLessonExercises(lesson)) {
    const selectedForRuntime = selectedExerciseIds.has(question.id)
      || (question.legacyId && selectedExerciseIds.has(question.legacyId));
    const eligibleForAdaptiveReview = question.adaptiveReviewEligible === true;
    if (selectedForRuntime || eligibleForAdaptiveReview) {
      auditV4Exercise(findings, chapter, lesson, question, conceptMap, skillMap);
    } else {
      auditV4ExerciseReferences(findings, chapter, lesson, question, conceptMap, skillMap);
    }
    if (eligibleForAdaptiveReview) {
      const reviewAllowedConceptIds = exerciseAllowedConceptIds.get(question.id)
        || exerciseAllowedConceptIds.get(question.legacyId)
        || new Set([...list(question.conceptIds), ...prerequisiteConceptIds]);
      auditLexicalOwnership(
        findings,
        chapter,
        lesson,
        question,
        reviewAllowedConceptIds,
        conceptMap
      );
    }
  }
  const earlierRunConceptIds = new Set();
  for (const run of runs) {
    auditV4Run(
      findings,
      chapter,
      lesson,
      run,
      questionMap,
      teachingBlockMap,
      conceptMap,
      skillMap,
      [...earlierRunConceptIds]
    );
    for (const conceptId of list(run.conceptIds)) earlierRunConceptIds.add(conceptId);
  }
}

function auditV4Mission(findings, chapter, mission, lessonMap, conceptMap, skillMap, lessonPositionMap) {
  if (mission.kind !== "mission" || mission.chapterId !== chapter.id || !mission.unitId || !hasUrdu(mission.outcomeUrdu)) {
    addCourseFinding(findings, "error", "mission-contract", "Mission needs kind, chapterId, unitId, and a practical Urdu outcome.", "", chapter, mission);
  }
  const prerequisiteSkillIds = list(mission.prerequisites?.skillIds);
  const assessmentSkillIds = list(mission.assessmentSkillIds);
  if (
    !mission.prerequisites
    || !Array.isArray(mission.prerequisites.lessonIds)
    || !Array.isArray(mission.prerequisites.skillIds)
    || mission.prerequisites.recommended !== true
  ) {
    addCourseFinding(findings, "error", "mission-prerequisites", "Mission must explicitly declare recommended lesson and skill prerequisites.", "", chapter, mission);
  } else {
    const invalidLessonPrerequisites = list(mission.prerequisites.lessonIds).filter((id) => (
      !lessonMap.has(id)
      || !isEarlierLesson(id, mission.id, lessonPositionMap)
    ));
    const invalidSkillPrerequisites = prerequisiteSkillIds.filter((id) => {
      const skill = skillMap.get(id);
      return !skill || !isEarlierLesson(skill.introducedInLessonId, mission.id, lessonPositionMap);
    });
    if (invalidLessonPrerequisites.length || invalidSkillPrerequisites.length) {
      addCourseFinding(
        findings,
        "error",
        "mission-prerequisite-order",
        "Mission prerequisites must be known and introduced in an earlier normal lesson.",
        `${invalidLessonPrerequisites.join(", ")} / ${invalidSkillPrerequisites.join(", ")}`,
        chapter,
        mission
      );
    }
  }
  if (!assessmentSkillIds.length || assessmentSkillIds.some((id) => !skillMap.has(id))) {
    addCourseFinding(findings, "error", "mission-assessment-skills", "Mission must declare known assessmentSkillIds.", assessmentSkillIds.join(", "), chapter, mission);
  }
  const missingPrerequisites = assessmentSkillIds.filter((id) => !prerequisiteSkillIds.includes(id));
  if (missingPrerequisites.length) {
    addCourseFinding(findings, "error", "mission-skill-prerequisite", "Every mission assessment skill must also be a prerequisite skill.", missingPrerequisites.join(", "), chapter, mission);
  }
  for (const skillId of assessmentSkillIds) {
    const skill = skillMap.get(skillId);
    const introduction = lessonMap.get(skill?.introducedInLessonId);
    if (
      !introduction
      || introduction.kind !== "lesson"
      || introduction.chapterId !== chapter.id
      || !isEarlierLesson(introduction.id, mission.id, lessonPositionMap)
    ) {
      addCourseFinding(findings, "error", "mission-skill-introduction", "Mission skill must come from a preceding normal lesson in the same chapter.", `${skillId}: ${skill?.introducedInLessonId || ""}`, chapter, mission);
    }
  }
  if (list(mission.conceptIds).some((id) => !conceptMap.has(id))) {
    addCourseFinding(findings, "error", "mission-concept-reference", "Mission references an unknown concept.", list(mission.conceptIds).join(", "), chapter, mission);
  }
  const chapterPathIds = (chapter.lessons || []).map((lesson) => lesson.id);
  const missionIndex = chapterPathIds.indexOf(mission.id);
  const unseenMissionConceptIds = list(mission.conceptIds).filter((conceptId) => {
    const concept = conceptMap.get(conceptId);
    const introduction = lessonMap.get(concept?.introducedInLessonId);
    const introductionIndex = chapterPathIds.indexOf(introduction?.id);
    return !introduction
      || introduction.kind !== "lesson"
      || introduction.chapterId !== chapter.id
      || introductionIndex < 0
      || missionIndex < 0
      || introductionIndex >= missionIndex;
  });
  if (unseenMissionConceptIds.length) {
    addCourseFinding(findings, "error", "mission-unseen-concept", "Mission concepts must have been introduced in an earlier normal lesson in the same chapter.", unseenMissionConceptIds.join(", "), chapter, mission);
  }
  if (!sameIds(list(mission.learning?.phaseOrder), missionPhaseOrder)) {
    addCourseFinding(findings, "error", "mission-phase-order", "Mission must publish Preview, Use, Independent Check, and Correction in order.", list(mission.learning?.phaseOrder).join(", "), chapter, mission);
  }
  if (!list(mission.learning?.variants).length) {
    addCourseFinding(findings, "error", "mission-variants", "Mission learning contract needs at least one variant.", "", chapter, mission);
  }
  const authoredVariants = new Map(list(mission.variants).map((variant) => [variant.id, variant]));
  for (const variantContract of list(mission.learning?.variants)) {
    const variant = authoredVariants.get(variantContract.id);
    if (!variant) {
      addCourseFinding(findings, "error", "mission-variant-reference", "Mission learning contract references an unknown variant.", variantContract.id, chapter, mission);
      continue;
    }
    const questions = list(variant.questions);
    const questionIds = questions.map((question) => question.id);
    const useIds = list(variantContract.phases?.use?.exerciseIds);
    const checkIds = list(variantContract.phases?.independentCheck?.exerciseIds);
    const declaredIds = list(variantContract.exerciseIds);
    const exercisePhases = questions.map((question) => question.phase);
    const firstCheckIndex = exercisePhases.indexOf("independent-check");
    const invalidMissionSequence = (
      exercisePhases[0] !== "use"
      || exercisePhases.some((phase) => !["use", "independent-check"].includes(phase))
      || (firstCheckIndex >= 0 && exercisePhases.slice(firstCheckIndex).some((phase) => phase !== "independent-check"))
    );
    if (invalidMissionSequence) {
      addCourseFinding(
        findings,
        "error",
        "mission-playable-sequence",
        "A mission must begin with its authored Use work, then move once into Independent Check; no injected Learn, Understand, or Guided item is allowed.",
        `${variant.id}: ${exercisePhases.join(", ")}`,
        chapter,
        mission
      );
    }
    if (
      !sameIds(declaredIds, questionIds)
      || findDuplicates(questionIds).length
      || findDuplicates(useIds).length
      || findDuplicates(checkIds).length
      || useIds.some((id) => checkIds.includes(id))
      || useIds.length + checkIds.length !== questionIds.length
      || questionIds.some((id) => !useIds.includes(id) && !checkIds.includes(id))
    ) {
      addCourseFinding(findings, "error", "mission-variant-phase-coverage", "Mission variant phases must cover every authored exercise exactly once.", variant.id, chapter, mission);
    }
    if (
      list(variantContract.phases?.preview?.exerciseIds).length
      || variantContract.phases?.preview?.scored !== false
    ) {
      addCourseFinding(findings, "error", "mission-preview-phase", "Mission Preview must be an unscored screen, not a question.", variant.id, chapter, mission);
    }
    if (checkIds.length < 4 || checkIds.length > 6) {
      addCourseFinding(findings, "error", "mission-independent-check-size", "Every mission variant needs four to six Independent Check items.", `${variant.id}: ${checkIds.length}`, chapter, mission);
    }
    if (
      Number(variantContract.phases?.independentCheck?.minimumScore) !== 0.8
      || variantContract.phases?.independentCheck?.automaticHints !== false
    ) {
      addCourseFinding(findings, "error", "mission-independent-check-contract", "Mission Independent Check must use 80 percent and no automatic hints.", variant.id, chapter, mission);
    }
    const actualCheckIds = questions
      .filter((question) => question.phase === "independent-check")
      .map((question) => question.id);
    if (!sameIds(actualCheckIds, checkIds)) {
      addCourseFinding(findings, "error", "mission-independent-check-phase", "Mission question phases must match the declared Independent Check exerciseIds.", variant.id, chapter, mission);
    }
    const useSkills = new Set(
      questions
        .filter((question) => useIds.includes(question.id))
        .flatMap((question) => list(question.skillIds))
    );
    const missingUseCoverage = assessmentSkillIds.filter((id) => !useSkills.has(id));
    if (missingUseCoverage.length) {
      addCourseFinding(findings, "error", "mission-use-skill-coverage", "Mission variant must use every declared assessment skill before Independent Check.", missingUseCoverage.join(", "), chapter, mission);
    }
    const checkSkills = new Set(
      questions
        .filter((question) => checkIds.includes(question.id))
        .flatMap((question) => list(question.skillIds))
    );
    const missingCheckCoverage = assessmentSkillIds.filter((id) => !checkSkills.has(id));
    if (missingCheckCoverage.length) {
      addCourseFinding(findings, "error", "mission-check-skill-coverage", "Mission Independent Check must assess every declared assessment skill.", missingCheckCoverage.join(", "), chapter, mission);
    }
    if (
      variantContract.phases?.correction?.mode !== "retry-missed"
      || variantContract.phases?.correction?.required !== true
      || variantContract.phases?.correction?.requiresSupportedRetry !== true
    ) {
      addCourseFinding(findings, "error", "mission-correction-contract", "Mission Correction must reteach and require supported retries for misses.", variant.id, chapter, mission);
    }
  }
  const missionVariants = list(mission.variants);
  for (let leftIndex = 0; leftIndex < missionVariants.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < missionVariants.length; rightIndex += 1) {
      const left = missionVariants[leftIndex];
      const right = missionVariants[rightIndex];
      const leftSignatures = new Set(list(left.questions).map(exerciseContentSignature));
      const rightSignatures = new Set(list(right.questions).map(exerciseContentSignature));
      const overlap = [...leftSignatures].filter((signature) => rightSignatures.has(signature)).length;
      const smallerVariantSize = Math.min(leftSignatures.size, rightSignatures.size);
      if (smallerVariantSize && overlap / smallerVariantSize > 0.6) {
        addCourseFinding(
          findings,
          "error",
          "mission-variant-overlap",
          "Mission variants must provide substantially different authentic situations, not near-duplicate item sets.",
          `${left.id} / ${right.id}: ${overlap}/${smallerVariantSize}`,
          chapter,
          mission
        );
      }
    }
  }
  const missionQuestions = getMissionQuestions(mission);
  const cannedMissionStagePattern = /(?:آپ\s+اسی\s+جگہ\s+پہلی\s+بار\s+بات\s+شروع\s+کر\s+رہے\s+ہیں|اب\s+سامنے\s+والے\s+کی\s+اگلی\s+بات\s+کا\s+جواب\s+خود\s+دیں|اب\s+سامنے\s+والا\s+مزید\s+معلومات\s+مانگتا\s+ہے|آخر\s+میں\s+آپ\s+کو\s+بات\s+واضح\s+کرکے\s+کام\s+مکمل\s+کرنا\s+ہے)/u;
  const cannedStageQuestions = missionQuestions.filter((question) => (
    cannedMissionStagePattern.test(text(question.prompt))
  ));
  if (cannedStageQuestions.length) {
    addCourseFinding(
      findings,
      "error",
      "generic-mission-stage",
      "Mission stages need situation-specific events and decisions instead of the shared first/next/final stage template.",
      `${cannedStageQuestions.length}: ${cannedStageQuestions.slice(0, 6).map((question) => question.id).join(", ")}`,
      chapter,
      mission
    );
  }
  for (const question of missionQuestions) {
    auditV4Exercise(findings, chapter, mission, question, conceptMap, skillMap);
    if (
      hasMalformedPunctuation(question.prompt)
      || hasMalformedPunctuation(question.document?.title)
      || list(question.document?.rows).some((row) => (
        hasMalformedPunctuation(row?.label) || hasMalformedPunctuation(row?.value)
      ))
    ) {
      addCourseFinding(
        findings,
        "error",
        "malformed-mission-copy",
        "Mission prompts and documents cannot contain repeated or malformed punctuation.",
        `${question.prompt || ""} / ${question.document?.title || ""}`,
        chapter,
        mission,
        question
      );
    }
    const outsideAssessment = list(question.skillIds).filter((id) => !assessmentSkillIds.includes(id));
    if (outsideAssessment.length) {
      addCourseFinding(findings, "error", "mission-surprise-skill", "Mission exercise uses a skill outside assessmentSkillIds.", outsideAssessment.join(", "), chapter, mission, question);
    }
    const outsideMissionConcepts = list(question.conceptIds).filter((conceptId) => !list(mission.conceptIds).includes(conceptId));
    if (outsideMissionConcepts.length) {
      addCourseFinding(findings, "error", "mission-surprise-concept", "Mission exercise uses a concept outside mission.conceptIds.", outsideMissionConcepts.join(", "), chapter, mission, question);
    }
    const unseenExerciseConcepts = list(question.conceptIds).filter((conceptId) => {
      const concept = conceptMap.get(conceptId);
      return unseenMissionConceptIds.includes(conceptId)
        || !concept
        || !isEarlierLesson(concept.introducedInLessonId, mission.id, lessonPositionMap);
    });
    if (unseenExerciseConcepts.length) {
      addCourseFinding(findings, "error", "mission-unseen-exercise-target", "Mission exercise targets material that was not introduced in an earlier normal lesson.", unseenExerciseConcepts.join(", "), chapter, mission, question);
    }
    const prerequisiteConceptIds = prerequisiteSkillIds
      .map((id) => skillMap.get(id)?.conceptId)
      .filter(Boolean);
    auditLexicalOwnership(
      findings,
      chapter,
      mission,
      question,
      new Set([...list(mission.conceptIds), ...prerequisiteConceptIds]),
      conceptMap
    );
    if (question.phase === "use") {
      auditA1UseScenarioProvenance(findings, chapter, mission, question);
      const normalizedAnswer = normalizeSemantic(question.answer);
      if (
        normalizedAnswer
        && hasLatin(question.answer)
        && normalizeSemantic(question.prompt).includes(normalizedAnswer)
      ) {
        addCourseFinding(findings, "error", "mission-use-answer-leak", "Mission situation reveals its own Dutch answer.", question.prompt, chapter, mission, question);
      }
    }
    if (question.type === "document-choice") {
      const title = normalizeSemantic(question.document?.title);
      const rows = list(question.document?.rows);
      const genericShell = title === normalizeSemantic("عملی معلومات")
        && rows.length === 1
        && normalizeSemantic(rows[0]?.label) === normalizeSemantic("اہم بات");
      const genericTranslationCard = rows.length === 2
        && normalizeSemantic(rows[0]?.label) === normalizeSemantic("موصولہ بات")
        && normalizeSemantic(rows[1]?.label) === normalizeSemantic("آپ کا کام")
        && /اس\s+بات\s+کا\s+مطلب\s+سمجھیں/u.test(text(rows[1]?.value));
      if (genericShell || genericTranslationCard) {
        addCourseFinding(
          findings,
          "error",
          "generic-mission-document",
          "Mission document must resemble a real form, notice, message, bill, schedule, or sign instead of a shared translation-card shell.",
          `${question.document?.title} / ${rows.map((row) => row?.label).join(", ")}`,
          chapter,
          mission,
          question
        );
      }
    }
  }
}

function auditV4Course(course, chapters, visuals) {
  const findings = [];
  if (Number(course?.schemaVersion) !== 4) {
    addCourseFinding(findings, "error", "course-schema-version", "NEDERURDU_COURSE must use schemaVersion 4.", String(course?.schemaVersion));
    return findings;
  }
  if (!text(course.courseId)) {
    addCourseFinding(findings, "error", "course-id", "NEDERURDU_COURSE needs a stable courseId.");
  }
  if (!sameIds(list(course.phaseOrder), coursePhaseOrder)) {
    addCourseFinding(findings, "error", "course-phase-order", "Course phaseOrder must match the curriculum constitution.", list(course.phaseOrder).join(", "));
  }
  const masteryText = JSON.stringify(course.masteryRules || {});
  if (!masteryText.includes("introduced") || !masteryText.includes("practiced") || !masteryText.includes("secure") || !masteryText.includes("0.8")) {
    addCourseFinding(findings, "error", "course-mastery-rules", "Course masteryRules must declare introduced, practiced, secure, and the 0.8 check threshold.");
  }

  const chapterMap = new Map(values(chapters).map((chapter) => [chapter.id, chapter]));
  const chapterPositionMap = new Map(values(chapters).map((chapter, index) => [chapter.id, index]));
  const allChapterLessons = values(chapters).flatMap((chapter) => chapter.lessons || []);
  const allLessonMap = new Map(allChapterLessons.map((lesson) => [lesson.id, lesson]));
  const lessonPositionMap = new Map();
  let lessonPosition = 0;
  for (const chapter of values(chapters)) {
    for (const lesson of chapter.lessons || []) {
      lessonPositionMap.set(lesson.id, lessonPosition);
      lessonPosition += 1;
    }
  }
  const normalLessons = resolveCourseRecords(course.lessons, allLessonMap);
  const missions = resolveCourseRecords(course.missions, allLessonMap);
  const lessonMap = new Map(normalLessons.map((lesson) => [lesson.id, lesson]));
  const missionMap = new Map(missions.map((mission) => [mission.id, mission]));
  const conceptLessonMap = new Map([...lessonMap, ...missionMap]);
  const conceptMap = new Map(values(course.concepts).map((concept) => [concept.id, concept]));
  const skillMap = new Map(values(course.skills).map((skill) => [skill.id, skill]));
  const patternMap = new Map(values(course.patterns).map((pattern) => [pattern.id, pattern]));
  const unitMap = new Map(values(course.units).map((unit) => [unit.id, unit]));
  const reviewMap = new Map(values(course.reviews).map((review) => [review.id, review]));
  const visualIdSet = new Set(visuals.map(visualId));

  for (const [name, records] of [
    ["chapters", values(chapters)],
    ["concepts", values(course.concepts)],
    ["skills", values(course.skills)],
    ["patterns", values(course.patterns)],
    ["units", values(course.units)],
    ["lessons", normalLessons],
    ["missions", missions],
    ["reviews", values(course.reviews)]
  ]) {
    if (!records.length) addCourseFinding(findings, "error", "empty-course-registry", `Course ${name} registry is empty.`);
    const duplicateIds = findDuplicates(records.map((record) => record?.id).filter(Boolean));
    if (duplicateIds.length || records.some((record) => !record?.id)) {
      addCourseFinding(findings, "error", "course-registry-id", `Course ${name} records need unique ids.`, [...new Set(duplicateIds)].join(", "));
    }
  }

  const conceptsByTarget = new Map();
  for (const concept of conceptMap.values()) {
    const target = normalize(concept.dutch);
    if (!target) continue;
    const matches = conceptsByTarget.get(target) || [];
    matches.push(concept);
    conceptsByTarget.set(target, matches);
  }
  for (const duplicates of conceptsByTarget.values()) {
    if (duplicates.length < 2) continue;
    const concept = duplicates[0];
    const semanticKeys = duplicates.map((item) => text(item.semanticKey || item.senseId));
    if (
      semanticKeys.some((key) => !key)
      || new Set(semanticKeys).size !== semanticKeys.length
    ) {
      addCourseFinding(
        findings,
        "error",
        "ambiguous-concept-sense",
        "Repeated Dutch surfaces are allowed only as explicitly distinct senses with unique stable semantic keys.",
        duplicates.map((item) => `${item.id}=${item.semanticKey || item.senseId || "missing"}`).join(", "),
        chapterMap.get(list(concept.chapterIds)[0]),
        conceptLessonMap.get(list(concept.lessonIds)[0])
      );
    }
  }

  for (const concept of conceptMap.values()) {
    auditV4Concept(findings, concept, conceptMap, conceptLessonMap, chapterMap, visualIdSet);
  }
  for (const chapter of chapterMap.values()) {
    const chapterConcepts = [...conceptMap.values()].filter((concept) => (
      lessonMap.get(concept.introducedInLessonId)?.chapterId === chapter.id
    ));
    const genericUsageConcepts = chapterConcepts.filter((concept) => (
      /اس\s+مقصد\s+کے\s+لیے/u.test(text(concept.usageUrdu))
    ));
    if (genericUsageConcepts.length > 12) {
      addCourseFinding(
        findings,
        "error",
        "high-frequency-usage-template",
        "Too many concept cards reuse “اس مقصد کے لیے”; usage guidance must describe the actual situation.",
        `${genericUsageConcepts.length}: ${genericUsageConcepts.slice(0, 8).map((concept) => concept.id).join(", ")}`,
        chapter
      );
    }
    for (const [field, rule, label] of [
      ["usageUrdu", "repeated-usage-template", "usage guidance"],
      ["commonConfusionUrdu", "repeated-confusion-template", "common-confusion teaching"]
    ]) {
      const groups = new Map();
      for (const concept of chapterConcepts) {
        const fingerprint = conceptTemplateFingerprint(concept, concept[field]);
        if (!fingerprint) continue;
        const records = groups.get(fingerprint) || [];
        records.push(concept);
        groups.set(fingerprint, records);
      }
      const repeatedGroups = [...groups.entries()]
        .filter(([, records]) => records.length > 5)
        .sort((left, right) => right[1].length - left[1].length);
      for (const [fingerprint, records] of repeatedGroups) {
        addCourseFinding(
          findings,
          "error",
          rule,
          `Concept-specific ${label} cannot be one generator template with only the quoted target changed.`,
          `${records.length}: ${records.slice(0, 8).map((concept) => concept.id).join(", ")} / ${fingerprint}`,
          chapter,
          null,
          null,
          records.map((concept) => concept.id)
        );
      }
      const repeatedConceptCount = repeatedGroups.reduce((sum, [, records]) => sum + records.length, 0);
      if (chapterConcepts.length && repeatedConceptCount / chapterConcepts.length > 0.1) {
        addCourseFinding(
          findings,
          "error",
          "low-concept-guidance-diversity",
          `More than ten percent of this chapter's concepts collapse into high-frequency ${label} templates.`,
          `${field}: ${repeatedConceptCount}/${chapterConcepts.length}; unique templates=${groups.size}`,
          chapter
        );
      }
    }
  }
  for (const pattern of patternMap.values()) {
    auditV4Pattern(findings, pattern, lessonMap, chapterMap, skillMap);
  }
  for (const skill of skillMap.values()) {
    auditV4Skill(findings, skill, conceptMap, patternMap, lessonMap, chapterMap);
  }
  const allExercises = [
    ...normalLessons.flatMap(getActiveLessonExercises),
    ...missions.flatMap(getMissionQuestions)
  ];
  const allLegacyQuestions = normalLessons.flatMap(getLegacyLessonQuestions);
  const legacyQuestionIds = allLegacyQuestions
    .map((question) => text(question.legacyId || question.id))
    .filter(Boolean);
  const duplicateRetiredLegacyIds = findDuplicates(legacyQuestionIds);
  if (allLegacyQuestions.some((question) => !text(question.legacyId || question.id))) {
    addCourseFinding(
      findings,
      "error",
      "retired-legacy-exercise-id",
      "Every retired compatibility exercise needs its original stable legacy identity."
    );
  }
  if (duplicateRetiredLegacyIds.length) {
    addCourseFinding(
      findings,
      "error",
      "duplicate-retired-legacy-exercise-id",
      "Retired compatibility exercise identities must remain unique so v3 evidence can migrate deterministically.",
      `${new Set(duplicateRetiredLegacyIds).size} duplicates; examples: ${[...new Set(duplicateRetiredLegacyIds)].slice(0, 20).join(", ")}`
    );
  }
  const invalidLegacyOwnership = normalLessons.flatMap((lesson) => (
    getLegacyLessonQuestions(lesson)
      .filter((question) => (
        !text(question.legacyId || question.id)
        || !list(question.conceptIds).length
        || list(question.conceptIds).some((id) => !conceptMap.has(id))
        || !list(question.skillIds).length
        || list(question.skillIds).some((id) => !skillMap.has(id))
      ))
      .map((question) => `${lesson.id}:${question.legacyId || question.id || "missing"}`)
  ));
  if (invalidLegacyOwnership.length) {
    addCourseFinding(
      findings,
      "error",
      "legacy-migration-ownership",
      "A retired v3 exercise needs a unique legacy ID plus known concept and skill ownership so saved evidence can migrate without entering active lessons.",
      `${invalidLegacyOwnership.length}; examples: ${invalidLegacyOwnership.slice(0, 20).join(", ")}`
    );
  }
  if (allLegacyQuestions.length) {
    const legacyQuestionIdSet = new Set(legacyQuestionIds);
    const unresolvedActiveLegacyIds = allExercises
      .map((question) => text(question.legacyId))
      .filter((legacyId) => legacyId && !legacyQuestionIdSet.has(legacyId));
    if (unresolvedActiveLegacyIds.length) {
      addCourseFinding(
        findings,
        "error",
        "unresolved-active-legacy-id",
        "An active exercise legacyId must resolve to one retired compatibility record.",
        `${new Set(unresolvedActiveLegacyIds).size} unresolved; examples: ${[...new Set(unresolvedActiveLegacyIds)].slice(0, 20).join(", ")}`
      );
    }
  }
  const opaqueHashTail = /:[a-z0-9]{5,8}$/i;
  const exerciseUsesOpaqueHash = (id) => (
    opaqueHashTail.test(text(id))
    || /:concept:[^:]+:[a-z0-9]{5,8}(?::|$)/i.test(text(id))
  );
  const conceptsWithoutDurableSemanticKey = [...conceptMap.values()].filter((concept) => (
    opaqueHashTail.test(text(concept.id))
    && !text(concept.semanticKey || concept.stableSemanticKey)
  ));
  const exercisesWithoutDurableSemanticKey = allExercises.filter((question) => (
    exerciseUsesOpaqueHash(question.id)
    && !text(question.semanticKey || question.stableSemanticKey)
  ));
  const positionBasedSemanticExercises = allExercises.filter((question) => {
    const semanticKey = text(question.semanticKey || question.stableSemanticKey);
    return semanticKey
      && semanticKey === text(question.legacyId)
      && /(?:^|[-:])\d+$/.test(semanticKey);
  });
  if (conceptsWithoutDurableSemanticKey.length) {
    addCourseFinding(
      findings,
      "review",
      "opaque-concept-identity",
      "Content hashes are reorder-safe but not durable semantic identities across copy edits or multiple senses; add an explicit stable semantic key or replace the opaque id.",
      `${conceptsWithoutDurableSemanticKey.length}; examples: ${conceptsWithoutDurableSemanticKey.slice(0, 8).map((concept) => concept.id).join(", ")}`
    );
  }
  if (exercisesWithoutDurableSemanticKey.length) {
    addCourseFinding(
      findings,
      "review",
      "opaque-exercise-identity",
      "Exercise content hashes change when wording changes; add an explicit durable semantic key so learning and mistake history follows the same authored task.",
      `${exercisesWithoutDurableSemanticKey.length}; examples: ${exercisesWithoutDurableSemanticKey.slice(0, 8).map((question) => question.id).join(", ")}`
    );
  }
  if (positionBasedSemanticExercises.length) {
    addCourseFinding(
      findings,
      "review",
      "position-based-semantic-key",
      "Copying a numbered legacy id into semanticKey does not create semantic identity; name the task by owned concept, skill, phase, and purpose.",
      `${positionBasedSemanticExercises.length}; examples: ${positionBasedSemanticExercises.slice(0, 8).map((question) => question.semanticKey).join(", ")}`
    );
  }
  const duplicateLegacyIds = findDuplicates(
    allExercises.map((question) => question.legacyId).filter(Boolean)
  );
  if (duplicateLegacyIds.length) {
    const uniqueDuplicateLegacyIds = [...new Set(duplicateLegacyIds)];
    addCourseFinding(
      findings,
      "error",
      "duplicate-legacy-exercise-id",
      "Present legacyId values must be unique so migration cannot attach evidence to a different exercise.",
      `${uniqueDuplicateLegacyIds.length} duplicates; examples: ${uniqueDuplicateLegacyIds.slice(0, 20).join(", ")}`
    );
  }
  for (const chapter of chapterMap.values()) {
    auditV4Chapter(
      findings,
      chapter,
      unitMap,
      lessonMap,
      missionMap,
      conceptMap,
      skillMap,
      patternMap,
      chapterPositionMap,
      lessonPositionMap
    );
    for (const lessonId of list(chapter.lessonIds)) {
      const lesson = lessonMap.get(lessonId);
      if (lesson) {
        auditV4Lesson(
          findings,
          chapter,
          lesson,
          conceptMap,
          skillMap,
          patternMap,
          lessonMap,
          lessonPositionMap
        );
      }
    }
    for (const missionId of list(chapter.missionIds)) {
      const mission = missionMap.get(missionId);
      if (mission) {
        auditV4Mission(
          findings,
          chapter,
          mission,
          lessonMap,
          conceptMap,
          skillMap,
          lessonPositionMap
        );
      }
    }
    const selectedNormalExercises = list(chapter.lessonIds).flatMap((lessonId) => {
      const lesson = lessonMap.get(lessonId);
      if (!lesson) return [];
      const byId = new Map(getActiveLessonExercises(lesson).flatMap((question) => [
        [question.id, question],
        ...(question.legacyId ? [[question.legacyId, question]] : [])
      ]));
      return list(lesson.learning?.runs).flatMap((run) => {
        const phases = run.phases || {};
        return [
          ...list(phases.understand?.exerciseIds),
          ...list((phases.guidedPractice || phases.guided)?.exerciseIds),
          ...list(phases.use?.exerciseIds),
          ...list((phases.independentCheck || phases.check)?.exerciseIds)
        ].map((id) => byId.get(id)).filter(Boolean);
      });
    });
    const selectedTypes = new Set(selectedNormalExercises.map((question) => question.type));
    const modalityRequirements = [
      ["meaning recognition", ["meaning", "reverse", "image-choice"].some((type) => selectedTypes.has(type))],
      ["listening", selectedTypes.has("listen-choice")],
      ["supported speaking", selectedTypes.has("speak-repeat")],
      ["guided production", ["reverse", "fill-gap", "build", "sequence", "short-input"].some((type) => selectedTypes.has(type))],
      ["practical use", ["situation", "document-choice"].some((type) => selectedTypes.has(type))]
    ];
    if (chapter.id === "a0" || chapter.id === "a1") {
      modalityRequirements.push(["visual recognition", selectedTypes.has("image-choice")]);
    }
    if (chapter.id === "a1" || chapter.id === "a2") {
      modalityRequirements.push(["document/form reading", selectedTypes.has("document-choice")]);
    }
    if (chapter.id === "a2") {
      modalityRequirements.push(["supported short writing", selectedTypes.has("short-input")]);
    }
    const missingModalities = modalityRequirements
      .filter(([, covered]) => !covered)
      .map(([label]) => label);
    if (missingModalities.length) {
      addCourseFinding(
        findings,
        "error",
        "chapter-modality-coverage",
        "Selected learning runs do not cover the chapter's required learning modalities.",
        `${missingModalities.join(", ")}; selected types: ${[...selectedTypes].sort().join(", ")}`,
        chapter
      );
    }
  }

  for (const unit of unitMap.values()) {
    const chapter = chapterMap.get(unit.chapterId) || { id: unit.chapterId || "course" };
    const visibleUnitLabel = unit.title || unit.name || unit.label || "";
    if (!hasSimpleUrduFirstLabel(visibleUnitLabel)) {
      addCourseFinding(
        findings,
        "error",
        "urdu-first-visible-label",
        "The learner-facing unit label must be simple Urdu about practical use, not a grammar-first or untranslated taxonomy label.",
        `${unit.id}: ${visibleUnitLabel}`,
        chapter
      );
    }
    if (!hasUrdu(unit.outcomeUrdu || unit.goal) || !hasUrdu(unit.practiceUrdu || unit.practice)) {
      addCourseFinding(findings, "error", "unit-contract", "Unit needs Urdu goal and practice descriptions.", unit.id, chapter);
    }
    if (!Array.isArray(unit.lessonIds) || list(unit.lessonIds).some((id) => !lessonMap.has(id))) {
      addCourseFinding(findings, "error", "unit-lessons", "Unit lessonIds must reference normal lessons.", list(unit.lessonIds).join(", "), chapter);
    }
    if (!Array.isArray(unit.missionIds) || list(unit.missionIds).some((id) => !missionMap.has(id))) {
      addCourseFinding(findings, "error", "unit-missions", "Unit missionIds must reference missions.", list(unit.missionIds).join(", "), chapter);
    }
    const mismatchedMissionIds = list(unit.missionIds).filter((id) => (
      missionMap.get(id)?.unitId !== unit.id
    ));
    if (mismatchedMissionIds.length) {
      addCourseFinding(
        findings,
        "error",
        "unit-mission-owner",
        "Every unit mission must point back to the same unit.",
        mismatchedMissionIds.join(", "),
        chapter
      );
    }
    const representedLessonIds = new Set(
      list(unit.missionIds)
        .map((missionId) => missionMap.get(missionId))
        .filter(Boolean)
        .flatMap((mission) => list(mission.assessmentSkillIds))
        .map((skillId) => skillMap.get(skillId)?.introducedInLessonId)
        .filter((lessonId) => list(unit.lessonIds).includes(lessonId))
    );
    const missingRepresentativeLessonIds = list(unit.lessonIds)
      .filter((lessonId) => !representedLessonIds.has(lessonId));
    if (missingRepresentativeLessonIds.length) {
      addCourseFinding(
        findings,
        "error",
        "unit-mission-lesson-coverage",
        "The unit mission set must assess at least one representative practiced skill from every normal lesson strand in the unit.",
        missingRepresentativeLessonIds.join(", "),
        chapter
      );
    }
    const capstoneMissionIds = list(unit.capstoneMissionIds);
    if (
      !capstoneMissionIds.length
      || capstoneMissionIds.some((id) => !missionMap.has(id) || !list(unit.missionIds).includes(id))
    ) {
      addCourseFinding(
        findings,
        "error",
        "unit-capstone-mission",
        "Every unit must end with at least one declared capstone mission from its missionIds.",
        capstoneMissionIds.join(", "),
        chapter
      );
    }
    if (!unit.adaptiveReviewId || !reviewMap.has(unit.adaptiveReviewId)) {
      addCourseFinding(findings, "error", "unit-adaptive-review", "Every unit needs an adaptiveReviewId.", unit.adaptiveReviewId || "", chapter);
    }
  }

  for (const review of reviewMap.values()) {
    const chapter = chapterMap.get(review.chapterId) || { id: review.chapterId || "course" };
    if (review.kind !== "adaptive-review" || review.pathNode !== false || review.selection !== "weakest-first-spaced") {
      addCourseFinding(findings, "error", "adaptive-review-contract", "Review descriptor must be adaptive, off-path, and weakest-first-spaced.", review.id, chapter);
    }
    const reviewStates = list(review.states);
    if (
      reviewStates[0] !== "introduced"
      || reviewStates.some((status) => !masteryStates.includes(status))
      || findDuplicates(reviewStates).length
      || reviewStates.some((status, index) => (
        index > 0
        && masteryStates.indexOf(status) <= masteryStates.indexOf(reviewStates[index - 1])
      ))
    ) {
      addCourseFinding(findings, "error", "adaptive-review-states", "Adaptive review states must start from introduced and may also include practiced or secure.", reviewStates.join(", "), chapter);
    }
    if (!list(review.sourceLessonIds).length || list(review.sourceLessonIds).some((id) => !lessonMap.has(id))) {
      addCourseFinding(findings, "error", "adaptive-review-lessons", "Adaptive review needs known normal source lessons.", list(review.sourceLessonIds).join(", "), chapter);
    }
    if (!list(review.eligibleSkillIds).length || list(review.eligibleSkillIds).some((id) => !skillMap.has(id))) {
      addCourseFinding(findings, "error", "adaptive-review-skills", "Adaptive review needs known eligible skills.", list(review.eligibleSkillIds).join(", "), chapter);
    }
  }
  if (!course.reviewPolicy || text(course.reviewPolicy.selection) !== "weakest-first-spaced") {
    addCourseFinding(findings, "error", "course-review-policy", "Course reviewPolicy must select eligible skills weakest-first-spaced.");
  }
  return dedupeFindings(findings);
}

function auditChapter(chapter, visualIds, visualLookup, v4Mode = false) {
  const findings = [];
  const lessonIds = new Set();
  for (const lesson of chapter.lessons || []) {
    if (lessonIds.has(lesson.id)) {
      addFinding(findings, "error", chapter, lesson, null, "duplicate-lesson-id", "Chapter contains duplicate lesson id.");
    }
    lessonIds.add(lesson.id);
    if (!v4Mode && (lesson.questions || []).length !== 60) {
      addFinding(findings, "error", chapter, lesson, null, "lesson-size", "Lesson does not contain exactly 60 questions.", String((lesson.questions || []).length));
    }
    const questions = v4Mode ? getActiveLessonExercises(lesson) : list(lesson.questions);
    const questionIds = new Set();
    for (const question of questions) {
      if (questionIds.has(question.id)) {
        addFinding(findings, "error", chapter, lesson, question, "duplicate-question-id", "Lesson contains duplicate question id.");
      }
      questionIds.add(question.id);
      auditQuestion(findings, chapter, lesson, question, visualIds, visualLookup);
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
    questionCount: (chapter.lessons || []).reduce((sum, lesson) => (
      sum + (Number(course?.schemaVersion) === 4
        ? getActiveLessonExercises(lesson).length
        : list(lesson.questions).length)
    ), 0),
    errors: counts.error || 0,
    review: counts.review || 0,
    byRule
  };
}

const { course, chapters, visuals } = loadCourse();
const visualIds = new Set(visuals.map(visualId));
const visualLookup = buildVisualLookup(visuals);
const selected = chapters.filter((chapter) => !chapterFilter || chapter.id === chapterFilter);
if (chapterFilter && !selected.length) {
  const message = `Unknown chapter filter: ${chapterFilter}`;
  if (jsonMode) {
    console.log(JSON.stringify({ error: "unknown-chapter-filter", message }, null, 2));
  } else {
    console.error(message);
  }
  process.exit(1);
}
const v4Mode = Number(course?.schemaVersion) === 4;
const v4Findings = course ? auditV4Course(course, chapters, visuals) : [{
  severity: "error",
  chapterId: "course",
  lessonId: "",
  lessonTitle: "",
  questionId: "",
  type: "",
  rule: "missing-v4-course",
  message: "window.NEDERURDU_COURSE is missing.",
  prompt: "",
  answer: "",
  detail: ""
}];
const results = selected.map((chapter, index) => {
  const findings = [
    ...auditChapter(chapter, visualIds, visualLookup, v4Mode),
    ...v4Findings.filter((finding) => finding.chapterId === chapter.id || (finding.chapterId === "course" && index === 0))
  ];
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

process.exitCode = results.some((result) => result.summary.errors > 0 || result.summary.review > 0) ? 1 : 0;
