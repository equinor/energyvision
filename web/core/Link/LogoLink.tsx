import { AnchorHTMLAttributes } from 'react'
import { LogoSecondary } from '@components'
import NextLink from 'next/link'
import { useIntl } from 'react-intl'

export type LogoLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const LogoLink = ({ ...rest }: LogoLinkProps) => {
  const intl = useIntl()
  return (
    <NextLink
      href="/"
      aria-label={intl.formatMessage({ id: 'logolink_title', defaultMessage: 'Equinor homepage' })}
      {...rest}
      className="fill-energy-red-100 dark:fill-white-100 flex items-center justify-self-start h-full focus:outline-none focus-visible:envis-outline dark:focus-visible:envis-outline-invert"
      prefetch={false}
    >
      <LogoSecondary className="-mt-[12%]" />
    </NextLink>
  )
}

export default LogoLink
