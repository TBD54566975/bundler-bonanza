const path = require("path");

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  projectRoot: __dirname,
  watchFolders: [path.resolve(__dirname, "../util")],
};
