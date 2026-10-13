import { test, expect } from '@playwright/test';
import { stayLocal } from './helpers.js';

test.beforeEach(async ({ page }) => stayLocal(page));
const projects = (page) => page.locator('[data-area-list] [data-areas]:visible');

test('area buttons filter projects and keep the area in the URL', async ({ page }) => {
  await page.goto('/research/');
  const total = await projects(page).count();
  await page.click('[data-area="flying-robots"]');
  await expect(page).toHaveURL(/\?area=flying-robots$/);
  await expect(page.locator('[data-area-intro="flying-robots"]')).toBeVisible();
  const count = await projects(page).count();
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThan(total);
  for (const areas of await projects(page).evaluateAll((els) => els.map((e) => e.dataset.areas))) expect(areas.split(' ')).toContain('flying-robots');
  await page.click('[data-area="all"]');
  await expect(page).toHaveURL(/\/research\/$/);
  await expect(projects(page)).toHaveCount(total);
});

test('old #area links still work', async ({ page }) => {
  await page.goto('/research/#mobile-manipulation');
  await expect(page).toHaveURL(/\?area=mobile-manipulation$/);
  await expect(page.locator('[data-area="mobile-manipulation"]')).toHaveClass(/is-active/);
});

test('back button returns to the previous area', async ({ page }) => {
  await page.goto('/research/');
  await page.click('[data-area="social-robots"]');
  await page.click('[data-area="flying-robots"]');
  await page.goBack();
  await expect(page.locator('[data-area="social-robots"]')).toHaveClass(/is-active/);
});

test('ongoing projects come first, finished ones by end date', async ({ page }) => {
  await page.goto('/research/');
  const metas = await page.locator('[data-area-list] .tile-meta:first-of-type').allInnerTexts();
  const finishedAt = metas.findIndex((m) => m.includes('Finished'));
  expect(finishedAt).toBeGreaterThan(0);
  expect(metas.slice(finishedAt).every((m) => m.includes('Finished'))).toBe(true);
});
