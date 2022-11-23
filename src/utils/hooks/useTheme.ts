import React from 'react';

const THEME = 'theme';
export const SYSTEM = 'system';
export const LIGHT = 'light';
export const DARK = 'dark';
type ThemeType = typeof SYSTEM | typeof LIGHT | typeof DARK;

export default function useTheme() {
  // TODO: preset from local storage
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeType>(SYSTEM);

  // Init selected theme from local-storage
  React.useEffect(() => {
    const theme = localStorage.theme as ThemeType | undefined;
    if (theme === LIGHT || theme === DARK) {
      setSelectedTheme(theme);
    } else {
      localStorage.removeItem(THEME); // clear incase of corrupted value
      setSelectedTheme(SYSTEM);
    }
  }, []);

  // Set event listeners for system pref change
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemPrefChange);
    return () =>
      mediaQuery.removeEventListener('change', handleSystemPrefChange);
  }, []);

  // Handle theme selection update
  React.useEffect(() => {
    if (selectedTheme === SYSTEM) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    } else if (selectedTheme === DARK) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
    updateLocalStorage(selectedTheme);
  }, [selectedTheme]);

  return [selectedTheme, setSelectedTheme] as const;
}

/* =============================================
              UTILITY FUNCTIONS
============================================= */
function setDarkTheme() {
  document.documentElement.classList.add(DARK);
  // TODO: decide on dark "theme-color"
  // document
  //   .querySelector('meta[name="theme-color"]')
  //   .setAttribute('content', '#0B1120');
}

function setLightTheme() {
  document.documentElement.classList.remove(DARK);
  // TODO: decide on light "theme-color"
  // document
  //   .querySelector('meta[name="theme-color"]')
  //   .setAttribute('content', '#f8fafc');
}

function updateLocalStorage(selectedTheme: ThemeType) {
  if (selectedTheme === SYSTEM) {
    localStorage.removeItem(THEME);
  } else if (selectedTheme === LIGHT || selectedTheme === DARK) {
    localStorage.theme = selectedTheme;
  }
}

function handleSystemPrefChange(e: MediaQueryListEvent) {
  if (!localStorage.theme) {
    if (e.matches) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }
}
