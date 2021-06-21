// @TODO: Optimize Route preview into one function with language code as param

import React from 'react'
import { Wrapper, Frame } from './styles/shared'

export default function RoutePreview(props: any) {
  const baseUrl = process.env.SANITY_STUDIO_PROJECT_URL
  const {
    document: { displayed },
  } = props

  if (!displayed?.slug?.nb_NO.current) {
    return <div>The route needs a Norwegian slug before it can be previewed.</div>
  }

  const url = `${baseUrl}/no${displayed?.slug?.nb_NO.current}?preview`

  return (
    <Wrapper>
      <Frame src={url} title="preview" frameBorder={'0'} />
    </Wrapper>
  )
}
