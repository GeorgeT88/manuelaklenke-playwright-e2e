import { test, expect } from '@playwright/test';

const publicPages = ['/', '/about', '/portfolio', '/events', '/contact'];

test.describe('Accessibility', () => {
  for (const path of publicPages) {
    // Confirms a visually hidden "skip to content" link exists in the DOM for keyboard users
    test(`skip-to-content link exists on ${path}`, async ({ page }) => {
      await page.goto(path);
      const skipLink = page.getByRole('link', { name: /skip/i });
      await expect(skipLink).toBeAttached();
    });

    // Confirms every <img> element on the page has an alt attribute (required for screen readers)
    test(`all images have alt text on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      const imagesWithoutAlt = await page.locator('img:not([alt])').count();
      expect(imagesWithoutAlt).toBe(0);
    });
  }
});
