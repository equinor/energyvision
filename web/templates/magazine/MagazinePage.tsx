'use client'
import { calendar } from '@equinor/eds-icons'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import TransformableIcon from '@/icons/TransformableIcon'
import Blocks from '@/portableText/Blocks'
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
  const {
    hideFooterComponent,
    footerComponent,
    hero,
    title,
    firstPublishedAt,
    tags,
    magazineTags,
    ...restData
  } = data || {}

  console.log('tags', tags)

  const subTitle = (
    <>
      <div className='flex flex-col gap-6 px-layout-sm pb-6 lg:px-layout-md'>
        {firstPublishedAt && (
          <div className='flex items-center gap-2'>
            <TransformableIcon iconData={calendar} className='-mt-1' />
            <FormattedDateTime
              datetime={firstPublishedAt}
              className='text-sm'
            />
          </div>
        )}
        {tags && tags?.filter(e => e).length > 0 && (
          <ul className='flex flex-wrap gap-y-4 divide-x-2 divide-energy-red-100'>
            {tags.map(tag => (
              <li
                key={`magazine_tag_key_${tag}`}
                className='whitespace-nowrap px-3 font-medium text-sm first:pl-0 lg:text-xs'
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
  /*
  *
      {tags && tags?.length > 0 && (
        <div className='px-layout-sm pb-12 lg:px-layout-md'>
          {tags && tags?.length > 0 && (
            <ul className='flex flex-wrap gap-y-4 divide-x-2 divide-energy-red-100'>
              {tags.map((tag: string) => {
                console.log('tag', tag)
                return (
                  <span
                    key={`magazine_tag_key_${tag?.id}`}
                    className='inline-block whitespace-nowrap pr-3 pl-3 font-medium text-sm first:pl-0 lg:text-xs'
                  >
                    {tag?.title}
                  </span>
                )
              })}
            </ul>
          )}
        </div>
      )}  */
  const heroProps: HeroBlockProps = {
    //@ts-ignore
    title: title,
    ...hero,
    subTitle: subTitle,
    magazineTags,
    tags,
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
