import { LinkData } from '../../types'
import envisTwMerge from '../../twMerge'
import { forwardRef, HTMLAttributes, ReactNode, useEffect, useId, useMemo, useRef } from 'react'
import { PortableTextBlock } from '@portabletext/types'
import { DisplayModes } from './Carousel'
import { Heading, Typography } from '@core/Typography'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { ResourceLink } from '@core/Link'
import { getUrlFromAction } from '../../common/helpers'
import { getLocaleFromName } from '../../lib/localization'
import { mergeRefs } from '@equinor/eds-utils'

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
    variant = 'richTextBelow',
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
      return <Heading as="h3" variant="h6" value={title} />
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
  snap-center
  pb-6
  last:mr-lg 
  lg:last:mr-layout-sm
  max-h-[500px] 
  lg:max-h-[740px]`

  const singleVariantClassNames = `
  h-full
  ${variant === 'richTextBelow' ? '' : `${singleWidths} ${singleHeigths}`}
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
          <figure className={`flex flex-col ${displayMode === 'single' ? `${singleWidths}` : ''}`}>
            <div
              className={`${
                displayMode === 'scroll'
                  ? 'aspect-9/16'
                  : `
              ${overrideHeights ? 'aspect-video' : `${singleHeigths} aspect-9/16 md:aspect-video`}`
              }`}
            >
              {children}
            </div>
            <figcaption
              className={`pt-4 
                pr-4  
                w-full
                h-fit
                ${displayMode === 'single' ? `${active ? 'opacity-100' : 'opacity-50'}` : ''}
            `}
            >
              <div
                className={`w-full 
              h-fit 
              flex 
              flex-col
              gap-2
              last:self-end
              max-w-text`}
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
        ${displayMode === 'single' ? singleVariantClassNames : scrollVariantClassNames}`,
        className,
      )}
    >
      {getVariantBody()}
    </li>
  )
})
