import { test, expect, Page } from '@playwright/test';

/**
 * The site renders two language buttons in the nav: one for desktop (in the <ul>,
 * hidden on mobile) and one for mobile (in a sibling <div>, hidden on desktop).
 * Using :visible ensures we always interact with whichever one is actually shown.
 */
function getLangButton(page: Page) {
  return page.locator('nav button[aria-haspopup="true"]:visible').first();
}

test.describe('Language Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('language switcher button is visible in the navbar', async ({ page }) => {
    await expect(getLangButton(page)).toBeVisible();
  });

  test('language dropdown offers three language options', async ({ page }) => {
    await getLangButton(page).click();
    await expect(page.getByRole('menuitem', { name: 'English' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Romana' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Deutsch' })).toBeVisible();
  });

  test('switching to English updates the navbar language button', async ({ page }) => {
    const btn = getLangButton(page);
    await btn.click();
    await page.getByRole('menuitem', { name: 'English' }).click();
    await expect(btn).toContainText('EN');
  });

  test('switching to Deutsch updates the navbar language button', async ({ page }) => {
    const btn = getLangButton(page);
    await btn.click();
    await page.getByRole('menuitem', { name: 'Deutsch' }).click();
    await expect(btn).toContainText('DE');
  });
});
