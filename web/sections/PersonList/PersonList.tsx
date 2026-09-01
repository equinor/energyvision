'use client'

import type { PortableTextBlock } from '@portabletext/types'
import { useSearchParams } from 'next/navigation'
import { forwardRef, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { Image } from '@/core/Image/Image'
import type { Image as ImageType } from '@/core/Image/imageUtilities'
import { ModalPromotion } from '@/core/Promotion/ModalPromotion'
import { Typography } from '@/core/Typography'
import Blocks from '@/portableText/Blocks'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'

export type PersonListItem = {
  id: string
  highlighted?: boolean
  person: {
    id: string
    name: string
    title?: string
    image?: ImageType
    bio?: PortableTextBlock[]
    hierarchyLevel?: '1' | '2' | '3'
    slug?: string
  }
}

export type PersonListData = {
  id: string
  type: 'personList'
  title?: PortableTextBlock[]
  hideTitle?: boolean
  ingress?: PortableTextBlock[]
  items: PersonListItem[]
  designOptions?: {
    background?: {
      backgroundUtility?: ColorKeys
    }
    foreground?: ColorKeys
  }
  asDiagram?: boolean
}

type PersonListProps = {
  data: PersonListData
  anchor?: string
  className?: string
}

const PersonList = forwardRef<HTMLDivElement, PersonListProps>(
  function PersonList({ anchor, data, className }, ref) {
    const backgroundUtility = data.designOptions?.background?.backgroundUtility
    const foreground = data.designOptions?.foreground
    const searchParams = useSearchParams()
    // URL hashtag param is set by ModalPromotion as encodeURIComponent(name)
    const activePersonName = searchParams.get('person')
      ? decodeURIComponent(searchParams.get('person') ?? '')
      : null

    const groupedByLevel = useMemo(() => {
      if (!data.asDiagram) return null

      const groups: Record<string, PersonListItem[]> = {
        '1': [],
        '2': [],
        '3': [],
      }
      data.items.forEach(item => {
        if (!item.person) return
        const level = item.person.hierarchyLevel || '1'
        groups[level].push(item)
      })
      return groups
    }, [data.items, data.asDiagram])

    return (
      <section
        ref={ref}
        id={anchor}
        className={twMerge(
          'mx-auto w-full max-w-content',
          backgroundUtility &&
            colorKeyToUtilityMap[backgroundUtility]?.background,
          className,
        )}
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

        {data.asDiagram && groupedByLevel ? (
          <div className='px-layout-sm'>
            {/* Organizational levels */}
            <div className='relative isolate space-y-16 pt-8'>
              {/* SVG scoped to levels container */}
              <svg
                className='-z-10 pointer-events-none absolute inset-0'
                width='100%'
                height='100%'
              >
                {/* Horizontal lines connecting people on same level */}
                {['1', '2', '3'].map(level => {
                  const people = groupedByLevel[level]
                  if (people.length <= 1) return null
                  return (
                    <line
                      key={`level-${level}`}
                      x1='10%'
                      y1={`${level === '1' ? 20 : level === '2' ? 50 : 80}%`}
                      x2='90%'
                      y2={`${level === '1' ? 20 : level === '2' ? 50 : 80}%`}
                      stroke='currentColor'
                      strokeWidth='1'
                      className='text-autumn-storm-60 dark:text-slate-60'
                    />
                  )
                })}
                {/* Vertical lines connecting levels */}
                {groupedByLevel['1'].length > 0 &&
                  groupedByLevel['2'].length > 0 && (
                    <line
                      x1='50%'
                      y1='10%'
                      x2='50%'
                      y2='50%'
                      stroke='currentColor'
                      strokeWidth='1'
                      className='text-autumn-storm-60 dark:text-slate-60'
                    />
                  )}
                {groupedByLevel['2'].length > 0 &&
                  groupedByLevel['3'].length > 0 && (
                    <line
                      x1='50%'
                      y1='50%'
                      x2='50%'
                      y2='80%'
                      stroke='currentColor'
                      strokeWidth='1'
                      className='text-autumn-storm-60 dark:text-slate-60'
                    />
                  )}
              </svg>

              {['1', '2', '3'].map(level => {
                const people = groupedByLevel[level]
                if (!people.length) return null
                return (
                  <div key={`level-group-${level}`}>
                    <ul className='m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(18.75rem,18.75rem))] justify-center gap-x-10 gap-y-6 p-0'>
                      {people.map(
                        item =>
                          item.person && (
                            <li key={item.id}>
                              <ModalPromotion
                                title={item.person.name}
                                image={item.person.image}
                                ingress={item.person.title}
                                background={foreground}
                                modalTitle={item.person.name}
                                modalContent={
                                  <div className='flex flex-col gap-12'>
                                    <div className='flex items-center gap-8'>
                                      {item.person.image && (
                                        <div className='w-[30%] shrink-0'>
                                          <Image
                                            image={item.person.image}
                                            aspectRatio='1:1'
                                            imageClassName='rounded-full'
                                            className='w-full'
                                          />
                                        </div>
                                      )}
                                      <div className='flex flex-col justify-center gap-1'>
                                        <Typography variant='h4'>
                                          {item.person.name}
                                        </Typography>
                                        {item.person.title && (
                                          <Typography variant='base'>
                                            {item.person.title}
                                          </Typography>
                                        )}
                                      </div>
                                    </div>
                                    {item.person.bio && (
                                      <Blocks value={item.person.bio} />
                                    )}
                                  </div>
                                }
                              />
                            </li>
                          ),
                      )}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          (() => {
            const validItems = data.items.filter(item => item.person)
            const highlighted = validItems.find(item => item.highlighted)
            const rest = validItems.filter(item => !item.highlighted)

            const renderCard = (item: PersonListItem) => (
              <ModalPromotion
                className='h-full'
                title={item.person?.name}
                image={item.person?.image}
                ingress={item.person?.title}
                background={foreground}
                modalTitle={item.person?.name}
                initialOpen={
                  !!activePersonName && item.person?.name === activePersonName
                }
                modalContent={
                  <div className='flex flex-col gap-6'>
                    <div className='flex items-center gap-6'>
                      {item.person?.image && (
                        <div className='w-[30%] shrink-0'>
                          <Image
                            image={item.person.image}
                            aspectRatio='1:1'
                            imageClassName='rounded-full'
                            className='w-full'
                          />
                        </div>
                      )}
                      <div className='flex flex-col justify-center'>
                        <Typography as='h2' variant='h3'>
                          {item.person?.name}
                        </Typography>
                        {item.person?.title && (
                          <Typography variant='body'>
                            {item.person.title}
                          </Typography>
                        )}
                      </div>
                    </div>
                    {item.person?.bio && <Blocks value={item.person.bio} />}
                  </div>
                }
              />
            )

            return (
              <div className='flex flex-col gap-6 px-layout-sm'>
                {highlighted && (
                  <ul className='m-0 grid list-none grid-cols-[minmax(min(18.75rem,100%),1fr)] justify-center p-0 sm:grid-cols-[18.75rem] lg:grid-cols-[22rem]'>
                    <li key={highlighted.id} className='flex'>
                      {renderCard(highlighted)}
                    </li>
                  </ul>
                )}
                {rest.length > 0 && (
                  <ul className='m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(18.75rem,100%),1fr))] items-stretch gap-6 p-0'>
                    {rest.map(item => (
                      <li key={item.id} className='flex'>
                        {renderCard(item)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })()
        )}
      </section>
    )
  },
)

export default PersonList
