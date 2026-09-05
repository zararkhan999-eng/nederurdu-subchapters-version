const { chromium } = require("@playwright/test");

const baseUrl = process.env.NEDERURDU_V2_URL || "http://127.0.0.1:4173/v2-prototype/index.html";
const viewports = [
  { name: "phone-compact", width: 320, height: 568 },
  { name: "phone-tall", width: 360, height: 800 },
  { name: "phone-modern", width: 390, height: 844 },
  { name: "tablet-portrait", width: 768, height: 1024 },
  { name: "tablet-landscape", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 }
];
const catalog = [
  { id: "meet-neighbour", fields: ["name"], proofs: 3, next: "say-spell-name" },
  { id: "say-spell-name", fields: ["name"], proofs: 3, next: "origin-home" },
  { id: "origin-home", fields: ["country", "place"], proofs: 3, next: "ask-back" },
  { id: "ask-back", choice: true, proofs: 3, next: "people-mission" },
  { id: "people-mission", fields: ["name", "country", "place"], proofs: 4, next: null }
];

const failures = [];
const results = [];

function check(condition, message, context) {
  if (!condition) failures.push(`${context}: ${message}`);
}

async function waitForScreen(page) {
  await page.locator(".screen-enter").first().waitFor({ state: "visible" });
  await page.waitForFunction(() => document.querySelector(".screen-enter")?.classList.contains("is-visible"));
  await page.waitForTimeout(80);
}

async function collectGeometry(page, context, expectNavigation = true) {
  const geometry = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const nav = document.querySelector(".primary-nav-bar");
    const rail = document.querySelector(".primary-nav-rail");
    const dock = document.querySelector(".lesson-action-dock:not(.brief-action-dock)");
    const visible = (element) => element && getComputedStyle(element).display !== "none";
    const rect = (element) => {
      if (!element) return null;
      const value = element.getBoundingClientRect();
      return { top: value.top, right: value.right, bottom: value.bottom, left: value.left, width: value.width, height: value.height };
    };
    const smallTargets = [...document.querySelectorAll('a[href], button, input, [role="button"]')]
      .filter((element) => {
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && box.width > 0 && box.height > 0 && (box.width < 44 || box.height < 44);
      })
      .map((element) => {
        const box = element.getBoundingClientRect();
        return `${element.tagName.toLowerCase()}.${String(element.className || "").replace(/\s+/g, ".") || "unclassed"}(${Math.round(box.width)}x${Math.round(box.height)})`;
      })
      .slice(0, 12);
    return {
      viewportWidth,
      viewportHeight: innerHeight,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      navVisible: visible(nav),
      navRect: rect(nav),
      navItems: nav?.querySelectorAll(".nav-item").length || 0,
      railVisible: visible(rail),
      railRect: rect(rail),
      dockVisible: visible(dock),
      dockRect: rect(dock),
      smallTargets
    };
  });

  check(geometry.documentWidth <= geometry.viewportWidth + 1, `document overflows horizontally (${geometry.documentWidth}px > ${geometry.viewportWidth}px)`, context);
  check(geometry.bodyWidth <= geometry.viewportWidth + 1, `body overflows horizontally (${geometry.bodyWidth}px > ${geometry.viewportWidth}px)`, context);
  if (geometry.viewportWidth < 980) check(geometry.smallTargets.length === 0, `touch targets below 44px: ${geometry.smallTargets.join(", ")}`, context);

  if (!expectNavigation) {
    check(!geometry.navVisible && !geometry.railVisible, "focused lesson mode exposes global navigation", context);
  } else if (geometry.viewportWidth < 980) {
    check(geometry.navVisible, "mobile bottom navigation is not visible", context);
    check(!geometry.railVisible, "desktop rail is visible on a compact layout", context);
    check(geometry.navItems === 4, `expected four mobile destinations, found ${geometry.navItems}`, context);
    if (geometry.navRect) {
      check(geometry.navRect.left >= -1 && geometry.navRect.right <= geometry.viewportWidth + 1, "mobile navigation leaves the viewport", context);
      check(geometry.navRect.bottom <= geometry.viewportHeight + 1, "mobile navigation extends below the viewport", context);
    }
  } else {
    check(!geometry.navVisible, "mobile bottom navigation is visible on a wide layout", context);
    check(geometry.railVisible, "desktop navigation rail is not visible", context);
    if (geometry.railRect) check(geometry.railRect.height >= geometry.viewportHeight - 1, "desktop rail does not span the viewport", context);
  }

  return geometry;
}

async function checkBottomClearance(page, context) {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(50);
  const clearance = await page.evaluate(() => {
    const dock = document.querySelector(".lesson-action-dock:not(.brief-action-dock)");
    const nav = document.querySelector(".primary-nav-bar");
    const blocker = dock && getComputedStyle(dock).display !== "none" ? dock : nav && getComputedStyle(nav).display !== "none" ? nav : null;
    const content = document.querySelector(".lesson-stage") || document.querySelector(".screen-content");
    const finalChild = content?.lastElementChild || content;
    if (!blocker || !finalChild) return null;
    return {
      contentBottom: finalChild.getBoundingClientRect().bottom,
      blockerTop: blocker.getBoundingClientRect().top
    };
  });
  if (clearance) check(clearance.contentBottom <= clearance.blockerTop - 6, `last content is obscured by fixed controls (${Math.round(clearance.contentBottom)}px vs ${Math.round(clearance.blockerTop)}px)`, context);
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function verifyRoutes(page, viewportName) {
  for (const route of ["today", "journey", "practice", "toolkit"]) {
    const context = `${viewportName}/${route}`;
    await page.goto(`${baseUrl}#/${route}`, { waitUntil: "domcontentloaded" });
    await waitForScreen(page);
    check(await page.evaluate(() => window.scrollY <= 1), `destination opened at scroll position ${await page.evaluate(() => Math.round(window.scrollY))}`, context);
    const current = await page.locator(".nav-item.active").first().getAttribute("data-route");
    check(current === route, `active navigation destination is ${current || "missing"}`, context);
    check(await page.locator("main h1").count() > 0, "screen has no primary heading", context);

    if (route === "journey") {
      check(await page.locator('.scene-stop.current[href]').count() === 1, "People world does not show exactly one current scene", context);
      check(await page.locator('.scene-stop[href]').count() === 5, "People world does not expose all five implemented scenes", context);
      check(await page.locator('.scene-stop[aria-disabled="true"]').count() === 0, "an implemented People scene is locked", context);

      await page.locator('[data-action="world"][data-world="learning"]').click();
      await waitForScreen(page);
      check(await page.locator('.scene-stop[aria-disabled="true"]').count() === 4, "unfinished future-world scenes are not visibly locked", context);
      await page.locator('[data-action="world"][data-world="people"]').click();
      await waitForScreen(page);
    }

    await collectGeometry(page, context);
    await checkBottomClearance(page, context);
  }
}

async function advanceToPractice(page, context) {
  for (const selector of [".decode-step", ".notice-step", ".practice-step"]) {
    await page.locator('[data-action="next-phase"]').click();
    await waitForScreen(page);
    check(await page.locator(selector).count() === 1, `${selector} did not render`, context);
    await collectGeometry(page, `${context}/${selector.slice(1)}`, false);
    await checkBottomClearance(page, `${context}/${selector.slice(1)}`);
  }
}

async function verifyFirstLesson(page, viewportName) {
  const context = `${viewportName}/lesson`;
  await page.goto(`${baseUrl}#/lesson/meet-neighbour/brief`, { waitUntil: "domcontentloaded" });
  await waitForScreen(page);
  check(await page.locator('.lesson-brief[data-lesson-id="meet-neighbour"]').count() === 1, "lesson brief did not render", context);
  check(await page.locator(".brief-action-dock").evaluate((element) => getComputedStyle(element).position) === "static", "lesson brief action is unexpectedly fixed", context);
  check(await page.locator(".brief-audio-actions button").count() === 2, "brief does not expose regular and slow audio", context);
  await collectGeometry(page, `${context}/brief`, false);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  check(await page.locator('[data-action="start-lesson"]').isVisible(), "start action is not visible at the end of the brief", context);
  await page.locator('[data-action="start-lesson"]').click();
  await waitForScreen(page);
  check(await page.locator(".scene-step").count() === 1, "scene phase did not start", context);

  await page.locator('[data-action="lesson-map"]').click();
  check(await page.locator('[role="dialog"]').isVisible(), "lesson map did not open", context);
  check(await page.locator(".phase-map-list button:disabled").count() === 6, "future lesson phases are not locked", context);
  await page.locator('[data-action="close-overlay"]').last().click();
  check(await page.locator('[role="dialog"]').count() === 0, "lesson map did not close", context);

  await advanceToPractice(page, context);
  const checkButton = page.locator('[data-action="check-answer"]');
  check(await checkButton.isDisabled(), "practice check is enabled before an answer is selected", context);
  await page.locator(".answer-option").nth(1).click();
  await page.locator('[data-action="check-answer"]').click();
  check(await page.locator(".answer-feedback.is-wrong").isVisible(), "wrong answer did not receive specific repair feedback", context);
  await page.locator('[data-action="retry-answer"]').click();
  check(await page.locator(".support-sheet").isVisible(), "retry did not open Urdu support", context);
  await page.locator('.support-sheet [data-action="close-overlay"]').click();
  await page.locator(".answer-option").first().click();
  await page.locator('[data-action="check-answer"]').click();
  check(await page.locator(".answer-feedback.is-correct").isVisible(), "correct answer did not receive confirmation", context);
  await page.locator('[data-action="next-phase"]').click();
  await waitForScreen(page);
  check(await page.locator(".act-step").count() === 1, "personal production phase did not render", context);
  check(await page.locator('[data-action="next-phase"]').isDisabled(), "production continue is enabled before learner input", context);
  await page.locator('[data-response-key="name"]').fill("Zara");
  check(!(await page.locator('[data-action="next-phase"]').isDisabled()), "production continue did not enable after input", context);
  check((await page.locator("[data-live-preview]").textContent()).includes("Zara"), "learner input did not update the model sentence", context);
  await page.locator('[data-action="next-phase"]').click();
  await waitForScreen(page);
  check(await page.locator(".check-step").count() === 1, "fresh transfer check did not render", context);
  await page.locator(".answer-option").first().click();
  await page.locator('[data-action="check-answer"]').click();
  await page.locator('[data-action="next-phase"]').click();
  await waitForScreen(page);
  check(await page.locator(".complete-step").count() === 1, "completion phase did not render", context);
  check(await page.locator(".can-do-proof > span").count() === 3, "completion does not show three pieces of learning evidence", context);
  const handled = await page.evaluate(() => window.handleNederUrduBack());
  await waitForScreen(page);
  check(handled === true && await page.locator(".check-step").count() === 1, "hardware back did not return to the previous lesson phase", context);
  await collectGeometry(page, `${context}/check-after-back`, false);
  await checkBottomClearance(page, `${context}/check-after-back`);
}

async function completeCatalogLesson(page, item) {
  const context = `slice/${item.id}`;
  await page.goto(`${baseUrl}#/lesson/${item.id}/brief`, { waitUntil: "domcontentloaded" });
  await waitForScreen(page);
  check(await page.locator(`.lesson-brief[data-lesson-id="${item.id}"]`).count() === 1, "brief resolved to the wrong lesson", context);
  check(await page.locator(".brief-new-language span").count() >= 3, "brief lacks whole useful phrases", context);

  if (item.id === "say-spell-name") {
    await page.locator(".brief-audio-actions button").first().click();
    await page.locator(".brief-audio-actions button").last().click();
    const calls = await page.evaluate(() => window.__ttsCalls || []);
    check(calls.length >= 2 && calls.at(-2).slow === false && calls.at(-1).slow === true, "regular and slow audio controls do not preserve speed intent", context);
  }

  await page.locator('[data-action="start-lesson"]').click();
  await waitForScreen(page);
  check(await page.locator(".conversation-line").count() >= 2, "scene lacks a real exchange", context);
  await page.locator('[data-action="next-phase"]').click();
  await waitForScreen(page);
  check(await page.locator(".word-lens").count() >= 4 && await page.locator(".word-lens").count() <= 5, "decode does not teach a focused 4–5 item set", context);
  await page.locator('[data-action="next-phase"]').click();
  await waitForScreen(page);
  check(await page.locator(".pattern-rule").count() === 1 && await page.locator(".common-mistake").count() === 1, "notice step lacks rule or likely-mistake guidance", context);
  await page.locator('[data-action="next-phase"]').click();
  await waitForScreen(page);
  await page.locator(".answer-option").first().click();
  await page.locator('[data-action="check-answer"]').click();
  check(await page.locator(".answer-feedback.is-correct").count() === 1, "guided practice first answer is not accepted", context);
  await page.locator('[data-action="next-phase"]').click();
  await waitForScreen(page);

  if (item.choice) {
    check(await page.locator(".act-choice-grid button").count() >= 2, "personal act lacks question choices", context);
    await page.locator(".act-choice-grid button").first().click();
    await waitForScreen(page);
  } else {
    check(await page.locator("[data-response-key]").count() === item.fields.length, "personal act has the wrong input count", context);
    const values = { name: "Zara", country: "Pakistan", place: "Rotterdam" };
    for (const key of item.fields) await page.locator(`[data-response-key="${key}"]`).fill(values[key]);
  }
  check(!(await page.locator('[data-action="next-phase"]').isDisabled()), "personal act remains blocked after a complete response", context);
  check(!(await page.locator("[data-live-preview]").textContent()).includes("…"), "personalized sentence still contains an unresolved placeholder", context);
  await page.locator('[data-action="next-phase"]').click();
  await waitForScreen(page);
  await page.locator(".answer-option").first().click();
  await page.locator('[data-action="check-answer"]').click();
  check(await page.locator(".answer-feedback.is-correct").count() === 1, "fresh transfer answer is not accepted", context);
  await page.locator('[data-action="next-phase"]').click();
  await waitForScreen(page);
  check(await page.locator(".can-do-proof > span").count() === item.proofs, `completion shows the wrong evidence count (expected ${item.proofs})`, context);
  if (item.next) {
    check(await page.locator(`.next-scene-card[data-lesson="${item.next}"]`).count() === 1, "completion points to the wrong next scene", context);
  } else {
    check(await page.locator('.next-scene-card[data-route="practice"]').count() === 1, "mission completion does not point to review", context);
  }
  const completed = await page.evaluate(() => JSON.parse(localStorage.getItem("nederurdu-v2-prototype-state") || "{}").completedLessons || []);
  check(completed.includes(item.id), "completion was not persisted", context);
}

async function verifyCompleteWorld(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "nl-NL", reducedMotion: "reduce" });
  const page = await context.newPage();
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("nederurdu-v2-qa-started")) {
      localStorage.clear();
      sessionStorage.setItem("nederurdu-v2-qa-started", "true");
    }
    window.__ttsCalls = [];
    window.NederUrduTts = { speakNatural: (text, slow) => window.__ttsCalls.push({ text, slow }) };
  });

  for (const item of catalog) await completeCatalogLesson(page, item);

  await page.goto(`${baseUrl}#/journey`, { waitUntil: "domcontentloaded" });
  await waitForScreen(page);
  check(await page.locator(".scene-stop.completed").count() === 5, "Journey does not show all five scenes as completed", "slice/journey-complete");
  check(await page.locator(".scene-stop.current").count() === 0, "Journey still marks a scene current after world completion", "slice/journey-complete");
  check((await page.locator(".path-progress b").textContent()).trim() === "100%", "People world progress is not 100%", "slice/journey-complete");
  await collectGeometry(page, "slice/journey-complete");
  await page.reload({ waitUntil: "domcontentloaded" });
  await waitForScreen(page);
  check(await page.locator(".scene-stop.completed").count() === 5, "completed state did not survive reload", "slice/persistence");
  await page.goto(`${baseUrl}#/today`, { waitUntil: "domcontentloaded" });
  await waitForScreen(page);
  check(await page.locator('.daily-stage .primary-action[data-route="practice"]').count() === 1, "completed Today state does not route into review", "slice/today-complete");
  check((await page.locator(".daily-stage h2").textContent()).includes("voltooid"), "completed Today state does not acknowledge world completion", "slice/today-complete");
  check(runtimeErrors.length === 0, `browser errors: ${runtimeErrors.join(" | ")}`, "slice");
  results.push({ viewport: "complete-world", width: 390, height: 844, lessonsCompleted: 5, runtimeErrors: runtimeErrors.length });
  await context.close();
}

async function verifyTextScale(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "nl-NL", reducedMotion: "reduce" });
  const page = await context.newPage();
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.addInitScript(() => localStorage.clear());

  for (const route of ["today", "journey", "practice", "toolkit"]) {
    await page.goto(`${baseUrl}#/${route}`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    await waitForScreen(page);
    await collectGeometry(page, `text-200/${route}`);
    await checkBottomClearance(page, `text-200/${route}`);
  }

  await page.goto(`${baseUrl}#/lesson/people-mission/brief`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
  await waitForScreen(page);
  await collectGeometry(page, "text-200/lesson-brief", false);
  check(await page.locator('[data-action="start-lesson"]').count() === 1, "start action disappeared at 200% text size", "text-200/lesson-brief");
  check(runtimeErrors.length === 0, `browser errors: ${runtimeErrors.join(" | ")}`, "text-200");
  results.push({ viewport: "text-200", width: 390, height: 844, runtimeErrors: runtimeErrors.length });
  await context.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({ viewport, locale: "nl-NL", reducedMotion: "reduce" });
      const page = await context.newPage();
      const runtimeErrors = [];
      page.on("pageerror", (error) => runtimeErrors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") runtimeErrors.push(message.text());
      });
      await page.addInitScript(() => localStorage.clear());
      await verifyRoutes(page, viewport.name);
      await verifyFirstLesson(page, viewport.name);
      check(runtimeErrors.length === 0, `browser errors: ${runtimeErrors.join(" | ")}`, viewport.name);
      results.push({ viewport: viewport.name, width: viewport.width, height: viewport.height, runtimeErrors: runtimeErrors.length });
      await context.close();
    }
    await verifyCompleteWorld(browser);
    await verifyTextScale(browser);
  } finally {
    await browser.close();
  }

  const summary = { ok: failures.length === 0, viewports: results, failures };
  console.log(JSON.stringify(summary, null, 2));
  if (failures.length) process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
