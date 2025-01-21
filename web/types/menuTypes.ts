import { ImageWithAlt, CardData } from './index'
import { PortableTextBlock } from '@portabletext/types'

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
  featuredIngress?: PortableTextBlock[]
  featuredCTALabel?: string
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
