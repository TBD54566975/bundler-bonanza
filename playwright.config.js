module.exports = {
  use: {
    browserName: "chromium",
    baseURL: "http://localhost:3000",
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  // Define the test directory
  testDir: "./tests",
  testMatch: "**/*.spec.js",
};
