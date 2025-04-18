const { test, expect } = require("@playwright/test");

test.describe("SauceDemo Main Page ", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to saucedemo.com before each test
    await page.goto("https://www.saucedemo.com/");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    // Click login button
    await page.click("#login-button");
  });

  test("Correct page title", async ({ page }) => {
    await expect(page).toHaveTitle("Swag Labs");
  })

  test("Successful Logout", async ({ page }) => {
    //opening Navigation Bar
    await page.click("#react-burger-menu-btn");
    //Checking that Nav Bar is opened
    await expect(page.locator(".bm-item-list")).toBeVisible();
    //Clicking on Logout Button
    await page.click("#logout_sidebar_link");
    //Checking that we are Successfuly signed_out
    await expect(page.locator(".login_wrapper")).toBeVisible();
    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });

  test("Add item to cart", async ({ page }) => {
    // Add first item to cart
    await page.click("#add-to-cart-sauce-labs-backpack");
    // Verify cart badge shows 1
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    // Go to cart and verify item is there
    await page.click(".shopping_cart_link");
    await expect(page.locator(".cart_item")).toHaveCount(1);
  });

  test("Add all items to cart", async ({ page }) => {
    // Loop while there are still "Add to cart" buttons on the page
    while (true) {
      // Get the first "Add to cart" button (if any)
      const button = page.locator("button", { hasText: "Add to cart" }).first();
      // If no button is found, break the loop
      if ((await button.count()) === 0) break;
      // Click the button
      await button.waitFor({ state: "visible" });
      await button.click();
      // Optional: wait between clicks to prevent any flakiness
      await page.waitForTimeout(200);
    }
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
      "6",
    );
  });

  test("Filtering Price Low-to-High ", async ({ page }) => {
    await page.selectOption('.product_sort_container', { value: 'lohi' });
    const item = await page.locator(".inventory_item").first()

    const itemName = await item.locator('.inventory_item_name').textContent();
    const itemPrice = await item.locator('.inventory_item_price').textContent();

    console.log(`Item name: ${itemName}`);
    console.log(`Item price: ${itemPrice}`);
    await expect(itemName).toBe("Sauce Labs Onesie")
    await expect(itemPrice).toBe("$7.99")
  });

  test("Filtering Price High-to-Low ", async ({ page }) => {
    await page.selectOption('.product_sort_container', { value: 'hilo' });
    const item = await page.locator(".inventory_item").first()

    const itemName = await item.locator('.inventory_item_name').textContent();
    const itemPrice = await item.locator('.inventory_item_price').textContent();

    console.log(`Item name: ${itemName}`);
    console.log(`Item price: ${itemPrice}`);
    await expect(itemName).toBe("Sauce Labs Fleece Jacket")
    await expect(itemPrice).toBe("$49.99")

  });

  test("Name (A to Z)", async ({ page }) => {
    await page.selectOption('.product_sort_container', { value: 'az' });
    const item = await page.locator(".inventory_item").first()

    const itemName = await item.locator('.inventory_item_name').textContent();
    const itemPrice = await item.locator('.inventory_item_price').textContent();

    console.log(`Item name: ${itemName}`);
    console.log(`Item price: ${itemPrice}`);
    await expect(itemName).toBe("Sauce Labs Backpack")
    await expect(itemPrice).toBe("$29.99")

  });

  test("Name (Z to A)", async ({ page }) => {
    await page.selectOption('.product_sort_container', { value: 'za' });
    const item = await page.locator(".inventory_item").first()

    const itemName = await item.locator('.inventory_item_name').textContent();
    const itemPrice = await item.locator('.inventory_item_price').textContent();

    console.log(`Item name: ${itemName}`);
    console.log(`Item price: ${itemPrice}`);
    await expect(itemName).toBe("Test.allTheThings() T-Shirt (Red)")
    await expect(itemPrice).toBe("$15.99")

  });

  test("Complete purchase flow", async ({ page }) => {
    // Add item
    await page.click("#add-to-cart-sauce-labs-backpack");
    // Go to cart
    await page.click(".shopping_cart_link");
    // Checkout
    await page.click("#checkout");
    // Fill checkout info
    await page.fill("#first-name", "Test");
    await page.fill("#last-name", "User");
    await page.fill("#postal-code", "12345");
    await page.click("#continue");
    // Finish checkout
    await page.click("#finish");
    // Verify completion
    await expect(page.locator(".complete-header")).toHaveText(
      "Thank you for your order!",
    );
  });
});
