import { expect, test } from "@playwright/test";

import { clientEmail1, clientPassword1 } from "@/configuration/Appconfig";

import { clientQuestElements } from "@/selectors/ClientQuestSelectors";

import {
  questPageHeadings,
  testQuests,
} from "@/constants/CreateQuestsConstants";

import { createQuest } from "@/helpers/CreateQuestsHelper";
import { signInAuth0 } from "@/helpers/NonSocialAuth0Helper";
import { deleteQuests } from "@/helpers/QuestHelper";
import { rewardElements } from "@/selectors/RewardSelectors";

test("Client 1 user logs in with Google, is able to create multiple quests", async ({
  page,
}) => {
  const {
    loginLink,
    logoutLink,
    clientQuestDashboardLink,
    clientProfileLink,
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

  await signInAuth0(page, clientEmail1, clientPassword1);

  // +++++++++++ Expect the UI to reflect Client UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientQuestDashboardLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  await clientQuestDashboardLink.click();

  const questDashboardCard = page
    .getByText("Quest Dashboard")
    .locator("..")
    .locator("..");
  await page.waitForTimeout(200);

  await questDashboardCard.click({ button: "right" });
  await page.waitForTimeout(200);

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

test("Client user logs in with Google, is able to add rewards to these quests", async ({
  page,
}) => {
  const {
    timeRewardInput,
    completionRewardInput,
    addCompletionRewardButton,
  } = rewardElements(page);

  const {
    loginLink,
    logoutLink,
    detailsLink,
    viewAllQuestsLink,
    clientProfileLink,
    clientQuestDashboardLink,
  } = clientQuestElements(page);

  const h1 = page.locator("h1");

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login as a Dev +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, clientEmail1, clientPassword1);

  // +++++++++++ Expect the UI to be Client UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  // +++++++++++ Client is able to add an reward to a quest +++++++++++
  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  const questDashboardCard = page
    .getByText("Quest Dashboard")
    .locator("..")
    .locator("..");
  await page.waitForTimeout(200);

  await questDashboardCard.click({ button: "right" });
  await page.waitForTimeout(200);

  const viewMyQuestsMenuItem = page.getByRole("menuitem", {
    name: "View My Quests",
  });

  await viewMyQuestsMenuItem.click();

  await expect(h1).toHaveText("My Quests");
  await detailsLink.nth(0).click();

  await expect(h1).toHaveText("Quest Details");

  const questCard = page.getByTestId("quest-card-quest-3");

  await page.waitForTimeout(200);

  await questCard.click({ button: "right" });
  await page.waitForTimeout(200);

  const addAReward = page.getByRole("menuitem", { name: "Add a Reward" });
  await addAReward.click();

  await expect(h1).toHaveText("Add Quest Reward");
  await timeRewardInput;
  await completionRewardInput;
  await addCompletionRewardButton.click();
  await page.pause;

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

  await signInAuth0(page, clientEmail1, clientPassword1);

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
