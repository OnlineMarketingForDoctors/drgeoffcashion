import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';

// astro.config.mjs runs before Astro loads env, so import.meta.env is not
// available here. loadEnv reads the same PUBLIC_ variables the pages use.
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV ?? 'development',
  process.cwd(),
  ''
);

export default defineConfig({
  site: 'https://drgeoffcashion.com.au',
  build: { inlineStylesheets: 'auto' },
  integrations: [
    sanity({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      // false for static builds, so a deploy never serves stale CDN content
      useCdn: false,
      // studioBasePath deliberately omitted — the Studio stays standalone
      // in the sibling folder rather than being embedded in this app.
    }),
  ],
});
