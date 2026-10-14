// Data for the hidden metrics page (content/stats.liquid), from .cache/stats.json written by
// scripts/fetch-stats.mjs. The page is only built when STATS_PATH is set (a repository secret)
// and the numbers were fetched.
import fs from 'node:fs';

export default function () {
  const path = (process.env.STATS_PATH || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
  let data = null;
  try {
    data = JSON.parse(fs.readFileSync('.cache/stats.json', 'utf8'));
  } catch {
    return { path: null };
  }
  if (!path) return { path: null };

  // Bar heights for the charts, as a share of the busiest day or month.
  const bars = (rows) => {
    const max = Math.max(1, ...rows.map((r) => r.count));
    return rows.map((r) => ({ ...r, height: Math.round((r.count / max) * 100) }));
  };
  const months = new Map();
  for (const d of data.last365.daily) months.set(d.day.slice(0, 7), (months.get(d.day.slice(0, 7)) || 0) + d.count);
  const share = (rows, total) => rows.map((r) => ({ ...r, percent: total ? Math.round((r.count / total) * 100) : 0 }));
  const sum = (rows) => rows.reduce((a, r) => a + r.count, 0);
  const lists = {};
  for (const k of ['pages', 'toprefs', 'browsers', 'systems', 'locations', 'sizes']) {
    const rows = data.last30[k] || [];
    lists[k] = share(rows, k === 'pages' ? data.last30.total : sum(rows));
  }
  return {
    path,
    generated: data.generated.slice(0, 16).replace('T', ' ') + ' UTC',
    last30: data.last30.total,
    last365: data.last365.total,
    daily: bars(data.last30.daily),
    monthly: bars([...months].map(([month, count]) => ({ day: month, count }))),
    ...lists,
  };
}
