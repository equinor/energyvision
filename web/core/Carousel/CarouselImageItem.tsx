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
        relative
        h-full
        ${displayMode === 'single' ? 'transition-opacity duration-1000 ease-[ease]' : 'shrink-0'}
        ${!active && displayMode === 'single' ? 'opacity-30' : ''}
        ${
          displayMode === 'scroll'
            ? 'w-[80%] snap-center scroll-ml-6'
            : 'w-[var(--image-carousel-card-w-sm)] md:w-[var(--image-carousel-card-w-md)] lg:w-[var(--image-carousel-card-w-lg)] ms-2 me-2'
        }
        `,
        className,
      )}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-4/5 md:aspect-video">
        <Image maxWidth={1420} image={image as ImageWithAlt} fill className="rounded-md" />
        <GridLinkArrow action={action} variant="circle" />
      </div>

      {/* Caption Section */}
      {(caption || attribution) && (
        <figure className="relative w-full mt-4 ml-10">
          <figcaption className="bg-spruce-wood-70/75 text-slate-80 px-4 py-2 rounded-md flex flex-col">
            {caption && <span className="text-lg">{caption}</span>}
            {attribution && <span className="text-sm mt-2">{attribution}</span>}
          </figcaption>
        </figure>
      )}
    </li>
  );
});