// No page may scroll sideways on a phone or tablet.
import { test, expect } from '@playwright/test';
import { sitemapPages, stayLocal } from './helpers.js';

for (const width of [390, 768]) {
  test.describe(`at ${width} px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const path of sitemapPages()) {
      test(`${path} fits the screen`, async ({ page }) => {
        await stayLocal(page);
        await page.goto(path, { waitUntil: 'load' });
        await page.waitForTimeout(300); // fonts and math settle
        const overflow = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          if (document.documentElement.scrollWidth <= vw + 1) return null;
          const culprits = [...document.querySelectorAll('body *')].filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.right > vw + 1 && el.parentElement.getBoundingClientRect().right <= vw + 1;
          });
          return culprits.slice(0, 3).map((el) => `<${el.tagName.toLowerCase()} class="${el.className}"> ${Math.round(el.getBoundingClientRect().width)}px`);
        });
        expect(overflow, `elements wider than the screen: ${overflow}`).toBeNull();
      });
    }
  });
}
