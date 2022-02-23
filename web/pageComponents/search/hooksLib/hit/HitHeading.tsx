import styled from 'styled-components'
import { Heading, HeadingProps } from '@components'
import { StyledHitLink } from './HitLink'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

const StyledHitHeading = styled(Heading)`
  position: relative;
  display: inline-block;
  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: '';
    display: block;
    height: 1px;
    left: 50%;
    position: absolute;
    background: #fff;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  ${StyledHitLink}:hover &:after {
    width: 100%;
    left: 0;
  }

  ${StyledHitLink}:focus-visible & {
    outline: none;
    ${outlineTemplate(outline)}
    outline-color: var(--mist-blue-100);
  }
`
const HitHeading = ({ children, ...rest }: HeadingProps) => {
  return (
    <StyledHitHeading level="h2" size="sm" inverted {...rest}>
      {children}
    </StyledHitHeading>
  )
}

export default HitHeading
