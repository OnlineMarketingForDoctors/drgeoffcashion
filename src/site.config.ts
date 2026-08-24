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

export const SITE = {
  name: 'Dr Geoff Cashion',
  phoneLabel: '1800 SNIPME',
  phoneDigits: '1800 764 763',
  phoneHref: 'tel:1800764763',
  email: 'info@vasectomyaustralia.com.au',
  facebook: 'https://www.facebook.com/vasectomyaustralia',
  parentSite: 'https://vasectomyaustralia.com.au/',
} as const;
