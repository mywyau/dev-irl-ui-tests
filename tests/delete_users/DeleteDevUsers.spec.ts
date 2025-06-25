import { expect, test } from "@playwright/test";

import {
  testDevUserEmail1,
  testDevUserEmail2,
  testDevUserPassword1,
  testDevUserPassword2,
} from "@/configuration/Appconfig";

import { signInWithGoogle } from "@/helpers/GoogleOAuthHelper";
import { navBarSelectors } from "@/selectors/NavBarSelectors";

test("Dev 1 - Delete dev profile", async ({ page }) => {
  const {
    dashboardLink,
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

  await signInWithGoogle(page, testDevUserEmail1, testDevUserPassword1);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();

  // +++++++++++ Delete the Dev Profile +++++++++++
  await profileLink.click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Delete user profile" }).click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Dev 2 - Delete dev profile", async ({ page }) => {
  const {
    dashboardLink,
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

  await signInWithGoogle(page, testDevUserEmail2, testDevUserPassword2);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();

  // +++++++++++ Delete the Dev Profile +++++++++++
  await profileLink.click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Delete user profile" }).click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
