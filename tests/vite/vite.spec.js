import { test, expect } from "playwright/test";

test.describe("App Test Results", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("should display Web5 results with success", async ({ page }) => {
    await page.waitForSelector("#web5-results");
    const web5ResultsText = await page.textContent("#web5-results");
    const web5Results = JSON.parse(web5ResultsText);
    expect(web5Results.success).toBe(true);
  });

  test("should display Dwn results with success", async ({ page }) => {
    await page.waitForSelector("#dwn-results");
    const dwnResultsText = await page.textContent("#dwn-results");
    const dwnResults = JSON.parse(dwnResultsText);
    expect(dwnResults.success).toBe(true);
  });
});
