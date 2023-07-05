import { TeaserImagePosition, TeaserImageSize } from '@components'
import { PortableTextBlock } from '@portabletext/types'
import {
  SanityImageCrop,
  SanityImageHotspot,
  SanityImageObject,
  SanityImageSource,
} from '@sanity/image-url/lib/types/types'

export type CaptionData = {
  attribution?: string
  caption?: string
}

export type ImageWithCaptionData = {
  _type: 'imageWithAltAndCaption'
  _key?: string
  image: ImageWithAlt
  asset: SanityImageObject
} & CaptionData

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

export type SeoData = {
  documentTitle?: string
  metaDescription?: string
  openGraphImage?: ImageWithAlt
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
  openGraphImage?: ImageWithAlt
  ingress?: PortableTextBlock[]
  heroType?: HeroTypes
}

export type MagazineCardData = {
  slug: string
  title: string | PortableTextBlock[]
  tags?: string[]
  openGraphImage?: ImageWithAlt
  heroImage?: ImageWithAlt
  heroType?: HeroTypes
  hero?: HeroType
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
  latestNews: CardData[]
}

export type PortableTextChild = {
  _key: string
  _type: string
  marks?: string[]
  text?: string
}

export type Templates = 'landingPage' | 'page' | 'news'

export enum HeroTypes {
  DEFAULT = 'default',
  FIFTY_FIFTY = 'fiftyFifty',
  FULL_WIDTH_IMAGE = 'fullWidthImage',
  LOOPING_VIDEO = 'loopingVideo',
}

export type HeroType = {
  figure?: ImageWithCaptionData
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  link?: LinkData
  type?: HeroTypes
  ratio?: string
  background?: BackgroundColours
  loopingVideo?: LoopingVideoData
  hideImageCaption?: boolean
  captionBg?: BackgroundColours
}

export type ContentType =
  | TeaserData
  | TextBlockData
  | FullWidthImageData
  | FullWidthVideoData
  | FigureData
  | TextWithIconArrayData
  | QuoteData
  | AccordionData
  | PromoTileArrayData
  | IFrameData
  | PromotionData
  | FormData
  | TableData
  | CookieDeclarationData
  | NewsListData
  | StockValuesData
  | TwitterEmbedData
  | VideoData
  | VideoPlayerData
  | VideoPlayerCarouselData

export type Breadcrumb = {
  label: string
  slug: string
  type?: string
}

export type PageSchema = {
  slug: string
  title: PortableTextBlock[]
  hero: HeroType
  template: Templates
  seoAndSome: SeoData
  content?: ContentType[]
  id: string
  type: string
  breadcrumbs: {
    enableBreadcrumbs: boolean
    useCustomBreadcrumbs: boolean
    defaultBreadcrumbs: Breadcrumb[]
    customBreadcrumbs: Breadcrumb[]
  }
}

export type TopicPageSchema = PageSchema

export type MagazinePageSchema = PageSchema & {
  magazineTags?: string[]
  footerComponent?: {
    data?: TeaserData
  }
  hideFooterComponent?: boolean
}

export type LandingPageSchema = {
  id: string
  slug: string
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  subGroups: SubMenuGroupData[]
  template: Templates
  seoAndSome: SeoData
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
  image?: ImageWithAlt
  overline?: string
  text: PortableTextBlock[]
  ingress: PortableTextBlock[]
  callToActions?: LinkData[]
  splitList?: boolean
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
  image: ImageWithCaptionData
}

export type FullWidthVideoData = {
  type: string
  id: string
  video: {
    title: string
    url: string
    thumbnail: ImageWithAlt
  }
  spacing?: boolean
  title?: PortableTextBlock[]
  action?: LinkData
  designOptions: {
    aspectRatio: FullWidthVideoRatio
    background: BackgroundColours
  }
}

export type FullWidthVideoRatio = 'fullScreen' | 'narrow' | '2:1'

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
  image?: ImageWithAlt
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  accordion: AccordionListData[]
  anchor?: string
  designOptions: DesignOptions
}

export type PromoTileData = {
  id: string
  title: PortableTextBlock[]
  image: ImageWithAlt
  action: LinkData
  designOptions: DesignOptions
  linkLabelAsTitle?: boolean
}

export type PromoTileArrayData = {
  type: string
  id: string
  group: PromoTileData[]
  useHorizontalScroll: boolean
}

export type MenuLinkData = {
  label: string
  href?: string
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
  _key?: string
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
    _type: 'tag' | 'countryTag' | 'localNewsTag' | 'magazineTag' | 'eventTag'
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
    tags?: Tag[]
    countryTags?: Tag[]
    localNewsTags?: Tag[]
    promotions: CardData[] | PeopleCardData[] | EventCardData[]
    type: PromotionType
    eventPromotionSettings?: EventPromotionSettings
  }
  useHorizontalScroll?: boolean | undefined
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
  url?: string
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
  seoAndSome: SeoData
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

export enum VideoPlayerRatios {
  '16:9' = '16:9',
  '9:16' = '9:16',
  '1:1' = '1:1',
}

export type VideoPlayerData = {
  id: string
  type: string
  video: {
    title: string
    url: string
    thumbnail: ImageWithAlt
  }
  videoControls: {
    playButton: boolean
    controls: boolean
    loop: boolean
    allowFullScreen: boolean
    autoPlay: boolean
    muted: boolean
  }
  designOptions: {
    aspectRatio: VideoPlayerRatios
    background: BackgroundColours
    height?: number
  }
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  action?: LinkData
}

export type VideoPlayerCarouselData = {
  id: string
  type: string
  items: {
    id: string
    title: PortableTextBlock[]
    video: {
      title: string
      url: string
      thumbnail: ImageWithAlt
    }
  }[]
  designOptions: {
    aspectRatio: VideoPlayerRatios
    background: BackgroundColours
  }
  title?: PortableTextBlock[]
}

export type VideoHeroData = {
  playbackId: string
  loop: boolean
  autoplay: boolean
}

export type LoopingVideoRatio = 'original' | 'narrow'

export type LoopingVideoData = {
  title: string
  thumbnail: ImageWithAlt
  url: string
  ratio: LoopingVideoRatio
}

export type ImageCarouselData = {
  type: 'imageCarousel'
  id: string
  title?: PortableTextBlock[]
  items: ImageWithCaptionData[]
  options: {
    autoplay: boolean
    delay: number
  }
  designOptions: {
    background: BackgroundColours
  }
}

export type IFrameCarouselItemData = {
  id?: string
  type?: string
  _key?: string
  title?: PortableTextBlock[]
  description?: PortableTextBlock[]
  frameTitle: string
  url: string
  cookiePolicy: CookiePolicy
  aspectRatio: string
  height?: number
}

export type IframeCarouselData = {
  type: 'iframeCarousel'
  id: string
  title?: PortableTextBlock[]
  items: IFrameCarouselItemData[]
  designOptions: {
    background: BackgroundColours
  }
}

export type ContactFormCatalogType = 'humanRightsInformationRequest' | 'loginIssues'
