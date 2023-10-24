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
  } else {
    console.info(
      `>>> Version ${majorVersion} does not need webcrypto polyfill`
    );
  }
} else {
  console.info(">>> Not injecting webcrypto polyfill");
  const cryptoSubtle = crypto?.subtle;
  console.info(`>>> Has crypto subtle? ${!!cryptoSubtle}`);

  if (!cryptoSubtle) {
    const nodeCrypto = require("node:crypto");
    console.info(
      `>>> Has node:crypto? ${!!nodeCrypto} - ${JSON.stringify(nodeCrypto)}`
    );

    const pbkdf2 = nodeCrypto.pbkdf2;
    console.info(`>>> Has pbkdf2? ${!!pbkdf2}`);
  }
}
