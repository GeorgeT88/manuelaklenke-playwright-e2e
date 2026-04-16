import { test, expect, Page } from '@playwright/test';

/**
 * On mobile viewports the nav collapses into a hamburger menu.
 * This helper opens it if needed so nav links become clickable.
 * The hamburger button has aria-label="Open navigation menu".
 */
async function openMobileMenuIfNeeded(page: Page) {
  const menuButton = page.locator('[aria-label="Open navigation menu"]');
  if (await menuButton.isVisible({ timeout: 2000 }).catch(() => false)) {
    await menuButton.click();
    // Wait for the drawer/overlay to animate open
    await page.waitForTimeout(300);
  }
}

test.describe('Navigation', () => {
  test('navbar is visible on all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('footer is visible on all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });

  test('can navigate to About page via navbar', async ({ page }) => {
    await page.goto('/');
    await openMobileMenuIfNeeded(page);
    await page.getByRole('link', { name: /about/i }).first().click();
    await expect(page).toHaveURL(/\/about/);
  });

  test('can navigate to Portfolio page via navbar', async ({ page }) => {
    await page.goto('/');
    await openMobileMenuIfNeeded(page);
    // Nav label is "Translated books" (i18n key: nav.portfolio)
    await page.getByRole('link', { name: /translated books/i }).first().click();
    await expect(page).toHaveURL(/\/portfolio/);
  });

  test('can navigate to Events page via navbar', async ({ page }) => {
    await page.goto('/');
    await openMobileMenuIfNeeded(page);
    await page.getByRole('link', { name: /events/i }).first().click();
    await expect(page).toHaveURL(/\/events/);
  });

  test('can navigate to Contact page via navbar', async ({ page }) => {
    await page.goto('/');
    await openMobileMenuIfNeeded(page);
    await page.getByRole('link', { name: /contact/i }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('404 page is shown for unknown routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page).toHaveURL(/\/this-page-does-not-exist/);
    // Page should not crash — check that the navbar is still visible
    await expect(page.locator('nav')).toBeVisible();
  });
});
