import React from 'react'
import styles from './IframePreview.module.css'
import { baseUrl } from '../../../resolveProductionUrl'
import { getLocaleFromName } from '../../lib/localization'

export default function NewsPreview(props: any) {
  const { document } = props
  const { displayed } = document
  if (!displayed?.slug?.current) {
    return <div style={{ padding: '1rem' }}>A slug is required in order to preview this news article. </div>
  }
  const locale = getLocaleFromName(displayed._lang)

  const url = `${baseUrl}/${locale}/${displayed?.slug?.current}?preview=true`

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} title="preview" frameBorder={'0'} />
      </div>
    </div>
  )
}
