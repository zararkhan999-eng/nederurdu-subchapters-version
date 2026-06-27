const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const target = path.join(root, "android", "app", "src", "main", "assets", "public");
const files = [
  "index.html",
  "styles.css",
  "duo.css",
  "app.js",
  "course-data.js",
  "word-visual-data.js",
  "manifest.webmanifest",
  "icon.svg",
  "sw.js"
];

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(target, file));
}

copyDirectory(path.join(root, "assets"), path.join(target, "assets"));
console.log(`Synced web app files to ${path.relative(root, target)}`);
