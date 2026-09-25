import {defineType} from 'sanity'
import {heroFields} from './fields'

/**
 * A simple page: hero and SEO only. Used by the thank-you pages and the
 * sitemap; the main pages have their own types (see pages.ts). Fixed set,
 * IDs `page-<slug>`, no create or delete.
 */
export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: heroFields(),
  preview: {select: {title: 'title', subtitle: 'route'}},
})
