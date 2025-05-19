# Playwright Login Test (JavaScript)

This project automates the login/logout flow using Playwright.

## Install & Run Instructions

```bash
npm init playwright@latest
npx playwright test

``` 

## Folder Structure


``` 
project/
├── helpers/
│   ├── config.js          # BaseURL and timeouts
│   └── selectors.js       # Selectors for login page
├── tests/
│   └── login.spec.js      # Main test for login/logout
├── playwright.config.js   # Playwright configuration
└── README.md              # Instructions

```