const jestExpect = require("expect").default;

describe("DWN Tests", () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
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
