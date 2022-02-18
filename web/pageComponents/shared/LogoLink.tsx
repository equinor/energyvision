import { LogoSecondary } from '@components'
import styled from 'styled-components'
import { outlineTemplate, Tokens } from '@utils'
import NextLink from 'next/link'

const { outline } = Tokens

const StyledLogoLink = styled.a`
  justify-self: left;
  display: flex;
  align-items: center;
  height: 100%;

  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }
`

const AlignedLogoSecondary = styled(LogoSecondary)`
  /*  Magic number coming up! Need to align the logo as good as possible.
  Since this is just a positioning things it's added here and not in the Logo component
  */
  margin-top: -12%;
`

export const LogoLink = ({ ...rest }) => {
  return (
    <NextLink href="/" passHref>
      {/*  Localize text */}
      <StyledLogoLink aria-label="Equinor home page" {...rest}>
        <AlignedLogoSecondary />
      </StyledLogoLink>
    </NextLink>
  )
}
