// These tests bleed into each other i.e. they sequentially set next test up with data creation, edits etc.
// Note to self do not let tests/app/data state bleed from one spec to another. As a necessary evil keep within the same spec.

import { expect, test } from "@playwright/test";

import {
  testClientUserEmail2,
  testClientUserPassword2,
  testDevUserEmail2,
  testDevUserPassword2,
} from "@/configuration/Appconfig";

import { devQuestElements } from "@/pages/DevQuestPage";

import { clientQuestElements } from "@/pages/ClientQuestPage";
import fs from "fs-extra";
import path from "path";

fs.emptyDirSync(path.resolve(__dirname, "../../downloads"));

test("Client 2 - user logs in with Google, is able to create multiple quests", async ({
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

  // Quest creation ++++++++++++++++++++++++++

  await page.waitForTimeout(250);
  await expect(h1).toHaveText("Create a New Quest");

  // 1) Open the dropdown:
  const trigger = page.locator("#rank-select");
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(500);
  await trigger.click();

  // 2) Click “Mithril"
  // Wait for dropdown panel to appear
  // Ensure it's visible before clicking
  await page.locator('div[role="option"]', { hasText: "Mithril" }).click();
  await page.waitForTimeout(1000);

  await page.locator("#language-tag-selector").fill("Python");
  await page.locator("#language-opt-python").click();
  await page.locator("#language-tag-selector").clear();

  await page.fill("#language-tag-selector", "Scala");
  await page.locator("#language-opt-scala").click();
  await page.locator("#language-tag-selector").clear();

  await page.fill("#language-tag-selector", "TypeScript");
  await page.locator("#language-opt-typescript").click();
  await page.locator("#language-tag-selector").clear();

  await page.fill("#quest-title", "Upload File Quest 1");
  await page.fill("#quest-description", "Some description for quest 1");
  await page.fill("#acceptance-criteria", "Some acceptance criteria");
  await page.waitForTimeout(500);
  await createQuestButton.click();

  await page.waitForTimeout(500);

  // 1) Open the dropdown:
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(500);
  await trigger.click();

  // 2) Click “Mithril"
  // Wait for dropdown panel to appear
  // Ensure it's visible before clicking
  await page.locator('div[role="option"]', { hasText: "Demon" }).click();
  await page.waitForTimeout(1000);

  await page.locator("#language-tag-selector").fill("Python");
  await page.locator("#language-opt-python").click();
  await page.locator("#language-tag-selector").clear();

  await page.fill("#language-tag-selector", "Scala");
  await page.locator("#language-opt-scala").click();
  await page.locator("#language-tag-selector").clear();

  await page.fill("#language-tag-selector", "TypeScript");
  await page.locator("#language-opt-typescript").click();
  await page.locator("#language-tag-selector").clear();

  await page.fill("#quest-title", "Upload File Quest 2");
  await page.fill("#quest-description", "Some description for quest 2");
  await page.fill("#acceptance-criteria", "Some acceptance criteria 2");
  await page.waitForTimeout(500);
  await createQuestButton.click();

  await page.waitForTimeout(500);

  // 1) Open the dropdown:
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(500);
  await trigger.click();

  // 2) Click “Aether"
  // Wait for dropdown panel to appear
  // Ensure it's visible before clicking
  await page.locator('div[role="option"]', { hasText: "Aether" }).click();
  await page.waitForTimeout(1000);

  await page.locator("#language-tag-selector").fill("Python");
  await page.locator("#language-opt-python").click();
  await page.locator("#language-tag-selector").clear();

  await page.fill("#language-tag-selector", "Scala");
  await page.locator("#language-opt-scala").click();
  await page.locator("#language-tag-selector").clear();

  await page.fill("#language-tag-selector", "TypeScript");
  await page.locator("#language-opt-typescript").click();
  await page.locator("#language-tag-selector").clear();

  await page.fill("#quest-title", "Upload File Quest 3");
  await page.fill("#quest-description", "Some description for quest 3");
  await page.fill("#acceptance-criteria", "Some acceptance criteria 3");
  await page.waitForTimeout(500);
  await createQuestButton.click();

  await page.waitForTimeout(500);

  // ++++++++++++++++++++++++++

  await viewAllPublicQuestsLink.click();
  await expect(h1).toHaveText("All Available Open Quests");
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Dev 2 - user logs in with Google, is able to accept some quests and move it from NotStarted -> InProgress -> Review", async ({
  page,
}) => {
  const {
    loginLink,
    logoutLink,
    devProfileLink,
    devQuestDashboardLink,
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
  await page.getByLabel("Email or phone").fill(testDevUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testDevUserPassword2);
  await page.getByRole("button", { name: "Next" }).click();

  // 1. Expect the UI to reflect Client login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devQuestDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  // 2. Accept two quests
  await viewAllQuestsLink.click();
  await expect(h1).toHaveText("All Available Open Quests");

  const detailsLinks = page.locator('[data-testid^="details-link-"]');
  await detailsLinks.nth(2).click(); // Clicks the second "Details" link
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText("Upload File Quest 1");
  await acceptQuestButton.click();

  await page.goBack();
  await detailsLinks.nth(1).click(); // Clicks the third "Details" link
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText("Upload File Quest 2");
  await acceptQuestButton.click();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await notStartedButton.click();
  await expect(h1).toHaveText("Not Started");

  await expect(page.locator("#quest-title").nth(0)).toHaveText(
    "Upload File Quest 2"
  );
  await expect(page.locator("#quest-title").nth(1)).toHaveText(
    "Upload File Quest 1"
  );
  await moveToInProgressButton.nth(0).click();
  await moveToInProgressButton.nth(1).click();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  await inProgressButton.click();
  await expect(h1).toHaveText("In Progress");
  await expect(page.locator("#quest-title").nth(0)).toHaveText(
    "Upload File Quest 2"
  );
  await expect(page.locator("#quest-title").nth(1)).toHaveText(
    "Upload File Quest 1"
  );
  await moveToReviewButton.nth(0).click();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await reviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(page.locator("#quest-title").nth(0)).toHaveText(
    "Upload File Quest 2"
  );

  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Dev 2 - When the task is in 'In Progress' a Developer can upload a file - Upload File Quest 1", async ({
  page,
}) => {
  const {
    loginLink,
    logoutLink,
    devProfileLink,
    devQuestDashboardLink,
    viewAllQuestsLink,
    inProgressButton,
    uploadFileButton,
    uploadButton,
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
  await page.getByLabel("Email or phone").fill(testDevUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testDevUserPassword2);
  await page.getByRole("button", { name: "Next" }).click();

  // 1. Expect the UI to reflect Client login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devQuestDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  // await inProgressButton.click();
  await inProgressButton.click();
  await expect(h1).toHaveText("In Progress");
  await expect(page.locator("#quest-title").nth(0)).toHaveText(
    "Upload File Quest 1"
  );

  await uploadFileButton.click();

  // Upload the file
  const filePath = path.resolve(__dirname, "../../resources/test_file.ts");
  await page.locator('input[type="file"]').setInputFiles(filePath);

  await expect(
    page.locator("#__nuxt > div > main > div > div > p:nth-child(1)")
  ).toHaveText("Name: test_file.ts");

  await uploadButton.click();

  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Dev 2 - When the task is in 'Review' a Developer can upload a file", async ({
  page,
}) => {
  const {
    loginLink,
    logoutLink,
    devProfileLink,
    devQuestDashboardLink,
    viewAllQuestsLink,
    reviewButton,
    uploadFileButton,
    uploadButton,
  } = devQuestElements(page);

  const h1 = page.locator("h1");

  const googleButton = page.getByRole("button", {
    name: /Continue with google/i,
  });

  // Locate the file input
  const fileInput = page.locator('input[type="file"]');

  // 🏠 Navigate to homepage
  await page.goto("/");

  // 👉 Auth0 / Google login flow
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await expect(googleButton).toBeVisible();
  await googleButton.click();

  // 📧 Gmail login
  await page.getByLabel("Email or phone").fill(testDevUserEmail2);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testDevUserPassword2);
  await page.getByRole("button", { name: "Next" }).click();

  // 1. Expect the UI to reflect Client login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devQuestDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  await reviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(page.locator("#quest-title")).toHaveText("Upload File Quest 2");
  await uploadFileButton.click();

  // Upload the file
  const filePath = path.resolve(__dirname, "../../resources/test_file.ts");
  await page.locator('input[type="file"]').setInputFiles(filePath);

  await expect(
    page.locator("#__nuxt > div > main > div > div > p:nth-child(1)")
  ).toHaveText("Name: test_file.ts");

  await uploadButton.click();

  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Client 2 - Client is able to download a file uploaded by the dev for a task in 'In Progress'", async ({
  page,
}) => {
  const {
    loginLink,
    logoutLink,
    clientQuestDashboardLink,
    clientProfileLink,
    viewAllQuestsLink,
    viewDetailsLink,
    clientInProgressButton,
    downloadButton,
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
  await expect(h1).toHaveText("Quest Dashboard");

  await clientInProgressButton.click();
  await expect(h1).toHaveText("In Progress");
  await expect(page.locator("#quest-title").nth(0)).toHaveText(
    "Upload File Quest 1"
  );
  await viewDetailsLink.click();

  await expect(h1).toHaveText("Quest Details");
  await downloadButton.click();
  await expect(h1).toHaveText("Files Uploaded");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    downloadButton.click(),
  ]);

  const suggestedFilename = download.suggestedFilename();
  await download.saveAs(`downloads/${suggestedFilename}`);
});

test("Client 2 - Client is able to download a file uploaded by the dev for a task in 'Review'", async ({
  page,
}) => {
  const {
    loginLink,
    logoutLink,
    clientQuestDashboardLink,
    clientProfileLink,
    viewAllQuestsLink,
    viewDetailsLink,
    clientReviewButton,
    downloadButton,
    moveToCompletedButton,
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
  await expect(h1).toHaveText("Quest Dashboard");
  await clientReviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(page.locator("#quest-title")).toHaveText("Upload File Quest 2");

  await viewDetailsLink.click();
  await expect(h1).toHaveText("Quest Details");
  await downloadButton.click();
  await expect(h1).toHaveText("Files Uploaded");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    downloadButton.click(),
  ]);

  const suggestedFilename = download.suggestedFilename();
  await download.saveAs(`downloads/${suggestedFilename}`);

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await clientReviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(page.locator("#quest-title")).toHaveText("Upload File Quest 2");
  await moveToCompletedButton.click();
});

test("Client 2 - can only delete Open or Completed Quests", async ({
  page,
}) => {
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
  await expect(h1).toHaveText("Quest Dashboard");
  await viewMyQuestsLink.click();
  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText("Upload File Quest 3");
  await page.waitForTimeout(500);
  await deleteQuestButton.click();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await viewMyQuestsLink.click();
  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText("Upload File Quest 2");
  await page.waitForTimeout(500);
  await deleteQuestButton.click();

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await viewMyQuestsLink.click();
  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText("Upload File Quest 1");
  await page.waitForTimeout(500);
  await deleteQuestButton.click();

  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
