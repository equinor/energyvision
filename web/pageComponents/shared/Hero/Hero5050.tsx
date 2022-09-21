import { BackgroundContainer } from '@components'
import styled from 'styled-components'
import Img from 'next/image'
import { SanityImgLoader } from '../Image'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClient } from '../../../lib/sanity.server'
import { PortableTextBlock } from '@portabletext/types'
import IngressText from '../portableText/IngressText'
import TitleText from '../portableText/TitleText'
import type { ImageWithAlt } from '../../../types/types'
import { HTMLAttributes } from 'react'

export type ImagePosition = 'left' | 'right'
export type PositionProps = {
  /** Should the image be positioned to the left or the right */
  imagePosition?: ImagePosition
} & HTMLAttributes<HTMLElement>

const StyledContent = styled.div`
  display: grid;
  grid-gap: var(--space-large);
  grid-auto-columns: auto;
  align-items: center;
  align-content: start;
  padding: var(--space-xxLarge) var(--space-large);
  grid-area: content;
  /* @TODO: Revisit when we move the margins to the article layout */
  p {
    margin-bottom: 0;
  }

  @media (min-width: 750px) {
    /*  max-height: 800px; */
  }
`

export type BannerMediaProps = {
  /** If the image is of type SVG it can have a small size */
  size?: 'small' | 'full'
  /** Should the height be fixed for small screens */
  fixedHeight?: boolean
  /** If the media is smaller than the container, it can be centered with the content  */
  center?: boolean
} & HTMLAttributes<HTMLDivElement>

const StyledMedia = styled.div<BannerMediaProps>`
  grid-area: image;
  position: relative;
  /* @TODO: Discuss this image height */
  width: ${(props) => (props.size === 'small' ? '55%' : '100%')};
  ${({ size }) =>
    size &&
    size === 'small' && {
      paddingTop: 'var(--space-xxLarge)',
    }}
  ${({ fixedHeight }) =>
    fixedHeight && {
      height: '400px',
    }}
  ${({ center }) =>
    center && {
      alignSelf: 'center',
      justifySelf: 'center',
      textAlign: 'center',
    }}
    @media (min-width: 750px) {
    height: auto;
    max-height: 800px;
    padding: 0;
  }
`

const StyledBanner5050 = styled.div<PositionProps>`
  overflow-y: hidden;
  --max-content-width: 1440px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    'image'
    'content';
  max-width: var(--max-content-width);
  margin: 0 auto;
  /* Hardcoded value while waiting for the w3c proposal for environment() */
  @media (min-width: 750px) {
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: min-content;
    grid-template-areas: 'content image';
    ${({ imagePosition }) =>
      imagePosition === 'right' && {
        gridTemplateAreas: '"content image"',
      }}
  }
`
const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`

const Hide = styled.div`
  @media (max-width: 768px) {
    * {
      display: none;
    }
  }
`

const StyledDiv = styled.div`
  font-size: var(--typeScale-1);
`
type BannerProps = {
  title: PortableTextBlock[]
  subtitle: PortableTextBlock[]
  bannerIngress: PortableTextBlock[]
  image: ImageWithAlt
}

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

export const Hero5050 = ({ title, subtitle, bannerIngress, image }: BannerProps) => {
  return (
    <BackgroundContainer background="Spruce Wood">
      <StyledBanner5050 imagePosition="right">
        <StyledMedia>
          <HeroImage5050 image={image} />
        </StyledMedia>
        <StyledContent>
          {title && <StyledHeading value={title} level="h1" size="2xl" />}
          {subtitle && <TitleText value={subtitle} level="h4" />}
          <Hide> {bannerIngress && <IngressText value={bannerIngress} />}</Hide>
        </StyledContent>
      </StyledBanner5050>
    </BackgroundContainer>
  )
}
