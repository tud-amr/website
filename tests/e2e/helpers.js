import fs from 'node:fs';

/** Every page in the sitemap, as a path ("/people/"). */
export function sitemapPages() {
  const xml = fs.readFileSync('_site/sitemap.xml', 'utf8');
  return [...xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1]);
}

/** Pages built from the site's own templates (paper websites and workshops also contain authors' own HTML). */
export const TEMPLATE_PAGES = ['/', '/research/', '/people/', '/publications/', '/robots/', '/education/', '/vacancies/',
  '/events/', '/student-projects/', '/msc_projects_finished/', '/paper_websites/', '/projects/interact.html', '/404.html'];

/** Never leave the local site during tests (redirect pages point at the live domain). */
export async function stayLocal(page) {
  await page.route(/^https?:\/\/(?!localhost)/, (route) => route.abort());
}
