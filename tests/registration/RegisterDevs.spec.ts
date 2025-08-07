import { expect, test } from "@playwright/test";

import {
  devEmail1,
  devEmail2,
  devEmail3,
  devEmail4,
  devPassword1,
  devPassword2,
  devPassword3,
  devPassword4,
} from "@/configuration/Appconfig";

import { signInAuth0 } from "@/helpers/NonSocialAuth0Helper";
import { registerUser, validateHeroBar } from "@/helpers/RegistrationHelper";
import { navBarSelectors } from "@/selectors/NavBarSelectors";

test("Dev 1 - user logs in with Auth0 and able to complete registration", async ({
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

  await signInAuth0(page, devEmail1, devPassword1);

  // +++++++++++ Expect the UI to reflect NOT FULLY Registered Dev UI +++++++++++
  await validateHeroBar(page);
  await page.waitForTimeout(1000);

  // +++++++++++ Register the user +++++++++++
  await registerUser(page, "bulma", "sally", "johns", "Dev");

  // +++++++++++ Expect the UI to reflect FULLY Registered Dev UI +++++++++++

  await profileLink.click();

  // +++++++++++ Logout +++++++++++
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Dev 2 - user logs in via Auth0 and is able to complete registration", async ({
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

  await signInAuth0(page, devEmail2, devPassword2);

  // +++++++++++ Expect the UI to reflect NOT FULLY Registered Dev UI +++++++++++
  await validateHeroBar(page);
  await page.waitForTimeout(1000);

  // +++++++++++ Register the user +++++++++++
  await registerUser(page, "bulma2", "sally", "johns", "Dev");

  // +++++++++++ Expect the UI to reflect FULLY Registered Dev UI +++++++++++

  await profileLink.click();

  // +++++++++++ Logs out +++++++++++
  await logoutLink.waitFor({ state: "visible" });
  await logoutLink.hover();
  await logoutLink.click();

  await loginLink.waitFor({ state: "visible" });
  await expect(loginLink).toBeVisible();
});

test("Dev 3 - user logs in via Auth0 and is able to complete registration", async ({
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

  await signInAuth0(page, devEmail3, devPassword3);

  // +++++++++++ Expect the UI to reflect NOT FULLY Registered Dev UI +++++++++++
  await validateHeroBar(page);
  await page.waitForTimeout(1000);

  // +++++++++++ Register the user +++++++++++
  await registerUser(page, "bulma3", "sally", "johns", "Dev");

  // +++++++++++ Expect the UI to reflect FULLY Registered Dev UI +++++++++++

  await profileLink.click();

  // +++++++++++ Logs out +++++++++++
  await logoutLink.waitFor({ state: "visible" });
  await logoutLink.hover();
  await logoutLink.click();

  await loginLink.waitFor({ state: "visible" });
  await expect(loginLink).toBeVisible();
});

test("Dev 4 - user logs in via Auth0 and is able to complete registration", async ({
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

  await signInAuth0(page, devEmail4, devPassword4);

  // +++++++++++ Expect the UI to reflect NOT FULLY Registered Dev UI +++++++++++
  await validateHeroBar(page);
  await page.waitForTimeout(1000);

  // +++++++++++ Register the user +++++++++++
  await registerUser(page, "bulma4", "sally", "johns", "Dev");

  // +++++++++++ Expect the UI to reflect FULLY Registered Dev UI +++++++++++

  await profileLink.click();

  // +++++++++++ Logs out +++++++++++
  await logoutLink.waitFor({ state: "visible" });
  await logoutLink.hover();
  await logoutLink.click();

  await loginLink.waitFor({ state: "visible" });
  await expect(loginLink).toBeVisible();
});
