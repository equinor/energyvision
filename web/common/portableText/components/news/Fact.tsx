import { toPlainText } from '@portabletext/react'
import Img from 'next/image'
import styled from 'styled-components'
import RichText from '../../RichText'
import { FactBox, Heading } from '@components'
import type { FactBackground, FactImagePosition } from '@components'
import type { PortableTextBlock } from '@portabletext/types'
import type { ImageWithAlt } from '../../../../types/types'

import { urlFor } from '../../../helpers'

type FactboxProps = {
  title: string
  content: []
  background: { title: string; value: string }
  image: ImageWithAlt
  imagePosition: FactImagePosition
  dynamicHeight: boolean
}

const FactBoxWithPadding = styled(FactBox)`
  margin-top: var(--space-4xLarge);
  margin-bottom: var(--space-4xLarge);

  @media (min-width: 1920px) {
    /* Maybe some day */
    /* margin-left: calc(((100vw - var(--maxViewportWidth)) / 2) * -1);
    margin-right: calc(((100vw - var(--maxViewportWidth)) / 2) * -1); */
  }
`

const FactBoxContentWithPadding = styled(FactBox.Content)<{ hasColumns: boolean; hasImage: boolean }>`
  ${({ hasColumns, hasImage }) =>
    !hasColumns &&
    !hasImage && {
      padding: 'var(--space-large) var(--layout-paddingHorizontal-large)',
    }}
`

type BlockProps = {
  isInline: boolean
  value: FactboxProps
} & PortableTextBlock

export const Fact = (block: BlockProps) => {
  const { value } = block
  console.log('block', value)
  const { title, content, background, image, imagePosition, dynamicHeight } = value
  const bgTitle = background ? background?.title : 'none'
  if (!content || content.length === 0) {
    console.warn('Missing content in a fact box')
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

  return (
    <FactBoxWithPadding imagePosition={imagePosition} background={backgroundColor}>
      {imageSrc && (
        <FactBox.Image>
          <Img src={imageSrc} alt={image.alt} objectFit="cover" layout="fill" unoptimized />
        </FactBox.Image>
      )}

      <FactBoxContentWithPadding dynamicHeight={dynamicHeight} hasImage={hasImage} hasColumns={hasColumns}>
        <Heading size="xl" level="h3">
          {title}
        </Heading>
        <FactBox.Text hasColumns={hasColumns}>
          <RichText value={content} />
        </FactBox.Text>
      </FactBoxContentWithPadding>
    </FactBoxWithPadding>
  )
}

/* export const Fact = (value: PortableTextBlock) => {
  const { children } = value

  return <div>{children}</div>
}
 */
