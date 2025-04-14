const { test, expect } = require("@playwright/test");

test.describe("SauceDemo Login Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to saucedemo.com
    await page.goto("https://www.saucedemo.com/");
  });

  test("Verify page title", async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle("Swag Labs");
  });

  test("Verify that all neccessary components exist", async ({ page }) => {
    // Logo Component
    await expect(page.locator(".login_container")).toBeVisible()
    const button = await page.locator(".login_logo")
    await expect(button).toBeVisible();
    await expect(button).toHaveText("Swag Labs");
    //Login Wrapper - Credential Menu
    await expect(page.locator(".login_wrapper")).toBeVisible()
    await expect(page.locator("#user-name")).toBeVisible()
    await expect(page.locator("#password")).toBeVisible()
    await expect(page.locator("#login-button")).toBeVisible()
    //Login Wrapper - Account Menu
    await expect(page.locator("#login_credentials")).toBeVisible()
    await expect(page.locator(".login_password")).toBeVisible()

  })

  test("Successful login", async ({ page }) => {
    // Fill in username and password
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    // Click login button
    await page.click("#login-button");
    // Verify successful login by checking for inventory container
    await expect(page.locator(".inventory_container")).toBeVisible();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Failed login with locked out user", async ({ page }) => {
    await page.fill("#user-name", "locked_out_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
});
