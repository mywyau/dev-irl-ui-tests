import { expect, test } from "@playwright/test";

import {
  testClientUserEmail1,
  testClientUserEmail2,
  testClientUserPassword1,
  testClientUserPassword2,
} from "@/configuration/Appconfig";
import { signInWithGoogle } from "@/helpers/GoogleOAuthHelper";
import { buttonSelectors } from "@/selectors/ButtonSelectors";
import { navBarSelectors } from "@/selectors/NavBarSelectors";

test("Client 1 user logs in with Google, is able to complete registration", async ({
  page,
}) => {
  const { continueButton } = buttonSelectors(page);

  const {
    dashboardLink,
    hiscoresLink,
    loginLink,
    logoutLink,
    profileLink,
    viewAllQuestsLink,
  } = navBarSelectors(page);

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInWithGoogle(page, testClientUserEmail1, testClientUserPassword1);

  // +++++++++++ Expect the UI to reflect Client UI +++++++++++
  await expect(hiscoresLink).toBeVisible();
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();

  await page.waitForTimeout(1000);

  // 1) Fill in the username
  await page.locator("#username").fill("goku");

  // 2) Open the dropdown:
  const trigger = page.locator('[data-testid="role-select-trigger"]');
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(250);
  await trigger.click();

  // 3) Wait for the dropdown panel to show up
  const content = page.locator(
    '[data-testid="role-select-content"][data-state="open"]'
  );
  await expect(content).toBeVisible();

  // 4) Click “Client”
  const clientOption = page.locator('[data-testid="role-select-item-Client"]');
  await expect(clientOption).toBeVisible();
  await clientOption.click();

  // 5) Finally click the “Continue” button
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();

  await profileLink.click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Client 2 user logs in with Google, is able to complete registration", async ({
  page,
}) => {
  const { continueButton } = buttonSelectors(page);

  const {
    dashboardLink,
    hiscoresLink,
    loginLink,
    logoutLink,
    profileLink,
    viewAllQuestsLink,
  } = navBarSelectors(page);

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInWithGoogle(page, testClientUserEmail2, testClientUserPassword2);

  // +++++++++++ Expect the UI to reflect Client UI +++++++++++
  await expect(hiscoresLink).toBeVisible();
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();

  await page.waitForTimeout(1000);

  // 1) Fill in the username
  await page.locator("#username").fill("yugi");

  // 2) Open the dropdown:
  const trigger = page.locator('[data-testid="role-select-trigger"]');
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(250);
  await trigger.click();

  // 3) Wait for the dropdown panel to show up
  const content = page.locator(
    '[data-testid="role-select-content"][data-state="open"]'
  );
  await expect(content).toBeVisible();

  // 4) Click “Client”
  const clientOption = page.locator('[data-testid="role-select-item-Client"]');
  await expect(clientOption).toBeVisible();
  await clientOption.click();

  // 5) Finally click the “Continue” button
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();

  await profileLink.click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
