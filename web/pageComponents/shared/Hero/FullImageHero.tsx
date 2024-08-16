import styled from 'styled-components'
import type { HeroType, ImageWithCaptionData } from 'types'
import { useSanityLoader } from '../../../lib/hooks/useSanityLoader'
import Image, { Ratios } from '../SanityImage'
import { StyledCaption } from '../image/StyledCaption'

const ImgWrapper = styled.div`
  height: calc(100vh - var(--topbar-height));
  position: relative;
`

type FullImageHeroType = {
  figure: ImageWithCaptionData
  ratio?: string
}

const imageSizes = '100vw'

const FullScreenHero = ({ figure }: FullImageHeroType) => {
  return (
    <ImgWrapper>
      <Image maxWidth={2560} image={figure.image} fill sizes={imageSizes} priority />
    </ImgWrapper>
  )
}

const NarrowHero = ({ figure }: FullImageHeroType) => {
  // 4:3 for small screens and 10:3 for large screens
  const desktopUrl = useSanityLoader(figure.image, 2560, Ratios.THREE_TO_TEN)

  // Using picture with mobile and dekstop source to avoid initial load layout shift between aspect ratio
  return (
    <picture>
      <source srcSet={desktopUrl.src} media="(min-width: 750px)" />
      <Image maxWidth={1024} aspectRatio={Ratios.THREE_TO_FOUR} image={figure.image} sizes={imageSizes} priority />
    </picture>
  )
}
const TallHero = ({ figure }: FullImageHeroType) => {
  return (
    <div className="relative w-full h-[53dvh] lg:h-[65dvh] 4xl:h-[67dvh]">
      <Image maxWidth={2560} fill aspectRatio={Ratios.FOUR_TO_FIVE} image={figure.image} sizes={imageSizes} priority />
    </div>
  )
}

const RatioHero = ({ ratio, figure }: FullImageHeroType) => {
  return (
    <Image
      maxWidth={2560}
      aspectRatio={Number(ratio) || Ratios.ONE_TO_TWO}
      image={figure.image}
      sizes={imageSizes}
      priority
    />
  )
}

export const FullImageHero = ({ ratio, figure, hideImageCaption, captionBg }: HeroType) => {
  const getHero = () => {
    if (figure)
      switch (ratio) {
        case 'fullScreen':
          return <FullScreenHero figure={figure} />
        case 'narrow':
          return <NarrowHero figure={figure} />
        case 'tall':
          return <TallHero figure={figure} />
        default:
          return <RatioHero figure={figure} ratio={ratio} />
      }
  }

  return (
    <>
      {getHero()}
      {figure?.image?.asset && !hideImageCaption && (
        <StyledCaption
          background={{ backgroundColor: captionBg }}
          attribution={figure.attribution}
          caption={figure.caption}
        />
      )}
    </>
  )
}
