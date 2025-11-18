import type { DesignOptions, HeroType, ImageWithCaptionData } from '@/types'
import { Image, mapSanityImageRatio } from '../../core/Image/Image'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { resolveImage } from '@/sanity/lib/utils'

type FullImageHeroType = {
  figure: ImageWithCaptionData
  ratio?: string
}

const NarrowHero = ({ figure }: FullImageHeroType) => {
  // 4:3 for small screens and 10:3 for large screens
  const { url: desktopUrl } = resolveImage({
    image: figure.image,
    grid: 'full',
    aspectRatio: mapSanityImageRatio('10:3'),
  })

  // Using picture with mobile and dekstop source to avoid initial load layout shift between aspect ratio
  return (
    <picture>
      <source srcSet={desktopUrl} media="(min-width: 750px)" />
      <Image aspectRatio={'4:3'} image={figure.image} />
    </picture>
  )
}
const TallHero = ({ figure }: FullImageHeroType) => {
  return (
    <div className="relative h-auto w-full max-md:aspect-4/3 md:h-[53dvh] lg:h-[65dvh] 4xl:h-[67dvh]">
      <Image grid="full" fill aspectRatio={'5:4'} image={figure.image} />
    </div>
  )
}

const RatioHero = ({ figure }: FullImageHeroType) => {
  return <Image grid="full" aspectRatio={'2:1'} image={figure.image} />
}

export const FullImageHero = ({ ratio, figure, hideImageCaption, captionBg }: HeroType) => {
  const captionDesignOtions: DesignOptions = {
    background: {
      backgroundColor: captionBg,
    },
  }
  const { bg, dark } = getBgAndDarkFromBackground(captionDesignOtions)

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
        <div className={`w-full ${bg} ${dark ? 'dark' : ''}`}>
          <FigureCaption>
            {figure.caption && <div>{figure.caption}</div>}
            {figure.attribution && <div>{figure.attribution}</div>}
          </FigureCaption>
        </div>
      )}
    </>
  )
}
