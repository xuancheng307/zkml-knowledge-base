/* ========================================
   ZKML Docs - Utility Functions
   ======================================== */

/**
 * Check if a nav item is a group node (has children but no path)
 */
export function isGroupNode(item) {
  return Array.isArray(item.items) && item.items.length > 0 && !item.path && !item.external;
}

/**
 * Check if a nav item is a page node (has path or external link)
 */
export function isPageNode(item) {
  return !!(item.path || item.external);
}

/**
 * Resolve the href for a nav item
 */
export function resolveHref(item, baseUrl) {
  if (item.external) {
    return item.external;
  }
  return baseUrl + item.path;
}

/**
 * Normalize a path for comparison
 * - Remove query string and hash
 * - Handle trailing slash and index.html
 */
export function normalizePath(path, baseUrl = '') {
  if (!path) return '';

  // Remove query and hash
  let normalized = path.split('?')[0].split('#')[0];

  // Remove baseUrl prefix for comparison
  if (baseUrl && normalized.startsWith(baseUrl)) {
    normalized = normalized.slice(baseUrl.length);
  }

  // Normalize trailing slash and index.html
  if (normalized.endsWith('/')) {
    normalized += 'index.html';
  }
  if (normalized.endsWith('/index.html')) {
    normalized = normalized.slice(0, -11) + '/index.html';
  }

  return normalized;
}

/**
 * Check if current path matches a nav item's path
 */
export function isActivePath(itemPath, currentPath, baseUrl) {
  const normalizedItem = normalizePath(baseUrl + itemPath, baseUrl);
  const normalizedCurrent = normalizePath(currentPath, baseUrl);
  return normalizedItem === normalizedCurrent;
}

/**
 * Flatten nav tree into a linear list of page nodes
 * Used for prev/next navigation
 */
export function flattenNavTree(sections, options = {}) {
  const { includeStatus = ['done', 'draft'], excludeExternal = true } = options;
  const result = [];

  function traverse(items) {
    for (const item of items) {
      if (isPageNode(item)) {
        // Skip external links if requested
        if (excludeExternal && item.external) continue;

        // Skip items with unwanted status
        if (!includeStatus.includes(item.status)) continue;

        result.push(item);
      }

      // Recurse into children
      if (item.items && item.items.length > 0) {
        traverse(item.items);
      }
    }
  }

  for (const section of sections) {
    if (section.items) {
      traverse(section.items);
    }
  }

  return result;
}

/**
 * Build a map from path to nav item for quick lookup
 */
export function buildPathIndex(sections) {
  const index = new Map();

  function traverse(items, parents = []) {
    for (const item of items) {
      if (isPageNode(item) && item.path) {
        index.set(item.path, {
          item,
          parents: [...parents]
        });
      }

      if (item.items && item.items.length > 0) {
        traverse(item.items, [...parents, item]);
      }
    }
  }

  for (const section of sections) {
    if (section.items) {
      traverse(section.items, [section]);
    }
  }

  return index;
}

/**
 * Get breadcrumb trail for a given path
 */
export function getBreadcrumb(path, pathIndex, config) {
  const entry = pathIndex.get(path);
  if (!entry) return [];

  const crumbs = [
    { title: config.siteName, path: config.baseUrl + '/' }
  ];

  for (const parent of entry.parents) {
    if (parent.path) {
      crumbs.push({
        title: parent.title,
        path: config.baseUrl + parent.path
      });
    } else if (parent.title) {
      // Group node without path
      crumbs.push({
        title: parent.title,
        path: null
      });
    }
  }

  // Current page
  crumbs.push({
    title: entry.item.title,
    path: null,
    current: true
  });

  return crumbs;
}

/**
 * Get previous and next pages for navigation
 */
export function getPrevNext(currentPath, pageList, baseUrl) {
  const currentNormalized = normalizePath(currentPath, baseUrl);

  const currentIndex = pageList.findIndex(item => {
    const itemNormalized = normalizePath(baseUrl + item.path, baseUrl);
    return itemNormalized === currentNormalized;
  });

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? pageList[currentIndex - 1] : null,
    next: currentIndex < pageList.length - 1 ? pageList[currentIndex + 1] : null
  };
}

/**
 * Check if any child in a tree is active (for expanding parent nodes)
 */
export function hasActiveChild(items, currentPath, baseUrl) {
  for (const item of items) {
    if (isPageNode(item) && item.path) {
      if (isActivePath(item.path, currentPath, baseUrl)) {
        return true;
      }
    }
    if (item.items && hasActiveChild(item.items, currentPath, baseUrl)) {
      return true;
    }
  }
  return false;
}
