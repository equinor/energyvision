import { List } from '@components'
import styled from 'styled-components'

const StyledList = styled(List)`
  margin-bottom: var(--space-medium);

  li > ul {
    margin-bottom: 0;
  }
`

export const BulletList = ({ children }: { children?: React.ReactNode }) => {
  return <StyledList>{children}</StyledList>
}
