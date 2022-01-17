 /* eslint-disable */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {

    type FeatureFlagsProps = {
      'data-dynamic-typography-version': 'v1' | 'v2',
      'data-eds-flexible-height'? : Boolean
    }

    const featureFlags: FeatureFlagsProps = {
      'data-dynamic-typography-version': process.env.NEXT_PUBLIC_VNYS_717_IMPROVED_TYPOGRAPHY === 'true' ? 'v2' : 'v1',
    }

    if (process.env.NEXT_PUBLIC_VNYS_653_EDS_FLEXIBLE_HEIGHT === 'true') {
      featureFlags['data-eds-flexible-height'] = true
    }

    return (
      <Html {...featureFlags}>
        <Head>
          {/* <link rel="stylesheet" href="https://eds-static.equinor.com/font/equinor-uprights-vf.css" /> */}
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
