# Dr Geoff Cashion — Sanity Studio

Standalone Sanity Studio for project `4odz5ftz`, dataset `production`. It is a
separate npm package from the Astro site at the repository root: Vercel builds
only the site, and the Studio is not embedded in it (`astro.config.mjs` has no
`studioBasePath`).

Deployed at https://drgeoffcashion.sanity.studio.

Schema types live in `schemaTypes/` (`clinic`, `publication`, `review`). Their
fields match the GROQ queries in `../src/sanity/queries.ts`.

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
