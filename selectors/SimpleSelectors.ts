import { Page } from "@playwright/test";

export const simpleSelectors = (page: Page) => ({
  h1: page.locator("h1"),
});
