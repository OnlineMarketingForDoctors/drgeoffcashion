/**
 * Builds the page documents (Site Settings image aside) from the seed data in
 * src/data/pages.ts and src/data/pageContent.ts. Shared by the NDJSON seed
 * export and one-off migrations, which differ only in how an image or file
 * becomes a Sanity reference — so both are passed in.
 *
 *   buildPageDocs({ image: (file) => ({...}), file: (file) => ({...}) })
 */
import { pages } from '../src/data/pages.ts';
import { heroImages, offerImage, pageContent, pageTypes } from '../src/data/pageContent.ts';

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;

/** `*em*` and `[text](url)` in a paragraph → Portable Text spans + markDefs. */
function block(text) {
  const children = [];
  const markDefs = [];
  const re = /\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  const span = (t, marks = []) => t && children.push({ _type: 'span', _key: key(), text: t, marks });
  while ((m = re.exec(text))) {
    span(text.slice(last, m.index));
    if (m[1]) span(m[1], ['em']);
    else {
      const k = key();
      markDefs.push({ _type: 'link', _key: k, href: m[3] });
      span(m[2], [k]);
    }
    last = re.lastIndex;
  }
  span(text.slice(last));
  return { _type: 'block', _key: key(), style: 'normal', markDefs, children };
}

/** The schema's member type for an object in the array field `field`. */
function memberType(field, item) {
  if ('figure' in item && 'label' in item) return 'stat';
  if ('href' in item && 'label' in item) return 'link';
  if (field === 'steps' && 'when' in item) return 'sequenceStep';
  return `${field}Item`;
}

/**
 * Converts seed markers, and gives every object in an array a `_key` and the
 * `_type` the schema expects there.
 */
function convert(value, refs, field) {
  if (Array.isArray(value)) {
    return value.map((v) => {
      const out = convert(v, refs, field);
      if (!out || typeof out !== 'object' || Array.isArray(out)) return out;
      return { _key: key(), ...(out._type ? {} : { _type: memberType(field, out) }), ...out };
    });
  }
  if (value && typeof value === 'object') {
    if (value._seed === 'image') {
      const out = { _type: 'imageWithAlt', ...refs.image(value.file), alt: value.alt };
      if (value.focus) {
        out.hotspot = { _type: 'sanity.imageHotspot', x: value.focus[0], y: value.focus[1], width: 1, height: 1 };
      }
      return out;
    }
    if (value._seed === 'file') return { _type: 'file', ...refs.file(value.file) };
    if (value._seed === 'rich') return value.paragraphs.map(block);
    const out = Object.fromEntries(Object.entries(value).map(([k, v]) => [k, convert(v, refs, k)]));
    if ('href' in value && 'label' in value) out._type = 'link';
    return out;
  }
  return value;
}

export function buildPageDocs(refs) {
  keyCounter = 0;
  return pages.map(({ slug, ...p }) =>
    convert(
      {
        _id: `page-${slug}`,
        _type: pageTypes[slug] ?? 'page',
        ...p,
        heroImage: heroImages[slug],
        ...(pageContent[slug] ?? {}),
      },
      refs,
      ''
    )
  );
}

export function buildOfferImage(refs) {
  return convert(offerImage, refs, '');
}
