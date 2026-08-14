'use client'

import { toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from 'next-sanity'
import { forwardRef, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { IFrame } from '@/core/IFrame/IFrame'
import Blocks from '@/portableText/Blocks'
import type { CookieType } from '@/types'

export type EmbeddedVideoListItem = {
  id: string
  videoId?: string
  highlighted?: boolean
  title?: PortableTextBlock[]
}

export type EmbeddedVideoListData = {
  id: string
  type: 'embeddedVideoList'
  title?: PortableTextBlock[]
  hideTitle?: boolean
  ingress?: PortableTextBlock[]
  cookiePolicy?: CookieType[]
  gridColumns?: '2' | '3' | '4'
  items: EmbeddedVideoListItem[]
}

type EmbeddedVideoListProps = {
  data: EmbeddedVideoListData
  anchor?: string
  className?: string
}

const getEmbedUrl = (embedUrl?: string) => {
  if (!embedUrl) return null
  return embedUrl.trim()
}

const EmbeddedVideoList = forwardRef<HTMLDivElement, EmbeddedVideoListProps>(
  function EmbeddedVideoList({ anchor, data, className }, ref) {
    const orderedItems = useMemo(() => {
      return [...(data.items || [])].sort((left, right) => {
        return (
          Number(Boolean(right.highlighted)) - Number(Boolean(left.highlighted))
        )
      })
    }, [data.items])

    const featuredItem = orderedItems.find(item => item.highlighted)
    const featuredItemId = featuredItem?.id
    const regularItems = orderedItems.filter(item => item.id !== featuredItemId)
    const cookiePolicy = data.cookiePolicy || ['none']
    const columns = data.gridColumns ?? '3'
    const itemBasisClass = {
      '2': 'sm:basis-[calc(50%-0.75rem)]',
      '3': 'sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]',
      '4': 'sm:basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-1.125rem)]',
    }[columns]

    return (
      <section
        ref={ref}
        id={anchor}
        className={twMerge('mx-auto w-full max-w-content', className)}
      >
        {(data?.title || data?.ingress) && (
          <div className='px-layout-sm pb-8 lg:px-layout-lg'>
            {data.title && (
              <Blocks
                variant='h2'
                value={data.title}
                className={twMerge(data?.hideTitle && 'sr-only')}
              />
            )}
            {data.ingress && <Blocks variant='ingress' value={data.ingress} />}
          </div>
        )}

        {featuredItem && getEmbedUrl(featuredItem?.videoId) && (
          <div className='px-layout-sm pb-8 lg:px-layout-lg'>
            <div className='overflow-hidden rounded-base'>
              <IFrame
                frameTitle={
                  featuredItem.title && featuredItem.title.length > 0
                    ? toPlainText(featuredItem.title)
                    : 'Featured embedded video'
                }
                url={getEmbedUrl(featuredItem?.videoId) || ''}
                cookiePolicy={cookiePolicy}
                aspectRatio='16:9'
                hasSectionTitle={false}
              />
            </div>
            {featuredItem.title && (
              <Blocks value={featuredItem.title} className='pt-4 text-md' />
            )}
          </div>
        )}

        <ul className='flex flex-wrap gap-x-6 gap-y-12 px-layout-sm'>
          {regularItems
            .filter(item => getEmbedUrl(item.videoId))
            .map((videoItem, videoIndex) => {
              const embedUrl = getEmbedUrl(videoItem.videoId)

              if (!embedUrl) return null

              const frameTitle =
                videoItem.title && videoItem.title.length > 0
                  ? toPlainText(videoItem.title)
                  : `Embedded video ${videoIndex + 1}`

              return (
                <li
                  key={videoItem.id}
                  className={twMerge(
                    'has-focus-visible:envis-outline dark:has-focus-visible:envis-outline-invert basis-full',
                    itemBasisClass,
                  )}
                >
                  <div className='overflow-hidden rounded-base'>
                    <IFrame
                      frameTitle={frameTitle}
                      url={embedUrl}
                      cookiePolicy={cookiePolicy}
                      aspectRatio='16:9'
                      hasSectionTitle={false}
                    />
                  </div>
                  {videoItem?.title && (
                    <Blocks value={videoItem.title} className='pt-3 text-sm' />
                  )}
                </li>
              )
            })}
        </ul>
      </section>
    )
  },
)

export default EmbeddedVideoList
