'use client'
import { calendar } from '@equinor/eds-icons'
import FormattedDateTime from '@/core/FormattedDateTime/FormattedDateTime'
import TransformableIcon from '@/icons/TransformableIcon'
import {
  HeroBlock,
  type HeroBlockProps,
  HeroTypes,
} from '@/sections/Hero/HeroBlock'
import type { MagazineTag } from '@/sections/MagazineTags/MagazineTagBar'
import Teaser, { type TeaserData } from '@/sections/teasers/Teaser/Teaser'
import type { PageSchema } from '@/types/index'
import { PageContent } from '../shared/SharedPageContent'

type MagazinePageProps = {
  magazineTags?: MagazineTag[]
  tags?: string[]
  footerComponent?: {
    data?: TeaserData
  }
  hideFooterComponent?: boolean
} & PageSchema

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
  const heroProps: HeroBlockProps = {
    //@ts-ignore
    title,
    ...hero,
    subTitle: subTitle,
    //@ts-ignore
    magazineTags,
    //@ts-ignore
    tags,
    //@ts-ignore
    nextSectionDesignOptions: content?.[0]?.designOptions,
  }

  return (
    <main className='flex flex-col pt-topbar'>
      <HeroBlock {...heroProps} />
      <PageContent
        data={{
          content,
        }}
        heroBackground={
          hero.type !== HeroTypes.DEFAULT
            ? //@ts-ignore
              content?.[0]?.designOptions.background
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
