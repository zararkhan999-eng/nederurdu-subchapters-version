const { test, expect } = require("@playwright/test");

const STORAGE_KEY = "nederurdu-progress-v3";

async function openCleanApp(page, progress = {}) {
  await page.addInitScript(({ key, value }) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, {
    key: STORAGE_KEY,
    value: {
      completedLessons: [],
      scores: {},
      totalXp: 0,
      practiceDays: [],
      mistakes: [],
      settings: { sound: true, motion: true },
      selectedChapterId: "a0",
      lastLessonId: "a0-letters-1",
      ...progress
    }
  });
  await page.goto("/");
}

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

test("a lesson opens as a 20-step run", async ({ page }) => {
  await openCleanApp(page);

  await page.locator('[data-action="preview"][data-lesson="a0-letters-1"]').first().click();
  await expect(page.locator(".lesson-start-card")).toBeVisible();
  await page.locator('.lesson-start-card [data-action="start"]').click();

  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".quiz-progress")).toHaveAttribute("aria-label", "1 از 20");
  await expect(page.locator('[data-action="home"]').first()).toBeVisible();
});

test("today review starts with 20 mixed questions", async ({ page }) => {
  await openCleanApp(page, {
    completedLessons: ["a0-letters-1"],
    lastLessonId: "a0-letters-1"
  });

  await page.locator('[data-action="settings"]').click();
  await page.locator('[data-action="review"][data-review-kind="today"]').click();
  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".quiz-progress")).toHaveAttribute("aria-label", "1 از 20");
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
  await expect(page.locator(".quiz-progress")).toHaveAttribute("aria-label", "1 از 1");
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
  await page.locator('[data-action="choose"][data-answer="حرف a"]').click();
  await page.locator('[data-action="check"]').click();
  await page.locator('[data-action="next"]').click();

  const mistakes = await page.evaluate(() => JSON.parse(localStorage.getItem("nederurdu-progress-v3")).mistakes);
  expect(mistakes).toEqual([]);
});

test("old lesson review starts from completed work", async ({ page }) => {
  await openCleanApp(page, {
    completedLessons: ["a0-letters-1", "a0-letters-2"],
    lastLessonId: "a0-letters-2"
  });

  await page.locator('[data-action="settings"]').click();
  await page.locator('[data-action="review"][data-review-kind="old"]').click();
  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".quiz-progress")).toHaveAttribute("aria-label", "1 از 20");
});

test("main screens do not overflow horizontally", async ({ page }) => {
  await openCleanApp(page);

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(hasOverflow).toBe(false);

  await page.locator('[data-action="preview"][data-lesson="a0-letters-1"]').first().click();
  const cardHasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(cardHasOverflow).toBe(false);
  await page.locator('.lesson-start-card [data-action="start"]').click();
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
  await page.locator('.lesson-start-card [data-action="start"]').click();
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

test("every lesson produces a valid 20-step session", async ({ page }) => {
  await openCleanApp(page);
  const lessonIds = await page.evaluate(() => (
    window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons.map((lesson) => lesson.id))
  ));

  expect(lessonIds).toHaveLength(40);
  for (const lessonId of lessonIds) {
    await page.evaluate((id) => window.startLesson(id), lessonId);
    await expect(page.locator(".quiz-screen"), lessonId).toBeVisible();
    await expect(page.locator(".quiz-progress"), lessonId).toHaveAttribute("aria-label", "1 از 20");
  }
});

test("quiz check button enables and feedback appears", async ({ page }) => {
  await openCleanApp(page);
  await page.evaluate(() => window.startLesson("a0-letters-1"));

  const infoButton = page.locator('[data-action="continue-info"]');
  if (await infoButton.count()) await infoButton.click();
  const checkButton = page.locator('[data-action="check"]');
  await expect(checkButton).toBeDisabled();
  await page.locator('[data-action="choose"]').first().click();
  await expect(checkButton).toBeEnabled();
  await checkButton.click();
  await expect(page.locator(".quiz-feedback-panel")).toBeVisible();
  await expect(page.locator('[data-action="next"]')).toBeEnabled();
});

test("the three bottom navigation destinations open", async ({ page }) => {
  await openCleanApp(page);

  await page.locator('[data-action="practice"]').click();
  await expect(page.locator(".practice-screen")).toBeVisible();
  await page.locator('.bottom-nav [data-action="settings"]').click();
  await expect(page.locator(".settings-panel")).toBeVisible();
  await expect(page.locator('.settings-panel [data-action="letters"]')).toBeVisible();
  await expect(page.locator('.settings-panel [data-action="progress"]')).toBeVisible();
  await expect(page.locator('.settings-panel [data-action="review"][data-review-kind="today"]')).toBeVisible();
  await expect(page.locator('.settings-panel [data-action="review"][data-review-kind="old"]')).toBeVisible();
  await page.locator('[data-action="home"]').click();
  await expect(page.locator(".learn-screen")).toBeVisible();
});

test("lesson completion marks its path node complete", async ({ page }) => {
  await openCleanApp(page);

  await page.evaluate(() => {
    const lesson = window.NEDERURDU_CHAPTERS[0].lessons[0];
    window.startLesson(lesson.id);
    window.completeLesson(lesson);
  });
  await expect(page.locator(".complete-screen")).toBeVisible();
  await page.locator('[data-action="home"]').click();
  await expect(page.locator('[data-path-lesson="a0-letters-1"] .lesson-node')).toHaveClass(/completed/);
  const completed = await page.evaluate(() => JSON.parse(localStorage.getItem("nederurdu-progress-v3")).completedLessons);
  expect(completed).toContain("a0-letters-1");
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

test("course bank has exact sizes, stable IDs, valid answers, and visual mappings", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const lessons = window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons);
    const allowedTypes = new Set([
      "meaning", "reverse", "image-choice", "listen-choice",
      "situation", "uitleg", "fill-gap", "build", "match-pairs"
    ]);
    const ids = lessons.map((lesson) => lesson.id);
    const invalidAnswers = [];
    const invalidTypes = [];
    const wrongSizedLessons = [];
    const duplicateQuestionIds = [];
    const missingVisualIds = [];
    const forbiddenWording = [
      "نفی والا لفظ",
      "de/het والا چھوٹا لفظ",
      "اشارہ والا لفظ",
      "تم بے تکلف",
      "آپ ادب والا",
      "learner"
    ];
    const courseText = JSON.stringify(window.NEDERURDU_CHAPTERS);

    for (const lesson of lessons) {
      if (lesson.questions.length !== 60) wrongSizedLessons.push(`${lesson.id}:${lesson.questions.length}`);
      const questionIds = lesson.questions.map((question) => question.id);
      if (new Set(questionIds).size !== 60) duplicateQuestionIds.push(lesson.id);
      for (const question of lesson.questions) {
        if (!allowedTypes.has(question.type)) invalidTypes.push(`${lesson.id}:${question.type}`);
        if (question.options && !question.options.includes(question.answer)) {
          invalidAnswers.push(`${lesson.id}:${question.prompt}`);
        }
        if (question.type === "image-choice" && !question.visualId) missingVisualIds.push(question.id);
      }
    }

    const visuals = window.NEDERURDU_WORD_VISUALS;
    const visualIds = visuals.map((visual) => visual.id);
    const allTerms = visuals.flatMap((visual) => visual.dutchTerms.map((term) => term.toLowerCase()));

    return {
      lessonCount: lessons.length,
      questionCount: lessons.reduce((total, lesson) => total + lesson.questions.length, 0),
      duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
      duplicateQuestionIds,
      invalidAnswers,
      invalidTypes,
      wrongSizedLessons,
      visualCount: visuals.length,
      duplicateVisualIds: visualIds.filter((id, index) => visualIds.indexOf(id) !== index),
      duplicateVisualTerms: allTerms.filter((term, index) => allTerms.indexOf(term) !== index),
      missingVisualIds,
      invalidVisualRecords: visuals.filter((visual) => !visual.id || !visual.src || !visual.altUrdu || !visual.canonicalTerm || !visual.concept || !visual.kind).map((visual) => visual.id),
      forbiddenWording: forbiddenWording.filter((phrase) => courseText.includes(phrase))
    };
  });

  expect(audit).toEqual({
    lessonCount: 40,
    questionCount: 2400,
    duplicateIds: [],
    duplicateQuestionIds: [],
    invalidAnswers: [],
    invalidTypes: [],
    wrongSizedLessons: [],
    visualCount: 152,
    duplicateVisualIds: [],
    duplicateVisualTerms: [],
    missingVisualIds: [],
    invalidVisualRecords: [],
    forbiddenWording: []
  });
});
