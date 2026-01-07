/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { OverridableComponent } from '@equinor/eds-utils'
import {
  type AnchorHTMLAttributes,
  type ElementType,
  forwardRef,
  type HTMLAttributes,
} from 'react'
import { twMerge } from '@/lib/twMerge/twMerge'
import {
  quickVariants,
  type TypographyGroups,
  type TypographyVariants,
  variants,
} from './variants'

const getElementType = (variant: string, link: boolean): ElementType => {
  if (link) {
    return 'a'
  }
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return variant
    case 'highlight':
      return 'span'
    case 'div':
      return 'div'
    default:
      return 'p'
  }
}

const findTypography = (
  variantName: TypographyVariants,
  group?: TypographyGroups,
): string => {
  // For quick use when using paragraphs and headings we can skip group
  //@ts-ignore
  if (!group && quickVariants[variantName]) {
    //@ts-ignore
    return quickVariants[variantName] as string
  }
  //@ts-ignores
  return (variants[group] as unknown)[variantName] as string
}

export type TypographyProps = {
  /** Typography variants, specifies which variant to use.
   * @default body
   */
  variant?: TypographyVariants
  /** Typography groups, specifies which group to use. */
  group?: TypographyGroups
  /** Override the element type */
  as?: ElementType
  /** Override variant styling */
  className?: string
  /** Link. */
  link?: boolean
  /**
   * Typography text
   */
  children?: React.ReactNode
} & (
  | HTMLAttributes<HTMLParagraphElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | HTMLAttributes<HTMLParagraphElement>
)

/**
 * Typography used for common text styles
 * @example
 * ```jsx
 *     <Typography variant="h6" as="h2" className="text-moss-green-100">
 *       I am a h2 heading with h6 styling with classname override
 *     </Typography>
 * ```
 */
export const Typography: OverridableComponent<TypographyProps, HTMLElement> =
  forwardRef(function Typography(
    {
      variant = 'body',
      group,
      children,
      as: providedAs,
      link = false,
      className = '',
      ...rest
    },
    ref,
  ) {
    const as: ElementType = providedAs
      ? providedAs
      : getElementType(variant, link)
    const typography = findTypography(variant, group)

    if (typeof typography === 'undefined') {
      throw new Error(
        `Typography variant not found for variant "${variant}" ("${variant}") & group "${group || ''}"`,
      )
    }
    const TypographyTag = as ?? (`p` as React.ElementType)

    // text color for regular and dark is applied in globals base body. is it necessary here?
    return (
      <TypographyTag
        {...rest}
        ref={ref}
        className={twMerge(
          'wrap-break-word text-pretty text-slate-80 dark:text-white-100',
          group !== 'article' && 'max-w-text',
          typography,
          className,
        )}
      >
        {children}
      </TypographyTag>
    )
  })
