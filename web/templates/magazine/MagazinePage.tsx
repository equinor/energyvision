'use client'
import { calendar } from '@equinor/eds-icons'
import type { PortableTextBlock } from 'next-sanity'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import TransformableIcon from '@/icons/TransformableIcon'
import { twMerge } from '@/lib/twMerge/twMerge'
import {
  HeroBlock,
  type HeroBlockProps,
  type HeroData,
  HeroTypes,
} from '@/sections/Hero/HeroBlock'
import type { MagazineTag } from '@/sections/MagazineTags/MagazineTagBar'
import Teaser, { type TeaserData } from '@/sections/teasers/Teaser/Teaser'
import type { ContentType } from '@/types/index'
import { PageContent } from '../shared/SharedPageContent'

type MagazinePageProps = {
  magazineTags?: MagazineTag[]
  tags?: string[]
  footerComponent?: {
    data?: TeaserData
  }
  title: PortableTextBlock[]
  content?: ContentType[]
  hero: HeroData
  firstPublishedAt?: string
  hideFooterComponent?: boolean
}

const MagazinePage = ({
  hideFooterComponent,
  footerComponent,
  hero,
  title,
  firstPublishedAt,
  tags,
  magazineTags,
  content,
}: MagazinePageProps) => {
  const type = hero?.type || HeroTypes.DEFAULT

  const subTitle = (
    <>
      <div
        className={twMerge(
          `flex flex-col gap-6 pb-10`,
          type === HeroTypes.FULL_WIDTH_IMAGE && 'px-layout-sm lg:px-layout-lg',
        )}
      >
        {firstPublishedAt && (
          <div className='flex items-center gap-2'>
            <TransformableIcon iconData={calendar} className='-mt-1' />
            <FormattedDateTime
              variant='datetime'
              datetime={firstPublishedAt}
              className='text-base'
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

  const heroBlockProps: HeroBlockProps = {
    heroData: {
      //@ts-ignore: todo
      title,
      ...hero,
      //@ts-ignore
      magazineTags,
      figCaptionClassName: 'hidden',
      subTitle: subTitle,
    },
    //@ts-ignore
    //tags,
    //@ts-ignore
    nextSectionDesignOptions: content?.[0]?.designOptions,
  }

  const heroProps = {
    background:
      hero.type !== HeroTypes.DEFAULT
        ? //@ts-ignore
          content?.[0]?.designOptions.background
        : hero?.background,
    heroType: hero?.type,
    heroHasBreadcrumbs: false,
  }

  return (
    <main className='mx-auto flex w-full max-w-fullwidth flex-col'>
      <HeroBlock {...heroBlockProps} />
      <PageContent
        data={{
          content,
        }}
        heroProps={heroProps}
      />
      {!hideFooterComponent && footerComponent?.data && (
        <Teaser data={footerComponent.data} />
      )}
    </main>
  )
}

export default MagazinePage
