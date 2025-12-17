'use client'
import { Typography } from '@equinor/eds-core-react'
import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { useTranslations } from 'next-intl'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { forwardRef, type HTMLAttributes, useId, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import type { DisplayModes } from '@/core/Carousel/Carousel'
import { ResourceLink } from '@/core/Link'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import Blocks from '../../portableText/Blocks'
import { getLocaleFromName } from '../../sanity/helpers/localization'
import type { ImageWithAlt, LinkData } from '../../types'
import { Image } from '../Image/Image'

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

export const ImageWithOverlay = forwardRef<
  HTMLDivElement,
  ImageWithOverlayProps
>(function ImageWithOverlay(
  {
    teaserTitle,
    title,
    text,
    image,
    action,
    className = '',
    captionClassname = '',
  },
  ref,
) {
  const [showOverlay, setShowOverlay] = useState(false)
  const toggleButtonId = useId()
  const overlayId = useId()
  const url = action && getUrlFromAction(action)
  const intl = useTranslations()
  const isMobile = useMediaQuery(`(max-width: 700px)`)

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
        <Typography as='h2' variant='h4' className='text-md lg:text-lg'>
          {title}
        </Typography>
      ) : (
        //@ts-ignore: Checked earlier for undefined title
        <Blocks
          as='h2'
          variant='h4'
          className='text-md lg:text-lg'
          value={title}
        />
      )}
    </>
  )

  return (
    <figure
      ref={ref}
      className={twMerge(`h-full w-full rounded-md`, className)}
    >
      <Image
        grid='sm'
        image={image as ImageWithAlt}
        fill
        className={`aspect-4/3 rounded-md md:aspect-video`}
      />
      <figcaption
        className={twMerge(
          `h-full w-full transition-opacity`,
          captionClassname,
        )}
      >
        <div
          className={`absolute inset-0 z-[1] rounded-md transition-colors duration-[250ms] ${showOverlay ? 'bg-slate-blue-95' : ''} flex flex-col-reverse rounded-b-md`}
        >
          <div
            className={`h-fit rounded-b-md ${
              showOverlay
                ? 'justify-end'
                : 'fade-in-black-gradient justify-between'
            } flex items-end px-8 py-6`}
          >
            {teaserTitle && (
              <div
                className={`w-2/3 pt-40 text-left text-lg text-white-100 ${showOverlay ? 'hidden' : 'block'}`}
              >
                {teaserTitle}
              </div>
            )}
          </div>
          <div
            id={overlayId}
            className={`dark max-w-text px-4 py-2 lg:px-8 lg:py-6 ${showOverlay ? 'opacity-100' : 'opacity-0'} ${showOverlay ? 'visible' : 'invisible'} `}
          >
            <div className={`pb-1 lg:pb-6`}>{title && titleElement}</div>
            {text && (
              <Blocks
                value={text}
                className={`text-sm md:text-base ${action ? 'pb-1 lg:pb-4' : ''}`}
              />
            )}
            {action && (
              <ResourceLink
                href={url as string}
                extension={action.extension}
                showExtensionIcon={true}
                {...(action.link?.lang && {
                  locale: getLocaleFromName(action.link?.lang),
                })}
                type={action.type}
                variant='fit'
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
          className={`focus-visible:envis-outline absolute right-0 bottom-0 z-[3] flex items-end justify-end p-1.5 focus:outline-hidden lg:px-8 lg:py-6`}
        >
          <span className='sr-only'>{intl('readMore') ?? 'Read more'}</span>
          <div
            className={`group focus-visible:envis-outline-invert flex size-3 items-center justify-center rounded-full p-5 text-2xl focus:outline-hidden md:size-4 md:p-6 ${
              showOverlay
                ? 'bg-white-100 text-slate-80 hover:bg-slate-80 hover:text-white-100'
                : `bg-slate-80 text-white-100 hover:bg-white-100 hover:text-slate-80`
            } `}
          >
            <span
              className={` ${
                showOverlay
                  ? '*:bg-slate-80 *:group-hover:bg-white-100'
                  : '*:bg-white-100 *:group-hover:bg-slate-80'
              } relative flex h-4 min-h-4 w-4 min-w-4 flex-col items-center justify-center gap-3 overflow-hidden *:transition-transform *:duration-[250ms] md:h-6 md:min-h-6 md:w-6 md:min-w-6`}
              aria-hidden='true'
            >
              <span
                className={twMerge(
                  `${showOverlay ? 'rotate-45' : 'rotate-90'}`,
                  lineClassName,
                )}
              ></span>
              <span
                className={twMerge(
                  `${showOverlay ? '-rotate-45' : 'rotate-180'}`,
                  lineClassName,
                )}
              ></span>
            </span>
          </div>
        </button>
      </figcaption>
    </figure>
  )
})
