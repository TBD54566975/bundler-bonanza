describe("DWN Tests", () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have the DWN test as successful", async () => {
    await expect(element(by.id("dwn-tests-result"))).toHaveText(
      `"success": true`
    );
  });
});
