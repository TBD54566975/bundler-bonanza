module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      ["@babel/plugin-proposal-private-methods", { loose: true }],
      [
        "module-resolver",
        {
          alias: {
            crypto: "@tbd54566975/react-native-quick-crypto",
            "node:crypto": "@tbd54566975/react-native-quick-crypto",
            stream: "stream-browserify",
            buffer: "@craftzdog/react-native-buffer",
            "bn.js": "react-native-bignumber",
          },
        },
      ],
    ],
  };
};
