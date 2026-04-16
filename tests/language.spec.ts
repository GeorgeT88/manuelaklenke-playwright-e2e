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

  // Confirms the language switcher button is visible in the navbar on page load
  test('language switcher button is visible in the navbar', async ({ page }) => {
    await expect(getLangButton(page)).toBeVisible();
  });

  // Opens the language dropdown and confirms all three supported languages are listed (EN, RO, DE)
  test('language dropdown offers three language options', async ({ page }) => {
    await getLangButton(page).click();
    await expect(page.getByRole('menuitem', { name: 'English' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Romana' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Deutsch' })).toBeVisible();
  });

  // Selects English from the dropdown and confirms the language button label updates to "EN"
  test('switching to English updates the navbar language button', async ({ page }) => {
    const btn = getLangButton(page);
    await btn.click();
    await page.getByRole('menuitem', { name: 'English' }).click();
    await expect(btn).toContainText('EN');
  });

  // Selects Deutsch from the dropdown and confirms the language button label updates to "DE"
  test('switching to Deutsch updates the navbar language button', async ({ page }) => {
    const btn = getLangButton(page);
    await btn.click();
    await page.getByRole('menuitem', { name: 'Deutsch' }).click();
    await expect(btn).toContainText('DE');
  });
});
