import React from 'react'
import { resolveImageUrl } from '../../helpers'

import style from './hero.module.css'

export const Hero = (props) => {
  const { image, title, subtitle } = props

  return (
    <section className={style.container}>
      <img className={style.image} src={resolveImageUrl(image.url)} alt="" />
      <div className={style.heroContent}>
        <h1 className={style.title}>{title}</h1>
        {subtitle ? <span className={style.subtitle}>{subtitle}</span> : null}
      </div>
    </section>
  )
}
