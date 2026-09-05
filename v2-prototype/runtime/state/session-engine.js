import { LESSON_PHASE_ORDER } from "../curriculum/schema.js";
export class LessonTransitionError extends Error {
    constructor(message) {
        super(message);
        this.name = "LessonTransitionError";
    }
}
export class LessonSession {
    lesson;
    phaseIndex = 0;
    maxUnlockedIndex = 0;
    selectedAnswer = null;
    checked = false;
    responses = {};
    attempts = { rehearse: 0, check: 0 };
    completed = false;
    constructor(lesson, restored) {
        this.lesson = lesson;
        if (restored)
            this.restore(restored);
    }
    get phase() {
        return LESSON_PHASE_ORDER[this.phaseIndex];
    }
    get availablePhases() {
        return LESSON_PHASE_ORDER.slice(0, this.maxUnlockedIndex + 1);
    }
    get canAdvance() {
        if (this.phase === "complete")
            return false;
        if (this.phase === "rehearse" || this.phase === "check") {
            return this.checked && this.selectedAnswer === this.taskFor(this.phase).correct;
        }
        if (this.phase === "act")
            return this.isActReady();
        return true;
    }
    chooseAnswer(answer) {
        if (this.phase !== "rehearse" && this.phase !== "check") {
            throw new LessonTransitionError("Answers can only be selected during rehearsal or fresh check.");
        }
        if (!this.taskFor(this.phase).options.includes(answer)) {
            throw new LessonTransitionError("Selected answer is not part of this task.");
        }
        this.selectedAnswer = answer;
        this.checked = false;
    }
    checkAnswer() {
        if (this.phase !== "rehearse" && this.phase !== "check") {
            throw new LessonTransitionError("There is no scored choice to check in this phase.");
        }
        if (!this.selectedAnswer)
            throw new LessonTransitionError("Choose an answer before checking.");
        const phase = this.phase;
        const task = this.taskFor(phase);
        this.attempts[phase] += 1;
        this.checked = true;
        const correct = this.selectedAnswer === task.correct;
        return {
            correct,
            feedback: correct ? task.correctFeedback : task.wrongFeedback,
            attempt: this.attempts[phase]
        };
    }
    retryAnswer() {
        if (this.phase !== "rehearse" && this.phase !== "check") {
            throw new LessonTransitionError("Retry is only available after a scored choice.");
        }
        if (!this.checked)
            throw new LessonTransitionError("Check the current answer before retrying.");
        this.selectedAnswer = null;
        this.checked = false;
    }
    setResponse(key, value) {
        if (this.phase !== "act")
            throw new LessonTransitionError("Personal responses can only be changed during Act.");
        const fields = this.lesson.act.fields || [];
        if (!fields.some((field) => field.key === key))
            throw new LessonTransitionError("Unknown personal response field.");
        this.responses[key] = value.trim();
    }
    chooseAct(value) {
        if (this.phase !== "act")
            throw new LessonTransitionError("Act choices can only be changed during Act.");
        const choices = this.lesson.act.choices || [];
        if (!choices.some((choice) => choice.value === value))
            throw new LessonTransitionError("Unknown Act choice.");
        this.responses.choice = value;
    }
    advance() {
        if (!this.canAdvance) {
            if (this.phase === "rehearse" || this.phase === "check") {
                throw new LessonTransitionError("A correct checked answer is required before continuing.");
            }
            if (this.phase === "act")
                throw new LessonTransitionError("Complete the personal response before continuing.");
            throw new LessonTransitionError("This session cannot advance.");
        }
        this.phaseIndex = Math.min(LESSON_PHASE_ORDER.length - 1, this.phaseIndex + 1);
        this.maxUnlockedIndex = Math.max(this.maxUnlockedIndex, this.phaseIndex);
        this.selectedAnswer = null;
        this.checked = false;
        if (this.phase === "complete")
            this.completed = true;
        return this.phase;
    }
    back() {
        this.phaseIndex = Math.max(0, this.phaseIndex - 1);
        this.selectedAnswer = null;
        this.checked = false;
        return this.phase;
    }
    jumpTo(phase) {
        const nextIndex = LESSON_PHASE_ORDER.indexOf(phase);
        if (nextIndex < 0 || nextIndex > this.maxUnlockedIndex) {
            throw new LessonTransitionError("Cannot skip into an untaught lesson phase.");
        }
        this.phaseIndex = nextIndex;
        this.selectedAnswer = null;
        this.checked = false;
    }
    serialize() {
        return {
            schemaVersion: 5,
            lessonId: this.lesson.id,
            phase: this.phase,
            maxUnlockedIndex: this.maxUnlockedIndex,
            selectedAnswer: this.selectedAnswer,
            checked: this.checked,
            responses: { ...this.responses },
            attempts: { ...this.attempts },
            completed: this.completed
        };
    }
    isActReady() {
        const fields = this.lesson.act.fields || [];
        const choices = this.lesson.act.choices || [];
        return fields.every((field) => Boolean(this.responses[field.key]?.trim()))
            && (!choices.length || choices.some((choice) => choice.value === this.responses.choice));
    }
    taskFor(phase) {
        return phase === "rehearse" ? this.lesson.rehearse : this.lesson.check;
    }
    restore(snapshot) {
        if (snapshot.schemaVersion !== 5 || snapshot.lessonId !== this.lesson.id) {
            throw new LessonTransitionError("Session snapshot does not match this V5 lesson.");
        }
        const phaseIndex = LESSON_PHASE_ORDER.indexOf(snapshot.phase);
        if (phaseIndex < 0)
            throw new LessonTransitionError("Session snapshot contains an unknown phase.");
        const maxUnlockedIndex = Math.max(0, Math.min(LESSON_PHASE_ORDER.length - 1, snapshot.maxUnlockedIndex));
        if (phaseIndex > maxUnlockedIndex)
            throw new LessonTransitionError("Session snapshot unlock state is inconsistent.");
        this.phaseIndex = phaseIndex;
        this.maxUnlockedIndex = maxUnlockedIndex;
        this.selectedAnswer = snapshot.selectedAnswer;
        this.checked = snapshot.checked;
        this.responses = { ...snapshot.responses };
        this.attempts = {
            rehearse: Math.max(0, snapshot.attempts.rehearse),
            check: Math.max(0, snapshot.attempts.check)
        };
        this.completed = snapshot.completed;
    }
}
