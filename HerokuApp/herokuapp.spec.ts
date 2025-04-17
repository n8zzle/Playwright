const { test, expect } = require("@playwright/test");


test.describe("HerokuApp Testing", () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to saucedemo.com
    await page.goto("https://the-internet.herokuapp.com/");
  });

  test("Check page title", async ({ page }) => {
    await expect(page).toHaveTitle("The Internet");
  })

  test("Check that all components exist", async ({ page }) => {
    //Header
    await expect(page.getByText('Welcome to the-internet')).toBeVisible();
    await expect(page.getByText('Available Examples')).toBeVisible();

    //Links

    await expect(page.getByRole('link', { name: 'A/B Testing' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'A/B Testing' })).toHaveAttribute('href', '/abtest');

    await expect(page.getByRole('link', { name: 'Add/Remove Elements' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Add/Remove Elements' })).toHaveAttribute('href', '/add_remove_elements');


    //Footer
    await expect(page.locator("#page-footer")).toBeVisible()
  })
})
