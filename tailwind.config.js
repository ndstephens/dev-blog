const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
    extend: {
      fontFamily: {
        display: ['"Baloo 2Variable"', ...defaultTheme.fontFamily.serif],
        sans: ['ExoVariable', ...defaultTheme.fontFamily.sans],
        mono: ['"Red Hat MonoVariable"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        ctx: {
          textColor: {
            body: 'var(--color-text-body)',
          },
          bgColor: {
            body: 'var(--color-bg-body)',
          },
          primaryColor: {
            DEFAULT: 'var(--color-primary)',
          },
        },
      },
      spacing: {
        ctx: {
          headerHeight: '--var(--header-height)',
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/aspect-ratio'),
    plugin(function ({ addUtilities, addVariant }) {
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
      });
      addVariant('hocus', ['&:hover', '&:focus ']);
    }),
  ],
};
