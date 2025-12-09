import {
  HeroBlock,
  type HeroBlockProps,
  HeroTypes,
} from '@/sections/Hero/HeroBlock'
import type { TopicPageSchema } from '../../types/index'
import { PageContent } from '../shared/SharedPageContent'

type TopicPageProps = TopicPageSchema

const TopicPage = ({ breadcrumbs, hero, title, slug, ...restData }: TopicPageProps) => {

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
    <main className='flex flex-col pt-topbar peer-data-[sticky=true]:pt-0'>
      <HeroBlock {...heroProps} />
      <PageContent
        data={restData}
        heroBackground={
          hero?.type !== HeroTypes.DEFAULT
            ? //@ts-ignore
              restData?.content?.[0]?.designOptions?.background
            : hero?.background
        }
      />
    </main>
  )
}

export default TopicPage
