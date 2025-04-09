# Playwright

This project demonstrates automated testing of www.saucedemo.com using Playwright.

## Project Structure
```
Playwright/
├── tests/
│   ├── login.test.ts       # Login Page test file
│   ├── saucedemo.spec.ts          # Main page test file
── tests-examples/
│   ├── demo-todo-app.spec.ts           # DEMO
├── playwright.config.ts     # Playwright configuration
├── package.json
├── README.md                # Project documentation
```

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npx playwright test`

## Test Cases
- User authentication
- Add to cart
- Placing order
