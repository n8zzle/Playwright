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

    //h4 Accepted Usernames
    await expect(
      page.getByRole("heading", {
        name: "Accepted usernames are:",
      }),
    ).toBeVisible();

    //Usernames are displayed
    await expect(page.getByText("standard_user")).toBeVisible();
    await expect(page.getByText("locked_out_user")).toBeVisible();
    await expect(page.getByText("problem_user")).toBeVisible();
    await expect(page.getByText("performance_glitch_user")).toBeVisible();
    await expect(page.getByText("error_user")).toBeVisible();
    await expect(page.getByText("visual_user")).toBeVisible();

    //h4 Passwords for users
    await expect(
      page.getByRole("heading", {
        name: "Password for all users:",
      }),
    ).toBeVisible();
    //Password
    await expect(page.getByText("secret_sauce")).toBeVisible();
  });

  test("Log-in and redirect", async ({ page }) => {
    const username = page.getByPlaceholder("Username");
    const password = page.getByPlaceholder("Password");
    const button = page.getByRole("button", {
      name: "Login",
    });
    await username.click();
    await username.fill("standard_user");
    await password.click();
    await password.fill("secret_sauce");
    await button.click();
  });
});
