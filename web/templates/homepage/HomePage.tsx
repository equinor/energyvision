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
  //To be removed after launch and studios is updated with NoHero type instead
  isCampaign?: boolean
}

const HomePage = ({ hero, title, ...restData }: HomePageProps) => {
  const heroBlockProps: HeroBlockProps = {
    heroData: {
      //@ts-ignore
      title,
      ...hero,
      type: restData?.isCampaign ? HeroTypes.NO_HERO : hero?.type,
    },
    //@ts-ignore
    nextSectionDesignOptions: restData?.content?.[0]?.designOptions,
  }

  const heroProps = {
    background:
      hero?.type !== HeroTypes.DEFAULT
        ? //@ts-ignore
          restData?.content?.[0]?.designOptions.background
        : hero?.background,
    heroType: hero?.type,
    heroHasBreadcrumbs: false,
  }

  return (
    <main className='mx-auto flex w-full max-w-fullwidth flex-col'>
      <HeroBlock {...heroBlockProps} />
      <PageContent data={restData} heroProps={heroProps} />
    </main>
  )
}

export default HomePage
