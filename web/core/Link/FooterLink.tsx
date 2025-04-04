import { forwardRef } from 'react'
import { BaseLinkProps, BaseLink } from './BaseLink'
import { ArrowRight } from '../../icons'

export type FooterLinkProps = {
  type?: 'internalUrl' | 'externalUrl' | 'someLink' | 'link'
  someType?: string
  icon?: React.ReactNode
} & Omit<BaseLinkProps, 'type'>

const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(function FooterLink(
  { href = '', type = 'internalUrl', icon, children, ...rest },
  ref,
) {
  const isExternal = type === 'externalUrl' ||  href.startsWith('http') || href.toLowerCase().includes('.pdf')
  const target = isExternal ? '_blank' : undefined

  return (
    <BaseLink
      ref={ref}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      {...rest}
      className="items-center group focus:outline-none hover:underline hover:text-moss-green-90 focus-visible:envis-outline-invert p-0 min-w-11 min-h-11 no-underline flex flex-row align-center text-sm  text-white-100"
    >
      {icon && (
        <span
          className="group-hover:fill-moss-green-90 inline-block text-center w-[30px] mr-1 h-[35px] fill-white-100"
          aria-hidden={true}
        >
          {icon}
        </span>
      )}
      {children}
      {isExternal && (
        <ArrowRight className="ml-0.5 w-4 h-4 text-gray-500 group-hover:text-moss-green-90 transform -translate-y-0.5 rotate-[-50deg]" />
      )}
    </BaseLink>
  )
})

export default FooterLink
