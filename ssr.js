/**
 * SSR entry point for Lit components
 * 
 * This file imports all Lit components that should be server-side rendered.
 * The @lit-labs/eleventy-plugin-lit will use this to render components on the server.
 */

// Import all seele components for SSR
import '@vollowx/seele';

// Import custom Lit components for SSR
import './docs-web/components/demo.ts';
import './docs-web/components/toolbar.ts';

// Export all seele components for SSR
export * from '@vollowx/seele';

// Export custom components for SSR
export * from './docs-web/components/demo.ts';
export * from './docs-web/components/toolbar.ts';
