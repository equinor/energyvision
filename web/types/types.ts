import { TeaserImagePosition, TeaserImageSize } from '@components'
import { PortableTextBlock } from '@portabletext/types'
import {
  SanityImageCrop,
  SanityImageHotspot,
  SanityImageObject,
  SanityImageSource,
} from '@sanity/image-url/lib/types/types'
import { ColorKeyTokens } from '../styles/colorKeyToUtilityMap'
import { RowType } from '@sections/Grid/mapGridContent'

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
  heroImage?: ImageWithAlt
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
  enableStructuredMarkup?: boolean
}

export type EventPromotionSettings = {
  manuallySelectEvents: boolean
  promotePastEvents: boolean
  promoteSingleUpcomingEvent: boolean
  pastEventsCount?: number
  upcomingEventsCount?: number
}

export type EventCardData = {
  id: string
  type: 'events'
  title: PortableTextBlock[]
  slug: string
  location?: string
  eventDate: EventDateType
  ingress?: PortableTextBlock[]
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
  isCampaign?: boolean
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
export type ContentAlignmentTypes = 'left' | 'right' | 'center'

export type ImageBackground = {
  image: ImageWithAlt | SanityImageObject
  useAnimation?: boolean
  useLight?: boolean
  contentAlignment: ContentAlignmentTypes
}

export type BackgroundColours =
  | 'White'
  | 'Moss Green'
  | 'Moss Green Light'
  | 'Spruce Wood'
  | 'Mist Blue'
  | 'Slate Blue'
  | 'Mid Green'
  | 'Mid Yellow'
  | 'Mid Blue'
  | 'Mid Orange'
  | 'Slate Blue 95'

export type BackgroundTypes = 'backgroundColor' | 'backgroundImage'

export type DesignOptions = {
  background: {
    type?: BackgroundTypes
    backgroundColor?: BackgroundColours
    backgroundImage?: ImageBackground
    backgroundUtility?: keyof ColorKeyTokens
    dark: boolean
  }
}

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

export type FigureRatio = 'original' | '9:16'

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

export type FullWidthImageData = {
  type: string
  id: string
  image: ImageWithCaptionData
  designOptions: DesignOptions & {
    aspectRatio: number
  }
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
  designOptions: DesignOptions & {
    aspectRatio: FullWidthVideoRatio
  }
}

export type FullWidthVideoRatio = 'fullScreen' | 'narrow' | '2:1'

export type FigureData = {
  type: string
  id: string
  figure: ImageWithCaptionData
  designOptions: DesignOptions & {
    aspectRatio?: FigureRatio
  }
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

export enum VideoPlayerRatios {
  '16:9' = '16:9',
  '9:16' = '9:16',
  '1:1' = '1:1',
}

export type VideoType = {
  title: string
  url: string
  thumbnail: ImageWithAlt
}

export type VideoControlsType = {
  playButton?: boolean
  controls?: boolean
  loop?: boolean
  allowFullScreen?: boolean
  autoPlay?: boolean
  muted?: boolean
}

export type VideoDesignOptionsType = {
  aspectRatio: VideoPlayerRatios
  height?: number | string
  width?: 'normal' | 'extraWide'
  useBrandTheme?: boolean
}

export type VideoPlayerData = {
  id: string
  type: string
  video: VideoType
  videoControls: VideoControlsType
  designOptions: DesignOptions & VideoDesignOptionsType
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  action?: LinkData
  transcript?: PortableTextBlock[]
}
export type VideoPlayerCarouselItem = {
  id: string
  video: VideoType
  title?: PortableTextBlock[]
  hideVideoTitle?: boolean
  aspectRatio?: VideoPlayerRatios
}

export type VideoPlayerCarouselData = {
  id: string
  type: string
  items: VideoPlayerCarouselItem[]
  designOptions: DesignOptions & {
    aspectRatio: VideoPlayerRatios
  }
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
}

export type LoopingVideoRatio = '1:2' | 'narrow'

export type LoopingVideoData = {
  title: string
  thumbnail: ImageWithAlt
  url: string
  ratio: LoopingVideoRatio
}
export type ImageCarouselItem = {
  id: string
} & ImageWithCaptionData

export type ImageCarouselData = {
  type: 'imageCarousel'
  id: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  hideTitle?: boolean
  items: ImageCarouselItem[]
  options: {
    autoplay: boolean
    delay: number
  }
  designOptions: DesignOptions
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

export type CardsListData = {
  type: 'cardsList'
  id: string
  title?: PortableTextBlock[]
  cards?: CardListItemData[]
  designOptions: DesignOptions
}
export type CardListItemData = {
  id: string
  type: 'card'
  title?: string
  content?: PortableTextBlock[]
}

export type GridRowType = Span3 | Span2And1 | ThreeColumns

export type GridData = {
  type: 'grid'
  id: string
  gridRows?: GridRowType[]
}

export type GridContentType = FigureData | IFrameData | VideoPlayerData | GridTextBlockData | GridTeaserData

export type Span3 = {
  type: 'span3'
  id: string
  content?: GridContentType[]
}
export type Span2And1 = {
  type: 'span2and1'
  id: string
  singleColumn?: GridContentType[]
  span2?: GridContentType[]
}
export type ThreeColumns = {
  type: 'threeColumns'
  id: string
  columns?: GridContentType[]
}
type GridTextBlockContentAlignment = 'left' | 'right' | 'center' | 'bottom-left' | 'bottom-center'

export type GridTextBlockData = {
  id: string
  type: 'gridTextBlock'
  action?: LinkData
  overline?: string
  useThemedTitle?: boolean
  title?: PortableTextBlock[]
  themedTitle?: PortableTextBlock[]
  content?: PortableTextBlock[]
  contentAlignment?: GridTextBlockContentAlignment
  contentTheme?: any
  titleThemeFromLarger?: any
  theme?: any
  imageBackground?: ImageBackground
}

export type CampaignBannerData = {
  type: 'campaignBanner'
  id: string
  title: PortableTextBlock[]
  designOptions: DesignOptions
}
export type GridTeaserData = {
  type: 'gridTeaser'
  id: string
  image: ImageWithAlt
  rowType?: RowType
  useExtendedThemes?: boolean
  content?: PortableTextBlock[]
  themedContent?: PortableTextBlock[]
  themeFromLarger?: any
  quote?: string
  author?: string
  authorTitle?: string
  background?: BackgroundColours
  imagePosition?: TeaserImagePosition
  action?: LinkData
  theme?: number
}
export type ImageForTextData = {
  type: 'imageForText'
  id: string
  image: ImageWithAlt
  content?: PortableTextBlock[]
  aspectRatio?: '16:9' | 'fullWidth'
}
