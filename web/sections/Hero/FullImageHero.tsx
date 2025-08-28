import type { HeroType, ImageWithCaptionData } from 'types'
import { useSanityLoader } from '../../lib/hooks/useSanityLoader'
import Image, { getFullScreenSizes, mapSanityImageRatio } from '../../core/SanityImage/SanityImage'
import { BackgroundContainer } from '@/core/Backgrounds'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'

type FullImageHeroType = {
  figure: ImageWithCaptionData
  ratio?: string
}

const imageSizes = getFullScreenSizes()

const NarrowHero = ({ figure }: FullImageHeroType) => {
  // 4:3 for small screens and 10:3 for large screens
  const desktopUrl = useSanityLoader(figure.image, 2560, mapSanityImageRatio('10:3'))

  // Using picture with mobile and dekstop source to avoid initial load layout shift between aspect ratio
  return (
    <picture>
      <source srcSet={desktopUrl.src} media="(min-width: 750px)" />
      <Image maxWidth={1024} aspectRatio={'4:3'} image={figure.image} sizes={imageSizes} priority />
    </picture>
  )
}
const TallHero = ({ figure }: FullImageHeroType) => {
  return (
    <div className="relative h-[53dvh] w-full lg:h-[65dvh] 4xl:h-[67dvh]">
      <Image maxWidth={2560} fill aspectRatio={'5:4'} image={figure.image} sizes={imageSizes} priority />
    </div>
  )
}

const RatioHero = ({ figure }: FullImageHeroType) => {
  return <Image maxWidth={2560} aspectRatio={'2:1'} image={figure.image} sizes={imageSizes} priority />
}

export const FullImageHero = ({ ratio, figure, hideImageCaption, captionBg }: HeroType) => {
  const getHero = () => {
    if (figure)
      switch (ratio) {
        case 'narrow':
          return <NarrowHero figure={figure} />
        case 'tall':
          return <TallHero figure={figure} />
        default:
          return <RatioHero figure={figure} />
      }
  }

  return (
    <>
      {getHero()}
      {figure?.image?.asset && !hideImageCaption && (figure.caption || figure.attribution) && (
        <BackgroundContainer
          className={'inline-block w-full'}
          background={{ backgroundColor: captionBg }}
          backgroundStyle="none"
        >
          <FigureCaption className={'mx-auto max-w-viewport px-layout-sm pt-0 pb-8'}>
            {figure.caption && <div>{figure.caption}</div>}
            {figure.attribution && <div>{figure.attribution}</div>}
          </FigureCaption>
        </BackgroundContainer>
      )}
    </>
  )
}
