import { toPlainText } from '@portabletext/react'
import Img from 'next/image'
import { FactBox } from '@components'
import type { FactImagePosition } from '@components'
import type { PortableTextBlock } from '@portabletext/types'
import type { BackgroundColours, ImageWithAlt } from '../../../../../types/types'
import { urlFor } from '../../../../../common/helpers'
import Blocks from '../../Blocks'
import { Typography } from '@core/Typography'

type FactboxProps = {
  title: string
  content: []
  background: { title: string; value: string; key?: string; dark?: boolean }
  image: ImageWithAlt
  imagePosition: FactImagePosition
  dynamicHeight: boolean
}

type BlockProps = {
  isInline: boolean
  value: FactboxProps
  className?: string
} & PortableTextBlock

export const Fact = (block: BlockProps) => {
  const { value, className } = block
  const { title, content, background, image, imagePosition, dynamicHeight } = value

  const bgTitle = (background ? background?.title : 'White') as BackgroundColours
  if (!content || content.length === 0) {
    return null
  }

  const imageSrc = image && image.asset ? urlFor(image).size(1200, 800).auto('format').toString() : false

  const plainText = content ? toPlainText(content as PortableTextBlock[]) : ''

  const hasColumns = !imageSrc && plainText.length > 800
  const hasImage = imageSrc ? true : false
  const hasBgColor = bgTitle !== 'White'

  return (
    <FactBox
      className={className}
      useTwoColumns={hasImage ?? hasColumns}
      imagePosition={imagePosition}
      background={background?.title}
      backgroundUtility={background?.key}
      dark={background?.dark}
    >
      {imageSrc && (
        <FactBox.Image imagePosition={imagePosition}>
          <Img src={imageSrc} alt={image.alt ? image.alt : 'FactBox'} style={{ objectFit: 'cover' }} fill />
        </FactBox.Image>
      )}

      <FactBox.Content
        dynamicHeight={dynamicHeight}
        hasBgColor={hasBgColor}
        hasImage={hasImage}
        hasColumns={hasColumns}
        imagePosition={imagePosition}
      >
        {title && (
          <Typography as="h2" variant="h3">
            {title}
          </Typography>
        )}
        <FactBox.Text hasColumns={hasColumns}>
          <Blocks
            value={content}
            className={`prose max-w-none ${hasColumns ? 'lg:columns-2 lg:[column-gap:theme(spacing.24)]' : ''}`}
          />
        </FactBox.Text>
      </FactBox.Content>
    </FactBox>
  )
}
