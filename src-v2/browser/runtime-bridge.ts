import { LESSON_PHASE_ORDER, type V5Lesson } from "../curriculum/schema.js";
import { validateLessonCatalog } from "../curriculum/validate.js";
import { ProgressStore, type KeyValueStore } from "../state/progress-store.js";
import { LessonSession, type SessionSnapshot } from "../state/session-engine.js";

declare global {
  interface Window {
    NederUrduV2LessonCatalog?: unknown;
    NederUrduV2Runtime?: typeof runtime;
  }
}

const validation = validateLessonCatalog(window.NederUrduV2LessonCatalog);

if (!validation.ok) {
  const summary = validation.issues
    .slice(0, 5)
    .map((issue) => `${issue.path}: ${issue.message}`)
    .join(" | ");
  throw new Error(`NederUrdu V2 catalog failed its production contract. ${summary}`);
}

export const runtimeCatalog: readonly V5Lesson[] = validation.lessons;

export const runtime = Object.freeze({
  schemaVersion: 5 as const,
  phaseOrder: LESSON_PHASE_ORDER,
  catalog: runtimeCatalog,
  createSession(lesson: V5Lesson, restored?: SessionSnapshot): LessonSession {
    return new LessonSession(lesson, restored);
  },
  createProgressStore(storage: KeyValueStore, now?: () => Date): ProgressStore {
    return new ProgressStore(storage, now);
  }
});

window.NederUrduV2Runtime = runtime;
window.dispatchEvent(new CustomEvent("nederurdu:v2-runtime-ready", {
  detail: { schemaVersion: runtime.schemaVersion, lessonCount: runtimeCatalog.length }
}));
