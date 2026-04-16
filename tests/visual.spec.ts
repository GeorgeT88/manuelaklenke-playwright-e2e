import { test, expect } from '@playwright/test';

/**
 * Visual regression tests — compare screenshots against stored snapshots.
 *
 * First run: snapshots don't exist yet, so the test fails and writes the baseline.
 * Run `npx playwright test tests/visual.spec.ts --update-snapshots` to regenerate
 * baselines after intentional UI changes.
 *
 * Animated or dynamic content (carousels, videos, maps) is masked so it doesn't
 * cause false positives on every run.
 */

const pages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'portfolio', path: '/portfolio' },
  { name: 'events', path: '/events' },
  { name: 'contact', path: '/contact' },
];

for (const { name, path } of pages) {
  test(`${name} page matches visual snapshot`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    // Mask elements that change on every render (timestamps, animated banners, etc.)
    const dynamicMasks = [
      page.locator('iframe'),
      page.locator('[class*="vercel"]'),
    ];

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      mask: dynamicMasks,
      // Allow up to 2% pixel difference to tolerate sub-pixel font rendering across OSes
      maxDiffPixelRatio: 0.02,
    });
  });
}
