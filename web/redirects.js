import { createClient } from '@sanity/client'
import { sanityConfig } from './sanityServerClient.js'
import { dataset, languages, defaultLanguage } from './languages.js'

/**
 * @param {string} name
 * @returns string
 */
export const getLocaleFromName = (name) => {
  return languages.find((lang) => lang.name === name)?.locale || defaultLanguage.locale
}

const externalRedirectGroq = /* groq */ `
*[_type == "externalRedirect" && !(_id in path('drafts.**'))]{
  from,
  to
}
`

const redirectsGroq = /* groq */ `
*[_type == "redirect" && !(_id in path('drafts.**'))]{
  "lang": _lang,
  from,
  "to": to->slug.current
}
`

const getExternalRedirects = async () => {
  const result = await createClient(sanityConfig).fetch(externalRedirectGroq)
  const externalRedirects = result
    .filter((e) => e)
    .map((externalRedirect) => {
      return {
        source: externalRedirect.from,
        permanent: true,
        destination: externalRedirect.to,
      }
    })
  return [
    ...externalRedirects,
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
    // redirects for /50 site
    ['global', 'global-development', 'global-test'].includes(dataset) && {
      source: '/50/en/:slug*',
      destination: '/magazine',
      permanent: true,
    },
    ['global', 'global-development', 'global-test'].includes(dataset) && {
      source: '/50/:slug*',
      destination: '/no/magasin',
      permanent: true,
    },
  ]
}

const getInternalRedirects = async () => {
  const result = await createClient(sanityConfig).fetch(redirectsGroq)
  const redirects = result
    .filter((e) => e)
    .map((redirect) => {
      const to = redirect.to === '/' ? '' : redirect.to
      const locale = '/' + getLocaleFromName(redirect.lang)
      const nextRedirect = {
        source: redirect.from,
        destination: `${locale}${to}`,
        permanent: true,
      }
      return redirect.from.startsWith(locale) ? { ...nextRedirect, locale: false } : nextRedirect
    })

  return [...redirects]
}

export const getAllRedirects = async () => {
  const result = await Promise.all([getExternalRedirects(), getInternalRedirects()])
  return result.flat()
}
