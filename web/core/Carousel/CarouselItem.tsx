'use client'
import { LinkData } from '../../types'
import { forwardRef, HTMLAttributes, ReactNode, useEffect, useId, useMemo, useRef } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { DisplayModes } from './Carousel'
import { Typography } from '@/core/Typography'
import Blocks from '../../portableText/Blocks'
import { ResourceLink } from '@/core/Link'
import { getLocaleFromName } from '../../sanity/localization'
import { mergeRefs } from '@equinor/eds-utils'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { twMerge } from 'tailwind-merge'

export type Variants = 'richTextBelow' | 'default'

type CarouselItemProps = {
  variant?: Variants
  displayMode?: DisplayModes
  active?: boolean
  /* The component to use to display custom carousel item */
  children: ReactNode
  /* With richTextBelow */
  title?: PortableTextBlock[] | string
  /* With richTextBelow. Use for captions, descriptions etc */
  content?: PortableTextBlock[] | string
  /* With richTextBelow. */
  action?: LinkData
  /* With richTextBelow or default. */
  attribution?: string
  /* Override heights in the richTextBelow */
  overrideHeights?: boolean
  /** Single container */
  wasUserPress?: boolean
} & HTMLAttributes<HTMLLIElement>

/* Carousel item
 * Use when there no extra configurations
 * needed that requires a custom carousel item component
 */
export const CarouselItem = forwardRef<HTMLLIElement, CarouselItemProps>(function CarouselItem(
  {
    variant = 'default',
    displayMode = 'scroll',
    wasUserPress = false,
    overrideHeights = false,
    children,
    title,
    content,
    active,
    action,
    attribution,
    className = '',
    ...rest
  },
  ref,
) {
  const id = useId()
  const itemRef = useRef<HTMLLIElement>(null)
  const combinedItemRef = useMemo(() => mergeRefs<HTMLLIElement>(itemRef, ref), [itemRef, ref])

  const getTitleElement = () => {
    if (title && (title === 'string' || typeof title === 'string')) {
      return (
        <Typography as="h3" variant="h6">
          {title}
        </Typography>
      )
    }
    if (title && Array.isArray(title)) {
      return <Blocks as="h3" variant="h6" value={title} />
    }
    return null
  }

  const getContentElement = () => {
    if (content && (content === 'string' || typeof content === 'string')) {
      return <Typography variant="caption">{content}</Typography>
    }
    if (content && Array.isArray(content)) {
      return <Blocks value={content} />
    }
    return null
  }

  const singleWidths = `
  w-single-carousel-card-w-sm
  md:w-single-carousel-card-w-md
  lg:w-single-carousel-card-w-lg`
  const singleHeigths = `
  min-h-single-carousel-card-h-sm
  md:min-h-single-carousel-card-h-md
  lg:min-h-single-carousel-card-h-lg`

  const scrollVariantClassNames = `
  group
  shrink-0
  grow
  snap-start
  scroll-ml-0.5
  first:pl-0.5
  last:pr-6`
  //  max-h-[500px]
  //lg:max-h-[740px]

  const singleVariantClassNames = `
  h-full
  ${variant === 'richTextBelow' ? '' : `${singleWidths}`} 
  ms-2 
  me-2 
  col-start-1 
  col-end-1 
  row-start-1 
  row-end-1
  transition-opacity
  duration-1000
  ease-ease
  ${!active ? 'opacity-30' : 'opacity-100'}
  `

  const getVariantBody = () => {
    switch (variant) {
      case 'richTextBelow': {
        return (
          <figure className={`flex h-full flex-col ${displayMode === 'single' ? `${singleWidths}` : ''}`}>
            <div
              className={`${
                displayMode === 'scroll' ? '' : `aspect-4/3 md:aspect-video` //` ${overrideHeights ? 'aspect-video' : `${singleHeigths} aspect-9/16 md:aspect-video`}`
              }`}
            >
              {children}
            </div>
            <figcaption
              className={`h-fit w-full pt-4 pr-4 ${displayMode === 'single' ? `${active ? 'opacity-100' : 'opacity-50'}` : ''} `}
            >
              <div className={`flex h-fit w-full max-w-text flex-col gap-2 last:self-end`}>
                {getTitleElement()}
                {getContentElement()}
                {attribution && <span className={`text-base text-white-100`}>{attribution}</span>}
                {action && action.label && (
                  <ResourceLink
                    href={getUrlFromAction(action) || ''}
                    aria-label={action?.['aria-label']}
                    variant="fit"
                    className="mt-auto"
                    hrefLang={action?.type === 'internalUrl' ? getLocaleFromName(action?.link?.lang) : undefined}
                  >
                    {action.label}
                  </ResourceLink>
                )}
              </div>
            </figcaption>
          </figure>
        )
      }
      default:
        return <>{children}</>
    }
  }

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
      key={id}
      ref={combinedItemRef}
      {...(displayMode === 'single' && {
        'aria-current': active,
        tabIndex: active ? 0 : -1,
      })}
      className={twMerge(
        `relative mt-1 focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-50 focus-visible:outline-dashed dark:focus-visible:outline-white-100 ${displayMode === 'single' ? singleVariantClassNames : scrollVariantClassNames}`,
        className,
      )}
    >
      {getVariantBody()}
    </li>
  )
})
