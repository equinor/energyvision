import React from 'react'
import { PreviewWrapper, Frame } from './PreviewWrapper'
import resolveProductionUrl, { baseUrl } from '../../resolveProductionUrl'
import { getLocaleFromName } from '../lib/localization'

export default function Preview({ document }: any) {
  const { displayed: previewDoc } = document
  const { _type } = previewDoc

  if (_type === 'news' || _type === 'localNews' || _type.includes('route')) {
    if (!previewDoc?.slug?.current) {
      return <div>The document needs a slug before it can be previewed.</div>
    }
  }

  let url = ''
  let shareable = true
  const locale = getLocaleFromName(previewDoc._lang)

  if (_type === 'newsroom') {
    url = locale === 'no' ? `${baseUrl}/no/nyheter?preview` : `${baseUrl}/news?preview`
    shareable = false
  } else if (_type === 'magazineIndex') {
    url = locale === 'no' ? `${baseUrl}/no/magasin?preview` : `${baseUrl}/magazine?preview`
    shareable = false
  } else {
    url = resolveProductionUrl(previewDoc)
  }

  return (
    <PreviewWrapper src={url} shareable={shareable}>
      <Frame src={url} title="preview" frameBorder={'0'} />
    </PreviewWrapper>
  )
}
