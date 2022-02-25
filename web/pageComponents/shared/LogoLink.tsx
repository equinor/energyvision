import { CSSProperties, AnchorHTMLAttributes } from 'react'
import { LogoSecondary } from '@components'
import styled from 'styled-components'
import { outlineTemplate, Tokens } from '@utils'
import NextLink from 'next/link'

const { outline } = Tokens

const StyledLogoLink = styled.a<LogoLinkProps>`
  justify-self: left;
  display: flex;
  align-items: center;
  height: 100%;

  &[data-focus-visible-added]:focus {
    outline: none;
    ${outlineTemplate(outline)}

    ${({ inverted }) =>
      inverted && {
        outlineColor: 'var(--mist-blue-100)',
      }}
  }
`

const AlignedLogoSecondary = styled(LogoSecondary)`
  /*  Magic number coming up! Need to align the logo as good as possible.
  Since this is just a positioning things it's added here and not in the Logo component
  */
  margin-top: -12%;
`

type LogoLinkProps = {
  inverted?: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

export const LogoLink = ({ inverted = false, style, ...rest }: LogoLinkProps) => {
  return (
    <NextLink href="/" passHref>
      {/*  Localize text */}
      <StyledLogoLink inverted={inverted} aria-label="Equinor home page" {...rest}>
        <AlignedLogoSecondary inverted={inverted} />
      </StyledLogoLink>
    </NextLink>
  )
}
