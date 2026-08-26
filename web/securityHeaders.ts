/**
 * More on security headers can be found at:
 * https://nextjs.org/docs/advanced-features/security-headers
 */

import { dataset } from './languageConfig'

//import { dataset } from '@/languageConfig'

const isProduction = process.env.NODE_ENV === 'production'

const envs = ['dev', 'preprod', 'prod', 'preprodv2']
const localUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : ''
const globalUrl = dataset === 'global' ? 'https://equinor.sanity.studio' : ''
const secretUrl =
  dataset === 'secret' ? 'https://equinor-restricted.sanity.studio' : ''
const studioUrls = envs.map(
  env =>
    `https://studio-${dataset}${env === 'preprodv2' ? `-upgrade` : ''}-equinor-web-sites-${env}.c2.radix.equinor.com`,
)
const localStudioUrl = ['http://localhost:3333']
const xFrameUrls = [
  localUrl,
  ...studioUrls,
  ...localStudioUrl,
  globalUrl,
  secretUrl,
]
  .filter(e => e)
  .join(' ')
const edsCdnUrl = 'https://cdn.eds.equinor.com'
const iframeSandboxBase = 'allow-scripts allow-same-origin'

export const iframePolicies = [
  { source: 'https://consentcdn.cookiebot.com' },
  {
    source: 'https://lt.morningstar.com',
    sandbox: `${iframeSandboxBase} allow-forms`,
  },
  {
    source: 'https://www.youtube.com',
    sandbox: `${iframeSandboxBase} allow-presentation`,
  },
  {
    source: 'https://vimeo.com',
    sandbox: `${iframeSandboxBase} allow-presentation`,
  },
  {
    source: 'https://player.vimeo.com',
    sandbox: `${iframeSandboxBase} allow-presentation`,
  },
  { source: 'https://sds-maintenance.com' },
  {
    source: 'https://tools.eurolandir.com',
    sandbox: `${iframeSandboxBase} allow-forms`,
  },
  {
    source: 'https://platform.twitter.com',
    sandbox: `${iframeSandboxBase} `,
  },
  {
    source: 'https://syndication.twitter.com',
    sandbox: `${iframeSandboxBase}`,
  },
  {
    source: 'https://vds.issgovernance.com',
    sandbox: `${iframeSandboxBase} allow-forms`,
  },
  { source: 'https://*.plaii.no' },
  {
    source: 'https://livestream.com',
    sandbox: `${iframeSandboxBase} allow-presentation`,
  },
  {
    source: 'https://*.castr.com',
    sandbox: `${iframeSandboxBase} allow-presentation`,
  },
  { source: 'https://pixel.as' },
  {
    source: 'https://www.youtube-nocookie.com',
    sandbox: `${iframeSandboxBase} allow-presentation`,
  },
  dataset === 'global-development' && { source: 'https://api.screen9.com' },
  dataset === 'global-development' && {
    source: 'https://equinor-gms1.wd3.myworkdayjobs-impl.com',
  },
  dataset === 'global-development' && {
    source: 'https://careers.peopleclick.eu.com',
  },
  { source: 'https://h61q9gi9.api.sanity.io' },
  { source: 'http://localhost:3333' },
  {
    source: 'https://eu.frcapi.com/',
    sandbox: iframeSandboxBase,
  },
  { source: 'https://edge.media-server.com/mmc/p/i2qawkz9' },
].filter((policy): policy is { source: string; sandbox?: string } =>
  Boolean(policy),
)

const iframeSrcs = iframePolicies.map(({ source }) => source).join(' ')

export const iframeSrcList = iframeSrcs.split(' ')

const blobSrcUrls = [
  'https://*.googletagmanager.com',
  'https://siteimproveanalytics.com',
  'https://*.cookiebot.com',
  'https://consentcdn.cookiebot.com',
  'https://platform.twitter.com',
  'https://cdn.syndication.twimg.com/',
  'https://www.youtube.com',
].join(' ')

const dataSrcUrls = [
  edsCdnUrl,
  'https://cdn.sanity.io',
  'https://cdn.equinor.com',
  'https://*.siteimproveanalytics.io',
  'https://*.googletagmanager.com',
  'https://platform.twitter.com',
  'https://syndication.twitter.com',
  'https://*.twimg.com',
  'https://i.ytimg.com',
  'https://*.cookiebot.com',
].join(' ')

const selfSrcUrls = [
  'cdn.sanity.io',
  'cdn.equinor.com',
  'https://bcdn.screen9.com',
  'https://qcdn.screen9.com',
  'https://h61q9gi9.api.sanity.io',
  'https://h61q9gi9.apicdn.sanity.io/',
  'https://tools.eurolandir.com',
  'https://inferred.litix.io/',
  'https://*.algolia.net',
  'https://*.algolianet.com',
  'https://*.cookiebot.com',
  'https://*.ingest.de.sentry.io',
  isProduction ? '' : 'ws:',
]
  .filter(e => e)
  .join(' ')

const ContentSecurityPolicy = `
     default-src 'self' cdn.sanity.io cdn.equinor.com;
     style-src 'report-sample' 'self' 'unsafe-inline' ${edsCdnUrl} https://platform.twitter.com https://*.twimg.com;
     script-src 'report-sample' 'unsafe-eval' 'self' 'unsafe-inline' blob: ${blobSrcUrls} ;
     img-src 'self' data: ${dataSrcUrls} ;
     connect-src 'self' ${selfSrcUrls} ;
     child-src  blob:;
     frame-src 'self' ${iframeSrcs};
     frame-ancestors ${xFrameUrls};
     font-src 'self' ${edsCdnUrl} data:;
     media-src 'self' blob: https://bcdn.screen9.com https://qcdn.screen9.com https://cdn.sanity.io/ https://cdn.equinor.com/;
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
