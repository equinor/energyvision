import envisTwMerge from '../../twMerge'
import Image from '../../pageComponents/shared/SanityImage'
import { ImageWithAlt, ImageWithCaptionData, LinkData } from '../../types/index'
import { DisplayModes } from './Carousel'
import { forwardRef, HTMLAttributes } from 'react'
import { ButtonLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers/getUrlFromAction'
import { getLocaleFromName } from '../../lib/localization'

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
  { active = false, image, caption, attribution, displayMode = 'single', className = '', action, captionPositionUnderImage, ...rest },
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
            : 'w-[var(--image-carousel-card-w-sm)] md:w-[var(--image-carousel-card-w-md)] lg:w-[var(--image-carousel-card-w-lg)] ms-2 me-2 col-start-1 col-end-1 row-start-1 row-end-1'
        }
        `,
        className,
      )}
    >
      {caption || attribution ? (
        <figure className="relative w-full h-full">
          <Image maxWidth={1420} image={image as ImageWithAlt} fill className="rounded-md" />
          <figcaption
            className={`${
              active ? 'block' : 'hidden'
            } absolute bottom-0 left-4 right-4 lg:left-8 lg:right-8 mb-4 lg:mb-8`}
          >
            <div
              className={`bg-spruce-wood-70/75 text-slate-80 px-8 pt-6 w-fit flex flex-col max-w-text ${
                attribution ? 'pb-4' : 'pb-6'
              }`}
            >
              {caption && <span className={`text-lg ${attribution ? 'pb-3' : ''}`}>{caption}</span>}
              {attribution && <span className="text-sm">{attribution}</span>}
            </div>
          </figcaption>
        
          {action && action.label && (
          <ButtonLink
            href={getUrlFromAction(action) || ''}
            aria-label={action?.ariaLabel}
            variant="outlined-secondary"
            className={`w-full md:mb-8 mb-4 justify-center mt-xl `}
            locale={action?.type === 'internalUrl' ? getLocaleFromName(action?.link?.lang) : undefined}
          >
            {action.label}
          </ButtonLink>
        )}
        </figure>
      ) : (
        <Image maxWidth={1420} image={image as ImageWithAlt} fill className="rounded-md" />
      )}
    </li>
  )
})

