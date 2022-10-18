import type { ImageWithCaptionData } from 'types/types'
import Image from '../Image'
import styled from 'styled-components'
import useWindowSize from '../../../lib/hooks/useWindowSize'
import { Caption } from './Caption'
import { PortableTextBlock } from '@portabletext/types'
import TitleText from '../portableText/TitleText'

type Props = {
  ratio: string
  heroImage: ImageWithCaptionData
  title: PortableTextBlock[]
}

const ImgWrapper = styled.div`
  height: calc(100vh - var(--topbar-height));
  position: relative;
`

const CaptionWrapper = styled.div`
  margin: 0 auto;
  padding: 0 var(--layout-paddingHorizontal-small);
  max-width: var(--maxViewportWidth);
`

const TitleWrapper = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large) 0 var(--layout-paddingHorizontal-large);
`

const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const FullScreenHero = ({ heroImage }: { heroImage: ImageWithCaptionData }) => {
  return (
    <ImgWrapper>
      <Image maxWidth={4096} image={heroImage?.image} layout={'fill'} objectFit={'cover'} priority />
    </ImgWrapper>
  )
}

const NarrowHero = ({ heroImage }: { heroImage: ImageWithCaptionData }) => {
  const { width } = useWindowSize()
  // 4:3 for small screens and 10:3 for large screens
  const aspectRatio = width && width < 750 ? 0.75 : 0.3

  return (
    <Image
      maxWidth={4000}
      aspectRatio={aspectRatio}
      image={heroImage.image}
      layout="responsive"
      sizes="100vw"
      priority
    />
  )
}

const RatioHero = ({ ratio, heroImage }: { ratio: string; heroImage: ImageWithCaptionData }) => {
  return <Image maxWidth={1420} aspectRatio={Number(ratio)} image={heroImage.image} layout="responsive" priority />
}

export const FullImageHero = ({ ratio, heroImage, title }: Props) => {
  const StyledCaption = heroImage?.image?.asset && (
    <CaptionWrapper>
      <Caption attribution={heroImage.attribution} caption={heroImage.caption} />
    </CaptionWrapper>
  )
  const StyledTitle = <TitleWrapper>{title && <StyledHeading value={title} level="h1" size="2xl" />}</TitleWrapper>

  const getHero = () => {
    switch (ratio) {
      case 'fullScreen':
        return <FullScreenHero heroImage={heroImage} />
      case 'narrow':
        return <NarrowHero heroImage={heroImage} />
      default:
        return <RatioHero heroImage={heroImage} ratio={ratio} />
    }
  }

  return (
    <>
      {getHero()}
      {StyledCaption}
      {StyledTitle}
    </>
  )
}
