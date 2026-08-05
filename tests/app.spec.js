const { test, expect } = require("@playwright/test");

const STORAGE_KEY = "nederurdu-progress-v4";
const LEGACY_STORAGE_KEY = "nederurdu-progress-v3";
// Add the next chapter only when the previous one is frozen and that next
// chapter enters its permitted authoring/acceptance cycle. A1 and A2 keep
// their explicit diagnostics, but unfinished later content cannot block A0.
const CURRENT_CHAPTER_GATE_IDS = ["a0"];

async function openCleanApp(page, progress = {}) {
  await page.addInitScript(({ key, value }) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, {
    key: STORAGE_KEY,
    value: {
      completedLessons: [],
      scores: {},
      seenQuestionIds: [],
      missionVariantRuns: {},
      skillAttempts: {},
      skillReviewHistory: {},
      lessonMastery: {},
      skillMastery: {},
      lessonRunProgress: {},
      totalXp: 0,
      practiceDays: [],
      mistakes: [],
      schemaVersion: 4,
      speechProfileVersion: 2,
      settings: {
        soundEffects: true,
        pronunciation: true,
        beginnerMode: true,
        largeText: false,
        slowAudio: true,
        extraUrduHelp: true
      },
      selectedChapterId: "a0",
      lastLessonId: "a0-letters-1",
      ...progress
    }
  });
  await page.goto("/");
}

async function openFreshApp(page) {
  await page.addInitScript(({ current, legacy }) => {
    localStorage.removeItem(current);
    localStorage.removeItem(legacy);
  }, { current: STORAGE_KEY, legacy: LEGACY_STORAGE_KEY });
  await page.goto("/");
}

async function setLessonSkillStatus(page, lessonIds, status = "introduced") {
  await page.evaluate(({ ids, nextStatus }) => {
    const lessons = window.NEDERURDU_COURSE.lessons.filter((lesson) => ids.includes(lesson.id));
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4") || "{}");
    const skillMastery = { ...(saved.skillMastery || {}) };
    for (const lesson of lessons) {
      for (const skillId of lesson.skillIds || []) {
        skillMastery[skillId] = { status: nextStatus, lessonId: lesson.id };
      }
    }
    saveProgress({ ...saved, skillMastery });
  }, { ids: lessonIds, nextStatus: status });
}

async function makeMissionReady(page, missionId) {
  await page.evaluate((id) => {
    const mission = window.NEDERURDU_COURSE.missions.find((item) => item.id === id);
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4") || "{}");
    const skillMastery = { ...(saved.skillMastery || {}) };
    for (const skillId of mission.prerequisites.skillIds) {
      skillMastery[skillId] = { status: "practiced", lessonId: mission.id };
    }
    saveProgress({ ...saved, skillMastery });
  }, missionId);
}

test("cinematic bilingual launch hands off cleanly to the app", async ({ page }) => {
  await openCleanApp(page);

  await expect(page.locator(".launch-screen")).toHaveClass(/is-playing/);
  await expect(page.locator(".launch-language")).toHaveCount(2);
  await expect(page.locator(".launch-orbit")).toHaveCount(3);
  await expect(page.locator(".launch-wordmark")).toContainText("NederUrdu");
  await expect(page.locator(".launch-progress")).toHaveCount(1);

  await page.evaluate(() => finishLaunch());
  await expect(page.locator("body")).not.toHaveClass(/launching/);
  await expect(page.locator(".learn-screen.beginner-home")).toBeVisible();
  await expect(page.locator(".bottom-nav")).toBeVisible();
});

test("fresh first launch opens the home map with all chapters visible", async ({ page }) => {
  await openFreshApp(page);

  await expect(page.locator(".learn-screen.beginner-home")).toBeVisible();
  await expect(page.locator(".guided-start-screen")).toHaveCount(0);
  await expect(page.locator('[data-action="chapter"]')).toHaveCount(3);
  await expect(page.locator(".today-stats")).toHaveCount(0);
  await expect(page.locator(".bottom-nav .nav-button")).toHaveCount(3);
  await page.locator('[data-action="preview"]:visible').first().click();
  await expect(page.locator(".learning-preview")).toBeVisible();
  await page.locator('.learning-preview [data-action="start"]').click();
  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".learning-phase-header")).toBeVisible();
});

test("the cached course and lesson preview remain available offline", async ({ page, context }) => {
  test.setTimeout(120_000);
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  await openCleanApp(page);
  const cacheState = await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise((resolve) => {
        navigator.serviceWorker.addEventListener("controllerchange", resolve, { once: true });
      });
    }
    const cacheNames = await caches.keys();
    const courseResponse = await caches.match(new URL("course-data.js", location.href));
    const appResponse = await caches.match(new URL("app.js", location.href));
    return {
      controlled: Boolean(navigator.serviceWorker.controller),
      cacheNames,
      courseCached: Boolean(courseResponse),
      appCached: Boolean(appResponse)
    };
  });

  expect(cacheState.controlled).toBe(true);
  expect(cacheState.cacheNames.some((name) => name.startsWith("nederurdu-"))).toBe(true);
  expect(cacheState.courseCached).toBe(true);
  expect(cacheState.appCached).toBe(true);

  await context.setOffline(true);
  try {
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.evaluate(() => finishLaunch());
    await expect(page.locator("#app")).toBeVisible();
    await expect(page.locator('[data-action="chapter"]')).toHaveCount(3);
    expect(await page.evaluate(() => window.NEDERURDU_COURSE?.schemaVersion)).toBe(4);
    await page.evaluate(() => {
      const lesson = window.NEDERURDU_COURSE.lessons.find((candidate) => {
        const firstRun = candidate.learning?.runs?.[0];
        if (!firstRun) return false;
        return Boolean(buildLearningFirstSession(candidate, firstRun)[0]?.visualId);
      });
      if (!lesson) throw new Error("No lesson starts with an offline teaching visual.");
      showLessonPreview(lesson.id);
    });
    expect(runtimeErrors).toEqual([]);
    await expect(page.locator(".learning-preview")).toBeVisible();
    await expect(page.locator(".learning-preview-goal")).not.toHaveText("");
    await page.locator('.learning-preview [data-action="start"]').click();
    await expect(page.locator(".learning-teaching-card")).toBeVisible();
    const teachingImage = page.locator(".learning-teaching-card img").first();
    await expect(teachingImage).toBeVisible();
    await expect.poll(async () => teachingImage.evaluate((image) => (
      image.complete ? image.naturalWidth : 0
    ))).toBeGreaterThan(0);
    await expect(page.locator(".learning-phase-track .learning-phase-step")).toHaveCount(6);
    const firstTeachingIndex = await page.evaluate(() => activeQuestionIndex);
    await page.locator('[data-action="continue-info"]').click();
    expect(await page.evaluate(() => activeQuestionIndex)).toBeGreaterThan(firstTeachingIndex);
    await expect(page.locator(".quiz-screen")).toBeVisible();
    expect(runtimeErrors).toEqual([]);
  } finally {
    await context.setOffline(false);
  }
});

test("v3 progress migrates once to v4 without deleting the recovery record", async ({ page }) => {
  const evidencedLegacyQuestionId = "a0-greetings-courtesy-meaning-02";
  const legacy = {
    completedLessons: ["a0-greetings-courtesy"],
    scores: { "a0-greetings-courtesy": 75 },
    seenQuestionIds: [evidencedLegacyQuestionId],
    totalXp: 125,
    practiceDays: ["2026-07-28"],
    mistakes: [{
      lessonId: "a0-greetings-courtesy",
      questionId: evidencedLegacyQuestionId,
      prompt: "hallo",
      answer: "سلام"
    }],
    missionVariantRuns: { "a0-mission-home-start": 2 },
    settings: {
      soundEffects: false,
      pronunciation: true,
      beginnerMode: true,
      largeText: true,
      slowAudio: true,
      extraUrduHelp: true
    },
    speechProfileVersion: 2,
    selectedChapterId: "a0",
    lastLessonId: "a0-greetings-courtesy"
  };
  await page.goto("/");
  await page.evaluate(({ current, old, value }) => {
    localStorage.removeItem(current);
    localStorage.setItem(old, JSON.stringify(value));
  }, { current: STORAGE_KEY, old: LEGACY_STORAGE_KEY, value: legacy });
  await page.reload();

  const stored = await page.evaluate(({ current, old }) => ({
    current: JSON.parse(localStorage.getItem(current)),
    legacy: JSON.parse(localStorage.getItem(old)),
    evidence: (() => {
      const saved = JSON.parse(localStorage.getItem(current));
      const lesson = window.NEDERURDU_COURSE.lessons.find((item) => item.id === "a0-greetings-courtesy");
      const retiredQuestion = (lesson.legacyQuestions || []).find((question) => (
        (question.legacyId || question.id) === "a0-greetings-courtesy-meaning-02"
      ));
      const evidencedSkillId = retiredQuestion.skillIds[0];
      const unevidencedSkillId = lesson.skillIds.find((skillId) => skillId !== evidencedSkillId);
      return {
        legacyId: retiredQuestion.legacyId || retiredQuestion.id,
        evidencedSkillStatus: saved.skillMastery?.[evidencedSkillId]?.status,
        unevidencedSkillStatus: saved.skillMastery?.[unevidencedSkillId]?.status
      };
    })()
  }), { current: STORAGE_KEY, old: LEGACY_STORAGE_KEY });

  expect(stored.current.schemaVersion).toBe(4);
  expect(stored.current.migratedFrom).toBe(LEGACY_STORAGE_KEY);
  expect(stored.current.totalXp).toBe(legacy.totalXp);
  expect(stored.current.practiceDays).toEqual(legacy.practiceDays);
  expect(stored.current.mistakes).toEqual(legacy.mistakes);
  expect(stored.current.missionVariantRuns).toEqual(legacy.missionVariantRuns);
  expect(stored.current.settings.largeText).toBe(true);
  expect(stored.current.lessonMastery["a0-greetings-courtesy"].status).toBe("practiced");
  expect(stored.evidence.legacyId).toBe(evidencedLegacyQuestionId);
  expect(stored.evidence.evidencedSkillStatus).toBe("practiced");
  expect(stored.evidence.unevidencedSkillStatus).toBeUndefined();
  expect(stored.legacy).toEqual(legacy);

  const beforeReload = await page.evaluate(({ current, old }) => {
    const legacyRecord = JSON.parse(localStorage.getItem(old));
    localStorage.setItem(old, JSON.stringify({ ...legacyRecord, totalXp: 9999 }));
    return localStorage.getItem(current);
  }, { current: STORAGE_KEY, old: LEGACY_STORAGE_KEY });
  await page.reload();
  const afterReload = await page.evaluate((current) => localStorage.getItem(current), STORAGE_KEY);
  expect(afterReload).toBe(beforeReload);
});

test("home loads and every chapter remains available", async ({ page }) => {
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  await openCleanApp(page);

  await expect(page).toHaveTitle(/NederUrdu/i);
  await expect(page.locator("#app")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/(?:uncaught|syntaxerror|referenceerror|application error)/i);
  await expect(page.locator('[data-action="chapter"]')).toHaveCount(3);
  await expect(page.locator(".bottom-nav .nav-button")).toHaveCount(3);
  await expect(page.locator('[data-action="preview"]:visible').first()).toBeEnabled();
  await expect(page.locator("body")).not.toContainText(/(?:XP|streak|heart|trophy|انعام)/i);
  await expect(page.locator("body")).not.toContainText(/\b(?:practice|lesson|chapter|progress|settings|home|today|mistake|review|next|continue|check)\b/i);
  expect(runtimeErrors).toEqual([]);
});

test("every lesson preview stays browseable while missions require practiced skills to start", async ({ page }) => {
  await openCleanApp(page);
  const availability = await page.evaluate(() => {
    const lockedLessonIds = window.NEDERURDU_COURSE.chapters.flatMap((chapter) => (
      chapter.lessons
        .map((lesson, index) => ({ lesson, index }))
        .filter(({ index }) => !isLessonUnlocked(index))
        .map(({ lesson }) => lesson.id)
    ));
    const mission = window.NEDERURDU_COURSE.missions.find((candidate) => (
      candidate.prerequisites?.skillIds?.length
    ));
    showLessonPreview(mission.id);
    return { lockedLessonIds, missionId: mission.id };
  });

  expect(availability.lockedLessonIds).toEqual([]);
  await expect(page.locator(".learning-preview.mission-preview")).toBeVisible();
  await expect(page.locator(".prerequisite-guidance.needs-preparation")).toBeVisible();
  await expect(page.locator('.learning-preview [data-action="start"]')).toBeDisabled();

  await page.evaluate((missionId) => startLesson(missionId), availability.missionId);
  await expect(page.locator(".learning-preview.mission-preview")).toBeVisible();

  await makeMissionReady(page, availability.missionId);
  await page.evaluate((missionId) => showLessonPreview(missionId), availability.missionId);
  await expect(page.locator('.learning-preview [data-action="start"]')).toBeEnabled();
  await page.locator('.learning-preview [data-action="start"]').click();
  await expect(page.locator(".quiz-screen")).toBeVisible();
});

test("lesson preview explains the outcome, prerequisites, and learning phases", async ({ page }) => {
  await openCleanApp(page);

  const previewContract = await page.evaluate(() => {
    const lessons = window.NEDERURDU_COURSE.lessons;
    const lesson = lessons.find((candidate) => (
      candidate.learning?.runs?.length > 1
      && candidate.prerequisites?.skillIds?.length
    )) || lessons.find((candidate) => candidate.learning?.runs?.length > 1) || lessons[0];
    return {
      lessonId: lesson.id,
      lessonOutcome: lesson.outcomeUrdu,
      runOutcome: lesson.learning.runs[0].outcomeUrdu
    };
  });
  await page.evaluate((id) => showLessonPreview(id), previewContract.lessonId);

  await expect(page.locator(".learning-preview")).toBeVisible();
  await expect(page.locator(".learning-preview-goal")).toContainText("اس سبق کے بعد آپ");
  await expect(page.locator(".learning-preview-goal")).toContainText(previewContract.runOutcome);
  if (previewContract.runOutcome !== previewContract.lessonOutcome) {
    await expect(page.locator(".learning-preview-goal")).not.toContainText(previewContract.lessonOutcome);
  }
  await expect(page.locator(".learning-preview-phases .learning-phase-chip")).toHaveCount(6);
  await expect(page.locator(".learning-preview-meta")).not.toContainText(/سوال|questions?/i);
  await expect(page.locator(".prerequisite-guidance")).toBeVisible();
  await expect(page.locator('.learning-preview [data-action="start"]')).toBeVisible();
});

test("a later run previews its prior-run requirement and refreshes it before use", async ({ page }) => {
  await openCleanApp(page);

  const candidate = await page.evaluate(() => {
    for (const lesson of window.NEDERURDU_COURSE.lessons) {
      const runs = getLearningRuns(lesson);
      for (let index = 1; index < runs.length; index += 1) {
        const run = runs[index];
        const reviewConceptId = (run.reviewConceptIds || []).find((conceptId) => {
          const concept = courseConcepts.get(conceptId);
          return getConceptSkillIds(concept, run).some((skillId) => (
            (run.prerequisiteSkillIds || []).indexOf(skillId) >= 0
            && (run.prerequisiteSkillIds || []).indexOf(skillId) < 5
          ));
        });
        if (!reviewConceptId) continue;
        const concept = courseConcepts.get(reviewConceptId);
        const skillId = getConceptSkillIds(concept, run)
          .find((id) => run.prerequisiteSkillIds.includes(id));
        const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4") || "{}");
        saveProgress({
          ...saved,
          lessonRunProgress: {
            ...(saved.lessonRunProgress || {}),
            [lesson.id]: {
              completedRunIds: runs.slice(0, index).map((item) => item.id),
              secureRunIds: []
            }
          },
          skillMastery: {
            ...(saved.skillMastery || {}),
            [skillId]: { status: "introduced", lessonId: lesson.id }
          }
        });
        showLessonPreview(lesson.id);
        return {
          lessonId: lesson.id,
          runId: run.id,
          conceptId: concept.id,
          skillId,
          dutch: concept.dutch
        };
      }
    }
    return null;
  });

  expect(candidate).not.toBeNull();
  await expect(page.locator(".prerequisite-guidance.needs-preparation")).toBeVisible();
  await expect(page.locator(".prerequisite-skill-list")).toContainText(candidate.dutch);

  await page.locator('.learning-preview [data-action="start"]').click();
  const ordering = await page.evaluate(({ runId, conceptId, skillId }) => {
    const refreshIndex = sessionQuestions.findIndex((question) => (
      question.teachingMode === "refresh"
      && getQuestionConceptIds(question).includes(conceptId)
    ));
    const firstUseIndex = sessionQuestions.findIndex((question) => (
      !isInfoQuestion(question)
      && getQuestionSkillIds(question).includes(skillId)
    ));
    return {
      activeRunId: activeLearningRun?.id,
      refreshIndex,
      firstUseIndex
    };
  }, candidate);

  expect(ordering.activeRunId).toBe(candidate.runId);
  expect(ordering.refreshIndex).toBeGreaterThanOrEqual(0);
  expect(ordering.firstUseIndex).toBeGreaterThan(ordering.refreshIndex);
});

test("a lesson run shows the current learning phase and the full phase path", async ({ page }) => {
  await openCleanApp(page);
  const lessonId = await page.evaluate(() => window.NEDERURDU_COURSE.lessons[0].id);
  await page.evaluate((id) => showLessonPreview(id), lessonId);
  await page.locator('.learning-preview [data-action="start"]').click();

  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".learning-phase-header")).toBeVisible();
  await expect(page.locator(".learning-phase-step")).toHaveCount(6);
  await expect(page.locator(".learning-phase-step.active")).toHaveCount(1);
  await expect(page.locator(".learning-teaching-card")).toBeVisible();
});

test("lesson selection cards never leave the phone viewport", async ({ page }) => {
  for (const viewport of [{ width: 320, height: 568 }, { width: 360, height: 800 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await openCleanApp(page);

    const lessonIds = await page.locator(".path-step").evaluateAll((steps) =>
      steps.slice(0, 7).map((step) => step.dataset.pathLesson)
    );

    for (const lessonId of lessonIds) {
      await page.evaluate((id) => showLessonPreview(id), lessonId);
      const bounds = await page.locator(".learning-preview").evaluate((card) => {
        const rect = card.getBoundingClientRect();
        return { left: rect.left, right: rect.right, viewportWidth: window.innerWidth };
      });
      expect(bounds.left, `${lessonId} at ${viewport.width}px`).toBeGreaterThanOrEqual(0);
      expect(bounds.right, `${lessonId} at ${viewport.width}px`).toBeLessThanOrEqual(bounds.viewportWidth);
      await page.evaluate(() => goHome());
    }
  }
});

test("word-bank tiles select on tap instead of opening definitions", async ({ page }) => {
  await openCleanApp(page);
  await page.evaluate(() => {
    window.NEDERURDU_CHAPTERS[0].lessons.push({
      id: "test-word-bank",
      unit: "مشق",
      title: "لفظوں کا بینک",
      description: "",
      xp: 0,
      questions: [{
        id: "test-word-bank-build",
        type: "build",
        label: "جملہ بنائیں",
        prompt: "میں گھر جاتا ہوں",
        tiles: ["ik", "ga", "naar", "huis"],
        answer: "ik ga naar huis",
        explain: "صحیح جملہ: ik ga naar huis۔"
      }]
    });
    startLesson("test-word-bank");
  });

  await expect(page.locator(".build-bank")).toBeVisible();
  await expect(page.locator(".build-bank .word-help-token")).toHaveCount(0);

  const firstTile = page.locator('[data-action="build-select"]').first();
  const word = await firstTile.textContent();
  await firstTile.click();

  await expect(page.locator(".build-answer .selected-tile")).toHaveCount(1);
  await expect(page.locator(".build-answer")).toContainText(word.trim());
  await expect(page.locator(".word-help-popover")).toHaveCount(0);
});

test("today review starts with eligible introduced skills only", async ({ page }) => {
  await openCleanApp(page, {
    completedLessons: ["a0-letters-1", "a0-start-speaking-mission"],
    lastLessonId: "a0-letters-1",
    lessonMastery: {
      "a0-letters-2": { status: "introduced" },
      "a0-start-speaking-mission": { status: "practiced" }
    }
  });
  await setLessonSkillStatus(page, ["a0-letters-1", "a0-letters-2"]);

  await page.locator('[data-action="settings"]').click();
  await page.locator('[data-action="review"][data-review-kind="today"]').click();
  await expect(page.locator(".quiz-screen")).toBeVisible();
  const review = await page.evaluate(() => {
    const productionTypes = new Set(["reverse", "fill-gap", "build", "sequence", "situation", "short-input"]);
    const originalQuestions = [...sessionQuestions];
    const reviewedSkills = originalQuestions.flatMap(getQuestionSkillIds);
    const introducedProductionIds = originalQuestions
      .filter((question) => (
        productionTypes.has(question.type)
        && getQuestionSkillIds(question).some((skillId) => getSkillStatus(skillId) === "introduced")
      ))
      .map((question) => question.id);
    const question = originalQuestions.find((item) => (
      !isInfoQuestion(item)
      && Array.isArray(item.options)
      && item.options.includes(item.answer)
      && getQuestionSkillIds(item).some((skillId) => getSkillStatus(skillId) === "introduced")
    ));
    const reviewedSkillId = getQuestionSkillIds(question)[0];
    const statusBefore = getSkillStatus(reviewedSkillId);
    activeReview.questions = [question];
    sessionQuestions = [prepareSessionQuestion(question)];
    activeQuestionIndex = 0;
    render();
    chooseAnswer(getActiveQuestion().answer);
    checkAnswer();
    nextQuestion();
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
    return {
      reviewableLessonIds: reviewableLessonsInOrder().map((lesson) => lesson.id),
      reviewableMissionIds: reviewableLessonsInOrder()
        .filter((lesson) => lesson.kind === "mission")
        .map((lesson) => lesson.id),
      reviewedSkills,
      excludedQuestionIds: originalQuestions
        .filter((item) => item.adaptiveReviewEligible === false)
        .map((item) => item.id),
      introducedProductionIds,
      reviewedSkillId,
      statusBefore,
      statusAfter: saved.skillMastery?.[reviewedSkillId]?.status,
      reviewCount: saved.skillReviewHistory?.[reviewedSkillId]?.reviewCount
    };
  });
  const storedStatuses = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)).skillMastery, STORAGE_KEY);
  expect(review.reviewableLessonIds).toEqual(expect.arrayContaining(["a0-letters-1", "a0-letters-2"]));
  expect(review.reviewableMissionIds).toEqual([]);
  expect(review.reviewedSkills.length).toBeGreaterThan(0);
  expect(review.reviewedSkills.every((skillId) => ["introduced", "practiced", "secure"].includes(storedStatuses[skillId]?.status))).toBe(true);
  expect(review.excludedQuestionIds).toEqual([]);
  expect(review.introducedProductionIds).toEqual([]);
  expect(review.statusBefore).toBe("introduced");
  expect(review.statusAfter).toBe("introduced");
  expect(review.reviewCount).toBe(1);
});

test("adaptive review persists per-skill spaced-review history", async ({ page }) => {
  await openCleanApp(page, {
    completedLessons: ["a0-letters-1"],
    lastLessonId: "a0-letters-1"
  });
  await setLessonSkillStatus(page, ["a0-letters-1"]);

  const result = await page.evaluate(() => {
    startReview("today");
    const question = sessionQuestions.find((item) => (
      !isInfoQuestion(item)
      && Array.isArray(item.options)
      && item.options.includes(item.answer)
    ));
    activeReview.questions = [question];
    sessionQuestions = [prepareSessionQuestion(question)];
    activeQuestionIndex = 0;
    render();
    chooseAnswer(getActiveQuestion().answer);
    checkAnswer();
    nextQuestion();
    const skillId = getQuestionSkillIds(question)[0];
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
    return {
      skillId,
      history: saved.skillReviewHistory?.[skillId]
    };
  });

  expect(result.skillId).toBeTruthy();
  expect(result.history.reviewCount).toBe(1);
  expect(result.history.intervalDays).toBe(1);
  expect(Date.parse(result.history.lastReviewedAt)).not.toBeNaN();
  expect(Date.parse(result.history.nextDueAt)).toBeGreaterThan(Date.parse(result.history.lastReviewedAt));
});

test("mistake review opens a saved mistake", async ({ page }) => {
  await openCleanApp(page, {
    completedLessons: ["a0-letters-1"],
    lastLessonId: "a0-letters-1",
    mistakes: [{ lessonId: "a0-letters-1", prompt: "a", answer: "حرف a" }]
  });

  await page.locator('[data-action="practice"]').click();
  const review = page.locator('[data-action="review"][data-review-kind="mistakes"]');
  await expect(review).toBeEnabled();
  await review.click();
  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".quiz-progress")).toHaveAttribute("aria-label", /پیش رفت|فیصد|مرحلہ|%/);
  await expect(page.locator(".quiz-progress")).not.toHaveAttribute("aria-label", /\d+\s+از\s+\d+/);
  await expect(page.locator(".quiz-count")).toHaveCount(0);
});

test("a correct stable-ID mistake review clears the saved mistake", async ({ page }) => {
  await openCleanApp(page, {
    completedLessons: ["a0-letters-1"],
    lastLessonId: "a0-letters-1",
    mistakes: [{
      lessonId: "a0-letters-1",
      questionId: "a0-letters-1-meaning-01",
      prompt: "a",
      answer: "حرف a"
    }]
  });

  await page.locator('[data-action="practice"]').click();
  await page.locator('[data-action="review"][data-review-kind="mistakes"]').click();
  await page.evaluate(() => {
    chooseAnswer(getActiveQuestion().answer);
    checkAnswer();
  });
  await page.locator('[data-action="next"]').click();

  const mistakes = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)).mistakes, STORAGE_KEY);
  expect(mistakes).toEqual([]);
});

test("old lesson review starts from completed work", async ({ page }) => {
  await openCleanApp(page, {
    completedLessons: ["a0-letters-1", "a0-letters-2"],
    lastLessonId: "a0-letters-2"
  });
  await setLessonSkillStatus(page, ["a0-letters-1", "a0-letters-2"]);

  await page.locator('[data-action="settings"]').click();
  await page.locator('[data-action="review"][data-review-kind="old"]').click();
  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".learning-phase-header")).toBeVisible();
});

test("main screens do not overflow horizontally", async ({ page }) => {
  await openCleanApp(page);

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(hasOverflow).toBe(false);

  await page.locator('[data-action="preview"][data-lesson="a0-letters-1"]').first().click();
  const cardHasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(cardHasOverflow).toBe(false);
  await page.locator('.learning-preview [data-action="start"]').click();
  const lessonHasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(lessonHasOverflow).toBe(false);
});

test("fixed controls and settings rows stay inside the viewport", async ({ page }) => {
  await openCleanApp(page);

  const homeBounds = await page.evaluate(() => {
    const nav = document.querySelector(".bottom-nav").getBoundingClientRect();
    return { left: nav.left, right: nav.right, bottom: nav.bottom, width: innerWidth, height: innerHeight };
  });
  expect(homeBounds.left).toBeGreaterThanOrEqual(-1);
  expect(homeBounds.right).toBeLessThanOrEqual(homeBounds.width + 1);
  expect(Math.abs(homeBounds.bottom - homeBounds.height)).toBeLessThanOrEqual(1);

  await page.locator('[data-action="settings"]').click();
  const settingsInside = await page.evaluate(() => [...document.querySelectorAll(".utility-action,.setting-row")].every((row) => {
    const bounds = row.getBoundingClientRect();
    return bounds.left >= -1 && bounds.right <= innerWidth + 1;
  }));
  expect(settingsInside).toBe(true);

  await page.locator('[data-action="home"]').click();
  await page.locator('[data-action="preview"][data-lesson="a0-letters-1"]').first().click();
  await page.locator('.learning-preview [data-action="start"]').click();
  const quizBounds = await page.evaluate(() => {
    const close = document.querySelector(".quiz-close").getBoundingClientRect();
    const footer = document.querySelector(".quiz-action-bar").getBoundingClientRect();
    return { closeLeft: close.left, footerLeft: footer.left, footerRight: footer.right, footerBottom: footer.bottom, width: innerWidth, height: innerHeight };
  });
  expect(quizBounds.closeLeft).toBeLessThan(quizBounds.width / 2);
  expect(quizBounds.footerLeft).toBeGreaterThanOrEqual(-1);
  expect(quizBounds.footerRight).toBeLessThanOrEqual(quizBounds.width + 1);
  expect(Math.abs(quizBounds.footerBottom - quizBounds.height)).toBeLessThanOrEqual(1);
});

test("every normal lesson produces a valid phased learning run", async ({ page }) => {
  await openCleanApp(page);
  const failures = await page.evaluate((chapterIds) => {
    const phaseRank = { learn: 0, understand: 1, guided: 2, use: 3, check: 4, correction: 5 };
    return window.NEDERURDU_COURSE.lessons
      .filter((lesson) => chapterIds.includes(lesson.chapterId))
      .flatMap((lesson) => (
      lesson.learning.runs.map((run) => {
        const questions = buildLearningFirstSession(lesson, run);
        const phases = questions.map(getQuestionPhase);
        const checkCount = phases.filter((phase) => phase === "check").length;
        const firstUnderstand = questions.find((question) => getQuestionPhase(question) === "understand");
        const hasUnderstandDemo = Boolean(
          firstUnderstand
          && firstUnderstand.taskDemonstration === true
          && firstUnderstand.scored === false
          && firstUnderstand.demonstratesType
          && isInfoQuestion(firstUnderstand)
        );
        const phaseRegression = phases.some((phase, index) => (
          index > 0 && phaseRank[phase] < phaseRank[phases[index - 1]]
        ));
        const invalidMaterializedExercises = questions.filter((question) => {
          const instruction = question.instructionUrdu || question.instruction || "";
          const conceptIds = getQuestionConceptIds(question);
          const skillIds = getQuestionSkillIds(question);
          if (
            !question.id
            || !/[\u0600-\u06ff]/u.test(instruction)
            || !conceptIds.length
            || !skillIds.length
          ) return true;
          if (isInfoQuestion(question)) return false;
          const correctExplanation = question.explainCorrectUrdu || question.correctExplanation || "";
          const wrongExplanation = question.explainWrongUrdu || question.wrongExplanation || "";
          const feedbackCore = (value) => String(value)
            .replace(/^(?:دوبارہ\s+دیکھیں|غلط\s+جواب[؛:،,]?\s*|صحیح\s+جواب[؛:،,]?\s*)+/u, "")
            .replace(/\s+/g, " ")
            .trim();
          const choiceTypes = new Set([
            "meaning", "reverse", "image-choice", "listen-choice",
            "situation", "document-choice", "fill-gap"
          ]);
          const optionExplanations = question.optionExplanationsUrdu
            || question.wrongExplanationsByOption
            || question.optionExplanations
            || question.feedbackByOption;
          const wrongOptions = Array.isArray(question.options)
            ? question.options.filter((option) => option !== question.answer)
            : [];
          const hasSpecificOptionFeedback = !choiceTypes.has(question.type) || (
            optionExplanations
            && wrongOptions.every((option) => {
              const explanation = optionExplanations[option] || "";
              return /[\u0600-\u06ff]/u.test(explanation)
                && String(explanation).includes(String(option))
              && !/اشارہ دیکھیں اور اسی ہدف|مثال دوبارہ (?:ذہن میں لائیں|دیکھیں)|اسی سبق میں مثال کے ساتھ سکھایا گیا/u.test(explanation);
            })
          );
          const usePrompt = String(question.prompt || "");
          const useUrduWords = usePrompt
            .replace(/^\s*حال\s*[:：]\s*/u, "")
            .match(/[\u0600-\u06ff]+/gu) || [];
          const invalidUseContext = getQuestionPhase(question) === "use" && (
            /(?:اس\s+موضوع\s+میں|ضروری\s+آوازیں|اس\s+گفتگو\s+میں\s+پوری\s+بات\s+کہیں|تصویر\s+دیکھیں\s+اور\s+صحیح\s+لفظ\s+چنیں|اس\s+اردو\s+بات\s+کے\s+لیے\s+صحیح\s+Nederlands|یہ\s+(?:معنی|بات)|حال\s*:\s*حال\s*:|\/\/|[،,]{2,})/iu.test(usePrompt)
            || useUrduWords.length < 3
          );
          return !/[\u0600-\u06ff]/u.test(correctExplanation)
            || !/[\u0600-\u06ff]/u.test(wrongExplanation)
            || feedbackCore(correctExplanation) === feedbackCore(wrongExplanation)
            || !hasSpecificOptionFeedback
            || invalidUseContext
            || (question.type === "short-input" && (!question.optional || !question.fallbackTiles?.length));
        }).map((question) => question.id);
        return {
          id: `${lesson.id}/${run.id}`,
          count: questions.length,
          firstPhase: phases[0],
          checkCount,
          phaseRegression,
          hasUnderstandDemo,
          invalidMaterializedExercises
        };
      })
    )).filter((result) => (
      result.count === 0
      || result.firstPhase !== "learn"
      || result.checkCount < 4
      || result.checkCount > 6
      || result.phaseRegression
      || !result.hasUnderstandDemo
      || result.invalidMaterializedExercises.length
    ));
  }, CURRENT_CHAPTER_GATE_IDS);

  expect(failures).toEqual([]);
});

test("A0 promises, practical labels, topic strands, and unit missions match owned learning", async ({ page }) => {
  test.setTimeout(120_000);
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const course = window.NEDERURDU_COURSE;
    const a0 = course.chapters.find((chapter) => chapter.id === "a0");
    const lessons = new Map(course.lessons.map((lesson) => [lesson.id, lesson]));
    const concepts = new Map(course.concepts.map((concept) => [concept.id, concept]));
    const skills = new Map(course.skills.map((skill) => [skill.id, skill]));
    const missions = new Map(course.missions.map((mission) => [mission.id, mission]));
    const units = new Map(course.units.map((unit) => [unit.id, unit]));
    const a0LessonIds = new Set(a0.lessonIds);
    const a0Concepts = course.concepts.filter((concept) => a0LessonIds.has(concept.introducedInLessonId));
    const a0Patterns = course.patterns.filter((pattern) => a0LessonIds.has(pattern.lessonId));
    const normalize = (value) => String(value || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\u0600-\u06ff]+/g, " ")
      .trim()
      .replace(/\s+/g, " ");
    const latinTokens = (value) => (
      String(value || "").match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]*/g) || []
    ).map((token) => normalize(token));
    const outcomeScaffold = new Set([
      "nederlands", "a", "b", "ali", "sara", "ahmed", "fatima",
      "amsterdam", "rotterdam", "utrecht", "nederland", "digid", "iban",
      "bsn", "www", "nl", "a0", "a1", "a2", "letters", "tool",
      "whatsapp", "sms", "wifi", "wi-fi"
    ]);
    const grammarFirst = /(?:\bgrammar\b|\bgrammatica\b|\bwerkwoorden?\b|\bnaamwoorden?\b|\bvoornaamwoorden?\b|\blidwoorden?\b|\bwoordvolgorde\b|\bzinsvolgorde\b|\bverleden\s+tijd\b|\bvoltooid(?:e)?\s+tijd\b|\btegenwoordige\s+tijd\b|\bperfectum\b|\b(?:scheidbare|splitsbare)\s+werkwoorden?\b|قواعد|گرامر|لفظوں\s+کی\s+ترتیب|جملے\s+کی\s+ترتیب|حال\s+کا\s+زمانہ|ماضی\s+کا\s+زمانہ|مستقبل\s+کا\s+زمانہ)/iu;
    const labelFailures = [
      ...a0.lessonIds.map((id) => lessons.get(id)).filter((lesson) => (
        !/[\u0600-\u06ff]/u.test(lesson.unit || "") || grammarFirst.test(lesson.unit || "")
      )).map((lesson) => `${lesson.id}:${lesson.unit}`),
      ...a0.unitIds.map((id) => units.get(id)).filter((unit) => {
        const label = unit?.title || unit?.name || unit?.label || "";
        return !/[\u0600-\u06ff]/u.test(label) || grammarFirst.test(label);
      }).map((unit) => `${unit.id}:${unit.title || unit.name || unit.label || ""}`)
    ];
    const promiseMismatches = a0.lessonIds.map((id) => lessons.get(id)).flatMap((lesson) => {
      const allowedTokens = new Set(outcomeScaffold);
      const allowedConceptIds = new Set([
        ...(lesson.conceptIds || []),
        ...(lesson.prerequisites?.skillIds || [])
          .map((skillId) => skills.get(skillId)?.conceptId)
          .filter(Boolean)
      ]);
      for (const conceptId of allowedConceptIds) {
        const concept = concepts.get(conceptId);
        for (const token of latinTokens(`${concept?.dutch || ""} ${concept?.audioText || ""}`)) {
          allowedTokens.add(token);
        }
      }
      for (const token of (lesson.outcomeContextTerms || []).flatMap(latinTokens)) {
        allowedTokens.add(token);
      }
      const unowned = [...new Set(
        latinTokens(`${lesson.description || ""} ${lesson.outcomeUrdu || ""}`)
          .filter((token) => !allowedTokens.has(token))
      )];
      return unowned.length ? [`${lesson.id}:${unowned.join(",")}`] : [];
    });
    const targetCorpus = [
      ...a0Concepts.flatMap((concept) => [concept.dutch, concept.audioText]),
      ...a0Patterns.flatMap((pattern) => [pattern.modelDutch, pattern.highlight])
    ].map(normalize).filter(Boolean);
    const covers = (pattern) => targetCorpus.some((target) => pattern.test(target));
    const requiredTopics = [
      ["greetings", /^(?:hallo|goedemorgen|goedemiddag|goedenavond|dag|tot ziens)$/i],
      ["help", /(?:begrijp|herhalen|langzamer|helpen|betekent)/i],
      ["yes-no", /^(?:ja|nee)$/i],
      ["sounds", /^[a-z]$/i],
      ["identity", /^(?:ik heet|hoe heet u|mijn naam is(?:\s+.+)?)$/i],
      ["pronouns", /^(?:ik|jij|u|hij|zij|wij)$/i],
      ["being-having", /^(?:ben|bent|is|heb|hebt|heeft|hebben)$/i],
      ["numbers", /^(?:nul|een|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|elf)$/i],
      ["time", /^(?:uur|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag)$/i],
      ["address", /^(?:adres|straat|huisnummer|postcode|woonplaats|telefoonnummer|e-mailadres)$/i],
      ["family", /^(?:familie|gezin)$/i],
      ["home", /^(?:huis|het huis|kamer|keuken|badkamer|sleutel|verwarming)$/i],
      ["food", /^(?:brood|rijst|melk|koffie|thee|fruit|groente|water)$/i],
      ["shopping", /^(?:winkel|supermarkt|prijs|kassa|bon|pinnen|betalen)$/i],
      ["transport", /^(?:bus|trein|station|halte|kaartje)$/i],
      ["health", /^(?:ziek|pijn|dokter|apotheek|medicijn|ziekenhuis|ambulance)$/i],
      ["school", /^(?:school|docent|klas|schooltijd|afwezig)$/i],
      ["work", /^(?:werk|werken|collega|leidinggevende|pauze)$/i],
      ["safety", /^(?:gevaar|verboden|stop|bel 112|ingang|uitgang)$/i]
    ];
    const missingTopics = requiredTopics
      .filter(([, pattern]) => !covers(pattern))
      .map(([topic]) => topic);
    const familyRoles = [
      ["collective", /^(?:familie|gezin)$/i],
      ["parent", /^(?:moeder|vader|ouder|ouders)$/i],
      ["close-relation", /^(?:broer|zus|zoon|dochter|kind|kinderen|partner)$/i]
    ];
    const missingFamilyRoles = familyRoles
      .filter(([, pattern]) => !covers(pattern))
      .map(([role]) => role);
    const lessonPosition = new Map(a0.lessons.map((lesson, index) => [lesson.id, index]));
    const identity = a0Concepts.find((concept) => (
      /^(?:ik heet|hoe heet u|mijn naam is(?:\s+.+)?)$/i.test(normalize(concept.dutch))
    ));
    const number = a0Concepts.find((concept) => (
      /^(?:nul|een|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|elf)$/i.test(normalize(concept.dutch))
      && /(?:number|time|date|appointment)/i.test(concept.introducedInLessonId || "")
    ));
    const identityOrder = identity && number
      && lessonPosition.get(identity.introducedInLessonId) < lessonPosition.get(number.introducedInLessonId)
      ? []
      : [`${identity?.id || "missing"}:${number?.id || "missing"}`];
    const baseIkBen = a0Concepts.find((concept) => normalize(concept.dutch) === "ik ben");
    const earlyUnmarkedChunks = baseIkBen ? a0Concepts.filter((concept) => {
      const lesson = lessons.get(concept.introducedInLessonId);
      const block = (lesson?.teachingBlocks || []).find((item) => item.conceptId === concept.id);
      const mode = normalize(
        concept.learningMode || concept.teachingMode || concept.conceptType || concept.kind
        || block?.mode || block?.teachingMode || block?.kind
      );
      const explicitChunk = concept.atomicChunk === true
        || concept.teachAsChunk === true
        || ["atomic chunk", "whole phrase", "practical chunk"].includes(mode);
      return /^ik ben\s+.+/i.test(normalize(concept.dutch))
        && lessonPosition.get(concept.introducedInLessonId) < lessonPosition.get(baseIkBen.introducedInLessonId)
        && !explicitChunk;
    }).map((concept) => concept.id) : [];
    const missionCoverageFailures = a0.unitIds.flatMap((unitId) => {
      const unit = units.get(unitId);
      const representedLessonIds = new Set(
        (unit.missionIds || [])
          .map((missionId) => missions.get(missionId))
          .filter(Boolean)
          .flatMap((mission) => mission.assessmentSkillIds || [])
          .map((skillId) => skills.get(skillId)?.introducedInLessonId)
          .filter((lessonId) => (unit.lessonIds || []).includes(lessonId))
      );
      const missing = (unit.lessonIds || []).filter((lessonId) => !representedLessonIds.has(lessonId));
      return missing.length ? [`${unit.id}:${missing.join(",")}`] : [];
    });
    return {
      labelFailures,
      promiseMismatches,
      missingTopics,
      missingFamilyRoles,
      identityOrder,
      earlyUnmarkedChunks,
      missionCoverageFailures
    };
  });

  expect(audit.labelFailures).toEqual([]);
  expect(audit.promiseMismatches).toEqual([]);
  expect(audit.missingTopics).toEqual([]);
  expect(audit.missingFamilyRoles).toEqual([]);
  expect(audit.identityOrder).toEqual([]);
  expect(audit.earlyUnmarkedChunks).toEqual([]);
  expect(audit.missionCoverageFailures).toEqual([]);
});

test("normal lesson sessions teach and recognise each skill before production", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const hardTypes = new Set(["fill-gap", "situation", "sequence", "build", "short-input"]);
    return window.NEDERURDU_COURSE.lessons
      .flatMap((lesson) => {
        const previouslyLearnedSkills = new Set();
        return lesson.learning.runs.map((run) => {
          const questions = buildLearningFirstSession(lesson, run);
          const taught = new Set(previouslyLearnedSkills);
          const recognised = new Set(previouslyLearnedSkills);
          const failures = [];
          for (const question of questions) {
            const phase = getQuestionPhase(question);
            const skillIds = getQuestionSkillIds(question);
            if (phase === "learn") skillIds.forEach((skillId) => taught.add(skillId));
            if (phase === "understand") {
              for (const skillId of skillIds) {
                if (!taught.has(skillId)) failures.push(`${question.id}:not-taught:${skillId}`);
                recognised.add(skillId);
              }
            }
            if (hardTypes.has(question.type) && ["guided", "use", "check"].includes(phase)) {
              for (const skillId of skillIds) {
                if (!taught.has(skillId)) failures.push(`${question.id}:not-taught:${skillId}`);
                if (!recognised.has(skillId)) failures.push(`${question.id}:not-recognised:${skillId}`);
              }
            }
          }
          for (const skillId of run.skillIds || []) previouslyLearnedSkills.add(skillId);
          return { id: `${lesson.id}/${run.id}`, failures };
        });
      }).filter((lesson) => lesson.failures.length);
  });

  expect(audit).toEqual([]);
});

test("quiz check button enables and feedback appears", async ({ page }) => {
  await openCleanApp(page);
  await page.evaluate(() => window.startLesson("a0-letters-1"));

  await page.evaluate(() => {
    while (isInfoQuestion(getActiveQuestion())) continueInfoStep();
  });
  const checkButton = page.locator('[data-action="check"]');
  await expect(checkButton).toBeDisabled();
  await page.locator('[data-action="choose"]').first().click();
  await expect(checkButton).toBeEnabled();
  await checkButton.click();
  await expect(page.locator(".quiz-feedback-panel")).toBeVisible();
  await expect(page.locator('[data-action="next"]')).toBeEnabled();
});

test("correct feedback and the selected distractor's specific Urdu explanation are rendered", async ({ page }) => {
  await openCleanApp(page);
  const lessonId = await page.evaluate(() => window.NEDERURDU_COURSE.lessons[0].id);

  const correctExplanation = await page.evaluate((id) => {
    startLesson(id);
    const index = sessionQuestions.findIndex((question) => (
      getQuestionPhase(question) === "check"
      && Array.isArray(question.options)
      && question.options.length > 1
    ));
    activeQuestionIndex = index;
    render();
    const question = getActiveQuestion();
    chooseAnswer(question.answer);
    checkAnswer();
    return question.correctExplanation;
  }, lessonId);
  await expect(page.locator(".quiz-feedback-panel.correct")).toContainText(correctExplanation);

  const selectedFeedback = await page.evaluate(() => {
    for (const lesson of window.NEDERURDU_COURSE.lessons) {
      startLesson(lesson.id);
      const index = sessionQuestions.findIndex((question) => {
        const explanations = question.optionExplanationsUrdu
          || question.wrongExplanationsByOption
          || question.optionExplanations
          || question.feedbackByOption;
        return getQuestionPhase(question) === "check"
          && Array.isArray(question.options)
          && question.options.some((option) => option !== question.answer && explanations?.[option]);
      });
      if (index < 0) continue;
      activeQuestionIndex = index;
      render();
      const question = getActiveQuestion();
      const explanations = question.optionExplanationsUrdu
        || question.wrongExplanationsByOption
        || question.optionExplanations
        || question.feedbackByOption;
      const selected = question.options.find((option) => option !== question.answer && explanations?.[option]);
      chooseAnswer(selected);
      checkAnswer();
      return {
        selected,
        explanation: explanations[selected],
        generic: question.wrongExplanation
      };
    }
    throw new Error("No Independent Check choice has option-specific wrong feedback.");
  });
  expect(selectedFeedback.explanation).toContain(selectedFeedback.selected);
  await expect(page.locator(".quiz-feedback-panel.wrong")).toContainText(selectedFeedback.explanation);
  if (selectedFeedback.generic !== selectedFeedback.explanation) {
    await expect(page.locator(".quiz-feedback-panel.wrong")).not.toContainText(selectedFeedback.generic);
  }
  const correctionExplanation = await page.evaluate(() => {
    nextQuestion();
    while (screen === "lesson" && getQuestionPhase(getActiveQuestion()) !== "correction") {
      const question = getActiveQuestion();
      if (isInfoQuestion(question)) {
        continueInfoStep();
        continue;
      }
      chooseAnswer(question.answer);
      checkAnswer();
      nextQuestion();
    }
    if (screen !== "lesson" || getActiveQuestion().type !== "correction-teach") {
      throw new Error("The selected wrong answer did not produce a correction teaching card.");
    }
    return getActiveQuestion().wrongExplanation;
  });
  expect(correctionExplanation).toBe(selectedFeedback.explanation);
  await expect(page.locator(".correction-teaching-card")).toContainText(selectedFeedback.explanation);
});

test("correction waits for the full Independent Check and recap clears every resolved miss", async ({ page }) => {
  await openCleanApp(page);
  const ordering = await page.evaluate(() => {
    let selected = null;
    for (const lesson of window.NEDERURDU_COURSE.lessons) {
      startLesson(lesson.id);
      const scored = sessionQuestions.filter((question) => !isInfoQuestion(question));
      const supported = scored.find((question) => (
        ["understand", "guided"].includes(getQuestionPhase(question))
        && Array.isArray(question.options)
        && question.options.some((option) => option !== question.answer)
      ));
      const checks = scored.filter((question) => getQuestionPhase(question) === "check");
      const allChoiceBased = scored.every((question) => (
        Array.isArray(question.options)
        && question.options.includes(question.answer)
        && question.options.some((option) => option !== question.answer)
      ));
      if (supported && checks.length >= 4 && allChoiceBased) {
        selected = { lesson, supported, checks };
        break;
      }
    }
    if (!selected) throw new Error("No choice-based learning run was available for correction coverage.");

    const originalCheckIds = selected.checks.map((question) => question.id);
    const failedIds = new Set([selected.supported.id, originalCheckIds[0]]);
    const answeredCheckIds = [];
    while (screen === "lesson" && getQuestionPhase(getActiveQuestion()) !== "correction") {
      const question = getActiveQuestion();
      if (isInfoQuestion(question)) {
        continueInfoStep();
        continue;
      }
      const phase = getQuestionPhase(question);
      if (phase === "check") answeredCheckIds.push(question.id);
      const answer = failedIds.has(question.id)
        ? question.options.find((option) => option !== question.answer)
        : question.answer;
      chooseAnswer(answer);
      checkAnswer();
      nextQuestion();
    }

    const firstCorrectionIndex = sessionQuestions.findIndex((question) => question.type === "correction-teach");
    return {
      lessonId: selected.lesson.id,
      supportedMissId: selected.supported.id,
      checkMissId: originalCheckIds[0],
      originalCheckIds,
      answeredCheckIds,
      originalCheckIndices: originalCheckIds.map((id) => sessionQuestions.findIndex((question) => question.id === id)),
      firstCorrectionIndex,
      activePhase: getQuestionPhase(getActiveQuestion()),
      activeType: getActiveQuestion().type
    };
  });

  expect(ordering.answeredCheckIds).toEqual(ordering.originalCheckIds);
  expect(Math.max(...ordering.originalCheckIndices)).toBeLessThan(ordering.firstCorrectionIndex);
  expect(ordering.activePhase).toBe("correction");
  expect(ordering.activeType).toBe("correction-teach");
  await expect(page.locator(".correction-teaching-card")).toBeVisible();
  await expect(page.locator(".learning-phase-step.phase-correction.active")).toBeVisible();

  const resolution = await page.evaluate(() => {
    const retryRoots = [];
    while (screen === "lesson") {
      const question = getActiveQuestion();
      if (question.type === "correction-teach") {
        continueInfoStep();
        continue;
      }
      if (!question.correctionRetry || getQuestionPhase(question) !== "correction") {
        throw new Error(`Unexpected question during correction: ${question.id}`);
      }
      retryRoots.push(question.correctionRootId);
      chooseAnswer(question.answer);
      checkAnswer();
      nextQuestion();
    }
    const expectedAttempts = sessionAnswers
      .filter((answer) => answer.phase !== "correction")
      .reduce((counts, answer) => {
        for (const skillId of getQuestionSkillIds(answer)) {
          counts[skillId] = (counts[skillId] || 0) + 1;
        }
        return counts;
      }, {});
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
    return {
      retryRoots,
      result: lessonResult,
      finalScreen: screen,
      correctionAttemptCount: sessionAnswers.filter((answer) => answer.phase === "correction").length,
      attemptsExcludeCorrection: Object.entries(expectedAttempts).every(([skillId, total]) => (
        saved.skillAttempts?.[skillId]?.total === total
      ))
    };
  });
  expect(new Set(resolution.retryRoots)).toEqual(new Set([ordering.supportedMissId, ordering.checkMissId]));
  expect(resolution.result.correctedCount).toBe(2);
  expect(resolution.result.unresolvedCount).toBe(0);
  expect(resolution.finalScreen).toBe("complete");
  expect(resolution.correctionAttemptCount).toBeGreaterThan(0);
  expect(resolution.attemptsExcludeCorrection).toBe(true);
  await expect(page.locator(".learning-recap")).toBeVisible();
  await expect(
    page.locator(".learning-recap > div > span").filter({ hasText: "دوبارہ دہرائیں" }).locator("strong")
  ).toHaveText("0");
});

test("a wrong supported retry loops inside Correction until it is corrected", async ({ page }) => {
  await openCleanApp(page);
  const rootQuestionId = await page.evaluate(() => {
    const lesson = window.NEDERURDU_COURSE.lessons.find((candidate) => {
      startLesson(candidate.id);
      return sessionQuestions.some((question) => (
        getQuestionPhase(question) === "check"
        && Array.isArray(question.options)
        && question.options.some((option) => option !== question.answer)
      ));
    });
    startLesson(lesson.id);
    const index = sessionQuestions.findLastIndex((question) => (
      getQuestionPhase(question) === "check"
      && Array.isArray(question.options)
      && question.options.some((option) => option !== question.answer)
    ));
    activeQuestionIndex = index;
    render();
    const question = getActiveQuestion();
    chooseAnswer(question.options.find((option) => option !== question.answer));
    checkAnswer();
    return question.id;
  });

  await page.locator('[data-action="next"]').click();
  await expect(page.locator(".correction-teaching-card")).toBeVisible();
  await page.locator('[data-action="continue-info"]').click();
  await expect(page.locator(".correction-retry-banner")).toBeVisible();

  const firstRetryId = await page.evaluate(() => {
    const question = getActiveQuestion();
    chooseAnswer(question.options.find((option) => option !== question.answer));
    checkAnswer();
    return question.id;
  });
  await expect(page.locator(".quiz-feedback-panel.wrong")).toBeVisible();
  await page.locator('[data-action="next"]').click();
  await expect(page.locator(".correction-teaching-card")).toBeVisible();
  await expect(page.locator(".learning-phase-step.phase-correction.active")).toBeVisible();
  await page.locator('[data-action="continue-info"]').click();

  const loop = await page.evaluate(() => {
    const question = getActiveQuestion();
    const result = {
      retryId: question.id,
      rootId: question.correctionRootId,
      correctionRetry: question.correctionRetry,
      phase: getQuestionPhase(question)
    };
    chooseAnswer(question.answer);
    checkAnswer();
    return result;
  });
  expect(loop.phase).toBe("correction");
  expect(loop.correctionRetry).toBe(true);
  expect(loop.rootId).toBe(rootQuestionId);
  expect(loop.retryId).not.toBe(firstRetryId);
  await expect(page.locator(".quiz-feedback-panel.correct")).toBeVisible();
});

test("incorrect Guided and Use work stays unpracticed until supported correction succeeds", async ({ page }) => {
  await openCleanApp(page);
  const result = await page.evaluate(() => {
    const lesson = window.NEDERURDU_COURSE.lessons.find((candidate) => (
      candidate.learning?.runs?.some((run) => {
        const questions = buildLearningFirstSession(candidate, run);
        const scored = questions.filter((question) => !isInfoQuestion(question));
        return questions.some((question) => getQuestionPhase(question) === "use")
          && scored.length > 0
          && scored.every((question) => (
            Array.isArray(question.options)
            && question.options.includes(question.answer)
            && question.options.some((option) => option !== question.answer)
          ))
          && scored.some((question) => ["understand", "guided"].includes(getQuestionPhase(question)));
      })
    ));
    if (!lesson) throw new Error("No choice-based run is available for practiced-skill coverage.");
    startLesson(lesson.id);
    const runSkillIds = [...activeLearningRun.skillIds];
    const targetPracticeQuestion = sessionQuestions.find((question) => (
      !isInfoQuestion(question)
      && ["guided", "use"].includes(getQuestionPhase(question))
      && getQuestionSkillIds(question).length
    ));
    const targetSkillId = getQuestionSkillIds(targetPracticeQuestion)[0];
    const missedPracticeIds = [];
    let guard = 0;
    while (screen === "lesson" && getQuestionPhase(getActiveQuestion()) !== "check" && guard < 200) {
      const question = getActiveQuestion();
      if (isInfoQuestion(question)) {
        continueInfoStep();
      } else {
        const shouldMiss = ["guided", "use"].includes(getQuestionPhase(question))
          && getQuestionSkillIds(question).includes(targetSkillId);
        const answer = shouldMiss
          ? question.options.find((option) => option !== question.answer)
          : question.answer;
        if (shouldMiss) missedPracticeIds.push(question.id);
        chooseAnswer(answer);
        checkAnswer();
        nextQuestion();
      }
      guard += 1;
    }
    if (!missedPracticeIds.length || getQuestionPhase(getActiveQuestion()) !== "check") {
      throw new Error("The run did not reach Independent Check after incorrect Guided/Use work.");
    }
    const atCheck = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
    const missionProbe = {
      kind: "mission",
      prerequisiteSkillIds: runSkillIds,
      assessmentSkillIds: runSkillIds,
      learning: {}
    };
    const targetStatusAtCheck = atCheck.skillMastery?.[targetSkillId]?.status;
    const missingForMission = getMissingPrerequisites(missionProbe);

    while (screen === "lesson" && guard < 500) {
      const question = getActiveQuestion();
      if (isInfoQuestion(question)) {
        continueInfoStep();
      } else {
        chooseAnswer(question.answer);
        checkAnswer();
        nextQuestion();
      }
      guard += 1;
    }
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
    return {
      missedPracticeIds,
      targetSkillId,
      targetStatusAtCheck,
      missingForMission,
      corrected: missedPracticeIds.every((questionId) => correctedCheckQuestionIds.has(questionId)),
      finalStatuses: runSkillIds.map((skillId) => saved.skillMastery?.[skillId]?.status),
      finalScreen: screen
    };
  });

  expect(result.missedPracticeIds.length).toBeGreaterThan(0);
  expect(result.targetStatusAtCheck).not.toBe("practiced");
  expect(result.targetStatusAtCheck).not.toBe("secure");
  expect(result.missingForMission).toContain(result.targetSkillId);
  expect(result.corrected).toBe(true);
  expect(result.finalStatuses.every((status) => status === "secure")).toBe(true);
  expect(result.finalScreen).toBe("complete");
});

test("all-wrong Guided and Use work cannot unlock a practiced-skill mission", async ({ page }) => {
  await openCleanApp(page);
  const result = await page.evaluate(() => {
    const lesson = window.NEDERURDU_COURSE.lessons.find((candidate) => (
      candidate.learning?.runs?.some((run) => {
        const questions = buildLearningFirstSession(candidate, run);
        const practice = questions.filter((question) => (
          !isInfoQuestion(question)
          && ["guided", "use"].includes(getQuestionPhase(question))
        ));
        return practice.length > 0 && practice.every((question) => (
          Array.isArray(question.options)
          && question.options.includes(question.answer)
          && question.options.some((option) => option !== question.answer)
        ));
      })
    ));
    if (!lesson) throw new Error("No choice-based run is available for negative practice evidence.");
    startLesson(lesson.id);
    const runSkillIds = [...activeLearningRun.skillIds];
    let wrongPracticeCount = 0;
    let guard = 0;
    while (screen === "lesson" && getQuestionPhase(getActiveQuestion()) !== "check" && guard < 250) {
      const question = getActiveQuestion();
      if (isInfoQuestion(question)) {
        continueInfoStep();
      } else {
        const shouldMiss = ["guided", "use"].includes(getQuestionPhase(question));
        const answer = shouldMiss
          ? question.options.find((option) => option !== question.answer)
          : question.answer;
        if (shouldMiss) wrongPracticeCount += 1;
        chooseAnswer(answer);
        checkAnswer();
        nextQuestion();
      }
      guard += 1;
    }
    const missionProbe = {
      kind: "mission",
      prerequisiteSkillIds: runSkillIds,
      assessmentSkillIds: runSkillIds,
      learning: {}
    };
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
    return {
      wrongPracticeCount,
      phase: getQuestionPhase(getActiveQuestion()),
      statuses: runSkillIds.map((skillId) => saved.skillMastery?.[skillId]?.status),
      missingForMission: getMissingPrerequisites(missionProbe)
    };
  });

  expect(result.wrongPracticeCount).toBeGreaterThan(0);
  expect(result.phase).toBe("check");
  expect(result.statuses.every((status) => !["practiced", "secure"].includes(status))).toBe(true);
  expect(result.missingForMission.length).toBe(result.statuses.length);
});

test("one practiced run does not mark an unfinished multi-run lesson practiced", async ({ page }) => {
  await openCleanApp(page);
  const result = await page.evaluate(() => {
    const lesson = window.NEDERURDU_COURSE.lessons.find((candidate) => (
      candidate.learning?.runs?.length > 1
      && buildLearningFirstSession(candidate, candidate.learning.runs[0])
        .some((question) => ["guided", "use"].includes(getQuestionPhase(question)))
    ));
    if (!lesson) throw new Error("No multi-run lesson is available for lesson-level mastery.");
    startLesson(lesson.id);
    const firstRunId = activeLearningRun.id;
    let guard = 0;
    while (screen === "lesson" && guard < 500) {
      const question = getActiveQuestion();
      if (isInfoQuestion(question)) {
        continueInfoStep();
      } else {
        chooseAnswer(question.answer);
        checkAnswer();
        nextQuestion();
      }
      guard += 1;
    }
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
    return {
      totalRunCount: lesson.learning.runs.length,
      lessonStatus: saved.lessonMastery?.[lesson.id]?.status,
      practicedRunIds: saved.lessonRunProgress?.[lesson.id]?.practicedRunIds || [],
      completedRunIds: saved.lessonRunProgress?.[lesson.id]?.completedRunIds || [],
      firstRunId
    };
  });

  expect(result.totalRunCount).toBeGreaterThan(1);
  expect(result.completedRunIds).toContain(result.firstRunId);
  expect(result.practicedRunIds).toContain(result.firstRunId);
  expect(result.lessonStatus).toBe("introduced");
});

test("a Check-only correction cannot create Guided or Use practice evidence", async ({ page }) => {
  await openCleanApp(page);
  const result = await page.evaluate(() => {
    const lesson = window.NEDERURDU_COURSE.lessons.find((candidate) => (
      candidate.learning?.runs?.some((run) => (
        buildLearningFirstSession(candidate, run).some((question) => (
          getQuestionPhase(question) === "check"
          && getQuestionSkillIds(question).length
          && Array.isArray(question.options)
          && question.options.includes(question.answer)
        ))
      ))
    ));
    if (!lesson) throw new Error("No Check question is available for correction-origin coverage.");
    startLesson(lesson.id);
    const rootQuestion = sessionQuestions.find((question) => (
      getQuestionPhase(question) === "check"
      && getQuestionSkillIds(question).length
      && Array.isArray(question.options)
      && question.options.includes(question.answer)
    ));
    const retry = buildCorrectionPair(rootQuestion)[1];
    const skillIds = getQuestionSkillIds(retry);
    sessionQuestions = [retry];
    activeQuestionIndex = 0;
    selectedAnswer = retry.answer;
    checked = false;
    checkAnswer();
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
    return {
      correctionOriginPhase: sessionAnswers[0]?.correctionOriginPhase,
      statuses: skillIds.map((skillId) => saved.skillMastery?.[skillId]?.status)
    };
  });

  expect(result.correctionOriginPhase).toBe("check");
  expect(result.statuses.every((status) => !["practiced", "secure"].includes(status))).toBe(true);
});

test("secure mastery requires 80 percent on the check and all misses corrected", async ({ page }) => {
  await openCleanApp(page);
  const result = await page.evaluate(() => {
    const lesson = window.NEDERURDU_COURSE.lessons.find((candidate) => {
      const firstRun = candidate.learning?.runs?.[0];
      return firstRun
        && buildLearningFirstSession(candidate, firstRun)
          .filter((question) => getQuestionPhase(question) === "check").length >= 5;
    });
    if (!lesson) throw new Error("No normal lesson has a five-item Independent Check.");
    const runLesson = (mode) => {
      startLesson(lesson.id);
      const runId = activeLearningRun.id;
      const runSkillIds = [...activeLearningRun.skillIds];
      const checkQuestions = sessionQuestions.filter((question) => getQuestionPhase(question) === "check");
      const guidedOrUseMiss = sessionQuestions.find((question) => (
        !isInfoQuestion(question)
        && ["guided", "use"].includes(getQuestionPhase(question))
      ));
      sessionAnswers = sessionQuestions
        .filter((question) => !isInfoQuestion(question))
        .map((question) => {
          const isCheck = getQuestionPhase(question) === "check";
          const checkIndex = checkQuestions.findIndex((item) => item.id === question.id);
          const belowThresholdCorrectCount = Math.max(0, Math.ceil(checkQuestions.length * 0.8) - 1);
          const unresolvedGuidedOrUse = mode === "unresolved-required-miss"
            && question.id === guidedOrUseMiss?.id;
          const correct = !unresolvedGuidedOrUse && (
            !isCheck
            || mode === "all-correct"
            || mode === "unresolved-required-miss"
            || (mode === "unresolved-miss"
              ? checkIndex < checkQuestions.length - 1
              : checkIndex < belowThresholdCorrectCount)
          );
          return {
            questionId: question.id,
            prompt: question.prompt,
            answer: question.answer,
            selected: correct ? question.answer : "__wrong__",
            correct,
            phase: getQuestionPhase(question),
            conceptIds: getQuestionConceptIds(question),
            skillIds: getQuestionSkillIds(question)
          };
        });
      correctedCheckQuestionIds = ["unresolved-miss", "unresolved-required-miss"].includes(mode)
        ? new Set()
        : new Set(
          sessionAnswers.filter((answer) => answer.phase === "check" && !answer.correct).map((answer) => answer.questionId)
        );
      completeLesson(lesson);
      const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
      const checkAnswers = sessionAnswers.filter((answer) => answer.phase === "check");
      return {
        lessonStatus: saved.lessonMastery[lesson.id].status,
        runPracticed: saved.lessonRunProgress[lesson.id].practicedRunIds.includes(runId),
        totalRunCount: lesson.learning.runs.length,
        runSecure: saved.lessonRunProgress[lesson.id].secureRunIds.includes(runId),
        skillStatuses: runSkillIds.map((skillId) => saved.skillMastery[skillId]?.status),
        checkScore: checkAnswers.filter((answer) => answer.correct).length / checkAnswers.length,
        unresolvedMisses: checkAnswers.filter((answer) => !answer.correct).length,
        unresolvedGuidedOrUse: sessionAnswers.filter((answer) => (
          !answer.correct && ["guided", "use"].includes(answer.phase)
        )).length
      };
    };

    const resetLearningState = () => saveProgress({
      ...JSON.parse(localStorage.getItem("nederurdu-progress-v4")),
      lessonMastery: {},
      skillMastery: {},
      lessonRunProgress: {},
      completedLessons: []
    });

    const belowThreshold = runLesson("below-threshold");
    resetLearningState();
    const unresolvedMiss = runLesson("unresolved-miss");
    resetLearningState();
    const unresolvedRequiredMiss = runLesson("unresolved-required-miss");
    resetLearningState();
    const allCorrect = runLesson("all-correct");
    return { belowThreshold, unresolvedMiss, unresolvedRequiredMiss, allCorrect };
  });

  expect(result.belowThreshold.runPracticed).toBe(true);
  expect(result.belowThreshold.lessonStatus).toBe(
    result.belowThreshold.totalRunCount === 1 ? "practiced" : "introduced"
  );
  expect(result.belowThreshold.runSecure).toBe(false);
  expect(result.unresolvedMiss.checkScore).toBeGreaterThanOrEqual(0.8);
  expect(result.unresolvedMiss.unresolvedMisses).toBeGreaterThan(0);
  expect(result.unresolvedMiss.runPracticed).toBe(true);
  expect(result.unresolvedMiss.lessonStatus).toBe(
    result.unresolvedMiss.totalRunCount === 1 ? "practiced" : "introduced"
  );
  expect(result.unresolvedMiss.runSecure).toBe(false);
  expect(result.unresolvedMiss.skillStatuses.every((status) => status !== "secure")).toBe(true);
  expect(result.unresolvedRequiredMiss.checkScore).toBe(1);
  expect(result.unresolvedRequiredMiss.unresolvedGuidedOrUse).toBeGreaterThan(0);
  expect(result.unresolvedRequiredMiss.runPracticed).toBe(true);
  expect(result.unresolvedRequiredMiss.lessonStatus).toBe(
    result.unresolvedRequiredMiss.totalRunCount === 1 ? "practiced" : "introduced"
  );
  expect(result.unresolvedRequiredMiss.runSecure).toBe(false);
  expect(result.unresolvedRequiredMiss.skillStatuses.every((status) => status !== "secure")).toBe(true);
  expect(result.allCorrect.runSecure).toBe(true);
  expect(result.allCorrect.skillStatuses.every((status) => status === "secure")).toBe(true);
});

test("an incomplete Independent Check skill set cannot secure omitted required skills", async ({ page }) => {
  await openCleanApp(page);
  const result = await page.evaluate(() => {
    const lesson = window.NEDERURDU_COURSE.lessons.find((candidate) => (
      candidate.learning?.runs?.some((run) => (run.skillIds || []).length >= 2)
    ));
    if (!lesson) throw new Error("No multi-skill learning run is available.");
    startLesson(lesson.id);
    const runId = activeLearningRun.id;
    const requiredSkillIds = [...activeLearningRun.skillIds];
    const representedSkillId = requiredSkillIds[0];
    const omittedSkillIds = requiredSkillIds.slice(1);
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4") || "{}");
    saveProgress({
      ...saved,
      skillMastery: Object.fromEntries(requiredSkillIds.map((skillId) => [
        skillId,
        { status: "practiced", lessonId: lesson.id }
      ]))
    });
    sessionQuestions = Array.from({ length: 4 }, (_, index) => ({
      id: `coverage-probe-${index + 1}`,
      semanticKey: `coverage-probe:${index + 1}`,
      type: "meaning",
      phase: "check",
      prompt: "probe",
      answer: "درست",
      options: ["درست", "غلط"],
      conceptIds: [],
      skillIds: [representedSkillId]
    }));
    sessionAnswers = sessionQuestions.map((question) => ({
      questionId: question.id,
      prompt: question.prompt,
      answer: question.answer,
      selected: question.answer,
      correct: true,
      phase: "check",
      conceptIds: [],
      skillIds: [representedSkillId]
    }));
    correctedCheckQuestionIds = new Set();
    completeLesson(lesson);
    const after = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
    return {
      runSecure: after.lessonRunProgress?.[lesson.id]?.secureRunIds?.includes(runId),
      lessonStatus: after.lessonMastery?.[lesson.id]?.status,
      runPracticed: after.lessonRunProgress?.[lesson.id]?.practicedRunIds?.includes(runId),
      totalRunCount: lesson.learning.runs.length,
      omittedStatuses: omittedSkillIds.map((skillId) => after.skillMastery?.[skillId]?.status)
    };
  });

  expect(result.runSecure).toBe(false);
  expect(result.runPracticed).toBe(true);
  expect(result.lessonStatus).toBe(result.totalRunCount === 1 ? "practiced" : "introduced");
  expect(result.omittedStatuses.every((status) => status === "practiced")).toBe(true);
});

test("kinetic experience layer responds to learning progress", async ({ page }) => {
  await openCleanApp(page);

  await expect(page.locator(".experience-backdrop")).toHaveCount(1);
  await expect(page.locator(".mission-atmosphere")).toHaveCount(1);
  await expect(page.locator(".unit-card-aura")).toHaveCount(1);

  await page.evaluate(() => window.startLesson("a0-letters-1"));
  await page.evaluate(() => {
    let guard = 0;
    while (guard < 20) {
      const question = getActiveQuestion();
      if (isInfoQuestion(question)) {
        continueInfoStep();
      } else {
        chooseAnswer(question.answer);
        checkAnswer();
        if (document.querySelector(".quiz-combo")) break;
        nextQuestion();
      }
      guard += 1;
    }
  });

  await expect(page.locator(".quiz-combo b")).toHaveText("2");
  await expect(page.locator(".answer-moment.is-correct")).toBeAttached();
});

test("the three bottom navigation destinations open without the progress page", async ({ page }) => {
  await openCleanApp(page);

  await page.locator('[data-action="practice"]').click();
  await expect(page.locator(".practice-screen")).toBeVisible();
  await expect(page.locator(".review-hub-grid")).toBeVisible();
  await page.locator('.bottom-nav [data-action="settings"]').click();
  await expect(page.locator(".settings-panel")).toBeVisible();
  await expect(page.locator('.settings-panel [data-action="letters"]')).toBeVisible();
  await expect(page.locator('.settings-panel [data-action="progress"]')).toHaveCount(0);
  await expect(page.locator('.settings-panel [data-action="review"][data-review-kind="today"]')).toBeVisible();
  await expect(page.locator('.settings-panel [data-action="review"][data-review-kind="old"]')).toBeVisible();
  await expect(page.locator("body")).not.toContainText("آپ کی پیش رفت");
  await page.locator('[data-action="home"]').click();
  await expect(page.locator(".learn-screen")).toBeVisible();
});

test("beginner settings persist and pronunciation hints render for core words", async ({ page }) => {
  await openCleanApp(page);

  await page.locator('[data-action="settings"]').click();
  await expect(page.locator('[data-setting="largeText"]')).toBeVisible();
  await page.locator('[data-setting="largeText"]').click();
  await expect(page.locator("body")).toHaveClass(/large-text/);

  await page.evaluate(() => {
    startLesson("a0-letters-1");
    activeQuestionIndex = sessionQuestions.findIndex((question) => question.concept?.dutch === "appel");
    render();
  });
  const appleCard = page.locator(".learning-teaching-card").filter({ hasText: "appel" });
  await expect(appleCard).toBeVisible();
  await expect(appleCard.locator(".teaching-pronunciation")).toContainText(/[\u0600-\u06ff]/);
  await expect(appleCard).toContainText("سیب");

  const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);
  expect(stored.settings.largeText).toBe(true);
});

test("slow audio setting lowers speech synthesis rate", async ({ page }) => {
  await openCleanApp(page);

  const rate = await page.evaluate(() => {
    window.__spokenRate = 0;
    const originalSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
    window.speechSynthesis.speak = (utterance) => {
      window.__spokenRate = utterance.rate;
      window.speechSynthesis.speak = originalSpeak;
    };
    window.speakDutch("appel");
    return window.__spokenRate;
  });
  expect(rate).toBeGreaterThan(0);
  expect(rate).toBeLessThan(0.88);
});

test("natural speech prefers an enhanced local Netherlands voice", async ({ page }) => {
  await openCleanApp(page);

  const voice = await page.evaluate(() => window.selectPreferredDutchVoice([
    { name: "Generic Dutch", lang: "nl-BE", localService: true },
    { name: "Cloud Neural Dutch", lang: "nl-NL", localService: false },
    { name: "Xander Enhanced", lang: "nl-NL", localService: true }
  ]));

  expect(voice.name).toBe("Xander Enhanced");
});

test("native speech receives cleaned text and tuned pacing", async ({ page }) => {
  await openCleanApp(page);

  const spoken = await page.evaluate(() => {
    window.__nativeSpeech = null;
    window.NederUrduTts = {
      speakNatural(text, rate, pitch) {
        window.__nativeSpeech = { text, rate, pitch };
        return true;
      }
    };
    window.speakDutch("Hoi | hoe gaat het?");
    return window.__nativeSpeech;
  });

  expect(spoken.text).toBe("Hoi, hoe gaat het?");
  expect(spoken.rate).toBeGreaterThanOrEqual(0.7);
  expect(spoken.rate).toBeLessThan(0.9);
  expect(spoken.pitch).toBeCloseTo(0.98, 2);
});

test("securing every run marks its lesson complete on the path", async ({ page }) => {
  await openCleanApp(page);

  const result = await page.evaluate(() => {
    const lesson = window.NEDERURDU_COURSE.lessons[0];
    for (const run of lesson.learning.runs) {
      activeLessonId = lesson.id;
      activeLearningRun = run;
      sessionQuestions = buildLearningFirstSession(lesson, run);
      correctedCheckQuestionIds = new Set();
      sessionAnswers = sessionQuestions
        .filter((question) => !isInfoQuestion(question))
        .map((question) => ({
          questionId: question.id,
          prompt: question.prompt,
          answer: question.answer,
          selected: question.answer,
          correct: true,
          phase: getQuestionPhase(question),
          conceptIds: getQuestionConceptIds(question),
          skillIds: getQuestionSkillIds(question)
        }));
      completeLesson(lesson);
    }
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
    return {
      id: lesson.id,
      completed: saved.completedLessons.includes(lesson.id),
      mastery: saved.lessonMastery[lesson.id].status
    };
  });
  await expect(page.locator(".complete-screen")).toBeVisible();
  await page.locator('[data-action="home"]').click();
  await page.evaluate(() => {
    pathExpanded = true;
    render();
  });
  await expect(page.locator(`[data-path-lesson="${result.id}"] .lesson-node`)).toHaveClass(/completed/);
  const completed = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)).completedLessons, STORAGE_KEY);
  expect(completed).toContain(result.id);
  expect(result.completed).toBe(true);
  expect(result.mastery).toBe("secure");
});

test("completing a non-final run can start the next incomplete run directly", async ({ page }) => {
  await openCleanApp(page);

  const firstCompletion = await page.evaluate(() => {
    const lesson = window.NEDERURDU_COURSE.lessons.find((item) => item.learning?.runs?.length > 1);
    startLesson(lesson.id);
    const firstRunId = activeLearningRun.id;
    const expectedNextRunId = lesson.learning.runs.find((run) => run.id !== firstRunId).id;
    sessionAnswers = sessionQuestions
      .filter((question) => !isInfoQuestion(question))
      .map((question) => ({
        questionId: question.id,
        prompt: question.prompt,
        answer: question.answer,
        selected: question.answer,
        correct: true,
        phase: getQuestionPhase(question),
        conceptIds: getQuestionConceptIds(question),
        skillIds: getQuestionSkillIds(question)
      }));
    correctedCheckQuestionIds = new Set();
    completeLesson(lesson);
    const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4"));
    return {
      lessonId: lesson.id,
      firstRunId,
      expectedNextRunId,
      completedRunIds: saved.lessonRunProgress[lesson.id].completedRunIds,
      lessonCompleted: saved.completedLessons.includes(lesson.id)
    };
  });

  expect(firstCompletion.completedRunIds).toContain(firstCompletion.firstRunId);
  expect(firstCompletion.lessonCompleted).toBe(false);
  await expect(page.locator(".complete-screen")).toBeVisible();
  await expect(page.locator('[data-action="start"]')).toHaveText("اگلا سیکھنے والا حصہ");
  await page.locator('[data-action="start"]').click();

  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".learning-phase-step.phase-learn.active")).toBeVisible();
  const nextRun = await page.evaluate(() => ({
    id: activeLearningRun.id,
    phase: getQuestionPhase(getActiveQuestion())
  }));
  expect(nextRun.id).toBe(firstCompletion.expectedNextRunId);
  expect(nextRun.id).not.toBe(firstCompletion.firstRunId);
  expect(nextRun.phase).toBe("learn");
});

test("matching pairs enable Check after every pair is matched", async ({ page }) => {
  await openCleanApp(page);
  await page.evaluate(() => {
    window.NEDERURDU_CHAPTERS[0].lessons.push({
      id: "test-match-pairs",
      unit: "دہرائی",
      title: "جوڑے",
      description: "",
      xp: 0,
      questions: [{
        type: "match-pairs",
        label: "صحیح جوڑے ملائیں",
        prompt: "جوڑے",
        answer: "matched",
        explain: "",
        pairs: [
          { id: "one", left: "huis", right: "گھر" },
          { id: "two", left: "boek", right: "کتاب" }
        ]
      }]
    });
    window.startLesson("test-match-pairs");
  });

  const checkButton = page.locator('[data-action="check"]');
  await expect(checkButton).toBeDisabled();
  await page.locator('[data-action="match-pair"][data-match-id="one"][data-match-side="left"]').click();
  await page.locator('[data-action="match-pair"][data-match-id="one"][data-match-side="right"]').click();
  await page.locator('[data-action="match-pair"][data-match-id="two"][data-match-side="left"]').click();
  await page.locator('[data-action="match-pair"][data-match-id="two"][data-match-side="right"]').click();
  await expect(checkButton).toBeEnabled();
});

test("course bank has stable IDs, valid answers, and visual mappings without fixed quotas", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const lessons = window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons);
    const normalLessons = window.NEDERURDU_COURSE.lessons;
    const allowedTypes = new Set([
      "meaning", "reverse", "image-choice", "listen-choice",
      "situation", "uitleg", "fill-gap", "build", "match-pairs",
      "document-choice", "sequence", "short-input", "speak-repeat"
    ]);
    const ids = lessons.map((lesson) => lesson.id);
    const invalidAnswers = [];
    const invalidTypes = [];
    const emptyLessons = [];
    const duplicateQuestionIds = [];
    const missingVisualIds = [];
    const invalidImageVisuals = [];
    const invalidFillGaps = [];
    const invalidFillVisuals = [];
    const unsafeImageChoices = [];
    const activeAliasFailures = [];
    const retiredIsolationFailures = [];
    const retiredActiveOverlaps = [];
    const unknownRunExerciseIds = [];
    const forbiddenWording = [
      "نفی والا لفظ",
      "de/het والا چھوٹا لفظ",
      "اشارہ والا لفظ",
      "تم بے تکلف",
      "آپ ادب والا",
      "learner"
    ];
    const courseText = JSON.stringify(window.NEDERURDU_CHAPTERS);
    const getExercises = (lesson) => lesson.exercises || lesson.questions || [];

    const visuals = window.NEDERURDU_WORD_VISUALS;
    const getVisualId = (visual) => visual.id || String(visual.src || "").split("/").pop().replace(/\.[^.]+$/, "");
    const visualIdSet = new Set(visuals.map(getVisualId));
    const normalize = (value) => String(value || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
    const visualMatchesAnswer = (visualId, answer) => {
      const visual = visuals.find((item) => getVisualId(item) === visualId);
      if (!visual) return false;
      const answerTerm = normalize(answer);
      const answerNoArticle = answerTerm.replace(/^(de|het|een|geen)\s+/, "");
      return [getVisualId(visual), visual.canonicalTerm, ...(visual.dutchTerms || [])]
        .map(normalize)
        .some((term) => term === answerTerm || term === answerNoArticle || term === `getal ${answerTerm}`);
    };

    for (const lesson of normalLessons) {
      if (!Array.isArray(lesson.exercises) || lesson.questions !== lesson.exercises) {
        activeAliasFailures.push(lesson.id);
      }
      const activeIds = new Set((lesson.exercises || []).map((question) => question.id));
      for (const question of lesson.legacyQuestions || []) {
        if (
          question.retiredCompatibility !== true
          || question.adaptiveReviewEligible !== false
          || question.runId
        ) {
          retiredIsolationFailures.push(`${lesson.id}:${question.legacyId || question.id}`);
        }
        if (activeIds.has(question.id)) {
          retiredActiveOverlaps.push(`${lesson.id}:${question.id}`);
        }
      }
      for (const run of lesson.learning?.runs || []) {
        const phases = run.phases || {};
        const selectedIds = [
          ...(phases.understand?.exerciseIds || []),
          ...(phases.guidedPractice?.exerciseIds || phases.guided?.exerciseIds || []),
          ...(phases.use?.exerciseIds || []),
          ...(phases.independentCheck?.exerciseIds || phases.check?.exerciseIds || [])
        ];
        for (const exerciseId of selectedIds) {
          if (!activeIds.has(exerciseId)) unknownRunExerciseIds.push(`${lesson.id}:${exerciseId}`);
        }
      }
    }

    for (const lesson of lessons) {
      const questions = getExercises(lesson);
      if (!questions.length) emptyLessons.push(lesson.id);
      const questionIds = questions.map((question) => question.id);
      if (new Set(questionIds).size !== questionIds.length) duplicateQuestionIds.push(lesson.id);
      for (const question of questions) {
        if (!allowedTypes.has(question.type)) invalidTypes.push(`${lesson.id}:${question.type}`);
        if (question.options && !question.options.includes(question.answer)) {
          invalidAnswers.push(`${lesson.id}:${question.prompt}`);
        }
        if (question.type === "image-choice" && (!question.visualId || !visualIdSet.has(question.visualId))) missingVisualIds.push(question.id);
        if (question.type === "image-choice" && question.visualId && !visualMatchesAnswer(question.visualId, question.answer)) invalidImageVisuals.push(question.id);
        if (question.type === "image-choice" && (/[,?!]/.test(question.answer) || String(question.answer).trim().split(/\s+/).length > 3)) {
          unsafeImageChoices.push(question.id);
        }
        if (question.type === "fill-gap") {
          const blankCount = (String(question.prompt || "").match(/___/g) || []).length;
          const badOption = (question.options || []).some((option) => !option || option === "___" || /\s|,/.test(option));
          if (
            blankCount !== 1
            || String(question.prompt || "").trim() === "___"
            || !question.options?.includes(question.answer)
            || question.options.length < 3
            || badOption
            || !question.speak
            || String(question.speak).includes("___")
          ) {
            invalidFillGaps.push(question.id);
          }
          if (question.visualId) {
            if (!visualMatchesAnswer(question.visualId, question.answer)) invalidFillVisuals.push(question.id);
          }
        }
      }
    }

    const visualIds = visuals.map(getVisualId);
    const allTerms = visuals.flatMap((visual) => visual.dutchTerms.map((term) => term.toLowerCase()));

    return {
      lessonCount: lessons.length,
      questionCount: lessons.reduce((total, lesson) => total + getExercises(lesson).length, 0),
      duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
      duplicateQuestionIds,
      invalidAnswers,
      invalidTypes,
      emptyLessons,
      visualCount: visuals.length,
      duplicateVisualIds: visualIds.filter((id, index) => visualIds.indexOf(id) !== index),
      duplicateVisualTerms: allTerms.filter((term, index) => allTerms.indexOf(term) !== index),
      missingVisualIds,
      invalidImageVisuals,
      invalidFillGaps,
      invalidFillVisuals,
      unsafeImageChoices,
      activeAliasFailures,
      retiredIsolationFailures,
      retiredActiveOverlaps,
      unknownRunExerciseIds,
      invalidVisualRecords: visuals.filter((visual) => !getVisualId(visual) || !visual.src || !(visual.altUrdu || visual.alt) || !(visual.canonicalTerm || visual.terms?.[0]) || !(visual.concept || visual.terms?.length) || !(visual.kind || visual.src)).map(getVisualId),
      forbiddenWording: forbiddenWording.filter((phrase) => courseText.includes(phrase))
    };
  });

  expect(audit.lessonCount).toBeGreaterThan(0);
  expect(audit.questionCount).toBeGreaterThan(0);
  expect(audit.visualCount).toBeGreaterThan(0);
  for (const field of [
    "duplicateIds", "duplicateQuestionIds", "invalidAnswers", "invalidTypes",
    "emptyLessons", "duplicateVisualIds", "duplicateVisualTerms", "missingVisualIds",
    "invalidImageVisuals", "invalidFillGaps", "invalidFillVisuals",
    "unsafeImageChoices", "invalidVisualRecords", "forbiddenWording",
    "activeAliasFailures", "retiredIsolationFailures", "retiredActiveOverlaps",
    "unknownRunExerciseIds"
  ]) {
    expect(audit[field], field).toEqual([]);
  }
});

test("every approved visual loads as a 1024px WebP without fallbacks", async ({ page }) => {
  await openCleanApp(page);

  const audit = await page.evaluate(async () => {
    const visuals = window.NEDERURDU_WORD_VISUALS;
    const results = await Promise.all(visuals.map((visual) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve({
        id: visual.id,
        src: visual.src,
        width: image.naturalWidth,
        height: image.naturalHeight,
        loaded: true
      });
      image.onerror = () => resolve({ id: visual.id, src: visual.src, loaded: false });
      image.src = visual.src;
    })));

    return {
      pending: window.NEDERURDU_PENDING_VISUAL_IDS,
      invalid: results.filter((visual) => (
        !visual.loaded
        || !visual.src.endsWith(".webp")
        || visual.width !== 1024
        || visual.height !== 1024
      ))
    };
  });

  expect(audit).toEqual({ pending: [], invalid: [] });
});

test("A0 learning runs respect the small-target cap and retain explicit media", async ({ page }) => {
  await openCleanApp(page);

  const audit = await page.evaluate(() => {
    const a0 = window.NEDERURDU_CHAPTERS.find((chapter) => chapter.id === "a0");
    const knownConceptIds = new Set(window.NEDERURDU_COURSE.concepts.map((concept) => concept.id));
    const normalLessons = a0.lessons.filter((lesson) => lesson.kind !== "mission");
    return {
      a0Count: a0.lessons.length,
      order: a0.lessons.map((lesson) => lesson.id),
      lessons: normalLessons.map((lesson) => {
        const id = lesson.id;
        const questions = lesson.exercises || lesson.questions || [];
        return {
          id,
          structuredConcepts: Array.isArray(lesson.conceptIds)
            && lesson.conceptIds.length > 0
            && lesson.conceptIds.every((conceptId) => knownConceptIds.has(conceptId)),
          runs: lesson.learning.runs.map((run) => {
            const generated = buildLearningFirstSession(lesson, run);
            return {
              newConceptCount: run.newConceptIds.length,
              hasPattern: Boolean(run.patternId),
              phases: [...new Set(generated.map(getQuestionPhase))],
              checkCount: generated.filter((question) => getQuestionPhase(question) === "check").length
            };
          }),
          missingImageIds: questions
            .filter((question) => question.type === "image-choice" && !question.visualId)
            .map((question) => question.id),
          unsafeImageChoices: questions
            .filter((question) => question.type === "image-choice" && (/[,?!]/.test(question.answer) || String(question.answer).trim().split(/\s+/).length > 3))
            .map((question) => question.id),
          missingAudio: questions
            .filter((question) => question.type === "listen-choice" && !question.speak)
            .map((question) => question.id)
        };
      })
    };
  });

  expect(audit.order[0]).toBe("a0-greetings-courtesy");
  for (const lesson of audit.lessons) {
    expect(lesson.structuredConcepts, lesson.id).toBe(true);
    expect(lesson.missingImageIds, lesson.id).toEqual([]);
    expect(lesson.unsafeImageChoices, lesson.id).toEqual([]);
    expect(lesson.missingAudio, lesson.id).toEqual([]);
    expect(lesson.runs.length, lesson.id).toBeGreaterThan(0);
    for (const run of lesson.runs) {
      expect(run.newConceptCount, lesson.id).toBeLessThanOrEqual(run.hasPattern ? 3 : 4);
      expect(run.phases, lesson.id).toEqual(["learn", "understand", "guided", "use", "check"]);
      expect(run.checkCount, lesson.id).toBeGreaterThanOrEqual(4);
      expect(run.checkCount, lesson.id).toBeLessThanOrEqual(6);
    }
  }
});

test("all review modes accept new A0 daily lesson IDs", async ({ page }) => {
  test.setTimeout(60_000);
  await openCleanApp(page, {
    completedLessons: ["a0-greetings-courtesy", "a0-understanding-help"],
    lastLessonId: "a0-understanding-help",
    mistakes: [{
      lessonId: "a0-greetings-courtesy",
      questionId: "a0-greetings-courtesy-meaning-02",
      prompt: "hallo",
      answer: "سلام"
    }]
  });
  await setLessonSkillStatus(page, ["a0-greetings-courtesy", "a0-understanding-help"]);

  await page.locator('[data-action="practice"]').click();
  await page.locator('[data-action="review"][data-review-kind="mistakes"]').click();
  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".quiz-progress")).toHaveAttribute("aria-label", /پیش رفت|فیصد|مرحلہ|%/);
  await expect(page.locator(".quiz-progress")).not.toHaveAttribute("aria-label", /\d+\s+از\s+\d+/);
  await expect(page.locator(".quiz-count")).toHaveCount(0);

  await page.locator('[data-action="home"]').click();
  await expect(page.locator(".learn-screen")).toBeVisible();
  await page.locator('.bottom-nav [data-action="settings"]').click();
  await expect(page.locator(".settings-panel")).toBeVisible();
  await page.locator('[data-action="review"][data-review-kind="today"]').click();
  await expect(page.locator(".learning-phase-header")).toBeVisible();

  await page.locator('[data-action="home"]').click();
  await expect(page.locator(".learn-screen")).toBeVisible();
  await page.locator('.bottom-nav [data-action="settings"]').click();
  await expect(page.locator(".settings-panel")).toBeVisible();
  await page.locator('[data-action="review"][data-review-kind="old"]').click();
  await expect(page.locator(".learning-phase-header")).toBeVisible();
});

test("A1 practical lessons use capped learning runs with complete phases", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const a1 = window.NEDERURDU_CHAPTERS.find((chapter) => chapter.id === "a1");
    const ids = [
      "a1-daily-routine", "a1-plans-invitations", "a1-cafe-ordering", "a1-shopping-clothes",
      "a1-public-transport", "a1-home-neighbours", "a1-health-pharmacy", "a1-work-school-messages"
    ];
    return {
      count: a1.lessons.length,
      duplicatedPathLessons: a1.subchapters.flatMap((subchapter) => subchapter.lessonIds)
        .filter((id, index, all) => all.indexOf(id) !== index),
      lessons: ids.map((id) => {
        const lesson = a1.lessons.find((item) => item.id === id);
        const questions = lesson.exercises || lesson.questions || [];
        return {
          id,
          runs: lesson.learning.runs.map((run) => {
            const generated = buildLearningFirstSession(lesson, run);
            return {
              newConceptCount: run.newConceptIds.length,
              phases: [...new Set(generated.map(getQuestionPhase))],
              checkCount: generated.filter((question) => getQuestionPhase(question) === "check").length
            };
          }),
          missingVisualIds: questions.filter((question) => question.type === "image-choice" && !question.visualId).map((question) => question.id),
          unsafeImageChoices: questions
            .filter((question) => question.type === "image-choice" && (/[,?!]/.test(question.answer) || String(question.answer).trim().split(/\s+/).length > 3))
            .map((question) => question.id),
          missingAudio: questions.filter((question) => question.type === "listen-choice" && !question.speak).map((question) => question.id)
        };
      })
    };
  });

  expect(audit.duplicatedPathLessons).toEqual([]);
  for (const lesson of audit.lessons) {
    expect(lesson.missingVisualIds, lesson.id).toEqual([]);
    expect(lesson.unsafeImageChoices, lesson.id).toEqual([]);
    expect(lesson.missingAudio, lesson.id).toEqual([]);
    expect(lesson.runs.length, lesson.id).toBeGreaterThan(0);
    for (const run of lesson.runs) {
      expect(run.newConceptCount, lesson.id).toBeLessThanOrEqual(5);
      expect(run.phases, lesson.id).toEqual(["learn", "understand", "guided", "use", "check"]);
      expect(run.checkCount, lesson.id).toBeGreaterThanOrEqual(4);
      expect(run.checkCount, lesson.id).toBeLessThanOrEqual(6);
    }
  }
});

test("A1 Unit 1 selected Use exercises carry authored scenario provenance", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const course = window.NEDERURDU_COURSE;
    const unit = course.units.find((candidate) => candidate.id === "a1-personal-info");
    const lessons = (unit?.lessonIds || [])
      .map((lessonId) => course.lessons.find((candidate) => candidate.id === lessonId))
      .filter(Boolean);
    return {
      unitId: unit?.id || "",
      lessonIds: lessons.map((lesson) => lesson.id),
      lessons: lessons.map((lesson) => {
        const byId = new Map((lesson.exercises || []).map((question) => [question.id, question]));
        const selectedUse = lesson.learning.runs.flatMap((run) => (
          (run.phases?.use?.exerciseIds || []).map((id) => byId.get(id)).filter(Boolean)
        )).filter((question) => question.scored !== false && !isInfoQuestion(question));
        return {
          id: lesson.id,
          selectedUseCount: selectedUse.length,
          invalidSources: selectedUse.filter((question) => (
            !/^a1-authored:[a-z0-9][a-z0-9:-]*$/i.test(String(question.scenarioSource || ""))
          )).map((question) => ({ id: question.id, scenarioSource: question.scenarioSource || "" }))
        };
      })
    };
  });

  expect(audit.unitId).toBe("a1-personal-info");
  expect(audit.lessonIds).toEqual(["a1-greetings-personal-info", "a1-details-forms"]);
  for (const lesson of audit.lessons) {
    expect(lesson.selectedUseCount, lesson.id).toBeGreaterThan(0);
    expect(lesson.invalidSources, lesson.id).toEqual([]);
  }
});

test("A1 Unit 1 patterns teach complete reusable sentences instead of fragments", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const course = window.NEDERURDU_COURSE;
    const unit = course.units.find((candidate) => candidate.id === "a1-personal-info");
    const lessons = (unit?.lessonIds || [])
      .map((lessonId) => course.lessons.find((candidate) => candidate.id === lessonId))
      .filter(Boolean);
    const normalize = (value) => String(value || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\u0600-\u06ff]+/g, " ")
      .trim()
      .replace(/\s+/g, " ");
    const dutchTokens = (value) => (
      String(value || "").match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]*/g) || []
    );
    return lessons.map((lesson) => {
      const pattern = course.patterns.find((candidate) => candidate.id === lesson.pattern?.id);
      const firstRun = lesson.learning.runs.find((run) => run.patternId === pattern?.id);
      const modelTokens = dutchTokens(pattern?.modelDutch);
      const completeTwoWordPredicate = modelTokens.length === 2
        && /^(?:regent|sneeuwt|waait|werkt|slaapt|komt|gaat|woont|begint|stopt)$/i.test(modelTokens[1]);
      const teachingValues = [
        pattern?.explanationUrdu,
        pattern?.contrastUrdu,
        pattern?.commonMistakeUrdu
      ].map(normalize);
      return {
        lessonId: lesson.id,
        patternId: pattern?.id || "",
        ownedModel: Boolean(pattern?.modelConceptId && lesson.conceptIds.includes(pattern.modelConceptId)),
        completeModel: modelTokens.length >= 3 || completeTwoWordPredicate,
        highlightVisible: dutchTokens(pattern?.highlight).every((token) => (
          dutchTokens(pattern?.modelDutch).map((item) => normalize(item)).includes(normalize(token))
        )),
        completeTeaching: [
          pattern?.titleUrdu,
          pattern?.modelUrdu,
          pattern?.explanationUrdu,
          pattern?.contrastUrdu,
          pattern?.commonMistakeUrdu
        ].every((value) => /[\u0600-\u06ff]/u.test(String(value || ""))),
        distinctTeaching: new Set(teachingValues).size === teachingValues.length
          && teachingValues.every(Boolean),
        selectedInRun: Boolean(firstRun),
        teachingBlockSelected: Boolean(firstRun?.teachingBlocks?.some((block) => (
          block.type === "pattern" && block.patternId === pattern.id
        )))
      };
    });
  });

  expect(audit.map((item) => item.lessonId)).toEqual([
    "a1-greetings-personal-info", "a1-details-forms"
  ]);
  for (const pattern of audit) {
    expect(pattern.patternId, pattern.lessonId).not.toBe("");
    expect(pattern.ownedModel, pattern.lessonId).toBe(true);
    expect(pattern.completeModel, pattern.lessonId).toBe(true);
    expect(pattern.highlightVisible, pattern.lessonId).toBe(true);
    expect(pattern.completeTeaching, pattern.lessonId).toBe(true);
    expect(pattern.distinctTeaching, pattern.lessonId).toBe(true);
    expect(pattern.selectedInRun, pattern.lessonId).toBe(true);
    expect(pattern.teachingBlockSelected, pattern.lessonId).toBe(true);
  }
});

test("A1 Unit 1 teaches document reading in Understand before any new Check format", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const course = window.NEDERURDU_COURSE;
    const unit = course.units.find((candidate) => candidate.id === "a1-personal-info");
    const lessons = (unit?.lessonIds || [])
      .map((lessonId) => course.lessons.find((candidate) => candidate.id === lessonId))
      .filter(Boolean);
    const selectedDocuments = [];
    const runFormatFailures = [];
    const practicedTypes = new Set();
    for (const lesson of lessons) {
      const byId = new Map((lesson.exercises || []).map((question) => [question.id, question]));
      for (const run of lesson.learning.runs) {
        const phases = run.phases || {};
        const understand = (phases.understand?.exerciseIds || []).map((id) => byId.get(id)).filter(Boolean);
        const guided = (phases.guidedPractice?.exerciseIds || phases.guided?.exerciseIds || [])
          .map((id) => byId.get(id)).filter(Boolean);
        const use = (phases.use?.exerciseIds || []).map((id) => byId.get(id)).filter(Boolean);
        const check = (phases.independentCheck?.exerciseIds || phases.check?.exerciseIds || [])
          .map((id) => byId.get(id)).filter(Boolean);
        const earlierTypes = new Set([...understand, ...guided, ...use].map((question) => question.type));
        for (const question of [...understand, ...guided, ...use]) practicedTypes.add(question.type);
        const newCheckTypes = [...new Set(
          check.filter((question) => !earlierTypes.has(question.type)).map((question) => question.type)
        )];
        if (newCheckTypes.length) {
          runFormatFailures.push({ lessonId: lesson.id, runId: run.id, newCheckTypes });
        }
        for (const question of understand.filter((candidate) => candidate.type === "document-choice")) {
          const document = question.document || {};
          const rows = document.rows || [];
          const lines = [
            ...(document.lines || []),
            ...(document.paragraphs || []),
            document.body,
            document.text
          ].filter(Boolean);
          const text = [
            document.title,
            ...rows.flatMap((row) => [row.label, row.value]),
            ...lines
          ].filter(Boolean).join(" ");
          selectedDocuments.push({
            lessonId: lesson.id,
            id: question.id,
            phase: question.phase,
            owned: Boolean(question.conceptIds?.length && question.skillIds?.length),
            kind: document.documentKind || document.kind || question.documentKind || "",
            informationUnits: rows.length + lines.length,
            dutchWords: text.match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]*/g)?.length || 0
          });
        }
      }
    }
    const mission = (unit?.missionIds || [])
      .map((missionId) => course.missions.find((candidate) => candidate.id === missionId))
      .find(Boolean);
    const missionFormatFailures = (mission?.variants || []).flatMap((variant) => {
      const useTypes = new Set(
        variant.questions.filter((question) => question.phase === "use").map((question) => question.type)
      );
      return [...new Set(
        variant.questions
          .filter((question) => question.phase === "independent-check")
          .filter((question) => !useTypes.has(question.type) && !practicedTypes.has(question.type))
          .map((question) => question.type)
      )].map((type) => ({ variantId: variant.id, type }));
    });
    return { selectedDocuments, runFormatFailures, missionFormatFailures };
  });

  expect(audit.selectedDocuments.length).toBeGreaterThan(0);
  for (const document of audit.selectedDocuments) {
    expect(document.phase, document.id).toBe("understand");
    expect(document.owned, document.id).toBe(true);
    expect(document.kind, document.id).not.toBe("");
    expect(document.informationUnits, document.id).toBeGreaterThanOrEqual(2);
    expect(document.dutchWords, document.id).toBeGreaterThanOrEqual(4);
  }
  expect(audit.runFormatFailures).toEqual([]);
  expect(audit.missionFormatFailures).toEqual([]);
});

test("A1 Unit 1 uses genuine A0 prerequisites and fully covered mission skills", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const course = window.NEDERURDU_COURSE;
    const chapter = course.chapters.find((candidate) => candidate.id === "a1");
    const unit = course.units.find((candidate) => candidate.id === "a1-personal-info");
    const skillById = new Map(course.skills.map((skill) => [skill.id, skill]));
    const conceptById = new Map(course.concepts.map((concept) => [concept.id, concept]));
    const lessonById = new Map(course.lessons.map((lesson) => [lesson.id, lesson]));
    const prerequisiteSkills = (chapter?.prerequisiteSkillIds || []).map((skillId) => {
      const skill = skillById.get(skillId);
      const concept = conceptById.get(skill?.conceptId);
      return {
        id: skillId,
        dutch: concept?.dutch || "",
        introducedInLessonId: skill?.introducedInLessonId || ""
      };
    });
    const prerequisiteDutch = prerequisiteSkills.map((item) => String(item.dutch).toLowerCase());
    const requiredFoundationAreas = {
      greeting: prerequisiteDutch.some((value) => /^(?:hallo|goedemorgen|dag|tot ziens)$/.test(value)),
      help: prerequisiteDutch.some((value) => /(?:begrijp|herhal|langzaam|langzamer|help)/.test(value)),
      identity: prerequisiteDutch.some((value) => /(?:mijn naam|ik heet|ik woon)/.test(value)),
      details: prerequisiteDutch.some((value) => /^(?:adres|postcode|woonplaats|telefoonnummer|e-mailadres)$/.test(value)),
      numberOrTime: prerequisiteDutch.some((value) => /^(?:nul|een|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|hoe laat is het|afspraak)$/.test(value))
    };
    const unitLessons = (unit?.lessonIds || []).map((id) => lessonById.get(id)).filter(Boolean);
    const normalLessonPrerequisiteFailures = unitLessons.flatMap((lesson) => (
      (lesson.prerequisiteSkillIds || []).filter((skillId) => {
        const skill = skillById.get(skillId);
        return !skill || !String(skill.introducedInLessonId || "").startsWith("a0-");
      }).map((skillId) => ({ lessonId: lesson.id, skillId }))
    ));
    const mission = (unit?.missionIds || [])
      .map((missionId) => course.missions.find((candidate) => candidate.id === missionId))
      .find(Boolean);
    const representedLessonIds = new Set((mission?.assessmentSkillIds || []).map((skillId) => (
      skillById.get(skillId)?.introducedInLessonId
    )).filter(Boolean));
    return {
      chapterPrerequisiteCount: prerequisiteSkills.length,
      nonA0ChapterPrerequisites: prerequisiteSkills
        .filter((item) => !item.introducedInLessonId.startsWith("a0-")),
      requiredFoundationAreas,
      normalLessonPrerequisiteFailures,
      unitLessonIds: unitLessons.map((lesson) => lesson.id),
      missionId: mission?.id || "",
      missingPrerequisiteLessonIds: unitLessons.map((lesson) => lesson.id)
        .filter((lessonId) => !(mission?.prerequisites?.lessonIds || []).includes(lessonId)),
      missingRepresentativeLessonIds: unitLessons.map((lesson) => lesson.id)
        .filter((lessonId) => !representedLessonIds.has(lessonId)),
      assessmentWithoutPrerequisite: (mission?.assessmentSkillIds || [])
        .filter((skillId) => !(mission?.prerequisites?.skillIds || []).includes(skillId)),
      variants: (mission?.variants || []).map((variant) => {
        const useSkills = new Set(
          variant.questions.filter((question) => question.phase === "use").flatMap(getQuestionSkillIds)
        );
        const checkQuestions = variant.questions.filter((question) => question.phase === "independent-check");
        const checkSkills = new Set(checkQuestions.flatMap(getQuestionSkillIds));
        return {
          id: variant.id,
          checkCount: checkQuestions.length,
          missingUseSkills: (mission?.assessmentSkillIds || []).filter((skillId) => !useSkills.has(skillId)),
          missingCheckSkills: (mission?.assessmentSkillIds || []).filter((skillId) => !checkSkills.has(skillId))
        };
      })
    };
  });

  expect(audit.chapterPrerequisiteCount).toBeGreaterThanOrEqual(5);
  expect(audit.nonA0ChapterPrerequisites).toEqual([]);
  expect(audit.requiredFoundationAreas).toEqual({
    greeting: true,
    help: true,
    identity: true,
    details: true,
    numberOrTime: true
  });
  expect(audit.normalLessonPrerequisiteFailures).toEqual([]);
  expect(audit.unitLessonIds).toEqual(["a1-greetings-personal-info", "a1-details-forms"]);
  expect(audit.missionId).toBe("a1-personal-info-mission");
  expect(audit.missingPrerequisiteLessonIds).toEqual([]);
  expect(audit.missingRepresentativeLessonIds).toEqual([]);
  expect(audit.assessmentWithoutPrerequisite).toEqual([]);
  expect(audit.variants.length).toBeGreaterThan(0);
  for (const variant of audit.variants) {
    expect(variant.checkCount, variant.id).toBeGreaterThanOrEqual(4);
    expect(variant.checkCount, variant.id).toBeLessThanOrEqual(6);
    expect(variant.missingUseSkills, variant.id).toEqual([]);
    expect(variant.missingCheckSkills, variant.id).toEqual([]);
  }
});

test("A1 Unit 1 preview, teaching, and mission stay inside phone tablet and desktop widths", async ({ page }) => {
  await openCleanApp(page, { selectedChapterId: "a1" });
  await page.evaluate(() => finishLaunch());

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 }
  ]) {
    await page.setViewportSize(viewport);
    await page.evaluate(() => showLessonPreview("a1-details-forms"));
    await expect(page.locator(".learning-preview")).toBeVisible();
    const previewBounds = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      action: (() => {
        const rect = document.querySelector(".learning-preview-action")?.getBoundingClientRect();
        return rect ? { left: rect.left, right: rect.right } : null;
      })()
    }));
    expect(previewBounds.scrollWidth, `${viewport.width}px preview`).toBeLessThanOrEqual(previewBounds.viewportWidth + 1);
    expect(previewBounds.action?.left, `${viewport.width}px preview action`).toBeGreaterThanOrEqual(-1);
    expect(previewBounds.action?.right, `${viewport.width}px preview action`).toBeLessThanOrEqual(previewBounds.viewportWidth + 1);

    await page.evaluate(() => showLessonPreview("a1-personal-info-mission"));
    await expect(page.locator(".learning-preview.mission-preview")).toBeVisible();
    const missionOverflow = await page.evaluate(() => (
      document.documentElement.scrollWidth > window.innerWidth + 1
    ));
    expect(missionOverflow, `${viewport.width}px mission preview`).toBe(false);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => showLessonPreview("a1-details-forms"));
  await page.locator('.learning-preview [data-action="start"]').click();
  await expect(page.locator(".learning-teaching-card")).toBeVisible();
  const teachingOverflow = await page.evaluate(() => (
    document.documentElement.scrollWidth > window.innerWidth + 1
  ));
  expect(teachingOverflow).toBe(false);
});

test("A1 Unit 2 has four sequenced lessons with capped complete learning runs", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const course = window.NEDERURDU_COURSE;
    const unit = course.units.find((candidate) => candidate.id === "a1-family-people");
    const conceptById = new Map(course.concepts.map((concept) => [concept.id, concept]));
    const lessons = (unit?.lessonIds || [])
      .map((lessonId) => course.lessons.find((candidate) => candidate.id === lessonId))
      .filter(Boolean);
    return {
      unitId: unit?.id || "",
      outcomeUrdu: unit?.outcomeUrdu || "",
      lessonIds: lessons.map((lesson) => lesson.id),
      movedTargetsStillNew: lessons.flatMap((lesson) => lesson.newConceptIds || [])
        .map((conceptId) => String(conceptById.get(conceptId)?.dutch || "").toLowerCase())
        .filter((dutch) => [
          "mijn vader werkt vandaag",
          "wij eten samen in de avond"
        ].includes(dutch)),
      lessons: lessons.map((lesson) => ({
        id: lesson.id,
        outcomeUrdu: lesson.outcomeUrdu || lesson.learning?.outcomeUrdu || "",
        runs: lesson.learning.runs.map((run) => {
          const generated = buildLearningFirstSession(lesson, run);
          return {
            newConceptCount: run.newConceptIds.length,
            hasPattern: Boolean(run.patternId),
            phases: [...new Set(generated.map(getQuestionPhase))],
            checkCount: generated.filter((question) => getQuestionPhase(question) === "check").length
          };
        })
      }))
    };
  });

  expect(audit.unitId).toBe("a1-family-people");
  expect(audit.outcomeUrdu).toMatch(/[\u0600-\u06ff]/u);
  expect(audit.lessonIds).toEqual([
    "a1-people-family-articles",
    "a1-hebben-family",
    "a1-family-routine-extra",
    "a1-child-care"
  ]);
  expect(audit.movedTargetsStillNew).toEqual([]);
  for (const lesson of audit.lessons) {
    expect(lesson.outcomeUrdu, lesson.id).toMatch(/[\u0600-\u06ff]/u);
    expect(lesson.runs.length, lesson.id).toBeGreaterThan(0);
    for (const run of lesson.runs) {
      expect(run.newConceptCount, lesson.id).toBeLessThanOrEqual(5);
      expect(run.phases, lesson.id).toEqual(["learn", "understand", "guided", "use", "check"]);
      expect(run.checkCount, lesson.id).toBeGreaterThanOrEqual(4);
      expect(run.checkCount, lesson.id).toBeLessThanOrEqual(6);
    }
  }
});

test("A1 Unit 2 Use exercises and mission variants use family authored scenarios", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const course = window.NEDERURDU_COURSE;
    const unit = course.units.find((candidate) => candidate.id === "a1-family-people");
    const lessons = (unit?.lessonIds || [])
      .map((lessonId) => course.lessons.find((candidate) => candidate.id === lessonId))
      .filter(Boolean);
    const lessonRows = lessons.map((lesson) => {
      const byId = new Map((lesson.exercises || []).map((question) => [question.id, question]));
      const selectedUse = lesson.learning.runs.flatMap((run) => (
        (run.phases?.use?.exerciseIds || []).map((id) => byId.get(id)).filter(Boolean)
      )).filter((question) => question.scored !== false && !isInfoQuestion(question));
      return {
        id: lesson.id,
        selectedUseCount: selectedUse.length,
        invalid: selectedUse.filter((question) => (
          !/^a1-authored:[a-z0-9][a-z0-9:-]*$/i.test(String(question.scenarioSource || ""))
          || /personal-info/i.test(String(question.scenarioSource || ""))
        )).map((question) => ({ id: question.id, scenarioSource: question.scenarioSource || "" }))
      };
    });
    const mission = (unit?.missionIds || [])
      .map((missionId) => course.missions.find((candidate) => candidate.id === missionId))
      .find(Boolean);
    return {
      lessonRows,
      missionId: mission?.id || "",
      variants: (mission?.variants || []).map((variant) => ({
        id: variant.id,
        useCount: variant.questions.filter((question) => question.phase === "use").length,
        invalid: variant.questions.filter((question) => (
          !/^a1-authored:family-people-mission:[a-z0-9:-]+$/i.test(String(question.scenarioSource || ""))
          || /personal-info/i.test(String(question.scenarioSource || ""))
        )).map((question) => ({ id: question.id, scenarioSource: question.scenarioSource || "" }))
      }))
    };
  });

  for (const lesson of audit.lessonRows) {
    expect(lesson.selectedUseCount, lesson.id).toBeGreaterThan(0);
    expect(lesson.invalid, lesson.id).toEqual([]);
  }
  expect(audit.missionId).toBe("a1-family-people-mission");
  expect(audit.variants).toHaveLength(3);
  for (const variant of audit.variants) {
    expect(variant.useCount, variant.id).toBe(6);
    expect(variant.invalid, variant.id).toEqual([]);
  }
});

test("A1 Unit 2 teaches complete patterns and explicit article and negation contrasts", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const course = window.NEDERURDU_COURSE;
    const unit = course.units.find((candidate) => candidate.id === "a1-family-people");
    const lessons = (unit?.lessonIds || [])
      .map((lessonId) => course.lessons.find((candidate) => candidate.id === lessonId))
      .filter(Boolean);
    const dutchTokens = (value) => (
      String(value || "").match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]*/g) || []
    );
    return lessons.map((lesson) => {
      const pattern = course.patterns.find((candidate) => candidate.id === lesson.pattern?.id);
      const selectedRunIndex = lesson.learning.runs.findIndex((run) => run.patternId === pattern?.id);
      const selectedRun = lesson.learning.runs[selectedRunIndex];
      const modelTokens = dutchTokens(pattern?.modelDutch);
      return {
        lessonId: lesson.id,
        patternId: pattern?.id || "",
        ownedModel: Boolean(pattern?.modelConceptId && lesson.conceptIds.includes(pattern.modelConceptId)),
        completeModel: modelTokens.length >= 3,
        selectedRunIndex,
        teachingBlockSelected: Boolean(selectedRun?.teachingBlocks?.some((block) => (
          block.type === "pattern" && block.patternId === pattern.id
        ))),
        completeUrduTeaching: [
          pattern?.titleUrdu,
          pattern?.modelUrdu,
          pattern?.explanationUrdu,
          pattern?.contrastUrdu,
          pattern?.commonMistakeUrdu
        ].every((value) => /[\u0600-\u06ff]/u.test(String(value || ""))),
        contrast: String(pattern?.contrastUrdu || "").toLowerCase()
      };
    });
  });

  expect(audit.map((item) => item.lessonId)).toEqual([
    "a1-people-family-articles",
    "a1-hebben-family",
    "a1-family-routine-extra",
    "a1-child-care"
  ]);
  for (const pattern of audit) {
    expect(pattern.patternId, pattern.lessonId).not.toBe("");
    expect(pattern.ownedModel, pattern.lessonId).toBe(true);
    expect(pattern.completeModel, pattern.lessonId).toBe(true);
    expect(pattern.selectedRunIndex, pattern.lessonId).toBe(0);
    expect(pattern.teachingBlockSelected, pattern.lessonId).toBe(true);
    expect(pattern.completeUrduTeaching, pattern.lessonId).toBe(true);
  }
  const articlePattern = audit.find((item) => item.lessonId === "a1-people-family-articles");
  expect(articlePattern.contrast).toContain("een");
  expect(articlePattern.contrast).toContain("de vader");
  expect(articlePattern.contrast).toContain("mijn vader");
  const hebbenPattern = audit.find((item) => item.lessonId === "a1-hebben-family");
  expect(hebbenPattern.contrast).toContain("geen");
  expect(hebbenPattern.contrast).toContain("niet");
});

test("A1 Unit 2 teaches the childcare handover document before checking it", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const course = window.NEDERURDU_COURSE;
    const unit = course.units.find((candidate) => candidate.id === "a1-family-people");
    const lessons = (unit?.lessonIds || [])
      .map((lessonId) => course.lessons.find((candidate) => candidate.id === lessonId))
      .filter(Boolean);
    const selectedDocuments = [];
    const runFormatFailures = [];
    const practicedTypes = new Set();
    for (const lesson of lessons) {
      const byId = new Map((lesson.exercises || []).map((question) => [question.id, question]));
      for (const run of lesson.learning.runs) {
        const phases = run.phases || {};
        const understand = (phases.understand?.exerciseIds || []).map((id) => byId.get(id)).filter(Boolean);
        const guided = (phases.guidedPractice?.exerciseIds || phases.guided?.exerciseIds || [])
          .map((id) => byId.get(id)).filter(Boolean);
        const use = (phases.use?.exerciseIds || []).map((id) => byId.get(id)).filter(Boolean);
        const check = (phases.independentCheck?.exerciseIds || phases.check?.exerciseIds || [])
          .map((id) => byId.get(id)).filter(Boolean);
        const earlierTypes = new Set([...understand, ...guided, ...use].map((question) => question.type));
        for (const question of [...understand, ...guided, ...use]) practicedTypes.add(question.type);
        const newCheckTypes = [...new Set(
          check.filter((question) => !earlierTypes.has(question.type)).map((question) => question.type)
        )];
        if (newCheckTypes.length) runFormatFailures.push({ lessonId: lesson.id, runId: run.id, newCheckTypes });
        for (const question of understand.filter((candidate) => candidate.type === "document-choice")) {
          const rows = question.document?.rows || [];
          selectedDocuments.push({
            lessonId: lesson.id,
            id: question.id,
            phase: question.phase,
            kind: question.document?.documentKind || "",
            labels: rows.map((row) => row.label),
            values: rows.map((row) => row.value),
            owned: Boolean(question.conceptIds?.length && question.skillIds?.length),
            authentic: question.authenticDocument === true
          });
        }
      }
    }
    const mission = (unit?.missionIds || [])
      .map((missionId) => course.missions.find((candidate) => candidate.id === missionId))
      .find(Boolean);
    const missionFormatFailures = (mission?.variants || []).flatMap((variant) => {
      const useTypes = new Set(
        variant.questions.filter((question) => question.phase === "use").map((question) => question.type)
      );
      return [...new Set(
        variant.questions
          .filter((question) => question.phase === "independent-check")
          .filter((question) => !useTypes.has(question.type) && !practicedTypes.has(question.type))
          .map((question) => question.type)
      )].map((type) => ({ variantId: variant.id, type }));
    });
    return { selectedDocuments, runFormatFailures, missionFormatFailures };
  });

  expect(audit.selectedDocuments).toHaveLength(1);
  expect(audit.selectedDocuments[0]).toMatchObject({
    lessonId: "a1-child-care",
    phase: "understand",
    kind: "child-care-handover-card",
    owned: true,
    authentic: true
  });
  expect(audit.selectedDocuments[0].labels).toEqual(["Leeftijd", "Brengen", "Ophalen", "Eten mee"]);
  expect(audit.selectedDocuments[0].values).toEqual(["5 jaar", "08:00", "17:00", "ja"]);
  expect(audit.runFormatFailures).toEqual([]);
  expect(audit.missionFormatFailures).toEqual([]);
});

test("A1 Unit 2 prerequisites and mission cover every lesson skill in order", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const course = window.NEDERURDU_COURSE;
    const chapter = course.chapters.find((candidate) => candidate.id === "a1");
    const unit = course.units.find((candidate) => candidate.id === "a1-family-people");
    const lessonById = new Map(course.lessons.map((lesson) => [lesson.id, lesson]));
    const skillById = new Map(course.skills.map((skill) => [skill.id, skill]));
    const chapterOrder = new Map((chapter?.lessonIds || []).map((lessonId, index) => [lessonId, index]));
    const unitLessons = (unit?.lessonIds || []).map((lessonId) => lessonById.get(lessonId)).filter(Boolean);
    const chronologyFailures = unitLessons.flatMap((lesson) => {
      const lessonIndex = chapterOrder.get(lesson.id);
      const prerequisiteLessonIds = new Set([
        ...(lesson.prerequisites?.lessonIds || []),
        ...(lesson.prerequisiteSkillIds || []).map((skillId) => skillById.get(skillId)?.introducedInLessonId)
      ].filter(Boolean));
      return [...prerequisiteLessonIds].filter((prerequisiteLessonId) => {
        if (prerequisiteLessonId.startsWith("a0-")) return false;
        const prerequisiteIndex = chapterOrder.get(prerequisiteLessonId);
        return prerequisiteIndex === undefined || prerequisiteIndex >= lessonIndex;
      }).map((prerequisiteLessonId) => ({ lessonId: lesson.id, prerequisiteLessonId }));
    });
    const mission = (unit?.missionIds || [])
      .map((missionId) => course.missions.find((candidate) => candidate.id === missionId))
      .find(Boolean);
    const representedLessonIds = new Set((mission?.assessmentSkillIds || []).map((skillId) => (
      skillById.get(skillId)?.introducedInLessonId
    )).filter(Boolean));
    return {
      unitLessonIds: unitLessons.map((lesson) => lesson.id),
      chronologyFailures,
      missionId: mission?.id || "",
      missionPrerequisiteLessonIds: mission?.prerequisites?.lessonIds || [],
      assessmentSkillCount: mission?.assessmentSkillIds?.length || 0,
      missingRepresentativeLessonIds: unitLessons.map((lesson) => lesson.id)
        .filter((lessonId) => !representedLessonIds.has(lessonId)),
      assessmentWithoutPrerequisite: (mission?.assessmentSkillIds || [])
        .filter((skillId) => !(mission?.prerequisites?.skillIds || []).includes(skillId)),
      variants: (mission?.variants || []).map((variant) => {
        const useQuestions = variant.questions.filter((question) => question.phase === "use");
        const checkQuestions = variant.questions.filter((question) => question.phase === "independent-check");
        const useSkills = new Set(useQuestions.flatMap(getQuestionSkillIds));
        const checkSkills = new Set(checkQuestions.flatMap(getQuestionSkillIds));
        return {
          id: variant.id,
          checkCount: checkQuestions.length,
          missingUseSkills: (mission?.assessmentSkillIds || []).filter((skillId) => !useSkills.has(skillId)),
          missingCheckSkills: (mission?.assessmentSkillIds || []).filter((skillId) => !checkSkills.has(skillId)),
          missingCorrectionHelp: checkQuestions.filter((question) => (
            !question.hintUrdu || !question.explainCorrectUrdu || !question.explainWrongUrdu
          )).map((question) => question.id)
        };
      })
    };
  });

  expect(audit.chronologyFailures).toEqual([]);
  expect(audit.missionId).toBe("a1-family-people-mission");
  expect(audit.missionPrerequisiteLessonIds).toEqual(audit.unitLessonIds);
  expect(audit.assessmentSkillCount).toBeGreaterThanOrEqual(4);
  expect(audit.assessmentSkillCount).toBeLessThanOrEqual(6);
  expect(audit.missingRepresentativeLessonIds).toEqual([]);
  expect(audit.assessmentWithoutPrerequisite).toEqual([]);
  expect(audit.variants).toHaveLength(3);
  for (const variant of audit.variants) {
    expect(variant.checkCount, variant.id).toBeGreaterThanOrEqual(4);
    expect(variant.checkCount, variant.id).toBeLessThanOrEqual(6);
    expect(variant.missingUseSkills, variant.id).toEqual([]);
    expect(variant.missingCheckSkills, variant.id).toEqual([]);
    expect(variant.missingCorrectionHelp, variant.id).toEqual([]);
  }
});

test("A1 Unit 2 preview, teaching, document, and mission fit phone tablet and desktop", async ({ page }) => {
  await openCleanApp(page, { selectedChapterId: "a1" });
  await page.evaluate(() => finishLaunch());

  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 }
  ]) {
    await page.setViewportSize(viewport);
    await page.evaluate(() => showLessonPreview("a1-child-care"));
    await expect(page.locator(".learning-preview")).toBeVisible();
    const previewOverflow = await page.evaluate(() => (
      document.documentElement.scrollWidth > window.innerWidth + 1
    ));
    expect(previewOverflow, `${viewport.width}px lesson preview`).toBe(false);

    await page.evaluate(() => showLessonPreview("a1-family-people-mission"));
    await expect(page.locator(".learning-preview.mission-preview")).toBeVisible();
    const missionOverflow = await page.evaluate(() => (
      document.documentElement.scrollWidth > window.innerWidth + 1
    ));
    expect(missionOverflow, `${viewport.width}px mission preview`).toBe(false);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => showLessonPreview("a1-child-care"));
  await page.locator('.learning-preview [data-action="start"]').click();
  await expect(page.locator(".learning-teaching-card")).toBeVisible();
  const teachingOverflow = await page.evaluate(() => (
    document.documentElement.scrollWidth > window.innerWidth + 1
  ));
  expect(teachingOverflow).toBe(false);
});

test("repeating a lesson selects incomplete runs before non-secure runs", async ({ page }) => {
  await openCleanApp(page);
  const selection = await page.evaluate(() => {
    const lesson = window.NEDERURDU_COURSE.lessons.find((item) => item.learning.runs.length >= 3);
    const runIds = lesson.learning.runs.map((run) => run.id);
    const chooseWith = (completedRunIds, secureRunIds) => {
      const saved = JSON.parse(localStorage.getItem("nederurdu-progress-v4") || "{}");
      saveProgress({
        ...saved,
        lessonRunProgress: {
          ...(saved.lessonRunProgress || {}),
          [lesson.id]: { completedRunIds, secureRunIds }
        }
      });
      return selectLearningRun(lesson).id;
    };
    return {
      runIds,
      initial: chooseWith([], []),
      afterFirstCompleted: chooseWith([runIds[0]], []),
      afterAllCompleted: chooseWith(runIds, [runIds[0]]),
      afterAllSecure: chooseWith(runIds, runIds)
    };
  });

  expect(selection.initial).toBe(selection.runIds[0]);
  expect(selection.afterFirstCompleted).toBe(selection.runIds[1]);
  expect(selection.afterAllCompleted).toBe(selection.runIds[1]);
  expect(selection.afterAllSecure).toBe(selection.runIds.at(-1));
});

test("A2 practical lessons use capped learning runs with complete phases", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const a2 = window.NEDERURDU_CHAPTERS.find((chapter) => chapter.id === "a2");
    const ids = [
      "a2-gemeente-documents", "a2-work-conditions", "a2-parent-school", "a2-landlord-repairs",
      "a2-doctor-advice", "a2-bills-banking", "a2-customer-complaints", "a2-formal-digital-messages"
    ];
    const pathIds = a2.subchapters.flatMap((subchapter) => subchapter.lessonIds);
    return {
      count: a2.lessons.length,
      duplicatedPathLessons: pathIds.filter((id, index) => pathIds.indexOf(id) !== index),
      lessons: ids.map((id) => {
        const lesson = a2.lessons.find((item) => item.id === id);
        const questions = lesson.exercises || lesson.questions || [];
        return {
          id,
          runs: lesson.learning.runs.map((run) => {
            const generated = buildLearningFirstSession(lesson, run);
            return {
              newConceptCount: run.newConceptIds.length,
              phases: [...new Set(generated.map(getQuestionPhase))],
              checkCount: generated.filter((question) => getQuestionPhase(question) === "check").length
            };
          }),
          missingVisualIds: questions.filter((question) => question.type === "image-choice" && !question.visualId).map((question) => question.id),
          unsafeImageChoices: questions
            .filter((question) => question.type === "image-choice" && (/[,?!]/.test(question.answer) || String(question.answer).trim().split(/\s+/).length > 3))
            .map((question) => question.id),
          missingAudio: questions.filter((question) => question.type === "listen-choice" && !question.speak).map((question) => question.id)
        };
      })
    };
  });

  expect(audit.duplicatedPathLessons).toEqual([]);
  for (const lesson of audit.lessons) {
    expect(lesson.missingVisualIds, lesson.id).toEqual([]);
    expect(lesson.unsafeImageChoices, lesson.id).toEqual([]);
    expect(lesson.missingAudio, lesson.id).toEqual([]);
    expect(lesson.runs.length, lesson.id).toBeGreaterThan(0);
    for (const run of lesson.runs) {
      expect(run.newConceptCount, lesson.id).toBeLessThanOrEqual(4);
      expect(run.phases, lesson.id).toEqual(["learn", "understand", "guided", "use", "check"]);
      expect(run.checkCount, lesson.id).toBeGreaterThanOrEqual(4);
      expect(run.checkCount, lesson.id).toBeLessThanOrEqual(6);
    }
  }
});

test("A1 and A2 selected reading tasks use authentic documents that grow in complexity", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const course = window.NEDERURDU_COURSE;
    const selectedQuestions = (lesson) => {
      const byId = new Map();
      for (const question of lesson.exercises || lesson.questions || []) {
        byId.set(question.id, question);
        if (question.legacyId) byId.set(question.legacyId, question);
      }
      const ids = lesson.learning.runs.flatMap((run) => {
        const phases = run.phases || {};
        return [
          ...(phases.understand?.exerciseIds || []),
          ...(phases.guidedPractice?.exerciseIds || phases.guided?.exerciseIds || []),
          ...(phases.use?.exerciseIds || []),
          ...(phases.independentCheck?.exerciseIds || phases.check?.exerciseIds || [])
        ];
      });
      return [...new Map(ids.map((id) => byId.get(id)).filter(Boolean).map((question) => [question.id, question])).values()];
    };
    const facts = (question) => {
      const document = question.document || {};
      const rows = document.rows || [];
      const lines = [
        ...(document.lines || []),
        ...(document.paragraphs || []),
        document.body,
        document.text
      ].filter(Boolean);
      const allText = [
        document.title,
        ...rows.flatMap((row) => [row.label, row.value]),
        ...lines
      ].filter(Boolean).join(" ");
      return {
        kind: document.documentKind || document.kind || question.documentKind || "",
        informationUnits: rows.length + lines.length,
        dutchWords: allText.match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'-]*/g)?.length || 0,
        genericShell: rows.length === 1
          && document.title === "عملی معلومات"
          && rows[0]?.label === "اہم بات"
      };
    };
    return ["a1", "a2"].map((chapterId) => {
      const chapter = course.chapters.find((candidate) => candidate.id === chapterId);
      const unitResults = chapter.unitIds.map((unitId, unitIndex) => {
        const unit = course.units.find((candidate) => candidate.id === unitId);
        const lessons = unit.lessonIds.map((id) => course.lessons.find((candidate) => candidate.id === id)).filter(Boolean);
        const documents = lessons.flatMap((lesson) => (
          selectedQuestions(lesson)
            .filter((question) => question.type === "document-choice")
            .map((question) => ({ lessonId: lesson.id, question, facts: facts(question) }))
        ));
        const progress = chapter.unitIds.length > 1 ? unitIndex / (chapter.unitIds.length - 1) : 0;
        const minimumUnits = chapterId === "a2" ? (progress < 0.34 ? 2 : progress < 0.67 ? 3 : 4) : 2;
        const minimumWords = chapterId === "a2" ? (progress < 0.34 ? 6 : progress < 0.67 ? 10 : 14) : 4;
        return {
          unitId,
          documentCount: documents.length,
          invalid: documents.filter(({ facts: item }) => (
            !item.kind
            || /^(?:document|informatie|info|kaart|card)$/i.test(item.kind)
            || item.genericShell
            || item.informationUnits < minimumUnits
            || item.dutchWords < minimumWords
          )).map(({ question, facts: item }) => ({
            id: question.id,
            ...item,
            minimumUnits,
            minimumWords
          }))
        };
      });
      return { chapterId, unitResults };
    });
  });

  for (const chapter of audit) {
    for (const unit of chapter.unitResults) {
      expect(unit.documentCount, `${chapter.chapterId}/${unit.unitId}`).toBeGreaterThan(0);
      expect(unit.invalid, `${chapter.chapterId}/${unit.unitId}`).toEqual([]);
    }
  }
});

test("the current chapter completion mission samples every unit and materializes all five skill areas", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate((chapterIds) => {
    const course = window.NEDERURDU_COURSE;
    const areas = ["meaning", "listening", "reading", "speaking-support", "practical-use"];
    const hasEvidence = {
      meaning: (question) => ["meaning", "reverse", "image-choice"].includes(question.type),
      listening: (question) => question.type === "listen-choice",
      reading: (question) => question.type === "document-choice",
      "speaking-support": (question) => question.type === "speak-repeat" && question.scored === false,
      "practical-use": (question) => (
        question.phase === "use"
        && ["situation", "build", "sequence", "short-input", "fill-gap"].includes(question.type)
      )
    };
    return course.chapters.filter((chapter) => chapterIds.includes(chapter.id)).map((chapter) => {
      const mission = course.missions.find((candidate) => candidate.id === chapter.contract.completionMissionId);
      const representedUnitIds = new Set((mission?.assessmentSkillIds || []).map((skillId) => {
        const skill = course.skills.find((candidate) => candidate.id === skillId);
        return course.lessons.find((lesson) => lesson.id === skill?.introducedInLessonId)?.unitId;
      }).filter(Boolean));
      return {
        chapterId: chapter.id,
        completionMissionId: mission?.id || "",
        completionCheck: mission?.completionCheck,
        declaredAreas: mission?.completionSkillAreas || [],
        missingUnitIds: chapter.unitIds.filter((unitId) => !representedUnitIds.has(unitId)),
        variants: (mission?.variants || []).map((variant) => ({
          id: variant.id,
          missingAreas: areas.filter((area) => !variant.questions.some(hasEvidence[area]))
        }))
      };
    });
  }, CURRENT_CHAPTER_GATE_IDS);

  for (const chapter of audit) {
    expect(chapter.completionMissionId, chapter.chapterId).not.toBe("");
    expect(chapter.completionCheck, chapter.chapterId).toBe(true);
    expect(chapter.declaredAreas, chapter.chapterId).toEqual([
      "meaning", "listening", "reading", "speaking-support", "practical-use"
    ]);
    expect(chapter.missingUnitIds, chapter.chapterId).toEqual([]);
    expect(chapter.variants.length, chapter.chapterId).toBeGreaterThan(0);
    for (const variant of chapter.variants) {
      expect(variant.missingAreas, `${chapter.chapterId}/${variant.id}`).toEqual([]);
    }
  }
});

test("current-chapter daily-life missions use only declared prerequisite skills", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate((chapterIds) => {
    const cannedStage = /(?:آپ\s+اسی\s+جگہ\s+پہلی\s+بار\s+بات\s+شروع\s+کر\s+رہے\s+ہیں|اب\s+سامنے\s+والے\s+کی\s+اگلی\s+بات\s+کا\s+جواب\s+خود\s+دیں|اب\s+سامنے\s+والا\s+مزید\s+معلومات\s+مانگتا\s+ہے|آخر\s+میں\s+آپ\s+کو\s+بات\s+واضح\s+کرکے\s+کام\s+مکمل\s+کرنا\s+ہے)/u;
    const malformedPunctuation = /[؟?]{2,}|[۔.]{3,}|[،,]{2,}/u;
    const missions = window.NEDERURDU_CHAPTERS
      .filter((chapter) => chapterIds.includes(chapter.id))
      .flatMap((chapter) => chapter.lessons)
      .filter((lesson) => lesson.kind === "mission");
    return missions.map((mission) => ({
      id: mission.id,
      variants: mission.variants.length,
      lengths: mission.variants.map((variant) => variant.questions.length),
      duplicateIds: mission.questions.length - new Set(mission.questions.map((question) => question.id)).size,
      missingSkills: mission.questions.filter((question) => !getQuestionSkillIds(question).length).map((question) => question.id),
      undeclaredSkills: mission.questions
        .filter((question) => question.skillIds.some((skillId) => !mission.assessmentSkillIds.includes(skillId)))
        .map((question) => question.id),
      assessmentWithoutPrerequisite: mission.assessmentSkillIds
        .filter((skillId) => !mission.prerequisites.skillIds.includes(skillId)),
      invalidTyped: mission.questions.filter((question) => question.type === "short-input" && (!question.optional || !question.fallbackTiles?.length || !question.acceptedAnswers?.length)).map((question) => question.id),
      scoredSpeaking: mission.questions.filter((question) => question.type === "speak-repeat" && !isInfoQuestion(question)).map((question) => question.id),
      cannedStages: mission.questions.filter((question) => cannedStage.test(question.prompt || "")).map((question) => question.id),
      genericDocuments: mission.questions.filter((question) => (
        question.type === "document-choice"
        && question.document?.rows?.length === 2
        && question.document.rows[0]?.label === "موصولہ بات"
        && question.document.rows[1]?.label === "آپ کا کام"
      )).map((question) => question.id),
      malformedCopy: mission.questions.filter((question) => (
        malformedPunctuation.test(question.prompt || "")
        || malformedPunctuation.test(question.document?.title || "")
        || question.document?.rows?.some((row) => (
          malformedPunctuation.test(row.label || "") || malformedPunctuation.test(row.value || "")
        ))
      )).map((question) => question.id),
      variantsContract: mission.variants.map((variant) => {
        const checkQuestions = variant.questions.filter((question) => question.phase === "independent-check");
        const coveredSkills = new Set(variant.questions.flatMap(getQuestionSkillIds));
        return {
          checkCount: checkQuestions.length,
          missingSkills: mission.assessmentSkillIds.filter((skillId) => !coveredSkills.has(skillId))
        };
      })
    }));
  }, CURRENT_CHAPTER_GATE_IDS);

  expect(audit.length).toBeGreaterThan(0);
  for (const mission of audit) {
    expect(mission.variants, mission.id).toBeGreaterThan(0);
    expect(mission.lengths.every((length) => length > 0), mission.id).toBe(true);
    expect(mission.duplicateIds, mission.id).toBe(0);
    expect(mission.missingSkills, mission.id).toEqual([]);
    expect(mission.undeclaredSkills, mission.id).toEqual([]);
    expect(mission.assessmentWithoutPrerequisite, mission.id).toEqual([]);
    expect(mission.invalidTyped, mission.id).toEqual([]);
    expect(mission.scoredSpeaking, mission.id).toEqual([]);
    expect(mission.cannedStages, mission.id).toEqual([]);
    expect(mission.genericDocuments, mission.id).toEqual([]);
    expect(mission.malformedCopy, mission.id).toEqual([]);
    for (const variant of mission.variantsContract) {
      expect(variant.checkCount, mission.id).toBeGreaterThanOrEqual(4);
      expect(variant.checkCount, mission.id).toBeLessThanOrEqual(6);
      expect(variant.missingSkills, mission.id).toEqual([]);
    }
  }
});

test("A0 completion mission keeps its four phases and the corrected ticket-payment order", async ({ page }) => {
  await openCleanApp(page);
  const missionId = "a0-school-work-safety-mission";
  await makeMissionReady(page, missionId);
  await page.evaluate((id) => showLessonPreview(id), missionId);

  await expect(page.locator(".learning-preview.mission-preview")).toBeVisible();
  await expect(page.locator(".learning-preview-content")).not.toContainText("اس بار کیا نیا ہے؟");
  await expect(page.locator(".learning-preview-phases .learning-phase-chip")).toHaveCount(4);

  const sequenceAudit = await page.evaluate((id) => {
    const mission = window.NEDERURDU_COURSE.missions.find((candidate) => candidate.id === id);
    const sequences = mission.variants.flatMap((variant) => variant.questions).filter((question) => (
      question.type === "sequence"
      && String(question.answer || "").includes("ik wil een kaartje")
      && String(question.answer || "").includes("ik betaal met pin")
    ));
    return {
      count: sequences.length,
      ordered: sequences.every((question) => (
        question.answer === "ik wil een kaartje | ik betaal met pin"
        && question.tiles?.[0] === "ik wil een kaartje"
        && question.tiles?.[1] === "ik betaal met pin"
      ))
    };
  }, missionId);
  expect(sequenceAudit).toEqual({ count: 6, ordered: true });

  await page.locator('.learning-preview [data-action="start"]').click();
  await expect(page.locator(".quiz-screen.mission-lesson")).toBeVisible();
  await expect(page.locator(".learning-phase-track .learning-phase-step")).toHaveCount(4);
  expect(await page.evaluate(() => getQuestionPhase(getActiveQuestion()))).toBe("use");
});

test("mission preview and run show only the four declared mission phases", async ({ page }) => {
  await openCleanApp(page);
  const missionId = "a1-mission-phone-internet";
  await makeMissionReady(page, missionId);
  await page.evaluate((id) => showLessonPreview(id), missionId);

  await expect(page.locator(".learning-preview.mission-preview")).toBeVisible();
  await expect(page.locator(".learning-preview-content .eyeline").first()).toHaveText("اس مشن میں استعمال ہونے والی سیکھی ہوئی باتیں");
  await expect(page.locator(".learning-preview-content")).not.toContainText("اس بار کیا نیا ہے؟");
  await expect(page.locator(".learning-preview-phases .learning-phase-chip")).toHaveCount(4);
  expect(await page.evaluate((id) => (
    window.NEDERURDU_COURSE.missions.find((mission) => mission.id === id).learning.phaseOrder
  ), missionId)).toEqual(["preview", "use", "independent-check", "correction"]);

  await page.locator('.learning-preview [data-action="start"]').click();
  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".learning-phase-track .learning-phase-step")).toHaveCount(4);
});

test("mission replay rotates variants and typed normalization is forgiving", async ({ page }) => {
  await openCleanApp(page);
  const result = await page.evaluate(() => {
    const mission = window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons).find((lesson) => lesson.id === "a1-mission-phone-internet");
    const first = buildSessionQuestions(mission).map((question) => question.id);
    const firstExpected = mission.variants[0].questions.map((question) => question.id);
    saveProgress({ ...JSON.parse(localStorage.getItem("nederurdu-progress-v4") || "{}"), missionVariantRuns: { [mission.id]: 1 } });
    const second = buildSessionQuestions(mission).map((question) => question.id);
    const secondExpected = mission.variants[1].questions.map((question) => question.id);
    return {
      firstVariant: first,
      firstExpected,
      secondVariant: second,
      secondExpected,
      normalized: normalizeTypedAnswer("  IK   BEL U LATER!  "),
      accepted: getAcceptedAnswers({ answer: "ik bel u later.", acceptedAnswers: ["ik bel u later"] })
    };
  });
  expect(result.firstVariant).toEqual(result.firstExpected);
  expect(result.secondVariant).toEqual(result.secondExpected);
  expect(result.normalized).toBe("ik bel u later");
  expect(result.accepted).toEqual(["ik bel u later", "ik bel u later"]);
});

test("mission starts with briefing then renders a readable document", async ({ page }) => {
  await openCleanApp(page);
  await makeMissionReady(page, "a1-mission-phone-internet");
  await page.evaluate(() => startLesson("a1-mission-phone-internet"));
  await expect(page.locator(".teaching-card")).toBeVisible();
  await page.locator('[data-action="continue-info"]').click();
  const document = page.locator(".practice-document");
  await expect(document).toBeVisible();
  await expect(document.locator(":scope > strong")).not.toHaveText("");
  expect(await document.locator("div").count()).toBeGreaterThanOrEqual(2);
  await expect(document).not.toContainText("موصولہ بات");
  await expect(document).not.toContainText("آپ کا کام");
  for (const value of await document.locator("div b").allTextContents()) {
    expect(value.trim()).not.toBe("");
  }
  await expect(page.locator('[data-action="check"]')).toBeDisabled();
});

test("optional mission typing converts to a working word bank", async ({ page }) => {
  await openCleanApp(page);
  await makeMissionReady(page, "a1-mission-phone-internet");
  await page.evaluate(() => {
    startLesson("a1-mission-phone-internet");
    while (getActiveQuestion().type !== "short-input") {
      const question = getActiveQuestion();
      if (isInfoQuestion(question)) {
        continueInfoStep();
      } else if (question.type === "build" || question.type === "sequence") {
        const words = question.type === "sequence" ? question.answer.split(" | ") : question.answer.split(" ");
        const used = new Set();
        for (const word of words) {
          const tile = getAnswerTiles(question).find((item) => item.word === word && !used.has(item.id));
          used.add(tile.id);
          selectBuildTile(tile.id);
        }
        checkAnswer();
        nextQuestion();
      } else {
        chooseAnswer(question.answer);
        checkAnswer();
        nextQuestion();
      }
    }
    enableInputFallback();
  });
  await expect(page.locator(".build-bank")).toBeVisible();
  const result = await page.evaluate(() => {
    const question = getActiveQuestion();
    const used = new Set();
    for (const word of question.answer.split(" ")) {
      const tile = getAnswerTiles(question).find((item) => item.word === word && !used.has(item.id));
      used.add(tile.id);
      selectBuildTile(tile.id);
    }
    checkAnswer();
    return document.querySelector(".quiz-feedback-panel")?.className || "";
  });
  expect(result).toContain("correct");
});

test("speaking self-check is unscored and alternate skill review changes the prompt", async ({ page }) => {
  await openCleanApp(page);
  await makeMissionReady(page, "a1-mission-doctor");
  const audit = await page.evaluate(() => {
    const mission = window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons).find((lesson) => lesson.id === "a1-mission-doctor");
    const speaking = mission.questions.find((question) => question.type === "speak-repeat");
    const speakingSkillId = getQuestionSkillIds(speaking)[0];
    const source = mission.questions.find((question) => getQuestionSkillIds(question).includes(speakingSkillId) && !isInfoQuestion(question));
    saveProgress({
      ...JSON.parse(localStorage.getItem("nederurdu-progress-v4") || "{}"),
      mistakes: [{ lessonId: mission.id, questionId: source.id, skillId: speakingSkillId, prompt: source.prompt, answer: source.answer }]
    });
    const replacement = getMistakeReviewQuestions()[0];
    return {
      speakingIsInfo: isInfoQuestion(speaking),
      replacementId: replacement.id,
      sourceId: source.id,
      sameSkill: getQuestionSkillIds(replacement).includes(speakingSkillId)
    };
  });
  expect(audit.speakingIsInfo).toBe(true);
  expect(audit.replacementId).not.toBe(audit.sourceId);
  expect(audit.sameSkill).toBe(true);
});
