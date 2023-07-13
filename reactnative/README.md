# React Native and Web5 bundling tests

We are going to test bundling using iOS only so as to minimize the amount of env setup.

## Prereqs:

Describing perfect env setup here. Probably not necessary just to test bundling. As long as you have some recent version of node, yarn, npm, and ruby you should be ok on those. Setting up the rest will supercharge your env for mobile development and switching between envs.

- node v16 or higher. ideally v18.
- yarn v1. ideally installed globally and not inside node
- npm. ideally installed of node
- watchman (installed via homebrew)
- xcode and latest sdks
- rvm
- nvm

#### Perfect environment setup (optional)

- `which yarn`` should be /Users/{USER}/.yarn/bin/yarn

- `which rvm`` should be /Users/{USER}/.rvm/bin/rvm

- `which node`` should be /Users/{USER}/.nvm/versions/node/v18.16.0/bin/node

- `which npm`` should be /Users/{USER}/.nvm/versions/node/v18.16.0/bin/npm

- `nvm list`` should include -> v18.16.0

- `rvm list`` should include =\* ruby-2.7.4 [ arm64 ]

## Install

1. `yarn`
2. `npx pod-install@latest`
3. `yarn start` (starts the bundler)
4. build for emulator after opening the xcworkspace in the ios folder
5. to learn in more depth how react native was adapted to web5 see: [DEEPDIVE.md](./DEEPDIVE.md)
