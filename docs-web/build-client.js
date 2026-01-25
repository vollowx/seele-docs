/**
 * Build client-side JavaScript and CSS with esbuild
 * Based on material-web catalog approach
 */

import esbuild from 'esbuild';
import { glob } from 'glob';
import { transform } from 'lightningcss';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEV = process.env.NODE_ENV === 'DEV';
const outdir = path.join(__dirname, '_middle/docs-web/build');

// Entry points for client-side bundles
const entryPoints = await glob(path.join(__dirname, '**/*.ts'), {
  ignore: ['**/node_modules/**', '**/lit-hydrate-support.ts', '**/build-*.js', '**/ssr.ts', '**/eleventy-helpers/**']
});

// Shared esbuild config for main bundles
const config = {
  bundle: true,
  outdir,
  format: 'esm',
  target: 'es2020',
  treeShaking: true,
  sourcemap: DEV,
  minify: !DEV,
  splitting: true,
  // Don't mark anything as external - bundle everything
  // This way we don't need import maps for lit, tslib, etc.
};

// Build the hydration support separately (must be loaded first, no splitting)
await esbuild.build({
  entryPoints: [path.join(__dirname, 'lit-hydrate-support.ts')],
  bundle: true,
  outdir,
  format: 'esm',
  target: 'es2020',
  treeShaking: true,
  minify: !DEV,
  splitting: false, // Don't split - this must be standalone
  sourcemap: DEV,
}).catch(() => process.exit(1));

// Build client-side bundles
await esbuild.build({
  ...config,
  entryPoints,
}).catch(() => process.exit(1));

// Minify CSS (no prefixing)
const cssInput = fs.readFileSync(path.join(__dirname, 'shared.css'));
const { code } = transform({
  filename: 'shared.css',
  code: cssInput,
  minify: true,
});

// Ensure output directory exists
if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir, { recursive: true });
}

// Write minified CSS
fs.writeFileSync(path.join(outdir, 'shared.css'), code);

console.log('Client build completed successfully');
