import { BackgroundColours, HeroType, HeroTypes, LoopingVideoData } from '@/types'
import { PortableTextBlock } from '@portabletext/types'
import { FullImageHero } from '@/sections/Hero/FullImageHero'
import { FiftyFiftyHero } from '@/sections/Hero/FiftyFiftyHero'
import { LoopingVideo } from '@/sections/Hero/LoopingVideo'
import { DefaultHero } from '@/sections/Hero/DefaultHero'

type BannerProps = {
  title: PortableTextBlock[]
  hero: HeroType
  hideImageCaption?: boolean
  captionBg?: BackgroundColours
  /* Magazine */
  tags?: string[]
}

export const SharedBanner = ({ title, hero, hideImageCaption, captionBg, tags }: BannerProps) => {
  switch (hero?.type) {
    case HeroTypes.FULL_WIDTH_IMAGE:
      return (
        <FullImageHero
          ratio={hero.ratio as string}
          figure={hero.figure}
          hideImageCaption={hideImageCaption}
          background={hero.background}
          captionBg={captionBg}
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
          isBigTitle={hero.isBigTitle}
        />
      )
    case HeroTypes.LOOPING_VIDEO:
      return <LoopingVideo video={hero.loopingVideo as LoopingVideoData} />
    default:
      return (
        <DefaultHero
          title={title}
          image={hero?.figure}
          isBigTitle={hero?.isBigTitle}
          bigTitle={hero?.title}
          tags={tags}
        />
      )
  }
}
