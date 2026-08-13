#!/usr/bin/env node

const path = require("node:path");

const chapterId = process.argv.find((argument) => argument.startsWith("--chapter="))
  ?.split("=")[1]
  ?.trim()
  ?.toLowerCase();

if (!chapterId) {
  console.error("Usage: node scripts/report-learning-first-inventory.js --chapter=a2");
  process.exit(2);
}

global.window = {};
require(path.join(__dirname, "..", "course-data.js"));

const course = global.window.NEDERURDU_COURSE;
const chapter = course.chapters.find((item) => item.id === chapterId);

if (!chapter) {
  console.error(`Unknown chapter: ${chapterId}`);
  process.exit(2);
}

const conceptsById = new Map(course.concepts.map((concept) => [concept.id, concept]));
const skillsById = new Map(course.skills.map((skill) => [skill.id, skill]));

function countBy(items, keyFor) {
  return items.reduce((counts, item) => {
    const key = keyFor(item) || "unassigned";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function conceptRecord(conceptId, lesson) {
  const concept = conceptsById.get(conceptId);
  if (!concept) return { id: conceptId, missing: true };
  return {
    id: concept.id,
    dutch: concept.dutch,
    urdu: concept.urdu,
    role: concept.role,
    introducedInLessonId: concept.introducedInLessonId,
    placement: lesson?.newConceptIds?.includes(conceptId)
      ? "new"
      : (lesson?.reviewConceptIds?.includes(conceptId) ? "review" : "prerequisite")
  };
}

function skillRecord(skillId) {
  const skill = skillsById.get(skillId);
  if (!skill) return { id: skillId, missing: true };
  return {
    id: skill.id,
    targetId: skill.targetId,
    introducedInLessonId: skill.introducedInLessonId,
    labelUrdu: skill.labelUrdu,
    evidenceTypes: skill.evidenceTypes
  };
}

function exerciseRecord(exercise) {
  return {
    id: exercise.id,
    semanticKey: exercise.semanticKey,
    phase: exercise.phase,
    type: exercise.type,
    conceptIds: exercise.conceptIds || [],
    skillIds: exercise.skillIds || [],
    instructionUrdu: exercise.instructionUrdu || "",
    hintUrdu: exercise.hintUrdu || "",
    explainCorrectUrdu: exercise.explainCorrectUrdu || "",
    explainWrongUrdu: exercise.explainWrongUrdu || "",
    prompt: exercise.prompt || "",
    answer: exercise.answer || "",
    documentKind: exercise.document?.documentKind || ""
  };
}

function lessonRecord(lesson) {
  const exercises = lesson.exercises || [];
  return {
    id: lesson.id,
    title: lesson.title,
    unitId: lesson.unitId,
    outcomeUrdu: lesson.outcomeUrdu,
    prerequisites: {
      lessonIds: lesson.prerequisites?.lessonIds || [],
      skills: (lesson.prerequisiteSkillIds || []).map(skillRecord)
    },
    concepts: (lesson.conceptIds || []).map((conceptId) => conceptRecord(conceptId, lesson)),
    skills: (lesson.skillIds || []).map(skillRecord),
    pattern: lesson.pattern || null,
    teachingBlockIds: (lesson.teachingBlocks || []).map((block) => block.id),
    exerciseCounts: {
      total: exercises.length,
      byPhase: countBy(exercises, (exercise) => exercise.phase),
      byType: countBy(exercises, (exercise) => exercise.type)
    },
    runs: (lesson.learning?.runs || []).map((run) => ({
      id: run.id,
      index: run.index,
      outcomeUrdu: run.outcomeUrdu,
      conceptIds: run.conceptIds,
      newConceptIds: run.newConceptIds,
      reviewConceptIds: run.reviewConceptIds,
      prerequisiteSkillIds: run.prerequisiteSkillIds,
      teachingBlockIds: run.teachingBlockIds,
      phases: run.phases
    })),
    exercises: exercises.map(exerciseRecord),
    legacyQuestionCount: (lesson.legacyQuestions || []).length
  };
}

function missionRecord(mission) {
  return {
    id: mission.id,
    title: mission.title,
    unitId: mission.unitId,
    outcomeUrdu: mission.outcomeUrdu,
    completionCheck: Boolean(mission.completionCheck),
    prerequisites: {
      lessonIds: mission.prerequisites?.lessonIds || [],
      skillIds: mission.prerequisiteSkillIds || []
    },
    conceptIds: mission.conceptIds || [],
    assessmentSkillIds: mission.assessmentSkillIds || [],
    variants: (mission.variants || []).map((variant) => ({
      id: variant.id,
      title: variant.title,
      exerciseCounts: {
        total: variant.questions.length,
        byPhase: countBy(variant.questions, (exercise) => exercise.phase),
        byType: countBy(variant.questions, (exercise) => exercise.type)
      },
      exercises: variant.questions.map(exerciseRecord)
    }))
  };
}

const lessons = course.lessons.filter((lesson) => lesson.chapterId === chapterId);
const missions = course.missions.filter((mission) => mission.chapterId === chapterId);
const units = course.units.filter((unit) => unit.chapterId === chapterId);
const reviews = course.reviews.filter((review) => review.chapterId === chapterId);
const chapterConceptIds = new Set([
  ...lessons.flatMap((lesson) => lesson.conceptIds || []),
  ...missions.flatMap((mission) => mission.conceptIds || [])
]);
const chapterSkillIds = new Set([
  ...lessons.flatMap((lesson) => lesson.skillIds || []),
  ...missions.flatMap((mission) => mission.assessmentSkillIds || [])
]);
const sortedExerciseCounts = lessons.map((lesson) => lesson.exercises.length).sort((a, b) => a - b);
const medianExerciseCount = sortedExerciseCounts.length % 2
  ? sortedExerciseCounts[(sortedExerciseCounts.length - 1) / 2]
  : (sortedExerciseCounts[sortedExerciseCounts.length / 2 - 1]
    + sortedExerciseCounts[sortedExerciseCounts.length / 2]) / 2;

const report = {
  generatedAt: new Date().toISOString(),
  schemaVersion: course.schemaVersion,
  chapter: {
    id: chapter.id,
    title: chapter.title,
    outcomeUrdu: chapter.outcomeUrdu,
    prerequisiteChapterIds: chapter.prerequisiteChapterIds,
    prerequisiteSkills: chapter.prerequisiteSkillIds.map(skillRecord),
    contract: chapter.contract
  },
  summary: {
    unitCount: units.length,
    normalLessonCount: lessons.length,
    missionCount: missions.length,
    adaptiveReviewCount: reviews.length,
    associatedConceptCount: chapterConceptIds.size,
    associatedSkillCount: chapterSkillIds.size,
    chapterOwnedSkillCount: course.skills.filter((skill) => skill.chapterId === chapterId).length,
    patternCount: course.patterns.filter((pattern) => pattern.chapterId === chapterId).length,
    runCount: lessons.reduce((total, lesson) => total + lesson.learning.runs.length, 0),
    teachingBlockCount: lessons.reduce((total, lesson) => total + lesson.teachingBlocks.length, 0),
    normalExerciseCount: lessons.reduce((total, lesson) => total + lesson.exercises.length, 0),
    missionExerciseCount: missions.reduce(
      (total, mission) => total + mission.variants.reduce(
        (variantTotal, variant) => variantTotal + variant.questions.length,
        0
      ),
      0
    ),
    normalLessonExerciseRange: [sortedExerciseCounts[0], sortedExerciseCounts.at(-1)],
    normalLessonExerciseMedian: medianExerciseCount,
    newConceptPlacements: lessons.reduce((total, lesson) => total + lesson.newConceptIds.length, 0),
    reviewConceptPlacements: lessons.reduce((total, lesson) => total + lesson.reviewConceptIds.length, 0)
  },
  units: units.map((unit) => ({
    id: unit.id,
    title: unit.title,
    outcomeUrdu: unit.outcomeUrdu,
    lessonIds: unit.lessonIds,
    missionIds: unit.missionIds,
    reviewId: unit.reviewId
  })),
  lessons: lessons.map(lessonRecord),
  missions: missions.map(missionRecord),
  reviews,
  concepts: [...chapterConceptIds].map((conceptId) => conceptRecord(conceptId)),
  skills: [...chapterSkillIds].map(skillRecord)
};

console.log(JSON.stringify(report, null, 2));
