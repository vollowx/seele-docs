/**
 * SSR entry point for Lit components
 * This file is used by the @lit-labs/eleventy-plugin-lit for server-side rendering
 */

// Import Lit components that should be server-side rendered
import './docs-externals/components/demo.ts';
import './docs-externals/components/toolbar.ts';

// Export all components for SSR
export * from './docs-externals/components/demo.ts';
export * from './docs-externals/components/toolbar.ts';
