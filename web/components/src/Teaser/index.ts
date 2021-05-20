import { Teaser as TeaserWrapper, TeaserProps, ImagePosition as TeaserImagePosition } from './Teaser'
import { Media, TeaserMediaProps } from './Media'
import { Content, TeaserContentProps } from './Content'
import { Eyebrow, TeaserEyebrowProps } from './Eyebrow'

type TeaserCompoundProps = typeof TeaserWrapper & {
  Media: typeof Media
  Content: typeof Content
  Eyebrow: typeof Eyebrow
}

const Teaser = TeaserWrapper as TeaserCompoundProps

Teaser.Media = Media
Teaser.Content = Content
Teaser.Eyebrow = Eyebrow

export { Teaser }
export type { TeaserProps, TeaserMediaProps, TeaserContentProps, TeaserEyebrowProps, TeaserImagePosition }
