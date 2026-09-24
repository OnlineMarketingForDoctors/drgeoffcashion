import {defineArrayMember, defineField, defineType} from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  description: 'Patient review transcribed from Google.',
  fields: [
    defineField({
      name: 'name',
      title: 'Reviewer name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'One entry per paragraph, as written.',
      of: [defineArrayMember({type: 'text', rows: 4})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {list: [1, 2, 3, 4, 5]},
      initialValue: 5,
      validation: (rule) => rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: 'when',
      title: 'When',
      type: 'string',
      description: 'Google\'s relative date as displayed, e.g. "a year ago".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review count',
      type: 'string',
      description: 'Google\'s display string, e.g. "12 reviews".',
    }),
    defineField({
      name: 'photoCount',
      title: 'Photo count',
      type: 'string',
      description: 'Google\'s display string, e.g. "5 photos".',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Position on the site; lower numbers show first.',
      validation: (rule) => rule.integer(),
    }),
    defineField({
      name: 'localGuide',
      title: 'Local Guide',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Site order',
      name: 'siteOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', rating: 'rating', when: 'when'},
    prepare: ({title, rating, when}) => ({
      title,
      subtitle: [rating && '★'.repeat(rating), when].filter(Boolean).join(' · '),
    }),
  },
})
