/**
 * More on security headers can be found at:
 * https://nextjs.org/docs/advanced-features/security-headers
 */
import { dataset } from './languages.js'

/*
//We probably need to whitelist Eds cdn too?
const ContentSecurityPolicy = `
default-src 'self' cdn.sanity.io;
img-src 'self' cdn.sanity.io;
script-src 'self';
child-src 'self';
style-src 'self';
font-src 'self';
*/

const envs = ['dev', 'preprod', 'prod']
const localUrl = process.env.NODE_ENV === 'development' ? 'localhost:3333' : ''
const globalUrl = dataset === 'global' ? 'https://equinor.sanity.studio' : ''
const secretUrl = dataset === 'secret' ? 'https://equinor-restricted.sanity.studio' : ''
const studioUrls = envs.map((env) => `https://studio-${dataset}-energyvision-${env}.radix.equinor.com/`)
const xFrameUrls = [localUrl, ...studioUrls, globalUrl, secretUrl].filter((e) => e).join(' ')

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
    //This blocks preview from working, unless we whitelist all studio urls
    key: 'X-Frame-Options',
    value: `frame-ancestors ${xFrameUrls}`,
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
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  */
]
