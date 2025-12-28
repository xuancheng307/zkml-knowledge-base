/* ========================================
   ZKML Docs - Navigation Store
   Single source of truth for nav.json
   ======================================== */

import { flattenNavTree, buildPathIndex } from './utils.js';

// Module-level cache
let navDataCache = null;
let pageListCache = null;
let pathIndexCache = null;

/**
 * Get the base URL from config or detect from script location
 */
function getBaseUrl() {
  // Try to get from a global config if available
  if (window.ZKML_CONFIG && window.ZKML_CONFIG.baseUrl) {
    return window.ZKML_CONFIG.baseUrl;
  }

  // Default - adjust this for your deployment
  return '/zkml-knowledge-base';
}

/**
 * Load and cache nav.json
 * Returns cached data if already loaded
 */
export async function loadNavData() {
  if (navDataCache) {
    return navDataCache;
  }

  const baseUrl = getBaseUrl();

  try {
    const response = await fetch(`${baseUrl}/nav.json`);
    if (!response.ok) {
      throw new Error(`Failed to load nav.json: ${response.status}`);
    }

    navDataCache = await response.json();

    // Build indices
    pageListCache = flattenNavTree(navDataCache.sections, {
      includeStatus: ['done', 'draft'],
      excludeExternal: true
    });

    pathIndexCache = buildPathIndex(navDataCache.sections);

    return navDataCache;
  } catch (error) {
    console.error('Error loading navigation data:', error);
    throw error;
  }
}

/**
 * Get cached nav data (must call loadNavData first)
 */
export function getNavData() {
  if (!navDataCache) {
    throw new Error('Nav data not loaded. Call loadNavData() first.');
  }
  return navDataCache;
}

/**
 * Get cached page list for prev/next navigation
 */
export function getPageList() {
  if (!pageListCache) {
    throw new Error('Nav data not loaded. Call loadNavData() first.');
  }
  return pageListCache;
}

/**
 * Get cached path index for breadcrumb lookup
 */
export function getPathIndex() {
  if (!pathIndexCache) {
    throw new Error('Nav data not loaded. Call loadNavData() first.');
  }
  return pathIndexCache;
}

/**
 * Get config from nav data
 */
export function getConfig() {
  return getNavData().config;
}

/**
 * Get sections from nav data
 */
export function getSections() {
  return getNavData().sections;
}
