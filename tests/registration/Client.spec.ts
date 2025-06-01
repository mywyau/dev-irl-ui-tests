import { expect, test } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const testUserEmail2 = process.env.TEST_USER_CLIENT_EMAIL;
const testUserPassword2 = process.env.TEST_USER_CLIENT_PASSWORD;

// to pause a step - await page.pause();

test("Client user logs in with Google, is able to complete registration", async ({
  page,
}) => {
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  // 👤 Dev-specific navigation links
  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const clientQuestDashboardLink = page.getByRole("link", {
    name: "Client Quests Dashboard",
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
  await page.getByLabel("Email or phone").fill(testUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testUserPassword2);
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

  // 3) Click “Client”
  const clientOption = page.locator('[data-testid="role-select-item-Client"]');
  await expect(clientOption).toBeVisible();
  await clientOption.click();

  // 4) Finally click the “Continue” button
  const continueBtn = page.getByRole("button", { name: "Continue" });
  await expect(continueBtn).toBeEnabled();
  await continueBtn.click();

  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientQuestDashboardLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  await clientProfileLink.click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
