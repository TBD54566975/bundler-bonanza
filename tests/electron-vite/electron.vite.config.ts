import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [nodePolyfills()]
  }
})
