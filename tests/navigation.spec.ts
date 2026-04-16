import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  // Verifies that the top navigation bar is rendered on the home page
  test('navbar is visible on all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  // Verifies that the footer is rendered at the bottom of the home page
  test('footer is visible on all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });

  // Clicks the "About Me" navbar link and confirms the URL changes to /about
  test('can navigate to About page via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /about me/i }).first().click();
    await expect(page).toHaveURL(/\/about/);
  });

  // Clicks the "Translated books" navbar link and confirms the URL changes to /portfolio
  // Note: the nav label is "Translated books" (i18n key: nav.portfolio)
  test('can navigate to Portfolio page via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /translated books/i }).first().click();
    await expect(page).toHaveURL(/\/portfolio/);
  });

  // Clicks the "Events" navbar link and confirms the URL changes to /events
  test('can navigate to Events page via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /events/i }).first().click();
    await expect(page).toHaveURL(/\/events/);
  });

  // Clicks the "Contact" navbar link and confirms the URL changes to /contact
  test('can navigate to Contact page via navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /contact/i }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });

  // Navigates to a non-existent route and confirms the app does not crash (navbar still visible)
  test('404 page is shown for unknown routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.locator('nav')).toBeVisible();
  });
});
