/* Renders review contact sheets of the shipped word pictures into visual-review/<group>.jpg,
   grouped by the visual kinds in word-visual-data.js. Run after `npm run art:build`:
   node scripts/create-visual-contact-sheets.js */
const fs = require("fs");
const path = require("path");
const { chromium } = require("@playwright/test");

const root = path.resolve(__dirname, "..");
global.window = global;
window.NEDERURDU_CHAPTERS = [];
require(path.join(root, "word-visual-data.js"));

const GROUPS = {
  foundations: ["foundation"],
  "people-body": ["person", "body"],
  "objects-places": ["object", "place"],
  actions: ["action"],
  situations: ["situation"]
};

(async () => {
  const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {});
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 800 } });
    for (const [name, kinds] of Object.entries(GROUPS)) {
      const visuals = window.NEDERURDU_WORD_VISUALS.filter((v) => kinds.includes(v.kind));
      const tiles = visuals.map((v) => {
        const svg = fs.readFileSync(path.join(root, v.src), "utf8");
        return `<figure>${svg}<figcaption>${v.id}</figcaption></figure>`;
      }).join("");
      await page.setContent(`<!doctype html><meta charset="utf-8"><style>
        body{margin:0;padding:10px;background:#f4f6f7;font:13px system-ui,sans-serif;color:#20272c}
        main{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
        figure{margin:0;background:#fff;border-radius:12px;overflow:hidden;text-align:center}
        svg{display:block;width:100%;height:auto}figcaption{padding:4px}</style><main>${tiles}</main>`);
      await page.screenshot({ path: path.join(root, "visual-review", `${name}.jpg`), fullPage: true, type: "jpeg", quality: 82 });
      console.log(`${name}: ${visuals.length} pictures`);
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
