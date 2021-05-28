import {
  Teaser as TeaserWrapper,
  StyledTeaser,
  TeaserProps,
  ImagePosition as TeaserImagePosition,
  ImageSize as TeaserImageSize,
} from './Teaser'
import { Media, TeaserMediaProps } from './Media'
import { Content, TeaserContentProps } from './Content'

type TeaserCompoundProps = typeof TeaserWrapper & {
  Media: typeof Media
  Content: typeof Content
}

const Teaser = TeaserWrapper as TeaserCompoundProps

Teaser.Media = Media
Teaser.Content = Content

export { Teaser, StyledTeaser }
export type { TeaserProps, TeaserMediaProps, TeaserContentProps, TeaserImagePosition, TeaserImageSize }
