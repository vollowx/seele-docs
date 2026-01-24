/**
 * SSR entry point for Lit components
 * 
 * This file imports only custom Lit components that should be server-side rendered.
 * 
 * Seele components render client-side only. Even with v0.8.4, SSR causes issues:
 * - md-outlined-select doesn't receive defer-hydration attribute from Lit SSR plugin
 * - Select field displays empty instead of showing the selected value
 * - This is a Lit SSR plugin limitation with certain custom elements
 */

// Import custom Lit components for SSR
import './docs-web/components/demo.ts';
import './docs-web/components/toolbar.ts';

// Export custom components for SSR
export * from './docs-web/components/demo.ts';
export * from './docs-web/components/toolbar.ts';
