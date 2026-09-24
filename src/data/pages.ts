/**
 * Seed data only: the site renders these from the Page documents in Sanity
 * (see src/sanity/queries.ts), and `npm run sanity:seed` exports them from
 * here. Edit the live text in the Studio, not in this file.
 *
 * `slug` fixes the document ID (`page-<slug>`) that each route loads.
 */
export interface PageContent {
  slug: string;
  title: string;
  route: string;
  eyebrow: string;
  heading: string;
  headingEmphasis?: string;
  lede?: string;
  breadcrumb?: string;
  metaTitle: string;
  metaDescription: string;
}

export const pages: PageContent[] = [
  {
    slug: "home",
    title: "Home",
    route: "/",
    eyebrow: "For referring GPs",
    heading: "Refer him to the doctor who does this",
    headingEmphasis: "3,500 times a year.",
    lede: "Dr Geoff Cashion is a Specialist GP and the founder of Vasectomy Australia, the country's largest provider of no-scalpel vasectomy.",
    metaTitle: "Dr Geoff Cashion — No-scalpel vasectomy referrals for Australian GPs",
    metaDescription:
      "Dr Geoff Cashion performs more no-scalpel vasectomies than any other doctor in Australia. Referral information for general practitioners.",
  },
  {
    slug: "about",
    title: "About",
    route: "/about",
    eyebrow: "About",
    heading: "The doctor at the end of your referral.",
    lede: "Founder of Vasectomy Australia, and the busiest vasectomist in the country.",
    breadcrumb: "About",
    metaTitle: "About Dr Geoff Cashion — Australia's leading vasectomist",
    metaDescription:
      "Dr Geoff Cashion is the founder of Vasectomy Australia and performs more no-scalpel vasectomies than any other doctor in the country. Background, training and qualifications.",
  },
  {
    slug: "vasectomy",
    title: "The procedure",
    route: "/vasectomy",
    eyebrow: "The procedure",
    heading: "No scalpel, one opening, no stitches.",
    lede: "What actually happens, how well it works, what can go wrong, and what it costs — written for the person doing the referring.",
    breadcrumb: "Vasectomy",
    metaTitle: "No-scalpel vasectomy explained — technique, recovery, risks and cost",
    metaDescription:
      "A detailed account of no-scalpel vasectomy for referring GPs: the technique, the appointment, effectiveness and clearance testing, risks, recovery, cost, and clinic locations across Australia.",
  },
  {
    slug: "research",
    title: "Research",
    route: "/research",
    eyebrow: "Research and publications",
    heading: "Volume is only useful if somebody is checking it.",
    lede: "Published work on vasectomy technique, complications and Australian trends — plus earlier research in procedural sedation.",
    breadcrumb: "Research",
    metaTitle: "Research and publications — Dr Geoff Cashion",
    metaDescription:
      "Peer-reviewed publications and conference presentations by Dr Geoff Cashion on no-scalpel vasectomy technique, complications, Australian vasectomy trends and procedural sedation.",
  },
  {
    slug: "contact",
    title: "Contact",
    route: "/contact",
    eyebrow: "Contact",
    heading: "Ask about a patient.",
    lede: "Questions about suitability, timing or a specific case go straight to the rooms. Dr Cashion answers clinical questions himself.",
    breadcrumb: "Contact",
    metaTitle: "Contact Dr Geoff Cashion — questions about a patient",
    metaDescription:
      "Contact Dr Geoff Cashion's rooms about a patient referral for no-scalpel vasectomy. Phone 1800 SNIPME, email, or send a question directly.",
  },
  {
    slug: "refer",
    title: "Refer a patient",
    route: "/refer",
    eyebrow: "Refer a patient",
    heading: "Send us your patient.",
    lede: "Dr Cashion has performed over 25,000 vasectomies and aims to provide the highest level of clinical care to your patient.",
    breadcrumb: "Refer a patient",
    metaTitle: "Refer a patient — Dr Geoff Cashion",
    metaDescription:
      "Refer a patient to Dr Geoff Cashion for a no-scalpel vasectomy. Send the patient's details and your own, and the rooms will take it from there.",
  },
  {
    slug: "thank-you-refer",
    title: "Thank you — referral",
    route: "/thank-you-refer/",
    eyebrow: "Referral received",
    heading: "Thank you for the referral.",
    lede: "The rooms will take it from there and contact your patient to arrange an appointment. The outcome comes back to you once he has been seen.",
    breadcrumb: "Thank you",
    metaTitle: "Referral received — Dr Geoff Cashion",
    metaDescription: "Your referral to Dr Geoff Cashion has been received. The rooms will contact your patient to arrange an appointment.",
  },
  {
    slug: "thank-you-contact",
    title: "Thank you — contact",
    route: "/thank-you-contact/",
    eyebrow: "Question received",
    heading: "Thanks — we'll be in touch.",
    lede: "Dr Cashion will get back to you about your patient as soon as possible.",
    breadcrumb: "Thank you",
    metaTitle: "Question received — Dr Geoff Cashion",
    metaDescription: "Your question has been sent to Dr Geoff Cashion's rooms. Dr Cashion will get back to you as soon as possible.",
  },
  {
    slug: "sitemap",
    title: "Sitemap",
    route: "/sitemap/",
    eyebrow: "Sitemap",
    heading: "Every page on the site.",
    breadcrumb: "Sitemap",
    metaTitle: "Sitemap — Dr Geoff Cashion",
    metaDescription: "A list of every page on Dr Geoff Cashion's site for referring GPs.",
  },
];
