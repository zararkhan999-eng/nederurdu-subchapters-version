const { existsSync, renameSync, rmSync } = require("fs");
const { basename, resolve } = require("path");
const { spawnSync } = require("child_process");

const ROOT = resolve(__dirname, "..");
const STAGING = resolve(ROOT, ".v2-browser-staging");
const OUTPUT = resolve(ROOT, "v2-prototype/runtime");
const TSC = resolve(ROOT, "node_modules/typescript/lib/tsc.js");

function assertScoped(path, parent, name) {
  if (resolve(path, "..") !== parent || basename(path) !== name) {
    throw new Error(`Refusing to replace unscoped runtime path: ${path}`);
  }
}

assertScoped(STAGING, ROOT, ".v2-browser-staging");
assertScoped(OUTPUT, resolve(ROOT, "v2-prototype"), "runtime");
rmSync(STAGING, { recursive: true, force: true });

const result = spawnSync(process.execPath, [TSC, "-p", resolve(ROOT, "tsconfig.v2.browser.json")], {
  cwd: ROOT,
  stdio: "inherit"
});
if (result.error) throw result.error;
if (result.status !== 0) throw new Error(`V2 browser runtime compile failed with exit code ${result.status}.`);

const entry = resolve(STAGING, "browser/runtime-bridge.js");
if (!existsSync(entry)) throw new Error("V2 browser runtime entry was not generated.");
rmSync(OUTPUT, { recursive: true, force: true });
renameSync(STAGING, OUTPUT);
console.log(`V2 browser runtime ready: ${OUTPUT}`);
