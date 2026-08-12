'use client'

import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import type { Image as ImageType } from '@/core/Image/imageUtilities'
import { ModalPromotion } from '@/core/Promotion/ModalPromotion'
import { Typography } from '@/core/Typography'
import Blocks from '@/portableText/Blocks'
import type { ColorKeys } from '@/styles/colorKeyToUtilityMap'

export type PersonListItem = {
  _id: string
  name: string
  title?: string
  image?: ImageType
  bio?: PortableTextBlock[]
  hierarchyLevel?: '1' | '2' | '3'
  slug?: { current: string }
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

    const groupedByLevel = useMemo(() => {
      if (!data.asDiagram) return null

      const groups: Record<string, PersonListItem[]> = {
        '1': [],
        '2': [],
        '3': [],
      }
      data.items.forEach(person => {
        const level = person.hierarchyLevel || '1'
        groups[level].push(person)
      })
      return groups
    }, [data.items, data.asDiagram])

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

        {data.asDiagram && groupedByLevel ? (
          <div className='relative px-layout-sm lg:px-layout-lg'>
            {/* SVG for connecting lines */}
            <svg
              className='pointer-events-none absolute inset-0'
              width='100%'
              height='100%'
              style={{ minHeight: '600px' }}
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
                    strokeWidth='2'
                    className='text-grey-40 dark:text-slate-60'
                  />
                )
              })}
              {/* Vertical lines connecting levels */}
              {groupedByLevel['1'].length > 0 &&
                groupedByLevel['2'].length > 0 && (
                  <line
                    x1='50%'
                    y1='20%'
                    x2='50%'
                    y2='50%'
                    stroke='currentColor'
                    strokeWidth='2'
                    className='text-grey-40 dark:text-slate-60'
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
                    strokeWidth='2'
                    className='text-grey-40 dark:text-slate-60'
                  />
                )}
            </svg>

            {/* Organizational levels */}
            <div className='relative z-10 space-y-16 pt-8'>
              {['1', '2', '3'].map(level => {
                const people = groupedByLevel[level]
                if (!people.length) return null
                return (
                  <div key={`level-group-${level}`}>
                    <h3 className='mb-6 font-semibold text-slate-60 text-sm dark:text-white-80'>
                      Level {level}
                    </h3>
                    <ul className='m-0 flex list-none flex-wrap gap-6 p-0'>
                      {people.map(person => (
                        <li key={person._id} className='min-w-62.5 flex-1'>
                          <ModalPromotion
                            title={person.name}
                            image={person.image}
                            ingress={person.bio}
                            eyebrow={person.title}
                            background={backgroundUtility}
                            modalTitle={person.name}
                            modalContent={
                              <div className='flex flex-col gap-6'>
                                {person.title && (
                                  <Typography variant='h4'>
                                    {person.title}
                                  </Typography>
                                )}
                                {person.bio && <Blocks value={person.bio} />}
                              </div>
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <ul className='m-0 grid list-none gap-6 p-0 px-layout-sm md:grid-cols-2 lg:grid-cols-3 lg:px-layout-lg'>
            {data.items.map(person => (
              <li key={person._id}>
                <ModalPromotion
                  title={person.name}
                  image={person.image}
                  ingress={person.title}
                  background={backgroundUtility}
                  modalTitle={person.name}
                  modalContent={
                    <div className='flex flex-col gap-6'>
                      {person.title && (
                        <Typography variant='h4'>{person.title}</Typography>
                      )}
                      {person.bio && <Blocks value={person.bio} />}
                    </div>
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    )
  },
)

export default PersonList
