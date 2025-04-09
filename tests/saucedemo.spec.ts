const { test, expect } = require('@playwright/test');

test.describe('SauceDemo Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to saucedemo.com before each test
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    // Click login button
    await page.click('#login-button');

  });

  test('Successful Logout', async ({ page }) => {
    //opening Navigation Bar
    await page.click('#react-burger-menu-btn');
    //Checking that Nav Bar is opened
    await expect(page.locator('.bm-item-list')).toBeVisible();
    //Clicking on Logout Button 
    await page.click('#logout_sidebar_link');
    //Checking that we are Successfuly signed_out
    await expect(page.locator('.login_wrapper')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  })

  test('Add item to cart', async ({ page }) => {
    // Add first item to cart
    await page.click('#add-to-cart-sauce-labs-backpack');
    // Verify cart badge shows 1
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    // Go to cart and verify item is there
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('Complete purchase flow', async ({ page }) => {
    // Add item
    await page.click('#add-to-cart-sauce-labs-backpack');
    // Go to cart
    await page.click('.shopping_cart_link');
    // Checkout
    await page.click('#checkout');
    // Fill checkout info
    await page.fill('#first-name', 'Test');
    await page.fill('#last-name', 'User');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    // Finish checkout
    await page.click('#finish');
    // Verify completion
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});
