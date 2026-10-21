/* Renders the Pim art kit (art/*.js) to the SVG files the app ships:
     assets/word-visuals/<id>.svg   one picture per word in word-visual-data.js
     assets/visuals/<topic>.svg     the lesson topic headers
     icon.svg                       the web app icon
   Run with `npm run art:build`; `--check` fails if any shipped file is out of date. */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
global.window = global;
window.NEDERURDU_CHAPTERS = [];
require(path.join(root, "word-visual-data.js"));
const words = require(path.join(root, "art", "render.js"));
const scenes = require(path.join(root, "art", "scenes.js"));
const brand = require(path.join(root, "art", "brand.js"));

const check = process.argv.includes("--check");
const outputs = new Map();

for (const visual of window.NEDERURDU_WORD_VISUALS) {
  const svg = words.renderWord(visual.id, visual.kind);
  if (!svg) throw new Error(`No Pim picture for word visual "${visual.id}". Add it to an art/words-*.js set.`);
  outputs.set(path.join("assets", "word-visuals", `${visual.id}.svg`), svg);
}
for (const [name, svg] of Object.entries(scenes.topics())) {
  outputs.set(path.join("assets", "visuals", `${name}.svg`), svg);
}

outputs.set("icon.svg", brand.icon());

const stale = [];
for (const [rel, svg] of outputs) {
  const file = path.join(root, rel);
  const content = `${svg}\n`;
  const current = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  if (current === content) continue;
  if (check) stale.push(rel);
  else fs.writeFileSync(file, content, "utf8");
}

// Pictures for words that no longer exist would still ship (the Android sync copies all of assets/).
const orphans = ["word-visuals", "visuals"].flatMap((dir) => fs.readdirSync(path.join(root, "assets", dir))
  .filter((name) => name.endsWith(".svg"))
  .map((name) => path.join("assets", dir, name))
  .filter((rel) => !outputs.has(rel)));
if (check) stale.push(...orphans);
else orphans.forEach((rel) => fs.rmSync(path.join(root, rel)));

if (check && stale.length) {
  console.error(`${stale.length} art file(s) are out of date or orphaned; run npm run art:build:\n${stale.join("\n")}`);
  process.exit(1);
}
const bytes = [...outputs.values()].reduce((sum, svg) => sum + svg.length, 0);
console.log(`${check ? "Checked" : "Wrote"} ${outputs.size} SVGs (${Math.round(bytes / 1024)} KB total, largest ${Math.round(Math.max(...[...outputs.values()].map((s) => s.length)) / 1024)} KB).`);
