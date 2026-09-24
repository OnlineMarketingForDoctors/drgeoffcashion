/**
 * /llms.txt — a plain-text guide to the site for language models, in the
 * llmstxt.org format: an H1, a one-line summary in a blockquote, then H2
 * sections of annotated links. Built from Sanity at build time, so it stays
 * in step with the Studio like every other page. Thank-you pages are left
 * out, as on the HTML sitemap.
 */
import type { APIRoute } from "astro";
import {
  getPage,
  getPublications,
  getSiteSettings,
  getSitemapPages,
  getStates,
} from "../sanity/queries";
import { absolute, SITE_NAME } from "../lib/schema";

export const GET: APIRoute = async ({ site }) => {
  const [SITE, home, pages, states, publications] = await Promise.all([
    getSiteSettings(),
    getPage("home"),
    getSitemapPages(),
    getStates(),
    getPublications(),
  ]);
  const url = (path: string) => absolute(path, site);

  const total = states.reduce((n, s) => n + s.clinics.length, 0);
  const cashion = states.reduce(
    (n, s) => n + s.clinics.filter((c) => c.doctor === "cashion").length,
    0
  );

  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${home.metaDescription}`,
    "",
    "This site is written for general practitioners referring patients for no-scalpel vasectomy, " +
      "not for patients booking directly; patients book through Vasectomy Australia. " +
      `Dr Geoffrey Cashion is a Specialist GP, AHPRA registration ${SITE.ahpra}.`,
    "",
    "## Pages",
    "",
    ...pages.map((p) => `- [${p.title}](${url(p.route)}): ${p.description}`),
    "",
    "## Clinics",
    "",
    `- [Clinic locations](${url("/vasectomy/#locations")}): ${total} clinics across ${
      states.filter((s) => s.clinics.length).length
    } states; Dr Cashion operates at ${cashion} of them, other Vasectomy Australia doctors at the rest.`,
    ...states
      .filter((s) => s.clinics.length)
      .map(
        (s) =>
          `- ${s.name} (${s.code}): ${s.clinics
            .map((c) => `${c.area} — ${c.clinic}${c.doctor === "cashion" ? " (Dr Cashion)" : ""}`)
            .join("; ")}`
      ),
    "",
    "## Research",
    "",
    ...publications.map((p) => {
      const cite = `${p.authors} (${p.year}). ${p.venue}. Topic: ${p.topic}.${p.doi ? ` doi:${p.doi}` : ""}`;
      return p.href ? `- [${p.title}](${p.href}): ${cite}` : `- ${p.title}: ${cite}`;
    }),
    "",
    "## Contact",
    "",
    `- Phone: ${SITE.phoneLabel} (${SITE.phoneDigits})`,
    `- Email: ${SITE.email}`,
    `- [Refer a patient](${url("/refer/")}): online referral form`,
    `- [Contact](${url("/contact/")}): questions about a patient`,
    SITE.parentSite ? `- [Vasectomy Australia](${SITE.parentSite}): patient bookings` : "",
    "",
  ];

  return new Response(lines.filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
