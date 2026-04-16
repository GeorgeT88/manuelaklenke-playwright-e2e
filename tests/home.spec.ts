import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  // Confirms the home page loads and has a non-empty title
  test('page loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/manuelaklenke\.com/);
    await expect(page).not.toHaveTitle('');
  });

  // Confirms the main content wrapper (#main) is rendered and visible
  test('main content area is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#main')).toBeVisible();
  });
});
