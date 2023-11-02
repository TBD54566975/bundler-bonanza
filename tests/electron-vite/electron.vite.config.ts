import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import nodePolyfills from 'vite-plugin-node-stdlib-browser';
import CommonJs from 'vite-plugin-commonjs';

console.info(CommonJs)

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [nodePolyfills(), CommonJs()]
  }
})
