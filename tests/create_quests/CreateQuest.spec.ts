import { clientEmail1, clientPassword1 } from "@/configuration/Appconfig";
import {
  questPageHeadings,
  testQuests,
} from "@/constants/CreateQuestsConstants";
import { clientQuestElements } from "@/selectors/ClientQuestSelectors";
import { expect, test } from "@playwright/test";

import { createQuest } from "@/helpers/CreateQuestsHelper";
import { signInAuth0 } from "@/helpers/NonSocialAuth0Helper";

test("Client user logs in and creates multiple quests", async ({ page }) => {
  const {
    loginLink,
    logoutLink,
    clientQuestDashboardLink,
    clientProfileLink,
    viewAllQuestsLink,
    viewAllPublicQuestsLink,
  } = clientQuestElements(page);

  const h1 = page.locator("h1");

  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🔐 Auth0 + Google login
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, clientEmail1, clientPassword1);

  // ✅ Client UI loaded
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientQuestDashboardLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  // Navigate to Create quests via context menu dropdown
  await clientQuestDashboardLink.click();

  const card = page.getByText("Quest Dashboard").locator("..").locator("..");
  await page.waitForTimeout(250);

  await card.click({ button: "right" });
  await page.waitForTimeout(250);

  const createMenuItem = page.getByRole("menuitem", { name: "Create a Quest" });
  await createMenuItem.click();

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
