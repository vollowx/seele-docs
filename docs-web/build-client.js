import esbuild from 'esbuild';
import { transform } from 'lightningcss';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEV = process.env.NODE_ENV === 'DEV';
const outdir = path.join(__dirname, '_middle/docs-web/build');

const entryPoints = [
  path.join(__dirname, 'client.ts'),
  path.join(__dirname, 'components/demo.ts'),
  path.join(__dirname, 'components/toolbar.ts'),
];

// Main bundles
const config = {
  bundle: true,
  outdir,
  format: 'esm',
  target: 'es2020',
  treeShaking: true,
  sourcemap: DEV,
  minify: !DEV,
  splitting: true,
};

// Build the hydration support separately (must be loaded first, no splitting)
await esbuild
  .build({
    entryPoints: [path.join(__dirname, 'lit-hydrate-support.ts')],
    bundle: true,
    outdir,
    format: 'esm',
    target: 'es2020',
    treeShaking: true,
    minify: !DEV,
    splitting: false, // Don't split - this must be standalone
    sourcemap: DEV,
  })
  .catch(() => process.exit(1));

// Build client-side bundles
await esbuild
  .build({
    ...config,
    entryPoints,
  })
  .catch(() => process.exit(1));

// Minify CSS
const cssInput = fs.readFileSync(path.join(__dirname, 'client.css'));
const { code } = transform({
  filename: 'client.css',
  code: cssInput,
  minify: true,
});
fs.writeFileSync(path.join(outdir, 'client.css'), code);

console.log('Client assets built successfully');
