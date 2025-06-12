// These tests bleed into each other i.e. they sequentially set next test up with data creation, edits etc.

// Note to self do not let tests/app/data state bleed from one spec to another. As a necessary evil keep within the same spec.

import { expect, test } from "@playwright/test";

import {
  testClientUserEmail2,
  testClientUserPassword2,
  testDevUserEmail1,
  testDevUserPassword1,
} from "@/configuration/Appconfig";

import { clientQuestElements } from "@/pages/ClientQuestPage";
import { devQuestElements } from "@/pages/DevQuestPage";

// to pause a step - await page.pause();

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

  await page.waitForTimeout(500);

  await page.fill("#quest-title", "Quest 2");
  await page.fill("#quest-description", "Some description for quest 2");
  await createQuestButton.click();

  await page.waitForTimeout(500);

  await page.fill("#quest-title", "Quest 3");
  await page.fill("#quest-description", "Some description for quest 3");
  await createQuestButton.click();

  await viewAllPublicQuestsLink.click();
  await expect(h1).toHaveText("All Available Open Quests");
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Client can edit a previously created quest", async ({ page }) => {
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

  const h1 = page.locator("h1");
  const h2 = page.locator("h2");

  const googleButton = page.getByRole("button", {
    name: /continue with google/i,
  });

  // 🏠 Navigate to homepage
  await page.goto("/");

  // 👉 Auth0 / Google login flow
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await expect(googleButton).toBeVisible();
  await googleButton.click();

  // 📧 Gmail login
  await page.getByLabel("Email or phone").fill(testClientUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testClientUserPassword2);
  await page.getByRole("button", { name: "Next" }).click();

  // 1. Expect the UI to reflect Client login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Client Quest Dashboard");
  await viewMyQuestsLink.click();
  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(h2).toHaveText("Quest 3");
  await page.waitForTimeout(500);

  await editQuestButton.click();

  await page.waitForTimeout(250);
  await expect(h1).toHaveText("Edit Quest");
  await page.fill("#quest-title", "Updated Quest 3");
  await page.fill("#quest-description", "Some updated description for quest 3");
  await updateQuestButton.click();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Client Quest Dashboard");
  await viewMyQuestsLink.click();
  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(h2).toHaveText("Updated Quest 3");

  // TODO: Fix;
  await logoutLink.click();
  await logoutLink.click();
  await page.waitForTimeout(2000);
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

  const h1 = page.locator("h1");
  const h2 = page.locator("h2");

  const googleButton = page.getByRole("button", {
    name: /Continue with google/i,
  });

  // 🏠 Navigate to homepage
  await page.goto("/");

  // 👉 Auth0 / Google login flow
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await expect(googleButton).toBeVisible();
  await googleButton.click();

  // 📧 Gmail login
  await page.getByLabel("Email or phone").fill(testDevUserEmail1);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testDevUserPassword1);
  await page.getByRole("button", { name: "Next" }).click();

  // 1. Expect the UI to reflect Client login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devQuestDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  // 2. Accept a quest
  await viewAllQuestsLink.click();
  await expect(h1).toHaveText("All Available Open Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await acceptQuestButton.click();
  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Dev Quest Dashboard");
  await notStartedButton.click();
  await expect(h1).toHaveText("Not Started");
  await expect(h2).toHaveText("Updated Quest 3");
  await viewDetailsLink.click();
  await expect(h1).toHaveText("Quest Details");
  await page.goBack();
  await moveToInProgressButton.click();
  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Dev Quest Dashboard");
  await inProgressButton.click();
  await expect(h1).toHaveText("In Progress");
  await expect(h2).toHaveText("Updated Quest 3");
  await viewDetailsLink.click();
  await expect(h1).toHaveText("Quest Details");
  await page.goBack();
  await moveToReviewButton.click();
  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Dev Quest Dashboard");
  await reviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(h2).toHaveText("Updated Quest 3");
  await viewDetailsLink.click();
  await page.goBack();

  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Clinet user logs in with Google, is able to move a quest in Review to Completed", async ({
  page,
}) => {
  const {
    loginLink,
    logoutLink,
    viewDetailsLink,
    detailsLink,
    viewAllQuestsLink,
    clientProfileLink,
    clientQuestDashboardLink,
    clientReviewButton,
    clientCompletedButton,
    moveToCompletedButton,
    moveToFailedButton,
  } = clientQuestElements(page);

  const h1 = page.locator("h1");
  const h2 = page.locator("h2");

  const googleButton = page.getByRole("button", {
    name: /Continue with google/i,
  });

  // Client flow to move quest to completed
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 👉 Auth0 / Google login flow
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await expect(googleButton).toBeVisible();
  await googleButton.click();

  // 📧 Gmail login
  await page.getByLabel("Email or phone").fill(testClientUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testClientUserPassword2);
  await page.getByRole("button", { name: "Next" }).click();

  // 1. Expect the UI to reflect Client login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Client Quest Dashboard");
  await clientReviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(h2).toHaveText("Updated Quest 3");

  await viewDetailsLink.click();
  await expect(h1).toHaveText("Quest Details");
  await page.goBack();
  await moveToCompletedButton.click();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Client Quest Dashboard");
  await clientCompletedButton.click();

  await expect(h1).toHaveText("Completed");
  await viewDetailsLink.click();
  await expect(h1).toHaveText("Quest Details");
  await expect(h2).toHaveText("Updated Quest 3");

  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Client deletes created quests", async ({ page }) => {
  const {
    loginLink,
    logoutLink,
    clientProfileLink,
    clientQuestDashboardLink,
    deleteQuestButton,
    viewMyQuestsLink,
    detailsLink,
    viewAllQuestsLink,
  } = clientQuestElements(page);

  const h1 = page.locator("h1");
  const h2 = page.locator("h2");

  const googleButton = page.getByRole("button", {
    name: /continue with google/i,
  });

  // 🏠 Navigate to homepage
  await page.goto("/");

  // 👉 Auth0 / Google login flow
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await expect(googleButton).toBeVisible();
  await googleButton.click();

  // 📧 Gmail login
  await page.getByLabel("Email or phone").fill(testClientUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testClientUserPassword2);
  await page.getByRole("button", { name: "Next" }).click();

  // 1. Expect the UI to reflect Client login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Client Quest Dashboard");
  await viewMyQuestsLink.click();
  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(h2).toHaveText("Updated Quest 3");
  await page.waitForTimeout(500);
  await deleteQuestButton.click();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Client Quest Dashboard");
  await viewMyQuestsLink.click();
  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(h2).toHaveText("Quest 2");
  await page.waitForTimeout(500);
  await deleteQuestButton.click();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Client Quest Dashboard");
  await viewMyQuestsLink.click();
  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(h2).toHaveText("Quest 1");
  await page.waitForTimeout(500);
  await deleteQuestButton.click();

  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
