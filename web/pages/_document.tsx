/* eslint-disable */
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import Script from 'next/script'
import { ServerStyleSheet } from 'styled-components'
import { GTM_ID } from '../lib/gtm'

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
  ></script>
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
  ></script>
)

const GoogleTagManagerBody = () => (
  <noscript
    dangerouslySetInnerHTML={{
      __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    }}
  ></noscript>
)

const CookieBot = ({ locale }: { locale: string | undefined }) => (
  <Script
    src="https://consent.cookiebot.com/uc.js"
    id="Cookiebot"
    strategy="beforeInteractive"
    data-cbid="f1327b03-7951-45da-a2fd-9181babc783f"
    data-blockingmode="auto"
    data-culture={locale == 'no' ? 'nb' : locale || 'en'}
  />
)

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
    const IS_LIVE = process.env.NODE_ENV !== 'development'
    const { locale } = this.props.__NEXT_DATA__
    return (
      <Html data-dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}>
        <Head>
          {/* <link rel="stylesheet" href="https://eds-static.equinor.com/font/equinor-uprights-vf.css" /> */}
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
          {GTM_ID && (
            <>
              <GoogleConsentMode />
              <GoogleTagManagerHead />
            </>
          )}
          {IS_LIVE && <CookieBot locale={locale} />}
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
