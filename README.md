# AMR Lab website

The website of the Autonomous Multi-Robots Lab (AMR) at TU Delft: **https://autonomousrobots.nl**

It is a static site built with [Eleventy](https://www.11ty.dev/) from plain files: YAML for publications,
Markdown or HTML with a short header (front matter) for everything else. Pushing to `main` publishes it
automatically through GitHub Actions; the change is live a few minutes later (see the **Actions** tab).

**Using an AI agent?** [`CLAUDE.md`](CLAUDE.md) has step-by-step instructions written for agents.

- [Preview the site on your computer](#preview-the-site-on-your-computer)
- [Check your change](#check-your-change)
- [Add a publication](#add-a-publication)
- [Add other content](#add-other-content): people, projects, paper websites, news, research areas, robots, MSc projects, events, talks
- [Images, videos and files](#images-videos-and-files)
- [Pages, menu and old URLs](#pages-menu-and-old-urls)
- [How the site is organised](#how-the-site-is-organised)
- [Deployment and analytics](#deployment-and-analytics)

## Preview the site on your computer

You need [Docker](https://docs.docker.com/get-docker/). From the repository folder:

```bash
docker compose up
```

Open http://localhost:8080. The page reloads by itself when you save a file. Stop with `Ctrl+C`.

If you have Node.js 22 or newer installed, `npm install` once and then `npm run dev` does the same without Docker.

## Check your change

Every pull request is checked automatically, and the result shows on the pull request. To run the same
checks on your computer before pushing:

```bash
docker compose run --rm test        # or, with Node installed: npm test
```

This checks, in order:

1. **Content**: every file has the fields it needs, IDs point at things that exist, and local files exist.
   Errors name the file and the problem, e.g. `content/people/x.md: \`joined_date\` is required`.
2. **Build**: the site builds.
3. **URLs**: every page and file the old site had is still there (people link to them from papers and slides).
4. **Links**: every link inside the site works.
5. **Browser tests**: search and filters, menus, no page wider than a phone screen, page weight limits,
   accessibility of the main pages.

To see what a page looks like on a phone, tablet and desktop:

```bash
docker compose run --rm test npm run shots -- /publications/ /people/
```

The screenshots land in `.shots/`. Use `--key` for the main pages, or `--all` for every page.

## Add a publication

Each paper is one file: `content/publications/<year>/<year>-<first author>-<venue>.yaml`,
for example `content/publications/2025/2025-degroot-ijrr.yaml`.

**From BibTeX** (easiest):

```bash
docker compose run --rm test npm run add-pub -- paper.bib --project interact --pdf /assets/files/publications/25-degroot-ijrr.pdf
```

To get BibTeX from a DOI: `curl -LH "Accept: application/x-bibtex" https://doi.org/<doi>`.

**By hand**: copy [`content/publications/_template.yaml`](content/publications/_template.yaml) or any
existing paper, and change the values. Keep every field, even when empty (`[]` or `""`), so all files
look the same.

| Field | What to write |
| --- | --- |
| `title` | The paper title. |
| `authors` | One author per line, as they should appear. |
| `date` | `YYYY-MM-DD`. Only the year is shown; use any day if unsure. The file must be in that year's folder. |
| `type` | `journal`, `conference`, `workshop`, `thesis` or `other`. Sets the J/C/W/T/O number. |
| `venue` | Journal or conference name, without the year. |
| `projects` | IDs of the lab projects the paper belongs to, e.g. `[interact, trilogy]`. These are the `project_id` of a file in `content/projects/`. The paper then shows on that project's page. |
| `collections` | Optional groups of papers that are not projects, e.g. one person's line of work, from `content/_data/paper_collections.yaml`. See [Collections](#collections-groups-of-papers-that-are-not-projects) below. |
| `funding` | Funding sources, as free text, e.g. `[nwo]`. |
| `topics` | Topics, e.g. `[motion planning, multi-robot]`. |
| `image` | Optional picture or `.mp4` shown next to the paper (square works best). |
| `note` | Optional, e.g. `Best Paper Award`. |
| `links` | One per line, `- <button text>: <url>`, e.g. `- pdf: /assets/files/publications/25-degroot-ijrr.pdf`. |
| `abstract` | The abstract. Long text can continue on the next lines after `abstract: >-`. |
| `bibtex` | Optional. When filled in, the paper gets a "cite" button. |

PDFs go in `assets/files/publications/`, named like `25-degroot-ijrr.pdf`.

### Collections: groups of papers that are not projects

A **collection** is a named group of papers that you choose yourself, for example one person's line of
work (`saraypapers`) or a topic that runs across several projects (`explicit-representations`).

- **Projects** are the lab's funded projects. Each has its own page (`content/projects/`), and its
  papers are listed there automatically.
- **Collections** are lighter: they have no page of their own and need no funding or description. Use
  one when you want to group papers that do not share a project.

A collection is used in two places:

1. **A shareable list of papers**: `https://autonomousrobots.nl/publications/?collection=<id>` shows only
   the papers in that collection, e.g. to link from a CV, a talk or a paper website.
2. **Related publications on a paper website**: `related: collections: [<id>]` in the paper website's
   header lists every paper of the collection at the bottom of the page.

To create one, add two lines to `content/_data/paper_collections.yaml`, then put the id in the
`collections:` field of each paper that belongs to it (a paper can be in several collections):

```yaml
my-group-id:
  title: Shown above the list, e.g. "Learning-based motion planning"
```

## Add other content

Copy an existing file in the same folder and change it. The header between the `---` lines holds the
fields; below it goes the text, in Markdown (or HTML).

| What | Folder | Shows up on | Required fields |
| --- | --- | --- | --- |
| Person | `content/people/` | People | `name`, `title`, `type`, `joined_date` |
| Project | `content/projects/` | Research, and its own page `/projects/<file>.html` | `title`, `project_id`, `belongs_to_areas`, `date`, `description`, `image`, `fundings`, `people` |
| Paper website | `content/paper-websites/` | `/paper_websites/<file>.html` | `title`, `authors`, `affiliations`, `release_date`, `links` |
| News | `content/news/` | Home page | `title`, `date` |
| Research area | `content/research-areas/` | Research filter and home page | `title`, `subtitle`, `area_id` |
| Robot | `content/robots/` | Robots | `name`, `subtitle`, `type`, `image`, `used_in_projects` |
| Available MSc project | `content/msc-available/` | Education > MSc projects | `title`, `direct_supervisors`, `display` |
| Finished MSc project | `content/msc-finished/` | Master's thesis projects, and its own page | `title`, `authors`, `affiliations`, `end_date`, `description`, `cover_image` |
| Event or workshop | `content/workshops/` | Events | `title`, `venue`, `location`, `date`, `time` |
| Recorded talk | `content/talks/` | Education | `title`, `date`, `speaker`, `recording` |

Notes per type:

- **People**: `type` is `professor`, `post-doc`, `phd-candidate`, `engineer` or `phd-visitor`. Use a square
  `image`. Add `left_date` when someone leaves: they move to *Past members* (add `now_at` if you like).
- **Projects**: `belongs_to_areas` uses the `area_id` of research areas. Add `end_date` when it ends.
  Publications appear on the project page by listing its `project_id` in their `projects`.
- **Paper websites**: `links` are the buttons under the title (`name`, `url`, optional `icon` from
  [Bootstrap Icons](https://icons.getbootstrap.com/), e.g. `bi-github`; leave out `url` for "coming soon").
  List related papers at the bottom with:
  ```yaml
  related:
    projects: [trilogy]          # all papers of these projects
    collections: [saraypapers]   # all papers in these collections
    papers: [2025-degroot-ijrr]  # these papers (file names without .yaml)
  ```
  Add `hidden: true` to keep a page out of the paper-websites list and search engines.
- **Available MSc projects**: give `proposal_document` (a PDF in `assets/files/student_projects/`) or write
  the proposal below the header. `display: false` hides it from the table.
- **Finished MSc projects**: copy an existing one in `content/msc-finished/`. To send visitors to a paper
  website instead, add `redirect_to: /paper_websites/<name>`.
- **Events**: most workshop pages are complete, standalone HTML documents with their own styles. Add
  `layout: page` to use the normal site layout instead.
- Math works on paper websites and MSc pages (`math: true` turns it on elsewhere): `$x^2$` inline, `$$x^2$$`
  on its own line. Define LaTeX shortcuts for a page in its header:
  ```yaml
  math_macros:
    '\qdot': '\dot{\boldsymbol{q}}'
  ```
  Math is drawn with KaTeX (fast, small). A page that needs numbered equations with `\label`/`\eqref`
  can switch to MathJax with `math_engine: mathjax` in its header (see `pumafabrics-details`).

## Images, videos and files

Put files in `assets/` and link them with a path starting with `/assets/`:

- images: `assets/images/<section>/<name>/`, e.g. `assets/images/papers/codi/`
- PDFs: `assets/files/publications/` or `assets/files/student_projects/`

In Markdown or HTML:

```html
<img src="/assets/images/papers/codi/front-figure.jpg" alt="What the image shows">
<a href="/assets/files/publications/25-degroot-ijrr.pdf">PDF</a>
```

Write paths as they are, starting with `/assets/`. The old `fix_link` include and `relative_url` filter are
no longer needed; the content check points them out if they appear.

What the build does for you:

- **Images** (PNG, JPEG, WebP) get smaller WebP copies in several sizes, and the browser picks the right one.
  Images below the first screen load only when scrolled to. Still, keep originals reasonable: under 2 MB
  and at most about 2000 px wide.
- **Videos** with `autoplay` play only while visible on screen. Keep them short and compressed
  (H.264 MP4, ideally under 5 MB). The repository is already large; every file stays in its history.
- **YouTube** embeds (`<iframe src="https://www.youtube.com/embed/...">`) become a click-to-play preview
  that loads YouTube only when clicked, from the privacy-friendly `youtube-nocookie.com`.

A grid of images: `{% render 'gallery.html', images: image_list, n_columns: 3 %}`, with
`{% assign image_list = "/assets/images/a.jpg,/assets/images/b.mp4" | split: "," %}` before it.

## Pages, menu and old URLs

- Top-level pages are in `content/pages/`. Each has a `permalink` (its URL) in the header.
- The menu is `content/_data/navigation.yaml`.
- Footer links are `content/_data/socials.yaml`; site title and contact are `content/_data/site.yaml`.
- **Never break an old URL**: papers and slides link to them. When moving a page, list its old address
  in the new page's header (`redirect_from: [/old/path.html]`). For an old URL with no page any more,
  add it to `content/_data/redirects.yaml`. The URL check will tell you if something went missing.

## How the site is organised

```
content/                 everything you edit
  publications/<year>/   one YAML file per paper (+ _template.yaml)
  people/ projects/ paper-websites/ news/ research-areas/ robots/
  msc-available/ msc-finished/ workshops/ talks/
  pages/                 home, research, publications, people, ... (their URL is in `permalink`)
  _data/                 site settings, menu, collections, patents, redirects
assets/                  images, videos, PDFs (URLs never change)
src/                     site code: layouts, includes, CSS, JavaScript, build helpers
scripts/                 checks, screenshots, add-pub, migration and baseline tools
tests/                   browser tests (e2e/) and the record of the old site (baseline/)
eleventy.config.js       build configuration
```

The look is one stylesheet, `src/css/site.css`, and one script, `src/js/site.js`; there is no CSS
framework. Paper pages written for the old Bootstrap site keep working: the stylesheet includes the
Bootstrap classes they use.

## Deployment and analytics

`.github/workflows/deploy.yml` builds and publishes `main` to GitHub Pages, and rebuilds daily.
`.github/workflows/ci.yml` checks pull requests; `.github/workflows/links.yml` checks external links
weekly and opens an issue when some are broken.

One-time repository settings (by an admin):

1. **Settings > Pages > Build and deployment > Source: GitHub Actions.** The custom domain
   `autonomousrobots.nl` stays as it is.
2. **Analytics (optional).** The site uses [GoatCounter](https://www.goatcounter.com): no cookies, no
   personal data, so no consent banner is needed. Create a free account, then set
   `goatcounter: <your code>` in `content/_data/site.yaml`.
3. **Metrics page for the lab (optional).** A page with visitor numbers, at a secret address, so people do
   not need a GoatCounter account. In GoatCounter, create an API key that can read statistics. In
   **Settings > Secrets and variables > Actions**, add:
   - variable `GOATCOUNTER_SITE`: your GoatCounter code;
   - secret `GOATCOUNTER_TOKEN`: the API key;
   - secret `STATS_PATH`: a hard-to-guess path, e.g. `stats-7f3k9q2m`.

   After the next deploy, the page is at `https://autonomousrobots.nl/<STATS_PATH>/`, updated daily. It
   is not linked, not in the sitemap and asks search engines not to index it. Anyone with the link can
   see it, so share it only within the lab.
