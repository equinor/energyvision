import React from 'react'
import { PreviewWrapper, Frame } from './PreviewWrapper'
import resolveProductionUrl from '../../resolveProductionUrl'

const REQUIRES_SLUG = ['news', 'localNews', 'magazine']

export default function Preview({ document }: any) {
  const { displayed: previewDoc } = document
  const { _type } = previewDoc

  if ([REQUIRES_SLUG].includes(_type) || _type.includes('route')) {
    if (!previewDoc?.slug?.current) {
      return (
        <div style={{ margin: '30px' }}>
          The document needs a <strong>slug</strong> before it can be previewed.
        </div>
      )
    }
  }

  const url = resolveProductionUrl(previewDoc)

  return (
    <PreviewWrapper src={url}>
      <Frame src={url} title="preview" frameBorder={'0'} />
    </PreviewWrapper>
  )
}
