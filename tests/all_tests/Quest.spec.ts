
import { expect, test } from "@playwright/test";

import {
  testClientUserEmail1,
  testClientUserPassword1,
  testDevUserEmail1,
  testDevUserPassword1,
} from "@/configuration/Appconfig";

import { clientQuestElements } from "@/selectors/ClientQuestSelectors";
import { devQuestElements } from "@/selectors/DevQuestSelectors";

import {
  questPageHeadings,
  testQuests,
} from "@/constants/CreateQuestsConstants";

import { createQuest } from "@/helpers/CreateQuestsHelper";
import { signInWithGoogle } from "@/helpers/GoogleOAuthHelper";
import { deleteQuests } from "@/helpers/QuestHelper";
import { simpleSelectors } from "@/selectors/SimpleSelectors";

test("Client user logs in with Google, is able to create multiple quests", async ({
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

  await clientQuestDashboardLink.click();
  await createAQuestLink.click();

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
  await expect(h1).toHaveText("All Available Open Quests");

  await logoutLink.click();
  await page.waitForTimeout(500);
  await expect(loginLink).toBeVisible();
});

test("Client can edit a previously created quest", async ({ page }) => {

  const { h1 } = simpleSelectors(page);

  const {
    loginLink,
    logoutLink,
    clientProfileLink,
    clientQuestDashboardLink,
    editQuestButton,
    updateQuestButton,
    viewMyQuestsLink,
    detailsLink,
    viewAllQuestsLink,
  } = clientQuestElements(page);

  const nagivateToHome = page.goto("/");

  const trigger = page.locator("#rank-select");

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

  // +++++++++++ Client Edits Quest Flow +++++++++++

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await viewMyQuestsLink.click();
  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText("Quest 3");
  await page.waitForTimeout(250);

  await editQuestButton.click();

  await page.waitForTimeout(250);
  await expect(h1).toHaveText("Edit Quest");

  // 1) Open the dropdown:
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(250);
  await trigger.click();

  // 2) Click Aether"
  await page.locator('div[role="option"]', { hasText: "Aether" }).click();
  await page.waitForTimeout(250);

  await page.fill("#quest-title", "Updated Quest 3");
  await page.fill(
    "#quest-description",
    "Some updated description for quest 3 to make it harder"
  );
  await updateQuestButton.click();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await viewMyQuestsLink.click();
  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");

  // +++++++++++ Client Logout Flow +++++++++++
  await logoutLink.click();
  // await logoutLink.click();
  await page.waitForTimeout(500);
  await expect(loginLink).toBeVisible();
});

test("Dev user logs in with Google, is able to accept some quests and move it from NotStarted -> InProgress -> Review", async ({
  page,
}) => {
  const {
    loginLink,
    logoutLink,
    devProfileLink,
    devQuestDashboardLink,
    viewDetailsLink,
    detailsLink,
    viewAllQuestsLink,
    acceptQuestButton,
    notStartedButton,
    inProgressButton,
    reviewButton,
    moveToInProgressButton,
    moveToReviewButton,
  } = devQuestElements(page);

  const nagivateToHome = page.goto("/");

  const h1 = page.locator("h1");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login as a Dev +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInWithGoogle(page, testDevUserEmail1, testDevUserPassword1);

  // 1. Expect the UI to reflect DEV UI

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devQuestDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  // +++++++++++ Dev accepts a quest and moves it along to Review +++++++++++
  await viewAllQuestsLink.click();
  await expect(h1).toHaveText("All Available Open Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await acceptQuestButton.click();
  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await notStartedButton.click();
  await expect(h1).toHaveText("Not Started");
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");
  await viewDetailsLink.click();
  await expect(h1).toHaveText("Quest Details");
  await page.goBack();
  await moveToInProgressButton.click();
  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await inProgressButton.click();
  await expect(h1).toHaveText("In Progress");
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");
  await viewDetailsLink.click();
  await expect(h1).toHaveText("Quest Details");
  await page.goBack();
  await moveToReviewButton.click();
  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await reviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");
  await viewDetailsLink.click();
  await page.goBack();

  // +++++++++++ Dev is able to Log out +++++++++++
  await logoutLink.click();
  await page.waitForTimeout(500);
  await expect(loginLink).toBeVisible();
});

test("Client user logs in with Google, is able to move a quest in Review to Completed", async ({
  page,
}) => {
  const {
    loginLink,
    logoutLink,
    viewDetailsLink,
    viewAllQuestsLink,
    clientProfileLink,
    clientQuestDashboardLink,
    clientReviewButton,
    clientCompletedButton,
    moveToCompletedButton,
  } = clientQuestElements(page);

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

  // +++++++++++ Client processes quest to Completed status +++++++++++
  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await clientReviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");

  await viewDetailsLink.click();
  await expect(h1).toHaveText("Quest Details");
  await page.goBack();
  await moveToCompletedButton.click();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await clientCompletedButton.click();

  await expect(h1).toHaveText("Completed");
  await viewDetailsLink.click();
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");

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

  await deleteQuests(page, "Updated Quest 3");
  await deleteQuests(page, "Quest 2");
  await deleteQuests(page, "Quest 1");

  // +++++++++++ Client Logs out +++++++++++

  await logoutLink.click();
  await page.waitForTimeout(500);
  await expect(loginLink).toBeVisible();
});
