import { getClient } from '../../lib/sanity.server'
import { redirects, RedirectsType } from '../../lib/queries/redirects'

export const getRedirectUrl = async (slug: string, locale: string): Promise<RedirectsType> => {
  return getClient(false).fetch(redirects, { slug: slug, slugWithLocale: `/${locale}${slug}` })
}
