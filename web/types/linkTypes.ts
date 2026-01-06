import type { ResourceLinkProps } from '@core/Link'
import type { AnchorLinkReference } from '../types'

export type LinkType =
  | 'internalUrl'
  | 'externalUrl'
  | 'downloadableFile'
  | 'downloadableImage'
  | 'dateField'
  | 'textField'
  | 'numberField'
  | 'linkSelector'
  | 'anchorLink'
  | 'icsLink'

export type LinkData = {
  type?: LinkType
  id?: string
  label: string
  ariaLabel?: string
  link?: { slug: string; type: string; lang: string }
  href?: string
  extension?: string
  fileName?: string
  anchorReference?: string
  file?: any
}

export type RelatedLinksData = {
  title: string
  links: LinkData[]
}

export type StickyMenuLinkType = AnchorLinkReference | ResourceLinkProps
