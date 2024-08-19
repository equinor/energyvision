import { forwardRef } from 'react'
import { useHits, UseHitsProps } from 'react-instantsearch'
import { FormattedMessage } from 'react-intl'
import NewsHeadliner from './NewsHeadliner'
import NewsItem from './NewsItem'
import envisTwMerge from '../../../twMerge'

type NewsSectionsProps = React.ComponentProps<'div'> & UseHitsProps

const NewsSections = forwardRef<HTMLDivElement, NewsSectionsProps>(function NewsSections({ className = '' }, ref) {
  const { hits } = useHits()

  if (!hits || hits.length === 0) {
    return <FormattedMessage id="newsroom_no_hits" defaultMessage="Your search returned no results" />
  }

  return (
    <div ref={ref} className={envisTwMerge(`flex flex-col gap-4`, className)}>
      {hits.map((hit, index) => {
        return index === 0 ? (
          <NewsHeadliner key={hit.objectID} data={hit} />
        ) : (
          <NewsItem key={hit.objectID} data={hit} />
        )
      })}
    </div>
  )
})

export default NewsSections
