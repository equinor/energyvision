import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import Img from 'next/image'
import { SanityImgLoader } from '../Image'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClientWithEquinorCDN } from '../../../lib/sanity.server'
import { PortableTextBlock } from '@portabletext/types'
import IngressText from '../portableText/IngressText'
import TitleText from '../portableText/TitleText'
import type { ImageWithAlt, BackgroundColours, LinkData } from '../../../types/types'
import { BackgroundContainer, Link, Text } from '@components'
import { getUrlFromAction } from '../../../common/helpers/getUrlFromAction'

type HeroProps = {
  heroTitle: PortableTextBlock[]
  heroIngress: PortableTextBlock[]
  heroLink: LinkData
  background: BackgroundColours
  image: ImageWithAlt
  title: PortableTextBlock[]
}

const StyledHero = styled(BackgroundContainer)`
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
  }
`
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: var(--space-large);
  padding: var(--space-3xLarge) var(--layout-paddingHorizontal-small);
  max-width: calc(var(--maxViewportWidth) / 2);

  @media (min-width: 750px) {
    padding-left: var(--space-xxLarge);
    padding-right: var(--space-xxLarge);
    min-height: 450px;
    justify-self: end;
  }

  @media (min-width: 1000px) {
    padding-left: var(--layout-paddingHorizontal-small);
    padding-right: var(--space-4xLarge);
  }
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
const StyledIngress = styled.div`
  @media (max-width: 750px) {
    display: none;
  }
`
const StyledHeroTitle = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  font-weight: var(--fontWeight-medium);
`
const StyledHeading = styled(TitleText)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  margin-left: auto;
  margin-right: auto;
`
const TitleWrapper = styled.div`
  padding: var(--space-xLarge) var(--layout-paddingHorizontal-large) 0 var(--layout-paddingHorizontal-large);
`

const HeroImage = ({ image }: { image: ImageWithAlt }) => {
  const imageProps = useNextSanityImage(
    sanityClientWithEquinorCDN,
    image,
    /* { imageBuilder: customImageUrlBuilder }  */ {
      imageBuilder: (imageUrlBuilder, options) => SanityImgLoader(imageUrlBuilder, options, 1420),
    },
  )

  const altTag = image?.isDecorative ? '' : image?.alt || ''

  return (
    <Img
      alt={altTag}
      layout="fill"
      unoptimized
      objectFit="cover"
      quality={100}
      src={imageProps.src}
      role={image?.isDecorative ? 'presentation' : undefined}
    />
  )
}

const HeroActionLink = ({ action, ...rest }: { action: LinkData }) => {
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
    <Link variant="regular" href={url} type={action.type} aria-label={ariaLabel}>
      {action.label} {extension && `(${extension.toUpperCase()})`}
    </Link>
  )
}

export const FiftyFiftyHero = ({ heroTitle, heroIngress, heroLink, background, image, title }: HeroProps) => {
  return (
    <>
      <StyledHero background={background}>
        <StyledMedia>
          <HeroImage image={image} />
        </StyledMedia>
        <StyledContent>
          {heroTitle && <StyledHeroTitle value={heroTitle} level="h1" size="xl" />}
          {heroIngress && (
            <StyledIngress>
              <IngressText
                value={heroIngress}
                components={{
                  block: {
                    normal: ({ children }) => {
                      // eslint-disable-next-line
                      // @ts-ignore: Still struggling with the types here :/
                      return <Text size="regular">{children}</Text>
                    },
                  },
                }}
              />
            </StyledIngress>
          )}
          {heroLink && <HeroActionLink action={heroLink} />}
        </StyledContent>
      </StyledHero>
      <TitleWrapper>{title && <StyledHeading value={title} level="h1" size="2xl" />}</TitleWrapper>
    </>
  )
}