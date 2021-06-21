import React from 'react'
import { Wrapper, Frame } from './styles/shared'

export default function PagePreview(props: any) {
  const baseUrl = process.env.SANITY_STUDIO_PROJECT_URL
  const {
    document: { displayed },
  } = props
  console.log('Page id: ', displayed._id)

  if (!displayed?._id) {
    // This should never happen
    return <div>The content needs an id before it can be previewed.</div>
  }

  const url = `${baseUrl}/${displayed?._id}?preview`
  console.log('Preview url', url)

  return (
    <Wrapper>
      <Frame src={url} title="preview" frameBorder={'0'} />
    </Wrapper>
  )
}
