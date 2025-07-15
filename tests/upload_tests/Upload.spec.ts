import { expect, Locator, test } from "@playwright/test";

import {
  testClientUserEmail1,
  testClientUserPassword1,
  testDevUserEmail1,
  testDevUserPassword1,
} from "@/configuration/Appconfig";

import { devQuestElements } from "@/selectors/DevQuestSelectors";

import {
  questPageHeadings,
  uploadFileTestQuests,
} from "@/constants/CreateQuestsConstants";
import { createQuest } from "@/helpers/CreateQuestsHelper";
import { signInWithGoogle } from "@/helpers/GoogleOAuthHelper";
import { clientQuestElements } from "@/selectors/ClientQuestSelectors";
import fs from "fs-extra";
import path from "path";

fs.emptyDirSync(path.resolve(__dirname, "../../downloads"));

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
    uploadFileTestQuests.title1,
    uploadFileTestQuests.description1,
    uploadFileTestQuests.criteria1,
    uploadFileTestQuests.rank1
  );

  await createQuest(
    page,
    uploadFileTestQuests.title2,
    uploadFileTestQuests.description2,
    uploadFileTestQuests.criteria2,
    uploadFileTestQuests.rank2
  );

  await createQuest(
    page,
    uploadFileTestQuests.title3,
    uploadFileTestQuests.description3,
    uploadFileTestQuests.criteria3,
    uploadFileTestQuests.rank3
  );

  await page.waitForTimeout(250);

  // // +++++++++++ Final Validation and Logout +++++++++++

  await viewAllPublicQuestsLink.click();
  await expect(h1).toHaveText("All Available Quests");

  await logoutLink.click();
  await page.waitForTimeout(500);
  await expect(loginLink).toBeVisible();
});

test("Dev 1 - user logs in with Google, is able to accept some quests and move it from NotStarted -> InProgress -> Review", async ({
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
  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInWithGoogle(page, testDevUserEmail1, testDevUserPassword1);

  // +++++++++++ Expect the UI to reflect Client UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devQuestDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  // 2. Accept two quests
  await viewAllQuestsLink.click();
  await expect(h1).toHaveText("All Available Quests");

  const detailsLinks = page.locator('[data-testid^="details-link-"]');
  await detailsLinks.nth(2).click(); // Clicks the second "Details" link
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText(uploadFileTestQuests.title1);
  await acceptQuestButton.click();

  await page.goBack();
  await detailsLinks.nth(1).click(); // Clicks the third "Details" link
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText(uploadFileTestQuests.title2);
  await acceptQuestButton.click();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await notStartedButton.click();
  await expect(h1).toHaveText("Not Started");

  await expect(page.locator("#quest-title").nth(0)).toHaveText(
    uploadFileTestQuests.title2
  );
  await expect(page.locator("#quest-title").nth(1)).toHaveText(
    uploadFileTestQuests.title1
  );
  await moveToInProgressButton.nth(0).click();
  await moveToInProgressButton.nth(1).click();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  await inProgressButton.click();
  await expect(h1).toHaveText("In Progress");
  await expect(page.locator("#quest-title").nth(0)).toHaveText(
    uploadFileTestQuests.title2
  );
  await expect(page.locator("#quest-title").nth(1)).toHaveText(
    uploadFileTestQuests.title1
  );
  await moveToReviewButton.nth(0).click();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await reviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(page.locator("#quest-title").nth(0)).toHaveText(
    uploadFileTestQuests.title2
  );

  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Dev 1 - When the task is in 'In Progress' a Developer can upload a file - Upload File Quest 1", async ({
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
  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInWithGoogle(page, testDevUserEmail1, testDevUserPassword1);

  // +++++++++++ Expect the UI to reflect Client UI +++++++++++
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
    uploadFileTestQuests.title1
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

test("Dev 1 - When the task is in 'Review' a Developer can upload a file", async ({
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
  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInWithGoogle(page, testDevUserEmail1, testDevUserPassword1);

  // +++++++++++ Expect the UI to reflect Client UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devQuestDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  await reviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(page.locator("#quest-title")).toHaveText(uploadFileTestQuests.title2);
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

test("Client 1 - Client is able to download a file uploaded by the dev for a task in 'In Progress'", async ({
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
  await expect(h1).toHaveText("Quest Dashboard");

  await clientInProgressButton.click();
  await expect(h1).toHaveText("In Progress");
  await expect(page.locator("#quest-title").nth(0)).toHaveText(
    uploadFileTestQuests.title1
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

test("Client 1 - Client is able to download a file uploaded by the dev for a task in 'Review'", async ({
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
  await expect(h1).toHaveText("Quest Dashboard");
  await clientReviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(page.locator("#quest-title")).toHaveText(uploadFileTestQuests.title2);

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
  await expect(page.locator("#quest-title")).toHaveText(uploadFileTestQuests.title2);
});

test("Client 1 - Moves the task in review to 'Completed'", async ({ page }) => {
  const {
    loginLink,
    logoutLink,
    clientQuestDashboardLink,
    clientProfileLink,
    viewAllQuestsLink,
    clientReviewButton,
    moveToCompletedButton,
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

  await clientReviewButton.click();
  await expect(h1).toHaveText("Review");
  await moveToCompletedButton.click();

  await logoutLink.click();
  await page.waitForTimeout(250);
  await expect(loginLink).toBeVisible();
});

test("Client 1 - can only delete Open or Completed Quests", async ({
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
  const nagivateToHome = page.goto("/");

  // Helper: navigate and verify page title
  const navigateTo = async (clickTarget: Locator, expectedTitle: string) => {
    await clickTarget.click();
    await expect(h1).toHaveText(expectedTitle);
  };

  // Helper: delete a quest by expected title
  const deleteQuestWithTitle = async (expectedTitle: string) => {
    await navigateTo(clientQuestDashboardLink, "Quest Dashboard");
    await navigateTo(viewMyQuestsLink, "My Quests");
    await detailsLink.first().click();
    await expect(h1).toHaveText("Quest Details");
    await expect(page.locator("#quest-title")).toHaveText(expectedTitle);
    await page.waitForTimeout(250); // consider replacing with explicit wait
    await deleteQuestButton.click();
  };

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

  // ---------- Assert client UI ----------
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  // ---------- Delete quests ----------
  await deleteQuestWithTitle(uploadFileTestQuests.title3);
  await deleteQuestWithTitle(uploadFileTestQuests.title2);
  await deleteQuestWithTitle(uploadFileTestQuests.title1);

  // ---------- Logout ----------
  await logoutLink.click();
  await page.waitForTimeout(250);
  await expect(loginLink).toBeVisible();
});
