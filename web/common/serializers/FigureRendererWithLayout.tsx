import Img from 'next/image'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { imageProps } from '../../common/helpers'
import styled from 'styled-components'

type Layout = 'full' | 'left' | 'right'

type FigureStyles = {
  layout: Layout
}

const Figure = styled.figure<FigureStyles>`
  --max-width: 1700px;
  --margin-auto: calc(100% - var(--max-width));
  --margin-auto-half: calc(var(--margin-auto) / 2);

  padding: 0 var(--layout-spacing-medium);
  max-width: var(--max-width);
  margin: var(--space-xxLarge) auto;

  @media (min-width: 1000px) {
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
  @media (min-width: 1700px) {
    ${({ layout }) =>
      layout === 'right' && {
        paddingRight: 'calc(var(--layout-spacing-medium)  + var(--margin-auto-half))',
      }}
    ${({ layout }) =>
      layout === 'left' && {
        paddingLeft: 'calc(var(--layout-spacing-medium)  + var(--margin-auto-half))',
      }}
  }
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

  // TODO: add styling for figcaption
  // @TODO: Optimaze srcset for image!!!!!!
  // @TODO: Remember to ask for half of the size for left and right images
  return (
    <Figure layout={layout}>
      <Img {...imageProps(image.asset, 1200)} alt={image.alt} sizes="80rem" layout="intrinsic" />
      {caption || attribution ? (
        <figcaption>
          {caption} {attribution}
        </figcaption>
      ) : null}
    </Figure>
  )
}
