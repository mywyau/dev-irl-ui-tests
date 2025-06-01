import { expect, test } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

const testUserEmail2 = process.env.TEST_USER_CLIENT_EMAIL;
const testUserPassword2 = process.env.TEST_USER_CLIENT_PASSWORD;

// to pause a step - await page.pause();

test("Client user logs in with Google, is able to complete registration", async ({
  page,
}) => {
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  // 👤 Dev-specific navigation links
  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const clientQuestDashboardLink = page.getByRole("link", {
    name: "Client Quests Dashboard",
  });
  const clientProfileLink = page.getByRole("link", { name: "Client Profile" });

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

  // ✅ Expect the UI to reflect Dev login
  await expect(logoutLink).toBeVisible();

  // 1. Click the dropdown trigger by role or fallback to text-based locator
  // await page.locator('button[role="combobox"]').click();
  const selectTrigger = page.locator('button:has-text("Select your role...")').click();

  // 2. Wait for dropdown content to appear and click "Dev"
  await page.locator('[data-state="open"] >> text=Client').click();
  // 3. Click the continue button
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(viewAllQuestsLink).toBeVisible();
  await expect(clientQuestDashboardLink).toBeVisible();
  await expect(clientProfileLink).toBeVisible();

  await clientProfileLink.click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Client user logs in with Google, is able to create a quest", async ({
  page,
}) => {
  // 🏠 Navigate to homepage
  await page.goto("/");

  // 🧭 Top-level nav elements
  const loginLink = page.getByRole("link", { name: "Login" });
  const logoutLink = page.getByRole("link", { name: "Logout" });

  // 👤 Dev-specific navigation links
  const viewAllQuestsLink = page.getByRole("link", { name: "View all quests" });
  const clientQuestDashboardLink = page.getByRole("link", {
    name: "Client Quests Dashboard",
  });
  const createAQuestsLink = page.getByRole("link", { name: "Create a quest" });
  const viewMyQuestsLink = page.getByRole("link", { name: "View my quests" });
  const clientProfileLink = page.getByRole("link", { name: "Client Profile" });
  const createQuestLink = page.getByRole("button", { name: "Create Quest" });
  const viewAllPublicQuestsLink = page.getByRole("link", {
    name: "View all quests",
  });

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
  await createAQuestsLink.click();
  await page.fill("#quest-title", "Quest 1");
  await page.fill("#quest-description", "Some description for quest 1");
  await createQuestLink.click();
  await viewAllPublicQuestsLink.click();
});
