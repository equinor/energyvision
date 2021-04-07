import Img from 'next/image'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { imageProps } from '../../common/helpers'

type FigureNode = {
  _key: string
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: { _type: 'imageWithAlt'; alt: string; asset: SanityImageObject }
}

export const FigureRenderer = (child: { node: FigureNode }) => {
  const { node } = child
  const { image = undefined } = node

  if (!image) return false

  return <Img {...imageProps(image.asset, 800)} alt={image.alt} sizes="80rem" layout="intrinsic" />
}
