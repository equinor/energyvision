import { Highlight } from './Highlight'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { Heading, Text, FormattedDate } from '@components'

const TempLink = styled.a`
  text-decoration: none;
  display: block;
  border: 2px solid transparent;
  color: var(--inverted-text);
  &:hover {
    border-color: var(--energy-red-90);
  }
`

type SearchResultHit = {
  ingress: string
  slug: string
  title: string
  eventDescription: string
  type: string // @TODO: be more specific, like "news", "page", "event"?
  eventDate: string
}

export type Hit = AlgoliaHit<SearchResultHit>

type HitProps = {
  hit: Hit
  setIsOpen: (arg0: boolean) => void
}

const Hit = ({ hit, setIsOpen }: HitProps) => {
  // Shouldn't be empty string, but this is work in progress
  const { slug = '', eventDate } = hit

  return (
    <article>
      <NextLink href={slug} passHref>
        <TempLink onClick={() => setIsOpen(false)}>
          <Heading inverted>
            <Highlight hit={hit} attribute="title" />
          </Heading>
          {eventDate && <FormattedDate datetime={eventDate}></FormattedDate>}
          <Text inverted>
            <Highlight hit={hit} attribute="ingress" />
          </Text>
          <Text inverted>
            <Highlight hit={hit} attribute="eventDescription" />
          </Text>
        </TempLink>
      </NextLink>
    </article>
  )
}

export default Hit
