import { AnchorHTMLAttributes } from 'react'
import { LogoSecondary } from '@components'
import NextLink from 'next/link'
import { twMerge } from 'tailwind-merge'

type LogoLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const LogoLink = ({ className = '', ...rest }: LogoLinkProps) => {
  return (
    <NextLink
      href="/"
      aria-label="Equinor home page"
      {...rest}
      className={twMerge(
        `
        focus:outline-none
        focus-visible:envis-outline
      text-energy-red-100
        `,
        className,
      )}
      prefetch={false}
    >
      <LogoSecondary className="-mt-[12%]" />
    </NextLink>
  )
}
