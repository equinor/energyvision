import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageObject } from '@sanity/image-url'
import { Image } from '@/core/Image/Image'
import Blocks from './Blocks'

type ThumbnailProps = {
  /*   image: SanityImageObject
  text: PortableTextBlock[] */
  value?: any
}

export const Thumbnail = ({ value }: ThumbnailProps) => {
  console.log('value', value)
  const { image, text } = value

  return (
    <div className={`flex gap-3`}>
      {image && (
        <Image
          image={image}
          grid='xs'
          aspectRatio='1:1'
          keepRatioOnMobile
          customWidth={32}
          customHeight={32}
          className='size-8'
        />
      )}
      {text && (
        <Blocks
          value={text}
          group='plain'
          variant='div'
          blockClassName='text-base'
        />
      )}
    </div>
  )
}
