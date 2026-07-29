const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
global.window = global;
window.NEDERURDU_CHAPTERS = [];
require(path.join(root, "word-visual-data.js"));

const visualSources = [...new Set(
  (window.NEDERURDU_WORD_VISUALS || [])
    .map((visual) => String(visual.src || "").replace(/^\.?\//, ""))
    .filter(Boolean)
)].sort();

const missingSources = visualSources.filter((source) => !fs.existsSync(path.join(root, source)));
if (missingSources.length) {
  throw new Error(`Cannot build the offline manifest; ${missingSources.length} visual asset(s) are missing:\n${missingSources.join("\n")}`);
}

const manifestPath = path.join(root, "assets", "word-visuals", "offline-manifest.json");
fs.writeFileSync(manifestPath, `${JSON.stringify(visualSources, null, 2)}\n`, "utf8");
console.log(`Wrote ${visualSources.length} visual assets to ${path.relative(root, manifestPath)}`);
