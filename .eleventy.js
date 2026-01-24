import path from 'path';
import { fileURLToPath } from 'url';
import litPlugin from '@lit-labs/eleventy-plugin-lit';
import { wrapTables } from './eleventy-helpers/transforms/wrap-tables.js';
import { generateToc } from './eleventy-helpers/transforms/generate-toc.js';
import { markdownPreprocessor } from './eleventy-helpers/plugins/markdown-preprocessor.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Enable SSR only if explicitly requested and components are compiled
const ENABLE_SSR = process.env.ENABLE_SSR === 'true';

export default function(eleventyConfig) {
  // Pass through docs-externals directory for CSS/JS/components
  eleventyConfig.addPassthroughCopy('docs-externals');
  
  // Add Lit SSR plugin for server-side rendering and hydration
  // Note: SSR is currently disabled as it requires compiled JavaScript
  // The components are loaded client-side via shared.ts and hydrate naturally
  if (ENABLE_SSR) {
    eleventyConfig.addPlugin(litPlugin, {
      mode: 'worker',
      componentModules: ['./ssr.js']
    });
  }
  
  // Apply markdown preprocessor plugin
  markdownPreprocessor(eleventyConfig);
  
  // Apply transforms
  wrapTables(eleventyConfig);
  generateToc(eleventyConfig);
  
  return {
    dir: {
      input: 'docs',
      output: '.',
      includes: '../_includes'
    },
    templateFormats: ['md'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
}
