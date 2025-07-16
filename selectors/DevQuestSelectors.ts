import { Page } from "@playwright/test";

export const devQuestElements = (page: Page) => ({
  loginLink: page.getByRole("link", { name: "Login" }),
  logoutLink: page.getByRole("link", { name: "Logout" }),
  viewAllQuestsLink: page.getByRole("link", { name: "View all quests" }),
  devQuestDashboardLink: page.getByRole("link", {
    name: "Dashboard",
  }),
  createQuestLink: page.getByRole("link", { name: " Create Quest " }),
  devProfileLink: page.getByRole("link", { name: "Profile" }),
  estimationsLink: page.getByRole("link", { name: "Estimations" }),
  submitEstimatesButton: page.getByRole("button", { name: "Submit Estimate" }),
  viewAllPublicQuestsLink: page.getByRole("link", { name: "View all quests" }),
  createAQuestLink: page.getByRole("link", { name: "Create a quest" }),

  detailsLink: page.getByRole("link", { name: "Details" }),
  acceptQuestButton: page.getByRole("button", { name: "Accept Quest" }),
  viewDetailsLink: page.getByRole("link", { name: "View Details" }),

  notStartedButton: page.getByRole("button", { name: "Not Started" }),
  inProgressButton: page.getByRole("button", { name: "In Progress" }),
  reviewButton: page.getByRole("button", { name: "Review" }),

  moveToInProgressButton: page.getByRole("button", {
    name: "Change Status to In Progress",
  }),
  
  moveToReviewButton: page.getByRole("button", {
    name: "Change Status to Review",
  }),
  moveToCompletedButton: page.getByRole("button", {
    name: "Move quest to Completed",
  }),
  moveToFailedButton: page.getByRole("button", {
    name: "Move quest to Failed",
  }),

  uploadFileButton: page.getByRole("button", {
    name: "Upload File",
  }),

  chooseFileButton: page.getByRole("button", {
    name: "Choose File",
  }),

  uploadButton: page.getByRole("button", {
    name: "Upload",
  }),
});
