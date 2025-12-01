import {
  HeroBlock,
  type HeroBlockProps,
  HeroTypes,
} from '@/sections/Hero/HeroBlock'
import type { TopicPageSchema } from '../../types/index'
import { PageContent } from '../shared/SharedPageContent'

type TopicPageProps = {
  data: TopicPageSchema
}

const TopicPage = ({ data }: TopicPageProps) => {
  const { breadcrumbs, hero, title, slug, ...restData } = data
  console.log('TopicPage hero', hero)

  const heroProps: HeroBlockProps = {
    //@ts-ignore
    title: title,
    ...hero,
    breadcrumbs: {
      currentSlug: slug,
      ...breadcrumbs,
    },
    //@ts-ignore
    nextSectionDesignOptions: restData?.content?.[0]?.designOptions,
  }

  return (
    <main className='flex flex-col [:not(:has(.sticky-menu))]:pt-topbar'>
      <HeroBlock {...heroProps} />
      <PageContent
        data={data}
        heroBackground={
          hero.type !== HeroTypes.DEFAULT
            ? restData?.content?.[0]?.designOptions?.background
            : hero?.background
        }
      />
    </main>
  )
}

export default TopicPage
