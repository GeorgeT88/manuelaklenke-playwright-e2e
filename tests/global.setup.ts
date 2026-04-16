import { chromium, FullConfig } from '@playwright/test';
import path from 'path';

export const STORAGE_STATE = path.join(__dirname, '../.auth/state.json');

/**
 * Global setup: handles corporate Zscaler proxy interception.
 * If the proxy shows a warning page for manuelaklenke.com, this clicks
 * "Continue" and saves the resulting cookies so all tests can reuse them.
 */
async function globalSetup(_config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://manuelaklenke.com', { waitUntil: 'domcontentloaded' });

  // Zscaler shows a warning page — click Continue if present
  const continueButton = page.getByRole('button', { name: 'Continue' });
  if (await continueButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await continueButton.click();
    await page.waitForURL(/manuelaklenke\.com(?!\?_sm_nck)/, { timeout: 15000 });
  }

  // Save cookies so all browser contexts reuse them
  await page.context().storageState({ path: STORAGE_STATE });
  await browser.close();
}

export default globalSetup;
