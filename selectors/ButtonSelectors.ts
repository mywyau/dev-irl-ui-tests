import { Page } from "@playwright/test";

export const buttonSelectors = (page: Page) => ({
  continueButton: page.getByRole("button", { name: "Continue" }),
});
