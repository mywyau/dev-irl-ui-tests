// These tests bleed into each other i.e. they sequentially set next test up with data creation, edits etc.

// Note to self do not let tests/app/data state bleed from one spec to another. As a necessary evil keep within the same spec.

import { expect, test } from "@playwright/test";

import {
  testDevUserEmail1,
  testDevUserPassword1,
} from "@/configuration/Appconfig";

import { devQuestElements } from "@/pages/DevQuestPage";

import path from "path";

const filePath = path.resolve(__dirname, "../resources/testfile.txt");

test("When the task is in 'Review' a Developer can upload a file", async ({
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
    inProgressButton,
    reviewButton,
    uploadFileButton,
    uploadButton
  } = devQuestElements(page);

  const h1 = page.locator("h1");
  const h2 = page.locator("h2");

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
  await page.getByLabel("Email or phone").fill(testDevUserEmail1);
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Enter your password").fill(testDevUserPassword1);
  await page.getByRole("button", { name: "Next" }).click();

  // 1. Expect the UI to reflect Client login
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(devQuestDashboardLink).toBeVisible();
  await expect(devProfileLink).toBeVisible();

  await devQuestDashboardLink.click();
  await expect(h1).toHaveText("Dev Quest Dashboard");

  // await inProgressButton.click();
  await reviewButton.click();
  await expect(h1).toHaveText("Review");
  await expect(h2).toHaveText("Updated Quest 3");
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

test("When the task is in 'In Progress' a Developer can upload a file", async ({
  page,
}) => {});

test("Client is able to download a file uploaded by the dev", async ({
  page,
}) => {});
