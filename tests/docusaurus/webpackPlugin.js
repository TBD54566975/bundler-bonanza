module.exports = function (context, options) {
  return {
    name: "docusaurus-plugin-custom-webpack",
    configureWebpack(config, isServer, utils) {
      console.log("config", config.webpack);
      return {
        resolve: {
          fallback: {
            stream: require.resolve("stream-browserify"),
            crypto: require.resolve("crypto-browserify"),
            buffer: require.resolve("buffer"),
          },
        },
      };
    },
  };
};
