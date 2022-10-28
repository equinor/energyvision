import Image from '../Image'
import styled from 'styled-components'
import useWindowSize from '../../../lib/hooks/useWindowSize'
import { Caption } from './Caption'
import type { HeroType, ImageWithCaptionData } from 'types'

const ImgWrapper = styled.div`
  height: calc(100vh - var(--topbar-height));
  position: relative;
`

const CaptionWrapper = styled.div`
  margin: 0 auto;
  padding: 0 var(--layout-paddingHorizontal-small);
  max-width: var(--maxViewportWidth);
`

type FullImageHeroType = {
  figure: ImageWithCaptionData
  ratio?: string
}

const FullScreenHero = ({ figure }: FullImageHeroType) => {
  return (
    <ImgWrapper>
      <Image maxWidth={4096} image={figure.image} layout={'fill'} objectFit={'cover'} priority />
    </ImgWrapper>
  )
}

const NarrowHero = ({ figure }: FullImageHeroType) => {
  const { width } = useWindowSize()
  // 4:3 for small screens and 10:3 for large screens
  const aspectRatio = width && width < 750 ? 0.75 : 0.3

  return (
    <Image maxWidth={4000} aspectRatio={aspectRatio} image={figure.image} layout="responsive" sizes="100vw" priority />
  )
}

const RatioHero = ({ ratio, figure }: FullImageHeroType) => {
  return <Image maxWidth={1420} aspectRatio={Number(ratio) || 0.5} image={figure.image} layout="responsive" priority />
}

export const FullImageHero = ({ ratio, figure }: HeroType) => {
  const StyledCaption = figure?.image?.asset && (
    <CaptionWrapper>
      <Caption attribution={figure.attribution} caption={figure.caption} />
    </CaptionWrapper>
  )

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
      {getHero()}
      {StyledCaption}
    </>
  )
}
