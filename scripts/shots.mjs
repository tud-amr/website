// Screenshots of built pages at phone, tablet and desktop width, for checking changes by eye
// (or by an agent). Run after a build:
//   npm run shots -- /publications/ /people/      those pages
//   npm run shots -- --key                        the main pages of each kind
//   npm run shots -- --all                        every page in the sitemap
//   npm run shots -- /people/ --widths=390        only phone width
// Images go to .shots/<page>@<width>.png (full page). Needs Playwright's Chromium
// (use `docker compose run --rm test npm run shots -- ...` if it is not installed).
import fs from 'node:fs';
import { chromium } from '@playwright/test';
import { serve } from './lib/serve.mjs';

const KEY_PAGES = ['/', '/research/', '/people/', '/publications/', '/robots/', '/education/', '/events/',
  '/student-projects/', '/msc_projects_finished/', '/paper_websites/', '/projects/interact.html',
  '/paper_websites/codi.html', '/msc_projects_finished/24-jelmerdewolde-compliantmobilemanipulation.html'];

const args = process.argv.slice(2);
const widthsArg = args.find((a) => a.startsWith('--widths='));
const widths = widthsArg ? widthsArg.split('=')[1].split(',').map(Number) : [390, 768, 1280];
let pages = args.filter((a) => a.startsWith('/'));
if (args.includes('--key')) pages.push(...KEY_PAGES);
if (args.includes('--all')) {
  const sitemap = fs.readFileSync('_site/sitemap.xml', 'utf8');
  pages.push(...[...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1]));
}
pages = [...new Set(pages)];
if (!pages.length) {
  console.error('Give page paths (e.g. /publications/), --key or --all.');
  process.exit(1);
}

const port = 8091;
const server = await serve('_site', port);
const browser = await chromium.launch();
fs.mkdirSync('.shots', { recursive: true });
const slug = (p) => p.replace(/^\/|\/$/g, '').replace(/[/.]/g, '_') || 'home';
for (const page of pages) {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const tab = await context.newPage();
    await tab.goto(`http://localhost:${port}${page}`, { waitUntil: 'load', timeout: 60000 }).catch(() => {});
    // Scroll through the page so lazy-loaded images appear in the screenshot.
    await tab.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await tab.waitForTimeout(800);
    const file = `.shots/${slug(page)}@${width}.png`;
    await tab.screenshot({ path: file, fullPage: true });
    const sideways = await tab.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    console.log(`${file}${sideways ? '  (scrolls sideways!)' : ''}`);
    await context.close();
  }
}
await browser.close();
server.close();
