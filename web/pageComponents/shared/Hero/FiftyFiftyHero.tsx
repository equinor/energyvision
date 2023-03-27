import styled from 'styled-components'
import { default as NextLink } from 'next/link'
import Image from '../SanityImage'
import IngressText from '../portableText/IngressText'
import TitleText from '../portableText/TitleText'
import type { LinkData, HeroType } from '../../../types/types'
import { BackgroundContainer, Link, Text } from '@components'
import { getUrlFromAction } from '../../../common/helpers/getUrlFromAction'
import { Flags } from '../../../common/helpers/datasetHelpers'
import { getLocaleFromName } from '../../../lib/localization'

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
  min-height: 350px;
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

const HeroActionLink = ({ action, ...rest }: { action: LinkData }) => {
  const { label, ariaLabel, extension, type } = action
  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on Action link with type: '${type}' and label: '${label}'`)
    return null
  }
  if (action.type === 'internalUrl') {
    const linkLocale = getLocaleFromName(action.link?.lang)
    return (
      <NextLink href={url} locale={Flags.IS_DEV ? linkLocale : undefined} passHref legacyBehavior>
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

export const FiftyFiftyHero = ({ title, ingress, link, background, figure }: HeroType) => {
  return (
    <>
      <StyledHero background={background}>
        <StyledMedia>
          {figure && (
            <Image
              maxWidth={4096}
              sizes="(max-width: 800px) 100vw, 800px"
              image={figure.image}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          )}
        </StyledMedia>
        <StyledContent>
          {title && <StyledHeroTitle value={title} level="h1" size="xl" />}
          {ingress && (
            <StyledIngress>
              <IngressText
                value={ingress}
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
          {link && <HeroActionLink action={link} />}
        </StyledContent>
      </StyledHero>
    </>
  )
}
