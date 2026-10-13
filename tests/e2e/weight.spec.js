// Page weight budgets: megabytes received on first load (until the load event + 1 s, no
// scrolling), at phone and desktop width. Raise a budget only with a reason in the commit.
import { test, expect } from '@playwright/test';
import { stayLocal } from './helpers.js';

const BUDGETS_MB = {
  '/': 1.5,
  '/publications/': 2,
  '/research/': 2.5,
  '/people/': 2.5,
  '/robots/': 3,
  '/projects/trilogy.html': 4,
  '/paper_websites/aerial-manipulation-marl.html': 4,
  '/paper_websites/sadcher_MRTA/': 4,
};

for (const width of [390, 1280]) {
  for (const [path, budget] of Object.entries(BUDGETS_MB)) {
    test(`${path} at ${width} px stays under ${budget} MB`, async ({ page, context }) => {
      await page.setViewportSize({ width, height: 900 });
      await stayLocal(page);
      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable');
      let bytes = 0;
      cdp.on('Network.dataReceived', (e) => { bytes += e.encodedDataLength; });
      await page.goto(path, { waitUntil: 'load' });
      await page.waitForTimeout(1000);
      const mb = bytes / 1e6;
      test.info().annotations.push({ type: 'weight', description: `${mb.toFixed(2)} MB` });
      expect(mb, `${path} loaded ${mb.toFixed(2)} MB at ${width} px`).toBeLessThan(budget);
    });
  }
}
