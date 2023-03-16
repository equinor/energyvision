import styled from 'styled-components'
import type { HeroType, ImageWithCaptionData } from 'types'
import { Flags } from '../../../common/helpers/datasetHelpers'
import useWindowSize from '../../../lib/hooks/useWindowSize'
import Image from '../Image'
import { StyledCaption } from '../image/StyledCaption'
import { Ratios } from '../SanityImage'

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
      {Flags.IS_DEV ? (
        <Image maxWidth={4096} image={figure.image} fill sizes={imageSizes} priority />
      ) : (
        <Image maxWidth={4096} image={figure.image} layout={'fill'} objectFit={'cover'} priority />
      )}
    </ImgWrapper>
  )
}

const NarrowHero = ({ figure }: FullImageHeroType) => {
  const { width } = useWindowSize()
  // 4:3 for small screens and 10:3 for large screens
  const aspectRatio = width && width < 750 ? Ratios.THREE_TO_FOUR : Ratios.THREE_TO_TEN

  return (
    <Image
      maxWidth={4096}
      aspectRatio={aspectRatio}
      image={figure.image}
      layout="responsive"
      sizes={imageSizes}
      priority
    />
  )
}

const RatioHero = ({ ratio, figure }: FullImageHeroType) => {
  return (
    <Image
      maxWidth={4096}
      aspectRatio={Number(ratio) || Ratios.ONE_TO_TWO}
      image={figure.image}
      layout="responsive"
      sizes={imageSizes}
      priority
    />
  )
}

export const FullImageHero = ({ ratio, figure, hideImageCaption }: HeroType) => {
  const getHero = () => {
    if (figure)
      switch (ratio) {
        case 'fullScreen':
          return <FullScreenHero figure={figure} />
        case 'narrow':
          return <NarrowHero figure={figure} />
        default:
          return <RatioHero figure={figure} ratio={ratio} />
      }
  }

  return (
    <>
      <div>{getHero()}</div>
      <div>
        {figure?.image?.asset && !hideImageCaption && (
          <StyledCaption attribution={figure.attribution} caption={figure.caption} />
        )}
      </div>
    </>
  )
}
