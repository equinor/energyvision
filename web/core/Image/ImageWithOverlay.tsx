/* eslint-disable @typescript-eslint/ban-ts-comment */
import { forwardRef, HTMLAttributes, useId, useState } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { ImageWithAlt, LinkData } from '../../types'
import Image from '../../pageComponents/shared/SanityImage'
import envisTwMerge from '../../twMerge'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { Typography } from '@equinor/eds-core-react'
import { Heading } from '@core/Typography'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { ResourceLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { DisplayModes } from '@core/Carousel/Carousel'

export type ImageWithOverlayProps = {
  image?: SanityImageObject
  className?: string
  teaserTitle?: string
  title?: PortableTextBlock[] | string
  text?: PortableTextBlock[]
  /** When in carousel use this to control active hidden or block */
  captionClassname?: string
  action?: LinkData
  displayMode?: DisplayModes
} & HTMLAttributes<HTMLDivElement>

export const ImageWithOverlay = forwardRef<HTMLDivElement, ImageWithOverlayProps>(function ImageWithOverlay(
  { teaserTitle, title, text, image, action, className = '', captionClassname = '' },
  ref,
) {
  const [showOverlay, setShowOverlay] = useState(false)
  const toggleButtonId = useId()
  const overlayId = useId()
  const url = action && getUrlFromAction(action)

  const lineClassName = `
    block
    absolute
    h-[2.5px]
    w-full
    rounded-[3px]
    l-0
    transition-all
    duration-[250ms]
    origin-center
    `
  const titleElement = (
    <>
      {typeof title === 'string' ? (
        <Typography as="h2" variant="h4" className="text-md lg:text-lg">
          {title}
        </Typography>
      ) : (
        //@ts-ignore: Checked earlier for undefined title
        <Heading as="h2" variant="h4" className="text-md lg:text-lg" value={title} />
      )}
    </>
  )

  return (
    <figure ref={ref} className={envisTwMerge(`w-full h-full rounded-md`, className)}>
      <Image maxWidth={1420} image={image as ImageWithAlt} fill className={`rounded-md`} />
      <figcaption className={envisTwMerge(`w-full h-full`, captionClassname)}>
        <div
          className={`absolute
              inset-0
              z-[1] 
              transition-colors
            duration-[250ms]
            rounded-md
            ${showOverlay ? 'bg-slate-blue-95 dark' : ''}
            flex
            flex-col-reverse
            rounded-b-md`}
        >
          <div
            className={` h-fit rounded-b-md ${
              showOverlay ? 'justify-end' : 'justify-between fade-in-black-gradient'
            } flex items-end py-6 px-8`}
          >
            {teaserTitle && (
              <div className={`text-white-100 text-left text-lg w-2/3 pt-40 ${showOverlay ? 'hidden' : 'block'}`}>
                {teaserTitle}
              </div>
            )}
          </div>
          <div
            id={overlayId}
            className={`
              py-2
              px-4
              lg:py-6
              lg:px-8
              max-w-text
              ${showOverlay ? 'opacity-100' : 'opacity-0'} ${showOverlay ? 'visible' : 'invisible'}
              `}
          >
            <div className={`pb-1 lg:pb-6`}>{title && titleElement}</div>
            {text && <Blocks value={text} className={`text-sm md:text-base ${action ? 'pb-1 lg:pb-4' : ''}`} />}
            {action && (
              <ResourceLink
                href={url as string}
                extension={action.extension}
                showExtensionIcon={true}
                {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
                type={action.type}
                variant="fit"
              >
                {action.label}
              </ResourceLink>
            )}
          </div>
        </div>
        <button
          id={toggleButtonId}
          aria-expanded={showOverlay}
          aria-controls={overlayId}
          onClick={() => setShowOverlay(!showOverlay)}
          className={`
              focus:outline-none
              focus-visible:envis-outline
              absolute
              inset-0
              z-[3]
              flex
              justify-end
              items-end
              p-1.5
              lg:py-6 
              lg:px-8
              `}
        >
          <span className="sr-only">Show me more</span>
          <div
            className={`
              group
              flex
              justify-center 
              items-center
              size-3
              md:size-4
              rounded-full
              p-5
              md:p-6
              text-2xl
              focus:outline-none
              focus-visible:envis-outline-invert            
              ${
                showOverlay
                  ? 'bg-white-100 text-slate-80 hover:bg-slate-80 hover:text-white-100'
                  : `bg-slate-80 hover:bg-white-100 text-white-100 hover:text-slate-80`
              }
               `}
          >
            <span
              className={`
                  ${
                    showOverlay
                      ? '*:bg-slate-80 *:group-hover:bg-white-100'
                      : '*:bg-white-100 *:group-hover:bg-slate-80'
                  }
                  *:transition-transform
                  *:duration-[250ms]
                  relative 
                  overflow-hidden
                  min-w-4
                  md:min-w-6
                  w-4
                  md:w-6
                  min-h-4
                  md:min-h-6
                  h-4
                  md:h-6 
                  flex
                  flex-col
                  justify-center
                  items-center
                  gap-3
                  `}
              aria-hidden="true"
            >
              <span className={envisTwMerge(`${showOverlay ? 'rotate-45' : 'rotate-90'}`, lineClassName)}></span>
              <span className={envisTwMerge(`${showOverlay ? '-rotate-45' : 'rotate-180'}`, lineClassName)}></span>
            </span>
          </div>
        </button>
      </figcaption>
    </figure>
  )
})
