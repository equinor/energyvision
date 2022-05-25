import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: var(--topbar-height);
  max-width: var(--topbar-innerMaxWidth);
  margin: auto;
  padding: var(--space-small) 0;
`

export const InnerContainer = ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
  <Container {...rest}>{children}</Container>
)
