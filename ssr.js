/**
 * SSR entry point for Lit components
 * 
 * This file imports only custom Lit components that should be server-side rendered.
 * Note: Even with seele v0.8.4, select SSR still shows issues (values in comments).
 * Keeping seele components client-side only until SSR is fully stable.
 */

// Import custom Lit components for SSR
import './docs-web/components/demo.ts';
import './docs-web/components/toolbar.ts';

// Export custom components for SSR
export * from './docs-web/components/demo.ts';
export * from './docs-web/components/toolbar.ts';
