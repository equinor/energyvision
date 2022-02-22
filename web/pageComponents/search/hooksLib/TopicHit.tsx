import { Highlight } from './Highlight'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { Heading } from '@components'
import { useRouter } from 'next/router'
import { getFullUrl } from '../../../common/helpers/getFullUrl'

const TempLink = styled.a`
  padding: var(--space-medium) 0;
  text-decoration: none;
  display: block;
  border: 2px solid transparent;
  color: var(--inverted-text);
  &:hover {
    border-color: var(--energy-red-90);
  }
`

const DisplayLink = styled.p`
  color: var(--mist-blue-100);
  font-size: var(--typeScale-0);
  margin: var(--space-xSmall) 0 var(--space-medium) 0;
`

/* @TODO: Let's use the Text component if the margin is removed */
const TextSnippet = styled.p`
  margin: 0;
  font-size: var(--typeScale-0);
  line-height: var(--lineHeight-3);
  color: var(--inverted-text);
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
        <TempLink onClick={() => setIsOpen(false)}>
          <Heading level="h2" size="sm" inverted>
            <Highlight hit={hit} attribute="title" />
          </Heading>
          <TextSnippet>
            <Highlight hit={hit} attribute="ingress" />
          </TextSnippet>
          <TextSnippet>
            <Highlight hit={hit} attribute="text" />
          </TextSnippet>
          <DisplayLink>{fullUrl}</DisplayLink>
        </TempLink>
      </NextLink>
    </article>
  )
}

export default TopicHit
