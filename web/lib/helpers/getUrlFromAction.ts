import { defaultLanguage } from 'languageConfig'
import type { LinkData, MenuLinkData } from '../../types/index'
import { getLocaleFromName } from 'sanity/helpers/localization'

export const getUrlFromAction = ({
  link,
  href = '',
  type,
  fileName,
  anchorReference,
}: LinkData): string | undefined => {
  if (!type && !href) return undefined

  const anchor = anchorReference ? `#${anchorReference}` : ''
  const locale = link?.lang !== defaultLanguage.name? `/${getLocaleFromName(link?.lang)}` :""

  if (type === 'internalUrl') {
    if (!link?.slug) {
      console.warn('Missing slug in action:', fileName)
    }
    return (locale+ link?.slug + anchor) || ''
  }

  if (!href && type !== 'downloadableFile') {
    console.warn('Missing external url in action:', fileName)
  }

  return href + anchor || '/'
}
