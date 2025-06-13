import { ImageForTextData } from '../../types/types'
import { forwardRef } from 'react'
import Image from '../../core/SanityImage/SanityImage'
import Blocks from '../../pageComponents/shared/portableText/Blocks'

type ImageForTextProps = {
  data: ImageForTextData
  anchor?: string
}

const ImageForText = forwardRef<HTMLDivElement, ImageForTextProps>(function ImageForText({ anchor, data }, ref) {
  const { content, image, aspectRatio } = data
  return (
    <div ref={ref} id={anchor} className={`${aspectRatio === 'fullWidth' ? 'w-full' : 'px-layout-lg'}`}>
      <div className="">
        <Image
          image={image}
          maxWidth={2000}
          {...(aspectRatio === 'fullWidth' ? { aspectRatio: '10:3' } : { aspectRatio: '16:9' })}
          aria-hidden
          className="max-w-viewport"
        />
      </div>
      {content && <Blocks value={content} className="sr-only" />}
    </div>
  )
})

export default ImageForText
