# drgeoffcashion

Deployed on Vercel from this repository.

## Content: Sanity

All site content is read from Sanity (project `4odz5ftz`, dataset
`production`) at build time, via `src/sanity/queries.ts`: Site Settings
(contact details, header, footer, refer band) and every page's text and
images, section by section. Clinics are their own documents (Clinics in the
Studio sidebar, ordered by their Order field), shown on the procedure page and
counted on the Contact page. Publications are a list inside the research
page's document. Reviews are standalone documents, hidden from the
Studio (`HIDDEN_TYPES` in its `structure.ts`) because no page shows them. Each main page has
its own document type (`homePage`, `aboutPage`, `vasectomyPage`,
`researchPage`, `contactPage`, `referPage`); the thank-you pages and the
sitemap use `page`. All page documents have IDs `page-<slug>`. Layouts, CSS,
and interface wording (filter buttons, form labels, the side navigation,
diagram labels) stay in code.

Images are served by Sanity's image CDN as WebP srcsets
(`src/sanity/image.ts`, `src/components/SanityImage.astro`); the build does
not download them. Rich text renders through `src/components/RichText.astro`.

The Studio is `studio-dr-geoff-cashion/`, a separate package deployed to
https://drgeoffcashion.sanity.studio; see its README. `src/data/*.ts` is only
the seed source for `npm run sanity:seed`; page sections are in
`src/data/pageContent.ts`, turned into documents by `scripts/seed-pages.mjs`.

The site is static, so content changes need a Vercel rebuild. A Sanity
webhook ("Rebuild site on Vercel", manage.sanity.io → API → Webhooks) calls a
Vercel deploy hook on `main` whenever a published document of those types is
created, updated or deleted (a new document type must be added to the
webhook's filter too), so a publish is live about a minute later. The
hook URL is a secret and is not stored in this repo.

## URLs end in a slash

Every page URL ends in `/` (`/about/`, `/vasectomy/#locations`). Astro has
`trailingSlash: 'always'`, and `vercel.json` has `"trailingSlash": true`, so
Vercel 308-redirects `/about` to `/about/`. Write internal links with the
slash; links from Sanity pass through `withSlash()` in
`src/sanity/queries.ts`, so an editor's `/about` still comes out right.
`vercel.json` is generated only for its headers block; other keys, including
this one, are kept as they are.

## Build-time checks and structured data

`npm run build` ends with `scripts/check-html.mjs` (the `postbuild` script),
which fails the build if any page has an `<img>` without `alt`, a raster
image that is not WebP/AVIF, an `<img>` without a `loading` attribute or more
than one eager image, an `<iframe>` that is not lazy, an external link without
`target="_blank"` and `rel="nofollow noopener"`, or invalid JSON-LD. Fix the
page rather than loosening the check.

JSON-LD: `Base.astro` emits WebSite + WebPage on every page, `PageHero.astro`
a BreadcrumbList matching the visible crumbs, and `vasectomy.astro` a
MedicalProcedure and an FAQPage (from the "What it does not change"
accordion). URLs in it are absolute against `site` in `astro.config.mjs`.
`/llms.txt` is generated from Sanity by `src/pages/llms.txt.ts`.

## Search engine indexing: OFF (temporary)

This site must not be indexed by search engines **for now**. It is expected to
become indexable at launch, so the noindex must be built as a single switch, not
sprinkled across the codebase.

### The switch

One constant, `NOINDEX` in `src/site.config.ts`, drives both controls:

| Control | Comes from | Covers |
| --- | --- | --- |
| `X-Robots-Tag: noindex, nofollow` | `vercel.json` headers block | every route and file type |
| `<meta name="robots" content="noindex, nofollow">` | `src/layouts/Base.astro` | HTML only, backstop |

`vercel.json` is a **generated, committed** file. After changing `NOINDEX`, run:

    npm run sync:noindex

and commit the result. `npm run build` runs `sync-noindex --check` and fails if
the two disagree, so they cannot silently drift. The check does not rewrite the
file during a Vercel build on purpose — Vercel reads `vercel.json` to configure
the build before `prebuild` runs, so a rewrite there would be too late to change
the headers actually served.

### Standing rules while the switch is on

- `robots.txt` must **not** blanket-`Disallow: /`. Crawlers have to fetch a page
  to see its noindex directive; blocking them in robots.txt hides the noindex
  and can leave URLs indexed from inbound links, with no description and no
  clean way to remove them. Use robots.txt for crawl hints only.
- No `sitemap.xml`, and no submission to Google Search Console, Bing Webmaster
  Tools, or any other index-submission surface.
- Do not add Search Console site verification while the switch is on.

### Verify before sharing any URL

Check the deployed URL, not the source. Vercel noindexes preview deployments
automatically but does **not** noindex production, so production is the case
that actually matters here:

    curl -sSI https://<production-domain>/ | grep -i x-robots-tag
    curl -sS  https://<production-domain>/ | grep -i 'name="robots"'

Both must be present. If either is missing, the site is not safe to share.

### At launch, when the switch flips off

1. Set `NOINDEX = false` and deploy.
2. Verify the header and meta tag are **gone** from production, using the same
   two commands above.
   The exception is `/thank-you-contact/` and `/thank-you-refer/`: they pass
   `noindex` to `Base.astro` and keep `<meta name="robots" content="noindex">`
   permanently, because they only make sense after a form submission. That is
   a per-page property, not part of the switch.
3. Only then add `sitemap.xml`, Search Console verification, and submit.

Nothing gets indexed automatically on flip — indexing requires submission.
