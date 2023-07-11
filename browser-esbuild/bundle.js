import esbuild from 'esbuild'

esbuild.buildSync({
  entryPoints: ['dwn-sdk-test.js'],
  platform: 'browser',
  bundle: true,
  outfile: 'bundled-dwn-sdk-test-js',
  inject: ['crypto-browserify', 'stream-browserify']
})