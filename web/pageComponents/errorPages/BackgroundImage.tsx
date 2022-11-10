import { useNextSanityImage } from 'next-sanity-image'
import { sanityClientWithEquinorCDN } from '../../lib/sanity.server'
import Img from 'next/legacy/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const BackgroundImage = ({ backgroundImage }: { backgroundImage: SanityImageSource }) => {
  const imageProps = useNextSanityImage(sanityClientWithEquinorCDN, backgroundImage)

  // @TODO I don't quite understand how to fix these types
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const src = imageProps?.src
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const loader = imageProps?.loader
  return <> {imageProps && src && <Img src={src} loader={loader} layout="fill" objectFit="cover" />} </>
}

export default BackgroundImage
