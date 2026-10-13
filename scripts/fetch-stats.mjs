// Fetches visitor numbers from GoatCounter for the hidden metrics page (content/stats.liquid).
// Runs in the deploy workflow; does nothing unless both are set:
//   GOATCOUNTER_SITE   the site code, e.g. "amr-lab" for https://amr-lab.goatcounter.com
//   GOATCOUNTER_TOKEN  an API key with permission to read statistics (kept as a repository secret)
// Writes .cache/stats.json. The token never reaches the site or the browser.
import fs from 'node:fs';

const site = process.env.GOATCOUNTER_SITE;
const token = process.env.GOATCOUNTER_TOKEN;
if (!site || !token) {
  console.log('fetch-stats: GOATCOUNTER_SITE or GOATCOUNTER_TOKEN not set; skipping.');
  process.exit(0);
}

const base = `https://${site}.goatcounter.com/api/v0`;
const hour = (d) => { d.setUTCMinutes(0, 0, 0); return d.toISOString().replace('.000', ''); };
const end = hour(new Date());
const daysAgo = (n) => hour(new Date(Date.now() - n * 864e5));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(path, params) {
  const url = `${base}${path}?${new URLSearchParams(params)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
  await sleep(300); // the API allows 4 requests per second
  if (!res.ok) throw new Error(`${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function period(days, withLists) {
  const range = { start: daysAgo(days), end };
  const total = await get('/stats/total', range);
  const result = {
    days,
    total: total.total ?? 0,
    daily: (total.stats || []).map((s) => ({ day: s.day, count: s.daily ?? 0 })),
  };
  if (withLists) {
    const hits = await get('/stats/hits', { ...range, limit: 20 });
    result.pages = (hits.hits || []).map((h) => ({ path: h.path, title: h.title, count: h.count }));
    for (const page of ['toprefs', 'browsers', 'systems', 'locations', 'sizes']) {
      const s = await get(`/stats/${page}`, { ...range, limit: 10 });
      result[page] = (s.stats || []).map((x) => ({ name: x.name || '(unknown)', count: x.count }));
    }
  }
  return result;
}

try {
  const data = { site, generated: new Date().toISOString(), last30: await period(30, true), last365: await period(365, false) };
  fs.mkdirSync('.cache', { recursive: true });
  fs.writeFileSync('.cache/stats.json', JSON.stringify(data, null, 2));
  console.log(`fetch-stats: ${data.last30.total} pageviews in the last 30 days.`);
} catch (e) {
  // Analytics must never block a deploy.
  console.log(`::warning::fetch-stats failed, the metrics page will be skipped: ${e.message}`);
}
