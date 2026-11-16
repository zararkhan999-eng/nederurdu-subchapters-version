#!/usr/bin/env node
// Reports Dutch words that an A0 lesson or mission uses before the lesson
// that teaches them. A word is "taught" by the first normal lesson, in map
// order, whose new concepts contain it. Usage:
//   node scripts/report-a0-progression.js [--lesson=a0-geen] [--all] [--strict]
// --words lists the new words each lesson teaches; --all also lists words in wrong options and feedback; --strict exits 1 when
// a target word (teaching card, audio, answer, prompt) is used too early.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const args = process.argv.slice(2);
const onlyLesson = (args.find((arg) => arg.startsWith("--lesson=")) || "").split("=")[1];
const showAll = args.includes("--all");
const strict = args.includes("--strict");
const showWords = args.includes("--words");

const context = { window: {}, console };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "course-data.js"), "utf8"), context);
const course = context.window.NEDERURDU_COURSE;

const conceptById = new Map(course.concepts.map((concept) => [concept.id, concept]));
const patternById = new Map((course.patterns || []).map((pattern) => [pattern.id, pattern]));
const lessonById = new Map([...course.lessons, ...(course.missions || [])].map((lesson) => [lesson.id, lesson]));
const chapter = course.chapters.find((item) => item.id === "a0");
const unitById = new Map(course.units.map((unit) => [unit.id, unit]));
const order = chapter.unitIds
  .flatMap((unitId) => [...unitById.get(unitId).lessonIds, ...(unitById.get(unitId).missionIds || [])])
  .filter((id) => lessonById.has(id));
const position = new Map(order.map((id, index) => [id, index]));
const firstSoundLesson = order.findIndex((id) => /^a0-(?:letters|sounds)-/.test(id));

// Names, places and labels the course uses as given words, not as Dutch to learn.
const ignored = new Set([
  "ali", "sara", "khan", "zarar", "ahmed", "fatima", "pakistan", "utrecht", "amsterdam",
  "rotterdam", "marktstraat", "urdu", "nederlands", "ab", "m", "pin", "bsn", "e-mail"
]);

const graphemes = new Set(["aa", "ee", "oo", "uu", "ie", "oe", "eu", "ui", "ij", "ei", "au", "ou", "ch", "sch", "ng"]);

function tokens(text) {
  return String(text || "")
    .toLowerCase()
    .match(/[a-zà-ÿ]+(?:-[a-zà-ÿ]+)*/g) || [];
}

const owner = new Map();
for (const lessonId of order) {
  const lesson = lessonById.get(lessonId);
  if (lesson.kind === "mission") continue;
  for (const conceptId of lesson.newConceptIds || []) {
    for (const token of tokens(conceptById.get(conceptId)?.dutch)) {
      if (!owner.has(token)) owner.set(token, lessonId);
    }
  }
}

const optionKeys = /^(?:options|optionExplanationsUrdu|distractor|wrong)/i;
const feedbackKeys = /^(?:explain|hint|feedback|correct|incorrect|explanation)/i;

function collect(value, bucket, kind, out) {
  if (value == null) return;
  if (typeof value === "string") {
    for (const token of tokens(value)) out.push({ token, kind, bucket });
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collect(item, bucket, kind, out);
    return;
  }
  if (typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (/(?:id|ids|source|type|mode|visual|visualId|phase|stage|speaker|semanticKey|kind|kinds|role|key)$/i.test(key)) continue;
      const childKind = optionKeys.test(key) ? "option" : feedbackKeys.test(key) ? "feedback" : kind;
      collect(child, `${bucket}.${key}`, childKind, out);
    }
  }
}

function usesFor(lesson) {
  const out = [];
  const conceptIds = new Set([...(lesson.newConceptIds || []), ...(lesson.reviewConceptIds || []), ...(lesson.conceptIds || [])]);
  for (const conceptId of conceptIds) {
    const concept = conceptById.get(conceptId);
    if (!concept) continue;
    collect({ dutch: concept.dutch, exampleDutch: concept.exampleDutch, examples: concept.examples, usageUrdu: concept.usageUrdu, commonConfusionUrdu: concept.commonConfusionUrdu }, "teach", "target", out);
  }
  for (const run of lesson.learning?.runs || []) {
    const pattern = patternById.get(run.patternId);
    if (pattern) collect(pattern, "pattern", "target", out);
  }
  for (const exercise of lesson.exercises || []) collect(exercise, exercise.type, "target", out);
  if (lesson.kind === "mission") collect({ variants: lesson.variants, questions: lesson.questions }, "mission", "target", out);
  return out;
}

let targetProblems = 0;
for (const lessonId of order) {
  if (onlyLesson && lessonId !== onlyLesson) continue;
  const lesson = lessonById.get(lessonId);
  const here = position.get(lessonId);
  const early = new Map();
  for (const use of usesFor(lesson)) {
    if (ignored.has(use.token)) continue;
    // Single letters are letter tiles; letter groups are taught by the sound
    // lessons and may be named from then on.
    if (use.token.length === 1) continue;
    if (graphemes.has(use.token) && here >= firstSoundLesson) continue;
    const taughtIn = owner.get(use.token);
    const taughtAt = taughtIn ? position.get(taughtIn) : Infinity;
    const isEarly = lesson.kind === "mission" ? taughtAt > here : taughtAt > here || (taughtAt === here && taughtIn !== lessonId);
    if (!isEarly) continue;
    const key = `${use.token}|${use.kind}`;
    if (!early.has(key)) early.set(key, { ...use, taughtIn: taughtIn || "never in A0", count: 0 });
    early.get(key).count += 1;
  }
  const rows = [...early.values()].filter((row) => showAll || row.kind === "target");
  const targets = rows.filter((row) => row.kind === "target");
  targetProblems += targets.length;
  if (showWords && lesson.kind !== "mission") {
    const own = [...owner.entries()].filter(([, id]) => id === lessonId).map(([token]) => token);
    console.log(`\n${here + 1}. ${lessonId}: ${own.length} new word(s): ${own.join(", ")}`);
  }
  if (!rows.length) continue;
  console.log(`\n${here + 1}. ${lessonId}${lesson.kind === "mission" ? " (mission)" : ""}: ${targets.length} target word(s) used before they are taught`);
  for (const row of rows.sort((a, b) => a.kind.localeCompare(b.kind) || a.token.localeCompare(b.token))) {
    console.log(`   ${row.kind.padEnd(8)} ${row.token.padEnd(16)} taught in ${row.taughtIn}  (${row.count}× e.g. ${row.bucket})`);
  }
}
console.log(`\nA0 progression: ${targetProblems} target word(s) used before they are taught.`);
if (strict && targetProblems) process.exitCode = 1;
