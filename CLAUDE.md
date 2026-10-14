# CLAUDE.md

Instructions for AI agents editing the AMR Lab website (https://autonomousrobots.nl). Humans: see README.md.

## What this is

A static site built with Eleventy 3 (Liquid templates, no CSS framework). Lab members add papers,
people, projects and pages; most requests are content edits, not code changes. `main` deploys to
GitHub Pages automatically via `.github/workflows/deploy.yml`.

## Commands

Node may not be installed; everything also runs in Docker. Prefer the Docker form if `node` is missing.

| Task | With Node | With Docker |
| --- | --- | --- |
| Check content only (fast) | `npm run validate` | `docker compose run --rm test npm run validate` |
| Build | `npm run build` | `docker compose run --rm test npm run build` |
| All checks (same as CI) | `npm test` | `docker compose run --rm test` |
| Live preview at :8080 | `npm run dev` | `docker compose up` |
| Screenshots (phone/tablet/desktop) | `npm run shots -- /people/` | `docker compose run --rm test npm run shots -- /people/` |
| New publication from BibTeX | `npm run add-pub -- x.bib --project <id>` | `docker compose run --rm test npm run add-pub -- x.bib` |

`npm test` = validate, build, URL check, internal link check, Playwright tests. Browser tests need
Playwright's Chromium: use the Docker form if `npx playwright` is not set up.

## Before you finish any change

1. Run `npm run validate` after every content edit; fix every error it prints (they name the file and field).
2. Run the full checks (`npm test` or `docker compose run --rm test`). Do not commit with failures.
3. For anything visible, take screenshots of the affected pages (`npm run shots -- <paths>`) and look at
   them at 390 px and 1280 px. Check nothing overflows sideways on the phone width.
4. Tell the user which files you changed and what the checks said.

## Rules

- **Never break an existing URL.** Pages, `/assets/...` files and the old filter links
  (`/publications/#query#year`, `/research/#area`) are linked from papers and slides. Do not rename or move
  files under `assets/` or content files that produce pages. If a page must move, add `redirect_from`
  to it; for a removed page, add an entry to `content/_data/redirects.yaml`. `npm run check:urls`
  compares against `tests/baseline/files.txt`.
- **Publications keep every field**, in the order of `content/publications/_template.yaml`, with empty
  values as `[]` or `""` (never `null`, never omitted). Lab members copy existing files as templates.
- **IDs must exist**: `projects:` uses `project_id` values from `content/projects/`; `collections:` uses
  keys of `content/_data/paper_collections.yaml`; `belongs_to_areas:` uses `area_id` from
  `content/research-areas/`. Funding sources go in `funding:`, not `projects:`.
- **Do not lose metadata.** When cleaning up data, keep values (move them to the right field, or keep a
  YAML comment saying what was there before).
- Local paths start with `/assets/` (leading slash) and are written as they are. Do not use the old Jekyll
  helpers (`{% include fix_link.html %}`, `| relative_url`, `{% include x.html a=b %}`); validation rejects them.
- Math: KaTeX, on by default for paper and MSc pages; page-specific LaTeX shortcuts go in `math_macros`.
  Pages with `\label`/`\eqref` and numbered equations set `math_engine: mathjax`.
- Keep media small: images under ~2 MB, videos ideally under 5 MB. The repo is already >2 GB and the
  published site is around GitHub Pages' 1 GB guideline; say so if a user adds large files.
- Do not edit generated or recorded files: `_site/`, `.cache/`, `tests/baseline/*` (only regenerate the
  baseline on purpose with `scripts/baseline/run.sh`).
- Match the surrounding code style; the CSS is plain CSS in `src/css/site.css`, JS is `src/js/site.js`.
- Colours: use the CSS variables (`var(--text)`, `var(--card)`, ...), never hard-coded colours, so the dark
  theme keeps working. Look at visible changes in both themes (`npm run shots -- <paths> --dark`).
  Author-written areas (paper/project/MSc pages) have class `keep-light` and stay light.

## Recipes

**Add a publication** (most common request)
1. Get BibTeX (from the user, or `curl -LH "Accept: application/x-bibtex" https://doi.org/<doi>`; for arXiv,
   `https://arxiv.org/bibtex/<id>`).
2. `npm run add-pub -- paper.bib --project <project_id> [--collection <id>] [--pdf /assets/files/publications/<yy>-<author>-<venue>.pdf]`
3. Open the new file in `content/publications/<year>/`: fix `type` (journal/conference/workshop/thesis/other, or
   `preprint` while not accepted yet, e.g. arXiv + under review; switch it when accepted),
   `venue` (no year), add `links` (pdf, publisher, arxiv, web, code, video), `topics`, `note`, `image`.
   Copy the PDF into `assets/files/publications/` if the user gave one.
4. `npm run validate`, then the full checks. The paper appears on /publications/ and on each listed project page.

**Add a person**: copy a file in `content/people/` (same `type`), change `name`, `title`, `type`,
`joined_date`, `image` (square, in `assets/images/people/`), `links`; the body is a one-line bio.
**Someone left**: add `left_date: YYYY-MM-DD` (and optionally `now_at:`); do not delete the file.

**Add a project**: copy a file in `content/projects/`; give it a new `project_id` that no other project
uses, and `belongs_to_areas`; the file name becomes the URL `/projects/<file>.html`.

**Add a news item**: `content/news/YYYY-MM-DD-short-title.md` with `title` and `date`; body in Markdown, 1–3
sentences. The newest four show on the home page.

**Add a paper website**: copy a file in `content/paper-websites/`; set `related:` to show related papers.
The file name becomes `/paper_websites/<file>.html`. Content may use the Bootstrap-style classes listed in
section 13 of `src/css/site.css` (`row`, `col-md-6`, `ratio ratio-16x9`, `d-flex`, `img-fluid`, ...).

**Add a collection**: a collection groups papers that do not share a funded project (one person's line of
work, a cross-project topic); it has no page, but gives a shareable list (`/publications/?collection=<id>`)
and can fill a paper website's related publications (`related: collections: [<id>]`). Use `projects:`
instead when a real project page exists. To create one: two lines in `content/_data/paper_collections.yaml`
(`<id>:` and `title:`), then list the id in each paper's `collections:`.

**Add a page**: a file in `content/pages/` with `title` and `permalink: /name/`; add it to
`content/_data/navigation.yaml` if it should be in the menu.

## Where things are

```
content/publications/<year>/*.yaml   papers (data only; loaded by content/_data/publications.js)
content/<type>/*.md|html            people, projects, paper-websites, news, research-areas, robots,
                                    msc-available, msc-finished, workshops, talks
content/<type>/<type>.11tydata.json URL pattern and layout for each folder
content/pages/                      top-level pages
content/_data/                      site.yaml, navigation.yaml, socials.yaml, paper_collections.yaml,
                                    patents.yaml, redirects.yaml, publications.js, stats.js
src/_layouts/, src/_includes/       Liquid templates; reusable pieces via {% render 'x.html', a: b %}
src/css/site.css, src/js/site.js    all styling and behaviour
src/lib/content.mjs                 content schemas and validation (edit when adding a field)
src/lib/images.mjs, media.mjs       responsive images, lazy videos, YouTube previews
eleventy.config.js                  filters, collections, transforms
scripts/                            validate, check-urls, check-links, shots, add-pub, site-size,
                                    fetch-stats, lib/serve.mjs, migrate/, baseline/
tests/e2e/                          Playwright tests; tests/baseline/ is the record of the old site
```

Adding a new front-matter field to a content type means adding it to the schema in
`src/lib/content.mjs`, otherwise validation may reject it (publications reject unknown fields).
