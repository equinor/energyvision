import React from 'react'
import { PreviewWrapper, Frame } from './PreviewWrapper'
import resolveProductionUrl from '../../resolveProductionUrl'

export default function Preview({ document }: any) {
  const { displayed: previewDoc } = document
  const { _type } = previewDoc

  if (_type === 'news' || _type === 'localNews' || _type.includes('route')) {
    if (!previewDoc?.slug?.current) {
      return <div>The document needs a slug before it can be previewed.</div>
    }
  }

  const url = resolveProductionUrl(previewDoc)

  return (
    <PreviewWrapper src={url}>
      <Frame src={url} title="preview" frameBorder={'0'} />
    </PreviewWrapper>
  )
}
