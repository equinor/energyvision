import React from 'react'

import style from './image.module.css'

export const Image = (props) => {
  const { image, caption, alt, type } = props

  const containerClass =
    type === 'full_width' ? style.imageFullWidth : style.imageInline

  return (
    <div className={containerClass}>
      <img className={style.image} src={image.url} alt={alt} />
      <caption className={style.caption}>{caption}</caption>
    </div>
  )
}
