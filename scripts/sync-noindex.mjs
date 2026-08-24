/**
 * Keeps vercel.json's X-Robots-Tag header in sync with NOINDEX in
 * src/site.config.ts, so a single constant drives both the header and the
 * <meta name="robots"> tag. See CLAUDE.md.
 *
 *   node scripts/sync-noindex.mjs           rewrite vercel.json to match
 *   node scripts/sync-noindex.mjs --check   fail if it does not already match
 *
 * vercel.json is a committed, generated file. The build runs --check rather
 * than rewriting, because Vercel reads vercel.json to configure the build
 * before our prebuild step runs — rewriting it there would be too late to
 * affect the headers actually served.
 */
import { readFileSync, writeFileSync } from "node:fs";

const check = process.argv.includes("--check");

const configPath = new URL("../src/site.config.ts", import.meta.url);
const config = readFileSync(configPath, "utf8");
const match = config.match(/export const NOINDEX\s*=\s*(true|false)/);
if (!match) {
  console.error("sync-noindex: could not find NOINDEX in src/site.config.ts");
  process.exit(1);
}
const noindex = match[1] === "true";

const vercelPath = new URL("../vercel.json", import.meta.url);
const current = readFileSync(vercelPath, "utf8");
const vercel = JSON.parse(current);

const robots = {
  source: "/(.*)",
  headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
};

vercel.headers = (vercel.headers ?? []).filter(
  (h) => !h.headers?.some((x) => x.key.toLowerCase() === "x-robots-tag")
);
if (noindex) vercel.headers.unshift(robots);
if (vercel.headers.length === 0) delete vercel.headers;

const next = JSON.stringify(vercel, null, 2) + "\n";

if (next === current) {
  console.log(`sync-noindex: in sync (NOINDEX=${noindex})`);
  process.exit(0);
}

if (check) {
  console.error(
    `sync-noindex: vercel.json is out of sync with NOINDEX=${noindex}.\n` +
      `Run "npm run sync:noindex" and commit the result.`
  );
  process.exit(1);
}

writeFileSync(vercelPath, next);
console.log(
  `sync-noindex: updated vercel.json — X-Robots-Tag ${noindex ? "present" : "removed"}`
);
