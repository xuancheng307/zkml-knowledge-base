/* ========================================
   ZKML Docs - Site Entry Point
   ======================================== */

import { loadNavData } from './nav-store.js';
import { renderSidebar, setupMobileMenu } from './sidebar.js';
import { renderBreadcrumb } from './breadcrumb.js';
import { renderPager } from './pager.js';
import { initTheme } from './theme.js';

/**
 * Initialize the site
 */
async function init() {
  try {
    // Load navigation data first (single fetch, shared by all modules)
    await loadNavData();

    // Render navigation components
    renderSidebar();
    renderBreadcrumb();
    renderPager();

    // Setup interactions
    setupMobileMenu();
    initTheme();

    // Auto-load MathJax if page contains math
    await loadMathJaxIfNeeded();

    // Auto-load Mermaid if page contains diagrams
    await loadMermaidIfNeeded();

    console.log('ZKML Docs initialized successfully');
  } catch (error) {
    console.error('Failed to initialize ZKML Docs:', error);
  }
}

/**
 * Load MathJax if the page contains math content
 */
async function loadMathJaxIfNeeded() {
  // Check for math indicators
  const hasMath =
    document.body.textContent.includes('\\(') ||
    document.body.textContent.includes('\\[') ||
    document.body.textContent.includes('$') ||
    document.querySelector('[data-math]') ||
    document.querySelector('.math');

  if (!hasMath) return;

  // Configure MathJax
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      processEscapes: true
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
    }
  };

  // Load MathJax from CDN
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
  script.async = true;
  document.head.appendChild(script);
}

/**
 * Load Mermaid if the page contains diagrams
 */
async function loadMermaidIfNeeded() {
  const hasMermaid = document.querySelector('.mermaid, pre.mermaid, code.language-mermaid');

  if (!hasMermaid) return;

  // Load Mermaid from CDN
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
  script.async = true;

  script.onload = () => {
    window.mermaid.initialize({
      startOnLoad: true,
      theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default',
      securityLevel: 'loose'
    });
    window.mermaid.run();
  };

  document.head.appendChild(script);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
