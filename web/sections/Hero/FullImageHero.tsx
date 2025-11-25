'use client'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'
import { resolveImage } from '@/sanity/lib/utils'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import type { DesignOptions, HeroType, ImageWithCaptionData } from '@/types'
import { Image, mapSanityImageRatio } from '../../core/Image/Image'

type FullImageHeroType = {
  figure: ImageWithCaptionData
  ratio?: string
}

const NarrowHero = ({ figure }: FullImageHeroType) => {
  return (
    <Image
      grid='full'
      aspectRatio={'10:3'}
      className={`aspect-4/3 lg:aspect-10/3`}
      image={figure.image}
      fill
    />
  )
}
const TallHero = ({ figure }: FullImageHeroType) => {
  return (
    <div className='relative 4xl:h-[67dvh] h-auto w-full max-md:aspect-4/3 md:h-[53dvh] lg:h-[65dvh]'>
      <Image grid='full' fill aspectRatio={'5:4'} image={figure.image} />
    </div>
  )
}

const RatioHero = ({ figure }: FullImageHeroType) => {
  return <Image grid='full' aspectRatio={'2:1'} image={figure.image} />
}

export const FullImageHero = ({
  ratio,
  figure,
  hideImageCaption,
  captionBg,
}: HeroType) => {
  const captionDesignOtions: DesignOptions = {
    background: {
      backgroundColor: captionBg,
    },
  }
  console.log('ratio', ratio)
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
      {figure?.image?.asset &&
        !hideImageCaption &&
        (figure.caption || figure.attribution) && (
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
