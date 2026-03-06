import { HeroBlock, type HeroBlockProps } from '@/sections/Hero/HeroBlock'
import type { TopicPageSchema } from '../../types/index'
import { PageContent } from '../shared/SharedPageContent'

type TopicPageProps = TopicPageSchema

const TopicPage = ({
  breadcrumbs,
  hero,
  title,
  slug,
  ...restData
}: TopicPageProps) => {
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

  const heroBackground =
    hero?.type === 'backgroundImage'
      ? {
          type: 'backgroundImage',
          backgroundImage: hero.figure,
        }
      : hero?.background

  return (
    <main className='flex flex-col peer-data-[sticky=false]:pt-topbar'>
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
