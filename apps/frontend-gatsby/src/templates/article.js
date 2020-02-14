import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { convertDate } from '../helpers'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/layout'
import SEO from '../components/seo'

import articleStyle from './article.module.css'

const ArticleTemplate = ({ data }) => {
  const article = data.cms.article

  return (
    <Layout>
      <SEO title={article.title} />

      <article className={articleStyle.container}>
        <h1 className={articleStyle.title}>{article.title}</h1>
        <span className={articleStyle.date}>
          {convertDate(article.created_at, 'MMMM d, yyyy HH:mm ZZZZ')}
        </span>
        <div className={articleStyle.image}>
          <img src={`http://localhost:1337${article.image.url}`} />
        </div>
        <h3 className={articleStyle.ingress}>{article.ingress}</h3>
        <div className={articleStyle.content}>
          <ReactMarkdown source={article.body} />
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($id: ID!) {
    cms {
      article(id: $id) {
        title
        ingress
        body
        created_at
        image {
          url
        }
      }
    }
  }
`

export default ArticleTemplate
