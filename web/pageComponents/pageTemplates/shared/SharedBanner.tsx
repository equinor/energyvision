import type { PortableTextBlock } from '@portabletext/types'
import { DefaultHero } from '@sections/Hero/DefaultHero'
import { FiftyFiftyHero } from '@sections/Hero/FiftyFiftyHero'
import { FullImageHero } from '@sections/Hero/FullImageHero'
import { LoopingVideo, type LoopingVideoData } from '@sections/Hero/LoopingVideo'
import { TextOnBackgroundImageHero } from '@sections/Hero/TextOnBackgroundImageHero'
import { type BackgroundColours, type HeroType, HeroTypes } from '../../../types/index'

type BannerProps = {
  title: PortableTextBlock[]
  hero: HeroType
  hideImageCaption?: boolean
  captionBg?: BackgroundColours
  /* Magazine */
  tags?: string[]
  publishedDate?: string | undefined
}

export const SharedBanner = ({ title, hero, hideImageCaption, captionBg, tags, publishedDate }: BannerProps) => {
  console.log('hero', hero)
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
    case HeroTypes.BACKGROUND_IMAGE:
      //@ts-ignore: types
      return <TextOnBackgroundImageHero {...hero} title={title} />
    default:
      return (
        <DefaultHero
          title={title}
          image={hero?.figure}
          isBigTitle={hero?.isBigTitle}
          bigTitle={hero?.title}
          tags={tags}
          publishedDate={publishedDate}
        />
      )
  }
}
