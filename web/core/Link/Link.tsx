'use client'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { ArrowRight } from '../../icons'
import { BaseLink, type BaseLinkProps } from './BaseLink'

export type LinkProps = BaseLinkProps

/** Regular link style for use*/
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, type = 'internalUrl', className = '', href = '', ...rest },
  ref,
) {
  const t = useTranslations()
  const classNames = twMerge(
    `text-slate-blue-95
    dark:text-white-100
    w-fit 
    inline-flex
    items-center
    underline
    hover:text-norwegian-woods-100
    dark:hover:text-slate-blue-95
  `,
    className,
  )

  return (
    <BaseLink
      className={classNames}
      type={type}
      ref={ref}
      href={href}
      {...rest}
    >
      {children}
      {type === 'externalUrl' && (
        <ArrowRight
          aria-hidden='false'
          aria-label={t('externalLink')}
          className='-rotate-45 inline-block origin-center pb-1 text-no'
        />
      )}
    </BaseLink>
  )
})

export default Link
