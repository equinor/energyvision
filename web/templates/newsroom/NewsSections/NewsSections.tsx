'use client'
import type { SanityImageObject } from '@sanity/image-url'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'
import { useHits, useInstantSearch } from 'react-instantsearch'
import { twMerge } from 'tailwind-merge'
import NewsHeadliner from './NewsHeadliner'
import NewsItem from './NewsItem'
import NewsSectionsSkeleton from './NewsSectionsSkeleton'

type NewsSectionsProps = {
  fallbackImages?: SanityImageObject[]
} & React.ComponentProps<'div'>

const NewsSections = forwardRef<HTMLDivElement, NewsSectionsProps>(
  function NewsSections({ fallbackImages, className = '' }, ref) {
    const { items } = useHits()
    const { status } = useInstantSearch()
    const t = useTranslations()

    if (!items || items.length === 0) {
      return t('newsroom_no_hits')
    }

    return status !== 'loading' && status !== 'stalled' ? (
      <div ref={ref} className={twMerge(`flex flex-col gap-4`, className)}>
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
                  fallbackImage:
                    fallbackImages[
                      Math.floor(Math.random() * fallbackImages?.length)
                    ],
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
                  fallbackImage:
                    fallbackImages[
                      Math.floor(Math.random() * fallbackImages?.length)
                    ],
                })}
            />
          )
        })}
      </div>
    ) : (
      <NewsSectionsSkeleton />
    )
  },
)

export default NewsSections
