import { expect, Page } from "@playwright/test";

import { clientQuestElements } from "@/selectors/ClientQuestSelectors";

function normalizeTestId(title: string): string {
  return title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export async function deleteQuests(page: Page, questTitle: string) {
  const {
    clientQuestDashboardLink,
    // deleteQuestButton,
    // viewMyQuestsLink,
    detailsLink,
  } = clientQuestElements(page);

  const h1 = page.locator("h1");

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");

  const questDashboardCard = page
    .getByText("Quest Dashboard")
    .locator("..")
    .locator("..");

  await questDashboardCard.waitFor({ state: "visible" });
  await questDashboardCard.hover();
  await questDashboardCard.click({ button: "right" });

  // await page.waitForTimeout(200);
  // await card.click({ button: "right" });
  // await page.waitForTimeout(200);

  const viewMyQuestsMenuItem = page.getByRole("menuitem", {
    name: "View My Quests",
  });
  await viewMyQuestsMenuItem.click();

  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText(questTitle);
  // await page.waitForTimeout(200);

  const questCard = page.getByTestId(
    `quest-card-${normalizeTestId(questTitle)}`
  );
  const deleteQuestMenuItem = page.getByRole("menuitem", {
    name: "Delete Quest",
  });

  await questCard.waitFor({ state: "visible" });
  await questCard.hover();
  await questCard.click({ button: "right" });

  // await page.waitForTimeout(200);

  // await deleteQuestMenuItem.waitFor({ state: "visible" });
  await deleteQuestMenuItem.hover();
  await deleteQuestMenuItem.click();

  await page.getByRole("button", { name: "Confirm" }).click();
}
