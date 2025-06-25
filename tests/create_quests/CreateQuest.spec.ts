import {
  testClientUserEmail1,
  testClientUserPassword1,
} from "@/configuration/Appconfig";
import {
  questPageHeadings,
  testQuests,
} from "@/constants/CreateQuestsConstants";
import { clientQuestElements } from "@/selectors/ClientQuestSelectors";
import { expect, test } from "@playwright/test";

import { createQuest } from "@/helpers/CreateQuestsHelper";
import { signInWithGoogle } from "@/helpers/GoogleOAuthHelper";

test("Client user logs in and creates multiple quests", async ({ page }) => {
  const {
    loginLink,
    logoutLink,
    clientQuestDashboardLink,
    clientProfileLink,
    createAQuestLink,
    viewAllQuestsLink,
    viewAllPublicQuestsLink,
  } = clientQuestElements(page);

  const h1 = page.locator("h1");

  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🔐 Auth0 + Google login
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInWithGoogle(page, testClientUserEmail1, testClientUserPassword1);

  // ✅ Client UI loaded
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientQuestDashboardLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  // ➕ Create quests
  await clientQuestDashboardLink.click();
  await createAQuestLink.click();
  await expect(h1).toHaveText(questPageHeadings.createANewQuest);

  await createQuest(
    page,
    testQuests.title1,
    testQuests.description1,
    testQuests.criteria1,
    testQuests.rank1
  );

  await createQuest(
    page,
    testQuests.title2,
    testQuests.description2,
    testQuests.criteria2,
    testQuests.rank2
  );

  await createQuest(
    page,
    testQuests.title3,
    testQuests.description3,
    testQuests.criteria3,
    testQuests.rank3
  );

  // 🔍 View all public quests
  await viewAllPublicQuestsLink.click();
  await expect(h1).toHaveText(questPageHeadings.allAvailableOpenQuests);

  // 🚪 Logout
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
