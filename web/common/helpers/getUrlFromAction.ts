import type { LinkData } from '../../types/index'

export const getUrlFromAction = ({
  link,
  href = '',
  type,
  fileName,
  anchorReference,
}: LinkData): string | undefined => {
  if (!type && !href) return undefined

  const anchor = anchorReference ? `#${anchorReference}` : ''

  if (type === 'internalUrl') {
    if (!link?.slug) {
      console.warn('Missing slug in action:', fileName)
    }
    return link?.slug + anchor || ''
  }

  if (!href && !(type === 'downloadableFile' || type === 'downloadableImage')) {
    console.warn('Missing external url in action:', fileName)
  }

  return href + anchor || '/'
}
