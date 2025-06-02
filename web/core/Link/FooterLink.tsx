import { forwardRef } from 'react'
import { BaseLinkProps, BaseLink } from './BaseLink'
import { ArrowRight } from '../../icons'
import { useIntl } from 'react-intl'

export type FooterLinkProps = {
  icon?: React.ReactNode
} & BaseLinkProps

const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(function FooterLink(
  { href = '', type = 'internalUrl', icon, children, ...rest },
  ref,
) {
  const isExternal = type === 'externalUrl' || href.startsWith('http') || href.toLowerCase().includes('.pdf')
  const target = isExternal ? '_blank' : undefined
  const intl = useIntl()

  return (
    <BaseLink
      ref={ref}
      href={href}
      target={target}
      type={type}
      {...rest}
      className={`group 
        hover:underline 
        hover:text-moss-green-90 
        min-w-11 
        min-h-11 
        no-underline 
        flex 
        items-center
        gap-1
        text-sm  
        text-white-100
        `}
    >
      {icon && (
        <span className="group-hover:fill-moss-green-90 leading-none size-6 fill-white-100 mr-1.5" aria-hidden={true}>
          {icon}
        </span>
      )}
      <span className="flex leading-none">{children}</span>
      {isExternal && (
        <ArrowRight
          aria-hidden="false"
          aria-label={`, ${intl.formatMessage({ id: 'externalLink', defaultMessage: 'External link' })}`}
          className="size-5 text-gray-500 group-hover:text-moss-green-90 transform -translate-y-0.5 rotate-[-50deg]"
        />
      )}
    </BaseLink>
  )
})

export default FooterLink
