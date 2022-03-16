import React from 'react'
import styles from './IframePreview.module.css'
import { baseUrl } from '../../../resolveProductionUrl'
import getPreviewLocale from '../helpers/getPreviewLocale'

export default function NewsPreview(props: any) {
  const { document } = props
  const { displayed } = document
  if (!displayed?.slug?.current) {
    return <div>The product needs a slug before it can be previewed.</div>
  }

  const locale = getPreviewLocale(displayed._lang)

  const url = `${baseUrl}/${locale}/${displayed?.slug?.current}?preview`

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} title="preview" frameBorder={'0'} />
      </div>
    </div>
  )
}
