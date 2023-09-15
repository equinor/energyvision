import { toPlainText } from '@portabletext/react'
import Img from 'next/image'
import styled from 'styled-components'
import RichText from '../../RichText'
import { FactBox, Heading } from '@components'
import type { FactBackground, FactImagePosition } from '@components'
import type { PortableTextBlock } from '@portabletext/types'
import type { ImageWithAlt } from '../../../../../types/types'

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
`

type BlockProps = {
  isInline: boolean
  value: FactboxProps
} & PortableTextBlock

export const Fact = (block: BlockProps) => {
  const { value } = block
  const { title, content, background, image, imagePosition, dynamicHeight } = value
  const bgTitle = background ? background?.title : 'none'
  if (!content || content.length === 0) {
    return null
  }

  let backgroundColor: FactBackground = 'none'
  if (bgTitle === 'White') {
    backgroundColor = 'none'
  } else if (bgTitle === 'Moss Green') {
    backgroundColor = 'cold'
  } else if (bgTitle === 'Spruce Wood') {
    backgroundColor = 'warm'
  }

  const imageSrc = image && image.asset ? urlFor(image).size(1200, 800).auto('format').toString() : false

  const plainText = content ? toPlainText(content as PortableTextBlock[]) : ''

  const hasColumns = !imageSrc && plainText.length > 800
  const hasImage = imageSrc ? true : false
  const hasBgColor = backgroundColor !== 'none'

  return (
    <FactBoxWithPadding
      className={`fact-box fact-box--${backgroundColor} ${hasBgColor ? 'fact-box--colored' : ''} ${
        hasImage ? 'fact-box--image' : ''
      }`}
      imagePosition={imagePosition}
      background={backgroundColor}
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
