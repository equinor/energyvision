/* eslint-disable */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import { GTM_ID } from '../lib/gtm'

if (process.env.NEXT_MANUAL_SIG_HANDLE) {
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM: cleaning up')
    process.exit(0)
  })
  process.on('SIGINT', () => {
    console.log('Received SIGINT: cleaning up')
    process.exit(0)
  })
}

const GoogleConsentMode = () => (
  <script
    data-cookieconsent="ignore"
    dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("consent", "default", {
            ad_storage: "denied",
            analytics_storage: "denied",
            functionality_storage: "denied",
            personalization_storage: "denied",
            security_storage: "granted",
            wait_for_update: 500,
        });
        gtag("set", "ads_data_redaction", true);
      `,
    }}
  />
)

const GoogleTagManagerHead = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');`,
    }}
  />
)

const GoogleTagManagerBody = () => (
  <noscript
    dangerouslySetInnerHTML={{
      __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    }}
  />
)
// We need this to support server-side rendering for styled components. It does create some issues with React 18 types
// See https://github.com/vercel/next.js/issues/36008#issuecomment-1094073787 for the added fix
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
        styles: [
          <React.Fragment key="1">
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>,
        ],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html data-dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}>
        <Head>
          <link rel="stylesheet" href="https://cdn.eds.equinor.com/font/equinor-uprights-vf.css" />
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
          {GTM_ID && <GoogleConsentMode />}
        </Head>
        <body>
          {GTM_ID && <GoogleTagManagerBody />}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
