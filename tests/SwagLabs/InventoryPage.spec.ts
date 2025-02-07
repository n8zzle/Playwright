import { test, expect } from "@playwright/test";

test.describe("Inventory Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://saucedemo.com/");
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
    // await page.waitForURL("https://www.saucedemo.com/inventory.html");
  });

  test("Logo Component Existing", async ({ page }) => {
    //Swag Labs Logo
    await expect(page.locator(".app_logo")).toHaveText("Swag Labs");

    //TODO:Cart
    //TODO:Filters
    //TODO:List of Products
  });
  test("Burger Menu Existing", async ({ page }) => {
    //Burger Menu
    expect(
      page
        .getByRole("button", {
          name: "Open Menu",
        })
        .click(),
    );

    //Burger Menu - All Navigation Window
    await expect(page.getByRole("navigation")).toBeVisible({
      visible: true,
    });

    // Burget Menu - "All Items" Link
    await expect(
      page.getByRole("link", {
        name: "All Items",
      }),
    ).toBeVisible();

    // Burget Menu - "About" Link
    await expect(
      page.getByRole("link", {
        name: "About",
      }),
    ).toBeVisible();

    // Burget Menu - "Logout" Link
    await expect(
      page.getByRole("link", {
        name: "Logout",
      }),
    ).toBeVisible();

    // Burget Menu - "Reset App State" Link
    await expect(
      page.getByRole("link", {
        name: "Reset App State",
      }),
    ).toBeVisible();

    await expect(page.getByAltText("Close Menu")).toBeVisible();
  });
});
