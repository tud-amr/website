# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Jekyll-based website for the Autonomous Multi-Robot Lab (AMR) at TU Delft, hosted at [autonomousrobots.nl](https://autonomousrobots.nl). Deployed automatically via GitHub Actions on every push to `main` (takes a few minutes to reflect).

## Local Development

Requires Docker and Docker Compose. Run from the repo root:

```bash
docker compose up
```

Serves at `http://localhost:4000` with live-reload. Changes to files (except `_config.yml`) are reflected without restarting.

## Site Architecture

The site uses Jekyll with no theme — all layouts and styling are custom (Bootstrap 5 + SCSS in `assets/css/style.scss`).

**Collections** (defined in `_config.yml`) are the primary content model:

| Directory | Collection | Generates pages? |
|---|---|---|
| `_projects/` | projects | yes |
| `_paper_websites/` | paper_websites | yes |
| `_msc_projects_finished/` | msc_projects_finished | yes |
| `_msc_projects_available/` | msc_projects_available | yes |
| `_workshops/` | workshops | yes |
| `_people/` | people | no (rendered inline) |
| `_news/` | news | no |
| `_robots/` | robots | no |
| `_research_areas/` | research_areas | no |

**Publications** are not a collection — they live in `_data/publications.json` and are rendered via Liquid templates wherever needed.

**Layouts** (`_layouts/`) define page structure. Default for each collection is set in `_config.yml` defaults:
- `_projects/` → `project.html`
- `_paper_websites/` → `paper.html` (with MathJax)
- `_msc_projects_finished/` → `paper_msc.html` (with MathJax)
- `_msc_projects_available/` → `page.html` (with MathJax)

## Adding Content

### Publications (`_data/publications.json`)
Add a JSON object at the top of the array. Key fields:
- `title`, `authors` (array), `date` (YYYY-MM-DD), `type` (journal/conference/workshop/thesis/other), `venue`
- `links`: array of `{"name": url}` objects (e.g., `{"PDF": "/assets/..."}`, `{"web": "https://..."}`)
- `belongs_to_projects`: array of project IDs — links this publication to project pages
- `image` (optional, square recommended), `note` (optional), `abstract`

### Paper Websites (`_paper_websites/`)
Frontmatter fields: `title`, `authors` (with `name`, `url`, `superscript`), `affiliations`, `release_date`, `links` (with `name`, `icon` from Bootstrap Icons, `url`), `related_project_id`. Body is HTML/Markdown mixed. Use `{% include fix_link.html link='...' %}` for local asset paths.

### Projects (`_projects/`)
Key frontmatter: `title`, `project_id` (used by publications to link here), `belongs_to_areas` (array of area IDs), `date`, `description`, `image`, `links`, `fundings`, `people`.

### People (`_people/`)
Key frontmatter: `name`, `title`, `type` (phd-candidate/post-doc/professor/engineer), `joined_date`, `image` (square), `links`. Add `left_date` to move someone to past members.

### Other content types
- **News**: `_news/` — frontmatter: `title`, `date`; body is Markdown
- **MSc available projects**: `_msc_projects_available/` — frontmatter: `title`, `direct_supervisors` (with `name`, optional `url`), `proposal_document` (PDF path or omit to write body), `display` (bool)
- **Research areas**: `_research_areas/` — frontmatter: `title`, `subtitle`, `area_id`
- **Robots**: `_robots/` — frontmatter: `name`, `subtitle`, `type`, `image`, `used_in_projects`

### Linking local assets
Use the `fix_link` include to handle baseurl automatically:
```html
<img src="{% include fix_link.html link='/assets/images/...' %}">
<a href="{% include fix_link.html link='/assets/files/...' %}">
```
Or use Liquid's `relative_url` filter: `{{ '/assets/...' | relative_url }}`.

### Image gallery helper
```md
{% include gallery.html images=image_list n_columns=3 %}
```

## Navigation

Add new pages to `_data/navigation.yml` to include them in the navbar.
