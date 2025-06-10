import { expect, test } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const testUserEmail1 = process.env.TEST_USER_DEV_EMAIL;
const testUserPassword1 = process.env.TEST_USER_DEV_PASSWORD;

const testUserEmail2 = process.env.TEST_USER_CLIENT_EMAIL;
const testUserPassword2 = process.env.TEST_USER_CLIENT_PASSWORD;

// to pause a step - await page.pause();

test("Client user logs in with Google, is able to create multiple quests", async ({
  page,
}) => {
  const h1 = page.locator("h1");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const clientQuestDashboardLink = page.getByRole("link", {
    name: "Client Quests Dashboard",
  });
  const createAQuestLink = page.getByRole("link", { name: "Create a quest" });
  const createQuestLink = page.getByRole("button", { name: "Create Quest" });

  const clientProfileLink = page.getByRole("link", { name: "Client Profile" });

  const viewAllPublicQuestsLink = page.getByRole("link", {
    name: "View all quests",
  });

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
  await page.getByLabel("Email or phone").fill(testUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testUserPassword2);
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
  await createQuestLink.click();

  // wait 500 ms before doing the next one
  await page.waitForTimeout(500);

  await page.fill("#quest-title", "Quest 2");
  await page.fill("#quest-description", "Some description for quest 2");
  await createQuestLink.click();

  // another 500 ms pause
  await page.waitForTimeout(500);

  await page.fill("#quest-title", "Quest 3");
  await page.fill("#quest-description", "Some description for quest 3");
  await createQuestLink.click();

  await viewAllPublicQuestsLink.click();
  await expect(h1).toHaveText("All Available Open Quests");
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Dev user logs in with Google, is able to accept some quests and move it from NotStarted -> InProgress -> Review", async ({
  page,
}) => {
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  // 👤 Dev-specific navigation links
  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const devQuestDashboardLink = page.getByRole("link", {
    name: "Dev Quests Dashboard",
  });
  const devProfileLink = page.getByRole("link", { name: "Dev Profile" });

  const viewQuestLink = page.getByRole("link", { name: "View Quest →" });

  const acceptQuestButton = page.getByRole("button", { name: "Accept Quest" });
  const viewDetailsButton = page.getByRole("button", { name: "View Details" });

  const notStartedButton = page.getByRole("button", { name: "Not Started" });
  const inProgressButton = page.getByRole("button", { name: "In Progress" });
  const reviewButton = page.getByRole("button", { name: "Review" });

  const moveToInProgressButton = page.getByRole("button", {
    name: "Move quest to In Progress",
  });
  const moveToReviewButton = page.getByRole("button", {
    name: "Move quest to in Review",
  });
  const moveToCompletedButton = page.getByRole("button", {
    name: "Move quest to Completed",
  });
  const moveToFailedButton = page.getByRole("button", {
    name: "Move quest to Failed",
  });

  const h1 = page.locator("h1");

  // 👉 Auth0 / Google login flow
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  const googleButton = page.getByRole("button", {
    name: /continue with google/i,
  });
  await expect(googleButton).toBeVisible();
  await googleButton.click();

  // 📧 Gmail login
  await page.getByLabel("Email or phone").fill(testUserEmail1);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testUserPassword1);
  await page.getByRole("button", { name: "Next" }).click();

  // 1. Expect the UI to reflect Client login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devQuestDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  // 2. Accept a quest
  await viewAllQuestsLink.click();
  await expect(h1).toHaveText("All Available Open Quests");
  await viewQuestLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await acceptQuestButton.click();
  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Dev Quest Dashboard");
  await notStartedButton.click();
  await expect(h1).toHaveText("Not Started");
  await viewDetailsButton.click();
  await expect(h1).toHaveText("Quest Details");
  await page.goBack();
  await moveToInProgressButton.click();
  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Dev Quest Dashboard");
  await inProgressButton.click();
  await expect(h1).toHaveText("In Progress");
  await viewDetailsButton.click();
  await expect(h1).toHaveText("Quest Details");
  await page.goBack();
  await moveToReviewButton.click();
  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Dev Quest Dashboard");
  await reviewButton.click();
  await expect(h1).toHaveText("Review");
  await viewDetailsButton.click();
  await page.goBack();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
