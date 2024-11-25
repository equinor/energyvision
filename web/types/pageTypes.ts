import {
  ImageWithAlt,
  ImageWithCaptionData,
  RelatedLinksData,
  CardData,
  EventDateType,
  ContactListData,
  PeopleCardData,
  SeoData,
  HeroType,
  ContentType,
  TeaserData,
  SubMenuGroupData,
  IFrameData,
} from './index'
import { SanityImageSource } from '@sanity/asset-utils'
import { Templates } from 'instantsearch.js'

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

export type Breadcrumb = {
  label: string
  slug: string
  type?: string
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
