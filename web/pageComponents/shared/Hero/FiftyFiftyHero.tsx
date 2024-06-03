import styled from 'styled-components'
import Image from '../SanityImage'
import TitleText from '../portableText/TitleText'
import type { HeroType } from '../../../types/types'
import { BackgroundContainer } from '@components'
import { ReadMoreLink } from '@core/Link'
import Blocks from '../portableText/Blocks'
import { getUrlFromAction } from '../../../common/helpers'
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
const StyledHeroTitle = styled(TitleText).attrs((props: { $isBigTitle: boolean }) => props)`
  max-width: 1186px; /* 1920 - (2 * 367) */
  font-weight: ${(props) => (props.$isBigTitle ? 'var(--fontWeight-regular)' : 'var(--fontWeight-medium)')};
`

export const FiftyFiftyHero = ({ title, ingress, link: action, background, figure, isBigTitle }: HeroType) => {
  const url = action && getUrlFromAction(action)
  return (
    <>
      <StyledHero background={{ backgroundColor: background }}>
        <StyledMedia>
          {figure && (
            <Image maxWidth={4096} sizes="(max-width: 800px) 100vw, 800px" image={figure.image} fill priority />
          )}
        </StyledMedia>
        <StyledContent>
          {title && (
            <StyledHeroTitle $isBigTitle={isBigTitle} value={title} level="h1" size={isBigTitle ? '2xl' : 'xl'} />
          )}
          {ingress && !isBigTitle && (
            <StyledIngress>
              <Blocks value={ingress} />
            </StyledIngress>
          )}
          {action && !isBigTitle && (
            <ReadMoreLink
              href={url as string}
              {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
              type={action.type}
            >
              {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
            </ReadMoreLink>
          )}
        </StyledContent>
      </StyledHero>
    </>
  )
}
