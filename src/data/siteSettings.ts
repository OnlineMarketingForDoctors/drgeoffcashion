/**
 * Seed data only: the site renders these from the Site Settings document in
 * Sanity (see src/sanity/queries.ts), and `npm run sanity:seed` exports them
 * from here. Edit the live values in the Studio, not in this file.
 */
export interface Link {
  label: string;
  href: string;
}

export interface SiteSettings {
  phoneLabel: string;
  phoneDigits: string;
  email: string;
  facebook: string;
  parentSite: string;
  ahpra: string;
  brandName: string;
  brandTagline: string;
  navLinks: Link[];
  headerCta: Link;
  footerTagline: string;
  footerLinks: Link[];
  phoneCaption: string;
  copyrightHolder: string;
  credit: Link;
  referEyebrow: string;
  referHeading: string;
  referBody: string;
  referButton: Link;
  offerEyebrow: string;
  offerHeading: string;
  offerBody: string;
  offerLinkLabel: string;
}

export const siteSettings: SiteSettings = {
  phoneLabel: "1800 SNIPME",
  phoneDigits: "1800 764 763",
  email: "info@vasectomyaustralia.com.au",
  facebook: "https://www.facebook.com/vasectomyaustralia",
  parentSite: "https://vasectomyaustralia.com.au/",
  ahpra: "MED0001196484",
  brandName: "Geoff Cashion",
  brandTagline: "No-scalpel vasectomy",
  navLinks: [
    { label: "About", href: "/about" },
    { label: "The procedure", href: "/vasectomy" },
    { label: "Research", href: "/research" },
    { label: "Contact", href: "/contact" },
  ],
  headerCta: { label: "Refer a patient", href: "/refer" },
  footerTagline: "Specialist GP · No-scalpel vasectomy",
  footerLinks: [
    { label: "About", href: "/about" },
    { label: "The procedure", href: "/vasectomy" },
    { label: "Clinic locations", href: "/vasectomy#locations" },
    { label: "Research", href: "/research" },
    { label: "Contact", href: "/contact" },
  ],
  phoneCaption: "Rooms",
  copyrightHolder: "Vasectomy Australia",
  credit: { label: "Online Marketing For Doctors", href: "https://onlinemarketingfordoctors.com/" },
  referEyebrow: "Refer a patient",
  referHeading: "Send him our way.",
  referBody:
    "Are you a GP who would like to refer a patient for a vasectomy? Dr Cashion has performed over 25,000 vasectomies and aims to provide the highest level of clinical care to your patient.",
  referButton: { label: "Send a referral", href: "/refer" },
  offerEyebrow: "A thank you for referrers",
  offerHeading: "We'll post you an orchidometer.",
  offerBody:
    "As a thank you to our loyal referrers, tell us where to send one and we will put an orchidometer in the post, along with some other Vasectomy Australia swag.",
  offerLinkLabel: "Claim yours",
};
