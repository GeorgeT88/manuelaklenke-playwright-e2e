import { test, expect } from '@playwright/test';
import { listenForConsoleErrors } from './helpers';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/about/);
  });

  test('main content area is visible', async ({ page }) => {
    await expect(page.locator('#main')).toBeVisible();
  });

  test('page has no critical console errors', async ({ page }) => {
    const getErrors = listenForConsoleErrors(page);
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    expect(await getErrors()).toHaveLength(0);
  });
});
