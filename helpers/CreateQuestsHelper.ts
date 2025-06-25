import { expect, Page } from "@playwright/test";

import { clientQuestElements } from "@/selectors/ClientQuestSelectors";

export async function createQuest(
  page: Page,
  title: string,
  description: string,
  criteria: string,
  rank: string
) {
  const {
    createQuestButton,
  } = clientQuestElements(page);

  const rankTrigger = page.locator("#rank-select");
  await expect(rankTrigger).toBeVisible();
  await page.waitForTimeout(250);
  await rankTrigger.click();

  await page.locator('div[role="option"]', { hasText: rank }).click();

  const languages = ["Python", "Scala", "TypeScript"];
  const langSelector = page.locator("#language-tag-selector");

  for (const lang of languages) {
    await langSelector.fill(lang);
    await page.locator(`#language-opt-${lang.toLowerCase()}`).click();
    await langSelector.clear();
  }

  await page.fill("#quest-title", title);
  await page.fill("#quest-description", description);
  await page.fill("#acceptance-criteria", criteria);
  await createQuestButton.click();
}
