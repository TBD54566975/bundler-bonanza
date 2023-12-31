# Bundler Bonanza

This repo includes a bunch of barebones js projects across different runtimes using various tooling (e.g. webpack, vite etc.). These projects can be used to manually test whether our packages work in these environments

> **Note**
>
> This repo is currently WIP. It's being built out as we test `dwn-sdk-js` and `web5-js` compatibility

# Running instructions

```sh
# make sure you have node v20 or v18, and pnpm >=v8.8
pnpm i

# test web5 in all supported environments
pnpm test:web5

# test dwn in all supported environments
pnpm test:dwn
```

# Testing release candidates with Bundler Bonanza

> [!WARNING]
> You must use Yarn v1. Later versions (e.g., Yarn 4.x) will cause unexpected issues and test failures.

1. In the root `package.json` update to the release candidate's versions and run `pnpm install`.
2. In `/tests/reactnative/` run `yarn` and then `yarn add package@rcversion` for each package you're intending to test.

   > [!NOTE]
   > Conditionally: You may need to run `npx pod-install@latest` if you've changed iOS native dependencies,
   > but this is only relevant for mobile developers changing native packages.

3. In `/tests/electron/` run `yarn` and then `yarn add package@rcversion` for each package you're intending to test.
4. Push the changes on a branch to remote and open a PR to run the test suites.

# `dwn-sdk-js`

> **Note**
>
> Currently testing [this branch](https://github.com/tbd54566975/dwn-sdk-js/tree/bundling-strategy)
>
> version in test: `0.1.0-unstable-2023-07-18-09-24-a78a613`

| Runtime / Platform | ESM / CJS            | Bundler                                     | Working (Y/N) | Manual Setup Required?                                                                                      | Project                                          |
| ------------------ | -------------------- | ------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `node v20.3.0`     | ESM                  | N/A                                         | ✔️            | N                                                                                                           | [node-esm](./node-esm)                           |
| `node v20.3.0`     | CJS                  | N/A                                         | ✔️            | N                                                                                                           | [node-cjs](./node-cjs)                           |
| Electron           | CJS                  | [electron-vite](https://electron-vite.org/) | ✔️            | [Y](https://github.com/TBD54566975/bundler-bonanza/blob/main/electron-vite/src/renderer/src/App.tsx#L9-L30) | [electron-vite](./electron-vite)                 |
| Browser            | ESM                  | esbuild                                     | ✔️            | Y                                                                                                           | [browser-esbuild](./browser-esbuild)             |
| Browser            | ESM                  | N/A                                         | ✔️            | N                                                                                                           | [browser-nobundler-esm](./browser-nobundler-esm) |
| Browser            | ESM                  | Webpack                                     | ✔️            | [Y](https://github.com/TBD54566975/bundler-bonanza/blob/main/webpack/webpack.config.js#L10-L15)             | [webpack](./webpack)                             |
| Browser            | ESM                  | Vite                                        | ✔️            | Y                                                                                                           | [vite](./vite)                                   |
| React Native       | Both (ESM via Babel) | Metro                                       | ✔️            | [Y](./reactnative/README.md)                                                                                | [reactnative](./reactnative)                     |
| Docusaurus         | ESM                  | Webpack                                     | ✔️            | N                                                                                                           | [docusaurus](./docusaurus)                       |
|                    |
| NextJS 2.0         |                      |                                             |               |                                                                                                             |                                                  |

# Findings

## [docusaurus](./docusaurus/)

Need to import with `import { Web5 } from '@web5/api/browser'

This is the error thrown without the `/browser` at the end:

```
Module not found: Error: Can't resolve 'stream' in '/Users/ndejesus/Code/bundler-bonanza/docusaurus/node_modules/@tbd54566975/dwn-sdk-js/node_modules/readable-stream/lib/stream'
BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "stream": require.resolve("stream-browserify") }'
        - install 'stream-browserify'
If you don't want to include a polyfill, you can use an empty module like this:
        resolve.fallback: { "stream": false }
Module not found: Error: Can't resolve 'crypto' in '/Users/ndejesus/Code/bundler-bonanza/docusaurus/node_modules/eciesjs/dist'
BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "crypto": require.resolve("crypto-browserify") }'
        - install 'crypto-browserify'
If you don't want to include a polyfill, you can use an empty module like this:
        resolve.fallback: { "crypto": false }
Module not found: Error: Can't resolve 'crypto' in '/Users/ndejesus/Code/bundler-bonanza/docusaurus/node_modules/@tbd54566975/dwn-sdk-js/dist/esm/src/utils'
BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "crypto": require.resolve("crypto-browserify") }'
        - install 'crypto-browserify'
If you don't want to include a polyfill, you can use an empty module like this:
        resolve.fallback: { "crypto": false }
```

### Todo

Add actual Web5 functions

## [electron-vite](./electron-vite)

Main process works fine.

---

Renderer process runs into this error

```
level-wrapper.ts:14 Uncaught TypeError: Level is not a constructor
    at Object.<anonymous> (level-wrapper.ts:14:10)
    at Generator.next (<anonymous>)
    at fulfilled (time.ts:18:1)
```

had to [manually instantiate all 3 stores and explicitly provide a level instance](https://github.com/TBD54566975/bundler-bonanza/blob/main/electron-vite/src/renderer/src/App.tsx#L9-L30). Need to figure out why this is happening. maybe because it's a [dynamic import](https://github.com/TBD54566975/dwn-sdk-js/blob/main/src/store/level-wrapper.ts#L10-L19)

## [browser-esbuild](./browser-esbuild)

Not currently in a working state. Need to polyfill `stream-browserify` and `crypto-browserify`.

## [webpack](./webpack)

Had to manually configure `stream-browserify` and `crypto-browserify` polyfills [here](https://github.com/TBD54566975/bundler-bonanza/blob/main/webpack/webpack.config.js#L10-L15)

## [vite](./vite)

Was running into this issue caused by lack of support for dynamic imports

```
level-wrapper.ts:14 Uncaught TypeError: Level is not a constructor
    at Object.<anonymous> (level-wrapper.ts:14:10)
    at Generator.next (<anonymous>)
    at fulfilled (time.ts:18:1)
```

[removing dynamic import](https://github.com/TBD54566975/dwn-sdk-js/commit/e15b81930f603c5c83a5db42af05dabc35fb1afd) fixed the issue.

> **Note**
> this should fix the `electron-vite` issue as well
>
> Discuss ramifications of removing dynamic import with dwn core peeps

---

`npm run build` currently failing. need to polyfill `crypto-browserify` and `stream-browserify`

## [react native](./reactnative/README.md)

Fully custom setup complete with polyfills and bundling config required
