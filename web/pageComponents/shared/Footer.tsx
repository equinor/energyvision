import { forwardRef } from 'react'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from '../../icons'
import type { FooterLinkData, SomeType, FooterColumns } from '../../types/types'
import { default as NextLink } from 'next/link'


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
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(function Footer({ footerData, ...rest }, ref) {
  return (
    <footer className="min-h-12 clear-both text-white-100 bg-slate-blue-95 py-4 px-0" ref={ref} {...rest}>
      <div className="flex flex-row flex-wrap my-0 mx-auto justify-between px-layout-sm pb-2 max-w-screen-2xl max-md:flex-col">
        {footerData?.footerColumns?.map(({ header, linkList }) => (
          <section className="flex flex-col max-md:py-4 max-md:w-4/5" key={header}> 
            <h3 className="text-md font-medium text-white-100 px-0 py-2 leading-1">{header}</h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 items-start md:flex md:flex-col md:grid-y-0">
              {linkList?.map((link: FooterLinkData) => {
                const { id, type, someType, label, url } = link
                const icon = type === 'someLink' && someType ? getSomeSvg(someType) : null

                return (
                  <NextLink
                    key={id}
                    href={url || getLink(link)}
                    prefetch={false}
                    className="items-center group focus:outline-none hover:underline hover:text-moss-green-90 focus-visible:envis-outline-invert p-0 min-w-11 min-h-11 no-underline flex flex-row align-center text-sm"
                  >
                    {icon && (
                      <span
                        className="group-hover:fill-moss-green-90 inline-block text-center w-[30px] mr-2 fill-white-100"
                        aria-hidden={true}
                      >
                        {icon}
                      </span>
                    )}
                    {label}
                  </NextLink>
                )
              })}
            </div>
          </section>
        ))}
      </div>
      <div className="flex md:justify-center justify-start pl-4 pt-12 pb-3">
        <span className="text-2xs text-white-100">Copyright {new Date().getFullYear()} Equinor ASA</span>
      </div>
    </footer>
  )
})

export default Footer
