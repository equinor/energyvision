import { useHits } from 'react-instantsearch-hooks'
import { List } from '@components'
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

const WarningText = styled.p`
  padding: var(--space-medium) 0;
`

const Hits = ({ hitComponent: Hit, setIsOpen, category = '' }: HitsProps) => {
  const { hits } = useHits()

  if (!hits || hits.length === 0) {
    const defaultMessage = category
      ? 'No results were found in {category} for your search query. Please try again.'
      : 'No results were found for your search query. Please try again.'

    return (
      <WarningText>
        <FormattedMessage
          id="search_no_results"
          defaultMessage={defaultMessage}
          values={{
            category: <FormattedMessage id={mapSearchCategoryToId(category)} defaultMessage={category} />,
          }}
        />
      </WarningText>
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
