import { useHits } from 'react-instantsearch'
import { List, Heading } from '@components'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { HitData } from './UniversalHit'

const { Item } = List

export type HitProps = { hit: AlgoliaHit<HitData> }

type HitsProps = {
  hitComponent: React.FC<{ hit: AlgoliaHit<HitData> }>
}

const HitItem = styled(Item)`
  &:after {
    content: '';
    height: 1px;
    width: 100%;
    border-bottom: 1px solid var(--grey-20);
    transform: scaleY(0.5);
    position: absolute;
    border-radius: 0.01px;
  }
`

const WarningText = styled.p``

const Hits = ({ hitComponent: Hit }: HitsProps) => {
  const { hits } = useHits()
  if (!hits || hits.length === 0) {
    return (
      <div className="py-15 px-0">
        <Heading className="uppercase" level="h2" size="sm">
          <FormattedMessage id="search_no_results_heading" defaultMessage="Nothing found" />
        </Heading>
        <WarningText>
          <FormattedMessage
            id="search_no_results_generic"
            defaultMessage="Sorry, no results were found. Please try again with some different keywords."
          />
        </WarningText>
      </div>
    )
  }

  return (
    <div className="relative">
      <List variant="numbered" unstyled>
        {hits.map((hit) => (
          <HitItem key={hit.objectID}>
            <Hit hit={hit} />
          </HitItem>
        ))}
      </List>
    </div>
  )
}

export default Hits
