import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageObject } from '@sanity/image-url'
import { Image } from '@/core/Image/Image'
import Blocks from './Blocks'

type ThumbnailProps = {
  value?: {
    image: SanityImageObject
    text: PortableTextBlock[]
  }
}

export const Thumbnail = ({ value }: ThumbnailProps) => {
  console.log('value', value)
  //@ts-expect-error
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
          marksComponents={{
            link: ({ children, value }: any) => {
              return (
                <Link type='externalUrl' value={value} className=''>
                  {children}
                </Link>
              )
            },
            internalLink: ({ children, value }: any) => {
              return (
                <Link type='internalUrl' value={value} className=''>
                  {children}
                </Link>
              )
            },
          }}
        />
      )}
    </div>
  )
}
