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
  disclaimer?: PortableTextBlock[]
}
export type InfoPanelKeyInfo = {
  id?: string
  type?: string
  title?: string
  keyFigure?: string
  explanation?: string
}
export type InfoPanelImageVariant = 'sideImage' | 'backgroundImage'

export type TabsInfoPanel = {
  id?: string
  type?: 'tabsInfoPanel'
  image?: ImageWithAlt
  imageVariant?: InfoPanelImageVariant
  title: PortableTextBlock[]
  text: PortableTextBlock[]
  keyInfo?: InfoPanelKeyInfo[]
  action?: LinkData
}
export type TabItem = {
  id: string
  type?: string
  title: string
  panel: TabsKeyNumbers | TabsInfoPanel
}
