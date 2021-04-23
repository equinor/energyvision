import Img from 'next/image'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { imageProps } from '../../common/helpers'
import styled from 'styled-components'

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

  @media (min-width: 800px) {
    ${({ layout }) =>
      layout === 'right' && {
        width: '50%',
        paddingLeft: 'var(--spacing-small)',
        marginTop: '0',
        marginBottom: 'var(--spacing-small)',
        float: 'right',
      }}
    ${({ layout }) =>
      layout === 'left' && {
        width: '50%',
        paddingRight: 'var(--spacing-small)',
        marginBottom: 'var(--spacing-small)',
        marginTop: '0',
        float: 'left',
      }}
  }
`

const FigCaption = styled.figcaption`
  font-size: var(--typeScale-0);
  margin-top: var(--space-small);
`

type FigureNode = {
  _key: string
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: { _type: 'imageWithAlt'; alt: string; asset: SanityImageObject }
  layout: Layout
}

export const FigureRendererWithLayout = (child: { node: FigureNode }) => {
  const { node } = child
  const { image = undefined, caption, attribution, layout = 'full' } = node

  if (!image) return null

  return (
    <FigureTest layout={layout}>
      {layout === 'full' ? (
        <Img
          {...imageProps(image.asset, 1184)}
          alt={image.alt}
          sizes="
        (max-width: 340px) 295px,
        (max-width: 600px) 451px,
        (max-width: 950px) 642px,
        (max-width: 1250px) 805px,
        (max-width: 1450px) 915px,
        (max-width: 1700px) 1049px,
        1184px
        "
          layout="responsive"
        />
      ) : (
        <Img
          {...imageProps(image.asset, 570)}
          alt={image.alt}
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
          layout="responsive"
        />
      )}
      {caption || attribution ? (
        <FigCaption>
          {caption} {attribution}
        </FigCaption>
      ) : null}
    </FigureTest>
  )
}
