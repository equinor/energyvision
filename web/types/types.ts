import { TeaserImagePosition, TeaserImageSize } from '@components'
import { PortableTextBlock } from '@portabletext/types'
import type {
  ImageWithCaptionData,
  ImageWithAlt,
  LinkData,
  LinkType,
  EventDateType,
  EventPromotionSettings,
  CardData,
  EventCardData,
  PeopleCardData,
  BackgroundColours,
  DesignOptions,
  LoopingVideoData,
  VideoPlayerData,
  VideoPlayerCarouselData,
  FullWidthVideoData,
  GridData,
  FullWidthImageData,
  FigureData,
} from './index'

export type IntlData = {
  locale: string
  defaultLocale: string
  messages: Record<string, string>
}

export type SeoData = {
  documentTitle?: string
  metaDescription?: string
  openGraphImage?: ImageWithAlt
}

export type FeaturedContentData = {
  type?: string // news, localNews, route_${locale}
  routeContentType?: 'page' | 'event'
  location?: string
  eventDate?: EventDateType
} & CardData

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
  isBigTitle?: boolean
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
  | VideoPlayerData
  | VideoPlayerCarouselData
  | GridData
  | CampaignBannerData

export type TextBlockData = {
  type: string
  id: string
  title: PortableTextBlock[]
  image?: ImageWithAlt
  overline?: string
  text: PortableTextBlock[]
  isBigText?: boolean
  useBrandTheme?: boolean
  ingress: PortableTextBlock[]
  callToActions?: LinkData[]
  splitList?: boolean
  overrideButtonStyle?: boolean
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
  isBigText?: boolean
  useResourceLinks?: boolean
  image: ImageWithAlt
  actions?: LinkData[]
  designOptions: DesignOptions & {
    imagePosition?: TeaserImagePosition
    imageSize?: TeaserImageSize
  }
}

export type TextTeaserData = {
  type: string
  id: string
  title: PortableTextBlock[]
  text: PortableTextBlock[]
  action?: LinkData
  designOptions: {
    theme: number
    titlePosition: 'left' | 'right'
  }
}

export type TableHeaderData = {
  id: string
  headerCell: PortableTextBlock[]
}

export type FigureRatio = 'original' | '16:9'

export type CellData = {
  id: string
  type: LinkType | 'richText'
  date?: Date
  number?: string
  text?: PortableTextBlock[]
} & Omit<LinkData, 'type'>

type Row = {
  id: string
  row: CellData[]
}

export type TableThemes = 'blue' | 'green' | 'grey'

export type TableData = {
  type: string
  id: string
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  tableHeaders: TableHeaderData[]
  tableRows: Row[]
  designOptions: DesignOptions & { theme: TableThemes }
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
  designOptions: DesignOptions & { imagePosition?: TeaserImagePosition }
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
  enableStructuredMarkup?: boolean
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

export type CookieType = 'none' | 'marketing' | 'statistics' | 'preferences'

export type IFrameData = {
  id?: string
  type?: string
  _key?: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  description?: PortableTextBlock[]
  transcript?: PortableTextBlock[]
  action?: LinkData
  frameTitle: string
  url: string
  cookiePolicy: CookieType[]
  designOptions: DesignOptions & {
    aspectRatio: string
    height?: number
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
  viewAllLink?: LinkData
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
  isHumanRightsRequest?: boolean
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
  designOptions: DesignOptions
}

export type TwitterEmbedData = {
  id: string
  type: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  embedType: string
  embedValue: string
  designOptions: DesignOptions
}

export type AnchorLinkData = {
  id: string
  type: string
  anchorReference: string
}

export type IFrameCarouselItemData = {
  id?: string
  type?: string
  _key?: string
  title?: PortableTextBlock[]
  description?: PortableTextBlock[]
  frameTitle: string
  url: string
  cookiePolicy: CookieType[]
  aspectRatio: string
  height?: number
  action?: LinkData
}

export type IframeCarouselData = {
  type: 'iframeCarousel'
  id: string
  title?: PortableTextBlock[]
  items: IFrameCarouselItemData[]
  designOptions: DesignOptions
}

export type ContactFormCatalogType = 'humanRightsInformationRequest' | 'loginIssues'

export type CareersContactFormCatalogType = 'suspectedRecruitmentScamRequest' | 'emergingTalentsQueries' | 'others'

export type KeyNumberItemData = {
  type: 'keyNumberItem'
  id: string
  keyNumber: number
  description?: string
  unit?: string
}
export type KeyNumbersData = {
  type: 'keyNumbers'
  id: string
  ingress?: PortableTextBlock[]
  title?: PortableTextBlock[]
  disclaimer?: PortableTextBlock[]
  items: KeyNumberItemData[]
  useHorizontalScroll: boolean
  designOptions: DesignOptions
  action?: LinkData
}

export type CampaignBannerData = {
  type: 'campaignBanner'
  id: string
  title: PortableTextBlock[]
  designOptions: DesignOptions
}

export type PodcastTeaserData = {
  id: string
  type: 'podcastTeaser'
  spotifyLink?: string
  appleLink?: string
  linkTitle?: string
  podcastName?: PortableTextBlock[]
  podcastEpisode?: PortableTextBlock[]
  image: ImageWithAlt
  designOptions: DesignOptions
}
export type AnchorLinkListData = {
  id: string
  type: 'anchorLinkList'
  title?: string
  columns?: string
  anchorList?: {
    id: string
    type: 'anchorLinkReference'
    title?: string
    anchorReference?: string
  }[]
}
export type StickyTextBlocksData = {
  type: string
  id: string
  group: {
    id: string
    title?: string
    content: PortableTextBlock[]
  }[]
  designOptions: DesignOptions
}
