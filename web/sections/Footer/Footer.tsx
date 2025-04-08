'use client'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from '../../icons'
import type { FooterLinkData, SomeType, FooterColumns } from '../../types/index'
import { useIntl } from 'react-intl'
import { LinkButton } from '@core/Button'
import FooterLink from '@core/Link/FooterLink'

function getSomeSvg(someType: SomeType) {
  const iconMap = {
    facebook: <Facebook width={22} />,
    instagram: <Instagram width={24} />,
    linkedin: <Linkedin width={24} />,
    twitter: <Twitter width={24} />,
    youtube: <Youtube width={24} />,
  }

  if (!(someType in iconMap)) console.warn('Unable to get social icon for footer: Unknown SoMe type passed')
  return iconMap[someType] || null
}

function getLink(linkData: FooterLinkData) {
  const { link } = linkData || {}
  return link?.slug ?? '/'
}

type FooterProps = {
  footerData?: { footerColumns: FooterColumns[] }
}

const Footer = function Footer({ footerData }: FooterProps) {
  const intl = useIntl()
  return (
    <footer className="min-h-12 clear-both text-white-100 bg-slate-blue-95 py-4 px-0">
      <div className="flex flex-row flex-wrap my-0 mx-auto justify-between px-layout-sm pb-2 max-w-screen-2xl max-md:flex-col">
        {footerData?.footerColumns?.map(({ header, linkList }) => (
          <section className="flex flex-col max-md:py-4 max-md:w-4/5" key={header}>
            <h2 className="text-md font-medium text-white-100 px-0 py-2 leading-planetary">{header}</h2>
            <div className="grid grid-cols-2 gap-y-2 gap-x-8 items-start md:flex md:flex-col md:grid-y-0">
              {linkList?.map((link: FooterLinkData) => {
                const { id, type, someType, label, url } = link
                const icon = type === 'someLink' && someType ? getSomeSvg(someType) : null

                return (
                  <FooterLink
                    key={id}
                    href={url || getLink(link)}
                    prefetch={false}
                    type={type}
                    someType={someType}
                    icon={icon}
                  >
                    {label}
                  </FooterLink>
                )
              })}
            </div>
          </section>
        ))}
        <section className="flex flex-col max-md:py-4 max-md:w-4/5">
          <LinkButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`group text-sm px-0 py-2 text-white-100 underline underline-offset-8 hover:underline hover:text-moss-green-90`}
          >
            {intl.formatMessage({ id: 'footer_to_top_button', defaultMessage: 'To top' })}
          </LinkButton>
        </section>
      </div>
      <div className="flex md:justify-center justify-start pl-4 pt-12 pb-3">
        <span className="text-2xs text-white-100">Copyright {new Date().getFullYear()} Equinor ASA</span>
      </div>
    </footer>
  )
}

export default Footer
