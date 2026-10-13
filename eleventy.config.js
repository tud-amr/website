// Eleventy configuration for autonomousrobots.nl.
// Content lives in content/, templates in src/, static files in assets/.
// See README.md for how the pieces fit together.

import fs from 'node:fs';
import yaml from 'js-yaml';
import markdownIt from 'markdown-it';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import { validateContent } from './src/lib/content.mjs';
import { imageTransform, copyResizedImages } from './src/lib/images.mjs';
import { mediaTransform } from './src/lib/media.mjs';
import { writeIconCss } from './src/lib/icons.mjs';

export default function (eleventyConfig) {
  // ---- Content check: the build stops with a clear list of problems -------------------------
  eleventyConfig.on('eleventy.before', () => {
    const { errors } = validateContent();
    if (errors.length) {
      throw new Error(`Content check failed with ${errors.length} problem(s):\n  - ${errors.join('\n  - ')}\n`);
    }
  });

  eleventyConfig.on('eleventy.after', ({ dir }) => {
    writeIconCss(dir.output);
    copyResizedImages(dir.output);
  });

  // ---- Templates ------------------------------------------------------------------------------
  // Liquid set up to behave like Jekyll's, so existing content keeps working:
  // `{% include fix_link.html link='...' %}` with unquoted file names and `include.*` parameters.
  // Dates are stored as midnight UTC; timezoneOffset 0 prints them on the same day everywhere.
  eleventyConfig.setLiquidOptions({ jekyllInclude: true, dynamicPartials: false, timezoneOffset: 0 });
  eleventyConfig.addDataExtension('yaml', (contents) => yaml.load(contents));

  // Markdown with raw HTML allowed and heading IDs like the old site (kramdown) made them.
  const md = markdownIt({ html: true });
  md.core.ruler.push('heading_ids', (state) => {
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i];
      if (token.type === 'heading_open' && !token.attrGet('id')) {
        const text = state.tokens[i + 1].content;
        token.attrSet('id', text.toLowerCase().replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-'));
      }
    }
  });
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addPlugin(syntaxHighlight);

  // ---- Filters --------------------------------------------------------------------------------
  const site = yaml.load(fs.readFileSync('content/_data/site.yaml', 'utf8'));
  eleventyConfig.addFilter('relative_url', (url) => url || '');
  eleventyConfig.addFilter('absolute_url', (url) => (url && url.startsWith('/') ? site.url + url : url));
  eleventyConfig.addFilter('markdownify', (text) => md.render(String(text || '')));
  eleventyConfig.addFilter('markdownify_inline', (text) => md.renderInline(String(text || '')));
  // Publications related to a paper website: from its projects, collections and handpicked papers.
  eleventyConfig.addFilter('related_publications', (related, publications, ownTitle) => {
    if (!related) return [];
    const picked = new Map();
    for (const id of related.projects || []) for (const p of publications.byProject[id] || []) picked.set(p.id, p);
    for (const id of related.collections || []) for (const p of publications.byCollection[id] || []) picked.set(p.id, p);
    for (const id of related.papers || []) if (publications.byId[id]) picked.set(id, publications.byId[id]);
    return publications.all.filter((p) => picked.has(p.id) && p.title.trim().toLowerCase() !== String(ownTitle).trim().toLowerCase());
  });
  // Front matter dates are read as midnight UTC; print them in UTC so the day never shifts.
  eleventyConfig.addFilter('iso_date', (d) => (d ? new Date(d).toISOString().slice(0, 10) : ''));
  // Sort collection items by a front matter field, oldest/smallest first: `items | sort_data: "end_date"`.
  eleventyConfig.addFilter('sort_data', (items, key) => [...(items || [])].sort((a, b) => {
    const x = a.data[key], y = b.data[key];
    return x instanceof Date || y instanceof Date ? new Date(x || 0) - new Date(y || 0) : String(x ?? '').localeCompare(String(y ?? ''));
  }));
  eleventyConfig.addFilter('year', (d) => (d ? String(new Date(d).getUTCFullYear()) : ''));

  // ---- Collections ----------------------------------------------------------------------------
  // Ordered by file name, as Jekyll did (Eleventy's default order uses file dates, which differ per clone).
  const folder = (name) => (api) => api.getFilteredByGlob(`content/${name}/*.{md,html}`)
    .sort((a, b) => a.inputPath.localeCompare(b.inputPath));
  const byDateDesc = (key) => (items) => items.sort((a, b) => new Date(b.data[key] || 0) - new Date(a.data[key] || 0));
  eleventyConfig.addCollection('projects', folder('projects'));
  eleventyConfig.addCollection('paperWebsites', (api) => byDateDesc('release_date')(folder('paper-websites')(api)));
  eleventyConfig.addCollection('mscFinished', (api) => byDateDesc('end_date')(folder('msc-finished')(api)));
  eleventyConfig.addCollection('mscAvailable', folder('msc-available'));
  eleventyConfig.addCollection('workshops', (api) => byDateDesc('date')(folder('workshops')(api)));
  eleventyConfig.addCollection('news', (api) => byDateDesc('date')(folder('news')(api)));
  eleventyConfig.addCollection('people', folder('people'));
  eleventyConfig.addCollection('robots', folder('robots'));
  eleventyConfig.addCollection('researchAreas', folder('research-areas'));
  eleventyConfig.addCollection('talks', (api) => byDateDesc('date')(folder('talks')(api)));
  // Old URLs that now redirect: `redirect_from` on a page, plus content/_data/redirects.yaml.
  eleventyConfig.addCollection('redirects', (api) => {
    const list = [];
    for (const item of api.getAll()) {
      for (const from of [].concat(item.data.redirect_from || [])) list.push({ from, to: item.url });
    }
    for (const r of api.getAll()[0]?.data.redirects || []) list.push(r);
    return list;
  });

  // ---- Output ---------------------------------------------------------------------------------
  eleventyConfig.addTransform('media', mediaTransform);
  eleventyConfig.addTransform('images', imageTransform);

  // Static files are copied as they are; their URLs never change.
  eleventyConfig.addPassthroughCopy({ assets: 'assets' });
  eleventyConfig.addPassthroughCopy({ 'content/CNAME': 'CNAME' });
  eleventyConfig.addPassthroughCopy({ 'src/css': 'assets/site/css', 'src/js': 'assets/site/js', 'src/fonts': 'assets/site/fonts' });
  // Fonts and libraries are served from this site, not from Google or a CDN.
  eleventyConfig.addPassthroughCopy({
    'node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2': 'assets/vendor/bootstrap-icons/bootstrap-icons.woff2',
    'node_modules/katex/dist/katex.min.css': 'assets/vendor/katex/katex.min.css',
    'node_modules/katex/dist/katex.min.js': 'assets/vendor/katex/katex.min.js',
    'node_modules/katex/dist/contrib/auto-render.min.js': 'assets/vendor/katex/auto-render.min.js',
    'node_modules/katex/dist/fonts/*.woff2': 'assets/vendor/katex/fonts',
  });
  eleventyConfig.addWatchTarget('content/publications/');
  eleventyConfig.addWatchTarget('src/');

  return {
    dir: {
      input: 'content',
      includes: '../src/_includes',
      layouts: '../src/_layouts',
      data: '_data',
      output: '_site',
    },
    templateFormats: ['md', 'html', 'liquid'],
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'liquid',
  };
}
