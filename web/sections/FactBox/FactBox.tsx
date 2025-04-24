import type { PortableTextBlock } from '@portabletext/types'
import type { ImageWithAlt } from '../../types/index'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { Typography } from '@core/Typography'
import { forwardRef, HTMLAttributes } from 'react'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import Image from '../../pageComponents/shared/SanityImage'
import envisTwMerge from '../../twMerge'
import { toPlainText } from '@portabletext/react'

type FactImagePosition = 'left' | 'right'

interface FactBox {
  title: string
  content: PortableTextBlock[]
  background: { title: string; value: string; key?: string; dark?: boolean }
  image: ImageWithAlt
  imagePosition: FactImagePosition
  dynamicHeight: boolean
  isSingleColumn?: boolean
}

type FactBoxProps = {
  value: FactBox
  className?: string
} & PortableTextBlock &
  HTMLAttributes<HTMLElement>

export const FactBox = forwardRef<HTMLElement, FactBoxProps>(function FactBox({ value, className = '' }, ref) {
  const { title, content, background, image, imagePosition, isSingleColumn } = value

  if (!content || content.length === 0) {
    return null
  }

  const hasImage = image && image.asset ? !!image.asset : false
  const plainText = content ? toPlainText(content as PortableTextBlock[]) : ''
  const useTwoColumns = !isSingleColumn && plainText.length > 800

  let contentXPadding = 'px-layout-sm lg:px-24'
  if (!hasImage) {
    contentXPadding = isSingleColumn ? 'px-layout-lg' : 'px-layout-sm'
  }

  return (
    <aside
      className={envisTwMerge(
        `w-full 
        h-full
        flex
        flex-col
        lg:flex-row
        my-24
        ${colorKeyToUtilityMap[background.key as keyof ColorKeyTokens]?.background} ${background?.dark ? 'dark' : ''} ${
          hasImage && imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
        }`,
        className,
      )}
      ref={ref}
    >
      {hasImage && (
        <div className={`w-full h-[380px] lg:max-w-[50vw] lg:h-auto relative`}>
          <Image image={image} fill />
        </div>
      )}
      <div className={`w-full py-12 xl:py-24 ${contentXPadding}`}>
        {title && (
          <Typography as="h2" variant="h3" className="pb-8">
            {title}
          </Typography>
        )}
        {content && (
          <Blocks
            value={content}
            className={`w-full text-pretty ${useTwoColumns ? 'lg:max-w-full lg:columns-2' : ''}`}
          />
        )}
      </div>
    </aside>
  )
})
