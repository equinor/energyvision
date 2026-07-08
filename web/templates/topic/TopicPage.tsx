import type { PortableTextBlock } from 'next-sanity'
import type { BreadcrumbData } from '@/core/Breadcrumbs/Breadcrumbs'
import {
  HeroBlock,
  type HeroBlockProps,
  type HeroData,
  HeroTypes,
} from '@/sections/Hero/HeroBlock'
import type {
  Background,
  ContentType,
  SeoData,
  Templates,
} from '../../types/index'
import { PageContent } from '../shared/SharedPageContent'

export type TopicPageProps = {
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

const TopicPage = ({
  breadcrumbs,
  hero,
  title,
  slug,
  ...restData
}: TopicPageProps) => {
  const heroBlockProps: HeroBlockProps = {
    heroData: {
      //@ts-ignore: todo
      title,
      ...hero,
      type: restData?.isCampaign ? HeroTypes.NO_HERO : hero?.type,
    },
    breadcrumbs: {
      currentSlug: slug,
      ...breadcrumbs,
    },
    //@ts-ignore
    nextSectionDesignOptions: restData?.content?.[0]?.designOptions,
  }

  const componentAfterHeroNeedsNoPt =
    hero?.type === 'fiftyFifty' || breadcrumbs?.enableBreadcrumbs

  const heroHasBreadcrumbs =
    hero?.type === 'backgroundImage'
      ? breadcrumbs?.enableBreadcrumbs
      : componentAfterHeroNeedsNoPt

  const heroBackground: Background =
    hero?.type === 'backgroundImage'
      ? {
          type: 'backgroundImage',
          backgroundImage: hero.figure,
        }
      : {
          type: 'backgroundColor',
          ...(hero?.background
            ? {
                backgroundUtility: hero.background as NonNullable<
                  Background['backgroundUtility']
                >,
              }
            : {}),
        }

  const heroProps = {
    background: heroBackground,
    heroType: hero?.type,
    heroHasBreadcrumbs,
  }

  return (
    <main className='mx-auto flex w-full max-w-fullwidth flex-col'>
      <HeroBlock {...heroBlockProps} />
      <PageContent data={restData} heroProps={heroProps} />
    </main>
  )
}

export default TopicPage
