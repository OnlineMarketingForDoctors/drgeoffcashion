import {defineField, defineType} from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'string',
      description: 'Citation form, left exactly as published, e.g. "Cashion, G."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      description: 'Journal, conference or repository.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'string',
      description: 'Shown as the topic tag; also drives the filter.',
      options: {list: ['Vasectomy', 'Sedation'], layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Bare DOI, without the https://doi.org/ prefix.',
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'yearDesc',
      by: [
        {field: 'year', direction: 'desc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'title', year: 'year', venue: 'venue', topic: 'topic'},
    prepare: ({title, year, venue, topic}) => ({
      title,
      subtitle: [year, venue, topic].filter(Boolean).join(' · '),
    }),
  },
})
