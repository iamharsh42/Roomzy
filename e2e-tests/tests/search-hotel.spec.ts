import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/"

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    // get the sign in button
    await page.getByRole("link", { name: "Sign In" }).click();

    // check if it has redirected to the right page
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    // locate the email and password test field and then fill them up
    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("password123");

    // now clock the login button
    await page.getByRole("button", { name: "Login" }).click();

    // check if user is signed in
    await expect(page.getByText("Sign in Successful.")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Dublin");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Hotels found in Dublin")).toBeVisible();
    await expect(page.getByText("Dublin Getaways")).toBeVisible();
});