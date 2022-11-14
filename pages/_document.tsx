import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  // TODO: add SEO meta tags, etc, to Head element
  // TODO: create and update the "favicon" image, use a "png"
  // TODO: need to create an image for "og:image"

  render() {
    return (
      <Html lang="en" dir="ltr" className="dark">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
