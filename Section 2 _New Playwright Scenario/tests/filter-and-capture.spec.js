const { test, expect, chromium } = require('@playwright/test');
const selectors = require('../helpers/selectors');
const config = require('../helpers/config');

const searchKeyword = 'Dress';

test.describe('Filter and Capture Product Info', () => {
  for (const throttled of [false, true]) {
    test(`Search and Capture (Throttled: ${throttled})`, async () => {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      if (throttled) {
        const client = await context.newCDPSession(page);
        await client.send('Network.enable');
        await client.send('Network.emulateNetworkConditions', {
          offline: false,
          latency: 100, // 100ms latency
          downloadThroughput: 2 * 1024 * 1024 / 8, // 2 Mbps
          uploadThroughput: 1 * 1024 * 1024 / 8,   // 1 Mbps
        });
      }

      // Navigate to Products page
      await page.goto(config.baseURL, { timeout: config.longTimeout });
      await page.click(selectors.productsLink);

      // Search for product
      await page.fill(selectors.searchInput, searchKeyword);
      await page.click(selectors.searchButton);
      await page.waitForTimeout(2000); // wait for search results

      // Extract The Title 
      const productItem = page.locator(selectors.productTitleList).nth(2);
      const productTitle = await productItem.innerText();

      // Click The 3rd Item 
      await page.click(selectors.thirdProduct);
      

      const detailTitle = await page.locator(selectors.detailTitle).innerText();
      expect(detailTitle.trim()).toBe(productTitle.trim());

      // Screenshot of product title
      await page.locator(selectors.detailTitle).screenshot({
        path: `screenshots/${productTitle.replace(/\s+/g, '_')}.png`
      });

      await browser.close();
    });
  }
});
