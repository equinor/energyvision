import React from 'react'
// eslint-disable-next-line import/no-unresolved
import { BlockEditor } from 'part:@sanity/form-builder'
import styled from 'styled-components'

// How future proof will this be?
// - not so far #753
const Wrapper = styled.div`
  div[data-wrapper] > div {
    height: unset;
  }
`

const SingleLineEditor = (props: any) => {
  return (
    <Wrapper>
      <BlockEditor {...props} />
    </Wrapper>
  )
}
export default SingleLineEditor
