import fs from 'node:fs'
//import '@dotenvx/dotenvx/config' // uncomment to use this in local
import { nextSanityClient } from '../lib/interface/client.server.js'
import { getLanguages } from '../../satellitesConfig.js'

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('Missing env SANITY_API_TOKEN')
  process.exit(1)
}
if (!dataset) {
  console.error('Missing env NEXT_PUBLIC_SANITY_DATASET')
  process.exit(1)
}

const getExternalRedirects = async () => {
  const result = await nextSanityClient.fetch(`*[_type == "externalRedirect"]{from,to}`)
  const externalRedirects = result
    .filter((e) => e.from && e.to)
    .map((externalRedirect) => {
      return {
        source: externalRedirect.from,
        permanent: true,
        destination: externalRedirect.to,
      }
    })
  const redirects = [
    // Redirect IE users to not-supported page
    {
      source: '/',
      has: [
        {
          type: 'header',
          key: 'user-agent',
          value: '.*(MSIE|Trident).*',
        },
      ],
      permanent: true,
      destination: '/not-supported.html',
    },
    ...externalRedirects,
  ]
  if (dataset && ['global', 'global-development', 'global-test'].includes(dataset)) {
    const fiftySiteRedirects = [
      {
        source: '/50/en/:slug*',
        destination: '/magazine',
        permanent: true,
      },
      {
        source: '/50/:slug*',
        destination: '/no/magasin',
        permanent: true,
      },
    ]
    redirects.concat(fiftySiteRedirects)
  }
  return redirects.filter((e) => e)
}

export const getInternalRedirects = async () => {
  const result = await nextSanityClient.fetch(`*[_type == "redirect"]{
  lang,
  from,
  "to": to->slug.current
}`)

  const redirects = result
    .filter((e) => e.from && e.to)
    .map((redirect) => {
      const locale = getLanguages(dataset).find((lang) => lang.name === redirect.lang)?.locale
      const fromIsLocale = redirect.from.startsWith(`/${locale}`)
      const to = redirect.to === '/' ? '' : redirect.to
      const des = `${locale !== 'en' ? `/${locale}` : ''}${to}`

      return {
        source: redirect.from,
        destination: des,
        permanent: true,
        ...(fromIsLocale && {
          locale: false,
        }),
      }
    })
  return [...redirects]
}

export const getAllRedirects = async () => {
  const result = await Promise.all([getExternalRedirects(), getInternalRedirects()])

  return result.flat()
}

getAllRedirects()
  .then((redirects) => {
    const jsonFile = JSON.stringify(redirects)
    return fs.writeFileSync('./lib/interface/redirects.json', jsonFile)
  })
  .catch((e) => {
    console.error('Failed generating redirects')
    console.error(e)
  })
