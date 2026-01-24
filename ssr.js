/**
 * SSR entry point for Lit components
 * 
 * This file imports only custom Lit components that should be server-side rendered.
 * 
 * Note: Seele components render client-side only due to Lit SSR limitations.
 * The md-outlined-select element doesn't receive defer-hydration attribute from
 * Lit SSR, causing hydration mismatches. This is a Lit SSR plugin issue, not
 * related to seele v0.8.4 or the build configuration.
 */

// Import custom Lit components for SSR
import './docs-web/components/demo.ts';
import './docs-web/components/toolbar.ts';

// Export custom components for SSR
export * from './docs-web/components/demo.ts';
export * from './docs-web/components/toolbar.ts';
