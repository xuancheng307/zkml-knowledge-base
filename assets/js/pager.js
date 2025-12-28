/* ========================================
   ZKML Docs - Prev/Next Pager
   ======================================== */

import { getConfig, getPageList } from './nav-store.js';
import { getPrevNext } from './utils.js';

/**
 * Render previous/next navigation links
 */
export function renderPager() {
  const container = document.getElementById('prev-next');
  if (!container) return;

  const config = getConfig();
  const pageList = getPageList();
  const currentPath = window.location.pathname;

  const { prev, next } = getPrevNext(currentPath, pageList, config.baseUrl);

  let html = '';

  if (prev) {
    html += `
      <a href="${config.baseUrl}${prev.path}" class="prev">
        <span class="label">← 上一篇</span>
        <span class="title">${prev.title}</span>
      </a>
    `;
  } else {
    html += '<div class="prev"></div>';
  }

  if (next) {
    html += `
      <a href="${config.baseUrl}${next.path}" class="next">
        <span class="label">下一篇 →</span>
        <span class="title">${next.title}</span>
      </a>
    `;
  } else {
    html += '<div class="next"></div>';
  }

  container.innerHTML = html;
}
