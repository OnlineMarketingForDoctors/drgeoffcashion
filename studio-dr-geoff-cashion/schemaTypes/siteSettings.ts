import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Everything that repeats on every page. A singleton: the Studio structure
 * opens the one document with ID `siteSettings` and offers no way to create
 * another.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'contact', title: 'Contact', default: true},
    {name: 'header', title: 'Header'},
    {name: 'footer', title: 'Footer'},
    {name: 'refer', title: 'Refer band'},
  ],
  fields: [
    // ---------------------------------------------------------------- contact
    defineField({
      name: 'phoneLabel',
      title: 'Phone (word form)',
      type: 'string',
      group: 'contact',
      description: 'Shown large, e.g. "1800 SNIPME".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phoneDigits',
      title: 'Phone (digits)',
      type: 'string',
      group: 'contact',
      description: 'Shown beside the word form, and used for the call link.',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[+\d][\d ]+$/, {name: 'digits and spaces'}),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook page',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'parentSite',
      title: 'Vasectomy Australia website',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'ahpra',
      title: 'AHPRA registration number',
      type: 'string',
      group: 'contact',
      description: 'Shown wherever the practitioner is identified.',
      validation: (rule) => rule.required(),
    }),

    // ----------------------------------------------------------------- header
    defineField({
      name: 'brandName',
      title: 'Brand name',
      type: 'string',
      group: 'header',
      description: 'The wordmark in the header and footer.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'brandTagline',
      title: 'Brand tagline',
      type: 'string',
      group: 'header',
      description: 'Line under the wordmark, shown in capitals and stretched to its width.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'navLinks',
      title: 'Menu links',
      type: 'array',
      group: 'header',
      of: [defineArrayMember({type: 'link'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'headerCta',
      title: 'Header button',
      type: 'link',
      group: 'header',
      validation: (rule) => rule.required(),
    }),

    // ----------------------------------------------------------------- footer
    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'string',
      group: 'footer',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer links',
      type: 'array',
      group: 'footer',
      of: [defineArrayMember({type: 'link'})],
    }),
    defineField({
      name: 'phoneCaption',
      title: 'Footer phone caption',
      type: 'string',
      group: 'footer',
      description: 'Small label above the phone number, e.g. "Rooms".',
    }),
    defineField({
      name: 'copyrightHolder',
      title: 'Copyright holder',
      type: 'string',
      group: 'footer',
      description: 'Shown as "© <year> <holder>. All rights reserved."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'credit',
      title: 'Credit link',
      type: 'link',
      group: 'footer',
      description: 'Shown after "Powered by".',
    }),

    // ------------------------------------------------------------- refer band
    defineField({
      name: 'referEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'refer',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'referHeading',
      title: 'Heading',
      type: 'string',
      group: 'refer',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'referBody',
      title: 'Body',
      type: 'text',
      rows: 3,
      group: 'refer',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'referButton',
      title: 'Button',
      type: 'link',
      group: 'refer',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'offerEyebrow',
      title: 'Offer eyebrow',
      type: 'string',
      group: 'refer',
    }),
    defineField({
      name: 'offerHeading',
      title: 'Offer heading',
      type: 'string',
      group: 'refer',
    }),
    defineField({
      name: 'offerBody',
      title: 'Offer body',
      type: 'text',
      rows: 3,
      group: 'refer',
    }),
    defineField({
      name: 'offerLinkLabel',
      title: 'Offer link label',
      type: 'string',
      group: 'refer',
      description: 'Opens an email to the address under Contact.',
    }),
  ],
  preview: {prepare: () => ({title: 'Site Settings'})},
})
