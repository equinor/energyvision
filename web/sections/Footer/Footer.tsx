'use client'

import { useTranslations } from 'next-intl'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from '../../icons'
import { LinkButton } from '@/core/Button'
import FooterLink from '@/core/Link/FooterLink'
import type { FooterLinkData, SomeType, FooterColumns } from '../../types/index'
import { getLocaleFromName } from '../../lib/localization'
import { getUrlFromAction } from '../../common/helpers'
import { twMerge } from 'tailwind-merge'

function getSomeSvg(someType: SomeType) {
  const iconMap = {
    facebook: <Facebook height={24} width={24} />,
    instagram: <Instagram height={24} width={24} />,
    linkedin: <Linkedin height={24} width={24} />,
    twitter: <Twitter height={24} width={24} />,
    youtube: <Youtube height={24} width={24} />,
  }

  if (!(someType in iconMap)) console.warn('Unable to get social icon for footer: Unknown SoMe type passed')
  return iconMap[someType] || null
}

type FooterProps = {
  footerData?: { footerColumns: FooterColumns[] }
  className?: string
}

const Footer = ({ footerData, className = '', ...rest }: FooterProps) => {
  const t = useTranslations()

  return (
    <footer className={twMerge(`dark min-h-12 bg-slate-blue-95 px-0 py-4 *:text-white-100`, className)} {...rest}>
      <div className="mx-auto my-0 flex max-w-screen-2xl flex-row flex-wrap justify-between px-layout-sm pb-2 max-md:flex-col">
        {footerData?.footerColumns?.map(({ header, linkList }) => (
          <section className="flex flex-col max-md:w-4/5 max-md:py-4" key={header}>
            <h2 className="px-0 py-2 text-md leading-planetary font-medium">{header}</h2>
            <div className="md:grid-y-0 grid grid-cols-2 items-start gap-x-8 gap-y-2 md:flex md:flex-col">
              {linkList?.map((footerLink: FooterLinkData) => {
                const { id, type, someType, label, href, link } = footerLink
                const icon = type === 'externalUrl' && someType ? getSomeSvg(someType) : null
                const linkLocale = getLocaleFromName(link?.lang)
                return (
                  <FooterLink
                    locale={linkLocale}
                    key={id}
                    href={href || getUrlFromAction(footerLink) || '/'}
                    type={type}
                    icon={icon}
                  >
                    {label}
                  </FooterLink>
                )
              })}
            </div>
          </section>
        ))}
        <section className="flex flex-col max-md:w-4/5 max-md:py-4">
          <LinkButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`group px-0 py-2 text-sm underline underline-offset-8 hover:text-moss-green-90 hover:underline`}
          >
            {t('footer_to_top_button')}
          </LinkButton>
        </section>
      </div>
      <div className="flex justify-start pt-12 pb-3 pl-4 md:justify-center">
        <span className="text-2xs">Copyright {new Date().getFullYear()} Equinor ASA</span>
      </div>
    </footer>
  )
}

export default Footer
