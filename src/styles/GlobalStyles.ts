import { createGlobalStyle } from 'styled-components';

export const COLOR_SWAP_TRANSITION_DURATION = 300;

export default createGlobalStyle`
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
    padding: 0;
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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
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

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    /* hyphens: auto; */
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
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

  a {
    color: inherit;
    text-decoration: none;
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
