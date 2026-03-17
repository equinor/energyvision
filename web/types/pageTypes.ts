import type { SanityImageSource } from '@sanity/asset-utils'
import type { Templates } from 'instantsearch.js'
import type { BreadcrumbData } from '@/core/Breadcrumbs/Breadcrumbs'
import type { HeroData } from '@/sections/Hero/HeroBlock'
import type { ContentType, SeoData } from './index'

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
  titleStyle: string
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
