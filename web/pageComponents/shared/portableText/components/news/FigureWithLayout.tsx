import type { PortableTextBlock } from '@portabletext/types'

import { FigureCaption } from '@components'
import styled from 'styled-components'
import Image from '../../../SanityImage'
import type { ImageWithAlt } from '../../../../../types/types'

type Layout = 'full' | 'left' | 'right'

type FigureStyles = {
  layout: Layout
}

const FigureTest = styled.figure.attrs<FigureStyles>(({ layout }) => ({
  className: `float-${layout}`,
}))<FigureStyles>`
  padding: 0 var(--layout-paddingHorizontal-medium);
  max-width: var(--maxViewportWidth);
  margin: var(--space-xxLarge) auto;
  /*  img {
    object-fit: contain;
  } */
  @media (min-width: 800px) {
    ${({ layout }) =>
      layout === 'right' && {
        width: '50%',
        paddingLeft: 'var(--space-small)',
        marginTop: '0',
        marginBottom: 'var(--space-small)',
        float: 'right',
      }}
    ${({ layout }) =>
      layout === 'left' && {
        width: '50%',
        paddingRight: 'var(--space-small)',
        marginBottom: 'var(--space-small)',
        marginTop: '0',
        float: 'left',
      }}
  }
`

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
    <FigureTest layout={layout}>
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
    </FigureTest>
  )
}
