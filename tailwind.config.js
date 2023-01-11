const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const Color = require('color');

/* =============================================
*      USE CSS-VAR HEX COLORS WITH OPACITY     =
============================================= */
const colorSpace = 'hsl'; // 'rgb' or 'hsl'

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
    // fontSize: {
    //   xs: ['0.75rem', { lineHeight: '1rem' }], //* 12px
    //   sm: ['0.875rem', { lineHeight: '1.25rem' }], //* 14px
    //   base: ['1rem', { lineHeight: '1.5rem' }], //* 16px
    //   lg: ['1.125rem', { lineHeight: '1.75rem' }], //* 18px
    //   xl: ['1.25rem', { lineHeight: '1.75rem' }], //* 20px
    //   '2xl': ['1.5rem', { lineHeight: '2rem' }], //* 24px
    //   '3xl': ['1.875rem', { lineHeight: '2.25rem' }], //* 30px
    //   '4xl': ['2.25rem', { lineHeight: '2.5rem' }], //* 36px
    //   '5xl': ['3rem', { lineHeight: '1' }], //* 48px
    //   '6xl': ['3.75rem', { lineHeight: '1' }], //* 60px
    //   '7xl': ['4.5rem', { lineHeight: '1' }], //* 72px
    //   '8xl': ['6rem', { lineHeight: '1' }], //* 96px
    //   '9xl': ['8rem', { lineHeight: '1' }], //* 128px
    // },
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem', //* 2px
      1: '0.25rem', //* 4px
      // 1.5: '0.375rem',
      2: '0.5rem', //* 8px
      // 2.5: '0.625rem',
      3: '0.75rem', //* 12px
      // 3.5: '0.875rem',
      4: '1rem', //* 16px
      // 5: '1.25rem',
      6: '1.5rem', //* 24px
      // 7: '1.75rem',
      8: '2rem', //* 32px
      // 9: '2.25rem',
      // 10: '2.5rem',
      // 11: '2.75rem',
      12: '3rem', //* 48px
      // 14: '3.5rem',
      16: '4rem', //* 64px
      // 20: '5rem',
      24: '6rem', //* 96px
      // 28: '7rem',
      32: '8rem', //* 128px
      // 36: '9rem',
      // 40: '10rem',
      // 44: '11rem',
      48: '12rem', //* 192px
      // 52: '13rem',
      // 56: '14rem',
      // 60: '15rem',
      64: '16rem', //* 256px
      // 72: '18rem',
      // 80: '20rem',
      96: '24rem', //* 384px
      128: '32rem', //* 512px
      160: '40rem', //* 640px
      192: '48rem', //* 768px
    },
    extend: {
      fontFamily: {
        display: ['OswaldVariable', ...defaultTheme.fontFamily.sans],
        sans: ['ExoVariable', ...defaultTheme.fontFamily.sans],
        serif: ['BitterVariable', ...defaultTheme.fontFamily.serif],
        mono: ['"Red Hat MonoVariable"', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        headerHeight: '52px',
      },
      colors: {
        textClr: {
          1: withOpacity('var(--color-text-1)'),
          2: withOpacity('var(--color-text-2)'),
          3: withOpacity('var(--color-text-3)'),
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
      addVariant('hocus-within', ['&:hover', '&:focus-within']);
      addBase({
        // -inverted, -muted, -accent, -accent-hover
        //? LIGHT-MODE COLORS
        html: {
          // TEXT
          '--color-text-1': asChannels(theme('colors.slate.900')),
          '--color-text-2': asChannels(theme('colors.slate.700')),
          '--color-text-3': asChannels(theme('colors.slate.500')),
          // SURFACE
          '--color-surface-1': asChannels(theme('colors.slate.50')),
          '--color-surface-2': asChannels(theme('colors.slate.100')),
          '--color-surface-3': asChannels(theme('colors.slate.200')),
          '--color-surface-4': asChannels(theme('colors.slate.300')),
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
          '--color-text-1': asChannels(theme('colors.slate.50')),
          '--color-text-2': asChannels(theme('colors.slate.200')),
          '--color-text-3': asChannels(theme('colors.slate.400')),
          // SURFACE
          '--color-surface-1': asChannels(theme('colors.slate.900')),
          '--color-surface-2': asChannels(theme('colors.slate.800')),
          '--color-surface-3': asChannels(theme('colors.slate.700')),
          '--color-surface-4': asChannels(theme('colors.slate.600')),
          // PRIMARY
          '--color-primary-1': asChannels(theme('colors.cyan.100')),
          '--color-primary-3': asChannels(theme('colors.cyan.300')),
          '--color-primary-5': asChannels(theme('colors.cyan.500')),
          '--color-primary-7': asChannels(theme('colors.cyan.700')),
          '--color-primary-9': asChannels(theme('colors.cyan.900')),
        },
      });
    }),
  ],
};
