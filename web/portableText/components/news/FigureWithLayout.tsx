import type { PortableTextBlock } from '@portabletext/types'
import { twMerge } from 'tailwind-merge'

import type { ImageWithAlt } from '../../../types/index'
import { FigureCaption } from '@/core/FigureCaption/FigureCaption'
import { Image } from '@/core/Image/Image'

type Layout = 'full' | 'left' | 'right'

type FigureNode = {
  _key: string
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: ImageWithAlt
  layout: Layout
}

type BlockProps = {
  isInline: boolean
  value: FigureNode
} & PortableTextBlock

export const FigureWithLayout = (block: BlockProps) => {
  const { value } = block
  const { image, caption, attribution, layout = 'full' } = value
  if (!image) return null

  return (
    <figure
      className={twMerge(
        `mx-auto w-full px-layout-md py-0 ${layout !== 'full' ? 'md:w-1/2' : ''} ${layout === 'right' ? 'md:float-right md:pl-8' : ''} ${layout === 'left' ? 'md:float-left md:pr-8' : ''} mt-14 mb-16`,
      )}
    >
      <Image image={image} grid={layout === 'full' ? 'full' : 'xs'} aspectRatio={layout === 'full' ? '16:9' : '4:3'} />
      {(caption || attribution) && (
        <FigureCaption>
          {caption && <div>{caption}</div>}
          {attribution && <div>{attribution}</div>}
        </FigureCaption>
      )}
    </figure>
  )
}
