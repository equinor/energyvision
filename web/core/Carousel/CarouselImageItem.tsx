'use client'
import { Image } from '../Image/Image'
import { ImageWithAlt, LinkData } from '../../types/index'
import { DisplayModes } from './Carousel'
import { forwardRef, HTMLAttributes, useEffect, useMemo, useRef } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { BaseLink, ResourceLink } from '@/core/Link'
import { getLocaleFromName } from '../../sanity/localization'
import { ArrowRight } from '../../icons'
import { ImageWithOverlay } from '@/core/ImageWithOverlay/ImageWithOverlay'
import Blocks from '../../portableText/Blocks'
import { mergeRefs } from '@equinor/eds-utils'
import { twMerge } from 'tailwind-merge'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'

type CarouselImageItemProps = {
  type: string
  image?: ImageWithAlt | SanityImageObject
  displayMode?: DisplayModes
  className?: string
  caption?: PortableTextBlock[] | string
  attribution?: string
  captionTeaserTitle?: string
  captionTitle?: PortableTextBlock[]
  captionText?: PortableTextBlock[]
  active?: boolean
  action?: LinkData
  /** Single container */
  wasUserPress?: boolean
} & HTMLAttributes<HTMLLIElement>

export const CarouselImageItem = forwardRef<HTMLLIElement, CarouselImageItemProps>(function CarouselImageItem(
  {
    type,
    active = false,
    image,
    caption,
    attribution,
    captionTitle,
    captionText,
    captionTeaserTitle,
    displayMode = 'single',
    className = '',
    action,
    wasUserPress = false,
    ...rest
  },
  ref,
) {
  const itemRef = useRef<HTMLLIElement>(null)
  const combinedItemRef = useMemo(() => mergeRefs<HTMLLIElement>(itemRef, ref), [itemRef, ref])
  const isImageWithRichTextCaption = useMemo(() => type === 'imageWithRichTextBelow' && !!caption, [caption, type])
  const isJustImage = type === 'imageWithAltAndCaption' && !caption && !attribution
  const isImageWithSimpleCaption = type === 'imageWithAltAndCaption' && (!!caption || !!attribution)
  const isImageWithJustLink = type === 'imageWithLinkAndOrOverlay' && action && (!captionTitle || !captionText)
  const isImageWithOverlay = type === 'imageWithLinkAndOrOverlay' && (!!captionTitle || !!captionText)
  const url = action && getUrlFromAction(action)

  const singleHeights = `min-h-single-carousel-card-h-sm md:min-h-single-carousel-card-h-md lg:min-h-single-carousel-card-h-lg`

  const getBody = () => {
    if (isJustImage) {
      return (
        <Image
          grid="sm"
          image={image}
          fill
          className={`relative aspect-4/3 h-full w-full rounded-md md:aspect-video`}
          imageClassName="rounded-md"
        />
      )
    }
    if (isImageWithSimpleCaption) {
      return (
        <figure className="flex aspect-4/3 h-full w-full items-end rounded-md md:aspect-video">
          <Image grid="sm" image={image} fill className={`rounded-md`} />
          <figcaption
            className={`z-[1] w-full rounded-b-md fade-in-black-gradient ${displayMode === 'single' ? (active ? 'opacity-100' : 'opacity-50') : ''}`}
          >
            <div className={`h-fit w-full px-4 pt-20 pb-6 lg:px-8`}>
              <span className="flex w-full flex-col gap-1 lg:w-2/3">
                {caption && <span className={`text-left text-md text-white-100 lg:text-lg`}>{caption as string}</span>}
                {attribution && <span className={`text-base text-white-100`}>{attribution}</span>}
              </span>
            </div>
          </figcaption>
        </figure>
      )
    }
    if (isImageWithJustLink) {
      return (
        <figure className="h-full w-full">
          <Image grid="sm" image={image} fill className={`aspect-4/3 rounded-md md:aspect-video`} />
          <div className="flex h-full w-full items-end rounded-b-md fade-in-black-gradient pt-10 lg:pt-20">
            <BaseLink
              href={url as string}
              {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
              type={action.type}
              className="group flex gap-2"
            >
              <span className="text-left text-md text-white-100 lg:text-lg">{action.label}</span>
              <ArrowRight className={`size-10 group-hover:translate-y-2`} />
            </BaseLink>
          </div>
        </figure>
      )
    }
    if (isImageWithOverlay) {
      return (
        <ImageWithOverlay
          teaserTitle={captionTeaserTitle}
          //@ts-ignore:TODO
          title={captionTitle as PortableTextBlock[]}
          text={captionText}
          image={image}
          action={action}
          captionClassname={`${active ? 'opacity-100' : 'opacity-0'}`}
        />
      )
    }
    if (isImageWithRichTextCaption) {
      const singleClassname = `${active ? 'opacity-100' : 'opacity-50'}`
      const scrollClassname = ``
      return (
        <figure className="flex h-full w-full flex-col">
          <div className={`relative w-full rounded-md ${singleHeights}`}>
            <Image grid="sm" image={image} fill className="aspect-4/3 rounded-md md:aspect-video" />
          </div>
          <figcaption
            className={`h-fit max-w-text p-4 lg:px-8 lg:py-6 ${
              displayMode === 'single' ? singleClassname : scrollClassname
            }`}
          >
            {caption && (
              <Blocks
                //@ts-ignore:TODO
                value={caption}
              />
            )}
            {action && url && (
              <ResourceLink
                href={url}
                extension={action?.extension}
                showExtensionIcon={true}
                {...(action?.link?.lang && { locale: getLocaleFromName(action?.link?.lang) })}
                type={action?.type}
                variant="fit"
                className="mt-4"
              >
                {action?.label}
              </ResourceLink>
            )}
          </figcaption>
        </figure>
      )
    }
  }

  const scrollListItemWidthsClassNames = `w-[75vw] md:w-[70vw] lg:w-[62vw] max-w-[1030px]`

  useEffect(() => {
    if (displayMode === 'single') {
      if (active && itemRef?.current && wasUserPress) {
        itemRef?.current?.focus()
      }
    }
  }, [active, wasUserPress, displayMode])

  return (
    <li
      {...rest}
      ref={combinedItemRef}
      {...(displayMode === 'single' && {
        'aria-current': active,
        tabIndex: active ? 0 : -1,
      })}
      {...(displayMode === 'scroll' && {
        tabIndex: 0,
      })}
      className={twMerge(
        `relative mt-1 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-50 focus-visible:outline-dashed dark:focus-visible:outline-white-100 ${displayMode === 'single' ? 'w-single-carousel-card-w-sm md:w-single-carousel-card-w-md lg:w-single-carousel-card-w-lg' : scrollListItemWidthsClassNames} ${
          displayMode === 'single'
            ? ` ${!active ? 'opacity-30' : 'opacity-100'} col-start-1 col-end-1 row-start-1 row-end-1 ms-2 me-2 transition-opacity duration-1000 ease-ease`
            : `shrink-0 snap-mandatory snap-center`
        } `,
        className,
      )}
    >
      {getBody()}
    </li>
  )
})
