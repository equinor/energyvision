import { Highlight } from './Highlight'
import { Heading, Text } from '@components'
import type { Hit as AlgoliaHit } from '@algolia/client-search'

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
  return (
    <article>
      <Heading inverted>
        <Highlight hit={hit} path="title" />
      </Heading>

      <Text inverted>
        <Highlight hit={hit} path="ingress" />
      </Text>
    </article>
  )
}

export default Hit
