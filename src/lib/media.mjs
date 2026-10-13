// Videos and embeds, applied to every built page (workshop pages excepted: they are standalone).
//
// - <video autoplay>: `autoplay` becomes `data-autoplay` and only metadata is preloaded; the site
//   script plays a video while it is on screen and pauses it after. Pages with many videos no
//   longer download all of them at once.
// - Other <video>: preload only metadata.
// - YouTube <iframe>: replaced by a click-to-play button (thumbnail + play icon) that loads the
//   player from youtube-nocookie.com only when clicked.
// - Other <iframe>: loading="lazy".

const attr = (tag, name) => {
  const m = new RegExp(`\\s${name}(?:\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+)))?(?=[\\s>/])`, 'i').exec(tag);
  return m ? (m[2] ?? m[3] ?? m[4] ?? '') : undefined;
};
const removeAttr = (tag, name) => tag.replace(new RegExp(`\\s${name}(?:\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+))?(?=[\\s>/])`, 'gi'), '');
const addAttr = (tag, text) => tag.replace(/\s*>$/, ` ${text}>`);
const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function videoTag(tag) {
  let out = tag;
  if (attr(tag, 'autoplay') !== undefined) {
    out = removeAttr(out, 'autoplay');
    out = addAttr(out, 'data-autoplay');
    if (attr(tag, 'muted') === undefined) out = addAttr(out, 'muted');
    if (attr(tag, 'playsinline') === undefined) out = addAttr(out, 'playsinline');
  }
  if (!attr(tag, 'preload') || attr(tag, 'preload') === 'auto') out = addAttr(removeAttr(out, 'preload'), 'preload="metadata"');
  return out;
}

function youtubeId(src) {
  const m = /youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/.exec(src);
  return m ? m[1] : null;
}

function iframe(match) {
  const open = /^<iframe\b[^>]*>/i.exec(match)[0];
  const src = attr(open, 'src') || '';
  if (!/youtube(-nocookie)?\.com\/embed\//.test(src)) {
    return attr(open, 'loading') ? match : match.replace(open, addAttr(open, 'loading="lazy"'));
  }
  const player = src.replace('www.youtube.com', 'www.youtube-nocookie.com').replace('//youtube.com', '//www.youtube-nocookie.com');
  const id = youtubeId(src);
  const title = attr(open, 'title') || 'YouTube video';
  const data = ['class', 'style', 'width', 'height']
    .filter((a) => attr(open, a)).map((a) => ` data-${a}="${escape(attr(open, a))}"`).join('');
  // Keep the size the iframe had, so the layout does not change before or after the click.
  const w = Number(attr(open, 'width')), h = Number(attr(open, 'height'));
  const size = w > 0 && h > 0 ? ` style="max-width: ${w}px; aspect-ratio: ${w} / ${h}"` : '';
  const thumb = id ? `<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" decoding="async">` : '';
  return `<button type="button" class="yt-facade" data-src="${escape(player)}"${data}${size} aria-label="Play: ${escape(title)}">${thumb}<span></span></button>`;
}

export function mediaTransform(content) {
  const out = this.page.outputPath || '';
  if (!out.endsWith('.html') || /[\\/]workshops[\\/]/.test(out) && !/<main\b/.test(content)) return content;
  return content
    .replace(/<video\b[^>]*>/gi, videoTag)
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, iframe);
}
