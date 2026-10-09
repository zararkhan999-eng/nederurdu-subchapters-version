const fs = require("fs");
const path = require("path");

require("./generate-offline-visual-manifest.js");

const root = path.resolve(__dirname, "..");
const target = path.join(root, "android", "app", "src", "main", "assets", "public");

// Only the files index.html loads, directly or through a CSS @import
// (open-door.css imports open-door-layout.css as its foundation layer).
// Older stylesheets (styles.css, duo.css, ...) stay in the repo but are not
// shipped. sw.js is left out too: service workers do not run from
// file:///android_asset.
const files = [
  "index.html",
  "manifest.webmanifest",
  "icon.svg",
  "open-door-layout.css",
  "open-door.css",
  "playful.css",
  "world.css",
  "lesson.css",
  "rewards.css",
  "screens.css",
  "course-data.js",
  "word-visual-data.js",
  "motion.js",
  "sound.js",
  "cat.js",
  "street.js",
  "map.js",
  "lesson.js",
  "rewards.js",
  "open-door.js",
  "app.js"
];

// Finder and iCloud leave copies such as "app 2.js"; never ship them.
const isStrayCopy = (name) => name === ".DS_Store" || / \d+(\.[^.]+)?$/.test(name);

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (isStrayCopy(entry.name)) continue;
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const referenced = [...read("index.html").matchAll(/(?:href|src)="([^"?#]+)/g)].map((match) => match[1]);
for (const file of files.filter((name) => name.endsWith(".css"))) {
  for (const match of read(file).matchAll(/@import\s+url\(\s*["']?([^"')?#]+)/g)) referenced.push(match[1]);
}
const missing = [...new Set(referenced)].filter((file) => !files.includes(file));
if (missing.length) {
  throw new Error(`index.html loads files the Android sync does not copy: ${missing.join(", ")}`);
}

// Start from an empty folder so removed or renamed files never linger in the APK.
fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(target, file));
}

copyDirectory(path.join(root, "assets"), path.join(target, "assets"));
console.log(`Synced ${files.length} web files and assets to ${path.relative(root, target)}`);
