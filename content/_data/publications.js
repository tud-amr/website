// All publications (content/publications/<year>/*.yaml), prepared for the templates:
//   publications.all           newest first, each with `id`, `number` (e.g. J79), `year`, `search`
//   publications.byYear        [{ year, items }] in the order the Publications page lists them
//   publications.byProject     { project_id: [...] }, newest first
//   publications.byCollection  { collection_id: [...] }, newest first
//   publications.byId          { file name: publication }
//   publications.latestWithImage  the 4 newest papers with a picture, for the home page
import { loadPublications } from '../../src/lib/content.mjs';

const PREFIX = { journal: 'J', conference: 'C', workshop: 'W', thesis: 'T', other: 'O', preprint: 'P' };
// Within a year; preprints (not yet peer reviewed) come last.
const TYPE_ORDER = ['journal', 'conference', 'workshop', 'thesis', 'other', 'preprint'];

export default function () {
  const all = loadPublications().filter((p) => !p.__error);

  // Numbers count up per type from the oldest paper, so the newest journal paper has the highest J number.
  const counts = {};
  for (const p of [...all].reverse()) {
    const prefix = PREFIX[p.type] || 'O';
    counts[prefix] = (counts[prefix] || 0) + 1;
    p.number = prefix + counts[prefix];
  }

  const byYear = [];
  const byProject = {};
  const byCollection = {};
  const byId = {};
  for (const p of all) {
    p.year = String(new Date(p.date).getUTCFullYear());
    p.search = [p.title, p.authors.join(' '), p.venue, p.year, p.note, p.abstract, p.topics.join(' ')]
      .join(' ').toLowerCase().replace(/\s+/g, ' ');
    let group = byYear.find((g) => g.year === p.year);
    if (!group) byYear.push((group = { year: p.year, items: [] }));
    group.items.push(p);
    for (const id of p.projects) (byProject[id] ||= []).push(p);
    for (const id of p.collections) (byCollection[id] ||= []).push(p);
    byId[p.id] = p;
  }
  // Within a year: journals, then conferences, workshops, theses, others and preprints, each newest first.
  for (const g of byYear) {
    g.items.sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type) || new Date(b.date) - new Date(a.date));
  }
  // For the home page: the newest papers that have a picture (not a video).
  const latestWithImage = all.filter((p) => p.image && !/\.mp4$/i.test(p.image)).slice(0, 4);
  return { all, byYear, byProject, byCollection, byId, latestWithImage, types: TYPE_ORDER.filter((t) => all.some((p) => p.type === t)) };
}
