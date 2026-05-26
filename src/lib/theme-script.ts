// This script runs BEFORE React loads, directly in the HTML.
// It reads the saved theme and applies it immediately,
// preventing the white flash on dark-mode users.
export const themeScript = `
  (function() {
    try {
      var saved = localStorage.getItem('theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = saved || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch(e) {}
  })();
`;
