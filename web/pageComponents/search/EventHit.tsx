import { Highlight } from './Highlight'
import { default as NextLink } from 'next/link'
import styled from 'styled-components'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { FormattedDate } from '@components'
import { useRouter } from 'next/router'
import { getFullUrl } from '../../common/helpers/getFullUrl'
import { StyledHitLink } from './hit/HitLink'
import DisplayLink from './hit/DisplayLink'
import HitHeading from './hit/HitHeading'

/* @TODO: Let's use the Text component if the margin is removed */
const TextSnippet = styled.p`
  margin: 0;
  font-size: var(--typeScale-0);
  line-height: var(--lineHeight-3);
  color: var(--inverted-text);
`

const StyledFormattedDate = styled(FormattedDate)`
  font-size: var(--typeScale-0);
  letter-spacing: 1px;
  display: block;
`

type EventResultHit = {
  ingress?: string
  slug?: string
  title?: string
  eventDescription?: string
  eventDate?: string
  type?: string // @TODO: be more specific, like "news", "page", "event"?
}

export type EventHitType = AlgoliaHit<EventResultHit>

export type HitProps = {
  hit: EventHitType
}

const EventHit = ({ hit }: HitProps) => {
  // Shouldn't be empty string, but this is work in progress
  const { slug = '', eventDate } = hit

  const { pathname } = useRouter()
  const fullUrl = getFullUrl(pathname, slug)

  // @TODO: A more generic Hit component for more than events. Or multiple components???
  return (
    <article>
      <NextLink href={slug} passHref>
        <StyledHitLink>
          {eventDate && <StyledFormattedDate datetime={eventDate} uppercase></StyledFormattedDate>}
          <HitHeading level="h2" size="sm" inverted>
            <Highlight hit={hit} attribute="title" />
          </HitHeading>
          <TextSnippet>
            <Highlight hit={hit} attribute="ingress" />
          </TextSnippet>
          <TextSnippet>
            <Highlight hit={hit} attribute="eventDescription" />
          </TextSnippet>
          <DisplayLink>{fullUrl}</DisplayLink>
        </StyledHitLink>
      </NextLink>
    </article>
  )
}

export default EventHit
