import resolveProductionUrl from '../../resolveProductionUrl'
import { dataset } from '../lib/datasetHelpers'
import { PreviewWrapper } from './PreviewWrapper'

const REQUIRES_SLUG = ['news', 'localNews', 'magazine']

export default function Preview({ document }: any) {
  const { displayed: previewDoc } = document
  const { _type } = previewDoc

  /* This logic is duplicated from web/preview.js
   * just so we render the error in a prettified way.
   */
  if (REQUIRES_SLUG.includes(_type) || _type.includes('route')) {
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
    <PreviewWrapper src={url} shareable={dataset !== 'secret'}>
      <iframe
        src={url}
        title="preview"
        style={{
          border: '0',
          height: '100%',
          width: '100%',
          left: 0,
        }}
      />
    </PreviewWrapper>
  )
}
