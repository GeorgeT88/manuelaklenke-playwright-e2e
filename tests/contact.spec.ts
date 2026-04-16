import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  // Confirms the contact form and all its fields (name, email, message, submit) are visible on the page
  test('contact form and all fields are visible', async ({ page }) => {
    await expect(page.getByTestId('contact-form')).toBeVisible();
    await expect(page.getByTestId('contact-name')).toBeVisible();
    await expect(page.getByTestId('contact-email')).toBeVisible();
    await expect(page.getByTestId('contact-message')).toBeVisible();
    await expect(page.getByTestId('contact-submit')).toBeVisible();
  });

  // Clicks submit with all fields empty and confirms the user stays on /contact (no accidental submission)
  test('submit does nothing when form is empty', async ({ page }) => {
    await page.getByTestId('contact-submit').click();
    await expect(page).toHaveURL(/\/contact/);
  });

  // Fills all required fields with valid data and confirms the submit button becomes enabled
  test('submit button becomes enabled when all required fields are filled', async ({ page }) => {
    await page.getByTestId('contact-name').fill('Test User');
    await page.getByTestId('contact-email').fill('test@example.com');
    await page.getByTestId('contact-message').fill('Hello, this is a test message.');
    await expect(page.getByTestId('contact-submit')).toBeEnabled();
  });

  // Enters an invalid email format and confirms the form does not submit (user stays on /contact)
  test('email field rejects invalid format', async ({ page }) => {
    await page.getByTestId('contact-name').fill('Test User');
    await page.getByTestId('contact-email').fill('not-an-email');
    await page.getByTestId('contact-message').fill('Test message');
    await page.getByTestId('contact-submit').click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
