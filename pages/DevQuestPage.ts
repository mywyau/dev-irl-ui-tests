import { Locator, Page } from "@playwright/test";

export const devQuestElements = (page: Page) => ({
  loginLink: page.getByRole("link", { name: "Login" }),
  logoutLink: page.getByRole("link", { name: "Logout" }),
  viewAllQuestsLink: page.getByRole("link", { name: "View all quests" }),
  devQuestDashboardLink: page.getByRole("link", { name: "Dev Quests Dashboard" }),
  createQuestLink: page.getByRole("link", { name: " Create Quest " }),
  devProfileLink: page.getByRole("link", { name: "Dev Profile" }),
  viewAllPublicQuestsLink: page.getByRole("link", { name: "View all quests" }),
  createAQuestLink: page.getByRole("link", { name: "Create a quest" }),

  viewQuestLink: page.getByRole("link", { name: "View Quest →" }),
  acceptQuestButton: page.getByRole("button", { name: "Accept Quest" }),
  viewDetailsButton: page.getByRole("button", { name: "View Details" }),

  notStartedButton: page.getByRole("button", { name: "Not Started" }),
  inProgressButton: page.getByRole("button", { name: "In Progress" }),
  reviewButton: page.getByRole("button", { name: "Review" }),

  moveToInProgressButton: page.getByRole("button", {
    name: "Move quest to In Progress",
  }),
  moveToReviewButton: page.getByRole("button", {
    name: "Move quest to in Review",
  }),
  moveToCompletedButton: page.getByRole("button", {
    name: "Move quest to Completed",
  }),
  moveToFailedButton: page.getByRole("button", {
    name: "Move quest to Failed",
  }),
});
