# Dr Geoff Cashion — Sanity Studio

Standalone Sanity Studio for project `4odz5ftz`, dataset `production`. It is a
separate npm package from the Astro site at the repository root: Vercel builds
only the site, and the Studio is not embedded in it (`astro.config.mjs` has no
`studioBasePath`).

Deployed at https://drgeoffcashion.sanity.studio.

Publishing rebuilds the live site automatically (a Sanity webhook calls a
Vercel deploy hook), so changes appear about a minute after publishing.
Drafts do not trigger a rebuild.

Schema types live in `schemaTypes/`. Their fields match the GROQ queries in
`../src/sanity/queries.ts`.

- **Site Settings** (`siteSettings`): one document, ID `siteSettings`, for
  what repeats on every page: contact details, header, footer, refer band.
- **Pages**: one document per route, ID `page-<slug>`. The six main pages
  each have their own type (`homePage`, `aboutPage`, `vasectomyPage`,
  `researchPage`, `contactPage`, `referPage`, in `schemaTypes/pages.ts`), with
  a tab per page section: headings, text, lists, figures and images,
  including background images. The thank-you pages and the sitemap use the
  simple `page` type (hero and SEO only). Routes and layouts live in the
  Astro app, so the Studio offers no create, delete or duplicate for pages
  or Site Settings (see `structure.ts`, `sanity.config.ts`).
- Images use `imageWithAlt`: alt text is required, and the hotspot sets
  which part of the picture stays in frame when it is cropped to fit.
- **Clinics**: one document per clinic, listed in the sidebar. The Order
  field sets the order within each state on the procedure page.
- **Publications**: a list inside the research page (Publications tab),
  shown newest first on the site.
- **Reviews**: kept in the dataset but hidden from the Studio (`HIDDEN_TYPES`
  in `structure.ts`), because no page shows them.

## Commands

Run from this folder, after `npm install`:

    npm run dev                  # local Studio on http://localhost:3333
    npx sanity schemas deploy    # after changing schemaTypes/
    npx sanity deploy            # publish to drgeoffcashion.sanity.studio

The CLI needs a token for project `4odz5ftz`. If `SANITY_AUTH_TOKEN` in your
environment belongs to another project, the CLI returns
`401 Session does not match project host`; override it per call, e.g.
`SANITY_AUTH_TOKEN="$SANITY_AUTH_TOKEN_DRGEOFFCASHION" npx sanity deploy`.

## Seeding content

`npm run sanity:seed` at the repository root writes `dist-sanity/seed.ndjson`
from `src/data/*.ts`. The documents have no `_id`, so importing twice creates
duplicates — delete the existing `clinic`, `publication` and `review`
documents before re-importing:

    npx sanity dataset import ../dist-sanity/seed.ndjson --dataset production
