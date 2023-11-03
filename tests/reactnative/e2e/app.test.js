const jestExpect = require("expect").default;

describe("App Tests", () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it("should have the Web5 test as successful", async () => {
    const web5TestResultElement = element(by.id("web5-tests-result"));
    await expect(web5TestResultElement).toBeVisible();

    const { text } = await web5TestResultElement.getAttributes();
    console.info(">>> Web5 Test Results:", text);

    const web5TestResult = JSON.parse(text);
    jestExpect(web5TestResult.success).toBe(true);
  });

  it("should have the DWN test as successful", async () => {
    const dwnTestResultElement = element(by.id("dwn-tests-result"));
    await expect(dwnTestResultElement).toBeVisible();

    const { text } = await dwnTestResultElement.getAttributes();
    console.info(">>> DWN Test Results:", text);

    const dwnTestResult = JSON.parse(text);
    jestExpect(dwnTestResult.success).toBe(true);
  });
});
