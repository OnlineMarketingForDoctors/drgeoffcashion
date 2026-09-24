import type {StructureResolver} from 'sanity/structure'

/** Document types edited as a fixed set rather than created freely. */
export const FIXED_TYPES = new Set(['siteSettings', 'page'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Site Settings')),
      S.listItem()
        .title('Pages')
        .id('pages')
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .defaultOrdering([{field: 'route', direction: 'asc'}])
            .initialValueTemplates([]),
        ),
      S.divider(),
      S.documentTypeListItem('clinic').title('Clinics'),
      S.documentTypeListItem('publication').title('Publications'),
      S.documentTypeListItem('review').title('Reviews'),
    ])
