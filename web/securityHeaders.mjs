/**
 * More on security headers can be found at:
 * https://nextjs.org/docs/advanced-features/security-headers
 */

/*
const ContentSecurityPolicy = `
  default-src 'self' cdn.sanity.io;
  img-src 'self' cdn.sanity.io;
  script-src 'self';
  child-src 'self';
  style-src 'self';
  font-src 'self';
`
*/

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
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    //https://github.com/w3c/webappsec-permissions-policy/issues/189
    key: 'Permissions-Policy',
    value:
      'accelerometer=(); camera=(); geolocation=(); gyroscope=(); magnetometer=(); microphone=(); payment=(); usb=()',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer-when-downgrade',
  },
  /*
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  */
]
