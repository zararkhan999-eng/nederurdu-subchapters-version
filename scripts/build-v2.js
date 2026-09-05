const { createHash } = require("crypto");
const { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } = require("fs");
const { basename, resolve } = require("path");
const { spawnSync } = require("child_process");

const ROOT = resolve(__dirname, "..");
const SOURCE = resolve(ROOT, "v2-prototype");
const OUTPUT = resolve(ROOT, "dist-v2");
const STAGING = resolve(ROOT, ".dist-v2-staging");
const FILES = ["index.html", "v2.css", "lesson-data.js", "v2.js"];

function assertScopedDirectory(path, expectedName) {
  if (resolve(path, "..") !== ROOT || basename(path) !== expectedName) {
    throw new Error(`Refusing to replace unscoped build path: ${path}`);
  }
}

function runNode(script, label) {
  const result = spawnSync(process.execPath, [resolve(ROOT, script)], { cwd: ROOT, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${label} failed with exit code ${result.status}.`);
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

function collectFiles(directory, prefix = "") {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = resolve(directory, entry.name);
    return entry.isDirectory() ? collectFiles(absolute, relative) : [relative];
  });
}

assertScopedDirectory(OUTPUT, "dist-v2");
assertScopedDirectory(STAGING, ".dist-v2-staging");
runNode("scripts/test-v2-runtime.js", "V2 runtime gate");
runNode("scripts/validate-v2-catalog.js", "V2 schema gate");
runNode("scripts/audit-v2-curriculum.js", "V2 curriculum gate");
runNode("scripts/build-v2-runtime.js", "V2 browser runtime gate");

rmSync(STAGING, { recursive: true, force: true });
mkdirSync(STAGING, { recursive: true });
FILES.forEach((file) => {
  const source = resolve(SOURCE, file);
  if (!existsSync(source)) throw new Error(`Missing V2 source file: ${file}`);
  copyFileSync(source, resolve(STAGING, file));
});
cpSync(resolve(SOURCE, "runtime"), resolve(STAGING, "runtime"), { recursive: true });

const manifestFiles = collectFiles(STAGING).sort().map((file) => {
  const path = resolve(STAGING, file);
  return { path: file, bytes: statSync(path).size, sha256: sha256(path) };
});
const manifest = {
  product: "NederUrdu V2",
  buildVersion: "v2-part4.0",
  curriculumSchemaVersion: 5,
  entryPoint: "index.html",
  files: manifestFiles
};
writeFileSync(resolve(STAGING, "build-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

rmSync(OUTPUT, { recursive: true, force: true });
renameSync(STAGING, OUTPUT);
console.log(`V2 deterministic build ready: ${OUTPUT}`);
