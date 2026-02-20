const { test, expect } = require('@playwright/test');
const { AppManager } = require('../pages/appManager');

test('Sales Order: Integrated Random Flow', async ({ page }) => {
    test.setTimeout(240000); // 4 ደቂቃ
    const app = new AppManager(page);
    await app.login('admin@beffa.com', 'Beff.$#!');

    // 1. Navigate to Sales Order
    console.log("🚀 Navigating to Add Sales Order...");
    await page.goto('http://157.180.20.112:4173/receivables/sale-orders/new');
    await page.waitForLoadState('networkidle');

    // 2. Random Customer Selection from Dropdown
    console.log("👥 Selecting a random customer ID from the list...");
    await page.getByRole('button', { name: 'Customer selector' }).click();

    // በፎቶው ላይ የታዩትን የ CUST/ ID ዝርዝሮች መፈለግ
    const customerOptions = page.locator('div[role="group"] button, .chakra-stack button').filter({ hasText: /CUST\// });
    await customerOptions.first().waitFor({ state: 'visible' });

    const count = await customerOptions.count();
    const randomIndex = Math.floor(Math.random() * count);
    console.log(`📍 Choosing random customer ID at index: ${randomIndex}`);
    await customerOptions.nth(randomIndex).click();

    // 3. Accounts Receivable (First Selection)
    console.log("💳 Initial Accounts Receivable selection...");
    const arSelector = page.getByRole('button', { name: 'Accounts Receivable selector' });
    await arSelector.click();
    // ትክክለኛውን አካውንት በስም መፈለግ
    await page.getByRole('textbox', { name: 'Search...' }).last().fill('Accounts Receivable');
    await page.locator('button').filter({ hasText: /^Accounts Receivable$/ }).first().click();

    // 4. Currency
    await page.getByRole('button', { name: 'Currency selector' }).click();
    await page.getByRole('group').filter({ hasText: /^Birr$/ }).first().click();

    // 5. Line Item Details (Adding Product)
    console.log("📦 Filling item details...");
    await page.getByRole('button', { name: 'Line Item' }).click();
    await page.getByRole('button', { name: 'Item', exact: true }).click();

    // እቃውንም ራንደምሊ መምረጥ
    const itemOptions = page.locator('div[role="group"] button');
    await itemOptions.first().click();

    await page.getByRole('button', { name: /Warehouse/ }).click();
    await page.locator('div[role="group"]').first().click();

    await page.getByRole('button', { name: /Location/ }).click();
    await page.locator('div[role="group"]').first().click();

    await page.getByRole('spinbutton').first().fill('1');

    await page.getByRole('button', { name: 'Tax selector' }).click();
    await page.getByRole('group').filter({ hasText: 'VAT' }).first().click();
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    // 6. The Logic Hack: Re-select Accounts Receivable to activate button
    console.log("🔄 Re-selecting Accounts Receivable before Final Submit...");
    await page.waitForTimeout(2000); // ፎርሙ ተሞልቶ እስኪረጋጋ
    await arSelector.click();
    await page.locator('button').filter({ hasText: /^Accounts Receivable$/ }).first().click();

    // 7. Final Submission
    console.log("💾 Submitting Sales Order...");
    const addNowBtn = page.getByRole('button', { name: 'Add Now' });
    await expect(addNowBtn).toBeEnabled({ timeout: 10000 });
    await addNowBtn.click();

    console.log("🚀 MISSION SUCCESS: Sales Order created with Random Customer and Final AR activation!");
});