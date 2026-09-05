const { existsSync, rmSync } = require("fs");
const { resolve } = require("path");
const { spawnSync } = require("child_process");

const ROOT = resolve(__dirname, "..");
const BUILD_ROOT = resolve(ROOT, ".v2-build");
const TSC = resolve(ROOT, "node_modules/typescript/lib/tsc.js");

function runNode(args, label) {
  const result = spawnSync(process.execPath, args, { cwd: ROOT, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${label} failed with exit code ${result.status}.`);
}

if (!existsSync(TSC)) {
  throw new Error("TypeScript is not installed. Run pnpm install before testing V2.");
}

rmSync(BUILD_ROOT, { recursive: true, force: true });
runNode([TSC, "-p", resolve(ROOT, "tsconfig.v2.json")], "V2 TypeScript compile");
runNode([resolve(BUILD_ROOT, "tests-v2/runtime-foundation.test.js")], "V2 runtime foundation tests");
