import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://google.com');
  //const button = page.getByRole("button").getByText("Alle akzeptieren");
  //await button.click()
  await page.getByRole("button", { name: "Alle akzeptieren" }).click()
});


test("Having right title", async ({ page }) => {
  await expect(page).toHaveTitle("Google")
})

test("Searching for Monkeytype", async ({ page }) => {
  const searchbox = await page.getByRole("textarea")
  await searchbox.click()
  await searchbox.fill("Monkeytype")
  await page.getByRole("button", { name: "Google Suche" }).click()
})
