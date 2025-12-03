import {
  HeroBlock,
  type HeroBlockProps,
  HeroTypes,
} from '@/sections/Hero/HeroBlock'
import { PageContent } from '@/templates/shared/SharedPageContent'
import type { HomePageSchema } from '../../types/index'

type HomePageProps = {
  data: HomePageSchema
}

const HomePage = ({ data }: HomePageProps) => {
  const { hero, title, ...restData } = data
  console.log('HomePage hero', hero)
  console.log('data.title', data.title)
  const heroProps: HeroBlockProps = {
    //@ts-ignore
    title: title,
    ...hero,
    //@ts-ignore
    nextSectionDesignOptions: restData?.content?.[0]?.designOptions,
  }
  return (
    <main className='flex flex-col [:not(:has(.sticky-menu))]:pt-topbar'>
      <HeroBlock {...heroProps} />
      {/*       {data.isCampaign ? (
        <h1 className='sr-only'>{toPlainText(data.title)}</h1>
      ) : (
        <SharedBanner
          title={data.title}
          hero={data.hero}
          captionBg={titleStyles.background?.backgroundColor}
        />
      )}
      {breadcrumbs?.enableBreadcrumbs && (
        <Breadcrumbs
          designOptions={{ background: titleStyles.background ?? {} }}
          slug={data?.slug}
          useCustomBreadcrumbs={breadcrumbs?.useCustomBreadcrumbs}
          defaultBreadcrumbs={breadcrumbs?.defaultBreadcrumbs}
          customBreadcrumbs={breadcrumbs?.customBreadcrumbs}
          className={data?.hero?.type === HeroTypes.DEFAULT ? 'pt-0' : ''}
        />
      )}

      {data?.hero?.type !== HeroTypes.DEFAULT && !data?.isCampaign && (
        <SharedTitle
          sharedTitle={data.title}
          background={titleStyles?.background}
        />
      )} */}
      <PageContent
        data={data}
        heroBackground={
          hero.type !== HeroTypes.DEFAULT
            ? //@ts-ignore
              restData?.content?.[0]?.designOptions.background
            : hero?.background
        }
      />
    </main>
  )
}

export default HomePage
