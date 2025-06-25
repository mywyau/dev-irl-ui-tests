import { expect, test } from "@playwright/test";

import {
  testClientUserEmail1,
  testClientUserEmail2,
  testClientUserPassword1,
  testClientUserPassword2
} from "@/configuration/Appconfig";

import { signInWithGoogle } from "@/helpers/GoogleOAuthHelper";
import { navBarSelectors } from "@/selectors/NavBarSelectors";

test("Client 1 - Login and delete the test client user profile", async ({
  page,
}) => {
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

  await signInWithGoogle(page, testClientUserEmail1, testClientUserPassword1);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();

  // +++++++++++ Delete the Client Profile +++++++++++
  await profileLink.click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Delete user profile" }).click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Client 2 - Login and delete the test client user profile", async ({
  page,
}) => {
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

  await signInWithGoogle(page, testClientUserEmail2, testClientUserPassword2);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();

  // +++++++++++ Delete the Client Profile +++++++++++
  await profileLink.click();
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Delete user profile" }).click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
