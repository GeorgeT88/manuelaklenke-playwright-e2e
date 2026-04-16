import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  // Confirms the about page loads at /about and the main content area is rendered
  test('page loads successfully', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator('#main')).toBeVisible();
  });
});
