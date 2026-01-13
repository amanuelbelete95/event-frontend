import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://157.180.20.112:4173/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
