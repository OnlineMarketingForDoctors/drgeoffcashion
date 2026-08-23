# drgeoffcashion

Deployed on Vercel from this repository.

## Search engine indexing: OFF (temporary)

This site must not be indexed by search engines **for now**. It is expected to
become indexable at launch, so the noindex must be built as a single switch, not
sprinkled across the codebase.

### The switch

Two controls, both currently explicit. When the site gains a framework, both
must be driven from a single `NOINDEX` constant so launch is a one-line change.

| Control | Lives in | Covers |
| --- | --- | --- |
| `X-Robots-Tag: noindex, nofollow` | `vercel.json` (`headers`, source `/(.*)`) | every route and file type |
| `<meta name="robots" content="noindex, nofollow">` | every HTML `<head>` | HTML only, backstop |

The header is framework-agnostic and applies to whatever gets built, including
static assets and error responses. Do not remove or narrow the `vercel.json`
headers block when scaffolding the site.

### Standing rules while the switch is on

- `robots.txt` must **not** blanket-`Disallow: /`. Crawlers have to fetch a page
  to see its noindex directive; blocking them in robots.txt hides the noindex
  and can leave URLs indexed from inbound links, with no description and no
  clean way to remove them. Use robots.txt for crawl hints only.
- No `sitemap.xml`, and no submission to Google Search Console, Bing Webmaster
  Tools, or any other index-submission surface.
- Do not add Search Console site verification while the switch is on.

### Verify before sharing any URL

Check the deployed URL, not the source. Vercel noindexes preview deployments
automatically but does **not** noindex production, so production is the case
that actually matters here:

    curl -sSI https://<production-domain>/ | grep -i x-robots-tag
    curl -sS  https://<production-domain>/ | grep -i 'name="robots"'

Both must be present. If either is missing, the site is not safe to share.

### At launch, when the switch flips off

1. Set `NOINDEX = false` and deploy.
2. Verify the header and meta tag are **gone** from production, using the same
   two commands above.
3. Only then add `sitemap.xml`, Search Console verification, and submit.

Nothing gets indexed automatically on flip — indexing requires submission.
