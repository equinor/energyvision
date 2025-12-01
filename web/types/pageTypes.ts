import type { SanityImageSource } from '@sanity/asset-utils'
import type { Templates } from 'instantsearch.js'
import type { BreadcrumbData, HeroData } from '@/sections/Hero/HeroBlock'
import type { TeaserData } from '@/sections/teasers/Teaser/Teaser'
import type {
  CardData,
  ContactListData,
  ContentType,
  EventDateType,
  IFrameData,
  ImageWithAlt,
  ImageWithCaptionData,
  PeopleCardData,
  RelatedLinksData,
  SeoData,
  SubMenuGroupData,
} from './index'

export type PortableTextBlock = any // Adjust as per actual definition

export type ErrorPageData = {
  documentTitle?: string
  metaDescription?: string
  backgroundImage: SanityImageSource
  title?: PortableTextBlock[]
  text?: PortableTextBlock[]
}

export type PageSchema = {
  slug: string
  title: PortableTextBlock[]
  hero: HeroData
  template: Templates
  seoAndSome: SeoData
  content?: ContentType[]
  id: string
  type: string
  isCampaign?: boolean
  breadcrumbs: BreadcrumbData
}

export type TopicPageSchema = PageSchema
export type HomePageSchema = PageSchema

export type MagazinePageSchema = PageSchema & {
  magazineTags?: { id: string; title: string; key: string }[]
  tags?: string[]
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
