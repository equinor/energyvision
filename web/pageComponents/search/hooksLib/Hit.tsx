import { Highlight } from './Highlight'
import { Heading, Text } from '@components'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import type { Hit as AlgoliaHit } from '@algolia/client-search'

const TempLink = styled.a`
  text-decoration: none;
  display: block;
  border: 2px solid transparent;
  &:hover {
    border-color: var(--energy-red-90);
  }
`

type SearchResultHit = {
  ingress: string
  slug: string
  title: string
  type: string // @TODO: be more specific, like "news", "page", "event"?
}

export type Hit = AlgoliaHit<SearchResultHit>

type HitProps = {
  hit: Hit
  setIsOpen: (arg0: boolean) => void
}

const Hit = ({ hit, setIsOpen }: HitProps) => {
  // Shouldn't be empty string, but this is work in progress
  const { slug = '' } = hit

  return (
    <article>
      <NextLink href={slug} passHref>
        <TempLink onClick={() => setIsOpen(false)}>
          <Heading inverted>
            <Highlight hit={hit} path="title" />
          </Heading>

          <Text inverted>
            <Highlight hit={hit} path="ingress" />
          </Text>
        </TempLink>
      </NextLink>
    </article>
  )
}

export default Hit
