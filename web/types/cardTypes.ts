import {
  ImageWithAlt,
  ImageWithCaptionData,
  PortableTextBlock,
  LinkData,
  HeroTypes,
  EventDateType,
  DesignOptions,
} from './index'

export type CardTypes = 'news' | 'topics' | 'people' | 'events'

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

export type EventCardData = {
  id: string
  type: 'events'
  title: PortableTextBlock[]
  slug: string
  location?: string
  eventDate: EventDateType
  ingress?: PortableTextBlock[]
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
