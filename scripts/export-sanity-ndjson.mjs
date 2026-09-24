/**
 * Turns the hardcoded site data into an NDJSON file that
 * `sanity dataset import` can load into the Content Lake.
 *
 * Deliberately does not set `_id`: Sanity assigns document IDs, and the
 * schema guidance is to keep explicit IDs for singletons only. That means
 * re-running an import creates duplicates rather than upserting, so import
 * into an empty dataset (or clear the affected types first).
 *
 *   node scripts/export-sanity-ndjson.mjs
 *   cd ../studio-dr-geoff-cashion
 *   npx sanity dataset import ../drgeoffcashion/dist-sanity/seed.ndjson production
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { states } from '../src/data/locations.ts';
import { publications } from '../src/data/publications.ts';
import { reviews } from '../src/data/reviews.ts';

const docs = [];

for (const state of states) {
  for (const c of state.clinics) {
    docs.push({
      _type: 'clinic',
      clinic: c.clinic,
      area: c.area,
      state: state.code,
      doctor: c.doctor,
    });
  }
}

for (const p of publications) {
  docs.push({
    _type: 'publication',
    title: p.title,
    authors: p.authors,
    venue: p.venue,
    year: p.year,
    topic: p.topic,
    ...(p.doi ? { doi: p.doi } : {}),
    ...(p.href ? { href: p.href } : {}),
    ...(p.note ? { note: p.note } : {}),
  });
}

for (const r of reviews) {
  docs.push({
    _type: 'review',
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
