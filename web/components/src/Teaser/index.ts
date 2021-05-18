import { Teaser as TeaserWrapper, TeaserProps } from './Teaser'
import { Media, TeaserMediaProps } from './Media'

type TeaserCompoundProps = typeof TeaserWrapper & {
  Media: typeof Media
}

const Teaser = TeaserWrapper as TeaserCompoundProps

Teaser.Media = Media

export { Teaser }
export type { TeaserProps, TeaserMediaProps }
