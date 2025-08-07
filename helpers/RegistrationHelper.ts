import { buttonSelectors } from "@/selectors/ButtonSelectors";
import { navBarSelectors } from "@/selectors/NavBarSelectors";
import { expect, Page } from "@playwright/test";

export async function validateHeroBar(page: Page) {
  const { hiscoresLink, logoutLink, viewAllQuestsLink } = navBarSelectors(page);

  await expect(hiscoresLink).toBeVisible();
  await expect(logoutLink).toBeVisible();
}

export async function registerUser(
  page: Page,
  username: string,
  firstname: string,
  lastname: string,
  usertype: string
) {
  const { continueButton } = buttonSelectors(page);

  // 1) Fill in the user details

  await page.locator("#username").fill(username);
  await page.locator("#firstname").fill(firstname);
  await page.locator("#lastname").fill(lastname);

  // 2) Open the dropdown:
  // const trigger = page.locator('[data-testid="role-select-trigger"]');
  const trigger = page.locator("#role-select");

  // await expect(trigger).toBeVisible();
  await trigger.waitFor({ state: "visible" });
  await trigger.hover();
  // await page.waitForTimeout(250);
  await trigger.click();

  // 3) Select the correct option (e.g. Dev or Client)
  const option = page.locator(`#user-type-option-${usertype}`);
  await expect(option).toBeVisible();
  await option.click();

  // 5) Finally click the “Continue” button
  await expect(continueButton).toBeEnabled();
  await continueButton.click();
}
