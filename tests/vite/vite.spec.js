import { test, expect } from "playwright/test";

test.describe("App Test Results", () => {
  // We will start the test by opening the page
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/"); // Adjust the URL if your app will be hosted at a different port
  });

  // Check if the 'Web5 Results' are displayed
  test("should display Web5 results", async ({ page }) => {
    // Wait for the results to be populated
    await page.waitForSelector("#web5-results");
    // Check if the #web5-results element contains text
    const web5Results = await page.textContent("#web5-results");
    expect(web5Results).toBeTruthy();
  });

  // Check if the 'Dwn Results' are displayed
  test("should display Dwn results", async ({ page }) => {
    // Wait for the results to be populated
    await page.waitForSelector("#dwn-results");
    // Check if the #dwn-results element contains text
    const dwnResults = await page.textContent("#dwn-results");
    expect(dwnResults).toBeTruthy();
  });
});
