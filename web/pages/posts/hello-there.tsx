import styled from 'styled-components'
import { Button } from '@components'

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--theme-background-primary);
`

export default function HelloThere(): JSX.Element {
  return (
    <Container>
      <h1>General Kenobi</h1>
      <p>
        <Button href="/">Go back</Button>
      </p>
    </Container>
  )
}
