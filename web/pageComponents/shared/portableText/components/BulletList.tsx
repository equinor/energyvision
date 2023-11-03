import { List } from '@components'
import styled from 'styled-components'

const StyledList = styled(List)`
  margin-bottom: var(--space-medium);
`

export const BulletList = ({ children }: { children?: React.ReactNode }) => {
  return <StyledList>{children}</StyledList>
}
