import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { globSync } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Find all index.html files
const htmlFiles = globSync('**/index.html', { 
  ignore: ['node_modules/**', 'dist/**'],
  cwd: __dirname 
});

const input = {};
htmlFiles.forEach(file => {
  const name = file === 'index.html' ? 'main' : file.replace('/index.html', '').replace(/\//g, '-');
  input[name] = path.resolve(__dirname, file);
});

export default defineConfig({
  base: '/',
  css: { 
    transformer: 'lightningcss',
    lightningcss: {
      errorRecovery: true,
    }
  },
  build: {
    minify: true,
    cssMinify: 'lightningcss',
    rollupOptions: {
      input,
    },
  },
  plugins: [
    // Disable HTML minification as it can't parse Declarative Shadow DOM
    createHtmlPlugin({ minify: false }),
  ],
});
