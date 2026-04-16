import { test, expect } from '@playwright/test';

test.describe('Portfolio Page', () => {
  // Confirms the portfolio page loads at /portfolio and the main content area is rendered
  test('page loads successfully', async ({ page }) => {
    await page.goto('/portfolio');
    await expect(page).toHaveURL(/\/portfolio/);
    await expect(page.locator('#main')).toBeVisible();
  });
});
