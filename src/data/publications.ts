/**
 * Publications and presentations, transcribed from the old
 * drgeoffcashion.com.au/research page. Citations left exactly as published.
 *
 * Seed data only: the research page renders them from Sanity (see
 * src/sanity/queries.ts), and `npm run sanity:seed` exports them from here.
 * Edit the live content in the Studio, not in this file.
 */

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  /** Shown as the topic tag; also drives the filter. */
  topic: "Vasectomy" | "Sedation";
  doi?: string;
  href?: string;
  note?: string;
}

export const publications: Publication[] = [
  {
    title: "Case Report: Early Onset Infection Following No-Scalpel Vasectomy",
    authors: "Cashion, G.",
    venue: "Zenodo",
    year: 2024,
    topic: "Vasectomy",
    doi: "10.5281/zenodo.11364381",
    href: "https://zenodo.org/records/11364381",
  },
  {
    title: "Trends in Vasectomy Among Young Men in Australia: A Decade of Change (2013–2023)",
    authors: "Cashion, G.",
    venue: "Zenodo",
    year: 2024,
    topic: "Vasectomy",
    doi: "10.5281/zenodo.11065031",
    href: "https://zenodo.org/records/11065031",
  },
  {
    title:
      "Unilateral Absence of Vas Deferens (UAVD) in Vasectomy Patients: An Analysis of Diagnostic Confidence and Post-Vasectomy Semen Analysis Outcomes",
    authors: "Cashion, G.",
    venue: "The Internet Journal of Urology, Vol 16 No 1",
    year: 2024,
    topic: "Vasectomy",
    href: "https://ispub.com/IJU/16/1/57006",
  },
  {
    title:
      "What Is The TCI Dose Required When Using Propofol For Conscious Sedation During Dental Procedures? A Retrospective Study",
    authors: "Cashion, G., Treston, G.",
    venue: "The Internet Journal of Anesthesiology, Vol 34 No 1",
    year: 2014,
    topic: "Sedation",
    href: "https://ispub.com/IJA/34/1/21020",
  },
  {
    title:
      "What is the nature of the emergence phenomenon when using intravenous or intramuscular ketamine for paediatric procedural sedation?",
    authors: "Treston, G., Bell, A., Carwell, R., Fincher, G., Chand, D., Cashion, G.",
    venue: "Emergency Medicine Australasia 21, 315–322",
    year: 2009,
    topic: "Sedation",
    href: "https://onlinelibrary.wiley.com/doi/10.1111/j.1742-6723.2009.01203.x",
  },
  {
    title:
      "Post-discharge adverse events after Emergency Department procedural sedation with titrated intravenous propofol",
    authors: "Cashion, G., Treston, G., Bell, A.",
    venue: "Scientific Assembly of the ACEM",
    year: 2007,
    topic: "Sedation",
    note: "Presented November 2007. Currently being updated in preparation for publication.",
  },
];
