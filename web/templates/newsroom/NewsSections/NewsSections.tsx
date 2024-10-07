import { forwardRef } from 'react'
import { FormattedMessage } from 'react-intl'
import NewsHeadliner from './NewsHeadliner'
import NewsItem from './NewsItem'
import envisTwMerge from '../../../twMerge'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { useHits, useInstantSearch } from 'react-instantsearch'
import NewsSectionsSkeleton from './NewsSectionsSkeleton'

type NewsSectionsProps = {
  fallbackImages?: SanityImageObject[]
} & React.ComponentProps<'div'>

const NewsSections = forwardRef<HTMLDivElement, NewsSectionsProps>(function NewsSections(
  { fallbackImages, className = '' },
  ref,
) {
  const { items } = useHits()
  const { status } = useInstantSearch()

  if (!items || items.length === 0) {
    return <FormattedMessage id="newsroom_no_hits" defaultMessage="Your search returned no results" />
  }

  return status !== 'loading' && status !== 'stalled' ? (
    <div ref={ref} className={envisTwMerge(`flex flex-col gap-4`, className)}>
      {items.map((hit, index) => {
        return index === 0 ? (
          <NewsHeadliner
            key={hit.objectID}
            //@ts-ignore: TODO Hit<BaseHit> into a NewsRoomNewsItem
            data={{
              ...hit,
              title: hit.pageTitle,
            }}
            {...(!hit?.heroImage?.image?.asset &&
              fallbackImages && {
                fallbackImage: fallbackImages[Math.floor(Math.random() * fallbackImages?.length)],
              })}
          />
        ) : (
          <NewsItem
            key={hit.objectID}
            //@ts-ignore: TODO Hit<BaseHit> into a NewsRoomNewsItem
            data={{
              ...hit,
              title: hit.pageTitle,
            }}
            {...(!hit?.heroImage?.image?.asset &&
              fallbackImages && {
                fallbackImage: fallbackImages[Math.floor(Math.random() * fallbackImages?.length)],
              })}
          />
        )
      })}
    </div>
  ) : (
    <NewsSectionsSkeleton />
  )
})

export default NewsSections
