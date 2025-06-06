import { Page } from '../../../common'
import { ImageWithAltAndCaption } from '../types'

export type SharedNewsFields = Page & {
  title: string
  ingress: string
  // ISO 8601
  publishDateTime?: string
  blocks: {
    blockKey: string
    children: {
      childKey: string
      text: string
    }[]
  }[]
  factboxes: {
    blockKey: string
    title: string
    text: string
  }[]
  _id: string
  heroImage?: ImageWithAltAndCaption
}
