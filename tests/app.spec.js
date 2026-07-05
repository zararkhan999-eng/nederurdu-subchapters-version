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

  expect(lessonIds).toHaveLength(75);
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

  const lessonId = await page.evaluate(() => {
    const lesson = window.NEDERURDU_CHAPTERS[0].lessons[0];
    window.startLesson(lesson.id);
    window.completeLesson(lesson);
    return lesson.id;
  });
  await expect(page.locator(".complete-screen")).toBeVisible();
  await page.locator('[data-action="home"]').click();
  await expect(page.locator(`[data-path-lesson="${lessonId}"] .lesson-node`)).toHaveClass(/completed/);
  const completed = await page.evaluate(() => JSON.parse(localStorage.getItem("nederurdu-progress-v3")).completedLessons);
  expect(completed).toContain(lessonId);
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
    lessonCount: 75,
    questionCount: 4500,
    duplicateIds: [],
    duplicateQuestionIds: [],
    invalidAnswers: [],
    invalidTypes: [],
    wrongSizedLessons: [],
    visualCount: 221,
    duplicateVisualIds: [],
    duplicateVisualTerms: [],
    missingVisualIds: [],
    invalidVisualRecords: [],
    forbiddenWording: []
  });
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

test("new A0 daily lessons have the planned structure and explicit media", async ({ page }) => {
  await openCleanApp(page);

  const audit = await page.evaluate(() => {
    const a0 = window.NEDERURDU_CHAPTERS.find((chapter) => chapter.id === "a0");
    const newIds = [
      "a0-greetings-courtesy", "a0-understanding-help", "a0-dit-dat-questions",
      "a0-numbers-0-10", "a0-numbers-11-100", "a0-time-days",
      "a0-daily-actions", "a0-food-drink", "a0-shopping-payment",
      "a0-transport-directions", "a0-health-emergency", "a0-daily-checkpoint",
      "a0-spelling-personal-details", "a0-address-phone", "a0-date-appointment",
      "a0-home-needs", "a0-child-school", "a0-work-basics", "a0-weather-clothing-safety"
    ];
    const expectedNormalMix = {
      uitleg: 1, meaning: 10, reverse: 8, "image-choice": 10,
      "listen-choice": 10, "fill-gap": 8, situation: 9, build: 4
    };
    const expectedCheckpointMix = {
      meaning: 10, reverse: 8, "image-choice": 10,
      "listen-choice": 10, "fill-gap": 8, situation: 10, build: 4
    };

    return {
      a0Count: a0.lessons.length,
      order: a0.lessons.map((lesson) => lesson.id),
      lessons: newIds.map((id) => {
        const lesson = a0.lessons.find((item) => item.id === id);
        const mix = lesson.questions.reduce((counts, question) => {
          counts[question.type] = (counts[question.type] || 0) + 1;
          return counts;
        }, {});
        return {
          id,
          mix,
          structuredConcepts: Array.isArray(lesson.concepts) && lesson.concepts.length > 0,
          missingImageIds: lesson.questions
            .filter((question) => question.type === "image-choice" && !question.visualId)
            .map((question) => question.id),
          missingAudio: lesson.questions
            .filter((question) => question.type === "listen-choice" && !question.speak)
            .map((question) => question.id)
        };
      }),
      expectedNormalMix,
      expectedCheckpointMix
    };
  });

  expect(audit.a0Count).toBe(39);
  expect(audit.order[0]).toBe("a0-greetings-courtesy");
  expect(audit.order.at(-1)).toBe("a0-daily-checkpoint");
  for (const lesson of audit.lessons) {
    expect(lesson.structuredConcepts, lesson.id).toBe(true);
    expect(lesson.missingImageIds, lesson.id).toEqual([]);
    expect(lesson.missingAudio, lesson.id).toEqual([]);
    expect(lesson.mix, lesson.id).toEqual(
      lesson.id === "a0-daily-checkpoint" ? audit.expectedCheckpointMix : audit.expectedNormalMix
    );
  }
});

test("all review modes accept new A0 daily lesson IDs", async ({ page }) => {
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

  await page.locator('[data-action="practice"]').click();
  await page.locator('[data-action="review"][data-review-kind="mistakes"]').click();
  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".quiz-progress")).toHaveAttribute("aria-label", "1 از 1");

  await page.locator('[data-action="home"]').click();
  await page.locator('[data-action="settings"]').click();
  await page.locator('[data-action="review"][data-review-kind="today"]').click();
  await expect(page.locator(".quiz-progress")).toHaveAttribute("aria-label", "1 از 20");

  await page.locator('[data-action="home"]').click();
  await page.locator('[data-action="settings"]').click();
  await page.locator('[data-action="review"][data-review-kind="old"]').click();
  await expect(page.locator(".quiz-progress")).toHaveAttribute("aria-label", "1 از 20");
});

test("new A1 practical lessons have complete interaction-focused banks", async ({ page }) => {
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
        const mix = lesson.questions.reduce((counts, question) => {
          counts[question.type] = (counts[question.type] || 0) + 1;
          return counts;
        }, {});
        return {
          id,
          mix,
          replies: lesson.questions.filter((question) => question.mode === "listen-reply").length,
          missingVisualIds: lesson.questions.filter((question) => question.type === "image-choice" && !question.visualId).map((question) => question.id),
          missingAudio: lesson.questions.filter((question) => question.type === "listen-choice" && !question.speak).map((question) => question.id)
        };
      })
    };
  });

  expect(audit.count).toBe(18);
  expect(audit.duplicatedPathLessons).toEqual([]);
  for (const lesson of audit.lessons) {
    expect(lesson.mix, lesson.id).toEqual({
      uitleg: 1, meaning: 8, reverse: 6, "image-choice": 8,
      "listen-choice": 8, "fill-gap": 10, situation: 13, build: 6
    });
    expect(lesson.replies, lesson.id).toBe(3);
    expect(lesson.missingVisualIds, lesson.id).toEqual([]);
    expect(lesson.missingAudio, lesson.id).toEqual([]);
  }
});

test("repeating a lesson prioritizes unseen questions", async ({ page }) => {
  await openCleanApp(page);
  const lessonId = "a0-address-phone";
  const firstRun = await page.evaluate((id) => {
    const lesson = window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons).find((item) => item.id === id);
    return sampleLessonQuestions(lesson.questions, id).map((question) => question.id);
  }, lessonId);

  await page.evaluate(({ ids }) => {
    const key = "nederurdu-progress-v3";
    const saved = JSON.parse(localStorage.getItem(key) || "{}");
    saveProgress({ ...saved, seenQuestionIds: ids });
  }, { ids: firstRun });

  const secondRun = await page.evaluate((id) => {
    const lesson = window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons).find((item) => item.id === id);
    return sampleLessonQuestions(lesson.questions, id).map((question) => question.id);
  }, lessonId);
  const repeatedPractice = secondRun.filter((id) => firstRun.includes(id) && !id.includes("-uitleg-"));
  expect(repeatedPractice).toEqual([]);
});

test("new A2 independent-living lessons have complete practical banks", async ({ page }) => {
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
        const mix = lesson.questions.reduce((counts, question) => {
          counts[question.type] = (counts[question.type] || 0) + 1;
          return counts;
        }, {});
        return {
          id,
          mix,
          replies: lesson.questions.filter((question) => question.mode === "listen-reply").length,
          missingVisualIds: lesson.questions.filter((question) => question.type === "image-choice" && !question.visualId).map((question) => question.id),
          missingAudio: lesson.questions.filter((question) => question.type === "listen-choice" && !question.speak).map((question) => question.id)
        };
      })
    };
  });

  expect(audit.count).toBe(18);
  expect(audit.duplicatedPathLessons).toEqual([]);
  for (const lesson of audit.lessons) {
    expect(lesson.mix, lesson.id).toEqual({
      uitleg: 1, meaning: 6, reverse: 5, "image-choice": 6,
      "listen-choice": 7, "fill-gap": 12, situation: 15, build: 8
    });
    expect(lesson.replies, lesson.id).toBe(3);
    expect(lesson.missingVisualIds, lesson.id).toEqual([]);
    expect(lesson.missingAudio, lesson.id).toEqual([]);
  }
});
