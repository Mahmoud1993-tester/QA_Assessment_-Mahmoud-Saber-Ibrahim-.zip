const {test, expect} = require('@playwright/test');
const config = require('../helpers/config');
const selectors = require('../helpers/selectors');

test.beforeEach(async ({ page }) => {
  // Block Downloading Any Images
  await page.route('**/*.{png,jpg,jpeg,css}', route => {
    route.abort();
  });
});

test ('Successful Login and Logout Flow', async({page})=> {
    // Open Login Page
    await page.goto('/login', {timeout: config.defaultTimeout});

    // Fill in the Login Data
    await page.fill(selectors.userName, 'tomsmith');
    await page.fill(selectors.password, 'SuperSecretPassword!');

    // Wait and Click on Login Button
    await expect(page.locator(selectors.loginButton)).toBeVisible({ timeout: config.shortTimeout });
    await page.click(selectors.loginButton);

    // Wait Login successful Message 
    await expect(page.locator(selectors.successMessage)).toBeVisible({timeout: config.shortTimeout});

    // Click on Logout Button
    await page.click(selectors.logoutButton);

    // Verify we are in Login Page 
    await expect(page).toHaveURL(/.*login/, {timeout: config.shortTimeout});

})

