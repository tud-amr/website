// Loading and checking all site content.
//
// Every content type has a schema below. `validateContent()` checks required fields,
// allowed values, IDs that point at other content, and local /assets/ files, and returns
// readable errors ("content/people/x.md: `joined_date` is required"). The build fails on
// any error (see eleventy.config.js), and `npm run validate` runs the same checks alone.

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import matter from 'gray-matter';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const CONTENT = path.join(ROOT, 'content');
const rel = (p) => path.relative(ROOT, p);

// ---------------------------------------------------------------------------------------------
// Field types. Each returns an error message, or nothing when the value is fine.

const isDate = (v) => {
  if (v instanceof Date) return !Number.isNaN(v.getTime());
  const m = typeof v === 'string' && /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (!m) return false;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3]; // rejects e.g. 2024-02-30
};
const t = {
  string: (v) => (typeof v === 'string' ? null : 'must be text'),
  text: (v) => (typeof v === 'string' && v.trim() ? null : 'must be non-empty text'),
  bool: (v) => (typeof v === 'boolean' ? null : 'must be true or false'),
  date: (v) => (isDate(v) ? null : 'must be a date like 2026-01-31'),
  oneOf: (...options) => (v) => (options.includes(v) ? null : `must be one of: ${options.join(', ')}`),
  list: (item = t.string) => (v) => {
    if (!Array.isArray(v)) return 'must be a list, e.g. [] or [a, b]';
    for (const [i, x] of v.entries()) {
      const e = item(x);
      if (e) return `item ${i + 1} ${e}`;
    }
    return null;
  },
  object: (shape, { optional = [] } = {}) => (v) => {
    if (!v || typeof v !== 'object' || Array.isArray(v)) return `must be a group of fields (${Object.keys(shape).join(', ')})`;
    for (const [k, check] of Object.entries(shape)) {
      if (!(k in v) || v[k] == null) {
        if (!optional.includes(k)) return `needs \`${k}\``;
        continue;
      }
      const e = check(v[k]);
      if (e) return `\`${k}\` ${e}`;
    }
    const extra = Object.keys(v).filter((k) => !(k in shape));
    return extra.length ? `has unknown field(s): ${extra.join(', ')}` : null;
  },
  // A link written as `- name: url` (one per item), as used by publications.
  namedLink: (v) => {
    if (!v || typeof v !== 'object' || Array.isArray(v) || Object.keys(v).length !== 1) {
      return 'must be one link per item, like `- pdf: /assets/files/publications/x.pdf`';
    }
    const url = Object.values(v)[0];
    return typeof url === 'string' && url.trim() ? null : 'needs a URL after the name';
  },
};
const link = t.object({ name: t.text, url: t.text }, {});
// `url` may be left out for a link that is not available yet, e.g. "arXiv (coming soon)".
const iconLink = t.object({ name: t.text, url: t.string, icon: t.string }, { optional: ['icon', 'url'] });
const person = t.object({ name: t.text, url: t.string, superscript: t.string }, { optional: ['url', 'superscript'] });

// ---------------------------------------------------------------------------------------------
// Schemas. `required` fields must be present (they may be empty only where the type allows),
// `optional` fields may be left out. `strict` types reject unknown fields, to catch typos.

const PAGE_FIELDS = {
  layout: t.string, permalink: t.string, sitemap: t.bool, hidden: t.bool, usemathjax: t.bool, usekatex: t.bool,
  redirect_from: t.list(), redirect_to: t.string, eleventyExcludeFromCollections: t.bool,
};

export const SCHEMAS = {
  publications: {
    strict: true,
    required: {
      title: t.text, authors: t.list(t.text), date: t.date,
      type: t.oneOf('journal', 'conference', 'workshop', 'thesis', 'other'), venue: t.string,
      projects: t.list(t.text), collections: t.list(t.text), funding: t.list(t.text), topics: t.list(t.text),
      image: t.string, note: t.string, links: t.list(t.namedLink), abstract: t.string, bibtex: t.string,
    },
    optional: {},
  },
  people: {
    required: {
      name: t.text, title: t.text, joined_date: t.date,
      type: t.oneOf('professor', 'post-doc', 'phd-candidate', 'engineer', 'phd-visitor'),
    },
    optional: {
      left_date: t.date, image: t.string, links: t.list(link), now_at: t.string, short_bio: t.string,
      preferred_link: t.string, is_past_member: t.bool,
    },
  },
  projects: {
    required: {
      title: t.text, project_id: t.text, belongs_to_areas: t.list(t.text), date: t.date, description: t.string,
      image: t.string, fundings: t.string, people: t.list(t.object({ name: t.text, extra_info: t.string }, { optional: ['extra_info'] })),
    },
    optional: { end_date: t.date, links: t.list(link), subtitle: t.string, ...PAGE_FIELDS },
  },
  'research-areas': {
    required: { title: t.text, subtitle: t.string, area_id: t.text },
    optional: {},
  },
  robots: {
    required: {
      name: t.text, subtitle: t.string, image: t.string, used_in_projects: t.list(t.text),
      type: t.oneOf('ground robot', 'flying robot', 'manipulator', 'mobile manipulator', 'autonomous vehicle'),
    },
    optional: {},
  },
  news: { required: { title: t.text, date: t.date }, optional: {} },
  talks: {
    required: { title: t.text, date: t.date, speaker: t.text, recording: t.text },
    optional: { abstract: t.string },
  },
  'paper-websites': {
    required: {
      title: t.text, authors: t.list(person), affiliations: t.list(person), release_date: t.date,
      links: t.list(iconLink),
    },
    optional: {
      related: t.object({ projects: t.list(t.text), collections: t.list(t.text), papers: t.list(t.text) },
        { optional: ['projects', 'collections', 'papers'] }),
      ...PAGE_FIELDS,
    },
  },
  'msc-finished': {
    required: {
      title: t.text, authors: t.list(person), affiliations: t.list(person), end_date: t.date,
      description: t.string, cover_image: t.string,
    },
    optional: { links: t.list(iconLink), ...PAGE_FIELDS },
  },
  'msc-available': {
    required: { title: t.text, direct_supervisors: t.list(t.object({ name: t.text, url: t.string }, { optional: ['url'] })), display: t.bool },
    optional: { proposal_document: t.string, ...PAGE_FIELDS },
  },
  workshops: {
    required: { title: t.text, venue: t.text, location: t.text, date: t.date, time: t.text },
    optional: { ...PAGE_FIELDS },
  },
};

// ---------------------------------------------------------------------------------------------
// Loading.

const readYaml = (file) => yaml.load(fs.readFileSync(file, 'utf8'));

/** Every publication, newest first. Each gets `id` (its file name) and `file`. */
export function loadPublications() {
  const dir = path.join(CONTENT, 'publications');
  const items = [];
  for (const year of fs.readdirSync(dir).filter((d) => /^\d{4}$/.test(d)).sort()) {
    for (const name of fs.readdirSync(path.join(dir, year)).filter((f) => f.endsWith('.yaml')).sort()) {
      const file = path.join(dir, year, name);
      let data;
      try {
        data = readYaml(file) || {};
      } catch (e) {
        data = { __error: `is not valid YAML: ${e.reason || e.message} (line ${e.mark ? e.mark.line + 1 : '?'})` };
      }
      items.push({ ...data, id: name.replace(/\.yaml$/, ''), file: rel(file), folder: year });
    }
  }
  const time = (d) => new Date(d).getTime() || 0;
  return items.sort((a, b) => time(b.date) - time(a.date) || a.id.localeCompare(b.id));
}

/** Front matter of every file in a content folder, e.g. loadFolder('people'). */
export function loadFolder(folder) {
  const dir = path.join(CONTENT, folder);
  return fs.readdirSync(dir).filter((f) => /\.(md|html)$/.test(f)).sort().map((name) => {
    const file = path.join(dir, name);
    try {
      return { data: matter.read(file).data, file: rel(file) };
    } catch (e) {
      return { data: {}, file: rel(file), error: `front matter is not valid YAML: ${e.reason || e.message}` };
    }
  });
}

export const loadCollections = () => readYaml(path.join(CONTENT, '_data/collections.yaml')) || {};

// ---------------------------------------------------------------------------------------------
// Checking.

function checkFields(file, data, schema, errors) {
  for (const [key, check] of Object.entries(schema.required)) {
    if (!(key in data)) {
      errors.push(`${file}: \`${key}\` is required${schema.strict ? ' (write it empty, e.g. [] or "", if it does not apply)' : ''}`);
    } else if (data[key] === null) {
      errors.push(`${file}: \`${key}\` is empty; write [] or "" instead of leaving it blank`);
    } else {
      const e = check(data[key]);
      if (e) errors.push(`${file}: \`${key}\` ${e}`);
    }
  }
  for (const [key, check] of Object.entries(schema.optional)) {
    if (key in data && data[key] != null) {
      const e = check(data[key]);
      if (e) errors.push(`${file}: \`${key}\` ${e}`);
    }
  }
  if (schema.strict) {
    const known = new Set([...Object.keys(schema.required), ...Object.keys(schema.optional)]);
    for (const key of Object.keys(data)) {
      if (!known.has(key)) errors.push(`${file}: unknown field \`${key}\` (typo? allowed: ${[...known].join(', ')})`);
    }
  }
}

// Every string that points at a local file (/assets/...) must exist.
function checkLocalFiles(file, value, errors) {
  if (typeof value === 'string') {
    if (value.startsWith('/assets/')) {
      const target = path.join(ROOT, decodeURI(value.split(/[?#]/)[0]));
      if (!fs.existsSync(target)) errors.push(`${file}: file not found: ${value}`);
    }
  } else if (Array.isArray(value)) value.forEach((v) => checkLocalFiles(file, v, errors));
  else if (value && typeof value === 'object' && !(value instanceof Date)) Object.values(value).forEach((v) => checkLocalFiles(file, v, errors));
}

/** Check all content. Returns { errors: string[] }. */
export function validateContent() {
  const errors = [];
  const folders = {};
  for (const folder of Object.keys(SCHEMAS).filter((f) => f !== 'publications')) {
    folders[folder] = loadFolder(folder);
    for (const { data, file, error } of folders[folder]) {
      if (error) { errors.push(`${file}: ${error}`); continue; }
      checkFields(file, data, SCHEMAS[folder], errors);
      checkLocalFiles(file, data, errors);
    }
  }

  // IDs other content points at.
  const unique = (folder, key) => {
    const seen = new Map();
    for (const { data, file } of folders[folder]) {
      if (!data[key]) continue;
      if (seen.has(data[key])) errors.push(`${file}: \`${key}\` "${data[key]}" is already used by ${seen.get(data[key])}`);
      seen.set(data[key], file);
    }
    return new Set(seen.keys());
  };
  const projectIds = unique('projects', 'project_id');
  const areaIds = unique('research-areas', 'area_id');
  let collectionIds = new Set();
  try {
    const registry = loadCollections();
    for (const [id, c] of Object.entries(registry)) {
      if (!c || typeof c.title !== 'string') errors.push(`content/_data/collections.yaml: \`${id}\` needs a \`title\``);
    }
    collectionIds = new Set(Object.keys(registry));
  } catch (e) {
    errors.push(`content/_data/collections.yaml: is not valid YAML: ${e.reason || e.message}`);
  }

  const refs = (file, kind, values, known, where) => {
    for (const v of values || []) {
      if (!known.has(v)) errors.push(`${file}: ${kind} "${v}" does not exist (known: ${[...known].sort().join(', ')})${where ? `; ${where}` : ''}`);
    }
  };

  const publications = loadPublications();
  const publicationIds = new Set(publications.map((p) => p.id));
  for (const p of publications) {
    if (p.__error) { errors.push(`${p.file}: ${p.__error}`); continue; }
    const { id, file, folder, ...data } = p;
    checkFields(file, data, SCHEMAS.publications, errors);
    checkLocalFiles(file, data, errors);
    if (isDate(data.date) && String(new Date(data.date).getUTCFullYear()) !== folder) {
      errors.push(`${file}: date is in ${new Date(data.date).getUTCFullYear()}, so the file belongs in content/publications/${new Date(data.date).getUTCFullYear()}/`);
    }
    if (Array.isArray(data.projects)) refs(file, 'project', data.projects, projectIds, 'project IDs are the `project_id` of a file in content/projects/');
    if (Array.isArray(data.collections)) refs(file, 'collection', data.collections, collectionIds, 'add it to content/_data/collections.yaml first');
  }

  for (const { data, file } of folders.projects) refs(file, 'research area', data.belongs_to_areas, areaIds);
  for (const { data, file } of folders.robots) refs(file, 'project', data.used_in_projects, projectIds);
  for (const { data, file } of folders['paper-websites']) {
    const r = data.related || {};
    refs(file, 'project', r.projects, projectIds);
    refs(file, 'collection', r.collections, collectionIds);
    refs(file, 'publication', r.papers, publicationIds, 'use the publication file name without .yaml');
  }
  return { errors };
}
