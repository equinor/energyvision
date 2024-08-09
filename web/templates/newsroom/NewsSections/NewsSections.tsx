import { forwardRef } from 'react'
import { useInfiniteHits, UseInfiniteHitsProps } from 'react-instantsearch'
import { FormattedMessage } from 'react-intl'
import NewsHeadliner from './NewsHeadliner'
import NewsItem from './NewsItem'
import { Button } from '@core/Button'

type NewsSectionsProps = React.ComponentProps<'div'> & UseInfiniteHitsProps

const NewsSections = forwardRef<HTMLDivElement, NewsSectionsProps>(function NewsSections(
  { className = '', ...rest },
  ref,
) {
  const { hits, showMore } = useInfiniteHits()

  if (!hits || hits.length === 0) {
    return <FormattedMessage id="newsroom_no_hits" defaultMessage="Your search returned no results" />
  }

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {hits.map((hit, index) => {
        return index === 0 ? (
          <NewsHeadliner key={hit.objectID} data={hit} />
        ) : (
          <NewsItem key={hit.objectID} data={hit} />
        )
      })}
      <Button variant="outlined" onClick={showMore} className="mx-auto my-10">
        Show more
      </Button>
    </div>
  )
})

export default NewsSections
