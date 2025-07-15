import { expect, test } from "@playwright/test";

import {
  testClientUserEmail1,
  testClientUserPassword1,
  testDevUserEmail1,
  testDevUserPassword1,
} from "@/configuration/Appconfig";

import { clientQuestElements } from "@/selectors/ClientQuestSelectors";

import {
  questPageHeadings,
  testQuests,
} from "@/constants/CreateQuestsConstants";

import { createQuest } from "@/helpers/CreateQuestsHelper";
import { signInWithGoogle } from "@/helpers/GoogleOAuthHelper";
import { deleteQuests } from "@/helpers/QuestHelper";
import { devQuestElements } from "@/selectors/DevQuestSelectors";

test("Client 1 user logs in with Google, is able to create multiple quests", async ({
  page,
}) => {
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
  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInWithGoogle(page, testClientUserEmail1, testClientUserPassword1);

  // +++++++++++ Expect the UI to reflect Client UI +++++++++++
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

  // +++++++++++ Quest creation +++++++++++

  await page.waitForTimeout(250);
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

  await page.waitForTimeout(250);

  // // +++++++++++ Final Validation and Logout +++++++++++

  await viewAllPublicQuestsLink.click();
  await expect(h1).toHaveText("All Available Quests");

  await logoutLink.click();
  await page.waitForTimeout(500);
  await expect(loginLink).toBeVisible();
});

test("Dev user logs in with Google, is able to add an estiation to these quests", async ({
  page,
}) => {
  const {
    loginLink,
    logoutLink,
    devProfileLink,
    estimationsLink,
    submitEstimatesButton,
    viewAllQuestsLink,
  } = devQuestElements(page);

  const h1 = page.locator("h1");

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login as a Dev +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInWithGoogle(page, testDevUserEmail1, testDevUserPassword1);

  // +++++++++++ Expect the UI to be Client UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  // +++++++++++ Dev is able to add an estimation to a quest +++++++++++
  await viewAllQuestsLink.click();
  await expect(h1).toHaveText("All Available Quests");
  await estimationsLink.nth(0).click();
  await expect(h1).toHaveText("Estimate Difficulty");
  await page.fill("#difficulty-score", "50");
  await page.fill("#number-of-day", "8");
  await page.fill("#comment", "some comment about it being roughly mid difficulty");
  await submitEstimatesButton.click();

  await page.getByRole("button", { name: "Yes, submit" }).click();

  // +++++++++++ Client Logs out +++++++++++
  await logoutLink.click();
  await page.waitForTimeout(500);
  await expect(loginLink).toBeVisible();
});

test("Client deletes created quests", async ({ page }) => {
  const { loginLink, logoutLink, clientProfileLink, viewAllQuestsLink } =
    clientQuestElements(page);

  const h1 = page.locator("h1");
  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login as a Dev +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInWithGoogle(page, testClientUserEmail1, testClientUserPassword1);

  // +++++++++++ Expect the UI to be Client UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  // +++++++++++ Client Deletes Quest Flow +++++++++++

  await deleteQuests(page, "Quest 3");
  await deleteQuests(page, "Quest 2");
  await deleteQuests(page, "Quest 1");

  // +++++++++++ Client Logs out +++++++++++

  await logoutLink.click();
  await page.waitForTimeout(500);
  await expect(loginLink).toBeVisible();
});
