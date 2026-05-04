import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const rootDir = process.cwd();
const nuxtTsconfigPath = resolve(rootDir, ".nuxt/tsconfig.json");
const vueTscTsconfigPath = resolve(rootDir, ".nuxt/tsconfig.vue-tsc.json");

const nuxtTsconfig = JSON.parse(readFileSync(nuxtTsconfigPath, "utf8"));
const sanitizedTsconfig = {
  ...nuxtTsconfig,
  vueCompilerOptions: {
    ...(nuxtTsconfig.vueCompilerOptions ?? {}),
    plugins: [],
  },
};

writeFileSync(
  vueTscTsconfigPath,
  `${JSON.stringify(sanitizedTsconfig, null, 2)}\n`,
  "utf8",
);

const result = spawnSync(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["vue-tsc", "--noEmit", "-p", vueTscTsconfigPath],
  {
    stdio: "inherit",
  },
);

process.exit(result.status ?? 1);
