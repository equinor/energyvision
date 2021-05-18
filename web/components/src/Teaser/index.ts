import { Teaser as TeaserWrapper, TeaserProps } from './Teaser'

type TeaserCompoundProps = typeof TeaserWrapper

const Teaser = TeaserWrapper as TeaserCompoundProps

export { Teaser }
export type { TeaserProps }
