/* eslint-disable @next/next/no-document-import-in-page */
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content="Crappy Birds - Early Birds" />
          <meta
            name="description"
            content="Early Birds verification process."
          />

          {/* favicons */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#E682F0" />
          <meta
            name="apple-mobile-web-app-title"
            content="Crappy Birds - Early Birds"
          />
          <meta name="application-name" content="Crappy Birds - Early Birds" />
          <meta name="msapplication-TileColor" content="#E682F0" />
          <meta name="theme-color" content="#E682F0" />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://early.crappybirds.io/" />
          <meta property="og:title" content="Crappy Birds - Early Birds" />
          <meta
            property="og:description"
            content="Early Birds verification process."
          />
          <meta
            property="og:image"
            content="https://crappybirds.io/images/crappy-birds-in-the-nest.png"
          />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:url"
            content="https://early.crappybirds.io/"
          />
          <meta property="twitter:title" content="Crappy Birds - Early Birds" />
          <meta
            property="twitter:description"
            content="Early Birds verification process."
          />
          <meta
            property="twitter:image"
            content="https://early.crappybirds.io/images/crappy-birds-in-the-nest.png"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;1,400;1,800;1,900&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
