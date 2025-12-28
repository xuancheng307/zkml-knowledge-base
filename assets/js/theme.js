/* ========================================
   ZKML Docs - Theme Toggle (Dark Mode)
   ======================================== */

const THEME_KEY = 'zkml-theme';

/**
 * Get the current theme preference
 */
function getThemePreference() {
  // Check localStorage
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) {
    return stored;
  }

  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

/**
 * Apply theme to document
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  // Update toggle button icon
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', theme === 'dark' ? '切換淺色模式' : '切換深色模式');
  }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';

  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

/**
 * Initialize theme system
 */
export function initTheme() {
  // Apply saved/system preference immediately
  const theme = getThemePreference();
  applyTheme(theme);

  // Setup toggle button
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', toggleTheme);
  }

  // Listen for system preference changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only auto-switch if user hasn't set a preference
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

/**
 * Initialize theme as early as possible (call in <head>)
 * This prevents flash of wrong theme
 */
export function initThemeEarly() {
  const theme = getThemePreference();
  document.documentElement.setAttribute('data-theme', theme);
}
