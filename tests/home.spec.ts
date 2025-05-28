import { test, expect } from '@playwright/test';

test('home page should render', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Your Nuxt App Title/);
});
