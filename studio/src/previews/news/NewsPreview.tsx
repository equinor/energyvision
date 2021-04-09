import React from 'react'
import styles from './IframePreview.module.css'

export default function NewsPreview(props) {
  const baseUrl = process.env.SANITY_STUDIO_PROJECT_URL
  console.log('baseUrl', baseUrl, process.env.NODE_ENV)

  const { document } = props
  const { displayed } = document
  if (!displayed?.slug?.current) {
    return <div>The product needs a slug before it can be previewed.</div>
  }
  const url = `${baseUrl}/news/${displayed?.slug?.current}?preview`

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} title="preview" frameBorder={'0'} />
      </div>
    </div>
  )
}
