// Content parity: does every page still contain the words it had on the old site?
//   npm run compare-text            (after a build)
//   npm run compare-text -- --all   list every page, not only those below the threshold
//
// For each page in tests/baseline/text/, counts how many of its words (with repeats) appear in
// the new page. Navigation and footer words are ignored. Prints pages below 97% with a sample
// of missing words. This is a review aid, not a pass/fail test.

import fs from 'node:fs';
import path from 'node:path';

const SITE = '_site';
const BASE = 'tests/baseline/text';
const THRESHOLD = 0.97;
const showAll = process.argv.includes('--all');

const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&#x27;|&rsquo;|&lsquo;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
const words = (text) => decode(text).toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
const htmlText = (html) => {
  const body = (/<body[^>]*>([\s\S]*)<\/body>/i.exec(html) || [, html])[1];
  return body.replace(/<header class="site-header">[\s\S]*?<\/header>/, ' ').replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, ' ')
    .replace(/<[^>]+>/g, ' ');
};
// Words from the old navigation and footer, removed from the old text before comparing.
const CHROME = words('Home Research Group People Vacancies Robots Publications Education Events © 2023 Javier Alonso-Mora | Jekyll + Bootstrap. Toggle navigation');

const fileFor = (name) => {
  const rel = name.replace(/\.txt$/, '');
  const candidates = rel === 'home' ? ['index.html'] : [
    rel.replace(/_html$/, '.html').replace(/_/g, '/'),
    rel.replace(/_html$/, '.html').replace(/_(?=[^_]*\.html$)/, '/'),
    `${rel.replace(/_/g, '/')}/index.html`,
    `${rel}/index.html`,
  ];
  // Folder names with underscores (paper_websites, msc_projects_finished) need the first form fixed up.
  const fixed = candidates.flatMap((c) => [c, c.replace('paper/websites', 'paper_websites')
    .replace('msc/projects/finished', 'msc_projects_finished').replace('msc/projects/available', 'msc_projects_available')
    .replace('sadcher/MRTA', 'sadcher_MRTA')]);
  return fixed.map((c) => path.join(SITE, c)).find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
};

const rows = [];
for (const name of fs.readdirSync(BASE).sort()) {
  const file = fileFor(name);
  const old = words(fs.readFileSync(path.join(BASE, name), 'utf8'));
  for (const w of CHROME) { const i = old.indexOf(w); if (i >= 0) old.splice(i, 1); }
  if (!file) { rows.push({ name, score: 0, missing: ['(page not found)'] }); continue; }
  const counts = new Map();
  for (const w of words(htmlText(fs.readFileSync(file, 'utf8')))) counts.set(w, (counts.get(w) || 0) + 1);
  const missing = [];
  let found = 0;
  for (const w of old) {
    if (counts.get(w) > 0) { found++; counts.set(w, counts.get(w) - 1); } else missing.push(w);
  }
  rows.push({ name, score: old.length ? found / old.length : 1, missing });
}

const below = rows.filter((r) => r.score < THRESHOLD);
for (const r of showAll ? rows : below) {
  console.log(`${(r.score * 100).toFixed(1).padStart(5)}%  ${r.name.replace(/\.txt$/, '')}${r.missing.length ? `  missing: ${[...new Set(r.missing)].slice(0, process.argv.includes("--long") ? 400 : 12).join(' ')}` : ''}`);
}
console.log(`\n${rows.length - below.length} of ${rows.length} pages keep at least ${THRESHOLD * 100}% of their old words.`);
