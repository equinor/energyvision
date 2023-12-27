import { Teaser as EnvisTeaser, Link, BackgroundContainer } from '@components'
import styled from 'styled-components'
import IngressText from './portableText/IngressText'
import TitleText from './portableText/TitleText'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'

import type { TextTeaserData, LinkData } from '../../types/types'
import { getLocaleFromName } from '../../lib/localization'

const { Content } = EnvisTeaser

type TitlePostion = 'left' | 'right' | undefined

type TextTeaserProps = {
  data: TextTeaserData
  anchor?: string
}

const StyledTeaserTitle = styled(TitleText)`
  padding-bottom: var(--space-large);
`
const TitleWrapper = styled.div`
  @media (min-width: 750px) {
    padding: var(--space-xxLarge) var(--space-large);
  }
  @media (min-width: 1000px) {
    padding: var(--space-3xLarge);
  }
  padding: var(--space-xxLarge) var(--space-large) 0 var(--space-large);
`
const StyledContent = styled(Content)`
  @media (min-width: 1000px) {
    padding: var(--space-3xLarge);
  }
`
export const StyledTeaser = styled.article`
  overflow-y: hidden;
`
const StyledLink = styled(Link)`
  font-size: var(--typeScale-2);
`
const TeaserWrapper = styled.div<{ titlePosition: TitlePostion }>`
  --max-content-width: 1440px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    'title'
    'content';
  max-width: var(--max-content-width);
  margin: 0 auto;
  /* Hardcoded value while waiting for the w3c proposal for environment() */
  @media (min-width: 750px) {
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: min-content;
    grid-template-areas: 'title content';
    ${({ titlePosition }) =>
      titlePosition === 'right' && {
        gridTemplateAreas: '"content title"',
      }}
  }
`

const TeaserAction = ({ action }: { action: LinkData }) => {
  const { type, label, extension } = action
  const url = getUrlFromAction(action)
  if (!url) {
    console.warn(`Missing URL on 'TeaserAction' link with type: '${type}' and label: '${label}'`)
    return null
  }

  if (action.type === 'internalUrl') {
    const locale = getLocaleFromName(action.link?.lang)
    return (
      <StyledLink href={url} locale={locale} variant="readMore" aria-label={action.ariaLabel}>
        {action.label}
      </StyledLink>
    )
  }

  return (
    <StyledLink variant="readMore" href={url} type={action.type} aria-label={action.ariaLabel}>
      {action.label} {extension && `(${extension.toUpperCase()})`}
    </StyledLink>
  )
}

const TextTeaser = ({ data, anchor }: TextTeaserProps) => {
  const { title, text, action, designOptions } = data
  const { background, titlePosition } = designOptions

  if ([title, text, action].every((i) => !i)) {
    return null
  }

  return (
    <BackgroundContainer background={background} id={anchor}>
      <TeaserWrapper titlePosition={titlePosition}>
        <TitleWrapper>
          <StyledTeaserTitle value={title} size={'2xl'} />
        </TitleWrapper>
        <StyledContent>
          {text && <IngressText value={text} />}
          {action && <TeaserAction action={action} />}
        </StyledContent>
      </TeaserWrapper>
    </BackgroundContainer>
  )
}

export default TextTeaser
