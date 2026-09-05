import type { V5Lesson } from "../curriculum/schema.js";
import type { SessionSnapshot } from "./session-engine.js";

export interface KeyValueStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface CompletedLessonRecord {
  readonly completedAt: string;
  readonly responses: Readonly<Record<string, string>>;
}

export interface ReviewQueueItem {
  readonly id: string;
  readonly sourceLessonId: string;
  readonly dueAt: string;
  readonly intervalIndex: number;
  readonly lapses: number;
}

export interface ProgressV5 {
  readonly schemaVersion: 5;
  readonly revision: number;
  readonly updatedAt: string;
  readonly completedLessons: Readonly<Record<string, CompletedLessonRecord>>;
  readonly sessions: Readonly<Record<string, SessionSnapshot>>;
  readonly reviewQueue: readonly ReviewQueueItem[];
  readonly legacyRecovery?: unknown;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const SUCCESS_INTERVALS = [1, 4, 14, 30, 60] as const;

export class ProgressStore {
  static readonly STORAGE_KEY = "nederurdu-progress-v5";
  static readonly PROTOTYPE_KEY = "nederurdu-v2-prototype-state";

  constructor(
    private readonly storage: KeyValueStore,
    private readonly now: () => Date = () => new Date()
  ) {}

  load(): ProgressV5 {
    const current = this.parse(this.storage.getItem(ProgressStore.STORAGE_KEY));
    if (isProgressV5(current)) return current;
    return this.migratePrototype();
  }

  saveSession(snapshot: SessionSnapshot): ProgressV5 {
    const state = this.load();
    return this.commit({
      ...state,
      sessions: { ...state.sessions, [snapshot.lessonId]: snapshot }
    });
  }

  completeLesson(lesson: V5Lesson, snapshot: SessionSnapshot): ProgressV5 {
    if (!snapshot.completed || snapshot.lessonId !== lesson.id) {
      throw new Error("Only a completed matching session can update lesson progress.");
    }
    const state = this.load();
    const completedAt = this.now().toISOString();
    const existingReviewIds = new Set(state.reviewQueue.map((item) => item.id));
    const reviewQueue = [...state.reviewQueue];
    lesson.reviewLinks.forEach((id, index) => {
      if (existingReviewIds.has(id)) return;
      reviewQueue.push({
        id,
        sourceLessonId: lesson.id,
        dueAt: new Date(this.now().getTime() + this.initialDelayDays(id, index) * DAY_MS).toISOString(),
        intervalIndex: 0,
        lapses: 0
      });
    });
    return this.commit({
      ...state,
      completedLessons: {
        ...state.completedLessons,
        [lesson.id]: { completedAt, responses: { ...snapshot.responses } }
      },
      sessions: { ...state.sessions, [lesson.id]: snapshot },
      reviewQueue
    });
  }

  dueReviews(): readonly ReviewQueueItem[] {
    const now = this.now().getTime();
    return this.load().reviewQueue
      .filter((item) => Date.parse(item.dueAt) <= now)
      .sort((a, b) => Date.parse(a.dueAt) - Date.parse(b.dueAt));
  }

  recordReview(id: string, successful: boolean): ProgressV5 {
    const state = this.load();
    let found = false;
    const reviewQueue = state.reviewQueue.map((item) => {
      if (item.id !== id) return item;
      found = true;
      const intervalIndex = successful
        ? Math.min(SUCCESS_INTERVALS.length - 1, item.intervalIndex + 1)
        : 0;
      const days = successful ? SUCCESS_INTERVALS[intervalIndex] : 1;
      return {
        ...item,
        intervalIndex,
        lapses: successful ? item.lapses : item.lapses + 1,
        dueAt: new Date(this.now().getTime() + days * DAY_MS).toISOString()
      };
    });
    if (!found) throw new Error("Unknown review item.");
    return this.commit({ ...state, reviewQueue });
  }

  resetV5(): void {
    this.storage.removeItem(ProgressStore.STORAGE_KEY);
  }

  private migratePrototype(): ProgressV5 {
    const legacy = this.parse(this.storage.getItem(ProgressStore.PROTOTYPE_KEY));
    const base = this.emptyState(legacy);
    if (!isRecord(legacy)) return base;
    const ids = Array.isArray(legacy.completedLessons)
      ? legacy.completedLessons.filter((id): id is string => typeof id === "string")
      : [];
    const responses = isRecord(legacy.responses) ? legacy.responses : {};
    const completedLessons: Record<string, CompletedLessonRecord> = {};
    ids.forEach((id) => {
      const response = isRecord(responses[id])
        ? Object.fromEntries(Object.entries(responses[id]).filter((entry): entry is [string, string] => typeof entry[1] === "string"))
        : {};
      completedLessons[id] = { completedAt: this.now().toISOString(), responses: response };
    });
    return this.commit({ ...base, completedLessons });
  }

  private emptyState(legacyRecovery?: unknown): ProgressV5 {
    return {
      schemaVersion: 5,
      revision: 0,
      updatedAt: this.now().toISOString(),
      completedLessons: {},
      sessions: {},
      reviewQueue: [],
      ...(legacyRecovery === null || legacyRecovery === undefined ? {} : { legacyRecovery })
    };
  }

  private commit(next: ProgressV5): ProgressV5 {
    const committed: ProgressV5 = {
      ...next,
      schemaVersion: 5,
      revision: next.revision + 1,
      updatedAt: this.now().toISOString()
    };
    this.storage.setItem(ProgressStore.STORAGE_KEY, JSON.stringify(committed));
    return committed;
  }

  private parse(raw: string | null): unknown {
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  private initialDelayDays(id: string, index: number): number {
    const match = id.match(/:(\d+)d$/);
    return match ? Math.max(1, Number(match[1])) : SUCCESS_INTERVALS[Math.min(index, SUCCESS_INTERVALS.length - 1)];
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isProgressV5(value: unknown): value is ProgressV5 {
  return isRecord(value)
    && value.schemaVersion === 5
    && typeof value.revision === "number"
    && isRecord(value.completedLessons)
    && isRecord(value.sessions)
    && Array.isArray(value.reviewQueue);
}
