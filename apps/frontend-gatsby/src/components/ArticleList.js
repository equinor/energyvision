import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import { convertDate } from '../helpers'
import articleListStyle from './articleList.module.css'

export const ArticleList = (props) => {
  const { articles } = props

  return (
    <ul className={articleListStyle.list}>
      {articles.map((document) => {
        const article = document.node
        const thumbnail = article.image.childImageSharp.fixed
        return (
          <li className={articleListStyle.item} key={article.id}>
            <Img fixed={thumbnail} />

            <div className={articleListStyle.itemBody}>
              <span className={articleListStyle.date}>
                {convertDate(article.created_at, 'MMMM d, yyyy')}
              </span>
              <h3 className={articleListStyle.title}>
                <Link to={`/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className={articleListStyle.ingress}>{article.ingress}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
