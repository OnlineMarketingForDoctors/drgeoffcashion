/**
 * GROQ queries for the three content types held in Sanity, and loaders that
 * return the shapes the pages render.
 *
 * The site is static, so these run at build time only: an edit published in
 * the Studio reaches the site when Vercel next builds. If the Content Lake
 * can't be reached the build fails rather than shipping stale content.
 */
import { sanityClient } from "sanity:client";
import { defineQuery } from "groq";
import type { Doctor, StateGroup } from "../data/locations";
import type { Publication } from "../data/publications";
import type { Review } from "../data/reviews";
import type { PageContent } from "../data/pages";
import type { SiteSettings } from "../data/siteSettings";

export const CLINICS_QUERY = defineQuery(/* groq */ `
  *[_type == "clinic"] | order(coalesce(order, 9999) asc, area asc) {
    _id,
    area,
    clinic,
    state,
    doctor
  }
`);

export const PUBLICATIONS_QUERY = defineQuery(/* groq */ `
  *[_type == "publication"] | order(year desc, title asc) {
    _id,
    title,
    authors,
    venue,
    year,
    topic,
    doi,
    href,
    note
  }
`);

export const REVIEWS_QUERY = defineQuery(/* groq */ `
  *[_type == "review"] | order(coalesce(order, 9999) asc, _createdAt asc) {
    _id,
    name,
    body,
    rating,
    when,
    reviewCount,
    photoCount,
    localGuide
  }
`);

const LINK = /* groq */ `{ label, href }`;

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0] {
    phoneLabel,
    phoneDigits,
    email,
    facebook,
    parentSite,
    ahpra,
    brandName,
    brandTagline,
    navLinks[] ${LINK},
    headerCta ${LINK},
    footerTagline,
    footerLinks[] ${LINK},
    phoneCaption,
    copyrightHolder,
    credit ${LINK},
    referEyebrow,
    referHeading,
    referBody,
    referButton ${LINK},
    offerEyebrow,
    offerHeading,
    offerBody,
    offerLinkLabel
  }
`);

export const PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == $id][0] {
    eyebrow,
    heading,
    headingEmphasis,
    lede,
    breadcrumb,
    metaTitle,
    metaDescription
  }
`);

// Pages that only make sense after a form submission, plus the sitemap
// itself, are left out of the sitemap page.
export const SITEMAP_PAGES_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && !(_id in path("drafts.**"))
    && !string::startsWith(_id, "page-thank-you")
    && _id != "page-sitemap"] {
    title,
    route,
    metaDescription
  }
`);

/** Display order for states; also the full set the finder knows about. */
const STATE_NAMES: [code: string, name: string][] = [
  ["NSW", "New South Wales"],
  ["VIC", "Victoria"],
  ["QLD", "Queensland"],
  ["WA", "Western Australia"],
  ["SA", "South Australia"],
  ["TAS", "Tasmania"],
];

interface ClinicDoc {
  _id: string;
  area: string | null;
  clinic: string | null;
  state: string | null;
  doctor: Doctor | null;
}

interface PublicationDoc extends Omit<Publication, "doi" | "href" | "note"> {
  _id: string;
  doi: string | null;
  href: string | null;
  note: string | null;
}

interface ReviewDoc {
  _id: string;
  name: string;
  body: string[] | null;
  rating: number | null;
  when: string | null;
  reviewCount: string | null;
  photoCount: string | null;
  localGuide: boolean | null;
}

/**
 * Clinics grouped by state, in the site's state order. Within a state they
 * keep the query's order: the Studio's Order field, then area.
 */
export async function getStates(): Promise<StateGroup[]> {
  const docs = await sanityClient.fetch<ClinicDoc[]>(CLINICS_QUERY);
  return STATE_NAMES.map(([code, name]) => ({
    code,
    name,
    clinics: docs
      .filter((d) => d.state === code && d.area && d.clinic)
      .map((d) => ({
        area: d.area!,
        clinic: d.clinic!,
        doctor: d.doctor ?? "cashion",
      })),
  }));
}

export async function getPublications(): Promise<Publication[]> {
  const docs = await sanityClient.fetch<PublicationDoc[]>(PUBLICATIONS_QUERY);
  return docs.map(({ _id, doi, href, note, ...p }) => ({
    ...p,
    ...(doi ? { doi } : {}),
    ...(href ? { href } : {}),
    ...(note ? { note } : {}),
  }));
}

/**
 * Google's default avatar colours, handed out in turn down the list so
 * neighbouring cards never share one.
 */
const AVATAR_TINTS = [
  "#3d7f8c",
  "#6b5b95",
  "#a5325f",
  "#6d4c41",
  "#1a73e8",
  "#0b8043",
  "#3949ab",
];

export async function getReviews(): Promise<Review[]> {
  const docs = await sanityClient.fetch<ReviewDoc[]>(REVIEWS_QUERY);
  return docs.map((d, i) => ({
    name: d.name,
    initial: d.name.trim().charAt(0).toUpperCase(),
    tint: AVATAR_TINTS[i % AVATAR_TINTS.length],
    reviews: d.reviewCount ?? "",
    ...(d.localGuide ? { localGuide: true } : {}),
    ...(d.photoCount ? { photos: d.photoCount } : {}),
    when: d.when ?? "",
    rating: Math.min(5, Math.max(1, Math.round(d.rating ?? 5))),
    body: d.body ?? [],
  }));
}

export type Site = SiteSettings & { phoneHref: string };

/**
 * Site paths always end in a slash (trailingSlash: 'always'). Editors can
 * type "/about" or "/about/"; both come out as "/about/", with any #hash or
 * ?query kept after it. Full URLs, mailto: and tel: pass through untouched.
 */
export function withSlash(href: string): string {
  const m = href.match(/^(\/[^?#]*)([?#].*)?$/);
  if (!m || href.startsWith("//")) return href;
  return `${m[1].replace(/\/+$/, "")}/` + (m[2] ?? "");
}

const fixLink = <T extends { href: string } | null | undefined>(l: T): T =>
  l ? { ...l, href: withSlash(l.href) } : l;

// Every page renders the header, footer and refer band, so share one fetch
// across the whole build instead of making one per component per page.
let siteSettings: Promise<Site> | undefined;

/** The Site Settings singleton, plus a tel: link built from the digits. */
export function getSiteSettings(): Promise<Site> {
  siteSettings ??= sanityClient
    .fetch<SiteSettings | null>(SITE_SETTINGS_QUERY)
    .then((doc) => {
      if (!doc) throw new Error('Sanity: the "siteSettings" document is missing');
      return {
        ...doc,
        navLinks: (doc.navLinks ?? []).map(fixLink),
        footerLinks: (doc.footerLinks ?? []).map(fixLink),
        headerCta: fixLink(doc.headerCta),
        referButton: fixLink(doc.referButton),
        phoneHref: `tel:${doc.phoneDigits.replace(/[^\d+]/g, "")}`,
      };
    });
  return siteSettings;
}

export type Page = Omit<PageContent, "slug" | "title" | "route">;

/** Hero and meta text for one route, from the document `page-<slug>`. */
export async function getPage(slug: string): Promise<Page> {
  const doc = await sanityClient.fetch<Page | null>(PAGE_QUERY, { id: `page-${slug}` });
  if (!doc) throw new Error(`Sanity: the "page-${slug}" document is missing`);
  return doc;
}

export interface SitemapEntry {
  title: string;
  route: string;
  description: string;
}

/**
 * Pages for the HTML sitemap, in header-menu order: home, the menu links,
 * the header button, then anything else by title.
 */
export async function getSitemapPages(): Promise<SitemapEntry[]> {
  const [docs, site] = await Promise.all([
    sanityClient.fetch<{ title: string | null; route: string | null; metaDescription: string | null }[]>(
      SITEMAP_PAGES_QUERY
    ),
    getSiteSettings(),
  ]);
  const norm = (href: string) => href.replace(/\/+$/, "") || "/";
  const order = ["/", ...site.navLinks.map((l) => l.href), site.headerCta.href].map(norm);
  const rank = (route: string) => {
    const i = order.indexOf(norm(route));
    return i < 0 ? order.length : i;
  };
  return docs
    .filter((d) => d.title && d.route)
    .map((d) => ({ title: d.title!, route: withSlash(d.route!), description: d.metaDescription ?? "" }))
    .sort((a, b) => rank(a.route) - rank(b.route) || a.title.localeCompare(b.title));
}
