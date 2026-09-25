import {clinic} from './clinic'
import {link} from './link'
import {imageWithAlt, richText, stat} from './objects'
import {page} from './page'
import {aboutPage, contactPage, homePage, referPage, researchPage, vasectomyPage} from './pages'
import {publication} from './publication'
import {review} from './review'
import {siteSettings} from './siteSettings'

export const schemaTypes = [
  siteSettings,
  homePage,
  aboutPage,
  vasectomyPage,
  researchPage,
  contactPage,
  referPage,
  page,
  link,
  imageWithAlt,
  richText,
  stat,
  clinic,
  publication,
  review,
]
