import { Page } from "@playwright/test";

export const clientQuestElements = (page: Page) => ({
  loginLink: page.getByRole("link", { name: "Login" }),
  logoutLink: page.getByRole("link", { name: "Logout" }),
  viewQuestLink: page.getByRole("link", { name: "View Quest →" }),
  viewAllQuestsLink: page.getByRole("link", { name: "View all quests" }),
  viewDetailsLink: page.getByRole("link", { name: "View Details" }),
  viewMyQuestsLink: page.getByRole("link", { name: "View my quests" }),
  clientQuestDashboardLink: page.getByRole("link", {
    name: "Client Quests Dashboard",
  }),
  createQuestButton: page.getByRole("button", { name: "Create Quest" }),
  clientProfileLink: page.getByRole("link", { name: "Client Profile" }),
  deleteQuestButton: page.getByRole("button", { name: "Delete quest" }),
  editQuestButton: page.getByRole("button", { name: "Edit quest" }),
  updateQuestButton: page.getByRole("button", { name: "Update quest" }),
  viewAllPublicQuestsLink: page.getByRole("link", { name: "View all quests" }),
  createAQuestLink: page.getByRole("link", { name: "Create a quest" }),

  clientReviewButton: page.getByRole("button", { name: "Review" }),

  clientCompletedButton: page.getByRole("button", { name: "Completed" }),

  moveToCompletedButton: page.getByRole("button", {
    name: "Complete Quest",
  }),
  moveToFailedButton: page.getByRole("button", {
    name: "Fail Quest",
  }),
});
