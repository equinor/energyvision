import { List } from '@components'
import styled from 'styled-components'

const Container = styled.div`
  padding: 0 var(--layout-paddingHorizontal-large);
  max-width: var(--maxViewportWidth);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--spacing-medium);
`
export const PaddedListRenderer = (child: { type: any; children: any }) => {
  const { type, children } = child
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
