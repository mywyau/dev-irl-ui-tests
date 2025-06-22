import { expect, test } from "@playwright/test";

import {
  testClientUserEmail1,
  testClientUserPassword1,
} from "@/configuration/Appconfig";

import { clientQuestElements } from "@/pages/ClientQuestPage";

test("Client user logs in with Google, is able to create multiple quests", async ({
  page,
}) => {
  const {
    loginLink,
    logoutLink,
    clientQuestDashboardLink,
    clientProfileLink,
    createAQuestLink,
    createQuestButton,
    viewAllQuestsLink,
    viewAllPublicQuestsLink,
  } = clientQuestElements(page);

  const h1 = page.locator("h1");

  // 🏠 Navigate to homepage
  await page.goto("/");

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

  // ✅ Expect the UI to reflect Client login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientQuestDashboardLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  await clientQuestDashboardLink.click();
  await createAQuestLink.click();

  await page.waitForTimeout(250);
  await expect(h1).toHaveText("Create a New Quest");

  // 1) Open the dropdown:
  const trigger = page.locator("#rank-select");
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(500);
  await trigger.click();

  // 2) Click “Mithril"
  // Wait for dropdown panel to appear
  // Ensure it's visible before clicking
  await page.locator('div[role="option"]', { hasText: "Mithril" }).click();
  await page.waitForTimeout(1000);

  await page.fill("#quest-title", "Quest 1");
  await page.fill("#quest-description", "Some description for quest 1");
  await page.fill("#acceptance-criteria", "Some acceptance criteria");
  await page.waitForTimeout(500);
  await createQuestButton.click();

  await page.waitForTimeout(500);

  // 1) Open the dropdown:
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(500);
  await trigger.click();

  // 2) Click “Mithril"
  // Wait for dropdown panel to appear
  // Ensure it's visible before clicking
  await page.locator('div[role="option"]', { hasText: "Demon" }).click();
  await page.waitForTimeout(1000);

  await page.fill("#quest-title", "Quest 2");
  await page.fill("#quest-description", "Some description for quest 2");
  await page.fill("#acceptance-criteria", "Some acceptance criteria 2");
  await page.waitForTimeout(500);
  await createQuestButton.click();

  await page.waitForTimeout(500);

  // 1) Open the dropdown:
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(500);
  await trigger.click();

  // 2) Click “Mithril"
  // Wait for dropdown panel to appear
  // Ensure it's visible before clicking
  await page.locator('div[role="option"]', { hasText: "Aether" }).click();
  await page.waitForTimeout(1000);

  await page.fill("#quest-title", "Quest 3");
  await page.fill("#quest-description", "Some description for quest 3");
  await page.fill("#acceptance-criteria", "Some acceptance criteria 3");
  await page.waitForTimeout(500);
  await createQuestButton.click();

  await page.waitForTimeout(500);

  await viewAllPublicQuestsLink.click();
  await expect(h1).toHaveText("All Available Open Quests");
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
