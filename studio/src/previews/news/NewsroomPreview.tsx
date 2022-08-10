import React from 'react'
import styles from './IframePreview.module.css'
import { baseUrl } from '../../../resolveProductionUrl'
import { getLocaleFromName } from '../../lib/localization'

export default function NewsPreview(props: any) {
  const { document } = props
  const { displayed } = document

  const locale = getLocaleFromName(displayed._lang)

  const url = locale === 'no' ? `${baseUrl}/${locale}/nyheter?preview` : `${baseUrl}/news?preview`

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} title="preview" frameBorder={'0'} />
      </div>
    </div>
  )
}
