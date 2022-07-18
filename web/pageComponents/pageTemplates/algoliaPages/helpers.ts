import { getFullUrl } from '../../../common/helpers/getFullUrl'
import type { NextRouter } from 'next/router'

export const getUrl = (router: NextRouter, slug: string | undefined) => {
  if (!router || !slug) return undefined

  const { pathname, locale } = router
  return getFullUrl(pathname, slug, locale)
}
