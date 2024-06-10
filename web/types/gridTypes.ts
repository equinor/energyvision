import {
  ImageWithAlt,
  BackgroundColours,
  LinkData,
  FigureData,
  IFrameData,
  VideoPlayerData,
  ContentAlignmentTypes,
} from './index'
import { TeaserImagePosition } from '@components/Teaser'
import { PortableTextBlock } from '@portabletext/types'
import { RowType } from '@sections/Grid/mapGridContent'

export type GridTeaserData = {
  type: 'gridTeaser'
  id: string
  image: ImageWithAlt
  rowType?: RowType
  content?: PortableTextBlock
  quote?: string
  author?: string
  authorTitle?: string
  background?: BackgroundColours
  imagePosition?: TeaserImagePosition
  action?: LinkData
  theme?: number
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

export type GridTextBlockData = {
  id: string
  type: 'gridTextBlock'
  action?: LinkData
  content?: PortableTextBlock[]
  textAlignment?: ContentAlignmentTypes
  theme?: number
}
