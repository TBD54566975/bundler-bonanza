/** According to Web5 readme we need to inject webcrypto in node versions <= 18 */
const isNode = typeof process !== "undefined" && process.versions != null;
if (isNode) {
  const majorVersion = parseInt(
    process.version.slice(1).split(".")[0].replace("v", "")
  );
  if (majorVersion <= 18) {
    console.info(">>> Injecting webcrypto polyfill");
    const { webcrypto } = require("node:crypto");
    if (!globalThis.crypto) globalThis.crypto = webcrypto;
  }
}
