import { expect, test } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

// Gmail test account credentials (used only for e2e testing)
const testUserEmail1 = process.env.TEST_USER_DEV_EMAIL;
const testUserPassword1 = process.env.TEST_USER_DEV_PASSWORD;

const testUserEmail2 = process.env.TEST_USER_CLIENT_EMAIL;
const testUserPassword2 = process.env.TEST_USER_CLIENT_PASSWORD;

// to pause a step - await page.pause();

test("Delete dev profile", async ({
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
  await page.getByLabel("Email or phone").fill(testUserEmail1);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testUserPassword1);
  await page.getByRole("button", { name: "Next" }).click();

  // ✅ Expect the UI to reflect Dev login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  await devProfileLink.click();
  await page.getByRole("button", { name: "Delete user profile" }).click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});


test("Login and delete the test client user profile", async ({
  page,
}) => {
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  // 👤 Dev-specific navigation links
  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const clientDashboardLink = page.getByRole("link", {name: "Client Quests Dashboard"});
  const clientProfileLink = page.getByRole("link", { name: "Client Profile" });

  // 👉 Auth0 / Google login flow
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  const googleButton = page.getByRole("button", {
    name: /continue with google/i,
  });
  await expect(googleButton).toBeVisible();
  await googleButton.click();

  // 📧 Gmail login
  await page.getByLabel("Email or phone").fill(testUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testUserPassword2);
  await page.getByRole("button", { name: "Next" }).click();

  // ✅ Expect the UI to reflect Dev login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientDashboardLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  await clientProfileLink.click();
  await page.getByRole("button", { name: "Delete user profile" }).click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});