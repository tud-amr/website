// Responsive images, applied to every built page.
//
// For each local <img> (PNG, JPEG or WebP under /assets/), this adds resized WebP copies with
// srcset/sizes, and lazy loading for anything that is not marked loading="eager". It does not
// add width/height: content pages size images with their own CSS, and the attributes could
// stretch them. The site's own templates set width/height where they know the layout. The original file keeps its
// URL; the copies live in /assets/img/. GIF, SVG and external images are left as they are.
//
// Resized files are generated once into .cache/img/ (named by a hash of the source) and
// copied into the output after each build, so later builds only process new images.

import fs from 'node:fs';
import path from 'node:path';
import Image from '@11ty/eleventy-img';
import sharp from 'sharp';

export const CACHE_DIR = '.cache/img';
const WIDTHS = [320, 640, 960, 1280, 1920];
const THUMB_WIDTHS = [160, 320];
const RESIZABLE = /\.(png|jpe?g|webp)$/i;

const attr = (tag, name) => {
  const m = new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(tag);
  return m ? (m[2] ?? m[3] ?? m[4]) : undefined;
};
const setAttr = (tag, name, value) => {
  const re = new RegExp(`\\s${name}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`, 'i');
  const escaped = String(value).replace(/"/g, '&quot;');
  return re.test(tag) ? tag.replace(re, ` ${name}="${escaped}"`) : tag.replace(/\s*\/?>$/, (end) => ` ${name}="${escaped}"${end}`);
};

// How wide the image is shown, so the browser picks the right file.
function sizesFor(tag) {
  const cls = attr(tag, 'class') || '';
  if (/\bdata-thumbnail\b/.test(tag)) return '160px';
  if (/\btile-media\b/.test(cls)) return '(min-width: 768px) 300px, 100vw';
  if (/\bperson-photo\b/.test(cls)) return '250px';
  if (/\bhero-image\b/.test(cls)) return '(min-width: 992px) 460px, 100vw';
  const width = Number(attr(tag, 'width'));
  if (width > 0 && width < 1120) return `(max-width: ${width}px) 100vw, ${width}px`;
  return '(max-width: 1120px) 100vw, 1120px';
}

const pending = new Map();
function resize(file, thumbnail) {
  const key = `${file}|${thumbnail}`;
  if (!pending.has(key)) {
    pending.set(key, (async () => {
      const { width: original } = await sharp(file).metadata();
      // Sizes up to 1920 px (320 px for thumbnails); the original width too if it is smaller.
      const list = thumbnail ? THUMB_WIDTHS : WIDTHS;
      const widths = list.filter((w) => w < original);
      if (original <= list[list.length - 1]) widths.push(original);
      const stats = await Image(file, {
        widths,
        formats: ['webp'],
        outputDir: CACHE_DIR,
        urlPath: '/assets/img/',
        sharpWebpOptions: { quality: 80 },
      });
      return stats.webp;
    })());
  }
  return pending.get(key);
}

export async function imageTransform(content) {
  if (!(this.page.outputPath || '').endsWith('.html')) return content;
  const tags = content.match(/<img\b[^>]*>/gi);
  if (!tags) return content;

  const replacements = await Promise.all([...new Set(tags)].map(async (tag) => {
    let out = tag;
    if (!attr(tag, 'loading')) out = setAttr(out, 'loading', 'lazy');
    if (!attr(tag, 'decoding')) out = setAttr(out, 'decoding', 'async');
    const src = attr(tag, 'src');
    if (!src || !src.startsWith('/assets/') || !RESIZABLE.test(src.split(/[?#]/)[0]) || attr(tag, 'srcset')) return [tag, out];
    const file = path.join('.', decodeURI(src.split(/[?#]/)[0]));
    if (!fs.existsSync(file)) return [tag, out];
    try {
      const files = await resize(file, /\bdata-thumbnail\b/.test(tag));
      out = setAttr(out, 'srcset', files.map((f) => `${f.url} ${f.width}w`).join(', '));
      out = setAttr(out, 'sizes', sizesFor(tag));
    } catch (e) {
      console.warn(`[images] could not resize ${src}: ${e.message}`);
    }
    return [tag, out];
  }));

  for (const [from, to] of replacements) if (from !== to) content = content.split(from).join(to);
  return content;
}

// After each build: copy resized images that the output does not have yet.
export function copyResizedImages(outputDir) {
  if (!fs.existsSync(CACHE_DIR)) return 0;
  const target = path.join(outputDir, 'assets/img');
  fs.mkdirSync(target, { recursive: true });
  let copied = 0;
  for (const name of fs.readdirSync(CACHE_DIR)) {
    const dest = path.join(target, name);
    if (!fs.existsSync(dest)) { fs.copyFileSync(path.join(CACHE_DIR, name), dest); copied++; }
  }
  return copied;
}
