import { Teaser as EnvisTeaser, BackgroundContainer } from '@components'
import styled from 'styled-components'
import IngressText from '../portableText/IngressText'
import TitleText from '../portableText/TitleText'
import type { TextTeaserData } from '../../../types/types'
import { getColorForTheme } from './theme'
import { CSSProperties } from 'react'

import { twMerge } from 'tailwind-merge'
import { ReadMoreLink } from '@core/Link'
import { getUrlFromAction } from '../../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../../lib/localization'

const { Content } = EnvisTeaser

type TitlePostion = 'left' | 'right'

type TextTeaserProps = {
  data: TextTeaserData
  anchor?: string
  className?: string
}

const IngressWrapper = styled.div`
  :not(:last-child) {
    padding-bottom: var(--space-large);
  }
`
const TitleWrapper = styled.div`
  padding: var(--space-xxLarge) var(--layout-paddingHorizontal-large) 0 var(--layout-paddingHorizontal-large);
  @media (min-width: 750px) {
    padding: var(--space-xxLarge) var(--space-large);
  }
  @media (min-width: 1000px) {
    padding: var(--space-3xLarge);
  }
`
const StyledContent = styled(Content)`
  padding: 0 var(--layout-paddingHorizontal-large) var(--space-3xLarge) var(--layout-paddingHorizontal-large);
  @media (min-width: 750px) {
    padding: var(--space-xxLarge);
  }
  @media (min-width: 1000px) {
    padding: var(--space-3xLarge);
  }
`
export const StyledTeaser = styled.article`
  overflow-y: hidden;
`

const StyledTitleText = styled(TitleText)`
  padding: 0 0 var(--space-large) 0;
  @media (min-width: 750px) {
    padding: 0;
  }
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

const TextTeaser = ({ data, anchor, className }: TextTeaserProps) => {
  const { title, text, action, designOptions } = data
  const { theme, titlePosition } = designOptions
  const { background, highlight, dark } = getColorForTheme(theme)
  const url = action && getUrlFromAction(action)

  const style = highlight ? ({ '--title-highlight-color': `${highlight} ` } as CSSProperties) : undefined
  return (
    <BackgroundContainer style={style} background={{ backgroundColor: background }} id={anchor}>
      <TeaserWrapper titlePosition={titlePosition} className={twMerge(`${dark ? 'dark' : ''}`, className)}>
        <TitleWrapper>
          <StyledTitleText value={title} size={'2xl'} />
        </TitleWrapper>
        <StyledContent>
          {text && (
            <IngressWrapper>
              <IngressText value={text} />
            </IngressWrapper>
          )}
          {action && (
            <ReadMoreLink
              href={url as string}
              {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
              type={action.type}
            >
              {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
            </ReadMoreLink>
          )}
        </StyledContent>
      </TeaserWrapper>
    </BackgroundContainer>
  )
}

export default TextTeaser
