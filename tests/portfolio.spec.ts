import { test, expect } from '@playwright/test';
import { listenForConsoleErrors } from './helpers';

test.describe('Portfolio Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portfolio');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/portfolio/);
  });

  test('main content area is visible', async ({ page }) => {
    await expect(page.locator('#main')).toBeVisible();
  });

  test('displays book cover images', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    const bookCovers = page.locator('#main img');
    await expect(bookCovers.first()).toBeVisible();
    const count = await bookCovers.count();
    expect(count).toBeGreaterThan(0);
  });

  test('book covers are clickable links to external pages', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    const bookLinks = page.locator('#main a[href]');
    const count = await bookLinks.count();
    expect(count).toBeGreaterThan(0);
    // Every link should point to an external URL
    const hrefs = await bookLinks.evaluateAll((els) =>
      els.map((el) => el.getAttribute('href') ?? '')
    );
    for (const href of hrefs) {
      expect(href).toMatch(/^https?:\/\//);
    }
  });

  test('page has no critical console errors', async ({ page }) => {
    const getErrors = listenForConsoleErrors(page);
    await page.goto('/portfolio');
    await page.waitForLoadState('networkidle');
    expect(await getErrors()).toHaveLength(0);
  });
});
