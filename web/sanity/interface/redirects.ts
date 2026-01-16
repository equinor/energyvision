// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

//import { ConfigRedirect } from '@/next.config'
import { dataset } from '../../languageConfig'
import { getLocaleFromName } from '../helpers/localization'
import { notSecuredTokenClient } from '../lib/client'

/* export const getAllRedirects = async () => {
  try {
    const results = await client.fetch(
      groq`*[_type == "externalRedirect" || _type == "redirect"]{
      "lang": lang,
      from,
      "to": select(_type == "externalRedirect" => to, to->slug.current)
      }`,
    )
    return {
      isSuccess: true,
      data: results,
    }
  } catch (error) {
    console.log('Error when fetching redirects from Sanity', error)
    return {
      isError: true,
      data: [],
    }
  }
} */

const getExternalRedirects = async () => {
  const result = await notSecuredTokenClient.fetch(
    `*[_type == "externalRedirect"]{from,to}`,
  )
  const externalRedirects = result
    .filter(e => e)
    .map(externalRedirect => {
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
  if (
    dataset &&
    ['global', 'global-development', 'global-test'].includes(dataset)
  ) {
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
  return redirects.filter(e => e)
}

export const getInternalRedirects = async () => {
  const result = await notSecuredTokenClient.fetch(`*[_type == "redirect"]{
  lang,
  from,
  "to": to->slug.current
}`)
  const redirects = result
    .filter(e => e)
    .map(redirect => {
      const to = redirect.to === '/' ? '' : redirect.to
      const locale = getLocaleFromName(redirect.lang)
      const des = `${locale !== 'en' ? `/${locale}` : ''}${to}`

      const nextRedirect = {
        source: redirect.from,
        destination: des,
        permanent: true,
      }
      return redirect.from.startsWith(locale)
        ? { ...nextRedirect, locale: false }
        : nextRedirect
    })
  return [...redirects]
}

export const getAllRedirects = async () => {
  const result = await Promise.all([
    getExternalRedirects(),
    getInternalRedirects(),
  ])

  return result.flat()
}

export const getWWWRedirect = (host, pathname) => {
  if (!host.includes('www')) {
    return `https://www.${host}${pathname}`
  }
  return undefined
}

export const getDnsRedirect = (host, pathname) => {
  const dns = host
    .replace('http://', '')
    .replace('https://', '')
    .replace('www.', '')

  if (dns === 'statoil.com') {
    return `https://www.equinor.com${pathname}`
  }

  if (dns === 'equinor.kr') {
    return `https://www.equinor.co.kr${pathname}`
  }

  if (dns === 'sponsorship.equinor.com') {
    return `https://communicationtoolbox.equinor.com/point/en/sponsor/`
  }

  const redirect =
    dnsRedirects.find(redirect => redirect.from === dns + pathname) ||
    dnsRedirects.find(redirect => redirect.from === dns)

  return redirect && `https://www.equinor.com${redirect.to}`
}

const dnsRedirects = [
  {
    from: 'equinor.co.uk/mariner',
    to: '/en/energy/mariner',
  },
  {
    from: 'equinor.co.uk',
    to: '/en/where-we-are/united-kingdom',
  },
  {
    from: 'equinorpensjon.no',
    to: '/no/om-oss/equinor-pensjon',
  },
  {
    from: 'statoilpensjon.no',
    to: '/no/om-oss/equinor-pensjon',
  },
  {
    from: 'equinor.co.tz',
    to: '/en/where-we-are/tanzania',
  },
  {
    from: 'statoil.co.tz',
    to: '/en/where-we-are/tanzania',
  },
  {
    from: 'equinor.no',
    to: '/no',
  },
  {
    from: 'equinorventures.com',
    to: '/en/energy/ventures',
  },
  {
    from: 'h2hsaltend.co.uk',
    to: '/en/energy/h2h-saltend',
  },
  {
    from: 'equinor.ca',
    to: '/en/where-we-are/canada',
  },
  {
    from: 'techstars.equinor.com',
    to: '/en/energy/techstars',
  },
  {
    from: 'equinor.com.au',
    to: '/en/where-we-are/australia',
  },
  {
    from: 'digitalfieldworker.equinor.com',
    to: '/energy/digitalfieldworker',
  },
  {
    from: 'eu2nsea.com',
    to: '/energy/eu2nsea',
  },
  {
    from: 'eu2nsea.eu',
    to: '/energy/eu2nsea',
  },
  {
    from: 'morgendagenshelter.no',
    to: '/no/om-oss/sponsing-og-stotte',
  },
   {
    from: "data.equinor.com",
    to:"/energy/data-sharing"
  }
]
