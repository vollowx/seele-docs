/**
 * SSR entry point for Lit components
 * 
 * This file imports custom Lit components that should be server-side rendered.
 * The @lit-labs/eleventy-plugin-lit will use this to render components on the server.
 * 
 * Note: @vollowx/seele components cannot be SSR'd as they use browser APIs (document, window)
 * in their constructors. They will be loaded client-side only via shared.ts.
 */

// Import custom Lit components for SSR
import './docs-externals/components/demo.ts';
import './docs-externals/components/toolbar.ts';

// Export custom components for SSR
export * from './docs-externals/components/demo.ts';
export * from './docs-externals/components/toolbar.ts';
