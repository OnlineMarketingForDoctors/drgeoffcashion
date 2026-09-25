/**
 * Turns the hardcoded site data into an NDJSON file that
 * `sanity dataset import` can load into the Content Lake.
 *
 * Reviews deliberately have no `_id`: Sanity assigns document IDs, and the
 * schema guidance is to keep explicit IDs for singletons only. Re-importing
 * them creates duplicates rather than upserting, so import into an empty
 * dataset (or clear them first). Clinics and publications are lists inside
 * the procedure and research page documents.
 *
 * Site Settings and the pages do have fixed IDs (`siteSettings`,
 * `page-<slug>`), because the site loads them by ID. An import stops on an
 * ID that already exists unless given --replace (overwrite) or --missing
 * (skip existing). Their images and the home page video point at the files
 * in src/assets/generated/ and public/assets/, which the import uploads.
 *
 *   npm run sanity:seed
 *   cd studio-dr-geoff-cashion
 *   npx sanity dataset import ../dist-sanity/seed.ndjson --dataset production
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { reviews } from '../src/data/reviews.ts';
import { siteSettings } from '../src/data/siteSettings.ts';
import { buildOfferImage, buildPageDocs } from './seed-pages.mjs';

// `sanity dataset import` uploads these, resolving file:// against this path
const assetsDir = new URL('../src/assets/generated/', import.meta.url).pathname;
const refs = {
  image: (file) => ({ _sanityAsset: `image@file://${assetsDir}${file}` }),
  file: (file) => ({ _sanityAsset: `file@file://${new URL(`../public/assets/${file}`, import.meta.url).pathname}` }),
};

const docs = [];

// Sanity needs a _key on every object in an array
const keyed = (links) => links.map((l, i) => ({ _key: `link${i}`, _type: 'link', ...l }));
const link = (l) => ({ _type: 'link', ...l });

docs.push({
  _id: 'siteSettings',
  _type: 'siteSettings',
  ...siteSettings,
  navLinks: keyed(siteSettings.navLinks),
  headerCta: link(siteSettings.headerCta),
  footerLinks: keyed(siteSettings.footerLinks),
  credit: link(siteSettings.credit),
  referButton: link(siteSettings.referButton),
  offerImage: buildOfferImage(refs),
});

docs.push(...buildPageDocs(refs));

for (const [i, r] of reviews.entries()) {
  docs.push({
    _type: 'review',
    order: i + 1,
    name: r.name,
    body: r.body,
    rating: r.rating,
    when: r.when,
    // `reviews` and `photos` are Google's display strings, e.g. "12 reviews"
    ...(r.reviews ? { reviewCount: r.reviews } : {}),
    ...(r.photos ? { photoCount: r.photos } : {}),
    localGuide: Boolean(r.localGuide),
  });
}

mkdirSync('dist-sanity', { recursive: true });
const out = docs.map((d) => JSON.stringify(d)).join('\n') + '\n';
writeFileSync('dist-sanity/seed.ndjson', out);

const counts = docs.reduce((acc, d) => ({ ...acc, [d._type]: (acc[d._type] ?? 0) + 1 }), {});
console.log(`dist-sanity/seed.ndjson — ${docs.length} documents`, counts);
