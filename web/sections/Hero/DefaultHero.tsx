import type { ImageWithCaptionData } from '../../types/index'
import DefaulHeroImage from './DefaultHeroImage'
import { PortableTextBlock } from '@portabletext/types'
import { Heading } from '@core/Typography'
import MagazineDate from '@templates/magazine/MagazineDate'
import { Fragment } from 'react'

type Props = {
  title?: PortableTextBlock[]
  image?: ImageWithCaptionData
  isBigTitle?: boolean
  bigTitle?: PortableTextBlock[]
  /* Magazine */
  tags?: string[]
  publishedDate?: string
}

export const DefaultHero = ({ title, image, isBigTitle, bigTitle, tags, publishedDate }: Props) => {
  const spacingClassNames = isBigTitle ? 'mx-auto px-layout-sm max-w-viewport' : 'max-w-[1186px] mx-auto'
  const Wrapper = isBigTitle ? Fragment : (`div` as React.ElementType)
  return (
    <>
      <Wrapper className={`${isBigTitle ? '' : 'py-10 px-layout-md'}`}>
        {isBigTitle && (
          <>
            <div className={`pt-10 pr-16 pb-0 ${spacingClassNames}`}>
              {title && <Heading value={title} as="h1" variant="xl" />}
            </div>
            <div className={`py-10 ${spacingClassNames}`}>
              {bigTitle && <Heading value={bigTitle} as="h2" variant="3xl" />}
            </div>
          </>
        )}

        {!isBigTitle && (
          <>{title && <Heading className={`${spacingClassNames} pb-10`} value={title} as="h1" variant="3xl" />}</>
        )}

        {publishedDate && <MagazineDate classname={spacingClassNames} firstPublishedAt={publishedDate} />}

        {tags && tags?.length > 0 && (
          <div className={`${spacingClassNames} pb-12`}>
            {tags && tags?.length > 0 && (
              <ul className="flex flex-wrap gap-y-4 divide-x-2 divide-energy-red-100">
                {tags.map((tag: string) => {
                  return (
                    <span
                      key={`magazine_tag_key_${tag}`}
                      className="inline-block text-sm font-medium pl-3 pr-3 first:pl-0 lg:text-xs whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  )
                })}
              </ul>
            )}
          </div>
        )}
      </Wrapper>
      {image && <DefaulHeroImage className="pt-0 px-layout-sm pb-16 max-w-viewport mx-auto" data={image} />}
    </>
  )
}
