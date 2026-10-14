// Every URL of the old Jekyll site must still work: `npm run check:urls` (after a build).
//
// Compares the built site in _site/ with tests/baseline/files.txt (every file the old site
// published) and with the old redirects in tests/baseline/metrics.json. A file may be missing
// only if it is listed in EXCEPTIONS below, with the reason.

import fs from 'node:fs';
import path from 'node:path';

const SITE = '_site';
const EXCEPTIONS = {
  // Repository files the old site published by accident.
  '/Dockerfile': 'repo file published by mistake',
  '/Gemfile': 'repo file published by mistake',
  '/Gemfile.lock': 'repo file published by mistake',
  '/docker-compose.yaml': 'repo file published by mistake',
  '/project tags': 'maintainer notes published by mistake',
  '/msc_projects_available/msc-26-diego-interaction-mppi': 'raw copy of a file without extension; now a page at .html',
  // The old site's own styles and scripts, replaced by /assets/site/.
  '/assets/css/bootstrap.css': 'old stylesheet, replaced',
  '/assets/css/bootstrap.css.map': 'old stylesheet, replaced',
  '/assets/css/codehighlight.css': 'old stylesheet, replaced',
  '/assets/css/style.css': 'old stylesheet, replaced',
  '/assets/js/bootstrap.bundle.min.js': 'old script, replaced',
  '/assets/js/bootstrap.bundle.min.js.map': 'old script, replaced',
  '/assets/js/custom.js': 'unused script, removed',
  // Junk that was never linked.
  '/assets/images/papers/codi/ffmpeg2pass-0.log.mbtree': '64 MB video-encoder log, never linked',
  '/assets/images/papers/codi/ffmpeg2pass-0.log': 'video-encoder log, never linked',
};

// Resolve a URL path the way GitHub Pages does.
const exists = (url) => {
  const base = path.join(SITE, url);
  return [base, path.join(base, 'index.html'), `${base}.html`].some((p) => fs.existsSync(p) && fs.statSync(p).isFile());
};

const problems = [];
const files = fs.readFileSync('tests/baseline/files.txt', 'utf8').split('\n').filter(Boolean);
let kept = 0;
for (const url of files) {
  if (url in EXCEPTIONS) continue;
  if (exists(url)) kept++;
  else problems.push(`missing: ${url}`);
}

// Old redirects must still exist and point to the same place.
const { redirects } = JSON.parse(fs.readFileSync('tests/baseline/metrics.json', 'utf8'));
for (const [from, to] of Object.entries(redirects)) {
  const file = [path.join(SITE, from), path.join(SITE, from, 'index.html')].find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
  const html = file ? fs.readFileSync(file, 'utf8') : '';
  const target = (/http-equiv="refresh" content="0; url=([^"]+)"/.exec(html) || [])[1];
  if (!target) problems.push(`redirect gone: ${from} (was -> ${to})`);
  else if (target.replace(/\.html$/, '').replace(/\/$/, '') !== to.replace(/\.html$/, '').replace(/\/$/, '')) {
    problems.push(`redirect changed: ${from} -> ${target} (was -> ${to})`);
  }
}

if (problems.length) {
  console.error(`URL check failed: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`URL check passed: ${kept} of ${files.length} old files still served, ${Object.keys(EXCEPTIONS).length} documented exceptions, ${Object.keys(redirects).length} redirects unchanged.`);
