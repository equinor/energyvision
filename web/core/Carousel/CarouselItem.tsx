import { LinkData } from '../../types'
import envisTwMerge from '../../twMerge'
import { forwardRef, HTMLAttributes, ReactNode, useEffect, useId, useMemo, useRef } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { DisplayModes, getUtilityForAspectRatio, Layouts } from './Carousel'
import { Heading, Typography } from '@core/Typography'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { ResourceLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { mergeRefs } from '@equinor/eds-utils'

export type Variants = 'richTextBelow' | 'default'

// The accepted ratios from video, iframe and can be used with event,images, keynumber
export type CarouselAspectRatios = '16:9' | '9:16' | '1:1' | '4:3'

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
  /* Scroll container */
  layout?: Layouts
  /** Single container */
  wasUserPress?: boolean
  /* Only scroll: Sets widths based on aspect ratios type */
  aspectRatio?: CarouselAspectRatios
  /* Only scroll: To bypass getElementAspectRatio */
  customListItemWidth?: boolean
} & HTMLAttributes<HTMLLIElement>

/* Carousel item
 * Use when there no extra configurations
 * needed that requires a custom carousel item component
 */
export const CarouselItem = forwardRef<HTMLLIElement, CarouselItemProps>(function CarouselItem(
  {
    variant = 'richTextBelow',
    displayMode = 'scroll',
    layout = 'default',
    wasUserPress = false,
    children,
    title,
    content,
    active,
    action,
    attribution,
    className = '',
    aspectRatio = '16:9',
    customListItemWidth,
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
        <Typography as="h3" variant="h4">
          {title}
        </Typography>
      )
    }
    if (title && Array.isArray(title)) {
      return <Heading as="h3" variant="h4" value={title} />
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

  const getElementAspectRatio = () => {
    if (customListItemWidth || displayMode === 'single') {
      return
    }
    return getUtilityForAspectRatio(aspectRatio)
  }

  const scrollVariantClassNames = `
  group
  transform-all
  shrink-0
  grow
  relative
  snap-center
  pb-6
  ${layout === 'full' ? 'first:ml-lg lg:first:ml-layout-sm last:mr-lg lg:last:mr-layout-sm' : ''}`

  const singleVariantClassNames = `
  relative
  h-full
  w-single-carousel-card-w-sm 
  md:w-single-carousel-card-w-md 
  lg:w-single-carousel-card-w-lg
  ms-2 
  me-2 
  col-start-1 
  col-end-1 
  row-start-1 
  row-end-1
  focus:outline-dashed
  focus:outline-2
  focus:outline-grey-50
  dark:focus:outline-white-100
  focus:outline-offset-2
  transition-opacity
  duration-1000
  ease-[ease]
  ${!active ? 'opacity-30' : ''}
   ${variant !== 'richTextBelow' ? 'aspect-4/5 md:aspect-video' : ''}
  `

  const getVariantBody = () => {
    switch (variant) {
      case 'richTextBelow': {
        const scrollClassNames = ``
        const singleClassNames = `${active ? 'block' : 'hidden'}`

        return (
          <figure className="w-full h-full flex flex-col">
            <div className={getElementAspectRatio()}>{children}</div>
            <figcaption
              className={`pt-6 
            pr-4  
            w-full
            h-full
            ${displayMode === 'single' && singleClassNames}
            ${displayMode === 'scroll' && scrollClassNames}
            `}
            >
              <div
                className={`w-full 
              h-full 
              flex 
              flex-col
              gap-2
              last:self-end
              grow max-w-text`}
              >
                {getTitleElement()}
                {getContentElement()}
                {attribution && <span className={`text-white-100 text-base`}>{attribution}</span>}
                {action && action.label && (
                  <ResourceLink
                    href={getUrlFromAction(action) || ''}
                    aria-label={action?.ariaLabel}
                    variant="fit"
                    className="mt-auto"
                    locale={action?.type === 'internalUrl' ? getLocaleFromName(action?.link?.lang) : undefined}
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
        return <div className={`relative w-full h-full ${getElementAspectRatio()}`}>{children}</div>
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
        'aria-hidden': !active,
        tabIndex: active ? 0 : -1,
      })}
      className={envisTwMerge(
        `${displayMode === 'single' ? singleVariantClassNames : scrollVariantClassNames}
        `,
        className,
      )}
    >
      {getVariantBody()}
    </li>
  )
})
