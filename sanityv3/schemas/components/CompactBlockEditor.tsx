import { forwardRef } from 'react'
// eslint-disable-next-line import/no-unresolved
import { BlockEditor } from 'sanity'
import styled from 'styled-components'

// How future proof will this be?
// - not so far #753
const Container = styled.div`
  [data-testid='pt-editor'][data-fullscreen='false'] {
    height: 100px;
  }
`

const SingleLineEditor = forwardRef((props: any, ref) => {
  return (
    <Container>
      <BlockEditor ref={ref} {...props} />
    </Container>
  )
})
export default SingleLineEditor
