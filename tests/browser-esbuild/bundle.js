import esbuild from 'esbuild'
import stdLibBrowser from 'node-stdlib-browser'
import polyfillProviderPlugin from 'node-stdlib-browser/helpers/esbuild/plugin'

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

esbuild.build({
  entryPoints: ['dwn-sdk-test.js'],
  platform: 'browser',
  bundle: true,
  format: 'esm',
  outfile: 'dist/dwn-sdk-test.js',
  inject      : [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
  plugins     : [polyfillProviderPlugin(stdLibBrowser)],
  define      : {
    'global': 'globalThis'
  }
})