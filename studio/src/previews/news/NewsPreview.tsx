import React from 'react'
import styles from './IframePreview.module.css'

export default function NewsPreview(props) {
  const { document } = props
  const { displayed } = document
  if (!displayed?.slug?.current) {
    return <div>The product needs a slug before it can be previewed.</div>
  }
  const url =
    process.env.NODE_ENV === 'production'
      ? `../../news/${displayed?.slug?.current}?preview`
      : `http://localhost:3000/news/${displayed?.slug?.current}?preview`
  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} title="preview" frameBorder={'0'} />
      </div>
    </div>
  )
}
