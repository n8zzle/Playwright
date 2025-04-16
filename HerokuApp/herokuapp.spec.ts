const { test, expect } = require("@playwright/test");


test.describe("HerokuApp Testing", () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to saucedemo.com
    await page.goto("https://the-internet.herokuapp.com/");
  });

  test("chech page title", async ({ page }) => {
    await expect(page).toHaveTitle("The Internet");
  })
})
