import styled from 'styled-components'
import TitleText from '../shared/portableText/TitleText'
import { Pagination } from '../shared/search/simplePagination/Pagination'
import type { NewsListData } from '../../types/index'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import PromotionCard from '@sections/cards/PromotionCard/PromotionCard'

const StyledHeading = styled(TitleText)`
  text-align: var(--promotion-titleAlign, center);
  margin-bottom: var(--space-xLarge);
`

const NewsList = ({
  data,
  anchor,
  className,
  ...rest
}: {
  data: NewsListData
  anchor?: string
  className?: string
}) => {
  const { title, articles } = data

  const hitsPerPage = 16
  const totalPages = Math.ceil(articles.length / hitsPerPage)
  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * hitsPerPage
  const endIndex = (currentPage + 1) * hitsPerPage
  const pagedArticles = articles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div
      id={anchor}
      className={twMerge(`pb-page-content px-layout-sm 3xl:px-layout-md max-w-viewport mx-auto`, className)}
    >
      {title && <StyledHeading value={title} level="h2" size="xl" />}
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3" {...rest}>
        {pagedArticles.map((article) => (
          <PromotionCard key={article.id} data={article} hasSectionTitle={!!title} />
        ))}
      </div>
      <Pagination totalPages={totalPages} onPageChange={(pageNumber: number) => handlePageChange(pageNumber)} />
    </div>
  )
}

export default NewsList
