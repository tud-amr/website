// Browser tests for the built site (run `npm run build` first; `npm test` does both).
// The site is served from _site/ by a small server that behaves like GitHub Pages.
import { defineConfig, devices } from '@playwright/test';

const PORT = 8095;

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    ...devices['Desktop Chrome'],
  },
  webServer: {
    command: `node scripts/lib/serve.mjs _site ${PORT}`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
  },
});
