import { test, expect } from '@playwright/test';
import { randomPhone, randomTIN, randomName } from '../utils/dataGenerator';
import { LoginPage } from '../pageObjects/LoginPage';
import { CustomerPage } from '../pageObjects/CustomerPage';

test.describe('Full CRM customer lifecycle flow', () => {
  let loginPage: LoginPage;
  let customerPage: CustomerPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    customerPage = new CustomerPage(page);

    await loginPage.goto();
    await loginPage.login('admin@beffa.com', 'Beff.$#!');
    await expect(page.getByText('Dashboard')).toBeVisible();
  });

  test('Create customer with invalid data', async ({ page }) => {
    await customerPage.gotoAddCustomer();
    await customerPage.fillCustomerForm({
      name: randomName(),
      phone: '12345',
      tin: 'abcde',
      region: 'Amhara Region',
      zone: 'North Wollo Zone',
      woreda: 'Lasta',
    });
    await customerPage.clickCreateCustomer();
    await expect(page.getByText(/Validation error|Invalid/)).toBeVisible();
    await expect(page).not.toHaveURL(/customers\/detail/);
  });

  test('Create, Update and Delete customer', async ({ page }) => {
    // Create customer with valid data
    await customerPage.gotoAddCustomer();
    const validName = randomName();
    const validPhone = randomPhone();
    const validTIN = randomTIN();
    await customerPage.createCustomer({
      name: validName,
      phone: validPhone,
      tin: validTIN,
      region: 'Amhara Region',
      zone: 'North Wollo Zone',
      woreda: 'Lasta',
    });
    await expect(page.getByText(/Customer Created|Success/)).toBeVisible();

    // Update customer
    await customerPage.updateCustomer(validName + ' Updated', 'Tigray Region', 'Central Zone', 'Adwa');
    await expect(page.getByText(/Customer Updated|Success/)).toBeVisible();

    // Delete customer
    await customerPage.deleteCustomer();
    await expect(page.getByText(/Successfully removed customer|Success/)).toBeVisible();

    // Search to confirm deletion
    await customerPage.searchCustomer(validName);
    await expect(page.getByText(/No record found|Empty/)).toBeVisible();
  });
});
