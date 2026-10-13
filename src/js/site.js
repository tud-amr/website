// autonomousrobots.nl — the site's only script. Everything still works without it, except the
// folding phone menu, the publication search/filters and the research-area filter.
(() => {
  'use strict';

  // ---- Phone menu ------------------------------------------------------------------------------
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  // Close the "Group" dropdown when clicking elsewhere or pressing Escape.
  const dropdowns = [...document.querySelectorAll('.nav-dropdown details')];
  document.addEventListener('click', (e) => dropdowns.forEach((d) => { if (!d.contains(e.target)) d.open = false; }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') dropdowns.forEach((d) => { d.open = false; }); });

  // ---- Abstract and cite toggles on publications -------------------------------------------------
  document.addEventListener('click', (e) => {
    const button = e.target.closest('.pub-toggle');
    if (!button) return;
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  });

  // ---- Videos play only while visible ----------------------------------------------------------
  // Autoplaying videos are marked data-autoplay by the build (src/lib/media.mjs) instead of
  // autoplay, so they do not all download at once.
  const videos = document.querySelectorAll('video[data-autoplay]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (videos.length && 'IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) target.play().catch(() => {});
        else target.pause();
      }
    }, { rootMargin: '200px 0px' });
    videos.forEach((v) => observer.observe(v));
  }

  // ---- YouTube embeds load only when clicked ---------------------------------------------------
  document.addEventListener('click', (e) => {
    const facade = e.target.closest('.yt-facade');
    if (!facade) return;
    const iframe = document.createElement('iframe');
    iframe.src = facade.dataset.src + (facade.dataset.src.includes('?') ? '&' : '?') + 'autoplay=1';
    iframe.title = facade.getAttribute('aria-label') || 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    for (const attr of ['class', 'style', 'width', 'height']) if (facade.dataset[attr]) iframe.setAttribute(attr, facade.dataset[attr]);
    facade.replaceWith(iframe);
  });

  // ---- Photo carousels (robots page) -----------------------------------------------------------
  // The photos are a horizontal strip that can be swiped or scrolled; the buttons and dots move it.
  for (const carousel of document.querySelectorAll('[data-carousel]')) {
    const track = carousel.querySelector('.carousel-track');
    const slides = [...track.children];
    const prev = carousel.querySelector('.carousel-prev');
    const next = carousel.querySelector('.carousel-next');
    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show photo ${i + 1}`);
      dot.addEventListener('click', () => go(i));
      carousel.querySelector('.carousel-dots').append(dot);
      return dot;
    });
    const current = () => Math.round(track.scrollLeft / track.clientWidth);
    const go = (i) => track.scrollTo({ left: Math.max(0, Math.min(i, slides.length - 1)) * track.clientWidth });
    const update = () => {
      const i = current();
      dots.forEach((d, j) => d.setAttribute('aria-current', String(i === j)));
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    };
    prev.addEventListener('click', () => go(current() - 1));
    next.addEventListener('click', () => go(current() + 1));
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
    });
    let ticking;
    track.addEventListener('scroll', () => { cancelAnimationFrame(ticking); ticking = requestAnimationFrame(update); });
    update();
  }

  // ---- Publications: search and filters --------------------------------------------------------
  const form = document.querySelector('[data-pub-filters]');
  if (form) {
    const items = [...document.querySelectorAll('[data-pub-list] .pub')];
    const groups = [...document.querySelectorAll('[data-year-group]')];
    const status = document.querySelector('[data-pub-status]');
    const empty = document.querySelector('[data-pub-empty]');
    const fields = ['q', 'year', 'type', 'project', 'collection'];
    const input = (name) => form.elements[name];

    const read = () => Object.fromEntries(fields.map((f) => [f, input(f).value.trim()]));
    const apply = () => {
      const f = read();
      const terms = f.q.toLowerCase().split(/\s+/).filter(Boolean);
      let shown = 0;
      for (const item of items) {
        const d = item.dataset;
        const match = terms.every((t) => d.search.includes(t))
          && (!f.year || d.year === f.year)
          && (!f.type || d.type === f.type)
          && (!f.project || d.projects.split(' ').includes(f.project))
          && (!f.collection || d.collections.split(' ').includes(f.collection));
        item.hidden = !match;
        if (match) shown++;
      }
      for (const g of groups) g.hidden = !g.querySelector('.pub:not([hidden])');
      empty.hidden = shown > 0;

      // Status line, with a removable chip for a collection (it has no select of its own).
      const filtered = fields.some((k) => f[k]);
      status.querySelectorAll('.status-text, .chip').forEach((n) => n.remove());
      if (filtered) {
        const text = document.createElement('span');
        text.className = 'status-text';
        text.textContent = `Showing ${shown} of ${items.length} publications.`;
        status.append(text);
      }
      if (f.collection) {
        const title = status.querySelector(`[data-collection-title="${CSS.escape(f.collection)}"]`);
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.innerHTML = `Collection: <strong></strong> <a href="#" aria-label="Remove collection filter">×</a>`;
        chip.querySelector('strong').textContent = title ? title.textContent : f.collection;
        chip.querySelector('a').addEventListener('click', (e) => { e.preventDefault(); input('collection').value = ''; update(); });
        status.append(chip);
      }
    };

    // Keep the filters in the URL, e.g. /publications/?q=mpc&year=2025
    const update = () => {
      apply();
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(read())) if (v) params.set(k, v);
      const query = params.toString();
      history.replaceState(null, '', location.pathname + (query ? `?${query}` : ''));
    };

    const load = () => {
      const params = new URLSearchParams(location.search);
      // Old links: /publications/#<search>#<year>
      if (location.hash.length > 1 && !document.getElementById(decodeURIComponent(location.hash.slice(1)))) {
        const [q = '', year = ''] = location.hash.slice(1).split('#');
        params.set('q', decodeURIComponent(q));
        if (year) params.set('year', year);
      }
      for (const f of fields) {
        const value = params.get(f) || '';
        const el = input(f);
        if (el.tagName === 'SELECT' && value && ![...el.options].some((o) => o.value === value)) continue;
        el.value = value;
      }
      update();
    };

    let timer;
    input('q').addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(update, 150); });
    form.addEventListener('change', update);
    window.addEventListener('hashchange', load);
    load();
  }

  // ---- Research: filter projects by area -------------------------------------------------------
  const areaFilter = document.querySelector('[data-area-filter]');
  if (areaFilter) {
    const buttons = [...areaFilter.querySelectorAll('[data-area]')];
    const intros = [...document.querySelectorAll('[data-area-intro]')];
    const projects = [...document.querySelectorAll('[data-area-list] [data-areas]')];
    const valid = new Set(buttons.map((b) => b.dataset.area));

    const show = (area) => {
      if (!valid.has(area)) area = 'all';
      for (const b of buttons) {
        const active = b.dataset.area === area;
        b.classList.toggle('is-active', active);
        if (active) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
      }
      for (const i of intros) i.hidden = i.dataset.areaIntro !== area;
      for (const p of projects) p.hidden = area !== 'all' && !p.dataset.areas.split(' ').includes(area);
    };
    // ?area=<id>, or the old /research/#<id>
    const current = () => new URLSearchParams(location.search).get('area') || decodeURIComponent(location.hash.slice(1)) || 'all';

    for (const b of buttons) {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        const area = b.dataset.area;
        history.pushState(null, '', location.pathname + (area === 'all' ? '' : `?area=${encodeURIComponent(area)}`));
        show(area);
      });
    }
    window.addEventListener('popstate', () => show(current()));
    window.addEventListener('hashchange', () => show(current()));
    if (location.hash.length > 1 && valid.has(decodeURIComponent(location.hash.slice(1)))) {
      history.replaceState(null, '', `${location.pathname}?area=${location.hash.slice(1)}`);
    }
    show(current());
  }
})();
