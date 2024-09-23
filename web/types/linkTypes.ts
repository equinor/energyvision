export type LinkType =
  | 'internalUrl'
  | 'externalUrl'
  | 'downloadableFile'
  | 'downloadableImage'
  | 'dateField'
  | 'textField'
  | 'numberField'
  | 'linkSelector'

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
  filename?: string
}


export type RelatedLinksData = {
  title: string
  links: LinkData[]
}
