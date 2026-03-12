//@ts-nocheck
import {
  type DashboardWidget,
  DashboardWidgetContainer,
  type LayoutConfig,
} from '@sanity/dashboard'
import { WarningFilledIcon, WarningOutlineIcon } from '@sanity/icons'
import { Button, Flex, Select, Spinner } from '@sanity/ui'
import { format, isAfter, isBefore, isDate, subDays } from 'date-fns'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { SanityDocument } from 'sanity'
import { Feedback, useListeningQuery } from 'sanity-plugin-utils'

type SortTypes = 'expiration' | 'created' | 'updated'
type SortDirections = 'asc' | 'desc'
const CHUNK_SIZE = 12

function ImportedFotowareAssetsWidget() {
  const { data, loading, error } = useListeningQuery<SanityDocument[]>(
    `*[_type == "sanity.imageAsset" && source.name match "fotoware*"] | order(_createdAt desc)`,
    {
      params: {},
      initialValue: [],
    },
  )

  const formattedAssets = useMemo(() => {
    return data?.length > 0
      ? data.map((asset: SanityDocument) => {
          const splitDate = asset.source.name.split('_')[1]
          const expDate = splitDate ? new Date(splitDate) : undefined
          const expired = expDate ? isAfter(new Date(), expDate) : undefined
          // expDate is not expired but after the margin of 30 days before expirationDate
          const soonExpiring = expDate
            ? !expired && isAfter(subDays(new Date(), 30), expDate)
            : undefined
          //Is valid before the margin of 30 days before expirationDate
          const valid = expDate
            ? isBefore(subDays(new Date(), 30), expDate)
            : undefined
          return {
            ...asset,
            expirationDate: expDate ? expDate : '',
            expired,
            soonExpiring,
            valid,
          }
        })
      : []
  }, [data])

  const widgetContainerRef = useRef(null)
  const [sortedAssets, setSortedAssets] = useState([])
  const [pages, setPages] = useState<any[][]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState<SortTypes>('expiration')
  const [sortDirection, setSortDirection] = useState<SortDirections>('desc')

  const handleSortChange = useCallback(
    (type: SortTypes, direction: SortDirections) => {
      let sorted = []
      if (type === 'expiration') {
        const hasExpirationArray = formattedAssets
          .filter(
            (item: { expirationDate: string }) => item?.expirationDate !== '',
          )
          .sort(
            (a: { expirationDate: string }, b: { expirationDate: string }) => {
              return direction === 'desc'
                ? new Date(b.expirationDate) - new Date(a.expirationDate)
                : new Date(a.expirationDate) - new Date(b.expirationDate)
            },
          )
        console.log('hasExpirationArray', hasExpirationArray)
        const theRestArray = formattedAssets.filter(
          item => item?.expirationDate === '',
        )
        console.log('theRestArray', theRestArray)
        sorted = hasExpirationArray.concat(theRestArray)
      } else {
        sorted = formattedAssets.sort(
          (a: { _createdAt: string }, b: { _createdAt: string }) => {
            if (type === 'created') {
              return direction === 'desc'
                ? new Date(b._createdAt) - new Date(a._createdAt)
                : new Date(a._createdAt) - new Date(b._createdAt)
            }
            if (type === 'updated') {
              return direction === 'desc'
                ? new Date(b._updatedAt) - new Date(a._updatedAt)
                : new Date(a._updatedAt) - new Date(b._updatedAt)
            }
            return false
          },
        )
      }
      if (sortType !== type) {
        setSortType(type)
      }
      if (sortDirection !== direction) {
        setSortDirection(direction)
      }
      console.log('sorted', sorted)
      const chunks = [...Array(Math.ceil(sorted.length / CHUNK_SIZE))].map(
        (_, i) => sorted.slice(CHUNK_SIZE * i, CHUNK_SIZE + CHUNK_SIZE * i),
      )
      setSortedAssets(sorted)
      setPages(chunks)
      setCurrentPage(1)
    },
    [formattedAssets, sortDirection, sortType],
  )
  useEffect(() => {
    if (formattedAssets?.length > 0) {
      handleSortChange(sortType, sortDirection)
    }
  }, [formattedAssets, handleSortChange, sortDirection, sortType])

  useEffect(() => {
    if (widgetContainerRef.current) {
      //@ts-ignore : Not pretty or recommended, but cant access the parent with box shadow
      widgetContainerRef?.current?.parentNode.parentNode.parentNode.classList.add(
        'no-box-shadow',
      )
    }
  }, [])

  const currentItemFirst =
    currentPage === 1 ? 1 : currentPage * CHUNK_SIZE - CHUNK_SIZE + 1 // First number of range of items at current page
  const currentItemLast =
    currentPage === pages?.length
      ? sortedAssets?.length
      : currentPage * CHUNK_SIZE // Last number of range of items at current page

  return (
    <DashboardWidgetContainer>
      <div className='fotoware' ref={widgetContainerRef}>
        {error && <div>{error.message}</div>}
        {!error && loading && (
          <div className='card flex justify-center'>
            <Spinner muted />
          </div>
        )}
        {!error && !loading && (
          <>
            <div className='sort-bar'>
              <div>
                <label htmlFor='sort_select'>Sort by:</label>
                <Select
                  className='select'
                  id='sort_select'
                  onChange={event =>
                    handleSortChange(event.target.value, sortDirection)
                  }
                  value={sortType}
                  fontSize={[2, 2, 3, 4]}
                  padding={[3, 3, 4]}
                  space={[3, 3, 4]}
                >
                  <option value='expiration'>Expiration date</option>
                  <option value='created'>Created</option>
                  <option value='updated'>Updated</option>
                </Select>
              </div>
              <div>
                <label htmlFor='sort_direction_select'>Direction:</label>
                <Select
                  className='select'
                  id='sort_direction_select'
                  onChange={event =>
                    handleSortChange(sortType, event?.target.value)
                  }
                  value={sortDirection}
                  fontSize={[2, 2, 3, 4]}
                  padding={[3, 3, 4]}
                  space={[3, 3, 4]}
                >
                  <option value='asc'>Ascending</option>
                  <option value='desc'>Descending</option>
                </Select>
              </div>
            </div>
            <div className='mx-auto flex w-full flex-wrap items-center justify-end gap-4'>
              {pages?.length > 0 ? (
                pages[currentPage - 1]?.map(
                  (
                    image: {
                      expired?: string
                      soonExpiring?: string
                    } & SanityDocument,
                  ) => {
                    return (
                      <div className='card' key={image._id}>
                        <div className='aspect-video'>
                          <img
                            alt=''
                            className='h-full w-full object-cover'
                            //@ts-ignore
                            src={image.url}
                          />
                        </div>
                        <div className='flex flex-col gap-1'>
                          {/*@ts-ignore*/}
                          <div className='mt-3 text-md'>{image.title}</div>
                          <div className='text-sm'>
                            {sortType === 'created' && (
                              <div>
                                Created:{' '}
                                {format(
                                  new Date(image._createdAt),
                                  'd. MMM yyyy mm:HH',
                                )}
                              </div>
                            )}
                            {sortType === 'updated' && (
                              <div>
                                Updated:{' '}
                                {format(
                                  new Date(image._updatedAt),
                                  'd. MMM yyyy mm:HH',
                                )}
                              </div>
                            )}
                            {image.expirationDate &&
                              isDate(image.expirationDate) && (
                                <div className='flex'>
                                  {image.expired ||
                                    (image.soonExpiring && (
                                      <div className='pr-2'>
                                        {image.expired && (
                                          <WarningFilledIcon
                                            width={24}
                                            height={24}
                                          />
                                        )}
                                        {image.soonExpiring && (
                                          <WarningOutlineIcon
                                            width={24}
                                            height={24}
                                          />
                                        )}
                                      </div>
                                    ))}
                                  Expires:{' '}
                                  {format(
                                    new Date(image.expirationDate),
                                    'd. MMM yyyy mm:HH',
                                  )}
                                </div>
                              )}
                            {image.source.url && (
                              <a className='link' href={image.source.url}>
                                Fotoware url
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  },
                )
              ) : (
                <Feedback>No images found</Feedback>
              )}
            </div>
            <div className='pagination'>
              <Flex direction='column' align='center'>
                <Flex direction='row' gap={4} paddingBottom={4}>
                  <Button
                    fontSize={[2, 2, 3]}
                    mode='ghost'
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    padding={[3, 3, 4]}
                    text='Previous page'
                  />
                  <Button
                    fontSize={[2, 2, 3]}
                    mode='ghost'
                    padding={[3, 3, 4]}
                    disabled={currentPage >= pages?.length}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    text='Next page'
                  />
                </Flex>
                {currentItemFirst !== currentItemLast
                  ? `${currentItemFirst}
              ${' - '}
              ${currentItemLast}
              ${' of '}
              ${sortedAssets?.length}
              ${' items'}`
                  : `${currentItemFirst} ${' of '} ${sortedAssets?.length} ${' items'}`}
              </Flex>
            </div>
          </>
        )}
      </div>
    </DashboardWidgetContainer>
  )
}

export function fotowareWidget(
  config: { layout?: LayoutConfig } = {},
): DashboardWidget {
  return {
    name: 'fotoware-widget',
    component: ImportedFotowareAssetsWidget,
    layout: config.layout ?? { width: 'medium' },
  }
}
