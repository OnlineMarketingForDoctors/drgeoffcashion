import {defineArrayMember, defineField, defineType} from 'sanity'

/** An image with required alt text and a focal point (hotspot). */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe what the image shows, for screen readers and search engines.',
      validation: (rule) => rule.required(),
    }),
  ],
  validation: (rule) => rule.required(),
})

/**
 * Paragraphs with italic, bold and links. No headings or lists: the page
 * layout supplies those, so they stay consistent.
 */
export const richText = defineType({
  name: 'richText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Paragraph', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [
          {title: 'Italic', value: 'em'},
          {title: 'Bold', value: 'strong'},
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'Link to',
                type: 'string',
                description: 'A path on this site ("/about/") or a full URL. External links open in a new tab.',
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
      },
    }),
  ],
})

/** A figure and its label, e.g. "25,000+" / "Procedures performed". */
export const stat = defineType({
  name: 'stat',
  title: 'Figure',
  type: 'object',
  fields: [
    defineField({name: 'figure', title: 'Figure', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'figure', subtitle: 'label'}},
})
