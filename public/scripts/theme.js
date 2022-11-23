try {
  if (localStorage.theme === 'dark') {
    // user-SET dark theme
    setDarkTheme();
  } else if (localStorage.theme === 'light') {
    // user-SET light theme
    setLightTheme();
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // user-PREFERRED dark theme
    setDarkTheme();
  } else {
    // user-PREFERRED light theme
    setLightTheme();
  }
} catch (_) {}

function setDarkTheme() {
  document.documentElement.classList.add('dark');
  // TODO: decide on dark "theme-color"
  // document
  //   .querySelector('meta[name="theme-color"]')
  //   .setAttribute('content', '#0B1120');
}

function setLightTheme() {
  document.documentElement.classList.remove('dark');
  // TODO: decide on light "theme-color"
  // document
  //   .querySelector('meta[name="theme-color"]')
  //   .setAttribute('content', '#f8fafc');
}
