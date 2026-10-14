// The newest video of the lab's YouTube playlist, for the home page preview. Looked up at build
// time through YouTube's public oEmbed endpoint (no API key); the site rebuilds daily, so the
// home page shows the video currently at the top of the playlist. Visitors load nothing from
// YouTube until they press play. Falls back to the last known video (.cache) when offline.
import fs from 'node:fs';

const PLAYLIST = 'PLOksz-MTFhN2T4gYQlLHR2lGCdC0BDkJw';
const CACHE = '.cache/youtube.json';

async function oembed(url) {
  const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`oEmbed ${res.status}`);
  return res.json();
}

export default async function () {
  const base = { playlist: PLAYLIST, embed: `https://www.youtube.com/embed/videoseries?list=${PLAYLIST}&rel=0` };
  try {
    const list = await oembed(`https://www.youtube.com/playlist?list=${PLAYLIST}`);
    const id = (/\/vi\/([\w-]{11})\//.exec(list.thumbnail_url) || [])[1];
    if (!id) throw new Error('no video in the playlist');
    const video = await oembed(`https://www.youtube.com/watch?v=${id}`).catch(() => ({}));
    const latest = { ...base, id, title: video.title || list.title, thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` };
    fs.mkdirSync('.cache', { recursive: true });
    fs.writeFileSync(CACHE, JSON.stringify(latest));
    return latest;
  } catch (e) {
    try {
      return JSON.parse(fs.readFileSync(CACHE, 'utf8'));
    } catch {
      console.warn(`[youtube] could not look up the playlist (${e.message}); the preview shows no thumbnail.`);
      return base;
    }
  }
}
