import {defineField, defineType} from 'sanity'

export const STATES = [
  {title: 'New South Wales', value: 'NSW'},
  {title: 'Victoria', value: 'VIC'},
  {title: 'Queensland', value: 'QLD'},
  {title: 'Western Australia', value: 'WA'},
  {title: 'South Australia', value: 'SA'},
  {title: 'Tasmania', value: 'TAS'},
]

/** One clinic in the procedure page's list (Locations tab); list order is site order. */
export const clinic = defineType({
  name: 'clinic',
  title: 'Clinic',
  type: 'object',
  fields: [
    defineField({
      name: 'clinic',
      title: 'Clinic name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'area',
      title: 'Area',
      type: 'string',
      description: 'Region shown to referrers, e.g. "Inner West / CBD".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      options: {list: STATES, layout: 'dropdown'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'doctor',
      title: 'Doctor',
      type: 'string',
      description: 'Who the patient will see at this clinic.',
      options: {
        list: [
          {title: 'Dr Geoff Cashion', value: 'cashion'},
          {title: 'Valentine (other Vasectomy Australia doctor)', value: 'valentine'},
        ],
        layout: 'radio',
      },
      initialValue: 'cashion',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'clinic', area: 'area', state: 'state', doctor: 'doctor'},
    prepare: ({title, area, state, doctor}) => ({
      title,
      subtitle: [state, area, doctor].filter(Boolean).join(' · '),
    }),
  },
})
