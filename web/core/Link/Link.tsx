import { AnchorHTMLAttributes, forwardRef } from 'react'
import { Icon } from '@equinor/eds-core-react'
import { arrow_forward } from '@equinor/eds-icons'
import { default as NextLink } from 'next/link'
import { twMerge } from 'tailwind-merge'

export type LinkProps = {
  /** What kind of content is it  */
  type?: 'internalUrl' | 'externalUrl'
  /** The locale for the link, required for internal URLs */
  locale?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

/** Regular link style for use*/
export const BaseLink = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, type = 'internalUrl', className = '', href = '', ...rest },
  ref,
) {
  const classNames = twMerge(
    `text-base
    text-mist-blue-100 
    flex 
    gap-2
    underline
    hover:no-underline
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
      <Icon data={arrow_forward} size={16} className="-rotate-45" />
    </a>
  ) : (
    <NextLink ref={ref} href={href} prefetch={false} className={classNames} {...rest}>
      {children}
    </NextLink>
  )
})
