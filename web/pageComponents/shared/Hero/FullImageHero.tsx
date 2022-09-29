import type { ImageWithCaptionData } from 'types/types'
import Img from 'next/image'
import Image, { SanityImgLoader } from '../Image'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClientWithEquinorCDN } from '../../../lib/sanity.server'
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
  padding: 0 var(--layout-paddingHorizontal-small);
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
  const imageProps = useNextSanityImage(
    sanityClientWithEquinorCDN,
    heroImage.image,
    /* { imageBuilder: customImageUrlBuilder }  */ {
      imageBuilder: (imageUrlBuilder, options) => SanityImgLoader(imageUrlBuilder, options, 1420),
    },
  )
  const altTag = heroImage?.image?.isDecorative ? '' : heroImage?.image?.alt || ''

  return (
    <>
      <ImgWrapper>
        <Img alt={altTag} layout="fill" objectFit="cover" quality={100} src={imageProps.src} />
      </ImgWrapper>
      <Caption attribution={heroImage.attribution} caption={heroImage.caption} />
    </>
  )
}

const NarrowHero = ({ heroImage }: { heroImage: ImageWithCaptionData }) => {
  const { width } = useWindowSize()
  // 4:3 for small screens and 10:3 for large screens
  const aspectRatio = width && width < 750 ? 0.75 : 0.3

  return <Image maxWidth={1420} aspectRatio={aspectRatio} image={heroImage.image} layout="responsive" priority />
}

const RatioHero = ({ ratio, heroImage }: { ratio: string; heroImage: ImageWithCaptionData }) => {
  return <Image maxWidth={1420} aspectRatio={Number(ratio)} image={heroImage.image} layout="responsive" priority />
}

export const FullImageHero = ({ ratio, heroImage, title }: Props) => {
  let Hero: JSX.Element

  const StyledCaption = heroImage?.image?.asset && (
    <CaptionWrapper>
      <Caption attribution={heroImage.attribution} caption={heroImage.caption} />
    </CaptionWrapper>
  )

  const StyledTitle = <TitleWrapper>{title && <StyledHeading value={title} level="h1" size="2xl" />}</TitleWrapper>

  if (ratio === 'fullScreen') Hero = <FullScreenHero heroImage={heroImage} />
  if (ratio === 'narrow') Hero = <NarrowHero heroImage={heroImage} />
  else Hero = <RatioHero heroImage={heroImage} ratio={ratio} />

  return (
    <>
      {Hero}
      {StyledCaption}
      {StyledTitle}
    </>
  )
}