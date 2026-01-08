import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageObject } from '@sanity/image-url'
import type { FullWidthVideoProps } from '@/sections/FullWidthVideo/FullWidthVideo'
import type { StockValuesProps } from '@/sections/StockValues/StockValues'
import type { TeaserData } from '@/sections/teasers/Teaser/Teaser'
import type { VideoPlayerBlockProps } from '@/sections/VideoPlayerBlock/VideoPlayerBlock'
import type { VideoPlayerCarouselData } from '@/sections/VideoPlayerCarousel/VideoPlayerCarousel'
import type { FigureData } from '../sections/Figure/Figure'
import type { FullWidthImageData } from '../sections/FullwidthImage/FullWidthImage'
import type {
  CardData,
  DesignOptions,
  EventDateType,
  GridData,
  ImageWithAlt,
  LinkData,
  LinkType,
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

export type ContentType =
  | TeaserData
  | TextBlockData
  | FullWidthImageData
  | FullWidthVideoProps
  | FigureData
  | TextWithIconArrayData
  | QuoteData
  | AccordionData
  | PromoTileArrayData
  | IFrameData
  | FormData
  | TableData
  | CookieDeclarationData
  | NewsListData
  | StockValuesProps
  | TwitterEmbedData
  | VideoPlayerCarouselData
  | VideoPlayerBlockProps
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
  designOptions: DesignOptions
}

// This type is deprecated
export type CallToActionData = {
  type: string
  id: string
  action: LinkData
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
  title?: PortableTextBlock[]
  hideTitle?: boolean
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
  designOptions: DesignOptions & { imagePosition?: 'left' | 'right' }
}

export type AccordionListData = {
  id: string
  title: string
  image?: SanityImageObject
  content: PortableTextBlock[]
  links: LinkData[]
}

export type AccordionData = {
  type: string
  id: string
  image?: ImageWithAlt
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  accordion: AccordionListData[]
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
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  hideTitle?: boolean
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

export type FooterColumns = {
  id: string
  header: string
  linkList?: FooterLinkData[]
}

export type SomeType =
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'twitter'
  | 'linkedin'

export type FooterLinkData = {
  id: string
  type: 'externalUrl'
  key: string
  someType?: SomeType
} & LinkData

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
  hideTitle?: boolean
  items: IFrameCarouselItemData[]
  designOptions: DesignOptions
}

export type ContactFormCatalogType = 'loginIssues'

export type CareersContactFormCatalogType =
  | 'suspectedRecruitmentScamRequest'
  | 'onboarding'
  | 'emergingTalentsQueries'
  | 'others'
export type PensionFormCatalogType =
  | 'pension'
  | 'travelInsurance'
  | 'otherPensionInsuranceRelated'
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
  hideTitle?: boolean
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

export type ImageForTextData = {
  type: 'imageForText'
  id: string
  image: ImageWithAlt
  content?: PortableTextBlock[]
  aspectRatio?: '16:9' | 'fullWidth'
}
