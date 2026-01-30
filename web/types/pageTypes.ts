import type { SanityImageSource } from '@sanity/asset-utils'
import type { Templates } from 'instantsearch.js'
import type { BreadcrumbData } from '@/core/Breadcrumbs/Breadcrumbs'
import type { EventDateType } from '@/sections/cards/EventCard/EventCard'
import type { HeroData } from '@/sections/Hero/HeroBlock'
import type {
  ContactListData,
  ContentType,
  IFrameData,
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
  firstPublishedAt?: string
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

export type LandingPageSchema = {
  id: string
  slug: string
  title: PortableTextBlock[]
  ingress: PortableTextBlock[]
  subGroups: SubMenuGroupData[]
  template: Templates
  seoAndSome: SeoData
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
