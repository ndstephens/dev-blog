try {
  if (localStorage.theme === 'dark') {
    // user-set dark theme
    setDarkTheme();
  } else if (localStorage.theme === 'light') {
    // user-set light theme
    setLightTheme();
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // system-set dark theme
    setDarkTheme();
  } else {
    // system-set light theme
    setLightTheme();
  }
} catch (_) {
  // eslint-disable-next-line no-console
  console.error('Error setting UI theme');
}

function setDarkTheme() {
  document.documentElement.classList.add('dark');
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', '#0f172a');
}

function setLightTheme() {
  document.documentElement.classList.remove('dark');
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', '#f8fafc');
}
