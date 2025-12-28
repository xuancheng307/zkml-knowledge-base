/* ========================================
   ZKML Docs - Sidebar Renderer
   ======================================== */

import { getConfig, getSections } from './nav-store.js';
import {
  isGroupNode,
  isPageNode,
  resolveHref,
  isActivePath,
  hasActiveChild
} from './utils.js';

/**
 * Render the sidebar navigation
 */
export function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const config = getConfig();
  const sections = getSections();
  const currentPath = window.location.pathname;
  const baseUrl = config.baseUrl;

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'sidebar-content';

  // Site title
  const titleDiv = document.createElement('div');
  titleDiv.className = 'site-title';
  const titleLink = document.createElement('a');
  titleLink.href = baseUrl + '/';
  titleLink.textContent = config.siteName;
  titleDiv.appendChild(titleLink);
  wrapper.appendChild(titleDiv);

  // Render each section
  for (const section of sections) {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'nav-section';

    // Section title
    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'nav-section-title';
    sectionTitle.innerHTML = `${section.icon || ''} ${section.title}`;

    // Add badge if present
    if (section.badge) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = section.badge;
      sectionTitle.appendChild(badge);
    }

    sectionDiv.appendChild(sectionTitle);

    // Render items
    if (section.items && section.items.length > 0) {
      const ul = renderItems(section.items, { baseUrl, currentPath });
      sectionDiv.appendChild(ul);
    }

    wrapper.appendChild(sectionDiv);
  }

  sidebar.innerHTML = '';
  sidebar.appendChild(wrapper);
}

/**
 * Recursively render navigation items
 */
function renderItems(items, ctx) {
  const ul = document.createElement('ul');

  for (const item of items) {
    // Skip hidden items
    if (item.status === 'hidden') continue;

    const li = document.createElement('li');

    // Check if this item or its children are active
    const isActive = isPageNode(item) && item.path &&
      isActivePath(item.path, ctx.currentPath, ctx.baseUrl);
    const hasActive = item.items &&
      hasActiveChild(item.items, ctx.currentPath, ctx.baseUrl);

    if (isActive) {
      li.classList.add('active');
    }
    if (hasActive) {
      li.classList.add('has-active-child');
    }

    // === Group Node (no link, just label) ===
    if (isGroupNode(item)) {
      const label = document.createElement('span');
      label.className = 'nav-group';
      label.textContent = item.title;
      li.appendChild(label);

      // Render children
      if (item.items && item.items.length > 0) {
        li.appendChild(renderItems(item.items, ctx));
      }

      ul.appendChild(li);
      continue;
    }

    // === Page Node ===
    if (!isPageNode(item)) continue;

    // Placeholder status
    if (item.status === 'placeholder') {
      li.classList.add('placeholder');
      const span = document.createElement('span');
      span.className = 'disabled';
      span.innerHTML = `${item.title} <small>(即將推出)</small>`;
      li.appendChild(span);
    } else {
      // Regular link
      const a = document.createElement('a');
      a.href = resolveHref(item, ctx.baseUrl);
      a.textContent = item.title;

      // Draft indicator
      if (item.status === 'draft') {
        a.innerHTML = `${item.title} <span class="draft-indicator">🚧</span>`;
      }

      // External link attributes
      if (item.external) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }

      li.appendChild(a);
    }

    // If page node also has children (rare but supported)
    if (item.items && item.items.length > 0) {
      li.appendChild(renderItems(item.items, ctx));
    }

    ul.appendChild(li);
  }

  return ul;
}

/**
 * Setup mobile menu toggle
 */
export function setupMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const overlay = document.getElementById('sidebar-overlay');

  if (!menuBtn || !sidebar) return;

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    if (overlay) {
      overlay.classList.toggle('visible');
    }
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
    });
  }
}
