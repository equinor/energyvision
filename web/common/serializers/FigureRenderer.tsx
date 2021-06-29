/** Not used anywhere at the moment, but we'll need it later */

import Img from 'next/image'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { useNextSanityImage } from 'next-sanity-image'
import { SanityImgLoader } from '../../common/helpers'
import { sanityClient } from '../../lib/sanity.server'
import styled from 'styled-components'

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
  const imageProps = useNextSanityImage(sanityClient, image, {
    imageBuilder: (imageUrlBuilder, options) => SanityImgLoader(imageUrlBuilder, options, 800),
  })

  if (!image) return null

  // TODO: add styling for figcaption
  return (
    <Figure>
      <Img {...imageProps} alt={image.alt} sizes="80rem" layout="intrinsic" />
      {caption || attribution ? (
        <figcaption>
          {caption} {attribution}
        </figcaption>
      ) : null}
    </Figure>
  )
}
