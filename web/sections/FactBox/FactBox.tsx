import type { PortableTextBlock } from '@portabletext/types'
import type { ImageWithAlt } from '../../types/index'
import Blocks from '../../portableText/Blocks'
import { Typography } from '@/core/Typography'
import { forwardRef, HTMLAttributes } from 'react'
import { ColorKeyTokens, colorKeyToUtilityMap } from '../../styles/colorKeyToUtilityMap'
import Image from '../../core/SanityImage/SanityImage'
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
    contentXPadding = useTwoColumns ? 'px-layout-sm' : 'px-layout-lg'
  }
  const colorName =
    Object.keys(colorKeyToUtilityMap).find(
      (key) => colorKeyToUtilityMap[key as keyof ColorKeyTokens]?.backgroundName === background?.title,
    ) ?? 'white-100'

  const twBg = background?.key
    ? colorKeyToUtilityMap[background.key as keyof ColorKeyTokens]?.background
    : colorKeyToUtilityMap[colorName as keyof ColorKeyTokens]?.background

  const imgPos = imagePosition ?? 'left'

  return (
    <aside
      className={envisTwMerge(`my-24 h-full w-full ${twBg} ${background?.dark ? 'dark' : ''}`, className)}
      ref={ref}
    >
      <div
        className={`flex flex-col lg:flex-row ${hasImage && imgPos === 'right' ? 'lg:flex-row-reverse' : ''} ${hasImage ? '' : contentXPadding}`}
      >
        {hasImage && (
          <div className={`relative h-[380px] w-full lg:h-auto lg:w-1/2 lg:max-w-1/2`}>
            <Image image={image} fill />
          </div>
        )}
        <div
          className={`w-fit py-12 xl:py-24 ${hasImage && imgPos === 'right' ? 'px-layout-sm lg:pr-24 lg:pl-layout-sm' : ''} ${hasImage && imgPos === 'left' ? 'px-layout-sm lg:pr-layout-sm lg:pl-24' : ''} `}
        >
          {title && (
            <Typography as="h2" variant="h3" className="pb-8">
              {title}
            </Typography>
          )}
          {content && (
            <Blocks
              value={content}
              blockClassName={`w-full text-pretty ${useTwoColumns ? 'lg:max-w-full lg:columns-2' : ''}`}
            />
          )}
        </div>
      </div>
    </aside>
  )
})
