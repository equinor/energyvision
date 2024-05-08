import { AnchorHTMLAttributes } from 'react'
import { LogoSecondary } from '@components'
import styled from 'styled-components'
import NextLink from 'next/link'

const StyledLogoLink = styled(NextLink)<LogoLinkProps>`
  justify-self: left;
  display: flex;
  align-items: center;
  height: 100%;
  /* We add the focus ring manually for keyboard users */
  outline: none;
`

const AlignedLogoSecondary = styled(LogoSecondary)`
  /*  Magic number coming up! Need to align the logo as good as possible.
  Since this is just a positioning things it's added here and not in the Logo component
  */
  margin-top: -12%;
`

type LogoLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const LogoLink = ({ ...rest }: LogoLinkProps) => {
  return (
    <StyledLogoLink
      href="/"
      aria-label="Equinor home page"
      {...rest}
      className="logo focus:outline-none focus-visible:envis-outline"
      prefetch={false}
    >
      <AlignedLogoSecondary />
    </StyledLogoLink>
  )
}
