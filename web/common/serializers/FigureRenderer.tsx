import Img from 'next/image'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { imageProps } from '../../common/helpers'
import styled from 'styled-components'

const Figure = styled.figure`
  /* Temp negative margin */
  margin: var(--spacing-medium) calc(var(--spacing-medium) * -1);
`

type FigureNode = {
  _key: string
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: { _type: 'imageWithAlt'; alt: string; asset: SanityImageObject }
}

export const FigureRenderer = (child: { node: FigureNode }) => {
  const { node } = child
  const { image = undefined, caption, attribution } = node

  if (!image) return null

  // TODO: add styling for figcaption
  return (
    <Figure>
      <Img {...imageProps(image.asset, 800)} alt={image.alt} sizes="80rem" layout="intrinsic" />
      {caption || attribution ? (
        <figcaption>
          {caption} {attribution}
        </figcaption>
      ) : null}
    </Figure>
  )
}
