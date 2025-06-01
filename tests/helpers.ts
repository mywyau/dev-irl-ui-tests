// // tests/helpers.ts
// import { Page, expect } from "@playwright/test";

// // You can tweak these to match your actual routes:
// export const BASE_URL = "http://localhost:3000";

// export const selectors = {
//   // Top-level navigation
//   loginLink:    (page: Page) => page.getByRole("link", { name: "Login" }),
//   logoutLink:   (page: Page) => page.getByRole("link", { name: "Logout" }),
//   viewAllQuestsLink: (page: Page) => page.getByRole("link", { name: "View all quests" }),
//   clientQuestDashboardLink: (page: Page) =>
//     page.getByRole("link", { name: "Client Quests Dashboard" }),
//   clientProfileLink: (page: Page) => page.getByRole("link", { name: "Client Profile" }),
//   createAQuestsLink:  (page: Page) => page.getByRole("link", { name: "Create a quest" }),
//   viewMyQuestsLink:   (page: Page) => page.getByRole("link", { name: "View my quests" }),
//   createQuestButton:  (page: Page) => page.getByRole("button", { name: "Create Quest" }),
//   viewAllPublicQuestsLink: (page: Page) =>
//     page.getByRole("link", { name: "View all quests" }),

//   // The “Select your role” dropdown (data-testid approach)
//   roleTrigger:      (page: Page) => page.locator('[data-testid="role-select-trigger"]'),
//   roleContent:      (page: Page) => page.locator('[data-testid="role-select-content"]'),
//   roleClientOption: (page: Page) => page.locator('[data-testid="role-select-item-Client"]'),

//   // The “Continue” button on the signup form
//   continueButton:   (page: Page) => page.getByRole("button", { name: "Continue" }),

//   // Quest input fields
//   questTitle:       (page: Page) => page.locator("#quest-title"),
//   questDescription: (page: Page) => page.locator("#quest-description"),
// };

// /**
//  * Performs the Google login flow (Auth0 → Google).
//  * Assumes that clicking the “Continue with Google” button either spawns a popup or
//  * causes a navigation to accounts.google.com, and then eventually redirects back to /complete-signup.
//  */
// export async function loginWithGoogle(page: Page, email: string, password: string) {
//   // 1) Navigate to homepage
//   await page.goto(BASE_URL);

//   // 2) Click “Login”
//   const login = selectors.loginLink(page);
//   await expect(login).toBeVisible();
//   await login.click();

//   // 3) Click “Continue with Google”
//   const googleBtn = page.getByRole("button", { name: /continue with google/i });
//   await expect(googleBtn).toBeVisible();

//   // Either a popup opens or the page navigates to accounts.google.com
//   const [maybePopup] = await Promise.all([
//     page.waitForEvent("popup").catch(() => null),
//     page.waitForNavigation({ url: /accounts\.google\.com/, timeout: 10000 }).catch(() => null),
//     googleBtn.click(),
//   ]);

  

//   const googlePage = (maybePopup as Page) ?? page;

//   // 4) Fill email
// //   await googlePage.waitForSelector('input[type="email"]', { timeout: 10000 });
//   await googlePage.getByLabel('input[type="email"]', email);
//   await googlePage.click('button:has-text("Next")');

//   // 5) Fill password
//   await googlePage.waitForSelector('input[type="password"]', { timeout: 10000 });
//   await googlePage.fill('input[type="password"]', password);
//   await googlePage.click('button:has-text("Next")');

//   // 6) If we used a popup, wait for it to close and then wait for the main page to navigate.
//   if (maybePopup) {
//     await (maybePopup as Page).waitForEvent("close", { timeout: 10000 });
//     await page.waitForURL("**/complete-signup", { timeout: 20000 });
//   } else {
//     // If Google flow happened in the same tab, just wait for the redirect back
//     await page.waitForURL("**/complete-signup", { timeout: 20000 });
//   }

//   // 7) Now we should be back in your app and “logged in”
//   const logout = selectors.logoutLink(page);
//   await expect(logout).toBeVisible({ timeout: 10000 });
// }

// /**
//  * On the “Complete Your Signup” page (URL ends in /complete-signup),
//  * open the “Select your role” dropdown, pick "Client", and click Continue.
//  */
// export async function completeSignup(page: Page) {
//   // 1) Wait for the trigger to appear
//   const trigger = selectors.roleTrigger(page);
//   await expect(trigger).toBeVisible({ timeout: 10000 });
//   await expect(trigger).toBeEnabled();
//   await trigger.click();

//   // 2) Wait for the dropdown content to become visible
//   const content = selectors.roleContent(page).filter({ has: page.locator('[data-state="open"]') });
//   await expect(content).toBeVisible({ timeout: 5000 });

//   // 3) Click the “Client” option
//   const clientOpt = selectors.roleClientOption(page);
//   await expect(clientOpt).toBeVisible({ timeout: 5000 });
//   await clientOpt.click();

//   // 4) Verify trigger text changed to “Client”
//   await expect(trigger).toHaveText("Client");

//   // 5) Click the “Continue” button
//   const cont = selectors.continueButton(page);
//   await expect(cont).toBeEnabled({ timeout: 5000 });
//   await cont.click();
// }

// /**
//  * Navigate to the Client Quests Dashboard, create three quests in a row,
//  * then navigate to “View all quests.”
//  */
// export async function createThreeQuests(page: Page) {
//   // Assumes the user is already logged in and on a page where the “Client Quests Dashboard” link is visible.
//   const dashboardLink = selectors.clientQuestDashboardLink(page);
//   await expect(dashboardLink).toBeVisible();
//   await dashboardLink.click();

//   // 1) Click “Create a quest”
//   const createLink = selectors.createAQuestsLink(page);
//   await expect(createLink).toBeVisible({ timeout: 5000 });
//   await createLink.click();

//   // 2) Fill in three quests one after the other
//   for (let i = 1; i <= 3; i++) {
//     await expect(selectors.questTitle(page)).toBeVisible({ timeout: 5000 });
//     await page.fill("#quest-title", `Quest ${i}`);
//     await page.fill("#quest-description", `Some description for quest ${i}`);
//     await selectors.createQuestButton(page).click();
//     // Optionally wait for a success toast or reset of the form:
//     await expect(selectors.questTitle(page)).toHaveValue("", { timeout: 5000 });
//   }

//   // 3) After creating three, click “View all quests”
//   const viewAll = selectors.viewAllPublicQuestsLink(page);
//   await expect(viewAll).toBeVisible({ timeout: 5000 });
//   await viewAll.click();
// }



