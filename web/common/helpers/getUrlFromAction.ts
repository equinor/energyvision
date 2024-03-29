import type { LinkData } from '../../types/types'

export const getUrlFromAction = ({ link, href = '', type, fileName, anchorReference }: LinkData): string | false => {
  if (!type && !href) return false

  const anchor = anchorReference ? `#${anchorReference}` : ''

  if (type === 'internalUrl') {
    return link?.slug + anchor || ''
  }

  if (!href) {
    console.warn('Missing external url in action:', fileName)
  }

  if (type === 'downloadableFile' && fileName) {
    const equinorHref = href.replace('cdn.sanity.io', 'cdn.equinor.com')
    return equinorHref + '?' + fileName.replace(/ /g, '-')
  }

  return href + anchor || '/'
}
