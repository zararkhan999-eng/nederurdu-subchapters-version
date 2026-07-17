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
  await page.addInitScript((key) => localStorage.removeItem(key), STORAGE_KEY);
  await page.goto("/");
}

test("fresh first launch opens the home map with all chapters visible", async ({ page }) => {
  await openFreshApp(page);

  await expect(page.locator(".learn-screen.beginner-home")).toBeVisible();
  await expect(page.locator(".guided-start-screen")).toHaveCount(0);
  await expect(page.locator('[data-action="chapter"]')).toHaveCount(3);
  await expect(page.locator(".today-stats")).toHaveCount(0);
  await expect(page.locator(".bottom-nav .nav-button")).toHaveCount(3);
  await page.locator('[data-action="start"]').first().click();
  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".quiz-progress")).toHaveAttribute("aria-label", "1 از 20");
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

test("a lesson opens as a 20-step run", async ({ page }) => {
  await openCleanApp(page);

  await page.locator('[data-action="preview"][data-lesson="a0-letters-1"]').first().click();
  await expect(page.locator(".lesson-start-card")).toBeVisible();
  await page.locator('.lesson-start-card [data-action="start"]').click();

  await expect(page.locator(".quiz-screen")).toBeVisible();
  await expect(page.locator(".quiz-progress")).toHaveAttribute("aria-label", "1 از 20");
  await expect(page.locator('[data-action="home"]').first()).toBeVisible();
});

test("word-bank tiles select on tap instead of opening definitions", async ({ page }) => {
  await openCleanApp(page);
  await page.evaluate(() => {
    startLesson("a1-zero-tiny-words");
    while (getActiveQuestion().type !== "build") {
      const question = getActiveQuestion();
      if (isInfoQuestion(question)) {
        continueInfoStep();
      } else {
        chooseAnswer(question.answer);
        checkAnswer();
        nextQuestion();
      }
    }
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

  expect(lessonIds).toHaveLength(145);
  for (const lessonId of lessonIds) {
    await page.evaluate((id) => window.startLesson(id), lessonId);
    await expect(page.locator(".quiz-screen"), lessonId).toBeVisible();
    await expect(page.locator(".quiz-progress"), lessonId).toHaveAttribute("aria-label", "1 از 20");
  }
});

test("normal lesson sessions teach before asking harder production questions", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const recognitionTypes = new Set(["meaning", "image-choice", "listen-choice", "document-choice"]);
    const hardTypes = new Set(["fill-gap", "situation", "sequence", "build", "short-input"]);
    return window.NEDERURDU_CHAPTERS
      .flatMap((chapter) => chapter.lessons)
      .filter((lesson) => lesson.kind !== "mission" && !lesson.reviewKind)
      .map((lesson) => {
        const questions = buildSessionQuestions(lesson);
        const firstHardIndex = questions.findIndex((question) => hardTypes.has(question.type));
        const recognitionBeforeHard = firstHardIndex < 0
          ? questions.filter((question) => recognitionTypes.has(question.type)).length
          : questions.slice(0, firstHardIndex).filter((question) => recognitionTypes.has(question.type)).length;
        return {
          id: lesson.id,
          count: questions.length,
          firstType: questions[0]?.type || "",
          firstHardIndex,
          recognitionBeforeHard,
          types: questions.map((question) => question.type)
        };
      })
      .filter((lesson) => (
        lesson.count !== 20
        || lesson.firstType !== "uitleg"
        || lesson.firstHardIndex < 8
        || lesson.recognitionBeforeHard < 6
      ));
  });

  expect(audit).toEqual([]);
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

  await page.evaluate(() => window.startLesson("a0-letters-1"));
  await expect(page.locator(".pronunciation-cards")).toBeVisible();
  const appleCard = page.locator(".pronunciation-card").filter({ hasText: "appel" });
  await expect(appleCard).toContainText("آ پَل");
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
      "situation", "uitleg", "fill-gap", "build", "match-pairs",
      "document-choice", "sequence", "short-input", "speak-repeat"
    ]);
    const ids = lessons.map((lesson) => lesson.id);
    const invalidAnswers = [];
    const invalidTypes = [];
    const wrongSizedLessons = [];
    const duplicateQuestionIds = [];
    const missingVisualIds = [];
    const invalidImageVisuals = [];
    const invalidFillGaps = [];
    const invalidFillVisuals = [];
    const unsafeImageChoices = [];
    const forbiddenWording = [
      "نفی والا لفظ",
      "de/het والا چھوٹا لفظ",
      "اشارہ والا لفظ",
      "تم بے تکلف",
      "آپ ادب والا",
      "learner"
    ];
    const courseText = JSON.stringify(window.NEDERURDU_CHAPTERS);

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

    for (const lesson of lessons) {
      if (lesson.questions.length !== 60) wrongSizedLessons.push(`${lesson.id}:${lesson.questions.length}`);
      const questionIds = lesson.questions.map((question) => question.id);
      if (new Set(questionIds).size !== 60) duplicateQuestionIds.push(lesson.id);
      for (const question of lesson.questions) {
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
      invalidImageVisuals,
      invalidFillGaps,
      invalidFillVisuals,
      unsafeImageChoices,
      invalidVisualRecords: visuals.filter((visual) => !getVisualId(visual) || !visual.src || !(visual.altUrdu || visual.alt) || !(visual.canonicalTerm || visual.terms?.[0]) || !(visual.concept || visual.terms?.length) || !(visual.kind || visual.src)).map(getVisualId),
      forbiddenWording: forbiddenWording.filter((phrase) => courseText.includes(phrase))
    };
  });

  expect(audit).toEqual({
    lessonCount: 145,
    questionCount: 8700,
    duplicateIds: [],
    duplicateQuestionIds: [],
    invalidAnswers: [],
    invalidTypes: [],
    wrongSizedLessons: [],
    visualCount: 341,
    duplicateVisualIds: [],
    duplicateVisualTerms: [],
    missingVisualIds: [],
    invalidImageVisuals: [],
    invalidFillGaps: [],
    invalidFillVisuals: [],
    unsafeImageChoices: [],
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
          count: lesson.questions.length,
          mix,
          structuredConcepts: Array.isArray(lesson.concepts) && lesson.concepts.length > 0,
          missingImageIds: lesson.questions
            .filter((question) => question.type === "image-choice" && !question.visualId)
            .map((question) => question.id),
          unsafeImageChoices: lesson.questions
            .filter((question) => question.type === "image-choice" && (/[,?!]/.test(question.answer) || String(question.answer).trim().split(/\s+/).length > 3))
            .map((question) => question.id),
          missingAudio: lesson.questions
            .filter((question) => question.type === "listen-choice" && !question.speak)
            .map((question) => question.id)
        };
      })
    };
  });

  expect(audit.a0Count).toBe(42);
  expect(audit.order[0]).toBe("a0-greetings-courtesy");
  expect(audit.order.at(-1)).toBe("a0-daily-checkpoint");
  for (const lesson of audit.lessons) {
    expect(lesson.count, lesson.id).toBe(60);
    expect(lesson.structuredConcepts, lesson.id).toBe(true);
    expect(lesson.missingImageIds, lesson.id).toEqual([]);
    expect(lesson.unsafeImageChoices, lesson.id).toEqual([]);
    expect(lesson.missingAudio, lesson.id).toEqual([]);
    expect(lesson.mix.meaning, lesson.id).toBeGreaterThanOrEqual(10);
    expect(lesson.mix.reverse, lesson.id).toBeGreaterThanOrEqual(8);
    expect(lesson.mix["listen-choice"], lesson.id).toBeGreaterThanOrEqual(10);
    expect(lesson.mix["fill-gap"], lesson.id).toBeGreaterThanOrEqual(8);
    expect(lesson.mix.build, lesson.id).toBe(4);
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
          count: lesson.questions.length,
          mix,
          replies: lesson.questions.filter((question) => question.mode === "listen-reply").length,
          missingVisualIds: lesson.questions.filter((question) => question.type === "image-choice" && !question.visualId).map((question) => question.id),
          unsafeImageChoices: lesson.questions
            .filter((question) => question.type === "image-choice" && (/[,?!]/.test(question.answer) || String(question.answer).trim().split(/\s+/).length > 3))
            .map((question) => question.id),
          missingAudio: lesson.questions.filter((question) => question.type === "listen-choice" && !question.speak).map((question) => question.id)
        };
      })
    };
  });

  expect(audit.count).toBe(81);
  expect(audit.duplicatedPathLessons).toEqual([]);
  for (const lesson of audit.lessons) {
    expect(lesson.count, lesson.id).toBe(60);
    expect(lesson.mix.uitleg, lesson.id).toBe(1);
    expect(lesson.mix.meaning, lesson.id).toBe(8);
    expect(lesson.mix.reverse, lesson.id).toBe(6);
    expect(lesson.mix["listen-choice"], lesson.id).toBe(8);
    expect(lesson.mix["fill-gap"], lesson.id).toBe(10);
    expect(lesson.mix.build, lesson.id).toBe(6);
    expect(lesson.replies, lesson.id).toBe(3);
    expect(lesson.missingVisualIds, lesson.id).toEqual([]);
    expect(lesson.unsafeImageChoices, lesson.id).toEqual([]);
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
          count: lesson.questions.length,
          mix,
          replies: lesson.questions.filter((question) => question.mode === "listen-reply").length,
          missingVisualIds: lesson.questions.filter((question) => question.type === "image-choice" && !question.visualId).map((question) => question.id),
          unsafeImageChoices: lesson.questions
            .filter((question) => question.type === "image-choice" && (/[,?!]/.test(question.answer) || String(question.answer).trim().split(/\s+/).length > 3))
            .map((question) => question.id),
          missingAudio: lesson.questions.filter((question) => question.type === "listen-choice" && !question.speak).map((question) => question.id)
        };
      })
    };
  });

  expect(audit.count).toBe(22);
  expect(audit.duplicatedPathLessons).toEqual([]);
  for (const lesson of audit.lessons) {
    expect(lesson.count, lesson.id).toBe(60);
    expect(lesson.mix.uitleg, lesson.id).toBe(1);
    expect(lesson.mix.meaning, lesson.id).toBe(6);
    expect(lesson.mix.reverse, lesson.id).toBe(5);
    expect(lesson.mix["listen-choice"], lesson.id).toBe(7);
    expect(lesson.mix["fill-gap"], lesson.id).toBe(12);
    expect(lesson.mix.build, lesson.id).toBe(8);
    expect(lesson.replies, lesson.id).toBe(3);
    expect(lesson.missingVisualIds, lesson.id).toEqual([]);
    expect(lesson.unsafeImageChoices, lesson.id).toEqual([]);
    expect(lesson.missingAudio, lesson.id).toEqual([]);
  }
});

test("daily-life missions contain three ordered 20-step variants", async ({ page }) => {
  await openCleanApp(page);
  const audit = await page.evaluate(() => {
    const missions = window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons).filter((lesson) => lesson.kind === "mission");
    return missions.map((mission) => ({
      id: mission.id,
      variants: mission.variants.length,
      lengths: mission.variants.map((variant) => variant.questions.length),
      flatLength: mission.questions.length,
      duplicateIds: mission.questions.length - new Set(mission.questions.map((question) => question.id)).size,
      types: mission.variants.map((variant) => variant.questions.map((question) => question.type)),
      missingSkills: mission.questions.filter((question) => !question.skillId).map((question) => question.id),
      invalidTyped: mission.questions.filter((question) => question.type === "short-input" && (!question.optional || !question.fallbackTiles?.length || !question.acceptedAnswers?.length)).map((question) => question.id)
    }));
  });

  expect(audit).toHaveLength(12);
  for (const mission of audit) {
    expect(mission.variants, mission.id).toBe(3);
    expect(mission.lengths, mission.id).toEqual([20, 20, 20]);
    expect(mission.flatLength, mission.id).toBe(60);
    expect(mission.duplicateIds, mission.id).toBe(0);
    expect(mission.missingSkills, mission.id).toEqual([]);
    expect(mission.invalidTyped, mission.id).toEqual([]);
    for (const types of mission.types) {
      expect(types).toEqual([
        "uitleg", "document-choice", "document-choice", "document-choice",
        "listen-choice", "listen-choice", "listen-choice",
        "situation", "situation", "situation",
        "sequence", "sequence", "build", "build",
        mission.id.startsWith("a0-") ? "image-choice" : "short-input",
        mission.id.startsWith("a0-") ? "image-choice" : "short-input",
        "speak-repeat", "speak-repeat", "situation", "situation"
      ]);
    }
  }
});

test("mission replay rotates variants and typed normalization is forgiving", async ({ page }) => {
  await openCleanApp(page);
  const result = await page.evaluate(() => {
    const mission = window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons).find((lesson) => lesson.id === "a1-mission-phone-internet");
    const first = buildSessionQuestions(mission).map((question) => question.id);
    saveProgress({ ...JSON.parse(localStorage.getItem("nederurdu-progress-v3") || "{}"), missionVariantRuns: { [mission.id]: 1 } });
    const second = buildSessionQuestions(mission).map((question) => question.id);
    return {
      firstVariant: first.every((id) => id.includes("-v1-")),
      secondVariant: second.every((id) => id.includes("-v2-")),
      normalized: normalizeTypedAnswer("  IK   BEL U LATER!  "),
      accepted: getAcceptedAnswers({ answer: "ik bel u later.", acceptedAnswers: ["ik bel u later"] })
    };
  });
  expect(result.firstVariant).toBe(true);
  expect(result.secondVariant).toBe(true);
  expect(result.normalized).toBe("ik bel u later");
  expect(result.accepted).toEqual(["ik bel u later", "ik bel u later"]);
});

test("mission starts with briefing then renders a readable document", async ({ page }) => {
  await openCleanApp(page);
  await page.evaluate(() => startLesson("a1-mission-phone-internet"));
  await expect(page.locator(".teaching-card")).toBeVisible();
  await page.locator('[data-action="continue-info"]').click();
  await expect(page.locator(".practice-document")).toBeVisible();
  await expect(page.locator(".practice-document")).toContainText("Datum");
  await expect(page.locator('[data-action="check"]')).toBeDisabled();
});

test("optional mission typing converts to a working word bank", async ({ page }) => {
  await openCleanApp(page);
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
  const audit = await page.evaluate(() => {
    const mission = window.NEDERURDU_CHAPTERS.flatMap((chapter) => chapter.lessons).find((lesson) => lesson.id === "a1-mission-doctor");
    const speaking = mission.questions.find((question) => question.type === "speak-repeat");
    const source = mission.questions.find((question) => question.skillId === speaking.skillId && !isInfoQuestion(question));
    saveProgress({
      ...JSON.parse(localStorage.getItem("nederurdu-progress-v3") || "{}"),
      mistakes: [{ lessonId: mission.id, questionId: source.id, skillId: source.skillId, prompt: source.prompt, answer: source.answer }]
    });
    const replacement = getMistakeReviewQuestions()[0];
    return {
      speakingIsInfo: isInfoQuestion(speaking),
      replacementId: replacement.id,
      sourceId: source.id,
      sameSkill: replacement.skillId === source.skillId
    };
  });
  expect(audit.speakingIsInfo).toBe(true);
  expect(audit.replacementId).not.toBe(audit.sourceId);
  expect(audit.sameSkill).toBe(true);
});
