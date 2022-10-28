import { FullImageHero } from '../../shared/Hero/FullImageHero'
import { DefaultHero } from '../../shared/Hero/DefaultHero'
import { FiftyFiftyHero } from '../../shared/Hero/FiftyFiftyHero'
import { HeroType, HeroTypes } from '../../../types/types'
import { PortableTextBlock } from '@portabletext/types'
import { VideoHero } from '../../shared/Hero/VideoHero'

type BannerProps = {
  title: PortableTextBlock[]
  hero: HeroType
}

export const SharedBanner = ({ title, hero }: BannerProps) => {
  if (hero.type === HeroTypes.FULL_WIDTH_IMAGE) {
    return <FullImageHero ratio={hero.ratio as string} figure={hero.figure} />
  } else if (hero.type === HeroTypes.FIFTY_FIFTY) {
    return (
      <FiftyFiftyHero
        figure={hero.figure}
        title={hero.title}
        link={hero.link}
        ingress={hero.ingress}
        background={hero.background}
      />
    )
  } else if (hero.type === HeroTypes.VIDEO_HERO) {
    return <VideoHero video={hero.video} />
  } else {
    return <DefaultHero title={title} image={hero.figure} />
  }
}
