import { forwardRef } from 'react'
import { FormattedMessage } from 'react-intl'
import NewsHeadliner from './NewsHeadliner'
import NewsItem from './NewsItem'
import envisTwMerge from '../../../twMerge'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { NewsRoomNewsItem } from '../../../types/algoliaIndexPage'
import { useHits } from 'react-instantsearch'

type NewsSectionsProps = {
  fallbackImages?: SanityImageObject[]
  news?: NewsRoomNewsItem[]
  hasQuickSearch: boolean
  search?: any
} & React.ComponentProps<'div'>

const NewsSections = forwardRef<HTMLDivElement, NewsSectionsProps>(function NewsSections(
  { fallbackImages, className = '', news, search, hasQuickSearch = false },
  ref,
) {
  const { items } = useHits()

  if (!news || news.length === 0) {
    return <FormattedMessage id="newsroom_no_hits" defaultMessage="Your search returned no results" />
  }
  const getAlgoliaNews = items.map((hit, index) => {
    return index === 0 ? (
      <NewsHeadliner
        key={hit.objectID}
        //@ts-ignore: TODO Hit<BaseHit> into a NewsRoomNewsItem
        data={hit}
        {...(!hit?.heroImage?.image?.asset &&
          fallbackImages && {
            fallbackImage: fallbackImages[Math.floor(Math.random() * fallbackImages?.length)],
          })}
      />
    ) : (
      <NewsItem
        key={hit.objectID}
        //@ts-ignore: TODO Hit<BaseHit> into a NewsRoomNewsItem
        data={hit}
        {...(!hit?.heroImage?.image?.asset &&
          fallbackImages && {
            fallbackImage: fallbackImages[Math.floor(Math.random() * fallbackImages?.length)],
          })}
      />
    )
  })

  return (
    <div ref={ref} className={envisTwMerge(`flex flex-col gap-4`, className)}>
      {hasQuickSearch
        ? getAlgoliaNews
        : news.map((item: NewsRoomNewsItem, index: number) => {
            return index === 0 ? (
              <NewsHeadliner
                key={item.id}
                search={search}
                data={item}
                {...(!item?.heroImage?.image?.asset &&
                  fallbackImages && {
                    fallbackImage: fallbackImages[Math.floor(Math.random() * fallbackImages?.length)],
                  })}
              />
            ) : (
              <NewsItem
                key={item.id}
                data={item}
                search={search}
                {...(!item?.heroImage?.image?.asset &&
                  fallbackImages && {
                    fallbackImage: fallbackImages[Math.floor(Math.random() * fallbackImages?.length)],
                  })}
              />
            )
          })}
    </div>
  )
})

export default NewsSections
