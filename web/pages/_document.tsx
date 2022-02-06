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
      'data-dynamic-typography-version': 'v1' | 'v2'
      'data-eds-flexible-height'?: Boolean
      'data-dataset'?: String
    }

    const featureFlags: FeatureFlagsProps = {
      'data-dynamic-typography-version': process.env.NEXT_PUBLIC_VNYS_717_IMPROVED_TYPOGRAPHY === 'true' ? 'v2' : 'v1',
      'data-dataset': process.env.NEXT_PUBLIC_SANITY_DATASET,
    }

    if (process.env.NEXT_PUBLIC_VNYS_653_EDS_FLEXIBLE_HEIGHT === 'true') {
      featureFlags['data-eds-flexible-height'] = true
    }

    const linkList: Array<{ title: string; url: URL }> = []

    if (process.env.NEXT_PUBLIC_VNYS_717_IMPROVED_TYPOGRAPHY === 'true' && !!process.env.NEXT_PUBLIC_LOCALHOST) {
      linkList.push(
        ...[
          {
            title: 'Natural Gas',
            url: new URL(`${process.env.NEXT_PUBLIC_LOCALHOST}/energy/natural-gas`),
          },
          {
            title: 'Renewables and low carbon',
            url: new URL(`${process.env.NEXT_PUBLIC_LOCALHOST}/energy/renewables-and-low-carbon`),
          },
          {
            title: 'Sustainability',
            url: new URL(`${process.env.NEXT_PUBLIC_LOCALHOST}/sustainability`),
          },
          {
            title: 'Our Approach',
            url: new URL(`${process.env.NEXT_PUBLIC_LOCALHOST}/sustainability/our-approach`),
          },
          {
            title: 'Professionals',
            url: new URL(`${process.env.NEXT_PUBLIC_LOCALHOST}/careers/professionals`),
          },
          {
            title: 'Typography',
            url: new URL(`${process.env.NEXT_PUBLIC_LOCALHOST}/typography`),
          },
          {
            title: 'News',
            url: new URL(
              `${process.env.NEXT_PUBLIC_LOCALHOST}/news/20210323-hywind-scotland-uk-best-performing-offshore-wind-farm`,
            ),
          },
        ],
      )
    }

    return (
      <Html {...featureFlags}>
        <Head>
          {/* <link rel="stylesheet" href="https://eds-static.equinor.com/font/equinor-uprights-vf.css" /> */}
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        </Head>
        <body>
          {process.env.NEXT_PUBLIC_VNYS_717_IMPROVED_TYPOGRAPHY === 'true' && (
            <ul
              style={{
                position: 'fixed',
                top: '0',
                display: 'flex',
                listStyleType: 'none',
                gap: '1em',
                zIndex: '11',
                margin: '0',
                padding: '.2em 1em',
                background: 'silver',
                fontSize: '0.875rem',
                width: '100vw',
              }}
            >
              {linkList.map(({ title, url }) => (
                <li key={url.href}>
                  <a style={{ textDecoration: 'none', color: '#333' }} href={url.href}>
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
