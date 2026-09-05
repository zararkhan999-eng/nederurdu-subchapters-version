export const LESSON_PHASE_ORDER = [
  "brief",
  "scene",
  "decode",
  "notice",
  "rehearse",
  "act",
  "check",
  "complete"
] as const;

export type LessonPhaseId = (typeof LESSON_PHASE_ORDER)[number];
export type LessonId = string;
export type LessonStatus = "locked" | "available" | "current" | "mission" | "completed";
export type VisualTone = "mint" | "blue" | "saffron" | "rose" | "violet" | "terracotta";
export type PortraitTone = "samira" | "yusuf" | "omar";

export interface SpeakerLine {
  readonly speaker: string;
  readonly initial: string;
  readonly tone: PortraitTone;
  readonly dutch: string;
  readonly urdu: string;
}

export interface LessonBrief {
  readonly sceneLabel: string;
  readonly speaker: string;
  readonly initial: string;
  readonly tone: PortraitTone;
  readonly dutch: string;
  readonly urdu: string;
  readonly newLanguage: readonly string[];
}

export interface LessonScene {
  readonly eyebrow: string;
  readonly title: string;
  readonly note: string;
  readonly lines: readonly SpeakerLine[];
}

export interface LexisItem {
  readonly form: string;
  readonly audio: string;
  readonly sound: string;
  readonly meaning: string;
  readonly use: string;
}

export interface LessonDecode {
  readonly eyebrow: string;
  readonly title: string;
  readonly note: string;
  readonly items: readonly LexisItem[];
}

export type PatternTone = "person" | "verb" | "open";

export interface PatternToken {
  readonly text: string;
  readonly tone: PatternTone;
}

export interface PatternContrast {
  readonly label: string;
  readonly text: string;
}

export interface LessonNotice {
  readonly eyebrow: string;
  readonly title: string;
  readonly tokens: readonly PatternToken[];
  readonly meanings: readonly string[];
  readonly ruleDutch: string;
  readonly ruleUrdu: string;
  readonly contrast: readonly [PatternContrast, PatternContrast];
  readonly cautionTitle: string;
  readonly cautionDutch: string;
  readonly cautionUrdu: string;
}

export interface ChoiceTask {
  readonly eyebrow: string;
  readonly title: string;
  readonly speaker: string;
  readonly initial: string;
  readonly tone: PortraitTone;
  readonly promptDutch: string;
  readonly promptUrdu: string;
  readonly instruction: string;
  readonly options: readonly [string, string, string];
  readonly correct: string;
  readonly correctFeedback: string;
  readonly wrongFeedback: string;
  readonly model?: string;
  readonly sign?: string;
  readonly setting?: string;
}

export interface ActField {
  readonly key: string;
  readonly label: string;
  readonly placeholder: string;
  readonly autocomplete?: string;
  readonly maxLength?: number;
}

export interface ActChoice {
  readonly value: string;
  readonly label: string;
}

interface LessonActBase {
  readonly eyebrow: string;
  readonly title: string;
  readonly badge: string;
  readonly visualTone: VisualTone;
  readonly preview: string;
  readonly instruction: string;
  readonly speechHint: string;
}

export type LessonAct =
  | (LessonActBase & {
      readonly fields: readonly ActField[];
      readonly choices?: never;
    })
  | (LessonActBase & {
      readonly choices: readonly ActChoice[];
      readonly fields?: never;
    });

export interface CompletionProof {
  readonly icon: string;
  readonly text: string;
}

export interface LessonComplete {
  readonly dutch: string;
  readonly urdu: string;
  readonly proofs: readonly CompletionProof[];
  readonly nextId: LessonId | null;
}

export interface V5Lesson {
  readonly id: LessonId;
  readonly number: string;
  readonly title: string;
  readonly urduTitle: string;
  readonly canDo: string;
  readonly context: string;
  readonly minutes: number;
  readonly status: LessonStatus;
  readonly icon: string;
  readonly art: string;
  readonly brief: LessonBrief;
  readonly scene: LessonScene;
  readonly decode: LessonDecode;
  readonly notice: LessonNotice;
  readonly rehearse: ChoiceTask;
  readonly act: LessonAct;
  readonly check: ChoiceTask & {
    readonly sign: string;
    readonly setting: string;
  };
  readonly complete: LessonComplete;
  readonly reviewLinks: readonly string[];
}

export interface V5World {
  readonly schemaVersion: 5;
  readonly id: string;
  readonly level: "foundation" | "a1" | "a2";
  readonly title: string;
  readonly urduTitle: string;
  readonly description: string;
  readonly lessons: readonly V5Lesson[];
}

export interface V5Catalog {
  readonly schemaVersion: 5;
  readonly worlds: readonly V5World[];
}
