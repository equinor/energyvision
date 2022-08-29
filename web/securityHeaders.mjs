/**
 * More on security headers can be found at:
 * https://nextjs.org/docs/advanced-features/security-headers
 */
import { dataset } from './languages.js'

const isProduction = process.env.NODE_ENV === 'production'

const envs = ['dev', 'preprod', 'prod', 'test']
const localUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : ''
const globalUrl = dataset === 'global' ? 'https://equinor.sanity.studio' : ''
const secretUrl = dataset === 'secret' ? 'https://equinor-restricted.sanity.studio' : ''
const studioUrlsOldCluster = envs.map((env) => `https://studio-${dataset}-energyvision-${env}.radix.equinor.com/`)
const studioUrls = envs.map((env) => `https://studio-${dataset}-equinor-web-sites-${env}.c2.radix.equinor.com/`)
const xFrameUrls = [localUrl, ...studioUrlsOldCluster, ...studioUrls, globalUrl, secretUrl].filter((e) => e).join(' ')

const ContentSecurityPolicy = `
   default-src 'self' cdn.sanity.io;
   style-src 'report-sample' 'self' 'unsafe-inline' https://eds-static.equinor.com https://platform.twitter.com https://*.twimg.com;
   script-src 'report-sample' 'unsafe-eval' 'self' 'unsafe-inline' blob: https://*.googletagmanager.com  https://siteimproveanalytics.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://platform.twitter.com https://cdn.syndication.twimg.com/
   img-src 'self' data: cdn.sanity.io https://*.siteimproveanalytics.io https://*.googletagmanager.com https://platform.twitter.com https://syndication.twitter.com https://*.twimg.com;
   connect-src 'self' https://tools.eurolandir.com https://*.algolia.net https://*.algolianet.com https://consentcdn.cookiebot.com https://eu-api.friendlycaptcha.eu  https://*.mux.com ${
     isProduction ? '' : 'ws:'
   };
   child-src  blob:;
   frame-src 'self' https://consentcdn.cookiebot.com https://lt.morningstar.com https://www.youtube.com https://vimeo.com https://sds-maintenance.com https://tools.eurolandir.com https://platform.twitter.com https://syndication.twitter.com;
   frame-ancestors ${xFrameUrls};
   font-src 'self' https://eds-static.equinor.com;
   media-src 'self' blob: https://stream.mux.com/;

 `

export const UnsafeContentSecurityPolicy = `
 default-src * data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval';
 script-src * data: blob: 'unsafe-inline' 'unsafe-eval';
 connect-src * data: blob: 'unsafe-inline';
 img-src * data: blob: 'unsafe-inline';
 frame-src * data: blob: ;
 style-src * data: blob: 'unsafe-inline';
 font-src * data: blob: 'unsafe-inline';
 frame-ancestors * data: blob:;
`

export default [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    //https://github.com/w3c/webappsec-permissions-policy/issues/189
    key: 'Permissions-Policy',
    value:
      'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  /*
  {
    key: 'Content-Security-Policy-Report-Only',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  */
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
]
