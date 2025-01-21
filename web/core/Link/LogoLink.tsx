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
      className="flex items-center justify-self-start h-full focus:outline-none focus-visible:envis-outline"
      prefetch={false}
    >
      <LogoSecondary className="-mt-[12%]" />
    </NextLink>
  )
}

export default LogoLink
