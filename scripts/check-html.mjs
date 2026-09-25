/**
 * Post-build checks on every page in dist/, so the SEO and performance
 * rules below cannot quietly regress. Runs as `postbuild`; any failure fails
 * the build, and Vercel keeps serving the previous deployment.
 *
 * - every <img> has an alt attribute
 * - raster images are WebP (or AVIF); SVG is fine. Sanity CDN images count
 *   when the URL asks for fm=webp
 * - every <img> says how it loads, and at most one per page is eager (the
 *   hero); every <iframe> is lazy
 * - external links open in a new tab with rel="nofollow …"
 * - every JSON-LD block is valid JSON
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname;
const OWN_HOSTS = new Set(["drgeoffcashion.com.au", "www.drgeoffcashion.com.au", "drgeoffcashion.vercel.app"]);

const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith(".html") ? [p] : [];
  });

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}(?:=("[^"]*"|'[^']*'|[^\\s>]+))?(?=[\\s/>])`, "i"));
  if (!m) return undefined;
  if (m[1] === undefined) return "";
  return m[1]
    .replace(/^["']|["']$/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

const problems = [];
const warnings = [];

for (const file of htmlFiles(DIST)) {
  const page = file.slice(DIST.length - 1);
  const html = readFileSync(file, "utf8");
  const fail = (msg) => problems.push(`${page}: ${msg}`);

  let eager = 0;
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    const src = attr(tag, "src") ?? "";
    const alt = attr(tag, "alt");
    if (alt === undefined) fail(`<img> without alt: ${src}`);
    else if (alt === "") warnings.push(`${page}: empty alt (decorative?): ${src}`);

    const urls = [src, ...(attr(tag, "srcset") ?? "").split(",").map((s) => s.trim().split(/\s+/)[0])];
    for (const u of urls.filter(Boolean)) {
      const ok =
        /\.(webp|avif|svg)(\?|$)/i.test(u) ||
        u.startsWith("data:") ||
        (/^https:\/\/cdn\.sanity\.io\/images\//.test(u) && /[?&]fm=(webp|avif)\b/.test(u));
      if (!ok) fail(`image not WebP: ${u}`);
    }

    const loading = attr(tag, "loading");
    if (!loading) fail(`<img> without loading attribute: ${src}`);
    if (loading === "eager") eager++;
  }
  if (eager > 1) fail(`${eager} eagerly loaded images; only the hero should be`);

  for (const tag of html.match(/<source\b[^>]*>/gi) ?? []) {
    const type = attr(tag, "type");
    if (type && !/image\/(webp|avif)/.test(type) && !/^video\//.test(type)) fail(`<source> type ${type}`);
  }

  for (const tag of html.match(/<iframe\b[^>]*>/gi) ?? []) {
    if (attr(tag, "loading") !== "lazy") fail(`<iframe> not lazy: ${attr(tag, "src")}`);
  }

  for (const tag of html.match(/<a\b[^>]*>/gi) ?? []) {
    const href = attr(tag, "href") ?? "";
    if (!/^(https?:)?\/\//i.test(href)) continue;
    let host;
    try {
      host = new URL(href, "https://drgeoffcashion.com.au").hostname;
    } catch {
      fail(`unparseable link ${href}`);
      continue;
    }
    if (OWN_HOSTS.has(host)) continue;
    if (attr(tag, "target") !== "_blank") fail(`external link not opening in a new tab: ${href}`);
    const rel = (attr(tag, "rel") ?? "").split(/\s+/);
    if (!rel.includes("nofollow")) fail(`external link without rel="nofollow": ${href}`);
    if (!rel.includes("noopener")) fail(`external link without rel="noopener": ${href}`);
  }

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(json);
    } catch (e) {
      fail(`invalid JSON-LD: ${e.message}`);
    }
  }
}

for (const w of warnings) console.warn(`check-html: warning: ${w}`);
if (problems.length) {
  console.error(`check-html: ${problems.length} problem(s)\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`check-html: ${htmlFiles(DIST).length} pages OK`);
