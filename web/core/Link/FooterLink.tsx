import { getTranslations } from 'next-intl/server'
import { forwardRef } from 'react'
import { getLocaleFromIso } from '@/sanity/helpers/localization'
import type { LinkData } from '@/types'
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from '../../icons'
import { BaseLink } from './BaseLink'

function getSomeSvg(someType: SomeType) {
  const iconMap = {
    facebook: <Facebook height={24} width={24} />,
    instagram: <Instagram height={24} width={24} />,
    linkedin: <Linkedin height={24} width={24} />,
    twitter: <Twitter height={24} width={24} />,
    youtube: <Youtube height={24} width={24} />,
  }

  if (!(someType in iconMap))
    console.warn(
      'Unable to get social icon for footer: Unknown SoMe type passed',
    )
  return iconMap[someType] || null
}

export type SomeType =
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'twitter'
  | 'linkedin'

export type FooterLinkProps = {
  type: 'internalLink' | 'externalUrl'
  someType?: SomeType
  href: string
  label: string
} & LinkData

const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
  async ({ type, someType, label, link, href }, ref) => {
    const linkLocale = link?.lang
    const isExternal =
      type === 'externalUrl' ||
      href?.startsWith('http') ||
      href?.toLowerCase().includes('.pdf')
    const target = isExternal ? '_blank' : undefined
    const intl = await getTranslations()

    const icon =
      type === 'externalUrl' && someType ? getSomeSvg(someType) : null

    return (
      <BaseLink
        ref={ref}
        href={href}
        hrefLang={linkLocale}
        target={target}
        type={type}
        className={`group flex min-h-11 min-w-11 items-center gap-1 text-sm no-underline hover:text-moss-green-90 hover:underline dark:hover:text-moss-green-90`}
      >
        {icon && (
          <span
            className='mr-1.5 size-6 fill-white-100 leading-none group-hover:fill-moss-green-90'
            aria-hidden={true}
          >
            {icon}
          </span>
        )}
        <span className='flex leading-none'>{label}</span>
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
