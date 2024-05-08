import { AnchorHTMLAttributes } from 'react'
import { LogoSecondary } from '@components'
import NextLink from 'next/link'

type LogoLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const LogoLink = ({ ...rest }: LogoLinkProps) => {
  return (
    <NextLink
      href="/"
      aria-label="Equinor home page"
      {...rest}
      className="flex items-center justify-self-start h-full focus:outline-none focus-visible:envis-outline"
      prefetch={false}
    >
      <LogoSecondary className="-mt-[12%]" />
    </NextLink>
  )
}
