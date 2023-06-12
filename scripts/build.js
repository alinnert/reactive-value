const process = require('node:process')
const esbuild = require('esbuild')

const exit = () => {
  process.exit(1)
}

esbuild
  .build({
    entryPoints: ['src/main.ts'],
    outfile: 'dist/main.cjs.js',
    bundle: true,
    minify: false,
    format: 'cjs',
  })
  .catch(exit)

esbuild
  .build({
    entryPoints: ['src/main.ts'],
    outfile: 'dist/main.esm.js',
    bundle: true,
    format: 'esm',
  })
  .catch(exit)
