import {defineField, defineType} from 'sanity'

/** A label and a site path or full URL, e.g. "/about" or "https://…". */
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link to',
      type: 'string',
      description: 'A path on this site ("/about/", "/vasectomy/#locations") or a full URL. Site paths get their trailing slash added automatically.',
      validation: (rule) =>
        rule.required().custom((value) =>
          !value || /^(\/|#|https?:\/\/|mailto:|tel:)/.test(value)
            ? true
            : 'Start with "/", "#", "https://", "mailto:" or "tel:"',
        ),
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})
