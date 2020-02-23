import React from 'react'
import { Link } from 'gatsby'

import style from './pageMenu.module.css'

export const PageMenu = (props) => {
  const { pages } = props

  return (
    <ul className={style.list}>
      {pages.map((page) => (
        <li key={page.id} className={style.listItem}>
          <Link to={`/${page.slug}`}>{page.name}</Link>
        </li>
      ))}
    </ul>
  )
}
