import type { PortableTextBlock } from '@portabletext/types'
import { twMerge } from 'tailwind-merge'
import { FigureCaption } from '@components'
import Image from '../../../SanityImage'
import type { ImageWithAlt } from '../../../../../types/types'

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
      className={twMerge(`
        py-0
        px-layout-md
        mx-auto
        w-full
        ${layout !== 'full' ? 'md:w-1/2' : ''}
        ${layout === 'right' ? 'md:float-right md:pl-8' : ''}
        ${layout === 'left' ? 'md:float-left md:pr-8' : ''}
        mt-8
        mb-12
        lg:mb-14
      `)}
    >
      {layout === 'full' ? (
        <Image
          image={image}
          sizes="
            (max-width: 340px) 295px,
            (max-width: 600px) 451px,
            (max-width: 950px) 642px,
            (max-width: 1250px) 805px,
            (max-width: 1450px) 915px,
            (max-width: 1700px) 1049px,
            1184px
          "
          maxWidth={1184}
        />
      ) : (
        <Image
          image={image}
          sizes="
            (max-width: 340px) 295px,
            (max-width: 600px) 451px,
            (max-width: 800px) 560px,
            (max-width: 900px) 290px,
            (max-width: 1250px) 390px,
            (max-width: 1450px) 436px,
            (max-width: 1700px) 503px,
            570px
          "
          maxWidth={570}
        />
      )}
      {(caption || attribution) && (
        <FigureCaption>
          {caption && <FigureCaption.Caption>{caption}</FigureCaption.Caption>}
          {attribution && <FigureCaption.Attribution>{attribution}</FigureCaption.Attribution>}
        </FigureCaption>
      )}
    </figure>
  )
}
