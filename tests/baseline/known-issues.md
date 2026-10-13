# Known issues in the Jekyll site (baseline)

Recorded in Phase 0 from the code review and the live-site check (2026-10-13).
Each issue names the phase that fixes it and the check that will keep it fixed.
Measured weights and phone-width overflow per page are in `metrics.json`.

## Build and tooling

| Issue | Where | Fixed in | Check |
| --- | --- | --- | --- |
| `docker compose up` fails: `Gemfile.lock` targets glibc Linux since 2026-09-07, but `jekyll/jekyll` is an Alpine (musl) image | `Dockerfile`, `Gemfile.lock` | Phase 1 | CI builds the Docker setup |
| Jekyll 3.9.3 (via `github-pages` 228) does not run on Ruby 3.3 | `Gemfile` | Phase 1 | replaced by Eleventy |
| No GitHub Actions workflow; `CLAUDE.md` says there is one | `.github/` | Phase 1 | CI on every PR |
| Published site is 1.1 GB, above the 1 GB GitHub Pages limit | whole repo | Phase 5 | CI reports output size |

## Content and data

| Issue | Where | Fixed in | Check |
| --- | --- | --- | --- |
| Not valid JSON: 6 trailing commas and tab characters; only works because Jekyll parses it as YAML | `_data/publications.json` | Phase 2 | schema |
| Publications point at project IDs that do not exist (`saraypapers`, `explicit-representations`, `harmonia`, `nwo`, `horizon`, `nsf china`, `didi udian`, `ams`, `ams institute`, `none`) | `_data/publications.json` | Phase 2 | schema: IDs must exist |
| `belongs_to_projects` is sometimes a string instead of a list | `_data/publications.json` | Phase 2 | schema |
| Patents hardcoded in the page | `publications.html` | Phase 2 | data file |
| Default Jekyll welcome post is published at `/2023/12/19/welcome-to-jekyll/` | `_posts/` | Phase 2 | URL list review |
| MSc template page is published at `/msc_projects_finished/msc-project-template.html` | `_msc_projects_finished/` | Phase 2 | decide: keep or hide |
| `README.md` is published as a page at `/readme/` | `README.md` | Phase 7 | decide: keep or drop |
| Duplicate PDF under two names (`19-schwarting-pna-si.pdf`, `19-schwarting-pnas-si.pdf`) | `assets/files/publications/` | Phase 5 | keep both URLs working |
| 64 MB encoder log committed and published | `assets/images/papers/codi/ffmpeg2pass-0.log.mbtree` | Phase 5 | output size |

## Templates and logic

| Issue | Where | Fixed in | Check |
| --- | --- | --- | --- |
| Related publications sorted by `year`, a field that does not exist | `_layouts/project.html` | Phase 3 | e2e: order by date |
| Finished projects: the second `sort` undoes the first (existing TODO) | `research.html` | Phase 3 | e2e: order by end date |
| Unused code: `custom.js` (from the Academic theme), `project_new.html` layout, Bootstrap source maps | `assets/js/`, `_layouts/`, `assets/` | Phase 2 | — |
| MathJax and KaTeX both used, depending on the collection | `_layouts/base.html` | Phase 5 | — |

## Search and filters

| Issue | Where | Fixed in | Check |
| --- | --- | --- | --- |
| Search runs only on Enter or the button, never while typing | `publications.html` | Phase 4 | e2e |
| Search ignores abstracts; no filter by type, project or collection | `publications.html` | Phase 4 | e2e |
| Links use a fragile `#query#year` format | `publications.html` | Phase 4 | e2e: old links still filter |
| Research filter uses `#area` | `research.html` | Phase 4 | e2e: old links still filter |

## Phone layout (390 px)

| Issue | Where | Fixed in | Check |
| --- | --- | --- | --- |
The baseline crawl found 8 pages that scroll sideways at 390 px:

| Issue | Where | Fixed in | Check |
| --- | --- | --- | --- |
| Link button row does not wrap | `/publications/`, `/projects/drones-emergency`, `/projects/ridepooling` | Phase 4 | no sideways scroll at 390 px |
| Wide equations overflow | `/paper_websites/pumafabrics-details` | Phase 4 | same |
| 453 px table overflows | `/paper_websites/pumafabrics` | Phase 4 | same |
| 640 px video overflows | `/vacancies/` | Phase 4 | same |
| Long links and the footer overflow | `/workshops/2025-iros` | Phase 4 | same |
| Image overflows | `/workshops/2026-act-event` | Phase 4 | same |
| 63 fixed pixel widths in content | layouts and content | Phase 4 | same |

The earlier live-site check also flagged `/paper_websites/codi`, `/paper_websites/aerial-manipulation-marl` and `/projects/veni`. These depend on timing (fonts and equations still loading), so the Phase 4 test runs after the page has settled.

## Pages outside the normal layout

| Issue | Where | Fixed in | Check |
| --- | --- | --- | --- |
| Page is only a PDF iframe: no `<html>`, `<head>`, title or phone viewport tag; phones show the PDF badly or not at all | `/workshops/2026-inaugural-speech-demos` | Phase 3 | render inside the site layout with a download link |
| Workshop pages are standalone HTML with their own styles | `_workshops/` | Phase 3 | screenshot comparison |

## Weight and loading

| Issue | Where | Fixed in | Check |
| --- | --- | --- | --- |
| Publications page loads about 25 MB of thumbnails; the largest is a 4.7 MB PNG shown 85 px tall | `publications.html` | Phase 5 | Lighthouse budget |
| Thumbnails hidden on phones are still downloaded | `_includes/publication_item.html` | Phase 5 | weight at 390 px |
| Only 2 of 206 images lazy-load; none set width and height | everywhere | Phase 5 | Lighthouse |
| Homepage cover image is lazy-loaded although it is the first thing on screen | `index.html` | Phase 5 | Lighthouse |
| 135 of 137 videos autoplay, 4 set `preload` | content | Phase 5 | weight |
| 50 YouTube iframes load immediately | content | Phase 5 | weight |
| Unminified 280 KB `bootstrap.css`, 80 KB JS bundle, about 1 MB of source maps | `assets/` | Phase 4 | weight |
| Three Google Font families in every weight, loaded from Google | `_layouts/base.html` | Phase 5 | self-hosted |

## Privacy

| Issue | Where | Fixed in | Check |
| --- | --- | --- | --- |
| Google Analytics without a consent banner | `_includes/google-analytics.html` | Phase 8 | GoatCounter |
| Fonts and icons loaded from Google and jsDelivr | `_layouts/base.html` | Phase 5 | self-hosted |
| YouTube embeds use the cookie-setting domain | content | Phase 5 | `youtube-nocookie` |
