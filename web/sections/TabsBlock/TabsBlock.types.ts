import { LinkData, ImageWithAlt } from '../../types'
import { PortableTextBlock } from '@portabletext/types'

export type TabsKeyNumber = {
  id?: string
  keyNumber?: string
  unit?: string
  description?: string
}
export type TabsKeyNumbers = {
  id?: string
  type?: 'tabsKeyNumbers'
  items?: TabsKeyNumber[]
  disclaimer: PortableTextBlock[]
}
export type TabsInfoPanel = {
  id?: string
  type?: 'tabsInfoPanel'
  image?: ImageWithAlt
  imageVariant?: 'sideImage' | 'backgroundImage'
  title: PortableTextBlock[]
  text: PortableTextBlock[]
  keyInfo?: {
    id?: string
    type?: string
    title?: string
    keyFigure?: string
    explanation?: string
  }[]
  action?: LinkData
}
export type TabItem = {
  id?: string
  type?: string
  title: PortableTextBlock[]
  panel: TabsKeyNumbers | TabsInfoPanel
}
