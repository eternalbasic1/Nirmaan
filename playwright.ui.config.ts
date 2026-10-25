import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  testMatch: "**/*.browser.ts",
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://localhost:3002",
    channel: process.env.PLAYWRIGHT_BROWSER_CHANNEL || "chrome",
    viewport: { width: 1440, height: 1000 },
  },
  reporter: "list",
  workers: 1,
});
