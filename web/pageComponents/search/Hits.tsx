import { useHits } from 'react-instantsearch'
import { List, Heading } from '@components'
import { FormattedMessage } from 'react-intl'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { HitData } from './UniversalHit'

export type HitProps = { hit: AlgoliaHit<HitData> }

type HitsProps = {
  hitComponent: React.FC<{ hit: AlgoliaHit<HitData> }>
}

const Hits = ({ hitComponent: Hit }: HitsProps) => {
  const { items } = useHits()
  if (!items || items.length === 0) {
    return (
      <div className="py-15 px-0">
        <Heading className="uppercase" level="h2" size="sm">
          <FormattedMessage id="search_no_results_heading" defaultMessage="Nothing found" />
        </Heading>
        <p>
          <FormattedMessage
            id="search_no_results_generic"
            defaultMessage="Sorry, no results were found. Please try again with some different keywords."
          />
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      <List variant="numbered" unstyled>
        {items.map((item) => (
          <li
            key={item.objectID}
            className=" after:w-full after:border-b after:opacity-50 after:scale-y-50 after:absolute"
          >
            <Hit hit={item} />
          </li>
        ))}
      </List>
    </div>
  )
}

export default Hits
