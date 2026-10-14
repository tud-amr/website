import { test, expect } from '@playwright/test';
import { stayLocal } from './helpers.js';

test.beforeEach(async ({ page }) => stayLocal(page));

test('phone menu opens and the Group menu shows its pages', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('#nav-menu')).toBeHidden();
  await page.click('.nav-toggle');
  await expect(page.locator('#nav-menu')).toBeVisible();
  await page.click('.nav-dropdown summary');
  await page.click('.nav-dropdown a[href="/people/"]');
  await expect(page).toHaveURL(/\/people\/$/);
});

test('desktop Group dropdown closes with Escape', async ({ page }) => {
  await page.goto('/');
  await page.click('.nav-dropdown summary');
  await expect(page.locator('.nav-dropdown a[href="/robots/"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.nav-dropdown a[href="/robots/"]')).toBeHidden();
});

test('current page is marked in the menu', async ({ page }) => {
  await page.goto('/publications/');
  await expect(page.locator('.nav-links a[aria-current="page"]')).toHaveText('Publications');
});

test('YouTube embeds load only after a click, from youtube-nocookie', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0);
  const facade = page.locator('.yt-facade').first();
  await expect(facade).toBeVisible();
  await facade.click();
  await expect(page.locator('iframe[src*="youtube-nocookie.com"]')).toHaveCount(1);
});

test('unknown pages show the 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('404');
});

test('robots photo carousel moves with the buttons and dots', async ({ page }) => {
  await page.goto('/robots/');
  const track = page.locator('.carousel-track');
  const dots = page.locator('.carousel-dots button');
  await expect(page.locator('.carousel-prev')).toBeDisabled();
  await expect(dots.first()).toHaveAttribute('aria-current', 'true');
  await page.click('.carousel-next');
  await expect(dots.nth(1)).toHaveAttribute('aria-current', 'true');
  await dots.last().click();
  await expect(page.locator('.carousel-next')).toBeDisabled();
  expect(await track.evaluate((t) => t.scrollLeft)).toBeGreaterThan(0);
});

test('"Show all news" reveals the older news', async ({ page }) => {
  await page.goto('/');
  const older = page.locator('.more .timeline li');
  await expect(older.first()).toBeHidden();
  await page.click('.more summary');
  await expect(older.first()).toBeVisible();
});

test('home page shows the 4 latest publications with pictures, linking to them', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.latest-pub');
  await expect(cards).toHaveCount(4);
  const href = await cards.first().locator('a').getAttribute('href');
  expect(href).toMatch(/^\/publications\/#\d{4}-/);
  await cards.first().locator('a').click();
  await expect(page.locator(`[id="${href.split('#')[1]}"]`)).toBeInViewport();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
});

test('light theme by default; the switch turns dark on and is remembered', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.theme-toggle')).toHaveAttribute('aria-pressed', 'false');
  await page.click('.theme-toggle');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.theme-toggle')).toHaveAttribute('aria-pressed', 'true');
  await page.goto('/publications/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.click('.theme-toggle');
  await page.reload();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
});

test('paper pages keep their content light in the dark theme', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/paper_websites/codi.html');
  const bg = await page.locator('article.paper').evaluate((e) => getComputedStyle(e).backgroundColor);
  expect(bg).toBe('rgb(255, 255, 255)');
});

test('project pages follow the dark theme, with a light backing behind PNG figures', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('/projects/harmony.html');
  const bg = await page.locator('article.project').evaluate((e) => getComputedStyle(e).color);
  expect(bg).not.toBe('rgb(43, 40, 48)'); // not the light theme's text colour
  const figure = page.locator('.project-content img[data-transparent]').first();
  expect(await figure.evaluate((e) => getComputedStyle(e).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
});

for (const path of ['/', '/projects/harmony.html']) {
  test(`YouTube player on ${path} keeps the size of its preview`, async ({ page }) => {
    await page.route(/youtube-nocookie|ytimg/, (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '' }));
    await page.goto(path);
    const facade = page.locator('.yt-facade').first();
    await facade.scrollIntoViewIfNeeded();
    const before = await facade.boundingBox();
    await facade.click();
    const after = await page.locator('iframe[src*="youtube-nocookie"]').first().boundingBox();
    expect(Math.abs(after.width - before.width)).toBeLessThan(2);
    expect(Math.abs(after.height - before.height)).toBeLessThan(2);
  });
}
