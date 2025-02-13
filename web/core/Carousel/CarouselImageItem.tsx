import envisTwMerge from '../../twMerge'
import Image from '../../pageComponents/shared/SanityImage'
import { ImageWithAlt, LinkData } from '../../types/index'
import { DisplayModes } from './Carousel'
import { forwardRef, HTMLAttributes, useEffect, useMemo, useRef } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { SanityImageObject } from '@sanity/image-url/lib/types/types'
import { BaseLink } from '@core/Link'
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
  aspectRatio?: string
  caption?: PortableTextBlock[] | string
  attribution?: string
  captionTeaserTitle?: string
  captionTitle?: PortableTextBlock[]
  captionText?: PortableTextBlock[]
  active?: boolean
  action?: LinkData
  wasUserPress?: boolean
} & HTMLAttributes<HTMLLIElement>

export const CarouselImageItem = forwardRef<HTMLLIElement, CarouselImageItemProps>(function CarouselImageItem(
  {
    type,
    active = false,
    wasUserPress = false,
    image,
    caption,
    attribution,
    captionTitle,
    captionText,
    captionTeaserTitle,
    displayMode = 'single',
    className = '',
    action,
    ...rest
  },
  ref,
) {
  const itemRef = useRef<HTMLLIElement>(null)
  const combinedItemRef = useMemo(() => mergeRefs<HTMLLIElement>(itemRef, ref), [itemRef, ref])
  const isJustImage = type === 'imageWithAltAndCaption' && !caption && !attribution
  const isImageWithSimpleCaption = type === 'imageWithAltAndCaption' && (!!caption || !!attribution)
  const isImageWithRichTextCaption = type === 'imageWithRichTextBelow' && !!caption
  const isImageWithJustLink = type === 'imageWithLinkAndOrOverlay' && action && (!captionTitle || !captionText)
  const isImageWithOverlay = type === 'imageWithLinkAndOrOverlay' && (!!captionTitle || !!captionText)

  const url = action && getUrlFromAction(action)

  useEffect(() => {
    if (active && itemRef?.current && wasUserPress) {
      itemRef?.current?.focus()
    }
  }, [active, wasUserPress])

  const getBody = () => {
    if (isJustImage) {
      return (
        <div
          className={`relative 
            w-full 
            h-full 
            rounded-md`}
        >
          <Image maxWidth={1420} image={image as ImageWithAlt} fill className="rounded-md" />
        </div>
      )
    }
    if (isImageWithSimpleCaption) {
      return (
        <figure className="relative w-full h-full rounded-md flex items-end">
          <Image maxWidth={1420} image={image as ImageWithAlt} fill className={`rounded-md`} />
          <figcaption
            className={`w-full rounded-b-md z-[1] fade-in-black-gradient fadeInVisibilityOpacityDisplay transition-all 
            ${displayMode === 'single' ? (active ? 'block' : 'hidden') : ''}`}
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
          <Image maxWidth={1420} image={image as ImageWithAlt} fill className={`rounded-md`} />
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
      const singleClassname = `fadeInVisibilityOpacityDisplay transition-all ${active ? 'block' : 'hidden'}`
      const scrollClassname = ``
      return (
        <figure className="w-full h-full flex flex-col">
          <div className={`relative w-full aspect-4/5 md:aspect-video rounded-md`}>
            <Image maxWidth={1420} image={image as ImageWithAlt} fill className="rounded-md" />
          </div>
          <figcaption
            className={`max-w-text py-6 px-8 ${displayMode === 'single' ? singleClassname : scrollClassname}`}
          >
            {caption && (
              <Blocks
                //@ts-ignore:TODO
                value={caption}
              />
            )}
          </figcaption>
        </figure>
      )
    }
  }

  const scrollListItemWidthsClassNames = `w-[75vw] md:w-[70vw] lg:w-[62vw] max-w-[1030px]`
  const singleListItemWidthsClassNames = `w-single-carousel-card-w-sm 
        md:w-single-carousel-card-w-md 
        lg:w-single-carousel-card-w-lg`

  return (
    <li
      {...rest}
      ref={combinedItemRef}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={active ? 0 : -1}
      aria-current={active}
      aria-hidden={!active}
      className={envisTwMerge(
        `
        relative
        h-full
        ${isImageWithRichTextCaption ? '' : 'aspect-video min-h-[250px]'}
        ${displayMode === 'single' ? singleListItemWidthsClassNames : scrollListItemWidthsClassNames}
        ${
          displayMode === 'single'
            ? `
            focus:outline-dashed
            focus:outline-2
            focus:outline-grey-50
            dark:focus:outline-white-100
            focus:outline-offset-2
            transition-opacity
            duration-1000
            ease-[ease]
            ${!active ? 'opacity-30' : ''}
            ms-2 
            me-2 
            col-start-1 
            col-end-1 
            row-start-1 
            row-end-1
        `
            : `snap-center 
          snap-mandatory
          shrink-0
            `
        }
        `,
        className,
      )}
    >
      {getBody()}
    </li>
  )
})
