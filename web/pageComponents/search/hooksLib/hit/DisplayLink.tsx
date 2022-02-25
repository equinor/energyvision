import styled from 'styled-components'

const StyledDisplayLink = styled.p`
  color: var(--mist-blue-100);
  font-size: var(--typeScale-0);
  margin: var(--space-xSmall) 0 var(--space-medium) 0;
  word-break: break-word;
  hyphens: auto;
`

const DisplayLink: React.FC = ({ children, ...rest }) => {
  return <StyledDisplayLink {...rest}>{children}</StyledDisplayLink>
}

export default DisplayLink
