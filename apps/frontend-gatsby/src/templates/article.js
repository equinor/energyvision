import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { convertDate } from '../helpers'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/layout'
import SEO from '../components/seo'

import articleStyle from './article.module.css'

const ArticleTemplate = ({ data }) => {
  const article = data.strapiArticle

  return (
    <Layout>
      <SEO title={article.title} />

      <article className={articleStyle.container}>
        <h1 className={articleStyle.title}>{article.title}</h1>
        <span className={articleStyle.date}>
          {convertDate(article.created_at, 'MMMM d, yyyy HH:mm ZZZZ')}
        </span>
        <Img fluid={article.image.childImageSharp.fluid} />
        <h3 className={articleStyle.ingress}>{article.ingress}</h3>
        <div className={articleStyle.content}>
          <ReactMarkdown source={article.body} />
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: { eq: $id }) {
      title
      ingress
      body
      created_at
      image {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

export default ArticleTemplate
