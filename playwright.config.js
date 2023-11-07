import { devices, defineConfig } from "playwright/test";

export default defineConfig({
  reporter: [["html"], ["list"]],
  testDir: "./",
  testMatch: "**/*.spec.js",
  testIgnore: "tests/electron-vite/**",
  projects: [
    {
      name: "desktop-safari",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "desktop-firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "desktop-edge",
      use: { ...devices["Desktop Edge"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
});
