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
  'aria-label'?: string
  link?: { slug: string; type: string; lang: string }
  href?: string
  extension?: string
  fileName?: string
  anchorReference?: string
  filename?: string
  someType?: any
  file?: any
}

export type RelatedLinksData = {
  title: string
  links: LinkData[]
}

export type AnchorLinkReference = {
  id: string
  type: 'anchorLinkReference'
  title?: string
  anchorReference?: string
}
