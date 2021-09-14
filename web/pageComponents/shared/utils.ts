import type { LinkData } from '../../types/types'

export const getUrlFromAction = ({ link, href, type }: LinkData): string => {
  if (type === 'internalUrl') {
    // Will there be more cases in the future?
    if (link?.type === 'news') return `/news/${link?.slug}`

    return link?.slug || ''
  }

  return href || ''
}
