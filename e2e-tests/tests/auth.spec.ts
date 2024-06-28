import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  // check if it has redirected to the right page
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // locate the email and password test field and then fill them up
  await page.locator("[name=email").fill("1@1.com");
  await page.locator("[name=password]").fill("password");

  // now clock the login button
  await page.getByRole("button", { name: "Login" }).click();

  // check if user is signed in
  await expect(page.getByText("Sign in Successful.")).toBeVisible();

  // check if sign out button and the othet links appear
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});


