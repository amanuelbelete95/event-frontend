import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';

test('Login fails with wrong credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('wrong@beffa.com', 'WrongPass123');
  await expect(page.getByText(/Invalid email or password/i)).toBeVisible();
});
