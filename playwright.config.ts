import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  testMatch: "**/*.smoke.ts",
  use: { baseURL: process.env.TEST_BASE_URL || "http://localhost:3002" },
  reporter: "list",
});
