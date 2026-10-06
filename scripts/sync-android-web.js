const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

require("./generate-offline-visual-manifest.js");

const root = path.resolve(__dirname, "..");
const target = path.join(root, "android", "app", "src", "main", "assets", "public");
const files = [
  "index.html",
  "styles.css",
  "duo.css",
  "experience.css",
  "immersive.css",
  "landing.css",
  "brand-system.css",
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

fs.mkdirSync(target, { recursive: true });

// Remove numbered Finder copies only when a group contains multiple byte-identical files.
const duplicateName = /^(.+) ([2-9])(\.[^.]+)$/;
const duplicateGroups = new Map();
for (const name of fs.readdirSync(target)) {
  const match = name.match(duplicateName);
  if (!match) continue;
  const canonicalPath = path.join(target, `${match[1]}${match[3]}`);
  if (!fs.existsSync(canonicalPath)) continue;
  const group = duplicateGroups.get(match[1]) || [];
  group.push(path.join(target, name));
  duplicateGroups.set(match[1], group);
}
for (const copies of duplicateGroups.values()) {
  if (copies.length < 2) continue;
  const hashes = copies.map((file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"));
  if (hashes.every((hash) => hash === hashes[0])) copies.forEach((file) => fs.unlinkSync(file));
}
for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(target, file));
}

copyDirectory(path.join(root, "assets"), path.join(target, "assets"));
console.log(`Synced web app files to ${path.relative(root, target)}`);
