// A small static server for the built site that behaves like GitHub Pages:
// /x serves x, x/index.html or x.html; unknown paths get 404.html; video supports range requests.
// Used by the tests and `npm run shots`. `node scripts/lib/serve.mjs [dir] [port]` runs it alone.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.avif': 'image/avif', '.mp4': 'video/mp4', '.m4v': 'video/mp4', '.webm': 'video/webm', '.pdf': 'application/pdf',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.ico': 'image/x-icon',
};

export function resolve(root, urlPath) {
  let clean;
  try { clean = decodeURIComponent(urlPath.split('?')[0]); } catch { return null; }
  const base = path.join(root, clean);
  if (!base.startsWith(path.resolve(root))) return null;
  return [base, path.join(base, 'index.html'), `${base}.html`].find((p) => fs.existsSync(p) && fs.statSync(p).isFile()) || null;
}

export function serve(root = '_site', port = 8090) {
  root = path.resolve(root);
  const server = http.createServer((req, res) => {
    const file = resolve(root, new URL(req.url, 'http://x').pathname);
    if (!file) {
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      fs.createReadStream(path.join(root, '404.html')).on('error', () => res.end()).pipe(res);
      return;
    }
    const size = fs.statSync(file).size;
    const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
    if (range && size > 0) {
      const start = range[1] ? Number(range[1]) : 0;
      const end = Math.min(range[2] ? Number(range[2]) : size - 1, size - 1);
      res.writeHead(206, { 'content-type': type, 'accept-ranges': 'bytes', 'content-range': `bytes ${start}-${end}/${size}`, 'content-length': end - start + 1 });
      fs.createReadStream(file, { start, end }).pipe(res);
    } else {
      res.writeHead(200, { 'content-type': type, 'accept-ranges': 'bytes', 'content-length': size });
      fs.createReadStream(file).pipe(res);
    }
  });
  return new Promise((ok) => server.listen(port, () => ok(server)));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [dir = '_site', port = '8090'] = process.argv.slice(2);
  serve(dir, Number(port)).then(() => console.log(`Serving ${dir} at http://localhost:${port}`));
}
