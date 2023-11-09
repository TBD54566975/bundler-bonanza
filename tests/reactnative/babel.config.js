module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["@babel/plugin-proposal-private-methods", { loose: true }],
      [
        "module-resolver",
        {
          alias: {
            crypto: "react-native-quick-crypto",
            stream: "stream-browserify",
            buffer: "@craftzdog/react-native-buffer",
            "bn.js": "react-native-bignumber",
            "node:crypto": "react-native-quick-crypto",
          },
        },
      ],
    ],
  };
};
