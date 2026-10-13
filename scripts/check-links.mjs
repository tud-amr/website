// Internal links: every href/src on every built page that points inside the site must exist.
//   npm run check:links            (after a build)
// External links are checked weekly by .github/workflows/links.yml instead (they break on their own).
import fs from 'node:fs';
import path from 'node:path';
import { resolve } from './lib/serve.mjs';

const SITE = '_site';
// Links that were already broken on the old site and need an author to fix them.
// Format: '<page path> -> <link>': 'reason'. Keep this list short.
const KNOWN_BROKEN = {};

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return p === path.join(SITE, 'assets') ? [] : htmlFiles(p);
    return e.name.endsWith('.html') ? [p] : [];
  });
}

const broken = [];
let checked = 0;
for (const file of htmlFiles(SITE)) {
  // Commented-out HTML is never shown, so links inside it do not count.
  const html = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  if (/http-equiv="refresh"/.test(html)) continue; // redirect pages
  const pagePath = '/' + path.relative(SITE, file).replace(/index\.html$/, '');
  const links = new Set();
  for (const m of html.matchAll(/\s(?:href|src|data-src|poster)\s*=\s*"([^"]+)"/g)) links.add(m[1]);
  for (const m of html.matchAll(/\ssrcset\s*=\s*"([^"]+)"/g)) for (const part of m[1].split(',')) links.add(part.trim().split(/\s+/)[0]);
  for (const raw of links) {
    const link = raw.replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|data:|javascript:|#|\{)/i.test(link) || link.startsWith('//')) continue;
    const target = new URL(link, `http://site${pagePath}`).pathname;
    checked++;
    if (!resolve(SITE, target) && !KNOWN_BROKEN[`${pagePath} -> ${link}`]) broken.push(`${pagePath}: ${link}`);
  }
}

if (broken.length) {
  console.error(`Link check failed: ${broken.length} broken internal link(s)\n  ${broken.join('\n  ')}`);
  process.exit(1);
}
console.log(`Link check passed: ${checked} internal links and files checked.`);
