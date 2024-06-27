import { forwardRef } from 'react'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from '../icons'
import type { FooterLinkData, SomeType, FooterColumns } from '../types/types'
import envisTwMerge from '../twMerge'
import { Link } from '@core/Link'

function getSomeSvg(someType: SomeType) {
  const iconMap = {
    facebook: <Facebook width={12} />,
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
  className?: string
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer({ footerData, className = '', ...rest }, ref) {
  return (
    <footer
      ref={ref}
      {...rest}
      className={envisTwMerge('min-h-28 clear-both text-white-100 bg-slate-blue-95 py-6 px-0', className)}
    >
      <div className="flex flex-col md:flex-row flex-wrap justify-between px-layout-sm pb-6 mx-auto max-w-[calc(1920px-250px*2)] ">
        {footerData?.footerColumns?.map(({ header, linkList }) => (
          <section key={header} className="flex flex-col max-md:w-[70%] max-md:py-6">
            <h3 className="text-md py-4 font-medium">{header}</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 items-[self-start] md:flex md:flex-col md:gap-x-0">
              {linkList?.map((link: FooterLinkData) => {
                const { id, type, someType, label, url } = link
                const icon = type === 'someLink' && someType ? getSomeSvg(someType) : null

                return (
                  <Link
                    key={id}
                    href={url || getLink(link)}
                    prefetch={false}
                    className="max-md:flex-[0_0_40%] max-md:max-w-28 text-white-100"
                  >
                    {icon && (
                      <span className="inline-block text-center w-7 mr-4 fill-current" aria-hidden={true}>
                        {icon}
                      </span>
                    )}
                    {label}
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
      <div className="flex justify-start min-h-8 px-layout-md pt-10 pb-4 md:justify-center">
        <span className="text-sm text-white-100">Copyright {new Date().getFullYear()} Equinor ASA</span>
      </div>
    </footer>
  )
})

export default Footer
