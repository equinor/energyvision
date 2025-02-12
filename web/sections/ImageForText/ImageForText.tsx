import { ImageForTextData } from '../../types/types'
import { forwardRef } from 'react'
import Image, { Ratios } from '../../pageComponents/shared/SanityImage'
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
          {...(aspectRatio === 'fullWidth' && { aspectRatio: Ratios.THREE_TO_TEN })}
          sizes={
            aspectRatio === 'fullWidth'
              ? '100vw'
              : '(min-width: 2060px) 920px, (min-width: 440px) calc(34.56vw + 215px), calc(76.67vw + 38px)'
          }
          aria-hidden
        />
      </div>
      {content && <Blocks value={content} className="sr-only" />}
    </div>
  )
})

export default ImageForText
