import styled from 'styled-components'
import { HTMLAttributes } from 'react'
import Img from 'next/image'
import { SanityImgLoader } from '../Image'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClient } from '../../../lib/sanity.server'
import { PortableTextBlock } from '@portabletext/types'
import IngressText from '../portableText/IngressText'
import TitleText from '../portableText/TitleText'
import type { ImageWithAlt, BackgroundColours } from '../../../types/types'
import { BackgroundContainer } from '@components'

type BannerProps = {
  title: PortableTextBlock[]
  subtitle: PortableTextBlock[]
  bannerIngress: PortableTextBlock[]
  background: BackgroundColours
  image: ImageWithAlt
}
export type BackgroundProps = {
  background: BackgroundColours
} & HTMLAttributes<HTMLElement>

const StyledContent = styled.div`
  display: grid;
  grid-auto-columns: auto;
  grid-gap: var(--space-large);
  align-items: center;
  grid-area: content;
  padding: var(--space-xxLarge) var(--space-large);
`
const StyledMedia = styled.div`
  grid-area: image;
  position: relative;

  height: 400px;
  @media (min-width: 750px) {
    height: auto;
    max-height: 800px;
    padding: 0;
  }
`
const StyledBanner5050 = styled.div`
  display: grid;
  grid-template-rows: min-content min-content;
  grid-template-rows: 1fr;
  grid-template-areas:
    'image'
    'content';
  max-width: var(--max-content-width);
  margin: 0 auto;
  
  @media (min-width: 750px) {
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: min-content;
    grid-template-areas: 'content image'; 
`
const HiddenIngress = styled.div`
  @media (max-width: 768px) {
    * {
      display: none;
    }
  }
`
const StyledDiv = styled.div`
  font-size: var(--typeScale-1);
`
const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  font-weight: 500;
`

const HeroImage5050 = ({ image }: { image: ImageWithAlt }) => {
  const imageProps = useNextSanityImage(
    sanityClient,
    image,
    /* { imageBuilder: customImageUrlBuilder }  */ {
      imageBuilder: (imageUrlBuilder, options) => SanityImgLoader(imageUrlBuilder, options, 1420),
    },
  )

  const altTag = image?.isDecorative ? '' : image?.alt || ''

  return (
    <StyledDiv>
      <Img
        alt={altTag}
        layout="fill"
        unoptimized
        objectFit="cover"
        quality={100}
        src={imageProps.src}
        role={image?.isDecorative ? 'presentation' : undefined}
      />
    </StyledDiv>
  )
}

export const Hero5050 = ({ title, subtitle, bannerIngress, background, image }: BannerProps) => {
  console.log(background)
  return (
    <BackgroundContainer background={background}>
      <StyledBanner5050>
        <StyledMedia>
          <HeroImage5050 image={image} />
        </StyledMedia>
        <StyledContent>
          {title && <StyledHeading value={title} level="h1" size="xl" />}
          {subtitle && <TitleText value={subtitle} level="h3" size="lg" />}
          <HiddenIngress> {bannerIngress && <IngressText value={bannerIngress} />}</HiddenIngress>
        </StyledContent>
      </StyledBanner5050>
    </BackgroundContainer>
  )
}
