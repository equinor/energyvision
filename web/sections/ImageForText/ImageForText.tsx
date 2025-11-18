import { ImageForTextData } from '../../types/types'
import { forwardRef } from 'react'
import { Image } from '../../core/Image/Image'
import Blocks from '../../portableText/Blocks'

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
          grid="lg"
          {...(aspectRatio === 'fullWidth' ? { aspectRatio: '10:3' } : { aspectRatio: '16:9' })}
          aria-hidden
          className=""
        />
      </div>
      {content && <Blocks value={content} className="sr-only" />}
    </div>
  )
})

export default ImageForText
