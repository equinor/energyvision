import type { PortableTextBlock } from '@portabletext/types'
import { forwardRef, type HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography, type TypographyVariants } from '@/core/Typography'
import Blocks from '@/portableText/Blocks'
import type { Variants } from './Card'

export type CardHeaderProps = {
  /** Title string content */
  title?: string
  /** Title block content */
  titleBlock?: PortableTextBlock[]
  /** Title level, will be used 'as' if titleVariant is set
   * @default h3
   */
  titleLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  /* Use together with title level to set level = as and variant different */
  titleVariant?: TypographyVariants
  /* Override styling on hgroup if eyebrow */
  className?: string
  /* Override styling on typography element. */
  titleClassName?: string
  /* Shows a paragraph above title in hgroup  */
  eyebrow?: React.ReactNode
  /* Override styling on eyebrow element  */
  eyebrowClassName?: string
  /** Variant to use
   * @default primary
   */
  variant?: Variants
} & HTMLAttributes<HTMLDivElement>

/**
 * CardHeader component to be used inside CardContent Wrapper
 * @example
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(
    {
      title,
      titleBlock,
      titleLevel = 'h3',
      titleVariant,
      className = '',
      titleClassName = '',
      eyebrow,
      eyebrowClassName = '',
      variant = 'primary',
      ...rest
    },
    ref,
  ) {
    const titleClassNames = twMerge(
      `group-hover/card:underline
    group-focus-visible/card:underline
    max-w-prose
    text-pretty
    dark:text-white-100
  `,
      titleClassName,
    )

    return eyebrow ? (
      <hgroup
        ref={ref}
        className={twMerge('flex w-full flex-col gap-2 text-pretty', className)}
        {...rest}
      >
        <Typography variant='eyebrow' className={eyebrowClassName}>
          {eyebrow}
        </Typography>
        {title && (
          <Typography
            group='card'
            {...(titleVariant && { as: titleLevel })}
            {...(titleVariant
              ? { variant: titleVariant }
              : { variant: titleLevel })}
            className={titleClassNames}
          >
            {title}
          </Typography>
        )}
        {titleBlock && (
          <Blocks
            group='card'
            as={titleLevel}
            variant={titleVariant}
            blockClassName={titleClassNames}
            value={titleBlock}
          />
        )}
      </hgroup>
    ) : (
      <>
        {title && (
          <Typography
            group='card'
            ref={ref}
            {...(titleVariant && { as: titleLevel })}
            {...(titleVariant
              ? { variant: titleVariant }
              : { variant: titleLevel })}
            className={titleClassNames}
            {...rest}
          >
            {title}
          </Typography>
        )}
        {titleBlock && (
          <Blocks
            group='card'
            {...(titleVariant && { as: titleLevel })}
            {...(titleVariant
              ? { variant: titleVariant }
              : { variant: titleLevel })}
            blockClassName={titleClassNames}
            value={titleBlock}
            {...rest}
          />
        )}
      </>
    )
  },
)
