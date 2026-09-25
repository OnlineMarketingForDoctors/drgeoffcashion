import {defineField, defineType} from 'sanity'
import {AHPRA_NOTE, heroFields, img, list, lnk, rich, section, stats, str, strings, txt} from './fields'

/*
 * One document type per page, because each page has its own sections. The
 * route and layout live in the Astro app; these hold everything the page
 * says and shows. Each is a fixed document (ID `page-<slug>`), listed under
 * Pages in the Studio, with no create or delete.
 *
 * Each section is a tab. Hero and SEO come first on every page.
 */
const tabs = (...sections: [string, string][]) => [
  {name: 'hero', title: 'Hero', default: true},
  ...sections.map(([name, title]) => ({name, title})),
  {name: 'seo', title: 'SEO'},
]

const preview = {select: {title: 'title', subtitle: 'route'}}

// ------------------------------------------------------------------ home
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: tabs(
    ['volume', 'The case'],
    ['about', 'About'],
    ['why', 'Why refer'],
    ['sequence', "Patient's day"],
    ['watch', 'Video'],
    ['research', 'Research'],
  ),
  fields: [
    ...heroFields({breadcrumb: false}),
    img('heroImageMobile', 'Hero image on phones', 'hero', {
      description: 'A portrait-shaped shot for narrow screens, where the wide one cannot frame him.',
    }),
    lnk('heroPrimary', 'Main button', 'hero'),
    lnk('heroSecondary', 'Second button', 'hero'),
    stats('specs', 'Figures under the hero', 'hero'),
    section('volume', 'The case', [
      img('background', 'Background texture', ''),
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Intro', ''),
      txt('body', 'Body', '', {rows: 4}),
    ]),
    section('about', 'About', [
      img('image', 'Portrait', ''),
      str('caption', 'Caption', '', {description: AHPRA_NOTE}),
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      rich('body', 'Body', ''),
      txt('quote', 'Quote', ''),
      str('quoteCite', 'Quote attribution', '', {description: AHPRA_NOTE}),
    ]),
    section('why', 'Why refer', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      img('image', 'Image', ''),
      list('reasons', 'Reasons', '', [
        {name: 'lead', title: 'Lead'},
        {name: 'body', title: 'Body', type: 'text'},
      ]),
    ]),
    section('sequence', "Patient's day", [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      defineField({
        name: 'steps',
        title: 'Steps',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'sequenceStep',
            fields: [
              defineField({name: 'when', title: 'When', type: 'string', validation: (r) => r.required()}),
              defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
              defineField({name: 'body', title: 'Body', type: 'text', rows: 3, validation: (r) => r.required()}),
              defineField({name: 'image', title: 'Image', type: 'imageWithAlt'}),
            ],
            preview: {select: {title: 'title', subtitle: 'when', media: 'image'}},
          },
        ],
        validation: (r) => r.required().min(1),
      }),
    ]),
    section('watch', 'Video', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Intro', ''),
      defineField({
        name: 'video',
        title: 'Video (MP4)',
        type: 'file',
        options: {accept: 'video/mp4'},
        validation: (r) => r.required(),
      }),
      img('poster', 'Poster image', '', {description: 'Shown before the video plays.'}),
    ]),
    section('research', 'Research', [
      img('image', 'Image', ''),
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Intro', ''),
    ]),
  ],
  preview,
})

// ----------------------------------------------------------------- about
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  groups: tabs(
    ['lead', 'Introduction'],
    ['scale', 'The practice'],
    ['rural', 'Rockhampton'],
    ['access', 'Access'],
    ['quals', 'Qualifications'],
    ['teaching', 'Thought leadership'],
    ['quote', 'Quote'],
  ),
  fields: [
    ...heroFields(),
    section('lead', 'Introduction', [
      rich('statement', 'Statement', ''),
      defineField({
        name: 'columns',
        title: 'Columns',
        type: 'array',
        of: [{type: 'text', rows: 5}],
        validation: (r) => r.required().min(1).max(2),
      }),
    ]),
    section('scale', 'The practice', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      stats('stats', 'Figures', ''),
    ]),
    section('rural', 'Rockhampton', [
      img('image', 'Background image', ''),
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Text', '', {rows: 4}),
    ]),
    section('access', 'Access', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      rich('body', 'Body', ''),
      img('image', 'Image', ''),
    ]),
    section('quals', 'Qualifications', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Intro', ''),
      img('image', 'Image', ''),
      str('registration', 'Registration line', '', {description: AHPRA_NOTE}),
      list(
        'items',
        'Qualifications',
        '',
        [
          {name: 'year', title: 'Year', type: 'number'},
          {name: 'award', title: 'Award'},
          {name: 'institution', title: 'Institution'},
        ],
        {preview: ['award', 'institution']},
      ),
    ]),
    section('teaching', 'Thought leadership', [
      img('image', 'Image', ''),
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Text', '', {rows: 4}),
      lnk('link', 'Link', ''),
    ]),
    section('quote', 'Quote', [
      img('image', 'Portrait', ''),
      txt('quote', 'Quote', ''),
      str('cite', 'Attribution', '', {description: `${AHPRA_NOTE} (on its own line)`}),
    ]),
  ],
  preview,
})

// ------------------------------------------------------------- vasectomy
export const vasectomyPage = defineType({
  name: 'vasectomyPage',
  title: 'Procedure page',
  type: 'document',
  groups: tabs(
    ['facts', 'Key facts'],
    ['what', 'What it is'],
    ['compare', 'Comparison'],
    ['technique', 'Technique'],
    ['appointment', 'Appointment'],
    ['effectiveness', 'Effectiveness'],
    ['recovery', 'Recovery'],
    ['risks', 'Risks'],
    ['unchanged', 'FAQ'],
    ['cost', 'Cost'],
    ['permanence', 'Permanence'],
    ['locations', 'Locations'],
  ),
  fields: [
    ...heroFields(),
    section('facts', 'Key facts', [
      str('registration', 'Registration line', '', {description: AHPRA_NOTE}),
      stats('items', 'Facts', ''),
    ]),
    section('what', 'What it is', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      rich('body', 'Body', ''),
      img('image', 'Image', ''),
      str('caption', 'Caption', '', {required: false}),
    ]),
    section('compare', 'Comparison', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      str('oldLabel', 'Left column title', ''),
      strings('oldItems', 'Left column points', ''),
      str('newLabel', 'Right column title', ''),
      strings('newItems', 'Right column points', ''),
      txt('footnote', 'Footnote', ''),
    ]),
    section('technique', 'Technique', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Intro', ''),
      list(
        'steps',
        'Diagram steps',
        '',
        [
          {name: 'title', title: 'Title'},
          {name: 'body', title: 'Body', type: 'text'},
        ],
        {min: 3, max: 3, description: 'Exactly three: they match the three stages of the diagram.'},
      ),
    ]),
    section('appointment', 'Appointment', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('intro', 'Intro', ''),
      list(
        'steps',
        'Steps',
        '',
        [
          {name: 'at', title: 'When'},
          {name: 'title', title: 'Title'},
          {name: 'body', title: 'Body', type: 'text'},
        ],
        {preview: ['title', 'at']},
      ),
    ]),
    section('effectiveness', 'Effectiveness', [
      img('image', 'Image', ''),
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      rich('body', 'Body', ''),
      txt('flag', 'Highlighted note', ''),
    ]),
    section('recovery', 'Recovery', [
      img('image', 'Background image', ''),
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      list('items', 'Timeline', '', [
        {name: 'when', title: 'When'},
        {name: 'what', title: 'What happens'},
      ]),
    ]),
    section('risks', 'Risks', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Intro', ''),
      img('image', 'Image', ''),
      list(
        'items',
        'Risks',
        '',
        [
          {name: 'name', title: 'Name'},
          {name: 'rate', title: 'How often'},
          {name: 'body', title: 'Body', type: 'text'},
        ],
        {preview: ['name', 'rate']},
      ),
    ]),
    section('unchanged', 'FAQ', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Intro', ''),
      list(
        'items',
        'Questions',
        '',
        [
          {name: 'q', title: 'Question'},
          {name: 'a', title: 'Answer', type: 'text'},
        ],
        {description: 'Also published as FAQ structured data for search engines.'},
      ),
    ]),
    section('cost', 'Cost', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      rich('body', 'Body', ''),
      list(
        'bars',
        'Cost comparison',
        '',
        [
          {name: 'label', title: 'Label'},
          {name: 'value', title: 'Shown as', type: 'string'},
          {name: 'amount', title: 'Amount in dollars (sets the bar length)', type: 'number'},
        ],
        {preview: ['label', 'value'], min: 2, max: 2, description: 'The first bar is highlighted. Bars are drawn to scale.'},
      ),
      img('image', 'Image', ''),
    ]),
    section('permanence', 'Permanence', [
      img('background', 'Background texture', ''),
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Intro', ''),
      txt('note', 'Note', ''),
    ]),
    section('locations', 'Locations', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Intro', ''),
    ]),
  ],
  preview,
})

// -------------------------------------------------------------- research
export const researchPage = defineType({
  name: 'researchPage',
  title: 'Research page',
  type: 'document',
  groups: tabs(['intro', 'Introduction'], ['publications', 'Publications'], ['conferences', 'Conferences']),
  fields: [
    ...heroFields(),
    section('intro', 'Introduction', [txt('statement', 'Statement', ''), rich('note', 'Note', '')]),
    section('publications', 'Publications', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      str('author', 'Author line', '', {description: AHPRA_NOTE}),
      defineField({
        name: 'items',
        title: 'Publications',
        description: 'Shown newest first on the site, whatever the order here.',
        type: 'array',
        of: [{type: 'publication'}],
        validation: (r) => r.required().min(1),
      }),
    ]),
    section('conferences', 'Conferences', [
      img('image', 'Background image', ''),
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Text', '', {rows: 4}),
    ]),
  ],
  preview,
})

// --------------------------------------------------------------- contact
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  groups: tabs(['direct', 'Direct'], ['ask', 'Question form'], ['where', 'Clinics']),
  fields: [
    ...heroFields(),
    section('direct', 'Direct', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Intro', ''),
      str('emailNote', 'Note under the email address', ''),
      str('socialLabel', 'Facebook link text', ''),
      str('socialNote', 'Note under the Facebook link', ''),
    ]),
    section('ask', 'Question form', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('lede', 'Intro', ''),
      rich('aside', 'Note for patients', ''),
    ]),
    section('where', 'Clinics', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', '', {description: '{count} is replaced with the number of clinics.'}),
      txt('lede', 'Intro', ''),
      lnk('button', 'Button', ''),
    ]),
  ],
  preview,
})

// ----------------------------------------------------------------- refer
export const referPage = defineType({
  name: 'referPage',
  title: 'Refer page',
  type: 'document',
  groups: tabs(['aside', 'Beside the form']),
  fields: [
    ...heroFields(),
    section('aside', 'Beside the form', [
      str('eyebrow', 'Eyebrow', ''),
      str('heading', 'Heading', ''),
      txt('note', 'Note', ''),
      str('altLabel', 'Label above the phone and email', ''),
    ]),
  ],
  preview,
})

/** The pages with their own type, by slug. The rest use `page`. */
export const PAGE_TYPES = ['homePage', 'aboutPage', 'vasectomyPage', 'researchPage', 'contactPage', 'referPage', 'page']
