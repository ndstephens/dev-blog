import { createGlobalStyle } from 'styled-components';

export const COLOR_SWAP_TRANSITION_DURATION = 300;

export default createGlobalStyle`
  /**================================================
  /**               GLOBAL VARIABLES
  /**==============================================*/
  :root {
    /* FONTS */
    --ff-serif: 'VollkornVariable', serif;
    --ff-sans-serif: 'MontserratVariable', sans-serif;
    --ff-mono: 'Red Hat MonoVariable', monospace;
    /* font-weights can be any value, not just the standard ones */
    --fw-bold: 700;
    --fw-semi-bold: 600;
    --fw-medium: 400;
    --fw-light: 300;

    /* COLORS */
    /* LIGHT MODE */
    --color-text-body: black;
    --color-background-body: white;
    /* --color-text: hsl(0, 0%, 100%);
    --color-background: hsl(210, 30%, 8%); */
    /* --color-blurred-background: hsla(210, 30%, 8%, 0.85); */
    /* --color-primary: hsl(230, 100%, 67%); */
    /* --color-secondary: hsl(333, 100%, 52%); */
    /* --color-tertiary: hsl(53, 100%, 50%); */
    /* --color-decorative: hsl(200, 50%, 60%); */
    /* --color-muted: hsl(210, 38%, 15%); */
    /* --color-muted-background: hsla(210, 38%, 15%, 0.85); */
    /* --color-info: hsl(230, 100%, 67%); */
    /* --color-success: hsl(160, 100%, 40%); */
    /* --color-success-background: hsla(160, 100%, 40%, 0.1); */
    /* --color-error: hsl(340, 95%, 60%); */
    /* --color-error-background: hsla(340, 95%, 43%, 0.1); */
    /* --color-alert: hsl(30, 100%, 50%); */
    /* --color-alert-background: hsla(38, 100%, 50%, 0.1); */
    /* --color-venn-0: hsl(250, 100%, 50%); */
    /* --color-venn-1: hsl(175, 100%, 50%); */
    /* --color-subtle-background: hsl(210, 30%, 8%); */
    /* --color-subtle-floating: hsl(210, 22%, 15%); */
    /* --color-homepage-light: hsla(200, 100%, 85%, 0); */
    /* --color-homepage-dark: hsla(200, 100%, 85%, 0.1); */
    /* --color-homepage-bg: hsl(210, 30%, 8%); */

    /* GRAYS */
    --color-gray100: hsl(210, 15%, 20%);
    --color-gray200: hsl(210, 15%, 25%);
    --color-gray300: hsl(210, 10%, 40%);
    --color-gray400: hsl(210, 9%, 45%);
    --color-gray500: hsl(210, 8%, 50%);
    --color-gray600: hsl(210, 12%, 55%);
    --color-gray700: hsl(210, 14%, 66%);
    --color-gray800: hsl(210, 25%, 88%);
    --color-gray900: hsl(210, 25%, 96%);

    /* CODE COMPONENT */
    --syntax-bg: hsl(210, 30%, 12%);
    --syntax-highlight: hsl(210, 30%, 18%);
    --syntax-txt: #FFF;
    --syntax-comment: #6c8998;
    --syntax-prop: #FF39A8;
    --syntax-bool: #FFD600;
    --syntax-val: #61747D;
    --syntax-str: rgb(155, 109, 255);
    --syntax-name: #C653FF;
    --syntax-del: #FF5555;
    --syntax-regex: #ffd700;
    --syntax-fn: rgb(0, 190, 255);

    /* USER SETTINGS */
    /* --prefers-dark: true; */
  }

  /**================================================
  /**            AUTO COLOR THEME
  /**==============================================*/
  /* @media (prefers-color-scheme: dark) {
    :root {
      --color-text: white;
      --color-background: black;
    }
  } */

  /**================================================
  /**                GLOBAL RESET
  /**==============================================*/
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    background: none;
    background-repeat: no-repeat;
    border: none;
    border-radius: 0;
    line-height: calc(1em + 0.725rem);
    margin: 0;
    margin-block: 0;
    margin-inline: 0;
    padding: 0;
    padding-block: 0;
    padding-inline: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  html {
    scroll-behavior: smooth;
  }

  #__next {
    isolation: isolate;
  }

  body {
    font-family: var(--ff-serif);
    font-weight: var(--fw-medium);
    font-synthesis: none;
    background-color: var(--color-background-body);
    color: var(--color-text-body);

    transition: background ${COLOR_SWAP_TRANSITION_DURATION}ms, color ${COLOR_SWAP_TRANSITION_DURATION}ms;
  }

  h1, h2, h3, h4, h5, h6,
  button,
  input,
  option,
  select,
  textarea {
    font-family: var(--ff-sans-serif);
  }

  /* button,
  input,
  option,
  select,
  textarea {
    font: inherit;
    color: inherit;
  } */

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    /* hyphens: auto; */
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: var(--fw-bold);
  }

  em {
    font-style: italic;
  }

  button,
  nav * {
    user-select: none;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style-type: none;
  }

  canvas,
  img,
  picture,
  svg,
  video {
    display: block;
    max-width: 100%;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: var(--ff-mono);
    font-weight: var(--fw-medium);
    /* font-size: 0.9rem; */
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  *:focus {
    outline: 5px auto var(--color-primary);
  }

  [disabled] {
    cursor: not-allowed;
  }

  [aria-disabled] {
    cursor: not-allowed;
  }

  [aria-busy] {
    cursor: progress;
  }

  [aria-controls] {
    cursor: pointer;
  }
`;
