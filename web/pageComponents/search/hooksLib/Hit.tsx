import { Highlight } from './Highlight'
import { Heading, Text } from '@components'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'

const TempLink = styled.a`
  text-decoration: none;
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
}

const Hit = ({ hit }: HitProps) => {
  // Shouldn't be empty string, but this is work in progress
  const { slug = '' } = hit

  return (
    <article>
      <NextLink href={slug} passHref>
        <TempLink>
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
