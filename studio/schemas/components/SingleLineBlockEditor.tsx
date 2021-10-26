import React from 'react'
// eslint-disable-next-line import/no-unresolved
import { BlockEditor } from 'part:@sanity/form-builder'
import styled from 'styled-components'

// How future proof will this be?
const Wrapper = styled.div`
  div[class^='PortableTextInput-module_editorBoxContent'] {
    height: 5rem;
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
