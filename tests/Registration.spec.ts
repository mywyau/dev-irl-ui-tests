import { expect, test, request } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

// Gmail test account credentials (used only for e2e testing)
const testEmail = process.env.DEV_EMAIL;
const testPassword = process.env.DEV_PASSWORD;

// to pause a step - await page.pause();

// TODO Add step for deleting the user profile
// test.beforeEach(async () => {
//   const requestContext = await request.newContext();
//   const response = await requestContext.post('http://localhost:8080/test/clear-db');
//   expect(response.ok()).toBeTruthy();
//   await requestContext.dispose();
// });

test("forces user type selection if not set", async ({ page }) => {
  await page.goto("/");

  const heading = page.locator("h1");
  await expect(heading).toHaveText("Welcome to Dev Irl");
});

test("Dev user logs in with Google and sees Dev-specific nav", async ({
  page,
}) => {
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  // 👤 Dev-specific navigation links
  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const devDashboardLink = page.getByRole("link", {
    name: "Dev Quests Dashboard",
  });
  const devProfileLink = page.getByRole("link", { name: "Dev Profile" });

  // 👉 Auth0 / Google login flow
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  const googleButton = page.getByRole("button", {
    name: /continue with google/i,
  });
  await expect(googleButton).toBeVisible();
  await googleButton.click();

  // 📧 Gmail login
  await page.getByLabel("Email or phone").fill(testEmail);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testPassword);
  await page.getByRole("button", { name: "Next" }).click();

  // ✅ Expect the UI to reflect Dev login
  await expect(logoutLink).toBeVisible();

  // 1. Click the dropdown trigger by role or fallback to text-based locator
  await page.locator('button[role="combobox"]').click();

  // 2. Wait for dropdown content to appear and click "Dev"
  await page.locator('[data-state="open"] >> text=Dev').click();

  // 3. Click the continue button
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
