import { test, expect } from '@playwright/test';
import { stayLocal } from './helpers.js';

test.beforeEach(async ({ page }) => stayLocal(page));

const visible = (page) => page.locator('[data-pub-list] .pub:visible');

test('lists every publication with its number', async ({ page }) => {
  await page.goto('/publications/');
  const total = await page.locator('[data-pub-list] .pub').count();
  expect(total).toBeGreaterThan(150);
  await expect(visible(page)).toHaveCount(total);
  await expect(page.locator('.pub-number').first()).toHaveText(/^[JCWTO]\d+\.$/);
});

test('search filters while typing, searches abstracts, and is kept in the URL', async ({ page }) => {
  await page.goto('/publications/');
  const total = await page.locator('[data-pub-list] .pub').count();
  await page.fill('#pub-q', 'scenario');
  await expect(page).toHaveURL(/\?q=scenario$/);
  const count = await visible(page).count();
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThan(total);
  for (const text of await visible(page).evaluateAll((els) => els.map((e) => e.dataset.search))) {
    expect(text).toContain('scenario');
  }
  // A word that only appears in an abstract.
  await page.fill('#pub-q', 'marginalization');
  await expect(visible(page)).not.toHaveCount(0);
});

test('year, type and project filters combine and are kept in the URL', async ({ page }) => {
  await page.goto('/publications/');
  await page.selectOption('#pub-year', '2024');
  await page.selectOption('#pub-type', 'journal');
  await expect(page).toHaveURL(/year=2024&type=journal/);
  for (const [year, type] of await visible(page).evaluateAll((els) => els.map((e) => [e.dataset.year, e.dataset.type]))) {
    expect(year).toBe('2024');
    expect(type).toBe('journal');
  }
  await expect(page.locator('[data-year-group]:visible')).toHaveCount(1);
  await page.selectOption('#pub-project', 'interact');
  for (const projects of await visible(page).evaluateAll((els) => els.map((e) => e.dataset.projects))) {
    expect(projects.split(' ')).toContain('interact');
  }
});

test('a shared URL opens with the same filters', async ({ page }) => {
  await page.goto('/publications/?q=alonso-mora&year=2023');
  await expect(page.locator('#pub-q')).toHaveValue('alonso-mora');
  await expect(page.locator('#pub-year')).toHaveValue('2023');
  await expect(page.locator('[data-pub-status]')).toContainText('Showing');
});

test('old #search#year links still work', async ({ page }) => {
  await page.goto('/publications/#alonso-mora#2024');
  await expect(page).toHaveURL(/\/publications\/\?q=alonso-mora&year=2024$/);
  for (const year of await visible(page).evaluateAll((els) => els.map((e) => e.dataset.year))) expect(year).toBe('2024');
});

test('collection links show only that collection, and the filter can be removed', async ({ page }) => {
  await page.goto('/publications/?collection=saraypapers');
  await expect(page.locator('.chip')).toContainText("Saray Bakker's papers");
  for (const c of await visible(page).evaluateAll((els) => els.map((e) => e.dataset.collections))) expect(c.split(' ')).toContain('saraypapers');
  await page.locator('.chip a').click();
  await expect(page).toHaveURL(/\/publications\/$/);
});

test('no matches shows a message', async ({ page }) => {
  await page.goto('/publications/?q=zzzznotawordzzzz');
  await expect(visible(page)).toHaveCount(0);
  await expect(page.locator('[data-pub-empty]')).toBeVisible();
});

test('abstract opens and closes', async ({ page }) => {
  await page.goto('/publications/');
  const button = page.locator('.pub-toggle').first();
  const panel = page.locator(`#${await button.getAttribute('aria-controls')}`);
  await expect(panel).toBeHidden();
  await button.click();
  await expect(panel).toBeVisible();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await button.click();
  await expect(panel).toBeHidden();
});

test('related publications on project pages are newest first', async ({ page }) => {
  await page.goto('/projects/interact.html');
  const years = await page.locator('.related .pub').evaluateAll((els) => els.map((e) => Number(e.dataset.year)));
  expect(years.length).toBeGreaterThan(3);
  expect(years).toEqual([...years].sort((a, b) => b - a));
});
