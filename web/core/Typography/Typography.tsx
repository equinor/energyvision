/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { OverridableComponent } from '@equinor/eds-utils'
//import { clsx } from 'clsx'
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
    case 'h1_base':
    case 'h1_lg':
    case 'h1_xl':
    case 'h2_base':
    case 'h2_lg':
    case 'h2_xl':
      return 'div'
    default:
      return 'p'
  }
}

//For the displayTextVariant field in studio
export const getDisplayTextVariant = (
  displayTextVariant: string | undefined,
): TypographyVariants => {
  switch (displayTextVariant) {
    case 'lg':
      return 'h2_lg'
    case 'xl':
      return 'h2_xl'
    default:
      return 'h2_base'
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
   *
   * Quick variants can be used without providing `group`.
   * These are the variants merged into `quickVariants` from the `heading`,
   * `paragraph`, `marks`, and `plain` groups in `variants.ts`.
   *
   * Variants that only exist in grouped collections, such as `display` or `card`,
   * should be paired with the matching `group` prop so the class lookup resolves correctly.
   * @default body
   */
  variant?: TypographyVariants
  /** Typography groups, specifies which group to use.
   *
   * Optional when `variant` is a quick variant.
   * Required in practice for grouped-only variants such as `h1_base`, `h2_lg`, or card-specific styles.
   */
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
 *
 * When `group` is omitted, the component first resolves `variant` against the shared
 * quick variant map. That supports the common heading, paragraph, marks, and plain variants
 * without extra configuration.
 *
 * Use `group` when selecting a variant that belongs to a specific collection such as
 * `display`, `card`, or `article`.
 *
 * @example
 * ```jsx
 *     <Typography variant="h6" as="h2" className="text-moss-green-100">
 *       I am a h2 heading with h6 styling with classname override
 *     </Typography>
 * ```
 *
 * @example
 * ```jsx
 *     <Typography variant="body">
 *       Quick variants like body resolve without a group.
 *     </Typography>
 *
 *     <Typography variant="h2_base" group="display">
 *       Display variants should be used with their group.
 *     </Typography>
 * ```
 */
export const Typography: OverridableComponent<TypographyProps, HTMLElement> =
  forwardRef(function Typography(
    {
      variant,
      group,
      children,
      as: providedAs,
      link = false,
      className = '',
      id,
    },
    ref,
  ) {
    const as: ElementType = providedAs
      ? providedAs
      : getElementType(variant, link)
    const typography = findTypography(variant, group)

    if (typeof typography === 'undefined') {
      console.warn(
        `Typography variant not found for variant "${variant}" & group "${group ?? ''}"`,
      )
    }
    const TypographyTag = as ?? (`p` as React.ElementType)

    return (
      <TypographyTag
        ref={ref}
        {...(id && { id: id })}
        className={twMerge(
          'wrap-break-word max-w-text text-slate-80 dark:text-white-100',
          typography,
          className,
        )}
      >
        {children}
      </TypographyTag>
    )
  })
