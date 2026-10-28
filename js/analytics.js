/**
 * Vercel Web Analytics Integration
 * 
 * This script initializes Vercel Web Analytics for the static site.
 * It uses the @vercel/analytics package to track page views automatically.
 */

// Import and inject Vercel Analytics
import { inject } from '@vercel/analytics';

// Initialize analytics with auto mode
inject({
  mode: 'auto', // Automatically detect environment (production vs development)
  debug: false  // Disable debug logging in production
});
