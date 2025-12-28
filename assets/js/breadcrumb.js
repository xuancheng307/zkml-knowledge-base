/* ========================================
   ZKML Docs - Breadcrumb Renderer
   ======================================== */

import { getConfig, getPathIndex } from './nav-store.js';
import { getBreadcrumb, normalizePath } from './utils.js';

/**
 * Render breadcrumb navigation
 */
export function renderBreadcrumb() {
  const container = document.getElementById('breadcrumb');
  if (!container) return;

  const config = getConfig();
  const pathIndex = getPathIndex();
  const currentPath = window.location.pathname;

  // Normalize current path to match nav.json paths
  const normalizedPath = normalizePath(currentPath, config.baseUrl);

  // Find the path key that matches
  let matchedPath = null;
  for (const [navPath] of pathIndex) {
    if (normalizePath(navPath) === normalizedPath) {
      matchedPath = navPath;
      break;
    }
  }

  if (!matchedPath) {
    // Not a page in nav.json, show minimal breadcrumb
    container.innerHTML = `
      <a href="${config.baseUrl}/">${config.siteName}</a>
    `;
    return;
  }

  const crumbs = getBreadcrumb(matchedPath, pathIndex, config);

  // Render breadcrumb
  const elements = [];

  for (let i = 0; i < crumbs.length; i++) {
    const crumb = crumbs[i];
    const isLast = i === crumbs.length - 1;

    if (isLast) {
      elements.push(`<span class="current">${crumb.title}</span>`);
    } else if (crumb.path) {
      elements.push(`<a href="${crumb.path}">${crumb.title}</a>`);
    } else {
      // Group node without path
      elements.push(`<span>${crumb.title}</span>`);
    }

    if (!isLast) {
      elements.push('<span class="separator">/</span>');
    }
  }

  container.innerHTML = elements.join('');
}
