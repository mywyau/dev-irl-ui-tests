import { Page } from "@playwright/test";

export const navBarSelectors = (page: Page) => ({
  dashboardLink: page.getByRole("link", { name: "Dashboard" }),
  detailsLink: page.getByRole("link", { name: "Details" }),
  hiscoresLink: page.getByRole("link", { name: "Hiscores" }),
  loginLink: page.getByRole("link", { name: "Login" }),
  logoutLink: page.getByRole("link", { name: "Logout" }),
  profileLink: page.getByRole("link", { name: "Profile" }),
  skillsLink: page.getByRole("link", { name: "Skills" }),
  viewAllQuestsLink: page.getByRole("link", { name: "View all quests" }),
});
