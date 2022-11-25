import React from 'react';

import MoonIcon from 'src/assets/icons/theme/moon.svg';
import OSIcon from 'src/assets/icons/theme/os.svg';
import SunIcon from 'src/assets/icons/theme/sun.svg';
import { capitalizeFirstLetter } from 'src/utils/helperFns';

// THEME: | LOCAL-STORAGE PROPERTY:
// -------------------------------
// SYSTEM: <remove property>
// LIGHT:  "theme: light"
// DARK:   "theme: dark"

const THEME = 'theme';
const SYSTEM = 'system';
const LIGHT = 'light';
const DARK = 'dark';

type ThemeType = typeof SYSTEM | typeof LIGHT | typeof DARK;

const themeOptions = {
  [SYSTEM]: {
    label: capitalizeFirstLetter(SYSTEM),
    value: SYSTEM,
    icon: OSIcon,
  },
  [LIGHT]: {
    label: capitalizeFirstLetter(LIGHT),
    value: LIGHT,
    icon: SunIcon,
  },
  [DARK]: {
    label: capitalizeFirstLetter(DARK),
    value: DARK,
    icon: MoonIcon,
  },
} as const;

type ThemeOption = typeof themeOptions[keyof typeof themeOptions];

//* OPTIONS LIST
export const themeOptionsList = Object.values(themeOptions);

//* useTheme HOOK
export default function useTheme() {
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeOption>();

  // Init selected theme from local-storage
  React.useEffect(() => {
    const savedTheme = localStorage[THEME];
    if (savedTheme === LIGHT) {
      setSelectedTheme(themeOptions[LIGHT]);
    } else if (savedTheme === DARK) {
      setSelectedTheme(themeOptions[DARK]);
    } else {
      localStorage.removeItem(THEME); // clear incase of corrupted value
      setSelectedTheme(themeOptions[SYSTEM]);
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
    if (selectedTheme === themeOptions[SYSTEM]) {
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

function updateLocalStorage(themeType: ThemeType) {
  if (themeType === LIGHT || themeType === DARK) {
    localStorage[THEME] = themeType;
  } else {
    localStorage.removeItem(THEME);
  }
}

function handleSystemPrefChange(e: MediaQueryListEvent) {
  if (!localStorage[THEME]) {
    if (e.matches) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }
}
