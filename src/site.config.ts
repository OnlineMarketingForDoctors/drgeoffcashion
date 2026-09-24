/**
 * Search engine indexing switch. See CLAUDE.md.
 *
 * true  -> X-Robots-Tag header (vercel.json) + <meta name="robots"> on every page
 * false -> both removed
 *
 * Flipping this is the entire launch change. `npm run build` regenerates
 * vercel.json from this value via scripts/sync-noindex.mjs.
 */
export const NOINDEX = true;

// Contact details, header, footer and the refer band are edited in Sanity
// (Site Settings), not here. See src/sanity/queries.ts.
