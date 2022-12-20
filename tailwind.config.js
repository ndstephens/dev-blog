const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const Color = require('color');

/* =============================================
*      USE CSS-VAR HEX COLORS WITH OPACITY     =
============================================= */
const colorSpace = 'rgb'; // 'rgb' or 'hsl'

const withOpacity = (cssVariable) =>
  colorSpace === 'rgb'
    ? `rgb(${cssVariable} / <alpha-value>)`
    : `hsl(${cssVariable} / <alpha-value>)`;

const asChannels = (hexColor) =>
  colorSpace === 'rgb' ? hexToRGB(hexColor) : hexToHSL(hexColor);

const hexToRGB = (hexColor) => {
  return Color(hexColor).rgb().array().join(' ');
};

const hexToHSL = (hexColor) => {
  return Color(hexColor)
    .hsl()
    .array()
    .map((val, i) => `${Math.round(val)}${i === 0 ? 'deg' : '%'}`)
    .join(' ');
};

/* =============================================
*               TAILWIND CONFIG                =
============================================= */
/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  // prefix: 'tw-',
  darkMode: 'class',
  // ! If you have any JavaScript files that manipulate your HTML to add classes, make sure you include those as well.
  // ! That might include a global script to affect dark-mode.
  // ! Never include CSS files in your content configuration.
  // ! See "Transforming source files" in the docs about scanning markdown files.
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        display: ['"Baloo 2Variable"', ...defaultTheme.fontFamily.serif],
        sans: ['ExoVariable', ...defaultTheme.fontFamily.sans],
        mono: ['"Red Hat MonoVariable"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        textClr: {
          base: withOpacity('var(--color-text-base)'),
          dim: withOpacity('var(--color-text-dim)'),
        },
        surfaceClr: {
          1: withOpacity('var(--color-surface-1)'),
          2: withOpacity('var(--color-surface-2)'),
          3: withOpacity('var(--color-surface-3)'),
          4: withOpacity('var(--color-surface-4)'),
        },
        primaryClr: {
          1: withOpacity('var(--color-primary-1)'),
          3: withOpacity('var(--color-primary-3)'),
          DEFAULT: withOpacity('var(--color-primary-5)'),
          7: withOpacity('var(--color-primary-7)'),
          9: withOpacity('var(--color-primary-9)'),
        },
      },
      spacing: {
        headerHeight: '48px',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/container-queries'),
    require('@headlessui/tailwindcss'),
    plugin(function ({ addBase, addUtilities, addVariant, theme }) {
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
      });
      addVariant('hocus', ['&:hover', '&:focus']);
      addBase({
        // -inverted, -muted, -accent, -accent-hover
        //? LIGHT-MODE COLORS
        html: {
          // TEXT
          '--color-text-base': asChannels(theme('colors.slate.900')),
          '--color-text-dim': asChannels(theme('colors.slate.800')),
          // SURFACE
          '--color-surface-1': asChannels(theme('colors.slate.50')),
          '--color-surface-2': asChannels(theme('colors.slate.200')),
          '--color-surface-3': asChannels(theme('colors.slate.300')),
          '--color-surface-4': asChannels(theme('colors.slate.400')),
          // PRIMARY
          // TODO: need to decide on these...
          '--color-primary-1': asChannels(theme('colors.red.100')),
          '--color-primary-3': asChannels(theme('colors.red.300')),
          '--color-primary-5': asChannels(theme('colors.red.500')),
          '--color-primary-7': asChannels(theme('colors.red.700')),
          '--color-primary-9': asChannels(theme('colors.red.900')),
        },
        //? DARK-MODE COLORS
        'html.dark': {
          // TEXT
          '--color-text-base': asChannels(theme('colors.slate.50')),
          '--color-text-dim': asChannels(theme('colors.slate.200')),
          // SURFACE
          '--color-surface-1': asChannels(theme('colors.slate.900')),
          '--color-surface-2': asChannels(theme('colors.slate.800')),
          '--color-surface-3': asChannels(theme('colors.slate.700')),
          '--color-surface-4': asChannels(theme('colors.slate.600')),
          // PRIMARY
          '--color-primary-1': asChannels(theme('colors.sky.100')),
          '--color-primary-3': asChannels(theme('colors.sky.300')),
          '--color-primary-5': asChannels(theme('colors.sky.500')),
          '--color-primary-7': asChannels(theme('colors.sky.700')),
          '--color-primary-9': asChannels(theme('colors.sky.900')),
        },
      });
    }),
  ],
};
