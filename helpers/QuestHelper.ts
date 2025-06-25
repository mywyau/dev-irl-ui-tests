import { expect, Page } from "@playwright/test";

import { clientQuestElements } from "@/selectors/ClientQuestSelectors";

export async function deleteQuests(page: Page, questTitle: string) {
  const {
    clientQuestDashboardLink,
    deleteQuestButton,
    viewMyQuestsLink,
    detailsLink,
  } = clientQuestElements(page);

  const h1 = page.locator("h1");

  await clientQuestDashboardLink.click();
  await expect(h1).toHaveText("Quest Dashboard");
  await viewMyQuestsLink.click();
  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText(questTitle);
  await page.waitForTimeout(250);
  await deleteQuestButton.click();
}
