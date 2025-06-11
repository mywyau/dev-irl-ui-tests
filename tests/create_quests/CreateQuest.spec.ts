import { expect, test } from "@playwright/test";

import {
  testClientUserEmail2,
  testClientUserPassword2
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
  await page.getByLabel("Email or phone").fill(testClientUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testClientUserPassword2);
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

  await page.fill("#quest-title", "Quest 1");
  await page.fill("#quest-description", "Some description for quest 1");
  await createQuestButton.click();

  // wait 500 ms before doing the next one
  await page.waitForTimeout(500);

  await page.fill("#quest-title", "Quest 2");
  await page.fill("#quest-description", "Some description for quest 2");
  await createQuestButton.click();

  // another 500 ms pause
  await page.waitForTimeout(500);

  await page.fill("#quest-title", "Quest 3");
  await page.fill("#quest-description", "Some description for quest 3");
  await createQuestButton.click();

  await viewAllPublicQuestsLink.click();
  await expect(h1).toHaveText("All Available Open Quests");
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
