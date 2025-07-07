import { expect, Page } from "@playwright/test";

import { clientQuestElements } from "@/selectors/ClientQuestSelectors";

export async function createQuest(
  page: Page,
  title: string,
  description: string,
  criteria: string,
  rank: string
) {
  const { createQuestButton } = clientQuestElements(page);

  const rankButtonTrigger = page.locator("#rank");

  await expect(rankButtonTrigger).toBeVisible();
  await page.waitForTimeout(250);
  await rankButtonTrigger.click();
  await page.click("#rank-option-Mithril"); // Select "Mithril"

  await page.waitForSelector("#language-tags-trigger", { state: "visible" });
  await page.click("#language-tags-trigger");

  // language-tags
  // await page.waitForSelector("#language-option-Python", { state: "visible" });
  // await page.click("#language-option-Python"); // Select "Python"
  // await page.waitForTimeout(200);
  // await page.waitForSelector("#language-option-Scala", { state: "visible" });
  // await page.click("#language-option-Scala"); // Select "Scala"
  // await page.waitForTimeout(200);
  // await page.waitForSelector("#language-option-Rust", { state: "visible" });
  // await page.click("#language-option-Rust"); // Select "Rust"
  // await page.waitForTimeout(200);
  
  await page.locator('[id^="language-option-"]', { hasText: "Python" }).click();
  await page.locator('[id^="language-option-"]', { hasText: "Scala" }).click();
  await page.locator('[id^="language-option-"]', { hasText: "Rust" }).click();
  await page.click("#language-tags-trigger");

  await page.fill("#quest-title", title);
  await page.fill("#quest-description", description);
  await page.fill("#acceptance-criteria", criteria);
  await createQuestButton.click();
}
