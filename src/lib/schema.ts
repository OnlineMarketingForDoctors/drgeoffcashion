/**
 * Shared bits for the JSON-LD markup. URLs are absolute against `site` in
 * astro.config.mjs (the launch domain), not whichever host served the build.
 */
export function absolute(path: string, site: URL | undefined): string {
  return new URL(path, site ?? "https://drgeoffcashion.com.au").href;
}

/** The site's name as it appears in structured data and llms.txt. */
export const SITE_NAME = "Dr Geoff Cashion";

export const websiteId = (site: URL | undefined) => `${absolute("/", site)}#website`;
