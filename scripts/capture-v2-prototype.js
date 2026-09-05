const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");

const baseUrl = process.env.NEDERURDU_V2_URL || "http://127.0.0.1:4173/v2-prototype/index.html";
const outputDirectory = process.env.NEDERURDU_V2_CAPTURE_DIR || "/private/tmp/nederurdu-v2-captures";
const lessons = [
  { id: "meet-neighbour", fields: ["name"] },
  { id: "say-spell-name", fields: ["name"] },
  { id: "origin-home", fields: ["country", "place"] },
  { id: "ask-back", choice: true },
  { id: "people-mission", fields: ["name", "country", "place"] }
];

async function settle(page) {
  await page.locator(".screen-enter").first().waitFor({ state: "visible" });
  await page.waitForFunction(() => document.querySelector(".screen-enter")?.classList.contains("is-visible"));
  await page.waitForTimeout(160);
}

async function capture(page, name, fullPage = true) {
  await settle(page);
  await page.screenshot({ path: path.join(outputDirectory, `${name}.png`), fullPage });
}

async function reachAct(page) {
  for (let index = 0; index < 3; index += 1) {
    await page.locator('[data-action="next-phase"]').click();
    await settle(page);
  }
  await page.locator(".answer-option").first().click();
  await page.locator('[data-action="check-answer"]').click();
  await page.locator('[data-action="next-phase"]').click();
  await settle(page);
}

async function completeAct(page, lesson) {
  if (lesson.choice) {
    await page.locator(".act-choice-grid button").first().click();
    await settle(page);
    return;
  }
  const values = { name: "Zara", country: "Pakistan", place: "Rotterdam" };
  for (const key of lesson.fields) await page.locator(`[data-response-key="${key}"]`).fill(values[key]);
}

async function capturePhone(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: "nl-NL", reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.clear());

  for (const route of ["today", "journey", "practice", "toolkit"]) {
    await page.goto(`${baseUrl}#/${route}`, { waitUntil: "domcontentloaded" });
    await capture(page, `phone-${route}`, false);
  }

  for (const lesson of lessons) {
    await page.goto(`${baseUrl}#/lesson/${lesson.id}/brief`, { waitUntil: "domcontentloaded" });
    await capture(page, `phone-${lesson.id}-brief`);
    await page.locator('[data-action="start-lesson"]').click();
    await capture(page, `phone-${lesson.id}-scene`);
    await reachAct(page);
    await completeAct(page, lesson);
    await capture(page, `phone-${lesson.id}-act`);
    await page.locator('[data-action="next-phase"]').click();
    await settle(page);
    await page.locator(".answer-option").first().click();
    await page.locator('[data-action="check-answer"]').click();
    await page.locator('[data-action="next-phase"]').click();
    await capture(page, `phone-${lesson.id}-complete`);
  }
  await context.close();
}

async function captureDesktop(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "nl-NL", reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.addInitScript(() => localStorage.clear());

  for (const route of ["today", "journey"]) {
    await page.goto(`${baseUrl}#/${route}`, { waitUntil: "domcontentloaded" });
    await capture(page, `desktop-${route}`, false);
  }

  for (const lesson of lessons) {
    await page.goto(`${baseUrl}#/lesson/${lesson.id}/brief`, { waitUntil: "domcontentloaded" });
    await capture(page, `desktop-${lesson.id}-brief`, false);
  }

  await page.goto(`${baseUrl}#/lesson/people-mission/brief`, { waitUntil: "domcontentloaded" });
  await page.locator('[data-action="start-lesson"]').click();
  await capture(page, "desktop-people-mission-scene", false);
  await context.close();
}

(async () => {
  fs.mkdirSync(outputDirectory, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    await capturePhone(browser);
    await captureDesktop(browser);
  } finally {
    await browser.close();
  }
  console.log(outputDirectory);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
