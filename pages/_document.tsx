import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class MyDocument extends Document {
  // TODO: add SEO meta tags, etc, to Head element
  // TODO: create and update the "favicon" image, use a "png"
  // TODO: need to create an image for "og:image"

  render() {
    return (
      <Html lang="en" dir="ltr" className="dark">
        <Head>{/* <meta name="theme-color" content="#f8fafc" /> */}</Head>
        <Script src="/scripts/theme.js" strategy="beforeInteractive" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
