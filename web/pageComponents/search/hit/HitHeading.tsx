import styled from 'styled-components'
import { Heading, HeadingProps } from '@components'
import { StyledHitLink } from './HitLink'
import { outlineTemplate, Tokens } from '@utils'

const { outline } = Tokens

const StyledHitHeading = styled(Heading)`
  position: relative;
  display: inline-block;
  margin-bottom: var(--space-xSmall);

  ${StyledHitLink}:hover & {
    text-decoration: underline;
  }

  ${StyledHitLink}:focus-visible & {
    outline: none;
    ${outlineTemplate(outline)}
    outline-color: var(--mist-blue-100);
  }
`
const HitHeading = ({ children, ...rest }: HeadingProps) => {
  return (
    <StyledHitHeading level="h2" size="sm" {...rest}>
      {children}
    </StyledHitHeading>
  )
}

export default HitHeading
