"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtime = exports.runtimeCatalog = void 0;
const schema_js_1 = require("../curriculum/schema.js");
const validate_js_1 = require("../curriculum/validate.js");
const progress_store_js_1 = require("../state/progress-store.js");
const session_engine_js_1 = require("../state/session-engine.js");
const validation = (0, validate_js_1.validateLessonCatalog)(window.NederUrduV2LessonCatalog);
if (!validation.ok) {
    const summary = validation.issues
        .slice(0, 5)
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join(" | ");
    throw new Error(`NederUrdu V2 catalog failed its production contract. ${summary}`);
}
exports.runtimeCatalog = validation.lessons;
exports.runtime = Object.freeze({
    schemaVersion: 5,
    phaseOrder: schema_js_1.LESSON_PHASE_ORDER,
    catalog: exports.runtimeCatalog,
    createSession(lesson, restored) {
        return new session_engine_js_1.LessonSession(lesson, restored);
    },
    createProgressStore(storage, now) {
        return new progress_store_js_1.ProgressStore(storage, now);
    }
});
window.NederUrduV2Runtime = exports.runtime;
window.dispatchEvent(new CustomEvent("nederurdu:v2-runtime-ready", {
    detail: { schemaVersion: exports.runtime.schemaVersion, lessonCount: exports.runtimeCatalog.length }
}));
