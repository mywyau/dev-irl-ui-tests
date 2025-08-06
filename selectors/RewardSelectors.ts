import { Page } from "@playwright/test";

export const rewardElements = (page: Page) => ({
  addRewardButton: page.getByRole("button", { name: "Add a Reward" }),
  timeRewardInput: page.fill("#time-reward-amount", "10"),
  completionBonusInput: page.fill("#complete-bonus-reward-amount", "200"),
  addTimeRewardSubmitButton: page.getByRole("button", { name: "Add Monetary Reward" }),
  addCompleteBonusSubmitButton: page.getByRole("button", { name: "Add Bonus" }),
});
