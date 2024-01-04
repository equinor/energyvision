import { Highlight } from './Highlight'
import styled from 'styled-components'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import getConfig from 'next/config'
import { StyledHitLink } from './hit/HitLink'
import HitHeading from './hit/HitHeading'
import DisplayLink from './hit/DisplayLink'

/* @TODO: Let's use the Text component if the margin is removed */
const TextSnippet = styled.p`
  margin: 0;
  font-size: var(--typeScale-0);
  line-height: var(--lineHeight-3);
  color: var(--color-on-background);
`

type TopicResultHit = {
  slug?: string
  type?: string // @TODO: be more specific, like "news", "page", "event"?
  title?: string
  ingress?: string
  text?: string
}

export type TopicHitType = AlgoliaHit<TopicResultHit>

export type HitProps = {
  hit: TopicHitType
}

const TopicHit = ({ hit }: HitProps) => {
  // Shouldn't be empty string, but this is work in progress
  const { slug = '' } = hit

  const { publicRuntimeConfig } = getConfig()
  const fullUrl = `${publicRuntimeConfig.domain}${slug}`
  // @TODO: A more generic Hit component for more than events. Or multiple components???
  return (
    <article>
      <StyledHitLink href={slug}>
        <HitHeading level="h2" size="sm">
          <Highlight hit={hit} attribute="pageTitle" />
        </HitHeading>
        {hit.title && (
          <TextSnippet>
            <Highlight hit={hit} attribute="title" />
          </TextSnippet>
        )}
        {hit.ingress && (
          <TextSnippet>
            <Highlight hit={hit} attribute="ingress" />
          </TextSnippet>
        )}
        {hit.text && (
          <TextSnippet>
            <Highlight hit={hit} attribute="text" />
          </TextSnippet>
        )}
        <DisplayLink>{fullUrl}</DisplayLink>
      </StyledHitLink>
    </article>
  )
}

export default TopicHit
