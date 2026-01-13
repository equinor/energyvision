'use client'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Blocks from '@/portableText/Blocks'
import PromotionCard from '@/sections/cards/PromotionCard/PromotionCard'
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
  const { title, articles } = data
  const { background, foreground } = designOptions || {}
  const { backgroundUtility } = background || {}
  const hitsPerPage = 16
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
      className={twMerge(
        `${bg} 3xl:px-layout-md px-layout-sm pb-page-content`,
        className,
      )}
    >
      {title && <Blocks value={title} variant='h2' />}
      <div className='grid auto-rows-fr gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3'>
        {pagedArticles.map(article => (
          <PromotionCard
            background={foreground}
            key={article.id}
            data={article}
            hasSectionTitle={!!title}
          />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        onPageChange={(pageNumber: number) => handlePageChange(pageNumber)}
      />
    </div>
  )
}

export default NewsList
