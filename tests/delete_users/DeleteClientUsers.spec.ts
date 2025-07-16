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

import {
  deleteUserViaProfilePage,
  heroBarIsVisable,
  signInAuth0,
} from "@/helpers/NonSocialAuth0Helper";
import { navBarSelectors } from "@/selectors/NavBarSelectors";

test("Client 1 - Login and delete the test client user profile", async ({
  page,
}) => {
  const {
    loginLink,
  } = navBarSelectors(page);

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, clientEmail1, clientPassword1);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await heroBarIsVisable(page);

  // +++++++++++ Delete the Client Profile +++++++++++
  await deleteUserViaProfilePage(page);
});

test("Client 2 - Login and delete the test client user profile", async ({
  page,
}) => {
  const {
    loginLink,
  } = navBarSelectors(page);

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, clientEmail2, clientPassword2);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await heroBarIsVisable(page);

  // +++++++++++ Delete the Client Profile +++++++++++
  await deleteUserViaProfilePage(page);
});

test("Client 3 - Login and delete the test client user profile", async ({
  page,
}) => {
  const {
    loginLink,
  } = navBarSelectors(page);

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, clientEmail3, clientPassword3);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await heroBarIsVisable(page);

  // +++++++++++ Delete the Client Profile +++++++++++
  await deleteUserViaProfilePage(page);
});

test("Client 4 - Login and delete the test client user profile", async ({
  page,
}) => {
  const {
    loginLink,
  } = navBarSelectors(page);

  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Google Login +++++++++++
  await expect(loginLink).toBeVisible();
  await loginLink.click();

  await signInAuth0(page, clientEmail4, clientPassword4);

  // +++++++++++ Expect the UI to reflect Dev UI +++++++++++
  await heroBarIsVisable(page);

  // +++++++++++ Delete the Client Profile +++++++++++
  await deleteUserViaProfilePage(page);
});
