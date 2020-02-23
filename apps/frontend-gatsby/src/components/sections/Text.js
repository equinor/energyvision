import React from 'react'
import ReactMarkdown from 'react-markdown'

import style from './text.module.css'

export const Text = (props) => {
  const { heading, content } = props

  return (
    <section className={style.section}>
      <div className={style.container}>
        <h3 className={style.heading}>{heading}</h3>
        <ReactMarkdown className={style.content} source={content} />
      </div>
    </section>
  )
}
