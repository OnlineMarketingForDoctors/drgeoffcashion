import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';

// astro.config.mjs runs before Astro loads env, so import.meta.env is not
// available here. loadEnv reads the same PUBLIC_ variables the pages use.
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

// Neither value is a secret — both are visible in every request the browser
// makes to the Content Lake. Defaulting to them keeps the build working on
// hosts with no env configured (Vercel reads no .env from this repo), while
// still allowing an override to point a branch at another dataset.
const projectId = env.PUBLIC_SANITY_PROJECT_ID || '4odz5ftz';
const dataset = env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  site: 'https://drgeoffcashion.com.au',
  // every page URL ends in a slash; vercel.json redirects the bare form
  trailingSlash: 'always',
  build: { inlineStylesheets: 'auto' },
  integrations: [
    sanity({
      projectId,
      dataset,
      // false for static builds, so a deploy never serves stale CDN content
      useCdn: false,
      // studioBasePath deliberately omitted — the Studio stays standalone
      // in the sibling folder rather than being embedded in this app.
    }),
  ],
});
