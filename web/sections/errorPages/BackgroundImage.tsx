'use client'
import type { SanityImageSource } from '@sanity/image-url'
import Img from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'
import { assetOnlyCdnClient } from '@/sanity/lib/equinorCdnClient'

const BackgroundImage = ({
  backgroundImage,
}: {
  backgroundImage: SanityImageSource
}) => {
  const imageProps = useNextSanityImage(
    assetOnlyCdnClient,
    backgroundImage,
  )

  // @TODO I don't quite understand how to fix these types
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const src = imageProps?.src
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const loader = imageProps?.loader
  return (
    <>
      {imageProps && src && (
        <Img
          src={src}
          loader={loader}
          fill
          style={{ objectFit: 'cover' }}
          alt=''
        />
      )}
    </>
  )
}

export default BackgroundImage
