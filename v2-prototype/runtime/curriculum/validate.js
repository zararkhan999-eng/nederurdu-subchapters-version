function isRecord(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
}
function stringArray(value) {
    return Array.isArray(value) && value.every(isNonEmptyString);
}
export function validateLessonCatalog(input) {
    const issues = [];
    const add = (path, code, message) => {
        issues.push({ path, code, message });
    };
    if (!Array.isArray(input)) {
        add("catalog", "catalog.type", "Catalog must be an array.");
        return { ok: false, issues, lessons: [] };
    }
    if (input.length === 0)
        add("catalog", "catalog.empty", "Catalog must contain at least one lesson.");
    const ids = new Set();
    input.forEach((value, index) => {
        const path = "lessons[" + index + "]";
        if (!isRecord(value)) {
            add(path, "lesson.type", "Lesson must be an object.");
            return;
        }
        const id = isNonEmptyString(value.id) ? value.id : "";
        if (!id)
            add(path + ".id", "lesson.id", "Lesson id is required.");
        if (id && ids.has(id))
            add(path + ".id", "lesson.duplicate", "Lesson id must be unique.");
        if (id)
            ids.add(id);
        for (const key of ["number", "title", "urduTitle", "canDo", "context", "status", "icon", "art"]) {
            if (!isNonEmptyString(value[key]))
                add(path + "." + key, "lesson.text", key + " must be a non-empty string.");
        }
        if (!Number.isInteger(value.minutes) || Number(value.minutes) < 6 || Number(value.minutes) > 15) {
            add(path + ".minutes", "lesson.duration", "Lesson duration must be an integer from 6 to 15 minutes.");
        }
        validateBrief(value.brief, path + ".brief", add);
        validateScene(value.scene, path + ".scene", add);
        validateDecode(value.decode, path + ".decode", add);
        validateNotice(value.notice, path + ".notice", add);
        validateChoiceTask(value.rehearse, path + ".rehearse", false, add);
        validateAct(value.act, path + ".act", add);
        validateChoiceTask(value.check, path + ".check", true, add);
        validateComplete(value.complete, path + ".complete", add);
        if (!stringArray(value.reviewLinks) || value.reviewLinks.length < 2) {
            add(path + ".reviewLinks", "review.links", "At least two retrieval links are required.");
        }
        if (isRecord(value.rehearse) && isRecord(value.check) && value.rehearse.promptDutch === value.check.promptDutch) {
            add(path + ".check.promptDutch", "transfer.repeated", "Fresh transfer must not repeat the guided prompt.");
        }
    });
    input.forEach((value, index) => {
        if (!isRecord(value) || !isRecord(value.complete))
            return;
        const expectedNext = isRecord(input[index + 1]) && isNonEmptyString(input[index + 1].id) ? input[index + 1].id : null;
        if ((value.complete.nextId ?? null) !== expectedNext) {
            add("lessons[" + index + "].complete.nextId", "journey.chain", "Completion must point to the next catalog lesson or review.");
        }
    });
    return {
        ok: issues.length === 0,
        issues,
        lessons: issues.length === 0 ? input : []
    };
}
function validateBrief(value, path, add) {
    if (!isRecord(value)) {
        add(path, "brief.type", "Brief is required.");
        return;
    }
    for (const key of ["sceneLabel", "speaker", "initial", "tone", "dutch", "urdu"]) {
        if (!isNonEmptyString(value[key]))
            add(path + "." + key, "brief.text", key + " is required.");
    }
    if (!stringArray(value.newLanguage) || value.newLanguage.length < 3 || value.newLanguage.length > 5) {
        add(path + ".newLanguage", "brief.scope", "Brief must preview 3 to 5 useful whole phrases.");
    }
}
function validateScene(value, path, add) {
    if (!isRecord(value)) {
        add(path, "scene.type", "Scene is required.");
        return;
    }
    for (const key of ["eyebrow", "title", "note"]) {
        if (!isNonEmptyString(value[key]))
            add(path + "." + key, "scene.text", key + " is required.");
    }
    if (!Array.isArray(value.lines) || value.lines.length < 2) {
        add(path + ".lines", "scene.exchange", "Scene must contain at least two speaker turns.");
        return;
    }
    value.lines.forEach((line, index) => {
        if (!isRecord(line) || !["speaker", "initial", "tone", "dutch", "urdu"].every((key) => isNonEmptyString(line[key]))) {
            add(path + ".lines[" + index + "]", "scene.line", "Every speaker turn needs identity, Dutch, and Urdu.");
        }
    });
}
function validateDecode(value, path, add) {
    if (!isRecord(value)) {
        add(path, "decode.type", "Decode section is required.");
        return;
    }
    if (!Array.isArray(value.items) || value.items.length < 4 || value.items.length > 5) {
        add(path + ".items", "decode.scope", "Decode must contain 4 to 5 focused items.");
        return;
    }
    value.items.forEach((item, index) => {
        if (!isRecord(item) || !["form", "audio", "sound", "meaning", "use"].every((key) => isNonEmptyString(item[key]))) {
            add(path + ".items[" + index + "]", "decode.integration", "Every item needs form, audio, sound support, meaning, and use.");
        }
    });
}
function validateNotice(value, path, add) {
    if (!isRecord(value)) {
        add(path, "notice.type", "Notice section is required.");
        return;
    }
    for (const key of ["eyebrow", "title", "ruleDutch", "ruleUrdu", "cautionTitle", "cautionDutch", "cautionUrdu"]) {
        if (!isNonEmptyString(value[key]))
            add(path + "." + key, "notice.text", key + " is required.");
    }
    if (!Array.isArray(value.tokens) || value.tokens.length < 2)
        add(path + ".tokens", "notice.pattern", "A visible sentence pattern is required.");
    if (!stringArray(value.meanings) || value.meanings.length !== (Array.isArray(value.tokens) ? value.tokens.length : 0)) {
        add(path + ".meanings", "notice.meanings", "Every pattern token needs a matching Urdu meaning.");
    }
    if (!Array.isArray(value.contrast) || value.contrast.length !== 2)
        add(path + ".contrast", "notice.contrast", "Exactly one useful contrast pair is required.");
}
function validateChoiceTask(value, path, needsSetting, add) {
    if (!isRecord(value)) {
        add(path, "task.type", "Choice task is required.");
        return;
    }
    for (const key of ["eyebrow", "title", "speaker", "initial", "tone", "promptDutch", "promptUrdu", "instruction", "correct", "correctFeedback", "wrongFeedback"]) {
        if (!isNonEmptyString(value[key]))
            add(path + "." + key, "task.text", key + " is required.");
    }
    if (!stringArray(value.options) || value.options.length !== 3) {
        add(path + ".options", "task.options", "Choice task must contain exactly three options.");
    }
    else if (!value.options.includes(value.correct)) {
        add(path + ".correct", "task.correct", "Correct answer must exist in options.");
    }
    if (needsSetting && (!isNonEmptyString(value.sign) || !isNonEmptyString(value.setting))) {
        add(path + ".setting", "transfer.setting", "Fresh transfer requires a distinct real-world sign and setting.");
    }
    if (isNonEmptyString(value.wrongFeedback) && value.wrongFeedback.trim().length < 20) {
        add(path + ".wrongFeedback", "feedback.generic", "Repair feedback is too generic.");
    }
}
function validateAct(value, path, add) {
    if (!isRecord(value)) {
        add(path, "act.type", "Personal act is required.");
        return;
    }
    for (const key of ["eyebrow", "title", "badge", "visualTone", "preview", "instruction", "speechHint"]) {
        if (!isNonEmptyString(value[key]))
            add(path + "." + key, "act.text", key + " is required.");
    }
    const fields = Array.isArray(value.fields) ? value.fields : [];
    const choices = Array.isArray(value.choices) ? value.choices : [];
    if ((fields.length > 0) === (choices.length > 0)) {
        add(path, "act.mode", "Act must use either personalized fields or bounded choices.");
    }
    const keys = fields
        .filter(isRecord)
        .map((field) => field.key)
        .filter(isNonEmptyString)
        .concat(choices.length ? ["choice"] : []);
    const preview = isNonEmptyString(value.preview) ? value.preview : "";
    const placeholders = [...preview.matchAll(/\{\{(?:(?:spelled):)?([a-z]+)\}\}/g)].map((match) => match[1]);
    placeholders.forEach((key) => {
        if (!keys.includes(key))
            add(path + ".preview", "act.placeholder", "Placeholder " + key + " has no response control.");
    });
    keys.forEach((key) => {
        if (!placeholders.includes(key))
            add(path, "act.unused", "Response control " + key + " is absent from the preview.");
    });
}
function validateComplete(value, path, add) {
    if (!isRecord(value)) {
        add(path, "complete.type", "Completion section is required.");
        return;
    }
    if (!isNonEmptyString(value.dutch) || !isNonEmptyString(value.urdu))
        add(path, "complete.text", "Completion needs Dutch and Urdu can-do copy.");
    if (!Array.isArray(value.proofs) || value.proofs.length < 3)
        add(path + ".proofs", "complete.proofs", "At least three evidence statements are required.");
}
