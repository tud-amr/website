// Accessibility: no serious or critical axe-core violations on pages built from the site's own
// templates. (Paper websites and workshop pages contain authors' own HTML and are not checked here.)
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { TEMPLATE_PAGES, stayLocal } from './helpers.js';

// The publications page has ~190 entries; axe needs more than the default minute on a busy machine.
test.setTimeout(120_000);

for (const theme of ['light', 'dark']) for (const path of TEMPLATE_PAGES) {
  test(`${path} (${theme} theme) has no serious accessibility problems`, async ({ page }) => {
    await stayLocal(page);
    if (theme === 'dark') await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).analyze();
    const serious = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    const report = serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length}x, e.g. ${v.nodes[0].target.join(' ')})`);
    expect(report, report.join('\n')).toEqual([]);
  });
}
