import type { AppProps, NextWebVitalsMetric } from 'next/app';

import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { AppLayout } from 'src/components/AppLayout';
import GlobalStyles from 'src/styles/GlobalStyles';
import { theme } from 'src/styles/theme';
// import ErrorBoundary from 'src/components/ErrorBoundary';
import { printWebVitalMetric } from 'src/utils/webMetrics';

import '@fontsource/montserrat/variable.css';
// // import '@fontsource/montserrat/variable-italic.css';
import '@fontsource/red-hat-mono/variable.css';
import '@fontsource/vollkorn/variable.css';
import '@fontsource/vollkorn/variable-italic.css';
import 'src/styles/globalVariables.css';

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
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {/* <ErrorBoundary> */}
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        {/* </ErrorBoundary> */}
      </ThemeProvider>
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
