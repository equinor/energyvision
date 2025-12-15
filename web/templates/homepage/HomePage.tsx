import type { HeaderData } from '@/contexts/pageContext'
import { PageWrapper } from '@/sanity/pages/PageWrapper'
import {
  HeroBlock,
  type HeroBlockProps,
  HeroTypes,
} from '@/sections/Hero/HeroBlock'
import { PageContent } from '@/templates/shared/SharedPageContent'
import type { HomePageSchema } from '../../types/index'

type HomePageProps = { headerData?: HeaderData } & HomePageSchema

const HomePage = ({
  headerData = { slugs: [] },
  hero,
  title,
  ...restData
}: HomePageProps) => {
  const heroProps: HeroBlockProps = {
    //@ts-ignore
    title: title,
    ...hero,
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
