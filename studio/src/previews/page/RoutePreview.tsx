import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  p {
    padding: 1em;
  }
`

const Frame = styled.iframe`
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

// @TODO: Preview in Norwegian & English
export default function RoutePreview(props: any) {
  const baseUrl = process.env.SANITY_STUDIO_PROJECT_URL
  const {
    document: { displayed },
  } = props

  if (!displayed?.slug?.en_GB.current) {
    return <div>The route needs a slug before it can be previewed.</div>
  }

  const url = `${baseUrl}${displayed?.slug?.en_GB.current}?preview`

  return (
    <Wrapper>
      <Frame src={url} title="preview" frameBorder={'0'} />
    </Wrapper>
  )
}
