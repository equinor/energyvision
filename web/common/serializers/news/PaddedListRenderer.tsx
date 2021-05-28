import { List } from '@components'
import styled from 'styled-components'

type PaddedListProps = {
  level: number
  type: string
  children: JSX.Element[]
  [x: string]: unknown
}

const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--spacing-medium);
`

export const PaddedListRenderer = ({ type, children }: PaddedListProps) => {
  const bullet = type === 'bullet'
  if (bullet) {
    return (
      <Container>
        <List>{children}</List>
      </Container>
    )
  }
  return (
    <Container>
      <List variant="numbered">{children}</List>
    </Container>
  )
}
