#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
global.window = {};
require(path.join(root, "course-data.js"));

const course = global.window.NEDERURDU_COURSE;
if (!course || Number(course.schemaVersion) !== 4) {
  throw new Error("Expected the schema-v4 canonical course object.");
}

const conceptById = new Map(course.concepts.map((item) => [item.id, item]));
const skillByConceptId = new Map(course.skills.filter((item) => item.conceptId).map((item) => [item.conceptId, item]));
const skillById = new Map(course.skills.map((item) => [item.id, item]));
const patternById = new Map(course.patterns.map((item) => [item.id, item]));
const unitById = new Map(course.units.map((item) => [item.id, item]));
const output = path.join(root, "docs", "lesson-coverage-map.csv");

function csv(value) {
  const text = String(value ?? "").replace(/\r?\n/g, " ");
  return `"${text.replace(/"/g, '""')}"`;
}

function exerciseMap(lesson) {
  return new Map((lesson.exercises || []).map((item) => [item.id, item]));
}

function targetMatches(exercise, target) {
  if (!exercise) return false;
  return target.pattern
    ? (exercise.skillIds || []).includes(target.skillId)
    : (exercise.conceptIds || []).includes(target.id)
      || (target.skillId && (exercise.skillIds || []).includes(target.skillId));
}

function renderTarget(target, teachingBlocks, phases, exercises) {
  const taught = teachingBlocks.some((block) => target.pattern
    ? block.patternId === target.id && block.mode === "teach"
    : block.conceptId === target.id && block.mode === "teach");
  const state = (phase) => {
    const exerciseIds = phases[phase]?.exerciseIds || [];
    return exerciseIds.some((id) => targetMatches(exercises.get(id), target));
  };
  const tags = [
    `T${taught ? "✓" : "—"}`,
    `R${state("understand") ? "✓" : "—"}`,
    `G${state("guidedPractice") ? "✓" : "—"}`,
    `U${state("use") ? "✓" : "—"}`,
    `I${state("independentCheck") ? "✓" : "—"}`
  ].join(" ");

  if (target.pattern) {
    const pattern = patternById.get(target.id);
    return `${pattern?.titleUrdu || target.id}: ${pattern?.modelDutch || ""} [${tags}]`;
  }
  const concept = conceptById.get(target.id);
  return `${concept?.dutch || target.id} — ${concept?.urdu || ""} [${tags}]`;
}

function formatPrerequisites(ids) {
  return (ids || []).map((id) => {
    const skill = skillById.get(id);
    if (!skill) return id;
    if (skill.conceptId) return conceptById.get(skill.conceptId)?.dutch || skill.labelUrdu || id;
    if (skill.patternId) return patternById.get(skill.patternId)?.titleUrdu || id;
    return skill.labelUrdu || id;
  }).join("; ");
}

const rows = [[
  "Level", "Unit", "Lesson ID", "Lesson", "Run", "Run outcome (Urdu)",
  "Prerequisite knowledge", "New vocabulary and phrases with phase status",
  "Explicit grammar/pattern with phase status", "Use situation prompts",
  "Understand items", "Guided Practice items", "Use items", "Independent Check items"
]];

for (const chapter of course.chapters) {
  const lessons = course.lessons.filter((lesson) => lesson.chapterId === chapter.id);
  for (const lesson of lessons) {
    const exercises = exerciseMap(lesson);
    for (const run of lesson.learning?.runs || []) {
      const targets = (run.newConceptIds || []).map((id) => ({
        id,
        skillId: skillByConceptId.get(id)?.id
      }));
      const pattern = run.patternId ? patternById.get(run.patternId) : null;
      if (pattern) targets.push({ id: pattern.id, skillId: pattern.skillId, pattern: true });

      const targetStatuses = targets.map((target) => renderTarget(
        target,
        run.teachingBlocks || [],
        run.phases || {},
        exercises
      ));
      const phaseCount = (key) => (run.phases?.[key]?.exerciseIds || []).length;
      const prompts = (run.phases?.use?.exerciseIds || [])
        .map((id) => exercises.get(id)?.prompt)
        .filter(Boolean);

      rows.push([
        chapter.id.toUpperCase(),
        unitById.get(lesson.unitId)?.title || lesson.unitId,
        lesson.id,
        lesson.title,
        run.index,
        run.outcomeUrdu || lesson.outcomeUrdu,
        formatPrerequisites(run.prerequisiteSkillIds),
        targetStatuses.filter((_, index) => !targets[index].pattern).join(" | "),
        targetStatuses.filter((_, index) => targets[index].pattern).join(" | ") || "No explicit pattern card in this run",
        prompts.join(" | "),
        phaseCount("understand"),
        phaseCount("guidedPractice"),
        phaseCount("use"),
        phaseCount("independentCheck")
      ]);
    }
  }
}

fs.writeFileSync(output, `${rows.map((row) => row.map(csv).join(",")).join("\n")}\n`, "utf8");
console.log(`Wrote ${rows.length - 1} lesson-run rows to ${path.relative(root, output)}.`);
