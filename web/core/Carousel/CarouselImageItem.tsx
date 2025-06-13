import envisTwMerge from '../../twMerge'
import Image, { getPxSmSizes } from '../../pageComponents/shared/SanityImage'
import { ImageWithAlt, LinkData } from '../../types/index'
import { DisplayModes } from './Carousel'
import { forwardRef, HTMLAttributes, useEffect, useMemo, useRef } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { BaseLink, ResourceLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { ArrowRight } from '../../icons'
import { ImageWithOverlay } from '@core/Image/ImageWithOverlay'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { mergeRefs } from '@equinor/eds-utils'

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
        <div className={`relative w-full h-full rounded-md`}>
          <Image maxWidth={1420} sizes={getPxSmSizes()} image={image as ImageWithAlt} fill className="rounded-md" />
        </div>
      )
    }
    if (isImageWithSimpleCaption) {
      return (
        <figure className="relative w-full h-full rounded-md flex items-end">
          <Image
            maxWidth={1420}
            sizes={getPxSmSizes()}
            image={image as ImageWithAlt}
            fill
            className={`rounded-md ${singleHeights}`}
          />
          <figcaption
            className={`w-full rounded-b-md z-[1] fade-in-black-gradient 
            ${displayMode === 'single' ? (active ? 'opacity-100' : 'opacity-50') : ''}`}
          >
            <div className={`w-full h-fit pt-20 pb-6 px-8`}>
              <span className="w-2/3 flex flex-col gap-1 ">
                {caption && <span className={`text-white-100 text-left text-lg`}>{caption as string}</span>}
                {attribution && <span className={`text-white-100 text-base`}>{attribution}</span>}
              </span>
            </div>
          </figcaption>
        </figure>
      )
    }
    if (isImageWithJustLink) {
      return (
        <figure className="relative w-full h-full">
          <Image
            maxWidth={1420}
            sizes={getPxSmSizes()}
            image={image as ImageWithAlt}
            fill
            className={`${singleHeights} rounded-md`}
          />
          <div className="h-full w-full fade-in-black-gradient pt-20 flex items-end rounded-b-md">
            <BaseLink
              href={url as string}
              {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
              type={action.type}
              className="group flex gap-2"
            >
              <span className="text-white-100 text-left text-lg">{action.label}</span>
              <ArrowRight className={`group-hover:translate-y-2 size-10`} />
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
        <figure className="w-full h-full flex flex-col">
          <div className={`relative w-full rounded-md ${singleHeights}`}>
            <Image maxWidth={1420} sizes={getPxSmSizes()} image={image as ImageWithAlt} fill className="rounded-md" />
          </div>
          <figcaption
            className={`h-fit max-w-text p-4 lg:py-6 lg:px-8 ${
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
  const singleListItemWidthsClassNames = `w-single-carousel-card-w-sm md:w-single-carousel-card-w-md lg:w-single-carousel-card-w-lg`

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
      className={envisTwMerge(
        `relative
        mt-1
        focus:outline-none
        focus-visible:outline-dashed
        focus-visible:outline-2
        focus-visible:outline-grey-50
        dark:focus-visible:outline-white-100
        focus-visible:outline-offset-2
        ${isImageWithRichTextCaption ? 'h-full' : singleHeights}
        ${displayMode === 'single' ? singleListItemWidthsClassNames : scrollListItemWidthsClassNames}
        ${
          displayMode === 'single'
            ? `
            ${!active ? 'opacity-30' : 'opacity-100'}
            transition-opacity
            duration-1000
            ease-ease
            ms-2 
            me-2 
            col-start-1 
            col-end-1 
            row-start-1 
            row-end-1
        `
            : `snap-center snap-mandatory shrink-0`
        }
        `,
        className,
      )}
    >
      {getBody()}
    </li>
  )
})
