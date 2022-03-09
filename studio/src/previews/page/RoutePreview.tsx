import React from 'react'
import { Wrapper, Frame } from './styles/shared'
// eslint-disable-next-line import/no-unresolved
import client from 'part:@sanity/base/client'
import { languages } from '../../../languages'
import { baseUrl } from '../../../resolveProductionUrl'

const getUrlLocaleByRoute = (route: string) => {
  const name = route.slice(6)
  const locale = languages.find((lang) => lang.name === name)?.locale
  return locale ? `/${locale}` : ''
}

export default function RoutePreview(props: any) {
  const {
    document: { displayed },
  } = props

  if (!displayed?.slug?.current) {
    return <div>The route needs a slug before it can be previewed.</div>
  }

  // Get the selected dataset
  // @TODO: We need a way for the web to preview the right dataset
  console.log('dataset', client.clientConfig.dataset)

  const slug = `${displayed?.slug?.current}?preview`

  const locale = getUrlLocaleByRoute(displayed._type)

  const url = baseUrl + locale + slug

  return (
    <Wrapper>
      <Frame src={url} title="preview" frameBorder={'0'} />
    </Wrapper>
  )
}
