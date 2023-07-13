# Step by step web5 on React Native

This repo outlines what was required to reproduce a running instance of Web5 on React Native using iOS as an example. End users will not have to repeat these steps, they are provided strictly for learning purposes. End users will only follow steps 11 and 14, installing and configuring our two web5-react-native packages.

1.  cd `reactnative`
2.  `yarn` to install npm packages
3.  `npx pod-install@latest` to install iOS packages
4.  open a new terminal window and run `yarn start` in it
5.  open the `ios` folder
6.  open the xcworkspace using xcode
7.  build for any simulator
8.  the bundler should automatically open and the app should run
9.  we receive error:  
    `Unable to resolve "@ipld/dag-cbor" from "node_modules/@tbd54566975/dwn-sdk-js/dist/esm/src/utils/cid.js”`

        this is because this dep’s package.json specifies neither `main` nor `browser` nor `react-native` fields

        we fix this (and all other packages in the same boat with a bunch of  `metro.config.js`  mods. these are contained using the `web5-react-native-metro-config` repo:

    in terminal execute `yarn add @tbd54566975/web5-react-native-metro-config`. if you wish you may inspect the contents of index.js of this repo to see what it's doing. setup that package by following its README instructions.

10. reload bundler: _ctrl-c_ to exit and `yarn start --clear`. reopen the app on simulator.
11. now we will receive the following error:

    > The package at "node_modules/@tbd54566975/dwn-sdk-js/dist/esm/src/utils/encryption.js" attempted to import the Node standard library module "crypto".It failed because the native React runtime does not include the Node standard library.

    this is because we are relying on node crypto but have not yet polyfilled it (or polyfilled anything else, for that matter!). lets setup those polyfills.

12. to fix, navigate to https://github.com/TBD54566975/web5-react-native-polyfills and follow the setup instructions in the README. if you are curious about how this package works, check out the index.js.
13. As mentioned in the README we will need to `npx pod-install@latest` to pull down the latest iOS pods.
14. Restart the bundler (ctrl-c) and then start it again using the clear flag: `yarn start --clear`.
15. We will also need to recompile the iOS app. Build for simulator in xCode.
16. This time web5 should now be working
