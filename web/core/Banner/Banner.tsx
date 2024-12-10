/* eslint-disable @typescript-eslint/ban-ts-comment */
import { forwardRef, HTMLAttributes } from 'react'
import { getUrlFromAction } from '../../common/helpers'
import Blocks from '../../pageComponents/shared/portableText/Blocks'
import { PortableTextBlock } from '@portabletext/types'
import { ImageWithAlt, LinkData } from '../../types'
import { ColorKeyTokens } from '../../styles/colorKeyToUtilityMap'
import { BaseLink, ReadMoreLink } from '@core/Link'
import Image, { Ratios } from '../../pageComponents/shared/SanityImage'
import { getLocaleFromName } from '../../lib/localization'
import { Heading, Typography } from '@core/Typography'
import envisTwMerge from '../../twMerge'
import IngressText from '../../pageComponents/shared/portableText/IngressText'
import { ArrowRight } from '../../icons'

export type Variants = 'primary' | 'secondary'

export type BannerProps = {
  variant?: Variants
  title?: PortableTextBlock[] | string
  ingress?: PortableTextBlock[]
  content?: PortableTextBlock[]
  image?: ImageWithAlt
  action?: LinkData
  slug?: string
  className?: string
  /* Override styling on typography element. */
  titleClassName?: string
  backgroundUtility?: keyof ColorKeyTokens
} & HTMLAttributes<HTMLDivElement>

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { title, ingress, content, image, action, slug, className = '', variant = 'primary', titleClassName = '' },
  ref,
) {
  const url = action && getUrlFromAction(action)

  const iconClassNames = envisTwMerge(
    `size-arrow-right
    text-energy-red-100
    mr-2
    group-hover:translate-x-2
    transition-all
    duration-300
    mt-6
  `,
  )

  const contentVariantClassName: Partial<Record<Variants, string>> = {
    primary: 'group flex flex-col pt-4 pb-6 xl:pb-16',
    secondary: 'group flex flex-col pt-4 pb-6 xl:pb-16',
  }
  const titleVariantClassName: Partial<Record<Variants, string>> = {
    primary: 'text-md',
    secondary: 'text-base pb-4',
  }
  const titleClassNames = envisTwMerge(
    `group-hover:underline
    peer-hover:underline
    ${titleVariantClassName[variant]}`,
    titleClassName,
  )

  const contentElements = (
    <>
      {title && (
        <>
          {typeof title === 'string' ? (
            <Typography as="h2" variant="h4" className={titleClassNames}>
              {title}
            </Typography>
          ) : (
            <Heading as="h2" variant="h4" className={titleClassNames} value={title} />
          )}
        </>
      )}
      {ingress && (
        <IngressText value={ingress} clampLines={3} className={`${variant === 'secondary' ? 'text-xs' : ''}`} />
      )}
      {content && variant !== 'secondary' && <Blocks value={content} />}
    </>
  )
  return (
    <div
      ref={ref}
      className={envisTwMerge(
        `grid grid-cols-[60%_40%] xl:grid-cols-2 items-center gap-4 xl:gap-20 xl:py-6 xl:pr-6`,
        className,
      )}
    >
      {action && (
        <div className={`${contentVariantClassName[variant]}`}>
          {contentElements}
          {action && (
            <ReadMoreLink
              href={url as string}
              {...(action.link?.lang && { locale: getLocaleFromName(action.link?.lang) })}
              type={action.type}
              className="peer pt-6"
            >
              {`${action.label} ${action.extension ? `(${action.extension.toUpperCase()})` : ''}`}
            </ReadMoreLink>
          )}
        </div>
      )}
      {slug && (
        <BaseLink href={slug} className={`${contentVariantClassName[variant]}`}>
          {contentElements}
          {!action && slug && <ArrowRight className={iconClassNames} />}
        </BaseLink>
      )}
      {!action && !slug && <div className={`${contentVariantClassName[variant]}`}>{contentElements}</div>}
      <div className="relative w-full h-full">
        {image && (
          <Image
            aria-hidden
            sizes="(max-width: 800px) 100vw, 800px"
            image={image}
            fill
            aspectRatio={Ratios.FOUR_TO_FIVE}
            className="rounded-md"
          />
        )}
      </div>
    </div>
  )
})
