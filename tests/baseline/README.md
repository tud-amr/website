# Baseline of the Jekyll site

A record of what the old Jekyll site produces and how it behaves, so the Eleventy port can be checked against it.
Recorded on 2026-10-13 from `main` at commit `65f2cb6`.

| File | What it holds |
| --- | --- |
| `files.txt` | Every file in the built site (736). Each one must still exist after the port. |
| `metrics.json` | Per page and width (390 / 768 / 1280 px): bytes received, request count, whether the page scrolls sideways, and the elements that overflow at 390 px. Also lists the redirect pages. |
| `text/` | The text of each page at 1280 px, for checking that no content is lost in the port. |
| `known-issues.md` | Bugs and problems found in the review, with the phase that fixes each one. |
| `screenshots/` | Full-page screenshots at each width. **Not committed** (too large); regenerate them with the script below. |

## Headline numbers

- 71 pages and 7 redirect pages; all return 200.
- 477 MB in total to load every page once at desktop width.
- Heaviest pages at desktop width: `/projects/trilogy` 28.3 MB, `/publications/` 26.2 MB, `/paper_websites/aerial-manipulation-marl` 20.3 MB (26.0 MB on phones), `/robots/` 18.7 MB, `/paper_websites/sadcher_MRTA/` 17.9 MB, `/research/` 17.7 MB.
- 8 pages scroll sideways at 390 px (see `known-issues.md`).

## Regenerating

Needs only Docker. From the repo root, on a checkout of commit `65f2cb6`:

```bash
scripts/baseline/run.sh
```

This builds the site with Ruby 3.1 (Jekyll 3.9 does not run on Ruby 3.3, and the repo's own `docker compose up` currently fails), serves it the way GitHub Pages does, and crawls every page in Chromium (Playwright 1.48.0).

How the numbers are measured:

- Bytes are what the browser received from page start until the `load` event plus 2 seconds, without scrolling. Autoplaying videos keep downloading after that, so real totals are higher.
- The local server does not compress responses, while GitHub Pages compresses HTML, CSS and JS. The difference is small next to images and video.
- External resources (Google Fonts, jsDelivr, YouTube) are loaded as on the live site. Analytics requests are blocked.

## URL rules the port must keep

- **Collection pages end in `.html`**, for example `/projects/harmony.html` and `/paper_websites/codi.html`. GitHub Pages also serves them without the extension (`/projects/harmony`), and that is the form the site links to. Both must keep working, so the new build must output the same `.html` files.
- **Top-level pages are folders**: `/publications/`, `/research/`, `/people/` and so on.
- **Seven old paths are redirect pages** (made with `redirect_from`), for example `/education_projects.html` → `/education/` and `/workshops/` → `/events/`. They are listed with their targets under `redirects` in `metrics.json`, and must keep redirecting.
- **`/assets/...` paths stay exactly the same.** PDFs and images are linked from papers, slides and other websites.
- **Old filter links keep working:**
  - `/publications/#<search text>#<year>`, for example `/publications/#alonso-mora#2024` (the year part is optional);
  - `/research/#<area id>`, for example `/research/#flying-robots`.
