const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');
const Color = require('color');

//* USE CSS-VAR COLORS WITH OPACITY
const CS = 'rgb';
const withOpacity = (variableName, colorSpace) =>
  colorSpace === 'rgb'
    ? `rgb(var(${variableName}) / <alpha-value>)`
    : `hsl(var(${variableName}) / <alpha-value>)`;
const asChannels = (hexValue, colorSpace) =>
  colorSpace === 'rgb' ? hexToRGB(hexValue) : hexToHSL(hexValue);
const hexToRGB = (hexValue) => {
  return Color(hexValue).rgb().array().join(' ');
};
const hexToHSL = (hexValue) => {
  return Color(hexValue)
    .hsl()
    .array()
    .map((val, i) => `${Math.round(val)}${i === 0 ? 'deg' : '%'}`)
    .join(' ');
};
//* USE CSS-VAR COLORS WITH OPACITY

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
        clr: {
          text: {
            base: withOpacity('--color-text-base', CS),
          },
          bg: {
            base: withOpacity('--color-bg-base', CS),
          },
          primary: {
            base: withOpacity('--color-primary-base', CS),
          },
        },
      },
      spacing: {
        sp: {
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
    plugin(function ({ addBase, addUtilities, addVariant, theme }) {
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
      });
      addVariant('hocus', ['&:hover', '&:focus ']);
      addBase({
        html: {
          // -inverted, -muted, -accent, -accent-hover
          //? LIGHT-MODE COLORS
          '--color-text-base': asChannels(theme('colors.slate.900'), CS),
          '--color-bg-base': asChannels(theme('colors.slate.100'), CS),
          '--color-primary-base': asChannels(theme('colors.red.600'), CS),
        },
        'html.dark': {
          //? DARK-MODE COLORS
          '--color-text-base': asChannels(theme('colors.slate.100'), CS),
          '--color-bg-base': asChannels(theme('colors.slate.900'), CS),
          '--color-primary-base': asChannels(theme('colors.red.400'), CS),
        },
      });
    }),
  ],
};
