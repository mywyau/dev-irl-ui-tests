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

  const card = page.getByText("Quest Dashboard").locator("..").locator("..");
  await page.waitForTimeout(200);

  await card.click({ button: "right" });
  await page.waitForTimeout(200);

  const viewMyQuestsMenuItem = page.getByRole("menuitem", {
    name: "View My Quests",
  });
  
  await viewMyQuestsMenuItem.click();

  await expect(h1).toHaveText("My Quests");
  await detailsLink.first().click();
  await expect(h1).toHaveText("Quest Details");
  await expect(page.locator("#quest-title")).toHaveText(questTitle);
  await page.waitForTimeout(200);

  const questCard = page.getByText(questTitle).locator("..").locator("..");
  const deleteQuestMenuItem = page.getByRole("menuitem", {
    name: "Delete Quest",
  });

  await questCard.click({ button: "right" });
  await page.waitForTimeout(200);
  await deleteQuestMenuItem.click();  
  await page.getByRole("button", { name: "Confirm" }).click();


}
