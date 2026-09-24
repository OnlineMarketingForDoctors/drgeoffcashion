import {defineField, defineType} from 'sanity'

/**
 * Editable text for a page whose route and layout live in the Astro app.
 * The set is fixed (one document per route, IDs `page-<slug>`); the Studio
 * structure lists them and does not offer create or delete.
 */
export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page name',
      type: 'string',
      description: 'For the Studio list only.',
      readOnly: true,
    }),
    defineField({
      name: 'route',
      title: 'Route',
      type: 'string',
      readOnly: true,
    }),

    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headingEmphasis',
      title: 'Heading emphasis',
      type: 'string',
      group: 'hero',
      description: 'Optional ending of the heading, set in the accent style.',
    }),
    defineField({
      name: 'lede',
      title: 'Intro',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'breadcrumb',
      title: 'Breadcrumb label',
      type: 'string',
      group: 'hero',
      hidden: ({document}) => document?.route === '/',
    }),

    defineField({
      name: 'metaTitle',
      title: 'Browser title',
      type: 'string',
      group: 'seo',
      validation: (rule) => rule.required().max(70).warning('Search results cut off around 60–70 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.required().max(200).warning('Search results cut off around 155–160 characters'),
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'route'}},
})
