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
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/(?:uncaught|syntaxerror|referenceerror|application error)/i);
  await expect(page.locator('[data-action="chapter"]')).toHaveCount(3);
  await expect(page.locator('[data-action="preview"]:visible').first()).toBeEnabled();
  await expect(page.locator("body")).not.toContainText(/\b(?:practice|lesson|chapter|progress|settings|home|today|mistake|review|next|continue|check)\b/i);
  expect(runtimeErrors).toEqual([]);
});

test("a lesson opens as a 20-step run", async ({ page }) => {
  await openCleanApp(page);

  await page.locator('[data-action="preview"][data-lesson="a0-letters-1"]').first().click();
  await expect(page.locator(".preview-panel")).toBeVisible();
  await page.locator('[data-action="start"]').click();

  await expect(page.locator(".lesson-panel")).toBeVisible();
  await expect(page.locator(".lesson-header-main span")).toHaveText("1/20");
  await expect(page.locator('[data-action="home"]').first()).toBeVisible();
});

test("today review starts with 20 mixed questions", async ({ page }) => {
  await openCleanApp(page, {
    completedLessons: ["a0-letters-1"],
    lastLessonId: "a0-letters-1"
  });

  await page.locator('[data-action="review"][data-review-kind="today"]').click();
  await expect(page.locator(".lesson-panel")).toBeVisible();
  await expect(page.locator(".lesson-header-main span")).toHaveText("1/20");
});

test("mistake review opens a saved mistake", async ({ page }) => {
  await openCleanApp(page, {
    completedLessons: ["a0-letters-1"],
    lastLessonId: "a0-letters-1",
    mistakes: [{ lessonId: "a0-letters-1", prompt: "a", answer: "حرف a" }]
  });

  const review = page.locator('[data-action="review"][data-review-kind="mistakes"]');
  await expect(review).toBeEnabled();
  await review.click();
  await expect(page.locator(".lesson-panel")).toBeVisible();
  await expect(page.locator(".lesson-header-main span")).toHaveText("1/1");
});

test("old lesson review starts from completed work", async ({ page }) => {
  await openCleanApp(page, {
    completedLessons: ["a0-letters-1", "a0-letters-2"],
    lastLessonId: "a0-letters-2"
  });

  await page.locator('[data-action="review"][data-review-kind="old"]').click();
  await expect(page.locator(".lesson-panel")).toBeVisible();
  await expect(page.locator(".lesson-header-main span")).toHaveText("1/20");
});

test("main screens do not overflow horizontally", async ({ page }) => {
  await openCleanApp(page);

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(hasOverflow).toBe(false);

  await page.locator('[data-action="preview"][data-lesson="a0-letters-1"]').first().click();
  await page.locator('[data-action="start"]').click();
  const lessonHasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(lessonHasOverflow).toBe(false);
});

test("every lesson produces a valid 20-step session", async ({ page }) => {
  await openCleanApp(page);
  const lessonIds = await page.evaluate(() => (
    window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons.map((lesson) => lesson.id))
  ));

  expect(lessonIds).toHaveLength(40);
  for (const lessonId of lessonIds) {
    await page.evaluate((id) => window.startLesson(id), lessonId);
    await expect(page.locator(".lesson-panel"), lessonId).toBeVisible();
    await expect(page.locator(".lesson-header-main span"), lessonId).toHaveText("1/20");
  }
});

test("course bank has valid IDs, answers, and exercise types", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const lessons = window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons);
    const allowedTypes = new Set([
      "meaning", "reverse", "image-choice", "listen-choice",
      "situation", "uitleg", "fill-gap", "build"
    ]);
    const ids = lessons.map((lesson) => lesson.id);
    const invalidAnswers = [];
    const invalidTypes = [];
    const shortLessons = [];
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
      if (lesson.questions.length < 20) shortLessons.push(lesson.id);
      for (const question of lesson.questions) {
        if (!allowedTypes.has(question.type)) invalidTypes.push(`${lesson.id}:${question.type}`);
        if (question.options && !question.options.includes(question.answer)) {
          invalidAnswers.push(`${lesson.id}:${question.prompt}`);
        }
      }
    }

    return {
      duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
      invalidAnswers,
      invalidTypes,
      shortLessons,
      forbiddenWording: forbiddenWording.filter((phrase) => courseText.includes(phrase))
    };
  });

  expect(audit).toEqual({
    duplicateIds: [],
    invalidAnswers: [],
    invalidTypes: [],
    shortLessons: [],
    forbiddenWording: []
  });
});
