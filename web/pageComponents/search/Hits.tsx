import { useHits } from 'react-instantsearch-hooks-web'
import { List, Heading } from '@components'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import type { HitProps } from './EventHit'

const { Item } = List

type HitsProps = {
  // Let's consider to create a compound component instead of this Algolia example way of doing it
  hitComponent: React.FC<HitProps>
  category?: string
}

const HitItem = styled(Item)`
  &:after {
    content: '';
    height: 1px;
    width: 100%;
    border-bottom: 1px solid var(--grey-20);
    /* Doesn't work in FF https://bugzilla.mozilla.org/show_bug.cgi?id=1481307 */
    transform: scaleY(0.5);
    position: absolute;
    border-radius: 0.01px;
  }
`

const HitsContainer = styled.div`
  position: relative;
`

const UppercaseHeading = styled(Heading)`
  text-transform: uppercase;
`

const WarningContainer = styled.div`
  padding: var(--space-xxLarge) 0;
`

const WarningText = styled.p``

const Hits = ({ hitComponent: Hit }: HitsProps) => {
  const { hits } = useHits()

  if (!hits || hits.length === 0) {
    return (
      <WarningContainer>
        <UppercaseHeading level="h2" size="sm" inverted>
          <FormattedMessage id="search_no_results_heading" defaultMessage="Nothing found" />
        </UppercaseHeading>
        <WarningText>
          <FormattedMessage
            id="search_no_results_generic"
            defaultMessage="Sorry, no results were found. Please try again with some different keywords."
          />
        </WarningText>
      </WarningContainer>
    )
  }

  return (
    <HitsContainer>
      <List variant="numbered" unstyled>
        {hits.map((hit) => (
          <HitItem key={hit.objectID}>
            <Hit hit={hit} />
          </HitItem>
        ))}
      </List>
    </HitsContainer>
  )
}

export default Hits
