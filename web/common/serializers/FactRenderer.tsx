import SimpleBlockContent from '../SimpleBlockContent'
import { Fact, Heading } from '@components'
import { ListRenderer, ListItemRenderer } from './'
import styled from 'styled-components'
import { blocksToText } from '../helpers'
import type { ImageWithAlt } from '../../types/types'
import Img from 'next/image'
import { urlFor } from '../helpers'

const Wrapper = styled.aside`
  margin: var(--space-4xLarge) 0;
  clear: both;
`

const WrapperWithImg = styled(Wrapper)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;

  @media (min-width: 800px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: min-content;
  }
`

const ImgWrapper = styled.div`
  position: relative;
  height: 400px;

  @media (min-width: 800px) {
    height: auto;
    max-height: 800px;
  }
`

const StyledFact = styled(Fact)<{ hasImage?: boolean }>`
  margin: 0 calc(var(--spacer-vertical-xxxLarge) * -1);

  ${({ hasImage }) =>
    hasImage && {
      overflowY: 'auto',
      maxHeight: '800px',
    }}
`

const StyledFactText = styled(Fact.Text)<{ hasColumns?: boolean }>`
  margin: 0 calc(var(--spacer-vertical-xxxLarge) - var(--spacer-horizontal-medium));

  @media (min-width: 800px) {
    ${({ hasColumns }) => hasColumns && { columns: 2 }}
  }
`

export const FactRenderer = (child: { node: any }) => {
  const { node } = child
  const {
    title,
    content,
    backgroundColour,
    image,
  }: {
    title: string
    content: []
    backgroundColour: { colours: { title: string; value: string } }
    image: ImageWithAlt
  } = node
  const bgTitle = backgroundColour?.colours ? backgroundColour.colours?.title : 'none'
  if (!content || content.length === 0) {
    console.warn('Missing content in a fact box')
    return null
  }
  // @TODO: Color mapping must be more generic than this!!!
  // Find a better way to do this.
  // Create a proper type for colors
  type colors = 'none' | 'cold' | 'warm'

  let backgroundColor: colors = 'none'
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

  if (imageSrc) {
    return (
      <WrapperWithImg>
        <ImgWrapper>
          <Img src={imageSrc} alt={image.alt} objectFit="cover" layout="fill" unoptimized />
        </ImgWrapper>

        <StyledFact background={backgroundColor} hasImage>
          <Heading size="xl" level="h3">
            {title}
          </Heading>
          <StyledFactText>
            <SimpleBlockContent blocks={content} serializers={serializers} />
          </StyledFactText>
        </StyledFact>
      </WrapperWithImg>
    )
  }

  return (
    <Wrapper>
      {/* //@TODO: Bullet proof, what do we need here actually 
        Will need media queries here as well
      */}
      <StyledFact background={backgroundColor}>
        <Heading size="xl" level="h3">
          {title}
        </Heading>
        <StyledFactText hasColumns={plainText.length > 800}>
          {/*  eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore: How should we type */}
          <SimpleBlockContent blocks={content} serializers={serializers} />
        </StyledFactText>
      </StyledFact>
    </Wrapper>
  )
}
