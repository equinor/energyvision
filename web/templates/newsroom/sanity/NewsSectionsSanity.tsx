import { forwardRef } from 'react'
import { FormattedMessage } from 'react-intl'
import envisTwMerge from '../../../twMerge'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { NewsRoomNewsItem } from '../../../types/algoliaIndexPage'
import NewsHeadlinerSanity from './NewsHeadlinerSanity'
import NewsItemSanity from './NewsItemSanity'

type NewsSectionsProps = {
  newslist: NewsRoomNewsItem[] | undefined
  fallbackImages?: SanityImageObject[]
} & React.ComponentProps<'div'>

const NewsSectionsSanity = forwardRef<HTMLDivElement, NewsSectionsProps>(function NewsSectionsSanity(
  { newslist, fallbackImages, className = '' },
  ref,
) {
  if (!newslist || newslist?.length === 0) {
    return <FormattedMessage id="newsroom_no_hits" defaultMessage="Your search returned no results" />
  }

  return (
    <div ref={ref} className={envisTwMerge(``, className)}>
      <NewsHeadlinerSanity
        key={newslist[0]?.id}
        data={newslist[0]}
        //@ts-ignore: TODO
        {...(!newslist[0]?.heroImage?.image?.asset &&
          fallbackImages && {
            fallbackImage: fallbackImages[Math.floor(Math.random() * fallbackImages?.length)],
          })}
      />
      <div className="pt-12 grid grid-cols-1 auto-rows-fr">
        {newslist.map((item: NewsRoomNewsItem, index: number) => {
          return index !== 0 ? (
            <NewsItemSanity
              key={item.id}
              data={item}
              //@ts-ignore: TODO
              {...(!item?.heroImage?.image?.asset &&
                fallbackImages && {
                  fallbackImage: fallbackImages[Math.floor(Math.random() * fallbackImages?.length)],
                })}
            />
          ) : null
        })}
      </div>
    </div>
  )
})

export default NewsSectionsSanity
