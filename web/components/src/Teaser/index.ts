import { Teaser as TeaserWrapper, TeaserProps } from './Teaser'
import { Media, TeaserMediaProps } from './Media'
import { Content, TeaserContentProps } from './Content'

type TeaserCompoundProps = typeof TeaserWrapper & {
  Media: typeof Media
  Content: typeof Content
}

const Teaser = TeaserWrapper as TeaserCompoundProps

Teaser.Media = Media
Teaser.Content = Content

export { Teaser }
export type { TeaserProps, TeaserMediaProps, TeaserContentProps }
