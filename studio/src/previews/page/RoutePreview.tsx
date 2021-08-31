import React from 'react'
import { Wrapper, Frame } from './styles/shared'

export default function RoutePreview(props: any) {
  const baseUrl = process.env.SANITY_STUDIO_PROJECT_URL
  const {
    document: { displayed },
  } = props

  if (!displayed?.slug?.current) {
    return <div>The route needs a slug before it can be previewed.</div>
  }

  const slug = `${displayed?.slug?.current}?preview`
  const locale = displayed._type == 'route_nb_NO' ? '/no' : ''

  const url = baseUrl + locale + slug

  return (
    <Wrapper>
      <Frame src={url} title="preview" frameBorder={'0'} />
    </Wrapper>
  )
}
