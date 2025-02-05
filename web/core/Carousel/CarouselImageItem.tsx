import envisTwMerge from '../../twMerge'
import Image from '../../pageComponents/shared/SanityImage'
import { ImageWithAlt, ImageWithCaptionData, LinkData } from '../../types/index'
import { DisplayModes } from './Carousel'
import { forwardRef, HTMLAttributes } from 'react'
import GridLinkArrow from '@sections/Grid/GridLinkArrow'

type CarouselImageItemProps = {
  image?: ImageWithAlt | ImageWithCaptionData
  displayMode?: DisplayModes
  className?: string
  aspectRatio?: string
  caption?: string
  attribution?: string
  active?: boolean
  captionPositionUnderImage?: boolean
  action?: LinkData
} & HTMLAttributes<HTMLLIElement>

export const CarouselImageItem = forwardRef<HTMLLIElement, CarouselImageItemProps>(function CarouselImageItem(
  {
    active = false,
    image,
    caption,
    attribution,
    displayMode = 'single',
    className = '',
    action,
    captionPositionUnderImage,
    ...rest
  },
  ref,
) {
  return (
    <li
      {...rest}
      ref={ref}
      aria-current={active}
      aria-hidden={!active}
      aria-roledescription="slide"
      className={envisTwMerge(
        `
        aspect-4/5
        md:aspect-video
        relative
        h-full
        ${
          displayMode === 'single'
            ? `
        transition-opacity
        duration-1000
        ease-[ease]`
            : 'shrink-0'
        }
        ${!active && displayMode === 'single' ? 'opacity-30' : ''}
        ${
          displayMode === 'scroll'
            ? 'w-[80%] snap-center scroll-ml-6'
            : `w-[var(--image-carousel-card-w-sm)] 
            md:w-[var(--image-carousel-card-w-md)] 
            lg:w-[var(--image-carousel-card-w-lg)] 
            ms-2 
            me-2 
            [grid-area:bottom]
            lg:[grid-area:top]`
        }
        `,
        className,
      )}
    >
      {caption || attribution ? (
        <figure className="relative w-full h-full">
          <Image maxWidth={1420} image={image as ImageWithAlt} fill className="rounded-md" />
          <GridLinkArrow action={action} variant="circle" />
          <figcaption
            className={`
              ${active ? 'block' : 'hidden'} 
              ${
                captionPositionUnderImage
                  ? `
                -bottom-[198px] 
                sm:-bottom-[158px] 
                mb-4 
                min-w-full
                max-w-full
                sm:min-w-[40%] 
                sm:max-w-[60%] 
                lg:left-16
                lg:w-[calc(100%-80px-150px)]
                `
                  : 'bottom-0 lg:left-8'
              } absolute left-4 right-4 lg:right-8 mb-12 lg:mb-8
             `}
          >
            <div
              className={envisTwMerge(
                captionPositionUnderImage
                  ? 'w-full text-slate-80 pl-2 pr-8 flex flex-col max-w-text'
                  : 'bg-spruce-wood-70/75 text-slate-80  px-8 pt-6 w-fit flex flex-col max-w-text',
              )}
            >
              {caption && (
                <span
                  className={`${captionPositionUnderImage ? 'text-sm line-clamp-1 sm:line-clamp-1' : 'text-lg'} ${
                    attribution ? 'pb-2' : 'pb-14'
                  }`}
                >
                  {caption}
                </span>
              )}
              {attribution && (
                <span
                  className={`${captionPositionUnderImage ? 'line-clamp-3' : 'text-lg'} text-sm line-clamp-3 ${
                    caption ? 'pb-8' : 'pb-16'
                  }`}
                >
                  {attribution}
                </span>
              )}
            </div>
          </figcaption>
        </figure>
      ) : (
        <div>
          <Image maxWidth={1420} image={image as ImageWithAlt} fill className="rounded-md" />
          <GridLinkArrow action={action} variant="circle" />
        </div>
      )}
    </li>
  )
})
