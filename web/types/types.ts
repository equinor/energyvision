// @TODO Don't know yet where to put this or how to structure it
import {
  SanityImageObject,
  SanityImageCrop,
  SanityImageHotspot,
  SanityImageSource,
} from '@sanity/image-url/lib/types/types'
// @TODO: When we port to the new library this one should be used as PortableTextBlock type
import { PortableTextBlock as SPortableTextBlock } from '@portabletext/types'
import { PortableTextEntry } from '@sanity/block-content-to-react'
import { TeaserImagePosition, TeaserImageSize } from '@components'
import type { BlockNode } from '@sanity/block-content-to-react'

export type ImageWithCaptionData = {
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: ImageWithAlt
}

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
  link?: { slug: string; type: string }
  href?: string
  extension?: string
  isStatic?: boolean
  staticUrl?: string
  fileName?: string
  anchorReference?: string
  filename?: string
}

export type RelatedLinksData = {
  title: string
  links: LinkData[]
}

export type IntlData = {
  locale: string
  defaultLocale: string
  messages: Record<string, string>
}

export type ImageWithAlt = {
  isDecorative: boolean
  alt?: string
  asset: SanityImageObject
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  _type: 'imageWithAlt'
  extension?: string
}

export type ErrorPageData = {
  documentTitle?: string
  metaDescription?: string
  backgroundImage: SanityImageSource
  title?: SPortableTextBlock[]
  text?: SPortableTextBlock[]
}
export type NewsroomData = {
  documentTitle?: string
  metaDescription?: string
  openGraphImage?: ImageWithAlt
  title?: SPortableTextBlock[]
  ingress?: SPortableTextBlock[]
}

export type CardTypes = 'news' | 'topics' | 'people' | 'events'

export type EventDateType = {
  date: string
  startTime?: string
  endTime?: string
  timezone: string
}

export type CardData = {
  type?: 'news' | 'topics' | 'localNews'
  id: string
  slug: string
  title: string | SPortableTextBlock[]
  publishDateTime?: string
  heroImage: ImageWithCaptionData
  ingress?: SPortableTextBlock[]
}

export type FeaturedContentData = {
  type?: string // news, localNews, route_${locale}
  routeContentType?: 'page' | 'event'
  location?: string
  eventDate?: EventDateType
} & CardData

export type PeopleCardData = {
  type?: 'people'
  id: string
  image?: ImageWithAlt
  name: string
  title?: string
  department?: string
  email?: string
  phone?: string
  isLink: boolean
  cv?: LinkData
}

export type EventCardData = {
  id: string
  type: 'events'
  title: SPortableTextBlock[]
  manuallySelectEvents: boolean
  slug: string
  location?: string
  eventDate: EventDateType
}

export type NewsSchema = {
  slug: string
  title: string
  documentTitle?: string
  metaDescription?: string
  openGraphImage?: ImageWithAlt
  id: string
  updatedAt: string
  publishDateTime: string
  heroImage: ImageWithCaptionData
  ingress: SPortableTextBlock[]
  content: PortableTextEntry[]
  relatedLinks: RelatedLinksData
  iframe: IFrameData
}

// From https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/field/src/types/portableText/diff/types.ts
export type PortableTextBlock = {
  _key: string
  _type: string
  children: PortableTextChild[]
  markDefs?: { _key: string; _type: string }[]
  style?: string
}

export type PortableTextChild = {
  _key: string
  _type: string
  marks?: string[]
  text?: string
}

export type Templates = 'landingPage' | 'page' | 'news'

export type PageSchema = {
  slug: string
  title: BlockNode[]
  heroImage: ImageWithCaptionData
  template: Templates
  seoAndSome: {
    documentTitle?: string
    metaDescription?: string
    openGraphImage?: ImageWithAlt
  }
  // @TODO: Better typings here
  content?: []
  id: string
  type: string
}

export type LandingPageSchema = {
  id: string
  slug: string
  title: BlockNode[]
  ingress: SPortableTextBlock[]
  subGroups: SubMenuGroupData[]
  template: Templates
  seoAndSome: {
    documentTitle?: string
    metaDescription?: string
    openGraphImage?: ImageWithAlt
  }
}

export type BackgroundColours = 'White' | 'Moss Green' | 'Moss Green Light' | 'Spruce Wood' | 'Mist Blue' | 'Slate Blue'

export type DesignOptions = {
  background?: BackgroundColours
  imagePosition?: TeaserImagePosition
  imageSize?: TeaserImageSize
}

export type TextBlockData = {
  type: string
  id: string
  title: PortableTextEntry[]
  overline?: string
  text: PortableTextEntry[]
  ingress: SPortableTextBlock[]
  callToActions?: LinkData[]
  anchor?: string
  designOptions: DesignOptions
}

// This type is deprecated
export type CallToActionData = {
  type: string
  id: string
  action: LinkData
}

export type TeaserData = {
  type: string
  id: string
  title: PortableTextEntry[]
  text: SPortableTextBlock[]
  overline?: string
  image: ImageWithAlt
  action?: LinkData
  designOptions: DesignOptions
}

export type TableHeaderData = {
  id: string
  headerCell: PortableTextEntry[]
}

export type CellData = {
  id: string
  type: string
  date?: Date
  number?: string
  text?: string
} & LinkData

export type TableData = {
  type: string
  id: string
  title: PortableTextEntry[]
  ingress: SPortableTextBlock[]
  tableHeaders: TableHeaderData[]
  tableRows: any[]
  designOptions: DesignOptions
}

export type FullWidthImageData = {
  type: string
  id: string
  image: ImageWithAlt
}

export type FigureData = {
  type: string
  id: string
  figure: ImageWithCaptionData
  designOptions: DesignOptions
}

export type TextWithIconItem = {
  id: string
  icon: ImageWithAlt
  text: SPortableTextBlock[]
  title: string
}

export type TextWithIconArrayData = {
  type: string
  id: string
  group: TextWithIconItem[]
  designOptions: DesignOptions
}

export type QuoteData = {
  type: string
  id: string
  author: string
  authorTitle?: string
  quote: string
  image?: ImageWithAlt
  designOptions: DesignOptions
}

export type AccordionListData = {
  id: string
  title: string
  content: PortableTextEntry[]
}

export type AccordionData = {
  type: string
  id: string
  title: PortableTextEntry[]
  ingress: PortableTextEntry[]
  accordion: AccordionListData[]
  anchor?: string
  designOptions: DesignOptions
}

export type PromoTileData = {
  id: string
  title: string
  image: ImageWithAlt
  action: LinkData
  designOptions: DesignOptions
}

export type PromoTileArrayData = {
  type: string
  id: string
  group: PromoTileData[]
}

export type MenuLinkData = {
  label: string
  isStatic: boolean
  href?: string
  staticUrl?: string
  id?: string
  link?: {
    type: string
    slug: string
  }
}

export type SubMenuGroupLinkData = MenuLinkData & {
  image: ImageWithAlt
}

export type SubMenuGroupData = {
  id: string
  label: string
  links: SubMenuGroupLinkData[]
}

export type SubMenuData = {
  id: string
  topLevelLink: MenuLinkData
  intro: PortableTextEntry[]
  groups: SubMenuGroupData[]
  featuredContent: CardData
}

export type MenuData = {
  subMenus: SubMenuData[]
}

export type SimpleMenuLink = {
  id?: string
  label: string
  link: {
    slug: string
    type: string
  }
}

export type SimpleGroupData = {
  id: string
  label: string
  type: 'simpleMenuGroup' | 'simpleMenuLink'
  readMoreLink?: SimpleMenuLink
  links?: SimpleMenuLink[]
  link?: {
    slug: string
    type: string
  }
}

export type SimpleMenuData = {
  groups: SimpleGroupData[]
}

export type CookiePolicy = 'none' | 'marketing' | 'statistics'

export type IFrameData = {
  id?: string
  type?: string
  title?: PortableTextEntry[]
  ingress?: SPortableTextBlock[]
  description?: PortableTextEntry[]
  action?: LinkData
  frameTitle: string
  url: string
  cookiePolicy: CookiePolicy
  designOptions: {
    aspectRatio: string
    height?: number
    background: BackgroundColours
  }
}

export type Tag = {
  key: {
    _type: 'tag' | 'countryTag'
    current: string
  }
  title: {
    [key: string]: string
  }
}

// Do we have a way to share types between studio and web?
export type PromotionType = 'promoteTopics' | 'promoteNews' | 'promotePeople' | 'promoteEvents'

export type PromotionData = {
  id: string
  type: string
  title?: PortableTextEntry[]
  ingress?: SPortableTextBlock[]
  content: {
    // Do we really need the tags here?
    tags?: Tag[]
    promotions: CardData[] | PeopleCardData[] | EventCardData[]
    type: PromotionType
  }
  designOptions?: DesignOptions
}

export type FooterColumns = {
  id: string
  header: string
  linkList?: FooterLinkData[]
}

export type SomeType = 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'linkedin'

export type FooterLinkData = {
  id: string
  type: 'someLink' | 'link'
  key: string
  label: string
  isStatic: boolean
  url?: string
  staticUrl?: string
  someType?: SomeType
  link?: {
    type: string
    slug: string
  }
}

export type ContactListData = {
  title: string
  ingress: string
  contacts?: Contacts[]
}

export type Contacts = {
  _key: string
  _type: string
  location: string
  phone: string
}

export type LoginResult = {
  apiSecret: string
  instId: string
}

export type SubscribeFormParameters = {
  firstName: string
  email: string
  crudeOilAssays?: boolean
  generalNews?: boolean
  magazineStories?: boolean
  stockMarketAnnouncements?: boolean
  languageCode: string
}

export type EventSchema = {
  id: string
  title: SPortableTextBlock[]
  slug: string
  seoAndSome: {
    documentTitle?: string
    metaDescription?: string
    openGraphImage?: ImageWithAlt
  }
  content: {
    location?: string
    eventDate: EventDateType
    ingress?: SPortableTextBlock[]
    content?: SPortableTextBlock[]
    iframe?: IFrameData
    promotedPeople?: {
      title?: PortableTextEntry[]
      people?: PeopleCardData[]
    }
    contactList?: ContactListData

    relatedLinks?: RelatedLinksData
  }
}

export type NewsDistributionParameters = {
  timeStamp: string
  title: string
  ingress: string
  link: string
  newsType: string
  languageCode: string
}

export type CookieDeclaration = {
  id?: string
  type?: string
}

export type FormData = {
  id: string
  type: string
  title?: PortableTextEntry[]
  ingress?: SPortableTextBlock[]
  form: string
  downloads: LinkData[]
}

export type NewsListData = {
  id: string
  type: string
  title?: PortableTextEntry[]
  articles: CardData[]
  tags?: [id: string]
  countryTags?: [id: string]
  localNewsTags?: [id: string]
}

export type StockValuesData = {
  id: string
  type: string
  designOptions: {
    background: BackgroundColours
  }
}
