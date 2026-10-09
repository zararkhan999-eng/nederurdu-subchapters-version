// Renders the Google Play graphics from docs/store-listing/source/*.html:
//   docs/store-listing/play-icon-512.png        (512 x 512, store icon)
//   docs/store-listing/feature-graphic-1024x500.png
// Usage: node scripts/render-store-graphics.js
// Set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH to use a locally installed Chrome.
const path = require("path");
const { chromium } = require("@playwright/test");

const root = path.resolve(__dirname, "..");
const listing = path.join(root, "docs", "store-listing");
const jobs = [
  { source: "icon-512.html", output: "play-icon-512.png", width: 512, height: 512 },
  { source: "feature-graphic.html", output: "feature-graphic-1024x500.png", width: 1024, height: 500 }
];

(async () => {
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  for (const job of jobs) {
    const page = await browser.newPage({ viewport: { width: job.width, height: job.height }, deviceScaleFactor: 1 });
    await page.goto(`file://${path.join(listing, "source", job.source)}`);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("#capture").screenshot({ path: path.join(listing, job.output), omitBackground: false });
    console.log(`Wrote docs/store-listing/${job.output}`);
    await page.close();
  }
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
