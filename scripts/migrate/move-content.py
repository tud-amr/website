"""One-time move of the Jekyll content folders into content/ (Phase 2 of the Eleventy port).

Files whose page URL comes from the file name are renamed to the slug Jekyll produced
(lower case, `_` -> `-`), so the new build can use the file name as the URL and every
existing URL stays the same. Uses `git mv` so history is kept. Run from the repo root.
"""
import os, re, subprocess

MOVES = {
    '_projects': 'content/projects',
    '_paper_websites': 'content/paper-websites',
    '_msc_projects_finished': 'content/msc-finished',
    '_msc_projects_available': 'content/msc-available',
    '_workshops': 'content/workshops',
    '_news': 'content/news',
    '_people': 'content/people',
    '_robots': 'content/robots',
    '_research_areas': 'content/research-areas',
    '_talks': 'content/talks',
}
# Collections that produce pages: their file name becomes part of the URL.
SLUGGED = {'_projects', '_paper_websites', '_msc_projects_finished', '_msc_projects_available', '_workshops'}

PAGES = {
    'index.html': 'index.html', 'research.html': 'research.html', 'people.html': 'people.html',
    'publications.html': 'publications.html', 'robots.html': 'robots.html', 'education.md': 'education.md',
    'vacancies.md': 'vacancies.md', 'events.md': 'events.md', 'student_projects.html': 'student-projects.html',
    'msc_thesis_finished.html': 'msc-finished.html', 'paper_websites_view.html': 'paper-websites.html',
    '404.html': '404.html',
}


def jekyll_slug(name):
    """Jekyll's default slugify: lower case, runs of non-alphanumerics become one hyphen."""
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def git_mv(src, dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    subprocess.run(['git', 'mv', src, dst], check=True)


for src_dir, dst_dir in MOVES.items():
    for name in sorted(os.listdir(src_dir)):
        stem, ext = os.path.splitext(name)
        if name == 'project tags':
            git_mv(f'{src_dir}/{name}', f'{dst_dir}/_project-ids-notes.txt')  # maintainer notes, not a page
            continue
        if not ext:  # e.g. msc_26_diego_interaction_mppi had no extension
            ext = '.md'
        new = (jekyll_slug(stem) if src_dir in SLUGGED else stem) + ext
        git_mv(f'{src_dir}/{name}', f'{dst_dir}/{new}')

for old, new in PAGES.items():
    git_mv(old, f'content/pages/{new}')

os.makedirs('content/_data', exist_ok=True)
for name in ('navigation.yml', 'socials.yml'):
    git_mv(f'_data/{name}', f'content/_data/{name[:-4]}.yaml')
