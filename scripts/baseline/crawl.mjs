// Phase 0 baseline crawler.
// Serves a built site directory the way GitHub Pages does, visits every HTML page
// at phone, tablet and desktop widths, and records:
//   - page weight (bytes received until load + 2 s, no scrolling)
//   - sideways overflow at phone width, with the elements that cause it
//   - a full-page screenshot per width (not committed, see README)
//   - the page text, for content-parity checks after the port
//
// Usage (inside the Playwright container, see run.sh):
//   node crawl.mjs <site-dir> <out-dir>

import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const [siteDir, outDir] = process.argv.slice(2);
const WIDTHS = [390, 768, 1280];
const SETTLE_MS = 2000;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.xml': 'application/xml', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.m4v': 'video/mp4', '.webm': 'video/webm',
  '.pdf': 'application/pdf', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.otf': 'font/otf', '.ico': 'image/x-icon',
};

// Resolve a URL path like GitHub Pages: exact file, dir/index.html, or extensionless .html.
function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const base = path.join(siteDir, clean);
  const candidates = [base, path.join(base, 'index.html'), base + '.html'];
  return candidates.find((p) => p.startsWith(siteDir) && fs.existsSync(p) && fs.statSync(p).isFile());
}

const server = http.createServer((req, res) => {
  const file = resolve(new URL(req.url, 'http://x').pathname);
  if (!file) {
    res.writeHead(404, { 'content-type': TYPES['.html'] });
    fs.createReadStream(path.join(siteDir, '404.html')).pipe(res);
    return;
  }
  const size = fs.statSync(file).size;
  const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
  if (range) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { 'content-type': type, 'accept-ranges': 'bytes',
      'content-range': `bytes ${start}-${end}/${size}`, 'content-length': end - start + 1 });
    fs.createReadStream(file, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { 'content-type': type, 'accept-ranges': 'bytes', 'content-length': size });
    fs.createReadStream(file).pipe(res);
  }
});
await new Promise((r) => server.listen(4100, r));
const origin = 'http://localhost:4100';

// Every built HTML page outside /assets, as the URL people use.
function listPages(dir, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const rel = `${prefix}/${e.name}`;
    if (e.isDirectory()) return rel === '/assets' ? [] : listPages(path.join(dir, e.name), rel);
    return e.name.endsWith('.html') ? [rel.replace(/index\.html$/, '')] : [];
  }).sort();
}
const pages = listPages(siteDir);

const slug = (p) => (p.replace(/^\/|\/$/g, '').replace(/[/.]/g, '_') || 'home');
fs.mkdirSync(path.join(outDir, 'screenshots'), { recursive: true });
fs.mkdirSync(path.join(outDir, 'text'), { recursive: true });

const browser = await chromium.launch();
const results = {};
const redirects = {};

for (const page of pages) {
  const html = fs.readFileSync(resolve(page), 'utf8');
  const refresh = /http-equiv="refresh" content="0; url=([^"]+)"/i.exec(html);
  if (refresh) { redirects[page] = refresh[1]; continue; }

  results[page] = {};
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    // Never send hits to analytics while measuring.
    await context.route(/googletagmanager|google-analytics/, (r) => r.abort());
    const tab = await context.newPage();
    const cdp = await context.newCDPSession(tab);
    await cdp.send('Network.enable');
    let bytes = 0, requests = 0;
    cdp.on('Network.dataReceived', (e) => { bytes += e.encodedDataLength; });
    cdp.on('Network.responseReceived', () => { requests += 1; });

    let status = null;
    try {
      const resp = await tab.goto(origin + page, { waitUntil: 'load', timeout: 60000 });
      status = resp && resp.status();
    } catch (e) {
      status = 'timeout';
    }
    await tab.waitForTimeout(SETTLE_MS);

    const layout = await tab.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const describe = (el) => {
        const cls = typeof el.className === 'string' && el.className.trim()
          ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : '';
        const src = el.getAttribute('src') ? ` [${el.getAttribute('src').split('/').pop()}]` : '';
        return `${el.tagName.toLowerCase()}${cls}${src} (${Math.round(el.getBoundingClientRect().width)}px)`;
      };
      // Outermost elements that stick out past the right edge.
      const over = [...document.querySelectorAll('body *')].filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.right <= vw + 1) return false;
        const p = el.parentElement && el.parentElement.getBoundingClientRect();
        return !p || p.right <= vw + 1;
      });
      return {
        scrollWidth: document.documentElement.scrollWidth,
        viewport: vw,
        overflow: [...new Set(over.map(describe))].slice(0, 10),
        title: document.title.trim(),
        text: document.body.textContent.replace(/\s+/g, ' ').trim(),
      };
    });

    await tab.screenshot({ path: path.join(outDir, 'screenshots', `${slug(page)}@${width}.png`), fullPage: true });
    if (width === 1280) fs.writeFileSync(path.join(outDir, 'text', `${slug(page)}.txt`), layout.text + '\n');

    results[page][width] = {
      status, requests, mb: +(bytes / 1e6).toFixed(2),
      sidewaysScroll: layout.scrollWidth > layout.viewport + 1,
      overflow: layout.overflow,
    };
    if (width === 1280) results[page].title = layout.title;
    await context.close();
    console.log(`${page} @${width}: ${results[page][width].mb} MB${results[page][width].sidewaysScroll ? ', SCROLLS SIDEWAYS' : ''}`);
  }
}

await browser.close();
server.close();
fs.writeFileSync(path.join(outDir, 'metrics.json'), JSON.stringify({ widths: WIDTHS, settleMs: SETTLE_MS, pages: results, redirects }, null, 2) + '\n');
