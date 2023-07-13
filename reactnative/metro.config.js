// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { mergeConfig } = require("metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
const web5Config = require("@tbd54566975/web5-react-native-metro-config");

module.exports = mergeConfig(config, web5Config);
