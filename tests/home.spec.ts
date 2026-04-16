import { test, expect } from '@playwright/test';
import { listenForConsoleErrors } from './helpers';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads successfully', async ({ page }) => {
    // Use regex to tolerate any query params added by proxies/analytics
    await expect(page).toHaveURL(/manuelaklenke\.com/);
    await expect(page).not.toHaveTitle('');
  });

  test('page has no critical console errors', async ({ page }) => {
    const getErrors = listenForConsoleErrors(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(await getErrors()).toHaveLength(0);
  });

  test('main content area is visible', async ({ page }) => {
    await expect(page.locator('#main')).toBeVisible();
  });
});
