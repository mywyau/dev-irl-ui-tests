import { expect, test } from "@playwright/test";

import {
  clientEmail1,
  clientEmail2,
  clientEmail3,
  clientEmail4,
  clientPassword1,
  clientPassword2,
  clientPassword3,
  clientPassword4,
} from "@/configuration/Appconfig";

import { signInAuth0 } from "@/helpers/NonSocialAuth0Helper";
import { registerUser, validateHeroBar } from "@/helpers/RegistrationHelper, "Client"";
import { navBarSelectors } from "@/selectors/NavBarSelectors";

test("Client 1 - user logs in with Auth0 and able to complete registration", async ({
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

  await signInAuth0(page, clientEmail1, clientPassword1);

  // +++++++++++ Expect the UI to reflect NOT FULLY Registered Client UI +++++++++++
  await validateHeroBar(page);
  await page.waitForTimeout(1000);

  // +++++++++++ Register the user +++++++++++
  await registerUser(page, "goku", "bob", "smith", "Client");

  // +++++++++++ Expect the UI to reflect FULLY Registered Client UI +++++++++++

  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();

  await profileLink.click();

  // +++++++++++ Logout +++++++++++
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Client 2 - user logs in via Auth0 and is able to complete registration", async ({
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

  await signInAuth0(page, clientEmail2, clientPassword2);

  // +++++++++++ Expect the UI to reflect NOT FULLY Registered Client UI +++++++++++
  await validateHeroBar(page);
  await page.waitForTimeout(1000);

  // +++++++++++ Register the user +++++++++++
  await registerUser(page, "goku2", "bob2", "smith2", "Client");

  // +++++++++++ Expect the UI to reflect FULLY Registered Client UI +++++++++++

  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();

  await profileLink.click();

  // +++++++++++ Logout +++++++++++
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});


test("Client 3 - user logs in via Auth0 and is able to complete registration", async ({
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

  await signInAuth0(page, clientEmail3, clientPassword3);

  // +++++++++++ Expect the UI to reflect NOT FULLY Registered Client UI +++++++++++
  await validateHeroBar(page);
  await page.waitForTimeout(1000);

  // +++++++++++ Register the user +++++++++++
  await registerUser(page, "goku3", "bob3", "smith3", "Client");

  // +++++++++++ Expect the UI to reflect FULLY Registered Client UI +++++++++++

  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();

  await profileLink.click();

  // +++++++++++ Logout +++++++++++
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});

test("Client 4 - user logs in via Auth0 and is able to complete registration", async ({
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

  await signInAuth0(page, clientEmail4, clientPassword4);

  // +++++++++++ Expect the UI to reflect NOT FULLY Registered Client UI +++++++++++
  await validateHeroBar(page);
  await page.waitForTimeout(1000);

  // +++++++++++ Register the user +++++++++++
  await registerUser(page, "goku4", "bob4", "smith4", "Client");

  // +++++++++++ Expect the UI to reflect FULLY Registered Client UI +++++++++++

  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();

  await profileLink.click();

  // +++++++++++ Logout +++++++++++
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
});
