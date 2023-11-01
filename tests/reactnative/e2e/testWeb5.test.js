const jestExpect = require("expect").default;

describe("Web5 Tests", () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have the Web5 test as successful", async () => {
    const web5TestResultElement = element(by.id("web5-tests-result"));
    await expect(web5TestResultElement).toBeVisible();

    const { text } = await web5TestResultElement.getAttributes();
    console.info(">>> Web5 Test Results:", text);

    const web5TestResult = JSON.parse(text);
    jestExpect(web5TestResult.success).toBe(true);
  });
});
