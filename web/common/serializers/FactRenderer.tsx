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

const WrapperWithImg = styled(Wrapper)<{ imagePosition: 'left' | 'right' }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;
  grid-template-areas:
    'image'
    'content';

  @media (min-width: 800px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: min-content;

    ${({ imagePosition }) => 
      imagePosition === 'left' ? {
        gridTemplateAreas: '"image content"'
      } : {
        gridTemplateAreas: '"content image"'
      }
    }
  }
`

const ImgWrapper = styled.div`
  position: relative;
  height: 400px;
  grid-area: image;

  @media (min-width: 800px) {
    height: auto;
    max-height: 800px;
  }
`

type StyledFactProps = {
  hasImage?: boolean
  dynamicHeight?: boolean
}

const StyledFact = styled(Fact)<StyledFactProps>`
  margin: 0 calc(var(--spacer-vertical-xxxLarge)*-1);
  grid-area: content;

  ${({ hasImage }) =>
    hasImage && {
      overflowY: 'auto',
      maxHeight: '800px',
    }
  }

  @media (min-width: 800px) {
    ${({ hasImage, dynamicHeight }) => 
      hasImage && !dynamicHeight && {
        height: '800px',
        display: 'flex',
        flexDirection: 'column',
      }
    }
  }
`

const StyledFactContent = styled.div<StyledFactProps>`
  @media (min-width: 800px) {
    ${({ hasImage, dynamicHeight }) => 
      hasImage && !dynamicHeight && {
        margin: 'auto 0'
      }
    }
  }
`

const StyledFactText = styled(Fact.Text)<{ hasColumns?: boolean }>`
  margin: 0 calc(var(--spacer-vertical-xxxLarge) - var(--spacer-horizontal-medium));

  @media (min-width: 800px) {
    ${({ hasColumns }) => hasColumns && { columns: 2 }}
  }
`

type FactboxNodeProps = {
  title: string
  content: []
  backgroundColour: { colours: { title: string; value: string } }
  image: ImageWithAlt
  imagePosition: 'left' | 'right'
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
      <WrapperWithImg imagePosition={imagePosition}>
        <ImgWrapper>
          <Img src={imageSrc} alt={image.alt} objectFit="cover" layout="fill" unoptimized />
        </ImgWrapper>

        <StyledFact background={backgroundColor} hasImage dynamicHeight={dynamicHeight}>
          <StyledFactContent hasImage dynamicHeight={dynamicHeight}>
            <Heading size="xl" level="h3">
              {title}
            </Heading>
            <StyledFactText>
              <SimpleBlockContent blocks={content} serializers={serializers} />
            </StyledFactText>
          </StyledFactContent>
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
