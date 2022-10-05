export const printColor = {
  good: {
    bg: 'lime',
    text: 'black',
  },
  ok: {
    bg: 'yellow',
    text: 'black',
  },
  poor: {
    bg: 'red',
    text: 'white',
  },
};

export const metricRanges = {
  TTFB: {
    good: 200, // ms
    poor: 600, // ms
  },
  FCP: {
    good: 1800, // ms
    poor: 3000, // ms
  },
  LCP: {
    good: 2500, // ms
    poor: 4000, // ms
  },
  FID: {
    good: 100, // ms
    poor: 300, // ms
  },
  CLS: {
    good: 0.1, // value
    poor: 0.25, // value
  },
  INP: {
    good: 200, // ms
    poor: 500, // ms
  },
};
