import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from '@/core/Image/Image'
import type { LinkData } from './index'

export type ImageWithLinkOrOverlay = {
  id: string
  type: 'imageWithLinkOrOverlay'
  image: Image
  action?: LinkData
  captionTitle?: PortableTextBlock[]
  captionText?: PortableTextBlock[]
}

/* export type ImageCarouselData = {
  type: 'imageCarousel'
  id: string
  title?: PortableTextBlock[]
  ingress?: PortableTextBlock[]
  hideTitle?: boolean
  items: ImageCarouselItem[]
  options: {
    autoplay?: boolean
    delay?: number
  }
  designOptions: DesignOptions
}
 */
