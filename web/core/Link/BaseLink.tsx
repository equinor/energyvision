import { AnchorHTMLAttributes, forwardRef } from 'react'
import { default as NextLink } from 'next/link'
import { twMerge } from 'tailwind-merge'

export type BaseLinkProps = {
  /** What kind of content is it  */
  type?: 'internalUrl' | 'externalUrl'
  /** The locale for the link, required for internal URLs */
  locale?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

/** Base link style for use
 * Contains the common focus and active styling
 * And the strict origin policy when external for using blank
 */
export const BaseLink = forwardRef<HTMLAnchorElement, BaseLinkProps>(function BaseLink(
  { children, type = 'internalUrl', className = '', href = '', ...rest },
  ref,
) {
  const classNames = twMerge(
    `text-base
    text-slate-80
    focus:outline-none
    focus-visible:envis-outline
    active:envis-outline
    active:bg-moss-green-50
    dark:text-white-100
    dark:focus-visible:envis-outline-invert
    dark:active:envis-outline-invert
    dark:active:bg-transparent-white-10
  `,
    className,
  )

  return type === 'externalUrl' ? (
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
  ) : (
    <NextLink ref={ref} href={href} prefetch={false} className={classNames} {...rest}>
      {children}
    </NextLink>
  )
})
export default BaseLink
