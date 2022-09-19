import type { ImageWithAlt } from 'types/types'
import Img from 'next/image'
import Image, { SanityImgLoader } from '../Image'
import { useNextSanityImage } from 'next-sanity-image'
import { sanityClient } from '../../../lib/sanity.server'
import styled from 'styled-components'
import useWindowSize from '../../../lib/hooks/useWindowSize'

type Props = {
  ratio: string
  image: ImageWithAlt
}

const StyledDiv = styled.div`
  height: calc(100vh - var(--topbar-height));
  position: relative;
`

const FullScreenImageHero = ({ image }: { image: ImageWithAlt }) => {
  const imageProps = useNextSanityImage(
    sanityClient,
    image,
    /* { imageBuilder: customImageUrlBuilder }  */ {
      imageBuilder: (imageUrlBuilder, options) => SanityImgLoader(imageUrlBuilder, options, 1420),
    },
  )
  const altTag = image?.isDecorative ? '' : image?.alt || ''

  return (
    <StyledDiv>
      <Img alt={altTag} layout="fill" objectFit="cover" quality={100} src={imageProps.src} />
    </StyledDiv>
  )
}

export const FullImageHero = ({ ratio, image }: Props) => {
  const { width } = useWindowSize()
  if (ratio === 'fullScreen') return <FullScreenImageHero image={image} />
  if (ratio === 'narrow') {
    // 4:3 for small screens and 10:3 for large screens
    const aspectRatio = width && width < 750 ? 0.75 : 0.3
    return <Image maxWidth={1420} aspectRatio={aspectRatio} image={image} layout="responsive" priority />
  }
  return <Image maxWidth={1420} aspectRatio={Number(ratio)} image={image} layout="responsive" priority />
}
