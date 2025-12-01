'use client'
import type { PortableTextBlock } from 'next-sanity'
import { useMemo, useRef, useState } from 'react'
import { ImageBackgroundContainer } from '@/core/Backgrounds/ImageBackgroundContainer'
import { SimplePagination } from '@/core/SimplePagination/SimplePagination'
import CardSkeleton from '@/sections/cards/CardSkeleton/CardSkeleton'
import MagazineCard from '@/sections/cards/MagazineCard/MagazineCard'
import { HeroBlock, type HeroData } from '@/sections/Hero/HeroBlock'
import MagazineTagBar from '@/sections/MagazineTags/MagazineTagBar'
import { getBgAndDarkFromBackground } from '@/styles/colorKeyToUtilityMap'
import { PaginationContextProvider } from '../../lib/contexts/PaginationContext'
import Blocks from '../../portableText/Blocks'
import Teaser, { type TeaserData } from '../../sections/teasers/Teaser/Teaser'
import type {
  Background,
  DesignOptions,
  ImageWithCaptionData,
  MagazineCardData,
  SeoData,
} from '../../types'

const chunkArray = (array: any[] = [], chunkSize: number) => {
  const chunkedArray = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize))
  }
  return chunkedArray
}

export type MagazineIndexPageData = {
  seoAndSome: SeoData
  title: PortableTextBlock[]
  hero: HeroData
  ingress: {
    content: PortableTextBlock[]
    background: Background
  }
  query?: any
  magazineArticles: MagazineCardData[]
  heroImage: ImageWithCaptionData
  footerComponent?: TeaserData
  magazineTags: { id: string; title: string; key: string }[]
  background: Background
}
// Sanity MagazineIndexPage
type MagazineRoomProps = {
  pageData: MagazineIndexPageData
  slug?: string
}

const MagazineRoom = ({ pageData }: MagazineRoomProps) => {
  const {
    ingress,
    title,
    hero,
    magazineTags,
    magazineArticles,
    footerComponent,
  } = pageData || {}
  const isArray = Array.isArray(pageData)
  const page = isArray ? null : (pageData as any)

  const resultsRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const magazineList = useMemo(() => {
    if (isArray) return (pageData as any[]) || []
    return page?.magazineArticles || []
  }, [isArray, pageData, page])

  const pagedList = useMemo(
    () => chunkArray(magazineList || [], 12),
    [magazineList],
  )
  const [pageIdx, setPage] = useState(0)

  const { figure, ratio } = hero
  console.log('Magazieneroom hero', hero)
  const heroBackground = ingress ? ingress.background : undefined

  const heroProps = {
    title,
    figure,
    ratio,
    ingress: ingress.content,
    //@ts-ignore
    background: heroBackground.background,
    className: `${ingress.background.dark ? 'dark' : ''}`,
    tags: magazineTags,
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
    <main className='flex flex-col [:not(:has(.sticky-menu))]:pt-topbar'>
      <HeroBlock {...heroProps} />

      {/*       {!!hero && hero?.type !== HeroTypes.BACKGROUND_IMAGE && (
        <>
          <SharedBanner title={title} hero={hero} hideImageCaption={true} />
          {hero?.type !== HeroTypes.DEFAULT && title && (
            <div className='py-11'>
              <SharedTitle
                sharedTitle={title}
                background={{ backgroundColor: ingress?.background }}
              />
            </div>
          )}
          <div
            className={`w-full ${bg} ${dark ? 'dark' : ''} mx-auto px-layout-sm pb-16 max-lg:py-11 lg:px-layout-lg`}
          >
            {ingress?.content && <Blocks value={ingress.content} />}
          </div>
        </>
      )}
      {!!hero && hero?.type === HeroTypes.BACKGROUND_IMAGE && (
        <>
          {hero?.figure?.image ? (
            <ImageBackgroundContainer
              image={hero.figure.image}
              overrideGradient
              scrimClassName='py-40 lg:py-44 black-blue-center-gradient'
              aspectRatio={'9:16'}
            >
              <div className='mx-auto px-layout-lg max-lg:py-11'>
                <Blocks value={title} id='mainTitle' variant='h1' />
                <div className='pt-6'>
                  {ingress?.content && <Blocks value={ingress.content} />}
                </div>
              </div>
            </ImageBackgroundContainer>
          ) : (
            <div className='mx-auto px-layout-lg max-lg:py-11'>
              <Blocks value={title} id='mainTitle' variant='h1' />
              <div className='pt-6'>
                {ingress?.content && <Blocks value={ingress.content} />}
              </div>
            </div>
          )}
        </>
      )} */}
      {/*       {magazineTags?.length > 0 && <MagazineTagBar tags={magazineTags} />} */}
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
        {magazineList?.length > 12 && (
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
