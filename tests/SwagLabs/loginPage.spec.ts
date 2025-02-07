import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
  });

  test("Should have correct metadata and elements", async ({ page }) => {
    // Check if the title is correct
    await expect(page).toHaveTitle("Swag Labs");

    //Check the Logo
    await expect(page.locator(".login_logo")).toBeVisible();
    await expect(page.locator(".login_logo")).toHaveText("Swag Labs");

    // Check Username input
    await expect(page.getByPlaceholder("Username")).toBeVisible();

    // Check Password input
    await expect(page.getByPlaceholder("Password")).toBeVisible();

    // Chech the button title
    await expect(
      page.getByRole("button", {
        name: "Login",
      }),
    ).toBeVisible();
  });
});
