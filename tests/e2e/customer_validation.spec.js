const { test, expect } = require('@playwright/test');
const { AppManager } = require('../pages/appManager');
const fs = require('fs');
const path = require('path');

const addressData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/address_locations.json'), 'utf8'));

test('Customer Validation: TIN and Phone Edge Cases', async ({ page }) => {
    test.setTimeout(120000);
    const app = new AppManager(page);
    await app.login('admin@beffa.com', 'Beff.$#!');

    const createBtn = page.locator('button.chakra-button:has-text("Create customer")');
    const rRegion = addressData[0];

    // --- Scenario 1: Short TIN (ልክ አንተ በፎቶ d4b362 እንዳደረግከው) ---
    console.log("🧪 Testing: Short TIN Validation...");
    await page.goto('http://157.180.20.112:4173/receivables/customers/new');
    await page.getByRole('textbox', { name: 'Customer Name *' }).fill("TIN Short Test");
    await page.getByLabel('Customer Type *').selectOption('individual');
    await page.getByRole('textbox', { name: 'Customer TIN *' }).fill("12345"); // 5 ድጂት
    await app.mainPhoneInput.fill("0911223344");

    // አድራሻ መሙላት (በተኑ Enabled እንዲሆን)
    await app.fillEthiopianAddress(rRegion.region, rRegion.zones[0].name, rRegion.zones[0].woredas[0]);

    await createBtn.click();
    // ቀዩን የስህተት ጽሁፍ መጠበቅ
    await expect(page.locator('text=/10 digit|must be 10/i')).toBeVisible({ timeout: 8000 });
    console.log("✅ Success: System blocked short TIN.");

    // --- Scenario 2: Invalid Phone (ልክ አንተ በፎቶ d4bb78 እንዳደረግከው) ---
    console.log("🧪 Testing: Invalid Phone Validation (3 digits)...");
    await page.reload();
    await page.getByRole('textbox', { name: 'Customer Name *' }).fill("Phone Short Test");
    await page.getByLabel('Customer Type *').selectOption('individual');
    await page.getByRole('textbox', { name: 'Customer TIN *' }).fill("9876543210");

    // ሆን ብሎ ስህተት ስልክ መሙላት
    await app.mainPhoneInput.fill("123");
    await app.fillEthiopianAddress(rRegion.region, rRegion.zones[0].name, rRegion.zones[0].woredas[0]);

    // ፍተሻ፡ ሲስተሙ ስልኩ ስህተት መሆኑን አውቆ በተኑን መቆለፍ አለበት
    const isEnabled = await createBtn.isEnabled();

    if (!isEnabled) {
        console.log("✅ Success: System correctly disabled button for 3-digit phone.");
    } else {
        // በተኑ ከተከፈተ ተጭነን ስህተት መምጣቱን እናያለን
        await createBtn.click();
        const phoneError = page.locator('text=/invalid phone|must be 10 digit|phone number/i');
        try {
            await expect(phoneError).toBeVisible({ timeout: 8000 });
            console.log("✅ Success: System showed error for invalid phone.");
        } catch (e) {
            console.error("❌ FAIL: System allowed registration with 3-digit phone!");
            throw new Error("Validation Bug: Phone number format not enforced.");
        }
    }

    console.log("🚀 ALL VALIDATIONS COMPLETED!");
});