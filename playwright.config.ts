import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";

// Load env vars from .env file
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  timeout: 40000,
  workers: 1,
  use: {
    browserName: "chromium",
    headless: false,
  },
  projects: [
    {
      name: "local",
      use: {
        baseURL: "http://localhost:3000",
      },
    },
    {
      name: "prod",
      use: {
        baseURL: "https://app.devirl.com",
      },
    },
  ],
});
