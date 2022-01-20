import { LogoSecondary } from '@components'
import styled from 'styled-components'
import { outlineTemplate, Tokens } from '@utils'
import NextLink from 'next/link'

const { outline } = Tokens

const StyledLogoLink = styled.a`
  grid-area: logo;
  justify-content: left;
  display: flex;
  height: 100%;
  align-items: center;

  &[data-focus-visible-added]:focus {
    ${outlineTemplate(outline)}
  }

  > svg {
    margin-top: -12%;
  }
`

export const LogoLink = () => {
  return (
    <NextLink href="/" passHref>
      <StyledLogoLink aria-label="Equinor home page">
        <LogoSecondary />
      </StyledLogoLink>
    </NextLink>
  )
}
