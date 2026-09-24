/**
 * GROQ queries for the three content types held in Sanity.
 *
 * Nothing on the site reads these yet — the pages still render from
 * src/data/*.ts. They are the migration target: each query returns the shape
 * the corresponding module already exports, so a page can be switched over
 * without touching its markup.
 */
import { sanityClient } from "sanity:client";
import { defineQuery } from "groq";

export const CLINICS_QUERY = defineQuery(/* groq */ `
  *[_type == "clinic"] | order(state asc, area asc) {
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
  *[_type == "review"] | order(_createdAt asc) {
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

export async function getClinics() {
  return await sanityClient.fetch(CLINICS_QUERY);
}

export async function getPublications() {
  return await sanityClient.fetch(PUBLICATIONS_QUERY);
}

export async function getReviews() {
  return await sanityClient.fetch(REVIEWS_QUERY);
}
