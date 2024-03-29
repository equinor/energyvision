import { List } from '@components'
import styled from 'styled-components'

const StyledList = styled(List)`
  &:not(li > ul) {
    margin-bottom: var(--space-medium);
  }
`
export const NumberedList = ({ children }: { children?: React.ReactNode }) => {
  return <StyledList variant="numbered">{children}</StyledList>
}
