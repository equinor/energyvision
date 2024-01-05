import { toPlainText } from '@portabletext/react'
import Img from 'next/image'
import styled from 'styled-components'
import RichText from '../../RichText'
import { FactBox, getContainerColor, Heading, StyleVariants } from '@components'
import type { FactImagePosition } from '@components'
import type { PortableTextBlock } from '@portabletext/types'
import type { BackgroundColours, ImageWithAlt } from '../../../../../types/types'

import { urlFor } from '../../../../../common/helpers'

type FactboxProps = {
  title: string
  content: []
  background: { title: string; value: string }
  image: ImageWithAlt
  imagePosition: FactImagePosition
  dynamicHeight: boolean
}

const FactBoxWithPadding = styled(FactBox)`
  margin: var(--space-3xLarge) 0;
`

const FactBoxContentWithPadding = styled(FactBox.Content)<{
  hasColumns: boolean
  hasImage: boolean
  hasBgColor: boolean
}>`
  ${({ hasColumns, hasImage, hasBgColor }) =>
    !hasColumns &&
    !hasImage && {
      padding: `${hasBgColor ? 'var(--space-3xLarge)' : '0'} var(--layout-paddingHorizontal-large)`,
    }}
  ${({ hasColumns, hasBgColor }) =>
    hasColumns && {
      padding: `${hasBgColor ? 'var(--space-large)' : '0 var(--space-large)'}`,
    }}
`

type BlockProps = {
  isInline: boolean
  value: FactboxProps
} & PortableTextBlock

export const Fact = (block: BlockProps) => {
  const { value } = block
  const { title, content, background, image, imagePosition, dynamicHeight } = value
  const bgTitle = (background ? background?.title : 'White') as BackgroundColours
  if (!content || content.length === 0) {
    return null
  }

  const backgroundColor: StyleVariants = getContainerColor(bgTitle)

  const imageSrc = image && image.asset ? urlFor(image).size(1200, 800).auto('format').toString() : false

  const plainText = content ? toPlainText(content as PortableTextBlock[]) : ''

  const hasColumns = !imageSrc && plainText.length > 800
  const hasImage = imageSrc ? true : false
  const hasBgColor = bgTitle !== 'White'

  return (
    <FactBoxWithPadding
      className={`fact-box fact-box${backgroundColor} ${hasBgColor ? 'fact-box--colored' : ''} ${
        hasImage ? 'fact-box--image' : ''
      }`}
      imagePosition={imagePosition}
      background={bgTitle}
    >
      {imageSrc && (
        <FactBox.Image>
          <Img src={imageSrc} alt={image.alt ? image.alt : 'FactBox'} style={{ objectFit: 'cover' }} fill />
        </FactBox.Image>
      )}

      <FactBoxContentWithPadding
        dynamicHeight={dynamicHeight}
        hasImage={hasImage}
        hasColumns={hasColumns}
        hasBgColor={hasBgColor}
      >
        {title && (
          <Heading size="xl" level="h3">
            {title}
          </Heading>
        )}
        <FactBox.Text hasColumns={hasColumns}>
          <RichText value={content} />
        </FactBox.Text>
      </FactBoxContentWithPadding>
    </FactBoxWithPadding>
  )
}
