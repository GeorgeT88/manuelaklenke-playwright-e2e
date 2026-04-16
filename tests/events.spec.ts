import { test, expect } from '@playwright/test';
import { listenForConsoleErrors } from './helpers';

test.describe('Events Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/events');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/events/);
  });

  test('main content area is visible', async ({ page }) => {
    await expect(page.locator('#main')).toBeVisible();
  });

  test('page has no critical console errors', async ({ page }) => {
    const getErrors = listenForConsoleErrors(page);
    await page.goto('/events');
    await page.waitForLoadState('networkidle');
    expect(await getErrors()).toHaveLength(0);
  });
});
