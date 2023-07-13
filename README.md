# Bundler Bonanza

This repo includes a bunch of barebones js projects across different runtimes using various tooling (e.g. webpack, vite etc.). These projects can be used to manually test whether our packages work in these environments

> **Note**
>
> This repo is currently WIP. It's being built out as we test `dwn-sdk-js` and `web5-js` compatibility

# `dwn-sdk-js`

> **Note**
>
> Currently testing [this branch](https://github.com/tbd54566975/dwn-sdk-js/tree/bundling)
>
> published version: `0.0.39-unstable-2023-07-11-e15b819`

| Runtime / Platform | ESM / CJS            | Bundler                                     | Working (Y/N) | Manual Setup Required?                                                                                      | Project                                          |
| ------------------ | -------------------- | ------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `node v20.3.0`     | ESM                  | N/A                                         | ✔️            | N                                                                                                           | [node-esm](./node-esm)                           |
| `node v20.3.0`     | CJS                  | N/A                                         | ✔️            | N                                                                                                           | [node-cjs](./node-cjs)                           |
| Electron           | CJS                  | [electron-vite](https://electron-vite.org/) | ✔️            | [Y](https://github.com/TBD54566975/bundler-bonanza/blob/main/electron-vite/src/renderer/src/App.tsx#L9-L30) | [electron-vite](./electron-vite)                 |
| Browser            | ESM                  | esbuild                                     | X             | Y                                                                                                           | [browser-esbuild](./browser-esbuild)             |
| Browser            | ESM                  | N/A                                         | ✔️            | N                                                                                                           | [browser-nobundler-esm](./browser-nobundler-esm) |
| Browser            | ESM                  | Webpack                                     | ✔️            | [Y](https://github.com/TBD54566975/bundler-bonanza/blob/main/webpack/webpack.config.js#L10-L15)             | [webpack](./webpack)                             |
| Browser            | ESM                  | Vite                                        | ✔️            | Y                                                                                                           | [vite](./vite)                                   |
| React Native       | Both (ESM via Babel) | Metro                                       | ✔️            | [Y](./reactnative/README.md)                                                                                | [reactnative](./reactnative)                     |
| Docusaurus         |                      |                                             |               |                                                                                                             |                                                  |
| NextJS 2.0         |                      |                                             |               |                                                                                                             |                                                  |

# Findings

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
