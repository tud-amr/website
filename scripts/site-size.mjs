// Reports the size of the built site. GitHub recommends Pages sites stay under 1 GB; larger sites
// still deploy (the hard limit is 10 GB) but risk the 10-minute deployment timeout.
import fs from 'node:fs';
import path from 'node:path';

const GUIDELINE = 1e9;
const WARN = 0.9e9;
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).reduce((sum, e) => {
    const p = path.join(dir, e.name);
    return sum + (e.isDirectory() ? walk(p) : fs.statSync(p).size);
  }, 0);
}
const total = walk('_site');
const parts = ['assets/files', 'assets/images', 'assets/img', 'assets/site', 'assets/vendor']
  .map((p) => [p, fs.existsSync(path.join('_site', p)) ? walk(path.join('_site', p)) : 0]);
const gb = (b) => `${(b / 1e9).toFixed(3)} GB`;
console.log(`Published site: ${gb(total)} (GitHub Pages guideline: under 1 GB)`);
for (const [p, b] of parts) console.log(`  ${p.padEnd(15)} ${gb(b)}`);
if (total > GUIDELINE) console.log('::warning::The site is above the 1 GB GitHub Pages guideline. It still deploys, but large media should move out of the repo eventually.');
else if (total > WARN) console.log('::warning::The site is above 0.9 GB, close to the 1 GB GitHub Pages guideline.');
