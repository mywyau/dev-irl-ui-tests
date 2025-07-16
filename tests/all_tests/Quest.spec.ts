import { expect, test } from "@playwright/test";

import {
  clientEmail1,
  clientPassword1,
  devEmail1,
  devEmail2,
  devEmail3,
  devPassword1,
  devPassword2,
  devPassword3,
} from "@/configuration/Appconfig";

import { clientQuestElements } from "@/selectors/ClientQuestSelectors";
import { devQuestElements } from "@/selectors/DevQuestSelectors";

import {
  questPageHeadings,
  testQuests,
} from "@/constants/CreateQuestsConstants";
import { createQuest } from "@/helpers/CreateQuestsHelper";
import { signInAuth0 } from "@/helpers/NonSocialAuth0Helper";
import { deleteQuests } from "@/helpers/QuestHelper";
import { simpleSelectors } from "@/selectors/SimpleSelectors";

test("Client 1 - is able to create multiple quests", async ({ page }) => {
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

  await signInAuth0(page, clientEmail1, clientPassword1);

  // +++++++++++ Expect the UI to reflect Client UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientQuestDashboardLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  // Navigate to Create quests via context menu dropdown
  await clientQuestDashboardLink.click();

  const card = page.getByText("Quest Dashboard").locator("..").locator("..");
  await page.waitForTimeout(200);

  await card.click({ button: "right" });
  await page.waitForTimeout(200);

  const createMenuItem = page.getByRole("menuitem", { name: "Create a Quest" });
  await createMenuItem.click();

  // +++++++++++ Quest creation +++++++++++

  await page.waitForTimeout(200);
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

  await page.waitForTimeout(200);

  // // +++++++++++ Final Validation and Logout +++++++++++

  await viewAllPublicQuestsLink.click();
  await expect(h1).toHaveText("All Available Quests");

  await logoutLink.click();
  await page.waitForTimeout(200);
  await expect(loginLink).toBeVisible();
});

test("Client 1 - can edit a previously created quest", async ({ page }) => {
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

  await signInAuth0(page, clientEmail1, clientPassword1);

  // +++++++++++ Expect the UI to reflect Client UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientQuestDashboardLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  // +++++++++++ Client Edits Quest Flow +++++++++++
  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  const card = page.getByText("Quest Dashboard").locator("..").locator("..");
  await page.waitForTimeout(200);

  await card.click({ button: "right" });
  await page.waitForTimeout(200);

  const viewMyQuestsMenuItem = page.getByRole("menuitem", {
    name: "View My Quests",
  });
  await viewMyQuestsMenuItem.click();
  await expect(h1).toHaveText("My Quests");

  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");

  await expect(page.locator("#quest-title")).toHaveText("Quest 3");
  await page.waitForTimeout(200);

  // await editQuestButton.click();

  const questCard = page.getByText("Quest 3").locator("..").locator("..");
  const editQuestMenuItem = page.getByRole("menuitem", {
    name: "Edit Quest",
  });

  await questCard.click({ button: "right" });
  await page.waitForTimeout(200);
  await editQuestMenuItem.click();

  await page.waitForTimeout(200);
  await expect(h1).toHaveText("Edit Quest");

  // 1) Open the dropdown:
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(200);
  await trigger.click();

  // 2) Click Aether"
  await page.locator('div[role="option"]', { hasText: "Aether" }).click();
  await page.waitForTimeout(200);

  await page.fill("#quest-title", "Updated Quest 3");
  await page.fill(
    "#quest-description",
    "Some updated description for quest 3 to make it harder"
  );

  await updateQuestButton.click();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  await card.click({ button: "right" });
  await page.waitForTimeout(200);

  await viewMyQuestsMenuItem.click();

  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");

  // +++++++++++ Client Logout Flow +++++++++++
  await logoutLink.click();
  await page.waitForTimeout(200);
  await expect(loginLink).toBeVisible();
});

test("Dev 1 - is able to add an estimation to these quests", async ({
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
  const h2 = page.locator("h2");

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login as a Dev +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, devEmail1, devPassword1);

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
  await expect(h2.nth(0)).toHaveText("Updated Quest 3");
  await page.fill("#difficulty-score", "50");
  await page.fill("#number-of-day", "8");
  await page.fill(
    "#comment",
    "some comment about it being roughly mid difficulty"
  );
  await submitEstimatesButton.click();

  await page.getByRole("button", { name: "Yes, submit" }).click();

  // +++++++++++ Client Logs out +++++++++++
  await logoutLink.click();
  await page.waitForTimeout(200);
  await expect(loginLink).toBeVisible();
});

test("Dev 2 - is able to add an estimation to these quests", async ({
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
  const h2 = page.locator("h2");

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login as a Dev +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, devEmail2, devPassword2);

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
  await expect(h2.nth(0)).toHaveText("Updated Quest 3");
  await page.fill("#difficulty-score", "50");
  await page.fill("#number-of-day", "8");
  await page.fill(
    "#comment",
    "some comment about it being roughly mid difficulty"
  );
  await submitEstimatesButton.click();

  await page.getByRole("button", { name: "Yes, submit" }).click();

  // +++++++++++ Client Logs out +++++++++++
  await logoutLink.click();
  await page.waitForTimeout(200);
  await expect(loginLink).toBeVisible();
});

test("Dev 3 - is able to add an estimation to these quests", async ({
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
  const h2 = page.locator("h2");

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login as a Dev +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, devEmail3, devPassword3);

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
  await expect(h2.nth(0)).toHaveText("Updated Quest 3");
  await page.fill("#difficulty-score", "50");
  await page.fill("#number-of-day", "8");
  await page.fill(
    "#comment",
    "some comment about it being roughly mid difficulty"
  );
  await submitEstimatesButton.click();

  await page.getByRole("button", { name: "Yes, submit" }).click();

  // +++++++++++ Client Logs out +++++++++++
  await logoutLink.click();
  await page.waitForTimeout(200);
  await expect(loginLink).toBeVisible();
});

test("Client 1 - is able to set the quest status form estimated to open", async ({
  page,
}) => {
  const {
    detailsLink,
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

  // Navigate to Create quests via context menu dropdown
  await clientQuestDashboardLink.click();

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

  await page.waitForTimeout(200);

  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");

  const questCard = page
    .getByText("Updated Quest 3")
    .locator("..")
    .locator("..");
  await page.waitForTimeout(200);

  await questCard.click({ button: "right" });
  await page.waitForTimeout(200);

  const setToOpenMenuItem = page.getByRole("menuitem", {
    name: "Set to Open",
  });

  await setToOpenMenuItem.click();
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: "Confirm" }).click();

  // // +++++++++++ Final Validation and Logout +++++++++++

  await viewAllPublicQuestsLink.click();
  await expect(h1).toHaveText("All Available Quests");

  await logoutLink.click();
  await page.waitForTimeout(200);
  await expect(loginLink).toBeVisible();
});

test("Dev 1, is able to accept some quests and move it from NotStarted -> InProgress -> Review", async ({
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

  await signInAuth0(page, devEmail1, devPassword1);

  // 1. Expect the UI to reflect DEV UI

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devQuestDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  // +++++++++++ Dev accepts a quest and moves it along to Review +++++++++++
  await viewAllQuestsLink.click();
  await expect(h1).toHaveText("All Available Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await acceptQuestButton.click();
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: "Confirm" }).click();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  const questDashboardCard = page
    .getByText("Quest Dashboard")
    .locator("..")
    .locator("..");
  await page.waitForTimeout(200);

  await questDashboardCard.click({ button: "right" });
  await page.waitForTimeout(200);

  const notStartedMenuItem = page.getByRole("menuitem", {
    name: "Not Started",
  });

  await notStartedMenuItem.click();
  await expect(h1).toHaveText("Not Started");
  await page.waitForTimeout(200);
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");

  await moveToInProgressButton.click();

  await page.getByRole("button", { name: "Confirm" }).click();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  await page.waitForTimeout(200);

  await questDashboardCard.click({ button: "right" });
  await page.waitForTimeout(200);

  const inProgressMenuItem = page.getByRole("menuitem", {
    name: "In Progress",
  });

  await inProgressMenuItem.click();

  await expect(h1).toHaveText("In Progress");
  await page.waitForTimeout(200);
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");

  await moveToReviewButton.click();
  await page.getByRole("button", { name: "Confirm" }).click();

  await devQuestDashboardLink.click();

  await expect(h1).toHaveText("Quest Dashboard");

  await page.waitForTimeout(200);

  await questDashboardCard.click({ button: "right" });
  await page.waitForTimeout(200);

  const reviewMenuItem = page.getByRole("menuitem", {
    name: "Review",
  });

  await reviewMenuItem.click();

  await expect(h1).toHaveText("Review");
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");

  // +++++++++++ Dev is able to Log out +++++++++++
  await logoutLink.click();
  await page.waitForTimeout(200);
  await expect(loginLink).toBeVisible();
});

test("Client 1 - is able to move a quest in Review to Completed", async ({
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

  const questDashboardCard = page
    .getByText("Quest Dashboard")
    .locator("..")
    .locator("..");

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

  // +++++++++++ Client processes quest to Completed status +++++++++++
  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await page.waitForTimeout(200);
  
  await questDashboardCard.click({ button: "right" });
  await page.waitForTimeout(200);

  const reviewMenuItem = page.getByRole("menuitem", {
    name: "Review",
  });

  await reviewMenuItem.click();

  await expect(h1).toHaveText("Review");
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");

  await moveToCompletedButton.click();

  await page.getByRole("button", { name: "Yes, complete it" }).click();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  await questDashboardCard.click({ button: "right" });
  await page.waitForTimeout(200);

  const completedMenuItem = page.getByRole("menuitem", {
    name: "Completed",
  });

  await completedMenuItem.click();

  await expect(h1).toHaveText("Completed");

  await viewDetailsLink.click();
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText("Updated Quest 3");

  // +++++++++++ Client Logs out +++++++++++
  await logoutLink.click();
  await page.waitForTimeout(200);
  await expect(loginLink).toBeVisible();
});

test("Client 1 - deletes the quests they created", async ({ page }) => {
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

  await deleteQuests(page, "Updated Quest 3");
  await deleteQuests(page, "Quest 2");
  await deleteQuests(page, "Quest 1");

  // +++++++++++ Client Logs out +++++++++++

  await logoutLink.click();
  await page.waitForTimeout(200);
  await expect(loginLink).toBeVisible();
});
