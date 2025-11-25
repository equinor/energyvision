import type { PortableTextBlock } from '@portabletext/types'
import Blocks from '@/portableText/Blocks'
import type { ImageWithCaptionData } from '../../types/index'
import DefaulHeroImage from './DefaultHeroImage'

type Props = {
  title?: PortableTextBlock[]
  image?: ImageWithCaptionData
  isBigTitle?: boolean
  bigTitle?: PortableTextBlock[]
  /* Magazine */
  tags?: string[]
}

export const DefaultHero = ({
  title,
  image,
  isBigTitle,
  bigTitle,
  tags,
}: Props) => {
  return (
    <>
      {isBigTitle && (
        <>
          <div className='pt-10 pr-16 pb-0 pl-layout-sm'>
            {title && <Blocks value={title} as='h1' variant='xl' />}
          </div>
          <div className='px-layout-sm py-10'>
            {bigTitle && <Blocks value={bigTitle} as='h2' variant='3xl' />}
          </div>
        </>
      )}
      {!isBigTitle && (
        <div className='px-layout-md py-10'>
          {title && <Blocks value={title} as='h1' variant='3xl' />}
        </div>
      )}
      {tags && tags?.length > 0 && (
        <div className='px-layout-md pb-12'>
          {tags && tags?.length > 0 && (
            <ul className='flex flex-wrap gap-y-4 divide-x-2 divide-energy-red-100'>
              {tags.map((tag: string) => {
                return (
                  <span
                    key={`magazine_tag_key_${tag}`}
                    className='inline-block whitespace-nowrap pr-3 pl-3 font-medium text-sm first:pl-0 lg:text-xs'
                  >
                    {tag}
                  </span>
                )
              })}
            </ul>
          )}
        </div>
      )}

      {image && (
        <DefaulHeroImage className='px-layout-sm pt-0 pb-16' data={image} />
      )}
    </>
  )
}
