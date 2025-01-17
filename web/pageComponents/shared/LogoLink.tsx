import { AnchorHTMLAttributes } from 'react'
import { LogoSecondary } from '@components'
import NextLink from 'next/link'
import { twMerge } from 'tailwind-merge'

type LogoLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const LogoLink = ({ className, ...rest }: LogoLinkProps) => {
  return (
    <NextLink
      href="/"
      aria-label="Equinor home page"
      {...rest}
      className={twMerge(
        'flex items-center justify-self-start h-full focus:outline-none focus-visible:envis-outline',
        className,
      )}
      prefetch={false}
    >
      <LogoSecondary className="-mt-[12%]" />
    </NextLink>
  )
}
