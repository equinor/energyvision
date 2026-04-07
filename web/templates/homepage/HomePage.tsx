import type { PortableTextBlock } from 'next-sanity'
import type { HeaderData } from '@/contexts/pageContext'
import type { BreadcrumbData } from '@/core/Breadcrumbs/Breadcrumbs'
import { PageWrapper } from '@/sanity/pages/PageWrapper'
import {
  HeroBlock,
  type HeroBlockProps,
  type HeroData,
  HeroTypes,
} from '@/sections/Hero/HeroBlock'
import { PageContent } from '@/templates/shared/SharedPageContent'
import type { ContentType, SeoData, Templates } from '../../types/index'

type HomePageProps = {
  headerData?: HeaderData
  slug: string
  title: PortableTextBlock[]
  titleStyle: string
  firstPublishedAt?: string
  hero: HeroData
  template: Templates
  seoAndSome: SeoData
  content?: ContentType[]
  id: string
  type: string
  breadcrumbs: BreadcrumbData
}

const HomePage = ({
  headerData = { slugs: [] },
  hero,
  title,
  ...restData
}: HomePageProps) => {
  const heroProps: HeroBlockProps = {
    heroData: {
      title,
      ...hero,
    },
    //@ts-ignore
    nextSectionDesignOptions: restData?.content?.[0]?.designOptions,
  }

  return (
    <PageWrapper headerData={headerData}>
      <main className='flex flex-col pt-topbar peer-data-[sticky=true]:pt-0'>
        <HeroBlock {...heroProps} />
        <PageContent
          data={restData}
          heroBackground={
            hero?.type !== HeroTypes.DEFAULT
              ? //@ts-ignore
                restData?.content?.[0]?.designOptions.background
              : hero?.background
          }
        />
      </main>
    </PageWrapper>
  )
}

export default HomePage
