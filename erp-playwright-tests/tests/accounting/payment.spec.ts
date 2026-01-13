import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { CustomerPage } from '../pageObjects/CustomerPage';

// Test for verifying payment workflow in the accounting module
test.describe('Accounting Module - Payment Workflow', () => {
  test('should allow creating a new payment', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const customerPage = new CustomerPage(page);

    // Step 1: Login to the ERP system
    await loginPage.goto();
    await loginPage.login('admin', 'password123');

    // Step 2: Navigate to the accounting module
    await page.click('text=Accounting');

    // Step 3: Create a new payment
    await page.click('text=Payments');
    await page.click('text=New Payment');
    await page.fill('#amount', '1000');
    await page.fill('#description', 'Payment for Invoice #123');
    await page.click('text=Submit');

    // Step 4: Verify payment creation
    const successMessage = await page.locator('.success-message').textContent();
    expect(successMessage).toContain('Payment created successfully');
  });
});