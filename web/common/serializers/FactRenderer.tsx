import SimpleBlockContent from '../SimpleBlockContent'
import { FactBox, Heading } from '@components'
import type { FactBackground, FactImagePosition } from '@components'
import { ListRenderer, ListItemRenderer } from './'
import { blocksToText } from '../helpers'
import type { ImageWithAlt } from '../../types/types'
import Img from 'next/image'
import { urlFor } from '../helpers'

type FactboxNodeProps = {
  title: string
  content: []
  backgroundColour: { colours: { title: string; value: string } }
  image: ImageWithAlt
  imagePosition: FactImagePosition
  dynamicHeight: boolean
}

export const FactRenderer = (child: { node: any }) => {
  const { node } = child
  const {
    title,
    content,
    backgroundColour,
    image,
    imagePosition,
    dynamicHeight,
  }: FactboxNodeProps = node
  const bgTitle = backgroundColour?.colours ? backgroundColour.colours?.title : 'none'
  if (!content || content.length === 0) {
    console.warn('Missing content in a fact box')
    return null
  }

  let backgroundColor: FactBackground = 'none'
  if (bgTitle === 'Default') {
    backgroundColor = 'none'
  } else if (bgTitle === 'Cold') {
    backgroundColor = 'cold'
  } else if (bgTitle === 'Warm') {
    backgroundColor = 'warm'
  }
  const serializers = {
    list: ListRenderer,
    listItem: ListItemRenderer,
  }

  const imageSrc = urlFor(image).size(1200, 800).auto('format').toString()
  const plainText = blocksToText(content)

  return (
    <FactBox imagePosition={imagePosition} background={backgroundColor}>
      { imageSrc && (
        <FactBox.Image>
          <Img src={imageSrc} alt={image.alt} objectFit="cover" layout="fill" unoptimized />
        </FactBox.Image>
      )}

        <FactBox.Content dynamicHeight={dynamicHeight} hasImage={imageSrc ? true : false}>
          <Heading size="xl" level="h3">
            {title}
          </Heading>
          <FactBox.Text hasColumns={!imageSrc && plainText.length > 800}>
            <SimpleBlockContent blocks={content} serializers={serializers} />
          </FactBox.Text>
        </FactBox.Content>
    </FactBox>
  )
}
