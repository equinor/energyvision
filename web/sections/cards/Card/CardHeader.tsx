import { PortableTextBlock } from '@portabletext/types'
import { Heading, Typography, TypographyVariants } from '@core/Typography'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export type CardHeaderProps = {
  /** Title string content */
  title?: string
  /** Title block content */
  titleBlock?: PortableTextBlock
  /** Title level, will be used 'as' if titleVariant is set
   * @default h3
   */
  titleLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  /* Use together with title level to set level = as and variant different */
  titleVariant?: TypographyVariants
  /* Override styling on hgroup if eyebrow else merged with titleClassName */
  className?: string
  /* Override styling on typography element.ClassName can be used if not eyebrow  */
  titleClassName?: string
  /* Shows a paragraph above title in hgroup  */
  eyebrow?: React.ReactNode
  /* Override styling on eyebrow element  */
  eyebrowClassName?: string
} & HTMLAttributes<HTMLDivElement>

/**
 * CardHeader component to be used inside CardContent Wrapper
 * @example
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  {
    title,
    titleBlock,
    titleLevel = 'h3',
    titleVariant = 'md',
    className = '',
    titleClassName = '',
    eyebrow,
    eyebrowClassName = '',
    ...rest
  },
  ref,
) {
  const titleClassNames = twMerge(
    `
  group-hover/card:underline 
  group-focus-visible/card:underline`,
    titleClassName,
  )
  return eyebrow ? (
    <hgroup ref={ref} className={twMerge('flex flex-col gap-2', className)} {...rest}>
      <p className={twMerge(`text-xs font-medium uppercase`, eyebrowClassName)}>{eyebrow}</p>
      {title && (
        <Typography
          {...(titleVariant && { as: titleLevel })}
          {...(titleVariant ? { variant: titleVariant } : { variant: titleLevel })}
          className={titleClassNames}
        >
          {title}
        </Typography>
      )}
      {titleBlock && <Heading as={titleLevel} variant={titleVariant} className={titleClassNames} value={titleBlock} />}
    </hgroup>
  ) : (
    <>
      {title && (
        <Typography
          ref={ref}
          {...(titleVariant && { as: titleLevel })}
          {...(titleVariant ? { variant: titleVariant } : { variant: titleLevel })}
          className={titleClassNames}
          {...rest}
        >
          {title}
        </Typography>
      )}
      {titleBlock && (
        <Heading
          {...(titleVariant && { as: titleLevel })}
          {...(titleVariant ? { variant: titleVariant } : { variant: titleLevel })}
          className={titleClassNames}
          value={titleBlock}
          {...rest}
        />
      )}
    </>
  )
})
