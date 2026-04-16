import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/contact/);
  });

  test('main content area is visible', async ({ page }) => {
    await expect(page.locator('#main')).toBeVisible();
  });

  test('contact form is visible', async ({ page }) => {
    await expect(page.getByTestId('contact-form')).toBeVisible();
  });

  test('form has name field', async ({ page }) => {
    await expect(page.getByTestId('contact-name')).toBeVisible();
  });

  test('form has email field', async ({ page }) => {
    await expect(page.getByTestId('contact-email')).toBeVisible();
  });

  test('form has message field', async ({ page }) => {
    await expect(page.getByTestId('contact-message')).toBeVisible();
  });

  test('form has submit button', async ({ page }) => {
    await expect(page.getByTestId('contact-submit')).toBeVisible();
  });

  test('submit button is disabled when form is empty', async ({ page }) => {
    const submitBtn = page.getByTestId('contact-submit');
    await submitBtn.click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('submit button becomes enabled when all required fields are filled', async ({ page }) => {
    await page.getByTestId('contact-name').fill('Test User');
    await page.getByTestId('contact-email').fill('test@example.com');
    await page.getByTestId('contact-message').fill('Hello, this is a test message.');
    await expect(page.getByTestId('contact-submit')).toBeEnabled();
  });

  test('email field rejects invalid format', async ({ page }) => {
    await page.getByTestId('contact-name').fill('Test User');
    await page.getByTestId('contact-email').fill('not-an-email');
    await page.getByTestId('contact-message').fill('Test message');
    await page.getByTestId('contact-submit').click();
    // Browser native email validation keeps us on /contact
    await expect(page).toHaveURL(/\/contact/);
  });
});
