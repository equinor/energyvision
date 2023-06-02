import { PortableTextBlock } from '@portabletext/types'
import { HeroType, HeroTypes, LoopingVideoData } from '../../../types/types'
import { DefaultHero } from '../../shared/Hero/DefaultHero'
import { FiftyFiftyHero } from '../../shared/Hero/FiftyFiftyHero'
import { FullImageHero } from '../../shared/Hero/FullImageHero'
import { LoopingVideo } from '../../shared/Hero/LoopingVideo'

type BannerProps = {
  title: PortableTextBlock[]
  hero: HeroType
  hideImageCaption?: boolean
}

export const SharedBanner = ({ title, hero, hideImageCaption }: BannerProps) => {
  switch (hero.type) {
    case HeroTypes.FULL_WIDTH_IMAGE:
      return (
        <FullImageHero
          ratio={hero.ratio as string}
          figure={hero.figure}
          hideImageCaption={hideImageCaption}
          background={hero.background}
        />
      )
    case HeroTypes.FIFTY_FIFTY:
      return (
        <FiftyFiftyHero
          figure={hero.figure}
          title={hero.title}
          link={hero.link}
          ingress={hero.ingress}
          background={hero.background}
        />
      )
    case HeroTypes.LOOPING_VIDEO:
      return <LoopingVideo video={hero.loopingVideo as LoopingVideoData} />
    default:
      return <DefaultHero title={title} image={hero.figure} />
  }
}
