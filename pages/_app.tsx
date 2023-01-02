import type { AppProps, NextWebVitalsMetric } from 'next/app';

import Head from 'next/head';

import { MotionConfig } from 'framer-motion';

import { AppLayout } from '@ui/AppLayout';

// import ErrorBoundary from '@ui/ErrorBoundary';
import { printWebVitalMetric } from 'src/webMetrics';

// Font imports
// import '@fontsource/baloo-2/variable.css';
import '@fontsource/albert-sans/variable.css';
import '@fontsource/exo/variable.css';
import '@fontsource/exo/variable-italic.css';
import '@fontsource/red-hat-mono/variable.css';
// Tailwind CSS import
import 'src/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      {/* <ErrorBoundary> */}
      <MotionConfig reducedMotion="user">
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </MotionConfig>
      {/* </ErrorBoundary> */}
    </>
  );
}

/* =============================================
                WEB VITALS
============================================= */
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (process.env.NODE_ENV === 'development') {
    printWebVitalMetric(metric);
  }
}
