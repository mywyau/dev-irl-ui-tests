import { expect, test } from "@playwright/test";

import {
  testClientUserEmail1,
  testClientUserEmail2,
  testClientUserPassword1,
  testClientUserPassword2,
} from "@/configuration/Appconfig";

test("Client 1 user logs in with Google, is able to complete registration", async ({
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
  await page.getByLabel("Email or phone").fill(testClientUserEmail1);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testClientUserPassword1);
  await page.getByRole("button", { name: "Next" }).click();

  // ✅ Expect the UI to reflect Dev login
  await expect(logoutLink).toBeVisible();

  await page.waitForTimeout(2000);

  // 1) Fill in the username
  await page.locator("#username").fill("goku");

  // 2) Open the dropdown:
  const trigger = page.locator('[data-testid="role-select-trigger"]');
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(500);
  await trigger.click();

  // 3) Wait for the dropdown panel to show up
  const content = page.locator(
    '[data-testid="role-select-content"][data-state="open"]'
  );
  await expect(content).toBeVisible();

  // 4) Click “Client”
  const clientOption = page.locator('[data-testid="role-select-item-Client"]');
  await expect(clientOption).toBeVisible();
  await clientOption.click();

  // 5) Finally click the “Continue” button
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

test("Client 2 user logs in with Google, is able to complete registration", async ({
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
  await page.getByLabel("Email or phone").fill(testClientUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testClientUserPassword2);
  await page.getByRole("button", { name: "Next" }).click();

  // ✅ Expect the UI to reflect Dev login
  await expect(logoutLink).toBeVisible();

  await page.waitForTimeout(2000);

  // 1) Fill in the username
  await page.locator("#username").fill("yugi");

  // 2) Open the dropdown:
  const trigger = page.locator('[data-testid="role-select-trigger"]');
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(500);
  await trigger.click();

  // 3) Wait for the dropdown panel to show up
  const content = page.locator(
    '[data-testid="role-select-content"][data-state="open"]'
  );
  await expect(content).toBeVisible();

  // 4) Click “Client”
  const clientOption = page.locator('[data-testid="role-select-item-Client"]');
  await expect(clientOption).toBeVisible();
  await clientOption.click();

  // 5) Finally click the “Continue” button
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
