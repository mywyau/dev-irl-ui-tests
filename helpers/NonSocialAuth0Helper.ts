import { navBarSelectors } from "@/selectors/NavBarSelectors";
import { expect, Page } from "@playwright/test";

export async function signInAuth0(
  page: Page,
  userEmail: string,
  userPassword: string
) {
  await page.fill("#username", userEmail);
  await page.fill("#password", userPassword);
  await page.locator('button[data-action-button-primary="true"]').click();
}

export async function deleteUserViaProfilePage(page: Page) {
  const { loginLink, logoutLink, profileLink } = navBarSelectors(page);

  await profileLink.click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Delete profile" }).click();
  await page.getByRole("button", { name: "Yes, delete my profile" }).click();
  await logoutLink.click();
  await expect(loginLink).toBeVisible();
}

export async function heroBarIsVisable(page: Page) {
  const {
    dashboardLink,
    logoutLink,
    profileLink,
    viewAllQuestsLink,
  } = navBarSelectors(page);

  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(profileLink).toBeVisible();
}
