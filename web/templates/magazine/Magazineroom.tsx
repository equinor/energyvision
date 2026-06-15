'use client'
import { useLocale } from 'next-intl'
import type { PortableTextBlock } from 'next-sanity'
import { useMemo, useRef, useState } from 'react'
import { Promotion } from '@/core/Promotion/Promotion'
import { SimplePagination } from '@/core/SimplePagination/SimplePagination'
import { defaultLanguage } from '@/languageConfig'
import { chunkArray } from '@/lib/helpers/chunkArray'
import Blocks from '@/portableText/Blocks'
import { getLocaleFromIso } from '@/sanity/helpers/localization'
import CardSkeleton from '@/sections/cards/CardSkeleton/CardSkeleton'
import { HeroBlock, type HeroData, HeroTypes } from '@/sections/Hero/HeroBlock'
import MagazineTagBar from '@/sections/MagazineTags/MagazineTagBar'
import { PaginationContextProvider } from '../../contexts/PaginationContext'
import Teaser, { type TeaserData } from '../../sections/teasers/Teaser/Teaser'
import type { MagazineCardData, SeoData } from '../../types'

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

  const pagedList = useMemo(
    () => chunkArray(magazineArticles ?? [], 12),
    [magazineArticles],
  )

  const [pageIdx, setPage] = useState(0)
  const { type } = hero

  const heroProps = {
    heroData: {
      //@ts-ignore: todo
      title,
      ...hero,
    },
    ...(type === HeroTypes.BACKGROUND_IMAGE && {
      isMagazineRoom: true,
      ingress,
    }),
    className: 'lg:pb-20',
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

  const iso = useLocale()

  return (
    <main className='mx-auto flex w-full max-w-fullwidth flex-col'>
      {/*@ts-ignore*/}
      <HeroBlock {...heroProps} />
      {!(type === HeroTypes.BACKGROUND_IMAGE) && ingress && (
        <Blocks
          //@ts-ignore
          value={ingress}
          group='article'
          className='mx-auto max-w-content'
        />
      )}
      {magazineTags?.length > 0 && <MagazineTagBar tags={magazineTags} />}
      <PaginationContextProvider defaultRef={resultsRef}>
        <ul className='mx-auto grid w-full max-w-content max-w-viewport scroll-mt-24 auto-rows-fr grid-cols-card content-center justify-center gap-8 px-layout-sm py-12'>
          {isLoading &&
            Array.from({ length: 5 }, (_v, i) => i).map(item => (
              <li key={item}>
                <CardSkeleton hideEyebrow hideIngress />
              </li>
            ))}
          {!isLoading &&
            pagedList?.[pageIdx]?.map(article => {
              const locale =
                iso !== defaultLanguage.iso ? `/${getLocaleFromIso(iso)}` : ''
              const href = (article?.slug && locale + article?.slug) || ''
              return (
                <li key={article.id}>
                  <Promotion
                    href={href}
                    image={article?.hero?.figure?.image}
                    title={article?.title}
                    type='extended'
                  />
                  {/* <MagazineCard data={article} /> */}
                </li>
              )
            })}
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
