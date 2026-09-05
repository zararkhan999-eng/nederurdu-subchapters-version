import type { V5Lesson } from "../src-v2/curriculum/schema.js";
import { validateLessonCatalog } from "../src-v2/curriculum/validate.js";
import { ProgressStore, type KeyValueStore } from "../src-v2/state/progress-store.js";
import { LessonSession, LessonTransitionError } from "../src-v2/state/session-engine.js";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}\nExpected: ${String(expected)}\nReceived: ${String(actual)}`);
  }
}

function assertThrows(run: () => void, message: string): void {
  let thrown = false;
  try {
    run();
  } catch (error) {
    thrown = error instanceof LessonTransitionError || error instanceof Error;
  }
  assert(thrown, message);
}

class MemoryStorage implements KeyValueStore {
  private readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }
}

const LESSON: V5Lesson = {
  id: "meet-neighbour",
  number: "1.1",
  title: "Meet your neighbour",
  urduTitle: "اپنے پڑوسی سے ملیں",
  canDo: "I can greet someone and introduce myself.",
  context: "Community centre reception",
  minutes: 9,
  status: "available",
  icon: "hello",
  art: "reception",
  brief: {
    sceneLabel: "At the reception",
    speaker: "Samira",
    initial: "S",
    tone: "samira",
    dutch: "Hoi, ik ben Samira. Hoe heet jij?",
    urdu: "ہیلو، میں سمیرا ہوں۔ آپ کا نام کیا ہے؟",
    newLanguage: ["Hoi", "Ik ben Samira", "Hoe heet jij?"]
  },
  scene: {
    eyebrow: "Meet",
    title: "Listen to a short introduction",
    note: "First understand the situation. Nothing is scored here.",
    lines: [
      { speaker: "Samira", initial: "S", tone: "samira", dutch: "Hoi, ik ben Samira.", urdu: "ہیلو، میں سمیرا ہوں۔" },
      { speaker: "Yusuf", initial: "Y", tone: "yusuf", dutch: "Hoi, ik ben Yusuf.", urdu: "ہیلو، میں یوسف ہوں۔" }
    ]
  },
  decode: {
    eyebrow: "Understand",
    title: "Build the meaning",
    note: "Hear each phrase and connect form, sound, meaning, and use.",
    items: [
      { form: "Hoi", audio: "Hoi", sound: "hoy", meaning: "ہیلو", use: "An informal greeting" },
      { form: "ik", audio: "ik", sound: "ik", meaning: "میں", use: "The person speaking" },
      { form: "ben", audio: "ben", sound: "ben", meaning: "ہوں", use: "The ik-form of zijn" },
      { form: "Hoe heet jij?", audio: "Hoe heet jij?", sound: "hoo hayt yay", meaning: "آپ کا نام کیا ہے؟", use: "Ask someone their name" }
    ]
  },
  notice: {
    eyebrow: "Notice",
    title: "See the reusable pattern",
    tokens: [
      { text: "Ik", tone: "person" },
      { text: "ben", tone: "verb" },
      { text: "Samira", tone: "open" }
    ],
    meanings: ["میں", "ہوں", "سمیرا"],
    ruleDutch: "With ik, use ben.",
    ruleUrdu: "ik کے ساتھ ben استعمال کریں۔",
    contrast: [
      { label: "Statement", text: "Ik ben Samira." },
      { label: "Question", text: "Hoe heet jij?" }
    ],
    cautionTitle: "Keep the verb close",
    cautionDutch: "Say Ik ben, not Ik Samira ben.",
    cautionUrdu: "Ik ben کہیں، Ik Samira ben نہیں۔"
  },
  rehearse: {
    eyebrow: "Rehearse",
    title: "Choose the greeting",
    speaker: "Yusuf",
    initial: "Y",
    tone: "yusuf",
    promptDutch: "You meet Yusuf at the entrance.",
    promptUrdu: "آپ یوسف سے دروازے پر ملتے ہیں۔",
    instruction: "Choose the useful first line.",
    options: ["Hoi, ik ben Amina.", "Tot ziens.", "Dank je wel."],
    correct: "Hoi, ik ben Amina.",
    correctFeedback: "Exactly: you greet first and then say your name.",
    wrongFeedback: "This phrase does not introduce you. Start with Hoi and continue with ik ben plus your name."
  },
  act: {
    eyebrow: "Act",
    title: "Make it yours",
    badge: "Your voice",
    visualTone: "mint",
    preview: "Hoi, ik ben {{name}}.",
    instruction: "Enter your own name and say the line aloud.",
    speechHint: "Keep Hoi short and place stress on your name.",
    fields: [
      { key: "name", label: "Your name", placeholder: "Amina", autocomplete: "name", maxLength: 40 }
    ]
  },
  check: {
    eyebrow: "Fresh check",
    title: "Use it in a new place",
    speaker: "Omar",
    initial: "O",
    tone: "omar",
    promptDutch: "A volunteer welcomes you at the library.",
    promptUrdu: "لائبریری میں ایک رضاکار آپ کا استقبال کرتا ہے۔",
    instruction: "Choose the line that greets and introduces you.",
    options: ["Hoi, ik ben Amina.", "Ik woon in Utrecht.", "Waar is het station?"],
    correct: "Hoi, ik ben Amina.",
    correctFeedback: "Good transfer: the same introduction works in this new setting.",
    wrongFeedback: "This line gives different information. The task asks for a greeting followed by ik ben and your name.",
    sign: "BIBLIOTHEEK",
    setting: "Library welcome desk"
  },
  complete: {
    dutch: "Je kunt iemand begroeten en jezelf voorstellen.",
    urdu: "آپ کسی کو سلام کر کے اپنا تعارف کرا سکتے ہیں۔",
    proofs: [
      { icon: "ear", text: "Understood a real greeting" },
      { icon: "pattern", text: "Used ik ben correctly" },
      { icon: "voice", text: "Made a personal introduction" }
    ],
    nextId: null
  },
  reviewLinks: ["practice:greetings:1d", "practice:greetings:4d"]
};

function testCatalogValidation(): void {
  const valid = validateLessonCatalog([LESSON]);
  assert(valid.ok, `Valid lesson was rejected: ${valid.issues.map((issue) => issue.code).join(", ")}`);
  assertEqual(valid.lessons.length, 1, "Validated catalog should expose its typed lesson.");

  const broken = JSON.parse(JSON.stringify(LESSON)) as { reviewLinks: string[] };
  broken.reviewLinks = [];
  const invalid = validateLessonCatalog([broken]);
  assert(!invalid.ok, "Lesson without retrieval links must fail validation.");
  assert(invalid.issues.some((issue) => issue.code === "review.links"), "Validation should explain the missing retrieval links.");
}

function completeSession(): LessonSession {
  const session = new LessonSession(LESSON);
  assertEqual(session.phase, "brief", "A lesson must start at its brief.");
  assertThrows(() => session.jumpTo("complete"), "Untaught phases must remain locked.");

  session.advance();
  session.advance();
  session.advance();
  session.advance();
  assertEqual(session.phase, "rehearse", "Teaching must precede the first scored phase.");

  session.chooseAnswer("Tot ziens.");
  const repair = session.checkAnswer();
  assert(!repair.correct, "The distractor must be marked wrong.");
  assert(repair.feedback.includes("Hoi"), "Wrong-answer feedback must contain a useful repair.");
  assertEqual(repair.attempt, 1, "The first checked answer should be attempt one.");
  assertThrows(() => session.advance(), "A wrong answer must not unlock the next phase.");

  session.retryAnswer();
  session.chooseAnswer(LESSON.rehearse.correct);
  assert(session.checkAnswer().correct, "The model answer must pass rehearsal.");
  session.advance();
  assertEqual(session.phase, "act", "Correct rehearsal should unlock personal production.");
  assertThrows(() => session.advance(), "An empty personal response must not be skipped.");
  session.setResponse("name", "Amina");
  session.advance();
  assertEqual(session.phase, "check", "Personal production should lead to fresh transfer.");

  session.chooseAnswer("Ik woon in Utrecht.");
  assert(!session.checkAnswer().correct, "Fresh-check distractor must fail.");
  session.retryAnswer();
  session.chooseAnswer(LESSON.check.correct);
  assert(session.checkAnswer().correct, "Fresh-check model answer must pass.");
  session.advance();
  assertEqual(session.phase, "complete", "A successful fresh check should complete the lesson.");
  assert(session.serialize().completed, "Completion must be explicit in the session snapshot.");
  return session;
}

function testSessionRestore(session: LessonSession): void {
  const snapshot = session.serialize();
  const restored = new LessonSession(LESSON, snapshot);
  assertEqual(restored.phase, "complete", "A valid V5 snapshot should restore its phase.");
  assertEqual(restored.serialize().responses.name, "Amina", "A restored session should preserve personal responses.");
  assertEqual(restored.serialize().attempts.rehearse, 2, "A restored session should preserve attempt evidence.");
}

function testProgressStore(session: LessonSession): void {
  const storage = new MemoryStorage();
  let clock = new Date("2026-09-05T09:00:00.000Z");
  storage.setItem(ProgressStore.PROTOTYPE_KEY, JSON.stringify({
    completedLessons: ["legacy-intro"],
    responses: { "legacy-intro": { name: "Amina" } },
    route: "journey"
  }));
  const store = new ProgressStore(storage, () => clock);
  const migrated = store.load();
  assertEqual(migrated.schemaVersion, 5, "Prototype progress must migrate to schema V5.");
  assert(Boolean(migrated.completedLessons["legacy-intro"]), "Migration must retain completed lesson evidence.");
  assert(Boolean(migrated.legacyRecovery), "Migration must preserve the original payload for recovery.");

  const saved = store.saveSession(session.serialize());
  assertEqual(saved.sessions[LESSON.id]?.phase, "complete", "The versioned store should save session state.");
  const completed = store.completeLesson(LESSON, session.serialize());
  assertEqual(completed.reviewQueue.length, 2, "Lesson completion must schedule every retrieval link once.");
  assertEqual(store.dueReviews().length, 0, "New review items must not be due immediately.");

  clock = new Date("2026-09-07T09:00:00.000Z");
  const due = store.dueReviews();
  assertEqual(due.length, 1, "The one-day retrieval item should become due first.");
  const successful = store.recordReview(due[0].id, true);
  const rescheduled = successful.reviewQueue.find((item) => item.id === due[0].id);
  assertEqual(rescheduled?.intervalIndex, 1, "A successful retrieval should increase its interval.");

  const lapsed = store.recordReview(due[0].id, false);
  const repaired = lapsed.reviewQueue.find((item) => item.id === due[0].id);
  assertEqual(repaired?.intervalIndex, 0, "A lapse should return the item to the repair interval.");
  assertEqual(repaired?.lapses, 1, "A lapse should be recorded as learning evidence.");
}

testCatalogValidation();
const completedSession = completeSession();
testSessionRestore(completedSession);
testProgressStore(completedSession);

console.log("V2 runtime foundation tests passed: catalog, session, migration, and review scheduling.");
