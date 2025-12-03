'use client'
import type { PortableTextBlock } from 'next-sanity'
import { useMemo, useRef, useState } from 'react'
import { SimplePagination } from '@/core/SimplePagination/SimplePagination'
import Blocks from '@/portableText/Blocks'
import CardSkeleton from '@/sections/cards/CardSkeleton/CardSkeleton'
import MagazineCard from '@/sections/cards/MagazineCard/MagazineCard'
import { HeroBlock, type HeroData } from '@/sections/Hero/HeroBlock'
import MagazineTagBar from '@/sections/MagazineTags/MagazineTagBar'
import { PaginationContextProvider } from '../../lib/contexts/PaginationContext'
import Teaser, { type TeaserData } from '../../sections/teasers/Teaser/Teaser'
import type { MagazineCardData, SeoData } from '../../types'

const chunkArray = (array: any[], chunkSize: number) => {
  const chunkedArray = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize))
  }
  return chunkedArray
}

// Sanity MagazineIndexPage
type MagazineRoomProps = {
  seoAndSome: SeoData
  title: PortableTextBlock[]
  hero: HeroData
  ingress: PortableTextBlock[]
  magazineArticles: MagazineCardData[]
  footerComponent?: TeaserData
  magazineTags: { id: string; title: string; key: string }[]
}

const MagazineRoom = ({
  ingress,
  title,
  hero,
  magazineTags,
  magazineArticles,
  footerComponent,
}: MagazineRoomProps) => {
  const resultsRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  console.log('magazineArticles', magazineArticles)
  const pagedList = useMemo(
    () => chunkArray(magazineArticles ?? [], 12),
    [magazineArticles],
  )

  const [pageIdx, setPage] = useState(0)

  const { figure, ratio, type } = hero
  const heroProps = {
    title,
    figure,
    type,
    ratio,
    ingress,
  }

  const getNext = async () => {
    setIsLoading(true)
    setPage(pageIdx + 1)
    setIsLoading(false)
  }
  const getPrevious = async () => {
    setIsLoading(true)
    setPage(pageIdx - 1)
    setIsLoading(false)
  }

  return (
    <main className='flex flex-col pt-topbar'>
      {/*@ts-ignore*/}
      <HeroBlock {...heroProps} />
      {ingress && (
        <Blocks
          //@ts-ignore
          value={ingress}
          group='article'
        />
      )}
      {magazineTags?.length > 0 && <MagazineTagBar tags={magazineTags} />}
      <PaginationContextProvider defaultRef={resultsRef}>
        <ul className='mx-auto grid w-full scroll-mt-24 auto-rows-fr grid-cols-1 gap-8 px-layout-sm py-12 sm:grid-cols-2 xl:grid-cols-3'>
          {isLoading &&
            Array.from({ length: 5 }, (_v, i) => i).map(item => (
              <li key={item}>
                <CardSkeleton hideEyebrow hideIngress />
              </li>
            ))}
          {!isLoading &&
            pagedList?.[pageIdx]?.map(article => (
              <li key={article.id}>
                <MagazineCard data={article} />
              </li>
            ))}
        </ul>
        {magazineArticles?.length > 12 && (
          <SimplePagination
            onNextPage={getNext}
            onPreviousPage={getPrevious}
            isFirstPage={pageIdx === 0}
            isLastPage={pageIdx === pagedList.length - 1}
            className='justify-center pt-12'
          />
        )}
      </PaginationContextProvider>
      <div className='pt-24'>
        {footerComponent && <Teaser data={footerComponent} />}
      </div>
    </main>
  )
}
export default MagazineRoom
