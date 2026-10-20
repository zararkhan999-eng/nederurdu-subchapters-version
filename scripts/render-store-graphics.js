// Renders the Google Play graphics from docs/store-listing/source/*.html:
//   docs/store-listing/play-icon-512.png        (512 x 512, store icon)
//   docs/store-listing/feature-graphic-1024x500.png
// and the Android adaptive launcher layers from art/brand.js:
//   android/app/src/main/res/mipmap-*dpi/ic_launcher_{foreground,monochrome}.png
// Usage: node scripts/render-store-graphics.js
// Set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH to use a locally installed Chrome.
const path = require("path");
const { chromium } = require("@playwright/test");
const brand = require("../art/brand.js");

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
  // 108dp adaptive layers at each density bucket.
  const densities = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
  const layers = { foreground: brand.adaptiveForeground(), monochrome: brand.adaptiveMonochrome() };
  for (const [bucket, scale] of Object.entries(densities)) {
    const px = Math.round(108 * scale);
    const page = await browser.newPage({ viewport: { width: px, height: px }, deviceScaleFactor: 1 });
    for (const [layer, svg] of Object.entries(layers)) {
      await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block}</style>${svg.replace('width="108" height="108"', `width="${px}" height="${px}"`)}`);
      const out = path.join(root, "android", "app", "src", "main", "res", `mipmap-${bucket}`, `ic_launcher_${layer}.png`);
      require("fs").mkdirSync(path.dirname(out), { recursive: true });
      await page.locator("svg").screenshot({ path: out, omitBackground: true });
    }
    await page.close();
  }
  console.log("Wrote Android launcher layers for", Object.keys(densities).join(", "));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
