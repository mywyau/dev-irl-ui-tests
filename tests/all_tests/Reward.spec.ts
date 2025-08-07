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

test("Client 1 - user logs in with Auth0, is able to create multiple quests", async ({
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

  const numberOfQuestsToCreate = 3;

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

  await questDashboardCard.waitFor({ state: "visible" });
  await questDashboardCard.hover();
  await questDashboardCard.click({ button: "right" });

  const createMenuItem = page.getByRole("menuitem", { name: "Create a Quest" });

  await createMenuItem.waitFor({ state: "visible" });
  await createMenuItem.hover();
  await createMenuItem.click();

  // +++++++++++ Quest creation +++++++++++

  await h1.waitFor({ state: "visible" });
  await expect(h1).toHaveText(questPageHeadings.createANewQuest);

  for (const quest of testQuests(numberOfQuestsToCreate)) {
    await createQuest(page, quest.title, quest.description, quest.criteria);
  }

  await page.waitForTimeout(200);

  // // +++++++++++ Final Validation and Logout +++++++++++

  await viewAllPublicQuestsLink.click();
  await expect(h1).toHaveText("All Available Quests");

  // +++++++++++ Client Logs out +++++++++++
  await logoutLink.waitFor({ state: "visible" });
  await logoutLink.hover();
  await logoutLink.click();

  await loginLink.waitFor({ state: "visible" });
  await expect(loginLink).toBeVisible();
});

test("Client 1 -  user logs in via Auth0, is able to add both time reward and completion bonus to a quest", async ({
  page,
}) => {
  const {
    timeRewardInput,
    addTimeRewardSubmitButton,
    completionBonusInput,
    addCompleteBonusSubmitButton,
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

  const questCard = page.getByTestId("quest-card-quest-3");
  const addTimeReward = page.getByRole("menuitem", { name: "Time Reward" });
  const addCompleteBonus = page.getByRole("menuitem", {
    name: "Completion Bonus",
  });

  await questDashboardCard.waitFor({ state: "visible" });
  await questDashboardCard.hover();
  await questDashboardCard.click({ button: "right" });

  const viewMyQuestsMenuItem = page.getByRole("menuitem", {
    name: "View My Quests",
  });

  await viewMyQuestsMenuItem.click();

  await expect(h1).toHaveText("My Quests");
  await detailsLink.nth(0).click();

  await expect(h1).toHaveText("Quest Details");

  // await page.waitForTimeout(200);

  await questCard.waitFor({ state: "visible" });
  await questCard.hover();
  await questCard.click({ button: "right" });
  // await page.waitForTimeout(200);

  await addTimeReward.waitFor({ state: "visible" });
  await addTimeReward.hover();
  await addTimeReward.click();

  await expect(h1).toHaveText("Time Reward");
  await timeRewardInput;
  await addTimeRewardSubmitButton.click();

  await page.goBack();

  await expect(h1).toHaveText("Quest Details");

  await questCard.waitFor({ state: "visible" });
  await questCard.hover();
  await questCard.click({ button: "right" });

  await addCompleteBonus.waitFor({ state: "visible" });
  await addCompleteBonus.hover();
  await addCompleteBonus.click();

  await expect(h1).toHaveText("Completion Bonus");
  await completionBonusInput;
  await addCompleteBonusSubmitButton.click();

  // +++++++++++ Client Logs out +++++++++++
  await logoutLink.waitFor({ state: "visible" });
  await logoutLink.hover();
  await logoutLink.click();

  await loginLink.waitFor({ state: "visible" });
  await expect(loginLink).toBeVisible();
});

test("Client 1 - deletes created quests", async ({ page }) => {
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
  await logoutLink.waitFor({ state: "visible" });
  await logoutLink.hover();
  await logoutLink.click();

  await loginLink.waitFor({ state: "visible" });
  await expect(loginLink).toBeVisible();
});
