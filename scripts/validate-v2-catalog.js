const { existsSync } = require("fs");
const { resolve } = require("path");

const ROOT = resolve(__dirname, "..");
const VALIDATOR = resolve(ROOT, ".v2-build/src-v2/curriculum/validate.js");

if (!existsSync(VALIDATOR)) {
  throw new Error("Compiled V2 validator is missing. Run npm run v2:test first.");
}

global.window = {};
require(resolve(ROOT, "v2-prototype/lesson-data.js"));
const { validateLessonCatalog } = require(VALIDATOR);
const report = validateLessonCatalog(global.window.NederUrduV2LessonCatalog);

if (!report.ok) {
  console.error(JSON.stringify({ ok: false, issues: report.issues }, null, 2));
  process.exitCode = 1;
} else {
  console.log(`V2 production catalog passed the V5 contract: ${report.lessons.length} lessons.`);
}
