/**
 * More on security headers can be found at:
 * https://nextjs.org/docs/advanced-features/security-headers
 */
import { dataset } from './languages.js'

const isProduction = process.env.NODE_ENV === 'production'

const envs = ['preprod', 'prod']
const localUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : ''
const globalUrl = dataset === 'global' ? 'https://equinor.sanity.studio' : ''
const secretUrl = dataset === 'secret' ? 'https://equinor-restricted.sanity.studio' : ''
const studioUrls = envs.map((env) => `https://studio-${dataset}-equinor-web-sites-${env}.c2.radix.equinor.com`)
const studioV3Url = 'http://studiov3-global-development-equinor-web-sites-dev.c2.radix.equinor.com'
const xFrameUrls = [localUrl, ...studioUrls, studioV3Url, globalUrl, secretUrl].filter((e) => e).join(' ')
const edsCdnUrl = 'https://cdn.eds.equinor.com '
const iframeSrcs = [
  'https://consentcdn.cookiebot.com',
  'https://lt.morningstar.com',
  'https://www.youtube.com',
  'https://vimeo.com',
  'https://sds-maintenance.com',
  'https://tools.eurolandir.com',
  'https://platform.twitter.com',
  'https://syndication.twitter.com',
  'https://vds.issgovernance.com',
  'https://eac.plaii.no',
  'https://livestream.com',
  dataset === 'global-development' && 'https://equinor-gms1.wd3.myworkdayjobs-impl.com',
  dataset === 'global-development' && 'https://careers.peopleclick.eu.com',
  'https://h61q9gi9.api.sanity.io',
  'http://localhost:3333',
]
  .filter((e) => e)
  .join(' ')

const ContentSecurityPolicy = `
   default-src 'self' cdn.sanity.io cdn.equinor.com;
   style-src 'report-sample' 'self' 'unsafe-inline' ${edsCdnUrl} https://platform.twitter.com https://*.twimg.com;
   script-src 'report-sample' 'unsafe-eval' 'self' 'unsafe-inline' blob: https://*.googletagmanager.com  https://siteimproveanalytics.com https://consent.cookiebot.com https://consentcdn.cookiebot.com https://platform.twitter.com https://cdn.syndication.twimg.com/ https://www.youtube.com;
   img-src 'self' data: ${edsCdnUrl} https://cdn.sanity.io https://cdn.equinor.com https://*.siteimproveanalytics.io https://*.googletagmanager.com https://platform.twitter.com https://syndication.twitter.com https://*.twimg.com https://i.ytimg.com;
   connect-src 'self' https://bcdn.screen9.com https://h61q9gi9.api.sanity.io https://tools.eurolandir.com https://inferred.litix.io/ https://*.algolia.net https://*.algolianet.com https://consentcdn.cookiebot.com https://eu-api.friendlycaptcha.eu ${
     isProduction ? '' : 'ws:'
   };
   child-src  blob:;
   frame-src 'self' ${iframeSrcs};
   frame-ancestors ${xFrameUrls};
   font-src 'self' ${edsCdnUrl} data:;
   media-src 'self' blob: https://bcdn.screen9.com https://cdn.sanity.io/ https://cdn.equinor.com/;

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
