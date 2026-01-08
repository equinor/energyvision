'use client'
import { useTranslations } from 'next-intl'
import { forwardRef } from 'react'
import { ArrowRight } from '../../icons'
import { BaseLink, type BaseLinkProps } from './BaseLink'

export type FooterLinkProps = {
  icon?: React.ReactNode
} & BaseLinkProps

const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
  function FooterLink(
    { href = '', type = 'internalUrl', icon, children, ...rest },
    ref,
  ) {
    const isExternal =
      type === 'externalUrl' ||
      href.startsWith('http') ||
      href.toLowerCase().includes('.pdf')
    const target = isExternal ? '_blank' : undefined
    const intl = useTranslations()

    return (
      <BaseLink
        ref={ref}
        href={href}
        target={target}
        type={type}
        {...rest}
        className={`group flex min-h-11 min-w-11 items-center gap-1 text-sm text-white-100 no-underline hover:text-moss-green-90 hover:underline dark:hover:text-moss-green-90`}
      >
        {icon && (
          <span
            className='mr-1.5 size-6 fill-white-100 leading-none group-hover:fill-moss-green-90'
            aria-hidden={true}
          >
            {icon}
          </span>
        )}
        <span className='flex leading-none'>{children}</span>
        {isExternal && (
          <ArrowRight
            aria-label={`${intl('externalLink')} arrow right icon`}
            className='-translate-y-0.5 size-5 rotate-[-50deg] transform text-gray-500 group-hover:text-moss-green-90'
          />
        )}
      </BaseLink>
    )
  },
)

export default FooterLink
