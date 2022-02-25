import { useHits } from 'react-instantsearch-hooks'
import { List, Heading } from '@components'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import type { HitProps } from './EventHit'

const mapSearchCategoryToId = (category: string): string => {
  // @TODO: update IDs when they get added for tabs
  switch (category.toLowerCase()) {
    case 'topic':
      return 'search_category_topic'
    case 'event':
      return 'search_category_event'
    default:
      return 'search_results'
  }
}

const { Item } = List

type HitsProps = {
  // Let's consider to create a compound component instead of this Algolia example way of doing it
  hitComponent: React.FC<HitProps>
  setIsOpen: (arg0: boolean) => void
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

const Hits = ({ hitComponent: Hit, setIsOpen, category = '' }: HitsProps) => {
  const { hits } = useHits()

  if (!hits || hits.length === 0) {
    const defaultMessage = category
      ? 'Sorry, no results were found in {category}. Please try again with some different keywords.'
      : 'Sorry, no results were found. Please try again with some different keywords.'

    const messageId = !category || category === 'all' ? 'search_no_results_generic' : 'search_no_results_category'

    return (
      <WarningContainer>
        <UppercaseHeading level="h2" size="sm" inverted>
          <FormattedMessage id="search_no_results_heading" defaultMessage="NOTHING FOUND" />
        </UppercaseHeading>
        <WarningText>
          <FormattedMessage
            id={messageId}
            defaultMessage={defaultMessage}
            values={{
              category: <FormattedMessage id={mapSearchCategoryToId(category)} defaultMessage={category} />,
            }}
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
            <Hit setIsOpen={setIsOpen} hit={hit} />
          </HitItem>
        ))}
      </List>
    </HitsContainer>
  )
}

export default Hits
