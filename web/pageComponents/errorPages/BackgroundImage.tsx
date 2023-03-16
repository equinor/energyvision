import { useNextSanityImage } from 'next-sanity-image'
import { sanityClientWithEquinorCDN } from '../../lib/sanity.server'
import NewImg from 'next/image'
import Img from 'next/legacy/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Flags } from '../../common/helpers/datasetHelpers'

const BackgroundImage = ({ backgroundImage }: { backgroundImage: SanityImageSource }) => {
  const imageProps = useNextSanityImage(sanityClientWithEquinorCDN, backgroundImage)

  // @TODO I don't quite understand how to fix these types
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const src = imageProps?.src
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const loader = imageProps?.loader
  return (
    <>
      {imageProps &&
        src &&
        (Flags.IS_DEV ? (
          <NewImg src={src} loader={loader} layout="fill" style={{ objectFit: 'cover' }} alt="" />
        ) : (
          <Img src={src} loader={loader} layout="fill" objectFit="cover" />
        ))}
    </>
  )
}

export default BackgroundImage
