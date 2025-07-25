import { expect, test } from "@playwright/test";

import { clientQuestElements } from "@/selectors/ClientQuestSelectors";

import { navBarSelectors } from "@/selectors/NavBarSelectors";

test("Hiscores is viewable publicly without Auth", async ({
  page,
}) => {
  const { hiscoresLink } = navBarSelectors(page);

  const { loginLink } = clientQuestElements(page);

  const h1 = page.locator("h1");
  const nagivateToHome = page.goto("/");

  // +++++++++++ Test Start +++++++++++

  await nagivateToHome;

  // +++++++++++ Hiscore Section +++++++++++

  await expect(hiscoresLink).toBeVisible();
  await hiscoresLink.click();

  await expect(h1).toHaveText("Total Level");

  await expect(loginLink).toBeVisible();
});
