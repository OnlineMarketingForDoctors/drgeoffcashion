# drgeoffcashion

## Search engine indexing: OFF

This site must not be indexed by search engines. This is a hard requirement and
applies to every environment, including production. Treat it as non-negotiable
unless it is explicitly lifted here.

Every page and every deployment must ship all of the following:

1. `X-Robots-Tag: noindex, nofollow` response header on all routes. This is the
   primary control — it covers non-HTML responses (PDFs, images, JSON) that a
   meta tag cannot reach.
2. `<meta name="robots" content="noindex, nofollow">` in the `<head>` of every
   HTML page, as a backstop for anything served without the header.
3. A `robots.txt` that does **not** blanket-`Disallow: /`. Crawlers must be able
   to fetch pages in order to see the noindex directive; blocking them in
   robots.txt hides the noindex and can leave URLs indexed from inbound links.
   Use `robots.txt` for crawl hints only.
4. No `sitemap.xml`, and no submission to Google Search Console, Bing Webmaster
   Tools, or any other index-submission surface.

Do not add analytics/verification tags that register the domain with a search
engine's index (e.g. Search Console site verification) while this rule is in
effect.

### Before shipping

Verify with a real request against the deployed URL, not just the source:

    curl -sSI https://<domain>/ | grep -i x-robots-tag
    curl -sS  https://<domain>/ | grep -i 'name="robots"'

Both must be present. If either is missing, the site is not safe to share.
