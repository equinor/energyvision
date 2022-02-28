import { Highlight } from './Highlight'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { useRouter } from 'next/router'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { StyledHitLink } from './hit/HitLink'
import HitHeading from './hit/HitHeading'
import DisplayLink from './hit/DisplayLink'

/* @TODO: Let's use the Text component if the margin is removed */
const TextSnippet = styled.p`
  margin: 0;
  font-size: var(--typeScale-0);
  line-height: var(--lineHeight-3);
  color: var(--inverted-text);
`

const StyledLink = styled.a`
  cursor: pointer;
  outline: none;
  text-decoration: none;
`

type TopicResultHit = {
  slug?: string
  type?: string // @TODO: be more specific, like "news", "page", "event"?
  title?: string
  ingress?: string
  text?: string
}

export type TopicHit = AlgoliaHit<TopicResultHit>

export type HitProps = {
  hit: TopicHit
  setIsOpen: (arg0: boolean) => void
}

const TopicHit = ({ hit, setIsOpen }: HitProps) => {
  // Shouldn't be empty string, but this is work in progress
  const { slug = '' } = hit

  const { pathname } = useRouter()
  const fullUrl = getFullUrl(pathname, slug)

  // @TODO: A more generic Hit component for more than events. Or multiple components???
  return (
    <article>
      <NextLink href={slug} passHref>
        <StyledHitLink onClick={() => setIsOpen(false)}>
          <HitHeading level="h2" size="sm" inverted>
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
      </NextLink>
    </article>
  )
}

export default TopicHit
