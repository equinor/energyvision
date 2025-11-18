/* eslint-disable @typescript-eslint/ban-ts-comment */
import { forwardRef, HTMLAttributes } from 'react'
import Blocks from '../../portableText/Blocks'
import { PortableTextBlock } from '@portabletext/types'
import { ImageWithAlt } from '../../types'
import { ColorKeyTokens } from '../../styles/colorKeyToUtilityMap'
import { BaseLink, ResourceLink } from '@/core/Link'
import { Image } from '../Image/Image'
import { Typography } from '@/core/Typography'
import { twMerge } from 'tailwind-merge'

export type Variants = 'primary' | 'secondary'

export type BannerProps = {
  variant?: Variants
  title?: PortableTextBlock[] | string
  ingress?: PortableTextBlock[]
  content?: PortableTextBlock[]
  image?: ImageWithAlt
  ctaLabel?: string
  ctaLink?: string
  className?: string
  /* Override styling on typography element. */
  titleClassName?: string
  backgroundUtility?: keyof ColorKeyTokens
} & HTMLAttributes<HTMLDivElement>

/** Generic Banner component */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { title, ingress, content, image, ctaLabel, ctaLink, className = '', variant = 'primary', titleClassName = '' },
  ref,
) {
  const contentVariantClassName: Partial<Record<Variants, string>> = {
    primary: 'group flex flex-col pt-4 pb-6 xl:pb-16',
    secondary: 'group flex flex-col pt-4 pb-6 xl:pb-16',
  }
  const titleVariantClassName: Partial<Record<Variants, string>> = {
    primary: 'text-md',
    secondary: 'text-base pb-4',
  }
  const titleClassNames = twMerge(
    `${!ctaLabel ? 'group-hover:underline peer-hover:underline' : ''}
    ${titleVariantClassName[variant]}`,
    titleClassName,
  )

  const getTitleElement = () => {
    if (title && (title === 'string' || typeof title === 'string')) {
      return (
        <Typography as="h2" variant="h4" className={titleClassNames}>
          {title}
        </Typography>
      )
    }
    if (title && Array.isArray(title)) {
      return <Blocks as="h2" variant="h4" className={titleClassNames} value={title} />
    }
    return null
  }

  const contentElements = (
    <>
      {ingress && <Blocks variant="ingress" value={ingress} clampLines={3} className={`py-2 text-sm`} />}
      {content && variant !== 'secondary' && <Blocks value={content} />}
    </>
  )
  return (
    <div
      ref={ref}
      className={twMerge(
        `flex flex-col gap-4 xl:grid xl:grid-cols-[max-content_auto] xl:items-center xl:gap-14 xl:py-6 xl:pr-6`,
        className,
      )}
    >
      <div className="relative aspect-video h-full w-full max-w-[420px] xl:min-w-[320px]">
        {image && <Image aria-hidden grid="xs" image={image} fill className="rounded-md" />}
      </div>
      {ctaLink && (
        <div className={`${contentVariantClassName[variant]}`}>
          {ctaLabel ? (
            <>
              {title && getTitleElement()}
              {contentElements}
              <ResourceLink href={ctaLink} type="internalUrl" className="w-fit">
                {ctaLabel}
              </ResourceLink>
            </>
          ) : (
            <>
              <BaseLink href={ctaLink} type="internalUrl">
                {getTitleElement() ?? 'Missing title'}
              </BaseLink>
              {contentElements}
            </>
          )}
        </div>
      )}
      {!ctaLink && (
        <div className={`${contentVariantClassName[variant]}`}>
          {title && getTitleElement()}
          {contentElements}
        </div>
      )}
    </div>
  )
})
