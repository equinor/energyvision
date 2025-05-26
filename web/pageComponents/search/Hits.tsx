import { useHits } from 'react-instantsearch'
import { FormattedMessage } from 'react-intl'
import type { Hit as AlgoliaHit } from '@algolia/client-search'
import { HitData } from './UniversalHit'
import { Typography } from '@core/Typography'

export type HitProps = { hit: AlgoliaHit<HitData> }

type HitsProps = {
  hitComponent: React.FC<{ hit: AlgoliaHit<HitData> }>
}

const Hits = ({ hitComponent: Hit }: HitsProps) => {
  const { items } = useHits()
  if (!items || items.length === 0) {
    return (
      <div className="py-12 px-0">
        <Typography level="h2" size="sm">
          <div className="uppercase">
            <FormattedMessage id="search_no_results_heading" defaultMessage="Nothing found" />
          </div>
        </Typography>
        <Typography level="body" size="sm" className="mt-2">
          <FormattedMessage
            id="search_no_results_generic"
            defaultMessage="Sorry, no results were found. Please try again with some different keywords."
          />
        </Typography>
      </div>
    )
  }

  return (
    <div className="relative">
      <ol>
        {items.map((item) => (
          <li
            key={item.objectID}
            className=" after:w-full after:border-b after:opacity-50 after:scale-y-50 after:absolute"
          >
            <Hit hit={item} />
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Hits
