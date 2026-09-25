import type {StructureResolver} from 'sanity/structure'
import {PAGE_TYPES} from './schemaTypes/pages'

/** Document types edited as a fixed set rather than created freely. */
export const FIXED_TYPES = new Set(['siteSettings', ...PAGE_TYPES])

/**
 * Types kept in the dataset and schema but out of the Studio: no sidebar
 * entry, nothing to create. Reviews are here because no page shows them;
 * to bring them back, delete 'review' from this set and restore
 * S.documentTypeListItem('review').title('Reviews') in the list below.
 */
export const HIDDEN_TYPES = new Set(['review'])

/** The pages, in the order the Pages list shows them. IDs are `page-<slug>`. */
const PAGES: [slug: string, title: string][] = [
  ['home', 'Home'],
  ['about', 'About'],
  ['vasectomy', 'The procedure'],
  ['research', 'Research'],
  ['contact', 'Contact'],
  ['refer', 'Refer a patient'],
  ['thank-you-refer', 'Thank you — referral'],
  ['thank-you-contact', 'Thank you — contact'],
  ['sitemap', 'Sitemap'],
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')),
      S.divider(),
      S.listItem()
        .title('Pages')
        .id('pages')
        .child(
          S.list()
            .title('Pages')
            .items(
              PAGES.map(([slug, title]) =>
                S.documentListItem().id(`page-${slug}`).schemaType(typeFor(slug)).title(title),
              ),
            ),
        ),
      S.documentTypeListItem('clinic').title('Clinics'),
    ])

function typeFor(slug: string) {
  const own: Record<string, string> = {
    home: 'homePage',
    about: 'aboutPage',
    vasectomy: 'vasectomyPage',
    research: 'researchPage',
    contact: 'contactPage',
    refer: 'referPage',
  }
  return own[slug] ?? 'page'
}
