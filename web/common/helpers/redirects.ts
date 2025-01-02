import { getClient } from '../../lib/sanity.server'
import { redirects, externalRedirects, RedirectsType, ExternalRedirectsType } from '../../lib/queries/redirects'

export const getRedirectUrl = async (slug: string, locale: string): Promise<RedirectsType> => {
  return getClient(false).fetch(redirects, { slug: slug, slugWithLocale: `/${locale}${slug}` })
}

export const getExternalRedirectUrl = async (slug: string, locale: string): Promise<ExternalRedirectsType> => {
  return getClient(false).fetch(externalRedirects, { slug: slug, slugWithLocale: `/${locale}${slug}` })
}

export const getWWWRedirect = (host: string, pathname: string): string | undefined => {
  if (!host.includes("www")) {
    return `https://www.${host}${pathname}`;
  }
  return undefined;
};

export const getDnsRedirect = (host: string, pathname: string) => {
  const dns = host.replace('http://', '').replace('https://', '').replace('www.', '')

  if (dns === 'statoil.com') {
    return `https://www.equinor.com${pathname}`
  }

  if (dns === 'equinor.kr') {
    return `https://www.equinor.co.kr${pathname}`
  }

  const redirect =
    dnsRedirects.find((redirect) => redirect.from === dns + pathname) ||
    dnsRedirects.find((redirect) => redirect.from === dns)

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
]
