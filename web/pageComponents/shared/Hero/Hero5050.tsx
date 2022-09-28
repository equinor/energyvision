import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import Img from 'next/image'
import { SanityImgLoader } from '../Image'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClient } from '../../../lib/sanity.server'
import { PortableTextBlock } from '@portabletext/types'
import IngressText from '../portableText/IngressText'
import TitleText from '../portableText/TitleText'
import type { ImageWithAlt, BackgroundColours, LinkData } from '../../../types/types'
import { BackgroundContainer, Link } from '@components'
import { getUrlFromAction } from '../../../common/helpers/getUrlFromAction'

type BannerProps = {
  bannerTitle: PortableTextBlock[]
  bannerIngress: PortableTextBlock[]
  action: LinkData
  background: BackgroundColours
  image: ImageWithAlt
  title: PortableTextBlock[]
}

const StyledBanner = styled(BackgroundContainer)`
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
const HiddenIngress = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`
const StyledBannerTitle = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  font-weight: 500;
`
const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`
const TitleWrapper = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large) 0 var(--layout-paddingHorizontal-large);
`
const StyledDiv = styled.div`
  font-size: var(--typeScale-1);
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

const BannerAction = ({ action, ...rest }: { action: LinkData }) => {
  const { label, ariaLabel, extension, type } = action
  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on Action link with type: '${type}' and label: '${label}'`)
    return null
  }
  if (action.type === 'internalUrl') {
    return (
      <NextLink href={url} passHref>
        <Link variant="readMore" aria-label={ariaLabel} {...rest}>
          {action.label}
        </Link>
      </NextLink>
    )
  }
  return (
    <Link variant="readMore" href={url} type={action.type} aria-label={ariaLabel}>
      {action.label} {extension && `(${extension.toUpperCase()})`}
    </Link>
  )
}

export const Hero5050 = ({ bannerTitle, bannerIngress, action, background, image, title }: BannerProps) => {
  return (
    <>
      <StyledBanner background={background}>
        <StyledMedia>
          <HeroImage5050 image={image} />
        </StyledMedia>
        <StyledContent>
          {bannerTitle && <StyledBannerTitle value={bannerTitle} level="h1" size="xl" />}
          {bannerIngress && (
            <HiddenIngress>
              <IngressText value={bannerIngress} />
            </HiddenIngress>
          )}
          {action && <BannerAction action={action} />}
        </StyledContent>
      </StyledBanner>
      <TitleWrapper>{title && <StyledHeading value={title} level="h1" size="2xl" />}</TitleWrapper>
    </>
  )
}
