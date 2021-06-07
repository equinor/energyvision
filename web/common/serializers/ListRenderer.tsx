import { List } from '@components'
import styled from 'styled-components'

type ListProps = {
  type: string
  children: JSX.Element[]
  [x: string]: unknown
}

const StyledList = styled(List)`
  margin-bottom: var(--spacing-medium);
`
export const ListRenderer = ({ type, children }: ListProps) => {
  console.log('list')
  const bullet = type === 'bullet'
  if (bullet) {
    return <StyledList>{children}</StyledList>
  }
  return <StyledList variant="numbered">{children}</StyledList>
}
