import { expect, test } from "@playwright/test";

import {
  testDevUserEmail1,
  testDevUserEmail2,
  testDevUserPassword1,
  testDevUserPassword2,
} from "@/configuration/Appconfig";
import { signInWithGoogle } from "@/helpers/GoogleOAuthHelper";
import { buttonSelectors } from "@/selectors/ButtonSelectors";
import { navBarSelectors } from "@/selectors/NavBarSelectors";

test("Dev 1 user logs in with Google, is able to complete registration", async ({
  page,
}) => {
  const {
    dashboardLink,
    hiscoresLink,
    loginLink,
    logoutLink,
    profileLink,
    viewAllQuestsLink,
  } = navBarSelectors(page);

  const { continueButton } = buttonSelectors(page);

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInWithGoogle(page, testDevUserEmail1, testDevUserPassword1);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await expect(hiscoresLink).toBeVisible();
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();

  await page.waitForTimeout(1000);

  // +++++++++++ Register Dev User 1 +++++++++++
  await page.locator("#username").fill("vegeta");

  // 2) Open the dropdown:
  const trigger = page.locator('[data-testid="role-select-trigger"]');
  // const trigger = page.locator("#role-select");
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(250);
  await trigger.click();

  // 3) Wait for the dropdown panel to show up
  const content = page.locator(
    '[data-testid="role-select-content"][data-state="open"]'
  );
  await expect(content).toBeVisible();

  // 4) Click “Dev”
  const devOption = page.locator('[data-testid="role-select-item-Dev"]');
  await expect(devOption).toBeVisible();
  await devOption.click();

  // 5) Finally click the “Continue” button
  // const continueButton = page.getByRole("button", { name: "Continue" });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();

  await profileLink.click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

// test("Dev 2 user logs in with Google, is able to complete registration", async ({
//   page,
// }) => {
//   const { continueButton } = buttonSelectors(page);

//   const {
//     dashboardLink,
//     hiscoresLink,
//     loginLink,
//     logoutLink,
//     profileLink,
//     viewAllQuestsLink,
//   } = navBarSelectors(page);

//   const nagivateToHome = page.goto("/");

//   // +++++++++++ Test Start +++++++++++

//   await nagivateToHome;

//   // +++++++++++ Google Login +++++++++++
//   await expect(loginLink).toBeVisible();
//   await loginLink.click();

//   await signInWithGoogle(page, testDevUserEmail2, testDevUserPassword2);

//   // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
//   await expect(hiscoresLink).toBeVisible();
//   await expect(logoutLink).toBeVisible();
//   await expect(viewAllQuestsLink).toBeVisible();

//   await page.waitForTimeout(1000);

//   // 1) Fill in the username
//   await page.locator("#username").fill("kaiba");

//   // 2) Open the dropdown:
//   const trigger = page.locator('[data-testid="role-select-trigger"]');
//   // const trigger = page.locator("#role-select");
//   await expect(trigger).toBeVisible();
//   await page.waitForTimeout(250);
//   await trigger.click();

//   // 3) Wait for the dropdown panel to show up
//   const content = page.locator(
//     '[data-testid="role-select-content"][data-state="open"]'
//   );
//   await expect(content).toBeVisible();

//   // 4) Click “Dev”
//   const devOption = page.locator('[data-testid="role-select-item-Dev"]');
//   await expect(devOption).toBeVisible();
//   await devOption.click();

//   // 5) Finally click the “Continue” button
//   // const continueButton = page.getByRole("button", { name: "Continue" });
//   await expect(continueButton).toBeEnabled();
//   await continueButton.click();

//   await expect(viewAllQuestsLink).toBeVisible();
//   await expect(dashboardLink).toBeVisible();
//   await expect(profileLink).toBeVisible();

//   await profileLink.click();
//   await logoutLink.click();
//   await expect(loginLink).toBeVisible();
// });
