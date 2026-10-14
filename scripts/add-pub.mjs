// Creates a publication file from a BibTeX entry.
//
//   npm run add-pub -- paper.bib
//   npm run add-pub -- paper.bib --project interact --collection saraypapers --pdf /assets/files/publications/26-name-venue.pdf
//
// Writes content/publications/<year>/<year>-<first author>-<venue>.yaml with every field present
// (fill in what the BibTeX does not have), and keeps the BibTeX for the "cite" button.
// To get BibTeX from a DOI: curl -LH "Accept: application/x-bibtex" https://doi.org/<doi>
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const args = process.argv.slice(2);
const option = (name) => {
  const values = [];
  for (let i = 0; i < args.length; i++) if (args[i] === `--${name}` && args[i + 1]) values.push(args[++i]);
  return values;
};
const file = args.find((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
if (!file) {
  console.error('Usage: npm run add-pub -- paper.bib [--project <id>] [--collection <id>] [--pdf /assets/files/publications/x.pdf]');
  process.exit(1);
}
const source = fs.readFileSync(file, 'utf8').trim();

// ---- A small BibTeX reader (one entry) ----
const head = /@(\w+)\s*\{\s*([^,]*),/.exec(source);
if (!head) { console.error(`${file} does not look like a BibTeX entry.`); process.exit(1); }
const entryType = head[1].toLowerCase();
const fields = {};
let i = head.index + head[0].length;
while (i < source.length) {
  const m = /\s*([\w-]+)\s*=\s*/y;
  m.lastIndex = i;
  const key = m.exec(source);
  if (!key) break;
  i = m.lastIndex;
  let value = '';
  if (source[i] === '{') {
    let depth = 0, j = i;
    for (; j < source.length; j++) {
      if (source[j] === '{') depth++;
      else if (source[j] === '}' && --depth === 0) break;
    }
    value = source.slice(i + 1, j);
    i = j + 1;
  } else if (source[i] === '"') {
    const j = source.indexOf('"', i + 1);
    value = source.slice(i + 1, j);
    i = j + 1;
  } else {
    const j = source.slice(i).search(/[,}\n]/);
    value = source.slice(i, i + j).trim();
    i += j;
  }
  fields[key[1].toLowerCase()] = value;
  const comma = source.indexOf(',', i);
  if (comma === -1) break;
  i = comma + 1;
}

const clean = (s = '') => s.replace(/[{}]/g, '').replace(/\\&/g, '&').replace(/\\["'`^~]\{?(\w)\}?/g, '$1').replace(/~/g, ' ').replace(/\s+/g, ' ').trim();
const authors = (fields.author || '').split(/\s+and\s+/i).map((a) => {
  const name = clean(a);
  return name.includes(',') ? name.split(',').map((s) => s.trim()).reverse().join(' ') : name;
}).filter(Boolean);
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const year = clean(fields.year) || String(new Date().getFullYear());
const monthField = clean(fields.month).toLowerCase();
const month = /^\d+$/.test(monthField) ? Number(monthField) : MONTHS.indexOf(monthField.slice(0, 3)) + 1 || 1;
const venue = clean(fields.journal || fields.booktitle || fields.school || fields.publisher || fields.howpublished);
let type = { article: 'journal', inproceedings: 'conference', conference: 'conference', phdthesis: 'thesis', mastersthesis: 'thesis' }[entryType] || 'other';
if (/workshop/i.test(venue)) type = 'workshop';

const links = [];
for (const pdf of option('pdf')) links.push({ pdf });
if (fields.doi) links.push({ publisher: `https://doi.org/${clean(fields.doi)}` });
else if (fields.url) links.push({ publisher: clean(fields.url) });
if (fields.eprint && /arxiv/i.test(fields.archiveprefix || fields.eprinttype || 'arxiv')) links.push({ arxiv: `https://arxiv.org/abs/${clean(fields.eprint)}` });

// ---- File name and output ----
const slug = (s) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const surname = slug((authors[0] || 'unknown').split(' ').pop());
const acronym = (/\(([^)]+)\)/.exec(venue) || [])[1] || venue.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).map((w) => w[0]).join('') || type;
const id = `${year}-${surname}-${slug(acronym)}`;
const out = path.join('content/publications', year, `${id}.yaml`);
if (fs.existsSync(out)) { console.error(`${out} already exists. Rename it or edit it instead.`); process.exit(1); }

const q = (v) => (v === '' ? '""' : yaml.dump(v, { lineWidth: 100, quotingType: '"' }).trimEnd());
const flow = (list) => `[${list.join(', ')}]`;
const text = [
  `title: ${q(clean(fields.title))}`,
  `authors:\n${authors.map((a) => `  - ${a}`).join('\n')}`,
  `date: ${year}-${String(month).padStart(2, '0')}-01`,
  `type: ${type}${type === 'other' ? '                  # check: journal | conference | workshop | thesis | other' : ''}`,
  `venue: ${q(venue)}`,
  `projects: ${flow(option('project'))}`,
  `collections: ${flow(option('collection'))}`,
  'funding: []',
  'topics: []',
  'image: ""',
  'note: ""',
  links.length ? `links:\n${links.map((l) => `  - ${yaml.dump(l, { lineWidth: -1 }).trim()}`).join('\n')}` : 'links: []',
  `abstract: ${q(clean(fields.abstract))}`,
  `bibtex: |\n${source.split('\n').map((l) => `  ${l}`).join('\n')}`,
].join('\n');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, text + '\n');
console.log(`Created ${out}\nCheck it, add the PDF and any links, then run: npm run validate`);
