import { getClient } from '../../lib/sanity.server'
import { redirects, RedirectsType } from '../../lib/queries/redirects'

export const getRedirectUrl = async (slug: string, locale: string): Promise<RedirectsType> => {
  return getClient(false).fetch(redirects, { slug: slug, slugWithLocale: `/${locale}${slug}` })
}

export const getDnsRedirect = (host: string, pathname: string) => {
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
      from: 'statoil.com',
      to: '/en',
    },
    {
      from: 'equinorventures.com',
      to: '/en/energy/ventures',
    },
    {
      from: 'h2hsaltend.co.uk',
      to: '/en/energy/h2h-saltend',
    },
  ]

  const dns = host.replace('http://', '').replace('https://', '').replace('www.', '')

  const redirect =
    dnsRedirects.find((redirect) => redirect.from === dns + pathname) ||
    dnsRedirects.find((redirect) => redirect.from === dns)

  return redirect && `https://www.equinor.com${redirect.to}`
}
