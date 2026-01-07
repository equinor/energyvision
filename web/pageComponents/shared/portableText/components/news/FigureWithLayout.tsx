import type { PortableTextBlock } from '@portabletext/types'
import { twMerge } from 'tailwind-merge'
import Image, {
  getPxLgSizes,
  getSmallerThanPxLgSizes,
  ImageRatioKeys,
} from '../../../../../core/SanityImage/SanityImage'
import type { ImageWithAlt } from '../../../../../types/index'
import { FigureCaption } from '@core/FigureCaption/FigureCaption'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useLayoutEffect, useMemo, useState } from 'react'

type Layout = 'full' | 'left' | 'right'

type FigureNode = {
  _key: string
  _type: 'imageWithAltAndCaption'
  attribution?: string
  caption?: string
  image: ImageWithAlt
  layout: Layout
  enableImageZoom?: boolean
  imageOrientation?: 'portrait' | 'landscape'
}

const cx = (mods: Record<string, boolean>): string => {
  const cns: string[] = []

  for (const k in mods) {
    if (mods[k]) {
      cns.push(k)
    }
  }

  return cns.join(' ')
}

const CustomZoomContent = ({
  buttonUnzoom,
  modalState,
  img,
  // isZoomImgLoaded, // Not used in this example
  // onUnzooom, // Not used in this example
  attribution,
  caption,
}: {
  buttonUnzoom: any
  modalState: any
  img: any
  attribution: any
  caption: any
}) => {
  console.log('CustomZoomContent caption', caption)
  console.log('CustomZoomContent attribution', attribution)
  const [isLoaded, setIsLoaded] = useState(false)

  const imgProps = (img as React.ReactElement<HTMLImageElement>)?.props
  const imgWidth = imgProps?.width
  const imgHeight = imgProps?.height

  const classCaption = useMemo(() => {
    const hasWidthHeight = imgWidth != null && imgHeight != null
    const imgRatioLargerThanWindow = imgWidth / imgHeight > window.innerWidth / window.innerHeight

    return cx({
      'zoom-caption': true,
      'zoom-caption--loaded': isLoaded,
      'zoom-caption--bottom': hasWidthHeight && imgRatioLargerThanWindow,
      'zoom-caption--left': hasWidthHeight && !imgRatioLargerThanWindow,
    })
  }, [imgWidth, imgHeight, isLoaded])

  useLayoutEffect(() => {
    if (modalState === 'LOADED') {
      setIsLoaded(true)
    } else if (modalState === 'UNLOADING') {
      setIsLoaded(false)
    }
  }, [modalState])

  return (
    <>
      {buttonUnzoom}

      <figure>
        {img}
        <figcaption className={classCaption}>
          {caption}
          <cite className="zoom-caption-cite">{attribution}</cite>
        </figcaption>
      </figure>
    </>
  )
}

type BlockProps = {
  isInline: boolean
  value: FigureNode
} & PortableTextBlock

export const FigureWithLayout = (block: BlockProps) => {
  const { value } = block
  const {
    image,
    caption,
    attribution,
    layout = 'full',
    enableImageZoom = false,
    imageOrientation = 'landscape',
  } = value
  if (!image) return null
  let imageRatio = '16:9' as ImageRatioKeys
  if (imageOrientation === 'landscape' && layout !== 'full') {
    imageRatio = '3:2'
  }
  if (imageOrientation === 'portrait') {
    imageRatio = '4:5'
  }

  return (
    <figure
      className={twMerge(`
        py-0
        px-layout-md
        mx-auto
        w-full
        ${layout !== 'full' ? 'md:w-1/2' : ''}
        ${layout === 'right' ? 'md:float-right md:pl-8' : ''}
        ${layout === 'left' ? 'md:float-left md:pr-8' : ''}
        mt-14
        mb-16
      `)}
    >
      {enableImageZoom ? (
        <Zoom
          ZoomContent={(data: any) => {
            return <CustomZoomContent {...data} caption={caption} attribution={attribution} />
          }}
        >
          <Image
            image={image}
            aspectRatio={imageRatio}
            sizes={layout === 'full' ? getPxLgSizes() : getSmallerThanPxLgSizes()}
            maxWidth={layout === 'full' || enableImageZoom ? 1184 : 570}
          />
        </Zoom>
      ) : (
        <Image
          image={image}
          aspectRatio={imageRatio}
          sizes={layout === 'full' ? getPxLgSizes() : getSmallerThanPxLgSizes()}
          maxWidth={layout === 'full' || enableImageZoom ? 1184 : 570}
        />
      )}

      {(caption || attribution) && (
        <FigureCaption>
          {caption && <div>{caption}</div>}
          {attribution && <div>{attribution}</div>}
        </FigureCaption>
      )}
    </figure>
  )
}
