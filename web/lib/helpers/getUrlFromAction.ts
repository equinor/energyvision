import { defaultLanguage } from '@/languageConfig'
import {
  getLocaleFromIso,
  getLocaleFromName,
} from '@/sanity/helpers/localization'
import type { LinkData, MenuLinkData, SimpleMenuLink } from '../../types/index'

export const getUrlFromAction = ({
  link,
  href = '',
  type,
  fileName,
  anchorReference,
}: LinkData): string | undefined => {
  if (!type && !href) return undefined

  const anchor = anchorReference ? `#${anchorReference}` : ''
  const locale =
    link?.lang !== defaultLanguage.name
      ? `/${getLocaleFromName(link?.lang)}`
      : ''

  if (type === 'internalUrl') {
    if (!link?.slug) {
      console.warn('Missing slug in action:', fileName)
    }
    return locale + link?.slug + anchor || ''
  }

  if (!href && type !== 'downloadableFile') {
    console.warn('Missing external url in action:', fileName)
  }

  return href + anchor || '/'
}

export const getMenuLink = (
  menuLinkData: MenuLinkData | SimpleMenuLink,
  iso: string,
) => {
  // Fallback to home page, if this happens it is an error somewhere
  // Sanity should take care of the validation here, and this is temp. until
  // the static pages are migrated
  if (!menuLinkData) return 'something-wrong'
  // manually setting lang here.. as menu links only allow same language links..
  const locale = iso !== defaultLanguage.iso ? `/${getLocaleFromIso(iso)}` : ''
  return locale + menuLinkData.link?.slug || ''
}
