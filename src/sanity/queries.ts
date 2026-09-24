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
