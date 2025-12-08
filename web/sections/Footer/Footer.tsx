import { getLocale, getTranslations } from 'next-intl/server'
import { twMerge } from 'tailwind-merge'
import { LinkButton } from '@/core/Button'
import FooterLink from '@/core/Link/FooterLink'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import { sanityFetch } from '@/sanity/lib/fetch'
import { footerQuery } from '@/sanity/queries/footer'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from '../../icons'
import { getLocaleFromName, getNameFromLocale } from '../../sanity/localization'
import type { FooterColumns, FooterLinkData, SomeType } from '../../types/index'

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

type FooterProps = {
  footerData?: { footerColumns: FooterColumns[] }
  className?: string
}

const Footer = async (_props: FooterProps) => {
  const locale = await getLocale()
  const t = await getTranslations()
  const { data: footerData } = await sanityFetch({
    query: footerQuery,
    params: {
      lang: getNameFromLocale(locale) ?? 'en_GB',
    },
  })

  return (
    <footer
      className={twMerge(
        `dark min-h-12 bg-slate-blue-95 px-0 py-4 *:text-white-100`,
      )}
    >
      <div className='mx-auto my-0 flex max-w-screen-2xl flex-row flex-wrap justify-between px-layout-sm pb-2 max-md:flex-col'>
        {footerData?.footerColumns?.map(({ header, linkList }) => (
          <section
            className='flex flex-col max-md:w-4/5 max-md:py-4'
            key={header}
          >
            <h2 className='px-0 py-2 font-medium text-md leading-planetary'>
              {header}
            </h2>
            <div className='md:grid-y-0 grid grid-cols-2 items-start gap-x-8 gap-y-2 md:flex md:flex-col'>
              {linkList?.map((footerLink: FooterLinkData) => {
                const { id, type, someType, label, href, link } = footerLink
                const icon =
                  type === 'externalUrl' && someType
                    ? getSomeSvg(someType)
                    : null
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
        <section className='flex flex-col max-md:w-4/5 max-md:py-4'>
          <LinkButton variant='toTop'>{t('footer_to_top_button')}</LinkButton>
        </section>
      </div>
      <div className='flex justify-start pt-12 pb-3 pl-4 md:justify-center'>
        <span className='text-2xs'>
          Copyright {new Date().getFullYear()} Equinor ASA
        </span>
      </div>
    </footer>
  )
}

export default Footer
