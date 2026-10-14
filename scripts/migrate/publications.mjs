// Splits the old _data/publications.json into one YAML file per paper (Phase 2 of the Eleventy port).
//
//   node scripts/migrate/publications.mjs [path/to/publications.json]
//
// The JSON file was removed in the port. To re-run after new papers were added on main:
//   git show main:_data/publications.json > /tmp/publications.json
//   node scripts/migrate/publications.mjs /tmp/publications.json
//
// Rules agreed with the lab (2026-10-13):
//   - `belongs_to_projects` is split: real project IDs -> `projects`, informal groups -> `collections`,
//     funding sources -> `funding`. Nothing is dropped except the placeholder `none`.
//   - `harmonia` is assumed to be a typo for the `harmony` project; the file keeps a comment saying so.
//   - Every file lists every field, with empty values written as [] or "".
// Writes content/publications/<year>/<id>.yaml and scripts/migrate/publications-report.md.
// Safe to re-run: it rewrites the generated files from the JSON.

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import matter from 'gray-matter';

const SRC = process.argv[2] || '_data/publications.json';
const OUT = 'content/publications';
const REPORT = 'scripts/migrate/publications-report.md';

const COLLECTIONS = ['saraypapers', 'explicit-representations'];
const FUNDING = ['nwo', 'horizon', 'nsf china', 'didi udian', 'ams', 'ams institute'];
const RENAMED = { harmonia: 'harmony' };
const DROPPED = ['none'];

// Real project IDs come from the project pages.
const projectIds = new Set(
  fs.readdirSync('content/projects').filter((f) => f.endsWith('.md') || f.endsWith('.html'))
    .map((f) => matter.read(path.join('content/projects', f)).data.project_id).filter(Boolean),
);

// The old file has trailing commas and tabs, which JSON does not allow.
const raw = fs.readFileSync(SRC, 'utf8').replace(/\t/g, '    ').replace(/,(\s*[}\]])/g, '$1');
// Trim stray spaces in every string; nothing else about the values changes.
const trim = (v) => typeof v === 'string' ? v.trim() : Array.isArray(v) ? v.map(trim)
  : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k.trim(), trim(x)])) : v;
const publications = JSON.parse(raw).map(trim);
// 27 venues start with a stray ", " that the old site printed as "In , IEEE ...".
for (const p of publications) p.venue = p.venue.replace(/^,\s*/, '');
// Dates that do not exist on the calendar (e.g. 2024-02-30) become the last day of that month.
const fixedDates = [];
for (const p of publications) {
  const [y, m, d] = p.date.split('-').map(Number);
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  if (d > last) { fixedDates.push([p.title, p.date]); p.date = `${y}-${String(m).padStart(2, '0')}-${last}`; }
}

const slug = (s) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const asList = (v) => (v == null ? [] : Array.isArray(v) ? v : [v]).filter((x) => x != null && x !== '');

// File name: from the paper's own PDF when it follows the lab's "YY-author-venue.pdf" pattern,
// otherwise year + first author's surname + venue acronym.
function makeId(p, used) {
  const year = p.date.slice(0, 4);
  const pdf = asList(p.links).flatMap((l) => Object.entries(l))
    .find(([k, v]) => k.toLowerCase() === 'pdf' && v.startsWith('/assets/'));
  let id;
  const base = pdf && path.basename(pdf[1], path.extname(pdf[1]));
  if (base && base.startsWith(year)) {
    id = year + '-' + slug(base.slice(4));
  } else if (base && base.slice(0, 2) === year.slice(2)) {
    id = year + '-' + slug(base.slice(2));
  } else {
    const surname = slug(p.authors[0].split(' ').filter((w) => !w.endsWith('.')).pop() || p.authors[0]);
    const acronym = (/\(([^)]+)\)/.exec(p.venue) || [])[1];
    const titleWord = p.title.split(/\s+/).find((w) => w.length > 3 && !/^(with|from|using|towards?|the)$/i.test(w));
    id = `${year}-${surname}-${slug(acronym || titleWord || 'paper')}`;
  }
  id = id.replace(/-+/g, '-');
  let unique = id;
  for (let n = 2; used.has(unique); n++) unique = `${id}-${n}`;
  used.add(unique);
  return unique;
}

// YAML output, field by field, so every file has the same shape and order.
const scalar = (v) => (v === '' ? '""' : yaml.dump(v, { lineWidth: 100, quotingType: '"' }).trimEnd());
const flowList = (items) => `[${items.map((i) => yaml.dump(i, { flowLevel: 0, quotingType: '"' }).trim()).join(', ')}]`;
function field(key, value) {
  if (Array.isArray(value)) {
    return value.length ? `${key}:\n${value.map((v) => `  - ${scalar(v).replace(/\n/g, '\n    ')}`).join('\n')}` : `${key}: []`;
  }
  const out = scalar(value);
  return out.includes('\n') && !/^[>|]/.test(out) ? `${key}:\n  ${out.replace(/\n/g, '\n  ')}` : `${key}: ${out}`;
}

fs.rmSync(OUT, { recursive: true, force: true });
const used = new Set();
const report = { renamed: [], collections: [], funding: [], dropped: [], unknown: [], splitLinks: [] };
const titles = [];

for (const p of publications) {
  const id = makeId(p, used);
  const groups = asList(p.belongs_to_projects).map((g) => String(g).trim());
  const projects = [], collections = [], funding = [], comments = [];
  for (const g of groups) {
    if (RENAMED[g]) {
      projects.push(RENAMED[g]);
      comments.push(`was "${g}" on the old site (assumed typo, changed 2026-10)`);
      report.renamed.push([id, g, RENAMED[g]]);
    } else if (projectIds.has(g)) projects.push(g);
    else if (COLLECTIONS.includes(g)) { collections.push(g); report.collections.push([id, g]); }
    else if (FUNDING.includes(g)) { funding.push(g); report.funding.push([id, g]); }
    else if (DROPPED.includes(g)) report.dropped.push([id, g]);
    else { collections.push(g); report.unknown.push([id, g]); }
  }

  // Old links are a list of maps, sometimes with several links in one map: one link per item.
  const links = asList(p.links).flatMap((l) => {
    const entries = Object.entries(l);
    if (entries.length > 1) report.splitLinks.push([id, entries.map(([k]) => k).join(', ')]);
    return entries.map(([k, v]) => ({ [k]: v }));
  });

  const lines = [
    field('title', p.title),
    field('authors', asList(p.authors)),
    `date: ${p.date}`,
    field('type', p.type),
    field('venue', p.venue),
    `projects: ${flowList([...new Set(projects)])}` + (comments.length ? `  # ${comments.join('; ')}` : ''),
    `collections: ${flowList([...new Set(collections)])}`,
    `funding: ${flowList([...new Set(funding)])}`,
    `topics: ${flowList(asList(p.topics))}`,
    field('image', p.image || ''),
    field('note', p.note || ''),
    links.length ? `links:\n${links.map((l) => {
      const [[k, v]] = Object.entries(l);
      return `  - ${yaml.dump({ [k]: v }, { lineWidth: -1, quotingType: '"' }).trim()}`;
    }).join('\n')}` : 'links: []',
    field('abstract', p.abstract || ''),
    'bibtex: ""',
  ];
  const dir = path.join(OUT, p.date.slice(0, 4));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${id}.yaml`), lines.join('\n') + '\n');
  titles.push([id, p.title]);
}

fs.writeFileSync(path.join(OUT, '_template.yaml'), `# Copy this file to content/publications/<year>/<year>-<first author>-<venue>.yaml
# and fill it in. Keep every field; leave a field empty ([] or "") when it does not apply.
# Or create it from a BibTeX entry: npm run add-pub -- paper.bib
title: ""
authors:
  - First Author
  - Second Author
date: 2026-01-01         # YYYY-MM-DD; any day if unknown
type: conference         # journal | conference | workshop | thesis | other
venue: ""                # without the year, e.g. IEEE International Conference on Robotics and Automation (ICRA)
projects: []             # project IDs from content/projects/ (the project_id field)
collections: []          # informal groups from content/_data/paper_collections.yaml
funding: []
topics: []
image: ""                # optional square image or .mp4, e.g. /assets/images/papers/<paper>/cover.png
note: ""                 # e.g. Best Paper Award
links:
  - pdf: /assets/files/publications/26-author-venue.pdf
  - publisher: https://
abstract: ""
bibtex: ""               # optional; enables a "cite" button
`);

const table = (rows, head) => rows.length
  ? `| ${head.join(' | ')} |\n| ${head.map(() => '---').join(' | ')} |\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}\n`
  : '_None._\n';
fs.writeFileSync(REPORT, `# Publications migration report

Generated by \`scripts/migrate/publications.mjs\` from \`${SRC}\`: ${publications.length} papers became
${publications.length} files under \`content/publications/<year>/\`. Please check your own papers.

## Renamed project IDs (assumed typos)

${table(report.renamed, ['File', 'Old', 'New'])}
## Informal groups moved to \`collections\`

${table(report.collections, ['File', 'Collection'])}
## Funding sources moved to \`funding\`

${table(report.funding, ['File', 'Funding'])}
## Impossible dates corrected (the site shows only the year)

${table(fixedDates.map(([t, d]) => [t.replace(/\|/g, '\\|'), d]), ['Title', 'Old date'])}
## Dropped placeholders

${table(report.dropped, ['File', 'Value'])}
## Unrecognised IDs (kept as collections, please check)

${table(report.unknown, ['File', 'Value'])}
## Link blocks split into one link per item

${table(report.splitLinks, ['File', 'Links'])}
## All files

${table(titles.map(([id, t]) => [id, t.replace(/\|/g, '\\|')]), ['File', 'Title'])}`);

console.log(`Wrote ${publications.length} publication files and ${REPORT}`);
