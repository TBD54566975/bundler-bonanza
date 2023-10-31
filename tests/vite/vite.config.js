import nodePolyfills from 'vite-plugin-node-stdlib-browser';
import CommonJs from 'vite-plugin-commonjs';

/** @type {import('vite').UserConfig} */
export default {
  build: {
    target: ['chrome109', 'edge112', 'firefox102', 'safari15.6', 'ios15.6'],
  },
  define: {
    global: 'globalThis',
  },
  plugins: [nodePolyfills(), CommonJs()],
};
