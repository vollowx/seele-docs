import path from 'path';

/**
 * @param {string} content
 * @param {object} env
 * @param {string} docsRoot
 * @returns {string}
 */
export function convertLinks(content, env, docsRoot) {
  // Get source file from env if available
  const sourceMdFile = env?.page?.inputPath
    ? path.relative(docsRoot, env.page.inputPath)
    : '';

  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    // Skip external links (http, https, mailto, etc.)
    if (url.match(/^(https?:|mailto:|#)/)) {
      return match;
    }

    // Transform .md links to HTML paths
    if (url.endsWith('.md')) {
      let htmlPath = url.replace(/\.md$/, '');

      // If it's a relative path, resolve it relative to the source file's directory
      if (!htmlPath.startsWith('/')) {
        const sourceDir = path.dirname(sourceMdFile).replace(/\\/g, '/');
        const normalizedHtmlPath = htmlPath.replace(/\\/g, '/');
        const resolvedPath = path.posix.normalize(
          path.posix.join(sourceDir, normalizedHtmlPath),
        );

        const baseName = path.posix.basename(resolvedPath);
        // Only treat as root if it's actually the root index
        if (
          (baseName === 'index' && path.posix.dirname(resolvedPath) === '.') ||
          resolvedPath === '.' ||
          resolvedPath === '' ||
          resolvedPath === 'index'
        ) {
          htmlPath = '/';
        } else if (baseName === 'index') {
          // For index files in subdirectories, link to the directory
          const dir = path.posix.dirname(resolvedPath);
          htmlPath = '/' + dir.replace(/^docs\//, '') + '/';
        } else {
          // For non-index files, add trailing slash
          htmlPath = '/' + resolvedPath.replace(/^docs\//, '') + '/';
        }
      } else {
        htmlPath = htmlPath + '/';
      }

      return `[${text}](${htmlPath})`;
    }

    return match;
  });
}
