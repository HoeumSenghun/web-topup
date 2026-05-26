/** Inline script for beforeInteractive — prevents theme flash on first paint */
export const themeInitScript = `
(function () {
  try {
    var m = document.cookie.match(/(?:^|; )ds-theme=([^;]*)/);
    var theme = m && m[1] === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`.trim()
