import { LESSON_PHASE_ORDER } from "../curriculum/schema.js";
import { validateLessonCatalog } from "../curriculum/validate.js";
import { ProgressStore } from "../state/progress-store.js";
import { LessonSession } from "../state/session-engine.js";
const validation = validateLessonCatalog(window.NederUrduV2LessonCatalog);
if (!validation.ok) {
    const summary = validation.issues
        .slice(0, 5)
        .map((issue) => `${issue.path}: ${issue.message}`)
        .join(" | ");
    throw new Error(`NederUrdu V2 catalog failed its production contract. ${summary}`);
}
export const runtimeCatalog = validation.lessons;
export const runtime = Object.freeze({
    schemaVersion: 5,
    phaseOrder: LESSON_PHASE_ORDER,
    catalog: runtimeCatalog,
    createSession(lesson, restored) {
        return new LessonSession(lesson, restored);
    },
    createProgressStore(storage, now) {
        return new ProgressStore(storage, now);
    }
});
window.NederUrduV2Runtime = runtime;
window.dispatchEvent(new CustomEvent("nederurdu:v2-runtime-ready", {
    detail: { schemaVersion: runtime.schemaVersion, lessonCount: runtimeCatalog.length }
}));
