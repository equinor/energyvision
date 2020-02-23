import React from 'react'
import { resolveImageUrl } from '../../helpers'

import style from './image.module.css'

export const Image = (props) => {
  const { image, caption, alt, type } = props

  const containerClass =
    type === 'full_width' ? style.imageFullWidth : style.imageInline

  return (
    <figure className={containerClass}>
      <img className={style.image} src={resolveImageUrl(image.url)} alt={alt} />
      {caption ? (
        <figcaption className={style.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  )
}
