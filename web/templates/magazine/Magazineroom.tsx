import type { MagazineIndexPageType } from '../../types'
import { useMemo, useRef, useState } from 'react'
import Seo from '../../pageComponents/shared/Seo'
import { HeroTypes } from '../../types/index'
import { BackgroundContainer } from '@components'
import Teaser from '../../pageComponents/shared/Teaser'
import SharedTitle from '../../pageComponents/pageTemplates/shared/SharedTitle'
import { SharedBanner } from '../../pageComponents/pageTemplates/shared/SharedBanner'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import MagazineTagBar from '@sections/MagazineTags/MagazineTagBar'
import { useRouter } from 'next/router'
import { ImageBackgroundContainer } from '@components/Backgrounds/ImageBackgroundContainer'
import { Heading } from '@core/Typography'
import MagazineCard from '@sections/cards/MagazineCard/MagazineCard'
import { SimplePagination } from '@core/SimplePagination/SimplePagination'
import { Ratios } from '../../pageComponents/shared/SanityImage'
import CardSkeleton from '@sections/cards/CardSkeleton/CardSkeleton'

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

const MagazineRoom = ({ pageData, slug }: MagazineIndexTemplateProps) => {
  const { ingress, title, hero, seoAndSome, magazineTags, magazineArticles, footerComponent } = pageData || {}
  const resultsRef = useRef<HTMLUListElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const parentSlug =
    (router.locale !== router.defaultLocale ? `/${router.locale}` : '') +
    router.asPath.substring(router.asPath.indexOf('/'), router.asPath.lastIndexOf('/'))

  const magazineList = useMemo(() => magazineArticles, [magazineArticles])
  const pagedList = useMemo(() => chunkArray(magazineList, 12), [magazineList])
  const [page, setPage] = useState(0)

  const scrollToTop = () => {
    if (resultsRef?.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const getNext = async () => {
    setIsLoading(true)
    setPage(page + 1)
    scrollToTop()
    setIsLoading(false)
  }
  const getPrevious = async () => {
    setIsLoading(true)
    setPage(page - 1)
    scrollToTop()
    setIsLoading(false)
  }

  const handleClickTag = (tagValue: string) => {
    if (tagValue === 'ALL') {
      delete router.query.filter
      router.push({
        pathname: parentSlug,
      })
    } else {
      router.push({
        pathname: parentSlug,
        query: {
          tag: tagValue,
        },
      })
    }
  }

  return (
    <>
      <Seo seoAndSome={seoAndSome} slug={slug} pageTitle={title} />
      <main>
        {hero.type !== HeroTypes.BACKGROUND_IMAGE && (
          <>
            <SharedBanner title={title} hero={hero} hideImageCaption={true} />
            {pageData?.hero.type !== HeroTypes.DEFAULT && title && (
              <SharedTitle sharedTitle={title} background={{ backgroundColor: ingress.background }} />
            )}
            <BackgroundContainer background={{ backgroundColor: ingress.background }}>
              <div className="px-layout-lg py-16">{ingress && <Blocks value={ingress.content} />}</div>
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
                aspectRatio={Ratios.NINE_TO_SIXTEEN}
              >
                <div className="px-layout-lg mx-auto max-w-viewport max-lg:py-11">
                  <Heading value={title} id="mainTitle" variant="h1" className="text-pretty" />
                  <div className="pt-6">{ingress && <Blocks value={ingress.content} />}</div>
                </div>
              </ImageBackgroundContainer>
            ) : (
              <div className="px-layout-lg mx-auto max-w-viewport max-lg:py-11">
                <Heading value={title} id="mainTitle" variant="h1" className="text-pretty" />
                <div className="pt-6">{ingress && <Blocks value={ingress.content} />}</div>
              </div>
            )}
          </>
        )}
        {magazineTags && <MagazineTagBar tags={magazineTags} href={parentSlug} onClick={handleClickTag} />}
        <ul
          ref={resultsRef}
          className="
          py-12
          w-full
          mx-auto
          max-w-viewport
          px-layout-sm
          grid
          gap-8 
          justify-center 
          content-center
          grid-cols-card
          auto-rows-fr
          scroll-mt-24"
        >
          {isLoading &&
            Array.from({ length: 5 }, (_v, i) => i).map((item) => (
              <li key={item}>
                <CardSkeleton hideEyebrow hideIngress />
              </li>
            ))}
          {!isLoading &&
            pagedList[page].map((article) => (
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
        <div className="pt-24">{footerComponent && <Teaser data={footerComponent} />}</div>
      </main>
    </>
  )
}
export default MagazineRoom
