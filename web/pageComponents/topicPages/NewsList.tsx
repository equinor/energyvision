import styled from 'styled-components'
import NewsCard from '../cards/NewsCard'
import TitleText from '../shared/portableText/TitleText'
import { Pagination } from '../shared/search/simplePagination/Pagination'
import type { NewsListData } from '../../types/types'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

const StyledHeading = styled(TitleText)`
  text-align: var(--promotion-titleAlign, center);
  margin-bottom: var(--space-xLarge);
`

const Articles = styled.div`
  --card-minWidth: 250px;
  --row-gap: var(--space-xLarge);
  --column-gap: var(--space-medium);
  @media (min-width: 1000px) {
    --card-minWidth: 340px;
  }

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, var(--card-minWidth)), 1fr));
  grid-row-gap: var(--row-gap);
  grid-column-gap: var(--column-gap);
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
    <div id={anchor} className={twMerge(`pb-page-content px-layout-lg max-w-viewport mx-auto`, className)}>
      {title && <StyledHeading value={title} level="h2" size="xl" />}
      <Articles {...rest}>
        {pagedArticles.map((article) => (
          <NewsCard key={article.id} data={article} />
        ))}
      </Articles>
      <Pagination totalPages={totalPages} onPageChange={(pageNumber: number) => handlePageChange(pageNumber)} />
    </div>
  )
}

export default NewsList
