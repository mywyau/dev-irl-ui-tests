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

import {
  deleteUserViaProfilePage,
  heroBarIsVisable,
  signInAuth0,
} from "@/helpers/NonSocialAuth0Helper";
import { navBarSelectors } from "@/selectors/NavBarSelectors";

test("Dev 1 - Login and delete the test dev user profile", async ({ page }) => {
  const { loginLink } = navBarSelectors(page);

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, devEmail1, devPassword1);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await heroBarIsVisable(page);

  // +++++++++++ Delete the Dev Profile +++++++++++
  await deleteUserViaProfilePage(page);
});

test("Dev 2 - Login and delete the test dev user profile", async ({ page }) => {
  const { loginLink } = navBarSelectors(page);

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, devEmail2, devPassword2);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await heroBarIsVisable(page);

  // +++++++++++ Delete the Dev Profile +++++++++++
  await deleteUserViaProfilePage(page);
});

test("Dev 3 - Login and delete the test dev user profile", async ({ page }) => {
  
  const { loginLink } = navBarSelectors(page);

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, devEmail3, devPassword3);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await heroBarIsVisable(page);

  // +++++++++++ Delete the Dev Profile +++++++++++
  await deleteUserViaProfilePage(page);
});

test("Dev 4 - Login and delete the test dev user profile", async ({ page }) => {
  const { loginLink } = navBarSelectors(page);

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, devEmail4, devPassword4);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await heroBarIsVisable(page);

  // +++++++++++ Delete the Dev Profile +++++++++++
  await deleteUserViaProfilePage(page);
});
