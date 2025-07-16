import { buttonSelectors } from "@/selectors/ButtonSelectors";
import { navBarSelectors } from "@/selectors/NavBarSelectors";
import { expect, Page } from "@playwright/test";

export async function validateHeroBar(page: Page) {
  const { hiscoresLink, logoutLink, viewAllQuestsLink } = navBarSelectors(page);

  await expect(hiscoresLink).toBeVisible();
  await expect(logoutLink).toBeVisible();
  await expect(viewAllQuestsLink).toBeVisible();
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
  const trigger = page.locator('[data-testid="role-select-trigger"]');
  await expect(trigger).toBeVisible();
  await page.waitForTimeout(250);
  await trigger.click();

  // 3) Wait for the dropdown panel to show up
  const content = page.locator(
    '[data-testid="role-select-content"][data-state="open"]'
  );
  await expect(content).toBeVisible();

  // 4) Click “Client” or "Dev"
  const usertypeOption = page.locator(`[data-testid="role-select-item-${usertype}"]`);
  await expect(usertypeOption).toBeVisible();
  await usertypeOption.click();

  // 5) Finally click the “Continue” button
  await expect(continueButton).toBeEnabled();
  await continueButton.click();
}
