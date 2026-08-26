import type { HTMLAttributes } from 'react'
import FooterLink, { type FooterLinkProps } from '@/core/Link/FooterLink'
import { Typography } from '@/core/Typography'
import { getUrlFromAction } from '@/lib/helpers/getUrlFromAction'
import type { FooterColumns } from '../../types/index'

type FooterProps = {
  footerColumns: FooterColumns[]
} & HTMLAttributes<HTMLElement>

const Footer = ({ footerColumns = [] }: FooterProps) => {
  return (
    <footer
      className={`dark mx-auto min-h-12 w-full max-w-fullwidth bg-slate-blue-95 px-0 py-6`}
    >
      <div className='mx-auto max-w-content px-layout-sm'>
        <div className='flex flex-col justify-center gap-x-52 md:flex-row'>
          {footerColumns?.map(({ header, linkList }) => (
            <section
              className='flex flex-col max-md:w-4/5 max-md:py-4'
              key={header}
            >
              <Typography
                as='h2'
                variant='md'
                className='my-2 font-medium leading-planetary'
              >
                {header}
              </Typography>
              <div className='md:grid-y-0 grid grid-cols-2 items-start gap-x-8 gap-y-2 md:flex md:flex-col'>
                {linkList?.map((footerLink: FooterLinkProps) => {
                  const footerLinkProps = {
                    ...footerLink,
                    href:
                      footerLink?.href ?? getUrlFromAction(footerLink) ?? '/',
                  }
                  return (
                    <FooterLink {...footerLinkProps} key={footerLink?.id} />
                  )
                })}
              </div>
            </section>
          ))}
        </div>
        <div className='flex justify-start pt-12 pb-3 pl-4 md:justify-center'>
          <Typography group='paragraph' variant='small' className='text-2xs'>
            Copyright {new Date().getFullYear()} Equinor ASA
          </Typography>
        </div>
      </div>
    </footer>
  )
}

export default Footer
