import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";

// Load env vars from .env file
dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    browserName: "chromium",
    headless: false,
  },
  testDir: "./tests",
  timeout: 30000,
  workers: 1,
});
