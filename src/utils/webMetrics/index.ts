import { metricRanges, printColor } from './constants';

type Props = {
  id: string;
  startTime: number;
  value: number;
} & (
  | {
      label: 'web-vital';
      name: 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP';
    }
  | {
      label: 'custom';
      name:
        | 'Next.js-hydration'
        | 'Next.js-route-change-to-render'
        | 'Next.js-render';
    }
);

export const printWebVitalMetric = ({ label, name, value }: Props) => {
  const metricPrintValue =
    name === 'CLS'
      ? value.toFixed(2).padEnd(4, '0')
      : Math.round(value).toString().padStart(4, ' ');

  if (label === 'web-vital') {
    const metricPrintName = `${name}:`.padEnd(5, ' ');
    const colors = selectColors({ name, value });
    console.log(
      `%cMETRIC - ${metricPrintName} ${metricPrintValue}${
        name !== 'CLS' ? 'ms' : '  '
      }`,
      `font-weight:bold; background-color:${colors.bg}; color:${colors.text}; padding-block:4px; padding-inline:12px;`
    );
  }

  if (label === 'custom') {
    console.log(
      `%cMETRIC - ${name}: ${metricPrintValue}ms`,
      'font-weight:bold; background-color:cyan; color:black; padding-block:4px; padding-inline:12px;'
    );
  }
};

const selectColors = ({
  name,
  value,
}: {
  name: 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP';
  value: number;
}) => {
  return value <= metricRanges[name].good
    ? printColor.good
    : value >= metricRanges[name].poor
    ? printColor.poor
    : printColor.ok;
};
