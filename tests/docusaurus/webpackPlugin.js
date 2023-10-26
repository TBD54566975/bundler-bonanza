module.exports = function (context, options) {
  return {
    name: "docusaurus-plugin-custom-webpack",
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: {
            stream: require.resolve("stream-browserify"),
            crypto: require.resolve("crypto-browserify"),
          },
        },
      };
    },
  };
};
