# Playwright Task – Filter and Capture Product Info

## Task Description

This test performs the following steps:

1. Navigates to the Products page on [automationexercise.com](https://automationexercise.com).
2. Searches for the term **"Dress"** using the search field.
3. Clicks on the **third product** from the filtered results.
4. Asserts that the **product title on the detail page matches the listing**.
5. Captures a **screenshot of the product title**.
6. Repeats the entire flow while simulating **network throttling** (100ms latency, 2Mbps download speed).
7. Runs in both **headless and headed modes**.

---

## Folder Structure

``` 
project/
├── helpers/
│   ├── config.js          # contains baseURL and timeouts
│   └── selectors.js       # contains all element locators
├── tests/
│   └── filter-and-capture.spec.ts
├── playwright.config.js
└── README.md

```


---

##  Throttling Setup

To simulate a slow network, we used the `context.setNetworkConditions()` method in Playwright:

```js
await context.setNetworkConditions({
  download: 2 * 1024 * 1024, // 2 Mbps
  upload: 1 * 1024 * 1024,   // 1 Mbps
  latency: 100              // 100 ms
});

```

## Run Instructions
``` 
npm install

npx playwright test

npx playwright test --headed // Headed Mode 

npx playwright test tests/filter-and-capture.spec.js // Headless Mode 

```

##  Notes

**Selectors are stored separately in helpers/selectors.js to keep code organized.**

**Timeouts and baseURL are managed in helpers/config.js for reuse.**




