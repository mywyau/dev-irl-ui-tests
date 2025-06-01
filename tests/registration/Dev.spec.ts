import { expect, test } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

// Gmail test account credentials (used only for e2e testing)
const testUserEmail1 = process.env.TEST_USER_DEV_EMAIL;
const testUserPassword1 = process.env.TEST_USER_DEV_PASSWORD;

// to pause a step - await page.pause();

test("Dev user logs in with Google, is able to complete registration", async ({
  page,
}) => {
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  // 👤 Dev-specific navigation links
  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const devQuestDashboardLink = page.getByRole("link", {
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

  // 1) Open the dropdown:
  const trigger = page.locator('[data-testid="role-select-trigger"]');
  // const trigger = page.locator("#role-select");
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(500);
  await trigger.click();
  // await trigger.click();

  // 2) Wait for the dropdown panel to show up
  const content = page.locator(
    '[data-testid="role-select-content"][data-state="open"]'
  );
  await expect(content).toBeVisible();

  // 3) Click “Dev”
  const devOption = page.locator('[data-testid="role-select-item-Dev"]');
  await expect(devOption).toBeVisible();
  await devOption.click();

  // 4) Finally click the “Continue” button
  const continueButton = page.getByRole("button", { name: "Continue" });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devQuestDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  await devProfileLink.click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
