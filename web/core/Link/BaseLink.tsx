import { AnchorHTMLAttributes, forwardRef } from 'react'
import { default as NextLink, LinkProps } from 'next/link'
import { twMerge } from 'tailwind-merge'
import { LinkType } from '../../types/index'

export type BaseLinkProps = {
  /** What kind of content is it  */
  type?: LinkType
  /** The locale for the link, required for internal URLs */
  locale?: string
  /** Skip internal link styling, because incoming button styling */
  skipInternalStyle?: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps

/** Base link style for use
 * Contains the common focus and active styling
 * And the strict origin policy when external for using blank
 */
export const BaseLink = forwardRef<HTMLAnchorElement, BaseLinkProps>(function BaseLink(
  { children, type = 'internalUrl', className = '', href = '', skipInternalStyle = false, ...rest },
  ref,
) {
  const classNames = skipInternalStyle
    ? className
    : twMerge(
        `text-base
    text-slate-80
    focus:outline-none
    focus-visible:envis-outline
    active:scale-99
    dark:text-white-100
    dark:focus-visible:envis-outline-invert
    dark:active:envis-outline-invert
  `,
        className,
      )

  const getLinkElement = () => {
    switch (type) {
      case 'externalUrl':
        return (
          // https://web.dev/articles/referrer-best-practices
          // strict-origin-when-cross-origin only share the origin
          // and thus protects privacy but gives Referrer origin
          // for SEO
          // eslint-disable-next-line react/jsx-no-target-blank
          <a
            className={classNames}
            ref={ref}
            href={href}
            target="_blank"
            {...rest}
            rel="noopener"
            referrerPolicy="strict-origin-when-cross-origin"
          >
            {children}
          </a>
        )
      case 'icsLink':
        return (
          <a className={classNames} ref={ref} href={href} {...rest}>
            {children}
          </a>
        )

      default:
        return (
          <NextLink ref={ref} href={href} prefetch={false} className={classNames} {...rest}>
            {children}
          </NextLink>
        )
    }
  }

  return getLinkElement()
})
export default BaseLink
