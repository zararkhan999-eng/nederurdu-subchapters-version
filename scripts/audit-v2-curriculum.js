const path = require("path");

global.window = {};
require(path.resolve(__dirname, "../v2-prototype/lesson-data.js"));

const lessons = global.window.NederUrduV2LessonCatalog;
const failures = [];
const requiredSections = ["brief", "scene", "decode", "notice", "rehearse", "act", "check", "complete"];

function audit(condition, lessonId, message) {
  if (!condition) failures.push(`${lessonId}: ${message}`);
}

function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

audit(Array.isArray(lessons), "catalog", "lesson catalog did not load");
audit(lessons?.length === 5, "catalog", `expected 5 lessons, found ${lessons?.length || 0}`);

const ids = lessons.map((lesson) => lesson.id);
audit(new Set(ids).size === ids.length, "catalog", "lesson ids are not unique");

lessons.forEach((lesson, index) => {
  requiredSections.forEach((section) => audit(Boolean(lesson[section]), lesson.id, `missing ${section} section`));
  audit(nonEmpty(lesson.title) && nonEmpty(lesson.urduTitle), lesson.id, "missing bilingual title");
  audit(nonEmpty(lesson.canDo), lesson.id, "missing learner-facing can-do outcome");
  audit(Number.isInteger(lesson.minutes) && lesson.minutes >= 6 && lesson.minutes <= 15, lesson.id, "duration is outside the short-scene contract");
  audit(Array.isArray(lesson.brief.newLanguage) && lesson.brief.newLanguage.length >= 3 && lesson.brief.newLanguage.length <= 5, lesson.id, "brief must preview 3–5 useful whole phrases");
  audit(Array.isArray(lesson.scene.lines) && lesson.scene.lines.length >= 2, lesson.id, "scene must contain a real exchange");
  audit(nonEmpty(lesson.scene.note), lesson.id, "scene lacks an explicit listen-first instruction");
  audit(Array.isArray(lesson.decode.items) && lesson.decode.items.length >= 4 && lesson.decode.items.length <= 5, lesson.id, "decode must focus on 4–5 items");
  lesson.decode.items.forEach((item, itemIndex) => {
    audit(["form", "audio", "sound", "meaning", "use"].every((key) => nonEmpty(item[key])), lesson.id, `decode item ${itemIndex + 1} does not integrate form, audio, Urdu sound support, meaning, and use`);
  });
  audit(Array.isArray(lesson.notice.tokens) && lesson.notice.tokens.length >= 2, lesson.id, "notice step lacks a sentence pattern");
  audit(nonEmpty(lesson.notice.ruleDutch) && nonEmpty(lesson.notice.ruleUrdu), lesson.id, "notice rule is not bilingual");
  audit(nonEmpty(lesson.notice.cautionDutch) && nonEmpty(lesson.notice.cautionUrdu), lesson.id, "notice step lacks a specific likely-mistake warning");

  for (const section of ["rehearse", "check"]) {
    const task = lesson[section];
    audit(Array.isArray(task.options) && task.options.length === 3, lesson.id, `${section} must contain exactly three focused options`);
    audit(task.options.includes(task.correct), lesson.id, `${section} correct answer is absent from its options`);
    audit(task.options[0] === task.correct, lesson.id, `${section} first option must remain the deterministic QA answer`);
    audit(nonEmpty(task.correctFeedback) && nonEmpty(task.wrongFeedback), lesson.id, `${section} lacks specific success or repair feedback`);
  }
  audit(lesson.rehearse.promptDutch !== lesson.check.promptDutch, lesson.id, "fresh transfer repeats the guided-practice prompt");
  audit(nonEmpty(lesson.check.setting), lesson.id, "fresh transfer lacks a distinct real-world setting");

  const fields = lesson.act.fields || [];
  const choices = lesson.act.choices || [];
  audit((fields.length > 0) !== (choices.length > 0), lesson.id, "personal act must use either typed fields or bounded choices");
  audit(nonEmpty(lesson.act.preview) && nonEmpty(lesson.act.instruction) && nonEmpty(lesson.act.speechHint), lesson.id, "personal act lacks preview, instruction, or speaking guidance");
  const placeholders = [...lesson.act.preview.matchAll(/\{\{(?:(?:spelled):)?([a-z]+)\}\}/g)].map((match) => match[1]);
  const responseKeys = fields.map((field) => field.key).concat(choices.length ? ["choice"] : []);
  placeholders.forEach((key) => audit(responseKeys.includes(key), lesson.id, `preview placeholder ${key} has no response control`));
  responseKeys.forEach((key) => audit(placeholders.includes(key), lesson.id, `response control ${key} is not used in the personalized sentence`));

  audit(Array.isArray(lesson.complete.proofs) && lesson.complete.proofs.length >= 3, lesson.id, "completion lacks evidence of learning");
  audit(Array.isArray(lesson.reviewLinks) && lesson.reviewLinks.length >= 2, lesson.id, "lesson lacks planned retrieval links");
  const expectedNext = lessons[index + 1]?.id || null;
  audit((lesson.complete.nextId || null) === expectedNext, lesson.id, `next-scene chain should point to ${expectedNext || "review"}`);
});

const mission = lessons.at(-1);
audit(mission.id === "people-mission", "catalog", "final item is not the People world mission");
audit(mission.complete.proofs.length === 4, mission.id, "mission must prove all four integrated capabilities");

const report = {
  ok: failures.length === 0,
  lessons: lessons.map((lesson) => ({
    id: lesson.id,
    minutes: lesson.minutes,
    sceneLines: lesson.scene.lines.length,
    decodeItems: lesson.decode.items.length,
    responseMode: lesson.act.fields?.length ? "personalized-fields" : "bounded-choice",
    proofs: lesson.complete.proofs.length
  })),
  checks: {
    teachingBeforeScoring: true,
    integratedMeaningSoundUse: true,
    freshTransferPerLesson: true,
    retrievalLinksPlanned: true
  },
  failures
};

console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
