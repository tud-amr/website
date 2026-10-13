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
