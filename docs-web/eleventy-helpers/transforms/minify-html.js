/**
 * Minifies HTML using html-minifier
 * Based on material-web catalog approach
 * 
 * @param {object} eleventyConfig - The Eleventy configuration object
 */
export function minifyHtml(eleventyConfig) {
  const isDev = process.env.NODE_ENV === 'DEV';
  
  eleventyConfig.addTransform('htmlMinify', async function(content, outputPath) {
    // Skip minification in dev mode or for non-HTML files
    if (isDev || !outputPath || !outputPath.endsWith('.html')) {
      return content;
    }
    
    // Dynamically import html-minifier
    const { minify } = await import('html-minifier');
    
    // Minify with options that work with Declarative Shadow DOM
    const minified = minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      // Don't remove quotes - breaks template attributes
      removeAttributeQuotes: false,
      // Don't minify CSS/JS - esbuild already does this
      minifyCSS: false,
      minifyJS: false,
    });
    
    return minified;
  });
}
