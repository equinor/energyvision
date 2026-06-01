import type { PortableTextBlock } from 'next-sanity'
import type { BreadcrumbData } from '@/core/Breadcrumbs/Breadcrumbs'
import {
  HeroBlock,
  type HeroBlockProps,
  type HeroData,
  HeroTypes,
} from '@/sections/Hero/HeroBlock'
import { PageContent } from '@/templates/shared/SharedPageContent'
import type { ContentType, SeoData, Templates } from '../../types/index'

type HomePageProps = {
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

const HomePage = ({ hero, title, ...restData }: HomePageProps) => {
  const heroProps: HeroBlockProps = {
    heroData: {
      //@ts-ignore
      title,
      ...hero,
    },
    //@ts-ignore
    nextSectionDesignOptions: restData?.content?.[0]?.designOptions,
  }

  return (
    <main className='mx-auto flex w-full max-w-fullwidth flex-col'>
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
  )
}

export default HomePage
