import { Page } from "@playwright/test";

export const rewardElements = (page: Page) => ({
  addRewardButton: page.getByRole("button", { name: "Add a Reward" }),
  timeRewardInput: page.fill("#time-reward-amount", "10"),
  completionRewardInput: page.fill("#completion-reward-amount", "200"),
  addCompletionRewardButton: page.getByRole("button", { name: "Add Completion Reward" }),
});
