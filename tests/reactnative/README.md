#### DO NOT MERGE JUST A TEST BRANCH FOR CI

# React Native and Web5 bundling tests

We are going to test bundling using iOS only so as to minimize the amount of env setup.

The two `@tbd54566975` react-native helper repos and their READMEs summarize the fixing of dozens of bugs and compatibility issues to adapt react native to web5.

To see what all was required to adapt react native on web5 check out the the index.js and README of each:
[@tbd54566975/web5-react-native-metro-config](https://github.com/TBD54566975/web5-react-native-metro-config) and [@tbd54566975/web5-react-native-polyfills](https://github.com/TBD54566975/web5-react-native-polyfills)

We shim all of the following:

- node crypto (using a C++ FFI)
- bn.js (using a C++ FFI)
- Buffer (using a C++ FFI)
- atob and btoa (using a C++ FFI)
- AsyncIterator (temporarily lacking in RN, plain js)
- TextEncoder (plain js)
- Event, EventTarget (plain js)
- Various @noble bespoke shim code (as required by the @noble author)

We also customize the metro config in the following ways:

- Explicitly specifying a handful of entrypoints
- Explicitly selecting a node package over a browser package
- A couple of minor misc. patches

## Prereqs:

Describing perfect env setup here. Probably not necessary just to test bundling. As long as you have some recent version of node, yarn, npm, and ruby you should be ok on those. Setting up the rest will supercharge your env for mobile development and switching between envs.

- Node v18 or later.
- Yarn v1. Ideally installed globally and not inside of your node version.
- npm v9. ideally installed inside of your selected node version.
- watchman (installed via homebrew)
- xcode and latest sdks
- rvm
- nvm

#### Perfect environment setup (optional)

- `which yarn` should be /Users/{USER}/.yarn/bin/yarn

- `which rvm` should be /Users/{USER}/.rvm/bin/rvm

- `which node` should be /Users/{USER}/.nvm/versions/node/v18.16.0/bin/node

- `which npm` should be /Users/{USER}/.nvm/versions/node/v18.16.0/bin/npm

- `nvm list` should include -> v18.16.0

- `rvm list` should include =\* ruby-2.7.4 [ arm64 ]

## Install

1. `yarn` to install node_modules
2. `npx pod-install@latest` install iOS package
3. `yarn start --clear` (starts the bundler, clear cache every time)
4. build for any simulator after opening the xcworkspace in the ios folder
