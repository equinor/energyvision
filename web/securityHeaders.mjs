/**
 * More on security headers can be found at:
 * https://nextjs.org/docs/advanced-features/security-headers
 */
import { dataset } from './languages.js'

const isProduction = process.env.NODE_ENV === 'production'

const logCspReport = true

const envs = ['dev', 'preprod', 'prod']
const localUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : ''
const globalUrl = dataset === 'global' ? 'https://equinor.sanity.studio' : ''
const secretUrl = dataset === 'secret' ? 'https://equinor-restricted.sanity.studio' : ''
const studioUrls = envs.map((env) => `https://studio-${dataset}-energyvision-${env}.radix.equinor.com/`)
const xFrameUrls = [localUrl, ...studioUrls, globalUrl, secretUrl].filter((e) => e).join(' ')

const ContentSecurityPolicy = `
   default-src 'self' cdn.sanity.io;
   style-src 'report-sample' 'self' 'unsafe-inline' https://eds-static.equinor.com;
   ${
     isProduction
       ? "script-src 'report-sample' 'self' 'unsafe-inline' https://www.googletagmanager.com https://siteimproveanalytics.com https://consent.cookiebot.com https://consentcdn.cookiebot.com"
       : "script-src 'unsafe-eval' 'report-sample' 'self' 'unsafe-inline' https://www.googletagmanager.com  https://siteimproveanalytics.com https://consent.cookiebot.com https://consentcdn.cookiebot.com"
   };
   img-src 'self' data: cdn.sanity.io https://*.siteimproveanalytics.io www.googletagmanager.com;
   connect-src 'self' https://tools.eurolandir.com https://*.algolia.net https://*.algolianet.com https://consentcdn.cookiebot.com ${
     !isProduction && 'ws:'
   };
   frame-src 'self' https://consentcdn.cookiebot.com https://www.youtube.com https://vimeo.com https://sds-maintenance.com;
   frame-ancestors ${xFrameUrls};
   font-src 'self' https://eds-static.equinor.com;
   ${logCspReport ? 'report-uri /api/csp-report;' : ''}
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
  /*  {
     //This blocks preview from working, unless we whitelist all studio urls
     key: 'X-Frame-Options',
     value: 'SAMEORIGIN',
   }, */
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

  {
    // key: 'Content-Security-Policy',
    key: 'Content-Security-Policy-Report-Only',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
]
