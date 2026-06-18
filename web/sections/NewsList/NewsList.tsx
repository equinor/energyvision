'use client'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import { Promotion } from '@/core/Promotion/Promotion'
import { defaultLanguage } from '@/languageConfig'
import Blocks from '@/portableText/Blocks'
import { getLocaleFromIso } from '@/sanity/helpers/localization'
import {
  type ColorKeys,
  colorKeyToUtilityMap,
} from '@/styles/colorKeyToUtilityMap'
import type { NewsListData } from '../../types/index'
import { Pagination } from '../searchBlocks/simplePagination/Pagination'

const NewsList = ({
  data,
  designOptions,
  anchor,
  className,
}: {
  data: NewsListData
  designOptions: {
    background?: {
      backgroundUtility?: ColorKeys
    }
    foreground?: ColorKeys
  }
  anchor?: string
  className?: string
}) => {
  const iso = useLocale()
  const { title, articles } = data
  const { background } = designOptions || {}
  const { backgroundUtility } = background || {}
  const hitsPerPage = 18 // keep in multiples of 6 so each page is filled except the last
  const totalPages = Math.ceil(articles.length / hitsPerPage)
  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * hitsPerPage
  const endIndex = (currentPage + 1) * hitsPerPage
  const pagedArticles = articles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const bg = colorKeyToUtilityMap[backgroundUtility ?? 'white-100']?.background

  return (
    <div
      id={anchor}
      className={twMerge(`w-full ${bg} pb-page-content`, className)}
    >
      <div className='mx-auto max-w-content'>
        <div className='px-layout-sm lg:px-layout-lg'>
          {title && <Blocks value={title} variant='h2' />}
        </div>

        <ul className='grid auto-rows-fr gap-x-6 gap-y-8 3xl:px-layout-md px-layout-sm sm:grid-cols-2 xl:grid-cols-3'>
          {pagedArticles.map(newsItem => {
            const locale =
              iso !== defaultLanguage.name ? getLocaleFromIso(iso) : ''
            const href = (newsItem?.slug && '/' + locale + newsItem?.slug) || ''
            return (
              <li key={newsItem.id}>
                <Promotion
                  variant='default'
                  type='extended'
                  //@ts-ignore:todo
                  title={newsItem?.title}
                  ingress={newsItem?.ingress}
                  {...(newsItem?.publishDateTime && {
                    eyebrow: (
                      <FormattedDateTime
                        datetime={newsItem?.publishDateTime}
                        uppercase
                        className='pb-2 font-medium text-xs'
                      />
                    ),
                  })}
                  image={newsItem?.heroImage?.image}
                  href={href}
                  hasSectionTitle={true}
                />
              </li>
            )
          })}
        </ul>
        <Pagination
          totalPages={totalPages}
          onPageChange={(pageNumber: number) => handlePageChange(pageNumber)}
        />
      </div>
    </div>
  )
}

export default NewsList
