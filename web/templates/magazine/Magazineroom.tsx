'use client'
import type { MagazineIndexPageType } from '../../types'
import { useMemo, useRef, useState } from 'react'
import { HeroTypes } from '../../types/index'
import { BackgroundContainer } from '@/core/Backgrounds'
import Teaser from '../../sections/teasers/Teaser/Teaser'
import Blocks from '../../portableText/Blocks'
import MagazineTagBar from '@/sections/MagazineTags/MagazineTagBar'
import { ImageBackgroundContainer } from '@/core/Backgrounds/ImageBackgroundContainer'
import { Heading } from '@/core/Typography'
import MagazineCard from '@/sections/cards/MagazineCard/MagazineCard'
import { SimplePagination } from '@/core/SimplePagination/SimplePagination'
import CardSkeleton from '@/sections/cards/CardSkeleton/CardSkeleton'
import { PaginationContextProvider } from '../../common/contexts/PaginationContext'
import { SharedBanner } from '../shared/SharedBanner'
import SharedTitle from '../shared/SharedTitle'

type MagazineIndexTemplateProps = {
  pageData: MagazineIndexPageType
  slug?: string
}

const chunkArray = (array: any[], chunkSize: number) => {
  const chunkedArray = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize))
  }
  return chunkedArray
}

const MagazineRoom = ({ pageData }: MagazineIndexTemplateProps) => {
  const { ingress, title, hero, magazineTags, magazineArticles, footerComponent } = pageData || {}
  const resultsRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const magazineList = useMemo(() => magazineArticles, [magazineArticles])
  const pagedList = useMemo(() => chunkArray(magazineList, 12), [magazineList])
  const [page, setPage] = useState(0)

  const getNext = async () => {
    setIsLoading(true)
    setPage(page + 1)
    setIsLoading(false)
  }
  const getPrevious = async () => {
    setIsLoading(true)
    setPage(page - 1)
    setIsLoading(false)
  }

  return (
    <main>
      {hero.type !== HeroTypes.BACKGROUND_IMAGE && (
        <>
          <SharedBanner title={title} hero={hero} hideImageCaption={true} />
          {pageData?.hero.type !== HeroTypes.DEFAULT && title && (
            <SharedTitle sharedTitle={title} background={{ backgroundColor: ingress.background }} />
          )}
          <BackgroundContainer className="py-16" background={{ backgroundColor: ingress.background }}>
            {ingress && <Blocks value={ingress.content} />}
          </BackgroundContainer>
        </>
      )}
      {hero.type === HeroTypes.BACKGROUND_IMAGE && (
        <>
          {hero?.figure?.image ? (
            <ImageBackgroundContainer
              image={hero.figure.image}
              overrideGradient
              scrimClassName="py-40 lg:py-44 black-blue-center-gradient"
              aspectRatio={'9:16'}
            >
              <div className="mx-auto max-w-viewport px-layout-lg max-lg:py-11">
                <Heading value={title} id="mainTitle" variant="h1" className="text-pretty" />
                <div className="pt-6">{ingress && <Blocks value={ingress.content} />}</div>
              </div>
            </ImageBackgroundContainer>
          ) : (
            <div className="mx-auto max-w-viewport px-layout-lg max-lg:py-11">
              <Heading value={title} id="mainTitle" variant="h1" className="text-pretty" />
              <div className="pt-6">{ingress && <Blocks value={ingress.content} />}</div>
            </div>
          )}
        </>
      )}
      {magazineTags && <MagazineTagBar tags={magazineTags} />}
      <PaginationContextProvider defaultRef={resultsRef}>
        <ul className="grid-cols-card mx-auto grid w-full max-w-viewport scroll-mt-24 auto-rows-fr content-center justify-center gap-8 px-layout-sm py-12">
          {isLoading &&
            Array.from({ length: 5 }, (_v, i) => i).map((item) => (
              <li key={item}>
                <CardSkeleton hideEyebrow hideIngress />
              </li>
            ))}
          {!isLoading &&
            pagedList?.[page]?.map((article) => (
              <li key={article.id}>
                <MagazineCard data={article} />
              </li>
            ))}
        </ul>
        {magazineList?.length > 12 && (
          <SimplePagination
            onNextPage={getNext}
            onPreviousPage={getPrevious}
            isFirstPage={page === 0}
            isLastPage={page === pagedList.length - 1}
            className="justify-center pt-12"
          />
        )}
      </PaginationContextProvider>
      <div className="pt-24">{footerComponent && <Teaser data={footerComponent} />}</div>
    </main>
  )
}
export default MagazineRoom
