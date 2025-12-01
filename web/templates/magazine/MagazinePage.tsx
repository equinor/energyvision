'use client'
import {
  HeroBlock,
  type HeroBlockProps,
  HeroTypes,
} from '@/sections/Hero/HeroBlock'
import Teaser from '../../sections/teasers/Teaser/Teaser'
import type { MagazinePageSchema } from '../../types/index'
import { PageContent } from '../shared/SharedPageContent'

type MagazinePageProps = {
  data: MagazinePageSchema
}

const MagazinePage = ({ data }: MagazinePageProps) => {
  const { hideFooterComponent, footerComponent, hero, title, ...restData } =
    data || {}
  const tags = (data?.tags as string[] | undefined) ?? []
  const heroProps: HeroBlockProps = {
    //@ts-ignore
    title: title,
    ...hero,
    tags,
    //@ts-ignore
    nextSectionDesignOptions: restData?.content?.[0]?.designOptions,
  }

  return (
    <main className='flex flex-col [:not(:has(.sticky-menu))]:pt-topbar'>
      {/*       <SharedBanner
        title={data?.title}
        hero={data?.hero}
        hideImageCaption={true}
        {...(heroType === HeroTypes.DEFAULT ? { tags } : {})}
      />
      {data?.magazineTags && <MagazineTagBar tags={data?.magazineTags} />}
      {heroType !== HeroTypes.DEFAULT && (
        <SharedTitle
          sharedTitle={data?.title}
          background={titleStyles.background}
        />
      )} */}
      <HeroBlock {...heroProps} />
      {/*       {heroType !== HeroTypes.DEFAULT && (
        <div className='mx-auto px-layout-lg pb-6'>
          {tags.length > 0 && (
            <ul className='flex flex-wrap gap-y-4 divide-x-2 divide-energy-red-100'>
              {tags.map(tag => (
                <li
                  key={`magazine_tag_key_${tag}`}
                  className='inline-block whitespace-nowrap pr-3 pl-3 font-medium text-sm first:pl-0 lg:text-xs'
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      )} */}
      <PageContent
        data={data}
        heroBackground={
          hero.type !== HeroTypes.DEFAULT
            ? restData?.content?.[0]?.designOptions.background
            : hero?.background
        }
      />
      {!hideFooterComponent && footerComponent?.data && (
        <Teaser data={footerComponent.data} />
      )}
    </main>
  )
}

export default MagazinePage
