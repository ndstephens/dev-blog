import React from 'react';

import { useUpdateEffect } from 'usehooks-ts';

import MoonIcon from '@assets/icons/theme/moon.svg';
import SunIcon from '@assets/icons/theme/sun.svg';

import { capitalizeFirstLetter } from 'src/utils/stringFns';

// THEME: | LOCAL-STORAGE PROPERTY:
// -------------------------------
// OS: <remove property>
// LIGHT:  "theme: light"
// DARK:   "theme: dark"

const THEME = 'theme';
const OS = 'system';
const LIGHT = 'light';
const DARK = 'dark';

type ThemeType = typeof OS | typeof LIGHT | typeof DARK;

const themeOptions = {
  [OS]: {
    label: capitalizeFirstLetter(OS),
    value: OS,
  },
  [LIGHT]: {
    label: capitalizeFirstLetter(LIGHT),
    value: LIGHT,
  },
  [DARK]: {
    label: capitalizeFirstLetter(DARK),
    value: DARK,
  },
} as const;

type ThemeOption = typeof themeOptions[keyof typeof themeOptions];

export const themeOptionsList = Object.values(themeOptions);

//* =============================================
//*                 useTheme                    =
//*==============================================
export function useTheme() {
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeOption>();

  // Init "selectedTheme" from local-storage
  React.useEffect(() => {
    const savedTheme = localStorage[THEME];
    if (savedTheme === LIGHT) {
      setSelectedTheme(themeOptions[LIGHT]);
    } else if (savedTheme === DARK) {
      setSelectedTheme(themeOptions[DARK]);
    } else {
      localStorage.removeItem(THEME); // clear incase of corrupted value
      setSelectedTheme(themeOptions[OS]);
    }
  }, []);

  // Set event listeners for OS theme pref change
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleOSThemePrefChange);
    return () =>
      mediaQuery.removeEventListener('change', handleOSThemePrefChange);
  }, []);

  // Handle theme selection update from UI toggle in nav
  useUpdateEffect(() => {
    if (selectedTheme === themeOptions[OS]) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    } else if (selectedTheme === themeOptions[DARK]) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
    if (selectedTheme) {
      updateLocalStorage(selectedTheme.value);
    }
  }, [selectedTheme]);

  return [selectedTheme, setSelectedTheme] as const;
}

/* =============================================
              UTILITY FUNCTIONS
============================================= */
function setDarkTheme() {
  document.documentElement.classList.add(DARK);
  document
    ?.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', '#0f172a');
}

function setLightTheme() {
  document.documentElement.classList.remove(DARK);
  document
    ?.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', '#f8fafc');
}

function updateLocalStorage(themeType: ThemeType) {
  if (themeType === LIGHT || themeType === DARK) {
    localStorage[THEME] = themeType;
  } else {
    localStorage.removeItem(THEME);
  }
}

function handleOSThemePrefChange(e: MediaQueryListEvent) {
  if (!localStorage[THEME]) {
    if (e.matches) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }
}

//

//* =============================================
//*               useThemeIcons                 =
//*==============================================
// This updates the icon for the OS option based on user-settings
// Updated in real-time whether user changes setting directly or is auto-changed by time-of-day
// Also updates whether or not OS is currently selected theme

const themeIcons = {
  [OS]: SunIcon, // inits as light-theme icon
  [LIGHT]: SunIcon,
  [DARK]: MoonIcon,
};

export function useThemeIcons() {
  const [icons, updateIcons] = React.useState(themeIcons);

  React.useEffect(() => {
    function updateSystemThemeIcon(e: MediaQueryListEvent | MediaQueryList) {
      if (e.matches) {
        updateIcons((ps) => ({
          ...ps,
          [OS]: MoonIcon,
        }));
      } else {
        updateIcons((ps) => ({
          ...ps,
          [OS]: SunIcon,
        }));
      }
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    // init
    updateSystemThemeIcon(mediaQuery);
    // add change handlers
    mediaQuery.addEventListener('change', updateSystemThemeIcon);
    return () =>
      mediaQuery.removeEventListener('change', updateSystemThemeIcon);
  }, []);

  return icons;
}
