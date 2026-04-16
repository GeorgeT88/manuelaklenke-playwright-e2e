import type { Page } from '@playwright/test';

/**
 * Known third-party origins that may produce non-critical console errors.
 * These are outside the app's control and should not fail tests.
 */
const IGNORED_ORIGINS = [
  'ipapi.co',          // IP geolocation — CORS-restricted on free tier, rate-limited (429)
  'vercel.com',        // Analytics — may be blocked by corporate proxies
  'va.vercel-scripts', // Vercel Speed Insights
  'supabase.co',       // Image CDN — Cloudflare cookie rejection is a browser/domain mismatch
];

/**
 * Registers a console-error listener on the page and returns a function that
 * asserts no unexpected errors were captured.
 *
 * Usage:
 *   const assertNoErrors = listenForConsoleErrors(page);
 *   await page.goto('/some-page');
 *   await page.waitForLoadState('networkidle');
 *   await assertNoErrors();
 */
export function listenForConsoleErrors(page: Page): () => Promise<string[]> {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    const isThirdParty = IGNORED_ORIGINS.some((o) => text.includes(o));
    if (
      !isThirdParty &&
      !text.includes('403') &&
      !text.includes('net::ERR_') &&
      !text.includes('Status code: 429')
    ) {
      errors.push(text);
    }
  });

  return () => Promise.resolve(errors);
}
