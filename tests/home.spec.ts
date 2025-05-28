import { expect, test } from "@playwright/test";

test("home page should render with correct title and h1", async ({ page }) => {
  const h1 = page.locator("h1");

  await page.goto("/");
  //   await expect(page).toHaveTitle(/Your Nuxt App Title/);
  await expect(h1).toHaveText("Welcome to Dev Irl");
});

test("home page should render with login link", async ({ page }) => {
  await page.goto("/");

  const loginLink = page.getByRole("link", { name: "Login" });
  await expect(loginLink).toBeVisible();
  await loginLink.click();
  const logoutLink = page.getByRole("link", { name: "Logout" });
  await expect(logoutLink).toBeVisible();
});

