const { test, expect } = require("@playwright/test");


test.describe("UITAP Testing", () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to saucedemo.com
    await page.goto("http://uitestingplayground.com/");
  });

  test("chech page title", async ({ page }) => {
    await expect(page).toHaveTitle("UI Test Automation Playground");
  })
})
