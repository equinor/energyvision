/** Not used anywhere at the moment, but we'll need it later */

import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import styled from 'styled-components'
import Image from '../../pageComponents/shared/Image'

const Figure = styled.figure``

type FigureNode = {
  _key: string
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: { _type: 'imageWithAlt'; alt: string; asset: SanityImageObject }
}

export const FigureRenderer = (child: { node: FigureNode }) => {
  const { node } = child
  const { image, caption, attribution } = node
  if (!image) return null

  // TODO: add styling for figcaption
  return (
    <Figure>
      <Image image={image} sizes="80rem" layout="intrinsic" maxWidth={800} />
      {caption || attribution ? (
        <figcaption>
          {caption} {attribution}
        </figcaption>
      ) : null}
    </Figure>
  )
}
