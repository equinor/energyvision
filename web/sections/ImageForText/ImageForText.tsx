import { toPlainText } from 'next-sanity'
import { forwardRef } from 'react'
import { Image } from '../../core/Image/Image'
import type { ImageForTextData } from '../../types/types'

type ImageForTextProps = {
  data: ImageForTextData
  anchor?: string
}

const ImageForText = forwardRef<HTMLDivElement, ImageForTextProps>(
  function ImageForText({ anchor, data }, ref) {
    const { content, image, aspectRatio } = data
    return (
      <div
        ref={ref}
        id={anchor}
        className={`${aspectRatio === 'fullWidth' ? 'w-full' : 'px-layout-lg'}`}
      >
        <div className=''>
          <Image
            image={image}
            grid='lg'
            {...(aspectRatio === 'fullWidth'
              ? { aspectRatio: '10:3' }
              : { aspectRatio: '16:9' })}
            aria-hidden
            className=''
          />
        </div>
        {content && <div className='sr-only'>{toPlainText(content)}</div>}
      </div>
    )
  },
)

export default ImageForText
