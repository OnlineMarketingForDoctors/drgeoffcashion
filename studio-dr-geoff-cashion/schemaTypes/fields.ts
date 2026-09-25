import {defineArrayMember, defineField} from 'sanity'

/*
 * Field builders shared by the page types, so every page edits the same way.
 * `g` is the Studio tab (group) the field sits in.
 */
type Opts = {description?: string; required?: boolean; rows?: number; hidden?: any}

const req = (o: Opts) => (o.required === false ? undefined : (r: any) => r.required())

export const str = (name: string, title: string, g: string, o: Opts = {}) =>
  defineField({name, title, type: 'string', group: g, description: o.description, hidden: o.hidden, validation: req(o)})

export const txt = (name: string, title: string, g: string, o: Opts = {}) =>
  defineField({name, title, type: 'text', rows: o.rows ?? 3, group: g, description: o.description, hidden: o.hidden, validation: req(o)})

export const rich = (name: string, title: string, g: string, o: Opts = {}) =>
  defineField({name, title, type: 'richText', group: g, description: o.description, validation: req(o)})

export const img = (name: string, title: string, g: string, o: Opts = {}) =>
  defineField({name, title, type: 'imageWithAlt', group: g, description: o.description, validation: req(o)})

export const lnk = (name: string, title: string, g: string, o: Opts = {}) =>
  defineField({name, title, type: 'link', group: g, description: o.description, validation: req(o)})

export const strings = (name: string, title: string, g: string, o: Opts = {}) =>
  defineField({name, title, type: 'array', group: g, description: o.description, of: [defineArrayMember({type: 'string'})], validation: req(o)})

export const stats = (name: string, title: string, g: string, o: Opts = {}) =>
  defineField({name, title, type: 'array', group: g, description: o.description, of: [defineArrayMember({type: 'stat'})], validation: req(o)})

/** An array of small objects, each with the given string/text fields. */
export const list = (
  name: string,
  title: string,
  g: string,
  item: {name: string; title: string; type?: 'string' | 'text' | 'number'}[],
  o: Opts & {preview?: [string, string?]; min?: number; max?: number} = {},
) =>
  defineField({
    name,
    title,
    type: 'array',
    group: g,
    description: o.description,
    of: [
      defineArrayMember({
        type: 'object',
        name: `${name}Item`,
        fields: item.map((f) =>
          defineField({name: f.name, title: f.title, type: f.type ?? 'string', validation: (r: any) => r.required()}),
        ),
        preview: {select: {title: o.preview?.[0] ?? item[0].name, subtitle: o.preview?.[1] ?? item[1]?.name}},
      }),
    ],
    validation: (r: any) => {
      let v = r.required()
      if (o.min) v = v.min(o.min)
      if (o.max) v = v.max(o.max)
      return v
    },
  })

/** A section object: its fields render together in one tab. */
export const section = (name: string, title: string, fields: any[]) =>
  defineField({name, title, type: 'object', group: name, options: {collapsible: false}, fields: fields.map((f) => ({...f, group: undefined}))})

/** Hero and SEO fields, identical on every page. */
export const heroFields = (o: {emphasis?: boolean; breadcrumb?: boolean; image?: boolean} = {}) => [
  defineField({name: 'title', title: 'Page name', type: 'string', description: 'For the Studio list only.', readOnly: true}),
  defineField({name: 'route', title: 'Route', type: 'string', readOnly: true}),
  str('eyebrow', 'Eyebrow', 'hero'),
  str('heading', 'Heading', 'hero'),
  str('headingEmphasis', 'Heading emphasis', 'hero', {
    required: false,
    description: 'Optional ending of the heading, set in the accent style.',
  }),
  txt('lede', 'Intro', 'hero', {required: false}),
  ...(o.breadcrumb === false ? [] : [str('breadcrumb', 'Breadcrumb label', 'hero', {required: false})]),
  ...(o.image === false ? [] : [img('heroImage', 'Hero image', 'hero')]),
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
]

export const AHPRA_NOTE = 'The AHPRA number from Site Settings is added after this automatically.'
