import { expect, test } from "@playwright/test";

import {
  testClientUserEmail1,
  testClientUserEmail2,
  testClientUserPassword1,
  testClientUserPassword2,
  testDevUserEmail1,
  testDevUserPassword1,
  testDevUserEmail2,
  testDevUserPassword2,
} from "@/configuration/Appconfig";

test("Dev 1 - Delete dev profile", async ({ page }) => {
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  // 👤 Dev-specific navigation links
  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const devDashboardLink = page.getByRole("link", {
    name: "Dashboard",
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
  await page.getByLabel("Email or phone").fill(testDevUserEmail1);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testDevUserPassword1);
  await page.getByRole("button", { name: "Next" }).click();

  // ✅ Expect the UI to reflect Dev login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  await devProfileLink.click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Delete user profile" }).click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Client 1 - Login and delete the test client user profile", async ({
  page,
}) => {
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  // 👤 Dev-specific navigation links
  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const clientDashboardLink = page.getByRole("link", {
    name: "Dashboard",
  });
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
  await page.getByLabel("Email or phone").fill(testClientUserEmail1);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testClientUserPassword1);
  await page.getByRole("button", { name: "Next" }).click();

  // ✅ Expect the UI to reflect Dev login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientDashboardLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  await clientProfileLink.click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Delete user profile" }).click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Dev 2 - Delete dev profile", async ({ page }) => {
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  // 👤 Dev-specific navigation links
  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const devDashboardLink = page.getByRole("link", {
    name: "Dashboard",
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
  await page.getByLabel("Email or phone").fill(testDevUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testDevUserPassword2);
  await page.getByRole("button", { name: "Next" }).click();

  // ✅ Expect the UI to reflect Dev login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  await devProfileLink.click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Delete user profile" }).click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Client 2 - Login and delete the test client user profile", async ({
  page,
}) => {
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  // 👤 Dev-specific navigation links
  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const clientDashboardLink = page.getByRole("link", {
    name: "Dashboard",
  });
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
  await page.getByLabel("Email or phone").fill(testClientUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testClientUserPassword2);
  await page.getByRole("button", { name: "Next" }).click();

  // ✅ Expect the UI to reflect Dev login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientDashboardLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  await clientProfileLink.click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Delete user profile" }).click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
