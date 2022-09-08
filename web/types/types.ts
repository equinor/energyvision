// @TODO Don't know yet where to put this or how to structure it
import {
  SanityImageObject,
  SanityImageCrop,
  SanityImageHotspot,
  SanityImageSource,
} from '@sanity/image-url/lib/types/types'
import { PortableTextBlock } from '@portabletext/types'
import { TeaserImagePosition, TeaserImageSize } from '@components'

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
  title?: PortableTextBlock[]
  text?: PortableTextBlock[]
}

export type CardTypes = 'news' | 'topics' | 'people' | 'events'

export type EventDateType = {
  date: string
  startTime?: string
  endTime?: string
  timezone: string
}

export type CardData = {
  type?: 'news' | 'topics' | 'localNews' | 'magazine'
  id: string
  slug: string
  title: string | PortableTextBlock[]
  publishDateTime?: string
  heroImage: ImageWithCaptionData
  ingress?: PortableTextBlock[]
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

export type EventPromotionSettings = {
  manuallySelectEvents: boolean
  promotePastEvents: boolean
  pastEventsCount?: number
}

export type EventCardData = {
  id: string
  type: 'events'
  title: PortableTextBlock[]
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
  ingress: PortableTextBlock[]
  content: PortableTextBlock[]
  relatedLinks: RelatedLinksData
  iframe: IFrameData
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
  title: PortableTextBlock[]
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
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
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
  title: PortableTextBlock[]
  overline?: string
  text: PortableTextBlock[]
  ingress: PortableTextBlock[]
  callToActions?: LinkData[]
  overrideButtonStyle?: boolean
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
  title: PortableTextBlock[]
  text: PortableTextBlock[]
  overline?: string
  image: ImageWithAlt
  action?: LinkData
  designOptions: DesignOptions
}

export type TableHeaderData = {
  id: string
  headerCell: PortableTextBlock[]
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
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
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
  text: PortableTextBlock[]
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
  content: PortableTextBlock[]
}

export type AccordionData = {
  type: string
  id: string
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
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
  isStatic?: boolean
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
  intro: PortableTextBlock[]
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
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  description?: PortableTextBlock[]
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
export type PromotionType = 'promoteTopics' | 'promoteNews' | 'promotePeople' | 'promoteEvents' | 'promoteMagazine'

export type PromotionData = {
  id: string
  type: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  content: {
    // Do we really need the tags here?
    tags?: Tag[]
    promotions: CardData[] | PeopleCardData[] | EventCardData[]
    type: PromotionType
    eventPromotionSettings?: EventPromotionSettings
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
  isStatic?: boolean
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
  title: PortableTextBlock[]
  slug: string
  seoAndSome: {
    documentTitle?: string
    metaDescription?: string
    openGraphImage?: ImageWithAlt
  }
  content: {
    location?: string
    eventDate: EventDateType
    ingress?: PortableTextBlock[]
    content?: PortableTextBlock[]
    iframe?: IFrameData
    promotedPeople?: {
      title?: PortableTextBlock[]
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

export type CookieDeclarationData = {
  id: string
  type: string
  title?: PortableTextBlock[]
}

export type FormData = {
  id: string
  type: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  form: string
  downloads: LinkData[]
}

export type NewsListData = {
  id: string
  type: string
  title?: PortableTextBlock[]
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

export type TwitterEmbedData = {
  id: string
  type: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  embedType: string
  embedValue: string
  designOptions: {
    background: BackgroundColours
  }
}

export type AnchorLinkData = {
  id: string
  type: string
  anchorReference: string
}

export type VideoData = {
  id: string
  type: string
  videoURL: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  asset: {
    playbackId: string
  }
  designOptions: {
    background: BackgroundColours
  }
}
