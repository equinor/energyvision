import type { PortableTextBlock } from 'next-sanity'
import type { BreadcrumbData } from '@/core/Breadcrumbs/Breadcrumbs'
import {
  HeroBlock,
  type HeroBlockProps,
  type HeroData,
} from '@/sections/Hero/HeroBlock'
import type { ContentType, SeoData, Templates } from '../../types/index'
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
}

const TopicPage = ({
  breadcrumbs,
  hero,
  title,
  slug,
  ...restData
}: TopicPageProps) => {
  const heroProps: HeroBlockProps = {
    heroData: {
      //@ts-ignore: todo
      title,
      ...hero,
    },
    breadcrumbs: {
      currentSlug: slug,
      ...breadcrumbs,
    },
    //@ts-ignore
    nextSectionDesignOptions: restData?.content?.[0]?.designOptions,
  }

  const heroBackground =
    hero?.type === 'backgroundImage'
      ? {
          type: 'backgroundImage',
          backgroundImage: hero.figure,
        }
      : hero?.background

  return (
    <main className='flex flex-col pt-topbar peer-data-[sticky=true]:pt-topbar-and-sticky'>
      <HeroBlock {...heroProps} />
      <PageContent
        data={restData}
        heroBackground={
          hero?.type !== 'default' && hero?.type !== 'backgroundImage'
            ? //@ts-ignore
              restData?.content?.[0]?.designOptions?.background
            : heroBackground
        }
      />
    </main>
  )
}

export default TopicPage
